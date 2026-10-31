# Independent check of the adjacency findings

Check of 31 Oct 2026, done as set out in ADJ_CHECK_BRIEF.md. The three files were written by other agents.

**Method**
- **Code rows:** Each article was pulled from all four local building-code texts (nbc.txt, bcbc2024.txt, vbbl2025_v1.txt, nbc_ab2023.txt). Whitespace was normalized and the texts were compared word by word. NFC and NFC(AE) were compared the same way.
- **Tables:** These tables were read on the PDF page images: NFC Tables 3.2.7.1 (pp. 122–123), 3.2.7.6 (p. 126) and 4.3.13.4.-A/-B (p. 188).
- **Web rows:** Each URL was opened with the web fetch tool. Plain downloads from the container were refused by the egress proxy (403, a policy denial). They were not retried.
  - **Edmonton Bylaw 14600** (C14600.pdf): the site refuses the fetch (robots). It was checked against the copy saved earlier in the scratchpad (14600.txt, consolidated 22 Oct 2024).
  - **Edmonton Bylaw 20001:** checked against the local text data/raw/edm/bylaw/b.txt.

**Verdicts:** CONFIRMED / WRONG / PARTLY / UNREACHABLE.
- **"All 4"** means the text was found the same in NBC, BC, VBBL and AB.
- **Codes column too narrow:** where a file said "NBC (others ?)" and the text turned out to be the same in all four, the verdict is PARTLY. The fix is to widen the codes column.

---

## 1. adj_occupancy.md

### Correction to spatial_rules.md

| row | verdict | evidence | fix |
|---|---|---|---|
| D / F-1 = 3 h; D / F-2 = "—" (Note 8) | CONFIRMED | Table 3.1.3.1 text: "D … — (8) 3 — (8) — (8)". BC drops Notes 7 and 8. VBBL Note (7) = "See Article 3.2.1.7." and VBBL has no Note 8. | — |

### §1 Classification

| row | verdict | evidence | fix |
|---|---|---|---|
| Classify by every major occupancy 3.1.2.1.(1)–(2) | PARTLY | Wording is the same in all 4. The BC and VBBL exception list reads "Articles 3.1.2.3. to 3.1.2.5., and 3.1.2.7.". VBBL 3.1.2.1 does **not** name 3.1.2.9. | Drop "(and VBBL 3.1.2.9)". 3.1.2.9 is a stand-alone permission. |
| Same Division = one occupancy 3.1.2.2.(1) | CONFIRMED | Same in all 4 | — |
| Library A-2 | CONFIRMED | Note A-3.1.2.1.(1) "Libraries" under A-2, all 4 | — |
| Café A-2; VBBL 3.1.2.9 → E if ≤16 | CONFIRMED | VBBL 3.1.2.9: "not more than 16 persons consuming food or drink" | — |
| Small assembly suite 3.1.2.7 (BC, VBBL) | CONFIRMED | Text matches. Note A-3.1.2.7 names "Group F, Division 1". Not in NBC or AB. | — |
| Indoor pool A-3 | CONFIRMED | "Indoor swimming pools, with or without spectator seating", all 4 | — |
| Outdoor pool | CONFIRMED (reading: agree in part) | A-4 examples are bleachers, grandstands, stadia only | Add: in Alberta, aquatic facilities are also governed by NBC(AE) Part 7 whether indoor or outdoor (see programs §2). |
| Laundromat D | CONFIRMED | "Laundries, self-service"; VBBL hazard table "Laundries (Self-Serve)" | — |
| Industrial laundry F-2 | CONFIRMED | "Laundries, except self-service"; VBBL "Laundries (not self-serve)" | — |
| Common laundry room 3.3.1.23 | CONFIRMED | Same in all 4; 1 h / 45 min / none if sprinklered | — |
| Greenhouse (farm) G-3 | PARTLY | NBC: "Agricultural occupancy (Group G) … located on land that is associated with and devoted to the practice of farming" (CONFIRMED). VBBL defines only "Farm building" and G-1 (Group G, Division 1). It has **no** G-3 definition. BC has the G-3 definition. Part 2 is "Reserved" in BC, VBBL and AB. | Replace "VBBL has the definition" with "VBBL defines farm building and G-1 only". |
| Greenhouse (urban) reading F-2/F-3/A-2 | CONFIRMED (reading: agree) | No farm land → not Group G in any code. NBC Div. A 1.3.3.6.(2) also sends occupant load >1 person/40 m² to Table 3.1.2.1. | — |
| If Group G applied (2.2.1.2.(2); Table 2.2.1.4) | CONFIRMED | NBC text: G-3 row A-2 1, A-4 1, C 1, F-1 2, G-1 2, D/E/F-2/F-3 "–" | — |
| Daytime refuge A-2 (reading) | CONFIRMED (reading: agree) | "Community halls" under A-2. No refuge example. | — |
| Overnight shelter C; VBBL 13.4.4.1 | CONFIRMED | 13.4.4.1.(1)(a)–(l) as stated. 13.1.1.3.(1): measures "do not apply to new work". Fixed-term shelter in (2) needs a temporary or CSA Z240 building that is sprinklered. | — |
| Childcare | PARTLY | BC 3.1.2.8 = A-2 (CONFIRMED). VBBL Table 3.1.2.8: >8 children → A-2. 3–8 → C. Note (1) rows (≤2 dwelling units or row housing): **no** separation. 3.1.2.8.(2): rating "need not exceed" the floor rating. BC 3.3.2.18.(1): sprinklered, **or** "not more than 1 storey above or below a storey with an exit that opens directly to the exterior … at ground level". AB A-2 / C: CONFIRMED. BC and VBBL also list "Daycare Facilities for Children" in Note A-3.1.2.1.(1) under A-2. | Add Note (1) and 3.1.2.8.(2). |
| Maker space / studios | CONFIRMED | "Workshops" under F-2 and F-3; "Art galleries" and "Schools and colleges, nonresidential" under A-2 | — |
| Housing C | CONFIRMED | "Apartments" | — |

