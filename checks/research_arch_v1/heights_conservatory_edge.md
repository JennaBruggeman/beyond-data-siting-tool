# Storey heights, conservatory, public edge — research (4 Nov 2026)

Rules as BRIEF.md / BRIEF_v2.md. "?" = not found. "our arithmetic" / "our reading" marked. New ids in heights_conservatory_edge_sources.json (arch_hce_*). Existing ids reused: arch_hb_* (heights_basement), arch_sup_edmEastglenRooms, arch_wet_atacp2019, arch_sportEngPoolsDGN, arch_up2_bcPoolGuide, arch_pub_en12572cat, arch_up2_en12572_3, arch_hsg_vanHDTG2025, arch_pub_vanStall, arch_hb_abGreenhouse, arch_pg_*, arch_pub_vanPlazaDG, arch_pub_edmWinter2016, ashrae2015ch51, arch_sup_bchFastCharge2024, epcor_ccg.

Short answer: **no Canadian source gives a floor-to-floor height per program.** Only room clear heights (clinic, fitness, multipurpose) and the zoning floor-to-floor minimums. No filed Canadian permit section with floor-to-floor was found in this pass.

---

## 1. Floor-to-floor and clear heights

### Rules for every program

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver I-3 storeys | first floor ≥6.0 m; above ≥4.0 m (floor-to-floor) | arch_hce_vanI3Height | 3.1.2.9 | rule | 95 |
| Edmonton BE | no floor-to-floor rule; max Height 16.0 m | arch_hb_edmBE | 2.120 Table 4.1 | rule | 90 |
| NBC Part 3 | no general room height; exits ≥2 050 mm | arch_hb_nbcHeadroom | 3.4.3.4.(1) | rule | 75 |
| Storage garage | clear height ≥2 m | arch_hce_nbcGarageLoading | 3.3.5.4.(5), p. 3-136 | rule (NBC, BCBC, NBC(AE), VBBL same) | 95 |
| Passenger-loading zone, if provided | clear height ≥2 750 mm | arch_hce_nbcGarageLoading | 3.8.3.4.(1)(c), p. 3-178 | rule | 95 |

Our reading: in Vancouver I-3 the zoning minimums (6.0 / 4.0 m) exceed every room figure below except pool, climbing and conservatory. In Edmonton BE the room clear heights plus structure and services set the storey (services depth ?).

### Per program (tool/arch_programs.json ids)

