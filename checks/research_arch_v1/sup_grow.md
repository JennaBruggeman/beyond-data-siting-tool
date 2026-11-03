# Group D (sup_grow): what each grow / energy massing contains

Research 2 Nov 2026 per BRIEF_support.md and BRIEF.md. New ids → `sup_grow_sources.json` (`arch_sup_*`). Reused register ids are not repeated there: arch_etsBaieComeau, arch_pg_edmMuttartPyr, arch_pg_williamsMuttart, arch_pg_edmMuttartGH, arch_pg_vanVDBStrategy2021, arch_edmZB20001_BE, arch_edmEastglen2017, arch_fish_savidov2015, arch_fish_bergman2020, arch_per_nbcWC, arch_hsg_abGFNA2021, arch_r2_vaLaundry2022, arch_adj_bcFPR, arch_hsg_ihFoodPlans2026, arch_pg_fplDH2008, arch_pg_ukyKiln, arch_sys_ubcAdes2019, arch_sys_ubcCecBldg, neuETS.

"?" = not found. "our arithmetic" = ours, not the source's. Codes: NBC 2020; BCBC 2024, NBC(AE) 2023 and VBBL 2025 Table 3.7.2.2.-A checked against the repo copies: they match.

## Key findings first

- **Conservatory:** a small working one (one ≈390 m² biome) grosses **≈480–500 m²** (our arithmetic). That is about a third of the catalogue's 1,400 m², which is the Bloedel dome alone with no support. It also lands near Edmonton BE's **500 m² cap**.
- **Greenhouse:** a headhouse of **≥10 %** (US extension guide) plus a universal washroom takes the 153 m² Baie-Comeau house to **≈181 m² gross**, or **≈199 m²** with an 18 m² heat-transfer room (our arithmetic).
- **Fish farm:** support areas are small, but the footprint per tonne varies a lot between sources: **10 m² per t** (FAO; per t/yr is our reading), **≈12 m²** (LSU) and **≈28 m²** (Alberta model). For 36 t/yr that gives **≈360–1,000 m²** (our arithmetic). The catalogue's 1,000 m² sits at the top of the range.
- **Food drying and lumber drying:** still no m² source (?). Only the code fixtures and the kiln stacking clearances are sourced.
- **Heat plant:** UBC's **41–44 m² per MW** is already a gross building figure, so the catalogue step stays. A network connection room is **6 × 3 m** (Vancouver NEU).

## Shared support rules (all programs)

| part | m² or ratio | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Washroom occupant load | from 3.1.17.1, "equally divided between males and females" | arch_sup_nbcA3722 | 3.7.2.1.(1), 3.7.2.2.(1) | rule | 95 |
| Industrial: staff-only load | load may be "based solely on the total number of staff" if occupants are transitory | arch_per_nbcWC | 3.7.2.1.(2) | rule | 90 |
| One WC for both sexes | occupant load "not more than 10" (VBBL: 25) | arch_per_nbcWC | 3.7.2.2.(2) | rule | 90 |
| Assembly (A-2) WCs per sex | M/F: 1–25 → 1/1; 26–50 → 1/2; 51–75 → 2/3; 76–100 → 2/4; … 351–400 → 6/12 | arch_sup_nbcA3722 | Table 3.7.2.2.-A | rule | 95 |
| Industrial (F) WCs per sex | 1–10 → 1; 11–25 → 2; 26–50 → 3 | arch_per_nbcWC | Table 3.7.2.2.-C | rule | 90 |
| Lavatories | 1 per room with 1–2 WCs, +1 per 2 more | arch_sup_nbcA3722 | 3.7.2.3.(1) | rule | 95 |
| Universal washroom required | BC/VBBL: "at least one universal washroom ... in the entrance storey" where WCs are required | arch_per_nbcWC | BCBC 3.8.2.8.(4) | rule | 90 |
| Universal washroom turning space | "not less than 1 700 mm in diameter" | arch_sup_bcbc3813 | BCBC 3.8.3.13.(1)(j) | rule | 95 |
| Universal washroom net area | **4.6 m²** (door out/sliding); **5.5 m²** (door in) | arch_sup_abGFNArooms | Z-7, p. 10 | government guide (healthcare, AB) | 70 |
| Staff lockers | 0.1 m² per locker footprint, plus circulation | arch_sup_abGFNArooms | Z-14, p. 11 | government guide (healthcare) | 60 |
| Staff break area | 0.4 m² per FTE (kitchenette + dining) | arch_sup_abGFNArooms | Z-10, p. 10 | government guide (healthcare) | 60 |
| Janitor room | 7.0 m² decentralised | arch_sup_abGFNArooms | M-10, p. 9 | government guide (healthcare; by analogy) | 45 |
| Grossing: recreation facilities | "1:1.3 to 1:1.5" | arch_edmEastglen2017 | p. 23 | government (functional program) | 80 |
| Grossing: AB community health centre | component 1.20–1.26, circulation 1.14–1.18, core mech/elec 1.05–1.07, "compounded" | arch_hsg_abGFNA2021 | building grossing table, p. 13 (printed table number unclear: 3 or 4 ?) | government guide | 75 |
| Grossing: industrial-type department (US) | net → department 1.15; building 1.35 | arch_r2_vaLaundry2022 | s. 3.C | US government benchmark | 50 |
| Occupant load of an exhibition space | not in Table 3.1.17.1; "number of persons for which the area is designed" + posted sign | arch_sup_nbcA3722 | 3.1.17.1.(1)(c), (2) | rule | 90 |

