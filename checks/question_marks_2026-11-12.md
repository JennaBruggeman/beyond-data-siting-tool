# Every "?" the tool shows on the two example lots (12 Nov 2026, read-only)

Example lots (the two the viewer opens): 339 1st Ave E (Vancouver) and 64 Airport Rd NW (Edmonton). Crawled with checks/tests/qm_scan.js: every card of every template, the visible text and the closed "more" and "sources" sections ("in more" below). A bare "?" is shown with the row it sits in. The third column is the tool's own wording, which carries both what is missing and why; where the row says only "?", the tool gives no reason.

## For the main chat: what could be sourced (grouped)
| Missing | Where | What would settle it |
|---|---|---|
| Edmonton Direct Control (DC1, DC2) site provisions | Municipal 1–2 | the DC bylaws for the zones in the tool's tiles |
| Council adoption of the industrial-lands policy quoted | Municipal 4 (Vancouver) | the Council minutes or adopting resolution |
| Height base and datum (official established grades; CGVD2013 for Edmonton) | Municipal 5, Architecture 7 | City grade records (Vancouver), Edmonton's height method and datum |
| Room minimums shown "min ?" (step 6, drawing choice; no sourced m²): lobby, WCs, cot storage, clinic rooms, UPS, battery HVAC, meet-me, valve room, NOC, garbage, hall, loading, vestibule | Architecture 14 Rooms | a code, guideline or equipment figure per room (CSA Z8000, FGI, TIA-942 are paywalled: UBC Library) |
| Stretcher widths for the clinic corridor | Architecture 14 | CSA Z8000 (UBC Library) |
| Edmonton loading aisle width (Vancouver's 6.1 m used) | Architecture 14 | Edmonton Zoning Bylaw 20001 parking or loading section |
| Chiller distances: drains, A2L refrigerant leak, MV/HV | Architecture 17 | maker installation manual (Vertiv), CSA B52, CE Code |
| Edmonton grades | Architecture 17 | Edmonton grade data (not in the tool) |
| Fire-fighting water volume | Engineering 10 | VBBL / NFC hydrant and on-site storage requirement for the lot |
| Electricity figures per cooling type (air, liquid, immersion) | Engineering 9 | per-type PUE or demand figures from a primary source |
| Per-metre district-heat pipe cost in Canada | Engineering 8 | a Canadian utility or municipal cost study |
| Heat-pump COP at the receivers | Engineering 7 | maker data for the selected heat pump |
| Cooling-tower spacing has no register id | Engineering 4 | BAC layout figures into the register |
| Edmonton noise receiver level (11410 Kingsway NW row) | Engineering 6 | the tool's own computation (missing input), not a source |
| Comfort Inn beside 64 Airport Rd | Architecture 8 (Edmonton) | J.B.'s site note vs building data |

Some entries are legends, not gaps ("notes marked ? in the rules", "every rule with its result: pass, flagged or ?"); they're kept so the list is complete.

## Weaknesses first
- Headings that end in a question mark ("Is a data centre allowed?") and the empty Resident cards' placeholder text are left out.
- A "?" drawn inside the 3D view or a canvas is not readable as text and is not listed.
- Rows that repeat on several cards (a card shell or sources block shared by a chapter) are listed once, with the cards they appear on.
- Resident has no cards yet (all four are placeholders): nothing listed there.
- 126 distinct entries in all.

## Municipal
### 339 1st Ave E (Vancouver)
| Cards | Where (row) | What is missing, as the tool says it | In more |
|---|---|---|---|
| 1 Site, 2 Site | — | Direct Control: Bylaw 20001 DC1, DC2 site provisions are not in the bylaw copy (?). | yes |
| 1 Site, 2 Site | — | Direct Control counted apart (?); | yes |
| 1 Site | — | Not in the tool yet: Direct Control zones: site provisions (?) | yes |
| 1 Site | — | Edmonton: Direct Control (?) |  |
| 1 Site | — | Edmonton’s Direct Control zones (DC1, DC2) carry their own site provisions, which are not in the bylaw copy the tool reads: whether a data centre is allowed is site by site (?). | yes |
| 4 Use | — | Adopted by Council: ? |  |
| 4 Use | — | Adoption: ? | yes |
| 4 Use | — | Council adoption is ?. | yes |
| 5 Building rules | — | The height base (what the by-law measures from) is not settled in the tool (?). | yes |
| 6 Building rules | — | our reading ? |  |

### 64 Airport Rd NW (Edmonton)
| Cards | Where (row) | What is missing, as the tool says it | In more |
|---|---|---|---|
| 1 Site, 2 Site | — | Direct Control: Bylaw 20001 DC1, DC2 site provisions are not in the bylaw copy (?). | yes |
| 1 Site, 2 Site | — | Direct Control counted apart (?); | yes |
| 1 Site, 2 Site | — | Not in the tool yet: Direct Control zones: site provisions (?) | yes |
| 1 Site, 2 Site | — | Edmonton: Direct Control (?) |  |
| 1 Site | — | Edmonton’s Direct Control zones (DC1, DC2) carry their own site provisions, which are not in the bylaw copy the tool reads: whether a data centre is allowed is site by site (?). | yes |
| 10 cards (2 Site … 11 Report) | ? Not allowed here; rezoning needed. Shown as if rezoned: a flagged option, not a prediction. | ? |  |
| 4 Use | — | Council adoption is ?. | yes |
| 5 Building rules | — | The height base (what the by-law measures from) is not settled in the tool (?). | yes |

## Engineering
### 339 1st Ave E (Vancouver)
| Cards | Where (row) | What is missing, as the tool says it | In more |
|---|---|---|---|
| 4 Set-up | — | tower spacing set in plant.js, no register id ?), maker claims; | yes |
| 6 Set-up | — | 4.3(c)): our reading (?). | yes |
| 7 Exchanges | — | where they go is not modelled (?) |  |
| 7 Exchanges | — | the tool computes no COP there (?), and 60 °C radiators could take part of it directly. |  |
| 8 Exchanges | — | With air cooling the tool prices no connection (?). |  |
| 8 Exchanges | — | no Canadian per-metre cost found ?) |  |
| 9 Exchanges | Per-type figures (air, liquid to the chip, immersion): | ? |  |
| 10 Exchanges | Fire-fighting water volume | ? |  |

