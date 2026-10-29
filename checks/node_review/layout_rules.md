# Beyond Data: equipment layout rules (sourced)

Compiled 29 Oct 2026. Primary documents only.

**How the text was read.** Everything was read through a web-fetch tool, which caps each verbatim quote at about 125 characters. Long clauses are therefore given as consecutive exact fragments in "quotes". Anything outside quotes is a paraphrase and is marked [para].

**What couldn't be read.** Direct downloads (curl) were blocked by this session's network policy. The NBC 2020 PDF (publications.gc.ca) sits behind an archive interstitial and could not be fetched. The NFC 2020, BCBC 2024, NBC(AE) 2023 (Alberta), CSA C22.1 (CE Code) full text, NFPA 70/75/76/855 base text, TIA-942 and BICSI 002 are all paywalled, login-gated or unreachable. A "?" means the value isn't printed in what could be read.

**Firmness key**
- CODE: legal requirement (by-law, code or regulation)
- AUTH: provincial safety authority's interpretation of a code
- STD: standard (consensus document, not law unless adopted)
- MAKER: manufacturer's installation requirement
- GUIDE: government guidance
- NOT FOUND: no primary source could be read

---

## 1. Aisles between rack rows; rack front and rear clearance

| Rule | Source | Firmness |
|---|---|---|
| Cold aisle ≥ 1.2 m and hot aisle ≥ 0.9 m (the commonly cited TIA-942 values) | ANSI/TIA-942 (any edition). Not public: tiaonline.org product page gives no figures (https://tiaonline.org/products-and-services/tia942certification/ansi-tia-942-standard/). Only copies found were on Scribd or pdfcoffee, which are excluded. | NOT FOUND (unverified) |
| BICSI 002, ASHRAE TC9.9 aisle widths | No public primary text found | NOT FOUND |
| Containment kits come in standard aisle widths of 1200 and 1800 mm | Vertiv SmartAisle Containment brochure, Doc MKA4L0CATKSE-Rev.2, 04/2024, p. 8 and p. 10. https://www.vertiv.com/globalassets/products/facilities-enclosures-and-racks/racks-and-containment/smartaisle-containment-brochure-english.pdf | MAKER (product range, not a minimum) |
| Containment kits come in aisle widths of 900, 1200 or 1800 mm | Vertiv Aisle Containment System data sheet SL-11422, R03/21. https://www.vertiv.com/globalassets/products/facilities-enclosures-and-racks/racks-and-containment/vertiv-aisle-containment/vertiv-aisle-containment-data-sheet-sl-11422.pdf | MAKER (product range) |
| Rack clearance for installation and service: Table 3.1 values only | Vertiv VR Rack Installer/User Guide SL-11425 REV5 08-24, §3.3, Fig. 3.3, Table 3.1, p. 8. https://www.vertiv.com/globalassets/shared/sl-11425_rev0.pdf | MAKER; mapping of values to sides is "?" |
| Hot/cold aisle orientation | ENERGY STAR; NREL/FEMP Best Practices Guide (rev. July 2024) | GUIDE |

**Quotes**

- **SmartAisle (2024), p. 8.** "Aisle width 1200 and 1800 mm" (listed under "Standard product range:").
- **SmartAisle, p. 10.** "Aisle width (standard dimensions 1200 and 1800 mm +/- 50 mm)".
- **SmartAisle, p. 15 (sliding-door wall-mount).** "For an aisle width of 900 to 1200 mm (± 50 mm)."
- **SL-11422.** "Choose flexible aisle widths of 3ft (900mm), 4ft (1200 mm), or 6ft (1800mm)."
- **SL-11425, §3.3.** Table 3.1 is introduced "for the required clearances for installation and service of the rack and installed equipment."
  - Table 3.1 values (mm): 319/421; 1066/1434; 1087/1456; 610/809. Item 6 is "148° maximum door swing, 3 places".
  - Which value applies to front, rear or side is only shown in the figure: "?".
- **ENERGY STAR, "Move to a hot aisle/cold aisle layout".** https://www.energystar.gov/products/move_hot_aislecold_aisle_layout
  - "Return registers and ducts should be placed above the hot aisle."
- **NREL/FEMP Best Practices Guide (Van Geet and Sickinger, rev. July 2024), p. 10.** https://www.energy.gov/sites/default/files/2024-07/best-practice-guide-data-center-design.pdf
  - "supply cold air exclusively to the cold aisles and pull return air only from the hot aisles".
  - The guide states no aisle widths.

---

## 2. Working space in front of electrical equipment (UPS, switchgear, panels)

**1 m in front, 1.5 m for large or high-voltage gear, plus second exit.** The best public primary paraphrase of CE Code Rules 2-308 and 2-310 is Ontario's Electrical Safety Authority bulletin. It is a provincial authority, but in Ontario, not BC or Alberta. The CE Code Part I is the same national text, adopted in BC with amendments.

| Rule | Source | Firmness |
|---|---|---|
| ≥ 1 m working space with secure footing in front of equipment (Rule 2-308) | ESA (Ontario) Bulletin 2-9-9, "Working space around electrical equipment", issued May 2025 (supersedes 2-9-8). https://esasafe.com/assets/files/esasafe/pdf/Electrical_Safety_Products/Bulletins/2-9-9.pdf | AUTH, paraphrasing a CODE rule |
| Working-space width = greater of 1 m or equipment width | ESA 2-9-9 | AUTH |
| Increase to 1.5 m at ≥ 1200 A or > 750 V where a worker can't leave without passing a failure point; otherwise provide a second exit (Rule 2-310) | ESA 2-9-9; Technical Safety BC IB-EL 2016-05 Rev. 03 (4 Mar 2025, 2024 BC Electrical Code), Section F, p. 5. https://files.technicalsafetybc.ca/v3/assets/bltdec2ded849740f4d/blta76004f5f868765a/67bf6bf887966dc859992d15/IB-EL_2016-05_-_Section_2_-_General_Rules.pdf | AUTH (BC), CODE |
| Headroom 2.2 m for switchboards with exposed bare live parts | ESA 2-9-9 | AUTH |
| Egress path ≥ 750 mm unobstructed | ESA 2-9-9 | AUTH |
| US comparison: 3 / 3½ / 4 ft depth, 30 in width, 6 ft 3 in headroom | 29 CFR 1910.303(g)(1), Table S-1. Read only in the 2002 CFR edition: https://www.govinfo.gov/content/pkg/CFR-2002-title29-vol5/html/CFR-2002-title29-vol5-sec1910-303.htm. The current osha.gov page was blocked. NEC 110.26 itself was not read (NFPA login). | CODE (US; old edition) |

**Quotes**

- **ESA 2-9-9, Q&A 2.** "a minimum working space of 1 m (39") with secure footing be provided".
- **ESA 2-9-9, depth.** "1 m plus depth of all draw-out parts of the equipment."
- **ESA 2-9-9, width.** "at least 1 m in width or the width of the panelboard, whichever is greater."
- **ESA 2-9-9, Note 2, Rule 2-310 2).** "requires the minimum working space" [to increase from 1 m to 1.5 m] [para].
  - "at or above 1200 amps (regardless of operating Voltage)"
  - "Above 750 volts (regardless of Amperage rating)"
  - Applies if a person "can NOT leave the space without passing a potential failure point on path to exit."
