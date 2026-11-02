# Public programs: research (Architecture mode, added programs, 2 Nov 2026)

Group C per BRIEF_v2.md. Source ids → `prog_public_sources.json` (`arch_pub_*`). Ids from earlier files are reused, not repeated. "?" = not confirmed. "our reading" = our interpretation. "our arithmetic" = derived here. Code = NBC 2020; BCBC 2024, NBC(AE) 2023 and VBBL 2025 rows checked identical for Table 3.1.3.1.

## Key findings first

- **Market (Group E) needs no major-occupancy separation from F-2.** Table 3.1.3.1 row F-2 shows "—" for E and F-3, in all four codes (arch_pub_nbc3131full). Suite separations (3.3.1.1, 1 h) still apply.
- **The parkade is not separation-free.** Table 3.1.3.1 shows "—" for F-3, but the table is major-occupancy only (note (1) points to Section 3.3): a storage garage needs **1.5 h** from other occupancies, incl. the data hall (NBC 3.3.5.6.(1)); a repair garage 2 h (3.3.5.5) (arch_pub_nbc3131full).
- **Assembly programs (winter garden, warming centre by day, gym, climbing) are A-2: 2 h from F-2** (arch_pub_nbcA3121, arch_pub_nbc3131full).
- **An overnight warming shelter is likely Group C (sleeping), and 3.1.3.2.(2) allows "not more than one suite of residential occupancy" in an F-2 building** (arch_pub_nbcDefs). Overnight shelter and data hall in one building is a problem (our reading; whether a shelter counts as one "suite" ?).
- **Heat figures are thin.** No primary source found for heat per m² or supply temperature for winter gardens, markets, gyms or climbing gyms. Only snow-melt (outdoor heated plaza) has numbers: fluid heater 630–950 W/m², mean fluid 55 °C (ashrae2015ch51).
- **EV hub is a heat source, not a heat user.** It is an electrical load: L2 240 V up to 30 A; DCFC 25–400 kW per port.
- **Edmonton has no EV charging use.** Vancouver folds EV charging into Parking Uses and Gasoline Station definitions.

---

## 1. Heated public space (winter garden, atrium, covered plaza, warming shelter)

### Size
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Typical size, Canadian example | ? (no government source with m² found) | — | — | — | — |
| Warming centre capacity (Vancouver) | each centre "up to sixteen guests"; staff "two Community Services staff plus one security guard" | arch_pub_vanWarm2021 | memo 23 Dec 2021 | government | 85 |
| Vancouver network | "up to 186 spaces"; "5-10 sites … on any given night" | arch_pub_vanCold2023 | email 21 Feb 2023 | government | 75 |
| Space per person (sleeping) | ≥3.5 m²/person; up to 9 m² wheelchair users | arch_ahsReceptionCentres | pp. 4, 6 | government guide | 80 |
| Min. warming centre (16 guests × 3.5 m²) | ≈56 m² sleeping area, plus washrooms ? | arch_pub_vanWarm2021 + arch_ahsReceptionCentres | — | our arithmetic | 50 |
| Occupant load, assembly | standing 0.40 m²/person; non-fixed seats 0.75; seats + tables 0.95; lounges 1.85 | arch_pub_nbc31171 | Table 3.1.17.1 | rule | 95 |
| Minimum plaza size | not set ("no dimensions") | arch_pub_vanPlazaDG | whole doc | government guide | 80 |
| Edmonton BE cap | Community Service (incl. Seasonal / Year-round Shelters) ≤500 m² per establishment (shelter exception conflict, see zoning.md) | arch_pub_edmZB, arch_edmZB20001_BE | BE 3.12.1 | rule | 75 |

