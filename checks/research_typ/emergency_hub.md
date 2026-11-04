# Typology 1: Emergency hub (4 Nov 2026)

Refuge + day warming shelter + outpatient clinic, running on the data centre's backup power.
Two variants: **stacked** (programs on the ground floor, hall above; Vancouver I-3) and **beside** (programs along the street, hall behind; Edmonton BE).

Check 1 only. Ids: register ids reused; new ids `typ_emergency_hub_*` in emergency_hub_sources.json. "?" = not found. "Our arithmetic" / "our reading" labelled. Tool runs = `checks/golden/arch/*_arch.json` (3–4 Nov), tool results, not sources.

---

## Short answer

- Size: **≈853–1,017 m²** gross (our arithmetic, sourced room sizes; catalogue 970 m²).
- Backup power is legal and buildable: CSA C282 lets data-processing loads share a set; one set can feed both through a second transfer switch (Vancouver bulletin). The code itself only asks for 30 min of emergency lighting.
- Heat is not the limit (≈52–61 MWh/yr against ≥5,393 MWh/yr on offer). Height, street frontage, the BE 500 m² cap (clinic) and the generator yard are.
- V339: stacked variant fits as conditional uses; clinic over the refuge costs one hall storey. E06B: beside variant fits; clinic needs a 3.18 variance.
- IM, IH: blocked (Community Service and Health Service not listed).
- No built or filed precedent of a data centre with a refuge or clinic was found.

---

## 1. Program list and room schedule

| program | part | net m² | source | kind |
|---|---|---|---|---|
| Refuge (50 people, A-2 day) | main room 50 × 3.5 | 175 | arch_ahsReceptionCentres p. 4 | gov. guide (AB) |
| | washrooms 1 M + 1 F + universal | 13.8 (3 × 4.6) | arch_sup_nbcWashrooms Table 3.7.2.2.-A; arch_sup_abGFNARooms Z-7 | rule + analogy |
| | staff office | 8 | arch_sup_eastglenRooms p. 38 | analogy |
| | first aid | 6 | arch_sup_eastglenRooms p. 40 | analogy |
| | vestibule (staged entry), cot storage, filtration plant, emergency-power room | ? | arch_hcCleanerAirSpaces (required, no m²) | gov. guide |
| | **gross** (× 1.3–1.5) | **264–304** | arch_edmEastglen2017 p. 23; sup_care.md §1 | our arithmetic |
| Day warming shelter (16 guests) | resting area 16 × 3.5 | 56 | arch_sup_torRespite 9.3.1(h) | gov. standard (ON) |
| | washrooms 2 × 4.6 | 9.2 | arch_sup_torRespite 9.3.2; arch_sup_abGFNARooms | standard + analogy |
| | universal dressing/shower | 6 | arch_sup_nbcWashrooms 3.8.2.8.(13); arch_sup_eastglenRooms p. 47 | rule + analogy |
| | staff office | 8 | arch_sup_eastglenRooms | analogy |
| | storage, lockers | ? | — | — |
| | **gross** | **103–119** | sup_care.md §2a | our arithmetic |
| Outpatient clinic (13 exam rooms) | exam 13 × 12.0 | 156 | arch_hsg_abGFNA2021 Table 2 | gov. guide (AB) |
| | treatment + 3 stretcher bays | 48.5 | arch_sup_abGFNARooms A-3, A-11.2 | gov. guide |
| | consult, medication, clean, soiled, housekeeping | 53.5 | arch_sup_abGFNARooms | gov. guide |
| | washrooms 5 × 4.6 | 23 | arch_per_nbcWC; arch_sup_nbcOccLoadOther | rule + our arithmetic |
| | staff lounge, lockers | 7 | arch_sup_abGFNARooms Z-10, Z-14 | gov. guide |
| | waiting, reception, offices | ? (gap to built NV UPCC ≈81–106) | arch_hsg_vchUpccNV | our arithmetic |
| | **gross** | **498–523** room-based; **604** built | arch_hsg_abGFNA2021 pp. 12–13; arch_hsg_vchUpccNV | our arithmetic; gov. |

