# Systems: heat plant, river/inlet cooling, borefield, rain tank (2 Nov 2026)

Group E per BRIEF_v2.md. New ids → `sys_sources.json` (`arch_sys_*`). Reused, not repeated: arch_ho_vanNEUconn2020, arch_ho_breMultiUnit2025, arch_ho_van9552, arch_ho_edmC17943 (ETS rooms: see handover.md), arch_nbc3628 (NBC 3.6.2), arch_mvSewerBylaw299, arch_zon_EdmZones, arch_zon_EdmDefs, eccc / src_fill_ecccEdmCity.
"?" = not confirmed. "our arithmetic" = derived here. "our reading" = interpretation, not the source's words.

## Key findings first

- **Vancouver NEU runs too hot for data-centre heat directly.** Network supply "never less than 65°C", winter max 95 °C (arch_ho_vanNEUconn2020 s. 3.4). Liquid-cooled heat at 45–60 °C needs a heat pump to enter (our reading).
- **Blatchford's loop runs at 10–25 °C** (operator claim). Data-centre heat could go in without lifting (our reading). Its ETS rooms hold the heat pumps (handover.md).
- **Plant size, our arithmetic:** UBC's 45 MW boiler plant sits in 1,858–2,000 m², or about **41–44 m² per MW**. That is gas boilers only. For heat-pump plant: **?**
- **Installed capacity per floor area served, our arithmetic:** about 48–58 W/m² (UBC, Vancouver NEU). Both figures include peak and backup boilers.
- **Edmonton zoning:** "district heating plants" = **Minor Utility**, permitted in BE, IM and IH. "Cooling plants" = **Major Utility**, permitted only in IH and PU. A Major Utility also blocks childcare on the abutting site (s. 6.40, zoning.md). Exception: in the s. 3.60 Edmonton South Special Area, 4.1.158 "Utility Service, Major" lists "district heating plants" (4.1.158.13) and "cooling plants" (4.1.158.11).
- **BC closed-loop boreholes have no setback in the regulation.** They need a registered geoexchange driller, full-length sealing, and a report within 90 days. Setbacks are left to CSA C448, which is paywalled (?).
- **Alberta boreholes:** an Approval to Drill has been required since 1 Jan 2020. Work must be done by a certified Earth Loop Technician. The Directive (local copy) s. 4.2.5 Table 4 sets vertical closed-loop setbacks: 1 m to buried electrical/gas and buildings; 3 m to property line, buried water, gravity sewer lateral; 6 m pumped sewer lateral; 15 m water well, septic tank; 30 m leaching field, spring.
- **River or inlet discharge: ±1 °C** change from natural background is the marine/estuarine guideline (BC; CCME). Heated water can be a "deleterious substance" under the Fisheries Act (s. 34(1)(b)).
- **Vancouver lets rainwater feed cooling towers and adiabatic coolers** (VBBL Table 2.7.1.3, Column B). Stored water must stay **< 20 °C**, monitored continuously (Table 2.7.7.1). So keep the tank away from data-centre heat (our reading).
- **Alberta rainwater:** permitted only for toilets, urinals and subsurface irrigation. Any other use, such as cooling make-up, needs an alternative solution approval.

---

