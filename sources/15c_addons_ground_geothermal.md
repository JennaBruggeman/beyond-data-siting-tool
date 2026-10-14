# Hunt 15c — Add-ons: geothermal and ground (14 Oct 2026)

Scope: closed-loop geoexchange borefields (heat sink; BTES seasonal store), open-loop groundwater and ATES, deep geothermal. Cities: Vancouver BC and Edmonton AB. IT load 0.1–40 MW.

Format of each bullet: **value · unit · meaning** — source title, publisher, year, page/section, URL · source type · status.
Status codes: **verified** = read in the source this pass; **derived** = my arithmetic on verified numbers (formula shown); **UNVERIFIED** = not confirmed in a primary source; **operator claim** = statement by an operator or owner.
Cross-references to `05_groundwater_noise_tenure.md` (Hunt 5, 6 Oct 2026) are marked "Hunt 5"; those items were not re-opened in this pass.

---

## 1. Borefield sizing (closed loop)

### 1.1 Heat rate per metre of borehole

- **No rejection-mode W/m table from a Canadian or ASHRAE/IGSHPA/CSA source could be opened.** CSA C448, the ASHRAE Handbook (Applications, geothermal chapter) and VDI 4640 are paywalled. · UNVERIFIED (gap). See section 9.
- **Heat-extraction look-up tables exist for 1,200, 1,800, 2,400, 3,000 and 3,600 full-load equivalent (FLEQ) run hours/yr, pp. 5–9.** Axes: ground conductivity 1.0–5.0 W/m·K by mean ground temperature 6–15 °C. Conditions: heat extraction only, minimum spacing 6 m, boreholes in a line, 130 mm bore, single U-tube, grout 2.4 W/m·K. — *MCS 022 Ground Heat Exchanger Look-Up Tables, supplementary material to MIS 3005*, DECC / MCS, Issue 1.0, 2 Sep 2011, pp. 4–9, https://mail.gshp.org.uk/pdf/MIS_3005_Ground_loop_sizing_tables.pdf · standard (UK certification scheme) · **structure verified; cell values UNVERIFIED** (the text extraction scrambled the grid, and a direct download was refused by the proxy). Values seen across the 1,200 h table run from 21 to 77 W/m, but they could not be matched to cells. **For J.B. to retrieve.**
  - Relevance caveat: these tables cover heating only. A data centre rejects heat for about 8,760 h/yr, which is above the highest table (3,600 h).
- **12–19 W/m · sustained heat rejection per metre of borehole for a real data-centre cooling load over 20 years** (14.5 kWth load; 1,248 m base field → 760 m optimized field with dry cooler). — Zurmuhl, Beckers, Lukawski, Aguirre, Schnaars, Anderson, Tester, *Hybrid Geothermal Heat Pumps for Cooling Telecommunications Data Centers*, 43rd Workshop on Geothermal Reservoir Engineering, Stanford, 2018, NREL/CP-5500-71257, pp. 2, 7, https://pangea.stanford.edu/ERE/pdf/IGAstandard/SGW/2018/Zurmuhl.pdf (record: https://research-hub.nrel.gov/en/publications/hybrid-geothermal-heat-pumps-for-cooling-telecommunications-data--2/) · national-lab conference paper · **derived** (14,500 W ÷ 1,248 m = 11.6 W/m; ÷ 760 m = 19.1 W/m). Equivalent to **52–86 m of borehole per kW** of continuous load. Site: Ithaca NY, ground k = 3.27 W/m·K (TRT), far-field ground 9.0 °C (p. 3).
- **47 W/m · average BTES charging rate at Drake Landing** (236 kW BTES thermal input ÷ 5,040 m). — Mudasar, Leong, Fung, *Combining Ground Source Heat Pump and Organic Rankine Cycle for Power and Heat*, CSME Congress 2020, pp. 1, 4, https://library.upei.ca/islandora/object/csme2020%3A81/datastream/PDF/download/csme2020_81.pdf · conference paper · **derived** (236 kW from p. 1; 144 × 35 m = 5,040 m).
- **83 W/m · design charging rate of a data-centre-fed BTES** (1.1 MW ÷ 240 × 55 m = 13,200 m). — Li, Hou, Hong, Ding, Nord, "Energy, economic, and environmental analysis of integration of thermal energy storage into district heating systems using waste heat from data centres", *Energy* 219 (2021) 119582, doi:10.1016/j.energy.2020.119582, Sec. 3.1, Table C.2, https://escholarship.org/content/qt20s461nc/qt20s461nc.pdf · peer-reviewed · **derived**.

### 1.2 Depth, spacing, land per borehole

- **35 m deep, 144 boreholes, 24 parallel circuits of 6 in series · Drake Landing BTES.** — Mesquita, McClenahan, Thornton, Carriere, Wong, *Drake Landing Solar Community: 10 Years of Operation*, ISES SWC 2017, Sec. 2, https://proceedings.ises.org/paper/swc2017/swc2017-0033-Mesquita.pdf · conference paper (CanmetENERGY/NRCan authors) · verified.
- **2.25 m · spacing between adjacent boreholes; field diameter 35 m (Drake Landing).** — Mudasar et al. 2020, pp. 1–2 (URL above) · conference paper · verified. (One page also gives the field depth as 37 m.)
- **≈ 960 m² · Drake Landing BTES footprint** (π × 35²/4); **≈ 6.7 m²/borehole**. · **derived**.
- **55 m deep, 3 m spacing, 240 boreholes, 69 m × 27 m footprint (1,863 m²) · data-centre-fed BTES design** (≈ 7.8 m²/borehole, derived). — Li et al. 2021, Table C.2 · peer-reviewed · verified.
- **6 m · minimum spacing for in-line boreholes in the extraction tables.** — MCS 022 (2011), p. 4 · standard · verified.
- **6 m · spacing "recommended by ASHRAE", which the authors found "is not always sufficient" to prevent thermal interaction over 20 years; 2×8 layouts outperform 4×4.** — Law & Dworkin, *Applied Energy* 179 (2016) 1032–1047, doi:10.1016/j.apenergy.2016.07.048, abstract, https://ideas.repec.org/a/eee/appene/v179y2016icp1032-1047.html · peer-reviewed (abstract only) · verified for the abstract. The ASHRAE text itself is UNVERIFIED.
- **139 m (455 ft) deep; 9 boreholes, 3 parallel sets of 3 in series · data-centre borefield, Ithaca.** — Zurmuhl et al. 2018, p. 2 · national lab · verified.
- **≈ 152 m (500 ft) · borehole depth; 6,100 wells in 4 borefields plus 2 lake heat exchangers; data centre "cooling support load" 3.5 MW; data-centre heat rejected to the ground.** — US DOE, *Geothermal Heat Pump Case Study: Epic Systems Corporation*, DOE/GO-102025-6433, May 2026, https://www.energy.gov/sites/default/files/2026-07/geo-case-study-5-epic-revision-fy26-db-v1-w150.pdf · government (campus size and "one of the largest" are **operator claims**) · verified. No borefield area, capacity, cost or ground-temperature data.
- **36 m²/borehole · land per borehole on a 6 m square grid.** · **derived** (6 × 6). Spacing is a design choice and must be checked by simulation.

