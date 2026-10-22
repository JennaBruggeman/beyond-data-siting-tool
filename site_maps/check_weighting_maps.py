# Quick check maps for the weighting study (same style as check_maps.py), with each layer's top 5 numbered.
import json, csv, os, numpy as np, matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt
H=os.path.dirname(os.path.abspath(__file__)); top=list(csv.DictReader(open(f'{H}/weighting_top5.csv')))
L=[('ov_equal','equal, zoning ignored','equal'),('ov_priority','priority, zoning ignored','priority'),('ov_spread','spread, zoning ignored','spread'),('stability','stability, zoning ignored','stability'),
   ('ov_equal_zoned','equal, zoning counted','equal_zoned'),('ov_priority_zoned','priority, zoning counted','priority_zoned'),('ov_spread_zoned','spread, zoning counted','spread_zoned'),('stability_zoned','stability, zoning counted','stability_zoned')]
for city in ['van','edm']:
    G=json.load(open(f'{H}/{city}_weighting.geojson'))['features']; xs=np.array([f['geometry']['coordinates'][0][0][0] for f in G]); ys=np.array([f['geometry']['coordinates'][0][0][1] for f in G])
    fig,ax=plt.subplots(2,4,figsize=(22,11),facecolor='#202124')
    for (k,t,sch),a in zip(L,ax.flat):
        v=np.array([f['properties'][k] for f in G],float); vmax=.5 if 'stab' in k else max(.05,np.percentile(v,99.5))
        a.scatter(xs,ys,c=v,s=1.2 if city=='van' else .35,marker='s',cmap='magma',vmin=0,vmax=vmax,linewidths=0)
        for r in top:
            if r['city']==city and r['scheme']==sch: a.plot(float(r['lon']),float(r['lat']),'o',ms=8,mfc='none',mec='#7fdcff'); a.text(float(r['lon']),float(r['lat']),'  '+r['rank'],color='#7fdcff',fontsize=10)
        a.set_title(t,color='w'); a.set_aspect(1/np.cos(np.radians(ys.mean()))); a.axis('off')
    plt.tight_layout(); plt.savefig(f'{H}/check_weighting_{city}.png',dpi=70,facecolor='#202124'); plt.close()
