# 15b · Add-ons: on-site electricity generation (solar PV, small urban wind)

Prepared 14 Oct 2026 for the Beyond Data tool (Vancouver and Edmonton, 0.1 to 40 MW IT).
Bullet format: **value · unit · meaning · source (title, publisher, year, page or section, URL) · source type · status**.
"VERIFIED" means the number was read in the source opened for this file. "DERIVED" means arithmetic on verified numbers, shown in full. "UNVERIFIED" means not confirmed. "ASSUMPTION" means a tool input with no source behind it.
Where a fetch was summarised by the reading tool rather than read line by line, the page or section given is the one the tool reported. Spot-check these before citing in the thesis.

---

## 1. Specific yield (kWh/kWp/yr)

### NRCan method (applies to every NRCan value below)
- **0.75 · performance ratio (dimensionless)** · the system losses NRCan assumes in all of its PV potential values · *Photovoltaic potential and solar resource maps of Canada*, Natural Resources Canada, web page (dataset published 2020, record modified 2024-02-15), "Methodology" · https://natural-resources.canada.ca/energy-sources/renewable-energy/photovoltaic-potential-solar-resource-maps-canada · government · VERIFIED
- **±10 % · uncertainty** · "lifetime average annual PV potential for most systems should be within about 10%" of the published values · same page, "Uncertainty" · government · VERIFIED
- **0.75 to 0.9 PR in early years; 0.6 %/yr degradation; 25+ yr life** · NRCan's note that well-functioning systems usually beat the PR 0.75 estimate in their early years · same page · government · VERIFIED
- **Six orientations** · sun-tracking, horizontal (0°), and south-facing fixed at latitude tilt, vertical (90°), latitude +15° and latitude −15° · Open Government dataset record 8b434ac7-aedb-4698-90df-ba77424a551f · https://open.canada.ca/data/en/dataset/8b434ac7-aedb-4698-90df-ba77424a551f · government dataset · VERIFIED
- **Insolation basis: 1974 to 1993, 144 stations (CERES/ECCC), ANUSPLIN interpolation, ~2 km grid** · the climate data behind the values is old · NRCan page above · government · VERIFIED

### City values
- **1009 · kWh/kWp/yr · Vancouver, south-facing at latitude tilt** · Pelland, Poissant, McKenney et al., *The Development of Photovoltaic Resource Maps for Canada*, CANMET Energy Technology Centre (NRCan), 2006 (CETC 2006-046), Table 1 · https://natural-resources.canada.ca/sites/www.nrcan.gc.ca/files/canmetenergy/files/pubs/2006-046_OP-J_411-SOLRES_PV+map.pdf · government / conference paper · VERIFIED
- **1245 · kWh/kWp/yr · Edmonton, south-facing at latitude tilt** · same paper, Table 1 · VERIFIED
- For comparison from the same table: Victoria 1091, Calgary 1292, Toronto 1161 (all at latitude tilt) · VERIFIED
- **Horizontal (flat) and vertical (facade) values, Vancouver and Edmonton** · UNVERIFIED. They are in the NRCan municipal CSV, but the server's robots.txt refused automated reading (see "For J.B. to retrieve").
- **Parkland County, Acheson, Spruce Grove and Stony Plain** · UNVERIFIED. Same CSV.
- **Do not use** the Canada Energy Regulator market snapshot values (Vancouver 5.21, Edmonton 6.50). The page labels them kWh/m², describes them as dual-axis tracking insolation, and is inconsistent about whether they are monthly or annual. *Market Snapshot: Which cities have the highest solar potential in Canada?*, CER, 2018 · https://cer-rec.gc.ca/en/data-analysis/energy-markets/market-snapshots/2018/market-snapshot-which-cities-have-highest-solar-potential-in-canada.html · government · read; rejected

