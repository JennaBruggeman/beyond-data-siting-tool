# Adjacency: occupancy classification, separations, stacking, egress (Part 3)

Research 31 Oct 2026 per ADJ_BRIEF.md. Sources: local full texts NBC 2020 (nbc.txt), BCBC 2024 (bcbc2024.txt), VBBL 2025 Book I (vbbl2025_v1.txt), NBC(AE) 2023 (nbc_ab2023.txt), NFC 2020 (nfc.txt), NFC(AE) 2023 (nfc_ab2023.txt). Table 3.1.3.1 checked against the NBC PDF page image (p. 148, Div. B 3-3).

Method for "codes it's in": each article's text was extracted from all four building codes and compared word by word. "Same" = identical wording; differences are listed. "our reading" = not stated by the code. "?" = unsure.

Code labels: NBC = NBC 2020; BC = BCBC 2024; VBBL = Vancouver Building By-law 2025; AB = NBC(AE) 2023 (Edmonton).

## Correction to an earlier file

- spatial_rules.md row "D adjoining A and C | 1 h; D/F-2 3 h" is **wrong**. In Table 3.1.3.1 the 3 h is **D / F-1**. **D / F-2 = "—" (no separation)**, with Note (8): 1 h only if built to 3.2.2.57 (encapsulated mass timber). Checked on the PDF page. Same in all four codes (BC and VBBL drop Note 8).

## (a) Rules table

### 1. Classification of each program

| rule | applies to | requirement | clause | codes | differences |
|---|---|---|---|---|---|
| Classify by every major occupancy | all buildings | "every building or part thereof shall be classified according to its major occupancy"; mixed building "classified according to all major occupancies" | 3.1.2.1.(1)–(2) | NBC, BC, VBBL, AB | BC and VBBL add exceptions 3.1.2.7 (and VBBL 3.1.2.9) |
| Same Division = one occupancy | e.g. F-2 data hall + F-2 industrial laundry | "deemed to be occupied by a single major occupancy" if all in the same Group/Division | 3.1.2.2.(1) | all 4 | none |
| Library | public floor | A-2 ("Libraries") | Note A-3.1.2.1.(1) | all 4 | none |
| Café / restaurant | public floor | A-2 ("Restaurants") | A-3.1.2.1.(1) | all 4 | **VBBL 3.1.2.9:** "retail food facility" may be **Group E** if it seats "not more than 16 persons consuming food or drink" |
| Small assembly suite | community room, studio, café | A-2 suite "except a child or infant daycare facility" may be classified **D** if ≤30 persons and separated by 1 h (no rating needed if sprinklered); sign required | 3.1.2.7 | **BC, VBBL only** | not in NBC or AB. Note A-3.1.2.7 says this lets the suite sit where "the adjoining occupancy is a Group F, Division 1" |
| Indoor pool | pool | **A-3** ("Indoor swimming pools, with or without spectator seating") | A-3.1.2.1.(1) | all 4 | none |
| Outdoor pool | pool | not listed. A-4 is "occupants … gathered in the open air" (bleachers, stadia). Our reading: outdoor pool without stands is not a building ? | Table 3.1.2.1; A-3.1.2.1.(1) | all 4 | — |
| Laundromat | laundry | **D** ("Laundries, self-service"; "Dry cleaning establishments, self-service, not using flammable or explosive solvents") | A-3.1.2.1.(1) | all 4 | VBBL hazard table lists "Laundries (Self-Serve)" under D |
| Institutional / industrial laundry | laundry | **F-2** ("Laundries, except self-service") | A-3.1.2.1.(1) | all 4 | VBBL hazard table: "Laundries (not self-serve)" F-2 |
| Common laundry room in housing | laundry in residential building | 1 h (45 min if floor rating <1 h; no rating if sprinklered) | 3.3.1.23 | all 4 (same) | — |
| Greenhouse (farm) | greenhouse | **G-3** "Greenhouse agricultural occupancy" only if on "land that is associated with and devoted to the practice of farming" | Div. A 1.4.1.2 defs; 1.3.3.6; Div. B Part 2 | **NBC only** | BC and AB: Part 2 not adopted ("Part 2 Reserved" in BC; no Group G in AB). VBBL has the definition but exempts "greenhouses used solely for the growing of plants where no public admittance is permitted" from its sprinkler mandate (1.3.3.6.(2)(j)) |
| Greenhouse (urban, our case) | greenhouse | Not in Table 3.1.2.1 examples. Our reading: not on farming land → not Group G; classify by use: growing only → F-2 or F-3 by fire load; public conservatory → A-2 ? | 1.3.3.6.(2); A-3.1.2.1.(1) | all 4 | — |
| If Group G applied (NBC farm only) | greenhouse in a farm building | G-2/G-3 "shall not contain a Group A, Division 1 or 3, or Group B occupancy"; G-3/A-2, A-4, C: 1 h; G-3/F-1: 2 h; G-3/D, E, F-2, F-3: none | 2.2.1.2.(2); Table 2.2.1.4 | NBC only | — |
| Daytime warming / cooling / clean-air room | refuge | Not listed. Our reading: A-2 ("Community halls") ? | A-3.1.2.1.(1) | all 4 | — |
| Overnight emergency shelter | refuge | Not listed. Our reading: **C** (Group C = persons "for whom sleeping accommodation is provided but who are not harboured for the purpose of receiving care") ? | Div. A def. "Residential occupancy" | all 4 | **VBBL 13.4.4.1:** "temporary emergency shelter is permitted in an existing building" with 12 conditions (staff 1 per 20 spaces, 1 bed per 3.7 m², 2 means of egress, smoke alarms throughout…); fixed-term shelter ≤3 years if sprinklered. Existing buildings / temporary only (13.1.1.3) |
| Childcare | sensitive use | NBC: not listed (our reading A-2 ?) | A-3.1.2.1.(1) | NBC | **BC 3.1.2.8:** "shall be classified as a Group A, Division 2". **VBBL 3.1.2.8 + Table 3.1.2.8:** A-2 if >8 children, else C; separation from rest of building **2 h** (under 30 months) or **1 h** (30 months+). **BC 3.3.2.18:** under-30-months daycare sprinklered or within 1 storey of a grade exit. **AB:** "Child care facilities (facility-based programs)" listed as A-2; "Family day homes" as C |
| Maker space / studios | public floor | "Workshops" listed under **both F-2 and F-3**; art galleries A-2; nonresidential schools A-2 | A-3.1.2.1.(1) | all 4 | VBBL: artist live/work rules 3.1.3.3–3.1.3.4 |
| Housing | tested case | C | A-3.1.2.1.(1) | all 4 | — |

