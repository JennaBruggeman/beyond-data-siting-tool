# B — Local heat and air quality beside the site
Research pass 19 Oct 2026. Follows RULES.md.
Register ids checked first: heat_rejected, noise_level, generator_nox_pm, genset_test.
Generic equipment only. No real facility locations.

---

## Topic 1 — Local heat from cooling equipment

### What the tool could compute or show
- Site heat flux (W/m²) from heat_rejected ÷ site area, set beside published city heat-flux values.
- A screening air-temperature rise at a neighbour, using the same plume method as Topic 2 (heat treated like a pollutant). Labelled "screening, not measured".
- City heat context: each city's own urban heat policy and the one study that covers both cities the same way.

### Findings

**Measured or modelled warming near equipment / data centres**
- Rooftop condenser, measured: inlet air only slightly warmer than ambient.
  — "the air temperature at the condenser inlet was only 0.3 °C warmer on average"; fan-only running showed no rise, which the authors read as no hot-air recirculation.
  — Wray & Akbari, *Energy and Buildings* 40(1):11–28, 2008, doi 10.1016/j.enbuild.2007.01.005. Read via LBNL publication page (abstract). https://eta-publications.lbl.gov/publications/effects-roof-reflectance-air-0
  — peer-reviewed · conf 70 (small residential-size unit; do not scale to a chiller yard).
- AC waste heat, city scale (Phoenix, model):
  — "increased the mean 2 m-air temperature by more than 1 °C for some urban locations" (night).
  — Salamanca, Georgescu, Mahalov et al., *J. Geophys. Res. Atmos.*, 2014, doi 10.1002/2013JD021225.
  — Quote read on a secondary page (Global Cool Cities Alliance, coolrooftoolkit.org/?p=3323), not the publisher. Publisher page failed.
  — peer-reviewed (read second-hand) · conf 60.
- Building waste heat, share from AC:
  — AC heat rejection "contributes most (86.5%) of the total waste heat from the buildings"; dispersion of building heat "increases by up to 20% on average" in heat waves.
  — Luo, Vahmani, Hong, Jones, *Atmosphere* 11(11), 2020, doi 10.3390/atmos11111206. https://www.osti.gov/pages/biblio/1764544-city-scale-building-anthropogenic-heating-during-heat-waves
  — peer-reviewed (abstract) · conf 70. No °C or W/m² in abstract.
- Building exhaust vs HVAC heat: exhaust heat is mainly a night effect with "more significant implications for local air temperature".
  — Vahmani, Luo, Jones, Hong, *Building and Environment* 213:108841, 2022, doi 10.1016/j.buildenv.2022.108841. https://eta-publications.lbl.gov/publications/anthropogenic-heating-urban
  — peer-reviewed (abstract) · conf 70. Qualitative only.
- Data centres, satellite land-surface temperature (LST, not air):
  — "the land surface temperature increases by 2°C on average after the start of operations"; range 0.3–9.1 °C; "an average monthly LST increase of 1 °C can be measured up to 4.5 km".
  — Marinoni et al., arXiv 2603.20897 v3, 21 Apr 2026. https://arxiv.org/pdf/2603.20897
  — PREPRINT, not peer-reviewed; before/after attribution, no causal control · conf 40 (proxy). Show as context only, never as a coefficient.

**City heat flux for comparison**
- "the global mean urban Q(F) has a diurnal range of 0.7-3.6 W m(-2)"; highest city grid cells listed include "Vancouver (119)" (units implied W m⁻²).
  — Allen, Lindberg, Grimmond, *Int. J. Climatology* 31(13):1990–2005, 2011, doi 10.1002/joc.2210. Read on EPA HERO abstract page. https://hero.epa.gov/hero/index.cfm/reference/details/reference_id/1607955
  — peer-reviewed (abstract) · conf 70. Edmonton not listed.
- Building heat release = "89–96%" of heat emissions globally (same source).

**Recirculation**
- Hot air from one air-cooled exchanger can re-enter itself or a neighbour, raising inlet temperature; mitigations named: same fan elevation, seal plates between banks, wind walls.
  — HTRI case study page. https://www.htri.net/case-study-reducing-hot-air-recirculation-around-air-cooled-heat-exchangers
  — industry research body, CLAIM · conf 50. No recirculation fraction given.
- No peer-reviewed simple formula for recirculation found this pass.

**City policy — Vancouver**
- Council report "Climate Change Adaptation Strategy 2024-25 Update", RTS 15890, 30 Jan 2024. https://council.vancouver.ca/20240313/documents/cfsc2.pdf
  — "neighbourhoods disproportionately impacted by urban heat island effect" (report p.5).
  — "documented spatial overlap between areas of Vancouver with the lowest tree canopy cover percentages" … "the areas with the highest surface temperatures" (App. A p.30).
  — government · conf 90 (as policy statement).
- Memo "Planning for Extreme Heat and Air Quality Mitigation", RTS 14654, 10 Mar 2022. https://vancouver.ca/files/cov/2022-03-10-council-memo-planning-for-extreme-heat.pdf
  — "Mapping of hot areas, existing cooling infrastructure and social vulnerability is being used to identify gaps" (App. A item 1, p.6).
  — "canopy cover target of 30% (a 7% increase) by 2050" (App. A item 2, p.7).
  — government · conf 90.
- Neither Vancouver document mentions waste heat or heat rejection from equipment.

