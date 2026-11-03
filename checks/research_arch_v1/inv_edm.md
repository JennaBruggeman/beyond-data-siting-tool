# Data centre inventory, Edmonton region (inv_edm, 2 Nov 2026)

Scope: Edmonton, Leduc County (Nisku, Genesee), Parkland County (Acheson, Keephills, Sundance), Sturgeon County, Strathcona County, St. Albert, Spruce Grove, Fort Saskatchewan, Beaumont, Leduc.
Kinds: PERMIT = City permit row · REG = AUC / IAAC / AESO · MUNI = county page or notice · OC = operator claim · OBS = J.B. site visit · LEAD = directory, not evidence · "?" = not confirmed.
Coordinates: City permit geocode (arch_inv_edmPermitRows) unless stated. Rural sites: legal land from the AUC where given; otherwise "?".
New ids are in inv_edm_sources.json. Reused ids: quEDM1_2026, quEDM2_2026, edmPermits, edmPermitsDC2026, fieldJB, yegixStatus, edmLDA26, edm_dcpage, aesoList, aesoLargeLoad, aesoDCupd2025, alta117_2026, edm20001. "sources/01 §n" = earlier hunt notes.

## Summary table

| # | Facility · operator | Address · coords | Status (source, date) | Building type | Size claims | Cooling / power claims | Heat reuse | Serves | Opened | Permit / council notes | Type |
|---|---|---|---|---|---|---|---|---|---|---|---|
| E1 | Qu EDM1 · Qu Data Centres (earlier Primus, then Rogers ?) | 10200 102 Ave NW (Edmonton City Centre West), 3rd floor · 53.54358, −113.49570 (address from permits; Qu gives only "Financial Core") | operating (OC arch_inv_quEdmPage, read 2 Nov 2026) | floors in a downtown office/retail building (PERMIT "office/retail building", 3rd floor) | OC: 18,000 ft² building, 15,712 ft² raised floor; 2.5 MW (listing) vs 1 MW (FAQ) ? | OC: 248 tons N+1 cooling, type ?; "N+1 1MW Generators (x3)", 24 h fuel (sources/01 §11) | none stated | colocation: government, financial, enterprise (OC) | ? (in use by 2011: PERMIT "Primus Data Centre") | PERMIT 2013: "add a fuel tank room in basement level and roof top concrete pad and curbs" | a |
| E2 | Qu EDM2 · Qu Data Centres (permits: Rogers EDC2) | 17204 114 Ave NW, Armstrong Industrial · 53.56421, −113.61885 | operating (OC arch_inv_quEdmPage) | converted industrial: warehouse with addition (PERMIT 2015, 2020) | OC: 35,000 ft² building; raised floor 19,000 + 14,196 ft²; 8 MW design (page) / 2.5 MW Tier II, 3 MW Tier III (sheet) ? | OC: 1,450 tons N+1; Uptime Tier III. OBS: cooling units on a raised platform, "Munters" casings, electrical pad. PERMIT: "2 generator buildings" (2019), exterior self-enclosed generator (2020) | none stated | colocation: provincial government, oil and gas, health, finance (OC) | ? (data-centre addition 2015, PERMIT) | PERMIT 2020: Hall 7 & 8 in "empty warehouse", $4.0 M, 9,519 ft² | c |
| E3 | Wolfpaw EDM1 · Wolfpaw Services | 303, 10060 Jasper Ave NW (Rice Howard Place / Scotia Place, tower 1, 3rd floor) · 53.54137, −113.49260 | operating (PERMIT 2023; yegixStatus OC) | floors in an office tower | ? (PERMIT 2023 expansion 1,916 ft²) | OC: "Dual Power Grid", "Natural Gas & Diesel Backup Generator", "Redundant UPS" (arch_inv_wolfpawPage) | none stated | colocation, hosting; YEGIX exchange site (OC) | ? | sources/01 placed it at 10155 102 St (Commerce Place); the 2023 permit and YEGIX put it at Scotia Place: corrected | a |
| E4 | The Internet Centre | 4130 95 St NW, Strathcona Industrial Park · 53.47743, −113.47613 | operating (OC arch_inv_incentreAbout) | one unit in a single-storey multi-tenant row (OBS fieldJB) | OC: "a secure 3,000 sqft data centre" | PERMIT 2024: "two new RTU's (AC Only)". OBS: two rooftop condensing units. 180 kW diesel = LEAD only ? | none stated | own ISP, phone, cloud hosting, colocation (OC) | ? (2010 = LEAD only) | PERMIT building type "Communication Buildings" | b |
| E5 | Rogers West Edmonton data hall · Rogers Communications (earlier Shaw) | 10450 178 St NW, Morin Industrial · 53.54813, −113.63011 | operating (PERMIT 30 Jul 2025, data hall expansion) | data hall inside an industrial / former broadcast building (BE zone) | PERMIT: expansion 7,617 ft² | PERMIT 2016: "1 hr rated UPS Room" in Shaw control room | ? | telecom / enterprise (our reading from owner) ? | ? | Not on the Qu page; whether it is in the Rogers sale to InfraRed = LEAD only ? | b |
| E6 | Kyndryl Acheson-Edmonton · Kyndryl | 9672 279 St, Acheson, Parkland County · ? | operating ? (OBS fieldJB: plant in use; no operator page found) | purpose-built? windowless precast, ≈114 × 62 m (OBS; OSM footprint) | ? | OBS: two generator enclosures "DG-1", four pad-mount transformers, cooling plant with pipe racks. Two 550-ton water-cooled chillers = LEAD only | ? | enterprise / managed IT (our reading from operator) ? | ? | FortisAlberta territory (sources/01 §14) | c |
| E7 | EPCOR Data Centre · EPCOR | 10423 101 St NW, EPCOR Tower, P1 level · 53.54753, −113.49186 | ? (PERMIT fit-out 2011; nothing later) | below-grade floor of a 28-storey office tower | PERMIT: 3,911 ft², $3.4 M | ? | ? | enterprise (utility's own) | 2011 ? | — | a |
| E8 | Alberta Pensions Administration data centre · APA Corp. | 5103 Windermere Blvd SW · 53.43315, −113.59381 | ? (PERMIT 2009 "New Data Center") | room in a 3-storey office building | PERMIT: 2,200 ft², $2.0 M | ? | ? | enterprise (provincial pensions) | 2009 ? | — | a (low-rise) |
| E9 | Churchill Data Centre · ? | 6707 59 St NW, Roper Industrial · 53.50354, −113.42351 | ? (PERMIT 2011 only) | in an industrial building (Laird Electric site) | ? | PERMIT 2011: "2 new rooftop units" | ? | ? | ? | — | b |
| E10 | ThinkTel Edmonton · ThinkTel | 10250 101 St NW (HSBC Bank Place) ? | ? (OC names Edmonton only; 38 permits, none name a data centre: sources/01 §10) | tower floor ? | ? | ? | ? | telecom colocation ? | ? | negative permit check | a ? |
| E11 | Sobeys Data Centre · Sobeys | 12831 163 St NW, Mistatim Industrial · 53.58830, −113.59705 | closed: demolished (PERMIT 26 Aug 2021) | stand-alone "Business and Personal Services" building | ? | ? | ? | enterprise (grocer's own) | ? | end-of-life case (edmPermits) | b |
| E12 | Meta Sturgeon County campus · Meta (GLDC on the AESO list, our reading) | Alberta's Industrial Heartland, Sturgeon County; next to Greenlight plant (E½ 10-56-22-W4) ? · street address LEAD only | announced 8 Jul 2026 (arch_inv_goaNumbers); grid: 970 MW Phase 1 allocated (aesoLargeLoad); plant approved 25 Jun 2026 (arch_inv_aucGreenlight); construction start: news only ? | campus | GOV relaying OC: 2.9 M ft² facility space, 1,750 acres; 970 MW Phase 1; 1,800 MW full build-out | power: grid + Greenlight gas plant 932 MW nameplate (GoA) / 1,864 MW (AUC, two stages); 250 MW Capital Power supply deal; cooling ? | ? | AI / hyperscale (own use) | ? | water: "less water annually than a typical golf course" (Meta claim); ~$60 M local road and water infrastructure | c (rural campus) |
| E13 | Beacon Heartland AI Hub · Beacon AI Centers / Heartland Power Generation LP | Sec. 15-56-22-W4, ~7 km east of Gibbons, Sturgeon County (arch_inv_aucHeartlandNotice) | power plant approved with conditions, 23 Oct 2026 (arch_inv_aucHeartlandDecision); data halls: county permit ? | campus with co-located plant | REG (applicant): ~800 MWe to data halls; AESO P3175 400 MW DTS, ISD under review (aesoList) | REG: 920 MWe plant, 200 × 4.6 MWe Jenbacher J624 gas engines; cooling ? | ? | AI / HPC | ? (Beacon: "as early as 2027" OC) | noise impact assessment completed (limits ?); IAAC project 90123 in planning | c (rural campus) |
| E14 | Keephills data centre · TransAlta (MOU: CPP Investments, Brookfield) | TransAlta Keephills site, Parkland County · ? | proposed: Stage 1; ASP and LUB approved Sep 2025; no DP (arch_inv_transaltaKeephills); 230 MW Phase 1 allocated (aesoLargeLoad) | campus at a power plant | OC: ~230 MW, up to 1 GW; AESO P3083/P3095/P3152 (aesoList) | OC: on-site generation and gas infrastructure; cooling ? | ? | ? (no tenant named) | ? | Parkland LUB 5.80: noise impact assessment may be required (arch_inv_parklandLUB) | c (rural) |
| E15 | Sundance data load · ? (TransAlta = LEAD only) | Wabamun planning area, Parkland County ? | proposed: AESO P3136 401 MW, ISD under review (aesoList) | ? | 401 MW requested | ? | ? | ? | ? | Highvale DC district amended for power-linked investment, Jan 2025 (arch_inv_parklandHighvale); "Boreal Technology Hub" application (arch_inv_parklandDCpage) may be this or E14 ? | c ? |
| E16 | Genesee Data Centre (AESO DC 1 and DC 2) · Capital Power + unnamed developer | Genesee Mine Permit Area, Leduc County (GP overlay) · ? | proposed, not advancing immediately (arch_inv_cpGeneseeWinter2025; Summer 2026 "continuing to evaluate"); no DP in Leduc County (arch_inv_leducCountyDC, 26 Jun 2026) | campus at a power plant | OC: up to 1,500 MW; AESO P2942 1,000 + P2946 500 MW, ISD under review | OC: dedicated power facility considered | ? | ? | ? | data centres permitted in GP overlay (arch_inv_leducTA25) | c (rural) |
| E17 | Beacon Saunders Lake AI Hub · Beacon AI Centers | Leduc County near Beaumont ? (address LEAD only) | proposed: AESO P2935 400 MW, ISD under review (aesoList); Leduc County: none approved (26 Jun 2026) | campus ? | 400 MW requested | ? | ? | AI | ? | — | c ? |
| E18 | Beacon Harry Smith AI Hub · Beacon AI Centers | Acheson, Parkland County ? (OC names "Acheson"; address LEAD only) | proposed ? (OC 2025 only; not on AESO extract by this name; no Parkland record found) | ? | ? | ? | ? | AI | ? | — | c ? |
| E19 | Lynx data load (two phases) · ? | Fort Saskatchewan planning area ? | proposed: AESO P3198 + P3204, 1,800 MW each, ISD under review (aesoList) | ? | 3,600 MW requested | ? | ? | ? | ? | — | c ? |
| E20 | Sovereign Cloud data load · ? | Edmonton planning area ? | proposed: AESO P3174 74.9 MW, stage 2, ISD 2029-12-31 (aesoList) | ? | 74.9 MW (just under the 75 MW "large data centre" line, alta117_2026) | ? | ? | cloud ? | ? | — | ? |
| E21 | EETP AI data centre · Walton Global (Stantec agent) | Edmonton Energy & Technology Park, NE Edmonton · ? (253 ha = LEAD only) | proposed: ASP amendment LDA26-0225, received 6 Jul 2026; engagement to 25 Oct 2026; hearing TBD (edmLDA26, edm_dcpage) | campus ? | ? | power generation = Major Utility (City) | ? | AI | ? | City: AI data centre "a heavy industrial use"; rezoning and second hearing needed | c |

Counts: operating 6 (E1–E6; E6 by observation only) · status ? 4 enterprise or unconfirmed (E7–E10) · closed 1 (E11) · announced / plant approved 2 (E12, E13) · proposed 8 (E14–E21). Refused: none found.

## Per-facility notes (short)

**E1 Qu EDM1.** Downtown, inside the City Centre complex. Address rests on three City permits naming data rooms (2011, 2013, 2019), not on Qu. Wolfpaw EDM2 and "Powerhouse Data Centre Group" (Unit 302G, 2019) are tenants in the same building (LEAD + PERMIT). Register open item: generator and fuel details "deliberately not carried" (quEDM1_2026) — J.B. to decide if the resident card shows them.

**E2 Qu EDM2.** West industrial area. Office front, metal-clad hall behind, palisade gate, plant on a raised platform (fieldJB). Footprint ≈ 37 × 102 m, set back ~45 m (OBS). The 2012 "screening walls for exterior mechanical equipment" permit names CAREFACTOR, not Rogers: sources/01 §13 overreached.

**E3 Wolfpaw.** One downtown tower floor. YEGIX lists Wolfpaw at Scotia Place as its only facility (yegixStatus, CLAIM). Location fixed from sources/01 by the 2023 permit.

**E4 Internet Centre.** South-side industrial strip unit. Plant: rooftop DX only (PERMIT + OBS). Generator not seen.

**E5 Rogers West Edmonton.** Former Shaw broadcast building, now storage plus a data hall (PERMIT 2016, 2025). No operator page found.

**E6 Kyndryl Acheson.** Rural-industrial edge west of the city. All plant on the south side, berm and swale screen at grade (fieldJB). No primary source for capacity, year or status.

**E7–E9.** In-house data centres in offices or industrial buildings. Status since the permit is unknown.

**E10 ThinkTel.** Operator names Edmonton only. Keep off the map until a source gives an address.

**E12 Meta.** AESO: P2936 GLDC Phase 1.1 (60 + 910 MW) + P3151 Phase 1.2 (830 MW) = 1,800 MW (our arithmetic), the same as the GoA "full build-out" figure. Reading GLDC as Meta is ours.

**E13 Beacon Heartland.** AUC (800 MWe) and AESO (400 MW DTS) give different loads: the AESO figure may be grid load only ?.

**E14–E21.** Proposals only. Show them as "proposed" with the AESO MW labelled "requested in the grid queue, not built" (aesoList note).

## Classification (our reading)

- **(a) in a tower:** E1, E3, E7 (floors in multi-tenant or office towers, downtown); E8 a low-rise office, closest to (a); E10 if confirmed.
- **(b) smaller urban:** E4 (3,000 ft² unit in a shop row), E5 (hall inside an industrial building), E9, E11 (gone).
- **(c) larger urban, secure perimeter:** E2 (fenced yard, gate, plant platform, MW-scale) and E6 (fenced, barbed wire, berm). E21 would be (c) inside city limits.
- E12–E19 are rural gigawatt campuses with their own gas plants. They sit beyond (c). Suggest a fourth tag ("rural campus") or show them as (c) with a note. J.B. to decide.

## Gaps "?"

- Coordinates: E6 and all rural sites (E12–E19) have no permit geocode. AUC legal land is known for E12's plant and E13.
- Opening years: none confirmed by a primary source.
- Heat reuse: no claim found for any facility.
- Cooling type: not stated for any facility. Hints only: E2 (Munters casings, OBS), E4 (DX RTUs, PERMIT).
- IT MW: operator claims only (E1, E2). Rural MW figures are grid requests or plant sizes, not IT load.
- St. Albert, Spruce Grove, Strathcona County / Sherwood Park, Fort Saskatchewan city, Beaumont, Leduc city, Nisku: no facility found in a primary source. Only a brief search was done, so absence is not confirmed.
- Excluded as not data centres: telecom switch sites (Rogers 13004 149 St; Shaw hub 6912 76 Ave; TELUS Toll building chiller plant, 10035 102 Ave); school and office server rooms; WCB "data centre rooms" (2011, 2016). Add them only if J.B. wants enterprise rooms.
- Unconfirmed directory leads, not mapped: 4WEB (14315 118 Ave NW, an office park; no matching permit); Five Nine (17008 90 St NW; no permit rows).
- Blocked, not circumvented: IAAC project page 90123 and its PDFs (fetch not permitted from here); yourparkland.ca/transaltadatacentre ("Boreal Technology Hub"); engaged.edmonton.ca/eetpdatacentre (not re-read; register text used); TransAlta ASP poster PDF (site error).
- Not read: AUC Decision 30518-D01-2026 conditions; Meta's own announcement (only GoA relay and news found); Sturgeon County development permit for Meta.
