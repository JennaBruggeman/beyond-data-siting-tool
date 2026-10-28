"""J.B. decisions, 28 Oct 2026 (open-items list, decisions 2, 5, 6, 7, 9, 10, 11), each re-read against the source first:
- cologixVAN4_2026: spec sheet (data/raw/cologix_van4_2026-05.pdf) prints 'Site Capacity 6.5 MW', 'VAN4 is a 40K SQFT'; web page also 6.5 MW (B16).
- portPER2025: 27 Dec 2023 PER categories PDF: C = '60 to 120 business days' (D = 120 to 170); Cat. A 'Water pipelines less than 100 m in length'.
- caAbMOU2026: PM backgrounder s.1.2.1.1 headline $95 (2026), $100 (2027-29), $115 (2030) ... $130 (2035), $140 (2040); s.1.2.2.1 effective target $130 in 2040.
- bcRLCF012b: re-read the saved table (revised 2026-04-30): it has Effective and Expiry date columns and a 'C-' prefix for Canadian-made fuel.
  HDRD rows in effect on 28 Oct 2026: 91, CI 7.58 (Tidewater Midstream) to 131.35 (Hawaii Renewables); Canadian-made: 11, 7.58 to 19.91
  (Tidewater Midstream; Parkland Refining (BC)); none from an Alberta producer in effect.
- vanISMP2014: saved PDF p. II-16/17 is the Rainwater Harvesting section (tank, pump and pressure tank, filter, backflow preventer); detention tanks (II-22/23) give no cost.
- tallaghtD22 / vibration: wording only."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
SRC = {
 'cologixVAN4_2026': [("(Spec sheet not re-checked online; Cologix's web pages give 'across four floors' and two floor areas, 58K and 68,000 ft² ?)", "(spec sheet re-read 28 Oct 2026; Cologix's web page also gives 6.5 MW site capacity but two other floor areas, 58K and 68,000 ft² ?)")],
 'portPER2025': [('Category C (60–120 business days ?: one check reads Category C as 120–170 days, 60–120 being Category B, in the 27 Dec 2023 edition)', "Category C, '60 to 120 business days' (27 Dec 2023 categories PDF; Category D is 120–170; Table 5 for short-term activities prints C as 10–60)"), ('a water pipeline is Category A only under 100 m with no water crossing (?: that check finds no 100 m threshold)', "a water pipeline is Category A only if 'less than 100 m in length' and with no discharge to a water body")],
 'caAbMOU2026': [('TIER headline price $95/t (2026), $100 (2027–29), $130 (2035), $140 (2040) (single check: reads $115 in 2030 and $130 in 2035; effective-price target $130 in 2040)', 'TIER headline price $95/t (2026), $100 (2027–29), $115 (2030), rising to $130 (2035), then 1.5%/yr to $140 (2040) (s. 1.2.1.1); effective credit price to target $130 in 2040 (s. 1.2.2.1); credit floor $60 (2030) to $110 (2040) (s. 1.2.3.5)')],
 'bcRLCF012b': [("the list gives no facility location or feedstock, so no pathway can be confirmed as Alberta-made; it has no expiry column. HDRD values in the list run from about −7.03 (Parkland Refining) to 131.35 (Hawaii Renewables), not the 7.58–37.06 'current' range or 42.91 maximum given earlier (?: the two checks disagree on which rows are current and read Diamond Green Diesel's top value as 37.06 and 37.76); Imperial Oil has four HDRD codes (11.96, 5.52, 19.46, 15.06; single check)", "the list has effective and expiry dates and marks Canadian-made fuel with a 'C-' prefix, but gives no facility location or feedstock. HDRD rows in effect on 28 Oct 2026: 7.58 (Tidewater Midstream) to 131.35 gCO2e/MJ (Hawaii Renewables); Canadian-made rows in effect: 7.58–19.91 (Tidewater Midstream; Parkland Refining (BC)); no Alberta producer's row in effect (Imperial Oil's four HDRD codes, 5.52–19.46, expired by 14 Jun 2026; our reading of the dates)")],
 'vanISMP2014': [("about $10,000 for a 15 m³ tank (Class D ±30%, p. II-41) (?: one check reads this as a rainwater harvesting system, not a detention tank; the detention-tank section gives no cost)", "about $10,000 for a 15 m³ rainwater harvesting system (tank, pump and pressure tank, filter, backflow preventer; Rainwater Harvesting section), not a detention tank; the detention-tank section (p. II-22–23) gives no cost (Class D ±30%, p. II-41)")],
}
TXT = [('in five of seven built cases the data centre gives the heat free', 'in five of seven built cases (four confirmed; the AWS heat price at Tallaght is not stated) the data centre gives the heat free'),
       ('NBC/VBBL apparent STC 47 between dwellings', 'VBBL 2019 / BCBC 2018 apparent STC 47 between dwellings')]
reg = R / 'register/formula_register.json'; r = json.loads(reg.read_text())
op = R / 'tool/opps.json'; o = json.loads(op.read_text())
done, miss = set(), []
for d in (r['new_sources'], r['old_sources'], o['sources']):
    for i, reps in SRC.items():
        if i in d:
            for a, b in reps:
                if a in d[i]: d[i] = d[i].replace(a, b, 1); done.add(i)
                elif b not in d[i]: miss.append((i, a[:40]))
def walk(x):
    if isinstance(x, dict): return {k: walk(v) for k, v in x.items()}
    if isinstance(x, list): return [walk(v) for v in x]
    if isinstance(x, str):
        for a, b in TXT:
            if a in x: x = x.replace(a, b); done.add(a[:20])
    return x
r = walk(r); o = walk(o)
reg.write_text(json.dumps(r, ensure_ascii=False, indent=1)); op.write_text(json.dumps(o, ensure_ascii=False, separators=(',', ':')))
print('applied', sorted(done), 'miss', miss)
