# Full-bleed letter page (8.5 x 11 in, 300 dpi), no text: the 481 page thumbnails from the video's sources sequence fill the page.
import json, os, random
from PIL import Image
A='anim'; DPI=300; W,H=int(8.5*DPI),int(11*DPI); C,R=17,29; GAP=8
files=[f'{A}/pages/p{i:02d}.png' for i in range(1,15)]+[f'{A}/more/{m[0]}' for m in json.load(open(f'{A}/more.json'))]
files=[f for f in files if os.path.exists(f)]
random.seed(7); extra=random.sample(files[14:],C*R-len(files)); order=files+extra   # 12 repeats so every slot is filled
random.seed(3); random.shuffle(order)
cw,ch=W/C,H/R
for theme,bg in [('light','#dcd9d4'),('dark','#202124')]:
    im=Image.new('RGB',(W,H),bg)
    for i,f in enumerate(order):
        x0=round((i%C)*cw)+GAP//2; y0=round((i//C)*ch)+GAP//2; w=round(cw)-GAP; h=round(ch)-GAP
        t=Image.open(f).convert('RGB'); s=max(w/t.width,h/t.height)          # cover the cell, crop the overflow
        t=t.resize((max(w,round(t.width*s)),max(h,round(t.height*s))),Image.LANCZOS)
        l=(t.width-w)//2; tp=(t.height-h)//2; im.paste(t.crop((l,tp,l+w,tp+h)),(x0,y0))
    os.makedirs('booklet',exist_ok=True); im.save(f'booklet/sources_grid_full_{theme}.png',dpi=(DPI,DPI)); im.save(f'booklet/sources_grid_full_{theme}.pdf',resolution=DPI)
print(len(files),len(order))
