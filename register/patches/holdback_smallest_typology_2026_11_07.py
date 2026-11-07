"""7 Nov 2026 (J.B.): Ratios' hold-back before any picks is the smallest typology, not an add-on. Heat hub (an add-on since 4 Nov 2026, Q5)
moved from tool/data/arch.json typologies.list to typologies.addons, so the hold-back is the Emergency hub (853 m²). Updates arch_ratios."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
q = {x['id']: x for x in d['quantities']}['arch_ratios']
A, B = "(none chosen: the smallest in the library)", "(none chosen: the smallest typology in the library, add-ons excluded; J.B. 7 Nov 2026)"
if B not in q['formula']: assert A in q['formula']; q['formula'] = q['formula'].replace(A, B, 1)
A, B = "typology hold-back is a default (coordinator recommendation, J.B. to confirm)", "typology hold-back: the smallest typology, the Emergency hub (J.B. 7 Nov 2026; was Heat hub, an add-on)"
if B not in q['coef']: assert A in q['coef']; q['coef'] = q['coef'].replace(A, B, 1)
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('arch_ratios hold-back updated')