| program | what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|---|
| refuge | room height | ? (AHS, VCH cooling guide give none) | arch_hce_vchCooling | whole doc | — | 0 |
| warming_shelter | room height | ? (Toronto shelter guidelines: text read stops before s. 5.3.1 Sleeping Areas) | — | — | — | 0 |
| clinic | exam, consult, treatment rooms | floor to ceiling ≥2.4 m | arch_hce_abGFNAHeights | room data sheets A-1, A-5, A-11 | government guide (AB) | 80 |
| clinic | procedure, isolation, dental | ≥2.7 m; procedure type 2 ≈3 m; endoscopy ≥3 m | arch_hce_abGFNAHeights | A-3, A-4, A-6, A-10, A-14 | government guide (AB) | 80 |
| clinic | floor-to-floor | ? | — | — | — | 0 |
| gym (fitness) | fitness centre | "Over-height (min. 3.3 metres)" | arch_sup_edmEastglenRooms | 2.9, p. 44 | government (functional program) | 80 |
| gym (fitness) | fitness room; free weights | 3.5 m; free weights ≥4 m | arch_hce_sportscotFitness | Design Note 05 | design guide (UK benchmark) | 55 |
| gym (climbing) | bouldering wall | ≤4.5 m (EN catalogue); "typically up to 4.5 metres" | arch_pub_en12572cat; arch_hce_cimspaClimb | overview; guidance note | standard summary / industry (EU, UK benchmarks) | 55 |
| gym (climbing) | lead wall | "ideally greater than 10 metres high" | arch_hce_cimspaClimb | guidance note | industry guidance (UK benchmark) | 50 |
| gym (climbing) | first protection point | ≤3.10 m | arch_hce_en12572_1sample | EN 12572-1 cl. 4.1 (free preview) | standard (EU benchmark) | 70 |
| gym (climbing) | room height above wall; falling space | ? (EN 12572-1 cl. 4.7, 4.8 not in preview; paywalled) | arch_hce_en12572_1sample | — | — | 0 |
| gym (climbing) | holds only | no heights | arch_up2_en12572_3 | upload | standard | 90 |
| spa | hall height | ? (sauna survey "maximum height of 3.6 m" is a survey finding, not a rule) | arch_wet_vanRTS16473 | App. D p. 2 | government report | 30 |
| therapy_pool | hall | ceiling ~4.5 m above concourse | arch_wet_atacp2019 | s. 3.1 p. 21 | design guide (UK benchmark) | 65 |
| pool | hall | flat ceiling ≥3.5 m clear; profiled 4.5–6.0 m high point (4-lane) | arch_sportEngPoolsDGN | p. 23 | design guide (UK benchmark) | 75 |
| pool | BC guide | no hall height; diving depth >2 m, clearances per FINA; dry slides ≤4 m exempt from EDSR | arch_hce_bcPoolSlides | s. 3.5 p. 17; s. 10.1 p. 48 | government guide | 90 |
| community_kitchen | room height | ? | — | — | — | 0 |
| laundry | room height | ? | — | — | — | 0 |
| food_drying | room height | ? | — | — | — | 0 |
| fish_farm | building | "Minimize sidewall heights"; no figure (10 ft example is a worked volume case) | arch_hce_ncracBuildings | pp. 3, 6 | extension (US benchmark) | 45 |
| greenhouse | gutter | 4–4.25 m typical; new 4.9–5.5 m | arch_hb_abGreenhouse | — | government guide (AB) | 80 |
| winter_garden | height | ? | — | — | — | 0 |
| ev_hub (covered) | clear height | ≥2 m (storage garage); van-accessible stall 2.3 m clear (Van) | arch_hce_nbcGarageLoading; arch_pub_vanStall | 3.3.5.4.(5); s. 2.2 | rule; government guide | 85 |
| ev_hub (covered) | roof | "single charger roof or other weather protection"; crane clearance from roof (no figure) | arch_hce_bchFastChargeRoof | p. 20 | utility guide | 75 |
| public_ground (library / community room) | multipurpose room | "Clear span, 3.3-3.6m clear height" | arch_sup_edmEastglenRooms | 2.7, p. 42 | government (functional program) | 80 |
| public_ground | housing amenity room (Van) | clear ≥2 438 mm; floor-to-floor 2 946 mm recommended | arch_hsg_vanHDTG2025 | s. 4.2(g) | government guide (City housing only) | 60 |
| public_ground | library stacks | ? | — | — | — | 0 |

One figure per program (our reading, lowest sourced clear height; floor-to-floor = zoning minimum where it governs):

| program | clear height | Van I-3 floor-to-floor | basis |
|---|---|---|---|
| clinic | 2.4 m (2.7–3 m procedure) | 6.0 m ground / 4.0 m above | AB GNFA + I-3 |
| gym fitness | 3.3–3.5 m | 6.0 / 4.0 | Eastglen, sportscotland |
| gym climbing | 4.5 m boulder; >10 m lead | lead wall needs ≥2 storeys | EN, CIMSPA |
| therapy_pool | ~4.5 m | 6.0 ground | ATACP |
| pool | 3.5 m flat / 4.5–6.0 m profiled | 6.0 ground | Sport England |
| greenhouse | 4–5.5 m gutter | 6.0 ground | AB gov |
| ev_hub | 2.0–2.3 m | 6.0 ground | NBC, Van |
| public_ground | 3.3–3.6 m | 6.0 ground | Eastglen, I-3 |
| refuge, warming_shelter, spa, kitchen, laundry, food_drying, fish_farm, winter_garden | ? | 6.0 / 4.0 (zoning only) | — |

---

