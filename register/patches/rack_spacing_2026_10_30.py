"""30 Oct 2026: J.B. 'lets do the schnider spacing': the 3D gives each rack 2.32 m² (25 ft², Schneider WP 46 Fig. 1). Check 1 (Claude)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
ADD = (" Drawn spacing (30 Oct 2026, J.B.'s choice): each rack is given 2.32 m² (25 ft²) of floor with its aisles, the value Schneider uses in WP 46 Fig. 1 (schneiderWP46; range 25–30 ft²); "
       "the floor beyond rack + aisle is drawn as breaks in each row (runs of 5 racks, 3 empty places: 5/8 of 1.44 → 2.30 m² a rack); the arrangement of that floor is our choice (?)")
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; d = json.loads(p.read_text())
    q = next(q for q in d['quantities'] if q['id'] == 'hall_layout') if pretty else d['quantities']['hall_layout']
    if 'Drawn spacing (30 Oct' not in q['formula']: q['formula'] += ADD
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, 'ok')
