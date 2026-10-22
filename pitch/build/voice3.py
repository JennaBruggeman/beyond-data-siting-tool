import json,subprocess,numpy as np,soundfile as sf
P=json.load(open('../vo2/plan.json')); new=json.load(open('cues.json'))
T=P['plan'][-1]['start']+P['plan'][-1]['dur']; sr=48000; out=np.zeros(int(T*sr)+sr); prev=0; mx=0
for k,t in P['voice']:
    old=sf.info(f'../vo2/t_{k}.wav').duration; nl=new[k]['len']
    tempo=max(1.0,min(1.12,nl/(old+0.3)))
    af=f"rubberband=tempo={tempo:.3f}:transients=smooth:formant=preserved" if tempo>1.001 else "anull"
    subprocess.run(['ffmpeg','-v','error','-y','-i',f'cue_{k}.wav','-af',af,'-ar','48000',f't_{k}.wav'],check=True)
    x,_=sf.read(f't_{k}.wav'); st=max(t,prev+0.25); mx=max(mx,st-t)
    if st-t>0.05: print(f'{k}: delayed {st-t:.2f}s (tempo {tempo:.2f})')
    i=int(st*sr); out[i:i+len(x)]+=x; prev=st+len(x)/sr
print('max delay',round(mx,2),'last end',round(prev,2),'of',round(T,2))
sf.write('voice_pre.wav',out[:int(T*sr)],sr)
subprocess.run('ffmpeg -v error -y -i voice_pre.wav -af loudnorm=I=-16:TP=-1.5:LRA=9 -ar 48000 voice_final.wav',shell=True,check=True)
