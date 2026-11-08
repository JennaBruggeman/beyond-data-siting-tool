"""Ground heights for one lot, step 2 of 2 (J.B. 7 Nov 2026, for Cowork's Ground and flood card).
City of Vancouver LiDAR 2022, ground points (class 2), 2 m cell means: the same rasters and the same cell rule as tool/make_grade.py (cells whose centres
fall inside the lot; register van_lidar2022_ground). Writes every cell centre in the lot frame of checks/tests/export_layout.js (u, v in metres) with its
height in metres, and the deciles (q0 … q100) as make_grade.py computes them. City open data: fine for the repo. Vertical datum: CGVD28 (GVRD), settled 8 Nov 2026 (header).
Usage: python -I export_ground.py <step1.json from export_ground.js> <lidar_ground2m folder> <out.json>"""
import json, sys, os, glob, importlib.util, datetime
import numpy as np, pyproj
from matplotlib.path import Path
here = os.path.dirname(os.path.abspath(__file__)); root = os.path.join(here, '..', '..')
spec = importlib.util.spec_from_file_location('mg', os.path.join(root, 'tool', 'make_grade.py')); mg = importlib.util.module_from_spec(spec); spec.loader.exec_module(mg)
S = json.load(open(sys.argv[1], encoding='utf-8')); folder = sys.argv[2]; out = sys.argv[3]
M = mg.Mosaic(sorted(glob.glob(os.path.join(folder, '*.npz'))))
ring = np.array(S['ring'], float).reshape(-1, 2)
c = mg.CITY['van']; lon, lat = mg.unproj(c)(ring[:, 0], ring[:, 1])
tr = pyproj.Transformer.from_crs(4326, 26910, always_xy=True); ux, uy = tr.transform(lon, lat); U = np.c_[ux, uy]
q = mg.lot_stats([U], M)                                   # the tool's deciles (dm) and cover %
R = M.R; x0, x1 = np.floor(U[:, 0].min() / R) * R, np.ceil(U[:, 0].max() / R) * R; y0, y1 = np.floor(U[:, 1].min() / R) * R, np.ceil(U[:, 1].max() / R) * R
gx, gy = np.meshgrid(np.arange(x0 + R / 2, x1, R), np.arange(y0 + R / 2, y1, R)); P = np.c_[gx.ravel(), gy.ravel()]
P = P[Path(U).contains_points(P)]; v = M.sample(P[:, 0], P[:, 1])
# UTM → lon/lat → the tool's world coordinates (inverse of make_grade.unproj) → the lot frame (affine from F.toL)
inv = pyproj.Transformer.from_crs(26910, 4326, always_xy=True); lo, la = inv.transform(P[:, 0], P[:, 1])
k = np.cos(np.radians(c['lat0'])) * 111320.0; wx = (np.asarray(lo) - c['lon0']) * k; wy = (np.asarray(la) - c['lat0']) * 110540.0
f = S['frame']; o = np.array(f['o']); ex = np.array(f['ex']) - o; ey = np.array(f['ey']) - o
uv = o + np.outer(wx, ex) + np.outer(wy, ey)
cells = [[round(float(a), 2), round(float(b), 2), (None if np.isnan(h) else round(float(h) / 10, 1))] for (a, b), h in zip(uv, v)]
res = {'lot': {'key': S['id'], 'address': '339 1st Ave E', 'area_m2': round(S['lotArea'], 1), 'frame': {'L': round(f['L'], 2), 'W': round(f['W'], 2), 'front': 'low u' if S['dir'] < 0 else 'high u', 'uFront': round(S['uFront'], 2)}},
  'source': {'id': 'van_lidar2022_ground', 'label': 'City of Vancouver LiDAR 2022 (open data), ground points (class 2), 2 m cell means, as tool/make_grade.py', 'url': 'https://webtransfer.vancouver.ca/opendata/2022LiDAR/', 'licence': 'City of Vancouver open data'},
  'datum': {'settled': True, 'value': 'CGVD28 (GVRD)', 'source': 'City of Vancouver Open Data, LiDAR 2022 dataset page, Coordinate system: "Vertical Datum: CGVD28GVRD"; Hz datum NAD 83 (CSRS) 4.0.0.BC.1.GVRD; '
    'read by J.B. on the portal 8 Nov 2026 (it blocks automated reading; not circumvented); trust 80; register van_lidar2022_ground; Claude Link lidar_datum_2026-11-08.md',
    'flood_level': 'VBBL 2025 Div. A 1.4.1.2: 4.6 m, Greater Vancouver Regional District datum (arch_hb_vbblFlood); that this is CGVD28 (GVRD) is our reading, so heights and the FCL share one scale'},
  'cell_m': R, 'rule': 'cells whose centres fall inside the lot (make_grade.py); height = mean of the class-2 ground points in the cell; cells with no point: null',
  'deciles_m': {f'q{10*i}': q[i] / 10 for i in range(11)} if q else None, 'cover_pct': q[11] if q else None,
  'tool_shows': S.get('grade'),
  'columns': ['u_m', 'v_m', 'height_m'], 'cells': cells,
  'made': {'date': datetime.date.today().isoformat(), 'by': 'checks/tests/export_ground.js + export_ground.py'}}
json.dump(res, open(out, 'w', encoding='utf-8', newline='\n'), ensure_ascii=False, indent=None, separators=(',', ':'))
print('cells', len(cells), 'deciles dm', q, 'u range', uv[:, 0].min().round(1), uv[:, 0].max().round(1), 'v range', uv[:, 1].min().round(1), uv[:, 1].max().round(1))
