# 15d · Add-ons: storage, backup power and other energy add-ons

Prepared 14 Oct 2026 for the Beyond Data tool (Vancouver and Edmonton, 0.1 to 40 MW IT).
Bullet format: **value · unit · meaning · source (title, publisher, year, page or section, URL) · source type · status**.
"VERIFIED" means the number was read in the source opened for this file. "DERIVED" means arithmetic on verified numbers, shown in full. "UNVERIFIED" means not confirmed. "ASSUMPTION" means a tool input with no source behind it. "OPERATOR CLAIM" means a statement by an operator, vendor or manufacturer, reported as their claim and not as fact.
Where a fetch was summarised by the reading tool rather than read line by line, the page or section given is the one the tool reported. Spot-check these before citing in the thesis.
All costs are in US dollars unless marked CAD. Do not convert to CAD without a stated exchange rate and year.

---

## 1. Battery energy storage (BESS), including a data centre's UPS batteries

### 1.1 Sizing and performance

- **1 to 8 · h (E/P ratio, kWh per kW)** · the range of durations NREL costs for commercial batteries · *Commercial Battery Storage*, NREL Annual Technology Baseline (ATB) 2024, "Model Inputs and Assumptions", Table 1 · https://atb.nrel.gov/electricity/2024/commercial_battery_storage · national lab · VERIFIED
- **100 to 2,000 · kW_DC** · commercial system size range in ATB; the base-year cost is built on a 300 kW_DC, 4 h stand-alone system · same page, Table 1 and CAPEX section · VERIFIED
- **85 % · round-trip efficiency (AC–AC)** · ATB's "representative round-trip efficiency" · same page, "Round-Trip Efficiency" · VERIFIED
- **86 % (2020), 88 % (2030) · system RTE, Li-ion** · Mongird et al., *2020 Grid Energy Storage Technology Cost and Performance Assessment*, PNNL, DOE/PA-0204, Dec 2020, p. 8 (lithium-ion methodology) · https://www.pnnl.gov/sites/default/files/media/file/Lithium-ion_Methodology.pdf · national lab · VERIFIED
- **15 · years · life** · ATB lifetime, with fixed O&M paying to offset degradation; ~1 cycle per day · ATB 2024 commercial page, "O&M" and "Capacity Factor" · VERIFIED
- **2,000 cycles at 80 % DOD (LFP); 1,200 cycles at 80 % DOD (NMC); 10 years calendar life** · PNNL 2020, p. 8 · VERIFIED (2020 values; newer PNNL figures not retrieved)
- **34 ± 15 · kWh/m² of site (average of 21 Li-ion sites); up to 62 kWh/m² for paired blocks; 26–33 kWh/m² for two stacked-container sites** · areal energy density of real grid batteries measured from satellite imagery · Reber, Jarvis, Marshak, "Beyond energy density: flow battery design driven by safety and location", RSC, 2023 (received 13 May, accepted 5 Jul 2023), Table 1, DOI 10.1039/d3ya00208j · https://pubs.rsc.org/en/content/articlehtml/2023/ya/d3ya00208j · peer-reviewed journal (the RSC "ya" DOI prefix is *Energy Advances*; the page did not print the journal name, so confirm) · VERIFIED
  - **29 m²/MWh (range 20 to 53 m²/MWh); best case 16 m²/MWh** · DERIVED as 1000/34, 1000/49, 1000/19, 1000/62. These are outdoor utility sites with access and spacing included. An indoor room or a rooftop or yard enclosure on an urban lot will differ, and fire separations (§1.4) may control the area more than energy density does.

### 1.2 UPS batteries already in a data centre

- **1–2 min (hyperscale), ~5 min (cloud and colocation), 10–15 min (financial) · UPS battery runtime at full load; generators take over in 10–20 s** · "Design Considerations for the Deployment of UPS Systems in Data Centers", Schneider Electric blog, 20 Jul 2020 (M. Hurley) · https://thegreengrid.org/ja/node/2747 · vendor · OPERATOR CLAIM. No government or peer-reviewed source for typical runtime was found.
- **600 kWh UPS for a 1,000 kW IT peak; state of charge held between 50 % and 100 %, so ~300 kWh usable for flexibility; charge 0.82 / discharge 0.92 efficiency** · model inputs in Takci, Day, Qadrdan (Cardiff), "Characterisation and Quantification of Data Centre Flexibility for Power System Support", arXiv 2511.07159v1, Nov 2025, Sec. III-B, Table I · https://arxiv.org/pdf/2511.07159v1 · preprint (not peer-reviewed) · VERIFIED as model assumptions, not field data
- **~100 kW (≈10 % of 1 MW IT) upward flexibility, held up to 6.8 h overnight and 0.2 h at 17:30, from IT deferral plus UPS plus cooling together** · same paper, Sec. VI · preprint · VERIFIED (UPS share not separated)
- **UPS response < 100 ms; total response 0.15 s; SOC kept within 20–80 % to protect backup** · Tao and Gadh (UCLA), "Fast Frequency Response Potential of Data Centers through Workload Modulation and UPS Coordination", arXiv 2512.14128, Sec. 3.3, 5.2, 5.3 · https://arxiv.org/pdf/2512.14128 · preprint · VERIFIED, but the paper's energy figures do not reconcile internally (see notes in fetch). Use for response time only.
- **Qualitative: UPS batteries sized for outage power already hold enough energy for demand response; dual use does not compromise outage handling** · Narayanan, Wang, Al Mamun, Sivasubramaniam, Fathy, "Should we dual-purpose energy storage in datacenters for power backup and demand response?", HotPower 2014 (workshop paper, abstract only read) · https://pure.psu.edu/en/publications/should-we-dual-purpose-energy-storage-in-datacenters-for-power-ba/ · peer-reviewed workshop · VERIFIED (abstract only)
- **Qualitative: UPS and shiftable cooling improved frequency nadir and RoCoF in a model calibrated on real Irish events** · "Manipulation of Static and Dynamic Data Center Power Responses to Support Grid Operations", *IEEE Access*, Jan 2020 · https://doaj.org/article/0abc9e77a89d4368ba5a382dae280e7e · peer-reviewed · VERIFIED (abstract only; authors and DOI not shown on page)
- **Microsoft Dublin grid-interactive UPS (Eaton / Enel X) giving frequency services to EirGrid** · trade press only (DatacenterDynamics, Data Center Frontier). The Eaton/Microsoft EcoCloud 2021 deck that was opened does not mention Dublin and gives no MW, revenue or degradation figures · https://ecocloud.epfl.ch/wp-content/uploads/2021/09/Session1-Speaker4-Eaton_Microsoft_EcoCloud_final.pdf · vendor/operator presentation · OPERATOR CLAIM, UNVERIFIED for any number
- **Telia Helsinki data centre UPS in Fingrid reserve market** · trade press only; the LUT University thesis on it blocked access (see retrieve list) · UNVERIFIED

