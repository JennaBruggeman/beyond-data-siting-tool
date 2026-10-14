# Mechanism diagrams for every node family (Beyond Data). Shared by the studies page and the Guide tab.
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
            g = f'<g class="ctag{" on" if on else ""}" data-q="{t["q"]}">'
            if t['side'] != 'badge':
                g += f'<polyline class="ld" points="{s._route(t["px"], t["py"], t["tx"], t["ty"], t["side"])}" fill="none" stroke="{lc}" stroke-width=".8" stroke-linejoin="round"/><circle class="dot" cx="{t["px"]:.1f}" cy="{t["py"]:.1f}" r="2" fill="{lc}"/>'
            g += f'<circle class="tg" cx="{t["tx"]:.1f}" cy="{t["ty"]:.1f}" r="9" fill="{A if on else BG}" stroke="{A if on else t["col"]}" stroke-width="1.2"/>' + T(t['tx'], t['ty'] + 3.8, str(t['n']), BG if on else FG, 10.5, 'middle', 600)
            out.append(g + '</g>')
        defs = (f'<defs><marker id="ar" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="{MU}"/></marker>'
                f'<marker id="arW" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="{GC["water"]}"/></marker>'
                f'<pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V5" stroke="{L2}" stroke-width="1"/></pattern></defs>')
        return f'<svg viewBox="0 0 {s.W} {s.H}" role="img" aria-label="{E(label)}" style="width:100%;height:auto;display:block;font-family:Open Sans,system-ui,sans-serif">{defs}{"".join(s.p)}{"".join(out)}</svg>'
    def key(s, sel):
        li = ''.join(f'<li class="{"on" if q == sel else ""}" data-q="{q}"><span class="n">{n}</span>{E(NODE[q]["name"])} <em>{E(NODE[q].get("unit") or "")}</em></li>' for n, q in s.calls)
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
    whatif(F, [('City wastewater', 'place', ['reclaimed_makeup']), ('Neighbours\' greywater', 'place', ['greywater_neighbours']), ('Treatment on site', 'technology', ['treatment_energy']), ('Recover blowdown', 'technology', ['blowdown_recovery'])], sel, c)
    return F, '2D flow diagram', 'Water comes in from three sources and leaves two ways; the water used to make the electricity is counted upstream. Underneath, what could be added.'

# ---------- 4. What the heat becomes (3D neighbourhood) ----------
def d_heat_use(sel):
    F = Fig(640, 540); P = AX(320, 80, 1.4); H = GC['heat']; c = fcol('heat_use')
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
    F.tag(*P(cx + 10, cy + 32, 0), 'R', 'linear_heat_density', sel, c)
    F.tag(*P(73, 125, 12), 'L', 'receiver_demand', sel, c)
    F.tag(*P(169, 125, 14), 'L', 'homes_heated', sel, c)
    F.tag(*P(225, 70, 8), 'R', 'greenhouse_area', sel, c)
    F.tag(*P(169, 21, 14), 'R', 'receiver_temp', sel, c)
    F.tag(*P(30, 30, 0), 'L', 'heat_density', sel, c)
    F.tag(*P(52 + 21, 104 + 21, 30), 'L', 'receivers', sel, c)
    head(F, 20, 404, 'other uses for the heat')
    for i, (q, tt) in enumerate([('aquaculture_tonnes', 'Fish farming'), ('algae_kg', 'Algae'), ('insect_check', 'Insect rearing'), ('distributed_servers_homes', 'Servers in homes')]):
        x = 20 + i * 152; panel(F, x, 414, 140, 40, tt); F.badge(x + 140, 414, q, sel, c)
    panel(F, 20, 470, 292, 52, 'Seasonal heat store', 'summer heat kept for winter'); F.badge(312, 470, 'stored_heat', sel, c)
    F.add(f'<rect x="328" y="470" width="292" height="52" rx="4" fill="{PN}" stroke="{FG}"/>' + T(340, 490, 'Hourly demand', FG, 12, w=400))
    F.add(f'<polyline points="470,512 490,500 510,486 530,494 550,482 570,498 590,506 606,510" fill="none" stroke="{H}"/>')
    F.badge(620, 470, 'demand_profile', sel, c)
    F.H = 532
    whatif(F, [('Seasonal ground store', 'opportunity', ['btes']), ('Hot or chilled water tank', 'opportunity', ['tes_volume']), ('Cooling for neighbours', 'opportunity', ['absorption'])], sel, c)
    return F, '3D neighbourhood', 'Within a search radius, the pipe reaches the buildings that can take the heat; a greenhouse is one possible receiver, and the heat could also serve other uses or be stored for winter.'


# ====================== remaining families ======================

KINDLAB = {'opportunity': 'gives the place', 'place': 'the place gives', 'technology': 'its own choice'}
def whatif(F, items, sel, c, y=None, x0=20, x1=620):
    """A strip of "what if we added…" panels under a mechanism diagram; numbers as badges on each panel."""
    y = F.H + 8 if y is None else y
    head(F, x0, y + 14, 'what if we added…')
    n = len(items); gap = 12; w = (x1 - x0 - gap * (n - 1)) / n; top = y + 24
    for i, (title, kind, qs) in enumerate(items):
        x = x0 + i * (w + gap)
        F.add(f'<rect x="{x:.1f}" y="{top}" width="{w:.1f}" height="46" rx="4" fill="{PN}" stroke="{FG}" stroke-dasharray="5 3"/>' + T(x + 10, top + 20, title, FG, 11.5, w=400) + T(x + 10, top + 36, KINDLAB[kind], MU, 10))
        for k, q in enumerate(qs):
            F.badge(x + w - k * 21, top, q, sel, c)
    F.H = top + 60

