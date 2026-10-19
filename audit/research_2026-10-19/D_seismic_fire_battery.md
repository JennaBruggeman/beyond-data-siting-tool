# D — Earthquake role, fire and battery rules
Research pass 19 Oct 2026 (agent). Follows RULES.md.
Generic equipment only. No real facility's fuel, generator or battery locations.
Register checked first: `battery`, `ups_flex`, `refuge_people`, `fuel_on_site`, `nfpa855tia`, `nfpa855_2026`, `nfcAB2023`, `vanFire14419`, conditions `a_storage_fire`, `b_fuel`.

---

## Topic 1 — Earthquake and emergency role

### What the tool could compute or show
- The importance category a data centre falls in, and how it changes if the tool adds a refuge.
- Seismic hazard per city (Sa(0.2)) as context, not a score.
- A credibility rule for the "refuge" opportunity: everyday warming/cooling vs after an earthquake.

### Findings

**Importance categories (NBC; BCBC and VBBL use the same Table 4.1.2.1)**
- Post-disaster list does **not** name data centres.
  — "Post-disaster buildings are buildings that are essential to the provision of services in the event of a disaster, and include:" … "telephone exchanges" … "power generating stations and electrical substations" … "communications facilities, including radio and television stations"
  — NBC 2023 Alberta Edition, Part 4, Table 4.1.2.1 (redline shows 2019 and 2023 wording; list unchanged). https://bildalberta.ca/wp-content/uploads/2024/04/National-Building-Code-2023-Alberta-Edition_Part-4.pdf — code text hosted by an industry association (BILD Alberta); source type: code. Conf 90 for Edmonton; 80 for Vancouver (BCBC 2024 / VBBL 2025 table not read directly; NBC base is shared).
- Communications facilities can be exempted by the authority.
  — "buildings of the following types, unless exempted from this designation by the authority having jurisdiction:" (covers emergency response, fire/police, communications facilities)
  — same table. Conf 90.
- A building likely to be a shelter becomes **High** importance.
  — "Buildings that are likely to be used as post-disaster shelters, including buildings whose primary use is:" "as an elementary, middle or secondary school" "as a community centre"
  — same table. Conf 90.
- Earthquake importance factor.
  — IE "has a value of 0.8, 1.0, 1.3 and 1.5 for buildings of Low, Normal, High and Post-Disaster importance respectively"
  — same doc, 4.1.8.1.(2)(a), 2019 wording (2023 wording garbled in the redline). Conf 80.
- Simplified seismic method threshold.
  — "Where IEFsSa(0.2,X450) and IEFsSa(2.0,X450) are less than 0.16 and 0.03 respectively" (simpler method permitted)
  — same doc, 4.1.8.1.(2), 2023 wording. Conf 90.
- Post-disaster buildings must be designed under Parts 3/4 whatever their size.
  — Parts 3, 4, 5 and 6 apply to buildings "classified as post-disaster buildings."
  — BCBC 2018 Div. A 1.3.3.2.(1)(a). https://free.bcpublications.ca/civix/document/id/public/bcbc2018/bcbc_2018dap1s13 — code. Conf 80 (2018 edition; 2024 not read).
- The definition is read literally; no carve-outs by use.
  — "There is no exception provided in the definition of a post-disaster building for a hospital." The Board pointed to the AHJ's power to exempt.
  — BC Building Code Appeal Board, Decision 1909, 23 May 2023. https://www2.gov.bc.ca/gov/content/industry/construction-industry/building-codes-standards/building-code-appeal-board/building-code-appeal-board-decisions/bcab-1909 — regulator decision. Conf 90.
- BCBC 2024 seismic (4.1.8, Appendix C) was delayed to permits from 10 Mar 2025.
  — "delayed until March 10, 2025" for permits "submitted … between March 8, 2024, and March 9, 2025"
  — AIBC summary of Ministerial Order BA 2023 10 / Bulletin B24-09. https://aibc.ca/2024/04/delay-period-for-seismic-requirements-in-the-bc-building-code-2024/ — professional regulator summary. Conf 80.

