# Typology 7 — Heat cascade (spa → pool → greenhouse → heated public edge)

Research 4 Nov 2026 per `checks/research_typ/BRIEF.md`. Check 1 only. Sources: existing register ids, plus new `typ_heat_cascade_*` ids in `heat_cascade_sources.json`. "?" = not found. "Our arithmetic" / "our reading" labelled. ASHRAE ch. 6 and ch. 52 are single-user licensed copies: figures quoted only.

## Short answer

- Four stages, one heat loop, each stage takes the water the stage above has cooled. Cascading = "lower and lower water temperatures are used in successive steps" (Lund 2005).
- Space temperatures fall 40 → 28 → 20 → 0 °C, but **supply** temperatures don't fall in the same order: the greenhouse wants 35–40 °C at the bench, the pool's supply is not sourced (?). Two orders are offered (below).
- The edge is the natural tail: a snow-melt slab gives ≈190–210 W/m² at a mean fluid of only 17–19 °C in light snow (ASHRAE 2023 Table 6), and ASHRAE says snow melt can be connected to a district system's return piping. Built precedent: Klamath Falls sidewalks on the district-heating return side.
- Known load ≈510–590 MWh/yr for typical sizes + 100 m² of edge, spa ? (our arithmetic): 6–11 % of V339's hall heat, 2–4 % of E06B's. The pool takes ≈80 % of it.
- Liquid-cooled heat (50–60 °C): no heat pump for any stage (our reading). Air-cooled (25–35 °C): one heat pump at the top of the cascade; the edge's light-snow mode can run on raw hall heat.
- Floor area ≈1,090–1,510 m² + the edge. Fits E06B with a pool variance flag; V339 blocked by the pool (rezoning, ground area).

---

## 1. Program and room schedule

| stage | program | gross m² | basis | source id |
|---|---|---|---|---|
| 1 | spa (hot pool, steam, plunge; sauna and rest ?) | 297–346 | catalogue `spa`; see warm_bath.md §1 | arch_sup_eastglenRooms; arch_wet_nbcAE726 |
| 2 | public pool, 4 lanes | 815–1,139 (1,065 typ.) | catalogue `pool`; see community_pool.md §1 | arch_edmEastglen2017; arch_sup_eastglenRooms |
| 3 | greenhouse (153 m² growing house + 10 % headhouse + WC; heat-transfer room optional) | 181–199 (190 typ.) | catalogue `greenhouse` | arch_etsBaieComeau; arch_sup_purdueHO346; neuETS |
| 4 | heated public edge (snow-melt paths and seating; or covered edge in Vancouver) | ? (no minimum plaza size in either city) | — | arch_pub_vanPlazaDG; arch_up3_edmWinterDG |
| — | heat-recovery / cascade plant room | 5.6–15.1 m² per MW of heat | component_space; hr_plant_room | register |

**Sharing (our arithmetic):** spa and pool share one desk, change, universal room, staff change and chemical/laundry/custodial set, as Eastglen's hot pool and steam room do with its lap pool (arch_sup_eastglenRooms). The spa's own copies (dressing 20 + showers/WC 56 + universal 6 + reception/staff 35 + chemicals/laundry/custodial 19 = 136 m² net) drop → **≈177–204 m² gross saved**. Separate circulation per pool stays (BC 7.2; typ_warm_bath_bcPoolGuide).

**Total buildings:** lean 297 + 815 + 181 − 204 ≈ **1,089 m²**; typical 320 + 1,065 + 190 − 177 ≈ **1,398 m²**; high 346 + 1,139 + 199 − 177 ≈ **1,507 m²**; plus the edge (outdoor) (our arithmetic).

## 2. Adjacency and stacking

