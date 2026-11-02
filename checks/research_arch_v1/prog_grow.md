# Group B (prog_grow): conservatory / tropical house; drying (food, lumber, sludge)

Research 2 Nov 2026 per BRIEF_v2.md and BRIEF.md. New ids → `prog_grow_sources.json` (`arch_pg_*`). Reused ids are not repeated there: arch_nbc3131, arch_nbcDefF, arch_asabeEp406, arch_bcbcAppC, arch_marcelis2006, arch_abGhBmp, arch_adj_bcFPR, arch_adj_abFoodCode, arch_mvSewerBylaw299, arch_zon_Edm720, arch_edmZB20001_BE, arch_edmZB20001_IM, arch_ezb640, arch_svc_vanFoodStrategy2013, arch_svc_edmFresh; local zoning copies van3575s2, van_zdb_i2, van_zdb_i3, van_zdb_i1c, van_zdb_fc2 (June 2026; I-1C Nov 2025).

"?" = not confirmed. "our arithmetic" / "our reading" = ours, not the source's words. Codes: NBC = NBC 2020; BC = BCBC 2024; AB = NBC(AE) 2023.

## Key findings first

- **Conservatory = A-2 (our reading)**, so **2 h** from the F-2 data hall (Table 3.1.3.1). NBC Group G-3 "greenhouse" applies only on "land ... devoted to the practice of farming", so not to a public conservatory on an urban lot. NBC(AE) 2023 has no Group G.
- **Edmonton names it:** "indoor botanical gardens" = Major Indoor Entertainment → BE only, **≤500 m² per establishment** (3.3.1; variance 3.18). A Muttart-size large pyramid (660 m²) would need a variance. Not in IM.
- **Vancouver:** "Zoo or Botanical Garden" is a listed use but **not listed in I-2, I-3, I-1C or FC-2** → needs rezoning/CD-1 (our reading).
- **Drying needs hotter heat than the data centre gives.** Heat-pump food drying 30–60 °C fits; dehumidification lumber kilns peak ~55 °C; conventional kilns run to 82–116 °C; sludge-drying waste heat "usually 70–150 °C" (maker claim). So most drying needs a heat-pump lift.
- **Food and lumber drying (F-2/F-3) need no major-occupancy separation from F-2** (Table 3.1.3.1 "—"). **Sludge drying is the outlier**: explosive dust, odour; in Vancouver no data-centre district allows it; in Edmonton it is Major Utility (not in BE or IM).

## B1. Botanical conservatory / tropical house

### Size

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Muttart (Edmonton), arid pyramid | "This pyramid is huge, at 4,200 square feet and 59 feet high" (≈390 m², 18 m, our arithmetic) | arch_pg_edmMuttartPyr | Arid Pyramid section | government (City, operator) | 80 |
| Muttart, all pyramids | "3 climate-regulated biomes - arid, temperate and tropical - and a feature biome" | arch_pg_edmMuttartPyr | intro | government (operator) | 85 |
| Muttart pyramid areas | two large "660 square metres each", two smaller "410 square metres each"; "six supporting greenhouses" | arch_pg_williamsMuttart | project page | consultant claim | 55 |
| Conflict | City 4,200 ft² (≈390 m²) vs consultant 410 m² for a small pyramid | arch_pg_edmMuttartPyr; arch_pg_williamsMuttart | — | CONFLICT | — |
| Muttart production greenhouse | "3,870-square-foot facility"; temporary tropical greenhouse "44 x 12 metre" | arch_pg_edmMuttartGH | article | government (City blog) | 65 |
| Bloedel (Vancouver) | "a 0.14 hectare triodetic dome" (≈1,400 m²); "tens of thousands of visitors annually" | arch_pg_vanVDBStrategy2021 | report p. 4 (report dated 7 Oct 2021, for 18 Oct 2021 Board meeting) | government (Park Board) | 80 |
| Bloedel construction | "Geodesic dome construction with plexiglass glazing"; built 1967–1969 | arch_pg_hpBloedel | Canadian Register | government register | 80 |
| Kew Princess of Wales Conservatory (UK benchmark) | "floor space of 4,500 square metres"; "10 different climatic zones"; opened 1987 | arch_pg_kewPOWC | page | operator claim | 60 |
| Typical range (our reading) | single biome ≈390–660 m²; whole conservatory ≈1,400 m² (Bloedel) to ≈2,140 m² (Muttart 4 pyramids, our arithmetic from consultant figures) | above | — | our arithmetic | 50 |
| Minimum sensible size / size steps | ? (no standard; smallest Canadian public biome found ≈390 m²) | — | — | — | — |
| Height | arid pyramid 59 ft (≈18 m) | arch_pg_edmMuttartPyr | — | government | 80 |

