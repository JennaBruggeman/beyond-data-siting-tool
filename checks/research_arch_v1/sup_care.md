# Group B (sup_care): what a small working massing contains (2 Nov 2026)

Refuge, warming shelter (day and overnight), outpatient clinic, community kitchen. Ids match sup_care_sources.json or register new_sources. "?" = not found. "our arithmetic" = Claude's sums, not a source.

**Method.** Main space + support rooms = net. Net × grossing factor = gross. Room sizes from Alberta healthcare guide (GFNA 2021) or Edmonton Eastglen program are used **by analogy** outside their building type; marked so.

**Common rules used**

| rule | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Assembly WCs (A) | per sex: 1–25 → 1 M / 1 F; 26–50 → 1 M / 2 F; 51–75 → 2 / 3 | arch_sup_nbcWashrooms | NBC Table 3.7.2.2.-A, p. 3-170; BCBC same | rule | 90 |
| Care / residential WCs | ≥1 per 10 persons of each sex | arch_sup_nbcWashrooms | 3.7.2.2.(8) | rule | 90 |
| Business (D) WCs | per sex: 1–25 → 1; 26–50 → 2 | arch_per_nbcWC | Table 3.7.2.2.-B | rule | 90 |
| One shared WC | both sexes on one WC if load ≤10 (NBC, BCBC, NBC(AE)); ≤25 in VBBL | arch_sup_nbcWashrooms; arch_per_nbcWC | 3.7.2.2.(2) | rule | 85 |
| Lavatories | 1 per room with 1–2 WCs, +1 per 2 more | arch_sup_nbcWashrooms | 3.7.2.3.(1) | rule | 90 |
| Universal washroom | ≥1 at each washroom location on a barrier-free storey (not inside a care/residential suite, 3.8.2.8.(3)); 1,700 mm turning circle; no m² in code | arch_sup_nbcWashrooms | 3.8.2.8.(1); 3.8.3.13.(1)(j), pp. 3-183–184 | rule | 90 |
| Universal shower room | where showers serve public or staff: ≥1 universal dressing and shower room | arch_sup_nbcWashrooms | 3.8.2.8.(13) | rule | 90 |
| Single BF washroom, size | 4.6 m² (outswing/sliding door); 5.5 m² (inswing) | arch_sup_abGFNARooms | Table 3 Z-7, p. 10 | government guide (AB healthcare; used by analogy elsewhere) | 75 |
| Occupant densities | dining 1.20 m²/p; offices 9.30; kitchens 9.30; dormitories 4.60; sleeping rooms (care) 10.00 | arch_pub_nbc31171; arch_sup_nbcOccLoadOther | Table 3.1.17.1, pp. 3-43–44 | rule (egress loads, not comfort sizes) | 90 |
| Recreation grossing | "1:1.3 to 1:1.5 is within the range common for recreation facilities"; circulation "in the order of 15%" | arch_edmEastglen2017; arch_sup_eastglenRooms | p. 23 | government (functional program) | 80 |
| Recreation grossing (component) | 1.10 (arena) to 1.35 (admin) by component; new build + 18 % grossing allowance | arch_sup_edmMillWoodsFP2013 | Table 2, p. 1-8 | government (functional program) | 65 |

## 1. Refuge (warming / cooling / cleaner-air room), 50 people