**City policy — Edmonton**
- "Climate Resilient Edmonton: Adaptation Strategy and Action Plan", 2018. https://www.gov.edmonton.ab.ca/city_government/documents/Climate_Resilient_Edmonton.pdf
  — Action 9 "Cool Edmonton": "We will work with partners to incorporate actions that reduce the impacts of the urban heat island effect" (p.30).
  — Hot days (>30 °C) about 1/yr historically → 16/yr 2050s → 34/yr 2080s (Table 4, p.17).
  — government · conf 90.
- Path 2 progress, as of 30 Jun 2026: cites "Research on urban heat islands in Edmonton that was completed in 2022". https://www.edmonton.ca/sites/default/files/public-files/documents/june-2026-adaptation-plan-path-2-progress_0.pdf
  — government · conf 90. No heat map, no waste-heat text.

**Study covering both cities the same way (parity)**
- Duan, Agrawal, Sanchez-Azofeifa, Welegedara, "Urban heat island effect in Canada: Insights from five major cities", *Can. J. Urban Research* 33(2):53–78 (page dates 2026-01-12). https://cjur.uwinnipeg.ca/index.php/cjur/article/view/445
  — LST based. "Vancouver has the highest daytime UHI intensity at 7.25°C" (summer).
  — "Edmonton records the lowest winter daytime UHI intensity at -1.29°C", nighttime "reaching 2.86°C".
  — peer-reviewed (abstract) · conf 70 for LST; 40 if used as air temperature.
- Edmonton TOD areas: LST and UHI rising faster than non-TOD areas. Agrawal, Lotfi, Welegedara, *CJUR* 32(2):44–58, 2024, doi 10.36939/cjur/vol32no2/art410 · peer-reviewed · conf 70.

### Vancouver vs Edmonton
- Both cities name urban heat island in adopted policy. Both use surface temperature, not air temperature.
- Vancouver: city maps hot areas + vulnerability (memo 2022); canopy target 30% by 2050.
- Edmonton: "Cool Edmonton" action; no city heat map found; 2022 U of A research cited.
- Neither city regulates heat rejected outdoors by equipment. Say so plainly.
- Heat-flux comparison: Allen et al. list Vancouver (119 W/m²); no Edmonton value — gap.
- Climate matters: equal heat output reads differently — Edmonton has far fewer hot days; winter plume is a resource, summer plume a burden. Shown, not scored.

### Proposed node(s) or change
1. **heat_flux_site** (W/m²) — community tier.
   - q = heat_rejected_peak (W) ÷ site_area (m²). conf 100 (arithmetic).
   - Show beside: city grid-cell max (Vancouver 119 W/m², Allen 2011, conf 70); Edmonton "no published value".
   - Worked check: 10 MW over 1 ha → 1,000 W/m².
2. **heat_plume_dT** (°C) — full tier, screening only.
   - At the coil: ΔT_exit = Q ÷ (ρ·cp·V̇_air). conf 100 (physics). V̇ from manufacturer data (claim, conf 50).
   - At a receptor: ΔT(x) ≈ [Q ÷ (ρ·cp)] × (χ/Q)(x), using the plume dispersion factor from air_screen_1h (Topic 2).
   - Assumption stated: heat acts as a passive tracer; buoyant rise ignored (conservative at ground). conf 60.
   - Label: "screening estimate, not a measured air temperature".
3. **recirculation_flag** (rule) — full tier.
   - Flag when units sit at different fan heights, with gaps between banks, or beside taller walls (HTRI, claim, conf 50).
   - Context: measured small-unit inlet rise 0.3 °C (Wray & Akbari 2008, conf 70). No sizing formula — gap.
4. **uhi_context** (display) — resident tier.
   - One line per city: policy name + action (Vancouver CCAS 2024-25; Edmonton Cool Edmonton Action 9) + Duan et al. LST values.
   - Data-centre LST preprint shown only as "preprint, not peer-reviewed".

### Could not read / still a gap
- Could not read: "Data Center Waste Heat as an Emerging Urban Thermal Hazard: First Field Measurements of Neighborhood-Scale Air Temperature Impacts" (ASME *J. Sustainable Buildings*?, doi 10.1115/1.4071922). doi.org → proxy rate-limited (HTTP 429, told not to retry); OSTI page blocked by robots. Title seen in search only. Likely the most relevant paper — read manually.
- Could not read: Salamanca 2014 on Wiley (client error); quote taken from a secondary page.
- Could not read: PMC7369797 (Berlin AC heat study) — reCAPTCHA page.
- Could not read: ScienceDirect S3051408826000136 (Phoenix "digital heat islands") — robots.
- Gap: peer-reviewed simple formula for air ΔT vs distance from a chiller yard.
- Gap: recirculation fraction for multi-unit yards.
- Gap: Edmonton anthropogenic heat flux value.

---

## Topic 2 — Air quality beside the site from generator testing

### What the tool could compute or show
- 1-hour NO2 and 24-hour PM2.5 at a neighbour during a test, from one generic genset.
- Compared with each city's objective and the federal CAAQS, plus a background value.
- Result: "passes screen" or "would need refined modelling" — the same two outcomes both provinces use. No score.

### Findings

