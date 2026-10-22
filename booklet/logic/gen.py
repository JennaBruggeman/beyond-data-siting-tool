#!/usr/bin/env python3
"""Booklet graphics of the logic diagram (J.B., 21 Oct 2026): the 195 parts and 261 links of diagram_data.json, redrawn for print.
Each page is an HTML file with one inline SVG at its print size (CSS px, 96 per inch); render.js prints PDF (vector) and PNG.
Math shown is each part's own 'formula' field, as written in the tool; nothing is invented. Layout is new (stages left to right,
big stages split into sub-columns by their internal order). Paper style follows the site-sheet prototype: warm paper, thin grey lines.
"""
import json, math, os, re, html, collections
H = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(H, 'pages'); os.makedirs(OUT, exist_ok=True)
D = json.load(open(os.path.join(H, '..', '..', 'register', 'diagram_data.json')))
G = {n['id']: n for n in json.load(open(os.path.join(H, '..', '..', 'pitch', 'anim', 'graph.json')))['nodes']}
NODES = D['nodes']; N = {n['id']: n for n in NODES}; EDGES = [(e['from'], e['to']) for e in D['edges'] if e['from'] in N and e['to'] in N]
STAGES = D['stages']; SI = {s['id']: i for i, s in enumerate(STAGES)}
SUB = {'input': 1, 'size': 1, 'place': 1, 'characterise': 3, 'prospect': 1, 'opportunity': 2, 'test': 3, 'decide': 1}
TIER = {i: (G.get(i, {}).get('tier') or 'full') for i in N}
FONT = '''@font-face{font-family:Barlow;font-weight:400;src:url(Barlow-Light.ttf)}@font-face{font-family:Barlow;font-weight:500;src:url(Barlow-SemiBold.ttf)}@font-face{font-family:Barlow;font-weight:450;src:url(Barlow-Regular.ttf)}
@font-face{font-family:Plex;font-weight:400;src:url(../../../pitch/anim/plex-400.woff2)}@font-face{font-family:Plex;font-weight:500;src:url(../../../pitch/anim/plex-500.woff2)}
@font-face{font-family:PlexMono;font-weight:400;src:url(mono-400.woff2)}@font-face{font-family:PlexMono;font-weight:500;src:url(mono-500.woff2)}'''
THEMES = {'white': dict(bg='#ffffff', ink='#1c1c1e', mute='#626264', faint='#a9a9ab', line='#d6d6d8', wire='#b4b4b7', box='#ffffff', boxs='#8b8b8d', code='#8b8b8d', acc='#1c1c1e', acc2='#1c1c1e', heat='#d4202b', bar='#1c1c1e'),
          'paper': dict(bg='#f2efe9', ink='#26251f', mute='#6b675f', faint='#9a958b', line='#b8b2a7', wire='#a59f94', box='#fbfaf7', boxs='#8f8a80', code='#8a857b', acc='#CC746C', acc2='#b85f57', heat='#d4202b', bar='#CC746C'),
          'dark': dict(bg='#1c1c1e', ink='#f0f0f1', mute='#b4b4b7', faint='#7d7d80', line='#3e3e42', wire='#56565a', box='#242427', boxs='#6e6e72', code='#8b8b8d', acc='#e8e6e2', acc2='#e8e6e2', heat='#e5535b', bar='#e8e6e2')}
esc = lambda s: html.escape(str(s), quote=True)

def code_lines(n, width, maxl=6):
    """The part's formula as code: statements split at ';' and ' — ', wrapped to width characters (monospace)."""
    f = (n.get('formula') or '').replace('\n', ' ')
    parts = [p.strip() for p in re.split(r';\s+| — ', f) if p.strip()]
    out = []
    for p in parts:
        words = p.split(' '); cur = ''
        for w in words:
            if len(cur) + len(w) + 1 > width and cur: out.append(cur); cur = '  ' + w
            else: cur = (cur + ' ' + w).strip() if not cur.startswith('  ') else cur + ' ' + w
        if cur: out.append(cur)
    if len(out) > maxl: out = out[:maxl - 1] + [out[maxl - 1][:width - 1] + '…']
    return out

