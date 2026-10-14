# 16 · Data-centre component sizing standard (0.1–40 MW IT), with sources

Hunt 16, 14 Oct 2026. For the "Beyond Data" tool: what room each component needs on a parcel or in a building, and how that room scales with IT load.

**How to read this file**
- **Status labels.** SOURCED = read today in a code, standard, government or lab report, peer-reviewed paper or public municipal or regulator record. MANUFACTURER CLAIM = a product data sheet. OPERATOR CLAIM = the operator's own figure. NEEDS STANDARD = the governing document is paywalled and only a public statement about it was read. UNVERIFIED = no acceptable source was found.
- **"Derived"** means my arithmetic on a sourced figure. The arithmetic is shown each time so it can be checked. A derived figure carries the status of its input.
- **Footprints are equipment only** unless stated otherwise. Service, maintenance and code clearances come on top, and I found no single source for them (see Gaps).
- **Security** is described only as a generic space allowance, per the tool's rules.
- Units are SI, with the source's own units in brackets where it used imperial.

---

## 1. Summary table

| # | Component | What scales it | Sizing rule or range (as found) | Units | Source id(s) | Status |
|---|---|---|---|---|---|---|
| 1 | Utility service: BC Hydro primary | Connected load (MVA), area voltage | Primary = >750 V to 34.5 kV. Above **6.5 MVA (12.5 kV area) or 13 MVA (25 kV area)**, a two-feeder "dual supply" may be required. Supply at **≥60 kV** falls under the separate transmission requirements. The customer owns the transformers. | MVA, kV | S1 | SOURCED |
| 2 | Utility service: EPCOR (Edmonton) | Demand per building | Primary-metered service typical where "demand load will exceed **2,500 kVA** to one building". Clearances: transformers **3.0 m in front of doors, 2.0 m other sides**; switching cubicles **3.0 m all sides**; equipment beside a **4.6 m access road in a 6.5 m clear strip**, 5.0 m vertical clearance | kVA, m | S2 | SOURCED |
| 3 | MV switchgear room (customer side) | Number of feeders and transformers | Room size not given in a public source. BC Hydro defers vault layout to its civil standards ES54 (not read). UFC 3-540-01 gives ≥30 in (0.76 m) working clearance around a withdrawn breaker. | m² | S1, S8 | UNVERIFIED (area); SOURCED (one clearance, US DoD) |
| 4 | Distribution transformers | MVA ≈ IT MW ÷ pf, plus mechanical load, × redundancy | BC Hydro flags customer transformers **>2 MVA** for inrush review. Example: one "2.5 MVA unit substation" for 2.4 MW IT (eStruxture VAN-1). No public pad-mount dimension table was found. | MVA | S1, C-list | SOURCED (threshold); OPERATOR CLAIM (example); UNVERIFIED (dimensions) |
| 5 | UPS modules | IT MW × redundancy (N+1, 2N) | 1,000–1,200 kVA module: **2.65 × 0.91 × 2.01 m, 2,117 kg**; 0.6 m overhead clearance; 43.5 kW heat at 1,200 kVA. **Derived: ≈2.0–2.4 m² per MW of module**, before clearances and battery. | m², kg | S9 | MANUFACTURER CLAIM |
| 6 | UPS batteries: Li-ion | Runtime (min) × MW; power limit per cabinet | One cabinet: **38 kWh, 207 kW max, 0.60 × 0.725 × 2.02 m, 585 kg**. Vendor claims **70 % less space and 60 % less weight than VRLA**. **Derived: ≥5 cabinets (≈2.2 m², ≈2.9 t) per MW**, set by the power limit, not by energy, for a 5-minute runtime. | kWh, m², kg | S10 | MANUFACTURER CLAIM |
| 7 | Battery rooms: fire and code | kWh per fire area | NFPA 855: Li-ion threshold **20 kWh**; max **600 kWh per fire area**; groups ≤50 kWh with 3 ft (0.9 m) spacing unless UL 9540A data justify less. Adoption in BC or Alberta is **not shown** (see 15d §1.4). | kWh, m | S11, S12, 15d | NEEDS STANDARD (US standard; not shown to be BC or AB law) |
| 8 | Backup generators: count and rating | IT MW + mechanical MW, × redundancy | Uptime Tier III/IV: gensets must carry the full design load with **no runtime limit** (continuous or DCC rating; standby rating only allowed at Tier I/II). Built Alberta examples run **2–3.5 MW per unit** (see §3). | MW per unit | S5, S6, S7, C1–C4 | SOURCED (Uptime statements); regulator records for counts |
| 9 | Generator footprint and weight | Number of units | 2,500 ekW open set: **6.80 × 2.34 × 3.00 m, 17,590 kg dry**. **Derived: ≈6.4 m² per MW of genset**, before enclosure, clearance or yard. | m², t | S13 | MANUFACTURER CLAIM |
| 10 | Generator room in a building | — | Vancouver: emergency generator room separated by a fire separation of **≥2 h** (VBBL 3.6.2.8.(1)), installed to CSA C282 | h | S14 | SOURCED (Vancouver) |
| 11 | Fuel storage | Hours of autonomy × generator MW | Fuel burn **656.8 L/h at 2,500 ekW (0.263 L/kWh)**. **Derived: ≈263 L per MW-hour, so 3.2 m³/MW for 12 h, 6.3 m³/MW for 24 h, 12.6 m³/MW for 48 h.** Uptime: **12 h minimum on site for all Tiers**. UFC 3-540-01 (US DoD): **7 days**. NFPA 110 classes: NEEDS STANDARD. Built: two 4,000 US gal (2 × 15.1 m³) tanks, 175 W Cordova; 2,400 m³ at a 129-genset campus | L, m³, h | S13, S5, S8, 11_vancouver_permits, C6 | SOURCED + MANUFACTURER CLAIM (burn) |
| 12 | Exhaust stacks | Number of gensets; air-quality dispersion | No code minimum. Height is set by the dispersion study (UFC 3-540-01). Built: **9.4–33 m** (UK and Irish filings) | m | S8, C6–C9 | SOURCED (filings) |
| 13 | PDUs, RPPs, busway | Rack count, kW per rack | No public sizing rule found. FEMP/NREL describes efficiency only. | m² | S3 | UNVERIFIED |
| 14 | Racks | Count = IT kW ÷ kW per rack | OCP ORv3 rack **0.60 × 1.068 × 2.286 m, 1,600 kg static**. Busbar options 30, 60, 140, 190 kW | m, kg, kW | S17 | MANUFACTURER CLAIM |
| 15 | Rack density | Workload type | Survey average **8 kW/rack (7.1 without >50 kW outliers)**; most common 4–6 kW; 15–29 kW tops increasingly common; a few ≥100 kW. HPC liquid-cooled racks "125+ kW". AI servers 10–12 kW per 8-GPU server. | kW/rack | S15, S3, S16 | SOURCED (industry survey + DOE/NREL + LBNL) |
| 16 | White space per rack (incl. aisles) | Layout, density | LBNL/EnergyPlus prototypes: **derived ≈3.7–13.9 m²/rack** (40–150 ft²) | m²/rack | S18 | SOURCED (model inputs, peer-reviewed; derived) |
| 17 | White space per MW IT | kW/m² | Prototypes 430–5,382 W/m², i.e. **≈186–2,325 m²/MW**. Built (operator claims): **≈290–700 m²/MW**. | m²/MW | S18, C-list | SOURCED (model); OPERATOR CLAIM (built) |
| 18 | Ratio of white space to gross floor area | Storeys, plant inside or outside | Built: **≈48–87 %** (public plans and operator claims, §3) | % | C5, C10, C-list | SOURCED (plans) + OPERATOR CLAIM |
| 19 | Gross building area per MW IT | All of the above | Built: **≤290 m²/MW** (Vancouver 111 E 5th, applicant MW ÷ staff FSR estimate) to **≈1,580 m²/MW** (Cologix VAN4, operator) | m²/MW | C11, C-list | SOURCED (council) / OPERATOR CLAIM |
| 20 | Floor-to-floor and clear height | Raised floor, overhead services, cooling type | Prototype: **4 m room height + 0.6–0.8 m raised floor**. FEMP: ≥24 in (0.61 m) clear raised-floor height. Built: **≈6.0 m** (Burlington, 2-storey) up to **12.9 m** (single-storey halls). Operator: 5.8–7.6 m ceilings (eStruxture CAL-1). | m | S18, S3, C5, C7, C10 | SOURCED + OPERATOR CLAIM |
| 21 | Floor live load: office (code) | Storey | **2.4 kPa above first storey; 4.8 kPa basement and first storey**. Office row **excludes computer rooms**. **3.6 kPa** for equipment areas and service rooms (generator rooms, transformer vaults). Read in the Ontario Building Code Table 4.1.5.3. The NBC 2020 table itself was **not read** (blocked). | kPa | S19 | SOURCED (OBC); NBC/BCBC NEEDS CHECK |
| 22 | Floor live load: data hall | Rack weight, cooling type | Not in NBC. US DoD UFC 3-301-01: **150 psf (7.2 kPa)** for IT server spaces. ASCE 7: 100 psf (4.8 kPa) access floor. TIA-942 Rated-3: **12 kPa (250 lbf/ft²)** "should". High density (Intel 2012): **350 psf (16.8 kPa)**. ORv3 rack static load over its own footprint: **derived ≈24.5 kPa** | kPa | S20, S21, S17 | NEEDS STANDARD (TIA, UFC table not read directly) |
| 23 | Air cooling: CRAH/CRAC, fan walls | Heat load kW | Example: 8 × 165 kW and 20 × 250 kW units, N+1. Footprint per kW: UNVERIFIED | kW/unit | C-list (eStruxture CAL-1) | OPERATOR CLAIM |
| 24 | Liquid cooling: CDU | Liquid-cooled kW | 2,300 kW CDU: **1.2 × 1.2 × 2.4 m, 1,793 kg wet**. **Derived: ≈0.63 m² per MW** | m², kg | S22 | MANUFACTURER CLAIM (preliminary) |
| 25 | Air-cooled chillers | Heat rejected (≈ IT + losses) × redundancy | 300–850 TR (1.05–2.99 MW) units: **27–52 m², 14.5–22.7 t**. **Derived: ≈17–26 m² per MW** (unit only) | m²/MW | S23 | MANUFACTURER CLAIM |
| 26 | Cooling towers (open, wet) | Heat rejected | 652 nominal tons (≈2.87 MW): **3.61 × 6.58 m, 11.5 t operating**. **Derived: ≈8.3 m² per MW**. Uses make-up water. | m²/MW | S24 | MANUFACTURER CLAIM |
| 27 | Dry coolers | Heat rejected; fluid vs air temperature | 737.6 kW at 32 °C air, 48→42.7 °C fluid: **7.53 × 2.40 m, 1.87 t**. **Derived: ≈24.5 m² per MW** at warm (liquid-cooling) water temperatures. Area grows steeply at lower water temperatures (UNVERIFIED factor). | m²/MW | S25 | MANUFACTURER CLAIM |
| 28 | Adiabatic / hybrid | — | NREL ESIF thermosyphon hybrid cut tower make-up water by **56 %** (4,650 m³/yr) at ~0.9–1 MW IT. No footprint given. | m³/yr | S26 | SOURCED (lab) |
| 29 | Heat recovery: heat pumps | Heat exported (MWth) | 1,948 kW heating at 30 °C source / 75 °C supply: **4.85 × 1.35 × 2.2 m, 8.8 t**. **Derived: ≈3.4 m² per MW heat** (unit only). ORNL: a 1 MW high-temperature heat pump case to 85 °C, COP ≈3.3 (verify). | m²/MW | S27, S28 | MANUFACTURER CLAIM; SOURCED (lab) |
| 30 | Heat exchangers for export | MWth | No footprint source found. FEMP: closed-loop water-side heat exchangers reach a <3 °F (1.7 K) approach. | — | S3 | UNVERIFIED (size) |
| 31 | Gas fire suppression | Protected room volume | Inert-gas cylinders: 80 L (0.267 m dia × 1.88 m, 126.6–136.1 kg full) or 140 L (0.36 × 1.865 m, 255.9 kg). Cylinders per m³ need NFPA 2001 / ISO 14520 design concentration (not read). | units/m³ | S29 | MANUFACTURER CLAIM; NEEDS STANDARD |
| 32 | Pre-action sprinklers; IT room fire separation | — | NFPA 75: IT rooms separated from other occupancies by **≥1 h** (secondary summary). Sprinklers required in sprinklered buildings. | h | S30 | NEEDS STANDARD |
| 33 | Network / meet-me room | Carriers, racks | Built example: "Electrical/Network Room" of **115–128 m²** per floor (Burlington). TIA-942 entrance-room sizing not read. | m² | C5 | SOURCED (one plan); NEEDS STANDARD |
| 34 | Support (loading, storage, office, staff) | Building size, not MW | Built: office 100–603 m²; loading/garbage 45 m²; storage 18.6–40 m². Staff: ~40 per 24 h (15,274 m² campus); ~29 on site at once (28 MW). | m², persons | C5, C7, C9 | SOURCED (plans, inspector and committee reports) |
| 35 | Redundancy | Tier or class | Uptime: Tier I = N; Tier II = N+ (redundant components); Tier III = N+1, concurrently maintainable, for "each and every component and path"; Tier IV = fault tolerant. 2N is not defined in the public Uptime text read today. | multiplier | S6, S5 | SOURCED (Uptime public text) |
| 36 | Noise (siting only) | Plant Lw, distance, zone limits | See 08_plant_sound_power.md (Lw by plant class) and 14_deep_dive (Vancouver: generator testing ≤80 dBA, ≤60 min per month). | dBA | 08, 14 | see those files |
| 37 | Security (generic allowance) | — | EN 50600 has up to 4 protection classes, and "at least 3" are required for unauthorised access. A guard room, setback and fence are allowances only; no sizing source found. | — | S31 | SOURCED (classes exist); UNVERIFIED (areas) |

