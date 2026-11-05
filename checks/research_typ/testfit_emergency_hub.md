# Test fit: Emergency hub, both sites (4 Nov 2026)

Brief: `BRIEF_testfit_emergency_hub.md`. Schematic, one building per site. Boards: `whitemock/project/TestFit_EH_E06B.dc.html`, `TestFit_EH_V339.dc.html` (scratchpad; not published).

Labels: "our arithmetic", "our reading", "drawing choice"; **?** = no source. Room positions, corridor widths and the storey height of the hub in Edmonton are drawing choices. Every size with a source carries its id.

Inputs from the tool (served from `outputs/tool`, run 4 Nov 2026 with Playwright, Architecture mode, Ratios at defaults, low end of the MW range):

| | E06B, 64 Airport Rd NW (BE) | V339, 339 1st Ave E (I-3) |
|---|---|---|
| Lot | 4,284 m² (city record; outline 4,246 m², Altalis) | 4,503 m² (outline 4,467 m², City open data) |
| Lot lines (tool classes) | front: street, Collector, 4.5 m; alley side 0 m; rear (lot) 0 m; side (lot) 0 m | front: 1st Ave E, 0.6 m; sides 7.6 m; rear 3.1 m (rear and side by our reading, labelled in the tool) |
| Buildable (tool) | 3,986 m² inside the yards | 1,738 m² (the tool centres the 61 m cap; see changes) |
| Limit | FAR 1.6 → 6,854 m²; 16.0 m | envelope 5,257 m²; 18.3 m |
| MW tested (plant included, low end) | 3.7 MW (range 3.78–8.18) | 1.5 MW (range 1.57–3.40) |
| Plant counts (tool) | 4 × 2,000 kW generators; 5 air-cooled chillers; racks 463–522 | 4 × 1,000 kW generators; 3 chillers; racks 188–212 |

## Short answer

- **E06B fits** as one 2-storey building: hub row on the street (1,021 m²), hall 2 × 1,168 m² behind, plant in the rear yard off the alley. No hard fail; 15 open items after the access fix (4 Nov, below).
- **V339 fits** in 18.0 m: refuge and shelter at grade, **clinic beside the hall on storey 2** (no hall storey lost), hall on storeys 2–3. Two fails, both fixed in the redraw (4 Nov): fence (now 1.9 m on the plant only) and flood (slab and pads at 5.0 m ≥ 4.6 m FCL; LiDAR datum ?).
- The data centre with all its support rooms is far bigger than the tool's Ratios split: **+39 % (E06B), +118 % (V339)**.
- Refuge and shelter need **11 WCs** by the table occupant load, not 3.

## E06B: 64 Airport Road NW, Edmonton (BE), beside variant

### Room schedule

| Room | Rule or basis | Sourced | Drawn | Source ids |
|---|---|---|---|---|
| **DATA CENTRE (3.7 MW IT, tool low end; PUE 1.4–1.55)** | | | | |
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
| Guard room | in the reception zone at the entry; size ? | ? | 20 m² | arch_acc_gcpsg015RZ |
| Security control room / NOC | alarms at a constantly attended place; size ? | ? | 50 m² | arch_sec2_gcpsg003, arch_dc_fm0532rooms |
| Portal + 850 mm door | 1.8 m wheelchair portal; swing door beside it for egress | 1.8 × 1.8 m | 7.0 m² | arch_acc_gunneboHiSec, arch_acc_nbcAccessible |
| Offices | filed plans: open office 100 m² (benchmark); size ? | ? | 18.1 m² | burlingtonPlans2026 |
| Break room | filed plans: staff lounge 24 m² | 24 m² | 30 m² | burlingtonPlans2026 |
| Staff WC, shower, lockers | designed staff load ≤10 (≈4–5 staff, claims) → 1 WC; shower optional | 1 WC | 41.2 m² | arch_per_nbcWC, arch_dc_nbcJanitorShower, hillingdon_up4, jlarc2024 |
| Sprinkler valve room, cylinders | size ? (NFPA 13, 2001 paywalled) | ? | 12.3 m² | arch_dc_fm0532rooms |
| Garbage room | refuse room 1 h, sprinklered (NBC 3.6.2.5.(1)); size ? | ? | 28.1 m² | adj_service.md |
| Heat hub / ETS (add-on) | utility room 27–55 m², 2 h, card reader (Blatchford, benchmark) | 27 m² | 28.1 m² | arch_ho_breMultiUnit2025 |
| **PROGRAMS (emergency_hub.md)** | | | | |
| Refuge main room | 50 people × 3.5 m² | 175 m² | 175.1 m² | arch_ahsReceptionCentres |
| Warming shelter rest area | 16 guests × 3.5 m² | 56 m² | 54.6 m² | arch_sup_torRespite |
| WCs refuge + shelter | Table 3.1.17.1 load 233 + 73 = 306 → 153 a sex → 4 M + 7 F (Table 3.7.2.2.-A) × 4.6 m² (our arithmetic) | 11 WCs, 50.6 m² | 50.4 m² | cc_nbcOccLoad, arch_sup_nbcT3722A, arch_sup_abGFNARooms |
| Universal WC · universal shower | at each washroom location; one shower room | 4.6 · 6 m² | 4.6 · 6.0 m² | arch_sup_nbcUniversal, arch_sup_nbcWashrooms |
| Staff office (shared) · first aid | 8 · 6 m² | 14 m² | 14 m² | arch_sup_eastglenRooms |
| Cot storage · plant, emergency panel | required, no m² | ? | 17.4 · 28.9 m² | arch_hcCleanerAirSpaces |
| Clinic, 13 exam rooms | exam 13 × 12; treatment + 3 bays 48.5; consult etc. 53.5; staff 7; WCs: load 52 → 2 a sex (Table 3.7.2.2.-B) | 283 m² + waiting ? | 484 m² gross (waiting 80 ?, offices 19.6 ?) | arch_hsg_abGFNA2021, arch_sup_abGFNARooms, arch_per_nbcWC |
| **SHARED** | | | | |
| Shared lobby | size ? | ? | 133 m² | drawing choice |
| Corridors | public ≥1,100 mm; non-public width ? (2.4 m drawn) | ? | secure 79 + 42 · service 64 + 64 | cc_nbcAccessToExit |
| Stairs S1, S2 | 6.0 m storey: 2 flights ≤3.7 m, 17 risers ≤180, treads 280, width 1,100 → 7.0 × 2.6 m (our arithmetic) | 18.2 m² each | 2 stairs | cc_nbcExits |
| Freight elevator | storey 2 to be reached (building >600 m², our reading); size ? | ? | 12.2 m² | cc_accessStoreys |
| Shafts | 45 min with 1 h floors (Table 3.6.3.1); size ? | ? | 12.2 m² | cc_nbcVertService |

