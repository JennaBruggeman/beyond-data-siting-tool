# Zoning: programs allowed beside a data centre (31 Oct 2026)

Check 1 only. "?" = not confirmed. "Our reading" = our interpretation, not a clause. Ids: existing register ids where they exist (not duplicated); new ids are `arch_zon_*` in zoning_sources.json.

Legend: **O** outright/permitted · **C** conditional (Vancouver) · **D** discretionary (Edmonton) · **NP** not listed = not allowed without rezoning/DC.

## 0. Key findings first

- **Adopted I-3 is read.** The June 2026 adopted I-3 schedule was already saved locally (J.B. upload 14 Oct 2026; same file as sources/library/public/van_zdb_i3/full.pdf, md5 7a93e003…). s. 2.2.11, p. 8: "Bulk data storage is not permitted at the ground floor, except for entrances." This settles the open item on vanI2Ground / arch_covI3Draft2022: the rule is **adopted text**, not only draft.
- **Vancouver zones allowing Bulk Data Storage:** I-2 (C, s. 2.1), I-3 sub-area A only (C), I-1C (C), FC-2 (C, all sub-areas). I-1, I-1A, I-1B, I-4, IC-1–3, M-1, M-2 etc. do **not** list it (vanDistricts; only I-2/I-1C/I-3/FC-2 re-read here). Those schedules could not be fetched (proxy 403); not re-checked.
- **Edmonton has no data-centre use.** City: small data centre "could be considered as a Minor Industrial Use"; AI data centre "a heavy industrial use" (edmLDA26). Bylaw 20001 s. 7.20 subs. 3.3.2: where an activity does not conform to a Use definition and the Development Planner deems it the most appropriate Use, "the Use is always considered a Discretionary Use" (arch_zon_Edm720). So a data centre in BE / IM / IH is **D** (our reading of 7.20 applied to edmLDA26).
  - Minor Industrial: O in BE (enclosed building, 3.2.1), O in IM; IH only "existing as of January 1, 2024".
  - Major Industrial: O in IH; IM only existing as of 1 Jan 2024. BE: NP.
  - Alternative reading ?: Minor Utility lists "switching centres, telecommunications centres" (O in BE, IM, IH). Not how the City frames it.
- **BE, IM, IH have no discretionary-use lists**: every listed use is permitted; anything unlisted is NP (except via 7.20 3.3.2).

## 1. Vancouver (data-centre districts)

All four: June 2026 schedules except I-1C (Nov 2025). Section 2 (June 2026) defines Laundromat (≤300 m²), Laundry or Cleaning Plant, Urban Farm - Class B (may be in a greenhouse), Restaurant 1/2 (≥17 seats); it lists Library and Swimming Pool under Cultural and Recreational Uses (van3575s2).

| Program | I-3 (sub-area A only for data) | I-2 | I-1C | FC-2 |
|---|---|---|---|---|
| Community centre / refuge-type | Community Centre or Neighbourhood House C; Hall C; Social Service Centre C (s. 2.1) | Community Centre C; Social Service Centre C; no Hall | Community Centre not listed (NP); Social Service Centre C; Church O | Community Centre C; Hall C; Social Service Centre C |
| Library | not listed (NP ?) | NP ? | NP ? | NP ? |
| Cultural | Artist Studio A O; Arts and Culture Event O | same | Theatre C; Club O | Theatre O; Artist Studio O; Club C |
| Indoor recreation / pool | Fitness Centre C; Swimming Pool not listed; Beauty and Wellness Centre C "limited to hydrotherapy and thermal therapy" (2.2.12) | No Fitness Centre; Beauty and Wellness C, hydro/thermal only (2.2.10) | Fitness Centre C; Beauty and Wellness C (no limit) | Fitness Centre C; Beauty and Wellness C, hydro/thermal only (2.2.8) |
| Greenhouse / urban farm / nursery | Urban Farm - Class B C; Greenhouse and Nursery not listed | same | same | same |
| Laundromat | NP | C | C | NP |
| Industrial laundry | Laundry or Cleaning Plant C | O | O | C |
| Housing | Dwelling Unit only in sub-area B (C) → **none on a data-centre site** | caretaker unit only (2.2.3), not in sub-areas A/B | caretaker unit only (2.2.3) | Mixed-Use Residential Building C, only in sub-areas B, C1, C2, E; not at grade (2.2.4) |
| Restaurant / café | Restaurant 1 C; Restaurant 2 C (sub-area A); total ≤300 m² (2.2.10); café ≤16 seats as Retail Store (2.2.8) | Restaurant 1 C, ≤300 m² (3.1.1.1(b)(iv)); café ≤16 seats (2.2.6(c)) | Restaurant 1 and 2 C (no cap found) | Restaurant 1 O, Restaurant 2 C; each ≤300 m² (3.1.1.1(c), 3.1.1.2) |
| Childcare | Child Day Care Facility C | C | C | C |

