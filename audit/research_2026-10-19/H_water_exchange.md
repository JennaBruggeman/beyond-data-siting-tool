# H — Water exchange (research 2026-10-19)

Method: WebSearch + WebFetch only. Status: **VERIFIED** = read in the source this session; **DERIVED** = my arithmetic from verified values; **UNVERIFIED** = not confirmed; **BLOCKED** = fetch refused.
Currency is CAD unless marked USD. 1 Vancouver "unit" = 2.83168 m³.

---

## 1. EPCOR (Edmonton)

| Item | Value | Unit | Quote (<15 words) | Source / section | URL | Status |
|---|---|---|---|---|---|---|
| Rates effective date | 1 Apr 2026 | — | "These rates are effective April 1, 2026." | EPCOR Water & Wastewater Rates page | https://www.epcor.com/ca/en/ab/edmonton/account/rates/current-and-historical-rates/water-and-wastewater.html | VERIFIED |
| Fixed charges now daily | from 1 Apr 2026 | — | "transition from monthly fixed rates to a daily rate" | same page | same | VERIFIED |
| Residential water consumption (for reference only) | 2.5258 / 2.7593 / 3.4873 | $/m³ (0–10 / 10.1–35 / >35 m³) | residential consumption charge table, 2026 rate | EPCOR commercial page (residential tables only rendered) | https://www.epcor.com/ca/en/ab/edmonton/account/rates/business/commercial-water-and-wastewater.html | VERIFIED (residential, not commercial) |
| Water fixed daily charge, by meter (same table applies "residential"; commercial not rendered) | 100 mm $13.3996; 150 mm $26.7981; 200 mm $42.8775; 300 mm $90.4715 | $/day, 2026 | "Fixed daily service charge" table | same | same | VERIFIED (residential table) |
| Residential wastewater treatment | 1.3020 | $/m³, 2026 | "All consumption $1.3020" | same | same | VERIFIED (residential) |
| Residential sanitary | 1.27331 | $/m³, 2026 | "Residential $1.27331 per m3" | same | same | VERIFIED (residential) |
| **2026 commercial water $/m³** | — | — | Commercial section in page outline but tables not returned | EPCOR commercial page | same | **UNVERIFIED (page tables not rendered by fetch)** |
| Commercial water (old, base year) | 1.6122 / 1.4867 / 1.1768 / 0.9472 | $/m³, Apr 2022–Mar 2023, by tier up to >5,000 m³/mo | "all commercial, industrial and institutional customers" | Bylaw 19626, Sch. 1 Pt I p.3 (tier mapping garbled in extract) | https://epcor.com/content/dam/epcor/documents/supporting-documents/epcor_water-services_bylaw%E2%80%8B-19626.pdf | VERIFIED value, tier mapping UNVERIFIED; not 2026 |
| Fixed monthly water charge (old) | 100 mm $311.61; 150 mm $623.21; 200 mm $997.14; 300 mm $2,103.97 | $/month, 2022–23 | "all metered water customers within the city of Edmonton" | Bylaw 19626 Sch. 1 Pt I p.4 | same | VERIFIED; not 2026 (later years via Sch. 3 factors, not read) |
| Commercial wastewater treatment 2025 | 1.1486 / 0.8886 / 0.4636 | $/m³ (0–10,000 / –100,000 / >100,000 m³), Apr–Dec 2025 | "0 m3 – 10,000.0 m3 $1.1486 per m3" | 2024 rate application, App. A p.18 (p.17 shows conflicting 1.2334/0.9542/0.4979) | https://www.epcor.com/content/dam/epcor/documents/supporting-documents/2024_water-rate-application-appendix-a-summary-of-bylaw-and-key-changes.pdf | VERIFIED as proposed; which table applies UNVERIFIED |
| Commercial sanitary (proposed) | 1.1212 | $/m³ | "Commercial Service … $1.1212 per m3" | App. A p.5 | same | VERIFIED as proposed; year UNVERIFIED |
| 2026 avg commercial bill (sanitary + WW treatment + storm) | 570.14 (151.86 + 138.38 + 279.90) | $/month, 2026 | "Current Year Combined Average Monthly Bill" | 2025–27 Wastewater PBR App., Table 1.8-3 p.11 | https://www.epcor.com/content/dam/epcor/documents/supporting-documents/2025-2027-wastewater-pbr-application.pdf | VERIFIED |
| Gold Bar reclaimed water exists | qualitative | — | "provided as reclaimed water to industrial customers" | 2025–27 Wastewater PBR p.2, p.21 | same | VERIFIED |
| Gold Bar reuse treatment | qualitative | — | "reuse as process feed water for industrial clients" | same, p.25 | same | VERIFIED |
| Gold Bar reuse pipeline | 5.5 km; ~$25 M funded by refinery owner | km; $ (2006) | "transports high quality effluent treated through a membrane filter" | Grant Thornton valuation for City, 2009, p.15 para 43 | https://webdocs.edmonton.ca/occtopusdocs/Public/Complete/Reports/CC/CSAM/2009-01-20/2009PW2573%20-%20Attachment%202rev.pdf | VERIFIED (1 industrial customer; no owner detail recorded) |
| Gold Bar tertiary capacity | 310 avg / 420 peak | ML/d (plant, not reuse) | "average tertiary capacity" 310 ML/d | same, p.15 para 44 | same | VERIFIED |
| **Reclaimed water price / volume** | — | — | none in PBR, bylaw, valuation | — | — | **UNVERIFIED — no public price found** |

