# Test fit: Heat cascade, both sites (5 Nov 2026)

Spa → pool or greenhouse → heated public edge, from one heat hub, with a data centre. Spa and pool share the desk and change rooms. One building per site, schematic.

- Research: `heat_cascade.md`, `warm_bath.md`, `community_pool.md`, `aquaponics.md`, `public_edge.md`, `heat_hub.md` (+ `_sources.json`).
- Method, checks and drawing style: as the Community pool and Emergency hub test fits (`testfit_community_pool.md`, `testfit_emergency_hub.md`, `code_checklist.md`). Pool part reused from the Community pool pass (5 Nov), where it holds.
- Boards (scratchpad, not published): `whitemock/project/TestFit_HC_E06B.dc.html` and `TestFit_HC_V339.dc.html`. Canvas: y 18400, x 0 and 1540.
- Scripts (scratchpad `tfhc/`): `run.js` (tool run, `PROGS=spa,pool,greenhouse`), `geom5.py` (`fix_cp('HC')` + `fix_hc()`), `board5.py` (boards, checks, heat diagram), `go.sh`.

Labels: "our arithmetic", "our reading", "drawing choice". **?** = no source. Every room position, corridor width and door position is a drawing choice.

**Replaces** the unreported 4 Nov draft of these two boards (scratchpad `tfpc/`). That draft is out of date: V339 at 1.5 MW, rooms 0.25 m into the north side yard, E06B pool plant with no outside door, no heat diagram, and greenhouse before pool as a fixed order.

## Inputs (tool run 5 Nov 2026, Architecture mode)

Spa, pool and greenhouse picked first, then Ratios opened (plant-included low end). The edge is outdoor ground, not a tool program.

| | E06B, 64 Airport Rd NW (BE) | V339, 339 1st Ave E (I-3) |
|---|---|---|
| MW tested (Ratios low end) | **3.7 MW** (range 3.78–8.18); 35 % · 2,399 m² | **1.4 MW** (range 1.41–3.05); 17 % · 894 m² |
| Why it stops there (tool) | hard rules stop it at 3.8 MW (enclosed plant room) | ground: hall needs 447 m² a storey; 686 m² left |
| Same as the Community pool run? | yes (3.7 MW): data-centre side unchanged | yes (1.4 MW): data-centre side unchanged |
| Tool rules | pool "cannot go on a BE lot" (Q4: 3.18 flag); spa zoning ?; greenhouse separation ? | pool not drawn (no 11 × 27 m area); spa and greenhouse "do not fit on one floor" |
| Hall heat out (tool) | 14,252–21,878 MWh/yr | 5,393–8,278 MWh/yr |
| Grade (tool) | no HRDEM tile: **?** | 2.2–6.2 m, median 4.9 m (LiDAR datum ?); 18 % of the lot below the 4.6 m FCL |

## Short answer

- **Both sites fit as one building**: every room a block, connected, travel ≤ 45 m along the path, two exits per zone, **no hard fail**.
- **E06B: 36 pass, 18 to fix (all ?).** Pool block on the street, hall behind. Spa over the change rooms; greenhouse on the pool-hall roof. Pool 995 m² at grade > 500 m² cap: **s. 3.18 variance (flag)**.
- **V339, "with rezoning": 33 pass, 20 to fix (all ?).** Pool at grade beside the hall; spa and greenhouse on storey 2. **Swimming Pool not listed in I-3: rezoning (flag).**
- **Noise (re-run):** rooftop plant room (−25 dB), all receivers pass. E06B worst 38.0–48.6 dBA; V339 46.5–49.8 dBA. Same as the Community pool fit (same chillers, same positions).
- **Heat (our arithmetic):** known load E06B **563–635 MWh/yr** (2.6–4.5 % of hall heat); V339 **381–407 MWh/yr** (4.6–7.6 %). Spa ?. Pool is ≈60–85 % of the known load.
- **Order:** spa first (hottest water); pool vs greenhouse **?** (pool supply not sourced); edge last (coolest fluid).

## Heat diagram (both boards)

Drawn: data hall → heat hub → spa → [greenhouse / pool, order ?] → public edge → return to the hall loop.

- Colour: temperature on the warm-to-cool scale (93,127,153 at 17 °C → 209,163,94 at 40 °C). Pool coloured by its water (24–29 °C), not its supply (?). Scale ends: drawing choice.
- Width: 0.03 px per MWh/yr on both boards (drawing choice). Main line carries the known heat still to deliver. Hall line not to scale (break mark).

| Stage | Temperature (source) | E06B MWh/yr | V339 MWh/yr | Basis (our arithmetic) |
|---|---|---|---|---|
| Data hall (source) | air-cooled 25–35 °C (heat_temp) | 14,252–21,878 | 5,393–8,278 | tool run |
| Heat hub | heat pump at the top for an air-cooled hall (heat_cascade.md §3, our reading); supply ? | — | — | — |
| Spa | water 36–40 °C (arch_up4_ashraeCh6Pools); supply > 40 °C (our reading) | ? | ? | no annual load sourced |
| Greenhouse | bench 35–40 °C (arch_asabeEp406) | 63–89 | 63–89 | 413–583 kWh/m²·yr (arch_mbGhEnergy) × 153 m² drawn |
| Pool | water 24–29 °C (ASHRAE ch. 6); supply ? | 391 | 317 | 416 kWh/m²·yr (arch_benakcha2025; low confidence, outside Canada) × pool part at grade (941 · 761 m²) |
| Public edge | mean fluid 17–19 °C, light snow (typ_heat_cascade_ashraeCh52T6) | 108–154 | 1.3 | ASHRAE ch. 52 Table 3, Ar 0.5, melting + idling, losses excluded: Great Falls 417.4 – Minneapolis 595.6 kWh/m² (E06B, our picks) · Seattle 36.0 (V339, our pick) × front yard (259 · 36 m²) |
| **Known total** | | **563–635** | **381–407** | spa excluded |

