# Separations: data-centre plant vs sensitive programs and buildings

Research 31 Oct 2026. Builds on spatial_rules.md (not repeated). Primary sources only; claims labelled. "?" = not found or not confirmed. "our reading" / "our arithmetic" = not stated by the source.

Local code copies read: NFC 2020 (data/raw/codes/nfc.txt), NFC(AE) 2023 (nfc_ab2023.txt), NBC 2020, BCBC 2024, NBC(AE) 2023, VBBL 2025 Book I (vbbl2025_v1.txt, consolidated to 30 Sep 2026), Edmonton Zoning Bylaw 20001 (data/raw/edm/bylaw/b.txt).

## Correction to the register (fuel tanks)

- Register (fuel_on_site, nfc2020_4313) says Part 4 of the fire code does not apply to generator tanks. **Incomplete.**
- NFC 2020 and NFC(AE) 2023 4.1.1.1.(3)(b): Part 4 does not apply to CSA B139 equipment "**except for aboveground storage tanks with an individual capacity exceeding 2 500 L**".
- So an outdoor generator day-tank or belly tank ≤2,500 L follows CSA B139 (paywalled); a bulk tank >2,500 L follows Part 4 (distances below). Note A-4.1.1.1.(3)(b) alone reads as a blanket exclusion; the Sentence governs (our reading).

## 1. Standby diesel generators → hospitals, schools, childcare, care homes, housing

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Metro Vancouver: Tier 0/1 engines near sensitive receptors | 100 m; receptor = hospital, elementary school, day care, community care facility | arch_mv1329 (existing) | s. 57, s. 1 | rule | 90 (confirmed in spatial_rules; not re-read today) |
| BC Ministry of Environment guidance on generators near receptors | none found ? | — | — | — | 0 |
| Alberta EPA, data centres | no setback. Proponents identify "residences and sensitive lands"; backup generation "over 50 megawatts" needs an EPEA approval; noise left to municipalities | arch_sep_abEpaDC2026 | fact sheet, 20 Jul 2026 | government guide | 80 |
| VCH / AHS siting guidance for generators | none found ? | — | — | — | 0 |
| Health care intakes (any plant) | hospitals' ventilation follows CAN/CSA-Z317.2 (paywalled → logged) | arch_sep_nbc63215full | NBC 6.2.1.1.(1) ref.; 6.3.2.15.(6) | rule (pointer) | 85 |
| US: permit notice near schools (California) | source "within 1,000 feet from the outer boundary of a schoolsite" → public notice; parents of pupils within ¼ mile notified | arch_sep_cahsc42301_6 | Health & Safety Code 42301.6(a)–(b) | rule (US benchmark) | 80 |
| US: testing hours near schools (California ATCM) | new emergency standby diesel >50 bhp: no maintenance or testing "between 7:30 a.m. and 3:30 p.m. on days when school is in session, if the engine is located within 500 feet of school grounds"; not if ≤0.01 g/bhp-hr PM | arch_sep_carbAtcm93115 | 17 CCR 93115(e)(2)(A)1.b (2004 text; later amendments not checked ?) | rule (US benchmark) | 70 |
| US: data-centre generators to housing (Washington) | 21 gensets ≤3 MW, Tier 4: 50 h/engine/yr → 120–180 m stack to residences; 75 h → 200–280 m; 100 h → 320–400 m. Table 8 gives 130 m (not 120) as the 50 h minimum. Residences are the only controlling receptor; no school distance | arch_sep_waEcologyHIA2025 | Exec. summary p. 8; Table 8 p. 21 | government study (US benchmark) | 75 |
| EU / UK distance rule | none found; UK permits decide case by case ? | — | — | — | 0 |

