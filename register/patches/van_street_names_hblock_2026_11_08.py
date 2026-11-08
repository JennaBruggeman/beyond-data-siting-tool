"""8 Nov 2026 (J.B.): Vancouver street names from the City's own file. J.B.'s 16 Oct download of Public streets (data/raw/van/public-streets.csv,
5.3 MB, 17,072 rows; columns Geom, HBLOCK, STREETUSE, geo_point_2d) is back in data/raw/van (data/ stays out of git, .gitignore). tool/add_street_names.py
adds HBLOCK without the block range to tool/streets_van.json ('names', 'nameOf'); the segment geometry is unchanged (checked). Licence read by Code on
8 Nov 2026 from the portal (dataset metadata and https://opendata.vancouver.ca/pages/licence/): Open Government Licence – Vancouver, v1.0. The
address method (method_streetNamesAddr) now names only Edmonton segments and Vancouver segments the City file leaves unnamed."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']; m = d['meta']; D = '8 Nov 2026'
TAG = ' ‖ 8 Nov 2026 (licence, names)'
if TAG not in S['vanStreets2026']:
    S['vanStreets2026'] += (TAG + ": Licence: Open Government Licence – Vancouver, v1.0 (https://opendata.vancouver.ca/pages/licence/; dataset metadata read by Code "
      "8 Nov 2026): copy, publish and adapt with attribution, \"Contains information licensed under the Open Government Licence – Vancouver.\" Street names: "
      "HBLOCK with the block range dropped ('0-100 W 60TH AV' -> 'W 60TH AV'; 'UNNAMED ST' counts as none), added to tool/streets_van.json by "
      "tool/add_street_names.py: 17,069 of the 17,073 street segments named (877 names); lanes carry no name. The saved file has 17,072 rows (one row is "
      "two lines); the portal shows 17,073 records, modified 2 Nov 2026, after J.B.'s download (not re-downloaded).")
if TAG not in S['method_streetNamesAddr']:
    S['method_streetNamesAddr'] += TAG + ": since 8 Nov 2026 Vancouver segments take the City's name (vanStreets2026, HBLOCK); this method names only Edmonton segments and Vancouver segments the City file leaves unnamed."
m['check_log'].setdefault('vanStreets2026', []).append({'check': 3, 'by': 'Code', 'date': D, 'where': 'opendata.vancouver.ca dataset metadata and licence page',
  'what': 'licence Open Government Licence – Vancouver v1.0 confirmed; dataset modified 2 Nov 2026 (17,073 records), after the 16 Oct download'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('van street names (HBLOCK)')
