# Test fit: Community pool, both sites (5 Nov 2026)

Public pool + gym sharing one desk, staff rooms, change rooms and plant, with a data centre. One building per site, schematic.

- Research: `community_pool.md` (+ `community_pool_sources.json`).
- Method, checks and drawing style: as the Emergency hub test fits (`testfit_emergency_hub.md`, `code_checklist.md`, `BRIEF_testfit_emergency_hub.md`, TESTFIT_FIX and TESTFIT_FIX2 briefs).
- Boards (scratchpad, not published): `whitemock/project/TestFit_CP_E06B.dc.html` and `TestFit_CP_V339.dc.html`. Canvas: y 14400, x 0 and 1540.
- Scripts (scratchpad `tfcp/`): `run.js` (tool run), `grade.js`, `geom5.py` (geometry; `fix_cp()` holds this pass), `board5.py` (boards and checks), `go.sh`.

Labels: "our arithmetic", "our reading", "drawing choice". **?** = no source. Every room position, corridor width and door position is a drawing choice.

**Replaces** the unreported 4 Nov draft of these two boards (scratchpad `tfpc/`). That draft is out of date: V339 was drawn at 1.5 MW, with rooms 0.25 m into the north side yard, and the E06B pool plant had no outside door of its own.

## Inputs (tool run 5 Nov 2026, Architecture mode)

Pool and gym were picked first, then Ratios was opened. That gives the plant-included low end.

| | E06B, 64 Airport Rd NW (BE) | V339, 339 1st Ave E (I-3) |
|---|---|---|
| MW tested (Ratios low end) | **3.7 MW** (range 3.78–8.18); 35 % · 2,399 m² | **1.4 MW** (range 1.41–3.05); 17 % · 894 m² (was 1.5 before the ground cap) |
| Why it stops there (tool) | hard rules stop it at 3.8 MW with this set-up (enclosed plant room, the Architecture default) | ground: hall needs 447 m² a storey; 686 m² of ground left after loading, the yard, transformers and the drive |
| Plant (tool) | 4 × 2,000 kW generators; 5 air-cooled chillers; racks 463–522; UPS 5; batteries 10–15 | 4 × 1,000 kW generators; 3 chillers; racks 175–198; UPS 3; batteries 4–6 |
| Tool rules for pool + gym | pool "cannot go on a BE lot" (cap blocks). Decision Q4 makes this a 3.18 flag instead, so the pool keeps no ground in the tool's cap | pool not drawn (no free 11 × 27 m area); gym "does not fit on one floor" |
| Grade (tool) | no HRDEM tile for this lot: **?** | 2.2–6.2 m, median 4.9 m, p10 3.6 m (van_lidar2022_ground, LiDAR datum ?); 18 % of the lot is below the 4.6 m FCL (arch_hb_vbblFlood, GVRD datum) |
| Yards (tool, per edge) | street 4.5 m (Collector); alley side, side and rear 0 m | front 0.6 m; sides 7.6 m; rear 3.1 m |

## Short answer

- **Both sites fit as one building.** On both boards:
  - every room is its own block;
  - every room is connected, with travel ≤ 45 m along the path;
  - each zone has two exits;
  - there is no hard fail.
- **E06B:**
  - The pool block sits on the street: pool hall 379 m², change rooms and staff rooms. The hall is behind it, on 2 storeys. The gym is on storey 2, over the change rooms.
  - The pool plant and the chlorine room are on the alley, and each has its **own outside door**.
  - The pool is over the BE 500 m² cap (1,001 m² at grade): **s. 3.18 variance (flag, not block)**.
  - Result: **35 pass, 12 to fix (all ?)**.
- **V339, drawn "with rezoning":** Swimming Pool is not listed in I-3, so the pool needs **rezoning (flag)**.
  - The pool hall is at grade beside the hall, with no hall above it.
  - The gym is on storey 2. The hall is on storeys 2–3, cut to 1.4 MW (2 × 445 m²).
  - Result: **33 pass, 14 to fix (all ?)**.
- **Noise (re-run):** with the chillers in an enclosed rooftop plant room (−25 dB), every receiver passes.
  - E06B worst: 38.0–48.6 dBA.
  - V339 worst: 46.5–49.8 dBA.
- **Under-sized against sources:**
  - V339: pool storage 24 vs 44 m²; admin storage 6 vs 20 m²; DC break room 20 vs 24 m²; storage and staging 46 vs 58.6 m².
  - E06B: climbing wall (option) 31 vs 60 m²; admin storage 18 vs 20 m²; shipping 41 vs 45 m².

## What changed in this pass

| | E06B | V339 |
|---|---|---|
| Data centre | 3.7 MW, unchanged: hall 2 × 1,168 ≥ 2,331 m² | 1.5 → **1.4 MW**: hall 2 × 474 → 2 × 445 m² (≥ 882). The 1.5 m east strip on storeys 2–3 becomes DC spare (28 m² each, drawing choice). Fuel 6,190–6,850 L; racks 175–198 |
| Pool plant | had no outside wall (reached through the staff corridor) → **own alley door**; 77 → 86 m² (≥ 71) | own door to the south side yard (unchanged) |
| Chlorine | 2.3 × 3.5 m beside the plant → **chlorine room 9 m² on the alley wall**: outward door to outside only, no door into the building (AB Standata) | chlorine and acid in separate rooms, each with an outside door only (BC 9.9; unchanged) |
| Acid | in the alley column → own room off the pool plant (separate from chlorine) | unchanged |
| Pool storage | 3 m shorter at the alley end, 3 m longer into the deck: 44 m² kept; pool hall 388 → 379 m² | 27 → 24 m² (north wall) |
| North wall | — | rooms added by the pool layout pulled back to v = 15.15 (inside the 7.6 m yard, as in check 2). S1 moves 0.25 m south; the DC door follows |
| Checks added | data centre at the tool low end; pool beside the hall with its own plant; chlorine room; chemical system (?) | the same, plus flood level and grade from the tool |

