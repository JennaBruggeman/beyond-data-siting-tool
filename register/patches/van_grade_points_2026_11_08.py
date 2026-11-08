"""8 Nov 2026 (J.B., F2 answer 2): per-lot corner and street grades for Vancouver from the City LiDAR 2022 (derived values only), for the
Emergency hub's step-free lobby (spec rule 12) and the Z&D s. 2 base surface (rule 7). tool/make_grade_points.py -> tool/data/grade_points_van.json.
Edmonton: '?' (no grade source with a settled datum). Also J.B.'s answer 4: the refuge in Edmonton BE is a Community Service (500 m2 cap), our reading."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']; m = d['meta']; D = '8 Nov 2026'
TAG = ' ‖ 8 Nov 2026 (grade points)'
if TAG not in S['van_lidar2022_ground']:
    S['van_lidar2022_ground'] += (TAG + ": vertical datum CGVD28 (GVRD), from the City dataset's coordinate-system section, read by J.B. (Claude Link "
      "lidar_datum_2026-11-08.md): the FCL's datum. tool/make_grade_points.py derives, for the 696 Vancouver lots where a data centre is allowed, the grade "
      "1.0 m inside every lot corner (Z&D s. 2 base surface; existing grades where official grades are not on file, our reading) and at 1.5 m outside every "
      "edge of 2 m or more at 5 points (the sidewalk grade for the step-free rule, VBBL 3.8.3.2.(3)); 0.1 m steps, so 13 mm cannot be seen (?). "
      "tool/data/grade_points_van.json; derived values only.")
TAG2 = ' ‖ 8 Nov 2026 (refuge use)'
if 'edm_bl20001' in S and TAG2 not in S['edm_bl20001']:
    S['edm_bl20001'] += (TAG2 + ": s. 8.10: Community Service examples include 'Seasonal Shelters, Year-round Shelters'; Emergency Service is fire, police "
      "and ambulance. The Emergency hub's refuge in BE is read as a Community Service, so the 500 m2 per establishment cap (BE 3.12.1) applies (J.B., "
      "8 Nov 2026; our reading).")
m['check_log'].setdefault('van_lidar2022_ground', []).append({'check': 2, 'by': 'Code', 'date': D, 'where': 'tool/make_grade_points.py on 696 lots', 'what': 'all corners have LiDAR; 339 1st Ave E corners 4.6-6.0 m (Part 7: 4.9 m under the front SE corner)'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('grade points')
