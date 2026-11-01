# Refuge placement beside a data centre: what is allowed (1 Nov 2026)

Builds on adj_occupancy.md, adj_programs.md, refuge_publicfloor.md, zoning.md and architecture_adjacency_draft.md (not repeated). New ids `arch_ref_*` in refuge_placement_sources.json; older ids reused. "?" = not confirmed. "Our reading" = not stated by the source. Codes read from data/raw/codes (NBC 2020, BCBC 2024, VBBL 2025, NBC(AE) 2023). Data centre class still **F-2 (?)** (tool assumption).

Configurations: **A** own building on the same lot · **B** separate part of the same building, side by side · **C** refuge rooms on the ground floor, data hall above.

## 0. Answer first

| Rule | A: own building | B: side by side | C: refuge below, data above |
|---|---|---|---|
| Day use (A-2) | allowed | allowed: 2 h to F-2 | allowed: 2 h floor, sprinklers in all storeys below a sprinklered storey |
| Overnight sleeping (C) | allowed (code) | **one residential suite max** in an F-2 building | same as B |
| Vancouver ground-floor 2 h suite rule | n/a | applies if refuge at grade with street door | applies (floor above = 2 h) |
| Egress | own exits | own exits; none through data-centre lobby/service space | own exits at grade; data-centre stairs may not open into refuge or pass through it (our reading) |
| Seismic importance | refuge's structure only (High if "community centre"; Post-disaster if designated) | shared structure takes the highest category unless structurally independent | **whole structure** takes the refuge's category |
| Generator power (BC) | OK if refuge user is the owner or a tenant; another owner = public utility unless free or exempt (?) | same | same |
| Generator power (AB) | "self-supply" only if the refuge user is that owner or tenant on that property | same | same |
| Zoning | Van: conditional use; Edm BE only | same | **fits Vancouver best**: data storage barred at ground floor in I-2, I-3, FC-2 |

## 1. Occupancy

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Day refuge (warming/cooling/clean-air/reception) | not named in any code; A-2 ("Community halls") — our reading (already in adj_occupancy) | adj_occupancy.md §1 | A-3.1.2.1.(1) | rule + our reading | 70 |
| Assembly always Part 3 | Part 3 applies to all buildings "used for major occupancies classified as … Group A" (any size) | arch_ref_part3Scope | BCBC Div. A 1.3.3.2.(1)(b)(i) | rule | 90 |
| Overnight shelter | C — our reading (persons with "sleeping accommodation … not harboured for … care") | adj_occupancy | Div. A def. | rule + our reading | 65 |
| "Emergency shelter" in NBC, BCBC, NBC(AE) | **not found** (grep "shelter": only definitions, tents, wind) | arch_ref_nbcT4121 | — | absence | 90 |
| VBBL temporary shelter | "Notwithstanding … a temporary emergency shelter is permitted in an existing building" with 12 conditions (1 staff per 20 spaces; 1 bed per 3.7 m²; 900 mm aisles; 2 means of egress; smoke alarms throughout; 1 WC per 20) | arch_ref_vbblPart13 | VBBL 13.4.4.1.(1) | rule | 95 |
| VBBL Part 13 limits | applies to "temporary uses in existing buildings designed to support a different major occupancy, including … emergency shelters"; measures "do not apply to new work"; temporary = ≤12 consecutive months or fixed term ≤3 years | arch_ref_vbblPart13 | 13.1.1.2.(1)(c), 13.1.1.3.(1), 13.1.1.5 | rule | 95 |
| Applied | a **new** refuge designed for sleeping must be built as C (or a CBO-approved alternative); it may later run occasional overnight events under 13.4.4.1 only once it is an "existing building" — our reading ? | arch_ref_vbblPart13 | 13.1.1.3 | our reading | 55 |
| Edmonton / Alberta | no shelter clause in NBC(AE); no Alberta STANDATA title on shelters found on the STANDATA index page | arch_ref_abStandataIndex | index page | absence (titles only) | 50 |
| Post-disaster building (def.) | list: hospitals…, telephone exchanges, "power generating stations and electrical substations", water/sewage, and (unless AHJ exempts) "emergency response facilities", fire/police, communications. **No shelter, reception centre or data centre named**; list is "not limited to" | arch_ref_postDisasterDef | Div. A 1.4.1.2 | rule | 95 |
| Who designates | BCBC: "a building that the authority having jurisdiction has determined is necessary…"; VBBL: "the Chief Building Official has determined"; NBC and NBC(AE): no "determined" wording | arch_ref_postDisasterDef | Div. A 1.4.1.2 | rule | 95 |
| Note on designation | "Some municipalities have emergency management plans that specify which buildings are to be used for the provision of essential services after a disaster … designers should consult with the authority having jurisdiction." | arch_ref_postDisasterDef | Note A-1.4.1.2.(1) (BCBC) | rule (note) | 90 |

