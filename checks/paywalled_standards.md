# Paywalled standards to find (J.B. to look for through UBC Library)

Kept by Claude; updated as research finds more. "Why" = what the tool needs from it.

| Standard | Why | Where it's cited |
|---|---|---|
| ASHRAE 62.1-2022: OBTAINED 1 Nov 2026 (register ashrae621_2022). A later addendum has the generator row | Generator and cooling-unit exhaust distances to a refuge, pool or greenhouse intake | Architecture mode spatial rules |
| CSA C282 (emergency electrical power supply for buildings) | Generator rooms, testing, exhaust; whether it covers a data centre's IT generators | Generator testing; plant schedule |
| CSA B139 (installation code for oil-burning equipment, incl. generator fuel tanks) | Fuel tank limits and siting (the fire code's Part 4 does not apply) | fuel_on_site |
| NFPA 37 (2024) | PARTLY OBTAINED 1 Nov 2026 (pp. 37-8 to 37-12, register nfpa37_2024). Fuel rooms and exhaust chapter read too (pp. 37-13 to 37-18). Its exhaust rule sends you to NFPA 211 (low priority) | Plant clearances |
| Canadian Electrical Code (CSA C22.1) | Working space; customer-owned substations | Plant schedule |
| TIA-942 | Data-hall floor loads by rating | Floor loads |
| ASTM F2656 | Crash ratings (M30–M50) | Fence (not drawn) |
| ASHRAE Handbook, HVAC Applications (natatorium / pool heating chapter) | Peak pool heat per m² of water; heat-exchanger supply temperature; therapy pool temperatures | Architecture mode pool (gaps_round2) |
| AS 3979 (Hydrotherapy pools, Standards Australia) | Therapy pool water temperature and design | Architecture mode pool (gaps_round2) |
| VDI 2089 Part 1 (Building services in swimming baths, indoor pools) | Pool hall air/water temperatures; heat demand basis | Architecture mode pool (gaps_round2) |
| CSA Z8000 (Canadian health care facilities) | Institutional laundry space planning (Canadian instead of US VA criteria) | Architecture mode laundry (gaps_round2) |
| CSA Z317.2 (HVAC in health care facilities) | Where cooling-tower and other exhaust may discharge near a hospital (NBC 6.3.2.15.(6) defers to it) | Architecture mode separations |
| ASHRAE 188 (Legionellosis risk management for building water systems) | Whether it sets any cooling-tower distance to intakes or hospitals | Architecture mode separations |
| ASHRAE Guideline 12 (minimizing Legionellosis risk), s. 7.6.2 | Cooling-tower water treatment the NBC requires (6.3.2.15.(9)) | Architecture mode separations |
| CAN/ULC-S655 (protected aboveground tank assemblies) | A listed protected tank waives the fire-code tank distances (NFC 4.3.2.1.(7)) | Architecture mode separations; fuel_on_site |
| NFPA 855 (2026): OBTAINED 1 Nov 2026 (Ch. 1, 4, 9; register nfpa855_2026) | Battery storage distances; register holds screenshots of the 2026 reader only | Architecture mode separations |
| UL 9540A (battery fire test method) | Units tested to it may follow the maker's spacing instead of CEC 64-926 distances | Architecture mode separations |
| CSA C22.2 No. 107.3 (UPS equipment) | UPS batteries sit outside the CEC ESS rules; siting rules for them ? | Architecture mode separations |
| NFPA 75 (2024): OBTAINED 1 Nov 2026 (Ch. 4–9 parts, register nfpa75_2024) | Whether the data hall itself must be a fire-rated room (1 h or 2 h), separate from what the building code asks | Architecture mode: hall separation (J.B. 31 Oct: her understanding is 2 h) |
| ~~FM Global Data Sheet 5-32~~ | OBTAINED 1 Nov 2026 (J.B. upload; free at fm.com/datasheets); in the register as fmDS0532. Related FM sheets it cites, also free: 5-23 (emergency power), 5-28 (DC batteries), 13-26 (engines), 7-88 (outdoor tanks), 1-40 (flood) | Same |
| ASHRAE TC 9.9 Thermal Guidelines for Data Processing Environments | Server-room air filtration (MERV levels for recirculated and outdoor air) | Clean air in the hall |
| CSA B52 (Mechanical refrigeration code) | Refrigeration machinery-room rules (exits, detection, ventilation, what may adjoin a chiller room); NBC/NBC(AE) 6.2.1.5 defer to it; BCBC defers to the Safety Standards Act | Architecture mode adjacency (adj_service) |
| NFPA 2001 (Clean agent fire extinguishing systems) | Whether a gas-suppressed data hall limits adjacent public rooms (room integrity, agent leakage, occupied-space limits); named in NFC(AE) 2.1.3.5 only | Architecture mode adjacency (adj_service) |
| NFPA 96 (Commercial cooking ventilation) | Café hood and grease-duct exhaust discharge distances to data-centre intakes (NBC 6.3.1.6, 3.6.3.5) | Architecture mode adjacency (adj_service) |
| NFPA 68 / NFPA 69 (explosion venting / prevention) | Explosion relief for an oil-filled transformer vault and what may sit beside it (NBC Note A-3.6.2.7.(5)) | Architecture mode adjacency (adj_service) |
| CSA B149.1 (Natural gas and propane installation code) | Gas appliance and gas-genset vent clearances to intakes and windows (NBC 6.3.3.1.(1)); roof access in NBC(AE) 3.6.4.7 | Architecture mode adjacency (adj_service) |
| NFPA 13 (Sprinkler installation) | Sprinkler design for the data hall and plant rooms (NBC 3.2.5.12) | Architecture mode adjacency (adj_service) |
| CSA Z32 (electrical safety and essential electrical systems in health care facilities) | Whether a hospital next to a data centre may share or must keep its own essential electrical supply, and generator siting near a hospital; CSA's public scope page names only "essential electrical systems" and defers emergency power not in Clause 6 to CSA C282 | Architecture mode adjacency (adj_programs) |
| ISO/IEC 22237 series (data centre facilities and infrastructures; EN 50600 equivalent) | Whether Part 1/2 (construction) sets any site-selection or adjacency rule for neighbouring uses (iso.org abstract page failed to load) | Architecture mode adjacency (adj_programs) |
| TIA-942 (site selection and architectural annex) | Whether its site-selection guidance names distances from adjacent hazards or other occupancies (TIA's public paper only says to follow TIA-942) | Architecture mode adjacency (adj_programs) |
| Alberta Early Learning and Child Care Regulation (Alta Reg 143/2008), full text | Not paywalled but blocked to this session (CanLII robots; King's Printer not reached): check for any premises-location rule beyond the handbook | Architecture mode adjacency (adj_programs) |
| CSA C282:24, Clauses 1.1 (Notes 3, 5, 6), 6.4.1 and Annexes D and E | Whether an IT-only standby generator must (or only "should") follow C282, and how one set may feed both life-safety and IT loads | Architecture mode open items (open_items) |
| BC Fire Code 2024 Schedule and Ministerial Order FSA 2023 1 (free, www2.gov.bc.ca PDFs) | Not paywalled but download refused by this session's network proxy; J.B. to save the PDFs so the full Schedule text can sit in data/raw/codes/ | Architecture mode open items (open_items) |
| Treasury Board of Canada, Fire Protection Standard for Electronic Data Processing Equipment (rescinded 2010) | Not paywalled but blocked to this session (tbs-sct.canada.ca rejected; archive rate-limited): a federal rule set for EDP rooms (separation, siting) | Architecture mode open items (open_items) |
| CSA C900.1:21 (Thermal energy meters, Part 1) and CAN/CSA-C900-13 | Meter accuracy and installation (straight runs, sensor placement) at the data centre / receiver hand-over; Measurement Canada T-1 accepts C900-13 | Architecture mode hand-over (handover.md) |
| EN 1434 (Thermal energy meters, CEN) | Same; accepted by Measurement Canada T-1 and named in UBC 33 61 00 | Architecture mode hand-over (handover.md) |