### Exits and travel (our arithmetic; rectilinear distance from every 0.5 m point to the nearest exit, a proxy for paths along aisles)

| Storey | Zone | Worst travel | Exit pair apart vs ½ diagonal |
|---|---|---|---|
| L1 | hub: clinic | 27.5 m ≤ 45 m | 58.5 m ≥ 37.5 m |
| L1 | hub: refuge and shelter | 25.1 m ≤ 45 m |  |
| L1 | data centre, storey 1 | 44.3 m ≤ 45 m |  |
| L1 | DC rooms behind the portal | 29.5 m ≤ 45 m |  |
| L2 | data centre, storey 2 | 40.4 m ≤ 45 m | 53.6 m ≥ 31.1 m |

### Compliance

| Check | Clause | Plan figure | Result |
|---|---|---|---|
| Building classification | NBC(AE) 3.2.2.6; 3.2.2.77 | F-2 governs (our reading); 2 storeys, 2,808 m² building area ≤ 9,000; sprinklered, noncombustible, 1 h floors | pass |
| Sprinklers | 3.2.2.77 (article chosen) | whole building sprinklered (NFPA 13) | pass |
| Hub (A-2) to data centre (F-2) | Table 3.1.3.1 | 2 h walls along the refuge and lobby; drawn | pass |
| Clinic (D) to data centre (F-2) | Table 3.1.3.1 (note 8) | none drawn; 1 h only if built to 3.2.2.57 | pass |
| A-2 to D (lobby, refuge to clinic, guard) | Table 3.1.3.1 note 4 | 1 h drawn | pass |
| Battery room · UPS, MV, MMR, garbage | NFPA 855 (US, kept); 3.6.2.1; FM 5-32; 3.6.2.5 | 2 h · 1 h drawn | pass |
| Closures in 2 h walls | Table 3.1.8.4 | 1.5 h doors (not drawn) | ? |
| Exits per storey | 3.4.2.1.(1) | storey 1: 4 exterior exits for the data centre, 2–3 per hub room; storey 2: S1, S2 | pass |
| Exit separation | 3.4.2.3.(1) | storey 1: 58.5 m ≥ 37.5 m; storey 2: 53.6 m ≥ 31.1 m | pass |
| Travel distance, sprinklered | 3.4.2.5.(1) | worst 44.3 m ≤ 45 m (storey 1, secure corridor to S1); storey 2 40.4 m; hub ≤27.5 m (rectilinear, our arithmetic) | pass |
| Travel margin on storey 1 | 3.4.2.5.(1) | 44.3 of 45 m: racks may lengthen the path | ? |
| Refuge exits and width | 3.3.1.5; 3.4.3.2 | load 233 → 1.42 m at 6.1 mm (our arithmetic); 2 doors ≥0.9 m drawn (width drawing choice) | pass |
| Occupant load, refuge | 3.1.17.1.(1)(c), (2) | table load 233 used; 50 needs "shown fewer" and a posted sign | ? |
| Occupant load, data hall | Table 3.1.17.1 | no row; designed staff load ≤10 posted (our reading). At 4.60 m² "process": 508 persons | ? |
| Water closets, hub | Table 3.7.2.2.-A, -B | refuge + shelter 11 WCs; clinic 4; drawn | pass |
| Universal washroom | 3.8.2.8.(1) | one in each washroom bank (refuge, clinic, lobby, DC staff) | pass |
| Accessible entrances | 3.8.2.2.(1) | lobby, clinic, refuge step-free; power door at the lobby | pass |
| Storey 2 access | NBC(AE) 3.8.2.3 | freight elevator; whether it counts as the accessible route | ? |
| Physician clinic | NBC(AE) 3.8.5.2–3 | 915 mm doors, power operators, 1,700 mm turning in waiting (not drawn) | ? |
| Fire department access | 3.2.5.5.(1) | principal entrance 4.5 m behind the street lot line; kerb distance ? | ? |
| FDC | NBC(AE) 3.2.5.15.(3) | 5.0 m from the principal entrance (3–15 m); hydrant ≤45 m ? | pass |
| Spatial separation, side lot line | Tables 3.2.3.1.-E, 3.2.3.7 | 0 m: blank walls, 2 h (F-2), 1 h (clinic), noncombustible cladding | pass |
| Lobby used as an exit | 3.4.4.2.(2)(c) | not used as an exit; DC rooms behind the portal exit through it (our reading) | ? |
| Locked doors on exit paths | 3.4.6.16 | portal side door and yard gate release on alarm and power loss | pass |
| Zoning: FAR | BE 4.1.2 | 4,407 m² ÷ 4,284 m² = 1.03 ≤ 1.6 | pass |
| Zoning: height | BE 4.1.1 | hall 12.0 m; chillers on the hub roof 8.9 m ≤ 16.0 m | pass |
| Zoning: setbacks | BE Table 4.1 (tool, per line) | street 4.5 m (Collector); alley, sides, rear 0 m | pass |
| BE 500 m² per use | BE 3.3.1, 3.12.1, 3.18 | clinic 484 m²; refuge + shelter 374 m² (one use or two ?) | ? |
| Loading not between building and street | BE 5.8 | dock on the alley side | pass |
| Plant screened from the street | BE 5.2 | chillers on the hub roof behind a screen; generators in the rear yard | pass |
| Transparent street front, visible entrances | BE 5.3.1–5.3.2 | lobby, clinic, refuge glazed to the street (drawing choice) | pass |
| Façade articulation (55 m wall) | BE 5.1 | two techniques: not designed yet | ? |
| Generators: tanks to building · lot line | CSA B139 Table 2 | 2.7 m ≥ 1.5 m · 3.0 m ≥ 3.0 m | pass |
| Generator exhaust to openings | NBC 6.3.3.1.(2); Table 6.3.2.9 | nearest exit door 4.1 m ≥ 3.0 m; refuge ≥32 m (exhaust outlet position ?) | pass |
| Generator room | CSA C282 5.2; 3.6.2.8 | outdoor enclosures: whether the 2 h rule applies ? | ? |
| Fuel truck | NFC 4.11.2.4; 4.11.3.2 | attended unloading 6.0 m from generators, 7.3 m from transformers; no 15 m spot for an unattended truck | ? |
| Transformers | EPCOR 6.4 | 13.5 m ≥ 6.0 m from the building; right of way ? | pass |
| Dock to air intakes | NBC Table 6.3.2.9 | refuge intakes (roof, drawing choice) ≥25 m ≥ 7.6 m | pass |
| Nothing wet over the hall | FM 5-32 2.2.1.6 (insurer) | chillers, WCs, clinic not above the hall | pass |
| Noise at the lot lines | Bylaw 14600 ss. 19–22 | not re-run for this layout | ? |
| Secure line | notes 1 Nov 2026; J.B. 4 Nov 2026 | inside the building around the data centre and dock; generators and transformers in their own 1.9 m enclosures (fence 1.9 m, J.B. design choice); refuge, shelter, clinic outside | pass |
| Site grade | Bylaw 20001 s. 5.70 | NRCan HRDEM not reached: grade, height base and flood ? | ? |

