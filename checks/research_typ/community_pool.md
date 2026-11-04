# Typology 3 — Community pool (public pool + gym, shared support)

Research 4 Nov 2026 per `checks/research_typ/BRIEF.md`. Check 1 only. Sources: existing register ids, plus new `typ_community_pool_*` ids in `community_pool_sources.json`. "?" = not found. "Our arithmetic" / "our reading" labelled.

## Short answer

- Pool 815–1,139 m² (4 lanes; 1,065 typical) + gym 412–476 m² = 1,227–1,615 m² apart. Sharing the desk, offices, first aid, universal change and (optionally) the gym's dry change saves ≈86–197 m² (our arithmetic). Typology **≈1,030–1,529 m²** (+60 m² with a climbing wall).
- Built Canadian precedents share exactly these rooms: Eastglen (Edmonton, 6-lane pool + hot pool + 186 m² fitness, 2,131 m² gross), Mill Woods (Edmonton), Vancouver Aquatic Centre replacement (pools + fitness).
- Pool beside the hall, never above. Chlorine/plant side on a yard or lane.
- Heat ≈518 MWh/yr (our arithmetic, low confidence): 2–4 % of E06B's hall heat, 6–10 % of V339's.
- **Edmonton BE:** gym permitted, no cap; pool over the 500 m² cap → **s. 3.18 variance (flag, not block)**. **Vancouver:** Swimming Pool not listed → **rezoning**; Fitness Centre conditional. V339 also fails on ground area (tool run).

---

## 1. Program and room schedule

### Pool (4 lanes, 25 m), as in `tool/arch_programs.json`

| room | net m² | source id |
|---|---|---|
| tank 25 × 8.5 m | 212.5 | arch_sportEngPoolsDGN (UK benchmark) |
| deck | 134 (≥1.8 m all round, AB) – 239 (Eastglen ratio 1.12) | arch_sup_nbcAE7Pools; arch_edmEastglen2017 |
| dressing | 45 (BC 0.32 m²/bather) – 71 (AB 0.5 m²/bather), 142 bathers | arch_sup_bcPoolDesign5; arch_sup_nbcAE7Pools |
| shower + WC rooms | 56 (Eastglen 28 per sex) | arch_sup_eastglenRooms |
| universal dressing/shower | 6 | arch_sup_nbcUniversal; arch_sup_eastglenRooms |
| desk + cash, first aid, lifeguard + foreman office, staff break + change | 92 (19 + 6 + 28 + 39) | arch_sup_eastglenRooms |
| storage (pool 44, admin 20, chemical 3) | 67 | arch_sup_eastglenRooms |
| laundry 6, custodial 10 | 16 | arch_sup_eastglenRooms |
| electrical, garbage, non-bather WCs | ? | arch_sup_eastglenRooms; arch_sup_nbcAE7Pools |
| circulation, walls, building mech, pool plant (⅓–½ of water) | ×1.3–1.5 | arch_edmEastglen2017 |
| **gross** | **815 (lean) – 1,139; 1,065 typical** | catalogue `pool` |

### Gym, as in `tool/arch_programs.json`

| room | net m² | source id |
|---|---|---|
| fitness floor (20–25 users) | 186 | arch_sup_edmEastglenRooms |
| dry change and lockers (50) | 65 | arch_sup_calgaryRecFP2012 |
| universal change | 6 | arch_sup_edmEastglenRooms |
| reception, office, break, first aid | 60 | arch_sup_edmEastglenRooms |
| grossing | ×1.3–1.5 | arch_edmEastglen2017 |
| **gross** | **412–476; 445 typical** (+60 climbing wall, Calgary 50 × 1.20) | catalogue `gym` |

### Sharing (our arithmetic)

| shared part | saved net | saved gross (×1.3–1.5) | basis |
|---|---|---|---|
| gym reception, office, break, first aid → pool's 92 m² set | 60 | 78–90 | Eastglen runs one control desk, first aid and staff room for pool + fitness (arch_sup_eastglenRooms) |
| gym universal change → pool's | 6 | 8–9 | one per facility (our reading of NBC 3.8.2.8.(13)) |
| gym dry change → pool change rooms (option) | 65 | 85–98 | Eastglen lists no separate dry change; Mill Woods keeps one (427 m² net) — both exist (arch_sup_edmEastglenRooms; arch_sup_edmMillWoods2013) |
| **total** | **66–131** | **≈86–197** | — |

Typology: unshared 1,227–1,615 m² (1,510 typical) → **shared ≈1,030–1,529 m² (≈1,313–1,424 typical)**. Check against Eastglen: 1,484 m² net × 1.45 = 2,152 vs stated 2,131 gross for 6 lanes + hot pool + steam + fitness + multipurpose (sup_wet.md).