### §2 Data centre class

| row | verdict | evidence | fix |
|---|---|---|---|
| Data centre named? | CONFIRMED | No hits in the 6 codes (see absences) | — |
| Nearest examples | CONFIRMED | "Electrical substations" F-2; "Power plants" F-3; "Radio stations", "Offices" D | — |
| VBBL "Computer Centres" D | CONFIRMED | VBBL Table A-11.5.1.1.(3): Group D, "Computer Centres 3 4"; also "Communications Offices (Telephone Exchange)" | Reading (an explanatory Part 11 table, not a classification): agree |
| F-2 / F-3 boundary | CONFIRMED | "not more than 50 kg/m2 or 1 200 MJ/m2", all 4 | — |
| Fire load definition | CONFIRMED | Quote exact | — |
| Data hall "industrial"? | CONFIRMED (reading: agree) | Group F and Group D definitions quoted exactly | — |
| F-1 definition, no threshold | CONFIRMED | Quote exact | — |
| Generator fuel tanks (NFC 4.3.13) | PARTLY | 4.3.13.1.(1)(b) and Table 4.3.13.4.-B confirmed on PDF p. 188 (200,000 L first storey; 20,000 / 45,000 L basement and upper). Same in NFC(AE). But 4.3.13.5.(1) double-wall / 300° secondary containment applies to tanks **>2,500 L up to 20,000 L**. Tanks >20,000 L go to 4.3.1.2.(1)(l) (4.3.13.5.(2)). | Correct "tanks >2,500 L double-walled". |
| Fuel "in use" Note A-3.3.6.1.(1) | PARTLY | Same wording in all 4 | Codes: all 4 |
| DG thresholds NFC Table 3.2.7.1 | CONFIRMED | PDF p. 123: Class 8 PG I/II/III 500 / 1 000 / 2 000 kg or L; Class 9 "See Article 3.1.2.1." Note (10) also defers small-quantity exemptions to "other authorities". | — |
| Batteries in building codes: none | CONFIRMED | See absences | — |
| NFC 2.2.1.1.(2) F-1 room | CONFIRMED | NFC and NFC(AE) | — |
| Sprinklers 3.2.2.18.(2); VBBL | CONFIRMED | VBBL 3.2.2.18.(3) and Div. A 1.3.3.6.(1) both say "all newly constructed buildings". 1.3.3.6.(2)(e) CBO exception quoted correctly. VBBL 3.2.2.18.(4) adds: assembly in a basement → basement sprinklered. | — |

### §3 Table 3.1.3.1 and notes

| row | verdict | evidence | fix |
|---|---|---|---|
| Matrix (A, B, C, D, E, F-1, F-2/F-3 vs F-2, F-3, F-1, D) | CONFIRMED | Every cell matches the table text (NBC = AB, character for character) | — |
| 3.1.3.1.(1) | CONFIRMED | All 4 same | — |
| Notes (1), (2), (6) | CONFIRMED | — | — |
| Note (3) | CONFIRMED | BC and VBBL: "3.2.2.51." only | — |
| Note (4) | CONFIRMED | BC and VBBL: "3.2.2.60." only | — |
| Note (5) / 3.1.3.1.(2) | CONFIRMED | — | — |
| Note (7) | CONFIRMED | VBBL: "See Article 3.2.1.7." | — |
| Note (8) | CONFIRMED | Not in BC or VBBL | — |
| 3.1.3.1.(3) | CONFIRMED | — | — |
| VBBL 3.2.1.7 | CONFIRMED | 2 h concrete, masonry or EMTC (sprinklered); 1.5 h to storage garage | Add 3.2.1.7.(4) (non-C/D use on storeys 2–3 → sprinklered, ≥2 horizontal fire compartments). |