- **ESA 2-9-9, second exit.** "a second exit (or more if needed) in the room in different locations shall be provided".
- **ESA 2-9-9, egress width.** "Unobstructed width of egress shall be not less than 750 mm in width."
- **ESA 2-9-9, headroom.** "a headroom of 2.2 m is the minimum required."
- **TSBC IB-EL 2016-05, Section F.**
  - "Rule 2-310 states that any additional clearance requirement for electrical equipment is determined by the nameplate rating"
  - "requires additional clearance regardless of the existing O/C installed."
  - "the 1200A nameplate shall determine the electrical room layout and clearance requirements."
  - "Where the equipment layout cannot comply, the working space shall be increased to 1.5M."
  - The goal is to "permit workers to leave the room or area without passing any failed equipment."
  - This bulletin does not itself print the 1 m figure.
- **29 CFR 1910.303(g)(1) (2002).**
  - Table S-1: 0–150 V = 3 / 3 / 3 ft; 151–600 V = 3 / 3½ / 4 ft (conditions a / b / c).
  - "workspace may not be less than 30 inches wide in front of the electric equipment."
  - Headroom "shall be 6 feet 3 inches."

---

## 3. Must UPS, batteries and distribution be in separate rooms? Fire separations

**Vancouver: Vancouver Building By-law 2019, Division B, 3.6.2.** These Part 3 provisions follow the NBC numbering. The NBC 2020 text itself was not readable. https://free.bcpublications.ca/civix/document/id/public/vbbl2019/2046477372