**Screening method — BC (Vancouver)**
- "AERSCREEN is the preferred screening level model for use in BC and MV." (p.9). It handles a single source only (p.9).
- Level 1 = worst-case estimate; it "indicates the potential for an exceedance of ambient objectives" and then triggers Level 2 (p.5).
- For 1-h results "use the maximum 1-h emission rate" (p.17).
- "Ambient concentrations should also be predicted for abnormal operating conditions" (p.17).
- No text on diesel or emergency generators found.
- BC MoE, *B.C. Air Quality Dispersion Modelling Guideline*, "Version: July 2026" (index page says updated Aug 2026). https://www2.gov.bc.ca/assets/gov/environment/air-land-water/air/reports-pub/bc_dispersion_modelling_guideline.pdf
- regulator guideline · conf 90. Note: fetch was truncated; NO2 and background sections not read here.
- Metro Vancouver permit reviews: methodology "expected to be mostly consistent with the BC Air Quality Dispersion Modelling Guideline". https://metrovancouver.org/services/environmental-regulation-enforcement/air-quality-regulatory-program/dispersion-modelling-reviews · regional regulator · conf 90.

**NO2 from NOx — BC**
- Tier 1: "100% of NOX emissions … are converted to NO2" (s.3.2.1.1, p.9).
- ARM2 bounded: "maximum value of 0.9 and a minimum value of 0.2" (App. A, p.26).
- OLM in-stack ratio, reciprocating engines on diesel: 0.083 (Table B-1, p.31; 75th percentile of category). Default ISR 0.5 if no category (p.13).
- Level 1 background: "maximum monitored concentration (100th percentile)" (s.3.3.2, p.16).
- BC MoE, *Guidance on NO2 Dispersion Modelling in British Columbia*, Version July 2022. https://www2.gov.bc.ca/assets/gov/environment/air-land-water/air/reports-pub/modelling_guidance_nitrogen_dioxide.pdf
- regulator guideline · conf 90.

**Screening method — Alberta (Edmonton)**
- "A screening assessment is a simple and quick way to estimate a "worst-case" predicted concentration" (s.2.2, p.10).
- "AERSCREEN is the U.S. EPA recommended screening model" (s.3.1.1, p.14); Table 1: AERSCREEN for "Few sources; simple terrain".
- Refined modelling needed if screening predicts an AAAQO exceedance (s.3.2, p.14).
- "A representative baseline value must always be added to all predicted concentrations" (s.5.4 item 4, p.28).
- Other averaging times: impact factor = 1.1233 × (hours)^-0.2906 × max 1-h (Eq. 1, s.3.1.1.1); sub-hour C × (t/60)^-0.28 (Eq. 3, s.7.1.2).
- NO2 methods listed: total conversion, ARM/ARM2, PVMRM, OLM (s.7.3, p.35) — text not read.
- Regulatory modelling "does not need to demonstrate compliance with the CAAQS" (fn 1, p.7).
- No text on emergency/standby generators found.
- Alberta EPA, *Air Quality Model Guideline*, published 13 Sep 2021, effective 15 Nov 2021. https://open.alberta.ca/dataset/cefcad38-6d49-4cce-98f7-23b1741f85b7/resource/b4ed8dc9-3850-4e5f-a618-42b29c4ba2d4/download/aep-aqmg-air-quality-model-guideline-2021-09.pdf
- regulator guideline · conf 90.

**US EPA screening tools**
- "AERSCREEN is the recommended screening model based on AERMOD"; "worst-case" 1-h for a single source, with "conversion factors to estimate "worst-case" 3-hour, 8-hour, 24-hour, and annual concentrations". Version 21112. https://epa.gov/scram/air-quality-dispersion-modeling-screening-models · US regulator · conf 90.
- AERSCREEN ratios to 1-h: 3-h 1.00, 8-h 0.90, 24-h 0.60, annual 0.10 (SCREEN3: 0.90, 0.70, 0.40, 0.08).
  — *AERSCREEN User's Guide*, EPA-454/B-21-005, Apr 2021, s.1.1 p.3. https://gaftp.epa.gov/Air/aqmg/SCRAM/models/screening/aerscreen/aerscreen_userguide.pdf · conf 90.
  — Inputs: emission rate, stack height, diameter, exit temperature, exit velocity or flow; optional building downwash; urban flag + population.
- Hand method: X1 = 2Q·(χu/Q)max ÷ u, read from Fig. 4-1; 24-h factor 0.4 (±0.2), annual 0.08 (±0.02); valid for plume heights 10–300 m only.
  — *Screening Procedures for Estimating the Air Quality Impact of Stationary Sources, Revised*, EPA-454/R-92-019, s.4.1–4.2. https://www.epa.gov/sites/default/files/2020-09/documents/epa-454r-92-019_ocr.pdf · conf 90.
  — Plume height limit matters: genset stacks are often under 10 m → outside the hand method; use AERSCREEN offline.
- Ground-level centreline Gaussian equation: *SCREEN3 Model User's Guide*, EPA-454/B-95-004, Sep 1995, s.3.1 Eq.1 (OCR garbled; standard form with ground reflection). https://www.nrc.gov/docs/ML0719/ML071930125.pdf · conf 90 for method, verify printed equation.
- Briggs urban σ (x in m), e.g. class D: σy = 0.16x(1+0.0004x)^-1/2; σz = 0.14x(1+0.0003x)^-1/2.
  — ISC3 Vol. II (3MRA DRAFT, 30 Jun 1999), Tables 1-3/1-4, p.1-21. https://archive.epa.gov/epawaste/hazard/web/pdf/s0528.pdf
  — DRAFT edition; extraction flagged possible errors in D and E/F rows · conf 70 until checked against the final ISC3 Vol. II.