## 2. Cooling towers / evaporative coolers → intakes, windows, hospitals (Legionella)

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| NBC 6.3.2.15.(5) wording (confirmed; BCBC 2024 and NBC(AE) 2023 same) | "2.15 m above sidewalks and driveways, 7.6 m from outdoor air intakes, 3 m horizontally or vertically from exterior doors and operable windows, and 3 m … from occupiable outdoor spaces, **excluding maintenance spaces**" | arch_sep_nbc63215full | 6.3.2.15.(5) | rule | 90 |
| Health care facilities | discharge "in compliance with CAN/CSA-Z317.2" instead of (5) | arch_sep_nbc63215full | 6.3.2.15.(6) | rule | 90 |
| Distances may need to grow | "may need to be increased where warranted by … prevailing winds, adjacent structures" | arch_sep_nbc63215full | Note A-6.3.2.15.(5) and (6) | rule (note) | 90 |
| Water treatment | per ASHRAE Guideline 12, s. 7.6.2 (paywalled → logged) | arch_sep_nbc63215full | 6.3.2.15.(9) | rule (pointer) | 85 |
| Vancouver: operating permit | permit to install or keep a cooling tower; 1-year service contract; monthly *L. pneumophila* tests; yearly offline cleaning. No distance rule | arch_sep_vbbl22116 | VBBL 2025 Div. B 2.2.11.6 | rule | 90 |
| Vancouver: what counts | definition includes "adiabatic cooler which recirculates non-evaporated water" and fluid coolers on a recirculated water system → adiabatic dry coolers may need a permit (our reading) | arch_sep_vbbl22116 | Div. A 1.4.1.2 | rule | 85 |
| Vancouver record | 2021: "30 cooling towers at 16 facilities, including two hospitals, reported *L. pneumophila*" | arch_sep_vanCT2023 | Council report RTS 15653, p. 2 (25 May 2023) | government report | 80 |
| Federal guidance (benchmark) | 10 m to "any air intake or other critical receptor" | pspcLegionella (existing) | Cl. 3.2.2 | government guide (federal property) | 80 |
| How far Legionella travels (Canada) | Ontario 2022 outbreak: 6 km search radius; 2 cases on site, 2 <500 m, 7 at 0.5–1 km, 21 at 1–3 km, 3 at 3–6 km | arch_sep_ccdrLegionella2023 | CCDR 49(9):380–6 | peer-reviewed (govt journal) | 80 |
| Alberta cooling-tower rule | none found ? | — | — | — | 0 |
| ASHRAE 188 distances | not read (paywalled → logged); it is a risk-management standard, distance content ? | — | — | — | 0 |

## 3. Above-ground fuel tanks → property lines, buildings, openings

Diesel is normally Class II (flash point 37.8–60 °C, NFC 4.1.2.1.(3)); diesel's own flash point not sourced here (?).

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Which code | tanks >2,500 L: fire code Part 4; ≤2,500 L feeding a generator: CSA B139 | arch_sep_nfc4311 | NFC 2020 / NFC(AE) 2023 4.1.1.1.(3)(b) | rule | 90 |
| Tank → property line or building (stable liquid, ≤17 kPa) | Table 4.3.2.1: ≤250,000 L 3 m; ≤500,000 L 4.5 m; ≤2.5 ML 9 m; ≤5 ML 12 m; larger 15 m. Half with fixed fire protection (4.3.2.5.(2)) | arch_sep_nfc4321 | 4.3.2.1.(2), Table 4.3.2.1 | rule | 90 |
| Class II tank → building on same lot (BC, NFC) | 1.5 m if ≤50,000 L; 0 if ≤2,500 L (property line not reduced) | arch_sep_nfc4321, arch_sep_bcfc2018 | 4.3.2.1.(6) | rule | 90 |
| Same, Alberta | 1.5 m if ≤**80,000 L**; 0 if ≤2,500 L | arch_sep_nfcAB4321 | NFC(AE) 2023 4.3.2.1.(6) | rule | 90 |
| Protected tank | distance "permitted to be waived" if CAN/ULC-S655 (paywalled → logged) | arch_sep_nfc4321 | 4.3.2.1.(7) | rule | 90 |
| Tank to tank | 1 m (both ≤250,000 L); propane 6 m | arch_sep_nfc4321 | 4.3.2.2, 4.3.2.3 | rule | 90 |
| Fire truck access | within 60 m travel of each tank | arch_sep_nfc4321 | 4.3.2.4.(2) | rule | 90 |
| Vent outlets (Class II) → openings | ≥2 m above ground; ≥1.5 m from any building opening; emergency vents 1.5 m from openings and combustible walls | arch_sep_nfc4321 | 4.3.5.2.(2)–(3) | rule | 90 |
| Edmonton practice | 3 m to property line; 1.5 m to building (2,500–80,000 L); impact posts 1 m from shell; containment wall ≥1.5 m from shell; engineered drawings if one tank >8,000 L | arch_sep_edmAST | EFRS checksheet (rev. 15 Aug 2019, NFC(AE) 2019) | government guide | 80 |
| BC Fire Code 2024 text | not read; BCFC 2018 matches NFC 2020 (50,000 L) ? | arch_sep_bcfc2018 | — | — | 60 |

## 4. Batteries (ESS / UPS) → occupied rooms, exits, other occupancies

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Building and fire codes | no energy-storage provisions in NBC 2020, BCBC 2024, NBC(AE), NFC 2020, NFC(AE) 2023, VBBL 2025 (re-checked today: no "energy storage", "lithium" or "stationary battery") | nfpa855tia (existing) | full texts | rule (absence) | 85 |
| CEC outdoor batteries, public wording | "shall not be located within" 3 m of a means of egress and 1.5 m of windows, vents, doors (not vehicle doors), unless UL 9540A-evaluated and per maker's instructions | arch_sep_abStandataESS | Rule 64-926, as quoted in STANDATA 21-ECV-064-900-ESS (Oct 2023) | government guide | 75 |
| Residential only | 1 m from dwelling windows/doors; 1 m between systems; not under a required exit; not in or opening onto sleeping areas | arch_sep_abStandataESS | Rule 64-1100 4), 7), 8), 10) | government guide | 75 |
| BC bulletin | TSBC ESS bulletin "rescinded … on March 4, 2025" (CEC 2024 in force) | arch_sep_tsbcESS | notice page | government notice | 70 |
| UPS batteries | outside the ESS definition (C22.2 No. 107.3) | cec2024ESS (existing) | App. B | — | — |
| NFPA 855 / IFC US distances | in register (nfpa855_2026); full text paywalled → logged | nfpa855_2026 | — | standard (US) | — |
| NBC/NFC 2025 ESS clauses | not found ? | — | — | — | 0 |

