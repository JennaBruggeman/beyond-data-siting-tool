# Catalogue build: tool/arch_programs.json (2 Nov 2026)

Per CATALOGUE_BRIEF.md. Null = no source in the checked research ("?"). Counts are leaf fields of size, occ, heat, zoning, place and social.catchment (src and note not counted; a null step counts once).

- Programs: 25 (masses 20, surfaces 2, systems 3)
- Fields filled: 356; null: 343
- Source id problems: 0

## Source notes

- Ids cited in the research but missing from register new_sources, so not used: arch_ezb5120, arch_sep_waEcologyHIA2025, bylaw6555, bylaw14600.
- sys.md flags the Alberta GSHE Directive as 'new source id needed ?'; register already holds it as `abDirective` (used for borefield setbacks).
- spatial_rules.md D/F-2 3 h rows ignored (superseded); register arch_nbc3131 used.
- Dropped for lack of a register id: VBBL 3.3.1.1.(5) ground-floor suite 2 h and NBC(AE) 3.3.1.3.(10) assembly egress (adj_occupancy.md cites clauses, no ids).

## Per program: null fields and why

### refuge (20 filled, 10 null)
- `size.min_m2`: no sourced minimum capacity for a refuge (VCH, ESS, Vancouver memo give none)
- `size.max_m2`: no size ceiling in research; Edmonton BE 500 m² cap kept in zoning.edm
- `size.step.units_min`: no sourced minimum count
- `size.storeys_typ`: not in research
- `size.floor_height_m`: not in research
- `heat.supply_C`: supply temperature not found
- `heat.W_m2_peak`: peak W/m² not found
- `heat.lift_needed`: depends on supply temperature (?)
- `place.outside_wall`: no rule found
- `social.catchment`: walking-distance standard searched, not found

### pool (24 filled, 6 null)
- `size.max_m2`: no ceiling sourced
- `size.storeys_typ`: not in research
- `heat.supply_C`: pool heat-exchanger supply temperature not found (ASHRAE paywalled)
- `heat.W_m2_peak`: no public primary peak W/m² (UBC exchanger rating only, student report)
- `heat.lift_needed`: supply temperature unknown
- `place.grade`: BC: no at-grade rule found; AB at grade only for gas chlorine room

### laundry (15 filled, 12 null)
- `size.typical_m2`: laundromat and institutional laundry floor area not found
- `size.min_m2`: no minimum size found
- `size.step`: no sourced size step
- `size.storeys_typ`: not in research
- `size.floor_height_m`: not in research
- `heat.setpoint_C`: no room set point in research
- `heat.kWh_m2_yr`: figures are per kg of linen, not per m²
- `heat.W_m2_peak`: not found
- `place.grade`: no siting rule found
- `place.street_entrance`: no rule specific to laundry
- `place.outside_wall`: no rule found
- `social.catchment`: no Canadian need or distance standard found

### spa (14 filled, 13 null)
- `size.min_m2`: no minimum spa size found
- `size.max_m2`: no ceiling sourced
- `size.step`: no sourced step (hot tub + sauna unit is our reading only)
- `size.floor_height_m`: not in research (sauna ≤3.6 m is a room height)
- `heat.supply_C`: not found (>40 °C at exchanger is our reading)
- `heat.kWh_m2_yr`: no public primary figure
- `heat.W_m2_peak`: no public primary figure
- `heat.lift_needed`: supply temperature unknown
- `zoning.edm.status`: Edmonton use or zone not settled in research (see use text)
- `zoning.edm.cap_m2`: no Edmonton spa use, so no cap applies
- `place.street_entrance`: no rule specific to spa
- `place.outside_wall`: no rule found
- `social.catchment`: no provision standard found

### therapy_pool (16 filled, 11 null)
- `size.max_m2`: no ceiling sourced
- `size.step`: no sourced unit step
- `size.storeys_typ`: not in research
- `heat.supply_C`: not found
- `heat.kWh_m2_yr`: no figure (lap pool proxy only)
- `heat.W_m2_peak`: not found
- `heat.lift_needed`: supply temperature unknown
- `zoning.van.status`: pool as accessory to Health Care Office is our reading only
- `place.grade`: no rule found
- `place.street_entrance`: no rule specific to therapy pool
- `place.outside_wall`: no rule found