### Changed since the 4 Nov typology numbers

- **Data-centre floor area:** 2,399 m² in the tool split (hall + UPS + battery) → 3,336 m² with all support rooms (+39 %); support 30 % of the data centre, inside the 13–52 % range.
- **Hub:** 853–1,017 m² → 1,021 m² drawn, lobby and guard room included.
- **Clinic and the BE cap:** "needs a variance" → 484 m² fits under 500 m², only if waiting (80 m²) and offices (19.6 m²) hold. At the built 604 m² it needs the variance again.
- **Refuge and shelter WCs:** 1 M + 1 F + universal → 11 WCs + universal. The table occupant load (306) governs unless fewer can be shown and a sign is posted.
- **Clinic WCs:** 5 → 4 (load 52, Table 3.7.2.2.-B).
- **Generators:** tool: one hall placement fails, 2 of 4 sets drawn at the front → all 4 fit in the rear yard.
- **Chillers:** tool: on the hall roof → on the hub roof, so no liquid runs over the hall (FM).
- **Fuel truck:** the notes' "15 m from buildings" applies to an unattended truck (>1 h). Attended unloading needs 6 m from ignition sources.

### What fails

- No hard fail.
- Open: travel distance 44.3 of 45 m, clinic waiting size, one or two BE uses, accessible route to storey 2, façade articulation, noise, unattended fuel truck.

## V339: 339 1st Avenue East, Vancouver (I-3), stacked variant

### Room schedule

| Room | Rule or basis | Sourced | Drawn | Source ids |
|---|---|---|---|---|
| **DATA CENTRE (1.5 MW IT, tool low end; PUE 1.4–1.55)** | | | | |
| Data hall, storeys 2–3 | 630 m²/MW × 1.5 MW; not at the ground floor | 945 m² | 2 × 477 m² | arch_dc_hall, it_load_outside, van_zdb_i3 |
| Racks · room cooling units | P ÷ 7.1–8 kW · tool count, N+1 | 188–212 · 8–10 | inside the hall | rack_count, room_cooling_units (tool run) |
| UPS room | ⌈1.5⌉ + 1 = 3 modules (N+1), 3.6 × 0.9 m + 1.5 m working space | 25.9 m² (our arithmetic) | 37.0 m² (2 + 1 in facing rows) | ups_modules, galaxyVX, electrical_room, cec2024 |
| Battery room (Li-ion, 5 min) | 4–6 cabinets; 6 drawn; groups ≤50 kWh 0.9 m apart (US benchmark) | ≈21 m² (our arithmetic) | 21.5 m², 2 h | battery_cabinets, vertivLi5, deltaLZH, nfpa855_2026 |
| Battery room HVAC | separate from the equipment areas (insurer) | ? | 12.0 m² | arch_up_fm0528 |
| Meet-me rooms | 2 (one site visit); size ? | ? | 2 × 8.4 m² | tourVAN3, arch_dc_ualbertaTelecom |
| MV switchgear, main electrical | above the flood level (storey 3); size ? | ? | 26 m² | arch_up_fm0523, adj_service.md |
| Transformers | ⌈2.33 MVA ÷ 2.5⌉ + 1 = 2 pads, 2.63 × 2.49 m; BC Hydro 1 m to building, 3 m in front | 2 pads | 2 pads | transformers, eatonCA022021, bchES54F |
| Generators (yard) | ⌈1.5 × 1.55⌉ + 1 = 4 × 1,000 kW, 8.43 × 2.62 m; above the flood elevation | 4 sets | 4 sets, pads 5.0 m (grade 4.7–5.1 m; datum ?) | generator_sets, rehlkoKD1000, arch_csa_c282, van_lidar2022_ground |
| Fuel | 12 h × 2.10–2.33 MW × 0.263 L/kWh (claims); code floor 2 h | 6,630–7,340 L; 2 h: 1,105–1,225 L (our arithmetic) | sub-base tanks (drawing choice) | fuel_on_site, cat3516c, arch_csa_c282 |
| Loading | Class B: 1 for 465 m² + 1 for the next 1,860 m² → 2 for ≈2,180 m² (our arithmetic); 10.2 × 3.4 × 3.8 m, aisle 6.1 m | 2 spaces | 2 bays, 69.4 m² | vanParking5 |
| Shipping and receiving | filed plans 45 m² | 45 m² | 50.4 m² | burlingtonPlans2026 |
| Storage and staging | filed plans 40 + 18.6 m² | 58.6 m² | 46.2 m² | burlingtonPlans2026, arch_dc_fm0532rooms |
| Guard room | reception zone at the entry; size ? | ? | 20.3 m² | arch_acc_gcpsg015RZ |
| Security control room / NOC | size ? | ? | 46.9 m² | arch_sec2_gcpsg003 |
| Portal + 850 mm door | 1.8 m wheelchair portal; swing door for egress | 1.8 × 1.8 m | 4.8 m² | arch_acc_gunneboHiSec, arch_acc_nbcAccessible |
| Offices | filed plans 100 m² (benchmark); size ? | ? | 44.5 m² | burlingtonPlans2026 |
| Break room · staff WC | filed plans 24 m² · 1 WC (VBBL: one WC serves ≤25) | 24 m² · 1 WC | 19.5 · 8.4 m² | burlingtonPlans2026, arch_per_nbcWC |
| Sprinkler valve room · janitor | size ? | ? | 15.0 · 6.3 m² | arch_dc_fm0532rooms, arch_dc_nbcJanitorShower |
| Garbage room | at grade beside the truck stop, 4.5 m clear (Vancouver); 1 h | ? | 37.8 m² | servicing_social.md, adj_service.md |
| Heat hub / ETS (add-on) | NEU minimum 6 × 3 m below 13,940 m², on the perimeter | 18 m² | 18.0 m² | neuETS |
| Spare at grade | no bulk data storage at the ground floor | — | 257 m² | van_zdb_i3 2.2.11 |
| **PROGRAMS (emergency_hub.md)** | | | | |
| Refuge main room | 50 people × 3.5 m²; own street entrance | 175 m² | 174.6 m² | arch_ahsReceptionCentres, arch_up_vanZDB10 |
| Warming shelter rest area | 16 guests × 3.5 m²; own street entrance | 56 m² | 56.2 m² | arch_sup_torRespite |
| WCs refuge + shelter | load 233 + 75 = 308 → 154 a sex → 4 M + 7 F × 4.6 m² (our arithmetic) | 11 WCs, 50.6 m² | 50.6 m² | cc_nbcOccLoad, arch_sup_nbcT3722A |
| Universal WC · first aid · staff office | 4.6 · 6 · 8 m² | 18.6 m² | 25.3 m² | arch_sup_nbcUniversal, arch_sup_eastglenRooms |
| Universal shower · lockers | 6 m² · lockers ? | 6 m² + ? | 28.5 m² | arch_sup_nbcWashrooms |
| Cot storage · plant, emergency panel | required, no m² | ? | 28.5 · 29.2 m² | arch_hcCleanerAirSpaces |
| Clinic, storey 2 | rooms as E06B; WCs: load 59 → 2 a sex; not at grade except entrances | 283 m² + waiting ? | 543 m² gross (waiting 60 ?, offices 58 ?, admin 31 ?) | arch_hsg_abGFNA2021, arch_sup_abGFNARooms, van_zdb_i3 |
| **SHARED** | | | | |
| Shared lobby | size ?; main entrance from the street | ? | 79 m² | arch_up_vanZDB10 |
| Corridors | public ≥1,100 mm; non-public width ? (2.4 m drawn) | ? | secure 3 × 74 · service 26–51 | cc_nbcAccessToExit |
| Stairs S1, S3 (clinic) · S2, S4 (data centre) | 7.0 × 2.6 m for a 6.0 m storey (our arithmetic) | 18.2 m² each | 4 stairs | cc_nbcExits |
| Elevators E1 (public) · E2 (freight) | every storey reached (VBBL 3.8.2.3.(2)(g)); size ? | ? | 5.2 · 8.4 m² | cc_accessStoreys |
| Shaft | 1 h with 2 h floors, 45 min with 1 h (Table 3.6.3.1); size ? | ? | 1.8 m² | cc_nbcVertService |

