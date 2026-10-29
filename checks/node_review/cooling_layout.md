# Cooling layout rules: primary sources (researched 29 Oct 2026)

Method: web fetch of maker, standards-body and government PDFs. Quotes were extracted by a fetch tool that caps each quote at about 120 characters, so long sentences appear in pieces. Page numbers are as reported from the PDF text; check them against the printed page before you cite.
"?" means the value isn't printed in the source. Nothing below is estimated.

---

## 1. Liebert CW: can units sit end to end with no gap?

**Answer: no published permission for the CW181. The guide gives a 0 mm end exception for CW106 and CW114 only, and it says to avoid close spacing.**

Source A: Vertiv, *Liebert CW Thermal Management System Installer/User Guide, 38 to 181 kW (10 to 52 ton), upflow and downflow, 50 Hz and 60 Hz*. No document number is printed in the text; the file name has "sl-18060". Footer: "©2022 Vertiv Group Corp."
URL: https://www.vertiv.com/4966e4/globalassets/shared/for-internal-use-only-cw-38-181-kw-installer-and-user-guide-sl-18060.pdf-unlocked.pdf
Section 3.2 Location Considerations, p. 11:
- "provide approximately 34 in. (864 mm) service clearance on the left, right and in front of the unit whenever possible."
- "The minimum space required for service is 18 in. (457 mm) on the left end, 18 in. (457 mm) on the right end" / "and 24 in. (610 mm) in front of the unit."
- "On downflow and upflow CW106 and CW114 models, left- and right-end minimum clearances are 0 in. (0 mm)" / "except for rear return."
- "Avoid installing units in an alcove or at the extreme end of a room that has a high aspect ratio (long narrow room)."
- "Also avoid installing units too close together."
- "This tends to reduce the effectiveness of the air distribution as compared to units located 30 to 40 ft (9 to 12 mm) apart." (The source prints "mm"; it reads as a typo for m.)
- p. 9: "Install the units as close as possible to the largest heat load."
- The CW181 is not named in the 0 mm exception. No text permits units to be placed side by side or abutting.

