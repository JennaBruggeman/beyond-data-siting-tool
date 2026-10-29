# Beyond Data: electrical plant basis-unit selection

Prepared 29 Oct 2026. Covers types A–E (gensets, MV/600 V transformers, LV switchgear, UPS with Li-ion cabinet, BESS).

## How to read this

- **Sources.** Only primary maker documents or maker web pages are used. Dealer, distributor and trade-press copies were found for several items but were **not used**. They are listed under "excluded" so it's clear they exist.
- **How values were read.** I read every document through a text-extraction fetch tool, not by looking at the page. Where a value sits only in a drawing, or a table row was cut off, I mark it "?". Values flagged ⚠ should be checked by eye against the PDF before final use.
- **Our calculations.** Footprint = L × W (plan area only). "Per MW" divides that area by the printed rating. Every such figure is **our calculation** and appears in the column marked "(calc)".
- **Like-for-like basis.**
  - **A (gensets):** the most attenuated outdoor sound enclosure with a sub-base tank of about 24 h, to match the current Cat Level 2 basis.
  - **B (transformers):** footprint per MVA.
  - **C (switchgear):** footprint per vertical section holding a 3200 A main. A 2500 kVA transformer at 600 V draws about 2406 A (calc).
  - **D (UPS):** UPS frame only, with no batteries.
  - **E (BESS):** one enclosure, per MWh of nameplate energy.
- **Access limits.** The web-search budget ran out during the work, so CATL, Wärtsilä and the second BYD check could not be searched further. Curl access to every maker site was refused by the session proxy, so all reads went through the fetch tool. These sites or documents could not be read:
  - Cummins: cummins.com product pages returned a client error.
  - MTU: spec-sheet URLs were rejected as too long.
  - Schneider: the Li-ion cabinet page URL was too long, and the product-datasheet PDFs were refused.
  - ABB: the ReliaGear LV SG descriptive bulletin was refused.
  - Pioneer: the line card was refused.
  - Wärtsilä: the spec sheet sits behind a download button.
  - Toshiba: the outline drawing is not text.

---

## A. Standby diesel generator set, outdoor sound enclosure with sub-base tank

### A1. About 2 MW

| Maker / unit | C1 | C2 | C3 | C4 | C5 | Rating | L × W × H (m) | m²/MW (calc) |
|---|---|---|---|---|---|---|---|---|
| **Caterpillar 3516C, SA Level 2, with tank** | Pass | Pass | Pass (60 Hz; EPA Tier 2; UL 142 tank) – UL 2200/CSA not seen | Pass | Pass (05/24) | 2.0 eMW standby | 13.868 × 2.671 × 5.007 | **18.52** |
| **Rehlko (Kohler) KD2000, Sound Level 2, 8577–16451 L sub-base tank** | Pass (DCC = standby) | Pass | Pass (60 Hz; Tier 2; cULus UL 2200 + CSA C22.2 No. 100) | Pass | Pass (12/23, 6/24) | 2000 kW standby | 13.491 × 3.488 × 4.522–4.776 | **23.53** |
| **Generac Industrial MD2000, Level 2 SA, 24 h (3,850 gal)** | Pass (standby; DC rating not stated) | Pass | Pass (60 Hz; Tier 2; UL 2200, CSA C22.2) | Pass ⚠ | Pass (Rev D 06/12/2024) | 2000 kW standby | 11.312 × 6.785 ⚠ × 5.544 | **38.38** |
| Generac MD2000, Level 1 SA, 24 h (reference) | as above | | | | | 2000 kW | 9.696 × 3.099 × 5.544 | 15.02 |
| Cummins C2000D6E / C2250D6 | ? | ? | ? | **Fail: could not read** (cummins.com blocked; only dealer copies) | ? | – | ? | – |
| MTU (Rolls-Royce) 16V4000 DS2000 | ? | Pass (DCC 1,800 printed; Uptime Tier III/IV) | Partial ("UL/ulc"); EPA tier not printed in brochure | **Fail: enclosure dims not read** (spec sheets blocked) | Pass (Ed. 01/23) | brochure prints "2,000 kVA" standby ⚠ | ? | – |
| Mitsubishi (MHI) MGS | ? | ? | **Fail** (no EPA tier, UL or CSA printed) | **Fail** (no enclosure dims) | ? (undated) | ? | ? | – |

**Proposed basis (2 MW): Rehlko KD2000, Sound Level 2 enclosure with sub-base tank, 13.491 × 3.488 × 4.522 m (8577 L tank) to 4.776 m (16451 L tank).**
- **Range across passing units:** 18.52–38.38 m²/MW. Without the Generac L2 outlier the range is 18.52–23.53.
- **Why:** It is the median of the three passing units, and the one 2 MW sheet that prints the data-centre continuous rating and Canadian listing (cULus/CSA) together. Cat is the compact end and Generac the large end.
- **Impact on the tool:** the footprint grows by 27% over the current Cat basis (47.06 vs 37.04 m², calc).

### A2. About 1 MW