### §4 Prohibited combinations

| row | verdict | evidence | fix |
|---|---|---|---|
| 3.1.3.2.(1) | CONFIRMED | All 4 same | — |
| 3.1.3.2.(2); VBBL exception | CONFIRMED | VBBL: "Except as permitted in Article 3.1.3.4. and 3.1.3.5., and Subsection 11.2.5." | — |
| VBBL 3.1.3.5 flex space | CONFIRMED | All clauses (a)–(l) and (2) match. Reading (a data hall >500 m² does not fit): agree. | — |
| VBBL 3.1.3.4 artist live/work | CONFIRMED | Spatial separation per Table 3.2.3.1.-E as F-2; NFPA 13 OH1 | — |
| Air-supported 3.1.18.2.(2) | PARTLY | Same in all 4. 3.1.18.2.(1): not "above the first storey on any building". | Codes: all 4. Add (1); this rules out a roof greenhouse dome. |
| 3.3.2.16 | CONFIRMED | Only the fire code name differs | — |
| 3.3.5.8 | CONFIRMED | All 4 same. Reading (diesel not triggered): agree, since it applies only to flash point below 37.8 °C. | — |
| 3.3.3.2 | CONFIRMED | All 4 same | — |

### §5 Stacking

| row | verdict | evidence | fix |
|---|---|---|---|
| 3.2.2.5 | PARTLY | Same in all 4 | Codes: all 4 |
| 3.2.2.6 | CONFIRMED | BC and VBBL add 3.2.2.93 refs and (2) | — |
| 3.2.2.7.(1) | CONFIRMED | BC and VBBL add (3). VBBL misprints "3.2.2.9.3." | — |
| 3.2.2.7.(2) | CONFIRMED | — | — |
| 3.2.2.8 | CONFIRMED | — | — |
| Assembly above F-2 (no prohibition) | CONFIRMED (reading: agree) | Only 3.1.3.2 prohibits | — |
| 3.2.2.76 | PARTLY | Same in all 4 (BC and VBBL add the 3.2.2.93 ref) | Codes: all 4 |
| 3.2.2.77 | PARTLY | Same in all 4 | Codes: all 4 |
| 3.2.2.78, 3.2.2.80 | PARTLY | Same in all 4. Areas: 3.2.2.78 ≤1,500 m² (1,070 m² at 3 storeys facing 1 street); 3.2.2.80: 1 storey 1,000–1,500 m², 2 storeys 600–900 m². | Codes: all 4 |
| 3.2.2.91 | PARTLY | Same in all 4 | Codes: all 4 |
| 3.2.2.13 | CONFIRMED | BC and VBBL cite "3.2.2.93." | — |

### §6 Suites and rooms

| row | verdict | evidence | fix |
|---|---|---|---|
| 3.3.1.1.(1)–(2) | PARTLY | VBBL also adds (4) "No fire separation is required between suites of business and personal services occupancy". VBBL (1) is reworded to "a suite". | Differences: BC **and** VBBL add (4). |
| 3.3.1.1.(3) | CONFIRMED | Includes fast-food vending without seating | — |
| VBBL 3.3.1.1.(5)–(6) | CONFIRMED | Quote exact | — |
| 3.3.4.2 | CONFIRMED | VBBL adds (6) | — |
| 3.3.2.13 libraries | CONFIRMED | All 4 same | — |
| 3.3.2.2 | PARTLY | Same in all 4 | Codes: all 4 |
| 3.3.5.3.(1) | CONFIRMED | — | — |
| 3.3.5.2 | CONFIRMED | BC: BC Fire Code; VBBL: Fire By-law; AB: NFC(AE) only | — |
| 3.3.5.5, 3.3.5.6, 3.3.5.7 | PARTLY | Same in all 4 | Codes: all 4 |
| 3.3.6.2.(1)–(2) | CONFIRMED | — | — |
| 3.3.6.3.(1) | CONFIRMED | — | — |
| 3.3.6.2.(4) | PARTLY | BC and VBBL: "as required by the Safety Standards Act and pursuant regulations". AB: "the Electrical Code Regulation". | Add the differences |
| 3.6.2.1.(1), (5), (6) | PARTLY | AB wording is "the Electrical Code Regulation made pursuant to the Safety Codes Act", not "Canadian Electrical Code Regulation" | Fix the AB name (also in the 3.6.2.7 note in (c)6) |
| 3.6.2.2 | CONFIRMED | — | — |
| 3.6.2.7 | PARTLY | Text confirmed. Same in all 4 except the trigger wording (BC and VBBL: Safety Standards Act; AB: Electrical Code Regulation). | Codes: all 4 |
| 3.6.2.8 | CONFIRMED | — | — |

### §7 Separate buildings