## E06B: 64 Airport Road NW, Edmonton (BE)

Board `TestFit_CP_E06B.dc.html`: **35 pass, 12 to fix (?), 0 fail.**

Drawn (our arithmetic):

- GFA 4,856 m², all storeys.
- Programs side 1,505 m², with the lobby, stairs and lift.
- Hall 2,335 m²; DC support 553 m².

### Room schedule

| Room | Rule or basis | Sourced | Drawn | Source ids |
|---|---|---|---|---|
| **DATA CENTRE (3.7 MW IT, tool Ratios low end with pool + gym, 5 Nov 2026; PUE 1.4–1.55)** | | | | |
| Data hall, 2 storeys | 630 m²/MW × 3.7 MW (the end the tool pairs with the low MW) | 2,331 m² | 2 × 1,168 m² | arch_dc_hall, it_load_outside (operator claims) |
| Racks · room cooling units | P ÷ 7.1–8 kW · tool count, N+1 | 463–522 · 17–23 | inside the hall | rack_count, room_cooling_units (tool run) |
| UPS room | ⌈3.7⌉ + 1 = 5 modules (N+1, tool default), 3.6 × 0.9 m + 1.5 m working space | 43.2 m² (our arithmetic) | 43.2 m², 1 h | ups_modules, galaxyVX, electrical_room, cec2024 |
| Battery room (Li-ion, 5 min) | 10–15 cabinets (400–263 kW); 15 drawn, 0.6 × 0.75 m, 0.914 m front; groups ≤50 kWh 0.9 m apart (US benchmark) | ≈47 m² (our arithmetic) | 46.8 m², 2 h | battery_cabinets, vertivLi5, deltaLZH, nfpa855_2026 |
| Battery room HVAC | HVAC separate from the equipment areas (insurer) | ? | 21.1 m² | arch_up_fm0528 |
| Meet-me rooms | 2 (one site visit); size not public (TIA-942 paywalled) | ? | 2 × 28 m² | tourVAN3, arch_dc_ualbertaTelecom |
| MV switchgear, main electrical | 1 h, apart from generators (insurer); size not public | ? | 55 m² | arch_up_fm0523, burlingtonPlans2026 |
| Transformers | ⌈5.74 MVA ÷ 2.5⌉ + 1 = 4 pads, 2.63 × 2.49 m (25/35 kV unit; EPCOR voltage ?) | 4 pads | 4 pads, 13.5 m from building | transformers, eatonCA022021, epcor_ccg |
| Generators (yard) | ⌈3.7 × 1.55 ÷ 2⌉ + 1 = 4 × 2,000 kW, 13.49 × 3.49 m | 4 sets | 4 sets | generator_sets, rehlkoKD2000, fmDS0532 |
| Fuel | 12 h × 5.18–5.74 MW × 0.263 L/kWh (claims); code floor 2 h | 16,350–18,110 L; 2 h: 2,730–3,020 L (our arithmetic) | sub-base tanks (drawing choice) | fuel_on_site, cat3516c, arch_csa_c282 |
| Loading | BE: 1 space for 2,500–7,500 m², 9.0 × 3.0 × 4.0 m, not in a setback | 27 m² | bay 30.6 m² | edmZB580, arch_sec_edm580 |
| Shipping and receiving | filed plans: loading/garbage room 45 m² | 45 m² | 40.9 m² | burlingtonPlans2026 |
| Storage and staging | filed plans 40 + 18.6 m²; de-box outside the hall | 58.6 m² | 57.2 m² | burlingtonPlans2026, arch_dc_fm0532rooms |
| Security control room / NOC | alarms at a constantly attended place; size ? | ? | 23.0 m² | arch_sec2_gcpsg003, arch_dc_fm0532rooms |
| Portal + 850 mm door | 1.8 m wheelchair portal; swing door beside it for egress | 1.8 × 1.8 m | 8.3 m² | arch_acc_gunneboHiSec, arch_acc_nbcAccessible |
| Offices | filed plans: open office 100 m² (benchmark); size ? | ? | 18.1 m² | burlingtonPlans2026 |
| Break room | filed plans: staff lounge 24 m² | 24 m² | 24.4 m² | burlingtonPlans2026 |
| Staff WC, shower, lockers | designed staff load ≤10 (≈4–5 staff, claims) → 1 WC; shower optional | 1 WC | 16.6 · 11.0 m² | arch_per_nbcWC, arch_dc_nbcJanitorShower, hillingdon_up4, jlarc2024 |
| Sprinkler valve room, cylinders | size ? (NFPA 13, 2001 paywalled) | ? | 12.3 m² | arch_dc_fm0532rooms |
| Garbage room | refuse room 1 h, sprinklered (NBC 3.6.2.5.(1)); size ? | ? | 28.1 m² | adj_service.md |
| Heat hub / ETS (add-on) | utility room 27–55 m², 2 h, card reader (Blatchford, benchmark) | 27 m² | 28.1 m² | arch_ho_breMultiUnit2025 |
| DC staff entrance: vestibule · guard point | reception zone at the entry; sizes ? | ? | 7.5 · 6.0 m² | arch_acc_gcpsg015RZ, arch_sec_gcpsg014 |
| **PROGRAMS (community_pool.md)** | | | | |
| Pool hall, 25 m × 4 lanes | tank 25 × 8.5 = 212.5 m²; deck 1.8 m all round (AB) to the Eastglen ratio | 346–452 m² | 379 m² | arch_sportEngPoolsDGN, arch_sup_nbcAE7Pools, arch_edmEastglen2017 |
| Change rooms, women · men | dressing 0.32–0.5 m²/bather × 142 + showers and WCs 28 m² a sex (Eastglen) | 50.5–63.5 m² each | 57 · 57 m² | arch_sup_bcPoolDesign5, arch_sup_nbcAE7Pools, arch_sup_eastglenRooms |
| Universal change (shared) | one per facility (our reading of 3.8.2.8.(13)) | 6 m² | 16 m² | arch_sup_nbcUniversal, arch_sup_eastglenRooms |
| Desk + cash · first aid | one control desk and first aid for the whole facility (Eastglen) | 19 · 6 m² | 21 · 21 m² | arch_sup_eastglenRooms |
| Lifeguard + foreman office · staff break + change | Eastglen | 28 · 39 m² | 28 · 39 m² | arch_sup_eastglenRooms |
| Storage: pool · admin | Eastglen 44 · 20 (chemical 3 in the chemical rooms) | 44 · 20 m² | 44 · 18 m² | arch_sup_eastglenRooms |
| Laundry · custodial | Eastglen 6 · 10 | 16 m² | 24 m² | arch_sup_eastglenRooms |
| Pool plant | ⅓–½ of the water area; outside access (AB 7.2.3.38); pool equipment only (BC 9.8) | 71–106 m² | 86 m² | arch_edmEastglen2017, arch_svc_nbcae72, arch_adj_bcPoolDesign |
| Chlorine room · acid store | separate rooms, 110 % spill containment (BC 9.9); gas chlorine: at grade, outward door to outside only, 1 h (AB) | ? (Eastglen chemical 3 m²) | 9.0 · 7.8 m² | arch_up2_bcPoolGuide, arch_adj_abStandataCl |
| Fitness floor (20–25 users) | Eastglen fitness centre; over-height ≥ 3.3 m | 186 m² | 200 m² | arch_sup_edmEastglenRooms |
| Gym dry change | shared with the pool change rooms (Eastglen option; Mill Woods keeps one) | 0 (shared) | 0 | arch_sup_edmEastglenRooms, arch_sup_edmMillWoods2013 |
| Gym reception, office, break, first aid | shared with the pool set (Eastglen) | 0 (shared) | 0 | arch_sup_eastglenRooms |
| Climbing wall (option) | Calgary 50 × 1.20 | 60 m² | 31 m² | arch_sup_calgaryRecFP2012 |
| Gym storage | size ? | ? | 48 m² | drawing choice |
| **SHARED** | | | | |
| Shared lobby | size ?; main entrance from the street | ? | 54 m² | drawing choice |
| Public and staff corridors | public ≥ 1,100 mm (2.0 m drawn); staff 2.0 m | ? | 228 m² | cc_nbcAccessToExit |
| Stairs S5, S6 (programs) | 6.0 m storey: 7.0 × 2.6 m (our arithmetic, as the Emergency hub fit) | 18.2 m² each | 2 stairs | cc_nbcExits |
| Lift E1 (public) · universal WC | storey 2 reached; size ? · 4.6 m² | ? · 4.6 m² | 5.2 · 5.2 m² | cc_accessStoreys, arch_sup_nbcUniversal |
| Programs mechanical room | pool air at −15 to −40 Pa (ASHRAE); size ? | ? | 32 m² | arch_up4_ashraeCh6Pools |