### 1.3 Cost

- **Cost formula: Total ($/kW) = [pack $/kWh × kWh + BOS $/kW × kW + power constant $] / kW** · ATB 2024 commercial battery, "CAPEX" · VERIFIED (BOS and constant values are not printed on the page)
- **$199/kWh (4 h), $211/kWh (1 h), $164/kWh (8 h) · Li-ion pack price, ex-factory, 2022 USD; inverter $97.5/kW_DC** · pack only, not installed · ATB 2024 commercial, Table 1 · VERIFIED
- **17.5 % / 36.5 % / 52 % · CAPEX fall 2022–2035 (conservative / moderate / advanced)** · ATB 2024 commercial · VERIFIED
- **2.5 % of CAPEX per year · fixed O&M; variable O&M = 0** · ATB 2024 commercial · VERIFIED
- **$385/kWh (LFP), $435/kWh (NMC) · total installed, 100 MW 4 h, 2021; $291/kWh LFP 100 MW 4 h, 2030** · Viswanathan et al., *2022 Grid Energy Storage Technology Cost and Performance Assessment*, PNNL-33283, Aug 2022, Executive Summary p. viii · https://www.sandia.gov/app/uploads/sites/256/2024/02/ESGC-Cost-Performance-Report-2022-PNNL-33283.pdf · national lab · VERIFIED
- **~$4.59/kW-yr (LFP), ~$5.11/kW-yr (NMC) · fixed O&M, 10 MW 4 h** · PNNL-33283, p. 18 · VERIFIED
- **1 MW and 10 MW installed costs (the sizes that matter for an urban data centre)** · in PNNL-33283 Tables 4.2–4.4, not extracted · UNVERIFIED (retrieve). Smaller systems cost more per kWh than the 100 MW figure.
- **2024 PNNL update** · the PNNL database page refers to a "2024 effort" but no 2024 report was found · https://www.pnnl.gov/projects/esgc-cost-performance · UNVERIFIED

### 1.4 Rules and fire safety

- **NFPA 855 is not shown to be adopted in BC or Alberta law.** No BC Building Code, BC Fire Code, NBC 2020 or NFC 2020 text naming NFPA 855 was found or opened. A trade magazine (*Fire Fighting in Canada*, Nov 2022) describes NFPA 855 as "a guideline for Canadian fire departments"; it is a popular source and cannot be cited · UNVERIFIED. Retrieve NFC 2020 / BC Fire Code 2024 Part 3 and any Codes Canada proposed change on ESS.
- **ANSI/CAN/UL 9540 · ESS must be certified to it; UL 9540A large-scale fire test optional, used to justify reduced separation** · Electrical Safety Authority (Ontario), Bulletin 64-8-2, "Battery based energy storage systems (ESS) at residential occupancies", May 2024 · https://esasafe.com/assets/files/esasafe/pdf/Electrical_Safety_Products/Bulletins/64-8-2.pdf · regulator bulletin (Ontario, interprets CE Code 2024 Section 64) · VERIFIED for Ontario residential; shows how the CE Code 2024 Section 64 is applied but is not BC or Alberta law
- **CE Code 2024 (CSA C22.1:24) Section 64 has "major revisions for energy storage"** · 2024 CE Code presentation, P. Daigle, Chief Electrical Inspector, New Brunswick Public Safety · https://www.apegnb.com/wp-content/uploads/2024-CE-Code-presentation.pdf · regulator presentation · VERIFIED (preface only; rule text not reached)
- **Technical Safety BC Information Bulletin IB-EL 2023-06 "Energy Storage Systems" rescinded 4 Mar 2025** · https://technicalsafetybc.ca/regulatory-resources/regulatory-notices/energy-storage-systems · regulator · VERIFIED. What replaced it is UNVERIFIED (BC adoption of CE Code 2024 not confirmed).
- **US analogue, not Canadian law (2021 IFC as adopted by Seattle):** Li-ion permit threshold 20 kWh; max 600 kWh Li-ion per fire area indoors; no ESS above 75 ft over fire-department access level or below exit discharge; outdoor ESS 10 ft (3 m) from lot lines, public ways and buildings, reducible to 3 ft with a 1 h barrier; "remote" outdoor = more than 100 ft (30 m); UL 9540 listing required · Seattle Fire Department Permit Conditions 1206-Install, 2021 Seattle Fire Code, rev. Apr 2026, Tables 1207.1.3, 1207.5, SFC 1207.5.3, 1207.8.1, 1207.8.3 · https://www.seattle.gov/documents/departments/fire/business/permitcond_1206-install.pdf · US municipal fire code · VERIFIED as a US example only. Use as "what a nearby jurisdiction requires", never as the BC or Alberta rule.

### 1.5 Programs that could pay a data-centre battery

**BC Hydro**
- **Energy Storage Incentive (ESI): incentive = lesser of "$10,000 X kW nominated", "$10,000 X kWh/4 nominated", or "80 % of eligible project costs"** (verbatim; the $10,000/kW figure looks like a typo, so in practice the 80 % cap likely governs; confirm with BC Hydro) · min 25 kW; new batteries only (existing or already-purchased not eligible, so an existing UPS does not qualify); must be **non-exporting**; general service or irrigation rate; 10-year contract; up to 4 h per event, 2 events/day, 5 h apart, year-round; must deliver ≥85 % of nominated capacity in 85 % of events; UL 9540 and UL 1741; Tesla products ineligible from 12 Mar 2025 · *Energy storage incentive*, BC Hydro (page stamp 28 May 2024) · https://www.bchydro.com/powersmart/business/programs/large-demand-response/energy-storage-system-incentive.html · utility program · VERIFIED
- **$50/kW-season · Demand Response for Business; up to 20 events, ≤4 h, weekdays 6 am–10 pm, Nov–Mar; 5-in-5 baseline; diesel and other fossil generators prohibited for load reduction** · *Customer Manual – Demand Response for Business*, BC Hydro, updated 2026-08-05, Sec. 2.2.5, 2.4, 3.1, 3.3, 3.6 · https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/power-smart/business/programs/demand-response-for-business-customer-manual.pdf · utility program · VERIFIED (note: the manual writes the unit inconsistently as "$50/kW-year per season" and "$50/kW-season")
- **Events normally 4–9 pm, Nov–Mar; BC Hydro is winter-peaking** · "Demand response in BC", BC Hydro Alliance feature · https://www.bchydro.com/work-with-us/alliance/news-features/demand-response-in-bc.html · utility · VERIFIED
- **$13.83/kW (Large General Service, ≥150 kW peak); $6.07/kW (Medium GS, 35–150 kW) · demand charge on highest 15-min demand in each billing period; energy 6.79 ¢/kWh (LGS)** · *General Service Business Rates*, BC Hydro (no effective date on page) · https://app.bchydro.com/accounts-billing/rates-energy-use/electricity-rates/business-rates.html · utility tariff page · VERIFIED (CAD). Value of peak shaving = demand charge × kW shaved × months.
- **RS 1823 (transmission) cancelled 1 Apr 2026; customers moved to RS 1830** · BC Hydro Transmission Rates page · https://app.bchydro.com/accounts-billing/rates-energy-use/electricity-rates/transmission_rate.html · VERIFIED. RS 1830 demand charge UNVERIFIED (RS 1828 biomass-contract schedule shows $9.756/kVA, which is not the general transmission rate).

