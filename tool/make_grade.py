#!/usr/bin/env python3
"""Ground elevation per lot (Beyond Data, 4 Nov 2026).

Vancouver: City of Vancouver LiDAR 2022, ground points (class 2), as 2 m cell means made on J.B.'s computer
  (data/lidar_ground2m/<x>_<y>.npz: ground_dm int16 decimetres, x0/y0 = tile SW corner, UTM 10N EPSG:26910, res 2.0 m;
  row 0 is the NORTH edge: checked against 339 1st Ave E, see checks/agents/2026-11-04_elev_redraw.md).
  Register: van_lidar2022_ground. Vertical datum of the City LAS: not confirmed (?).
Edmonton: NRCan HRDEM (CanElevation), only where a DTM file is in data/raw/edm/hrdem/ (see the report). Datum CGVD2013.
  Register: nrcan_hrdem.

For every lot: the 2 m cells whose centres fall inside the lot (all parts of a tax coordinate together).
Output (tool/tiles/, not in git; rebuild with this script):
  van/g_<i>_<j>.json  {"src":..., "u":"dm", "G": {lot id: [q0,q10,...,q100 (dm), cover %]}}
  q0 = min, q10 = p10, q50 = median, q100 = max (of cell means, our arithmetic). cover = share of the lot's cells that have LiDAR.
Lots with no LiDAR cell are left out (the tool shows "?")."""
import json, os, sys, glob, math, collections
import numpy as np, pyproj
from matplotlib.path import Path

H = os.path.dirname(os.path.abspath(__file__)); D = os.path.join(H, '..', 'data'); TL = os.path.join(H, 'tiles')
CITY = {'van': dict(lat0=49.25, lon0=-123.12), 'edm': dict(lat0=53.54, lon0=-113.50)}

def unproj(c):
    k = math.cos(math.radians(c['lat0'])) * 111320.0
    return lambda x, y: (c['lon0'] + np.asarray(x) / k, c['lat0'] + np.asarray(y) / 110540.0)

def dec(a, ox, oy, q):
    a = np.asarray(a, dtype=float).reshape(-1, 2).cumsum(0) / q
    return a + [ox, oy]

class Mosaic:
    """1 km rasters keyed by SW corner; row 0 = north edge."""
    def __init__(self, files, key='ground_dm'):
        self.t = {}
        for f in files:
            z = np.load(f); self.t[(int(z['x0']), int(z['y0']))] = (z[key], float(z['res']))
        r = {v[1] for v in self.t.values()}; assert len(r) == 1; self.R = r.pop(); self.N = int(round(1000 / self.R))
    def sample(self, px, py):
        """cell values (decimetres) at points; NaN where no tile."""
        out = np.full(px.shape, np.nan)
        kx = (np.floor(px / 1000) * 1000).astype(int); ky = (np.floor(py / 1000) * 1000).astype(int)
        for k in set(zip(kx.tolist(), ky.tolist())):
            if k not in self.t: continue
            g, R = self.t[k]; m = (kx == k[0]) & (ky == k[1])
            c = ((px[m] - k[0]) / R).astype(int); r = (self.N - 1 - ((py[m] - k[1]) / R).astype(int))
            out[m] = g[np.clip(r, 0, self.N - 1), np.clip(c, 0, self.N - 1)]
        return out

def lot_stats(rings_utm, M):
    allx = np.concatenate([r[:, 0] for r in rings_utm]); ally = np.concatenate([r[:, 1] for r in rings_utm]); R = M.R
    x0, x1 = math.floor(allx.min() / R) * R, math.ceil(allx.max() / R) * R
    y0, y1 = math.floor(ally.min() / R) * R, math.ceil(ally.max() / R) * R
    xs = np.arange(x0 + R / 2, x1, R); ys = np.arange(y0 + R / 2, y1, R)
    if not len(xs) or not len(ys): return None
    gx, gy = np.meshgrid(xs, ys); P = np.c_[gx.ravel(), gy.ravel()]
    ins = np.zeros(len(P), bool)
    for r in rings_utm: ins |= Path(r).contains_points(P)
    if not ins.any(): return None
    v = M.sample(P[ins, 0], P[ins, 1]); have = ~np.isnan(v)
    if not have.any(): return None
    q = np.percentile(v[have], np.arange(0, 101, 10))
    return [int(round(x)) for x in q] + [int(round(100 * have.sum() / len(v)))]

def van():
    M = Mosaic(sorted(glob.glob(os.path.join(D, 'lidar_ground2m', '*.npz'))))
    meta = json.load(open(os.path.join(TL, 'van', 'meta.json'))); q = meta['Q']
    up = unproj(CITY['van']); tr = pyproj.Transformer.from_crs(4326, 26910, always_xy=True)
    parts = collections.defaultdict(list); where = collections.defaultdict(set)
    for f in sorted(glob.glob(os.path.join(TL, 'van', 't_*.json'))):
        key = os.path.basename(f)[2:-5]; t = json.load(open(f)); ox, oy = t['o']
        P = t.get('P', [])
        if not P: continue
        rs = [dec(a, ox, oy, q) for _, a in P]; allr = np.concatenate(rs)
        lon, lat = up(allr[:, 0], allr[:, 1]); ux, uy = tr.transform(lon, lat); U = np.c_[ux, uy]; i = 0
        for (pid, _), r in zip(P, rs):
            parts[str(pid)].append(U[i:i + len(r)]); where[str(pid)].add(key); i += len(r)
    G = {}; n = 0
    for pid, rs in parts.items():
        s = lot_stats(rs, M); n += 1
        if s: G[pid] = s
    by = collections.defaultdict(dict)
    for pid, s in G.items():
        for k in where[pid]: by[k][pid] = s
    for k in {k for v in where.values() for k in v}:
        json.dump({'src': 'van_lidar2022_ground', 'u': 'dm', 'G': by.get(k, {})}, open(os.path.join(TL, 'van', f'g_{k}.json'), 'w'), separators=(',', ':'))
    print('van lots', n, 'with grade', len(G))

def edm():
    files = sorted(glob.glob(os.path.join(D, 'raw', 'edm', 'hrdem', '*.npz')))
    if not files: print('edm: no HRDEM files in data/raw/edm/hrdem (grade "?")'); return
    # expected layout (not yet made, ?): HRDEM DTM cut into 1 km .npz blocks like the Vancouver files (ground_dm, x0, y0, res), NAD83(CSRS) UTM 12N, EPSG:2956
    M = Mosaic(files)
    meta = json.load(open(os.path.join(TL, 'edm', 'meta.json'))); q = meta['Q']
    up = unproj(CITY['edm']); tr = pyproj.Transformer.from_crs(4326, 2956, always_xy=True)
    by = collections.defaultdict(dict); n = 0
    for f in sorted(glob.glob(os.path.join(TL, 'edm', 'l_*.json'))):
        key = os.path.basename(f)[2:-5]; l = json.load(open(f)); lx, ly = l['o']
        for a, ids in l['L']:
            r = dec(a, lx, ly, q); lon, lat = up(r[:, 0], r[:, 1]); ux, uy = tr.transform(lon, lat)
            s = lot_stats([np.c_[ux, uy]], M)
            if s:
                n += 1
                for i in ids: by[key][str(i)] = s
    for k, G in by.items():
        json.dump({'src': 'nrcan_hrdem', 'u': 'dm', 'G': G}, open(os.path.join(TL, 'edm', f'g_{k}.json'), 'w'), separators=(',', ':'))
    print('edm lots with grade', n)

if __name__ == '__main__':
    for c in (sys.argv[1:] or ['van', 'edm']): {'van': van, 'edm': edm}[c]()