### Ground-floor rules (Vancouver)
| District | Clause | Text | Source | Conf. |
|---|---|---|---|---|
| I-3 | 2.2.11 | "Bulk data storage is not permitted at the ground floor, except for entrances." | van_zdb_i3 | 95 |
| I-3 | 2.2.6 | conditional General Office and Health Care Office "not permitted at the ground floor, except for entrances" | van_zdb_i3 | 95 |
| I-3 | 3.1.2.9 | first floor ≥6.0 m floor-to-floor; above ≥4.0 m (sub-area A) | van_zdb_i3 | 95 |
| I-2 | 2.2.7 | same bulk data storage clause | van_zdb_i2 | 95 |
| FC-2 | 2.2.4 | "Dwelling uses, office uses and bulk data storage are not permitted at grade, except for entrances." | van_zdb_fc2 | 95 |
| I-1C | — | no ground-floor clause for Bulk Data Storage; only creative products manufacturing barred from the first storey (2.2.4) | van_zdb_i1c | 90 |

### Floor area by use (Vancouver)
| District | Rule | Clause | Conf. |
|---|---|---|---|
| I-3 A | Max FSR 3.00: 3.00 for transportation and storage (data), manufacturing, utility etc.; **1.00 for all other uses combined** (community, restaurant, childcare, fitness…); retail ≤1,000 m²; conditional office ≤33 % | 3.1.1.1 | 95 |
| I-3 A | +2.00 FSR by Director for manufacturing, outright service, utility, wholesale, office; **not** transportation and storage | 3.1.1.2 | 95 |
| I-3 | Excluded from floor area: amenity areas "providing a service to the public, including facilities for general fitness, general recreation and child day care", lesser of 20 % of permitted floor area or 100 m² | 4.1.2(d) | 95 |
| I-2 (outside B) | 3.00 for transportation and storage, listed service uses incl. laundry or cleaning plant; 1.00 for all other uses; restaurant 1 ≤300 m² | 3.1.1.1 | 95 |
| I-2 | same amenity exclusion (lesser of 20 % or 100 m²) | 4.1.2(d) | 90 |
| I-1C | 6.00 for industrial-type uses incl. transportation and storage and laundry plant; these ≥33.3 % of net floor area; 4.00 for all other uses | 3.1.1.1 | 95 |
| I-1C | Director may vary exclusions for "accessory amenity areas, including child day care facilities and recreation facilities" to 10 % of permitted floor area | 4.1.3 | 85 |
| FC-2 A | 7.00 total; office 6.75; hotel 4.00; retail/service 1.00; **3.00 all other uses** (incl. data) | 3.1.1.1 | 90 |
| FC-2 B | 5.00 non-dwelling, 3.00 dwelling; up to 6.50 (dwelling ≤5.00) | 3.1.1.2–3 | 90 |
| FC-2 C1/C2/D/E | C1 1.00 non-dwelling (2.50 with social housing); C2 4.00 (3.00 dwelling, all social housing); D 3.00 (to 7.50); E 3.00 for transportation and storage, 1.00 others | 3.2.1, 3.3.1, 3.4.1.2 | 85 |
| FC-2 | Excluded: "amenity areas, including child day care facilities and non-profit recreation facilities", lesser of 20 % or 1,000 m² | 4.1.2(b) ? (line read, clause no. ?) | 75 |

