import json,glob,os,sys
d=sys.argv[1]; m=json.load(open(d+'/meta.json')); Q=m['Q']
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
n=0; zero=0; small=0; big=0; tot=0; ex=[]
for lf in glob.glob(d+'/l_*.json'):
    key=os.path.basename(lf)[2:-5]; tf=d+'/t_'+key+'.json'
    if not os.path.exists(tf): continue
    t=json.load(open(tf)); l=json.load(open(lf)); A=t['A']; lx,ly=l['o']
    for a,ids in l['L']:
        if not ids: continue
        ar=area(dec(a,lx,ly))
        # tool picks id with largest lot area
        best=max(ids,key=lambda u:(A.get(u) or [0]*5)[4] or 0)
        rec=(A.get(best) or [0]*5)[4] or 0
        tot+=1
        if ar<100: continue
        n+=1
        if not rec: zero+=1; ex.append(('zero',key,best,round(ar),rec,(A.get(best) or ['?','?','?'])[:3]))
        elif rec<0.5*ar: small+=1; ex.append(('small',key,best,round(ar),rec,A[best][:3]))
        elif rec>2*ar: big+=1
print('lots',tot,'>=100m2',n,'rec zero',zero,'rec<half outline',small,'rec>2x outline',big)
import random; random.seed(1)
for e in random.sample(ex,min(12,len(ex))): print(e)