**Seismic hazard (Sa(0.2), 2%/50 yr)**
- Vancouver (City Hall) Sa(0.2) 0.848, PGA 0.369; Edmonton Sa(0.2) 0.103, PGA 0.064.
  — "Vancouver (City Hall) 0.848 0.751 0.425 0.257 0.080 0.029 0.369 0.553" / "Edmonton 0.103 0.062 0.036 0.018 0.0053 0.0022 0.064 0.044"
  — NRC Codes Canada public review, Jan 2020, Proposed Change 1405, Table C-3, pp. 8–9 of 35. https://nrc.canada.ca/sites/default/files/2020-01/NRC_CodesCanada_PublicReview_2020_NBC_NFC_NPC_NECB_combined.2020-01-28.pdf — standards body, **proposed** values. Conf 70 (final NBC 2020 Table C-3 not read).
- Site values must come from the NRCan tool, not maps.
  — "It is not intended that values be read off these maps" ; values for "Site Designation X450"
  — NRCan, 2020 NBC seismic hazard maps. https://earthquakescanada.nrcan.gc.ca/hazard-alea/zoning-zonage/NBCC2020maps-en.php — government. Conf 90.
- Ratio Vancouver/Edmonton ≈ 8× on Sa(0.2) (0.848 ÷ 0.103). Arithmetic on proposed values. Conf 60.
- Edmonton: IE × Sa(0.2) = 1.5 × 0.103 ≈ 0.15 < 0.16 even as post-disaster (reference site X450, Fs taken as 1 — assumption). Conf 60.

**Vancouver emergency plans**
- Disaster support hubs are community centres with outdoor space.
  — "25 disaster support hubs located throughout the city"; at "23 community centres, Oppenheimer Park, and the Fraserview branch" ; sited where there is "enough outdoor space for the public to gather"; later "Group lodging and shelter"; also "cooling or warming centres"
  — City of Vancouver, Disaster support hubs page (read 19 Oct 2026). https://vancouver.ca/home-property-development/disaster-support-hubs.aspx — municipal. Conf 90.
- Earthquake-fire risk is named by the City.
  — "Vancouver is at significant risk of fires caused by earthquake-induced building failure." (p. 8); "Canada's most earthquake-prone region" (p. 2)
  — City of Vancouver, Buildings Seismic Risk Reduction Action Plan, RTS 17657, report 5 May 2026. https://council.vancouver.ca/20260602/documents/r2.pdf — municipal. Conf 90.
- No mention of telecom or data centres in that plan, nor in the 2016 Earthquake Preparedness Strategy (only City IT, "back-up power generation options", pump stations "designed to be post-disaster operational").
  — https://vancouver.ca/files/cov/earthquake-preparedness-strategy-april-2016.pdf (slides 10, 11, 17). Municipal. Conf 90 (absence within those documents only).

**Reception / group lodging criteria**
- BC ESS: power is a precondition; space per person.
  — "Facilities will only be opened up if they are suitable and have power." (p. 44)
  — "The minimum sleeping area per person is 3.5 square metres (1.5 metres x 2.5 metres)" (p. 35)
  — "a distance of 0.75 metres (2.5 feet) between beds, bunks or sleeping bags should be maintained." (p. 35)
  — JIBC / EMBC ESS, Introduction to Group Lodging, Participant Guide, 26 Aug 2015. https://www.jibc.ca/sites/default/files/2020-05/EMD-EMRG-1612-Intro-to-GL-Participant-Guide-20150826.pdf — provincial training guide. Conf 90.
- **Flag:** register `refuge_people` says "2 m between beds" (Edmonton standard). JIBC says 0.75 m. Both may be right for different standards; check which the formula uses.
- Alberta: minimum services for reception centres.
  — "The centres should as a minimum, be able to provide facilities for group lodging, feeding and washrooms" ; "may also require additional facilities such as showers" (p. 7)
  — Government of Alberta, Community Evacuation Guidelines and Planning Considerations, May 2018. https://open.alberta.ca/dataset/2613f44a-2639-4195-a281-265fbbea37ff/resource/87364f53-45d4-4594-bed5-9fe0640ae8fe/download/community-evacuation-guidelines-planning-considerations-may-2018.pdf — provincial. Conf 90.