## 2. Edmonton (Bylaw 20001, adopted text effective 1 Jan 2024; later amendments not checked ?)

| Program (Edmonton use) | BE (s. 2.120) | IM (s. 2.130) | IH (s. 2.140) |
|---|---|---|---|
| Data centre (deemed use) | D via Minor Industrial | D via Minor Industrial | D via Major Industrial |
| Refuge / community hall / recreation centre (Community Service; incl. Seasonal and Year-round Shelters) | O, ≤500 m² per establishment (3.12.1) | NP (Special Event only) | NP |
| Library (Library) | NP | NP | NP |
| Cultural: museum, auditorium (Major Indoor Entertainment) | O, ≤500 m² (3.3.1) | NP | NP |
| Indoor recreation / pool: gyms, fitness (Minor Indoor Entertainment); "sports or entertainment complexes", "aquariums" (Major); "community recreation centres" (Community Service) | Minor O (no cap found); Major ≤500 m²; Community Service ≤500 m² | NP | NP |
| Greenhouse / vertical farm (Urban Agriculture) | O, "within or on a building" (3.16.1) | O, same (3.8.1) | NP |
| Plant nursery (Outdoor Sales and Service) | O | O | NP |
| Laundromat (Indoor Sales and Service, "personal service": our reading ?) | O, ≤500 m² (3.7.1) | only existing at 1 Jan 2024 | NP |
| Industrial laundry (Minor Industrial, "cleaning … goods": our reading) | O, enclosed | O | only existing |
| Housing (Residential) | NP | NP; accessory temporary employee sleeping only (3.2.2) | NP; same (3.1.2) |
| Restaurant / café (Food and Drink Service) | O, ≤500 m² (3.3.1) | NP | NP |
| Childcare (Child Care Service) | O, with s. 6.40: not "in a building bay Abutting a Minor Industrial Use"; not on a Site abutting IH or a Major Utility | NP | NP |
| Variance of size caps | Development Planner "may consider a variance to the maximum total area or Floor Area of a Use" with mitigation (3.18) | — | — |

| Rule | Value | Clause | Source | Conf. |
|---|---|---|---|---|
| FAR (one figure for all uses) | BE 1.6; IM 2.0; IH 2.0 | Table 4.1 | arch_zon_EdmZones | 90 |
| Height | BE 16.0 m; IM 18.0 m; IH 30.0 m (IH variable for operating features, 4.2) | Table 4.1 | arch_zon_EdmZones | 90 |
| IH minimum site | 1.0 ha | IH 4.1.1 | arch_zon_EdmZones | 90 |
| Ground floor (BE) | ≤10 % of Ground Floor windows facing a Street may be non-transparent | BE 5.3.2 | arch_zon_EdmZones | 90 |
| Loading (BE) | not between building and Street; screened | BE 5.8 | arch_zon_EdmZones | 90 |
| Office in IM/IH | IM office ≤300 m²; ancillary office/display ≤33 % of industrial floor area (IM 3.2.1, IH 3.1.1) | | arch_edmZB20001_IM; arch_zon_EdmZones | 90 |
| BE Community Service cap | adopted text: "The maximum Floor Area is 500 m2 per individual establishment" — **no shelter exception** in adopted text; arch_edmZB20001_BE (online) says "except shelters" → later amendment ? | BE 3.12.1 | arch_zon_EdmZones vs arch_edmZB20001_BE | 70 |

## 3. Lot consolidation (Edmonton)

