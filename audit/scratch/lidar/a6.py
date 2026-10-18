import json,glob,numpy as np
T='tool/tiles/edm'; Q=2
def area(r):
    s=0
    for i in range(len(r)): j=i-1; s+=(r[j][0]+r[i][0])*(r[j][1]-r[i][1])
    return abs(s/2)
rat=[];ex=[];none=0;n=0
for fn in glob.glob(T+'/l_*.json'):
    key=fn.split('l_')[1][:-5]; t=json.load(open(f'{T}/t_{key}.json')); A=t['A']
    l=json.load(open(fn)); lx,ly=l['o']
    for a,ids in l['L']:
        if not ids: continue
        n+=1
        x=y=0;r=[]
        for i in range(0,len(a),2): x+=a[i];y+=a[i+1]; r.append((lx+x/Q,ly+y/Q))
        m=area(r); idsel=sorted(ids,key=lambda u:-((A.get(u) or [0]*5)[4] or 0))[0]
        rec=(A.get(idsel) or [None]*5)[4]
        if not rec: none+=1; continue
        rat.append(rec/m)
        if rec<0.5*m or rec>2*m: ex.append((round(rec/m,2),rec,round(m),A[idsel][0],key,idsel))
rat=np.array(rat); print('lots with ids',n,'no record area',none,'median rec/outline',np.median(rat),'<0.5',(rat<0.5).sum(),'>2',(rat>2).sum())
import random; random.seed(1); print(random.sample(ex,8))
print(sorted(ex)[:5])
