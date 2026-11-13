# The frozen Emergency hub boards as tool data (J.B. 12 Nov 2026, option 1: "the tool reads the frozen boards", freeze EH-FREEZE-2026-11-11g).
# Reads each board's own geometry (Claude Link eh/<fit>/geom.py, with its grown.json) and the board's rows (eh/ic45/TestFit_EH_<fit>.dc.html, freeze 11i),
# and writes:
#   tool/data/hub_frozen_van.json  the six Vancouver boards (City of Vancouver open data frame): in git
#   tool/data/hub_frozen_edm.json  the seven Edmonton boards (lot outlines Altalis via EPSB GIS, academic use only): git-ignored
# Board frame: metres, as each geom.py states it (u, v); rects (u0, u1, v0, v1). The tool registers LOTPOLY to its own lot ring at run time.
# Usage: <python> hub_frozen_export.py "<Claude Link>/eh" <tool/data>
import sys, os, json, re, html, importlib.util, hashlib
EH, OUT = sys.argv[1], sys.argv[2]
FREEZE = 'EH-FREEZE-2026-11-11i'   # 13 Nov 2026 (J.B.): 11i, boards Claude Link eh/ic45, is the answer key (339 and 8980 grown; the rest as 11g/11h)
FREEZE_OF = {}
BOARDDIR = {}   # every board from ic45 (11i)
TILE = {'V339': '1_1', 'V1330': '1_1', 'V8238': '1_-3', 'V1353': '2_2', 'V8980': '-1_-4', 'V1360': '2_2', 'E06B': '-1_1', 'E4103': '0_-3', 'E14715': '-2_1',
        'E10003': '0_-2', 'E10004': '-3_-1', 'E15231': '-3_1', 'E16075': '3_3', 'V1425': '2_1', 'E10220': '0_0'}
POINT = {'E10220': (154.0, 822.0)}   # a point inside the lot (tool world metres, from the board frame: x = 154 − U, y = 852 − V); its Altalis lot gives the ids   # the tool tile holding each lot (checks/tests/hub_match.js)
BOARDS = [  # key, folder, board file, parcel id in the tool, address
    ('V339', 'v339', 'V339', '63819485', '339 1st Ave E'), ('V1330', 'v1330', 'V1330', '22260652', '1330 Glen Dr'),
    ('V8238', 'v8238', 'V8238_Outright', '21083038', '8238 Fraser St'), ('V1353', 'v1353', 'V1353', '59223039', '1353 Pender St E'),
    ('V8980', 'v8980', 'V8980', '14984188', '8980 Oak St'), ('V1360', 'v1360', 'V1360', '59423054', '1360 Frances St'),
    ('E06B', 'e06b', 'E06B', '146402', '64 Airport Rd NW'), ('E4103', 'e4103', 'E4103', '904935', '4103 97 St NW'),
    ('E14715', 'e14715', 'E14715', '150388', '14715 Yellowhead Trail NW'), ('E10003', 'e10003', 'E10003', '701026', '10003 63 Avenue NW'),
    ('E10004', 'e10004', 'E10004', '16765', '10004 167 Street NW'), ('E15231', 'e15231', 'E15231', '149677', '15231 118 Avenue NW'),
    ('E16075', 'e16075', 'E16075', '980987', '16075 Fort Road NW'),
    ('V1425', 'v1425', 'V1425', '23060741', '1425 Clark Dr')]   # 11h; 10220 104 Ave NW left out (J.B. 12 Nov: Rogers Place, the board assumes a cleared lot)
# freeze 11g per-board table (FROZEN_EH-FREEZE-2026-11-11g.md with 11f for the boards 11g did not change): MW, data-centre m², stopping rule
MANIFEST = {'V339': (1.98, 2324.5, 'floor cap'), 'V1353': (1.82, 2325, 'floor cap'), 'V8980': (1.55, 1988.6, 'plant yard'),
    'V8238': (0.94, 1688, 'not grown: roof holds only two chillers'), 'V1330': (0.41, 1140, 'not grown: upper floors over the truck drive (frozen failing)'),
    'V1360': (0.37, 1104, 'not grown: only room left is over transformer alcove 2'), 'E10004': (0.31, 805, 'not grown: only room left holds a roof chiller'),
    'E16075': (0.95, 1179, 'plant yard'), 'V1425': (1.82, 2325, 'floor cap'), 'E10220': (1.89, 1798, 'drawn plant (roof chillers)'), 'E15231': (1.20, 1367, 'plant yard, then travel distance'), 'E4103': (1.89, 1798, 'plant yard'),
    'E10003': (1.82, 1752, 'plant yard'), 'E06B': (1.89, 1798, 'drawn plant (roof chillers)'), 'E14715': (1.89, 1798, 'drawn plant (roof chillers)')}