- Edmonton warming spaces: trigger and building types.
  — activates at "conditions of -20 degrees Celsius with wind chill for a minimum of 3 days in a row" ; "Open City facilities and libraries are available to anyone needing a place to warm up." ; transit stations "not safe or appropriate for sheltering."
  — City of Edmonton, Extreme Weather Response for Winter (read 19 Oct 2026). https://www.edmonton.ca/programs_services/emergency_preparedness/extreme-weather-winter — municipal. Conf 90.
- Neither city lists private or industrial buildings as hubs, reception centres or warming spaces. (Absence in pages read.) Conf 80.

### Vancouver vs Edmonton
- Hazard: Vancouver ≈ 8× Edmonton on Sa(0.2) (proposed values). Earthquake drives Vancouver's refuge case; cold drives Edmonton's.
- Vancouver: hubs = 23 community centres + outdoor space; earthquake is the design event.
- Edmonton: warming spaces = City recreation centres + libraries; triggered by −20 °C with wind chill × 3 days. Earthquake is not a driver; Edmonton Municipal Emergency Plan could not be read (see below).
- Same code base in both: Table 4.1.2.1 and IE values are national.

### Proposed node(s) or change
1. **`importance_cat`** (rule; tier: community, full)
   - Default: data centre = Normal, IE 1.0.
   - If refuge opportunity is on → "likely to be used as post-disaster shelter" → High, IE 1.3.
   - If operator markets carrier/telecom exchange function → may be "communications facility" = post-disaster, IE 1.5, unless the AHJ exempts. Show as "AHJ decides" (BCAB 1909).
   - Inputs: refuge toggle, telecom role toggle. Conf 90 (table) / 20 (whether a data centre counts — judged).
2. **`seismic_sa02`** (coefficient; tier: full)
   - Vancouver 0.848, Edmonton 0.103 (proposed Table C-3). Conf 70. Replace with NRCan tool values for the parcel when J.B. runs it.
3. **`refuge_after_quake`** (rule; tier: resident, community, full)
   - Credible after an earthquake only if ALL: importance ≥ High (structure designed IE ≥ 1.3); backup power serves the refuge space (BC ESS: "only … if … suitable and have power"); group lodging basics (washrooms, feeding, showers; 3.5 m²/person); local ESS agrees to list it.
   - Else label the opportunity "everyday heat/cold/smoke events only".
   - Vancouver: earthquake case matters. Edmonton: cold case matters (−20 °C trigger). Conf 60 (derived from rules above).
   - Cost side (not quantified): High importance raises seismic design forces by 30 % over Normal (IE 1.3 ÷ 1.0) — arithmetic on the factor, not on cost. Conf 100 for the ratio only.
4. **Fix** `refuge_people` bed spacing: cite JIBC 0.75 m between beds for BC, keep Edmonton figure only if its source is read.

### Could not read / still a gap
- NBC 2020 full text (Table C-3 final values; Note A-1.4.1.2.(1)): https://doi.org/10.4224/w324-hv93 — blocked (provenance).
- NRCan seismic hazard tool needs form input: https://earthquakescanada.nrcan.gc.ca/hazard-alea/interpolat/nbc2020-cnb2020-en.php — J.B. to run for both parcels (Vs30 or Site Class).
- BCBC 2024 / VBBL 2025 Part 4 Table 4.1.2.1 not read directly (VBBL vol. 2 read; Part 9 only).
- Post-disaster extras (irregularity limits, operational components 4.1.8.18, emergency power) — not verified.
- Edmonton Municipal Emergency Plan 2026: https://www.edmonton.ca/sites/default/files/public-files/municipal-emergency-plan.pdf?cb=1766168589 — robots-disallowed (2 tries).
- Edmonton Emergency Advisory Committee attachment: https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=209783 — failed twice.
- Alberta ESS Framework 2025: https://open.alberta.ca/dataset/9e9f4b39-36a5-4b14-a451-843a5be26d6b/resource/13280e51-dd89-4aa1-9996-486d99197feb/download/pses-aema-alberta-emergency-social-services-framework-2025.pdf — server error.
- No Vancouver or Edmonton plan found that names data centres or private telecom as emergency assets.