| Maker / unit | C1 | C2 | C3 | C4 | C5 | Rating | L × W × H (m) | m²/MW (calc) |
|---|---|---|---|---|---|---|---|---|
| **Caterpillar C32B, C27/C32 sound attenuated enclosure, 2000 gal integral tank base** | Pass (single SA level, 75 dBA at 7 m) | Pass | Pass (60 Hz; EPA Tier 2; enclosure "UL Listed"; Canada stationary) | Pass (rating from cat.com page; dims from enclosure sheet) | Pass (09/25) | 1000 ekW standby (lowest of 1000/1100/1250) | 7.645 × 2.554 × 3.453 | **19.53** |
| **Rehlko KD1000, Sound Level 2, 6621 L (24 h) sub-base tank** | Pass (DCC = standby) | Pass | Pass (60 Hz; Tier 2; cULus UL 2200 + CSA) | Pass | Pass (12/23; 9/24) | 975–1000 kW standby | 8.434 × 2.616 × 3.934 | **22.06** |
| **Generac MD1000, Level 2 SA, 24 h (1,680 gal)** | Pass | Pass | Pass (60 Hz; Tier 2; UL 2200, CSA C22.2) | Pass | Pass (Rev C 03/04/2024) | 1000 kW standby | 8.357 × 2.685 × 3.937 | **22.44** |
| Cummins DQFAD, QuietSite II, 2000 gal (S-1443) | Pass | Pass | Pass (UL 2200; CSA 4215-01) | Pass | **Fail** (08/18; DQFAD model) | 1000 kW standby | 327 × 98 × 143 in (8.306 × 2.489 × 3.632) | (20.67, not counted) |
| MTU 16V2000 DS1000 | ? | ? | ? | **Fail: not read** | ? | – | ? | – |
| Mitsubishi | as A1 | | **Fail** | **Fail** | | | | – |

**Proposed basis (1 MW): Rehlko KD1000, Sound Level 2 with 24 h sub-base tank, 8.434 × 2.616 × 3.934 m.**
- **Range across passing units:** 19.53–22.44 m²/MW.
- **Why:** It is the median of the three passing units, and it is the same maker, enclosure level and document set as the 2 MW basis, so the two sizes stay consistent.
- **Sourcing the 1 MW size:** it replaces the unsourced 8.6 × 2.5 × 3.7 m, which is close to these values.

### A sources (printed values)

- **Cat 3516C 60 Hz Enclosures, LEHE20856-01 (05/24).**
  - URL: https://emc.cat.com/pubdirect.ashx?media_string_id=LEHE20856-
  - Page 1: "2.0 eMW" standby for both levels; "24 hours" run time at 2.0 eMW; SA Level 1 79 dBA, SA Level 2 74 dBA at 7 m; integral fuel tank base "UL142 listed".
  - Dimensions table: SA Level 2 with tank "13868 / 546.0" L, "2671 / 105.2" W, "5007 / 197.1" H (mm / in). Without tank, H is 4702 / 185.1.
  - The dimensions table follows page 1 of "1 of 2", so it is probably page 2 (page not printed in the extract).
- **Cat 3516C (60 Hz) product page.**
  - URL: https://www.cat.com/en_US/products/new/power-systems/electric-power/diesel-generator-sets/1000028912.html
  - "Standby Rating 2500/2250/2000 ekW"; "U.S. EPA Cert., Tier 2"; no UL 2200/CSA statement seen.
  - Cat also publishes a white paper, "Application of Cat Generator Sets in Tier III and Tier IV Data Centers", on cat.com (not read).
- **Sound Attenuated Enclosures for C27 and C32 Generator Sets, LEHE0407-04 (09/25).**
  - URL: https://emc.cat.com/pubdirect.ashx?media_string_id=LEHE0407-
  - Page 2 table, weight kg/lb, then L, W, H in mm/in: "With 2000 gal integral tank base 6050 13,338 7645 301 2554 101 3453 136".
  - Column order is inferred from the header "Weight, Length, Width, Height". 75 dBA at 7 m; "UL Listed"; "For reference only – do not use for installation design".
- **Cat C32B (60 Hz) product page.**
  - URL: https://www.cat.com/en_US/products/new/power-systems/electric-power/diesel-generator-sets/1000028917.html
  - "1000/1100/1250 ekW"; "U.S. EPA Tier 2 Certified"; country of use "Canada (Stationary)".
- **Industrial Diesel Generator Set – KD2000, G5-626 (6/24d).**
  - URL: https://techcomm.kohler.com/techcomm/pdf/g5626.pdf
  - Page 1: 2000 kW / 2500 kVA standby at 60 Hz; Tier 2 EPA-Certified for Stationary Emergency Applications; cULus UL 2200 and CSA C22.2 No. 100.
  - Page 2: Data Center Continuous rating same as standby.
  - Page 5: Sound Level 2 "13493 x 3488 x 4777" mm, with tank "Refer to G6-154".
- **Sound Enclosure and Subbase Fuel Tank Package, G6-154 (12/23s).**
  - URL: https://techcomm.kohler.com/techcomm/pdf/KD800-2500_G6154.pdf
  - Footnote: "Height includes enclosure, lift base, and tank (if equipped)".
  - KD2000 SL2, page 10: tank 8577 L "13491 (531) × 3488 (137) × 4522 (178)"; 16451 L "… × 4776 (188)".
  - KD1000 SL2, page 8: tank 6621 L (24 h) "8434 (332) × 2616 (103) × 3934 (155)".