### 2. Data centre: F-2 vs F-3 vs D vs F-1

| rule | applies to | requirement | clause | codes | differences |
|---|---|---|---|---|---|
| Data centre named? | data hall | **No** "data centre" or "computer facility" example in any of the 4 building codes or 2 fire codes | A-3.1.2.1.(1) | all | — |
| Nearest examples | data hall, plant | "Electrical substations" → **F-2**; "Power plants" → **F-3**; "Radio stations" → **D**; "Offices" → D | A-3.1.2.1.(1) | all 4 | — |
| Vancouver explanatory table | data hall | **"Computer Centres"** listed under **Group D** (hazard index 3 / 4); also "Communications Offices (Telephone Exchange)" under D | VBBL Table A-11.5.1.1.(3) (note to Part 11, existing buildings) | **VBBL only** | explanatory note for upgrade triggers, not a classification article (our reading) |
| F-2 / F-3 boundary | data hall | F-3: "combustible content is not more than 50 kg/m² or 1 200 MJ/m² of floor area"; F-2: more than that | Div. A 1.4.1.2 defs | all 4 | — |
| What counts in fire load | data hall | "combustible contents … includes the furnishings, finished floor, wall and ceiling finishes, trim and temporary and movable partitions" | Div. A def. "Fire load" | all 4 | — |
| Is a data hall "industrial"? | data hall | Group F = "assembling, fabricating, manufacturing, processing, repairing or storing of goods and materials". Group D = "transaction of business or the rendering … of professional or personal services". Our reading: a data hall fits neither cleanly → AHJ decision ? | Div. A defs | all 4 | — |
| F-1 definition | battery / fuel | "sufficient quantities of highly combustible and flammable or explosive materials which, because of their inherent characteristics, constitute a special fire hazard". **No numeric threshold** | Div. A def. | all 4 + NFCs | — |
| Generator fuel does not by itself make it industrial | fuel tanks | indoor tanks permitted in "occupancies other than industrial occupancies where combustible liquids are stored and used as fuel for … emergency generators and fire pumps"; limits in Table 4.3.13.4.-B (e.g. Class II: 200,000 L aggregate per protected room on first storey; 20,000 L basement/upper; tanks >2,500 L double-walled) | NFC 4.3.13.1.(1)(b), 4.3.13.4–4.3.13.5 | NFC, NFC(AE) | NFC(AE) 4.3.13.1 same wording |
| Fuel "in use" vs "in storage" | day tanks, piped fuel | 3.3.6 "does not deal with products or materials that are directly supplied to appliances, equipment … through piping" | Note A-3.3.6.1.(1) | NBC (others ?) | — |
| Dangerous goods storage thresholds | battery spares, electrolyte | 3.3.6 applies above NFC Table 3.2.7.1 amounts. Corrosives (Class 8): PG I 500 kg/L, PG II 1,000, PG III 2,000; Class 9: "See Article 3.1.2.1" (no amount) | NBC 3.3.6.1; NFC 3.2.7.1 | NBC, NFC | building codes point to BC Fire Code / Fire By-law / NFC(AE) |
| Batteries in building codes | UPS / battery rooms | none (see separations.md §4) | — | — | — |
| F-1 room inside building | if any room is F-1 | "such occupancy shall be separated from the remainder of the building by fire separations" | NFC 2.2.1.1.(2) | NFC, NFC(AE) | — |
| Sprinkler under-floor rule | data centre with other uses above | if a storey must be sprinklered, "also … throughout all lower storeys" | 3.2.2.18.(2), Note A-3.2.2.18.(2) | all 4 | **VBBL 3.2.2.18.(3)** + Div. A **1.3.3.6:** "all newly constructed buildings shall be provided with an automatic sprinkler system" (exceptions incl. CBO may waive for "industrial or hazardous occupancies" where sprinklers are a hazard) |

