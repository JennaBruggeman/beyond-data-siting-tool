#!/usr/bin/env python3
"""Cut both cities' open data into small tiles the tool page loads on demand (Beyond Data, round 1, 14 Oct 2026).

Output (tool/tiles/, not in git — regenerate from data/):
  {city}/meta.json          projection, tile size, extent, overview zones, zone list
  {city}/t_{i}_{j}.json     parcels (Vancouver polygons; Edmonton points), buildings, attributes
  {city}/s_{k}.tsv          address search shards
Coordinates: local equirectangular metres from a city origin, quantised to 0.5 m, rings delta-encoded.
"""
import json, os, csv, math, collections, sys
from shapely.geometry import shape, Polygon, MultiPolygon, mapping
from shapely.ops import unary_union

H = os.path.dirname(os.path.abspath(__file__)); D = os.path.join(H, '..', 'data'); OUT = os.path.join(H, 'tiles')
CITY = {'van': dict(lat0=49.25, lon0=-123.12, T=1500), 'edm': dict(lat0=53.54, lon0=-113.50, T=2500)}
Q = 2  # units per metre (0.5 m)

def proj(c):
    k = math.cos(math.radians(c['lat0'])) * 111320.0
    return lambda lon, lat: ((lon - c['lon0']) * k, (lat - c['lat0']) * 110540.0)

def ring_enc(coords, ox, oy):
    out, px, py = [], None, None
    for x, y in coords:
        qx, qy = round((x - ox) * Q), round((y - oy) * Q)
        if px is None: out += [qx, qy]
        else:
            if qx == px and qy == py: continue
            out += [qx - px, qy - py]
        px, py = qx, qy
    return out

def to_local(geom, P):
    def tr(ring): return [P(x, y) for x, y in ring]
    if geom.geom_type == 'Polygon': return [Polygon(tr(geom.exterior.coords))]
    return [Polygon(tr(g.exterior.coords)) for g in geom.geoms]

def num(v):
    try: return float(str(v).replace(',', '')) if v not in (None, '') else None
    except ValueError: return None

def tkey(x, y, T): return (math.floor(x / T), math.floor(y / T))

def write(path, obj):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f: json.dump(obj, f, ensure_ascii=False, separators=(',', ':'))

def overview(polys_by_cat, tol):
    out = []
    for cat, ps in polys_by_cat.items():
        u = unary_union([p.buffer(0.5) for p in ps]).buffer(-0.5).simplify(tol)
        for g in ([u] if u.geom_type == 'Polygon' else list(getattr(u, 'geoms', []))):
            if g.geom_type != 'Polygon' or g.area < 400: continue
            out.append([cat, ring_enc(list(g.exterior.coords), 0, 0)])
    return out

def shard_key(a):
    a = a.strip()
    return a[0] if a and a[0].isdigit() else 'x'

