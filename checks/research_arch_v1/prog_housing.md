# Group D: clinic, housing, seniors' care, community kitchen (2 Nov 2026)

Per BRIEF_v2.md. Source ids → `prog_housing_sources.json` (`arch_hsg_*`). Ids already in the register or earlier files are reused, not repeated: arch_nbc3131, arch_nbc3227, arch_nbc6329, arch_mv1329, arch_adj_csaZ3172, arch_adj_csaZ32, arch_adj_bcFPR, arch_adj_abFoodCode, arch_adj_edm7140, arch_adj_edm14600, arch_adj_mvIndGuide, arch_adj_vanHousingInd, arch_adj_bccdcHBE, arch_sep_waEcologyHIA2025, arch_svc_vanPkg7, arch_svc_vanFoodStrategy2013, arch_svc_edmFresh, arch_zon_EdmZones, arch_zon_EdmDefs, van3575s2, van_zdb_i2, van_zdb_i3, van_zdb_i1c, van_zdb_fc2, neuConnect.

Labels: "?" = not confirmed. "our reading" = our interpretation. "our arithmetic" = derived here. NBC = NBC 2020; BC = BCBC 2024; VBBL = VBBL 2025; AB = NBC(AE) 2023. Code text read from local copies (data/raw/codes).

## Key findings first

- **D next to F-2: no major-occupancy separation.** Table 3.1.3.1 gives **D ↔ F-2 = "—"**; the 3 h is D ↔ F-1. NBC and AB add note (8): 1 h only where the D part is built under 3.2.2.57 (D, up to 12 storeys, sprinklered). BCBC has no note (8). The register's arch_nbc3131 already reads this way (F-2 vs D and E: none).
- **Outpatient clinic is Group D, not B-2.** B-2 "treatment occupancy" needs "overnight accommodation ... to facilitate the treatment"; the Note puts "dentistry or day procedures" in Group D, and "Medical offices" is a listed D example. So a day clinic beside the data hall needs **no** major-occupancy separation (NBC/AB 1 h if 3.2.2.57).
- **Housing cannot share a building with an F-2 data centre.** 3.1.3.2.(2): "Not more than one suite of residential occupancy shall be contained within a building classified as a Group F, Division 2 major occupancy" (all three codes). A separate building needs a **4 h firewall** (3.1.10.2.(1)) running "from the ground continuously through ... all storeys" (3.1.10.3.(1)). Our reading: apartments cannot sit on top of the data hall; they sit beside it, behind a 4 h wall, or detached.
- **Care home (B-3) next to F-2: 2 h.** Assisted living in BC is Group C (same one-suite limit as housing, our reading). Alberta builds continuing care homes "to a minimum B3 occupancy".
- **Care homes are "sensitive receptors"** in Metro Vancouver: no Tier 0/1 engine within 100 m (Bylaw 1329 s. 57). Clinics are not named (our reading).
- **Zoning is the binding constraint.** Vancouver data-centre districts allow Health Care Office (C, with caps) and catering kitchens, but no care facility and only caretaker housing (except FC-2 Mixed-Use Residential Building). Edmonton BE/IM/IH allow no housing or care; MU allows both but not a data centre. Co-location in Edmonton needs Direct Control or rezoning (our reading).
- **Heat (Vancouver new build, modelled caps):** housing TEDI ≤25–30 kWh/m²·yr (≤40 if on a low-carbon energy system); D/E ≤20 (≤30). No peak W/m² found for any program.
- **Supply temperatures:** NEU building side ≤70 °C supply winter; radiant 45 °C; DHW 60 °C; care-home taps ≤49 °C; dishwasher final rinse ≥71 °C at plate. Kitchens and DHW need lift above 45–60 °C (our reading).

---

