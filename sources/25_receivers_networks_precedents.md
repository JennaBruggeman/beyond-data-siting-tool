# 25 — Receivers, district-energy service areas, noise zones, Canadian precedents (15 Oct 2026)

## Receiver datasets (files from J.B., 15 Oct; data/raw/receivers/)
| Dataset | Version | What the tool takes | Vancouver | Edmonton | Status |
|---|---|---|---|---|---|
| Statistics Canada ODSRF v2 (sport and recreation) | product 2021001, released 24 Sep 2026 | recreation centres, pools, indoor arenas (community-league outdoor rinks left out) | 27 recreation centres, 1 arena, **0 pools** (Vancouver's pools are not separate records; recreation centres may contain pools or rinks — contents not recorded) | 161 recreation centres, 23 pools, 22 arenas | government dataset |
| Statistics Canada ODHF v1 (health) | published 17 Apr 2020 | hospitals; nursing and residential care | 20 hospitals, 103 care (7 + 22 without location) | 13 hospitals, 2 care (21 + 22 without location) | government dataset; dated |
| Statistics Canada ODEF v2.1 (education) | published 28 Nov 2022 | schools (StrongStart and ECS operators left out) | 202 | 254 | government dataset |
| City of Vancouver non-market housing | open data export, 15 Oct 2026 | 641 projects with status, occupancy year, operator, unit counts | 641 | — | City open data |
Records without coordinates are counted, not geocoded by guess. Build: tool/make_receivers.py → tool/receivers_{van,edm}.json.

## Vancouver Energy Utility System By-law 9552 (NEU), consolidated to By-law 14524, effective 1 Jan 2026 — data/raw/van/9552c.pdf (PRIMARY)
- Schedule A (p. 25): service area map — from BC Place / Union St in the north to Clark Dr and Great Northern Way in the east, E 5th–6th Ave, W 7th Ave, Ontario, W 3rd–4th Ave and Cambie St in the south-west.
- Traced 15 Oct (data/networks/van_neu_9552_traced.geojson): 2.3 km², ±45 m. 111 E 5th Ave is inside (70–130 m from the line), consistent with RTS 19744 making NEU heat delivery a material condition; 308 E 5th is 31 m outside (on the edge).
- **s. 2.1 Compulsory use:** in the service area, a new building needing a building and occupancy permit, or an existing building whose alterations exceed the greater of $95,000 or 100% of its latest assessed value, "must make use of the energy utility system", unless the City Engineer finds service "not practical or economical".
- s. 2.2: owners outside but near the area may apply.
- s. 5.2(a)(v): a building may add "equipment to recover waste heat energy from the refrigeration or cooling system of the building" to supplement NEU heat.
- Schedule C: energy charge $65.172/MWh (Standard Green Heat, "targeting 70% renewable"); capacity $10.466/kW peak per month (Class 3 non-residential); **credit for heat returned to the energy transfer station: $65.172/MWh × 50%**.
- Schedule B: heat-exchanger water limits (chloride ≤ 50 ppm for 304 SS, ≤ 250 ppm for 316 SS).

## Vancouver Noise Control By-law 6555 (consolidated) — data/raw/van/6555c.pdf (PRIMARY)
- Schedule A (Activity Zone): MC-1, MC-2, DD, M-1, M-1A, M-1B, M-2, IC-1, IC-2, IC-3, I-1, I-1A, I-1B, I-1C, I-2, I-3, I-4, CWD, DEOD, plus listed CD-1s — except areas inside the Schedule B.1 outline.
- Schedule B (Intermediate Zone): C-1, C-2, C-2A, C-2B, C-2C, C-2C1, C-3A, C-5, C-5A, C-6, C-7, C-8, FC-1, FC-2, FCCDD, BCPED, HA-1, HA-1A, HA-2, HA-3, HA-4, R3-1–3, R4-1, R5-1–4, RR-3A–C, and the Schedule B.1 outline (north False Creek shore, read from the map).
- Quiet zone: everything else.
- Continuous sound (ss. 2.1–2.3), day / night dBA at the point of reception:
  - from a quiet zone: to quiet 55/45, to other 60/55;
  - from an intermediate zone: to quiet 60/50, to other 70/65;
  - from an activity or event zone: to quiet 60/55, to intermediate or activity 70/65.
- 555 W Hastings (DD) is in the Activity Zone; it lies outside the B.1 outline (read from the map).

## Canadian heat-recovery precedents (research agent, 15 Oct; sources as listed; not re-read here)
| Case | Arrangement | Status | Figures (exact) | Sources (type) |
|---|---|---|---|---|
| TELUS Garden, Vancouver | data-centre heat via heat exchangers and water-to-water heat pumps into the development's thermal energy system; CHDL steam for peak and backup; owned and operated by FortisBC Alternative Energy Services | approved by BCUC 4 Feb 2013 (C-1-13), rates 9 Jan 2015 (G-2-15); current operation UNVERIFIED | "a year round base load of 1,400 kW of heat"; forecast 5,194 MWh/yr heating; designed to meet 94% of annual heating demand | BCUC C-1-13, G-155-12, G-2-15 (regulator) |
| Equinix TR5 → Markham District Energy | data-centre heat to MDE's network (homes, hotel, university, shopping centre, hot water, two pools) | heat-recovery heat pump commissioned from late 2023 | network "over 14 million square feet"; no MW figures | Equinix release 5 Jun 2024; blog 24 Apr 2025 (operator claim) |
| Humano District, Sherbrooke | Exaion servers in a former convent's mechanical room heat a water loop that preheats hot water and feeds heat pumps | operating "depuis plus d'un an" (Mar 2026) | 50 dwellings + 143 apartments; "plus de 400 tonnes d'équivalent CO2 par année" | MELCCFP article, Vecteur Environnement Mar 2026; Québec programme page (government) |
| QScale, Lévis | data-centre heat to a greenhouse complex (Les Fraises de l'Île d'Orléans) via heat pumps | under construction (Mar 2026) | "parc de serres de 12 hectares"; "23 000 tonnes d'équivalent CO2 par année"; grant 40 M$ | same government sources |
| Telehouse Canada → Enwave, Toronto | direct-to-chip heat into Enwave's closed loop, "to help heat Toronto's municipal drinking water" | upgrade complete per release (12 May 2026); heat flow UNVERIFIED | up to 80% captured by liquid (claim) | Telehouse release (operator claim) |
Note: the atlas chat's "Enwave" precedent is Telehouse; Equinix TR5's receiver is Markham District Energy, not Enwave.

## Addendum 15 Oct 2026: Edmonton district energy
- Blatchford District Energy Sharing System, City of Edmonton Bylaw C17943 (https://www.edmonton.ca/documents/Bylaws/C17943.pdf), read through the fetch tool: "service area" = the area "as delineated in Schedule A - Service Area" (s. 2(2)(q)); "the owner of a premises within the service area shall ensure that service connections to the DESS are installed for each building" (s. 6); the City Manager may exempt a building built to at least a net-zero carbon standard (s. 8); owners' duty to install connections (s. 13(1)). PUBLIC RECORD. Schedule A is a map only; not traced.
- An attempt to approximate the service area from lots in the "BLATCHFORD AREA" assessment neighbourhood gave 0.38 km², far below the redevelopment's size, so it was discarded. Tracing Schedule A (or a City GIS layer) is still needed. Downtown (DDE) phases: business case figure not yet retrieved.