### 3. Major occupancy separations (Table 3.1.3.1, all notes)

Hours between F-2 / F-3 (data centre) and the others. Full table checked; NBC = AB (identical text).

| adjoining | F-2 | F-3 | F-1 | D | note |
|---|---|---|---|---|---|
| A-1, A-2, A-3, A-4 | **2** | **1** | prohibited (2) | 1 (A-2: 1, Note 4) | — |
| B-1, B-2, B-3 | **2** | **2** | prohibited | 2 | — |
| C | **2** (Note 6) | **1** (Note 7) | prohibited | 1 | — |
| D | **—** (Note 8) | **—** (Note 8) | **3** | — | — |
| E | **—** | **—** | 3 | — | — |
| F-1 | 2 | 2 | — | 3 | — |
| F-2 / F-3 | — | — | 2 | — | — |

| rule | applies to | requirement | clause | codes | differences |
|---|---|---|---|---|---|
| Separation of major occupancies | all pairs | "shall be separated from adjoining major occupancies by fire separations having fire-resistance ratings conforming to Table 3.1.3.1." | 3.1.3.1.(1) | all 4 | — |
| Note (1) | all | "Section 3.3. contains requirements for the separation of occupancies and tenancies that are in addition" | Table 3.1.3.1 | all 4 | — |
| Notes (2), (6) | F-1; C/F-2 | "See Sentence 3.1.3.2.(1)" / "(2)" | Table | all 4 | — |
| Note (3) | C / A-2 | 2 h if built to 3.2.2.48 or 3.2.2.51 | Table | NBC, AB | BC, VBBL: 3.2.2.51 only |
| Note (4) | D / A-2 | 2 h if built to 3.2.2.57 or 3.2.2.60 | Table | NBC, AB | BC, VBBL: 3.2.2.60 only |
| Note (5) / 3.1.3.1.(2) | C / E | ≤3 storeys, ≤2 dwelling units with E: 1 h | Table; 3.1.3.1.(2) | all 4 | — |
| Note (7) | C / F-3 storage garage | 2 h if built to 3.2.2.48 | Table | NBC, AB | not in BC/VBBL; **VBBL Note (7) instead = "See Article 3.2.1.7"** |
| Note (8) | D / E, F-2, F-3 | 1 h if built to 3.2.2.57 | Table | NBC, AB | not in BC/VBBL |
| Openings in interconnected floor spaces | atria | separations do not apply at the perimeter of an opening if 3.2.8.2–3.2.8.8 met | 3.1.3.1.(3) | all 4 | — |
| VBBL housing in combustible buildings | C over anything, >2 storeys combustible | C "shall be separated from all other major occupancies … by a fire separation with at least a 2 h fire-resistance rating constructed of a) concrete, b) masonry, or c) … encapsulated mass timber"; 1.5 h to storage garage | VBBL 3.2.1.7 | **VBBL only** | — |

