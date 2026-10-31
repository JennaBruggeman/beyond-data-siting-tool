# Adjacency: rules outside the building code (licensing, health, planning, standards)

Research 31 Oct 2026 per ADJ_BRIEF.md. Scope: rules **outside** the building and fire codes that limit where each program may sit relative to a data centre and to each other, BC/Vancouver and Alberta/Edmonton. Source ids → `adj_programs_sources.json` (`arch_adj_*`); ids from earlier files are reused, not repeated.

Not repeated here (already in zoning.md, separations.md, refuge_publicfloor.md, spatial_rules.md): Metro Vancouver Bylaw 1329 s. 57 (Tier 0/1 engines, 100 m from hospital, elementary school, day care, community care); Edmonton s. 6.40 childcare siting (2.0 m from mechanical equipment and exhaust; not on a Site abutting IH or a Major Utility); Vancouver Childcare Design Guidelines s. 1.1(a), 1.4(a), 4.2(b), 4.7(b); Vancouver noise by-law 6555 "point of reception"; NBC 6.3.2.15 cooling-tower distances and 6.3.2.15.(6) → CSA Z317.2; Health Canada cleaner-air spaces (generators downwind of intakes); zoning tables for each program.

Labels: "?" = not confirmed. "our reading" = our interpretation, not the source's words. Code labels: NBC = NBC 2020; BC = BCBC 2024; VBBL = VBBL 2025; AB = NBC(AE) 2023. "—" in the codes column = not a building code.

## Key findings first