## 2. City of Vancouver / Metro Vancouver

| Item | Value | Unit | Quote (<15 words) | Source / section | URL | Status |
|---|---|---|---|---|---|---|
| Unit definition | 1 unit = 2,831.6 L = 2.83168466 m³ = 100 ft³ | — | "One unit equals" 2,831.6 litres | CoV metered rates page | https://vancouver.ca/home-property-development/metered-rates.aspx | VERIFIED |
| Water, low season (16 Oct–30 Apr) | 4.091 /unit = **1.445 /m³** | $, 2026 (incl. 5% discount) | "October 16 - April 30 Per unit $4.091" | Council report 12 Nov 2025, Sch. D p.12; rates page | https://council.vancouver.ca/20251112/documents/spec1a.pdf | VERIFIED; /m³ DERIVED |
| Water, high season (1 May–15 Oct) | 5.128 /unit = **1.811 /m³** | $, 2026 | "May 1 - October 15 Per unit $5.128" | same | same | VERIFIED; /m³ DERIVED |
| Applies to | all metered uses (no commercial/industrial split) | — | "Rate for all metered uses." | Sch. D p.12 | same | VERIFIED |
| Tiers | 2 seasonal tiers only; no volume tiers | — | (as above) | — | — | VERIFIED |
| Sewer, metered | 7.960 /unit = **2.811 /m³** | $, 2026, year-round | "Metered Property Rate $7.960" | Council report spec1b, Part V p.14; rates page | https://council.vancouver.ca/20251112/documents/spec1b.pdf | VERIFIED (report = proposed; rates page lists as 2026) |
| Sewer, waste-discharge-permit users | 2.622 /unit | $, 2026 | "Waste Discharge Permit User Rate $2.622" | spec1b Part V p.14 | same | VERIFIED |
| Combined water + sewer | 4.256 (low) / 4.622 (high) | $/m³, 2026 | — | — | — | DERIVED |
| Meter charge | 100 mm $332; 150 mm $429; 200 mm $667; 300 mm $970 | $/billing period (4 months per Sch. E) | "Per Four Month Period" | Sch. E p.13; rates page | both above | VERIFIED |
| Metro Van reclaimed policy | UT-019 "Interim Reclaimed Water Policy", eff. 29 Sep 2023 | — | "Set pricing for the use of Metro Vancouver's Reclaimed Water" | Policy, Objectives item 3 | https://metrovancouver.org/boards/Policies/interim-reclaimed-water.pdf | VERIFIED |
| Uses listed | incl. "Industrial uses"; cooling not named | — | "may include, but are not limited to" | Potential Uses section | same | VERIFIED |
| **Metro Van reclaimed price** | none set | — | — | — | — | **UNVERIFIED — no price published** |
| Reclaimed pricing benchmark (grey lit., UBC Sustainability Scholars for MV, 2022) | US utilities price reuse at 20–100% of potable; median 80% | % | "varying their rates from 20% to 100% of potable water rate" | p.16 (2007 US survey cited) | https://www.sustain.ubc.ca/sites/default/files/2022-024_ReclaimedWaterBenefitsAndCost_Patino.pdf | VERIFIED; not peer-reviewed |
| Same report: price ceiling | ≤ potable | — | "not recommended to set the price higher than potable water" | p.30 | same | VERIFIED |
| Same report: regional reuse opex | 12–35 M/yr (excl. distribution) | $/yr | "Operational costs would range from $12 million to $35 million" | p.28 | same | VERIFIED |

