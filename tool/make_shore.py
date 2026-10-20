#!/usr/bin/env python3
"""Water edges for 'Cooling from the inlet or river' (distance from a site to the water). Out: tool/shore.json.
Edmonton: North Saskatchewan River polygon, Altalis Base Features Hydrography via Edmonton Public Schools GIS
  (azimuth.epsb.ca, layer 98; J.B. download 19 Oct 2026; data/raw/hydro/nsr_epsb.geojson; same terms as the lots: academic use).
  Outer ring only (islands are inside the river), kept within 30 km of the tool's centre, simplified to 5 m.
Vancouver: none yet (CanVec Hydro to come)."""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); D = os.path.join(H, '..', 'data', 'raw', 'hydro')
def fwd(meta, lon, lat):
    k = math.cos(math.radians(meta['lat0'])) * 111320.0
    return (lon - meta['lon0']) * k, (lat - meta['lat0']) * 110540.0
def dp(pts, tol):
    if len(pts) < 3: return pts
    keep = [0, len(pts) - 1]; stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop(); (x1, y1), (x2, y2) = pts[a], pts[b]; L = math.hypot(x2 - x1, y2 - y1) or 1e-9; best, bi = 0, None
        for i in range(a + 1, b):
            x, y = pts[i]; dd = abs((x2 - x1) * (y1 - y) - (x1 - x) * (y2 - y1)) / L
            if dd > best: best, bi = dd, i
        if bi is not None and best > tol: keep.append(bi); stack += [(a, bi), (bi, b)]
    return [pts[i] for i in sorted(set(keep))]
out = {'src': {}, 'lines': {}}
meta = json.load(open(os.path.join(H, 'tiles', 'edm', 'meta.json')))
g = json.load(open(os.path.join(D, 'nsr_epsb.geojson')))['features'][0]['geometry']['coordinates'][0]
xy = [fwd(meta, lon, lat) for lon, lat in g]
runs, cur = [], []
for p in xy:
    if math.hypot(*p) <= 30000: cur.append(p)
    elif cur: runs.append(cur); cur = []
if cur: runs.append(cur)
out['lines']['edm'] = [[round(v, 1) for p in dp(r, 5.0) for v in p] for r in runs if len(r) > 1]
out['src']['edm'] = 'North Saskatchewan River outline: Altalis Base Features Hydrography, shared by Edmonton Public Schools (azimuth.epsb.ca), downloaded 19 Oct 2026'
json.dump(out, open(os.path.join(H, 'shore.json'), 'w'), separators=(',', ':'))
print('edm runs', len(out['lines']['edm']), 'points', sum(len(r) // 2 for r in out['lines']['edm']), round(os.path.getsize(os.path.join(H, 'shore.json')) / 1024), 'KB')