- **Industrial Diesel Generator Set – KD1000, G5-580 (9/24o).**
  - URL: https://techcomm.kohler.com/techcomm/pdf/g5580.pdf
  - Page 1: 975–1000 kW / 1219–1250 kVA standby at 60 Hz; DCC same as standby; Tier 2.
  - Pages 4–5: cULus (UL 2200 and CSA).
- **KD2500, G5-628 (6/24c).**
  - URL: https://techcomm.kohler.com/techcomm/pdf/g5628.pdf
  - Shares the KD2000 enclosure; Sound Level 2 prints 76 dB. The KD2000 sheet's dB value was not captured.
- **Rehlko brochure G12-478 (12/25).**
  - URL: https://techcomm.rehlko.com/$web/techcomm/pdf/G12-478_KD_Generators_Brochure_700-4000.pdf
  - Page 06: KD1000 1000/1250 and KD2000 2000/2500 kW/kVA standby, Tier 2. Page 07: enclosures certified UL 2200 to 2500 kW.
- **MD 2000 spec sheet, Part No. 10000031601, Rev. D 06/12/2024.**
  - URL: https://www.generac.com/globalassets/products/business/stationary-generators/diesel-industrial-generators/spec-sheets/md2000-spec-sheet.pdf
  - Page 1: "2,000 kW, 2,500 kVA, 60 Hz"; UL2200, CSA C22.2. Page 4: "EPA Emissions Compliance Tier 2".
  - Page 6, Level 2 SA, 24 h / 3,850 gal: "445.4 (11,312) x 267.1 (6,785) x 218.3 (5,544)".
  - Level 1 SA, 24 h: "381.7 (9,696) x 122.0 (3,099) x 218.3 (5,544)". The 12 h row prints 9,669, an internal inconsistency.
  - ⚠ The L2 width of 6,785 mm is more than twice the L1 width. It is printed, but should be checked against the drawing.
- **MD1000 spec sheet, Part No. A0001316734, Rev. C 03/04/2024.**
  - URL: https://www.generac.com/globalassets/products/business/stationary-generators/diesel-industrial-generators/spec-sheets/md1000-spec-sheet.pdf
  - Page 1: 1,000 kW / 1,250 kVA at 60 Hz; UL2200, CSA C22.2. Page 4: Tier 2.
  - Page 7: Level 2 has the same dims as Level 0, 24 h / 1,680 gal "329.0 (8,357) x 105.7 (2,685) x 155.0 (3,937)".
- **Cummins Enclosures and Tanks (250–1000 kW Gensets), S-1443 (08/18).**
  - URL: https://powersuite.cummins.com/PS5/PS5Content/SiteContent/en/Binary_Asset/pdf/Commercial/Diesel/s-1443.pdf
  - 600–1000 kW: width 98 in; 2000 gal tank, QuietSite II length 327 in, height 143 in. UL 2200; CSA 4215-01.
  - Fails C5 (2018).
- **mtu Series 4000 60 Hz brochure, 16120923, Edition 01/23.**
  - URL: https://www.mtu-solutions.com/content/dam/mtu/download/applications/power-generation/16120923_mtu_S4000_Diesel_brochure_60Hz.pdf
  - Page 10: 16V4000 DS2000 standby/mission-critical "2,000 kVA" ⚠ (unit as extracted); DCC (3F) 1,800; "UL/ulc".
  - No enclosure dimensions.
- **Mitsubishi Generator Sets catalogue (undated).**
  - URL: https://WWW.mhi.com/products/energy/generator/pdf/catalogue.pdf
  - No EPA, UL or CSA; no enclosure dimensions.
- **Excluded dealer/distributor copies** (not used): Cummins C2000D6E spec sheets (csdieselgenerators.com, woodstockpower.com), MTU DS2000 (collicutt.com), Cat 3516C spec sheets (penncatenergy.com).

---

## B. MV to 600 V transformer / unit substation, 2–3 MVA (2500 kVA compared)

