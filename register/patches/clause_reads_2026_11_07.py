"""7 Nov 2026 (WORKLIST 4, "Code: add each result to the register by patch"): Cowork's clause reads,
checks/research_arch_v1/clause_reads_2026-11-07.md (check 1, Cowork, quotes verbatim from the local code and by-law texts).
Appends the reads to existing source entries (marked ' ‖ 7 Nov 2026 clause reads: ...'), adds new source ids, and adds five
conditions the tool's checks will use (check 8 lobby exits, check 10 doorway width, check 15 fire access, plant out of required
yards, grade vs flood level). The schematic checks are not built yet (WORKLIST 5); the conditions say which check uses them."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); m = d['meta']; S = d['new_sources']
D = '7 Nov 2026'; WHERE = 'checks/research_arch_v1/clause_reads_2026-11-07.md'
def log(k, what):
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('date') == D and c.get('where') == WHERE for c in cl):
        cl.append({'check': 1, 'by': 'Claude (Cowork)', 'date': D, 'where': WHERE, 'what': what})
def add_to(k, text, what):
    assert k in S, k
    tag = ' ‖ ' + D + ' clause reads: '
    if tag not in S[k]: S[k] = S[k] + tag + text
    log(k, what)
def new(k, text, kind, what):
    if k not in S: S[k] = text
    m['source_kinds'][k] = kind; m['source_check'][k] = 'claude'; log(k, what)

# 1. Fire department access route
add_to('arch_sec_nbcFireAccess',
  "3.2.5.6.(1) read in NBC 2020, BCBC 2024, NBC(AE) 2023 and VBBL 2025 (same text): clear width not less than 6 m 'unless it can be shown that "
  "lesser widths are satisfactory'; centre-line radius ≥ 12 m; overhead clearance ≥ 5 m; change of gradient ≤ 1 in 12.5 over ≥ 15 m; loads and "
  "all-weather surface; turnaround for any dead-end portion more than 90 m long; connected with a public thoroughfare. Note A-3.2.5.6.(1): consult the "
  "local fire department (the tool uses 6 m and says so).", "3.2.5.6.(1)(a)–(g) in four codes")
new('arch_vbbl32563',
  "RULE: Vancouver Building By-law 2025, Div. B 3.2.5.6.(3) (local copy data/raw/codes/): firefighter path from the curb to the main entrance and to "
  "every access opening 'no less than 1.2 m in width' (900 mm for one dwelling unit), surfaced with concrete, asphalt or similar. Read 7 Nov 2026 (Cowork).",
  'rule', '1.2 m firefighter path')

# 2. Occupant load, exit width, lobby exits
new('arch_nbc3432',
  "RULE: NBC 2020 Div. B 3.4.3.2 and Table 3.4.3.2.-A (same in BCBC 2024 p. 3-236, read as an image; NBC(AE) 2023; VBBL 2025): (1)(a) exit width "
  "= occupant load × 6.1 mm a person for doorways, corridors and passageways; (b) 8 mm a person for stairs with rise ≤ 180 mm and run ≥ 280 mm; "
  "(7) with more than one exit, each counts for at most half. Minimum widths for Groups A, B-1, C, D, E, F: corridors and passageways 1 100 mm, "
  "ramps 1 100 mm, stairs 900 mm (≤ 2 storeys above / 1 below the exit level) or 1 100 mm, doorways 850 mm. Read 7 Nov 2026 (Cowork).",
  'rule', 'exit widths, doorways 850 mm')
new('arch_nbc3442',
  "RULE: NBC 2020 Div. B 3.4.4.2 (same in BCBC 2024, NBC(AE) 2023, VBBL 2025): (1) no exit from a floor area above or below the first storey may lead "
  "through a lobby, except as in (2); (2) one exit only may lead through a lobby, and only if (a) the lobby floor is ≤ 4.5 m above grade, (b) the path "
  "through the lobby to outdoors is ≤ 15 m, and (c) 'the adjacent rooms or premises having direct access to the lobby do not contain a care, residential "
  "or industrial occupancy'. Read 7 Nov 2026 (Cowork).", 'rule', '3.4.4.2.(1), (2)(a)–(c)')
add_to('arch_pub_nbc31171',
  "3.1.17.1.(1)(c): 'the number of persons for which the area is designed, but not less than that determined from Table 3.1.17.1'; a lobby used for "
  "waiting or events: standing space 0.40 m² a person, non-fixed seats 0.75; (2) designed for fewer: 'a permanent sign indicating that occupant load "
  "shall be posted'. No code sets a minimum lobby area: lobby area is a design choice.", '3.1.17.1.(1)(c), (2); no lobby area in code')

# 3. Yards and setbacks
add_to('arch_per_vanS10',
  "Section 10 (https://bylaws.vancouver.ca/zoning/zoning-by-law-section-10.pdf; page header 'April 2025' vs listing 'October 2026' ?): 10.13.1 'No "
  "building or development is permitted in any required yard, except as otherwise provided for by this by-law or the Parking By-law'; 10.8.1 lists "
  "projections into required yards (steps, eaves, balconies, canopies, bay windows, chimneys and similar), no mechanical equipment, generators or "
  "transformers.", '10.13.1, 10.8.1')
add_to('van_zdb_i3',
  "I-3 2.2.2(a): outright uses 'wholly within a completely enclosed building, except for off-street parking and loading, heating and mechanical "
  "equipment'; 2.2.13 accessory buildings up to 3.7 m (4.6 m peak) only in the rear yard, ≥ 3.1 m from a lane centre line, ≤ 10 % of the site. "
  "Map 1 (read as an image at 400 dpi): sub-area B is two small pieces on the south side of Prior St east of Gore Ave; all other I-3 land is sub-area A. "
  "Of the 32 I-3 lots in the tool's tiles, 370 Prior St (381 m²) is in sub-area B (map georeferenced on Main St and Clark Dr from the tool's street "
  "file; our reading).", 'I-3 2.2.2(a), 2.2.13, Map 1 sub-areas')
add_to('van_zdb_i2',
  "I-2 2.2.11: accessory buildings up to 3.7 m (4.6 m peak) outright; 4.2.2: eaves and similar 'may project into the minimum side yards to a maximum "
  "of 1.0 m'.", 'I-2 2.2.11, 4.2.2')
add_to('arch_sec_edmZoneLoading',
  "BE 5.4: 'Surface Parking Lots, and loading, waste collection, storage, service, and display areas must not be located within a Setback'; 5.8: not "
  "between a building and a Street, screened from Abutting Streets and Sites in non-industrial Zones; BE 5.2: 'All mechanical and electrical equipment, "
  "transformers, ducts, cooling towers … must be screened from view from Abutting Streets and Sites in non-industrial Zones'. IM 5.1 and IH 5.1: "
  "'loading, storage, waste collection, service and display areas must not be located within a required Setback'; 5.2 not between a principal "
  "building and a Street, and screened (except a Local Road serving IH or IM, or an IH/IM neighbour); IM 5.3 screening up to 3.7 m. 'Service area' is "
  "not defined in what was read: a plant yard counted as one is our reading (?).", 'BE 5.2/5.4/5.8, IM 5.1–5.3, IH 5.1–5.2')
add_to('arch_up3_edm590', "5.90 projections into setbacks: eaves 0.6 m, steps, platforms, cantilevers, ramps; no equipment.", '5.90: no equipment')

# 4. Flood construction level datum
add_to('arch_hb_vbblFlood',
  "VBBL 2025 Div. A, flood construction level: underside of floor or top of slab on the Burrard Inlet, English Bay, False Creek and Fraser River flood "
  "plains 'shall not be lower than 4.6m Greater Vancouver Regional District datum', plus a wave run-up allowance in the wave-effect zone. The vertical "
  "datum of the City's 2022 LiDAR and how GVRD datum relates to CGVD28 / CGVD2013 are not read (?).", 'FCL 4.6 m GVRD datum; LiDAR datum ?')

# 5. CD-1 (818)
new('arch_van_cd1_818',
  "RULE: City of Vancouver CD-1 (818), 720 Beatty St and 701 Expo Blvd, By-law 13399 as amended to 13918 (27 Feb 2024), "
  "https://cd1-bylaws.vancouver.ca/CD-1(818).pdf: s. 5(h) permits 'Transportation and Storage Uses, limited to Bulk Data Storage'; s. 6 floor area "
  "sub-area A 59 233 m², sub-area B 3 961 m²; subject to Council approval of the form of development. Other CD-1 by-laws not searched (?). "
  "Read 7 Nov 2026 (Cowork).", 'rule', 's. 5(h), s. 6')

C = {c['id']: c for c in d['conditions']}
def cond(o):
    if o['id'] not in C: d['conditions'].append(o); C[o['id']] = o
cond({"id": "r_lobby_exit_industrial", "heading": "6 Regulatory", "name": "No exit through a lobby the data centre opens onto",
  "test": "a shared lobby carries a required exit only if no room with direct access to it is a care, residential or industrial (F-2) occupancy, its floor is ≤ 4.5 m above grade, the path through it to outdoors is ≤ 15 m, and it is the only exit that does so (NBC 3.4.4.2)",
  "quantities": ["arch_ratios"], "move": ["policy"], "parties": ["operator", "city"], "constraint": True,
  "note": "Schematic check 8 (exits). For the Emergency hub: the data centre gets its own entrance and does not open onto the public lobby, or the lobby carries no required exit. Same if the refuge has sleeping rooms or the clinic is a care occupancy (?).",
  "sources": ["arch_nbc3442"], "next_action": "build into check 8 (WORKLIST 5)"})
cond({"id": "r_exit_widths", "heading": "6 Regulatory", "name": "Exit widths from occupant load",
  "test": "doorways, corridors and passageways ≥ 6.1 mm a person (stairs 8 mm), each exit counting for at most half; never under doorways 850 mm, corridors 1 100 mm, ramps 1 100 mm, stairs 900 or 1 100 mm (NBC 3.4.3.2, Table 3.4.3.2.-A)",
  "quantities": ["arch_ratios"], "move": ["policy"], "parties": ["operator", "city"], "constraint": True,
  "note": "Schematic check 10. No code sets a lobby area: the lobby is sized as a design choice from occupant load (3.1.17.1) and these widths.",
  "sources": ["arch_nbc3432", "arch_pub_nbc31171"], "next_action": "build into check 10 (WORKLIST 5)"})
cond({"id": "r_fire_access_route", "heading": "6 Regulatory", "name": "Fire department access route on the lot",
  "test": "where the principal entrance is more than 15 m from a street (3.2.5.5; our reading ?), an access route on the lot: 6 m clear, 12 m centre-line radius, 5 m overhead, turnaround past 90 m (3.2.5.6); Vancouver adds a 1.2 m firefighter path from the curb (VBBL 3.2.5.6.(3))",
  "quantities": ["arch_ratios"], "move": ["policy"], "parties": ["operator", "city"], "constraint": True,
  "note": "Schematic check 15. On deep lots with the entrance at the rear, the 6 m lane and any turnaround are counted in the ground budget.",
  "sources": ["arch_sec_nbcFireAccess", "arch_vbbl32563"], "next_action": "build into check 15 (WORKLIST 5)"})
cond({"id": "r_plant_out_of_yards", "heading": "6 Regulatory", "name": "Plant out of required yards and setbacks",
  "test": "generators, chillers, transformers and the plant yard sit outside required yards (Vancouver ZDB 10.13.1; 10.8.1 lists no equipment) and outside required setbacks, not between the building and the street, screened (Edmonton BE 5.2/5.4/5.8, IM/IH 5.1–5.2; plant yard as a 'service area' is our reading ?)",
  "quantities": ["arch_ratios"], "move": ["policy"], "parties": ["operator", "city"], "constraint": True,
  "note": "Used by the yard packer and schematic check 3 (yards per edge).",
  "sources": ["arch_per_vanS10", "van_zdb_i3", "van_zdb_i2", "arch_sec_edmZoneLoading", "arch_up3_edm590"], "next_action": "yard packer test (WORKLIST 5)"})
cond({"id": "r_grade_vs_fcl_datum", "heading": "2 Spatial", "name": "Grade against the flood construction level: datum not confirmed",
  "test": "Vancouver FCL is 4.6 m GVRD datum (VBBL Div. A); the City 2022 LiDAR grade is compared with it only with a '?' until the LiDAR datum and the GVRD–CGVD link are read",
  "quantities": ["arch_ratios"], "move": ["physics"], "parties": ["operator", "city"], "constraint": False,
  "note": "Schematic check 18. Retrieval: the City's 2022 LiDAR page or metadata (vertical datum) and a City Engineering note on GVRD datum.",
  "sources": ["arch_hb_vbblFlood"], "next_action": "J.B. or Code: read the LiDAR datum and a GVRD datum note"})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('clause reads: sources and 5 conditions written')