### Exits and travel (our arithmetic; rectilinear distance from every 0.5 m point to the nearest exit, a proxy for paths along aisles)

| Storey | Zone | Worst travel | Exit pair apart vs ½ diagonal |
|---|---|---|---|
| L1 | hub: refuge and shelter | 24.5 m ≤ 45 m | 33.9 m ≥ 26.3 m |
| L1 | data centre, storey 1 | 28.2 m ≤ 45 m |  |
| L2 | clinic, storey 2 | 27.7 m ≤ 45 m | 28.9 m ≥ 26.3 m |
| L2 | data centre, storey 2 | 25.6 m ≤ 45 m |  |
| L3 | data centre, storey 3 | 25.6 m ≤ 45 m | 28.9 m ≥ 19.4 m |

### Compliance

| Check | Clause | Plan figure | Result |
|---|---|---|---|
| Building classification | VBBL 3.2.2.6; 3.2.2.77 | F-2 governs (our reading); 3 storeys, 1,311 m² building area ≤ 6,000; noncombustible, 1 h floors | pass |
| Sprinklers | VBBL Div. A 1.3.3.6; 3.2.2.18.(3) | all new buildings: sprinklered | pass |
| Hub (A-2) to data centre (F-2) | Table 3.1.3.1 | 2 h wall at storey 1; refuge has no F-2 above it | pass |
| Refuge (A-2) under clinic (D) | Table 3.1.3.1 note 4 | 1 h floor | pass |
| Clinic (D) beside the hall (F-2) | Table 3.1.3.1 | none (security wall only) | pass |
| Battery room · UPS, MV, MMR, garbage | NFPA 855 (US, kept); 3.6.2.1; 3.6.2.5 | 2 h · 1 h drawn | pass |
| Exits per storey | 3.4.2.1.(1) | clinic S1, S3; data centre S2, S4; hub rooms 2–3 exterior doors | pass |
| Exit separation | 3.4.2.3.(1); 3.3.1.5.(2) | storey 1: 33.9 m ≥ 26.3 m; storey 2 (DC): 28.9 m ≥ 26.3 m; clinic S1–S3 25.7 m ≥ ⅓ of its 36.2 m diagonal (our reading) | pass |
| Travel distance, sprinklered | 3.4.2.5.(1) | worst 28.2 m ≤ 45 m (rectilinear, our arithmetic) | pass |
| Stair width | Table 3.4.3.2.-A; 3.4.3.2 | 1,100 mm; clinic load 59 × 8 mm = 0.47 m (our arithmetic) | pass |
| Occupant load, refuge · data hall | 3.1.17.1 | table load 233 used · hall: no row, designed staff load (our reading) | ? |
| Water closets, hub | Table 3.7.2.2.-A, -B | refuge + shelter 11; clinic 4 | pass |
| Universal washroom on the entrance storey | VBBL 3.8.2.8.(4) | refuge bank and DC staff WC at grade | pass |
| Every storey reached | VBBL 3.8.2.3.(2)(g) | E1 public to the clinic; E2 freight inside the secure line (accessible ?) | pass |
| Accessible entrances | 3.8.2.2.(1) | refuge door grade 5.0 m, shelter 5.3 m: step-free at the 5.0 m slab; lobby door grade 5.7 m: 0.7 m above the slab (ramp ?) | ? |
| Exit discharge levels | 3.4.6; site grading | S2 and the refuge side door open onto the low side yard (2.9–4.5 m): steps or regrading ? | ? |
| FDC | VBBL 3.2.5.15.(2) | 3.0 m from the principal entrance, visible from the street | pass |
| Principal entrance to street | 3.2.5.5.(1) | 0.6 m front yard; kerb distance along the path ? | ? |
| Spatial separation, side lot lines | Table 3.2.3.1.-E, -D | 7.6 m side yards: about 28–34 % openings (F-2), 66–82 % (public) — glazing not drawn | ? |
| Locked doors on exit paths | 3.4.6.16; VBBL (8) | S2 and S4 discharge outside the secure line; no yard gate on the exit path (redraw) | pass |
| Zoning: use | I-3 2.1 | Bulk Data Storage (sub-area A ?), Community Centre / SSC, Health Care Office: all conditional | ? |
| No data storage at grade | I-3 2.2.11 | hall on storeys 2–3; at grade: entrances, dock, SOC, ETS, spare 257 m² | pass |
| Clinic not at grade | I-3 2.2.6 | clinic on storey 2, entrance and E1 at grade | pass |
| Main entrance from a street, each use | Sec. 10.21.1 | refuge, shelter, lobby (clinic, data centre) on 1st Ave E | pass |
| One principal building | Sec. 10.34.1 | one building | pass |
| FSR · non-industrial cap | I-3 3.1.1.1 | 3,320 m² ÷ 4,503 m² = 0.74 ≤ 3.00 · hub 1,159 m² ≤ 4,503 m² (1.00 FSR) | pass |
| Height | I-3 3.1.2.1; s. 2 Building Height, Base Surface | roof 23.0 m (slab 5.0 + 18.0) − base surface 5.03 m (lowest under the 18 m roof; linear surface over the existing corner grades 4.6, 5.1, 4.7, 4.6, 6.3 m; official grades ?) = 17.97 m ≤ 18.3 m; overruns: s. 10.1.1 ? | pass |
| Floor-to-floor | I-3 3.1.2.9 | 6.0 / 6.0 / 6.0 m (≥6.0 ground, ≥4.0 upper) | pass |
| Width · depth | I-3 3.1.2.7–8 | 30.6 m · 42.5 m ≤ 61.0 m | pass |
| Yards | I-3 3.1.2.2–6 | front 0.6, sides 7.6, rear 3.1 m (tool lines) | pass |
| Fence height in required yards | Sec. 10.10.3 | plant enclosure fence 1.9 m ≤ 1.9 m cap; no fence on the lot lines; secure line inside the building (redraw 4 Nov) | pass |
| Driveway in the side yard | I-3 3.1.2.4, 3.1.2.16 | side drive in the 7.6 m yard: allowed ? (yard can be decreased for loading) | ? |
| Gate setback | arch_per_vanPkgSupp Table 3 | gate 19.8 m in: WB-17 held on site (≈17 m, our arithmetic) | pass |
| Loading count and size | Parking By-law s. 5 | 2 Class B bays 10.2 × 3.4 × 3.8 m, aisle 6.1 m outside | pass |
| Flood construction level | VBBL Div. A 1.4.1.2; CSA C282 6.2.1 | ground slab 5.0 m and generator and transformer pads 5.0 m ≥ 4.6 m (drawing choice); grade under the refuge 4.6–5.3 m, under the generators 4.7–5.1 m (City LiDAR 2022, our arithmetic); LiDAR datum vs GVRD datum ? | ? |
| Generators to openings · intakes | NBC 6.3.3.1.(2); Table 6.3.2.9 | 5.7 m to the dock doors ≥3.0 m | pass |
| Generators near care uses | Metro Vancouver 1329 s. 57 | clinic is outpatient, not a hospital or care facility (our reading) | ? |
| Fuel truck | NFC 4.11.2.4; 4.11.3.2 | attended unloading 6.1 m from generators; no 15 m spot for an unattended truck | ? |
| Transformers | BC Hydro ES54 F | pads 15.9 m from the building; 3 m clear in front; 1 m apart | pass |
| Nothing wet over the hall | FM 5-32 2.2.1.6 (insurer) | chillers moved to the clinic roof; clinic beside, not over, the hall | pass |
| Noise at the lot lines | By-law 6555 | not re-run for this layout | ? |
| Secure line | notes 1 Nov 2026; J.B. 4 Nov 2026 | inside the building around the data centre and dock; plant in its own 1.9 m enclosure; refuge, shelter, clinic outside | pass |