### 1.3 Ground thermal conductivity and ground temperature

**Edmonton** (Hastings Lake test site, about 40 km east of Edmonton; the closest published thermal testing found)
- **1.8–3.2 W/m·K (mean 2.4, n = 7) · lab conductivity of saturated drift silt;** sand 2.5 (n = 1); clay 2.2 (n = 1). — Grobe, Richardson, Johnston, Quibell, Schillereff, Tsang, *Importance of Geoscience Information in the Implementation of Closed-Loop Ground-Source Heat-Pump Systems (Geoexchange) in Alberta*, ERCB/AGS Open File Report 2009-09, 2009, Table 5 p. 17, https://static.ags.aer.ca/files/document/OFR/OFR_2009_09.pdf · government (AGS) · verified.
- **Horseshoe Canyon Fm (Edmonton bedrock) lab values · sandstone 2.1 (1.8–2.7), siltstone 2.3, shale 2.0 (1.5–2.4), bentonite 2.0, coal 0.7 (0.6–1.0) W/m·K.** — same, Table 5 p. 17 · verified.
- **In situ formation thermal conductivity tests · 2.01 / 1.81 W/m·K (shallow, mostly drift) and 1.74 / 1.59 W/m·K (drift plus bedrock to ~123 m).** Design value adopted: **1.90 W/m·K.** — same, Table 4 p. 14; p. 23 · verified.
- **No values for glacial till specifically;** the report notes the 2007 surficial samples could not be measured reliably (pp. 16–17). · gap.
- **6.1 °C · undisturbed ground temperature 0–25 m** (6.8 °C mean in the deeper hole; 7.5 °C at 122.8 m). Tofield 1971–2000 mean air temperature 3.1 °C. — same, pp. 11, 14 · verified.
- **4.44 °C · undisturbed ground temperature used for Edmonton** in a 2025 Canadian simulation study (ground k assumed 1.25 W/m·K for all cities). — Mahmoudi Majdabadi & Koohi-Fayegh, *Techno-Economic Assessment of Dual-Source Heat Pump Systems…*, CSME-CFDSC-CSR 2025, Table 1, https://espace2.etsmtl.ca/id/eprint/32452/1/561%20-%20Techno-economic%20assessment%20of%20dual.pdf · conference paper · verified (the value comes from that paper's ref. [16]).
- **3.2 °C · annual mean of the 4 m ground temperatures in the Edmonton CWEC EPW** (monthly −2.91 to +9.38 °C). — `effbc917-CAN_AB_EDMONTON-INTL-A_3012216_CWEC.epw`, line 4 (in project) · government weather file · **derived**. Caveat: EPW ground temperatures are computed from air temperature, not measured. They sit about 3 K below the AGS measurement, so use the AGS value.

**Vancouver**
- **No published ground thermal conductivity or thermal response test for Vancouver (Fraser delta sediments, glacial till) was found.** · gap. A UBC cIRcle thesis record that may be relevant was blocked (see section 9).
- **Generic ranges (W/m·K) · water-saturated sand 2.4, water-saturated clay/silt 1.7, dry sand 0.4, dry clay/silt 0.5, claystone/siltstone 2.2, sandstone 2.3, granite 3.4.** — MCS 022 (2011), conductivity reference figure · standard · **UNVERIFIED** (the value-to-label pairing was inferred from a scrambled layout).
- **10.5 °C · annual mean of the 4 m ground temperatures in the Vancouver CWEC EPW** (monthly 7.26–13.84 °C). — `51376785-CAN_BC_VANCOUVER-INTL-A_1108395_CWEC.epw`, line 4 (in project) · **derived**. Same caveat as above.

### 1.4 Thermal imbalance (a data centre only rejects heat)

- **+4.7 K over 20 years · rise in maximum heat-pump inlet temperature** (21.8 → 26.5 °C) for a ground-only data-centre system; **+1.2 K with a hybrid dry cooler. Cooling capacity loss after 20 years: 4.1 % (ground only) vs 1.1 % (hybrid) at Ithaca; 8–10 % vs 4.7–5.7 % at Dallas, Sacramento and Minneapolis.** — Zurmuhl et al. 2018, pp. 6, 9 · national lab · verified.
- **≈ 3 K in 3 years · ground temperature rise at an internal borehole** of a 70-borehole field where heat rejected was 4.8 × heat extracted. — Kindaichi & Nishina, *Renewable Energy* 127 (2018) 182–194, doi:10.1016/j.renene.2018.04.065, abstract, https://ideas.repec.org/a/eee/renene/v127y2018icp182-194.html · peer-reviewed (abstract) · verified.
- **Linear relation · the rise in fluid temperature is proportional to cumulative net heat injected;** heat accumulates at the array centre. — Chen et al., *Energy and Buildings* 231 (2021) 110518, doi:10.1016/j.enbuild.2020.110518, abstract, https://fis.tu-dresden.de/portal/en/publications/longterm-thermal-imbalance-in-large-borehole-heat-exchangers-array--a-numerical-study-based-on-the-leicester-project(ad80f2eb-6c70-4096-a8e5-f5a549b7c5ac).html · peer-reviewed (abstract) · verified. No numbers in the abstract.
- **Interpretation for the tool (my reasoning, not a source):** a borefield that only receives heat keeps warming. It works long term only if (a) a hybrid dry cooler takes the peaks or the base, or (b) winter extraction by neighbours (BTES/district heating) rebalances the annual net heat. The tool should treat "borefield as sole sink for a data centre" as non-steady and show the warming.