# ---------------- Vancouver ----------------
def vancouver():
    c = CITY['van']; P = proj(c); T = c['T']
    tiles = collections.defaultdict(lambda: dict(P=[], B=[], A={}))
    gj = json.load(open(os.path.join(D, 'vancouver_parcels_2026.geojson'), encoding='utf-8'))
    zone_polys = collections.defaultdict(list); addr = {}; ALLP = []
    for f in gj['features']:
        pr = f['properties']; tc = pr.get('tax_coord') or ''
        for poly in to_local(shape(f['geometry']), P):
            poly = poly.simplify(0.3)
            if poly.is_empty: continue
            cx, cy = poly.representative_point().coords[0]; k = tkey(cx, cy, T); t = tiles[k]
            ox, oy = k[0] * T, k[1] * T
            t['P'].append([tc, ring_enc(list(poly.exterior.coords), ox, oy)])
            if tc and tc not in t['A']:
                t['A'][tc] = [pr.get('address') or '', pr.get('zoning') or '', pr.get('zoning_class') or '', pr.get('legal_type') or '',
                              int(pr.get('strata_units') or 0), int(pr['year_built']) if pr.get('year_built') else None,
                              round(pr['land_value']) if pr.get('land_value') else None, round(pr['improvement_value']) if pr.get('improvement_value') else None,
                              round(pr.get('area_m2') or poly.area)]
                if pr.get('address'): addr[tc] = (pr['address'], k)
            zone_polys[pr.get('zoning') or '?'].append(poly); ALLP.append(poly)
    print('van parcels in', len(tiles), 'tiles')
    # buildings: 2009 footprints, with City LiDAR 2022 measured heights where processed (data/lidar2022, from tool/lidar_hybrid.py)
    # flag: 0 = 2009 height only; 1 = LiDAR 2022 height; 2 = new since 2009 (LiDAR outline); 3 = not found in 2022; 4 = partly changed
    LF, LN = {}, []
    import glob
    for fn in glob.glob(os.path.join(D, 'lidar2022', '*.json')):
        r = json.load(open(fn)); LF.update({int(k): v for k, v in r['fp'].items()}); LN += r['new']
    bj = json.load(open(os.path.join(D, 'vancouver_footprints_2009.geojson'), encoding='utf-8'))
    for f in bj['features']:
        pr = f['properties']; lv = LF.get(pr.get('id'))
        if lv is None: h, fl = round(pr.get('hgt_agl') or 0, 1), 0
        elif lv[2] >= 0.3: h, fl = lv[0], 1
        elif lv[2] < 0.1: h, fl = round(pr.get('hgt_agl') or 0, 1), 3
        else: h, fl = lv[0], 4
        for poly in to_local(shape(f['geometry']), P):
            poly = poly.simplify(0.3)
            if poly.is_empty: continue
            cx, cy = poly.representative_point().coords[0]; k = tkey(cx, cy, T)
            tiles[k]['B'].append([h, ring_enc(list(poly.exterior.coords), k[0] * T, k[1] * T), fl])
    # LiDAR tiles reach past the city limit (Burnaby, the river): keep a new outline only if it sits on a City parcel
    from shapely.strtree import STRtree
    from shapely.geometry import Point
    PT = STRtree(ALLP); nout = 0
    for p90, hmax, area, ring in LN:
        poly = Polygon([P(x, y) for x, y in ring])
        if poly.is_empty: continue
        rp = poly.representative_point()
        if not any(ALLP[i].intersects(rp) for i in PT.query(rp)): nout += 1; continue
        cx, cy = rp.coords[0]; k = tkey(cx, cy, T)
        tiles[k]['B'].append([p90, ring_enc(list(poly.exterior.coords), k[0] * T, k[1] * T), 2])
    print('lidar: footprints measured', len(LF), 'new', len(LN) - nout, '(outside the City, dropped:', nout, ')')
    zl = sorted(zone_polys)
    zi = {z: i for i, z in enumerate(zl)}
    for k, t in tiles.items():
        t['o'] = [k[0] * T, k[1] * T]; write(os.path.join(OUT, 'van', f't_{k[0]}_{k[1]}.json'), t)
    ov = overview({zi[z]: ps for z, ps in zone_polys.items()}, 2.0)
    ks = list(tiles)
    meta = dict(city='van', lat0=c['lat0'], lon0=c['lon0'], T=T, Q=Q, tiles=[list(k) for k in ks],
                ext=[min(k[0] for k in ks) * T, min(k[1] for k in ks) * T, (max(k[0] for k in ks) + 1) * T, (max(k[1] for k in ks) + 1) * T],
                zones=zl, overview=ov,
                sources=['City of Vancouver Open Data: property parcel polygons; property tax report 2026; building footprints 2009', 'City of Vancouver LiDAR 2022 (148 one-kilometre tiles, classified points): building heights and buildings new or gone since 2009, processed 14–15 Oct 2026'], lidar=True)
    # designated floodplain (City of Vancouver Open Data, supplied by J.B. 14 Oct 2026)
    fp = os.path.join(D, 'vancouver_designated_floodplain.csv')
    if os.path.exists(fp):
        csv.field_size_limit(10**9); CAT = {'Designated Floodplain (FCL 4.6m)': 'designated', 'Still Creek Floodplain': 'still', 'Wave Effect Zone': 'wave', 'Fraser Risk Today 1/500 Storm': 'today'}
        fl = []
        for r in csv.DictReader(open(fp, encoding='utf-8-sig'), delimiter=';'):
            g = shape(json.loads(r['Geom'])); parts = [g] if g.geom_type == 'Polygon' else list(g.geoms)
            for pg in parts:
                pg = Polygon([P(x, y) for x, y in pg.exterior.coords], [[P(x, y) for x, y in h.coords] for h in pg.interiors]).simplify(1.0)
                if pg.is_empty or pg.geom_type != 'Polygon': continue
                fl.append([CAT.get(r['Name'], 'other'), [ring_enc(list(pg.exterior.coords), 0, 0)] + [ring_enc(list(h.coords), 0, 0) for h in pg.interiors]])
        meta['flood'] = fl
        meta['sources'].append('City of Vancouver Open Data: designated floodplain (FCL 4.6 m, Still Creek, wave effect zone, Fraser risk today)')
    write(os.path.join(OUT, 'van', 'meta.json'), meta)
    # every civic address in the full tax report (all records, both ends of a number range), not one per lot
    tile_of = {tc: k for tc, (a, k) in addr.items()}
    for k, t in tiles.items():
        for tc in t['A']: tile_of.setdefault(tc, k)
    lines = set()
    for tc, (a, k) in addr.items(): lines.add(f'{a}\t{k[0]}_{k[1]}\t{tc}')
    raw = os.path.join(D, 'raw', 'van', 'property-tax-report.csv')
    if os.path.exists(raw):
        for r in csv.DictReader(open(raw, encoding='utf-8-sig'), delimiter=';'):
            tc = r['LAND_COORDINATE']; k = tile_of.get(tc); st = (r['STREET_NAME'] or '').strip()
            if not k or not st: continue
            for n in {r['FROM_CIVIC_NUMBER'].strip(), r['TO_CIVIC_NUMBER'].strip()} - {''}:
                lines.add(f'{n} {st}\t{k[0]}_{k[1]}\t{tc}')
    sh = collections.defaultdict(list)
    for l in lines: sh[shard_key(l)].append(l)
    for s, ls in sh.items():
        open(os.path.join(OUT, 'van', f's_{s}.tsv'), 'w', encoding='utf-8').write('\n'.join(sorted(ls)))
    print('van addresses', len(lines))
    print('van tiles', len(tiles), 'overview polys', len(ov))