### Changed since the 4 Nov typology numbers

- **MW tested:** 1.4 MW, 894 m² (4 Nov) → 1.5 MW, 999 m² in today's tool run.
- **Placement:** the tool centres the 61 m box 24 m back from the street. 61 m is a maximum, so the building sits at the 0.6 m yard and is only 42.5 m deep (our reading).
- **Clinic:** "under the hall, costs a hall storey" → beside the hall on storey 2. D to F-2 needs no separation, so 2 hall storeys + clinic fit at 18.0 m ≤ 18.3 m.
- **Chillers:** moved from the hall roof to the clinic roof (FM).
- **Data-centre floor area:** 999 m² in the tool split → 2,180 m². Support is 56 % (50 % without the 257 m² spare at grade), above the 13–52 % range, because nothing with servers may go at grade.
- **WCs:** refuge + shelter 11 WCs; clinic 4, as in E06B.

### What fails

- ~~Fence 2.4 m over the 1.9 m cap~~ fixed in the redraw: secure line inside the building, plant enclosure 1.9 m.
- ~~Flood~~ fixed in the drawing: slab and pads at 5.0 m ≥ 4.6 m FCL. Open only on the datum (LiDAR datum ?).
- New open items from the grade: lobby door 0.7 m above the slab (ramp ?); S2 and refuge side door onto the low side yard (2.9–4.5 m).
- Open: side drive in the side yard, roof overruns over 18.3 m, noise, secure-yard exit discharge.

## Redraw (4 Nov 2026, ELEV_REDRAW brief part B)

Boards redrawn with the same file names (`whitemock/project/TestFit_EH_E06B.dc.html`, `TestFit_EH_V339.dc.html`; scratchpad; generator `tf/redraw.py`). Same room geometry as above; nothing was moved except the secure line and the plant fence.