### 1.5 BTES (seasonal storage) performance

- **Apparent BTES efficiency by year, Drake Landing (Okotoks AB), measured · 0.06, 0.21, 0.35, 0.54, 0.36, 0.51, 0.56, 0.42, 0.32, 0.54 (2007-08 to 2016-17).** Simulated steady state **0.45** from year 8; 50-year simulations show "very little change beyond the 10th year". Definition: apparent efficiency, ignoring year-to-year change in stored energy. — Mesquita et al. 2017, Tables 1–2, Sec. 3.1 · conference paper (NRCan authors) · verified. (This pass re-opened the source and confirms the Hunt 5 entry.)
- **2,260–2,710 GJ/yr (≈ 0.63–0.75 GWh) · heat injected into the BTES, measured.** — same, Table 2 · verified (GJ → MWh ÷ 3.6, derived).
- **Solar fraction 0.55 (yr 1) → 0.93–1.00 (yrs 5–10); last-5-year average 0.96.** — same, Table 2, Sec. 3.2 · verified.
- **97 % · solar fraction in the fifth year;** 144 boreholes; ≈ 34,000 m³ of earth; 52 homes; 2,293 m² of collectors; 240 m³ short-term store. — Sibbitt, McClenahan, Djebbar, Thornton, Wong, Carriere, Kokko, *The Performance of a High Solar Fraction Seasonal Storage District Heating System – Five Years of Operation*, NRCan/CanmetENERGY, 2012, https://natural-resources.canada.ca/maps-tools-publications/publications/performance-high-solar-fraction-seasonal-storage-district-heating-system-five-years-operation · government · verified (landing page; full text via Energy Procedia, not opened).
- **Storage temperature ≈ 40 °C at the start and ≈ 80 °C at the end of summer** (Drake Landing). — Mudasar et al. 2020, p. 1 · conference paper · verified.
- **Pump electricity 51–54 GJ/yr (yrs 1–8) rising to 79 GJ (yr 9) and 109 GJ (yr 11),** linked to corrosion products and reduced BTES flow. — Wong & Mesquita, *Drake Landing Solar Community: Financial Summary and Lessons Learned*, ISES SWC 2019, Table 1, Sec. 4.3, https://proceedings.ises.org/conference/swc2019/papers/swc2019-0049-Wong.pdf · conference paper · verified.
- **Data-centre BTES (Norway campus, ~0.9 MW of steady data-centre heat; 3.4 GWh in the non-heating season, 4.7 GWh in the heating season):** with BTES, waste-heat utilization rises from **77 % to 96 %**; annual CO₂ falls **8 %**; energy bill falls **6 %**; heat-pump electricity rises **≈ 0.9 GWh/yr (+30 % total electricity)**; payback **17 years** at 100 % storage efficiency, plus 2–4 years per 10 % efficiency lost, up to about 30 years at 50 %. — Li et al. 2021, Secs. 2, 4.2–4.4, 5 · peer-reviewed · verified. Note: storage efficiency is *assumed* (100 % base case), not measured.

---

## 2. Cost

- **$59/m CAD (2025) · borehole installation cost including drilling, loop and grout** (single residential-scale borehole). The paper takes it from a quote by an Alberta driller (Lethbridge, Feb 2025). — Mahmoudi Majdabadi & Koohi-Fayegh 2025, Table 2, ref. [17] · conference paper citing a contractor quote · verified that the paper states it; **treat as an operator/vendor figure, UNVERIFIED for commercial scale.**
- **US$42.62–52.59/m (2018) · drilling cost** used for Minneapolis, Sacramento, Dallas and Ithaca data-centre borefields. — Zurmuhl et al. 2018, Table 3 p. 5; Table 12 p. 9 · national lab · verified.
- **US$5.0–15.5/ft (≈ US$16–51/m) · drilling cost by formation** (< $10/ft in drift, shale, sandstone, limestone; > $15/ft in granite). **US$1,600–4,250 per cooling ton (average US$2,350/ton) · installed vertical-bore ground heat exchanger cost** (industry survey). — Liu, Polsky, Qian, Mcdonald (ORNL), *An Analysis on Cost Reduction Potential of Vertical Bore Ground Heat Exchangers…*, Stanford Geothermal Workshop 2019, SGP-TR-214, p. 2, https://pangea.stanford.edu/ERE/pdf/IGAstandard/SGW/2019/Liu1.pdf · national lab · verified. Per kW: US$2,350 ÷ 3.517 kW = **≈ US$668/kWth** (derived).
- **$880,000 CAD (2007) · Drake Landing "thermal energy storage system" line;** total project $7.146 M (base) or $7.66 M (with extras). — Wong & Mesquita 2019, Table 2 · conference paper · verified. **≈ $175/m (2007 CAD)**, derived as 880,000 ÷ 5,040 m. This includes everything on that line (headers, insulation, etc.), so it is not a drilling rate.
- **Capital cost, data-centre borefield (Ithaca, 14.5 kW):** ground-source heat pump US$147k; ground-source plus dry cooler US$154k; air-source US$82k. 20-year TCO: optimized ground-source is 12 % above air-source, ground-source plus dry cooler 18 % above. — Zurmuhl et al. 2018, Table 5 p. 6, p. 11 · national lab · verified.
- **≈ €300/kW · ATES capital cost for a 2 MW system.** — Barth, Schefel, Blum, Menberg, "Potential of aquifer thermal energy storage (ATES) for data centres in Germany", *Geothermal Energy* 14:11 (2026), doi:10.1186/s40517-026-00383-8, Methods, https://publikationen.bibliothek.kit.edu/1000192638/179927510 · peer-reviewed (open access) · verified.
- **ATES capital ≈ €0.2 M (small) to €2 M (large); payback 2–10 years.** — Fleuchaus, Godschalk, Stober, Blum, "Worldwide application of aquifer thermal energy storage – A review", *Renew. Sust. Energy Rev.* 94 (2018) 861–876, doi:10.1016/j.rser.2018.06.057 (read as reproduced in a KIT dissertation, Ch. 2, abstract, Sec. 2.2.2), https://publikationen.bibliothek.kit.edu/1000120042/77340903 · peer-reviewed · verified (DOI typography to confirm).
- **$4.7–8 M per borehole · deep geothermal well, 2–3 km (Alberta).** — Majorowicz & Grasby, "Deep Geothermal Heating Potential for the Communities of the Western Canadian Sedimentary Basin", *Energies* 14(3) (2021) 706, doi:10.3390/en14030706, Sec. 8, https://www.mdpi.com/1996-1073/14/3/706 · peer-reviewed · verified (currency and year basis not stated in the extract).

