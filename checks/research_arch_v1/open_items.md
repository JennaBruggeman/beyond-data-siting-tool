# Open items: data centre class, IT generators, BC Fire Code 2024 (1 Nov 2026)

Closes (or narrows) the three "Open" items in checks/architecture_adjacency_draft.md. Sources: open_items_sources.json (ids arch_open_*). "Our reading" = Claude's interpretation, not an authority's. "?" = unsure.

---

## 1. Data centre major occupancy (F-2, F-3 or D)

### Short answer
- **No Canadian authority found that states a data centre's occupancy.** No NRC interpretation, BC branch bulletin, City of Vancouver bulletin, STANDATA, Edmonton/Calgary permit record, or Ontario/Quebec ruling names one.
- What decides it, from the sources found: **fire load** (F-2 above 1,200 MJ/m² or 50 kg/m²; F-3 at or below), proven by a sealed fire-load report; and whether the AHJ treats the use as "industrial" (Group F) or "business" (Group D). The AHJ decides.
- Tool: keep **F-2 (?)** as the default, with F-3 and D as alternatives. Nothing found changes this.

### Every instance found

| Source | Kind | What it says | Occupancy stated | What decides it |
|---|---|---|---|---|
| VBBL 2025 Table A-11.5.1.1.(3) (Hazard Index Table, Group D list) | Code note (Vancouver, existing buildings) | "Computer Centres 3 4"; "Communications Offices (Telephone Exchange) 3 4" | **D** (under Group D heading) | Upgrade hazard index only; not a classification article (our reading, as before) |
| NBC / BCBC / VBBL / NBC(AE) Div. A 1.4.1.2, "Post-disaster building" | Code definition | lists "telephone exchanges" with "power generating stations and electrical substations" | none | Importance category, not occupancy |
| BCBC / NBC Div. A 2.1.1.2.(5)(c) | Code | accessibility objective does not apply to "buildings that are not intended to be occupied on a daily or full-time basis, including automatic telephone exchanges, pumphouses and substations" | none | Shows the codes treat unstaffed telecom buildings like substations (our reading) |
| NBC, BCBC, VBBL, NBC(AE) Table 4.1.5.3 (specified live loads) | Code | "Office areas (not including record storage and computer rooms)": 4.8 kPa basements/ground, 2.4 kPa other floors | none | Floor load only: computer rooms fall outside the office row; says nothing on class |
| City of Vancouver, CD-1 rezoning 111 E 5th Ave and 2060 Quebec St (Telus/Westbank), report 30 Jun 2026 | Council report | "Data centres are classified in the Zoning and Development By-law, under 'Transportation and Storage use'"; adds "Bulk Data Storage Use" | **none** (zoning only); no VBBL occupancy, generators or separations | Zoning use, not building code |
| City of Vancouver, Council motion "Addressing the Risks of Digital Infrastructure", 15 Jul 2026 | Council motion | names "the proposed Telus Data Centre at 150 West Georgia Street" | none | — |
| City of Vancouver DP-2021-00168, 720 Beatty / 701 Expo (Creative Energy steam plant) | DP staff report, 9 Jun 2021 | "The existing steam plan [sic] is classified as Group F, Div.1 major occupancy within the building" | **F-1** for a steam plant (not a data centre) | Shows Vancouver records a plant's occupancy in DP reports; no data-centre equivalent found |
| BC Building Code Appeal Board #1513 (5 Jul 2000) | BC appeal decision | computer instruction business (6–8 workstations) | **D**, not A-2 | Number of students; about training, not servers (not a data centre) |
| City of Kitchener, "Fire Load Calculations: Guide to Determining Group F, Division 3 Occupancies" (Nov 2023) | Municipal building-official guide (Ontario) | F-3 needs a sealed report by an architect or P.Eng. listing "all proposed combustible content" with weights and heats of combustion; "if either of these qualifiers exceed the specified value the occupancy cannot be classified as a Group F3"; variable-combustible uses treated as F-2 | Rule for F-2 vs F-3 generally | **Both** kg/m² and MJ/m² must be within limits; owner letter; later change to F-2 needs a permit |
| Town of Airdrie, Building Classification Guideline (NBC(AE) 2023) | Municipal guide (Alberta) | lists "Radio stations" D; "Electrical substations" F-2; "Power plants" F-3 | No data-centre entry | Same examples as NBC Note A-3.1.2.1.(1) |
| City of Cambridge (Ont.), Data Centres page (2026) | Municipal page | permit "must be issued" once OBC met; zoning use "Information and Data Processing" | none | — |
| ICC, Building Safety Journal (K. McOsker, 10 Mar 2026) | US model-code body (not Canadian) | 2024 IBC "does not explicitly assign data centers"; classified as **Group B, F-1 or S-1** in practice; use "the occupancy it most nearly resembles" | US: B / F-1 / S-1 | Code official, by hazard; US comparison only |

