import json, math, pyproj, statistics as st
from shapely.geometry import shape, Polygon
from shapely.ops import transform
g=json.load(open('/mnt/user-data/outputs/data/vancouver_parcels_2026.geojson'))
fw=pyproj.Transformer.from_crs(4326,26910,always_xy=True)
geod=pyproj.Geod(ellps='WGS84')
k=math.cos(math.radians(49.25))*111320.0
loc=lambda x,y:((x+123.12)*k,(y-49.25)*110540.0)
R=[];small=[]
for i,f in enumerate(g['features']):
    pr=f['properties']; sh=shape(f['geometry'])
    if pr.get('address')=='750 HORNBY ST': print('HORNBY',pr, sh.geom_type, len(getattr(sh,'geoms',[sh])))
    if i%50: continue
    ga=abs(geod.geometry_area_perimeter(sh)[0]); la=transform(loc,sh).area
    ar=pr.get('area_m2')
    R.append((la/ga, (ar/ga) if ar else None))
print('n',len(R),'local/geodesic median',st.median([r[0] for r in R]),'min',min(r[0] for r in R),'max',max(r[0] for r in R))
v=[r[1] for r in R if r[1]]; print('area_m2/geodesic median',st.median(v), 'share within 1%',sum(abs(x-1)<0.01 for x in v)/len(v), 'n',len(v))
print('area_m2 missing',sum(1 for f in g['features'] if not f['properties'].get('area_m2')))
print('area_m2<0.5*geod (sample)',sum(1 for x in v if x<0.5))