### Facade derate (no Vancouver or Edmonton number found)
- **1.7 to 2.5 × · area ratio** · vertical BIPV needs 1.7 to 2.5 times the area of rooftop PV to produce the same annual energy (357 design options, 44 cities, 12 countries) · IEA PVPS Task 15 summary page for Yang, R.J. et al. (2026), "Multi-objective Assessment of BIPV Yield, Complementarity, and Economic Feasibility", DOI 10.1016/j.enbuild.2026.118031 · https://iea-pvps.org/key-topics/journal-article-multi-objective-assessment-of-bipv-yield-complementarity-and-economic-feasibility/ · intergovernmental programme summarising a peer-reviewed paper · VERIFIED on the summary page only; the paper itself was not opened, and the ratio mixes yield and packing effects
- **Interim vertical/roof yield factor 0.4 to 0.6** · DERIVED as 1/2.5 to 1/1.7, assuming equal module density on roof and facade. This is a placeholder until the NRCan vertical values are retrieved. Mark it low confidence.

---

## 2. Module density, roof coverage, losses

- **160 · W/m² of module (0.16 kWp/m²)** · module power density, about 16 % efficiency (median of ~48,000 US systems installed in 2014) · Gagnon, Margolis, Melius, Phillips, Elmore, *Rooftop Solar Photovoltaic Technical Potential in the United States: A Detailed Assessment*, NREL/TP-6A20-65298, 2016, p. 13, Table 1 · https://nrel.gov/docs/fy16osti/65298.pdf · national lab · VERIFIED
- **About 25 % more output at 20 % efficiency** · the report's sensitivity case · same report, p. vii · VERIFIED
- **410 Wdc / 1.97 m² (20.8 %) and 525 Wdc / 2.57 m² (20.5 %)** · module specifications in NREL's current benchmark (residential, and community/utility) · Ramasamy et al., *U.S. Solar Photovoltaic System and Energy Storage Cost Benchmarks … Q1 2023*, NREL/TP-7A40-87303, 2023, p. 19 and pp. 23, 28 · https://www.nrel.gov:443/docs/fy23osti/87303.pdf · national lab · VERIFIED
  - **0.208 and 0.204 kWp/m²** · DERIVED as 410/1.97 and 525/2.57. Use **0.20 kWp/m²** as the "current module" case.
- **0.70 · module area / roof area, flat roofs** · ratio chosen to keep self-shading to about 2.5 % at 15° tilt. Tilted roofs use 0.98. · Gagnon et al. 2016, pp. 13–14 · VERIFIED
- **15° · tilt assumed for flat roofs** · Gagnon et al. 2016, p. 13 · VERIFIED. Flat-roof arrays sit well below latitude tilt (49° Vancouver, 53.5° Edmonton), so the NRCan latitude-tilt yield overstates a 15° flat-roof array by an unknown amount until the NRCan horizontal value is retrieved.
- **66 % · share of large-building roof area suitable for PV** · (26 % small, 49 % medium, 32 % overall) from a lidar sample, using an unshaded-energy test of at least 80 % and a minimum plane of 10 m² · Gagnon et al. 2016, pp. 9–12 · VERIFIED. This is not a setback or plant allowance, and data-centre roofs crowded with plant could fall well below it.
- **Setbacks and fire access** · Gagnon et al. state no fixed setback or obstruction allowance (p. 12, fn. 9) · VERIFIED as absent. Canadian fire-code roof access rules: UNVERIFIED (gap).
- **14.08 % · total system losses (SAM/PVWatts default); inverter efficiency 96 %; DC/AC 1.2** · Gagnon et al. 2016, p. 13 · VERIFIED
- **PVWatts v8 API defaults: gcr 0.4, dc_ac_ratio 1.2, inv_eff 96 %; "losses" has no default** · *PVWatts V8 API documentation*, NREL developer network · https://developer.nrel.gov/docs/solar/pvwatts/v8 · national lab · VERIFIED
- **AC+DC losses 14.3 % (2019 and 2035 Conservative), 10.4 % (2035 Moderate), 7.5 % (2035 Advanced)** · NREL *Annual Technology Baseline 2024*, Commercial PV, "Capacity Factor" · https://atb.nrel.gov/electricity/2024/commercial_pv · national lab · VERIFIED
- **Consistency note:** NRCan's PR 0.75 already contains the system losses. Do not apply the 14 % again on top of the NRCan yield.

---

## 3. Cost, O&M, life, degradation