### Heat
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Indoor temperature (reception / warming) | 19–22 °C | arch_ahsReceptionCentres | p. 4 | government guide | 80 |
| Winter garden / atrium heat kWh/m² or set point | ? (no primary source found) | — | — | — | — |
| Sun + wind shelter effect, outdoor | can make space "feel 10°C warmer" | arch_pub_edmWinter2016 | p. 19 | government guide | 75 |
| Snow-melt heated plaza, fluid heater capacity | "usually 630 to 950 W/m2, which includes back and edge losses" | ashrae2015ch51 | ch. 51, Fluid Heater | design guide (paywalled; J.B. library copy) | 75 |
| Snow-melt pipe output at 55 °C mean fluid | 630 W/m² at 300 mm spacing; 790 at 230; 950 at 150; 1260 at 100 (incl. 30 % back loss) | ashrae2015ch51 | Table 6 | design guide | 75 |
| Snow-melt on district return | "may be tied to the return piping of the district" | ashrae2015ch51 | Fluid Heater | design guide | 70 |
| Canadian snow-melt design data | none: tables are US cities only | ashrae2015ch51 | Tables 1, 3 | design guide | 80 |
| Supply temperature for an enclosed winter garden | ? | — | — | — | — |

### Code
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Enclosed winter garden / atrium / day warming centre | A-2 by analogy to "Community halls", "Exhibition halls" (our reading; examples are an explanatory Appendix note, not the rule) | arch_pub_nbcA3121 | Note A-3.1.2.1.(1) | rule (our reading) | 70 |
| Separation A-2 from F-2 | 2 h | arch_pub_nbc3131full | Table 3.1.3.1 | rule | 95 |
| Overnight shelter | Group C ("persons for whom sleeping accommodation is provided but who are not harboured for the purpose of receiving care or treatment and are not involuntarily detained"), our reading | arch_pub_nbcDefs | Div. A 1.4.1.2 | rule (our reading) | 65 |
| C in F-2 building | "Not more than one suite of residential occupancy" (VBBL 2025 adds exceptions: 3.1.3.4, 3.1.3.5, 11.2.5) | arch_pub_nbcDefs | 3.1.3.2.(2) | rule | 95 |
| C from F-2 | 2 h (note 6) | arch_pub_nbc3131full | Table 3.1.3.1 | rule | 95 |
| Multi-storey atrium | interconnected floor space rules, Arts. 3.2.8.2–3.2.8.8 (not re-read here ?) | arch_pub_nbc3131full | 3.1.3.1.(3) | rule | 60 |
| Open canopy over plaza = "building"? | NBC "Building means any structure used or intended for supporting or sheltering any use" → likely yes (our reading ?) | arch_pub_nbcDefs | Div. A 1.4.1.2 | rule (our reading) | 45 |

### Zoning
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver I-3, FC-2 | Hall C; Community Centre or Neighbourhood House C; Park or Playground C; Social Service Centre C | arch_pub_vanSched | s. 2.1 | rule | 90 |
| Vancouver I-2 | Community Centre C; Park or Playground C; Social Service Centre C; no Hall | arch_pub_vanSched | s. 2.1 | rule | 90 |
| Vancouver I-1C | Park or Playground C; Social Service Centre C; no Community Centre (zoning.md) | arch_pub_vanSched, zoning.md | s. 2.1 | rule | 85 |
| Vancouver Hall / Community Centre | listed but not defined | arch_pub_vanS2 | Sec. 2 | rule | 85 |
| Edmonton BE | Community Service O (≤500 m²); Special Event O | arch_pub_edmZB | BE 2.19, 2.20, 3.12.1 | rule | 85 |
| Edmonton IM | Special Event only | arch_pub_edmZB | IM 2.11 | rule | 90 |
| Edmonton IH | NP | arch_pub_edmZB | IH 2 | rule | 90 |
| Edmonton MU | Community Service, Park, Special Event O; but no Minor Industrial, so no data centre (our reading) | arch_pub_edmZB | MU 2 | rule | 80 |