---

## 3. Rules — closed-loop geoexchange

### British Columbia
- **"Closed-loop geoexchange well" is its own well class:** "a well, other than an open-loop geoexchange well, used or intended to be used for the purpose of heat exchange… in which there is no transfer of water between an aquifer and the well". — *Groundwater Protection Regulation*, B.C. Reg. 39/2016, s. 1(1), s. 5(1)(h); consolidation current to 29 Nov 2022, https://free.bcpublications.ca/civix/document/id/complete/statreg/39_2016 (also https://faolex.fao.org/docs/pdf/bc164030.pdf) · regulation · verified.
- **Who may drill · only a registered geoexchange driller** (Certificate of Qualification as a Geoexchange Driller). — same, ss. 8(2)(b)(ii), 9(1), 14(1)(b) · verified.
- **Sealing · seal "along the entire length of the ground loop, from the bottom upward"** promptly after installing the loop. — same, s. 25(1); s. 22(3)(c)(iii) · verified.
- **Exempt · horizontal closed-loop wells less than 5 m deep** (s. 4(1)(c); Part 8 on artesian flow still applies). — same · verified.
- **Reporting · no identification plate; a construction report and a decommission report are required: "One well construction report per geoexchange system to the comptroller and a report for every well in that system to the well owner"; due within 90 days of drilling.** — same, Schedule 6; ss. 76–79 · verified.
- **Decommissioning · remove circulation fluids from the ground loops.** — same, s. 71(6) · verified.
- **Setbacks · none specific to closed-loop geoexchange wells found in the GPR.** The s. 18(1) 15 m setback applies to water supply wells, which includes open-loop wells. — same · verified (absence) / gap.
- **No water licence is needed for closed loop** (there is no diversion). · **UNVERIFIED as an explicit statement.** It follows from the definition, but no government text saying so was found.
- **Vancouver Building By-law 2025, Book II (Plumbing), Div. B, Art. 2.2.11.5 "Geoexchange Systems":** (1) closed-loop make-up water from a feeder tank isolated from domestic supply; (2) direct domestic connection prohibited; (3) "Methanol shall not be used for geoexchange (geothermal) applications"; (4) no open loop for residential-only buildings with ≤ 8 principal dwelling units; (5) "An open loop geoexchange (geothermal) system shall not discharge into the sewer." — *VBBL 2025 Book II Insert Pages*, By-law 14343 (eff. 15 Sep 2025), as amended by By-law 14488 (eff. 1 Jan 2026), p. 21, https://vancouver.ca/files/cov/2025-vbbl-book-II-insert-pages.pdf · by-law (convenience copy) · verified.
- **City of Vancouver Bulletin 2016-004-BU · risk of artesian conditions when drilling "for… installing a geoexchange system"; points to the WSA/GPR and to compliance with municipal by-laws. No permit procedure.** — City of Vancouver, Office of the Chief Building Official, 30 Mar 2016, https://vancouver.ca/files/cov/bulleting-2016-004-bu.pdf · municipal · verified.
- **No Vancouver rule on boreholes under streets, parks or City land was found.** · gap.

### Alberta
- **Scope · the Directive covers water wells, open-loop GSHE wells, and vertical closed-loop GSHE wells "completed at depths above the base of groundwater protection"; it does not cover horizontal or submerged closed loops.** — *Water Wells and Ground Source Heat Exchange Systems Directive*, AEP Water Quality 2018 No. 3, eff. 11 Dec 2018, s. 1.1, p. 3 (in project: `AB_Directive_Water_Wells_GSHE_2018.pdf`) · regulation (directive) · verified.
- **Class F approval to drill vertical closed loops, required from 1 Jan 2020; approvals expire after 1 year.** — same, s. 2.1.1(2), Table 1, s. 2.1.3, pp. 5–6 · verified.
- **Setbacks for vertical closed-loop GSHE wells (Table 4) · buried electrical/gas 1 m; existing or planned building/structure 1 m; property line 3 m; buried water 3 m; gravity sewer lateral 3 m; pressurized sewer lateral 6 m; water well 15 m; septic tank 15 m; leaching field 30 m; spring 30 m.** — same, s. 4.2.5, p. 19 · verified.
- **Full-length tremie grouting within 24 h of loop placement; grout and materials to CSA C448 Series-16; potable water only; loop pressure test ≥ 100 psi for ≥ 1 h.** — same, ss. 4.2.6–4.2.7, pp. 19–21 · verified.
- **Header · supply and return ≥ 0.5 m apart; insulate where < 3.0 m from other fluid services; R2 insulation within 1.5 m of walls/pipes; tracer wire or tape.** — same, s. 4.2.8, p. 21 · verified.
- **Antifreeze must be non-toxic, food grade, if any borehole is within 50 m of a municipal-licensed water well.** — same, s. 4.2.10, p. 22 · verified.
- **Drilling reports for commercial systems · every well if < 20 wells; if ≥ 20, one representative report per 20 wells (wells ÷ 20, rounded up), plus TRT wells and wells that hit saline water, artesian flow or gas; due within 60 days.** — same, s. 4.4.2, p. 24 · verified.
- **No Water Act authorization for the owner of a vertical closed loop completed above the base of groundwater protection; horizontal closed loops above the water table also exempt; driller needs Class F; below the base of groundwater protection → AER under the Geothermal Resource Development Act.** — *Ground Source Heat Exchange Systems in Alberta, Fact Sheet*, Alberta Environment and Protected Areas, 8 Oct 2025, pp. 1–2 (in project: `2ff25381-epa-…-2025-10-08.pdf`) · government · verified.
  - The superseded 18 Oct 2024 edition (in project: `d333b7ed-…-2024-10.pdf`, watermarked out of date) said "Drilling boreholes deeper than 150 metres is regulated by the Alberta Energy Regulator". The 2025 edition replaced this with the base-of-groundwater-protection test. · verified (both read).
