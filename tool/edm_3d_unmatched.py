#!/usr/bin/env python3
"""M70 (18 Oct 2026): City 3D building parts that fall inside no roofline outline → extra Edmonton buildings, like Vancouver's LiDAR-added outlines.
Pass 1 (this script, slow): read data/raw/edm/3d/3dBuildings.gdb (Building_MP_Merge, EPSG:3776); for each part whose centroid lies in no tile outline,
keep its convex-hull footprint (tile metres), lowest and highest point. Parts with a base at 0 m (artefacts) are skipped, as in edm_heights.py.
Out: data/raw/edm/3d/unmatched.json"""
import os, json, math, glob, time
import fiona, pyproj, shapely
from shapely.strtree import STRtree
H = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(H)
TD = os.path.join(H, 'tiles', 'edm'); meta = json.load(open(os.path.join(TD, 'meta.json'))); Q = meta['Q']
k = math.cos(math.radians(meta['lat0'])) * 111320.0
polys = []
for fn in glob.glob(os.path.join(TD, 't_*.json')):
    t = json.load(open(fn)); ox, oy = t['o']
    for b in t['B']:
        a = b[1]; x = y = 0; ring = []
        for i in range(0, len(a), 2): x += a[i]; y += a[i + 1]; ring.append((ox + x / Q, oy + y / Q))
        if len(ring) >= 3:
            p = shapely.Polygon(ring); polys.append(p if p.is_valid else shapely.make_valid(p))
tree = STRtree(polys); tr = pyproj.Transformer.from_crs(3776, 4326, always_xy=True)
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
out = []; n = 0; t0 = time.time()
with fiona.open(os.path.join(ROOT, 'data', 'raw', 'edm', '3d', '3dBuildings.gdb'), layer='Building_MP_Merge') as src:
    for f in src:
        n += 1
        cs = list(coords(f['geometry']))
        if not cs: continue
        z0 = min(c[2] for c in cs); z1 = max(c[2] for c in cs)
        if z0 <= 500: continue
        lon, lat = tr.transform([c[0] for c in cs], [c[1] for c in cs])
        pts = [((lo - meta['lon0']) * k, (la - meta['lat0']) * 110540.0) for lo, la in zip(lon, lat)]
        cx = sum(p[0] for p in pts) / len(pts); cy = sum(p[1] for p in pts) / len(pts)
        if len(tree.query(shapely.Point(cx, cy), predicate='within')): continue
        hull = shapely.MultiPoint(pts).convex_hull
        if hull.geom_type != 'Polygon' or hull.area < 4: continue
        out.append([round(z0, 2), round(z1, 2), [round(v, 1) for xy in hull.exterior.coords[:-1] for v in xy]])
        if n % 50000 == 0: print(n, len(out), round(time.time() - t0), flush=True)
json.dump(out, open(os.path.join(ROOT, 'data', 'raw', 'edm', '3d', 'unmatched.json'), 'w'), separators=(',', ':'))
print('done', n, 'parts read;', len(out), 'unmatched kept', round(time.time() - t0), 's')
