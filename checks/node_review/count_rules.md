# Count rules: primary sources (Beyond Data)

Researched 29 Oct 2026. All quotes were pulled from the live documents with a text-extraction tool (direct PDF download was blocked by the network proxy). Before citing in the thesis, open each PDF and check the page number. "?" = not printed in the source.

---

## 1. CRAH capacity at warm return air

### 1a. Vertiv Liebert CW181 (North America, 60 Hz, CSA c-us). Best available

**Document:** Vertiv, *Liebert® CW System Design Catalog: 38 to 181 kW (10 to 52 ton) Capacity, Upflow and Downflow, 60 Hz*. ©2024. SL number and revision are not printed in the extracted text (product page file name: SL-18061).
URL: https://www.vertiv.com/4a6b21/globalassets/products/thermal-management/room-cooling/liebert-cw-038-181kw--chilled-water-cooling/liebert-cw-38-to-181-kw-system-design-catalog-sl-18061.pdf
(Same content: https://www.vertiv.com/globalassets/products/thermal-management/room-cooling/liebert-cw-system-design-manual_00.pdf)

**Table 2.3, p. 11:** "Performance Data for Select Units with EC Fans, High Delta T Conditions"
- Header: "Net Capacity Data with 50°F Entering and 64°F Leaving Fresh Water"
- Air row: "90°F DB, 66.1°F WB, 52°F DP, 27% RH (32.2°C DB, 18.9°C WB)"

| CW181 condition | Total kW | Sensible kW | Page |
|---|---|---|---|
| 90°F/32.2 °C DB, 50°F/10 °C EWT, 64°F/17.8 °C LWT | 246 | 246 | 11 |
| 85°F/29.4 °C DB, same water | 210 | 210 | 11 |
| 80°F/26.7 °C DB, same water | 172 | 172 | 11 |
| 90°F/32.2 °C DB, 50°F EWT, 66°F/18.9 °C LWT | 240 | 240 | 12 |
| 85°F DB, 45°F/7.2 °C EWT, 10°F rise (Table 2.1) | 286 | 251 | 7 |
| 75°F/23.9 °C DB, 45°F EWT, 10°F rise (Table 2.1; current basis) | 211 | 179 | 7 |

- Notes, p. 12: "The net capacity data has fan motor heat factored in for all ratings." "Capacity data is factory certified to be within 5% tolerance." "Data rated with standard filter."
- Caveats:
  - The tables say "DB". They do not say "return air". For a downflow CRAH, the rated entering-air condition is the return air, but that is an inference, not printed text.
  - Highest condition printed: 90°F (32.2 °C). No row at 95°F (35 °C) or higher: **?**
  - Table 2.3 labels the neighbouring model "148", while other tables say "146" (as printed).
- Airflow, Table 2.7, p. 16: "Nominal Air Volume, CFM (CMH) … 24,000 (40,800)". 3 EC fans, each "4.9 (3.7)" hp (kW) maximum, downflow. "CW146 to CW181 are available in Downflow only."
- **Dimensions** (not in the catalogue). From the Vertiv product page, CW181: Height "94 in [2,388 mm]", Width "122 in [3,099 mm]", Depth "42 in [1,067 mm]", Weight "2,520 lbs [1,143 kg]". The same page lists "Net sensible capacity 605 kBtuh [177 kW]" (the catalogue says 179 kW; the rating condition is not given on the page).
  URL: https://www.vertiv.com/en-ca/products-catalog/thermal-management/room-cooling/cw181-181kw/
- **Certification:** Vertiv, *Liebert CW Guide Specifications*, SL-18061GS, Rev. 9, Oct 2021, §1.2, p. 1: "Standard 60 Hz units shall be CSA-certified to the harmonized U.S. and Canadian product safety standard" "CSA C22.2 No 236/UL 1995 for Heating and Cooling Equipment" "and are marked with the CSA c-us logo."
  URL: https://www.vertiv.com/4a6b27/globalassets/products/thermal-management/room-cooling/liebert-cw-038-181kw--chilled-water-cooling/liebert-cw-38-to-181-kw-guide-specification-sl-18061gs.pdf

### 1b. Vertiv Liebert CWA thermal wall (EMEA only; return air ≥30 °C)
- **Document:** Vertiv, *Liebert CWA* brochure, EMEA, "MKA4L0UKCWA - Rev. 3-02/2023". Page numbers not extracted (?).
  URL: https://www.vertiv.com/49277c/globalassets/products/thermal-management/room-cooling/liebert-cwa-en-brochure-emea-web.pdf
- Rating condition: "Smart Coil RAT 36°C 30% RH; Water I/O 20°C - 32°C; ESP 20Pa"
- Net sensible capacity and size (L x W x H, mm):

| Model | Net sensible capacity | L x W x H (mm) |
|---|---|---|
| CA40 | 250 kW | 1480 x 2230 x 3670 |
| CA60 | 350 kW | 1480 x 3050 x 3670 |
| CA80 | 500 kW | 1480 x 3960 x 3670 |

- Frequency: ?
- UL/CSA: ?
- The US, Latin America and Canada product pages returned "not available for your country/region". **Not shown to be sold in North America.**

### 1c. Schneider Uniflair FWCV fan wall (no North America evidence)
- **Document:** Schneider Electric PEP ecopassport, SCHN-01024-V01.01-EN, issued 07/2023 (environmental declaration, not a catalogue), p. 3.
- Quote: "Cooling capacity 475,1 kW" for FWCV40L2A at "RAT 37°C/25°C; water 20/30".
- Dimensions: ?
- 60 Hz: ?
- UL/CSA: ?
- I requested the Schneider room-cooling catalogue, but this PEP came back instead.
  URL: https://download.se.com/files?p_enDocType=Catalog&p_File_Name=e-catalog%20Room%20Cooling_2026%20finale.pdf&p_Doc_Ref=Uniflair_Room_Cooling_ecatalog

### 1d. Not found or not readable
- **STULZ CyberAir 3PRO CW** (stulz.com): page says "22 to 260 kW". No rating condition is printed (?). 60 Hz and UL not stated. The brochure has no direct link.
- **Trane CRAH** (Canada page): "Cooling Capacity: 50kW to 300kW". No rating conditions, no dimensions.
- **Vertiv Liebert CWA** North American pages: region-restricted.
- **Data Aire, Munters, Johnson Controls/Silent-Aire, Nortek/Huntair:** no primary capacity table found. Search hits were Scribd or distributors, which are excluded.

---

## 2. Which loads the UPS carries

- **Uptime Institute**, *Accredited Tier Designer Technical Paper Series: Continuous Cooling* (abstract only; full text not public).
  URL: https://atd.uptimeinstitute.com/resources/asset/accredited-tier-designer-technical-paper-series-continuous-cooling
  - "Tier IV is the only Tier that requires Continuous Cooling."
  - Recommends Continuous Cooling "at densities beyond 4 kilowatts (kW)/rack, regardless of Tier."
  - The equipment-level text (which fans and pumps go on UPS) was not readable.
- **Uptime Institute Journal**, "Explaining the Uptime Institute's Tier Classification System (April 2021 Update)". https://journal.uptimeinstitute.com/?p=3737
  - Tier I includes "an uninterruptible power supply (UPS) to filter power spikes, sags, and momentary outages", "dedicated cooling equipment…" and "an engine generator to protect IT functions from extended power outages."
  - It does not say cooling is on UPS.
- **LBNL**, Xu, T. & Greenberg, S., *Data Center Energy Benchmarking: Part 1 – Case Studies on Two Co-location Data Centers (No. 16 and 17)*, Final Report, Aug 2007. https://eta-publications.lbl.gov/sites/default/files/62716-p1.pdf
  - p. 2: "these UPS units maintained critical power supply for computer loads in the event of electric power outage or disturbance"
  - p. 2: "essential power for HVAC and lighting loads, and 2) critical power for computer and equipment loads"
  - p. 9: mechanical essential loads include "CRACs, cooling towers, and condenser water pumps"
  - This is one case-study site (cooling on generator-backed "essential" power, not UPS). It is not a general rule.
- **Not readable:** Schneider WP 179, *Data Center Temperature Rise During a Cooling System Outage*. No se.com PDF link was reachable, and the copies found were trade press, which is excluded.
- **Conclusion:** no primary source read here gives a general rule.
  - Evidence supports: IT load on UPS; cooling on generator ("essential") by default.
  - Exception: Continuous Cooling, required for Tier IV and recommended above 4 kW/rack, which puts some cooling on uninterruptible power.
  - Which components carry it (fans, pumps): ?

---

## 3. Redundancy definitions (N+1, 2N)

- **Uptime Tier Standard: Topology:** only the abstract is public ("increasing levels of redundant capacity components and distribution paths"). The definitions of N, N+1 and 2N could not be read. https://uptimeinstitute.com/resources/asset/tier-standard-topology
- **Uptime Journal**, April 2021 (URL above):
  - Tier II "include[s] redundant critical power and cooling components…"
  - "The redundant components include power and cooling equipment such as UPS modules, chillers or pumps"
  - Tier III: "A redundant delivery path for power and cooling is added to the redundant critical components of Tier II facilities"
  - N+1 and 2N are not defined in this article.
- **TIA** (ANSI/TIA-942 page, tiaonline.org, no date shown). https://tiaonline.org/?p=16534
  - Rated-2: "A data center which has redundant capacity components and a single, non-redundant distribution path serving the computer equipment."
  - Rated-3: "…redundant capacity components and multiple independent distribution paths serving the computer equipment. Typically, only one distribution path serves the computer equipment at any time."
  - Rated-4: "…which all are active. The data center allows concurrent maintainability and one (1) fault anywhere in the installation without causing downtime."
- **Maker definition** (Fuji Electric Corp. of America, UPS maker; no date, no author): "What are N+1, 2N, and 2(N+1) redundancy?" https://americas.fujielectric.com/what-are-n1-2n-and-2n1-redundancy/
  - N+1: "The system has N units to handle the full load, plus 1 additional (spare) unit for redundancy."
  - 2N: "The system has two completely independent sets of N components, each capable of handling the full load."
- **Not readable:** Schneider WP 75, *Comparing UPS System Design Configurations*, Rev. 4, 11 Mar 2016. The landing page has no PDF link, and the constructed download URL was refused.

---

## 4. CDU sizing on liquid-captured heat

- No primary source found that states, in so many words, that CDU capacity = IT × liquid share.
- **Schneider Electric WP 133 v2**, Lin, Bunger, Avelar, *Navigating Liquid Cooling Architectures for Data Centers with AI Workloads* (©2024). https://download.schneider-electric.com/doc/SPD_WP133_EN/WP133_V2_EN.pdf
  - p. 8: "60% to 90% of a liquid-cooled server's heat can be removed via the liquid"
  - p. 8: "The remaining heat is removed by air cooling"
  - p. 4: "The pump size, heat exchanger size, and fluid type define a CDU system's overall capacity (kW)."
  - p. 5: floor-mounted L-L CDUs from 300 kW to over 1 MW.
- **OCP**, *Liquid to Liquid CDU Test Methodology and Performance Rating*, Rev 1.0, Aug 2024 (Intel, CoolIT, Meta). https://www.opencompute.org/documents/ocp-wp-l-lcdu-test-methodology-performance-rating-r1-pdf/
  - p. 16: "Thermal performance is specified based on approach temperature difference (ATD)", "ATD = (TCS supply temp – FWS supply temp)"
  - p. 19: rating "X kW where CDU performance meets the following conditions" (ATD 5 °C at X kW; flow X × 1.5 LPM)
  - p. 19: "1.5LPM/kW to support most of chips in the current market"
- **Vertiv CoolChip CDU** datasheet, SL-71348 (R01/26). https://www.vertiv.com/4932ce/globalassets/shared/vertiv-coolchip-cdu-100_datasheet_en.pdf
  - "Nominal cooling capacity 121 kW @ 4°C Approach Temperature Difference (ATD)"
  - "175 x 445 x 850 (6.89 x 17.52 x 33.46)" mm (in), H x W x D; 4U in-rack
- **Inference (unsourced, mark as such):**
  - CDU kW = IT kW × liquid share (0.6 to 0.9 per WP 133).
  - Air side (CRAH) = remainder.

---

## 5. Uptime 2024 average rack density

- **Document:** Uptime Institute, *Uptime Institute Global Data Center Survey 2024*, UII Keynote Report 146M, July 2024. https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2024.GlobalDataCenterSurvey.Report.pdf
- p. 1: "Average server rack densities are increasing but remain below 8 kW."
- p. 10:
  - "The 2024 survey shows 4 kW to 6 kW racks remain the most commonly deployed, consistent with previous years (see Figure 4)."
  - "Uptime Intelligence calculates the average of typical racks densities across respondents to this survey to be 8 kW."
  - "However, this is skewed upwards by 11 sites that report their most rack density to be above 50 kW."
  - "If these sites are taken out as outliers, the average is 7.1 kW."
- Use 8 kW (or 7.1 kW without the outliers). This is a survey of respondents' typical racks, not a design value.