### Heat

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Tropical set points (Kew) | wet tropics 20 °C day / 18 °C night; tropical ferns 22/18; orchids 21/18; dry tropics 14/12; temperate ferns 15/13 | arch_pg_ward2013Kew | Table 1, p. 1257 | peer-reviewed (IBPSA conf.) | 80 |
| Arid biome (Muttart) | winter "kept at a cool 12 degrees Celsius"; summer "can soar above 30 degrees Celsius" | arch_pg_edmMuttartPyr | Arid section | government (operator) | 80 |
| Annual gas, Kew POWC | metered 3,109 MWh (Feb 2009–Jan 2010); POWC "32% of the total gas consumption for the site" | arch_pg_ward2013Kew | pp. 1256, 1258 | peer-reviewed | 75 |
| Annual per m² (Kew, London climate) | 3,109 MWh ÷ 4,500 m² ≈ **690 kWh gas/m²·yr**; ≈590 kWh heat/m²·yr at the paper's 85 % boiler efficiency | arch_pg_ward2013Kew + arch_pg_kewPOWC | — | our arithmetic | 50 |
| Installed boilers (Jodrell Lab + POWC only, no emissions constraint) | 2,100 kW pre-retrofit, 1,560 kW post; whole Jodrell cluster (lab, POWC, six nearby buildings) 2,860 / 2,320 kW | arch_pg_ward2013Kew | Table 6, p. 1263 | peer-reviewed | 60 |
| Glazing U | double glass sealed 3.7 W/m²·°C; single 6.2 | arch_asabeEp406 | Table 1 | design guide | 85 |
| Design outdoor temp | Vancouver Jan 2.5 % −7 °C, HDD 2825; **Edmonton Jan 2.5 % −30 °C, 1 % −33 °C, HDD 5120** | arch_bcbcAppC; arch_pg_abClimateEdm | Table C-2 | rule | 95 |
| Peak conduction per m² cover, 20 °C inside, double glass | Vancouver ≈100 W/m²; Edmonton ≈185 W/m² (3.7 × ΔT); add infiltration | above | — | our arithmetic | 50 |
| Cover-to-floor ratio, pyramid | ≈2.1 if square base 4,200 ft², 59 ft high (base shape not confirmed ?) → Edmonton ≈390 W/m² floor | arch_pg_edmMuttartPyr | — | our arithmetic | 30 |
| Heating medium | "Hot water pipes are used for heating" (Kew); supply temperature ? | arch_pg_kewPOWC | page | operator claim | 55 |
| Supply temperature | ? (only growing-greenhouse benches "35 to 40°C", arch_asabeEp406 5.5.2) | — | — | — | — |
| Canadian annual energy (Muttart, Bloedel) | ? (no figure found; Muttart boilers upgraded "to more energy efficient versions", 2020) | arch_pg_edmMuttartRehab | article | government (City blog) | 60 |
| Humidity set points | ? (Kew paper: zones at "different temperature and humidity levels", no values) | — | — | — | — |