- Spa and pool: one wet block at grade beside the hall, never above it (fmDS0532 2.2.1.6; arch_sec2_opS710). Shared change between them (Eastglen).
- Greenhouse: at grade on the sunny side, off the hall's shadow (yield −0.7–1 % per 1 % less light, arch_marcelis2006); single span east–west (arch_uwexGhEnergy, US). Not on the hall roof: irrigation over the hall (fmDS0532) and the chillers' roof.
- Edge: on the street, outside the secure line, ≤1.0 m above or below the street (Vancouver plaza guide, arch_pub_vanPlazaDG); south-facing seating, wind screens (arch_up3_edmWinterDG 2.2.4).
- Edge vs plant: evaporative discharge ≥3 m from occupiable outdoor space (arch_nbc63215); combustion vent 3 m from occupiable outdoor space (arch_nbc6331; gensets ?); Metro Van s. 13 (arch_mv1329). So the generator yard is never on the public-edge side (our reading).
- Pipe run order follows the cascade: hall heat-recovery room → spa → pool → greenhouse → edge manifold (our design).

**Fire separations (BCBC 2024 / NBC Table 3.1.3.1, read locally):** spa, pool A-3 → 2 h to F-2; A-3 to A-3 none; greenhouse occupancy ? (F-2: none to F-2 and 2 h to A-3; F-3: none to F-2 and 1 h to A-3; A-2: 2 h to F-2 and 1 h to A-3) (typ_warm_bath_bcbc3131; arch_adj_bcbcFarm). The edge is open ground (no occupancy; a canopy may be a "building", our reading ?).

## 3. Heat

### Temperatures and loads per stage

| stage | space / water °C | supply needed °C | annual | peak | source id |
|---|---|---|---|---|---|
| 1 spa | water 36–40 (BC/AB cap 40); air 27–29 | ? (>40, our reading) | ? | evaporation ≈440 W/m² water → ≈18 kW for 40 m² (our arithmetic) | arch_up4_ashraeCh6Pools; arch_bcPoolReg296; typ_warm_bath_ashraeCh6Evap |
| 2 pool | water 24–29; air 1–2 K above, ≤30 | ? | 416 kWh/m²·yr (low conf.) → ≈443 MWh/yr | evaporation ≈153 W/m² water → ≈33 kW (our arithmetic) | arch_up4_ashraeCh6Pools; arch_benakcha2025 |
| 3 greenhouse | air 16–20 (night 16); root zone 13–24 | bench/floor 35–40 (ASABE); root-zone water 32–49, ≤60 close spacing | 413–583 kWh/m²·yr (Prairie) → ≈63–89 MWh/yr for 153 m² | 96 kW ≈627 W/m² (Quebec estimate) | arch_asabeEp406; arch_hce_rutgersRootZone; arch_mbGhEnergy; arch_etsBaieComeau |
| 4 edge (snow melt) | surface ~0.56 °C film | mean fluid **17–19 °C** light snow (2 mm/h) Ar 0, or Ar 1 at −1 °C 22–27 °C; 34–38 °C at 4.1 mm/h Ar 0; ≤55 °C gives 440–665 W/m² (Table 7); entering ≤66 °C (concrete), PE ≤60 °C | per m², Ar 0.5, melting + idling: Great Falls 37.0 + 380.4; Minneapolis 32.6 + 563.0; Seattle 3.0 + 33.0 kWh/m² (losses excluded) | 99 %, Ar 0.5: Great Falls 453, Minneapolis 485, Seattle 420 W/m²; back loss ≈20 % steady (1–3 % with 50 mm insulation) | arch_up4_ashraeCh52; typ_heat_cascade_ashraeCh52T6 |
| 4 edge (soil warming) | root zone 13–24 | 32–49 °C | ? | ≈63 W/m² at 35 °C water (US) | arch_hce_rutgersRootZone |

No US city is sourced as Edmonton's or Vancouver's stand-in; Great Falls / Minneapolis (Edmonton) and Seattle (Vancouver) are our picks, as before (heights_conservatory_edge.md).

### How much each stage takes (our arithmetic; typical sizes, edge 100 m² as an example)

| stage | MWh/yr | share of known | peak kW |
|---|---|---|---|
| spa | ? | — | ≈18 (evaporation only) |
| pool | ≈443 | ≈75–87 % | ≈33 (evaporation only) |
| greenhouse | ≈63–89 | ≈12–15 % | ≈96 |
| edge, 100 m², Ar 0.5 | Seattle ≈3.6; Great Falls ≈41.7; Minneapolis ≈59.6 (+ back/edge losses) | ≈1–10 % | ≈42–49 (+≈20 % back loss → ≈50–58) |
| **known total** | **≈510–592** | — | **≈190–205** (understated: pool and spa evaporation only) |

