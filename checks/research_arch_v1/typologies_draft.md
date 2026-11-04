# Typology library — draft (3 Nov 2026)

For J.B.'s 3 Nov direction: prebuilt program-sharing typologies, applied to any lot and adjusted to it. **Draft for J.B. Nothing here is approved yet.**

How to read this:
- Every figure has a source id from the register, `tool/arch_programs.json` or the research files. "?" means no source was found.
- "Our arithmetic" and "our reading" are labelled where used.
- "Tool run" means the 3 Nov golden arch outputs (`checks/golden/arch/*.json`). These are tool results, not sources.
- No figure was made up. Where a typology needs a figure that has no source, it says "?".

---

## Summary

| # | Name | Programs | Stacking | Programs' share of floor area (our arithmetic) | 339 1st Ave E (I-3) | 64 Airport Rd NW (BE) |
|---|---|---|---|---|---|---|
| T1 | Plinth | public ground floor, refuge, day warming room | programs on the ground floor, hall above | V: 23–33 % · E: ≤50 % | **fits** (conditional uses) | fits, but only 1 hall storey |
| T2 | Street row | refuge, community room, day warming room | programs along the street at grade, hall at the back | E: ≈10 % | **no**: the hall can't be at grade | **fits** (each program ≤500 m²) |
| T3 | Warm bath | spa, therapy pool (full pool as a variant) | beside the hall, never above it | 7–8 % (full pool 16–19 %) | partly (spa conditional; therapy pool ?; full pool needs rezoning) | partly (therapy pool fits; spa ?; full pool blocked) |
| T4 | Grow house | greenhouse, fish farm | at grade on the sunny side of the hall | V: 3 % · E: 13 % | greenhouse only (fish farm needs rezoning) | **fits** at grade; on the roof ? |
| T5 | Winter room | winter garden, gym (incl. climbing) | glazed public front, hall behind | ? (winter garden size ?) | fits (both conditional) | fits (winter garden ≤500 m²) |
| T6 | Work yard | commercial laundry, food drying, kitchen | shares the service side with the data centre | ? (sizes mostly ?) | fits (all conditional) | fits; kitchen zoning ? |
| T7 | Heat hub | energy transfer room, heat-recovery plant, neighbourhood heat plant | on the secure line, on an outside wall | <1 % | ETS fits; plant zoning ? | **fits** (Minor Utility P) |
| T8 | Twin | overnight shelter or refuge in its own building | a separate building on the lot | 1.5–4 % | **blocked** outright (one principal building) | fits |

DC = data centre. V = 339 1st Ave E, E = 64 Airport Rd NW. The data centre's share is the rest of the allowed floor area, after the limits in "Site facts" below.

---

## Site facts used