## D1. Greenhouse (small, next to a data centre)

| part | m² or ratio | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Main: growing house | **153 m²** (Baie-Comeau, data-centre heat) | arch_etsBaieComeau | summary | university summary | 70 |
| Headhouse (offices, storage, planting/harvest) | "at least 10% of the greenhouse area" → **≥15.3 m²** (our arithmetic) | arch_sup_purdueHO346 | p. 2 | US university extension (benchmark) | 60 |
| Headhouse contents | "work area ..., receiving and shipping area, utility room, office and employee room"; storage overhead | arch_sup_bartokRMRS2002 | pp. 354–357 | US government proceedings (benchmark) | 60 |
| Washroom | staff ≤10 → 1 WC both sexes; universal washroom required (BC, 3.8.2.8.(4)); **4.6 m²** (AB healthcare guide, by analogy) | arch_per_nbcWC; arch_sup_abGFNArooms | 3.7.2.2.(2); Z-7 | rule; guide | 65 |
| Heat-transfer room | if fed like a NEU building: ETS room **6 × 3 m = 18 m²**, ≥2.7 m high | neuETS | s. 6.1 Table 1 | government guide (by analogy) | 45 |
| Staff count | ? | — | — | — | — |
| Building ÷ production area (AB) | 9,043 ÷ 8,637 ≈ **1.047** (tomato; the two tables may conflict; large commercial houses, benchmark only) | arch_sup_abGhVeg2018 | Tables 7, 8, p. 10 | government guide + our arithmetic | 40 |
| **Gross (our arithmetic)** | (153 + 15.3 + 4.6) × 1.047 ≈ **181 m²**; + 18 m² ETS-type room ≈ **199 m²** | above | — | our arithmetic | 40 |
| vs catalogue | typical 153 m² → **+18 to +30 %** | tool/arch_programs.json | size.typical_m2 | — | — |

## D2. Botanical conservatory

