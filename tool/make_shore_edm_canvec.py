#!/usr/bin/env python3
"""Edmonton river edge for tool/shore.json from NRCan CanVec 50K Hydro, Alberta (8 Nov 2026, J.B.: replaces the Altalis/EPSB river outline,
which is not for redistribution). Open Government Licence – Canada (register canvecHydroAB).
In:  canvec_50K_AB_Hydro/waterbody_2.shp, .shx, .dbf (J.B. download 19 Oct 2026, Claude Link canvec_50K_AB_Hydro_shp.zip; extracted outside the repo),
     path given as the first argument. tool/shore.json (its Vancouver part is kept as it is: CanVec BC, make_shore.py).
Out: tool/shore.json with lines.edm, kinds.edm and src.edm replaced.
Near Edmonton CanVec gives the river's water polygons no name (definition 'Not Identified') and cuts them at map-sheet edges; the river's name
is on its flow lines (water_linear_flow_1_2, name 'North Saskatchewan River'). Kept: every outer ring of a permanent waterbody polygon, within 30 km
of the tool's Edmonton centre, that a named North Saskatchewan River flow line has a vertex inside (our rule); islands (holes) skipped; split where
the ring leaves the 30 km circle; simplified to 5 m (as make_shore.py). CanVec cuts polygons at map-sheet edges; those cuts lie in the water, so the distance from a site on land to the nearest
edge is still the distance to the water. Plain readers for .shp (polygon) and .dbf, no GIS library."""
import json, math, os, struct, sys
H = os.path.dirname(os.path.abspath(__file__))
D = sys.argv[1] if len(sys.argv) > 1 else os.path.join(H, '..', 'data', 'raw', 'hydro', 'canvec_50K_AB_Hydro')
meta = json.load(open(os.path.join(H, 'tiles', 'edm', 'meta.json')))
k = math.cos(math.radians(meta['lat0'])) * 111320.0
fwd = lambda lon, lat: ((lon - meta['lon0']) * k, (lat - meta['lat0']) * 110540.0)
R = 30000.0; lonR = R / k + 0.05; latR = R / 110540.0 + 0.05
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
# dbf header
dbf = open(os.path.join(D, 'waterbody_2.dbf'), 'rb'); h = dbf.read(32); nrec, hlen, rlen = struct.unpack('<IHH', h[4:12]); fields = []; off = 1
while True:
    f = dbf.read(32)
    if f[0] == 0x0D: break
    nm = f[:11].split(b'\0')[0].decode(); ln = f[16]; fields.append((nm, off, ln)); off += ln
FI = {n: (o, l) for n, o, l in fields}
def rec(i, names):
    dbf.seek(hlen + i * rlen); r = dbf.read(rlen); return {n: r[FI[n][0]:FI[n][0] + FI[n][1]].decode('utf-8', 'replace').strip() for n in names}
shx = open(os.path.join(D, 'waterbody_2.shx'), 'rb').read(); shp = open(os.path.join(D, 'waterbody_2.shp'), 'rb')
n = (len(shx) - 100) // 8; NAMES = ['definit_en', 'perm_en', 'name_en', 'namerv1en', 'namerv2en', 'namelk1en', 'namelk2en', 'feature_id', 'datemin', 'datemax']
# the named flow lines: vertices of every North Saskatchewan River line within the search box
fdbf = open(os.path.join(D, 'water_linear_flow_1_2.dbf'), 'rb'); fh = fdbf.read(32); fn_, fhl, frl = struct.unpack('<IHH', fh[4:12]); FF = {}; fo = 1
while True:
    f = fdbf.read(32)
    if f[0] == 0x0D: break
    FF[f[:11].split(b'\0')[0].decode()] = (fo, f[16]); fo += f[16]
