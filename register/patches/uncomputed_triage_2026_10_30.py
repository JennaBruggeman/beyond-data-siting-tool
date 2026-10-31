"""30 Oct 2026: J.B. agreed the triage of the 15 parts the tool never computed.
Dropped (too far down the rabbit hole for a studio design tool): wue, erf, refrigerant_co2e, no2_at_receptor, air_screen_1h,
genset_emission_rate, computing_served, and air_vs_objective (test stage; it only combined the dropped air figures).
Kept as rules elsewhere: Metro Vancouver's Tier 0/1 100 m rule (generator_nox_pm); the air permit trigger now reads its NOx from genset_test.
Parked (only if a design needs it): free_cooling_hours_2050s, ground, vibration_rank.
To build with the Architecture mode: shadow, heat_plume_dT, heat_flux_site, heat_in_water; security_layers (fence drawn)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']
DROP = ['wue', 'erf', 'refrigerant_co2e', 'no2_at_receptor', 'air_screen_1h', 'genset_emission_rate', 'computing_served', 'air_vs_objective']
dq = m.setdefault('dropped_quantities', {})
for k in DROP:
    q = next((q for q in d['quantities'] if q['id'] == k), None)
    if q: dq[k] = {'date': '30 Oct 2026', 'by': 'J.B.', 'why': 'not computed; too detailed for a studio design tool', 'was': q}
d['quantities'] = [q for q in d['quantities'] if q['id'] not in DROP]
for q in d['quantities']:
    q['inputs'] = [i for i in q.get('inputs', []) if i not in DROP]
ALLDROP = set(DROP) | set(dq)
for c in d.get('conditions', []):
    c['quantities'] = [i for i in c.get('quantities', []) if i not in ALLDROP]
Q = {q['id']: q for q in d['quantities']}
a = Q['air_permit_trigger']
if 'genset_test' not in a['inputs']: a['inputs'].append('genset_test')
if '30 Oct 2026' not in a['formula']: a['formula'] += ' (daily NOx = genset_test NOx factor × kWe × test hours; 30 Oct 2026, after genset_emission_rate was dropped)'
h = Q['heat_plume_dT']
if 'dispersion method to be chosen' not in h['formula']:
    h['formula'] = h['formula'].replace(', the plume factor from air_screen_1h', ', a plume factor (dispersion method to be chosen with the Architecture mode spatial rules; air_screen_1h was dropped 30 Oct 2026)')
def st(k, txt):
    if txt not in Q[k]['status']: Q[k]['status'] = txt + ' ' + Q[k]['status']
for k in ('free_cooling_hours_2050s', 'ground', 'vibration_rank'): st(k, 'PARKED 30 Oct 2026 (J.B.): kept in the register, built only if a design needs it.')
for k in ('shadow', 'heat_plume_dT', 'heat_flux_site', 'heat_in_water'): st(k, 'NOT COMPUTED YET: to build with the Architecture mode (30 Oct 2026).')
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok', len(d['quantities']))
