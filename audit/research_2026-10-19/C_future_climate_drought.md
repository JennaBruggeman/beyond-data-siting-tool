# C — Future climate and drought / water restrictions
Research pass 19 Oct 2026 (Claude). Rules: RULES.md.
Register nodes checked first: `free_cooling_hours` (CWEC 2020, conf 80), `evaporation` (FEMP, conf 100), `water_supply`, `homes_heated` (CEUD 2018–22), source `cwec`, `eccc`.
No files downloaded.

---

## Topic 1 — Future climate (2050s)

### What the tool could compute or show
- Rerun `free_cooling_hours` and HDD on a 2050s future-shifted CWEC 2020 file for each city (same code, new file).
- Scale the space-heating part of `homes_heated` by HDD_2050s ÷ HDD_now.
- Show cooling-season change (CDD, hot days) beside evaporation, as a range, not a single number.

### Findings — future weather files

- PCIC future-shifted files are built on CWEC 2020 — the tool's current base file.
  — "Future-shifted weather files have been produced for locations across Canada listed in the CWEC 2020 dataset."
  — PCIC, Weather Files page (v3.0, Dec 2024), https://www.uvic.ca/pcic/data-analysis-tools/data-portal/weather-files/index.php · research consortium (UVic) · conf 80
- Method: CMIP6 ensemble, daily adjustment.
  — "adjusted using an ensemble of CMIP6 climate model projections" … "on a daily basis, based on the model-projected change"; baseline "1998-2017"
  — same page · conf 80
- Periods and scenarios.
  — "five future time periods (2040s, 2050s, 2060s, 2070s, and 2080s)"; "low (SSP1-2.6), moderate (SSP2-4.5) and high (SSP5-8.5) emissions scenarios"; "Download the data in EPW file format."
  — same page · conf 80