## 2. Conservatory

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Muttart arid pyramid | 4,200 ft² (≈390 m²), 59 ft (≈18.0 m) | arch_pg_edmMuttartPyr | Arid section | government (operator) | 80 |
| Muttart other pyramids | areas: 2 × 660 m², 2 × 410 m²; heights ? (City page gives none for tropical, temperate, feature) | arch_pg_williamsMuttart | project page | consultant claim | 55 |
| Muttart arid winter set point | 12 °C; summer >30 °C | arch_pg_edmMuttartPyr | — | government (operator) | 80 |
| Bloedel (Vancouver) | 70 ft high (≈21.3 m), 140 ft dia., 16,386 ft² (≈1,522 m²) | arch_hce_vdbBloedel | page | operator claim | 50 |
| Bloedel area, Park Board | "0.14 hectare" (≈1,400 m²) | arch_pg_vanVDBStrategy2021 | p. 4 | government | 80 |
| Bloedel diameter | "140-foot diameter dome"; opened 6 Dec 1969 | arch_hce_vhfBloedel | Architecture | heritage body | 60 |
| The Leaf (Winnipeg) tropical biome | 2,000 m²; waterfall "approximately six stories"; height in m ? | arch_hce_apcLeaf | story page | operator claim | 50 |
| Centennial Park (Toronto) | tropical house + 2 wing houses (1969); no area or height | arch_hce_torCentennial | page | government | 70 |
| Allan Gardens (Toronto) | 7–8 houses, 16-sided Palm House dome (1910); no dimensions | arch_hce_torAllanGardens | 2012 designation; 2021 presentation | government | 70 |
| Kew POWC (UK benchmark) | 4,500 m², 10 zones | arch_pg_kewPOWC | page | operator claim | 60 |
| Heat use, Canadian conservatory | ? (Muttart, Bloedel: no kWh or GJ found; Edmonton benchmarking report Year 6 has no Muttart line) | — | — | — | 0 |
| Heat use, benchmark | Kew POWC "32% of the total gas" of site | arch_pg_ward2013Kew | p. 1256 | peer-reviewed (UK) | 60 |
| Glasshouse gutter (low form) | 4–5.5 m | arch_hb_abGreenhouse | — | government guide (AB) | 80 |

### Can a ~490 m² conservatory be built under the height limits?

| site | rule | result | source id | kind | conf. |
|---|---|---|---|---|---|
| Edmonton BE | Height 16.0 m; dome or other roof: Development Planner picks a method (hip = midpoint eave to top); roof top may extend ≤1.7 m above max → top ≤17.7 m | Muttart-type 18.0 m pyramid misses by ≈0.3 m (our arithmetic); a pyramid ≤17.7 m, or a glasshouse at 4–5.5 m gutter, fits | arch_hb_edmBE; arch_hce_edm570Roof; arch_pg_edmMuttartPyr | rule + our arithmetic | 70 |
| Edmonton BE use cap | "indoor botanical gardens" ≤500 m² per establishment | 490 m² fits, just | prog_grow.md (BE 3.3.1) | rule | 80 |
| Vancouver I-3 | 18.3 m outright, measured to highest point; to 30.5 m with approval | 18.0 m pyramid on grade fits (0.3 m spare, our arithmetic); Bloedel 21.3 m needs approval | arch_hce_vanI3Height; arch_hb_vanHeightBulletin | rule + our arithmetic | 70 |
| Vancouver I-3, on a podium | over a 6.0 m ground floor, ≤12.3 m remains outright | only a low glasshouse, not a Muttart pyramid (our arithmetic) | arch_hce_vanI3Height | our arithmetic | 60 |

Answer (our reading): yes, if it is a low glasshouse (4–5.5 m gutter). A Muttart-style 18 m pyramid fits Vancouver I-3 on grade but not Edmonton BE without lowering it ≈0.3 m. **The tool's 18 m conservatory height (arch_programs.json) is the Muttart arid pyramid, one form only; lower Canadian examples with a stated height were not found (?).**

---

## 3. Public edge

