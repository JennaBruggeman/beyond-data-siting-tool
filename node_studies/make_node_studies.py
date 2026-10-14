# Node studies v2 (14 Oct): icons beside the ring, outline colour by family group, heat split in three,
# drafted mechanism diagrams in 2D and 3D with numbered callouts, and a mock of the Guide tab.
import json, html, os, sys, math
here = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, here)
from families import FAM, ICON, GROUP, family_of, group_of
D = json.load(open(os.path.join(here, '..', 'diagram_data.json'), encoding='utf-8'))
NODE = {n['id']: n for n in D['nodes']}
E = html.escape
A, A2, FG, MU, FA, LN, L2, BG, PN = '#CC746C', '#e39a93', '#e9e6e1', '#9d9a94', '#6b6964', '#30343a', '#3c4148', '#17181a', '#1e2023'
PLACE = '#86ada7'
GC = {g: v[1] for g, v in GROUP.items()}
def fcol(fam): return GC[group_of(fam)]

def icon(k, x, y, s=1.0, c=MU, w=1.4):
    return f'<path d="{ICON[k]}" transform="translate({x},{y}) scale({s})" fill="none" stroke="{c}" stroke-width="{w/s:.2f}" stroke-linecap="round" stroke-linejoin="round"/>'
def T(x, y, t, c=MU, sz=12, a='start', w=300, extra=''):
    return f'<text x="{x:.1f}" y="{y:.1f}" fill="{c}" font-size="{sz}" font-weight="{w}" text-anchor="{a}" {extra}>{E(t)}</text>'
def ring(cx, cy, conf, r=8):
    out = f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{L2}" stroke-width="2"/>'
    if conf:
        f = conf / 100; a0 = -math.pi / 2; a1 = a0 + 2 * math.pi * min(f, .999)
        x0, y0 = cx + r * math.cos(a0), cy + r * math.sin(a0); x1, y1 = cx + r * math.cos(a1), cy + r * math.sin(a1)
        out += f'<path d="M{x0:.1f},{y0:.1f} A{r},{r} 0 {1 if f > .5 else 0} 1 {x1:.1f},{y1:.1f}" fill="none" stroke="{A}" stroke-width="2"/>'
    return out

# ---------- node as proposed ----------
def node(nid, x=0, y=0, W=210, sel=False):
    n = NODE[nid]; fam = family_of(nid); conf = n.get('conf') or 0; c = fcol(fam)
    s = f'<g transform="translate({x},{y})"><rect x="0" y="0" width="{W}" height="46" rx="5" fill="{PN}" stroke="{A if sel else c}" stroke-width="{1.8 if sel else 1.1}"/>'
    if n.get('side') == 'place' or n['stage'] == 'place': s += f'<rect x="0" y="6" width="3" height="34" fill="{PLACE}"/>'
    s += icon(fam, 11, 11, 1.0, c, 1.3) + ring(W - 16, 23, conf)
    nm = n['name'] if len(n['name']) < 23 else n['name'][:21] + '…'
    s += T(42, 20, nm, FG, 12, w=400) + T(42, 35, n.get('unit') or '', MU, 10) + '</g>'
    return s

