import json,math,glob,numpy as np,shapely,pyproj
from shapely.strtree import STRtree
TD='/mnt/user-data/outputs/tool/tiles/edm/'; meta=json.load(open(TD+'meta.json')); Q=meta['Q']
d=np.load('/mnt/user-data/outputs/data/raw/edm/3d/parts.npz'); ok=d['z0']>500
lon,lat=pyproj.Transformer.from_crs(3776,4326,always_xy=True).transform(d['x'][ok],d['y'][ok])
k=math.cos(math.radians(meta['lat0']))*111320.0
px,py=(lon-meta['lon0'])*k,(lat-meta['lat0'])*110540.0
h=d['z1'][ok]-d['z0'][ok]
polys=[]
for fn in glob.glob(TD+'t_*.json'):
    t=json.load(open(fn)); ox,oy=t['o']
    for b in t['B']:
        a=b[1];x=y=0;r=[]
        for i in range(0,len(a),2): x+=a[i];y+=a[i+1]; r.append((ox+x/Q,oy+y/Q))
        if len(r)<3: continue
        p=shapely.Polygon(r)
        if not p.is_valid: p=shapely.make_valid(p)
        polys.append(p)
tr=STRtree(polys)
pts=shapely.points(px,py)
inside=np.zeros(len(pts),bool)
ii=tr.query(pts,predicate='within')
inside[np.unique(ii[0])]=True
print('parts',len(pts),'outside',(~inside).sum(),'out>100',((~inside)&(h>100)).sum(),'out>30',((~inside)&(h>30)).sum())
o=np.argsort(-h)[:6]
for i in o:
    near=tr.query(pts[i],predicate='dwithin',distance=40)
    print(round(h[i],1),round(px[i]),round(py[i]),round(lat[i],5),round(lon[i],5),'inside',inside[i],'outlines<=40m',len(near))