def panel(F, x, y, w, h, t, sub='', st=FG, sz=12):
    F.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" fill="{PN}" stroke="{st}"/>' + T(x + 12, y + (20 if sub else h / 2 + 4), t, FG, sz, w=400) + (T(x + 12, y + 36, sub, MU, 10.5) if sub else ''))
def arrow(F, d, col=MU, w=1.2, dash=''):
    F.add(f'<path d="{d}" fill="none" stroke="{col}" stroke-width="{w}" {"stroke-dasharray=%s" % chr(34)+dash+chr(34) if dash else ""} marker-end="url(#ar)"/>')
def head(F, x, y, t): F.add(T(x, y, t.upper(), MU, 10.5, w=600, extra='letter-spacing="1.5"'))

def d_sink(sel):
    F = Fig(640, 330); c = fcol('sink'); G = 140
    F.add(f'<rect x="30" y="{G-96}" width="140" height="96" fill="{PN}" stroke="{FG}"/>' + T(100, G - 44, 'data centre', FA, 11, 'middle'))
    F.add(f'<path d="M20 {G} H460 V{G+30} M460 {G+30} H620" fill="none" stroke="{FG}" stroke-width="1.2"/>')
    F.add(f'<rect x="20" y="{G}" width="440" height="160" fill="url(#hatch)" opacity=".6"/>')
    F.add(T(240, G - 8, 'street', FA, 11, 'middle'))
    F.add(f'<path d="M460 {G+22} q14 -8 28 0 t28 0 t28 0 t28 0 t28 0 t28 0" fill="none" stroke="{GC["water"]}" stroke-width="1.2"/>' + T(540, G - 6, 'sea or river', FA, 11, 'middle'))
    F.add(f'<rect x="460" y="{G+30}" width="160" height="130" fill="{GC["water"]}" fill-opacity=".06"/>')
    F.add(f'<circle cx="320" cy="{G+90}" r="28" fill="{BG}" stroke="{FG}" stroke-width="1.3"/><circle cx="320" cy="{G+90}" r="3" fill="{MU}"/>' + T(320, G + 136, 'sewer main (flow out of the page)', MU, 10.5, 'middle'))
    F.add(f'<rect x="200" y="{G+70}" width="56" height="40" rx="3" fill="{PN}" stroke="{FG}"/>' + T(228, G + 94, 'exchanger', MU, 10, 'middle'))
    F.add(f'<path d="M150 {G} V{G+90} H200 M256 {G+90} H292" fill="none" stroke="{GC["heat"]}" stroke-width="2"/>')
    F.add(f'<path d="M120 {G} V{G+40} H500 V{G+60}" fill="none" stroke="{GC["water"]}" stroke-width="1.6" stroke-dasharray="6 4"/>' + T(380, G + 34, 'intake pipe', MU, 10.5, 'middle'))
    F.tag(320, G + 62, 'T', 'sewer_flow', sel, c)
    F.badge(256, G + 70, 'sewer_sink', sel, c)
    F.tag(348, G + 90, 'R', 'sewage_heat', sel, c)
    F.tag(560, G + 80, 'R', 'surface_water_sink', sel, c)
    return F, '2D street section', 'Under the street, a sewer main can take heat from the data centre or give it back; at the water\'s edge, sea or river water can do the same through an intake.'

