# The data centre's own spaces (Architecture-mode massing)

Research 2 Nov 2026, per BRIEF_dc_rooms.md and BRIEF.md. New ids (`arch_dc_*`) in dc_rooms_sources.json; all other ids are already in the register or in the research_arch_v1 source files.

Read first: register quantities hall_area, hall_layout, electrical_room, component_space, rack_count, ups_modules, battery_cabinets, room_cooling_units, cooling_units, generator_sets, hr_plant_room, security_layers, transformers, fuel_on_site, fire_protection; files access_control, security_more, security_perimeter, handover, spatial_rules, adj_service, uploads_2026_11_02; sources/16. **There is no `loading` quantity in the register** (loading sits inside component_space and in vanParking5 / edmZB580).

Codes: N = NBC 2020, B = BCBC 2024, V = VBBL 2025, A = NBC(AE) 2023 (local texts). "Our reading" / "our arithmetic" are marked. "?" = not found. FM sheets are **insurer guidance**, not law. NFPA 75, 76 and 855 are **not cited by any of the six Canadian codes** (our search of the local texts; nfpa855tia); they are US benchmarks only.

Kind: rule · gov. guide · design guide · peer-reviewed · insurer guide · standard (US) · operator claim · maker claim · site fact · our reading.

---

## 1. Data hall (per floor)

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Size per MW of IT | 290–630 m² of hall per MW (5 built Canadian halls); ≈250 high density | it_load_outside | register coef | operator claim | 50 |
| Size per rack | 2.32 m² (25 ft²) a rack with its aisles, as drawn; 2.6 m² (28 ft²) a rack as a room-area estimate | schneiderWP46; arch_dc_schneiderWP144 | WP 46 p. 2; WP 144 pp. 4–5 | maker claim | 45 |
| Racks | P_IT ÷ 7.1–8 kW | rack_count | register | industry survey | 60 |
| Floor | not at the ground floor in Vancouver I-2, I-3, FC-2 (entrances only) | van_zdb_i2; van_zdb_i3; van_zdb_fc2 | hall_area coef | rule | 85 |
| Floor-to-floor | ≥6.0 m ground / ≥4.0 m above (Vancouver I-3 zoning minimum, not a hall height) | van_zdb_i3 | envelope coef | rule | 85 |
| Floor-to-floor, built | ≈6.0 m (Burlington, 2 storeys); 5.5–6.0 m (two Hong Kong filings) | burlingtonPlans2026; arch_dc_hkTpb480; arch_dc_hkTpb510 | sources/16 §2.13, addendum | filed plans | 60 |
| Clear height | room 4 m + raised floor 0.6–0.8 m (prototype); raised floor ≥0.61 m (FEMP); VAN3 457 mm raised floor | lbnl_proto2021; femp2024dc; tourVAN3 | Tables 3–4; sources/16 S3; tour | peer-reviewed; gov. guide; site fact | 60 |
| Ceiling, upper limit | "Limit the maximum height of ceilings in data centers to 30 ft (9 m)" | fmDS0532 | 2.2.5.2, p. 6 | insurer guide | 90 |
| Minimum clear height (TIA-942) | ? paywalled | — | — | — | 0 |
| Fire separation from other occupancies | ≥1 h "commensurate with the exposure" | nfpa75_2024 | 6.1.3.2 | standard (US) | 80 |
| Fire separation | 1 h walls; 2 h between halls; slab to slab | fmDS0532 | 2.2.4.1, 2.2.4.1.1, 2.2.4.3, p. 5–6 | insurer guide | 90 |
| Fire separation (code) | depends on the hall's class, which no code names. If F-2: 2 h to A, B, C; none to D, E, F-3 | arch_pub_nbc3131full; arch_nbcDefF | N/B/V/A Table 3.1.3.1 | rule | 70 |
| Keep from | "hazardous processes" above, below or beside | nfpa75_2024 | 6.3.1 | standard (US) | 80 |
| Keep from | cooling or domestic liquid piping above | fmDS0532 | 2.2.1.6 | insurer guide | 90 |
| Keep from | packing, cardboard; de-box outside the hall | arch_dc_fm0532rooms | 2.3.1.1.1–2, p. 7 | insurer guide | 90 |
| Only | "Only ITE and support equipment" in the room | nfpa75_2024 | 7.1.1 | standard (US) | 80 |
| Secure side | inside; Operations Zone or higher; slab-to-slab walls | arch_sec_gcpsg015AppC | App. C 1.1, 2 | gov. guide | 85 |