# ---------- drafting helpers ----------
class Fig:
    """Callouts follow drafting rules: tags line up in columns (L/R) or rows (T/B) in the margins; leaders run
    only orthogonal or at 45°; anything that is a box gets its number as a badge on the box, with no leader."""
    def __init__(s, W=640, H=380): s.W, s.H, s.p, s.tags, s.calls = W, H, [], [], []
    def add(s, x): s.p.append(x)
    def tag(s, px, py, side, qid, sel, col): s.tags.append(dict(px=px, py=py, side=side, q=qid, col=col, sel=sel))
    def at(s, px, py, tx, ty, qid, sel, col): s.tags.append(dict(px=px, py=py, side='X', tx=tx, ty=ty, q=qid, col=col, sel=sel))
    def badge(s, x, y, qid, sel, col): s.tags.append(dict(px=x, py=y, side='badge', q=qid, col=col, sel=sel))
    def _layout(s):
        GAP, M = 26, 22
        for side in 'LRTB':
            ts = [t for t in s.tags if t['side'] == side]
            if not ts: continue
            vert = side in 'LR'
            ts.sort(key=lambda t: t['py'] if vert else t['px'])
            lo, hi = (30, s.H - 22) if vert else (30, s.W - 30)
            pos = []
            for t in ts:
                v = max(t['py'] if vert else t['px'], lo, (pos[-1] + GAP) if pos else lo); pos.append(v)
            over = pos[-1] - hi
            if over > 0:
                pos = [v - over for v in pos]
                for i in range(len(pos) - 2, -1, -1): pos[i] = min(pos[i], pos[i + 1] - GAP)
            for t, v in zip(ts, pos):
                if side == 'L': t['tx'], t['ty'] = M, v
                elif side == 'R': t['tx'], t['ty'] = s.W - M, v
                elif side == 'T': t['tx'], t['ty'] = v, M
                else: t['tx'], t['ty'] = v, s.H - M
        order = []
        for side in 'TLRXB':
            ts = [t for t in s.tags if t['side'] == side]
            ts.sort(key=lambda t: (t['ty'], t['tx']) if side in 'LR' else (t['tx'], t['ty']))
            order += ts
        bs = [t for t in s.tags if t['side'] == 'badge']; bs.sort(key=lambda t: (round(t['py'] / 40), t['px']))
        for t in bs: t['tx'], t['ty'] = t['px'], t['py']
        order += bs
        for i, t in enumerate(order): t['n'] = i + 1
        s.calls = [(t['n'], t['q']) for t in order]
        return order
    @staticmethod
    def _route(ax, ay, tx, ty, side):
        sg = lambda v: (v > 0) - (v < 0)
        if side == 'X': side = 'R' if tx > ax else 'L'
        if side in 'LR':
            end = tx + (9 if side == 'L' else -9); dx, dy = end - ax, ty - ay
            diag = min(abs(dy), max(abs(dx) - 10, 0))
            pts_ = [(ax, ay), (ax, ty - sg(dy) * diag), (ax + sg(dx) * diag, ty), (end, ty)]
        else:
            end = ty + (9 if side == 'T' else -9); dx, dy = tx - ax, end - ay
            diag = min(abs(dx), max(abs(dy) - 10, 0))
            pts_ = [(ax, ay), (tx - sg(dx) * diag, ay), (tx, ay + sg(dy) * diag), (tx, end)]
        return ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts_)
    def svg(s, label):
        out = []
        for t in s._layout():
            on = t['q'] == t['sel']; lc = A if on else MU
            if t['side'] != 'badge':
                out.append(f'<polyline points="{s._route(t["px"], t["py"], t["tx"], t["ty"], t["side"])}" fill="none" stroke="{lc}" stroke-width=".8" stroke-linejoin="round"/><circle cx="{t["px"]:.1f}" cy="{t["py"]:.1f}" r="2" fill="{lc}"/>')
            out.append(f'<circle cx="{t["tx"]:.1f}" cy="{t["ty"]:.1f}" r="9" fill="{A if on else BG}" stroke="{A if on else t["col"]}" stroke-width="1.2"/>' + T(t['tx'], t['ty'] + 3.8, str(t['n']), BG if on else FG, 10.5, 'middle', 600))
        defs = (f'<defs><marker id="ar" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="{MU}"/></marker>'
                f'<marker id="arW" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="{GC["water"]}"/></marker>'
                f'<pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V5" stroke="{L2}" stroke-width="1"/></pattern></defs>')
        return f'<svg viewBox="0 0 {s.W} {s.H}" role="img" aria-label="{E(label)}" style="width:100%;height:auto;display:block;font-family:Open Sans,system-ui,sans-serif">{defs}{"".join(s.p)}{"".join(out)}</svg>'
    def key(s, sel):
        li = ''.join(f'<li class="{"on" if q == sel else ""}"><span class="n">{n}</span>{E(NODE[q]["name"])} <em>{E(NODE[q].get("unit") or "")}</em></li>' for n, q in s.calls)
        return f'<ol class="ckey">{li}</ol>'

# axonometric (30°)
def AX(ox, oy, S):
    c, sn = math.cos(math.radians(30)), math.sin(math.radians(30))
    return lambda x, y, z=0: (ox + (x - y) * c * S, oy + (x + y) * sn * S - z * S)
def pts(P, L): return ' '.join(f'{P(*q)[0]:.1f},{P(*q)[1]:.1f}' for q in L)
def box(P, x, y, z, w, d, h, st=FG, fill=PN, sw=1.0, dash='', top_fill=None):
    da = f' stroke-dasharray="{dash}"' if dash else ''
    top = [(x, y, z+h), (x+w, y, z+h), (x+w, y+d, z+h), (x, y+d, z+h)]
    fr = [(x, y+d, z), (x+w, y+d, z), (x+w, y+d, z+h), (x, y+d, z+h)]
    rt = [(x+w, y, z), (x+w, y+d, z), (x+w, y+d, z+h), (x+w, y, z+h)]
    return ''.join(f'<polygon points="{pts(P, f)}" fill="{fl}" stroke="{st}" stroke-width="{sw}" stroke-linejoin="round"{da}/>' for f, fl in [(top, top_fill or fill), (fr, fill), (rt, fill)])