| Rule | Firmness |
|---|---|
| Electrical equipment that the Electrical Safety Regulation requires to be in a service room goes in a service room with a 1 h fire separation (3.6.2.1.(6)). The trigger comes from electrical rules; a UPS is not named. | CODE |
| Electrical equipment vault: solid masonry or concrete, 3 h unsprinklered or 2 h with automatic extinguishing (3.6.2.7.(2)) | CODE |
| Vault floor liquid tight, with walls or sills ≥ 100 mm [para] (3.6.2.7.(8)) | CODE |
| Service room may also hold "other service equipment such as electrical service equipment" (3.6.2.3.(1)) | CODE |

**Quotes (VBBL 2019)**

- **3.6.2.1.(6).**
  - "Electrical equipment that is required to be located in a service room according to the Electrical Safety Regulation shall"
  - "be installed in a service room separated from the remainder of the building by a fire separation"
  - [para] with a fire-resistance rating not less than 1 h.
- **3.6.2.7.(2).**
  - "3 h if the vault is not protected by an automatic fire extinguishing system,"
  - "2 h if the vault is protected by an automatic fire extinguishing system."
- **3.6.2.7.(3).** "If a building is sprinklered throughout, an electrical equipment vault referred to in Sentence (1) need not be sprinklered"
  - Condition: "the vault is designed for no purpose other than to contain the electrical equipment, and" [para] smoke detection is tied to the fire alarm.
- **Same wording in BCBC 2018** (3.6.2.1.(6) and 3.6.2.7.(2)). https://free.bcpublications.ca/civix/document/id/public/bcbc2018/bcbc_2018dbp3s36
- **Batteries and ESS.** No article on battery or ESS rooms appears in VBBL 2019 or BCBC 2018 Section 3.6.

| Rule | Source | Firmness |
|---|---|---|
| Which CE Code rules force a service room or vault (e.g. oil-filled transformers, Section 26) | CSA C22.1 not public | NOT FOUND |
| NFC 2020 provisions for stationary Li-ion battery systems; kWh thresholds | NFC 2020 PDF not readable | NOT FOUND (unverified whether NFC 2020 has any) |
| NFPA 855 room thresholds (kWh) and fire-rated ESS rooms | Base text paywalled. Only the public TIAs were read (see item 4). | NOT FOUND |
| NFPA 75 (ITE room 1 h separation) and NFPA 76 | Only paywalled or secondary sources found | NOT FOUND |
| TIA-942 room types (computer room, electrical, battery) | Not public | NOT FOUND |
| NBC classification statement for data centres | None found. BCAB #1513 (2000) classed a computer-training business as Group D; not a data centre. | NOT FOUND |

---

## 4. Li-ion UPS battery cabinet spacing