### aquarium (14 filled, 13 null)
- `size.min_m2`: no minimum found
- `size.max_m2`: no ceiling sourced
- `size.step`: no step found
- `size.storeys_typ`: not in research
- `size.floor_height_m`: not in research
- `heat.supply_C`: not a heat user
- `heat.kWh_m2_yr`: heat figure not found (electricity only)
- `heat.W_m2_peak`: not found
- `heat.lift_needed`: not a heat user
- `place.grade`: no rule found
- `place.street_entrance`: no rule found
- `place.outside_wall`: no rule found
- `social.catchment`: none found

### fish_farm (18 filled, 12 null)
- `size.min_m2`: no minimum found
- `size.max_m2`: no ceiling sourced
- `size.step.units_min`: no minimum output found
- `size.storeys_typ`: not in research
- `size.floor_height_m`: not in research
- `heat.kWh_m2_yr`: heat-only figure not found (Bergman bundles heat with electricity)
- `heat.W_m2_peak`: not found
- `zoning.edm.cap_m2`: Urban Agriculture has no cap in research
- `place.grade`: no rule found
- `place.street_entrance`: not public
- `place.outside_wall`: no rule found
- `social.catchment`: out of scope

### greenhouse (17 filled, 10 null)
- `size.min_m2`: no minimum commercial or community size found
- `size.max_m2`: no ceiling sourced
- `size.step`: no step found
- `size.floor_height_m`: not in research
- `occ.group`: no code class stated; AHJ (?)
- `occ.sep_h_from_F2`: class open, so separation open
- `zoning.edm.cap_m2`: Edmonton use or zone not settled in research (see use text)
- `place.street_entrance`: no rule found
- `place.outside_wall`: no rule found
- `social.catchment`: 1 km is a study finding, not a standard

### conservatory (18 filled, 9 null)
- `size.min_m2`: no standard; smallest Canadian biome found ≈390 m² is an example, not a minimum
- `size.max_m2`: no ceiling sourced
- `size.step`: no step found
- `heat.supply_C`: not found (hot-water pipes, temperature ?)
- `heat.lift_needed`: supply temperature unknown
- `place.grade`: no rule found
- `place.street_entrance`: no rule found
- `place.outside_wall`: no rule found
- `social.catchment`: no provision standard found

### food_drying (12 filled, 15 null)
- `size.typical_m2`: not found
- `size.min_m2`: not found
- `size.max_m2`: not found
- `size.step`: not found
- `size.storeys_typ`: not found
- `size.floor_height_m`: not found
- `heat.setpoint_C`: drying air range given as supply
- `heat.kWh_m2_yr`: figures per kg water, not per m²
- `heat.W_m2_peak`: not found
- `heat.lift_needed`: 30–60 °C overlaps 45–60 °C liquid-cooling heat: our reading only
- `zoning.edm.cap_m2`: no cap in research
- `place.grade`: no rule found
- `place.street_entrance`: not public
- `place.outside_wall`: no rule found
- `social.catchment`: none

### lumber_drying (12 filled, 15 null)
- `size.typical_m2`: kiln floor area per bf not found
- `size.min_m2`: not found
- `size.max_m2`: not found
- `size.step`: no m² per bf
- `size.storeys_typ`: not found
- `size.floor_height_m`: not found
- `heat.setpoint_C`: kiln temperature given as supply
- `heat.kWh_m2_yr`: per MBF, not per m²
- `heat.W_m2_peak`: not found
- `heat.lift_needed`: depends on kiln type (see options)
- `zoning.edm.cap_m2`: no cap in research
- `place.grade`: no rule found
- `place.street_entrance`: not public
- `place.outside_wall`: no rule found
- `social.catchment`: none

### public_ground (20 filled, 7 null)
- `size.min_m2`: VPL and EPL give no minimum branch or community room size
- `size.max_m2`: VPL targets to 2,320 m² are a range, not a cap
- `size.step`: no step found
- `heat.setpoint_C`: not in research
- `heat.supply_C`: not found
- `heat.W_m2_peak`: not found
- `heat.lift_needed`: supply temperature unknown

### winter_garden (16 filled, 11 null)
- `size.typical_m2`: no sourced example
- `size.min_m2`: not found
- `size.max_m2`: not found
- `size.step`: not found
- `size.storeys_typ`: not found
- `size.floor_height_m`: not found
- `heat.kWh_m2_yr`: yearly heat not found
- `place.grade`: no rule found
- `place.street_entrance`: no rule found
- `place.outside_wall`: no rule found
- `social.catchment`: none found

