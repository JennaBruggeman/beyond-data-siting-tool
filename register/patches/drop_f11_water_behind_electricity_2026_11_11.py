"""11 Nov 2026 (J.B., CODE_JOB_F11 A1): water behind the electricity (E × 1.25–16.8 L/kWh) is dropped from the tool: its source is not indexed (?) and
charging reservoir evaporation to hydro kWh is contested. The register entry stays, marked "not used in the tool", and joins meta.not_in_tool so the
builders leave it (and its links) out of the tool's files. (F11 A2, the 'floor space alone' range, is a display change only: size_fit still sets the
size search's ceiling, so its entry stays in the tool.)"""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
NOTE = 'not used in the tool (J.B. 11 Nov 2026): water behind the electricity dropped; the source is not indexed and the method is contested'
for q in d['quantities']:
    if q['id'] == 'water_behind_electricity': q['not_in_tool'] = NOTE
nit = d['meta'].setdefault('not_in_tool', {'quantities': [], 'conditions': []})
if 'water_behind_electricity' not in nit['quantities']: nit['quantities'].append('water_behind_electricity')
nit.setdefault('later', []).append({'date': '11 Nov 2026', 'job': 'CODE_JOB_F11 A1', 'ids': ['water_behind_electricity']})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('not in tool now:', nit['quantities'])