| | 339 1st Ave E (V339) | 64 Airport Rd NW (E06B) | source |
|---|---|---|---|
| Zone | I-3, sub-area A (assumed; Map 1 not re-checked ?) | BE | heights_basement.md; zones.md |
| Data centre allowed? | Conditional | Discretionary (Minor or Major Industrial) | van_zdb_i3 2.1; edmLDA26, arch_zon_Edm720 |
| Lot | 4,503 m² | 4,284 m² | tool run (`base.lot`) |
| Buildable footprint | 1,892 m² | 4,023 m² | tool run (`base.build`) |
| Height | 18.3 m outright; 30.5 m with approval | 16.0 m, no variance | van_zdb_i3 3.1.2.1, 3.1.2.10; arch_zon_EdmZones 4.1.1, arch_mun_edm7100 6.1.1 |
| Floor area cap | FSR 3.00 → 13,509 m² (our arithmetic) | FAR 1.6 → 6,854 m² (our arithmetic) | van_zdb_i3 3.1.1.1(a); arch_zon_EdmZones Table 4.1.2 |
| What limits floor area now | envelope: 3 × 1,892 = 5,676 m² | FAR: 6,854 m² | tool run (`calc.by`) |
| Non-industrial uses | ≤1.00 FSR combined → 4,503 m² (our arithmetic) | 500 m² per establishment (Community Service, Health Service, Food and Drink, Indoor Sales and Service, Major Indoor Entertainment); variance only with mitigation (3.18) | van_zdb_i3 3.1.1.1(b); arch_zon_EdmZones 3.3.1, 3.7.1, 3.12.1, 3.18 |
| Ground floor | "Bulk data storage is not permitted at the ground floor, except for entrances" | street windows ≤10 % non-transparent; main entrance visible from the street | van_zdb_i3 2.2.11; arch_zon_EdmZones 5.3.1–2 |
| Storey heights | ground ≥6.0 m, upper ≥4.0 m | none in the zone | van_zdb_i3 3.1.2.9; arch_hb_edmBE |
| Yards | front 0.6 m, side 7.6 m, rear 3.1 m; building ≤61 × 61 m | street 6.0 m (4.5 m on a Collector or Local Road; Airport Rd class ?); side and rear 0 m | van_zdb_i3 3.1.2.2–8; arch_zon_EdmZones 4.1.3–7 |
| Coverage | none | none | arch_hb_vanI3; arch_hb_edmBE |
| Flood | ≈29 % of the lot is in the flood plain; FCL 4.6 m; no switchgear below the FCL unless protected | outside the Floodplain Protection Overlay (index map only, conf. 60) | findings_input.md; arch_hb_vbblFlood; arch_hb_edmFPO |
| Roof plant | over the height only with the Director's approval | exempt from height | arch_up_vanZDB10 10.1.1(b); arch_hb_edm570 1.9 |
| Heat the hall offers (tool run) | 3,467–5,322 MWh/yr at 0.9 MW | 14,252–21,878 MWh/yr at 3.7 MW | tool run; dea, dfKatalog2022 |

**What this means (our arithmetic):** on both sites, heat is not the limiting budget. The default programs need 131–171 MWh/yr (tool run). Even a full pool needs ≈443 MWh/yr (416 kWh/m²·yr × 1,065 m²; arch_benakcha2025, low confidence). What limits the typologies is floor area, zoning, height and **supply temperature**.

---

## Rules every typology shares

These are stated once here and not repeated under each typology.

**The data centre side**
- The data centre is broken into its own rooms (18 types, dc_rooms.md).
- Support space is 13–52 % of the data centre's gross area. This comes from one filed plan set and five operator sheets; it is not a rule (dc_rooms.md §19).
- Hall size: 290–630 m² per MW (it_load_outside, operator claims).
- Hall floor-to-floor: ≈6.0 m as built (burlingtonPlans2026). Ceiling at most 9 m (fmDS0532 2.2.5.2, insurer).

**Heat temperatures**
- The data centre's heat comes out at 25–35 °C when air-cooled and 50–60 °C when liquid-cooled (register heat_temp).
- Programs that need more than that need a heat pump to lift the temperature (our reading, per program).

**Fire separation**
- The data centre is assumed F-2 (tool default).
- 2 h to A, B and C occupancies. None to D, E or F-3. D is 1 h if built to 3.2.2.57 (arch_hb_nbc3131, Table 3.1.3.1).
- A separate building joined to the data centre needs a 4 h firewall (arch_hsg_nbcFirewall 3.1.10.2).
- At most one residential suite in an F-2 building (3.1.3.2.(2)).

**Nothing wet above the hall**
- "Do not route cooling or domestic liquid piping above" the hall (fmDS0532 2.2.1.6, insurer).
- OP S710 also lists washrooms and heating water above the hall as things to consider (arch_sec2_opS710, insurer).
- Our reading: no pool, spa, fish farm, irrigated greenhouse or showers over the hall.

**Generators and fuel**
- Insurer order of preference: a separate building, then a yard, then the ground floor. Never on the roof or in a basement (fmDS0532 2.6.4.3).
- Generator room: 2 h, for that equipment only (arch_hb_nbc3628 3.6.2.8). Fuel room: 2 h (nfc2020_4313).
- 2 m between generator sets (arch_csa_c282 6.5.1.1).
- Yard tanks: 3.0 m from the property line and 1.5 m from the building (arch_csa_b139).
- Diked tank: 7.5 m to a noncombustible building (arch_up_fm0788 Table 1, insurer).
- Fuel truck: unloading without containment, 23 m (arch_up_fm0788). Parked unattended for more than 1 h, 15 m from a building (arch_sep_nfcTankVeh 4.11.2.4).
- Metro Vancouver: Tier 0/1 engines ≥100 m from a hospital, elementary school, day care or community care (arch_mv1329 s. 57).