### Canadian installed prices (preferred)
All from Baldus-Jeursen, C. and Poissant, Y. (NRCan), *National Survey Report of PV Power Applications in Canada 2024*, IEA PVPS Task 1, Dec 2025, Tables 7 and 8 · https://iea-pvps.org/wp-content/uploads/2025/12/IEA-PVPS-Task-1-NSR-Canada-2024.pdf · government authors in an intergovernmental report · VERIFIED

| System | CAD/W, excl. tax, 2024 |
|---|---|
| Small commercial BAPV, 10–100 kW | 2.00–3.20 |
| Large commercial BAPV, 100–250 kW | 1.90–2.40 |
| Industrial BAPV, >250 kW | 1.68–2.22 |
| Small centralised, 1–20 MW | 1.65–1.90 |
| BIPV | not tracked |

- 2024 prices were unchanged from 2023: module prices fell while racking costs rose · same report · VERIFIED

### US reference (NREL), stated as US
- **USD 1.99/WDC · commercial PV capital cost, 2022 base year** · representative system is 200 kWDC, flat-roof mounted, DC/AC 1.23. The page does not state the dollar year. · NREL ATB 2024, Commercial PV · https://atb.nrel.gov/electricity/2024/commercial_pv · national lab · VERIFIED
- **About USD 21/kWDC-yr fixed O&M (2022); ~USD 19/kWDC-yr for 2023 (15.5 system + 3.3 administration); industry range 0 to 40** · same page · VERIFIED
- **30 yr · life; 0.7 %/yr · degradation (baseline)** · same page · VERIFIED
- **Commercial capacity factor 12.0 % to 19.1 % (US resource classes 10 to 1)** · same page · VERIFIED (US context only)
- The NREL Q1 2023 cost benchmark did not model commercial rooftop that year (p. 15). Its community-solar MMP of USD 1.76/Wdc is the closest proxy. · NREL/TP-7A40-87303 · VERIFIED

### Degradation
- **0.5 %/yr median, 0.8 %/yr mean (2,128 reported rates)** · Jordan, Wohlgemuth, Kurtz, *Technology and Climate Trends in PV Module Degradation*, NREL/PR-5200-56690, 2012, slide 7 (citing Jordan et al., *Progress in PV* 2011) · https://www.nrel.gov/docs/fy13osti/56690.pdf · national lab presentation · VERIFIED
- **0.6 %/yr** · NRCan page (section 1) · VERIFIED

### BIPV cost
- UNVERIFIED (gap). There is no Canadian or NREL BIPV facade $/W in any source opened. NRCan states BIPV prices are "not tracked". NREL/TP-6A20-53103 (2011, residential BIPV) was located, but its numbers were not read.

---

## 4. Rules

### BC Hydro
- **Rate Schedule 1289 (net metering) closed to new customers; RS 2289 Self-Generation in effect from 1 July 2026** · existing RS 1289 customers stay on it for 10 years from their start date · BC Hydro, *Self-generation* page · https://app.bchydro.com/accounts-billing/electrical-connections/customer-generation/self-generation.html · utility · VERIFIED
- **Size cap: 100 kW AC inverter capacity, or a premises net injection limit of 100 kW AC per phase** · same page · VERIFIED. Reading of the text: a larger array may qualify if the premises export is limited. This reading is UNVERIFIED and should be confirmed against the RS 2289 tariff text.
- **CAD 0.10/kWh · bill credit for exported energy, settled each billing period (net billing)** · credits offset energy charges only, not the basic charge · same page · VERIFIED
  - Under RS 1289, excess was banked as kWh credits. RS 2289 pays each billing cycle. BC Hydro says the fixed price reflects what the energy is worth to it. · BC Hydro, *Self-generation rate updates* · https://www.bchydro.com/toolbar/about/strategies-plans-regulatory/rate-design/self-generation-rate-updates.html · utility · VERIFIED
  - BCUC proceeding: application ID 1323 · https://www.bcuc.com/OurWork/ViewProceeding?applicationid=1323 · order number not opened (UNVERIFIED)