---

## Topic 2 — Fire and battery safety

### What the tool could compute or show
- Which code path governs a battery or UPS proposal in each city (it is the same in both).
- Spacing defaults from NFPA 855 as reference only.
- Fuel on site against the NFC per-room limit (already in register; confirmed).

### Findings

**Building and fire codes: no stationary ESS provisions**
- Register already holds (16 Oct, J.B. downloads, Claude read): BCBC 2024, VBBL 2025 Book I and NFC 2023 Alberta Edition — no ESS provisions, no NFPA 855 citation (`nfpa855tia`, `nfcAB2023`). Not re-read.
- BC Fire Code 2024 = NFC + BC amendments; BC prints no consolidated version.
  — "an adopted National Fire Code (NFC) with a few amendments"; the Province "will not produce a consolidated BCFC document"
  — Province of BC, BC Fire Code page (read 19 Oct 2026). https://www2.gov.bc.ca/gov/content/industry/construction-industry/building-codes-standards/bc-codes/fire — provincial. Conf 90.
  — Its bulletin on adoption says "the NFC and the B.C. amendments will be the BC Fire Code 2023"; no mention of ESS or lithium-ion. https://www2.gov.bc.ca/assets/gov/farming-natural-resources-and-industry/construction-industry/building-codes-and-standards/bc-codes-2023-public-review-pcf/updates_to_the_planned_adoption_of_the_fire_code.pdf — provincial. Conf 90.
- Vancouver Fire By-law 14419: nothing on stationary batteries.
  — Only battery text: "Each year batteries used as a back up power supply should be tested." (Note A-6.3.1.5.(1), radio antenna systems). No "lithium", "energy storage", "NFPA 855". Only generator text: sign for an "Emergency generator" service room (Note A-2.8.2.15).
  — https://bylaws.vancouver.ca/consolidated/14419.PDF — bylaw. Conf 90.
- NFC 2025 is published (NRC, 2025) but not adopted in BC or AB; text not readable here (see gap).

**Electrical code: the actual path, same in both provinces**
- BC: CEC 2024 in force 4 Mar 2025, no BC deviations.
  — "Effective March 4, 2025" ; based on "C22.1-24" ; "There are no deviations from the Canadian Electrical Code this cycle."
  — Technical Safety BC, Information Bulletin: Adoption of BC Electrical Code 2024. https://www.technicalsafetybc.ca/regulatory-resources/regulatory-notices/information-bulletin-adoption-of-bc-electrical-code-2024-edition — provincial regulator. Conf 90.
- CEC 2024 adds ESS rules.
  — "64-100 Energy storage and renewable energy systems: New requirements for energy storage systems (ESS)."
  — Technical Safety BC blog, 4 Feb 2025. https://blog.technicalsafetybc.ca/top-10-changes-you-need-to-know-about-the-2024-canadian-electrical-code — regulator. Conf 90 (that rules exist); content of the rules not read (CSA paywall).
- TSBC's ESS bulletin was rescinded the day CEC 2024 took effect.
  — "This information bulletin was rescinded by Technical Safety BC on March 4, 2025." (IB-EL 2023-06; residential scope)
  — https://www.technicalsafetybc.ca/regulatory-resources/regulatory-notices/energy-storage-systems — regulator. Conf 90.
- Alberta: CEC 2024 in force 1 Apr 2025.
  — "Declared in force on April 1, 2025."
  — Government of Alberta, Electrical codes and standards. https://www.alberta.ca/electrical-codes-and-standards — provincial. Conf 90.
- Alberta STANDATA 21-ECV-064-900-ESS (dwellings only, 1 m spacing) — already in register (`abESSstandata`, conf 50, unverified). Re-fetch failed today.

**Spacing and quantity (reference only)**
- NFPA 855-2026 figures already in register (`nfpa855_2026`, conf 70): applies above 20 kWh Li-ion per fire area; outdoor 3 m to lot lines, buildings, public ways; units 0.9 m apart; rooftop 3 m from fire-service access point. Not cited by any BC/AB code.
- No Canadian maximum kWh per room or per building found in any code read.

