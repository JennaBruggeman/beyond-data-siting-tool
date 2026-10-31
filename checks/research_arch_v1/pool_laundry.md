# Pool and laundry: research (Architecture mode v1, 30 Oct 2026)

Source ids → `pool_laundry_sources.json`. "Our arithmetic" = derived here, not in source. "?" = not found / unverified.

## A) Public indoor pool (lap / leisure / therapy) heated via heat pump

### Size and size steps

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Competition pool length | "25.000 / 50.000 metres"; tolerance +0.010/−0.000 m | arch_fina_FR2020 | FR 2.1, 2.2 | rule (sport body) | 90 |
| Competition lane width | "at least 2.5 metres wide, with two spaces of at least 0.2 metre outside of the first and last lanes" | arch_fina_FR2020 | FR 2.5 | rule (sport body) | 90 |
| Competition depth with blocks | "minimum depth of 1.35 metres, extending from 1.0 metre to at least 6.0 metres from the end wall"; 1.0 m elsewhere | arch_fina_FR2020 | FR 2.3 | rule (sport body) | 85 |
| Community pool lane width | "The minimum lane width is 2.0 m for 25 m pools" | arch_sportEngPoolsApp1 | p. 1 | design guide (UK benchmark) | 80 |
| Size steps (UK) | learner 10–20 × 7 m (2 lanes); community 25 × 8.5 / 10.5 / 12.5 m (4 / 5 / 6 lanes); competition 25 × 13 m (6); short-course champ. 25 × 17 m (8); 50 × 21 m (8) / 50 × 25 m | arch_sportEngPoolsApp1 | p. 3 table (text garbled in extract; check PDF) | design guide (UK benchmark) | 65 |
| Smallest UK community pool | 25 × 8.5 m, 4-lane, water area 212.5 m² | arch_sportEngPoolsDGN | p. 10 | design guide (UK benchmark) | 80 |
| Community pool depths (UK) | shallow ≥0.9 m (1.0 m with learner pool); deep 1.8 or 2.0 m | arch_sportEngPoolsDGN | pp. 8, 26 | design guide (UK benchmark) | 75 |
| Edmonton example (Eastglen) | "standard 25-metre length x 13-metre width lap pool, depth varies from 0.9-metre to 3.5-metres"; tank 326 m²; 6 lanes; hot pool 40 m² ("25-person") | arch_edmEastglen2017 | pp. 3, 4, 14, 30, 32 | government (City functional program) | 85 |
| Vancouver: VAC replacement | "opts for a 25-metre pool, falling short of a 50-metre facility" | arch_vanParkMotion50m2025 | WHEREAS 3 | government (Board motion; states decision, not a standard) | 70 |
| Vancouver scale tiers | "Neighbourhood – 2 km radius", "Community – 3 km", "City-Wide / Destination – 4 km"; later renamed Small/Medium/Large; no tank sizes given | arch_vanSplash2017, arch_vanSplash2019 | slide 30 (2017); slide 24 (2019) | government | 80 |
| Vancouver swim target | "Increase 2001 swim target of 4 to 5 swims/year/capita, building for up to 6" | arch_vanSplash2017 | slide 29 | government | 80 |
| Edmonton tiers | neighbourhood "under 20,000"; district "40,000 to 80,000" (e.g. "Indoor leisure pool"); citywide "over 600,000" (e.g. "50m competitive pool") | arch_edmRecFMP2004 | Fig. 1.2 | government (2004, superseded?) | 60 |
| Edmonton siting policy | new aquatic facilities to "be part of larger multi-purpose district-serving recreation complexes" | arch_edmRecFMP2004 | Rec. 8, p. 17 | government | 60 |
| Regulated minimum (BC) | public pool = body of water "at least 61 cm" deep; wading pool "<61 cm" | arch_bcPoolReg296 | s. 1 | rule | 90 |
| Regulated minimum (AB) | swimming pool "deeper than 60 centimetres at its deepest point"; no minimum area | arch_abPoolStd2014 | Part 2(m) | rule | 85 |
| Diving depth (BC) | "a water depth greater than 2 m (6.5 ft) for safe deck-level diving" | arch_bcPoolDesign2025 | s. 3.5 | government guide | 85 |
| Deck width (BC) | "minimum walkway width of 1.2 m (4 ft) beyond the edge of the pool and gutter" | arch_bcPoolDesign2025 | s. 3.2 | government guide | 85 |
| Construction permit (BC) | permit required; plans "sealed and certified by an engineer or architect" | arch_bcPoolReg296 | s. 5 | rule | 90 |
| **Minimum sensible public pool (proposal)** | 25 × 8.5 m, 4 lanes × 2.0 m ≈ 212.5 m² water (UK smallest community 25 m); Canadian min. ? | arch_sportEngPoolsDGN | p. 10 | design guide (benchmark) | 55 |