| row | verdict | evidence | fix |
|---|---|---|---|
| Limiting distance definition | CONFIRMED | All 4 | — |
| Imaginary line; Note A-3.2.3 legal agreement | CONFIRMED | "legal agreements … registered with the titles", all 4 | — |
| 3.2.3.1.(1) tables -B / -C / -D / -E | CONFIRMED | -B: "Groups A, C, D, and F, Division 3"; -C: "Groups E and F, Division 1 and 2". AB (8): "capable of beginning suppression activities arrives". Other AB differences are text-extraction artefacts. | — |
| 3.2.3.6.(1)(b) | CONFIRMED | — | — |
| 3.2.3.11 | PARTLY | Same in all 4 | Codes: all 4 |
| 3.1.18.3 tents 3 m | PARTLY | Same in all 4; VBBL adds (5) | Codes: all 4 |
| 3.1.10.2 firewall | PARTLY | 4 h / 2 h confirmed. But 3.1.10.2.(4): a firewall rated ≤2 h "need not be constructed of masonry or concrete" if protected against damage and designed to 4.1.5.17. | Replace "masonry or concrete" with "masonry or concrete (4 h); ≤2 h may be other construction per (4)" |

### §8 Egress

| row | verdict | evidence | fix |
|---|---|---|---|
| 3.3.1.3.(8) | PARTLY | Wording confirmed for NBC and AB. In **BC and VBBL it is 3.3.1.3.(11)** (renumbered after the roof-occupancy sentences). | Cite (8) NBC/AB, (11) BC/VBBL. Reading: see absences. |
| 3.3.1.3.(9) | PARTLY | It is **(12)** in BC and VBBL | Same renumbering |
| AB 3.3.1.3.(10) | CONFIRMED | Quote exact; AB only | — |
| 3.4.1.2.(1) | CONFIRMED | — | — |
| 3.4.4.1 (shared exits; reading) | CONFIRMED (reading: agree) | All 4 same | — |
| 3.4.4.2.(2)(c) | CONFIRMED | All 4 same | — |
| 3.4.4.4.(6)–(8) | PARTLY | Same in all 4 | Codes: all 4 |
| 3.4.6.16.(5); VBBL (8) | CONFIRMED | VBBL (8) quoted correctly | — |
| 3.4.4.4.(1); VBBL (f) | CONFIRMED | — | — |
| 3.4.1.6, 3.4.6.10.(1) | PARTLY | Same in all 4 | Codes: all 4 |
| 3.3.1.4 | PARTLY | Same in all 4; "care, treatment or detention … or residential" | Codes: all 4 |
| Table 3.4.2.1.-A F-2 150 m² / 10 m | CONFIRMED | — | — |

---

## 2. adj_service.md