# ---------------- Edmonton ----------------
def edmonton():
    c = CITY['edm']; P = proj(c); T = c['T']
    tiles = collections.defaultdict(lambda: dict(E=[], B=[], A={}))
    grp = collections.OrderedDict()
    for r in csv.DictReader(open(os.path.join(D, 'edmonton_properties_2026.csv'), encoding='utf-8')):
        if not r['lat'] or not r['lon']: continue
        pid = r['parcel_point_id'] or ('a' + r['account'])
        g = grp.setdefault(pid, dict(acc=[], lat=float(r['lat']), lon=float(r['lon']), addr='', zoning=r['zoning'], zmap=r['zone_from_map'], zsrc=r['zoning_source'],
                                      lot=r['parcel_area_m2'] or r['lot_size_m2'], gross=0.0, yb=[], val=0, cls=set(), nb=r['neighbourhood'], ward=r['ward']))
        g['acc'].append(r['account'])
        g.setdefault('alladdr', set())
        if (r['house_number'] + ' ' + r['street']).strip(): g['alladdr'].add((r['house_number'] + ' ' + r['street']).strip())
        a = (r['house_number'] + ' ' + r['street']).strip()
        if a and (not g['addr'] or not r['suite']): g['addr'] = a
        g['gross'] += num(r['gross_area_m2']) or 0
        if num(r['year_built']): g['yb'].append(int(num(r['year_built'])))
        g['val'] += num(r['assessed_value']) or 0
        for cl in (r['class1'], r['class2'], r['class3']):
            if cl: g['cls'].add(cl.title())
    addr = {}; extra = []
    for pid, g in grp.items():
        x, y = P(g['lon'], g['lat']); k = tkey(x, y, T); t = tiles[k]
        t['E'].append([pid, round((x - k[0] * T) * Q), round((y - k[1] * T) * Q)])
        lot = round(num(g['lot'])) if num(g['lot']) else None
        t['A'][pid] = [g['addr'], g['zoning'], g['zmap'], g['zsrc'], lot, round(g['gross']) or None,
                       min(g['yb']) if g['yb'] else None, max(g['yb']) if g['yb'] else None, round(g['val']) or None,
                       sorted(g['cls']), g['nb'], len(g['acc'])]
        if g['addr']: addr[pid] = (g['addr'], k)
        for a2 in g.get('alladdr', ()): extra.append((a2, k, pid))
    print('edm parcel points', len(grp))
    bj = json.load(open(os.path.join(D, 'edmonton_rooflines_est.geojson'), encoding='utf-8'))
    for f in bj['features']:
        pr = f['properties']
        for poly in to_local(shape(f['geometry']), P):
            poly = poly.simplify(0.4)
            if poly.is_empty: continue
            cx, cy = poly.representative_point().coords[0]; k = tkey(cx, cy, T)
            h = pr.get('height_est_m'); tiles[k]['B'].append([round(h, 1) if h else -1, ring_enc(list(poly.exterior.coords), k[0] * T, k[1] * T)])
    zj = json.load(open(os.path.join(D, 'edmonton_zoning.geojson'), encoding='utf-8'))
    zone_polys = collections.defaultdict(list)
    for f in zj['features']:
        z = str(f['properties'].get('zone') or '?').strip()
        for poly in to_local(shape(f['geometry']), P): zone_polys[z].append(poly.simplify(1.0))
    zl = sorted(zone_polys); zi = {z: i for i, z in enumerate(zl)}
    for k, t in tiles.items():
        t['o'] = [k[0] * T, k[1] * T]; write(os.path.join(OUT, 'edm', f't_{k[0]}_{k[1]}.json'), t)
    ov = [[zi[z], ring_enc(list(p.exterior.coords), 0, 0)] for z, ps in zone_polys.items() for p in ps if not p.is_empty]
    ks = list(tiles)
    meta = dict(city='edm', lat0=c['lat0'], lon0=c['lon0'], T=T, Q=Q, tiles=[list(k) for k in ks],
                ext=[min(k[0] for k in ks) * T, min(k[1] for k in ks) * T, (max(k[0] for k in ks) + 1) * T, (max(k[1] for k in ks) + 1) * T],
                zones=zl, overview=ov,
                sources=['City of Edmonton Open Data: property information and assessment 2026; assessment parcel points; zoning bylaw geographical data (12 Oct 2026); rooflines (heights estimated from gross area ÷ footprint × 4 m — ESTIMATE)'])
    write(os.path.join(OUT, 'edm', 'meta.json'), meta)
    sh = collections.defaultdict(list)
    L = {f'{a}\t{k[0]}_{k[1]}\t{pid}' for pid, (a, k) in addr.items()} | {f'{a}\t{k[0]}_{k[1]}\t{pid}' for a, k, pid in extra}
    for l in L: sh[shard_key(l)].append(l)
    print('edm addresses', len(L))
    for s, lines in sh.items():
        open(os.path.join(OUT, 'edm', f's_{s}.tsv'), 'w', encoding='utf-8').write('\n'.join(sorted(lines)))
    print('edm tiles', len(tiles), 'zone polys', len(ov))

if __name__ == '__main__':
    which = sys.argv[1:] or ['van', 'edm']
    if 'van' in which: vancouver()
    if 'edm' in which: edmonton()
