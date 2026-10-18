import json, glob, math, pyproj, collections
from shapely.geometry import shape
T='/mnt/user-data/outputs/tool/tiles'
tiles=set(json.load(open('/mnt/user-data/outputs/tool/lidar_tiles_city.json')))
fw=pyproj.Transformer.from_crs(4326,26910,always_xy=True)
g=json.load(open('/mnt/user-data/outputs/data/vancouver_parcels_2026.geojson'))
out=collections.Counter(); ex=[]
for f in g['features']:
    c=shape(f['geometry']).representative_point(); x,y=fw.transform(c.x,c.y)
    k=f'{int(x//1000)*1000}_{int(y//1000)*1000}'
    if k not in tiles: out['out']+=1; ex.append((f['properties'].get('address'),k))
    else: out['in']+=1
print(out, ex[:10])
# multi-polygon tax coords: record (first polygon) vs largest
by=collections.defaultdict(list)
for f in g['features']: by[f['properties']['tax_coord']].append(f['properties']['area_m2'])
multi=[(k,v) for k,v in by.items() if len(v)>1]; print('tax coords with >1 polygon',len(multi))
print('first < half of largest', sum(1 for k,v in multi if v[0]<0.5*max(v)))
print('first > 2x smallest', sum(1 for k,v in multi if v[0]>2*min(v)))