| row | verdict | evidence | fix |
|---|---|---|---|
| Service room Note A-1.4.1.2.(1) | PARTLY | Quote found in all 4 | Codes: all 4 |
| 3.6.2.1.(1), (2), (9), (10) | CONFIRMED | All 4 same. Reading (genset as "appliance" ?): agree it is open. | — |
| 3.6.2.1.(5) | CONFIRMED | Diesel flash point is not in any code (re-searched) | — |
| 3.6.2.1.(6) | CONFIRMED | Trigger wording per code as stated | — |
| 3.6.2.1.(7)–(8) | CONFIRMED | — | — |
| 3.6.2.2 | CONFIRMED | — | — |
| 3.6.2.3 | CONFIRMED | — | — |
| 3.6.2.6 | CONFIRMED | — | — |
| 3.4.4.4.(4), (7), (8) | PARTLY | Same in all 4 | Codes: all 4 |
| 3.6.2.5 | CONFIRMED | — | — |
| 3.6.2.7.(1)–(9) (six rows) | CONFIRMED | All values (3 h / 2 h; 40 °C; 100 mm; secured) match | — |
| 3.6.2.8 | CONFIRMED | — | — |
| Non-life-safety generators; Note A-3.2.7.8.(3) | CONFIRMED (reading: agree) | Note in all 4 (BC: BC Fire Code; AB: NFC(AE)) | — |
| 3.2.7.5 CSA C282 | CONFIRMED | — | — |
| Refrigeration 6.2.1.5 | PARTLY | NBC B52:18 and AB B52:23 confirmed. BC: "a) Safety Standards Act … b) reserved, c) CSA B139 …, d) reserved". **VBBL 6.2.1.5.(1) cites only "the Safety Standards Act and pursuant regulations"**: no B52 and no B139 in the clause. B52:18 appears only in VBBL's reference table. | Replace "V lists B52:18 (clause text not read ?)" with the VBBL wording. |
| 3.3.1.21 | PARTLY | Same in all 4 (explosion relief per Subsection 6.3.1 and 6.9.1.2). Reading (hydrogen hook): agree. | Codes: all 4 |
| 3.6.1.2 | CONFIRMED | — | — |
| Table 3.6.3.1 | CONFIRMED | Same in all 4 | — |
| 3.6.3.1.(5) | CONFIRMED | — | — |
| 3.6.3.4 | CONFIRMED | Same in all 4 | — |
| 3.6.3.3.(9), (11) | CONFIRMED | — | — |
| 3.6.3.5 | PARTLY | Same in all 4 | Codes: all 4 |
| 3.6.4.3; 6.3.2.11.(3) | CONFIRMED | — | — |
| Batteries: none | CONFIRMED | See absences | — |
| NFC 3.1.3.3 | CONFIRMED | NFC = NFC(AE) | — |
| NFC Table 3.2.7.1 Class 9 | CONFIRMED | PDF p. 123. Supporting text: 3.2.7.1.(1) covers dangerous goods "in packages or containers". | Add as support for the "in use ≠ storage" reading. |
| NFC 4.1.1.1.(3)(b) | CONFIRMED | — | — |
| B139 Notes | CONFIRMED | A-4.3.13.4.(1)(b) (2,500 / 5,000 L) and A-4.1.1.1.(3)(b) ("diesel-engine-driven emergency generators"); also in NFC(AE) | — |
| NFC 4.3.13.1.(1)(b) | CONFIRMED | — | — |
| Table 4.3.13.4.-B | CONFIRMED | PDF p. 188 | — |
| 4.3.13.5.(1) | CONFIRMED | — | — |
| 4.3.14.1–4.3.14.2 | CONFIRMED | NFC = NFC(AE) | — |
| 4.3.13.7 | CONFIRMED | — | — |
| 4.3.13.2 | CONFIRMED | — | — |
| 4.3.13.6 | CONFIRMED | — | — |
| 4.2.2.1.(1) | PARTLY | NFC(AE) same | Codes: NFC, NFC(AE) |
| Outdoor tanks 4.3.2.1–4.3.2.4 | CONFIRMED | Table 4.3.2.1; 1.5 m ≤50,000 L (AB 80,000 L); 0 m ≤2,500 L; S655; LPG 6 m; 60 m | — |
| Tank vents 4.3.5.2 | CONFIRMED | NFC = NFC(AE) | — |
| Pool chemicals Note A-3.3.6.2.(2) | PARTLY | Text exact; in all 4 | Codes: all 4 |
| Table 3.2.7.1 oxidizers, corrosives, toxic gases | CONFIRMED | PDF p. 122: 5.1 250 kg or 250 L; 2.3 "0" | — |
| 3.3.6.2.(1); NFC 3.2.7.5.(6) | CONFIRMED | — | — |
| Table 3.2.7.6 | CONFIRMED | PDF p. 126, oxidizer row: acids X, bases 1m, flammable liquids X, toxic gases 1m | — |
| NFC 3.2.7.8.(2) | CONFIRMED | — | — |
| Chlorine cylinders NFC 3.2.8.3; NBC 3.3.6.3.(2) | CONFIRMED | 1 h, gas-tight, exterior wall and entry, ventilation to outdoors, no combustibles | — |
| Pool mechanical room 3.6.2.1.(7) | CONFIRMED (reading: agree) | — | — |
| 3.3.1.23 | CONFIRMED | — | — |
| 6.3.2.10.(7)–(9) | CONFIRMED | AB additions as stated | — |
| NFC 2.4.1.4 | PARTLY | NFC(AE) adds: "vents and associated piping shall be cleaned at intervals frequent enough…" | Add the AB difference |
| 6.3.1.6 kitchen NFPA 96 | PARTLY | **VBBL 6.3.1.6.(2)–(4) add:** commercial cooking exhaust ending within 3 m of a lane or property line needs an "ecology unit" (99.97 % grease removal). The exhaust must not fall on pedestrians, must not accumulate over outdoor seating, and must meet the Noise Control By-law. | Add the VBBL row |
| 6.9.1.3 | CONFIRMED | Same in all 4 | — |
| NFC 2.6.1.9; Note | CONFIRMED | 12 months / 3 months | — |
| Table 6.3.2.9 | CONFIRMED | Values exact; BC and VBBL (2)(a) "reserved" | — |
| 6.3.2.9.(3) | CONFIRMED | — | — |
| 6.3.3.1.(2) | CONFIRMED | — | — |
| 6.3.3.1.(1) appliance vents (reading) | PARTLY | Text confirmed. In BC and VBBL, 6.2.1.5 no longer lists the standards, so the (1) route leads to the Safety Standards Act, not B139 directly. | Note the BC/VBBL route |
| 6.3.2.15.(5), (6) | CONFIRMED | VBBL Guideline 12 s. 8.2.4 and sampling port; AB plumbing-regulation link | — |
| 6.2.1.2 / 6.3.2.14 / Note | CONFIRMED | BC and VBBL "Reserved"; AB keeps the values | — |
| VBBL 6.3.2.14 MERV 13 | CONFIRMED | — | — |
| 6.3.1.5.(2) | PARTLY | Same in all 4 (VBBL rewords the authority) | Codes: all 4 |
| 6.9.1.2.(1) | CONFIRMED | — | — |
| 6.3.2.17.(1)(b) | CONFIRMED | All 4 | — |
| 6.3.1.3.(3) | CONFIRMED | — | — |
| 6.3.2.10.(5) | CONFIRMED | — | — |
| 3.2.5.4 | CONFIRMED | VBBL: "Every building" | — |
| 3.2.5.5.(1) | CONFIRMED | VBBL wording as stated | — |
| 3.2.5.5.(2)–(4) | CONFIRMED | — | — |
| 3.2.5.6.(1); VBBL (3) | CONFIRMED | VBBL path ≥1.2 m (900 mm for one dwelling unit) | — |
| 3.2.5.15 | CONFIRMED | AB (3) 3–15 m; VBBL within 5 m, 1 m clear, visible from street | — |
| 3.2.5.1; VBBL (4) | CONFIRMED | — | — |
| VBBL 3.2.5.19 | CONFIRMED | — | — |
| VBBL 3.2.5.20 | CONFIRMED | Trigger is ">1 storey in the basement" or ">1200 m² of floor area in the basement" | — |
| 3.2.4.2.(2)–(5) | CONFIRMED | All 4 same | — |
| 3.2.4.1.(1) | CONFIRMED | — | — |
| 3.2.5.12 NFPA 13 | CONFIRMED | — | — |
| 3.6.2.7.(3) | CONFIRMED | — | — |
| NFC 2.1.3.5 / NFPA 2001 | CONFIRMED | NFC(AE) adds "g) NFPA 2001" and "c) NFPA 750"; halon note quoted | — |
| Gas suppression vs adjacent rooms: none | CONFIRMED | — | — |
| VBBL Div. C 2.2.10.3.(2)–(3) | CONFIRMED | — | — |
| FCL 4.6 m; setbacks 2.2.10.4 | CONFIRMED | 30 / 15 / 5 / 7.5 m; plus (e) bluff 3× height | — |
| Book II 2.2.11.4 | CONFIRMED | — | — |
| Book II 2.2.11.6 | CONFIRMED | Permit, 1-year contract, monthly tests (≤33 days apart); no distance | — |
| AB 3.6.4.7 | CONFIRMED | Not in NBC | — |

