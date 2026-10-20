#!/usr/bin/env python3
"""One lot, one count (J.B. 20 Oct 2026: "check them all. everything could be double counting"). Run after make_bigrecv.py. Same rules in both cities.
Lots: Vancouver City parcels (data/vancouver_parcels_2026.geojson); Edmonton lot outlines (tiles/edm/l_*.json, Altalis via EPSB).
  1. An assessment estimate (vanBCA, edmAssess) on the same lot as a named receiver with its own figure (a measured building, non-market housing,
     a care home, a hospital, a campus) is the same building counted twice: the estimate is dropped. Found 20 Oct: Mount Saint Joseph (3080 Prince
     Edward St), BC Children's (4480 Oak St), Misericordia (16940 87 Ave NW), Alberta Hospital Edmonton (17480 Fort Road NW).
  2. A school on the same lot as an assessment estimate rents space in that building: flagged a tenant (no figure of its own); the estimate counts the building.
  3. Two named records with the same name on one lot are one place: kept once (the first by source order below), the other name in 'aka'.
     Found 20 Oct: Columbus Residence (non-market housing and a licensed care home), Vancouver East Co-op and Mole Hill (repeated records).
  4. An estimate at the address of a StatCan ODHF hospital or care facility is that facility: dropped.
Two different named buildings on one big lot (Skeena Terrace, MacLean Park phases, a university's lot) are left as they are."""
import json, os, glob, math, re, collections
from shapely.geometry import Polygon, Point, shape
from shapely.strtree import STRtree
H = os.path.dirname(os.path.abspath(__file__)); D = os.path.join(H, '..', 'data')
CITY = {'van': dict(lat0=49.25, lon0=-123.12), 'edm': dict(lat0=53.54, lon0=-113.50)}
EST = {'vanBCA', 'edmAssess'}
OWN = {'vanGHGrep', 'vanNMH', 'bcCare', 'abCare', 'odhf'}  # sources whose record is the building itself, with its own figure
PRI = ['vanGHGrep', 'vanNMH', 'bcCare', 'abCare', 'odhf', 'bcPSI', 'abPSI', 'odef', 'odsrf', 'vanBCA', 'edmAssess']
def dec(r, ox, oy):
    pts = []; x = y = None
    for i in range(0, len(r), 2):
        if x is None: x, y = r[i], r[i + 1]
        else: x += r[i]; y += r[i + 1]
        pts.append((ox + x / 2, oy + y / 2))
    return pts
nm = lambda s: re.sub(r'[^a-z0-9]', '', (s or '').lower())
# 4. address match: an estimate whose address is a StatCan ODHF hospital or care address (the points can sit on different lots: Mount Saint Joseph)
AB = {'street': 'st', 'avenue': 'ave', 'road': 'rd', 'drive': 'dr', 'boulevard': 'blvd', 'crescent': 'cres', 'place': 'pl', 'trail': 'trl'}
def addr(s):
    w = [AB.get(x, x) for x in re.sub(r'[^a-z0-9 ]', ' ', (s or '').lower()).split() if x not in ('nw', 'sw', 'ne', 'se', 'w', 'e')]
    return ' '.join(w) if w and w[0].isdigit() else None
import csv
ODHF = collections.defaultdict(set)
for r in csv.DictReader(open(os.path.join(D, 'raw', 'receivers', 'x', 'odhf_v1.csv'), encoding='latin-1')):
    cc = {'Vancouver': 'van', 'Edmonton': 'edm'}.get(r['CSDname'])
    if cc and r['odhf_facility_type'] in ('Hospitals', 'Nursing and residential care facilities'):
        a2 = addr(f"{r['street_no']} {r['street_name']}")
        if a2: ODHF[cc].add(a2)
for c, P in CITY.items():
    k = math.cos(math.radians(P['lat0'])) * 111320.0; fwd = lambda lo, la: ((lo - P['lon0']) * k, (la - P['lat0']) * 110540.0)
    lots = []
    if c == 'van':
        for ft in json.load(open(os.path.join(D, 'vancouver_parcels_2026.geojson'), encoding='utf-8'))['features']:
            g = shape(ft['geometry']); g = g if g.geom_type == 'Polygon' else max(g.geoms, key=lambda q: q.area)
            lots.append(Polygon([fwd(x, y) for x, y in g.exterior.coords]))
    else:
        for f in glob.glob(os.path.join(H, 'tiles', 'edm', 'l_*.json')):
            d = json.load(open(f)); ox, oy = d['o']
            for a, ids in d['L']:
                pts = dec(a, ox, oy)
                if len(pts) > 2: lots.append(Polygon(pts))
    lt = STRtree(lots)
    path = os.path.join(H, 'tiles', c, 'receivers.json'); Dj = json.load(open(path)); R = Dj['pts']
    by = collections.defaultdict(list)
    for i, p in enumerate(R):
        pt = Point(*fwd(p['lon'], p['lat'])); h = [j for j in lt.query(pt) if lots[j].contains(pt)]
        if h: by[min(h, key=lambda j: lots[j].area)].append(i)
    drop, n1, n2, n3 = set(), 0, 0, 0
    for idx in by.values():
        if len(idx) < 2: continue
        G = [R[i] for i in idx]
        own = [p for p in G if p.get('src') in OWN or p['t'] in ('hospital', 'campus')]
        for i in idx:
            p = R[i]
            if p.get('src') in EST and own: drop.add(i); n1 += 1
        if any(R[i].get('src') in EST and i not in drop for i in idx):
            for i in idx:
                p = R[i]
                if p['t'] == 'school' and not p.get('ten'): p['ten'] = 1; p.pop('fa', None); p['tenOf'] = 'an assessed building on the same lot'; n2 += 1
        names = collections.defaultdict(list)
        for i in idx:
            if i not in drop and nm(R[i].get('n')): names[nm(R[i]['n'])].append(i)
        for same in names.values():
            if len(same) < 2: continue
            same.sort(key=lambda i: PRI.index(R[i].get('src')) if R[i].get('src') in PRI else 99); keep = R[same[0]]
            for i in same[1:]:
                keep['aka'] = sorted(set(keep.get('aka', [])) | {f"{R[i]['n']} ({R[i].get('src')})"}); drop.add(i); n3 += 1
    n4 = 0
    for i, p in enumerate(R):
        if i not in drop and p.get('src') in EST and addr(p.get('n')) in ODHF[c]: drop.add(i); n4 += 1
    print(c, 'estimates at a hospital or care-home address (StatCan ODHF):', n4)
    Dj['pts'] = [p for i, p in enumerate(R) if i not in drop]
    json.dump(Dj, open(path, 'w'), ensure_ascii=False, separators=(',', ':'))
    json.dump(Dj['pts'], open(os.path.join(H, f'receivers_{c}.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
    print(c, 'estimates dropped (building already listed):', n1, '| schools made tenants:', n2, '| same-name repeats merged:', n3, '| receivers now', len(Dj['pts']))