The research example (100 m² edge) gave 510–592; this fit uses the drawn front yards, so E06B is higher.

## Placement rules: held or broke

| Rule | Source | E06B | V339 |
|---|---|---|---|
| Nothing wet over the hall | FM 5-32 2.2.1.6 | held | held; pool staff rooms and plant sit *under* the hall (?) |
| Pool at grade beside the hall, own plant | community_pool.md §2, §4 | held | held |
| Pool + spa plant ≥ 84 m² (pool 71 + spa 13) | catalogue; arch_edmEastglen2017 | held: 86 m², one room, alley door | held: 73 m² at grade + **16 m² spa plant on storey 2** beside the hot pool (new); its outside access ? |
| Spa and pool share desk and change | heat_cascade.md §1 (Eastglen) | held | held |
| Spa and pool one wet block **at grade** | heat_cascade.md §2 (our reading) | **broke**: spa on storey 2 (ground is full) | **broke**, same |
| Greenhouse at grade, sunny side | heat_cascade.md §2; arch_marcelis2006 | **broke**: on the pool-hall roof (not the hall roof); shading ? | **broke**, same |
| Edge on the street, outside the secure line, generators away from it | public_edge.md §2; arch_nbc63215 | held (front yard; generators in the rear yard) | held; front yard only 0.6 m |
| Pipe run follows the cascade | heat_cascade.md §2 | hub (heat-recovery room) → pool + spa plant → edge manifold at the street | hub → pool plant (manifold inside it) |
| DC staff entrance separate; secure line inside | J.B. 4 Nov | held (street door, south corner) | held (north side yard) |
| Chillers in an enclosed rooftop plant room | FM 5-32; NSW 2021 | held (over the spa) | held (over the spa) |
| Plant enclosures 1.9 m | J.B. | held | held |

## What changed against the Community pool fit

- Gym → spa (storey 2 over the change rooms) + greenhouse (pool-hall roof). Pool part, chlorine room, plant doors and the data-centre side are the CP pass, unchanged.
- E06B: women's change gives 2.0 × 2.6 m at the street corner to the **edge manifold** (outside door): 57 → 52 m² (≥ 50.5). Pool plant renamed pool + spa plant (86 m²).
- V339: **spa plant 16 m²** added on storey 2 (pool-hall roof, not over the hall); the pool-hall roof shrinks. Admin + gym storage (CP) not drawn: admin storage 0 m².
- Heat diagram added on both boards. Old aside "Cascade order" panel dropped.

## E06B: 64 Airport Road NW, Edmonton (BE)

Board `TestFit_HC_E06B.dc.html`: **36 pass, 18 to fix (?), 0 fail.**

Drawn (our arithmetic):

- GFA 5,009 m², all storeys.
- Programs side 1,658 m², with the lobby, stairs and lift.
- Hall 2,335 m²; DC support 553 m².

### Room schedule

| Room | Rule or basis | Sourced | Drawn | Source ids |
|---|---|---|---|---|
| **DATA CENTRE (3.7 MW IT, tool Ratios low end with spa + pool + greenhouse, 5 Nov 2026; PUE 1.4–1.55)** | | | | |
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
| Heat-recovery room, hand-over (add-on) | 5.6–15.1 m² per MW of heat × 3.7 MW (heat ≈ IT load, our reading) | 20.7–55.9 m² (our arithmetic) | 28.1 m² | component_space, hr_plant_room |
| DC staff entrance: vestibule · guard point | reception zone at the entry; sizes ? | ? | 7.5 · 6.0 m² | arch_acc_gcpsg015RZ, arch_sec_gcpsg014 |
| **PROGRAMS (community_pool.md, heat_cascade.md)** | | | | |
| Pool hall, 25 m × 4 lanes | tank 25 × 8.5 = 212.5 m²; deck 1.8 m all round (AB) to the Eastglen ratio | 346–452 m² | 379 m² | arch_sportEngPoolsDGN, arch_sup_nbcAE7Pools, arch_edmEastglen2017 |
| Change rooms, women · men | dressing 0.32–0.5 m²/bather × 142 + showers and WCs 28 m² a sex (Eastglen) | 50.5–63.5 m² each | 52 · 57 m² | arch_sup_bcPoolDesign5, arch_sup_nbcAE7Pools, arch_sup_eastglenRooms |
| Universal change (shared) | one per facility (our reading of 3.8.2.8.(13)) | 6 m² | 16 m² | arch_sup_nbcUniversal, arch_sup_eastglenRooms |
| Desk + cash · first aid | one control desk and first aid for the whole facility (Eastglen) | 19 · 6 m² | 21 · 21 m² | arch_sup_eastglenRooms |
| Lifeguard + foreman office · staff break + change | Eastglen | 28 · 39 m² | 28 · 39 m² | arch_sup_eastglenRooms |
| Storage: pool · admin | Eastglen 44 · 20 (chemical 3 in the chemical rooms) | 44 · 20 m² | 44 · 18 m² | arch_sup_eastglenRooms |
| Laundry · custodial | Eastglen 6 · 10 | 16 m² | 24 m² | arch_sup_eastglenRooms |
| Pool plant + spa plant | ⅓–½ of the water area + spa plant 13–20 m²; outside access (AB 7.2.3.38); pool equipment only (BC 9.8) | 84–126 m² | 86 m² | arch_edmEastglen2017, arch_svc_nbcae72, arch_adj_bcPoolDesign |
| Chlorine room · acid store | separate rooms, 110 % spill containment (BC 9.9); gas chlorine: at grade, outward door to outside only, 1 h (AB) | ? (Eastglen chemical 3 m²) | 9.0 · 7.8 m² | arch_up2_bcPoolGuide, arch_adj_abStandataCl |
| Hot pool (spa, stage 1) | 40 m² water, 36–40 °C (BC/AB cap 40); deck ≥ 1.8 m (drawing choice) | 40 m² water | 115 m² hall | arch_sup_eastglenRooms, arch_bcPoolReg296, arch_up4_ashraeCh6Pools |
| Steam room · plunge · sauna, rest | Eastglen steam 18; plunge, sauna and rest ? | 18 m² · ? · ? | 18 m² | arch_sup_eastglenRooms, arch_wet_nbcAE726 |
| Spa showers, universal change | shared change at grade; pre-swim showers at the spa (drawing choice) | 6 m² (universal) | 18 m² | arch_sup_nbcUniversal |
| Spa store, staff office | size ? | ? | 79 m² | drawing choice |
| Greenhouse growing house (stage 3) | Baie-Comeau 153 m²; single span (US guidance) | 153 m² | 153 m² | arch_etsBaieComeau, arch_uwexGhEnergy |
| Headhouse · greenhouse WC | 10 % of the growing house · universal WC | 15.3 · 4.6 m² | 15 · 6 m² | arch_sup_purdueHO346, arch_sup_nbcUniversal |
| Heated public edge (stage 4) | snow-melt slab; mean fluid 17–19 °C in light snow (ASHRAE Table 6); no minimum plaza size | ? | front yard 259 m² | typ_heat_cascade_ashraeCh52T6, arch_pub_vanPlazaDG, arch_up3_edmWinterDG |
| Edge manifold, glycol HX | near the street, fed from the coldest return; size ? | ? | 5 m² | arch_up4_ashraeCh52 |
| **SHARED** | | | | |
| Shared lobby | size ?; main entrance from the street | ? | 54 m² | drawing choice |
| Public and staff corridors | public ≥ 1,100 mm (2.0 m drawn); staff 2.0 m | ? | 248 m² | cc_nbcAccessToExit |
| Stairs S5, S6 (programs) | 6.0 m storey: 7.0 × 2.6 m (our arithmetic, as the Emergency hub fit) | 18.2 m² each | 2 stairs | cc_nbcExits |
| Lift E1 (public) · universal WC | storey 2 reached; size ? · 4.6 m² | ? · 4.6 m² | 5.2 · 5.2 m² | cc_accessStoreys, arch_sup_nbcUniversal |
| Programs mechanical room | pool air at −15 to −40 Pa (ASHRAE); size ? | ? | 32 m² | arch_up4_ashraeCh6Pools |

