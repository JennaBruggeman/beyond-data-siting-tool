# Punch-ins on a 2x screen recording: keyframes (t, cx, cy, w) in 1920-wide coordinates, eased; out 1920x1080 at 30 fps.
import sys,glob,os,json,math
from PIL import Image, ImageDraw
src,out,kf,boxes,srcfps=sys.argv[1],sys.argv[2],json.loads(sys.argv[3]),json.loads(sys.argv[4]),float(sys.argv[5]) if len(sys.argv)>5 else 24
fs=sorted(glob.glob(src+'/*.jpg')); os.makedirs(out,exist_ok=True)
N=int(len(fs)/srcfps*30)
def ease(x): x=max(0,min(1,x)); return 4*x*x*x if x<.5 else 1-(-2*x+2)**3/2
def at(t):
    for i in range(1,len(kf)):
        if t<=kf[i][0]:
            a,b=kf[i-1],kf[i]; u=ease((t-a[0])/(b[0]-a[0]) if b[0]>a[0] else 1)
            # zoom in log space for even motion
            w=math.exp(math.log(a[3])+(math.log(b[3])-math.log(a[3]))*u)
            return a[1]+(b[1]-a[1])*u, a[2]+(b[2]-a[2])*u, w
    return kf[-1][1:]
for k in range(N):
    t=k/30; im=Image.open(fs[min(len(fs)-1,round(t*srcfps))]); S=im.width/1920
    cx,cy,w=at(t); h=w*9/16; x0=min(max(cx-w/2,0),1920-w); y0=min(max(cy-h/2,0),1080-h)
    fr=im.crop((round(x0*S),round(y0*S),round((x0+w)*S),round((y0+h)*S))).resize((1920,1080),Image.LANCZOS)
    d=ImageDraw.Draw(fr)
    for (a,b,bx,by,bw,bh) in boxes:
        if a<=t<=b:
            o=min(1,(t-a)/.3,(b-t)/.3); z=1920/w
            X0,Y0=(bx-x0)*z,(by-y0)*z; X1,Y1=X0+bw*z,Y0+bh*z
            col=(int(31+(231-31)*o),int(32+(163-32)*o),int(35+(156-35)*o))
            d.rounded_rectangle((X0,Y0,X1,Y1),radius=8,outline=col,width=4)
    fr.save(f'{out}/f{k:05d}.jpg',quality=92)
print(N)