### Code

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Group G-3 definition | "plants are grown in a building ... primarily constructed of roofs and walls designed to transmit natural light" | arch_pg_nbcGroupG | Div. A 1.4.1.2 | rule | 95 |
| Group G only on farm land | agricultural occupancy is "located on land that is associated with and devoted to the practice of farming" | arch_pg_nbcGroupG | Div. A 1.4.1.2 | rule | 95 |
| G vs Part 3 | agricultural occupancy with occupant load > 1 person per 40 m² is classed under Table 3.1.2.1 | arch_pg_nbcGroupG | Div. A 1.3.3.6.(2) | rule | 90 |
| BC | "Farm buildings shall conform to the requirements in the National Farm Building Code of Canada 1995" | arch_pg_bcbcFarm | Div. A 1.1.1.1.(4) | rule | 90 |
| AB | Code "does not apply to" low-human-occupancy farm buildings; no Group G found in NBC(AE) text | arch_pg_abFarmExempt | Div. A 1.1.1.1.(4)(a) | rule | 85 |
| Public conservatory class | **A-2** (our reading: nearest examples "Museums", "Exhibition halls", "Art galleries"; conservatories not named) | arch_pg_nbcA3121 | Note A-3.1.2.1.(1), pp. 3-226 to 3-229 | our reading of rule | 60 |
| Separation from F-2 | A-2 vs F-2: **2 h** | arch_nbc3131 | Table 3.1.3.1 | rule | 90 |
| If a farm-type G-3 next to F-2 (not our case) | "–" (none) | arch_pg_nbcGroupG | Table 2.2.1.4 | rule | 85 |
| Crop-drying room (scope) | 2.2.1.9.(4): 45 min, or no rating if sprinklered: a farm-building rule (Div. B Part 2); does not apply to an urban drying room outside Group G | arch_pg_nbcGroupG | Div. B 2.2.1.9.(4) | rule (scope) | 85 |

### Zoning

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver use name | "Zoo or Botanical Garden" under Cultural and Recreational Uses; no definition text | van3575s2; arch_pg_vanZoningUses | Sec. 2, p. 10 | rule | 90 |
| Vancouver I-2, I-3, I-1C, FC-2 | not listed → NP; I-3 2.2.15 admits only uses "not specifically listed and defined" (our reading: botanical garden is listed, so no) | van_zdb_i2/i3/i1c/fc2; arch_pg_vanZoningUses | s. 2.1; I-3 2.2.15 | rule + our reading | 70 |
| Vancouver fallback | "Urban Farm - Class B": growing "for sale", may be "in a greenhouse": C in I-2, I-3, I-1C, FC-2 (production, not a public display) | van3575s2; zoning.md; arch_pg_vanZoningUses | Sec. 2 p. 47; s. 2.1 | rule | 85 |
| Edmonton use name | Major Indoor Entertainment, examples incl. "indoor botanical gardens, museums" | arch_pg_edmUseDefs | 8.10 (online, read 2 Nov 2026; no amendment date shown on the page) | rule | 95 |
| Edmonton BE | permitted (2.12); "The maximum Floor Area is 500 m2 per individual establishment" (3.3.1); variance possible (3.18) | arch_edmZB20001_BE | 2.12, 3.3.1, 3.18 | rule | 90 |
| Edmonton IM / IH | IM: not listed (NP); IH: not listed (IH s. 2 lists Major/Minor Industrial, Natural Resource Development, Major/Minor Utility, signs only) → NP | arch_edmZB20001_IM; arch_pub_edmZB | s. 2 | rule | 80 |
| Edmonton production greenhouse | Urban Agriculture: O in BE (3.16.1) and IM (3.8.1), "within or on a building" | arch_edmZB20001_BE; arch_edmZB20001_IM | 3.16.1; 3.8.1 | rule | 90 |

### Adjacency

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Light | yield +0.7–1 % per 1 % more light (crops) → keep off the data centre's shadow side | arch_marcelis2006 | abstract | peer-reviewed | 70 |
| North wall | "very little light is transmitted through this wall" (Alberta) | arch_abGhBmp | BMP p. 11 | government guide | 75 |
| Distance from generators, chillers, intakes | ? no conservatory-specific rule found; general intake/exhaust rules already in tool | — | — | — | — |

### Social fit
- Bloedel: "tens of thousands of visitors annually" (arch_pg_vanVDBStrategy2021, p. 4). No provision or catchment standard found in Vancouver or Edmonton plans (?).

## B2. Drying (food, lumber, wastewater sludge)