def layout():
    """Columns: stages left to right; big stages split into sub-columns by internal depth. Rows ordered by the mean row of inputs."""
    cols = []; colof = {}
    for s in STAGES:
        sid = s['id']; ids = [n['id'] for n in NODES if n['stage'] == sid]; k = SUB[sid]
        Ein = [(a, b) for a, b in EDGES if a in ids and b in ids]; dep = {i: 0 for i in ids}
        for _ in range(30):
            for a, b in Ein: dep[b] = max(dep[b], dep[a] + 1)
        outd = collections.Counter(a for a, b in Ein)
        order = sorted(ids, key=lambda i: (dep[i], -outd[i])); cap = math.ceil(len(ids) / k)
        for j in range(k):
            c = order[j * cap:(j + 1) * cap]; cols.append(dict(stage=sid, sub=j, ids=c))
            for i in c: colof[i] = len(cols) - 1
    pos = {i: r for c in cols for r, i in enumerate(c['ids'])}
    ins = collections.defaultdict(list); outs = collections.defaultdict(list)
    for a, b in EDGES: ins[b].append(a); outs[a].append(b)
    for it in range(8):
        rng = range(len(cols)) if it % 2 == 0 else range(len(cols) - 1, -1, -1)
        for ci in rng:
            c = cols[ci]; nb = ins if it % 2 == 0 else outs
            def key(i):
                v = [pos[j] / max(1, len(cols[colof[j]]['ids'])) for j in nb[i] if colof[j] != ci]
                return sum(v) / len(v) if v else pos[i] / max(1, len(c['ids']))
            c['ids'].sort(key=key)
            for r, i in enumerate(c['ids']): pos[i] = r
    return cols, colof, pos

COLS, COLOF, POS = layout()

def page(name, w_in, h_in, body, theme='paper'):
    T = THEMES[theme]; W, Hh = w_in * 96, h_in * 96
    code = 'L' + re.match(r'(\d+[a-c]?)', name).group(1).lstrip('0')
    body = body.replace('{NUM}', code).replace('{NUMW}', str(round(len(code) * 21 + 12)))
    body += f'<text x="{W - 48}" y="{Hh - 30}" font-size="8" font-weight="450" fill="{T["faint"]}" text-anchor="end" letter-spacing="2.4">{" ".join(code)}</text>'
    doc = f'''<!doctype html><html><head><meta charset="utf-8"><title>{esc(name)}</title><style>{FONT}
@page{{size:{w_in}in {h_in}in;margin:0}}html,body{{margin:0;background:{T["bg"]}}}svg{{display:block}}
text{{font-family:Barlow,sans-serif}} .m{{font-family:PlexMono,monospace}}</style></head><body>
<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{Hh}" viewBox="0 0 {W} {Hh}"><rect width="{W}" height="{Hh}" fill="{T["bg"]}"/>{body}</svg></body></html>'''
    open(os.path.join(OUT, f'{name}.html'), 'w').write(doc)
    return dict(name=name, w=w_in, h=h_in)

def ring(cx, cy, r, conf, T, sw=1.4, dashed=False):
    if conf is None: return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{T["faint"]}" stroke-width="{sw}" stroke-dasharray="2 2"/>'
    c = 2 * math.pi * r; a = conf / 100 * c
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{T["line"]}" stroke-width="{sw}"/>'
            f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{T["acc"]}" stroke-width="{sw}" stroke-dasharray="{a:.2f} {c:.2f}" transform="rotate(-90 {cx} {cy})"/>')

