"""7 Nov 2026 (worklist 1): aquarium and lumber drying removed from tool/arch_programs.json (dropped by J.B. 4 Nov 2026, already in
meta.dropped_programs); food drying and winter garden hidden ('out for now', typology library v1). Twin removed from tool/data/arch.json
typologies (dropped 4 Nov 2026). Updates arch_program_catalogue's count. No number the engine uses changes."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
Q = {q['id']: q for q in d['quantities']}
q = Q['arch_program_catalogue']
OLD = "25 programs (20 masses, 2 surfaces, 3 systems) in tool/arch_programs.json"
NEW = ("23 programs (18 masses, 2 surfaces, 3 systems) in tool/arch_programs.json, 2 of them hidden ('out for now', J.B. 4 Nov 2026: "
       "food drying, winter garden); aquarium and lumber drying removed 7 Nov 2026 (dropped by J.B. 4 Nov 2026)")
if NEW not in q['coef']:
    assert OLD in q['coef'], 'catalogue count not found'
    q['coef'] = q['coef'].replace(OLD, NEW, 1)
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('arch_program_catalogue updated')
