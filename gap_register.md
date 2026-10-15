# Gap register — data hunt, 6 October 2026

Beyond Data tool (ARCH 540 A2 / GP1). Compiled from five parallel source hunts run 6 Oct 2026, with the figures most likely to decide a verdict re-checked against the primary page the same day (marked **re-checked**).

Status key: **confirmed** = read in the primary document · **unverified** = located but the specific figure not read directly · **derived** = our arithmetic, assumptions stated · **operator claim** = published by the operator · **blocked** = site refused fetching (no workarounds attempted; manual download needed) · **gap** = not found after searching.

Full hunt reports with every URL are in `sources/` (five files). This register is the summary and the to-do list.

---

## 0. Headline findings (what changed since the handoff)

1. **The only public, stated data-centre load in either city is 111 E 5th: "up to 40 MW"** (RTS 19744 p.18, re-checked). Everything else is operator claims or inference.
2. **Vancouver has a revealed heat purchase price.** By-law 9552 Schedule C: credit for heat returned to the NEU = $65.172/MWh × 50% = **$32.59/MWh** (re-checked). This is the City's own willingness to pay for third-party heat.
3. **RTS 19744 puts the heat-recovery infrastructure at the applicant's "sole cost"** with no payment specified and $0 public benefits (re-checked). Operator floor at that site is implicitly $0 plus unrecovered capex.
4. **BCUC Order G-94-25 is a rejection, not an approval** (the $38.5 M Creative Energy capex schedule). It contains no heat purchase, data centre or 150 W Georgia content. The handoff's description needs correcting.
5. **Edmonton downtown district energy is City-owned and EPCOR-delivered, not ENMAX** (ENMAX exemption denied, AUC 24056-D01-2019; Phase 1 operational Sep 2025, gas-fired). Handoff §7 needs correcting.
6. **AESO 1,200 MW interim cap: fully allocated to two projects** (GLDC 970 MW; Keephills Phase I 230 MW) (re-checked). Phase 2A "bring your own generation" proposed a 1,600 MW bridging limit (June 2026 deck); final process and post-Aug-2026 results not found.
7. **BC Hydro's own CPCN says downtown Vancouver has "no room to add more capacity"**; all 12 kV feeder positions in use by fiscal 2027; new West End Substation (400 MVA) in service July 2032. Queue confidential (Business Practice v1.5, s.3.2).
8. **Edmonton gas is so cheap the heat price window may be negative.** DERS commodity $1.458/GJ + ATCO North distribution ≈ $2.52/GJ → ~$11/MWh heat at 85% (derived). Every Nordic purchase price except Fortum's summer band sits above it.
9. **Edmonton Bylaw 14600 has no continuous/Leq provision**; limits are instantaneous dBA at the residential property line (65 day / 50 night). Vancouver 6555 has continuous-sound limits by zone pair (e.g. intermediate → quiet: 60 day / 50 night) and **no low-frequency provision for mechanical equipment**.
10. **AUC Rule 012 does not list data centres as a "facility"** (s.1.1(2)); it applies via the associated power plant or substation.
11. **No measured energy use found for any of the 13 sites.** Energize Vancouver disclosure is opt-in and the open-data API is robots-blocked for us; a manual check of the disclosure map is the next step.
12. **Open-loop groundwater heat exchange needs a water licence in BC** (Water Sustainability Regulation Sch. A item 9 "Heat exchange", item 4 "Cooling"). Alberta's rule for open-loop/ATES is unresolved (Directive PDF blocked).

---

## 1. IT load and cooling type (Lane 1 — observe and size)