### 64 Airport Rd NW (Edmonton)
| Cards | Where (row) | What is missing, as the tool says it | In more |
|---|---|---|---|
| 7 cards (2 Site … 11 Report) | ? Not allowed here; rezoning needed. Shown as if rezoned: a flagged option, not a prediction. | ? |  |
| 4 Set-up | — | outside the maker’s stated range in design winter (?): design −30 °C (NBC 2020 App. |  |
| 4 Set-up | — | tower spacing set in plant.js, no register id ?), maker claims; | yes |
| 6 Set-up | 11410 Kingsway NW · 27–30 dBA · limit 50 | ? |  |
| 7 Exchanges | — | where they go is not modelled (?) |  |
| 7 Exchanges | — | the tool computes no COP there (?), and 60 °C radiators could take part of it directly. |  |
| 8 Exchanges | — | With air cooling the tool prices no connection (?). |  |
| 8 Exchanges | — | no Canadian per-metre cost found ?) |  |
| 9 Exchanges | Per-type figures (air, liquid to the chip, immersion): | ? |  |
| 10 Exchanges | Fire-fighting water volume | ? |  |

## Architecture
### 339 1st Ave E (Vancouver)
| Cards | Where (row) | What is missing, as the tool says it | In more |
|---|---|---|---|
| 6 Site | — | classes marked ? are our reading. | yes |
| 6 Site | — | covered beds and heated paths ? | yes |
| 6 Site | — | covered beds and heated paths from data-centre heat ? |  |
| 7 Site | — | Height base (what the by-law measures from) is not settled: the lot grade shown is not the base (?). | yes |
| 7 Site | — | The official grades are not on file, so the lot grade shown is not the base (?). | yes |
| 8 Site | — | Residential zones (among the tiles loaded): tool/data/lotside.json (), our reading (?); | yes |
| 14 Checks, 15 Checks, 16 Checks | — | otherwise, and for lanes, “street name ?”). | yes |
| 14 Checks | Ground · Shared lobby57 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | Ground · Programs shaft9 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | Ground · WC women (7)43 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | Ground · WC men (4)25 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | Ground · Cot and supply storage14 m² · min ?, 1.6 m wide · step 6 · rank 1 | min ?, 1.6 m wide · | yes |
| 14 Checks | Ground · Programs mechanical, emergency panel14 m² · min ?, 2 m wide · step 6 · rank 1 | min ?, 2 m wide · | yes |
| 14 Checks | Ground · Loading space 1, Class B 10.2 × 3.4 m35 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | Ground · Dock and lift lobby (entrance)65 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | Ground · DC staff entrance: vestibule, guard point, portal16 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | 6 m · Clinic waiting, reception58 m² · min ?, 4 m wide · step 6 · rank 3 | min ?, 4 m wide · | yes |
| 14 Checks | 6 m · Clinic office23 m² · min ?, 2.4 m wide · step 6 · rank 3 | min ?, 2.4 m wide · | yes |
| 14 Checks | 6 m · Clinic staff lounge, lockers23 m² · min ?, 2.4 m wide · step 3 · rank 3 | min ?, 2.4 m wide · | yes |
| 14 Checks | 6 m · Clinic storage15 m² · min ?, 1.6 m wide · step 6 · rank 3 | min ?, 1.6 m wide · | yes |
| 14 Checks | 6 m · Clinic WC 110 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | 6 m · Unassigned (no use yet), off the clinic corridor66 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | 6 m · UPS room (3 modules, N+1)11 m² · min ?, 3 m wide · step 2 | min ?, 3 m wide · | yes |
| 14 Checks | 6 m · Battery room HVAC (separate)11 m² · min ?, 3 m wide · step 6 | min ?, 3 m wide · | yes |
| 14 Checks | 6 m · Meet-me room 19 m² · min ?, 2.4 m wide · step 6 | min ?, 2.4 m wide · | yes |
| 14 Checks | 6 m · Sprinkler valve room, cylinders5 m² · min ?, 1.5 m wide · step 6 | min ?, 1.5 m wide · | yes |
| 14 Checks | 6 m · Janitor (DC)6 m² · min ?, 1.5 m wide · step 6 | min ?, 1.5 m wide · | yes |
| 14 Checks | 6 m · DC staff WC, shower9 m² · min ?, 1.6 m wide · step 1 | min ?, 1.6 m wide · | yes |
| 14 Checks | 6 m · Garbage and recycling71 m² · min ?, 2.4 m wide · step 6 | min ?, 2.4 m wide · | yes |
| 14 Checks | 6 m · Security control room / NOC36 m² · min ?, 2.4 m wide · step 6 | min ?, 2.4 m wide · | yes |
| 14 Checks | 6 m · Unassigned (no use yet)98 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | 10 m · Data hall (one storey)1,137 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | — | stretcher widths in CSA Z8000, unread ?) | yes |
| 14 Checks | — | Edmonton not given, Vancouver’s used ?) and a 6.1 m yard aisle behind the building (drawing choice) | yes |
| 14 Checks | — | step-free across the yard and its grades not checked (?); … maximum front setback not read (?); … noise at the yard not checked (?); … figures ? until the heat cascade research) | yes |
| 14 Checks | — | not drawn ?) | yes |
| 17 Checks | — | ramp ≤ 1:12 inside the lobby: 12 m plus landings (VBBL 3.8.3.5) (?) |  |
| 17 Checks | — | chillers ≥ 5 m from drains: drains not drawn (?); … A2L leak distance ? ; … MV/HV distance ? | yes |
| 18 Visualize | — | ? no heat demand figure in the tool |  |
| 19 Visualize | — | those marked ? are to check. | yes |
| 19 Visualize | — | notes marked "?" in the rules |  |
| 21 Visualize | — | Notes marked "?" in the rules |  |
| 21 Visualize | — | Notes marked "?": rules the tool could not settle. | yes |
| 22 Report | — | every rule with its result: pass, flagged or ? |  |
| 22 Report | — | 14 rules for this layout: 9 noted, 5 with a ?, 0 to fix |  |