**Sharing (our arithmetic):**
- Refuge and warming shelter share one staff office: −8 m² net × 1.3–1.5 = −10.4 to −12.0 m² gross.
- Shared washrooms between refuge and shelter: the saving depends on how Table 3.7.2.2.-A is read for the combined load: **?**
- Clinic (Group D) shares nothing sourced with the A-2 rooms. Shared staff room or universal washroom: ?
- Plant: one generator set feeds all three (see §4); room m² for the refuge's emergency panel: ?

**Total:** (264 + 103 + 498) − 12.0 = **853 m²** to (304 + 119 + 604) − 10.4 = **1,017 m²** (our arithmetic).

## 2. Adjacency and stacking

**Occupancies (NBC Table 3.1.3.1, F-2 data centre assumed; arch_hb_nbc3131):**
- Refuge, day shelter: A-2 (our reading) → **2 h** to the data centre.
- Clinic: D → **none** to F-2 (1 h if built to 3.2.2.57). Overnight beds would make it B-2 (2 h).
- A-2 ↔ D: Table 3.1.3.1 value not re-read here (?).

**Stacked (V339):**
- Ground: refuge and shelter on the street, each with its own street entrance (arch_up_vanZDB10 10.21.1). Clinic entrance at grade only; clinic floor above ("not permitted at the ground floor, except for entrances", van_zdb_i3 2.2.6).
- Hall above (2.2.11 bars data storage at grade). Floor between: 2 h; sprinklers carry to every storey below a sprinklered storey (3.2.2.18.(2), refuge_placement.md §2).
- Data-centre exit stairs may not pass through the refuge (3.3.1.3.(8), our reading).
- Whole building takes the refuge's seismic category (Note A-4.1.2.1.(3); arch_ref_nbcT4121). Tall hall over an open refuge storey risks a Type 6 weak storey, barred for High/Post-disaster (our reading, arch_ref_seismicPD).
- Nothing wet over the hall: no showers, washrooms or clinic plumbing above it (fmDS0532 2.2.1.6). In the stacked variant they sit below the hall, which no source restricts (?).

**Beside (E06B):**
- Program row on the street at grade, hall behind, 2 storeys. BE wants a transparent ground floor with visible entrances (arch_zon_EdmZones 5.3.1–2) and loading not between building and street (5.8).
- Wall row ↔ hall: 2 h; 4 h firewall if the row is a separate building (arch_hsg_nbcFirewall 3.1.10.2).
- Patrons' exit access may not pass through service space (NBC(AE) 3.3.1.3.(10)).

**Both:** all three outside the secure line; refuge can open while the hall stays locked (no rule requires it; tool flags). Drop-off 4.0 m wide, 3.5 m clear (arch_svc_vanPkg7). Principal entrance 3–15 m from the fire route (NBC 3.2.5.5).

## 3. Heat

| program | set point | supply | load | hall heat | source |
|---|---|---|---|---|---|
| Refuge | 19–22 °C warming; ≤26 °C cooling | ? | 160 kWh/m²·yr (existing library stock, proxy); peak ? | radiant 45/35 °C (Van) or ≤49 °C (Edm) direct from liquid-cooled 50–60 °C; air-cooled 25–35 °C by heat pump (our reading) | arch_ahsReceptionCentres; arch_vchCoolingSpaces; arch_tmp_vanNEU2020; arch_tmp_edmDESS2025; heat_temp |
| Day shelter | 19–22 °C | ? | ? | as refuge | arch_ahsReceptionCentres |
| Clinic | ? | 45 °C radiant – 70 °C fan coils | 20–30 kWh/m²·yr (Van TEDI cap, a ceiling not a measured load) | radiant direct; fan coils need a lift | arch_hsg_vbblZEBP; arch_tmp_vanNEU2020 |

**Our arithmetic:** refuge 265 × 160 = 42.4 MWh/yr (matches tool run); clinic 498–604 × 20–30 = 10.0–18.1 MWh/yr; shelter ?. Total ≈52–61 MWh/yr + shelter ?.
Hall offers 5,393–8,278 MWh/yr (V339) and 14,252–21,878 MWh/yr (E06B) (tool runs). Under 1.2 % on both.
Cascade (our reading): fan coils (≤70 °C, heat pump) → radiant (45/35 °C) → return to the hall. Stage shares: ? (no peak W/m² for any of the three).
Catch: in a heat event the refuge needs **cooling**, which the hall's heat cannot give.