NMF = [x for x in FF if 'name' in x and x.endswith('en')]
fshx = open(os.path.join(D, 'water_linear_flow_1_2.shx'), 'rb').read(); fshp = open(os.path.join(D, 'water_linear_flow_1_2.shp'), 'rb'); FLOW = []
for i in range((len(fshx) - 100) // 8):
    o, _ = struct.unpack('>ii', fshx[100 + 8 * i:108 + 8 * i]); fshp.seek(o * 2 + 8); hdr = fshp.read(44); x0, y0, x1, y1 = struct.unpack('<4d', hdr[4:36])
    if x1 < meta['lon0'] - lonR or x0 > meta['lon0'] + lonR or y1 < meta['lat0'] - latR or y0 > meta['lat0'] + latR: continue
    fdbf.seek(fhl + i * frl); r = fdbf.read(frl)
    if not any('North Saskatchewan River' in r[FF[x][0]:FF[x][0] + FF[x][1]].decode('utf-8', 'replace') for x in NMF): continue
    npart, npt = struct.unpack('<2i', hdr[36:44]); fshp.read(4 * npart); pts = struct.unpack('<%dd' % (2 * npt), fshp.read(16 * npt))
    FLOW += [(pts[2 * j], pts[2 * j + 1]) for j in range(npt)]
def pip(x, y, r):
    c = False
    for j in range(len(r) - 1):
        (xi, yi), (xj, yj) = r[j], r[j + 1]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi: c = not c
    return c
rings, kept = [], []
for i in range(n):
    o, _ = struct.unpack('>ii', shx[100 + 8 * i:108 + 8 * i]); shp.seek(o * 2 + 8)
    hdr = shp.read(44); st = struct.unpack('<i', hdr[:4])[0]
    if st != 5: continue
    x0, y0, x1, y1 = struct.unpack('<4d', hdr[4:36])
    if x1 < meta['lon0'] - lonR or x0 > meta['lon0'] + lonR or y1 < meta['lat0'] - latR or y0 > meta['lat0'] + latR: continue
    a = rec(i, NAMES)
    if a.get('perm_en', 'Permanent') != 'Permanent': continue
    if not any(x0 <= fx <= x1 and y0 <= fy <= y1 for fx, fy in FLOW): continue
    npart, npt = struct.unpack('<2i', hdr[36:44]); parts = struct.unpack('<%di' % npart, shp.read(4 * npart)); pts = struct.unpack('<%dd' % (2 * npt), shp.read(16 * npt))
    P = [(pts[2 * j], pts[2 * j + 1]) for j in range(npt)]; kept.append(a)
    bounds = list(parts) + [npt]
    for q in range(npart):
        ring = P[bounds[q]:bounds[q + 1]]
        area = sum(ring[j][0] * ring[j + 1][1] - ring[j + 1][0] * ring[j][1] for j in range(len(ring) - 1))
        if area > 0: continue  # shapefile outer rings are clockwise (negative signed area); holes (islands) are skipped
        bx = [p[0] for p in ring]; by = [p[1] for p in ring]
        if not any(min(bx) <= fx <= max(bx) and min(by) <= fy <= max(by) and pip(fx, fy, ring) for fx, fy in FLOW): continue  # a lake in the same multipart polygon
        rings.append([fwd(lon, lat) for lon, lat in ring])
runs = []
for r in rings:
    cur = []
    for p in r:
        if math.hypot(*p) <= R: cur.append(p)
        elif cur: runs.append(cur); cur = []
    if cur: runs.append(cur)
lines = []
for r in runs:
    if len(r) < 2: continue
    if r[0] == r[-1] and len(r) > 3: h2 = len(r) // 2; s = dp(r[:h2 + 1], 5.0)[:-1] + dp(r[h2:], 5.0)
    else: s = dp(r, 5.0)
    lines.append([round(v, 1) for p in s for v in p])
out = json.load(open(os.path.join(H, 'shore.json')))
out['lines']['edm'] = lines; out['kinds']['edm'] = ['river'] * len(lines)
dates = sorted({x for a in kept for x in (a['datemin'][:8], a['datemax'][:8]) if x})
out['src']['edm'] = ('North Saskatchewan River outline: NRCan CanVec 50K Hydro, Alberta (permanent waterbody polygons that the named North Saskatchewan River flow lines run through, our rule; source dates '
                     + (dates[0] + '–' + dates[-1] if dates else '?') + '), Open Government Licence – Canada, downloaded 19 Oct 2026')
json.dump(out, open(os.path.join(H, 'shore.json'), 'w'), separators=(',', ':'))
print('polygons', len(kept), 'rings', len(rings), 'runs', len(lines), 'points', sum(len(r) // 2 for r in lines), 'dates', dates[:1], dates[-1:], round(os.path.getsize(os.path.join(H, 'shore.json')) / 1024), 'KB')
