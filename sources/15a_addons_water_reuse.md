# 15a — Add-ons: water reuse (greywater, blackwater, blowdown reuse, reclaimed water as cooling make-up)

Prepared 14 October 2026 for the Beyond Data tool (Vancouver and Edmonton, 0.1–40 MW IT).
Bullet format: value · unit · what it means · source (title, publisher, year, section/page, URL) · source type · status.
"Verified" means the value was read on the opened page in this session (through the fetch tool's extraction). It has not been checked against a printed copy. Page numbers come from the extraction and should be spot-checked before they are cited in the thesis.
Conversions that I did myself (gal→L, °F, unit arithmetic) are marked "(my conversion)".

---

## 0. Cross-cutting: cooling-tower water balance (needed by all four add-ons)

- **Make-up = Evaporation + Blowdown + Drift (+ leaks/overflow)** · formula · the tower's whole water draw · *Best Management Practice #10: Cooling Tower Management*, US DOE Federal Energy Management Program (FEMP), 2013 (modified 2026), https://www.energy.gov/node/849241 ; also EPA *WaterSense at Work* §6.3 Cooling Towers, Eq. 6-3, p. 6-10, 2023, https://www.epa.gov/system/files/documents/2023-05/ws-commercial-watersense-at-work_Section_6.3_Cooling_Towers.pdf · government guidance (US) · verified
- **Cycles of concentration C = make-up ÷ blowdown (≈ conductivity blowdown ÷ conductivity make-up)** · ratio · how many times the dissolved solids concentrate before they are bled off · EPA WaterSense at Work §6.3, Eq. 6-4 and 6-5, p. 6-10 to 6-11 · government guidance (US) · verified
- **Derived: Blowdown = Evap ÷ (C − 1); Make-up = Evap × C ÷ (C − 1)** · formula · follows algebraically from the two lines above when drift is negligible (my derivation, not stated in EPA text) · same · derived
- **2 to 4 cycles typical; 6 or more possible** · cycles · normal operating range · FEMP BMP #10; EPA WaterSense §6.3 p. 6-14 · government guidance (US) · verified
- **3 → 6 cycles cuts make-up by 20% and blowdown by 50%** · % · effect of better water treatment · FEMP BMP #10; EPA WaterSense §6.3 p. 6-14 · government guidance (US) · verified
- **Evaporation ≈ 1% of recirculating flow per 10 °F (≈5.6 K) range** · rule of thumb · evaporation estimate from flow and temperature drop · EPA WaterSense §6.3 pp. 6-8 to 6-9 · government guidance (US) · verified
- **Evaporation = Q × f_latent ÷ h_fg, with f_latent = 0.9 and h_fg ≈ 1,010 Btu/lb (≈2,349 kJ/kg, my conversion)** · formula · heat-balance estimate of evaporated water · Bill Powers, P.E., *Calculation of Effect of Cycles of Concentration on Amount of Makeup Water…Diablo Canyon*, submitted to California State Water Resources Control Board, 25 Nov 2013, https://waterboards.ca.gov/water_issues/programs/ocean/cwa316/rcnfpp/docs/121813mtg/calculation_makeup.pdf · **expert submission in a regulator docket (not on the allowed list as an authority; physics only)** · UNVERIFIED against a primary engineering reference (ASHRAE Handbook or steam tables needed). With these values: 3,600 kJ/kWh × 0.9 ÷ 2,349 kJ/kg ≈ **1.38 L per kWh of heat rejected** (my arithmetic).
- **US data-centre average site WUE "just over 0.36 L/kWh" through 2023, rising to 0.45–0.48 L/kWh after 2023; hyperscale median 0.32 L/kWh; some adiabatic airside systems 0.1–0.3 L/kWh** · L/kWh · on-site water per unit of energy · Shehabi et al., *2024 United States Data Center Energy Usage Report*, LBNL-2001637, Lawrence Berkeley National Laboratory, Dec 2024, Fig. 4.5 p. 48, Fig. 4.7 p. 49 (read from copy at https://climate.mit.edu/sites/default/files/2025-02/lbnl-2024-united-states-data-center-energy-usage-report.pdf ; landing page https://eta-publications.lbl.gov/publications/2024-lbnl-data-center-energy-usage-report) · national lab · verified (values); the WUE denominator (assumed to be IT energy, per The Green Grid definition) is UNVERIFIED in this pass. The per-cooling-type ranges (Fig. 4.4, p. 47) are in a figure only and were not readable: **for J.B.**
- **Water use per kWh of server electricity varies >1,000-fold across workloads** · ratio · warns against a single coefficient · Lei, Lu, Shehabi, Masanet, *The water use of data center workloads: A review and assessment of key determinants*, Resources, Conservation and Recycling 219:108310, 2025, doi:10.1016/j.resconrec.2025.108310 (abstract via https://eta-publications.lbl.gov/bibcite/reference/36749) · peer-reviewed · verified (abstract only)
- **US data centres ≈1.7 billion L/day direct consumption; "in some cases 57% sourced from potable water"; fewer than a third of operators measure water** · L/day, % · scale of the issue · Mytton, *Data centre water consumption*, npj Clean Water 4, 2021, doi:10.1038/s41545-021-00101-w (abstract via https://doaj.org/article/06d1d06402ae4521b35a9a9b2cb96233) · peer-reviewed · verified (abstract only)

---

## 1. Greywater recycling

**What it is:** collecting lightly used water from showers, basins and laundry (not toilets or, in most definitions, kitchens), treating it on site, and reusing it for non-drinking uses such as toilet flushing, irrigation or cooling-tower make-up.

### 1.2 Sizing
- **Residential greywater ≈ 98 L/person/day (26 gpcd), about 45% of indoor use; toilet-flushing demand ≈ 53 L/person/day (14 gpcd)** · L/person/day · how much greywater a neighbour population yields and how much it could flush · National Academies of Sciences, Engineering, and Medicine, *Using Graywater and Stormwater to Enhance Local Water Supplies*, 2016, Ch. 3, Fig. 3-1, https://www.nationalacademies.org/read/21866/chapter/5 · peer-reviewed consensus report (US data, nine North American cities) · verified
- **Greywater for toilet flushing alone cuts indoor demand by about 24%** · % · household-scale effect · same, Ch. 3 text · peer-reviewed consensus report · verified
- **Offices produce little greywater: showers <1% and toilets 10% of an office building's water use (Fort Collins case)** · % · a data centre or office will not generate meaningful greywater itself; neighbours (housing, gyms, hotels) are the source · same, Ch. 3, Fig. 3-5 discussion (citing Vandegrift 2014) · peer-reviewed consensus report · verified
- **Vancouver water use: 410 L/person/day average in 2023 (442 L 2019 baseline; 2030 target 376 L)** · L/person/day · total per-capita demand context · City of Vancouver, *Rainwater Management to Facilitate New Housing*, RTS 16455, 15 Oct 2024, p. 3 and fn. 4, https://council.vancouver.ca/20241112/documents/r3.pdf · government report · verified (note: this is total use per resident, not greywater)
- **Greywater MBR energy 0.75–1.1 kWh/m³ (treatment only, excludes distribution)** · kWh/m³ · electricity row · Arden, Morelli, Cashman, Ma, Jahne, Garland, *Onsite Non-potable Reuse for Large Buildings*, Water Research 191:116635, 2021, doi:10.1016/j.watres.2020.116635, Results (Fig. 3a discussion), https://pasteur.epa.gov/uploads/10.23719/1519028/Arden%20et%20al.%2C%202021.pdf · peer-reviewed (US EPA authors) · verified
- **Modelled building GWMBR capacity 3.6–54.7 m³/day (959–14,445 gpd)** · m³/day · realistic range of building greywater plants · Arden et al. 2021, Table 1 (my conversion) · peer-reviewed · verified
- **Cost parity with potable water only where local water+sewer price ≥ US$9 per 1,000 gal (≈US$2.38/m³); reached in 9% of modelled cases; "strong economies of scale"; MBRs more competitive above ~1,900 m³/yr** · US$/m³ · cost row · Arden et al. 2021, Fig. 5a–5b · peer-reviewed · verified. Note the paper's Conclusions reverse the $7/$9 figures; the Results text was used here.
- **Capex $/m³ capacity, opex $/m³, footprint m² per m³/day** · — · not found in an allowed source · UNVERIFIED / gap

### 1.3 Rules
**Vancouver**
- **Building By-law 2019 (consolidated to 25 July 2023), Div. B, Art. 2.7.1.2(2): a non-potable water system shall not collect groundwater, perimeter drainage, greywater or blackwater; allowed sources are rainwater and clear-water waste** · rule · greywater reuse was not an acceptable solution under the 2019 by-law · Vancouver Building By-law 2019, Div. B, Part 2, §2.7, https://free.bcpublications.ca/civix/document/id/public/vpbl2019/734749594 · regulation · verified
- **Building By-law 2025 (By-law 14343, in force 15 Sept 2025, amended by By-law 14488 from 1 Jan 2026) defines "alternate water source system", "greywater" and "blackwater"; water safety summary 25-202: "Residential greywater reuse systems certified to NSF 350 Class R may be installed" with no operating permit or water-quality reporting; Table 1.3.1.2 references NSF 350 at Sentence 2.7.1.2.(3)** · rule · greywater now has a defined path, at least for residential NSF 350 systems · City of Vancouver, *2025 VBBL Book II insert pages*, https://vancouver.ca/files/cov/2025-vbbl-book-II-insert-pages.pdf · regulation · verified for these statements; **the text of Art. 2.7.1.2 and 2.7.1.3 (which sources and uses are permitted for non-residential greywater or blackwater, and whether cooling-tower make-up is permitted from them) was not in the insert pages: for J.B.**
- **Under the 2019 regime greywater and blackwater systems "Require Alternative Solutions"; VCH consultation recommended to determine whether a health permit is needed** · process · approval route before 2025 · Mistick, *Local Industrial and Commercial Applications for On-Site Alternative Water Systems*, UBC Sustainability Scholars report for Vancouver Economic Commission and City of Vancouver, 2018, §1.3, §2.1, https://www.sustain.ubc.ca/sites/default/files/2018-47%20Local%20Industrial%20%26%20Commercial%20Applications%20for%20On-Site%20Alternative%20Water%20Systems_Mistick.pdf · student report for the City (not peer-reviewed; use only as a pointer) · verified that the report says this
- Operating, commissioning and water-quality rules for any alternate water source system (Vancouver): see §4.3 below.

**BC**
- **2024 BC Plumbing Code: non-potable systems may serve water closets, urinals, trap-seal primers and below-ground irrigation; harvested rainwater must be treated** · rule · province-wide baseline; the bulletin does not mention greywater, CSA B128.1 or B128.3 · BC Building and Safety Standards Branch, Bulletin P24-01, 2 April 2024, https://www2.gov.bc.ca/assets/gov/farming-natural-resources-and-industry/construction-industry/building-codes-and-standards/bulletins/2024-code/p24-01_2024_bc_plumbing_code.pdf · government bulletin · verified. Full BCPC 2024 §2.7 text: **for J.B.**
- **CSA B128.3 (Performance of non-potable water reuse systems), current edition B128.3:23** · standard · treatment-system performance classes · listing at Standards Council of Canada, https://scc-ccn.ca/standardsdb/standards/4031961 · standard · title verified; class limits are behind a paywall: **for J.B.**

**Alberta / Edmonton**
- **Alberta: no regulations or codes yet reduce greywater health risks; a reclaimed-water working group is developing them; the plumbing code allows approved reclaimed wastewater systems for toilet/urinal flushing or underground irrigation** · rule status · greywater needs a site-specific route · Government of Alberta, *Reclaimed water* web page, https://www.alberta.ca/reclaimed-water · government · verified (page undated in extraction)
- **STANDATA P-17-01-NPC15 (Jan 2017, now marked "Archived"): uncertified (engineer-sealed) or CSA B128.3-12 Class A certified reclaimed water systems accepted for toilet/urinal flushing and subsurface irrigation within a single property, only where the municipality accepts oversight; other uses need a site-specific variance; plumbing permit required; monitoring plan to a Safety Codes Officer** · rule · approval path · Alberta Municipal Affairs, https://open.alberta.ca/dataset/42295e2f-cf70-44e4-bac9-7a027c4a0c5e/resource/50a4b829-e50b-40fb-9883-351b9a2b1e0f/download/p-17-01-reclaimedwatersystemssingleproperty.pdf · regulation (code interpretation) · verified; whether a replacement STANDATA exists is UNVERIFIED (Plumbing STANDATA index https://www.alberta.ca/plumbing-standata — for J.B.)
- **Class A quality (STANDATA Table 1; same as Health Canada): BOD5 median ≤10 / max ≤20 mg/L; TSS ≤10 / ≤20 mg/L; turbidity ≤2 / ≤5 NTU; E. coli non-detect / ≤200 CFU/100 mL; total chlorine residual 0.5–2 mg/L** · limits · toilet-flushing quality · STANDATA P-17-01 Table 1; Health Canada, *Canadian Guidelines for Domestic Reclaimed Water for Use in Toilet and Urinal Flushing*, 2010, §2.0 Table 1, https://www.canada.ca/en/health-canada/services/publications/healthy-living/canadian-guidelines-domestic-reclaimed-water-use-toilet-urinal-flushing/canadian-guidelines-domestic-reclaimed-water-use-toilet-urinal-flushing-page-5.html · regulation / federal guideline · verified
- **Alberta Health log₁₀ reduction targets (virus/protozoa/bacteria), greywater community system: cooling towers and evaporative condensers 4.0 / 2.0 / 2.0; toilet and urinal flushing 5.0 / 3.0 / 3.5. Single-family greywater: cooling 3.0 / 0 / 0; toilets 5.0 / 0 / 0** · log₁₀ · treatment train must achieve these · Alberta Health, *Public Health Guidelines for Water Reuse and Stormwater Use*, Jan 2021, App. B Tables B-2 (p. 34) and B-3 (p. 35), https://open.alberta.ca/dataset/6a57d29c-d437-4dd9-94e3-d96bedc01bb4/resource/d533afcb-2933-43da-9199-eea030148c00/download/health-public-health-guidelines-water-reuse-stormwater-use-2021.pdf · government guideline · verified
- **Alberta Health: cooling towers are a "medium exposure" end use; Legionella grows at 25–45 °C; controls include disinfectant residual and drift eliminators; a Water Quality Management Plan (WQMP) goes for review before construction and in full to the authority having jurisdiction after commissioning** · rule · approvals row · same, Table 3 p. 13; §3.4.2 p. 22; Table 5 p. 23; §1.4.2 p. 9; §3.6 p. 24; §5.9 p. 30 · government guideline · verified
- Edmonton/EPCOR-specific greywater bylaw provisions: none found · gap

---

## 2. Blackwater / on-site wastewater treatment and reuse

**What it is:** treating all of a building's or district's sewage (including toilet waste) on site, usually with a membrane bioreactor plus disinfection, to non-potable quality for reuse.

### 2.2 Sizing
- **Mixed wastewater MBR energy 0.94–1.28 kWh/m³ (treatment only)** · kWh/m³ · electricity row · Arden et al. 2021, Results (Fig. 3a discussion) · peer-reviewed · verified
- **Larger MBRs 0.97–3.87 kWh/m³ (Kavvada et al. 2016, cited in Arden)** · kWh/m³ · district-scale range · cited secondhand in Arden et al. 2021 · peer-reviewed (secondary) · UNVERIFIED (original not opened: Kavvada et al., Environ. Sci. Technol. 2016)
- **In-building blackwater MBBR (Darling Quarter, Sydney): ~7.2 kWh/m³ at start, ~4 later, ~4.6 average** · kWh/m³ · small plants can be as energy-hungry as desalination · Mitchell et al., *Saving water and spending energy?*, Institute for Sustainable Futures, UTS, for the Australian Water Recycling Centre of Excellence, 2013, Fig. 2, https://uts.edu.au/sites/default/files/2021-04/ISF019_AWRC_T2_Saving-Water-Spending-Energy_4-2.pdf · university research report (not peer-reviewed) · verified that the report states this
- **WWMBR building capacity 8.0–120.8 m³/day modelled; cost parity where local water+sewer ≥ US$7 per 1,000 gal (≈US$1.85/m³), reached in 19% of cases; thermal recovery cuts MBR NPV by 8–10%** · m³/day, US$/m³ · cost row · Arden et al. 2021, Table 1, Fig. 5 · peer-reviewed · verified
- **Log₁₀ reduction targets for untreated municipal wastewater (Alberta): cooling towers 4.5 / 4.0 / 4.5; toilets 5.5 / 5.0 / 5.5 (virus/protozoa/bacteria)** · log₁₀ · blackwater needs much more treatment than greywater · Alberta Health 2021, Table B-1, p. 33 · government guideline · verified
- **San Francisco LRTs for comparison (indoor use): blackwater 8.5 / 7.0 / 6.0; greywater 6.0 / 4.5 / 3.5; biological treatment required for both to reach BOD 25 mg/L; "cooling tower make-up" an eligible use** · log₁₀ · US benchmark, not binding in Canada · SFPUC, *Onsite Water Reuse Guidebook*, 2025, pp. 8, 16, 35, https://www.sfpuc.gov/sites/default/files/documents/OnsiteWaterReuseGuide2025.pdf · utility guidance (US) · verified
- **Commercial toilet/urinal flushing can offset up to 75% of indoor water use; multi-family up to 40%** · % · upper bound of indoor substitution · SFPUC 2025, p. 1 · utility guidance (US) · verified
- Footprint m², capex, opex, sound for building MBRs: not found · gap

### 2.3 Rules
- **BC Sewerage System Regulation covers only systems with design domestic flow < 22,700 L/day (or single-family/duplex); it does not address reuse** · threshold · above this, or for reclaimed water from a wastewater facility, the Municipal Wastewater Regulation applies · *Sewerage System Regulation*, B.C. Reg. 326/2004, s. 2, https://free.bcpublications.ca/civix/document/id/complete/statreg/326_2004 · regulation · verified
- **BC Municipal Wastewater Regulation applies to "all uses of reclaimed water" (except single-family/duplex systems); registration must state the s.104 exposure category; health officer approval where required** · rule · on-site blackwater reuse above the SSR scope must register under the MWR · B.C. Reg. 87/2012, ss. 1, 4(4), 10, 12(c), 14(1)(c), https://free.bcpublications.ca/civix/document/id/complete/statreg/87_2012 · regulation · verified
- **MWR s.104: "lower exposure potential" includes uses that are "commercial or industrial in nature" with educated users and restricted access** · category · a data-centre cooling tower would plausibly fall here, but the regulation does not name cooling towers (my reading, UNVERIFIED with the Ministry) · B.C. Reg. 87/2012, s. 104 · regulation · verified text; classification of cooling towers UNVERIFIED
- **MWR Table 13 effluent quality — Greater exposure: CBOD5 10 mg/L, TSS 10 mg/L, turbidity avg 2/max 5 NTU, fecal coliform median <1 CFU (max 14)/100 mL. Moderate: CBOD5 25, TSS 25, FC median 100 (max 400). Lower: CBOD5 45, TSS 45, FC median 200 (max 1,000). pH 6.5–9** · mg/L, NTU, CFU/100 mL · treatment target by category · B.C. Reg. 87/2012, s. 108, Table 13 · regulation · verified
- **MWR: chlorine residual ≥0.5 mg/L at point of use (s. 113(2)); fecal coliform <14/100 mL where frequent worker contact in moderate/lower categories (s. 112); monitoring weekly CBOD5/TSS/flow, weekly FC for lower category, quarterly reporting (s. 118, Table 14); continuous monitoring for greater exposure (s. 119)** · rule · opex/approvals row · B.C. Reg. 87/2012 · regulation · verified
- Vancouver 2025 by-law treatment of non-residential blackwater: Art. 2.7.1.2 text not obtained · **for J.B.**
- Alberta: as §1.3 (STANDATA P-17-01; Alberta Health WQMP). Blackwater reuse beyond toilets/subsurface irrigation needs a site-specific variance · verified (STANDATA)

---

## 3. Treated blowdown reuse

**What it is:** treating the concentrated water bled from a cooling tower (for example with filtration and reverse osmosis) and returning the cleaned part to the tower as make-up, so less fresh water is drawn and less is sent to sewer.

### 3.2 Sizing
- **Blowdown recovery skid (side-stream filtration, carbon, RO, demineralisation, antiscalant): blowdown cut 53%, make-up cut 16%; with partial softening blowdown cut 60%; cycles rose 2.8 → 4.9** · % · water rows · US GSA Green Proving Ground, *Blowdown Recovery System for Cooling Towers*, Findings GPG-052, Aug 2023 (evaluation by NREL), pp. 3–4, https://www.gsa.gov/system/files/GPG%20Findings-052-Blowdown%20Recovery-14Sep23.pdf · government report with national-lab evaluation · verified. Vendor's "up to 93%" = operator (manufacturer) claim, not used.
- **Electricity 0.404 kW continuous; +3,541 kWh/yr** · kW, kWh/yr · electricity row (for a 200–1,000 ton tower, ≈0.7–3.5 MW_th, my conversion at 3.517 kW/ton) · same, p. 4 · government/national lab · verified
- **Capex US$35,403 equipment + US$11,422 installation (≈US$46,825); maintenance US$475/yr; payback 2.86 yr at 3 million ton-h/yr and US$16.76/kgal** · US$ · cost row · same, p. 3 · government/national lab · verified. Payback relies on a US water rate and is not transferable to Vancouver/Edmonton.
- **Footprint: ships in a crate through a 3-ft door; installed in 2 days** · qualitative · small floor-area impact · same, p. 4 · verified
- **Savings are highest for hard water with conductivity < 500 µS/cm** · condition · Vancouver water is soft (value for Vancouver/Edmonton make-up hardness not obtained here — see 01/04 reports or gap) · same, p. 3 · verified
- Peer-reviewed RO-on-blowdown recovery rates were not opened (search found only trade-press items) · gap

### 3.3 Rules (discharge side)
- **Metro Vancouver Sewer Use Bylaw 299: prohibited to raise waste entering a sewage facility to ≥40 °C, or discharge non-domestic waste ≥65 °C; "High Volume Discharge" (>300 m³ in 30 days or >30 L/min) needs a permit; pH 5.5–10.5; uncontaminated water into a sewer needs a permit** · rule · blowdown and RO reject go to sewer under these limits · GVS&DD Sewer Use Bylaw No. 299, 2007, consolidated to 28 July 2023, s. 3.1, s. 5.1, Sched. A s. 4, Sched. B, https://metrovancouver.org:443/boards/Bylaws/GVSDD_Bylaw_299_Consolidated.pdf · regulation · verified
- **EPCOR Drainage Services Bylaw 18100: non-contact cooling water to sanitary/combined sewer only with EPCOR's prior written approval; any non-EPCOR-source water >1 m³/day needs approval** · rule · Edmonton discharge of blowdown/RO reject · City of Edmonton Bylaw 18100, consolidated 19 Feb 2020, Sched. 2 ss. 5.8(b), 5.10(f), 5.10(i), https://www.edmonton.ca/residential_neighbourhoods/Bylaws/C18100.pdf · regulation · verified; temperature and chemical limits (appendices) were not in the extracted text: **for J.B.**
- **Vancouver: cooling towers need an operating permit (Building By-law 2.8.2.1, from 1 Jan 2020)** · rule · applies to any evaporative option · By-law No. 12346 (amending Building By-law 10908), 18 Dec 2018, https://bylaws.vancouver.ca/consolidated/12346.PDF · regulation · verified. Current 2025 article is 2.2.11.6 with Legionella testing by ISO 11731 (2025 VBBL insert pages, Table 2.2.1.7) · verified; the numerical Legionella limit for cooling towers in 2.2.11.6 was not obtained: **for J.B.**

---

## 4. Reclaimed / recycled water as cooling make-up

**What it is:** using municipal wastewater that has been treated (at a central plant or a local sewer-mining plant) instead of drinking water to top up cooling towers.

### 4.2 Sizing and water quality
- **Coverage: technically up to 100% of make-up can be reclaimed water (FEMP lists "High-quality municipal wastewater effluent or recycled water (where available)" as make-up)** · % · upper bound for the tool · FEMP BMP #10 · government guidance (US) · verified (the 100% bound is my reading; operator cases below show 74–99%)
- **Secondary municipal effluent as make-up (pilot): NH₃-N 24.1 mg/L, alkalinity 123, TOC 26.5, TDS 644, PO₄ 9.98 mg/L; with nitrification + sand filtration NH₃-N 1.42, alkalinity 25.1, TDS 362** · mg/L · contaminants that matter: ammonia (corrosion of copper alloys), phosphate and carbonate (scale), organics (biofouling) · Dzombak, Vidic, Landis et al., *Use of Treated Municipal Wastewater as Power Plant Cooling System Makeup Water*, final report to US DOE National Energy Technology Laboratory, Sept 2012, DE-NT0006550, Table 2.3.1 p. 2-13, pp. ES-1 to ES-3, https://digital.library.unt.edu/ark:/67531/metadc830795/m2/1/high_res_d/1063876.pdf · national-lab-funded research report (OSTI 1063876) · verified
- **Pilot towers ran at 4–6 cycles on treated municipal wastewater** · cycles · use C = 4 as the central case for reclaimed make-up · same, p. 2-9 · verified
- **Chemistry: monochloramine residual 2–3 ppm (biocide); tolyltriazole 4–5 ppm (copper corrosion); PMA 5 ppm (scale)** · ppm · opex/chemicals · same, Abstract and ES-1 to ES-2 · verified
- **Life-cycle cost of tertiary-treated municipal wastewater incl. conditioning chemicals US$0.91–1.32 per 1,000 gal (2009$) ≈ US$0.24–0.35/m³ (my conversion), vs average city water US$2.95/1,000 gal** · US$/m³ · cost row (large power plant scale, 7.75 Mgal/d) · same, p. ES-3 · verified; scale is far larger than 0.1–40 MW data centres
- **ISO 22449-1:2020, Use of reclaimed water in industrial cooling systems — Part 1: Technical guidelines** · standard · the international standard for this add-on · title seen in search results only · standard · UNVERIFIED content (paywalled): **for J.B.**

### 4.3 Rules
**Vancouver / Metro Vancouver**
- **Vancouver Building By-law (2019, consolidated 25 July 2023), Table 2.7.1.3: cooling-tower make-up, adiabatic cooling and hydronic make-up are permitted optional uses of non-potable water from rainwater/clear-water waste; non-potable water "shall not be used in lieu of potable water for any other uses"** · rule · cooling make-up is an allowed non-potable use in Vancouver · https://free.bcpublications.ca/civix/document/id/public/vpbl2019/734749594 · regulation · verified (extraction notes the table layout was hard to read; confirm column assignment)
- **Alternate water source system quality (Table 2.7.7.1): temperature <20 °C (continuous); turbidity <10 NTU (daily); E. coli <100 CFU or MPN/100 mL and Legionella pneumophila <10 CFU/mL (lab sample every 2 months, ≤63 days apart)** · limits · monitoring opex · same · regulation · verified
- **Failure response (Table 2.7.7.3): E. coli ≥100 or Legionella ≥10 or turbidity >15 NTU or temperature >25 °C → switch to potable only, notify CBO within 24 h, retest 48 h–5 days after cleaning** · rule · resilience: potable back-up must be sized at 100% · same · verified
- **Commissioning: E. coli and turbidity weekly for 4 weeks, Legionella once; operating permit before occupancy; reports to CBO every 2 months; records kept 24 months; potable make-up via air gap ≥2× opening; meters on potable make-up and non-potable outlet** · rule · approvals/time row (≥4 weeks commissioning after construction) · same, Arts. 2.7.5.2, 2.7.5.3, 2.7.7.1–2.7.7.2; By-law 12346, 2.7.6.4, 2.7.6.8 · regulation · verified
- **Metro Vancouver Interim Reclaimed Water Policy UT-019 (29 Sept 2023): will consider supplying reclaimed water at the "Highest Level of Non-Potable Treatment" (= MWR "greater exposure potential") for listed uses including "industrial uses"; case-by-case; pricing to reflect social, financial and environmental benefits; no volumes or prices set; cooling not named** · policy · a regional supply path exists but is untested for data centres · https://metrovancouver.org/boards/Policies/interim-reclaimed-water.pdf · utility policy · verified
- MWR quality and monitoring tables: see §2.3 · verified

**Alberta / Edmonton**
- **Alberta Health 2021 covers "cooling towers and evaporative condensers" as an end use (medium exposure); municipal wastewater LRT 4.5 / 4.0 / 4.5; closed-loop cooling where public exposure is improbable is excluded** · rule · see §1.3, §2.2 · verified
- **Alberta Environment and Protected Areas: the Water Act "may not currently lay out a process or have specific tools to authorize reusing licensed water"; interim guidance uses an "authorizing letter from a regulator" to recognise transfer of treated wastewater to another party; "Other uses or secondary users are not permitted unless expressly authorized"** · rule · a data centre taking EPCOR effluent needs a water-licence pathway, not only a plumbing one · Government of Alberta EPA, *Alternative Water Sources and Wastewater Reuse: Water Availability Engagement*, Oct 2024, https://alberta.ca/system/files/epa-alternative-water-sources-wastewater-reuse.pdf · government · verified
- **EPCOR Gold Bar WWTP: average 265 ML/day, design 310 ML/day; operates a "membrane-based wastewater recycling facility which supplies local industry with reclaimed water"** · ML/day · Edmonton has an existing reclaimed-water supply to industry · EPCOR, *Gold Bar operations*, https://epcor.com/ca/en/ab/edmonton/operations/water-wastewater/gold-bar-wastewater-treatment-plant/gold-bar-operations.html · **operator claim (utility web page)** · verified that EPCOR states it; volumes, recipient and price not given (trade-press articles name a refinery; not citable) · gap

### 4.4 Documented data-centre cases (all operator claims)
- **Google: "We utilize reclaimed or non-potable water at more than 25% of our data center campuses"; Douglas County, Georgia recycles municipal wastewater; average Google data centre consumed ~450,000 gal/day (≈1.7 ML/day, my conversion) in 2021** · operator claim · Google, *Our commitment to climate-conscious data center cooling* (undated, c. 2022), https://blog.google/outreach-initiatives/sustainability/our-commitment-to-climate-conscious-data-center-cooling/ · operator claim · verified that Google states it
- **Microsoft: Quincy 74%, Singapore 99%, San Antonio 79% "recycled, reused or non-potable water sources"; average WUE 2.3 → 0.27 L/kWh (2025)** · operator claim · Priest and Solomon, *Inside Microsoft's two-decade push to cut water intensity…*, Microsoft blog, 24 June 2026, https://blogs.microsoft.com/blog/2026/06/24/inside-microsofts-two-decade-push-to-cut-water-intensity-while-scaling-for-growth/ · operator claim · verified that Microsoft states it
- No Canadian (BC/Alberta) data centre using reclaimed or greywater for cooling was found · gap

---

## 5. Two-way exchange

**The place gives the data centre (water in)**
- Neighbour greywater → data-centre make-up: Alberta Health gives LRTs specifically for greywater-to-cooling-tower (community system 4.0 / 2.0 / 2.0), lower than for toilet flushing (5.0 / 3.0 / 3.5), so cooling make-up is one of the least demanding uses for greywater · Alberta Health 2021, Table B-3 · verified. But STANDATA P-17-01 applies only "within a single property"; cross-property supply needs a variance in Alberta (my reading of the title and scope, UNVERIFIED with Municipal Affairs). In Vancouver, the alternate water source system is defined per building; cross-property supply is not addressed in the text read · UNVERIFIED / gap.
- Municipal effluent → data centre: Metro Vancouver UT-019 (case-by-case, industrial uses listed) and EPCOR Gold Bar (existing membrane reuse to industry) are the two real channels · verified (policy/operator claim).
- Sewer mining (taking raw sewage from a local sewer and treating it on site): energy as blackwater MBR (0.94–1.28 kWh/m³ building scale; 0.97–3.87 larger, secondhand) · see §2.2.

**The data centre gives the place (water or heat out)**
- Treated (RO) blowdown permeate to neighbours for toilet flushing or irrigation: no source found describing this; would have to meet Health Canada/B128.3 Class A or Vancouver Table 2.7.7.1 · UNVERIFIED concept.
- Water saved: the make-up volume displaced by reclaimed water is potable supply freed for the city (at Vancouver's 410 L/person/day, 1,000 m³/day ≈ 2,400 residents' total use — my arithmetic from the City figure) · derived.
- **Wastewater heat recovery: Metro Vancouver Policy UT-008 (2017, rev. 29 July 2022) — access to untreated sewage in regional sewers "on a first-come first-served basis"; the heat user pays all access, maintenance and operating costs; private entities need a letter of support from the host municipality; projects on municipal sewers do not need GVS&DD approval** · rule · https://metrovancouver.org/boards/Policies/sewage-and-waste-heat-recovery.pdf · utility policy · verified. Temperature-drop or minimum-flow limits are not in the policy · gap.
- **Southeast False Creek NEU: 2024 expansion added 6.6 MW of sewage heat recovery capacity; ~70% of the utility's energy is renewable, "mostly from sewage heat recovery"** · MW, % · local precedent · City of Vancouver, https://vancouver.ca/home-property-development/southeast-false-creek-neighbourhood-energy-utility.aspx · government (operator of the utility) · verified
- A data centre adding heat to sewers is capped by Bylaw 299: may not raise waste entering a sewage facility to ≥40 °C · verified (§3.3). Edmonton equivalent and EPCOR sewer-heat policy: not found · gap.
- Interaction note: sewage heat recovery and a data centre both supply low-grade heat; they compete for the same district-energy customers (my reasoning, not sourced).

---

## 6. Effects on other rows when an add-on is added

| Row | Greywater (from neighbours) | Blackwater / sewer mining | Blowdown recovery | Reclaimed make-up (utility) |
|---|---|---|---|---|
| Potable water use (L/yr) | − treated volume (≤ make-up) | − treated volume | − 16% of make-up (GSA/NREL) | − up to 100% of make-up (FEMP; operator cases 74–99%) |
| Sewer discharge (L/yr) | neighbours' sewer flow − treated volume | − treated volume | − 53% of blowdown (GSA/NREL); RO reject still goes to sewer | blowdown may rise if C falls (C 4–6 on reclaimed, NETL) |
| Electricity (kWh/yr) | + 0.75–1.1 kWh/m³ (Arden) | + 0.94–1.28 kWh/m³ (Arden); up to ~4.6 small plant (ISF) | + 0.404 kW ≈ 3,541 kWh/yr per skid | + pumping only (not quantified) — gap |
| Floor area (m²) | gap | gap | small (fits 3-ft door) | ~0 on site (pipe connection) |
| Capex | gap (economies of scale) | gap | ≈US$46.8k per 200–1,000 ton tower | pipeline cost — gap |
| Opex | parity at ≥US$2.38/m³ water+sewer price | parity at ≥US$1.85/m³ | US$475/yr + energy | US$0.24–0.35/m³ (2009$, power-plant scale) + chloramine/inhibitor dosing |
| Carbon | treatment kWh × grid factor (see 04) | same | same | same |
| Sound | blowers/pumps — gap | gap | gap | none on site |
| Approvals / time | Van: 2025 VBBL path (text needed); AB: STANDATA variance + Alberta Health WQMP | BC: MWR registration (+SSR if <22.7 m³/d); AB: variance + WQMP | Sewer permit (Bylaw 299 / EPCOR) | Van: UT-019 case-by-case + MWR; AB: Water Act authorising letter; both: ≥4 weeks commissioning (Van) |

---

## (a) Proposed tool quantities (ready for the register)

| ID | Quantity | Formula | Coefficients (source; confidence) |
|---|---|---|---|
| WR-01 | Heat rejected by evaporation, Q_rej (kWh_th/yr) | Q_rej = E_IT × (1 + cooling overhead) — **take from register row for cooling (report 01)** | — |
| WR-02 | Evaporation, V_evap (L/yr) | V_evap = Q_rej × 3,600 × f_lat ÷ h_fg | f_lat = 0.9; h_fg = 2,349 kJ/kg (Powers 2013; LOW — verify against ASHRAE/steam tables) → ≈1.38 L/kWh_th |
| WR-02b | Alternative: site water (L/yr) | V_site = E_IT × WUE | WUE 0.32 (hyperscale median) to 0.36 (US average) L/kWh, range 0.1–0.48 (LBNL 2024; MEDIUM — denominator to confirm) |
| WR-03 | Make-up, V_mu (L/yr) | V_mu = V_evap × C ÷ (C − 1) | C = 2–4 typical, 6 possible (FEMP/EPA; HIGH); C = 4–6 on treated municipal wastewater (NETL 2012; MEDIUM) |
| WR-04 | Blowdown, V_bd (L/yr) | V_bd = V_evap ÷ (C − 1) | as WR-03 |
| WR-05 | Reclaimed make-up substituted (L/yr) | V_rec = s × V_mu | s = 0–1 user slider; operator precedents 0.74–0.99 (Microsoft, operator claim) |
| WR-06 | Neighbour greywater available (L/yr) | V_gw = N_residents × 98 × 365 | 98 L/person/day residential (NASEM 2016; MEDIUM, US data) |
| WR-07 | Greywater used as make-up (L/yr) | V_gw,used = min(V_gw × r, V_mu) | r = treatment recovery — **gap (no source)**; placeholder must be marked UNVERIFIED |
| WR-08 | Treatment electricity (kWh/yr) | E_tr = V_treated (m³) × e | e = 0.75–1.1 greywater MBR; 0.94–1.28 mixed wastewater MBR (Arden 2021; MEDIUM); up to ~4.6 small blackwater plant (ISF 2013; LOW) |
| WR-09 | Blowdown recovery effect | V_mu,new = 0.84 × V_mu; V_bd,new = 0.47 × V_bd; E += 3,541 kWh/yr per skid (≈0.7–3.5 MW_th tower) | GSA/NREL GPG-052 2023 (MEDIUM; single test site, hard water) |
| WR-10 | Cost-parity test | Viable if local water+sewer price ≥ P* | P* = US$2.38/m³ greywater MBR; US$1.85/m³ mixed MBR (Arden 2021; MEDIUM; US 2020 dollars — Vancouver/Edmonton rates needed) |
| WR-11 | Reclaimed water treatment cost (opex) | C = V_rec × c | c = US$0.24–0.35/m³ (2009$), power-plant scale (NETL 2012; LOW for 0.1–40 MW) |
| WR-12 | Required treatment level (flag) | lookup by city × source × use | AB: LRT tables B-1/B-3; BC: MWR Table 13 category; Van: Table 2.7.7.1 (HIGH) |
| WR-13 | Sewer heat cap (flag) | T_sewer,after ≤ 40 °C (Metro Van) | Bylaw 299 Sched. A s. 4 (HIGH) |
| WR-14 | Potable back-up | 100% of V_mu must remain connectable via air gap | Vancouver Table 2.7.7.3, 2.7.6.4 (HIGH) |

## (b) Gaps
1. Vancouver Building By-law 2025 Art. 2.7.1.2 / 2.7.1.3 full text: whether non-residential greywater and blackwater are now permitted sources, and whether cooling-tower make-up is a permitted use for them.
2. CSA B128.3:23 performance classes and B128.1 (paywalled).
3. Footprint (m² per m³/day), capex ($ per m³/day capacity), sound (dBA) for building-scale greywater/blackwater MBRs — no allowed source found.
4. Greywater treatment recovery rate (% of influent that becomes usable product water) — not found.
5. Peer-reviewed RO recovery rate on cooling-tower blowdown, and RO energy (kWh/m³) for blowdown — not found.
6. LBNL 2024 WUE by cooling type (Fig. 4.4) values; WUE denominator confirmation.
7. A primary engineering source for h_fg and f_latent (ASHRAE Handbook—HVAC Systems and Equipment, cooling towers chapter).
8. EPCOR Gold Bar reclaimed water volumes, recipient, quality and price; EPCOR sewer-heat policy; EPCOR Drainage Bylaw temperature/chemical limits (appendices).
9. Whether a BC regional health authority (VCH) or the Ministry classifies a data-centre cooling tower under MWR "lower" or "moderate" exposure.
10. Cross-property (district) sharing of greywater/reclaimed water: no BC or Alberta rule text found; STANDATA P-17-01 is single-property only.
11. Vancouver and Edmonton water and sewer rates (for the WR-10 parity test) — likely in another report (03/04); not checked here.
12. No Canadian data-centre precedent for reclaimed or greywater cooling.
13. Any replacement for the archived STANDATA P-17-01 and the Alberta "Alternative Solutions Guide for Small System Water Reuse and Stormwater Use" (notice page found, guide not opened).

## (c) For J.B. to retrieve
- Kobayashi et al. 2020, *Human Health, Economic and Environmental Assessment of Onsite Non-Potable Water Reuse Systems for a Large, Mixed-Use Urban Building* (US EPA; costs, energy, GHG for greywater and blackwater in San Francisco) — blocked by reCAPTCHA: https://pmc.ncbi.nlm.nih.gov/articles/PMC7490829
- LBNL 2024 report full text (Fig. 4.4, Section 5 water totals) — eScholarship link could not be fetched (not in provenance): https://escholarship.org/uc/item/32d6m0d1
- Vancouver Building By-law 2025, Book II, §2.7 full text (Arts. 2.7.1.2, 2.7.1.3, Table 2.7.7.1) and Art. 2.2.11.6 (cooling towers): start from https://vancouver.ca/files/cov/2025-vbbl-book-II-insert-pages.pdf
- Vancouver By-law amendments of June/July 2023 (fetch failed): https://council.vancouver.ca/20230627/documents/bylaws1to14.pdf
- CSA B128.3:23: https://scc-ccn.ca/standardsdb/standards/4031961 (purchase via CSA, or UBC Library's CSA OnDemand access)
- ISO 22449-1:2020 *Use of reclaimed water in industrial cooling systems — Part 1*: listing seen at https://asn.sn/en/node/15070 (buy from ISO/SCC; UBC Library)
- Alberta notice and guide for small-system water reuse and stormwater use: https://open.alberta.ca/publications/notice-alternative-solutions-guide-small-system-water-reuse-stormwater-use
- Alberta Plumbing STANDATA index (check for a successor to P-17-01): https://www.alberta.ca/plumbing-standata
- EPCOR Drainage Services Bylaw 18100 appendices (discharge limits): https://www.edmonton.ca/residential_neighbourhoods/Bylaws/C18100.pdf
- Mytton 2021, full text (npj Clean Water, open access) — only the abstract was read: doi 10.1038/s41545-021-00101-w
- Arden et al. 2021 Supplementary Information (Fig. 5 cost curves as numbers): https://pasteur.epa.gov/uploads/10.23719/1519028/Arden%20et%20al.%2C%202021.pdf