**AESO (Alberta)**
- **Operating reserves (regulating, spinning, supplemental) can come from loads ("demand side"); procured daily through Watt-Ex; prices vary daily by product** · AESO Operating Reserve page · https://aeso.ca/market/ancillary-services/operating-reserve/ · system operator · VERIFIED. Storage not named on the page.
- **10 MW minimum · spinning reserve resource; must reach directed output within 10 min and hold 1 h** · ISO Rules Section 205.5, Spinning Reserve (2024-05-31), subsections 3(1)(a), 10(1) · https://www.aeso.ca/assets/documents/205.5-Spinning-Reserve-2024-05-31.pdf · ISO rule · VERIFIED
- **5 MW minimum · supplemental reserve resource; 10 min response; sustain 1 h; "technology agnostic" since 2018; aggregation measured at collector bus** · ISO Rules Section 205.6 (2024-05-31), subsections 3(a), 3(b), 6(1), 7(d) · https://www.aeso.ca/assets/documents/205.6-Supplemental-Reserve-2024-05-31.pdf · ISO rule · VERIFIED
  - So only data centres with roughly ≥5 MW of dispatchable battery or load qualify on their own; smaller ones need an aggregator · DERIVED from the two minimums
- **1,200 MW interim limit on large-load connections (data centres), about 10 % of Alberta peak, from 4 Jun 2025** · AESO *Large Load Integration Fact Sheet*, 4 Jun 2025 · https://www.aeso.ca/assets/Large-Load-Integration-Fact-Sheet.pdf · system operator · VERIFIED
- **Phase 2 "bring your own generation" (BYOG) process pending a regulation under Bill 8; intake expected "this fall" (2026)** · AESO Engage, Phase 2A Large Load Integration · https://aesoengage.aeso.ca/pre-engagement-phase-ii-large-load-integration · system operator · VERIFIED (no curtailment or storage rules stated yet)
- Alberta capacity payments: none found. Alberta's market is energy-only, as far as found; UNVERIFIED (not confirmed in a primary source in this pass)

---

## 2. Replacing diesel backup generators

### 2.1 What the diesel baseline emits (for "diesel avoided")

- **NOx 0.024 lb/hp-hr (uncontrolled), 0.013 (timing retard); CO 0.0055; PM 0.0007; CO₂ 1.16 lb/hp-hr; CO₂ 165 lb/MMBtu** · large stationary diesel engines (>600 hp) · US EPA, AP-42 5th ed., Vol. I, Sec. 3.4, Table 3.4-1, April 2025 · https://www.epa.gov/system/files/documents/2025-04/c03s04_april2025.pdf · government · VERIFIED. EPA notes these are averages for uncontrolled engines, not permit limits; modern Tier 2 to Tier 4 gensets emit less NOx and PM.
  - **≈14.6 g NOx/kWh_e, ≈0.43 g PM/kWh_e, ≈706 g CO₂/kWh_e** · DERIVED: lb/hp-hr × 453.6 g/lb ÷ 0.7457 kW/hp (shaft output; generator losses ignored)
  - **≈70.9 g CO₂/MJ fuel** · DERIVED: 165 × 453.6 / 1,055.06
- **NOx 1.376 × B, PM2.5 0.021 × B · kg per m³ fuel, with B = 38.184 GJ/m³ default → ≈52.5 kg NOx/m³ (52.5 g/L), ≈0.80 kg PM2.5/m³** · NPRI calculator for large stationary diesel engines (based on AP-42 3.4, uncontrolled) · ECCC, *Large Stationary Diesel Engines (> 600 hp)* · https://www.canada.ca/en/environment-climate-change/services/national-pollutant-release-inventory/report/tools-calculating-emissions/large-stationary-diesel-engines-greater-than-600hp.html · government · VERIFIED (factors); products DERIVED

### 2.2 How much the generators actually run (testing)

- **Alberta case (AUC Decision 27938-D01-2023, Amazon Data Services Canada, 11 diesel units, 25.6 MW, 10 Mar 2023):** testing at 0 % load 15 min every 2 weeks and 1 h every 3 months; at 100 % load one generator a day up to 2 h, twice a year; one unit at a time, daytime only; the nearest 2.5 MW unit not tested 10 pm–7 am; no export · paras. 2, 6, 8, 13, 23 · https://efiling-webapi.auc.ab.ca/Document/Get/784765 · regulator decision (the testing schedule is the applicant's plan accepted by the AUC) · VERIFIED
  - **≈ 14.5 h/yr per unit, of which ~4 h at full load and 10.5 h at no load** · DERIVED: 26 × 0.25 h + 4 × 1 h = 10.5 h at 0 % load, plus 2 × 2 h = 4 h at 100 % load (reading "one generator a day … two times per year" as each unit twice a year; if the decision means something else, the full-load hours change)
- **City of Vancouver: testing an emergency generator is exempt from noise limits if run ≤1×/month, daytime, ≤60 min, plus once a year up to 180 min, and continuous sound ≤80 dBA at the point of reception (or ≥6.1 m from source)** · Noise Control By-law No. 6555 (consolidated to 14 Jul 2026), s. 4.1(c) · https://bylaws.vancouver.ca/6555c.PDF · municipal bylaw · VERIFIED
  - **≤15 h/yr testing** · DERIVED: 12 × 1 h + 3 h