# ---------- 1. Heat out (3D cutaway) ----------
def d_heat_out(sel):
    F = Fig(640, 370); P = AX(240, 100, 3.2); H = GC['heat']; c = fcol('heat_out')
    def cc(side, pt, q): F.tag(pt[0], pt[1], side, q, sel, c)
    F.add(f'<polygon points="{pts(P, [(-10,-10,0),(110,-10,0),(110,42,0),(-10,42,0)])}" fill="none" stroke="{LN}"/>')
    F.add(f'<polygon points="{pts(P, [(52,-10,0),(64,-10,0),(64,42,0),(52,42,0)])}" fill="url(#hatch)" stroke="{LN}"/>')
    F.add(T(*[v + o for v, o in zip(P(58, 42, 0), (-4, 16))], 'street', FA, 11, 'middle'))
    x, y, w, d, h = 0, 0, 40, 30, 24
    F.add(f'<polygon points="{pts(P, [(x,y,0),(x+w,y,0),(x+w,y,h),(x,y,h)])}" fill="{PN}" stroke="{FG}"/>')
    F.add(f'<polygon points="{pts(P, [(x,y,0),(x,y+d,0),(x,y+d,h),(x,y,h)])}" fill="{PN}" stroke="{FG}"/>')
    F.add(f'<polygon points="{pts(P, [(x,y,0),(x+w,y,0),(x+w,y+d,0),(x,y+d,0)])}" fill="#1b1d20" stroke="{L2}"/>')
    for i in range(3): F.add(box(P, 6, 6 + i * 7, 0, 18, 4, 9, MU, PN, .8))
    F.add(f'<polyline points="{pts(P, [(24,8,6),(34,8,6),(34,15,6),(43,15,6),(43,15,4)])}" fill="none" stroke="{H}" stroke-width="2"/>')
    F.add(f'<polyline points="{pts(P, [(24,22,4),(36,22,4),(36,17,4),(43,17,4)])}" fill="none" stroke="{H}" stroke-width="1.2" stroke-dasharray="3 2"/>')
    F.add(f'<polyline points="{pts(P, [(x,y+d,0),(x+w,y+d,0),(x+w,y,0)])}" fill="none" stroke="{FG}" stroke-width=".7" stroke-dasharray="2 3"/>')
    F.add(f'<polyline points="{pts(P, [(x,y+d,h),(x+w,y+d,h),(x+w,y,h),(x,y,h),(x,y+d,h)])}" fill="none" stroke="{FG}"/>')
    F.add(f'<polyline points="{pts(P, [(x+w,y+d,0),(x+w,y+d,h)])}" fill="none" stroke="{FG}" stroke-width=".7" stroke-dasharray="2 3"/>')
    F.add(f'<polyline points="{pts(P, [(x,y+d,0),(x,y+d,h)])}" fill="none" stroke="{FG}"/>')
    hb = A if sel in ('heat_captured', 'erf') else H
    F.add(f'<polygon points="{pts(P, [(41.5,-2,0),(41.5,32,0),(41.5,32,27),(41.5,-2,27)])}" fill="{hb}" fill-opacity=".07" stroke="{hb}" stroke-dasharray="5 4"/>')
    F.add(box(P, 43, 11, 0, 7, 8, 7, FG, PN, 1.1))
    F.add(icon('power', *[v - 8 for v in P(48, 26, 2)], .7, GC['power'], 1.2))
    F.add(f'<polyline points="{pts(P, [(48,24,1.5),(48,19.5,1.5)])}" fill="none" stroke="{GC["power"]}" marker-end="url(#ar)"/>')
    F.add(f'<polyline points="{pts(P, [(50,15,2),(53,15,-1),(68,15,-1)])}" fill="none" stroke="{H}" stroke-width="2.6"/>')
    F.add(f'<polyline points="{pts(P, [(68,4,0),(68,26,0)])}" fill="none" stroke="{H}" stroke-width="1.8"/>')
    F.add(box(P, 72, 0, 0, 20, 10, 14, MU, PN, .9)); F.add(box(P, 72, 18, 0, 20, 12, 22, MU, PN, .9))
    F.add(f'<polyline points="{pts(P, [(68,4,0),(72,4,0)])}" fill="none" stroke="{H}" stroke-width="1.8"/><polyline points="{pts(P, [(68,24,0),(72,24,0)])}" fill="none" stroke="{H}" stroke-width="1.8"/>')
    F.add(T(*[v + o for v, o in zip(P(92, 30, 0), (6, 14))], 'neighbours', FA, 11))
    F.add(box(P, 6, 4, 24, 12, 6, 3, FG, PN)); F.add(box(P, 22, 4, 24, 12, 6, 3, FG, PN))
    for xx in (12, 28):
        x0, y0 = P(xx, 7, 27)
        F.add(f'<path d="M{x0:.1f},{y0:.1f} c-5,-6 5,-10 0,-16 s5,-10 0,-16" fill="none" stroke="{MU}" stroke-width="1.1" marker-end="url(#ar)"/>')
    cc('L', P(15, 13, 9), 'liquid_capture')
    cc('L', P(30, 8, 6), 'heat_temp')
    cc('R', P(41.5, -2, 24), 'heat_captured')
    cc('L', P(41.5, 32, 4), 'erf')
    cc('R', P(46, 11, 7), 'cop')
    cc('B', P(48, 26, 2), 'hp_electricity')
    cc('R', P(60, 15, -1), 'heat_delivered')
    cc('R', P(68, 22, 0), 'heat_in_water')
    cc('L', (P(12, 7, 27)[0], P(12, 7, 27)[1] - 30), 'heat_rejected')
    cc('T', P(28, 7, 27), 'free_cooling_hours')
    return F, '3D cutaway', 'Heat leaves the servers in liquid, crosses the data centre boundary, is lifted by a heat pump and crosses the street to the neighbours; the rest goes to air from the roof.'