### covered_plaza (14 filled, 13 null)
- `size.typical_m2`: not found
- `size.min_m2`: guide sets none
- `size.max_m2`: not found
- `size.step`: not found
- `size.floor_height_m`: not found
- `occ.group`: whether an open canopy is a building is our reading
- `occ.sep_h_from_F2`: class open
- `heat.setpoint_C`: outdoor space
- `heat.kWh_m2_yr`: no Canadian design data
- `zoning.edm.status`: Edmonton use or zone not settled in research (see use text)
- `zoning.edm.cap_m2`: no use, no cap
- `place.outside_wall`: outdoor
- `social.catchment`: none found

### warming_shelter (18 filled, 12 null)
- `size.min_m2`: no sourced minimum
- `size.max_m2`: no ceiling (Edm cap in zoning)
- `size.step.units_min`: not found
- `size.storeys_typ`: not found
- `size.floor_height_m`: not found
- `heat.supply_C`: not found
- `heat.kWh_m2_yr`: not found
- `heat.W_m2_peak`: not found
- `heat.lift_needed`: supply unknown
- `place.grade`: no rule found
- `place.outside_wall`: no rule found
- `social.catchment`: none found

### gym (18 filled, 9 null)
- `size.min_m2`: not found
- `size.max_m2`: not found
- `size.step`: Van class threshold is zoning, not a step
- `size.storeys_typ`: not found
- `heat.W_m2_peak`: not found
- `zoning.edm.cap_m2`: no cap found for Minor Indoor Entertainment
- `place.grade`: no rule found
- `place.street_entrance`: no rule found
- `place.outside_wall`: no rule found

### ev_hub (12 filled, 18 null)
- `size.typical_m2`: no sourced hub size
- `size.min_m2`: not found
- `size.max_m2`: not found
- `size.step.units_typ`: 8 × 150 kW is illustrative only, not sourced
- `size.step.units_min`: not found
- `size.storeys_typ`: not found
- `size.floor_height_m`: not found
- `heat.setpoint_C`: electric load
- `heat.supply_C`: electric load
- `heat.kWh_m2_yr`: not a heat user
- `heat.W_m2_peak`: charger waste heat not quantified
- `heat.lift_needed`: not a heat user
- `zoning.edm.status`: Edmonton use or zone not settled in research (see use text)
- `zoning.edm.cap_m2`: no use, no cap
- `place.grade`: no rule found
- `place.street_entrance`: no rule found
- `place.outside_wall`: no rule found
- `social.catchment`: none found

### clinic (19 filled, 11 null)
- `size.min_m2`: smallest BC UPCC 490 m² is an example, not a rule
- `size.max_m2`: not found
- `size.step.units_min`: not found
- `size.storeys_typ`: not found
- `size.floor_height_m`: not found
- `heat.setpoint_C`: not in research
- `heat.W_m2_peak`: not found
- `heat.lift_needed`: depends on terminals (45–70 °C)
- `place.street_entrance`: no clinic siting rule found
- `place.outside_wall`: no rule found
- `social.catchment`: no provincial standard found

### community_kitchen (11 filled, 16 null)
- `size.typical_m2`: no m² in any Canadian guide read
- `size.min_m2`: not found
- `size.max_m2`: not found
- `size.step`: not found
- `size.storeys_typ`: not found
- `size.floor_height_m`: not found
- `occ.group`: production kitchen class open
- `occ.sep_h_from_F2`: class open
- `heat.setpoint_C`: not in research
- `heat.kWh_m2_yr`: 3.17 GJ/m² is total energy incl. cooking, not heat
- `heat.W_m2_peak`: not found
- `zoning.edm.cap_m2`: no cap for Custom Manufacturing in research
- `place.grade`: no rule found
- `place.street_entrance`: no rule found
- `place.outside_wall`: no rule found
- `social.catchment`: none found

### heat_plant (12 filled, 18 null)
- `size.typical_m2`: no sourced plant-room size for this scale
- `size.min_m2`: not found
- `size.max_m2`: not found
- `size.step.units_typ`: not found
- `size.step.units_min`: not found
- `size.storeys_typ`: not found
- `size.floor_height_m`: not found
- `occ.group`: not determined
- `occ.sep_h_from_F2`: not determined
- `heat.setpoint_C`: plant
- `heat.kWh_m2_yr`: plant
- `heat.W_m2_peak`: plant
- `heat.lift_needed`: depends on network (see options)
- `zoning.van.status`: Vancouver use or district not settled in research (see use text)
- `zoning.edm.cap_m2`: no cap
- `place.grade`: location rule is for ETS rooms only
- `place.street_entrance`: no rule found
- `social.catchment`: none

