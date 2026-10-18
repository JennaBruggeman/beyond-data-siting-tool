#!/usr/bin/env python3
"""Receiver clean-up (sweep M6 and M7, agreed with J.B. 18 Oct 2026). Run after make_receivers.py; works on the current receiver files, so manual
corrections already made there (Nat Bailey removed, Blatchford note) are kept. Idempotent: running it twice gives the same result.

M6, one record per site:
  - Hospitals: hospital records within 150 m of each other, or within 400 m sharing a distinctive word in the name, are one site. A care record within 150 m joins it only if its name shares a distinctive
    word with a hospital name in that site (Banfield / Vancouver General, Holy Family, Mount St Joseph). Other care homes stay separate.
  - Every other type: records of the same type, the same name (after dropping "swimming" and case) and within 300 m are one record.
  - The merged record keeps the first name and lists the others in 'aka'.

M6, floor area of the site's own buildings only (replaces receiver_floor.py's whole-parcel sum):
  - Each point's building = the building outline it sits in, else the nearest outline within 40 m (geocoded points often sit on the street).
  - Site floor area = Σ over its distinct buildings of footprint × storeys (tallest height ÷ 4 m, at least 1). An upper estimate where a building steps down.
  - No outline within 40 m → no floor area (demand "not yet known").
  - One outline over 30,000 m² is a connected complex under one tallest height (only the University of Alberta Hospital outline, 64,216 m²) → no floor
    area, flag fx. Threshold is Claude's rule, stated in the card.
  - A school that rents space in a building of other uses has no building of its own: ODEF 'Private Institution' (private career colleges),
    or a school whose building is 40 m or taller (a tower). Flag 'ten', no floor area. Threshold is Claude's rule, stated in the card.
  - Two records of different types in the same building (an arena inside a recreation centre) → the building is counted once, under the first record;
    the second carries 'fs' = the name it shares with.

M7, categories:
  - Edmonton ODSRF "Community league hall" records become type 'hall' (141), so 'rec' means a recreation centre in both cities.
  - Outdoor pools (ODSRF source class "Outdoor Pool" / "Outdoor swimming pool") get seas='summer'; a pool listed both indoor and outdoor gets
    seas='conflict'. Demand for both is shown as not yet known.
"""
import json, math, os, glob, re, sqlite3, collections
from shapely.geometry import Polygon, Point
from shapely.strtree import STRtree
H = os.path.dirname(os.path.abspath(__file__)); X = os.path.join(H, '..', 'data', 'raw', 'receivers', 'x')
CITY = {'van': dict(lat0=49.25, lon0=-123.12, T=1500), 'edm': dict(lat0=53.54, lon0=-113.50, T=2500)}; Q = 2
TYPES = {'school', 'hospital', 'care', 'rec', 'pool', 'arena', 'hall', 'campus'}
STOP = {'hospital', 'health', 'care', 'centre', 'center', 'providence', 'the', 'of', 'and', 'st', 'saint', 'pavilion', 'building', 'extended', 'unit', 'bc', 'british', 'columbia', 'vancouver', 'edmonton', 'covenant', '-'}

def dec(r, ox, oy):
    pts = []; x = y = None
    for i in range(0, len(r), 2):
        if x is None: x, y = r[i], r[i + 1]
        else: x += r[i]; y += r[i + 1]
        pts.append((ox + x / Q, oy + y / Q))
    return pts
def words(n): return {w for w in re.findall(r"[a-z]+", n.lower().replace("'s", '')) if w not in STOP and len(w) > 2}
GEN = {'college', 'university', 'institute', 'technology', 'campus', 'school', 'art', 'design', 'community'}
def norm(n): return re.sub(r'\s+', ' ', re.sub(r'(?i)\bswimming\b', '', n)).strip().lower()

# ODSRF source classes, by (city, name)
db = sqlite3.connect(os.path.join(X, 'odsrf_v2.gpkg')); CLS = collections.defaultdict(set)
ODEF = {}
import csv
for r in csv.DictReader(open(os.path.join(X, 'ODEF_v2.1_EN', 'ODEF_v2_1.csv'), encoding='latin-1')):
    if r['CSDNAME'] in ('Vancouver', 'Edmonton'): ODEF[({'Vancouver': 'van', 'Edmonton': 'edm'}[r['CSDNAME']], r['Facility_Name'])] = r['Facility_Type']
for name, cls, csd in db.execute("select name, source_class, csdname from odsrf_v2 where csdname in ('Vancouver','Edmonton') and type in ('Swimming','Arena or stadium','Recreation centre')"):
    CLS[({'Vancouver': 'van', 'Edmonton': 'edm'}[csd], name or '')].add(cls)