### 4. Prohibited and restricted combinations

| rule | applies to | requirement | clause | codes | differences |
|---|---|---|---|---|---|
| F-1 with A, B, C | if data centre became F-1 | "No major occupancy of Group F, Division 1 shall be contained within a building with any occupancy classified as Group A, B or C." | 3.1.3.2.(1) | all 4 | — |
| Housing in an F-2 building | housing, overnight shelter | "Not more than one suite of residential occupancy shall be contained within a building classified as a Group F, Division 2 major occupancy." | 3.1.3.2.(2) | all 4 | **VBBL:** "Except as permitted in Article 3.1.3.4. and 3.1.3.5., and Subsection 11.2.5." |
| VBBL industrial flex space | small F-2 under housing | F-2 allowed in a **new** Group C building if: ≤500 m² per unit; **first storey only**, "completely independent of the Group C portion … including the exit system"; separate ventilation; **2 h concrete** floor; 2 h concrete/masonry walls; STC ≥55; NFPA 13 OH2 quick-response; ≥2 egress doors; principal door "directly to the street"; other exits to lane or a corridor serving only the flex space (2 h). Not in existing buildings | VBBL 3.1.3.5; Note A-3.1.3.5 | **VBBL only** | our reading: a data hall >500 m² does not fit |
| Artist live/work (Class B) | studio + housing | built to most restrictive of F-2 and C; spatial separation as F-2; NFPA 13 OH1 | VBBL 3.1.3.4 | VBBL only | — |
| Air-supported structures | greenhouse dome ? | "shall not be used for Groups B, C, or Group F, Division 1 major occupancies or for classrooms" | 3.1.18.2.(2) | NBC (others ?) | — |
| Flammable-liquid storage rooms in assembly | A occupancies | "shall not be located above or below the first storey" | 3.3.2.16 | all 4 (fire code named differs) | — |
| Fuel dispensing (flash point <37.8 °C) | fuel | not above any occupied space; not in any building (except open canopy) | 3.3.5.8 | all 4 (same) | diesel is Class II, so our reading: not triggered |
| Care with repair garage | care | separation "shall have no openings" | 3.3.3.2 | all 4 | — |

### 5. Stacking: which article governs (3.2.2)