def d_power(sel):
    F = Fig(640, 400); c = fcol('power'); P_ = GC['power']
    head(F, 20, 28, 'grid and price'); head(F, 290, 28, 'at the data centre'); head(F, 440, 28, 'on and around the site')
    F.add(f'<path d="M40 150 L52 60 L64 150 M44 120 H60 M47 92 H57 M38 68 H66" fill="none" stroke="{FG}"/>' + T(52, 166, 'grid', MU, 10.5, 'middle'))
    panel(F, 100, 92, 130, 50, 'Substation', 'headroom')
    F.add(f'<path d="M64 117 H100" stroke="{P_}" stroke-width="1.6"/><path d="M230 117 H290" stroke="{P_}" stroke-width="1.6"/>')
    panel(F, 20, 210, 210, 48, 'Price of power', 'at the site, per tariff')
    panel(F, 20, 274, 210, 48, 'Long-run marginal cost', 'what new supply costs the utility')
    # column
    x0, w = 290, 90
    F.add(f'<rect x="{x0}" y="50" width="{w}" height="40" fill="none" stroke="{MU}" stroke-dasharray="4 3"/>' + T(x0 + w / 2, 74, 'reserved, unused', MU, 10.5, 'middle'))
    F.add(f'<rect x="{x0}" y="90" width="{w}" height="34" fill="{PN}" stroke="{FG}"/>' + T(x0 + w / 2, 111, 'cooling, losses', MU, 10.5, 'middle'))
    F.add(f'<rect x="{x0}" y="124" width="{w}" height="96" fill="#24272b" stroke="{FG}"/>' + T(x0 + w / 2, 160, 'IT load', FG, 12, 'middle', 400))
    F.add(f'<rect x="{x0}" y="196" width="{w}" height="24" fill="url(#hatch)" stroke="{FG}"/>')
    for yy in (172, 182, 190): F.add(f'<path d="M{x0+w-14} {yy} H{x0+w}" stroke="{P_}" stroke-width="1.6"/>')
    F.add(f'<polyline points="{x0},{262} {x0+15},{250} {x0+30},{256} {x0+45},{244} {x0+60},{252} {x0+75},{246} {x0+90},{254}" fill="none" stroke="{P_}"/><path d="M{x0} 270 H{x0+w}" stroke="{L2}"/>' + T(x0 + w / 2, 286, 'load over a day', MU, 10, 'middle'))
    panel(F, x0 - 5, 310, w + 10, 44, 'Generators', 'backup')
    F.add(f'<path d="M{x0+w/2} 300 V310" stroke="{FG}"/>')
    for i, (tt, sub) in enumerate([('Solar on roofs nearby', 'what the place can generate'), ('Rules for generating', 'beside the data centre'), ('EV charging', 'stalls and the space they take'), ('Networks and customers', 'distance and delay')]):
        y = 50 + i * 78; panel(F, 450, y, 170, 48, tt, sub)
    F.add(f'<path d="M444 74 V308" stroke="{L2}" stroke-dasharray="3 4"/>')
    F.badge(230, 92, 'grid_headroom', sel, c); F.badge(230, 142, 'lead_time', sel, c)
    F.badge(230, 210, 'electricity_price', sel, c); F.badge(230, 274, 'lrmc_bc', sel, c)
    F.badge(x0, 50, 'spare_capacity', sel, c); F.at(x0 + w - 8, 64, 414, 64, 'reserved_cost', sel, c)
    F.badge(x0, 90, 'pue', sel, c)
    F.at(x0 + w - 8, 140, 414, 140, 'it_load_actual', sel, c); F.at(x0 + w - 7, 172, 414, 166, 'it_load_outside', sel, c); F.at(x0 + w - 7, 190, 414, 192, 'it_load_claim', sel, c)
    F.at(x0 + w - 8, 214, 414, 218, 'flexible_load', sel, c); F.at(x0 + w, 254, 414, 254, 'load_factor', sel, c)
    F.badge(x0 + w + 5, 310, 'backup_hours', sel, c)
    F.badge(620, 50, 'rooftop_solar', sel, c); F.badge(620, 128, 'self_gen_rules', sel, c)
    F.badge(598, 206, 'ev_stalls', sel, c); F.badge(620, 206, 'ev_area', sel, c); F.badge(620, 284, 'interconnection', sel, c)
    whatif(F, [('Solar on the roof', 'technology', ['pv_roof', 'pv_share', 'pv_cost']), ('Solar on the facade', 'technology', ['pv_facade']), ('Battery for the grid', 'opportunity', ['battery', 'peak_relief']), ('UPS to the grid', 'opportunity', ['ups_flex'])], sel, c)
    return F, '2D one-line and stacked column', 'Power comes from the grid through a substation; at the data centre it splits into IT load, cooling and losses, and capacity held in reserve; around the site sit solar, generation rules, EV charging and the networks it serves.'

def d_seen(sel):
    F = Fig(640, 380); P = AX(250, 120, 2.7); c = fcol('seen')
    F.add(f'<polygon points="{pts(P, [(-12,-10,0),(96,-10,0),(96,70,0),(-12,70,0)])}" fill="none" stroke="{LN}"/>')
    F.add(f'<polygon points="{pts(P, [(0,28,0),(36,28,0),(48,62,0),(12,62,0)])}" fill="{MU}" fill-opacity=".12" stroke="none"/>')
    F.add(f'<polygon points="{pts(P, [(0,28,0),(36,28,0),(36,32,0),(0,32,0)])}" fill="url(#hatch)" stroke="{MU}" stroke-dasharray="3 3"/>')
    F.add(box(P, 14, 40, 0, 18, 16, 8, MU, PN, .9))
    F.add(box(P, 0, 0, 0, 36, 28, 30, FG, PN, 1.1))
    for zz in (8, 16, 24): F.add(f'<polyline points="{pts(P, [(36,4,zz),(36,24,zz)])}" fill="none" stroke="{L2}"/>')
    F.add(box(P, 60, 2, 0, 20, 20, 18, MU, PN, .9))
    wx = [(60, 8, 10), (60, 14, 10), (60, 14, 14), (60, 8, 14)]
    F.add(f'<polygon points="{pts(P, wx)}" fill="{BG}" stroke="{FG}"/>')
    lx, ly = P(36, 12, 22)
    F.add(f'<circle cx="{lx:.1f}" cy="{ly:.1f}" r="3" fill="{FG}"/>')
    for tgt in [(60, 8, 12), (60, 14, 12)]:
        F.add(f'<polyline points="{pts(P, [(36,12,22), tgt])}" fill="none" stroke="#d9cf9a" stroke-width=".9" stroke-dasharray="4 3"/>')
    fx, fy = P(50, 50, 0); F.add(f'<path d="M{fx:.1f},{fy:.1f} v-14 m-4,4 h8 m-4,-4 v-3" stroke="{FG}" stroke-width="1.3" fill="none"/><circle cx="{fx:.1f}" cy="{fy-20:.1f}" r="2.6" fill="none" stroke="{FG}" stroke-width="1.2"/>')
    for tgt in [(36, 28, 30), (36, 0, 30), (36, 28, 0)]:
        F.add(f'<polyline points="{fx:.1f},{fy-18:.1f} {pts(P, [tgt])}" fill="none" stroke="{L2}" stroke-dasharray="2 3"/>')
    F.tag(lx, ly, 'T', 'lighting_plan', sel, c)
    F.tag(*P(60, 11, 12), 'R', 'light_at_window', sel, c)
    F.tag(*P(30, 52, 0), 'B', 'shadow', sel, c)
    F.tag(fx, fy - 20, 'R', 'visibility', sel, c)
    F.tag(*P(4, 30, 0), 'L', 'watched_area', sel, c)
    return F, '3D street view', 'What the building does to the street: light reaching a neighbour\'s window, the shadow it casts, what a passer-by sees, and the strip along the lot line that feels watched.'

