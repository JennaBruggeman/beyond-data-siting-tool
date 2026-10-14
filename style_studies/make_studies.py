#!/usr/bin/env python3
"""Style studies for the Beyond Data 3D city (13 Oct 2026).
Hand-built parallel axonometric in SVG. The scene is INVENTED massing (not surveyed geometry):
a downtown grid with one tower holding data halls. Figures are from the tool's 555 W Hastings test run.
Writes six SVG studies and style_studies.html (page content for the Artifact tool)."""
import math, os, html
OUT = os.path.dirname(os.path.abspath(__file__))
C30, S30 = math.cos(math.radians(30)), math.sin(math.radians(30))

# ------------------------------------------------------------------ scene (metres)
# streets run along x and y; blocks 90 × 60 with 22 m streets
BX, BY, ST = 90, 60, 22
def block(i, j): return (i * (BX + ST), j * (BY + ST))
B = []   # (id, x0, y0, w, d, h, z0, role)
def add(bid, x, y, w, d, h, z0=0, role='city'): B.append([bid, x, y, w, d, h, z0, role])
import random
rnd = random.Random(7)
for i in range(5):
    for j in range(4):
        x, y = block(i, j)
        if (i, j) == (2, 1):
            # host: podium + tower with data-hall band
            add('host_pod', x + 6, y + 6, 78, 42, 16, 0, 'host')
            add('host_twr', x + 26, y + 12, 34, 34, 112, 16, 'host')
            continue
        if (i, j) == (3, 1):   # adjacent office (a second receiver)
            add('recv_b', x + 8, y + 8, 70, 44, 38, 0, 'receiver'); continue
        if (i, j) == (2, 2):   # residential towers across the street (noise receptors)
            add('res1', x + 8, y + 6, 30, 26, 70, 0, 'receptor'); add('res2', x + 48, y + 10, 34, 24, 54, 0, 'receptor')
            add('res_pod', x + 6, y + 36, 78, 20, 10, 0, 'city'); continue
        n = rnd.choice([1, 2, 2, 3])
        if n == 1:
            add(f'b{i}{j}', x + 6, y + 6, 78, 48, rnd.choice([18, 24, 30, 40]), 0)
        else:
            w = (78 - 6 * (n - 1)) / n
            for k in range(n):
                add(f'b{i}{j}{k}', x + 6 + k * (w + 6), y + 6 + rnd.choice([0, 4, 8]), w, rnd.choice([30, 40, 48]), rnd.choice([12, 20, 28, 46, 66, 90]), 0)
HX, HY = block(2, 1)
# plant on the host podium roof (dry coolers), lane plant option, documents-only chiller room, withheld service room
PLANT_ROOF = [('dry coolers', HX + 64, HY + 10, 16, 10, 4, 16)]
PLANT_LANE = [('dry coolers', HX + 30, HY + 50, 26, 8, 4, 0)]
DOC_CHILLER = ('chiller room (permit)', HX + 60, HY + 30, 18, 14, 6, 0)      # documented, drawn dashed at grade
WITHHELD = ('withheld', HX + 8, HY + 34, 14, 10, 8, 0)                       # utility room: hatched void

def P(x, y, z, sc, ox, oy):
    return (ox + (x - y) * C30 * sc, oy + (x + y) * S30 * sc - z * sc)
def poly(pts): return ' '.join(f'{a:.1f},{b:.1f}' for a, b in pts)
def faces(x, y, w, d, h, z0, sc, ox, oy):
    x1, y1, z1 = x + w, y + d, z0 + h
    top = [P(x, y, z1, sc, ox, oy), P(x1, y, z1, sc, ox, oy), P(x1, y1, z1, sc, ox, oy), P(x, y1, z1, sc, ox, oy)]
    right = [P(x1, y, z0, sc, ox, oy), P(x1, y1, z0, sc, ox, oy), P(x1, y1, z1, sc, ox, oy), P(x1, y, z1, sc, ox, oy)]
    front = [P(x, y1, z0, sc, ox, oy), P(x1, y1, z0, sc, ox, oy), P(x1, y1, z1, sc, ox, oy), P(x, y1, z1, sc, ox, oy)]
    return top, right, front
def ground_ellipse(cx, cy, r, sc, ox, oy, n=48):
    return [P(cx + r * math.cos(t), cy + r * math.sin(t), 0, sc, ox, oy) for t in [2 * math.pi * k / n for k in range(n)]]

# ------------------------------------------------------------------ styles
STY = {
 'A': dict(name='Line drawing', bg='#17181a', edge='#cfcac2', edge_w=0.7, top='none', right='none', front='none', street='#202226', accent='#CC746C', accent_fill='#CC746C', accent_op=0.9,
          place='#86ada7', noise='#c9b9a8', heat='#CC746C', text='#e9e6e1', muted='#9d9a94', doc='#9d9a94'),
 'B': dict(name='Solid massing', bg='#17181a', edge='#2a2c30', edge_w=0.5, top='#d9d5cd', right='#a9a59e', front='#8a8781', street='#1d1f22', accent='#CC746C', accent_fill='#CC746C', accent_op=1,
          place='#86ada7', noise='#c9b9a8', heat='#CC746C', text='#e9e6e1', muted='#9d9a94', doc='#9d9a94'),
 'C': dict(name='Paper plate', bg='#f4f2ee', edge='#3a3a3a', edge_w=0.6, top='#ffffff', right='#e6e3de', front='#d7d3cd', street='#ebe8e3', accent='#CC746C', accent_fill='#CC746C', accent_op=0.95,
          place='#5f8c85', noise='#8b7f73', heat='#CC746C', text='#1e1e1e', muted='#6b6964', doc='#6b6964'),
}


class Canvas:
    def __init__(s): s.items=[]; s.minx=s.miny=1e9; s.maxx=s.maxy=-1e9
    def track(s,pts):
        for a,b in pts: s.minx=min(s.minx,a); s.maxx=max(s.maxx,a); s.miny=min(s.miny,b); s.maxy=max(s.maxy,b)
    def add(s,svg,pts=None):
        s.items.append(svg)
        if pts: s.track(pts)