# ---------- 2. Sound (2D section + level chart on the same distance axis) ----------
def d_sound(sel):
    F = Fig(640, 430); c = fcol('sound'); G = 190
    F.add(f'<path d="M20 {G} H590" stroke="{FG}" stroke-width="1.2"/>')
    F.add(f'<rect x="20" y="{G}" width="570" height="8" fill="url(#hatch)"/>')
    # data centre section
    F.add(f'<rect x="40" y="{G-110}" width="150" height="110" fill="{PN}" stroke="{FG}"/>')
    F.add(f'<rect x="110" y="{G-128}" width="40" height="18" fill="{PN}" stroke="{FG}"/>' + T(130, G - 134, 'rooftop plant', MU, 11, 'middle'))
    F.add(T(115, G - 50, 'data centre', FA, 11, 'middle'))
    # street
    F.add(T(315, G + 22, 'street', FA, 11, 'middle'))
    # neighbour section
    F.add(f'<path d="M440 {G} V{G-96} L500 {G-130} L560 {G-96} V{G}Z" fill="{PN}" stroke="{FG}"/>')
    F.add(f'<path d="M440 {G-48} H560" stroke="{L2}"/><rect x="452" y="{G-84}" width="10" height="24" fill="{BG}" stroke="{FG}"/>')
    F.add(T(505, G - 64, 'bedroom', FA, 11, 'middle'))
    # path and spreading arcs
    F.add(f'<path d="M150 {G-120} L457 {G-72}" stroke="{c}" stroke-width="1.1" stroke-dasharray="5 4"/>')
    for r in (22, 40, 58):
        F.add(f'<path d="M{150+r*0.2:.0f} {G-120-r*0.9:.0f} A{r} {r} 0 0 1 {150+r:.0f} {G-120+r*0.15:.0f}" fill="none" stroke="{L2}"/>')
    # dimension line
    y = G + 50
    F.add(f'<path d="M150 {y} H457 M150 {y-5} V{y+5} M457 {y-5} V{y+5}" stroke="{MU}" stroke-width=".8"/>' + T(303, y - 6, 'distance to the window', MU, 11, 'middle'))
    # chart on same x
    cy0, cy1 = 260, 400
    F.add(f'<path d="M150 {cy0} V{cy1} H580" fill="none" stroke="{L2}"/>' + T(144, cy0 + 4, 'dBA', MU, 10.5, 'end'))
    F.add(f'<rect x="150" y="{cy1-34}" width="430" height="22" fill="{PLACE}" fill-opacity=".14"/>')
    F.add(f'<path d="M150 {cy1-104} H580" stroke="{MU}" stroke-dasharray="6 4"/>')
    F.add(f'<path d="M150 {cy0+6} C230 {cy0+60} 360 {cy1-80} 580 {cy1-90}" fill="none" stroke="{FG}" stroke-width="1.6"/>')
    F.add(f'<path d="M457 {cy0} V{cy1}" stroke="{L2}" stroke-dasharray="2 3"/>')
    F.add(T(576, cy1 - 108, 'local limit', MU, 11, 'end') + T(160, cy1 - 18, 'traffic noise already there', MU, 11))
    F.add(T(580, cy1 + 14, 'curve illustrative; computed per option', FA, 10, 'end'))
    F.add(f'<path d="M230 {G-140} q6 -7 12 0 t12 0 t12 0" fill="none" stroke="{c}" stroke-width="1.1"/>')
    F.tag(457, G - 72, 'R', 'receptors', sel, c)
    F.at(457, cy1 - 86, 510, cy1 - 60, 'noise_level', sel, c)
    F.tag(540, cy1 - 104, 'R', 'noise_limit', sel, c)
    F.tag(420, cy1 - 23, 'R', 'ambient_cover', sel, c)
    F.tag(254, G - 140, 'T', 'lf_flag', sel, c)
    return F, '2D section and chart', 'Sound from rooftop plant spreads and falls off on its way to a bedroom window; the chart below shares the same distance axis.'