- **Eligible: residential and commercial; renewable or clean resource under the Clean Energy Act; distribution-connected** · self-generation page · VERIFIED. Large General Service and transmission-service customers are not mentioned (gap).
- **Load displacement incentive: estimated solar load displacement of 25,000 kWh/yr or more** · industrial and large commercial customers; the incentive application takes 4 to 6 weeks · self-generation page · VERIFIED
- **Community generation (RS 2290): up to 2 MW; CAD 0.10/kWh credits to subscribers** · BC Hydro, *Customer generation* · https://app.bchydro.com/accounts-billing/electrical-connections/customer-generation.html · VERIFIED
- **Larger generators: Distribution Generator Interconnection (≤35 kV), first-come first-served, five steps (information request, optional screening, system impact study, facilities study, interconnection agreement); >35 kV handled as transmission** · BC Hydro, *Distribution Generator Interconnections* · https://app.bchydro.com/accounts-billing/electrical-connections/distribution-generator-interconnections.html · utility · VERIFIED. There is no open general purchase offer: the Standing Offer Program is listed as closed.
- **PV incentives in BC: 7 % PST exemption on PV equipment; residential rebate up to $5,000 ($1,000/kW)** · NSR Canada 2024, Table 13 · VERIFIED

### Alberta
- **Micro-generator: renewable or alternative energy only; capacity ≤ the lesser of 5 MW or the customer's service rating; intended to meet all or part of the customer's own consumption; located on owned or leased property or adjacent property** · AUC, *Micro-generation notice submission guideline* (2026 file; undated inside), p. 4, quoting Micro-generation Regulation s. 1(1)(h) · https://media.auc.ab.ca/prd-wp-uploads/regulatory_documents/Reference/MicrogenerationNoticeSubmissionGuideline2026.pdf · regulator · VERIFIED
- **Small < 150 kW; large 150 kW to < 5 MW** · same, p. 6; also Government of Alberta *Micro-generation* page · https://www.alberta.ca/micro-generation · VERIFIED
- **Sizing test: a unit producing more per year than the site's historical consumption is not eligible** · future load can be counted with evidence · AUC guideline pp. 1, 9, 17 · VERIFIED. A data centre's load is far above any rooftop array, so this test does not bind here.
- **Compensation: small units credited at the retail energy price and netted within 12 months; large units with an interval meter paid the hourly pool price** · AUC guideline p. 21 (Regulation s. 7) · VERIFIED. Government of Alberta: "The government does not decide what this rate should be." The rate is set by the retailer contract. · VERIFIED
- **AUC Bulletin 2025-13 (3 Oct 2025): draft changes to Rule 024; size limits and compensation are out of scope (they are government policy)** · https://media.auc.ab.ca/prd-wp-uploads/News/2025/Bulletin%202025-13.pdf · regulator · VERIFIED. Rule 024 final 2026 version: UNVERIFIED (a 2026-07-15 blackline exists).
- **Small Scale Generation Regulation (Alta Reg 194/2018): renewable or alternative; capped by distribution hosting capacity (no fixed MW); deemed $0/MWh offer, paid hourly pool price by the Balancing Pool; in force 1 Jan 2019** · ss. 1(g), 4, 6, 7, 11 · read from the FAOLEX copy https://faolex.fao.org/docs/pdf/can191868.pdf · regulation (third-party database copy) · VERIFIED as text, but whether it is current is UNVERIFIED. Check the official text at open.alberta.ca/publications/2018_194.
- **Distribution-connected generation outside micro-gen: AUC Distributed-Generation Application Guideline** · media.auc.ab.ca/prd-wp-uploads/2022/01/DistributedGenerationApplicationGuideline.pdf · not opened (UNVERIFIED)
- **Alberta PV incentives: city-specific only** · NSR Canada 2024, Table 13 · VERIFIED

### Municipal
- **Vancouver: roof-mounted energy technologies may exceed the height limit at the Director of Planning's discretion** · s. 10.1.1(d). No metre cap is set. The Director considers views, overlook, shadowing and noise. · *Zoning and Development By-law*, Section 10 (May 2026 consolidation) · https://bylaws.vancouver.ca/zoning/zoning-by-law-section-10.pdf · regulation · VERIFIED
- **Vancouver bulletin *Roof Mounted Energy Technologies and Green Roofs* (Nov 2022)** · "minor additional height" is discretionary. Where equipment exceeds one third of the building width or one tenth of the roof area, careful design and integration are expected. Vancouver Building By-law compliance applies. Setbacks, view cones and heritage are not addressed. · https://guidelines.vancouver.ca/bulletins/bulletin-roof-mounted-energy-technologies-and-green-roofs.pdf · municipal guidance · VERIFIED
- **Edmonton Zoning Bylaw 20001 (2024) solar provisions** · UNVERIFIED (gap). Only the superseded Bylaw 12800 (2017) PDF was found, and it only defines "Renewable Energy Device".
- **Heritage (both cities)** · UNVERIFIED (gap)
- **Parkland County Land Use Bylaw (Acheson)** · UNVERIFIED (gap)

