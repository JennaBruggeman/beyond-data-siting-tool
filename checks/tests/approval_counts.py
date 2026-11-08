"""F3 (CODE_JOB_F3_approval_map.md, 8 Nov 2026): lots per approval class, per city, for Municipal cards 1 and 2.
Lots = the property records in the tool's tiles (tool/tiles/<city>/t_*.json, field A; City open data), each id counted once, as job A1 counted them.
Class: permitted or conditional = the lots in checks/lot_types_2026-11-07.csv (job A1: zones in tool/data/zones.json that allow a data centre,
I-3 sub-area B left out; Edmonton re-counted 8 Nov to IH and EETC), classed by today's zone row (path); Direct Control (Edmonton DC, DC1, DC2, DC/...) = '?' (site
provisions not in the bylaw copy); every other lot with a zone on record = rezoning; no zone on record = not counted.
Writes tool/data/approval_counts.json (counts only: no ids, no geometry)."""
import csv, glob, json, os, sys
R = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
Z = json.load(open(os.path.join(R, 'tool', 'data', 'zones.json'), encoding='utf-8'))
A1 = {}
for r in csv.DictReader(open(os.path.join(R, 'checks', 'lot_types_2026-11-07.csv'), encoding='utf-8')):
    A1[(r['city'], r['key'])] = r['status']
def zkey(city, a): return str(a[1] or '').strip() if city == 'van' else str(a[2] or a[1] or '').strip().split(' ')[0].upper() if (a[2] or a[1]) else ''
out = {'_about': __doc__.strip().replace('\n', ' '), 'date': '8 Nov 2026'}
for city in ('van', 'edm'):
    rows = Z['ZV' if city == 'van' else 'ZE']; seen = set(); c = {'permitted': 0, 'conditional': 0, 'rezoning': 0, 'dc': 0, 'noZone': 0}
    for f in glob.glob(os.path.join(R, 'tool', 'tiles', city, 't_*.json')):
        for i, a in json.load(open(f, encoding='utf-8')).get('A', {}).items():
            if i in seen: continue
            seen.add(i); k = zkey(city, a)
            if (city, i) in A1:
                pth = rows.get(k, {}).get('path')   # the class from today's zone row (A1's Edmonton status predates the 8 Nov rule)
                c['rezoning' if pth == 'rezoning' else 'permitted' if pth == 'permitted' else 'conditional'] += 1
            elif not k or k == '?': c['noZone'] += 1
            elif city == 'edm' and k.startswith('DC'): c['dc'] += 1
            else: c['rezoning'] += 1
    c['lots'] = len(seen); out[city] = c; print(city, c)
json.dump(out, open(os.path.join(R, 'tool', 'data', 'approval_counts.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