| rule | applies to | requirement | clause | codes | differences |
|---|---|---|---|---|---|
| Size from whole building | all | "the building height and building area of the entire building shall be used" | 3.2.2.5 | NBC (others ?) | — |
| Most restricted governs | side-by-side mixed occupancies | "the requirements of this Subsection for the most restricted major occupancy contained shall apply to the whole building" | 3.2.2.6.(1) | NBC, AB | BC, VBBL add 3.2.2.93 (EMTC) cross-refs and Sentence (2) on encapsulation |
| Superimposed occupancies | one occupancy "entirely above" another | each portion follows its own article "as if the entire building were of that major occupancy" | 3.2.2.7.(1) | NBC, AB | BC, VBBL add 3.2.2.93 refs and Sentence (3) (EMTC encapsulation) |
| Floor between them | e.g. A-2 above F-2 | rating "determined on the basis of the requirements … for the lower major occupancy" | 3.2.2.7.(2) | all 4 | — |
| 10 % exemption | small minor uses | ≤10 % of the storey need not count as major occupancy, "provided they are not classified as Group F, Division 1 or 2" | 3.2.2.8.(1) | all 4 (same) | — |
| Assembly above F-2 | public floor / pool above data hall | **No prohibition found.** Conditions: 2 h separation (Table 3.1.3.1); floor per F-2 article; sprinklers extend to all storeys below a sprinklered storey | 3.1.3.1, 3.2.2.7, 3.2.2.18.(2) | all 4 | VBBL sprinklers everything anyway |
| F-2, any size | data centre | noncombustible, **sprinklered**, floors **2 h** | 3.2.2.76 | NBC (others ?) | — |
| F-2 sprinklered, ≤4 storeys | data centre | noncombustible; floors 1 h; area 18,000 / 9,000 / 6,000 / 4,500 m² for 1–4 storeys | 3.2.2.77 | NBC | — |
| F-2 unsprinklered | data centre | ≤3 storeys, ≤1,500 m² (3.2.2.78, 45 min floors); ≤2 storeys, 600–1,500 m² (3.2.2.80) | 3.2.2.78, 3.2.2.80 | NBC | not usable in Vancouver (our reading, VBBL 1.3.3.6) |
| F-3 low fire load, 1 storey | plant building | any area if "used solely for low fire load occupancies such as i) power generating plants"; noncombustible | 3.2.2.91 | NBC | — |
| Occupied roof | roof greenhouse, pool deck | roof supporting an occupancy built to floor-assembly fire separation rules | 3.2.2.13 | all 4 | — |

### 6. Separation of suites and rooms (Section 3.3, 3.6)

| rule | applies to | requirement | clause | codes | differences |
|---|---|---|---|---|---|
| Suites | any two tenancies | "each suite in other than business and personal services occupancies shall be separated from adjoining suites by a fire separation having a fire-resistance rating not less than 1 h" (45 min if floor <1 h) | 3.3.1.1.(1)–(2) | NBC, AB | BC adds (4) "No fire separation is required between suites of business and personal services occupancy" |
| Sprinklered D/E suites off public corridor | shops, offices | no separation if sprinklered and corridor per 3.3.1.4.(4)(b) | 3.3.1.1.(3) | all 4 | — |
| **Vancouver ground-floor suites** | public floor beside / under data centre | "each suite other than a residential suite, located at ground level and having direct access to the street shall be separated from horizontally and vertically adjoining suites by a fire separation having a fire-resistance rating not less than **2 h**" (not to storage garage) | VBBL 3.3.1.1.(5)–(6) | **VBBL only** | — |
| Residential suites | housing | 1 h from each other and "the remainder of the building" | 3.3.4.2.(1) | all 4 | VBBL adds (6) (multi-storey units) |
| Library stacks | library | non-public book storage >250 m² or stacks >10 m: 2 h unless sprinklered | 3.3.2.13 | all 4 | — |
| A-1 seating >200 | theatre | 1 h | 3.3.2.2.(1) | NBC | — |
| Industrial basements | data centre basement | no storage/handling of volatile materials generating explosive mixtures in a basement | 3.3.5.3.(1) | all 4 | — |
| Industrial fire extinguishing | data hall | system "if required by … regulations or municipal bylaws, or b) the NFC" | 3.3.5.2 | NBC | — |
| Repair garage | loading / fleet | 2 h to other occupancies | 3.3.5.5 | NBC | — |
| Storage garage | parking | 1.5 h; vestibule to A-1/B; to A-2/A-3/A-4/C if >3 storeys | 3.3.5.6, 3.3.5.7 | NBC | — |
| Oxidizers, reactive materials | chemical storage | 2 h | 3.3.6.2.(1)–(2) | NBC | — |
| Flammable gas cylinders | gas suppression? | 2 h gas-tight, exterior wall, exterior entry | 3.3.6.3.(1) | NBC | — |
| Hazardous locations wiring | battery off-gas | CSA C22.1 hazardous locations where gases present "in quantities sufficient to create a hazard" | 3.3.6.2.(4) | NBC | — |
| Service rooms (fuel-fired / flash point <93.3 °C / CEC-required electrical) | generator, electrical rooms | 1 h | 3.6.2.1.(1), (5), (6) | all 4 | BC/VBBL cite Safety Standards Act; AB cites Canadian Electrical Code Regulation |
| Explosion-risk equipment | transformers, boilers | "shall not be located directly under a required exit" | 3.6.2.2 | all 4 | — |
| Electrical equipment vault | transformer vault | 3 h masonry/concrete (2 h if extinguishing system); liquid-tight floor; separate ventilation | 3.6.2.7 | NBC | — |
| Emergency generator room | life-safety generator | 2 h; "contains only the generating set and equipment related to the emergency power supply system" (unless the building is solely for the generator) | 3.6.2.8 | all 4 | — |