def d_carbon(sel):
    F = Fig(640, 340); c = fcol('carbon'); base = 270
    F.add(f'<path d="M60 {base} H600" stroke="{FG}"/>' + T(60, 30, 'tonnes CO₂e — proportions illustrative', MU, 10.5))
    segs = [('grid_co2', 'grid electricity', 110), ('embodied_it', 'IT, made and replaced', 50), ('refrigerant_co2e', 'refrigerant leaks', 26), ('generator_co2', 'generator testing', 24)]
    y = base
    for q, lab, h in segs:
        y -= h; F.add(f'<rect x="110" y="{y}" width="110" height="{h}" fill="{PN}" stroke="{FG}"/>' + T(238, y + h / 2 + 4, lab, MU, 11)); F.badge(220, y, q, sel, c)
    F.add(T(165, base + 20, 'each year in operation', FG, 11.5, 'middle', 400))
    F.add(f'<rect x="380" y="{base-150}" width="110" height="150" fill="{PN}" stroke="{FG}"/>' + T(435, base + 20, 'once, to build', FG, 11.5, 'middle', 400) + T(435, base - 70, 'building', MU, 11, 'middle'))
    F.badge(490, base - 150, 'embodied_building', sel, c)
    F.add(f'<rect x="530" y="{base-30}" width="60" height="30" fill="url(#hatch)" stroke="{FG}"/>' + T(560, base + 20, 'air, not carbon', FG, 11.5, 'middle', 400) + T(560, base + 36, 'NOx and particles', MU, 10.5, 'middle'))
    F.badge(590, base - 30, 'generator_nox_pm', sel, c)
    whatif(F, [('Count generator testing', 'technology', ['genset_test']), ('Renewable diesel', 'technology', ['hvo_swap'])], sel, c)
    return F, '2D stacked columns', 'The yearly carbon of running the data centre, the one-off carbon of building it, and the air pollution from generators kept apart because it is not carbon.'

def d_materials(sel):
    F = Fig(640, 300); c = fcol('materials')
    F.add(f'<rect x="60" y="40" width="90" height="220" fill="{PN}" stroke="{FG}"/>' + T(105, 280, 'a rack', MU, 11, 'middle'))
    for i in range(10): F.add(f'<rect x="68" y="{50+i*20}" width="74" height="14" fill="{BG}" stroke="{L2}"/>')
    panel(F, 250, 40, 180, 48, 'Cables and busbars', 'copper, kept for decades')
    panel(F, 250, 126, 180, 48, 'Drives', 'magnets with rare earths')
    panel(F, 250, 212, 180, 48, 'Servers at each refresh', 'about every six years')
    panel(F, 480, 212, 140, 48, 'E-waste', 'or reuse')
    for y in (64, 150, 236): F.add(f'<path d="M150 {y} H248" stroke="{L2}" stroke-dasharray="3 3"/>')
    arrow(F, 'M430 236 H478')
    F.badge(430, 40, 'copper_tonnes', sel, c); F.badge(430, 126, 'rare_earth', sel, c); F.badge(620, 212, 'ewaste', sel, c)
    return F, '2D exploded inventory', 'What the hardware is made of and where it goes: copper that stays, drives with rare earths, and servers that leave as e-waste at each refresh.'

def d_space(sel):
    F = Fig(640, 400); P = AX(320, 140, 2.4); c = fcol('space')
    cx, cy, R = 26, 20, 70
    circ = [(cx + R * math.cos(k * math.pi / 36), cy + R * math.sin(k * math.pi / 36), 0) for k in range(73)]
    F.add(f'<polygon points="{pts(P, circ)}" fill="none" stroke="{L2}" stroke-dasharray="6 5"/>')
    F.add(f'<polygon points="{pts(P, [(-4,-4,0),(56,-4,0),(56,44,0),(-4,44,0)])}" fill="none" stroke="{FG}" stroke-dasharray="7 4"/>')
    F.add(box(P, 34, 30, 0, 14, 12, 10, MU, PN, .9))
    F.add(box(P, 0, 0, 0, 30, 26, 6, PLACE, PN, 1.2))
    F.add(box(P, 0, 0, 6, 30, 26, 6, FG, '#24272b', 1.1))
    for k in (12, 18): F.add(box(P, 0, 0, k, 30, 26, 6, FG, PN, 1))
    F.add(box(P, 18, 18, 0, 10, 8, 4, FG, BG, .8))
    F.add(f'<polygon points="{pts(P, [(36,0,0),(54,0,0),(54,22,0),(36,22,0)])}" fill="none" stroke="{MU}" stroke-dasharray="3 3"/><polyline points="{pts(P, [(54,0,0),(54,0,12),(36,0,12),(36,0,0)])}" fill="none" stroke="{MU}" stroke-dasharray="3 3"/><polyline points="{pts(P, [(54,0,12),(54,22,12),(54,22,0)])}" fill="none" stroke="{MU}" stroke-dasharray="3 3"/>')
    F.tag(*P(cx + R * .71, cy - R * .71, 0), 'R', 'area', sel, c)
    F.tag(*P(56, 44, 0), 'R', 'parcel', sel, c)
    F.tag(*P(0, 0, 24), 'L', 'massing', sel, c)
    F.tag(*P(15, 26, 24), 'T', 'plot_ratio', sel, c)
    F.tag(*P(0, 13, 15), 'L', 'floor_area', sel, c)
    F.tag(*P(0, 20, 9), 'L', 'server_floor', sel, c)
    F.tag(*P(0, 22, 3), 'L', 'offerable_area', sel, c)
    F.tag(*P(23, 26, 2), 'B', 'clean_air_volume', sel, c)
    F.tag(*P(45, 0, 12), 'R', 'existing_building', sel, c)
    F.tag(*P(48, 36, 5), 'R', 'storage_footprint', sel, c)
    return F, '3D massing', 'The parcel and the area around it, the building as floors (server floors, a ground floor that could be offered), an existing building that could be converted, and room for heat storage.'