- **No childcare, pool or food regulation in either province bars siting next to a data centre or inside an industrial building.** All work through general duties ("healthy and safe environment", "free from hazards") plus plan approval by the health authority. The hard siting rules stay where earlier files found them (Edmonton s. 6.40, Metro Vancouver 1329).
- **Alberta food code recommends 30 m** from "potential sources of contamination" and "incompatible processing facilities" (Food Retail and Foodservices Code s. 2.1(b), "should" wording, incorporated in the Food Regulation). Whether a data centre's generators count is **our reading ?**.
- **Alberta pool rules live in the building code** (NBC(AE) Part 7, Alberta only): chemical storage not near heating equipment and no direct public access; chlorine-gas room at ground level, outside door, 1 h, exhaust ≥3 m from any air intake and intake not below it. No such clauses in NBC, BCBC or VBBL.
- **Edmonton risk assessment:** a Sensitive Use (incl. "critical infrastructure", "large gatherings of people", populations needing help to evacuate) within 1.5 km of an IH site or a site "storing ... Dangerous Goods" may need one (Bylaw 20001 s. 7.140 subs. 8). A data centre's diesel store could trigger 8.1.1 itself (our reading ?).
- **Greenhouse status differs by code.** NBC 2020: a greenhouse is G-3, and a G-3 building "shall not contain" A-1, A-3 or B occupancies; 1 h to A-2/A-4/C, 2 h to F-1. BCBC: "farm building" must be "located on land devoted to the practice of farming", so a greenhouse on a data-centre site is likely not a farm building and falls under Part 3 (our reading). AB has no Group G at all.
- **NFPA 75 (2024) 6.1.3.2:** rating "commensurate with the exposure but not less than 1 hour" (quoted in NFPA's own public-input report). J.B.'s 2 h is not confirmed; NFPA 75 applies on "a documented risk assessment" basis.

## (a) Rules table

### 1. Childcare (licensing and health)

| rule | applies to | requirement | clause | codes | differences / source |
|---|---|---|---|---|---|
| General duty | childcare premises | "A licensee must ensure that a healthy and safe environment is provided at all times" | BC CCLR s. 13(1) | — | arch_adj_bcCCLR. No location or industrial-adjacency clause in the regulation (read to end, incl. schedules) |
| Hazards | childcare ↔ any hazardous object or substance | children must not have access to "any object or substance that may be hazardous to the health or safety of a child" | BC CCLR s. 17 | — | arch_adj_bcCCLR. Our reading: plant rooms, battery rooms, fuel and chemicals must be out of reach, not distant |
| Outdoor play size and safety | childcare play area | ≥6 m² per child; enclosed so children are "free of harm"; shared play area only if "no increase in the risk to the health and safety of children" | BC CCLR s. 16(1)(a), 16(3)(a), 16(2.1)(b) | — | arch_adj_bcCCLR |
| Site plan must show hazards | childcare licence application | site plan shows "any major physical features that may affect the safety of children, including roads and bodies of water" | BC CCLR Sch. B s. 6 | — | arch_adj_bcCCLR. Our reading: a data centre's loading dock, fuel fill and yard would be shown and judged by the licensing officer |
| Sleeping area | childcare internal | "separate sleeping area located away from any activity area" | BC CCLR s. 15(3) | — | arch_adj_bcCCLR |
| Other adults on premises | childcare ↔ shared building | no person over 12 "ordinarily present on the premises" without a criminal record check | BC CCLR s. 20(1) | — | arch_adj_bcCCLR. Our reading: data-centre staff must not route through childcare space |
| Exits | childcare | "emergency exits that meet the requirements of the British Columbia Building Code" | BC CCLR s. 22(1)(a)(i) | — | arch_adj_bcCCLR |
| Traffic | childcare siting (Vancouver) | "sited away from high traffic arterials" | Childcare Design Guidelines 1.1(b) | — | arch_adj_vanChildcareDG |
| Above / below grade | childcare level (Vancouver) | above grade raises evacuation concerns; below grade "may be unacceptable" | Childcare Design Guidelines 1.2 | — | arch_adj_vanChildcareDG |
| Drop-off | childcare ↔ vehicle area (Vancouver) | drop-off "in no case be more than 100 m from the entry"; "should not require children to cross the drive aisle" | Childcare Design Guidelines 1.6(d), 1.6(f) | — | arch_adj_vanChildcareDG |
| Play area level | childcare indoor ↔ outdoor (Vancouver) | outdoor at same level ±0.5 m and contiguous | Childcare Design Guidelines 4.1(c) | — | arch_adj_vanChildcareDG |
| Play area air and noise | play area ↔ plant, parking, traffic (Vancouver) | protected from "dirt, wind, pollution, noise, fumes and noxious smells"; "acoustically buffered from traffic and parking" | Childcare Design Guidelines 4.2(a) | — | arch_adj_vanChildcareDG |
| Uses beside or above play area | play area ↔ any adjacent use (Vancouver) | safety and security "must be addressed when there are adjacent uses ... directly beside or above it" | Childcare Design Guidelines 4.6(a) | — | arch_adj_vanChildcareDG |
| Rooftop play | play area ↔ rooftop plant (Vancouver) | locate to reduce noise "from rooftop equipment disturbing the play space"; wind test model may be required | Childcare Design Guidelines 4.7(a), 4.7(c) | — | arch_adj_vanChildcareDG |
| Air intakes | childcare HVAC (Vancouver, City-delivered) | "All air intakes to be located away from sources of fumes or dust"; own HVAC and mechanical cooling; ventilation to ASHRAE 62; permanent CO2 monitoring | Childcare Technical Guidelines 3.15 | — | arch_adj_vanChildcareTech (Jan 2019; written for City-delivered facilities) |
| Party wall acoustics | childcare ↔ neighbour | STC 65 at party walls; 55 dB(A) and 45 dB(A) Leq24 limits (which applies to what: ? — wording as fetched) | Childcare Technical Guidelines 3.6 | — | arch_adj_vanChildcareTech |
| Separation from public and lifts | childcare ↔ public floor, lift lobby | public must not cross a secure childcare space to exit; lift lobby "should not open directly into any secure childcare space" | Childcare Technical Guidelines 2.11, 3.12 | — | arch_adj_vanChildcareTech |
| Balconies | play area ↔ upper floors (housing) | no balconies immediately above outdoor play | Childcare Technical Guidelines 2.2 | — | arch_adj_vanChildcareTech |
| Pool fence | play area ↔ pool | fence 1.82 m "at any pool, pond or body of water" (1.22 m otherwise) | Childcare Technical Guidelines 3.5 | — | arch_adj_vanChildcareTech |
| Emergency lighting | childcare | "powered by the generator and not be powered by separate battery packs" | Childcare Technical Guidelines 3.16 | — | arch_adj_vanChildcareTech. Our reading: a shared site generator is expected, not avoided |
| Approvals first (AB) | childcare licence | evidence of compliance with zoning, Safety Codes Act, Public Health Act and Institutions Regulation before licensing | AB facility-based handbook, Steps 5 and 8 | — | arch_adj_abCCHandbook (2021) |
| Outdoor play (AB) | childcare play space | "on, adjacent to, or within easy and safe walking distance"; ≥50 % of capacity; 2 m²/infant, 4.5 m²/child 19 months+; "securely enclosed on all sides" | AB handbook (Regulation ss. not cited) | — | arch_adj_abCCHandbook. Differs from BC 6 m²/child; AB allows off-site play |
| Engines and intakes (AB) | childcare ↔ combustion engines | "If there are combustion engines outside, make sure they are kept away from the building's air intakes" (no distance) | AHS childcare guide pp. 8–9 | — | arch_adj_ahsChildcareHS (Apr 2025) |
| Mechanical rooms (AB) | childcare ↔ plant rooms | children "cannot access any mechanical equipment rooms" | AHS childcare guide p. 23 | — | arch_adj_ahsChildcareHS |

### 2. Pools

| rule | applies to | requirement | clause | codes | differences / source |
|---|---|---|---|---|---|
| Barrier | pool ↔ rest of building/site (BC) | "a fence or other barrier with controlled access" around pool and walkways | BC Pool Reg s. 7(1) | — | arch_adj_bcPoolReg. No siting, equipment-room or ventilation clause in the regulation |
| Chemicals | pool chemical store (BC) | "chemicals are stored in a safe manner and location" | BC Pool Reg s. 11(2)(h) | — | arch_adj_bcPoolReg |
| No direct access from buildings | pool ↔ housing, other rooms (BC) | "Direct access to the pool should be prevented from all buildings including rental units" | BC Pool Design Guidelines 3.1 | — | arch_adj_bcPoolDesign (v3, Apr 2025) |
| Spectators | pool ↔ public floor | spectators "should not have direct access to the pool area" (BC); "physical separation ... with separate entrances to each" (AB) | BC Guidelines 3.8; AB 7.2.2.2.(1) | AB only | arch_adj_bcPoolDesign; arch_adj_nbcAE72 |
| Equipment room use | pool plant room ↔ data-centre plant | "Only pool-related equipment should be stored in Equipment Rooms" | BC Guidelines 9.8 | — | arch_adj_bcPoolDesign. Our reading: no shared plant room with data-centre equipment |
| Chemical rooms → fire code | pool chemical store | "The BC Fire Code details chemical storage room design requirements" | BC Guidelines 9.9 | — (points to BCFC) | arch_adj_bcPoolDesign |
| Pool hall air | pool hall | 4–8 air changes/h (ASHRAE Handbook 2023, cited); RH 50–60 % | BC Guidelines 6.3 | — | arch_adj_bcPoolDesign |
| Equipment room access (AB) | pool plant room | "reasonably accessible from the swimming pool enclosure, using doors that are locked to unauthorized persons"; "Additional outside access for public swimming pools" | 7.2.3.38.(1)–(2) | AB only | arch_adj_nbcAE72 |
| Chemical store (AB) | pool chemicals ↔ heating plant, public | "shall not be near heating equipment nor have direct access to areas that are accessible to the public" | 7.2.3.39.(2) | AB only | arch_adj_nbcAE72. Our reading: keep away from any heat-pump / heat-exchanger room fed by the data centre ? |
| Chlorine-gas room (AB) | chlorine room ↔ building, intakes | 1 h gas-tight enclosure; "at ground level with access to the outside through outwardly opening doors"; 1 air change/min; exhaust "shall be 3 m" from a building air intake, intake "not be below the level of the chlorine room exhaust" | 7.2.3.45.(1)(a), (c), (d), (g), (r) | AB only | arch_adj_nbcAE72; STANDATA 19-BCI-008: no doors or operable windows into the building (arch_adj_abStandataCl) |
| Pool air (AB) | pool premises | ventilation "must be able to maintain safe air quality" and "protect against the buildup of chlorine gas" | AB Pool Standards s. 2.4 | — | arch_adj_abPoolStd (2014, archived) |

### 3. Food (café, community kitchen)

| rule | applies to | requirement | clause | codes | differences / source |
|---|---|---|---|---|---|
| Plan approval (BC) | any food premises | plans "approved by a health officer" before construction | BC FPR s. 3(1) | — | arch_adj_bcFPR |
| Separation (BC) | kitchen ↔ housing, incompatible uses | "separate from and without direct access to (i) living quarters, or (ii) any area in which activities are carried out that are incompatible with the safe handling of food" | BC FPR s. 4(1)(d) | — | arch_adj_bcFPR. No external siting rule |
| Siting (AB) | food establishment ↔ contamination sources | "Generally a minimum set back of 30 metres is recommended from potential sources of contamination"; "Set reasonably apart from ... incompatible processing facilities, and any offensive trades"; "No land use conflicts ... with adjacent sites" | AB Food Retail and Foodservices Code s. 2.1(a)–(b) | — | arch_adj_abFoodCode. "should" / "recommended" wording; whether generators or cooling towers count: our reading ? |
| Living quarters (AB) | kitchen ↔ housing | separated "by complete partitioning and solid self-closing doors" | AB Food Code s. 2.17(b) | — | arch_adj_abFoodCode. BC: no direct access at all; AB: self-closing doors allowed |
| Mechanical rooms (AB) | food storage ↔ plant | food storage not "in mechanical rooms" | AB Food Code s. 2.9(d) | — | arch_adj_abFoodCode |

### 4. Housing near industrial

| rule | applies to | requirement | clause | codes | differences / source |
|---|---|---|---|---|---|
| Regional exclusion (Metro Van) | housing ↔ Industrial land | Industrial lands: "Residential uses are not intended"; Employment lands: no residential except caretaker units and limited residential within 200 m of rapid transit | Metro 2050 Guideline 2.2.9 c) iii), d) v) | — | arch_adj_mvIndGuide (Nov 2023) |
| Interface | industrial ↔ residential, day cares, schools, hospitals | "Industrial land edges and buffers"; "acoustical walls, or a physical separation" (no distance) | Metro 2050 Guideline 2.2.9 c) ix); App. A | — | arch_adj_mvIndGuide |
| Vancouver housing on employment land | housing above industrial | only Employment sites, ≥50 % within 200 m of rapid transit, in an Urban Centre/FTDA; Industrial-designated "not eligible"; edge sites "do not support" | RTS 16078 memo, Table 1 | — | arch_adj_vanHousingInd (17 Mar 2025, emerging framework, not adopted). Case study: separate ventilation for industrial and residential |
| Health authority principle (BC) | housing ↔ industrial sites | "Site and zone housing developments to minimize exposure to environmental hazards"; noise near "industrial sites" (no distance) | BCCDC toolkit, Housing Principle 4, p. 52 | — | arch_adj_bccdcHBE (2018) |
| Risk assessment (Edmonton) | Sensitive Use ↔ IH or Dangerous Goods site | may be required within 500 m of rail, high-pressure pipeline or DG route, or within 1.5 km of IH or a DG storage site; planner "must consider the recommendations" | Bylaw 20001 s. 7.140 subs. 8.1–8.3 | — | arch_adj_edm7140. Sensitive Use = annual fatality-risk threshold "below 0.3 in a million" |
| Edmonton guide | sensitive uses ↔ heavy industry | MIACC individual-risk thresholds (figure not read ?); 1.5 km trigger "reduced to 0.5 km in most cases" | Risk Assessment Guidelines 2019 | — | arch_adj_edmRiskGuide |
| Noise receptor (Edmonton) | housing ↔ plant | 65 dB(A) day / 50 dB(A) night "at the property line of a property zoned for residential use"; 75 / 60 dB(A) non-residential | Bylaw 14600 ss. 19–22 | — | arch_adj_edm14600. Our reading: measured at a property line, so housing on the data centre's own lot is not protected by these limits (same gap as Vancouver 6555) |