**Generator fuel (generic)**
- Confirmed again: Vancouver Fire By-law adds no indoor quantity limits (consistent with `vanFire14419`). NFC Tables 4.3.13.4.-A/-B govern in both cities (`nfc2020_4313`, `nfcAB2023_4313`). No change.
- Edmonton Fire Rescue Services Bylaw C15309 could not be read (gap) — register should not assume it adds nothing.

### Vancouver vs Edmonton
- Identical path: no ESS rule in building or fire code; CEC 2024 Section 64 + product listing + AHJ (fire chief, electrical safety authority).
- BC adopted CEC 2024 one month before AB (4 Mar vs 1 Apr 2025).
- Vancouver has a stated earthquake-fire concern (RTS 17657); Edmonton has no equivalent document read.
- Edmonton municipal fire bylaw unread; Vancouver's read in full.

### Proposed node(s) or change
1. **`battery_code_path`** (rule; tier: community, full) — replace "fire code path unconfirmed" in `battery` rules (both cities) with:
   "No building/fire-code limit; CEC 2024 Section 64 (in force BC 4 Mar 2025, AB 1 Apr 2025), product listing and the authority having jurisdiction decide. NFPA 855-2026 spacing shown as reference." Conf 90 for the path; 0 for CEC 64 content.
   Set `rule_state` to "authority decides" (not "unknown").
2. **`battery_spacing_ref`** (rule; tier: full) — footprint check: outdoor ESS needs 3 m to lot lines/buildings/public ways (NFPA 855-2026, reference); show as "may not fit" on tight urban lots. Inputs: lot dims, battery area (`battery` area formula). Conf 70 (reference standard, not law).
3. **`ups_flex` note** — UPS strings above 20 kWh Li-ion fall in NFPA 855 scope (reference); same code path as `battery`. No change to formula.
4. **`quake_battery`** (flag; tier: full; Vancouver only shown, Edmonton "not a driver") — if refuge is on and battery/UPS is indoors, show "earthquake-fire risk named by City (RTS 17657)". Text only, no number. Conf 90 for the quote.
5. **Condition `a_storage_fire`** — update note: TSBC bulletin was rescinded 4 Mar 2025 *because* CEC 2024 took over (same date; inference, conf 60).

### Could not read / still a gap
- CSA C22.1-24 Section 64 ESS rule text (paywalled) — the governing rule in both provinces. Biggest gap.
- NFC 2025 PDF: https://publications.gc.ca/collections/collection_2026/cnrc-nrc/NR24-27-2025-eng.pdf — archive interstitial, failed twice. NRC full-text view (https://nrc-publications.canada.ca/eng/view/ft/?id=e8a18373-a824-42d5-8823-bfad854c2ebd) gave only front matter.
- NFC 2020 PDF (register URL) — blocked (provenance).
- Edmonton Bylaw C15309: https://www.edmonton.ca/sites/default/files/public-files/assets/Bylaws/C15309.pdf?cb=1666501044 — robots-disallowed.
- Alberta CEC 2024 adoption notice: https://open.alberta.ca/dataset/cf396212-6365-4cf8-a591-e271697e01f3/resource/89650462-6aec-43b8-a39f-6d5b06c70885/download/ma-notice-new-canadian-electrical-code-part1-2025-04.pdf — server error.
- STANDATA ESS re-read: https://open.alberta.ca/dataset/8a7a5c94-5f9e-4c03-8220-16aef5eef79c/resource/b813ce41-3ce4-4e0c-9788-fb329d842ece/download/ma-21-ecv-064-900-ess-19-bcb-010-2023-04-28.pdf — server error.
- Seismic restraint of battery racks (NBC 4.1.8.18) — not verified.
- Fire department access to battery rooms — no Canadian code text found; NFPA 855 only.

---

## Round 2 (verification and gaps)
Skeptic pass 19 Oct 2026 (second agent). Sources re-opened; round 1 text left as written.
Status key: CONFIRMED · CORRECTED · UNVERIFIED.