---

## 2. Evidence by component

### 2.1 Utility service, substation and MV switchgear

- **BC Hydro, *Primary Guide* R4 (issued 2025-02-20, effective 2025-06-30) [S1]**
  - Definitions: primary voltage is "greater than 750 V and up to 34.5 kV"; "Primary service dual supply: Two feeder supply required by large loads (exceeding 6.5 MVA in a 7.2/12.5 kV area or exceeding 13.0 MVA in a 14.4/25 kV area)" (s. 2; repeated s. 3.3(e)).
  - "Dual radial and double dual radial service connections are no longer available for new construction" (s. 3.3).
  - "The customer shall supply and install required customer-owned transformers for primary voltage service" (s. 6.2.1).
  - Customer transformers "larger than 2 MVA" may need inrush mitigation (s. 5.1.1(b)). s. 6.2.5 gives **no** numeric maximum transformer size.
  - Supply at 60 kV and above follows BC Hydro's separate *Technical Interconnection Requirements for Transmission Voltage Customers* (s. 1, note 1; not read).
  - Vault clearances are in s. 8.3 and the ES54 civil standards; **not reached**.
  - **Tool use:** 0.1 to about 13 MVA can be a 25 kV primary service. Above about 13 MVA, expect dual feeders, and toward the top of the 0.1–40 MW range, a transmission-voltage customer substation. Where that switch happens is **not stated** as a number; it is decided by BC Hydro study (see 02_grid_capacity.md).
  - Vancouver precedent: RTS 19744 (111 E 5th, 40 MW) condition 1.16: "BC Hydro service to the site to be primary…" [C11].