| Site | Power | Floor area | Cooling | Public record | Status |
|---|---|---|---|---|---|
| Harbour Centre, 555 W Hastings | Cologix VAN5 1.6 MW; eStruxture VAN-2 2.14 MW critical IT; VAN1 unstated → **≥3.7 MW lower bound from claims** | VAN1 5,000 ft²; VAN5 10,800 ft² | Glycol/DX with **rooftop dry coolers** (Cologix); VAN-2 dry coolers + N+1 chillers and cooling towers | none found | operator claims |
| Cologix VAN4, 175 W Cordova | 4 MW; 3–10 kW/cabinet | 68,000 ft², four floors | pumped refrigerant + **air-cooled chilled water**; **DP-2022-00689 (issued 26 Jul 2023) confirms "new air cooled chiller units", transformer replacement, fuel tank removal** | shapeyourcity.ca/175-w-cordova-st | claim + public record |
| Cologix VAN2, 1050 W Pender | 2 MW; 12.5 kV BC Hydro primary; 2 × 750 kW generators | 15,000 ft²; 150 W/ft² design | perimeter DX CRAC with airside economisers, 180 t N+1 | none | operator claim (French spec sheet) |
| Hut 8, 900 W Hastings | VAN1 0.6 MW design; 435 kW gen; **Vault** 1 MW design, 600 kW gen | VAN1 "900 ft²" (implausible vs 0.6 MW — flag); Vault 6,210 ft² / 4,155 ft² whitespace | VAN1 118 t CRAC; Vault 5 chillers, closed-loop CHW | none; address linkage Vault ↔ 900 W Hastings unresolved | operator claim |
| 111 E 5th / 2060 Quebec (RTS 19744) | **up to 40 MW** (p.18) | site 2,767.3 m²; staff est. up to 4.2 FSR = 11,622.6 m²; 3 storeys + 2 below | not specified; VBBL requires cooling-water recirculation | council.vancouver.ca/20260714/documents/rr1.pdf | **public record, re-checked**; TELUS named nowhere in City documents (press only) |
| eStruxture VAN-1, 55 E 7th | 2.4 MW critical IT; **2.5 MVA unit substation** | 10,000 ft² total; 7,500 ft² cabinet space; 3 floors | rear-door cooling; 40 t + 250 t loops; free cooling "8+ months/yr" | none | operator claim (datasheet PDF) |
| Atlas Cloud, 308 E 5th | nothing published by operator | — | — | none | **gap** (aggregator only; do not cite) |
| UBC, Pharmaceutical Sciences | — | 5,000 ft²; 110 racks | heat recovered to building; ~1.2 GWh/yr building-level saving (BC Hydro case study) | it.ubc.ca; BC Hydro PDF | public (university/utility); kW **gap** |
| Wolfpaw, Rice Howard Place T2 | none published | — | — | permits 2009, 2013 "server room" renovations at 10155 102 St | **gap** |
| ThinkTel, 10250 101 St | none | — | — | 38 permits, none data-centre related | **gap** |
| Qu EDM1, 10200 102 Ave | 2.5 MW; 3 × 1 MW gen | 18,000 ft² bldg; 15,712 ft² raised floor | 248 t N+1, type unstated | permits 2011 (Primus), 2013 ($1 M data room), 2019 | operator claim (spec sheet); address link unverified |
| Internet Centre, 4130 95 St | none | — | **2024 permit: two new RTUs, AC only** → rooftop DX | Edmonton permits API | public record (cooling) |
| Qu EDM2, 17204 114 Ave | 2.5 MW Tier II / 3 MW Tier III; 3+2 × 1 MW gen | 35,000 ft²; raised floor 19,000 + 14,196 ft² | 1,450 t N+1, type unstated | permits 2012–2020 incl. "Hall 7 & 8 expansion" $4 M (Rogers era) | operator claim + permits |

Sizing coefficients found: LBNL 2024 per-server power 600 W (2023) → 782 W (2028) for 2-socket; AI servers 3–12 kW rated; colocation utilisation 21% → 35%; idle 36% (2023) (Fig 3.1–3.6, pp.19–27). Server mass: Dell R740 (2U) 26.3 kg; R540 (2U) 25.4 kg; R650 (1U) 21.25 kg — manufacturer carbon-footprint PDFs. Green Grid SEED database is login-gated and non-redistributable (**blocked**).

**To do (Jenna):** open energycarbonreport.vancouver.ca/map and opendata.vancouver.ca by hand for the 8 Vancouver addresses; pull Vancouver building-permit records for each address (API blocked); confirm cooling plant from your own roof photographs.

## 2. Grid capacity (Lane 4 — test the match)

