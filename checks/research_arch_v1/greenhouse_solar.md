# Greenhouse (incl. indoor/vertical farm) and roof/facade solar: spatial and heat inputs

Research 30 Oct 2026. Primary sources only; claims labelled. "?" = not confirmed. "our arithmetic" = derived here, not in the source.

## A1. Greenhouse heat demand

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Glazing U-value, double polyethylene | 4.0 W/m²·°C (of cover area) | arch_asabeEp406 | Table 1 | design guide (standard) | 85 |
| U-value, double poly IR-inhibited | 2.8 W/m²·°C | arch_asabeEp406 | Table 1 | design guide | 85 |
| U-value, single glass sealed | 6.2 W/m²·°C | arch_asabeEp406 | Table 1 | design guide | 85 |
| U-value, double glass sealed | 3.7 W/m²·°C | arch_asabeEp406 | Table 1 | design guide | 85 |
| U-value, double poly + thermal blanket | 2.5 W/m²·°C | arch_asabeEp406 | Table 1 | design guide | 85 |
| Heat loss method | q = U·A_cover·(t_i − t_o) + infiltration | arch_asabeEp406 | 4.1–4.4 | design guide | 85 |
| Night design inside temp | "16 °C (60 °F) generally meets the needs of most plants" | arch_asabeEp406 | 4.7 | design guide | 85 |
| Vancouver design outdoor temp | Jan 2.5% −7 °C; 1% −9 °C; HDD 2825 (City Hall) | arch_bcbcAppC | BCBC 2018 Div B App C, Table C-2 | rule | 95 |
| Edmonton design outdoor temp | ? (take from NBC(AE) Table C-2 already in tool; not re-verified here) | — | — | — | — |
| Peak conduction loss, Vancouver, double poly | ≈ 92 W per m² of cover = 4.0 × (16 − (−7)); add infiltration | our arithmetic from arch_asabeEp406 + arch_bcbcAppC | — | our arithmetic | 60 |
| Peak conduction loss, Edmonton | 4.0 × (16 − T_design) W/m² cover; e.g. ≈184 if T = −30 °C (T unverified) | our arithmetic | — | our arithmetic | 40 |
| Cover-to-floor area ratio (converts per-cover to per-floor) | ? | — | — | — | — |
| Measured/simulated peak, small Quebec greenhouse | 153 m² gothic arch, double poly, "estimated maximum heating capacity is 96 kW" → ≈ 627 W/m² floor (our arithmetic); Baie-Comeau 49.2° N | arch_etsBaieComeau | news page summarising ÉTS study | university summary of research (not peer-reviewed text) | 55 |
| Annual heat, Prairie double-poly greenhouse | "Typical energy required by a double poly greenhouse = 2100 MJ/m2 (2.1 GJ/m2)", Sept–May season ≈ 583 kWh/m² (our arithmetic) | arch_mbGhEnergy | Greenhouse Energy Calculations page | government guide (archived) | 70 |
| Annual heat, northern Saskatchewan 0.6 ha, year-round | tomato 1486, cucumber 1657, pepper 1754 MJ/m² ≈ 413–487 kWh/m² (our arithmetic) | arch_ahamed2019 | abstract | peer-reviewed | 80 |
| Alberta heating cost | "Average heating cost was estimated at $12.54 per sq. m." (2014) | arch_abGhProfile2014 | p. 24, Table 4.3 | government survey | 85 |
| Heating share of greenhouse energy cost (AB) | "80-90% of a greenhouse's energy expenditures" | arch_abGhBmp | Self-Assessment p. 3 | government guide | 80 |
| Annual heat, Vancouver / Lower Mainland | ? (no BC primary source with GJ/m² found) | — | — | — | — |
| NL benchmark (climate close to Vancouver) | 3.9 billion m³ gas (2021) over 10.6 thousand ha census area ≈ 37 m³/m² (our arithmetic); includes gas burned in CHP for electricity, so overstates heat | arch_cbsGas2023 | summary | government statistics | 50 |

