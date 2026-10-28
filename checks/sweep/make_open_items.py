"""Builds checks/sweep/open_items.csv: decisions for J.B. (listed below) plus every source whose text still carries a '?'
or whose triage status says unconfirmed. Rerun after each batch."""
import json, re, csv, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
r = json.load(open(R / 'register/formula_register.json'))
tri = {x['id']: x for x in csv.DictReader(open(R / 'checks/sweep/triage_2026-10-27.csv'))}
DEC = [
 ['hollandSnow', 'decision', 'Area: 690,000 ft² (web page) vs about 1,050,000 ft² (City fact sheet)', 'B2'],
 ['vanISMP2014', 'decision', '$10,000 / 15 m³ may be a rainwater-harvesting system, not a detention tank', 'B2'],
 ['portPER2025', 'decision', 'Category C review time 60–120 or 120–170 business days; 100 m pipeline threshold', 'B2'],
 ['caAbMOU2026', 'decision', 'TIER price path: $130 in 2035 vs $115 (2030) and $130 effective target in 2040', 'B2'],
 ['edmBylaw18100', 'decision', 'Cite Bylaw 19627 instead (18100 possibly repealed)', 'B2'],
 ['edmTaxRates2026', 'J.B. can check', 'Find the 2026 Edmonton property tax bylaw (non-residential rates)', 'B2'],
 ['nrcSeismic2020', 'decision', 'seismic_sa02 uses unverified proposed 2020 values (Vancouver 0.848, Edmonton 0.103); take final values from the NRCan 2020 seismic hazard tool for both sites', 'B3'],
 ['dellR760', 'needs source', 'Server weight 36.1 kg is not in the cited LCA; find a Dell spec sheet', 'B3'],
 ['cusp', 'needs source', 'CUSP 6% energy-poverty threshold: website gone; find the CUSP report or use StatCan 10% only', 'B3'],
 ['abDataCentreLevy', 'J.B. can check', 'Off-grid rate R (0%?) after Bill 17: read the consolidated Corporate Tax Act Part 9.1', 'B3'],
 ['nistad2020', 'J.B. can check', 'Confirm author, year and title against your uploaded PDF', 'B3'],
 ['bcRLCF012b', 'decision', 'Carbon-intensity range: checks disagree on current rows (7.58–37.06 vs −7.03–131.35); re-read the table', 'B3'],
 ['cologixVAN4_2026', 'decision', 'Cologix VAN4 capacity: web page 4 MW vs spec sheet 6.5 MW (operator claims)', 'C trace'],
 ['vibration STC', 'decision', 'STC 47/55 read in VBBL 2019 / BCBC 2018, not NBC 2020 as the coef says', 'C trace'],
 ['schneiderUPS2020', 'needs source', 'Schneider UPS blog logged at a thegreengrid.org URL; find the right link', 'C trace'],
 ['bchTariff2026', 'J.B. can check', 'BC Hydro rate figures (LGS 29.99 ¢/day, $13.83/kW, 6.79 ¢/kWh; RS 1830) not read by either check: read them in your downloaded Electric Tariff', 'B4'],
 ['price_floor', 'node review', 'capex 0.5–0.65 M€/MW is attributed to Hiltunen 2020, which assumes 0.6; cite Wahlroos / Rämä directly', 'B4'],
 ['tallaghtD22', 'decision', 'capex_split calibration wording: "five of seven" is effectively four confirmed (AWS heat price not stated)', 'B1'],
 ['scieu2024', 'decision', 'Use national 2.06 GJ/m² for hospitals (provincial values not found)?', 'B1'],
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