## 1. Outpatient clinic / urgent and primary care

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Real example, North Vancouver UPCC | "approximately 604 square metres (6,500 square feet)"; 13 exam rooms, 1 treatment room, 3 stretcher bays; 14 FTE practitioners; 8 a.m.–10 p.m. Mon–Sat; second floor of 221 Esplanade W | arch_hsg_vchUpccNV | VCH information bulletin (undated, c. 2019) | government | 75 |
| Real example, South Surrey UPCC | "931-square-metre (10,016 square feet)"; "approximately 57,000 patient visits annually"; "48th in the province" | arch_hsg_bcUpccSurrey2026 | BC news release 10 Apr 2026 | government | 85 |
| Real example, Williams Lake UPCC | "490 square-metre (5,300 square feet)"; "more than 42,000 visits per year" | arch_hsg_bcUpccWL2025 | BC news release 28 Feb 2025 | government | 85 |
| Real example, Cowichan UPCC | "approximately 930 square metres (10,000 square feet)" (planned, "coming soon" at release) | arch_hsg_bcUpccCowichan2024 | BC news release 2 Jul 2024 | government | 80 |
| Typical size (BC UPCC) | 490–931 m² (four examples above); ≈61 visits per m² per year at Surrey (57,000 ÷ 931) and ≈86 at Williams Lake (42,000 ÷ 490) (our arithmetic) | above | — | our arithmetic | 60 |
| Size step: exam room | 12.0 m² net (Type 1.1); 14.0 dual access; 13.0 stretcher; 16.0 bariatric | arch_hsg_abGFNA2021 | Table 2, p. 7 | government guide (AB) | 85 |
| Grossing, community health centre | departmental net→gross 1.44 (Ambulatory Care, CHC); building factors: component 1.20–1.26, circulation 1.14–1.18, core mech/elec 1.05–1.07 ("compounded") | arch_hsg_abGFNA2021 | pp. 12–13 | government guide (AB) | 85 |
| Minimum sensible size | ? (smallest BC UPCC found 490 m²; no rule) | — | — | — | — |
| Heat, total energy | median site EUI "Urgent Care/Clinic/Other Outpatient" 1.02 GJ/m² (≈283 kWh/m², our arithmetic); "Medical Office" 0.98 GJ/m² (≈272 kWh/m²). **Total** energy, not heat | arch_hsg_nrcanMedian2018 | "Technical Reference: Canadian Energy Use Intensity by Property Type" (table "Canadian National Median Reference Values for All Portfolio Manager Property Types"), Aug 2018; issuer shown only by NRCan URL | government | 70 |
| Contrast: hospital | Canadian hospitals average 2.54 GJ/m² (hospital campuses), 2019 survey; all C&I buildings average ? (not in this table) | arch_hsg_scieu2019 | StatCan Daily table, 5 Aug 2022 | government statistics | 85 |
| Heat, Vancouver cap | Group D and E except office: TEDI ≤20 kWh/m²·yr (TEUI 120); on a low-carbon energy system ≤30 (TEUI 170); office occupancies ≤20 / ≤30. Which row a medical clinic takes: ? (our reading: D except office) | arch_hsg_vbblZEBP | VBBL 10.2.2.5, Tables A, C | rule | 75 |
| Peak kW/m² | ? | — | — | — | — |
| Supply temperature | building side ≤70 °C supply / ≤50 °C return (winter); fan coils 70/50; radiant floor 45/35; DHW 60 °C | neuConnect | s. 3.4 Table 1 p. 11; s. 6.2.3–6.2.4 pp. 20–21 | government guide | 80 |
| Code group | "Treatment occupancy (Group B, Division 2) means ... provision of treatment, and where overnight accommodation is available"; Note: B-2 treatment differs from "business and personal services occupancies like dentistry or day procedures"; "Medical offices" listed under Group D | arch_hsg_nbcOcc | Div. A 1.4.1.2; Note A-1.4.1.2.(1); Note A-3.1.2.1.(1) | rule | 90 |
| Same in BC, VBBL | identical B-2 definition | arch_hsg_nbcOcc | BCBC / VBBL Div. A 1.4.1.2 | rule | 90 |
| Separation from F-2 (D clinic) | "—" (none); NBC and AB note (8): 1 h where built under 3.2.2.57; BCBC: "-", no note | arch_hsg_nbc3131D | Table 3.1.3.1 | rule | 90 |
| Separation from F-2 (if B-2, overnight) | 2 h | arch_hsg_nbc3131D | Table 3.1.3.1 | rule | 90 |
| Health-care HVAC, power | HVAC in health care facilities → CSA Z317.2; essential electrical → CSA Z32 (both paywalled); cooling-tower discharge per Z317.2 (NBC 6.3.2.15.(6)) | arch_adj_csaZ3172; arch_adj_csaZ32 | scope pages | standard (scope only) | 50 |
| CSA Z8000 scope | "planning, design, and construction of HCFs", incl. "Facilities providing outpatient diagnosis and treatment services" | arch_hsg_sccZ8000 | SCC notice (Z8000:18 reaffirmation) | standard (scope only) | 60 |
| Zoning, Vancouver I-3 | Health Care Office C "only in sub-area A"; "not permitted at the ground floor, except for entrances" | van_zdb_i3 | 2.1; 2.2.6 | rule | 95 |
| Zoning, Vancouver I-2 | Health Care Office C; "general office and health care office combined must not exceed the greater of 235 m² or 33.3%" of gross floor area | van_zdb_i2 | 2.1; 3.1.1.1(b)(ii) | rule | 90 |
| Zoning, Vancouver I-1C | Health Care Office C; Health Enhancement Centre C | van_zdb_i1c | 2.1 | rule | 90 |
| Zoning, Vancouver FC-2 | Health Care Office C "only in sub-areas A and E"; "office uses ... not permitted at grade, except for entrances" (2.2.4; Health Care Office is an Office Use per Sec. 2, our reading) | van_zdb_fc2; van3575s2 | 2.1, 2.2.4 | rule | 85 |
| Zoning, Vancouver I-1, M-1, M-2, IC | ? (not re-read; earlier proxy 403) | — | — | — | — |
| Use definition, Vancouver | Health Care Office: professions providing service "related to the preservation or improvement of the physical, mental, or emotional health"; incl. physicians, nurses, nurse practitioners, etc. | van3575s2 | Sec. 2 (June 2026) | rule | 90 |
| Zoning, Edmonton | "Health Service" = "physical or mental health services on an out-patient basis" (medical offices, health clinics): BE O, "maximum Floor Area is 500 m2 per individual establishment"; MU O; IM, IH NP | arch_zon_EdmZones; arch_zon_EdmDefs | BE 2.9, 3.3.1; MU 2.8; 8.10 | rule | 90 |
| Edmonton fit | 500 m² cap is below 3 of 4 BC UPCC examples; variance possible under BE 3.18 (our reading) | arch_zon_EdmZones | BE 3.18 | our reading | 60 |
| Adjacency: air intakes | outdoor air intake ≥7.6 m from truck loading/dock; ≥1.5 m from street/parking (7.6 m from arterial); ≥4.5 m from garbage; ≥3.0 m from "Vent for combustion products" and kitchen exhaust; ≥7.6 m from evaporative heat rejection | arch_nbc6329 | NBC/BC/AB Table 6.3.2.9 | rule | 90 |
| Adjacency: generators | Metro Vancouver "sensitive receptor" = hospital, elementary school, day care, community care facility; clinic not named (our reading) | arch_mv1329 | s. 4, s. 57 | rule | 80 |
| Adjacency: street | ? (no clinic-specific siting rule found in BC or AB guidance read) | — | — | — | — |
| Social fit | UPCC "serves all North Shore residents"; North Vancouver Central PCN catchment ≈69,000; >33,000 unattached patients on the North Shore. No provincial catchment standard found | arch_hsg_vchUpccNV | bulletin | government | 60 |

