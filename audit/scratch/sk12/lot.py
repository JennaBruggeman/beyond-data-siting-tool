import json,sys,math
city,key,pid=sys.argv[1:4]
D='/mnt/user-data/outputs/tool/tiles/'
m=json.load(open(D+city+'/meta.json')); q=m['Q']
t=json.load(open(D+city+'/t_'+key+'.json')); ox,oy=t['o']
def dec(a,ox,oy):
    r=[];x=y=0
    for i in range(0,len(a),2): x+=a[i];y+=a[i+1]; r.append((ox+x/q,oy+y/q))
    return r
def area(r):
    s=0
    for i in range(len(r)): j=i-1; s+=(r[j][0]+r[i][0])*(r[j][1]-r[i][1])
    return abs(s/2)
def pip(x,y,r):
    c=False; j=len(r)-1
    for i in range(len(r)):
        xi,yi=r[i];xj,yj=r[j]
        if (yi>y)!=(yj>y) and x<(xj-xi)*(y-yi)/(yj-yi)+xi: c=not c
        j=i
    return c
cen=lambda r:(sum(p[0] for p in r)/len(r),sum(p[1] for p in r)/len(r))
par=[]
if 'P' in t:
    for p,a in t['P']: par.append((str(p),dec(a,ox,oy),None))
if city=='edm':
    l=json.load(open(D+'edm/l_'+key+'.json')); lx,ly=l['o']
    for n,(a,ids) in enumerate(l['L']): par.append(('L%d'%n,dec(a,lx,ly),[str(i) for i in ids]))
if city=='van':
    mine=[p for p in par if p[0]==pid and area(p[1])>10]; ring=max(mine,key=lambda p:area(p[1]))[1]
else:
    ring=[p for p in par if p[2] and pid in p[2]][0][1]
bl=[]
for b in t['B']:
    h,a=b[0],b[1]; f=b[2] if len(b)>2 else 0
    r=dec(a,ox,oy); c=cen(r)
    if pip(c[0],c[1],ring): bl.append((h,round(area(r)),f))
print('lot',round(area(ring)),'A',t['A'].get(pid))
for x in bl: print(x)
b2=[x for x in bl if x[2]!=3]
foot=sum(x[1] for x in b2); hm=max(x[0] for x in b2)
print('foot',foot,'hmax',hm,'st',max(1,math.floor(hm/4)),'gross',foot*max(1,math.floor(hm/4)),'perpart',sum(x[1]*max(1,math.floor(x[0]/4)) for x in b2), 'perpart_floor0',sum(x[1]*math.floor(x[0]/4) for x in b2))