def scene(style, sc=1.0, crop=None, ghost=False, plant='roof', fields=('noise','heat'), states=False, labels=True, flows=True, receivers=True, title=None, mini=False, uid='x'):
    s = STY[style]; ox=oy=0
    cv = Canvas(); lab = []
    def inside(x,y,w=0,d=0):
        if not crop: return True
        cx,cy,r=crop; return abs(x+w/2-cx)<r and abs(y+d/2-cy)<r*0.8
    hid=f'hatch{uid}'; nid=f'nf{uid}'
    defs=(f'<defs><pattern id="{hid}" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="5" stroke="{s["muted"]}" stroke-width="1"/></pattern>'
          f'<radialGradient id="{nid}"><stop offset="0" stop-color="{s["noise"]}" stop-opacity=".38"/><stop offset=".55" stop-color="{s["noise"]}" stop-opacity=".12"/><stop offset="1" stop-color="{s["noise"]}" stop-opacity="0"/></radialGradient></defs>')
    for i in range(5):
        for j in range(4):
            x,y=block(i,j)
            if not inside(x,y,BX,BY): continue
            pts=[P(x,y,0,sc,ox,oy),P(x+BX,y,0,sc,ox,oy),P(x+BX,y+BY,0,sc,ox,oy),P(x,y+BY,0,sc,ox,oy)]
            cv.add(f'<polygon points="{poly(pts)}" fill="{s["street"]}"/>',pts)
    pl = PLANT_ROOF if plant=='roof' else PLANT_LANE
    _,px,py,pw,pd,ph,pz = pl[0]; ncx,ncy = px+pw/2, py+pd/2
    if 'noise' in fields:
        pts=ground_ellipse(ncx,ncy,120,sc,ox,oy); xs=[a for a,b in pts]; ys=[b for a,b in pts]
        cv.add(f'<ellipse cx="{(min(xs)+max(xs))/2:.1f}" cy="{(min(ys)+max(ys))/2:.1f}" rx="{(max(xs)-min(xs))/2:.1f}" ry="{(max(ys)-min(ys))/2:.1f}" fill="url(#{nid})"/>')
        for r_,op in [(40,.55),(80,.35)]:
            cv.add(f'<polygon points="{poly(ground_ellipse(ncx,ncy,r_,sc,ox,oy))}" fill="none" stroke="{s["noise"]}" stroke-width=".7" stroke-dasharray="2 3" opacity="{op}"/>')
        lab.append(('r',P(ncx+56,ncy+56,0,sc,ox,oy),'noise reach (free-field screen)',('50–56 dBA at 30–60 m · limit 45–55 at night' if plant=='roof' else 'not computed for this option — drawn only'),s['noise']))
    if flows:
        hx,hy=HX+43,HY+29; rx_,ry_=block(3,1)
        heat=[P(hx,hy,0,sc,ox,oy),P(hx,HY+BY+11,0,sc,ox,oy),P(rx_+20,HY+BY+11,0,sc,ox,oy),P(rx_+20,ry_+30,0,sc,ox,oy)]
        cv.add(f'<polyline points="{poly(heat)}" fill="none" stroke="{s["heat"]}" stroke-width="{2.4 if not mini else 1.6}" stroke-linecap="round" stroke-linejoin="round"/>')
        if not crop:
            main=[P(HX-60,HY-11,0,sc,ox,oy),P(HX+3*(BX+ST)+BX,HY-11,0,sc,ox,oy)]
            cv.add(f'<polyline points="{poly(main)}" fill="none" stroke="{s["heat"]}" stroke-width="1.1" stroke-dasharray="7 5" opacity=".75"/>')
            lab.append(('r',P(HX+3*(BX+ST)+60,HY-11,0,sc,ox,oy),'steam main (network)','outside the calibrated range — not run',s['heat']))
        sx0 = HX-2*(BX+ST) if not crop else HX-40
        sx1 = HX+3*(BX+ST) if not crop else HX+BX+60
        sew=[P(sx0,HY+BY+16,0,sc,ox,oy),P(sx1,HY+BY+16,0,sc,ox,oy)]
        cv.add(f'<polyline points="{poly(sew)}" fill="none" stroke="{s["place"]}" stroke-width="1.6" stroke-dasharray="1 4" stroke-linecap="round"/>')
        tap=[P(hx-10,HY+BY+16,0,sc,ox,oy),P(hx-10,hy,0,sc,ox,oy)]
        cv.add(f'<polyline points="{poly(tap)}" fill="none" stroke="{s["place"]}" stroke-width="1.2" stroke-dasharray="1 4" stroke-linecap="round"/>')
        lab.append(('l',P(sx0+30,HY+BY+16,0,sc,ox,oy),'sewer as a heat sink — the place gives','waste entering the sewer must stay under 40 °C (Bylaw 299)',s['place']))
        lab.append(('r',P(rx_+60,ry_+30,38,sc,ox,oy),'heat to the neighbour — the data centre gives','host takes 4.9 of 5–30 GWh/yr available',s['heat']))
    hidden = style=='A'
    def okey(b):
        k=b[1]+b[3]/2+b[2]+b[4]/2
        if b[0]=='host_twr':
            pod=[q for q in B if q[0]=='host_pod'][0]; k=pod[1]+pod[3]/2+pod[2]+pod[4]/2+0.01
        return k
    items=list(B)
    if plant=='lane': items.append(['lane_plant',px,py,pw,pd,ph,pz,'plant'])
    for bid,x,y,bw,bd,bh,z0,role in sorted(items,key=okey):
        if role=='plant':
            for f in faces(x,y,bw,bd,bh,z0,sc,ox,oy):
                cv.add(f'<polygon points="{poly(f)}" fill="{s["text"]}" fill-opacity=".9" stroke="{s["bg"]}" stroke-width=".6"/>',f)
            lab.append(('l',P(x,y+bd/2,z0+bh,sc,ox,oy),'dry coolers moved to grade','south side, facing the homes across the street',s['text']))
            continue
        if not inside(x,y,bw,bd): continue
        top,right,front=faces(x,y,bw,bd,bh,z0,sc,ox,oy)
        isacc=role=='host'; isrecv=receivers and role=='receiver' and 'heat' in fields
        for f,key in [(right,'right'),(front,'front'),(top,'top')]:
            if hidden: fill=s['bg']; fo=1
            else: fill=s[key]; fo=1
            if isacc: fill = s['accent_fill'] if (key=='top' or not hidden) else s['bg']; fo = (s['accent_op'] if key=='top' else (.55 if not hidden else 1))
            stroke = s['accent'] if isacc else s['edge']
            gh = ghost and role not in ('host','receiver')
            if gh: cv.add(f'<polygon points="{poly(f)}" fill="none" stroke="{stroke}" stroke-width="{s["edge_w"]}" stroke-opacity=".28" stroke-linejoin="round"/>',f); continue
            cv.add(f'<polygon points="{poly(f)}" fill="{fill}" fill-opacity="{fo}" stroke="{stroke}" stroke-width="{1.2 if isacc else s["edge_w"]}" stroke-linejoin="round"/>',f)
        if isrecv:
            cv.add(f'<polygon points="{poly(top)}" fill="{s["heat"]}" fill-opacity=".30"/>')
            for f in (right,front): cv.add(f'<polygon points="{poly(f)}" fill="{s["heat"]}" fill-opacity=".14"/>')
        if role=='receptor' and not mini:
            pass
        if bid=='host_twr':
            zb=34
            for bnd in ([P(x+bw,y,zb,sc,ox,oy),P(x+bw,y+bd,zb,sc,ox,oy),P(x+bw,y+bd,zb+5,sc,ox,oy),P(x+bw,y,zb+5,sc,ox,oy)],[P(x,y+bd,zb,sc,ox,oy),P(x+bw,y+bd,zb,sc,ox,oy),P(x+bw,y+bd,zb+5,sc,ox,oy),P(x,y+bd,zb+5,sc,ox,oy)]):
                cv.add(f'<polygon points="{poly(bnd)}" fill="{s["accent"]}" fill-opacity=".95"/>')
            lab.append(('r',P(x+bw,y+bd/2,zb+2.5,sc,ox,oy),'data halls, floor 9','0.7–2.2 MW actual (3.7 MW claimed)',s['text']))
        if bid=='host_pod' and plant=='roof':
            for f in faces(px,py,pw,pd,ph,pz,sc,ox,oy):
                cv.add(f'<polygon points="{poly(f)}" fill="{s["text"]}" fill-opacity=".9" stroke="{s["bg"]}" stroke-width=".6"/>')
            lab.append(('r',P(px+pw,py+pd/2,pz+ph,sc,ox,oy),'dry coolers on the podium roof','seen from the street',s['text']))
        if bid=='res1':
            lab.append(('l',P(x,y+bd/2,bh*0.7,sc,ox,oy),'homes across the street','nearest noise receptors, 30–60 m',s['muted']))
    if 'noise' in fields:
        pts=ground_ellipse(ncx,ncy,120,sc,ox,oy); xs=[q[0] for q in pts]; ys=[q[1] for q in pts]
        cv.add(f'<ellipse cx="{(min(xs)+max(xs))/2:.1f}" cy="{(min(ys)+max(ys))/2:.1f}" rx="{(max(xs)-min(xs))/2:.1f}" ry="{(max(ys)-min(ys))/2:.1f}" fill="url(#{nid})" opacity=".55" style="mix-blend-mode:screen"/>')
    if flows:
        cv.add(f'<polyline points="{poly(heat)}" fill="none" stroke="{s["heat"]}" stroke-width="1" stroke-opacity=".45" stroke-dasharray="3 3"/>')
        cv.add(f'<polyline points="{poly(tap)}" fill="none" stroke="{s["place"]}" stroke-width="1" stroke-opacity=".45" stroke-dasharray="1 4"/>')
    if states:
        nm,qx,qy,qw,qd,qh,qz=DOC_CHILLER
        for f in faces(qx,qy,qw,qd,qh,qz,sc,ox,oy):
            cv.add(f'<polygon points="{poly(f)}" fill="none" stroke="{s["doc"]}" stroke-width="1" stroke-dasharray="4 3"/>')
        lab.append(('r',P(qx+qw,qy+qd,qz+qh/2,sc,ox,oy),'chiller room — known from a permit','dashed: not seen from the street',s['muted']))
        pod=[q for q in B if q[0]=='host_pod'][0]
        a=P(pod[1],pod[2]+pod[4],pod[6]+pod[5],sc,ox,oy)          # the podium's near-left top corner
        tx,ty=a[0]-70,a[1]-34
        cv.add(f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{tx+34:.1f}" y2="{ty+9:.1f}" stroke="{s["muted"]}" stroke-width=".7"/>')
        cv.add(f'<rect x="{tx:.1f}" y="{ty:.1f}" width="34" height="18" rx="2" fill="url(#{hid})" stroke="{s["muted"]}" stroke-width=".8"/>',[(tx,ty),(tx+34,ty+18)])
        lab.append(('l',(tx,ty+9),'withheld by the tool','a tag on the building, not a place: something here is not shown',s['muted']))
    # frame + labels in side columns
    pad=24; colw=0 if (mini or not labels) else 380
    minx,maxx,miny,maxy=cv.minx-pad,cv.maxx+pad,cv.miny-pad,cv.maxy+pad
    out=[]
    if labels and not mini:
        T=lambda x,y,t,a,c,sz=12.5: f'<text x="{x:.1f}" y="{y:.1f}" text-anchor="{a}" font-family="Open Sans, system-ui, sans-serif" font-size="{sz}" font-weight="300" fill="{c}">{html.escape(t)}</text>'
        for side in ('l','r'):
            L=[l for l in lab if l[0]==side]; L.sort(key=lambda l:l[1][1])
            xcol = minx-16 if side=='l' else maxx+16
            ys=[]; last=-1e9
            for l in L:
                yy=max(l[1][1],last+44); ys.append(yy); last=yy
            # keep inside vertical frame
            if ys and ys[-1]>maxy-10:
                shift=ys[-1]-(maxy-10); ys=[y-shift for y in ys]
            for l,yy in zip(L,ys):
                a=l[1]; anchor='end' if side=='l' else 'start'
                elbow=(xcol+(8 if side=='l' else -8),yy)
                out.append(f'<polyline points="{a[0]:.1f},{a[1]:.1f} {elbow[0]:.1f},{elbow[1]:.1f} {xcol:.1f},{yy:.1f}" fill="none" stroke="{s["muted"]}" stroke-width=".6"/>')
                out.append(f'<circle cx="{a[0]:.1f}" cy="{a[1]:.1f}" r="1.8" fill="{s["muted"]}"/>')
                tx = xcol-6 if side=='l' else xcol+6
                out.append(T(tx,yy-2,l[2],anchor,l[4])); out.append(T(tx,yy+14,l[3],anchor,s['muted'],11))
    x0=minx-colw; w=(maxx-minx)+2*colw; y0=miny-(10 if mini else 20); hh=(maxy-miny)+(20 if mini else 56)
    foot = '' if (mini or not title) else f'<text x="{x0+20:.1f}" y="{y0+hh-16:.1f}" font-family="Open Sans, system-ui, sans-serif" font-size="11" fill="{s["muted"]}">{html.escape(title)}</text>'
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:.1f} {y0:.1f} {w:.1f} {hh:.1f}" role="img" aria-label="{html.escape(title or "")}" style="display:block;width:100%;height:auto;background:{s["bg"]}">'
            + defs + '\n'.join(cv.items) + '\n'.join(out) + foot + '</svg>')

