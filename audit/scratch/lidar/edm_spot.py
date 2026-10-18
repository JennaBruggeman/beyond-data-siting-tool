import json, math, sys, glob
from shapely.geometry import Polygon, Point
T='/mnt/user-data/outputs/tool/tiles/edm'; Q=2
def dec(a,ox,oy):
    x=y=0;r=[]
    for i in range(0,len(a),2): x+=a[i];y+=a[i+1];r.append((ox+x/Q,oy+y/Q))
    return r
def area(r):
    s=0
    for i in range(len(r)): j=i-1; s+=(r[j][0]+r[i][0])*(r[j][1]-r[i][1])
    return abs(s/2)
def run(key,pid):
    t=json.load(open(f'{T}/t_{key}.json')); ox,oy=t['o']; A=t['A'][pid]
    l=json.load(open(f'{T}/l_{key}.json')); lx,ly=l['o']
    ring=None; ids=None
    for a,i in l['L']:
        if pid in i: ring=dec(a,lx,ly); ids=i; break
    bl=[(b[0],dec(b[1],ox,oy),b[2] if len(b)>2 else 0) for b in t['B']]
    if ring:
        P=Polygon(ring).buffer(0); bs=[(h,round(area(r)),f) for h,r,f in bl if P.contains(Point(sum(p[0] for p in r)/len(r),sum(p[1] for p in r)/len(r)))]
    else: bs=[]
    hmax=max([b[0] for b in bs],default=0); foot=sum(b[1] for b in bs)
    print(A[0],pid,'zone',A[1],A[2],'lot rec',A[4],'gross',A[5],'outline',round(area(ring)) if ring else None,'ids on lot',len(ids) if ids else 0)
    print('   blds',bs[:8],'foot',foot,'hmax',hmax,'storeys(round h/4)',max(1,round(hmax/4)),'van-style floor',max(1,math.floor(hmax/4)))
    if ids and len(ids)>1: print('   other ids on lot:',[(i,t['A'].get(i,[None]*6)[4],t['A'].get(i,[None]*6)[5]) for i in ids][:6])
idx={}
for f in glob.glob(T+'/s_*.tsv'):
    for line in open(f).read().split('\n'):
        if line: a,k,p=line.split('\t'); idx.setdefault(a,(k,p))
for a in sys.argv[1:]:
    if '|' in a: k,p=a.split('|'); run(k,p)
    else: run(*idx[a])
