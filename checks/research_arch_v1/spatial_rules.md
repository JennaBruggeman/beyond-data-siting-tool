# Spatial rules: public and sensitive programs vs data-centre plant

Research pass 30 Oct 2026. Local code copies read: NBC 2020 (data/raw/codes/nbc.txt), BCBC 2024 (bcbc2024.txt), NBC(AE) 2023 (nbc_ab2023.txt), Edmonton Zoning Bylaw 20001 (data/raw/edm/bylaw/b.txt), Vancouver By-law 6555 (data/raw/van/6555.txt), Metro Vancouver Bylaw 1329 (sources/library/public/mvBylaw1329/full.pdf). Where BCBC and NBC(AE) were checked, the wording matches NBC 2020.

Program classes used below (NBC 2020 Note A-3.1.2.1.(1) examples; BCBC 3.1.2.8 for daycare):
- refuge / assembly room, library → A-2
- indoor pool → A-3
- daycare → A-2 (BCBC 2024 3.1.2.8.(1))
- housing → C
- self-service laundry → D; commercial laundry → F-2
- greenhouse → not listed (?)
- data centre → not listed (?); see section 3

## 1. Standby diesel generators and their exhaust

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Exhaust from an emergency engine must not recirculate into the building or be drawn into nearby openings or intakes | "must not result in: (a) The recirculation of its stack exhaust into the building; or (b) The entrainment of its stack exhaust into surrounding building openings or air ventilation intakes". No distance is given. | arch_mv1329 | s. 13 (the register cites s. 12; s. 12 is about operation and maintenance) | rule | 90 |
| Vented combustion products (other than oil, gas or solid-fuel appliances) | "not less than a) 2.15 m above sidewalks and driveways, b) 3 m from outdoor air intakes, c) 3 m horizontally or vertically from doors and operable windows, and d) 3 m … from occupiable outdoor spaces". Whether this Part 6 (HVAC) clause covers engine-generator exhaust is our reading (?). | arch_nbc6331 | NBC 2020, BCBC 2024 and NBC(AE) 2023 Div. B 6.3.3.1.(2); Note A-6.3.3.1.(2) | rule | 55 |
| Meaning of "occupiable outdoor spaces" | areas "occupied for a duration of more than fifteen minutes", e.g. "main entries, balconies, patios, decks, green roofs and other public assembly areas"; sidewalks and driveways are excluded; distances "may need to be increased due to … prevailing winds, adjacent structures" | arch_nbc6331 | Note A-6.3.3.1.(2) | rule (explanatory note) | 85 |
| Outdoor air intake from a combustion vent | 3.0 m | arch_nbc6329 | Table 6.3.2.9 | rule | 85 |
| Ventilation is designed to ASHRAE 62.1 | ASHRAE 62.1-2016 ss. 6.2–6.5 apply. Section 5 and Table 5-1 are not referenced; NBC uses its own Table 6.3.2.9. | arch_nbc6329 | NBC 6.3.1.1.(2)–(3); referenced-documents table | rule | 80 |
| ASHRAE 62.1 Table 5-1 rows | not read (paywalled) ? | — | — | — | — |
| ASHRAE 62.1 App. B simple-method distances (US benchmark) | Class 3 "15 (5)" ft (m); Class 4 "30 (10)" | arch_ashrae621v | Addendum v to 62.1-2016, Table B2-1 (approved 2018) | standard (public addendum) | 60 |
| ASHRAE dilution factor for diesel generators (US benchmark) | "Diesel generators, diesel truck loading area or dock … 2000" | arch_ashrae621ag | Addendum ag to 62.1-2022, App. B (approved 30 Apr 2024); method only, no distance | standard (public addendum) | 55 |
| Generator room for life-safety emergency power, inside a building | 2 h fire separation; room "contains only the generating set and equipment related to the emergency power supply system". Whether this applies to IT standby sets ? | arch_nbc3628 | NBC, BCBC and NBC(AE) 3.6.2.8.(1) | rule | 85 |
| Outdoor engine to wall openings or combustible walls (US) | 5 ft (1.5 m) from openings in walls; 0 where the wall is rated at least 1 h or the enclosure is noncombustible and proven. Already in the register; confirmed. Whether the two exceptions are "and" or "or" ? (this reading gave "both conditions"; the register has "or"). | nfpa37clear (register) | NFPA 37 s. 4.1.4 per NC OSFM, 5 Aug 2019 | standard (reprint) | 60 |
| Generator exhaust distance under CSA C282 / B139 | not read (paywalled) ? | bcbc2024_3275 (register) | — | — | — |