Change sizing when shared (our reading): the change area is set by the pool's bathing load (AB 0.5 m²/bather, NBC(AE) 7.2.4.3; Eastglen "135 sm" locker and change area); gym users add load not covered by any source (?).

## 2. Adjacency and stacking

| rule | value | source id | kind |
|---|---|---|---|
| Nothing wet over the hall | FM 5-32 2.2.1.6; OP S710 (washrooms, heating water) | fmDS0532; arch_sec2_opS710 | insurer |
| Pool hall height | flat ceiling ≥3.5 m clear; profiled 4.5–6.0 m high point (4-lane) | arch_sportEngPoolsDGN | design guide (UK) |
| Gym height | fitness "Over-height (min. 3.3 metres)"; bouldering ≤4.5 m | arch_sup_edmEastglenRooms; arch_up4_en12572_2 | functional program; standard (EU) |
| Stacking used | pool at grade beside the hall; gym beside the pool or above the change/desk block (dry rooms), never above the hall or above the pool hall (our reading) | — | our reading |
| Change rooms | within 60 m of the pool; toilet → shower → pool | typ_community_pool_bcPoolGuide51 | gov. guide |
| Pool access | no direct access from other buildings (BC 3.1) | arch_adj_bcPoolDesign | gov. guide |
| Spectators | separate from bathers, separate entrances (AB 7.2.2.2) | arch_adj_nbcAE72 | rule (AB) |
| Equipment room | pool equipment only (BC 9.8); AB: accessible from enclosure + outside access (7.2.3.38) | arch_adj_bcPoolDesign; arch_svc_nbcae72 | gov. guide; rule |
| Chlorine gas (AB) | 1 h, outward door to outside, no door into the building; exhaust ≥3 m from intakes | arch_adj_abStandataCl; arch_adj_nbcAE72 | rule |
| Moisture | pool at −15 to −40 Pa; doors to other areas with closers (ASHRAE p. 6.6) | arch_up4_ashraeCh6Pools | design guide (US) |
| Street side | own street entrance (Van 10.21.1); Edm BE glazed, visible entrance (5.3) | arch_up_vanZDB10; arch_zon_EdmZones | rule |
| Secure line | outside it | — | our reading |

**Fire separations (BCBC 2024 Table 3.1.3.1, read locally; same in NBC):**

| pair | rating | source id |
|---|---|---|
| pool (A-3) – data centre (F-2) | 2 h | arch_nbc3131; typ_warm_bath_bcbc3131 |
| gym (A-2) – data centre (F-2) | 2 h | same |
| pool (A-3) – gym (A-2) | 1 h | typ_warm_bath_bcbc3131 |
| joined separate building | 4 h firewall | arch_hsg_nbcFirewall |

## 3. Heat

| program | set point | supply | kWh/m²·yr | peak | hall heat | source id |
|---|---|---|---|---|---|---|
| pool water | 24–29 °C recreational; 24–28 competition; air 1–2 K above, max 30 °C | ? | 416 (our arithmetic, per m² usable; non-Canadian preprint, low conf.) → ≈443 MWh/yr at 1,065 m² | evaporation ≈153 W/m² of water (our arithmetic below) → ≈33 kW for 212.5 m² | liquid-cooled direct; air-cooled 25–35 °C marginal → heat pump (our reading); ASHRAE: pool water may be heated with compressor waste heat (p. 6.9) | arch_up4_ashraeCh6Pools; arch_benakcha2025 |
| pool air | RH 50–60 %; 4–6 ACH pool | ? | in the 416 | ? | dehumidifier condenser → pool water (ASHRAE p. 6.9) | arch_up4_ashraeCh6Pools; arch_bcPoolDesign2025 |
| gym | 16–20 °C | radiant 45/35 °C; Edm ≤49 °C | 168 rough (our arithmetic) → ≈75 MWh/yr at 445 m² | ? | liquid-cooled direct; air-cooled via heat pump (our reading) | arch_tmp_dudzinska2021; arch_tmp_vanNEU2020; arch_tmp_edmDESS2025 |
| showers | ≤49 °C | DHW | ? | ? | heat pump (our reading) | typ_warm_bath_bcPoolGuide |

Evaporation (our arithmetic, method as in warm_bath.md §3): 28 °C water, 29 °C air at 55 % RH, Fa 1.0 (public): (3.78 − 0.55 × 4.01) × 4 × 10⁻⁵ = 6.3 × 10⁻⁵ kg/s·m² → ≈153 W/m² (typ_warm_bath_ashraeCh6Evap; steam-table inputs typ_warm_bath_satPressure, ?).