| Maker / unit | C1 (outdoor) | C2 | C3 | C4 | C5 | Rating | L × W × H (m) | m²/MVA (calc) |
|---|---|---|---|---|---|---|---|---|
| **Eaton liquid-filled secondary unit substation transformer, 5/15 kV, LV 600 V class** | Pass ("Indoor or Outdoor Application") | Pass | Pass (60 Hz; 600 V; CSA "available"; UL optional) | Pass (HTX/WTX/DTX ⚠ read as H/W/D) | Pass (Oct 2025) | 2500 kVA | W 2.263 × D 2.390 × H 2.084 | **2.16** |
| Eaton same, 25/35 kV class (reference) | | | | | | 2500 kVA | 2.631 × 2.492 × 2.084 | 2.62 |
| **Prolec GE three-phase pad-mounted** | Pass (pad-mount cabinet, IEEE C57.12.28) | Pass | Partial (60 Hz; LV up to 1,200 V, so 600 V not named; UL/CSA not printed) | Pass ⚠ (units not printed; read as in.) | Pass (© 2024) | 2500 kVA | W 2.235 × D 2.438 × H 2.210 | **2.18** |
| Eaton pad-mounted CA202003EN | Likely; not stated | Pass | Partial (UL; 60 Hz) | **Fail**: letters A–I not mapped to axes in text (2500 kVA: A 73, B 72, C 99 in) | Pass (Feb 2025) | 2500 kVA | ? | – |
| Schneider / Square D substation and padmount liquid-filled | ? | Pass (225–20,000 kVA; 75–5,000 kVA) | ? | **Fail**: no dims on range pages | Pass (commercialized) | – | ? | – |
| Siemens | ? | ? | ? | **Fail**: no North American liquid-filled 2.5 MVA dims found | ? | – | ? | – |
| Hitachi Energy unit substation transformer | ? | Pass (150–3,000 kVA, LV to 4,160 V) | Partial (UL, FM; no CSA) | **Fail**: no dims printed | Pass (page 2026) | – | ? | – |
| Hammond MV dry-type (HPWR) | **Fail** (enclosure type for unit not stated) | Pass | **Fail** at 2500 kVA (no 600 V; 416Y/240 min) | Pass (W 114, H 110, D 72 in) | **Fail** (Aug 2014) | 2500 kVA | – | – |
| Pioneer Transformers (Granby, QC) pad-mount / substation | ? | Pass (to 10 MVA) | Partial (CSA or ANSI/IEEE) | **Fail**: no dims on page; line card refused | Pass (page 2026) | – | ? | – |

**Proposed basis: keep Eaton liquid-filled 2500 kVA, 5/15 kV class, 600 V class LV: 2.263 × 2.390 × 2.084 m (W × D × H).**
- **Range across passing units:** 2.16–2.18 m²/MVA at 15 kV class, rising to 2.62 for a 25/35 kV primary (calc).
- **Why:** Only two makers print usable dimensions, and they agree within 1%. Eaton is the one sheet that states 600 V secondary, outdoor use and 60 Hz together.
- **Check:** confirm the utility primary voltage class for each site, because the 25 kV class row is about 21% larger in footprint (calc).

### B sources

- **Secondary unit substations, below 1000 V, Design Guide DG022017EN (Effective October 2025).**
  - URL: https://www.eaton.com/content/dam/eaton/products/design-guides---consultant-audience/eaton-secondary-unit-substation-design-guide-dg022017en.pdf
  - Table 14.1-20, page 14.1-25, "Indoor or Outdoor Application", 2500 kVA, 5 or 15 kV: HTX "82.05 (2084.1)", WTX "89.10 (2263.1)", DTX "94.10 (2390.1)"; weight 15,500 (7031). Footnote: "Dimensions for estimating purposes only".
  - The Canadian edition CA022021EN (Effective January 2020) prints the same row. Its table heading reads "Oil-Filled Standard Design, 60 Hz, HV Delta, LV at 600 V Class"; page 14.1-2 lists secondary "208, 240, 480 or 600 V".
  - URL: https://www.eaton.com/content/dam/eaton/products/design-guides---consultant-audience/eaton-secondary-unit-substation-design-guide-ca022021en.pdf
- **Substation transformers—unit and open types, CA202001EN (Feb 2025).**
  - URL: https://www.eaton.com/content/dam/eaton/products/medium-voltage-power-distribution-control-systems/cooper-power-series-transformers/substation-transformers-unit-and-open-types-ca202001en.pdf
  - Page 1: meets CSA specifications. Dimension letters are not mapped to axes.
- **Three-phase pad-mounted compartmental type transformer, CA202003EN (Feb 2025).**
  - URL: https://www.eaton.com/content/dam/eaton/products/medium-voltage-power-distribution-control-systems/cooper-power-series-transformers/three-phase-pad-mounted-compartmental-type-transformer-ca202003en.pdf
  - Table 7, page 4, 2500 kVA: "A 73, B 72, C 99 … G 76, H 103" in. Figure labels are not readable as text.
- **Prolec GE Three-Phase Pad-Mounted Transformers (© 2024).**
  - URL: https://prolec.energy/wp-content/uploads/2024/12/PGE_Data-Sheet_Three-Phase-Pad-Mounted_RGB_ENG_0224_V1.pdf
  - Header "kVA Height Width Depth Typ Weight (lb) Typ Gal Oil"; 2,500 kVA row "87 88 96 14,000 490". The dimension unit is not printed. HV to 34.5 kV; LV to 1,200 V; 60 Hz.
  - Page numbers not available. An older Prolec GE sheet (3PPMTR-1208-1, undated) on gevernova.com prints the same dims.
- **Square D / Schneider range pages.**
  - Substation liquid-filled, "225 to 20,000 kVA": https://www.se.com/ca/en/product-range/7400
  - Padmount liquid-filled, "75 to 5,000 kVA": https://www.se.com/us/en/product-range/6401
  - Neither page prints dimensions.
- **Hitachi Energy US unit substation transformer page.**
  - URL: https://www.hitachienergy.com/us/en/products-and-solutions/transformers/distribution-transformers/liquid-filled-distribution-transformers/small-distribution-transformers-up-to-315-kva/substation-distribution-transformers