def d_it(sel):
    F = Fig(640, 360); P = AX(300, 110, 3.6); c = fcol('it')
    x, y, w, d, h = 0, 0, 44, 30, 12
    F.add(f'<polygon points="{pts(P, [(x,y,0),(x+w,y,0),(x+w,y,h),(x,y,h)])}" fill="{PN}" stroke="{FG}"/><polygon points="{pts(P, [(x,y,0),(x,y+d,0),(x,y+d,h),(x,y,h)])}" fill="{PN}" stroke="{FG}"/><polygon points="{pts(P, [(x,y,0),(x+w,y,0),(x+w,y+d,0),(x,y+d,0)])}" fill="#1b1d20" stroke="{L2}"/>')
    for r in range(3):
        for k in range(5): F.add(box(P, 8 + k * 6, 5 + r * 8, 0, 5, 3, 7, MU, PN, .7))
    for r in range(3): F.add(f'<polyline points="{pts(P, [(8, 9.5+r*8, 7.5),(38, 9.5+r*8, 7.5)])}" fill="none" stroke="{GC["heat"]}" stroke-width="1.4"/>')
    for k in range(3): F.add(box(P, 40, 5 + k * 8, 0, 3, 5, 8, FG, PN, .9))
    F.add(f'<polyline points="{pts(P, [(x,y+d,h),(x+w,y+d,h),(x+w,y,h),(x,y,h),(x,y+d,h)])}" fill="none" stroke="{FG}"/><polyline points="{pts(P, [(x,y+d,0),(x,y+d,h)])}" fill="none" stroke="{FG}"/><polyline points="{pts(P, [(x,y+d,0),(x+w,y+d,0),(x+w,y,0)])}" fill="none" stroke="{FG}" stroke-width=".6" stroke-dasharray="2 3"/>')
    F.add(box(P, 6, 4, h, 10, 6, 3, FG, PN)); F.add(box(P, 20, 4, h, 10, 6, 3, FG, PN)); F.add(box(P, 34, 4, h, 8, 6, 3, MU, 'none', .9, '4 3'))
    F.tag(*P(20, 21, 7), 'L', 'servers', sel, c)
    F.tag(*P(41.5, 13, 8), 'R', 'cooling_type', sel, c)
    F.tag(*P(11, 7, h + 3), 'T', 'plant_schedule', sel, c)
    F.tag(*P(38, 7, h + 3), 'R', 'spare_cooling', sel, c)
    return F, '3D cutaway', 'Inside the hall: rows of racks, the cooling that serves them (here a liquid loop to units along the wall), the plant on the roof, and a spare unit held in reserve.'

def d_money(sel):
    F = Fig(640, 400); c = fcol('money')
    head(F, 20, 28, 'price of heat'); head(F, 360, 28, 'costs and shares')
    F.add(f'<path d="M70 50 V230 H320" fill="none" stroke="{FG}"/>' + T(64, 56, '$/MWh', MU, 10.5, 'end'))
    F.add(f'<rect x="70" y="100" width="250" height="56" fill="{GC["heat"]}" fill-opacity=".1"/>')
    F.add(f'<path d="M70 100 H320" stroke="{FG}" stroke-dasharray="6 4"/><path d="M70 156 H320" stroke="{FG}" stroke-dasharray="2 3"/>')
    F.add(T(316, 94, 'the most a buyer would pay', MU, 10.5, 'end') + T(316, 172, 'the least the operator would take', MU, 10.5, 'end') + T(310, 146, 'window where a deal works', FG, 11, 'end', 400))
    F.add(f'<circle cx="150" cy="124" r="4" fill="{FG}"/>' + T(158, 120, 'cost of the heat', MU, 10.5))
    F.add(f'<rect x="70" y="270" width="120" height="24" fill="{PN}" stroke="{FG}"/><rect x="190" y="270" width="80" height="24" fill="#24272b" stroke="{FG}"/><rect x="270" y="270" width="50" height="24" fill="url(#hatch)" stroke="{FG}"/>' + T(70, 262, 'who pays which part', FG, 11.5, w=400) + T(130, 312, 'operator', MU, 10.5, 'middle') + T(230, 312, 'utility', MU, 10.5, 'middle') + T(295, 312, 'city', MU, 10.5, 'middle'))
    F.add(f'<path d="M70 350 H320" stroke="{L2}"/><path d="M70 344 V356 M250 344 V356" stroke="{FG}"/>' + T(70, 340, 'payback', FG, 11.5, w=400) + T(250, 372, 'paid back', MU, 10.5, 'middle'))
    boxes = [('build_cost', 'Building the data centre'), ('distribution_cost', 'Pipes to the neighbours'), ('row_cost', 'Using the street'), ('crf', 'Cost of borrowing'), ('affordability', 'Heat bill vs income'), ('cfd_score', 'Incentive scoring')]
    for i, (q, tt) in enumerate(boxes):
        y = 44 + i * 56; panel(F, 380, y, 230, 42, tt); F.badge(610, y, q, sel, c)
    F.at(300, 100, 340, 76, 'price_ceiling', sel, c)
    F.at(300, 156, 340, 196, 'price_floor', sel, c)
    F.at(250, 128, 340, 136, 'window', sel, c)
    F.at(150, 124, 120, 196, 'lcoh', sel, c)
    F.badge(320, 270, 'capex_split', sel, c)
    F.at(250, 350, 344, 350, 'payback', sel, c)
    return F, '2D price window and cost bars', 'Heat changes hands only where the most a buyer would pay sits above the least the operator would take; underneath, who pays for what and how long it takes to pay back.'