| What | Value | Source | Kind | Conf. |
|---|---|---|---|---|
| Who | Council must appoint a subdivision authority (MGA s. 623); Edmonton: delegated to City Manager, then to the "Chief Subdivision Officer" | arch_zon_EdmSAPage | government (City page) | 80 |
| Bylaw role | 7.90 only sets application-completeness steps ("within 20 days after the receipt of an application for the subdivision of land") | arch_zon_Edm790 | rule | 90 |
| "Site" | "an area of land consisting of 1 or more Abutting Lots" — FAR and zone rules apply to the Site, so consolidation may not be needed for zoning (our reading) | arch_zon_EdmDefs | rule | 85 |
| Regulation name | the old Subdivision and Development Regulation is now "Matters Related to Subdivision and Development Regulation, Alta Reg 84/2022" | arch_zon_AbLegRefs2026 | government | 80 |
| Is consolidation a subdivision? | **?** MGA s. 616/652 text not read (King's Printer and CanLII blocked to this session; the Calgary-hosted MGA copy cut off before Part 17). MGA TOC lists "658 Cancellation of plan of subdivision". | arch_zon_MgaToc | rule (TOC only) | 40 |
| Practice | LPRT 2025 ABLPRT 104 (Edmonton): a re-plot of three parcels into two went through the Subdivision Authority (conditional approval 17 Oct 2024); the appellant argued it was "a consolidation which could have been registered without subdivision approval". Tribunal did not decide that point. | arch_zon_Lprt2025 | tribunal decision (party claim on the key point) | 60 |

## 4. One project, several uses

| City | Finding | Clause | Source | Conf. |
|---|---|---|---|---|
| Vancouver | "Accessory Use": ancillary to the principal building or "the principal use being made of the site" | Sec. 2 | van3575s2 | 90 |
| Vancouver | Several principal uses on one site are normal: FSR is allocated by use, and caps refer to "the total gross floor area of all principal and accessory uses combined" | I-3 3.1.1.1(b)(ii) | van_zdb_i3 | 85 |
| Vancouver | Accessory uses to outright uses ≤33.3 % of gross floor area (I-3 2.2.14); accessory to a conditional use (e.g. data) is itself conditional (2.1) | 2.1, 2.2.14 | van_zdb_i3 | 90 |
| Vancouver | "Site": "1 or more adjoining parcels or lots abutting on a street" | Sec. 2 | van3575s2 | 90 |
| Edmonton | "Accessory": "incidental, subordinate, and devoted to the principal Use or building, and located on the same Lot or Site" | 8.20 | arch_zon_EdmDefs | 90 |
| Edmonton | Buildings may hold "1 or more" Uses ("industrial building" = 1 or more Industrial Uses; "non-residential building" = 1 or more non-Residential Uses) | 7.20 subs. 1.8.3, 1.8.7 | arch_zon_Edm720 | 85 |
| Edmonton | BE variances weigh impacts on "on-Site or Abutting non-Industrial Uses" — mixed uses on one Site contemplated | BE 3.18 | arch_zon_EdmZones | 75 |
| Edmonton | No general clause found on how a permit treats several principal uses (parking summing exists only in special areas, e.g. Edmonton South 5.8.4) | ? | — | — |

## 5. Gaps (?)
- I-1, M-2, IC-1–3 schedules not re-read (proxy 403); status taken from vanDistricts.
- Vancouver Library / Swimming Pool: listed in Sec. 2 but undefined, so whether the "not specifically listed and defined" clause (I-3 2.2.15) could admit them is unclear; whether a pool counts as part of a Community Centre or a library as Public Authority Use (C) is a Director's call.
- Laundromat in Edmonton: no use names it; Indoor Sales and Service is our reading.
- Edmonton amendments since 1 Jan 2024 not checked (BE shelter exception conflict); special areas (e.g. EETIM data-centre proposal) and DC zones not read.
- Alberta consolidation rule: MGA ss. 616, 652, 658 and Land Titles Act not read.