**Intakes**
- Outdoor air intakes ≥7.6 m from a truck dock and ≥3.0 m from a combustion vent (arch_nbc6329).
- Evaporative units: 7.6 m from intakes; 3 m from doors, windows and occupiable outdoor space (arch_nbc63215).
- Generator exhaust 3 m from the same (arch_nbc6331; whether it applies: ?).

**Noise** (hard rule, J.B. 2 Nov)
- The tool blocks a size when even the quieter units exceed the limit.
- Vancouver: 65 dBA at night in an activity zone (bylaw6555 s. 2.3(b)(ii)).
- Edmonton: 75/60 dBA non-residential and 65/50 dBA residential, at the property line (arch_adj_edm14600).
- These limits do not protect programs on the data centre's own lot (our reading, adj_programs.md).

**Secure line**
- The tool starts with the tightest line that holds the hall, battery/UPS and electrical rooms, generators and fuel, and the loading dock (decision 1 Nov).
- Every public program sits outside that line.
- Fence: Vancouver caps fences in required yards at 1.9 m. RCMP asks for 2.4 m (security_perimeter.md).

**Entrances**
- Vancouver: one principal building per site (10.34.1). Each separate use has its main entrance from a street (10.21.1) (arch_up_vanZDB10).
- Principal entrance 3–15 m from the fire route (NBC 3.2.5.5).

**Roof**
- Chillers sit on the hall's own roof (tool, plant.js) and compete with roof solar.
- FM 1-15: each PV array at most 46 × 46 m, with 1.2 m aisles (arch_sec2_fm115).

---

## T1 Plinth

**Programs:**
- public ground floor (library branch 930 m², or community room 285–329 m²)
- refuge 265 m²
- day warming room 100 m²

**Why with a data centre**
- I-3 already bars data storage at the ground floor, so the plinth uses floor the hall cannot (van_zdb_i3 2.2.11).
- The refuge can run on the data centre's standby power. Generator power is legal for an owner or tenant on its own lot (bcUCAs1; euaS2).
- Low setpoints: warming 19–22 °C (arch_ahsReceptionCentres); cooling ≤26 °C (arch_vchCoolingSpaces). Supply temperature: ?
- Public benefit: refuge for heat-dome risk groups (arch_svc_bcCoronerHeat2022); library catchment 4–5 km (arch_eplPolicyB2002).

**Stacking and adjacency**
- Ground floor: programs on the street side, each with its own street entrance. Behind them: the data centre's lobby, portal and loading.
- Above: hall floors. Roof: plant.
- Floor between the programs and the hall: 2 h (A-2 below F-2; arch_hb_nbc3131).
- Data centre exit stairs may not pass through the refuge (3.3.1.3.(8), refuge_placement.md).
- Whole building takes the refuge's seismic category (decision 1 Nov).
- Secure line: hall floors and the data centre core. The plinth is outside it.

**Size ratio and storeys**
- Ground ≥6.0 m (van_zdb_i3 3.1.2.9), matching public_ground at 6.0 m (arch_vplFmpSpace2018). Hall 6.0 m (burlingtonPlans2026).
- Refuge and warming room heights: ?

**Our arithmetic, V339**
- 6.0 + 2 × 6.0 = 18.0 m ≤ 18.3 m, so ground plus 2 hall storeys.
- Programs can take at most 1,892 of 5,676 m² = 33 %.
- Sample set 930 + 265 + 100 = 1,295 m² = 23 %. That leaves 597 m² of ground floor for the DC lobby, loading and support.
- With 30.5 m approval: 6.0 + 4 × 6.0 = 30.0 m. Floor area 5 × 1,892 = 9,460 m² (under the 13,509 m² FSR cap). Programs ≤20 %.
- Tool run: the DC reached only 11 % (624 m²). Roof chiller fit and the noise limit stop it, not floor area.