## 2. Electrical room (UPS)

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Size | by count: UPS modules (1,000 kW frame 3.6 × 0.9 m) + 1.5 m working space | ups_modules; electrical_room; cec2024 | register; CEC 2-310 2) | maker claim; rule | 70 |
| Per MW (equipment only) | 2.4–3.3 m² | component_space | register coef | maker claim | 50 |
| Floor | first hall floor (tool choice, not a rule) | hall_layout | register formula | our reading | 40 |
| Fire separation | 1 h service room (drawn always; decision 30 Oct) | electrical_room; nbc2020_v1 | N 3.6.2.1.(6), (7) | rule | 80 |
| Layout | centralized (battery or electrical rooms) or one UPS per hall | arch_dc_fm0532rooms | 3.5.2.1, p. 50 | insurer guide | 85 |
| Ride-through | UPS carries load "typically for 10-15 minutes" | arch_dc_fm0532rooms | 3.5.2.1, p. 50 | insurer guide | 80 |
| Next to | hall it feeds (short runs) ? no source | — | — | — | 0 |
| Secure side | inside | tourVAN3 | 400 A boxes on the hall wall | site fact | 40 |

## 3. Battery room

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Li-ion size | 1.0–1.8 m² per MW for ≈5 min | component_space; battery_cabinets | register | maker claim | 50 |
| VRLA size | ≈3.3–6.0 m² per MW (Li-ion range ÷ 0.3, from "Saves space 70%") | vertivHPL | sources/16 S10 | maker claim + our arithmetic | 30 |
| VRLA room | "minimum one-hour fire-rated room"; ventilation ≥5.1 L/s per m², suction at roof | arch_up_fm0528 | 2.2.4; 2.3.2.3 A | insurer guide | 90 |
| Li-ion room | FM 5-33 (not uploaded) ? | arch_up_fm0528 | 1.0 | — | 0 |
| HVAC | "separate from the equipment areas" | arch_up_fm0528 | 2.3.2.1.1 A | insurer guide | 90 |
| Li-ion spacing | groups ≤50 kWh, 0.9 m apart and from walls; Li-ion UPS not exempt | nfpa855_2026 | 9.5.1.1–9.5.1.2; 9.2.1.1(3) | standard (US) | 75 |
| Cabinets | 0.914 m clear in front, 25 mm to wall | electrical_room | Vertiv Li5 manual | maker claim | 60 |
| Canadian code | no battery-room clause; hydrogen hook only (3.3.1.21) | adj_service.md | §3 | rule (absence) | 80 |
| Floor | above 500-year flood + 0.3–0.6 m | arch_up_fm0528 | 2.2.3 | insurer guide | 90 |
| Secure side | inside | — | ? | — | 0 |

## 4. MV switchgear / main electrical room

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Size per MW | ? none public | sources/16 #3 | — | — | 0 |
| Built (combined) | "Electrical/Network Room" 115–128 m² per floor | burlingtonPlans2026 | sources/16 C5 | filed plans | 50 |
| Fire separation | separate from generators and fuel, "minimum 1-hour"; liquid-tight if adjacent | arch_up_fm0523 | 2.2.12 | insurer guide | 90 |
| Fire separation (code) | 1 h if the electrical code puts it in a service room; vault 3 h (2 h sprinklered) | arch_nbc3628 | N/B/V/A 3.6.2.1.(6), 3.6.2.7.(2) | rule | 85 |
| Keep from | not directly under a required exit (transformers) | arch_nbc3628 | 3.6.2.2 | rule | 85 |
| Working space | 1 m; 1.5 m ≥1200 A; 0.76 m round a withdrawn breaker (US) | cec2024; sources/16 S8 | CEC 2-308, 2-310; UFC 3-540-01 2-5.4.3 | rule; US rule | 70 |
| Floor | below flood construction level only if protected (Vancouver) | adj_service.md | V Div. C 2.2.10.3.(2) | rule | 85 |
| Next to | transformer and utility entry ? (no source) | — | — | — | 0 |