---

## 5. Worked check: share of annual electricity from rooftop PV

**Formula**
E_PV [kWh/yr] = A_roof × f_free × GCR × PD × Y
E_DC [kWh/yr] = P_IT × PUE × 8760
share = E_PV / E_DC

**Coefficients**

| Symbol | Value | Source |
|---|---|---|
| f_free (free roof fraction) | 0.66 | NREL 65298, large buildings (VERIFIED). Optimistic for a plant-heavy roof. |
| GCR (module/roof ratio) | 0.70 | NREL 65298 (VERIFIED) |
| PD (module density) | 0.16 kWp/m² (2014 median) or 0.20 kWp/m² (current) | NREL 65298; NREL 87303, derived (VERIFIED) |
| Y (yield) | Vancouver 1009, Edmonton 1245 kWh/kWp | NRCan 2006, latitude tilt (VERIFIED). An upper bound for 15° flat-roof arrays. |
| PUE | 1.4 (LBNL) to 1.54 (Uptime) | Tool's existing values per the brief; not re-checked here |

**Roof areas**
ASSUMPTION: 2,500 and 5,000 m² of roof for 1 MW IT; 5,000 and 10,000 m² for 10 MW IT. These are not sourced. For scale, two observed sites measure about 37 × 102 m ≈ 3,774 m² (Edmonton E02) and about 114 × 62 m ≈ 7,068 m² (Acheson), per sources/12 and sources/01 (OBS). The IT density of white space alone runs 1,076 to 5,382 W/m² (Sun et al. 2021, cited in sources/06). Gross roof area per IT watt in a multi-storey urban building is therefore smaller still.

**Roof yield per m²** (DERIVED)
- kWp per m² of roof = 0.66 × 0.70 × 0.16 = 0.0739, or 0.66 × 0.70 × 0.205 = 0.0947
- kWh per m² of roof per year:

| | PD 0.16 | PD 0.205 |
|---|---|---|
| Vancouver | 74.6 | 95.6 |
| Edmonton | 92.0 | 117.9 |

**Demand** (DERIVED)
- 1 MW IT: 1,000 × 1.4 × 8,760 = 12,264 MWh/yr, up to 13,490 MWh/yr at PUE 1.54
- 10 MW IT: 122,640 to 134,904 MWh/yr

**Results** (DERIVED; PV output is the same for both PUE values, share given as PUE 1.54 to 1.4)

| Case | Roof m² | Array kWp | Vancouver MWh/yr | Vancouver share | Edmonton MWh/yr | Edmonton share |
|---|---|---|---|---|---|---|
| 1 MW | 2,500 | 185–237 | 186–239 | 1.4–1.9 % | 230–295 | 1.7–2.4 % |
| 1 MW | 5,000 | 370–474 | 373–478 | 2.8–3.9 % | 460–590 | 3.4–4.8 % |
| 10 MW | 5,000 | 370–474 | 373–478 | 0.28–0.39 % | 460–590 | 0.34–0.48 % |
| 10 MW | 10,000 | 739–947 | 746–956 | 0.55–0.78 % | 920–1,179 | 0.68–0.96 % |

**Reading:** rooftop PV supplies roughly 1 to 5 % of a 1 MW IT site's electricity and under 1 % of a 10 MW site's, before any loss of roof to dry coolers. A useful rule of thumb: share ≈ (kWh/m²·yr of roof) ÷ (IT W per m² of roof × PUE × 8.76). At 1,000 W IT per m² of roof, PUE 1.4 and 95 kWh/m², the share is about 0.8 %. Because a data centre's load is constant, essentially all the PV output is consumed on site. Exports, and the 100 kW and sizing limits on exports, then matter little. (DERIVED)

