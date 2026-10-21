#!/usr/bin/env python3
"""City-side parcel list per Vancouver box, for the BC Assessment join on J.B.'s computer (bca_sites.py).
City of Vancouver Open Data: property parcel polygons; property tax report 2026 (LAND_COORDINATE, FOLIO, year built). No BCA data."""
import json, csv, collections, math, os
from shapely.geometry import shape, box
from shapely.strtree import STRtree
H = os.path.dirname(os.path.abspath(__file__)); D = os.path.join(H, '..', 'data')
src = open(os.path.join(H, 'build_sites.py')).read(); ns = {'math': math}; exec(src[src.index('def bbox_from'):src.index('COLS =')], ns)
PAR = json.load(open(f'{D}/vancouver_parcels_2026.geojson'))['features']; T = STRtree([shape(f['geometry']) for f in PAR])
fol = collections.defaultdict(set)
r = csv.reader(open(f'{D}/raw/van/property-tax-report.csv', encoding='utf-8-sig', errors='replace'), delimiter=';'); h = next(r); I = {k: i for i, k in enumerate(h)}
for row in r: fol[row[I['LAND_COORDINATE']]].add(row[I['FOLIO']].strip())
for site, addr, (S, W, N, E), how in [s for s in ns['SITES'] if s[0].startswith('V')]:
    fp = collections.defaultdict(list)
    for row in csv.DictReader(open(os.path.join(H, f'{site}_heights.csv'))):
        for pid in row['parcel_id'].split('; '):
            if pid: fp[pid].append(row['building_id'])
    with open(os.path.join(H, f'{site}_parcels_city.csv'), 'w', newline='') as f:
        w = csv.writer(f); w.writerow(['site', 'parcel_id', 'address', 'city_year_built', 'legal_type', 'folios', 'footprint_ids'])
        for i in T.query(box(W, S, E, N), predicate='intersects'):
            p = PAR[i]['properties']; c = p['tax_coord']
            if not c: continue
            w.writerow([site, c, p.get('address') or '', int(p['year_built']) if p.get('year_built') else '', p.get('legal_type') or '', ' '.join(sorted(x for x in fol.get(c, ()) if x)), ' '.join(fp.get(c, []))])
    print(site, 'parcels written')