### Fire load of a data hall (MJ/m²)
- **Not found** in any peer-reviewed or government source. Checked: two 2025–26 data-centre fire reviews (Fire 9(4):151; J. Loss Prev. 100:105890), NRC 1985 Part 3 commentary, Kitchener and MBOA (DGH) F-2/F-3 guides. None gives a figure for racks, servers or cabling.
- So the hall cannot yet be placed against the 1,200 MJ/m² line from a source. A sealed fire-load calculation (Kitchener method) is the only route found.

### Searched, not found
- NRC / Codes Canada interpretation naming data centres or computer buildings.
- BC Building and Safety Standards Branch interpretation or bulletin on data centres.
- City of Vancouver building bulletin, or BP/DP document stating a data centre's VBBL occupancy (Cologix VAN1–VAN5, Equinix, eStruxture, QTS: only operator datasheets and trade press found).
- Alberta STANDATA on data centres (open.alberta.ca search: none); Edmonton or Calgary permit documents stating occupancy.
- Ontario Building Code Commission ruling or Quebec RBQ interpretation on data centres.
- Treasury Board of Canada "Fire Protection Standard for Electronic Data Processing Equipment" (rescinded 2010): **not reached** (tbs-sct.canada.ca rejected the request; archive copy rate-limited). Logged in paywalled_standards.md.

---

## 2. Are IT standby generators "emergency generators"? Does CSA C282 cover them?