### 5. Emergency shelters, reception centres, refuge

| rule | applies to | requirement | clause | codes | differences / source |
|---|---|---|---|---|---|
| Who sites it (AB) | reception centre | "The selection of the reception centre site is the responsibility of the municipal or local authority"; consult Safety Codes Officers | AHS Reception Centres p. 3 | — | arch_adj_ahsRecCentre |
| Siting factors (AB) | reception centre | "Proximity to the event and resources", "Transportation", "Sustainability of utilities", "Building accessibility", "Population served" (no hazard distance) | AHS Reception Centres p. 3 | — | arch_adj_ahsRecCentre |
| Intakes (AB) | reception centre ↔ outdoor air sources | "external air intakes should be identified and a plan should be developed to address outdoor air quality concerns" | AHS Reception Centres p. 4 | — | arch_adj_ahsRecCentre |
| Health area | inside reception centre | "distinctly separated from the reception centre entrance and general evacuee registration area" | AHS Reception Centres App. B p. 17 | — | arch_adj_ahsRecCentre |
| BC facility criteria | reception centre / group lodging | none found (ESS Program Guide, JIBC EMRG-1612 guide) | — | — | arch_essProgramGuide2025 (existing); JIBC guide has none |

### 6. Greenhouses

| rule | applies to | requirement | clause | codes | differences / source |
|---|---|---|---|---|---|
| Definition | greenhouse | "Greenhouse agricultural occupancy (Group G, Division 3) means an agricultural occupancy where plants are grown in a building or part thereof that is primarily constructed of roofs and walls designed to transmit natural light" | Div. A 1.4.1.2 | NBC, BC | arch_adj_nbcPart2. BC has the definition (and G-1) but no Part 2 to use it; VBBL defines only G-1; AB: no Group G |
| Which rules | greenhouse ≤3 storeys and ≤600 m² | follows National Farm Building Code 1995; larger → NBC Part 2 | Div. A 1.1.1.1.(3), 1.3.3.5 | NBC | BC, VBBL: all farm buildings → NFBC 1995 (1.1.1.1.(4)); AB: low-human-occupancy farm buildings excluded (1.1.1.1.(4)(a)) |
| Occupant load switch | public greenhouse | >1 person per 40 m² → classified under Table 3.1.2.1 (Part 3), not Group G | Div. A 1.3.3.6.(2) | NBC | arch_adj_nbcPart2. Our reading: a public/community greenhouse is Part 3 (A-2 ?) |
| "Farm building" needs a farm (BC) | greenhouse on a data-centre site | farm building is one "located on land devoted to the practice of farming" | BC Div. A 1.4.1.2 | BC only | arch_adj_bcbcFarm. Our reading: NFBC route not open on an industrial site in BC; Part 3 applies |
| Prohibited combinations | G-3 building ↔ A-1, A-3, B | "shall not contain a Group A, Division 1 or 3, or Group B occupancy" | Div. B 2.2.1.2.(2) | NBC (Part 2 only) | arch_adj_nbcPart2 |
| Separations | G-3 ↔ others | 1 h to A-2, A-4, C; 2 h to F-1, G-1; none to D, E (F-2, F-3 none) | Div. B Table 2.2.1.4 | NBC (Part 2 only) | arch_adj_nbcPart2 (PDF p. 117 checked) |
| Firewall | G building ↔ prohibited occupancy | 4 h noncombustible | Div. B 2.2.1.7.(2) | NBC | arch_adj_nbcPart2 |
| Sprinklers (Vancouver) | greenhouse | not required in "greenhouses used solely for the growing of plants where no public admittance is permitted" | VBBL Div. A 1.3.3.6.(2)(j) | VBBL only | arch_adj_bcbcFarm. Public greenhouse → sprinklered |
| CO2 enrichment (AB) | greenhouse workers | CO2 8-h OEL 5,000 ppm; 15-min/ceiling 30,000 ppm (enrichment target ~1,000 ppm, greenhouse_solar.md) | AB OHS Code Sch. 1 Table 2 | — | arch_adj_abOHSco2. BC value not read ? |