## 2. Separation, stacking, egress (applied)

All clauses already confirmed in adj_occupancy.md §3–8; applied here.

| Config | Rule | clause | codes | conf. |
|---|---|---|---|---|
| A | No fire separation; spatial separation by limiting distance to an imaginary line between the two buildings (line position not set by code; AHJ may accept by agreement). If joined by a wall: firewall **4 h**, masonry/concrete, because F-2 is on one side | 3.2.3; Div. A def. "limiting distance"; 3.1.10.2 | all 4 | 90 |
| A | Overnight sleeping allowed in its own building (3.1.3.2.(2) counts suites per building) — our reading | 3.1.3.2.(2) | all 4 | 80 |
| B | A-2 / F-2: **2 h** (C / F-2: 2 h) | Table 3.1.3.1 | all 4 | 95 |
| B, C | "Not more than one suite of residential occupancy" in an F-2 building → overnight dormitory refuge only if treated as one suite (?) or the data centre is not F-2 (F-3: C/F-3 1 h, no suite cap; D: none) | 3.1.3.2.(2); VBBL exceptions 3.1.3.4–3.1.3.5 do not fit (flex space ≤500 m², F-2 under C) | all 4 | 85 |
| B, C | Vancouver: suite "located at ground level and having direct access to the street" → 2 h to suites beside **and above** | VBBL 3.3.1.1.(5) | VBBL | 95 |
| C | Superimposed: each portion to its own 3.2.2 article; floor rated "on the basis of … the lower major occupancy" (A-2 below → A-2 rules for the floor, but Table 3.1.3.1 still needs 2 h); sprinklers carry down to all storeys below a sprinklered storey | 3.2.2.7.(1)–(2); 3.2.2.18.(2) | all 4 | 85 |
| C | F-2 any size: noncombustible, sprinklered, floors 2 h | 3.2.2.76 | NBC (others ?) | 80 |
| B, C | Each suite exits to outside, a public corridor or exterior passageway; no exit through a lobby onto which an industrial room opens | 3.3.1.3.(8); 3.4.4.2.(2)(c) | all 4 | 90 |
| B, C (Edmonton) | "No access to exit for patrons in an assembly occupancy shall pass through a kitchen, service space or storage room" | NBC(AE) 3.3.1.3.(10) | AB only | 95 |
| C | Explosion-risk service equipment (transformers, boilers) not under a required exit; service rooms not opening into an exit | 3.6.2.2; 3.4.4.4.(7) | all 4 | 90 |
| C | Data-centre exit stairs from upper floors discharge at grade: must not pass through the refuge suite (3.3.1.3.(8)); a shared stair is not prohibited | 3.4.4.1 | all 4 | 70 (our reading) |
| C | Insurer (not law): FM 5-32 wants generators in a separate building/yard, never roof or basement — so plant goes in the yard, not beside the refuge inside | arch FM 5-32 (draft) | — | 70 |