| part | m² or ratio | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Main room | 50 × 3.5 = 175 net (catalogue); wheelchair/assistance users up to 9 m² each, share ? | arch_ahsReceptionCentres; arch_edmExtremeWeather | p. 4; Extreme Cold | government guide (use by analogy) | 75 |
| Washrooms (code) | 25 per sex → 1 M + 1 F + 1 universal | arch_sup_nbcWashrooms | Table 3.7.2.2.-A; 3.8.2.8.(1) | rule (A-2 assumed, our reading) | 80 |
| Washrooms (AHS) | 1 toilet per 20–25 → 2–3; final by AHJ | arch_ahsReceptionCentres | p. 5 | government guide | 85 |
| Washroom area | 3 × 4.6 = 13.8 (our arithmetic) | arch_sup_abGFNARooms | Z-7, p. 10 | analogy | 60 |
| Drinking water | required; 2 L/p/day | arch_vchCoolingSpaces; arch_ahsReceptionCentres | p. 5; p. 4 | government guide | 85 |
| Staged entry vestibule (cleaner air) | required feature; m² ? | arch_hcCleanerAirSpaces | building features | government guide | 85 |
| Filtration plant | MERV 13+ in HVAC, or portable cleaners CADR 2–3 × room volume/h; plant m² ? | arch_hcCleanerAirSpaces | HVAC section | government guide | 85 |
| Emergency power (electrical) | cleaner-air space on emergency power; room m² ? | arch_hcCleanerAirSpaces | building features | government guide | 85 |
| Staff office | 8 (Eastglen foreman office, analogy) | arch_sup_eastglenRooms | 2.3, p. 38 | analogy | 55 |
| First aid | 6 (Eastglen, gurney access) | arch_sup_eastglenRooms | 2.5, p. 40 | analogy | 55 |
| Storage (cots, supplies) | ? | — | — | — | — |
| **Net** | 175 + 13.8 + 8 + 6 = **202.8** (our arithmetic) | — | — | our arithmetic | — |
| Grossing | 1.3–1.5 (recreation) | arch_edmEastglen2017 | p. 23 | government (FP) | 70 |
| **Gross** | **≈264–304 m²** (our arithmetic) vs catalogue **175** (net only): +51 to +74 % | — | — | our arithmetic | 60 |

## 2. Warming shelter, 16 guests (Vancouver centre size)

Staffing for both: "a minimum of two Community Services staff plus one security guard" (arch_pub_vanWarm2021); VBBL temporary shelter ≥1 staff per 20 spaces (arch_ref_vbblPart13, 13.4.4.1.(1)(b)).

### 2a. Day (seated / resting)

| part | m² or ratio | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Resting area | 3.5 m²/client → 56 | arch_sup_torRespite; arch_ahsReceptionCentres | 9.3.1(h); p. 4 | government standard (ON benchmark); AB guide | 80 |
| Toilets | 1 per 15 → 2; ≥1 barrier-free, non-gender | arch_sup_torRespite | 9.3.2(a)(i),(iii) | government standard (ON) | 80 |
| Shower | ≥1 barrier-free, non-gender shower per site; 1 per 20 → 1; universal dressing/shower room → 6 (Eastglen universal change, analogy) | arch_sup_torRespite; arch_sup_nbcWashrooms; arch_sup_eastglenRooms | 9.3.2(a)(ii),(vi); 3.8.2.8.(13); 3.1, p. 47 | standard / rule / analogy | 65 |
| Toilets (code) | 8 per sex → 1 M + 1 F; one shared allowed in VBBL (≤25) | arch_sup_nbcWashrooms; arch_per_nbcWC | Table A; 3.7.2.2.(2) | rule | 85 |
| Washroom area | 2 × 4.6 = 9.2 (our arithmetic) | arch_sup_abGFNARooms | Z-7 | analogy | 60 |
| Staff office | 8 | arch_sup_eastglenRooms | p. 38 | analogy | 55 |
| Storage, lockers | ? | — | — | — | — |
| **Net** | 56 + 9.2 + 6 + 8 = **79.2** | — | — | our arithmetic | — |
| **Gross** (× 1.3–1.5) | **≈103–119 m²** vs catalogue **56** | arch_edmEastglen2017 | p. 23 | our arithmetic | 55 |

### 2b. Overnight