def d_rules(sel):
    F = Fig(640, 340); c = fcol('rules')
    panel(F, 20, 60, 160, 50, 'Zoning check', 'allowed · conditional · no')
    panel(F, 240, 30, 160, 50, 'Permits', 'development, building')
    panel(F, 240, 130, 160, 50, 'Rezoning', 'months and fees')
    panel(F, 460, 130, 160, 50, 'Consultation', 'and rights that apply')
    arrow(F, 'M180 75 H210 V55 H238'); arrow(F, 'M180 95 H210 V155 H238'); arrow(F, 'M400 155 H458'); arrow(F, 'M540 130 V55 H402')
    F.add(T(214, 46, 'allowed', MU, 10.5) + T(214, 196, 'not allowed', MU, 10.5) + T(546, 100, 'approved', MU, 10.5))
    head(F, 20, 238, 'other rules on the way')
    panel(F, 20, 254, 180, 50, 'Crossing a street', 'or rail, for the pipe'); panel(F, 230, 254, 180, 50, 'Standoff zones', 'from hazards and lines'); panel(F, 440, 254, 180, 50, 'EV charging', 'who may sell power')
    F.badge(180, 60, 'zoning_status', sel, c); F.badge(400, 130, 'rezoning_price', sel, c); F.badge(620, 130, 'consultation', sel, c)
    F.badge(200, 254, 'crossing_type', sel, c); F.badge(410, 254, 'standoff', sel, c); F.badge(620, 254, 'ev_exemption', sel, c)
    return F, '2D process', 'The path through the rules: whether the zoning allows a data centre, and if not, the rezoning and consultation it takes; underneath, other rules met along the way.'