| Item | Finding | Source | Status |
|---|---|---|---|
| West End Substation CPCN (10 Nov 2025) | 400 MVA, 230/25 kV at 1150 Nelson; "no room to add more capacity" downtown; all 12 kV feeder positions in use by F2027; in-service Jul 2032; $756 M–$1.391 B. No MW load table; no data-centre mention. | bchydro.com CPCN initial application PDF, s.2.1–2.4 | confirmed (quotes); load MW **gap** |
| East Vancouver Substation | replaces Murrin (1947); in-service 2031 | news.gov.bc.ca 2026ECS0052 | confirmed |
| BC Hydro load queue | "not publicly available as it contains confidential customer information" | Business Practice Load Interconnection Queue Mgmt v1.5, 27 Feb 2026 | confirmed |
| BC Hydro capacity map | none exists | — | gap (confirmed absence) |
| 2026 Call for Demand for Emerging Industries (RFA 1 Feb 2026) | 100 MW storage DC + 300 MW AI DC; 10–145 MW per project; ≥10% price premium; mandatory curtailment; Stage 2 weights: cost/benefit 30, economic 20, **environmental 10 (heat-recovery-ready inside it, with PUE and WUE)**, data sovereignty 30, First Nations 10; outcome mid-Sep 2026 **not found** | app.bchydro.com 2026-cfd-request-for-applications.pdf, s.9.2 Table 1, Sch. 2–3 | confirmed |
| Industrial Electricity Allocation Framework | Bill 31 (Nov 2025); ≥10 MW projects must compete; 400 MW AI/DC over two years | www2.gov.bc.ca framework page | confirmed |
| 2025 IRP (filed 31 Oct 2025) | body not fetched (BCUC 403); overview gives no headroom figures | bchydro.com IRP page; CBRAC overview | **blocked** |
| AESO 2025 LTP | ">8,600 MW" DC applications in 2024, **not modelled**; Edmonton region peak 2,198 MW; Kennedale/Namao insufficient under contingency | aeso.ca 2025 LTP p.62, pp.35–38 | confirmed |
| AESO interim cap | 1,200 MW; fully allocated to P2936 GLDC 970 MW + P3083 Keephills I 230 MW; "City of Edmonton has a load of approximately 1,400 MW" | aeso.ca large-load-projects page; 4 Jun 2025 release | **confirmed, re-checked** |
| Phase 2A / BYOG | ~20.1 GW queued (Q1 2026); proposed 1,600 MW bridging limit at 20/30/40% of load by generator milestone; rollout targeted Aug 2026 | AESO Engage June 2026 deck pp.11–72 | confirmed to Jun 2026; later **gap** |
| EPCOR Woodcroft Deficiency Report (Rev 1, 12 Sep 2025) | 3 × 40 MVA; N-1 firm 76 MVA; peak 66.2 (2025) → 76.3 (2032); deficit from 2032 before any large load; fix to 100 MVA 2026–28 | aeso.ca/assets/Uploads/projects/2582/ | confirmed |
| EPCOR Edmonton capacity map | none (EPCOR's maps are for Collingwood, Ontario) | — | gap (confirmed absence) |
| ENMAX Calgary Load Capacity Map | exists, ArcGIS | enmax.com/system-resources | confirmed (existence) |
| AUC on data centres | "no separate regulatory category"; Rule 007 applies to associated plant | AUC Data Centre fact sheet; Bulletin 2025-14 | confirmed |
| Alberta Data Centre Regulation (AR 117/2026?) | cited by law firms; primary text not located | — | **unverified** |

**Implication for the tool:** Vancouver grid condition cannot be stated as MW headroom; it is "post-2031/32, subject to project-specific study and Call selection". Edmonton grid condition at system level is a near-known "no" for grid-only new load until Phase 2 settles; at distribution level a typical inner-city POD has ~10 MVA N-1 headroom today.

## 3. Heat price window (Lane 4)

### Operator floor — revealed purchase prices

| Source | Value | Status |
|---|---|---|
| Fortum Avoin kaukolämpö (Espoo), valid from 1 May 2026 | €50 (≤ −8 °C) stepping down to €11/MWh (≥ 16.1 °C); 11 bands; VAT 0 | **confirmed, re-checked** |
| Fortum in CAD (BoC 5 Oct 2026, 1 EUR = 1.5974) | $17.6 – $79.9/MWh | derived |
| Stockholm Exergi Öppen Fjärrvärme | no public tariff; "indikativt 2 MSEK årligen för 1 MW vid 5 000 timmar" → 400 SEK/MWh ≈ $56.8 CAD/MWh; supply normally 68 °C; priced on avoided own production cost | confirmed (utility claim) + derived |
| Helen (Helsinki) | case-by-case; minimum 80 °C | confirmed |
| **False Creek NEU returned-heat credit** | **$65.172 × 50% = $32.59/MWh** (By-law 9552 Sch. C Pt 4, consolidated to By-law 14524 eff. 1 Jan 2026) | **confirmed, re-checked** |
| 111 E 5th | infrastructure at applicant's sole cost; no payment specified | confirmed, re-checked |
| Pärssinen et al. 2019 (open access, Aalto) | heat-pump capex €60 k / €575 k (2 MW) / €5.5 M; DH operator pays marginal cost minus €5/MWh; payback 1.8–5.1 yr | confirmed |
| Wahlroos et al. 2017 (open access, Aalto) | assumed purchase price €13.8–40.4/MWh seasonal; heat pump to 75 °C payback < 2 yr | confirmed |
| Lygnerud & Werner 2018 | ~6% of recoveries lost per year; risk premium "lower than often presumed"; full text paywalled | abstract only, **blocked** |

### Buyer ceiling — avoided cost

| Item | Value | Status |
|---|---|---|
| FortisBC Rate 3 (large commercial), eff. 1 Jul 2026 | variable ≈ $9.12/GJ (delivery 5.165 + S&T 1.171 + gas 1.660 + riders) → $32.8/MWh fuel → **$38.6/MWh heat at 85%** | confirmed + derived (Rider 6 excluded; BC carbon tax zero since 1 Apr 2025) |
| NEU energy charge (retail) | $65.172/MWh; Class 1 net effective $141.4/MWh (RTS 18251) | confirmed |
| NEU fuel inputs | gas $2.23/GJ commodity; RNG $9.23 + $7.00/GJ → ~$69/MWh heat | confirmed + derived |
| Creative Energy 2025 Core steam | $13.84/M# → ≈ $47/MWh (assumes ~0.293 MWh/M#) | confirmed + derived (assumption flagged) |
| BC Hydro RS 1830 (eff. 1 Apr 2026) | demand $12.178/kVA; energy 4.914 ¢/kWh (RS 1823 closed) | confirmed |
| Alberta DERS regulated gas, Oct 2026 | $1.458/GJ; Apex $1.602/GJ | confirmed (UCA) |
| ATCO Gas North Mid-Use (2025 interim) | $1.062/GJ variable; High-Use demand-based | confirmed; 2026 values **gap** |
| Edmonton gas heat ceiling | ≈ $2.52/GJ → **~$11/MWh heat at 85%** | derived |
| EPCOR default supply Aug 2026 | 7.22 ¢/kWh (<150 kW) | confirmed |
| Blatchford REU 2026 | $0.0358/kWh variable (+ $13.18/kW·month multi-unit) | confirmed |
| Edmonton downtown DE rates | not published | gap |

**Derived window.** Vancouver: floor $18–57 (Nordic) with City's revealed WTP $32.59; ceiling $39 (gas) – $69 (RNG). Overlap exists → economic condition can pass. Edmonton: floor $18–57; ceiling $11–36 → window likely negative without a carbon price or capacity value. These are derived ranges, not findings.

## 4. Grid factors, weather, demand (Lanes 2–3)

| Item | Finding | Status |
|---|---|---|
| BC grid factor 2025 | 22.8 tCO2e/GWh, consumption-based, BC Hydro Integrated Grid (2024: 9.9) — www2.gov.bc.ca/.../climate-change/data/electricity | confirmed |
| Alberta 2024 | 335 g/kWh, **generation-based**, citing NIR 2026 Table A7-10 Annex 7 (annex renumbered from 13 → 7) | confirmed on GoA page; NIR table **unverified** |
| BC long-run marginal factor | none published; 2021 IRP PDF unread | **gap** |
| Alberta displacement factor | Carbon Offset Emission Factors Handbook v3.0: 0.52 tCO2e/MWh (renewables), 0.55 (grid use with losses), 2018–20 data — operating/build-margin construct, not labelled "marginal"; newer editions unchecked | confirmed values; interpretation unverified |
| Gagnon et al. 2022 | correct title "Short-run marginal emission rates omit important impacts…", PNAS 119(49); US only; Cambium does not cover Canada (confirmed) | confirmed |
| AESO hourly data | CSVs 2001–Jul 2025 per unit (no emissions field; fuel mapping needed); by-type XLSX only 2012–2017 | confirmed |
| CWEC 2020 | ECCC FTP **blocked**; NRCan open.canada.ca record "CWEC 2023" (644 TMYs, 1998–2020) — relation to CWEC 2020 EPW unclear | blocked / unverified |
| HDD 1991–2020 (YVR, YEG) | station pages blocked; bulk CSV exists on normals index | **blocked** — manual download |
| Summer/winter heat-demand ratio | no Canadian published ratio; Blatchford budget: 46,789 MWh/yr heating, 34,543 kW peak (load factor only) | **gap** |
| NRCan CEUD tables | oee.nrcan.gc.ca **blocked** (robots) | blocked — manual download |
| Energize Vancouver | ≥4,645 m² report by 1 Jun; disclosure **opt-in** via energycarbonreport.vancouver.ca/map; enforcement paused by Council 21 May 2026; no open-data dataset found | confirmed; data **gap** |
| Edmonton benchmarking | voluntary; dashboard "coming soon" | confirmed |
| Edmonton Property Information (dkk9-cj3x) | zoning, lot_size, **total_gross_area**, year_built, lat/long; weekly | confirmed — **the Edmonton floor-area source** |
| Edmonton Rooflines 2019 (jpxi-a9a5) | **Building Height**, rooftop/ground elevation, 384,228 polygons; historical | confirmed — heights available |
| Vancouver footprints | 2015 (no heights, not updated); 2009 LiDAR (height fields unverified) | confirmed existence |
| Edmonton parcels | City publishes centroids only; polygons via AltaLIS (licensed) | gap for polygons |
| StatCan ODB v2.0 | covers Vancouver and Edmonton; no heights | confirmed |
| CIMD 2021, Census DA boundaries | available, OGL Canada | confirmed |

## 5. Groundwater, noise, tenure (Lanes 3–4)

| Item | Finding | Status |
|---|---|---|
| AWWID (Alberta) | province-wide, ~500 k records, downloadable; licence "sole use by the client"; format unstated | confirmed; format unverified |
| AGS Edmonton–Calgary Corridor | Groundwater Atlas INF 140 (2011); Hydrogeological Overview OFR 2017-05 | confirmed |
| Alberta ground-source regulation | Water Wells and Ground Source Heat Exchange Systems Directive; Approval to Drill since 1 Jan 2020; **open-loop/ATES licence question unresolved** (Directive PDF HTTP 520) | **blocked** |
| BC GWELLS | >100 k wells; aquifer summaries; field list via BC Data Catalogue (not fetched) | confirmed existence |
| BC licence for open-loop heat exchange | **required**: WSR Sch. A item 9 "Heat exchange", item 4 "Cooling" (King's Printer free.bcpublications.ca; bclaws blocked) | confirmed |
| Sewer GIS | Vancouver "Sewer mains" (type field; diameter unconfirmed); Edmonton "Drainage_Pipe Segments" bh8y-pn5j (type, year; **no diameter**) | confirmed; trunk prospecting **gap** in Edmonton |
| Drake Landing BTES efficiency | measured 0.06 → 0.54 over 10 yrs; last-five-year solar fraction 0.96 (Mesquita et al. 2017, ISES) | confirmed |
| Edmonton Bylaw 14600 | s.19: 65 dBA residential property line 7–22h; s.20: 50 dBA night; s.21/22: 75/60 non-residential; **no Leq, no continuous-noise or mechanical provision** | confirmed |
| EPCOR on Rule 012 + 14600 | both apply to EDTI facilities (EPCOR submission to AUC, 2023) | confirmed (utility statement) |
| Vancouver By-law 6555 (consolidated 14 Jul 2026) | continuous = >3 min in 15; intermediate source → quiet receiver 60 day / 50 night; quiet→quiet 55/45; activity→quiet 60/55; non-continuous 75/70; **dBC only for amplified music** | confirmed |
| AUC Rule 012 (eff. 30 Sep 2024; Bulletin 2026-03) | Table 1 night 40–56 dBA Leq by density/proximity; s.4.5 low-frequency: dBC − dBA ≥ 20 **and** tone 20–250 Hz → +5 dBA; receptor within 1.5 km; **data centres not a "facility"** | confirmed (interior Table 1 values to re-check) |
| Synapse Decision 30732-D01-2026 | denied on siting (~30 m from homes; ~700 homes within 800 m); noise not decisive; NIA (OpenCycle, Rev 1, 24 Mar 2026) republished by Town of Olds: R01 72.4 dBA pre-mitigation vs PSL 53.0; 50.7 post; peer review (Englobe) found 30 issues | confirmed; decision date 17 vs 18 Aug discrepancy |
| BC title search | LTSA $11.06 + $3.55 from 1 Apr 2026; BC Assessment lookup free, no owner names | confirmed |
| Alberta title | SPIN2/ARLO; per-title fee not found | partial |
| Published heat agreements | Seattle Ord. 124727: 10 yr + 2 × 10 renewals, fee $12,247/yr, bond $206 k — **right-of-way only, no heat price**; Stockholm, Tallaght, Odense: no terms published | confirmed; terms **gap** everywhere |

---

## 6. Blocked sites — manual download list

- opendata.vancouver.ca API (all datasets: permits, benchmarking, footprint fields, sewer attributes)
- energycarbonreport.vancouver.ca/map (JS table)
- bcuc.com proceeding pages (2025 IRP #1391; WES CPCN exhibits) — HTTP 403
- collaboration.cmc.ec.gc.ca CWEC FTP; climate.weather.gc.ca normals station pages; climate.onebuilding.org
- oee.nrcan.gc.ca CEUD tables
- open.alberta.ca Directive + ground-source fact sheet (HTTP 520 — likely transient; retry)
- bclaws.gov.bc.ca (used King's Printer free.bcpublications.ca instead)
- Green Grid SEED (login); Cologix VAN1/VAN4 spec PDFs (form gate); AUC eFiling search (login; document IDs served anonymously)
- Lygnerud & Werner 2018 full text (paywall) — UBC Library

## 7. Still a gap after searching

1. Measured energy use for any site (Energize Vancouver opt-in data — manual check)
2. BC long-run marginal grid factor
3. NIR 2026 provincial electricity tables (A7-10/A7-11) — download Part 3
4. Canadian summer/winter heat-demand ratio — compute from CWEC + degree-days
5. Alberta open-loop/ATES licensing rule
6. 2026 Call for Demand outcome; AESO final BYOG process and allocations after Aug 2026
7. Alberta Data Centre Regulation primary text
8. Edmonton downtown DE rates; ATCO Gas North 2026 final rates
9. Edmonton parcel polygons (AltaLIS licence) and sewer diameters
10. Heat-pump ownership / duration / price terms in any real DC heat agreement
11. Operator confirmation of cooling type at the 13 sites (your photographs)

## 8. Corrections to make in the handoff

- §7: Edmonton downtown system is City/EPCOR, not ENMAX.
- §8: G-94-25 rejected Creative Energy's $38.5 M capex schedule; it is not an approval of 150 W Georgia / 720 Beatty heat arrangements. The 720 Beatty cost split is in G-360-22 (~$74 M total; developer ~$59 M; CE $15 M).
- §7: Alberta 335 g/kWh is generation-based (2024), from NIR 2026 Annex 7 Table A7-10, not "Annex 13".
- §8: "Referred back 21 July 2026" — Council reconvened 21 Jul and referred the report back to staff per the 23 Jul agenda; the minutes PDF could not be parsed to confirm the motion text. Keep, but cite the 23 Jul agenda item 6.
- §3 rule 5: Hut 8 VAN1 "900 ft²" is as published and implausible; treat as a flagged claim.
- Gagnon et al. 2022 title is "Short-run marginal emission rates omit important impacts of electric-sector interventions".

## Added 15 Oct (atlas chat)
- How the value of reused heat splits between operator, utility and residents: no study found; every receiver in the core cases is an institution. A gap the thesis could fill.
- Canadian precedents to source: TELUS Garden, Equinix TR5, Humano Sherbrooke, QScale Lévis, Enwave Toronto.
- Shafiee Roudbari 2025 full text (UBC Library).

## 15 Oct 2026 — Edmonton lot polygons
- City of Edmonton open data: no lot (parcel) polygons found; assessment gives one point per property (288,738 records, 19,140 with no building, i.e. vacant). Email to opendata@edmonton.ca still to send.
- Alberta title mapping (lot polygons) is AltaLIS data, licensed. A copy is served by Edmonton Public Schools' GIS server ("Titled Lots Current", credit "Altalis", no licence stated, current to 1 Sep 2025). NOT used: no licence to reuse. Ask UBC Library (Jeremy Buhler) whether UBC holds an AltaLIS academic licence; ask the City.
- Interim (tool v15): click picks the point in the clicked building, else nearest within 60 m, else nearest record in the same zone polygon within 400 m (with a note).
- 15 Oct 2026: J.B. requested an Altalis quote for Title – Area of Interest, City of Edmonton (GDB, 3TM 114 preferred). Awaiting quote and licence terms; do not load until terms confirmed in writing.
