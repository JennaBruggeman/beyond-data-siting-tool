"""5 Nov 2026: in Architecture mode loading defaults to a dock inside the building, as the hand test fits draw it
(checks/research_typ/testfit_lots.md). Ratios subtracts the bays' floor from the ground instead of a strip across the whole rear.
Updates arch_ratios (formula, coef). Drawing choice and default, J.B. to confirm."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text())
Q = {q['id']: q for q in d['quantities']}
q = Q['arch_ratios']
F = ("; loading inside (5 Nov 2026): with the Architecture default the bays take ground-storey floor, length × (n × (width + 0.6) + 0.6), "
     "subtracted from the ground; no strip across the rear (the aisle is the drive or lane outside)")
if 'loading inside (5 Nov 2026)' not in q['formula']: q['formula'] += F
C = ("; loading inside is an Architecture default (drawing choice, as the test fits; J.B. to confirm); with it the tool sits 7 % (E14715) and "
     "16 % (E4103) above the hand test fits, because the shared lobby (size ?) is not counted (tool run, 5 Nov 2026)")
if 'loading inside is an Architecture default' not in q['coef']: q['coef'] += C
p.write_text(json.dumps(d, ensure_ascii=False, indent=1))
print('arch_ratios updated')