def diagram(x0, y0, W, Hh, T, hl=None, dim=None, code=True, labels=True, head=True, fs=7.2, cfs=4.6, wire_hl=None, boxw_frac=.72):
    """The whole diagram inside a box. hl: set of ids drawn in the accent; dim: set of ids drawn faint; wire_hl: set of (a, b) in accent."""
    out = []; nC = len(COLS); pitch = W / nC; bw = pitch * boxw_frac; hh = 13 if labels else 6
    top = y0 + (46 if head else 0); maxr = max(len(c['ids']) for c in COLS); rp = (y0 + Hh - top) / maxr
    P = {}
    for ci, c in enumerate(COLS):
        n = len(c['ids']); off = (maxr - n) * rp / 2
        for r, i in enumerate(c['ids']): P[i] = (x0 + ci * pitch, top + off + r * rp)
    if head:
        seen = {}
        for ci, c in enumerate(COLS): seen.setdefault(c['stage'], []).append(ci)
        for k, (sid, cis) in enumerate(seen.items()):
            xa = x0 + cis[0] * pitch; xb = x0 + cis[-1] * pitch + bw
            out.append(f'<text x="{xa}" y="{y0 + 14}" font-size="{fs * 2.2}" font-weight="400" fill="{T["ink"]}">{k + 1}</text>')
            out.append(f'<text x="{xa + fs * 1.9}" y="{y0 + 12}" font-size="{fs * 1.15}" font-weight="500" fill="{T["ink"]}">{esc(STAGES[k]["name"])}</text>')
            out.append(f'<text x="{xa + fs * 1.9}" y="{y0 + 12 + fs * 1.3}" font-size="{fs * .95}" fill="{T["mute"]}">{len([i for i in N if N[i]["stage"] == sid])} parts</text>')
            out.append(f'<line x1="{xa}" y1="{y0 + 30}" x2="{xb}" y2="{y0 + 30}" stroke="{T["line"]}" stroke-width=".8"/>')
    wires = []; hlw = []
    for a, b in EDGES:
        (xa, ya), (xb, yb) = P[a], P[b]; ya += hh / 2; yb += hh / 2
        if xb > xa: sx, ex = xa + bw, xb; mx = (sx + ex) / 2; d = f'M{sx:.1f},{ya:.1f} C{mx:.1f},{ya:.1f} {mx:.1f},{yb:.1f} {ex:.1f},{yb:.1f}'
        else: sx, ex = xa + bw, xb + bw; bx = max(sx, ex) + pitch * .22; d = f'M{sx:.1f},{ya:.1f} C{bx:.1f},{ya:.1f} {bx:.1f},{yb:.1f} {ex:.1f},{yb:.1f}'
        on = wire_hl is not None and (a, b) in wire_hl
        faint = dim is not None and (a in dim or b in dim)
        (hlw if on else wires).append((d, faint))
    for d, faint in wires: out.append(f'<path d="{d}" fill="none" stroke="{T["wire"]}" stroke-width=".45" stroke-opacity="{.18 if faint else .55}"/>')
    for d, _ in hlw: out.append(f'<path d="{d}" fill="none" stroke="{T["acc"]}" stroke-width="1.3"/>')
    cw = int(bw / (cfs * .6)) + 4
    for i, (x, y) in P.items():
        n = N[i]; on = hl is not None and i in hl; faint = dim is not None and i in dim and not on
        op = .22 if faint else 1
        stroke = T['acc'] if on else T['boxs']; sw = 1.2 if on else .55
        out.append(f'<g opacity="{op}"><rect x="{x:.1f}" y="{y:.1f}" width="{bw:.1f}" height="{hh}" rx="2" fill="{T["box"]}" stroke="{stroke}" stroke-width="{sw}"/>')
        if labels:
            mc = int((bw - 6) / (fs * .5)); words = n['name'].split(' '); l1 = ''
            while words and len((l1 + ' ' + words[0]).strip()) <= mc: l1 = (l1 + ' ' + words.pop(0)).strip()
            l2 = ' '.join(words); l2 = l2 if len(l2) <= mc else l2[:mc - 1] + '…'
            if l2:
                out.append(f'<text x="{x + 3:.1f}" y="{y + hh * .45:.1f}" font-size="{fs * .86}" fill="{T["acc2"] if on else T["ink"]}">{esc(l1)}</text><text x="{x + 3:.1f}" y="{y + hh * .45 + fs * .95:.1f}" font-size="{fs * .86}" fill="{T["acc2"] if on else T["ink"]}">{esc(l2)}</text>')
            else: out.append(f'<text x="{x + 3:.1f}" y="{y + hh - 3.6:.1f}" font-size="{fs}" fill="{T["acc2"] if on else T["ink"]}">{esc(l1)}</text>')
        if code:
            ls = [f'f({", ".join(n.get("inputs") or [])})' if n.get('inputs') else f'in: {i}'] + code_lines(n, cw, 2)
            for k, l in enumerate(ls[:3]):
                out.append(f'<text class="m" x="{x + 1:.1f}" y="{y + hh + cfs * 1.25 * (k + 1):.1f}" font-size="{cfs}" fill="{T["code"]}">{esc(l[:cw])}</text>')
        out.append('</g>')
    return '\n'.join(out), P, bw, hh