### Corrections first
- **CORRECTED — seismic effective date in Vancouver.** Round 1's "10 Mar 2025" (BCBC 2024, AIBC) does **not** apply in Vancouver.
  — AIBC page itself: BCBC 2024 applies "across the province except for some federal lands and the City of Vancouver" (paraphrased by fetch tool; delay covers 4.1.8, 9.23, Appendix C; Order BA 2023 10).
  — VBBL 2025: "2019 VBBL seismic rules stay in effect until September 15, 2026." (p. 5); "Note: These changes apply to permits issued on or after September 15, 2026." (p. 9); "In-stream projects submitted before March 8, 2027, can follow the old rules." (p. 5)
  — City of Vancouver, Guide to 2025 VBBL Updates, v1.0, 22 Sep 2025. https://vancouver.ca/files/cov/guide-to-2025-vbbl-updates.pdf — municipal. Conf 90.
  — Note: p. 1 says "apply to new projects", p. 9 says "permits issued on or after"; wording differs inside the guide. Edmonton: NBC(AE) 2023 path; no equivalent Vancouver-style delay found.
- **CORRECTED (scope) — NFPA 855 "20 kWh".** The only free 20 kWh text read today is a **residential** per-unit cap, not the commercial scope threshold.
  — "Individual units shall have a maximum rating of 20 kWh." ; "Shall be separated from each other by not less than 3 feet."
  — UL LLC, "2021 Residential ESS Requirements" (IRC R328 / NFPA 855 Ch. 15), 08/2021. https://code-authorities.ul.com/wp-content/uploads/sites/46/2021/08/ESS-Separation-Max-Quantities-2021-Residential-Requirements-002_TLrev_08272021-002.pdf — certification body summary = CLAIM. Conf 50.
  — Register `nfpa855_2026` (commercial: >20 kWh per fire area; 3 m outdoor; 0.9 m units) stays **UNVERIFIED** from an official source this round. Do not merge the two meanings of "20 kWh".
- **CORRECTED (precision) — BCAB 1909.** It is about a one-storey temporary psychiatric unit at a hospital. The Board did not itself point to an "AHJ power to exempt"; it said "the local authority may want to consider the notes to 1.4.1.2.(1)" (fetch-tool paraphrase: notes allow to "exempt certain types of buildings or parts thereof"). Outcome: "the proposed building meets the definition of a post-disaster building." Publication date 23 May 2023. Conf 90.

### Task 1 — check list
- **Table 4.1.2.1 shelter wording — CONFIRMED.** "Buildings that are likely to be used as post-disaster shelters, including buildings whose primary use is:" school / "as a community centre" — High row, unchanged 2019→2023. 2023 adds: "Community centres and elementary, middle and secondary schools are High Importance Category buildings." NBC(AE) 2023 Part 4 redline (BILD Alberta host). Conf 90.
  — Supporting reading: OAA PT.35 (12/08/2023) says this phrase is **not** the defined term "post-disaster building" but a lower category needing professional judgment. https://oaa.on.ca/Assets/Common/Shared_Documents/Practice Tips/PT.35_V01.2_ImportanceCategoryAndSeismicRestraint_20231208_R00_Final.pdf — professional regulator (Ontario). Conf 80.
- **Post-disaster list / communications facilities exemption — CONFIRMED.** Both columns list "communications facilities, including radio and television stations"; exemption "unless exempted from this designation by the authority having jurisdiction." Data centres not named (also absent in OAA PT.35). Conf 90.
  — 2023 column shortens the row description to "A post-disaster building."; points to Note A-1.4.1.2.(1) (not read).
- **IE 1.0 / 1.3 / 1.5 — CONFIRMED (2019 wording).** "IE is the earthquake importance factor and has a value of 0.8, 1.0, 1.3 and 1.5" "for buildings of Low, Normal, High and Post-Disaster importance respectively" — 4.1.8.1.(2)(a), 2019 column; 2023 column garbled in redline. Page numbers not printed. Conf 80 (unchanged).
- **Sa(0.2) Vancouver 0.848 / Edmonton 0.103 — UNVERIFIED as final values.** Proposed values re-read and match: Table C-3, PCF 1405, pp. 8/35 and 9/35, marked "PROPOSED CHANGE". Conf 70 (unchanged).
  — NRCan calculator page has no pre-computed city values (form only). Final NBC 2020 / BCBC 2024 / VBBL 2025 Table C-3 not found on an official free page.
