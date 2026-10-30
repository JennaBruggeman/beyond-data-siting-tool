"""30 Oct 2026: place-stage fixes (checks/findings_place.md), J.B. said 'yes'. Register side only; the screen fixes are in tool/*.js.
Also P-09: tool/make_tool_opps.py read a missing file, so opps.json had drifted; source kinds/check marks written only to opps.json are moved into the register."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']
old = R / 'checks/place_check/opps_before_p09.json'
if old.exists():
    o = json.loads(old.read_text())
    for k, v in o.get('source_kinds', {}).items(): m['source_kinds'].setdefault(k, v)
    for k, v in o.get('source_check', {}).items(): m['source_check'].setdefault(k, v)
Q = {q['id']: q for q in d['quantities']}
def add(qid, field, txt, mark):
    q = Q.get(qid)
    if q is None: print('missing', qid); return
    if mark not in q.get(field, ''): q[field] = (q.get(field, '') + ' ' + txt).strip()
q = Q['ates']
if '× 1,000 × 3.6' not in q['formula']: q['formula'] = q['formula'].replace('flow = MW × 3.6 ÷ (4.18 × ΔT)', 'flow (m³/h) = MW × 1,000 × 3.6 ÷ (4.18 × ΔT)')  # P-20
add('deep_geo', 'coef', 'P-21 (30 Oct 2026): the return temperature is not stated; 2.1–5.6 MWth from 30–80 kg/s implies a drop of about 16.7 K, a return near 73 °C (our arithmetic ?).', 'P-21')
add('borefield', 'coef', 'P-22 (30 Oct 2026): "about 2 ha per MW" holds only at 12 W/m; at 19 W/m it is about 1.3 ha, and at the 7–11 W/m used for Edmonton 2.2–3.4 ha per MW (our arithmetic, same 150 m boreholes on 36 m²).', 'P-22')
add('pv_roof', 'coef', 'P-05 (30 Oct 2026): 128 / 159 kWh per m² of roof is our derivation, at the optimistic end (module density × whole usable roof).', 'P-05')
add('service_class', 'coef', 'P-12 (30 Oct 2026): power factor taken as 1, so kW = kVA (our assumption ?).', 'P-12')
add('electricity_price', 'coef', 'P-12 (30 Oct 2026): the BC Hydro demand charge is billed monthly, so a year is 12 × the monthly charge. Edmonton energy: pool $43.68 + EPCOR $2.50/MWh + 7.99% = $49.67/MWh (epcorDASSAS). The large general service rate applies at distribution voltage; transmission service (RS 1830, 60 kV or higher) is not applied; the size at which BC Hydro requires it is not sourced (?).', 'P-12')
q = Q['ambient_cover']; q['coef'] = q['coef'].replace('Edmonton Bylaw 14600 limits pending (J.B. retrieval D1)', 'Edmonton Bylaw 14600 (ss. 19–22, at the property line): 50 dBA overnight next to homes, 60 next to non-residential uses; no ambient credit (bylaw14600; P-13, 30 Oct 2026)')
q = Q['restriction_history']; q['coef'] = q['coef'].replace('Vancouver: Stage 3 2015; Stage 2 2023 (4 Aug–15 Oct); 2026 Stage 3 from 8 Jun;', 'Vancouver: Stage 2 from 1 May 2026, Stage 3 anticipated early June (Metro Vancouver report, 1 May 2026); 2023 the last escalation to Stage 2 before 2026; earlier dates held back until each is sourced (P-19, 30 Oct 2026);')
q = Q['flood_exposure']; q['coef'] = q['coef'].replace('(VBBL Div. C 2.2.9.3(2))', '(VBBL 2025 Div. B 2.2.10.3(2); hazardous or toxic substances not stored below FCL, 2.2.10.3(3))')
add('flood_exposure', 'coef', 'P-14 (30 Oct 2026): clause settled by reading the by-law (earlier cited as Div. C 2.2.9.3); counting generator diesel as a "hazardous substance" is our reading (?).', 'P-14')
add('surface_water_sink', 'coef', 'P-15 (30 Oct 2026): river water 23.9–47.8 L/s per MW (4.18 kJ/kg·K, 1.0 kg/L) for the North Saskatchewan and Fraser arms; sea water 24–49 for Burrard Inlet (4.0 kJ/kg·K, 1.025 kg/L).', 'P-15')
add('pv_roof', 'coef', 'P-16 (30 Oct 2026): one set of NRCan yields everywhere: Vancouver 892 (flat) – 1,006 (latitude tilt), 718 vertical; Edmonton 947 – 1,243, 990 vertical.', 'P-16')
m['check_log'].setdefault('_place_stage', [])
if not any(c.get('date') == '30 Oct 2026' for c in m['check_log']['_place_stage']):
    m['check_log']['_place_stage'].append({'check': 1, 'by': 'Claude', 'date': '30 Oct 2026', 'where': 'checks/findings_place.md', 'what': 'place-stage fixes applied (P-01–P-23 clear-cut)'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('register ok')