### 7. Separate buildings on the same lot (3.2.3, firewalls)

| rule | applies to | requirement | clause | codes | differences |
|---|---|---|---|---|---|
| Limiting distance on one lot | greenhouse or pool as a separate mass | measured "to an imaginary line between 2 buildings or fire compartments on the same property" | Div. A def. "Limiting distance" | all 4 | none |
| Where the imaginary line goes | same | not stated in any of the 4 codes; A-3.2.3 says AHJ may accept a line other than the property line by registered agreement | Note A-3.2.3 | all 4 | — |
| Openings table by occupancy | exposing faces | unsprinklered: A, C, D, F-3 use Table 3.2.3.1.-B; **E, F-1, F-2 use -C** (stricter); sprinklered: -D / -E | 3.2.3.1.(1) | all 4 | AB 3.2.3.1.(8) wording on fire-department response ("capable of beginning suppression activities arrives"); other differences look like formatting ? |
| Combustible projections | balconies, canopies | not within 2.4 m of a combustible projection on another building on the same property | 3.2.3.6.(1)(b) | all 4 | — |
| Low fire load F-3 wall | plant building | non-loadbearing noncombustible wall without rating if limiting distance ≥3 m | 3.2.3.11 | NBC | — |
| Tents, air-supported | temporary structures | 3 m to other structures on the same property | 3.1.18.3.(2) | NBC, VBBL | VBBL (5): tent clusters ≤60 m² count as one |
| Attached but separate building | greenhouse / pool joined by a firewall | firewall **4 h** if either side has E, F-1 or F-2 (upper part 2 h above them); else 2 h; masonry or concrete | 3.1.10.2 | all 4 (same) | — |

### 8. Egress between occupancies