- Emergency engines and US 1-h NO2: March 1, 2011 EPA memo "Allows certain emission units (i.e., emergency engines) an exemption from 1-hour NO2 modeling."
  — Read in a Connecticut DEEP slide summary, not the memo. https://portal.ct.gov/-/media/deep/air/siprac/2011/1hrno2modelingguidancepdf.pdf · state regulator summary · conf 50. US practice only — no BC or AB equivalent found.

**Ambient objectives**
| Pollutant, period | BC AQO (Vancouver) | Alberta AAAQO (Edmonton) | CAAQS |
|---|---|---|---|
| NO2 1-h | 113 µg/m³ (60 ppb), 2021; 98th pct D1HM, 3-yr avg | 300 µg/m³ (159 ppb), 2011 | 2020: 60 ppb · 2025: 42 ppb (79 µg/m³) |
| NO2 annual | 32 µg/m³ (17 ppb) | 45 µg/m³ (24 ppb), vegetation | 2020: 17 ppb · 2025: 12 ppb (23 µg/m³) |
| PM2.5 24-h | 25 µg/m³, 98th pct | 29 µg/m³ (objective, 2019) | 2020: 27 · 2030: 23 µg/m³ |
| PM2.5 1-h | — | 80 µg/m³ (guideline) | — |
| PM2.5 annual | 8 µg/m³ (planning goal 6) | — | 2020: 8.8 · 2030: 8.0 µg/m³ |

- BC: *B.C. Ambient Air Quality Objectives*, updated 23 Dec 2025. https://www2.gov.bc.ca/assets/gov/environment/air-land-water/air/factsheets/bc_aq_objectives_2025.pdf · government · conf 90. (CAAQS values above in µg/m³ come from this sheet.)
- Alberta: *Alberta Ambient Air Quality Objectives and Guidelines*, 19 Jul 2024, Tables 1–2. https://open.alberta.ca/dataset/09a63fe8-11ae-420e-9008-82aa4db4824a/resource/094dae9e-b6f9-4de9-86c7-a651019f3aab/download/epa-ambient-air-quality-objectives-and-guidelines-2024.pdf · government · conf 90.
- CAAQS NO2 2020/2025 and PM2.5 2015/2020 in ppb / µg/m³ also confirmed on https://www.alberta.ca/canadian-ambient-air-quality-standards · government · conf 90.

**Permits and registration — Metro Vancouver**
- Bylaw 1082 s.7(12) exempts a discharge "restricted to less than 100 kilograms per day of carbon monoxide, and less than 5 kilograms per day of each of the following: nitrogen oxides (expressed as nitrogen dioxide)" and SOx.
- s.7(9) also exempts "internal combustion engines in compliance, if applicable, with the Motor Vehicle Act RSBC 1996, chapter 318, and regulations".
- s.10: no exemption allows discharge "so as to cause pollution".
- MVRD Bylaw 1082, unofficial consolidation to 29 May 2020 (Bylaw 1308). https://metrovancouver.org/boards/Bylaws/MVRD_Bylaw_1082_Consolidated.pdf · regional bylaw · conf 90 for text; how s.7(9) applies to a stationary genset is NOT settled — ask Metro Vancouver.
- Bylaw 1329 (non-road diesel): generators are named as non-road machines; exempt: "Emergency generators or other stationary machines operated only in the case of emergency"; they "don't require labeling or registration" but must be operated, inspected and maintained.
  — Metro Vancouver guide brochure, Apr 2023 (bylaw prevails). https://metrovancouver.org/services/air-quality-climate-action/Documents/non-road-diesel-engine-emission-regulation-guide-brochure.pdf · regional regulator · conf 80.
  — Open question: does routine testing fit "operated only in the case of emergency"? Not answered in what was read.

### Vancouver vs Edmonton
- Same screening tool in both: AERSCREEN (BC "preferred"; AB "recommended").
- Both: screen → if exceedance predicted, refined modelling. Both add a background value.
- Averaging-time conversion: BC text read gives none; AB gives Eq. 1. Use AERSCREEN's own ratios for both (parity).
- NO2 conversion: BC gives numbers (ARM2 0.2–0.9; diesel ISR 0.083). AB lists methods; numbers not read — gap.
- Objectives differ a lot: NO2 1-h 113 (BC) vs 300 µg/m³ (AB). CAAQS 2025 (79 µg/m³) is the common yardstick — show both city and federal lines.
- Permits: Metro Vancouver has a 5 kg/day NOx exemption threshold; Alberta exempts standby generators from approval (already in register, genset_test). Edmonton has no regional air authority equivalent to Metro Vancouver — say so.

### Proposed node(s) or change
1. **genset_emission_rate** (g/s) — feeds air nodes. Full tier.
   - Q = EF (g/kWh) × P_genset (kWe) × load ÷ 3600. conf 100 arithmetic; EF from genset_test (AP-42 upper bound, conf 65).
   - Check: 2,000 kWe at full load, NOx 14.6 g/kWh → 8.1 g/s (29.2 kg/h).
