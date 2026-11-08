"""8 Nov 2026 (J.B.): register the two Edmonton building files the tool's Edmonton tiles already use (make_tiles.py outlines, edm_heights.py and
edm_3d_add.py heights). Checked by Code on 8 Nov 2026 against the City of Edmonton open data portal (dataset metadata; terms page). Neither dataset
names a licence; the portal's terms page is the Open Government Licence – Edmonton v1.0 (July 2022), applied as J.B. directs."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']; m = d['meta']; D = '8 Nov 2026'
LIC = ("Licence: Open Government Licence – Edmonton v1.0 (July 2022; the portal's terms page, "
       "https://data.edmonton.ca/stories/s/City-of-Edmonton-Open-Data-Terms-of-Use/msh8-if28); the dataset page names none (J.B., 8 Nov 2026: use it).")
S['edm_3dBuildings'] = ("City of Edmonton Open Data, 3D Buildings (dataset 78sz-qcfr; file 3dBuildings.gdb.zip, 225,442,192 bytes, J.B. download 14 Oct 2026, "
  "Claude Link; same byte size as the portal file): 'a 3D model of the City of Edmonton, based on the 2019 building outlines ... and 2019 LiDAR data'; "
  "'a static dataset based on data from 2019, so newer buildings may not be present'. Updated 25 May 2023, made public 15 Jun 2023; coordinate system "
  "3TM114-83; layer Building_MP_Merge, 383,329 multipatch parts (tool/edm_heights.py). Used for Edmonton building heights (height = highest − lowest "
  "point of the parts inside an outline; flags 5 and 7 in the tiles). Trust 80. " + LIC)
S['edm_rooflines'] = ("City of Edmonton Open Data, Rooflines (dataset 8zxj-vxqb; file Rooflines_20261014.csv, 138.5 MB, J.B. download 14 Oct 2026, Claude Link): "
  "320,182 building outlines; columns the_geom, OBJECTID, TAX_ROLL_N, CENTROID_X, CENTROID_Y, AREA, COMMENT, Shape_Leng, Shape_Area; no heights. "
  "Rows last updated 25 Jun 2021; the dataset states no coverage year (?). Used as the Edmonton building outlines in the tiles (make_tiles.py). "
  "The portal also holds 'Rooflines (as of 2019)' (jpxi-a9a5) with rooftop and ground elevations, not used. Trust 80. " + LIC)
for k in ('edm_3dBuildings', 'edm_rooflines'):
    m['source_kinds'][k] = 'government data'
    m['check_log'].setdefault(k, []).append({'check': 1, 'by': 'Code', 'date': D, 'where': 'data.edmonton.ca dataset metadata and terms page; file header and size',
      'what': 'dates, columns and size confirmed; no dataset-level licence; portal licence OGL – Edmonton v1.0'})
for q in d['quantities']:
    if q['id'] == 'floor_area':
        for k in ('edm_3dBuildings', 'edm_rooflines'):
            if k not in q.setdefault('sources', []): q['sources'].append(k)
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('edm building sources')
