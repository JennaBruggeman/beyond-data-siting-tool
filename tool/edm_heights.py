#!/usr/bin/env python3
"""Measured building heights for Edmonton from the City's 3D buildings (run AFTER make_tiles.py edm).

In:  data/raw/edm/3d/3dBuildings.gdb, layer Building_MP_Merge (383,329 multipatch parts, EPSG:3776, elevations in m)
     tool/tiles/edm/t_*.json  (rooflines as building outlines; height so far estimated from assessment floor area)
Out: the same tiles, each building's height replaced by the measured height where 3D parts fall inside its outline,
     flagged f = 5 ("measured, City 3D buildings"). Height = highest point of the parts − lowest point (ground).
     Parts with a base at 0 m (37 artefacts in the file) are skipped. Outlines with no 3D part keep the estimate.
Cache: data/raw/edm/3d/parts.npz (part centroid, lowest and highest elevation)."""
import os, json, math, glob, time
import numpy as np, shapely
from shapely.strtree import STRtree
H = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(H)
GDB = os.path.join(ROOT, 'data', 'raw', 'edm', '3d', '3dBuildings.gdb'); CACHE = os.path.join(ROOT, 'data', 'raw', 'edm', '3d', 'parts.npz')
TD = os.path.join(H, 'tiles', 'edm'); meta = json.load(open(os.path.join(TD, 'meta.json'))); Q = meta['Q']
if not os.path.exists(CACHE):
    import fiona
    def coords(g):
        if g is None: return
        if g['type'] == 'GeometryCollection':
            for h in g['geometries']: yield from coords(h)
        else:
            def walk(c):
                if isinstance(c[0], (int, float)): yield c
                else:
                    for x in c: yield from walk(x)
            yield from walk(g['coordinates'])
    X, Y, Z0, Z1 = [], [], [], []; t0 = time.time()
    with fiona.open(GDB, layer='Building_MP_Merge') as src:
        for f in src:
            cs = list(coords(f['geometry']))
            if not cs: continue
            zs = [c[2] for c in cs]
            X.append(sum(c[0] for c in cs) / len(cs)); Y.append(sum(c[1] for c in cs) / len(cs)); Z0.append(min(zs)); Z1.append(max(zs))
    np.savez(CACHE, x=X, y=Y, z0=Z0, z1=Z1); print('cached', len(X), 'parts in', round(time.time() - t0), 's')
d = np.load(CACHE); ok = d['z0'] > 500
import pyproj
lon, lat = pyproj.Transformer.from_crs(3776, 4326, always_xy=True).transform(d['x'][ok], d['y'][ok])
k = math.cos(math.radians(meta['lat0'])) * 111320.0
px, py = (lon - meta['lon0']) * k, (lat - meta['lat0']) * 110540.0
z0, z1 = d['z0'][ok], d['z1'][ok]
tree = STRtree(shapely.points(px, py))
done = kept = 0
for fn in glob.glob(os.path.join(TD, 't_*.json')):
    t = json.load(open(fn)); ox, oy = t['o']; ch = False
    for b in t['B']:
        a = b[1]; x = y = 0; ring = []
        for i in range(0, len(a), 2): x += a[i]; y += a[i + 1]; ring.append((ox + x / Q, oy + y / Q))
        if len(ring) < 3: continue
        poly = shapely.Polygon(ring)
        if not poly.is_valid: poly = shapely.make_valid(poly)
        idx = tree.query(poly, predicate='contains')
        if len(idx):
            h = float(z1[idx].max() - z0[idx].min())
            if 1.5 <= h <= 300:
                b[0] = round(h, 1)
                if len(b) < 3: b.append(5)
                else: b[2] = 5
                done += 1; ch = True; continue
        kept += 1
    if ch: json.dump(t, open(fn, 'w'), separators=(',', ':'))
print(f'measured {done} outlines; {kept} keep the estimate')
