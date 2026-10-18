import json, glob, sys, math
from shapely.geometry import Polygon, Point
T='/mnt/user-data/outputs/tool/tiles/van'; Q=2
def dec(a,ox,oy):
    x=y=0;r=[]
    for i in range(0,len(a),2): x+=a[i];y+=a[i+1];r.append((ox+x/Q,oy+y/Q))
    return r
def area(r):
    s=0
    for i in range(len(r)): j=i-1; s+=(r[j][0]+r[i][0])*(r[j][1]-r[i][1])
    return abs(s/2)
idx={}
for line in open(T+'/s_x.tsv').read().split('\n')+sum([open(f).read().split('\n') for f in glob.glob(T+'/s_[0-9].tsv')],[]):
    if line: a,k,tc=line.split('\t'); idx.setdefault(a,(k,tc))
for addr in sys.argv[1:]:
    k,tc=idx[addr]; t=json.load(open(f'{T}/t_{k}.json')); ox,oy=t['o']
    A=t['A'][tc]; rec=A[8]
    rings=[dec(a,ox,oy) for p,a in t['P'] if p==tc]
    rings=[r for r in rings if area(r)>10]; rings.sort(key=area,reverse=True)
    bl=[(h,dec(a,ox,oy),f) for h,a,*f in t['B']]
    def facts(ring):
        meas=area(ring); use=meas>10 and (not rec or rec<0.5*meas); lot=round(meas) if use else rec
        poly=Polygon(ring)
        bs=[(h,area(r),(f or [0])[0]) for h,r,f in bl if poly.contains(Point(sum(p[0] for p in r)/len(r),sum(p[1] for p in r)/len(r)))]
        live=[b for b in bs if b[2]!=3]
        hmax=max([b[0] for b in live],default=0); foot=sum(b[1] for b in live); st=max(1,math.floor(hmax/4))
        return dict(meas=round(meas),lot=lot,src='measured' if use else 'record',nb=len(live),gone=len(bs)-len(live),foot=round(foot),hmax=hmax,flags=sorted(set(b[2] for b in live)),storeys=st,existing_gross=round(foot*st))
    print(addr,tc,'tile',k,'zone',A[1],'rec',rec,'parts',len(rings),[round(area(r)) for r in rings])
    print('  search/hash (largest part):',facts(rings[0]))
    if len(rings)>1: print('  click on smallest part:',facts(rings[-1]))