| part | m² or ratio | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Sleeping | Vancouver temporary shelter ≤1 bed per 3.7 m², 900 mm aisles both sides → 16 × 3.7 = 59.2 | arch_ref_vbblPart13 | VBBL 13.4.4.1.(1)(c),(d) | rule (temporary shelter in an existing building only; new work = new-construction rules) | 85 |
| Sleeping (benchmark) | ≥3.5 m²/client; beds 0.75 m apart; mattress 0.76 × 1.82 m | arch_sup_torTSS2022 | 9.3.1(c),(e),(h) | government standard (ON) | 80 |
| Dining / day room | must be separate from sleeping; 16 × 1.20 = 19.2 (code density as floor, our arithmetic) | arch_sup_torTSS2022; arch_pub_nbc31171 | 9.3.1; Table 3.1.17.1 | standard + our arithmetic | 55 |
| Food | VBBL temporary: no cooking but microwave reheating → servery only, m² ? | arch_ref_vbblPart13 | 13.4.4.1.(1)(a) | rule | 85 |
| Toilets | VBBL 1 per 20 → 1; Toronto 1 per 15 → 2; NBC care/residential 1 per 10 per sex → 2 | arch_ref_vbblPart13; arch_sup_torTSS2022; arch_sup_nbcWashrooms | 13.4.4.1.(1)(j); 9.3.2(a)(ii); 3.7.2.2.(8) | rule / standard | 80 |
| Lavatories | VBBL 1 per 5 WCs; Toronto 1 per 15 clients → 2 | arch_ref_vbblPart13; arch_sup_torTSS2022 | (k); 9.3.2 | rule / standard | 80 |
| Washroom area | 2 × 4.6 = 9.2 | arch_sup_abGFNARooms | Z-7 | analogy | 60 |
| Shower | 1 per 20 → 1; universal dressing/shower room required → 6 (Eastglen universal change with shower/WC) | arch_sup_torTSS2022; arch_sup_nbcWashrooms; arch_sup_eastglenRooms | 9.3.2(a)(v); 3.8.2.8.(13); 3.1, p. 47 | standard / rule / analogy | 65 |
| Laundry | 6 (Eastglen laundry, analogy); TSS machine ratio ? | arch_sup_eastglenRooms | 2.11, p. 46 | analogy | 45 |
| Staff office | 8 | arch_sup_eastglenRooms | p. 38 | analogy | 55 |
| Lockers / storage | "lockers or other secure forms of storage"; m² ? | arch_sup_torTSS2022 | 9.3(b) | standard | 75 |
| **Net** | 59.2 + 19.2 + 9.2 + 6 + 6 + 8 = **107.6** | — | — | our arithmetic | — |
| **Gross** (× 1.3–1.5) | **≈140–161 m²** vs catalogue **56**: ≈2.5–2.9 × | arch_edmEastglen2017 | p. 23 | our arithmetic | 55 |

## 3. Outpatient clinic (UPCC), 13 exam rooms (North Vancouver: 604 m², 13 exam, 1 treatment, 3 stretcher bays)