def rows_of(f):
    """the board's check rows as the tool keeps them: [status, title, source, text] (the detail div: text, then '· source · method' in a span)"""
    if not os.path.exists(f): return []
    t = open(f, encoding='utf-8').read(); out = []
    cl = lambda x: re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', x))).strip()
    for m in re.finditer(r'<tr><td[^>]*>([^<]*)</td><td[^>]*><div[^>]*>([\s\S]*?)</div>(?:<div[^>]*>([\s\S]*?)</div>)?</td></tr>', t):
        det = m.group(3) or ''; k = det.find('<span'); txt = cl(det[:k] if k >= 0 else det); src = cl(det[k:]) if k >= 0 else ''
        src = re.sub(r'^·\s*', '', src)
        out.append([cl(m.group(1)), cl(m.group(2)), src, txt])
    return out

def load_geom(folder):
    p = os.path.join(EH, folder, 'geom.py'); cwd = os.getcwd(); os.chdir(os.path.dirname(p)); sys.path.insert(0, os.path.dirname(p)); sys.path.insert(1, EH)
    try:
        spec = importlib.util.spec_from_file_location('geom_' + folder, p); g = importlib.util.module_from_spec(spec); spec.loader.exec_module(g); return g
    finally:
        os.chdir(cwd); sys.path.pop(0); sys.path.pop(0)

import numpy as np
from shapely.geometry import Polygon, Point
def lot_lp(g):
    if getattr(g, 'LOTPOLY', None): return [tuple(p) for p in g.LOTPOLY]
    L = g.LOT; return [(L[0], L[2]), (L[1], L[2]), (L[1], L[3]), (L[0], L[3])]
IDS = {}
def tool_ring(city, key, pid):
    Q = json.load(open(os.path.join(OUT, '..', 'tiles', city, 'meta.json'), encoding='utf-8'))['Q']
    t = json.load(open(os.path.join(OUT, '..', 'tiles', city, 't_' + TILE[key] + '.json'), encoding='utf-8')); ox, oy = t['o']
    a = next((a for i_, a in t.get('P', []) if str(i_) == pid), None)
    if a is None and city == 'edm':   # Edmonton lots: the Altalis outlines (l_ tiles, academic use), the lot whose account ids hold the board's id
        l = json.load(open(os.path.join(OUT, '..', 'tiles', city, 'l_' + TILE[key] + '.json'), encoding='utf-8')); ox, oy = l['o']
        if pid is None and key in POINT:   # 11h: no id known; the lot that holds the point, and all its ids
            px, py = POINT[key]
            for a0, ids in l['L']:
                xx = yy = 0; rr = []
                for i in range(0, len(a0), 2): xx += a0[i]; yy += a0[i + 1]; rr.append((ox + xx / Q, oy + yy / Q))
                if Polygon(rr).contains(Point(px, py)): IDS[key] = [str(i) for i in ids]; return rr
            return None
        a = next((a for a, ids in l['L'] if pid in [str(i) for i in ids]), None)
    if a is None: return None
    x = y = 0; out = []
    for i in range(0, len(a), 2): x += a[i]; y += a[i + 1]; out.append((ox + x / Q, oy + y / Q))   # the tool's decodeRing (index.html)
    return out
def register(lp, ring):
    """board frame -> tool world: x = s * R(th) * F(m) * u + t (F mirrors v when m); ICP from 8 starts, board edges sampled every 0.5 m to the tool ring's boundary"""
    B = Polygon(lp).exterior; pts = np.array([B.interpolate(d).coords[0] for d in np.arange(0, B.length, 0.5)])
    T = Polygon(ring); Tb = T.exterior; tc = np.array(T.centroid.coords[0]); bc = pts.mean(0); best = None
    for m in (False, True):
        P0 = pts * ([1, -1] if m else [1, 1]); c0 = P0.mean(0)
        for k in range(4):
            th = k * np.pi / 2; t = tc - (np.array([[np.cos(th), -np.sin(th)], [np.sin(th), np.cos(th)]]) @ c0)
            for it in range(60):
                Rm = np.array([[np.cos(th), -np.sin(th)], [np.sin(th), np.cos(th)]]); X = P0 @ Rm.T + t
                Y = np.array([Tb.interpolate(Tb.project(Point(x))).coords[0] for x in X])
                a = P0 - P0.mean(0); b = Y - Y.mean(0); H = a.T @ b; th = np.arctan2(H[0, 1] - H[1, 0], H[0, 0] + H[1, 1])
                Rm = np.array([[np.cos(th), -np.sin(th)], [np.sin(th), np.cos(th)]]); t = Y.mean(0) - P0.mean(0) @ Rm.T
            X = P0 @ Rm.T + t; rms = float(np.sqrt(np.mean([Tb.distance(Point(x)) ** 2 for x in X])))
            if best is None or rms < best[0]: best = (rms, float(th), m, t.tolist())
    rms, th, m, t = best
    return {'th': round(th, 6), 'mirror': m, 't': [round(t[0], 3), round(t[1], 3)], 'rms': round(rms, 3), 'deg': round(float(np.degrees(th)), 2)}