- **EPCOR (EDTI), *Customer Connection Guide*, effective 1 Aug 2025 [S2]**
  - Primary-metered service is typical where "the demand load will exceed 2,500kVA to one building" (Table 3.1).
  - Clearances (s. 3.10.3(e)): "Transformers: 3.0m in front of doors, 2.0m on other sides (including driveways)"; "Switching Cubicles: 3.0m on all sides".
  - Access (s. 3.16(d)–(e)): "Equipment must be placed beside a 4.6m wide access roadway that is centred in an unimpeded 6.5m wide area"; ≥5.0 m vertical clearance.
  - Transmission (72/240 kV) thresholds were **not** in the part read.
- **MV switchgear room area:** no Canadian public source found. The only numeric clearance read today: "Provide a minimum of 30 inches' working clearance around each circuit breaker when in its withdrawn position" (UFC 3-540-01, s. 2-5.4.3) [S8]. CSA C22.1 working-space rules: NEEDS STANDARD.

### 2.2 Transformers

- Threshold: BC Hydro reviews customer transformers above 2 MVA [S1].
- Efficiency, not size: "A dry-type transformer with a 176°F temperature rise uses 13% to 21% less energy than a 302°F rise unit" (FEMP/NREL 2024, p. 26) [S3].
- Dimensions: the City of Columbus pad-mount specification TDMIS-9072 (rev. 11/2019) was read but gives **no** dimensions or weights; its standard ratings stop at 2,500 kVA. Radiators may not extend more than 24 in beyond the tank (s. 3.10(d)). **UNVERIFIED:** a dimension and weight table for 2–3 MVA liquid-filled pad-mounts.
- Operator example: eStruxture VAN-1, "dedicated 2.5MVA unit substation" for "2.4Mw critical IT load" (OPERATOR CLAIM; Hunt 01).

### 2.3 UPS and batteries

- **UPS module [S9]** (Vertiv Liebert EXL S1, Site Planning Data SL-26092 rev 8-11-21; MANUFACTURER CLAIM)
  - Base 1,000/1,100/1,200 kVA module: "104.5 x 36.0 x 79.1 in (2654 x 914 x 2009 mm)", "4667 lb (2117 kg)". With options, up to 6,523 lb (2,959 kg).
  - Heat at full load: 120,091 / 132,100 / 148,502 BTU/h, i.e. 35.2 / 38.7 / 43.5 kW (derived ÷ 3,412). Airflow 6,700 cfm.
  - "Minimum overhead clearance is 2 ft. (0.6m) above the UPS"; no front or rear clearance given.
  - **Derived:** 2.43 m² per 1.0–1.2 MW, about 2.0–2.4 m²/MW of module. Multiply by the redundancy factor (§2.15).
- **UPS efficiency and loading [S3]:** "95% or higher in 2023". Redundant single-large-UPS designs give "very low load factor operation, at best no more than 50% at full design buildout" (FEMP/NREL 2024, p. 25).
- **Li-ion cabinet [S10]** (Vertiv HPL, SL-70383 R02/21; MANUFACTURER CLAIM)
  - "38kWh (207kWb/cabinet)"; 600 × 725 × 2,020 mm (axis order not labelled); 585 kg; operating 22–30 °C.
  - Versus VRLA: "Saves space 70%", "60%" lighter, replacement "10-15 years" vs "3-5 years".
  - **Derived:** at 1 MW, power sets the count: 1,000 ÷ 207 = 4.8, so ≥5 cabinets ≈ 2.2 m² and 2.9 t. That bank holds 190 kWh, about 11 min at 1 MW, ignoring derating. Runtime practice (1–15 min) is OPERATOR CLAIM only (see 15d §1.2).
- **Li-ion fire code (US) [S11, S12]**
  - Sandia-hosted ESS codes presentation (C. Searles, c. 2023, NFPA 855-2023): Li-ion threshold quantity "20 kWh"; Table 9.4.1 max "600 kWh".
  - Vertiv white paper SL-70718 (2021): "limit the maximum energy capacity of ESS groups or arrays to 50 kWH, 250 kWH per listed array, and 600 kWH per fire area"; "separation … of at least three feet"; AHJ may waive on UL 9540A data.
  - **NEEDS STANDARD:** NFPA 855 text; whether BC or Alberta adopt it (15d §1.4 found no adoption); CSA C22.1 Section 26 battery-room ventilation; NBC fire-separation rule for battery rooms.
- **Battery room fire separation (Canada):** **UNVERIFIED.** No NBC/BCBC article naming battery rooms was read. The 2 h generator-room rule (§2.5) does not automatically apply to UPS battery rooms.

### 2.4 Backup generators: count, rating, footprint

- **Rating basis**
  - Uptime Institute (T. Traver, "Mission Related – Critical Power Requirements", © 2017, IEA-EBC Annex 75 presentation) [S6]: "Tier III and Tier IV engine-generator capacity is based on manufacturers' unlimited runtime capacity at site conditions". Standby and non-derated prime ratings are limited to Tier I–II.
  - Cummins, *Data Center Continuous (DCC) Ratings*, bulletin 5600406 rev 2/25 [S7] (MANUFACTURER, paraphrasing Uptime): gensets "must be large enough to carry the entire data center load", and "there can be no limit on the number of hours".
- **Unit size and burn [S13]** (Cat 3516C, LEHE1377-04 (03/20); MANUFACTURER CLAIM)
  - "2500 ekW" standby, "2250 ekW" prime.
  - Fuel at 100 % standby: "656.8 (175.3)" L/h (gal/h); 75 %: 510.8; 50 %: 372.4.
  - Package "6800 … 2339 … 2997" mm; dry weight "17 590" kg. Exhaust 490.7 °C, 554.5 m³/min; radiator air 2,356 m³/min.
  - **Derived:**
    - 656.8 ÷ 2,500 = 0.263 L/kWh.
    - Open-set footprint 15.9 m² ÷ 2.5 MW = 6.4 m²/MW.
    - Weight 7.0 t/MW, which is a floor or roof load question when gensets sit on a roof well, as at 515 W Hastings (11_vancouver_permits).
- **Enclosures:** sound-attenuated enclosure dimensions for 2–3 MW sets were **not** found; the Cat enclosure page read covers only 40–200 kVA. UNVERIFIED.
- **Generator room (Vancouver) [S14]:** City of Vancouver Bulletin 2000-015-BU/EL (rev. 5 Oct 2015; attachment rev. 30 Nov 2020). VBBL 3.6.2.8.(1): room "separated from the remainder of the building by a fire separation having a fire-resistance rating not less than 2 h". Install to CSA C282. Outdoor sets: enclosure "fire or spatially-separated from adjacent buildings and the building it serves".
- **Redundancy in built Alberta cases:** see C1–C4. They show 3–4 units of 2–3.5 MW for 9–26 MW of standby capability.

