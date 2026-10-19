# F — Tightening low-confidence nodes (research pass 19 Oct 2026)

Scope: rooftop_solar, offerable_area, existing_building, interconnection, jobs, receiver_demand, vibration_rank, embodied_building, plus the heat-value split.
Each section starts from the register entry as it stood on 19 Oct 2026. Only new material is listed.
Quotes come through a fetch tool that returns short fragments; where it paraphrased, that is said.

---

## 1. rooftop_solar (was 0)

Register now: "Solar from roofs nearby", formula roof area × kWh/kWp × kWp/m²; status "gap: NRCan values pending".
Note: the NRCan municipal kWh/kWp values are already in the register under pv_roof (nrcanPVmunic, conf 80). So the "pending" gap is closed for yield. What was missing is a sourced roof-area-to-kWp factor for a neighbourhood's roofs.

**What the tool could compute or show**
- Annual PV from roofs within a radius: ground-floor (footprint) area × 0.81 × 0.225 kWp/m² × yield at latitude tilt × 0.70.
- Gives about 128 kWh/m² of footprint in Vancouver and 159 in Edmonton (derived below).

**Findings**
- NRCan rooftop method — "Prooftops = Aground floor ∗ UF2 ∗ ηPV" (Eq. 3) and "Erooftops = Prooftops ∗ Hoptimal ∗ PR ∗ Yr" (Eq. 4); Table 2 "UF2 = 0.81; Yr = 0.70" — Gaucher-Loksts & Pelland, *Assessing the photovoltaic potential of the Canadian building stock*, NRCan CanmetENERGY, 25 Jul 2024, p. 10 — https://natural-resources.canada.ca/sites/nrcan/files/canmetenergy/files/pdf/PV_potential_summary_report_appendix-EN.pdf — government lab — 80.
- UF2 definition — "Utilization factor to derive PV-suitable area from ground floor area" — same, p. 10.
- Yr definition — "Solar yield, or weighted-average fraction of Hoptimal received by the rooftop surfaces" — same, p. 10.
- The coefficients are "averages of the calculated coefficients … over all the municipalities in this analysis" (11 municipalities; neither Vancouver nor Edmonton) — same, p. 10. So transferred: 70.
- Module efficiency "22.5 %", performance ratio "0.75" — same, p. 9, Table 1. PR 0.75 is the same PR as nrcanPVmunic, so the municipal kWh/kWp already contains it.
- Check values, technical potential per m² of ground floor (Table A-3, p. 30): North Vancouver 182 W/m², 122 kWh/m²; Calgary (central ~20 km² only) 171 W/m², 139 kWh/m².
- Province totals (Table 4, p. 14): BC 41 GW / 30 TWh; Alberta 35 GW / 32 TWh (technical).
- Edmonton is procuring a rooftop solar map: "a web based rooftop solar potential map that informs and educates Edmonton residents" — City of Edmonton RFI AB-2024-10240, closing 16 Jan 2025 — https://canadabuys.canada.ca/en/tender-opportunities/tender-notice/ab-2024-10240 — government procurement notice — no data in it.
- No City of Vancouver rooftop solar dataset found on its open data portal.

**Derived (60 → used at 70 because every input is government)**
- kWp per m² footprint = 0.81 × 0.225 = 0.182.
- Vancouver: 0.182 × 1,007 kWh/kWp × 0.70 = **128 kWh/m² footprint/yr**.
- Edmonton: 0.182 × 1,244 × 0.70 = **159 kWh/m² footprint/yr**.
- Sanity: North Vancouver 122 and Calgary 139 in the NRCan report sit close.

**Vancouver vs Edmonton**
- Same method and source for both. Edmonton yields about 24% more per m² at latitude tilt.
- Neither city publishes a rooftop solar dataset. Edmonton is buying one (status after Jan 2025 unknown).
- Footprints: the project already holds massing for both (data/lidar2022, data/edmonton_rooflines_est.geojson). Not re-checked here.

**Proposed node change**
- id rooftop_solar; formula: Σ footprint_i × 0.81 × 0.225 × yield_lat × 0.70 over roofs within the chosen radius; inputs: massing, nrcanPVmunic, new source nrcanPV2024; tier: community and full.
- Keep the register's note that a 0.1–40 MW load would use the roofs' output on site; show MWh beside the data centre's MWh, not netted.

**Could not read / still a gap**
- Vancouver and Edmonton were not in the NRCan municipal sample; UF2 and Yr are transferred.
- Shading by taller neighbours is inside Yr only as an average.

proposed confidence: 70 (was 0)

---

## 2. offerable_area (was 20)

Register now: "staffed spaces + meet-me rooms + space held for growth, judged"; source GP1 Bins sheet.

**What the tool could compute or show**
- Floor area a data centre could offer to others, split into a rule-set part (Vancouver ground floor) and a plan-based part (support block, meet-me room). Growth space stays a separate, judged line.