- **BC ESS 3.5 m², 0.75 m, power quote — CONFIRMED.** p. 35 "…3.5 square metres (1.5 metres x 2.5 metres) or 40 square feet"; p. 35 "0.75 metres (2.5 feet) between beds…"; p. 44 "Facilities will only be opened up if they are suitable and have power." JIBC for Province of BC, Aug 2015. Conf 90. (Source is 2015; current BC ESS guidance not checked.)
- **Vancouver hubs — CONFIRMED.** "There are 25 disaster support hubs"; 23 at community centres + Oppenheimer Park + Fraserview Branch library; "enough outdoor space for the public to gather"; "Group lodging centres for residents to stay after apartment or house fires"; "Cooling centres during heat waves"/"Warming centres during extreme cold". Conf 90.
  — Nuance: group lodging wording on the page is for **house/apartment fires**, not only earthquakes.
- **Edmonton warming criteria — CONFIRMED.** "conditions of -20 degrees Celsius with wind chill for a minimum of 3 days in a row"; "typically accompanied by an Environment Canada alert"; "Open City facilities and libraries…"; all EPL branches + 19 listed City recreation/community centres; transit "not safe or appropriate for sheltering." Conf 90.
- **CEC 2024 adoption dates — CONFIRMED.** BC: "Effective March 4, 2025", "C22.1-24", "no deviations" — TSBC IB-EL 2024-01, 11 Jun 2024. AB: "CSA C22.1-24 … Declared in force on April 1, 2025." — alberta.ca. Conf 90.
- **TSBC ESS bulletin withdrawal — CONFIRMED.** IB-EL 2023-06: "This information bulletin was rescinded by Technical Safety BC on March 4, 2025." Page has no replacement named and no requirements text. "Residential scope" in round 1 = page keyword tags only, not a scope statement. Conf 90 for date; 50 for scope.
- **Vancouver Fire By-law 14419 — CONFIRMED (with limit).** No "lithium", "energy storage", "NFPA 855", "storage battery". "Battery" once: Note A-6.3.1.5.(1)(b) "Each year batteries used as a back up power supply should be tested…". Enacted 22 Jul 2025. Conf 80 (long PDF read via fetch tool; full-text search not guaranteed).
- **NFPA 855 3 m and 20 kWh (commercial) — UNVERIFIED.** No free NFPA page with these figures was readable (NFPA blog 2021 returned metadata only). See correction above.

### Task 2 — gaps
**CEC 2024 Section 64 content (official summaries)**
- Section title and structure.
  — Section 64 "Renewable energy systems, energy production systems, and energy storage systems"; "Updates to the special terminology for energy storage system (64-002)"; "New subsection has been added for the installation of energy storage systems at residential occupancies (64-1100)."
  — Nova Scotia Dept. of Labour, Skills and Immigration, Safety Bulletin 0000035, 5 Jul 2024. https://novascotia.ca/lae/healthandsafety/docs/safety-bulletin-0000035-en.pdf — provincial regulator (not BC/AB, but same national CEC). Conf 80.
- CSA's own summary: "Section 64 requirements for energy storage systems (ESS) have been refined and clarified." ; "Section 64 contains major revisions for energy storage and renewable energy systems." https://www.csagroup.org/store/product/CSA_C22.1%3A24 — standards body. Conf 90 (that it changed); no content.
- Residential detail (Ontario regulator reading CEC 2024 Rule 64-1100). Not data-centre scope; listed so it is not misapplied.
  — residential ESS = "not exceeding 20 kWh for any single energy storage unit"; batteries ≥ 1 m from windows/doors and 1 m apart; ANSI/CAN/UL 9540 certification copy; structures built solely for ESS fall outside the rule, 3 m from a residential building.
  — ESA Ontario, Bulletin 64-8-2, May 2024. https://esasafe.com/assets/files/esasafe/pdf/Electrical_Safety_Products/Bulletins/64-8-2.pdf — regulator, other province (OESC rule numbers differ). Conf 50 for BC/AB transfer.