| Rule | Source | Firmness |
|---|---|---|
| ESS units separated ≥ 3 ft (914 mm) unless fire and explosion testing shows less is adequate | NFPA 855, 2023 ed., §15.3.1 as revised by TIA 23-1 (issued 25 Aug 2023, effective 14 Sep 2023). https://docinfofiles.nfpa.org/files/AboutTheCodes/855/TIA_855_23_1.pdf. Scope of Chapter 15 not printed in the TIA ("?"). | STD (law only where adopted; adoption in BC/AB "?", not checked) |
| Lead-acid and NiCd standby batteries with UL 1778 UPS: no UL 9540A needed | NFPA 855-2023 §15.13.1.2 (TIA 23-1). Does not cover Li-ion. | STD |
| Rooftop ESS units 3 ft apart (>20 kWh context) | NFPA 855-2023 §9.5.3.1.1.2 (TIA 23-2). https://docinfofiles.nfpa.org/files/AboutTheCodes/855/TIA_855_23_2.pdf. Rooftop only. | STD |
| EnergyCore Lithium 5 clearances: front 914 mm, top 457 mm, rear 25 mm; none side-to-side or back-to-back (102 mm back-to-back if seismic mount); tested to UL 9540A | Vertiv EnergyCore Lithium-Ion Battery Cabinet Installation and Operation Manual SL-71251, ©2026, §5.2 Table 5.1 p. 36, §5.3 p. 39, §1.1 p. 1. https://www.vertiv.com/4a50af/globalassets/shared/vertiv-energycore-lithium-ion-battery-cabinet-installation-and-operation-manual-sl-71251.pdf | MAKER |
| Galaxy VX: against wall, no rear or side access; front and top values "?" (figure only) | Schneider Galaxy VX UPS with 1500 kW I/O Cabinet Installation, 990-5783J-001, 11/2024, p. 39. https://www.productinfo.schneider-electric.com/galaxyvx_ul/5ac775e546e0fb00011d8257/990-5783D%20Galaxy%20VX%201500%20kW%20Installation/English/990-5783J_EN.pdf. Same section exists for 1250 kW in 990-6264F-001 p. 46; values not extractable. | MAKER |

**Quotes**

- **NFPA 855 §15.3.1.** "Individual ESS units shall be separated from each other by a minimum of 3 ft (914 mm) unless"
  - "smaller separation distances are documented to be adequate based on fire and explosion testing complying with 9.1.515.13."
  - Text as printed in the TIA, including its strike/insert artefact.
- **§15.13.1.2.**
  - "Lead-acid and nickel-cadmium batteries used in standby power systems and listed to UL 1973 shall not require"
  - "UL 9540A testing when installed with a charging system listed to UL 1012, UL 60950-1, or UL 62368-1,"
  - "or a UPS listed to UL 1778."
- **TIA 23-2.** "Each ESS unit shall be spaced a minimum of 3 ft (0.9m) from other units, except as provided in 9.5.3.1.1.3 (6)."
- **Vertiv SL-71251, Table 5.1.**
  - Front: 36 in (914 mm) to any obstruction [para].
  - Above: 18 in (457 mm) [para].
  - "1 in. (25.4 mm) clearance is required between the cabinet and the wall."
  - "Between two cabinets(or to other equipment frame)side to side. None"
  - Back to back: "Standard mounting: None." / "Seismic rated mounting: 4 inches(102 mm)."
- **SL-71251, §5.3.** "No clearance needed cabinet to cabinet."
- **SL-71251, §1.1.** "This product wastested in accordance with UL 9540A" (spacing as extracted).
  - The manual does not mention NFPA 855.
  - Cabinet: 600 W × 750 D × 2000 H mm (App. D).
- **Schneider 990-5783J, p. 39.**
  - "Clearance dimensions are published for airflow and service access only."
  - "Consult with the local safety codes and standards for additional requirements in your local area."
  - "The UPS system can be placed up against a wall with no requirement for rear or side access."

---

## 5. CRAH (Liebert CW181) placement and service clearance

**Source.** Vertiv Liebert CW Thermal Management System Installer/User Guide, 38–181 kW (10–52 ton), ©2022, §3.2 Location Considerations, p. 11. https://www.vertiv.com/4966e4/globalassets/shared/for-internal-use-only-cw-38-181-kw-installer-and-user-guide-sl-18060.pdf-unlocked.pdf