# ------------------------------------------------------------------ the six studies
studies = []
studies.append(('A', 'Line drawing on dark',
  'The city as thin lines on near-black, matching the diagram. Only the option you are looking at carries colour. Fields and flows sit on the ground plane like annotations on a plan.',
  scene('A', uid='A', title='Study A — line drawing. Indicative massing, not the real block; figures from the 555 W Hastings test run.')))
studies.append(('B', 'Solid massing on dark',
  'The same scene as a physical model: three grey tones for top and sides. It reads faster at a glance and looks more like a city, but the fields and flows have to compete with the volumes.',
  scene('B', uid='B', title='Study B — solid massing. Indicative massing; figures from the 555 W Hastings test run.')))
studies.append(('C', 'Paper plate (for the report)',
  'A light version for the printed package and slides, like an architectural plate. The screen tool stays dark; the report could use this.',
  scene('C', uid='C', title='Study C — paper plate. Indicative massing; figures from the 555 W Hastings test run.')))
studies.append(('D', 'Close-up: three states and both directions',
  'One building up close, with the security line drawn in the open. The roof plant is solid because it can be seen from the street. The chiller room is dashed: it is known only from a permit. What the tool withholds (here, a utility room) appears only as a hatched tag hung on the building, never as a volume at a location, so marking it does not reveal where it is. Red lines carry heat out; dotted grey-green lines carry what the place gives back (here the sewer as a heat sink).',
  scene('A', uid='D', sc=2.2, crop=(HX+45, HY+30, 120), ghost=True, states=True, title='Study D — close-up, three states. Indicative massing; figures from the 555 W Hastings test run.')))