- **Hammond HPS Dry-Type Medium Voltage catalogue, Literature No. HPWR, Aug 2014.**
  - URL: https://documents.hammondpowersolutions.com/documents/Literature/Catalog_and_HPS_Info/HPS-Dry-Type-Medium-Voltage-Catalog.pdf
  - Pages 16–18: 2500 kVA, 15 kV, "P20, W 114 / H 110 / D 72".
- **Pioneer Transformers pages.**
  - https://pioneertransformers.com/products/three-phase-pad-mounted-transformers/
  - https://pioneertransformers.com/products/substation-transformers/
  - Note: the brief names "Pioneer Power". The transformer maker's site is Pioneer Transformers, and its terms documents name ERMCO. I did not research ownership.

---

## C. Low-voltage switchgear section (600 V, 3200 A main section compared)

| Maker / unit | C1 | C2 | C3 | C4 | C5 | Section (3200 A main) | W × D × H (m) | m²/section (calc) |
|---|---|---|---|---|---|---|---|---|
| **Siemens Type WL LV metal-enclosed switchgear** | Pass (indoor; NEMA 3R walk-in and non-walk-in offered) | Pass | Pass (600 V, 635 V max; UL 1558 and CSA C22.2 No. 31) | Pass | Date not printed; asset version timestamp = 7 Dec 2022 (our reading of URL) | 32 in wide for 3200/4000 A mains | 0.813 × 1.524 (60 in std) × 2.438; ≥1.778 (70 in) if cable-connected ≥3200 A | **1.24** (60 in); **1.45** (70 in) |
| **Eaton Magnum DS (rear access)** | Pass (indoor; outdoor aisle/aisleless offered) | Pass | Pass (635 V max; UL 1558, CSA) | Partial: height not labelled in text ("?") | Borderline (Jan 2021) | 3200 A main in 22 in section (max 2 × 3200 A per 22 in; one main/tie) | 0.559 × 1.829 (min 72 in) × ? | 1.02 |
| Schneider Square D Power-Zone 4 | Pass (NEMA 3R walk-in offered) | Pass | Pass (635 Vac; UL 1558; CSA C22.2 No. 31) | **Fail**: widths and heights not in readable catalogue text (front-access depth 42 in) | Pass (© 2005–2022) | ? | ? | – |
| ABB ReliaGear LV SG (Emax 2) | ? | Pass | Partial (cUL; 600 V; UL 1558 not named on page) | **Fail**: only "15 in minimum" width printed; bulletin refused | Pass (current page) | ? | ? | – |
| GE/ABB AKD-20 | ? | ? | ? | **Fail**: only dealer-hosted brochure | ? | – | – | – |

**Proposed basis: Siemens Type WL, 32 in wide × 70 in deep × 96 in high (0.813 × 1.778 × 2.438 m) per 3200 A main section.**
- **Correction to the current tool size:** 32 × 60 × 96 in. Siemens prints that sections with cable-connected 3200 A or larger breakers must be at least 70 in deep (non-fused).
- **Range:** 1.02 (Eaton, height unknown) to 1.45 m² per section (calc), or 0.31–0.44 m²/MVA at 3.33 MVA per 3200 A at 600 V (calc).
- **Why:** Siemens is the only maker whose readable document prints width, depth, height, 600 V and CSA together. Eaton cannot be a full comparator until its height is read from the drawing.
- **Outdoor option (Siemens):** if the gear must sit outdoors, Siemens prints 112.8 in H × 82.3 in D (non-walk-in) or 114 in H × 110.7 in D (walk-in), with a 60 in internal frame.

### C sources

- **Siemens Canada Power Product Catalogue, Section 12 Switchgear, "Type WL Low-voltage Metal-Enclosed Switchgear".**
  - URL: https://assets.new.siemens.com/siemens/assets/api/uuid:80b07fa8-78a1-489b-9817-667e4d73b526/version:1670424507/s12-switchgear.pdf
  - Pages 12-23 to 12-25: "32 in. (813 mm)" for 3200/4000 A mains. Indoor non-fused depth "60 in. standard"; cable-connected 3200 A or larger sections must be at least 70 in (non-fused) or 75 in (fused).
  - Page 12-25: "96 in. (2438 mm)" high, or 102.2 in with hoist.
  - Pages 12-12/13: 600 VAC rated, 635 VAC max. Pages 12-2/12-33: UL 1558, CSA C22.2 No. 31.
- **Eaton Magnum DS Low-Voltage Switchgear Design Guide DG019004EN (Effective Jan 2021).**
  - URL: https://www.eaton.com/content/dam/eaton/products/design-guides---consultant-audience/eaton-rear-access-low-voltage-switchgear-design-guide-dg019004en.pdf
  - Page 20.1-2: "Assembly designed to UL 1558, CSAT, ANSI C37.20.1"; 635 V max.
  - Page 20.1-25: max two 3200 A breakers per 22.00 (558.8) wide section.
  - Page 20.1-24: "Minimum structure depth is 72 inches".
  - Height: only "99.00 inches … when a top-of-gear breaker lifter is used" (6000 A arrangement).
