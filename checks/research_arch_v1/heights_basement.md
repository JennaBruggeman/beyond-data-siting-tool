# Heights, basements, coverage, public ground floor — research (3 Nov 2026)

Rules as BRIEF.md. "?" = not found. "our reading" / "our arithmetic" marked. Ids in heights_basement_sources.json (arch_hb_*) and uploads_sources.json (arch_up2_*). Existing ids reused where they apply (arch_sec_*, arch_up_fm0140, arch_sportEngPoolsDGN, arch_covI3Draft2022).

Sites: 64 Airport Rd NW, Edmonton (BE) · 339 1st Ave E, Vancouver (I-3; sub-area A assumed, not re-checked on Map 1 ?).

---

## 1. Floor-to-floor and clear heights

### Rules that apply to every program

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver I-3, first floor | floor-to-floor "at least 6.0 m" (buildings after 31 Oct 2017) | arch_hb_vanI3 | s. 3.1.2.9(a), p. 12 | rule | 95 |
| Vancouver I-3, floors above | floor-to-floor "at least 4.0 m" | arch_hb_vanI3 | s. 3.1.2.9(b), p. 12 | rule | 95 |
| Vancouver I-2 (benchmark) | first floor ≥6.1 m; above ≥4.0 m | arch_hb_vanI2 | s. 3.1.2.4, 3.2.2.9, p. 11, 15 | rule (read by fetch summary) | 75 |
| Vancouver FC-2 | first floor ≥6.0 m (Director may decrease) | arch_hb_vanFC2 | s. 3.1.2.5–3.1.2.6, p. 11 | rule | 90 |
| Edmonton BE | no floor-to-floor rule in the zone; only max Height 16.0 m | arch_hb_edmBE | 2.120 Table 4.1, p. 106 | rule | 90 |
| NBC Part 3 (all A, B, D, E, F rooms) | no general minimum room ceiling height found; only headroom: exits ≥2 050 mm, doorways ≥2 030 mm, access to exit same as exits | arch_hb_nbcHeadroom | 3.4.3.4.(1),(4) p. 3-146; 3.3.1.8.(1) p. 3-120 | rule (absence = our reading of a text search) | 75 |
| NBC Part 9 residential rooms | ceiling 2.1 m (living, dining, kitchen, bedrooms, bathrooms, halls); unfinished basement clear 2.0 m | arch_hb_nbc953 | Table 9.5.3.1, p. 9-11 | rule | 95 |
| Data hall ceiling (insurer) | "Limit the maximum height of ceilings in data centers to 30 ft (9 m)" | arch_up2_fm0532 | 2.2.5.2, p. 6 | insurer guide | 95 |

Consequence (our reading): on the Vancouver site every storey is ≥4.0 m and the ground storey ≥6.0 m, whatever the program. A 6.0 m public ground floor already in the catalogue (public_ground) matches I-3 s. 3.1.2.9.

### Per program (tool/arch_programs.json ids)