# ---------- 3. Water (2D flow diagram) ----------
def d_water(sel):
    F = Fig(640, 330); c = fcol('water'); W_ = GC['water']
    def node_(x, y, w, h, t, sub=''):
        F.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" fill="{PN}" stroke="{FG}"/>' + T(x + 12, y + 22, t, FG, 12, w=400) + (T(x + 12, y + 38, sub, MU, 10.5) if sub else ''))
    def flow(pth, dash=False):
        F.add(f'<path d="{pth}" fill="none" stroke="{W_}" stroke-width="1.8" {"stroke-dasharray=\"5 4\"" if dash else ""} marker-end="url(#arW)"/>')
    T0 = 30
    F.add(T(20, T0, 'SOURCES', MU, 10.5, w=600, extra='letter-spacing="1.5"') + T(250, T0, 'USE', MU, 10.5, w=600, extra='letter-spacing="1.5"') + T(470, T0, 'WHERE IT GOES', MU, 10.5, w=600, extra='letter-spacing="1.5"'))
    node_(20, 50, 160, 46, 'City supply', 'potable or reclaimed')
    node_(20, 120, 160, 46, 'Rain off the roof', 'collected on site')
    node_(20, 190, 160, 46, 'Sea or river', 'licence may apply')
    node_(250, 110, 150, 70, 'Cooling', 'litres per kWh of IT')
    node_(470, 50, 150, 46, 'To air', 'evaporated')
    node_(470, 150, 150, 46, 'To sewer', 'blowdown')
    node_(20, 270, 160, 46, 'Power stations', 'water behind the electricity')
    flow('M180 73 C215 73 215 130 248 130'); flow('M180 143 H248'); flow('M180 213 C215 213 215 160 248 160')
    flow('M400 130 C435 130 435 73 468 73'); flow('M400 160 C435 160 435 173 468 173')
    F.add(f'<path d="M180 293 H325 V182" fill="none" stroke="{GC["power"]}" stroke-width="1.2" stroke-dasharray="4 4" marker-end="url(#ar)"/>' + T(190, 286, 'upstream, via the electricity', MU, 10.5))
    F.badge(400, 110, 'wue', sel, c)
    F.badge(620, 50, 'evaporation', sel, c)
    F.badge(620, 150, 'blowdown', sel, c)
    F.badge(180, 50, 'water_supply', sel, c)
    F.badge(180, 120, 'rainwater', sel, c)
    F.badge(158, 190, 'surface_water_sink', sel, c)
    F.badge(180, 190, 'licence_flag', sel, c)
    F.badge(180, 270, 'water_behind_electricity', sel, c)
    return F, '2D flow diagram', 'Water comes in from three sources and leaves two ways; the water used to make the electricity is counted upstream.'

# ---------- 4. What the heat becomes (3D neighbourhood) ----------
def d_heat_use(sel):
    F = Fig(640, 400); P = AX(320, 80, 1.4); H = GC['heat']; c = fcol('heat_use')
    blocks = []
    for i in range(5):
        for j in range(4):
            bx, by = i * 52, j * 52
            blocks.append((bx, by))
    cx, cy = 2 * 52 + 20, 1 * 52 + 20
    # ground circle (search radius)
    R = 95
    circ = [(cx + R * math.cos(t), cy + R * math.sin(t), 0) for t in [k * math.pi / 36 for k in range(73)]]
    F.add(f'<polygon points="{pts(P, circ)}" fill="{H}" fill-opacity=".05" stroke="{A if sel=="receiver_radius" else H}" stroke-dasharray="6 5"/>')
    # pipes
    pipe = [(cx, cy, 0), (cx, cy + 32, 0), (cx - 70, cy + 32, 0)], [(cx, cy + 32, 0), (cx + 80, cy + 32, 0)], [(cx + 26, cy + 32, 0), (cx + 26, cy - 50, 0)]
    for p_ in pipe: F.add(f'<polyline points="{pts(P, p_)}" fill="none" stroke="{H}" stroke-width="2"/>')
    order = sorted(blocks, key=lambda b: b[0] + b[1])
    recv = {(52, 104), (156, 104), (156, 0), (208, 52)}
    for bx, by in order:
        if (bx, by) == (104, 52):
            F.add(box(P, bx + 6, by + 6, 0, 30, 28, 16, FG, PN, 1.3)); continue
        hgt = 8 + ((bx * 7 + by * 3) % 5) * 4
        if (bx, by) == (208, 52):  # greenhouse
            F.add(box(P, bx + 4, by + 8, 0, 34, 22, 8, H, PN, 1.1)); continue
        F.add(box(P, bx + 8, by + 8, 0, 26, 26, hgt, H if (bx, by) in recv else L2, PN, 1.1 if (bx, by) in recv else .8))
    F.add(T(*[v + o for v, o in zip(P(cx, cy, 30), (0, -8))], 'data centre', MU, 11, 'middle'))
    F.tag(*P(cx + R * .7, cy + R * .7, 0), 'R', 'receiver_radius', sel, c)
    F.tag(*P(cx + 10, cy + 32, 0), 'B', 'linear_heat_density', sel, c)
    F.tag(*P(73, 125, 12), 'L', 'receiver_demand', sel, c)
    F.tag(*P(169, 125, 14), 'B', 'homes_heated', sel, c)
    F.tag(*P(225, 70, 8), 'R', 'greenhouse_area', sel, c)
    F.tag(*P(169, 21, 14), 'R', 'receiver_temp', sel, c)
    F.tag(*P(30, 30, 0), 'L', 'heat_density', sel, c)
    return F, '3D neighbourhood', 'Within a search radius, the pipe reaches the buildings that can take the heat; a greenhouse is one possible receiver.'

