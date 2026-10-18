import json,glob,os,sys
d=sys.argv[1]; m=json.load(open(d+'/meta.json')); Q=m['Q']
allA={}
for tf in glob.glob(d+'/t_*.json'):
    t=json.load(open(tf)); k=os.path.basename(tf)[2:-5]
    for u,v in t['A'].items(): allA[u]=(k,v)
def dec(a,ox,oy):
    x=y=0; pts=[]
    for i in range(0,len(a),2):
        x+=a[i]; y+=a[i+1]; pts.append((ox+x/Q,oy+y/Q))
    return pts
def area(p):
    s=0
    for i in range(len(p)):
        x1,y1=p[i-1]; x2,y2=p[i]; s+=(x1+x2)*(y1-y2)
    return abs(s/2)
c={'notintile_butelsewhere':0,'missing_all':0,'reczero':0}; ind={'small':[], 'zero':[]}
for lf in glob.glob(d+'/l_*.json'):
    key=os.path.basename(lf)[2:-5]; t=json.load(open(d+'/t_'+key+'.json')); l=json.load(open(lf)); A=t['A']; lx,ly=l['o']
    for a,ids in l['L']:
        if not ids: continue
        best=max(ids,key=lambda u:(A.get(u) or [0]*5)[4] or 0)
        if best not in A:
            if best in allA: c['notintile_butelsewhere']+=1
            else: c['missing_all']+=1
            continue
        rec=A[best][4] or 0; ar=area(dec(a,lx,ly)); z=str(A[best][2] or A[best][1] or '').split(' ')[0].upper()
        if not rec: c['reczero']+=1
        if z in ('IH','IM','BE'):
            if not rec: ind['zero'].append((key,best,round(ar),A[best][0],z))
            elif rec<0.5*ar: ind['small'].append((key,best,round(ar),rec,A[best][0],z,len(ids)))
print(c); print('industrial rec zero',len(ind['zero']),ind['zero'][:5]); print('industrial rec<half',len(ind['small'])); 
for e in sorted(ind['small'],key=lambda e:-e[2])[:10]: print(e)