### Food drying

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Heat-pump drying air temp | "typically 30–60 °C" (fruit, vegetables) | arch_pg_zhu2025HP | s. 2.1 | peer-reviewed review | 75 |
| SMER (water removed per kWh electric) | 1.33 kg/kWh (solar-assisted HP, tomatoes/carrots; COP 3.4); 2.8 kg/kWh (simulated fluidized bed) | arch_pg_zhu2025HP | s. 3.3.4; 3.2.1 | peer-reviewed review | 65 |
| Savings vs hot air | ">30 %" vs "traditional hot-air drying" (ultrasound-assisted HP; no data cited) | arch_pg_zhu2025HP | s. 3.3.5 | peer-reviewed review | 50 |
| Savings vs conventional | ≈40 % vs an unspecified "conventional system" (simulated fluidized-bed HP) | arch_pg_zhu2025HP | s. 3.2.1 | peer-reviewed review | 50 |
| Hot-air dryer kWh per kg water | ? (NRCan CanmetENERGY drying report 2009-003 blocked) | — | — | — | — |
| Federal licence | needed for drying food "for export or interprovincial trade"; not needed to process food "sold and consumed within your province" | arch_pg_cfiaSFCR | s. 4.1, 3.2 | government guide (SFCR) | 85 |
| BC premises | plans approved by health officer; premises separate from areas "incompatible with the safe handling of food" | arch_adj_bcFPR | s. 3(1), 4(1)(d) | rule | 85 |
| AB siting | "a minimum set back of 30 metres is recommended from potential sources of contamination" ("should") | arch_adj_abFoodCode | s. 2.1(b) | rule (incorporated) | 80 |
| NBC class | F-2 ("Candy plants", "Factories") or F-3 ("Creameries", "Factories") by fire load (50 kg/m² / 1,200 MJ/m²); F-1 if milling ("Cereal mills", "Flour mills") | arch_pg_nbcA3121; arch_nbcDefF | Note A-3.1.2.1.(1); Div. A defs | rule | 80 |
| Separation from F-2 | F-2 or F-3: "—" (none); F-1: 2 h, and no A/B/C in the building (3.1.3.2.(1)) | arch_nbc3131 | Table 3.1.3.1 | rule | 90 |
| Vancouver zoning | Food or Beverage Products Manufacturing - Class B: O in I-2, I-1C, FC-2; C in I-3. Class A: C in I-2, I-1C, FC-2; I-3 only "existing as of July 20, 1999" | van_zdb_i2/i3/i1c/fc2; arch_pg_vanZoningUses | s. 2.1 | rule | 90 |
| Edmonton zoning | Minor Industrial ("processing raw materials"): O in BE (enclosed, 3.2.1) and IM | arch_pg_edmUseDefs; arch_edmZB20001_BE | 8.10; 3.2.1 | rule | 85 |
| Social fit | no provision standard; city food strategies call for neighbourhood food infrastructure | arch_svc_vanFoodStrategy2013; arch_svc_edmFresh | p. 45; Dir. 4 | government | 50 |