## 3. Rainwater harvesting (cost, O&M, life, sizing)

| Item | Value | Unit | Quote (<15 words) | Source / section | URL | Status |
|---|---|---|---|---|---|---|
| Cistern cost | 1.50–3.00 /gal = **396–793 /m³** | USD (2013 report) | "typically between $1.50 and $3.00 per gallon of storage" | US EPA 841-R-13-002, p.24 | https://www.epa.gov/sites/production/files/2015-11/documents/rainharvesting.pdf | VERIFIED; /m³ DERIVED |
| Pumps, controls, treatment (active systems) | +2–5 /gal = **+528–1,321 /m³** | USD | "an additional $2 - $5 per gallon of harvesting system capacity" | same, p.24 | same | VERIFIED; /m³ DERIVED |
| Installed total (cistern + system) | ~924–2,114 /m³ | USD 2013 | — | sum of two rows above | — | DERIVED |
| O&M routine | 260 (inspection) + 480 (roof wash/filter) | USD/yr | WERF 2009 Table 2 | same, p.24 | same | VERIFIED |
| O&M corrective | 130 (flush) + 198 (pump replace every 5 yr) | USD/yr | WERF 2009 Table 3 | same, p.25 | same | VERIFIED |
| Example LCC | 3,200 gal cistern, 5,000 ft² roof: ~31,000 NPV | USD | "about $31,000 (net present value)" | same, p.31 | same | VERIFIED |
| Vancouver cistern cost | 10,000 for 15 m³ below-ground = **~667 /m³** | CAD 2014, Class D ±30% | "approximately $10,000 for 15 m3 (4,000 gallon)" | CoV ISMP BMP Toolkit Vol. II, p.II-18, II-41 | https://vancouver.ca/files/cov/integrated-stormwater-management-best-practice-toolkit-volume-2.pdf | VERIFIED; /m³ DERIVED |
| Vancouver sizing example | 100 m² roof → 19 m³ storage (South Van) | m³ | "a roof area of 100 m2 would require a 19 m3" | same, p.II-18 | same | VERIFIED |
| Vancouver rainfall | 1,170–1,600 | mm/yr | "average precipitation is 1170–1600 mm per year" | same, p.II-18 | same | VERIFIED |
| First flush | first 0.5 mm per event diverted | mm | (first flush diversion) | same, p.II-18 | same | VERIFIED |
| Maintenance | clean tanks ≥ every 3 yr | — | "Drain and clean tanks and fixtures at least once every three years" | same, p.II-18 | same | VERIFIED |
| Working life | tanks/pipework 15–30 yr; pumps 2–10 yr (warranties) | yr | "15 to 30 years for storage tanks and pipework" | US DOE FEMP Rainwater Harvesting Tech Review, O&M | https://www.energy.gov/cmei/femp/rainwater-harvesting-systems-technology-review | VERIFIED (warranty, not service life) |
| UV lamp life (potable) | ~1 | yr | "typically lasts about 1 year" | same, Table 2 | same | VERIFIED |
| CMHC (residential only) | system 6,000–14,000; unit water cost 4.57 (owner) / 1.47 (society) | CAD 2006; $/m³ | "capital cost to homeowners of an individual RWH system" | CMHC Research Highlight 09-110 (2009), p.6 | https://sustainabletechnologies.ca/app/uploads/2013/02/CMHC_RWH.pdf | VERIFIED (third-party host of CMHC doc); residential |
| CSA B805-18/ICC 805 scope | design, materials, installation, operation; potable + non-potable; sizing techniques; links to cooling towers | — | "techniques for sizing systems" | ICC press release, 13 Mar 2019 | https://www.iccsafe.org/building-safety-journal/press-releases/the-code-council-and-csa-group-publish-new-binational-rainwater-harvesting-systems-standard/ | VERIFIED (scope only; method not public) |

