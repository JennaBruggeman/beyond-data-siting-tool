"""Group B batch 1 (J.B. 28 Oct 2026). Applied only where two independent checks agree (checks/sweep/B_batch1_*_result.json and
verify_B1_answers.json); single-check findings are marked '?'. Also corrects four group A fixes the second check disagreed with
(verify_A_answers.json). Text and citations only: no engine value changes."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
SRC = {
 'vanEnergyReport': [('(by-law reporting, buildings ≥100,000 ft²)', '(by-law reporting: commercial buildings ≥4,645 m² / 50,000 ft²; residential and hotel ≥9,290 m² / 100,000 ft²; the map shows only buildings whose owners agreed to disclose)')],
 'femp': [('US DOE FEMP BMP #10: evaporation ≤ Q ÷ h_fg (~1.5 L/kWh); blowdown = E ÷ (C−1); WUE (ISO 30134-9)', "US DOE FEMP BMP #10 states make-up = evaporation + blowdown + drift, and cycles ≈ make-up ÷ blowdown (3→6 cycles cuts make-up ~20 %); evaporation ≤ Q ÷ h_fg (~1.5 L/kWh), blowdown = E ÷ (C−1) and WUE (ISO 30134-9) are our derivations, not in BMP #10")],
 'bcucC113': [('TES capital $7.9 M,', 'TES capital $7.9 M + $0.35 M development = $8.3 M,'),
              ('customer rate BC Hydro residential + 5–10 % (G-155-12: $0.105–0.126/kWh 2014–18)', 'proposed customer rate BC Hydro residential + 5–10 % (G-155-12: $0.105–0.126/kWh 2014–18), denied by the Panel (C-1-13 Order para. 2)')],
 'rvoCases2018': [('≈€1.5 M', '≈€1.5 M (?: one check found €0.8 M installations + ≈€0.7 M network on p.13 and the only €1.5 M is Aalsmeer, p.15; not re-confirmed)')],
 'tallaghtD22': [('from a 3 MW heat pump', 'from heat pumps of up to 3 MW'), ('source ~25 °C,', 'source temperature not stated (?),'), ('heat supplied by AWS free;', 'AWS supplies low-grade waste heat (price not stated ?);')],
 'epcorDTtc2025': [('micro-generation <5 MW', 'no micro-generation category; 5 MW is only the telemetry threshold (s. 8.3.5)')],
 'abDCenv2026': [('with emission limits set case by case', "and approvals 'may include … emission limits'"),
                 ('Federal Multi-Sector Air Pollutants Regulations cover gaseous-fuel spark-ignition engines only, not diesel', 'The document does not mention the federal Multi-Sector Air Pollutants Regulations or diesel (it says "emergency backup generators"); the MSAPR point needs its own source (?)')],
 'blatchfordDESS': [("BC Climate Toolkit, 'District Energy Systems' (undated; hosted on blatchfordedmonton.ca, uploaded 2016)", "District energy overview (no author or publisher printed; hosted on blatchfordedmonton.ca, uploaded 2016)")],
 'odef': [('(catalogue release date 13 Dec 2024; v2.1 label not confirmed ?)', '(released 28 Nov 2022; archived)')],
 'bch_primary': [('BC Hydro, distribution standards primary service guide, Rev. 4 (2025)', 'BC Hydro, Requirements for Customer-Owned Primary Services Supplied at 4 kV to 35 kV, Primary Guide R4 (issued 20 Feb 2025, effective 30 Jun 2025)')],
 'cie150': [('(May 2021, supersedes GN01/20)', '(2021, supersedes GN01/20)')],
}
COEF = {
 'liquid_capture': [('Požgaj et al. 2025 (air-side 30% recovered by heat pumps in place of chillers, ERF 0.78–0.88, 108 kW hybrid)', 'Požgaj et al. 2025 (108 kW hybrid; liquid removes ~70 %, so ~30 % to air, implied; ERF 0.78 in the 3G case with heat pumps, 0.86 in 4G and 0.88 in 5G without heat pumps)')],
 'noise_level': [("Kelvion 94 dBA printed under 'per fan' heading, 61 dBA @10 m — unit total unresolved", 'Kelvion LF-PD203T4H 94 dBA per fan, 6 fans ≈ 101.8 dBA per unit (our sum of the printed per-fan value), 61 dBA @10 m per fan; seller copy, not on kelvion.com')],
 'price_ceiling': [('charges customers the BC Hydro residential benchmark + 5–10 % ($0.105–0.126/kWh proposed 2014–18 = $105–126/MWh)', 'proposed the BC Hydro residential benchmark + 5–10 % ($0.105–0.126/kWh 2014–18 = $105–126/MWh), which the BCUC denied in C-1-13')],
 'capex_split': [('Tallaght — SDCC-owned Heat Works, AWS heat free;', 'Tallaght — SDCC-owned Heat Works, AWS heat price not stated (?);')],
}
ROLE = {('bcucC113', 'FAES-owned TES; free DC heat; customer rate BC Hydro + 5–10 %'): 'FAES-owned TES; free DC heat; proposed rate BC Hydro + 5–10 % denied',
        ('tallaghtD22', 'SDCC-owned HP; AWS heat free'): 'SDCC-owned HP; AWS heat price not stated (?)'}
reg = R / 'register/formula_register.json'; r = json.loads(reg.read_text())
op = R / 'tool/opps.json'; o = json.loads(op.read_text())
miss = []
def sub(store, i, reps):
    if i not in store: return
    s = store[i]
    for a, b in reps:
        if a in s: s = s.replace(a, b)
        elif b not in s: miss.append((i, a[:50]))
    store[i] = s
for i, reps in SRC.items():
    for d in (r['new_sources'], r['old_sources'], o['sources']): sub(d, i, reps)
parts = {p['id']: p for p in r['quantities'] + r['conditions']}
for pid, reps in COEF.items():
    p = parts[pid]
    for a, b in reps:
        if a in p['coef']: p['coef'] = p['coef'].replace(a, b)
        else: miss.append((pid, a[:50]))
for p in parts.values():
    for s in p.get('source_roles', []):
        k = (s.get('id'), s.get('term'))
        if k in ROLE: s['term'] = ROLE[k]
o_txt = json.dumps(o, ensure_ascii=False, separators=(',', ':')).replace('Tallaght — SDCC-owned Heat Works, AWS heat free;', 'Tallaght — SDCC-owned Heat Works, AWS heat price not stated (?);'); o = json.loads(o_txt)
reg.write_text(json.dumps(r, ensure_ascii=False, indent=1)); op.write_text(json.dumps(o, ensure_ascii=False, separators=(',', ':')))
print('not applied:', miss)
