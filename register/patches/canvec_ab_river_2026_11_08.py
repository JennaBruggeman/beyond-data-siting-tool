"""8 Nov 2026 (J.B.): the Edmonton river edge in tool/shore.json now comes from NRCan CanVec 50K Hydro, Alberta (tool/make_shore_edm_canvec.py), replacing
the Altalis outline shared by Edmonton Public Schools (academic use, not for redistribution; purged from the repository's history). Same use as before:
distance from a site to the water for river cooling (surface_water_sink)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']; m = d['meta']; D = '8 Nov 2026'
K = 'canvecHydroAB'
S[K] = ("NRCan, CanVec 50K Hydro, Alberta (shapefile zip canvec_50K_AB_Hydro_shp.zip, 683,080,663 bytes, J.B. download 19 Oct 2026, Claude Link; files dated "
  "1 Oct 2018): waterbody_2 (501,070 polygons) and water_linear_flow_1_2 (698,545 flow lines). Near Edmonton the North Saskatchewan's water polygons carry "
  "no name (definition 'Not Identified', permanent) and are cut at map-sheet edges; the name is on the flow lines. Kept: outer rings of permanent waterbody "
  "polygons that a flow line named 'North Saskatchewan River' runs through, within 30 km of the tool's Edmonton centre (our rule): 8 polygons, 6 rings, "
  "source date 1977. Checked against the old outline: median 9-10 m apart, 90th percentile 35-47 m. Licence: Open Government Licence - Canada (as for "
  "canvecHydroBC, open.canada.ca dataset 9d96e8c9-22fe-4ad2-b5e8-94a6991b744b; the zip's Read_me does not state it). Trust 80. Source maps from 1977: the "
  "river's banks may have moved (?).")
m['source_kinds'][K] = 'government data'
m['check_log'].setdefault(K, []).append({'check': 1, 'by': 'Code', 'date': D, 'where': 'zip contents, Read_me.txt, shapefile records', 'what': 'river pieces found by the named flow lines; dates 1977; licence as canvecHydroBC'})
for q in d['quantities']:
    if q['id'] == 'surface_water_sink' and K not in q.setdefault('sources', []): q['sources'].append(K)
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('canvec AB river')