## 2. Housing (rental apartments)

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Unit sizes (Vancouver, City-secured social housing) | studio 37 m²; 1-bed 46; 2-bed 66; 3-bed 84 (net); studio "can be reduced to 30 sq.m. (320 sq.ft). as per Zoning and Development Bylaw" | arch_hsg_vanHDTG2025 | HDTG v11, s. 5.2 pp. 11–12 | government guide | 85 |
| Heights | clear ceiling ≥2,438 mm; floor-to-floor 2,946 mm recommended | arch_hsg_vanHDTG2025 | s. 4.2(g), 5.3.2(b) | government guide | 85 |
| Real example, Vancouver | 508 Powell St: 114 homes, 7 storeys; homes on floors 3–7, commercial floor 2, resource centre ground floor (>7,500 sq ft) | arch_hsg_bc508Powell2025 | BC news release 15 Dec 2025 | government | 75 |
| Real example, Edmonton | ? (not read; Edmonton affordable housing report robots-blocked) | — | — | — | — |
| Minimum sensible size / steps | steps = unit types above; minimum building ? | — | — | — | — |
| Vancouver general minimum unit size | ? (Section 10, Apr 2025, has none; Council memo on unit sizes failed to load) | — | — | — | — |
| Heat, Vancouver cap | Group C ≤6 storeys TEDI ≤25, TEUI ≤110; >6 storeys TEDI ≤30, TEUI ≤120; alt. path TEDI ≤15, TEUI ≤100; on a Low Carbon Energy System: ≤6 storeys 25 / 110, >6 storeys 40 / 130 (kWh/m²·yr) | arch_hsg_vbblZEBP | VBBL 10.2.2.5, Tables A, B, C | rule | 90 |
| Heat, BC Part 3 Step Code | Group C: Step 2 TEDI 45; Step 3 30; Step 4 15 (kWh/m²·yr) | arch_hsg_stepMetrics2018 | Table 2, p. 5 | government report | 80 |
| Heat, Edmonton climate (benchmark) | BC Part 9 TEDI for 5000–5999 HDD: Step 3 ≤70, Step 4 ≤55, Step 5 ≤35; Edmonton HDD 5120 (Vancouver 2825: 30 / 20 / 15). Not binding in Alberta; Part 9 only | arch_hsg_bcbcStep9; arch_hsg_nbcOcc (App. C HDD) | BCBC Tables 9.36.6.3.-A, -D; NBC App. C | rule (benchmark) | 65 |
| DHW share | "DHW can make up 12% to 40% of total energy use" | arch_hsg_stepMetrics2018 | p. 9 | government report | 75 |
| Peak kW/m² | ? (Passive House cap "heating load ≤ 10 W/m²" is an efficiency ceiling, not typical: arch_r2_phiNonRes2013) | — | — | — | — |
| Supply temperature | City social housing "must be designed with low-temperature hydronic heating systems and connect to neighbourhood energy systems" where in NEU area; NEU: radiant 45/35, radiators 60/45, ≤70 °C winter; DHW 60 °C | arch_hsg_vanHDTG2025; neuConnect | HDTG 9.3.2(b); NEU s. 3.4, 6.2.3 | government guide | 80 |
| Code group | Group C ("Apartments") | arch_hsg_nbcOcc | Note A-3.1.2.1.(1) | rule | 95 |
| Separation from F-2 | 2 h, note (6) → 3.1.3.2.(2) | arch_nbc3131 | Table 3.1.3.1 | rule | 90 |
| One-suite limit | "Not more than one suite of residential occupancy shall be contained within a building classified as a Group F, Division 2 major occupancy" | arch_nbc3131 | 3.1.3.2.(2) (NBC, BC, AB) | rule | 95 |
| Firewall rating | firewall separating buildings with F-2 floor areas: "not less than 4 h" noncombustible (upper portion 2 h where it separates other than E/F-1/F-2); masonry or concrete | arch_hsg_nbcFirewall | 3.1.10.2.(1), (3) | rule | 90 |
| Firewall continuity | "shall extend from the ground continuously through, or adjacent to, all storeys" | arch_hsg_nbcFirewall | 3.1.10.3.(1) | rule | 90 |
| Massing consequence | apartments beside the data hall (4 h firewall) or detached; not stacked over it (our reading of 3.1.3.2.(2) + 3.1.10.3) | — | — | our reading | 75 |
| Zoning, Vancouver | I-3: Dwelling Unit only in sub-area B, caretaker only (2.2.3) → none with data (sub-area A); I-2: caretaker only, not in sub-areas A/B; I-1C: caretaker only (2.2.3); FC-2: Mixed-Use Residential Building C in sub-areas B, C1, C2, E, dwelling not at grade (2.2.4) | van_zdb_i3; van_zdb_i2; van_zdb_i1c; van_zdb_fc2 | as cited | rule | 95 |
| Zoning, Edmonton | Residential NP in BE, IM, IH (IM/IH: accessory temporary employee sleeping only, "not ... suitable for use as a permanent residence"); MU: Multi-unit Housing O, but no Minor Industrial (no data centre) | arch_zon_EdmZones; arch_hsg_edmMU | IM 3.2.2.1, IH 3.1.2.1; MU 2.2 | rule | 90 |
| Regional (Metro Van) | Industrial lands: "Residential uses are not intended" | arch_adj_mvIndGuide | Guideline 2.2.9 | gov. guide | 85 |
| Adjacency: generators | US benchmark: 50 h/engine/yr → 120–180 m stack to residences (Tier 4) | arch_sep_waEcologyHIA2025 | p. 8 | gov. study (US) | 60 |
| Adjacency: intakes | City social housing: "All air intakes to be located away from sources of fumes or dust"; rooftop units on sound isolation pads | arch_hsg_vanHDTG2025 | Div. 23 .5(b) | government guide | 75 |
| Adjacency: noise | Edmonton 65/50 dB(A) at a residential-zoned property line; on-lot housing not covered (earlier finding) | arch_adj_edm14600 | ss. 19–22 | rule | 80 |
| Adjacency: Edmonton risk | Sensitive Use within 1.5 km of IH or a Dangerous Goods storage site may need a risk assessment | arch_adj_edm7140 | 7.140 8.1 | rule | 80 |
| Social fit | no catchment or provision standard found (city targets exist, not read ?) | — | — | — | — |