### roof_solar (7 filled, 20 null)
- `size.typical_m2`: set by the roof
- `size.min_m2`: not found
- `size.step`: n/a
- `size.storeys_typ`: n/a
- `size.floor_height_m`: n/a
- `occ.group`: surface
- `occ.sep_h_from_F2`: surface
- `heat.setpoint_C`: n/a
- `heat.supply_C`: n/a
- `heat.kWh_m2_yr`: PV yield not in this research
- `heat.W_m2_peak`: n/a
- `heat.lift_needed`: n/a
- `zoning.van.status`: not researched
- `zoning.van.districts`: Vancouver use or district not settled in research (see use text)
- `zoning.edm.status`: not researched
- `zoning.edm.zones`: Edmonton use or zone not settled in research (see use text)
- `zoning.edm.cap_m2`: not researched
- `place.street_entrance`: n/a
- `place.outside_wall`: n/a
- `social.catchment`: n/a

### facade_solar (8 filled, 19 null)
- `size.typical_m2`: set by the walls
- `size.min_m2`: n/a
- `size.max_m2`: n/a
- `size.step`: n/a
- `size.floor_height_m`: n/a
- `occ.group`: surface
- `occ.sep_h_from_F2`: surface
- `heat.setpoint_C`: n/a
- `heat.supply_C`: n/a
- `heat.kWh_m2_yr`: PV yield not in this research
- `heat.W_m2_peak`: n/a
- `heat.lift_needed`: n/a
- `zoning.van.status`: not researched
- `zoning.van.districts`: Vancouver use or district not settled in research (see use text)
- `zoning.edm.status`: not researched
- `zoning.edm.zones`: Edmonton use or zone not settled in research (see use text)
- `zoning.edm.cap_m2`: not researched
- `place.street_entrance`: n/a
- `social.catchment`: n/a

### river_cooling (7 filled, 20 null)
- `size.typical_m2`: space for intake, outfall and pump house not found
- `size.min_m2`: n/a
- `size.max_m2`: n/a
- `size.step`: n/a
- `size.storeys_typ`: n/a
- `size.floor_height_m`: n/a
- `occ.group`: system
- `occ.sep_h_from_F2`: system
- `heat.setpoint_C`: n/a
- `heat.supply_C`: river temperatures not found
- `heat.kWh_m2_yr`: n/a
- `heat.W_m2_peak`: n/a
- `heat.lift_needed`: n/a
- `zoning.van.status`: zoning not researched for systems
- `zoning.edm.status`: zoning not researched for systems
- `zoning.edm.cap_m2`: zoning not researched for systems
- `place.grade`: no siting rule beyond waterfront
- `place.street_entrance`: no siting rule beyond waterfront
- `place.outside_wall`: no siting rule beyond waterfront
- `social.catchment`: n/a

### borefield (8 filled, 22 null)
- `size.typical_m2`: W per m not legible/paywalled, so no size per MW
- `size.min_m2`: n/a
- `size.max_m2`: n/a
- `size.step.units_typ`: not found
- `size.step.units_min`: not found
- `size.storeys_typ`: n/a
- `size.floor_height_m`: n/a
- `occ.group`: system
- `occ.sep_h_from_F2`: system
- `heat.setpoint_C`: n/a
- `heat.kWh_m2_yr`: n/a
- `heat.W_m2_peak`: W per m not found
- `heat.lift_needed`: heat pump assumed by fluid limits; not stated as rule
- `zoning.van.status`: zoning not researched for systems
- `zoning.van.districts`: zoning not researched for systems
- `zoning.edm.status`: zoning not researched for systems
- `zoning.edm.zones`: zoning not researched for systems
- `zoning.edm.cap_m2`: zoning not researched for systems
- `place.grade`: no siting rule found in research
- `place.street_entrance`: no siting rule found in research
- `place.outside_wall`: no siting rule found in research
- `social.catchment`: n/a