## 4. Data centre water use by cooling type

| Item | Value | Unit | Quote (<15 words) | Source / section | URL | Status |
|---|---|---|---|---|---|---|
| US average site WUE to 2023 | ~0.36 | L/kWh (IT) | "stays just over 0.36 L/kWh through 2023" | LBNL 2024 report (LBNL-2001637), p.49 | https://escholarship.org/content/qt32d6m0d1/qt32d6m0d1.pdf | VERIFIED |
| US average site WUE after 2023 | 0.45–0.48 | L/kWh | "reaching between 0.45 and 0.48 L/kWh" | same, p.49 | same | VERIFIED |
| Hyperscale median WUE | 0.32 → 0.40 (sensitivity) | L/kWh | "would increase from 0.32 to 0.40" | same, p.48 | same | VERIFIED |
| Hyperscale reported (operator claim via LBNL) | 0.1–0.3 | L/kWh | "Some hyperscale facilities report WUE values … of 0.1-0.3 L/kWh" | same, p.48 | same | VERIFIED (operator-reported) |
| Highest WUE | water-cooled chiller, no economizer (cooling tower) | qualitative | "exhibit the highest WUE, largely attributed to substantial cooling tower" | same, p.45 | same | VERIFIED |
| Next highest | dry cooler with adiabatic assist | qualitative | "exhibit the highest water consumption among the remaining scenarios" | same, p.46 | same | VERIFIED |
| WUE by cooling type (numbers) | in Fig. 4.4 chart only | L/kWh | — | p.46 | same | **UNVERIFIED (chart not text-readable)** |
| US total direct water 2023 | in Fig. 5.9 chart only | L | — | p.56 | same | **UNVERIFIED** |
| Evaporative systems upper range (peer-reviewed review) | up to 2.5 | L/kWh | "evaporative systems typically report water usage effectiveness values up to 2.5" | Cooper & Nguyen 2026, *Fluids* 11(8):201, abstract | https://www.mdpi.com/2311-5521/11/8/201 | VERIFIED |
| Closed-loop / dry | ~0 | L/kWh | "require essentially no water" | same, abstract | same | VERIFIED |
| Cooling tower water balance | Make-up = Evaporation + Blowdown (+ Drift); Blowdown = Evap ÷ (Cycles − 1) | — | "Make-Up = Evaporation + Blowdown + Drift" | FEMP BMP #10; FEMP fact sheet 2011 Eq. 1, 6 | https://www.energy.gov/cmei/femp/best-management-practice-10-cooling-tower-management ; https://www1.eere.energy.gov/femp/pdfs/waterfs_coolingtowers.pdf | VERIFIED |
| Typical cycles | 2–4 (6+ possible); 3→6 cuts make-up 20% | — | "Increasing cycles from three to six reduces cooling tower make-up water by 20%" | FEMP BMP #10, O&M | same | VERIFIED |
| Reclaimed as make-up | allowed source | qualitative | "High-quality municipal wastewater effluent or recycled water" | FEMP BMP #10, Overview | same | VERIFIED |
| GSA combined water+sewer rate | 18.41 /kgal = ~4.86 /m³ | USD 2023 | "average combined GSA water/sewer rate in 2023 was $18.41/kgal" | GSA/NREL Alt. Water Treatment for Cooling Towers, Jul 2024, p.5 | https://gsa.gov/system/files/AWT%20for%20Cooling%20Towers%20GSA%20Guidance_25Jul2024.pdf | VERIFIED; /m³ DERIVED |
| Alt. treatment project life | 15 | yr | "Based on a 15-year project life" | same, p.22 | same | VERIFIED |
| RO membrane replacement | 5 | yr | "membranes typically require replacement every 5 years" | same, p.25 | same | VERIFIED |
| **Chemical treatment cost $/m³ or $/ton-yr** | — | — | not stated in FEMP BMP #10, FEMP 2011, PNNL-33324, GSA 2024 | — | — | **UNVERIFIED — gap** |

