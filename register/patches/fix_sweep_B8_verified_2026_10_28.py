"""Second-check batch 8, first pass (J.B. 28 Oct 2026): 50 'Found' sources, 23 reached (others timed out on fetch
permission; rerun later). Corrections only where both checks agree; single-check findings marked '?'. Text only."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REPL = {
 'bcucG3026': [('fast charging 39.70 ¢/kWh from 1 Apr 2026 (as proposed in the decision)', 'fast charging 39.70 ¢/kWh from 1 Apr 2026 (?: one check reads 39.70 as the Decision\'s figure for the 6% increase the Commission approved; BC Hydro proposed 5%)')],
 'blatchfordRates2026': [('multi-unit $13.18/kW peak/month + $0.0358/kWh', 'multi-unit $13.18/kW peak/month + $0.0358/kWh (the page prints "per kW", likely a typo)')],
 'blatchfordSHX2026': [('two existing combined sewers under east Blatchford', 'two existing sewers under east Blatchford ("combined" ?)'),
                       ('federal SREPs $23.7 M toward a $79.2 M project (NRCan, 31 Jul 2024)', 'federal SREPs $23.7 M toward a $79.2 M project (MW and $ figures are from the NRCan release, 31 Jul 2024, not this page)'),
                       ('EPCOR Bylaw 19627 allows non-contact cooling water', 'EPCOR Bylaw 19627 allows non-contact cooling water (?: not on these pages; needs the bylaw)')],
 'caaqs': [('NO2 1-h 2025 standard 79 µg/m³ (42 ppb,', 'NO2 1-h 2025 standard 42 ppb (≈79 µg/m³, our conversion;'), ('PM2.5 24-h 27 µg/m³ (2020) → 23 (2030)', 'PM2.5 24-h 27 µg/m³ (2020) → 23 (2030) (? 2030 value not on this page; CAAQS handbook not read)')],
 'call2recycle': [('(incl. sealed lead acid and Li-ion)', '(household single-use and rechargeable; "sealed lead acid" ?)'), ('Alberta battery EPR from 1 Apr 2025', 'Alberta battery EPR from 1 Apr 2025 (?: not on this page)'), ('https://call2recycle.ca/faq/', 'https://call2recycle.ca/faqs/')],
 'ceG526': [('(≈ $66.6 to $39.6 per MWh)', '(≈ $66.6 to $39.6 per MWh, our conversion; Creative Energy Vancouver Platforms Inc.; interim rates)')],
 'cfdPage': [('outcome deferred', "timeline 'extended': notifications expected after the government transition")],
 'cfr2022_140': [('Schedule 1 reference CI, liquid class, 89.2 (2022–23) to 80.1 (2030+);', 'Schedule 1 reference CI, liquid class, 89.2 (2022–23) to 80.1 (2030+) (?: not reached by either check);')],
 'drake': [('Drake Landing BTES efficiency measured 0.06 → 0.54 over ten years', "Drake Landing BTES 'apparent efficiency' (ignores year-to-year change in stored energy) 0.06 in year 1, 0.54 by year 4, peak 0.56 in year 7, not a steady rise")],
 'bchDEP2025': [('$1M per MVA to $10M above', '$1M per MVA to $10M above (page says "under 1 MVA" and bands $1–4.99M ?; refunds framed as reviews at anniversaries ?)')],
 'bchCall2025': [('news release 12 Feb 2025: 2024 Call for Power', 'news release 12 Feb 2025 (about the 2024 Call for Power, despite the id): 2024 Call for Power')],
 'bchRAS2011': [('no customer had ever taken part', 'no transmission service customer had ever taken part (per BCUC G-39-12 ?; letter not re-read)')],
 'blatchfordDG2025': [('Table 8: ambient loop supply', "Table 8: 'Heat Pump Loop Water' (ambient loop) supply")],
 'ceudResTable2': [('space + water heating ÷ total floor space, 2018–22 average:', 'space + water heating ÷ total floor space, 2018–22 average (our ratios from the table; not printed ?):')],
 'cologixVAN4_2026': [('PUE 1.5 (claim).', "PUE 1.5 (claim). (Spec sheet not re-checked online; Cologix's web pages give 'across four floors' and two floor areas, 58K and 68,000 ft² ?)")],
 'censusIncome2021': [('Table 98-10-0058-01)', 'Table 98-10-0058-01 ?: table number not printed in the release)')],
}
reg = R / 'register/formula_register.json'; r = json.loads(reg.read_text())
op = R / 'tool/opps.json'; o = json.loads(op.read_text())
done, miss = set(), []
for d in (r['new_sources'], r['old_sources'], o['sources']):
    for i, reps in REPL.items():
        if i in d:
            for a, b in reps:
                if a in d[i]: d[i] = d[i].replace(a, b, 1); done.add(i)
                elif b not in d[i]: miss.append((i, a[:40]))
TXT = [('up to 400 MW, outcome deferred;', 'up to 400 MW, timeline extended;'), ('Drake Landing 0.06 → 0.54"', 'Drake Landing 0.06 → 0.54 (apparent efficiency, not a steady rise)"')]
def fix(t):
    for a, b in TXT: t = t.replace(a, b)
    return t
r = json.loads(fix(json.dumps(r, ensure_ascii=False))); o = json.loads(fix(json.dumps(o, ensure_ascii=False)))
reg.write_text(json.dumps(r, ensure_ascii=False, indent=1)); op.write_text(json.dumps(o, ensure_ascii=False, separators=(',', ':')))
print('applied', len(done), 'of', len(REPL), 'miss', miss)