### Compliance

| Check | Clause | Plan figure | Result |
|---|---|---|---|
| Building classification | NBC 3.2.2 (our reading) | F-2 governs (data centre); A-3 pool and spa, A-2 lobby; sprinklered, noncombustible, 1 h floors (as the Emergency hub fit) | pass |
| Data centre at the tool low end | Ratios, plant included (tool run 5 Nov 2026, spa + pool + greenhouse picked); arch_dc_hall | 3.7 MW: hall 630 m²/MW × 3.7 = 2,331 m² needed, 2,335 m² drawn (our arithmetic) | pass |
| Sprinklers | 3.2.2.77 | whole building sprinklered (NFPA 13) | pass |
| Pool (A-3) to data centre (F-2) | Table 3.1.3.1 (arch_nbc3131, typ_warm_bath_bcbc3131) | 2 h along the pool block, change rooms and staff rooms where they meet the data centre (drawn) | pass |
| Spa (A-3) over the change rooms | Table 3.1.3.1 | A-3 over A-3: no separation; 1 h floor drawn (drawing choice) | pass |
| Greenhouse separations | Table 3.1.3.1; arch_adj_bcbcFarm | greenhouse occupancy ? (F-2, F-3 or A-2): rating to the spa, the pool roof below and the data centre ? | ? |
| Connected | J.B. 4 Nov 2026; 3.3.1 | 60 rooms on 2 storeys: each reaches the lobby (storey 2: its landing) and an exit outside the secure line; data-centre rooms reach their own exits inside it (our arithmetic, doors as drawn) | pass |
| Travel distance along the path | 3.4.2.5.(1) | storey 1 35.9 m (Laundry); storey 2 39.0 m (Data hall, storey 2) ≤ 45 m sprinklered; along corridors and through doors (our arithmetic) | pass |
| Two exits | 3.4.2.1.(1); 3.4.2.3.(1) | storey 1: data centre 9, 69.2 m apart ≥ 37.5 m; pool + spa 6, 49.6 m apart ≥ 26.4 m; lobby 2, 5.8 m apart ≥ 5.2 m · storey 2: greenhouse 2, 40.9 m apart ≥ 14.2 m; data centre 2, 55.6 m apart ≥ 31.1 m; pool + spa 2, 40.9 m apart ≥ 13.9 m; lobby 2, 40.9 m apart ≥ 22.8 m; none through the secure line (our reading: lobby shared; the rest of the programs side is one facility) | pass |
| Storey-2 stairs discharge outside | 3.4.4.2.(1), (2)(e) | S6 to the street, S5 to the alley: no exit through the lobby | pass |
| Public corridor width · dead ends | 3.3.1.9.(1), (5) | public corridors 2.0 m ≥ 1,100 mm; the public corridor runs from the lobby to the staff corridor and its alley door (no dead end over 6 m) | pass |
| Dead ends, corridors in the secure line | 3.3.1.9.(5) scope ? | secure passage 22 m with an egress-only street door at its west end and the hall at its east end: no dead end | pass |
| DC staff entrance | GCPSG-015 5.3.2; GCPSG-014 6.7 (federal benchmarks) | own street door at the south corner → vestibule with a guard point → portal (1.8 m wheelchair model) → secure passage; not through the shared lobby (drawing choice) | pass |
| Reception-zone rooms, one door | 3.3.1.5.(1)(d) | vestibule + guard point 13.5 m² ≤ 200 m²; 5.9 m to the exterior door ≤ 25 m (our arithmetic) | pass |
| Locked doors on exit paths | 3.4.6.16 | secure passage street door and portal side door release on alarm and power loss | pass |
| Secure line | notes 1 Nov 2026; J.B. 4 Nov 2026 | inside the building around the data centre and dock; plant in its own 1.9 m enclosures; pool, spa, greenhouse outside | pass |
| Change rooms beside the pool | BC 5.1 (typ_community_pool_bcPoolGuide51) | change rooms open onto the deck (≤ 60 m); route lobby → change (WC, showers) → deck | pass |
| Spa bather route | BC 5.1; BC 7.2 (typ_warm_bath_bcPoolGuide) | spa on storey 2: dressing in the shared change rooms at grade, pre-swim showers at the spa; bathers cross the public landing ? Separate spa circulation (BC 7.2) in the plant | ? |
| Pool beside the hall, own plant | community_pool.md §2, §4; heat_cascade.md §4; FM 5-32 2.2.1.6 | pool hall at grade beside the hall, no hall above it; pool + spa plant 86 m² ≥ 84 m² (pool 71–106 + spa 13–20, arch_edmEastglen2017, catalogue), one room; separate circulation per pool (BC 7.2) | pass |
| Pool equipment room | BC 9.8 (arch_adj_bcPoolDesign); NBC(AE) 7.2.3.38 (arch_svc_nbcae72) | own door to the alley, a door to the deck and one to the staff corridor; pool equipment only | pass |
| Chlorine room (Alberta) | Standata (arch_adj_abStandataCl); NBC(AE) 7.2 (arch_adj_nbcAE72) | at grade on the alley wall, outward door to the outside only, no door into the building; 1 h required, drawn as a rated service room; acid in its own room off the pool plant (separate from chlorine); nearest generator 43 m (our arithmetic) | pass |
| Chemical system, exhaust, delivery | BC 9.9; arch_adj_abStandataCl | gas or liquid chlorine ?; 110 % spill containment not drawn; chlorine exhaust ≥ 3 m from air intakes: intakes not placed ?; forklift clearance on the delivery path ? | ? |
| Pool hall height | arch_sportEngPoolsDGN (UK benchmark) | 6.0 m storey ≥ 3.5 m clear (flat ceiling); structure depth ? (drawing choice) | pass |
| Pool air | ASHRAE ch. 6 (arch_up4_ashraeCh6Pools) | pool hall at −15 to −40 Pa, doors with closers; dehumidifier and ducts not drawn (size ?) | ? |
| Spectators | NBC(AE) 7.2.2.2 (arch_adj_nbcAE72) | no spectator seating drawn; viewing only through the lobby glazing (drawing choice) | pass |
| Water closets, pool | Table 3.7.2.2.-A | WCs inside the change rooms; pool occupant load ? → count ? | ? |
| Storey 2 access | NBC(AE) 3.8.2.3 | public lift E1 to the spa and greenhouse landing | pass |
| Greenhouse egress | 3.3.1.5.(1) | growing house one door: ≤ 200 m², ≤ 25 m to the door (drawing; our arithmetic) | pass |
| Greenhouse light | arch_marcelis2006; arch_uwexGhEnergy | on the pool-hall roof, beside the 12 m storey-2 block and the plant room: shading ? (orientation not checked) | ? |
| Heat cascade order | heat_cascade.md §3 (arch_asabeEp406, typ_heat_cascade_ashraeCh52T6) | heat hub → spa (water 36–40 °C; supply > 40 °C, our reading ?) → pool or greenhouse (greenhouse bench 35–40 °C; pool supply ?) → edge (mean fluid 17–19 °C, light snow); pool vs greenhouse order ? (diagram) | ? |
| Spa plant, outside access | NBC(AE) 7.2.3.38 (arch_svc_nbcae72); BC 9.8 | spa plant inside the pool + spa plant room at grade (alley door) | pass |
| Heated public edge | arch_pub_vanPlazaDG; arch_up3_edmWinterDG; arch_up4_ashraeCh52 | front yard 4.5 m along the street (259 m², our arithmetic), snow melt over all of it, manifold room at the street (drawing choice); plaza use in BE ? | ? |
| Nothing wet over the hall | FM 5-32 2.2.1.6 (insurer) | pool, change rooms, spa, greenhouse and chillers not above the hall | pass |
| Zoning: pool use | BE 3.12.1, 3.18 (arch_zon_EdmZones); decision Q4 | Community Service (pool) 995 m² at grade > 500 m² cap: s. 3.18 variance (flag, not block) | ? |
| Zoning: spa use | BE (arch_zon_EdmZones) | no defined use (Indoor Sales and Service or Minor Indoor Entertainment ?) | ? |
| Zoning: greenhouse | BE 3.16.1 (arch_zon_EdmZones) | Urban Agriculture, permitted, "within or on a building" | pass |
| Zoning: FAR | BE 4.1.2 | 5,009 m² ÷ 4,284 m² = 1.17 ≤ 1.6 (our arithmetic) | pass |
| Zoning: height | BE 4.1.1 | hall 12.0 m; storey-2 roof 12.0 m + plant room about 3.9 m = 15.9 m ≤ 16.0 m (plant-room height drawing choice); grade ? | pass |
| Zoning: setbacks | BE Table 4.1 (tool, per line) | street 4.5 m (Collector); alley, sides, rear 0 m | pass |
| Loading not between building and street | BE 5.8 | dock on the alley side (unchanged) | pass |
| Plant screened from the street | BE 5.2 | chillers in a rooftop plant room; generators in the rear yard | pass |
| Transparent street front | BE 5.3.1–5.3.2 | lobby and pool hall glazed to the street (drawing choice); DC door and S6 on the same front | pass |
| Façade articulation | BE 5.1 | two techniques: not designed yet | ? |
| Fire department access | 3.2.5.5.(1) | principal entrance 4.5 m behind the street lot line; kerb distance ? | ? |
| Site grade | Bylaw 20001 s. 5.70 | tool: no HRDEM tile for this lot (grade ?); height base (Grade) not set ? | ? |
| Plant enclosures | J.B. design choice; CSA B139 Table 2 | generators and transformers in their own 1.9 m enclosures (unchanged yard) | pass |
| Chillers in an enclosed rooftop plant room | FM 5-32 2.2.1.6; NSW 2021 s. 4.3 (arch_nz_nswDcNoise) | 5 chillers on the storey-2 roof (12.0 m) over the spa, not the hall | pass |
| Noise at the lot lines | Bylaw 14600 ss. 20, 22; tool noiseCheck | 5 chillers (Lw 109.8–113.1 dBA, tool method, our arithmetic). Without mitigation: 63.0 dBA at 8065 Cedric Mah Road NW (BRH), 86.8 m, limit 50. With the rooftop plant room (−25 dB): worst 38.0–48.6 dBA ≤ limits; nearest residential 8065 Cedric Mah Road NW 38.0–41.3 ≤ 50 dBA. Flag: a building across the street with no parcel record reads 48.6 dBA (standard units) at 37.3 m vs 50 if residential (its use and property line ?); the street lot line itself reads 55.2–58.5 dBA | pass |
| Noise mitigation used | arch_nz_nswDcNoise s. 4.3, Table 4-5 | rooftop plant room: louvre airflow to the chillers ? (maker approval); height about 3.9 m (drawing choice) | ? |
| Generator, pool and programs plant noise | tool noiseCheck scope | generators (testing), pool plant and the programs mechanical room: no unit sound power on file ? | ? |
| Structural grid | — | column grid drawn as a drawing choice; pool hall clear span; no sourced data-hall span or bay ? | ? |
| Ducts across rated separations | 3.1.8.7.(1), (2); 3.1.9.1 | 1 crossings drawn (1 h): fire or smoke/fire dampers; none into the data centre (FM 5-32 2.6.6.2.2) | pass |
| Programs mechanical room | 3.6.2.1.(1), (6) | placed at grade; size ? (pool dehumidification and gym/spa HVAC not sized); 1 h drawn (drawing choice) | ? |
| Closures in 2 h walls | Table 3.1.8.4 | 1.5 h doors (not drawn) | ? |

