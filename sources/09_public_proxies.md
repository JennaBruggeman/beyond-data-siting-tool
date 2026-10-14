# Hunt 9 — Public proxies for the non-public items (10 Oct 2026)

Why: colocation utilisation, substation headroom and large-load queues in Vancouver and Edmonton are not published. This pass looked for the nearest public stand-ins: another city's map, another operator's filing, a regulator's requirement that shows the data form. Verified = page or document read directly. Nothing here is facility-specific beyond what the operator or regulator itself published.

## 1. Colocation utilisation (proxy for `it_load_actual`)
| item | value | source | status |
|---|---|---|---|
| Digital Realty, Toronto, Q2 2025 supplemental | occupancy 96.4% (30 Jun 25; 96.4% at 31 Mar 25); 593k NRSF; 135k sf held for development; white-space IT load 55.8 MW; 2 data centres. Portfolio: managed 84.8%, consolidated 82.6% | https://s29.q4cdn.com/106493612/files/doc_financials/2025/q2/Digital-Realty-2Q25-Earnings-Supplemental-07-24-2025.pdf p.24 (occupancy analysis), p.6 fn 15–17 | VERIFIED — public filing, another operator, another city |
| Occupancy definition | excludes space under or held for development; computed on "factors in addition to contractually leased square feet," including available power | same, p.6 fn 15 | VERIFIED. Occupancy is leased share, not server utilisation — do not substitute one for the other |
| Equinix FY2024 10-K, Item 7 (regional cabinet utilisation) | exists; tool truncates at ~100k chars so the table was not read | https://www.sec.gov/Archives/edgar/data/1101239/000162828025005126/eqix-20241231.htm (Item 7 ≈ p.52) | UNVERIFIED — read manually (retrieval guide L2) |
| Equinix Q2 2026 earnings release | revenue and EBITDA by region only; no cabinet or utilisation table; no Canadian city named | https://www.sec.gov/Archives/edgar/data/0001101239/000110123926000145/a991eqix-q226xpr.htm | VERIFIED (negative) |
| Cologix Canadian ABS (Apr 2023) | C$195 M notes for Montréal, Toronto, Vancouver; no MW, no occupancy; prospectus private | https://cologix.com/news/cologix-closes-195m-cad-in-second-canadian-asset-backed-securitization-transaction-since-2022/ | VERIFIED (no data) — operator release |
| Uptime 2024 survey release | average rack density "below 8 kW"; no utilisation rate | https://www.businesswire.com/news/home/20240730874079/en | VERIFIED (summary only) |

## 2. Load-capacity maps elsewhere (form of the data our cities lack)
| utility | what it publishes | source | status |
|---|---|---|---|
| ENMAX (Calgary) — Load Capacity Map | feeder-segment polylines (30,057 features), "Two and Three Phase Estimated Remaining Load Capacity (December 2025)"; classes <999 / 1,000–2,999 / … / 11,000–12,999 kVA / N/A; anonymous ArcGIS REST query works (maxRecordCount 1,000); service name date-stamped so URL changes; disclaimer "as-is… not guaranteed to be accurate, complete or current"; site terms (2013) allow personal non-commercial use only — clear academic reuse with ENMAX | https://www.enmax.com/system-resources/load-capacity-map ; layer https://services1.arcgis.com/NKgP4VcXUzEyOnmg/arcgis/rest/services/Feeder_Load_Capacity_Rev9_20251211/FeatureServer/0?f=pjson ; terms https://www.enmax.com/terms-of-use | VERIFIED |
| ENMAX method | "based on in-house forecasting and system assessment tools"; no fixed update schedule; large load = >1 MVA (720 kVA downtown) | https://www.enmax.com/services/electricity-services/the-current/enmax-power-updates-interactive-mapping-tools-for-developers ; https://www.enmax.com/services/electricity-services/energize-your-site/large-loads | VERIFIED — operator description |
| OEB Centralized Capacity Information Map (Ontario) | province-wide load and DER capacity; "updated at least every three months" | https://www.oeb.ca/ontarios-energy-sector/centralized-capacity-information-map | VERIFIED |
| OEB Phase 1 requirement (letter 17 Oct 2024, EB-2019-0207) | stations ≥7.5 MVA in bands 0–1,000 / 1,000–2,000 / >2,000 kVA remaining; feeders ≥8 kV in bands 0–499 / 500–999 / 1,000–1,999 / >2,000 kVA; from annual summer or winter peak; quarterly | https://www.rds.oeb.ca/CMWebDrawer/Record/868457/File/document App. A | VERIFIED — regulator; this is the clearest published definition of "headroom" |
| Toronto Hydro Load Capacity Map | capacity = planning limit − annual peak at feeder/bus head; quarterly; "illustrative tool only" | https://www.torontohydro.com/contractors-and-developers/frequently-asked-load-capacity-map-questions | VERIFIED |
| Hydro-Québec industrial connection capacities (Dec 2025) | residual transmission capacity (≥25 MW) by 13 zones, e.g. Montréal-Est 100 MW, Bécancour <10 MW (+350 MW in 2–3 yr); annual update; ≥5 MW needs government authorisation | https://pannes.hydroquebec.com/data/projets/presentation-zones-raccordement-industriel.pdf pp.2–4, 7–11 | VERIFIED |
| EPCOR (Edmonton) | no load-capacity map; "capacity maps" page is for its Ontario utility | https://epcor.com/ca/en/on/collingwood-area/operations/electricity/capacity-maps.html | VERIFIED (negative) |
| FortisAlberta, ATCO | DER hosting-capacity only | https://www.fortisalberta.com/docs/default-source/default-document-library/hosting-capacity-analysis.pdf | VERIFIED (negative for load) |
| BC Hydro | no public capacity map; "Ready When You Are" (Feb 2026) gives only ">50 new feeders" aggregate | https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/corporate/community/bc-hydro-ready-when-you-are-report.pdf p.10 | VERIFIED (negative) |