### rain_tank (6 filled, 21 null)
- `size.typical_m2`: tank size follows demand; not sourced
- `size.max_m2`: n/a
- `size.step`: n/a
- `size.storeys_typ`: n/a
- `size.floor_height_m`: n/a
- `occ.group`: system
- `occ.sep_h_from_F2`: system
- `heat.setpoint_C`: n/a
- `heat.supply_C`: n/a
- `heat.kWh_m2_yr`: n/a
- `heat.W_m2_peak`: n/a
- `heat.lift_needed`: n/a
- `zoning.van.status`: zoning not researched for systems
- `zoning.van.districts`: zoning not researched for systems
- `zoning.edm.status`: zoning not researched for systems
- `zoning.edm.zones`: zoning not researched for systems
- `zoning.edm.cap_m2`: zoning not researched for systems
- `place.grade`: no siting rule found in research
- `place.street_entrance`: no siting rule found in research
- `place.outside_wall`: no siting rule found in research
- `social.catchment`: n/a

## Check 2 applied (2 Nov 2026)

From catalogue_check2.json/.md. All src ids checked against register new_sources (python): none missing.

- refuge: occ.src + arch_pub_nbcA3121 (A-2 community halls)
- refuge: place.grade "at grade" → "?" (true for under-hall option only, in note)
- refuge: adj street (drop-off): note labelled our reading
- refuge: flag "host locked": wrong id arch_ahsReceptionCentres dropped, marked research finding
- pool: size.note: step-model mismatch (1,395 vs 2,131 m²) noted
- pool: heat.note: water vs air 28–31 °C; 416 kWh labelled outside Canada (France)
- pool: place.note: outside wall is AB only
- pool: zoning.edm.src + arch_edmCommunityServiceDef
- pool: adj keep apart hall: hard true → false ("should")
- laundry: size.note: 300 m² max applies to Van self-service only
- laundry: occ.src + arch_nbcDefF (D self-service, F-2 other)
- laundry: heat.note: CMS (US), Fiaschi (Italy), Bobák (Czech) labelled outside Canada
- laundry: flag "no precedent": wrong id arch_sintefCleantex dropped, cites research file
- spa: size.src + arch_wet_bcPoolDesignHT (0.6 m bench)
- spa: place.grade "any" → "?"
- therapy_pool: size.note: UK benchmark, min = smallest example, Changing Places not in register text ?
- therapy_pool: heat.note: set points labelled UK
- therapy_pool: zoning.van.districts: I-1C added (+ van_zdb_i1c)
- fish_farm: heat.lift_needed false → null, "depends on cooling type" (+ arch_berenschotHK)
- fish_farm: barramundi density: arch_fish_faoBarra added (size.src; options have no src field)
- greenhouse: size.note: AB mean ≈5,900 → ≈5,955 m² (our arithmetic)
- greenhouse: heat: 627 W/m² labelled our arithmetic (ÉTS secondary estimate); src + arch_bcbcAppC
- greenhouse: vertical farm: labelled US DOE benchmark; arch_doeSslHort2017 added to heat.src
- greenhouse: flag sprinkler: labelled our reading
- conservatory: size.note: 18 m is apex of a smaller example
- conservatory: heat.note: Kew 4,500 m² labelled operator claim
- conservatory: zoning.edm.zones: MU added (+ arch_wet_edmMU)
- food_drying: zoning.van.src + arch_pg_vanZoningUses
- food_drying: zoning.edm.src + arch_zon_EdmZones (IM)
- food_drying: adj 30 m: labelled by analogy (retail/foodservice code)
- lumber_drying: zoning.edm.src + arch_zon_EdmZones
- lumber_drying: conventional kiln: "82–116 °C" → up to 82 °C hardwood, 116 °C high-temp softwood
- public_ground: size.note: 6.0 m floor height labelled I-3 only
- public_ground: occ.src + arch_pub_nbcA3121; 3.1.2.7 marked ?
- public_ground: adj 4.5 m: with "intakes" → "garbage"
- public_ground: flag garbage room: labelled model spec (benchmark)
- winter_garden: heat.lift_needed false → null, "depends on cooling type"; Kew labelled London benchmark
- winter_garden: flag atrium 3.2.8 marked ?
- covered_plaza: size.storeys_typ 1 → null
- covered_plaza: heat.lift_needed false → null; "can run on district return" dropped; US data labelled
- covered_plaza: place.note: unsourced "not screened from street" dropped
- warming_shelter: flag activation: + arch_edmExtremeWeather (Edm −20 °C)
- gym: heat.lift_needed false → null, "depends on cooling type"
- ev_hub: heat.note: 7.2 kW labelled our arithmetic
- ev_hub: flag I-3 gasoline: + van_zdb_i3
- clinic: heat.src: 45–70 °C source neuConnect → arch_tmp_vanNEU2020
- clinic: place.note: "not at grade" limited to Van I-3/FC-2 (tool gates it there); grade kept
- clinic: zoning.van.districts: I-2 cap = greater of 235 m² or 33.3 % (office combined)
- community_kitchen: heat: DHW 60 °C source neuConnect → arch_tmp_edmDESS2025
- community_kitchen: zoning.edm: use/zones not in register text → marked ?, status permitted → "?"
- heat_plant: heat.src + arch_tmp_vanNEU2020 (65–95 °C)
- heat_plant: flag NEU bill credit: arch_ho_vanNEUconn2020 → neuConnect
- heat_plant: flag Major Utility: "IH only" → "IH or PU" (+ arch_sys_edmUtilityUses)
- heat_plant: flag W/m²: 48–58 → 48–56 (58 ?) (+ arch_sys_ubcAdes2019)
- heat_plant: flag CSA B52: arch_nbc3628 → nbc6215 (NBC 6.2.1.5)
- roof_solar: size.max_m2 2,116 → null (FM limit is per array)
- roof_solar: flag FM 1-15: 2,116 m² per array kept as flag
- roof_solar: flag no PV pathway clause: labelled our inference ?
- facade_solar: size.storeys_typ 3 → null (3 is the no-sprinkler limit)
- river_cooling: size.note: ΔT 5 K marked ?; both screen velocities (0.9 / 1.4 m² per MW)
- borefield: size.note: MCS (UK) and ORNL (US) labelled benchmarks
- rain_tank: size.min_m2 7.5 → null; cited arch_sys_vanRain2024 as small-site example; yield gross of first-flush

