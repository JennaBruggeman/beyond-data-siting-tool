# Hunt 4 — Grid factors, weather, heat-demand proxies, base GIS (6 Oct 2026)

## 1. Grid emission factors
| Item | Finding | Source | Licence | Status |
|---|---|---|---|---|
| BC 2025 consumption-based | **22.8 tCO2e/GWh** BC Hydro Integrated Grid 2025; 2024 = 9.9; Fort Nelson 2025 = 531.4. "consumption-based estimate, meaning electricity imports are included and exports are excluded", 4-yr window. GGIRCA; GGERR Sch. D. Updated 26 May 2026. | https://www2.gov.bc.ca/gov/content/environment/climate-change/data/electricity | BC web | CONFIRMED |
| BC method page | Director publishes factors annually; 2021 methodology change (net vs gross imports); no marginal factor | https://www2.gov.bc.ca/gov/content/environment/climate-change/industry/reporting/quantify/electricity | | CONFIRMED |
| BC long-run marginal | **Not found.** 2021 IRP PDF unread. | https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/corporate/regulatory-planning-documents/integrated-resource-plans/current-plan/integrated-resource-plan-2021.pdf | | GAP |
| NIR 2026 (1990–2024) | Open Govt record; UNFCCC NID submitted 14 Apr 2026. Alberta cites "Table A7-10, Annex 7" (renumbered from Annex 13 in 2025 edition: A13-10 AB, A13-11 BC). | https://open.canada.ca/data/en/dataset/779c7bcf-4982-47eb-af1b-a33618a05e5b ; https://unfccc.int/ghg-inventories-annex-i-parties/2026 ; https://unfccc.int/documents/656424 ; 2025 Part 3: https://unfccc.int/sites/default/files/resource/2025NIR%20-%20Part%203.pdf | OGL Canada | Record CONFIRMED; 2026 table numbers UNVERIFIED |
| Alberta 335 g/kWh | "from 907 grams … in 2005 to 335 grams of carbon dioxide equivalent per kilowatt hour in 2024" — **generation-based**; source "ECCC, 2026 National Inventory Report 1990-2024, Table A7-10, Annex 7" | https://www.alberta.ca/albertas-greenhouse-gas-emissions-reduction-performance | | CONFIRMED |
| Alberta displacement factor | Carbon Offset Emission Factors Handbook v3.0 (Jun 2022) s.1.2 Table 1: grid displacement with renewables **0.52 tCO2e/MWh**; increased on-site grid use / reduced grid use (with line loss) **0.55**; 2018–2020 data; methodology doc 14 Jun 2022. Operating/build-margin construct; "marginal" label unverified; newer editions unchecked. | https://open.alberta.ca/dataset/f2109d83-2153-4481-a8b8-b00178e53999/resource/46661821-a53e-409c-a072-5ce16a500611/download/aep-carbon-offset-emission-factors-handbook-version-3.0.pdf ; https://open.alberta.ca/publications/methodology-for-the-electricity-displacement-factor | OGL Alberta | Values CONFIRMED; interpretation UNVERIFIED |
| AESO hourly by fuel | (a) Hourly Metered Volumes + Pool Price + AIL 2001–Jul 2025: three CSVs; >5 MW; Apr–Jul 2025 not finalised; no further updates. (b) By Generation Type: XLSX 1 Nov 2012–30 Nov 2017 only. Fuel aggregation needs asset mapping. AIL = Alberta Internal Load. | https://aeso.ca/market/market-and-system-reporting/data-requests/ | disclaimer only | CONFIRMED |
| Gagnon et al. 2022 | "Short-run marginal emission rates omit important impacts of electric-sector interventions", PNAS 119(49) e2211624119, doi 10.1073/pnas.2211624119; contiguous US; Cambium 2021 | https://pmc.ncbi.nlm.nih.gov/articles/PMC9894150 | OA | CONFIRMED |
| NREL Cambium / LRMER | contiguous US only — **Canada not covered** | https://data.nrel.gov/submissions/206 ; https://www.nrel.gov/analysis/cambium.html | | CONFIRMED |

