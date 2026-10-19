#!/usr/bin/env python3
"""Transformer stations (substations) near each city, from NRCan CanVec 50K, Mines, Energy and Communication Networks (Res_MGT),
'transformer station' points and areas (Open Government Licence – Canada; files dated 24 Jul 2019, J.B. download 19 Oct 2026).
Shown as distances from the lot (J.B., 19 Oct 2026: public information). Coordinates in the tool's local metres."""
import json, math, os, shapefile
H = os.path.dirname(os.path.abspath(__file__)); R = os.path.join(H, '..', 'data', 'raw', 'canvec')
out = {'source': 'NRCan CanVec 50K Res_MGT transformer_station_0 (points) and _2 (areas), 2019; dates are the source map years', 'cities': {}}
for c, P in (('van', 'BC'), ('edm', 'AB')):
    m = json.load(open(os.path.join(H, 'tiles', c, 'meta.json'))); la0, lo0 = m['lat0'], m['lon0']; k = math.cos(math.radians(la0)) * 111320
    x0, y0, x1, y1 = m['ext']; pad = 3000; pts = []
    for kind in ('0', '2'):
        r = shapefile.Reader(os.path.join(R, P, 'transformer_station_' + kind))
        for sr in r.iterShapeRecords():
            g = sr.shape.points
            if kind == '0': lon, lat = g[0]; area = 0
            else:
                lon = sum(p[0] for p in g) / len(g); lat = sum(p[1] for p in g) / len(g)
                xs = [(p[0] - lo0) * k for p in g]; ys = [(p[1] - la0) * 110540 for p in g]
                area = abs(sum(xs[i] * ys[i + 1] - xs[i + 1] * ys[i] for i in range(len(g) - 1))) / 2
            x, y = (lon - lo0) * k, (lat - la0) * 110540
            if x0 - pad <= x <= x1 + pad and y0 - pad <= y <= y1 + pad:
                rec = sr.record; pts.append([round(x), round(y), round(area), str(rec['datemax'] or rec['datemin'])])
    pts.sort(key=lambda p: -p[2]); keep = []
    for p in pts:
        if all((p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 > 150 ** 2 for q in keep): keep.append(p)  # a point and an area 150 m apart or less: one station
    out["cities"][c] = keep; print(c, len(pts), "->", len(keep))
json.dump(out, open(os.path.join(H, 'substations.json'), 'w'), separators=(',', ':'))