### 2.5 Fuel storage and exhaust

- **Uptime [S5]** (K. Heslin, "Fuel System Design and Reliability", *Uptime Institute Journal*, 18 Jun 2014): "The Tier Standard: Topology requires this 12-hour fuel storage minimum for all Tiers". Pumps, valves, bulk and day tanks must meet the concurrently-maintainable (III) or fault-tolerant (IV) objective.
- **US DoD [S8]** (UFC 3-540-01, 1 Aug 2014, Change 3, 26 Jan 2023, s. 2-3): "Provide a minimum of seven days of fuel storage". With a delivery source, a "minimum local 24-hour capacity tank" per set; a separate day tank per generator.
- **NFPA 110** Class (hours): only vendor and trade pages were found. **NEEDS STANDARD.**
- **Derived fuel volume per MW of generator load** (Cat burn 0.263 L/kWh; engines differ):

| Autonomy | m³ per MW | Basis |
|---|---|---|
| 12 h | 3.2 | Uptime minimum |
| 24 h | 6.3 | common operator claim (Cologix VAN2, Qu EDM1: "24 h") |
| 30 h | 7.9 | eStruxture CAL-1 claim |
| 48 h | 12.6 | Hut 8 Vault claim ">48 h" |
| 7 days | 44 | UFC 3-540-01 |

- **Built tank sizes**
  - 175 W Cordova, Vancouver: fuel storage room with two 4,000 gal tanks (≈2 × 15.1 m³ if US gal) replacing parking (BP-2021-06112; 11_vancouver_permits).
  - Amazon Didcot (UK EA): belly tanks 19,300 L per 2.8 MW main set, four ≈40,000 L top-up tanks, ≈2,400 m³ on site for 129 sets [C6].
  - **Derived:** 19,300 L ÷ (2,800 kW × 0.263 L/kWh) ≈ 26 h, using the Cat rate on a different engine (approximate).
- **Stacks:** no code minimum. UFC 3-540-01 s. 2-4.1.1 makes stack height a design-analysis item [S8]. Built heights:

| Project | Stack height | Source |
|---|---|---|
| Didcot, main halls | 33 m | C6 |
| Didcot, single-storey hall | 18 m | C6 |
| Didcot, CIWB | 11.3 m | C6 |
| Didcot, substation | 9.4 m | C6 |
| Avonmouth | ≈26 m | C8 |
| Irish cases | 25 m | C7, C9 |
| Irish DUB13 | 22.3 m | C12 |

### 2.6 Power distribution (PDUs, RPPs, busway)

- FEMP/NREL [S3]: efficiency only (UPS, transformers, 380 V DC "7% reduction"); no space rule.
- The ORv3 rack takes 50 V DC busbars of 30, 60, 140 or 190 kW [S17].
- **UNVERIFIED:** floor-space allowance for PDUs and RPPs per MW. Working rule pending: carry it inside the white-space-per-rack figure, as the LBNL prototypes do (UPS "located within the data center room if any") [S18].

### 2.7 Data hall / white space

- **Rack density**
  - Uptime Institute *Global Data Center Survey 2024* (n > 850; fielded Mar–Apr 2024) [S15]: "average … to be 8 kW"; "7.1 kW" excluding 11 sites above 50 kW; "4 kW to 6 kW racks remain the most commonly deployed"; "notable increase in 7 kW to 9 kW racks"; a few "up to 100 kW or more" (pp. 10–11). This is an industry survey (operator-reported), not a standard.
  - FEMP/NREL 2024 p. 23: HPC "125+ kW per compute rack" [S3].
  - LBNL 2024 report: AI servers, 8-GPU ≈10–12 kW rated each (Hunt 01) [S16].
- **Area per rack and per MW** (Sun, Luo, Luo, Hong 2021, *Energy and Buildings* 231:110603, LBNL prototypes) [S18]
  - Halls of 600 ft² (55.7 m²) and 6,000 ft² (557.4 m²); room height 14 ft (4 m); raised floor 2–2.5 ft (0.6–0.8 m) (Tables 3–4).
  - Rack layouts 2×3, 4×3, 10×4 and 10×15.
  - IT density 40–100 W/ft² (computer room) and 100–500 W/ft² (stand-alone).
  - **Derived:** 100, 50, 150 and 40 ft²/rack, i.e. 9.3, 4.6, 13.9 and 3.7 m²/rack. 430–5,382 W/m² is 2,325–186 m² of white space per MW.
- FEMP/NREL example [S3]: "a 15,000-square-foot data center with IT equipment operating at 100 Watts/square foot". Derived: 1,076 W/m², i.e. ≈929 m²/MW.
- **Built white space per MW (OPERATOR CLAIMS, Hunt 01; derived):**

| Site | White space | IT load | m² per MW |
|---|---|---|---|
| eStruxture VAN-1 | 697 m² | 2.4 MW | ≈290 |
| Qu EDM1 | 1,460 m² | 2.5 MW | ≈584 |
| Hut 8 Vault | 386 m² | 0.693 MW N | ≈557 |
| Cologix VAN5 | 1,003 m² | 1.6 MW | ≈627 |
| Cologix VAN2 | design 150 W/ft² | — | ≈619 |

- **Suggested range for the tool:** ≈200–300 m²/MW for high-density or liquid-cooled halls (≥20 kW/rack), ≈550–950 m²/MW for 5–10 kW/rack air-cooled halls. These ranges are drawn from the rows above; they are not a published rule.

### 2.8 Cooling: air, liquid, chillers, heat rejection

- **Thermal envelope [S3]:** ASHRAE recommended 18–27 °C, 8–70 % RH (FEMP/NREL Table 3-1, p. 8). Water-side economizers suit sites with wet bulb <55 °F (12.8 °C) for ≥3,000 h/yr (p. 20). Medium-temperature chilled water ≥55 °F (12.8 °C) (p. 18).
- **Air units:** eStruxture CAL-1: "8x165 kW units in N+1 configuration", "20x250 kW units in N+1 configuration" (OPERATOR CLAIM) [C1]. CRAH and fan-wall footprint per kW: **UNVERIFIED** (Stulz CRAC sound data only, in 08).
- **CDU [S22]** (Vertiv CoolChip CDU 2300, SL-80607, 08/26, marked preliminary): "2300 kW @ 4°C ATD", 2,400 × 1,200 × 1,200 mm (H×W×D), 1,793 kg wet, redundant pumps. In-rack CDU options of 100 and 150 kW [S17].
- **Air-cooled chiller [S23]** (Trane TCA, TCA-SLB001-EN 05/07/2026, "All values are estimated"):

| Model | Range | L × W × H | Operating weight | Fans |
|---|---|---|---|---|
| TCAA330 | 300–400 T | 478 × 88 × 106 in | 32,000 lb | 18 |
| TCAB570 | 400–600 T | 624 × 88 × 106 in | 40,000 lb | 24 |
| TCAB850 | 650–850 T | 672 × 120 × 106 in | 50,000 lb | 36 |

  - **Derived** (1 TR = 3.517 kW): TCAA330 is 27.1 m² for 1.06–1.41 MW, about 19–26 m²/MW. TCAB850 is 52.0 m² for 2.29–2.99 MW, about 17–23 m²/MW. Weight is about 7.6–9.9 t per MW of cooling.
  - The datasheet gives no clearances, so add an air-intake spacing allowance. UNVERIFIED.
