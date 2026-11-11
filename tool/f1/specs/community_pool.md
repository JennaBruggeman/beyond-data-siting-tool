# Typology spec: Community pool

**Passed 10 Nov 2026 (J.B., final gate).** Open items stay listed as they are (Part 8 research, `testfit_open_items.md`).

**Post-gate addition, 10 Nov 2026 (no rule changed):** Edmonton lot types drawn (Part 4, "Edmonton lot types"): 15231 118 Ave NW (narrow-deep), 16075 Fort Rd NW (wide-shallow), 10003 63 Ave NW (irregular); 10004 167 St NW (small) doesn't fit. Self-checked and independently checked 10 Nov. For J.B. to note, not a change to parts 1–3.

Status before the gate: **parts 1–3 FINAL (J.B., 9 Nov 2026; her ten decisions written in, marked "J.B., 9 Nov"), with the independent check's corrections of 9 Nov written in (rounding, labels, minimum compositions: no rule changed).** Parts 5–7 passed 11 Nov 2026 (J.B.). Any change to parts 1–3 goes to J.B. first. Format and host rules copied from `eh/specs/emergency_hub.md` (FINAL 8–9 Nov); where this spec says "as hub rule n" the hub's rule applies unchanged.

The typology: **a public 25 m pool (4 lanes) and a fitness gym sharing one desk, staff rooms, change rooms and plant, in one building with the data centre.** Core = the pool (the heat user). The gym shrinks first, then drops. On small lots the pool becomes a **learner pool (13 × 7 m, "smaller program")** so that every lot type fits through a variant (J.B., 9 Nov); 25 m × 4 lanes everywhere else. One connected building, never separate buildings (J.B., 7 Nov).