## 2. Air-cooled chillers and dry coolers

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Wall and spacing clearances (one maker) | side to wall "6 ft (1.8 m)"; rear "6 ft (1.8 m)"; control-panel end "4 ft (1.2 m)"; top "no obstructions"; between units "10 ft (3 m)" | arch_yorkClear | YORK YVAA, Insights page, 10 Jun 2024 | maker claim | 50 |
| Penalty from crowding (one maker's test) | 2 units 6 ft apart: capacity −2.5%, power +3%; 3 or more in a row: −3.5% / +4%; behind a solid 12 ft wall 6 ft away: −4.5% / +6% | arch_yorkClear | same | maker claim | 45 |
| Evaporative units only (cooling towers, hybrids) | discharge "7.6 m from outdoor air intakes"; "3 m … from exterior doors and operable windows"; "3 m … from occupiable outdoor spaces"; 2.15 m above sidewalks | arch_nbc63215 | NBC 6.3.2.15.(5); Table 6.3.2.9 (7.6 m) | rule | 85 |
| Plant screening, Edmonton | "All mechanical equipment … must be concealed by screening … or by incorporating it within the building" | arch_ezb5120 | EZB 20001 s. 5.120 1.1.2 | rule | 85 |
| Noise measured where, Vancouver | "point of reception" is in a lane or street next to the receiving property, or outside the source's property line. Our reading: the by-law does not cover windows on the same lot (?). | bylaw6555 (register) | By-law 6555 s. 1 definitions | rule | 80 |
| Noise inside dwellings, Vancouver (one CD-1 example) | 24 h Leq: bedrooms 35 dBA; living, dining, recreation 40; kitchen, bathrooms, hallways 45; acoustic report required. The same clause appears in many district schedules (? not checked). | arch_vanCD1acoustic | CD-1 (615) By-law 11291, s. 7 (7 Jul 2015) | rule (site-specific) | 65 |
| Noise limits at the property line | Vancouver 6555 and Edmonton 14600 limits are already in the register | bylaw6555, bylaw14600, van6555zones | — | rule | — |

## 3. Fire separation between major occupancies; data-centre class

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| F-2 adjoining A-1, A-2, A-3, A-4, B, C, E | 2 h (C/F-2: see note 6) | arch_nbc3131 | NBC, BCBC and NBC(AE) Table 3.1.3.1 | rule | 90 |
| F-3 adjoining A-1 to A-4 and C | 1 h; F-3/E 2 h | arch_nbc3131 | same | rule | 90 |
| D adjoining A and C | 1 h; D/F-2 3 h | arch_nbc3131 | same | rule | 90 |
| Housing in an F-2 building | "Not more than one suite of residential occupancy shall be contained within a building classified as a Group F, Division 2 major occupancy." | arch_nbc3131 | 3.1.3.2.(2) (all three codes) | rule | 90 |
| F-1 (high hazard) | no F-1 in a building with Group A, B or C | arch_nbc3131 | 3.1.3.2.(1) | rule | 90 |
| Assembly above an industrial floor | Allowed; no prohibition found outside F-1. Each portion follows its own construction rules, and the floor between "shall be determined on the basis of … the lower major occupancy". | arch_nbc3227 | NBC 3.2.2.7.(1)–(2); 3.2.2.6 | rule | 80 |
| Small-area exemption does not cover F-2 | the 10% rule does not apply to "Group F, Division 1 or 2" | arch_nbc3227 | 3.2.2.8.(1) | rule | 85 |
| Dividing line between F-2 and F-3 | F-3 has combustible content "not more than 50 kg/m2 or 1 200 MJ/m2"; F-2 has more | arch_nbcDefF | NBC Div. A 1.4.1.2 definitions | rule | 90 |
| Data centre listed as an example? | No. The NBC examples list "Electrical substations" (F-2) and "Power plants" (F-3); no data centre. Class therefore depends on a fire-load calculation for the authority (our reading ?). | arch_nbcDefF | Note A-3.1.2.1.(1) | rule (explanatory note) | 70 |
| Canadian guidance on classifying a data centre | none found ? | — | — | — | — |
| US benchmark | IBC "does not explicitly assign data centers"; commonly B, F-1 or S-1; proposal G38-25 would make them F-1 | arch_iccDC2026 | ICC Building Safety Journal, K. McOsker, 10 Mar 2026 | design guide (US) | 50 |
| Fuel-fired appliances and service rooms | 1 h service room (3.6.2.1.(1)); equipment using liquid with flash point below 93.3 °C → 1 h (3.6.2.1.(5)); transformers and similar "shall not be located directly under a required exit" (3.6.2.2) | arch_nbc3628 | NBC 3.6.2 | rule | 85 |
| Electrical vault (where the CEC requires one) | 3 h, or 2 h if sprinklered, masonry or concrete; liquid-tight sill at least 100 mm | arch_nbc3628 | 3.6.2.7.(2), (8) | rule | 85 |

## 4. Pad-mount transformers

Skipped; BC Hydro ES54 F and the EPCOR CCG are already in the register. New items:
- Vancouver Childcare Design Guidelines s. 1.1(a): avoid or mitigate electrical substations and "transformers" next to childcare (see section 5).
- Edmonton s. 5.2 (BE zone): transformers "must be screened from view" (see section 2).

## 5. Sensitive uses near generators and plant

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Tier 0/1 engines near sensitive receptors | "No person may operate a Tier 0 or Tier 1 engine within 100 metres of a sensitive receptor." Emergency engines are not exempt from Part 11 (s. 11 exempts only Parts 3–6 and 9). | arch_mv1329 | s. 57, s. 11 | rule | 90 |
| "Sensitive receptor" | "a hospital, an elementary school, a day care facility or a community care facility". This corrects the register wording ("schools", missing community care). | arch_mv1329 | s. 1 definitions | rule | 90 |
| Edmonton childcare siting | not "in a building bay Abutting a Minor Industrial Use"; not "on a Site Abutting a Site in the IH Zone or a Major Utilities Use" | arch_ezb640 | EZB 20001 s. 6.40 1.1–1.2 | rule | 90 |
| Edmonton childcare play space | "a minimum of 2.0 m away from mechanical equipment and exhaust systems"; screened from loading spaces, mechanical equipment and exhaust | arch_ezb640 | s. 6.40 3.1–3.2 | rule | 90 |
| Edmonton use class for a data centre | not named. Candidates: "Minor Utility" (examples "switching centres, telecommunications centres") or Minor Industrial; "Major Utility" lists "cooling plants, … power generating stations" (?) | arch_ezbUses | EZB 20001 Use Definitions | rule | 50 |
| Vancouver childcare guideline | avoid or mitigate "commercial loading or service areas, major mechanical plants … building exhaust fans, electrical substations" (s. 1.1(a)); exhaust vents "should not be located adjacent to outdoor play areas" (s. 4.2(b)); rooftop play "free of … roof vents and/or other mechanical equipment" (s. 4.7(b)); play area gets at least 3 h direct sun at the winter solstice (s. 1.4(a)) | arch_vanChildcare | Childcare Design Guidelines (1993, am. Jan 2021) | government guide | 85 |
| BC or Alberta guidance on schools near diesel engines | none found beyond the above ? | — | — | — | — |

## 6. Loading docks and truck routes

| what | value | source id | where | kind | conf |
|---|---|---|---|---|---|
| Outdoor air intake from a truck loading dock | 7.6 m (bus parking 7.6; garbage 4.5; driveway or parking space 1.5) | arch_nbc6329 | Table 6.3.2.9 (NBC, BCBC, NBC(AE)) | rule | 90 |
| Edmonton BE zone | loading and service areas "must not be located between a building and a Street" and must be screened | arch_ezbLoad | EZB 20001 BE s. 5.8 | rule | 85 |
| Edmonton UF zone | loading "at the rear or sides of a principal building", screened | arch_ezbLoad | EZB 20001 UF s. 5.3 | rule | 85 |
| Edmonton CPTED | all developments: avoid "Entrapment spots and blind corners"; define pathways and access points. A CPTED assessment is required only for a Parkade or Body Rub Centre and may be required otherwise. | arch_ezb5110 | s. 5.110 1.1, 2.1–2.2 | rule | 85 |
| Edmonton main entrance | "Main entrances for public access to a building must be visible from a Street" | arch_ezbLoad | BE s. 5.3.1 | rule | 80 |
| Vancouver CPTED guidance on docks vs pedestrian entrances | not found ? | — | — | — | — |

## 7. Shadow

Vancouver: skipped; the equinox guideline is already in the register. The childcare solstice rule (3 h) is new; see section 5.

Edmonton: s. 7.140 subs. 9 is already in the register. New:
- Several zones (e.g. RL s. 4.7, UI s. 4.3.2) say towers or height variances "must mitigate microclimatic impacts" based on a Sun Shadow Impact Study.
- No fixed hours or area threshold were found (?).

## Gaps (?)

- ASHRAE 62.1 Table 5-1, CSA C282, CSA B139 and NFPA 37 full text: paywalled, not read.
- Whether NBC 6.3.3.1.(2) (3 m) applies to engine-generator exhaust: our reading only.
- Whether 3.6.2.8 applies to IT standby sets (not life-safety).
- No Canadian classification of a data centre (F-2 / F-3 / D) was found; Edmonton use class not found.
- Greenhouse classification not found.
- NFPA 37 exception: "and" or "or"?
- Noise rules for windows on the same lot (the by-laws measure at the property line).
- The Vancouver acoustic clause was seen in one CD-1 only.
- Vancouver CPTED and loading guidance not found.
- The Metro Vancouver bylaw URL could not be fetched from this session; it was read from the saved copy (25 Oct 2026).
