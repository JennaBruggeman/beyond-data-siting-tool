# The best cells for overlap_zoned in each city, with the parcels in them (address, zone, zoning status). Writes top_sites.csv.
import json, csv, math, os
from build_site_maps import CITY, proj, van_status, edm_status, D, H, C
from shapely.geometry import shape
rows=[]
for city in CITY:
    f,g=proj(CITY[city]); pk=[p for p in json.load(open(f'{H}/{city}_peaks.geojson'))['features'] if p['geometry']['type']=='Point']
    hits={p['properties']['cell']:[] for p in pk}
    def cell(x,y): return '%s_%d_%d'%(city,math.floor(x/C),math.floor(y/C))
    if city=='van':
        for ft in json.load(open(os.path.join(D,'vancouver_parcels_2026.geojson')))['features']:
            c=shape(ft['geometry']).centroid; k=cell(*f(c.x,c.y))
            if k in hits: pr=ft['properties']; hits[k].append((pr.get('address') or '',pr.get('zoning') or '',van_status(pr.get('zoning')),pr.get('area_m2')))
    else:
        for r in csv.DictReader(open(os.path.join(D,'edmonton_properties_2026.csv'))):
            try: k=cell(*f(float(r['lon']),float(r['lat'])))
            except ValueError: continue
            if k in hits: lot=float((r['lot_size_m2'] or '0').replace(',','') or 0); hits[k].append(((r['house_number']+' '+r['street']).strip(),r['zoning'],edm_status(r['zoning'],lot),lot))
    for p in pk:
        pr=p['properties']; k=pr['cell']; lon,lat=p['geometry']['coordinates']; rank={'yes':3,'case':2,'site':1,'no':0}
        par=sorted(hits[k],key=lambda h:-rank[h[2]])[:3]
        rows.append(dict(city=city,aspect=pr['aspect'],rank=pr['rank'],score=pr['score'],radius_m=pr['radius_m'],lat=lat,lon=lon,cell=k,
            heat=pr['heat'],energy=pr['energy'],water=pr['water'],materials=pr['materials'],people=pr['people'],site=pr['site'],overlap=pr['overlap'],n_strong=pr['n_strong'],
            parcels_in_cell='; '.join(f'{a} ({z}, {s})' for a,z,s,_ in par)))
rows.sort(key=lambda r:(r['city'],r['aspect'],r['rank']))
w=csv.DictWriter(open(f'{H}/top_sites.csv','w',newline=''),list(rows[0])); w.writeheader(); w.writerows(rows); print(len(rows))