| part | m² or ratio | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Main, smallest Canadian biome | Muttart arid "4,200 square feet" ≈ **390 m²** | arch_pg_edmMuttartPyr | Arid section | government (operator) | 80 |
| Main, whole conservatory | Bloedel "0.14 hectare" dome ≈ 1,400 m²; Muttart pyramids 2 × 660 + 2 × 410 = 2,140 m² (our arithmetic) | arch_pg_vanVDBStrategy2021; arch_pg_williamsMuttart | p. 4; page | government; consultant claim | 60 |
| Production greenhouse | Muttart "3,870-square-foot" ≈ 360 m² ≈ **17 % of the display area** (our arithmetic, ÷ 2,140) | arch_pg_edmMuttartGH; arch_pg_williamsMuttart | article | government blog; consultant | 50 |
| Other support glass | "six supporting greenhouses"; temporary tropical house "44 x 12 metre" (528 m²) | arch_pg_williamsMuttart; arch_pg_edmMuttartGH | — | consultant; government blog | 50 |
| Visitor washrooms | A-2, Table 3.7.2.2.-A by occupant load; load = designed number + sign (N ?) | arch_sup_nbcA3722 | 3.1.17.1.(1)(c); Table 3.7.2.2.-A | rule | 90 |
| Universal washroom | **4.6 m²** | arch_sup_abGFNArooms | Z-7 | government guide | 65 |
| Entry / reception, shop, office, mechanical, electrical, plant storage | ? | — | — | — | — |
| Grossing (support only) | 1.3–1.5 (recreation facility, by analogy) | arch_edmEastglen2017 | p. 23 | government | 50 |
| **Gross, small (one biome)** | 390 + (65.5 production glass, = 390 × 16.8 % + 4.6) × 1.3–1.5 ≈ **481–495 m²** (WCs beyond one universal ?) | above | — | our arithmetic | 35 |
| **Gross, Bloedel-size** | 1,400 + (235 + 4.6) × 1.3–1.5 ≈ **1,711–1,759 m²** | above | — | our arithmetic | 35 |
| vs catalogue | typical 1,400 m² (dome only) → small working ≈ **−65 %**; same-size ≈ **+22–26 %** | tool/arch_programs.json | — | — | — |
| Edmonton cap | BE (Major Indoor Entertainment, 2.11; use class is our reading): "The maximum Floor Area is 500 m2 per individual establishment" → the small version just fits; 3.18 allows a variance | arch_edmZB20001_BE | 3.3.1 (local copy sources/library/_large/edm_bl20001) | rule | 80 |

## D3. Fish farm (tilapia RAS)

| part | m² or ratio | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Main, AB model | "Area for Tilapia production = 1,000m2" for 36 t/yr | arch_fish_savidov2015 | tilapia slide | government researcher | 60 |
| Tanks in that area | "32 tanks – 10 feet round" ≈ 234 m² of tank = **≈23 %** (our arithmetic) | arch_sup_savidovTanks | slide "Tilapia production" | government researcher | 55 |
| Main, LSU model (US) | "5,990 square feet greenhouse" ≈ 557 m² for "100,000 pounds" ≈ 45 t → **≈12.3 m² per t/yr** (our arithmetic) | arch_sup_lsuGhTilapia1998 | pp. 7–8 | US extension (benchmark) | 55 |
| Tanks in that area | 3 tanks "16 feet wide by 80 feet long" = 357 m² = **≈64 %** (our arithmetic) | arch_sup_lsuGhTilapia1998 | p. 7 | our arithmetic | 50 |
| Footprint rule of thumb | "roughly about 1 000 m2 per 100 tonnes fish" → **10 m² per t** (tonnes basis not stated; per t/yr is our reading) | arch_sup_faoRasGuide2022 | p. 54 | intergovernmental guide | 60 |
| Grow-out land (Sweden) | 33 m²·a per t | arch_fish_bergman2020 | Table 1 | peer-reviewed (benchmark) | 70 |
| Filtration | bead filters named; m² ? | arch_sup_lsuGhTilapia1998 | p. 8 | — | — |
| Feed storage | "adjoining storage area"; m² ? | arch_sup_lsuGhTilapia1998 | p. 8 | — | — |
| Office + washroom | "office and restroom" (m² ?); staff ≤10 → 1 WC; universal **4.6 m²** | arch_sup_lsuGhTilapia1998; arch_per_nbcWC; arch_sup_abGFNArooms | p. 8; 3.7.2.2.(2); Z-7 | guide; rule | 60 |
| Staff | "One full-time laborer ... and one quarter-time laborer" + owner | arch_sup_lsuGhTilapia1998 | p. 9 | US extension | 55 |
| Purge, harvest, packing | ? (no Canadian room size; licence route in fish_species.md) | — | — | — | — |
| **Gross for 36 t/yr (our arithmetic)** | FAO ≈ **360 m²**; LSU ≈ **442 m²**; AB ≈ **1,000 m²** + ≈5 m² staff rooms + ? | above | — | our arithmetic | 40 |
| vs catalogue | typical 1,000 m² = top of range; low end ≈ **−64 %** | tool/arch_programs.json | — | — | — |

## D4. Food drying