## V339: 339 1st Avenue East, Vancouver (I-3), with rezoning

Board `TestFit_HC_V339.dc.html`: **33 pass, 20 to fix (?), 0 fail.**

Drawn (our arithmetic):

- GFA 3,219 m², all storeys.
- Programs side 1,373 m², with the lobby, stairs and lift.
- Hall 891 m²; DC support 493 m².

### Room schedule

| Room | Rule or basis | Sourced | Drawn | Source ids |
|---|---|---|---|---|
| **DATA CENTRE (1.4 MW IT, tool Ratios low end with spa + pool + greenhouse, 5 Nov 2026; PUE 1.4–1.55)** | | | | |
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
| Heat-recovery room, hand-over (add-on) | 5.6–15.1 m² per MW of heat × 1.4 MW (heat ≈ IT load, our reading) | 7.8–21.1 m² (our arithmetic) | 26.5 m² | component_space, hr_plant_room |
| Spare (DC, storeys 2–3) | hall strip not needed at 1.4 MW | — | 2 × 28.3 m² | drawing choice |
| DC staff entrance: vestibule · guard point | reception zone at the entry; sizes ? | ? | 6.6 · 7.1 m² | arch_acc_gcpsg015RZ, arch_sec_gcpsg014 |
| **PROGRAMS (community_pool.md, heat_cascade.md)** | | | | |
| Pool hall, 25 m × 4 lanes | tank 25 × 8.5 = 212.5 m²; deck 1.8 m all round (AB) to the Eastglen ratio | 346–452 m² | 346 m² | arch_sportEngPoolsDGN, arch_sup_nbcAE7Pools, arch_edmEastglen2017 |
| Change rooms, women · men | dressing 0.32–0.5 m²/bather × 142 + showers and WCs 28 m² a sex (Eastglen) | 50.5–63.5 m² each | 57 · 63 m² | arch_sup_bcPoolDesign5, arch_sup_nbcAE7Pools, arch_sup_eastglenRooms |
| Universal change (shared) | one per facility (our reading of 3.8.2.8.(13)) | 6 m² | 6 m² | arch_sup_nbcUniversal, arch_sup_eastglenRooms |
| Desk + cash · first aid | one control desk and first aid for the whole facility (Eastglen) | 19 · 6 m² | 20 · 9 m² | arch_sup_eastglenRooms |
| Lifeguard + foreman office · staff break + change | Eastglen | 28 · 39 m² | 28 · 38 m² | arch_sup_eastglenRooms |
| Storage: pool · admin | Eastglen 44 · 20 (chemical 3 in the chemical rooms) | 44 · 20 m² | 24 · 0 m² | arch_sup_eastglenRooms |
| Laundry · custodial | Eastglen 6 · 10 | 16 m² | 16 m² | arch_sup_eastglenRooms |
| Pool plant + spa plant | ⅓–½ of the water area + spa plant 13–20 m²; outside access (AB 7.2.3.38); pool equipment only (BC 9.8) | 84–126 m² | 73 + 16 m² | arch_edmEastglen2017, arch_svc_nbcae72, arch_adj_bcPoolDesign |
| Chlorine room · acid store | separate rooms, 110 % spill containment (BC 9.9); gas chlorine: at grade, outward door to outside only, 1 h (AB) | ? (Eastglen chemical 3 m²) | 7.8 · 7.5 m² | arch_up2_bcPoolGuide, arch_adj_abStandataCl |
| Hot pool (spa, stage 1) | 40 m² water, 36–40 °C (BC/AB cap 40); deck ≥ 1.8 m (drawing choice) | 40 m² water | 114 m² hall | arch_sup_eastglenRooms, arch_bcPoolReg296, arch_up4_ashraeCh6Pools |
| Steam room · plunge · sauna, rest | Eastglen steam 18; plunge, sauna and rest ? | 18 m² · ? · ? | 20 m² | arch_sup_eastglenRooms, arch_wet_nbcAE726 |
| Spa showers, universal change | shared change at grade; pre-swim showers at the spa (drawing choice) | 6 m² (universal) | 39 m² | arch_sup_nbcUniversal |
| Spa store, staff office | size ? | ? | 6 m² | drawing choice |
| Greenhouse growing house (stage 3) | Baie-Comeau 153 m²; single span (US guidance) | 153 m² | 153 m² | arch_etsBaieComeau, arch_uwexGhEnergy |
| Headhouse · greenhouse WC | 10 % of the growing house · universal WC | 15.3 · 4.6 m² | 15 · 11 m² | arch_sup_purdueHO346, arch_sup_nbcUniversal |
| Heated public edge (stage 4) | snow-melt slab; mean fluid 17–19 °C in light snow (ASHRAE Table 6); no minimum plaza size | ? | front yard 36 m² | typ_heat_cascade_ashraeCh52T6, arch_pub_vanPlazaDG, arch_up3_edmWinterDG |
| Edge manifold, glycol HX | near the street, fed from the coldest return; size ? | ? | in the pool plant | arch_up4_ashraeCh52 |
| **SHARED** | | | | |
| Shared lobby | size ?; main entrance from the street | ? | 68 m² | arch_up_vanZDB10 |
| Public and staff corridors | public ≥ 1,100 mm (2.0 m drawn); staff 2.0 m | ? | 122 m² | cc_nbcAccessToExit |
| Stairs S1, S3 (programs) | 6.0 m storey: 7.0 × 2.6 m (our arithmetic, as the Emergency hub fit) | 18.2 m² each | 2 stairs | cc_nbcExits |
| Lift E1 (public) · universal WC | storey 2 reached; size ? · 4.6 m² | ? · 4.6 m² | 5.2 · 5.9 m² | cc_accessStoreys, arch_sup_nbcUniversal |
| Programs mechanical room | pool air at −15 to −40 Pa (ASHRAE); size ? | ? | 22 m² | arch_up4_ashraeCh6Pools |