Hall heat (tool run): V339 5,393–8,278 MWh/yr at 1.4 MW → **≈6.2–11.0 %**; E06B 14,252–21,878 at 3.7 MW → **≈2.3–4.2 %**. Heat is not the limit; temperature and floor area are.

### How heat is staged (our design, from the sourced temperatures)

- **Order A (brief, by space temperature):** spa → pool → greenhouse → edge.
- **Order B (by supply temperature):** spa → greenhouse (35–40 °C bench) → pool → edge. Use B unless a source shows the pool exchanger needs ≥35 °C (pool supply ?).
- Snow-melt fluid ΔT under 17 K (ASHRAE p. 52.13), so the edge loop takes one 17 K step at most.
- Edge on the return: the snow-melting system can be connected to the district's return piping (ASHRAE pp. 52.12–52.13; Klamath Falls precedent below).
- Summer: spa and pool still draw heat; greenhouse little; edge none. Winter peaks coincide for greenhouse and edge (our reading).

### Heat pumps by hall cooling type (register heat_temp: air 25–35 °C, liquid 50–60 °C)

| stage | air-cooled hall | liquid-cooled hall |
|---|---|---|
| spa (>40) | heat pump needed | direct (our reading; exchanger approach ?) |
| pool | heat pump (25–35 °C is at or below what a 28 °C pool can use, our reading); ASHRAE: pool water can take compressor waste heat (p. 6.9) | direct |
| greenhouse (35–40) | heat pump (Baie-Comeau lifted to 60 °C) | direct |
| edge | light snow / idling at 17–27 °C mean fluid: direct (our reading); design storm 34–58 °C: from the heat pump's cascade | direct (Table 7 at 55 °C) |
| layout | one heat pump at the top; the rest cascades down (our design) | no heat pump |

Lift reference: Mäntsälä 4.0 MW heat pump raises ~40 °C server air to ~85 °C (arch_ecMantsala2023).

## 4. Plant layout (default)

DC plant rules as warm_bath.md §4. Cascade-specific (our reading unless sourced):
- Heat-recovery room 5.6–15.1 m²/MW heat (hr_plant_room) on the hall's outside wall next to the wet block; hand-over on the secure line (handover.md, our design).
- Pool plant 71–106 m² + spa plant 13–20 m² in one room, pool-only equipment (BC 9.8), separate circulation per pool (BC 7.2).
- Edge manifold and glycol heat exchanger near the street (snow-melt fluid is glycol; ASHRAE ch. 52), fed from the coldest return.
- Generators, fuel and dock on the side away from the edge and the greenhouse (3 m occupiable outdoor space; 7.6 m intakes to dock).
- Chillers as dry coolers on the hall roof (no 7.6 m evaporative rule, and fits liquid cooling).

## 5. Zoning and approvals

| zone | spa | pool | greenhouse | edge | source id |
|---|---|---|---|---|---|
| Van I-3 (V339) | C | rezoning (or Community Centre C, ?) | C Urban Farm – Class B | C Park or Playground (if a use at all; our reading) | van_zdb_i3; arch_pub_vanSched; van3575s2 |
| Van I-2 (Clark Dr) | C | rezoning | C | C | van_zdb_i2; arch_pub_vanSched |
| Van FC-2 | C | rezoning | C | C | van_zdb_fc2 |
| Edm BE (E06B) | ? (no defined use) | P ≤500 m² → **3.18 variance** flag | P Urban Agriculture, no cap; "within or on a building" (3.16.1) | ? no plaza use; open landscaped ground needs no use (our reading ?) | arch_zon_EdmZones; arch_pub_edmZB |
| Edm IM | rezoning | rezoning | P Urban Agriculture | ? | arch_zon_EdmZones (2.130) |
| Edm IH | rezoning | rezoning | rezoning (no Urban Agriculture) | ? | arch_zon_EdmZones (2.140) |
| Van street works | edge over a street: canopy ≥2.75 m clear; snow-melt in the boulevard needs a street-use permit (?) | | | | arch_hce_vbblCanopy |
| Sewer | non-domestic waste ≥65 °C prohibited; mixed flow ≤40 °C (Metro Van) | | | | arch_mvSewerBylaw299 |