DIAG = [('heat_out', d_heat_out, 'heat_captured'), ('sound', d_sound, 'noise_level'), ('water', d_water, 'wue'), ('heat_use', d_heat_use, 'homes_heated')]

def figure(fam, fn, sel):
    F, kind, cap = fn(sel)
    return f'''<figure class="dg"><div class="dghead"><svg width="20" height="20" viewBox="0 0 24 24">{icon(fam,0,0,1,fcol(fam),1.5)}</svg><b>{E(FAM[fam][0])}</b><span class="tag">{E(kind)}</span></div>
{F.svg(cap)}<figcaption class="draft">{E(cap)}</figcaption>{F.key(sel)}</figure>'''

# ---------- drawing type per family ----------
PLAN = [
 ('heat_out', '3D cutaway', 'servers → liquid → boundary → heat pump → pipe'),
 ('heat_use', '3D neighbourhood', 'search radius, pipe, receivers'),
 ('sink', '2D street section', 'sewer main and sea or river under and beside the site'),
 ('power', '2D one-line + stacked bar', 'grid → substation → IT load and overheads'),
 ('water', '2D flow diagram', 'sources, use, where it goes'),
 ('sound', '2D section + chart', 'plant → distance → window, level vs distance'),
 ('seen', '3D eye level', 'what a passer-by sees; light at a window; watched area'),
 ('carbon', '2D stacked bar over the lifecycle', 'grid, generators, refrigerant, embodied'),
 ('materials', '2D exploded inventory', 'what is in the building and where it goes'),
 ('space', '3D massing', 'parcel, floor area, what could be offered'),
 ('it', '3D cutaway', 'halls, racks, plant on the roof'),
 ('money', '2D price window', 'operator floor vs buyer ceiling; who pays'),
 ('rules', '2D process timeline', 'zoning, rezoning, consultation, permits'),
 ('people', '2D plan with rings', 'who is within reach, and how they are affected'),
 ('time', '2D lifecycle strip', 'construction, ramp-up, refreshes, closure'),
 ('ground', '2D ground section', 'strata, water table, wells'),
 ('account', 'Table', 'the trade-off table itself'),
]
plan_rows = ''.join(f'<tr><td><svg width="18" height="18" viewBox="0 0 24 24">{icon(f,0,0,1,fcol(f),1.5)}</svg> {E(FAM[f][0])}</td><td>{E(k)}</td><td>{E(w)}</td></tr>' for f, k, w in PLAN)

# ---------- guide tab mock: rationale for heat out ----------
RAT = {
 'heat_rejected': 'Almost all the electricity a data centre uses ends up as heat; this is the total that has to go somewhere.',
 'liquid_capture': 'Heat caught in liquid at the chip is warmer and easier to pass on than heat in air; the share sets how much is usable.',
 'heat_temp': 'The temperature decides who can use the heat directly, and how hard a heat pump has to work.',
 'heat_captured': 'The heat that crosses the data centre boundary into a reuse system: the quantity the international standard (ISO/IEC 30134-6) asks to be measured.',
 'erf': 'Captured heat as a share of the energy used: the standard\'s headline ratio, and how the built cases are compared.',
 'cop': 'How much heat a heat pump gives per unit of electricity at these temperatures.',
 'hp_electricity': 'Lifting the heat to network temperature costs electricity; counting it keeps the gain honest.',
 'heat_delivered': 'What reaches the network after the heat pump: the figure the neighbours can actually use.',
 'heat_in_water': 'Heat carried per volume of water, which sizes the pipes and the flow.',
 'free_cooling_hours': 'Hours when outside air alone can cool the data centre; they change how much heat is worth capturing.',
}
rat_list = ''.join(f'<li><b>{E(NODE[q]["name"])}</b> <em>{E(NODE[q].get("unit") or "")}</em><br><span class="draft">{E(t)}</span></li>' for q, t in RAT.items())
fam_list = ''.join(f'<li class="{"on" if f=="heat_out" else ""}"><svg width="16" height="16" viewBox="0 0 24 24">{icon(f,0,0,1,fcol(f),1.6)}</svg>{E(FAM[f][0])}</li>' for f in FAM)
F0, _, cap0 = d_heat_out('heat_captured')