| part | m² or ratio | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Exam rooms | 13 × 12.0 = 156 | arch_hsg_abGFNA2021; arch_hsg_vchUpccNV | Table 2, p. 7 | government guide | 85 |
| Treatment room | Procedure Room Type 1: 15.5 | arch_sup_abGFNARooms | A-3, p. 7 | government guide | 75 |
| Stretcher bays | 3 × 11.0 (Treatment Station Type 2; match is our reading) = 33 | arch_sup_abGFNARooms | A-11.2, p. 7 | government guide | 60 |
| Consult room | 12.0 | arch_sup_abGFNARooms | A-5, p. 7 | government guide | 75 |
| Medication (community) | 10.0 | arch_sup_abGFNARooms | M-3, p. 9 | government guide | 75 |
| Clean supply / soiled holding | 11.0 / 13.5 | arch_sup_abGFNARooms | M-4, M-5, p. 9 | government guide | 75 |
| Housekeeping | 7.0 (decentralized) | arch_sup_abGFNARooms | M-10, p. 9 | government guide | 75 |
| Washrooms (code) | Group D (prog_housing), offices 9.30 m²/p → ≈65 people at 604 m² → 33 per sex → 2 per sex + universal = 5 rooms (our arithmetic) | arch_per_nbcWC; arch_sup_nbcOccLoadOther; arch_sup_nbcWashrooms | Table B; Table 3.1.17.1; 3.8.2.8.(1) | rule + our arithmetic | 65 |
| Washroom area | 5 × 4.6 = 23 | arch_sup_abGFNARooms | Z-7, p. 10 | government guide | 70 |
| Staff lounge | 0.4 m²/FTE (kitchenette & dining) × 14 FTE practitioners = 5.6; other staff ? | arch_sup_abGFNARooms; arch_hsg_vchUpccNV | Z-10, p. 10 | government guide | 65 |
| Staff lockers | 0.1 m² each (footprint, excl. circulation) × 14 = 1.4 | arch_sup_abGFNARooms | Z-14, p. 11 | government guide | 65 |
| Waiting / reception | "determined by number of anticipated users"; no reception row → ? | arch_sup_abGFNARooms | Z-9, p. 10 | government guide | — |
| Offices / workroom, garbage | ? | — | — | — | — |
| **Net** | **288** (our arithmetic) | — | — | our arithmetic | — |
| Department grossing | 1.44 (CHC ambulatory): rooms + partitions + department circulation | arch_hsg_abGFNA2021 | p. 12 | government guide | 85 |
| Building grossing | circulation 1.14–1.18 × core mech/elec 1.05–1.07, compounded = 1.20–1.26 (the "Component" row equals this product, our arithmetic); adds building circulation, mech/elec, exterior walls | arch_hsg_abGFNA2021; arch_sup_abGFNARooms | Table 4, p. 13 | government guide | 80 |
| **Gross** | 288 × 1.44 × 1.20–1.26 = **≈498–523 m²** (our arithmetic) | — | — | our arithmetic | 65 |
| Check vs real | North Vancouver 604 m²: the ≈81–106 m² gap ≈ waiting, reception, offices (?) | arch_hsg_vchUpccNV | — | our arithmetic | 55 |
| vs catalogue | typical 767 (median of 4) holds; **step 17.3 m² per exam room is too low**: whole clinic ≈38–40 m² gross per exam room (built) or 46.5 (604 ÷ 13) | — | — | our arithmetic | 60 |

## 4. Community kitchen (teaching, ~12 participants)

| part | m² or ratio | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Kitchen | size "varies greatly"; walkways for ≈12 people; no m² | arch_hsg_vanKitchenDG2018 | s. 3.i, 3.iii–iv | government guide | 75 |
| Kitchen, indicative | 12 × 9.30 (code kitchen density) = 111.6: the area at which code load reaches 12, **not a size rule** | arch_sup_nbcOccLoadOther | Table 3.1.17.1 | our arithmetic | 30 |
| Dining (required next to kitchen) | 12 × 1.20 = 14.4 (code floor) | arch_hsg_vanKitchenDG2018; arch_pub_nbc31171 | 3.i; Table 3.1.17.1 | guide + our arithmetic | 50 |
| Dry storage (securable, food 6 in. off floor) | required; m² ? | arch_hsg_vanKitchenDG2018 | 3.v | government guide | 75 |
| Walk-in cooler | "should be considered"; m² ? | arch_hsg_vanKitchenDG2018 | 4.i | government guide | 75 |
| Mop sink / janitor | required; 7.0 (GFNA housekeeping, analogy) | arch_hsg_vanKitchenDG2018; arch_sup_abGFNARooms | 3.vii; M-10 | guide / analogy | 55 |
| Waste area (separated streams) | "adequate space" required; m² ? | arch_hsg_vanKitchenDG2018 | 3.viii | government guide | 75 |
| Grease interceptor | accessible (e.g. parkade); m² ? | arch_hsg_vanKitchenDG2018 | 3.x | government guide | 75 |
| Loading | area for deliveries; m² ? | arch_hsg_vanKitchenDG2018 | 3.i | government guide | 75 |
| Washrooms | ≈24 people → 12 per sex → 1 M + 1 F; Vancouver may share one (≤25) → 1 universal; Edmonton also needs ≥1 universal (3.8.2.8.(1)) unless one of the two counts — ? | arch_sup_nbcWashrooms; arch_per_nbcWC | Table A; 3.7.2.2.(2) | rule | 75 |
| Washroom area | Vancouver 4.6; Edmonton 9.2 | arch_sup_abGFNARooms | Z-7 | analogy | 60 |
| **Net** | Vancouver 137.6; Edmonton 142.2 (our arithmetic; rests on the 111.6) | — | — | our arithmetic | 30 |
| Grossing | 1.3–1.5 (recreation); food services department 1.25 (healthcare, analogy) | arch_edmEastglen2017; arch_sup_abGFNARooms | p. 23; p. 12 | government | 55 |
| **Gross** | **≈179–213 m²** (our arithmetic, low confidence) vs catalogue **null** | — | — | our arithmetic | 30 |