- The URL contains "for-internal-use-only", but the file is hosted openly on vertiv.com.
- The document number is not printed in the text ("?").
- The CW181 is not named separately in the clearance text.

| Rule | Firmness |
|---|---|
| Recommended: about 864 mm (34 in) left, right and front | MAKER |
| Minimum: 457 mm left end, 457 mm right end, 610 mm front; rear "?" (not stated) | MAKER |
| Avoid alcoves and the extreme end of long narrow rooms; avoid units too close together; units 30–40 ft (9–12 m) apart | MAKER (guidance) |
| CRAH "at the ends of hot aisles / perpendicular to rows" | NOT FOUND in any primary source read (Vertiv CW manuals, NREL/FEMP guide, ENERGY STAR, Schneider community page) |

**Quotes (Liebert CW 38–181 kW guide)**

- **Recommended clearance.** "For downflow and upflow units, provide approximately 34 in. (864 mm) service clearance"
  - "on the left, right and in front of the unit whenever possible."
- **Minimum clearance.** "The minimum space required for service is 18 in. (457 mm) on the left end, 18 in. (457 mm) on the right end"
  - "and 24 in. (610 mm) in front of the unit."
- **Room shape.** "Avoid installing units in an alcove or at the extreme end of a room that has a high aspect ratio (long narrow room)."
- **Spacing.** "Also avoid installing units too close together."
  - "30 to 40 ft (9 to 12 mm) apart". The "mm" is a typo for metres as printed.
- **Larger models, for comparison.** Liebert CW 305–415 kW guide (©2026): https://www.vertiv.com/globalassets/products/thermal-management/room-cooling/sl-70374_rev1.pdf
  - Install "as close as possible to the largest heat load".
  - "Clearance of 36" (914mm) is required during installation on side with electrical compartment."
- **NREL/FEMP (2024), p. 13.** "Deeper plenums and careful layout of CRAC/CRAH units". No specific geometry is given.

---

## 6. Egress in the computer room

**Vancouver: VBBL 2019, Div. B Part 3, consolidated to 1 Jul 2024.**
- Section 3.4: https://free.bcpublications.ca/civix/document/id/public/vbbl2019/463712062
- Section 3.3: https://free.bcpublications.ca/civix/document/id/public/vbbl2019/758782467
- Edmonton (NBC(AE) 2023) not read. NBC 2020 wording is likely parallel but unverified.

| Rule | Firmness |
|---|---|
| ≥ 2 exits per floor area (exceptions for small, low buildings) (3.4.2.1.(1)) | CODE |
| Travel distance to an exit: 30 m (not sprinklered, D or F2/F3), 45 m if sprinklered throughout (3.4.2.5.(1)(c),(f)). The by-law doesn't name D or F here; the clauses apply by elimination. | CODE |
| Room needs 2 egress doorways if occupant load > 60, or by area or travel limits (3.3.1.5). Unsprinklered: D 200 m² / 25 m; F2 150 m² / 10 m; F3 200 m² / 15 m. Sprinklered: > 25 m travel, or area > D 300 m², F2 200 m², F3 300 m². | CODE |
| Public corridor ≥ 1100 mm (3.3.1.9.(1)) | CODE |
| Dead-end corridor ≤ 6 m (3.3.1.9.(7)) | CODE |
| Exit corridors and passageways ≥ 1100 mm (Table 3.4.3.2.-A, Groups A, B1, C, D, E, F) | CODE |
| No obstruction narrowing a normal means of egress below 750 mm (3.3.1.23) | CODE |
| Aisles per the Fire By-law (3.3.1.10.(1)); Vancouver Fire By-law not read | CODE (value "?") |
| Service spaces > 200 m² or > 25 m travel need 2 egress points (3.3.1.3.(10)) [para] | CODE |
| Data centre occupancy classification | NOT FOUND (no public NBC statement) |

**Quotes (VBBL 2019)**