**Our arithmetic, E06B**
- 6.0 m program storey (unsourced; the tool's drawn figure) + 6.0 m hall = 12.0 m. A second hall storey reaches 18.0 m > 16.0 m: blocked.
- FAR 6,854 m² over 2 storeys = 3,427 m² per floor, so the hall is ≤50 % of floor area.
- **Trade-off:** T2 keeps 2 hall storeys on this lot; T1 keeps 1.

**Hard rules**
- V: refuge, community centre and social service centre are conditional. Library is not listed (arch_edmCommunityServiceDef flag; van_zdb_i3).
- E: the 930 m² library is over the 500 m² cap, so it is blocked. The community room, refuge and warming room are each ≤500 m² and pass.
- V flood: the ground floor is business use, so the underside of the floor must be ≥4.6 m (GVRD datum). Site grade: ?
- V roof plant: reaches 20.9 m in the tool run, over 18.3 m. Needs the Director's approval (?).

**Fits**
- V339: yes, as conditional uses.
- E06B: yes, with 1 hall storey.

**Open**
- Is a library allowed on either site?
- What is the 339 1st Ave E ground elevation against the 4.6 m FCL?
- Is there any filed plan with public use under a hall? None found (heights_basement.md §4).

---

## T2 Street row

**Programs:**
- refuge 265 m²
- community room 285–329 m²
- day warming room 100 m²

**Why with a data centre**
- Same heat and power reasons as T1.
- BE wants a transparent, entered street front (5.3) and loading kept off the street side (5.8). A blank hall wall fails the first; a row of public rooms passes it (our reading).

**Stacking and adjacency**
- At grade along the street: the program row, each with its own entrance.
- Behind: the hall, 2 storeys. Yard and loading at the back or side, not between the building and the street (arch_ezbLoad BE 5.8).
- Equipment screened from streets (arch_zon_EdmZones 5.2).
- Wall between the row and the hall: 2 h. If the row is a separate building, a 4 h firewall.
- Secure line: the hall wall and the yard fence.

**Size ratio and storeys**
- Hall 2 × 6.0 = 12.0 m ≤ 16.0 m (our arithmetic). Program storey: ?
- Row: 650–694 m² of 6,854 m² = 9.5–10.1 % (our arithmetic).
- Tool run: DC 35 % (2,399 m²), programs 30 %. The DC share is capped by "2 of 4 generators do not fit in the yard" (2026-11-03_build2.md).

**Hard rules**
- BE 500 m² per establishment.
- Street setback 6.0 m or 4.5 m (road class ?).
- The clinic (605 m²) is over the cap and stays out.

**Fits**
- E06B: yes. It is the most natural fit to BE.
- V339: no. A hall at grade breaks I-3 2.2.11. Put a non-data ground storey under it and it becomes T1.

**Open**
- Is Airport Rd a Collector or Local Road?
- Does the generator yard cap move if the row takes the street edge?

---

## T3 Warm bath

**Programs:**
- spa 320 m²
- therapy pool 140 m²
- variant: public pool 1,065 m² (minimum 815 m²)

**Why with a data centre**
- Hot pools are capped at 40 °C (arch_bcPoolReg296; arch_abPoolStd2014). Therapy water is 32–35.5 °C (arch_wet_atacp2019).
- Both are at or below liquid-cooled heat. Air-cooled heat needs a heat pump (prog_wet.md, our reading).
- The pool has the highest year-round demand in the catalogue: 416 kWh/m²·yr (arch_benakcha2025, low confidence).
- Public benefit: pool catchments of 2/3/4 km (arch_svc_vanSplash2019).

**Stacking and adjacency**
- Beside the hall, **never above it** (fmDS0532 2.2.1.6).
- Below the hall: no rule either way (?).
- Own plant room, not shared with data centre equipment (arch_adj_bcPoolDesign, BC guide "should").
- Alberta chlorine room: at grade, outward door to outside, no door into the building (arch_adj_abStandataCl). Chlorine exhaust ≥3 m from intakes (arch_adj_nbcAE72). So the plant side faces a yard or lane.
- Barrier with controlled access (arch_adj_bcPoolReg). 2 h wall (A-3 / F-2).
- Outside the secure line.

**Size ratio and storeys**
- Pool hall: flat ceiling ≥3.5 m clear (arch_sportEngPoolsDGN, UK benchmark).
- Therapy pool 4.5 m (catalogue; source not found ?). Sauna at most 3.6 m high (arch_wet_vanRTS16473). Spa: ?
- Our arithmetic: 460 m² is 8.1 % of 5,676 (V) and 6.7 % of 6,854 (E). A full pool is 18.8 % (V) and 15.5 % (E).

**Hard rules**
- V: spa is conditional (Beauty and Wellness Centre). Therapy pool: ? (Swimming Pool is not listed; accessory to Health Care Office ?, which I-3 keeps off the ground floor). Full pool needs rezoning.
- E: therapy pool permitted (Health Service, ≤500 m²). Spa zoning: ? (no defined use). Full pool blocked: its 815 m² minimum is over the 500 m² cap (tool run).
- Sewer: non-domestic waste ≥65 °C prohibited (arch_mvSewerBylaw299, Metro Vancouver).

**Fits**
- V339: spa yes; therapy pool ?; full pool by rezoning only.
- E06B: therapy pool yes; spa ?; full pool no.

**Open**
- Spa use class in BE.
- Therapy pool use in I-3.
- The BC pool plant-room rule (not found).

---

## T4 Grow house

**Programs:**
- greenhouse 190 m² (growing house 153 m² + headhouse + washroom)
- fish farm 685 m² (36 t/yr tilapia)

**Why with a data centre**
- The Baie-Comeau greenhouse runs on data centre heat (arch_etsBaieComeau).
- Supply temperatures: greenhouse 35–60 °C (arch_berenschotHK et al.); fish farm heating water 35–45 °C (arch_wet_geofood2022).
- Demand runs all year. Greenhouse: 413–583 kWh/m²·yr (Prairie, our arithmetic).
- Catch: replacing gas heat loses the CO₂ supply, so another source is needed (arch_berenschotHK).
- Public benefit: food access (no distance standard).

**Stacking and adjacency**
- Greenhouse at grade on the sunny side, off the hall's shadow: yield falls 0.7–1 % per 1 % less light (arch_marcelis2006). Runs east–west (arch_uwexGhEnergy, US guide).
- Fish farm beside the hall. F-2, so no separation (arch_nbc3131).
- A greenhouse on the hall roof puts irrigation over the hall (fmDS0532 2.2.1.6) and takes the chillers' roof. Flagged.
- Outside the secure line.

**Size ratio and storeys**
- Greenhouse gutter 4–4.25 m; new designs 4.9–5.5 m (arch_hb_abGreenhouse). Fish farm: ?
- Our arithmetic: 875 m² is 12.8 % of 6,854 (E). The greenhouse alone is 3.3 % of 5,676 (V).

**Hard rules**
- Greenhouse occupancy: ? (F-2, F-3 or A-2, decided by the authority), so the separation is ?
- Vancouver: sprinklered if the public is admitted (our reading).
- Plastic glazing: FM Approved only (our reading, arch_up_fm0157).
- Fish licences: AB species from Table 1 only (arch_wet_abFishCulture). BC needs a DFO licence and a new-species review (arch_fish_dfoITC).

**Fits**
- E06B: yes at grade. Greenhouse is permitted Urban Agriculture with no cap. Fish farm permitted (whether fish-only RAS counts: ?).
- E06B roof: 12.0 + 4.0–4.25 = 16.0–16.25 m against the 16.0 m limit (our arithmetic). How height is measured on a pitched greenhouse roof: ? Blocked until shown.
- V339: greenhouse conditional (Urban Farm – Class B). Fish farm: no use, rezoning.

**Open**
- Does a greenhouse count toward I-3's 1.00 non-industrial FSR?
- Which way does 339 1st Ave E face for sun?

---

## T5 Winter room

**Programs:**
- winter garden (size ?)
- gym 445 m² (+60 m² with a climbing wall)

**Why with a data centre**
- Low setpoints: winter garden 18–20 °C (arch_pg_ward2013Kew, London benchmark); gym 16–20 °C (arch_tmp_dudzinska2021).
- Radiant heating at 45/35 °C, ≤49 °C in Edmonton (arch_tmp_vanNEU2020; arch_tmp_edmDESS2025). Liquid-cooled heat fits; air-cooled heat needs a heat pump (our reading).
- Public benefit: heated public space in winter.

**Stacking and adjacency**
- Winter garden as the glazed street or south face. Hall behind it, gym beside it.
- Gym showers not over the hall (shared rules).
- 2 h wall to the hall (A-2), so no plain glazing into the hall. This matches J.B.'s default of no viewing window.
- Glazing heat-loss peak: Vancouver 100 W/m², Edmonton 185 W/m² (our arithmetic).
- Outside the secure line.

**Size ratio and storeys**
- Gym: 445 m² is 7.8 % (V) and 6.5 % (E) (our arithmetic). Winter garden: ? So the total is ?
- Heights: all ? Climbing wall heights are in EN 12572-1/-2, which have not been uploaded.

**Hard rules**
- V: Fitness Centre and Hall are both conditional in I-3.
- E: winter garden as Community Service ≤500 m² (our reading). Gym permitted.

**Fits**
- Both sites, on zoning.
- The size can't be tested until the winter garden has a sourced size.

**Open**
- A Canadian winter garden size.
- EN 12572-1/-2.

---

## T6 Work yard

**Programs:**
- commercial laundry (≤300 m² as a Vancouver laundromat; typical size ?)
- food drying (?)
- community or production kitchen 185 m²

**Why with a data centre**
- F-2/F-3 laundry and drying need no separation from F-2 (arch_nbc3131), so the walls are the cheapest.
- Food drying by heat pump runs at 30–60 °C (arch_pg_zhu2025HP).
- Laundry needs ≥71 °C (arch_cmsLaundry2013, US) and the kitchen 60–71 °C (arch_hsg_ihFoodPlans2026). Both need a heat-pump lift.
- Public benefit: no sourced need. Laundry uses only stand-in indicators (unsourced).

**Stacking and adjacency**
- Shares the data centre's service side.
- Intakes ≥7.6 m from the dock. Kitchen exhaust ≥3.0 m from any intake (arch_nbc6329).
- Dumpsters 9 m from buildings (FM 1-20, insurer).
- Outside the secure line.

**Size ratio and storeys**
- Kitchen: 185 m² is 3.3 % (V) and 2.7 % (E) (our arithmetic). The other sizes are ?, so the ratio is ?
- Heights: ?

**Hard rules**
- V: Laundry or Cleaning Plant, Food or Beverage Products Manufacturing B and Catering Establishment are all conditional in I-3.
- E: food drying permitted (Minor Industrial, enclosed). Laundry permitted; the catalogue applies the 500 m² cap. Kitchen: ?
- Sewer: ≥65 °C prohibited, mixed flow ≤40 °C (arch_mvSewerBylaw299).

**Fits**
- Both sites, on zoning. Size ?

**Open**
- m² per washer or dryer, and per unit of drying throughput.
- Kitchen use class in BE.

---

## T7 Heat hub

**Programs:**
- energy transfer station (ETS) room
- heat-recovery heat pumps
- optional neighbourhood heat plant room

**Why with a data centre**
- It turns the data centre into a heat source for a network.
- Vancouver NEU supply is 65–95 °C, so data centre heat needs a lift (arch_ho_vanNEUconn2020).
- A Blatchford-type ambient loop runs at 10–25 °C, so heat can enter with no lift (arch_sys_breIdea2021, claim).
- The NEU may credit waste heat (neuConnect).

**Stacking and adjacency**
- ETS on an outside wall.
  - Vancouver NEU: ≥6 × 3 m below 13,940 m² of floor area, 2.7 m headroom, first basement on the perimeter (neuETS).
  - Blatchford: 12–55 m², ground floor or first parkade level, 2 h, card-reader door (arch_ho_breMultiUnit2025).
- Heat pumps: 5.6–15.1 m² per MW of heat (component_space; hr_plant_room).
- Boiler plant: 41–44 m² per MW (arch_sys_ubcAdes2019).
- Refrigeration room doors may not open to a public corridor or an assembly room (arch_up2_b52 6.2.2.2).
- Hand-over room on the secure line, one door from each side. This is our design; no source.

**Size ratio**
- ETS 18 m² is 0.3 % of 5,676 (V) and 0.26 % of 6,854 (E) (our arithmetic).
- Plant: per MW of heat, as above.

**Hard rules**
- V: Public Utility status in I-3 is ? Basement mechanical space is excluded from floor area only at or below the base surface (van_zdb_i3 4.1.2(c)). Switchgear below the FCL must be protected (arch_hb_vbblFlood).
- E: Minor Utility is permitted in BE (arch_sys_edmUtilityUses). Cooling plants are Major Utility, IH or PU only (arch_ezb640). Whether the data centre's own cooling counts: ? (our reading: no).

**Fits**
- E06B: yes.
- V339: the ETS fits; plant-room zoning is ?

**Open**
- Distance from each site to a network. Blatchford is ≈3 km north of E06B (map reading, heights_basement.md). The NEU from V339: ?
- No source says whether the utility enters the data centre (handover.md).

---

## T8 Twin

**Programs:**
- overnight warming shelter 100 m² (16 guests)
- or a refuge in its own building, 265 m²

**Why with a data centre**
- Overnight sleeping is Group C. It needs its own building because of the one-suite limit in F-2 (3.1.3.2.(2); decision 2 Nov).
- It keeps its own seismic category.
- It can open while the data centre stays locked. No rule requires that; the tool flags it.

**Stacking and adjacency**
- A separate mass on the lot: spacing by limiting distance, or a 4 h firewall if joined (arch_hsg_nbcFirewall).
- Own street entrance.
- Generators away from and downwind of its clean-air intakes (arch_hcCleanerAirSpaces, guide).
- Outside the secure line. Drop-off space 4.0 m wide, 3.5 m clear (arch_svc_vanPkg7).

**Size ratio**
- 100–265 m² is 1.5–3.9 % of 6,854 (E) (our arithmetic). Height: ?

**Hard rules**
- V: one principal building per site, so this is an accessory building if I-3 allows (?) or a rezoning (arch_up_vanZDB10 10.34.1). Overnight shelter: no listed use (?).
- E: Community Service (including shelters) is permitted at ≤500 m² (arch_zon_EdmZones). The shelter exception text conflicts between the adopted and online by-law (?). An Edmonton one-building rule: none found (?).

**Fits**
- E06B: yes.
- V339: blocked as of right.

**Open**
- Do I-3 accessory building rules allow it?
- Is an overnight shelter "community care" under Metro Vancouver s. 57 (the 100 m engine distance)?

---

## Not in a typology yet, and why

| Program | Why not | Source |
|---|---|---|
| Aquarium | 5,400 m² is over V339's 4,503 m² non-industrial cap (our arithmetic); needs rezoning in Vancouver; BE cap 500 m² | arch_programs.json; van_zdb_i3 |
| Conservatory | the 18 m height has no source (?); rezoning in Vancouver; BE cap 500 m² | heights_basement.md |
| Clinic | 605 m² is over the BE cap; not at grade in I-3; could join T1 as an upper storey (?) | van_zdb_i3; arch_zon_EdmZones |
| EV hub | zoning in BE ?; intake rule not modelled | arch_programs.json |
| Covered plaza | size ?; Edmonton zoning ? | arch_programs.json |
| Lumber drying | sizes ?; a conventional kiln needs up to 116 °C | prog_grow.md |
| River cooling, borefield, rain tank | systems feeding the budgets, not masses (decision 2 Nov) | notes |

---

## Open questions for J.B.

1. Should a typology carry one fixed stacking (T1 stacked vs T2 beside), or one typology with two variants?
2. **Program storey heights.** Only the pool (3.5 m clear), greenhouse (4–5.5 m) and I-3 minimums are sourced. Without more, nothing fits on top of a 12 m hall on E06B (hallfix Q2).
3. The DC share on both sites is capped by plant (generator yard on E06B; roof chillers and noise on V339), not by floor area. Should typologies carry a plant layout too?
4. Is the BE 3.18 variance an option the tool may offer, or does the cap block (the 2 Nov rule says it blocks)?
5. Are paired typologies allowed (e.g. T1 + T7, T4 + T7)? T7 adds <1 % of floor area and fits with most of the others.
6. Which ratio ranges to "test": the geometric maximum, or the tool's run with plant included?
