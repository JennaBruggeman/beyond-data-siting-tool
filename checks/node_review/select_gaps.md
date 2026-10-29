# Equipment selection, follow-up: second makers (Beyond Data, GP1)

Searched 29 Oct 2026. I used maker documents only. Values are as printed. "?" means the value is not printed. Anything marked "our calculation" is derived by us, not printed. Unit conversions are ours: 1 MBH = 0.29307 kW, 1 in = 25.4 mm.

How the documents were read: plain download from maker sites was blocked by this session's network proxy, so every document was read through a web-fetch text extractor. Page numbers are given only where the extractor saw them. Check the key rows against the PDF before citing.

---

## 1. V-coil dry cooler, about 1–1.5 MW, about 12 m long (dry and adiabatic)

### Current basis (from earlier study)
- EVAPCO eco-Air EAW-VD9120ZA: 12.04 × 2.38 m, 2.88 m high, 20 fans
- Capacity: 4461 MBH at 110→100 °F water, 92 °F dry bulb

### New: SPX Cooling Tech, Marley OlympusV adiabatic fluid cooler, PASS (with caveats)

**Document A:** "OlympusV™ Adiabatic Fluid Cooler engineering data"
- Number and date: TECH-OLYAD-26, "ISSUED 3/2026"
- URL: https://spxcooling.com/wp-content/uploads/TECH-OLYAD-26.pdf
- Page: no page numbers printed. The two-fan-wide table is the second table.
- Model rows as printed:
  - VWS20: 20 fans, Heat Rejection **4,983 MBH**, fan motor 100 hp (74.6 kW), 354,200 CFM, Length **41'-4 9⁄16"**, operating weight 32,420 lb
  - VWS29: 18 fans, **4,668 MBH**, Length **37'-3 1⁄2"**, operating weight 29,510 lb
- Note 3: "Heat Rejection while operating dry at 115°F-105°F-95°F."
- Note 4: "Performance is certified under CTI Standard 201 program in dry operation."
- Note 1: "Use this bulletin for preliminary layouts only."
- Width and height: the table header shows "9'-6"" and "9'-11 7/16"" next to the drawing, but the extracted text does not say which is which. For that reason, W and H below come from Document B.
- Adiabatic capacity: **?** No adiabatic (wet) rating is printed.

**Document B:** "MARLEY OlympusV Adiabatic Fluid Cooler" brochure
- Number and date: OLYMPUSV-26, "ISSUED 1/2026"
- URL: https://spxcooling.com/wp-content/uploads/OLYMPUSV-26.pdf
- Two Fan Wide as printed:
  - "Number of Fans 4 – 20 fans"
  - "Nominal Width … 9.5 ft"
  - "Nominal Length … 8.7 ft – 41.4 ft"
  - "Nominal Height … 10 ft"
  - "Heat Rejection* … 704 - 5,194 MBH", with "*Operating dry at 115ºF - 105ºF - 95ºF"
- The 5,194 MBH maximum here does not match the 4,983 MBH in the Document A table. Document A's per-model value is used.
- UL: "Conforms to UL STD 60335-1 60335-2-40"