def d_people(sel):
    F = Fig(640, 360); c = fcol('people'); cx, cy = 260, 180
    F.add(f'<path d="M110 60 L230 50 L250 130 L120 150 Z" fill="url(#hatch)" stroke="{MU}" stroke-dasharray="3 3"/>')
    for r in (70, 130): F.add(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{L2}" stroke-dasharray="6 5"/>')
    import random; rnd = random.Random(4)
    for _ in range(70):
        a = rnd.random() * 6.283; r = 30 + rnd.random() * 120; F.add(f'<circle cx="{cx+r*math.cos(a):.0f}" cy="{cy+r*math.sin(a)*.95:.0f}" r="2" fill="{MU}"/>')
    F.add(f'<rect x="{cx-18}" y="{cy-14}" width="36" height="28" fill="{PN}" stroke="{FG}"/>')
    panel(F, 440, 60, 180, 50, 'Work created', 'on site, once running')
    panel(F, 440, 150, 180, 70, 'Rooms open to the public', 'shelter; a cool room in heat')
    F.add(f'<path d="M{cx+18} {cy} H440" stroke="{L2}" stroke-dasharray="3 3"/>')
    F.tag(cx + 92, cy - 92, 'T', 'people_affected', sel, c)
    F.tag(150, 80, 'L', 'deprivation', sel, c)
    F.badge(620, 60, 'jobs', sel, c); F.badge(598, 150, 'refuge_people', sel, c); F.badge(620, 150, 'cooling_centre_people', sel, c)
    return F, '2D plan with rings', 'Who is within reach of the data centre, and how well off their area is; what the building could give people directly: work, shelter, a cool room.'

def d_time(sel):
    F = Fig(640, 300); c = fcol('time'); y0 = 150
    X = lambda yr: 90 + (yr + 3) * 12.5
    F.add(f'<path d="M{X(-3)} {y0} H{X(40)}" stroke="{FG}"/>')
    for yr in range(0, 41, 5): F.add(f'<path d="M{X(yr)} {y0-4} V{y0+4}" stroke="{FG}"/>' + T(X(yr), y0 + 20, str(yr), MU, 10.5, 'middle'))
    F.add(T(X(40), y0 + 38, 'years', MU, 10.5, 'end'))
    F.add(f'<rect x="{X(-3)}" y="{y0-30}" width="{X(0)-X(-3)}" height="18" fill="url(#hatch)" stroke="{FG}"/>' + T(X(-3), y0 - 38, 'build', MU, 10.5))
    rows = [('servers', 6, 92), ('plant', 20, 70), ('shell', 40, 48)]
    for name, step, yy in rows:
        F.add(T(X(-3), yy + 4, name, MU, 10.5))
        F.add(f'<path d="M{X(0)} {yy} H{X(40)}" stroke="{L2}"/>')
        for k in range(step, 41, step): F.add(f'<path d="M{X(k)} {yy-6} V{yy+6}" stroke="{FG}" stroke-width="1.4"/>')
    F.add(f'<path d="M{X(0)} 250 C{X(10)} 246 {X(25)} 232 {X(40)} 210" fill="none" stroke="{FG}"/>' + T(X(0), 270, 'chance the heat deal ends early (illustrative)', MU, 10.5))
    F.badge(X(0), y0 - 30, 'construction_time', sel, c)
    F.tag(X(18), 92, 'R', 'horizons', sel, c)
    F.tag(X(30), 228, 'R', 'risk_term', sel, c)
    F.add(T(X(40), 22, 'horizons from a synthesis note; primary sources to find', FA, 10, 'end'))
    return F, '2D lifecycle', 'How long each layer lasts — servers, plant, the building shell — and how the chance of a heat deal ending changes over the years.'

def d_ground(sel):
    F = Fig(640, 320); c = fcol('ground'); G = 120
    F.add(f'<circle cx="90" cy="56" r="16" fill="none" stroke="{FG}"/>' + ''.join(f'<path d="M{90+24*math.cos(a):.1f} {56+24*math.sin(a):.1f} L{90+30*math.cos(a):.1f} {56+30*math.sin(a):.1f}" stroke="{FG}"/>' for a in [k * math.pi / 4 for k in range(8)]))
    F.add(f'<polyline points="160,80 200,60 240,72 280,40 320,58 360,46 400,70 440,52 480,64" fill="none" stroke="{MU}"/>' + T(320, 100, 'a typical year of weather, hour by hour', MU, 10.5, 'middle'))
    F.add(f'<path d="M20 {G} H620" stroke="{FG}" stroke-width="1.2"/>')
    for k, (yy, tt) in enumerate([(G + 50, 'fill and clay'), (G + 110, 'sand and gravel (aquifer)'), (G + 180, 'bedrock')]):
        F.add(f'<path d="M20 {yy} C200 {yy-6} 420 {yy+6} 620 {yy-2}" fill="none" stroke="{L2}"/>' + T(600, yy - 8, tt, MU, 10.5, 'end'))
    F.add(f'<path d="M20 {G+76} H620" stroke="{GC["water"]}" stroke-dasharray="6 4"/>' + T(26, G + 70, 'water table', MU, 10.5))
    F.add(f'<rect x="306" y="{G}" width="8" height="160" fill="{BG}" stroke="{FG}"/>' + T(322, G + 140, 'well', MU, 10.5))
    F.tag(90, 56, 'L', 'weather', sel, c)
    F.at(310, G + 150, 380, G + 150, 'ground', sel, c)
    whatif(F, [('Borefield as heat sink', 'place', ['borefield', 'ground_warming']), ('Aquifer heat store', 'place', ['ates']), ('Deep geothermal', 'place', ['deep_geo'])], sel, c)
    return F, '2D ground section', 'The climate above (a typical year, hour by hour) and the ground below: layers, the water table, and a well that could use the ground to store or shed heat.'

def d_account(sel):
    F = Fig(640, 300); c = fcol('account')
    x0, y0, cw, rh = 120, 50, 90, 26
    F.add(T(x0, 36, 'option A', FG, 11.5, w=400) + T(x0 + cw, 36, 'option B', FG, 11.5, w=400) + T(x0 + 2 * cw, 36, 'option C', FG, 11.5, w=400))
    rows = ['heat', 'carbon', 'sound', 'water', 'money', 'process']
    for i, r in enumerate(rows):
        y = y0 + i * rh; F.add(T(20, y + 17, r, MU, 11) + ''.join(f'<rect x="{x0+k*cw}" y="{y}" width="{cw-6}" height="{rh-4}" fill="{PN}" stroke="{L2}"/>' for k in range(3)))
    F.add(T(20, y0 + 6 * rh + 22, 'each row in its own unit; no total', FA, 10.5))
    px = 410
    F.add(T(px, 36, 'party', FG, 11.5, w=400) + T(px + 100, 36, 'gains', FG, 11.5, w=400) + T(px + 150, 36, 'gives up', FG, 11.5, w=400))
    for i, r in enumerate(['neighbours', 'operator', 'city', 'climate', '…']):
        y = y0 + i * rh; F.add(T(px, y + 17, r, MU, 11) + f'<rect x="{px+100}" y="{y}" width="44" height="{rh-4}" fill="{PN}" stroke="{L2}"/><rect x="{px+150}" y="{y}" width="44" height="{rh-4}" fill="{PN}" stroke="{L2}"/>')
    F.add(f'<rect x="{x0-4}" y="{y0-4}" width="{3*cw+2}" height="{6*rh+4}" fill="none" stroke="{FG}"/><rect x="{px+96}" y="{y0-4}" width="102" height="{5*rh+4}" fill="none" stroke="{FG}"/>')
    F.badge(x0 + 3 * cw - 2, y0 - 4, 'tradeoffs', sel, c); F.badge(px + 198, y0 - 4, 'ledger', sel, c)
    return F, 'Table', 'One trade-off table per option, rows in their own units and never summed; the ledger reads the same table party by party.'


def d_siting(sel):
    F = Fig(680, 470); c = fcol('siting'); H = GC['heat']; PW = GC['power']; G = 360
    def R(x, y, w, h, st=FG, fill=PN, sw=1.0, dash=''):
        da = f' stroke-dasharray="{dash}"' if dash else ''
        F.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="{st}" stroke-width="{sw}"{da}/>')
    def L(x1, y1, x2, y2, st=FG, sw=1.0, dash=''):
        da = f' stroke-dasharray="{dash}"' if dash else ''
        F.add(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{st}" stroke-width="{sw}"{da}/>')
    # --- left: a new building on a lot (section) ---
    head(F, 40, 58, 'New building on a lot')
    F.add(T(340, 26, 'Start: new or existing?  ·  whole building or part?  ·  which floor?', FG, 11.5, 'middle', 400))
    L(40, G, 330, G, FG, 1.2); L(50, G - 6, 50, G + 6, MU); L(320, G - 6, 320, G + 6, MU)
    F.add(f'<rect x="50" y="{G}" width="270" height="34" fill="url(#hatch)" stroke="none"/>')
    R(72, 150, 228, G - 150, MU, 'none', .9, '6 4')
    L(72, 112, 300, 112, MU, .8, '2 4'); F.add(T(296, 106, 'height at the City\'s discretion', FA, 10, 'end'))
    F.add(T(76, 166, 'envelope', FA, 10))
    R(92, 330, 138, 30, FG, 'url(#hatch)'); F.add(T(161, 349, 'other use · entrances', FG, 10, 'middle'))
    for k in range(3):
        y = 246 + k * 28; R(92, y, 138, 28, FG, PN)
        for j in range(6): R(102 + j * 20, y + 8, 12, 16, MU, 'none', .7)
    R(92, G, 138, 28, FG, '#1b1d20'); F.add(T(161, G + 18, 'plant below grade', FA, 10, 'middle'))
    for x0 in (102, 162):
        R(x0, 232, 50, 14, FG, PN)
        for j in range(3): arrow(F, f'M{x0 + 12 + j * 13},{228} L{x0 + 12 + j * 13},{212}', H, 1.1)
    R(240, 340, 18, 20, PW, PN); F.add(icon('power', 241, 342, .66, PW, 1.2))
    R(262, 336, 22, 24, FG, PN); R(288, 348, 12, 12, FG, PN)
    L(249, 340, 249, 300, PW, 1.2, '3 3'); L(249, 300, 330, 300, PW, 1.2, '3 3'); F.add(T(330, 294, 'utility', FA, 10, 'end'))
    # --- right: part of an existing building (section) ---
    head(F, 390, 58, 'Part of an existing building')
    L(380, G, 650, G, FG, 1.2)
    R(420, 90, 140, G - 90, FG, PN)
    for y in range(120, G, 30): L(420, y, 560, y, L2, .8)
    F.add(T(412, 135, 'homes', FA, 10, 'end')); F.add(T(412, 225, 'offices', FA, 10, 'end'))
    R(470, 76, 40, 14, A2, 'none', 1.1, '4 3'); F.add(T(412, 86, 'roof', FA, 10, 'end'))
    R(420, 180, 80, 30, A2, 'none', 1.3, '4 3'); F.add(T(412, 199, 'upper floor', FA, 10, 'end'))
    R(420, 330, 80, 30, A2, 'none', 1.3, '4 3'); F.add(T(412, 343, 'ground', FA, 10, 'end'))
    R(420, G, 140, 32, FG, '#1b1d20'); R(440, G + 4, 80, 24, A2, 'none', 1.3, '4 3'); F.add(T(412, G + 20, 'basement', FA, 10, 'end'))
    R(530, G + 10, 22, 16, FG, PN)
    L(390, 353, 650, 353, GC['water'], 1.1, '7 4'); F.add(T(646, 346, 'flood level', GC['water'], 10, 'end'))
    for x0 in (436, 470):
        F.add(f'<path d="M{x0},{214} q4,4 0,8 q-4,4 0,8" fill="none" stroke="{MU}" stroke-width=".9"/>')
    # --- callouts ---
    F.badge(122, 22, 'start_case', sel, c)
    F.badge(560, 90, 'host_building', sel, c)
    F.tag(72, 150, 'L', 'zone', sel, c)
    F.tag(72, 205, 'L', 'envelope', sel, c)
    F.tag(92, 260, 'L', 'size_fit', sel, c)
    F.tag(92, 300, 'L', 'hall_area', sel, c)
    F.tag(249, 340, 'B', 'service_class', sel, c)
    F.tag(273, 360, 'B', 'component_space', sel, c)
    F.tag(470, 392, 'B', 'flood_exposure', sel, c)
    F.tag(541, 384, 'B', 'fuel_on_site', sel, c)
    F.tag(470, 222, 'R', 'vibration_rank', sel, c)
    F.tag(500, 196, 'R', 'floor_load_need', sel, c)
    F.tag(620, 353, 'R', 'flood_area', sel, c)
    return F, '2D sections', 'Two starting cases. Left, a new building: the zoning envelope, plant on the roof, in the yard and below grade, the data hall in between, and — in Vancouver — another use at the ground floor. Right, part of an existing building: the same data centre on the roof, an upper floor, the ground floor or the basement, each meeting a different floor load, fuel limit, flood level and set of neighbours.'

DIAGRAMS = {'heat_out': d_heat_out, 'heat_use': d_heat_use, 'sink': d_sink, 'power': d_power, 'water': d_water, 'sound': d_sound,
            'seen': d_seen, 'carbon': d_carbon, 'materials': d_materials, 'space': d_space, 'siting': d_siting, 'it': d_it, 'money': d_money,
            'rules': d_rules, 'people': d_people, 'time': d_time, 'ground': d_ground, 'account': d_account}
