import json, numpy as np, soundfile as sf
W=json.load(open('words.json')); a,sr=sf.read('clean4.wav',dtype='float32')
sil=[float(x.split(': ')[1]) for x in open('sil.txt')]; SI=list(zip(sil[0::2],sil[1::2]))
# cue: (key, first word idx, last word idx)
C=[('op.globe',0,4),('op.dive',19,22),('op.power',31,58),('op.first',59,65),('op.five',66,75),('op.both',76,79),('op.ethos',80,98),('op.title',99,102),
('intro',103,117),('heat',118,151),('energy',159,175),('water',194,212),('materials',221,245),('people',264,295),
('src.pile',296,316),('src.kinds',317,339),('lv.intro',340,357),('lv.every',358,369),('lv.civic',370,382),('lv.tech',383,389),('dg.over',390,405),('dg.chainA',417,453),('dg.chainB',454,466),('dg.math',467,483),('dg.trust',529,560),('dg.weak',627,675),
('au.team',676,689),('au.hand',690,716),('au.who',724,751),('demo.here',752,767),('demo.finds',768,785),('demo.opps',786,794),('ec.covers',795,800),('ec.scatter',801,822),('ec.gap',823,843),('ec.two',844,859),('ec.close',860,862),('fu',878,904)]
hop=int(.01*sr); rms=np.sqrt(np.convolve(a**2,np.ones(2*hop)/(2*hop),'same')[::hop])
def bound(i):
    """(end of speech before word i, start of word i)"""
    if i==0: return (0.0,0.0)
    if i>=len(W): T=len(a)/sr; return (T,T)
    p,t=W[i-1]['s'],W[i]['s']
    c=[(x,y) for x,y in SI if x>p+0.1 and x<t+0.2]
    if c:
        x,y=c[-1]; return (x+0.12, min(y,t+0.25)-0.06)
    lo,hi=int((p+0.25)*100),int((t+0.15)*100); k=lo+int(np.argmin(rms[lo:hi])) if hi>lo else int(t*100)
    return (k/100,k/100)
def start_of(i): return bound(i)[1]
def end_of(i): return bound(i+1)[0]
MAXG=0.42; out={}
for k,i0,i1 in C:
    s0,s1=start_of(i0),end_of(i1)
    s1=min(s1,{'materials':139.9,'dg.chainA':246.5,'fu':479.45}.get(k,1e9))
    parts=[];cur=s0
    for s,e in SI:
        if s>s0 and e<s1 and e-s>MAXG:
            mid=(s+e)/2; parts.append((cur,s+MAXG/2)); cur=e-MAXG/2
    parts.append((cur,s1))
    seg=[]
    for p0,p1 in parts:
        x=a[int(p0*sr):int(p1*sr)].copy(); f=int(.02*sr); x[:f]*=np.linspace(0,1,f); x[-f:]*=np.linspace(1,0,f); seg.append(x)
    y=np.concatenate(seg); sf.write(f'cue_{k}.wav',y,sr); out[k]=dict(raw=[round(s0,2),round(s1,2)],len=round(len(y)/sr,2))
    print(f"{k:12s} raw {s0:7.2f}-{s1:7.2f} ({s1-s0:5.2f})  -> {len(y)/sr:5.2f}")
json.dump(out,open('cues.json','w'),indent=0)
print('total',round(sum(v['len'] for v in out.values()),1))