Not done here (register text, outside this file): add Changing Places (ATACP s. 2.11), ASHRAE ch. 51 55 °C and 630–950 W/m², AB Directive Table 4 setbacks, Edm Custom Manufacturing clause, and the "no PV standard" inference to register new_sources. Until then those values carry "?" or stay as flagged.

## Check 3 applied (2 Nov 2026)

From catalogue_check3.json (635 values: 595 confirmed, 33 arithmetic re-done, 3 wrong, 4 unsupported). All src ids checked against register new_sources (python): none missing. Fields filled now 354, null 345 (gym floor height, greenhouse lift set null).

- pool: zoning.van.districts + I-1C (not listed there either; + van_zdb_i1c)
- aquarium: zoning.van.districts + I-1C (not listed there either; + van_zdb_i1c)
- spa: hot tub turnover flag + arch_wet_nbcAE726 (AB 15–20 min)
- therapy_pool: zoning.edm.src + arch_wet_edmMU (MU Health Service)
- clinic: zoning.edm.src + arch_wet_edmMU (MU Health Service)
- aquarium: heat.uses "cooling" labelled as tropical-benchmark reading; Canadian heating need ?
- greenhouse: heat.lift_needed true → null ("depends on cooling type"; 35–40 °C bench heating, ASABE)
- greenhouse: zoning.edm.src and place.src + arch_zon_EdmZones (Urban Agriculture BE 2.25, IM 2.16, 3.16.1 "on a building")
- conservatory: zoning.edm.src + arch_zon_EdmZones (3.3.1 cap); variance flag id arch_edmZB20001_BE → arch_zon_EdmZones (3.18)
- winter_garden: atrium 3.2.8 flag: id arch_pub_nbc3131full dropped (does not hold 3.2.8); no register source ?
- gym: size.floor_height_m 4.5 → null (4.5 m is the max bouldering-wall height, not a storey height)
- heat_plant: W/m² flag 48–56 → 47–56 (NEU 27.2 MW ÷ 576,000 m² = 47 if 5 MW is inside 24 MW)
- heat_plant: place.note: outside-wall rule is for ETS rooms, labelled by analogy
- heat_plant: CSA B52 flag: NBC/AB only; BC route ?

Supported only by the research .md, not register text (to add to the register): therapy_pool Changing Places 12 m² and covered_plaza 55 °C / 630–950 W/m² (both carry "?"); borefield AB setbacks (sys.md, Directive Table 4); barramundi AB Cat. 2 (fish_species.md). Basis note: conservatory and winter_garden W/m² are per m² glazing; greenhouse per m² floor.