## 5. Transformer (pad or vault)

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Count | ⌈facility peak ÷ 2,500 kVA⌉ + spares | transformers | register | maker claim | 50 |
| Unit | 2.26 × 2.39 m (5/15 kV) or 2.63 × 2.49 m (25/35 kV) | eatonCA022021 | register | maker claim | 60 |
| BC Hydro pad | ≥1 m from building; 3 m clear in front; 1 m sides and between | bchES54F | F0-02, F3-05 | utility rule | 85 |
| EPCOR pad | up to 6.0 m from buildings; registered right-of-way; truck access | epcor_ccg | 6.4(b), (e), (g) | utility rule | 85 |
| Vancouver (111 E 5th) | pad-mount, low-profile transformers and kiosks "located on private property" | arch_dc_rts19744cond | cond. 1.16, p. 18 | gov. report | 85 |
| Vault (indoor) | 3 h (2 h sprinklered), masonry/concrete, 100 mm sill, own ventilation | arch_nbc3628; adj_service.md | 3.6.2.7 | rule | 85 |
| Location | yard (pad) or vault; customer-owned at primary service | bchTariff2026; bch_primary | T&C 3.13 | utility rule | 80 |
| Secure side | utility needs access (EPCOR right-of-way); easements limit access control | epcor_ccg; arch_per_gcpsg010 | 6.4(e); 7.3.1 | utility rule; gov. guide | 70 |

## 6. Generators and fuel

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Count | ⌈P_IT × PUE ÷ 2,000 kW⌉ + N+1 | generator_sets | register | maker claim | 50 |
| Per MW (open set) | ≈6.4 m² (Cat 3516C 6.80 × 2.34 m) | cat3516c | sources/16 §2.4 | maker claim | 50 |
| Fuel | ≈6.3 m³ per MW per 24 h; tank room 550 mm clear | fuel_on_site; nfc2020_4313 | NFC 4.3.14 | rule; maker claim | 70 |
| Location order | separate building → yard → ground floor; never roof or basement; no diesel tanks inside | fmDS0532 | 2.6.4.3, 2.6.4.3.1, 2.6.4.4.1.1, p. 26–27 | insurer guide | 90 |
| Room at grade | ≥1 h room on an outside wall, openings reachable by firefighters | arch_up_fm0523 | 2.2.3 A | insurer guide | 90 |
| Room (code) | life-safety sets 2 h, room for that equipment only; IT sets 1 h (3.6.2.1.(5), our reading) | arch_nbc3628; van_genroom | 3.6.2.8.(1); 3.6.2.1.(5) | rule | 80 |
| Fuel room | 2 h; used for no other purpose | nfc2020_4313 | NFC 4.3.14.1–2 | rule | 90 |
| Exhaust | 3 m from intakes, doors, windows, occupiable outdoor space (if 6.3.3.1.(2) applies ?) | arch_nbc6331 | 6.3.3.1.(2) | rule | 55 |
| Keep from | Tier 0/1 engines ≥100 m from hospital, elementary school, day care, community care | arch_mv1329 | s. 57 | rule (Metro Vancouver) | 90 |
| Conflict | separate generator building = second principal building (one per site) | arch_up_vanZDB10 | 10.34.1 | rule | 90 |
| Secure side | inside the fence (tool preset holds yard plant) | arch_secure_line | register | our reading | 40 |