def header(T, x, y, num, title, sub, meta, w):
    """Booklet header (as S1-S21): number in Light, title in SemiBold, grey subtitle, short black bar; tracked meta top right; page code bottom right."""
    return (f'<text x="{x}" y="{y + 34}" font-size="40" font-weight="400" fill="{T["ink"]}">{{NUM}}</text>'
            f'<g transform="translate({{NUMW}} 0)"><text x="{x}" y="{y + 28}" font-size="24" font-weight="500" fill="{T["ink"]}">{esc(title)}</text>'
            f'<text x="{x}" y="{y + 46}" font-size="12" fill="{T["mute"]}">{esc(sub)}</text>'
            f'<line x1="{x}" y1="{y + 58}" x2="{x + 26}" y2="{y + 58}" stroke="{T["bar"]}" stroke-width="2.6"/></g>'
            f'<text x="{x + w}" y="{y + 12}" font-size="8" font-weight="450" fill="{T["faint"]}" text-anchor="end" letter-spacing="2.4">{esc(meta.upper())}</text>'
            f'<text x="{x + w}" y="{y + 25}" font-size="8" font-weight="450" fill="{T["faint"]}" text-anchor="end" letter-spacing="2.4">DRAFT V1 · 22 OCT 2026</text>')

def card(x, y, w, n, T, cfs=7.4, fs=9.5, maxl=7, show_coef=False):
    """A part as a code card: name, unit, inputs, formula lines, trust ring."""
    o = []; cw = int((w - 8) / (cfs * .6))
    o.append(f'<text x="{x}" y="{y + fs}" font-size="{fs}" font-weight="500" fill="{T["ink"]}">{esc(n["name"])}</text>')
    o.append(ring(x + w - 7, y + fs * .6, 5, n.get('conf'), T, 1.6))
    meta = ' · '.join(z for z in [n.get('unit') or '', f'own {n["conf"]}' if n.get('conf') is not None else '', f'chain {n["upstream"]}' if n.get('upstream') is not None else ''] if z)
    o.append(f'<text class="m" x="{x}" y="{y + fs + cfs * 1.5}" font-size="{cfs * .9}" fill="{T["faint"]}">{esc(n["id"])}{"  [" + esc(meta) + "]" if meta else ""}</text>')
    ls = ([f'← {", ".join(n.get("inputs") or [])}'] if n.get('inputs') else []) + code_lines(n, cw, maxl)
    yy = y + fs + cfs * 3
    for k, l in enumerate(ls):
        col = T['mute'] if l.startswith('←') else T['code'] if l.startswith('  ') else T['ink']
        o.append(f'<text class="m" x="{x}" y="{yy + k * cfs * 1.35:.1f}" font-size="{cfs}" fill="{col}">{esc(l[:cw + 2])}</text>')
    return '\n'.join(o), yy + len(ls) * cfs * 1.35

