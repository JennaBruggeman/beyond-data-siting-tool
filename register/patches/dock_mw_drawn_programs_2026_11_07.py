"""7 Nov 2026 (J.B., after the section 2 gate): (a) no hall sliver under 3 m beside the inside dock: it goes to the dock (or to support if it does
not touch the dock); the hall floor the dock and slivers take on a hall storey comes out of the MW tested, not the footprint; (b) the loading count
uses only programs Arrange draws, the rest named. Updates arch_ratios (formula, coef). Drawing and counting rules, no new source."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
q = {x['id']: x for x in d['quantities']}['arch_ratios']
F = ("; dock on a hall storey (7 Nov 2026, J.B.): the hall floor it takes, with any hall strip under 3 m beside it (given to the dock), "
     "comes out of the MW: MW = (data centre floor − that floor) ÷ m² per MW; the footprint is unchanged")
if 'dock on a hall storey (7 Nov 2026' not in q['formula']: q['formula'] += F
OLD = "; loading count: picked programs are counted even where Arrange cannot draw them (e.g. a pool over the BE area cap): an overcount, flagged; "
NEW = "; loading count: only programs Arrange draws are counted; picked but not drawn are named in the note (7 Nov 2026); "
if NEW not in q['coef']:
    assert OLD in q['coef']; q['coef'] = q['coef'].replace(OLD, NEW, 1)
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('arch_ratios: dock MW and drawn programs')