## 1. Neighbourhood heat plant room (energy centre)

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver NEU supply temperature | winter max 95 °C, summer max 65 °C; "never less than 65°C" | arch_ho_vanNEUconn2020 | s. 3.4, Table 1, p. 11 | government guide | 85 |
| Vancouver NEU return temperature | winter max 55 °C, summer 50 °C; min. ΔT 20 °C (table ambiguous) | arch_ho_vanNEUconn2020 | s. 3.4; s. 6.2.3 | government guide | 75 |
| Vancouver building-side temperatures | space heat ≤70 °C supply / ≤50 °C return (winter); DHW 60 °C | arch_ho_vanNEUconn2020 | Table 1 | government guide | 80 |
| Waste heat from customers | NEU "may ... accept waste heat from building cooling loads"; bill credit for heat returned | arch_ho_vanNEUconn2020 | s. 2.3, s. 2.6 | government guide | 80 |
| False Creek Energy Centre plant | sewage heat recovery 3.2 MW + 6.6 MW expansion; boilers 24 MW; Mount Pleasant satellite 5 MW | arch_sys_neuSlides2021; arch_sys_vanSefcPage | slides 12, 15; page "False Creek Neighbourhood Energy Utility (NEU)" | government presentation | 75 |
| Floor area served (NEU) | 576,000 m² (6.2 M sq ft) in 2021; 667,000 m², 47 buildings (2025); ~2,000,000 m² at build-out | arch_sys_neuSlides2021; arch_sys_neuRates2026 | slide 8; RTS 18251 p. 2 | government report | 85 |
| Installed W/m² (NEU) | 32.2 MW ÷ 576,000 m² ≈ **56 W/m²**; 38.8 MW ÷ 667,000 m² ≈ 58 W/m² (assumes the 2025 plant = 2021 plant + 6.6 MW ?) | our arithmetic | — | our arithmetic | 55 |
| Per-unit heat demand | 75 m² suite "average energy demand of 8.2 megawatt-hours (MWh) per year" (≈109 kWh/m²·yr, our arithmetic) | arch_sys_neuRates2026 | p. 3 | government report | 80 |
| NEU renewable share | "70% ... mostly from sewage heat recovery"; gas boilers back-up | arch_sys_vanSefcPage; arch_sys_neuRates2022 | page; App. B p. 1 | government | 80 |
| NEU and data centres | data centres named as a potential source; no connection confirmed | arch_sys_neuRates2026 | App. B p. 7; App. D pp. 3–4 | government report | 80 |
| Vancouver energy centre guidelines | centres "up to 50 megawatts"; address "traffic, noise, and/or odour" (no numbers); MV Bylaw 1087 (air) applies; truck hours may be controlled | arch_sys_vanNES2012 | App. A s. 2.2, 3.0, 3.2 | government policy (PDF unreachable at checks 2 and 3; not verified ?) | 60 |
| UBC Campus Energy Centre | 3 × 15.0 MWt boilers = 45 MWt; building 1,858 m² (DP) / 2,000 m² (facilities record) | arch_sys_ubcAdes2019; arch_sys_ubcCecBldg | p. 5; DP 12029 | institution | 80 |
| **m² per MW (boiler plant)** | 1,858–2,000 m² ÷ 45 MW ≈ **41–44 m²/MW** | our arithmetic | — | our arithmetic | 55 |
| UBC W/m² served | 45 MW ÷ ~929,000 m² ≈ 48 W/m² (boilers only) | our arithmetic from arch_sys_ubcAdes2019 | Fast Facts box (10 M sq ft) p. 2; boilers p. 5 | our arithmetic | 50 |
| m² per MW (heat-pump plant) | not found (Danish Energy Agency catalogue truncated in fetch) | — | — | — | ? |
| Blatchford central plant | 1 MW ammonia heat pump; Phase 1 "3 Megawatts"; full 35–46 MW; "up to six Energy Centres" | arch_sys_breIdea2021 | award entry | operator claim | 55 |
| Blatchford loop temperature | "10 to 25 C"; kept above 10 C, no antifreeze | arch_sys_breIdea2021 | award entry | operator claim | 55 |
| Blatchford sewer heat (Phase 2) | trunk up to 500 L/s at 25 C; "up to 13 Megawatts of heating and 23 Megawatts of cooling" | arch_sys_breIdea2021 | award entry | operator claim | 50 |
| Blatchford energy and growth | 154 MWh (2019) → 11,368 MWh (2023) (forecasts, Table 1); ~1,400 units by 2023; ">16,000 customers" by 2047; EC1 cost "$19.442 million in total", on the future Blatchford Plaza | arch_sys_breBP2020 | energy p. 10; units p. 8; customers p. 5; EC1 cost p. 13, location p. 4 | government business plan | 75 |
| Edmonton DDEI | running since Sep 2025; 3 buildings; Phase 2 "up to 20 buildings"; 50 by 2050; gas boilers at first; heat only (phases 1–2) | arch_sys_edmDDEI | web page | government | 80 |
| Fire separation (code) | fuel-fired appliances in a service room with ≥1 h separation (3.6.2.1.(1)); other service equipment 1 h if the storey is not sprinklered (3.6.2.1.(7)); not needed for limited, non-hazardous equipment (3.6.2.1.(8)) | arch_nbc3628 (nbc.txt) | NBC 3.6.2.1 | rule | 90 |
| Fire separation vs F-2 data hall | energy centre as its own major occupancy (F-2? F-3?): not determined | — | Table 3.1.3.1 | — | ? |
| Ammonia / refrigerant machinery room | CSA B52 governs (paywalled) | — | — | — | ? |
| Zoning, Edmonton | Minor Utility (examples "district heating plants") permitted in BE s. 2.22, IM s. 2.13, IH s. 2.5, PU s. 2.3; Major Utility (examples "cooling plants") in IH s. 2.4, PU s. 2.2 | arch_sys_edmUtilityUses | s. 8.10 defs; zone use lists | rule | 85 |
| Zoning, Vancouver I-2 | "Public Utility" outright "if ... at least 61.0 m from any R district", else conditional | arch_sys_vanI2Utility | I-2 s. 2.2.8, 2.2.1 | rule | 80 |
| Is a private energy centre a "Public Utility"? | no definition in Section 2 (confirmed; term appears only in the Utility and Communication Uses list); whether a private centre counts ? | arch_sys_vanI2Utility | Section 2 (June 2026) | rule (absence) | 70 |
| Zoning, I-1, I-3, M-1, M-2, IC | not checked this pass | — | — | — | ? |
| Sewer discharge limit (Metro Vancouver) | non-domestic waste ≥65 °C prohibited; must not raise sewage to 40 °C | arch_mvSewerBylaw299 | Sched. A s. 4(b)–(c) | rule | 85 |
| Sewer discharge limit (Edmonton) | Drainage Bylaw 18100 blocked (robots) | — | — | — | ? |
| ETS rooms (receiving buildings) | see handover.md (Vancouver 6 × 3 m / 6 × 4 m; Blatchford 12–55 m², 2 h) | arch_ho_* | — | — | — |
| Social fit / provision standard | none: utilities are planned per neighbourhood, not by a catchment | — | — | — | ? |