## 7. Chillers, dry coolers, cooling towers

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Size per MW of heat | chillers 16.4–30.5; dry coolers 19.5–30.5; towers 4.7–16.5 m² (equipment only) | component_space; cooling_units | register | maker claim | 50 |
| Spacing (one maker) | 1.8 m to walls; 3 m between units | arch_yorkClear | Insights 10 Jun 2024 | maker claim | 50 |
| Roof | Vancouver: mechanical equipment may exceed height at the Director's discretion | arch_up_vanZDB10 | 10.1.1(b) | rule | 90 |
| Roof | Edmonton: no height limit for mechanical penthouses, ventilating equipment | edm_bl20001 | s. 5.70(1.9) | rule | 85 |
| Screening | Edmonton, non-industrial development: mechanical equipment concealed or inside the building (industrial: zone rules) | arch_dc_ezb5120 | 5.120 1.1.2 | rule | 85 |
| Evaporative units | 7.6 m from intakes; 3 m from doors, windows, occupiable outdoor space | arch_nbc63215 | 6.3.2.15.(5) | rule | 85 |
| Towers, Vancouver | operating permit, monthly Legionella tests | adj_service.md | V Book II 2.2.11.6 | rule | 85 |
| Indoor chiller room | CSA B52 (paywalled); 1 h if storey unsprinklered | adj_service.md | 6.2.1.5; 3.6.2.1.(7) | rule | 70 |
| Roof or yard | ? no rule prefers one | — | — | — | 0 |

## 8. Telecom entrance room and meet-me room

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Size | ? TIA-942 paywalled | — | — | — | 0 |
| Built | combined "Electrical/Network Room" 115–128 m² | burlingtonPlans2026 | sources/16 C5 | filed plans | 50 |
| Count | two POP + meet-me rooms (redundancy), fibre from the street | tourVAN3 | tour | site fact | 40 |
| Fire separation | "network/fiber optic rooms": 1 h | fmDS0532 | 2.2.4.1, p. 5 | insurer guide | 90 |
| Room rules (office bldgs, benchmark) | 2.4 × 3.0 m typical; ≥2.59 m clear; no pipes, sinks, ducts or building power; no windows | arch_dc_ualbertaTelecom | §4, §8.3 | design guide (institution) | 50 |
| Conduit entry | ≥1 × 110 mm + 1 × 63 mm | arch_dc_ualbertaTelecom | §8.1 | design guide | 50 |
| Secure side | inside, "behind scanners" | tourVAN3 | tour | site fact | 40 |

## 9. Fire suppression (valve room, clean-agent cylinders)

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Hall system, built | pre-action dry pipe (VAN1); pre-action with N2 (VAN4); VESDA, nitrogen, zoned sprinklers (VAN3) | fire_protection | register | operator claim; site fact | 50 |
| Clean agent standard | NFC 2020 does not list NFPA 2001; NFC(AE) does | adj_service.md | NFC 2.1.3.5.(3)–(4) | rule | 85 |
| Cylinders | IG-541 80 L: 0.267 m dia × 1.88 m; 140 L: 0.36 × 1.865 m | arch_dc_kiddeIG541 | KDS 38-41XXX1-541 | maker claim | 45 |
| Reserve | permanently connected reserve cylinders | arch_dc_fm0532rooms | 2.4.3.2.3.7, p. 19 | insurer guide | 85 |
| Cylinders per m³ | ? NFPA 2001 paywalled | — | — | — | 0 |
| Valve / riser room size | ? NFPA 13 paywalled | — | — | — | 0 |
| Near | sprinkler FDC within 5 m of the principal entrance, visible from street (Vancouver) | arch_dc_vbblFDC | V 3.2.5.15.(2) | rule | 90 |
| Fire pump room | service room, 1 h if storey unsprinklered | adj_service.md | 3.6.2.1.(7) | rule | 70 |