SIDE = [
 ('Family and kind', 'Which family the item belongs to (its icon) and whether it is an input, a quantity or a condition.'),
 ('Name and unit', 'Each figure stays in its own unit; nothing is converted to a common score.'),
 ('Confidence ring', 'How far the tool can trust the figure: full is arithmetic, three-quarters a regulation or government data, half an operator\'s claim.'),
 ('Diagram', 'Where the figure sits in the mechanism it belongs to.'),
 ('Formula', 'How it is worked out, from which other figures.'),
 ('Sources and their roles', 'Which source gives which term, and how sure that placement is.'),
 ('Conditions it feeds', 'Which conditions are judged on it, and what would move them.'),
]
side_list = ''.join(f'<li><span class="n">{i+1}</span><b>{E(a)}</b><br><span class="draft">{E(b)}</span></li>' for i, (a, b) in enumerate(SIDE))

group_cells = ''.join(f'''<div class="grp"><div class="gh"><i style="background:{col}"></i>{E(name)}</div>{"".join(f'<div class="ic"><svg viewBox="0 0 24 24" width="24" height="24">{icon(f,0,0,1,col,1.4)}</svg><span>{E(FAM[f][0])}<em>{len(FAM[f][1])}</em></span></div>' for f in fams)}</div>''' for g, (name, col, fams) in GROUP.items())
sample = ['heat_captured', 'homes_heated', 'sewer_sink', 'pue', 'noise_level', 'zoning_status']
nodes_svg = ''.join(node(q, (i % 3) * 222, (i // 3) * 58, sel=(q == 'heat_captured')) for i, q in enumerate(sample))
figs = ''.join(figure(f, fn, s) for f, fn, s in DIAG)

page = f'''<title>Node Icon Studies</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap">
<style>
:root{{color-scheme:dark;--bg:#17181a;--panel:#1e2023;--line:#30343a;--line-2:#3c4148;--fg:#e9e6e1;--muted:#9d9a94;--faint:#6b6964;--accent:#CC746C;--accent-2:#e39a93}}
body{{background:var(--bg);color:var(--fg);font:300 14px/1.55 "Open Sans",system-ui,sans-serif;margin:0}}
.wrap{{max-width:1200px;margin:0 auto;padding-block:28px 64px;padding-inline:20px}}
h1{{font-size:20px;font-weight:600;margin:0}} h2{{font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:600;margin:44px 0 6px}}
p{{max-width:74ch;color:var(--muted)}} .draft{{color:var(--accent-2)}} .note{{font-size:12px;color:var(--faint)}}
.dec{{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;margin-top:12px}} .dec div{{border:1px solid var(--line);border-radius:6px;padding:10px 12px;font-size:13px}} .dec b{{display:block;font-weight:600;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:2px}}
.groups{{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:12px;margin-top:12px}}
.grp{{border:1px solid var(--line);border-radius:8px;padding:10px 12px}} .gh{{font-size:12px;letter-spacing:.1em;text-transform:uppercase;font-weight:600;color:var(--muted);display:flex;align-items:center;gap:8px;margin-bottom:6px}} .gh i{{width:22px;height:3px;border-radius:2px;display:inline-block}}
.ic{{display:flex;align-items:center;gap:10px;padding:4px 0;font-size:13px}} .ic em{{font-style:normal;color:var(--faint);margin-left:6px;font-size:11.5px}}
.dgs{{display:grid;grid-template-columns:repeat(auto-fill,minmax(520px,1fr));gap:18px;margin-top:14px}}
@media (max-width:600px){{.dgs{{grid-template-columns:1fr}}}}
.dg{{margin:0;background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:14px 16px;min-width:0}}
.dghead{{display:flex;align-items:center;gap:8px;margin-bottom:8px}} .dghead b{{font-weight:600}} .tag{{margin-left:auto;font-size:11px;border:1px solid var(--line-2);border-radius:999px;padding:1px 9px;color:var(--muted)}}
figcaption{{font-size:12.5px;margin-top:6px}}
.ckey{{list-style:none;padding:0;margin:10px 0 0;columns:2;column-gap:20px;font-size:12.5px}} .ckey li{{break-inside:avoid;margin:3px 0;color:var(--fg)}} .ckey em{{font-style:normal;color:var(--faint);font-size:11.5px}}
.n{{display:inline-grid;place-items:center;width:18px;height:18px;border-radius:50%;border:1px solid var(--line-2);font-size:10.5px;font-weight:600;margin-right:7px;vertical-align:1px}}
.ckey li.on{{color:var(--accent-2)}} .ckey li.on .n{{background:var(--accent);border-color:var(--accent);color:#17181a}}
table{{border-collapse:collapse;width:100%;font-size:13px;margin-top:10px}} td{{border-top:1px solid var(--line);padding:7px 10px 7px 0;vertical-align:top}} td:first-child{{white-space:nowrap}} td svg{{vertical-align:-4px;margin-right:6px}}
.tw{{overflow-x:auto}}
.guide{{display:grid;grid-template-columns:220px minmax(0,1fr) 300px;gap:0;border:1px solid var(--line);border-radius:10px;overflow:hidden;margin-top:14px;background:var(--panel)}}
@media (max-width:980px){{.guide{{grid-template-columns:1fr}}}}
.guide>div{{padding:14px 16px;min-width:0}} .guide .fl{{border-right:1px solid var(--line)}} .guide .rt{{border-left:1px solid var(--line)}}
.fl ul{{list-style:none;padding:0;margin:8px 0 0;font-size:13px}} .fl li{{display:flex;gap:8px;align-items:center;padding:4px 6px;border-radius:5px;color:var(--muted)}} .fl li.on{{background:#24272b;color:var(--fg)}}
.rt ul{{list-style:none;padding:0;margin:8px 0 0;font-size:13px}} .rt li{{margin:0 0 10px}} .rt b{{font-weight:400}} .rt em{{font-style:normal;color:var(--faint);font-size:11.5px}}
.k{{font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:600}}
.side{{list-style:none;padding:0;margin:10px 0 0;display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px 20px;font-size:13px}} .side b{{font-weight:400}}
ol.q{{color:var(--muted);max-width:76ch}} ol.q li{{margin:6px 0}}
</style>
<div class="wrap">
<h1>Node icons and diagrams — study 2</h1>
<p class="draft">After J.B.'s review: icons sit beside the ring, the outline takes the family's colour, heat splits in three, and a Guide tab explains every node and the side panel. The diagrams are redrawn in 2D or 3D, whichever shows the mechanism more clearly.</p>
<p class="note">Draft wording (Claude) — for J.B. to rewrite. All drawings are diagrams of how things work, not measured; numbers appear only in the worked example.</p>

<div class="dec"><div><b>Decided</b>Icons beside the ring (C).</div><div><b>Decided</b>Outline coloured by family group.</div><div><b>Decided</b>A Guide tab: diagrams, rationale per node, how to read the side panel.</div><div><b>Proposed</b>Heat in three: heat out · what the heat becomes · cooling the place offers.</div></div>

<h2>1 · Seventeen families in six colour groups</h2>
<p>Seventeen outline colours would be impossible to tell apart, so the families share six colours by group; the icon tells families within a group apart. The red accent stays reserved for what is selected and for the user's own values. The grey-green tick on the left edge still marks what the place offers.</p>
<div class="groups">{group_cells}</div>

<h2>2 · Nodes as they would look</h2>
<p>Icon at the left, confidence ring at the right, outline in the group colour; the selected node turns red.</p>
<div class="tw"><svg viewBox="-2 -2 670 120" style="width:100%;max-width:670px;min-width:560px;font-family:Open Sans,system-ui,sans-serif">{nodes_svg}</svg></div>

<h2>3 · Mechanism diagrams, redrawn</h2>
<p>Drafting conventions throughout: three line weights (structure, flows, notes), numbered tags instead of labels on the drawing; a box gets its number as a badge with no leader; every other leader runs only orthogonal or at 45°, and tags line up in columns or rows in empty space; tags are numbered in reading order; a key under each figure with the node names, and the selected node in red. Two are 3D, where space and adjacency are the point; two are 2D, where a section or a flow reads more clearly.</p>
<div class="dgs">{figs}</div>

<h2>4 · Drawing type for each family</h2>
<div class="tw"><table><tr><td class="k">Family</td><td class="k">Drawing</td><td class="k">What it shows</td></tr>{plan_rows}</table></div>

<h2>5 · The Guide tab (mock)</h2>
<p>A third tab beside Tool logic and User workflow. Pick a family on the left; its diagram fills the middle; the right column says why each node is in the tool. A second page explains the side panel.</p>
<div class="guide"><div class="fl"><div class="k">Families</div><ul>{fam_list}</ul></div>
<div><div class="k">Heat out of the data centre</div>{F0.svg(cap0)}{F0.key('heat_captured')}</div>
<div class="rt"><div class="k">Why each node is here</div><ul>{rat_list}</ul></div></div>

<h3 style="font-weight:600;font-size:15px;margin:22px 0 0">Reading the side panel</h3>
<ul class="side">{side_list}</ul>

<h2>Questions for J.B.</h2>
<ol class="q">
<li>Heat in three (out · what it becomes · cooling the place offers) — right split?</li>
<li>Do the six colour groups make sense, and do the colours read as calm enough next to the red accent?</li>
<li>Diagram quality: is this the level to aim for? Which of the four is closest to what you want, and what would you push further?</li>
<li>The drawing type per family (section 4): anything you would switch between 2D and 3D?</li>
<li>Guide tab: rationale written by you (my drafts in red to start from), as with the other user-facing text?</li>
</ol>
</div>'''
open(os.path.join(here, 'node_studies.html'), 'w', encoding='utf-8').write(page)
print('written')
