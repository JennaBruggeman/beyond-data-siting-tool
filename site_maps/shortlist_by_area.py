#!/usr/bin/env python3
"""The shortlist by area, not by cell (J.B., 26 Oct 2026). Ranking 100 m cells lets one good area fill many rows and hides
which lot is the real site. Here: land-checked cells (at least 2,000 m2 zoned allowed or case by case, as in realistic_sites.py)
are ranked by the zoned overlap (equal weights), then grouped into areas: a cell joins the area of a better cell within 2 km,
otherwise it starts a new area. Each area lists its best cells with their lots (size, zoning, vacant or built).
Writes shortlist_by_area.csv (today) and scenario_blatchford_buildout/shortlist_by_area.csv (Edmonton at build-out)."""
import csv, json, math, os, collections
from shapely.geometry import shape
from build_site_maps import CITY, proj, D, C, van_status, edm_status
H = os.path.dirname(os.path.abspath(__file__)); SEP, MIN_LAND, AREAS, CELLS = 2000, 2000, 10, 4
CHOSEN = {'van_16_20': 'V09', 'edm_-15_31': 'E06'}

def lots(city):
    f, _ = proj(CITY[city]); out = collections.defaultdict(list)
    def add(lon, lat, a, z, addr, vacant):
        x, y = f(lon, lat); out['%s_%d_%d' % (city, math.floor(x / C), math.floor(y / C))].append((a, addr, z, vacant))
    if city == 'van':
        for ft in json.load(open(os.path.join(D, 'vancouver_parcels_2026.geojson')))['features']:
            p = ft['properties']; c = shape(ft['geometry']).centroid
            add(c.x, c.y, p.get('area_m2') or 0, p.get('zoning') or '', p.get('address') or '?', (p.get('improvement_value') or 0) < 50000)
    else:
        for r in csv.DictReader(open(os.path.join(D, 'edmonton_properties_2026.csv'))):
            try: lat, lon = float(r['lat']), float(r['lon'])
            except ValueError: continue
            a = float((r['lot_size_m2'] or '0').replace(',', '') or 0); ga = float((r['gross_area_m2'] or '0').replace(',', '') or 0)
            add(lon, lat, a, r['zoning'] or '', ('%s %s' % (r['house_number'], r['street'])).strip(), ga == 0)
    return out

def run(city, grid_dir, land, LOTS):
    G = json.load(open(os.path.join(grid_dir, '%s_weighting.geojson' % city)))['features']
    rows = []
    for g in G:
        p = g['properties']
        if land.get(p['id'], 0) < MIN_LAND: continue
        lon, lat = sum(q[0] for q in g['geometry']['coordinates'][0][:4]) / 4, sum(q[1] for q in g['geometry']['coordinates'][0][:4]) / 4
        rows.append((p['ov_equal_zoned'], p['id'], lon, lat, p['stability_zoned']))
    rows.sort(reverse=True); f, _ = proj(CITY[city]); areas = []
    for sc, cid, lon, lat, stab in rows:
        x, y = f(lon, lat)
        home = next((a for a in areas if math.hypot(x - a['x'], y - a['y']) < SEP), None)
        if home is None:
            if len(areas) >= AREAS: continue
            home = dict(x=x, y=y, cells=[]); areas.append(home)
        home['cells'].append((sc, cid, stab))
    out = []
    for i, a in enumerate(areas, 1):
        for j, (sc, cid, stab) in enumerate(a['cells'][:CELLS], 1):
            ok = sorted([l for l in LOTS.get(cid, []) if (van_status(l[2]) if city == 'van' else edm_status(l[2], l[0])) in ('yes', 'case')], reverse=True)[:3]
            out.append(dict(city=city, area_rank=i, area_name=(ok[0][1] if ok else cid) if j == 1 else '', cell_in_area=j, cell=cid, score=round(sc, 3), stability=round(stab, 2),
                            cells_in_area=len(a['cells']), chosen=CHOSEN.get(cid, ''),
                            lots='; '.join('%s (%s, %d m2, %s)' % (l[1], l[2].split(' ')[0], l[0], 'vacant' if l[3] else 'built') for l in ok)))
        ch = [c for c in a['cells'] if c[1] in CHOSEN and c not in a['cells'][:CELLS]]
        for sc, cid, stab in ch:
            pos = [c[1] for c in a['cells']].index(cid) + 1
            out.append(dict(city=city, area_rank=i, area_name='', cell_in_area=pos, cell=cid, score=round(sc, 3), stability=round(stab, 2), cells_in_area=len(a['cells']), chosen=CHOSEN[cid], lots=''))
    return out

land = {r['cell']: float(r['allowed_land_m2']) for r in csv.DictReader(open(os.path.join(H, 'cell_land.csv')))}
L = {c: lots(c) for c in CITY}
for grid_dir, cities, outp in ((H, ['van', 'edm'], os.path.join(H, 'shortlist_by_area.csv')),
                               (os.path.join(H, 'scenario_blatchford_buildout'), ['edm'], os.path.join(H, 'scenario_blatchford_buildout', 'shortlist_by_area.csv'))):
    rows = [r for c in cities for r in run(c, grid_dir, land, L[c])]
    w = csv.DictWriter(open(outp, 'w', newline=''), list(rows[0])); w.writeheader(); w.writerows(rows)
    for r in rows:
        if r['cell_in_area'] == 1 or r['chosen']: print(os.path.basename(grid_dir)[:8], r['city'], r['area_rank'], r['cell_in_area'], r['score'], r['chosen'], (r['area_name'] or r['cell'])[:40], '|', r['lots'][:90])