### 64 Airport Rd NW (Edmonton)
| Cards | Where (row) | What is missing, as the tool says it | In more |
|---|---|---|---|
| 21 cards (2 Site … 22 Report) | ? Needs rezoning: no Edmonton zone allows a data centre with public uses (IH and EETC: no Community, Health or Emergency Service; BE: no Maj | ? |  |
| 6 Site | — | classes marked ? are our reading. | yes |
| 6 Site | — | covered beds and heated paths ? | yes |
| 7 Site | — | Datum: CGVD2013 (?), not settled. | yes |
| 7 Site | — | Height base (what the by-law measures from) is not settled: the lot grade shown is not the base (?). | yes |
| 7 Site | — | Which method applies is not known, so the lot grade shown is not the base (?). | yes |
| 8 Site | — | Residential zones (among the tiles loaded): tool/data/lotside.json (), our reading (?); | yes |
| 8 Site | — | Hotel beside the lotComfort Inn (J.B., 3 Nov 2026): no Comfort Inn found in the building data or in OpenStreetMap near the lot (?). … means: ? | yes |
| 14 Checks, 15 Checks, 16 Checks | — | otherwise, and for lanes, “street name ?”). | yes |
| 14 Checks | Ground · Exit passage from the public corridor to the street14 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | Ground · Shared lobby70 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | Ground · Clinic waiting, reception46 m² · min ?, 4 m wide · step 6 · rank 3 | min ?, 4 m wide · | yes |
| 14 Checks | Ground · Clinic office28 m² · min ?, 2.4 m wide · step 6 · rank 3 | min ?, 2.4 m wide · | yes |
| 14 Checks | Ground · Clinic staff lounge, lockers28 m² · min ?, 2.4 m wide · step 3 · rank 3 | min ?, 2.4 m wide · | yes |
| 14 Checks | Ground · Programs mechanical, emergency panel10 m² · min ?, 2 m wide · step 6 · rank 1 | min ?, 2 m wide · | yes |
| 14 Checks | Ground · WC women (7)32 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | Ground · WC men (4)18 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | Ground · Cot and supply storage33 m² · min ?, 1.6 m wide · step 6 · rank 1 | min ?, 1.6 m wide · | yes |
| 14 Checks | Ground · Clinic WC 18 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | Ground · Clinic storage8 m² · min ?, 1.6 m wide · step 6 · rank 3 | min ?, 1.6 m wide · | yes |
| 14 Checks | Ground · Unassigned (no use yet), off the clinic corridor42 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | Ground · Data hall (one storey)1,178 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | Ground · Exit passage (2 h) from the secure corridor to the rear16 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | Ground · UPS room (3 modules, N+1)39 m² · min ?, 3 m wide · step 2 | min ?, 3 m wide · | yes |
| 14 Checks | Ground · Battery room HVAC (separate)39 m² · min ?, 3 m wide · step 6 | min ?, 3 m wide · | yes |
| 14 Checks | Ground · Meet-me room 131 m² · min ?, 2.4 m wide · step 6 | min ?, 2.4 m wide · | yes |
| 14 Checks | Ground · Sprinkler valve room, cylinders20 m² · min ?, 1.5 m wide · step 6 | min ?, 1.5 m wide · | yes |
| 14 Checks | Ground · DC staff WC, shower21 m² · min ?, 1.6 m wide · step 1 | min ?, 1.6 m wide · | yes |
| 14 Checks | Ground · Loading space 1, 9.0 × 3.3 m30 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | Ground · Dock lobby (entrance)44 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | Ground · DC staff entrance: vestibule, guard point, portal34 m² · min ? · step 6 | min ? · | yes |
| 14 Checks | — | stretcher widths in CSA Z8000, unread ?) | yes |
| 14 Checks | — | Edmonton not given, Vancouver’s used ?) and a 6.1 m yard aisle behind the building (drawing choice) | yes |
| 14 Checks | — | the front is the site model’s pick, not checked against 64 AIRPORT ROAD NW (?) | yes |
| 14 Checks | — | no safe distance in the maker’s guide (?) | yes |
| 14 Checks | — | 9–10): chillers are a placeholder (?) | yes |
| 17 Checks | — | Edmonton: grades ? (J.B. |  |
| 17 Checks | — | chillers ≥ 5 m from drains: drains not drawn (?); … A2L leak distance ? ; … MV/HV distance ? | yes |
| 18 Visualize | — | ? no heat demand figure in the tool |  |
| 19 Visualize | — | those marked ? are to check. | yes |
| 19 Visualize | — | notes marked "?" in the rules |  |
| 21 Visualize | — | Notes marked "?" in the rules |  |
| 21 Visualize | — | Notes marked "?": rules the tool could not settle. | yes |
| 22 Report | — | every rule with its result: pass, flagged or ? |  |
| 22 Report | — | 10 rules for this layout: 5 noted, 4 with a ?, 1 to fix |  |