| rule | applies to | requirement | clause | codes | differences |
|---|---|---|---|---|---|
| Each suite opens to corridor or outside | public suite vs data centre suite | "each suite in a floor area that contains more than one suite shall have a) an exterior exit doorway, or b) a doorway i) into a public corridor, or ii) to an exterior passageway" | 3.3.1.3.(8) | NBC (others ?) | our reading: so neither may rely on egress through the other's suite |
| Two directions at the corridor | same | must be able "to go in opposite directions to each of 2 separate exits" | 3.3.1.3.(9) | NBC, AB | BC, VBBL add roof-occupancy egress wording (Note A-3.3.1.3) |
| **Alberta: assembly egress not through service space** | public floor next to data-centre plant | "No access to exit for patrons in an assembly occupancy shall pass through a kitchen, service space or storage room." | **AB 3.3.1.3.(10)** | **AB only** | not in NBC, BC, VBBL |
| Exits separate | shared exits | if >1 exit required, "each exit shall be separate from every other exit" | 3.4.1.2.(1) | all 4 | — |
| Shared exit stairs between occupancies | stacked uses | **no prohibition found** (our reading: one exit stair may serve several occupancies, separated per 3.4.4.1) | 3.4.4.1 | all 4 | **VBBL 3.1.3.5:** flex space must have its own exit system |
| Exit through a lobby | public lobby | only one exit, lobby ≤4.5 m above grade, ≤15 m to outside, and "adjacent rooms or premises having direct access to the lobby do not contain a care, residential or **industrial** occupancy" | 3.4.4.2.(2)(c) | all 4 (same) | — |
| Exits for exiting only | exit stairs | "designed for no purpose other than for exiting"; service rooms and storage rooms "shall not open directly into an exit" | 3.4.4.4.(6)–(8) | NBC | — |
| Locked doors on egress | data centre security | maglocks allowed with fire alarm release etc., but not on doors "leading directly from a high-hazard industrial occupancy" | 3.4.6.16.(5) | NBC, BC, AB | **VBBL (8):** alternative release (push button + motion sensor or pad, "EXIT" button, auto reset after ≥15 s) |
| Exit integrity | exits | openings limited to sprinkler/standpipe pipes, wiring serving the exit, doors, etc. | 3.4.4.4.(1) | NBC, BC, AB | VBBL adds (f) radio antenna system cables |
| Horizontal exits | data centre ↔ other building | ≤½ of required exits; each side holds both populations at 0.5 m²/person | 3.4.1.6, 3.4.6.10.(1) | NBC | — |
| Public corridor | multi-suite floor | 45 min (no rating if sprinklered and not serving B or C) | 3.3.1.4 | NBC | — |
| One-exit limits | small floors | F-2: 150 m², 10 m travel (unsprinklered) | Table 3.4.2.1.-A | NBC | — |

## (b) Searched for and NOT found

- "data centre", "data center", "computer room/facility", "server room", "electronic data", "information technology", "NFPA 75" as a classification: none in NBC, BCBC, VBBL, NBC(AE), NFC, NFC(AE). Only hits: "computer rooms" in a live-load table, "computer server rooms" in BCBC energy text, VBBL hazard table "Computer Centres" (D).
- Any numeric threshold that turns battery or fuel quantity into F-1: none.
- "battery", "lead-acid", "lithium", "energy storage" as an occupancy or separation rule: none.
- "greenhouse" in Table 3.1.2.1 examples: none (only Group G farm text, NBC).
- "emergency shelter", "reception centre", "warming/cooling centre": none in NBC, BCBC, AB; VBBL only for temporary or existing buildings (Part 13).
- A Part 3 article saying in words that egress may not pass through another suite or occupancy: none found; only 3.3.1.3.(8)–(9).
- Any prohibition on assembly above or beside F-2: none.
- Any rule placing the "imaginary line" between two buildings on one lot: none.
- Any BCBC or NBC(AE) change to 3.1.3.2, 3.2.2.8, 3.4.4.2, 3.1.10.2: none (texts identical).

## (c) Open questions

1. Data hall class: D (VBBL "Computer Centres"), F-2 or F-3 (fire load vs 1,200 MJ/m²)? Needs an AHJ ruling or a fire-load calculation. This sets 0 h vs 2 h to the public floor and whether housing is capped at one suite.
2. Do the City of Vancouver and Edmonton accept the VBBL hazard table as a classification guide for new buildings? ?
3. Do installed UPS batteries count as "stored" dangerous goods (NFC 3.2.7)? Our reading: no ("in use"); not confirmed.
4. Urban greenhouse: F-2, F-3 or A-2? Not settled by any code text.
5. Overnight refuge as C in an F-2 building conflicts with 3.1.3.2.(2); does VBBL 13.4.4.1 "notwithstanding" cover a new building's planned temporary use? Our reading: no (13.1.1.3) ?
6. Compared later: 3.3.1.23, 3.3.5.8 same in all 4; 3.2.2.76 same (BC/VBBL add 3.2.2.93 ref); 3.6.2.7 BC/VBBL tie the vault to the Safety Standards Act, AB to the Canadian Electrical Code Regulation. Not compared: 3.1.18.2, 3.2.2.77–3.2.2.91, 3.3.5.2–3.3.5.7, 3.3.6.x, 3.4.6.10 ?
7. No paywalled standard newly needed (NFPA 75 / FM 5-32 already logged).
