#!/usr/bin/env python3
"""NRCan municipal PV potential, monthly kWh/kWp for Vancouver and Edmonton (vertical, latitude tilt, horizontal) → tool/nrcan_pv.json.
In: data/raw/nrcan/municip_potentiel-potential.csv (J.B. download, 15 Oct 2026). Public NRCan data."""
import csv, json, os
H = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(H)
out = {}
for x in csv.reader(open(os.path.join(ROOT, 'data', 'raw', 'nrcan', 'municip_potentiel-potential.csv'), encoding='latin-1')):
    if len(x) > 8 and x[1] in ('Vancouver', 'Edmonton') and not x[2].startswith('Annual'):
        k = 'van' if x[1] == 'Vancouver' else 'edm'; o = out.setdefault(k, {'vertical': [], 'latitude': [], 'horizontal': []})
        o['vertical'].append(int(x[3])); o['latitude'].append(int(x[4])); o['horizontal'].append(int(x[8]))
assert all(len(v['latitude']) == 12 for v in out.values()), out
out['source'] = 'NRCan, Photovoltaic potential and solar resource maps of Canada — municipal values (kWh per kWp, monthly; performance ratio 0.75)'
json.dump(out, open(os.path.join(H, 'nrcan_pv.json'), 'w'), separators=(',', ':')); print({k: sum(v['latitude']) for k, v in out.items() if k != 'source'})