## 3. Seniors' housing / care home

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| BC licence trigger | community care facility = care to "3 or more persons" unrelated; assisted living residence = "3 or more adults", registered not licensed (s. 26) | arch_hsg_bcCCALA | CCALA s. 1, 5, 26 | rule | 90 |
| BC bedroom (residential care) | usable floor ≥8 m² (no mobility aid); 11 m² (mobility aid); 14 m² for two; 18 m² two with aid; "each person in care has a separate bedroom" (sharing <5%) | arch_hsg_bcRCR | Res. Care Reg. ss. 25, 27 | rule | 90 |
| BC common space | dining ≥2 m²/person; lounge 2 m² (LTC 1.5 m² + recreation 1 m²); outdoor ≥1.5 m²/person; LTC: washbasin and toilet per bedroom | arch_hsg_bcRCR | ss. 32–34, 36 | rule | 90 |
| BC hot water | water accessible to persons in care not "heated to more than 49° Celsius" | arch_hsg_bcRCR | s. 17 | rule | 90 |
| BC room temperature | "safe and comfortable" (no figure) | arch_hsg_bcRCR | s. 16(1) | rule | 85 |
| BC site | site plan with property boundaries; no distance or siting rule | arch_hsg_bcRCR | Sch. B item 5 | rule | 85 |
| AB resident room | "minimum room size shall be 32.5 m2 (350 ft2)"; "Each resident room shall accommodate one resident" | arch_hsg_abCCDS2023 | CCDS (Oct 2023; published Feb 2024) s. B.I items 1–2, p. 18 | government standard | 90 |
| AB gross area | "Total building gross area should not be less than 81 m2 (871 ft2) per resident" | arch_hsg_abCCDS2023 | s. B note, p. 18 | government standard | 90 |
| AB household (size step) | "Individual households shall have up to a maximum of 14 residents" | arch_hsg_abCCDS2023 | s. C.II item 2, p. 25 | government standard | 90 |
| AB building cap | "building size should be limited to a maximum of 200 resident units" | arch_hsg_abCCDS2023 | s. F.I.2, p. 55 | government standard | 85 |
| AB outdoor | "minimum of 2 m2 per resident", partly covered | arch_hsg_abCCDS2023 | s. C.VIII item 2, p. 36 | government standard | 85 |
| AB cooling | living, activity and dining rooms "should have mechanical cooling" | arch_hsg_abCCDS2023 | s. C.IV item 12; C.VI item 12 | government standard | 80 |
| AB net room area | continuing care bedroom incl. WC 32.0 m² | arch_hsg_abGFNA2021 | Table 2, p. 9 | government guide | 80 |
| AB specialty bed areas | brain injury 20.7 m²; ventilation care 18.2–20.7 m² (small care home stream) | arch_hsg_abSmallCareSpec2023 | p. 10 | government guide | 70 |
| Minimum sensible size (AB) | one household: 14 × 81 m² ≈ 1,134 m² gross (our arithmetic) | arch_hsg_abCCDS2023 | — | our arithmetic | 60 |
| Minimum sensible size (BC) | ? (licence from 3 persons; no design guide found) | — | — | — | — |
| AB licence trigger | supportive living licence where "intended to house four or more adult residents"; types A (complex medical), B (various), C (hospice); application needs zoning, building, fire and public-health proof | arch_hsg_abCCOperator | alberta.ca page (2 Oct 2026) | government | 80 |
| AB accommodation standards | mandatory "Pursuant to the Continuing Care Regulation under the Continuing Care Act"; hot water "does not exceed the maximum safe level established in the Alberta Building Code" (no figure); power-failure contingency plan, no generator spec | arch_hsg_abSLAccomStd2024 | p. 2; Stds 4(1), 16(1), 21(1) | rule (incorporated) | 75 |
| Heat, total energy | median "Residential Care Facility" / "Senior Care Community" 1.04 GJ/m² (≈289 kWh/m², our arithmetic). Total energy | arch_hsg_nrcanMedian2018 | Aug 2018 | government | 70 |
| Heat, Vancouver cap | B-3 falls in "All other occupancies": GHGI 50 % below fossil reference, no TEDI cap (our reading) | arch_hsg_vbblZEBP | Table 10.2.2.5.A | rule | 70 |
| Peak kW/m² | ? | — | — | — | — |
| Supply temperature | taps ≤49 °C (BC); DHW stored/supplied 60 °C (NEU); space heat as housing | arch_hsg_bcRCR; neuConnect | s. 17; s. 6.2.4 | rule / gov. guide | 80 |
| Code group | NBC 2020: care without treatment = B-3 ("Assisted/supportive living facilities", "Nursing homes without treatment"); with treatment = B-2 | arch_hsg_nbcOcc | Note A-3.1.2.1.(1) | rule | 90 |
| BC guide (older) | assisted living "classified as a Group C (Residential) occupancy" (p. 12); residential care with "more than six persons in care" "Group B, Division 2"; small-facility threshold given as "six or fewer" (p. 12) and "between three and six" (pp. 18, 21 and later) (pre-2020 code labels, undated) | arch_hsg_bcFLS | pp. 12, 18, 21 | government guide | 55 |
| AB minimum class | "designed and constructed to a minimum B3 occupancy classification" | arch_hsg_abCCDS2023 | s. F.I.1, p. 55 | government standard | 85 |
| Separation from F-2 | B-3: 2 h; B-2: 2 h; C (assisted living, independent seniors): 2 h + one-suite limit | arch_hsg_nbc3131D; arch_nbc3131 | Table 3.1.3.1; 3.1.3.2.(2) | rule | 90 |
| Zoning, Vancouver | Community Care or Assisted Living Facility (Class A ≤6, Class B ≥7 persons) and Seniors Supportive or Independent Living Housing: **not listed** in I-2, I-3, I-1C, FC-2 (NP, our reading); FC-2 Mixed-Use Residential Building might hold seniors' apartments ? | van3575s2; van_zdb_* | Sec. 2; 2.1 of each schedule | rule | 80 |
| Zoning, Edmonton | "Health Care Facility" (incl. "continuing care facilities"): MU O; BE, IM, IH NP. Supportive Housing: MU O; must be in a listed building type (6.80) | arch_hsg_edmMU; arch_zon_EdmDefs | MU 2.2.5, 2.25; 6.80; 8.10 | rule | 90 |
| Adjacency: generators | no Tier 0/1 engine "within 100 metres of a sensitive receptor" (includes community care facility) | arch_mv1329 | s. 57 | rule | 90 |
| Adjacency: Edmonton risk | Sensitive Use includes populations needing help to evacuate | arch_adj_edm7140 | 8.20 | rule | 80 |
| Adjacency: passenger loading (Van) | Community Care Facility Class B: one passenger space for 15–119 beds | arch_svc_vanPkg7 | 7.2.2.1 | rule | 85 |
| Social fit (BC) | "58 beds per 1,000 (75+) population" now (77 a decade ago); subsidized assisted living 9 per 1,000 75+; 7,212 waiting (Mar 2025). Observed ratios, not a target | arch_hsg_bcOSA2025 | pp. 12, 18, 21 | government report | 80 |
| Social fit (AB) | ? (no planning ratio on the capital program page) | — | — | — | — |