### Lumber drying (kiln)

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Conventional hardwood kiln | "typically operate at temperatures below 180°F" (82 °C); southern pine "240°F" (116 °C) | arch_pg_ukyKiln | text (FOR-128, from URL only) | university extension manual (US; benchmark outside Canada) | 70 |
| Dehumidification kiln | peak 131.7 °F (≈55 °C) in a 600 bf test kiln | arch_pg_fplDH2008 | App. C Table 3 (p. 15 or 16 ?) | government research note (US) | 75 |
| Energy, commercial kilns | "500 to 750 kW-h per thousand board foot" (≈210–320 kWh/m³ nominal, our arithmetic at 2.36 m³/MBF); energy type not split ? | arch_pg_fplDH2008 | Discussion (p. 9 or 10 ?) | government (US) | 60 |
| Energy, small DH kiln | 1,440–2,890 kWh per 10³ bf (Table 1); Discussion gives 3,180/2,120 — internal inconsistency | arch_pg_fplDH2008 | Table 1 (p. 7 or 8 ?); Discussion (p. 9 or 10 ?) | government (US) | 55 |
| Whole sawmill (US softwood) | "355 MJ of electricity and 2730 MJ of processed energy per cubic meter" (not drying alone) | arch_pg_bergman2010 | abstract | peer-reviewed | 60 |
| Canada-wide | potential kiln energy cut "5.5 PJ per year" (attributed to "some researchers") | arch_pg_fpiKiln | summary | research institute (secondary) | 40 |
| Kiln sizes (size steps) | steam "40,000 board foot capacity or more"; hot-water "4000 ... to 60,000"; DH "4000–20,000" total for small mills; vacuum "500 ... to over 10,000" | arch_pg_ukyKiln | text | university extension manual (US; benchmark outside Canada) | 65 |
| Minimum sensible size | ≈600 bf DH kiln (≈1.4 m³ nominal, our arithmetic) as smallest documented | arch_pg_fplDH2008 | intro (p. 2 or 3 ?) | government (US) | 45 |
| Kiln floor area per bf | ? | — | — | — | — |
| NBC class | F-2 ("Planing mills", "Woodworking factories", "Storage rooms") — our reading for a kiln + lumber storage | arch_pg_nbcA3121 | Note A-3.1.2.1.(1) | our reading of rule | 60 |
| Separation from F-2 | "—" | arch_nbc3131 | Table 3.1.3.1 | rule | 85 |
| Vancouver zoning | Wood Products Manufacturing - Class B (no log milling): O in I-2, I-1C, FC-2; C in I-3. Class A (sawmills, planing mills) not listed in any of the four | van3575s2; van_zdb_*; arch_pg_vanZoningUses | Sec. 2 p. 48; s. 2.1 | rule | 85 |
| Edmonton zoning | Minor Industrial: O in BE (enclosed) and IM (our reading) | arch_pg_edmUseDefs | 8.10 | rule + our reading | 70 |
| Canadian kiln temps / energy (FPInnovations, NRCan) | ? (FPInnovations summary only; USDA AH-188 chapters blocked) | — | — | — | — |

### Wastewater sludge drying

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Heat per water evaporated | "1,400–1,700 British thermal units per pound of water evaporated" ≈ **0.90–1.10 kWh/kg** (our arithmetic) | arch_pg_epaHeatDrying | p. 2 | government (US EPA) | 80 |
| Thermal drying energy | "average of 3.8 kWh kg−1 TS" (dewatering 0.12–0.26) | arch_pg_chang2023 | abstract | peer-reviewed | 75 |
| Product / feed | product "at least 90 percent solids"; dewatered feed 15–30 % solids | arch_pg_epaHeatDrying | p. 2 | government (US) | 80 |
| Size threshold | feasible where plants "Produce 10 or more dry tons of solids per day"; small systems "< 20 dry tons/day" | arch_pg_epaHeatDrying | p. 2 | government (US) | 70 |
| Footprint | "relatively small footprint compared with other stabilization processes"; m² ? | arch_pg_epaHeatDrying | p. 2 | government (US) | 60 |
| Waste-heat temp needed | low-temperature waste energy "usually 70 – 150°C" (belt dryer) | arch_pg_huberBelt | abstract | maker claim | 40 |
| US Class A (PFRP) | moisture "10 percent or lower" and particle or wet-bulb temp > "176 °F (80 °C)" | arch_pg_epaHeatDrying | p. 5 | government (US rule summary; 40 CFR 503 criteria, not Canadian) | 80 |
| BC Class A | heat treatment: "the temperature of the biosolids must be 50° Celsius or higher" for 20 minutes or longer, with time equation (≥7 % solids); vector attraction: "equal to or greater than 90 percent" solids is one alternative method, not a required minimum | arch_pg_bcOMRR | Sched. 1 s. 2(c); Sched. 2 s. 1(f) | rule | 85 |
| BC storage setback | "at least 15 metres from any watercourse and 30 metres from any source of water for domestic purposes" (storage before land application; s. 24 covers composting facilities: neither is a rule for a sludge dryer itself) | arch_pg_bcOMRR | s. 18(b) | rule (scope) | 85 |
| Hazards | "explosive hazard from dust"; product and dust "are flammable"; odour "probably the single most detrimental impact" | arch_pg_epaHeatDrying | pp. 3, 6 | government (US) | 80 |
| NBC class | not named; dust explosion risk points to F-1 (our reading ?) → 2 h from F-2 and **no A, B or C in the same building** (3.1.3.2.(1)) | arch_pg_nbcA3121; arch_nbc3131 | — | our reading | 40 |
| Condensate / wash water to sewer | Metro Vancouver: prohibited ≥65 °C non-domestic; ≤40 °C mixed | arch_mvSewerBylaw299 | Sched. A s. 4 | rule | 85 |
| Vancouver zoning | "Waste Disposal Facility" incl. "treatment ... of ... sewage": C in I-2 only, but "limited to the transfer, sorting or recycling of refuse or garbage" (2.2.9) → sludge drying NP in all four districts (our reading) | van3575s2; van_zdb_i2; arch_pg_vanZoningUses | Sec. 2 p. 47; I-2 2.2.9 | rule + our reading | 75 |
| Edmonton zoning | Major Utility ("sewage treatment plants", "sludge disposal beds"): not in BE or IM; **permitted in IH** (2.4 Major Utility) | arch_pg_edmUseDefs; arch_edmZB20001_BE/IM; arch_pub_edmZB | 8.10; s. 2; IH 2.4 | rule | 80 |
| Edmonton knock-on | Child Care not "on a Site Abutting ... a Major Utilities Use" | arch_ezb640 | 6.40 1.2 | rule | 85 |
| Alberta approval | ? (EPEA wastewater approval route not read) | — | — | — | — |

