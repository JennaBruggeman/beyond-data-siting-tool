#!/usr/bin/env python3
"""Per-lot corner and street grades for Vancouver (F2, J.B. 8 Nov 2026: step-free entrances and the Z&D s. 2 base surface need grades at points,
not the lot statistics of make_grade.py). Derived values only; plain Python (no numpy).
Source: City of Vancouver LiDAR 2022 ground points as 2 m cell means (lidar_ground2m/<E0>_<N0>.npz: ground_dm int16 decimetres, UTM 10N
EPSG:26910, res 2.0 m, row 0 = north edge; built on J.B.'s computer, see make_grade.py). Vertical datum CGVD28 (GVRD) per the City dataset
(register van_lidar2022_ground; Claude Link lidar_datum_2026-11-08.md), the FCL's datum. Missing cells stay null: nothing is filled in.
Lots: the Vancouver lots where a data centre is allowed (checks/lot_types_2026-11-07.csv, job A1), every part of a lot's tax coordinate.
Per lot, in the tool's local metres (tiles: lat0 49.25, lon0 -123.12):
  c: corners [x, y, z]: every ring vertex where the outline turns 20 degrees or more, z read 1.0 m inside toward the lot's centre (as Cowork's
     eh/grade/vg.py BaseSurface: Z&D s. 2 joins the grades at the corners of the site; existing grades used where official grades are not on file,
     our reading);
  e: edges [ax, ay, bx, by, [z at 1.5 m outside the edge at 0.1, 0.3, 0.5, 0.7, 0.9 of its length]] for every edge 2 m or longer: on a street
     edge these are the sidewalk grades the step-free rule (VBBL 3.8.3.2.(3)) compares the lobby floor with. LiDAR is in 0.1 m steps, so it
     cannot show 13 mm (spec rule 12).
Out: tool/data/grade_points_van.json. Usage: python make_grade_points.py <lidar_ground2m dir>"""
import csv, glob, io, json, math, os, struct, sys, zipfile
H = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(H)
LD = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'data', 'lidar_ground2m')
LAT0, LON0 = 49.25, -123.12; KX = math.cos(math.radians(LAT0)) * 111320.0
# UTM zone 10N, GRS80 (NAD83 CSRS; WGS84 differs by under a metre here): Kruger series
A_, F_ = 6378137.0, 1 / 298.257222101; N_ = F_ / (2 - F_); A2 = A_ / (1 + N_) * (1 + N_ ** 2 / 4 + N_ ** 4 / 64)
AL = [N_ / 2 - 2 * N_ ** 2 / 3 + 5 * N_ ** 3 / 16, 13 * N_ ** 2 / 48 - 3 * N_ ** 3 / 5, 61 * N_ ** 3 / 240]
E2 = F_ * (2 - F_); EP = math.sqrt(E2)
def utm(lon, lat, zone=10):
    l0 = math.radians(-183 + 6 * zone); ph = math.radians(lat); lam = math.radians(lon) - l0
    t = math.sinh(math.atanh(math.sin(ph)) - EP * math.atanh(EP * math.sin(ph)))
    xi = math.atan2(t, math.cos(lam)); eta = math.atanh(math.sin(lam) / math.sqrt(1 + t * t))
    E = eta + sum(AL[j] * math.cos(2 * (j + 1) * xi) * math.sinh(2 * (j + 1) * eta) for j in range(3))
    Nn = xi + sum(AL[j] * math.sin(2 * (j + 1) * xi) * math.cosh(2 * (j + 1) * eta) for j in range(3))
    return 500000 + 0.9996 * A2 * E, 0.9996 * A2 * Nn
