#!/usr/bin/env python3
# SUPERSEDED 18 Oct 2026 by dedupe_receivers.py (per-building floor area, one record per site); kept for the record, do not run.
"""Estimate each non-housing receiver's floor area from the building tiles the tool already ships: the buildings on the parcel that holds the
receiver point, each footprint × storeys at 4 m (height ÷ 4, at least 1), summed. Vancouver heights: City LiDAR 2022 (measured) or 2009 footprint
data; Edmonton: City 3D buildings or floor area ÷ footprint estimate (as in the tiles). An estimate for the demand gate, labelled as such.
In: tiles/<city>/t_*.json, receivers_<city>.json. Out: fa (m², estimate), fh (tallest, m), fm (buildings counted), fl (parcel m²) added to each receiver, written back by make_receivers.py's
outputs (run after it)."""
import json, math, os, glob
from shapely.geometry import Polygon, Point
H = os.path.dirname(os.path.abspath(__file__))
CITY = {'van': dict(lat0=49.25, lon0=-123.12, T=1500), 'edm': dict(lat0=53.54, lon0=-113.50, T=2500)}; Q = 2
TYPES = {'school', 'hospital', 'care', 'rec', 'pool', 'arena'}
def dec(r, ox, oy):
    pts = []; x = y = None
    for i in range(0, len(r), 2):
        if x is None: x, y = r[i], r[i + 1]
        else: x += r[i]; y += r[i + 1]
        pts.append((ox + x / Q, oy + y / Q))
    return pts
for c, P in CITY.items():
    k = math.cos(math.radians(P['lat0'])) * 111320.0; T = P['T']
    B = []
    for f in glob.glob(os.path.join(H, 'tiles', c, 't_*.json')):
        i, j = map(int, os.path.basename(f)[2:-5].split('_')); d = json.load(open(f))
        for b in d.get('B', []):
            pts = dec(b[1], i * T, j * T)
            if len(pts) >= 3:
                pg = Polygon(pts)
                if pg.is_valid and pg.area > 20: B.append((pg, b[0]))
    from shapely.strtree import STRtree
    tree = STRtree([b[0] for b in B])
    LOT = []  # parcels: Vancouver 'P' in t_ tiles, Edmonton 'L' in l_ tiles
    for f in glob.glob(os.path.join(H, 'tiles', c, 't_*.json' if c == 'van' else 'l_*.json')):
        d = json.load(open(f)); ox, oy = d['o']
        for e in (d.get('P', []) if c == 'van' else d.get('L', [])):
            r = e[1] if c == 'van' else (e[0] if e and isinstance(e[0], list) else e)
            pts = dec(r, ox, oy)
            if len(pts) >= 3:
                pg = Polygon(pts)
                if pg.is_valid and pg.area > 50: LOT.append(pg)
    ltree = STRtree(LOT)
    for name in (f'receivers_{c}.json', os.path.join('tiles', c, 'receivers.json')):
        path = os.path.join(H, name); d = json.load(open(path)); pts = d['pts'] if isinstance(d, dict) else d; n = 0
        for p in pts:
            if p['t'] not in TYPES: continue
            q = Point((p['lon'] - P['lon0']) * k, (p['lat'] - P['lat0']) * 110540.0)
            for k_ in ('fa', 'fh', 'fm', 'fl'): p.pop(k_, None)
            lots = [LOT[int(x)] for x in ltree.query(q) if LOT[int(x)].contains(q)]
            if lots:
                lot = min(lots, key=lambda g: g.area)
                bs = [B[int(x)] for x in tree.query(lot) if lot.contains(B[int(x)][0].representative_point())]
            else:  # no parcel in the tiles: the one building the point falls in
                lot = None; bs = [B[int(x)] for x in tree.query(q) if B[int(x)][0].contains(q)]
            bs = [b for b in bs if b[1] and b[1] > 0]
            if not bs: continue
            fa = sum(g.area * max(1, round(h / 4)) for g, h in bs)
            p['fa'] = round(fa); p['fh'] = round(max(h for g, h in bs), 1); p['fm'] = len(bs); p['fl'] = round(lot.area) if lot else 0; n += 1
        json.dump(d, open(path, 'w'), ensure_ascii=False, separators=(',', ':'))
        print(c, name, n, 'of', sum(1 for p in pts if p['t'] in TYPES))