- **Cooling tower [S24]** (BAC Series 3000, Product & Application Handbook 2012)
  - Nominal ton = "3 USGPM of water from a 95°F entering water temperature to an 85°F leaving water temperature at a 78°F entering wet-bulb temperature".
  - S3E-1222-07Q: 652 tons, 11'-10" × 21'-7" × 12'-3", 25,370 lb operating.
  - **Derived:** 1 nominal ton = 15,000 Btu/h = 4.40 kW, so 652 tons ≈ 2.87 MW. 23.7 m² ÷ 2.87 MW = 8.3 m²/MW; 4.0 t/MW. The ×4.40 kW conversion is my arithmetic from BAC's definition.
- **Dry cooler [S25]** (Thermokey GH2490.CX selection, Archimede 2019, resale listing; MANUFACTURER CLAIM)
  - "Real Capacity 737,60 kW"; air 32 °C; 40 % propylene glycol 48.0→42.7 °C.
  - 7,530 × 2,400 × 1,565 mm; 1,866 kg; 8 × 900 mm fans at 3.6 kW; Lp 70 dBA at 10 m; Lw 102 dBA.
  - **Derived:** 18.1 m² ÷ 0.738 MW = 24.5 m²/MW at warm-water (DLC-type) conditions.
  - Alfa Laval Fincoil SOLAR Max: "146 up to 1638 kW" (EN 1048), lengths 4.1–10.7 m, widths not given [S32].
  - **UNVERIFIED:** dry-cooler area at 25–30 °C supply water (air-cooled IT with chillers in economizer mode). It will be much larger than 24.5 m²/MW, but no source gives the factor.
- **Hybrid/adiabatic [S26]** (NREL/CP-2C00-66690, Feb 2017, ESIF)
  - IT load "nearly 1 MW", designed for 10 MW in 2.5 MW increments; four staged cooling towers.
  - Thermosyphon cooler saved "4,650 m3 (1.23 million gal)—or 56%" of make-up water; it was "placed on a platform intended for future cooling towers".
  - Heat reused in the building: max "0.434 MW".
- **Heat to be rejected:** ≈ IT load + UPS/distribution losses + fan and pump power. Using the PUE from 01/03 is the tool's job. The survey average PUE of 1.56 [S15] is an operator figure.

### 2.9 Heat recovery equipment

- **Heat pump [S27]** (Carrier 61XWH-ZE, 2016/17 preliminary data; MANUFACTURER CLAIM)
  - Largest model 1501: 1,064 kW at 10/75 °C, **1,948 kW at 30/75 °C**, 1,992 kW at 35/85 °C.
  - 4,850 × 1,350 × 2,200 mm; 8,800 kg; R-1234ze; up to 85 °C.
  - **Derived:** ≈3.4 m² and 4.5 t per MW of heat at a 30 °C source, unit only.
- **ORNL [S28]** (Wang et al., "District Heating Utilizing Waste Heat of a Data Center: High-Temperature Heat Pumps"; journal and year not in the OSTI text read)
  - Waste heat "25℃–35℃ for air-cooled systems", "50℃–60℃ for water-cooled systems"; 1 MW high-temperature heat pump, 85 °C supply.
  - COP 3.33 in Table 6; the column headers were garbled, so verify.
- **Built heat-pump scales:** see 13_calibration_cases (e.g. Odense 9 heat pumps, 24 MW; Tallaght 3 MW; Markham 2 × 2 MWt). Plant-room areas for these are **not** published.
- **Heat exchangers:** no footprint source. UNVERIFIED.

### 2.10 Fire suppression

- **NFPA 75** (secondary summary only: M. Bunker, *Consulting-Specifying Engineer*, 23 Sep 2016, a trade journal, not a source of truth) [S30]:
  - IT rooms separated from other occupancies "with a minimum separation of 1 hour".
  - Gaseous systems sized for "the entire volume they serve".
  - Sprinklers are required in sprinklered buildings.
  - **NEEDS STANDARD** (NFPA 75-2024, NFPA 2001, NFPA 13 pre-action).
- **Inert-gas cylinders [S29]** (Kidde KDS 38-41XXX1-541 rev AC, Mar 2022): 80 L at 200/300 bar (267 mm × 1,880 mm; 126.6/136.1 kg full); 140 L at 300 bar (360 × 1,865 mm; 255.9 kg). Cylinders per m³ of room: NEEDS STANDARD (design concentration).

### 2.11 Network / meet-me room

- TIA-942-C published May 2024; "applicable to any size data center" [S33]. Space sizing not public. NEEDS STANDARD.
- Built: Burlington plans show "ELECTRICAL/ NETWORK ROOM (128 m2)" (lower level) and "(115 m2)" (first floor) [C5].

### 2.12 Support spaces and staff

| Project | Support space and staff | Source |
|---|---|---|
| Burlington plans | open office 100 m²; staff lounge 24 m²; conference/training 90 m²; lobby 70 m²; loading/garbage 45 m²; storage 40 + 18.6 m²; "SERVICE AREA" 175–200 m²; 84 parking spaces; one loading area | C5 |
| EdgeConneX Lucan (ABP-317802-23) | "circa 40 people, over a 24hr period", 15,274 m² | C9 |
| DUB13 (ABP-317446-23) | 45 operational jobs; office 603 m² | C12 |
| Ark UP4, Hillingdon (28 MW) | 50–100 jobs; about 29 on site in business hours; 14 car spaces | C10 |

- Support area therefore looks like a small, near-fixed block (≈200–600 m²), not a share of MW. This is a reading of four cases, not a rule.

### 2.13 White space ratio, gross area, heights

- See §3. Ratios: Burlington 3,710 m² of halls vs a stated GFA of 5,163 m² (72 %) or a floor sum of ≈7,770 m² (48 %); the plan set is internally inconsistent [C5]. EdgeConneX Lucan 12,859 / 15,274 m² = 84 % (single storey, plant in a yard) [C9]. Operator claims 51–87 % (Hunt 01).
- **Heights**

| Project | Height | Source |
|---|---|---|
| Burlington | 2nd floor at 19'-8¼" (≈6.0 m) above the first; roof at 39'-4⅜" (≈12.0 m) | C5 |
| EdgeConneX Lucan | single-storey halls ≈12.9 m; generator yard ≈9.15 m | C9 |
| Grange Castle (2-storey) | ≈19.85 m | C7 |
| Ark UP4 | 32.8 m, halls on floors 2–4 | C10 |
| eStruxture CAL-1 | 25 ft and 19 ft ceilings | C1 |
| LBNL prototype | 4 m room + 0.6–0.8 m raised floor | S18 |

### 2.14 Floor live loads

- **Code (office):** Ontario Building Code Table 4.1.5.3 (buildingcode.online transcription) [S19]:
  - "Office areas (not including record storage and computer rooms)": 4.8 kPa basement and first storey; 2.4 kPa above.
  - "Equipment areas and service rooms" including "Generator rooms," "Machine rooms," "Pump rooms," "Transformer vaults": 3.6 kPa.
  - Storage 4.8 kPa.
  - **The NBC 2020 / BCBC 2024 Table 4.1.5.3 was not read today**: the NRC free PDF (DOI link) was blocked by the proxy and the provenance rule. NBC/BCBC values must be confirmed before citing. The OBC table derives from the NBC, but that is not proof.
