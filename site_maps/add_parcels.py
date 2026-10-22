# Adds the parcels in each cell (address, zone, zoning status) to weighting_top5.csv.
import csv, json, math, os, sys
from build_site_maps import CITY, proj, van_status, edm_status, D, C
from shapely.geometry import shape
H=os.path.dirname(os.path.abspath(__file__)); fn=os.path.join(H,'weighting_top5.csv')
rows=list(csv.DictReader(open(fn))); rank={'yes':3,'case':2,'site':1,'no':0}
for city in CITY:
    f,_=proj(CITY[city]); hits={r['cell']:[] for r in rows if r['city']==city}
    cell=lambda x,y:'%s_%d_%d'%(city,math.floor(x/C),math.floor(y/C))
    if city=='van':
        for ft in json.load(open(os.path.join(D,'vancouver_parcels_2026.geojson')))['features']:
            c=shape(ft['geometry']).centroid; k=cell(*f(c.x,c.y))
            if k in hits: pr=ft['properties']; hits[k].append((pr.get('address') or '?',pr.get('zoning') or '?',van_status(pr.get('zoning'))))
    else:
        for r in csv.DictReader(open(os.path.join(D,'edmonton_properties_2026.csv'))):
            try: k=cell(*f(float(r['lon']),float(r['lat'])))
            except ValueError: continue
            if k in hits: lot=float((r['lot_size_m2'] or '0').replace(',','') or 0); hits[k].append(((r['house_number']+' '+r['street']).strip() or '?',r['zoning'],edm_status(r['zoning'],lot)))
    for r in rows:
        if r['city']==city:
            u=[]; [u.append(h) for h in sorted(hits[r['cell']],key=lambda h:-rank[h[2]]) if h not in u]
            r['parcels_in_cell']='; '.join(f'{a} ({z}, {s})' for a,z,s in u[:3])
w=csv.DictWriter(open(fn,'w',newline=''),list(rows[0])); w.writeheader(); w.writerows(rows); print(len(rows))