### Compliance

| Check | Clause | Plan figure | Result |
|---|---|---|---|
| Building classification | NBC 3.2.2 (our reading) | F-2 governs (data centre); A-3 pool and spa, A-2 lobby; sprinklered, noncombustible, 1 h floors (as the Emergency hub fit) | pass |
| Data centre at the tool low end | Ratios, plant included (tool run 5 Nov 2026, spa + pool + greenhouse picked); arch_dc_hall | 1.4 MW: hall 630 m²/MW × 1.4 = 882 m² needed, 891 m² drawn (our arithmetic) | pass |
| Sprinklers | 3.2.2.77; VBBL Div. A 1.3.3.6 | whole building sprinklered (NFPA 13) | pass |
| Pool (A-3) to data centre (F-2) | Table 3.1.3.1 (arch_nbc3131, typ_warm_bath_bcbc3131) | 2 h along the pool block, change rooms and staff rooms where they meet the data centre (drawn) | pass |
| Spa (A-3) over the change rooms | Table 3.1.3.1 | A-3 over A-3: no separation; 1 h floor drawn (drawing choice) | pass |
| Greenhouse separations | Table 3.1.3.1; arch_adj_bcbcFarm | greenhouse occupancy ? (F-2, F-3 or A-2): rating to the spa, the pool roof below and the data centre ? | ? |
| Connected | J.B. 4 Nov 2026; 3.3.1 | 55 rooms on 3 storeys: each reaches the lobby (storey 2: its landing) and an exit outside the secure line; data-centre rooms reach their own exits inside it (our arithmetic, doors as drawn) | pass |
| Travel distance along the path | 3.4.2.5.(1) | storey 1 34.4 m (Pool storage); storey 2 35.1 m (Growing house (single span)); storey 3 31.0 m (MV switchgear, main electrical) ≤ 45 m sprinklered; along corridors and through doors (our arithmetic) | pass |
| Two exits | 3.4.2.1.(1); 3.4.2.3.(1) | storey 1: data centre 4, 24.8 m apart ≥ 17.5 m; pool + spa 6, 37.1 m apart ≥ 23.4 m; lobby 2, 8.7 m apart ≥ 7.1 m · storey 2: greenhouse 2, 20.8 m apart ≥ 10.9 m; data centre 2, 31.7 m apart ≥ 19.3 m; pool + spa 2, 20.8 m apart ≥ 16.2 m; lobby 2, 20.8 m apart ≥ 11.5 m · storey 3: data centre 2, 31.7 m apart ≥ 19.3 m; none through the secure line (our reading: lobby shared; the rest of the programs side is one facility) | pass |
| Storey-2 stairs discharge outside | 3.4.4.2.(1), (2)(e) | S3 and S1 to the street: no exit through the lobby | pass |
| Public corridor width · dead ends | 3.3.1.9.(1), (5) | public corridors 2.0–2.6 m ≥ 1,100 mm; no public corridor dead end over 6 m | pass |
| DC staff entrance | GCPSG-015 5.3.2; GCPSG-014 6.7 (federal benchmarks) | own door on the north side yard (7.6 m; grade 4.8–5.2 m, City LiDAR, datum ?) → vestibule with a guard point → portal (1.8 m wheelchair model) → secure corridor; not through the shared lobby (drawing choice) | pass |
| Reception-zone rooms, one door | 3.3.1.5.(1)(d) | vestibule + guard point 13.7 m² ≤ 200 m²; 7.0 m to the exterior door ≤ 25 m (our arithmetic) | pass |
| Locked doors on exit paths | 3.4.6.16 | S2 and S4 discharge outside the secure line | pass |
| Secure line | notes 1 Nov 2026; J.B. 4 Nov 2026 | inside the building around the data centre and dock; plant in its own 1.9 m enclosures; pool, spa, greenhouse outside | pass |
| Change rooms beside the pool | BC 5.1 (typ_community_pool_bcPoolGuide51) | change rooms open onto the deck (≤ 60 m); route lobby → change (WC, showers) → deck | pass |
| Spa bather route | BC 5.1; BC 7.2 (typ_warm_bath_bcPoolGuide) | spa on storey 2: dressing in the shared change rooms at grade, pre-swim showers at the spa; bathers cross the public landing ? Separate spa circulation (BC 7.2) in the plant | ? |
| Pool beside the hall, own plant | community_pool.md §2, §4; heat_cascade.md §4; FM 5-32 2.2.1.6 | pool hall at grade beside the hall, no hall above it; pool + spa plant 89 m² ≥ 84 m² (pool 71–106 + spa 13–20, arch_edmEastglen2017, catalogue): pool plant 73 m² at grade + spa plant 16 m² beside the hot pool (storey 2); separate circulation per pool (BC 7.2) | pass |
| Pool equipment room | BC 9.8 (arch_adj_bcPoolDesign); NBC(AE) 7.2.3.38 (arch_svc_nbcae72) | own door to the south side yard and one to the staff corridor; pool equipment only | pass |
| Chlorine and acid rooms | BC 9.9 (arch_up2_bcPoolGuide) | separate rooms at grade, each with an outside door only (south side yard); nearest generator 16 m (our arithmetic) | pass |
| Chemical system, exhaust, delivery | BC 9.9; arch_adj_abStandataCl | gas or liquid chlorine ?; 110 % spill containment not drawn; chlorine exhaust ≥ 3 m from air intakes: intakes not placed ?; forklift clearance on the delivery path ? | ? |
| Pool hall height | arch_sportEngPoolsDGN (UK benchmark) | 6.0 m storey ≥ 3.5 m clear (flat ceiling); structure depth ? (drawing choice) | pass |
| Pool air | ASHRAE ch. 6 (arch_up4_ashraeCh6Pools) | pool hall at −15 to −40 Pa, doors with closers; dehumidifier and ducts not drawn (size ?) | ? |
| Spectators | NBC(AE) 7.2.2.2 (arch_adj_nbcAE72) | no spectator seating drawn; viewing only through the lobby glazing (drawing choice) | pass |
| Water closets, pool | Table 3.7.2.2.-A | WCs inside the change rooms; pool occupant load ? → count ? | ? |
| Storey 2 access | VBBL 3.8.2.3.(2)(g) | public lift E1 to the spa and greenhouse landing | pass |
| Greenhouse egress | 3.3.1.5.(1) | growing house one door: ≤ 200 m², ≤ 25 m to the door (drawing; our arithmetic) | pass |
| Greenhouse light | arch_marcelis2006; arch_uwexGhEnergy | on the pool-hall roof, beside the 12 m storey-2 block and the plant room: shading ? (orientation not checked) | ? |
| Heat cascade order | heat_cascade.md §3 (arch_asabeEp406, typ_heat_cascade_ashraeCh52T6) | heat hub → spa (water 36–40 °C; supply > 40 °C, our reading ?) → pool or greenhouse (greenhouse bench 35–40 °C; pool supply ?) → edge (mean fluid 17–19 °C, light snow); pool vs greenhouse order ? (diagram) | ? |
| Spa plant, outside access | NBC(AE) 7.2.3.38 (arch_svc_nbcae72); BC 9.8 | spa plant on storey 2 beside the hot pool, door from the spa hall only: outside access and chemical delivery to storey 2 ? | ? |
| Heated public edge | arch_pub_vanPlazaDG; arch_up3_edmWinterDG; arch_up4_ashraeCh52 | front yard only 0.6 m (36 m², our arithmetic), snow melt over all of it (drawing choice); manifold in the pool plant; snow melt in the City boulevard needs a street-use permit ? | ? |
| Nothing wet over the hall | FM 5-32 2.2.1.6 (insurer) | pool, change rooms, spa, greenhouse and chillers not above the hall; pool staff rooms and plant are below the hall (allowed by the rule; humidity below the hall floor ?) | pass |
| Wet rooms below the hall | FM 5-32 2.2.1.6 scope | pool plant and staff rooms at grade under the storey-2 hall: vapour and chemical fumes into the hall floor ? (no source) | ? |
| Zoning: pool use (I-3) | I-3 2.1; Section 2 (van3575s2, typ_community_pool_vanS2Uses) | Swimming Pool not listed in I-3: rezoning (flag, drawn "with rezoning"); Community Centre (C) route needs the Director of Planning ? | ? |
| Zoning: spa, greenhouse | I-3 2.1 (van_zdb_i3; arch_pub_vanSched) | spa: Beauty and Wellness Centre, conditional; greenhouse: Urban Farm Class B, conditional | ? |
| Zoning: DC use | I-3 2.1 | Bulk Data Storage (sub-area A ?), conditional | ? |
| No data storage at grade | I-3 2.2.11 | hall on storeys 2–3; at grade: pool, lobby, dock, SOC, ETS | pass |
| Main entrance from a street | Sec. 10.21.1 (arch_up_vanZDB10) | shared lobby on 1st Ave E | pass |
| FSR · non-industrial cap | I-3 3.1.1.1 | 3,219 m² ÷ 4,503 m² = 0.71 ≤ 3.00 · programs 1,373 m² ≤ 4,503 m² (1.00 FSR) (our arithmetic) | pass |
| Height | I-3 3.1.2.1 | hall roof 18.0 m over the 5.0 m slab: 17.97 m over the base surface ≤ 18.3 m (as the Emergency hub fit); storey-2 roof 12.0 m + plant room 3.9 m | pass |
| Yards · width · depth | I-3 3.1.2.2–8 | front 0.6, sides 7.6, rear 3.1 m (tool, per edge); 30.6 × 42.5 m ≤ 61.0 m; north wall at 15.15 m, inside the 7.6 m yard (check 2) | pass |
| Flood construction level | VBBL Div. A 1.4.1.2 (arch_hb_vbblFlood); CSA C282 6.2.1 | tool: lot grade 2.2–6.2 m, median 4.9 m (van_lidar2022_ground); 18 % of the lot below the 4.6 m FCL. Ground slab, generator and transformer pads 5.0 m ≥ 4.6 m (drawing choice). LiDAR datum ? vs the FCL in GVRD datum | ? |
| Exit discharge levels | 3.4.6; site grading | pool hall, staff corridor, plant and chemical doors open onto the low south side yard (grade 2.4–2.9 m vs the 5.0 m slab, City LiDAR): steps, ramp or regrading ? | ? |
| Fence height in required yards | Sec. 10.10.3 | plant enclosure fence 1.9 m ≤ 1.9 m; no lot-line fence | pass |
| Plant enclosures | J.B. design choice; Sec. 10.10.3 | generators and transformers in their own 1.9 m enclosures (unchanged yard) | pass |
| Chillers in an enclosed rooftop plant room | FM 5-32 2.2.1.6; NSW 2021 s. 4.3 (arch_nz_nswDcNoise) | 3 chillers on the storey-2 roof (12.0 m) over the spa, not the hall | pass |
| Noise at the lot lines | By-law 6555 ss. 2.1–2.3; tool noiseCheck | 3 chillers (Lw 107.6–110.9 dBA, tool method, our arithmetic). Without mitigation: 71.5 dBA at 336 1st Ave E (IC-3, activity zone), 25.4 m, limit 65. With the rooftop plant room (−25 dB): worst 46.5–49.8 dBA ≤ limits; nearest residential 455 Great Northern Way 30.8–34.1 ≤ 55 dBA | pass |
| Noise mitigation used | arch_nz_nswDcNoise s. 4.3, Table 4-5 | rooftop plant room: louvre airflow to the chillers ? (maker approval); height about 3.9 m (drawing choice) | ? |
| Generator, pool and programs plant noise | tool noiseCheck scope | generators (testing), pool plant and the programs mechanical room: no unit sound power on file ? | ? |
| Structural grid | — | column grid drawn as a drawing choice; pool hall clear span; no sourced data-hall span or bay ? | ? |
| Ducts across rated separations | 3.1.8.7.(1), (2); 3.1.9.1 | 2 crossings drawn (1 h): fire or smoke/fire dampers; none into the data centre (FM 5-32 2.6.6.2.2) | pass |
| Programs mechanical room | 3.6.2.1.(1), (6) | placed at grade; size ? (pool dehumidification and gym/spa HVAC not sized); 1 h drawn (drawing choice) | ? |
| Closures in 2 h walls | Table 3.1.8.4 | 1.5 h doors (not drawn) | ? |