- **Schneider Power-Zone 4 catalogue 6037CT9901 (productinfo pages, © 2005–2022).**
  - URL: https://productinfo.se.com/6037ct9901powerzone4/6037ct9901-power-zone-4-catalog/6037CT9901%20Power-Zone%204%20Catalog/English/6037CT9901%20Power-Zone%204%20(bookmap)_0000769460.xml/$/TechnicalOverview-166FE10A
  - UL 1558; CSA C22.2 No. 31; 635 Vac.
- **ABB ReliaGear LV SG pages.**
  - https://new.abb.com/ca/electrical-distribution-control-and-power-solutions/low-voltage-switchgear/reliagear-lv-sg
  - https://electrification.us.abb.com/products/switchgear/reliagear-lv-sg-switchgear
  - Note: ABB "ReliaGear SB" is a switchboard, not switchgear, so it does not fit this type.

---

## D. Data-centre UPS about 1 MW, and Li-ion battery cabinet

### D1. UPS frame (no batteries)

| Maker / unit | C1 | C2 | C3 | C4 | C5 | Rating | W × D × H (m) | m²/MW (calc) |
|---|---|---|---|---|---|---|---|---|
| **Schneider Galaxy VX 480 V (GVX1000K1000NGS; same cabinet line as 1000→1250 kW)** | Pass | Pass | Pass (480 V; UL 1778 + CSA C22.2 No. 107.3) | Pass | Pass (11/2024) | 1000 kW (1203 A at 480 V) | 3.600 × 0.900 × 1.970 | **3.24** |
| **Vertiv Liebert EXL S1 1000–1200 kVA/kW** | Pass | Pass | Pass (480 V; UL 1778 5th Ed. + CSA 22.2 No. 107.3) | Pass | Pass (current product page) | 1000 kW (frame to 1200) | 2.654 × 0.914 × 2.009 | **2.43** (2.02 at 1200 kW) |
| **ABB MegaFlex UL 1M0** | Pass | Pass ("Data Centers") | Partial (480 V 60 Hz; ETL to UL 1778; CSA not printed) | Pass | Pass (30/01/2026) | 1000 kW | 3.300 × 1.000* × 2.200 | 3.30 |
| **Eaton 9395XC 1125 kW** | Pass | Pass | Partial (480 V product; UL/CSA not printed in brochure) | Pass | Pass (Jan 2025) | 1125 kW/kVA (no 1000 kW model) | 2.375 × 0.851 × 2.004 | 1.80 |
| Huawei UPS5000-H | Pass | Pass | **Fail** (380/400/415 V; CE/CB only) | Pass (800 kVA 2000 × 1600 × 1000 mm H×W×D) | ? | – | – | – |
| Toshiba G9000 1000 kVA (T901H1D0MWWW-C) | ? | Pass | Partial (480 V; UL/CSA not on page) | **Fail**: outline drawing not text | Pass (page 12/2025) | 1000 kVA | ? | – |

**Proposed basis: keep Schneider Galaxy VX 1000 kW, 3.600 × 0.900 × 1.970 m.**
- **Range across passing and partial units:** 1.80–3.30 m²/MW (calc).
- **Why:** Among the three units with a printed UL 1778 listing (Schneider, Vertiv, ABB), it is the median, and with Vertiv it is one of only two that also print a CSA listing. The same footprint scales to 1250 kW.
- **On the four-unit median:** it falls exactly midway between Vertiv and Schneider (2.83, calc), so the CSA/UL reading decides it. The tie-break is explained here.

### D2. Li-ion battery cabinet

| Maker / unit | C1 | C2 | C3 | C4 | C5 | Per cabinet | W × D × H (m) | m² per MW discharge (calc) |
|---|---|---|---|---|---|---|---|---|
| **Vertiv EnergyCore Li5, 18 modules** | Pass | Pass ("data centers") | Pass (UL 1973, UL 9540A 4th Ed., UL 9540; CSA mark) | Pass ⚠ (axes not labelled; 2000 read as H) | Pass (R06/26) | 31.1 kWh; 263 kW max; 518 VDC; 5 min EOL class | 0.600 × 0.750 × 2.000 | **1.71** (4 cabinets per 1 MW = 1.80 m², calc) |
| Vertiv HPL 9540A | Pass | Pass | Partial (UL 1973/9540A; no CSA) | Pass | **Fail** (R02/21) | 38 kWh; 207 "kWb" | 0.600 × 0.725 × 2.020 | (1.52, not counted) |
| Schneider Galaxy Li-ion cabinet (LIBSESMG16/17UL, 2.04 kWh modules) | ? | Pass | ? | **Fail: not read** (spec page URL too long; datasheet refused) | Pass (current) | 16–17 × 2.04 kWh | ? | – |

**Proposed cabinet basis: Vertiv EnergyCore Li5 (18 modules), 0.600 × 0.750 × 2.000 m, 263 kW max discharge per cabinet.**
- **Sizing:** the tool should place 4 cabinets per MW of UPS for about 5 min (calc).
- **Why:** It is the only current Li-ion cabinet whose maker sheet I could read, and it prints the dimensions, power, UL 9540A and CSA mark.
- **Gap:** it is a different brand from the UPS basis. Schneider's matching cabinet should be checked once its datasheet can be read.

### D sources

