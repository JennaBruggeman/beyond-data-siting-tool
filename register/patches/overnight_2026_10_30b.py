"""Overnight 30 Oct 2026 (b): link power_allocation to the grid-flexibility opportunity."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
k = 'Reserved capacity and batteries to the grid'
for f, key, pretty in (('register/formula_register.json', 'opportunity_quantities', True), ('tool/opps.json', 'opp_quantities', False)):
    p = R / f; d = json.loads(p.read_text())
    if 'power_allocation' not in d[key][k]: d[key][k].append('power_allocation')
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':'))); print(f, 'ok')