def rr(r): return round(float(r), 3) if isinstance(r, (int, float)) else [rr(x) for x in r]
def room(x): return {k: (([rr(q) for q in v]) if k == 'r' else v) for k, v in x.items() if k in ('id', 'n', 'g', 'r', 'core', 'stair')}
out = {'van': {}, 'edm': {}}
for key, folder, bf, pid, addr in BOARDS:
    g = load_geom(folder)
    gj = os.path.join(EH, folder, 'grown.json'); grown = json.load(open(gj)) if os.path.exists(gj) else None
    S = {str(k): [room(x) for x in v] for k, v in g.S.items()}
    plant = [{'id': p['id'], 'n': p['n'], 'r': rr(p['r'])} for p in getattr(g, 'PLANT', [])]
    mw, dc, stop = MANIFEST[key]
    hall = sum((r[1] - r[0]) * (r[3] - r[2]) for x in g.S.get(max(g.S), []) if x.get('g') == 'hall' for r in x['r'])
    lp = lot_lp(g); ring = tool_ring('van' if key[0] == 'V' else 'edm', key, pid); reg = register(lp, ring) if ring else None
    b = {'key': key, 'reg': reg, 'addr': addr, 'id': pid, 'freeze': FREEZE_OF.get(key, FREEZE), 'MW': mw, 'dcArea': dc, 'stop': stop,
         'grownMW': grown and grown.get('MW'), 'grownDC': grown and grown.get('dc'), 'stopText': grown and grown.get('stop', {}).get('text'),
         'hallDrawn': round(hall, 1), 'hpm': (grown or {}).get('hpm', 630.0),
         'H': list(getattr(g, 'H', [])), 'SLAB': getattr(g, 'SLAB', None), 'LOTPOLY': [rr(p) for p in lp], 'S': S,
         'D': [[rr(x) if isinstance(x, (int, float)) and not isinstance(x, bool) else x for x in d] for d in getattr(g, 'D', [])], 'PLANT': plant,
         'COURT': rr(g.COURT) if getattr(g, 'COURT', None) else None, 'DRIVE': rr(g.DRIVE) if getattr(g, 'DRIVE', None) else None,
         'COVERED': [rr(r) for r in getattr(g, 'COVERED', [])], 'PLANT_YARDS': rr(getattr(g, 'PLANT_YARDS', [])),
         'FUEL_FILL': [rr(p) for p in getattr(g, 'FUEL_FILL', [])], 'STREET_EDGES': [[rr(a), rr(c)] for a, c in getattr(g, 'STREET_EDGES', [])],
         'rows': rows_of(os.path.join(EH, BOARDDIR.get(key, 'ic45'), f'TestFit_EH_{bf}.dc.html')),
         'board': f'{BOARDDIR.get(key, "ic45")}/TestFit_EH_{bf}.dc.html', 'boardSha16': hashlib.sha256(open(os.path.join(EH, BOARDDIR.get(key, 'ic45'), f'TestFit_EH_{bf}.dc.html'), 'rb').read()).hexdigest()[:16]}
    for k_ in ([pid] if pid else IDS.get(key, [])): out['van' if key[0] == 'V' else 'edm'][k_] = dict(b, id=k_)
    print(key, 'storeys', list(S), 'rooms', sum(len(v) for v in S.values()), 'doors', len(b['D']), 'plant', len(plant), 'rows', len(b['rows']), 'MW', mw, 'grown', b['grownMW'], 'hall', b['hallDrawn'], 'reg', reg)
about = ('Frozen Emergency hub boards, freeze %s (Claude Link eh/; boards ic45). Exported by checks/tests/hub_frozen_export.py. Board frame metres; '
         'rects (u0, u1, v0, v1); rows as the boards print them. The tool reads these on the board lots so its numbers are the frozen board\'s.' % FREEZE)
json.dump({'_about': about, 'boards': out['van']}, open(os.path.join(OUT, 'hub_frozen_van.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
json.dump({'_about': about + ' Edmonton lot outlines: Altalis via EPSB GIS, academic use only; this file is git-ignored.', 'boards': out['edm']},
          open(os.path.join(OUT, 'hub_frozen_edm.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
