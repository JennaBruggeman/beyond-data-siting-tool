# M — Four water/heat avenues (stormwater, snowmelt, emergency water, condensate)

Research date: 2026-10-19. WebSearch/WebFetch only. Quotes are short and exact as returned by the fetch tool. Values marked **UNVERIFIED** were not confirmed in a primary source. "My conversion" means arithmetic by me, not a source value.

---

## 1. Stormwater detention

### Vancouver: VBBL 2025, Book II, Div. B, Art. 2.4.2.5 (By-law 14343, as amended by 14488, eff. 2026-01-01)

| Item | Value | Quote | Location | URL |
|---|---|---|---|---|
| Applicability | all buildings, by pathway | "all buildings shall manage rainwater on-site" | 2.4.2.5.(1), p. 26 | https://vancouver.ca/files/cov/2025-vbbl-book-II-insert-pages.pdf |
| Pathway split | small site ≤ 1,000 m² and FSR ≤ 1.0; otherwise engineered | Table 2.4.2.5.-A | p. 26 | same |
| Small site tank | 3,400 L / 30 mm orifice (≤ 400 m²) up to 7,200 L / 50 mm (750–1,000 m²) | Table 2.4.2.5.-B | p. 27 | same |
| Engineered: volume method | Modified Rational Method, 2100 IDF, 10-yr | "the post-development, 2100 IDF curve with a 10 year return period" | 2.4.2.5.(5), p. 27 | same |
| Release, stage 1 | 5 L/s/ha | "no greater than 5 L / s / hectare for the first stage" | 2.4.2.5.(6), p. 28 | same |
| Stage 1 volume | 15 mm over non-landscaped site area | "if water 15 mm deep covered the portion of the site area without landscaping" | 2.4.2.5.(6), p. 28 | same |
| Release after stage 1 | 25 L/s/ha | "no greater than 25 L / s / hectare after the first stage" | 2.4.2.5.(6), p. 28 | same |
| Min. orifice | 25 mm | "no orifice smaller than 25 mm in diameter" | 2.4.2.5.(6) | same |
| Data-centre site (example) | 1 ha campus → 125 L/s cap after stage 1 (stage 1: 5 L/s) | my arithmetic | — | — |

