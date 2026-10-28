"""Builds checks/sweep/open_items.csv: decisions for J.B. (listed below) plus every source whose text still carries a '?'
or whose triage status says unconfirmed. Rerun after each batch."""
import json, re, csv, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
r = json.load(open(R / 'register/formula_register.json'))
tri = {x['id']: x for x in csv.DictReader(open(R / 'checks/sweep/triage_2026-10-27.csv'))}
DEC = [
]
srcs = {**r['old_sources'], **r['new_sources']}
rows = [d + ['open'] for d in DEC]; seen = {d[0] for d in DEC}
for i, t in srcs.items():
    if i in seen: continue
    hits = [h.strip(' ;,') for h in re.findall(r'\(\?[^)]*\)|[^;,(—]{0,80}\?\s*\)?', t) if '?' in h and 'http' not in h]
    st = tri.get(i, {}).get('status', '')
    if hits or re.search(r'unconfirmed|not confirmed|could not read|single check:|^single check', st):
        rows.append([i, 'source ?', (' | '.join(hits)[:400] or st), st, 'open'])
with open(R / 'checks/sweep/open_items.csv', 'w', newline='') as f:
    w = csv.writer(f); w.writerow(['id', 'type', 'what is open', 'where found', 'status']); w.writerows(rows)
print(len(DEC), 'decisions;', len(rows) - len(DEC), 'sources with ?')