**Findings (new to this node; the plan data were already in the project)**
- Vancouver I-3 draft: "Bulk data storage is not permitted at the ground floor, except for entrances." (s. 2.2.11) — sources/17_zoning_vancouver.md line 147 — bylaw draft (not in force) — 90 if confirmed in force; I-2 schedule s. 2.2.7 carries the same ground-floor bar (sources/17 line 15, "SOURCED (schedule)").
- Built support block: office 100–603 m²; loading/garbage 45 m²; storage 18.6–40 m² — sources/16 §2.12 (Burlington plans; DUB13 inspector's report) — municipal plans and planning-authority reports — 70.
- Network / meet-me room: "ELECTRICAL/ NETWORK ROOM (128 m2)" and "(115 m2)" — sources/16 §2.11 (Burlington plans) — one plan only — 60.
- sources/16 already reads these as "a small, near-fixed block (≈200–600 m²), not a share of MW" — a reading of four cases, not a rule.
- No government or peer-reviewed source found that sizes space held for growth.

**Vancouver vs Edmonton**
- Vancouver I-2 (and I-3 draft): the ground floor cannot be data storage, so it is offerable by rule (less entrances).
- Edmonton: no equivalent ground-floor rule found in Zoning Bylaw 20001 (sources/18). Edmonton offerable area = support block only.

**Proposed node change**
- Split into three lines:
  - offerable_ground (Vancouver I-2 / I-3 only): ground-floor area − entrances; rule; conf 90 (I-2), 60 for I-3 until the draft is confirmed in force.
  - offerable_support: 200–600 m² block + 115–128 m² meet-me room; plans; conf 60.
  - offerable_growth: judged; conf 20; shown separately, not summed into the headline.
- Headline (ground + support) then carries 60; growth stays visibly judged.
- Tier: community and full.

**Could not read / still a gap**
- TIA-942-C entrance-room sizing (paywalled).
- I-3 in-force text not re-checked today.

proposed confidence: 60 for ground + support (was 20); growth stays 20

---

## 3. existing_building (was 20)

Register now: parcels whose use and age suit conversion; precedents (515 W Hastings; Edmonton office and warehouse conversions); no vacancy statistics.

**What the tool could compute or show**
- A structural screen: which floors of an existing building could take data halls without strengthening.
- Rule: code live load the floor was likely designed for vs the load a data hall needs.

**Findings**
- Office floor design load — "Office areas (not including record storage and computer rooms) located in … Floors above the first storey 2.4"; "Basement and the first storey 4.8"; "Equipment areas and service rooms" 3.6; "Storage areas 4.8"; "Factories 6.0"; units "Minimum Specified Load, kPa" — Vancouver Building By-law 2019 (consolidated to 1 Jan 2021), Div. B, Table 4.1.5.3 — https://free.bcpublications.ca/civix/document/id/public/vbbl2019/283565687 — bylaw read directly — 90.
- Note the code itself excludes "computer rooms" from the office row.
- Computer room design load — "File and Computer Rooms 125" psf (≈6.0 kPa); "Administrative Services, Office Areas 80" psf; "Machine Room 150" psf — US Department of Veterans Affairs, PG 18-10 *Structural Design Manual*, 1 Oct 2022 (rev. 1 Jul 2023), Table 1, p. 2 — https://www.wbdg.org/FFC/VA/VADEMAN/dmstruct.pdf — US government design standard, transferred — 70.
- Already in sources/16 row 22: UFC 3-301-01 150 psf (7.2 kPa); TIA-942 12 kPa "should" (not read directly). Not repeated as new.

**Derived rule (60)**
- Office floors above the first storey (2.4 kPa) are well below a computer-room load (≈6.0–7.2 kPa). They would need strengthening or light, low-density racks.
- Basement and first-storey office floors (4.8 kPa) and storage/factory floors (4.8–6.0 kPa) come closest.
- Matches the precedents: Edmonton warehouse → data centre; 515 W Hastings is a carrier hotel (low-density telecom use).

**Vancouver vs Edmonton**
- Vancouver: VBBL 2019 read. VBBL 2025 table not re-read (values assumed unchanged — unverified).
- Edmonton: NBC 2023 Alberta Edition Table 4.1.5.3 not read. Assumed the same NBC values — unverified.
- No official office vacancy statistics in either city (unchanged).
- The project already holds parcel inputs for both (data/BCA_Non-Residential_Inventory_Extract_User_Guide.pdf; data/edmonton_properties_2026.csv). Use and storey count can drive the screen.

**Proposed node change**
- id existing_building; formula: Σ floor area of parcels by use, where floor load class ≥ 4.8 kPa (warehouse, factory, storage, or office basement/first storey) counts as "convertible as built" and office above first storey counts as "needs strengthening"; inputs: parcel, massing, table 4.1.5.3; tier: full.
- Still needs the parcel join (N1–N7).

**Could not read / still a gap**
- NBC 2020 / NBC(AE) 2023 / VBBL 2025 Table 4.1.5.3 not opened (blocked earlier).
- No peer-reviewed study of office-to-data-centre conversion found (results were trade press only, not used).

proposed confidence: 40 (was 20); 60 once the parcel join runs

---

## 4. interconnection (was 20)

Register now: rationale sourced (Pan Fang & Greenstein; Malecki; Satyanarayanan; JLARC); "Locations of internet exchange points in Vancouver and Edmonton not yet sourced".

**What the tool could compute or show**
- Distance from a parcel to the nearest internet exchange facility, and the one-way fibre delay that distance adds.

**Findings**
- Both cities have an exchange — list: Vancouver "VANIX", Edmonton "YEGIX"; peering means "data travelling between Canadian entities never needs to leave the country" — CIRA, *IXPs*, 16 May 2023 (mod. 31 Aug 2026) — https://www.cira.ca/en/net-good/network-resilience/ixps/ — not-for-profit registry operator — CLAIM, 50.
- VANIX: "a not-for-profit, neutral and independent Internet Exchange" — https://vanix.ca/?p=946 — operator — CLAIM, 50.
- VANIX facility list (page modified 23 Dec 2025): six connection points, all in central Vancouver — Cologix VAN2 (1050 W Pender), Cologix VAN3 (2828 Natal St), Cologix VAN4 (175 W Cordova), eStruxture VAN-2 and the Harbour Centre meet-me room (both 555 W Hastings), Spencer Building carrier hotel (515 W Hastings) — https://vanix.ca/facility-connections/ — operator — CLAIM, 50.
- Note: 1050 W Pender, 555 W Hastings and 515 W Hastings are already in the project as host/precedent sites.
- YEGIX: "YEGIX Internet Exchange Community Ltd. is an Alberta Not-for-Profit"; one named facility, Wolfpaw, "Located along the LRT line in downtown in Scotia Place"; five initial peers listed; undated — https://yegix.ca/status.html — operator — CLAIM, 50.
- CIRA 2015: "approximately 70 per cent of .CA domain websites are physically hosted outside of Canada"; IXPs "reduce transit costs" — https://www.cira.ca/en/resources/news/cybersecurity/building-a-stronger-national-internet-part-1-local-peering/ — CLAIM, dated, context only.

**Derived (physics with a stated assumption, 60)**
- Light in glass travels at about c ÷ 1.47–1.5, so about 5 µs per km one way. 10 km of route adds about 0.05 ms. Distance inside a city is small next to the "tens of ms" edge targets already in the register.
- The refractive index range is an assumption; ITU-T G.114 summary page read, value not shown there.

**Vancouver vs Edmonton**
- Vancouver: six published connection points (operator list, current to Dec 2025).
- Edmonton: one named site on an undated status page. The current YEGIX site list could not be read (see below). Edmonton is thinner here; say so in the tool.

**Proposed node change**
- id interconnection; formula: km = straight-line distance from parcel to nearest listed exchange facility; ms_one_way ≈ 0.005 × route km (route km ≈ 1.2–1.5 × straight line, judged); inputs: parcel, exchange list (claims); tier: full.
- Show it as "close to the exchange / not", since every in-city distance is far below the latency thresholds. The real effect is cost and resilience, which no source quantifies.
- Security: these are colocation buildings that operators publish, not utility or fuel sites. J.B. to decide whether the tool shows addresses or only distance.

**Could not read / still a gap**
- https://yegix.ca/ — blocked by provenance (fetch tool would not open a root URL not seen in search).
- CRTC: no IXP data or report found.
- ITU-T G.114 full text not read.
- PeeringDB and datacentermap list both exchanges but are directories (not used).

proposed confidence: 50 (was 20)

---

## 5. jobs (was 40)

Register now: floor area ÷ 5,000 ft² per operating job (JLARC 2024), transferred from Virginia hyperscale.

**What the tool could compute or show**
- Operating jobs as a range from floor area, with the low and high ends from different sources; jobs per MW as a cross-check.

**Findings**
- Planning-authority figures already in the project, not yet in this node (applicant figures reported by the authority = CLAIM, 50):
  - DUB13 (ABP-317446-23): 45 operational jobs; GFA 12,893 m² → **≈287 m²/job** — sources/16 C12.
  - EdgeConneX DUB06 (ABP-317802-23): "circa 40 people, over a 24hr period"; GFA 15,274 m² → ≈382 m² per person (persons, not FTE) — sources/16 C9.
  - Ark UP4, Hillingdon: 50–100 jobs; 15,410 m² GIA; 28 MW IT → **≈154–308 m²/job**; **1.8–3.6 jobs/MW** — sources/16 C10.
- JLARC "one employee per 5,000 square feet" = **≈465 m²/job** (in register).
- Canadian context — NAICS 518 employer establishments, 2025: BC 259 (micro 114, small 127, medium 16, large 2); Alberta 136 (53, 78, 3, 2) — ISED Canadian Industry Statistics, "Statistics Canada, special tabulation, unpublished data … 2025" — https://ised-isde.canada.ca/app/ixb/cis/businesses-entreprises/518 — government statistic — 80. Shows the industry is mostly small firms; NAICS 518 is broader than data centres, so context only.
- Employment effect studies found are not peer-reviewed:
  - Yue & Zeng, SSRN, 30 Mar 2026: "data center activation increases local employment by 3.5%" — county-level % only — working paper.
  - Bahar & Wright, Brookings brief (4 May 2026, upd. 10 Aug 2026): "roughly 100-200 jobs, depending on facility type" per treated county; BLS county data — think-tank brief of an unpublished paper.
  - Neither used as a coefficient. Listed so they are not re-searched.

**Vancouver vs Edmonton**
- No facility-level job figure found for either city. Same transferred range applies to both.
- ISED counts: BC has about twice Alberta's NAICS 518 employers; both have 2 large (500+) employers.

**Proposed node change**
- id jobs; formula: floor_area ÷ (154–465 m² per operating job); show the range, not a point; inputs: floor_area; sources: jlarc2024 + DUB13 + Ark UP4 (+ DUB06 as check); tier: resident (as a range) and full.
- Optional check: 1.8–3.6 jobs per MW IT (one case).

**Could not read / still a gap**
- No peer-reviewed per-facility or per-MW employment coefficient found.
- No Canadian facility job count found.

proposed confidence: 50 (was 40)

---

## 6. receiver_demand (was 40)

Register now: disclosed data (Energize Vancouver) else floor area × intensity; CEUD provincial commercial intensities BC 1.114 / AB 2.007 GJ/m²; "per-activity intensity not published".

**What the tool could compute or show**
- Heat demand of a named receiver type from its floor area, using a type-specific national median, scaled to the province.

**Findings**
- Canadian median site EUI by property type (GJ/m²) — Office 0.87; Hospital 2.20; K-12 School 0.70; College/University 1.04; Multifamily 0.82; Hotel 0.87; Senior Living 1.21; Supermarket 1.07; Warehouse 0.72; Ice/Curling Rink 1.10; Retail 0.85 — NRCan, *Canadian National Median Values, Canadian Energy Use Intensity by Property Type* (Technical Reference), Aug 2023 — https://portfoliomanager.energystar.gov:443/pdf/reference/Canadian%20National%20Median%20Table.pdf — government statistic (SCIEU 2019; SECMURBs 2018) — 80.
- Definition — the median is "the middle of the national population—half of buildings use more energy, half use less" — same.
- Hospitals and campuses, 2024 (released 26 Jun 2026): hospitals national 2.06 GJ/m², Alberta highest at 2.46; universities national 1.12, Alberta 1.59; colleges 0.75 (BC) to 1.50 (Alberta); 2019 university BC 1.02 — Statistics Canada, *The Daily*, SCIEU hospital and postsecondary campuses 2024 — https://www150.statcan.gc.ca/n1/daily-quotidien/260626/dq260626d-eng.htm — government statistic — 80.
- SCIEU 2019 national average EUI "1.31" GJ/m² — *The Daily*, 5 Aug 2022 — https://www150.statcan.gc.ca/n1/daily-quotidien/220805/dq220805c-eng.htm — 80.

**Derived (60)**
- Per-type intensity × (provincial CEUD ÷ national) is one way to regionalise. The 2024 campus data show Alberta well above the national figure for every type; BC hospital and university 2024 values are not on The Daily page.
- These are total energy, not heat. A space-heat (and hot-water) share is still needed per province.

**Vancouver vs Edmonton**
- Same national medians for both; regional scaling from CEUD (already held) and the 2024 SCIEU table.
- Vancouver also has measured host data (vanEnergyReport); Edmonton benchmarking is voluntary (unchanged).

**Proposed node change**
- id receiver_demand; formula: disclosed data, else floor_area × EUI_type (NRCan median) × (CEUD_prov ÷ CEUD_national) × heat_share_prov; inputs: receivers; tier: community and full.
- J.B. retrieval: CEUD commercial end-use tables (space heating, water heating) for BC and Alberta, the same way as com_bct_e_3 / com_ab_e_3; and SCIEU 2024 Table 2 (BC values).

**Could not read / still a gap**
- SCIEU 2024 Table 2 (region × campus type) not opened; BC 2024 hospital/university not stated on The Daily page.
- Commercial space-heat share by province not in the project's CEUD extract (Table 3 has no end use).
- NRCan CEUD pages were blocked earlier; not retried.

proposed confidence: 60 once the heat share is retrieved (was 40); 50 with the type medians alone

---

## 7. vibration_rank (was 40)

Register now: qualitative rank, slab on grade → long-span upper floor; NBC/VBBL airborne STC only; ASHRAE ch. 49 not read.

**What the tool could compute or show**
- A target vibration level at the neighbour's floor, by neighbour type, beside the existing rank. Still no prediction of what the plant would cause.

**Findings**
- Ground-borne vibration criteria, frequent events (>70 per day): Category 1 (vibration-sensitive interiors) 65 VdB; Category 2 "Residential … any buildings where people sleep" 72 VdB; Category 3 "Institutional … schools, churches, other institutions, and quiet offices" 75 VdB; reference "1x10-6inches per second" — FRA / NJ TRANSIT, Hudson Tunnel Project Final EIS, Ch. 12B Vibration, May 2021, Tables 12B-2 and 12B-3, pp. 12B-3 to 12B-6, quoting FTA Report No. 0123 (Sep 2018) — https://railroads.dot.gov/sites/fra.dot.gov/files/2021-05/12B%20Vibration_2021-05-27.pdf — US federal environmental document reproducing federal guidance — 80, transferred from transit to building plant.
- Special buildings: concert halls, TV and recording studios 65 VdB; auditoriums and theatres 72 VdB (frequent) — same, Table 12B-3.
- Damage thresholds (PPV): reinforced concrete/steel/timber 0.50 in/s; non-engineered timber and masonry 0.20; extremely susceptible 0.12 — same, Table 12B-5. Plant does not approach these; listed for completeness.
- ISO 20816-1:2016 is the wrong tool for neighbours: "the evaluation criteria relate only to the vibration produced by the machine itself" — https://www.iso.org/standard/63180.html — standard abstract — 90 for scope.
- ISO 2631-2:2026 (Ed. 3, June 2026) covers "human exposure to whole-body vibration and shock in buildings" but "Acceptable magnitudes of vibration are not stated in this document"; Annex C has exposure–response curves — https://www.iso.org/standard/87847.html — standard abstract — 90 for scope; no limit to use.
- Vancouver Noise Control By-law 6555 (consolidated 14 Jul 2026): no occurrence of "vibrat" — https://bylaws.vancouver.ca/6555c.PDF — bylaw — 90.
- Edmonton Community Standards Bylaw 14600 (consolidated 22 Oct 2024): no occurrence of "vibrat" — https://edmonton.ca/sites/default/files/public-files/C14600.pdf — bylaw — 90.

**Vancouver vs Edmonton**
- Neither city regulates vibration from equipment. Same for both: no local limit, so the tool can only show a borrowed target.

**Proposed node change**
- Keep vibration_rank as is (rank, conf 40).
- Add vibration_target: target VdB at the neighbour by use (65 sensitive / 72 residential / 75 institutional), with the assumption that continuous plant counts as "frequent events"; source FTA 2018 via FRA 2021; conf 70 (US federal, transferred, assumption stated); tier: full.
- No predicted VdB — sources/23 already says "Do not put dB numbers in the tool" for prediction; this adds a target only.

**Could not read / still a gap**
- FTA manual itself: fetched twice, text truncated before Section 5–6 (https://www.transit.dot.gov/sites/fta.dot.gov/files/docs/research-innovation/118131/transit-noise-and-vibration-impact-assessment-manual-fta-report-no-0123_0.pdf). Values taken from the FRA reproduction.
- ASHRAE Applications ch. 49 (paywalled; UBC Library).

proposed confidence: 40 for the rank (was 40); new vibration_target at 70

---

## 8. embodied_building (was 40)

Register now: floor area × 461 kg CO2e/m² (Carbon Leadership Forum general median); Alissa et al. 2025: building is 0.6–5% of life-cycle GHG.

**What the tool could compute or show**
- Building embodied carbon against a Canadian, city-set benchmark instead of a US median; plus the Vancouver compliance test.

**Findings**
- Vancouver absolute benchmark — "ECI = 400 kgCO2e/m2" (p. 10); 2023 limit "not be more than double a functionally-equivalent baseline" (f = 2.0, p. 12); requirements "apply to all new Part 3 buildings" (p. 3); "cradle-to-grave … modules A1-A5, B1-B5, and C1-C4" (p. 14); Module D excluded (p. 14); mandatory scope substructure, superstructure, exterior enclosures (pp. 15–16); services (HVAC, electrical) optional; GFA "shall exclude any floor area of a parkade" (p. 5) — City of Vancouver, *Embodied Carbon Guidelines* v1.0, Oct 2023 — https://vancouver.ca/files/cov/embodied-carbon-guidelines.pdf — city guideline under VBBL s. 10.4 — 90 as a rule.
- Status: VBBL 2025 in effect 15 Sep 2025; "The proposed 10% embodied carbon reduction requirements are delayed." — City of Vancouver, Zero emissions buildings page — https://vancouver.ca/green-vancouver/zero-emissions-buildings.aspx — 90. The Sep 2024 slides' 380/360 kg figures are proposals, not in force.
- No industrial exclusion stated in the guidelines (p. 3) — a Part 3 data centre in Vancouver is in scope (reading; confirm with the City).
- Data-centre direction of difference — "carbon emissions are higher by 414% in the case of foundation systems (A - Substructure) … when compared to residential projects" (p. 5) but superstructure "higher by 956% for the case of residential projects" (p. 5); four US data centres; scope "structural concrete, steel, and site utilities piping" (p. 8) — Núñez-Morales, Jung & Golparvar-Fard, CIB World Building Congress 2025, CIB Conferences vol. 1 art. 17 — https://docs.lib.purdue.edu/cgi/viewcontent.cgi?article=2129&context=cib-conferences — conference proceedings (peer review not stated) — 50. No m² given, so no per-m² value.
- Vertiv white paper (26 Nov 2025): steel modular "cuts … embodied carbon by more than half" vs concrete shell, 1.5 MW, EN 15978 — manufacturer CLAIM, no figures on the page; not used.

**Vancouver vs Edmonton**
- Vancouver: wbLCA reporting and a cap (≤ 2 × baseline) for all new Part 3 buildings.
- Edmonton: no embodied-carbon requirement for private buildings found. The City page says only "Embodied carbon analysis is completed for new construction" under City Buildings — https://www.edmonton.ca/city_government/environmental_stewardship/green-buildings-communities — 90 as absence for private buildings (reading).
- Parity: use the same 400 kg/m² benchmark as the coefficient in both cities; show the compliance test in Vancouver only, and say Edmonton has none.

**Proposed node change**
- embodied_building: floor_area × 400 kg CO2e/m² (Vancouver benchmark, structure + envelope, A1–C4); replace CLF 461 as the main coefficient, keep 461 as a check; conf stays 40 (no data-centre per-m² value; direction uncertain).
- New condition embodied_rule (Vancouver): wbLCA required; ECI ≤ 2 × functionally-equivalent baseline; conf 90; tier: full.
- Note in the tool: services and IT are optional in the City scope, so the City figure excludes what Alissa et al. show dominates.

**Could not read / still a gap**
- VBBL 2025 s. 10.4 text (fetch returned contents page only).
- Springer: Int J LCA 2024 review (10.1007/s11367-024-02419-2) and EPJ C 2025 scientific computing centres LCA — both fetch errors; not retried (two-strike rule).
- NRC/National wbLCA guidelines are method, not benchmarks; no Canadian benchmark by building type found.

proposed confidence: 40 (was 40) for the coefficient; new embodied_rule at 90

---

## 9. Heat value split — operator, utility, end users (was: no study)

**What the tool could compute or show**
- Not a split figure. A bounded statement: who can capture what under each city's rules, beside the price floor and ceiling already in the register.

**Findings**
- No peer-reviewed study found that measures the split in a built case. Still a gap.
- The split is negotiated — Wheatcroft, Wynn, Volodina, Dent & Lygnerud 2021, *Energies* 14(12):3614 (peer-reviewed): profit share α = Profhs ÷ (Profhs + Profec) (Eq. 1, p. 8); "a fixed α is agreed in contract negotiations" (p. 9); the split "is then a matter for negotiation" (p. 2); data centre case in Brunswick, Germany — https://www.research.ed.ac.uk/files/216617554/energies_14_03614_v2.pdf — 70 as a framework; no α from practice.
- Practice in that paper (p. 8): a German owner said "the price of waste heat is based on a calculation of factors"; two Swedish owners "were given a price list from the DH Company" — interview reports, 50.
- The utility holds the stronger hand — "DH utilities might leverage their informational advantage"; pricing "substantially influences the extent and distribution of WHR benefits"; infrequent pricing schemes raise summer recovery, "which benefits data-centre operators" (paraphrase) — Jerez Monsalves, Bergaentzlé & Keles 2024, *Applied Energy* 375:124032 (abstract via DTU Orbit) — https://orbit.dtu.dk/en/publications/waste-heat-recovery-utilisation-for-district-heating-systems-unde/ — peer-reviewed — 70 for direction; split figures not read.
- Policy schemes — subsidy-tax combinations cut the policy cost of 5% DH decarbonisation "to only 4%" of pre-policy heating costs "without increasing net consumer costs" — Jerez Monsalves et al. 2025, *Applied Energy* 399:126517 (abstract) — https://ideas.repec.org/a/eee/appene/v399y2025ics0306261925012474.html — peer-reviewed — 70.
- Denmark, how law divides it:
  - Price set "ved fri forhandling" (by free negotiation); the utility must not pay more than necessary; removing the cap "vil i nogle fjernvarmenet kunne føre til højere varmepriser" (could raise heat prices in some networks); data centres named as a source — L 189 (2024-25) bill and remarks, pp. 3–5, 4 Apr 2025 — https://ft.dk/samling/20241/lovforslag/L189/bilag/1/3000726.pdf — statute bill — 90.
  - Enacted as Lov nr 738 af 20/06/2025 — https://www.retsinformation.dk/eli/lta/2025/738 (title only read).
  - Cap abolished from 1 July 2025; "Kravet om at varmeprisen for forbrugerne ikke må være højere end de nødvendige omkostninger, gælder dog stadigvæk" (consumer price still limited to necessary costs); surplus-heat suppliers are outside heat price regulation for those deliveries, but heat from their own heat pumps is regulated — Energistyrelsen, *Overskudsvarme og cost-benefit-analyser*, mod. 16 Jan 2026 — https://ens.dk/forsyning-og-forbrug/overskudsvarme-og-cost-benefit-analyser — regulator — 90.
  - The state's share: surplus-heat tax "højst kan udgøre 33 pct. af det samlede vederlag for varmeleverancen" (at most 33% of the payment; old rule, applied to pre-2022 agreements in 2022–23); 2023 rate "26,2 kr. pr. GJ" — Skattestyrelsen styresignal SKM2024.319.SKTST, 13 Jun 2024 — https://www.retsinformation.dk/api/pdf/245091 — tax authority — 90. Current (2026) rate not read.
- From the register (not new): in five of seven built cases the data centre gives the heat free and the utility owns the heat pump (capex_split); Stockholm and Mäntsälä pay.

**CORRECTION for the register (price_ceiling)**
- price_ceiling cites "Denmark 2025 surplus-heat price cap 95 DKK/GJ … as a regulated comparator". That cap was abolished from 1 July 2025 (ens.dk above; L 189 / Lov 738). It should be labelled historical (to 30 Jun 2025).

**Vancouver vs Edmonton**
- Vancouver: regulated receivers (BCUC for TELUS Garden; NEU by-law rates). The end-user share is bounded by the regulator, as in Denmark (register: bcucC113, vanNEUlevy2025).
- Edmonton: Downtown District Energy rates set at "business as usual" (register: price_ceiling, IIS02765). End users pay about what they would pay anyway, so savings sit with the utility (City) or the supplier.
- Neither city has a surplus-heat tax or a rule on how the margin is shared.

**Proposed node change**
- New qualitative node value_split: per city, list who sets the price (negotiation), what bounds the end-user price (regulator / BAU rate), and who owns the heat pump (from capex_split). Show the margin = ceiling − floor as one band, and say plainly that how it divides is negotiated and unmeasured.
- inputs: price_floor, price_ceiling, capex_split; tier: full.

**Could not read / still a gap**
- Jerez Monsalves 2024 full text (DTU PDF) — fetch error twice; split figures not read.
- Liu thesis (diva2:843864) and Energy Policy 2013 "Drop it like it's hot" — robots-blocked.
- https://www.mdpi.com/1996-1073/14/12/3614 — provenance-blocked (read via Edinburgh repository instead).
- No published heat-supply agreement with price terms found beyond those already in the register (Exergi, Fortum).
- Dutch (ACM) sources returned only utility return-monitoring reports; not read. Netherlands still a gap.

proposed confidence: 50 for a rule-bounded qualitative split (was 0); a numeric split stays 0

---

## Summary table

| id | was | proposed | main new source |
|---|---|---|---|
| rooftop_solar | 0 | 70 | NRCan CanmetENERGY 2024 (UF2 0.81, Yr 0.70) + existing NRCan municipal yields |
| offerable_area | 20 | 60 (growth 20) | Vancouver I-2/I-3 ground-floor bar; plan support block |
| existing_building | 20 | 40 | VBBL Table 4.1.5.3; VA PG 18-10 |
| interconnection | 20 | 50 | VANIX / YEGIX operator lists (claims); CIRA |
| jobs | 40 | 50 | DUB13, Ark UP4 planning figures; ISED NAICS 518 |
| receiver_demand | 40 | 50 → 60 | NRCan ENERGY STAR medians; SCIEU 2024 |
| vibration_rank | 40 | 40 (+ target 70) | FTA 2018 via FRA 2021; ISO scopes; both bylaws silent |
| embodied_building | 40 | 40 (+ rule 90) | Vancouver Embodied Carbon Guidelines v1.0 |
| heat value split | 0 | 50 qualitative | Wheatcroft 2021; Jerez Monsalves 2024/25; Danish L 189 / ens.dk / SKM2024.319 |

---

## Round 2 (verification and gaps)

Pass date 19 Oct 2026, second agent. Sources re-opened through the fetch tool unless marked "project file".
Tags: CONFIRMED · CORRECTED · UNVERIFIED.

### Task 1 — skeptic check

**Corrections first**

1. I-3 status — **CORRECTED.**
   - Round 1 called I-3 s. 2.2.11 a draft, not in force. The in-force I-3 schedule (June 2026) is already in the project.
   - "Bulk Data Storage, only in sub-area A — Conditional 2.2.1, 2.2.11"; s. 2.2.11 "Bulk data storage is not permitted at the ground floor, except for entrances." — project file data/raw/van/i3.txt lines 303, 453 (footer "June 2026"); sources/17 "Update 14 Oct" — bylaw — 90.
   - Round 1 also missed FC-2: s. 2.2.4 "Dwelling uses, office uses and bulk data storage are not permitted at grade, except for entrances." — data/raw/van/fc2.txt line 390 — bylaw — 90.
   - Effect: offerable_ground is a rule (90) in I-2, I-3 sub-area A and FC-2. Drop the "60 until in force" line.
2. NBC 2020 Table 4.1.5.3 — **CORRECTED** ("not opened (blocked)" in §3 is wrong).
   - Already read from the official PDF on 14 Oct (sources/24, page images data/raw/codes/nbcp-0444/0445.png; re-viewed today).
   - NBC 2020 (2025 printing), p. 4-10: "Office areas (not including record storage and computer rooms) located in / Basements, and floors, including mezzanines, with direct access to the exterior at ground level 4.8 / Other floors 2.4"; p. 4-9: "Equipment areas and service rooms" 3.6(4); p. 4-10: Storage 4.8(4), Factories 6.0(4), Warehouses 4.8(4) — national model code — 90.
   - BCBC 2024 (Rev. 1) has the same office row wording and values — project file data/raw/codes/bcbc2024.txt line 29045 — 90.
   - Wording differs from VBBL 2019: "first storey" (VBBL 2019) vs "floors … with direct access to the exterior at ground level" (NBC 2020, BCBC 2024). The screen should use the newer wording.
3. Danish surplus-heat tax "up to 33%" — **CORRECTED** (quote and scope).
   - Exact words: "I det omfang varmen afsættes, udgør nedsættelsen dog højst 33,0 pct. af det samlede vederlag for varmeleverancen." Round 1's "højst kan udgøre 33 pct." is not the text.
   - The tax is a cut in the energy-tax refund: "Nedsættelsen af godtgørelsen betegnes overskudsvarmeafgift."
   - The 33% cap is the old rule, for agreements made before 1 Jan 2022, in 2022–23 only. Those agreements paid 50.0 kr./GJ (2015 level; 41.7 kr./GJ from own CHP).
   - 26.2 kr./GJ is the new-regime 2023 rate, not the rate the 33% cap sits with.
   - Source: Skattestyrelsen, SKM2024.319.SKTST, 13 Jun 2024 — https://www.retsinformation.dk/api/pdf/245091 — tax authority — 90.
   - Do not show "up to 33%" as a current Danish rule. Whether the new regime has any % cap, and the 2026 rate: UNVERIFIED.

**Confirmed**

4. NRCan roof factors — **CONFIRMED.**
   - Table 2 (p. 10) "UF2 0.81", "Yr 0.70"; Table 1 (p. 9) "PV module efficiency 22.5 %", "Performance ratio 0.75"; coefficients are "averages of the calculated coefficients over all the municipalities in this analysis"; 11 municipalities (Table A-1, p. 24), incl. North Vancouver and Calgary, not Vancouver or Edmonton — Gaucher-Loksts & Pelland, NRCan CanmetENERGY, 25 Jul 2024.
   - Arithmetic re-done: 0.81 × 0.225 = 0.182; × 1,007 × 0.70 = 128.5; × 1,244 × 0.70 = 158.7. Yields 1,007 / 1,244 kWh/kWp match the register (nrcanPVmunic, latitude tilt). 128 / 159 stand — 100 for arithmetic.
   - Caution: North Vancouver's 182 W/m² in Table A-3 equals 0.81 × 225 W/m², so it is not an independent check of UF2. Calgary 171 W/m² (UF2 ≈ 0.76) shows municipal spread.
5. Vancouver I-2 — **CONFIRMED.** "Bulk Data Storage Conditional 2.2.1, 2.2.7"; 2.2.7 "Bulk data storage is not permitted at the ground floor, except for entrances." — I-2 District Schedule, footer June 2026 — https://bylaws.vancouver.ca/zoning/zoning-by-law-district-schedule-I-2.pdf — bylaw — 90.
6. VBBL 2019 office 2.4 kPa and computer-room exclusion — **CONFIRMED.** "Office areas (not including record storage and computer rooms) located in" — "Basement and the first storey 4.8"; "Floors above the first storey 2.4"; equipment 3.6(4); storage 4.8(4); factories 6.0(4); "Minimum Specified Load, kPa" — VBBL 2019 consolidated to 1 Jan 2021, Div. B Part 4 — 90.
7. US VA 6.0 kPa — **CONFIRMED.** "File and Computer Rooms 125" psf; "Administrative Services, Office Areas 80"; "Machine Room 150" — PG 18-10, 1 Oct 2022, rev. 1 Jul 2023, Table 1, p. 2. 125 psf × 0.0479 = 5.99 kPa.
8. VANIX six points — **CONFIRMED.** VAN2 (Suite 212, 1050 W Pender), VAN3 (2828 Natal St), VAN4 (175 W Cordova), eStruxture VAN-2 (Room 21N, 555 W Hastings), Harbour Centre MMR 6B (555 W Hastings), Spencer Building MMR5 (515 W Hastings); page modified 2025-12-23 — operator CLAIM, 50.
9. YEGIX — **CONFIRMED.** "YEGIX Internet Exchange Community Ltd. is an Alberta Not-for-Profit"; Wolfpaw "Located along the LRT line in downtown in Scotia Place"; five peers (AXIA Connect, Cybera, Edmonton Public Library, Hurricane Electric, University of Alberta); undated — CLAIM, 50. CIRA table lists both; quote confirmed; published 16 May 2023, modified 31 Aug 2026.
10. Jobs 154–465 m² per job — **CONFIRMED as arithmetic** (sources not re-opened: Hillingdon and An Bord Pleanála PDFs provenance-blocked today).
    - 5,000 ft² = 464.5 m²; 15,410 ÷ 100 = 154; ÷ 50 = 308; 12,893 ÷ 45 = 287; 50–100 ÷ 28 MW = 1.8–3.6 per MW.
    - Flag: sources/16 C10 notes the Ark report's para 7.3 gives 18,898 m², not 15,410. With 18,898 the range is 189–378 m²/job. The low end (154) depends on which GIA is right — UNVERIFIED.
11. ENERGY STAR Canadian medians — **CONFIRMED.** All eleven values match (Office 0.87 … Retail 0.85 GJ/m²); Aug 2023; SCIEU 2019 for most types, SECMURBs 2018 for multifamily, SECA 2014 for indoor arena.
12. SCIEU 2024 values — **CONFIRMED.** 2.06 / 2.46 hospital; 1.12 / 1.59 university; college 0.75 (BC) to 1.50 (AB); 2019 BC university 1.02. Note the 2024 national row is "All provinces" (territories excluded).
13. FTA vibration 72 / 75 / 65 VdB — **CONFIRMED.** Table 12B-2, frequent events ("more than 70 vibration events of the same source per day"); reference "1x10-6inches per second"; FTA Report No. 0123, Sep 2018. Occasional / infrequent: Cat 2 75 / 80, Cat 3 78 / 83, Cat 1 65 throughout.
14. Vancouver embodied carbon — **CONFIRMED, with a clarification.**
    - "For compliance with the Vancouver Building By-law, the following value may be used: ECI = 400 kgCO2e/m2" (p. 10). It sets the absolute-path benchmark ECBM = ECI × GFA (p. 9); the limit is ECL = ECBM × f, f = 2.0 in 2023 (pp. 11–12). Mandatory scope: Substructure and Shell (p. 15).
    - So 400 is a compliance benchmark, not a measured typical value. The absolute-path cap is 800 kg/m². Label it so in the tool.
    - City page: VBBL 2025 effective 15 Sep 2025; the "double a functionally equivalent benchmark" limit stays; "The proposed 10% embodied carbon reduction requirements are delayed." — 90.
15. Danish 95 DKK/GJ cap abolished 1 July 2025 — **CONFIRMED** (official sources).
    - Cap value: "kan herefter fastsættes til 95 kr./GJ" for 2025 — Forsyningstilsynet, *Udmeldelse af prisloft for overskudsvarme 2025*, 1 Nov 2024 — https://forsyningstilsynet.dk/Media/638660516540345737/Udmeldelse%20af%20prisloft%20for%20overskudsvarme%202025.pdf — regulator — 90. VAT basis not stated.
    - Repeal: Lov nr 738 af 20/06/2025, "Ophævelse af prisloft på overskudsvarme …"; § 1 no. 4 repeals "§ 20, stk. 19, og § 21, stk. 1, 2. pkt., og stk. 4, 2. pkt."; § 2(1) "Loven træder i kraft den 1. juli 2025." — https://www.retsinformation.dk/eli/lta/2025/738/pdf — statute — 90.
    - ens.dk (mod. 16 Jan 2026): "Pr. 1. juli 2025" cap abolished; necessary-cost rule still applies — 90. ens.dk does not state the 95 figure.

### Task 2 — gaps

**A. Heat-only intensity by activity type (CEUD 2023)**

Source: NRCan, Comprehensive Energy Use Database, Commercial/Institutional sector, 2023 — "British Columbia and Territories" (com_bct_e.xls) and "Alberta" (com_ab_e.xls) — register ceud2023com — government dataset — 80.
Method: (Space Heating PJ + Water Heating PJ) ÷ Floor Space (million m²), 2023 column, Tables 2, 5–23 (odd: "by End Use"). PJ ÷ Mm² = GJ/m². Unzipped to scratch; project files untouched.

| Activity type (CEUD) | BC+T SH | BC+T WH | **BC+T heat** | BC heat share | AB SH | AB WH | **AB heat** | AB heat share |
|---|---|---|---|---|---|---|---|---|
| All commercial/institutional | 0.51 | 0.07 | **0.57** | 51% | 1.28 | 0.12 | **1.40** | 70% |
| Offices | 0.43 | 0.02 | **0.45** | 48% | 1.09 | 0.05 | **1.13** | 71% |
| Educational services | 0.44 | 0.05 | **0.50** | 53% | 1.21 | 0.10 | **1.31** | 72% |
| Health care and social assistance | 0.84 | 0.26 | **1.10** | 50% | 1.76 | 0.59 | **2.35** | 62% |
| Accommodation and food services | 0.76 | 0.11 | **0.88** | 56% | 1.99 | 0.22 | **2.20** | 71% |
| Retail trade | 0.47 | 0.06 | **0.53** | 52% | 1.36 | 0.12 | **1.48** | 70% |
| Wholesale trade | 0.41 | 0.05 | **0.46** | 54% | 1.15 | 0.11 | **1.26** | 69% |
| Transportation and warehousing | 0.51 | 0.03 | **0.54** | 63% | 1.31 | 0.05 | **1.37** | 83% |
| Information and cultural industries | 0.38 | 0.05 | **0.43** | 50% | 1.54 | 0.13 | **1.66** | 68% |
| Arts, entertainment and recreation | 0.59 | 0.06 | **0.65** | 55% | 1.36 | 0.10 | **1.46** | 70% |
| Other services | 0.49 | 0.05 | **0.54** | 53% | 1.15 | 0.08 | **1.23** | 67% |

GJ/m² of floor space, 2023. Share = heat ÷ total energy of that type.
Check: totals reproduce the register's 1.114 (BC) and 2.007 (AB) GJ/m².

Caveats (each one goes in the tool note):
- These are secondary (delivered) energy, not useful heat. Space heating is 88% natural gas in BC and 92% in AB (Table 24). Useful heat = fuel × boiler efficiency; no efficiency is sourced here (gap).
- Types are NAICS sectors, not building types. "Health care and social assistance" ≠ hospital; "Educational services" mixes K-12 and campuses.
- BC file includes the territories.
- 2023 heating degree-day index: BC 0.78, AB 0.84 (as printed; base not stated in the sheet). One warm year; not weather-normalised.
- CEUD is modelled by NRCan, not metered per building.
- Cross-check: CEUD health care total EUI (BC 2.19, AB 3.82) vs SCIEU 2024 hospital campuses (BC 1.90, AB 2.46). AB sector figure is far above the hospital survey. Use SCIEU for hospitals; use CEUD for the heat share only.

**Can receiver_demand reach 60? Yes.**
- Formula: heat_GJ = floor_area × EUI_type × heat_share_type,prov
  - EUI_type: SCIEU 2024 provincial value for hospitals / universities / colleges; else the CEUD provincial sector EUI (or ENERGY STAR national median, flagged national).
  - heat_share_type,prov: the CEUD share column above.
- Simpler option: floor_area × CEUD heat intensity (bold columns).
- Both inputs are government data (80). Applying a provincial sector average to one building is a transfer with a stated assumption → 60.
- Round 1's (CEUD_prov ÷ CEUD_national) scaling is no longer needed; national CEUD is not held anyway.
- Parity: same table, same method, both provinces. Edmonton heat intensity is about 2.5× Vancouver's for most types.

**B. NBC(AE) 2023 live loads — not read (gap stays).**
- Alberta page lists "National Building Code – 2023 Alberta Edition 2nd printing" under "Codes in force" (published 17 Aug 2026); 1st printing "declared in force May 1, 2024" — https://www.alberta.ca/building-codes-and-standards — government — 90.
- NRC says Codes Canada publications are "available directly through the NRC Publications Archive in free electronic format" — NRC NBC(AE) 2023 page — 90.
- Could not read: the Alberta link (nrc-publications …id=0316d953…) served NECB 2025 text, not NBC(AE); doi.org/10.4224/hz98-7h49 provenance-blocked; nrc-publications search robots-blocked. Two strikes; stopped.
- Interim: NBC 2020 national values (item 2 above) — 4.8 / 2.4 kPa, computer rooms excluded. Use for Edmonton at 80 (national model code; Alberta variation to Part 4 not checked). J.B. retrieval: NBC(AE) 2023 PDF, Div. B Table 4.1.5.3.
- No Canadian code gives a computer-room live load. Every code read excludes computer rooms from the office row and points to 4.1.5.1.(1) (design for actual loads).

**C. SCIEU 2024 BC hospital and university — found.**
- Table 2, 2024 (GJ/m²): BC university 1.25, college/CEGEP 0.75, hospital 1.90; Alberta 1.59 / 1.50 / 2.46; all provinces 1.12 / 0.86 / 2.06 — Statistics Canada, *The Daily* 26 Jun 2026, Table 2 — https://www150.statcan.gc.ca/n1/daily-quotidien/260626/t002d-eng.htm — government statistic — 80.
- Table 4, 2019 (revised): BC university 1.02, college incl. technical 1.07, hospital 2.15; "Prairies and territories" 1.74 / 1.92 / 2.81 (no Alberta-only 2019 row) — https://www150.statcan.gc.ca/n1/daily-quotidien/260626/t004d-eng.htm — 80.
- StatCan warns 2019 vs 2024 comparisons need caution (method change; technical institutes and territories excluded in 2024).
- Note BC university rose from 1.02 (2019) to 1.25 (2024) while the national figure fell.

### Could not read (round 2)
- https://doi.org/10.4224/hz98-7h49 (NBC(AE) 2023) — provenance-blocked.
- https://nrc-publications.canada.ca/eng/search/… — robots-blocked.
- https://modgov.hillingdon.gov.uk/documents/s64459/739%20REPORT.pdf and https://www.pleanala.ie/anbordpleanala/media/abp/cases/reports/317/r317446.pdf — provenance-blocked (job figures rest on project notes).
- open.alberta.ca notice "new Alberta codes editions" PDF — server error.

### Revised confidences
| id | round 1 | round 2 |
|---|---|---|
| offerable_area (ground) | 90 I-2 / 60 I-3 | 90 I-2, I-3 sub-area A, FC-2 |
| existing_building | 40 | 40; code rows 90 Vancouver, 80 Edmonton (NBC 2020 stands in until NBC(AE) is read) |
| receiver_demand | 50 → 60 | 60 (CEUD heat share in hand) |
| jobs | 50 | 50; low end 154 or 189 pending Ark GIA |
| heat value split | 50 qualitative | 50; drop "up to 33%" as a current rule |