| program id | figure | source id | where | kind | conf. |
|---|---|---|---|---|---|
| refuge | ? (no room height in AHS, VCH, Health Canada guides) | — | — | — | 0 |
| pool | pool hall flat ceiling min clear 3.5 m; profiled 4.5–6.0 m high point (UK 4-lane) | arch_sportEngPoolsDGN | p. 23 | design guide (UK benchmark) | 75 |
| pool | BC pool guide gives no hall height; diving clearances deferred to FINA Facilities Rules | arch_up2_bcPoolGuide | 3.5, p. 12 | government guide | 90 |
| laundry | ? | — | — | — | 0 |
| spa | ? | — | — | — | 0 |
| therapy_pool | ? (catalogue 4.5 m: source not found in this pass) | — | — | — | 0 |
| aquarium | ? | — | — | — | 0 |
| fish_farm | ? | — | — | — | 0 |
| greenhouse | gutter 4–4.25 m typical; new designs 4.9–5.5 m | arch_hb_abGreenhouse | "Components of the Greenhouse System…" | government guide (AB) | 80 |
| greenhouse | walls "at least 4 metres … wherever feasible" | arch_hb_nswGreenhouse | "Height of greenhouse structures" | government guide (Australia, benchmark; no date) | 60 |
| conservatory | ? (catalogue 18 m: source not re-checked) | — | — | — | 0 |
| food_drying, lumber_drying | ? | — | — | — | 0 |
| public_ground | ≥6.0 m floor-to-floor (I-3 first floor) | arch_hb_vanI3 | 3.1.2.9(a) | rule | 95 |
| winter_garden, covered_plaza, warming_shelter | ? | — | — | — | 0 |
| gym (climbing) | ? (EN 12572-3 covers holds only; wall heights are in EN 12572-1/-2, not uploaded) | arch_up2_en12572_3 | scope | standard | 90 |
| ev_hub | ? (NBC 9.5.3.3 storage garage clear 2 m is Part 9 only) | arch_hb_nbc953 | 9.5.3.3 | rule | 60 |
| clinic | ? (CSA Z8000:24 paywalled; only contents pages seen) | — | — | — | 0 |
| community_kitchen | ? | — | — | — | 0 |
| heat_plant | ? | — | — | — | 0 |
| housing (Part 9 rooms) | 2.1 m ceiling | arch_hb_nbc953 | Table 9.5.3.1 | rule | 95 |
| data hall | ≤9 m ceiling (FM) | arch_up2_fm0532 | 2.2.5.2 | insurer guide | 95 |

---

## 2. Basements

