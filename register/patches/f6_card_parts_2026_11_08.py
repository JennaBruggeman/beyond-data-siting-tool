"""8 Nov 2026 (job F6, J.B.): every figure on every card links to its part in the interactive logic diagram. 28 of 49 cards had no part
(checks/f6_missing_parts.md). This patch adds the 14 parts those cards still lacked and registers the sources they cite that were not in
the register yet: VBBL 2025 3.3.1.9 and 3.4.2.5 (J.B.'s copy, read by Cowork), the Vancouver zoning layer (City open data) and the
Emergency hub spec (a J.B. decision, like rule_roomMinimums, which is already registered with its minimum widths).
Display wiring: each part names the code that already computes or holds the figure; no value changes.
Trust: the lowest of the part's sources (J.B. 8 Nov: plant_clearances 50, a maker claim; fire_separations 50, since the 2 h data-hall separation is
operator and insurer practice (J.B. 1 Nov), not code). The checks on the hub layout (t_reach, dead_ends, travel_distance, exit_separation) are
only as sure as the layout they run on: hub_layout is their input (20: room widths include judged rows)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']; m = d['meta']; D = '8 Nov 2026'
SRC = {
 'vbbl25_3319': ("RULE: Vancouver Building By-law 2025, vol. 1, Div. B 3.3.1.9.(1) and (5): public corridors at least 1 100 mm wide; a dead-end corridor "
   "at most 6 m long. Read by Cowork from J.B.'s PDF of the VBBL 2025 (quoted in Claude Link eh/specs/emergency_hub.md Part 3); the same wording as NBC 2020 "
   "3.3.1.9 read by Code on 30 Oct 2026 (nbc2020_v1). 'Dead end' is not defined in the code: J.B. 8 Nov, strict reading, measured along the corridor "
   "centreline. No second check of the VBBL text. Trust 90."),
 'vbbl25_3425': ("RULE: Vancouver Building By-law 2025, vol. 1, Div. B 3.4.2.5.(1)(c): where more than one exit is required, travel distance to at least one exit "
   "at most 45 m in a floor area sprinklered throughout. Read by Cowork from J.B.'s PDF of the VBBL 2025 (quoted in Claude Link eh/specs/emergency_hub.md "
   "Part 3, rule 6); the same clause as NBC 2020 3.4.2.5.(1) read by Code on 30 Oct 2026 (nbc2020_v1). No second check of the VBBL text. Trust 90."),
 'vanZoningLayer': ("City of Vancouver Open Data: the zoning district of every parcel (property tax report field zoning_district, vanTax, joined to the "
   "property parcel polygons), dissolved by zone in tool/make_tiles.py into the zone areas the tool draws (tool/tiles/van/meta.json, overview zones). "
   "2026 exports on J.B.'s computer. Licence: Open Government Licence – Vancouver v1.0 (attribution). Zone areas are the parcels' areas, so streets "
   "and lanes are not counted (our reading of 'zoned area'). Trust 80."),
 'spec_emergencyHub': ("DECISION (J.B., 8 Nov 2026): Claude Link eh/specs/emergency_hub.md, parts 1–3 final (program, variants, layout rules 1–15, "
   "the T-reach test 15d, the fallback ladder, the hub cap) and her F2 answers of 8 Nov (Code's F2_plan_from_code.md). A decision, not a source: no "
   "trust rating (n/a). Each figure in it cites its own code, bylaw or maker source, registered separately."),
}
for k, v in SRC.items():
    if k not in S: S[k] = v
CK = {'vbbl25_3319': {'check': 1, 'by': 'Cowork (main chat)', 'date': D, 'where': "J.B.'s PDF of the VBBL 2025 (quoted in eh/specs/emergency_hub.md)", 'what': 'read once; same wording as NBC 2020 3.3.1.9 (nbc2020_v1, read by Code 30 Oct)'},
      'vbbl25_3425': {'check': 1, 'by': 'Cowork (main chat)', 'date': D, 'where': "J.B.'s PDF of the VBBL 2025 (quoted in eh/specs/emergency_hub.md)", 'what': 'read once; same clause as NBC 2020 3.4.2.5.(1) (nbc2020_v1, read by Code 30 Oct)'},
      'vanZoningLayer': {'check': 1, 'by': 'Code', 'date': D, 'where': 'tool/make_tiles.py and tool/tiles/van/meta.json', 'what': 'zone areas built from the parcels with their tax-report zoning; licence as for the City open data (vanStreets2026 check, 8 Nov)'},
      'spec_emergencyHub': {'check': 1, 'by': 'Code', 'date': D, 'where': 'Claude Link eh/specs/emergency_hub.md', 'what': 'read whole for job F2 (parts 1-3 final, Part 7)'}}
for k, c in CK.items():
    L = m['check_log'].setdefault(k, [])
    if not any(x.get('date') == D and x.get('check') == 1 for x in L): L.append(c)

H = 'tool/hub.js (rule sheet v1)'
NEW = [
 {"id": "zoned_land", "name": "Land where a data centre is allowed", "stage": "place", "unit": "km² and % of the city's zoned area",
  "formula": "sum of the zone areas whose zone allows a data centre (outright or conditional), its share of all zoned area, and this lot's share of it (tool/f1muni_a.js, Industrial land and jobs)",
  "inputs": ["zone", "zoning_status"], "coef": "zone areas are parcel areas (streets and lanes not counted, our reading)",
  "sources": ["vanZoningLayer", "edmZoningGeo", "vanDistricts", "edm_matrix"], "conf": 80, "status": "in hand (8 Nov 2026: wired into the logic; values unchanged)"},
 {"id": "industrial_jobs", "name": "Jobs on industrial land", "stage": "characterise", "unit": "jobs",
  "formula": "jobs on the land where a data centre is allowed: not in the tool (the regional plans measure jobs per area and set no minimum)",
  "inputs": ["zoned_land"], "coef": "?", "sources": [], "conf": 0, "status": "gap: not in the tool yet (the card shows '?')"},
 {"id": "programs_nearby", "name": "Programs nearby", "stage": "characterise", "unit": "count within 2 km; nearest by name",
  "formula": "libraries, community centres and recreation facilities within 2 km of the lot, and the nearest of each (tool/f1arch_site.js, Programs nearby)",
  "inputs": ["parcel"], "coef": "2 km search radius, rings at 1 and 2 km (drawing choice); Edmonton libraries and community centres: not in the tool yet (?)",
  "sources": ["odrsf", "vanPublicRooms2026"], "conf": 80, "status": "in hand (8 Nov 2026: wired into the logic; values unchanged)"},
 {"id": "site_grade", "name": "Ground levels on the lot", "stage": "characterise", "unit": "m (CGVD28, GVRD)",
  "formula": "median ground level of the lot, and per-lot corner grades (1 m inside) and sidewalk grades (1.5 m outside each edge) from the LiDAR ground cells (tool/make_grade.py, tool/make_grade_points.py)",
  "inputs": ["parcel"], "coef": "2 m cells in 0.1 m steps (13 mm cannot be seen); Edmonton: ? (no grade source with a settled datum)",
  "sources": ["van_lidar2022_ground"], "conf": 80, "status": "in hand (Vancouver; Edmonton '?')"},
 {"id": "hub_layout", "name": "Emergency hub layout", "stage": "size", "unit": "rooms per storey, m², ladder step",
  "formula": "bands from the street back, one outline per storey, rooms sized to their minimum area and width, the spare-floor order and the fallback ladder; net area after stairs and lifts (" + H + ")",
  "inputs": ["envelope", "storey_min", "arch_dc_hall", "arch_space_budget", "refuge_people", "loading_need"],
  "coef": "spec rules 1, 2, 15; hub cap 2,325 m² and one hall storey; drawing choices named in hub.js RULES",
  "sources": ["spec_emergencyHub", "rule_roomMinimums", "vbbl25_3315", "vbbl25_3722B", "vbbl25_3831x", "arch_ahsReceptionCentres"], "conf": 20,
  "status": "in hand (8 Nov 2026, job F2; trust 20 because room widths include judged rows)"},
 {"id": "room_widths", "name": "Room minimum widths", "stage": "test", "unit": "m clear width (largest square that fits)",
  "formula": "each room's clear width against the width table; refuge parts under 2.4 m wide do not count toward its area (tool/treach.js tWidth)",
  "inputs": ["hub_layout"], "coef": "fail on the spec width table and Part 3; other widths are notes (J.B. 8 Nov)",
  "sources": ["rule_roomMinimums", "vbbl25_3831x"], "conf": 20, "status": "in hand (rows range from code, 90, to judgment, 20)"},
 {"id": "t_reach", "name": "T-reach: every room reached the right way", "stage": "test", "unit": "pass / findings",
  "formula": "spec test 15d: every room reached from its own line (public, clinic, secure) through doors on shared walls, the public and secure lines never sharing a door (tool/treach.js tReach)",
  "inputs": ["hub_layout"], "coef": "rules R0–R6", "sources": ["spec_emergencyHub"], "conf": 100,
  "status": "in hand (arithmetic test; its result is only as sure as hub_layout)"},
 {"id": "dead_ends", "name": "Dead-end corridors", "stage": "test", "unit": "m (limit 6 m)",
  "formula": "longest walk along the corridor centreline from any point to the nearest point with two ways to separate exits (tool/treach.js deadEnds)",
  "inputs": ["hub_layout"], "coef": "6 m; strict reading (J.B. 8 Nov)", "sources": ["vbbl25_3319", "nbcAB2023"], "conf": 90, "status": "in hand"},
 {"id": "fire_separations", "name": "Fire separations", "stage": "test", "unit": "h by wall and floor",
  "formula": "hours between the occupancies and around the data hall, by wall stretch and floor (tool/hub.js; Separations card)",
  "inputs": ["hub_layout"], "coef": "major occupancy separations from Table 3.1.3.1; the 2 h data-hall room is operator and insurer practice (J.B. 1 Nov), not code",
  "sources": ["arch_nbc3131", "arch_pub_nbc3131full", "arch_dc_fm0532rooms"], "conf": 50, "status": "in hand (8 Nov 2026: wired into the logic; values unchanged)"},
 {"id": "travel_distance", "name": "Travel distance to an exit", "stage": "test", "unit": "m (limit 45 m)",
  "formula": "worst walk to the nearest exit door on a 0.25 m grid in 8 directions through 0.9 m doors (tool/hub.js; Exits card)",
  "inputs": ["hub_layout"], "coef": "45 m, sprinklered throughout", "sources": ["vbbl25_3425", "nbcAB2023"], "conf": 90, "status": "in hand"},
 {"id": "exit_separation", "name": "Exits far enough apart", "stage": "test", "unit": "m apart vs m needed",
  "formula": "door-to-door distance between a zone's exits against half its diagonal or 9 m (the lesser with a public corridor, the greater without) (tool/hub.js; Exits card)",
  "inputs": ["hub_layout"], "coef": "door to door as a stand-in (spec)", "sources": ["vbbl25_3423", "arch_sec_nbcExits", "nbcAB2023"], "conf": 90, "status": "in hand"},
 {"id": "plant_clearances", "name": "Plant clear zones and spacing", "stage": "test", "unit": "m",
  "formula": "chiller clear zones (1.5 m long sides, 2.1 m ends, 2.5 m above), 3.0 / 4.2 m between units, generator sets 2.0 m apart, tank distances, pads 1 m apart with 3 m clear in front (tool/hub.js plantLayout)",
  "inputs": ["generator_sets", "cooling_units", "hub_layout"], "coef": "Vertiv figures are a maker claim; drains, A2L leak and MV distances '?'",
  "sources": ["vertivAFC_clear", "vertivAFC_siting", "arch_csa_c282", "arch_csa_b139", "arch_dc_fm0532rooms"], "conf": 50, "status": "in hand (8 Nov 2026: wired into the logic; values unchanged)"},
 {"id": "building_height", "name": "Building height above the base surface", "stage": "test", "unit": "m",
  "formula": "roof level − the lowest point of the base surface under the building; base surface = the corner grades joined by triangles, both triangulations, the lower surface (tool/hub.js grades)",
  "inputs": ["site_grade", "hub_layout", "envelope"], "coef": "Z&D s. 2 base surface (our reading: existing grades where official grades are not on file)",
  "sources": ["van3575s2", "van_lidar2022_ground"], "conf": 60, "status": "in hand (Vancouver; Edmonton '?')"},
 {"id": "step_free_entry", "name": "Step-free entrance", "stage": "test", "unit": "m rise, and level / sloped floor / ramp",
  "formula": "slab at the lobby door against the sidewalk grade: within 13 mm level; otherwise a floor sloped at most 1:20 over 2.0 m inside the door, or a ramp at most 1:12 (tool/hub.js grades)",
  "inputs": ["site_grade", "flood_exposure", "hub_layout"], "coef": "LiDAR's 0.1 m steps cannot show 13 mm: survey before design",
  "sources": ["spec_emergencyHub", "vbbl25_3835", "van_lidar2022_ground"], "conf": 60, "status": "in hand (Vancouver; Edmonton '?')"},
]
Q = {q['id'] for q in d['quantities']}
for q in NEW:
    if q['id'] not in Q: d['quantities'].append(q)
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('F6 card parts:', len(NEW), 'parts,', len(SRC), 'sources')