## Gaps (?)

- Toronto Shelter Design and Technical Guidelines: room sizes are in Section 5 (sleeping p. 160, washrooms p. 177, kitchen p. 206, laundry p. 219, service rooms p. 230); text extraction ends at p. 51; proxy blocked a direct download. Not circumvented.
- BC Housing shelter design guidelines: no public text found.
- ~~Toronto TSS toilet ratio number cut~~: resolved in Check 2 — TSS 9.3.2(a)(ii) says "up to the first onehundred (100) clients".
- Refuge: vestibule, cot/supply storage, filtration plant and emergency-power room m²; share of 9 m² users.
- Shelter: dining size (no guide), servery, laundry machine ratio, locker m², occupancy group of a permanent shelter (C assumed).
- Clinic: waiting seats, reception, offices, garbage; whether single-user all-gender rooms count for both sexes under 3.7.2.2.(1).
- Kitchen: no Canadian m² for a community or teaching kitchen in any guide or functional program read (Vancouver kitchen guide, Park Board 2025 memo, Mill Woods FP, Eastglen FP). North Shore Neighbourhood House FP link is dead (404).
- Electrical rooms: Eastglen "per code"; no m² rule found for any program.
- Analogies: GFNA (healthcare) and Eastglen (recreation) room sizes applied to refuge, shelter and kitchen are our choice, not their scope.

Check 2 applied (2 Nov 2026): source texts re-read (NBC/BCBC/VBBL local; Toronto, Alberta, Edmonton, Vancouver PDFs). Fixes: TSS 100 threshold found; SDTG 1500 mm is a 180° turn (360° = 2100 mm); NBC page refs; 2a shower added (respite 9.3.2(a)(ii)); clinic gross 498–523, gap 81–106; kitchen waste is an area; Edmonton kitchen universal washroom flagged. AHS reception, VCH cooling and Health Canada cleaner-air pages not re-read (fetch refused). Detail: checkV2_result_sup_care.json.

Check 3 applied (2 Nov 2026): all sup_care sources re-read (local NBC/BCBC/VBBL 13.4.4.1; GFNA, Toronto TSS, respite, SDTG to p. 51, Eastglen, Mill Woods, Vancouver kitchen guide by fetch). No table value changed. Source-text fixes: respite text names 'TSSS'; SDTG 1700 mm covers 95 % for a 180° turn; GFNA gross-area definition p. 5. All "our arithmetic" re-done and confirmed (refuge 202.8 → 264–304; day 79.2 → 103–119; overnight 107.6 → 140–161; clinic 288 × 1.44 × 1.20–1.26 = 498–523; kitchen 137.6 / 142.2 → 179–213). TSS 9.3.1(a) separation clause not re-found (?). arch_sup_eastglenRooms has two different texts (here and sup_wet): merge. Detail: checkV3_result_sup_care.json.
