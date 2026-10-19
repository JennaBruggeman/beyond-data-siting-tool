#!/usr/bin/env python3
"""EV charging stations → tool/ev_van.json, tool/ev_edm.json (M81, 18 Oct 2026).
In: data/raw/nrcan/alt_fuel_stations_2026-10-16.csv (BC) and _b.csv (Alberta), NRCan station locator exports (J.B. download 16 Oct 2026).
Kept: electric, open (Status Code E), Access Code "public", inside the tool's extent for each city (the extent of the earlier file).
Each point: [lat, lon, Level 2 ports, DC fast ports, flag]; flag 1 = open to Teslas only (from "Access Days Time")."""
import csv, json, os
H = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(H)
BOX = {'van': (49.19115, 49.31968, -123.25833, -123.0206), 'edm': (53.33596, 53.67218, -113.72958, -113.29395)}
FILES = {'van': 'alt_fuel_stations_2026-10-16.csv', 'edm': 'alt_fuel_stations_2026-10-16_b.csv'}
for c, fn in FILES.items():
    a0, a1, o0, o1 = BOX[c]; pts = []; drop = {'private': 0, 'not open': 0}
    for r in csv.DictReader(open(os.path.join(ROOT, 'data', 'raw', 'nrcan', fn), encoding='utf-8-sig')):
        if r['Fuel Type Code'] != 'ELEC': continue
        la, lo = float(r['Latitude']), float(r['Longitude'])
        if not (a0 <= la <= a1 and o0 <= lo <= o1): continue
        if r['Status Code'] != 'E': drop['not open'] += 1; continue
        if r['Access Code'] != 'public': drop['private'] += 1; continue
        n = lambda k: int(float(r[k])) if r[k] else 0
        pts.append([round(la, 5), round(lo, 5), n('EV Level2 EVSE Num'), n('EV DC Fast Count'), 1 if 'Teslas only' in (r['Access Days Time'] or '') else 0])
    json.dump({'date': '2026-10-16', 'src': 'nrcanEV2026', 'filter': 'open, public', 'pts': pts}, open(os.path.join(H, f'ev_{c}.json'), 'w'), separators=(',', ':'))
    print(c, len(pts), 'public open;', drop, 'tesla-only', sum(p[4] for p in pts), 'L2', sum(p[2] for p in pts), 'DC', sum(p[3] for p in pts))