### Short answer
- **No code defines "emergency generator".** NFC 4.3.13.1.(1)(b) uses the term without a definition. Whether an IT-only standby set counts is **unresolved**: no authority interpretation found.
- **CSA C282 scope (publisher's page):** its mandatory scope is generator sets where an emergency supply "is required by the National Building Code of Canada", but Note 3 says its normative provisions "are not limited to" those installations, and Note 6 says other systems "should meet the requirements of this Standard, where practical". So C282 **can** reach IT sets, but as "should", not "shall" (our reading).
- **City of Vancouver Bulletin 2000-015-BU/EL** (rev. 2015/2020): an emergency generator room may hold only the set and emergency-supply equipment; it rejects reading "equipment" as any load the generator feeds. Its diagram shows the C282 generator also feeding "Non-Life Safety Loads / Equipment" through a separate transfer switch (ATS2). Our reading: in Vancouver, one set may feed both life-safety and IT loads, but then it is a C282 emergency generator and its room is a 3.6.2.8 room (2 h, generator equipment only).
- Tool: if the IT sets also carry life-safety loads, treat them as emergency generators (2 h room; fuel under NFC 4.3.13.1.(1)(b)). If IT-only: "?" — indoor tanks above B139 sizes may then need an industrial occupancy (4.3.13.1.(1)(a)).

### Code text (quoted from the repo files)

| Clause | Code(s) | Text |
|---|---|---|
| 4.3.13.1.(1) | NFC 2020; NFC(AE) 2023 same | "storage tanks located inside buildings shall conform to Subsections 4.3.13. to 4.3.15. and be permitted in a) industrial occupancies, and b) occupancies other than industrial occupancies where combustible liquids are stored and used as fuel for oil-burning equipment, emergency generators and fire pumps." |
| Note A-4.1.1.1.(3)(b) | NFC; NFC(AE) | "Ancillary equipment covered in CSA B139 Series … includes storage tanks and piping that supply oil-burning equipment, diesel-engine-driven emergency generators and fire pumps. Part 4 of the NFC does not apply to such tanks and piping systems." |
| 4.3.13.6.(1) | NFC; NFC(AE) | "Piping systems serving oil-burning equipment, diesel-engine-driven emergency generators and fire pumps shall conform to CSA B139 Series" |
| Note A-4.3.13.4.(1)(b) | NFC | Table 4.3.13.4.-B "harmonizes requirements for all occupancies using oil-burning equipment, emergency generators and fire pumps" |
| 6.5.1.1.(1) | NFC; NFC(AE) | "emergency power systems shall be inspected, tested and maintained in conformance with CSA C282" |
| 6.5.1.4.(1) | NFC; NFC(AE) | "Written records shall be maintained as required in CSA C282" |
| Div. C 2.2.4.7.(1)–(2) | **NFC(AE) only** | persons "qualified to perform the inspection, testing and maintenance of emergency power systems installed in conformance with CSA C282" if trained by "a generator manufacturer" (owner: weekly/monthly checks if trained by "a generator service provider or generator manufacturer") |
| Note A-6.5.1.5.(1) | **NFC(AE)** differs | adds option to "drain, filter and condition existing fuel in accordance with Table 5 of CSA C282" |
| 3.2.7.5.(1) | NBC, BCBC 2024, VBBL 2025, NBC(AE) — same | "Except as required by Articles 3.2.7.6. and 3.2.7.7., an emergency electrical power supply system shall be installed in conformance with CSA C282" |
| 3.2.7.9.(1) | NBC, BCBC, VBBL (AB ?) | "An emergency power supply … shall be provided by an emergency generator for" firefighters' elevators, fire-suppression water supply, etc. |
| 3.6.2.8.(1) | NBC, BCBC, VBBL, NBC(AE) | "a generator intended to supply emergency power for lighting, fire safety and life safety systems" in a room with 2 h separation that "contains only the generating set and equipment related to the emergency power supply system" |
| Note A-3.2.7.8.(3) | NBC; BCBC (cites "British Columbia Fire Code"); VBBL | "If the operation of emergency generators or batteries is intended for other than fire emergency conditions, such as power failures, fuel supplies or battery capacity must be increased to compensate for that use." |
| 3.2.5.20.(3)(j) | VBBL only | radio antenna coverage ≥98 % in "j) emergency generator room" |

"standby" grep: no hit in nfc.txt or nfc_ab2023.txt; in nbc.txt, bcbc2024.txt and vbbl2025_v1.txt only for water-heater "standby loss" and a cooling-tower "Standby (wet)" mode. **"Standby generator" appears in none of the five codes.**

### Other sources
- CSA C282:24 store page, Clause 1.1 scope and Notes 3, 5, 6 (publisher; standard itself paywalled). Note 5: "equipment other than 'life safety equipment' could be connected to the generator set (see Clause 6.4.1)". Clause 1.2 excludes battery supplies.
- SCC notice of intent (new C282 edition in development): scope wording "emergency generators … required by the National Building Code of Canada (NBCC)".
- Practitioner commentary, not an authority: A. Tsisserev (chair, CE Code Technical Committee), IAEI Magazine, 10 Jul 2019: generators "used for a standby or backup power supply" should be installed to C282, citing Notes 3 and 6 and CE Code Rule 46-202(3)(c) (CEC not checked: paywalled; J.B.'s copy covers Section 64 only).

### Searched, not found
- A definition of "emergency generator" or "standby generator" in NBC, BCBC, VBBL, NBC(AE), NFC, NFC(AE).
- Any NRC, BC, Alberta or Vancouver interpretation saying whether IT-only sets fall under NFC 4.3.13.1.(1)(b).

---

## 3. BC Fire Code 2024

### Short answer
- **BC publishes no consolidated BCFC 2024.** Government page: "British Columbia will not be producing a consolidated BCFC document." BCFC 2024 = **NFC 2020** + a 13-item Schedule + Ministerial Order FSA 2023 1. free.bcpublications.ca hosts only the **2018** BCFC.
- **data/raw/codes/bcfc2024.txt was not created.** The Schedule PDF (www2.gov.bc.ca) was refused by the network proxy from both the container and the desktop shell; it was read only through the web-reading tool, which gives short quotes, not full text. Logged in paywalled_standards.md (free, but needs J.B. to download).
- **Result: BC = NFC 2020 for every clause asked, except one added clause in 4.1.1.1.(3).** The Schedule never mentions "generator", "4.3.13", "4.3.14", "4.3.2", "3.2.7" or "6.5".

| Clause | BCFC 2024 | Difference from NFC 2020 |
|---|---|---|
| 4.1.1.1.(3)(b) | NFC text applies: Part 4 "shall not apply to … b) appliances and their ancillary equipment within the scope of CSA B139 Series … except for aboveground storage tanks with an individual capacity exceeding 2 500 L" | **(3) amended** by adding "e) the storage of flammable liquids or combustible liquids on isolated construction projects." (Schedule item 11). (b) unchanged |
| 4.1.1.1.(4) | — | **Repealed** (item 12): "Sentence (4) of Article 4.1.1.1. of Division B is repealed." (NFC (4): farm storage per Section 4.12, which BC does not adopt) |
| 4.3.13 (indoor tanks; incl. 4.3.13.1 "emergency generators") | NFC 2020 | none |
| 4.3.14 (tank rooms: 2 h, spill containment, 550 mm clearance, single use) | NFC 2020 | none |
| 4.3.2.1 (outdoor tank distances, Table 4.3.2.1) | NFC 2020 | none |
| 3.2.7.6 / Table 3.2.7.6 (oxidizers, e.g. pool chemicals) | NFC 2020 (oxidizers vs acids and flammable liquids "X"; vs bases and toxic gases "1m", per adj_check.md) | none |
| 6.5 (C282 testing) | NFC 2020 | none |
| 2.1.3.5 (NFPA 2001 clean agent) | NFC 2020 (NFPA 2001 **not** listed) | none (Schedule silent) |

Other BC changes in the Schedule (not asked, for the record): Group B-4, Group G, Sections 2.14 and 4.12 not adopted; new 1.3.1.3 reads CSA C22.1 as the 2018 CEC and NBC 2020 as BCBC 2024 (C282, B139, NFPA 37, NFPA 2001 not listed there); 1.1.2.2: "NFC" read as "the British Columbia Fire Code".

---

## Still open
- The data centre's class: only an AHJ ruling or a sealed fire-load report settles F-2 vs F-3; D rests on Vancouver's hazard table only.
- IT-only standby sets and NFC 4.3.13.1.(1)(b): ask the AHJ (Vancouver Fire Rescue Services / Edmonton Fire Rescue Services).
- BCFC Schedule: a full-text copy for the repo (J.B. download).