- **Galaxy VX 480 V UPS System Technical Specifications, 990-5451K-001 (11/2024).**
  - URL: https://www.productinfo.schneider-electric.com/galaxyvx_ul/5968bd3b46e0fb0001f24e08/990-5451E%20Technical%20Specifications%20480%20V/English/990-5451K_EN.pdf
  - Page 12: "Galaxy VX 1000 kW, 480 V … (GVX1000K1000NGS)". Page 27: "UL1778 Listing and CSA C22.2 NO.107.3". Page 40: 1203 A at 480 V.
  - The extract truncated at the dimensions row.
- **Galaxy VX dimension table, 990-6264J-001, "Weights and Dimensions for UPSs with 1250 kW I/O Cabinet".**
  - URL: https://productinfo.se.com/galaxyvx_ul/990-6264_master-galaxy-vx-1250-kw-installation/English/990-6264%20Galaxy%20VXUPS%20with%201250%20kW%20I_O%20Cabinet%20Installation_0000412357.xml/$/WeightsandDimensionsforUPSswith1250kWI_OCabinetREF_0000411240
  - GVX1000K1000NGS row: height 1970 (77.6), width 3600 (141.7) (4 × 600 power + 1200 I/O), depth 900 (35.4) mm (in); 2780 kg.
- **Vertiv Liebert EXL S1 1000–1200 kW product page.**
  - URL: https://www.vertiv.com/en-us/products-catalog/critical-power/uninterruptible-power-supplies-ups/liebert-exl-s1-1000-1200kvakw/
  - "104.5 in x 36.0 in x 79.1 in (2654 mm x 914 mm x 2009 mm)"; 4667 lb; "UL 1778 5th Edition, CSA 22.2 NO 107.3"; 480 V.
  - Vertiv's guide spec titles the product "250-1200kVA 480V 60Hz".
- **ABB MegaFlex 1000 to 1600 kW 4W 480V UL S1, TDS 4NWD902001A0101 Rev A (30/01/2026).**
  - URL: https://library.e.abb.com/public/b8bda74da7f54b7d94f2edeb6f496bb3/4NWD902001A0101_TDS_MGF_SUL_1M0-1M6_%20EN_REV-A.pdf
  - Page 5: "129.92 x 39.37 x 86.62 inches / 3300 x 1000* x 2200 mm" (one size for 1000–1600 kW). Page 6: "ETL Listed to UL 1778". Page 8: 1205 A at 480 V.
- **Eaton 9395XC UPS brochure BR153147EN (January 2025).**
  - URL: https://www.eaton.com/content/dam/eaton/products/backup-power-ups-surge-it-power-distribution/backup-power-ups/power-xpert-9395/9395xc/eaton-9395XC-ups-brochure-BR153147EN.pdf
  - 1125 kW/kVA: "93.5" w x 33.5" d x 78.9" h". Page not printed.
- **Huawei FusionPower / UPS5000-H (Italian catalogue, undated).**
  - URL: https://digitalpower.huawei.com/attachments/data-center-facility/332e3c3774434e6491942a9d77a89423.pdf
  - Page 46: 380/400/415 V; CE, CB.
- **Toshiba G9000 page.**
  - URL: https://www.toshiba.com/tic/power-electronics/uninterruptible-power-systems/three-phase/g9000-series-100-to-2000-kva
- **Vertiv EnergyCore Battery System, SL-71271 (R06/26).**
  - URL: https://www.vertiv.com/49b052/globalassets/products/critical-power/uninterruptible-power-supplies-ups/vertiv-energycore-lithium-ion-battery-cabinet/vertiv-energycore-battery-storage-system-data-sheet-sl-71271.pdf
  - Li5 18 modules: 31.1 kWh, 263 kW, 518 VDC, 590 kg; "600mm x 750mm x 2000mm".
  - Page 4: "CSA mark (UL 1973 3rd edition)", "UL9540A 4th Edition".
- **Vertiv HPL, SL-70383 (R02/21).**
  - URL: https://www.vertiv.com/48eec3/globalassets/products/critical-power/uninterruptible-power-supplies-ups/vertiv-hpl-lithium-ion-data-sheet-sl-70383.pdf
  - Page 4: 38 kWh; "600mm x 725mm x 2020mm".
- **Schneider Li-Ion Battery Rack 9540A UL Tech Spec (Jul 22 2020, V1).** Fails C5. Values not readable.

---

## E. Battery energy storage enclosure, about 5 MWh