## 4. Community or commercial kitchen

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Size | "varies greatly with intended use"; teaching ≈12 participants; >50 people regularly → commercial ranges and convection ovens. No m² given | arch_hsg_vanKitchenDG2018 | App. 2 s. 3.i, 3.iii–iv, 4.ii–iii | government guide | 75 |
| Minimum sensible size | ? | — | — | — | — |
| Equipment | high-heat sanitizing commercial dishwasher preferred; separate hand sink; 2- or 3-compartment sink; mop sink; grease interceptor accessible (e.g. parkade) | arch_hsg_vanKitchenDG2018 | 3.vii, 3.x, 4.v–vi | government guide | 75 |
| Hood class | Class 1 grease → Type I hood; Class 2 steam/heat → Type II; Class 3 domestic-level → domestic hood | arch_hsg_vanKitchenDG2018 | Subappendix 2b | government guide | 75 |
| Permit (Vancouver) | a VCH permit is what lets a kitchen serve the public; design "determines whether an appropriate VCH permit can be obtained"; permit types incl. "No Grease Laden Vapors" and exempt social-service agencies | arch_hsg_vanKitchenDG2018; arch_hsg_vanKitchenWork2017 | 2.2; guide (Nov 2017) | government guide | 75 |
| Plan approval (BC) | plans "approved by a health officer" before construction; premises separate from and without direct access to living quarters | arch_adj_bcFPR | FPR s. 3(1), 4(1)(d) | rule | 90 |
| BC health authority items | hand sinks separate; 3-compartment sink (<50 seats, manual); high-temp dishwasher "final rinse temperature of at least 71°C (160°F) at plate level"; low-temp chemical ≥38 °C; hot holding ≥60 °C; washrooms not opening into food rooms | arch_hsg_ihFoodPlans2026 | HP-FS-9042 pp. 2–4 (Interior Health, not VCH) | government guide | 75 |
| Plan approval (AB, Edmonton) | Food Regulation s. 16: no construction "unless plans and specifications" approved; in Edmonton "all plans are reviewed through the Planning & Development office" (p. 5); permit applied ≥14 days before opening | arch_hsg_ahsFoodEdm2019 | pp. 4–5 | government guide | 80 |
| AB siting | "minimum set back of 30 metres is recommended from potential sources of contamination" ("should"); living quarters by "complete partitioning and solid self-closing doors"; no food storage "in mechanical rooms" | arch_adj_abFoodCode | s. 2.1(b), 2.17(b), 2.9(d) | rule (incorporated) | 85 |
| Heat, total energy | median "Food Service" / "Restaurant" 3.17 GJ/m² (≈881 kWh/m², our arithmetic); total energy, includes cooking | arch_hsg_nrcanMedian2018 | Aug 2018 | government | 65 |
| Heat, make-up air | makeup air interlocked with exhaust; outdoor makeup air in winter must be tempered "to maintain the indoor design temperature" | arch_hsg_nbc6316 | NBC 6.3.2.8.(1)–(3) | rule | 85 |
| Supply temperature | DHW 60 °C (NEU); dishwasher rinse ≥71 °C at plate → above 45–60 °C data-centre heat, needs booster or heat pump (our reading) | neuConnect; arch_hsg_ihFoodPlans2026 | — | our reading | 65 |
| Peak kW/m² | ? | — | — | — | — |
| Code group | restaurant → A-2; production/catering kitchen without public: ? (no NBC example; F-3 or D, our reading) | arch_hsg_nbcOcc | Note A-3.1.2.1.(1) | rule / our reading | 60 |
| Separation from F-2 | A-2: 2 h; E: none; F-2/F-3: none (if classed industrial) | arch_hsg_nbc3131D | Table 3.1.3.1 | rule | 85 |
| Exhaust code | commercial cooking ventilation to NFPA 96 (paywalled; terminations ?) | arch_hsg_nbc6316 | NBC 6.3.1.6.(1) | rule (pointer) | 85 |
| Zoning, Vancouver | Catering Establishment ("preparation of food for consumption off premises"): I-2 O, I-3 C, I-1C O, FC-2 O. Restaurant caps: see zoning.md. Community kitchen inside a Community Centre / Social Service Centre (C): our reading | van3575s2; van_zdb_* | Sec. 2; 2.1 | rule | 85 |
| Zoning, Edmonton | "commercial kitchens" are a typical Custom Manufacturing use: BE O (inside an enclosed building, 3.6.1), IM O, MU O, IH NP. Food and Drink Service: BE O ≤500 m², MU O, IM/IH NP | arch_zon_EdmDefs; arch_zon_EdmZones; arch_hsg_edmMU | 8.10; BE 2.7, 3.6.1; IM 2.6 | rule | 90 |
| Adjacency: intakes | kitchen exhaust ≥3.0 m from any outdoor air intake (data-centre and other programs) | arch_nbc6329 | Table 6.3.2.9 | rule | 90 |
| Adjacency: inside | next to dining; no route through other program rooms; plan loading → cooler → service; away from quiet or scent-free programs; mixed-use: consider "exhaust scrubbing" | arch_hsg_vanKitchenDG2018 | 3.i, 4.iv | government guide | 75 |
| Social fit | Vancouver food access "within a reasonable walking, transit or cycling distance" (no figure); no kitchen provision standard found | arch_svc_vanFoodStrategy2013; arch_svc_edmFresh | Goal 3 | gov. strategy | 70 |