## A2. Supply temperatures

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Bench / floor heating water | "35 to 40°C" | arch_asabeEp406 | 5.5.2, 5.6.3 | design guide | 85 |
| Greenhouse need (NL area study) | ≈ 55 °C; data-centre waste heat ≈ 25 °C; heat pump needed | arch_berenschotHK | slides 12, 16 | consultant report for municipality | 70 |
| Quebec study, heat pump output | water raised "to 60 ℃"; greenhouse 20 °C day / 18 °C night | arch_etsBaieComeau | news page | university summary | 55 |
| Conventional pipe-rail supply temp (70–90 °C) | ? | — | — | — | — |

## A3. Sizes

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Alberta operations by size | <10,000 ft² 30%; 10,000–19,999 21%; 20,000–40,000 17%; >40,000 ft² 32% | arch_abGhProfile2014 | p. 8, Table 1.5 | government survey | 85 |
| Alberta mean size | ≈ 64,000 ft² (≈ 5,900 m²) = 14,743,207 ft² / 230 ops (our arithmetic; skewed by Medicine Hat) | arch_abGhProfile2014 | p. 4 | our arithmetic | 70 |
| Year-round commercial study size (SK) | 0.6 ha | arch_ahamed2019 | abstract | peer-reviewed | 80 |
| Small research/community scale precedent | 153 m² | arch_etsBaieComeau | news page | university summary | 55 |
| Minimum sensible commercial size | ? (none stated by a primary source) | — | — | — | — |
| Community / urban greenhouse typical size | ? | — | — | — | — |

## A4. Sun, orientation, shading

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Yield vs light | fruit vegetables "0.7-1%" and lettuce/radish "0.8-1%" yield per 1% more light | arch_marcelis2006 | abstract | peer-reviewed | 85 |
| Single-span orientation | "best to orient single-span greenhouses so the length runs east–west" | arch_uwexGhEnergy | Orientation section | government (extension) guide, US | 70 |
| Gutter-connected orientation | UW-Ext: run north–south (gutter shadow moves); Ahamed thesis: "east-west oriented gable roof ... could be more energy-efficient" for multi-span | arch_uwexGhEnergy; arch_ahamedThesis | -; abstract p. ii | guide vs thesis: CONFLICT | 50 |
| North wall in Alberta | "very little light is transmitted through this wall" → insulate it | arch_abGhBmp | BMP Guide p. 11 | government guide | 80 |
| Shading tolerance threshold from adjacent building | ? (only the proportional loss above) | — | — | — | — |

## A5. CO2

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Enrichment target | "normal target for CO2 enrichment is 1000 µmol/mol (1000 ppm)"; up to 2000 ppm extended | arch_asabeEp406 | 5.8.1 | design guide | 85 |
| CO2 lost when gas CHP/boiler replaced by data-centre heat | "an alternative CO2 source must be found" | arch_berenschotHK | slide 19 | consultant report | 70 |
| Data centre as CO2 source | None found. A data centre has no flue-gas CO2 stream in normal operation (only standby generators on test). No source claims a link: treat as no link. | — | — | our reading | 70 |
| Alberta CO2 recovery uptake | 11% of growers (15 of 135) | arch_abGhProfile2014 | p. 25, Table 4.4 | government survey | 85 |

## A6. Data-centre heat precedents

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Agriport A7 / Hollands Kroon (NL) | ~315 MW data centres; waste heat ≈25 °C; greenhouse heat demand 5.0 PJ/yr; pilot "has not happened yet" (2020) | arch_berenschotHK | slides 6, 8, 11, 19 | consultant report for municipality | 70 |
| Green Mountain / Norwegian Lobster Farm (Rennesøy) | seawater 8 °C in → 20 °C; no heat quantity given | arch_greenMountainLobster | press release 22 Jun 2021 | operator claim | 40 |
| Baie-Comeau QC study | 1 MW server room → 153 m² greenhouse via heat pump; "66% reduction in energy use" vs propane | arch_etsBaieComeau | news page | university summary | 55 |
| QScale Lévis greenhouse link | ? only news/operator pages found; not used | — | — | — | — |

