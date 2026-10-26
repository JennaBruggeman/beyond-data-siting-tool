#!/usr/bin/env python3
"""Where each exchange does best, on a 100 m grid, for Vancouver and Edmonton (J.B., GP1 maps, 21 Oct 2026).

One score per cell per aspect, 0 to 1:
  site       what the zoning allows a data centre (the tool's own zoning rules, tool/index.html vanStatus / edmStatus)
  heat       heat demand within reach of the cell (the tool's receivers, demand rule and reach), or a district network nearby
  energy     a substation nearby, and people to charge cars for where public chargers are few
  water      Vancouver: cooling towers and water-treatment systems within 500 m; Edmonton: distance to Gold Bar (reclaimed water)
  materials  truck access, an industrial neighbourhood (proxy for recyclers and refurbishers), schools to pass computers on to
  people     people within 800 m who could use a refuge, a ground floor, jobs; less where homes sit within 150 m (night noise)
Then: overlap = mean of the five exchanges; overlap_zoned = overlap x site; n_strong = how many exchanges score 0.5 or more.
Every factor, weight, radius and source is in factors.csv. Weights and decay distances marked 'assumption' are J.B.'s to change.
Grid: the tool's local metre frame (x = (lon - lon0) cos(lat0) 111320, y = (lat - lat0) 110540), the same 100 m cells as the census.
Run: python3 build_site_maps.py   (reads ../tool and ../data; writes <city>_grid.geojson, <city>_peaks.geojson, summary.json)
"""
import json, math, os, csv, collections
import numpy as np
from scipy.spatial import cKDTree
from shapely.geometry import Polygon, Point, shape
from shapely.ops import unary_union
from shapely.prepared import prep

H = os.path.dirname(os.path.abspath(__file__)); T = os.path.join(H, '..', 'tool'); D = os.path.join(H, '..', 'data')
CITY = {'van': dict(lat0=49.25, lon0=-123.12), 'edm': dict(lat0=53.54, lon0=-113.50)}
C = 100.0
csv.field_size_limit(10**9)

# ---------- factors (see factors.csv for sources) ----------
SITE = {'yes': 1.0, 'case': 0.7, 'site': 0.35, 'no': 0.1}          # assumption: how far each zoning status is from "allowed"
FLOOD = 0.6                                                         # assumption: site score x 0.6 in Vancouver's designated / Still Creek floodplain
REACH = {'pool': 1000, 'housing': 1200, 'greenhouse': 1500}; REACH_DEF = 1200   # tool/engine.js:33 (RVO 2018)
HOME_MWH = {'van': 16.81, 'edm': 33.14}                             # tool/engine.js:29 (NRCan CEUD)
CEUD = {'van': dict(school=.497, campus=.497, hospital=1.096, care=1.096, rec=.650, hall=.650, pool=.650, arena=.650),
        'edm': dict(school=1.307, campus=1.307, hospital=2.348, care=2.348, rec=1.458, hall=1.458, pool=1.458, arena=1.458)}  # GJ/m2, tool/cards.js:154
BOILER = 0.85                                                       # tool/cards.js (heat taken = fuel bought x 0.85)
NET_REACH = 1200                                                    # tool/engine.js:284
SUB_REACH = 2000                                                    # assumption: substation proximity decays to 0 at 2 km
EV_R, EV_PORTS_FULL = 1000, 20                                      # tool/opps.js:117 uses 1,000 m; 20 ports = 'served' is an assumption
CPCN = 0.5                                                          # assumption: energy x 0.5 inside BC Hydro's West End CPCN study area (no new feeders until ~2032)
CT_R = 500                                                          # tool/xecon.js:101
GOLDBAR_R = 5000                                                    # assumption: reclaimed-water pipe reach 5 km
ART_R, IND_R, SCH_R = 500, 1000, 2000                               # assumptions
PEOPLE_R, NOISE_R, NOISE_W = 800, 150, 0.6                          # assumptions
W_EN = (0.6, 0.4); W_MAT = (0.4, 0.4, 0.2)                          # assumptions
EXCH = ['heat', 'energy', 'water', 'materials', 'people']
METHOD = int(os.environ.get('METHOD', '3'))   # 1 = GP1 maps (21 Oct); 2 = heat scored by whether it pays (25 Oct); 3 = v2 + what's already built + public uses the zone allows (25 Oct)
RADIUS = {'heat': 1200, 'energy': 2000, 'water': {'van': 500, 'edm': 5000}, 'materials': 1000, 'people': 800}

