# Equipment selection study: inside the hall and heat recovery (types A–G)

Beyond Data (J.B., UBC M.Arch). Researched 29 Oct 2026.

**Method.** All documents were read as extracted text with a web-fetch tool. Direct download was blocked by the sandbox proxy, so drawings could not be viewed as images. "?" means the value is not printed in any document that could be read. All maker figures are **maker claims**. Metres are straight unit conversions (mm ÷ 1000; in × 0.0254). Every metric (kW/m² and so on) is **our calculation** from printed values. Pages are given where the extracted text showed them.

**Criteria:** C1 fits the tool's assumption; C2 sold as a data-centre (A–C) or DH/industrial (D–G) product in that size; C3 North America/Canada; C4 maker's own public document prints dimensions **and** rating with conditions; C5 document ≥ ~2022 and product not discontinued.

---

## A. 42U/48U server cabinet, 600 mm wide

| Candidate | Doc (no./date) | Printed W × D × H | C1 | C2 | C3 | C4 | C5 |
|---|---|---|---|---|---|---|---|
| APC NetShelter SX **AR3300** (current basis) | se.com/us product page, undated | 600W × 1200D × 1991H mm, 42U | P | P | P (US page; certs not printed) | P | **F**: page prints "Discontinued on Dec 31, 2025"; end of service Feb 14, 2029 |
| APC NetShelter SX Gen 2 **AR3300B2** (successor) | se.com/us product page, undated | 1991H × 600W × 1200D mm, 42U | P | P | P (US page; "TAA, BAA via COTS"; UL not printed) | P | P (current page; no date) |
| APC AR3307B2 (48U) | se.com/us product page (title only) | 2258H × 600W × 1200D mm | P | P | P | P | P |
| Vertiv **VR3300** | Vertiv VR Rack brochure **SL-20819 (R06/25)**, p.3 (page inferred) | H 2000 (78.6") × W 600 (23.6") × D 1200 (47.8"), 42U; "nominal" | P | P | P: UL2416; NA brochure ("en-na") | P | P |
| Vertiv VR3307 (48U) | same, p.3 | 2265 × 600 × 1200 mm | P | P | P | P | P |
| Rittal VX IT **VX 5310.128** | Rittal pdf-creator, "Estado: 12/07/2026" | WHD 600 × 2000 × 1200 mm, 42 U | P | P | P: "UL + C-UL (listed)" | P | P |
| Chatsworth ZetaFrame **ZA15-A1000-71** | chatsworth.com product page, undated | 79.4"H × 23.6"W × 47.2"D (2017 × 600 × 1200 mm), 42U | P | P | P (US maker, BABA) — UL not printed | P | P (live page) |
| Panduit FlexFusion **XG64222BS0001** (decoded) | FlexFusion spec sheet **RKSP195-WW-ENG, 2/2021** | Part-no. key: 6 = 600 mm, 42 = 42 RU, 2 = 1200 mm; 42 RU = 1999 mm (excl. casters, +24 mm); D 1200 (1254 overall "Dimension B") | P | P | P: UL2416 | P (by printed key; 42U row itself not in sample table) | **F** (2021) |
| Eaton RS **RSV4262B** | eaton.com/us SKU page | 80 in H × 23.6 in W × 47.24 in D, 42U | P | P | P: UL 60950-1 | P | **F**: "To be discontinued" |
| Eaton RA Gen2 RAA42612PSB13U | PS159010EN, May 2020 | H 2093 (castors), W 600, D 1260 mm | P | P | **F** (EMEA; no NA cert printed) | P | **F** (2020) |
| Eaton REC RCA42612SPBE | PS159001EN, Oct 2014 | 2048 × 600 × 1240 mm | P | P | ? | P | **F** |

**Comparison (our calculation):** all current passing units share a **0.600 × 1.200 m** footprint (0.72 m²). 42U heights: 1.991 (APC), 1.999 (Panduit), 2.000 (Vertiv), 2.000 (Rittal), 2.017 (Chatsworth). Median height 2.000 m. 48U: 2.258 (APC), 2.265 (Vertiv), 2.266 (Panduit).

**Proposed basis: Vertiv VR3300, 0.600 × 1.200 × 2.000 m (42U); 48U = Vertiv VR3307, 2.265 m.**
Reason: five makers build the same 600 × 1200 mm cabinet, so the footprint is the common size, not a brand pick. Vertiv sits on the median height and has a current North American brochure with UL2416. Range: H 1.991–2.017 m (42U). **The current basis AR3300 is discontinued (31 Dec 2025)**; its Gen 2 successor AR3300B2 has the same size if APC is preferred.

---

## B. Chilled-water room unit (CRAH) or fan wall, ~150–250 kW

| Candidate | Doc | Rating (printed, conditions) | Printed dims | C1 | C2 | C3 | C4 | C5 |
|---|---|---|---|---|---|---|---|---|
| Vertiv Liebert PCW **PWM15** | Flyer MKA4L0UKPCWPWM Rev.1, 10/2023 (from kit_hall research) | 150 kW net sensible; Smart Coil conditions 36 °C / 30 % RH return, 18–26 °C water listed but not tied explicitly to the figure | L × W × H 2550 × 1050 × 3050 mm | P | P | **F/?**: EMEA flyer; the en-us PCW page said "not available for your country/region" (may reflect fetch location) | P | P |
| Vertiv Liebert PCW **PWM25** (current basis) | same | 250 kW | 3400 × 1050 × 3050 mm | P | P | F/? as above | P | P |
| Vertiv Liebert **CW146** | Liebert CW System Design Catalog, ©2024, Table 2.1 p.7 (capacity); vertiv.com/en-us CW product page (dims) | 141 kW net sensible at 75 °F DB / 61 °F WB entering air, 45 °F entering water, 10 °F rise; downflow | H 94 × W 122 × D 42 in | P | P | P: 60 Hz electrical tables (380/460/575 V), Table 3.1 pp.19–22; AHRI badge | P | P (©2024) |
| Vertiv Liebert **CW181** | same | 179 kW net sensible (610,800 BTUH), same conditions. Product page: "605 kBtuh [177 kW]" | H 94 × W 122 × D 42 in | P | P | P | P | P |
| Vertiv Liebert CW305/375/415 | SL-70373 rev0 (drawings 11/18, 1/19) | 228–339 kW (CW305 228 kW at 35,000 ACFM, 75 °F/61 °F, 45 °F, 10 °F rise; p.9) | Drawing values unlabelled (144" = 3658 mm etc.) | P (CW305) | P | P | **F** (axis labels not readable) | **F** (2018–19) |
| Vertiv Liebert PH145–PH201 | Brochure Rev.6, 06/2017 | 145.8–204.0 kW | 2950/3350 × 890 × 1970 mm | P | P | ? | P | **F** (2017) |
| Vertiv Liebert CWA thermal wall | SL-70713 (R11/22) | "200 to 500 kW" in title; no per-model rating | none printed | ? | P | P (NA data sheet) | **F** | P |
| Schneider Uniflair FXCV (130–250 kW) / HXCV | Room Cooling e-Catalog 2026 v2.0 (kit_hall) ; HXCV brochure SPD_FFAI-BFUBEX_EN, 27 Apr 2020 | range only | not printed (2026 catalogue); 2020 brochure PDF not reachable | P | P | ? (HXCV file named "GMA-US") | **F** | F (2020) |
| STULZ CyberAir 3PRO CW | stulz.com product page, undated | 22–260 kW (range) | H 2495–2915, W 950–3350, D 890–1040 mm (range only, not per size) | P | P | ? (global page) | **F** (per size not printed) | ? |
| STULZ CyberAir CW (USA) | stulz.com/en-us page | 60–1,080 kW (range) | not printed | P | P | P (US page) | **F** | ? |
| STULZ CyberWall AHU (USA) | stulz.com/en-us page | 355–790 kW | not printed | **F** (size) | P | P: 460 V/60 Hz | F | ? |
| JCI/YORK MCH CRAH | york.com page | "105kW to 550kW" | only "airflow length 54 in", base rail 6 in | P | P | ? | **F** | ? |
| JCI Silent-Aire CRAC/CRAHU | silent-aire.com | "up to 260 tons" | not printed ("custom") | ? | P | ? (CEC/NEC/IEC options) | **F** | ? |
| JCI Cold Wall AHU (ME site) | me.johnsoncontrols.com | 80–470 kW nominal | not printed | P | P | ? | **F** | ? |
| Munters MCW 2.0 / 2.1 | PS-DATA CENTER MCW2, ©2023 | 381–548 kW (20–25 ΔT) | A/B/C 170/60/156.5 in (unlabelled) | **F** (size) | P | ? | F | P |
| Munters EDPAC CW | PS-EN-202403 | max 119.7 kW (22 °C/50 % RH, 6 °C water) | 3250 × 850 × 1980 mm (320/4/6) | **F** (size) | P | ? | P | P |

**Comparison, kW per m² footprint (our calculation):**

| Unit | Footprint (m) | kW | kW/m² |
|---|---|---|---|
| CW146 | 3.099 × 1.067 = 3.306 m² | 141 | 42.7 |
| CW181 | 3.099 × 1.067 = 3.306 m² | 179 | 54.1 |
| PWM15 | 2.550 × 1.050 = 2.678 m² | 150 | 56.0 |
| PWM25 | 3.400 × 1.050 = 3.570 m² | 250 | 70.0 |

Ratings are **not at the same conditions**. Liebert CW is rated at 23.9 °C return / 7.2 °C water. PCW is shown with 36 °C return / 18–26 °C water. The kW/m² values therefore mix conditions.

Median: 55.0 kW/m² for all four, or 48.4 kW/m² for the two that pass C3. **CW181 is nearest in both cases.**

**Proposed basis: Vertiv Liebert CW181. 179 kW net sensible; W 3.099 × D 1.067 × H 2.388 m (122 × 42 × 94 in).**
Reason: it is the passing unit nearest the median, and it is sold in North America with 60 Hz data, which the current PWM25 (an EMEA unit) is not shown to be. Range across passing units: 42.7–70.0 kW/m² (or 42.7–54.1 for NA-only). Caveat: its 179 kW is at a cold legacy return-air condition. At warm data-centre return air the capacity would be higher, but that figure is not printed.

---

## C. Floor-standing CDU, ~1–2.5 MW

| Candidate | Doc | Rating (printed) | Printed dims | C1 | C2 | C3 | C4 | C5 |
|---|---|---|---|---|---|---|---|---|
| Vertiv CoolChip CDU **1350** (current basis) | Data sheet **SL-80005 (05/26)** p.2 | 1350 kW at 4 °C ATD | H × W × D 2122 × 900 × 1243 mm | P | P | P: 480 V 60 Hz; cULus | P | P |
| Vertiv CoolChip CDU **2300** | same | 2300 kW at 4 °C ATD | 2400 × 1200 × 1200 mm | P | P | P | P | P |
| CoolIT **CHx2000** | coolitsystems.com/?p=5715 (Table 1); product page coolitsystems.com/cdu-product/chx2000/ | 2269 kW at 4 °C ATD, PG25 ("estimated nominal"); product page "2000 kW … at 5°C ATD" | footprint "750 mm x 1200 mm"; H ? | P | P | P (maker's NA site); Hz/UL not printed | P (footprint only) | P |
| Motivair (Schneider) **MCDU-40** | CDU brochure "CDU 2026 Motivair by SE", ©2025 | Row 2 (primary supply 105.8 °F, secondary supply 113 °F, i.e. 4 K) 965 kW; Row 1 1213.15 kW | W 36 × L 61-5/8 × H 80-1/2 in | P (~1 MW) | P | P: 380–480 V/3 ph/50-60 Hz; UL | P | P |
| Motivair **MCDU-45** | same | Row 2: 853 kW; Row 1: 1567 | 36.02 × 48.03 × 91.73 in | **F** at 4 K (<1 MW) | P | P (CE/UL) | P | P |
| Motivair **MCDU-50** | same | Row 2: **1516 kW**; Row 1: 1718.64 | 36 × 61-5/8 × 80-1/2 in | P | P | P | P | P |
| Motivair **MCDU-55** | same | Row 2: 728 kW; Row 1: 2192 | 43.31 × 47.24 × 92.52 in | **F** at 4 K | P | ? (CE only listed) | P | P |
| Motivair **MCDU-70** | same | Row 2: 2500 kW; Row 1: 5040 | 63.00 × 48.13 × 90.00 in | P | P | P | P | P |
| Delta **SuperCDU-1500** | Leaflet EIAIEI-10-JY; deltaww.com en-US page | 1500 kW at 5 °C ATD; 1377 kW at 4 °C (1200/1200 LPM) | W × D × H 1200 × 1200 × 2300 mm | P | P | P: UL/CSA 60335; 50/60 Hz | P | **?** (no date printed) |
| Delta **SuperCDU-1200** | Leaflet EIAQEC-03-JY | 1200 kW at 5 °C; 1200 kW at 4 °C (1200/1350 LPM) | 900 × 1200 × 2300 mm | P | P | P | P | ? |
| Eaton (ex-Boyd) **ROL2300-48U40** | eaton.com/us CDU catalogue page, ©2026 | 1150 kW at 4 °C ATD; 2300 kW at 8 °C | 1016 × 1219 × 2134 mm (axes unlabelled) | P | P | P (US page); Hz/UL not printed | P | P |
| Eaton **ROL4000-48U65** | same | 2000 kW at 3 °C ATD | 1651 × 1199 × 2364 mm | P | P | P | P | P |
| Eaton ROL1100-48U32 | same | 550 kW at 4 °C; 1100 kW at 8 °C | 800 × 1205 × 2147 mm | F at 4 K | P | P | P | P |
| Nidec **NIR2.5** | nidec.com spec-nir page | 2000 kW at 5 °C (1.0 LPM/kW); 1500 kW at 5 °C (1.5 LPM/kW) | W × D × H 900 × 1219 × 1973 mm | P | P | **?** (V/Hz, certs not printed) | P | ? |
| nVent RackChiller CDU800 | nvent.com/en-us | "800kW+"; no table | not printed | **F** (<1 MW) | P | P | F | ? |
| Boyd in-row CDU | BC042021 (04/2021) | 305 kW at 4 °C | 610 × 1219 × 1948 mm | **F** | P | P (480 V/60 Hz) | P | F |

**Comparison, kW per m² footprint at ~4 K ATD (our calculation):**

| Unit | Footprint m² | kW | kW/m² |
|---|---|---|---|
| MCDU-40 | 0.914 × 1.565 = 1.431 | 965 | 674 |
| Eaton ROL2300 | 1.016 × 1.219 = 1.239 | 1150 | 929 |
| Delta 1500 | 1.44 | 1377 | 956 |
| Eaton ROL4000 (3 K) | 1.980 | 2000 | 1010 |
| **MCDU-50** | 1.431 | 1516 | **1059** |
| Delta 1200 | 1.08 | 1200 | 1111 |
| **Vertiv 1350** | 0.900 × 1.243 = 1.119 | 1350 | **1207** |
| MCDU-70 | 1.600 × 1.223 = 1.956 | 2500 | 1278 |
| Vertiv 2300 | 1.44 | 2300 | 1597 |
| CoolIT CHx2000 | 0.90 | 2269 | 2521 |

Median: 1085 kW/m². Range: 674–2521 kW/m². Nidec (1823 at 5 K) is excluded because C3 is "?".

Nearest the median: MCDU-50 (1059) and Delta 1200 (1111) are tied (Δ 26). The Delta leaflet carries no date.

**Proposed basis: Motivair MCDU-50. 1516 kW at a 4 K approach; 0.914 W × 1.565 D × 2.045 H m (36 × 61-5/8 × 80-1/2 in).**
Reason: it is the dated, UL, 60 Hz unit nearest the median of ten units from five makers. The current Vertiv 1350 is 11 % denser than the median, which makes it a fair alternative.

Note on Motivair ratings: Row 1 of the brochure (1718.64 kW) is at a 23 °F (12.8 K) primary-to-secondary difference. Only Row 2 compares with the others' 4 °C ATD.

---

## D. Water-to-water heat pump for district heating, 1–3 MW heat, 60–90 °C out from 25–45 °C source

| Candidate | Doc | Rating (printed, conditions) | Printed dims | C1 | C2 | C3 | C4 | C5 |
|---|---|---|---|---|---|---|---|---|
| Sabroe **HeatPAC 108/112/116-W** (116-W = current basis) | Sabroe brochure section "Pompes à chaleur…", p.56; hosted on cdn.inwink.com (event CDN), no cover/date | 1432 / 2078 / 2663 kW; condenser 60→70 °C, evaporator 39→34 °C, 1800 rpm | 5300/5700/6000 × 1000 × 2000/2100/2100 mm; header "l L H" (axis order unconfirmed) | P | P | ? | P | **?** (undated; not on maker site) |
| Sabroe HeatPAC 712/716-W | same p.56 | 1023 / 1346 kW; condenser 70→90 °C, evaporator 39→34 °C | 5200 / 6000 × 1000 × 2100 mm | P | P | ? | P | ? |
| Sabroe **DualPAC 104/106/108/112-W** | johnsoncontrols.de "jci-dualpac_datenblatt" (undated) | 1039 / 1557 / 2075 / 2895 kW; condenser 50→70 °C, evaporator 30→20 °C | 5000/5500/6000/7500 × 3000 × 2000/2000/2200/2200 mm (L × W × H) | P | P | ? | P | ? |
| Sabroe **DualPAC 708/712/716-W** | same | 996 / 1494 / 1991 kW at 50→70 / 30→20 °C; also 920 / 1381 / 1841 kW at condenser 70→90 °C, evaporator 15→5 °C | 5000/5500/6100 × 3000 × 2100 mm | P | P | ? | P | ? |
| YORK **CYK** | york.com CYK page | "2,051 – 11,136 kW heating", up to 180 °F (82 °C) | not printed; Engineering Guide 160.82-EG1 only in a docs viewer (not read) | P | P | P (York NA; St. Michael's Hospital, Toronto case study listed) | **F** | ? |
| Friotherm Unitop 43 / 22 | friotherm.com | compressor 3000–13000 kW (43); ">+80 °C" double-stage | not printed | P | P | ? | **F** | ? |
| Carrier 61XWHZE | carrier.com (DK/UK pages) | 200–2,500 kW, up to 85 °C | not printed (docs list empty or eto.carrier.com links) | P | P | ? (EU product) | **F** | ? |
| Daikin EWWH-VZ (high-temp option 251) | daikin.co.uk product table; IOM D-EIMWC003H02-18_12EN (10-2025) | Heating kW not printed (cooling only: e.g. EWWHC12 1,180 kW at 12/7 °C, 30/35 °C); CLWT up to 90 °C | EWWHC12VZPSA2 2,500 × 1,610 × 4,750 mm (H × W × D) | P | P | ? (EU) | **F** (no heating rating) | P |
| Trane RTWF HT | RTWF-HT-SLB-GB_0126 (©2026) | 700–1130 kW, max LWT 105 °C, "preliminary" | not printed | P | P | **F** ("Europe, MEA, Australia and New Zealand") | **F** | P |
| MHI ETI-W | mhi.com news 9 Oct 2026 | max 640 kW, 90 °C | not printed | **F** (<1 MW) | P | ? | F | P |
| MAN (Everllence) HOFIM | man-es.com press release 17 Jul 2024 | "around 44 MW" per unit, up to 98 °C | – | **F** (size) | P | ? | F | P |
| Siemens Energy | Heat pump brochure ©2023 | up to 45 MWth (≤100 °C) / 70 MWth (≤150 °C); smallest unit not printed | – | **F/?** | P | ? | F | P |
| Oilon ChillHeat S | ChillHeat brochure "EN 02/122025" p.4, 8–9 | S180–S2000: 180–2000 kW (range only), 85 °C | S600–S2000: "Dimensions must be checked from Oilon" | P | P | P (en-us page; UL brochure exists, not read) | **F** | P |
| Star Refrigeration Neatpump | Neatpump brochure (undated, 2019 upload) | water-source "100kWth to 10MWth", up to 85 °C | not printed | P | P | ? | **F** | F/? |

**Comparison, kW heat per m² footprint at about 70 °C out (our calculation; footprint = first two printed dims):**

| Unit | m² | kW | kW/m² |
|---|---|---|---|
| DualPAC 708-W | 15.0 | 996 | 66.4 |
| DualPAC 104-W | 15.0 | 1039 | 69.3 |
| DualPAC 712-W | 16.5 | 1494 | 90.5 |
| DualPAC 106-W | 16.5 | 1557 | 94.4 |
| **DualPAC 716-W** | 18.3 | 1991 | **108.8** |
| **DualPAC 108-W** | 18.0 | 2075 | **115.3** |
| DualPAC 112-W | 22.5 | 2895 | 128.7 |
| HeatPAC 108-W | 5.3 | 1432 | 270.2 |
| HeatPAC 112-W | 5.7 | 2078 | 364.6 |
| HeatPAC 116-W | 6.0 | 2663 | 443.8 |

Median: 112.0 kW/m². Range: 66–444 kW/m². DualPAC 716-W and 108-W are tied (Δ 3.2).

The HeatPAC and DualPAC rows use different source temperatures (39→34 °C vs 30→20 °C). The HeatPAC footprint (1.0 m wide) is a single skid. The 3.0 m DualPAC width is the printed package width.

**Proposed basis: Sabroe DualPAC 716-W. 1991 kW at 50→70 °C (source 30→20 °C), or 1841 kW at 70→90 °C (source 15→5 °C); L 6.1 × W 3.0 × H 2.1 m.**
Reason: only Johnson Controls/Sabroe prints both size and rating for 1–3 MW units, and of its units the 716-W sits at the median. It also has printed ratings at both 70 °C and 90 °C output, which spans the tool's 60–90 °C range. The current HeatPAC 116-W is about four times denser than the median, because its 1 m wide skid probably excludes items the DualPAC package includes (not stated).
Gaps: C3 (Canadian use) and C5 (document date) are "?" for every Sabroe document read.

---

## E. Plate heat exchanger, 1–5 MW

No maker document read prints a **thermal duty (kW/MW) per frame**. Duty depends on plate count and temperatures, so C4 "rating" fails for all makers. Printed hydraulic ratings (max flow) are recorded where they exist.

| Candidate | Doc | Printed rating | Printed dims | Port | C1 | C2 | C3 | C4 | C5 |
|---|---|---|---|---|---|---|---|---|---|
| Alfa Laval **T20-FM** (current basis) | Leaflet CHE00078-4-EN-GB (no date); older CHE00078EN 2016-04 | flow ?; kW ? | H 2146 (PED) / 2141 (pvcALS), W 755/780, h 285 mm; unlabelled "930-3930" (likely L) | DN200 / NPS 8 | P | P | P (ASME flanges offered) | **F** (no rating) | ? / F |
| Alfa Laval TS20 | CHE00088-7-EN-GB (no date) | ? | values unlabelled | ? | ? | P | ? | F | ? |
| Kelvion **NP150X** | PF_PHE_GPHE_NPPlate_EN, Version 02 • 10/22 | max flow 350 m³/h | W 640 × H 2377 mm; L ? | DN150 | P | P | ? | Partial (flow only; L ?) | P |
| Kelvion **NP250L** | same | max flow 1050 m³/h | W 895 × H 2866 mm; L ? | DN250 | P | P (DC cooling named in press) | ? | Partial | P |
| SWEP **B649** (brazed) | Product sheet SWEP-B649-en, generated 2025-03-04 | max flow 349.9 m³/h | A 1232, B 537, C 995, D 300; F = 32.72 + 2.09 × NoP, max 420 plates | ? | P | P | ? ("UL Pressure / Temperature" heading, no values) | Partial | P |
| Danfoss Sondex S81–S251 | Data sheet "Gasketed PHE (DN 300)", 2019.07 | ? | W 970/1030, H 1906–3878, L 687–6260 mm | DN300 | ? | P | ? | F | F |
| Danfoss DN150–250 sheets | not found on maker site (only a distributor copy, not used) | – | – | – | – | – | – | F | – |
| API Schmidt SIGMA | Gasketed PHE R1 (no date) | line max 4750 m³/h | line range H 559–3251, W 152–1245 mm only | DN25–500 | ? | P | P (US maker) | F | ? |
| Tranter GX | only distributor / DirectIndustry / Scribd copies found (not used) | – | – | – | – | – | – | F | – |

**Comparison:** no kW/m² can be computed. The only printed comparable is max flow per frame: NP150X 350, SWEP B649 350, NP250L 1050 m³/h.

**Proposed basis: keep Alfa Laval T20-FM (DN200 frame), W 0.780 × L 0.930–3.930 × H 2.146 m.** Size it by our own heat balance, not by a printed MW.
Reason: it is the only DN150–250 frame among those read with a full set of printed dimensions (H, W and length range). No maker prints MW per frame, so the frame choice rests on port size and dimensions.
Gaps: the current leaflet is undated. Kelvion NP150X/NP250L (10/22) are current and print flow, but their lengths are not printed.

---

## F. Buffer / thermal storage tank for a 1–3 MW heat pump

| Source | Doc | Printed value | Applies to | Pass? |
|---|---|---|---|---|
| Daikin EWW(D/H/S)-VZ IOM | D-EIMWC003H02-18_12EN, REV 12, **10-2025**, §2.9 p.23 | "Single circuit unit = 5 lt/kW nominal"; "Dual circuit unit = 3,5 lt/kW nominal"; "kWnominal = Cooling capacity at 12/7°C" | EWWH-VZ heat pumps (high-temp option to CLWT 90 °C, §3.2.2 p.31), ~0.4–1.9 MW. Minimum **system water content**, not storage | Best primary figure found for this size; maker IOM, current |
| Daikin EWWD-DZ/EWWH-DZ IOM | D-EIMWC01405-18EN Rev 01, 07/2018, p.15 | 3.3 / 2.5 l/kW (comfort), 6.6 / 5.0 l/kW (process), "recommend doubling" | Centrifugal chiller | C5 F |
| Daikin EWYT~B IOM | D-EIMHP01302-20 Rev 09, 02/2026, p.16 | 16 l/kW single circuit, 8 l/kW dual circuit (heating) | Small air-to-water heat pump | Wrong type/size |
| Reflex Storatherm Heat H 5000/R | Reflex datasheet (created 09-09-2026) | 5000 l: Ø 1500 × H 3211 mm; 4000 l: Ø 1500 × 2676; 3000 l: Ø 1500 × 2101 | Tank geometry | P |
| Carrier "Loop Volume" note | carrier.com, undated | no minimum rule; "3 GPM/Ton" only as a worked example | Chillers | No rule |
| UK DESNZ Heat Network Optimisation Guide | assets.publishing.service.gov.uk | no l/kW guidance in the part read (text truncated after §5.2.1) | Heat networks | Not found |
| CIBSE CP1, ASHRAE, EN standards | paywalled | – | – | Not read |

No government or peer-reviewed design guide giving litres per kW for a 1–3 MW water-to-water heat pump was found.

**Proposed basis:** keep the Reflex Storatherm 5000 L (Ø 1.5 × 3.211 m) as the drawn tank. Size the volume by Daikin's current rule (5 l/kW single circuit, 3.5 l/kW dual circuit, on nominal cooling kW), labelled as a maker minimum for compressor stability, not thermal storage.
Example (our calculation): 2 MW cooling × 5 l/kW = 10,000 l = 2 × 5000 l tanks.

---

## G. Pre-insulated twin pipe, DN150–DN250

| Candidate | Doc | Printed casing Ø (mm) Series 1 / 2 / 3 | DN250 twin? | C1 | C2 | C3 | C4 | C5 |
|---|---|---|---|---|---|---|---|---|
| Logstor (current basis) | Product Catalogue §6 TwinPipe, 2014.09 (third-party S3 copy), pp.6.1.0.4–5 | DN150 (168.3 × 4.0): 450 / 500 / 560; DN200 (219.1 × 4.5): 560 / 630 / 710 | not in tables (?) | P | P | ? | P | **F** (2014; not on maker site) |
| Logstor current | logstor.com design manual media/7241, catalogue media/7319; series pages | not readable (no text / SVG drawings) | ? | P | P | ? | **F** (unreadable) | P |
| Brugg PREMANT DUO | PRE DUO catalogue, 6.2.2018, Table 7.300 p.7.300 | DN150: 450 / 500 / 560; DN200: 560 / 630 / 710 | not listed (table max DN200); 2026 web page says "DN 20 to DN 250" | P | P | ? | P | **F** (2018) |
| Brugg 2026 Planning Guide | 13.04.2026 | single pipe only (DN200 single: 315 / 355 / 400) | – | F (single) | P | ? | – | P |
| isoplus | twin-pipe PDF redirected to isoplus.group; not reachable | ? | (DN250 claim seen only on a directory site, not used) | ? | P | ? | F (not read) | ? |
| Uponor Ecoflex Thermo Twin | uponor.com product pages (e.g. 2×50×4.6/200) | PEX service pipe; no DN150–250 twin found | – | F/? | P | ? | – | – |
| Rehau Rauthermex | not read | ? | – | ? | – | – | – | – |

**Comparison:** for DN200 Series 2, Logstor 2014 and Brugg 2018 print the same casing Ø, 630 mm. Range for DN200: 560–710 mm (Series 1–3). DN150: 450–560 mm. DN250 twin: "?" from every document read.

**Proposed basis:** keep DN200 twin, casing Ø 0.630 m (Series 2), with Series 1/3 = 0.560/0.710 m.
Reason: two makers print the same casing diameters, so this is the common size rather than one brand's. Both documents are older than 2022, so check the values against a current Logstor or isoplus edition before the drawings are final. DN250 twin remains "?".

---

## Sources (primary; maker or government)

- se.com AR3300: https://www.se.com/us/en/product/AR3300/apc-netshelter-sx-server-rack-enclosure-42u-black-1991h-x-600w-x-1200d-mm/
- se.com AR3300B2: https://www.se.com/us/en/product/AR3300B2/apc-netshelter-sx-server-rack-gen-2-42u-1991h-x-600w-x-1200d-mm-with-sides-black-taa/
- se.com AR3307B2: https://www.se.com/us/en/product/AR3307B2/apc-netshelter-sx-server-rack-gen-2-48u-2258h-x-600w-x-1200d-mm-with-sides-black-taa/
- Vertiv VR rack brochure SL-20819: https://www.vertiv.com/4a4e1d/globalassets/products/facilities-enclosures-and-racks/integrated-solutions/vertiv-smartcloset/vertiv-vr-rack-br-en-na-sl-20819-web.pdf
- Vertiv VR3300 page: https://www.vertiv.com/en-us/products-catalog/facilities-enclosures-and-racks/racks-and-containment/vr3300/
- Rittal VX 5310.128: https://www.rittal.com/pdf-creator/variant/br-pt/5310128
- Chatsworth ZA15-A1000-71: https://www.chatsworth.com/en-us/products/cabinets-and-enclosures/servers-and-network-cabinets/enterprise-and-colocation/zetaframe-cabinet-system/za15-a1000-71
- Panduit FlexFusion spec sheet: https://panduit.com/content/dam/panduit/en/solutions/NI-DC-RKSP195-ENG_FlexFusionSpecSheet.pdf
- Eaton RSV4262B: https://www.eaton.com/us/en-us/skuPage.RSV4262B.html ; RA Gen2: https://www.eaton.com/content/dam/eaton/products/server-racks-enclosures-airflow-management/racks-enclosures/ra-series-it-racks/eaton-raserie-itracks-datasheet-2020-ps159010en-en-gb.pdf ; REC: https://www.eaton.com/content/dam/eaton/products/server-racks-enclosures-airflow-management/racks-enclosures/rec-series-it-racks/Eaton%20REC%20Series%20IT%20Rack%2042U-47U%20-%20Datasheet.pdf
- Vertiv Liebert CW 38–181 kW (Canada page, model table): https://www.vertiv.com/en-ca/products-catalog/thermal-management/room-cooling/liebert-cw-chilled-water-cooling-system-038-181kw/
- Vertiv CW181 page: https://www.vertiv.com/en-us/products-catalog/thermal-management/room-cooling/cw181-181kw/
- Liebert CW System Design Manual (©2024): https://www.vertiv.com/globalassets/products/thermal-management/room-cooling/liebert-cw-system-design-manual_00.pdf
- Liebert CW 305–415 SL-70373: https://www.vertiv.com/492d8e/globalassets/products/thermal-management/room-cooling/sl-70373_rev0_web.pdf
- Liebert CWA SL-70713: https://www.vertiv.com/48edfb/globalassets/products/thermal-management/room-cooling/vertiv-liebert-cwa-thermal-wall/vertiv-liebert-cwa-ds-en-na-sl-70713-web.pdf
- Vertiv PCW en-us page: https://www.vertiv.com/en-us/products-catalog/thermal-management/room-cooling/vertiv-liebert--pcw-chilled-water-floor-mount-cooling-unit/
- Vertiv PWM flyer (from kit_hall): https://vertiv.com/4af974/globalassets/products/thermal-management/room-cooling/vertiv-liebert--pcw-chilled-water-floor-mount-cooling-unit/vertiv-liebert-pcw-pwm-model-flyer-en-emea_rev.1_10-2023.pdf
- Schneider HXCV doc page: https://www.se.com/uk/en/download/document/SPD_FFAI-BFUBEX_EN/
- STULZ CyberAir 3PRO CW: https://www.stulz.com/products/detail/cyberair-3pro-cw/ ; US CyberAir: https://www.stulz.com/en-us/products/detail/cyberaircwanddx/ ; CyberWall: https://www.stulz.com/en-us/products/detail/cyberwall-ahu/
- YORK MCH CRAH: https://york.com/Commercial-Equipment/Air-Systems/Air-Handling-Units/MCH_CRAH_Unit_CH ; Silent-Aire: https://www.silent-aire.com/cracsandcrahu/ ; JCI Cold Wall: https://me.johnsoncontrols.com/hvac-equipment/air-handling-units/cold-wall-ahu
- Munters MCW: https://www.munters.com/globalassets/inriver/resources/ps-data-center-mcw2-202305-en.pdf ; EDPAC: https://munters.com/globalassets/digizuite/16466-en-edpac-crac-crah-ps-en-202403pdf
- Vertiv CoolChip CDU family SL-80005 (05/26): https://www.vertiv.com/49cd51/globalassets/shared/vertiv-coolchip-cdu-2300kw-data-sheet-sl-80005.pdf ; CDU 1350 page: https://www.vertiv.com/en-us/products-catalog/thermal-management/high-density-solutions/vertiv-coolchip-cdu-1350/
- CoolIT CHx2000: https://coolitsystems.com/?p=5715 ; https://www.coolitsystems.com/cdu-product/chx2000/
- Motivair CDU brochure: https://www.motivaircorp.com/uploads/files/brochures/CDU%202026%20Motivair%20by%20SE.pdf
- Delta SuperCDU-1500: https://deltapowersolutions.com/media/download/Leaflet_InfraSuite_L2L-CDU-1500_en_EIAIEI-10-JY.pdf ; https://www.deltaww.com/en-US/products/Cooling/liquid-to-liquid-coolant-distribution-unit-1500kw ; SuperCDU-1200: https://deltapowersolutions.com/media/download/Leaflet_InfraSuite_L2L-CDU-1200_en_EIAQEC-03-JY.pdf
- Eaton (Boyd) CDUs: https://www.eaton.com/us/en-us/catalog/thermal-management-solutions/coolant-distribution-unit-cdu.html ; Boyd 305 kW: https://info.boydcorp.com/hubfs/Thermal/Liquid-Cooling/Boyd-Coolant-Distribution-Units.pdf
- Nidec NIR2.5: https://www.nidec.com/en/product/liquid-cooling-line-up/products/in-row/spec-nir.html
- nVent CDUs: https://www.nvent.com/en-us/data-solutions/coolant-distribution-unit
- Sabroe HeatPAC (event CDN copy): https://cdn.inwink.com/57a99c03-15df-49e0-a2e9-5b8eefa811f5/92986994-1b4a-40fc-8940-4aaeff7682221
- Sabroe DualPAC: https://www.johnsoncontrols.de/-/media/project/jci-global/johnson-controls/ce-region/germany-johnson-controls/events-pdfs/jci-dualpac_datenblatt-ly-1.pdf
- YORK CYK: https://www.york.com/products-and-solutions/chilled-water-systems/water-cooled-chillers/cyk_ap/
- Friotherm Unitop 43: https://www.friotherm.com/?p=645
- Carrier 61XWHZE: https://www.carrier.com/commercial/en/dk/products/heating/water-to-water-heat-pumps/61xwhze/
- Daikin EWWH-VZ: https://www.daikin.co.uk/en_gb/products/product.table.html/EWWH-VZPS.html ; IOM (EN, 10-2025): https://www.daikin.cz/content/dam/document-library/installation-manuals/as/water-cooled-chiller/ewwd-vzss/EWW(D.H.S)-VZ(P.S.X)S_Installation.Operation.Maintenance%20manual_D-EIMWC003H02-18_12_English.pdf ; press July 2025: https://www.daikin-ce.com/content/dam/DAIKIN-CE/pressreleases/2025/daikin-elevates-vz-series/Press-information-Daikin-elevates-VZ-series-new-high-temperature-option-unveiled.pdf
- Trane RTWF HT: https://www.trane.com/Resources/Partners/1d564a78-05bb-47a6-9331-429de53e033c/documents/RTWF_HT-SLB_0126.pdf
- MHI ETI-W: https://www.mhi.com/news/261009.html
- MAN Aalborg: https://www.man-es.com/company/press-releases/press-details/2024/07/17/man-energy-solutions-to-deliver-additional-heat-pump-unit-for-aalborg-s-district-heating
- Siemens Energy: https://assets.siemens-energy.com/dam/4135a8d2-4131-4317-94f4-b0530189299e/Heatpump-Interactive-Brochure-pdf_Original%20file.pdf
- Oilon ChillHeat: https://oilon.com/wp-content/uploads/2024/04/Oilon_ChillHeat-EN.pdf ; https://oilon.com/en-us/products/oilon-chillheat-s-180-s-490
- Star Neatpump: https://www.star-ref.co.uk/wp-content/uploads/2019/12/neatpump-brochure_tcsd.pdf
- Alfa Laval T20: https://www.alfalaval.com/globalassets/documents/products/heat-transfer/plate-heat-exchangers/gasketed-plate-and-frame-heat-exchangers/industrial/t20_pdleaflet_pct00042en.pdf ; https://www.alfalaval.com/globalassets/documents/microsites/heating-and-cooling-hub/pd-leaflets---gasketed/t20.pdf ; TS20: https://assets.alfalaval.com/documents/p27589529/alfa-laval-ts20-product-leaflet-en.pdf
- Kelvion NP: https://d2xjeen3zaup4u.cloudfront.net/asset/767398133948/document_997vi65ot93879k6h3c2u4t65e/PF_PHE_GPHE_NPPlate_EN.pdf (Kelvion-branded file on a CDN; not confirmed as linked from kelvion.com)
- SWEP B649: https://www.swepgroup.com/content/dam/swep/product-datasheets/SWEP-B649-en.pdf
- Danfoss DN300: https://assets.danfoss.com/documents/latest/43987/AI312538983876en-010101.pdf ; product page: https://www.danfoss.com/en-gb/products/dhs/heat-exchangers/gasketed-heat-exchangers/standard-plate-heat-exchangers
- API Schmidt: https://www.apiheattransfer.com/wp-content/uploads/2021/01/Gasketed-PHE_R1.pdf
- Reflex Storatherm (from kit_hall): https://xom-web.reflex.de/xom-rest/assets/ec68e2bd-9188-4e92-94f6-00b5a42eef5d/content?locale=en
- Carrier Loop Volume: https://www.carrier.com/commercial/en/us/media/Loop-Volume_tcm199-55947.pdf
- DESNZ Heat Network Optimisation Guide: https://assets.publishing.service.gov.uk/media/649567a0831311000c296255/heat-network-optimisation-guide.pdf
- Logstor 2014 (third-party copy): https://districtheating-prod.s3.amazonaws.com/uploads/2015/02/09/logstortwin-pipe-specification.pdf ; current: https://www.logstor.com/media/7241/kingspan-logstor-design-manual-twinpipes-specifications-en-eur.pdf
- Brugg PREMANT DUO 2018: https://www.bruggpipes.com/fileadmin/user_upload/downloads_en/startseite/produkte/nah-und-fernwaerme/premant/dokumentation/PRE_DUO_GB_6.2.18.pdf ; Planning Guide 2026: https://www.bruggpipes.com/fileadmin/user_upload/downloads/produkte/01-nah-und-fernwaerme/premant/dokumentation/Planungshandbuch_EN_13apr26_final.pdf ; page: https://www.bruggpipes.com/en/premant-duo

## Could not be read

- **Blocked by the fetch tool's link rule:** Vertiv CW 38–181 System Design Catalog SL-18061; Chatsworth ZetaFrame data sheet; se.com FXCV page; YORK CYK-400 flyer and PUBL-4030; Oilon ChillHeat-UL brochure; Logstor series 1/2 pages.
- **Robots-disallowed:** STULZ repository brochures (repository.stulz.com).
- **Viewer only, not read:** YORK CYK Engineering Guide 160.82-EG1.
- **Redirected to a home page:** isoplus twin-pipe PDF.
- **No text returned:** current Logstor catalogues.
- **Paywalled:** CIBSE CP1, ASHRAE, EN 15698-1.
- **Not used (distributor, Scribd, manualslib, DirectIndustry copies):** Tranter, Danfoss DN200, Carrier 61XWHZE product data, Panduit 42U distributor listings.
