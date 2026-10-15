#!/usr/bin/env python3
"""Edmonton lot outlines for the tool, from the school board's copy of Alberta title mapping.

Source: Edmonton Public Schools GIS, Hosted/Titled_Lots_Current/FeatureServer/262 (Alberta title mapping,
(c) Altalis; current to 1 Sep 2025), fetched 15 Oct 2026 in the in-app browser (fetch_note below).
Academic use approved by J.B.'s professor (Xun). NOT for redistribution: input and output stay out of git.

In:  data/raw/edm/lots/edmonton_lots_epsb.json  [pid, objectid, rings]; rings delta-encoded lon*1e6, lat*1e6
Out: tool/tiles/edm/l_<i>_<j>.json  {o, L: [[ring_enc, [assessment ids inside]], ...]}  (same projection and
     quantisation as the t_ tiles: local metres from lat0/lon0, Q = 2 units per metre, ring delta-encoded)
Kept: lots whose representative point is in a tile that exists AND that either hold an assessment point or
lie inside the City's zoning polygons (drops St. Albert, Sherwood Park, county lots caught by the box)."""
import json, math, os, collections
from shapely.geometry import Polygon, Point
from shapely.strtree import STRtree
from shapely import make_valid
H = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.join(H, '..', '..')
TD = os.path.join(ROOT, 'tool', 'tiles', 'edm')
meta = json.load(open(os.path.join(TD, 'meta.json')))
T, Q, lat0, lon0 = meta['T'], meta['Q'], meta['lat0'], meta['lon0']
k = math.cos(math.radians(lat0)) * 111320.0
P = lambda lon, lat: ((lon - lon0) * k, (lat - lat0) * 110540.0)
tiles = {f'{a}_{b}' for a, b in meta['tiles']}

def dec(a, ox=0, oy=0, q=Q):
    x = y = 0; out = []
    for i in range(0, len(a), 2): x += a[i]; y += a[i + 1]; out.append((ox + x / q, oy + y / q))
    return out
# City zoning polygons (overview) as the "inside the city" test
zone_polys = [Polygon(r) for r in (dec(a) for zi, a in meta['overview']) if len(r) >= 3]
zone_polys = [make_valid(p) if not p.is_valid else p for p in zone_polys if not p.is_empty]
ZT = STRtree(zone_polys)

raw = json.load(open(os.path.join(ROOT, 'data', 'raw', 'edm', 'lots', 'edmonton_lots_epsb.json')))
print('lots in file:', raw['count'])
# assessment points (all tiles) in one spatial index; vectorised point-in-lot and lot-in-city tests
import numpy as np, shapely
ids, xs, ys = [], [], []
for key in tiles:
    t = json.load(open(os.path.join(TD, f't_{key}.json'))); ox, oy = t['o']
    for pid, x, y in t.get('E', []): ids.append(pid); xs.append(ox + x / Q); ys.append(oy + y / Q)
PTS = shapely.points(np.array(xs), np.array(ys)); PT = STRtree(PTS)
polys, lls = [], []
for pid, oid, rings in raw['lots']:
    r = rings[0]; x = y = 0; ll = []
    for i in range(0, len(r), 2): x += r[i]; y += r[i + 1]; ll.append(P(x / 1e6, y / 1e6))
    if len(ll) < 4: continue
    pg = Polygon(ll); polys.append(pg if pg.is_valid else make_valid(pg)); lls.append(ll)
polys = np.array(polys, dtype=object)
rp = shapely.point_on_surface(polys)
li, pi = PT.query(polys, predicate='contains')
inside = collections.defaultdict(list)
for a, b in zip(li, pi): inside[a].append(ids[b])
zi_l, _ = ZT.query(rp, predicate='within'); in_city = set(zi_l.tolist())
out = collections.defaultdict(list); kept = drop_out = drop_city = 0; with_pts = 0
for n, ll in enumerate(lls):
    key = f'{math.floor(rp[n].x / T)}_{math.floor(rp[n].y / T)}'
    if key not in tiles: drop_out += 1; continue
    ins = inside.get(n, [])
    if not ins and n not in in_city: drop_city += 1; continue
    i0, j0 = map(int, key.split('_')); ox, oy = i0 * T, j0 * T
    enc = []; px = py = 0
    for (X, Y) in ll:
        qx, qy = round((X - ox) * Q), round((Y - oy) * Q); enc += [qx - px, qy - py]; px, py = qx, qy
    out[key].append([enc, ins]); kept += 1; with_pts += bool(ins)
for key, L in out.items():
    i0, j0 = map(int, key.split('_'))
    json.dump(dict(o=[i0 * T, j0 * T], L=L), open(os.path.join(TD, f'l_{key}.json'), 'w'), separators=(',', ':'))
print(f'kept {kept} lots in {len(out)} tiles ({with_pts} with an assessment record); dropped {drop_out} outside tiles, {drop_city} outside the city')
