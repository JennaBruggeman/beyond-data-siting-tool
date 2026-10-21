import subprocess,json,os,sys
V='vid/'
def sh(c): subprocess.run(c,shell=True,check=True)
def dur(f): return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]).decode())
enc='-c:v libx264 -pix_fmt yuv420p -crf 18'
# tool punch-ins (2x recordings), 30 fps
if not os.path.exists(V+'intro5.mp4'):
  pass
def tools():
    Z=lambda kf:json.dumps(kf)
    sh(f"python3 zoom.py {V}demo2x {V}demoz '{Z([[0,960,540,1920],[1.2,960,540,1920],[2.4,1060,520,1320],[8.6,1060,520,1320],[9.6,960,560,1700],[10.4,760,560,1250],[13.0,760,560,1200],[14.0,1270,570,1150],[19.8,1270,570,1150],[20.6,1240,580,1150],[26.0,1240,580,1150],[26.9,960,560,1650],[31.5,960,560,1600]])}' '[]'")
    sh(f"python3 zoom.py {V}j0x {V}j0z '{Z([[0,960,520,1150],[3.3,960,505,1100],[3.34,960,470,1560],[6.4,960,470,1420]])}' '[]'")
    sh(f"python3 zoom.py {V}j1x {V}j1z '{Z([[0,960,470,1520],[2.7,960,470,1400]])}' '[]'")
    for d in ['demoz','j0z','j1z']: sh(f"ffmpeg -y -loglevel error -framerate 30 -i {V}{d}/f%05d.jpg {enc} {V}{d}.mp4")
    for j,c in [('j0z','cap0'),('j1z','cap1')]:
        sh(f"ffmpeg -y -loglevel error -i {V}{j}.mp4 -loop 1 -framerate 30 -i chap/{c}.png -filter_complex \"[1:v]format=rgba,fade=in:st=0.2:d=0.4:alpha=1[c];[0:v][c]overlay=shortest=1,format=yuv420p\" {enc} {V}{j}c.mp4")
    d0=dur(V+'j0zc.mp4')
    sh(f"ffmpeg -y -loglevel error -i {V}j0zc.mp4 -i {V}j1zc.mp4 -filter_complex \"[0][1]xfade=transition=fade:duration=0.4:offset={d0-0.4:.3f},format=yuv420p\" {enc} {V}intro5.mp4")
if not os.path.exists(V+'intro5.mp4'): tools()
if 'toolsonly' in sys.argv: sys.exit()
sh(f"ffmpeg -y -loglevel error -i {V}demoz.mp4 -vf setpts=PTS/1.1,fps=30 {enc} {V}demo5.mp4")
sh(f"ffmpeg -y -loglevel error -i {V}ec_5.mp4 -vf trim=0:22.2,setpts=PTS-STARTPTS,setpts=PTS/1.1,fps=30 {enc} {V}ecA5.mp4")
sh(f"ffmpeg -y -loglevel error -i {V}ec_5.mp4 -vf trim=22.2:28,setpts=PTS-STARTPTS,fps=30 {enc} {V}ecB5.mp4")
sh(f"ffmpeg -y -loglevel error -i {V}src_5.mp4 -vf setpts=PTS/1.1,fps=30 {enc} {V}src5f.mp4")
P=['op_5','intro5','h_5','e_5','w_5','m_5','p_5','src5f','dg_5','au_5','demo5','ecA5','fu_5','ecB5']
DIP={2,7,9,12}   # chapter boundaries: a short dip instead of a crossfade
F=[V+p+'.mp4' for p in P]; D=[dur(f) for f in F]
X=[0]+[0.9 if i in DIP else 0.6 for i in range(1,len(F))]
inp=' '.join(f'-i {f}' for f in F)
fc=''.join(f'[{i}:v]fps=30,settb=AVTB,format=yuv420p[v{i}];' for i in range(len(F)))
off=0; last='v0'; starts=[0]
for i in range(1,len(F)):
    off+=D[i-1]-X[i]; starts.append(off); tr='fadeblack' if i in DIP else 'fade'
    fc+=f'[{last}][v{i}]xfade=transition={tr}:duration={X[i]}:offset={off:.3f}[x{i}];'; last=f'x{i}'
total=starts[-1]+D[-1]
# chapter indicator, bottom right
CH=[(1.5,starts[2]),(starts[2]+.5,starts[7]),(starts[7]+.5,starts[9]),(starts[9]+.5,starts[12])]
n=len(F); ov=last
for k,(a,b) in enumerate(CH):
    fc+=f'[{n+1+k}:v]format=rgba,fade=in:st={a:.2f}:d=0.5:alpha=1,fade=out:st={b-0.6:.2f}:d=0.5:alpha=1[c{k}];[{ov}][c{k}]overlay=shortest=0:eof_action=pass[o{k}];'; ov=f'o{k}'
fc+=f'[{ov}]trim=0:{total:.3f},format=yuv420p[out]'
chin=' '.join(f'-loop 1 -framerate 30 -t {total:.2f} -i chap/c{k}.png' for k in range(4))
sh(f'ffmpeg -y -loglevel error {inp} -f lavfi -t {total:.2f} -i anullsrc=r=48000:cl=stereo {chin} -filter_complex "{fc}" -map "[out]" -map {n}:a -c:v libx264 -pix_fmt yuv420p -profile:v high -level 4.1 -crf 19 -r 30 -c:a aac -shortest /mnt/user-data/outputs/beyond-data-pitch-draft-5.mp4')
print(json.dumps([(p,round(s,1)) for p,s in zip(P,starts)])); print('total',round(total,1))
