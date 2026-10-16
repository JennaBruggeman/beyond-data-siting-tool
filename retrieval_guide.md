# Retrieval guide — what J.B. fetches, and what Claude hunts next

Updated 15 Oct 2026 (statuses and section 6); first written 13 Oct 2026, after the decision to treat Vancouver and Edmonton equally and the deep dive (sources/14). Sites listed for J.B. are ones that block automated reading or need a login, a licence or a click-through. Save everything into one folder (e.g. `sources_fetched/`) and attach it.

Status: ☐ to do · ⏳ requested / in progress · ✅ done and folded into the register · ◇ optional.

---

## J.B.'s list — in order of what it unlocks

### 1. City-wide parcels and buildings (both cities) — unlocks "any parcel", neighbours, the 3D city
The hosted tool can't call the cities' APIs, so it has to carry a compact table of every building. Each is the same Export → CSV you used for the permits. If a full export is refused, export in parts by neighbourhood or year.
- ☑ **N1 Vancouver property tax report** (received 13 Oct: 2026 report, 228,921 records → data/vancouver_parcels_2026.csv, 93,408 parcels by land_coordinate) — https://opendata.vancouver.ca/explore/dataset/property-tax-report/ — filter `report_year` to the current year first (≈200,000 rows instead of 1.55 M). Keep: pid, land_coordinate, zoning_district, zoning_classification, from/to_civic_number, street_name, year_built, big_improvement_year, current_land_value, current_improvement_value, neighbourhood_code.
- ☑ **N2 Vancouver property parcel polygons** (received 13 Oct: 99,698 polygons; linking field confirmed TAX_COORD = LAND_COORDINATE; 93,407 of 93,408 tax parcels matched; 875 polygons with no 2026 tax record → data/vancouver_parcels_2026.geojson) — same portal, the dataset with a geometry per `land_coordinate` (listed as "property-parcel-polygons", linking field `tax_coord` — UNVERIFIED; check the schema tab and tell me the linking field's name). Without it the tax report has no location.
- ☑ **N3 Vancouver building footprints 2009** (received 13 Oct: 124,181 roof parts of 111,052 buildings → data/vancouver_footprints_2009.geojson; buildings finished after 2009 are missing) — https://opendata.vancouver.ca/explore/dataset/building-footprints-2009/ — full export. Keep: bldgid, area_m2, hgt_agl, avght_m, maxht_m, rooftype, geo_point_2d.
- ☑ **N4 Edmonton property information (current year)** (received 13 Oct: 439,696 accounts as points → data/edmonton_properties_2026.csv; no assessed values in this dataset — those are in q7d6-ambg, see N4b) — https://data.edmonton.ca/d/dkk9-cj3x — full export. Keep: account number, house number, street name, latitude, longitude, zoning, total_gross_area, year_built, neighbourhood, assessed value, lot size. Check that `total_gross_area` is filled for non-residential rows and tell me if not.
- ☑ **N4b Edmonton Property Assessment Data (Current Calendar Year)** (received 13 Oct: all 439,696 accounts joined on account number; values and assessment classes added to data/edmonton_properties_2026.csv) — https://data.edmonton.ca/City-Administration/Property-Assessment-Data-Current-Calendar-Year-/q7d6-ambg — Export → CSV, zip. Gives assessed value and assessment class; joins on account number.
- ☑ **N4c Edmonton parcel outlines** (15 Oct: lot outlines from the EPSB "Titled Lots Current" layer, Altalis credit, academic use approved by Xun; kept out of git. Altalis quote dropped 15 Oct — not needed for academic use.) (13 Oct: the four Land Parcels (Point) layers received — points with an area only, no outlines. Assessment-parcel points sit exactly on account points (439,661 of 439,696 within 1 m); parcel area added to data/edmonton_properties_2026.csv. Outlines still open: ask opendata@edmonton.ca whether the polygon layer can be published, or use the City's online map viewer (name UNVERIFIED) for the few sites the tool studies in detail.) — the portal lists Land Parcels as points (Assessment, Legal, Title, Holding). Search data.edmonton.ca for a polygon version ("Land Parcels" without "(Point)"); whether one is published is UNVERIFIED. Without it, Edmonton sites are points, not lot shapes.
- ☑ **N4d Edmonton Zoning Bylaw Geographical Data** (received 14 Oct: 11,549 zone polygons, 152 zones, dated 12 Oct 2026 → data/edmonton_zoning.geojson; 156,838 blank account zonings filled by location; record and map agree for 95% of the rest, the differences being mostly height/FAR suffixes such as "RSM h12") — https://data.edmonton.ca/Thematic-Features/Zoning-Bylaw-Geographical-Data/fixa-tstc — Export → CSV (or GeoJSON), zip. Zone areas as shapes: gives zoning to the ~157,000 condo units whose account rows have none, and to any point in the city.
- ☑ **N5 Edmonton building heights / footprints** (15 Oct: 3D Buildings received; measured heights on 305,926 outlines, tool v17) (14 Oct: Rooflines received — 320,182 footprints as of 2019, NO height column. Heights estimated: storeys = assessed gross floor area ÷ footprint, × 4.0 m, for 289,058 footprints → data/edmonton_rooflines_est.geojson, labelled estimate. For measured heights: 3D Buildings https://data.edmonton.ca/dataset/3D-Buildings/78sz-qcfr — after the mid review.)
- ✕ **N6 Parkland County parcels for Acheson** (dropped 16 Oct) — Parkland County's GIS / open data (the county runs an online map; look for a parcel or "land use" download). If there is no download, a screenshot of the Acheson area with parcel lines and zoning is enough for the Acheson options.
- ◐ **N7 Edmonton building permits** (14 Oct: full export received from the Claude Link folder → data/raw; not yet filtered to the three sites) for the three Edmonton sites** — https://data.edmonton.ca dataset `24uj-dj8v` (General Building Permits) — filter by address for 4130 95 St NW, 17204 114 Ave NW, and any downtown data-centre addresses you know; export. The deep dive found this dataset also gives occupancy dates for non-residential permits completed since 2024, so build times can be measured in Edmonton.

### 2. People — unlocks "who bears it" and "real need" (both cities)
- ☑ **P1 Census Profile 2021, dissemination areas, BC** (16 Oct: 98-401-X2021006 BC received; extracted on J.B.'s computer; tool v18 People tab) — (15 Oct: received 98-401-X2021025 and -024 — these are CENSUS SUBDIVISIONS (whole municipalities) for BC and Alberta, not dissemination areas; kept in data/raw/census for city totals. Still needed: the dissemination-area file, product 98-401-X2021006) — https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/download-telecharger.cfm?Lang=E → "Comprehensive download files" → the row "Canada, provinces, territories, census divisions, census subdivisions and dissemination areas" → **British Columbia only** → CSV (≈300 MB zipped). Product 98-401-X2021006.
- ☑ **P2 Same, Prairies** (16 Oct: received and extracted) (Alberta, Saskatchewan, Manitoba) — same page, Prairies row, CSV (≈440 MB). Covers Edmonton and Parkland County.
- ☑ **P3 Dissemination-area boundaries** (16 Oct: received; 100 m census grid built) — https://www12.statcan.gc.ca/census-recensement/2021/geo/sip-pis/boundary-limites/index2021-eng.cfm?year=21 → Statistical boundaries → Dissemination areas → **Cartographic** → Shapefile → English (`lda_000b21a_e.zip`). Product 92-169-X.
- ✅ (16 Oct: regions received; Greater Vancouver CD not needed) **P4 Census of Agriculture greenhouse area**, table 32-10-0360-01 → Download options → Alberta, Division No. 11 (greenhouses near Edmonton as heat receivers).

### 3. Ground (Edmonton) — unlocks groundwater sinks in Edmonton (no longer deferred)
- ✓ **F1 Edmonton water wells** — don't use the 2 GB Access database. https://groundwater.alberta.ca/WaterWells/d/ → zoom to Edmonton until the scale reads 1:100,000 or closer → Find Water Wells → By Selection → rectangle tool → drag a box → export the results → repeat for about four boxes (downtown and river valley first; townships T52–T53, ranges R24–R25 W4M) plus one box over Acheson. Until then `ground` is Vancouver-only.

### 4. Documents behind blocks the deep dive could not open
- ☑ **D1 Edmonton Community Standards Bylaw 14600** (received 14 Oct, consolidated 22 Oct 2024; s.19–22 read and entered in the register: residential 65/50, non-residential 75/60 dB(A) at the property line, no averaging period) (noise) — https://www.edmonton.ca/sites/default/files/public-files/C14600.pdf — the PDF; the deep dive was blocked. Needed for Edmonton's limit on a data centre's own plant (AUC Rule 012 only covers power plants and substations).
- ☑ (14 Oct: 2026 fee schedule, Bylaws 19340 and 14380 received and entered; 2026 fire hall levy rates also received; processing times and rezoning complexity received) **D2 Edmonton fee schedule, rezoning and development permits** (current) and **off-site levy** rates — edmonton.ca → Rezoning / Development permits → Fees. Needed for "what it takes to move" in Edmonton.
- ☑ **D3 City of Edmonton data-centre page** (received → data/raw/edm/data_centre_development_page.pdf) — https://www.edmonton.ca/business_economy/economic_investment/data-centre-development (blocked to automated reading).
- ☑ (14 Oct: Attachments 3 and 4 received; 2026 tariff $8.08/kW·month + $0.0300/kWh entered) **D4 Edmonton DDE (Utility Committee, 23 Jun 2025)** — IIS02765 **Attachment 4** (2025–2026 rate filing, the $/GJ tariff), **Attachment 3** (business case), and FCS02853 Attachment 1. Still outstanding from before.
- ✅ (16 Oct: 2021–2024 Business Plan received too; no loop temperatures or third-party heat terms in either — ask in person if wanted. 14 Oct: 2023–2026 Budget and Plans received and entered — loads and capacity, sewer-heat deferral; no loop temperatures in it) **D5 Blatchford Renewable Energy Utility** — the 2023–2026 Budget and Plans PDF and the 2021–2024 Business Plan on edmonton.ca (both blocked to automated reading). They should carry loop temperatures, loads and connection rules — Blatchford is the one network in Edmonton that offers cooling.
- ✕ **D6 Parkland County Land Use Bylaw 2025-12** (16 Oct: dropped — Acheson was a case study for J.B.'s understanding, not a tool site; bylaw PDF received and kept in data/raw/edm), s. 5.80 "Data Processing Facility" and the use tables for BI, MI, HI and C (permitted or discretionary?), plus Bylaws 2025-23 to 2025-26 (DC Area 7, "Data Processing and Infrastructure") — https://www.parklandcounty.com/en/business-and-development/land-use-bylaw.aspx. The deep dive read the bylaw but the two columns ran together.
- ☐ **D7 Alta Reg 117/2026 thresholds for "tethered" generation** — already in data/ (you uploaded it 11 Oct); nothing to fetch — I'll reread it for the place-gives-power row.
- ☑ **D8 BC Hydro Electric Tariff (15 Oct: received → data/raw/bchydro; RS 1600–1611, 1830, 2289, 4100 entered), RS 1600–1611 and RS 1830 pages** — https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/corporate/tariff-filings/electric-tariff/bchydro-electric-tariff.pdf — download the PDF; the reader only returned the contents. (RS 1823 was cancelled 1 Apr 2026; RS 1830 replaces it.)
- ☑ **D9 NRCan photovoltaic potential (15 Oct: received → data/raw/nrcan; Vancouver, Edmonton, Spruce Grove entered; tool v18), municipal values** — https://natural-resources.canada.ca/energy-sources/renewable-energy/photovoltaic-potential-solar-resource-maps-canada → the municipal CSV (blocked to automated reading). Gives kWh/kWp for Vancouver, Edmonton and Parkland County.
- ☑ **D10 Alissa et al. 2025 (16 Oct: received; shares entered — no per-m² value in the workbooks), Nature 641:331–338 — LCA spreadsheets** on Zenodo (https://zenodo.org/records/14268168). Possibly the only open, peer-reviewed numbers for a data-centre building's embodied carbon.

### 5. Outstanding from before
- ⏳ **A3 BC Assessment Commercial Inventory Extract** via Jeremy Buhler (jeremy.buhler@ubc.ca) — Vancouver gross floor area at 80 instead of the 60 fallback.
  - 13 Oct reply (J. Buhler): UBC licence allows aggregated results only — no single-property floor area or use code may be shown, even one at a time. Workaround offered: derived groups (floor-area bands, own use-code groups). Next: Matthew Soules emails confirmation on the thread → 30-min orientation, terms reviewed. Before any BCA file is handled here, check the terms for where the data may be stored and processed. Design consequence: BCA feeds only pre-aggregated receiver layers (heat demand by area, banded); site cards use open data only.
  - 15 Oct reply (J. Buhler): no concerns with the approach (J.B. runs the script on her own computer; only derived results leave it). (1) Aggregated layers may appear in a public tool. (2) New aggregated or derived variables may be shown for individual properties, since they expose no underlying BCA data points. Open question for the meeting: a derived value that can be back-calculated to a BCA field (e.g. heat demand = floor area × a published intensity) — is that allowed, or must it be banded or combined? 30-min Zoom booked: Mon 19 Oct 2026, 1:00 pm (J.B. emailed 15 Oct).
  - Terms read 14 Oct (DataBC_BCA_terms_for_UBC_researchers-2025_01.pdf + BCA Schedule – Security Requirements): cl. 11 no disclosure "to any third party"; Security §5 access limited to Authorized Personnel, §8 "cannot be electronically transmitted" except on encrypted transportable media. → Raw BCA files are NOT to be uploaded to Claude unless Jeremy confirms in writing. Plan: Claude writes the aggregation script; J.B. runs it on her own computer; only suppressed aggregates come back. cl. 5a: results may be published in research projects, no extracts, cite BCA, views are the author's; cl. 5b: send published research to propertyinfo@bcassessment.ca. cl. 12 (no incorporation into a product/service for public distribution) — ask Jeremy whether aggregated layers in the public tool are fine. No minimum cell count in the terms — ask Jeremy.
- ✅ (16 Oct: VAN1 and VAN4 received) **L1 Cologix VAN1 / VAN4 spec sheets** — https://cologix.com/resources/spec-sheets/ (request form).

### Check back monthly
- BC Hydro 2026 Call for Demand results — https://app.bchydro.com/accounts-billing/electrical-connections/large-load/emerging-industries-connections.html (scoring includes "heat recovery ready" and First Nations criteria; outcome deferred).
- AESO project list (file name changes monthly) and the large-load integration process.
- Edmonton LDA26-0225 (an AI data centre in the Edmonton Energy and Technology Park; engagement to 25 Oct 2026, hearing TBD) — https://engaged.edmonton.ca/eetpdatacentre
- 111 E 5th Ave — pulled from the 23 Jul 2026 hearing; further consultation after the election — https://www.shapeyourcity.ca/111-e-5
- A published grid-capacity map from BC Hydro or EPCOR (ENMAX, Toronto Hydro and Hydro-Québec already publish theirs).

---

## Done (folded into the register)
- ✅ CWEC typical-year files, both airports; Climate Normals 1991–2020, BC and AB.
- ✅ BC Assessment user guide; property-tax report schema; building footprints 2009 schema.
- ✅ Vancouver permits for seven addresses (incl. 515 W Hastings); Vancouver energy and carbon report (four sites).
- ✅ Library PDFs (Lygnerud & Werner; Wahlroos 2018; Ayuso-Virgili; Ion; Barroso); GWELLS export; Nistad thesis.
- ✅ Alta Reg 117/2026; Alberta offset handbooks; NRCan CEUD tables; Alberta water-well directive, GSHE fact sheets and groundwater guide; AUC Rule 012; BC Hydro 2025 IRP; West End Substation CPCN.
- ✅ NIR 2026 Part 1 and Annex 7 workbook (provincial intensities); StatCan 25-10-0060; DEA catalogue Excel; Equinix 10-K FY2024; AESO October 2026 project list; Edmonton DDE cover report and IIS02765.
- ◇ Grange Castle (link dead; the filed sound-power tables in sources/08 cover the need).

---

## P. Claude's hunt list — second pass (no fetching needed from J.B.)
What the deep dive (sources/14) did not finish, mostly because the web-search limit ran out. Primary sources only; blocked sites go to J.B.'s list above.

Zoning, process and consultation
- Edmonton rezoning and development permit processing times; Edmonton Zone IH use list (Major Industrial confirmed?); Edmonton Indigenous Framework commitments.
- BC consultation triggers: Water Sustainability Act licences (FrontCounter BC), BCUC CPCN process, City of Vancouver UNDRIP Strategy (2022) on land and development; Musqueam, Squamish and Tsleil-Waututh referral processes as the Nations publish them; Treaty 6 and the Alberta Aboriginal Consultation Office procedures (open.alberta.ca returned errors).
- Vancouver council resolution of 21 Jul 2026 on 111 E 5th; any Vancouver policy on data-centre clusters (the Maloney motion of 15 Jul 2026 was not approved).
- AUC Rule 012 cumulative-noise clause (confirm wording); whether a newer Rule 012 than 2021 is in force.

City → data centre
- Edmonton sewer heat (EPCOR) — none found; one more targeted search, then record as a gap.
- Treatment-plant temperatures (GVS&DD 2023 report, Table 3.8 did not extract).
- Edmonton commercial water rates (page section did not render); EPCOR reclaimed-water price and permitted uses.
- Road traffic counts usable for acoustic cover (both cities publish counts, not noise maps) — method note.

Lifecycle
- Ramp-up / "stabilised" occupancy definitions (operator filings); UPS and generator service life (primary); data-centre building embodied carbon per m² or per MW (Alissa et al. 2025 spreadsheets — D10); heat-recovery termination beyond Lygnerud & Werner (ReUseHeat deliverables, Lygnerud's later papers); DEA lifetimes for heat pumps (ch. 40) and district-heating networks (ch. 113) from the Excel already in data/.

Prices and operation
- Creative Energy steam pressure and temperature (BCUC filings); NEU annual heat delivered (charts only in the rate reports).
- Canadian district-heating pipe cost per metre (pipe only).
- Enclosure and barrier costs for equipment (only highway barrier costs found: FHWA US$36–40/ft², BC MoTI per-unit benchmarks).

People and the urban rationale
- The urban-geography authors not reached: Pickren, Velkova 2016, Hogan 2015, Taylor, Brodie, Vonderau; studies of carrier hotels (60 Hudson, One Wilshire); location of internet exchange points in Vancouver and Edmonton.
- Community-impact studies beyond JLARC 2024 and Bresnihan & Brodie 2021 (Libertson, Velkova & Palm on "energy gentrification"; Dutch and Irish planning studies).
- A primary list of existing data centres by address in Vancouver (for cumulative effects).
- Energy poverty at small-area level: CUSP's tool has left energypoverty.ca; Efficiency Canada's 2021 map (geography unconfirmed) or a StatCan custom table.

### Add-ons (14 Oct) — sources the research could not open (full lists in sources/15a–15d)
- ☑ **A1 Vancouver Building By-law 2025, Book II §2.7** (16 Oct: read; rainwater allowed as cooling-tower make-up) (non-potable water: which sources and uses are now allowed for non-residential buildings) — https://vancouver.ca/files/cov/2025-vbbl-book-II-insert-pages.pdf
- ☑ **A2 NRCan municipal PV potential CSV (same as D9, received)** (same as D9; rows Vancouver, Edmonton, Parkland County) — https://ftp.maps.canada.ca/pub/nrcan_rncan/Solar-energy_Energie-solaire/photovoltaic_canada_photovoltaique/municip_potentiel-potential.csv
- ☑ **A3 BC Hydro Rate Schedule 2289 tariff text (in the tariff PDF, D8)** (self-generation size and export rules) — https://app.bchydro.com/toolbar/about/strategies-plans-regulatory/tariffs-terms-conditions/electric-tariff.html
- ☑ **A4 Alberta alternative solutions guide (16 Oct: read) for small-system water reuse and stormwater use** — https://open.alberta.ca/publications/notice-alternative-solutions-guide-small-system-water-reuse-stormwater-use
- ☐ **A5 CSA C448 (ground source heat pump design) and VDI 4640 Part 2** — paywalled; try UBC Library
- ☑ **A6 PNNL-33283 (16 Oct: the 1 and 10 MW costs are in Figure 4.3, not Tables 4.2–4.4; entered) (battery costs at 1 MW and 10 MW) — https://www.sandia.gov/app/uploads/sites/256/2024/02/ESGC-Cost-Performance-Report-2022-PNNL-33283.pdf
- ☑ **A7 Alberta Carbon Offset Emission Factors Handbook v3.3** (received → data/) (electricity displacement factor) — https://open.alberta.ca/publications/carbon-offset-emission-factors-handbook-version-3
- ✅ (16 Oct: NFPA 855 2026 read from screenshots; not cited by BC or AB codes) **A8 Energy-storage fire rules**: whether NFPA 855 is referenced by the BC and Alberta building and fire codes (BC Codes site; NFPA 855 free read-only at nfpa.org)

## R. Receivers and rival sources for the map (14 Oct) — fetched from J.B.'s computer when linked
1. ☑ Statistics Canada ODSRF v2 (sport and recreation, 2026): https://www150.statcan.gc.ca/n1/pub/21-26-0002/2021001/zip/odsrf_v2_gpkg.zip
2. ☑ Statistics Canada ODHF (health, 2020): https://www150.statcan.gc.ca/n1/pub/13-26-0001/2020001/ODHF.zip
3. ☑ Statistics Canada ODEF v2.1 (education, 2022): https://www150.statcan.gc.ca/n1/pub/37-26-0001/2022001/ODEF_v2.1.zip
4. City of Vancouver open data — non-market housing; community centres; schools (opendata.vancouver.ca, blocked from the cloud).
5. District-energy service areas: NEU, Creative Energy, River District, Sen̓áḵw (Vancouver); Downtown District Energy and Blatchford (Edmonton) — service-area maps from the utilities or BCUC filings.
6. Wastewater plants (Iona, Lions Gate, Annacis; Gold Bar) — locations from Metro Vancouver and EPCOR pages.

## 6. Added 15 Oct 2026 (opportunity labels and precedent search)
- ☑ **G1 AUC Distribution System Inquiry (15 Oct: read via the AUC's announcement link on media.auc.ab.ca — pp. 60, 68–69 entered), final report (21 Feb 2021)** — the EV-charging finding (p. 60) is only known from law-firm summaries; the file would not open from here — https://efiling-webapi.auc.ab.ca/Document/Get/685017
- ☑ **G2 Bill 22 (2022) as enacted (15 Oct: read the current consolidation on CanLII — s. 2(1)(b) exempts on-site self-supply only; s. 18(2) everything leaving the site goes through the power pool), and the Electric Utilities Act consolidation, s. 2(1)(b) and s. 18(2)** — confirms whether surplus self-supply can be exported. Search the title on Alberta King's Printer (https://kings-printer.alberta.ca/) or CanLII (link not checked).
- ✅ **G3 Vancouver I-2 district schedule, sub-area B map** — deeper yards; I-2 parcels currently use the outside-B yards. City of Vancouver zoning by-law district schedules (link not checked).
- ☐ **G4 District-energy service-area maps** — Edmonton Downtown District Energy and Blatchford (for tracing; the lot-based approximation came out far too small), Creative Energy, River District, Sen̓áḵw (Vancouver). Same as R5.
- ☐ **G5 Ask, not fetch: City of Vancouver on the ground floor** — may a data centre use the ground floor (strict vs lenient reading)?
- ☑ Edmonton Zoning Bylaw 20001 s. 5.10 cl. 11 (solar collectors) — read from the bylaw PDF already in data/raw/edm/bylaw.

## 7. Added 16 Oct 2026 (research pass for the build) — blocked or not found; yours to fetch only if wanted
- ✅ (16 Oct: received; 6.3.2.15 read — 2.15 m above sidewalks, 7.6 m from air intakes, 3 m from doors, windows, outdoor spaces; NFPA 855 not cited) **R7 Vancouver Building By-law 2025 Book I (vol. 1)**, Part 6 Art. 6.3.2.15 cooling-tower setbacks and the referenced-documents table (does it cite NFPA 855?) — https://vancouver.ca/files/cov/vbbl-2025-volume-1-v4-01.pdf (proxy-blocked here; a download into Claude Link is enough)
- ✅ (16 Oct: received; NFPA 855 not cited, no energy-storage provisions) **R8 BC Building Code 2024** referenced-documents table (NFPA 855?) — https://www2.gov.bc.ca/assets/gov/farming-natural-resources-and-industry/construction-industry/building-codes-and-standards/revisions-and-mo/bcbc-revision-3/bcbc-revision-4/bcbc_2024_web_version_20240409.pdf
- ✅ (16 Oct: received; NFPA 855 not cited, no energy-storage provisions) **R9 National Fire Code – 2023 Alberta Edition** (NRC publications; same question) — through UBC Library if the NRC page will not open
- ✅ (16 Oct: received, consolidation 6 Feb 2026; s. 1(1)(m) read) **R10 Alberta Electric Utilities Act** consolidation, definition of "electric distribution system" — https://kings-printer.alberta.ca/documents/Acts/E05P1.pdf (King's Printer blocks automated reads)
- ✅ (16 Oct: Tier page received; no N+1/2N terms, tiers described qualitatively) **R11 Uptime Institute Tier Standard: Topology** (free with registration) — for N+1 / 2N practice; or ask Xun whether the ASHRAE datacom book is in the Library
- ✅ (16 Oct: R2 lists for both cities received; e-Stewards optional) **R12 R2 and e-Stewards directories** — search by hand for Metro Vancouver and Edmonton; screenshot the result lists (dynamic pages) — https://www.sustainableelectronics.org/find-an-r2-certified-facility/ and https://e-stewards.org/find-a-recycler/
- ✅ (16 Oct: Vancouver public streets and Edmonton Road Network received) **R13 Open data**: Vancouver "public streets" (centrelines) and Edmonton "road centreline" datasets, as GeoJSON — https://opendata.vancouver.ca and https://data.edmonton.ca
- ✅ FortisBC Rate 2 and 3 (16 Oct: screenshots; Rate 2 delivery corrected to $5.877)
- Not found anywhere public, to ask in person if useful: Canadian district-heating pipe cost per metre (City of Vancouver NEU staff, EPCOR DDE); EPCOR Gold Bar reclaimed-water terms; sewer review timelines.

## 8. Status 16 Oct 2026 (end of day) and new suggestions
- ✅ 16 Oct: F1 wells (nine reports), G3 I-2 sub-area B, D5 Blatchford (both plans), CEEDC district-energy inventory, NRCan CEUD commercial (BC, AB), ENERGY STAR Canadian medians (2018), City NES map (March 2020: Creative Energy, River District placed), RDE developer guidelines (2018), 2012 Neighbourhood Energy Strategy, BCUC Creative Energy search list.
- Still open: P4 greenhouse area by region; Metro Vancouver plant addresses; G4 Edmonton Downtown District Energy outline; A5 CSA C448 (optional); G5 ask the City (ground floor); Creative Energy steam rates (BCUC filings, optional); asks in person (Blatchford loop temperatures, pipe cost per metre, Gold Bar reclaimed water); e-Stewards (optional).
- Suggested (not yet fetched; links not checked): NRCan EV charging station open data; Alberta/BC greenhouse energy figures; Canadian RAS (aquaculture) costs; borefield cost per metre; rainwater tank cost; utility capacity maps if published; City warming/cooling centre lists.
- Update 16 Oct (later): done — G4 Edmonton Downtown District Energy (phases map), Creative Energy rates (G-5-26, G-179-26) and decisions (G-252-24, G-345-22A), EV stations BC and AB, Vancouver libraries and community centres, borehole cost (Edmonton, Majdabadi 2026), UofA GHG plan and Envision plan, rainwater page (rule only, no costs). Still open: P4 greenhouse by region (only City of Edmonton came through), Metro Vancouver plant addresses, G5 ask the City, A5 CSA C448, greenhouse energy BC/AB, Canadian RAS costs, rainwater tank cost, utility capacity maps, City non-potable water systems map (new), Edmonton EV/cooling-centre equivalents (optional).

## 9. Edmonton parity (J.B., 16 Oct: both cities need the same operations)
Vancouver has it, Edmonton does not yet: non-market housing receivers; library list; cooling/warming-centre list; water-system permits (cooling towers, rainwater systems); a real data-centre reference with public figures; sewer-heat programme; rainwater sizing rule; wastewater plant addresses (Edmonton has Gold Bar placed). Edmonton has, Vancouver does not: better floor-area coverage for schools (parcel data).
