# Quick check maps (not the finished maps): each aspect per city, with its top-5 peaks and radii.
import json, matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt, numpy as np, sys, os
H=os.path.dirname(os.path.abspath(__file__))
for city in ['van','edm']:
    G=json.load(open(f'{H}/{city}_grid.geojson'))['features']; Pk=json.load(open(f'{H}/{city}_peaks.geojson'))['features']
    xs=np.array([f['geometry']['coordinates'][0][0][0] for f in G]); ys=np.array([f['geometry']['coordinates'][0][0][1] for f in G])
    A=['site','heat','energy','water','materials','people','overlap','overlap_zoned','n_strong']
    fig,ax=plt.subplots(3,3,figsize=(18,15),facecolor='#202124')
    for a,axi in zip(A,ax.flat):
        v=np.array([f['properties'][a] for f in G],float)
        axi.scatter(xs,ys,c=v,s=1.2 if city=='van' else .35,marker='s',cmap='magma',vmin=0,vmax=5 if a=='n_strong' else 1,linewidths=0)
        for p in Pk:
            if p['properties']['aspect']==(a if a!='n_strong' else 'none'):
                if p['geometry']['type']=='Point': axi.plot(*p['geometry']['coordinates'],'o',ms=5,mfc='none',mec='#7fdcff'); axi.text(*p['geometry']['coordinates'],' %d'%p['properties']['rank'],color='#7fdcff',fontsize=8)
                else: c=np.array(p['geometry']['coordinates'][0]); axi.plot(c[:,0],c[:,1],color='#7fdcff',lw=.8)
        axi.set_title(a,color='w'); axi.set_aspect(1/np.cos(np.radians(ys.mean()))); axi.axis('off')
    plt.tight_layout(); plt.savefig(f'{H}/check_{city}.png',dpi=70,facecolor='#202124')