---

## 3. adj_programs.md (+ sources.json)

| row | verdict | evidence | fix |
|---|---|---|---|
| Key finding: no childcare/pool/food rule bars siting | PARTLY | True for provincial regulations. But Edmonton s. 6.40.1.1 (b.txt) bars childcare "in a building bay Abutting a Minor Industrial Use". "Minor Industrial" covers storing and handling of goods; data centres are not named. | State 6.40.1.1 in full (zoning.md already has it). |
| Key finding: AB 30 m food setback | CONFIRMED | s. 2.1(b): "Generally a minimum set back of 30 metres is recommended", greater or lesser accepted on site conditions | — |
| Key finding: AB pool rules in Part 7 | CONFIRMED | — | — |
| Key finding: Edmonton 1.5 km | CONFIRMED | 7.140 8.1.1 / 8.1.2.2 exact (b.txt). Sensitive Use definition exact. | — |
| Key finding: greenhouse status differs by code | **WRONG** | NBC also limits Group G to "land that is associated with and devoted to the practice of farming" (Agricultural occupancy definition). So the BC versus NBC contrast is false. | "In no code is a greenhouse on a data-centre site Group G; it is classified under Part 3." |
| Key finding: NFPA 75 6.1.3.2 | CONFIRMED | Public-input report: PI 50 and PI 95 quote it; PI 95 proposes "for both verticle and horizontal separations" | — |
| BC CCLR s. 13(1) | CONFIRMED | Full sentence ends "while children are under the supervision of employees" | — |
| s. 17 | CONFIRMED | — | — |
| s. 16(1)(a), 16(2.1)(b), 16(3)(a) | CONFIRMED | 16(3)(a): "enclosed in a manner that is suitable … and will ensure that children are free of harm" | — |
| Sch. B s. 6 site plan | PARTLY | It is **Sch. B s. 6(c)(iii)**, and it covers the plan for outdoor activities **off the property** | Reading ("loading dock judged via this clause") is not supported. Drop it, or cite s. 17 / 13 instead. |
| s. 15(3) | CONFIRMED | — | — |
| s. 20(1) | CONFIRMED | — | — |
| s. 22(1)(a)(i) | CONFIRMED | — | — |
| Van DG 1.1(b) | CONFIRMED | Continues "to avoid traffic related air pollution and noise impacts" | — |
| DG 1.2 | CONFIRMED | — | — |
| DG 1.6(d), (f) | CONFIRMED | — | — |
| DG 4.1(c) | CONFIRMED | — | — |
| DG 4.2(a) | CONFIRMED | — | — |
| DG 4.6(a) | CONFIRMED | — | — |
| DG 4.7(a), (c) | CONFIRMED | — | — |
| Tech 3.15 | PARTLY | Intakes quote exact. Also "Units shall not be located over parking stalls". | — |
| Tech 3.6 acoustics | PARTLY (json WRONG) | 55 dB(A) 24-h equivalent = **outdoor play areas**; 45 dB(A) = interior "spaces occupied by children"; STC 65 = party walls | Remove "?". Fix the json, which wrongly says "interior max 55". |
| Tech 2.11, 3.12 | CONFIRMED | 3.12 "Specialties – Elevator": "should not open directly into any secure childcare space" | — |
| Tech 2.2 balconies | PARTLY | Conditional: in mixed-use buildings, "design … such that balconies do not occur immediately above". If unavoidable, mitigate. | Say "avoid; if unavoidable, mitigate" |
| Tech 3.5 | CONFIRMED | — | — |
| Tech 3.16 | PARTLY | Begins "Where the building has an emergency generator…" | Add the condition; the reading still stands |
| AB handbook (approvals; Step 5) | CONFIRMED | Step 8 not checked separately | — |
| AB handbook outdoor play | CONFIRMED | — | — |
| AHS guide engines and intakes | CONFIRMED | p. 9 | — |
| AHS guide mechanical rooms | CONFIRMED | p. 23 | json: food-separation sentence is p. 12, not p. 11. AHS lists 6 regulations (adds Communicable Diseases and Housing). |
| BC Pool Reg s. 7(1) | CONFIRMED | — | — |
| s. 11(2)(h) | CONFIRMED | — | — |
| BC Pool Guidelines 3.1 | CONFIRMED | — | — |
| Spectators BC 3.8 / AB 7.2.2.2.(1) | CONFIRMED | BC adds "a physical barrier … should be in place" | — |
| Guidelines 9.8 | CONFIRMED | — | — |
| 9.9 | CONFIRMED | — | — |
| 6.3 | CONFIRMED | Edition "Version 3, 2025" | — |
| AB 7.2.3.38.(1)–(2) | CONFIRMED | — | — |
| 7.2.3.39.(2) | CONFIRMED | Reading (heat-pump room ?): agree it is open | — |
| 7.2.3.45 | CONFIRMED | Also (b) "only chlorination equipment" in the room | — |
| STANDATA 19-BCI-008 | CONFIRMED | Dec 2019; interprets NBC(AE) **2019** 7.2.3.45 | — |
| AB Pool Standards 2.4 | CONFIRMED | July 2014, amended 2017 | — |
| BC FPR s. 3(1) | CONFIRMED | — | — |
| s. 4(1)(d) | CONFIRMED | — | — |
| AB Food Code 2.1 | CONFIRMED | — | — |
| 2.17(b) | CONFIRMED | — | — |
| 2.9(d) | CONFIRMED | — | — |
| Metro 2050 Guideline | CONFIRMED | Nov 2023; no data-centre mention | — |
| RTS 16078 memo | CONFIRMED | 17 Mar 2025; "emerging framework" | — |
| BCCDC Principle 4 | CONFIRMED | p. 52, v2.0 May 2018 | — |
| Edmonton 7.140 subs. 8 | CONFIRMED | b.txt | Reading: 8.1.1 applies to the data-centre DP itself if diesel counts as Dangerous Goods. Agree, still "?". |
| Edmonton Risk Guidelines | CONFIRMED | June 2019; Figure 1 values are an image, not read | — |
| Bylaw 14600 ss. 19–22 | CONFIRMED (local copy; URL refused by site robots) | Exceedance allowances: s. 19 70–85 dB(A); s. 21 80–85 dB(A) | Reading (on-lot housing not protected): agree |
| AHS Reception Centres (5 rows) | CONFIRMED | pp. 3, 4, 17; PUB-0539-202405 | — |
| BC ESS / JIBC none | not re-opened (earlier source) | — | — |
| Greenhouse definition (NBC, BC) | CONFIRMED | VBBL has no G-3 definition | — |
| 1.1.1.1.(3), 1.3.3.5; BC/VBBL 1.1.1.1.(4); AB 1.1.1.1.(4)(a) | CONFIRMED | — | — |
| 1.3.3.6.(2) | CONFIRMED | — | — |
| BC farm building definition | CONFIRMED | Full: "does not contain a residential occupancy and that is associated with and located on land devoted to the practice of farming" | — |
| 2.2.1.2.(2) | CONFIRMED | — | — |
| Table 2.2.1.4 | CONFIRMED | — | — |
| 2.2.1.7.(2) | CONFIRMED | — | — |
| VBBL 1.3.3.6.(2)(j) | CONFIRMED | — | — |
| AB OHS CO2 | CONFIRMED | AR 191/2021: 5000 ppm / 9000 mg/m³; 30,000 / 54,000 | — |
| CSA Z32:21 scope | CONFIRMED | — | — |
| Z317.2:24 | CONFIRMED | Published 2024-10-31 | — |
| NFPA 75 6.1.3.2, 1.3.1 | CONFIRMED | PI 57: "Applying the standard optionally based on a risk assessment (often poorly executed)" | — |
| FM 5-32 / TIA-942 / ISO 22237 not read | not re-tried | Logged as paywalled | — |