## 10. Storage and staging / build room

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Why a room | "De-box equipment outside the data processing equipment rooms" | arch_dc_fm0532rooms | 2.3.1.1.2, p. 7 | insurer guide | 90 |
| Protection | storage per FM 8-9; stored Li-ion per FM 7-112 | arch_dc_fm0532rooms | 2.4.3.10, p. 23 | insurer guide | 85 |
| Built | storage 40 + 18.6 m² | burlingtonPlans2026 | register | filed plans | 50 |
| Built | client-delivery room off the loading bay, freight elevator | tourVAN3 | tour | site fact | 40 |
| Size per MW | ? | — | — | — | 0 |
| Next to | loading (our reading of the de-box rule + VAN3) | — | — | our reading | 50 |
| Secure side | inside (VAN3: through the back hallway) | tourVAN3 | tour | site fact | 40 |

## 11. Shipping and receiving (loading)

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Count, Vancouver | Class B: 1 for first 465 m², +1 next 1,860 m², +1 per 2,325 m²; 10.2 × 3.4 × 3.8 m | vanParking5 | s. 5.2.5 | rule | 80 |
| Count, Edmonton | <2,500 m² 0; 2,500–7,500 m² 1; >7,500 m² 2; 9.0 × 3.0 m, 4.0 m clear | edmZB580; arch_sec_edm580 | s. 5.80 Table 7.2 | rule | 85 |
| Built | 2 docks (VAN3); "LOADING / GARBAGE ROOM" 45 m² (Burlington); 4 loading for 21,244 m² (Mississauga) | tourVAN3; burlingtonPlans2026; arch_dc_missSitePlan | — | site fact; filed plans | 50 |
| Keep from | intakes 7.6 m from a truck dock | arch_nbc6329 | Table 6.3.2.9 | rule | 90 |
| Keep from | not between building and street (Edmonton BE) | arch_ezbLoad | BE 5.8 | rule | 85 |
| Keep from | restricted areas: dock not linked to them | arch_per_gcpsg010 | 7.4.3 | gov. guide | 70 |
| Garbage | refuse room 1 h and sprinklered | adj_service.md | 3.6.2.5.(1) | rule | 85 |
| Secure side | outside the hall's zone; inside the fence (tool preset) | arch_per_gcpsg010; arch_secure_line | 7.4.3 | gov. guide; our reading | 60 |

## 12. Security control room and guard room

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Size | ? no source | access_control.md | §4 | — | 0 |
| Guard post | Reception Zone at the entry | arch_acc_gcpsg015RZ | 5.3.2 | gov. guide | 85 |
| SOC | Security Zone nested in an Operations Zone; six-sided brute-force protection; "out of sight but within audible range of the public" | arch_sec2_gcpsg003 | 4.3, 6.6 | gov. guide | 80 |
| Control room | glazed, "should permit observation of the servers" | arch_acc_gcpsg015RZ | App. C 2.3 | gov. guide | 85 |
| Alarms | HVAC alarms at a "constantly attended location" | arch_dc_fm0532rooms | 2.6.6.4.2, p. 28 | insurer guide | 85 |
| Built | vestibule guard room, "bullet proof glass", ID slot | tourVAN3 | tour | site fact | 40 |
| Staffing | 24/7 guards at all four operators read; no rule | security_perimeter.md | §1 | operator claim | 60 |

## 13. Entry portals (mantraps)

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Size | 1.0–1.8 m round or square, 2.2 m high | arch_acc_boonSolo; arch_acc_gunneboHiSec | product pages | maker claim | 65 |
| Egress | swing door beside it serving egress | arch_acc_nbcRevolving; arch_acc_nbcDoorRelease | 3.4.6.15, 3.4.6.16.(5) | rule + our reading | 75 |
| Accessible | 850 mm door or wheelchair-size portal | arch_acc_nbcAccessible | 3.8.3.6.(2) | rule + our reading | 70 |
| Where | between lobby and hall side (VAN3); each zone line | tourVAN3; arch_sec_gcpsg015AppC | 5.3, 6.1 | site fact; gov. guide | 60 |