## 4. Plant layout and backup power

**Power rules (register):**
- Code minimum for an A-2 refuge: emergency lighting 30 min; fire alarm 30 min (arch_ref_emergPower 3.2.7.4, 3.2.7.8). Heat, cooling and filtration in a blackout are design choices.
- Required emergency supply to CSA C282 (arch_open_nbc3275 3.2.7.5.(1)).
- C282:24 (arch_csa_c282): set "on the same property as the building it supplies or on an adjoining property" (6.1.1.1); components 2 h separated (5.2); system "above the flood elevation" (6.2.1); 1 m clear around the set (6.5.1.1); room ≤38 °C running, ≥10 °C idle (6.7, 6.8.1); fuel for ≥2 h at maximum design load on site (7.3.1); "telecommunications and data-processing equipment" may be connected if they do not affect the system (6.4.1 note).
- Vancouver bulletin 2000-015: room holds only the set and emergency equipment; diagram feeds non-life-safety loads through a second transfer switch (ATS2) (arch_open_vanBul2000015). **Our reading:** the hub's heat, fans and filters go on that second switch.
- Generators used for power failures need more fuel (NBC Note A-3.2.7.8.(3), quoted in research_arch_v1/open_items.md §2; no register id yet ?).
- Testing to C282 (NFC 6.5.1.1, arch_open_nfc6511).
- Who may be supplied: BC, owner or **tenant** only, else public utility (bcUCAs1); Alberta, self-supply on the same property by owner or tenant (euaS2); EPCOR bars extending wiring beyond the property (epcorTC2025s44). So the hub must be on the data centre's lot and leased, not sold (our reading).
- Feeding a second building: CSA C22.1 (paywalled, ?).

**Default layout (from sourced distances):**
- Generators in a yard on the side away from the program street front. Insurer order: separate building → yard → ground floor; never roof or basement (fmDS0532 2.6.4.3).
- Generator exhaust ≥3.0 m from refuge intakes (arch_nbc6329, vent row); no exhaust drawn into openings (arch_mv1329 s. 13); downwind of clean-air intakes (arch_hcCleanerAirSpaces).
- Refuge intakes ≥7.6 m from the truck dock and evaporative discharge (arch_nbc6329; arch_nbc63215).
- Yard tanks 1.5 m from the building, 3.0 m from the property line (2,500–50,000 L; arch_csa_b139 Table 2). Diked tank 7.5 m from a noncombustible building (arch_up_fm0788, insurer). Parked fuel truck 15 m from buildings (arch_sep_nfcTankVeh).
- Metro Vancouver: Tier 0/1 engines ≥100 m from a hospital or community care facility (arch_mv1329 s. 57). The clinic is not a sensitive receptor (our reading).
- Noise at the property line: Vancouver 65 dBA night (bylaw6555 s. 2.3(b)(ii)); Edmonton 75/60 non-res, 65/50 res (arch_adj_edm14600). The hub on its own lot is not protected by these (our reading).
- Chillers on the hall roof (tool).
- V339 flood: generators and switchgear above the 4.6 m FCL (C282 6.2.1; arch_hb_vbblFlood).

## 5. Zoning and approvals

| zone | refuge | day shelter | clinic | data centre | source |
|---|---|---|---|---|---|
| Van I-3 (A) | C (Community Centre; Hall; Social Service Centre) | C (SSC) | C (Health Care Office), not at grade except entrances | C | van_zdb_i3 2.1, 2.2.6 |
| Van I-2 | C (Community Centre; SSC; no Hall) | C | C; office + health care office ≤ greater of 235 m² or 33.3 % | C | van_zdb_i2 3.1.1.1(b) |
| Van FC-2 | C | C | C (A, E); offices not at grade | C | van_zdb_fc2 2.2.4 |
| Van I-1C | via SSC only (Community Centre NP) | C | C | C | van_zdb_i1c |
| All Van | non-industrial uses ≤1.00 FSR combined (I-2, I-3) | | | | van_zdb_i3 3.1.1.1(b) |
| Edm BE | P (Community Service) ≤500 m² | P ≤500 m² | P (Health Service) ≤500 m²: 498–604 → **needs a 3.18 variance** (flag, J.B. Q4) | D | arch_zon_EdmZones 3.3.1, 3.12.1, 3.18 |
| Edm IM, IH | NP | NP | NP | D | zoning.md §2 |
| Edm EIB | NP (Community Service D only for recreation, religious assembly) | NP | D on a major Collector+ | D | arch_zns_edmEllerslie |