def proj(c):
    k = math.cos(math.radians(c['lat0'])) * 111320.0
    f = lambda lon, lat: ((lon - c['lon0']) * k, (lat - c['lat0']) * 110540.0)
    g = lambda x, y: (c['lon0'] + x / k, c['lat0'] + y / 110540.0)
    return f, g

def van_status(z):   # tool/index.html vanStatus
    z = (z or '').strip()
    if z in ('I-2', 'I-1C', 'I-3', 'FC-2'): return 'case'
    if z.startswith('CD-1') or not z or z == '?': return 'site'
    if z in ('DD', 'FCCDD', 'CWD', 'BCPED', 'DEOD'): return 'site'
    return 'no'

STD = ['RS', 'RSF', 'RSM', 'RM', 'RL', 'RR', 'MUN', 'MU', 'CN', 'CG', 'CB', 'A', 'NA', 'PSN', 'PS', 'PU', 'AG']
def edm_status(zraw, lot):   # tool/index.html edmStatus + engine.js:107
    z = str(zraw or '').strip().split(' ')[0].upper() if zraw else ''
    if z == 'IH': return 'yes' if (lot or 0) >= 10000 else 'case'
    if z in ('IM', 'BE'): return 'case'
    if z in ('UI', 'FD'): return 'no'
    if z.startswith('DC'): return 'site'
    if z not in STD: return 'site'
    return 'no'

# public uses each zone allows (method v3): six kinds, each scored 1 permitted/outright, 0.5 conditional or temporary only, 0 not listed;
# zone score = mean of the six. Kinds: community, assembly/entertainment, markets/retail, food, child care, urban agriculture.
# Edmonton Bylaw 20001 s. 2.120 BE, 2.130 IM, 2.140 IH (uses are permitted or not listed; IM Special Event and Vancouver "Arts and Culture Event"
# are temporary, so 0.5; IM Indoor Sales limited to existing = 0). Vancouver district schedules I-2, I-1C, I-3, FC-2, s. 2.1 tables (2026).
# Zones where a data centre needs a site-specific or rezoning decision are not scored (0.5, neutral): their uses would be set by that decision.
USES = {'edm': {'BE': (1, 1, 1, 1, 1, 1), 'IM': (0, .5, 0, 0, 0, 1), 'IH': (0, 0, 0, 0, 0, 0)},
        'van': {'I-2': (.5, .5, .5, .5, .5, .5), 'I-1C': (.5, 1, .5, .5, .5, .5), 'I-3': (.5, .5, .5, .5, .5, .5), 'FC-2': (.5, 1, .5, 1, .5, .5)}}
def uses_score(city, z):
    z = (z or '').strip(); z = z.split(' ')[0].upper() if city == 'edm' else z
    u = USES[city].get(z); return sum(u) / 6 if u else 0.5
BUILT_FULL = 0.5      # assumption: a cell half covered by buildings counts as fully built
BUILT_W = 0.3         # assumption: an existing building can cost up to 30 % of the site score (reuse is possible, so not more)
USES_W = 0.5          # assumption: people x (0.5 + 0.5 x uses)

def industrial(city, z):
    z = (z or '').strip().split(' ')[0].upper()
    return z.startswith(('I-', 'M-', 'IC-')) if city == 'van' else z in ('IH', 'IM', 'BE')

def demand(city, p):   # tool/cards.js heatEcon: fuel bought for heating x 0.85
    if p.get('t') == 'campus' or p.get('seas') or p.get('ten'): return 0.0
    if p.get('dem'): use = p['dem']
    elif p.get('t') == 'housing' and p.get('u'): use = p['u'] * HOME_MWH[city]
    elif p.get('fa') and p.get('t') in CEUD[city]: use = p['fa'] * CEUD[city][p['t']] / 3.6
    else: return 0.0
    return use * BOILER