- **Drawing:** rooms as soft tinted blocks in 7 groups (data hall; data-centre support; refuge + warming shelter; clinic; shared lobby and circulation; plant; public edge). One label per group per storey, leaders at 90°, labels off the drawing. Symbols only: entrance arrows (public, data centre, service), exit stairs, secure line, fence 1.9 m. Accent red only for problems.
- **Secure line:** now inside the building, 1.2 m in from the data-centre walls (drawing choice; J.B. 4 Nov: the wall or inside). Plant outside it gets its own enclosure: fence 1.9 m, 1.5 m clear of the units (drawing choice). No lot-line fence.
- **Beside the plan:** group table (m², rooms), code check as Passes (count) and Needs fixing (one line and clause each), room list collapsed.
- **V339 grade (City LiDAR 2022, 2 m ground means, our arithmetic; datum ?):** lot 2.2–6.2 m, median 4.9 m; under the building 2.3–5.7 m (low ground along one side yard); refuge 4.6–5.3 m; generator yard 4.7–5.1 m; transformers 5.0–5.1 m; street doors: refuge 5.0, shelter 5.3, lobby 5.7 m; lot corners 4.6, 5.1, 4.7, 4.6, 6.3 m.
- **V339 fixes:** ground slab 5.0 m (drawing choice: the refuge street-door grade), generator and transformer pads 5.0 m, both ≥ 4.6 m FCL. Height rechecked: 23.0 m roof − 5.03 m base surface = 17.97 m ≤ 18.3 m. The base surface uses existing corner grades joined linearly (our reading); the by-law uses the official grades from the City Engineer, which are not on file (?).
- **Code check now:** E06B 28 pass, 14 to fix (all ?); V339 31 pass, 11 to fix (all ?, no fail).
- **E06B:** grade ? (NRCan HRDEM not reachable from this session).
- **Screens:** `checks/agents/elev_shots/TestFit_EH_<site>.png` at 1440 px; 0 leader crossings (script check) and checked by eye.

## Fix: access, rooms as blocks, path checks (4 Nov 2026, TESTFIT_FIX brief)

Same file names. Generator `tf/redraw2.py`; geometry `tf/geom2.py` (every room its own block, every door placed); checks `tf/paths.py`. Building outlines, hall, stairs, yard and areas unchanged (cover check: storeys tile with no gaps; 2,808 · 1,598 m² E06B, 1,311 · 1,311 · 725 m² V339).

What changed:
- **One clinic corridor from the lobby, per storey.** E06B storey 1: a ring (2.0 m, drawing choice; ≥1,100 mm, 3.3.1.9.(1)) entered from the shared lobby; all 27 clinic rooms open off it or the waiting room; second clinic exit is an exterior street door at the corridor's far leg, outside the secure line. V339 storey 2: ring along the stairs and street rooms from the lift lobby; exits S1 and S3.
- **Refuge and shelter:** one refuge corridor (2.0 m) from the lobby to an exterior door; every support room opens off it; 6.0 m stubs.
- **Lobby, E06B:** a second street door (13.0 m from the first ≥ 10.1 m, half its diagonal; drawing choice). Clinic waiting street door moved to v = −15.5 m.
- **Data-centre rooms exit inside the secure line.** E06B rooms behind the portal now leave by the secure passage and secure corridor to S1 (not the lobby). V339: exterior door at the south end of the storey-1 secure corridor; a second hall door at each end of the storey-2 and 3 corridors (no secure dead end over 6 m). Strip 0.6 m of storey-1 service corridor merged into storage.
- **Rooms drawn one by one:** group tint, thin outline, to scale; number in each block keyed to a list beside each plan (number, name, drawn m², **?** = no sourced size). One label per group per storey, leaders 90°, placed where they cross fewest rooms; 0 leader crossings (script) and checked by eye at 1× and 2×. Door gaps 0.9 m (drawing choice). Worst path per storey drawn dotted.
- **Not a corridor width:** CSA Z8000 12.2.3.5 (arch_up4_csaZ8000_12) is stretcher **doors** ≥1,100 mm. Corridor width is NBC 3.3.1.9.(1). Door widths are not drawn: open item.

New checks (our arithmetic; 0.25 m grid, walls block except at doors, rectilinear steps along rooms and corridors; racks and furniture not modelled):

| Check | Clause | E06B | V339 | Result |
|---|---|---|---|---|
| Connected | J.B. 4 Nov; 3.3.1 | 70 rooms, 2 storeys: each reaches the lobby and an exit without the secure line; DC rooms reach DC exits | 70 rooms, 3 storeys: same | pass, pass |
| Travel distance along the path | 3.4.2.5.(1), 45 m | L1 44.7 m (DC lockers → S1); L2 38.9 m (hall → S1) | L1 24.2 m (cot storage → S1); L2 31.1 m (battery HVAC → S4); L3 31.2 m (MV room → S4) | pass, pass |
| Two exits | 3.4.2.1.(1); 3.4.2.3.(1) | L1: clinic 4 (32.0 ≥ 15.6 m), refuge 6 (35.4 ≥ 14.2), lobby 2 (13.0 ≥ 10.1), DC 8 (57.6 ≥ 34.9); L2: DC 2 (55.6 ≥ 31.1) | L1: refuge 7 (29.6 ≥ 16.0), lobby 2 (14.1 ≥ 10.2), DC 7 (35.2 ≥ 20.0); L2: clinic 2 (27.3 ≥ 18.1), DC 2 (31.7 ≥ 19.4); L3: DC 2 (31.7 ≥ 19.4) | pass, pass |
| Public corridor width | 3.3.1.9.(1) | 2.0 m ≥ 1.1 m | 2.0 m ≥ 1.1 m | pass |
| Dead-end public corridors | 3.3.1.9.(5), 6 m | stubs ≤ 6.0 m | stubs ≤ 6.0 m | pass |
| Dead ends in the secure line | 3.3.1.9.(5) scope ? | secure passage 12.0 m; L2 service corridor 19.7 m (second way only through storage and hall) | none over 6 m | ?, pass |
| Stretcher doors | CSA Z8000 12.2.3.5 | not drawn | not drawn | ? |

"Two exits" counts exits reached without crossing the secure line or another program; the shared lobby counts for the rooms off it (our reading). Exit pairs: farthest pair vs half the zone's diagonal.