### Compliance

| Check | Clause | Plan figure | Result |
|---|---|---|---|
| Building classification | NBC 3.2.2 (our reading) | F-2 governs (data centre); A-3 pool, A-2 gym; sprinklered, noncombustible, 1 h floors (as the Emergency hub fit) | pass |
| Data centre at the tool low end | Ratios, plant included (tool run 5 Nov 2026, pool + gym picked); arch_dc_hall | 3.7 MW: hall 630 m²/MW × 3.7 = 2,331 m² needed, 2,335 m² drawn (our arithmetic) | pass |
| Sprinklers | 3.2.2.77 | whole building sprinklered (NFPA 13) | pass |
| Pool (A-3) to data centre (F-2) | Table 3.1.3.1 (arch_nbc3131, typ_warm_bath_bcbc3131) | 2 h along the pool block, change rooms and staff rooms where they meet the data centre (drawn) | pass |
| Pool (A-3) to gym (A-2) | Table 3.1.3.1 | 1 h floor under the gym (drawing choice of 1 h) | pass |
| Connected | J.B. 4 Nov 2026; 3.3.1 | 54 rooms on 2 storeys: each reaches the lobby (storey 2: its landing) and an exit outside the secure line; data-centre rooms reach their own exits inside it (our arithmetic, doors as drawn) | pass |
| Travel distance along the path | 3.4.2.5.(1) | storey 1 36.0 m (Data hall, storey 1); storey 2 39.0 m (Data hall, storey 2) ≤ 45 m sprinklered; along corridors and through doors (our arithmetic) | pass |
| Two exits | 3.4.2.1.(1); 3.4.2.3.(1) | storey 1: data centre 9, 69.2 m apart ≥ 37.5 m; pool + gym facility 6, 49.6 m apart ≥ 26.4 m; lobby 2, 5.8 m apart ≥ 5.2 m · storey 2: gym 2, 40.9 m apart ≥ 22.8 m; data centre 2, 55.6 m apart ≥ 31.1 m; none through the secure line (our reading: lobby shared; the rest of the programs side is one facility) | pass |
| Storey-2 stairs discharge outside | 3.4.4.2.(1), (2)(e) | S6 to the street, S5 to the alley: no exit through the lobby | pass |
| Public corridor width · dead ends | 3.3.1.9.(1), (5) | public corridors 2.0 m ≥ 1,100 mm; the public corridor runs from the lobby to the staff corridor and its alley door (no dead end over 6 m) | pass |
| Dead ends, corridors in the secure line | 3.3.1.9.(5) scope ? | secure passage 22 m with an egress-only street door at its west end and the hall at its east end: no dead end | pass |
| DC staff entrance | GCPSG-015 5.3.2; GCPSG-014 6.7 (federal benchmarks) | own street door at the south corner → vestibule with a guard point → portal (1.8 m wheelchair model) → secure passage; not through the shared lobby (drawing choice) | pass |
| Reception-zone rooms, one door | 3.3.1.5.(1)(d) | vestibule + guard point 13.5 m² ≤ 200 m²; 5.9 m to the exterior door ≤ 25 m (our arithmetic) | pass |
| Locked doors on exit paths | 3.4.6.16 | secure passage street door and portal side door release on alarm and power loss | pass |
| Secure line | notes 1 Nov 2026; J.B. 4 Nov 2026 | inside the building around the data centre and dock; plant in its own 1.9 m enclosures; pool, gym outside | pass |
| Change rooms beside the pool | BC 5.1 (typ_community_pool_bcPoolGuide51) | change rooms open onto the deck (≤ 60 m); route lobby → change (WC, showers) → deck | pass |
| Pool beside the hall, own plant | community_pool.md §2, §4; FM 5-32 2.2.1.6 | pool hall at grade beside the hall, no hall above it; its own pool plant (86 m² ≥ 71 m², ⅓–½ of the water, arch_edmEastglen2017) and chemical rooms | pass |
| Pool equipment room | BC 9.8 (arch_adj_bcPoolDesign); NBC(AE) 7.2.3.38 (arch_svc_nbcae72) | own door to the alley, a door to the deck and one to the staff corridor; pool equipment only | pass |
| Chlorine room (Alberta) | Standata (arch_adj_abStandataCl); NBC(AE) 7.2 (arch_adj_nbcAE72) | at grade on the alley wall, outward door to the outside only, no door into the building; 1 h required, drawn as a rated service room; acid in its own room off the pool plant (separate from chlorine); nearest generator 43 m (our arithmetic) | pass |
| Chemical system, exhaust, delivery | BC 9.9; arch_adj_abStandataCl | gas or liquid chlorine ?; 110 % spill containment not drawn; chlorine exhaust ≥ 3 m from air intakes: intakes not placed ?; forklift clearance on the delivery path ? | ? |
| Pool hall height | arch_sportEngPoolsDGN (UK benchmark) | 6.0 m storey ≥ 3.5 m clear (flat ceiling); structure depth ? (drawing choice) | pass |
| Pool air | ASHRAE ch. 6 (arch_up4_ashraeCh6Pools) | pool hall at −15 to −40 Pa, doors with closers; dehumidifier and ducts not drawn (size ?) | ? |
| Spectators | NBC(AE) 7.2.2.2 (arch_adj_nbcAE72) | no spectator seating drawn; viewing only through the lobby glazing (drawing choice) | pass |
| Water closets, pool | Table 3.7.2.2.-A | WCs inside the change rooms; pool occupant load ? → count ? | ? |
| Gym height | arch_sup_edmEastglenRooms | 6.0 m storey ≥ 3.3 m | pass |
| Storey 2 access | NBC(AE) 3.8.2.3 | public lift E1 from the lobby side to the gym landing | pass |
| Nothing wet over the hall | FM 5-32 2.2.1.6 (insurer) | pool, change rooms, gym and chillers not above the hall | pass |
| Zoning: pool use | BE 3.12.1, 3.18 (arch_zon_EdmZones); decision Q4 | Community Service (pool) 1,001 m² at grade > 500 m² cap: s. 3.18 variance (flag, not block) | ? |
| Zoning: gym use | BE (arch_zon_EdmZones) | Minor Indoor Entertainment (fitness, climbing): permitted, no cap; one establishment or two uses ? | pass |
| Zoning: FAR | BE 4.1.2 | 4,856 m² ÷ 4,284 m² = 1.13 ≤ 1.6 (our arithmetic) | pass |
| Zoning: height | BE 4.1.1 | hall 12.0 m; storey-2 roof 12.0 m + plant room about 3.9 m = 15.9 m ≤ 16.0 m (plant-room height drawing choice); grade ? | pass |
| Zoning: setbacks | BE Table 4.1 (tool, per line) | street 4.5 m (Collector); alley, sides, rear 0 m | pass |
| Loading not between building and street | BE 5.8 | dock on the alley side (unchanged) | pass |
| Plant screened from the street | BE 5.2 | chillers in a rooftop plant room; generators in the rear yard | pass |
| Transparent street front | BE 5.3.1–5.3.2 | lobby and pool hall glazed to the street (drawing choice); DC door and S6 on the same front | pass |
| Façade articulation | BE 5.1 | two techniques: not designed yet | ? |
| Fire department access | 3.2.5.5.(1) | principal entrance 4.5 m behind the street lot line; kerb distance ? | ? |
| Site grade | Bylaw 20001 s. 5.70 | tool: no HRDEM tile for this lot (grade ?); height base (Grade) not set ? | ? |
| Plant enclosures | J.B. design choice; CSA B139 Table 2 | generators and transformers in their own 1.9 m enclosures (unchanged yard) | pass |
| Chillers in an enclosed rooftop plant room | FM 5-32 2.2.1.6; NSW 2021 s. 4.3 (arch_nz_nswDcNoise) | 5 chillers on the storey-2 roof (12.0 m) over the gym, not the hall | pass |
| Noise at the lot lines | Bylaw 14600 ss. 20, 22; tool noiseCheck | 5 chillers (Lw 109.8–113.1 dBA, tool method, our arithmetic). Without mitigation: 63.0 dBA at 8065 Cedric Mah Road NW (BRH), 86.8 m, limit 50. With the rooftop plant room (−25 dB): worst 38.0–48.6 dBA ≤ limits; nearest residential 8065 Cedric Mah Road NW 38.0–41.3 ≤ 50 dBA. Flag: a building across the street with no parcel record reads 48.6 dBA (standard units) at 37.3 m vs 50 if residential (its use and property line ?); the street lot line itself reads 55.2–58.5 dBA | pass |
| Noise mitigation used | arch_nz_nswDcNoise s. 4.3, Table 4-5 | rooftop plant room: louvre airflow to the chillers ? (maker approval); height about 3.9 m (drawing choice) | ? |
| Generator, pool and programs plant noise | tool noiseCheck scope | generators (testing), pool plant and the programs mechanical room: no unit sound power on file ? | ? |
| Structural grid | — | column grid drawn as a drawing choice; pool hall clear span; no sourced data-hall span or bay ? | ? |
| Ducts across rated separations | 3.1.8.7.(1), (2); 3.1.9.1 | 1 crossings drawn (1 h): fire or smoke/fire dampers; none into the data centre (FM 5-32 2.6.6.2.2) | pass |
| Programs mechanical room | 3.6.2.1.(1), (6) | placed at grade; size ? (pool dehumidification and gym/spa HVAC not sized); 1 h drawn (drawing choice) | ? |
| Closures in 2 h walls | Table 3.1.8.4 | 1.5 h doors (not drawn) | ? |