### Adjacency
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Generator exhaust | must not cause "entrainment of its stack exhaust into surrounding building openings or air ventilation intakes" | arch_mv1329 | s. 13 | rule (Metro Van) | 85 |
| Generators vs cleaner-air space | away and downwind of intakes | arch_hcCleanerAirSpaces | — | government guide | 75 |
| Air intake from parking / truck dock | 1.5 m from parking space; 7.6 m from truck loading dock | arch_nbc6329 | Table 6.3.2.9 | rule | 90 |
| Cooling tower discharge | 3 m from "occupiable outdoor spaces"; 7.6 m from intakes | arch_nbc63215 | 6.3.2.15.(5) | rule | 90 |
| Plaza vs street | "preferably no more than 1.0 m above or below street level"; not screened from street | arch_pub_vanPlazaDG | s. 2.2 | government guide | 80 |
| Plaza weather protection | "some overhead weather protection" at waiting points and routes | arch_pub_vanPlazaDG | s. 4.4 | government guide | 80 |
| Edmonton winter orientation | glazing and "transitional indoor and outdoor spaces" on the south side; minimum shade on winter open spaces | arch_pub_edmWinter2016 | pp. 23, 30 | government guide | 75 |
| Reception site air intakes | "external air intakes should be identified and a plan … developed" | arch_adj_ahsRecCentre | p. 4 | government guide | 75 |
| Distance from dry coolers / transformers | ? | — | — | — | — |

### Social fit
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Who (Vancouver) | people experiencing homelessness, "welcoming to all" | arch_pub_vanCold2023 | email, P. Mochrie (title not printed ?) to Mayor and Council, 21 Feb 2023 | government | 75 |
| Activation (Vancouver) | "feels like -5 C or below" (2021); "-4 degrees Celsius" (2023) | arch_pub_vanWarm2021, arch_pub_vanCold2023 | — | government | 75 |
| Activation (Edmonton) | −20 °C with wind chill, 3+ days | arch_edmExtremeWeather | — | government | 80 |
| Catchment / provision standard | none found | — | — | — | — |

---

## 2. Covered winter market

### Size
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Alberta approved market minimum | "minimum of 10 vendors averaged" over the season | arch_pub_abFMguide2016 | Alberta Approved Farmers' Markets Program Guidelines, s. 8, p. 11 | government guide (program approval rules, not building or siting rules) | 85 |
| Alberta operating minimum | "2 consecutive hours per day and … at least 10 market days per season" | arch_pub_abFMguide2016 | p. 9 | government guide | 85 |
| Edmonton example (Bountiful) | "46,000 sq feet of indoor space" ≈ 4,270 m² (our arithmetic) | arch_pub_bountiful | announcement | operator claim | 40 |
| Stall size / size step | ? (not in Alberta guides read) | — | — | — | — |
| Occupant load, mercantile | 3.70 m²/person ground floor; 5.60 other storeys | arch_pub_nbc31171 | Table 3.1.17.1 | rule | 95 |
| Edmonton BE cap | Indoor Sales and Service ("indoor markets") ≤500 m² per establishment | arch_pub_edmZB | BE 3.7.1 | rule | 85 |
| Vancouver / Granville Island size | ? (only popular or leasing sources found) | — | — | — | — |

### Heat
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Set point, kWh/m², supply temperature | ? | — | — | — | — |

### Code
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Class | Group E ("Markets"); A-2 if run as exhibition hall for events | arch_pub_nbcA3121 | Note A-3.1.2.1.(1) | rule | 85 |
| Food court in a market | Group A definition includes "... or for the consumption of food or drink" → seating area may be A-2 (our reading) | arch_pub_nbcDefs | Div. A 1.4.1.2 | rule (our reading) | 60 |
| Separation E from F-2 | **none** ("—"); suite separation 1 h per 3.3.1.1 still applies, mercantile suites exempt if sprinklered and on public corridors | arch_pub_nbc3131full, arch_pub_nbcDefs | Table 3.1.3.1; 3.3.1.1 | rule | 90 |
| Food permit (AB) | AHS issues "a farmers' market permit, i.e., food permit" | arch_pub_abFMtrain2022 | p. 6 | government guide (superseded) | 70 |
| Food premises (BC) | plan approval by health officer; separate from incompatible activities | arch_adj_bcFPR | ss. 3(1), 4(1)(d) | rule | 85 |
| BC provincial market guideline | draft; final "intended to be published in the fall of 2026" | arch_pub_bcTFM2026 | page | government | 80 |
| Vancouver (VCH) | Market Manager required; applications "at least 14 days before the event" | arch_pub_vchTempEvents | page (hosted on travelclinic.vch.ca; content is VCH Health Protection) | government | 70 |