## 5. Shared: data-centre plant vs any of these programs

| from | rule | source id | conf. |
|---|---|---|---|
| truck dock / loading | intake ≥7.6 m | arch_nbc6329 | 90 |
| generator exhaust ("vent for combustion products") | intake ≥3.0 m; Metro Van s. 13: no entrainment into intakes (no distance) | arch_nbc6329; arch_mv1329 | 80 |
| cooling towers / hybrid coolers | intake ≥7.6 m; doors, windows, occupiable outdoor space ≥3 m; health care facilities: Z317.2 instead (6.3.2.15.(6)) | arch_nbc6329; arch_sep_nbc63215full | 85 |
| dry coolers, chillers, transformers | no code distance (earlier files) | — | — |
| F-2 floor below another occupancy | floor rating set by the lower occupancy (3.2.2.7.(2)); 10 % exemption not for F-2 | arch_nbc3227 | 85 |

## Gaps "?"

- Peak heat kW/m² for every program (no Canadian primary source; ASHRAE paywalled).
- Yearly heat (not total energy) for clinics, care homes and kitchens; Edmonton-specific heat benchmarks.
- Whether a Vancouver medical clinic takes the "Office" or "D except Office" TEDI row.
- Urgent care with overnight observation: B-2 or D? Ask the AHJ.
- Production kitchen classification (F-3, D or A-2).
- BC LTC design guidance (Hospital Act private hospitals; Ministry design standards): not read.
- Vancouver I-1, M-1, M-2, IC schedules; FC-2 seniors' housing inside a Mixed-Use Residential Building.
- Edmonton housing example and affordable-housing targets; Alberta care provision ratio.
- Community kitchen sizes (no m² in any Canadian guide read).
- NFPA 96 exhaust termination distances.

## Paywalled / blocked

- Paywalled: CSA Z8000:18 (scope via SCC only), CSA Z317.2:24, CSA Z32:21, NFPA 96, ASHRAE Handbook.
- Blocked (robots_disallowed): BC Hospital Act and Hospital Act Regulation 121/97 (bclaws); Edmonton Affordable Housing Strategy Progress Report.
- Failed to load (client error): Vancouver Council memo on dwelling unit sizes (24 Feb 2022); Vancouver Social Facility Technical Guidelines (1616 W 7th appendix F).
- Not fetched (tool provenance rule): CSA store page store.csastandards.org.

Check 2 applied (2 Nov 2026)

Check 3 applied (2 Nov 2026)