## V339: 339 1st Avenue East, Vancouver (I-3), with rezoning

Board `TestFit_CP_V339.dc.html`: **33 pass, 14 to fix (?), 0 fail.**

Drawn (our arithmetic):

- GFA 3,023 m², all storeys.
- Programs side 1,177 m², with the lobby, stairs and lift.
- Hall 891 m²; DC support 493 m².

### Room schedule

| Room | Rule or basis | Sourced | Drawn | Source ids |
|---|---|---|---|---|
| **DATA CENTRE (1.4 MW IT, tool Ratios low end with pool + gym, 5 Nov 2026; PUE 1.4–1.55)** | | | | |
| Data hall, storeys 2–3 | 630 m²/MW × 1.4 MW; not at the ground floor | 882 m² | 2 × 445 m² | arch_dc_hall, it_load_outside, van_zdb_i3 |
| Racks · room cooling units | P ÷ 7.1–8 kW · tool count, N+1 | 175–198 · 7–10 | inside the hall | rack_count, room_cooling_units (tool run) |
| UPS room | ⌈1.4⌉ + 1 = 3 modules (N+1), 3.6 × 0.9 m + 1.5 m working space | 25.9 m² (our arithmetic) | 37.0 m² (2 + 1 in facing rows) | ups_modules, galaxyVX, electrical_room, cec2024 |
| Battery room (Li-ion, 5 min) | 4–6 cabinets; 6 drawn; groups ≤50 kWh 0.9 m apart (US benchmark) | ≈21 m² (our arithmetic) | 21.5 m², 2 h | battery_cabinets, vertivLi5, deltaLZH, nfpa855_2026 |
| Battery room HVAC | separate from the equipment areas (insurer) | ? | 12.0 m² | arch_up_fm0528 |
| Meet-me rooms | 2 (one site visit); size ? | ? | 2 × 8.4 m² | tourVAN3, arch_dc_ualbertaTelecom |
| MV switchgear, main electrical | above the flood level (storey 3); size ? | ? | 26 m² | arch_up_fm0523, adj_service.md |
| Transformers | ⌈2.17 MVA ÷ 2.5⌉ + 1 = 2 pads, 2.63 × 2.49 m; BC Hydro 1 m to building, 3 m in front | 2 pads | 2 pads | transformers, eatonCA022021, bchES54F |
| Generators (yard) | ⌈1.4 × 1.55⌉ + 1 = 4 × 1,000 kW, 8.43 × 2.62 m; above the flood elevation | 4 sets | 4 sets, pads 5.0 m ≥ 4.6 m (datum ?) | generator_sets, rehlkoKD1000, arch_csa_c282 |
| Fuel | 12 h × 1.96–2.17 MW × 0.263 L/kWh (claims); code floor 2 h | 6,190–6,850 L; 2 h: 1,030–1,140 L (our arithmetic) | sub-base tanks (drawing choice) | fuel_on_site, cat3516c, arch_csa_c282 |
| Loading | Class B: 1 for 465 m² + 1 for the next 1,860 m² → 2 for 1,706 m² of data centre drawn (our arithmetic); 10.2 × 3.4 × 3.8 m, aisle 6.1 m | 2 spaces | 2 bays, 69.4 m² | vanParking5 |
| Shipping and receiving | filed plans 45 m² | 45 m² | 50.4 m² | burlingtonPlans2026 |
| Storage and staging | filed plans 40 + 18.6 m² | 58.6 m² | 46.2 m² | burlingtonPlans2026, arch_dc_fm0532rooms |
| Security control room / NOC | size ? | ? | 46.9 m² | arch_sec2_gcpsg003 |
| Portal + 850 mm door | 1.8 m wheelchair portal; swing door for egress | 1.8 × 1.8 m | 4.8 m² | arch_acc_gunneboHiSec, arch_acc_nbcAccessible |
| Offices | filed plans 100 m² (benchmark); size ? | ? | 22.3 m² | burlingtonPlans2026 |
| Break room · staff WC | filed plans 24 m² · 1 WC (VBBL: one WC serves ≤25) | 24 m² · 1 WC | 20.0 · 7.5 m² | burlingtonPlans2026, arch_per_nbcWC |
| Sprinkler valve room · janitor | size ? | ? | 11.0 · 3.2 m² | arch_dc_fm0532rooms, arch_dc_nbcJanitorShower |
| Garbage room | at grade beside the truck stop, 4.5 m clear (Vancouver); 1 h | ? | 37.8 m² | servicing_social.md, adj_service.md |
| Heat hub / ETS (add-on) | NEU minimum 6 × 3 m below 13,940 m², on the perimeter | 18 m² | 26.5 m² | neuETS |
| Spare (DC, storeys 2–3) | hall strip not needed at 1.4 MW | — | 2 × 28.3 m² | drawing choice |
| DC staff entrance: vestibule · guard point | reception zone at the entry; sizes ? | ? | 6.6 · 7.1 m² | arch_acc_gcpsg015RZ, arch_sec_gcpsg014 |
| **PROGRAMS (community_pool.md)** | | | | |
| Pool hall, 25 m × 4 lanes | tank 25 × 8.5 = 212.5 m²; deck 1.8 m all round (AB) to the Eastglen ratio | 346–452 m² | 346 m² | arch_sportEngPoolsDGN, arch_sup_nbcAE7Pools, arch_edmEastglen2017 |
| Change rooms, women · men | dressing 0.32–0.5 m²/bather × 142 + showers and WCs 28 m² a sex (Eastglen) | 50.5–63.5 m² each | 57 · 63 m² | arch_sup_bcPoolDesign5, arch_sup_nbcAE7Pools, arch_sup_eastglenRooms |
| Universal change (shared) | one per facility (our reading of 3.8.2.8.(13)) | 6 m² | 6 m² | arch_sup_nbcUniversal, arch_sup_eastglenRooms |
| Desk + cash · first aid | one control desk and first aid for the whole facility (Eastglen) | 19 · 6 m² | 20 · 9 m² | arch_sup_eastglenRooms |
| Lifeguard + foreman office · staff break + change | Eastglen | 28 · 39 m² | 28 · 38 m² | arch_sup_eastglenRooms |
| Storage: pool · admin | Eastglen 44 · 20 (chemical 3 in the chemical rooms) | 44 · 20 m² | 24 · 6 m² | arch_sup_eastglenRooms |
| Laundry · custodial | Eastglen 6 · 10 | 16 m² | 16 m² | arch_sup_eastglenRooms |
| Pool plant | ⅓–½ of the water area; outside access (AB 7.2.3.38); pool equipment only (BC 9.8) | 71–106 m² | 73 m² | arch_edmEastglen2017, arch_svc_nbcae72, arch_adj_bcPoolDesign |
| Chlorine room · acid store | separate rooms, 110 % spill containment (BC 9.9); gas chlorine: at grade, outward door to outside only, 1 h (AB) | ? (Eastglen chemical 3 m²) | 7.8 · 7.5 m² | arch_up2_bcPoolGuide, arch_adj_abStandataCl |
| Fitness floor (20–25 users) | Eastglen fitness centre; over-height ≥ 3.3 m | 186 m² | 188 m² | arch_sup_edmEastglenRooms |
| Gym dry change | shared with the pool change rooms (Eastglen option; Mill Woods keeps one) | 0 (shared) | 0 | arch_sup_edmEastglenRooms, arch_sup_edmMillWoods2013 |
| Gym reception, office, break, first aid | shared with the pool set (Eastglen) | 0 (shared) | 0 | arch_sup_eastglenRooms |
| Gym storage | size ? | ? | 6 m² | drawing choice |
| **SHARED** | | | | |
| Shared lobby | size ?; main entrance from the street | ? | 68 m² | arch_up_vanZDB10 |
| Public and staff corridors | public ≥ 1,100 mm (2.0 m drawn); staff 2.0 m | ? | 107 m² | cc_nbcAccessToExit |
| Stairs S1, S3 (programs) | 6.0 m storey: 7.0 × 2.6 m (our arithmetic, as the Emergency hub fit) | 18.2 m² each | 2 stairs | cc_nbcExits |
| Lift E1 (public) · universal WC | storey 2 reached; size ? · 4.6 m² | ? · 4.6 m² | 5.2 · 5.9 m² | cc_accessStoreys, arch_sup_nbcUniversal |
| Programs mechanical room | pool air at −15 to −40 Pa (ASHRAE); size ? | ? | 22 m² | arch_up4_ashraeCh6Pools |

