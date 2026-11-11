"""11 Nov 2026 (J.B., CODE_JOB_F11 B3): the 60 % load factor stays, cited to load_factor (Fan et al. 2007); it_load_share's text is changed so the two
parts agree (it said the share in use was "not set" and heat stayed "at capacity", while the tool applied 0.6 to yearly energy, heat and water)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
q = next(x for x in d['quantities'] if x['id'] == 'it_load_share')
q['formula'] = 'running IT load = design IT load × 0.6, the load factor (register load_factor); no further share for racks not yet in use'
old = q['coef']
q['coef'] = ("The tool applies the load factor 0.6 to yearly electricity, cost, carbon, heat offered and cooling water (register load_factor: Fan et al. 2007, "
             "one operator's clusters averaged 59.5 % of their machines' combined maximum; J.B. 11 Nov 2026). No sourced share exists for racks not yet in use "
             "in one colocation building, so none is applied on top: " + old.split(' Neither gives a typical value')[0] + " Neither gives a typical value for one colocation building.")
q.setdefault('revised', '2026-11-11')
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print(q['formula']); print(q['coef'][:400])