2. **air_screen_1h** (µg/m³ at receptor distance x) — full tier.
   - C1h = 10⁶ × Q ÷ (π·u·σy·σz) × exp(−H²/2σz²); urban Briggs σ (ISC3 Vol. II); u = 1 m/s, class D as a stated worst-case-type pick. conf 60 (derived with stated assumptions).
   - Preferred: precompute χ/Q tables offline in AERSCREEN for 3 generic stacks (small / medium / large genset) and store as coefficients. conf 70.
   - Label: "screening; a regulator would require AERSCREEN or refined modelling".
3. **no2_at_receptor** — full tier.
   - NO2 = C1h(NOx) × ratio. Show range: 1.0 (Tier 1) → 0.9–0.2 (ARM2 bounds). conf 90 for the rule (BC 2022).
4. **air_vs_objective** (rule) — community tier (full shows numbers).
   - C_avg = C1h × AERSCREEN ratio (24-h 0.60; annual 0.10) + background.
   - Test vs city objective AND CAAQS. Outcome text: "passes screen" / "refined modelling needed". No score.
   - Background: monitored value from each province's network — not yet pulled (gap).
5. **air_permit_trigger** (rule) — community tier.
   - Vancouver: daily NOx from test day vs 5 kg/day (Bylaw 1082 s.7(12)). With the 2 MW example, the threshold is passed after about 10 minutes at full load — arithmetic, conf 60 (applicability unsettled).
   - Edmonton: link to existing genset_test note (AB standby exemption).
6. Change to **generator_nox_pm**: replace pending roles for mvBylaw1329 with the brochure exemption wording above (conf 80).

### Could not read / still a gap
- Could not read: Metro Vancouver NRDE FAQ page (needs JavaScript). https://metrovancouver.org/services/environmental-regulation-enforcement/air-quality-regulatory-program/non-road-diesel-engine-faqs
- Not read (truncated fetch): BC guideline NO2 and background sections (pp.73–75, s.8.1); AB guideline s.7.2–7.3 NO2 and baseline details, Appendix F ozone.
- Gap: whether a Metro Vancouver permit is needed for a data-centre genset bank (s.7(9) vs s.7(12)).
- Gap: whether testing counts as "operated only in the case of emergency" under Bylaw 1329.
- Gap: Alberta statistical form of the NO2 1-h objective (not in the text read).
- Gap: stack parameters for generic gensets (height, exit temp, flow) — check spec sheets already in register (mtuDS2250, catTM9338, cumminsS1443); these are manufacturer CLAIMS.
- Gap: background NO2 / PM2.5 for each city (provincial monitoring data).
- Not in either province: a rule like the US emergency-engine 1-h NO2 exemption. Say so.

---

## Round 2 (verification and gaps)
Skeptic pass, 19 Oct 2026. Sources re-opened with WebFetch. Same rules (RULES.md).
Status: CONFIRMED · CORRECTED · UNVERIFIED.

### Task 1 — the 8 key claims

**1. AERSCREEN status (BC guideline; Alberta Model Guideline 2021) — CONFIRMED**
- BC: "AERSCREEN is the preferred screening level model for use in BC and MV." (p.9). Footer "Version: July 2026"; p.i history: "July 2026 version released (minor revision …)".
- BC p.8: AERSCREEN "produces the worst-case 3-h, 8-h, 24-h and annual average concentrations from a single source".
- AB: "AERSCREEN is the U.S. EPA recommended screening model used to produce estimates of worst-case scenarios." (s.3.1.1, p.14). Table 1 (p.16): AERSCREEN, ≤ 50 km, MAKEMET, "Few sources; simple terrain."
- AB Eq.1 (s.3.1.1.1, p.14) confirmed: 1.1233 × (hours)^-0.2906. Text says use the model's built-in time factors for 3-, 8-, 24-h and annual "when available".
- AB Eq.3 (s.7.1.2, p.33) confirmed: (t/60)^-0.28; worked example "for a 30-minute AAAQO … multiplied by a factor of 1.21".
- Still true: no generator / diesel / emergency text found in either guideline (text read).

**2. AERSCREEN averaging-time ratios — CONFIRMED**
- EPA-454/B-21-005, Apr 2021, s.1.1 p.3: 3-h 1.00 · 8-h 0.90 · 24-h 0.60 · annual 0.10 (SCREEN3 0.90 · 0.70 · 0.40 · 0.08).
- Added: for area sources, 3-, 8-, 24-h = 1-h value and no annual is computed. Gensets are point sources, so the ratios apply.

**3. BC NO2 guidance numbers — CONFIRMED (one page number CORRECTED)**
- Tier 1: "models assume that 100% of NOX emissions resulting from a given project are converted to NO2." — s.3.2.1.1, **p.10** (round 1 said p.9).
- ARM2: "constrained to a maximum value of 0.9 and a minimum value of 0.2" (App. A, p.26).
- Diesel ISR: Table B-1 p.31, row "Diesel/Kerosene 139 0.119 0.083" → 0.083; p.30: "The recommended ISR is the 75th percentile of each category."
- Default ISR 0.5: "If a source type is not listed in Appendix B and site-specific data are not available, a default ISR of 0.5 should be applied." (s.3.2.1.3.1, p.14).
- Level 1 background: "maximum monitored concentration (100th percentile)" (s.3.3.2, p.16).
- Version July 2022 confirmed.