def tool2utm(x, y): return utm(LON0 + x / KX, LAT0 + y / 110540.0)
TILES = {}
def tile(E, N):
    k = (int(E // 1000) * 1000, int(N // 1000) * 1000)
    if k in TILES: return TILES[k]
    p = os.path.join(LD, '%d_%d.npz' % k); TILES[k] = None
    if os.path.exists(p):
        z = zipfile.ZipFile(p); arr = {}
        for nm in z.namelist():
            b = z.read(nm); hl = struct.unpack('<H', b[8:10])[0] if b[6] == 1 else struct.unpack('<I', b[8:12])[0]; off = (10 if b[6] == 1 else 12) + hl
            hdr = b[off - hl:off].decode('latin-1'); arr[nm[:-4]] = (hdr, b[off:])
        h, raw = arr['ground_dm']; shape = tuple(int(s) for s in h.split("'shape': (")[1].split(')')[0].split(',') if s.strip())
        assert "'descr': '<i2'" in h and "'fortran_order': False" in h, h
        FMT = {'<f8': '<d', '<f4': '<f', '<i8': '<q', '<i4': '<i'}
        sc = lambda nm: struct.unpack(FMT[arr[nm][0].split("'descr': '")[1][:3]], arr[nm][1][:struct.calcsize(FMT[arr[nm][0].split("'descr': '")[1][:3]])])[0]
        TILES[k] = (raw, shape, float(sc('x0')), float(sc('y0')), float(sc('res')))
    return TILES[k]
def z_at(x, y):
    E, N = tool2utm(x, y); t = tile(E, N)
    if not t: return None
    raw, (nr, nc), x0, y0, res = t; c = int((E - x0) // res); r = int(nr - 1 - (N - y0) // res)
    if not (0 <= r < nr and 0 <= c < nc): return None
    v = struct.unpack_from('<h', raw, 2 * (r * nc + c))[0]
    return None if v <= -9000 else v / 10.0
def dec(a, ox, oy, q):
    out, x, y = [], 0.0, 0.0
    for i in range(0, len(a), 2): x += a[i]; y += a[i + 1]; out.append((ox + x / q, oy + y / q))
    return out
want = {r['key'] for r in csv.DictReader(open(os.path.join(ROOT, 'checks', 'lot_types_2026-11-07.csv'), encoding='utf-8')) if r['city'] == 'van'}
meta = json.load(open(os.path.join(H, 'tiles', 'van', 'meta.json'))); q = meta['Q']; parts = {}
for f in sorted(glob.glob(os.path.join(H, 'tiles', 'van', 't_*.json'))):
    t = json.load(open(f)); ox, oy = t['o']
    for pid, a in t.get('P', []):
        if str(pid) in want: parts.setdefault(str(pid), []).append(dec(a, ox, oy, q))
out = {'_about': __doc__.split('\n')[0] + ' See tool/make_grade_points.py. Units: m, CGVD28 (GVRD); positions in the tool\'s local metres.', 'src': 'van_lidar2022_ground', 'lots': {}}
nz = nn = 0
for pid, rings in parts.items():
    allp = [p for r in rings for p in r]; cx = sum(p[0] for p in allp) / len(allp); cy = sum(p[1] for p in allp) / len(allp); C, Ed = [], []
    for r in rings:
        R = r[:-1] if r[0] == r[-1] else r; n = len(R)
        for i in range(n):
            a, b, c = R[i - 1], R[i], R[(i + 1) % n]
            d1 = math.atan2(b[1] - a[1], b[0] - a[0]); d2 = math.atan2(c[1] - b[1], c[0] - b[0]); turn = abs((d2 - d1 + math.pi) % (2 * math.pi) - math.pi)
            if math.degrees(turn) >= 20:
                dx, dy = cx - b[0], cy - b[1]; L = math.hypot(dx, dy) or 1; z = z_at(b[0] + dx / L, b[1] + dy / L)
                C.append([round(b[0], 2), round(b[1], 2), z]); nn += 1; nz += z is None
        area = sum(R[i][0] * R[(i + 1) % n][1] - R[(i + 1) % n][0] * R[i][1] for i in range(n)) / 2; s = 1 if area > 0 else -1
        for i in range(n):
            a, b = R[i], R[(i + 1) % n]; L = math.hypot(b[0] - a[0], b[1] - a[1])
            if L < 2: continue
            ox_, oy_ = s * (b[1] - a[1]) / L, -s * (b[0] - a[0]) / L   # outward normal (counter-clockwise ring: right of the edge)
            zs = [z_at(a[0] + (b[0] - a[0]) * f + ox_ * 1.5, a[1] + (b[1] - a[1]) * f + oy_ * 1.5) for f in (0.1, 0.3, 0.5, 0.7, 0.9)]
            Ed.append([round(a[0], 2), round(a[1], 2), round(b[0], 2), round(b[1], 2), zs])
    out['lots'][pid] = {'c': C, 'e': Ed}
json.dump(out, open(os.path.join(H, 'data', 'grade_points_van.json'), 'w'), separators=(',', ':'))
print('lots', len(out['lots']), 'of', len(want), 'corners', nn, 'without LiDAR', nz, round(os.path.getsize(os.path.join(H, 'data', 'grade_points_van.json')) / 1024), 'KB')