### Zoning
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver use | Farmers' Market = "open air or fully or partly covered market" for direct sale by producers | arch_pub_vanS2 | Sec. 2 | rule | 90 |
| Vancouver I-2, I-3, I-1C, FC-2 | Farmers' Market C | arch_pub_vanSched | s. 2.1 | rule | 90 |
| Vancouver condition | Director considers "compatibility with nearby sites, parking, traffic, noise, hours of operation, size of facility and pedestrian amenity" | arch_pub_vanSched | I-3 2.2.7 (I-2 2.2.5, I-1C 2.2.5, FC-2 2.2.6) | rule | 90 |
| Edmonton permanent indoor market | Indoor Sales and Service: BE O ≤500 m²; IM only existing at 1 Jan 2024 or "animal hospitals and shelters"; IH NP; MU O | arch_pub_edmZB | BE 2.10, 3.7.1; IM 2.7 | rule | 85 |
| Edmonton seasonal market | Special Event: BE and IM O; "maximum of 45 consecutive days"; variance possible | arch_pub_edmZB | 6.100.1, 6.100.8 | rule | 90 |
| Edmonton BE size variance | Development Planner "may consider a variance to the maximum total area" | arch_zon_EdmZones | BE 3.18 | rule | 80 |

### Adjacency
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Food site setback (AB) | "Generally a minimum set back of 30 metres is recommended from potential sources of contamination" ("should"); whether generators count: our reading ? | arch_adj_abFoodCode | s. 2.1(b) | rule (incorporated code) | 65 |
| Loading | shares a dock well (our reading); intake 7.6 m from truck dock | arch_nbc6329 | Table 6.3.2.9 | rule | 85 |
| Generator exhaust into openings | not permitted to entrain | arch_mv1329 | s. 13 | rule | 85 |

### Social fit
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver target | "from nine to 22 by 2020" (2013 target; date has passed); find "multi-purpose structures … for farmers markets"; Park Board sites "with electricity and water" | arch_pub_vanFoodMkts | p. 102, Actions 3.5, 3.7, 3.8 | government strategy | 85 |
| Vancouver access goal | healthy food "within a reasonable walking, transit or cycling distance" | arch_svc_vanFoodStrategy2013 | p. 45 | government strategy | 80 |
| Edmonton | "neighbourhood-scale food infrastructure"; no distance | arch_svc_edmFresh | Directions 4, 6 | government strategy | 70 |
| Alberta vendor rule | 80/20 Albertan vendors | arch_pub_abFMguide2016 | p. 11 | government guide | 85 |
| Catchment standard | none found | — | — | — | — |

---

## 3. Indoor recreation / climbing gym

### Size
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver size steps (zoning) | Fitness Centre Class 1 ≤200 m²; Class 2 >200 m² | arch_pub_vanS2 | Sec. 2 | rule | 90 |
| Vancouver fitness example | "even the largest, 4000sf at Trout Lake, is undersized" (≈372 m², our arithmetic) | arch_pub_vanPlayFac2018 | p. 142 | government | 75 |
| Bouldering wall height | max 4,500 mm (4,000 mm if standing on top) | arch_pub_en12572cat | catalogue overview (paraphrase, not standard text) | standard (European, not adopted in NBC/BCBC; benchmark outside Canada; paywalled) | 55 |
| Lead / speed wall height | ? (IFSC rules silent; equipment must comply with the IFSC Equipment Code: s. 2.1; not read; whether it sets dimensions ?) | arch_pub_ifsc2025 | s. 2.1 | rule (international sport body; competition rules, not gym design rules) | — |
| Canadian climbing gym m² | ? (only popular sources found) | — | — | — | — |
| Gym occupant load | no row for gymnasia; designer / AHJ ? | arch_pub_nbc31171 | Table 3.1.17.1 | rule | 80 |
| Vancouver floor-area exclusion | public fitness / recreation amenity: lesser of 20 % or 100 m² (I-3, I-2) | zoning.md (van_zdb_i3) | 4.1.2(d) | rule | 90 |