def p95(a):
    a = a[a > 0]
    return float(np.percentile(a, 95)) if len(a) else 1.0

def run(city):
    cfg = CITY[city]; f, g = proj(cfg); log = {}
    # parcels: zoning points
    pts = []
    if city == 'van':
        for ft in json.load(open(os.path.join(D, 'vancouver_parcels_2026.geojson')))['features']:
            c = shape(ft['geometry']).centroid; x, y = f(c.x, c.y); z = ft['properties'].get('zoning')
            pts.append((x, y, van_status(z), industrial(city, z), uses_score(city, z)))
    else:
        for r in csv.DictReader(open(os.path.join(D, 'edmonton_properties_2026.csv'))):
            try: lat, lon = float(r['lat']), float(r['lon'])
            except ValueError: continue
            lot = float((r['lot_size_m2'] or '0').replace(',', '') or 0); x, y = f(lon, lat)
            pts.append((x, y, edm_status(r['zoning'], lot), industrial(city, r['zoning']), uses_score(city, r['zoning'])))
    rank = {'yes': 3, 'case': 2, 'site': 1, 'no': 0}; inv = {v: k for k, v in rank.items()}
    best = {}; P = np.array([(p[0], p[1]) for p in pts]); IND = np.array([p[3] for p in pts], bool)
    bestu = {}
    for x, y, k, _, u in pts:
        key = (int(math.floor(x / C)), int(math.floor(y / C))); best[key] = max(best.get(key, 0), rank[k])
        bestu[key] = max(bestu.get(key, (-1, 0)), (rank[k], u))
    keys = sorted(best); XY = np.array([((i + .5) * C, (j + .5) * C) for i, j in keys]); N = len(keys)
    log['cells'] = N; log['parcels'] = len(pts)
    site = np.array([SITE[inv[best[k]]] for k in keys])
    uses = np.array([bestu[k][1] for k in keys]); built = np.zeros(N); ready = np.ones(N)
    if METHOD >= 3:
        bc = json.load(open(os.path.join(H, 'built_cover_%s.json' % city)))
        built = np.array([bc.get('%s_%d_%d' % (city, i, j), 0.0) for i, j in keys]); ready = np.clip(1 - built / BUILT_FULL, 0, 1)
        site = site * (1 - BUILT_W + BUILT_W * ready)
    if city == 'van':   # floodplain
        fl = []
        for row in list(csv.reader(open(os.path.join(D, 'vancouver_designated_floodplain.csv'), encoding='utf-8-sig'), delimiter=';'))[1:]:
            if row[1].startswith(('Designated Floodplain', 'Still Creek')):
                gj = json.loads(row[5]); geoms = [gj['coordinates']] if gj['type'] == 'Polygon' else gj['coordinates']
                for poly in geoms: fl.append(Polygon([f(*q) for q in poly[0]]))
        FP = prep(unary_union(fl)); inflood = np.array([FP.contains(Point(*c)) for c in XY]); site[inflood] *= FLOOD; log['cells_in_floodplain'] = int(inflood.sum())
    tree = cKDTree(XY)
    # ---- heat
    R = json.load(open(os.path.join(T, 'tiles', city, 'receivers.json')))
    rx, rd, rr, rt = [], [], [], []
    for p in R['pts']:
        dm = demand(city, p); x, y = f(p['lon'], p['lat']); rx.append((x, y)); rd.append(dm); rr.append(REACH.get(p['t'], REACH_DEF)); rt.append(p['t'])
    rx = np.array(rx); rd = np.array(rd); rr = np.array(rr)
    heatMWh = np.zeros(N); nrec = np.zeros(N, int)
    for k, (x, y) in enumerate(rx):
        idx = tree.query_ball_point((x, y), rr[k])
        if not idx: continue
        d = np.hypot(XY[idx, 0] - x, XY[idx, 1] - y); w = np.clip(1 - d / rr[k], 0, 1)
        heatMWh[idx] += rd[k] * w; nrec[idx] += 1
    log['receivers'] = len(rx); log['receivers_with_demand'] = int((rd > 0).sum()); log['receiver_demand_MWh'] = round(float(rd.sum()))
    # method v2 (25 Oct 2026): each network and the direct-to-building route carry a 'pays' factor = min(1, value / cost) x timing (networks_v2.json)
    V2 = json.load(open(os.path.join(H, 'networks_v2.json'))) if METHOD >= 2 else None
    nets = []
    for n in R.get('nets', []):
        ring = V2['nets'].get(n['n'], {}).get('ring', n['ring']) if V2 else n['ring']
        nets.append((n['n'], Polygon([f(*q) for q in ring]), V2['nets'][n['n']] if V2 else None))
    netd = np.full(N, np.inf); netn = [''] * N; net_term = np.zeros(N); netbest = [''] * N
    for nm, poly, fac in nets:
        for k in tree.query_ball_point(poly.centroid.coords[0], 15000):
            d = poly.distance(Point(*XY[k]))
            if d < netd[k]: netd[k] = d; netn[k] = nm
            if fac is None: t = 1.0 if d <= 0 else 1 - 0.5 * d / NET_REACH if d <= NET_REACH else 0.0
            elif not fac['cost'] or d > NET_REACH: t = 0.0
            else: t = min(1.0, fac['value'] / (fac['cost'] + fac['pipe_per_m'] * max(d, 0.0))) * fac['timing']
            if t > net_term[k]: net_term[k] = t; netbest[k] = nm
    direct = V2['direct'][city]['factor'] if V2 else 1.0
    heat = np.maximum(np.clip(heatMWh / p95(heatMWh), 0, 1) * direct, net_term)
    # ---- energy
    S = json.load(open(os.path.join(T, 'substations.json')))
    subs = [(a[0], a[1]) for a in S['cities'][city]] + [(n['x'], n['y']) for n in S['named'][city] if 'planned' not in (n.get('status') or '')]
    dsub, _ = cKDTree(np.array(subs, float)).query(XY); sub = np.clip(1 - dsub / SUB_REACH, 0, 1)
    cen = json.load(open(os.path.join(T, 'census_%s.json' % city)))
    CXY = np.array([((c[0] + .5) * C, (c[1] + .5) * C) for c in cen['cells']]); POP = np.array([c[2] for c in cen['cells']]); HH = np.array([c[5] for c in cen['cells']])
    if METHOD >= 2 and city == 'edm':
        # census lag (2021): add homes built 2022 or later from the 2026 assessment roll. 'Residential' accounts = 1 home each (houses, townhouses, condo suites);
        # 'Other Residential' (rental buildings) = gross floor area / 85 m2 per home (assumption). People = homes x the city's census persons per household.
        pph = POP.sum() / HH.sum(); ax, ap, ah = [], [], []
        for r in csv.DictReader(open(os.path.join(D, 'edmonton_properties_2026.csv'))):
            y = r['year_built']
            if not (y.isdigit() and int(y) >= 2022) or r['tax_class'] not in ('Residential', 'Other Residential'): continue
            try: lat, lon = float(r['lat']), float(r['lon'])
            except ValueError: continue
            ga = float((r['gross_area_m2'] or '0').replace(',', '') or 0)
            u = 1.0 if r['tax_class'] == 'Residential' else max(1.0, ga / 85.0)
            ax.append(f(lon, lat)); ah.append(u); ap.append(u * pph)
        log['homes_added_2022_on'] = round(sum(ah)); log['people_added_2022_on'] = round(sum(ap)); log['persons_per_household'] = round(float(pph), 3)
        CXY = np.vstack([CXY, np.array(ax)]); POP = np.concatenate([POP, ap]); HH = np.concatenate([HH, ah])
    ctree = cKDTree(CXY)
    def within(r, vals): return np.array([vals[i].sum() if i else 0.0 for i in ctree.query_ball_point(XY, r)])
    hh1k = within(EV_R, HH)
    EV = json.load(open(os.path.join(T, 'ev_%s.json' % city)))['pts']; EXY = np.array([f(p[1], p[0]) for p in EV]); EP = np.array([p[2] + p[3] for p in EV], float)
    ports = np.array([EP[i].sum() if i else 0.0 for i in cKDTree(EXY).query_ball_point(XY, EV_R)])
    ev = np.clip(hh1k / p95(hh1k), 0, 1) * (1 - np.clip(ports / EV_PORTS_FULL, 0, 1))
    energy = W_EN[0] * sub + W_EN[1] * ev
    if city == 'van':
        cp = json.load(open(os.path.join(D, 'networks', 'van_cpcn_study_area.geojson')))['geometry']['coordinates'][0]
        CP = prep(Polygon([f(*q) for q in cp])); incp = np.array([CP.contains(Point(*c)) for c in XY]); energy[incp] *= CPCN; log['cells_in_cpcn'] = int(incp.sum())
    # ---- water
    if city == 'van':
        W = json.load(open(os.path.join(T, 'water_permits_van.json')))['pts']
        WXY = np.array([f(p[1], p[0]) for p in W if p[2] in ('ct', 'bw')])
        nct = np.array([len(i) for i in cKDTree(WXY).query_ball_point(XY, CT_R)], float); water = np.clip(nct / p95(nct), 0, 1); wraw = nct
    else:
        gb = f(-113.41248222564, 53.5601891861)   # assessment parcel zoned PU, River Valley Gold Bar, 19.7 ha: taken as the Gold Bar plant site (check)
        dgb = np.hypot(XY[:, 0] - gb[0], XY[:, 1] - gb[1]); water = np.clip(1 - dgb / GOLDBAR_R, 0, 1); wraw = dgb
    # ---- materials
    ST = json.load(open(os.path.join(T, 'streets_%s.json' % city)))
    art = {'van': ('Arterial', 'Secondary Arterial'), 'edm': ('Arterial',)}[city]
    ac = [i for i, c in enumerate(ST['classes']) if c in art]; AP = []
    for s in ST['segs']:
        if s[0] in ac:
            q = s[2:]
            for i in range(0, len(q) - 2, 2):
                L = math.hypot(q[i + 2] - q[i], q[i + 3] - q[i + 1]); n = max(1, int(L // 25))
                for t in range(n + 1): AP.append((q[i] + (q[i + 2] - q[i]) * t / n, q[i + 1] + (q[i + 3] - q[i + 1]) * t / n))
    dart, _ = cKDTree(np.array(AP)).query(XY); access = np.clip(1 - dart / ART_R, 0, 1)
    ptree = cKDTree(P); ind = np.array([IND[i].mean() if i else 0.0 for i in ptree.query_ball_point(XY, IND_R)])
    SXY = rx[np.array([t == 'school' for t in rt])]; nsch = np.array([len(i) for i in cKDTree(SXY).query_ball_point(XY, SCH_R)], float)
    materials = W_MAT[0] * access + W_MAT[1] * np.clip(ind / p95(ind), 0, 1) + W_MAT[2] * np.clip(nsch / p95(nsch), 0, 1)
    # ---- people
    pop800 = within(PEOPLE_R, POP); pop150 = within(NOISE_R, POP)
    people = np.clip(pop800 / p95(pop800), 0, 1) * (1 - NOISE_W * np.clip(pop150 / p95(pop150), 0, 1))
    if METHOD >= 3: people = people * (1 - USES_W + USES_W * uses)
    # ---- overlap
    A = dict(heat=heat, energy=energy, water=water, materials=materials, people=people)
    overlap = np.mean([A[k] for k in EXCH], axis=0); zoned = overlap * site; nstrong = sum((A[k] >= 0.5).astype(int) for k in EXCH)
    # ---- write grid
    feats = []
    for k, (i, j) in enumerate(keys):
        ring = [g(i * C, j * C), g((i + 1) * C, j * C), g((i + 1) * C, (j + 1) * C), g(i * C, (j + 1) * C), g(i * C, j * C)]
        pr = dict(id='%s_%d_%d' % (city, i, j), site=round(site[k], 2), zoning_best=inv[best[keys[k]]], heat=round(heat[k], 3), energy=round(energy[k], 3), water=round(water[k], 3),
                  materials=round(materials[k], 3), people=round(people[k], 3), overlap=round(overlap[k], 3), overlap_zoned=round(zoned[k], 3), n_strong=int(nstrong[k]),
                  heat_MWh_weighted=round(heatMWh[k]), receivers_in_reach=int(nrec[k]), network=netn[k] if netd[k] <= NET_REACH else '', network_dist_m=None if not np.isfinite(netd[k]) else round(netd[k]), heat_net_term=round(float(net_term[k]), 3), heat_net_best=netbest[k],
                  substation_dist_m=round(dsub[k]), households_1km=round(hh1k[k]), ev_ports_1km=int(ports[k]),
                  water_raw=round(float(wraw[k]), 1), arterial_dist_m=round(dart[k]), industrial_share_1km=round(ind[k], 3), schools_2km=int(nsch[k]),
                  pop_800m=round(pop800[k]), pop_150m=round(pop150[k]), built_cover=round(float(built[k]), 3), site_ready=round(float(ready[k]), 3), public_uses=round(float(uses[k]), 3))
        feats.append(dict(type='Feature', geometry=dict(type='Polygon', coordinates=[[[round(a, 6), round(b, 6)] for a, b in ring]]), properties=pr))
    json.dump(dict(type='FeatureCollection', name='%s_grid' % city, crs_note='WGS84 lon/lat; cells are 100 m in the tool frame', features=feats),
              open(os.path.join(H, '%s_grid.geojson' % city), 'w'), separators=(',', ':'))
    # ---- peaks: the best places for each aspect, at least 2 km apart, with that aspect's radius
    def peaks(score, n=5, sep=2000, mask=None):
        order = np.argsort(-score); out = []
        for k in order:
            if score[k] <= 0 or (mask is not None and not mask[k]): continue
            if all(math.hypot(*(XY[k] - XY[m])) >= sep for m in out): out.append(k)
            if len(out) == n: break
        return out
    pf = []
    for asp in EXCH + ['overlap', 'overlap_zoned']:
        sc = zoned if asp == 'overlap_zoned' else overlap if asp == 'overlap' else A[asp]; tb = sc + 1e-9 * heatMWh if asp == 'heat' else sc; r = RADIUS.get(asp, 1000); r = r[city] if isinstance(r, dict) else r
        single = city == 'edm' and asp == 'water'   # one source (Gold Bar): one peak
        for rank_, k in enumerate(peaks(tb, n=1 if single else 5, mask=(site >= SITE['site']) if asp == 'overlap_zoned' else None), 1):
            lon, lat = g(*XY[k]); circ = Point(*XY[k]).buffer(r, 64)
            pf.append(dict(type='Feature', geometry=dict(type='Point', coordinates=[round(lon, 6), round(lat, 6)]),
                           properties=dict(aspect=asp, rank=rank_, score=round(float(sc[k]), 3), radius_m=r, cell=feats[k]['properties']['id'], **{e: feats[k]['properties'][e] for e in EXCH + ['site', 'overlap', 'n_strong']})))
            pf.append(dict(type='Feature', geometry=dict(type='Polygon', coordinates=[[[round(a, 6), round(b, 6)] for a, b in (g(*q) for q in circ.exterior.coords)]]),
                           properties=dict(aspect=asp, rank=rank_, radius_m=r, kind='radius')))
    json.dump(dict(type='FeatureCollection', name='%s_peaks' % city, features=pf), open(os.path.join(H, '%s_peaks.geojson' % city), 'w'), separators=(',', ':'))
    for k in EXCH + ['site']: log['mean_' + k] = round(float((A.get(k) if k != 'site' else site).mean()), 3)
    log['cells_n_strong_ge3'] = int((nstrong >= 3).sum()); log['cells_n_strong_5'] = int((nstrong == 5).sum())
    return log

if __name__ == '__main__':
    out = {c: run(c) for c in CITY}
    json.dump(out, open(os.path.join(H, 'summary.json'), 'w'), indent=1); print(json.dumps(out, indent=1))