- **Base of groundwater protection = base of non-saline groundwater (TDS ≤ 4,000 mg/L); default and maximum 600 m; query tool https://dds.aer.ca/BGP/UI/BGP-Main.aspx.** — AER, *Base of Groundwater Protection FAQs*, Apr 2016, https://static.aer.ca/prd/documents/dds/BGWP_FAQs.pdf · government · verified. The value at an Edmonton site is not retrieved: **for J.B. to run** in the BGP tool.
- **Edmonton municipal permit for geoexchange · the City's heating/ventilation permit page says only "Find application information for GeoExchange systems on Renewable Energy Systems".** — https://edmonton.ca/residential_neighbourhoods/heating-ventilation-permit · municipal · verified (pointer only). The target page https://www.edmonton.ca/residential_neighbourhoods/renewable-energy-systems.aspx was **blocked (robots)**.
- **Comparator (Calgary, undated checklist) · mechanical permit; development permit only if the Land Use Bylaw is not met; Alberta Environment letter for regulated open loop; ERCB licence for bores > 150 m; pipe marked CSA C448.** — https://www.calgary.ca/PDA/pd/Documents/carls/building-permit/geoexchange_project.pdf · municipal · verified, but **outdated** (it refers to the ERCB, which became the AER in 2013) and **not Edmonton**.

---

## 4. Rules and parameters — open loop and ATES

### British Columbia
- **Water licence required:** Water Sustainability Regulation (B.C. Reg. 36/2016) Sch. A, item 9 "Heat exchange — … extract or dissipate heat by passing water through an open loop system"; item 4 "Cooling". — Hunt 5 · regulation · verified 6 Oct 2026 (not re-opened).
- **"all users of groundwater for non-domestic purposes need a licence under the Water Sustainability Act"; application fee "minimum $250"; annual rentals by purpose and quantity; no processing time stated.** — BC Gov, *New requirements for groundwater users*, https://www2.gov.bc.ca/gov/content/environment/air-land-water/water/water-licensing-rights/water-licences-approvals/new-requirements-for-groundwater-users · government · verified.
- **Open-loop geoexchange wells are water supply wells under the GPR → 15 m setback from existing water supply wells (s. 18(1)).** — GPR B.C. Reg. 39/2016, s. 1, s. 18(1) · regulation · verified (the open-loop-to-supply-well reading comes from the definitions).
- **Vancouver · no sewer discharge from open loop; no open loop for small residential buildings.** — VBBL 2025 Art. 2.2.11.5(4)–(5) (above) · verified.
- **No BC reinjection temperature limit was found.** · gap.

### Alberta
- **Open loop needs a Water Act authorization before construction:** an **approval** if there is no water loss and withdrawal and return are in the same water body; a **licence** if they are in different water bodies or water is lost. A technical report by an APEGA groundwater practitioner must assess aquifer capability, effects on groundwater quantity, temperature and quality, and effects on other users. The water may not be used for another purpose; temporary discharges need the director's authorization. — *Guide to Groundwater Authorization*, Alberta EPA, 3 Feb 2023, ISBN 978-1-4601-5611-7, Sec. 6.2, PDF p. 17 (in project: `AB_Guide_to_Groundwater_Authorization_2023.pdf`) · government · verified. (This closes the Hunt 5 gap on open-loop/ATES licensing.)
- **Wells for open loop must be drilled by a certified journeyman water well driller with a Class A approval; applications go through DRAS.** — AB Fact Sheet 2025, p. 1 · verified.
- **No Alberta reinjection temperature limit was found.** · gap.

### ATES parameters (international, peer-reviewed)
- **> 2,800 ATES systems worldwide, ≈ 2,500 in the Netherlands; Canada had 4 (incl. Carleton University; Agassiz research centre: 60 m deep, 5 wells, 40 m³/h, 0.563 MW).** — Fleuchaus et al. 2018, abstract, Sec. 2.3, Tables 2.2, 2.4 · peer-reviewed · verified.
- **Capacity 0.1–0.3 MW (small) to 5–30 MW (large); pumping < 40 m³/h (small), 40–150 (medium), > 150 m³/h (large); depths mostly 20–260 m; examples: Eindhoven 3,000 m³/h, 20 MW, 36 wells; Arlanda 720 m³/h, 10 MW, 11 wells.** — same, Sec. 2.2.2, Fig. 2.4, Table 2.4 · verified (column alignment of Table 2.4 flagged as uncertain in the extract).
- **Injection temperature limits · most countries 15–25 °C; Netherlands recommendation 25 °C max.** — same (dissertation Sec. 1.2 and review Sec. 2.4.2) · verified. **Typical allowed ATES injection 5–20 °C; Berlin ±3 K relative to groundwater.** — Barth et al. 2026, Limitations · peer-reviewed · verified.
- **Recovery efficiency · up to 90 % (direct cooling), 40–85 % (indirect); 60 % assumed with groundwater flow < 0.5 m/day.** — Fleuchaus et al. 2018, Sec. 2.2.2; Barth et al. 2026, Methods · verified.
- **Data-centre waste heat: liquid-cooled ≈ 50–60 °C, air-cooled ≈ 15–35 °C. Air-cooled waste heat is therefore near or above typical injection limits, and liquid-cooled heat is well above them.** — Barth et al. 2026, Introduction · verified (the comparison is mine).
- **Well yield needed (my physics, not a source):** P = ρ·c·Q·ΔT. With ρc ≈ 4.18 MJ/m³·K, 1 MWth at ΔT = 5 K needs **≈ 172 m³/h ≈ 48 L/s** (derived). No Vancouver or Edmonton aquifer yield data was retrieved: gap.