## 14. Offices and NOC

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Built | open office 100 m²; conference 90 m²; lobby 70 m² (Burlington); office 603 m² (DUB13, Ireland) | burlingtonPlans2026; abp317446 | sources/16 C5, C12 | filed plans | 50 |
| Share (US) | 60,000 ft² offices in up to 1,188,143 ft² ≈ 5.0 % (our arithmetic) | arch_dc_pwcVillagePlace | p. 2 | gov. report | 60 |
| Cap, Vancouver | I-2: general office ≤ greater of 235 m² or 33.3 % of GFA; I-3: conditional office ≤33 % | van_zdb_i2; van_zdb_i3 | 3.1.1 | rule | 85 |
| Separation | D (office) to F-2: none | arch_hsg_nbc3131D | Table 3.1.3.1 | rule | 80 |
| Secure side | outside the portal (VAN3: client offices, boardroom) | tourVAN3 | tour | site fact | 40 |
| NOC size | ? | — | — | — | 0 |

## 15. Break room

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Code | none | security_perimeter.md | §1 staff facilities | rule (absence) | 70 |
| Practice | rest area, kitchenette, lockers for 24 h SOC staff | arch_per_gcpsg003support | 6.2, 6.3 | gov. guide | 80 |
| Built | staff lounge 24 m² (Burlington); client kitchen (VAN3) | burlingtonPlans2026; tourVAN3 | sources/16 C5 | filed plans; site fact | 50 |
| Keep from | zone lines (no lure spaces across them) | arch_sec2_gcpsg014b | 6.2 | gov. guide | 80 |
| Secure side | outside (VAN3) | tourVAN3 | tour | site fact | 40 |

## 16. Staff washrooms and showers

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| WCs | industrial, per sex: 1–10 → 1, 11–25 → 2, 26–50 → 3; count staff only where intermittently occupied | arch_per_nbcWC | 3.7.2.1.(2); Table 3.7.2.2.-C | rule | 90 |
| One shared WC | occupant load ≤10 (V: ≤25) | arch_per_nbcWC | 3.7.2.2.(2) | rule | 90 |
| Showers | not required; if provided, one accessible stall per group, 1,500 × 900 mm; universal shower room for employee common use | arch_dc_nbcJanitorShower | N 3.8.2.8.(12)–(13), 3.8.3.17 | rule | 85 |
| Distance (BC) | within 60 m of the work area, ≤1 floor away | arch_per_ccohsSanitation | OHS Reg 4.85 (summary) | gov. summary | 65 |
| Staff per MW | ≈1 per MW (≈29 on site at once, 28 MW, UK) | hillingdon_up4 | sources/16 C10 | applicant claim | 45 |
| Staff per area | ≈1 full-time worker per 5,000 ft² (≈465 m²) | jlarc2024 | Rpt 598 | operator claim (relayed by gov.) | 50 |
| Staff, other | ≈40 per 24 h (15,274 m², Ireland); >45 jobs (Ireland); 300 jobs, 1.19 M ft² (US) | abp317802; abp317446; arch_dc_pwcVillagePlace | — | applicant claims | 45 |
| Built | showers and lockers before the portal (VAN3) | tourVAN3 | tour | site fact | 40 |

## 17. Janitor

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Separation | 1 h (45 min with lighter floors); none if floor area sprinklered | arch_dc_nbcJanitorShower | N/V 3.3.1.22 | rule | 90 |
| Size | ? | — | — | — | 0 |
| Exits | may not open directly into an exit | adj_service.md | 3.4.4.4.(8) | rule | 80 |

