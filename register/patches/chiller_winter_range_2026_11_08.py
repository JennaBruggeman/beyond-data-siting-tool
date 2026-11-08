"""8 Nov 2026 (J.B.): the air-cooled chiller the tool sizes (Vertiv Liebert AFC, register vertivAFC) against the winter design temperature.
Vertiv Liebert AFC installer guide SL-70790 (c) 2026, s. 1.4.3 Operating Limits, Table 1.1 (p. 10; J.B.'s screenshots, Claude Link eh/vertiv_AFC_SL-70790_p8-9_limits.png,
eh/vertiv_AFC_SL-70790_p10_operating_range.png; read by Code 8 Nov 2026): ambient temperature -20 F to 113 F (-28.9 C to 45 C), "Min and Max air temperatures can vary
by model and chiller design"; NOTE: "The ambient temperature must not go below -4 F (-20 C), because in this condition R1234ze pressure is below the ambient ones."
The chart (same page) is "a guide and reference only"; its chiller-only versions stop near -10 C (read off the chart, our reading).
Winter design temperature, January 2.5 %: Edmonton -30 C (NBC 2020 Div. B App. C, as J.B. gives it, register nbc20_climate; same value in NBC(AE) 2023, arch_pg_abClimateEdm,
read from local text); Vancouver -7 C (BCBC App. C Table C-2, City Hall, arch_bcbcAppC). Edmonton: below the widest stated range (-28.9 C), so flagged "outside the
maker's stated range in design winter (?)"; Vancouver passes. A flag, not a block; no computed result changes."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']; m = d['meta']
D = '8 Nov 2026'
NEW = {
 'vertivAFC_limits': "MAKER (installer guide): Vertiv Liebert AFC Packaged Air Cooled Free Cooling Chiller Installer/User Guide SL-70790 (c) 2026, s. 1.4.3 Operating Limits and Table 1.1 Ambient Conditions, p. 10 (J.B.'s screenshots 8 Nov 2026, Claude Link eh/vertiv_AFC_SL-70790_p8-9_limits.png, eh/vertiv_AFC_SL-70790_p10_operating_range.png; read by Code): ambient temperature '-20 F - 113 F (-28.9 C - 45 C) [Min and Max air temperatures can vary by model and chiller design.]'; 'NOTE: The ambient temperature must not go below -4 F (-20 C), because in this condition R1234ze pressure is below the ambient ones.' The operating-range chart is 'a guide and reference only'; its chiller-only versions (all refrigerants) stop near -10 C (read off the chart: our reading). s. 1.4.2: outdoor installation; supply fluid about 12.2-25 C; altitude under 2,000 m. Trust 50 (maker claim).",
 'nbc20_climate': "RULE: National Building Code of Canada 2020, Div. B Appendix C, Climatic and Seismic Information for Building Design, Table C-2: Edmonton January 2.5 % design temperature -30 C (value as J.B. gives it, 8 Nov 2026; the same figure is read from the local NBC(AE) 2023 text, register arch_pg_abClimateEdm). Trust 90 (regulation).",
}
for k, v in NEW.items():
    if k not in S: S[k] = v
    m['source_kinds'][k] = 'maker' if k.startswith('vertiv') else 'rule'
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('date') == D for c in cl):
        cl.append({'check': 1, 'by': 'Code (J.B.\'s screenshots)' if k.startswith('vertiv') else 'J.B.', 'date': D, 'where': 'Claude Link eh/ screenshots' if k.startswith('vertiv') else 'J.B. message 8 Nov 2026', 'what': 'values read; trust as given'})
if not any(q['id'] == 'chiller_winter_range' for q in d['quantities']):
    d['quantities'].append({"id": "chiller_winter_range", "name": "Air-cooled chiller in design winter", "stage": "test", "unit": "flag (within / outside the maker's stated range)",
      "formula": "winter design temperature (January 2.5 %) against the lowest ambient the chiller maker states (tool/data/plant_units.json chillAmbient, winterDesign); below it: 'outside the maker's stated range in design winter (?)'. A flag on the Engineering cooling card, not a block.",
      "inputs": ["cooling_type", "weather"],
      "coef": "Vertiv Liebert AFC: -28.9 C widest (varies by model), -20 C with R1234ze (SL-70790 Table 1.1). Edmonton -30 C (NBC 2020 App. C) is outside; Vancouver -7 C (BCBC App. C) is inside.",
      "sources": ["vertivAFC_limits", "nbc20_climate", "arch_pg_abClimateEdm", "arch_bcbcAppC"], "conf": 50,
      "status": "in hand (8 Nov 2026, J.B.): a flag on the Engineering cooling card"})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
u = R / 'tool/data/plant_units.json'; U = json.loads(u.read_text(encoding='utf-8'))
U['chillAmbient'] = {'min': {'v': -28.9, 'src': ['vertivAFC_limits'], 'note': 'widest stated; varies by model'}, 'minR1234ze': {'v': -20, 'src': ['vertivAFC_limits']}}
U['winterDesign'] = {'van': {'v': -7, 'src': ['arch_bcbcAppC'], 'note': 'January 2.5 %, BCBC App. C Table C-2 (City Hall)'}, 'edm': {'v': -30, 'src': ['nbc20_climate'], 'note': 'January 2.5 %, NBC 2020 App. C'}}
u.write_text(json.dumps(U, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('chiller winter range')
