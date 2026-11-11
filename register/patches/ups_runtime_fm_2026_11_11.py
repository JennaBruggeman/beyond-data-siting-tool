"""11 Nov 2026 (J.B., CODE_JOB_F11 B4): the UPS batteries are sized to carry the load 10–15 min (FM 5-32 3.5.2.1, insurer guidance), as the hub follows
FM 5-32 elsewhere; was about 5 min (colocation practice, vendor claims). Cabinet rating at these runtimes from the Vertiv EnergyCore Li5's stored energy
(31.1 kWh: 186.6 kW for 10 min, 124.4 kW for 15 min; our arithmetic); the Delta LZH's rating at these runtimes is not held (?). Battery space per MW
scaled by the cabinet count: 1.0–1.8 → 2.1–3.8 m² per MW (equipment only)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
Q = {q['id']: q for q in d['quantities']}
b = Q['battery_cabinets']
b['coef'] = ('10–15 min runtime (FM 5-32 3.5.2.1, insurer guidance; J.B. 11 Nov 2026); Vertiv EnergyCore Li5, 31.1 kWh, 263 kW (0.6 × 0.75 × 2.0 m, drawn): '
             '186.6 kW for 10 min, 124.4 kW for 15 min (our arithmetic from the stored energy); Delta LZH at these runtimes not held (?). Earlier: ' + b['coef'])
b['revised'] = '2026-11-11'
a = Q['arch_dc_battery']
a['formula'] = a['formula'].replace('Li-ion cabinets 1.0–1.8 m² per MW for about 5 min (equipment only)', 'Li-ion cabinets 2.1–3.8 m² per MW for 10–15 min (FM 5-32; 1.0–1.8 at about 5 min scaled by the cabinet count, our arithmetic; equipment only)')
assert '2.1–3.8' in a['formula'], a['formula'][:120]
a['revised'] = '2026-11-11'
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('battery_cabinets, arch_dc_battery updated')
