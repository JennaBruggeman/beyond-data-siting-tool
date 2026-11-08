#!/usr/bin/env python3
"""Water edges for 'Cooling from the inlet or river' (distance from a site to the water). Out: tool/shore.json.
Edmonton: kept from shore.json; built by make_shore_edm_canvec.py (NRCan CanVec 50K Hydro, Alberta; 8 Nov 2026).
Vancouver: NRCan CanVec 50K Hydro, BC (waterbody_2, Open Government Licence – Canada; J.B. download 20 Oct 2026), extracted on J.B.'s computer to
  data/raw/hydro/canvec_van_water_extract.json (box -123.40 to -122.80, 49.05 to 49.42): 'Ocean' polygons (Burrard Inlet, English Bay, False Creek, the Strait)
  the 'Fraser River' watercourse polygons and the side channels (the Fraser's North Arm and others); creeks, lakes and reservoirs left out (not cooling sources). Rings kept whole: CanVec cuts polygons at map-sheet
  edges, but those cuts lie in the water, so the distance from a site on land to the nearest edge is still the distance to the water."""
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
# Edmonton (8 Nov 2026, J.B.): the river now comes from CanVec Alberta, tool/make_shore_edm_canvec.py (run it after this script); the Altalis outline
# is not for redistribution and is no longer read. This script keeps the Edmonton part already in shore.json.
prev = json.load(open(os.path.join(H, 'shore.json'))) if os.path.exists(os.path.join(H, 'shore.json')) else {'lines': {}, 'src': {}, 'kinds': {}}
out['lines']['edm'] = prev['lines'].get('edm', []); out['src']['edm'] = prev['src'].get('edm', '?')
vm = json.load(open(os.path.join(H, 'tiles', 'van', 'meta.json')))
V = json.load(open(os.path.join(D, 'canvec_van_water_extract.json')))
out['lines']['van'], out['kinds'] = [], {'edm': prev.get('kinds', {}).get('edm', ['river'] * len(out['lines']['edm'])), 'van': []}
for w in V:
    if w['t'] != 'Ocean' and w['n'] != 'Fraser River' and w['t'] != 'Side Channel': continue  # side channels here are the Fraser's arms (the North Arm is one)
    for ring in w['r']:
        xy = [fwd(vm, lon, lat) for lon, lat in ring]
        h = len(xy) // 2; xy = dp(xy[:h + 1], 5.0)[:-1] + dp(xy[h:], 5.0)  # a closed ring starts and ends on the same point: simplify each half
        if len(xy) > 1: out['lines']['van'].append([round(v, 1) for p in xy for v in p]); out['kinds']['van'].append('sea' if w['t'] == 'Ocean' else 'river')
out['src']['van'] = 'shoreline: NRCan CanVec 50K Hydro, British Columbia (ocean and Fraser River polygons; source maps 1980s–2010s), downloaded 20 Oct 2026'
json.dump(out, open(os.path.join(H, 'shore.json'), 'w'), separators=(',', ':'))
print('van rings', len(out['lines']['van']), sum(len(r)//2 for r in out['lines']['van']));print('edm runs', len(out['lines']['edm']), 'points', sum(len(r) // 2 for r in out['lines']['edm']), round(os.path.getsize(os.path.join(H, 'shore.json')) / 1024), 'KB')