### 2.3 Air permits and emission rules

- **Alberta: "emergency standby or backup power plants or generators are exempt from an approval" under EPEA; "Alberta does not have emission standards for diesel generators"; assessed against Alberta Ambient Air Quality Objectives (an exceedance was predicted only with all 11 units running at once)** · AUC Decision 27938-D01-2023, para. 10 (Alberta Environment and Protected Areas confirmation) · URL above · regulator decision · VERIFIED
- **Alberta: AUC approval still needed for the generators as a "power plant" under s. 11 Hydro and Electric Energy Act** (in that case) · same decision, paras. 2, 26 · VERIFIED
- **Alberta noise (AUC Rule 012, effective 30 Sep 2024): night basic sound level 40–56 dBA Leq by dwelling density and distance to roads/rail (urban >1,000 dwellings/quarter section: 53 dBA in categories 1–2, 56 dBA in category 3); daytime = night + 10 dBA; night 10 pm–7 am; unplanned emergency events exempt unless >4 per year** · AUC Rule 012: Noise Control, Sec. 2.1(3), 2.1(4), 2.1(6), 2.1(8), Table 1 · https://media.auc.ab.ca/prd-consultation/sites/2/2023/11/2024-09-30-Rule012.pdf · regulator rule · VERIFIED. Rule 012 governs AUC-approved facilities; the City of Edmonton noise bylaw also applies (limits not retrieved).
- **Metro Vancouver: emergency engines need no labelling or registration under Non-Road Diesel Engine Emission Regulation Bylaw 1329, 2021, but "must be operated, inspected and maintained to prevent impacts on nearby building occupants"** · Metro Vancouver bylaw update page · https://metrovancouver.org/services/environmental-regulation-enforcement/air-quality-regulatory-program/expansion-of-the-non-road-diesel-engine-emission-regulation · regional government · VERIFIED. Whether a permanently installed data-centre genset is a "non-road" engine under 1329 is UNVERIFIED.
- **Metro Vancouver Air Quality Management Bylaw 1082, s. 7(9): exemption from the discharge prohibition where "the discharge is from steam powered or internal combustion engines"** (wording as reported; conditions not clear in the copy read) · https://metrovancouver.org/boards/Bylaws/MVRD_Bylaw_1082.pdf · regional bylaw · PARTLY VERIFIED. J.B. to read s. 7(9) and any later consolidation before relying on it.
- **Federal: labelled stationary engines are excluded from the Off-Road Compression-Ignition Engine Emission Regulations (s. 5(2)(h))** · ECCC, *Guidance document on Off-Road Compression-Ignition Engine Emission Regulations: chapter 3*, Sec. C.3, C.10, C.11 · https://www.canada.ca/en/environment-climate-change/services/canadian-environmental-protection-act-registry/publications/guidance-document-engine-emission-regulations/chapter-3.html · government · VERIFIED for that (older) regulation. Coverage of stationary engines under the newer SOR/2020-258 "(Mobile and Stationary)" regulations is UNVERIFIED (application sections not reached).
- **Ontario comparison only:** emergency generator testing limited to 60 h in 12 months (O. Reg. 419/05) and a 2025–26 proposal to relax standby-generator approvals (ERO 025-1361) · located through REMI Network (trade press) · UNVERIFIED (primary not opened; Ontario only)

### 2.4 Renewable diesel (HVO / HDRD)