| Maker / unit | C1 (outdoor) | C2 | C3 | C4 | C5 | Energy | L × W × H (m) | m²/MWh (calc) |
|---|---|---|---|---|---|---|---|---|
| **Sungrow PowerTitan 2.0, ST5015UX-2H/4H-US (AC block, PCS included)** | Pass (Type 3S, C4) | Pass | Partial (60 Hz; UL 9540, 9540A, 1973, 1741SB, IEEE 1547; CSA not printed) | Pass | Pass (V5, © 2024) | 5015 kWh | 6.058 × 2.438 × 2.896 | **2.95** |
| **Tesla Megapack (4 h; inverter included)** | Pass (IP66) | Pass | Partial (UL 1973/9540/9540A/1741; 480 V AC; 60 Hz and CSA not printed) | Pass (web page, not a dated sheet) | Pass (live order page) | 3,916 kWh (4 h); 3,854 kWh (2 h) | 8.814 × 1.651 × 2.794 | **3.72** (3.78 at 2 h) |
| **Fluence Gridstack Pro 5000 (DC enclosure; PCS separate)** | Pass (IP55) | Pass | Partial (UL 9540, 9540A, 1741/IEEE 1547; CSA not printed) | Pass ⚠ (series/column mapping inferred by extraction; "design estimates only") | Pass (BR-042-04-EN, © 2024) | 5644 kWh | 6.058 × 2.438 × 2.896 | 2.62 |
| **Fluence Gridstack Pro 2000, about 5 MWh option (DC)** | as above | | | Pass ⚠ | | 4872–5016 kWh | 6.820 × 2.438 × 2.896 | 3.31–3.41 |
| BYD MC Cube-T (MC10C-B5010) | Pass (IP55) | Pass | Partial (UL 9540/9540A/1973; 480 V/60 Hz aux) | **Fail**: issuer not printed and host bydenergia.com not confirmed as BYD's own site | ? | 5,010 kWh | 6.058 × 2.438 × 2.896 (excl. HVAC) | (2.95, not counted) |
| CATL TENER | ? | ? | ? | **Fail**: no catl.com document found before the search limit | ? | – | ? | – |
| Wärtsilä Quantum3 | ? | Pass | ? | **Fail**: spec sheet behind download button; page prints only "20-foot ISO container" | Pass (news 4 Sep 2024) | ? | ? | – |

**Proposed basis: keep Sungrow PowerTitan 2.0, ST5015UX-US, 6.058 × 2.438 × 2.896 m, 5015 kWh.**
- **Range across passing units:** 2.62–3.72 m²/MWh (calc).
- **Why:** The four-unit median (3.13, calc) falls exactly midway between Sungrow and Fluence Pro 2000. Sungrow wins the tie because, like Megapack, it includes the power conversion, so the tool draws one box. Fluence needs a separate PCS and labels its values "design estimates".
- **Gap for all units:** none of the BESS sheets read prints a CSA listing. Canadian certification needs to be confirmed with each maker.

### E sources

- **Sungrow, PowerTitan 2.0 Liquid Cooled Energy Storage System, ST5015UX-2H-US / ST5015UX-4H-US datasheet (Version 5, © 2024).**
  - URL: https://info-support.sungrowpower.com/application/pdf/2024/12/07/ST5015UX-2H-US_ST5015UX-4H-US Datasheet.pdf
  - "5015 kWh"; "6058 mm × 2896 mm × 2438 mm (238.5 in × 114.0 in × 96.0 in)" W × H × D; "Type 3S"; "IEEE 1547, UL 1973, UL 1741SB, UL 9540"; UL 9540A; 60 Hz.
  - Page not printed.
- **Tesla, Order Megapack (design page).**
  - URL: https://www.tesla.com/megapack/design
  - "W 347 in, D 65 in, H 110 in"; 3,916 kWh / 979 kW (4 h); 3,854 kWh / 1,927 kW (2 h); 84,000 lb max; "UL 1973 / 9540 / 9540A / 1741, IEC 62619"; IP66; "480V AC 3 phase".
- **Fluence Gridstack Pro, BR-042-04-EN (© 2024).**
  - URL: https://info.fluenceenergy.com/hubfs/Fluence%20Gridstack%20Pro_Global_US%20EN.pdf
  - Page 2: 5644 kWh, "2896 x 6058 x 2438 mm (9.5 x 20 x 8 ft.)" (H × L × D); 4872–5016 kWh, "2896 x 6820 x 2438 mm"; IP55. "Design estimates only and are not guaranteed".
- **BYD MC Cube-T BESS (host bydenergia.com; issuer and date not printed). Excluded.**
  - URL: https://bydenergia.com/wp-content/uploads/2026/07/20250716-MC-Cube-T-BESS.pdf
- **Wärtsilä Quantum3 resource page.**
  - URL: https://storage.wartsila.com/resource/quantum3
- **Wärtsilä news release (4 Sep 2024).**
  - URL: https://www.wartsila.com/media/news/04-09-2024-wartsila-introduces-quantum3-a-complete-high-density-ac-block-energy-storage-system-with-industry-leading-features-and-controls-3489474
- **Excluded trade press** (not used): energy-storage.news, pv-magazine, ess-news, etc. (CATL TENER 6.25 MWh claims).

---

## Open items to close

1. **Generac MD2000 Level 2 width (6,785 mm):** check it by eye. It decides the top of the 2 MW range, not the basis.
2. **Cummins and MTU 2 MW and 1 MW outdoor-enclosure sheets:** need reading from the maker site (blocked here).
3. **Eaton Magnum DS section height and Eaton pad-mount axis letters:** need a visual read of the drawings.
4. **Schneider Galaxy Li-ion cabinet datasheet:** read it so the UPS and cabinet can be the same brand.
5. **CSA/cUL listing for every BESS and for the ABB and Eaton UPS:** not printed in what I read.
6. **CATL TENER and Wärtsilä Quantum3:** need maker spec sheets.
