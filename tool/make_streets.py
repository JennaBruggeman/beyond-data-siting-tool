#!/usr/bin/env python3
"""Street centrelines → tool/streets_van.json and tool/streets_edm.json (local metres, the tiles' projection), for pipe routes along
streets, cost by surface, and street viewpoints for sight lines.
In: data/raw/van/public-streets.csv (City of Vancouver Open Data, Public streets; lanes not included) and
    data/raw/edm/Road_Network_20261016.csv (City of Edmonton Open Data, Road Network; roads and alleys, railways dropped).
Both J.B. downloads, 16 Oct 2026."""
import csv, json, math, os, re, collections, sys
csv.field_size_limit(sys.maxsize)
H = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(H)
def proj(city):
    m = json.load(open(os.path.join(H, 'tiles', city, 'meta.json'))); k = math.cos(math.radians(m['lat0'])) * 111320.0
    return lambda lo, la: [round((lo - m['lon0']) * k, 1), round((la - m['lat0']) * 110540.0, 1)]
def write(city, segs, classes, src):
    json.dump({'classes': classes, 'segs': segs, 'source': src}, open(os.path.join(H, f'streets_{city}.json'), 'w'), separators=(',', ':'))
    print(city, len(segs), 'segments', round(os.path.getsize(os.path.join(H, f'streets_{city}.json')) / 1024), 'KB')
# Vancouver: class = street use; all paved
P = proj('van'); CL = []; segs = []
for r in csv.DictReader(open(os.path.join(ROOT, 'data', 'raw', 'van', 'public-streets.csv'), encoding='utf-8-sig'), delimiter=';'):
    try: g = json.loads(r['Geom'])
    except Exception: continue
    u = r['STREETUSE'] or 'Unknown'
    if u not in CL: CL.append(u)
    for ln in ([g['coordinates']] if g['type'] == 'LineString' else g['coordinates'] if g['type'] == 'MultiLineString' else []):
        pts = [v for lo, la in ln for v in P(lo, la)]
        if len(pts) >= 4: segs.append([CL.index(u), 1] + pts)
write('van', segs, CL, 'City of Vancouver Open Data, Public streets (downloaded 16 Oct 2026); lanes not included')
# Edmonton: class from centreline type and functional class; paved flag from the surface description (unpaved gravel alleys = 0)
P = proj('edm'); CL = []; segs = []; cnt = collections.Counter()
def cls(r):
    if r['CENTERLINE_TYPE'] == 'Alley': return 'Alley'
    f = r['FUNCTIONAL_CLASS_CODE_DESCRIPTION'] or ''
    return 'Arterial' if f.startswith('Arterial') else 'Collector' if f.startswith('Collector') else 'Local' if f.startswith('Local') else 'Road'
for r in csv.DictReader(open(os.path.join(ROOT, 'data', 'raw', 'edm', 'Road_Network_20261016.csv'), encoding='utf-8-sig')):
    if r['CENTERLINE_TYPE'] not in ('Road', 'Alley'): continue
    if re.search(r'Ramp|Overpass|Bridge', r['ROAD_SEGMENT_TYPE_DESCRIPTION'] or ''): continue
    c = cls(r); cnt[c] += 1
    if c not in CL: CL.append(c)
    paved = 0 if re.search(r'Unpaved', r['ROAD_SEGMENT_TYPE_DESCRIPTION'] or '') or (r['SURFACE_LAYER_TYPE'] == 'Gravel') else 1
    for part in re.findall(r'\(([^()]+)\)', r['GEOMETRY'] or ''):
        pts = []
        for xy in part.split(','):
            a = xy.split()
            if len(a) >= 2: pts += P(float(a[0]), float(a[1]))
        if len(pts) >= 4: segs.append([CL.index(c), paved] + pts)
print(dict(cnt))
write('edm', segs, CL, 'City of Edmonton Open Data, Road Network (downloaded 16 Oct 2026); roads and alleys; ramps, overpasses and bridges dropped')