### Compliance

| Check | Clause | Plan figure | Result |
|---|---|---|---|
| Building classification | NBC 3.2.2 (our reading) | F-2 governs (data centre); A-3 pool, A-2 gym; sprinklered, noncombustible, 1 h floors (as the Emergency hub fit) | pass |
| Data centre at the tool low end | Ratios, plant included (tool run 5 Nov 2026, pool + gym picked); arch_dc_hall | 1.4 MW: hall 630 m²/MW × 1.4 = 882 m² needed, 891 m² drawn (our arithmetic) | pass |
| Sprinklers | 3.2.2.77; VBBL Div. A 1.3.3.6 | whole building sprinklered (NFPA 13) | pass |
| Pool (A-3) to data centre (F-2) | Table 3.1.3.1 (arch_nbc3131, typ_warm_bath_bcbc3131) | 2 h along the pool block, change rooms and staff rooms where they meet the data centre (drawn) | pass |
| Pool (A-3) to gym (A-2) | Table 3.1.3.1 | 1 h floor under the gym (drawing choice of 1 h) | pass |
| Connected | J.B. 4 Nov 2026; 3.3.1 | 48 rooms on 3 storeys: each reaches the lobby (storey 2: its landing) and an exit outside the secure line; data-centre rooms reach their own exits inside it (our arithmetic, doors as drawn) | pass |
| Travel distance along the path | 3.4.2.5.(1) | storey 1 34.4 m (Pool storage); storey 2 30.9 m (Battery room HVAC (separate)); storey 3 31.0 m (MV switchgear, main electrical) ≤ 45 m sprinklered; along corridors and through doors (our arithmetic) | pass |
| Two exits | 3.4.2.1.(1); 3.4.2.3.(1) | storey 1: data centre 4, 24.8 m apart ≥ 17.5 m; pool + gym facility 6, 37.1 m apart ≥ 23.4 m; lobby 2, 8.7 m apart ≥ 7.1 m · storey 2: gym 2, 20.8 m apart ≥ 15.7 m; data centre 2, 31.7 m apart ≥ 19.3 m; lobby 2, 20.8 m apart ≥ 10.6 m · storey 3: data centre 2, 31.7 m apart ≥ 19.3 m; none through the secure line (our reading: lobby shared; the rest of the programs side is one facility) | pass |
| Storey-2 stairs discharge outside | 3.4.4.2.(1), (2)(e) | S3 and S1 to the street: no exit through the lobby | pass |
| Public corridor width · dead ends | 3.3.1.9.(1), (5) | public corridors 2.0–2.6 m ≥ 1,100 mm; no public corridor dead end over 6 m | pass |
| DC staff entrance | GCPSG-015 5.3.2; GCPSG-014 6.7 (federal benchmarks) | own door on the north side yard (7.6 m; grade 4.8–5.2 m, City LiDAR, datum ?) → vestibule with a guard point → portal (1.8 m wheelchair model) → secure corridor; not through the shared lobby (drawing choice) | pass |
| Reception-zone rooms, one door | 3.3.1.5.(1)(d) | vestibule + guard point 13.7 m² ≤ 200 m²; 7.0 m to the exterior door ≤ 25 m (our arithmetic) | pass |
| Locked doors on exit paths | 3.4.6.16 | S2 and S4 discharge outside the secure line | pass |
| Secure line | notes 1 Nov 2026; J.B. 4 Nov 2026 | inside the building around the data centre and dock; plant in its own 1.9 m enclosures; pool, gym outside | pass |
| Change rooms beside the pool | BC 5.1 (typ_community_pool_bcPoolGuide51) | change rooms open onto the deck (≤ 60 m); route lobby → change (WC, showers) → deck | pass |
| Pool beside the hall, own plant | community_pool.md §2, §4; FM 5-32 2.2.1.6 | pool hall at grade beside the hall, no hall above it; its own pool plant (73 m² ≥ 71 m², ⅓–½ of the water, arch_edmEastglen2017) and chemical rooms | pass |
| Pool equipment room | BC 9.8 (arch_adj_bcPoolDesign); NBC(AE) 7.2.3.38 (arch_svc_nbcae72) | own door to the south side yard and one to the staff corridor; pool equipment only | pass |
| Chlorine and acid rooms | BC 9.9 (arch_up2_bcPoolGuide) | separate rooms at grade, each with an outside door only (south side yard); nearest generator 16 m (our arithmetic) | pass |
| Chemical system, exhaust, delivery | BC 9.9; arch_adj_abStandataCl | gas or liquid chlorine ?; 110 % spill containment not drawn; chlorine exhaust ≥ 3 m from air intakes: intakes not placed ?; forklift clearance on the delivery path ? | ? |
| Pool hall height | arch_sportEngPoolsDGN (UK benchmark) | 6.0 m storey ≥ 3.5 m clear (flat ceiling); structure depth ? (drawing choice) | pass |
| Pool air | ASHRAE ch. 6 (arch_up4_ashraeCh6Pools) | pool hall at −15 to −40 Pa, doors with closers; dehumidifier and ducts not drawn (size ?) | ? |
| Spectators | NBC(AE) 7.2.2.2 (arch_adj_nbcAE72) | no spectator seating drawn; viewing only through the lobby glazing (drawing choice) | pass |
| Water closets, pool | Table 3.7.2.2.-A | WCs inside the change rooms; pool occupant load ? → count ? | ? |
| Gym height | arch_sup_edmEastglenRooms | 6.0 m storey ≥ 3.3 m | pass |
| Storey 2 access | VBBL 3.8.2.3.(2)(g) | public lift E1 from the lobby side to the gym landing | pass |
| Nothing wet over the hall | FM 5-32 2.2.1.6 (insurer) | pool, change rooms, gym and chillers not above the hall; pool staff rooms and plant are below the hall (allowed by the rule; humidity below the hall floor ?) | pass |
| Wet rooms below the hall | FM 5-32 2.2.1.6 scope | pool plant and staff rooms at grade under the storey-2 hall: vapour and chemical fumes into the hall floor ? (no source) | ? |
| Zoning: pool use (I-3) | I-3 2.1; Section 2 (van3575s2, typ_community_pool_vanS2Uses) | Swimming Pool not listed in I-3: rezoning (flag, drawn "with rezoning"); Community Centre (C) route needs the Director of Planning ? | ? |
| Zoning: gym use | I-3 2.1 (van_zdb_i3) | Fitness Centre Class 2 (> 200 m²): conditional | ? |
| Zoning: DC use | I-3 2.1 | Bulk Data Storage (sub-area A ?), conditional | ? |
| No data storage at grade | I-3 2.2.11 | hall on storeys 2–3; at grade: pool, lobby, dock, SOC, ETS | pass |
| Main entrance from a street | Sec. 10.21.1 (arch_up_vanZDB10) | shared lobby on 1st Ave E | pass |
| FSR · non-industrial cap | I-3 3.1.1.1 | 3,023 m² ÷ 4,503 m² = 0.67 ≤ 3.00 · programs 1,177 m² ≤ 4,503 m² (1.00 FSR) (our arithmetic) | pass |
| Height | I-3 3.1.2.1 | hall roof 18.0 m over the 5.0 m slab: 17.97 m over the base surface ≤ 18.3 m (as the Emergency hub fit); storey-2 roof 12.0 m + plant room 3.9 m | pass |
| Yards · width · depth | I-3 3.1.2.2–8 | front 0.6, sides 7.6, rear 3.1 m (tool, per edge); 30.6 × 42.5 m ≤ 61.0 m; north wall at 15.15 m, inside the 7.6 m yard (check 2) | pass |
| Flood construction level | VBBL Div. A 1.4.1.2 (arch_hb_vbblFlood); CSA C282 6.2.1 | tool: lot grade 2.2–6.2 m, median 4.9 m (van_lidar2022_ground); 18 % of the lot below the 4.6 m FCL. Ground slab, generator and transformer pads 5.0 m ≥ 4.6 m (drawing choice). LiDAR datum ? vs the FCL in GVRD datum | ? |
| Exit discharge levels | 3.4.6; site grading | pool hall, staff corridor, plant and chemical doors open onto the low south side yard (grade 2.4–2.9 m vs the 5.0 m slab, City LiDAR): steps, ramp or regrading ? | ? |
| Fence height in required yards | Sec. 10.10.3 | plant enclosure fence 1.9 m ≤ 1.9 m; no lot-line fence | pass |
| Plant enclosures | J.B. design choice; Sec. 10.10.3 | generators and transformers in their own 1.9 m enclosures (unchanged yard) | pass |
| Chillers in an enclosed rooftop plant room | FM 5-32 2.2.1.6; NSW 2021 s. 4.3 (arch_nz_nswDcNoise) | 3 chillers on the storey-2 roof (12.0 m) over the gym, not the hall | pass |
| Noise at the lot lines | By-law 6555 ss. 2.1–2.3; tool noiseCheck | 3 chillers (Lw 107.6–110.9 dBA, tool method, our arithmetic). Without mitigation: 71.5 dBA at 336 1st Ave E (IC-3, activity zone), 25.4 m, limit 65. With the rooftop plant room (−25 dB): worst 46.5–49.8 dBA ≤ limits; nearest residential 455 Great Northern Way 30.8–34.1 ≤ 55 dBA | pass |
| Noise mitigation used | arch_nz_nswDcNoise s. 4.3, Table 4-5 | rooftop plant room: louvre airflow to the chillers ? (maker approval); height about 3.9 m (drawing choice) | ? |
| Generator, pool and programs plant noise | tool noiseCheck scope | generators (testing), pool plant and the programs mechanical room: no unit sound power on file ? | ? |
| Structural grid | — | column grid drawn as a drawing choice; pool hall clear span; no sourced data-hall span or bay ? | ? |
| Ducts across rated separations | 3.1.8.7.(1), (2); 3.1.9.1 | 2 crossings drawn (1 h): fire or smoke/fire dampers; none into the data centre (FM 5-32 2.6.6.2.2) | pass |
| Programs mechanical room | 3.6.2.1.(1), (6) | placed at grade; size ? (pool dehumidification and gym/spa HVAC not sized); 1 h drawn (drawing choice) | ? |
| Closures in 2 h walls | Table 3.1.8.4 | 1.5 h doors (not drawn) | ? |