### 7. Health care next door

| rule | applies to | requirement | clause | codes | differences / source |
|---|---|---|---|---|---|
| Essential power | hospital | CSA Z32 covers "essential electrical systems for health care facilities"; emergency power not in its Clause 6 → CSA C282 | Z32:21 1.1.1, 1.4 | — | arch_adj_csaZ32 (scope page only; full text paywalled, logged) |
| HVAC / intakes | hospital ↔ data-centre exhaust | Z317.2:24 covers HVAC in health care facilities; intake/exhaust clauses not visible | Z317.2:24 1.1 | — | arch_adj_csaZ3172 (paywalled, already logged) |

### 8. Data-centre standards

| rule | applies to | requirement | clause | codes | differences / source |
|---|---|---|---|---|---|
| IT room rating | data hall ↔ rest of building | "The fire resistance rating shall be commensurate with the exposure but not less than 1 hour for both" ("both" has no clear antecedent, per PI 50) | NFPA 75-2024 6.1.3.2 (as quoted in public input) | — | arch_adj_nfpa75PI. When 6.1.3 applies: ? |
| When NFPA 75 applies | data hall | "A documented risk assessment shall be the basis for implementation of this standard" | NFPA 75-2024 1.3.1 (as quoted) | — | arch_adj_nfpa75PI. Not adopted by NBC/BCBC/AB (our reading ?) |
| FM DS 5-32, TIA-942, ISO/IEC 22237 | data centre siting | not read (FM free-download link failed; iso.org page failed; TIA's own paper only says follow TIA-942) | — | — | logged in paywalled_standards.md |

## (b) Searched for and NOT found

- Any BC or AB childcare rule that bars childcare in or next to an industrial building, a data centre, or a generator (BC CCLR read in full; AB handbook and AHS guide read). Only Edmonton s. 6.40 and Metro Vancouver 1329 (earlier files).
- A numeric distance from childcare play areas to generators, transformers, cooling units or loading in BC licensing or Vancouver guidelines (only "avoid or mitigate", "away from", "not adjacent").
- Air-quality, ventilation or temperature rules in the BC CCLR (none, except overnight sleeping "well ventilated").
- BC Pool Regulation: siting, equipment-room, ventilation or power-failure clauses (none). BC chlorine-gas room rules in BCBC/VBBL (grep "chlorin" = 0); BC Guidelines defer to BC Fire Code and WorkSafeBC.
- Siting rules for food premises relative to external hazards in BC (none); AB has only the "should" 30 m.
- Numeric buffer between housing and industrial uses in Metro 2050, Vancouver's housing framework, or BCCDC toolkit (none).
- BC ESS / EMCR reception-centre siting criteria (none found); any rule that a refuge must stay reachable or separable when the host building is secured (none found in AHS guide, BC ESS, JIBC).
- CO2-enrichment safety rules specific to greenhouses (none; only general OHS limits).
- Rules on a hospital's air intakes or emergency power near a third-party generator (CSA scope pages only).
- Data-centre adjacency rules in public summaries of NFPA 75, TIA-942, ISO/IEC 22237 (none visible).

## (c) Open questions

1. AB Early Learning and Child Care Regulation full text (CanLII blocked; King's Printer not reached): any premises-location clause? Logged.
2. Does the AB food code's 30 m "sources of contamination" reach standby generators or cooling towers? Ask AHS plan review.
3. AB 7.2.3.39 "not near heating equipment": does a heat-pump or heat-exchanger room count? No distance given.
4. NFPA 75 6.1.3: when does the 1 h minimum apply, and what does "both" mean? Needs the full text (J.B.: 2 h).
5. BC: definitions of G-1 and G-3 exist but no Part 2 (checked: only 2 mentions). How a BC AHJ classifies a public greenhouse on an industrial site (A-2? F-2?) is open.
6. Edmonton: is a data centre's diesel store a "Site associated with storing ... Dangerous Goods" (7.140 8.1.2.2), putting every Sensitive Use within 1.5 km in scope? Ask the Development Planner.
7. Vancouver Childcare Technical Guidelines 3.6: which spaces the 55 and 45 dB(A) Leq24 limits apply to; re-read the page.
8. WorkSafeBC CO2 exposure limit (table not opened).