## 2. Weather
| Item | Finding | Source | Status |
|---|---|---|---|
| CWEC — ECCC engineering climate page | "564 datasets created by joining twelve Typical Meteorological Months…"; FTP download; contact scg-ecs@ec.gc.ca; version/format not shown | https://climate.weather.gc.ca/prods_servs/engineering_e.html ; licence http://climate.weather.gc.ca/prods_servs/attachment1_e.html (not read) | PARTIAL |
| CWEC FTP | https://collaboration.cmc.ec.gc.ca/cmc/climate/Engineer_Climate/CWEC/ | | BLOCKED |
| CWEC — NRCan Open Govt record | "CWEC 2023" (Mar 2023), 1998–2020, "644 datasets"; ESRI REST/WMS + PDF guides; OGL Canada. Identity with ECCC "CWEC 2020" EPW unclear. | https://open.canada.ca/data/en/dataset/55438acb-aa67-407a-9fdb-1cb21eb24e28 ; https://open.canada.ca/data/en/dataset/2b9bc161-ca00-4a1e-9c75-58ed621ef4b1 | CONFIRMED (record); identity UNVERIFIED |
| climate.onebuilding.org Canada | 429 rate-limited | https://climate.onebuilding.org/WMO_Region_4_North_and_Central_America/CAN_Canada/index.html | BLOCKED |
| PCIC weather files | future-shifted CWEC-based; not fetched | https://www.uvic.ca/pcic/data-analysis-tools/data-portal/weather-files/index.php | UNVERIFIED |
| HDD 1991–2020 YVR / YEG | bulk zipped CSV exists on normals index; 18 °C base; station pages blocked | https://climate.weather.gc.ca/climate_normals/index_e.html ; https://www.canada.ca/en/environment-climate-change/services/climate-change/canadian-centre-climate-services/display-download/technical-documentation-climate-normals.html | BLOCKED (values) |
| Summer/winter DH ratio | not published. Vancouver TES factors: FCNEU 2024 69.43 kg/MWh; CE steam 88.99 kg/Mlbs; River District 201.85. Blatchford budget p.5: heating 46,789 MWh/yr, peak 34,543 kW; cooling 43,747 MWh / 46,601 kW; ~400,000 m² by 2026. | https://vancouver.ca/files/cov/thermal-energy-systems-emissions-factors-info-sheet-existing-buildings.pdf ; https://www.edmonton.ca/sites/default/files/public-files/2023-2026BlatchfordRenewableEnergyUtilityBudget.pdf | figures CONFIRMED; ratio GAP |

## 3. Heat-demand proxies
| Item | Finding | Source | Status |
|---|---|---|---|
| NRCan CEUD | oee.nrcan.gc.ca refused (robots). Expected: Residential Table 2 end-use; Commercial Table 4 intensity GJ/m² (UNVERIFIED) | https://oee.nrcan.gc.ca/corporate/statistics/neud/dpa/menus/trends/comprehensive/trends_res_bc.cfm ; …/trends_com_ab.cfm ; https://oee.nrcan.gc.ca/corporate/statistics/neud/dpa/menus/trends/comprehensive_tables/list.cfm | BLOCKED |
| Energize Vancouver (By-law 13472) | ≥4,645 m² report by 1 Jun; offices/retail ≥9,290 m² also GHGI/HEI limits (2026: office 25, retail 14 kgCO2e/m²; HEI 0.09 GJ/m² by 2040); phase-in 2024–2026; disclosure opt-in via map | https://vancouver.ca/files/cov/vancouver-annual-greenhouse-gas-and-energy-limits-by-law-faq.pdf ; https://vancouver.ca/green-vancouver/energize-vancouver.aspx ; http://energycarbonreport.vancouver.ca/map/ ; https://bylaws.vancouver.ca/13472c.PDF | CONFIRMED; dataset NOT FOUND |
| Edmonton benchmarking | voluntary; owner consent; >1,000 ft²; dashboard "coming soon"; 2018 pilot >1,858 m² | https://www.edmonton.ca/programs_services/environmental/building-energy-benchmarking-program ; https://www.edmonton.ca/programs_services/documents/PDF/LBERDPilotProgramSummary.pdf | CONFIRMED |
| Edmonton Property Information (dkk9-cj3x) | account_number, suite, house_number, street_name, legal_description, zoning, lot_size, **total_gross_area**, year_built, garage, neighbourhood, ward, lat/long; weekly. Assessment Data q7d6-ambg. | https://data.edmonton.ca/d/dkk9-cj3x ; https://data.edmonton.ca/d/q7d6-ambg ; https://data.edmonton.ca/api/views/dkk9-cj3x.json | CONFIRMED |