---

## 5. Deep geothermal

### Alberta / Edmonton
- **Geothermal Resource Development Act, SA 2020 c G-5.5, in force 8 Dec 2021: "geothermal resource" means "the natural heat from the earth that is below the base of groundwater protection" (no temperature threshold); s. 7(1): no well or facility without an AER licence.** — FAOLEX copy, https://faolex.fao.org/docs/pdf/al218826.pdf · statute · verified (currency of the copy not stated; confirm against King's Printer).
- **AER Directive 089, Geothermal Resource Development, released and effective 7 Feb 2025 (replaces 15 Aug 2022).** Key items: surface access consent and subsurface rights before the well licence; liability estimates; risk assessment for critically stressed faults within 3 km; where seismicity is a risk, a seismometer network detecting ML 2.0 within 10 km and a traffic-light protocol; contamination risk assessment if a receptor lies within 1 km; thermal cement above 110 °C; monthly wellhead temperatures and heat sold (kJ) reported; open-loop subsurface setback from the lease boundary proposed by the applicant; surface setbacks per Directive 056. — https://static.aer.ca/prd/documents/directives/Directive-089.pdf ; https://www.aer.ca/node/3286 · regulation · verified.
- **Edmonton · 90 °C formation temperature (Middle Cambrian basal sandstones) at 2.5 km drill depth; 66,110–176,293 GJ/yr direct heat at 30–80 kg/s (outflow 60 °C); 401–1,356 households; 0.5–0.8 MWel.** — Majorowicz & Grasby 2021, Appendix C, Table A1 · peer-reviewed · verified. **≈ 2.1–5.6 MWth average** (GJ/yr ÷ 31.536 × 10⁶ s, derived). Nearby: Devon 99.9 °C at 2.7 km.
- **Most probable flow 30–80 kg/s; direct heating most promising in deeper central and western Alberta where aquifers are > 70 °C and > 30 kg/s; power generally needs > 120 °C and is limited to Hinton–Edson–Grande Prairie.** — same, Secs. 5, 8 · verified.
- **Fluid temperatures under Edmonton and Calgary 80–90 °C, enough for district heating; WCSB average gradient 33.2 °C/km (range 20–55); heat flow 60.4 mW/m² average; Leduc 67 and Redwater 61 mW/m² (75 and 68 after paleoclimate correction).** — Weides & Majorowicz, *Energies* 7(4) (2014) 2573–2594, doi:10.3390/en7042573, Secs. 2.1, 4.1, 5.2, 6, https://www.mdpi.com/1996-1073/7/4/2573 · peer-reviewed · verified.
- **Edmonton named a potential geothermal target at abandoned mine sites; sedimentary basin gradients typically 25–40 °C/km.** — Grasby et al., *Geothermal Energy Resource Potential of Canada*, GSC Open File 6914 (rev.), 2012, doi:10.4095/291488, pp. XIII, 35, https://download-telecharger.services.geo.ca/pub/nrcan_rncan/publications/STPublications_PublicationsST/291/291488/gid_291488.pdf · government · verified (partial read; the text was truncated).

### British Columbia / Vancouver
- **Geothermal Resources Act, RSBC 1996 c 171, s. 1: "geothermal resource" excludes "(a) water that has a temperature less than 80°C at the point where it reaches the surface"; s. 2: vested in the government; production needs a lease, a production plan and a well authorization (s. 4).** Current to 6 Oct 2026. — https://free.bcpublications.ca/civix/document/id/complete/statreg/96171_01 · statute · verified.
- **BCER issues GRA authorizations where water from exploration is ≥ 80 °C; the Ministry handles tenure.** — BC Energy Regulator, *Geothermal Energy in B.C.* fact sheet, Nov 2023, https://www.bc-er.ca/files/publications/Factsheets/Geothermal-Energy-in-B.C.pdf · government · verified.
- **Direct-use resources < 80 °C fall under Crown land tenure, not the geothermal law; the 18 BC sites ranked in the study include no Lower Mainland site (Mount Garibaldi "moderate", 2.87).** — Hickson et al., *Direct-Use of Geothermal Resources in British Columbia*, Geoscience BC Report 2016-07, Section A, pp. 12, 14–15, 23, 32, https://cdn.geosciencebc.com/project_data/GBCReport2016-07/GBC%20Report2016-07_SectionA_Summary.pdf · government-funded report · verified.
- **Heat flow 44 mW/m² west of the Coast Plutonic Complex; 50–60 within it; 80–90 east of it.** — Lewis, Judge, Souther, "Possible geothermal resources in the Coast Plutonic Complex of southern British Columbia", *Pure Appl. Geophys.* 117 (1978) 172–179, doi:10.1007/BF00879744, abstract, https://link.springer.com/content/pdf/10.1007%2FBF00879744.pdf · peer-reviewed · verified. That "west of the CPC" covers the Vancouver area is **UNVERIFIED** (the abstract does not name the city).
- **Implied gradient ≈ 22 °C/km; ≈ 75 °C at 3 km** (q/k with k ≈ 2 W/m·K, surface ≈ 10 °C). · **derived and UNVERIFIED.** On this basis, deep geothermal for power is not plausible in Vancouver. Low-temperature direct use (< 80 °C, outside the GRA) is not ruled out, but no Vancouver-specific data was found.

