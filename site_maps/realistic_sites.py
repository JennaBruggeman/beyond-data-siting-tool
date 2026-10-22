# Top 5 again, keeping only cells that could hold a data centre: at least 2,000 m2 of lots that are not houses, parks or
# other-jurisdiction land (assumption: about the smallest footprint for a small urban data centre with its plant).
# For the zoning-counted lists, the 2,000 m2 must be zoned allowed or case by case (a site-specific or rezoning parcel next door does not count).
# Scores are unchanged; this is a filter. Writes realistic_top5.csv and cell_land.csv (land per cell, both cities).
import csv, json, math, os
import numpy as np
from build_site_maps import CITY, proj, D, C, van_status, edm_status
from shapely.geometry import shape
H = os.path.dirname(os.path.abspath(__file__)); MIN_LAND = 2000; SEP = 2000
def residential(city, z):
    z = (z or '').strip().split(' ')[0].upper()
    if city == 'van': return z.startswith(('R', 'FM', 'FSD', 'HA'))   # Vancouver residential districts
    return z in ('RS', 'RSF', 'RSM', 'RM', 'RL', 'RR')
def excluded(city, z):
    z = (z or '').strip().split(' ')[0].upper()
    return residential(city, z) or (city == 'edm' and z in ('AJ', 'A', 'NA', 'PS', 'PSN'))   # other jurisdiction, river valley, parks
rows = []; land_rows = []
for city in CITY:
    f, _ = proj(CITY[city]); land = {}; allowed = {}; parcels = {}
    def add(x, y, a, z, addr):
        k = '%s_%d_%d' % (city, math.floor(x / C), math.floor(y / C))
        if not excluded(city, z): land[k] = land.get(k, 0) + a
        st = van_status(z) if city == 'van' else edm_status(z, a)
        if st in ('yes', 'case'): allowed[k] = allowed.get(k, 0) + a
        parcels.setdefault(k, []).append((a, addr, z))
    if city == 'van':
        for ft in json.load(open(os.path.join(D, 'vancouver_parcels_2026.geojson')))['features']:
            c = shape(ft['geometry']).centroid; p = ft['properties']; add(*f(c.x, c.y), p.get('area_m2') or 0, p.get('zoning'), p.get('address') or '?')
    else:
        for r in csv.DictReader(open(os.path.join(D, 'edmonton_properties_2026.csv'))):
            try: x, y = f(float(r['lon']), float(r['lat']))
            except ValueError: continue
            add(x, y, float((r['lot_size_m2'] or '0').replace(',', '') or 0), r['zoning'], (r['house_number'] + ' ' + r['street']).strip() or '?')
    G = json.load(open(f'{H}/{city}_weighting.geojson'))['features']
    ids = [g['properties']['id'] for g in G]; ok = np.array([land.get(i, 0) >= MIN_LAND for i in ids]); okz = np.array([allowed.get(i, 0) >= MIN_LAND for i in ids])
    cx = np.array([[(int(i.split('_')[1]) + .5) * C, (int(i.split('_')[2]) + .5) * C] for i in ids])
    for i in ids: land_rows.append(dict(city=city, cell=i, usable_land_m2=round(land.get(i, 0)), allowed_land_m2=round(allowed.get(i, 0))))
    for key in ['ov_equal', 'ov_equal_zoned', 'stability', 'stability_zoned']:
        v = np.array([g['properties'][key] for g in G], float); out = []
        for k in np.argsort(-v):
            if v[k] <= 0: break
            if not (okz[k] if 'zoned' in key else ok[k]): continue
            if all(math.hypot(*(cx[k] - cx[m])) >= SEP for m in out): out.append(k)
            if len(out) == 5: break
        for rank, k in enumerate(out, 1):
            p = G[k]['properties']; lon, lat = np.mean(G[k]['geometry']['coordinates'][0][:4], axis=0)
            big = sorted(parcels.get(ids[k], []), key=lambda t: -t[0])[:3]
            rows.append(dict(city=city, layer=key, rank=rank, score=round(float(v[k]), 3), usable_land_m2=round(land.get(ids[k], 0)), allowed_land_m2=round(allowed.get(ids[k], 0)), lat=round(lat, 6), lon=round(lon, 6), cell=ids[k],
                             site=p['site'], heat=p['heat'], energy=p['energy'], water=p['water'], materials=p['materials'], people=p['people'],
                             stability=p['stability'], stability_zoned=p['stability_zoned'], largest_parcels='; '.join(f'{a} ({z}, {round(s)} m2)' for s, a, z in big)))
for name, R in [('realistic_top5.csv', rows), ('cell_land.csv', land_rows)]:
    w = csv.DictWriter(open(f'{H}/{name}', 'w', newline=''), list(R[0])); w.writeheader(); w.writerows(R)
print(len(rows))
