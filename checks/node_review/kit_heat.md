# Heat-rejection kit: geometry from maker documents

Compiled 28 Oct 2026. Primary maker documents only. "?" means the value is not printed in any document I could read.

**How the documents were read:** PDFs were read as extracted text through a web fetch tool. Direct download was blocked by the sandbox proxy, so drawings could not be viewed as images. Values printed only inside figures may therefore be missing. Where a label's meaning was unclear, I say so.

**Units:** 1 in = 0.0254 m; 1 ft = 0.3048 m.

## Summary table

| Item | 1. V-type dry cooler (EVAPCO eco-Air V, EAVWD9120ZA) | 2. Air-cooled chiller (Trane TCAA330 / TCAB850) | 3. Adiabatic cooler (BAC TrilliumSeries TRF-1038) | 4a. Tower, small (BAC S3E-8518-05L) | 4b. Tower, large (BAC S3E-1424-14W) |
|---|---|---|---|---|---|
| Length | 39'-4-7/8" = **12.01 m** [E1 p.13] | 478 in = **12.14 m** / 672 in = **17.07 m** [T1] | 12415 mm = **12.42 m** [B4] | L 8'-6" = **2.59 m** [B1 p.C16] | L 14'-0" = **4.27 m** [B1 p.C17] |
| Width | Drawing label 7'-9-7/8" = **2.38 m** (dry; the asterisk note gives adiabatic width 9'-0-7/8" = 2.77 m) [E1 p.13] | 88 in = **2.24 m** / 120 in = **3.05 m** [T1] | 2985 mm = **2.99 m** [B4] | W 18'-1" = **5.51 m** | W 24'-1" = **7.34 m** |
| Height | **? (unclear)**. Label 9'-5-1/2" = 2.88 m is on the drawing but not identified as height [E1 p.13] | 106 in = **2.69 m** (both) [T1]. IOM: TCAA330CT "102 to 110" in = 2.59–2.79 m "depending on fan type" [T2 p.9] | 2972 mm = **2.97 m** [B4] | H 9'-10" = **3.00 m** | H 22'-5" = **6.83 m** |
| Fans (count) | 20, "Twin Fan" model [E1 p.13] | 18 / 36, EC fans [T1] | 18 [B4] | ? per cell (1-piece fan guard [B3]) | ? per cell (4-piece fan guard [B3]) |
| Fan rows | ? ("Twin Fan, 8' Wide Models"; rows not stated) | ? | ? | ? | ? |
| Fan diameter | ? | ? | ? | ? | 11' to 13' = 3.35–3.96 m (optional Whisper Quiet fan, 1424-12x/13x/14x) [B3 Table 2 p.11] |
| Fan guard / stack | ? | "Standard Animal and Coil Guards" [T2 p.7] | ? | "Fan Guard Assembly", "Fan Cylinder" [B5]; optional VR stack (conical) [B2] | same as 4a |
| Coil arrangement | "V Coil"; "Optimized coil angle" (angle ?) [E1] | Coil type "V = V-Coil"; 18 coils (TCAA330), each 80 in × 50 in = 2.03 × 1.27 m, 5 rows, 14 fins/in [T2 p.6, p.9] | ? | n/a (fill: BACross III upper/lower fill with integral drift eliminators) [B5] | same |
| Legs / base | Flat-coil models only: "Multiple Leg Heights Available". V base width (dry) 7'-3-3/4" = 2.23 m; adiabatic base 9'-0-3/4" = 2.76 m. Supported on I-beams running full length [E1 p.22–23] | Base frame / base rail; "support along the full perimeter or at least along the entire length" [T2 p.14]. Leg height ? | ? | Not legged. Cold-water basin sits on steel supports by others; height of supports ? | same |
| Side panels / louvres | "(2) INSPECTION PANEL" (V-coil models) [E1] | Side panels (mentioned in rigging) [T2 p.13]; louvres ? | Optional pad doors; optional internal partitioning panels per fan [B6] | "Air Intake Louvers" [B3 Fig. 1]; FRP casing panels [B5] | same |
| Adiabatic pads | Optional, V-coil models only: "fibrous pad located in front of the coil" / "on the air-on side of the coil" [E1, E2]; 150 mm thick [E3]; faces ? | none (Trane: "without relying on glycol or separate free-cooling coils" [T3]) | "Thick pads"; faces ?, thickness ? [B6, B7] | n/a | n/a |
| Tower air inlets | n/a | n/a | n/a | "dual air intake units" [B8 p.J77]; drawing shows "Air Intake" on two faces (which faces ?) | same |
| Fan discharge | top ("fans located on top of the unit") [E1] | ? | ? | Top, through fan cylinder [B5, B8] | same |
| Cold-water basin | n/a | n/a | ? | Water level: overflow 14-1/8 in = 0.36 m; operating 8-3/4 in = 0.22 m (inside basin). Basin outside height ? [B3 Table 1] | overflow 21 in = 0.53 m; operating 9-3/4 in = 0.25 m [B3] |
| Access | Inspection panels (2) | ? | "Large access doors" [B7] | "Access Door Both Ends" [B1 p.C15]; internal walkway [B5]; ladders, platforms and handrails optional [B2] | same |
| Piping side | "(2) INLETS", "(2) OUTLETS" (side ?); terminal box "on the end panel opposite coil connections" [E1] | ? (piping figure not readable as text) [T2 p.15] | Fluid inlet, outlet, water supply, overflow, drain shown (side ?) [B4] | "Standard Top Inlet" + "Standard Side Outlet"; make-up valve "at the connection end" [B1 p.C23, B3] | same |
| Capacity | 4680 MBH = 1.37 MW (manufacturer rating, 110→100 °F at 92 °F dry bulb) [E1 p.13] | 300–400 T / 650–850 T (manufacturer, "All values are estimated") [T1] | ? | 293 nominal tons (manufacturer) [B1] | 1,394 nominal tons [B1] |

