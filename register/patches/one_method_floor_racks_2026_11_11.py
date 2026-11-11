"""11 Nov 2026 (J.B.): one method for the floor test and the rack layout. The floor test (size_fit: 637 m² per MW for hall, UPS and battery, the
conservative end of dc_rooms.json) sets the size; the rack layout runs on the building at the size tested (its own generator yard and footprint),
places the racks that size needs spread evenly, and flags only when they cannot be placed. Before: racks counted at Schneider's 2.32 m² a rack on the
current size's building and reported as MW (339 1st Ave E: 500 racks, 3.6-4.0 MW, on a building only the 2.5 MW set-up leaves).
Scope: checks/scope_floor_vs_racks_2026-11-11.md."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
Q = {q['id']: q for q in d['quantities']}
q = Q['hall_layout']; k = 'capacity check (29 Oct 2026)'
assert k in q['formula']
q['formula'] = q['formula'][:q['formula'].index(k)] + (
    'capacity check, revised 11 Nov 2026 (J.B., one method for floor and racks): the layout runs on the building at the size tested (its own generator '
    'yard and footprint), places the racks that size needs (rack_count) spread evenly over every place a rack fits at rack + aisle spacing on the hall '
    'floors (the first holds the UPS and battery room), and flags only when they cannot be placed; the size itself is set by the floor test (size_fit: '
    '637 m² per MW for hall, UPS and battery, conservative end). How the racks are spread is our choice (?). Superseded: racks counted with rows thinned to '
    "2.32 m² a rack (Schneider WP 46, J.B. 30 Oct 2026) on the current size's building and reported as MW (339 1st Ave E: 500 racks, 3.6–4.0 MW, on a "
    'building only the 2.5 MW set-up leaves; at 4.0 MW the deeper generator yard leaves a 501 m² footprint that holds 270 racks)')
q['revised'] = '2026-11-11'
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('hall_layout revised')
