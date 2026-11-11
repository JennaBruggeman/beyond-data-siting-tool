# rebuild-after: 2fbf4c6
"""Back-fill, written 11 Nov 2026 for the from-scratch register rebuild: commit 2fbf4c6 (29 Oct 2026, hall layout capacity check)
edited hall_layout.formula in the register directly, with no patch, so a rebuild from the patches lacked it and
one_method_floor_racks_2026_11_11.py stopped. This patch writes the same text, dated by the day it was made. Idempotent."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
q = next(x for x in d['quantities'] if x['id'] == 'hall_layout')
ADD = ('; capacity check (29 Oct 2026): racks that fit by these rules on the floor plate × 7.1–8 kW per rack is shown against size_fit '
       '(the first hall floor holds the UPS and battery room; the others are counted by the same rules) — it checks, it does not change, the sizing')
if 'capacity check' not in q['formula']:
    q['formula'] += ADD
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
    print('hall_layout: capacity check added')
else:
    print('hall_layout: capacity check already there')
