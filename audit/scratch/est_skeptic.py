import json,sys,math
D='/mnt/user-data/outputs/tool/tiles/van/'
m=json.load(open(D+'meta.json')); q=m['Q']; T=m['T']
def dec(a,ox,oy):
    r=[];x=y=0
    for i in range(0,len(a),2):
        x+=a[i];y+=a[i+1];r.append((ox+x/q,oy+y/q))
    return r
def area(r): return abs(sum((r[j][0]+r[i][0])*(r[j][1]-r[i][1]) for i,j in zip(range(len(r)),[len(r)-1]+list(range(len(r)-1))))/2)
def cen(r): return (sum(p[0] for p in r)/len(r),sum(p[1] for p in r)/len(r))
def pip(x,y,r):
    c=False;j=len(r)-1
    for i in range(len(r)):
        xi,yi=r[i];xj,yj=r[j]
        if (yi>y)!=(yj>y) and x<(xj-xi)*(y-yi)/(yj-yi)+xi: c=not c
        j=i
    return c
for key,pid in [a.split(':') for a in sys.argv[1:]]:
    kx,ky=map(int,key.split('_'))
    par=None;bl=[]
    for dx in (-1,0,1):
      for dy in (-1,0,1):
        try: t=json.load(open(D+f't_{kx+dx}_{ky+dy}.json'))
        except: continue
        ox,oy=t['o']
        for p,a in t['P']:
            if p==pid and (dx,dy)==(0,0): par=dec(a,ox,oy); A=t['A'].get(p)
        for b in t['B']:
            h,a=b[0],b[1]; f=b[2] if len(b)>2 else 0
            bl.append((h,dec(a,ox,oy),f))
    sel=[(h,area(r),f) for h,r,f in bl if pip(*cen(r),par) and f!=3]
    hmax=max(h for h,a,f in sel); foot=sum(a for h,a,f in sel); st=max(1,math.floor(hmax/4))
    print(pid,A[0],'lot',round(area(par)),'n',len(sel),'hmax',hmax,'foot',round(foot),'storeys',st,'GFA est',round(foot*st), [(h,round(a),f) for h,a,f in sel][:12])