## What fails, and flags

- **No hard fail** on either board. Every "to fix" item is a **?**.
- **Approval flags (not blocks):** E06B pool over the BE 500 m² cap → **s. 3.18 variance**; spa use in BE ?. V339 Swimming Pool not listed in I-3 → **rezoning**; spa and greenhouse conditional.
- **Under-sized against sources:** V339 pool storage 24 vs 44 m²; **V339 admin storage 0 vs 20 m²**; V339 DC break room 20 vs 24 m²; V339 storage and staging 46 vs 58.6 m²; E06B admin storage 18 vs 20 m²; E06B shipping 41 vs 45 m².
- **Broken placement rules (our reading of heat_cascade.md §2):** spa not at grade; greenhouse on the pool-hall roof.
- Spa bather route: dress at grade, shower at the spa, cross the storey-2 landing (?).
- Heat: pool supply ? (decides the order); spa annual load ?; edge back and edge losses not counted.

## Open questions for J.B.

- Accept the spa on storey 2 and the greenhouse on the pool-hall roof, or drop a stage (research "lite" cascade drops the pool)?
- Pool supply temperature: a source? It decides pool before or after the greenhouse.
- V339: spa plant on storey 2 (outside access ?), and admin storage not drawn: acceptable?
- Edge: which US city stands in (Great Falls, Minneapolis for Edmonton; Seattle for Vancouver are our picks)? Snow melt over the whole front yard?

## Tool notes (no code changed)

- With spa + pool + greenhouse picked, the tool's low end matches the Community pool run (3.7 · 1.4 MW).
- The tool's heat need (78–111 MWh/yr) counts the greenhouse at 190 m² gross; this fit uses the 153 m² growing house. The tool leaves out the pool (not drawn) and the edge.
- Canvas: `TestFit_HC_V339` (x 1540, y 18400) overlaps `TestFit_CP_V339` (y 15200, h 3430) by 230 px. The y was set by the brief.

## Licensing

- E06B lot outline is Altalis (EPSB GIS, academic use only). The E06B board must not be published or shared outside the course.

Check 1 only. Not yet checked by a second agent.
