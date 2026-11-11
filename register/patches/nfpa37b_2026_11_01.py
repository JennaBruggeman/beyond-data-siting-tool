"""1 Nov 2026: NFPA 37 (2024) pp. 37-13 to 37-18 (fuel rooms, fill and vent pipes, exhaust), from J.B.'s screenshots. Appends to nfpa37_2024. CHECK 1 (Claude).
11 Nov 2026: quoted text replaced by paraphrase (licensed_text_rewrite_2026_11_11.py)"""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']
K = 'nfpa37_2024'; S = d['new_sources']
ADD = (" ‖ pp. 37-13 to 37-18 (read 1 Nov 2026): 6.3.3 outdoor tanks follow NFPA 30 (not read ?); 6.3.4 roof tanks on noncombustible supports with spill containment for the largest tank; "
       "6.3.5 rooms holding only tanks up to 5,000 L: walls, floor, ceiling rated at least 1 hour, 380 mm clearance round each tank, self-closing 1 h door if it opens inside, spill containment, ventilation keeping vapours at or below 25 % of the LFL and discharging outside with no recirculation; "
       "6.3.6 over 5,000 L: 3 h walls, floor, ceiling, 3 h self-closing doors, curbs at openings; 6.5.5 overflows, vents, fuel piping and fuel tanks kept away from engine air intakes, exhaust piping, mufflers and filters; "
       "6.6.3.3 fill pipe on an exterior wall 600 mm (24 in.) minimum from building openings at the same or a lower level; 6.7.1.1 tank vent pipe outside, at least 600 mm from any building opening at the same or lower level; "
       "8.2.3.1 exhaust ends outside the structure where hot gases, sparks and combustion products discharge safely — no distance to windows or air intakes is given; 8.2.3.2 not directed toward combustible materials or structures; "
       "8.3.1 unlisted exhaust pipes 457 mm from combustible materials; 8.3–8.4 refer to NFPA 211 (not read ?); 11.1 a fire risk evaluation covers each engine installation's design and layout.")
if 'pp. 37-13 to 37-18' not in S[K]: S[K] = S[K].replace(" Exhaust (Chapter 8 ?) not yet read.", "") + ADD
cl = m['check_log'].setdefault(K, [])
if not any('37-13' in c.get('where', '') for c in cl):
    cl.append({'check': 1, 'by': 'Claude', 'date': '1 Nov 2026', 'where': "NFPA 37 2024 pp. 37-13 to 37-18 (J.B.'s screenshots)", 'what': 'fuel rooms, fill and vent pipes, exhaust'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
