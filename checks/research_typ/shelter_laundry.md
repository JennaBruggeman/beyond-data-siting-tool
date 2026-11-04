# Typology 9: Shelter + laundry (4 Nov 2026)

A warming or overnight shelter with a laundry that serves its users. Laundry wash water at ≥71 °C needs a heat pump; laundry sized per washer and dryer.

Check 1 only. Ids: register ids reused; new ids `typ_shelter_laundry_*` in shelter_laundry_sources.json. "?" = not found. "Our arithmetic" / "our reading" labelled. Tool runs = `checks/golden/arch/*_arch.json`, tool results, not sources.

---

## Short answer

- Two variants, because the occupancy decides the building:
  - **Day** warming shelter + laundry (A-2 + laundry): can sit inside the data-centre building, 2 h from the hall.
  - **Overnight** shelter + laundry (Group C): its own building (the Twin, typology 8).
- Size: ≈140–161 m² gross for 16 guests overnight, laundry included at 6 m² (analogy). **m² per washer or dryer: not found** in any primary source.
- Machine count: 1 washer + 1 dryer for 16 guests by either US benchmark (our arithmetic).
- Heat: wash water ≥71 °C (US healthcare rule) is above any hall heat (25–60 °C): heat-pump lift needed. Dryer air (115–130 °C) is out of reach.
- Sewer: Metro Vancouver 65 °C / 40 °C; **new:** Edmonton Bylaw 19627 restricts sanitary discharge over 75 °C.
- No precedent of data-centre heat to a laundry. Vancouver runs a shelter-style hygiene centre with laundry drop-off.

---

## 1. Program list and room schedule

**Shelter (16 guests):** as Twin §1. Day: net 79.2 → **103–119 m²**. Overnight: net 107.6 → **140–161 m²** (sup_care.md §2; our arithmetic).

**Laundry for the shelter's users:**

| item | value | source | kind |
|---|---|---|---|
| Laundry room (recreation centre) | 6 m² net | arch_sup_eastglenRooms 2.11, p. 46 | analogy (Edmonton functional program) |
| Washers per person | 1 per 25 persons; 1 dryer per 2 washers ("1:25 ratio (PN:Washers) and 1:2 ratio (Washer:Dryer)") | typ_shelter_laundry_usaceLaundry | US Army design benchmark (non-permanent camps; date ?) |
| Washers per person | "1 per 50 persons" in lieu of trays (1 tray per 25) | typ_shelter_laundry_cfr654412 | US rule (farmworker housing) |
| Housing benchmark | 1 machine set per 10 units | laundry catalogue note (Van HDTG) | gov. guide (housing, not shelter) |
| Machines for 16 guests | 16 ÷ 25 or ÷ 50 → **1 washer, 1 dryer** | — | our arithmetic |
| **m² per washer or dryer** | **?** (none in primary sources read; maker guide checked: none) | typ_shelter_laundry_mieleGuide | — |
| Clear floor space at machines | §611.2: centred, parallel approach, to §305; dimensions not read (?) | typ_shelter_laundry_usAccessWashers | US guide |
| Shelter laundry standard (Toronto) | in Shelter Design and Technical Guidelines s. 5.6.2 Central Laundry Services, pp. 219–223, and 5.1.9 Intake Laundry p. 103: **not reached** (text extraction stops near p. 44) | arch_hp_torShelterDG | gov. guide (ON) |
| Larger laundries (context) | US VA hospital smallest tier ≈386 m² net; US laundromats 93–465 m² (claim); Vancouver Laundromat ≤300 m² | arch_r2_vaLaundry2022; arch_r2_claIndustry; van3575s2 | US benchmark; operator claim; rule |

**Sharing (our arithmetic / reading):**
- The 6 m² laundry is already inside the overnight shelter's 140–161 m², so the typology adds nothing for a 16-guest shelter.
- The laundry shares the shelter's washrooms, office and entrance (our reading); the 1.3–1.5 grossing already covers them.
- A laundry big enough to serve the public (laundromat) is a separate use and a separate room: size ?.