**V-coil:** the product page says the "V" in the name "references the coil pattern of adiabatic systems" (https://spxcooling.com/?p=25823). The documents do not show a coil drawing.

**Criteria:**
- Data-centre use: not named. Marketed for "HVAC and industrial systems".
- Size: VWS20 fits (about 1.46 MW, 12.6 m long).
- North America: US maker, UL and CTI.
- Maker document with dimensions and rating: yes.
- Date: 2026.

**Dry version:** OlympusV is an adiabatic unit, but its printed and CTI-certified rating is for dry operation. It can therefore stand as a second dry-rated V-coil data point. It is not a separate dry-only product.

### Partial: BAC TrilliumSeries TRF (adiabatic), FAIL on capacity
- Document: TRF brochure, "BTRF/20240531" (©2024 Baltimore Aircoil Company)
- URL: https://baltimoreaircoil.com/download_api_endpoint/6165/TRF_brochure_20240624.pdf
- Printed: TRF-1038N-C80Fx77E has 18 fans and a length of 40'-9".
- Capacity: **?** Not printed.
- Height and width did not extract cleanly.
- Earlier BAC EU reading: 12.415 × 2.985 × 2.972 m.
- Older TrilliumSeries brochure (©2020): https://baltimoreaircoil.com/download_api_endpoint/1938/trillium_brochure_20200327.pdf
  - Prints tons only as ranges "covering NH3, HFC, CO2 and H2O". Not usable.

### Partial: Kelvion "Select RT" V-shape dry cooler, FAIL on model data
- Document: range sheet "V-SHAPE DRY COOLER", "Version 01", "04/25", www.kelvion.com
- URL: https://d2xjeen3zaup4u.cloudfront.net/asset/767398133948/document_7i1fi0k3uh1ldfq08sm75jqk5l/PF_HRR_DryCooler_VShape_Range_EN.pdf
  - The host is Kelvion's asset CDN, inferred because the document is Kelvion-branded.
- Printed:
  - Capacity: "6 kW - 2140 kW" at "tA1= 25°C | tL1= 40°C | tL2= 35°C"
  - Length: "2400 - 13200 mm"
  - Fans: "1 - 22 pcs", "50/60 Hz"
  - Adiabatic: "Adiabatic system" is listed as an option
- No per-model table, so capacity cannot be matched to dimensions.

### Other dry-cooler makers tried, FAIL
- **Güntner (guntner.com/en-us):** V-shape VARIO (with and without hydroBLU) and COMPACT pages give capacity ranges only, e.g. GFD hydroBLU "200 - 1,000" kW. No dimensions. Documents sit behind the myguentner.com portal (login, not attempted). The "Guntner-V-shape-VARIO.pdf" brochure (cms.guntner.com) gives "up to 2,600kW in dry operation", 4–24 fans, and no model dimensions.
- **LU-VE Alfa V Mega VXX3 (lu-ve.com):** "200 kW up to 2 MW" (EN1048). No dimensions on the page. Leaflet links were not exposed to the reader. AC fans are 50 Hz only; EC fans are 50–60 Hz.
- **SPX Recold V Tech (RECOLD-VA-17, 12/2017):** range only, and too old.
- **Vertiv Liebert drycoolers:** the range tops out at 525 kW (too small). The LVC V-shape is a condenser and the page did not load in the region.
- **Airedale, Thermokey, Daikin Applied, Johnson Controls:** no maker-hosted model table found. Thermokey catalogues were found only on DirectIndustry (a hosting site, not used).

### Comparison (dry rating basis)

| Maker / model | Rating (as printed) | Capacity | L × W × H (m) | Footprint m² | kW/m² (our calc.) | m²/MW (our calc.) |
|---|---|---|---|---|---|---|
| EVAPCO EAW-VD9120ZA (basis) | 110→100 °F water, 92 °F DB | 4461 MBH (1307 kW, our conv.) | 12.04 × 2.38 × 2.88 | 28.7 | 45.6 | 21.9 |
| SPX Marley OlympusV VWS20 | dry, 115-105-95 °F (CTI 201) | 4,983 MBH (1460 kW, our conv.) | 12.61 × 2.90 (nom.) × 3.05 (nom.) | 36.5 | 40.0 | 25.0 |
| SPX Marley OlympusV VWS29 | dry, 115-105-95 °F | 4,668 MBH (1368 kW, our conv.) | 11.37 × 2.90 (nom.) × 3.05 (nom.) | 32.9 | 41.6 | 24.1 |
| BAC TRF-1038 (adiabatic) | ? | ? | 12.415 × 2.985 × 2.972 (EU page, earlier) | 37.1 | ? | ? |
| Kelvion V-shape | 25 °C air, 40→35 °C | 6–2140 kW range | 2.4–13.2 m long range | ? | ? | ? |

The rating conditions differ (EVAPCO 18 °F ITD, SPX 20 °F ITD), so the ratios are not like-for-like.

**Reading:** with two makers, EVAPCO is about 14% denser per m² than SPX. "Middle" cannot be judged from two points. The BAC footprint (37.1 m²) is close to SPX's (36.5 m²), so EVAPCO is the most compact of the three. If BAC capacity is similar, EVAPCO sits at the compact end.

---

## 2. Water-to-water heat pump, district heating, 1–3 MW, 70–90 °C

### Current basis
- JCI Sabroe DualPAC 712-W: 5.5 × 3.0 × 2.1 m
- 1494 kW at 50→70 °C, source 30→20 °C
- 1381 kW at 70→90 °C

### New: GEA RedAstrum and RedGenium (ammonia, R717), PASS

**Document:** "GEA-HRT-RED HEAT PUMPS 7757-3000-017 (rev. 10-26) ©GEA Systems North America LLC"
- URL: https://www.gea.com/assets/295686
- Pages: metric stand-alone table p. 17; imperial table p. 16 (as the extractor reported them)
- Footnotes as printed:
  - "1. Some figures approximated."
  - "5. Dimensions are based on standard applications. Values can differ depending on the heat pump configuration…"

**Metric table, as printed (heat source; heat sinks; cooling kW; heating kW; power kW; COP; L W H mm):**
- RedAstrum MH: "40/35 40/70 60/80 1,402 1,212 1,693 1,575 315 393 5.37 4.00 7,050 2,150 2,450"
- RedAstrum ML: "40/35 40/70 60/80 1,616 1,395 1,960 1,806 373 446 5.26 4.05 7,300 2,150 2,450"
- RedAstrum RM: "40/35 40/70 60/80 2,163 1,934 2,606 2,478 482 593 5.41 4.18 7,900 2,150 2,750"
- RedAstrum RN: "40/35 40/70 60/80 2,625 2,339 3,197 3,019 622 740 5.14 4.08 7,900 2,150 2,750"
- RedGenium 550: "25/20 35/30 45/40 50/70 60/80 70/95 859 1,116 1,391 1,052 1,362 1,717 213 269 356 4.95 5.06 4.82 6,450 2,150 2,500"
- RedGenium 750: "… 1,384 1,785 2,256 … 7,350 2,150 2,650"
- RedGenium 950: "… 1,737 2,246 2,827 … 8,100 2,150 2,650"

**How the conditions pair:**
- RedGenium: source 25/20 goes with sink 50/70, 35/30 with 60/80, and 45/40 with 70/95. This is paired by column order (our reading), so confirm it.
- RedAstrum: one source (40/35) with two sink conditions.

**Not printed:** no 70→90 °C point. The nearest points are 60/80 and 70/95 °C.

**Criteria:**
- District-heating size: yes.
- North America: North American literature from GEA Systems North America LLC, with imperial tables. 60 Hz, UL and CSA are not printed (?).
- Maker document with dimensions and rating: yes.
- Date: rev. 10-26.

### Partial: Trane CenTraVac CVHH-HT (High Temperature Booster), size above range
- Document: CTV-SLB071-EN, 02/28/2024
- URL: https://elibrary.tranetechnologies.com/public/commercial-hvac/Literature/Sales/CTV-SLB071-EN_02282024.pdf
- Printed:
  - "11,000 to 35,000 MBH (3,224 to 10,257 kW)"
  - "Design leaving condenser temperatures from 140°F to 180°F (60°C – 82°C)"
  - "Source chiller leaving condenser water up to 105°F (40°C)"
  - General Data L/W/H: "180.3 in. 138.1 in 141.6 in." (4.58 × 3.51 × 3.60 m, our conv.)
  - "79,000 lbs."
  - "4,160 V to 13.8 kV 60 Hz 3Phase"
- **FAIL as a comparator:**
  - The smallest unit (3.2 MW) is already above the 1–3 MW band.
  - The capacity is not tied to a stated source/sink point.
  - It is unclear which size the single dimension set belongs to, so kW/m² was not computed.
- North America: yes (Trane NA, 60 Hz).

### Partial: YORK YVWH-200 (Johnson Controls, same group as the basis), FAIL on dimensions
- Product page (york.com): "4,050 MBH (1,186 kW)" in simultaneous mode, "up to 180 °F (82 °C)", "UL/ETL"
- Flyer: "YVWH-200 Fast Facts" (©2023)
  - URL: https://www.york.com/-/media/project/jci-global/york-sites/united-states-york/commercial/files/jci13872-applied-hp-yvwh200-flyer-d23d-lowresviewonly.pdf
  - "4,400 MBH (1,289 kW) HW heating" at "41 °F (5 °C) / 176 °F (80 °C)"
- Dimensions: **?** The Engineering Guide is listed but no link was exposed.
- The page and flyer disagree (82 vs 80 °C; 1,186 vs 1,289 kW).

### Other heat pump makers tried, FAIL
- **Carrier 61XWHZE:** carrier.com (DK) page gives "200-2 500 kW" and "up to 85°C". The documents sit on eto.carrier.com, which is blocked to automated reading (robots), so not read.
- **Mayekawa:** largest listed hot-water unit is Plus+HEAT, 487 kW at 85 °C (too small). No dimensions.
- **Aermec WWBG (WWBG_Y_UN50_03):** maximum 138.0 kW at 70/78 °C; 400 V/50 Hz. Too small and not North American.
- **GEA open-type heat pump page:** 2× 65 HP gives 1,063 kW at +70/+80 °C. No dimensions on the page.
- **Kobelco, Smardt, Multistack, Fenagy, Clivet:** no maker-hosted 1–3 MW / 70–90 °C document with dimensions found. Fenagy and Clivet appeared only on trade-fair or distributor hosts (not used).

### Comparison

| Maker / model | Source → sink (°C) | Heating kW | L × W × H (m) | Footprint m² | kW/m² (our calc.) | m²/MW (our calc.) |
|---|---|---|---|---|---|---|
| JCI Sabroe DualPAC 712-W (basis) | 30/20 → 50/70 | 1494 | 5.5 × 3.0 × 2.1 | 16.5 | 90.5 | 11.0 |
| same, 70→90 | — → 70/90 | 1381 | same | 16.5 | 83.7 | 12.0 |
| GEA RedGenium 550 | 35/30 → 60/80 (paired by order) | 1,362 | 6.45 × 2.15 × 2.50 | 13.9 | 98.2 | 10.2 |
| GEA RedAstrum MH | 40/35 → 60/80 | 1,575 | 7.05 × 2.15 × 2.45 | 15.2 | 103.9 | 9.6 |
| GEA RedGenium 750 | 35/30 → 60/80 | 1,785 | 7.35 × 2.15 × 2.65 | 15.8 | 113.0 | 8.9 |
| GEA RedAstrum ML | 40/35 → 60/80 | 1,806 | 7.30 × 2.15 × 2.45 | 15.7 | 115.1 | 8.7 |
| GEA RedGenium 950 | 35/30 → 60/80 | 2,246 | 8.10 × 2.15 × 2.65 | 17.4 | 129.0 | 7.8 |
| GEA RedAstrum RM | 40/35 → 60/80 | 2,478 | 7.90 × 2.15 × 2.75 | 17.0 | 145.9 | 6.9 |
| GEA RedAstrum RN | 40/35 → 60/80 | 3,019 | 7.90 × 2.15 × 2.75 | 17.0 | 177.7 | 5.6 |
| Trane CVHH-HT | ≤40 → 60–82 | 3,224–10,257 | 4.58 × 3.51 × 3.60 | 16.1 | ? (size unclear) | ? |

**Reading:** at about 1.4–1.6 MW, DualPAC (11.0 m²/MW) and GEA (9.6–10.2 m²/MW) are close, within about 15%. DualPAC sits at the less compact end, not the middle. GEA units are longer and narrower (2.15 m wide against 3.0 m).

---

## 3. Lithium-ion UPS battery cabinet

### Current basis
- Vertiv EnergyCore Li5: 600 × 750 × 2000 mm, 263 kW (SL-71271 R06/26)

### New: Delta Electronics LZH Series UPS Li-ion battery system, PASS (North America unconfirmed)
- Document: "LZH Series UPS Li-ion Battery System" leaflet, "Leaflet_UPS-Battery_LZH-Series_en_ESP", "© 2025 Delta Electronics"
- URL: https://www.deltapowersolutions.com/media/download/Leaflet_UPS-Battery_LZH-Series_en_EKASAQ-02.pdf
- Page: single leaflet, no page numbers.
- Printed:
  - "Discharge Power (DC) 400 kW with 5 mins (BOL)"
  - "Nominal Capacity / Rated Capacity 47.1 kWh / 42.4 kWh"
  - "Dimensions (W x H x D) With Top-hat 620 x 2185 x 625 mm" (primary), "620 x 2185 x 650 mm" (secondary)
  - "Without Top-hat 620 x 1910 x 625 mm" and "620 x 1910 x 650 mm"
  - Weight: "900 kg … 905 kg (approximate)"
  - Standards: "UL1973, IEC 62619, IEC/UL 60730-1, UL9540A, CE Mark, UN 38.3"; LFP
- Primary/secondary is matched to the depths by column order.
- North America: UL listings are printed; 60 Hz and NA sales are not stated (?).

### Partial: EnerSys DataSafe Noir (LFP), PASS on size and NA literature, FAIL on a 5-minute rating
- Document: "DataSafe Noir™ Energy Storage System Range Summary", AMER-EN-RS-DS-Noir-0626, © 2026 EnerSys
- URL: https://www.enersys.com/49f501/globalassets/documents/product-documentation/datasafe/noir/amer/amer-en-rs-ds-noir.pdf
- Printed:
  - "Max Output Power 500 kW 600 kW" (DSN-500 / DSN-600)
  - "Dimensions (H x W × D) 78.7 × 31.5 × 29.5 in (2000 × 800 × 750 mm)"
  - "UL 1973", "UL 9540A"
  - "engineered for modern data center power environments"
- Runtime: **?** "Max Output Power" is not tied to a runtime.

### Partial: Samsung SDI U8A1, FAIL on dimensions
- Source: Samsung SDI Newsroom, 2025.05.07 (maker site, but a news article, not a data sheet)
- URL: https://news.samsungsdi.com/global/articleView?seq=270
- Printed: "U8A1 delivers a rated output of 263kW per rack, enabling stable backup power for five minutes"
- Dimensions: **?**
- The same 263 kW as Vertiv Li5 is noted only. Whether Vertiv uses this rack is not verified.

### Other UPS battery makers tried, FAIL
- **Schneider Galaxy Li-ion cabinet:** the se.com product page for LIBSESMG17UL gives only "17 x 2.04 kWh battery modules" (title). The product datasheet (se.com download-pdf) is blocked to automated reading (robots), so not read. kW: ?
- **Eaton:** white paper WP153029EN (Nov 2020) on Samsung-built UL 9540A cabinets prints no cabinet kW or dimensions, and is too old.
- **LG Energy Solution, ABB, Huawei:** no maker-hosted UPS rack data sheet found in search.

### Comparison

| Maker / model | Discharge power (as printed) | W × D × H (mm) | Footprint m² | kW/m² (our calc.) |
|---|---|---|---|---|
| Vertiv EnergyCore Li5 (basis) | 263 kW | 600 × 750 × 2000 | 0.45 | 584 |
| Delta LZH primary | 400 kW, 5 min (BOL) | 620 × 625 × 2185 (with top-hat) | 0.39 | 1032 |
| Delta LZH secondary | 400 kW, 5 min (BOL) | 620 × 650 × 2185 | 0.40 | 993 |
| EnerSys DSN-500 | 500 kW max (runtime ?) | 800 × 750 × 2000 | 0.60 | 833 (not 5-min basis) |
| EnerSys DSN-600 | 600 kW max (runtime ?) | 800 × 750 × 2000 | 0.60 | 1000 (not 5-min basis) |
| Samsung SDI U8A1 | 263 kW, 5 min | ? | ? | ? |
| Schneider Galaxy Li-ion (LIBSESMG…) | ? | 650 × 587 × 1970 (earlier sheet) | 0.38 | ? |

**Reading:** Vertiv Li5 is the least power-dense cabinet found, at about 57% of Delta's kW/m² on the same 5-minute basis. It is a conservative (space-generous) basis, not the middle.

---

## Could not read (blocked or login; not circumvented)
- Güntner myguentner.com document portal (login)
- Carrier eto.carrier.com (robots-disallowed)
- Schneider se.com product datasheet download (robots-disallowed)
- BAC and SPX direct PDF download through the shell (proxy refused); both were read through the web-fetch reader instead
- LU-VE and YORK document links were not exposed on their pages