## 3. Power in a blackout

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Code minimum, any A-2 or C refuge | emergency **lighting** only: 30 min ("any other occupancy"); 1 h Group B or 3.2.2.51/.60; 2 h high building | arch_ref_emergPower | 3.2.7.4.(1)(b) | rule (same 4 codes) | 95 |
| Fire alarm | 24 h supervisory + 30 min full load (5 min if no annunciator) | arch_ref_emergPower | 3.2.7.8.(3) | rule | 95 |
| Generator-fed building services | only elevators >36 m, fire pumps, 3.2.6 smoke/air fans | arch_ref_emergPower | 3.2.7.9.(1) | rule | 95 |
| Installation | emergency supply to CSA C282 (paywalled) | arch_ref_emergPower | 3.2.7.5.(1) | rule | 95 |
| Code requirement to keep a refuge heated/cooled/filtered in a blackout | **none found** | — | 3.2.7 | absence | 85 |
| Guidance (not rule) | clean-air space: "emergency power"; fuel-burning generators away from building, downwind of intakes | arch_hcCleanerAirSpaces | building features | government guide | 85 |
| BC: who may be supplied | public utility excludes "a person … who provides the service … only to the person or the person's employees or **tenants**, if … not resold to or used by others"; definition (a) is supply "for compensation" | bcUCAs1 | UCA s. 1 | rule | 85 |
| BC applied | A/B/C with the refuge **leased** from the data-centre owner: tenant → excluded (our reading). Refuge **owned by another party** (separate titled parcel, air-space parcel or strata lot): not a tenant → public utility if paid, unless exempt (s. 22 / s. 88(3)); **free** supply may fall outside "for compensation" (our reading ?, legal advice needed) | bcUCAs1; backup_neighbours (register) | — | our reading | 55 |
| Alberta: self-supply | "production of electric energy on a property of which a person is the owner or a tenant where any … is consumed on that property by that owner or tenant"; Act does not apply to the portion "consumed solely on that property by that owner or tenant" | euaS2 | EUA s. 1(1)(vv.1), 2(1)(b) | rule | 90 |
| Alberta applied | separate building on **same property**: covered if the refuge's user is the owner or a tenant (our reading; "property" undefined; AUC 29294-D01-2025 read it as at least contiguous lands — register). Separate owner (not tenant): outside s. 2(1)(b) | euaS2 | — | our reading | 60 |
| Edmonton wiring | EPCOR: customer may not extend its facilities beyond its own property (Art. 8.3 exception) | epcorTC2025s44 | T&C s. 4.4 | utility terms | 80 |
| Electrical code: feeding a second building from the first | ? (CSA C22.1, paywalled) | — | — | — | — |

