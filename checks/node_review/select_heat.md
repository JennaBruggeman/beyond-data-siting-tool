# Heat rejection: basis-unit selection study (Beyond Data)

Prepared 29 Oct 2026. Primary maker documents only. "?" = not printed, or not readable from here.

**Read this first: limits on access**
- Direct downloads (curl) were refused by the egress proxy for vertiv.com and tranetechnologies.com. All documents below were read through a text extractor, so **page numbers come from the extracted text and should be checked against the PDF** before anything is quoted.
- The fetch tool only opens links that appear in search results. Because of this, the following maker documents **could not be opened** (they were not bypassed):
  - EVAPCO eco-Air catalogue (www.evapco.com/media/1645012, the EA26MRKT source of the current basis)
  - EVAPCO AT Engineering Data (www.evapco.com/media/338613)
  - Carrier 30XV-17PD product data and the "Free Cooling with MaxCap Advantage" brochure 04-811-50067 (brandportal.carrier.com)
  - YORK YVFA brochures (tyco.widen.net, embed.widencdn.net)
- Two other sources can't be read as text: the YORK YVFA Engineering Guide 201.31-EG1 (docs.johnsoncontrols.com, a JavaScript viewer) and the Güntner documents (myGüntner portal at www.myguentner.com, which appears to need a login).
- Unit conversions are **our calculation**: 1 MBH = 0.29307 kW; 1 nominal tower ton = 15,000 Btu/h = 4.396 kW (EVAPCO's own bulletin 331G prints 5,141 t = 22,596 kW, the same ratio); ft-in to m.
- Area per MW = L × W ÷ capacity. **This is our calculation.**

---

## A. Air-cooled chiller with integrated free-cooling coils (1–2 MW)

### Criteria

| Candidate | C1 integrated FC coils, 1–2 MW | C2 DC / large product | C3 N. America | C4 dims + capacity printed | C5 current; refrigerant |
|---|---|---|---|---|---|
| **Vertiv Liebert AFC (FH3 / FIZ)** | Pass. "oversized free cooling coils"; 1,247–1,924 kW | Pass. Data-centre free-cooling chiller | Pass. NA datasheet; 460V/3ph/60Hz. UL/CSA not stated | Pass. Model-by-model L×W×H and kW at stated conditions | Pass. SL-71060 (R09/24). FH3 uses R513A; FIZ uses R1234ze. **Performance marked "Preliminary data"** |
| **Airedale by Modine TurboChill DCS (TCF)** | Pass. TCF models have free-cooling coils; 985 / 1,600 kW (50 Hz) | Pass. "Data Center Solutions" | Partial. Brochure prints 60 Hz TR values; maker press release says chillers are built at its Rockbridge, VA plant for the data-centre market. No UL/CSA statement found | Pass (50 Hz table) | Pass. Brochure file dated 280925; R1234ze "GWP 1.37" |
| Trane Ascend ACR with direct free cooling | Pass. Option "T = Total Direct Free-Cooling", 165–550 t | Pass | Pass. 60 Hz only; "ETL Listed/Certified to CSA/Conforms to UL" | **Fail.** No kW or rating conditions in text. Overall L/W/H for free-cooling units can't be read (Fig. 11 / Table 15 are "without direct-free cooling"; width and height are in images) | Pass. AC-PRC005E-EN, Jul 2026; R-513A |
| Daikin Pathfinder AWV free cooling | Pass. "Integrated free cooling economizer"; 350–1,985 kW | Pass | ? No 60 Hz / UL text found in CAT 640 | **Fail.** CAT 640 prints no dimensions. IOM 1380 dims are "FOR AWV-C STANDARD UNITS ONLY" | Pass. CAT 640 Sept 2025; R-513A or R-515B |
| YORK YVFA | Pass. "Integrated Free Cooling"; 525–1,750 kW | Pass | Pass. "50 and 60 Hz" in title of 201.31-EG1 | **? Couldn't read.** The engineering guide and brochures can't be opened from here | Product page says "Active"; refrigerant ? |
| Carrier AquaForce 30XV + waterside economizer | **?** Carrier's page lists "09FC Free Cooling with 30XV" as separate Revit families, which suggests a separate 09FC module rather than integrated coils. Not confirmed | Pass | Pass. US site, R-513A | **? Couldn't read** (product data blocked) | 30XV page: R-513A |
| Carrier AquaForce 30XF free cooling | Pass (EU) | Pass | **Fail.** Only EU/Asia pages found | not checked further | – |
| Stulz CyberCool 2 (F models) | Pass. 425–1,389 kW (ESO) | Pass | **Fail.** 60 Hz "option", no NA/UL | Pass. Largest 12,785 × 2,300 × 2,500 mm | **Fail.** Brochure 1100137 V1.1 01-17 (2017) |
| Swegon / Blue Box ZETA Rev HE FC | **Fail.** 36–152 kW | – | No NA mention | – | – |
| Mitsubishi Electric / Climaveneta | Pass (EU/AU free-cooling ranges exist) | Pass | **Fail.** No maker NA / 60 Hz / UL literature found | not checked | – |
| Trane TCA (current basis) | **Fail.** No free-cooling coils (per brief) | – | – | – | – |

### Values for units passing C1–C4

Rating conditions:
- **Vertiv:** "Nominal capacity is based on 95°F ambient temperature; 82-66°F fluid inlet/outlet temperature; ethylene glycol 30%; power supply 460V/3ph/60Hz". This is about 35 °C ambient and 27.8 → 18.9 °C fluid.
- **Airedale:** 20/30 °C water, 35 °C ambient, 100% water, 50 Hz.

Both are warm-water, 35 °C ambient ratings, so the two makers are **broadly comparable**. Glycol (Vertiv) vs. plain water (Airedale) is a remaining difference.

| Unit | Capacity (as printed) | L × W × H (m) | m²/MW (our calc) |
|---|---|---|---|
| Vertiv FH3175 (R513A) | 1924 kW | 13.386 × 2.362 × 2.896 | 16.43 |
| Vertiv FH3160 | 1695 kW | 12.141 × 2.362 × 2.896 | 16.92 |
| Vertiv FH3135 | 1481 kW | 10.846 × 2.362 × 2.896 | 17.30 |
| Vertiv FH3145 | 1606 kW | 12.141 × 2.362 × 2.896 | 17.86 |
| Vertiv FIZ150 (R1234ze) | 1652 kW | 13.386 × 2.362 × 2.896 | 19.14 |
| Vertiv FIZ125 | 1336 kW | 10.846 × 2.362 × 2.896 | 19.18 |
| **Vertiv FIZ135** | **1489 kW** | **12.141 × 2.362 × 2.896** | **19.26** |
| Vertiv FH3120 | 1308 kW | 10.846 × 2.362 × 2.896 | 19.59 |
| Vertiv FIZ145 | 1587 kW | 13.386 × 2.362 × 2.896 | 19.92 |
| Vertiv FIZ115 | 1247 kW | 10.846 × 2.362 × 2.896 | 20.54 |
| Airedale TCF24R24G | 1600 kW (50 Hz); 370 TR at 60 Hz | 14.385 × 2.900 × 2.200 | 26.07 (50 Hz) |
| Airedale TCF13R18K | 985 kW (50 Hz); 280 TR at 60 Hz | 10.550 × 2.844 × 2.200 | 30.46 |

- Median of all 12 units: **19.22 m²/MW**. Range: **16.4–30.5 m²/MW**; Vertiv alone is 16.4–20.5.
- Airedale's 60 Hz TR values: 370 TR is about 1,301 kW (our conversion), which gives 32.1 m²/MW. The brochure doesn't state separate rating conditions for the TR values. Using them doesn't move the median.
- Airedale dimensions: the brochure's table labels are mismatched ("Depth H, Height W, Width L"), so the values were read as L × W × H.

### Proposed basis: Vertiv Liebert AFC FIZ135
- 1,489 kW; 12.141 × 2.362 × 2.896 m; R1234ze.
- **Reason:** FIZ125 and FIZ135 sit equally close to the median (each 0.04 m²/MW away). FIZ135 was chosen because its capacity is near the middle of the tool's 1–2 MW band, and it uses the lowest-GWP refrigerant offered.
- **Caveat:** Vertiv's performance data is marked "Preliminary".

### Sources (A)
- Vertiv, "Vertiv™ Liebert® AFC – Air-cooled free cooling chiller from 900 - 1800 kW", SL-71060 (R09/24). https://www.vertiv.com/49fe65/globalassets/shared/vertiv-liebert-afc_datasheet_en-na.pdf. "Technical Specifications" tables; page number not shown in the extract.
  - FIZ135 printed: "423 (1489)" tons (kW), "478 x 93 x 114 (12141 x 2362 x 2896)".
- Airedale by Modine, TurboChill DCS Sales Brochure (file TurboChill_DCS_Sales_Brochure_280925.pdf). https://www.airedale.com/wp-content/uploads/2025/07/TurboChill_DCS_Sales_Brochure_280925.pdf. No page numbers in the extract.
- Modine press release on the Rockbridge, VA chiller plant: https://www.modine.com/?p=2066 (search result only; not opened).
- Trane, "Ascend™ Air-Cooled Chiller, Model ACR Series C, 150 to 550 Nominal Tons", AC-PRC005E-EN, July 2026. https://elibrary.tranetechnologies.com/public/commercial-hvac/Literature/Product%20Catalog/AC-PRC005E-EN_07102026.pdf. Pages cited: p.8, 13, 14, 15, 19, 26–27, 38–41.
- Daikin Applied:
  - "AWV Air-Cooled Screw Chiller with Free Cooling", CAT 640, Sept 2025. https://tahoeweb.daikinapplied.com/api/general/DownloadDocumentByName/media/Pathfinder%20-%20CAT%20640.pdf
  - IOM 1380, April 2025. https://tahoeweb.daikinapplied.com/api/general/DownloadDocumentByName/media/IOM1380.pdf (p.16–17, 35)
- YORK YVFA:
  - Product page: https://www.york.com/commercial-equipment/chilled-water-systems/air-cooled-chillers/yvfa_ch ("150-500 TR (525-1,750 kW)")
  - Engineering guide 201.31-EG1 (rev 1026) record: https://docs.johnsoncontrols.com/chillers/viewer/document/JXlKDUuMuQqHdzR9GI35uA
- Carrier 30XV technical specifications page: https://www.carrier.com/us/en/commercial/chillers/30xv/technical-specifications.html
- Stulz, CyberCool 2 brochure 1100137 V1.1 01-17. https://www.stulz.de/fileadmin/user_upload/products/Brochures_Manuals/CyberCool_2/CyberCool_2_Broschuere.pdf (p.13, 19–23)
- Swegon ZETA Rev HE FC page: https://www.swegon.com/products-and-services/cooling-and-heating-production/freecooling/freecooling-chillers/zeta-rev-he-fc

---

## B. V-coil dry cooler (1–1.5 MW, liquid-cooled halls)

### Criteria

| Candidate | C1 V-coil, 1–1.5 MW | C2 | C3 | C4 | C5 |
|---|---|---|---|---|---|
| **EVAPCO eco-Air EAW-VD** | Pass | Pass. "Industrial Process (including Data Center)" | Pass. US site; UL Listed control package | Pass in readable docs (2020 US and 2024 EU). The current EA26MRKT catalogue couldn't be opened | US bulletin 270B is 2020; EU bulletin 270-E 0824 (2024) is current. EA26MRKT (2026) per brief, not re-read |
| BAC TrilliumSeries Dry Cooler (TDFS) | **Fail on size.** "Up to 10,000 MBH" (about 2.93 MW). V-coil not stated | Pass. "critical cooling applications" | Pass. US maker; "LISTED" mark. The cUL reading differed between two extracts | Partial. One capacity ("up to") for the whole model group, not per model | Pass. BTDFS/20240927 |
| Güntner GFD V-shape Vario | Pass. 75–2,040 kW | Pass. "IT server cooling" | Pass. en-us page; "UL safety mark" | **? Couldn't read.** No dims on page; data in the myGüntner portal | ? |
| LU-VE / Alfa V Mega VXX3 | Pass. 200–2,000 kW | Pass. "cooling for data centers" | Partial. EC fans 50–60 Hz; LU-VE US plant (Jacksonville, TX) being expanded for dry coolers (press release, 3 Mar 2025). No UL | **Fail.** No dims; leaflet not linked | ? |
| Kelvion V-Shape Dry Cooler | Pass. 6–2,140 kW | ? | Partial. 50/60 Hz fans; no NA/UL | **Fail.** Dimension ranges not tied to models | Version 01, 04/25 |
| Thermokey | ? | ? | No NA found | Only aggregator (DirectIndustry) copies found, which are not allowed | – |
| Johnson Controls | **Fail.** No named dry cooler | – | – | – | – |
| Vertiv | **Fail.** Liebert LVC is a refrigerant condenser, not a fluid dry cooler | – | – | – | – |
| EVAPCO EAW-DD Double Stack | **Fail on size.** Up to 7,830–8,330 MBH (2.3–2.4 MW) | Pass | Pass | Partial. No height printed | EADS24MRKT, 2024 |

### Values

| Unit | Capacity (as printed) and conditions | L × W × H (m) | m²/MW (our calc) |
|---|---|---|---|
| EVAPCO EAW-VD9120ZA, EA26MRKT 2026 (values **as supplied in brief; not re-read**) | 4461 MBH = 1,307 kW; conditions ? | 12.04 × 2.38 × 2.88 | 21.92 |
| EVAPCO EAVWD9120ZA, US bulletin 270B (2020) p.13 | 4,680 MBH = 1,372 kW. "Nominal Capacity 110°F-100°F at 92°F dry bulb temp." | 12.011 (39'4-7/8") × 2.384 (7'9-7/8") × ? | 20.88 |
| EVAPCO EAW-VD9120ZA, EU bulletin 270-E 0824 p.12 | 2183 kW. "Nominal Capacity 40°C-35°C at 25°C dry bulb temp." | 12.036 × 2.381 × ? | 13.13 (**not comparable**: cool European rating) |
| BAC TDFS1238N (reference only; fails C1 size) | "Up to 10,000 MBH" = 2,931 kW. 115°F EWT / 105°F LWT / 95°F db | 11.608 (38'-1") × 3.531 (11'-7") × 5.969 (19'-7") | 13.99 |

### Proposed basis: keep EVAPCO EAW-VD9120ZA
- **Reason:** It is the only V-coil dry cooler in the 1–1.5 MW band whose maker prints model-by-model capacity and dimensions in readable North American literature. It is kept because the others couldn't be checked, not because it won a comparison.
- **No cross-maker range can be given.** BAC's larger unit (about 14 m²/MW) is rated at a warmer, easier condition (115/105 °F at 95 °F). Its size and rating differ too much to treat it as a like-for-like comparison.
- **Action:** confirm the EA26MRKT rating conditions for 4461 MBH. The tool's design water is 30–45 °C.

### Sources (B)
- EVAPCO:
  - EAW-VD product page: https://www.evapco.com/node/42513
  - Bulletin 270B "Closed Circuit Coolers – Dry Cooling" ©2020 (print code 5-20). https://www.evapco.com/sites/evapco.com/files/2020-05/eco-Air-Coolers%20270B%20Dry%20Cooling.pdf (p.11–15)
  - EVAPCO Europe bulletin 270-E 0824. https://evapco.eu/media/771822 (p.10–15)
  - EADS24MRKT ©2024. https://evapco.com/media/1645013 (p.6–7)
- BAC TrilliumSeries Dry Cooler:
  - BTDFS/20240927: https://baltimoreaircoil.com/download_api_endpoint/6271/TSFS_brochure_20241001.pdf
  - BTDFS/20240102: https://baltimoreaircoil.com/download_api_endpoint/6306/tdfs_brochure_web.pdf
- Güntner: https://guntner.com/en-us/products/dry-coolers/v-shape-vario-dc-nla and https://guntner.com/products/dry-coolers/v-shape-vario-dc
- LU-VE:
  - https://lu-ve.com/product/liquid-coolers/v-shape/hi-duty/alfa-v-mega-vxx3/
  - https://lu-ve.com/news/luve-global-data-center-cooling-technology-made-in-usa/
- Kelvion, "Kelvion Select RT – V-Shape Dry Cooler", Version 01 04/25. https://d2xjeen3zaup4u.cloudfront.net/asset/767398133948/document_7i1fi0k3uh1ldfq08sm75jqk5l/PF_HRR_DryCooler_VShape_Range_EN.pdf (identified as a Kelvion document; hosted on a CDN)
- Johnson Controls: https://www.johnsoncontrols.com/industries/data-centers/solutions/thermal-management

---

## C. Adiabatic (hybrid) cooler

### Criteria

| Candidate | C1 | C2 | C3 | C4 | C5 |
|---|---|---|---|---|---|
| EVAPCO eco-Air EAW-VA (adiabatic V) | Pass | Pass. "Industrial Process (including Data Center)" | Pass. UL Listed control package | **Partial.** Per-model capacity is the **dry** rating only. Bulletin 270B says adiabatic capacity "depends on the ambient" (adiabatic rating point "dry bulb 102°F"). Adiabatic width is printed: 2765 mm (EU) / 9' 7/8" (US). Height ? | 270B 2020 / 270-E 0824. Current catalogue unreadable |
| BAC TrilliumSeries Adiabatic (TRF) | Pass (16 models; largest TRF-1038N, 40'-9" long) | ? Data centres not mentioned in brochure | Pass. US maker; "LISTED" / "C US" marks | **Fail.** No capacity printed; L/W/H readable only for the smallest model | BTRF/20240531 |
| Güntner V-shape Vario hydroBLU | Pass. GFD 200–1,000 kW | ? | Pass. en-us page | **? Couldn't read** (myGüntner portal) | ? |
| Thermokey / Kelvion adiabatic | ? | ? | No NA found | No maker document read | – |

### Values

No adiabatic unit passes C4 with a printed adiabatic capacity.

The only printed pairing is the EVAPCO 8'-wide unit: dry capacity (4,680 MBH, 110–100 °F at 92 °F db, 2020) with adiabatic width 2.765 m and length 12.011 m. That gives **24.2 m²/MW at the dry rating** (our calc). This is pessimistic, because adiabatic operation raises capacity, and EVAPCO does not print by how much.

### Proposed basis: keep EVAPCO eco-Air adiabatic V (8'-wide, 9120 size), provisional
- **Reason:** It is the only maker found that prints dimensions in North American literature. The m²/MW is pessimistic because it rests on the dry rating.
- **No median or range is possible.** No other maker printed both capacity and dimensions.
- **Action:** read EA26MRKT or ask EVAPCO (Spectrum selection) for an adiabatic rating at Vancouver and Edmonton design conditions.

### Sources (C)
- EVAPCO EAW-VA page: https://www.evapco.com/node/42519
- EVAPCO bulletins 270B and 270-E 0824 (as in B).
- BAC, TrilliumSeries Adiabatic Cooler brochure, BTRF/20240531. https://baltimoreaircoil.com/download_api_endpoint/6165/TRF_brochure_20240624.pdf
- Güntner hydroBLU: https://guntner.com/en-us/products/dry-coolers/v-shape-vario-hydroblu-dc

---

## D. Factory-assembled induced-draft cooling tower cell (1.3–6 MW)

### Criteria

| Candidate | C1 | C2 | C3 | C4 | C5 |
|---|---|---|---|---|---|
| **BAC Series 3000 (S3E)** | Pass. Single cells 293–1,394 nominal t (1.29–6.13 MW, our calc) | Pass. Large HVAC/process; 171–1,446 t | Pass. US maker, imperial literature. 60 Hz not stated | Pass. Model-by-model nominal tons, L, W, H (PAH Vol. VI pp. C16–C17) | Pass. Engineering data file dated 2023-10-20; spec 2026-10-19 |
| **SPX Marley NC (steel)** | Pass. Single cells about 318–1,400 nominal t | Pass. "CTI Certified" sound data | Pass. US maker | Pass, with gaps. Width for NC8409–NC8414 taken from the support table (p.24); some heights not printed | Pass. TECH-NC-26, issued 3/2026 |
| Marley NC Everest (NC8422) | Pass on size. 1,311–2,189 t | Pass | Pass | Partial. 22'-5" × 29'-6" × 27'-1"; "nominal" basis for the range not printed | Pass. NCE-HVAC-26, 2/2026 |
| EVAPCO AT | Pass. 33–5,141 t | Pass. "Industrial Process (including Data Center)"; CTI certified | Pass | **Fail / ? couldn't read.** Engineering data blocked; the readable 2016 bulletin 331G has no extractable model table | Fail for readable doc (2016) |

Rating basis (both makers):
- **BAC:** nominal ton = cool 3 US gpm from 95 °F to 85 °F at 78 °F wet bulb.
- **Marley:** "95°F HW, 85°F CW, 78°F WB, 3 gpm/ton". The bases are the same, so the units are **comparable**.

### Values (140 single-cell rows; full list in towers.json)

| Box | Nominal t (as printed) | L × W × H (m) | m²/MW range (our calc) |
|---|---|---|---|
| BAC S3E-8518 | 293–484 | 2.591 × 5.512 × 3.00–3.81 | 6.71–11.09 |
| BAC S3E-1020 | 384–530 | 2.997 × 6.121 × 3.30–3.71 | 7.87–10.87 |
| BAC S3E-1222 | 438–1,147 | 3.607 × 6.579 × 3.33–6.63 | 4.71–12.32 |
| BAC S3E-1424 | 621–1,394 | 4.267 × 7.341 × 3.76–6.93 | 5.11–11.47 |
| Marley NC8403 | 329–448 | 2.559 × 5.537 × 3.64 | 7.20–9.80 |
| Marley NC8405 | 318–566 | 3.016 × 6.071 × 3.64 | 7.36–13.10 |
| Marley NC8407 | 320–690 | 3.626 × 6.401 × ? | 7.65–16.50 |
| Marley NC8409–NC8414 | 417–1,400 | 3.626 or 4.235 × 6.833* × ?, 4.88 or 5.74 | 4.70–15.79 |

\* Width from the support table, not the data table.

- Median of all 140 rows: **7.78 m²/MW**. Range: **4.7–16.5 m²/MW**. BAC alone: median 7.02, range 4.7–12.3. Marley alone: median 8.02, range 4.7–16.5.

### Proposed basis: BAC Series 3000 S3E-1222-07R (keep the current maker)
- Specs: 690 nominal t ≈ 3,033 kW (our calc); 11'-10" × 21'-7" × 12'-9" = 3.607 × 6.579 × 3.886 m; **7.82 m²/MW**.
- **Reason:** It is the row closest to the median of both makers, its capacity sits in the middle of the tool's 1.3–6 MW band, and every dimension is printed in one current table.
- The tool range should run **4.7–16.5 m²/MW**.
- The source doesn't say which plan dimension is L and which is W. Orientation should be checked on the BAC drawing.

### Sources (D)
- BAC:
  - Series 3000 Engineering Data, Product & Application Handbook Vol. VI. https://baltimoreaircoil.com/download_api_endpoint/6026/C015_PAHBvi_3000_ED_20231020.pdf (pp. C16–C17; S3E-1222-07R row: "690 / 11'-10" / 21'-7" / 12'-9"")
  - Product page: https://baltimoreaircoil.com/products/cooling-towers/series-3000-cooling-tower
- SPX Cooling Tech:
  - "NC Steel Cooling Tower – Engineering Data", TECH-NC-26, issued 3/2026. https://spxcooling.com/wp-content/uploads/TECH-NC-26.pdf (pp. 2, 5, 7, 9, 11, 12, 24, 26)
  - NC Everest, NCE-HVAC-26, issued 2/2026. https://spxcooling.com/wp-content/uploads/NCE-HVAC-26.pdf
- EVAPCO:
  - AT page: https://www.evapco.com/node/103
  - Bulletin 331G ©2016: https://www.evapco.com/sites/evapco.com/files/2018-06/ATSeries_Catalog_2016.indd_.pdf (p.3)
  - CT22MRKT ©2022: https://evapco.com/media/1166727

---

## Summary of bases

| Type | Proposed basis | m²/MW | Range across passing units |
|---|---|---|---|
| A. Free-cooling chiller | Vertiv Liebert AFC **FIZ135** (replaces Trane TCA) | 19.3 | 16.4–30.5 |
| B. V-coil dry cooler | EVAPCO EAW-VD9120ZA (unchanged; only passing unit) | 20.9–21.9 | none (one maker) |
| C. Adiabatic cooler | EVAPCO eco-Air adiabatic V, 8'-wide 9120 (provisional) | 24.2 at dry rating | none |
| D. Cooling tower cell | BAC S3E-1222-07R | 7.8 | 4.7–16.5 |