Results now: **E06B 31 pass, 15 to fix (all ?, no fail); V339 34 pass, 12 to fix (all ?, no fail).** Replaced rows: Exits per storey, Exit separation, Travel distance (rectilinear) → the three new checks. Changed: Lobby used as an exit → pass (DC rooms no longer exit through it); Travel margin → 44.7 of 45 m (?); BE 500 m² per use → refuge + shelter 384 m² (?); V339 exit discharge → adds the secure-corridor end door (?).

Screens (scratchpad, 1440 px): `tf/TestFit_EH_E06B_v2.png`, `tf/TestFit_EH_V339_v2.png`.

## Pass 3: DC staff entrance, grid, services, noise (4 Nov 2026, TESTFIT_FIX2 brief)

Same file names. Scripts (scratchpad `tf3/`): `geom3.py` (patches the v2 geometry), `paths3.py`, `redraw3.py`, `noise_extract.js`, `noise3.py`. Clinic layout not reworked (waits for J.B.'s Z8000 pages).

**1. DC staff entrance of its own**
- E06B: exterior door on the alley side (v1 lot line) → staff vestibule 5.6 m² → portal 5.9 m² → secure corridor; guard point 6.7 m² at the vestibule. Old portal and guard room off the lobby removed.
- V339: exterior door on the north side yard → vestibule 7.2 m² → portal 4.8 m² → service corridor; guard point 7.5 m² beside the dock. The south side yard was tried first: City LiDAR grade 2.4–2.9 m there, 2.1–2.6 m below the 5.0 m slab (our arithmetic). North side: 4.8–5.2 m, step-free (datum ?). DC break room moved into the spare ground floor (24 m², off the secure corridor).
- Sources (federal benchmarks, not binding): reception zone at the entry (arch_acc_gcpsg015RZ); PZ → OZ through an RZ (arch_sec_gcpsg014 6.7). Sizes ? (no source).
- Shared lobby now serves public rooms only. NBC 3.4.4.2: no storey-2 exit leads through the lobby; no F-2 room opens onto it ((2)(c) met). The lobby is not counted as an exit (our reading).
- Vestibule + guard point need one door: 12.2 / 14.7 m² ≤ 200 m², 7.1 m ≤ 25 m (3.3.1.5.(1)(d)).
- Freed space: E06B old guard room → programs mechanical room; old portal → first aid. V339 old guard room + refuge plant → programs mechanical room; old portal → public janitor.
- E06B warming shelter rearranged at the north end: 56.3 m² (≥ 56).

**2. Grid and services**
- Column grid on every storey, light. **Drawing choice, ?**: no data-hall span or bay in the register. burlingtonPlans2026, arch_dc_missSitePlan, arch_dc_hkTpb480/510 and FM 5-32 give floor areas and heights, not spans. Burlington and Mississauga PDFs blocked here (403); not worked around.
- Bays drawn: E06B hub 7.3 × 7.9 m, data centre 9.7 × 7.9 m; V339 9.5 × 7.7 m programs, 7.8 × 7.7 m data centre. No columns in stairs, lifts, shafts or the refuge main room.
- Programs mechanical room (HVAC, emergency panel): size ?. CSA Z317.2:24 paywalled (arch_adj_csaZ3172). 1 h drawn (3.6.2.1.(1), (6); drawing choice).
- Shafts (Table 3.6.3.1, 45 min with 1 h floors): E06B DC riser, storeys 1–2. V339 programs shaft, storeys 1–2 (new); DC riser, storeys 1–3 (new; hall corner, hall still 474 ≥ 472.5 m² a storey).
- Ducts (drawing choice) run from the mechanical room along the corridors. Damper symbol where a duct crosses a rated separation:
  - E06B: 3 crossings, 1 h, all combination smoke/fire (3.1.8.7.(1), (2)(c)).
  - V339: 4 crossings (1 h, 45 min): 3 smoke/fire, 1 fire.
  - None crosses into the data centre (FM 5-32 2.6.6.2.2: separate air paths). DC penetrations firestopped (3.1.9.1).

**3. Noise re-run** (tool method, engine.js noiseCheck; receivers and limits read from the tool, 4 Nov; our arithmetic)
- Lp = Lw − 20 log r − 8; r ≥ 5 m from the chiller group centre (noise_level).
- Lw 102.8 / 106.1 dBA a unit, quieter / standard rating (vertivAFC). Night limit governs.
- Options tried in the tool's order: low-noise chillers (traneRTAF, maker claim); NSW screen (arch_nz_nswDcNoise, arch_nz_fhwaNBDH); both.
- Result: **none is enough on either lot.** Low-noise units take only 2.6–6 dB. The screen fails NSW's 20 m rule for the far receivers.
- Mitigation used: **rooftop plant room** around the chillers, −25 dB (NSW 2021 s. 4.3, Table 4-5). Its walls are the units' box + 2.1 m maker wall clearance (drawing choice). Height about 3.9 m (drawing choice): below the BE 16.0 m and I-3 18.3 m heights.

| | E06B (5 chillers, hub roof 6.0 m; Lw 109.8–113.1) | V339 (3 chillers, clinic roof 12.0 m; Lw 107.6–110.9) |
|---|---|---|
| Worst, no mitigation | 62.6–65.9 dBA at 8065 Cedric Mah Rd NW (BRH), 91 m, limit 50 (s. 20(1)); 73.1 at a no-record building, 40 m (50 ?) | 71.5–74.8 at 336 1st Ave E (IC-3), 25 m, limit 65 (s. 2.3(b)(ii)) |
| With plant room | 37.6–48.1 ≤ limits | 46.5–49.8 ≤ 65 |
| Nearest residential | 8065 Cedric Mah Rd NW, 91 m: 37.6–40.9 ≤ 50 | 455 Great Northern Way (CD-1, quiet), 154 m: 30.8–34.1 ≤ 55 (without: 55.8–59.1, over) |
| At own lot lines, with plant room | street 53.0–56.3 (15.5 m); side (v0) 55.8–59.1 (11.2 m); alley side 40.2–46.7; rear 41.3–44.7. Neighbours BE: 60 | street 60.2–63.5 (5.2 m); south side 48.5–51.8; north side 46.3–49.6; rear 34.4–41.9. Neighbours I-3 / IC-3: 65 |
| Flag | no-record building across the street: 44.8–48.1 at its outline vs 50 if residential (property line ?) | — |

- Not modelled: generators (testing) and the programs mechanical room (no sound power on file ?). Plant-room airflow through louvres needs the maker's approval (?).
- Compliance list: "Noise at the lot lines" → pass (with the plant room). New "?" rows: mitigation details, generator and programs plant noise.

**4. Re-check** (0.25 m grid, along the path, our arithmetic)

| | E06B | V339 |
|---|---|---|
| Connected | 71 rooms, 2 storeys: all | 72 rooms, 3 storeys: all |
| Worst travel | L1 44.7 m (DC lockers → S1, unchanged); L2 38.9 m | L1 24.0; L2 31.1; L3 31.2 m |
| Two exits | clinic 4, refuge 6, lobby 2, DC 8; L2 DC 2: all ≥ half diagonal | refuge 7, lobby 2, DC 7; L2 clinic 2, DC 2; L3 DC 2 |
| Reception zone | 1 exterior door, 7.1 m | 1 exterior door, 7.1 m |

- New rows: DC staff entrance; Reception-zone rooms, one door; Programs mechanical room (?); Vertical service spaces; Ducts across rated separations; Structural grid (?); Noise mitigation used (?); Generator and programs plant noise (?). Lobby used as an exit now cites 3.4.4.2.(1), (2)(c).
- Results now: **E06B 36 pass, 18 to fix (all ?, no fail); V339 40 pass, 15 to fix (all ?, no fail).**
- Screens checked by eye at 2× (scratchpad `tf3/p3_E06B.png`, `tf3/p3_V339.png`). 0 leader crossings (script).
- Fixed after looking: rooftop plant room drawn as a rectangle (the convex hull read as a slanted wall); travel label kept on one line; damper wording.
- Section not redrawn for the rooftop plant room (height ?).

## Check 2 fixes (4 Nov 2026, testfit_check2.md)

Same file names. Geometry patch at the end of `tf3/geom3.py`; plant total in `tf/redraw2.py`; figures in `tf/content.py`. Re-run `tf3/go3.sh`. Pre-fix copies: `tf3/*_pre_chk2.*` (scratchpad).

- **E06B transformer fence:** pads moved 0.6 m toward the building. The fence was 0.39 m past the west lot line; it is now 0.21 m inside, still 1.5 m clear of the pads.
  - Pads to the building: 14.1 → **13.5 m** (≥ 6.0 m, EPCOR 6.4). Fuel truck to the transformers: 7.9 → **7.3 m** (≥ 6 m, 4.11.3.2).
- **E06B FAR:** 4,357 → **4,407 m²** (2,808 + 1,598 drawn), 1.03 ≤ 1.6. Still passes.
- **V339 north side yard:** north wall pulled back 0.25 m (v 15.4 → 15.15) on all storeys. The building is now inside the 7.6 m yard line along its whole length.
  - Stairs S1 and S4, lift E1 and the two loading bays keep their size and move 0.25 m south.
  - The row behind them loses 0.25 m: public corridor and storey-2 lift lobby 2.15 m (≥ 2.0), lift E2 (size ?), WC, MMRs, janitor. Shipping and storage also lose 0.25 m. Column grid respaced (7.65 m bays).
  - Results: FSR **3,320 m²**, 0.74; hub **1,159 m²** (1,168 − 9.5 m² lost from the lobby, waiting, corridors and janitor; our arithmetic); width **30.6 m**.
- **V339 re-check:** worst travel L1 24.0 · L2 30.9 · L3 30.9 m. Exits and separations unchanged (S1, S4 move with the wall). Rooms tile with no gaps or overlaps.
- **Plant group, both boards:** now includes the roof chillers, as the caption says. E06B 263 → **406 m²** (+5 chillers, 143 m²). V339 166 → **252 m²** (+3 chillers, 86 m²).
- Pass/fix counts unchanged: E06B 36 / 18, V339 40 / 15.
- Screens checked by eye: `tf3/p3_E06B.png`, `tf3/p3_V339.png`. 0 leader crossings (script).

## Open questions for J.B.

- Pass 3: accept the rooftop plant rooms (−25 dB) or test fewer, quieter units or a yard position?
- Pass 3: a sourced data-hall span or bay (Burlington or Mississauga drawings, or the Z8000 pages): can you download them? Grid is a drawing choice until then.
- Pass 3: E06B mechanical room and janitor open onto the lobby (allowed, since it is not an exit). Keep, or give them a hub service corridor?

- E06B storey 1: worst travel 44.7 m of 45 m (DC lockers behind the portal). Accept, or give those rooms their own exit?
- Do the 6 m dead-end limits apply to corridors inside the secure line (E06B secure passage 12.0 m)?

- Refuge occupant load: design to the table load (233, 11 WCs) or show 50 and post a sign (3 WCs)?
- Data hall occupant load: designed staff load (≤10, our reading) or the 4.60 m² "process" row (508 persons)?
- E06B: are refuge and shelter one Community Service use (374 m² ≤ 500) or two?
- E06B: clinic waiting and offices drawn at 80 + 19.6 m² keep it under 500 m². Accept, or use the built 604 m² and the variance?
- V339: confirm the City LiDAR's vertical datum against the GVRD datum of the 4.6 m FCL (City LiDAR readme not reachable from here).
- V339: ground slab at 5.0 m (drawing choice) leaves the lobby door 0.7 m above it. Ramp in the lobby, regrade the frontage, or a higher slab (5.3 m still ≤ 18.3 m: 18.27 m)?
- Hub storey height in Edmonton: no source; drawn 6.0 m to line up with the hall. Keep?
- Noise: re-run the tool's noise check on these yard layouts before the next typology?

## Tool notes (no code changed)

- The Ratios split counts the hall, UPS and battery equipment only; the full data centre is 1.4–2.2 × that floor area here.
- V339: the 61 m maximum depth is applied as a box centred on the lot, 24 m back from the street. It is a maximum, not a position (our reading).
- Chillers are placed on the hall roof; FM 5-32 2.2.1.6 (insurer) keeps liquid piping off the hall. Both boards put them on the program roof.
- E06B: one tool placement draws 2 of 4 generators at the street front; the rear yard holds all 4 in this layout.
- The notes' "parked fuel truck 15 m from buildings" is NFC 4.11.2.4 for an unattended truck (>1 h); attended unloading is 4.11.3.2 (6 m from ignition sources).

## Licensing

- E06B lot outline is Altalis (EPSB GIS, academic use only). The E06B board must not be published or shared outside the course.

Check 1 only (passes 2 and 3). Not yet checked by a second agent.