---

## 6. Conflict with rooftop plant, shading and heat

- **No primary guidance found on sharing a data-centre roof between PV and heat rejection equipment** (gap). The one trade article found (DatacenterDynamics, 2025) relies on interviews and an untitled 2022 CBRE report, so it is not citable.
- **Shading:** NREL counts roof area as suitable only if it reaches at least 80 % of unshaded energy (Gagnon 2016, p. 9; VERIFIED). Dry coolers, screens and stair or elevator housings shade the arrays next to them. The tool should take plant area out of f_free and apply a further buffer. Buffer width: UNVERIFIED.
- **Vancouver** expects careful design where rooftop equipment exceeds one third of the building width or one tenth of the roof area (bulletin, VERIFIED). This affects PV and dry coolers together.
- **Roof heat:** a tilted PV array cut peak downward ceiling heat flux from 18.7 to 7.0 W/m² (63 %). The mean daytime difference was 14.0 W/m², and the ceiling was up to 2.5 °C cooler by day but warmer at night (San Diego). · Dominguez, Kleissl, Samady, Luvall, *Effects of Solar Photovoltaic Panels on Roof Heat Transfer*, AMS 9th Symposium on the Urban Environment, 2010 (NASA NTRS 20100035690) · https://ntrs.nasa.gov/citations/20100035690 · conference abstract (not peer reviewed) · VERIFIED. The effect is minor for a data centre, whose load is internal.
- **PV next to dry-cooler exhaust (warm air raising module temperature and lowering output), and dry-cooler intake affected by arrays** · UNVERIFIED (gap; no source found)

---

## 7. Small urban wind

- **Building-mounted turbines on urban and suburban sites: none generated more than 200 kWh/yr, equal to load factors of 3 % or less. Every building-mounted turbine in the trial measured below the commonly quoted 10 %. Free-standing turbines averaged 19 %.** · 38 building-mounted and 19 free-standing turbines, each monitored for one year · James, Bahaj, Anwar, Myers, *Location, location, location: Domestic small-scale wind field trial report*, Energy Saving Trust, July 2009, pp. 7, 13, 21 · government-funded agency report. The copy read was hosted at https://www.klein-windkraftanlagen.com/wp-content/uploads/2024/11/Energie-Saving-Trust-Location-location-location.pdf, a third-party (vendor) site; the bibliographic record is at https://eprints.soton.ac.uk/353113 · VERIFIED (the page numbers may be off by one, per the reading tool)
- **Urban and suburban sites: under 75 kWh/m² of swept area per year, most below 25. Good rural sites: 100 to 280. Nominal assumption: 360 kWh/m² (a 10 % load factor).** · 39 horizontal-axis turbines under 2 kWp · James et al., "Implications of the UK field trial of building mounted horizontal axis micro-wind turbines", *Energy Policy* 38(10):6130–6144, 2010, DOI 10.1016/j.enpol.2010.05.070, abstract · https://eprints.soton.ac.uk/184639 · peer reviewed · VERIFIED (abstract)
- **None of the NREL case-study projects met their energy estimates.** NASA Building 12 (Houston), four turbines in March 2016: capacity factors of 0.0011 to 0.0079 %. Projects "can be difficult to justify on a cost of energy or energy offset basis". · Baring-Gould, Fields, Oteri, Preus, *Deployment of Wind Turbines in the Built Environment*, NREL/PO-5000-68423, 2017, which summarises NREL/TP-5000-65622 (2016) · https://nrel.gov/docs/fy17osti/68423.pdf · national lab · VERIFIED. The column pairing in the poster table was extracted imperfectly.
- **Recommendation: leave urban wind out as a sized add-on.** Show it only as a "considered and excluded" card that quotes the measured ≤3 % load factor and the under 75 kWh/m² swept area. Reasons:
  - The measured output is negligible. A hypothetical 10 kW roof turbine at 3 % gives about 2.6 MWh/yr (DERIVED: 10 × 0.03 × 8760), against 12,264 MWh/yr for a 1 MW site, or 0.02 %.
  - No Canadian urban field data was found.
  - NREL itself reports that no project met its estimate.

---

