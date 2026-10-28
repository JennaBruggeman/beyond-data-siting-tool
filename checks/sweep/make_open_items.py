"""Builds checks/sweep/open_items.csv: decisions for J.B. (listed below) plus every source whose text still carries a '?'
or whose triage status says unconfirmed. Rerun after each batch."""
import json, re, csv, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
r = json.load(open(R / 'register/formula_register.json'))
tri = {x['id']: x for x in csv.DictReader(open(R / 'checks/sweep/triage_2026-10-27.csv'))}
DEC = [
 ['edmTaxRates2026', 'J.B. can check', 'Find the 2026 Edmonton property tax bylaw (non-residential rates)', 'B2'],
 ['dellR760', 'needs source', 'Server weight 36.1 kg is not in the cited LCA; find a Dell spec sheet', 'B3'],
 ['cusp', 'needs source', 'CUSP 6% energy-poverty threshold: website gone; find the CUSP report or use StatCan 10% only', 'B3'],
 ['abDataCentreLevy', 'J.B. can check', 'Off-grid rate R (0%?) after Bill 17: read the consolidated Corporate Tax Act Part 9.1', 'B3'],
 ['schneiderUPS2020', 'needs source', 'Schneider UPS blog logged at a thegreengrid.org URL; find the right link', 'C trace'],
 ['bchTariff2026', 'J.B. can check', 'BC Hydro rate figures (LGS 29.99 ¢/day, $13.83/kW, 6.79 ¢/kWh; RS 1830) not read by either check: read them in your downloaded Electric Tariff', 'B4'],
 ['edmPermitsDC2026', 'J.B. can check', 'Edmonton permit floor areas may be ft², not m² (some are exact conversions); open a few permits to confirm the unit', 'B12'],
 ['edmParcel', 'J.B. can check', 'Unreachable for both checks', 'B1'],
 ['bcAssess2026', 'J.B. can check', 'BC Assessment page blocked (check it on the Abacus page yourself)', 'B1'],
 ['bytes2heat', 'needs source', 'Unreachable', 'B1'],
 ['F-01..F-05', 'display fix', 'Open display fixes from the tool review (F-04 CLARK page error)', 'tool'],
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