## 4. Operating when the host building is locked down

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| AB: who sites a reception centre | "The selection of the reception centre site is the responsibility of the municipal or local authority"; SCOs consulted | arch_ahsReceptionCentres | p. 3 | government guide | 90 |
| AB: access, 24/7, separate entrance, backup power, owner agreements | **not addressed** (only "Sustainability of utilities", "Building accessibility") | arch_ahsReceptionCentres | pp. 3–17 | absence | 85 |
| BC ESS / EMCR facility criteria | none found (already: ESS Program Guide, JIBC) | arch_essProgramGuide2025 | — | absence | 75 |
| BC regional practice | RDN: "agreements with several facilities"; "Site inspections are conducted on designated reception centres"; terms not published | arch_ref_rdnReception | web page | government (regional district) | 70 |
| BC emergency powers | local authorities may "Use or control the use of land", "Authorize entry into structures or onto land", "Appropriate, use, or control the use of goods" | arch_ref_bcEdmaPowers | EDMA fact sheet, table rows 8–10, pp. 7–8 | government guide | 80 |
| AB emergency powers | municipality may exercise Minister's s. 19(1) powers in a local emergency, incl. "acquire or utilize any real or personal property" (s. 19(1)(c)) | arch_ref_abEmaRma | EMA s. 24(1)(b), 19(1)(c) via RMA summary | secondary (association); Act text not read ? | 60 |
| Edmonton bylaw | Emergency Management Bylaw 19091: declares local emergency, defers powers to the Act; nothing on reception centres or owner agreements | arch_ref_edmBylaw19091 | ss. 7(d), 10(2) | rule | 85 |
| Vancouver cooling network | "both civic and non-civic" spaces; "offering overnight hours"; no agreement terms | arch_ref_vanHeatMemo2022 | pp. 1–2 | government memo | 80 |
| Vancouver private cooling rooms | grant aims to "create and staff emergency cooling rooms in Private SROs" (depends on owners) | arch_ref_vanCouncilR3_2022 | p. 7 | government report | 75 |
| Vancouver disaster hubs | people "meet on the outdoor grounds"; move indoors "as buildings are assessed for safety"; no building standard | arch_ref_vanHubs2016 | p. 3 | government memo | 80 |
| Vancouver ESS container | Director may exempt a ≤15 m² ESS supply container on an "Emergency Reception Centre site" from a DP | arch_ref_vanEssContainer | bulletin | rule (bulletin) | 80 |
| **Requirement for independent access / 24-7 entry / separate entrance** | **none found** in any source above. Design consequence (our reading): give the refuge its own street entrance, exits, HVAC and electrical sub-panel so it runs while the data centre is secured; the code already forces separate exits (3.3.1.3.(8)) | — | — | absence + our reading | — |

## 5. Seismic / post-disaster

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Table 4.1.2.1 (2020 / BCBC 2024 / VBBL / AB 2023) | High: "Community centres and elementary, middle and secondary schools are High Importance Category buildings." Post-disaster: "A post-disaster building." | arch_ref_nbcT4121 | Table 4.1.2.1 | rule | 95 |
| Phrase "designated as emergency shelters" | **not in** the 2020-based texts in the repo; may be older-edition wording (not verified ?) | arch_ref_nbcT4121 | — | absence | 85 |
| Is a refuge "High"? | only if it counts as a "community centre" (our reading); Note A-Table 4.1.2.1 sends users to the NRC Structural Commentaries (paywalled/not read ?) | arch_ref_nbcT4121 | Note A-Table 4.1.2.1 | rule + gap | 60 |
| Must a refuge be post-disaster? | only if the AHJ / CBO designates it (BCBC, VBBL) or it is an "emergency response facility" (?); not automatic | arch_ref_postDisasterDef | Div. A 1.4.1.2 | rule + our reading | 70 |
| Is the data centre post-disaster? | not listed; "telephone exchanges", "communications facilities" and "power generating stations" are — AHJ call ? | arch_ref_postDisasterDef | Div. A 1.4.1.2 | rule + our reading | 50 |
| Mixed building | "the classification of each independent structural system shall be the same as for any part of the building that is dependent on that structural system and for the highest usage group" | arch_ref_nbcT4121 | Note A-4.1.2.1.(3) (NBC, BCBC, VBBL, AB same) | rule (note) | 95 |
| Applied | A: refuge's category stays in the refuge building. B: whole shared structure takes the refuge's category unless split by a seismic joint into independent systems. C: refuge depends on the structure carrying the data hall → **whole building** at the refuge's category | arch_ref_nbcT4121 | — | our reading | 80 |
| Seismic importance factor IE | Normal 1.0; High 1.3; Post-disaster 1.5 | arch_ref_seismicPD | Table 4.1.8.5.-A (BCBC) | rule | 95 |
| Snow importance (ULS) | Normal 1.0; High 1.15; Post-disaster 1.25 (matters most in Edmonton) | arch_ref_seismicPD | Table 4.1.6.2.-A (BCBC) | rule | 85 |
| Post-disaster extras | no Type 1, 3, 4, 5, 7, 9, 10 irregularities (SC3/SC4), no Type 6 at all; Rd ≥ 2.0; elastic check at 5 %/50 yr with drift ≤0.005 hs | arch_ref_seismicPD | 4.1.8.10.(2); 4.1.8.23.(2) | rule | 90 |
| High extras | no Type 6; Rd ≥ 2.0 (SC4) or 1.5; elastic check at 10 %/50 yr (SC3/SC4) | arch_ref_seismicPD | 4.1.8.10.(3); 4.1.8.23.(3) | rule | 90 |
| C consequence | a tall data-hall storey over an open refuge storey risks a Type 6 weak storey — barred for High and Post-disaster (our reading) | arch_ref_seismicPD | 4.1.8.10.(2)(b), (3)(b) | our reading | 70 |

