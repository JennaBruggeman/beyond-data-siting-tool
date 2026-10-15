#!/usr/bin/env python3
"""Combine City of Vancouver LiDAR 2022 (processed per tile by lidar_tile.py) with the City's 2009 building footprints.

For each 2009 footprint: the 2022 measured height (90th percentile and maximum of building points above ground)
and the share of its area that still has building points in 2022 (low share = demolished or rebuilt).
For each LiDAR building not covered by a 2009 footprint: a new outline (built since 2009), with its height.
Output: data/lidar2022/<tile>.json (UTM 10N in, lon/lat out)."""
import json, os, sys, glob, pickle
import numpy as np, pyproj
from matplotlib.path import Path
from shapely.geometry import shape, Polygon
from shapely.strtree import STRtree
from shapely.ops import unary_union

H = os.path.dirname(os.path.abspath(__file__)); D = os.path.join(H, '..', 'data')
IN = sys.argv[1] if len(sys.argv) > 1 else '/mnt/user-data/uploads/Claude Link/lidar_out'
OUT = os.path.join(D, 'lidar2022'); os.makedirs(OUT, exist_ok=True)
fw = pyproj.Transformer.from_crs(4326, 26910, always_xy=True); bw = pyproj.Transformer.from_crs(26910, 4326, always_xy=True)

CACHE = os.path.join(D, 'lidar2022', '_fp_utm.pkl')
if os.path.exists(CACHE): FP = pickle.load(open(CACHE, 'rb'))
else:
    FP = []
    for f in json.load(open(os.path.join(D, 'vancouver_footprints_2009.geojson'), encoding='utf-8'))['features']:
        g = shape(f['geometry'])
        for p in (g.geoms if g.geom_type == 'MultiPolygon' else [g]):
            FP.append((f['properties']['id'], Polygon([fw.transform(x, y) for x, y in p.exterior.coords])))
    pickle.dump(FP, open(CACHE, 'wb'))
TREE = STRtree([p for _, p in FP])

def tile(name):
    z = np.load(os.path.join(IN, name + '.npz')); h = z['h_dm'] / 10.0; R = float(z['res']); x0, y0 = int(z['x0']), int(z['y0']); N = h.shape[0]
    top = y0 + N * R
    res = {'fp': {}, 'new': []}
    idx = TREE.query(Polygon([(x0, y0), (x0 + N * R, y0), (x0 + N * R, top), (x0, top)]))
    near = [FP[i] for i in idx]
    for fid, p in near:
        c = p.centroid
        if not (x0 <= c.x < x0 + N * R and y0 <= c.y < top): continue
        a, b, cc, d = p.bounds
        c0, c1 = max(0, int((a - x0) / R)), min(N, int((cc - x0) / R) + 1)
        r0, r1 = max(0, int((top - d) / R)), min(N, int((top - b) / R) + 1)
        if c1 <= c0 or r1 <= r0: continue
        cols, rows = np.meshgrid(np.arange(c0, c1), np.arange(r0, r1))
        px = x0 + (cols + .5) * R; py = top - (rows + .5) * R
        inside = Path(np.array(p.exterior.coords)).contains_points(np.c_[px.ravel(), py.ravel()]).reshape(px.shape)
        v = h[r0:r1, c0:c1][inside]
        if v.size == 0: continue
        b_ = v[v > 0]; share = b_.size / v.size
        res['fp'][fid] = [round(float(np.percentile(b_, 90)), 1) if b_.size else 0, round(float(b_.max()), 1) if b_.size else 0, round(share, 2)]
    old = unary_union([p.buffer(1.5) for _, p in near]) if near else None
    for p90, hmax, area, gz, ring in json.load(open(os.path.join(IN, name + '.json')))['buildings']:
        poly = Polygon(ring)
        if not poly.is_valid: poly = poly.buffer(0)
        part = poly.difference(old) if old is not None else poly
        if part.is_empty or part.area < 40 or part.area / max(poly.area, 1) < 0.5: continue
        for q in (part.geoms if part.geom_type == 'MultiPolygon' else [part]):
            if q.geom_type != 'Polygon' or q.area < 40: continue
            q = q.simplify(0.5)
            res['new'].append([p90, hmax, round(q.area), [[round(x, 6), round(y, 6)] for x, y in (bw.transform(*xy) for xy in q.exterior.coords)]])
    json.dump(res, open(os.path.join(OUT, name + '.json'), 'w'))
    st = np.array([v[2] for v in res['fp'].values()]) if res['fp'] else np.array([])
    return len(res['fp']), int((st >= 0.3).sum()), int((st < 0.1).sum()), len(res['new'])

if __name__ == '__main__':
    names = sys.argv[2:] or [os.path.basename(f)[:-4] for f in sorted(glob.glob(os.path.join(IN, '*.npz')))]
    for n in names:
        if not os.path.exists(os.path.join(IN, n + '.npz')): continue
        try: print(n, 'footprints, standing, gone, new =', tile(n))
        except Exception as e: print(n, 'SKIPPED:', e)