## 8. Effects on other rows when PV is added to an option

| Row | Formula / value | Basis |
|---|---|---|
| Electricity (MWh/yr) | E_PV from section 5 | Range from PD 0.16 to 0.205 and f_free |
| Grid carbon avoided, BC | E_PV × 22.8 tCO2e/GWh (2025). The range across 2021–2025 was 9.7 to 22.8. | BC Gov *Electricity emission intensity factors*, updated 26 May 2026, consumption-based · https://www2.gov.bc.ca/gov/content/environment/climate-change/data/electricity · VERIFIED |
| Grid carbon avoided, AB | E_PV × 335 g/kWh (2024 generation intensity) | GoA *Alberta's GHG emissions reduction performance* · https://www.alberta.ca/albertas-greenhouse-gas-emissions-reduction-performance · VERIFIED |
| AB displacement factor | 0.52 t/MWh (renewable displacement) or 0.55 t/MWh (distributed generation at point of use, includes line loss) | AEP *Carbon Offset Emission Factors Handbook* v3.0, June 2022, Table 1 p. 6 · VERIFIED, but **superseded**: v3.3 applies from 27 Aug 2026 and was not read |
| Roof area used (m²) | A_roof × f_free | Taken from the space available to dry coolers |
| Capital cost | kWp × 1.68–2.22 CAD/W (>250 kW) or 1.90–2.40 (100–250 kW) | NSR Canada 2024 |
| O&M | ~USD 21/kWDC-yr (US) | NREL ATB 2024 |
| Life and degradation | 25–30 yr; 0.5–0.7 %/yr | NRCan, NREL |
| Bill value | Self-consumed kWh offset the energy charge (BC LGS 6.79 ¢/kWh per sources/14). Exports: BC 10 ¢/kWh; AB retail (small) or pool price (large). | |
| Glare and visibility | Qualitative only. Vancouver's discretionary review covers views and overlook; no Canadian glare standard was found. | Gap |
| Approvals | BC: RS 2289 application plus building permit, and a Director of Planning height relaxation if needed. AB: AUC Rule 024 micro-generation notice to the wire owner plus City permits. | |

Example (DERIVED), 1 MW site with 5,000 m² of roof:
- Vancouver: 373–478 MWh × 22.8 t/GWh = **8.5–10.9 tCO2e/yr**
- Edmonton: 460–590 MWh × 0.335 t/MWh = **154–198 tCO2e/yr**. With the superseded 0.52 factor: 239–307 t.
- Capital cost: 370–474 kWp × 1.68–2.22 CAD/W ≈ **CAD 0.62–1.05 M**

---

## (a) Proposed tool quantities

1. **pv_roof_kWp** = A_roof × f_free × GCR × PD
   - GCR = 0.70
   - PD = 0.16 (low) or 0.20 (central) kWp/m²
   - f_free = 0.66 × (1 − plant share of roof). The plant share comes from the cooling module.
2. **pv_roof_MWh** = pv_roof_kWp × Y_city / 1000
   - Y_city: Vancouver 1009 and Edmonton 1245 as upper bounds. Replace them with the NRCan horizontal or latitude −15° values once retrieved.
   - Show ±10 %.
   - Do not apply losses again (PR 0.75 is already included).
3. **pv_facade_MWh** = A_facade_south × PD × Y_city × k_vert
   - k_vert = 0.4–0.6 (interim, low confidence) until the NRCan vertical values are retrieved.
4. **pv_share** = pv_MWh / (P_IT × PUE × 8.76 × 1000)
5. **pv_CO2_avoided_t**: BC = MWh × 0.0228; AB = MWh × 0.335 (average), with 0.52–0.55 shown as the displacement-factor upper bound (to be updated to v3.3).
6. **pv_capex_CAD** = kWp × 1000 × {2.00–3.20 if <100 kW; 1.90–2.40 if 100–250 kW; 1.68–2.22 if >250 kW}
   - **pv_opex** = kWp × 21 USD/yr (flag that this is a US figure)