- **−7.03 to 131.35 gCO₂e/MJ · approved lifecycle carbon intensities of HDRD (renewable diesel) fuel codes in BC; most entries ~15–30 (tool's approximate reading); biodiesel −20.35 to 28.98** · BC Low Carbon Fuels, *Approved Carbon Intensities – Current* (RLCF-012), revised 30 Apr 2026 · https://www2.gov.bc.ca/assets/gov/farming-natural-resources-and-industry/electricity-alternative-energy/transportation/renewable-low-carbon-fuels/rlcf012_approved_carbon_intensities_current_29apr2026final.pdf · government · VERIFIED for min/max; the "typical" band is UNVERIFIED (read by the tool, not tallied)
- **Fossil diesel reference CI** · not on that page · UNVERIFIED (in the Low Carbon Fuels Act regulation; retrieve)
- **BC's 2025 GHG methodology does not list renewable diesel factors; organisations use the fossil diesel CO₂ factor as the bio-CO₂ factor** · *2025 B.C. Best Practices Methodology for Quantifying GHG Emissions*, Sec. 3.1.1, p. 29 · https://www2.gov.bc.ca/assets/gov/environment/climate-change/cng/methodology/2025_bc_best_practices_methodology_for_quantifying_greenhouse_gas_emissions.pdf · government · VERIFIED. Meaning: at the stack, HVO emits about the same CO₂ as diesel; the saving is lifecycle (biogenic) and depends on the fuel code.
- **NOx and PM change when switching a genset from diesel to HVO** · no government or peer-reviewed source opened · UNVERIFIED. Treat NOx as unchanged and PM as unchanged until sourced.

### 2.5 Fuel cells

- **Medium scale (100 kW–3 MW, natural gas): electrical efficiency 42–47 % LHV (2015 status), target >50 %; equipment $1,200–4,500/kW; installed $2,400–5,500/kW (2015), target $1,500/kW (2020); life 40,000–80,000 h to >10 % power loss** · US DOE Hydrogen and Fuel Cell Technologies Office, *DOE Technical Targets for Fuel Cell Systems for Stationary (CHP) Applications* · https://www.energy.gov/eere/fuelcells/doe-technical-targets-fuel-cell-systems-stationary-combined-heat-and-power · government · VERIFIED (2015 status / 2020 targets; no newer status found)
- **Electrical efficiency (HHV) and installed cost (2014 $/kW): PEMFC 0.7 kW 35.3 %, $22,000; PAFC 400 kW 34.3 %, $7,000; MCFC 300 kW 47 %, $10,000; MCFC 1.4 MW 42.5 %, $4,600; O&M $36–60/MWh; NOx 0.01 lb/MWh (C&I units); CO₂ 980–1,131 lb/MWh without heat recovery; stack rebuild every 5–10 years** · US EPA CHP Partnership, *Catalog of CHP Technologies*, Sec. 6 Fuel Cells, Mar 2015 (rev. Sep 2017), Tables 6-3, 6-4, 6-5, pp. 6-13 to 6-19 · https://www.epa.gov/sites/default/files/2015-07/documents/catalog_of_chp_technologies_section_6._technology_characterization_-_fuel_cells.pdf · government · VERIFIED
  - Meaning: a fuel cell running on natural gas still emits CO₂ (~445–513 kg/MWh, DERIVED from 980–1,131 lb/MWh × 0.4536) but almost no NOx or PM. It is "low-carbon" only with low-carbon hydrogen or RNG.
- **Fuel cell 50 % efficient; $300/kW (2016) and $50/kW ("2030?") as model inputs for a fuel-cell-powered data centre** · Kurtz, Cader, Ma, Saur et al. (NREL/HPE), "Sustainability, Feasibility, and Economics of a Fuel Cell-Powered Data Center", TechConnect World 2019, slides 6, 9, 14 · https://www.nrel.gov/docs/fy20osti/73604.pdf · national lab presentation · VERIFIED as assumptions. The $/kW values look like stack-level targets, not installed cost; do not use for installed cost. Slide 14 concludes natural gas is the economically viable near-term option.
- **99.6 % start reliability (1,788/1,796 starts); max continuous backup run 65.5 h (telecom backup fleet, 393 sites, 817 units)** · Kurtz et al., *Hydrogen Fuel Cell Performance in the Key Early Markets of Material Handling Equipment and Backup Power*, NREL/PR-5400-60865, 2013, p. 4 · https://www.nrel.gov/docs/fy14osti/60865.pdf · national lab · VERIFIED (small telecom units, not MW data-centre scale; page 17 gives 99.7 %)
- **Microsoft 3 MW hydrogen fuel cell backup test** · trade press only; Microsoft's own post could not be fetched (retrieve list) · OPERATOR CLAIM, UNVERIFIED
- **Fuel cell and hydrogen-storage footprint (m²/MW)** · not found in any opened source · UNVERIFIED

### 2.6 Batteries as the backup itself

- No primary source opened gives a case of a data centre replacing its generators with batteries alone. The Eaton/Microsoft 2021 deck lists "generator replacement" as a UPS use case with no numbers · OPERATOR CLAIM.
- **Battery energy needed to replace a generator = IT load (+ cooling) × hours of outage to cover.** Outage duration is a design choice. A useful bound from NREL's telecom fleet: outages averaged 42 h and reached 142.5 h (Hurricane Sandy) in 2002–2012 US data · NREL/PR-5400-60865, p. 4 · VERIFIED (US telecom context, not BC/AB)
  - Example: 1 MW total load × 24 h = 24 MWh → ≈700 m² of site at 34 kWh/m² · DERIVED (illustrative only)

---

## 3. Thermal storage (chilled water, ice, hot water)

- **4.18 · kJ/(kg·K) · specific heat of liquid water** · Urieli, *Thermodynamic Properties of Water*, Ohio University course pages, citing NIST Chemistry WebBook · https://people.ohio.edu/urieli/thermo/property_tables/H2O/index.html · university course page citing a national standards lab · VERIFIED (use NIST directly in the thesis)
  - **Litres per kWh_th = 3,600 / (4.18 × ΔT)**, taking 1 kg = 1 L · DERIVED. ΔT 6 K (chilled water 6→12 °C) ≈ 144 L/kWh; ΔT 10 K ≈ 86 L/kWh; ΔT 30 K (hot water 40→70 °C) ≈ 29 L/kWh. Density of 1 kg/L is an approximation (≈0.98 at 60 °C), UNVERIFIED in a source here.
- **0.5 °C rise below the thermocline = 5 % loss of cooling capacity (at 10 °C ΔT); thermocline grows from ~0.33 m to 1 m in 6 h charging** · stratified chilled-water tank tests · US Army CERL, DTIC ADA273511 (1993), p. 9 · https://apps.dtic.mil/sti/pdfs/ADA273511.pdf · government lab · VERIFIED. Meaning: usable volume is less than the formula gives; apply a usable fraction (ASSUMPTION 0.8–0.9 until sourced).
- **144 Btu/lb · latent heat of ice; ≈80 lb ice per ton-hour** · DOE Building Technologies Office, *Thermal Energy Storage Webinar Series: Ice TES*, 16 Jan 2020 (NREL presenter M. Bianchi), ~slides 37, 44 · https://www.energy.gov/sites/prod/files/2020/02/f71/bto-IceStorageWebinar-011620.pdf · government · VERIFIED
  - **≈10.3–10.7 kg ice per kWh_th** · DERIVED: 80 lb × 0.4536 / 3.517 kWh per ton-hour = 10.3; 3,600 / 334.9 kJ/kg (144 Btu/lb × 2.326) = 10.7
- **Chiller efficiency 0.55 kW/ton by day vs 0.68 kW/ton making ice (≈24 % more energy per ton when making ice)** · one building case (Tishman Speyer, NYC), Fischer, DOE presentation, slide 20 · https://www.energy.gov/sites/default/files/2018/05/f52/Fischer%2CGregg-Presentation-DOE.pdf · operator presentation hosted by DOE · OPERATOR CLAIM
- **Sensible/tank TES cost 0.1–35 USD/kWh (2018) → 0.1–25 USD/kWh (2030); TTES life 20–30 years (figure mapping uncertain)** · IRENA, *Innovation Outlook: Thermal Energy Storage*, 2020, pp. 23–30, Figs 8, 10, 11 · https://www.irena.org/-/media/Files/IRENA/Agency/Publication/2020/Nov/IRENA_Innovation_Outlook_TES_2020.pdf · intergovernmental agency · VERIFIED for the range; the range is too wide to size cost, and building-scale chilled-water and ice costs were not legible · UNVERIFIED for ice/chilled water
- **Footprint of tanks (m² per m³)** · geometry: footprint = volume / height. No sourced typical tank height; ASSUMPTION
- **Data-centre relevance:** LBNL lists "store thermal energy off-peak" among data-centre flexibility mechanisms, no sizes given · Granderson et al., *Integrating AI Data Centers with the Power Grid*, LBNL / NAE *The Bridge* 56(1), 2026, "Mechanisms for Flexible Operations" · https://eta-publications.lbl.gov/sites/default/files/2026-07/integrading_ai_data_centers_with_the_power_grid.pdf · national lab · VERIFIED (qualitative)

---

## 4. Absorption (and adsorption) chillers driven by data-centre heat

### 4.1 Temperatures

- **Air-cooled data centres: heat captured at 25–35 °C; liquid-cooled: 50–60 °C (components up to 85 °C)** · Sethuramalingam, Asthana, Weston, "Review of Waste Heat Utilisation from Data Centres", ICESF 2019 (Nottingham Trent), Sec. 3.3, p. 370 · https://shura.shu.ac.uk/26175/1/Asthana_ReviewOfWaste%28VoR%29.pdf · conference paper · VERIFIED
- **Single-effect LiBr absorption needs heat sources "no lower than 90 °C"; two-stage cycles suit 70–80 °C; COP single-effect 0.6–0.7, two-stage below 0.4, double-effect above 1.2** · Chen, Tan, Wu, Li, Hu, "Experimental Study and Performance Analysis of a Li-Br Single-Effect/Two-Stage Hybrid Absorption Chiller", *Energies* 19(9) 2147, 2026, Introduction and Abstract · https://www.mdpi.com/1996-1073/19/9/2147 · peer-reviewed · VERIFIED
  - **Conclusion for the tool:** standard single-effect absorption cannot be driven by air-cooled heat (25–35 °C) and is marginal-to-unworkable even with liquid-cooled heat (50–60 °C) without a heat pump or a special multistage chiller. DERIVED from the two sources above.
- **Exception, research stage: a switchable multistage absorption chiller producing 50 kW of 18 °C chilled water from 50 °C hot water (32 °C cooling water); in a Guangzhou case with 200 kW liquid-cooled + 100 kW air-cooled load it cut mechanical cooling load 80.5 % and saved 78.0 MWh/yr** · Cui, Du, Wang, "Switchable multistage absorption chiller for ultra-low-grade waste heat driven cooling in data centers", *Applied Energy* 398 (2025) 126407 · https://ideas.repec.org/a/eee/appene/v398y2025ics0306261925011377.html · peer-reviewed · VERIFIED (abstract; COP not on page). Note: 18 °C chilled water serves the data centre's own warm-water cooling, not a neighbour's 6–7 °C comfort cooling.
- **Adsorption chiller driven at ~65 °C (standby below ~55 °C); hot-water-cooled cluster ran safely at ≤70 °C outlet; COP rose 90 % going from 57 to 70 °C; "on the order of 25 %" of heat reusable as chilled water at 60–70 °C, "almost 50 %" with better insulation** · Meyer, Ries, Solbrig, Wettig, "iDataCool: HPC with Hot-Water Cooling and Energy Reuse", arXiv 1309.4887, 2013, Sec. 1, 3, 4, 5 · https://arxiv.org/pdf/1309.4887 · preprint (Univ. Regensburg / IBM) · VERIFIED (absolute COP not in text)
- **Ebrahimi, Jones, Fleischer (2014) rank absorption cooling and ORC among the most promising uses of data-centre low-grade heat** · *Renewable and Sustainable Energy Reviews* 31, 622–638, DOI 10.1016/j.rser.2013.12.007 · https://experts.boisestate.edu/en/publications/a-review-of-data-center-cooling-technology-operating-conditions-a/ · peer-reviewed · VERIFIED (abstract only; the temperature table in the paper not read; retrieve)

### 4.2 Cost

- **Chiller and cooling tower prices "575 × $2,500" (4.5 MW case) and "1,600 × $2,500" (13.5 MW case), basis unexplained; cooling electricity cut 4,340 MWh/yr (4.5 MW) and 13,025 MWh/yr (13.5 MW)** · Amiri, Madadian, Bahrani, Ghoreishi-Madiseh, "Techno-Economic Analysis of Waste Heat Utilization in Data Centers: Application of Absorption Chiller Systems", *Energies* 14(9) 2433, 2021, Sec. 3.1, 3.2 · https://www2.mdpi.com/1996-1073/14/9/2433 · peer-reviewed · VERIFIED as printed, but $/kW cannot be derived (if the multiplier is tons, ≈$711/kW_cooling, UNVERIFIED). The paper does not state the driving temperature it assumes.
- Absorption chiller $/kW from a government or lab source · not found · UNVERIFIED

---

## 5. Biomass and renewable natural gas (RNG): do they belong in an urban data-centre tool?

**Recommendation: leave them out as add-ons, or show them only as "No" with reasons.** Reasons, each sourced:

1. **They add combustion, and so local air pollution, in a dense airshed.** Metro Vancouver regulates boilers under 50 MW through Bylaw 1087; biomass boiler operators "are already required to conduct dispersion modelling" (s. 29(1)); Metro Vancouver proposed a 120 mg/m³ NOx limit for new biomass boilers and for all by 1 Jan 2040; NO₂ forms fine particulate and ozone with "adverse health effects even at low concentrations" · Metro Vancouver, *Proposed Amendments to the Boilers and Process Heaters Emission Regulation Bylaw No. 1087*, Discussion Paper, Jun 2022, pp. 4, 6, 9–12 · https://metrovancouver.org/services/air-quality-climate-action/Documents/boilers-and-heaters-discussion-paper.pdf · regional government · VERIFIED
2. **A data centre already has surplus low-grade heat;** burning fuel for heat duplicates what the site gives away (see 15a/03 heat files). Its need is firm electricity. Electricity from biomass or RNG needs on-site generators or fuel cells, which brings back the generator issues in §2. Reasoning DERIVED, no single source.
3. **RNG on the gas grid is a fuel-accounting choice, not a building add-on;** its supply is limited and contested. BC's 2025 methodology treats RNG through FortisBC's blend (2.5 % RNG midpoint in 2025) · *2025 B.C. Best Practices Methodology*, Sec. 2.1.1, p. 14 (URL in §2.4) · government · VERIFIED. A 2022 BC supply study (commissioned by the BC government, FortisBC and BC Bioenergy Network) reportedly estimates up to 50 PJ/yr by 2030 and 440 PJ/yr by 2050 of renewable and low-carbon gas · located through *Greenhouse Canada* (trade press); primary PDF blocked by fetch rules · UNVERIFIED
4. **The reverse is the useful link:** Ebrahimi et al. (2014) list "biomass co-location" (drying biomass with data-centre heat) as a heat-reuse option · abstract, URL in §4.1 · peer-reviewed · VERIFIED (abstract). This belongs in the heat-use rows, not as an energy add-on.

---

## 6. Data centres as flexible loads (for the "flexible load" row)

- **25 % demand savings at the data-centre level, 10–12 % at whole-building level, "with minimal or no impact" (4 California field tests)** · Ghatikar, Ganti, Matson, Piette, *Demand Response Opportunities and Enabling Technologies for Data Centers: Findings From Field Studies*, LBNL-5763E, 2012 · https://eta-publications.lbl.gov/publications/demand-response-opportunities-and · national lab · VERIFIED (abstract)
- **Flexibility "not a credible substitute when bulk power is clearly needed for the long term"; UPS can charge or discharge in coordination with the grid; backup generators can offset peak (no permit hours discussed)** · Granderson et al., LBNL 2026 (URL in §3) · national lab · VERIFIED (qualitative)
- **Flexibility always lowered total system cost (up to 5 % in Texas) but raised emissions up to 3 % in Mid-Atlantic and WECC; cut CO₂ up to 40 % in Texas** · Knittel, Senga, Wang, *Flexible Data Centers and the Grid: Lower Costs, Higher Emissions?*, MIT CEEPR WP 2025-14 · https://ceepr.mit.edu/flexible-data-centers-and-the-grid-lower-costs-higher-emissions · university working paper (not peer-reviewed) · VERIFIED (abstract). Relevance: in a hydro grid (BC) the carbon effect of shifting is small; in Alberta it depends on the marginal unit.
- **Survey: Wierman, Liu, Liu, Mohsenian-Rad, "Opportunities and challenges for data center demand response", IGCC 2014, DOI 10.1109/IGCC.2014.7039172** · https://researchconnect.stonybrook.edu/en/publications/opportunities-and-challenges-for-data-center-demand-response/ · peer-reviewed conference · VERIFIED (no numbers in abstract)
- Diesel generators cannot be used for BC Hydro business demand response (§1.5) · VERIFIED. In Alberta, no such rule was found.

---

## 7. Effects on other rows when an add-on is added to an option

| Add-on | Grid peak relief | Flexible load | Carbon | NOx / PM | Noise | Space | Cost | Approvals |
|---|---|---|---|---|---|---|---|---|
| BESS (new) | + P_batt (MW) for up to E/P hours | + E_usable (MWh) | small + (losses 15 %) × grid factor; − if it displaces peak fossil | none on site | inverter/HVAC hum (UNVERIFIED level) | + E / 34 kWh/m² (outdoor) | CAPEX + 2.5 %/yr | Fire (UL 9540; local fire authority); BC Hydro interconnection; non-export for ESI |
| UPS used for grid services | + up to UPS kW for minutes | + (SOC_max − SOC_reserve) × E_UPS | ≈ 0 | none | none | 0 | controls only; battery wear (UNVERIFIED) | Utility/AESO program rules; ESI excludes existing batteries |
| Diesel → HVO | 0 | 0 | − lifecycle (fuel-code CI vs diesel); stack CO₂ same | ≈ same (UNVERIFIED) | same | 0 | fuel premium (UNVERIFIED) | none new found |
| Diesel → fuel cell | 0 (unless run for peaks) | 0 | NG: still ~445–513 kg/MWh when running; H₂: depends on H₂ source | NOx ≈ 0.01 lb/MWh; PM ≈ 0 | lower (UNVERIFIED) | UNVERIFIED | $2,400–5,500/kW installed (2015) | fuel storage (H₂) rules UNVERIFIED |
| Diesel → batteries | + P while not in outage | + | − test-run diesel (~4 h/yr full load + ~10 h no load per unit) | − test-run NOx/PM | − testing noise | large (hours × MW / 34 kWh/m²) | large | fire, as BESS |
| Chilled water / ice TES | + chiller kW shifted for storage hours | + | ≈ 0 in BC; ice adds ~24 % chiller energy (operator claim) | none | none | V / tank height | IRENA range too wide | structural, plumbing |
| Hot water TES | 0 (heat side) | heat buffer | enables more heat export | none | none | V / tank height | as above | as above |
| Absorption chiller | − chiller kW at neighbour | 0 | + if cooling replaced | none | cooling tower | plant room + cooling tower | UNVERIFIED | needs ≥ ~70–90 °C source (No for air-cooled) |
| Biomass / RNG | 0 | 0 | depends on accounting | + (biomass) | + | fuel storage | UNVERIFIED | Bylaw 1087 dispersion modelling (Metro Van) |

---

## (a) Proposed tool quantities, with formulas and coefficients

1. **Battery power and energy**
   - `P_batt (MW)` = user input, default 0.25 × IT load (ASSUMPTION).
   - `E_batt (MWh)` = P_batt × d, with d ∈ {1, 2, 4, 8} h (ATB range), default 4 h.
   - `RTE` = 0.85 (ATB 2024), range 0.85–0.88 (ATB, PNNL 2020).
   - `Life` = 15 yr (ATB); cycle life 2,000 at 80 % DOD for LFP (PNNL 2020) — show both; the lower governs if cycled daily (2,000/365 ≈ 5.5 yr at 1 cycle/day at 80 % DOD; DERIVED, flag the conflict).
   - `Area_batt (m²)` = E_batt (kWh) / 34, range /49 to /19 (Reber et al. 2023).
   - `CAPEX` = E_batt × $385/kWh (LFP, 100 MW 4 h, 2021, PNNL 2022) as a floor; urban 1–10 MW systems cost more (UNVERIFIED by how much). `O&M/yr` = 0.025 × CAPEX (ATB).
2. **UPS for grid services**
   - `E_UPS (MWh)` = IT load × t_UPS / 60, t_UPS ∈ {2, 5, 15} min (operator claim; show as user-set).
   - `E_flex` = E_UPS × (SOC_max − SOC_reserve), default 1.0 − 0.5 (Takci et al. model) → 0.5 × E_UPS.
   - `P_flex` = min(UPS inverter rating, IT load). Duration = E_flex / P_flex (often minutes, so useful for frequency response, not for 4 h peaks).
3. **Peak relief and payment**
   - `Peak relief (MW)` = min(P_batt, E_batt × RTE^0.5 / event hours). BC event = up to 4 h (ESI) or 4–9 pm window.
   - BC: `$/yr` ≈ $50/kW-season × kW (DR for Business; battery eligibility not stated) or demand-charge saving $13.83/kW × kW × 12 (LGS). ESI capital incentive ≤ 80 % of eligible cost, new non-exporting batteries only.
   - Alberta: reserve eligibility only if ≥5 MW (supplemental) or ≥10 MW (spinning), else "via aggregator". Price: daily Watt-Ex (no figure retrieved; leave as range input).
4. **Diesel avoided by swapping test runs (generator → battery/fuel cell)**
   - `Hours_test` = 14.5 h/yr per unit, ~4 h of it at full load (AUC 27938 schedule, DERIVED), or ≤15 h/yr (Vancouver bylaw noise-exemption cap, DERIVED).
   - `Energy_test (MWh)` = Σ units × kW × (4 h × 1.0 + 10.5 h × no-load fuel fraction). The no-load fuel fraction is not sourced (ASSUMPTION 0.1); a simpler bound is units × kW × 4 h.
   - `NOx (kg)` = Energy_test × 14.6 g/kWh (AP-42 uncontrolled; upper bound). `PM` × 0.43 g/kWh. `CO₂` × 706 g/kWh.
   - Show the result as small: e.g. 20 MW of gensets × 4 h full load = 80 MWh → ≈1.17 t NOx (80,000 kWh × 14.6 g), ≈34 kg PM, ≈56 t CO₂ (DERIVED illustration, upper bound because AP-42 is uncontrolled).
5. **HVO swap**: `ΔCO₂e (lifecycle)` = fuel energy (MJ) × (CI_diesel − CI_HVO fuel code). CI_diesel UNVERIFIED (retrieve); CI_HVO user picks a BC fuel code (−7 to 131 g/MJ). Stack CO₂, NOx, PM unchanged.
6. **Thermal storage volume**
   - `V (m³)` = E_th (kWh) × 3.6 / (4.18 × ΔT) / f_usable, f_usable = 0.85 (ASSUMPTION; CERL shows thermocline losses).
   - Ice: `m_ice (t)` = E_th (kWh) × 0.0107. Ice-making chiller penalty ≈ +24 % (operator claim).
   - `Area (m²)` = V / h_tank (ASSUMPTION h = 6–10 m outdoors, 3 m indoors).
7. **Absorption chiller gate (non-compensatory)**
   - If cooling = air → **No** (25–35 °C).
   - If liquid cooling at 50–60 °C → **Works with a change**: requires a heat pump lift to ≥ 90 °C (single-effect) or a two-stage / multistage chiller (COP < 0.4; research-stage at 50 °C).
   - `Q_cool (kW)` = Q_heat_recovered × COP, COP 0.6–0.7 (single-effect at ≥90 °C) or < 0.4 (two-stage, 70–80 °C).
8. **Biomass / RNG**: no sizing; show as **No** for urban sites with the three sourced reasons in §5.

---

## (b) Gaps

- Whether NFPA 855 is referenced by NBC/NFC 2020, BC Building/Fire Code 2024, NBC(AE)/NFC(AE) 2023, the Vancouver Building By-law or Vancouver Fire By-law. Not found; this is the main approvals gap.
- What CE Code 2024 Section 64 says for non-residential ESS, and whether BC and Alberta have adopted CE Code 2024 (Technical Safety BC bulletin rescinded Mar 2025).
- BC and Alberta fire department setbacks for urban BESS (only a Seattle analogue found).
- PNNL 1 MW and 10 MW installed costs, and any 2024 PNNL update; Canadian-dollar costs.
- Typical UPS runtime from a non-vendor source; battery wear from grid services on UPS batteries (Alaperä et al. not retrieved).
- Whether BC Hydro DR for Business accepts batteries (manual is silent); the "$10,000 × kW" ESI wording.
- RS 1830 transmission demand charge; Alberta (EPCOR / FortisAlberta) demand charges; AESO reserve price history.
- Modern (Tier 2/4) genset NOx and PM factors; HVO effect on NOx and PM; genset and fuel-cell footprints and sound levels.
- Metro Vancouver treatment of stationary emergency gensets (Bylaw 1082 s. 7(9) wording, Bylaw 1329 scope); City of Edmonton noise bylaw limits.
- Fossil diesel reference CI under BC Low Carbon Fuels rules.
- Building-scale chilled-water and ice TES costs; tank heights; water density at temperature.
- Absorption chiller $/kW from a government or lab source; COP at 70–90 °C from a peer-reviewed table (Ebrahimi 2014 table not read).
- Fuel cell cost and efficiency after 2015 (DOE status page shows 2015 status / 2020 targets only).
- Any documented Canadian data centre using its UPS for grid services or replacing diesel.

---

## (c) For J.B. to retrieve (blocked or not reachable by fetch)

- BC renewable and low-carbon gas supply potential study, 2022 (FortisBC-hosted PDF; fetch refused, URL came from BCBN page): https://www.cdn.fortisbc.com/libraries/docs/default-source/about-us-documents/renewable-gas-study-final-report-2022-01-28.pdf?sfvrsn=cb5ca1fd_0
- Microsoft hydrogen fuel cell backup post (operator claim; fetch refused): https://news.microsoft.com/innovation-stories/hydrogen-fuel-cells-could-provide-emission-free-backup-power-at-datacenters-microsoft-says/
- LUT University thesis on BESS secondary applications / data-centre UPS (access denied, anti-bot page): https://lutpub.lut.fi/handle/10024/160350
- Ebrahimi, Jones, Fleischer 2014 full text (temperature table for absorption, ORC, etc.): https://doi.org/10.1016/j.rser.2013.12.007
- PNNL-33283 Tables 4.2–4.4 (LFP/NMC costs at 1 MW and 10 MW; RTE; cycle life): https://www.sandia.gov/app/uploads/sites/256/2024/02/ESGC-Cost-Performance-Report-2022-PNNL-33283.pdf
- PNNL cost database (interactive LFP tab, 2024 values): https://www.pnnl.gov/projects/esgc-cost-performance
- Federal Off-road CI (Mobile and Stationary) regulations SOR/2020-258, application s. 3, 5 and coming into force s. 79: https://laws-lois.justice.gc.ca/eng/regulations/SOR-2020-258/page-1.html
- Metro Vancouver Bylaw 1082 (check s. 7(9) wording and current consolidation): https://metrovancouver.org/boards/Bylaws/MVRD_Bylaw_1082.pdf
- City of Edmonton noise bylaw text (dBA limits, generators): https://edmonton.ca/city_government/bylaws/noise
- Codes Canada / NRC proposed changes on ESS (NFC): https://nrc.canada.ca/en/certifications-evaluations-standards/codes-canada/codes-development-process/public-review/proposed_changes_index.html
- BC Fire Code 2024 and BC Building Code 2024, ESS / battery provisions (no URL found; BC Codes site)
- CE Code 2024 Section 64 rule text (paywalled at CSA): https://www.csagroup.org/store/product/2431257ol
- NFPA 855 (2026 edition) Annex C and separation tables (paywalled; free read-only access at nfpa.org)
- AESO ancillary services price history (Watt-Ex / AESO reports): https://aeso.ca/market/ancillary-services/operating-reserve/