studies.append(('E', 'Same option, plant moved to grade',
  'The option generator in one picture: moving the dry coolers from the podium roof down to grade on the south side moves the noise field toward the homes across the street. The tool would compute both; here the second is only drawn.',
  scene('A', uid='E', plant='lane', title='Study E — plant at grade. Illustrative only: not computed.')))
# small multiples: three options side by side
def mini(plant, fields, cap):
    return scene('A', uid='m'+plant+str(len(fields)), sc=0.55, plant=plant, fields=fields, flows=('heat' in fields), labels=False, title=cap, mini=True)
studies.append(('F', 'Options side by side',
  'How a set of options might sit together: the same block three ways, in no order, each with its rows underneath in its own units. The rows here are placeholders for the layout, not results.',
  None))

OPTS = [('roof', ('noise', 'heat'), 'Roof plant, heat to the neighbour', ['heat taken: 4.9 GWh/yr', 'noise at the towers: 50–56 dBA screen', 'rezoning: none']),
        ('lane', ('noise', 'heat'), 'Grade-level plant, heat to the neighbour', ['heat taken: —', 'noise: lower at the towers, higher at the homes opposite', 'rezoning: none']),
        ('roof', ('noise',), 'Roof plant, no heat recovery', ['heat taken: none', 'noise at the towers: as roof option', 'capital for recovery: none'])]