### Heat
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Recreation centre total energy | 1.07 GJ/m² (all energy; includes pools and rinks) | arch_statcanSCIEU2019 | Table 2 | government statistics | 70 |
| Space heating share, sector | 56.6 % (2020) | arch_nrcanTrends2020 | — | government statistics | 70 |
| Heat estimate | 1.07 GJ/m² × 0.566 ≈ 0.61 GJ ≈ 168 kWh/m²·yr; rough, mixes sector share with rec centres | — | — | our arithmetic | 30 |
| Gym set point, peak W/m², supply temperature | ? (UK Sport England guide blocked; Edmonton technical guideline mechanical section not reached) | — | — | — | — |

### Code
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Class | A-2 ("Gymnasia"); climbing gym by analogy (our reading; Appendix note examples are explanatory) | arch_pub_nbcA3121 | Note A-3.1.2.1.(1) | rule | 80 |
| Separation from F-2 | 2 h | arch_pub_nbc3131full | Table 3.1.3.1 | rule | 95 |
| Roof waiver | 3.2.2.17 allows waiving roof fire-resistance over gymnasiums under conditions (not re-read ?) | arch_pub_nbcA3121 | 3.2.2.17 | rule | 55 |

### Zoning
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver I-3, I-1C, FC-2 | Fitness Centre C | arch_pub_vanSched | s. 2.1 | rule | 90 |
| Vancouver I-2 | no Fitness Centre (NP) | arch_pub_vanSched | s. 2.1 | rule | 90 |
| Edmonton use | Minor Indoor Entertainment: "climbing facilities, fitness facilities, gyms" | arch_pub_edmZB | 8.10 | rule | 90 |
| Edmonton BE | Minor Indoor Entertainment O, no area cap found; Major ("sports or entertainment complexes") ≤500 m² | arch_pub_edmZB | BE 2.11, 2.12, 3.3.1 | rule | 85 |
| Edmonton IM / IH | NP | arch_pub_edmZB | IM 2, IH 2 | rule | 90 |
| Edmonton MU | Minor and Major Indoor Entertainment O | arch_pub_edmZB | MU 2.12, 2.13 | rule | 85 |

### Adjacency
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Intakes vs generator exhaust | 3 m from combustion vents; no entrainment | arch_nbc6331, arch_mv1329 | 6.3.3.1.(2); s. 13 | rule | 85 |
| Boulder impact area | "must be kept clear from obstructions/objects" | arch_pub_ifsc2025 | s. 1.8 | rule (international sport body; competition rules) | 70 |
| Anything program-specific | none found | — | — | — | — |

### Social fit
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Edmonton | indoor recreation "within 5 kilometres of their residence" | arch_svc_edmRecApproach2018 | p. 34 | government strategy | 80 |
| Vancouver | 24 community centres; per-capita falls 0.4 → 0.3 per 10,000 by 2041 if none added; "Gymnasium … at a premium" | arch_pub_vanPlayFac2018 | pp. 111, 120, 143 | government | 75 |
| Vancouver walk rings | 400 m / 800 m / 1.2 km (map only, not a standard) | arch_pub_vanPlayFac2018 | p. 121 | government | 60 |

---

## 4. EV charging hub