### Building area per m² water

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Pool mechanical room | "Pool mechanical should be in the order of 1/3 to ½ of the water surface area" | arch_edmEastglen2017 | p. 23 (also p. 22) | government (functional program) | 80 |
| Grossing factor | "1:1.3 to 1:1.5 is within the range common for recreation facilities"; Eastglen proposed 1:1.45 | arch_edmEastglen2017 | pp. 4, 23 | government | 80 |
| Eastglen gross / water | 2,131 m² gross ÷ (326 + 40 m² water) ≈ 5.8 m² gross per m² water (includes 180 m² fitness etc.) | arch_edmEastglen2017 | p. 23 + room data | our arithmetic | 60 |
| Pool deck (Eastglen) | 366 m² deck for 326 m² tank (≈1.1 : 1, our arithmetic) | arch_edmEastglen2017 | p. 31 | our arithmetic | 65 |
| Change rooms (UK) | changing/sanitary ≈ water area served | arch_sportEngPoolsDGN | p. 38 | design guide (benchmark) | 65 |
| Pool hall height (UK, 4-lane) | flat ceiling min clear 3.5 m; profiled 4.5–6.0 m high point | arch_sportEngPoolsDGN | p. 23 | design guide (benchmark) | 75 |
| Planning ratio from a Canadian planning manual | ? | — | — | — | — |

### Water temperature

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Competition | "Water temperature shall be 25° to 28°" | arch_fina_FR2020 | FR 2.12.1 | rule (sport body) | 90 |
| By use (UK) | 27 °C competition/training; 28 °C recreational/main; 29 °C teaching children/leisure; 30 °C babies/young children/disabled; main pools "tend to be set around 29–30°C" | arch_carbonTrustCTG009 | pp. 14–15 | government-funded guide (UK) | 75 |
| Pool hall air | "similar to the water temperature – ideally 1oC above"; air ≥30 °C "generally be avoided" | arch_carbonTrustCTG009 | p. 15 | government-funded guide (UK) | 75 |
| BC legal maximum | "pool water, except in a hot tub, ... no more than 37°C"; hot tub "no more than 40°C" | arch_bcPoolReg296 | ss. 10(2)(b), 16(b) | rule | 95 |
| AB legal maximum | pool water "must not be greater than 40 Celsius"; whirlpool defined as >30 °C | arch_abPoolStd2014 | s. 2.2.1, Part 2(p) | rule | 85 |
| BC humidity | RH "between 50% and 60%" in pool area | arch_bcPoolDesign2025 | s. 6.3 | government guide | 85 |
| UBC indoor pool (Vancouver) | 28 °C water, 22–24 °C air | arch_ubcSeedsPool2010 | p. 13 | student report (low) | 40 |
| Therapy 32–35 °C | ? (no primary source found; BC/AB caps at 37/40 °C only) | — | — | — | — |

### Heat demand

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Annual energy, Mediterranean / continental climate | "on average 4300 kWh/(m2∙year)" / "5200 kWh/(m2∙year)" (Trianti-Stourna et al. 1998, cited); unit basis (water vs pool area) not stated; total energy, not heat only | arch_ciuman2021 | Introduction | peer-reviewed (secondary citation) | 50 |
| Medium pool (Yuan et al. 2021, cited) | ~500 m² usable surface: "around 124 MWh of electricity and 208 MWh of heat per year" → ≈416 kWh heat per m² usable/yr (our arithmetic) | arch_benakcha2025 | literature review | preprint citing peer-reviewed | 45 |
| Loss split | "Evaporative losses dominate heat demand, accounting for two-thirds of water heat loss, followed by water renewal" (27 °C water, 26 °C air, Toulouse) | arch_benakcha2025 | abstract/results | preprint (arXiv) | 55 |
| Heating + ventilation share | "in total approx. 50%" of pool energy | arch_ciuman2021 | Introduction | peer-reviewed | 60 |
| Pool covers | cut total pool energy "10–30%" | arch_carbonTrustCTG009 | p. 16 | government-funded guide | 70 |
| UBC Aquatic Centre (Vancouver) | both pools (indoor 50 × 25 m at 28 °C + outdoor 50 × 20 m at 27 °C) "approximately 14,000 GJ/yr"; ≈1,730 kWh/m² water/yr combined (our arithmetic; mixes outdoor pool) | arch_ubcSeedsPool2010 | pp. 9, 23 | student report (low) | 35 |
| Installed heat exchanger, UBC lap pool | 4,482,500 BTU/h ≈ 1,314 kW (≈1,050 W/m² water, our arithmetic); rating, not measured peak | arch_ubcSeedsPool2010 | p. 44 | student report (low) | 30 |
| Exmouth (Deep Green) | pool uses "~222,000 kWh of gas" /yr; Deep Green "~139,284kWh a year ... 62% of the heating needs" — stated by requester in FOI, unanswered; pool size ? | arch_rbwmFOIdeepGreen2023 | request text | operator claim (unverified) | 30 |
| Canadian (NRCan) per-m² heat figure | ENERGY STAR pool reference gives size classes only (Recreational 2,700 ft²; Short Course 4,500 ft²; Olympic 13,456 ft²) — no kWh/m² | arch_energyStarPool2018 | pp. 5–6 | government | 70 |
| Peak W/m² water | ? | — | — | — | — |
| Supply temperature for pool heat exchanger | ? (water 25–37 °C implies low-temp heat is enough; source needed) | — | — | — | — |