### Edmonton

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Frontage weather protection | "Provide weather protection along building frontages wherever possible, including ramps and stairs" | arch_hce_edmWinterNum | p. 35 | government guide | 75 |
| Canopy depth or height | ? (none in guidelines) | arch_hce_edmWinterNum | — | — | 0 |
| Heated sidewalks | to "research and evaluate" only | arch_hce_edmWinterNum | p. 46 | government guide | 75 |
| Heated seating / plaza heat | gas fire pits, wind screens; heat lamps "where supervised facilities exist"; high amp-load for vendor huts | arch_hce_edmWinterNum | pp. 49, 78 | government guide | 75 |
| Sun + wind shelter | can feel "10°C warmer" | arch_pub_edmWinter2016 | p. 19 | government guide | 75 |
| Snow storage | smaller sunny areas, not one shaded one | arch_hce_edmWinterNum | p. 21 | government guide | 75 |
| Entrance weather protection (zoning) | "Main entrances must incorporate weather protection features" in RM, RL, MUN, CB etc.; not found in BE or IM | arch_hce_edmEntranceWP | e.g. 2.110 s. 5.3 | rule (our reading of a text search) | 75 |
| Canopy into setback | eaves, shade projections ≤0.6 m into a required Setback | arch_hce_edmEntranceWP | 5.90 | rule | 80 |
| Winter Design Policy (C-?) | ? (edmonton.ca blocked the fetch: robots; not circumvented) | — | — | — | 0 |
| Minimum plaza size | ? | — | — | — | 0 |

### Vancouver

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Canopy over a street | lowest point ≥2.75 m; outer edge ≥750 mm from curb; ≥600 mm from pole or lamp; fascia ≤3.65 m; drained to building | arch_hce_vbblCanopy | VBBL Book I 1.8.8.3–1.8.8.6, p. 224 | rule | 90 |
| Awning over a street | ≥2.75 m (2.6 m on slope; fringe 2.3 m); ≥600 mm from curb | arch_hce_vbblCanopy | 1.8.7.4 | rule | 90 |
| Sign on canopy | clearance ≥2.75 m | arch_hce_vanSignBL10 | 10.4.3 | rule (summary read) | 75 |
| Plaza weather protection | "some overhead weather protection" at waiting points and routes | arch_pub_vanPlazaDG | s. 4.4 | government guide | 80 |
| Plaza level | "preferably no more than 1.0 m above or below street level" | arch_pub_vanPlazaDG | s. 2.2 | government guide | 80 |
| Minimum plaza size | none set ("no dimensions") | arch_pub_vanPlazaDG | whole doc | government guide | 80 |
| Cooling space temperature | aim ≤26 °C; risk rises >26 °C, sharply >31 °C | arch_hce_vchCooling | pp. 3, 5 | health authority guide | 85 |
| Cooling space must-haves | drinking water, accessible washrooms, seating, afternoon–evening hours | arch_hce_vchCooling | p. 5 | health authority guide | 85 |
| Cooling space extras | storage for belongings and mobility devices, pets, quiet rooms, filtration | arch_hce_vchCooling | pp. 6, 7 | health authority guide | 80 |
| Cooling space size or capacity | ? (none given) | arch_hce_vchCooling | — | — | 0 |
| Walking distance | Barcelona aim: refuge "within a five-minute walk" (example cited, not a VCH rule) | arch_hce_vchCooling | p. 6 | cited example | 40 |

### Snow melt and heated seating

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Fluid heater | 630–950 W/m² incl. back and edge losses | ashrae2015ch51 | Fluid Heater | design guide | 75 |
| 99 % design flux, cold benchmark | Great Falls MT 453 W/m² (Ar 0.5), 869 (Ar 1); Minneapolis 485 / 801 | arch_hce_ashraeCh51Cold | Table 1, p. 51.4 | design guide (US benchmark) | 75 |
| 99 % design flux, mild benchmark | Seattle 420 (Ar 0.5), 647 (Ar 1) | ashrae2015ch51 | Table 1 | design guide (US benchmark) | 75 |
| Annual energy, cold benchmark | Great Falls Ar 0.5: 37.0 melting + 380.4 idling kWh/m²; Minneapolis 32.6 + 563.0 | arch_hce_ashraeCh51Cold | Table 3 | design guide (US benchmark) | 70 |
| Annual energy, mild benchmark | Seattle Ar 0.5: 3.0 + 33.0 kWh/m² | ashrae2015ch51 | Table 3 | design guide (US benchmark) | 75 |
| Which US city stands for Edmonton | ? (our pick of Great Falls / Minneapolis is a judgement, not sourced) | — | — | — | 20 |
| Heated seating load | ? (no source) | — | — | — | 0 |

