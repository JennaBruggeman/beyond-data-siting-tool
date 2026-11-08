#!/usr/bin/env python3
"""Street names for tool/streets_van.json (J.B., 8 Nov 2026): the street part of HBLOCK in the City of Vancouver Open Data file Public streets
(data/raw/van/public-streets.csv, J.B. download 16 Oct 2026; register vanStreets2026). The block range ('0-100 W 60TH AV' -> 'W 60TH AV') is dropped;
'UNNAMED ST' counts as no name. Adds 'names' (the list of street names) and 'nameOf' (per segment: index into names, or -1) to the existing file and
leaves 'segs' untouched. It replays make_streets.py's parsing and stops if any segment's geometry differs from the file. Lanes (appended after the
streets by make_streets.py) get -1. Edmonton: the Road Network file is not on this computer; the tool names its streets from fronting lot addresses."""
import csv, json, math, os, re, sys
H = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(H)
SRC = os.path.join(ROOT, 'data', 'raw', 'van', 'public-streets.csv'); OUT = os.path.join(H, 'streets_van.json')
m = json.load(open(os.path.join(H, 'tiles', 'van', 'meta.json'))); k = math.cos(math.radians(m['lat0'])) * 111320.0
P = lambda lo, la: [round((lo - m['lon0']) * k, 1), round((la - m['lat0']) * 110540.0, 1)]
d = json.load(open(OUT)); segs = d['segs']; CL = []; names = []; nameOf = []; i = 0
for r in csv.DictReader(open(SRC, encoding='utf-8-sig'), delimiter=';'):
    try: g = json.loads(r['Geom'])
    except Exception: continue
    u = r['STREETUSE'] or 'Unknown'
    if u not in CL: CL.append(u)
    nm = re.sub(r'^\d+(-\d+)?\s+', '', r['HBLOCK'].strip()).strip()
    if not nm or nm == 'UNNAMED ST': j = -1
    else:
        if nm not in names: names.append(nm)
        j = names.index(nm)
    for ln in ([g['coordinates']] if g['type'] == 'LineString' else g['coordinates'] if g['type'] == 'MultiLineString' else []):
        pts = [v for lo, la in ln for v in P(lo, la)]
        if len(pts) >= 4:
            if segs[i] != [CL.index(u), 1] + pts: sys.exit(f'segment {i} differs from streets_van.json: rebuild with make_streets.py first')
            nameOf.append(j); i += 1
nameOf += [-1] * (len(segs) - i)
d['names'] = names; d['nameOf'] = nameOf
d['source'] = d.get('source', '') + ' Street names: HBLOCK without the block range (City of Vancouver Open Data, Public streets, 16 Oct 2026 download).'
json.dump(d, open(OUT, 'w'), separators=(',', ':'))
print('streets', i, 'of', len(segs), 'segments;', sum(1 for x in nameOf if x >= 0), 'named;', len(names), 'names')
