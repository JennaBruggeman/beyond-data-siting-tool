import json,sys
TEMPO=float(sys.argv[1]) if len(sys.argv)>1 else 1.05
CU=json.load(open('cues.json')); L={k:v['len']/TEMPO for k,v in CU.items()}
a=8.936017105276186
# segment: name, kind (page/video), source, src cue times, voice keys, src DUR, xfade-in
SEG=[('op','page','opening',[0,7.4,14.8,28.6,32.8,37.4,45.4,54.4],['op.globe','op.dive','op.power','op.first','op.five','op.both','op.ethos','op.title'],60,0),
('intro','video','intro5',[0],['intro'],8.533,0.9),
('h','page','heat',[0],['heat'],17.4,0.6),('e','page','energy',[0],['energy'],13.6,0.6),('w','page','water',[0],['water'],13.6,0.6),
('m','page','materials',[0],['materials'],13.6,0.6),('p','page','people',[0],['people'],13.6,0.6),
('src','page','sources',[0,17.0,a+9.4,a+13.8,a+18.0],['src.pile','lv.intro','lv.every','lv.civic','lv.tech'],a+22.3,0.9),
('dg','page','diagram',[0,8.8,39.8,45.0,50.0],['dg.over','dg.chainA','dg.math','dg.trust','dg.weak'],54.8,0.6),
('au','page','automate',[0,5.2],['au.team','au.hand'],11.0,0.9),
('demo','video','demoz_src',[0,8.7,21.5],['demo.here','demo.finds','demo.opps'],28.633,0.6),
('ec','page','endcard',[0,5.2,10.6,14.6,19.2],['ec.covers','ec.scatter','ec.gap','ec.two','ec.close'],22.2,0.6),
('fu','page','future',[0],['fu'],10.6,0.9),
('logo','page','endcard',[22.2],[],28,0.6)]
LEAD=0.3; TAIL=0.45; MINF=0.65
plan=[]; t=0; voice=[]
for name,kind,src,V,K,D,xf in SEG:
    t0=t-xf if plan else 0
    ends=V[1:]+[D]; knots=[[0,V[0]]]; o=0; lead0=xf+LEAD
    for i,(v0,v1) in enumerate(zip(V,ends)):
        srcl=v1-v0; lead=lead0 if i==0 else LEAD
        need=(L[K[i]]+lead+TAIL) if i<len(K) else srcl
        O=max(MINF*srcl, need) if i<len(K) else srcl
        if i<len(K): voice.append([K[i],round(t0+o+lead,3)])
        o+=O; knots.append([round(o,3),v1])
    plan.append(dict(name=name,kind=kind,src=src,start=round(t0,3),dur=round(o,3),knots=knots,xf=xf,srcdur=D))
    t=t0+o
json.dump(dict(tempo=TEMPO,plan=plan,voice=voice),open('plan.json','w'),indent=1)
for p in plan: print(f"{p['name']:6s} start {p['start']:7.2f} dur {p['dur']:6.2f} (src {p['srcdur']:5.1f}) stretch {p['dur']/p['srcdur']:.2f}")
print('TOTAL',round(t,1))