---

## Absences re-searched

All searches ran on the normalized texts of the 6 codes, case-insensitive.

**Holds: no hits**
- "data cent", "computer room/facility/centre", "server room", "NFPA 75". Only "computer rooms" (live-load table), BCBC "computer server rooms" (energy) and VBBL "Computer Centres".
- "lithium", "energy storage", "uninterruptible", "lead-acid", "stationary batter". "Battery" hits are only smoke alarms, emergency power, truck charging (NFC 3.1.3.3) and the A-3.2.7.8.(3) note.
- A numeric F-1 threshold.
- Diesel flash point.
- "chlorin" in NBC, BCBC and VBBL (0 / 0 / 0; NBC(AE) 37).
- A refrigeration "machinery room" clause ("machinery rooms" appears only in an alarm-zoning note).
- An "imaginary line" placement rule. All hits are the definition, 3.2.3.6.(5) and soffit notes.
- An assembly-above-F-2 prohibition.
- Gas suppression adjacency.
- NFPA 2001 in NFC 2020 (it is in NFC(AE) only).
- Pool-chemical or pool-plant room clauses in NBC, BCBC or VBBL.
- "emergency shelter" outside VBBL Part 13 (13.1.1.2, 13.4.4).

**Changes to the record: found, but not a real exception**
- **Egress through another suite or occupancy:** the Part 3 absence holds. But NBC/BC/AB **9.9.7.5** (Part 9 only) says "Required access to exit from suites shall not be through any other dwelling unit, service room or other occupancy". Also, **VBBL 3.3.1.13.(11)** expressly allows egress from a public corridor "through a suite of Group D occupancy" with a mag-lock, under conditions. So Part 3 does not forbid it outright.
- **Fire-code distance from outdoor tank to exit or intake:** none as a distance. But **NFC 2.8.2.7** requires the spill plan to direct spills away from "means of egress" and "air intakes and openings that could allow vapour to enter the building".
- **Childcare next to industrial:** provincial rules hold (BC CCLR read to the end, including Sch. B and F). Edmonton s. 6.40.1.1 (building bay abutting a Minor Industrial Use) is the one direct bar. It was in zoning.md but missing from adj_programs.md.

