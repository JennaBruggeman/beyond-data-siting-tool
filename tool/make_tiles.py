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
    zone_polys = collections.defaultdict(list); addr = {}
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
            zone_polys[pr.get('zoning') or '?'].append(poly)
    print('van parcels in', len(tiles), 'tiles')
    bj = json.load(open(os.path.join(D, 'vancouver_footprints_2009.geojson'), encoding='utf-8'))
    for f in bj['features']:
        pr = f['properties']
        for poly in to_local(shape(f['geometry']), P):
            poly = poly.simplify(0.3)
            if poly.is_empty: continue
            cx, cy = poly.representative_point().coords[0]; k = tkey(cx, cy, T)
            tiles[k]['B'].append([round(pr.get('hgt_agl') or 0, 1), ring_enc(list(poly.exterior.coords), k[0] * T, k[1] * T)])
    zl = sorted(zone_polys)
    zi = {z: i for i, z in enumerate(zl)}
    for k, t in tiles.items():
        t['o'] = [k[0] * T, k[1] * T]; write(os.path.join(OUT, 'van', f't_{k[0]}_{k[1]}.json'), t)
    ov = overview({zi[z]: ps for z, ps in zone_polys.items()}, 2.0)
    ks = list(tiles)
    meta = dict(city='van', lat0=c['lat0'], lon0=c['lon0'], T=T, Q=Q, tiles=[list(k) for k in ks],
                ext=[min(k[0] for k in ks) * T, min(k[1] for k in ks) * T, (max(k[0] for k in ks) + 1) * T, (max(k[1] for k in ks) + 1) * T],
                zones=zl, overview=ov,
                sources=['City of Vancouver Open Data: property parcel polygons; property tax report 2026; building footprints 2009 (heights as of 2009)'])
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
    sh = collections.defaultdict(list)
    for tc, (a, k) in addr.items(): sh[shard_key(a)].append(f'{a}\t{k[0]}_{k[1]}\t{tc}')
    for s, lines in sh.items():
        open(os.path.join(OUT, 'van', f's_{s}.tsv'), 'w', encoding='utf-8').write('\n'.join(sorted(lines)))
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
        a = (r['house_number'] + ' ' + r['street']).strip()
        if a and (not g['addr'] or not r['suite']): g['addr'] = a
        g['gross'] += num(r['gross_area_m2']) or 0
        if num(r['year_built']): g['yb'].append(int(num(r['year_built'])))
        g['val'] += num(r['assessed_value']) or 0
        for cl in (r['class1'], r['class2'], r['class3']):
            if cl: g['cls'].add(cl.title())
    addr = {}
    for pid, g in grp.items():
        x, y = P(g['lon'], g['lat']); k = tkey(x, y, T); t = tiles[k]
        t['E'].append([pid, round((x - k[0] * T) * Q), round((y - k[1] * T) * Q)])
        lot = round(num(g['lot'])) if num(g['lot']) else None
        t['A'][pid] = [g['addr'], g['zoning'], g['zmap'], g['zsrc'], lot, round(g['gross']) or None,
                       min(g['yb']) if g['yb'] else None, max(g['yb']) if g['yb'] else None, round(g['val']) or None,
                       sorted(g['cls']), g['nb'], len(g['acc'])]
        if g['addr']: addr[pid] = (g['addr'], k)
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
    for pid, (a, k) in addr.items(): sh[shard_key(a)].append(f'{a}\t{k[0]}_{k[1]}\t{pid}')
    for s, lines in sh.items():
        open(os.path.join(OUT, 'edm', f's_{s}.tsv'), 'w', encoding='utf-8').write('\n'.join(sorted(lines)))
    print('edm tiles', len(tiles), 'zone polys', len(ov))

if __name__ == '__main__':
    which = sys.argv[1:] or ['van', 'edm']
    if 'van' in which: vancouver()
    if 'edm' in which: edmonton()