## What fails, and flags

- **No hard fail** on either board. Every "to fix" item is a **?** (no source, or not designed yet).
- **Approval flags (not blocks):**
  - E06B: the pool use is over the BE 500 m² Community Service cap, so it needs a **s. 3.18 variance** (BE 3.12.1, 3.18; decision Q4).
  - V339: Swimming Pool is not listed in I-3, so it needs **rezoning**. The Community Centre (C) route needs the Director of Planning's reading (?).
- **V339:**
  - The pool plant and staff rooms sit under the storey-2 hall. FM 5-32 covers only water above the hall; vapour and fumes below the hall floor: ?.
  - The south doors open onto the low side yard (2.4–2.9 m against the 5.0 m slab).
  - The LiDAR datum against the GVRD datum of the FCL: ?.
- **Both sites:**
  - The chemical system (gas or liquid chlorine) is ?. So are spill containment, the forklift path, and the chlorine exhaust distance to intakes (no intakes placed).
  - Not designed: pool air (dehumidifier, −15 to −40 Pa). The pool WC count is ? (no occupant load).
  - Noise from the generators, the pool plant and the programs plant is ? (no sound power on file).

## Open questions for J.B.

- Chemical system: gas chlorine (the Alberta room rule applies) or liquid?
- V339: are pool plant and staff rooms under the hall acceptable?
- V339: accept the under-sized pool storage (24 m²), or take space from the gym landing?
- Tool: should the pool keep ground in the BE ground cap now that it is a 3.18 flag (Q4)? The tool still treats it as blocked, so it holds back no ground for it.

## Tool notes (no code changed)

- E06B Ratios: the ground left (2,136 m² a storey) counts only the gym (445 m²). The pool is skipped because the tool still blocks it in BE (rule text against Q4). The test fit still fits at 3.7 MW, so the noise and plant cap governs.
- V339: with programs picked, the ground cap lowers the tool's low end from 1.5 to 1.4 MW. The Emergency hub boards were drawn at 1.5.
- Canvas: the CP boards at x 0, y 14400 overlap `TestFit_EH_V1330` (y 11400, h 3506). The y was set by the brief.

## Licensing

- The E06B lot outline is Altalis (EPSB GIS, academic use only). The E06B board must not be published or shared outside the course.

Check 1 only. Not yet checked by a second agent.