PAGES = []
def build(theme):
    T = THEMES[theme]; sfx = '' if theme == 'white' else '_' + theme; TH = dict(T, acc=T['heat'], acc2=T['heat'])
    # 1. the spread: the whole diagram, 17 x 11
    W, Hh = 17 * 96, 11 * 96; m = 48
    body, P, bw, hh = diagram(m, m + 70, W - 2 * m, Hh - 2 * m - 96, T)
    body = header(T, m, m - 8, '', 'The logic the tool runs on', '8 stages, 195 parts, 261 links. Each part carries its own formula, in the tool as written here.', 'Beyond Data · logic diagram · diagram_data.json, 21 Oct 2026', W - 2 * m) + body
    body += f'<line x1="{W / 2}" y1="0" x2="{W / 2}" y2="{Hh}" stroke="{T["line"]}" stroke-width=".4" stroke-dasharray="2 4"/>'
    body += f'<text x="{m}" y="{Hh - m + 18}" font-size="7" fill="{T["faint"]}">Boxes: the parts the tool computes. Grey lines: what feeds what. Under each box, in code: its inputs, then its formula. Fold line dashed (centre).</text>'
    PAGES.append(page('01_spread_whole' + sfx, 17, 11, body, theme))
    # 2. the whole on one letter page, landscape layout rotated into portrait: as a full-bleed map without code
    W, Hh = 8.5 * 96, 11 * 96; m = 36
    b, *_ = diagram(m, m + 60, W - 2 * m, Hh - 2 * m - 70, T, code=False, fs=4.4, boxw_frac=.8)
    PAGES.append(page('02_whole_letter' + sfx, 8.5, 11, header(T, m, m - 10, '', 'The whole logic', '195 parts, 261 links', 'Beyond Data · logic diagram', W - 2 * m) + b, theme))
    T0 = T; T = TH
    # 3. follow the heat: the chain as code cards down the page
    CH = ['parcel', 'floor_area', 'server_floor', 'it_load_outside', 'it_load_actual', 'heat_rejected', 'heat_captured', 'heat_delivered', 'homes_heated', 'price_floor', 'window', 'ledger']
    CH = [c for c in CH if c in N]; m = 54; y = m + 80; out = [header(T, m, m - 10, '', 'Follow the heat', 'From a parcel to who gains and who pays: twelve parts, each with its formula', 'Beyond Data · logic diagram · the heat chain', W - 2 * m)]
    colw = (W - 2 * m - 40) / 2; xs = [m + 30, m + 30 + colw + 10]; ys = [y, y]
    for k, i in enumerate(CH):
        c = 0 if k < 6 else 1; x = xs[c]; yy = ys[c]
        out.append(f'<text x="{x - 26}" y="{yy + 10}" font-size="18" fill="{T["acc"]}">{k + 1}</text>')
        s, ye = card(x, yy, colw - 44, N[i], T, cfs=8, fs=11.5, maxl=8)
        out.append(s); ys[c] = ye + 44
        if k not in (5, 11): out.append(f'<line x1="{x - 18}" y1="{yy + 16}" x2="{x - 18}" y2="{ye + 18}" stroke="{T["acc"]}" stroke-width="1"/>')
    out.append(f'<text x="{m}" y="{Hh - m + 10}" font-size="7" fill="{T["faint"]}">Ring: how far the tool trusts the figure on its own (full = arithmetic, three-quarters = a regulation or government data, half = an operator\'s claim). own = the part alone; chain = its weakest input.</text>')
    PAGES.append(page('03_follow_the_heat' + sfx, 8.5, 11, '\n'.join(out), theme))
    # 4. the heat chain highlighted on the whole diagram
    wl = set(zip(CH, CH[1:])) | {(a, b) for a, b in EDGES if a in CH and b in CH}
    b, *_ = diagram(m - 20, m + 60, W - 2 * m + 40, Hh - 2 * m - 70, T, hl=set(CH), dim=set(N) - set(CH), code=False, fs=4.4, wire_hl=wl, boxw_frac=.8)
    PAGES.append(page('04_heat_chain_on_whole' + sfx, 8.5, 11, header(T, m, m - 10, '', 'The heat chain in the whole', 'Twelve of 195 parts, highlighted where they sit', 'Beyond Data · logic diagram', W - 2 * m) + b, theme))
    # 5. anatomy of one part: homes heated
    n = N['homes_heated']; out = [header(T, m, m - 10, '', 'Anatomy of one part', 'Homes heated: what feeds it, how it is worked out, where the numbers come from, how far to trust it', 'Beyond Data · logic diagram · homes_heated', W - 2 * m)]
    cx, cy = W / 2, 330
    feeders = [a for a, b in EDGES if b == 'homes_heated']; users = [b for a, b in EDGES if a == 'homes_heated']
    for k, a in enumerate(feeders):
        yy = 200 + k * 60; out.append(f'<path d="M{m + 150},{yy} C{cx - 120},{yy} {cx - 160},{cy} {cx - 110},{cy}" fill="none" stroke="{T["wire"]}" stroke-width=".8"/>')
        out.append(f'<text x="{m}" y="{yy - 4}" font-size="9" font-weight="500" fill="{T["ink"]}">{esc(N[a]["name"])}</text><text class="m" x="{m}" y="{yy + 8}" font-size="6.5" fill="{T["code"]}">{esc(a)}</text>')
    for k, b in enumerate(users):
        yy = 200 + k * 50; out.append(f'<path d="M{cx + 110},{cy} C{cx + 160},{cy} {W - m - 190},{yy} {W - m - 150},{yy}" fill="none" stroke="{T["wire"]}" stroke-width=".8"/>')
        out.append(f'<text x="{W - m - 145}" y="{yy - 4}" font-size="9" font-weight="500" fill="{T["ink"]}">{esc(N[b]["name"][:30])}</text><text class="m" x="{W - m - 145}" y="{yy + 8}" font-size="6.5" fill="{T["code"]}">{esc(b)}</text>')
    out.append(f'<rect x="{cx - 110}" y="{cy - 22}" width="220" height="44" rx="4" fill="{T["box"]}" stroke="{T["acc"]}" stroke-width="1.4"/><text x="{cx}" y="{cy + 5}" font-size="14" font-weight="500" fill="{T["ink"]}" text-anchor="middle">Homes heated</text>')
    out.append(ring(cx + 140, cy, 18, n['conf'], T, 3.5)); out.append(f'<text x="{cx + 140}" y="{cy + 4}" font-size="10" text-anchor="middle" fill="{T["ink"]}">{n["conf"]}</text>')
    out.append(ring(cx + 190, cy, 18, n['upstream'], T, 3.5)); out.append(f'<text x="{cx + 190}" y="{cy + 4}" font-size="10" text-anchor="middle" fill="{T["acc2"]}">{n["upstream"]}</text>')
    out.append(f'<text x="{cx + 140}" y="{cy + 34}" font-size="6.5" text-anchor="middle" fill="{T["faint"]}">own</text><text x="{cx + 190}" y="{cy + 34}" font-size="6.5" text-anchor="middle" fill="{T["faint"]}">chain</text>')
    yy = 520; out.append(f'<text x="{m}" y="{yy}" font-size="8" fill="{T["faint"]}" letter-spacing="1">FORMULA</text>')
    for k, l in enumerate(code_lines(n, 80, 10)): out.append(f'<text class="m" x="{m}" y="{yy + 18 + k * 13}" font-size="9" fill="{T["ink"]}">{esc(l)}</text>')
    yy += 18 + 13 * len(code_lines(n, 80, 10)) + 24; out.append(f'<text x="{m}" y="{yy}" font-size="8" fill="{T["faint"]}" letter-spacing="1">COEFFICIENTS</text>')
    for k, l in enumerate(code_lines(dict(formula=n.get('coef') or '—'), 92, 14)): out.append(f'<text class="m" x="{m}" y="{yy + 18 + k * 11.5}" font-size="7.6" fill="{T["mute"]}">{esc(l)}</text>')
    yy += 18 + 11.5 * len(code_lines(dict(formula=n.get('coef') or '—'), 92, 14)) + 24; out.append(f'<text x="{m}" y="{yy}" font-size="8" fill="{T["faint"]}" letter-spacing="1">SOURCES</text>')
    for k, sid in enumerate(n.get('sources', [])):
        txt = D['sources'].get(sid, sid).split(' — ')[0]
        for j, l in enumerate(code_lines(dict(formula=txt), 110, 2)): out.append(f'<text x="{m}" y="{yy + 18 + k * 28 + j * 11}" font-size="8" fill="{T["ink"]}">{esc(l)}</text>')
    PAGES.append(page('05_anatomy_homes_heated' + sfx, 8.5, 11, '\n'.join(out), theme))
    T = T0
    # 6. trust field: every part as its ring, by stage; outer = own trust, inner dot size = weakest input
    out = [header(T, m, m - 10, '', 'How far to trust each figure', 'Every part as a ring: the arc is the tool\'s trust in the part alone; the small inner ring, its weakest input', 'Beyond Data · logic diagram · conf, upstream', W - 2 * m)]
    y0 = m + 90; rowh = (Hh - y0 - m - 40) / len(STAGES)
    for k, s in enumerate(STAGES):
        ids = [n['id'] for n in NODES if n['stage'] == s['id']]; yy = y0 + k * rowh
        out.append(f'<text x="{m}" y="{yy + 10}" font-size="9" font-weight="500" fill="{T["ink"]}">{k + 1}  {esc(s["name"])}</text>')
        per = 18; r = 7.5; gx = (W - 2 * m) / per
        for j, i in enumerate(sorted(ids, key=lambda i: -(N[i].get('conf') or 0))):
            cx = m + 10 + (j % per) * gx; cy = yy + 30 + (j // per) * 22
            out.append(ring(cx, cy, r, N[i].get('conf'), T, 2.2)); up = N[i].get('upstream')
            if up is not None: out.append(ring(cx, cy, 3.2, up, T, 1.4))
    out.append(f'<text x="{m}" y="{Hh - m + 10}" font-size="7" fill="{T["faint"]}">Full arc = arithmetic; three-quarters = a regulation or government data; half = an operator\'s claim. Values: diagram_data.json conf and upstream (0–100).</text>')
    PAGES.append(page('06_trust_field' + sfx, 8.5, 11, '\n'.join(out), theme))
    # 7. three levels: the same diagram three times, each lit with the parts that level shows
    LV = [('Everyday', {'resident'}), ('Civic', {'resident', 'community'}), ('Technical', {'resident', 'community', 'full'})]
    out = [header(T, m, m - 10, '', 'Tailored to you', 'The same logic, three ways in: the parts each level shows', 'Beyond Data · logic diagram · templates.json tiers', W - 2 * m)]
    hgt = (Hh - 2 * m - 90) / 3
    for k, (nm, tiers) in enumerate(LV):
        on = {i for i in N if TIER[i] in tiers}; yy = m + 80 + k * hgt
        out.append(f'<text x="{m}" y="{yy + 10}" font-size="11" font-weight="500" fill="{T["ink"]}">{nm}</text><text x="{m + 70}" y="{yy + 10}" font-size="8" fill="{T["mute"]}">{len(on)} parts</text>')
        b, *_ = diagram(m, yy + 18, W - 2 * m, hgt - 30, T, hl=on, dim=set(N) - on, code=False, labels=False, head=False)
        out.append(b)
    PAGES.append(page('07_three_levels' + sfx, 8.5, 11, '\n'.join(out), theme))
    # 8. everything that feeds the ledger (who gains, who pays): the upstream of 'ledger'
    up = {'ledger'}; ch = True
    while ch:
        ch = False
        for a, b in EDGES:
            if b in up and a not in up: up.add(a); ch = True
    wl = {(a, b) for a, b in EDGES if a in up and b in up}
    b, *_ = diagram(m - 20, m + 60, W - 2 * m + 40, Hh - 2 * m - 70, T, hl=up, dim=set(N) - up, code=False, fs=4.4, wire_hl=wl, boxw_frac=.8)
    PAGES.append(page('08_what_feeds_the_ledger' + sfx, 8.5, 11, header(T, m, m - 10, '', 'What feeds who gains, who pays', f'{len(up)} of 195 parts lead into the party ledger', 'Beyond Data · logic diagram · upstream of ledger', W - 2 * m) + b, theme))
    # 14-18. each exchange through the logic: parts whose id or name names it, and their links
    EX = [('heat', '#d4202b', r'heat|cool|cop|borefield|boreh|thermal|sewer'), ('energy', '#d9a000', r'electric|grid|battery|solar|ups|generat|peak|power|tariff|curtail|connection'),
          ('water', '#1f78c7', r'water|evaporat|blowdown|rain|reclaim|storm'), ('materials', '#2e9d4e', r'copper|waste|embodied|rare|refurb|recycl|material'),
          ('people', '#7b3fb4', r'noise|sound|job|work|refuge|people|shadow|light|vibration|shelter|public|neighbour')]
    for k, (ex, colr, rx) in enumerate(EX):
        on = {i for i in N if re.search(rx, i + ' ' + N[i]['name'], re.I)}; T2 = dict(T, acc=colr, acc2=colr)
        wl = {(a, b) for a, b in EDGES if a in on and b in on}
        b, *_ = diagram(m - 20, m + 60, W - 2 * m + 40, Hh - 2 * m - 70, T2, hl=on, dim=set(N) - on, code=False, fs=4.4, wire_hl=wl, boxw_frac=.8)
        PAGES.append(page(f'{14 + k}_exchange_{ex}' + sfx, 8.5, 11, header(T2, m, m - 10, '', f'{ex.capitalize()} through the logic', f'{len(on)} of 195 parts name {ex if ex != "people" else "people and place"}, and the {len(wl)} links between them', 'Beyond Data · logic diagram · keyword selection', W - 2 * m) + b, theme))
    # 9+. stage codex pages: every part of a stage as a code card
    GROUPS = [('09', ['input', 'size'], 'What we start with · How big it can be'), ('10', ['place'], 'What the site offers'), ('11', ['characterise'], 'What it gives off'),
              ('12', ['prospect', 'opportunity'], 'Who is nearby · What it could become'), ('13', ['test', 'decide'], 'What it would take · Who gains, who pays')]
    for num, sids, ttl in GROUPS:
        ids = [n['id'] for c in COLS if c['stage'] in sids for n in [N[i] for i in c['ids']]]
        per_page = 27 if len(ids) <= 30 else 27
        chunks = [ids[i:i + per_page] for i in range(0, len(ids), per_page)]
        for pi, chunk in enumerate(chunks):
            out = [header(T, m, m - 10, '', ttl, f'Every part, its inputs and its formula as written in the tool ({len(ids)} parts' + (f', page {pi + 1} of {len(chunks)})' if len(chunks) > 1 else ')'), 'Beyond Data · logic diagram · ' + ' + '.join(sids), W - 2 * m)]
            ncol = 3; cw_ = (W - 2 * m - 20 * (ncol - 1)) / ncol; ycol = [m + 84] * ncol
            for i in chunk:
                c = ycol.index(min(ycol)); s, ye = card(m + c * (cw_ + 20), ycol[c], cw_, N[i], T, cfs=6.2, fs=8.2, maxl=6); out.append(s); ycol[c] = ye + 14
            PAGES.append(page(f'{num}{chr(97 + pi) if len(chunks) > 1 else ""}_codex_{"_".join(sids)}' + sfx, 8.5, 11, '\n'.join(out), theme))

for th in ['white', 'dark']: build(th)
json.dump(PAGES, open(os.path.join(H, 'pages.json'), 'w'), indent=1); print(len(PAGES), [p['name'] for p in PAGES if not p['name'].endswith(('_dark', '_paper'))])