## 2. River or inlet cooling (waterfront lots)

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Capacity per L/s | Q = 4.18 kJ/kg·K × flow × ΔT; at ΔT 5 K ≈ **21 kW per L/s**, or ≈48 L/s per MW | our arithmetic (physics) | — | our arithmetic | 70 |
| Allowed ΔT at discharge | guideline applies to the receiving water, not the pipe; mixing-zone size not in the overview | arch_sys_bcWqgTemp | overview | — | ? |
| Marine / estuarine (Burrard Inlet, Fraser estuary) | "+ or - 1 degree Celsius change from natural ambient background"; rate ≤0.5 °C per hour | arch_sys_bcWqgTemp; arch_sys_ccmeTemp | BC Table 1, s. 2.4; CCME marine 1996 | government guideline | 85 |
| Streams (BC) | ±1 °C beyond the optimum range of the most sensitive salmonid; ≤1 °C per hour | arch_sys_bcWqgTemp | Table 1, s. 2.2 | government guideline | 85 |
| Freshwater (CCME, Edmonton benchmark) | thermal additions must not exceed "the maximum weekly average temperature" | arch_sys_ccmeTemp | freshwater 1987 | government guideline | 75 |
| Alberta temperature guideline | 2018 Environmental Quality Guidelines (AEP) not read | — | — | — | ? |
| Heat as pollutant (federal) | water "changed, by heat or other means" can be a deleterious substance; deposit prohibited (s. 36(3)) | arch_sys_fishAct | s. 34(1)(b), 36(3) | rule | 85 |
| Habitat (federal) | no work that results in HADD unless "authorized by the Minister" | arch_sys_fishAct | s. 35(1)–(2) | rule | 90 |
| DFO review | self-assessment → notification or authorization | arch_sys_dfoReview | page "Project pre-screening" (Request a review of your project near water) | government guide | 70 |
| Intake screen | approach ≤0.055 m/s with no fish data (Table C-1 says 0.035: conflict ?); ≥50 % open; 2.54 mm opening (1 mm for eels and small species at risk); may not fit "large water intakes" | arch_sys_dfoScreen | s. 3.1.1, 3.2.1, Table C-1 | government standard | 75 |
| Screen area per MW | 0.048 m³/s ÷ 0.055 m/s ≈ **0.9 m²** effective per MW at ΔT 5 K | our arithmetic | — | our arithmetic | 55 |
| BC water licence | must not divert "from a stream or an aquifer" without authorization; cooling in industrial operations is a Schedule A industrial purpose | arch_sys_bcWSA; arch_sys_bcWSReg | WSA s. 6(1); WSR s. 2, Sch. A item 4 | rule | 80 |
| BC in-stream works | approval "to make changes in and about a stream" | arch_sys_bcWSA | s. 11(1) | rule | 85 |
| Is Burrard Inlet a WSA "stream"? | definition silent on marine waters | arch_sys_bcWSA | s. 1 | — | ? |
| Port lands and waters (Vancouver) | Port PER permit for works on federal lands and waters (Burrard Inlet, Fraser); a new discharge to water = Category C example; 60–120 business days; fee $12,500 + GST (Category A "N/A"; B $500 or $2,500; D $22,500; all plus GST); port authority "issues a project permit with conditions" | arch_sys_vfpaPER | pp. 3, 11, 14, 16, 23 | government agency guide | 75 |
| Alberta water licence | "To divert and use surface or groundwater ... requires a licence under the Water Act"; South Saskatchewan basin closed to new surface-water licences (Edmonton is in the North Saskatchewan basin, so it is not affected) | arch_sys_abWaterLic | fact sheet | government guide | 80 |
| Alberta discharge approval (EPEA) | not confirmed | — | — | — | ? |
| Edmonton river valley development limits | not checked | — | — | — | ? |
| River water temperature (Fraser, North Saskatchewan) | not found | — | — | — | ? |
| Land / space | intake, outfall, pump house; sizes not found | — | — | — | ? |