Source B: Vertiv, *Liebert CW System Design Catalog* (file liebert-cw-system-design-manual_00.pdf). No SL number is printed in the extracted text. Footer: "©2024 Vertiv Group Corp."
URL: https://www.vertiv.com/globalassets/products/thermal-management/room-cooling/liebert-cw-system-design-manual_00.pdf
Section 4.1, p. 35: the same clearance text and the same CW106/CW114 0 mm exception ("left and right end minimum clearances are 0 in. (0 mm)"), plus "Also avoid installing units too close together" (30 to 40 ft). Air throw, maximum unit-to-load distance and room depth: ?.
CW181 capacity (net, Table 2.3, p. 11; 50 °F entering / 64 °F leaving water): 80 °F DB = 172 kW; 85 °F DB = 210 kW; 90 °F DB (66.1 °F WB) = 246 kW. Table 2.1, p. 7 (45 °F water, 10 °F rise): 80 °F = 249 kW total / 216 kW sensible; 85 °F = 286 / 251 kW. CW181 cabinet dimensions: ? (they are on drawing DPN003208, which isn't in the catalog). Table 2.3 labels one model column "148", not "146", without explanation.

**Firmness:** firm. The guide gives the CW181 a 457 mm minimum at each end. If two units sat side by side, each would need its own end clearance, which comes to 914 mm between them. That last step is a reading of the text, not a printed rule. The "30 to 40 ft apart" text says units placed closer than that give less effective air distribution. It is guidance on spacing, not a hard minimum.

---

## 2. Fan walls / thermal walls (North America)

### Vertiv Liebert CWA / CoolLoop Thermal Wall (best documented; sold in North America)
- Availability: Vertiv EMEA press release, 7 Mar 2023: "is available across Europe, the Middle East and Africa (EMEA), as well as the Americas." / "the Liebert CWA is installed outside the IT space to allow more floorspace in the data centre." https://www.vertiv.com/en-emea/about/news-and-insights/news-releases/vertiv-introduces-new-chilled-water-thermal-wall-to-support-density-and-efficiency-of-large-slab-floor-data-centres-in-emea/
- 60 Hz / listing: *Vertiv CoolLoop Thermal Wall Guide Specifications*, SL-70701_REV_11-25, ©2025. https://www.vertiv.com/4966eb/globalassets/shared/coolloop-thermal-wall-guide-spec_ca80_nam_10102025.pdf
  - 1.2: "Standard 60 Hz units shall be certified to the harmonized U.S. and Canadian product safety standard, UL 1995"
  - 1.4: "All service and maintenance shall be performed through the gallery side of the unit." / "No side access shall be required."
  - 5.1.1: "maintain the manufacturer's recommended clearances" (no value given). Capacity and dimensions: ? in this document.
- Capacity, dimensions: *Vertiv CoolLoop Thermal Wall* brochure, SL-80367 (R11/25), ©2025. https://www.vertiv.com/49a63d/globalassets/shared/vertiv-coolloop-thermal-wall-br-en-na-sl-80367-web.pdf
  - p. 1: "optimized for slab floors and gallery-side mounting."
  - p. 7: CA60 = 360 kW net sensible (up to 400 kW), 60 in long × 120 in wide × 144.3 in high. CA80 = 500 kW, 60 × 156 × 144.5 in.
  - Rating water temperatures: ?. p. 5: return air "up to 45°C" (maximum working temperature).
- Installer guide: *Vertiv Liebert CWA Installer/User Guide, Thermal Wall 50/60 Hz* (file sl-70553_cwa_rev3_03-23), ©2023. https://www.vertiv.com/4a76ae/globalassets/products/thermal-management/room-cooling/vertiv-liebert-cwa-thermal-wall/sl-70553_cwa_rev3_03-23-locked.pdf
  - p. 8: power codes "A = 460/3/60", "B = 575/3/60".
  - p. 10: "Performance data available upon request."
  - p. 12: recommended maximum return air 105 °F (40 °C); recommended minimum return air setpoint 85 °F (29.4 °C).
  - Drawing DPN005165 (Rev B): "1.1m (42 inch) minimum clearance for installation and service access (Data Hall & Gallary Sides)" [sic]; "457mm (18 inch) minimum vertical clearance for service access to unit piping, electrical connections, and return air."
  - **Drawing DPN005179 "Floor Planning for Adjacent Units"** (Rev B): "Gap is measured between frame members of adjacent units." / "Minimum Gap to be filled with gasketing between units that do not have the gravity condensate connection conversion kit." / "Apply 152 mm (6 in) of side clearance when a gravity condensate connection conversion kit is installed." / "Apply minimum 3/4" (19mm) gasketing to horizontal and vertical frame members at top, bottom, gallery side".
  - DPN005036 cabinet dimensions (mm): A 1832, B 1778, C 1834, D 3664, E 1400, F 1524, G 3039. The extracted text doesn't say which letter is width, depth or height, so the axes are ?.
- Density: *Vertiv Liebert CWA Thermal Wall* data sheet, SL-70713 (R11/22), ©2022. https://www.vertiv.com/48edfb/globalassets/products/thermal-management/room-cooling/vertiv-liebert-cwa-thermal-wall/vertiv-liebert-cwa-ds-en-na-sl-70713-web.pdf
  - "Use minimal floor space for units, allowing a maximum of around 400 W/ft2 data hall density," / "as opposed to around 150 W/ft2 for traditional CRAH and around 250 W/ft2 for full face discharge CRAH." This is an operator claim; label it as one.
- EMEA brochure (French), rev 1 01.2023: CA40/CA60/CA80 = 250/350/500 kW at "RAT 36 °C 30 % RH ; E/S eau 20 °C - 32 °C"; dimensions (L × W × H mm) 1480 × 2230/3050/3960 × 3670. This is EMEA data, so don't use it for 60 Hz units. https://www.vertiv.com/4986a5/globalassets/products/thermal-management/room-cooling/vertiv-liebert-cwa-chilled-water-thermal-wall-unit-from-200-to-500kw/vertiv-liebert-cwa-fr-brochure-emea-press_mka4l0ukcwa---rev.-1-01.2023.pdf
- Couldn't read: the Vertiv en-us and en-latam CWA product pages ("not available for your country/region"). I didn't try to get around this.
- Gallery depth (as a dimension of the room): ?. The only figure printed is the 1.1 m service clearance on the gallery side and on the data hall side.

### Schneider Electric Uniflair FWCV / FXCV fan wall
- FWCV product page: "Uniflair front flow chilled water, fan wall 200-500kW"; "Perimeter cooling for medium and large data center and IT environments." https://www.se.com/ae/en/product/FWCV/uniflair-front-flow-chilled-water-fan-wall-200500kw/
- FXCV brochure (130–250 kW, v1.1, 28 Nov 2024): only the listing page could be read. https://www.se.com/uk/en/download/document/FXCV_brochure/
- Environmental profile (PEP, issued 07/2023): FWCV40L2A "Cooling capacity 475,1 kW" at "RAT 37°C/25°C; water 20/30" (p. 3). Caution: the fetch tool returned this PEP when asked for the Room Cooling e-catalog link (download.se.com). Re-check which document it is before you cite it.
- Couldn't read: the FWCV datasheet (blocked by robots.txt), the room-cooling catalog PDF, and anything with 60 Hz, UL/CSA, dimensions or a placement rule. North American availability: ?. No US product page for FWCV was found.

### STULZ CyberWall (US)
- https://www.stulz.com/en-us/products/detail/cyberwall-ahu/ : "355-790 kW Chilled Water System"; "3-Phase/460Vac/60 Hz"; "Designed and manufactured in the USA"; "Front Serviceable".
- Rating conditions, dimensions, certification, service space: ?. The IOM is listed but no link was readable.
- STULZ newsroom: "designed for applications without raised floors."; "Provides uniform cooling along the entire length of the aisle due to the larger area of supply air." Date: ?. https://www.stulz.com/newsroom/detail/new-modular-fan-wall-solution-cyberwall/

### Nortek Data Center Cooling CoilWall
- *CoilWall Series Chilled Water CoilWall* brochure (2024/02 upload; no document number). https://www.nortekdatacenter.com/wp-content/uploads/2024/02/Nortek-DCC-CoilWall-Series-Brochure.pdf
  - CoilWall Base (CWB): "can be installed side-by-side to create an enclosed aisle", separating the data hall from the maintenance aisle.
  - Array (CWA): "placed standalone in the data hall, or can be placed in a separate mechanical room if required."
  - Also: can be "connected modularly into a wall for flooded hall."
  - Capacity, dimensions, rating conditions, certification, maintenance aisle depth: ?. The brochure says: "Please contact your Nortek DCC Sales person".

### Johnson Controls / Silent-Aire
- The Silent-Aire site has no fan wall data sheet. CRAC/CRAHU page: "up to 260 tons" and "between 20,000 and 104,000 CFM"; "can be built to any CEC, NEC or IEC electrical standards". https://www.silent-aire.com/cracsandcrahu/
- JCI reference design article (27 May 2026) lists "Fan coil walls (FCWs)" but gives no specifications. https://www.johnsoncontrols.com/building-insights/feature-story/air-cooled-reference-design-guide

### Munters
- The Modular ChilledWall and fan wall product pages failed to load (site error). The 2025 brochure (Data center-BR-EN-202503) names MCW and fan wall units but prints no capacity, dimensions or placement. https://www.munters.com/globalassets/digizuite/27317-en-data-center-br-en-202503.pdf

### Data Aire
- No fan wall product found. The high-density page says "Data Aire offers computer room air handlers up to 730 kW" and "wall systems are engineered-to-order". https://www.dataaire.com/high-density-data-center-cooling/

**Firmness:** Vertiv is firm. It sells a 60 Hz, UL 1995 unit with gallery-side service and no side access, and units are placed next to each other with only a gasketed gap (DPN005179). Nortek is firm as a placement statement only. Schneider, STULZ, JCI, Munters and Data Aire: specifications are mostly "?".

---

## 3. In-row coolers and rear-door heat exchangers

### Vertiv Liebert CRV (chilled water)
*Liebert CRV System Design Catalog*. No document number is printed in the extracted text. https://www.vertiv.com/48ed92/globalassets/products/thermal-management/in-row-cooling/liebert-crv-row-based-cooling-system-design-manual.pdf
- Capacity (Table 2.14, AHRI 1360 conditions: 95 °F DB / 67.7 °F WB, 45 °F entering / 55 °F leaving water): CR032RC = 28.3 kW, 300 mm wide; CR040RC = 49.5 kW, 600 mm; CR050RC = 73.7 kW, 600 mm. Depth 1100 mm (p. 45). Height: ? in the extracted text (it is on drawings DPN002807 and DPN001791).
- Placement (Appendix E):
  - p. 54: "We recommend that you install the units at the end of rows"; "evenly space CRVs in each row."; aisle width "Target 2 to 6 feet (0.6 to 1.8 m)."
  - p. 56: "We recommend that you oversize the CRV by approximately 20%"; "the cooling unit can effectively distribute air six to seven racks away" (said in the context of significant oversizing).
  - p. 61: containment is "always recommended but not required".
  - p. 2: "All service and maintenance is performed through the front and rear of the unit".
- No fixed rule of one cooler per N racks is printed.
- NA data sheet SL-11998 (R03/23): CRC30 = 32 kW, 300 × 1132 × 2000 mm; CR040 = 40 kW, 600 × 1175 × 2000 mm; "Test Conditions: 37C, 24% Return Air, 10/15C Chilled Water Temp." Most listed SKUs are 400 V, 50 Hz. https://www.vertiv.com/4a2299/globalassets/products/thermal-management/in-row-cooling/vertiv-liebert-crv-row-based-cooling-unit/vertiv-liebert-crv-ds-en-na-sl-11998-web.pdf

### Schneider Uniflair InRow RC
*e-Catalog InRow Cooling 2026*, v1.0.
- pp. 17–19: RC301S = 24 kW, RC331S/P = 40 kW, RC601S/P = 52 kW. Rating: "Capacity at 35°C (95°F) RAT / 11.1°C (52°F) DP, 23.6% RH, 10°C (50°F) EWT / 16.7°C (62.2°F) LWT".
- p. 21: widths 300 / 300 / 600 mm; depth and height ?; 50/60 Hz.
- p. 13: "Placing the unit in the row of racks moves the source of cooling closer to the heat load." No per-N-racks rule is printed.
- Same download.se.com caution as in section 2 applies.
- US product page ACRC301S: "upto 40 kw"; "100-240V, 50/60 Hz". https://www.se.com/us/en/product/ACRC301S/uniflair-inrow-rc-300mm-chilled-water-100240v-50-60-hz/
- The *InRow Chilled Water Technical Specifications Manual* 990-5792 (16 Jan 2026) exists, but its PDF couldn't be read.

### STULZ CyberRow (US)
- https://www.stulz.com/en-us/products/detail/cyberrow-cw-and-dx/ : total capacity "12 – 53" kW; width "12-24" in, depth "42-48" in, height "78" in.
- Rating conditions, frequency, certification and placement rule: ?. The page says only "Easy integration into hot and cold aisle containments".

### Motivair ChilledDoor (Schneider)
*ChilledDoor Rack Cooling System* brochure, ©2025. https://www.motivaircorp.com/uploads/files/brochures/CHILLEDDOOR%20Motivair%20by%20SE.pdf
- Capacity: "Removes up to 75kW per rack". Models run from M4 = 12 kW to M16 = 75 kW. Footnote: "Calculated at 35% RH and 75F Room Temp; Supply Temperature Range 55F - 65F water; 100% water."
- Width 600–800 mm. Depth 14.3–17.5, units not printed (the 2023 brochure prints 13.3–17.5, so the two conflict).
- Certification: "UL/CSA/CE" and "ETL, CSA, CE Certified" (the two listings conflict).
- Placement: "every-rack or every-other-rack configuration" (consult Motivair for every-other-rack); "raised flooring is no longer necessary"; "the user no longer has a need for traditional supplemental cooling solutions" (operator claim).
- 2023 brochure: https://www.motivaircorp.com/uploads/files/brochures/ChilledDoor%20brochure_2023(1).pdf

**Firmness:**
- The CRV placement rules are firm and printed by the maker. There is no N-racks-per-cooler rule; the nearest is "six to seven racks away".
- The RDHx is one door per rack, or every other rack. That follows from the mounting statement and is firm.

---

## 4. Standards-body and government guidance on when to change cooling type

- **DOE FEMP / NREL, *Best Practices Guide for Energy-Efficient Data Center Design*, rev. July 2024, NREL/TP-5R00-89843, DOE/GO-102024-6283** (report numbers from OSTI 2417618). https://www.energy.gov/sites/default/files/2024-07/best-practice-guide-data-center-design.pdf
  - p. 9: "A minimum effective (clear) height of 24 inches should be provided for raised-floor installations."
  - p. 15: "Centralized systems use larger motors and fans that tend to be more efficient."
  - p. 16: "CRAH units can also be installed in or adjacent to a data center."
  - p. 21: rear doors, in-row and overhead coolers are "close-coupled with the IT source."
  - p. 22: densities of 60 kW per compute rack observed in 2013, with HPC "recently surpassing 125+ kW per compute rack".
  - Not in the guide: any kW-per-rack threshold, maximum CRAH throw or room depth, or any mention of fan walls or galleries. Figure 5-2 (air vs liquid transition) values weren't readable in the extracted text.
- **ASHRAE TC 9.9, *Emergence and Expansion of Liquid Cooling in Mainstream Data Centers*, white paper, 2021.** https://www.ashrae.org/file%20library/technical%20resources/bookstore/emergence-and-expansion-of-liquid-cooling-in-mainstream-data-centers_wp.pdf
  - p. 24: "Air flows of a 40 to 50 kW rack could be up to 5000 cfm."; "Floor tile best-in-class is 1900 cfm."; "Rack aisle pitches may need to accommodate additional spacing for RDHXs."
  - p. 9: a "closely coupled coil such as a rear door heat exchanger" can supplement raised-floor cooling.
  - No kW-per-rack table by cooling type. Fan walls aren't mentioned.
- **ENERGY STAR, "Install In-rack or In-row Cooling"** (undated web page). https://www.energystar.gov/products/data_center_equipment/16-more-ways-cut-energy-waste-data-center/install-rack-or-row
  - Room-based systems "designed for 'power densities' on the order of 1-5 kW per rack"; rack-based "up to 60 kW per rack".
  - In the simulation it cites, rack-based systems use much less electricity above about 6 kW per rack. That figure is a paraphrase of the page, not an exact quote.
  - It cites the APC/Schneider 2012 white paper as its source.
- **Schneider White Paper 153, *Implementing Hot and Cold Air Containment in Existing Data Centers*, rev 0** (maker white paper, not a standards body).
  - p. 2: uncontained raised-floor rooms "are typically kept below 6kW/rack average".
  - p. 12: row cooling is used "When more perimeter cooling units cannot be added" and "When raised floor cooling has reached its maximum airflow capacity due to height and or congestion".
  - It was fetched through download.se.com; the cover title and WP number were confirmed in the text.
- Schneider WP 130, *Choosing Between Room, Row, and Rack-based Cooling* (v2, 14 Nov 2012): only the listing page was readable, and the PDF fetch returned WP 153 instead. https://www.se.com/us/en/download/document/SPD_VAVR-6J5VYJ_EN
- Not read: the ASHRAE Handbook (Applications, Ch. 20 Data Centers) is behind a login, so I didn't access it.

**Firmness:** none of the government or standards sources gives a maximum CRAH throw distance or room depth. A density cue does exist: Vertiv's 150 / 250 / 400 W/ft² (maker claim) and ENERGY STAR's 1–5 kW per rack for room systems. A tool rule based on these must be labelled as such.

---

## Possible tool rule (sourced; your decision)
- When perimeter CW181s with the SL-18060 s.3.2 clearances don't fit the load, switch to a gallery thermal wall (Vertiv CWA/CoolLoop).
- Place wall units adjacent with gasketed gaps (DPN005179).
- Service the units from the gallery side, 1.1 m clear on each side (DPN005165).
- Use 360–500 kW per unit, with each unit 120–156 in wide along the wall (SL-80367).
- 60 Hz units are UL 1995 listed (SL-70701).
