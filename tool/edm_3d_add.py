#!/usr/bin/env python3
"""M70 pass 2 (18 Oct 2026): add the City 3D parts that sit in no roofline outline (data/raw/edm/3d/unmatched.json, from edm_3d_unmatched.py)
to the Edmonton tiles as buildings, flag 7 = "measured, City 3D buildings; outline = the parts' convex hull (no roofline outline)".
Overlapping hulls are merged; height = highest point − lowest point of the merged parts. Kept: plan area ≥ 10 m² and height ≥ 2.5 m.
Idempotent: earlier flag-7 buildings are removed first. Run AFTER make_tiles.py edm and edm_heights.py."""
import os, json, glob
import numpy as np, shapely
from shapely.ops import unary_union
from shapely.strtree import STRtree
H = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(H)
TD = os.path.join(H, 'tiles', 'edm'); meta = json.load(open(os.path.join(TD, 'meta.json'))); Q, T = meta['Q'], meta['T']
U = json.load(open(os.path.join(ROOT, 'data', 'raw', 'edm', '3d', 'unmatched.json')))
P = [shapely.Polygon(list(zip(u[2][0::2], u[2][1::2]))) for u in U]; P = [p if p.is_valid else p.buffer(0) for p in P]
m = unary_union(P); G = list(m.geoms) if m.geom_type == 'MultiPolygon' else [m]
tr = STRtree(G); z0 = np.full(len(G), 1e9); z1 = np.full(len(G), -1e9)
for i, p in enumerate(P):
    j = tr.query(p.representative_point(), predicate='within')
    if len(j): j = j[0]; z0[j] = min(z0[j], U[i][0]); z1[j] = max(z1[j], U[i][1])
tiles = {}
for fn in glob.glob(os.path.join(TD, 't_*.json')):
    t = json.load(open(fn)); t['B'] = [b for b in t['B'] if not (len(b) > 2 and b[2] == 7)]; tiles[os.path.basename(fn)[2:-5]] = (fn, t)
add = skip = 0
for g, a, b in zip(G, z0, z1):
    h = b - a
    if g.area < 10 or h < 2.5 or h > 300: continue
    c = g.centroid; key = f'{int(np.floor(c.x / T))}_{int(np.floor(c.y / T))}'
    if key not in tiles: skip += 1; continue
    fn, t = tiles[key]; ox, oy = t['o']; enc = []; px = py = 0
    for x, y in list(g.exterior.coords)[:-1]:
        X, Y = round((x - ox) * Q), round((y - oy) * Q); enc += [X - px, Y - py]; px, py = X, Y
    t['B'].append([round(float(h), 1), enc, 7]); add += 1
for fn, t in tiles.values(): json.dump(t, open(fn, 'w'), separators=(',', ':'))
print(len(U), 'parts →', len(G), 'merged;', add, 'added as buildings;', skip, 'outside the tile set')