**Holds (web)**
- No siting rule in the BC Pool Reg or BC FPR (both re-read).
- No numeric buffer in Metro 2050, RTS 16078 or BCCDC. Only part of the BCCDC appendix was read.
- No hazard distance in the AHS reception guide.

**Holds as "not compared"**
- occupancy (c)6: the listed articles are now compared; all are the same except the notes above.

## Corrections that change the design

1. **Greenhouse:** an urban greenhouse on a data-centre site is **not Group G in any code**, NBC included, since Group G needs farm land. Design it under Part 3 (F-2/F-3, or A-2 if public). Drop the Part 2 G-3 separations (1 h / none) from the tool. A dome-type greenhouse cannot sit on a roof (3.1.18.2.(1)).
2. **Childcare (Vancouver):** the play area must meet **55 dB(A) 24-h equivalent outdoors**, and child-occupied rooms 45 dB(A). This sets plant-to-play-area distance and screening. If the building has a generator, emergency lighting must run on it.
3. **Childcare (Edmonton):** no shared building bay with a Minor Industrial use (s. 6.40.1.1). If the data hall is classed Minor Industrial, childcare needs its own bay.
4. **Café (Vancouver):** a kitchen exhaust ending within 3 m of a lane or property line needs an ecology unit, and must not discharge over outdoor seating (VBBL 6.3.1.6.(2)–(3)). This affects where the café hood vents relative to a public plaza.
5. **Indoor generator fuel tanks >20,000 L** follow 4.3.13.5.(2) (4.3.1.2.(1)(l)), not the double-wall rule.
6. **Firewall between data hall and greenhouse or pool building:** 4 h masonry or concrete stays. Only ≤2 h firewalls may be lighter construction.
7. **Egress:** Vancouver allows public-corridor egress through a D suite under conditions (3.3.1.13.(11)). If the data centre is F-2, no such allowance applies.

Citation-only fixes (no design change): 3.3.1.3.(8)/(9) are (11)/(12) in BC and VBBL; VBBL 6.2.1.5 cites only the Safety Standards Act; the AB Electrical Code Regulation name; widen the codes columns marked PARTLY.
