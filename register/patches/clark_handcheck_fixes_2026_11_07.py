"""7 Nov 2026 (J.B., after the 1425 Clark Dr independent hand check, checks/agents/2026-11-07_clark_handcheck.md):
plant yard pushed in past a skewed rear yard line, B139 property-line distance at row ends, deepened until its units pack, units no longer dropped on open
ground outside it; lanes and Vancouver streets reach the rear (no drive charged); largest rectangle for the building; a size fails when the footprint left
cannot hold its smallest floor; Ratios bisects for the largest share that passes at its own size; truck access to the dock checked and flagged; loading:
Vancouver s. 5.1 rounding (nearest whole number, one-half up), clinic as a Health Care Office in row 5.2.9 (our reading), data centre support rooms counted
(the safer reading); unclear lot-line yards kept at the deeper value and flagged. Updates arch_ratios and component_space; adds r_dock_truck_access."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
Q = {x['id']: x for x in d['quantities']}
q = Q['arch_ratios']
F = ("; plant yard (7 Nov 2026, Clark Dr check): pushed in past a skewed rear yard line, rows of generator sets keep the B139 property-line distance at their ends, "
     "deepened a row at a time until its units pack (not for the provisional size), and units that do not fit are reported, never placed on other ground; "
     "a flank or rear street or a lane reaching the rear removes the drive (Vancouver edges now carry what they abut); the building's rectangle is the larger of "
     "the scaled search and a largest-rectangle grid search with the yard lines; a size fails if the footprint left cannot hold mw × 290 ÷ 0.72 m²; "
     "the share is bisected for the largest that passes at its own size")
if 'plant yard (7 Nov 2026, Clark Dr check)' not in q['formula']: q['formula'] += F
C = ("; Clark Dr hand check (7 Nov 2026): with the generators in the plant yard, the tested MW rose (CLARK 4.9 → 8.8, E06A 3.7 → 4.2, E06B 3.3 → 4.4; "
     "V339 1.8 → 1.7): the old figures rested on a ghost drive and on front ground the plant yard did not account for; the dock is then unreachable "
     "on all four test lots (flagged); Engineering's largest size that fits rose too (golden CLARK 2.9 → 14.1, E06A 3.8 → 8.9, E06B 3.8 → 8.4, E123 22.2 → 40, "
     "the slider maximum, with an 86 m plant yard): what binds now is the per-size floor test at the most optimistic density (290 m² per MW ÷ 0.72), "
     "lenient by design; J.B. to review")
if 'Clark Dr hand check (7 Nov 2026)' not in q['coef']: q['coef'] += C
cs = Q['component_space']
G = "; loading (7 Nov 2026): Vancouver s. 5.1 rounding to the nearest whole number, one-half up; clinic as an Office Use (row 5.2.9 Class B, our reading); the data centre's floor includes its support rooms at 33 % (the safer reading)"
if 'loading (7 Nov 2026)' not in cs['coef']: cs['coef'] += G
Cs = {c['id'] for c in d['conditions']}
if 'r_dock_truck_access' not in Cs:
    d['conditions'].append({"id": "r_dock_truck_access", "heading": "6 Regulatory", "name": "Trucks reach the inside dock",
      "test": "a 6.1 m aisle (Parking By-law 5.4.1) clear in front of the dock face, and from it the rear line abuts a street or lane, or a clear run along the rear reaches a side edge that abuts one; plant units, the building and ground-floor programs block it (geometry only; turning not checked ?)",
      "quantities": ["arch_ratios"], "move": ["policy"], "parties": ["operator", "city"], "constraint": True,
      "note": "7 Nov 2026: with the generators in the plant yard the dock is unreachable on CLARK, V339, E06A and E06B: flagged, not routed (a gap in the plant yard costs generator slots and MW; a dock on a side street changes the layout). For J.B. and the section 5 rule sheet.",
      "sources": ["vanParking5", "edmZB580"], "next_action": "J.B.: route (gap in the plant yard, side-street dock) or a smaller size"})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('Clark fixes: arch_ratios, component_space, r_dock_truck_access')
