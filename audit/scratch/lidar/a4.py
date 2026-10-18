import json, collections
g=json.load(open('/mnt/user-data/outputs/data/vancouver_parcels_2026.geojson'))
by=collections.defaultdict(list)
for f in g['features']: p=f['properties']; by[p['tax_coord']].append((p['area_m2'],p.get('address'),p.get('zoning'),p.get('site_id')))
n=0
for k,v in by.items():
    a=[x[0] for x in v]
    if len(v)>1 and a[0]>2*min(a) and min(a)>50:
        print(k,v[0][1],v[0][2],a); n+=1
        if n>12: break