## 6. Zoning

| City / zone | Refuge use | A | B | C | source id | conf. |
|---|---|---|---|---|---|---|
| Vancouver I-2 | Community Centre or Neighbourhood House **C**; Social Service Centre **C** | C | C | C; bulk data storage "not permitted at the ground floor, except for entrances" (2.2.7) → C is the natural stack | van_zdb_i2 (zoning.md) | 90 |
| Vancouver I-3 (sub-area A) | Community Centre C; Hall C; Social Service Centre C | C | C | C; same ground-floor clause (2.2.11); first floor ≥6.0 m | van_zdb_i3 | 90 |
| Vancouver FC-2 | Community Centre C; Hall C; Social Service Centre C | C | C | C; "bulk data storage … not permitted at grade" (2.2.4) | van_zdb_fc2 | 90 |
| Vancouver I-1C | Community Centre **NP**; Social Service Centre C | via SSC | via SSC | via SSC; no ground-floor rule for data | van_zdb_i1c | 85 |
| Vancouver FSR | I-2/I-3: **1.00 FSR for all non-industrial uses combined** (refuge competes with café, childcare); amenity exclusion lesser of 20 % or 100 m² (I-3 4.1.2(d)) | — | — | — | van_zdb_i3 / i2 | 90 |
| Vancouver overnight | Social Service Centre "does not include premises used for residential purposes" → no listed use for a shelter in these zones (?) | NP ? | NP ? | NP ? | arch_ref_vanSec2SSC | 75 |
| Vancouver practice (2001) | winter shelters "classified as Social Service Centres", temporary non-renewable DPs | — | — | — | arch_ref_van2001Shelter | 40 (old; conflicts with current definition ?) |
| Edmonton BE | Community Service (incl. shelters) **permitted**, **≤500 m² per establishment** (shelter exception ?) | yes | yes | yes | arch_edmZB20001_BE; arch_zon_EdmZones | 85 |
| Edmonton IM | NP (Special Event only) | no | no | no | arch_edmZB20001_IM | 90 |
| Edmonton IH | NP | no | no | no | arch_zon_EdmZones | 90 |
| Edmonton ground floor | BE: ≤10 % of street-facing ground-floor windows non-transparent (5.3.2) → a public refuge front suits C | — | — | supports C | arch_zon_EdmZones | 85 |

## Gaps (?)

- Whether an overnight dormitory refuge in an F-2 building is "one suite" (allowed) or several; AHJ.
- NRC Structural Commentary on "community centre" (paywalled; logged).
- CSA C282 (refuge loads on the emergency supply) and CSA C22.1 (feeding a second building): paywalled; logged.
- Whether free generator supply to a non-tenant is "for compensation" (UCA s. 1); legal advice.
- Alberta EMA s. 19 / 24 text not read directly (open.alberta.ca page gave no text).
- No BC EMCR, AEMA, Vancouver or Edmonton rule on refuge access, 24/7 entry or private-owner facility-use agreements found; only that agreements exist (RDN) and that municipalities choose sites (AHS).
- Vancouver: no listed zoning use for an overnight shelter in I-2/I-3/I-1C/FC-2; Section 11 (temporary uses) not read.
- Edmonton BE shelter exception to the 500 m² cap (adopted text vs online) still unresolved.