### Data-centre heat to pool precedents

| what | value | source id | kind | conf. |
|---|---|---|---|---|
| Exmouth Leisure Centre, UK (Deep Green) | see above | arch_rbwmFOIdeepGreen2023 | operator claim | 30 |
| Mäntsälä, Finland | 4.0 MW heat pump; server air ~40 °C lifted to "approximately 85 degrees Celsius" for district heat; no pool named | arch_ecMantsala2023 | government (EC case catalogue) | 65 |
| Stockholm / Helsinki pool cases | ? (not found in primary sources) | — | — | — |

## B) Commercial / community laundry

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Water use, professional | "only from 5 to 6 L of water are necessary for each kg of linen" (home >20 L/kg) | arch_bobak2010 | Introduction | peer-reviewed | 75 |
| Wash-water heat | ΔT 75 °C: 1,890 / 2,520 / 3,150 kJ/kg at 6 / 8 / 10 L/kg (≈0.53–0.88 kWh/kg, our arithmetic); dryers and ironers are main heat users | arch_bobak2010 | Table 1 | peer-reviewed | 70 |
| Plant scale | premises with "capacity up to 5000 t of linen p. a."; flat linen often >70% | arch_bobak2010 | text | peer-reviewed | 65 |
| Energy benchmark, small on-site | "≤ 2,0 kWh per kg of textiles"; water "≤ 7 L per kg" | arch_euEMAStourism2016 | s. 3.4.4, b36–b37 | rule-type benchmark (EU) | 85 |
| Energy benchmark, large/outsourced | process energy "≤ 0,90 kWh per kg" (accommodation), "≤ 1,45" (restaurant); water "≤ 5 L per kg" | arch_euEMAStourism2016 | s. 3.4.5, b40–b41 | rule-type benchmark (EU) | 85 |
| Heat recovery | BEMP "to recover heat from waste water and exhaust ventilation air" | arch_euEMAStourism2016 | s. 3.4.4 | benchmark (EU) | 85 |
| Healthcare hot wash | "above 160 degrees F (71 degrees C) for 25 minutes"; alt. "low temperature washing at 71 to 77 degrees F (22-25 degrees C) plus a 125-ppm chlorine bleach rinse" (from CDC 2003) | arch_cmsLaundry2013 | S&C 13-09-NH, s. B | government (US benchmark) | 80 |
| Thermal disinfection | 65 °C ≥10 min; 71 °C 3 min; 93 °C 1 min | arch_electroluxThermal | page | maker claim | 40 |
| Drying air (dry-cleaning) | 115–130 °C | arch_fiaschi2019 | Table 1 | peer-reviewed | 60 |
| Heat pumps in laundry | SINTEF CLEANTEX: replace steam boilers with "high temperature heat pumps"; 17 laundries, "approximately 90 GWh" /yr | arch_sintefCleantex | project page | research institute | 60 |
| Laundromat throughput / floor area / min. size | ? | — | — | — | — |
| Institutional laundry floor area | ? | — | — | — | — |
| Data-centre heat to laundry precedent | ? (none found) | — | — | — | — |

### Sewer discharge (hot wastewater)

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Metro Vancouver, non-domestic | prohibited: "temperature of 65 degrees Centigrade (150 degrees Fahrenheit) or more" | arch_mvSewerBylaw299 | Sched. A s. 4(c) | rule | 95 |
| Metro Vancouver, mixed flow | prohibited: waste that "will raise the temperature of Waste entering any Sewage Facility to 40 degrees Centigrade" | arch_mvSewerBylaw299 | Sched. A s. 4(b) | rule | 95 |
| Commercial laundry status | domestic waste covers only "non-commercial cleaning or laundry" → commercial laundry = Non-Domestic Waste | arch_mvSewerBylaw299 | s. 2.1 | rule | 85 |
| pH | restricted if pH <5.5 or >10.5 (permit needed) | arch_mvSewerBylaw299 | Sched. B s. 2 | rule | 90 |
| Edmonton | ? — Drainage Services Bylaw C18093 PDF blocked (robots_disallowed); bylaw no. 19627 not confirmed | — | — | — | — |

## Gaps (?)
- Pool peak W/m² water and heat-exchanger supply temperature (no public primary source; ASHRAE paywalled).
- Peer-reviewed heat kWh/m² **water surface** (found only secondary citations, unclear basis); no NRCan per-m² figure.
- Therapy pool 32–35 °C and leisure 29–31 °C: no Canadian primary source (UK guide gives 29–30 °C).
- Canadian lane/tank standards (Swimming Canada facility doc not found); Vancouver/Edmonton typical tank sizes beyond Eastglen.
- Natatorium ratio from a planning manual (only Eastglen derived).
- Laundromat and institutional laundry: throughput, floor area, minimum size.
- Any data-centre heat to laundry precedent; Stockholm/Helsinki pool cases.
- Edmonton drainage bylaw temperature limit (site blocked).