## 5. Pad-mount transformers and substations → windows, schools, housing (EMF)

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Health Canada | "You don't need to take precautions"; exposures in "homes, schools and offices are far below" ICNIRP limits; strongest "right beside a transformer box"; no distance | arch_sep_hcELF | Power lines and electrical products page (mod. 1 May 2026) | government guide | 85 |
| Federal-provincial committee | "no national guidelines in Canada limiting exposure of the public to power-frequency EMFs"; warning to avoid living near power lines "is not required"; precaution: low or no cost options only | arch_sep_fptrpc2008 | FPTRPC statement, 8 Nov 2008 | government guide | 80 |
| VCH, downtown substation beside a school | no causal link supported; recommends "Maximize distance between the transmission cables and the proposed Lord Roberts Annex … and playfield"; school ≈70 m from cables; study noise of substation ventilation | arch_sep_vchNelson2017 | VCH letter, 17 Feb 2017, pp. 4, 6 | health authority guide (site-specific) | 75 |
| Numeric EMF setback, BC or AB | none; "likely no limit" confirmed | — | — | — | 85 |
| CEC clearances of oil-filled transformers to windows | not read (CEC is J.B.'s copy) ? | — | — | — | 0 |

## 6. Truck loading and fuel delivery → pedestrian entrances, playgrounds

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Fuel truck unattended | >1 h only in a space "not less than 15 m from a building" | arch_sep_nfcTankVeh | NFC 2020 4.11.2.4 | rule | 90 |
| Fuel truck while unloading | kept from ignition sources as for dispensers: 6 m from fixed ignition sources; no smoking within 7.5 m | arch_sep_nfcTankVeh | 4.11.3.2 → 4.6.3.3.(1)(d), 4.6.8.7 | rule | 75 (cross-reference reading) |
| Fill stem → building or property line | 4.5 m (Class II), 7.5 m (Class I). Written for bulk plants; applies to a data-centre fill point only if 4.11.3.1 pulls it in (our reading ?) | arch_sep_nfcTankVeh | 4.7.4.1 | rule | 50 |
| Vancouver loading design | no rule on loading vs pedestrian entrances or play areas; Class A space at grade off the lane; Class B 3.4 × 10.2 m, Class C 3.6 × 23.1 m | arch_sep_vanLoadingSupp | Parking By-law design supplement (Feb 2024) s. 3.3–3.4 | government guide | 80 |
| Edmonton industrial zones | loading docks and mechanical equipment "located away and not visible from Street or perimeter walkway view" | arch_sep_ezbIndustrial | EZB 20001 IBES 7.18; ILES 7.17 | rule (zone-specific) | 80 |
| US: truck idling near schools | trucks ≥10,001 lb must not idle >5 min "within 100 feet of, but not at, a school" | arch_sep_ccr2480 | 13 CCR 2480(c)(2) | rule (US benchmark) | 75 |

## 7. Air-cooled chillers and dry coolers → greenhouse or outdoor public space

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Dry (non-evaporative) units | no distance rule found in NBC/BCBC/NBC(AE) (6.3.2.15 covers evaporative only) | arch_sep_nbc63215full | — | rule (absence) | 80 |
| Edmonton: closest analogue | parkade vents "oriented away from Abutting Sites, on-Site Amenity Areas and pedestrian circulation areas" (parkades only) | arch_sep_ezbIndustrial | EZB 20001 s. 5.120 1.1.4 | rule (analogue) | 70 |
| Edmonton nuisance clause | no "noise … gaseous emanations" apparent outside an enclosed building | arch_sep_ezbIndustrial | IBES 7.19 / ILES 7.18 | rule (zone-specific) | 75 |
| Warm-air plume to a greenhouse or plaza | none found ? | — | — | — | 0 |

## Gaps (?)

- CSA B139 (generator tanks ≤2,500 L), CAN/ULC-S655, CSA Z317.2, ASHRAE 188, ASHRAE Guideline 12, NFPA 855, UL 9540A: paywalled (logged).
- BC Fire Code 2024 Part 4 text; BC Ministry of Environment, VCH and AHS generator siting guidance; Alberta cooling-tower rules.
- Current (post-2004) CARB ATCM text; diesel flash point source; whether NFC 4.7.4.1 applies to a generator fill point.
- Any rule or credible guide for dry-cooler warm air on greenhouses or public outdoor space.