Total ≈518 MWh/yr (443 + 75, our arithmetic). Hall heat (tool run): V339 5,393–8,278 MWh/yr at 1.4 MW → **6.3–9.6 %**; E06B 14,252–21,878 at 3.7 MW → **2.4–3.6 %**. Heat is not the limit.

## 4. Plant layout (default)

Same DC plant rules as warm_bath.md §4 (FM 5-32 generators in a yard; 2 m between sets; tanks 3.0 / 1.5 m; diked 7.5 m; fuel truck 23 / 15 m; intakes 7.6 m from dock, 3.0 m from combustion vents; evaporative units 7.6 m from intakes and 3 m from doors; noise at the property line).

Pool-specific:
- Pool plant ⅓–½ of water area = 71–106 m² (inside the grossing) (arch_edmEastglen2017), on an outside wall of the pool block.
- AB: plant room needs an outside door; gas-chlorine room at grade on an outside wall (arch_svc_nbcae72; arch_adj_abStandataCl). BC: chlorine and acid in separate rooms; 110 % spill containment (BC 9.9; arch_up2_bcPoolGuide).
- Chemical delivery: provide forklift clearance (BC 9.9) (typ_community_pool_bcPoolGuide51).

**Default layout (our reading):** street → pool block (desk and change at the street entrance; pool hall behind on the sunny side) → hall beside, never over it; gym over the desk/change block or beside on the street. Pool plant and chemical rooms on the lane or side yard, away from the generator yard (chlorine exhaust ≥3 m from intakes; genset exhaust ≥3 m from pool intakes). Generators and fuel on the opposite corner; dock ≥7.6 m from pool and gym intakes. Chillers on the hall roof as dry coolers.

## 5. Zoning and approvals

| zone | pool | gym | clause / source id |
|---|---|---|---|
| Van I-3 (V339) | **rezoning**: "Swimming Pool" is its own Cultural and Recreational use (Section 2) and not listed | **C** Fitness Centre (Class 1 ≤200 m², Class 2 >200 m²) | van3575s2; van_zdb_i3 2.1; arch_pub_vanSched |
| Van I-3, alternative route | "Community Centre or Neighbourhood House" is **C** in I-3 and has no definition in Section 2; the City's own 2025 DP report calls the Aquatic Centre "a new two-storey Community Centre containing swimming pools and a fitness centre". Whether a pool can sit under that use in I-3 is the Director of Planning's interpretation (our reading, ?) | — | arch_pub_vanSched; arch_hp_vanAquaticDPB2025; typ_community_pool_vanS2Uses |
| Van I-2 (e.g. 1425 Clark Dr) | rezoning | **not listed** (no Fitness Centre in I-2) → rezoning | van_zdb_i2; arch_pub_vanSched |
| Van FC-2, I-1C | rezoning | C | van_zdb_fc2; van_zdb_i1c |
| Van caps | I-3 / I-2 non-industrial ≤1.00 FSR; public fitness excluded from floor area up to the lesser of 20 % or 100 m² | — | van_zdb_i3 3.1.1.1(b), 4.1.2(d); van_zdb_i2 |
| Edm BE (E06B, E06A) | **P** Community Service ("community recreation centres"), cap 500 m² (3.12.1); 815 m² minimum → **variance under 3.18** ("adequate mitigation measures", 3.18.1–3.18.3): red flag, listed under approvals (decision Q4) | **P** Minor Indoor Entertainment ("fitness facilities, gyms", "climbing facilities"), **no cap** | arch_zon_EdmZones; arch_edmCommunityServiceDef; arch_pub_edmZB |
| Edm BE, counting | whether pool + gym is one Community Service establishment (whole ≤500 m²) or two uses (pool capped, gym not): ? (our reading: two uses) | | arch_zon_EdmZones |
| Edm IM, IH | **rezoning** (no Community Service; IM lists only Special Event among community uses) | **rezoning** (no Minor Indoor Entertainment) | arch_zon_EdmZones (2.130 s. 2; 2.140 s. 2) |
| Edm height / FAR | 16.0 m, FAR 1.6, not variable (7.100 6.1.1) | | arch_mun_edm7100 |
| BC pool permit | construction permit, plans sealed by engineer or architect | | arch_bcPoolReg296 |

**Tool conflict:** the golden BE runs still say the pool "cannot go on a BE lot" (cap blocks). Decision Q4 (4 Nov) makes it a 3.18 variance flag. The rule text needs the change (not done here: no code changes).