**4. NO2 and PM2.5 objectives — CORRECTED (Vancouver row incomplete)**
- BC AQO values and forms confirmed (fact sheet updated 23 Dec 2025):
  - NO2 1-h 113 µg/m³ (60 ppb), 2021; annual 98th pct of daily 1-h max, 3-yr avg (fn 7).
  - NO2 annual 32 µg/m³ (17 ppb), 2021.
  - PM2.5 24-h 25 µg/m³, 2009, annual 98th pct of daily avg, one year (fn 11).
  - PM2.5 annual 8 µg/m³, 2009; planning goal 6.
- **Missing in round 1: Metro Vancouver has its own, stricter objectives.** These apply in Vancouver and should be the Vancouver line.
  - "Metro Vancouver Ambient Air Quality Objectives (November 2024)", page dated 05/2025. https://metrovancouver.org/services/air-quality-climate-action/Documents/ambient-air-quality-objectives.pdf · regional government · conf 90.
  - NO2 1-h **79 µg/m³ (42 ppb)**; fn c "annual 98th percentile of the daily maximum 1-hour concentration averaged over three consecutive years."
  - NO2 annual **22.6 µg/m³ (12.0 ppb)**; fn d "annual average of 1-hour concentrations over one year."
  - PM2.5 24-h 25 µg/m³; fn b "Achievement based on rolling average."
  - PM2.5 annual 8 µg/m³ (planning goal 6, fn f).
  - fn a: unless noted, "not to be exceeded"; achieved if "100% of the validated measurements are at or below the objective level."
- Alberta AAAQO confirmed (19 Jul 2024, Tables 1–2): NO2 1-h 300 µg/m³ (159 ppbv), revised 15 Jun 2011; NO2 annual 45 µg/m³ (24 ppbv), basis "Vegetation"; PM2.5 24-h 29 µg/m³ objective (rev. 1 Jan 2019); PM2.5 1-h 80 µg/m³ **guideline** (Table 2).
- CAAQS confirmed on CCME's own page (stronger than round 1's provincial copies). https://ccme.ca/en/air-quality-report · intergovernmental council · conf 90.
  - NO2 1-h: 2020 60 ppb · 2025 42 ppb; "The 3-year average of the annual 98th percentile of the daily maximum 1-hour average concentrations".
  - NO2 annual: 2020 17.0 · 2025 12.0 ppb; "The average over a single calendar year of all 1-hour average concentrations".
  - PM2.5 24-h: 2020 27 · 2030 23 µg/m³; "3-year average of the annual 98th percentile of the daily 24-hour average concentrations".
  - PM2.5 annual: 2020 8.8 · 2030 8.0 µg/m³; "3-year average of the annual average of the daily 24-hour average concentrations".
  - Minor CORRECTION: BC fact sheet words the 2030 PM2.5 annual form as an average of 1-hour values; use CCME's wording.
  - alberta.ca CAAQS page shows 2015/2020 (PM2.5) and 2020/2025 (NO2) only — no 2030 values there.

Corrected objectives table (replaces round 1 table for use in the tool):

| Pollutant, period | Metro Vancouver AAQO (Vancouver) | BC AQO | Alberta AAAQO (Edmonton) | CAAQS |
|---|---|---|---|---|
| NO2 1-h | 79 µg/m³ (42 ppb), 98th pct D1HM, 3-yr | 113 (60 ppb) | 300 (159 ppb), form not stated | 2020 60 · 2025 42 ppb |
| NO2 annual | 22.6 (12 ppb) | 32 (17 ppb) | 45 (24 ppb), vegetation | 2020 17 · 2025 12 ppb |
| PM2.5 24-h | 25, rolling avg | 25, 98th pct | 29 | 2020 27 · 2030 23 |
| PM2.5 1-h | — | — | 80 (guideline) | — |
| PM2.5 annual | 8 (goal 6) | 8 (goal 6) | — | 2020 8.8 · 2030 8.0 |

**5. Metro Vancouver Bylaw 1082 and 1329 — CONFIRMED**
- Consolidation "As of May 29, 2020" confirmed.
- s.7(12): "the discharge is restricted to less than 100 kilograms per day of carbon monoxide", and less than 5 kg/day each of NOx (as NO2) and SOx (as SO2). Tool's 5 kg/day stands.
- s.7(9): "the discharge is from steam powered or internal combustion engines", if applicable in compliance with the Motor Vehicle Act and regulations.
- s.10: "Notwithstanding any other provision in this Bylaw no person may discharge" … so as to cause pollution.
- Fetch tool would only return fragments (quote-length limit); substance matches round 1.
- Bylaw 1329 brochure ("Updated April 2023"): not applicable to "Emergency generators or other stationary machines operated only in the case of emergency"; they "don't require labeling or registration" but must be "operated, inspected, and maintained to prevent impacts on nearby building occupants." CONFIRMED.
- Unchanged open question: does routine testing fit "operated only in the case of emergency"?

**6. Allen, Lindberg, Grimmond 2011 — CONFIRMED, with a caution**
- "the global mean urban Q(F) has a diurnal range of 0.7-3.6 W m(-2)".
- "The highest individual grid cell heat fluxes in urban areas were located in New York (577), Paris (261.5), Tokyo (178), San Francisco (173.6), Vancouver (119) and London (106.7)."
- "The heat release from building is the largest contributor (89-96%), to heat emissions globally."
- Caution: the abstract gives **no units** for the city values. W m⁻² is the likely unit but is an inference → label "units assumed W m⁻² (abstract does not state)". Keep conf 70 for value, 60 for units.

