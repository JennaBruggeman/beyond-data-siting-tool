# Typology spec: Emergency hub

Status: **Passed 9 Nov 2026 (J.B., final gate).** Parts 1–3 final (J.B., 8 Nov; later calls 8–9 Nov written in, including the final-gate decisions on Q5, Q24, Q25). Parts 4–6 and 8 complete. Re-planning the Emergency hub stopped at J.B.'s code level (9 Nov, rule header in Part 3). Any change to parts 1–3 goes to J.B. first.

Format for all eight typology specs (MASTER_PLAN Phase B): one file `checks/specs/<typology>.md`, parts 1–8 in this order, tables where a part lists things.
- Every figure has a source id from `register/formula_register.json` or a named clause, or is marked **drawing choice** or **?**. "Our reading" marks an interpretation of a clause.
- **Codes:** Vancouver rules cite the **VBBL 2025**. Edmonton rules cite the **NBC 2023 (AE)**, the National Building Code – 2023 Alberta Edition, in force since 1 May 2024 (register `nbcAB2023`); where its text is not read, the NBC 2020 clause number is used and marked (?). Zoning: Vancouver Zoning and Development By-law (Z&D) and district schedules; Edmonton Zoning Bylaw 20001.
- **Room minimums** follow `eh/specs/room_minimums_rule_2026-11-08.md` (J.B., 8 Nov): the "Step" column names where each minimum comes from (1 code · 2 equipment + clearances · 3 guideline · 4 per-person rate × J.B.'s count · 5 precedent · 6 none, drawing choice).

## Known weaknesses (read first)
- **Room sizes:** most rooms are step 6 (no source, drawing choice). Clinic minimums are an Alberta guideline (step 3); CSA Z8000 and ANSI/TIA-942 are paywalled and unread.
- **Hall storey 6.0 m** carries every height and MW result and has no source (TIA-942 unread): drawing choice.
- **Edmonton:** the NBC 2023 (AE) text is read only where cited; BE general sections 5–7 not re-read for the hub.
- **Flood plain:** no rule read yet for transformer and generator pads below the FCL (Part 8).
- **Outdoor air intakes** are not drawn on any fit.
- **Chiller spacing:** Vertiv gives each unit's clear zones but no spacing between units; 3.0 m side to side and 4.2 m end to end are our reading. Drain, refrigerant-leak and MV/HV distances are open ("?") on every fit: drains are not drawn.
- **Edmonton cooling:** the Liebert AFC is outside Vertiv's stated range at Edmonton's −30 °C winter design temperature (NBC App. C, J.B.'s figure, not re-read here). SL-70790 p. 10 (vertivAFC_limits, read from J.B.'s screenshot): Table 1.1 ambient −28.9 to 45 °C, "min and max can vary by model"; with R1234ze not below −20 °C. The p. 10 chart starts lower only for free-cooling versions with R134a or R513A, at about −25 °C (read off the chart), not −28.9: the table and chart differ. On Edmonton fits it is a plant placeholder only ("?"); the cooling type is an Engineering question.
- **8238 Fraser St:** the reference is now 0.94 MW (two chillers; S2 moved, J.B. 8 Nov). The full-height board is out of date and kept only for comparison.
- **Test fits:** all eight drawn to the current rules; the last changes (9 Nov: Q21–Q22, data-centre loads, the 8980 storey-3 and truck-route fixes) were checked by a separate agent, and the fixes after that check are self-checked only. Margins under 0.5 m (or 5 %) are flagged "tight: check in design" on the boards, not re-planned (Part 4).
- **Final independent check** (9 Nov, fresh agent briefed from this text and the code-level rule; `eh/remeasure10/`): three big-move findings. Fixed: the 1330 2 h floor over the hub (board said none). Q24 and Q25 decided by J.B. at the final gate (9 Nov); the three parts 1–3 wording changes approved. Its tight findings are now on the boards. The fixes after it were self-checked only. Not covered by it: envelope figures (LiDAR, zoning), truck turning, noise, intakes, drains, refrigerant-leak and MV/HV distances.
- **Detailed design, not checked** (J.B., 9 Nov, code level): washroom fixture layouts, accessible stalls, lavatory clear floor and door swings (339's WC 2 rooms are 3.0 m deep and were not laid out); measurement-point refinements under 0.5 m: egress-door spacing edge to edge, stair discharges edge to edge, dead ends along the centreline, and "within 15 m of a street" taken from the door's near edge (339 S1: 14.9 m at the near edge, 15.3 m at the centre); finishes, hardware, signage, lighting, walkway fences and gates, air intake and exhaust placement.

---

## 1. Program and rooms

The hub = the data centre + public programs on its backup power. **Core = the refuge** (J.B., 8 Nov). The warming shelter stays with it. The clinic shrinks first, then drops.

Rank: 1 never drops; higher numbers drop first. A target can be larger than the minimum; fits shrink rooms toward the minimum before a room drops by rank.

### 1a. Public programs

**Minimum widths** (J.B., 8 Nov, `eh/specs/room_minimums_rule_2026-11-08.md`): every room has a minimum clear width as well as an area, so no room reaches its area by being long and thin. Same step ladder as areas; most widths are step 6 (drawing choice) until CSA Z8000, FGI and TIA-942 are read. Clear width = the widest place in the room (`eh/audit_rooms.py`). Re-run the audit after every fit.

| Room | Minimum | Min width (step) | Step | Target | Rank | Source / basis |
|---|---|---|---|---|---|---|
| Refuge main room | **50 people × 3.5 m² = 175 m²** (J.B., 8 Nov). On small lots the refuge and the merged day shelter may count together. | 4.0 m; parts under 2.4 m wide don't count toward the area (6) | 4 | 175 m² and up; grows first into spare floor at grade | 1 | arch_ahsReceptionCentres, arch_edmExtremeWeather (3.5 m² a person) |
| Refuge staff office (shared with shelter) | ? | 2.4 m (6) | 6 | 8 m² | 1 | arch_sup_eastglenRooms (analogy) |
| First aid | 9.3 m² ("should be at least") | 2.7 m (6) | 3 | 9.3–10 m² | 1 | WorkSafeBC, First aid facilities (guidance) |
| Entry vestibule, cot and supply storage, filtration plant, emergency panel | ? | cot storage 1.5 m (6); others ? | 6 | drawing choice | 1 | arch_hcCleanerAirSpaces (MERV 13 / CADR and emergency power required, no m²) |
| Washrooms, hub | by load: refuge + shelter area ÷ 0.75 m² a person, split equally between the sexes, rounded up (3.7.2.2.(1); J.B., 9 Nov); WCs a sex (M / F) per VBBL Table 3.7.2.2.-A (J.B., 8 Nov): 1–25 1/1 · 26–50 1/2 · 51–75 2/3 · 76–100 2/4 · 101–125 3/5 · 126–150 3/6 · 151–175 4/7 · 176–200 4/8 · 201–250 5/9 · 251–300 5/10 · 301–350 6/11 · 351–400 6/12 · over 400: 7 + 1 per 200 M, 13 + 1 per 100 F | 1.5 m a WC room (6; main chat's audit, not in J.B.'s list ?) | 1 | as the table gives | 1 | VBBL Table 3.7.2.2.-A; VBBL 3.1.17.1; NBC 2023 (AE) same rows (?) |
| Universal washroom | holds a 1,700 mm turning circle, WC with 900 × 1,500 mm transfer space, lavatory 800 × 1,350 mm clear: about 5–6 m² (our arithmetic) | holds the 1,700 mm circle clear of the WC and its 900 mm transfer space (1): 1.7 × 3.2 m at least (our arithmetic ?) | 1 | 6–10 m² | 1 | VBBL 3.8.3.13, 3.8.3.12.(1)(b), 3.8.3.16 |
| Universal shower | 1.5 × 1.8 m (2.7 m²) | 1.5 m (1) | 1 | 6 m² | 1 | VBBL 3.8.3.17.(1)(a)–(b) |
| Warming shelter, **day** | 16 guests × 3.5 m² = 56 m² rest area + shower (J.B., 8 Nov) | 4.0 m (6) | 4 | 91–105 m² gross; grows second into spare floor at grade | 2 | same rate (our extension); arch_pub_vanWarm2021, arch_sup_torRespite |
| Warming shelter, overnight | ? | 4.0 m (6) | 6 | 128–148 m² | 2 | **only where the zone lists the use, or as a flagged rezoning variant** (J.B., 8 Nov). Not in Vancouver I-2/I-3. |
| Clinic, full (13 exam rooms) | — | — | 3 | 484–604 m² | 3 | arch_hsg_vchUpccNV (built 604 m²); arch_hsg_abGFNA2021 |
| Clinic, reduced (5 exam rooms) | — | — | 3 | 236–306 m² | 3 | same room list, fewer exams (our arithmetic) |
| Clinic rooms | exam 12.0; procedure 15.5; stretcher bay 11.0; consult 12.0; medication 10.0; clean 11.0; soiled 13.5; housekeeping 7.0; staff lounge 0.5 m² a staff member | exam, consult, procedure 3.0 m (6; table + 0.9 m each side + counter, clearance rule second-hand ?); medication, clean, soiled, housekeeping 1.5 m (6; audit, not in J.B.'s list ?); staff lounge 2.4 m (6) | 3 | as minimum | 3 | arch_sup_abGFNARooms (guideline); CSA Z8000 unread |
| Clinic washrooms | WCs a sex per VBBL Table 3.7.2.2.-B: 1–25 persons 1 · 26–50 2 · over 50: 3 + 1 per extra 50 applied to the persons of each sex: clinic load (clinic area ÷ 9.3 m², our reading) split equally, rounded up; a part increment of 50 counts as a whole (J.B., 9 Nov, from Code's second read, register vbbl25_3722B). The test fits' clinics (32–39 persons, 16–20 a sex) need 1 a sex; they draw 3 + 1 universal (over-provided; trimming is detailed design). Two unisex rooms may serve a suite ≤ 200 m² with ≤ 60 persons (one universal). Clinic taken as Group D (our reading). | 1.5 m a WC room (6; audit, not in J.B.'s list ?); universal as above | 1 | as the table gives | 3 | VBBL Table 3.7.2.2.-B; 3.7.2.2.(15); 3.8.3.13 |
| Clinic grossing | departmental 1.44; building 1.20–1.26 | — | 3 | — | 3 | arch_hsg_abGFNA2021 |
| Ramp (where a step remains) | ≤ 1:12, ≥ 1,000 mm wide, 1,700 × 1,700 mm level areas top, bottom and at doors, 1,350 mm landing every ≤ 9 m and at turns, handrails 865–965 mm | 1,000 mm (1) | 1 | — | — | VBBL 3.8.3.5.(1) |

**Shared and how sharing reduces area**
- **Shelter with refuge:** the shelter shares WCs, office and first aid with the refuge. For day use it may merge into the refuge room. On small lots the merged room's people count toward the 50 (J.B., 8 Nov); elsewhere the room holds 50 + 16.
- **Shared lobby:** no sourced size (step 6, drawing choice; 20–64 m² in the fits). It serves every public program.
- **Loading:** one bay can serve the refuge and the data centre only by approval (Parking By-law 5.1.5). Without approval, each class counts separately.

**Spare floor** (J.B., 8 Nov). Floor the stack creates beyond the program goes, in order: (1) refuge, then warming shelter, at grade; (2) clinic, upstairs; (3) whatever is left is drawn and labelled **"unassigned"**. **Edmonton BE (hard limit, J.B., 9 Nov):** the refuge, shelter and their rooms (lobby excluded) are one Community Service establishment capped at 500 m² (Zoning Bylaw 20001 s. 2.120 3.12.1; Q5). Growing the refuge stops at the cap; the overflow goes to the next item: the clinic (its own 500 m² Health Service cap, 3.3.1), then unassigned. A fit over either cap fails T-reach R8.

### 1b. Data centre (the host)

| Room | Rule | Min width (step) | Step | Source |
|---|---|---|---|---|
| Data hall | 290–630 m² per MW. Fits use 630 (the tool's low-MW end) | — | 2 | tool data/dc_rooms.json; arch_dc_hall, it_load_outside |
| UPS room | ⌈MW⌉ + 1 modules + 1.0 m working space in front (CEC 2-308, second-hand ?) | 3.0 m (2: equipment + 1.0 m working space, CEC 2-308 second-hand ?) | 2 | ups_modules, galaxyVX, electrical_room |
| Battery room (Li-ion, 5 min) | 1–6 cabinets, ≈3.5 m² a cabinet; 2 h room | 3.0 m (2, same) | 2 | battery_cabinets, vertivLi5, nfpa855_2026 |
| Battery room HVAC (separate) | ? | 3.0 m (6) | 6 | arch_up_fm0528 (insurer) |
| MV switchgear | equipment + working space | 3.0 m (2, same) | 2 | arch_up_fm0523 |
| Meet-me rooms (2), sprinkler valve room, NOC, janitor | ? (drawn 9–37 m²) | meet-me, NOC 2.4 m; valve, janitor 1.5 m (6) | 6 | TIA-942 unread |
| Offices · break room · staff WC | reference sizes from one filed plan, not code minimums (J.B. 9 Nov, final gate, Q25): offices 100 m² (fits draw 24–60) · break room 24 m² (339 and 8980 draw 22.5) · 1 WC per ≤ 25 | 2.4 · 2.4 · 1.5 m (6; staff WC: audit ?) | 5 · 5 · 1 | burlingtonPlans2026 (one case); VBBL 3.7.2.2 |
| Shipping and receiving · storage and staging · garbage | reference sizes from one filed plan, not code minimums (J.B. 9 Nov, final gate, Q25): 45 (1330 draws 38.5) · 40 + 18.6 m² (Edmonton draws 58.0) · ? | garbage, storage 1.5 m (6) | 5 · 5 · 6 | burlingtonPlans2026 |
| Staff entrance: portal; vestibule and guard point | portal 1.8 × 1.8 m; rest ? | portal 1.8 m (2) | 2 · 6 | arch_acc_gcpsg015RZ, arch_acc_gunneboHiSec |
| Freight lift (passenger-rated, the staff accessible route) | car ≈ 2.5 × 3.4 m | — | 6 | VBBL 3.8.2.3 (every storey reached) |

### 1c. Plant, sized from the hall (tool rules)

Heat Q = MW × 1.55 (PUE high end; pue, lbnl2024, uptime2025).

| Plant | Rule | Size | Source |
|---|---|---|---|
| Generators | ⌈Q ÷ 1⌉ + 1 sets of 1,000 kW (2,000 kW sets when Q > 3 MW) | KD1000 8.43 × 2.62 m; 12 h sub-base tank in each set = MW × 1.55 × 12 × 0.263 L/kWh ÷ duty sets (⌈Q⌉, the spare not counted; drawing choice, J.B. 8 Nov, as the tool does) | tool plant.js; rehlkoKD1000, fuel_on_site |
| Chillers (air-cooled hall) | ⌈Q ÷ 1.489⌉ + 1 | 12.14 × 2.36 × 2.90 m | vertivAFC |
| Transformer pads | ⌈Q ÷ 2.5⌉ + 1 | 2.63 × 2.49 m | transformers, eatonCA022021 |

### 1d. Totals
Hub (refuge + shelter + shared): about 330–720 m² at grade in the fits. Clinic: 0, 236–306 or 484–604 m². Data centre: hall + about 300–650 m² of support, cores and entrance rooms (fits: 1,135–2,141 m² for 0.4–1.9 MW).

---

## 2. Variants

What decides the variant, in order: (1) the zone's ground-floor rule; (2) the lot type (job A1: regular, small, large, narrow_deep, wide_shallow, irregular; corner as a flag); (3) lane or no lane; (4) flood plain; (5) height. A lot can carry more than one variant.

| Variant | Triggered by | What changes | Test fit (status) |
|---|---|---|---|
| **Stacked** | Vancouver I-2 2.2.7 and I-3 2.2.11 (no data storage at grade except entrances, read strictly, J.B. 8 Nov). I-3 2.2.6 also keeps a health care office off the ground floor. | Hub at grade; data-centre support and/or clinic on storey 2; hall on top. At grade only data-centre entrance rooms: stairs, lift, staff vestibule with guard point and portal, dock and lift lobby. | 339 1st Ave E, 1330 Glen Dr, 8238 Fraser St (second pass 8 Nov) |
| **Beside** | Edmonton BE: no ground-floor rule in the zone text (Zoning Bylaw 20001 s. 2.120; general sections 5–7 not re-read). **Not available in Vancouver I-2 or I-3.** **Every Edmonton hub needs rezoning** (J.B., 8 Nov; `edmonton_data_centre_use_class_2026-11-08.md`): a data centre is Major Industrial, allowed in IH (2.140) but not BE; IH does not allow the refuge, shelter or clinic, BE does. No Edmonton zone allows the hub outright. Boards are labelled "needs rezoning"; the design does not change. Representative lots stay BE. | Hub on the street; hall behind it at grade. BE caps: height 16.0 m (2.120 4.1.1), FAR 1.6 (4.1.2); Community Service and Health Service 500 m² per establishment (3.12.1, 3.3.1). | 64 Airport Rd NW (refuge 185 m², 9 Nov) |
| **Turned** | Wide-shallow lots | Bands run along the street; plant found another place first, a screened street-front yard only as the last step (J.B. 8 Nov). | 1353 Pender St E (drawn 8 Nov) |
| **Small** | Small lots (A1 small) | Refuge (50, may count with the merged day shelter) kept; clinic 5 exam rooms or none; shared loading by approval as a fallback. | 1330 Glen Dr: refuge 50 with the shelter; clinic dropped (ladder step 3); 3 bays outright |
| **Clinic ≤ 500 m²** | Edmonton BE Health Service 500 m² per establishment (3.3.1; avoids a 3.18 variance). Vancouver: under 500 m² a clinic needs no loading space (Parking By-law 5.2.9). | Clinic capped at 5–13 exam rooms to stay ≤ 500 m². | to apply on every BE fit |
| **Hub cap (every lot)** | J.B., 8 Nov (Q10) | Data centre ≤ 2,325 m² and one hall storey on every lot (about 1.8–1.9 MW), smaller where the lot can't hold it. Drawing choice, labelled. | 64 Airport Rd (redrawn 8 Nov), 4103 97 St, 1353 Pender St E, 339 1st Ave E |
| **Large lot** | A1 large | **Hub-sized data centre (J.B., 8 Nov, drawing choice): ≤ 2,325 m² of data-centre floor and one hall storey, in both cities** (Vancouver's cap, Parking By-law 5.2.5, so the two cities compare at the same size): about 1.8–1.9 MW. The rest of the land stays open. | 14715 Yellowhead Trail (redrawn 8 Nov to the hub cap) |
| **Corner** (flag) | Two streets | Hub and lobby on the main street; service, loading and plant from the side street. | 4103 97 St NW (drawn 8 Nov) |
| **Raised ground floor** (flag) | Vancouver flood plain | Slab ≥ FCL. Lobby where the sidewalk is at slab level, or a ramp (VBBL 3.8.3.5); truck court at yard grade with a dock where the yard is lower. | 8238 Fraser St, 1330 Glen Dr, 339 1st Ave E |
| **Through lot** (flag) | Two streets at opposite ends | Hub on the main street; service, loading and plant from the other street; an exit passage where side yards are 0 m. | 8238 Fraser St |
| **Height-capped** | Two 6 m hall storeys over a 6.1 m ground storey exceed 18.3 m | Support storey at 4.0 m, one hall storey on top, chillers on the lower roof (off the hall). | **8238 Fraser St reference: 0.94 MW, 17.1 m, outright, no approval** (S2 beside the hall, two chillers on the lower roof, J.B. 8 Nov). Full height 1.9 MW at 19.3 m needs the Director's height increase (I-2 3.1.2.5); that board is out of date. |
| **Side drive** (flag) | No lane and no second street | 6.1 m truck drive from the front street along a side. In I-3 it can sit in the 7.6 m side yard (approval: Director may decrease the side yard for loading access, 3.1.2.16). In I-2 (0 m side yards) it takes frontage. | 1330 Glen Dr (I-2), 339 1st Ave E (I-3) |

---

## 3. Hard layout rules

Each rule has its dimension and source. "Drawing choice" means no rule; the value is ours.

**Code level (J.B., 9 Nov, `CODE_LEVEL_RULE_2026-11-09.md`; copy into every typology spec).** Schematic massing and program studies, not construction drawings: the big code moves must work, detailed design is not checked.
- **Check:** use and approval (zone, conditional use, rezoning, ground-floor rules); envelope (height, floor area, yards, depth, FCL); separations (2 h between data centre and public programs; nothing wet over the hall); exits (two per zone, travel ≤ 45 m, exits apart, dead ends ≤ 6 m, egress doors for rooms over 60 people, exit width by load, no public exits through data-centre space or plant yards); rooms (minimum area and width); washroom counts by load and one universal washroom per hub; loading counts; plant clearances; step-free entry at the lobby.
- **Don't check** (list under weaknesses as "detailed design, not checked"): washroom fixture layouts, accessible stalls, lavatory clear floor, door swings, grab bars; edge-vs-centre measurement choices and other refinements under 0.5 m; finishes, hardware, signage, lighting, intake and exhaust placement.
- **Tolerance:** within 0.5 m (or 5 % for areas and room sizes) of a limit → **"tight: check in design"** on the board, not re-planned. Re-plan only when a big-move rule fails by more than that.

1. **Bands, street to rear:** street → hub front (refuge and lobby on the street) → shared lobby → public corridor (spine) → data-centre entrance core → loading → plant yard.
   - The plant yard is never on the public edge (5 Nov rule). Generators, pads and chillers sit in the back yard, or chillers on a lower roof that is not over the hall.
   - On wide-shallow lots the bands turn to run along the street. On through and corner lots the service bands face the second street.
2. **One building outline per storey.** Programs share walls with the next band. No gaps between programs (T-one).
3. **Shared lobby:** see rule 15c.
4. **Ground floor, by zone:**
   - Vancouver I-2 2.2.7 and I-3 2.2.11: data centre only as entrance rooms (list in Part 2, Stacked).
   - I-3 2.2.6: clinic only as entrances (lift, stairs).
   - Edmonton BE: hall may be at grade (no rule in s. 2.120). Every Edmonton hub is a rezoning (Part 2); the ground-floor rule then comes from the new zone (?). BE is not a permission.
5. **Corridors:** see rule 15b.
6. **Exits** (VBBL 3.4.2.3; same text in NBC 2020; NBC 2023 (AE) not re-read, ?):
   - Two exits from every zone: hub, clinic, each data-centre storey.
   - **Exits apart, 3.4.2.3.(1):** floor area **with a public corridor**: ≥ min(½ the largest diagonal, 9 m). **All other** floor areas: ≥ max(½ the largest diagonal, 9 m).
   - The distance is the shortest path smoke would travel between the exits, not through a fire separation (3.4.2.3.(3)). Fits measure door to door as a stand-in; say so on the board.
   - **Exterior stair discharges, 3.4.2.3.(4):** ≥ 9 m apart, or ≥ 6 m if sprinklered and both within 15 m of a street.
   - Travel along the path ≤ 45 m, sprinklered (3.4.2.5). Measured on a 0.25 m grid through 0.9 m doors.
   - Data-centre stairs never open to public rooms. Public stairs never open into the secure line.
   - Exits discharge to a street or to a yard or drive leading to one. The lobby may carry a first-storey second exit only (3.4.4.2, our reading).
   - Where side yards are 0 m and travel would exceed 45 m: a 2 h exit passage to a street end.
   - No public or clinic exit passes through data-centre space (loading bays, truck aisle, plant yards, secure rooms); a public exit may run beside a plant yard on its own fenced walkway, never through it (J.B., 9 Nov); its route to a street stays apart from the truck route (J.B., 8 Nov). **Small-lot exception** (J.B., 9 Nov): where no separate route fits, an exit may discharge to a drive leading to a street, with a protected walkway (raised or bollard-separated) to the street; flagged on the board.
   - **Refuge and shelter egress** (J.B., 9 Nov): occupant load by VBBL Table 3.1.17.1, assembly with non-fixed seats, 0.75 m² a person (register vbbl25_31171; the washroom rate). A refuge or shelter room over 60 people (over 45 m²) needs two egress doors at least ⅓ of the room's diagonal apart (3.3.1.5.(2)), "measured as the shortest distance that smoke would have to travel between the nearest required egress doors": nearest door edge to nearest door edge (J.B., 9 Nov, from the VBBL 2025 text). Reference script: `eh/egress2.py`.
   - **Egress doorways by room area** (J.B., 9 Nov, from Code's second read of VBBL 2025 Div. B 3.3.1.5.(1)(d) and Table 3.3.1.5.-B, PDF p. 267; register vbbl25_3315): in a floor area sprinklered throughout, a room or suite larger than the table needs two egress doorways at least ⅓ of its diagonal apart, whatever its load: Group A 200 m², D 300 m², F-2 200 m² (also B-1 100, C 150, E 200, F-3 300). Also where travel to an egress doorway is over 25 m. Applied to: the data hall (F-2), each refuge and shelter room (A), the clinic suite (D: all clinic rooms with the clinic corridor; its doorways are the doors leaving the suite). Groups are our reading. Unassigned floor has no group yet and is not checked. Edmonton: NBC 2020 Table 3.3.1.5.-B (J.B.'s copy) gives the same limits (A 200, D 300, F-2 200 m²); NBC 2023 (AE) not read ? Diagonal: bounding box; spacing edge to edge, as above. Reference script: `eh/egress3.py`.
   - **Walkways and passages carry their load** (VBBL 3.4.3.2.(1)(a), J.B. 9 Nov): width ≥ occupant load served × 6.1 mm and ≥ 1.1 m. A walkway need not match the door width. Load an exit serves: the storey's load split evenly over its exits; where two exits are required each carries at least half (3.4.3.2.(7): no exit counts for more than half the required width; J.B. 9 Nov). Joined walkways carry the sum. Data-centre storeys: the persons the area is designed for (staff), fallback VBBL Table 3.1.17.1 storage, 46 m² a person (our reading, J.B. 9 Nov); a stair carries its largest storey. `eh/walkload.py` also reports the full storey load. A walkway fence counts as a structure for transformer-pad clearance (BC Hydro ES54 F, 1 m; J.B. 9 Nov, conservative).
   - **Exterior discharges 9 m apart** (3.4.2.3.(4); 6 m sprinklered within 15 m of a street) apply to exit stairs serving the same floor area, measured door edge to door edge (J.B., 9 Nov: (4) gives no method; 3.4.2.3.(3)'s smoke path is for Sentence (1) only).
7. **Storey heights and height:**
   - Vancouver I-2: ground ≥ 6.1 m, upper ≥ 4.0 m (3.1.2.4 / 3.2.2.9, every I-2 lot, J.B. 8 Nov). I-3 sub-area A: 6.0 / 4.0 m (3.1.2.9). Height 18.3 m; Director's increase I-2 3.1.2.5 / I-3 3.1.2.10.
   - Edmonton BE: height 16.0 m (2.120 4.1.1); no storey minimum in the zone.
   - Hall storey 6.0 m (**drawing choice**; TIA-942 clear height unread, `checks/paywalled_standards.md`). Support storey 4.0 m; clinic storey 4.0–4.5 m.
   - Height = highest point − base surface directly beneath (Z&D s. 2). Base surface from existing grades at the site corners (City LiDAR 2022, CGVD28, `eh/grade/vg.py`) where official grades are not on file (our reading).
8. **Stacking and separations:**
   - Nothing wet over the hall: no chillers on the hall roof (FM 5-32 2.2.1.6, insurer).
   - F-2 over or beside A-2: 2 h. Clinic (D) beside or under F-2: none. A-2 to D: 1 h (VBBL Table 3.1.3.1).
   - Every data-centre storey over the hub sits on a 2 h floor; label it on the board.
9. **Plant:**
   - Generators and transformers at grade (FM 5-32 2.6.4.3, insurer).
   - Generator tanks 1.5 m to the building and 3.0 m to lot lines for 2,500–50,000 L (CSA B139 Table 2). Sets 2.0 m apart (CSA C282 6.5.1.1).
   - Transformer pads 1 m from buildings and structures, 1 m apart, 3 m clear in front (BC Hydro ES54 F); **the front faces the drive or yard aisle** (drawing choice, J.B. 8 Nov).
   - **Chillers (Vertiv Liebert AFC), clear zones** (vertivAFC_clear, SL-70790 s. 4.2.4, Fig. 4.2, maker claim; read from J.B.'s screenshot): 1.5 m on each long (air-intake) side, 2.1 m at each end (panel end and far end), 2.5 m clear above the fans; unit 2.35 m wide. Zones are free of any obstruction (walls, fences, plant). Between units the guide gives no figure: **3.0 m side to side and 4.2 m end to end** (zones not shared, our reading). On a roof, the panel-end zone is roof at the unit's level (s. 4.2.4 notice). **Panel end faces the access path** (drawing choice, J.B. 8 Nov). One chiller with its zones takes 16.3 × 5.4 m. Replaces EVAPCO's figures (other equipment). **Edmonton:** placeholder only, outside the maker's stated range at −30 °C (SL-70790 pp. 9–10; NBC App. C).
   - **Chiller siting** (vertivAFC_siting, SL-70790 p. 34, maker claim): ≥ 5 m from drains and manholes (roof and yard drains count); in free airflow; refrigerant R1234ze is A2L and heavier than air, so a leak pools in rooms or spaces below the unit: keep safety distances from openings where gas could enter (no figure: "?"); away from medium/high-voltage lines (no figure: "?" where chillers sit near transformer pads). Checked on every fit, including chillers on a roof over occupied rooms.
   - Outdoor air intakes ≥ 7.6 m from loading bays and ≥ 3.0 m from generator exhausts (VBBL Table 6.3.2.9; NBC in Edmonton). **Not drawn yet.**
   - Generator testing: one set at a time wherever two together exceed 80 dBA at 6.1 m (Vancouver By-law 6555 s. 4.1(c)). Edmonton: 85 / 75 dBA at a non-residential / residential line (Bylaw 14600 s. 21).
10. **Loading:**
    - Vancouver: counted per class and summed (Parking By-law 5.1.5), Class B (J.B., 8 Nov):
      - data centre, 5.2.5: 1 for the first 465 m², 1 more for any portion of the next 1,860 m² (to 2,325), then 1 per further 2,325 m²;
      - refuge, shelter and their rooms, 5.2.3 (place of assembly, our reading of the use): none under 100 m², then 1 per 2,800 m² (fractions round up, s. 5.1);
      - clinic, 5.2.9 (Office Uses; Health Care Office, our reading): none under 500 m², 1 at 500–5,000, 2 to 10,000, 3 to 28,000.
    - Edmonton (Zoning Bylaw 20001 s. 5.80 Table 7.2, edmZB580): one count on the whole non-residential floor area: under 2,500 m² none, 2,500–7,500 m² 1, over 7,500 m² 2; space 9.0 × 3.3 m, 4.0 m clear height; aisle not given (Vancouver's 6.1 m used, ?).
    - Class B 10.2 × 3.4 × 3.8 m (5.5.1.2). 6.1 m aisle from a lane, or from a street where there is no lane (5.4.1).
    - A dock and lift lobby with the freight lift sits at the bays.
11. **Entrances:**
    - Hub and clinic through the shared lobby.
    - Data-centre staff through their own vestibule, guard point and portal, never through the lobby (GCPSG-015, federal benchmark).
    - Each use should have its main entrance from a street (Z&D 10.21.1; flag where it can't).
12. **Step-free and flood:**
    - **FCL** (VBBL Div. A, definition): underside of floor or top of slab of a building used for habitation, business or storage of goods ≥ 4.6 m GVRD datum (CGVD28) on the Burrard Inlet, English Bay, False Creek and Fraser River flood plains; **more in the wave-effect zone (Diagram A2)**; the Still Creek flood plain has its own levels (Diagram B). Check each Vancouver lot against both diagrams. The definition does not cover open-air pads (Part 8).
    - **Step-free** (VBBL 3.8.3.2.(3)(e)–(g), read from J.B.'s copy): a change in level at a public entrance of ≤ 6 mm may be level; 6–13 mm bevelled at 1:2; > 13 mm needs a sloped floor ≤ 1:20 or a ramp ≤ 1:12 (3.8.3.5; a 0.7 m step needs ≥ 8.4 m of ramp plus landings). Put the lobby where the sidewalk is at slab level, else slope the lobby floor or add a ramp inside. City LiDAR comes in 0.1 m steps, so it cannot show 13 mm: where it reads 0.0–0.1 m, draw a sloped floor ≤ 1:20 over the first 2.0 m inside the door; survey before design. **In the flood plain** (J.B. 10 Nov, after the pool chat's 8980 finding): every room floor at or above the FCL (VBBL Div. A definition), so no ramp or sloped floor inside below it; set the lobby wall back and run the ramp outside under a canopy up to a landing at the slab; our reading: an exterior ramp is not a building floor; CBO relaxation 1.5.2.11.(3) as a backup. Applied 10 Nov to 8980 Oak St, 1330 Glen Dr (ramp in an exterior slot under storey 2; the refuge's 3 exit steps also moved outside) and 8238 Fraser St outright (lobby wall set back 1.7 m, ramp in the recess). Flood-plain shares from the tool's own data (City of Vancouver Open Data designated floodplain in tool/tiles/van/meta.json, sampled as the tool does; eh/toolflood.py): 1330 Glen Dr 100 %, 8238 Fraser St 87 % (lobby end inside), 8980 Oak St 100 %, 339 1st Ave E 29 % (matches the earlier independent check; slab 5.2 m is above the FCL anyway); wave effect zone 0 % on all four. 1330's ramp slot is 8.8 m so its lower level area stays inside the lot line at the top of the LiDAR range (no City sidewalk). 8238's south exit passage drops 1.3 m by exterior steps inside the lot (8 risers of 162 mm; 3.4.6.8 and 3.4.6.4 not read ?). The 8238 board with the Director's height increase stays OUT OF DATE (not the reference) and still shows the sloped lobby floor.
    - Public entrances = the lobby street door (and a separate clinic street door where there is one). Refuge, shelter and corridor street doors are exits; they may have steps (drawn or noted).
    - Trucks may work at yard grade with a dock up to the slab.
13. **Yards and depth:**
    - Building and plant stay inside the yard lines (Z&D 10.13.1) and the depth and width limits (I-3 61 m). Edmonton BE: street setback 6.0 m (4.5 m on collector or local roads), 0 m to other sites, 6.0 m abutting a residential zone (2.120).
    - A truck drive may cross or run in a yard as Parking By-law access. In an I-3 side yard it is a flagged approval (3.1.2.16).
14. **Fallback ladder**, in order:
    1. Full program, at grade (Edmonton) or stacked (Vancouver).
    2. Clinic 13 → 5 exam rooms.
    3. No clinic.
    4. Shelter merged into the refuge (day).
    5. Shared loading by approval (5.1.5).
    6. Height-capped (support storey 4.0 m, one hall storey).
    7. "Doesn't fit here", with the limiting rule and the dimension.

    The refuge (≥ 50 people) never drops (J.B., 8 Nov). Every typology must fit every lot type through variants; "doesn't fit" only with a proven limiting rule.

15. **Access (codeable).** Every room carries a *kind* and a *line*. The public line and the secure line never share a door. Tested by T-reach (15d).

    **15a. Room kinds and access**

    | Kind | Line | Rooms | Opens off | Through another room? |
    |---|---|---|---|---|
    | lobby | public | shared lobby | street (exterior door) + public corridor | — |
    | pcor | public | public corridor | lobby | — |
    | ccor | public | clinic corridor | clinic waiting, or public lift E1 when the clinic is upstairs | — |
    | pcore | public | clinic stairs P1, P2; public lift E1 | public or clinic corridor; P stairs also exterior at grade | — |
    | proom | public | refuge, refuge second room, day shelter, first aid, staff office, cot storage, hub WCs, universal WC and shower | public corridor or lobby (≥ 1 door) | **Allowed:** WCs, cot storage and first aid may open off the refuge or shelter room they serve, if that room opens off the corridor or lobby. Why: they serve that room only (drawing choice; no clause found ?) |
    | croom | public | exam, procedure, consult, medication, clean, soiled, housekeeping, staff, office, clinic WCs; waiting | clinic corridor (waiting also off the public corridor or lobby) | Never |
    | plant | — | programs mechanical, emergency panel | exterior, or a public or clinic corridor | Never through a public room |
    | entry | secure | DC staff vestibule, guard point, portal | exterior (street or drive), then E2 or a DC stair | — (never off the lobby: GCPSG-015) |
    | dock | secure | dock and lift lobby | loading bays and E2 | — |
    | bay | secure | loading spaces | open to the truck aisle; the row of bays touches the dock lobby | Bay to bay (one open space) |
    | score | secure | DC stairs S1–S4, freight lift E2 | secure corridor; at grade, exterior (stairs) or entry/dock (E2) | — |
    | scor | secure | secure corridor | DC stairs and E2 | — |
    | sroom | secure | UPS, battery, battery HVAC, MV, meet-me, valve room, NOC, offices, break room, staff WC, janitor, garbage, storage and staging, shipping | secure corridor | **Allowed:** rooms that serve the data hall only (electrical rooms, fire-suppression cylinders, battery cooling) may open off the hall; travel from them through the hall to an exit must still pass 45 m (J.B., 8 Nov). Shipping may open off E2 or the dock. Drawing choice, labelled |
    | hall | secure | data hall | two DC stairs and E2 directly, or the secure corridor | — |
    | spare | the line of the corridor it opens off | unassigned floor | one corridor | Never |
    | shaft | — | riser and services shafts | no door (access panels) | — |
    | exitpas | the side it serves: public or secure (J.B., 8 Nov) | 2 h exit passage; exit steps inside a street door | corridors of one side only, never both; ends at an exterior door | — |

    **15b. Corridors**

    | Corridor | Width | Starts | Ends | Must touch |
    |---|---|---|---|---|
    | Public corridor | 2.0 m (drawing choice; code ≥ 1,100 mm, VBBL 3.3.1.9) | the lobby | an exit (exterior door to a yard or street, or an exit passage) at or within 6 m of its far end | every proom that does not use the through-room allowance; E1; clinic waiting when the clinic is at grade |
    | Clinic corridor | 1.8–2.0 m (drawing choice; stretcher door widths in CSA Z8000, unread ?) | E1 or the waiting room | the two clinic exits (P1, P2, an exterior door or an exit passage), each end within 6 m of an exit | every croom; E1 (upstairs clinic) |
    | Secure corridor | 2.0 m (drawing choice) | a DC stair or exterior door | the second DC stair or exit, each end within 6 m of one | every sroom on that storey; E2 or shipping; both DC stairs |
    | Exit passage | ≥ 1.1 m (VBBL 3.3.1.9); 2 h | the corridor it relieves | an exterior door | — |

    A hall storey needs no secure corridor when the hall touches both DC stairs and E2.

    **Dead ends** (VBBL 3.3.1.9.(5), 6 m; J.B., 8 Nov, strict reading; the code text gives no definition): measured along the corridor centreline (J.B., 8 Nov, strict), on every public, clinic and secure corridor, from the last point where you can travel two ways to separate exits; a door counts at its centre, projected onto the centreline. An exit here is an exterior door (for public and clinic corridors, not one into a loading bay, truck aisle, drive, court or plant yard, unless onto a fenced walkway, as rule 6; for secure corridors an exit into the data centre's own fenced plant yard counts if the yard gate to the street is drawn and opens from inside without a key: our reading, J.B. 9 Nov, Q24; geometry field GATES, route checked by `eh/yardgate.py`), an exit stair, an exit passage (counted by the exterior door it ends at), or, for the public corridor, the lobby (which leads to its street door). Two doors into the same exit count once. A loop of corridor that rejoins the two-way path at two places is two-way. Where it helps, the far-end exit is also the refuge's second egress door (rule 6: over 60 people at 0.75 m² need two). Reference script: `eh/deadend.py`.

    **15c. Shared lobby**
    - At grade, one wall on the main street (the front lot line, or the front yard line where there is a front yard).
    - Minimum 20 m² (drawing choice; fits 31–64 m²). Street door 1.8 m (drawing choice).
    - Connects: the street (exterior door), the public corridor (door or open), and the refuge (directly or by the corridor). E1 is reached by the public corridor.
    - Never has a door or opening into a secure-line room; a shared fire-rated wall is allowed (J.B., 8 Nov).
    - Step-free at the street door per rule 12 (≤ 13 mm, else a sloped floor ≤ 1:20 or a ramp ≤ 1:12 inside the lobby).

    **15d. T-reach (the test)**
    Input: rooms (storey, id, kind, rectangles), doors (storey, room a, room b or exterior), cores with the same id on several storeys. Graph: a node per room per storey; an edge per door; an edge between the same core on adjacent storeys.
    - **R0** Every door sits on a wall the two rooms share, over its full width (an exterior door on the room's outside wall).
    - **R1** Every room except shafts and bays has at least one door.
    - **R2** No door joins a public-line room and a secure-line room, and no public exterior door opens into a loading bay, truck aisle, drive, court or plant yard unless onto a fenced walkway (each fit's DCSPACE and WALK).
    - **R3** Every public-line room (except stairs, plant, exit passages) is reached from the lobby's street door through public-line rooms only, changing storey only by lift (step-free, VBBL 3.8.2.3).
    - **R4** Every secure-line room (except bays) is reached the same way from the DC staff entrance's outside door through secure-line rooms only.
    - **R5** Every room that is not circulation opens off circulation, or uses an allowance in 15a (parent named there, and the parent opens off circulation). Bays: the row of touching bays touches the dock lobby.
    - **R6** There is a lobby with a street door, and it has a door or opening into the public corridor.
    - **R7** No corridor has a dead end over 6 m, measured as in 15b (`eh/deadend.py`).
    - **R8** No capped use is over its per-establishment cap. Each fit lists its caps (geometry field CAPS); Edmonton BE: Community Service (refuge, shelter and their rooms) 500 m², Health Service (clinic) 500 m² (J.B., 9 Nov, hard limit). Area = the rooms of that use on all storeys, lobby and circulation excluded.
    - Output: PASS, or one line per finding: rule, storey, room, reason.
    - Reference script: `eh/reach.py` (Cowork, 8 Nov). Run on all eight fits: all PASS (re-run 9 Nov, after the last fixes). Not tested by the script: a passage serving both sides (checked by hand) and exits onto a drive or yard shared with trucks (rule 6, checked by hand). Negative test (lobby door into the staff vestibule; waiting only through an exam room; clinic WC only through the consult room): R2, R5, R5 found.

---

## 4. Test fits
One board per variant per lot type, on the representative lots in `eh/reps.json`; scripts in `eh/<fit>/`. Status at J.B.'s code level (9 Nov). History of each re-plan: the boards' banners and `eh/remeasure*/`.

| Lot | Variant | Hall | Refuge + shelter | Clinic | Status | Tight: check in design |
|---|---|---|---|---|---|---|
| 339 1st Ave E (I-3) | stacked, side drive, raised | 1.83 MW, 16.3 m | 114 + 16 | 296 m², 5 exams, storey 2 | **fits outright** (side-yard drive by approval, I-3 3.1.2.16) | storey heights; P2–S1 discharges 6.2 m; S1 within 15 m of the street; walkways; generators and pads at 0 margin; rooms at minimum width |
| 1330 Glen Dr (I-2, small) | stacked, side drive | 0.41 MW, 16.9 m | 50 (refuge with shelter) | none (dropped) | **doesn't fit outright**: the drive is 4.9 m beside the protected walkway (6.1 m, Parking By-law 5.4.1): needs a relaxation of the aisle width (?). Second exit onto the drive = small-lot exception (J.B. 9 Nov) | storey heights; exits apart (storey 2 and the data-centre entrance, 0.48 m); dead end 6.0 m; walkway 1.2 m; refuge 50; tanks, pads, FCL, chillers; rooms at minimum width |
| 8238 Fraser St (I-2, through) | stacked, height-capped (reference) | 0.94 MW, 17.1 m | 104 + 16 | none (dropped by rank, J.B. 9 Nov) | **fits outright** with the clinic dropped (no second separate exit fits) | storey heights; dead end 6.0 m; shelter doors 3.9 m; refuge minimum; step-free lobby; tanks, pads (1.0 m to the fence), FCL, chillers; rooms at minimum width. Full-height board out of date |
| 1353 Pender St E (I-2, wide-shallow) | turned, stacked | 1.64 MW, 17.2 m | 166 + 16 | 362 m², 6 exams, storey 2 | **fits outright** | storey heights; dead end 5.8 m; tanks; pads; chillers (0.05 m to the west lot line); rooms at minimum width |
| 8980 Oak St (I-2, irregular corner, flood plain) | stacked, raised | 0.94 MW, 17.3 m (smaller than the hub cap: plant doesn't fit) | 90 + 16 | 296 m², 5 exams, storey 2 | **fits outright** at 0.94 MW | storey heights; P2–S1 discharges 6.2 m; walkway 2.1 m (2.07 needed; 2.28 if the programs-mechanical door counts as an exit: final check); tanks, pads, chillers (0 m to the rear yard line); FCL; rooms at minimum width |
| 4103 97 St NW (BE, corner) | beside, one storey | 1.68 MW, 6.0 m | 52 + 16 | 336 m², 5 exams | **needs rezoning** (every Edmonton hub, J.B. 8 Nov) | tanks; chiller clear zones; rooms at minimum width; pad fronts not drawn (?); Community Service cap 483 / 500 m² |
| 64 Airport Rd NW (BE) | beside, one storey | 1.68 MW, 6.0 m | 52 + 16 | 336 m², 5 exams | **needs rezoning** | walkway; tanks; pads; chillers; rooms at minimum width; Community Service cap 483 / 500 m² |
| 14715 Yellowhead Trail NW (BE, large) | beside, hub cap | 1.68 MW, 6.0 m | 52 + 16 | 336 m², 5 exams | **needs rezoning** | walkway; tanks; pads; chillers; rooms at minimum width; Community Service cap 483 / 500 m² |

**Small lot (true small lot, 9 Nov, arithmetic only, not drawn; board TestFit_EH_SmallLot):** the small variant was drawn on 1330 Glen Dr (about 960 m² buildable). On 1360 Frances St (I-2, 14.5 × 37.0 m, lane, 484 m² buildable) it **doesn't fit**: limiting rule, generators and pads at grade (FM 5-32 2.6.4.3; rule 9) with tanks 3.0 m from lot lines (CSA B139): after the refuge (175), entrances and bays about 103 m² of the whole lot is left (138 with 2 bays by approval); the plant needs about 189. **Smallest lot for the hub** (one floor for all typologies, our arithmetic): about 750 m² with a lane (room minimums alone give about 620; unproven between), about 1,010 m² and ≥ 26.7 m frontage without a lane; frontage ≥ 14.5 m on any lot (two generators crosswise). **Plant-up variant on 1360 Frances St (J.B., 9 Nov; `research_small_lot_plant_2026-11-09.md`; labelled "meets code as read; not FM 5-32 (insurer)"; arithmetic only, not drawn):** generators in a 2 h room on storey 2 (VBBL 3.6.2.8; Bulletin 2000-015), transformers in a lane-facing alcove with the 3 m working area on the lane (BC Hydro ES54 F3-06), refuge 175 m² at grade; fuel quantity, structure, exhaust, noise and fuel delivery upstairs ?. **Doesn't fit:** limiting rule, lane frontage: 3 Class B bays (10.2 m) + 2 pads in one alcove (7.98 m, sides 1.0 m from F3-08, F3-06 not read ?) = 18.2 m against 14.5 m; with 2 bays shared by a 5.1.5 approval 14.8 m, short 0.27 m on the full lot width (tight) but 1.0 m on the tool's 13.78 m buildable width. Ground fits (≈ 458 of 484 m²). The variant would need lane frontage ≥ 18.2 m (14.8 with shared bays) and ≈ 460–535 m². Not drawn, so the 750 m² floor stands. **Plant-up variant with the transformer alcoves on the street (J.B., 9 Nov; ES54 F3-06 note 4a "shall face the street or back lane", Table 1; an exception to the 5 Nov rule, no plant on the public edge, for this small-lot variant only; arithmetic only, not drawn):** two alcoves (sharing not addressed in F3-06), 4.2 m each (Table 1, 750–1,500 kVA; assumed about 1,000 kVA each for a 0.63 MW hall, two transformers N + 1, power factor 0.95 ?), 3.0 m operating area on the street; the lane keeps the three Class B bays. **Doesn't fit:** limiting rule, street frontage: alcoves 8.4 + lobby 2.4 + refuge's second exit 1.0 + data-centre vestibule 2.5 + one data-centre stair discharge 1.2 = 15.5 m against 14.5 m (short 0.99; 1.72 on the tool's 13.78 m). Near misses, outside the brief and not drawn: the data-centre entrance and one stair on the lane (street 13.0 m, lane 13.9 m: fits the 14.51 m lot width, 0.12 m over 13.78, tight); or transformers under 500 kVA (3.7 m alcoves, hall ≤ about 190 m²): street 14.4 m. This variant as briefed needs street frontage ≥ 15.5 m (about 16 with walls), lane ≥ 10.2 m, about 460–535 m² (≈ 16 × 30 m). The 750 m² floor stands. **Near miss 1 drawn on 1360 Frances St (J.B., 10 Nov; board TestFit_EH_V1360; independently re-measured 10 Nov, re-measure 13, findings applied):** generators in a 2 h room on storey 2 (VBBL 3.6.2.8), two 4.2 m transformer alcoves on Frances St, the data-centre entrance, dock, bays and stair S2 at the lane, the building on both side lot lines. Neighbours 1356 and 1388 Frances St are I-2 (tool tiles), so no side yards (I-2 3.1.2.2(c)); side walls at limiting distance 0: no unprotected openings, 1 h (street-level hub, A) and 2 h (data centre, F-2, including the lane-level rooms on storey 1) exposing faces, noncombustible construction and cladding (VBBL 3.2.3.1 Tables D and E, 3.2.3.5, 3.2.3.7). Rear yard: 3.1 m less the distance to the ultimate lane centre line (3.1.2.8; lane width not read, 0.1 m used ?). The tool's 13.78 m is the widest rectangle inside the side lot lines, which are not parallel: lane line 14.0 m, Frances St 14.51 m (tile ring, 0.5 m grid). New finding: the site falls 3.5 m from the lane (14.0) to Frances St (10.5), so the hub is at street level and the data-centre entrance, dock and bays at lane level inside an 8.1 m first storey. **Fits as drawn**, with tight margins: street face 14.2 of 14.5 m, lane face 13.9 of 14.0 m, height 18.2 m, exits apart on the data-centre storeys 19.7 ≥ 19.6 m, refuge 179 m² counted; all at 0 m walls (room sizes are centreline): with walls drawn the faces may not fit. Flag: chillers 18.9 m above the base surface; the I-2 schedule has no mechanical height exclusion (3.1.2.1, 18.3 m; 3.1.2.5 and 3.1.2.6 increases; 5.1 Still Creek only); Z&D 10.1.1(b) lets the Director permit mechanical equipment over the limit (discretionary, not as of right; lowering by 0.6 m not drawn). Lane level: 2 exits needed (VBBL 3.4.2.1.(1)); bay 3's overhead door is not an exit (3.4.6.12.(1), J.B. 10 Nov), so the second exit is the swinging door from the dock into exit stair S2, 10.2 m from the vestibule door (≥ 9.0; shortest smoke path, 3.4.2.3.(3); 3.4.2.3.(4) is for two stair discharges only). The exit doorway into S2 from the lane-level floor area is allowed (3.4.4.4.(1)(d), (6); separate exits, 3.4.1.2.(1); J.B. 10 Nov). Conditions: the dock is a loading dock, not a service, storage or ancillary room (3.4.4.4.(7), (8)); staging and storage stay on storey 2, else add a vestibule; the security portal: an exit door beside it, free exit or 15 s delayed egress (VBBL 3.4.6.16.(1), (5)); (5)(a) needs a fire alarm system (not drawn: tight; row 'Fire alarm system' by hand, VBBL 3.2.4 not read ?). Open "?": fuel quantity, structure, exhaust, noise and fuel delivery upstairs, transformer size (≈ 600 kVA each, the 4.2 m alcove used), F3-06 alcove sides and depth, lane width, flood-plain mapping, truck turning, fire department access. Labels: meets code as read; not FM 5-32 (insurer); exception to the 5 Nov rule, this small-lot variant only. **Smallest lot for the hub with this variant:** about 530 m² with a lane (lane frontage ≥ 14.0 m, street frontage ≥ 14.2 m); not FM 5-32. The at-grade floor (FM 5-32) stays 750 m² with a lane.

**Not drawn yet (open, J.B., 9 Nov: not this round): Edmonton small, narrow-deep, wide-shallow and irregular.** Edmonton has beside, corner and large only. Candidate lots in `eh/reps.json` (two each, no pick made ?):

| Edmonton lot type | Candidates in `eh/reps.json` (BE) |
|---|---|
| Small | 10004 167 St NW (436 m² buildable, corner, lane) · 6912 82 Ave NW (484 m², lane) |
| Narrow-deep | 15231 118 Ave NW · 15311 118 Ave NW (3,240 m² buildable each, 38 × 95 m) |
| Wide-shallow | 16075 Fort Rd NW (3,858 m², 87 × 59 m) · 1415 78 Ave NW (3,793 m², 82 × 58 m) |
| Irregular | 10003 63 Ave NW (8,037 m², corner) · 7903 18 St NW (6,036 m², corner) |

All eight drawn fits pass T-reach (R0–R8, re-run 9 Nov), the room-width audit, egress doors (by load and by room area), walkway loads and dead ends (Edmonton secure exits into the plant yard count through a drawn street gate, Q24). Final independent check 9 Nov: `eh/remeasure10/`. Every board still lists its "?" items (noise, intakes, drains, refrigerant-leak distances, fire access, truck turning, steps at doors that drop to grade).

## 5. Pass/fail tests
Each test returns **pass**, **tight** (within 0.5 m or 5 % of the limit: "check in design"), **fail**, or **?** (not measurable from the massing). Scripts in `eh/`; every board runs them through `eh/tfboard.py`.

| Test | Rule | Pass when | Script |
|---|---|---|---|
| T-use | Part 2; rule 3 | the zone allows each program outright, conditionally, or the board says "needs rezoning" / "approval" | board rows (hand) |
| T-envelope | rule 7 | height ≤ limit above the base surface; floor area ≤ ratio; building and plant inside the yard lines; storey heights ≥ minimum; slab ≥ FCL on flood-plain lots | `tfboard.measure`; `grade/vg.py` |
| T-ground | rule 4 | at grade the data centre has entrance rooms only (I-2/I-3 strict reading) | board row (hand) |
| T-stack, T-wet | rules 5, 8 | 2 h floor between data centre and public programs; nothing wet over the hall | board rows (hand) |
| T-rooms | Part 1 | every room ≥ its minimum area and minimum clear width (largest square); refuge main room ≥ 175 m² counted | `audit_rooms.py` |
| T-reach | rule 15d | R0–R8 pass (doors on shared walls, lines kept apart, step-free reach, through-room limits, lobby, dead ends, area caps) | `reach.py` |
| T-exits | rule 6 | two exits per zone, exits apart, travel ≤ 45 m, stair discharges apart (edge to edge) | `tfboard.measure` |
| T-deadend | rule 15b | every public, clinic and secure corridor ≤ 6 m along the centreline; a secure exit into a plant yard counts only with a drawn street gate that opens from inside without a key (Q24), with a clear 1.1 m route to it | `deadend.py`, `yardgate.py` |
| T-egress | rule 6 | refuge and shelter rooms over 60 people (0.75 m²) have two egress doors ≥ ⅓ diagonal apart, edge to edge | `egress2.py` |
| T-egress-area | rule 6 | every data hall over 200 m², refuge or shelter room over 200 m² and clinic suite over 300 m² (sprinklered, Table 3.3.1.5.-B), or any of them with travel over 25 m to an egress doorway, has two egress doorways ≥ ⅓ diagonal apart | `egress3.py` |
| T-width | rule 6 | every walkway and passage carries its load × 6.1 mm, ≥ 1.1 m (even split, ≥ ½ with two exits, joined walkways sum) | `walkload.py` |
| T-ground-route | rule 6 | no public or clinic exit discharges into a drive, court, truck route or plant yard except onto a fenced walkway (small-lot exception flagged) | `dcspace.py` in `reach.py` R2 |
| T-lobby | rule 15c | lobby on the main street, touches the public corridor, no door or opening into secure rooms; step-free (13 mm, ramp or slope) | `reach.py` R6; board row |
| T-wc | Part 1 | washroom counts by load, split equally between the sexes and rounded up (3.7.2.2.(1)), each table applied to the persons of each sex, a part increment counting as a whole (Table 3.7.2.2.-A/-B); one universal washroom per hub | board rows (`wc_hub`, `wc_clin`) |
| T-loading | rule 10 | Class B bays by class (5.2.3, 5.2.5, 5.2.9) or Edmonton Table 7.2 | `tfboard.loading_html` |
| T-plant | rule 9 | generators 2.0 m apart; tanks 1.5 m to building, 3.0 m to lot lines; pads 1 m apart and from structures, 3 m front to a drive or aisle; chiller clear zones (Vertiv) and nothing wet over the hall | board rows (hand) |

Not tests (detailed design, Part 3 header): fixture layouts, door swings, intake and exhaust placement, finishes.

## 6. Doesn't-fit rule
Apply in order on each lot; stop at the first step that makes every big-move test pass (Part 5). A step's shortfall within the tolerance is "tight", not a reason to go on.
1. **Shrink rooms to their minimums** (area and width, Part 1); spare floor goes refuge → shelter → clinic → unassigned.
2. **Shrink the data centre below the hub cap** to what the plant yard holds (fewer chillers, smaller hall): label "smaller than the hub cap: plant doesn't fit" (8980 Oak St, 8238 Fraser St: 0.94 MW, two chillers).
3. **Shrink the clinic** from full (13 exams) to reduced (5); then **drop it** (rank 3) when it can't have two separate exits or its own floor (8238 Fraser St, 1330 Glen Dr). Its floor goes to the refuge first, then hub WCs.
4. **Merge the day shelter into the refuge** on small lots (the merged room's people count toward the 50).
5. **The refuge (50 people) and the data centre's entrance, cores and plant never drop.** If they still fail, the board says **"doesn't fit outright"**, names the limiting rule, and names the relaxation or approval that would make it fit (e.g. 1330 Glen Dr: Parking By-law 5.4.1 aisle 6.1 m vs 4.9 m).

**Limiting rules found in the fits**
| Lot type | Limiting rule | Effect |
|---|---|---|
| I-2 with no lane, narrow (1330 Glen Dr, 25.5 m) | the 6.1 m drive (5.4.1) takes frontage; with the protected walkway the drive is 4.9 m | doesn't fit outright; small variant needs an aisle relaxation; clinic dropped |
| I-2 through lot, 0 m side yards (8238 Fraser St, 15.5–19.5 m deep) | one exit passage fits (truck aisle on the other side) | clinic dropped by rank; chillers limit the hall to 0.94 MW |
| Irregular corner in the flood plain (8980 Oak St) | plant yard shape; the north face meets the street only at a corner | data centre smaller than the hub cap; building moved 2.1 m for a walkway to Oak St |
| I-3 (339 1st Ave E) | data centre and clinic off the ground floor | ground spare goes to the refuge; storey-2 spare behind the clinic core stays unassigned |
| Edmonton BE (all three) | no zone allows the hub outright | needs rezoning on every lot |

## 7. Worked example: 339 1st Avenue East (I-3, stacked, side drive)

Code checks its steps against these numbers. Source: `eh/v339/geom.py`, `run.py` (re-planned 8 Nov for minimum widths and centreline dead ends; independent re-measure 8 Nov). Board: TestFit_EH_V339 (v96). Weakness: chiller noise, truck turning, fire access and air intakes not done; exterior steps at P2, S1 and the plant-room door not drawn.

| # | Step | Rule | Result on this lot |
|---|---|---|---|
| 1 | Lot and yards | I-3 3.1.2.2–8 | 5-sided lot (tool tiles). Front 0.6 m from the slanted front line (0.83 m at the SE corner), sides 7.6, rear 3.1. Depth and width ≤ 61 m |
| 2 | Variant | Part 2 | Stacked (I-3 2.2.11 and 2.2.6), side drive (no lane: 6.1 m drive in the NW side yard, approval 3.1.2.16), raised ground floor (slab 5.2 ≥ FCL 4.6) |
| 3 | Storeys | I-3 3.1.2.9; rule 7 | 6.0 (hub) / 4.0 (clinic and DC support) / 6.0 m (hall). Roof 21.2 m CGVD28 |
| 4 | Ground floor | rule 4, 15 | Refuge 176 m² + second room 237 m² (the main room for the 175 m² minimum; one room since 9 Nov: a 2.0 m strip past WC 2 joins its two parts) (spare floor grown, J.B. 8 Nov), day shelter 66 m² + shelter storage 20 m², lobby 68 m² on 1st Ave E, public corridor 2.0 m with a 2 h exit passage at its far end to the side yard; P1, P2, E1; DC entrance rooms only: S1, S2, E2, staff vestibule, dock lobby; 3 bays open to the truck court |
| 5 | Hall and MW | 1b; 630 m²/MW | Hall 1,154 m² on storey 3 → 1.83 MW |
| 6 | Plant | 1c | Q = 1.83 × 1.55 = 2.84 MW → 4 generators (⌈2.84⌉ + 1), 3 chillers (⌈2.84 ÷ 1.489⌉ + 1), 3 transformer pads (⌈2.84 ÷ 2.5⌉ + 1). Tank 2,987 L a set |
| 7 | Plant layout | rule 9 | All at grade in the back half. Sets 2.0 m apart; tanks ≥ 7.6 m from lot lines; pads 1.0 m apart; chillers in rows 4.3 m side to side (Vertiv zones: 3.0 m needed), ends 2.1 m clear |
| 8 | Data centre area | 1b | 2,134 m² (hall + support + DC cores + entrance rooms) |
| 9 | Clinic | 1a; I-3 2.2.6 | Upstairs, 5 exam rooms, 296 m² ≤ 33 % of floor area; 3 WC rooms + 1 universal (32 persons, 16 a sex → 1 a sex; over-provided) |
| 10 | Spare floor | 1a (J.B. 8 Nov) | Ground spare → refuge second room. Storey-2 spare behind the clinic stair and shaft: 246 m² unassigned (the clinic cannot reach it) |
| 11 | Refuge people | 1a | 413 m² drawn, 401 m² counted (parts under 2.4 m wide left out) ÷ 3.5 = 114 ≥ 50; main room 237 m² ≥ 175; + 16 in the day shelter |
| 12 | Loading | rule 10 | DC 2,134 m² → 2 (5.2.5); refuge → 1 (5.2.3); clinic < 500 m² → 0 (5.2.9). 3 Class B bays |
| 13 | Exits apart | rule 6 | Clinic 28.0 ≥ 15.7 m; storey 2 DC 30.6 ≥ 20.4; hall 30.6 ≥ 24.8 (door to door) |
| 14 | Exterior discharges | rule 6 | Edge to edge (J.B. 9 Nov): P1–P2 30.6 ≥ 6.0; S1–S2 37.8 ≥ 9.0; P2–S1 6.2 ≥ 6.0 (S1 moved 0.4 m east). S1's door is 14.9 m from 1st Ave E at its near edge (15.3 at its centre): within 15 m only at the near edge (?) |
| 15 | Travel | rule 6 | Worst: hub 23.7, clinic 18.8, storey 2 33.9, hall 29.1 m ≤ 45. Dead ends along the centreline, to the end wall: public 1.5, clinic 1.8, secure 5.5 m ≤ 6 |
| 16 | Height | rule 7 | 21.2 − base surface 4.9 (under the building's front SE corner) = 16.3 m ≤ 18.3 |
| 17 | Hub washrooms | Part 1 | Load 640 (area ÷ 0.75) → 320 a sex → 6 M + 11 F; drawn 6 M + 12 F. Every room meets its minimum width (`eh/audit_rooms.py`) |
| 18 | T-reach | rule 15d | PASS (R0–R7) |
| 19 | Floor area | I-3 3.1.1.1 | 3,300 m² ÷ 4,503 m² site = 0.73 ≤ 3.00 |

## 8. Open questions for J.B.
24. ~~Secure exit into the plant yard~~: counts if the yard gate to the street is drawn and opens from inside without a key; label "our reading". Public and clinic exits still never go through a plant yard (rule 6) (J.B., 9 Nov, final gate). Gates drawn on 4103, 64 Airport Rd and 14715 (1.1 m: tight). Second independent check (`eh/remeasure12/`): no fails; `yardgate.py` v3 then made obstacles never waivable near a door or gate, checks the whole gate against drives, aprons, aisles and walkways, and checks that every truck route crosses the yard fence at a drawn vehicle gate (64 Airport Rd's widened to the full apron). v3 is self-checked only. Independent check of the routes (9 Nov, `eh/remeasure11/`): routes ≥ 1.1 m from every secure yard door, including the DC staff entrance on 64 Airport Rd and 14715 that the first script missed; `eh/yardgate.py` rewritten to read the drawn gates and to fail public or clinic doors into a yard. The check also found the 14715 yard polygon copied from 64 Airport Rd and the drive and apron crossing the yard fence: 14715's yard redrawn, vehicle gates drawn on both. Was: Rule 15b as first written excluded exits into a plant yard for every corridor; rule 6 bans them for public and clinic corridors only. On the three Edmonton fits the secure corridor's second exit passage ends in the plant yard: counted, the dead end is 0.2 m; not counted, 40.2 m (fails). The yard's gate to the street is not drawn either way. Does a secure-line exit into the data centre's own fenced plant yard count, if the yard has a gate to the street? (Boards show it as "to approve".)
25. ~~Data-centre support room sizes~~: offices, break room, shipping and storage are reference sizes, not minimums (J.B., 9 Nov, final gate). Was: Part 1b's offices, break room, shipping and storage figures come from one filed plan (burlingtonPlans2026). Several fits draw them smaller (offices 24–60 m² vs 100; break 22.5 vs 24; 1330 shipping 38.5 vs 45). Now labelled reference sizes, not minimums; confirm.

Still open: 7 (pads below the FCL, research), 11 (paywalled standards), the 1330 Glen Dr drive (aisle relaxation, Part 4), and the Edmonton lot shapes not drawn yet: small, narrow-deep, wide-shallow, irregular (Part 4). Everything else is decided.
1. ~~Large-lot rule~~: (a) with Vancouver's cap in both cities (J.B., 8 Nov).
2. ~~Spare floor~~: refuge and shelter first, then clinic, then "unassigned" (J.B., 8 Nov).
3. ~~Overnight shelter~~: day size only in I-2/I-3; overnight only where listed or as a flagged rezoning variant (J.B., 8 Nov).
4. ~~Refuge minimum~~: 50 people (J.B., 8 Nov).
5. ~~Edmonton refuge use class~~: the refuge is a Community Service (Zoning Bylaw 20001 3.12.1, 500 m² cap per establishment) (J.B., 9 Nov, final gate). On the three Edmonton fits the refuge, shelter and their rooms come to 483 m² (lobby excluded) ≤ 500: tight, 3.4 % under. Was: Our reading needed. 64 Airport Rd: refuge + shelter 326 m², under 500 either way.
6. ~~8238 Fraser St chillers (EVAPCO figures)~~: superseded by question 8 (Vertiv zones). Option (c), chillers over the hall, is ruled out (J.B., 8 Nov).
7. **To research once:** transformers and generator pads below the FCL on Vancouver flood-plain lots (CSA C282, BC Hydro, insurer).
8. ~~8238 Fraser St, chillers~~: S2 moved, 2 chillers, about 0.96 MW (J.B., 8 Nov). Drawn: 0.94 MW. Was: (b) plant yard: 2 chillers fit end to end (32.7 m) beside the 3 generators, but then the 2 transformer pads do not fit; 3 do not fit. (a) 2 chillers on the lower roof: the roof is 15.3 m long against 16.3 m needed, because the storey-3 corridor to S2 crosses it. Ways on: move S2 so the storey-3 corridor goes (roof becomes 17.3 m, enough for 2 chillers), or put the pads elsewhere in the yard (not found yet), or "doesn't fit" with this limiting dimension.
9. ~~Edmonton IH representative lots~~: keep BE; every Edmonton hub needs rezoning (J.B., 8 Nov). Was: none of the 12 Edmonton representative lots is IH, where a data centre is outright. Pick IH representatives (A1 is frozen: Code and J.B.)?
10. ~~Data-centre size~~: hub cap on every lot, smaller where a lot can't hold it (J.B., 8 Nov). Was: the fits so far use the tool's tested MW, capped at the large-lot size (≤ 2,325 m² of data centre, one hall storey). 4103 97 St (tool 7.6 MW) is drawn at the cap; 1353 Pender St E (tool 3.0 MW) under it. Confirm the cap applies to every lot type, or give the rule (it decides the 64 Airport Rd redraw: 3.7 MW, two hall storeys, before).
12. ~~Dead ends~~: strict reading, every corridor; all fits re-planned (seven then, J.B., 8 Nov; 8980 drawn to it after). Was: measured as the corridor beyond the last point with two ways to an exit (the lobby), every fit fails (1330 14 m, 339 23 m, 8238 22 m, 1353 7 m, Edmonton 21 m). Measured as corridor past the last door it serves, all pass. Which reading? If the first, every plan needs an exit at the far end of its public corridor (re-plan of all seven).
13. ~~Lobby "touch"~~: a door or opening; a shared fire-rated wall is allowed (J.B., 8 Nov). Was: 1330 Glen Dr's lobby shares a 2 h wall (no door) with data-centre stair S4. Does "touch" mean share a wall, or share a door? If a wall, 1330 needs a re-plan.
15. ~~Dead ends, where measured~~: along the corridor centreline, strict (J.B., 8 Nov); 8980, 339 and 1353 re-planned.
16. ~~Rooms off the hall~~: rooms serving the hall only may open off it, travel ≤ 45 m (J.B., 8 Nov); 1330 passes.
17. ~~Exit passages on the secure side~~: allowed; a passage serves one side only (J.B., 8 Nov); Edmonton passes.
14. ~~Tables and thresholds~~: washroom rows and loading thresholds in Part 1 and rule 10; step-free is 13 mm (rule 12); tanks ÷ duty sets; chiller panel end to the access path; pad front to the drive or aisle (all J.B., 8 Nov). Was: put the VBBL/NBC Table 3.7.2.2.-A and -B rows in Part 1; put the loading thresholds (Parking By-law 5.2.3, 5.2.5, 5.2.9; Edmonton Table 7.2: 2,500 / 7,500 m², 9.0 × 3.3 × 4.0 m) and the I-2 yards (0 / 0 / 3.1 m) in rules 10 and 13; tank per set = 12 h ÷ duty sets (the +1 spare not counted), as the tool does; the 0.2 m step-free tolerance applies to every entrance; chiller panel end and pad front not defined (either end accepted).
18. ~~1330 Glen Dr, second exit~~: accepted with a protected walkway along the drive to Glen Dr, flagged as the small-lot exception to rule 6 (J.B., 9 Nov).
19. ~~Plant yards~~: data-centre space; exits beside on their own fenced walkway, never through (J.B., 9 Nov). Re-planned: 1353 (passage to Pender St), 8980 (building 2.1 m south, 2.1 m walkway along the north face), 339 (walkway beside the drive), 64 Airport Rd and 14715 (clinic passage onto a walkway outside the plant-yard fence). 8238's walkway runs beside.
20. ~~Refuge egress doors~~: 0.75 m² a person (VBBL Table 3.1.17.1); over 60 people needs two doors ≥ ⅓ diagonal apart (J.B., 9 Nov). Every fit re-checked; shelters given second doors.
21. ~~Load a walkway carries~~: even split accepted, each exit at least its share and at least half where there are two (3.4.3.2.(7)); joined walkways carry the sum (J.B., 9 Nov).
22. ~~Exterior stair discharges, how measured~~: edge to edge (J.B., 9 Nov). 339 and 8980: stair S1 moved 0.4 m east (all storeys), P2–S1 now 6.2 m ≥ 6.0.
23. ~~"Within 15 m of a street"~~: dropped (J.B., 9 Nov, code level): a measurement refinement under 0.5 m; listed under weaknesses as detailed design. The near-edge reading stands and the row stays on the 339 board as tight. Note (final check, 9 Nov): measured at S1's door centre (15.3 m), the 9 m discharge spacing would apply and P2–S1 (6.2 m) would fail on 339 and 8980: check in design.
11. **Paywalled, for UBC Library:** CSA Z8000, ANSI/TIA-942 (add to `checks/paywalled_standards.md`).
