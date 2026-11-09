"""8 Nov 2026 (job F2): the Emergency hub layout, tool/hub.js rule sheet v1, is live on the Architecture cards (Rooms, Separations, Exits,
Plant and site) when the typology is the Emergency hub; plan.js v0.1 (r_plan_v0) stays for other typologies. One condition, r_hub_v1, holds
its rules and names every drawing choice. The spec sources that were 'spec, not live yet' (typology_spec_rules) are now used by it.
No new source: every figure is a spec figure (Claude Link eh/specs/emergency_hub.md parts 1-3, room_minimums_rule_2026-11-08.md) with an
existing register id, or a drawing choice."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); m = d['meta']
SRC = ['rule_roomMinimums', 'vbbl25_3423', 'vbbl25_3315', 'vbbl25_3722B', 'vbbl25_3835', 'vbbl25_3831x', 'wsbc_firstAid', 'vertivAFC_clear', 'vertivAFC_siting',
       'vertivAFC', 'arch_ahsReceptionCentres', 'arch_edmExtremeWeather', 'arch_sup_abGFNARooms', 'burlingtonPlans2026', 'arch_acc_gcpsg015RZ', 'rehlkoKD1000',
       'eatonCA022021', 'arch_csa_b139', 'fmDS0532', 'vanParking5', 'edmZB580', 'arch_hb_vbblFlood', 'van_lidar2022_ground', 'van_zdb_i2', 'van_zdb_i3', 'van_zdb_s2',
       'arch_edmZB20001_BE', 'edm_bl20001', 'arch_pub_nbc3131full', 'arch_nbc3432']
have = set(d['new_sources']) | set(d.get('old_sources', {}))
missing = [s for s in SRC if s not in have]
assert not missing, missing
C = {"id": "r_hub_v1", "heading": "2 Spatial", "name": "Emergency hub layout (tool/hub.js, rule sheet v1)",
     "test": "the hub is laid out in bands from the street back (hub front row with refuge, day shelter and lobby on the street; public corridor; hub service row; "
             "data-centre entrance row and loading; truck court; plant yard), one outline per storey; stacked in Vancouver I-2 and I-3 (only data-centre entrance "
             "rooms at grade, clinic on storey 2, one hall storey on top), beside in Edmonton (hall at grade behind the hub, one storey); rooms sized to their "
             "minimum area and width; doors only on shared walls; the public and secure lines never share a door; T-reach, dead ends (6 m) and T-width run on "
             "every layout; travel to an exit on a 0.25 m grid (45 m), exits apart (VBBL 3.4.2.3), exterior discharges; plant packed in the yard with the "
             "Vertiv clear zones (chillers on the hub roof where the yard cannot hold them, never on the hall roof); loading per class (Vancouver) or on the "
             "whole floor (Edmonton); street grade at the lobby door, slab, step-free result and height from the corner grades; fallback ladder with the "
             "limiting rule; hub cap 2,325 m2 of data centre, one hall storey",
     "quantities": ["arch_ratios"], "move": ["choice"], "parties": ["operator", "city"], "constraint": False, "sources": SRC,
     "note": "Drawing choices (tool/hub.js RULES): corridors 2.0 m; stairs 2.6 x 6.9 m; lift E1 2.4 x 3.0 m; freight lift E2 2.6 x 3.6 m (car about 2.5 x 3.4 m, "
             "spec 1b); lobby 6.0 m wide; hub service row 6.9 m deep (stacked), 5.0 m (beside); WC rooms 0.9 m of wall a WC; small rooms 1.6 m; storey-2 "
             "data-centre front row 3.6 m; vestibule 2.6 x 6.0 m; dock lobby 6.0 m deep; exit passages 1.2 m; a 6.1 m yard aisle behind the building; base "
             "surface as a fan of triangles from the first corner (our reading); hall storey 6.0 m. Not built yet (J.B. 8 Nov): corner, through, turned and "
             "height-capped variants (flagged). Edmonton grades '?'; Edmonton chillers a placeholder (Vertiv range). Checks: checks/tests/hub_part7.js "
             "(Part 7 on 339 1st Ave E), checks/tests/t_reach.js."}
d['conditions'] = [c for c in d['conditions'] if c['id'] != 'r_hub_v1'] + [C]
for q in d['quantities']:
    if q['id'] == 'typology_spec_rules':
        q['status'] = 'live for the Emergency hub in tool/hub.js (8 Nov 2026, r_hub_v1); other typologies spec only'
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('hub rule sheet v1: r_hub_v1 with', len(SRC), 'sources')