**7. Wray & Akbari 2008 — CORRECTED (meaning reversed in round 1)**
- Title: "The effects of roof reflectance on air temperatures surrounding a rooftop condensing unit", *Energy and Buildings* 40(1):11–28, doi 10.1016/j.enbuild.2007.01.005.
- Quotes:
  - "the air temperature at the condenser inlet was only 0.3 °C warmer on average during peak solar radiation times" (vs. a reference "located far from the RTU").
  - "Applying a "cool" roof coating around the RTU eliminated this small temperature rise."
  - "The temperature rise was not significantly different when the condenser fan operated without the compressor" … "which suggests that hot air discharged by the condensing unit was not recirculated."
- Correction: the 0.3 °C rise is caused by the **hot roof surface**, not by the unit's own exhaust. It stays when the compressor is off, and goes away with a cool roof.
- Round 1 said "fan-only running showed no rise" — wrong. Fan-only showed the **same** rise.
- Use in tool: evidence that roof finish affects condenser inlet air; and that one small unit did not recirculate. Not a measure of equipment heat reaching neighbours. Remove from "warming near equipment".

**8. Topic 2 genset exemption in Alberta (register claim) — see Task 2c; source traced, statute UNVERIFIED.**

### Task 2 — gaps

**2a. Alberta NO2 conversion numbers — UNVERIFIED (could not read)**
- AB Model Guideline s.7.3 (pp.35–38) is past the point where the fetched text stops (text ends in s.7.2, about p.34). Three fetches at different offsets; none reach s.7.3.
- No other Alberta government source found giving AB's ARM2 bounds or default ISR.
- Tool rule: for Edmonton, show Tier 1 (100%) and label "Alberta conversion values not read; BC values shown for comparison". conf 0 for AB numbers.

**2b. AAAQO NO2 1-hour statistical form — gap stays, now characterised**
- AAAQO 2024 states no percentile or averaging-over-years form. It says equipment "should be designed and operated in such a way that the ambient air quality remains below AAAQOs and AAAQGs", and exceedances "must be reported as outlined in the Air Monitoring Directive."
- Reading: each modelled or measured hour is compared directly (no 98th pct). This is an inference → conf 60. Confirm in the Air Monitoring Directive (not read).
- Contrast for the tool: Metro Vancouver/BC/CAAQS use 98th pct D1HM over 3 yrs; Alberta compares max values. Show this, it partly offsets AB's higher number.

**2c. Alberta standby generator exemption — traced; statute not read**
- Where the register's claim comes from: AUC Decision 27938-D01-2023, 10 Mar 2023, para 10. https://efiling-webapi.auc.ab.ca/Document/Get/784765 · utility regulator decision · conf 70.
  - "Modelling results for the power outage scenario were presented to Alberta Environment and Protected Areas and it confirmed that emergency standby or backup power plants or generators are exempt from an approval" … "under the Environmental Protection and Enhancement Act."
  - Same para: "Alberta does not have emission standards for diesel generators."
  - This is the AUC reporting what the applicant said AEPA confirmed. The decision does not cite the regulation clause.
  - Testing in that decision (para 8): "at 100 per cent load, one generator a day will be tested for up to two hours, two times per year"; daytime only (para 13, 23). Applicant commitment = CLAIM.
- Likely legal home: Activities Designation Regulation, Alta Reg 276/2003 (EPEA) — **could not read**: King's Printer PDF and CanLII both robots-blocked. Clause wording UNVERIFIED.
- Tool label: "Alberta: standby generators exempt from EPEA approval (per AUC 27938-D01-2023 para 10; regulation text not read)".

**2d. Background NO2 and PM2.5**

Vancouver — BC Environmental Reporting (government · conf 80):
- NO2, 2022–2024, *envreportbc_no2_April2026.pdf* (pp.52–54). https://www.env.gov.bc.ca/soe/indicators/air/print_ver/envreportbc_no2_April2026.pdf
  - Vancouver Clark Drive: "NO2 1‑hour Metric: 43.6ppb (3 year average)"; "NO2 Annual Metric: 15ppb (1 year average)".
  - Vancouver International Airport 2: 1-h 39.9 ppb; annual 11.6 ppb.
  - Vancouver Robson Square: 1-h "Insufficient Data"; annual 15.9 ppb.
  - Year of the annual value not labelled on the page (likely 2024).
- PM2.5, 2020–2022, *envreportbc_pm25_June2025.pdf* (pp.54–55). https://www.env.gov.bc.ca/soe/indicators/air/print_ver/envreportbc_pm25_June2025.pdf
  - Clark Drive: "PM2.5 24‑hour Metric: 27 μg/m³ (3 year average)"; annual 7 µg/m³.
  - YVR 2: 24-h 21; annual 5.4 µg/m³.
  - Not stated whether these station values have wildfire days removed (p.8 says removal applied to management levels).
- Metro Vancouver 2024 Annual Air Quality Summary (p.14): NO2 above the 42 ppb 1-h objective at "Vancouver-Clark Drive, Horseshoe Bay, and North Vancouver-Second Narrows"; above the 12 ppb annual objective at "Vancouver-Downtown and Vancouver-Clark Drive". PM2.5 met at all stations (p.12). https://metrovancouver.org/services/air-quality-climate-action/Documents/annual-air-quality-summary-2024.pdf · conf 80.
  - Meaning for the tool: at busy Vancouver sites, background NO2 is already at or over the regional objective. Any added NO2 matters.