## 3. Large-load queues
| item | value | source | status |
|---|---|---|---|
| AESO Large Load Projects | Phase 1: all 1,200 MW allocated — P2936 GLDC 970 MW; P3083 Keephills Phase I 230 MW | https://www.aeso.ca/grid/connecting-to-the-grid/large-load-projects | VERIFIED |
| AESO Data Centre Update, Sept 2025 | "over 20,000 MW of data centre load now on the AESO project list"; 15 projects / 5 developers / 4,800 MW qualified | https://aeso.ca/assets/Uploads/grid/Data-Centre/AESO-Data-Centre-Update-September-2025.pdf pp.1–2 | VERIFIED |
| Government of Alberta | ~19,565 MW data-centre load requested (AESO list 30 Jul 2026); "Requests are not approvals" | https://www.alberta.ca/datacentres/grid | VERIFIED |
| AESO Connection Project List (monthly Excel, map, dashboard) | fields: project ID/name, type, MW type, STS MW (gen), DTS MW (load), planning area, stage, status, ISD; updated 2026-10-09 | https://www.aeso.ca/grid/projects/connection-project-reporting/ ; Excel https://www.aeso.ca/assets/Uploads/project-reporting/October-2026-Project-List.xlsx ; guide https://www.aeso.ca/assets/AESO-Connection-Project-List-Guide-v2.pdf | page and guide VERIFIED; Excel contents UNVERIFIED (retrieval guide F7) |
| BC Hydro 2026 Call for Demand | intake closed; 15 applications, ~800 MW requested; up to 400 MW over two years; requests 10–145 MW; scoring cost-effectiveness 30 / data sovereignty 30 / economic development 20 / First Nations 10 / environment 10; outcome deferred until after the provincial-election transition; no selected list | https://app.bchydro.com/accounts-billing/electrical-connections/large-load/emerging-industries-connections.html ; https://news.gov.bc.ca/releases/2026ECS0005-000095 ; info session https://app.bchydro.com/content/dam/BCHydro/customer-portal/documents/accounts-billing/electrical-connections/2026-cfd-info-session-2026feb09.pdf slides 8, 16 | VERIFIED |

## 4. Substation headroom from filings (Edmonton)
| item | value | source | status |
|---|---|---|---|
| EPCOR (EDTI) Distribution Deficiency Report — Woodcroft POD, Rev 1, 12 Sep 2025 | 3 × 30/40 MVA 72/15 kV; N-1 firm 76.0 MVA; summer coincident peak 74.2 MVA (2024), 72.4 (2029), 76.3 (2032, shortfall 0.3), 78.9 (2034), 89.3 (2049, shortfall 13.3); transfer tables name adjacent PODs | https://www.aeso.ca/assets/Uploads/projects/2582/EDTI-Distribution-Deficiency-Report-2025-Updated.pdf pp.5, 10, 21–26, 37 | VERIFIED — utility filing; loading % is our arithmetic |
| Other DDRs / NIDs on aeso.ca | same genre per project (projects/2972; West Edmonton NID) | https://www.aeso.ca/assets/Uploads/projects/2972/EDTI-Distribution-Deficiency-Report.pdf | UNVERIFIED (not opened) |
| OEB DSP filing requirements | restricted feeders listed by name with reason (§5.3.4); asset capacity and utilisation (§5.3.2) | https://oeb.ca/sites/default/files/OEB%20Filing%20Reqs_Chapter%205_2024_20241209.pdf pp.10–12 | VERIFIED |

## 5. FOI precedent
| item | value | source | status |
|---|---|---|---|
| City of Vancouver FOI 2025-343 | monthly water-meter readings for two anonymised data centres (13 periods) released; multi-tenant sites withheld under s.22(1) | https://vancouver.ca/files/cov/2025-343-release.pdf | VERIFIED — shows what the City will and won't release |

## Blocked / unreadable
SEC inline-XBRL filings (truncated); Statista, Uptime full report (paywall); vancouver.ca FOI index (fetch error); Secret Canada (not rendered); AESO Excel (binary).

## What this changes in the register
- `grid_headroom`: still no map in either city; the register now cites the OEB band definition and ENMAX kVA classes as the form the tool's "headroom" field should take, and the Woodcroft DDR as the one Edmonton substation with a public N-1 figure.
- `it_load_actual`: Digital Realty Toronto 96.4% occupancy enters as a leased-share proxy (40), separate from server utilisation (LBNL).
- `queue`: AESO Phase 1 allocations and GoA 19,565 MW requested; BC CFD 15 applications / ~800 MW, outcome deferred.