- Coverage and count.
  — "15 future-shifted weather files at each of the 564 CWEC2020 locations"
  — Sobie & Curry, *Data in Brief* 60 (2025) 111667, Section 3, doi 10.1016/j.dib.2025.111667 (read via https://pmc.ncbi.nlm.nih.gov/articles/PMC12151185) · peer-reviewed · conf 80
- Vancouver Intl is the paper's worked example.
  — "the CWEC2020 file at Vancouver International Airport" (Section 4). Edmonton not named; Edmonton Intl is a CWEC 2020 station (register `cwec`), so it should be covered — **unverified until the file is seen**.
- Only four variables change. Matters for free cooling (dry bulb, dew point both change) — fine; solar and wind unchanged.
  — "dry bulb temperature, dew point temperature, relative humidity, and surface pressure" are adjusted; "The hourly time series for all other variables remain unchanged."
  — same paper, Section 3 · conf 80
- Key limitation: heat waves are not lengthened.
  — "the hour-to-hour sequencing of events is preserved from the existing file"; "the frequency and duration of persistent events such as heat waves or cold spells remain largely unchanged"
  — same paper, Limitations · conf 80
- Older PCIC v2.2 (CMIP5, CWEC 2016) still offered — do not mix with v3.
  — "Future-shifted files for CWE2016 locations in Canada (v2.2), based on CMIP5 models, are also available."
  — PCIC page above · conf 80
- NRC files: a second, different method (regional model, warming levels, extreme years).
  — "NRC used a regional climate model (CanRCM4 LE) output to create eight weather files"; levels "+0.5°C … +3.5°C"; "one baseline (1991 to 2021)"; types TMY, TDY, ECY (Extreme Cold Year), EWY (Extreme Warm Year), MRY
  — ClimateData.ca, "What is the difference between the two future weather file datasets?", https://climatedata.ca/?p=10893 and https://climatedata.ca/?p=10763 · government portal (ECCC/CCCS) · conf 80. Locations count not stated.
- Future building design values (NBC Table C-2 adjusted) exist as one-page PDFs per code location.
  — "adjusts each design variable in Table C-2 of the NBC to account for climate change"; Tier 1 (high confidence) includes "heating degree days … July 2.5% dry bulb and wet bulb"; "more than 660 locations"; 1.5 °C and 3.0 °C warming vs 1986–2016
  — ClimateData.ca, "Introducing Future Building Design Values", https://climatedata.ca/resource/introducing-future-building-design-values-choosing-and-using-future-climatic-design-data/ · government portal; underlying report Cannon et al. 2020 (CRBCPI) · conf 80. "intended to inform potential updates" — **not adopted in code**.

### Findings — published 2050s projections (regional, RCP8.5, CMIP5-era)

Metro Vancouver (PCIC for Metro Vancouver; 12 CMIP5 models; baseline 1971–2000; 2050s = 2041–2070)
— *Climate Projections for Metro Vancouver* (2016), https://metrovancouver.org/services/air-quality-climate-action/Documents/climate-projections-for-metro-vancouver-2016.pdf · regional government · conf 80
- HDD 3,489 → 2,605 (−25%) (p. 35). Region-wide incl. mountains; not comparable to the airport file's 2,810.
- CDD 49 → 235 (+186; range 81–295) (p. 30).
- Summer days > 25 °C: 22 → 55 (p. 24, 26).
- 1-in-20 hottest day 34 → 39 °C (p. 26; Exec. Summary says 38 — internal inconsistency).
- Summer precipitation −19% (p. 13); longest dry spell 21 → 26 days (p. 18).
- April 1 snowpack in Capilano/Seymour/Coquitlam watersheds −58% (292 → 123 cm) (p. 17).
- "could put strain on the existing water supply during times of the year when temperatures are high" (p. 37).

City of Vancouver (same method) — PCIC *Climate Impacts Summary*, 15 Apr 2016, https://www.pacificclimate.org/sites/default/files/publications/VancouverSummary_Final.pdf · research consortium · conf 80
- "29% fewer heating degree days" (Table 1: 2,860, −820).
- "cooling degree days grow from 60 to 250 degree days per year".

Edmonton Metropolitan Region (PARC; 11 simulations from 4 regional climate models; RCP8.5; baseline 1976–2005; 2050s = 2041–2070)
— EMRB, *From Risk to Resilience: EMRB Climate Resilience Study* (prepared by Associated Engineering — consultant for a regional board; date not shown in text, file name says 2023), Table 2-1 p. 9, https://www.leduc.ca/wp-content/uploads/2025/07/CRVA-From-Risk-to-Resilience-EMRB-Climate-Resilience-Study-2023.pdf · regional government (consultant-prepared) · conf 80
- HDD 5,657 → 4,331 (−1,326; −23%; range 3,867–4,869).
- CDD 12 → 144 (range 66–259).
- Days ≥ 30 °C: 1 → 11 (range 2–28).
- Summer mean 14.4 → 17.5 °C.
- Drought index SPEI 1.7 → 1.0 (still above the −1 drought threshold) (p. 9, note 8).

### Vancouver vs Edmonton
- Both have a regional 2050s RCP8.5 set. They are **not like-for-like**: different models, baselines (1971–2000 vs 1976–2005) and footprints.
- For parity, the tool should take both cities from the **same** PCIC v3 CWEC 2020 files, not from these reports.
- Direction is the same: HDD down ~23–25%; CDD up from near zero.
- Edmonton keeps far more heat demand (4,331 HDD 2050s vs Vancouver airport now 2,810).
- Vancouver loses the most snowpack-fed summer water supply; Edmonton's river supply has no equivalent snowpack figure found.

### Proposed node(s) or change
- `weather_scenario` (input selector) — values: `CWEC 2020 (1998–2017)` | `2050s SSP2-4.5` | `2050s SSP5-8.5` (PCIC v3). Feeds `free_cooling_hours`, HDD, evaporation-season share. Tier: community + full. Conf 80 (data); approach temps stay 60.
- `free_cooling_hours_2050s` — same formula as `free_cooling_hours`, run on the future file. Show beside today's value, both scenarios. Caption: "heat waves not lengthened in this file". Tier: full.
- `homes_heated_2050s` — homes = Q_available ÷ (q_space × HDD_f ÷ HDD_0 + q_DHW). Assumption: space heat ∝ HDD; DHW unchanged. Split q_space / q_DHW from CEUD 2023 shares already in register (BC 46.2% / 27.1%; AB 63.1% / 23.2%). Conf 60. Tier: resident (one line: "by the 2050s the same heat covers more homes").
- `cooling_season_shift` — show CDD and hot-day counts from the future file (computed) rather than the reports. Tier: community.
- Optional: an NRC EWY (extreme warm year) run as a stress case for dry-cooler capacity. Tier: full. Only if J.B. downloads it.

### Files J.B. would need to download (not downloaded)
- PCIC v3: Vancouver Intl and Edmonton Intl, 2050s, SSP2-4.5 and SSP5-8.5 (4 EPW files) — https://services.pacificclimate.org/wx-files/app/ — size not shown (page not readable here).
- Same set also on Zenodo — https://doi.org/10.5281/zenodo.15151116 — size not read.
- Optional NRC future files (TMY/EWY at +2.0 °C) — https://nrc-digital-repository.canada.ca/eng/view/object/?id=92bfa9cf-6d35-4de4-80c2-799f53961f60 — size not read.
- Optional: ClimateData.ca future building design value one-page PDFs for Vancouver and Edmonton (July 2.5% dry/wet bulb at +1.5 / +3.0 °C).

### Could not read / still a gap
- https://services.pacificclimate.org/wx-files/app/ — blocked (provenance), not retried.
- https://doi.org/10.5281/zenodo.15151116 — blocked (provenance).
- https://nrc-digital-repository.canada.ca/eng/view/object/?id=92bfa9cf-6d35-4de4-80c2-799f53961f60 — blocked (provenance). NRC location list unconfirmed.
- https://climatedata.ca/variable/bdv/?info — fetch error.
- No CMIP6-based published 2050s HDD/CDD for either city read; future design temperatures (July 2.5%) per city not read.
- Edmonton Intl presence in PCIC v3: inferred, not seen.

---

## Topic 2 — Drought and water restrictions

### What the tool could compute or show
- A plain rule per city: what a water restriction would ask of evaporative cooling, and how binding it is.
- Share of annual evaporation that falls inside the restriction season (May 1 – Oct 15), from the hourly file.
- Recent stage history as a short dated list.

### Findings — Metro Vancouver / City of Vancouver

- Stage 1 every year, May 1 – Oct 15.
  — "Stage 1 comes into effect automatically each year – on May 1 until October 15"
  — Metro Vancouver, *Drinking Water Conservation Plan* (Nov 2021), s. 3.1 p. 8, https://metrovancouver.org/services/water/Documents/drinking-water-conservation-plan.pdf · regional government · conf 90
- Stages 2–4 by the GVWD Commissioner, any time.
  — "Stages 2, 3 and 4 are activated and deactivated by the GVWD Commissioner" (s. 3.5 p. 14) · conf 90
- No stage names cooling towers, evaporative cooling or air conditioning (Claude's read of the whole plan). Non-residential limits are lawns, golf, vehicle washing, pools, surfaces.
- Stage 4 (emergency) — industry only asked.
  — "Metro Vancouver could request that industrial water users implement voluntary reductions" (s. 3.4 p. 13) · conf 90
- Stage 4 triggers are emergencies, not drought alone: earthquake, flood, wildfire, severe weather, prolonged regional power outage (p. 13) · conf 90
- City bylaw mirrors this; no cooling clause.
  — City of Vancouver Drinking Water Conservation By-law No. 12086 (consol. to 13 Jun 2023), ss. 5.1, 9.2, 10.2, https://bylaws.vancouver.ca/12086c.pdf · bylaw · conf 90
  — Only general clause: s. 6.2(b) prohibits "leaking of water from appliances, devices, machines, equipment, systems".
  — Fines: Stage 3 "no less than $750.00" (s. 11.4(f)); Stage 4 "no less than $1,000.00" (s. 11.4(h)).
- Once-through cooling on City water is prohibited at all times (permanent rule, not a drought rule).
  — "equipment that produces a cooling effect by transfer of heat to water that is only circulated once through the equipment"; s. 3.9(a) no connection; s. 3.10 existing "must be disconnected from the City's water system by January 1, 2020"; emergency/maintenance units only "with a permit from the Engineer"
  — By-law No. 11777 amending Water Works By-law No. 4848, enacted 2 May 2017, https://bylaws.vancouver.ca/consolidated/11777.pdf · bylaw · conf 90
  — Recirculating loops to a cooling tower "are not OTC systems" — City of Vancouver, *Once-Through Cooling Identification Guide* (Nov 2019) p. 5, https://vancouver.ca/files/cov/once-through-cooling-identification-guide.pdf · government guidance · conf 90
- Cooling towers: operating permit and monthly Legionella reporting.
  — "Operating permit required for new and existing systems."; "Legionella pneumophila reporting required at seasonal start-up and every month of operation."
  — City of Vancouver, *Water Safety, Efficiency and Sewage Requirements* (updated 19 Sep 2025), https://vancouver.ca/files/cov/water-efficiency-requirements.pdf · government summary · conf 90
  — Cooling tower backflow class "High RPBA" (By-law 11777, Schedule J) · conf 90

Recent stage history (official only)
- 2022: updated plan first used ("first implemented on May 1, 2022").
- 2023: "Stage 2 of the DWCP was activated by the GVWD Commissioner on August 4, 2023"; "Summer 2023 was the first time that Stage 2 of the updated DWCP was implemented."; Lower Mainland basin at provincial drought level 5 on 17 Aug 2023.
  — Metro Vancouver Water Committee, *Summer 2023 Water Supply Performance* (30 Oct 2023) pp. 2, 5, 7, https://metrovancouver.org/boards/GVWD/WD_2023-Nov-24_ADD-I1.pdf · conf 90
- 2025: as of 6 May 2025, "no strong indications that Stage 2 … will need to be activated" — https://metrovancouver.org/boards/GVWD/WD-2025-05-23-ADD-I1.pdf p. 3. Outcome for summer 2025 **not confirmed**.
- 2026: Stage 2 from 1 May (snowpack "approximately 44% per cent of the historical average" on 1 May) — *Water Supply Preparedness for Summer 2026* (1 May 2026) p. 1, https://metrovancouver.org/boards/GVWD/WD-2026-05-29-ADD-I1.pdf · conf 90
- 2026: "Metro Vancouver will move to Stage 3 water restrictions effective June 8, 2026." — Vancouver Park Board memo, 5 Jun 2026, https://parkboardmeetings.vancouver.ca/files/MEMO-MetroVancouverWaterRestrictionsImpacts-20260605.pdf · conf 90
- 2026: "Stage 1 water restrictions will be back in effect starting September 1, 2026" — City of Vancouver, https://vancouver.ca/home-property-development/understanding-watering-restrictions.aspx (announced 27 Aug 2026) · conf 90
- Industrial sector ≈ 3.3% of 2023 regional consumption (2026 report, p. 9) · conf 80

Provincial layer (BC)
- Provincial drought levels "do not automatically trigger municipal or provincial response actions" (p. 23); WSA s. 88 can curtail "regardless of the precedence of water rights" for fish (p. 30); "older rights have priority over newer rights" (p. 29).
  — BC, *Drought and Water Scarcity Operations Plan* (Apr 2026), https://www2.gov.bc.ca/assets/gov/environment/air-land-water/water/drought-info/drought_and_water_scarcity_operations_plan.pdf · provincial government · conf 90
  — Applies to licensees (Metro Vancouver), not to a customer on municipal supply.

### Findings — Edmonton / EPCOR

- Four stages with fixed reduction targets.
  — "Stage 1: Limited water restrictions (5% reduction)" … "Stage 2 … (10% reduction)" … "Stage 3 … (15% reduction)" … "Stage 4: Critical water restrictions (25% reduction)"; "There are currently no water restrictions in Edmonton."
  — EPCOR, Water Restrictions in Edmonton, https://www.epcor.com/ca/en/ab/edmonton/conservation/water-restrictions.html (read 19 Oct 2026; no page date) · utility (city-owned) · conf 90
  — FAQ: "Do water restrictions happen every year?" — "No."
- Businesses must follow stage restrictions.
  — "Businesses must follow the specific water restrictions that are in effect during each water restriction stage."; "Optimize all automated water-using equipment, like cooling towers."; Stage 2: "Optimize cooling and building systems."
  — EPCOR, business guidance, https://www.epcor.com/ca/en/ab/edmonton/conservation/water-restrictions/business-guidance.html (no date) · utility · conf 90
- Stage guides: cooling is "where possible"; continuous-flow processes "must" be limited at Stage 3–4.
  — Stage 2: "Review and adjust cooling, refrigeration and temperature-control systems to reduce water use where possible."; "Shut down or limit non-essential water-using features, continuous flow equipment and processes."
  — https://www.epcor.com/content/dam/epcor/documents/supporting-documents/stage-2-water-restrictions-business-guide.pdf
  — Stage 3 lists "Shut down or limit non-essential … continuous flow equipment and processes" under "Actions your business must take"; cooling line stays "where possible".
  — https://www.epcor.com/content/dam/epcor/documents/supporting-documents/stage-3-water-restrictions-business-guide.pdf
  — Stage 4: same; also "Do not use water for building construction purposes including construction, testing, and commissioning of plumbing, … heating and cooling systems."; purpose "essential services such as health care, firefighting and emergency response."
  — https://www.epcor.com/content/dam/epcor/documents/supporting-documents/stage-4-water-restrictions-business-guide.pdf
  — all undated · utility · conf 90
  — Whether a data centre's cooling counts as "non-essential" is **not defined** (judged, conf 20).
- Legal basis not stated. EPCOR Water Services Bylaw 19626 (in force 1 Apr 2022) has no restriction clause in the part read; s. 10.2(a) lets EPCOR turn off service for "actual or potential danger to life or property".
  — https://epcor.com/content/dam/epcor/documents/supporting-documents/epcor_water-services_bylaw%E2%80%8B-19626.pdf · bylaw · conf 90 (partial read)
- Drought plan exists; stage triggers not public.
  — "fixed demand reduction targets at each stage" (p. 19); "As of the fall of 2024, there are no restrictions to the NSR licenses" (p. 13); current demand measures "are sufficient to bridge short-term hot and dry conditions" (p. 14)
  — EPCOR, *Edmonton Drought Resiliency Plan* (2024), https://www.epcor.com/content/dam/epcor/documents/supporting-documents/edmonton_drought-resiliency-plan.pdf · utility · conf 90

Recent restriction history (official only)
- 29 Jan – 2 Feb 2024: mandatory ban on non-essential use, caused by an electrical failure at a treatment plant (not drought). EPCOR met largest customers (brewing, manufacturing, animal processing); 300+ high-use businesses contacted.
  — EPCOR media release, 29 Jan 2024 (updated on lifting), https://www.epcor.com/ca/en/news/media-releases/2024-01-29-non-essential-water-use-ban.html · utility · conf 90
  — Confirmed in *Edmonton Waterworks Annual Report to AEPA 2024*, s. 1.1, 1.4: "A Measure C MANDATORY nonessential public water ban" · regulatory filing · conf 90
- 2024 demand: average 389 ML/d; peak 567 ML/d on 18 Jul 2024 (same report, s. 1.1, 1.6) · conf 90
- No drought-triggered restriction in Edmonton found in official sources.

Provincial layer (Alberta)
- "Alberta allocates water by seniority, under a system called First In Time, First In Right."; "A brand-new data centre licence stands last."; "If a river runs low, the newest licences are cut first."; "Alberta encourages low-water and no-water cooling."; North Saskatchewan basin "carry significantly more supply"
  — Government of Alberta, Data centres — Water, https://www.alberta.ca/datacentres/water (published 2022-11-23, updated after 11 Mar 2026) · provincial government · conf 90
  — The page's "2.6 million gallons per megawatt per year" is cited from NVIDIA — **operator/manufacturer claim** (conf 50).
- Water shortage stages 1–5; Stage 3 "a water management order may be issued directing upstream junior licence holders to reduce or cease diversion."
  — GoA, *Water Shortage Management Stages* (Aug 2023), https://open.alberta.ca/dataset/fa34c6e0-14e2-4eb4-b553-8c6e13bf122a/resource/488e9eef-0c58-4527-91c7-1be7680368f5/download/epa-water-shortage-management-stages-2023-08.pdf · conf 90
  — Applies only if the data centre holds its own river or groundwater licence; on EPCOR supply, EPCOR's senior licence applies.

### Vancouver vs Edmonton
- Vancouver: restrictions are **seasonal and frequent** (Stage 2 in 2023 and 2026; Stage 3 in 2026) but **never name cooling**. Evaporative cooling is not restricted at any stage; Stage 4 asks industry for voluntary cuts.
- Vancouver has a **permanent** ban on once-through potable cooling; Edmonton: no equivalent found in the bylaw text read.
- Edmonton: restrictions are **rare** (none drought-triggered found) but stage guides **do name cooling towers** and set % targets; cooling cuts are "where possible".
- Edmonton's 2024 ban came from plant failure, not drought — supply risk there is infrastructure as much as climate.
- Alberta adds a licence-seniority rule for self-supplied water; BC's equivalent binds Metro Vancouver as licensee, not its customers.
- Vancouver supply is snowpack- and reservoir-fed with snowpack projected −58% by 2050s; no equivalent Edmonton river-flow projection read.

### Proposed node(s) or change
- `water_restriction_rule` (condition, per city) — text rule, no score:
  - Vancouver: "Stages 1–3 do not restrict evaporative cooling. Stage 4 (emergency): voluntary industrial reduction request. Once-through cooling on City water: prohibited at all times (By-law 4848 s. 3.9–3.10). Tower needs operating permit + monthly Legionella report." Conf 90.
  - Edmonton: "EPCOR Stage 1–4 targets 5/10/15/25%. Businesses must follow stages; cooling towers: optimise (all stages), reduce 'where possible' (Stages 2–4); non-essential continuous-flow processes must be limited (Stages 3–4). Whether data-centre cooling is essential: not defined." Conf 90 for text; 20 for the "essential" reading.
  - Inputs: `cooling_type`, city. Tier: community + full. Resident tier: one line ("in a drought, the city could ask this building to cut cooling water").
- `evap_restriction_season_share` — share = Σ evaporation in hours 1 May–15 Oct ÷ annual evaporation; hourly evaporation = evaporative-mode heat rejected ÷ h_fg (from `evaporation`), using the CWEC (or 2050s) file and the plant's free-cooling switch-over. Conf 60 (derived; switch-over temperatures are assumptions). Tier: full. Shows how much of the water draw lands in the restricted months.
- `restriction_history` (display list) — dated official events above; label 2025 Vancouver as unknown. Tier: community.
- `water_supply` — add the Alberta seniority note ("new licence stands last") and Vancouver's 2050s snowpack line as context. Conf 90 / 80.

### Could not read / still a gap
- Metro Vancouver stage activations before 2022 (e.g. any past Stage 3) — no official source read; news results not used.
- Summer 2025 Vancouver stage outcome — not confirmed.
- 2021 EPCOR voluntary restriction (SE Edmonton): https://www.epcor.com/about/news-announcements/Pages/2021-07-05-epcor-lifts-voluntary-water-restriction-for-SE-edmonton.aspx — page returned an empty news shell; cause and dates unread.
- EPCOR Stage 1 business guide (https://www.epcor.com/content/dam/epcor/documents/supporting-documents/stage-1-water-restrictions-business-guide.pdf) — not read.
- Bylaw 19626 Articles 11–14 (incl. s. 14.6 service interruptions) — truncated; restriction authority for EPCOR stages unconfirmed.
- EPCOR stage triggers (river flow, demand) — not public in the plan read.
- No Edmonton bylaw on once-through cooling found; not searched beyond Bylaw 19626.

---

## Round 2 (verification and gaps)
Skeptic pass 19 Oct 2026 (Claude, second agent). Each source re-opened. Rules: RULES.md. No files downloaded.
Scale: CONFIRMED · CORRECTED · UNVERIFIED.

### Task 1 — claim check

**1. PCIC future-shifted files**
- Version: **CORRECTED (refined).** PCIC page: "In December 2024, the weather files were updated to version 3." Zenodo record gives the exact release as **"PCIC-WX-3.0.1"** (published 27 Jan 2025).
  — https://www.uvic.ca/pcic/data-analysis-tools/data-portal/weather-files/index.php · https://zenodo.org/records/15151116 · conf 80
- Base CWEC 2020: **CONFIRMED.** "Future-shifted weather files have been produced for the locations across Canada listed in the CWEC 2020 dataset." (PCIC page)
- Baseline: **CORRECTED (clarified).** The page says "a baseline period of 1998-2017" — that is the CWEC 2020 file's own period.
  - The change factors are computed against a different period: "these factors are calculated for a future climatological period (e.g. 2050s) relative to a 1991–2020 historical period" — Sobie & Curry 2025, Section 4.
  - Tool caption should say: base file 1998–2017; shift = 2050s minus 1991–2020.
- Scenarios: **CONFIRMED.** "low (SSP1-2.6), moderate (SSP2-4.5) and high (SSP5-8.5) emissions scenarios".
- Periods: **CONFIRMED.** "five future time periods (2040s, 2050s, 2060s, 2070s, and 2080s)".
- Location count: **CONFIRMED.** "15 future-shifted weather files at each of the 564 CWEC2020 locations in Canada" (Sobie & Curry 2025, Data Description; same count on Zenodo).
  - Cross-check: ECCC Engineering Climate Datasets page: CWEC "564 datasets" — https://climate.weather.gc.ca/prods_servs/engineering_e.html · conf 80.
  - The PCIC page itself states no count.
- Adjusted variables: **CONFIRMED.** "the hourly time series of dry bulb and dew point temperature, relative humidity, and surface pressure are adjusted".
- Heat-wave quote: **CONFIRMED** (exact). "the frequency and duration of persistent events such as heat waves or cold spells remain largely unchanged" — Limitations. Sentence ends "in the future-shifted files."
- Edmonton Intl included: **UNVERIFIED.** Not named in the paper, PCIC page, UVic DSpace record or Zenodo.
  - Zenodo has "Alberta_Future_Weather_Files.zip" (330.7 MB); each province zip holds "directories for its CWEC2020 locations". Station names inside not visible.

**2. Metro Vancouver 2050s** (*Climate Projections for Metro Vancouver*, 2016) — **CONFIRMED**, with two notes.
- HDD: Table 16 p. 35: 3489 → 2605; "Heating degree days are projected to decrease by 25% by 2050s."
  - **Added note:** Exec. Summary p. vi says "heating demand for buildings will decrease by 29%" — second internal inconsistency. Use the 25% table value.
- CDD: Table 12 p. 30: 49 → 235, +186 (range 81 to 295). Text: "a 380% increase".
- Hottest day: p. 26: "By the 2050s we can expect this value to increase to 39°C." Exec. Summary: "from 34°C to 38°C". Inconsistency confirmed.
- Snowpack: p. 17: "the April 1 snow depth will decrease by 58% by the 2050s, from 292 cm to 123 cm". Per watershed (Table 5): Capilano −59%, Seymour −59%, Coquitlam −57%.
- Summer days > 25 °C 22 → 55; baseline 1971–2000; 12 models; RCP8.5 — all confirmed.

**3. EMRB Edmonton** (Table 2-1 p. 9) — **CONFIRMED**, one wording fix.
- HDD 5,657 → 4,331 (−1,326); CDD 12 → 144; days ≥ 30 °C 1 → 11; summer mean 14.4 → 17.5 °C; SPEI 1.7 → 1.0.
- **CORRECTED (wording):** the ranges are **10th–90th percentile**, not min–max. HDD 3,867–4,869; CDD 66–259; hot days 2–28.
- "prepared by Associated Engineering Alberta Ltd. for the account of Edmonton Metropolitan Region Board" — consultant-prepared, confirmed. No publication date in text.
- SPEI "−1 drought threshold" note (note 8) — not re-opened this round.

**4. Vancouver DWCP — no stage restricts cooling towers** — **CONFIRMED.**
- Full-text check: no "cooling tower", "cooling", "air conditioning", "evaporative" or "HVAC" anywhere in the plan (Nov 2021).
- Stage 4 sentence in full: "Metro Vancouver could request that industrial water users implement voluntary reductions or reschedule … production processes that consume large amounts of water until Stage 4 is deactivated." (s. 3.4 p. 13)
- Stage 1 dates and Commissioner role: exact quotes confirmed (s. 3.1 p. 8; s. 3.5 p. 14).
- By-law 12086 (consol. 13 Jun 2023): no mention of cooling, towers, air conditioning, evaporative or process water. s. 6.2(b), 11.4(f) $750, 11.4(h) $1,000 confirmed.

**5. Once-through cooling ban and tower permit** — **CONFIRMED.**
- By-law 11777 is "A By-law to amend Water Works By-law No. 4848"; "ENACTED by Council this 2nd day of May, 2017".
- s. 3.9 "must not connect"; s. 3.10 "must be disconnected from the City's water system by January 1, 2020"; emergency/maintenance units "with a permit from the Engineer".
- Definition explicitly "includes but is not limited to commercial and industrial air conditioners".
- **Added:** s. 3.10(b) let the Engineer extend to 1 Jan 2021 for buildings with an earlier demolition permit.
- Schedule J: "Cooling Tower High RPBA" — confirmed.
- Tower permit: "Operating permit required for new and existing systems."; Legionella "at seasonal start-up and every month of operation." — *Water Safety, Efficiency and Sewage Requirements*, "Updated September 19, 2025".
  - The summary names **no by-law** as the permit authority. Do not cite a section number for the permit.

**6. Stage dates 2023 and 2026** — **CONFIRMED**, end date added.
- 2023: "Stage 2 of the DWCP was activated by the GVWD Commissioner on August 4, 2023" (p. 2); drought level 5 "on August 17" (p. 2); "first time that Stage 2 of the updated DWCP was implemented" (p. 7).
- **Added end date:** "Stage 2 restrictions activated on August 4 until October 15." — *2024 Water Consumption Statistics Report* p. 6.
- 2026: "Metro Vancouver activated Stage 2 on May 1." (WD-2026-05-29 p. 2); snowpack "44% percent of the historical average".
- 2026: "Metro Vancouver will move to Stage 3 water restrictions effective June 8, 2026." — Park Board memo, 5 Jun 2026 (GM, Vancouver Board of Parks and Recreation).
- 2026: "Stage 1 water restrictions will be back in effect starting September 1, 2026" — City page, announcement credited to Metro Vancouver 27 Aug 2026. Page also: Stage 1 "until October 15, 2026, unless otherwise stated."
- Industrial 3.3% of 2023 consumption — confirmed (p. 9; Table 3.5 p. 31).

**7. EPCOR stages** — **CONFIRMED**, one precision added.
- "Stage 1: Limited water restrictions (5% reduction)" · "Stage 2: Moderate … (10% reduction)" · "Stage 3: Advanced … (15% reduction)" · "Stage 4: Critical … (25% reduction)"; "There are currently no water restrictions in Edmonton." (read 19 Oct 2026)
- **Added — heading matters:**
  - Stage 1 and 2 guides: heading "Actions your business **can** take". Stage 1 cooling line has no "where possible": "Review and adjust cooling, refrigeration and temperature-control systems." and "Consider limiting non-essential … continuous flow equipment and processes."
  - Stage 3 and 4 guides: heading "Actions your business **must** take". Both cooling lines sit under it: "Review and adjust cooling … to reduce water use where possible." and "Shut down or limit non-essential water-using features, continuous flow equipment and processes."
  - So at Stage 3–4 the cooling review is mandatory, but the cut is qualified by "where possible".
- Stage 1 guide (round 1 gap): now read; cooling towers not named in it.

**8. Alberta "new licence stands last"** — **CONFIRMED** (exact).
- "Alberta allocates water by seniority, under a system called First In Time, First In Right." "A brand-new data centre licence stands last." Next sentence opens: "If a river runs low, the newest licences are cut first, and the oldest, held mostly by farmers, …"
- "Alberta encourages low-water and no-water cooling." confirmed.
- 2.6 million gallons/MW: page says NVIDIA "puts numbers on it"; no report cited — stays **operator claim, conf 50**.
- Page metadata: published 23 Nov 2022; no update date shown; text cites *Water Amendment Act* proclaimed 11 Mar 2026.

### Task 2 — gaps

**A. Edmonton in PCIC v3 — still a gap (conf 0 for station name).**
- What is confirmed: an Alberta archive exists in the v3 release (Zenodo, PCIC-WX-3.0.1).
- Station name not seen in any official listing read. Not guessed.
- Related, official: CWEEDS 2023 Release Notes (NRCan) list "EDMONTON BLATCHFORD", Climate ID "3012209", as **new** in the 2023 release, and "EDMONTON CITY CENTRE AWOS" (3012202) as obsolete. That is the 2023 release, **not** CWEC 2020 — do not use it to infer the PCIC v3 list.
  — https://download-telecharger.services.geo.ca/pub/nrcan_rncan/Solar-energy_Energie-solaire/CWEEDS_2023/CWEEDS_2023_Release_Notes.pdf · government · conf 80
- How to close: J.B. opens Alberta_Future_Weather_Files.zip (or the PCIC app) and reads the folder names. The EPW header line 1 also gives station name and WMO number.

**B. Metro Vancouver stage history 2015–2025 (official only)** — conf 90
Source: Metro Vancouver *Water Consumption Statistics Report* 2016 (pp. 6–7), 2018 (p. 7), 2023 (p. 6), 2024 (p. 6); WD-2026-05-29 p. 2.
- 2015: "June 1: Stage 1"; "July 3: Stage 2"; "July 20 to Sept 8: Stage 3 - Full ban on lawn watering"; "Sept 9 to Sept 21: Stage 2"; "Sept 22: Return to Stage 1" (2016 report pp. 6–7).
- 2016: plan updated; "Stage 1 automatic activation period change to May 15 to October 15." No escalation listed.
- 2017: no stage label; region-wide lawn watering limits only (2018 report p. 7).
- 2018: plan renamed Drinking Water Conservation Plan; Stage 1 period "May 1 to October 15". No escalation listed.
- 2019–2021: "The report has no restriction entries" for these years (2023 report). No escalation listed.
- 2022: plan updated; "Stage 1 restrictions extended from October 15 to October 31." (2023 and 2024 reports p. 6)
- 2023: "Stage 2 restrictions activated on August 4 until October 15."
- 2024 and 2025: no escalation. "The most recent escalation to Stage 2 was during the summer of 2023." (WD-2026-05-29 p. 2, written 1 May 2026) — closes the round 1 "2025 unknown" gap.
- Earlier (context): 2003 "Stage 3 restrictions activated on August 5. Stage 4 restrictions activated on August 22." (2024 report p. 6)
- Caution: stage meanings changed in 2011, 2016, 2018 and 2022 (e.g. 2015 Stage 3 = lawn ban; under the 2022 plan, lawn ban = Stage 2). Do not compare stage numbers across years without the plan in force.
- Not read: *Summer 2025 Water Supply Performance* (22 Oct 2025, Water Committee) — listed by title only in WAT-2026-01-21 agenda p. 6.

**C. Official definition of "essential" in EPCOR restrictions — none exists in sources read.**
- Not defined on: EPCOR restrictions page; business guidance page; Stage 1–4 business guides; Bylaw 19626 (word "essential" absent in visible text); 2024 ban release.
- Closest official wording (conf 90 as text, 20 as applied to data centres):
  - Stage guides: "essential services such as health care, firefighting and emergency response."
  - Business guidance: "Water restrictions are designed to reduce demand while allowing essential operations to continue."
  - 2024 ban (EPCOR media release PDF, 29 Jan 2024): "Businesses using water to deliver a product or service that is life sustaining for people, animals and plants are exempt." Health-code uses also exempt (hospitals, restaurants given).
    — https://www.epcor.com/about/news-announcements/Documents/mandatory-ban-on-non-essential-water-use-jan29.pdf · utility · conf 90
- Reading for the tool: a data centre does not fit any example given. Whether its cooling is "essential" is **undefined** — keep conf 20.

**D. Like-for-like 2050s HDD/CDD (one common official source) — not obtained.**
- ClimateData.ca: location values are in interactive maps; no readable per-city HDD/CDD table found.
- ClimateData.ca future building design value summaries: "more than 660 locations"; per-city PDFs blocked by robots (North Vancouver PDF tested); HDD presence in the PDFs not confirmed.
- PCIC Design Value Explorer: blocked (provenance).
- Climate Atlas of Canada (Prairie Climate Centre, U Winnipeg; BCCAQv2, 24 models, RCP4.5/8.5, base 1976–2005) covers both cities, but values load only in the chart tool — not readable. Also not ClimateData.ca/PCIC.
- **Recommendation (unchanged from round 1, now firmer):** compute HDD and CDD for both cities from the PCIC v3 EPW files, same scenario, same period. That is the only like-for-like path found. Conf 80 (data) once the files are opened.
- Until then: show the Metro Vancouver and EMRB figures only with the label "different models, baselines and footprints — not comparable".

### Round 2 — could not read
- https://services.pacificclimate.org/wx-files/app/ — provenance block (second failure; stop).
- https://collaboration.cmc.ec.gc.ca/cmc/climate/Engineer_Climate/CWEC_FMCCE/ — provenance block.
- https://services.pacificclimate.org/design-value-explorer/?dv=HDD — provenance block.
- https://data.climatedata.ca/fileserver/bdv/en/DVE%20Guidance_North%20Vancouver,%20BC.pdf — robots disallowed.
- https://climateatlas.ca/data/city/466/minmin_2060_85 — values not in page text.
- Metro Vancouver *Summer 2025 Water Supply Performance* report — title only seen.
- EPCOR Bylaw 19626 s. 13.5, 14.6 — still truncated.