Edmonton — Alberta Capital Airshed, *Annual Report to the Community 2023* (pp.12, 14). https://capitalairshed.ca/wp-content/uploads/2025/06/ACA-AR2023-24_F100824-1.pdf · multi-stakeholder airshed monitoring body, part-funded by AEPA · conf 70 (official network data, published by non-government body).
- NO2 annual mean, ppb, 2022 / 2023: Edmonton East 13.2 / 13.9 · Lendrum 10.2 / 11.1 · McCauley 12.1 / 12.7 · Woodcroft 12.2 / 12.8.
- PM2.5 annual mean, µg/m³, 2022 / 2023: East 7.9 / 21.0 · Lendrum 8.5 / 17.1 · McCauley 9.5 / 22.4 · Woodcroft 7.8 / 19.4. 2023 is wildfire-driven (May–Sep) — use 2022 or a multi-year value.
- **No 1-h NO2 98th pct or 24-h PM2.5 98th pct found for Edmonton.** Gap — parity not reached.
- Alberta air-indicator pages (published 14 Apr 2026) show station values only in interactive maps; text says Edmonton and Calgary have the highest NO2 in the province.

Unit check (arithmetic, conf 100; 25 °C, 1 atm; NO2 1.88 µg/m³ per ppb):
- Clark Drive 43.6 ppb → 82 µg/m³ (1-h metric). Annual 15 ppb → 28 µg/m³.
- Edmonton East 13.9 ppb → 26 µg/m³ (annual).

Method notes for background:
- BC Level 1 wants the **100th percentile** (maximum) background — neither BC report above gives it. The 98th pct metric understates a Level 1 background.
- AB guideline: baseline from "The most recent three years of hourly ambient data" (s.7.2); percentile wording cut off in fetch — UNVERIFIED.
- Tool: show background as "monitored metric, not the regulator's screening background".

**2e. Heat plume / recirculation rule — no open government or peer-reviewed rule found**
- Only quantitative source readable: Gunter & Shipes, "Hot Air Recirculation by Air Coolers", AIChE-ASME 12th National Heat Transfer Conf., Tulsa, Aug 1971; authors from Hudson Products (manufacturer). Hosted on a manufacturer site. https://files.chartindustries.com/hudson/Hot-Air-Recirculation.pdf · conference preprint, manufacturer authors = CLAIM · conf 50.
  - "If either equation 3 or 4 is negative there will be hot air recirculation." (p.5). Equations garbled in extraction — not usable as written.
  - Field cases: "13.6 percent recirculation", inlet rose 5–7 °F, capacity down about 10% (p.8); unit added at a different elevation: "24 percent hot air recirculation and approximately 35 percent reduction in cooling capacity" (p.9); "50 percent of hot exit air is trapped by compressor building" (p.10).
  - "Ve/Vw and Ve/Va ratios are primary factors" (exit vs wind and approach velocity, p.4). Induced draft (exit 20–28 fps) recirculates less than forced draft (9–12 fps) (p.8).
  - Authors: equations are preliminary; more field data needed (p.10).
- Use in tool: supports recirculation_flag triggers (unequal heights, gaps, nearby building) and a range "10–25% recirculation observed in field cases (1971, CLAIM)". No formula.
- Could not read (robots): Duvenhage & Kröger, *J. Wind Eng. Ind. Aerodyn.* (ScienceDirect S0167610596000827); OSTI ETDEWEB 43615 (heat diffusion of air-cooled exchangers); Stanford nanoheat *Appl. Therm. Eng.* PDF.
- DOE 2013 air-cooled condenser peer-review slides: no recirculation numbers.

### Changes to round 1 proposals
- **air_vs_objective**: Vancouver line = Metro Vancouver AAQO (NO2 1-h 79 µg/m³, annual 22.6). BC AQO as second line. Edmonton = AAAQO, compared hour by hour (conf 60 on form).
- **air_vs_objective** background inputs: Vancouver Clark Drive / YVR 2 (BC envreport, conf 80); Edmonton ACA annual means (conf 70); Edmonton short-term background = gap.
- **no2_at_receptor**: Edmonton uses Tier 1 only until AB s.7.3 is read.
- **recirculation_flag**: drop Wray & Akbari as recirculation evidence for yards; add Gunter & Shipes field range (CLAIM, 50). Add a note: roof finish raises inlet air ~0.3 °C on a hot roof (Wray & Akbari, conf 70).
- **heat_flux_site**: keep Vancouver 119 with "units assumed W m⁻²".
- **genset_test / generator_nox_pm (Edmonton)**: cite AUC 27938-D01-2023 para 10; mark regulation clause unverified.

### Could not read (round 2)
- AB Air Quality Model Guideline 2021 s.7.3 and end of s.7.2 — fetch text stops near p.34 (3 attempts).
- Activities Designation Regulation, Alta Reg 276/2003 — kings-printer.alberta.ca and canlii.org robots-blocked.
- open.alberta.ca "Status of air quality in Alberta: air zones report" and "CAAQS reporting by region" pages — server error twice.
- Metro Vancouver LFV Air Quality Monitoring Report 2021 — station values only in charts.
- ScienceDirect S0167610596000827; OSTI etdeweb 43615; nanoheat.stanford.edu air-cooled.pdf — robots-blocked.
- Alberta Air Monitoring Directive (statistical form of AAAQO compliance) — not attempted; next step.