- **Data halls (no Canadian code row)**
  - E. Linwood, "Design Parameters for Data Center Facilities", *STRUCTURE* (NCSEA), 1 Jan 2023 [S20; professional magazine, secondary]:
    - ASCE 7-22 computer access floor 100 psf (4.8 kPa) or 2,000 lb point load.
    - UFC 3-301-01 (2018) 150 psf (7.2 kPa) for "Telephone exchange rooms and central computer IT server spaces".
    - Intel 2012 recommended 350 psf (16.8 kPa).
    - Racks "rated for 3,000 pounds" on 2 × 4 ft (≈412 psf, 19.7 kPa); raised access floor ≈12 psf.
    - Tier III/IV implies Risk Category IV.
  - The UFC 3-301-01 2013 Table D-1 was opened but its rows did not extract.
  - TIA-942 Rated-3 "should be 12kPa (250 lb/ft2)" (EPI Singapore, a TIA-942 certification body; undated web article) [S21]. NEEDS STANDARD.
  - ORv3 rack static 1,600 kg on 0.64 m²: derived ≈24.5 kPa local [S17].
  - CDU wet weight 1,793 kg on 1.44 m²: derived ≈12.2 kPa local [S22].

### 2.15 Redundancy and how it multiplies equipment

- Uptime (Traver 2017) [S6]:
  - "Tier I – Basic Capacity (N)"; "Tier II – Redundant Components (N+)"; "Tier III – Concurrently Maintainable (N+1)" for "each and every component and path"; "Tier IV – Fault Tolerant (N+1+)".
  - N = "Required number of units (components) necessary to meet the need".
  - The public text read does not define 2N.
- EN 50600 availability classes apply to "the power supply, the cooling supply and the cabling" (TÜV NORD page) [S31]. Per-class rules: NEEDS STANDARD (EN 50600-1).
- **Multiplier rule for the tool (arithmetic, not a standard):**
  - Count = ceil(load ÷ unit size) = N.
  - N+1 → N + 1.
  - 2N → 2 × N, applied per system: UPS, generators, transformers, chillers or dry coolers, CDUs.
  - Space and weight scale with count, not with load.
  - Built examples mix schemes: eStruxture CAL-1 has a "2N UPS architecture", generators "A + B + C + D configuration (shared redundancy)" and cooling N+1 [C1]. Qu EDM1 and EDM2 have "N+1 1MW Generators (x3)" (Hunt 01).

### 2.16 Noise (siting only)

Plant sound power by class, and filed assessments (Burlington, Olds, UK), are in 08_plant_sound_power.md. Vancouver and Edmonton limits are in 14_deep_dive_both_cities.md and 05_groundwater_noise_tenure.md.

---

## 3. Calibration examples

