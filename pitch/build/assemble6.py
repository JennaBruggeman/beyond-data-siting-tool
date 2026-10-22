import subprocess,json,os
S='/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/'; V=S+'v6/'
def sh(c): subprocess.run(c,shell=True,check=True)
P=json.load(open(S+'vo2/plan.json'))['plan']
enc='-c:v libx264 -pix_fmt yuv420p -crf 18'
for p in P:
    n=p['name']; f=V+n+'.mp4'
    if not os.path.exists(f): sh(f"ffmpeg -y -loglevel error -framerate 30 -i {V}{n}/f%05d.jpg {enc} {f}")
DIP={2,7,9,12}
F=[V+p['name']+'.mp4' for p in P]
inp=' '.join(f'-i {f}' for f in F)
fc=''.join(f'[{i}:v]fps=30,settb=AVTB,format=yuv420p[v{i}];' for i in range(len(F)))
last='v0'
for i in range(1,len(F)):
    tr='fadeblack' if i in DIP else 'fade'
    fc+=f"[{last}][v{i}]xfade=transition={tr}:duration={P[i]['xf']}:offset={P[i]['start']:.3f}[x{i}];"; last=f'x{i}'
total=P[-1]['start']+P[-1]['dur']; st=[p['start'] for p in P]
CH=[(1.5,st[2]),(st[2]+.5,st[7]),(st[7]+.5,st[9]),(st[9]+.5,st[12])]
n=len(F); ov=last
for k,(a,b) in enumerate(CH):
    fc+=f'[{n+1+k}:v]format=rgba,fade=in:st={a:.2f}:d=0.5:alpha=1,fade=out:st={b-0.6:.2f}:d=0.5:alpha=1[c{k}];[{ov}][c{k}]overlay=shortest=0:eof_action=pass[o{k}];'; ov=f'o{k}'
fc+=f'[{ov}]trim=0:{total:.3f},format=yuv420p[out]'
chin=' '.join(f'-loop 1 -framerate 30 -t {total:.2f} -i {S}chap/c{k}.png' for k in range(4))
sh(f'ffmpeg -y -loglevel error {inp} -i {S}vo2/voice_final.wav {chin} -filter_complex "{fc}" -map "[out]" -map {n}:a -c:v libx264 -pix_fmt yuv420p -profile:v high -level 4.1 -crf 19 -r 30 -c:a aac -b:a 192k -ac 2 -t {total:.3f} /mnt/user-data/outputs/beyond-data-pitch-draft-7.mp4')
print('total',round(total,1))