## 6. Precedents (pool + gym, Canadian, with room schedules)

| precedent | rooms and areas | what it shows | source id | kind |
|---|---|---|---|---|
| Eastglen Leisure Centre, Edmonton (Program Final Report, June 2017) | tank 326, deck 366, hot pool 40, steam 18, fitness 186, multipurpose 139, control desk 15, first aid 6, staff break 19, universal change 6 + 33 + 37, female/male change 33 + 28 each, chemical 3; 2,131 m² gross; 1:1.45 | one desk, staff and change set serve pool, hot pool and fitness; pool plant counted in grossing | arch_edmEastglen2017; arch_sup_eastglenRooms | government (functional program) |
| Mill Woods Recreation Centre, Edmonton (Functional Program, Oct 2013) | aquatics 1,770 NSM → 2,300; fitness/gym/studios 2,958.5 → 3,400; dry change 427 → 490; lobby/desk 661.5 → 795; admin 115.5 → 155; 14,660 m² total (with arena) | at large scale, dry change kept separate from pool change | arch_sup_edmMillWoods2013 | government (functional program) |
| Vancouver Aquatic Centre replacement, 1050 Beach Ave (DP-2025-00685, Nov 2025) | "two-storey Community Centre containing swimming pools and a fitness centre"; GFA ≈7,497 m²; 22.43 m high for 10 m platforms | Vancouver frames pool + fitness as a Community Centre; room schedule not in the text read (?) | arch_hp_vanAquaticDPB2025 | staff report |
| Calgary Recreation Facilities FP (2012) | dry change (50 lockers) 65 → 78; climbing wall 50 → 60; component factors 0.98–1.45 | gym support sizes and grossing | arch_sup_calgaryRecFP2012 | government (consultant) |
| Pool heated by data-centre heat | Exmouth (UK): immersion-cooled unit, "62%" gas cut (Deep Green claim); Oró et al. 2018 (peer-reviewed design study, figures not read ?) | heat side only; no pool + gym + data centre building found (?) | arch_ho_eddcExmouth; typ_heat_cascade_oro2018 | operator claim; peer-reviewed |

## 7. Fit on both sites (our arithmetic; plant-included ratios from the 3 Nov golden runs)

| | V339 (I-3) | E06B (BE) | 1425 Clark Dr (I-2, extra check) |
|---|---|---|---|
| Allowed floor area / programs' share (tool) | 5,257 / 1,577 m² (30 %) | 6,854 / 2,056 m² (30 %) | 4,976 m² programs (30 %) |
| Typology 1,030–1,529 m² | 20–29 % of floor area; 65–97 % of programs' share | 15–22 %; 50–74 % | 6–9 % of floor area |
| Ground area | pool block needs at least the tank + 1.8 m deck = 28.6 × 12.1 m ≈346 m² at grade with no hall above; the golden run found no 11 × 27 m area beside hall, plant yard and loading ("Public indoor pool: not drawn") | footprint 4,022 m²; fits | footprint 5,528 m² |
| Plant | run already fails "2 of 4 generators do not fit in the yard" on some hall layouts; roof plant reaches 20.9 m > 18.3 m (Director's approval ?) | same generator-yard failure on one layout | roof cooling over the 65 dBA night limit at 1345 Clark Dr even with low-noise units (tool run) |
| Zoning | rezoning (pool); gym C | pool 3.18 variance; gym P | rezoning (pool and gym) |
| **Verdict** | **does not fit as of right**: rezoning + no ground area at the plant-included ratio | **fits with a variance flag** | floor area fits; rezoning |
| What limits it | ground floor beside the hall (I-3 bars data at grade, so the hall's own lobby/plant compete); rezoning | the 500 m² cap; generator yard | zoning; noise |

Geometric context (Q6): V339 floor area would allow 5,257 m² with no I-3 non-industrial cap issue (4,503 m²); the plant and ground floor limit it.

## 8. Gaps and open questions

- Can a pool sit under "Community Centre or Neighbourhood House" (C) in I-3, avoiding rezoning? Needs the Director of Planning's interpretation (?).
- Edmonton: pool + gym as one establishment or two uses under 3.12.1 (?).
- Pool supply temperature and peak W/m² beyond evaporation (?); Canadian kWh/m²·yr for pools (only a non-Canadian preprint).
- Change area when gym users share pool change rooms (no source for the added load).
- Room schedule of the Vancouver Aquatic Centre (appendices not read).
- No filed plan of a pool beside a data hall.
- Tool rule text still blocks the pool in BE (contradicts Q4).
