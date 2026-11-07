"""7 Nov 2026 (Cowork, V339 boards from checks/layouts/V339.json): five problems in rule sheet v0 fixed.
(1) data-centre stair doors 7.2 m apart against 13.6 m (NBC 3.4.2.3): exit separation now measured (plan.exitSep) and, where the in-line stairs are too
close, one stair goes to the far corner by a spur corridor; (2) programs 0.82 m off the data centre: blocks within 6 m are stretched to touch (floor kept),
else flagged for spatial separation (NBC 3.2.3, not checked); (3) the 61 m greatest building depth was centred on the lot (24 m behind the front line):
now counted from the front yard line; (4) UPS 3.6 m² and battery 2.0 m² were equipment only: rooms now by count (register electrical_room formula);
(5) program storeys above the ground drawn at the hall's storey height where the height limit allows, else at the minimums and flagged.
Updates r_plan_v0, electrical_room, arch_dc_electrical, arch_dc_battery notes."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
TAG = '7 Nov 2026 (V339 board fixes)'
C = {c['id']: c for c in d['conditions']}
c = C.get('r_plan_v0')
if c and TAG not in c['note']:
    c['note'] += (f" {TAG}: rule sheet v0.1. Exits from a floor area at least the larger of half its greatest diagonal and 9 m apart (NBC 3.4.2.3 as WORKLIST 5 states it; clause text not in the repo ?), "
                  "measured straight between the nearest door edges (never longer than the path; path-based check 8 still to come) and reported per block (plan.exitSep). "
                  "Where the in-line stairs are too close, one stair sits at the far corner of the floor, slid along the side wall past the UPS, battery and dock rooms, reached by a 2.0 m spur corridor (drawing choice). "
                  "Program blocks within 6 m of the hall (or of another block at the same height) are stretched to touch it, their floor, sides, street front and anything on them kept (drawing choice); "
                  "the shared face is a fire separation (rating in the rules); a block that cannot be joined is flagged: spatial separation (NBC 3.2.3) not checked (?). "
                  "Above the ground storey, program storeys are drawn at the hall's storey height where the height limit allows, so floors line up; otherwise at the zone minimum and flagged (floors that do not line up share no door).")
    c['sources'] = sorted(set(c.get('sources', []) + ['nbc2020_v1']))
for q in d['quantities']:
    if q['id'] == 'electrical_room' and TAG not in q['coef']:
        q['coef'] += (f" [{TAG}: the Architecture drawing (dcrooms.js) now draws the rooms by count to this formula: UPS frames side by side against one wall (3.6 × 0.9 m each, count from the engine with spares) "
                      "+ 1.5 m working space; Li-ion cabinets (0.6 × 0.75 m) 25 mm off the wall + 0.914 m in front; each room 1.1 m longer for its door (the 1,100 mm egress aisle, NFC 2.7.1.2; drawing choice). "
                      "1.8 MW (N+1): 3 UPS frames, 7 cabinets → 28.6 m² and 12.7 m² (both 2.4 m deep). Room HVAC, fire suppression and switchgear not counted (?).]")
    if q['id'] in ('arch_dc_electrical', 'arch_dc_battery') and TAG not in q['coef']:
        q['coef'] += f" [{TAG}: the per-MW figure stays the basis of Ratios' MW (equipment only); the drawn room is by count (electrical_room), and any hall floor it leaves short is reported (?).]"
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('v339 board fixes')