## 6. Precedents

| precedent | what it shows | source id | kind |
|---|---|---|---|
| Klamath Falls downtown sidewalk snowmelt, Oregon (Geo-Heat Center Quarterly Bulletin 16(4)) | snowmelt uses "geothermal heated water on the return side" of the city's district heating, under sidewalks, ramps and crosswalks | typ_heat_cascade_klamathSnowmelt | government-funded bulletin (US) |
| Klamath Falls district heating (Brown, GHC Bulletin 20(1), Mar 1999) | 5.9 MWt system; customers grew to include "extensive areas of sidewalk snowmelt"; cited by ASHRAE for return-side snow melt | typ_heat_cascade_brown1999 | government-funded bulletin (US) |
| Lund 2005, Direct heat utilization worldwide (Geo-Heat Center) | defines cascading; Sapporo snow-melt waste water "retained at 65oC and reused for bathing" (the reverse order); agriculture and aquaculture 25–90 °C | typ_heat_cascade_lund2005 | government/university paper |
| Baie-Comeau, Quebec (ÉTS) | data-centre heat to a 153 m² greenhouse; heat pump to 60 °C | arch_etsBaieComeau | university summary |
| Eastglen, Edmonton | hot pool (40 °C class) + lap pool share plant and change: stages 1–2 in one building | arch_edmEastglen2017 | government |
| Exmouth, UK | data-centre unit heats a public pool (claim) | arch_ho_eddcExmouth | operator claim |
| Rjukan, Norway | data-centre heat to a trout farm ~800 m away (claim) | arch_wet_greenMountain2021 | operator claim |
| Oró et al. 2018; Terenius et al. 2023 | liquid-cooled DC heat to a pool (design study); air at 30–40 °C, liquid immersion ≥50 °C; heat "preferably" used as-is | typ_heat_cascade_oro2018; typ_heat_cascade_terenius2023 | peer-reviewed |
| Data centre feeding all four stages | ? none found | — | — |

## 7. Fit on both sites (our arithmetic; plant-included ratios from the golden runs)

| | V339 (I-3) | E06B (BE) |
|---|---|---|
| Programs' share (tool) | 1,577 m² | 2,056 m² |
| Cascade 1,089–1,507 m² | 21–29 % of 5,257; 69–96 % of the share | 16–22 % of 6,854; 53–73 % of the share |
| Ground | wet block + greenhouse all at grade with no hall above: ≥≈1,300 m² of the 1,752 m² footprint; pool already not placeable in the run | 4,022 m² footprint; fits; greenhouse south of the hall |
| Height | ground storey ≥6.0 m; greenhouse gutter 4–5.5 m | 16.0 m |
| Zoning | pool rezoning | pool variance flag; spa ? |
| **Verdict** | **no** as of right; a "lite" cascade without the pool (spa → greenhouse → edge, ≈480–545 m², our arithmetic) fits on zoning (all C) | **yes, with the 3.18 flag** |
| What limits it | ground floor, pool use, plant yard | pool cap; spa use class; generator yard (run) |

## 8. Gaps and open questions

- Pool exchanger supply temperature (?), which decides Order A vs B.
- Spa annual load; any measured pool or spa kWh/m² in Canada (?).
- Edge size: no minimum plaza size in either city; which US city stands in for Edmonton and Vancouver (J.B. to pick).
- Edmonton zoning for a heated public edge; snow-melt in the City boulevard (permits ?).
- Greenhouse occupancy (F-2, F-3 or A-2) and its separation.
- Oró et al. 2018 figures (abstract not read; paywalled).
- No built data-centre four-stage cascade found; Klamath Falls is a geothermal (not data-centre) precedent.