- **3.4.2.1.(1).** "Except as permitted by Sentences (2) to (4), every floor area intended for occupancy shall be served by at least 2 exits."
- **3.4.2.5.(1).**
  - "Except as permitted by Sentences (2) and 3.3.2.5.(6), if more than one exit is required from a floor area,"
  - "the exits shall be located so that the travel distance to at least one exit shall be not more than"
  - (c) "45 m in a floor area that contains an occupancy other than a high-hazard industrial occupancy" / "provided it is sprinklered throughout,"
  - (f) "30 m in any floor area other than those referred to in Clauses (a) to (e)."
- **3.3.1.5.(1).**
  - "a minimum of 2 egress doorways located so that one doorway could provide egress"
  - (b) "intended for an occupant load more than 60,"
  - (d)(i) "the travel distance to an egress doorway is more than 25 m, or"
  - (d)(ii) "the area of the room or suite is more than the value in Table 3.3.1.5.-B."
- **Table 3.3.1.5.-A.** "Group D 200 25" · "Group F, Division 2 150 10" · "Group F, Division 3 200 15".
- **Table 3.3.1.5.-B.** "Group D 300" · "Group F, Division 2 200" · "Group F, Division 3 300".
- **3.3.1.9.(1).** "The minimum width of a public corridor shall be 1 100 mm."
- **3.3.1.9.(7).** "a dead-end corridor is permitted provided it is not more than 6 m long".
- **Table 3.4.3.2.-A.** "Group A, Group B, Division 1, Group C, Group D, Group E, Group F 1 100 1 100 900(1) 1 100(2) 800"
  - Columns: Exit Corridors and Passageways / Ramps / Stairs / Doorways, mm.
- **3.3.1.23.**
  - "No obstruction shall be permitted in any occupancy that would restrict the width of a normal means of egress"
  - "from any part of a floor area to less than 750 mm"
- **3.3.1.10.(1).** "Except as otherwise stated in this Section, aisles shall be provided in conformance with the Fire By-law."

---

## 7. CDU placement and clearance

| Rule | Source | Firmness |
|---|---|---|
| CoolChip CDU 70: 1000 mm front and rear, 500 mm top; sides "?"; cabinet 600 W × 1200 D × 2300 H mm | Vertiv CoolChip CDU 70 Application and Planning Guide SL-80015 REVA 03-25, §4.1 p. 16, Table 4.1 p. 15. https://www.vertiv.com/49002d/globalassets/shared/vertiv-coolchip-cdu-70-application-and-planning-guide-sl-80015.pdf | MAKER |
| CoolChip CDU 600: > 36 in (915 mm) front and rear; 36 in above; sides "?"; cabinet 600 × 1200 × 2000 mm; ≥ 500 mm under-floor clear for bottom pipework | Vertiv CoolChip CDU 600 Installation and Commissioning Guide SL-07625 REVC 08-25, §5.1 p. 20. https://www.vertiv.com/4a689f/globalassets/shared/vertiv-coolchip-cdu-600-installation-and-commissioning-guide-sl-07625.pdf | MAKER |
| Do not place a CDU above water-sensitive equipment | Both Vertiv guides | MAKER |
| Motivair MCDU clearances | Not printed in the CDU Brochure 2023 (dimensions only). https://www.motivaircorp.com/uploads/files/brochures/CDU_Brochure_2023.pdf. No installation manual found publicly. | NOT FOUND |

**Quotes**

- **SL-80015.** "Leave 1000 mm (39.4 in) at the front and rear of the unit" … "500 mm (19.7 in) at the top of the unit".
- **SL-07625.** "Space must be allowed at the front and rear of the unit in excess of 36 in. (915mm)".
  - "Ensure 36 in. (913.4 mm) clearance above unit for service to the power termination enclosure."
- **Placement.** Neither Vertiv guide addresses row, gallery or distance-to-rack placement.
- **Motivair MCDU 40/50 (brochure).** 80-1/4" H × 60-1/4" L × 35-1/2" W.