## 5. Reclaimed / non-potable water cases (North America)

| Case | Value | Quote (<15 words) | Source | URL | Status |
|---|---|---|---|---|---|
| Quincy WA — Quincy Water Reuse Utility (city-owned) | saves 138 M gal/yr (522 ML/yr) potable; 260 M gal/yr (984 ML/yr) canal make-up; $31 M capital, operator-funded; 30-yr agreement; operational 30 Jun 2021 | "officially became operational on June 30, 2021" | US EPA Water Reuse Case Study | https://www.epa.gov/node/286187 | VERIFIED (regulator doc) |
| Loudoun County VA — Loudoun Water reclaimed system | >750 M gal (≈2.84 billion L) to ~40 customers in 2025; system since 2010 | "delivered more than 750 million gallons of reclaimed water to roughly 40 customers" | Loudoun County gov. page citing Loudoun Water | https://www.loudoun.gov/6402/Water-Considerations | VERIFIED volume; whether all ~40 customers are data centres UNVERIFIED |
| Canada — SSC federal enterprise data centre | one EDC "does not require potable water to cool"; rainwater meets 50% of sewage needs | "does not require potable water to cool the building" | Shared Services Canada, 20 Mar 2026 | https://www.canada.ca/en/shared-services/campaigns/stories/water-edc.html | VERIFIED (operator = federal gov.; no volumes) |
| Canada — municipal reclaimed water to a data centre | none found | — | — | — | **UNVERIFIED — no case found** |

---

## Blocked / not retrieved
- City of Edmonton Bylaw 19626 consolidated (robots): https://www.edmonton.ca/sites/default/files/public-files/bylaw-19626.pdf?cb=1762221713 — BLOCKED
- City of Edmonton PBR summary (robots): https://www.edmonton.ca/public-files/assets/document?path=EPCORWaterPBR.pdf — BLOCKED
- NREL/GSA alt. water treatment (robots): https://docs.nrel.gov/docs/fy20osti/73940.pdf — BLOCKED
- DOE Better Buildings cooling tower slides (robots): https://betterbuildingssolutioncenter.energy.gov/sites/default/files/slides/Improving%20Cooling%20Tower%20System%20Efficiency%20with%20Alternative%20Water%20Treatment%20Strategies.pdf — BLOCKED
- OSTI rainwater paper (robots): https://www.osti.gov/pages/servlets/purl/1627927 — BLOCKED
- Siddik et al. 2021 ERL full text (DOI not fetchable): https://doi.org/10.1088/1748-9326/abfba1 — BLOCKED
- EPCOR commercial 2026 rate tables: page fetched 4 times, only residential tables returned — NOT RENDERED

## Gaps
- **EPCOR 2026 commercial water, wastewater and sanitary $/m³** — not obtained. Use residential 2026 or 2025 proposed commercial only as placeholders, flagged.
- **Gold Bar reclaimed water price and volume** — not public in sources read.
- **Metro Vancouver reclaimed price** — UT-019 commits to set one; none published.
- **WUE by cooling type (numbers)** — LBNL Fig. 4.4 not text-readable; only qualitative ranking + 0.36 L/kWh average + review's 2.5 L/kWh evaporative ceiling.
- **Cooling tower chemical treatment cost** — no primary $/m³ or $/ton-yr found.
- **Commercial rainwater system cost** — only US EPA (USD 2013) and CoV residential-scale (CAD 2014); no Canadian commercial study; need CPI/FX adjustment.
- **Cistern service life** — only warranty ranges (15–30 yr), not measured life.
- **CSA B805 sizing method** — scope only; method behind paywall.
- **Vancouver sewer $7.960** — council report is "proposed"; CoV rates page lists it as 2026; enacted bylaw not read.
