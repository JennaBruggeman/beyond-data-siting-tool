import json, glob, numpy as np, collections
D='/mnt/user-data/outputs/data'
LF={};LN=[]
for fn in glob.glob(D+'/lidar2022/*.json'):
    r=json.load(open(fn)); 
    for k,v in r['fp'].items():
        if int(k) in LF: LF.setdefault('_dup',0)
        LF[int(k)]=v
    LN+=r['new']
bj=json.load(open(D+'/vancouver_footprints_2009.geojson'))
mp=sum(1 for f in bj['features'] if f['geometry']['type']=='MultiPolygon'); print('multipolygon footprints',mp)
ids=[f['properties']['id'] for f in bj['features']]; print('n',len(ids),'unique ids',len(set(ids)))
fl=collections.Counter(); diffs=[]
for f in bj['features']:
    lv=LF.get(f['properties']['id']); h9=f['properties'].get('hgt_agl') or 0
    if lv is None: fl[0]+=1
    elif lv[2]>=0.3: fl[1]+=1; 
    elif lv[2]<0.1: fl[3]+=1
    else: fl[4]+=1
    if lv and lv[2]>=0.9 and h9>0: diffs.append(lv[0]-h9)
print(fl); d=np.array(diffs); print('p90_2022 - hgt_agl_2009 for share>=0.9: median',np.median(d),'p10',np.percentile(d,10),'p90',np.percentile(d,90),'n',len(d))
print('share>=0.3 but p90==0',sum(1 for v in LF.values() if v[2]>=0.3 and v[0]==0))
print('new',len(LN),'p90>hmax',sum(1 for v in LN if v[0]>v[1]),'p90<2',sum(1 for v in LN if v[0]<2),'p90>200',sum(1 for v in LN if v[0]>200))
print('fp p90>200',sum(1 for v in LF.values() if v[0]>200), max(v[0] for v in LF.values()))
z=np.load(D+'/lidar_raw/490000_5455000.npz'); print({k:(z[k].shape,z[k].dtype) for k in z.files}, float(z['res']))
h=z['h_dm']; print('h_dm min max',h.min(),h.max(), 'share>0',(h>0).mean())