### Size and units
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Stall (90°) | 2.50 × 5.50 m (2.70 m wide beside wall); aisle 6.6 m | arch_pub_vanStall | Fig. 1, s. 2.3 | government guide (sizes are "prescribed in Section 4 of the Parking By-law": the by-law is the rule) | 90 |
| Area per stall, double-loaded | 2.5 × (5.5 + 3.3) ≈ 22 m² | arch_pub_vanStall | — | our arithmetic | 70 |
| Van-accessible stall | 5.5 × 3.5 m, 2.3 m clear, shared aisle 1.5 m | arch_pub_vanStall | s. 2.2 | government guide | 85 |
| Level 2 port | "240 volts and up to 30 amps" → ≤7.2 kW | arch_pub_nrcanEV2024 | glossary | government study / our arithmetic | 80 |
| DCFC port | "output voltage of 50-1000V and typically … between 25 and 400kW" | arch_pub_vanEV2021 | App. A s. 2 | government (draft by-law in a Council report; enacted text may differ) | 80 |
| DCFC average power | 125 kW per port (2025) → 300 kW (2040) | arch_pub_nrcanEV2024 | cost section | government study | 75 |
| Fleet DCFC | "at least 250 kW" | arch_pub_nrcanEV2024 | — | government study | 70 |
| Minimum hub size | ? | — | — | — | — |

### Heat and power
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Heat demand | none: electrical load; charger waste heat not quantified ? | — | — | our reading | 60 |
| Hub peak (example 8 × 150 kW) | 1.2 MW | — | — | our arithmetic (illustrative only) | 40 |
| Grid | "Collaborate with utility partners (like EPCOR) to identify sites where electrical capacity upgrades are minimized" | arch_pub_edmEVstudy | priorities | government | 75 |

### Code
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Parkade class | F-3 "Storage garages, including open air parking garages" | arch_pub_nbcA3121 | Note A-3.1.2.1.(1) | rule | 90 |
| Separation F-3 from F-2 | major occupancy: none ("—", Table 3.1.3.1); but storage garage: **1.5 h** "from other occupancies" (3.3.5.6.(1)); repair garage 2 h (3.3.5.5) | arch_pub_nbc3131full | Table 3.1.3.1; 3.3.5.6.(1); 3.3.5.5 | rule | 90 |
| Garage to stair/elevator serving upper occupancies | "through a vestibule" | arch_pub_nbcDefs | 3.3.5.4.(1) | rule | 90 |
| Garage ventilation | per 6.3.1 and 6.9.1.2 | arch_pub_nbcDefs | 3.3.5.4.(4) | rule | 90 |
| EV wiring | CEC Section 86 (CSA C22.1, paywalled; not read ?) | — | — | — | — |
| EV fire in parkades | no NBC/NFC clause found ("electric vehicle" absent from NBC 2020, BCBC 2024, NBC(AE) 2023, NFC texts) | — (text search of local code texts, data/raw/codes) | text search | rule (negative) | 70 |
| Vancouver EV charging (building by-law) | VBBL 2025 Div. B Section 10.3: electrical installations incl. service capacity, circuits and receptacles "shall meet the requirements of the 'Electrical Safety Regulation'" (10.3.1.1.(1)); where an EV energy management system is used, the CBO "may specify a minimum performance standard" (10.3.1.1.(2)) | — (local VBBL 2025 text, data/raw/codes/vbbl2025_v1.txt; no register id yet ?) | 10.3.1.1 | rule | 85 |
| Vancouver EV-ready (non-dwelling) | energized outlet in ≥45 % of spaces; ≥5 % or 2 spaces Level 2 without energy management; DCFC may substitute | arch_pub_vanEV2021 | draft 4.14.2 | government (draft; enacted text ?) | 70 |

