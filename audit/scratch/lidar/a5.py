import json,glob,math,numpy as np,pyproj,shapely
from shapely.strtree import STRtree
T='tool/tiles/edm'; Q=2
polys=[]
for fn in glob.glob(T+'/t_*.json'):
    t=json.load(open(fn)); ox,oy=t['o']
    for b in t['B']:
        a=b[1]; x=y=0; r=[]
        for i in range(0,len(a),2): x+=a[i];y+=a[i+1]; r.append((ox+x/Q,oy+y/Q))
        if len(r)<3: continue
        p=shapely.Polygon(r)
        if not p.is_valid: p=shapely.make_valid(p)
        polys.append(p)
d=np.load('data/raw/edm/3d/parts.npz'); ok=d['z0']>500
lon,lat=pyproj.Transformer.from_crs(3776,4326,always_xy=True).transform(d['x'][ok],d['y'][ok])
k=math.cos(math.radians(53.54))*111320
px,py=(lon+113.5)*k,(lat-53.54)*110540; hz=d['z1'][ok]-d['z0'][ok]
pts=shapely.points(px,py); tree=STRtree(polys)
inside=np.zeros(len(pts),bool)
pi,_=tree.query(pts,predicate='within'); inside[pi]=True
print('parts',len(pts),'inside an outline',inside.sum(),'outside',(~inside).sum())
for th in (10,30,60,100):
    print(f'outside parts with height>{th} m:',int(((~inside)&(hz>th)).sum()))
np.save('audit/scratch/lidar/out_idx.npy',np.where(~inside)[0])