---

## 6. Documented data-centre use of ground or aquifers

- **Epic Systems, Verona WI · data centre (3.5 MW cooling support load) rejects heat to campus borefields (6,100 wells, ≈ 152 m) and lakes.** — US DOE 2026 (above) · government case study; scale claims are **operator claims**.
- **Ithaca NY telecom data centre, 14.5 kWth, measured hybrid ground-source system.** — Zurmuhl et al. 2018 · national lab · verified.
- **"Bonner Bogen", Bonn · data centre, hotel and office linked through ATES.** — cited in Barth et al. 2026 (refs. Bundesverband Geothermie 2022; Fleuchaus et al. 2021; Stemmle et al. 2021) · secondary citation · UNVERIFIED (primary not opened).
- **ATES used only for data-centre cooling can cut cooling-system energy by > 20 %** (Drenkelfort et al. 2015, as cited). — Barth et al. 2026 · secondary · UNVERIFIED (primary not opened).
- **Germany: 19 data centres, 461 MW installed cooling, 1,740 GWh_th/yr waste heat; ATES could supply 1,044 GWh_th/yr at 60 % recovery (819 GWh_th in Frankfurt, ≈ 20 % of the city's heat demand).** — Barth et al. 2026, Results · peer-reviewed · verified. (Internal inconsistency: 743 vs 707 GWh_th for 13 data centres.)
- **Telecity Amsterdam groundwater cooling.** Found only in trade press (silicon.co.uk, datacenterdynamics.com), so it is not citable. · UNVERIFIED. Needs an operator or permit source.
- **Toronto · a 4 MW cooling-load data centre sharing heat with MURBs (110,000 m² optimum) cut MURB heating emissions 57 %.** Borefield size not in the abstract. — Murphy, MASc thesis, Ryerson University, 2018, https://rshare.library.torontomu.ca/articles/thesis/Techno-economic_study_of_an_energy_sharing_network_comprised_of_a_data_centre_and_MURBs_for_cold_climate/14663817/1 · thesis (not peer-reviewed) · verified for the abstract.

---

## 7. Effects on other rows when a ground add-on is added (what the sources support)

| Row | Closed-loop sink | BTES (store for winter) | Open loop / ATES | Deep geothermal (Edmonton) |
|---|---|---|---|---|
| Heat to ground (MWh/yr) | = heat routed × hours; net accumulates (1.4) | summer charge, e.g. 0.63–0.75 GWh/yr at Drake; 3.4 GWh at Li et al. | limited by ΔT, flow and injection-temperature cap (15–25 °C) | n/a (source, not a sink) |
| Winter heat out | small, and only if neighbours extract | η × charge, with η 0.3–0.56 measured (Drake) | recovery 40–85 % | 2.1–5.6 MWth avg per doublet at 90 °C |
| Electricity | circulation pumps; HP COP ≈ 2.7–3.0 for cooling (Zurmuhl Table 10) | HP to lift for DH: +0.9 GWh/yr (+30 %) in Li et al. | well pumps (not found) | pumps (not found) |
| Land | 36 m²/borehole at 6 m spacing; 52–86 m bore per kW | 6.7–7.8 m²/borehole at 2.25–3 m; ≈ 1,900 m² for 0.9 MW (Li) | well pairs plus doublet spacing (not found) | well pad; lease separate from O&G (D089) |
| Where | under parking or parks: allowed in AB if 1 m from structures and 3 m from property lines; no BC setback found; City land rules not found | same; topsoil insulation layer (Drake) | BC licence; AB approval or licence | AER licence; below BGWP |
| Cost | CAD $59/m (AB quote, 2025); US$43–53/m drilling (2018) | Drake TES line $880k (2007) | ≈ €300/kW (2 MW) | $4.7–8 M per well |
| Approval and time | AB: Class F driller only; BC: geoexchange driller plus report within 90 d | same | BC: WSA licence (time not published); AB: approval or licence plus APEGA report | AER D089; seismicity monitoring |
| Ground ΔT long term | +4.7 K / 20 yr (ground only), +1.2 K (hybrid); ≈ +3 K / 3 yr at 4.8:1 imbalance | intended to rise (stores 40–80 °C at Drake) | thermal plume (not quantified) | n/a |

---

## 8. Proposed tool quantities

All coefficients are defaults with a range. The tool should label borefield sizing "screening only — requires TRT and simulation (CSA C448)".

**(a) Closed-loop borefield as data-centre heat sink**
- `P_g` (kW) = share of heat rejection sent to ground (user input, 0–1) × `P_IT` × (1 + 1/COP_cool), where COP_cool = 2.7–3.0 if a heat pump or chiller sits between servers and loop (Zurmuhl Table 10); use 1.0 + pump share if free-cooling direct to loop (pump share not found, UNVERIFIED).
- `L` (m) = `P_g` × 1000 / `q_rej`, where `q_rej` = 12 W/m (low) / 19 W/m (with hybrid dry cooler) [Zurmuhl 2018, derived; Ithaca k = 3.27 W/m·K]. Scale by k_site / 3.27 as a first-order adjustment (**my assumption, UNVERIFIED**): Edmonton k ≈ 1.9 → about 7–11 W/m.
- `N` = `L` / `H`, with `H` = 150 m (Epic ≈ 152 m; Zurmuhl 139 m; AB fact sheet 2024 cited 150 m as the old AER trigger).
- `A` (m²) = `N` × `s²`, with `s` = 6 m.
- `Cost` (CAD) = `L` × $59/m (low, AB quote 2025) to `L` × ~$175/m (Drake TES line, 2007 CAD; high, includes headers). Flag the low value as a vendor quote.
- `ΔT_20yr` (K) = +4.7 (ground only) / +1.2 (hybrid) [Zurmuhl; small field only, not scalable to MW].
- Worked example (derived): 1 MW to ground at 12 W/m → 83,000 m → 555 boreholes × 150 m → ≈ 20,000 m² (2 ha) per MW. A 40 MW site would need ≈ 0.8 km². The tool should show this scale outright.

**(b) BTES seasonal store charged by the data centre**
- `Q_in` (MWh/yr) = `P_charge` × `h_charge` (charge season hours, e.g. non-heating months from CWEC).
- `Q_out` (MWh/yr) = `η_BTES` × `Q_in`, with `η_BTES` = 0.45 (steady-state simulated, Drake), range 0.32–0.56 (measured yrs 3–10), 0.06–0.21 in years 1–2.
- `L` = `P_charge` × 1000 / `q_ch`, with `q_ch` = 47 W/m (Drake) to 83 W/m (Li et al. design).
- `N` = `L` / `H`, with `H` = 35–55 m; `A` = `N` × `s²`, with `s` = 2.25–3 m (≈ 6.7–7.8 m²/borehole as built).
- `E_HP` (MWh/yr) ≈ `Q_out` / (COP_HP − 1) for lifting to DH temperature (COP not given in sources: **UNVERIFIED**). Li et al. report +0.9 GWh/yr for a 0.9 MW data centre.
- Payback ≈ 17 years at η = 1, +2–4 years per −10 % η (Li et al.).

**(c) Open loop / ATES**
- `Q_w` (m³/h) = `P` (kW) × 3.6 / (4.18 × `ΔT`), with `ΔT` = 5 K default (my assumption) → 172 m³/h per MW.
- Cap: `T_inj` ≤ 25 °C (NL); flag "exceeds typical limits" if data-centre return water is > 25 °C.
- `Q_out` = 0.6 × `Q_in` (Barth default; range 0.4–0.85).
- `Cost` ≈ €300/kW (2 MW).
- Approval flags: BC WSA licence (Sch. A item 9); AB Water Act approval or licence plus APEGA report.

**(d) Deep geothermal (Edmonton only)**
- `P_th` (MW) = ṁ × c × (T_res − T_out) = (30–80 kg/s) × 3.993 kJ/kg·K × (90 − 60) K = **3.6–9.6 MWth peak** (derived from Majorowicz & Grasby inputs). The paper's annual figures give 2.1–5.6 MWth average.
- `Cost` = $4.7–8 M per well (doublet ≈ 2 wells, my assumption).
- Approval: AER licence (D089), seismic monitoring.
- Not a heat sink for the data centre: it competes with data-centre waste heat as a district-heat source.
- **Vancouver: set to "not plausible for power; direct use unproven".**

---

## 9. Gaps
1. No rejection-mode W/m for continuous (8,760 h) loads from a standard. MCS 022 cell values are unreadable. VDI 4640, CSA C448 and the ASHRAE geothermal chapter were not accessible.
2. No Vancouver ground thermal conductivity or TRT data. No measured glacial-till value for Edmonton.
3. No BC or AB reinjection-temperature limit for open loop. No aquifer yields near either site (GWELLS / AWWID queries not run).
4. No Vancouver rules on boreholes under City streets or parks, and no Edmonton municipal geoexchange permit text (page blocked).
5. Approval durations: no published processing times for BC WSA licences, AB Water Act approvals, or AER D089 licences.
6. Pump electricity per MW of borefield or ATES flow not found (Drake gives 51–109 GJ/yr total for 52 homes).
7. Large-borefield (MW-scale) data-centre case with measured ground temperatures not found. The Epic case gives no ground data.
8. Vancouver deep temperatures: only regional heat flow (1978), so the gradient is derived.
9. Base of groundwater protection depth at the Edmonton sites not retrieved (BGP tool).

## 10. For J.B. to retrieve
- MCS 022 / MIS 3005 look-up tables, pp. 5–9 (1,800 and 2,400 h; read cells for k = 2.0 and 2.5 W/m·K, 6 and 10 °C): https://mail.gshp.org.uk/pdf/MIS_3005_Ground_loop_sizing_tables.pdf (proxy refused download; text layout scrambled).
- *Regeneration of shallow BHE fields — a literature review* (TU Darmstadt repository, 2024; title from file name, authors not read): https://tuprints.ulb.tu-darmstadt.de/27734/3/2024_RegenerationOfShallowBHEfields_aLiteratureReview_XK_MO_JR_PV_NB.pdf (blocked by bot protection).
- UBC cIRcle item possibly on a data centre / geoexchange: https://open.library.ubc.ca/cIRcle/collections/24/items/1.0395216 (blocked).
- City of Edmonton Renewable Energy Systems (geoexchange) page: https://www.edmonton.ca/residential_neighbourhoods/renewable-energy-systems.aspx (robots).
- GSC Open File 6914, full text (Cordillera / Georgia Basin heat-flow chapter): https://download-telecharger.services.geo.ca/pub/nrcan_rncan/publications/STPublications_PublicationsST/291/291488/gid_291488.pdf (read truncated; download refused by proxy).
- NTNU/Sikt record on data-centre BTES: https://ntnuopen.ntnu.no/ntnu-xmlui/handle/11250/2730847 (redirect to nva.sikt.no not permitted).
- CSA C448 Series-16 (design and installation of ground source heat pump systems), CSA Group; ASHRAE Handbook — HVAC Applications, geothermal chapter; VDI 4640 Part 2 (all paywalled; try the UBC library).
- AER BGP query tool for each Edmonton site: https://dds.aer.ca/BGP/UI/BGP-Main.aspx
- Full text of Sibbitt et al. 2012 (Energy Procedia): http://www.sciencedirect.com/science/article/pii/S187661021201613X (ScienceDirect; robots).

## Blocked this pass
mail.gshp.org.uk (proxy download), tuprints.ulb.tu-darmstadt.de (Anubis), open.library.ubc.ca (bot block), edmonton.ca renewable-energy page (robots), download-telecharger.services.geo.ca (proxy download; WebFetch partial), nva.sikt.no (not in provenance).