- Every figure has a register id (`register/formula_register.json`) or a named clause, or is marked **drawing choice** or **?**. "Our reading" marks an interpretation.
- Codes: Vancouver → VBBL 2025 and the Z&D By-law; Edmonton → NBC 2023 (AE) (register `nbcAB2023`) and Zoning Bylaw 20001. Pool rules: Edmonton has them in the building code (NBC(AE) Div. B Section 7.2 Aquatic Facilities); Vancouver has none in the VBBL — the BC Pool Regulation (B.C. Reg. 296/2010) plus the BC Guidelines for Pool Design (Ministry of Health, 2025, **guideline**) stand in. Where a rule exists only in Alberta it is applied in Vancouver too and labelled "AB rule, our extension".
- Room minimums follow `eh/specs/room_minimums_rule_2026-11-08.md` (step 1 code · 2 equipment + clearances · 3 guideline · 4 rate × J.B.'s count · 5 precedent · 6 none, drawing choice). Every room also has a minimum clear width (J.B., 8 Nov).
- Code level: `CODE_LEVEL_RULE_2026-11-09.md` (big moves only; within 0.5 m or 5 % = "tight: check in design").

## Known weaknesses (read first)

- **Front public yard (10 Nov late, Part 1 rule 1f):** the yard sizes rest on a drawing choice (plant yard trimmed to the last unit + 3.0 m, ?); 15231's rear setback 6.0 or 4.5 (?); 10003's yard is on the assumed street side (?); 16075 not moved (pads and rear exits). Garden heat and growing figures "?"; noise not checked.
- **Edmonton lot types (10 Nov, post-gate):** drawn in the tool rectangles only (no lot outlines): where streets meet the lot is assumed on 10003 and the through lot on 15231 is assumed; 16075 puts the lobby on a side walkway and the chemical doors on the street face (flag); the three fits reuse two plans (no new plan was designed). `eh/deadend.py` stops on the beside plan (e06b, 10003): fixed by the hub 10 Nov; both dead-end rows are on script again. In strict mode (Q24) their secure corridors read inf (the exits open into the plant yard), so the gate rule decides: a yard gate is now drawn on both, and the gate rule **fails on the dock door** (it opens into the loading space, which eh/yardgate.py reads as a solid room): open, see the open items.
- **Zoning, Vancouver:** "Swimming Pool" is a listed Section 2 use and no I-2, I-3, FC-2 or I-1C schedule lists it, so the pool is a **rezoning variant** everywhere in Vancouver. The possible route through "Community Centre or Neighbourhood House" (Conditional in I-2, I-3, FC-2; the City's own 2025 DP report calls the new Aquatic Centre a "Community Centre containing swimming pools and a fitness centre") is the Director of Planning's interpretation: **not a permission we can claim (?)**. The gym is Conditional in I-3, FC-2 and I-1C only; in I-2 it is also a rezoning.
- **Zoning, Edmonton:** every data centre is Major Industrial (J.B., 8 Nov) → outright only in IH, where neither the pool nor the gym is listed. BE lists both (pool as Community Service, 500 m² cap, 3.18 variance; gym as Minor Indoor Entertainment, no cap). **Every Edmonton Community pool is a rezoning**, as every Edmonton hub is. Whether a public pool is "Community Service" (community recreation centre) or "Indoor Entertainment" in Bylaw 20001 is our reading (?): no definition names pools.
- **NBC 2023 (AE) Section 7.2** was not re-read here: its clauses come from the register entries (arch_sup_nbcAE7Pools, arch_svc_nbcae72, arch_adj_nbcAE72; checked 2 Nov), not from the text.
- **Pool size and hall height** come from a UK design guide (Sport England 2013, benchmark). No Canadian source for the smallest public lap pool was found. Canadian lane widths read (Swimming Canada 2.5 m) are competition rules, not community pools.
- **Pool structure:** the tank is 0.9–1.8 m deep; on Vancouver flood-plain lots with the slab at the FCL the tank bottom sits in fill or below grade. Allowed below the FCL (rule 12, J.B. 10 Nov); groundwater and uplift when drained not read (?).
- **Pool water and supply temperatures (J.B., 10 Nov, from the main chat's research):** limit ≤ 37 °C pool water, ≤ 40 °C hot tub (BC Guidelines for Pool Operations v3 2025, 5.2, citing the Pool Regulation). Design water (Sport England DGN App. 2 Table 4, PWTAG 2009, UK benchmark): main pool 29 °C, learner pool 31–32 °C. **Supply = water temperature + the exchanger approach; the approach is not sourced (?)**, so the supply temperature is written as "29 °C + approach" (main) and "31–32 °C + approach" (learner). The pool is the low-grade user: any hall heat above about 30 °C plus the approach can serve it.
- **Heat (11 Nov, J.B.):** whole-centre heat = Ontario BPS 2024 medians (417–608 kWh/m² gas × pool block gross) with CIBSE TM46 (1,130 kWh/m²) as the high cross-check, both provisional; the ≈ 440 MWh/yr from a non-Canadian preprint is pool water only (low confidence). Under 3 % of the hall's heat at the hub cap (TM46 up to about 5 %): it does not decide the layout.
- **Most room widths and several room sizes are step 6** (drawing choice). No Canadian pool-building standard with room sizes was found (?). Sport England p. 38 (benchmark) puts changing and sanitary area at about the water area, well above the Eastglen-based rooms used here.
- **Independent check (9 Nov, separate agent, from the register extracts and the two fit geometries):** bathing loads, change-room, shower and WC counts, hall dimensions, Eastglen and Calgary figures, separations, loading rows and the fit areas all re-derived and confirmed; corrections made: rounding of bathing loads (now rounded down throughout), the Vancouver 50/50 split labelled as the AB rule, change-room minimums stated with their composition, the gym egress sentence, Edmonton bay dimensions, two first-aid rooms on the Edmonton fit (now one). It could not check clauses outside the extracts (VBBL Tables 3.3.1.5.-B and 6.3.2.9, 3.7.2.2.(15), WorkSafeBC, ASHRAE): those stand on the hub spec's register additions.
- **Old boards:** `TestFit_CP_E06B` and `TestFit_CP_V339` (5 Nov) are **OUT OF DATE** (pre hub cap, strict ground floor, widths, dead ends, egress doors, Vertiv zones) and labelled so; replaced by the six Part 4 boards.
- **8980 Oak St step-free entry** (re-planned 10 Nov, J.B.): ramp outside in a 1.7 m setback strip, 10.8 m of run for the 0.9 m rise from the lowest sidewalk cell (0 margin: tight); guard along its street edge not drawn (?). Exterior ramp below the FCL on our reading (not a building floor); CBO relaxation 1.5.2.11.(3) as a backup.
- **Independent check, round 4 (10 Nov, separate agent, own scripts, 1050, 1353, 1515, 8980):** areas, MW, heights, storeys, loading, plant counts, bather route, exits, yards and plant spacing reproduce. Fixed after it: travel rows judged as "pass" at 43 m stay pass (the 0.5 m distance tolerance; 5 % is for areas, CODE_LEVEL_RULE); 8980 ramp lengthened to 10.8 m for the 3.7 m sidewalk cell (pass → tight); 1515 step-free text corrected (0.2–0.4 m up, tight); 1515/339 pool-plant area text (88 → 105 m²); footprints now exclude open bays; the bather-path row labelled "checked by script" and its rule renamed R9 everywhere; new rows: guard at the 8980 ramp (?), the 1050 bay 0.8 m into the rear yard (?), and **door routes through narrow parts of rooms** (scripted): the 1050 pool plant reaches its outside door through a 1.5 m arm and the 1353 plant through 2.2 m (room minimum 3.0, drawing choice), the 8980 hall reaches S1 through a 5.0 m part: "?", check in design, not re-planned.
- **Independent check, round 3 (9 Nov, separate agent, own scripts, the four new fits):** room areas, hall MW, plant counts, bathers and roof levels match the boards. It found: 1050 drawn up to 0.5 m past the slanted lot lines and its generators 2.83–2.93 m from the lane (3.0 needed); 1515 (and 339) pads 1.97 m from the sets (2.0). All fixed and redrawn; **the 1050 fix was not re-checked by the agent.** Site areas on 1050, 1353 and 1515 boards are the tool's (7–70 m² more than the drawn lot polygon; no result changes). Not checked by it: travel, exit separation, dead ends, yards other than 1050.
- Not checked by anyone: Edmonton's current Alberta pool standards (the 2014 Pool Standards read are marked Archived); chlorine type (gas vs hypochlorite) — the spec designs to the gas-chlorine rules, the strictest.

---

## 1. Program and rooms

Rank: 1 never drops; higher numbers drop first. Fits shrink rooms toward the minimum before a room drops by rank.

**Bathing load** (the sizing number for change rooms, showers and washrooms):
- Edmonton: 1 bather per 1.5 m² of pool area (NBC(AE) 7.2.4.1.(1), or the circulation design load if less) → 212.5 ÷ 1.5 = 141.7 → **141 bathers** (rounded down: a bather count never exceeds the rule; independent check 9 Nov), designed 50 % male / 50 % female (7.2.4.2) → 71 a sex. Register arch_sup_nbcAE7Pools.
- Vancouver: BC Guidelines s. 8.7, maximum bathing load = D ÷ 2.5 + S ÷ 0.93 (D = water area ≥ 1.5 m deep, S = shallower). With the drawing-choice profile 0.9 → 1.8 m over 25 m: D = 70.8 m² (the last 8.33 m), S = 141.7 m² → 180.7 → **180 bathers** (our arithmetic, rounded down; the profile is a drawing choice) → 90 a sex; the 50/50 split is the AB rule, our extension (BC gives none). Register arch_sup_bcPoolDesign5 (guideline). Independent check 9 Nov: agrees.
- Gym users who share the change rooms: + 25 (Eastglen fitness maximum 20–25 concurrent users, arch_sup_edmEastglenRooms), split equally (**our extension**: no source covers the added load, ?).
- **Learner pool (small-lot variant, J.B. 9 Nov):** 13 × 7 m = 91 m² water (Sport England DGN pp. 44–45 example; App. 1 "learner 10–20 × 7 m", arch_sportEngPoolsApp1; benchmark, UK), labelled **"smaller program"**. Depth: all shallower than 1.5 m (learner pool; figure not read, ?). Bathing load: Edmonton 91 ÷ 1.5 = 60.7 → **60** (30 a sex); Vancouver S ÷ 0.93 = 91 ÷ 0.93 = 97.8 → **97** (49 a sex) (our arithmetic, rounded down; independent check 9 Nov agrees on the arithmetic). Hall with the 1.8 m deck: **16.6 × 10.6 m = 176 m²**. Change rooms and washrooms sized from this load (table below, "learner" column). Gym usually dropped on small lots (ladder), so no gym share.

### 1a. Pool block

| Room | Minimum | Min width (step) | Step | Target | Rank | Source / basis |
|---|---|---|---|---|---|---|
| Pool tank, 25 m × 4 lanes | 25 × 8.5 m = 212.5 m² water; depth 0.9 m shallow end to 1.8 m deep end (no diving: deck-level diving needs > 2 m, BC 3.5) | 8.5 m (lanes ≥ 2.0 m, Sport England App. 1) | 3 (benchmark, UK) | 212.5 m²; never larger (four lanes everywhere, J.B. 9 Nov) | 1 | arch_sportEngPoolsDGN, arch_sportEngPoolsApp1; arch_bcPoolDesign2025 (3.5) |
| **Learner pool** (small lots only, "smaller program", J.B. 9 Nov) | 13 × 7 m = 91 m² water; hall 16.6 × 10.6 m = 176 m² with the 1.8 m deck; depth ? (< 1.5 m assumed). Change rooms: Edmonton 0.5 × 30 = 15 m² dressing a sex; Vancouver 0.32 × 49 = 16 m²; showers 3 a room (AB ≥ 3) / 2 heads (BC, ≤ 100 users); WCs a sex (Table 3.7.2.2.-A): Vancouver 49 → 1 M / 2 F; Edmonton 30 → 1 M / 2 F. Lifeguard station: BC gives none under 150 m² → 1 (drawing choice) | 7.0 m tank; hall 10.6 m | 3 (benchmark, UK) | 91 m² | 1 (replaces the 25 m pool on small lots) | arch_sportEngPoolsDGN pp. 44–45; arch_sportEngPoolsApp1 p. 3; arch_sup_nbcAE7Pools; arch_sup_bcPoolDesign5; arch_sup_nbcT3722A |
| Pool deck | ≥ 1.8 m wide around the entire pool (AB code; Vancouver: AB rule, our extension; BC guideline minimum walkway 1.2 m) → pool hall ≥ **28.6 × 12.1 m = 346 m²** | 12.1 m (tank + 2 × 1.8) | 1 (Edm) / 3 (Van) | Eastglen deck ÷ tank 1.12 → 239 m² deck, hall ≈ 452 m² | 1 | arch_sup_nbcAE7Pools 7.2.3.15.(1)(a); arch_bcPoolDesign2025 s. 3.2; arch_edmEastglen2017 |
| Pool hall clear height | ≥ 3.5 m flat ceiling (4-lane); profiled 4.5–6.0 m high point | — | 3 (benchmark, UK) | 6.0 m storey (the Vancouver ground storey; matches the hall storey) | 1 | arch_sportEngPoolsDGN p. 23 |
| Lifeguard station | 1 station for a pool of 150–230 m² (BC); chair ≥ 1.8 m above water. AB: ? | — | 3 | 1 | 1 | arch_up2_bcPoolGuide |
| Change rooms, women · men (bathers + gym users) | Edmonton: dressing 0.5 m² a bather a sex (71 + 13 → 42 m²) + showers + WCs; Vancouver: 0.32 m² a bather a sex (90 + 13 → 33 m²) + showers + WCs. Showers: AB 1 per 50 bathers and ≥ 3 a room → 3; BC 2 heads for the first 100 users a sex, + 1 per further 50 → 3 (103 users). WCs a sex per VBBL/NBC Table 3.7.2.2.-A on the persons of each sex (bathers + gym share): Vancouver 101–125 → 3 M / 5 F; Edmonton 76–100 → 2 M / 4 F; urinals may replace ⅔ of male WCs (3.7.2.2.(3)); lavatories 3.7.2.3. **Room minimum** = dressing + showers 3 × 1.2 m² + WCs 1.5 m² each + 10 m² lavatories and circulation (allowance, ?): Edmonton ≈ 62 (women) / 58 (men) m²; Vancouver ≈ 54 / 51 m² (independent check 9 Nov) | 3.0 m (6: two bench rows + aisle, drawing choice) | 1 (Edm) / 3 (Van) | 61 m² a sex (Eastglen 33 change + 28 WC/shower) | 1 | arch_sup_nbcAE7Pools 7.2.4.3, 7.2.4.7, 7.2.4.8; arch_sup_bcPoolDesign5 s. 5.1; arch_sup_nbcT3722A; arch_sup_eastglenRooms |
| Universal dressing and shower room | required where showers serve the public (3.8.2.8.(13)): shower 1,500 × 900 + 900 clear in front; bench 1,830 × 760 with 900 transfer; 1,700 mm turning circle (arch_sup_nbcUniversal); lavatory 800 × 1,350 clear and WC with 900 × 1,500 transfer (hub spec, VBBL 3.8.3.12.(1)(b), 3.8.3.16, register addition vbbl25_3831x) → about **7–9 m²** (our arithmetic) | holds the 1,700 mm circle and the 1,830 mm bench: 2.4 m (our arithmetic ?) | 1 | 9 m² (Eastglen 6 m² is below our arithmetic: one case) | 1 | arch_sup_nbcUniversal; VBBL 3.8.3.13, 3.8.3.17 (register vbbl25_3831x) |
| Family / cubicle change (option) | ? | 2.4 m (6) | 6 | Eastglen 33 + 37 m² (11 cubicles) | 4 | arch_sup_eastglenRooms |
| Non-bather washrooms (lobby) | outside the dressing rooms and wet traffic areas (AB 7.2.4.10); count by the non-bather load (gym 25 designed + staff ≤ 10): two unisex rooms where ≤ 60 persons and ≤ 200 m² (VBBL 3.7.2.2.(15), register addition vbbl25_3722B), one of them the **universal washroom** (3.8.2.8.(1)) | 1.5 m a WC room (6); universal: 1,700 mm circle clear of the WC and its 900 transfer (1) | 1 | 2 rooms, 5–6 + 3 m² | 1 | arch_sup_nbcAE7Pools; arch_sup_nbcT3722A; VBBL 3.8.3.13 |
| Control desk + cash office (pool and gym) | ? | 2.4 m (6) | 5 | 19 m² (15 + 4) | 1 | arch_sup_eastglenRooms (one case) |
| First aid | 9.3 m² ("should be at least"); 1 room for the facility | 2.7 m (6) | 3 | 9.3–10 m² | 1 | WorkSafeBC first aid facilities (register wsbc_firstAid); Eastglen 6 m² (below the guideline) |
| Lifeguard / program office · foreman's office | ? | 2.4 m (6) | 5 | 20 · 8 m² | 2 | arch_sup_eastglenRooms |
| Staff break · staff universal change and lockers | ? | 2.4 m (6) | 5 | 19 · 20 m² | 2 | arch_sup_eastglenRooms |
| Pool storage · administration storage | ? | 1.5 m (6) | 5 | 44 · 20 m² | 2 | arch_sup_eastglenRooms |
| Laundry · custodial | ? | 1.5 m (6) | 5 | 6 · 10 m² | 2 | arch_sup_eastglenRooms |
| Pool plant (water treatment) | ⅓–½ of the water area → **71–106 m²** (Eastglen p. 23; p. 21 says 40–50 %); pool equipment only (BC 9.8, arch_adj_bcPoolDesign); doors locked from the enclosure + its own outside door (AB 7.2.3.38.(2)); pumps on ≥ 75 mm pads, floor sloped to drains (BC 9.8, arch_up2_bcPoolGuide) | 3.0 m (6) | 5 (size) / 1 (doors, Edm) | 86 m² | 1 | arch_edmEastglen2017 p. 23; arch_adj_bcPoolDesign; arch_up2_bcPoolGuide; arch_svc_nbcae72 |
| Chlorine room (gas-chlorine rules, the strictest) | 1 h; at grade; outward door to the outside and **no door or operable window into the building**; one air change a minute; exhaust ≥ 3 m from any air intake and no intake below the exhaust (AB 7.2.3.45; STANDATA 19-BCI-008). Size ? (Eastglen chemical storage 3 m²) | 1.5 m (6) | 1 (Edm) / AB rule, our extension (Van) | 6–9 m² (drawing choice) | 1 | arch_adj_nbcAE72; arch_adj_abStandataCl; arch_sup_eastglenRooms |
| Acid store | separate room from chlorine; 110 % spill containment (BC 9.9); not near heating equipment, no direct public access (AB 7.2.3.39.(2)); forklift clearance for chemical delivery (BC 9.9) | 1.5 m (6) | 3 (Van) / 1 (Edm, 7.2.3.39) | 6–8 m² (drawing choice) | 1 | arch_up2_bcPoolGuide; arch_sup_nbcAE7Pools; typ_community_pool_bcPoolGuide51 |
| Programs mechanical (pool air handling and dehumidification, heating, DHW) | ? ; pool hall at −15 to −40 Pa, 4–6 air changes an hour, RH 50–60 % (ASHRAE ch. 6, US benchmark; BC 6.3 RH 50–60 %) | 3.0 m (6) | 6 | 5–7 % of gross building area (Eastglen) ≈ 60–90 m²; wet (condensate): never over the hall | 1 | arch_up4_ashraeCh6Pools; arch_adj_bcPoolDesign; arch_sup_edmEastglenRooms |
| Drinking fountain | 1 per 250 bathers → 1 | — | 3 | 1 | 1 | arch_sup_bcPoolDesign5 s. 5.2 |
| Spectator area | none (drawing choice). AB 7.2.2.2: spectators separated from bathers with separate entrances; with none, Vancouver's loading row for a pool "with spectator facilities" is not triggered | — | — | 0 | — | arch_adj_nbcAE72 |

### 1b. Gym block

| Room | Minimum | Min width (step) | Step | Target | Rank | Source / basis |
|---|---|---|---|---|---|---|
| Fitness floor | 186 m², 20–25 concurrent users, "over-height (min. 3.3 m)" | 6.0 m (6, equipment rows + aisle) | 5 | 186 m²; grows first into spare floor | 3 | arch_sup_edmEastglenRooms 2.9 (one case) |
| Gym dry change and lockers | **shared with the pool change rooms** (default; Eastglen runs one change set for pool and fitness). Own dry change 65 m² (50 lockers) only where the fit has spare floor | 3.0 m (6) | 5 | 0 (shared) · 65 m² (own) | 4 | arch_sup_eastglenRooms; arch_sup_calgaryRecFP2012; arch_sup_edmMillWoods2013 (keeps one) |
| Gym reception, office, first aid, staff | shared with the pool's desk, offices and first aid | — | 5 | 0 | — | arch_sup_eastglenRooms |
| Gym storage | ? | 1.5 m (6) | 6 | 20 m² (drawing choice) | 3 | — |
| Climbing wall (option) | 60 m² (Calgary 50 net × 1.20); height ≤ 4.5 m (bouldering) → at grade or in a 6.0 m storey | 4.0 m (6) | 5 | 60 m² | 5 | arch_sup_calgaryRecFP2012; arch_up4_en12572_2 |
| Multipurpose room (spare floor only) | — | 6.0 m (6) | 5 | 139 m², 30–80 people, 3.3–3.6 m clear (Eastglen) | spare | arch_sup_edmEastglenRooms 2.7 |

### 1c. Shared
- **Shared lobby:** as hub rule 15c (≥ 20 m², drawing choice; one street wall; step-free). The control desk faces the lobby and sees the public corridor (drawing choice).
- **Public corridor:** 2.0 m (drawing choice; code ≥ 1,100 mm). From the lobby to the change rooms, gym, non-bather WCs, E1 and an exit.
- **Bather path:** lobby/desk → change room → shower → pool deck (BC 5.1: toilets and showers between dressing and pool; change rooms within 60 m walking of the pool). The pool enclosure is reached only through the change rooms and the universal change room, plus staff doors from the desk/lifeguard office and the locked plant-room door (AB 7.2.3.38.(1)). No door from the gym or from any data-centre room into the enclosure (our reading of BC 3.1 "direct access to the pool should be prevented from all buildings"). Exit doors from the deck to the outside are allowed (panic hardware; the enclosure stays controlled, BC Reg. s. 7).
- **Sharing saves** ≈ 86–197 m² gross against separate pool and gym buildings (research §1, our arithmetic).

### 1d. Data centre (the host) and plant
As Emergency hub spec Parts 1b and 1c, unchanged: hall 630 m²/MW; UPS, battery, MV, meet-me, NOC, offices, dock, staff entrance with portal; generators ⌈Q⌉ + 1 (Q = MW × 1.55), chillers ⌈Q ÷ 1.489⌉ + 1 (Vertiv Liebert AFC, Edmonton placeholder only), transformer pads ⌈Q ÷ 2.5⌉ + 1. **Hub cap applies on every lot** (J.B., 9 Nov): data centre ≤ 2,325 m² and one hall storey (≈ 1.8–1.9 MW), smaller where the lot can't hold it.

### 1e. Totals
Pool block ≈ 805 m² net minimum (346 pool hall + 62 + 58 change (Edmonton) + 9 universal + 9 lobby WCs + 19 desk + 9.3 first aid + 28 offices + 39 staff + 64 storage + 16 laundry/custodial + 71 plant + 15 chemical + 60 mechanical; our arithmetic, corrected 9 Nov after the independent check) → **≈ 1,050–1,210 m² gross** at Eastglen's 1.3–1.5. Gym 186–246 net → 240–370 gross. Typology **≈ 1,290–1,580 m² gross** (the research's 1,030 low end used the lean pool without lobby WCs and programs mechanical). Benchmark not met: Sport England p. 38 puts changing and sanitary area at about the water area (≈ 212 m²) against our ≈ 140 m². Data centre 1,135–2,141 m² at 0.4–1.9 MW (hub fits). Heat: pool ≈ 443 MWh/yr + gym ≈ 75 (research §3, low confidence) ≈ 2 % of the hall's heat at 1.8 MW (1.8 × 1.55 × 8,760 ≈ 24,400 MWh/yr, our arithmetic): heat never limits the fit.

### 1f. Placement on the lot: building against the plant yard, front public yard (J.B. gate 10 Nov 2026, late)
From `SPEC_NOTE_front_public_yard_2026-11-10.md` (passed: `GATE_front_public_yard_2026-11-10.md`), the same rule in all three typologies:
1. Order from the rear: rear yard → service ground (loading and the plant yard, in whichever order the fit uses; beside the building where the fit has it so) → building. Bands inside the building as Part 3.
2. **The building sits against the plant yard,** not against the front yard line; the zone's greatest depth (I-2 / I-3 61 m) is counted from the plant-yard edge toward the street. A building smaller than the space allows is also anchored to the plant-yard side.
3. Ground left between the front yard line and the building **at least 6 m deep** (J.B., drawing choice) is a **front public yard**; under 6 m it is just a deeper front yard.
4. A front public yard opens straight off the street, is fenced or kerbed from any side drive or truck route, keeps the shared lobby (the public entrance) on it, and is reported on the board ("Front public yard: x m², y m deep").
5. Lots the building already fills: no change.
6. Every front public yard (no area threshold) holds a public garden fed by the data centre's waste heat. Default form: covered beds (cold frames or low hoop covers) on buried pipe loops, plus heated paths and entrance. Heat to the garden, season gained, bed area: **"?" until the cascade chat sources them**; drawn as a planted block with its area, the heat line from the pool plant and "covered beds and heated paths fed by data-centre heat (figures ?)".
- Pool reading (drawing choices, ?): the plant yard is trimmed to the last plant unit + 3.0 m clear (chiller service zone, or pads' 3 m clear in front, ES54 F) and its rear fence put on the rear yard line; everything else moves back with it unchanged. Where the plant yard sits beside the building (64 Airport Rd, 10003, 16075), building and yard move back together ("against" read as "behind or beside": our reading).
- Not checked: noise at the yard; Vancouver Schedule C streets (Z&D 10.7.1 landscaped setback; download approved, result pending at the hub).

---

## 2. Variants

What decides the variant, in order: (1) the zone's ground-floor rule; (2) lot type (A1: regular, small, large, narrow_deep, wide_shallow, irregular; corner as a flag); (3) lane; (4) flood plain; (5) height. A lot can carry several.

**Core variants (from the hub)**

| Variant | Triggered by | What changes for the pool | Applies? |
|---|---|---|---|
| **Stacked** | Vancouver I-2 2.2.7 and I-3 2.2.11: no data storage at grade except entrances (strict reading, J.B. 8 Nov) | Pool hall at grade, **single storey, nothing above it** (rule 2). Beside it, under the data hall: change rooms, desk, lobby, gym (or gym on storey 2 over the change block), DC entrance rooms. DC support on storey 2, hall on storey 3 (2 h floor). Ground take = pool hall 346–452 m² **plus** the hall footprint: more ground than the hub needs | Yes: every Vancouver lot |
| **Beside** | Edmonton (no ground-floor rule in BE; the zone after rezoning decides, ?) | All at grade: pool block on the street, hall behind. One storey, 6.0 m | Yes: every Edmonton lot (all need rezoning) |
| **Turned** | wide_shallow lots | The pool hall's 28.6 m side runs along the street; bands turn; plant found another place first, a screened street-front yard last (J.B., 8 Nov) | Yes |
| **Small** | small lots (buildable < 853 m²; Vancouver median width 14.0 m) | **Learner pool** (13 × 7 m, hall 16.6 × 10.6 m, "smaller program", J.B. 9 Nov) replaces the 25 m pool; gym drops by the ladder; change rooms and washrooms from the smaller bathing load (Part 1a). The 25 m pool (hall 12.1 × 28.6 m) is tried first and fails on width where the buildable width is under about 17 m (hall 12.1 + corridor 2.0 + stair 3.0) | Yes |
| **Large lot** | large (≥ 6,000 m²) | Data centre at the hub cap, pool and gym at target, the rest of the land open (J.B., 8 Nov) | Yes |
| **Corner** (flag) | two streets | Pool front and lobby on the main street; loading, plant and chemical delivery from the side street | Yes |
| **Raised ground floor** (flag) | Vancouver flood plain | Slab ≥ FCL 4.6 m CGVD28; the tank bottom is then 1.8 m below the slab: in fill or below grade (**? open item: structure, groundwater**); step-free lobby per hub rule 12 | Yes |
| **Through lot** (flag) | two streets at opposite ends | Pool front on the main street; service from the other; exit passages where side yards are 0 m | Yes |
| **Height-capped** | Vancouver: two hall storeys over a 6.1 m ground storey exceed 18.3 m | Support storey 4.0 m, one hall storey; chillers on the lower roof, never over the hall or over the pool hall | Yes (same host) |
| **Side drive** (flag) | no lane, no second street | 6.1 m drive along a side (I-3: in the 7.6 m side yard by approval 3.1.2.16; I-2: takes frontage) | Yes |

**The pool's own variants**

| Variant | Triggered by | What changes |
|---|---|---|
| **Gym over the change block** | stacked fits short of ground | Gym (A-2, dry) on storey 2 over the change rooms and desk (1 h floor to the A-3 below); climbing wall then drops (needs 4.5 m) or stays at grade |
| **Gym beside** | beside fits; wide lots | Gym at grade beside the change block, on the street with its own window |
| **Own dry change** | spare floor | A 65 m² dry change for the gym (Calgary, Mill Woods); otherwise shared |
| **Climbing wall** (add-on) | user choice | + 60 m² at grade or in the 6.0 m storey |
| **Learner pool** | small lots (ladder step 8) | 13 × 7 m pool, hall 176 m²; "smaller program" label on the board |
| **Rezoning** | every Vancouver lot (Swimming Pool not listed); every Edmonton lot (data centre Major Industrial; pool and gym not in IH) | Design unchanged. Vancouver boards: **"needs rezoning (Swimming Pool not listed)"** with a note that the Community Centre (Conditional) interpretation is to be asked of the City later (J.B., 9 Nov). Edmonton boards: "needs rezoning" |
| **BE floor-area variance** (Edmonton, if BE stays the zone) | pool = **Community Service** (J.B., 9 Nov) > 500 m² (3.12.1) | **Flag, not fail** (J.B. 9 Nov, Q11: keeps Q4, 4 Nov). Board row: "Over the BE cap (911 / 500 m²): needs a s. 3.18 variance, or set in the rezoning (zone ?)", flag in red. T-reach R8 reports it as a flag for the pool (geometry field CAPS_FLAG). **Why the pool differs from the hub:** the hub keeps R8 as a hard limit because its refuge and shelter fit under 500 m²; a 25 m pool hall alone is 346 m², so no 25 m pool block can. Pool + gym counted as one establishment (one community recreation centre): about 1,114 m² (?) |

Core variants that **don't apply:** none. (Overnight, clinic-size and refuge-count variants are the hub's programs, not this one's.)

**Where it is allowed (2 of the handoff)**

| Zone | Pool | Gym | Clause (verified 9 Nov against the local by-law copies) |
|---|---|---|---|
| Vancouver I-3 | **rezoning** (Swimming Pool listed in Section 2 Cultural and Recreational uses, not in I-3 s. 2.1; s. 2.2.15 comparable-use route applies only to uses *not* listed in Section 2) | **C** Fitness Centre (Class 1 ≤ 200 m² / Class 2 > 200 m² GFA) | van_zdb_i3 s. 2.1, 2.2.15; van3575s2 |
| Vancouver I-2 | rezoning | **rezoning** (no Fitness Centre in I-2; Community Centre C) | van_zdb_i2 s. 2.1, 2.2.13 |
| Vancouver FC-2 · I-1C | rezoning | C | arch_pub_vanSched |
| Vancouver caps | non-industrial uses ≤ 1.00 FSR combined (I-2, I-3 3.1.1.1(b)); public fitness areas excluded from floor area up to the lesser of 20 % or 100 m² (I-3 4.1.2(d)) | | van_zdb_i3, van_zdb_i2 |
| Edmonton BE | **P** Community Service ("community recreation centres"), 500 m² cap (3.12.1) → 3.18 variance; or Minor Indoor Entertainment ("active recreation", no cap): **our reading, no definition names pools (?)** | **P** Minor Indoor Entertainment ("fitness facilities, gyms", "climbing facilities") | Bylaw 20001 s. 2.120 2.12, 2.19, 3.12.1, 3.18; s. 8.10 definitions |
| Edmonton IH | not listed → rezoning | not listed → rezoning | s. 2.140 (2.1–2.11) |
| Edmonton IM | not listed → rezoning; data centre (Major Industrial) only if existing at 1 Jan 2024 | not listed | s. 2.130 (register arch_zon_EdmZones) |
| **Result** | **Vancouver: rezoning on every lot (pool). Edmonton: rezoning on every lot (data centre).** No lot in either city takes the typology outright. | | |

**Representative lots:** the hub's `eh/reps.json` picks, reused (J.B., 9 Nov): since the Community pool is a rezoning on every lot in both cities, zone no longer filters. One per lot type and city: 339 1st Ave E, 1360 Frances St, 1515 Boundary Rd, 1353 Pender St E, 8980 Oak St, 443 Terminal Ave; 64 Airport Rd NW (the hub's Edmonton fit) or 11814 168 St NW, 10004 167 St NW, 14807 118 Ave NW, 15231 118 Ave NW, 16075 Fort Rd NW, 10003 63 Ave NW.

---

## 3. Hard layout rules

Code level header as the hub's (check / don't check / 0.5 m tolerance; `CODE_LEVEL_RULE_2026-11-09.md`).

1. **Bands, street to rear:** street → pool front (lobby and desk on the street; change rooms behind the desk; pool hall beside them, on the sunny side where the lot allows — drawing choice) → public corridor → gym (at grade or on storey 2) → data-centre entrance core → loading → plant yard. Plant yard never on the public edge (as hub rule 1). **Pool plant, chlorine and acid rooms on an outside wall on a side yard or lane**, away from the generator yard and the loading dock (rule 9).
2. **The pool hall is a single-storey volume with nothing above it, and it never sits above or below data-centre space** (drawing choice: the 25 m span, the 6.0 m clear volume and the humid, chlorinated air; nothing read requires it, ?). Everything wet (tank, deck, change rooms, pool plant, chemical rooms, programs mechanical with condensate) is **never over the data hall** (FM 5-32 2.2.1.6, insurer; hub rule 8). Wet rooms may sit *under* the hall (change rooms, plant) on a 2 h floor.
3. **One building outline per storey; programs share walls with the next band** (T-one). The pool hall shares its long wall with the change block (bather path, rule 5).
4. **Ground floor by zone:** Vancouver I-2/I-3: data centre only as entrance rooms at grade (strict reading). Edmonton: the zone after rezoning decides (?); drawn beside.
5. **Access (codeable), additions to hub rule 15a.** New room kind **wet** (public line, pool enclosure): the pool hall, deck and lifeguard station. Doors into *wet*: from each change room (through the shower area: toilet → shower → pool, BC 5.1), from the universal change room, from the lifeguard/first-aid room (staff), from the pool plant (locked, AB 7.2.3.38.(1)), and exterior exit doors. **Never** from the lobby, the gym, the public corridor directly, or any secure room. Change rooms open off the public corridor or lobby. Chlorine room: **exterior door only** (kind *plant*, exterior). Acid store: off the pool plant or exterior, never off a public room. Gym (*proom*) opens off the public corridor or lobby. T-reach gains **R9** (called R8 until 9 Nov; the hub now uses R8 for the Edmonton area caps, and every pool fit runs that too): every door into a *wet* room is from a change room, the universal change room, a staff room (first aid / lifeguard office), the pool plant, or the exterior.
   **Our reading of rule 5 (the four R5 skips in `cpfit.reach_cp`; not code text, J.B. 9 Nov asked for them here).** The hub's R5 (a room reached only through another room) is not raised for:
   - **storage off the deck**: pool storage that opens only off the pool hall serves the deck;
   - **the 1353 pool loading bay**: the pool's own bay in the pool service court opens to the pool plant and the lane, not to the data-centre dock;
   - **rooms inside the enclosure**: the pool hall and lifeguard station are reached through the change rooms by design (R9);
   - **the acid store off the pool plant**: allowed by rule 5 (off the pool plant or exterior).
   **Rule change D3 (J.B., 10 Nov 2026, late; deliberate, not a loosening to fit the boards):** storage, and a staff WC, may open off the one room they serve (e.g. gym storage off the fitness floor). Reason: such a room is used only from the room it serves, and adding a corridor door gains nothing in access or safety (FIXLIST_rules_vs_scripts_2026-11-10.md, D3). Everything else in hub rule 15a stays strict. Effect: gym storage on 64 Airport Rd (E06B) and 10003 passes R5 once the hub's reach.py batch is in.
6. **Exits** as hub rule 6, plus: the pool hall is Group A-3 (NBC Note A-3.1.2.1.(1) "indoor swimming pools") and larger than 200 m² → two egress doorways ≥ ⅓ of its diagonal apart (VBBL Table 3.3.1.5.-B, Group A 200 m²; register vbbl25_3315); its occupant load is the designed load = bathing load + staff (Table 3.1.17.1 has no pool row; 3.1.17.1.(1)(a)), i.e. 142–180 > 60, so two doors anyway. Exits from the deck may go straight outside; they may not pass through the change rooms only. Gym A-2: a fitness floor over 200 m² (as drawn at 230 m² on 339 1st Ave E after spare floor, rule 14) needs two egress doorways ≥ ⅓ of its diagonal apart; at 186 m² and ≤ 60 persons one doorway suffices unless travel to it is over 25 m (Table 3.3.1.5.-B). Travel ≤ 45 m along the path from the far corner of the deck. Wet floors: exit routes from the deck cross no other program.
7. **Storey heights:** Vancouver I-2 6.1 / 4.0 m, I-3 6.0 / 4.0 m (hub rule 7). Pool hall ≥ 3.5 m clear (rule 1a) → the ground storey. Gym ≥ 3.3 m clear → a 4.0 m storey passes. Climbing wall ≤ 4.5 m → ground storey only. Edmonton: 6.0 m single storey (drawing choice). Height from the base surface (`eh/grade/vg.py`).
8. **Separations:** pool (A-3) to data centre (F-2) **2 h**; gym (A-2) to F-2 **2 h**; pool (A-3) to gym (A-2) **1 h**; A-3 to D (offices) 1 h (BCBC 2024 / NBC 2020 Table 3.1.3.1, registers arch_nbc3131, typ_warm_bath_bcbc3131). Chlorine room 1 h (AB). Pool hall at −15 to −40 Pa to adjoining rooms; doors to other areas self-closing (ASHRAE ch. 6, US benchmark; drawing note only).
9. **Plant and intakes:** generators, pads, chillers as hub rule 9 (clear zones, tanks, noise, Edmonton AFC placeholder). **Chlorine exhaust ≥ 3 m from every air intake and no intake below it** (AB 7.2.3.45.(r)); chemical rooms not near heating equipment (AB 7.2.3.39) → not against the generator or boiler walls. Outdoor air intakes ≥ 7.6 m from loading bays and ≥ 3.0 m from generator exhausts (VBBL Table 6.3.2.9). Pool-hall exhaust (humid, chlorinated) to data-centre intakes: no figure (**?**); drawn on opposite faces. Chemical delivery: a truck reaches the chlorine and acid doors with forklift clearance (BC 9.9) from the service side, never across the public edge (drawing choice).
10. **Loading:** Vancouver, per class and summed (Parking By-law 5.1.5): data centre 5.2.5 (1 for the first 465 m², then by area); **pool and gym 5.2.3** (fitness centre is a listed row; a pool *without* spectator facilities is not → similar use 5.1.4, our reading): Class B 1 per 2,800 m², none under 100 m² → **1 bay**. Edmonton Table 7.2 on the whole floor area (< 2,500 m² none; 2,500–7,500 m² 1; over 7,500 m² 2); space 9.0 × 3.0 m (3.3 with obstructions), 4.0 m clear (s. 5.80, register edmZB580); aisle not given (Vancouver's 6.1 m used, ?). Vancouver Class B 10.2 × 3.4 × 3.8 m, 6.1 m aisle. One shared bay only by approval (5.1.5).
11. **Entrances:** pool and gym through the shared lobby, main pedestrian access from a street (Z&D 10.21.1; Edmonton BE 5.3 glazed street face). Data-centre staff through their own vestibule and portal, never the lobby. Chlorine room door and chemical delivery on the service side.
12. **Step-free and flood:** as hub rule 12. **Flood construction level** (J.B., 10 Nov, from the main chat's research `research_pool_FCL_supplytemp_2026-11-09.md`; VBBL 2025 read there):
   - **The tank shell may sit below 4.6 m.** The FCL is "the minimum elevation of the underside of a floor system, or of the top of a concrete slab" of a building used for habitation, business or storage of goods (Div. A definition); a tank shell is neither (our reading, accepted).
   - **The pool deck, every room floor and the pool plant at or above 4.6 m.** Plant below it only if protected and accessible during a flood to the CBO's satisfaction (Div. B 2.2.10.3.(2)); not used in the fits.
   - **Hard rule: chlorine, acid and every pool chemical at or above 4.6 m, never below** (Div. B 2.2.10.3.(3): "No person shall store hazardous or toxic substances below the flood construction level").
   - Penetrations water-stopped (2.2.10.3.(4)); the CBO may require plans and a covenant, or increase or relax the FCL (Div. C 1.5.2.11): not relied on.
   - **Entrances on flood-plain lots:** an exterior ramp from the sidewalk may run below 4.6 m up to a landing at the door (our reading: an exterior ramp is not a building floor, FCL definition; CBO relaxation Div. C 1.5.2.11.(3) as a backup; J.B. 10 Nov, 8980 Oak St). No floor inside the building below 4.6 m.
   - Still open: a balance tank or plant pit below the FCL (counts as fixed services: protect or raise, ?); groundwater and uplift on the tank (?).
13. **Yards and depth:** as hub rule 13.
14. **Spare floor** (J.B., 9 Nov): (1) fitness floor grows (to 250 m², drawing choice); (2) a multipurpose room (Eastglen 139 m²); (3) own dry change 65 m²; (4) "unassigned".
15. **Fallback ladder**, in order (J.B., 9 Nov):
    1. Full program: pool (4 lanes, 1.8 m deck) + gym 186 m² + options, at grade (Edmonton) or stacked (Vancouver).
    2. Drop the climbing wall and the own dry change (shared change is the default).
    3. Gym over the change block (storey 2).
    4. Data centre below the hub cap, to what the plant yard and ground hold (label "smaller than the hub cap").
    5. Drop the gym (rank 3): its floor goes to pool storage, then "unassigned".
    6. Shared loading by approval (5.1.5).
    7. Height-capped (support 4.0 m, one hall storey).
    8. **Learner pool** (13 × 7 m, "smaller program"): the 25 m pool gives way only here; change rooms and washrooms from the smaller load.
    9. **"Doesn't fit here"**, with the limiting rule and dimension. The pool (tank + 1.8 m deck + change rooms + plant + chemical rooms) and the data centre's entrance, cores and plant never drop.

**Doesn't-fit floor (first estimate, to prove in Part 4):** 25 m pool: hall 12.1 × 28.6 m + change block ≈ 10 × 12 m + DC entrance core ≈ 8 × 12 m → about 600 m² of ground beside the hall's own footprint; buildable width ≥ about 17 m (hall 12.1 + corridor 2.0 + stair 3.0). Learner pool: hall 10.6 × 16.6 m; buildable width ≥ about 15.6 m by the same sum, or the hall turned along the depth with the corridor beside it (width ≥ 10.6 + 2.0 + stair = 15.6 m; the hall's 16.6 m along the depth). Vancouver small lots at 13.8 m buildable width are the hardest case: the test fit (1360 Frances St) decides.

---

**Yard exits, vehicle gates and fuel (J.B., 10 Nov 2026, late; applied to every pool fit):**
- **Q24 (as the hub, reworded 10 Nov):** a secure-line exit into the data centre's own fenced plant yard counts if a drawn yard gate, opening from inside without a key, leads to an **open public thoroughfare (street or lane)**, matching VBBL Div. A "exit" and "lane". Marked "? (our reading)" until Note A-1.4.1.2.(1) is read. Script: `eh/yardgate.py`.
- **Vehicle gates:** every truck route that meets a plant-yard fence is declared (TRUCK_ENTRIES + VGATES, TRUCK_VIA or TRUCK_ALONG; `eh/yardgate.py` v7) and a vehicle gate spans every crossing. Boards report the opening width and the width the gate covers (`cpfit._vg_widths`).
- **Public exits and truck ground (D2, J.B. 10 Nov late):** truck ground includes the pool's own delivery apron and service court. A public exit may not discharge onto any truck ground; it gets a fenced walk to the street. To fix after the hub's script batch: 64 Airport Rd corridor exit; 1353 rear exit and stair P2.
- **Fuel truck:** where the generator fill points are inside the yard, a lane 3.0 m clear (drawing choice, ?; pass with 3.5) runs from a vehicle-gated route to within 3.0 m of every set (fill point on the sub-base tank, hose length not read, ?); found by script (`community_pool/fits/fuelroute.py`), drawn on the plan. Turning not checked (?). Where no lane fits, a remote fill box on the yard fence piped to the tanks, "?" (CSA B139 remote fill not read; J.B. to confirm).

## 4. Test fits (9 Nov 2026: all six drawn; self-checked; independent re-measure of the four Vancouver additions, see Known weaknesses)
Boards on the design board (row y 52000): `TestFit_CP_V339_stacked`, `TestFit_CP_E06B_beside`, `TestFit_CP_V1050_learner`, `TestFit_CP_V1353_turned`, `TestFit_CP_V1515_large`, `TestFit_CP_V8980_flood`. The 5 Nov boards `TestFit_CP_V339` and `TestFit_CP_E06B` are **OUT OF DATE** and labelled so. Scripts: Claude Link `community_pool/fits/` (cpfit.py + one folder a fit; run beside the hub's `eh/` scripts and `lidar_ground2m/`).

| Lot | Variant | Hall | Pool | Gym | Status | Tight: check in design |
|---|---|---|---|---|---|---|
| 339 1st Ave E (I-3, narrow-deep) | stacked, side drive, raised | 1.87 MW, 15.9 m (one hall storey, hub cap) | 25 m × 4 lanes at grade, single volume; 180 bathers | storey 2 over the change block: fitness 230, multipurpose 69, own dry change 43 | **needs rezoning** (Swimming Pool not listed); every big-move check passes; 3 bays drawn, 2 needed | storey heights at their minimums; walkway 1.5 m for 1.1 needed; rooms at minimum width; multipurpose and dry change under their targets |
| 64 Airport Rd NW (BE, regular) | beside, one storey | 1.59 MW, 6.0 m (**under the hub cap 1.68**: the pool block and gym take the ground) | 25 m × 4 lanes on Airport Rd; 141 bathers | at grade: fitness 192, storage 11 | **needs rezoning** (every Edmonton data centre); every big-move check passes; **flag: over the BE Community Service cap** (911 / 500 m²; s. 3.18 variance or the rezoning, Q11); 1 bay | data-centre exits apart 29.0 ≥ 28.7; rooms at minimum width; programs mechanical 40 m² under target; Edmonton cooling a placeholder |
| 1050 Georgia St E (I-2, smallest lot that fits, lane) | learner pool, "smaller program"; **two storeys** (10 Nov); ladder steps 4 (smaller data centre), 5 (gym dropped), 6 (one shared bay) | **0.16 MW** (102 m² hall on storey 2), 14.5 m; data centre **446 m² counted** (≤ 465, Parking By-law 5.1.6 + I-2 4.1) | 13 × 7 m learner pool on Georgia St; 97 bathers | none | **needs rezoning**; **approval**: one Class B space, the pool sharing the data centre's (s. 5.1.5); DC staff entrance from the lane (flag) | data centre 19 m² under 465 (4 %); 30 m² of storey 2 over the lobby not built; support rooms at minimum widths; storey 1 at 6.1; step-free ramp 3.6 m for 3.6 needed (0 margin); dead end 5.8 m; generator 1 ends 0.07 m from the bay |
| 1353 Pender St E (I-2, wide-shallow) | turned, stacked; pool service court in the rear yard | 1.29 MW (811 m²), 17.2 m: pads and exit spacing limit it | 25 m × 4 lanes; 180 bathers | storey 2: 220 m² | **needs rezoning**; every big-move check passes; 3 bays (one is the pool's, in its court) | storeys at minimums; walkway; rooms at minimum width; chiller zones; chlorine door opens into the pool's bay in the court (outside, our reading) |
| 1515 Boundary Rd (I-2, large) | the 339 stacked plan, hub cap; about 70 % of the lot left open | 1.87 MW, 16.3 m | 25 m × 4 lanes; 180 bathers | storey 2: 360 m² | **needs rezoning**; every big-move check passes; 3 bays | storeys at minimums; walkway; rooms at minimum width; pads moved to 2.0 m from the sets after the check |
| 8980 Oak St (I-2, irregular corner, flood plain) | the 339 plan turned; slab = FCL 4.6 m; chillers on the storey-2 roof; the pool's extra drawing: section through the tank | 1.45 MW (913 m²), 17.2 m (hub fit here 0.94) | 25 m × 4 lanes; 180 bathers; tank underside 3.4 → 2.5 m, to 2.1 m below the FCL and 0.5–0.8 m below existing ground at the deep end | storey 2: 360 m² | **needs rezoning**; step-free **re-planned 10 Nov (J.B.)**: the lobby's storey-1 Oak St wall set back 1.7 m; a 1:12 ramp outside in that strip from the sidewalk at the high north end (3.8 m) to a level landing at 4.6 m at the door (10.8 m of run for the 0.9 m rise from the lowest sidewalk cell, 3.7 m: tight), under the storey-2 floor (the canopy); every floor inside at 4.6 m. Our reading: an exterior ramp is not a building floor (FCL definition); CBO relaxation 1.5.2.11.(3) as a backup. Ramp and canopy inside the lot and clear of the yards (script). S1 5.0 m back on the north face | FCL 0 margin; exits drop 0.5–1.7 m to grade (steps not drawn); generator fuel fill (the north-west yard has no street frontage); roof chillers (structure, crane) |
| smaller lots | — | — | — | — | **"Doesn't fit the Community pool. The Emergency hub fits from about 512 m² of buildable ground with generators upstairs (Vancouver, 1360 Frances St; about 408 m² in Edmonton, '?' until the Alberta code and EPCOR rules are read; meets code as read, not FM 5-32, insurer), or about 750 m² with generators at grade."** (Part 6) | |

**Small lots (J.B. 9 Nov, decided).** The learner pool is drawn on 1050 Georgia St E as the smallest lot that fits; it holds only with chillers on the storey-2 roof, **a data centre kept to 465 m² of counted floor area (0.16 MW, two storeys) so one bay serves both uses by a s. 5.1.5 approval**, the DC staff entrance from the lane and a 0.16 MW hall on two storeys (10 Nov). Below it the ground budget governs (about 540 m² of ground rooms + about 170 m² of plant yard + a lane or 6.1 m drive): the tool reports "Doesn't fit the Community pool. The Emergency hub fits from about 512 m² of buildable ground with generators upstairs (Vancouver, 1360 Frances St; about 408 m² in Edmonton, '?' until the Alberta code and EPCOR rules are read; meets code as read, not FM 5-32, insurer), or about 750 m² with generators at grade." (J.B. 10 Nov; hub small variant TestFit_EH_V1360, self-checked).

**Check rows (audit 9 Nov, after the Heat cascade bug):** every board row is produced by a script (`cpfit.common_checks`), recomputed from the geometry (`cpfit.finalize`: height, floor area, storey heights, generator tanks, pads, chiller spacing, FCL, step-free lobby; status = the worse of typed and computed; clause ends "checked by script"), or labelled "by hand" (zoning, separations, chlorine rooms, yards, etc.). Washroom, shower, universal-room and loading rows are now computed from the drawing; 10 Nov added the lobby + desk row (lobby ≥ 20 m², lobby + desk ≥ 39 m², as the Heat cascade) and the door-route row. Pass/fail on the six fits (re-run 9 Nov with the hub's current `reach.py`, `deadend.py`, `egress3.py`, `tfboard.py`): T-reach R0–R8 + R9 PASS on all six; 64 Airport Rd's R8 cap is a **flag** (911 / 500 m², Q11); dead ends ≤ 6 m; exits apart; travel ≤ 45 m; egress doorways (pool hall, gym, hall); walkway loads; room widths and areas (`eh/audit_rooms.py` with the pool rules); loading counts; separations and wet-over-hall by hand. Independent agent (9 Nov) re-derived the room figures and fit areas: see Known weaknesses.

### Edmonton lot types (post-gate addition, 10 Nov 2026)
Lots from `eh/edm_reps_2026-11-10.md` (hub chat, picked by the cascade's rule), all BE. Tool measures and the tool rectangle only: **no Altalis outline** (academic-use data). Boards on the design board (row y 50100, x 9240–12320): `TestFit_CP_E15231`, `TestFit_CP_E16075`, `TestFit_CP_E10003`. Scripts: `community_pool/fits/e15231`, `e16075`, `e10003`, `e10004` (+ `edmcommon.py`). Every row is from a script, or labelled "by hand", or "open: not checked".

| Lot (type) | Variant | Hall | Pool | Gym | Status | Tight: check in design |
|---|---|---|---|---|---|---|
| 15231 118 Ave NW (narrow-deep, rectangle 37 × 84) | the 8980 / 339 stacked plan (9 Nov version, no flood level); trucks from the rear street | 1.45 MW, 16.0 m | 25 m × 4 lanes on 118 Ave; 141 bathers | storey 2: 360 m² | **needs rezoning**; **flag: BE cap** 980 / 500 m²; through lot ? (truck drive needs it); 3 bays, 1 needed | height 16.0 at the limit; women's change room 60.0 < 61.1 m²; pads 2.0 m from the sets; chillers 3.0 m apart |
| 16075 Fort Rd NW (wide-shallow, rectangle 68 × 43; one street, no lane, no rear access) | the 15231 plan turned a quarter; truck court, generators and pads on the east side | 1.45 MW, 16.0 m | 25 m × 4 lanes along Fort Rd; 141 bathers | storey 2: 360 m² | **needs rezoning**; **flag: BE cap** 980 / 500 m²; **flag: lobby off a 3.0 m side walkway (26 m in from Fort Rd); chemical doors on the street face** behind a fenced service strip; rear exits 59–88 m outside to the street: ? (exterior travel to the street not read); no shorter route fits; 2 bays, 1 needed | height; change room; generators 3.0 m to the rectangle edge; chillers |
| 10003 63 Ave NW (irregular, rectangle 80 × 64) | the 64 Airport Rd beside plan turned a quarter; about half the lot left open | 1.59 MW, 6.0 m | 25 m × 4 lanes; 141 bathers | at grade: 203 m² | **needs rezoning**; **flag: BE cap** 911 / 500 m²; where the streets meet the rectangle ? (frontage 30.5 m over 3 segments); 1 bay | data-centre exits apart 29.0 ≥ 28.7; generators 1.5 m to the building |
| 10004 167 St NW (small, rectangle 10 × 40) | **doesn't fit** (`e10004/nofit.py`) | — | — | — | limiting rules: buildable ground 436 m² < about 710–750 m² (Part 6); against the hub's figures on buildable area: above about 408 (Edmonton, ?), below 512 (Vancouver) and 750 (at grade); card `TestFit_CP_DoesntFit`; learner hall needs about 15.6 m of buildable width, the lot leaves 12.0 or 10.5 m (flanking street side ?). Board message as Part 6; the hub's Edmonton upstairs figure (about 408 m²) is "?" until NBC 2023 (AE) and the EPCOR rules are read | — |

"?" on every Edmonton fit: chillers (Liebert AFC) outside the maker's range at −30 °C; site grade; flood layer; street class (6.0 or 4.5 m setback); neighbouring zones (6.0 m next to residential).

### Front public yard (J.B. gate 10 Nov 2026, late; Part 1 rule 1f)
Re-run 10 Nov (late): the three fits that gain a yard. The others: building already fills the depth (339, 1050, 1353, 8980, 64 Airport Rd), or the move is not made (16075, below).

| Fit | Move | Front public yard | Side drive beside it | Checks that changed |
|---|---|---|---|---|
| 1515 Boundary Rd | whole plan, court, drive and plant yard 22.75 m back; plant yard trimmed to chiller 3 + 3.0 m (?), fence on the 3.1 m rear yard line | 722 m², 23.6 m deep (to the lot line; I-2 has no front yard) | yes: the 6.1 m drive runs 23.6 m beside it, behind the 1.5 m walkway fence | step-free lobby now a 1:115 path, no ramp; chillers about 7 m from the rear lot line (was 25: noise ?); hall MW unchanged 1.87 |
| 15231 118 Ave NW | 8.25 m back; plant yard trimmed to the pads + 3.0 m, fence on a 6.0 m rear setback (6.0 or 4.5, ?) | 252 m², 8.2 m deep (from the 6.0 m front yard line) | no (drive at the rear); pool service strip fenced beside it | setbacks and plant rows re-written; hall MW unchanged 1.45 |
| 10003 63 Ave NW | building and plant yard 12.7 m back to the tool rectangle's rear edge | 533 m², 12.7 m deep **on the assumed street side (?)**: the real frontage is on another side, so the yard may face no street | no; pool service apron fenced beside it | row status "?"; hall MW unchanged 1.59 |
| 16075 Fort Rd NW | **not moved** (J.B.: only if the rear exits can be re-planned without losing the hall) | would be about 9 m | — | rear strip holds P1, P2 and corridor exits plus the transformer pads and S2: moving back leaves the pads no place (yard full of generators, court needed for trucks); for J.B. |

**Parts 5–7 PASSED (J.B., 11 Nov 2026); gate points 1–8 done (point 7: 1050 pads re-checked on EH-FREEZE-2026-11-11b, see Part 6c).** **J.B.'s gate points (11 Nov):** (1) Ontario 2024 re-run on the restored file: done, no changes. (2) Pool heat on the boards = Ontario range (main) with TM46 as the high cross-check, provisional; 440 MWh stays pool water only: done (live 1794437453-9d76). (3) **Answer key:** the engine's ladder step and verdict must match each fit exactly; MW within ±10 %. (4) **D1 for room minimums:** a shortfall of 5 % or less on a sourced minimum reads "tight: check in design". (5) No new hand-drawn fits; when the engine runs, check its drawings at the 25 m pool's minimum lot and at other sizes with no fit. (6) Fuel: no 72 h figure for the pool (life-safety power only). (7) Re-run 1050's pad check once EH-FREEZE-2026-11-11b is in. (8) Pool-hall orientation: E11 for pool and cascade (J.B. 11 Nov, accepted); 1515 and 8980 answer-key differences, orientation only. Heat row: a figure, shown "provisional", no pass/fail (J.B. 11 Nov; live 1794437909-be92).

## 5. Pass/fail tests (every layout)

Each test returns **pass**, **tight** (within 0.5 m or 5 % of the limit, either side: "check in design"), **fail**, **flag** (shown in red, doesn't block; J.B.'s decisions), or **?** (not measurable from the massing). Hard rules (code, equipment + clearances, guideline, sourced rate × count: room-minimums steps 1–4) block; steps 5–6 (precedent, drawing choice) read "tight, judged" at worst. A mixed row takes the worse status. The engine runs the hub's Part 5 tests unchanged, plus the pool's.

### 5a. Hub tests, unchanged (hub spec Part 5)
T-use, T-envelope, T-ground, T-stack, T-rooms, T-reach (R0–R8), T-exits, T-deadend (with the yard-gate rule, Q24), T-egress, T-egress-area, T-width, T-ground-route (D2: no public exit onto truck ground), T-lobby, T-wc, T-loading, T-plant (generators, tanks, chillers), T-yardgate and T-vgate (`eh/yardgate.py` v7), T-front-yard (Part 1 rule 1f).

### 5b. Pool tests

| Test | Rule (part / clause) | Pass when | Fail / tight / flag | Script now |
|---|---|---|---|---|
| T-pool-size | 1a; NBC(AE) 7.2.3.15 (Vancouver: AB rule, our extension) | tank 25 × 8.5 m (learner 13 × 7 m); pool hall clear ≥ 12.1 × 28.6 m = 346 m² (learner 10.6 × 16.6 = 176 m²) | fail past 0.5 m / 5 %; tight within | `eh/audit_rooms.py` CLEAR + cpfit room rules |
| T-pool-volume | rule 2 (drawing choice, our reading) | pool hall is one storey with nothing above it; never over or under data-centre space | fail | `claims.off_hall` (+ storey overlap) |
| T-wet | rule 2; FM 5-32 2.2.1.6 | nothing wet (tank, deck, change rooms, showers, pool plant, chemical rooms, programs mechanical) over the data hall, in plan, any storey above | fail | `claims.off_hall` |
| T-bather (R9) | rule 5; BC Guidelines 3.1, 5.1; AB 7.2.3.38 (our extension) | every door into the pool enclosure is from a change room, the universal change room, a staff room (lifeguard / first aid), pool storage, the pool plant (locked) or outside; none from the lobby, gym, public corridor or any secure room | fail | `cpfit.reach_cp` |
| T-bath-load | 1 (bathing load); NBC(AE) 7.2.4.1–2; BC Guidelines 8.7 | bathing load computed from the drawn tank (Edmonton area ÷ 1.5; Vancouver D ÷ 2.5 + S ÷ 0.93, rounded down) + 25 gym users, 50/50 | — (feeds T-change, T-wc, T-egress) | `cpfit.bathers` |
| T-change | 1a (composition); NBC(AE) 7.2.4.3, 7.2.4.7; BC 5.1 | each change room ≥ dressing (0.5 / 0.32 m² a bather a sex) + showers × 1.2 + WCs × 1.5 + 10 m² (allowance ?), ≥ 3.0 m wide; showers AB ≥ 3 a room and 1 per 50 / BC 2 + 1 per 50 over 100; one universal dressing and shower room | fail (steps 1–4); tight, judged on the 10 m² allowance | cpfit composition row, `audit_rooms.py` |
| T-wc (pool) | 1a; VBBL / NBC Table 3.7.2.2.-A | WCs a sex on the bathers + gym share of each sex; non-bather WCs outside the wet area (AB 7.2.4.10) incl. one universal washroom | fail | cpfit washroom rows |
| T-egress-pool | rule 6; Table 3.3.1.5.-B; 3.1.17.1.(1)(a) | pool hall (A-3, > 200 m²) has two egress doorways ≥ ⅓ diagonal apart; load = bathing load + staff; exits from the deck never only through the change rooms | fail | `cpfit.egress_cp` |
| T-exitpas | rule 6 | a door into an exit passage ends the travel distance | — | `cpfit.patch_exitpas` |
| T-chem | rules 1, 9, 11, 12; AB 7.2.3.45, 7.2.3.39; VBBL 2.2.10.3.(3); DECISIONS 11 Nov | chlorine room at grade with an outward door to the outside only (no door or operable window into the building) and an outside wall wide enough for the door (≥ door + 0.2 m); acid store separate, off the pool plant or outside, never off a public room; **no chemical-room door on a public street face** (a screened chemical court counts as not on the face: our reading, fix A); both at or above the FCL (hard) | fail | new (engine): door/wall geometry + street edges; FCL in `cpfit._auto` |
| T-chem-route | rule 9; DECISIONS 11 Nov | a delivery route from a street or lane reaches the chlorine, acid and pool-plant doors without crossing the data centre's secure yard or truck court | fail | `eh/dcspace.py` route (as the fuel check) |
| T-plant-pool | rule 9; ES54 F0-02 | pads ≥ 1 m from the building and from any other structure (a generator set or fence counts: our reading, J.B.), ≥ 1 m apart, ≥ 3 m clear in front on one side (front not drawn: best side, our reading) | fail past 0.5 m | `padcheck.analyse` (hub `claims.pads` to take it over) |
| T-fuel | J.B. 10 Nov | a 3.0 m lane (3.5 pass) from a vehicle-gated route to within 3.0 m of every set, or a remote fill box on the yard fence ("?") | fail / ? | `fuelroute.py` |
| T-cap | hub R8; Bylaw 20001 3.12.1 | Edmonton BE: pool (Community Service) gross area with walls vs 500 m² | **flag** (Q11), never fail | `reach.cap_area` + `capwalls` |
| T-hrr | 1d (cascade rule); DECISIONS 11 Nov | a heat-recovery room on the secure line ≥ 5.6 m²/MW of heat and ≥ 17 m² (drawing choice), ≥ 3.0 m wide | tight, judged when under the drawing-choice minimum | `cpfit._batch11` |
| T-heat | J.B. 11 Nov | the board states whole-centre heat (Ontario range, TM46 high) and its share of the hall's heat as a figure labelled "provisional": no pass/fail | — (figure) | `cpfit._batch11` |
| T-ladder | rule 15 | the board names the ladder step used (1–9) and, at step 9, the limiting rule | — | engine |

### 5c. "Check in design" rows (one row each, status tight, never blocking; code-level reset, J.B. 11 Nov)
Outdoor air intakes, louvre heights, chemical and generator exhaust points and distances (10 m chlorine and acid, our reading; 3 m generator, 3–10 m tight), duct routes (the acid store on its own duct, never through the chlorine room); pad bonding and bollards (ES54 F0-02.02–.03); pool-hall pressure and self-closing doors (ASHRAE ch. 6); delivery cart and forklift clearance at the chemical doors (BC 9.9); door routes through narrow parts of rooms; steps at exterior doors; gate hardware readings; noise (chillers; generator test one at a time); truck turning; fire department access; chiller drains and refrigerant; heat-recovery hand-over to programs mechanical; tank groundwater and uplift.

---

## 6. Doesn't-fit rule

Apply the ladder (rule 15) in order on each lot; stop at the first step where every blocking test in Part 5 passes. A shortfall within the tolerance is "tight", not a reason to go on. Lots are compared on **buildable area** (inside the yard lines), as the hub.

### 6a. Minimum lot per variant (our arithmetic unless marked "fit")
Building width sums use drawn sizes that give the clear minimums (pool hall 12.3 × 28.8 m drawn = 12.1 × 28.6 clear).

| Variant | Minimum buildable width (across the pool hall) | Minimum buildable depth | Minimum buildable area | Lane or second street | Basis |
|---|---|---|---|---|---|
| **25 m pool, stacked (Vancouver) or beside (Edmonton)** | ≈ 17.3 m: hall 12.3 + public corridor 2.0 + stair 3.0 (hall along the depth) | ≈ 28.8 m hall + ≈ 13 m DC entrance core, bay and dock band + plant yard (≈ 12 m at a small data centre) ≈ 54 m | ≈ 950–1,050 m² (pool block at grade ≈ 650 + DC entrance rooms ≈ 100 + one bay ≈ 35 + plant yard ≈ 170) (?) | none needed; without one, + a 6.1 m side drive in the width (Vancouver 5.4.1) | our arithmetic; smallest 25 m fits: 1353 Pender St E (wide-shallow, turned), 15231 118 Ave NW (narrow-deep, 37 m wide) — both well above it |
| **25 m pool, turned (wide-shallow)** | frontage ≈ 28.8 m hall + lobby/desk ≈ 6 m ≈ 35 m along the street | ≈ 17.3 m + the service band behind (≈ 15–20 m) ≈ 33–37 m | as above | as above | our arithmetic; fit: 1353 (35 m deep, lane) |
| **Learner pool (small)** | ≈ 15.6 m: hall 10.6 + corridor 2.0 + stair 3.0 | ≈ 16.6 m hall + service band ≈ 20 m ≈ 37 m | **≈ 710–750 m²** (fit-derived, ±40 m²) | needs a lane (or + 6.1 m drive: ≈ 21.7 m width) | fit: 1050 Georgia St E (24 × 37 m with a lane, ≈ 858 m² buildable) — **currently failing on pad 1 (ES54)** |
| **Doesn't fit** | narrower than ≈ 15.6 m buildable, or under ≈ 710–750 m² buildable | — | — | — | card `TestFit_CP_DoesntFit` (10004 167 St NW: 436 m², 10.5–12.0 m wide) |

### 6b. Lot types that can never take it
- **Edmonton small lots** like 10004 167 St NW (rectangle 10 × 40 m, ≈ 436 m² buildable): under every floor above.
- **Any lot under ≈ 15.6 m of buildable width** (learner hall 10.6 + corridor + stair), whatever its area: the learner hall can't turn (its short side is the 10.6 m hall).
- **Vancouver small lots under ≈ 710 m² buildable** (the median small lot, 13.8 m buildable width, fails on width first).
- Zoning never stops the fit: the pool is a **rezoning** on every lot in both cities (Part 2), so no zone is excluded; boards say so.

### 6c. Limiting rules found in the fits
| Lot | Limiting rule | Effect |
|---|---|---|
| 1050 Georgia St E (I-2, smallest that fits) | ground budget; one shared bay (5.1.5 approval); transformer pad front clearance (ES54 F0-02) | learner pool, gym dropped, data centre 0.15 MW on storey 2. Drawn 2,500 kVA pads fail (pad 1: 1.0 m front). Re-check on EH-FREEZE-2026-11-11b (sizing rule 1 + 1 × 300 kVA, Eaton pad 1.93 × 1.50 m): in the drawn spot still no 3 m front; moved to the yard's east strip (turned, fronts north and south) 4.0 m front each, 1.0 m apart, 1.0 m to the sets, 0.76 m to the lane fence: **fits, tight** (not yet drawn) |
| 1353 Pender St E (I-2, wide-shallow) | pads and exit spacing; lot lines on both sides | 1.30 MW; bays stay tight (no room to widen) |
| 8980 Oak St (irregular corner, flood plain) | plant yard shape; FCL and the step-free ramp | 1.47 MW; ramp outside in a 1.7 m strip |
| 64 Airport Rd NW, 10003 63 Ave NW (Edmonton, beside) | the pool block and gym take the ground (beside, one storey) | 1.59–1.60 MW (under the hub cap 1.68) |
| 15231, 16075 (Edmonton, stacked plan) | BE 500 m² cap (flag, Q11); 16075: one street, no lane (chemical court, fix A) | 1.46 MW |
| 10004 167 St NW (Edmonton small) | buildable area 436 m² and width 10.5–12.0 m | doesn't fit; points to the hub fit |

### 6d. Board message (unchanged, J.B. 10 Nov)
"Doesn't fit the Community pool. The Emergency hub fits from about 512 m² of buildable ground with generators upstairs (Vancouver, 1360 Frances St; about 408 m² in Edmonton, '?' until the Alberta code and EPCOR rules are read; meets code as read, not FM 5-32, insurer), or about 750 m² with generators at grade."

---

## 7. Worked example: 339 1st Avenue East (I-3, stacked, side drive) — the pool on the hub's example lot

Source: `community_pool/fits/v339/geom.py`, `run.py` (11 Nov batch, published 1794430909-99df). Board: TestFit_CP_V339_stacked. The engine reproduces each number.

| # | Step | Rule | Result on this lot |
|---|---|---|---|
| 1 | Lot and yards | I-3 3.1.2.2–8 | 5-sided lot, 4,503 m² (tool tiles). Front 0.6 m from the slanted front line, sides 7.6, rear 3.1; depth and width ≤ 61 m |
| 2 | Use | Part 2 | Swimming Pool not listed in I-3 → **needs rezoning** (approval row); Fitness Centre Conditional |
| 3 | Variant | Part 2 | Stacked (I-3 2.2.11 strict), side drive (no lane: 6.1 m drive in the NW side yard, 3.1.2.16), raised ground floor (slab 5.2 ≥ FCL 4.6). 25 m pool (buildable width ≫ 17.3 m) |
| 4 | Ladder step | rule 15 | Step 1 (full program); spare floor rule 14: fitness 236 m², multipurpose 69, own dry change 44 |
| 5 | Bathing load | Part 1; BC 8.7 | D 70.8 m² ÷ 2.5 + S 141.7 ÷ 0.93 = 180 bathers (rounded down) + 25 gym → 103 a sex |
| 6 | Ground floor | rules 1, 2, 4, 5 | Pool hall 12.45 × 28.8 m drawn (≥ 12.1 × 28.6 clear) at grade, single volume; change rooms 61.1 m² each behind the desk; lobby 61 m² on 1st Ave E; desk 39 m²; pool plant 107 m² (≥ 70.8); chlorine 9 m² and acid store on the south wall (side yard), outside doors only; data centre at grade only S1, S2, E2, staff vestibule, dock lobby; 3 bays to the truck court |
| 7 | Storeys | I-3 3.1.2.9; rule 7 | 6.0 / 4.0 / 6.0 m (tight: at the minimums); roof 21.2 m; height 21.2 − 5.3 = 15.9 ≤ 18.3 m |
| 8 | Hall and MW | 1d; 630 m²/MW | Hall on storey 3, 1,195 m² → **1.90 MW** (one hall storey, hub cap) |
| 9 | Plant | 1d | Q = 1.90 × 1.55 = 2.94 MW → 4 generators (⌈2.94⌉ + 1), 3 chillers (⌈2.94 ÷ 1.489⌉ + 1), 3 pads (⌈2.94 ÷ 2.5⌉ + 1); tank 3,092 L a set |
| 10 | Plant layout | rule 9; ES54 | All at grade in the back half, 59–90 m from 1st Ave E. Sets 2.0 m apart; tanks 7.6 m to the building, 6.4 to lot lines; pads 1.0 m apart, ≥ 1.6 m to structures, 4.0 m clear in front; chillers 4.3 m side to side (3.0 needed) |
| 11 | Heat-recovery room | 1d (cascade rule) | Storey-2 room 25 m² (2.6 m wide: tight, judged) on the secure line; heat-pump footprint 16.5 m² for 2.94 MW of heat |
| 12 | Separations | rule 8 | Pool A-3 and gym A-2 to the data centre F-2: 2 h; pool to gym 1 h floor; chlorine room 1 h |
| 13 | Wet and volume | rule 2 | Pool hall single volume; change rooms, pool plant and mechanical under the hall on a 2 h floor; nothing wet over the hall (script) |
| 14 | Bather path | rule 5, R9 | Deck reached only through the change rooms, the universal change room, the lifeguard office, pool storage and the locked plant door: **PASS** |
| 15 | Washrooms and showers | Part 1 | 103 a sex → 3 M + 5 F WCs in the change rooms; 3 showers a room + universal; 2 non-bather WC rooms incl. the universal washroom |
| 16 | Loading | rule 10 | Data centre 2,090 m² → 2 (5.2.5); pool and gym → 1 (5.2.3) → 3 Class B bays, 3 drawn |
| 17 | Exits | rule 6 | Pool hall 190 people: 2 doors 27.5 ≥ 10.5 m apart; exits apart gym 15.6 ≥ 9.0, storey 2 DC 46.1 ≥ 28.8, hall 46.0 ≥ 28.8; travel ≤ 43.6 m (≤ 45); dead ends ≤ 5.0 m |
| 18 | Floor area | I-3 3.1.1.1 | 3,775 m² ÷ 4,503 = 0.84 ≤ 3.00; non-industrial 1,685 ≤ 4,503 |
| 19 | Fuel and yards | J.B. 10 Nov; Q24 | Fuel lane 3.5 m from the gated drive to every set; yard gate to the street drawn |
| 20 | Check in design | Part 5c | intakes and exhausts, bonding, steps into the south side yard, noise, truck turning, fire access, tank groundwater |
| 21 | Heat row (a figure, "provisional") | J.B. 11 Nov | whole centre ≈ 438–736 MWh/yr fuel (Ontario medians × 1,050–1,210 m²), TM46 ≈ 1,186–1,367; 1.7–2.9 % of 25,746 MWh/yr hall heat (TM46 up to 5.3 %); pool water alone ≈ 440 (low confidence) |

---

## Engine restatements of parts 1–3 (passed with parts 5–7, J.B. 11 Nov)

Each item: where it is, what it says, and the stated rule (proposed) or "check in design" (code-level detail). Parts 1–3 stay as passed until J.B. gates these wordings.

| # | Where | As written | Proposed for the engine |
|---|---|---|---|
| 1 | Rule 1 | pool hall "on the sunny side where the lot allows — drawing choice" | **E11 (J.B. 11 Nov, pool and cascade):** long side on the street when the buildable street width less any drive on buildable ground ≥ hall length + 7.1 m (≈ 36 m for the 25 m pool, ≈ 23.7 m learner), otherwise end-on; drawing choice, fitted to the fits. Sun: check in design. Answer-key differences accepted (orientation only): 1515 Boundary Rd, 8980 Oak St (the 339 plan reused end-on) |
| 2 | Rule 1 | pool plant, chlorine and acid rooms "away from the generator yard and the loading dock" | Stated rule: chemical rooms share no wall with a generator, boiler or heating room (AB 7.2.3.39); their outside wall faces a side yard, rear yard, lane or screened court, never a public street face (T-chem). Distance to the generator yard and dock: check in design |
| 3 | Rule 4 | Edmonton: "the zone after rezoning decides (?); drawn beside" | Stated rule: Edmonton → beside variant (everything at grade, one storey) unless the lot's buildable area is under the beside floor, then the Vancouver stacked plan (as 15231, 16075) |
| 4 | Rule 5 | the four R5 skips, "our reading" | Stated rule (already exact): R5 not raised for (a) storage opening only off the pool hall, (b) the pool's own bay in its service court, (c) rooms inside the enclosure (reached by R9), (d) the acid store off the pool plant; plus D3 (storage or staff WC off the one room it serves) |
| 5 | Rule 8 | pool hall at −15 to −40 Pa, self-closing doors, "drawing note only" | Check in design |
| 6 | Rule 9 | pool-hall exhaust to data-centre intakes "drawn on opposite faces" (no figure) | Check in design (intake row) |
| 7 | Rule 9 | chemical delivery "with forklift clearance (BC 9.9) from the service side, never across the public edge (drawing choice)" | Stated rule: T-chem-route (route from a street or lane to the chemical doors, not through the secure yard or truck court). Forklift clearance: check in design |
| 8 | Rule 9 | chlorine exhaust ≥ 3 m from intakes, no intake below | Check in design (10 m our reading, DECISIONS 11 Nov) |
| 9 | Rule 11 | chlorine door and delivery "on the service side" | Stated rule: T-chem (no chemical door on a public street face) |
| 10 | Rule 15 step 4 | data centre below the hub cap "to what the plant yard and ground hold" | Stated rule: reduce the hall in steps of 0.05 MW (31.5 m² of hall) and re-size the plant until T-plant and T-envelope pass; label "smaller than the hub cap" |
| 11 | Part 1f | "service ground ... in whichever order the fit uses; beside the building where the fit has it so" | Stated rule: try the plant yard behind the building; if the buildable depth is less than building depth + plant yard depth, put it beside; the building sits against it either way |
| 12 | Part 1f | plant yard "trimmed to the last plant unit + 3.0 m clear (?)" | Stated rule as written (computable); the 3.0 m stays a drawing choice |
| 13 | Part 2, Turned | "plant found another place first, a screened street-front yard last" | Stated rule: order of plant places tried: rear yard → side yard → roof (chillers only, never over the hall or pool hall) → screened street-front yard (flag) |
| 14 | Part 2, Small | 25 m pool "tried first and fails on width where the buildable width is under about 17 m" | Stated rule: try 25 m; if buildable width < 17.3 m and depth < 17.3 m (turned), go to the learner pool (ladder step 8) |
| 15 | Part 1a | targets ("Eastglen 19 m²", "61 m² a sex") | Stated rule: rooms are placed at their minimum; spare floor follows rule 14; targets are reporting only |
| 16 | Part 1a | minimums "?" (desk, offices, storage, laundry, programs mechanical) | Stated rule: use the drawn fits' sizes as step-6 minimums (drawing choice); shortfalls read "tight, judged" |
| 17 | Part 1a | change-room "10 m² lavatories and circulation (allowance, ?)" | Stated rule as written; the allowance is step 6 (judged) |
| 18 | Part 1c | bather path "(our reading of BC 3.1)" | Stated rule: R9 (already exact) |
| 19 | Part 4 / boards | rows "by hand": separations, chlorine rooms, yards, zoning, construction | Stated rules for the engine: separations from the group pair of each shared wall or floor (Table 3.1.3.1: A-3/A-2 ↔ F-2 2 h, A-3 ↔ A-2 1 h, chlorine 1 h); yards from the yard lines; chlorine rooms by T-chem; zoning and construction stay board rows from the zone tables |
| 20 | Q24 / fuel | gate "opens from inside without a key", fill-box hose, turning | Check in design (gate readings, hose, turning) |
| 21 | Part 2, Corner / Through | "pool front on the main street" | Stated rule: main street = the street edge with the higher road class; tie → longer frontage |
| 22 | Part 1 learner | depth "< 1.5 m assumed (?)" | Stated rule: learner pool all S (shallow) for the bathing load; depth itself check in design |

## 8. Open questions for J.B.
All eleven decided (9–10 Nov). Research still open: exchanger approach (supply temperature), balance tank or pit below the FCL, tank groundwater and uplift.
1. ~~Hub cap~~: yes, on every lot.
2. ~~Small lots~~: learner-pool variant (13 × 7 m, Sport England benchmark, "smaller program"); 25 m × 4 lanes everywhere else; change rooms, washrooms and bather load from the smaller pool.
3. ~~Representative lots~~: the hub's, reused.
4. ~~Spare floor~~: fitness → multipurpose → own dry change → unassigned.
5. ~~Fallback ladder~~: as rule 15, learner pool the step before "doesn't fit".
6. ~~Vancouver route~~: label "needs rezoning (Swimming Pool not listed)", note the Community Centre interpretation; ask the City later.
7. ~~Chlorine~~: gas-chlorine rules as the design basis.
8. ~~Lanes~~: four everywhere (learner pool on small lots).
9. ~~Edmonton use class~~: Community Service (s. 8.10: "community recreation centres"; no definition names pools). Gym: Minor Indoor Entertainment (8.10: "fitness facilities, gyms"). BE caps: Community Service 500 m² per establishment (2.120 3.12.1); Minor Indoor Entertainment none; Health Service 500 m² (3.3.1) not used. Re-read from the bylaw PDF 9 Nov.
11. ~~Pool over the BE Community Service cap~~: flag, not fail (keeps Q4, 4 Nov). The hub keeps its hard limit (its refuge fits under 500 m²; a 25 m pool hall alone is 346 m²). Pool + gym as one establishment ≈ 1,114 m² (?).
10. ~~Pool tank on flood-plain lots~~: decided 10 Nov (rule 12): tank shell may sit below 4.6 m; deck, rooms and plant at or above; chemicals at or above, hard rule. Still open as research: balance tank or plant pit below the FCL, groundwater and uplift (?); the exchanger approach for the supply temperature (?).