# ------------------------------------------------------------------ Study G: city scale (invented city)
def city_scene(uid='G'):
    s=STY['A']; sc=0.2; cv=Canvas(); lab=[]
    R=random.Random(11)
    NXB,NYB=21,15; bx,by,st=BX,BY,ST
    water=lambda i,j: j+0.45*i>19 or (i<3 and j<3)          # an invented shoreline in two corners
    hid='nfG'
    defs=(f'<defs><radialGradient id="hG"><stop offset="0" stop-color="{s["heat"]}" stop-opacity=".42"/><stop offset=".6" stop-color="{s["heat"]}" stop-opacity=".12"/><stop offset="1" stop-color="{s["heat"]}" stop-opacity="0"/></radialGradient>'
          f'<radialGradient id="nG"><stop offset="0" stop-color="{s["noise"]}" stop-opacity=".45"/><stop offset="1" stop-color="{s["noise"]}" stop-opacity="0"/></radialGradient></defs>')
    def blk(i,j): return (i*(bx+st), j*(by+st))
    # ground: blocks as faint pads, water left empty
    for i in range(NXB):
        for j in range(NYB):
            if water(i,j): continue
            x,y=blk(i,j); pts=[P(x,y,0,sc,0,0),P(x+bx,y,0,sc,0,0),P(x+bx,y+by,0,sc,0,0),P(x,y+by,0,sc,0,0)]
            cv.add(f'<polygon points="{poly(pts)}" fill="#1d1f22" stroke="none"/>',pts)
    # shoreline hint

    # buildings: very light outlines, heights compressed; downtown denser and taller
    cxd,cyd=9,7
    items=[]
    for i in range(NXB):
        for j in range(NYB):
            if water(i,j): continue
            d=math.hypot(i-cxd,j-cyd); x,y=blk(i,j)
            hmax = 120 if d<3 else (50 if d<7 else 20)
            n = 2 if d<7 else 1
            for k in range(n):
                w=(78-6*(n-1))/n
                items.append((x+6+k*(w+6), y+6, w, 48, R.uniform(.25,1)*hmax))
    for x,y,w,d,h in sorted(items,key=lambda b:b[0]+b[2]/2+b[1]+b[3]/2):
        for f in faces(x,y,w,d,h,0,sc,0,0):
            cv.add(f'<polygon points="{poly(f)}" fill="{s["bg"]}" stroke="{s["edge"]}" stroke-width=".45" stroke-opacity=".5"/>')
    def gp(i,j,dx=45,dy=30): x,y=blk(i,j); return x+dx, y+dy
    cv_items_buildings_end=len(cv.items)
    # receivers: a district energy network (dashed outline over several blocks), hospital campus, pools, a substation
    netb=[(10,6),(11,6),(12,6),(10,5),(11,5),(12,7),(13,7)]
    for (i,j) in netb:
        x,y=blk(i,j); pts=[P(x,y,1,sc,0,0),P(x+bx,y,1,sc,0,0),P(x+bx,y+by,1,sc,0,0),P(x,y+by,1,sc,0,0)]
        cv.add(f'<polygon points="{poly(pts)}" fill="{s["heat"]}" fill-opacity=".22" stroke="none"/>')
    x0,y0=blk(10,5); x1,y1=blk(13,7)
    ring=[P(x0-6,y0-6,1,sc,0,0),P(x1+bx+6,y0-6,1,sc,0,0),P(x1+bx+6,y1+by+6,1,sc,0,0),P(x0-6,y1+by+6,1,sc,0,0)]
    cv.add(f'<polygon points="{poly(ring)}" fill="none" stroke="{s["heat"]}" stroke-width="1.4" stroke-dasharray="6 4"/>')
    lab.append(('r',ring[1],'district energy network','a receiver: takes heat at 65 °C, returns at 45 °C',s['heat']))
    hx,hy=gp(15,10); hp=P(hx,hy,0,sc,0,0)
    cv.add(f'<rect x="{hp[0]-5:.1f}" y="{hp[1]-5:.1f}" width="10" height="10" fill="none" stroke="{s["text"]}" stroke-width=".9"/>')
    lab.append(('r',hp,'hospital campus','heat demand all year',s['text']))
    for (i,j) in [(6,9),(17,4)]:
        q=P(*gp(i,j),0,sc,0,0); cv.add(f'<circle cx="{q[0]:.1f}" cy="{q[1]:.1f}" r="4" fill="none" stroke="{s["text"]}" stroke-width=".9"/>')
    lab.append(('l',P(*gp(6,9),0,sc,0,0),'pools and rinks','year-round heat users',s['text']))
    sp=P(*gp(7,4),0,sc,0,0)
    cv.add(f'<path d="M{sp[0]-6:.1f},{sp[1]+4:.1f} L{sp[0]:.1f},{sp[1]-6:.1f} L{sp[0]+6:.1f},{sp[1]+4:.1f} Z" fill="none" stroke="{s["place"]}" stroke-width="1"/>')
    lab.append(('l',sp,'substation (the place gives power)','headroom not published — "cannot judge"',s['place']))
    # data centres: existing ones as grey marks with an out/in badge; the option in view in red
    def badge(q,outv,inv,col_out,col_in):
        # two short bars: what flows out (top), what the place gives (bottom); lengths illustrative
        cv.add(f'<line x1="{q[0]+9:.1f}" y1="{q[1]-3:.1f}" x2="{q[0]+9+outv:.1f}" y2="{q[1]-3:.1f}" stroke="{col_out}" stroke-width="2.4" stroke-linecap="round"/>')
        cv.add(f'<line x1="{q[0]+9:.1f}" y1="{q[1]+3:.1f}" x2="{q[0]+9+inv:.1f}" y2="{q[1]+3:.1f}" stroke="{col_in}" stroke-width="2.4" stroke-linecap="round"/>')
    exist=[(8,7,14,6),(9,8,4,10),(12,9,2,2),(19,12,6,12),(3,12,0,8)]
    for (i,j,o,n) in exist:
        q=P(*gp(i,j),40,sc,0,0); cv.add(f'<rect x="{q[0]-3.5:.1f}" y="{q[1]-3.5:.1f}" width="7" height="7" fill="{s["text"]}"/>')
        badge(q,o,n,s['muted'],s['place'])
    lab.append(('l',P(*gp(9,8),40,sc,0,0),'existing data centres','bars: what flows out (top), what the place gives (bottom)',s['muted']))
    oi,oj=11,8; ox_,oy_=gp(oi,oj)
    # reach washes for the option in view
    for r_,gid in [(520,'hG'),(170,'nG')]:
        pts=ground_ellipse(ox_,oy_,r_,sc,0,0); xs=[a for a,b in pts]; ys=[b for a,b in pts]
        cv.add(f'<ellipse cx="{(min(xs)+max(xs))/2:.1f}" cy="{(min(ys)+max(ys))/2:.1f}" rx="{(max(xs)-min(xs))/2:.1f}" ry="{(max(ys)-min(ys))/2:.1f}" fill="url(#{gid})"/>')
    pts=ground_ellipse(ox_,oy_,520,sc,0,0); cv.add(f'<polygon points="{poly(pts)}" fill="none" stroke="{s["heat"]}" stroke-width=".6" stroke-dasharray="2 4" stroke-opacity=".7"/>')
    q=P(ox_,oy_,40,sc,0,0)
    cv.add(f'<rect x="{q[0]-5:.1f}" y="{q[1]-5:.1f}" width="10" height="10" fill="{s["accent"]}"/>'); badge(q,22,12,s['accent'],s['place'])
    lab.append(('r',q,'the option in view','heat reach (search radius) and noise reach, as washes',s['accent']))
    # a pipe from the option to the network
    pipe=[P(ox_,oy_,0,sc,0,0),P(ox_,blk(11,7)[1]+by,0,sc,0,0)]
    cv.add(f'<polyline points="{poly(pipe)}" fill="none" stroke="{s["heat"]}" stroke-width="1.6"/>')
    # frame and labels (same column method as the other studies)
    pad=24; colw=360; minx,maxx,miny,maxy=cv.minx-pad,cv.maxx+pad,cv.miny-pad,cv.maxy+pad
    out=[]
    T=lambda x,y,t,a,c,sz=12.5: f'<text x="{x:.1f}" y="{y:.1f}" text-anchor="{a}" font-family="Open Sans, system-ui, sans-serif" font-size="{sz}" font-weight="300" fill="{c}">{html.escape(t)}</text>'
    for side in ('l','r'):
        L=sorted([l for l in lab if l[0]==side],key=lambda l:l[1][1]); xcol=minx-16 if side=='l' else maxx+16; last=-1e9
        for l in L:
            yy=max(l[1][1],last+44); last=yy; a=l[1]; anchor='end' if side=='l' else 'start'
            out.append(f'<polyline points="{a[0]:.1f},{a[1]:.1f} {xcol+(8 if side=="l" else -8):.1f},{yy:.1f} {xcol:.1f},{yy:.1f}" fill="none" stroke="{s["muted"]}" stroke-width=".6"/>')
            out.append(f'<circle cx="{a[0]:.1f}" cy="{a[1]:.1f}" r="1.8" fill="{s["muted"]}"/>')
            tx=xcol-6 if side=='l' else xcol+6
            out.append(T(tx,yy-2,l[2],anchor,l[4])); out.append(T(tx,yy+14,l[3],anchor,s['muted'],11))
    x0=minx-colw; w=(maxx-minx)+2*colw; y0=miny-20; hh=(maxy-miny)+56
    foot=f'<text x="{x0+20:.1f}" y="{y0+hh-16:.1f}" font-family="Open Sans, system-ui, sans-serif" font-size="11" fill="{s["muted"]}">Study G — city scale. An invented city: places, quantities and badge lengths are illustrative, not data.</text>'
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:.1f} {y0:.1f} {w:.1f} {hh:.1f}" role="img" aria-label="Study G, city scale" style="display:block;width:100%;height:auto;background:{s["bg"]}">'+defs+'\n'.join(cv.items)+'\n'.join(out)+foot+'</svg>')