**Total:** day 103–119 m²; overnight 140–161 m² (our arithmetic).

## 2. Adjacency and stacking

| item | rule | source |
|---|---|---|
| Occupancy | self-service laundry D; "except self-service" F-2; laundry for the shelter's own users is part of the shelter (our reading) | adj_occupancy.md; arch_nbcDefF |
| Day variant | A-2 shelter: **2 h** to F-2 hall; D laundry: none | arch_hb_nbc3131 |
| Overnight variant | Group C, own building (F-2 one-suite limit, 3.1.3.2.(2)); see Twin | arch_hb_nbc3131 |
| Common laundry room in a residential building | 1 h (45 min if floor <1 h; none if sprinklered) | NBC 3.3.1.23 (adj_service.md) |
| Dryer exhaust | independent of other ducts, straight to outdoors | NBC 6.3.2.10.(7)–(9) (adj_service.md) |
| Lint traps | cleaned after each use | NFC 2.4.1.4.(1) (adj_service.md) |
| Dryer exhaust to intakes | no Table 6.3.2.9 row (?) | adj_service.md gaps |
| Wet room over the hall | not allowed: washers, showers never above the hall | fmDS0532 2.2.1.6 |
| Exits | laundry rooms may not open into an exit | NBC 3.4.4.4.(8) (adj_service.md) |

**Default stacking:** day variant at grade beside the hall (E06B) or under it (V339, stacked like the Emergency hub). Overnight variant: separate building on the street edge (Twin). Laundry on the outside wall for the dryer vent, away from refuge intakes (our reading).

## 3. Heat (cascade)

| stage | temperature | load | how | source |
|---|---|---|---|---|
| 1. Wash water | ≥71 °C for 25 min (US healthcare); thermal disinfection 65 °C 10 min / 71 °C 3 min (maker claim) | 0.53–0.88 kWh/kg wash heat (ΔT 75 K, 6–10 L/kg) | **heat pump** from hall heat | arch_cmsLaundry2013; arch_electroluxThermal; arch_bobak2010 |
| 2. Showers (DHW) | 60 °C | ? | heat pump, or small lift from liquid-cooled 50–60 °C | neuConnect (prog_housing.md) |
| 3. Space heat | radiant 45/35 °C; ≤49 °C design | 160 kWh/m²·yr proxy (library stock) | direct from liquid-cooled; heat pump if air-cooled | arch_tmp_vanNEU2020; arch_tmp_edmDESS2025; heat_temp |
| Dryer air | 115–130 °C (dry-cleaning) | — | out of reach; electric or gas | arch_fiaschi2019 |

**Our arithmetic (proxy, labelled):**
- Linen per bed: no shelter figure (?). Proxy: US VA nursing home 8 lb (3.63 kg) per bed per day (arch_r2_vaLaundry2022) → 16 × 3.63 = 58 kg/day.
- Wash heat: 58 × 0.53–0.88 = 31–51 kWh/day → **11–19 MWh/yr**.
- Upper bound, all laundry energy: EU small on-site benchmark ≤2.0 kWh/kg → ≤42 MWh/yr (arch_euEMAStourism2016).
- Space heat: 140–161 × 160 = **22–26 MWh/yr**.
- Order: wash (71 °C) → DHW (60 °C) → space (45/35 °C) → back to the hall. Wash takes ≈33–42 % of the sourced stages (11 of 33 to 19 of 45 MWh/yr; DHW ? excluded).
- Hall offers 5,393–8,278 MWh/yr (V339), 14,252–21,878 (E06B) (tool runs). Not a limit.

**Heat recovery:** recovering heat from wash wastewater and exhaust air is EU best practice (arch_euEMAStourism2016).

**Sewer:**
- Metro Vancouver: non-domestic waste ≥65 °C prohibited; any waste raising sewage to 40 °C prohibited (arch_mvSewerBylaw299). A shelter laundry for its own users is "non-commercial" → domestic waste (our reading); the 40 °C rule still applies.
- Edmonton Bylaw 19627, Sched. 2 App. B s. 5: sanitary/combined sewer restricted over **75 °C**; App. C s. 5: storm over **60 °C** (typ_shelter_laundry_edmDrainage). Fills the old "Edmonton drainage" gap.

