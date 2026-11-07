"""7 Nov 2026 (J.B.): (1) the size test lets support rooms use the ground storey where the zone bars only data storage at grade (I-2 2.2.7, I-3 2.2.11,
FC-2): hall + UPS + battery on the upper storeys, the whole data centre on all storeys (as Ratios already does; 339 1st Ave E had fallen to 0.5 MW);
the tested yard range is 21.72 m (339's own 21.714 m, rounded up, so it is inside its own range); (2) Edmonton generator sets are placed where one set
meets the daytime test at every line (≥ 3.13 m from non-residential, ≥ 9.9 m from residential lines; 78 dB(A) at 7 m, our arithmetic) when the yard has
room, else at the B139 minimum and flagged; (3) side drive in a Vancouver side yard: a flagged option, 'the Director may allow a reduced side yard for
loading and vehicular access (I-3 3.1.2.16)'."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
q = {x['id']: x for x in d['quantities']}['arch_ratios']
F = ("; 7 Nov 2026 (J.B.): with a ground storey kept from data storage, support rooms may use it in the size test; tested yard range 21.72 m; Edmonton "
     "generator sets placed at the daytime-test distance where the yard has room")
if '7 Nov 2026 (J.B.): with a ground storey kept' not in q['formula']: q['formula'] += F
C = {c['id']: c for c in d['conditions']}
c = C.get('r_dock_truck_access')
if c and 'Director may allow a reduced side yard' not in c['note']:
    c['note'] += " Vancouver side drive in the side yard: a flagged option, the Director may allow a reduced side yard for loading and vehicular access (I-3 3.1.2.16) (J.B. 7 Nov 2026)."
g = C.get('r_generator_noise_unchecked')
if g and 'placed where one set meets' not in g['note']:
    g['note'] += " Edmonton: sets are placed where one set meets the daytime test at every line when the yard has room (≥ 3.13 m non-residential, ≥ 9.9 m residential); only if not, at the B139 3.0 m and flagged (J.B. 7 Nov 2026)."
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('v339, noise placement, side-drive wording')