## 4. Base GIS
| Item | Finding | Source | Status |
|---|---|---|---|
| Vancouver footprints | 2015 (2D, not updated, no heights); 2009 LiDAR (height fields unverified) | https://opendata.vancouver.ca/explore/dataset/building-footprints-2015/information/ ; …/building-footprints-2009/information/ | CONFIRMED (existence) |
| Vancouver zoning | weekly | https://opendata.vancouver.ca/explore/dataset/zoning-districts-and-labels/information/ | CONFIRMED |
| Vancouver parcels | weekly; API | https://opendata.vancouver.ca/explore/dataset/property-parcel-polygons/information/ | CONFIRMED |
| Edmonton footprints | Building Footprint 6n9r-ddf8 (May 2017); **Rooflines 2019 jpxi-a9a5: Building Height, rooftop/ground elevation, 384,228 polygons, WGS84, historical** | https://data.edmonton.ca/d/jpxi-a9a5 ; https://data.edmonton.ca/d/6n9r-ddf8 | CONFIRMED |
| Edmonton zoning | fixa-tstc; overlays 6w3s-58pv | https://data.edmonton.ca/d/fixa-tstc | CONFIRMED |
| Edmonton parcels | centroids only (dm3i-bp8w, 9tyx-zfd4, 774r-kpz5, 78hg-w763, ut27-nrpn); polygons via AltaLIS (licensed) since Nov 2021 | https://data.edmonton.ca/d/dm3i-bp8w ; https://data.edmonton.ca/stories/s/9zth-y5hq | CONFIRMED; polygons GAP |
| StatCan ODB v2.0 | Vancouver and Edmonton included; no heights; shapefile per province | https://www.statcan.gc.ca/eng/open-building-data/metadata ; https://www150.statcan.gc.ca/n1/en/catalogue/34260001 | CONFIRMED |
| CIMD 2021 | DA level; four dimensions; corrected 22 Oct 2024; guide 45-20-0001 | https://open.canada.ca/data/en/dataset/ec6dc8e7-2fa0-4e49-8969-38541ca0a34d ; https://www150.statcan.gc.ca/n1/pub/45-20-0001/452000012023002-eng.htm | CONFIRMED |
| Census 2021 DA boundaries | CBF/DBF shp/gml/gdb; REST layer 12 | https://www12.statcan.gc.ca/census-recensement/2021/geo/sip-pis/boundary-limites/index2021-eng.cfm?year=21 ; https://geo.statcan.gc.ca/geo_wa/rest/services/2021/Cartographic_boundary_files/MapServer/12 | CONFIRMED |

## Blocked
collaboration.cmc.ec.gc.ca CWEC; climate.weather.gc.ca normals station pages; climate.onebuilding.org; oee.nrcan.gc.ca CEUD; opendata.vancouver.ca API; data-donnees.az.ec.gc.ca GHG inventory (504); unfccc.int/documents/656424 (timeout); open.canada.ca CEUD search (400).

## Gaps
BC marginal factor; NIR 2026 provincial tables; HDD values; CWEC 2020 EPW access and licence; seasonal ratio; CEUD values; Vancouver benchmarking as dataset; Edmonton parcel polygons; Vancouver 2009 height fields; Alberta offset handbook newer editions.