### Zoning
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver use | Parking Area / Parking Garage "may include the retail sale of electricity for the purpose of charging motor vehicles" | arch_pub_vanS2 | Sec. 2 | rule | 90 |
| Vancouver I-2, I-3, I-1C, FC-2 | Parking Uses C | arch_pub_vanSched | s. 2.1 | rule | 90 |
| Vancouver I-2 | Gasoline Station - Full Serve O (not sub-areas A, B); Split Island C; Cardlock Fuel Station C | arch_pub_vanSched | s. 2.1 | rule | 90 |
| Vancouver I-3 | Gasoline Station only sub-area B (C); data centre only sub-area A → not on the same site (our reading) | arch_pub_vanSched, zoning.md | s. 2.1 | rule | 85 |
| Edmonton use | no EV use; nearest: Vehicle Support Service ("fuelling") or accessory Parking Facility (our reading); Planner may deem → Discretionary | arch_pub_edmZB, arch_zon_Edm720 | 8.10; 7.20 3.3.2 | rule (our reading) | 60 |
| Edmonton BE / IM | Vehicle Support Service O | arch_pub_edmZB | BE 2.17, IM 2.10 | rule | 90 |
| Edmonton IH | NP | arch_pub_edmZB | IH 2 | rule | 90 |
| Edmonton Standalone Parking | listed in CG and CB only | arch_pub_edmZB | 2.100, 2.110 | rule | 80 |

### Adjacency
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Intake from parking space | 1.5 m; garage entry 4.5 m | arch_nbc6329 | Table 6.3.2.9 | rule | 90 |
| Edmonton fuel pump islands | 6.0 m from abutting Sites, Streets, Alleys; 7.5 m facing residential; applying these to EV chargers is our reading ? | arch_pub_edmZB | 6.110.5.1, 6.110.9.1 | rule (our reading ?) | 50 |
| Edmonton location criteria | 6.110.1 corner / 1 ha rules "do not apply … in an industrial Zone" | arch_pub_edmZB | 6.110.2 | rule | 90 |
| Distance from fuel tanks, transformers, ESS | ? (ESS rules: arch_sep_abStandataESS) | arch_sep_abStandataESS | CEC 64-926 | government guide | 50 |

### Social fit
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Canada provision ratio | 2030: "one public port (L2 and DCFC) for every 21 EVs"; 1.2–1.3 kW per EV | arch_pub_nrcanEV2024 | Tables 7, 10 | government study | 75 |
| Edmonton need | to 2035 ~270–470 DCFC, ~5,300–5,600 L2 ports | arch_pub_edmEVstudy | table | government | 70 |
| Edmonton priority | "areas where home charging access is inherently low (dense MURBs)"; "high-traffic commercial corridors and nodes" | arch_pub_edmEVstudy | priorities | government | 75 |
| Vancouver equity | lower-income drivers benefit; "electricity is about 10-15% of the cost of gasoline" | arch_pub_vanEV2021 | Equity | government | 70 |
| Catchment distance | none found | — | — | — | — |

---

## Gaps (?)
- Heat (kWh/m², peak W/m², set point, supply temperature) for winter garden, market, gym, climbing gym: none found.
- Canadian examples with m² for winter gardens, climbing gyms, Vancouver indoor markets (only news or leasing pages).
- Whether an overnight shelter is one "suite" under 3.1.3.2.(2).
- Lead / speed wall heights (IFSC Equipment Code not read); EN 12572-1/-2 full text.
- CEC Section 86 (EV); enacted Vancouver Parking By-law 4.14 text.
- Vancouver I-1, I-4, IC, M-1, M-2 schedules not re-read (proxy 403 earlier; status as in zoning.md).
- Edmonton Bylaw 20001 amendments after 1 Jan 2024; MU area caps not checked.
- Edmonton Winter Design Guidelines: only the "draft"-named file read; Council approval not confirmed from a primary source.

## Paywalled / blocked
- CSA C22.1 Section 86 (paywalled; J.B. copy covers Section 64 only).
- EN 12572-1/-2 (paywalled; catalogue summary only).
- ASHRAE Handbook ch. 51 (paywalled; used J.B.'s UBC library copy, id ashrae2015ch51).
- Sport England Affordable Sports Halls (redirect to S3 not allowed; not fetched).
- City of Edmonton Consultant Manual Vol. 2 Technical Guidelines v05 (2021): text cut at s. 4.9.4; direct download refused by proxy (www.edmonton.ca).
- Tampere University repository (trepo.tuni.fi): access denied.
- UK DfE GDB Annex 2F: withdrawn, redirected.

Check 2 applied (2 Nov 2026)

Check 3 applied (2 Nov 2026)