Idling dominates in cold cities (our reading of Table 3): idling uses ≈10–17× the melting energy (our arithmetic: Great Falls 380.4 vs 37.0; Minneapolis 563.0 vs 32.6).

### Soil warming for planting

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Root-zone target | 13–24 °C (55–75 °F) for most crops | arch_hce_rutgersRootZone | text | university guide (US benchmark, draft) | 55 |
| Floor heat output | ≈63 W/m² (20 Btu/h·ft², our arithmetic) at 35 °C water, 16 °C air | arch_hce_rutgersRootZone | text | university guide (US benchmark) | 55 |
| Water temperature | 32–49 °C typical; ≤60 °C at close spacing | arch_hce_rutgersRootZone | text | university guide (US benchmark) | 55 |
| Water temperature (poly pipe) | ≈38 °C standard; ≤54 °C poly | arch_hce_farmEnergyRootZone | text | extension (US benchmark) | 55 |
| Share of greenhouse heat | floor heat 30–40 % of annual | arch_hce_rutgersRootZone | text | university guide (US benchmark) | 50 |
| Outdoor planting bed warming | ? (greenhouse sources only) | — | — | — | 0 |
| Canadian source | ? | — | — | — | 0 |

Our reading: root-zone heat runs at 32–49 °C. Data-centre air-side heat (25–35 °C) is at or below that range; liquid-cooling heat (45–60 °C) covers it.

### EV hub on a public frontage

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Visibility | "clearly visible to vehicles and pedestrians passing by" | arch_hce_bchFastChargeRoof | p. 13 | utility guide | 75 |
| Kerbside | "Curbside pull-through charging can be a great solution on city streets" | arch_hce_bchFastChargeRoof | p. 30 | utility guide | 75 |
| Permits | street use permit, traffic management plan | arch_hce_bchFastChargeRoof | p. 14 | utility guide | 75 |
| Stalls | ≥1.5 stalls per charger; ≥4 vehicles at once | arch_sup_bchFastCharge2024 | pp. 13, 16 | utility guide | 80 |
| Accessible charger head | 1 067–1 220 mm above grade | arch_hce_crdEVArchetypes | E3.3 p. 12 | consultant guide (BC regional) | 55 |
| Transformer clearance (Edmonton) | "can be as high as 6.0m" | epcor_ccg | s. 6.4(g) | utility guide | 75 |
| Canopy height over chargers | ? | — | — | — | 0 |

---

## Gaps

- Floor-to-floor per program from filed Canadian permit sections: ? (Vancouver CD-1 reports read give storey counts only; Mill Woods and Jasper Place Edmonton reports give none).
- Refuge, warming shelter, spa, kitchen, laundry, food drying, fish farm, winter garden, library: room height ?
- Clinic floor-to-floor: ? (CSA Z8000 paywalled).
- Climbing: EN 12572-1 cl. 4.7–4.8 and EN 12572-2 full text paywalled (UBC Library).
- Muttart tropical, temperate, feature pyramid heights: ?
- Any Canadian conservatory heat use (kWh/m²): ?
- Heated seating load; outdoor soil warming; Canadian snow-melt data: ?
- Edmonton canopy dimensions; plaza minimum size (both cities): ?

## Blocked / paywalled

- Edmonton Winter Design Policy PDF: robots block, not fetched.
- EN 12572-1/-2 full text; CSA Z8000; FINA Facilities Rules not read.
- Toronto Shelter Design Guidelines s. 5.3.1 not reached by the reader.

## For J.B. to decide

- Keep conservatory height at 18 m (Muttart pyramid) or switch to a low glasshouse (4–5.5 m) for Edmonton BE?
- Which US snow-melt city to use as the Edmonton benchmark (Great Falls or Minneapolis), or none?