| ID | Project (status) | Public figures | Source type | Label |
|---|---|---|---|---|
| C1 | eStruxture CAL-1, 7007 54 St SE, Calgary (operating) | AUC Decision 27603-D01-2022 (4 Oct 2022): 3 × 3 MW MTU 20V4000DS3000 + 1 × 3 MW Kohler KD3000 = 12 MW standby. Data sheet: "65,000 sq. ft. of total space" (6,039 m²); "33,000" / "33,700 sq. ft." of IT space (≈3,066–3,131 m², **≈51 %**); "9MW total power, upgrdable to 13MW"; dual 13.2 kV lines, 8 MW each; ≥30 h fuel; 2N UPS; up to 30 kW/cabinet; ceilings 25 ft / 19 ft | regulator decision + operator sheet | SOURCED (generators) / OPERATOR CLAIM (rest) |
| C2 | eStruxture CAL-2, 149 High Plains Pl, Rocky View County | AUC Decision 27614-D01-2022: 4 × 3 MW (3 Kohler KD3250 + 1 MTU 20V4000DS3000) = 12 MW; not grid-connected | regulator | SOURCED |
| C3 | Amazon (ADS) Airdrie AB | AUC Decision 27938-D01-2023 (10 Mar 2023): 10 × 2.5 MW Cat 3516C + 1 × 0.6 MW Cat C18 = 25.6 MW, phased; belly tanks; fuel trucked in | regulator | SOURCED (IT MW not stated) |
| C4 | Equinix, 5300 86 Ave SE, Calgary | AUC Decision 27343-D01-2022 (3 Jun 2022): existing 3 × 2.25 MW + 6 × 2 MW, adding 2 × 3.5 MW = 25.75 MW | regulator | SOURCED (IT MW not stated) |
| C5 | 3110 South Service Rd, Burlington ON (in review 2026) | Plans (20 Jun 2026): lot 7,944 m²; GFA "5163 m2" (floor labels sum to ≈7,770 m²; conflict); halls 1,650 + 2,060 = 3,710 m²; electrical/network rooms 115–128 m²; MECH 73 m²; 2 storeys + lower level; ≈6.0 m floor-to-floor; roof ≈12.0 m; transformer and generator locations shown, counts not given. Noise study: 12 air-cooled chillers (08). IT MW **not found** in a municipal document. | municipal plans | SOURCED (areas); MW UNVERIFIED |
| C6 | Amazon Didcot, Oxfordshire (UK EA application, 30 Sep 2025) | 23 ha; 129 gensets (122 × 2.8 MWe / 7.5 MWth, 4 × 720 kW, 3 × 440 kW); ≈925 MWth; 19,300 L belly tanks; 4 × ≈40,000 L top-up; ≈2,400 m³ fuel; stacks 9.4–33 m; ≤500 h/yr | regulator application | SOURCED (IT MW not stated) |
| C7 | Grange Castle South, SD20A/0121 (South Dublin CC order PR/0624/20) | 16.5 ha; 80,269 m² GFA in 3 two-storey buildings; 70 gensets; flues 25 m; ≈19.85 m height; direct evaporative AHUs | municipal order | SOURCED (IT MW not stated) |
| C8 | Avonmouth Data Centre (UK EA NTS) | 32 × 2.424 MWe / 7.29 MWth gensets (233.28 MWth); belly tanks, "no bulk fuel storage"; stacks ≈26 m; air-cooled free-cooling chillers + trim chillers | regulator application | SOURCED |
| C9 | EdgeConneX DUB06, Lucan (ABP-317802-23) | 5.14 ha; GFA 15,274 m², halls 12,859 m² (**84 %**); single storey ≈12.9 m; 24 gensets, 25 m flues; ≈40 staff per 24 h; 110 kV GIS substation | inspector's report | SOURCED (IT MW not in extract) |
| C10 | Ark UP4, Union Park, Hillingdon (Committee 4 Sep 2025) | **28 MW IT; 37 MVA grid**; ≈1 ha; 15,410 m² GIA across UP4/EC4/AB5 (para 7.3 says 18,898 m²); 14 diesel gensets; 32.8 m; halls on floors 2–4; 50–100 jobs | planning committee report | SOURCED |
| C11 | 111 E 5th Ave, Vancouver (RTS 19744, referred back 21 Jul 2026) | "anticipated load of up to 40 MW"; site 2,767.3 m²; staff estimate up to 4.2 FSR = 11,622.6 m²; max height 20 m; primary BC Hydro service; waste heat to NEU | council report (Hunt 01) | SOURCED (load is the applicant's figure) |
| C12 | DUB13 (ABP-317446-23) | 3.79 ha; GFA 12,893 m²; 2 storeys; parapet 14.2 m, plant to 21.6 m; 13 gensets (p. 40 says 14); flues 22.3 m; 45 jobs; heat recovery to office plus future DH provision | inspector's report | SOURCED |

**Derived calibration ratios** (check against the tool's outputs):
- **Gross area per MW IT:**
  - 111 E 5th: ≤11,623 ÷ 40 = ≤291 m²/MW.
  - Ark UP4: 15,410 ÷ 28 = 550 m²/MW (whole scheme, upper bound).
  - Cologix VAN4: 6,317 m² ÷ 4 MW = 1,579 m²/MW (OPERATOR).
- **Grid MVA per MW IT:** Ark UP4 37 ÷ 28 = 1.32.
- **Gensets per MW IT:** Ark UP4 14 ÷ 28 = 0.5, i.e. 2 MW IT per set.
- **Generator MW per "total power" MW:** CAL-1 12 ÷ 9 = 1.33 (OPERATOR "total power").

---

## 4. Sources

Access date for all: 14 Oct 2026 unless noted.

- **S1** BC Hydro. *Primary Guide* R4, File 1615.0.3, issued 2025-02-20, effective 2025-06-30. https://app.bchydro.com/content/dam/BCHydro/customer-portal/documents/distribution/standards/ds-primary-guide.pdf
- **S2** EPCOR Distribution & Transmission Inc. *Customer Connection Guide*, effective 1 Aug 2025. https://epcor.com/content/dam/epcor/documents/supporting-documents/power_customer-connection-guide.pdf
- **S3** Van Geet, O.; Sickinger, D. (NREL). *Best Practices Guide for Energy-Efficient Data Center Design*, rev. July 2024, DOE/GO-102024-6283, US DOE FEMP. https://www.energy.gov/sites/default/files/2024-07/best-practice-guide-data-center-design.pdf
- **S5** Heslin, K. "Fuel System Design and Reliability." *Uptime Institute Journal*, 18 Jun 2014. https://journal.uptimeinstitute.com/?p=3233
- **S6** Traver, T. (Uptime Institute). "Mission Related – Critical Power Requirements," © 2017, IEA EBC Annex 75 event Oct 2020. https://nex75.iea-ebc.org/Data/Sites/4/media/events/2020-10/presentations/1.4b--traver--uptime-institute.pdf
- **S7** Matuseski, D. *Data Center Continuous (DCC) Ratings*, Cummins Inc. bulletin 5600406, rev 2/25. https://mart.cummins.com/imagelibrary/data/assetfiles/0059642.pdf (MANUFACTURER)
- **S8** US DoD. UFC 3-540-01 *Engine-Driven Generator Systems for Prime and Standby Power Applications*, 1 Aug 2014, Change 3, 26 Jan 2023. https://www.wbdg.org/FFC/DOD/UFC/ufc_3_540_01_2014_c3.pdf
- **S9** Vertiv. *Liebert EXL S1 Site Planning Data 1000–1200 kVA*, SL-26092 rev 8-11-21. https://www.vertiv.com/globalassets/products/critical-power/uninterruptible-power-supplies-ups/liebert-exl-s1-site-planning-data-1000-1200kva-sl-26092.pdf (MANUFACTURER)
- **S10** Vertiv. *HPL 9540A Lithium-ion Battery Energy Storage System*, SL-70383 R02/21. https://www.vertiv.com/4a74a8/globalassets/products/critical-power/uninterruptible-power-supplies-ups/vertiv-hpl-lithium-ion-data-sheet-sl-70383.pdf (MANUFACTURER)
- **S11** Searles, C. "ESS Safety Codes and Standards – Which Way is Straight?" Sandia ESS Reliability Forum 2023, session 4.3. https://www.sandia.gov/app/uploads/sites/163/2023/07/2023ESSRF_Session4.3_Searles_Chris.pdf
- **S12** Vertiv. *Complying With Fire Codes Governing Lithium-ion Battery Use*, white paper SL-70718 R01/21. https://prep.vertiv.com/490199/globalassets/documents/white-papers/vertiv-lib-and-fire-codes-wp-en-na-sl-70718-web_322437_0.pdf (MANUFACTURER)
- **S13** Caterpillar. *3516C Diesel Generator Sets* spec sheet LEHE1377-04 (03/20), as filed by Hanover County VA. https://www.hanovercounty.gov/DocumentCenter/View/5983/CAT-3516C-2500KW-Cut (MANUFACTURER)
- **S14** City of Vancouver. Bulletin 2000-015-BU/EL *Emergency Generator Rooms*, rev. 5 Oct 2015; attachment rev. 30 Nov 2020. https://vancouver.ca/files/cov/2000-015-emergency-generator-rooms.pdf
- **S15** Uptime Institute. *Global Data Center Survey 2024* (Keynote report 146, Jul 2024). https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2024.GlobalDataCenterSurvey.Report.pdf (industry survey; operator-reported)
- **S16** Shehabi, A. et al. *2024 United States Data Center Energy Usage Report*, LBNL (as cited in Hunt 01). https://eta-publications.lbl.gov/publications/2024-lbnl-data-center-energy-usage-report
- **S17** Vertiv. *OCP Rack (ORv3) product specification*, SL-80495 R08/26. https://www.vertiv.com/4a453f/globalassets/shared/vertiv-ocprack_data-sheet_emea_english_sl-80495_rev0426.pdf (MANUFACTURER)
- **S18** Sun, K.; Luo, N.; Luo, X.; Hong, T. (2021). "Prototype energy models for data centers." *Energy and Buildings* 231:110603. doi:10.1016/j.enbuild.2020.110603. https://eta-publications.lbl.gov/sites/default/files/prototype_energy_models_for_data_centers.pdf
- **S19** Ontario Building Code, Table 4.1.5.3 (2012/2017 text as transcribed at buildingcode.online). https://www.buildingcode.online/671.html. NBC 2020 free PDF (doi:10.4224/w324-hv93) **blocked**.
- **S20** Linwood, E. "Design Parameters for Data Center Facilities." *STRUCTURE*, 1 Jan 2023. https://www.structuremag.org/article/design-parameters-for-data-center-facilities/ (professional magazine; secondary)
- **S21** EPI Singapore. "The data centre is not meeting the 12kPa floor loading capability as per TIA-942 Rated-3…" (undated). https://www.epi-ap.com/content/28/641 (certification body; secondary)
- **S22** Vertiv. *CoolChip CDU 2300kW* data sheet SL-80607 (08/26, preliminary). https://www.vertiv.cn/4a480e/globalassets/shared/vertiv-coolchipcdu-2300kw-_datasheet_global-english_sl-80607.pdf (MANUFACTURER)
- **S23** Trane. *Air-Cooled Magnetic Bearing Chiller, Model TCA*, TCA-SLB001-EN, 05/07/2026. https://elibrary.tranetechnologies.com/public/commercial-hvac/Literature/Sales/TCA-SLB001-EN_05072026.pdf (MANUFACTURER)
- **S24** Baltimore Aircoil Co. *Series 3000 Cooling Tower* (Product & Application Handbook 2012), b8_ct_s3000_20150914. https://baltimoreaircoil.com/download_api_endpoint/536/b8_ct_s3000_20150914.pdf (MANUFACTURER)
- **S25** Thermokey. Selection printout GH2490.CX D/02 V QRAFS (Archimede 2019), via resale listing. https://resale.de/images/164420960_h_r190392800.pdf (MANUFACTURER; resale copy)
- **S26** NREL. "Thermosyphon Cooler Hybrid System for Water Savings in an Energy-Efficient HPC Data Center," NREL/CP-2C00-66690, Feb 2017 (ASHRAE Winter Conf.). https://www.nrel.gov/docs/fy17osti/66690.pdf
- **S27** Carrier. *61XWH-ZE water-to-water heat pump* data (2016/2017, preliminary), via Meier Tobler. https://referenzen.meiertobler.ch/app/uploads//2017/10/61XWH-ZE.pdf (MANUFACTURER)
- **S28** Wang, P. et al. (ORNL). "District Heating Utilizing Waste Heat of a Data Center: High-Temperature Heat Pumps." OSTI 2372986. https://www.osti.gov/pages/servlets/purl/2372986 (journal and year to confirm)
- **S29** Kidde (KFI UK). *IG-541 Agent Cylinder Assembly*, KDS 38-41XXX1-541 rev AC, Mar 2022. https://kidde.com/fire-suppression/en/uk/media/KDS%2038-41XXX1-541%20REV-AC_tcm1137-190095.pdf (MANUFACTURER)
- **S30** Bunker, M. "Demystifying IT room protection requirements." *Consulting-Specifying Engineer*, 23 Sep 2016. https://www.csemag.com/demystifying-it-room-protection-requirements/ (trade journal; pointer to NFPA 75 only)
- **S31** TÜV NORD. "Data center certification according to EN 50600." https://tuev-nord.de/en/company/certification/en-50600/ (certifier page)
- **S32** Alfa Laval. *Fincoil SOLAR Max* leaflet AHE00081EN 1704. https://www.alfalaval.com/globalassets/documents/products/heat-transfer/finned-coil-air-heat-exchangers/product-leaflets/erc00139en.pdf (MANUFACTURER)
- **S33** TIA. *TIA-942* standard page (rev. C, May 2024). https://tiaonline.org/standard/tia-942/

**Calibration sources**
- **C1** AUC Decision 27603-D01-2022. https://efiling-webapi.auc.ab.ca/Document/Get/724790 · eStruxture *CAL-1 Data Sheet* 2022. https://www.estruxture.com/hubfs/site-files/eStruxture_CAL-1_Data_Sheet__2022.pdf (OPERATOR)
- **C2** AUC Decision 27614-D01-2022. https://efiling-webapi.auc.ab.ca/Document/Get/724793
- **C3** AUC Decision 27938-D01-2023. https://efiling-webapi.auc.ab.ca/Document/Get/784765
- **C4** AUC Decision 27343-D01-2022. https://efiling-webapi.auc.ab.ca/Document/Get/718452
- **C5** City of Burlington, 3110 South Service Rd, *Architectural Plans* 2026-06-20. https://www.burlington.ca/en/news/resources/Current-Development-Projects/Ward-4/3110-South-Service/Supporting-Documents/Architectural%20Plans%20-%202026-06-20.pdf · *Letter of Use* 2026-07-14 (2-storey, 24/7, single phase; no MW). https://www.burlington.ca/en/news/resources/Current-Development-Projects/Ward-4/3110-South-Service/Supporting-Documents/Letter%20of%20Use%20-%202026-07-14.pdf
- **C6** Amazon Data Services UK, Didcot, EA bespoke application NTS, 30 Sep 2025. https://consult.environment-agency.gov.uk/psc/ox11-7bf-amazon-data-services-uk-limited/supporting_documents/application-bespoke-a001-250930-r-794-des-arc-30974-jb-didcot-data-centre-v2-r1-non-technical-summary-30092025pdf
- **C7** South Dublin County Council, Chief Executive's Order PR/0624/20, SD20A/0121. https://epawebapp.epa.ie/licences/lic_eDMS/090151b28084cc5f.pdf
- **C8** Avonmouth Data Centre Ltd, EA NTS. https://consult.environment-agency.gov.uk/psc/bs11-0yu-avonmouth-data-centre-limited/supporting_documents/non-technical-summarypdf
- **C9** An Bord Pleanála, Inspector's Report ABP-317802-23 (EdgeConneX). https://www.pleanala.ie/anbordpleanala/media/abp/cases/reports/317/r317802.pdf
- **C10** London Borough of Hillingdon, Planning Committee report, Ark UP4, 4 Sep 2025. https://modgov.hillingdon.gov.uk/documents/s64459/739%20REPORT.pdf
- **C11** City of Vancouver RTS 19744. https://council.vancouver.ca/20260714/documents/rr1.pdf (Hunt 01)
- **C12** An Bord Pleanála, Inspector's Report ABP-317446-23. https://www.pleanala.ie/anbordpleanala/media/abp/cases/reports/317/r317446.pdf
- **C-list** Operator spec sheets for Vancouver and Edmonton sites (Cologix, eStruxture, Qu, Hut 8), as logged in 01_sites_itload_cooling.md. Not re-fetched today.

**Blocked or failed (do not treat as checked)**
- NBC 2020 PDF, doi:10.4224/w324-hv93: proxy CONNECT refused, and WebFetch provenance refused.
- EU JRC *2025 Best Practice Guidelines* PDF (JRC141521_01.pdf): provenance refused. The 2023 v14.1.0 PDF returned "Request Rejected".
- Schneider white paper (download.se.com redirect): provenance refused.
- Hillingdon "Marvell Developments" report s63328: robots disallowed.
- UK EA consultations for Digital Realty RH1 and NTT RM10: "consultation unavailable".
- Kidde-Fenwal US IG-541 sheet: 404.
- Nanaimo DP1376: fetch error.
- UFC 3-301-01 Table D-1: did not extract.

---

## 5. Gaps

1. **NBC 2020 / BCBC 2024 Table 4.1.5.3** was not read directly; OBC values stand in. Retrieve the NRC free PDF manually. **Biggest code gap.**
2. **Paywalled standards:** TIA-942-C (space sizing, floor loading, ceiling height, entrance room), BICSI 002, EN 50600-1 (availability-class rules), NFPA 75 / 76 / 110 / 855 / 2001, ASHRAE 90.4 and the TC9.9 structural guide. Only secondary statements were found.
3. **No public IT-MW-plus-floor-area pair in a Canadian municipal record** except 111 E 5th (an upper bound only). Burlington has areas but no MW; the Alberta AUC decisions have generators but no IT MW or area.
4. **Clearances and yard allowances** around chillers, dry coolers and gensets (air recirculation, maintenance) are unsourced. The m²/MW figures here are equipment only.
5. **Dry-cooler area vs water temperature** is unsourced. This is critical for air-cooled halls in Vancouver summers and for heat-recovery trade-offs.
6. **Battery-room fire separation and ventilation in Canada** (NBC, CSA C22.1 s. 26) are unsourced.
7. **MV switchgear room, transformer and PDU footprints** have no public dimension tables.
8. **Heat-exchanger and heat-pump plant-room areas** at built recovery projects are not published.
9. **NFPA 110 fuel classes and Canadian (CSA C282) fuel duration for data centres** are not read. CSA C282 governs life-safety emergency power, not IT backup; the tool should keep the two apart.
10. **Generator enclosures and containers** for 2–3 MW sets have no dimension source.
11. **2N definition** has no public standard text (Uptime defines N, N+1, Tier IV only).
12. **Security:** EN 50600 protection-class content is not public. Generic allowances (guard room, fence setback) remain UNVERIFIED by design.

**Update 14 Oct:** NBC 2020 Table 4.1.5.3 read from the official PDF (note 24). Office 2.4 / 4.8 kPa and equipment/service rooms 3.6 kPa confirmed; the office row excludes computer rooms, and data halls must be designed for actual equipment loads (4.1.5.1.(1)). Gap 1 closed; data-hall values remain NEEDS STANDARD.
