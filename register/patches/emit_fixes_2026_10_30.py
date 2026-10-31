"""30 Oct 2026: 'What it gives off' fixes (checks/findings_emit.md). J.B.: jobs dropped ('so irrelevant'); backup fuel as suggested;
everything else as suggested except the 15 uncomputed parts (her question pending). Register side; screen side in tool/*.js."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']
# jobs: dropped from the tool and the register's quantities (record kept in meta)
J = next((q for q in d['quantities'] if q['id'] == 'jobs'), None)
if J:
    m.setdefault('dropped_quantities', {})['jobs'] = {'date': '30 Oct 2026', 'by': 'J.B.', 'why': 'not relevant to the tool', 'was': J}
    d['quantities'] = [q for q in d['quantities'] if q['id'] != 'jobs']
    for q in d['quantities']:
        if 'jobs' in q.get('inputs', []): q['inputs'].remove('jobs')
Q = {q['id']: q for q in d['quantities']}
def rep(qid, f, a, b):
    q = Q[qid]
    if b in q[f]: return
    assert a in q[f], (qid, f, a); q[f] = q[f].replace(a, b)
def app(qid, f, txt, mark):
    q = Q[qid]
    if mark not in q.get(f, ''): q[f] = (q.get(f, '') + ' ' + txt).strip()
# 1. liquid capture 57–75 %
rep('liquid_capture', 'formula', '0.5–0.8 cold plate', '0.57–0.75 cold plate (LBNL: 57–59 % typical, 67–75 % best; decided 30 Oct 2026, J.B.)')
for r in Q['liquid_capture']['source_roles']:
    if r['id'] == 'lorenz': r['role'] = 'internal note (no primary named for: 1.0 for immersion)'
# O-13 heat_captured: capture applies to server (IT) heat
rep('heat_captured', 'formula', 'E_reuse = heat_rejected × liquid_capture', 'E_reuse = IT electricity × liquid_capture (capture shares are shares of server heat, not of all heat rejected; O-13, 30 Oct 2026)')
# 5. solar back to NRCan published annual values
for qid in ('pv_roof',):
    q = Q[qid]; q['coef'] = q['coef'].replace('P-16 (30 Oct 2026): one set of NRCan yields everywhere: Vancouver 892 (flat) – 1,006 (latitude tilt), 718 vertical; Edmonton 947 – 1,243, 990 vertical.',
        'Yields (30 Oct 2026, corrects P-16): NRCan published annual values everywhere: Vancouver 892 (flat) – 1,007 (latitude tilt), 716 vertical; Edmonton 944 – 1,244, 989 vertical (data/nrcan_pv_annual.json); the monthly table sums 0–3 kWh differently from rounding.')
# fuel (O-06) and backup
app('fuel_on_site', 'coef', 'O-06 (30 Oct 2026): per nfc2020_4313 Note A-4.1.1.1.(3)(b), tanks feeding emergency generators fall under CSA B139 (paywalled, not read ?) and Part 4 does not apply; the Table 4.3.13.4.-B limits are shown for comparison only. Shown: 12 h (Uptime minimum) and 24–48 h typical (operator claims), J.B. 30 Oct 2026.', 'O-06')
# free-cooling: <= not <
rep('free_cooling_hours', 'formula', 'T_outdoor < threshold', 'T_outdoor ≤ threshold')
# pv_facade one set
app('pv_facade', 'coef', '(30 Oct 2026: these are the NRCan published annual values, used everywhere.)', 'used everywhere')
# grid_co2 (O-11)
app('grid_co2', 'coef', 'O-11 (30 Oct 2026): only the average consumption intensity is used; the long-run marginal in the formula is not computed (?).', 'O-11')
# treatment_energy (O-19)
app('treatment_energy', 'coef', 'O-19 (30 Oct 2026): arden2021 was unreachable in check 2 and its entry gives no table or page, so these figures are marked ? on screen.', 'O-19')
# blowdown_recovery arithmetic
app('blowdown_recovery', 'coef', '(30 Oct 2026: the cycles 2.8 → 4.9 imply blowdown −54 % and make-up −19 % at constant evaporation, our arithmetic; the measured −53 % / −16 % are kept.)', 'imply blowdown')
# heat_delivered (O-14)
rep('heat_delivered', 'coef', '35 MW DC (1 %;', '35 MW DC (≈0.8 %, our arithmetic;')
# heat_flux_site (O-26)
rep('heat_flux_site', 'coef', 'Vancouver grid-cell anthropogenic heat flux 119', 'Vancouver peak grid-cell anthropogenic heat flux 119 (the highest single cell, not a city-wide value)')
# O-16 generator sources
for qid, role in (('generator_co2', 'coefficient'), ('generator_nox_pm', 'coefficient')):
    q = Q[qid]
    if 'ap42_34' not in q['sources']: q['sources'].append('ap42_34')
    if not any(r['id'] == 'ap42_34' for r in q.setdefault('source_roles', [])): q['source_roles'].append({'id': 'ap42_34', 'term': 'AP-42 Table 3.4-1 factors', 'role': role, 'conf': 60, 'verified': True})
for r in Q['generator_co2']['source_roles']:
    if r['id'] == 'eccc': r['role'] = 'climate input only (no emission coefficients)'
app('generator_co2', 'coef', 'O-16 (30 Oct 2026): 2.681 kg CO2/L agrees with AP-42 (0.263 L/kWh × 2.681 ≈ 0.705 kg/kWh vs 706 g/kWh, our arithmetic); cited to ap42_34, not the climate normals.', 'O-16')
# O-18 refrigerant roles
q = Q['refrigerant_co2e']; q['source_roles'] = [r for r in q['source_roles'] if r['id'] != 'eccc']
if not any(r['id'] == 'ipcc2019v3ch7' for r in q['source_roles']): q['source_roles'].append({'id': 'ipcc2019v3ch7', 'term': 'charge and loss ranges, GWPs', 'role': 'coefficient', 'conf': 60, 'verified': True})
# O-09 water behind electricity
for r in Q['water_behind_electricity']['source_roles']:
    if r['id'] == 'femp': r['role'] = 'cited, but holds no grid water figures (?)'
app('water_behind_electricity', 'coef', 'O-09 (30 Oct 2026): 1.25 and 16.8 L/kWh are not in femp; their source is not indexed (?).', 'O-09')
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