## 4. Plant layout

- Same generator, fuel and intake rules as Emergency hub §4 and Twin §4.
- Laundry heat pump: in the shelter's plant room or the data centre's heat-recovery room; m² per MW: 5.6–15.1 (component_space; hr_plant_room). For a few kW this is negligible (our reading).
- Hand-over across the secure line: a heat pipe, metered (handover.md).
- Dryer vent and laundry exhaust: discharge outdoors, away from shelter intakes; no sourced distance (?).
- Loading not needed below 2,500 m² in Edmonton (arch_sec_edm580).

## 5. Zoning and approvals

| zone | shelter | laundry | source |
|---|---|---|---|
| Van I-3 | day: C (SSC); overnight: no use, own building blocked (Twin) | for users: accessory (our reading); Laundromat NP; Laundry or Cleaning Plant C | van_zdb_i3; zoning.md |
| Van I-2 | as I-3 | Laundromat C (≤300 m²); plant O | van_zdb_i2 |
| Van FC-2 | as I-3 | Laundromat NP; plant C | van_zdb_fc2 |
| Van I-1C | day via SSC | Laundromat C; plant O | van_zdb_i1c |
| Edm BE | P (Seasonal or Year-round Shelter = Community Service) ≤500 m² | Indoor Sales and Service ≤500 m² (our reading); commercial = Minor Industrial P | arch_zon_EdmZones; typ_twin_edmShelterDefs |
| Edm IM, IH | NP | commercial only (IM P; IH existing) | zoning.md |

## 6. Precedents

| precedent | what it shows | kind |
|---|---|---|
| City of Vancouver hygiene services, 404 Alexander St | free showers; "drop off a load of laundry in the morning and pick it up at night" | gov. (arch_svc_vanHygiene) |
| Eastglen Leisure Centre (Edmonton, program) | 6 m² laundry in a public facility | gov. (arch_sup_eastglenRooms) |
| Data-centre heat to a laundry | **none found** (prior searches, pool_laundry.md, gaps_round2.md) | — |
| District heat and a laundry (reverse) | Pauli laundry, Giessen: flue-gas heat to district heat | utility claim (arch_r2_giessenPauli2007) |

## 7. Fit (plant-included tool runs; our arithmetic)

| | V339 (I-3) | E06B (BE) |
|---|---|---|
| Day variant | 103–119 m² = 2.0–2.3 % of 5,257; at grade under the hall; conditional (SSC) | 1.5–1.7 % of 6,854; at grade beside the hall |
| Overnight variant | **blocked** (Twin) | 140–161 m² = 2.0–2.3 %; own building |
| Data centre (tool) | 17 %, 894 m², 1.4 MW | 35 %, 2,399 m², 3.7 MW |
| Limits | street frontage, height, flood (as Emergency hub); overnight blocked | generator yard; limiting distance for the twin |

Other lots: 1425 Clark Dr (I-2): day variant fits; a public laundromat is conditional there. E05 (IM), 12603 123 St NW (IH): shelter NP, blocked.

## 8. Gaps and open questions

- **m² per washer or dryer**: no primary source. Toronto SDTG s. 5.6.2 (pp. 219–223) likely holds it: J.B. could get the PDF (it was not reached; not circumvented).
- Shelter linen kg per guest per day: ? (VA nursing-home rate used as proxy).
- DHW volume per shower; peak W/m² for any stage.
- Is the user-only laundry an accessory use (Vancouver 2.2.14; Edmonton 8.20)? Our reading: yes.
- Dryer exhaust distance to intakes (no Table 6.3.2.9 row).
- ADA/CSA B651 clear floor space dimensions at machines: not read.
- Is J.B.'s ≥71 °C target right for a shelter? The 71 °C figure is a US healthcare rule (CMS); no Canadian shelter rule found.