## Notes per unit

### 1. V-type dry cooler
- **Chosen model:** EVAPCO EAVWD9120ZA (Twin Fan, 8' Wide, EC). It is the only 39'-4-7/8" (12.0 m) model I could read near 1.2 MW.
- **Same-length alternative:** EAVWD9120PA (7' wide, 20 fans, 3971 MBH = 1.16 MW). Its drawing labels are *7'-2-1/2" (2.20 m; adiabatic 8'-9-5/8" = 2.68 m) and 7'-11" (2.41 m).
- **Height is unconfirmed.** The text extraction does not say what the 9'-5-1/2" (p.13) and 7'-11" (p.12) labels measure. The tool's 2.9 m height would match 9'-5-1/2" only if that label is the height. I cannot confirm this without seeing the drawing, so treat 2.9 m as unverified.
- **Thermokey:** no current dimension sheet found on a maker site.
  - Data Centre catalogue (maker content, read via the DirectIndustry catalogue host; date ?): "Ø 800, 900, 1000 mm", "Modular design, 8-20 fans", "290 to 2219 kW". No L/W/H.
  - thermokey.com could not be fetched (blocked by the fetch tool).
- **Alfa Laval VDM:** single-row and small (largest VDM 806: 6635 × 1150 × 1451 mm, 800 mm fans) [AL1, AHE00072EN, ed. 1704]. Not a 12 m unit.
  - Alfa-V VDD (double V, 800/910/1000 mm fans, up to 8 fan pairs) maxes at 10800 × 2230 × 2280 mm (L × W × H) [AL2, PCT00067EN, ed. 0703]. That leaflet is old and was read via the DirectIndustry host.
  - The current LU-VE VDD leaflet (31800522EN-00) has unreadable font encoding.
  - SOLAR Max G: fans 914 or 1240 mm, 2–12 fans; L up to 10700 mm; W/H not printed [AL3, AHE00081EN, ed. 1704].
- **Güntner V-shape VARIO:** fans Ø 800 / 900 mm; GVD/GFD 4–18 fans; up to "2x12 fans"; hydroBLU pads "150mm" [G1].
  - Dimension sheets sit behind the myGüntner login, so they were not read.

### 2. Trane TCA
- The overall sizes are confirmed:
  - TCAA330: 478 × 88 × 106 in.
  - TCAB850: 672 × 120 × 106 in.
  - Trane footnote: "*All values are estimated."
- **Correction: no free-cooling coils.** Trane's product page says TCA uses a "compressor-assisted economizer ... without relying on glycol or separate free-cooling coils" [T3]. The IOM says "Free Cooling option is no longer available" [T2 p.22]. The tool's label "with free-cooling coils" is not supported for TCA.
- **Not printed in any document read:** fan diameter, fan rows, and connection side.
- The rigging, clearance and piping figures in the IOM (Figs. 1–3) could not be read as text.
- **Clearances:** 72 in (1.83 m) on sides A, C and D. Side B needs 72 in plus barrel length, with no obstructions above the chiller [T2 p.13].
- The IOM covers TCAA models only, not TCAB.

### 3. Adiabatic cooler
- **Chosen model:** BAC TRF-1038 (TRF 1038E-C80E D77E/M77E/Q77E).
  - Engineering-data page (EU), last update 18/01/2022.
  - **Column mapping is uncertain.** The extracted row is "18 | 11855 | 9540 | 9540 | 12415 | 2985 | 2972 | …". I mapped it to the headers in order: Nr. of Fans, Oper. weight, Ship. weight, Heaviest section, L, W, H. The order matches the header list, but the layout was flattened in extraction.
- Under that mapping, the tool's 2.8 m width and 2.5 m height do not match TRF-1038 (2.99 m wide, 2.97 m high).
- **EVAPCO eco-Air adiabatic:** the bulletin printed for the tool (270B) is the same document as unit 1. The 8' wide V model has an adiabatic width of 9'-0-7/8" = 2.77 m, which is close to the tool's 2.8 m. Its height is "?" as noted under unit 1.
- **Not stated in BAC TRF documents:** coil shape, pad faces, pad thickness and fan diameter.

### 4. BAC Series 3000
- **Sizes confirmed:**
  - Small: S3E-8518-05L, 8'-6" × 18'-1" × 9'-10".
  - Large: S3E-1424-14W, 14'-0" × 24'-1" × 22'-5" (6.83 m, matching the tool's 6.8 m).
  - Note: BAC's "L" is the short side (8'-6", 14'-0") and "W" is the long side.
- **Dimension "A":** printed (8'-8" = 2.64 m; 20'-10" = 6.35 m) but not defined in the text.
- **Height can vary:** "Models shipped with an optional gear drive or Low Sound Fan may have heights up to 10.5" greater than shown" (+0.27 m).
- **Connection table (p.C22), raw values:** columns "Easy Connect / Top Inlet / Outlet / Remote Sump" with dimensions B, C, D, F. The values cannot be mapped to columns from the text.
  - 8518-05x: 5'-9" 3'-9" 9" 6'-6" 8" (2) 6" 8" 10"
  - 1424-14x: 15'-9" 4'-1" 10" 8'-10" 14" (2) 10" 14" 20"
- **Crossflow:** "Crossflow // Axial Fan // Induced Draft" [B9].
- "Air Intake Louvers"; "dual air intake units" [B8]. Which two faces take air is not stated in text; the layout drawing shows "Air Intake" twice.

## Sources

| Ref | Document | Maker | Date / version | URL |
|---|---|---|---|---|
| E1 | eco-Air Series Closed Circuit Coolers, Bulletin 270B (pp.11–15, 22–23) | EVAPCO | ©2020, print code 2M/5-20/DGD | https://www.evapco.com/sites/evapco.com/files/2020-05/eco-Air-Coolers%20270B%20Dry%20Cooling.pdf |
| E2 | eco-Air Series bulletin 1100 (condensers; pad "on the air-on side of the coil") | EVAPCO | ©2017, 2M/09-17 | https://evapco.eu/media/130395 |
| E3 | eco-Air Series Design & Construction Features, MCE 01-2019 ENG | EVAPCO Europe | 2019 (?) | https://evapco.eu/media/290432 |
| T1 | TCA-SLB001-EN, Air-Cooled Magnetic Bearing Chiller (General Data) | Trane | 05/07/2026 (also 03/16/2026 version) | https://elibrary.tranetechnologies.com/public/commercial-hvac/Literature/Sales/TCA-SLB001-EN_05072026.pdf |
| T2 | TCA-SVX001A-EN IOM, Model TCAA | Trane | Aug 2025 | https://elibrary.tranetechnologies.com/public/commercial-hvac/Literature/Installation%20Operation%20and%20Maintenance/TCA-SVX001A-EN_08312025.pdf |
| T3 | Air-Cooled Magnetic Bearing Chiller product page | Trane | accessed 28 Oct 2026 | https://www.trane.com/commercial/north-america/us/en/products-systems/chillers/data-center-chillers/oil-free-magnetic-bearing.html |
| B1 | Series 3000 Engineering Data, Product & Application Handbook Vol. VI (pp.C15–C27) | BAC | file dated 20231020 | https://baltimoreaircoil.com/download_api_endpoint/6026/C015_PAHBvi_3000_ED_20231020.pdf |
| B2 | Series 3000, PAHB Vol. V (pp.B8–B43) | BAC | 2012 footer; file 20150914 | https://baltimoreaircoil.com/download_api_endpoint/536/b8_ct_s3000_20150914.pdf |
| B3 | Series 3000 Operation & Maintenance Manual, M244/7-A-XE | BAC | file R6.0 20230314 | https://baltimoreaircoil.com/download_api_endpoint/5765/RGOM300E01_R6.0_20230314_0.pdf |
| B4 | TRF-1038 Engineering data (web-generated PDF) | BAC Europe | last update 18/01/2022 | https://baltimoreaircoil.eu/en/node/18344/pdf |
| B5 | Series 3000 Combined Parts Map | BAC | 20220405 | https://baltimoreaircoil.com/download_api_endpoint/5223/Series3000_Combined_PartsMap_20220405.pdf |
| B6 | TrilliumSeries adiabatic cooler TRF brochure, STRF v10 EN | BAC International | ©2026 | https://baltimoreaircoil.eu/sites/default/files/uploads/media/document/BAC_TRF_STRF_EN.pdf |
| B7 | TrilliumSeries Adiabatic Cooler brochure, BTRF/20221101 | BAC | ©2023 | https://www.BaltimoreAircoil.com/download_api_endpoint/6021/TRF_brochure_20230928.pdf |
| B8 | Layout Guidelines, PAHB Vol. VI (pp.J74–J93) | BAC | 202602 | https://baltimoreaircoil.com/download_api_endpoint/6692/J74_PAHBvi_LayoutGuidelines_202602.pdf |
| B9 | Series 3000 product page | BAC | accessed 28 Oct 2026 | https://baltimoreaircoil.com/products/cooling-towers/series-3000-cooling-tower |
| AL1 | Alfa-V Single Row VDM leaflet, AHE00072EN | Alfa Laval | ed. 1704 | https://www.alfalaval.com/globalassets/documents/products/heat-transfer/finned-coil-air-heat-exchangers/product-leaflets/erc00296en.pdf |
| AL2 | Alfa V 800/910/1000 mm Dry Cooler VDD/VDD6, PCT00067EN (DirectIndustry-hosted copy) | Alfa Laval | ed. 0703 | https://pdf.directindustry.com/pdf/alfa-laval/alfa-v-800-910-1000-mm-dry-cooler-vdd-vdd6/16602-132742.html |
| AL3 | SOLAR Max G leaflet, AHE00081EN | Alfa Laval | ed. 1704 | https://www.alfalaval.com/globalassets/documents/products/heat-transfer/finned-coil-air-heat-exchangers/product-leaflets/erc00139en.pdf |
| G1 | V-shape VARIO brochure | Güntner | date ? | https://cms.guntner.com/volumes/files/Guntner-V-shape-VARIO.pdf |
| K1 | Data Centre Cooling Solutions catalogue (DirectIndustry-hosted copy) | Thermokey | date ? | https://pdf.directindustry.com/pdf/thermokey/data-centre-cooling-solutions/17567-1007131.html |

**Not read:**
- evapco.com/media/1645012 ("eco-Air Series Dry & Adiabatic Coolers" catalogue, the likely source of current V-coil heights): blocked by the fetch tool.
- myGüntner documents: login required.
- thermokey.com: blocked by the fetch tool.
- BAC S3E spec (.rtf): came through as binary and could not be read.