## 6. Precedents

| precedent | what it shows | kind | source |
|---|---|---|---|
| Fire Hall No. 5 + YWCA Pacific Spirit Terrace, 3090 E 54th Ave, Vancouver (built, 2019) | post-disaster building ("considered a post disaster building") with 31 social housing units (floors 3–6) over a fire hall at grade and second floor; six storeys, 24.1 m, 3,962 m²; separate entries for the fire hall and the residential | gov. (Council report, City page) | typ_emergency_hub_vanFireHall5Report; typ_emergency_hub_vanFireHall5Page |
| Uspenski / Academica data centre, Helsinki | 2 MW data centre in a former WWII bomb shelter; heat to "500 homes"; whether it still serves as a shelter: not stated | UN case study (secondary) | typ_emergency_hub_unepUspenski |
| Data centre with a refuge, warming centre or clinic | **none found** | — | — |

Fire Hall 5 is the closest stacking case (essential-service base, other occupancy above, own entrances), not a data centre.

## 7. Fit on both sites (plant-included tool runs; our arithmetic)

| | V339 (I-3), stacked | E06B (BE), beside |
|---|---|---|
| Allowed floor area / limit | 5,257 m² (envelope) | 6,854 m² (FAR) |
| Tool test | DC 17 %, 894 m², 1.4 MW; programs 30 % = 1,577 m² | DC 35 %, 2,399 m², 3.7 MW; programs 30 % = 2,056 m² |
| Hub share | 853–1,017 = 16–19 % | 12–15 % |
| Ground floor | refuge + shelter 355–413 m² = 20–24 % of the 1,752 m² footprint | all three at grade along the street |
| Height | refuge storey 6.0 + 2 hall storeys × 6.0 = 18.0 ≤ 18.3 m. Clinic floor 4.2–4.5 m (US-plenum arithmetic, heights_precedents.md) under the hall: 16.2–16.5 m, so **1 hall storey**; 3 hall storeys need the 30.5 m approval (6.0 + 4.5 + 18.0 = 28.5) | hall 2 × 6.0 = 12.0 ≤ 16.0; program storey height ? |
| What limits it | street frontage (tool: refuge 265 m² "does not fit on one floor here along the street front"); height; some hall placements fail "2 of 4 generators do not fit in the yard"; flood (generators above FCL) | BE 500 m² cap (clinic variance); generator yard (one hall placement failed on generators) |
| Fits? | yes, conditional uses; clinic costs a hall storey | yes; clinic flagged "needs a variance" |

Other lots: 1425 Clark Dr (I-2): fits, clinic under the office cap rule (33.3 % route). E05 (IM) and 12603 123 St NW (IH): blocked, rezoning.
Geometric maximum (context only): non-industrial cap at V339 is 4,503 m²; E06B has no combined cap, only 500 m² per establishment.

## 8. Gaps and open questions

- Is refuge + shelter one Community Service establishment in BE (combined 355–413 m² ≤ 500) or two?
- Refuge and shelter supply temperature and peak W/m²; shelter kWh/m²·yr.
- Clinic floor-to-floor in a Canadian source (CSA Z8000 Clause 12.3 gives none); refuge and shelter heights: all ?.
- CSA C22.1 rules on feeding a second building or a leased area from the data centre's set (paywalled).
- Whether IT-only sets count as emergency generators (open_items.md §2); if the hub is on them, treat as C282 sets (our reading).
- Combined washroom count (Table 3.7.2.2.-A read for 66 people): ?
- Vancouver I-3 Map 1 sub-area for V339 not re-checked; site grade vs 4.6 m FCL ?.
- No precedent of the combination.


> Check 2 fix (4 Nov 2026, independent agent): Fire Hall No. 5 report reads "a fire hall at grade and second floor"; housing on floors 3–6 (Report Summary p. 2). See checkV2_result.json.
