#!/usr/bin/env python3
"""Share of each 100 m site-map cell covered by buildings (method v2.1, 25 Oct 2026). Used for the 'already built' site factor.
Building outlines from the tool tiles: Vancouver 2009 City footprints + 2022 LiDAR outlines (flags 0, 1, 2, 4; flag 3 = not found by LiDAR, left out);
Edmonton City 3D Buildings roof parts (flag 5), unmatched parts (7) and roofline outlines (no flag). Outlines are unioned per cell, so overlaps count once.
Writes built_cover_<city>.json: {cell id: share 0-1}."""
import json, glob, os, math
from shapely.geometry import Polygon, box
from shapely.strtree import STRtree
from shapely.ops import unary_union
H = os.path.dirname(os.path.abspath(__file__)); T = os.path.join(H, '..', 'tool', 'tiles')
CITY = {'van': dict(T=1500, ok=(0, 1, 2, 4)), 'edm': dict(T=2500, ok=(5, 7, None))}; Q = 2
def dec(r, ox, oy):
    pts = []; x = y = None
    for i in range(0, len(r), 2):
        if x is None: x, y = r[i], r[i + 1]
        else: x += r[i]; y += r[i + 1]
        pts.append((ox + x / Q, oy + y / Q))
    return pts
for c, P in CITY.items():
    polys = []
    for f in glob.glob(os.path.join(T, c, 't_*.json')):
        i, j = map(int, os.path.basename(f)[2:-5].split('_'))
        for b in json.load(open(f))['B']:
            fl = b[2] if len(b) > 2 else None
            if fl not in P['ok']: continue
            pts = dec(b[1], i * P['T'], j * P['T'])
            if len(pts) < 3: continue
            pg = Polygon(pts)
            if not pg.is_valid: pg = pg.buffer(0)
            if pg.area > 10: polys.append(pg)
    tree = STRtree(polys); cells = {}
    for pg in polys:
        x0, y0, x1, y1 = pg.bounds
        for a in range(math.floor(x0 / 100), math.floor(x1 / 100) + 1):
            for b2 in range(math.floor(y0 / 100), math.floor(y1 / 100) + 1): cells[(a, b2)] = 1
    out = {}
    for (a, b2) in cells:
        bx = box(a * 100, b2 * 100, a * 100 + 100, b2 * 100 + 100)
        hit = [polys[k] for k in tree.query(bx)]
        if hit: out['%s_%d_%d' % (c, a, b2)] = round(unary_union(hit).intersection(bx).area / 10000, 3)
    json.dump(out, open(os.path.join(H, 'built_cover_%s.json' % c), 'w'))
    print(c, len(polys), 'outlines', len(out), 'cells')
