"""11 Nov 2026 (J.B., CODE_JOB_F10): embodied carbon is removed from every part of the tool and the reports; the estimates are not accurate enough
to show (servers: one maker's LCA for all servers, a 10-15 % manufacturing share of our own; building: a general-building median, no data-centre
benchmark, applied to the wrong floor area; network, storage, UPS, batteries, chillers and generators left out). This replaces the open question of
400 vs 461 kg CO2e/m².
The register entries stay where they are, so the reading isn't lost: each is marked "not used in the tool (J.B. 11 Nov 2026)", and meta.not_in_tool
lists them; make_diagram_data.py, make_templates.py and tool/make_tool_opps.py leave them (and links to them) out of the tool's files."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
NOTE = 'not used in the tool (J.B. 11 Nov 2026): embodied carbon dropped from the tool and the reports; the estimate is not accurate enough to show'
Q = ['embodied_it', 'embodied_building', 'embodied_rule']; CND = ['env_embodied']
for q in d['quantities']:
    if q['id'] in Q: q['not_in_tool'] = NOTE
for c in d['conditions']:
    if c['id'] in CND: c['not_in_tool'] = NOTE
d['meta']['not_in_tool'] = {'date': '11 Nov 2026', 'by': 'J.B.', 'job': 'CODE_JOB_F10_drop_embodied_carbon',
    'why': 'embodied carbon is not accurate enough to show; dropped from every part of the tool and the reports',
    'quantities': Q, 'conditions': CND,
    'also': 'condition s_conversion keeps its other part (existing_building); the heat pipe EPD figure (cards.js co2pipe) is removed from the tool with the same decision'}
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('not in tool:', Q, CND)