studies.append(('G', 'City scale',
  'Pulled back to the whole city, the buildings drop to faint outlines and the drawing switches to where things are. It shows the data centres, the receivers that could take heat (a district energy network, a hospital campus, pools and rinks) and a substation. Each data centre carries a two-bar badge: what flows out on top, what the place gives on the bottom. That replaces the pipes, which get lost at this distance. The option in view stays the only red mark, with its heat and noise reach as washes. Everything here is invented and illustrative; the real version needs the parcel and receiver data.',
  city_scene()))


# ------------------------------------------------------------------ Study H: eye level (perspective)
def eye_scene():
    s=STY['A']; W,H=1200,700; f=430; cx,cy=W*0.5,H*0.62
    cam=(HX+30, HY+BY+ST-3, 1.6); yaw=math.atan2(-0.97,0.24)   # on the far sidewalk, looking north across the street
    fx,fy=math.cos(yaw),math.sin(yaw)       # forward (plan)
    rx,ry=fy,-fx                            # right
    NEAR=1.0
    def cam_xyz(p):
        dx,dy,dz=p[0]-cam[0],p[1]-cam[1],p[2]-cam[2]
        return (dx*rx+dy*ry, dx*fx+dy*fy, dz)
    def proj(c): return (cx+f*c[0]/c[1], cy-f*c[2]/c[1])
    def clip(poly3):
        out=[]; n=len(poly3)
        for i in range(n):
            a,b=poly3[i],poly3[(i+1)%n]; ina,inb=a[1]>=NEAR,b[1]>=NEAR
            if ina: out.append(a)
            if ina!=inb:
                tt=(NEAR-a[1])/(b[1]-a[1]); out.append(tuple(a[k]+tt*(b[k]-a[k]) for k in range(3)))
        return out
    def face2d(pts3):
        c=clip([cam_xyz(p) for p in pts3]); return [proj(q) for q in c] if len(c)>=3 else None
    def line2d(a,b):
        c=clip([cam_xyz(a),cam_xyz(b),cam_xyz(b)]); return [proj(q) for q in c[:2]] if len(c)>=2 else None
    polys=[]
    def boxfaces(x,y,w,d,h,z0):
        x1,y1,z1=x+w,y+d,z0+h
        F={'s':[(x,y1,z0),(x1,y1,z0),(x1,y1,z1),(x,y1,z1)],'n':[(x1,y,z0),(x,y,z0),(x,y,z1),(x1,y,z1)],
           'e':[(x1,y1,z0),(x1,y,z0),(x1,y,z1),(x1,y1,z1)],'w':[(x,y,z0),(x,y1,z0),(x,y1,z1),(x,y,z1)],'t':[(x,y,z1),(x1,y,z1),(x1,y1,z1),(x,y1,z1)]}
        N={'s':(0,1,0),'n':(0,-1,0),'e':(1,0,0),'w':(-1,0,0),'t':(0,0,1)}
        out=[]
        for k,pts in F.items():
            ctr=[sum(p[i] for p in pts)/4 for i in range(3)]
            v=(cam[0]-ctr[0],cam[1]-ctr[1],cam[2]-ctr[2])
            if v[0]*N[k][0]+v[1]*N[k][1]+v[2]*N[k][2]<=0: continue
            out.append((k,pts,math.dist(ctr,cam)))
        return out
    items=[]
    for bid,x,y,bw,bd,bh,z0,role in B:
        if math.dist((x+bw/2,y+bd/2),(cam[0],cam[1]))>420: continue
        for k,pts,dist in boxfaces(x,y,bw,bd,bh,z0): items.append((dist,bid,role,k,pts))
    items.sort(key=lambda r:-r[0])
    svg=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-label="Study H, eye level" style="display:block;width:100%;height:auto;background:{s["bg"]}">',
         f'<defs><pattern id="hH" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="5" stroke="{s["muted"]}" stroke-width="1"/></pattern>'
         f'<radialGradient id="wH"><stop offset="0" stop-color="{s["muted"]}" stop-opacity=".35"/><stop offset="1" stop-color="{s["muted"]}" stop-opacity="0"/></radialGradient></defs>']
    # ground: horizon and street edges
    svg.append(f'<line x1="0" y1="{cy:.1f}" x2="{W}" y2="{cy:.1f}" stroke="{s["street"]}" stroke-width="1"/>')
    for yy in [HY+BY, HY+BY+ST]:
        L=line2d((HX-200,yy,0),(HX+500,yy,0))
        if L: svg.append(f'<line x1="{L[0][0]:.1f}" y1="{L[0][1]:.1f}" x2="{L[1][0]:.1f}" y2="{L[1][1]:.1f}" stroke="{s["edge"]}" stroke-width=".5" stroke-opacity=".5"/>')
    for xx in [HX+BX, HX+BX+ST]:
        L=line2d((xx,HY-200,0),(xx,HY+BY,0))
        if L: svg.append(f'<line x1="{L[0][0]:.1f}" y1="{L[0][1]:.1f}" x2="{L[1][0]:.1f}" y2="{L[1][1]:.1f}" stroke="{s["edge"]}" stroke-width=".5" stroke-opacity=".5"/>')
    # services under the street: heat pipe (out) and sewer (the place gives)
    L=line2d((HX+43,HY+BY+8,0),(HX+BX+ST+20,HY+BY+8,0))
    if L: svg.append(f'<line x1="{L[0][0]:.1f}" y1="{L[0][1]:.1f}" x2="{L[1][0]:.1f}" y2="{L[1][1]:.1f}" stroke="{s["heat"]}" stroke-width="1.6" stroke-dasharray="8 5"/>')
    L=line2d((HX-150,HY+BY+16,0),(HX+400,HY+BY+16,0))
    if L: svg.append(f'<line x1="{L[0][0]:.1f}" y1="{L[0][1]:.1f}" x2="{L[1][0]:.1f}" y2="{L[1][1]:.1f}" stroke="{s["place"]}" stroke-width="1.6" stroke-dasharray="1 5" stroke-linecap="round"/>')
    # watched area as experienced: a soft wash on the sidewalk in front of the entrance
    wc=face2d([(HX+20,HY+BY-2,0),(HX+55,HY+BY-2,0),(HX+55,HY+BY+6,0),(HX+20,HY+BY+6,0)])
    if wc:
        xs=[p[0] for p in wc]; ys=[p[1] for p in wc]
        svg.append(f'<ellipse cx="{sum(xs)/len(xs):.1f}" cy="{sum(ys)/len(ys):.1f}" rx="{(max(xs)-min(xs))*0.75:.1f}" ry="{(max(ys)-min(ys))*0.9+6:.1f}" fill="url(#wH)"/>')
    labels=[]
    for dist,bid,role,k,pts in items:
        q=face2d(pts)
        if not q: continue
        isacc=role=='host'; isrecv=role=='receiver'
        stroke=s['accent'] if isacc else s['edge']
        svg.append(f'<polygon points="{poly(q)}" fill="{s["bg"]}" stroke="{stroke}" stroke-width="{1.3 if isacc else .7}" stroke-linejoin="round"/>')
        if isrecv: svg.append(f'<polygon points="{poly(q)}" fill="{s["heat"]}" fill-opacity=".14"/>')
        if bid=='host_twr' and k in ('s','e'):
            x,y,bw,bd=[b for b in B if b[0]=='host_twr'][0][1:5]
            band=([(x,y+bd,34),(x+bw,y+bd,34),(x+bw,y+bd,39),(x,y+bd,39)] if k=='s' else [(x+bw,y+bd,34),(x+bw,y,34),(x+bw,y,39),(x+bw,y+bd,39)])
            bq=face2d(band)
            if bq: svg.append(f'<polygon points="{poly(bq)}" fill="{s["accent"]}" fill-opacity=".95"/>')
    # documents only: the chiller room behind the facade, dashed
    nm,qx,qy,qw,qd,qh,qz=DOC_CHILLER
    for k,pts,dd in boxfaces(qx,qy,qw,qd,qh,qz):
        q=face2d(pts)
        if q: svg.append(f'<polygon points="{poly(q)}" fill="none" stroke="{s["doc"]}" stroke-width="1" stroke-dasharray="4 3"/>')
    # the roof plant, hidden by the podium edge from here: dotted outline
    nm,px,py,pw,pd,ph,pz=PLANT_ROOF[0]
    for k,pts,dd in boxfaces(px,py,pw,pd,ph,pz):
        q=face2d(pts)
        if q: svg.append(f'<polygon points="{poly(q)}" fill="none" stroke="{s["text"]}" stroke-width=".9" stroke-dasharray="1 3"/>')
    pod=[b for b in B if b[0]=='host_pod'][0]
    def at(p3): c=cam_xyz(p3); return proj(c) if c[1]>NEAR else None
    T=lambda x,y,tx,a,c,sz=13: f'<text x="{x:.1f}" y="{y:.1f}" text-anchor="{a}" font-family="Open Sans, system-ui, sans-serif" font-size="{sz}" font-weight="300" fill="{c}">{html.escape(tx)}</text>'
    def note(p,tx,sub,c,dx,dy,a='start'):
        if not p: return
        q=(p[0]+dx,p[1]+dy)
        svg.append(f'<line x1="{p[0]:.1f}" y1="{p[1]:.1f}" x2="{q[0]:.1f}" y2="{q[1]:.1f}" stroke="{s["muted"]}" stroke-width=".6"/><circle cx="{p[0]:.1f}" cy="{p[1]:.1f}" r="2" fill="{s["muted"]}"/>')
        off=6 if a=='start' else -6
        svg.append(T(q[0]+off,q[1]-3,tx,a,c)); svg.append(T(q[0]+off,q[1]+13,sub,a,s['muted'],11))
    def snote(p,q,tx,sub,c,a='start'):
        note(p,tx,sub,c,q[0]-p[0],q[1]-p[1],a)
    note(at((px+pw/2,py+pd/2,pz+ph)),'dry coolers on the roof','not visible from here — heard, not seen',s['text'],60,-70)
    x,y,bw,bd=[b for b in B if b[0]=='host_twr'][0][1:5]
    note(at((x+bw,y+bd,36)),'data halls, floor 9','no windows, no sign of what is inside',s['text'],-150,60,'end')
    note(at((qx+qw/2,qy+qd,qz+qh/2)),'chiller room behind the facade','known from a permit — dashed',s['muted'],230,-20)
    snote(at((HX+38,HY+BY+2,0)),(560,590),'watched area, as experienced','J.B.\'s account; no camera positions',s['muted'])
    snote((190,477),(60,522),'heat main under the street','to the neighbour — the data centre gives',s['heat'])
    snote((728,680),(760,640),'sewer under the street','a heat sink — the place gives',s['place'])
    # withheld: a tag on the building, not a location
    a=at((pod[1],pod[2]+pod[4],pod[6]+pod[5]*0.5))
    if a:
        tx,ty=a[0]-120,a[1]-60
        svg.append(f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{tx+40:.1f}" y2="{ty+10:.1f}" stroke="{s["muted"]}" stroke-width=".7"/><rect x="{tx:.1f}" y="{ty:.1f}" width="40" height="20" rx="2" fill="url(#hH)" stroke="{s["muted"]}" stroke-width=".8"/>')
        svg.append(T(tx-8,ty+8,'withheld by the tool','end',s['muted'])); svg.append(T(tx-8,ty+24,'something here is not shown','end',s['muted'],11))
    # sound at this spot
    rx=W-24
    svg.append(f'<rect x="{rx-350}" y="16" width="362" height="112" fill="{s["bg"]}" opacity=".9"/>')
    svg.append(T(rx,36,'standing here','end',s['text'],14))
    for i,ln in enumerate(['sound: not computed at this spot','the screen gives 50–56 dBA at the homes 30–60 m away','seen: the podium, the tower, the entrance','documented: the chiller room · withheld: one item']):
        svg.append(T(rx,56+i*18,ln,'end',s['muted'],12))
    # key plan inset with the camera and view cone
    kx,ky,ks=W-236,H-200,0.36
    def kp(x,y): return (kx+(x-HX+90)*ks, ky+(y-HY+60)*ks)
    svg.append(f'<rect x="{kx-8}" y="{ky-8}" width="196" height="150" fill="{s["bg"]}" stroke="{s["street"]}"/>')
    for bid,x,y,bw,bd,bh,z0,role in B:
        a1=kp(x,y); a2=kp(x+bw,y+bd)
        if a1[0]<kx-8 or a2[0]>kx+188 or a1[1]<ky-8 or a2[1]>ky+142: continue
        svg.append(f'<rect x="{a1[0]:.1f}" y="{a1[1]:.1f}" width="{a2[0]-a1[0]:.1f}" height="{a2[1]-a1[1]:.1f}" fill="none" stroke="{s["accent"] if role=="host" else s["edge"]}" stroke-width=".6" stroke-opacity="{1 if role=="host" else .5}"/>')
    c0=kp(cam[0],cam[1]); half=math.radians(38)
    for sgn in (-1,1):
        a_=yaw+sgn*half; e=(c0[0]+60*math.cos(a_)*1, c0[1]+60*math.sin(a_))
        svg.append(f'<line x1="{c0[0]:.1f}" y1="{c0[1]:.1f}" x2="{e[0]:.1f}" y2="{e[1]:.1f}" stroke="{s["muted"]}" stroke-width=".7"/>')
    svg.append(f'<circle cx="{c0[0]:.1f}" cy="{c0[1]:.1f}" r="3" fill="{s["text"]}"/>')
    svg.append(T(kx-2,ky+156,'key plan · you are here','start',s['muted'],10.5))
    svg.append(T(24,H-16,'Study H — eye level. Indicative massing; figures from the 555 W Hastings test run.','start',s['muted'],11))
    svg.append('</svg>')
    return '\n'.join(svg)

studies.append(('H', 'Eye level',
  'The view from the sidewalk, 1.6 m up, in front of the podium. Perspective replaces the axonometric only here. The line drawing holds: buildings as edges, the data centre in red, the chiller room dashed behind the facade because it is known only from a permit, and the withheld item as a tag. Things a person feels but does not see are written in: the roof plant is heard, not seen; the data halls show no sign of what is inside; the watched area is a soft wash on the sidewalk. Pipes under the street are drawn as they would be on a plan. A key plan shows where you are standing.',
  eye_scene()))

# ------------------------------------------------------------------ write files and the page
for code, name, note, svg in studies:
    if svg: open(os.path.join(OUT, f'study_{code}.svg'), 'w').write(svg)
minis = [(mini(p, f, c), c, rows) for p, f, c, rows in OPTS]

css = """
<style>
:root{color-scheme:dark;--bg:#141517;--panel:#1c1e21;--line:#30343a;--fg:#e9e6e1;--muted:#9d9a94;--accent:#CC746C;--accent-2:#e39a93}
body{background:var(--bg);color:var(--fg);font:300 15px/1.6 "Open Sans",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.wrap{max-width:1240px;margin:0 auto;padding-block:28px 64px;padding-inline:16px}
h1{font-size:22px;font-weight:600;margin:0 0 4px;text-wrap:balance}
.lede{color:var(--muted);max-width:72ch;margin:0 0 28px}
section{margin:0 0 44px}
h2{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:600;margin:0 0 4px}
h3{font-size:18px;font-weight:400;margin:0 0 8px}
.note{color:var(--muted);max-width:76ch;margin:10px 0 0;font-size:14px}
figure{margin:0;border:1px solid var(--line);border-radius:6px;overflow:hidden}
.grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
@media (max-width:860px){.grid3{grid-template-columns:1fr}}
.opt{border:1px solid var(--line);border-radius:6px;overflow:hidden;background:#17181a;min-width:0}
.opt .cap{padding:10px 12px 4px;font-size:13.5px}
.opt ul{list-style:none;margin:0;padding:0 12px 12px;font-size:12.5px;color:var(--muted)}
.opt li{padding:5px 0;border-top:1px solid var(--line)}
.ask{margin-top:36px;padding:16px 18px;border:1px solid var(--line);border-radius:6px;background:var(--panel);max-width:80ch}
.ask b{font-weight:600}
.ask ol{margin:8px 0 0;padding-left:20px}
</style>
"""
parts = ['<title>3D City Style Studies</title>', '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap">', css,
         '<div class="wrap"><h1>Style studies for the 3D city</h1>',
         '<p class="lede">Six still studies of one scene, drawn before any interactive build so the look can be settled first. The massing is invented (a downtown grid with one tower holding data halls). It is not the real block; real footprints arrive with the parcel exports. The figures in the labels come from the tool\'s 555 W Hastings test run. Study E and the side-by-side rows are illustrative, not computed.</p>']
for code, name, note, svg in studies:
    parts.append(f'<section><h2>Study {code}</h2><h3>{html.escape(name)}</h3>')
    if code == 'F':
        parts.append('<div class="grid3">' + ''.join(f'<div class="opt">{m}<div class="cap">{html.escape(c)}</div><ul>' + ''.join(f'<li>{html.escape(r)}</li>' for r in rows) + '</ul></div>' for m, c, rows in minis) + '</div>')
    else:
        parts.append(f'<figure>{svg}</figure>')
    parts.append(f'<p class="note">{html.escape(note)}</p></section>')
parts.append('''<div class="ask"><b>What to decide from these</b><ol>
<li>Line drawing (A) or solid massing (B) for the screen?</li>
<li>Is the paper plate (C) the right register for the report package?</li>
<li>Do the three states in D read clearly, especially the hatched "withheld" volume?</li>
<li>Do two line weights for the two directions (red out, dotted grey-green in) carry reciprocity, or does it need more?</li>
<li>Are the soft fields too faint, about right, or too strong?</li></ol></div></div>''')
open(os.path.join(OUT, 'style_studies.html'), 'w').write('\n'.join(parts))
print('written', len(studies), 'studies')