7. **Lifetime energy factor** = Σ_{t=0}^{24} (1 − 0.006)^t ≈ 23.3 (DERIVED, using the NRCan 0.6 %/yr). NRCan states its published yield is already a lifetime average, so use it only if the yield input is a first-year value.
8. **Regulatory flags:**
   - BC: export > 100 kW AC per phase → "outside RS 2289; DGI study"
   - AB: kW < 150 → small micro-gen; 150 kW to 5 MW → large micro-gen; > 5 MW or not on the site → small-scale generation or distributed-generation path
9. **Wind:** excluded card with measured values (≤3 % load factor; <75 kWh/m² swept area per year).

## (b) Gaps

- NRCan horizontal, vertical and latitude ±15° yields for Vancouver and Edmonton, and every value for Parkland County / Acheson (CSV blocked).
- Yield of a 15°-tilt flat-roof array (versus latitude tilt) and snow losses in Edmonton.
- BIPV facade installed cost (Canadian or NREL); facade derate for these cities.
- Rooftop setbacks under the BC Building Code / BC Fire Code / NBC and the Alberta Building Code; CSA C22.1 s. 64.
- Edmonton Zoning Bylaw 20001 solar and height provisions; Parkland County LUB; heritage rules in both cities.
- RS 2289 tariff text (premises net-injection reading; whether LGS customers are eligible); BCUC order number.
- Alberta Carbon Offset Emission Factors Handbook v3.3 displacement factor; ECCC NIR Annex 13 consumption intensities.
- Any primary source on roof sharing between PV and dry coolers, or on exhaust-plume heating of modules.
- Canadian O&M figure for commercial PV.
- Glare guidance (Transport Canada) near YVR or Edmonton airports.
- Data-centre roof area per MW IT: there is no sourced ratio, so the worked check uses assumed areas.

## (c) For J.B. to retrieve

1. NRCan municipal PV potential CSV (all six orientations; robots.txt refused automated reading): https://ftp.maps.canada.ca/pub/nrcan_rncan/Solar-energy_Energie-solaire/photovoltaic_canada_photovoltaique/municip_potentiel-potential.csv. Also municip_kWh.csv in the same folder, and the web map https://nrcan-rncan.maps.arcgis.com/apps/webappviewer/index.html?id=0de6c7c412ca4f6cbd399efedafa4af4. Needed rows: Vancouver, Edmonton, Parkland County, Spruce Grove, Stony Plain.
2. NRCan ESRI REST service (not reachable by the fetch tool): https://maps-cartes.services.geo.ca/server_serveur/rest/services/NRCan/PPSRMC_CEPESPC_EN/MapServer
3. BC Hydro Electric Tariff, RS 2289 text: https://app.bchydro.com/toolbar/about/strategies-plans-regulatory/tariffs-terms-conditions/electric-tariff.html. BCUC proceeding 1323: https://www.bcuc.com/OurWork/ViewProceeding?applicationid=1323
4. Alberta Carbon Offset Emission Factors Handbook v3.3 (download button only): https://open.alberta.ca/publications/carbon-offset-emission-factors-handbook-version-3. Displacement factor methodology: https://open.alberta.ca/publications/methodology-for-the-electricity-displacement-factor
5. Official Small Scale Generation Regulation text: open.alberta.ca/publications/2018_194. AUC DG guideline: media.auc.ab.ca/prd-wp-uploads/2022/01/DistributedGenerationApplicationGuideline.pdf. Rule 024 2026 blackline: https://media.auc.ab.ca/prd-consultation/sites/2/2026/07/2026-07-15-Rule_024-blackline.pdf
6. ECCC GHG inventory data mart (Annex 13 tables; fetch tool refused it): https://data-donnees.ec.gc.ca/data/substances/monitor/canada-s-official-greenhouse-gas-inventory/
7. Yang et al. 2026, *Energy and Buildings*, DOI 10.1016/j.enbuild.2026.118031 (BIPV yields and costs by orientation)
8. Energy Saving Trust 2009 report from an official or university source (to replace the vendor-hosted copy): https://eprints.soton.ac.uk/353113. NREL/TP-5000-65622 full text: https://www.osti.gov/biblio/1260340
9. Edmonton Zoning Bylaw 20001 (current consolidation) solar and height sections; Parkland County Land Use Bylaw.
10. NREL/TP-6A20-53103 (BIPV prices, 2011): https://www.osti.gov/biblio/1029857
