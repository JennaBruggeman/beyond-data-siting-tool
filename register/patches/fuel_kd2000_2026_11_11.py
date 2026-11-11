"""11 Nov 2026 (J.B.): the standby fuel rate is taken from the Rehlko (Kohler) KD2000 spec sheet G5-626, the generator the tool sizes with,
in place of "one Cat model" (Caterpillar 3516C sheet, unreachable at check 2). G5-626 (KD2000) 9/23, p. 2, Fuel Consumption, diesel, Lph at % load,
standby rating: 100 % 528.3, 75 % 455.9, 50 % 311.6, 25 % 181.5; prime: 494.3 / 409.2 / 286.8 / 169.6; "Volumetric Fuel consumption is up to 4%
higher when using HVO/RD than #2 ULSD." Per kWh at the 2,000 kW standby rating (our arithmetic): 0.264 / 0.304 / 0.312 / 0.363 L per kWh.
Copy read: J.B.-approved download 11 Nov 2026 from resources.kohler.com (the techcomm.kohler.com link returned 404); revision 9/23, while the
register's earlier read cites rev 6/24d (?)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
Q = {q['id']: q for q in d['quantities']}
f = Q['fuel_on_site']
old = 'fuel use ≈0.263 L/kWh (one Cat model, manufacturer claim) ≈6.3 m³ per MW per 24 h'
assert f['coef'].count(old) == 1, 'fuel coef'
f['coef'] = f['coef'].replace(old, 'fuel use 0.264 L/kWh at full standby load (Rehlko KD2000, G5-626 9/23 p. 2: 528.3 L/h at 2,000 kW; manufacturer claim; our arithmetic) ≈6.3 m³ per MW per 24 h; at part load 0.304 (75 %), 0.312 (50 %), 0.363 (25 %) L/kWh; up to 4 % more by volume with HVO/renewable diesel (J.B. 11 Nov 2026; was 0.263, one Cat model)')
f['sources'] = ['rehlkoKD2000' if s == 'cat3516c' else s for s in f['sources']]
for r in f.get('source_roles', []):
    if r.get('id') == 'cat3516c': r.update({'id': 'rehlkoKD2000', 'role': 'data (fuel rate, G5-626 9/23 p. 2)', 'verified': True})
f['revised'] = '2026-11-11'
S = d['new_sources'] if 'rehlkoKD2000' in d['new_sources'] else d['old_sources']
S['rehlkoKD2000'] += (' ‖ FUEL (read 11 Nov 2026, G5-626 (KD2000) 9/23 p. 2, copy from resources.kohler.com/power/kohler/industrial/pdf/g5626.pdf; the techcomm link returned 404; '
  'J.B.-approved download, Claude Link beyond-data-sources/public/rehlkoKD2000/g5626.pdf): diesel Lph at % load, standby 100 % 528.3 (139.6 gph), 75 % 455.9, 50 % 311.6, 25 % 181.5; '
  'prime 494.3 / 409.2 / 286.8 / 169.6; "Volumetric Fuel consumption is up to 4% higher when using HVO/RD than #2 ULSD"; max fuel flow 877 Lph. Manufacturer claim.')
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('fuel_on_site → KD2000')