- **Still a gap:** non-residential Section 64 ESS rules (what governs a data-centre battery room or UPS) — no official free summary found. Conf 0.
- No BC or AB summary of Section 64 found (TSBC blog = title only; alberta.ca STANDATA page lists no ESS item).

**Edmonton Fire Rescue Services Bylaw C15309**
- Bylaws-by-number page: lists "Fire Rescue Services Bylaw" 15309; no summary, no newer bylaw. https://www.edmonton.ca:443/city_government/bylaws/bylaws-by-number — municipal. Conf 80.
- City fuel tank page cites the provincial path, **not** the bylaw: permits "for the installation, alteration or removal of flammable and combustible liquid storage tanks" (Safety Codes Act, Permit Regulation); registration for "Above-ground storage tanks with a capacity greater than or equal to 2,500 Litres" and "all underground storage tanks"; cites "National Fire Code - 2023 Alberta Edition". No generators or batteries. https://www.edmonton.ca/programs_services/fire_rescue/fuel-tank-permits — municipal. Conf 90.
- Bylaw text itself still unread. A copy on www.gov.edmonton.ab.ca appeared in search; **not fetched** — same file as the robots-blocked one (RULES: no mirrors).
- Vancouver equivalent: Fire By-law 14419 read; no tank-permit page checked for Vancouver (parity gap).

**NBC/NFC on stationary lithium-ion**
- NFC 2020 NRC page: listed significant changes contain nothing on batteries/ESS. https://nrc.canada.ca/en/certifications-evaluations-standards/codes-canada/codes-canada-publications/national-fire-code-canada-2020 — Conf 80.
- NFC 2025 NRC page (issued 22 Dec 2025): no change list; nothing on batteries/ESS. https://nrc.canada.ca/en/certifications-evaluations-standards/codes-canada/codes-canada-publications/national-fire-code-canada-2025 — Conf 80.
- Manitoba OFC 23-004 (NFC 2020 adoption, 27 Nov 2023): no battery/ESS items. https://firecomm.gov.mb.ca/docs/2020_fire_code_bulletin.pdf — provincial. Conf 80.
- NRC Jan 2020 public review PDF: only PCF 1405 and 1640; no battery/ESS change. Conf 90.
- NRC hydrogen/energy-storage CSR map lists NFC 2025 but no ESS code change requests. https://csres-cnrse.nrc-cnrc.gc.ca/en/taxonomy/term/2064 — Conf 70.
- Result: no NBC/NFC stationary Li-ion provision found in any summary read. Absence in summaries ≠ absence in code text (full texts blocked).

### Node changes from round 2
- `seismic_sa02`: keep conf 70; add note "Vancouver: VBBL 2025 seismic (new hazard values) applies to permits issued on/after 15 Sep 2026; Edmonton: NBC(AE) 2023."
- `importance_cat`: keep; cite BCAB 1909 as "local authority may consider Note A-1.4.1.2.(1)" (not a general AHJ rule). Note OAA: shelter clause = High, judgment call.
- `nfpa855_2026`: split into `nfpa855_res_unit` (20 kWh per unit, residential, UL claim, conf 50) and commercial scope (unverified, keep register figure flagged).
- `battery_code_path`: unchanged; add "Section 64 non-residential content: gap (0)".
- `fuel_on_site` (Edmonton): add tank registration ≥ 2,500 L above ground (City page, conf 90). Vancouver: not checked.

### Could not read (round 2)
- NFC 2020 PDF https://doi.org/10.4224/tx9t-j486 — provenance block.
- NFC 2025 PDF https://doi.org/10.4224/nc2d-jy72 — provenance block.
- Alberta STANDATA 2024 interpretations/variances/bulletins: https://open.alberta.ca/publications/standata-interpretation-electrical-2024-canadian-electrical-code , …/standata-variance-electrical-2024-canadian-electrical-code , …/standata-bulletin-electrical-2024-canadian-electrical-code — server error (2 tries).
- Final NBC 2020 Table C-3 / BCBC 2024 or VBBL 2025 Appendix C values — no official free page found.
- Free NFPA 855 text (NFPA free access needs login) — not attempted.