### (a) Does below-grade floor area count?

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Edmonton "Basement" | "wholly or partially below ground level"; max 1.83 m above Grade to the floor above | arch_hb_edmDefs | s. 8.20, printed p. 1023 | rule | 95 |
| Edmonton "Floor Area" | inside outside surface "of the exterior and Basement walls" | arch_hb_edmDefs | s. 8.20, p. 1032 | rule | 95 |
| Edmonton FAR exclusions | Basement used "exclusively for storage or service to the building"; underground parking; bike parking; floor areas "devoted exclusively to mechanical or electrical equipment servicing the development"; indoor Common Amenity Area | arch_hb_edmDefs | FAR definition, p. 1033 | rule | 95 |
| Edmonton BE, basement data hall | counts toward FAR 1.6 (principal use, not "service to the building") — our reading; generator/UPS/switch rooms serving the building excluded | arch_hb_edmDefs; arch_hb_edmBE | as above | rule + our reading | 70 |
| Vancouver I-3 | floor area "must include all floors … both above and below ground level" | arch_hb_vanI3 | 4.1.1, p. 17 | rule | 95 |
| Vancouver I-3 exclusions | floors at or below base surface for parking/loading, bike storage, "heating and mechanical equipment, or uses … similar"; amenity ≤ lesser of 20 % or 100 m² | arch_hb_vanI3 | 4.1.2(c),(d), p. 17 | rule | 95 |
| Vancouver I-3, basement data hall | counts toward FSR (data storage not listed; "similar" is Director's discretion) — our reading | arch_hb_vanI3 | 4.1.2(c) | rule + our reading | 65 |
| Vancouver FC-2, I-2 | same include-below-ground rule and mechanical exclusion | arch_hb_vanFC2; arch_hb_vanI2 | 4.1.1–4.1.2 | rule | 90 |

### (b) Does a basement count as a storey or toward height?

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Edmonton | Basement is a Storey only "If the top of the floor directly above a Basement is greater than 1.83 m above Grade" | arch_hb_edmDefs | Storey definition, p. 1053 | rule | 95 |
| Edmonton Height | flat roof: Grade to midpoint of highest parapet; Grade = average of Site corners (or other method) | arch_hb_edm570 | 5.70 s. 1.4, 2.1, pp. 822–825 | rule | 95 |
| Edmonton BE | height in metres (16.0 m), no storey cap → a basement adds nothing to height | arch_hb_edmBE | Table 4.1 | rule + our reading | 85 |
| Vancouver zoning | "A storey shall not include a basement or cellar"; height measured above base surface | arch_hb_vanHeightBg | 2019 backgrounder quoting ZDBL s. 2 | government guide (current s. 2 not read ?) | 60 |
| Vancouver height | measured from base surface to highest roof point / top of parapet; finished grades not used | arch_hb_vanHeightBulletin | Building Height bulletin (2022, am. 2023) | government guide | 75 |
| NBC / VBBL building height | storeys "between the roof and the floor of the first storey"; first storey floor ≤2 m above grade; basement = below first storey → not counted | arch_hb_nbcDefs | Div. A 1.4.1.2, pp. 1-5, 1-8 | rule | 95 |

### (c) Groundwater and flood, the two sites

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| 339 1st Ave E, flood | ~29 % of lot inside designated flood plain (earlier independent check) | findings_input.md | row "Floodplain (Vancouver)" | our GIS check | 70 |
| Vancouver FCL | underside of floor / top of slab for habitation, business or storage ≥4.6 m GVRD datum | arch_hb_vbblFlood | Div. A 1.4.1.2 definitions, pp. 18, 40 | rule | 95 |
| Vancouver below FCL | no switchgear, panels, furnaces, fire protection "below the flood construction level, unless … protected … and accessible"; no hazardous or toxic storage below FCL | arch_hb_vbblFlood | Div. C 2.2.10.3.(2),(3), p. 250 | rule | 95 |
| Vancouver flood-plain map basis | "flood risk assessed to the year 2100, including sea level rise" (Jan 2014) | arch_hb_vbblFlood | Fig. A-1.4.1.2.(1)-C | rule | 95 |
| Vancouver Groundwater Protection Area | Renfrew–Boundary / Still Creek only; 339 1st Ave E outside (map read) | arch_hb_vbblFlood | Fig. A-1.4.1.2.(1)-F | rule + our map reading | 85 |
| Vancouver groundwater depth at site | ? | — | — | — | 0 |
| 500-year level at 339 1st Ave E | ? | — | — | — | 0 |
| Edmonton Floodplain Protection Overlay | applies to N. Saskatchewan valley lands; requires engineer's certificate, flood-proofing, Basement drainage | arch_hb_edmFPO | 2.250, pp. 171–172 | rule | 95 |
| 64 Airport Rd NW in FPO | outside (index map tiles follow the river; Blatchford ~3 km north) — our map reading at index scale | arch_hb_edmFPO | Index Map p. 173 | rule + our map reading | 60 |
| Edmonton groundwater depth at site | ? (local AWWID reports cover TWP 53-24-W4, but the site's legal land description is not confirmed; well static levels are aquifer heads, not water table) | — | data/raw/edm/wells/ | — | 0 |

### (d) Insurer sheets: below grade and flood

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Generators | "Do not locate emergency generators at roof level or in basement areas"; preference: separate building → yard → ground floor | arch_up2_fm0532 | 2.6.4.3, 2.6.4.3.1, p. 26 | insurer guide | 95 |
| Diesel tanks | "Do not locate diesel fuel tanks inside the data center, including the basement, or at roof level" | arch_up2_fm0532 | 2.6.4.4.1.1, p. 27 | insurer guide | 95 |
| Site flood | above 500-year + 0.3–0.6 m; ≥152 m from wave impact | arch_up2_fm0532 | 2.2.13.1, p. 7 | insurer guide | 95 |
| Piping over the hall | "Do not route cooling or domestic liquid piping above areas containing critical/high-value equipment" | arch_up2_fm0532 | 2.2.1.6, p. 5 | insurer guide | 95 |
| Li-ion BESS | order: outdoor enclosure → dedicated building → cutoff room with 1–2 exterior walls "accessible for manual firefighting"; cutoff room 2 h | arch_up2_fm0533 | 2.3.1.1, 2.3.4.2, pp. 4–6 | insurer guide | 95 |
| BESS below grade | not among FM's options (every indoor option needs an exterior wall) — our reading | arch_up2_fm0533 | 2.3.1.1 | our reading | 70 |
| Flood-prone floors, equipment | (from 2 Nov) above 500-year + freeboard; flood-prone floors nonessential only | arch_up_fm0140 | 2.3.1, 2.7.1 | insurer guide | 95 |
| Loss example | UPS-battery fire "damaged all 500 computers in the same basement area" | arch_up2_fm0532 | 3.4 loss history | insurer guide | 80 |

### (e) Codes: generator and fuel rooms below grade

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Emergency generator room (NBC, BCBC, NBC(AE), VBBL) | 2 h fire separation; room contains only the set and related equipment; no below-grade ban | arch_hb_nbc3628 | 3.6.2.8.(1), p. 3-163 (BCBC p. 3-257) | rule | 95 |
| Fuel tanks inside buildings | permitted for "emergency generators and fire pumps"; in dedicated storage rooms; fire compartment 2 h | arch_hb_nfc4313 | 4.3.13.1, 4.3.13.4, 4.3.13.7, pp. 4-31–4-32 | rule | 95 |
| Diesel (Class II) tank, basement (generator occupancies) | protected storage room, aggregate 20 000 L (tanks >2 500 L) or 45 000 L (tanks >20 000 L); first storey 200 000 L | arch_hb_nfc4313 | Table 4.3.13.4.-B | rule | 90 |
| Same, Alberta | same table in NFC(AE) 2023 | arch_hb_nfc4313 | Table 4.3.13.4.-B | rule | 85 |
| Class II containers in basement | protected 25 000 L per fire compartment; unprotected "Not permitted" | arch_hb_nfc4313 | Table 4.2.7.5.-A, p. 4-13 | rule | 90 |
| Piping for diesel generators | to CSA B139 | arch_hb_nfc4313 | 4.3.13.6 | rule | 95 |
| C282:24, B139:24 | only contents pages seen: C282 6.2.1 "Protection … by location" (p. 20); B139 has a clause for "installations located in flood-prone … conditions" (p. 212); text pending | arch_up2_tocs | contents | standard (TOC only) | 40 |
| Vancouver Fire By-law / BC Fire Code differences | ? (not checked here) | — | — | — | 0 |

---

## 3. Site coverage

| zone | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Edmonton BE | none (Table 4.1: Height, FAR, Setbacks only) | arch_hb_edmBE | 2.120 s. 4.1, p. 106 | rule | 90 |
| Edmonton IM | none (Height 18.0 m, FAR 2.0, Setbacks) | arch_hb_edmIM | 2.130 Table 4.1, p. 111 | rule | 90 |
| Edmonton IH | none (min Site 1.0 ha, Height 30.0 m, FAR 2.0, Setbacks) | arch_hb_edmIH | 2.140 Table 4.1, p. 115 | rule | 90 |
| Edmonton Site Coverage definition (where used) | buildings ≥1.8 m above Grade; Parkade ≥1.0 m | arch_hb_edmDefs | p. 1052 | rule | 95 |
| Vancouver I-3 | none (no coverage clause in schedule) | arch_hb_vanI3 | whole schedule (text search) | rule | 85 |
| Vancouver I-2 | none in schedule | arch_hb_vanI2 | fetch summary | rule | 70 |
| Vancouver FC-2 | none (no coverage clause) | arch_hb_vanFC2 | whole schedule (text search) | rule | 85 |
| Vancouver building depth/width cap (I-3 sub-area A) | 61.0 m × 61.0 m | arch_hb_vanI3 | 3.1.2.7–3.1.2.8, p. 11 | rule | 95 |

---

## 4. Public ground floor under a data hall

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver I-3 | "Bulk data storage is not permitted at the ground floor, except for entrances" (adopted, June 2026) | arch_hb_vanI3 | 2.2.11, p. 8 | rule | 95 |
| → effect | in I-3 the ground floor must be another use; the hall sits above (or below) — our reading | arch_hb_vanI3 | 2.2.11 | our reading | 85 |
| NBC separation A or B below F-2 | 2 h (A-1…A-4 ↔ F-2; B-1…B-3 ↔ F-2); E ↔ F-2 none; D ↔ F-2 none (1 h under 3.2.2.57) | arch_hb_nbc3131 | Table 3.1.3.1, p. 3-3 | rule | 95 |
| Residential in an F-2 building | "Not more than one suite of residential occupancy" | arch_hb_nbc3131 | 3.1.3.2.(2) | rule | 95 |
| FM 5-32, other occupancies below/beside | no rule found on occupancies below; walls of hall rooms 1 h, multiple halls 2 h; walls floor to floor; no liquid piping above the hall | arch_up2_fm0532 | 2.2.4.1–2.2.4.3, 2.2.1.6 | insurer guide | 85 |
| FM 9-1 zones | public ground floor = Unsecured-Open; hall = Secured-Restricted (from 2 Nov) | arch_up_fm0901 | 2.2.1.2.1 | insurer guide | 90 |
| RCMP zones | public → reception → operations → security, "progressively restrictive", not skipped | arch_sec_gcpsg015AppC | 5.3, 6.1 | government guide | 90 |
| RCMP circulation | elevators only between the same zones; PZ egress stairs in PZ; utility spaces not next to entrances to restricted zones | arch_sec_gcpsg014 | 6.6, 6.7, 6.12 | government guide | 85 |
| RCMP blast (if TRA finds threat) | exclusion zone ≥3 m from facade; watch zone 30 m | arch_sec_gcpsg002 | 6.1 | government guide | 80 |
| Refrigeration machinery room | doors "shall not open to a public corridor or any room used for assembly" | arch_up2_b52 | 6.2.2.2, p. 57 | rule (code adopted by reference ?) | 85 |
| Filed plan with public use under a hall (Canada or US) | ? (not found in this pass) | — | — | — | 0 |

---

## 5. Roof equipment and height

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Edmonton, all zones | "no Height limit": chimney stacks; elevator housing and roof stairways; "water or other tanks"; "ventilating equipment, plumbing stacks, and mechanical penthouse"; skylights; antennas | arch_hb_edm570 | 5.70 s. 1.9, p. 825 | rule | 95 |
| Edmonton parapet | top ≤0.4 m above max Height (flat roof); other roofs ≤1.7 m | arch_hb_edm570 | 1.7–1.8 | rule | 95 |
| Edmonton BE screening | mechanical, transformers, cooling towers screened from Streets and non-industrial Sites | arch_hb_edmBE | 5.2, p. 107 | rule | 95 |
| Dry coolers / chillers on roof (Edmonton) | not named; "ventilating equipment … mechanical penthouse" or "similar" — our reading: exempt | arch_hb_edm570 | 1.9.5, 1.9.10 | our reading | 65 |
| Vancouver, all districts | Director of Planning "may permit" to exceed max height: mechanical equipment incl. elevator machine rooms and screening; chimneys; roof energy technologies; zero-emission mechanical equipment; considering massing, views, shadowing, noise | arch_up_vanZDB10 | 10.1.1(b)–(d), p. 3 | rule (discretionary) | 95 |
| Vancouver ≥30.5 m | decorative roof may exceed (DP Board) | arch_up_vanZDB10 | 10.1.2 | rule | 90 |

---

## Gaps (?)

- Heights for most programs (refuge, spa, aquarium, fish farm, drying, gym, clinic, kitchen, heat plant, shelters): no primary source found. CSA Z8000 (clinic) paywalled: UBC Library.
- Catalogue values therapy_pool 4.5 m and conservatory 18 m: source not found in this pass.
- Vancouver ZDBL Section 2 (current basement/cellar/storey definitions): only a 2019 backgrounder read.
- I-3 sub-area of 339 1st Ave E (Map 1) not re-checked.
- Groundwater depth at both sites; 500-year flood level at 339 1st Ave E; Edmonton site's legal land description (to use local well reports).
- FPO at 64 Airport Rd: index map only; confirm on the detailed tile.
- C282:24 and B139:24 text (only contents pages); BC Fire Code / Vancouver Fire By-law variants of NFC Table 4.3.13.4.-B.
- Filed Canadian/US plans with a public floor under a data hall.
- EN 12572-1/-2 (climbing wall heights) not uploaded.

Paywalled / blocked: CSA Z8000, C282, B139 (contents only); EN 12572-1/-2. Nothing circumvented.