| part | m² or ratio | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Main: dryer room per throughput | ? | — | — | — | — |
| Food premises | plans approved by health officer; separate from areas "incompatible with the safe handling of food" | arch_adj_bcFPR | s. 3(1), 4(1)(d) | rule | 85 |
| Washrooms | may not open into food rooms; separate hand sinks | arch_hsg_ihFoodPlans2026 | pp. 2, 4 | government guide (BC) | 75 |
| Washroom count | F-2/F-3 by staff (Table 3.7.2.2.-C); universal 4.6 m² | arch_per_nbcWC; arch_sup_abGFNArooms | — | rule; guide | 65 |
| Storage, packing, office, mechanical | ? | — | — | — | — |
| Grossing | 1.15 department / 1.35 building (US industrial-type, by analogy) | arch_r2_vaLaundry2022 | s. 3.C | US benchmark | 35 |
| **Gross** | ? | — | — | — | — |
| vs catalogue | catalogue null; no change | — | — | — | — |

## D5. Lumber drying (kiln)

| part | m² or ratio | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Smallest kilns | DH "approximately 600 board feet of 4/4" lumber"; solar "750 to 1,000 board feet" | arch_sup_osuDHkiln2007; arch_sup_vtSolarKiln2020 | p. 1; text | US government-funded / extension | 60 |
| Stack clearances | DH: "12 inches" front, "30 inches" rear (dehumidifier side); solar: "1-foot clearance on either side" | arch_sup_osuDHkiln2007; arch_sup_vtSolarKiln2020 | p. 4; text | US extension | 60 |
| Kiln chamber m² per bf | ? (no source prints chamber dimensions) | arch_pg_fplDH2008 | — | — | — |
| Commercial kiln sizes | DH 4,000–20,000 bf total; steam ≥40,000 bf | arch_pg_ukyKiln | text | US extension | 65 |
| Lumber storage / stacking yard, forklift aisle | ? | — | — | — | — |
| Washroom | F-2 by staff; universal 4.6 m² | arch_per_nbcWC; arch_sup_abGFNArooms | — | rule; guide | 60 |
| **Gross** | ? | — | — | — | — |
| vs catalogue | catalogue null; no change | — | — | — | — |

## D6. Neighbourhood heat plant room

| part | m² or ratio | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Whole plant (boilers) | 3 × 15 MWt in "1,858 m2" (DP) / "2000.000 sq. m" → **41–44 m² per MW gross** (our arithmetic) | arch_sys_ubcAdes2019; arch_sys_ubcCecBldg | p. 5; pages | institution | 60 |
| Heat-pump plant per MW | ? (False Creek Energy Centre has 10 MW sewage heat + 24 MW boilers, floor area not published ?) | — | — | — | — |
| Network connection (ETS) room | **6 × 3 m** (<13,940 m² building), 6 × 4 m to 23,230 m²; headroom ≥2.7 m; double door ≥1.83 m | neuETS | s. 6.1, Table 1 | government guide | 85 |
| Electrical room, control room, office | ? | — | — | — | — |
| Washroom | staff-based load (3.7.2.1.(2)); AB: none for "low human occupancy" (3.7.2.1.(6)) | arch_per_nbcWC | — | rule | 80 |
| Grossing | already gross (UBC figure) | — | — | — | — |
| vs catalogue | step 44 m²/MW matches; no change | tool/arch_programs.json | size.step | — | — |

## Gaps "?"

- Washroom and support m² from a Canadian non-healthcare source (the AB figures are healthcare room types).
- Conservatory: entry, shop, office, plant rooms and design occupant load; Muttart or Bloedel total gross floor area.
- Greenhouse: staff count and a Canadian headhouse ratio (AB guide names a "packing shed/header house" but gives no size).
- Fish farm: filtration, feed, purge and packing rooms in m²; a Canadian building plan.
- Food drying: dryer m² per kg/h and any facility layout.
- Lumber kiln: chamber m² per board foot and yard size.
- Heat plant: heat-pump m² per MW; electrical room size.
- Blocked or form-gated: Eurofish download form (skipped); fao.org refused a direct download from this session (read through the web reader only).

Check 2 applied (2 Nov 2026)

Check 3 applied (2 Nov 2026): all "our arithmetic" re-done and confirmed; BE clause 2.12 → 2.11; page fixes; rows citing reused ids checked against the register.
