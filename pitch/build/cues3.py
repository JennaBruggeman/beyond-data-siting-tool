import json, numpy as np, soundfile as sf
W=json.load(open('words.json')); t=[w['w'] for w in W]; a,sr=sf.read('raw.wav')
sil=[float(x.split(': ')[1]) for x in open('sil.txt')]; SI=list(zip(sil[0::2],sil[1::2]))
def find(seq,start=0,nth=1):
    s=seq.split(); c=0
    for i in range(start,len(t)):
        if t[i:i+len(s)]==s:
            c+=1
            if c==nth: return i
    raise Exception('not found '+seq)
D=[('op.globe','a daddesantor serves','the world',1),('op.dive','but it lives here','lives here',1),('op.power','it draws power','immediate surrounding',1),('op.first','so what if it','something back',1),
('op.five','or many things','even sound',1),('op.both','an exchange both','both ways',1),('op.ethos','datasentors are being','most back',1),('op.title','this is beyond data','beyond data',1),
('intro','beyond data is a','in edmonton',1),('heat','take heat','a greenhouse',1),('energy','energy the grid','when asked',1),('water','water the cooling','to treatment',1),
('materials','materials the building','their materials',1),('people','and people the','better frontage',1),('src.pile','this simulation is','and growing',1),
('lv.intro','but a neighbor','three levels',1),('lv.every','everyday is what','power bill',1),('lv.civic','civic is what','a rezoning',1),('lv.tech','technical shows','every source',1),
('dg.over','this is the logic','five parts',1),('dg.chainA','for example follow','could warm',1),('dg.math','you can check','come from',1),('dg.trust','and how far to trust','the lowest',3),
('dg.weak','a figure is only','fifty per cent',3),('au.team','this is work usually','economists lawyers',1),('au.hand','the tool does a first','look first',1),
('demo.here',"here's fourteen",'the lock',1),('demo.finds','then it finds','can find',1),('demo.opps','then the opportunities','by side',1),
('ec.covers','each level gets','own report',1),('ec.scatter',"and it's honest",'back yet',1),('ec.gap','but it shows what','the street',1),('ec.two','in edmonton the','different answer',1),
('ec.close','tradoffs not verdicts','not verdicts',1),('fu','so what will the urban','the city',2)]
hop=int(.01*sr); rms=np.sqrt(np.convolve(a**2,np.ones(2*hop)/(2*hop),'same')[::hop])
def bound(i):
    if i==0: return (0.0,0.0)
    if i>=len(W): T=len(a)/sr; return (T,T)
    p,tt=W[i-1]['s'],W[i]['s']
    c=[(x,y) for x,y in SI if x>p+0.1 and x<tt+0.2]
    if c: x,y=c[-1]; return (x+0.12, min(y,tt+0.25)-0.06)
    lo,hi=int((p+0.25)*100),int((tt+0.15)*100); k=lo+int(np.argmin(rms[lo:hi])) if hi>lo else int(tt*100)
    return (k/100,k/100)
MAXG0=0.42; out={}; pos=0
TIGHT={'lv.intro','demo.here','au.hand','au.team','src.pile','dg.over','ec.two','op.ethos','dg.trust','dg.weak','ec.gap','demo.opps'}
for k,s0p,e0p,nth in D:
    i0=find(s0p,pos if nth==1 else 0,nth) if nth==1 else find(s0p,0,nth)
    i1=find(e0p,i0)+len(e0p.split())-1; pos=i1+1
    s0=bound(i0)[1]; s1=bound(i1+1)[0]
    if k=='fu': s1=min(s1,W[i1]['s']+0.9)
    MAXG=0.28 if k in TIGHT else MAXG0
    parts=[];cur=s0
    for s,e in SI:
        if s>s0 and e<s1 and e-s>MAXG: parts.append((cur,s+MAXG/2)); cur=e-MAXG/2
    parts.append((cur,s1)); seg=[]
    for p0,p1 in parts:
        x=a[int(p0*sr):int(p1*sr)].copy(); f=int(.02*sr); x[:f]*=np.linspace(0,1,f); x[-f:]*=np.linspace(1,0,f); seg.append(x)
    y=np.concatenate(seg); sf.write(f'cue_{k}.wav',y,sr); out[k]=dict(raw=[round(s0,2),round(s1,2)],len=round(len(y)/sr,2),words=' '.join(t[i0:i1+1]))
    print(f"{k:11s} {s0:7.2f}-{s1:7.2f} {len(y)/sr:5.2f}  {' '.join(t[i0:i1+1])[:70]}")
json.dump(out,open('cues.json','w'),indent=0)