## 18. Heat-recovery / energy transfer room

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Heat pumps | 5.6–15.1 m² per MW heat (equipment); 1.1 m aisles | component_space; hr_plant_room | register | maker claim | 50 |
| ETS, Vancouver | ≥6 × 3 m (<13,940 m²) / 6 × 4 m; 2.7 m headroom; P1 on the perimeter | neuETS; arch_ho_vanNEUconn2020 | Table 2, s. 6.1 | gov. guide | 85 |
| 111 E 5th | ETS on "the highest below-grade level, located along an exterior wall"; dedicated NEU room(s) for heat recovery | arch_dc_rts19744cond | cond. 1.13(a)–(b), pp. 16–17 | gov. report | 85 |
| ETS, Blatchford | 27–55 m² by units; 2 h separation; card reader for the utility | arch_ho_breMultiUnit2025 | Table 9; 6.4.2; 6.4.5 | design guide (utility) | 85 |
| Refrigeration | CSA B52 (paywalled); TSBC registration ≥ exemption | hr_plant_room | register | rule | 70 |
| Secure side | on the line: data-centre side door + utility door (our reading; no source) | handover.md | §4 | our reading | 40 |

---

## 19. Support spaces as a share of the building

Support = gross area minus data hall. Definitions differ (raised floor, IT space, "data-centre space"), and plant may sit inside or in a yard.

| case | hall | gross | hall share | support share (our arithmetic) | source id | kind | conf |
|---|---|---|---|---|---|---|---|
| Burlington ON (filed plans, 2 storeys) | 3,710 m² | 5,163 m² stated / ≈7,770 m² floor sum | 72 % / 48 % | 28–52 % | burlingtonPlans2026 | filed plans (conflict) | 50 |
| eStruxture CAL-1, Calgary | 33,000–33,700 ft² IT | 65,000 ft² | 51–52 % | 48–49 % | arch_dc_estruxCal1 | operator claim | 45 |
| Cologix VAN4, Vancouver | 40,000 ft² | 68,000 ft² (web) | 59 % | 41 % | cologixVAN4_2026; cologixVAN4web | operator claim (areas conflict) | 40 |
| eStruxture VAN-1, Vancouver | 7,500 ft² | 10,000 ft² | 75 % | 25 % | estruxtureVAN1ds | operator claim | 45 |
| Qu EDM1, Edmonton | 15,712 ft² raised floor | 18,000 ft² | 87 % | 13 % | quEDM1_2026 | operator claim | 45 |
| EdgeConneX Lucan, Ireland (benchmark; plant in yard) | 12,859 m² | 15,274 m² | 84 % | 16 % | abp317802 | filed (inspector) | 50 |
| Village Place, Virginia (US staff report) | — | 1,188,143 ft² | ? | office alone 5.0 % | arch_dc_pwcVillagePlace | gov. report | 55 |

**Range:** support 13–52 % (one filed Canadian plan set, four Canadian operator sheets). Median of the six whole-building cases ≈27–33 %, depending on which Burlington GFA is used (our arithmetic). Not a rule.

Checked, no hall/support split: Mississauga Prologis plans (21,244 m², 2 storeys), Walsh, Sequoia, Laurelwood (California CEC), CoreSite LA3 (Los Angeles), 111 E 5th (no floor plans filed: RTS 19744 p. 4).

---

## Gaps and paywalled

- **Paywalled (not read):** TIA-942 (hall height, entrance room size, rooms list), BICSI 002, NFPA 13 (valve rooms), NFPA 2001 (cylinders per m³), NFPA 76, CSA B52, CSA C22.1 vault and switchgear-room rules, FM 5-19, FM 5-33 (Li-ion). Logged in checks/paywalled_standards.md except BICSI 002, NFPA 76, FM 5-19, FM 5-33 (to add).
- **No source found:** m² per MW for MV switchgear, telecom rooms, storage/staging, security and NOC rooms; any rule preferring roof or yard for heat rejection; whether IT sets are life-safety (3.6.2.8); the hall's major occupancy.
- **Blocked this session:** eStruxture CAL-1 sheet and Hong Kong TPB papers (provenance refused); used from sources/16 (14–15 Oct reading), not re-read.
- **No US filed plan set** with a hall/support split was found; the share rests on Burlington plus operator sheets.
- **Staff per MW:** only one stated pair (Ark UP4, applicant). No Canadian figure.
- VAN3 layout is one visit (site fact, conf 40).
