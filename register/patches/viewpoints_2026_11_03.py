"""3 Nov 2026 (Build 2, part 6; checks/agents/BUILD2_BRIEF_2026-11-03.md): the hotel beside 64 Airport Rd NW as a named People-step viewpoint.
Source: the OpenStreetMap extract saved for the E06 site pack (chosen_sites/E06_74_64_Airport_Rd_NW/E06_osm_buildings_2026-10-26.osm; not committed).
Check 1: the build agent read nodes 304182133 and 304153682. Check 2: a second read by the same agent, by script (node tags and position re-parsed
from the file, and the point tested inside City 3D Buildings object 15434 in E06_footprints.geojson); not an independent agent, marked so."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
D = '3 Nov 2026'
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
K = 'arch_vp_osmE06'
S[K] = ("MAP DATA (crowd-sourced; position only, no figures used): OpenStreetMap extract for the E06 site pack, saved 26 Oct 2026 "
        "(chosen_sites/E06_74_64_Airport_Rd_NW/E06_osm_buildings_2026-10-26.osm): node 304182133 'name' = 'Ramada', 'tourism' = 'hotel', "
        "lat 53.5686294, lon -113.5230114 (edited 6 May 2024); node 304153682 'name' = 'Edmonton Inn', 'tourism' = 'hotel', lat 53.5686956, "
        "lon -113.5244619. Both fall inside City 3D Buildings object 15434 (E06_footprints.geojson). No 'Comfort Inn' in the extract (?).")
m['source_kinds'][K] = 'map data (OpenStreetMap, crowd-sourced)'; m['source_check'][K] = 'claude'
cl = m['check_log'].setdefault(K, [])
for e in ({'check': 1, 'by': 'Claude (build agent)', 'date': D, 'where': 'E06_osm_buildings_2026-10-26.osm', 'what': 'hotel nodes, names and positions'},
          {'check': 2, 'by': 'Claude (build agent, second read by script; not independent)', 'date': D, 'where': 'E06_osm_buildings_2026-10-26.osm; E06_footprints.geojson',
           'result': 'confirmed (4 of 4: both names, both positions inside object 15434); "comfort" not found in the file'}):
    if not any(c.get('date') == D and c.get('check') == e['check'] for c in cl): cl.append(e)
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok', K)