**Superseded rule (do not use for 2026 permits):** the 2024 rule was "Retain/detain 24 mm" in 24 h, peak post ≤ pre-development (CP seminar 2023-12-07, ~slide 5, https://vancouver.ca/files/cov/cp-seminar-2023-12-07-new-rainwater-management-required-for-part-3-buildings.pdf). The Aug 2024 proposal also used 24 mm and allowed reduction by an "Alternate water source system" up to its "Storage volume" (Table 2.4.2.5.-C, https://vancouver.ca/files/cov/city-of-vancouver-proposed-rainwater-amendments-building-by-law-2024-08-15.pdf).

**Can a harvesting cistern count toward detention?** **UNVERIFIED for 2025 VBBL.** The 2024 proposal allowed it (Table 2.4.2.5.-C). In the 2025 insert pages, Sentences (5)–(6) contain no such reduction; only (8) existing-building and (9) CBO relaxation. Table 2.4.2.5.-C was not visible in the fetched text.

**Value to city (Vancouver, City claim):** program to Sept 2025: 192 developments, 66 ha managed, "about 7,400 L/s" peak reduction, 5 harvesting systems; stated purpose "relieve sewer system capacity constraints". https://vancouver.ca/home-property-development/rainwater-management.aspx . No $ value of avoided sewer upgrades found.

### Edmonton: EPCOR / City

| Item | Value | Quote | Location | URL |
|---|---|---|---|---|
| Threshold | lots > 0.16 ha | "Stormwater runoff control is required for all lots greater than 0.16 ha." | EPCOR Guidelines for Stormwater Management, Introduction (no date shown) | https://epcor.com/content/dam/epcor/documents/supporting-documents/onsite-stormwater-management-guidelines.pdf |
| Release rate | 0.035 m³/s/ha = 35 L/s/ha (my conversion) | "storm flows are to be restricted to 0.035CMS/ha" | Outlet Rate Control | same |
| Storage, C = 0.90 (roof/paved) | 100 m³/ha (5-yr); 375 m³/ha (100-yr); 507 m³/ha (200-yr) | Exhibit 2, "STORAGE VOLUME IN CUBIC METERS/Ha" | Exhibit 2 (4-h Chicago storm, 1 ha) | same |
| Storage methods listed | roof, parking lots, super pipes, ponds; tanks not named | — | Storage section | same |
| Bylaw basis | owner must control release when directed | "control the Release of Stormwater and Subsurface Water when directed to do so by EWSI" | Bylaw 18100, Sched. 2, Art. 6.1 | https://www.edmonton.ca/residential_neighbourhoods/Bylaws/C18100.pdf |
| Stormwater charge | A × I × R × rate; R by zone 0.20–0.95; intensity factor reducible | Sched. 1, Rate Sheet 2 | same |
| Data-centre site (example) | 1 ha, mostly roof/paved → ~375 m³ storage for 100-yr, released ≤ 35 L/s | my arithmetic from Exhibit 2 | — | — |

- Vol. 3-02 Stormwater Management and Design Manual (Apr 2025): no private-lot release rate found in fetched text; refers to "the NDR" (not defined in excerpt). https://www.epcor.com/content/dam/epcor/documents/supporting-documents/volume-3-02-stormwater-management-and-design-manual.pdf
- Harvesting credit toward storage: **not addressed** in any fetched Edmonton source.
- Value to city: only the stormwater utility intensity-factor reduction ("contribute significantly less stormwater per m²"). No avoided-cost figure found.

---

## 2. Snowmelt with server heat

| Item | Value | Quote | Location | URL |
|---|---|---|---|---|
| Edmonton design heat, average exposure | 55–60 W/ft² ≈ 590–645 W/m² (my conversion) | "55-60" | Williams, NRC Canadian Building Digest 160 (1974), Table III | https://nrc-publications.canada.ca/fra/voir/td/?id=ea4000fb-340b-4fdf-878f-27658e1f7df8 |
| Edmonton sheltered / extremely exposed | 40 / 60–65 W/ft² ≈ 430 / 645–700 W/m² | "40"; "60-65" | CBD 160, Table III | same |
| Edmonton bare wet pavement after storm | 65 W/ft² ≈ 700 W/m² | "Maintaining a Bare, Wet Pavement after Design Storm" | CBD 160, Table II | same |
| Load reduction | half covered ≈ half the loss; design on 25–50 % snow cover | "25 to 50 per cent snow cover" | CBD 160 text | same |
| Ottawa exposed site | 536 W/m² | "170 Btu/square foot-hour (536 W/m square)" | Williams 1976, TRR 576, pp. 20–32 (abstract) | https://trid.trb.org/View/46856 |
| ASHRAE classes (1995 data via Lund) | Class I Chicago 89 Btu/h·ft² ≈ 281 W/m²; Class II 165 ≈ 521; Class III 350 ≈ 1,104; Portland OR I/II/III 86/97/111 ≈ 271/306/350 W/m² | "Class I (minimum): residential walks or driveways" | Lund, Pavement Snow Melting, Geo-Heat Center (OSTI), General Design Criteria | https://www.osti.gov/etdeweb/servlets/purl/895225 |
| Low-temp precedent | Klamath Falls rebuilt deck: 50 Btu/h·ft² ≈ 158 W/m², 100°F (38°C) glycol | "designed for a heat output of 50 Btu/ft2/hr" | Lund | same |
| ASHRAE Handbook (current) values for Edmonton/Vancouver | — | — | **UNVERIFIED** (paywalled) | — |

**Precedents**
- Holland MI (City/BPW claim): "approximately 690,000 square feet of heated sidewalks and streets" (≈ 64,100 m², my conversion); "waste heat from power generation is captured to heat water"; water at 95°F (35°C), "over 4,700 gallons of water per minute"; since 1988; plus 190,000 ft² private systems on City snowmelt mains. https://cityofholland.com/879/Snowmelt-System
- Data-centre waste-heat snowmelt: **no built precedent found** in primary sources. Nearest: Lan et al. 2019, *Energy* 181: 738–744 — transmitter-room waste air (30°C) melts antenna snow, 135 W/m² (simulation). https://ideas.repec.org/a/eee/energy/v181y2019icp738-744.html
- Reykjavik/Oslo: **not confirmed** (reykjavik.is page fetched had no snowmelt data).

**Fit with server heat (reasoning, not sourced):** data-centre return water is typically ~25–45°C, similar to Holland (35°C) and Klamath Falls (38°C) supply temps. At ~600 W/m² Edmonton design, 1 MW of heat covers ≈ 1,700 m² at peak; far more at partial load. **UNVERIFIED estimate.**

**Edmonton right-of-way rules**
- Owners clear adjacent sidewalks: "Property owners should remove snow and ice as soon as possible"; fine "$100 fine plus the cost of snow removal". https://www.edmonton.ca/transportation/on_your_streets/sidewalk-snow-removal
- Encroachment agreements: application form lists "ALLEY/ ROAD RIGHT-OF-WAY encroach" and "STRUCTURES ON CITY STREETS"; fee "$300" or "$500" with circulation. Underground/heated-sidewalk not named. https://www.edmonton.ca/programs_services/documents/encroachment_agreement__application_form.pdf
- Who owns heated pipes under a City sidewalk: **UNVERIFIED** (guide blocked).

**Snow climate (ECCC 1991–2020 normals):** **BLOCKED / not obtained** — climate.weather.gc.ca normals pages returned no station data (JS-rendered), two attempts. Snowfall cm and days ≥ 0.2 cm for both cities: **UNVERIFIED**.
- Vancouver design snow load (VBBL 2019 App. C, Table C-2, Vancouver general): Ss 1.9 kPa, Sr 0.3 kPa. https://free.bcpublications.ca/civix/document/id/public/vbbl2019/1180713887

---

## 3. Emergency / fire water storage

| Item | Value / rule | Quote | Location | URL |
|---|---|---|---|---|
| BC firefighting water | required for every building | "Every building shall be provided with an adequate water supply for firefighting." | BCBC 2024 Div. B 3.2.5.7.(1), via BCAB 2005 | https://www2.gov.bc.ca/gov/content/industry/construction-industry/building-codes-standards/building-code-appeal-board/building-code-appeal-board-decisions/bcab-2005 |
| On-site storage minimum | ≥ 30 min hose streams | "at least 30 minutes of fire department hose stream use" | Note A-3.2.5.7.(1) | same |
| Reference standard | NFPA 1142 (rural/suburban supplies) | "Standard on Water Supplies for Suburban and Rural Fire Fighting" | Note A-3.2.5.7.(1) | same |
| Vancouver DFPS | 2 saltwater pump stations + seismic pipe/hydrant network | "two salt-water pumping stations connected to a resilient network" | OEM memo 2018-06-04, p. 7 | https://vancouver.ca/files/cov/2018-06-04-fire-risks-following-an-earthquake.pdf |
| DFPS coverage gap | downtown, part of Kitsilano, to VGH | "limited in geographic scope" | memo p. 9 | same |
| Sprinkler vulnerability | sprinklers rely on mains | (paraphrase) | memo p. 5 | same |
| Main hardening timeline | ~80 yrs | "the network will be complete in approximately 80 years" | memo p. 7 | same |
| Emergency drinking water | City wells only | "yield volumes are expected only to supply emergency drinking water" | memo p. 6 | same |
| Health law on sharing potable water (BC) | supplier needs construction + operating permit; small system ≤ 500 people/24 h | "serves up to 500 individuals during any 24 hour period" | Drinking Water Protection Reg., s. 1, s. 6, s. 7 | https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/200_2003 |
| Non-potable exemption | no permit duty if not for drinking, not connected, marked | "does not provide water for human consumption or food preparation purposes" | DWPR s. 3.1(b) | same |

- NFPA 13 / NFPA 22 tank sizing: **UNVERIFIED** (paywalled).
- Alberta Fire Code, Alberta potable-water rules, Edmonton emergency water planning: **not researched / gap**.
- City interest in private tanks feeding neighbourhoods: **none found** (Vancouver 2016 strategy and 2018 memo do not mention it).

**Implication:** a data-centre fire tank serving neighbours as *firefighting* water fits the DFPS gap story; as *drinking* water it would make the operator a BC "water supplier" with permits. Shareable-tank arrangements: **UNVERIFIED**.

---

## 4. Condensate from cooling coils

| Item | Value | Quote | Location | URL |
|---|---|---|---|---|
| Rule of thumb | 3–10 US gal/day per 1,000 ft² conditioned (≈ 0.12–0.41 L/day/m², my conversion) | "three to 10 gallons per day per 1,000 square feet" | US EPA WaterSense at Work (Oct 2012), §8, p. 8-8 | https://www.epa.gov/system/files/documents/2023-05/ws-commercial-watersense-at-work_Section_8_Alternative_Water.pdf |
| Quality | low TDS; can carry copper; disinfect for spray | "generally safe without additional treatment for direct use in cooling towers" | p. 8-8 | same |
| Case (hot-humid) | ~120,000 gal/month in summer, EPA Athens GA lab, 66,200 ft² | "averaged approximately 120,000 gallons per month" | NREL/FEMP case study | https://nrel.gov/docs/fy10osti/46727.pdf |
| FEMP method | based on dew point, cooling degree days, rain; formula in Lawrence et al. 2012, ASHRAE J. 54(5) | "based on the location's annual average dew point" | FEMP Alt. Water Supply Help Guide (Mar 2026) | https://www.energy.gov/sites/default/files/2026-09/alternative_water_supply_help_guide_mar2026.pdf |
| Per kW / ton-hour rate | — | — | **UNVERIFIED** (not in fetched sources) | — |
| IT inlet air envelope | recommended 18–27°C, dew point –9 to 15°C; A1 allowable max 17°C DP | "15°C DP" | ASHRAE TC 9.9 5th ed. reference card, Table 2.1 | https://www.ashrae.org/file%20library/technical%20resources/bookstore/supplemental%20files/therm-gdlns-5th-r-e-refcard.pdf |
| Vancouver summer design | July 2.5 %: 28°C dry / 20°C wet bulb | "July Dry °C" 28, "Wet °C" 20 | BCBC 2018 / VBBL 2019 App. C, Table C-2 | https://free.bcpublications.ca/civix/document/id/public/bcbc2018/bcbc_2018dbac |
| Edmonton summer design | — | — | **UNVERIFIED** (NBC Table C-2 not fetched) | — |
| ECCC summer RH / dew point normals | — | — | **BLOCKED** (see §2) | — |

**Does an air-economised data centre make condensate? (reasoning, UNVERIFIED)** Coils only condense when coil surface < room/outdoor dew point. With supply air held near the TC 9.9 recommended upper dew point (15°C) and warm chilled water, condensate is small and seasonal. Under economiser mode, outdoor air is not cooled below dew point, so little or none. Mild-humid Vancouver summers likely yield more than dry Edmonton. Need a measured source.

**Code status of condensate as non-potable source**
- Condensate is "clear-water waste": "may include cooling water and condensate drainage" from A/C equipment. NRC, NPC 2010 Intent, Div. A 1.4. https://codes-guides.nrc.ca/IA/10NPC/intents-intentions/1.4.html
- VBBL 2019 Table 2.7.1.3 "Uses for Treated Non-potable Water": rainwater → toilets, urinals, trap primers; irrigation, "make-up water for cooling towers". Clear-water waste is listed as a source but its column was unclear in extraction (**UNVERIFIED**). Storm water, greywater, perimeter drainage "Not permitted". https://free.bcpublications.ca/civix/document/id/public/vpbl2019/734749594
- VBBL 2025 Table 2.7.1.3: **not obtained** (insert pages show only TOC). 2025 guide: "The voluntary use of non-potable water remains allowed." (p. 7) https://vancouver.ca/files/cov/guide-to-2025-vbbl-updates.pdf
- Vancouver operating permits required for "cooling towers, decorative water features, non-potable water systems". https://vancouver.ca/files/cov/cp-seminar-2025-10-29-vbbl-book-II-plumbing-system.pdf

---

## Blocked / failed

- https://www.edmonton.ca/public-files/assets/document?path=PDF/Encroachment_Agreements_guide.pdf — robots disallowed
- https://www.edmonton.ca/public-files/assets/document?path=bylaws/c14600.pdf (Community Standards Bylaw) — robots disallowed
- https://www.energy.gov/femp/articles/air-handler-condensate-recovery-environmental-protection-agencys-science-and — client error
- climate.weather.gc.ca 1991–2020 and 1981–2010 normals result pages — no station data returned (2 tries)
- Toxicdocs copy of 1960 ASHRAE Guide: found, not used (archive site)

## Gaps

1. ECCC normals: snowfall, snow days, summer RH/dew point (both cities).
2. Current ASHRAE Handbook snowmelt table (paywalled); Edmonton NBC design wet bulb.
3. Whether 2025 VBBL lets harvesting tanks count toward detention (Table 2.4.2.5.-C).
4. VBBL 2025 Table 2.7.1.3 row for condensate / clear-water waste.
5. Edmonton: ownership of heated pipes in ROW; Alberta potable/fire-water rules; Edmonton LID guide not read.
6. Condensate litres per kW of cooling vs humidity; measured data-centre condensate.
7. No primary source for any data-centre waste-heat snowmelt; Reykjavik/Oslo unconfirmed.
8. No $ value of avoided sewer upgrades in either city.