for c, P in CITY.items():
    k = math.cos(math.radians(P['lat0'])) * 111320.0; T = P['T']
    B = []
    for f in glob.glob(os.path.join(H, 'tiles', c, 't_*.json')):
        i, j = map(int, os.path.basename(f)[2:-5].split('_')); d = json.load(open(f))
        for b in d.get('B', []):
            pts = dec(b[1], i * T, j * T)
            if len(pts) >= 3:
                pg = Polygon(pts)
                if pg.is_valid and pg.area > 20: B.append((pg, b[0]))
    tree = STRtree([b[0] for b in B])
    path = os.path.join(H, 'tiles', c, 'receivers.json'); D = json.load(open(path)); pts = D['pts']
    xy = lambda p: ((p['lon'] - P['lon0']) * k, (p['lat'] - P['lat0']) * 110540.0)

    # M7 categories (before merging, so names still match ODSRF)
    for p in pts:
        cls = CLS.get((c, p['n']), set())
        if p['t'] == 'rec' and cls == {'Community league hall'}: p['t'] = 'hall'
        if p['t'] == 'pool':
            out = {x for x in cls if 'outdoor' in x.lower()}
            p.pop('seas', None)
            if out and len(out) == len(cls): p['seas'] = 'summer'
            elif out: p['seas'] = 'conflict'

    # M86 campuses: public universities and colleges with their own grounds, from each province's official list
    #   Vancouver: B.C. Locations of Post-Secondary Institutions (open.canada.ca 81558d54…; J.B. extract 18 Oct 2026), Institution Type 'Public Post-Secondary',
    #     Location Description Main Campus / Campus / Shared Campus ('Centre' left out), point inside the City of Vancouver local areas (UBC's Point Grey campus is outside).
    #   Edmonton: Alberta 'Types of publicly funded institutions' (alberta.ca, J.B. PDF 18 Oct 2026), the four public types (CARU, CCC, polytechnic, undergraduate
    #     university) with a campus in Edmonton; independent academic institutions (Concordia, King's, MaKami) are not public in the BC sense and stay schools.
    LA = None
    if c == 'van':
        from shapely.geometry import shape
        from shapely.ops import unary_union
        LA = unary_union([shape(f['geometry']) for f in json.load(open(os.path.join(H, '..', 'data', 'raw', 'van', 'local_areas', 'local-area-boundary_2026-10-18.geojson')))['features']])
        rows = [r for r in csv.DictReader(open(os.path.join(H, '..', 'data', 'raw', 'receivers', 'bc_postsecondary_vancouver_extract_2026-10-18.csv')))
                if r['Institution Type'] == 'Public Post-Secondary' and r['Location Description'] != 'Centre' and LA.contains(Point(float(r['Longitude']), float(r['Latitude'])))]
        bypt = collections.defaultdict(list)
        for r in rows: bypt[(float(r['Longitude']), float(r['Latitude']))].append(r)
        CAMP = []
        for (lo, la), g in bypt.items():
            if len(g) > 1: n = f"{g[0]['Location']} (shared: {', '.join(r['Acronym'] for r in g)})"
            else: n = f"{g[0]['Institution']} – {g[0]['Location']}"
            CAMP.append(dict(t='campus', n=n, lon=lo, lat=la, src='bcPSI', inst=sorted({r['Institution'] for r in g})))
    else:
        CAMP = [dict(t='campus', n='MacEwan University – City Centre Campus', lon=-113.507548, lat=53.547271, src='abPSI', inst=['Grant MacEwan University'],
                     loc='10700 104 Avenue NW (macewan.ca maps page), located by the City of Edmonton property record at that address')]
        CONV = {'University of Alberta': 'University of Alberta – North Campus', 'Northern Alberta Institute of Technology': 'NAIT – Main Campus', 'Norquest College': 'NorQuest College'}
        for p in pts:
            if p['t'] == 'school' and p['n'] in CONV:
                p['t'] = 'campus'; p.setdefault('aka', []); p['aka'] = sorted(set(p['aka']) | {p['n']}); p['n'] = CONV[p['n']]; p['src2'] = p.get('src2') or 'abPSI'
    have = {p['n'] for p in pts}
    for cp in CAMP:
        if cp['n'] in have: continue
        # an ODEF school record of the same institution within 400 m is the same place: fold it in
        pts.append(cp)
    camps = [p for p in pts if p['t'] == 'campus']
    for p in list(pts):  # fold each ODEF school record of the same institution into the nearest campus within 400 m
        if p['t'] != 'school': continue
        best = None
        for cp in camps:
            dd = math.hypot(xy(p)[0] - xy(cp)[0], xy(p)[1] - xy(cp)[1])
            same = any((words(i) & words(p['n'])) - GEN or norm(i) == norm(p['n']) for i in cp.get('inst', [cp['n'].split(' – ')[0]]))
            if dd <= 400 and same and (best is None or dd < best[0]): best = (dd, cp)
        if best: best[1]['aka'] = sorted(set(best[1].get('aka', [])) | {p['n']}); pts.remove(p)

    # M6 merge
    rec = [p for p in pts if p['t'] in TYPES]; other = [p for p in pts if p['t'] not in TYPES]
    par = list(range(len(rec)))
    def find(i):
        while par[i] != i: par[i] = par[par[i]]; i = par[i]
        return i
    def dist(a, b): (x1, y1), (x2, y2) = xy(a), xy(b); return math.hypot(x1 - x2, y1 - y2)
    for i in range(len(rec)):
        for j in range(i + 1, len(rec)):
            a, b = rec[i], rec[j]
            if a['t'] == 'hospital' and b['t'] == 'hospital' and (dist(a, b) <= 150 or dist(a, b) <= 400 and words(a['n']) & words(b['n'])): par[find(i)] = find(j)
            elif a['t'] == b['t'] and norm(a['n']) == norm(b['n']) and dist(a, b) <= 300: par[find(i)] = find(j)
    # care records named after a hospital in a nearby hospital site
    for i, a in enumerate(rec):
        if a['t'] != 'care': continue
        for j, b in enumerate(rec):
            if b['t'] == 'hospital' and dist(a, b) <= 150 and words(a['n']) & words(b['n']): par[find(i)] = find(j); break
    groups = collections.defaultdict(list)
    for i, p in enumerate(rec): groups[find(i)].append(p)
    merged = []
    for g in groups.values():
        g.sort(key=lambda p: (p['t'] != 'hospital', len(p['n'])))
        m = dict(g[0]); m['t'] = 'hospital' if any(p['t'] == 'hospital' for p in g) else g[0]['t']
        allnames = {p['n'] for p in g} | {a for p in g for a in p.get('aka', [])}
        if m['t'] == 'hospital' and len(allnames) > 1:  # the site's own name: the most common '... Hospital' part of its records' names
            base = collections.Counter(x.strip() for n in allnames for x in n.split(' - ') if 'hospital' in x.lower() and '(' not in x)
            if base: m['n'] = sorted(base.items(), key=lambda kv: (-(kv[1] + sum(kv[0].lower() in n.lower() for n in allnames if n != kv[0])), len(kv[0])))[0][0]
        aka = sorted(allnames - {m['n']})
        m.pop('aka', None)
        if aka: m['aka'] = aka
        for key in ('de', 'src2', 'seas'):
            for p in g:
                if p.get(key) and not m.get(key): m[key] = p[key]
        mp = [q for p in g for q in (p.get('mp') or [[p['lon'], p['lat']]])]
        m.pop('mp', None)
        if len(mp) > 1: m['mp'] = sorted({tuple(q) for q in mp})
        merged.append(m)

    # M6 floor area per site
    owner = {}; n_fa = n_none = n_fx = n_fs = n_ten = 0
    for m in merged:
        for kk in ('fa', 'fh', 'fm', 'fl', 'fx', 'fs', 'ten'): m.pop(kk, None)
        if m['t'] == 'school' and ODEF.get((c, m['n'])) == 'Private Institution': m['ten'] = 1; n_ten += 1; continue
        bl = {}
        for lo, la in (m.get('mp') or [[m['lon'], m['lat']]]):
            q = Point(*xy({'lon': lo, 'lat': la})); hit = [int(x) for x in tree.query(q) if B[int(x)][0].contains(q)]
            if not hit:
                cand = [int(x) for x in tree.query(q.buffer(40))]
                cand = [x for x in cand if B[x][0].distance(q) <= 40]
                hit = [min(cand, key=lambda x: B[x][0].distance(q))] if cand else []
            else: hit = [min(hit, key=lambda x: B[x][0].area)]
            for x in hit: bl[x] = B[x]
        bl = {x: v for x, v in bl.items() if v[1] and v[1] > 0}
        if m['t'] == 'campus': continue  # a campus has several buildings: demand stays not yet known (noDemand in cards.js)
        if not bl: n_none += 1; continue
        if any(v[0].area > 30000 for v in bl.values()): m['fx'] = 1; n_fx += 1; continue
        if m['t'] in ('school', 'campus') and max(v[1] for v in bl.values()) >= 40: m['ten'] = 1; n_ten += 1; continue
        mine = {x: v for x, v in bl.items() if x not in owner}
        shared = [owner[x] for x in bl if x in owner]
        if not mine: m['fs'] = shared[0]; n_fs += 1; continue
        for x in mine: owner[x] = m['n']
        m['fa'] = round(sum(g.area * max(1, round(h / 4)) for g, h in mine.values()))
        m['fh'] = round(max(h for g, h in mine.values()), 1); m['fm'] = len(mine); n_fa += 1
    for m in merged: m.pop('inst', None)
    D['pts'] = other + merged
    json.dump(D, open(path, 'w'), ensure_ascii=False, separators=(',', ':'))
    json.dump(D['pts'], open(os.path.join(H, f'receivers_{c}.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
    print(c, 'records', len(rec), '→', len(merged), '| floor area', n_fa, 'none', n_none, 'complex', n_fx, 'shared', n_fs, 'tenant', n_ten,
          '|', dict(collections.Counter(p['t'] for p in D['pts'])), '| outdoor pools', sum(1 for p in merged if p.get('seas') == 'summer'), 'conflict', sum(1 for p in merged if p.get('seas') == 'conflict'))
