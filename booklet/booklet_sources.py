# Letter page (8.5 x 11 in, 300 dpi): every page thumbnail from the sources sequence of the pitch video, in one grid.
import json, math, os
from PIL import Image, ImageDraw, ImageFont
A='anim'; DPI=300; W,H=int(8.5*DPI),int(11*DPI); M=int(.6*DPI)
F=lambda w,s: ImageFont.truetype(f'fonts/IBMPlexSans-{w}.ttf',s)
files=[f'{A}/pages/p{i:02d}.png' for i in range(1,15)]+[f'{A}/more/{m[0]}' for m in json.load(open(f'{A}/more.json'))]
files=[f for f in files if os.path.exists(f)]; N=len(files)
def page(theme):
    bg,ink,mute,faint,edge=(('#ffffff','#1d1d1f','#5f5d59','#8a8680','#c9c6c0') if theme=='light' else ('#202124','#f2efea','#bdb9b2','#8a8680','#3b3e43'))
    im=Image.new('RGB',(W,H),bg); d=ImageDraw.Draw(im)
    d.text((M,M),'704 sources, and growing',font=F('500',96),fill=ink)
    d.text((M,M+140),f'{N} pages, the first one to three of each of 182 documents in the project library: research, law,',font=F('400',40),fill=mute)
    d.text((M,M+192),'city by-laws and plans, utilities and regulators, built cases, models, and operator claims (labelled as claims).',font=F('400',40),fill=mute)
    top=M+300; foot=int(1.15*DPI); gw=W-2*M; gh=H-top-M-foot
    best=None
    for c in range(18,40):
        w=gw/c; h=w*1.33; r=math.ceil(N/c)
        if r*h<=gh: best=(c,w,h,r); break
    c,w,h,r=best; gap=max(4,int(w*.08)); tw=int(w-gap); th=int(tw*1.33); h=min(gh/r,h*1.12)
    for i,f in enumerate(files):
        x=M+(i%c)*w; y=top+(i//c)*h
        t=Image.open(f).convert('RGB'); t.thumbnail((tw,th),Image.LANCZOS)
        ox=int(x+(tw-t.width)/2); oy=int(y+(th-t.height)/2); im.paste(t,(ox,oy)); d.rectangle((ox-1,oy-1,ox+t.width,oy+t.height),outline=edge,width=2)
    fy=H-M-foot+60
    d.line((M,fy-30,W-M,fy-30),fill=edge,width=2)
    cols=[('Everyday','45 parts','186 sources'),('Civic','125 parts','469 sources'),('Technical','195 parts','595 sources')]
    cw=(W-2*M)/3
    for k,(a,b,s) in enumerate(cols):
        x=M+k*cw; d.text((x,fy),a,font=F('500',46),fill=ink); d.text((x,fy+64),f'{b}, {s}',font=F('400',36),fill=mute)
    d.text((M,H-M-34),'Each level of the tool reads only the sources behind the parts it shows. BC Assessment pages and photos of people removed.',font=F('400',31),fill=faint)
    return im
os.makedirs('booklet',exist_ok=True)
for t in ['light','dark']:
    im=page(t); im.save(f'booklet/sources_grid_{t}.png',dpi=(DPI,DPI)); im.save(f'booklet/sources_grid_{t}.pdf',resolution=DPI)
print(N)