## 3. Borefield (closed-loop geoexchange)

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Capacity per metre (W/m) | tables exist (MCS 022, by conductivity and run hours) but values were not legible; VDI 4640 / ASHRAE paywalled | arch_sys_mcs022 | pp. 4–9 | standard (UK benchmark) | ? |
| Typical depth | 200–400 ft (61–122 m), average 328 ft (100 m) | arch_sys_ornl2018 | p. 3 | government lab (US) | 75 |
| Edmonton real case | 570 boreholes × 150 m = 85,500 m of bore (our arithmetic), under a stormwater pond | arch_sys_edmBorefield; arch_sys_breBP2020; arch_sys_breIdea2021 | City page; BP pp. 4, 7 | government | 80 |
| Spacing | "6m minimum borehole spacing" (in a line); 20 ft (6.1 m) square array baseline; one cited study (Kurevija et al.) varied spacing 4–9 m | arch_sys_mcs022; arch_sys_ornl2018; arch_sys_ahmadfard2019 | p. 5; p. 27; p. 22 | standard / gov lab / peer-reviewed | 70 |
| Land per borehole | 6 m grid → 36 m² per bore; 570 bores ≈ 2.05 ha (Blatchford's actual spacing ?) | our arithmetic | — | our arithmetic | 45 |
| Can it sit under other uses? | Blatchford field sits under a stormwater pond; under a building: ? | arch_sys_edmBorefield | — | government | 70 |
| Fluid temperature limits (design) | heat pump inlet ≥0 °C heating, ≤35 °C cooling (common practice) | arch_sys_ahmadfard2019 | p. 4 | peer-reviewed | 75 |
| BC: who drills | registered geoexchange driller (SkilledTradesBC certificate) | arch_sys_bcGWPR | s. 14(1)(b), 8(2)(b)(ii) | rule | 85 |
| BC: construction | seal "along the entire length of the ground loop, from the bottom upward" | arch_sys_bcGWPR | s. 25(1) | rule | 85 |
| BC: reporting | one construction report per system to the comptroller within 90 days; no ID plate | arch_sys_bcGWPR | Sch. 6; s. 76 | rule | 80 |
| BC: exemption | horizontal loops <5 m deep exempt | arch_sys_bcGWPR | s. 4(1)(c) | rule | 85 |
| BC: setbacks | none found for closed-loop wells (s. 18's 15 m applies to water supply wells only) | arch_sys_bcGWPR | s. 18 | rule | 70 |
| BC: water licence | closed loop: no diversion, so likely none (our reading); open loop: licence for non-domestic groundwater use | arch_sys_bcGWPR; arch_sys_bcGwUsers | s. 1(1); page "Requirements for groundwater users" | rule; government guide | 70 |
| Vancouver | artesian risk "large areas of the City located over aquifers"; open loop: hydrogeological study, no sewer discharge, not for ≤8-unit residential (bulletin quotes the 2019 By-law 12511; VBBL 2025 clause ?) | arch_sys_vanArtesian; arch_sys_vanGwBulletin | 2016-004-BU; s. 2.1, 2.3.2, App. B | government bulletin | 80 |
| Alberta | Water Wells and Ground Source Heat Exchange Systems Directive (above the Base of Groundwater Protection); Approval to Drill since 1 Jan 2020; certified journeyman Earth Loop Technician; aligns with C448-16 | arch_sys_abGwPage | web page | government | 80 |
| Alberta setbacks (vertical closed loop) | buried electrical/gas 1 m; existing or planned building or above-ground structure 1 m; property line 3 m; buried water 3 m; gravity sewer lateral 3 m; pumped sewer lateral 6 m; water well 15 m; septic tank 15 m; subsurface sewage leaching field 30 m; spring 30 m | — (Water Wells and GSHE Systems Directive, AEP Water Quality 2018 No.3, eff. 11 Dec 2018; local copy sources/library/public/abDirective/full.pdf; new source id needed ?) | s. 4.2.5, Table 4, p. 19 | rule | 85 |
| Alberta reporting | not read this pass ? | — | — | — | ? |
| Alberta EPEA | geoexchange "subject to EPEA requirements" (secondary summary, not primary) | arch_sys_elcGeo | one-pager | legal NGO summary | 40 |
| Canadian benchmark setback | NL: no well within 30 m of the nearest water well; no methanol | arch_sys_nlGshp | s. 6.4, 6.1 | government guide (NL) | 70 |
| Codes | C448 cited only for Part 9 housing (9.33.5.2.(1)(f)); BCBC cites old Series-13 | arch_sys_codesC448 | 9.33.5.2 | rule | 85 |
| CSA C448:25 | scope only: GSHP using groundwater, surface water, wastewater or earth; new and retrofit installations (cl. 1.2); cl. 1.3 topics: equipment and materials, site survey, design, installation, testing, documentation, commissioning and decommissioning | arch_sys_sccC448 | catalogue cl. 1.1–1.2 | standard summary | 50 |
| Edmonton by-law for boreholes | not found | — | — | — | ? |

## 4. Rain tank

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Yield formula | roof m² × rainfall mm = litres; 80 % collection efficiency (metal, asphalt shingle and flat roofs) | arch_sys_calgaryRwh | App. A, Table 1 | government guide (Calgary) | 75 |
| Flat roof efficiency | 80 % for asphalt built-up flat and rubber flat roofs (wetting loss 1.5 mm) | arch_sys_calgaryRwh | App. A, Table 1 | government guide (Calgary) | 75 |
| Rainfall, Vancouver | 1119.2 mm/yr rain (precipitation 1159.5); July 34.1 mm, Aug 36.1 mm | arch_sys_ecccVan (eccc) | normals 1991–2020 | government data | 90 |
| Rainfall, Edmonton | 329.3 mm/yr rain (City); precipitation 422.5 mm | arch_sys_ecccVan; src_fill_ecccEdmCity | normals | government data | 90 |
| **Net yield per m² roof** | Vancouver ≈ **0.90 m³/m²·yr**; Edmonton ≈ **0.26 m³/m²·yr** (rain only × 0.8) | our arithmetic | — | our arithmetic | 60 |
| Seasonal mismatch | Vancouver gets least rain in Jul–Aug, the peak cooling months (our reading from normals) | arch_sys_ecccVan | monthly | our reading | 70 |
| Vancouver: must manage rainwater | "all buildings shall manage rainwater on-site"; site >1000 m² = engineered pathway | arch_sys_vbblRain | 2.4.2.5.(1), Table 2.4.2.5.-A | rule (unofficial 'Insert Pages' convenience copy; check official consolidation before citing as final; applies to all arch_sys_vbblRain rows) | 90 |
| Vancouver: release rates | 2-stage, 5 L/s/ha (volume = 15 mm over unlandscaped area), then 25 L/s/ha | arch_sys_vbblRain | 2.4.2.5.(6) | rule | 85 |
| Vancouver: small-site tank | 3,400–7,200 L; footprint 7.5–12.5 m², ~1.5 m deep | arch_sys_vbblRain; arch_sys_vanRain2024 | Table 2.4.2.5.-B; p. 6 | rule; government report (the report's 24 mm text is a draft amendment in App. A, not the rule in force) | 85 |
| **Vancouver: permitted uses** | toilets, urinals, trap primers (mandatory in an alternate water source system); also irrigation, washers, hydronic make-up, **cooling-tower make-up, adiabatic cooling** | arch_sys_vbblRain | Table 2.7.1.3, 2.7.1.3.(2) | rule | 90 |
| Vancouver: not permitted | runoff from a public road, groundwater, blackwater; no supply to healthcare fixtures | arch_sys_vbblRain | 2.7.1.2.(2), 2.7.1.3.(5) | rule | 90 |
| **Vancouver: water temperature** | "< 20°C", continuous monitoring; turbidity <10 NTU; Legionella <10 CFU/mL | arch_sys_vbblRain | Table 2.7.7.1 | rule | 90 |
| Vancouver: tank rules | pre-filter; lockable; withdraw ≥0.3 m above base; overflow to storm/combined sewer; P.Eng. design; operating permit; secondary supply; mandatory uses kept running "If a building is required to have an emergency system generator" | arch_sys_vbblRain | 2.7.5.3, 2.7.6.1–2.7.6.7 | rule | 85 |
| Fuel / vehicle areas | BTEX and TSS limits where surfaces carry vehicles or store fuels | arch_sys_vbblRain | Table 2.7.7.1 | rule | 85 |
| Alberta: permitted uses | toilets, urinals, subsurface irrigation; other uses → alternative solution through the local AHJ (Safety Codes Act); guide covers "small water reuse and stormwater use systems (serving a single property)" | arch_sys_abReuse2021; arch_sys_abRwh2010; arch_sys_calgaryRwh | notice; p. 1; s. 1 | government | 80 |
| Alberta: tank siting | buried below frost depth, or in a heated space; assume 20 % dead space | arch_sys_abRwh2010 | s. 2.3, pp. 11–13 | government guide (residential, single-family focus: Alberta benchmark only, not the rule for a non-residential building) | 70 |
| Alberta: multi-property | AEP is lead approver | arch_sys_abReuse2021 | s. 4 | government notice | 75 |
| Water licence for roof rainwater (AB, BC) | not confirmed | — | — | — | ? |
| Edmonton by-law / EPCOR rules | EPCOR LID guide not read | — | — | — | ? |
| CSA B805:22 | scope only | arch_sys_sccB805 | catalogue | standard summary | 60 |

## Gaps "?"
- m² per MW for a heat-pump plant (the boiler figure only: 41–44 m²/MW, our arithmetic).
- W/m (or kW per borehole) for Vancouver and Edmonton ground; Blatchford's spacing and per-bore capacity.
- Borehole setbacks: CSA C448 not read (BC relies on it); Alberta Directive Table 4 now read from local copy (no bore-to-bore spacing found in it).
- Alberta surface-water temperature guideline; mixing-zone rules in BC and AB; Alberta EPEA trigger for cooling discharge or geoexchange (primary text).
- Whether Burrard Inlet is a WSA "stream"; the rest of WSR Schedule A and its rentals.
- Edmonton Drainage Bylaw temperature limit; whether a private energy centre is a Vancouver "Public Utility" (no definition in Section 2); zoning for plant rooms in I-1, I-3, M-1, M-2, IC.
- Code occupancy of a stand-alone energy centre and its separation from F-2.
- Whether roof rainwater needs a water licence.

## Paywalled / blocked
- CSA C448:25 (and C448-16), CSA B805:22, CSA B52, CSA B128.1/.3, VDI 4640, ASHRAE geothermal chapters: paywalled (catalogue summaries only).
- open.alberta.ca: Water Wells and GSHE Directive and its fact sheet (server error, twice; not retried). The Directive itself is held locally (sources/library/public/abDirective/full.pdf) and was read from there.
- Edmonton Drainage Services Bylaw 18100 PDF (robots disallowed).
- free.bcpublications.ca: direct download refused by proxy; WebFetch read only part of WSR and the WSA (truncated).
- Danish Energy Agency technology catalogue: heat pump chapters cut off in fetch.
- council.vancouver.ca 27 Jun 2023 report r7 (client error).
- Fisheries Act page-8 URL refused (provenance); sections read from other official pages instead.

Check 2 applied (2 Nov 2026)

Check 3 applied (2 Nov 2026)
