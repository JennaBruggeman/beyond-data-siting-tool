#!/usr/bin/env python3
"""Receiver audit (J.B. 20 Oct 2026: "check them all. everything could be double counting"). Read-only; prints counts and flagged records.
For every big-building receiver (vanBCA, vanGHGrep, edmAssess) compare the floor area its heat figure implies with the tool's own estimate
from building outlines on its lot (footprint x storeys at 4 m, tallest point, so an upper estimate). Also: two receivers on one lot.
Implied floor: Vancouver BCA = estimate (MWh) x 3.6 / 0.57 GJ/m2 (BC commercial average; homes at 16.81 MWh are about 0.6-0.8 GJ/m2, so similar);
GHG = reported floor area; Edmonton = assessment gross area."""
import json, os, glob, math, collections, sys
from shapely.geometry import Polygon, Point, shape
from shapely.strtree import STRtree
H = os.path.dirname(os.path.abspath(__file__)); D = os.path.join(H, '..', 'data')
CITY = {'van': dict(lat0=49.25, lon0=-123.12, T=1500), 'edm': dict(lat0=53.54, lon0=-113.50, T=2500)}; Q = 2
def dec(r, ox, oy):
    pts = []; x = y = None
    for i in range(0, len(r), 2):
        if x is None: x, y = r[i], r[i + 1]
        else: x += r[i]; y += r[i + 1]
        pts.append((ox + x / Q, oy + y / Q))
    return pts
OUT = {}
for c, P in CITY.items():
    k = math.cos(math.radians(P['lat0'])) * 111320.0; T = P['T']
    fwd = lambda lo, la: ((lo - P['lon0']) * k, (la - P['lat0']) * 110540.0)
    B = []
    for f in glob.glob(os.path.join(H, 'tiles', c, 't_*.json')):
        i, j = map(int, os.path.basename(f)[2:-5].split('_'))
        for b in json.load(open(f))['B']:
            ok = (b[2] in (1, 2, 4, 0)) if c == 'van' else (len(b) > 2 and b[2] in (5, 7))
            pts = dec(b[1], i * T, j * T)
            if len(pts) >= 3:
                pg = Polygon(pts)
                if pg.is_valid and pg.area > 20: B.append((pg, b[0], ok))
    bt = STRtree([b[0] for b in B])
    lots = []
    if c == 'van':
        for ft in json.load(open(os.path.join(D, 'vancouver_parcels_2026.geojson'), encoding='utf-8'))['features']:
            g = shape(ft['geometry'])
            try: lots.append(Polygon([fwd(x, y) for x, y in (g.exterior.coords if g.geom_type == 'Polygon' else max(g.geoms, key=lambda q: q.area).exterior.coords)]))
            except Exception: pass
    else:
        for f in glob.glob(os.path.join(H, 'tiles', 'edm', 'l_*.json')):
            d = json.load(open(f)); ox, oy = d['o']
            for a, ids in d['L']:
                pts = dec(a, ox, oy)
                if len(pts) >= 3:
                    pg = Polygon(pts)
                    if pg.is_valid: lots.append(pg)
    lt = STRtree(lots)
    R = json.load(open(os.path.join(H, f'receivers_{c}.json')))
    lot_of = []
    for p in R:
        x, y = fwd(p['lon'], p['lat']); pt = Point(x, y)
        hit = [lots[i] for i in lt.query(pt) if lots[i].contains(pt)]
        lot_of.append(min(hit, key=lambda q: q.area) if hit else None)
    # two receivers on one lot
    by = collections.defaultdict(list)
    for p, L in zip(R, lot_of):
        if L is not None: by[L.wkb].append(p)
    shared = [v for v in by.values() if len(v) > 1]
    print(c, 'receivers', len(R), '| lots holding 2+ receivers', len(shared), collections.Counter(tuple(sorted(q['src'] for q in v)) for v in shared).most_common(12))
    # implied vs outline floor area
    rows = []
    for p, L in zip(R, lot_of):
        if p.get('src') not in ('vanBCA', 'vanGHGrep', 'edmAssess') or L is None: continue
        imp = p['fa'] if p.get('fa') else p['dem'] * 3.6 / 0.57
        fl = 0; unk = 0
        for i in bt.query(L):
            pg, h, ok = B[i]
            if L.contains(pg.representative_point()):
                if not ok or h <= 0: unk += pg.area
                fl += pg.area * max(1, round(max(h, 0) / 4))
        rows.append((imp / fl if fl else float('inf'), p, round(imp), round(fl), round(unk)))
    rat = sorted(r[0] for r in rows if math.isfinite(r[0]))
    q = lambda f: round(rat[int(len(rat) * f)], 2)
    print(c, 'implied / outline floor area: n', len(rat), 'median', q(.5), 'quartiles', q(.25), q(.75), '| over 3x', sum(1 for r in rat if r > 3), '| under 0.33x', sum(1 for r in rat if r < 0.33), '| no outline on lot', sum(1 for r in rows if not math.isfinite(r[0])))
    OUT[c] = rows
    for r in sorted(rows, key=lambda r: -r[0])[:15]:
        print('   high', round(r[0], 1) if math.isfinite(r[0]) else 'inf', r[1]['src'], r[1]['n'], 'implied', r[2], 'outline', r[3], 'unknown-height footprint', r[4])
    for r in sorted(rows, key=lambda r: r[0])[:6]:
        print('   low', round(r[0], 2), r[1]['src'], r[1]['n'], 'implied', r[2], 'outline', r[3])
json.dump({c: [[r[1]['n'], r[1]['src'], r[2], r[3], (round(r[0], 2) if math.isfinite(r[0]) else None)] for r in rows] for c, rows in OUT.items()},
          open(os.path.join(H, '..', 'audit', 'receiver_audit_2026-10-20.json'), 'w'))