### Data-centre heat to drying precedents

| what | value | source id | kind | conf. |
|---|---|---|---|---|
| RISE / Vinnova DC2BD (Sweden, 2017–18; RISE with SICS North) | wood chips; drying "best in the temperature range 30 - 35°C on the waste heat"; SEK 960,000 | arch_pg_vinnovaDC2BD | government funder page | 60 |
| RISE trials report (2021) | "evaluating data center excess heat as heat source for biomass drying"; figures ? | arch_pg_riseDCbiomass2021 | research institute report | 50 |
| Kajaani, Finland (dates ?) | "drying biomass" named only as a possible use | arch_pg_lukeHukka | government-funded project page (plan) | 35 |
| Food, lumber or sludge drying with DC heat | ? none found in primary sources | — | — | — |

## Gaps (?)
- Conservatory: Canadian annual and peak heat (Muttart, Bloedel); supply temperature; humidity set points; minimum size; Muttart pyramid base shape and cover area.
- Vancouver: whether "Zoo or Botanical Garden" could come in as Public Authority use or CD-1 only.
- Food drying: hot-air kWh/kg water from a Canadian source; floor area per throughput; minimum size.
- Lumber: Canadian kiln temperatures and energy; floor area per MBF; minimum commercial kiln.
- Sludge: Canadian heat-drying energy; Metro Vancouver/EPCOR plans; Alberta approval; NBC class confirmation; floor area per dry tonne.
- No social provision standard for any group B program.

## Paywalled / blocked
- NRCan CanmetENERGY drying report 2009-003 (redirect to natural-resources.canada.ca refused, provenance) — https://www.nrcan.gc.ca/sites/www.nrcan.gc.ca/files/canmetenergy/files/pubs/2009-003.pdf
- USDA FPL Dry Kiln Operator's Manual (AH-188, 1991) chapters 2 and 11 (server error / proxy 403) and full PDF (provenance) — https://www.fpl.fs.usda.gov/documnts/usda/ah188/chapter11.pdf
- Bennamoun et al. 2013 sludge-drying review (abstract only, no figures; full text paywalled) — doi 10.1016/j.rser.2013.07.043
- Edmonton IH zone use list (page returned no Section 2); now read from local bylaw text (Check 3).
- CSA standards: none needed here.

Check 2 applied (2 Nov 2026)

Check 3 applied (2 Nov 2026)