## A7. Indoor / vertical farm

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vertical farm lighting power | LED 17.4 W/ft² grow area (≈187 W/m², our arithmetic); fluorescent 22.8 W/ft² | arch_doeSslHort2017 | p. ii, 15–16 | government report | 75 |
| Vertical farm lighting hours | 17.2 h/day, 365 days (6,278 h) | arch_doeSslHort2017 | p. 17 | government report | 75 |
| Vertical farm lighting energy | ≈ 1,175 kWh/m² grow area/yr (LED) (our arithmetic: 187 × 6,278) | arch_doeSslHort2017 | — | our arithmetic | 65 |
| Lighting share, cold climate | LEDs >90% of energy in Helsinki; ~80% Dubai | arch_arcasi2023 | Sec. 3.2 | peer-reviewed (conf. paper) | 70 |
| Plant factory vs greenhouse | lettuce: 247 kWhe per kg dry weight in plant factory | arch_graamans2018 | abstract | peer-reviewed | 85 |
| Does heat help? | Little: LED heat "leads to a decrease in the heat required"; PFs "more energy-intensive than greenhouses in all climates" | arch_arcasi2023; arch_weidner | Sec. 3.2; conclusions | peer-reviewed | 70 |
| Vertical farm heat demand kWh/m² | ? (not quantified in sources) | — | — | — | — |

## B. Roof and facade solar: spatial rules

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver simple-permit criterion | "Panels are placed a minimum of 2ft. from the perimeter of a roof or a roof peak"; gap to roof ≤150 mm | arch_vanPvCriteria | Sec. 2 crit. 9, crit. 6 | municipal permit criteria (residential) | 85 |
| Vancouver: flat roof or wall-mounted | full building permit required ("not on a rooftop (wall mounted...)"; roof "is flat") | arch_vanPvCriteria | Sec. 1 | municipal rule | 85 |
| Vancouver electrical | rapid shutdown CE Code Rule 64-218; initiator "within sight and 9 m of the array or at the permanent access to the roof" | arch_vanPvBulletin2021 | Sec. 2, Supp. Note 2 | municipal bulletin (electrical rule) | 85 |
| BCBC / VBBL firefighter pathway clause for PV | none found; 2022 Council motion asks Province to add "design and placement standards ... for solar (photovoltaic) panels" to the code | arch_vanCouncil2022 | motion text | council motion (evidence of absence) | 60 |
| Alberta government projects: roof perimeter | "Minimum 3000mm (10') clearance around perimeter of roof" (ARCA warranty) | arch_abInfraPv2017 | p. 20 | government design guide | 80 |
| Alberta government projects: between rows | "Minimum 1200mm (4') clearance between rows of PV arrays" | arch_abInfraPv2017 | p. 20 | government design guide | 80 |
| Alberta Fire Code / STANDATA PV setback | ? none found (only electrical STANDATA on CEC Sec. 64) | — | — | — | — |
| US benchmark (IFC as amended, MN 2020) | 6 ft perimeter; 4 ft if either axis ≤250 ft; interior paths ≤150 ft apart; 8 ft smoke-vent path or alternatives | arch_mnIfc1204 | 1204.3.1–1204.3.3 | rule (US benchmark) | 80 |
| Facade PV combustibility | No PV-specific clause found. Facade PV is cladding, so NBC/BCBC 3.1.5.5 (combustible components in exterior walls of noncombustible buildings, CAN/ULC-S134 test; limits to ≤3 storeys or sprinklered) would apply (our reading) | arch_nbc2005_31552 | Sentence 3.1.5.5.(2) (2005 archive) | rule (archived edition) | 50 |
| Row-spacing rule of thumb | ? no NRCan/provincial source found. Geometry only (our arithmetic): noon winter-solstice sun altitude Vancouver ≈17.3°, Edmonton ≈13.0° → clear spacing ≈3.2× and ≈4.3× the height of the row in front | — | — | our arithmetic | 40 |

## Gaps
- Vancouver/Lower Mainland greenhouse annual GJ/m²: ?
- Edmonton-specific greenhouse peak and annual: ? (Prairie values from MB/SK only)
- Cover-to-floor ratio for per-floor peak: ?
- Minimum/community greenhouse size: ?
- QScale greenhouse figures: only operator/news.
- Current BCBC 2024 3.1.5.5 text not fetched (2005 archive used).
- Alberta PV fire-access rule: none found.
- Trépanier et al. 2024 (8 Canadian cities, per-city energy) full text blocked: http://www.sciencedirect.com/science/article/pii/S266618882400203X
