# Typology 2 — Warm bath (spa + therapy pool beside the hall)

Research 4 Nov 2026 per `checks/research_typ/BRIEF.md`. Check 1 only (finding agent's read). Sources: existing register ids, plus new `typ_warm_bath_*` ids in `warm_bath_sources.json`. "?" = not found. "Our arithmetic" / "our reading" labelled. ASHRAE ch. 6 is a single-user licensed copy: figures quoted only, no text reproduced beyond short phrases.

## Short answer

- Spa ≈297–346 m² + therapy pool ≈130–150 m² (catalogue, our arithmetic from sourced parts). Shared reception, universal room and chemical store save only ≈12–14 m² (our arithmetic). Typology total **≈415–485 m²**, plus sauna and rest area (?).
- One storey, at grade, **beside** the hall with no hall above (FM 5-32 2.2.1.6). Plant side on a yard or lane.
- Heat: water 36–40 °C (spa) and 29–35 °C (therapy). Liquid-cooled hall heat (50–60 °C) can serve both without a heat pump (our reading); air-cooled heat (25–35 °C) needs one for both.
- Zoning: Vancouver I-3 spa **conditional**, therapy pool **?**; Edmonton BE therapy pool **permitted** (≤500 m²), spa **?** (no defined use). Fits both test sites on floor area; V339 ground floor is the pinch.

---

## 1. Program and room schedule

### Spa (bathhouse / Nordic spa), small working version

| room | net m² | basis | source id |
|---|---|---|---|
| hot pool (incl. ramp) | 40 | Eastglen hot pool (proxy) | arch_sup_eastglenRooms |
| hot-pool deck | 33–35 | NBC(AE) 7.2.6.2 whirlpool deck, jetted only; 5 × 8 m pool, shape assumed (our arithmetic) | arch_wet_nbcAE726 |
| steam room | 18 | Eastglen, max 12 people (proxy) | arch_sup_eastglenRooms |
| cold plunge | 1.6 | tub ≈1.8 × 0.9 m (operator survey) | arch_wet_vanRTS16473 |
| sauna | ? | only "maximum height of 3.6 m" (survey) | arch_wet_vanRTS16473 |
| rest / relaxation | ? | — | — |
| dressing | 20 | 40 bathers × 0.5 m² (AB rule) | arch_sup_nbcAE7Pools |
| shower + WC rooms | 56 | Eastglen 28 m² per sex (proxy) | arch_sup_eastglenRooms |
| universal dressing/shower | 6 | required (NBC 3.8.2.8.(13)); Eastglen 6 m² | arch_sup_nbcUniversal |
| reception + staff change | 35 | Eastglen 15 + 20 (proxy) | arch_sup_eastglenRooms |
| chemicals, towel laundry, custodial | 19 | Eastglen 3 + 6 + 10 (proxy) | arch_sup_eastglenRooms |
| office, storage, garbage | ? | — | — |
| circulation, walls, mech, pool plant | ×1.3–1.5 | recreation grossing (pool plant inside the factor) | arch_edmEastglen2017 |
| **gross** | **≈297–346** | catalogue (tool/arch_programs.json `spa`), our arithmetic | — |

BC limits that set rooms: change room ≥0.32 m²/bather, excluding showers and WCs (BC guide 5.1); hot-tub bather load 0.6 m of bench per person (8.7); turnover ≤30 min (7.2) (typ_warm_bath_bcPoolGuide).

### Therapy pool

| room | net m² | basis | source id |
|---|---|---|---|
| pool 4 × 6 m | 24 | 12 bathers at 2 m² (UK benchmark) | arch_wet_atacp2019 |
| concourse | 47.2 | 2 m on 2 sides, 1.5 m on others (our arithmetic) | arch_sup_atacpSupport |
| changing | 8 | 16 bathers × 0.5 m² (AB) | arch_sup_nbcAE7Pools |
| Changing Places room | 12 | 3 × 4 m with hoist | arch_sup_atacpSupport |
| accessible shower + WC | 6 | 2.4 × 2.5 m | arch_sup_atacpSupport |
| chemical store | 3 | bunded; Eastglen proxy | arch_sup_atacpSupport; arch_sup_eastglenRooms |
| bather showers/WCs; office, rest, reception, storage | ? | named, no size | arch_sup_atacpSupport |
| grossing | ×1.3–1.5 | plant 15–30 % of water inside | arch_edmEastglen2017; arch_wet_atacp2019 |
| **gross** | **≈130–150** | catalogue `therapy_pool` | — |

### Sharing (our arithmetic)

| shared part | saved net m² | saved gross (×1.3–1.5) | basis |
|---|---|---|---|
| therapy chemical store folded into the spa's | 3 | 4–4.5 | BC 9.9 still wants separate rooms for chlorine and acid (typ_warm_bath_bcPoolGuide); one room set serves both pools (our reading) |
| one universal dressing/shower room | 6 | 8–9 | NBC 3.8.2.8.(13) asks for one where showers serve the public (our reading: one per facility) |
| reception (therapy pool has none sized) | 0 | 0 | — |
| **total** | **9** | **≈12–14** | — |

**Plant is shared as a room, not as a system:** BC guide 7.2 "All pools should be on separate and independent circulation systems"; hot tub may be filled from the pool, "but not vice versa" (typ_warm_bath_bcPoolGuide). AB: whirlpools on an "independent circulation system" (arch_wet_nbcAE726).

**Typology total:** spa 297–346 + therapy 130–150 − 12–14 = **≈415–485 m²**, plus sauna and rest area (?) (our arithmetic).

## 2. Adjacency and stacking

| rule | value | source id | kind |
|---|---|---|---|
| Nothing wet over the hall | "Do not route cooling or domestic liquid piping above" the hall | fmDS0532 (2.2.1.6) | insurer guide |
| Washrooms, heating water above the hall | listed as things to consider | arch_sec2_opS710 | insurer guide (Finland) |
| Below the hall | no rule either way (?) | — | — |
| Stacking used | one storey at grade, beside the hall; no hall above (our reading of the two rows above) | — | our reading |
| Pool plant room | "Only pool-related equipment should be stored in Equipment Rooms" (BC 9.8) | arch_adj_bcPoolDesign | gov. guide |
| Pool access | "Direct access to the pool should be prevented from all buildings" (BC 3.1) | arch_adj_bcPoolDesign | gov. guide |
| Fence | barrier with controlled access around pool and walkways (BC Reg. s. 7(1)); guide: 1.5 m, non-climbable | arch_wet_bcPoolRegDefs; typ_warm_bath_bcPoolGuide | rule; gov. guide |
| AB plant room | reasonably accessible from the pool enclosure; extra outside access for public pools (NBC(AE) 7.2.3.38) | arch_svc_nbcae72 | rule (AB) |
| AB chlorine-gas room | 1 h; no door into the building; outward door to outside | arch_adj_abStandataCl | gov. guide (AB) |
| Chlorine exhaust | ≥3 m from intakes, intake not below | arch_adj_nbcAE72 | rule (AB) |
| Spa exhaust | intake grilles close to the warmest water; best air quality with intakes over whirlpools (ASHRAE p. 6.6) | arch_up4_ashraeCh6Pools | design guide (US) |
| Pressure | natatorium −15 to −40 Pa | arch_up4_ashraeCh6Pools | design guide (US) |
| Street side | entrance on the street (Vancouver 10.21.1: each separate use's main entrance from a street) | arch_up_vanZDB10 | rule |
| Secure line | outside it; shares only the heat hand-over (handover.md: hand-over room on the line, our design) | — | our reading |

**Fire separations (BCBC 2024 / NBC Table 3.1.3.1, read locally):**

| pair | rating | source id |
|---|---|---|
| spa or therapy pool (A-3) – data centre (F-2) | 2 h | arch_nbc3131; typ_warm_bath_bcbc3131 |
| spa (A-3) – therapy pool (A-3) | none (same occupancy) | typ_warm_bath_bcbc3131 |
| therapy pool inside a D clinic – F-2 | D/F-2 none; pool part still A-3 ? → 2 h | arch_wet_nbcA3121 |
| spa read as D (personal service) – F-2 | none (AHJ to confirm) | arch_wet_nbcA3121 |
| separate building joined to the DC | 4 h firewall | arch_hsg_nbcFirewall |

## 3. Heat

| program | water / air °C | supply needed | annual kWh/m²·yr | peak W/m² | hall heat | source id |
|---|---|---|---|---|---|---|
| spa hot pool | water 36–40, air 27–29, RH 50–60 % | ? (our reading: >40 °C at the exchanger) | ? | evaporation ≈440 W/m² of water (our arithmetic, below) | liquid-cooled direct (our reading); air-cooled via heat pump | arch_up4_ashraeCh6Pools; arch_bcPoolReg296 |
| spa sauna / steam | dry 80–100 (AB cap 85); steam ≤60 | electric heater (CSA C22.2 No. 164) | ? | ? | not served by hall heat (our reading) | arch_wet_ncceh2026; arch_wet_abPoolStdSauna |
| therapy pool | water 29–35 (ATACP 32–35.5), air 27–29 | ? (our reading: ≥~40 °C) | ? | evaporation ≈205 W/m² of water (our arithmetic) | as spa | arch_up4_ashraeCh6Pools; arch_wet_atacp2019 |
| showers | ≤49 °C (BC Reg. and BCBC); 32–43 recommended | DHW | ? | ? | heat pump for DHW (our reading) | typ_warm_bath_bcPoolGuide |

**Evaporation load (our arithmetic, low confidence).** ASHRAE ch. 6 Eq. (3): evaporation = 4 × 10⁻⁵ · A · (pw − pa) · Fa kg/s, pressures in kPa; Fa: whirlpools/spas 1.0, therapy 0.65 (Table 1) (typ_warm_bath_ashraeCh6Evap). Inputs: saturation pressures 6.63 kPa (38 °C), 5.32 kPa (34 °C), 3.78 kPa (28 °C) from steam tables (typ_warm_bath_satPressure: not a register source, ?); latent heat ≈2,430 kJ/kg.
- Spa 38 °C water, air 28 °C at 55 % RH: (6.63 − 2.08) × 4 × 10⁻⁵ × 1.0 = 1.82 × 10⁻⁴ kg/s·m² → **≈440 W/m² of water**; 40 m² hot pool ≈18 kW.
- Therapy 34 °C water, same air: (5.32 − 2.08) × 4 × 10⁻⁵ × 0.65 → **≈205 W/m²**; 24 m² ≈5 kW.
- This is the water-side evaporation loss only; ventilation air, fabric and refill are not included (?).

Year: no public primary kWh/m²·yr for spa or therapy pools (prog_wet.md gap stands: ?).

## 4. Plant layout (default)

| item | rule | source id | kind |
|---|---|---|---|
| Generators | separate building > yard > ground floor; never roof or basement | fmDS0532 2.6.4.3 | insurer guide |
| Genset spacing | 2 m between sets | arch_csa_c282 | standard |
| Yard tanks | 3.0 m from property line, 1.5 m from building | arch_csa_b139 | standard |
| Diked tank | 7.5 m to a noncombustible building | arch_up_fm0788 | insurer guide |
| Fuel truck | unloading without containment 23 m; parked >1 h 15 m from a building | arch_up_fm0788; arch_sep_nfcTankVeh | insurer; rule |
| Spa/therapy intakes | ≥7.6 m from truck dock; ≥3.0 m from combustion vent | arch_nbc6329 | rule |
| Evaporative coolers | 7.6 m from intakes; 3 m from doors, windows, occupiable outdoor space | arch_nbc63215 | rule |
| Metro Van | no stack exhaust drawn into openings or intakes (s. 13); Tier 0/1 engines ≥100 m from community care etc. (s. 57) | arch_mv1329 | rule |
| Noise | Van 65 dBA night (activity zone); Edm 75/60 non-res, 65/50 res at property line; limits do not protect programs on the DC's own lot | bylaw6555; arch_adj_edm14600 | rule |
| Heat hand-over | hand-over room on the secure line (our design; NEU min 6 × 3 m) | neuETS; handover.md | gov. guide; our design |

**Default layout (our reading):** street → warm bath (one storey, entrance on the street, glazed front) → hall behind, chillers on the hall roof (dry coolers, so the 7.6 m evaporative rule does not bite) → generator yard and fuel at the rear corner farthest from the warm bath's intakes; loading on the far side. Pool plant and chemical rooms on the warm bath's yard or lane wall; hand-over room between the warm bath plant room and the hall's heat-recovery room.

## 5. Zoning and approvals

| zone | spa | therapy pool | clause / source id |
|---|---|---|---|
| Van I-3 (V339) | **C** Beauty and Wellness Centre (hydrotherapy, thermal therapy) | **?** Swimming Pool not listed; accessory to Health Care Office (C, sub-area A, **not at the ground floor**) ? | van_zdb_i3 2.1, 2.2.6, 2.2.12 |
| Van I-2 | C | ? (Health Care Office C) | van_zdb_i2 |
| Van FC-2 | C | ? (Health Care Office only sub-areas A, E) | van_zdb_fc2 |
| Van caps | I-3 non-industrial ≤1.00 FSR combined | — | van_zdb_i3 3.1.1.1(b) |
| Edm BE (E06B) | **?** no defined use: Indoor Sales and Service ("personal service", ≤500 m², 3.7.1) or Minor Indoor Entertainment ("active recreation", no cap) (our reading) | **P** Health Service ≤500 m² (3.3.1) | arch_zon_EdmZones; arch_zon_EdmDefs |
| Edm BE variance | 3.18: cap may be varied "if adequate mitigation measures are used" | — | arch_zon_EdmZones |
| Edm IM, IH | **rezoning**: none of Health Service, Indoor Sales and Service (IM: existing only), Minor Indoor Entertainment listed | — | arch_zon_EdmZones (2.130 s. 2; 2.140 s. 2) |
| BC health | construction permit, plans sealed (Pool Reg. s. 5); hot tub = pool; sauna = personal service establishment | arch_bcPoolReg296; arch_wet_bcRAR161 |
| Van licence | DP, BP, OP and business licence | arch_wet_vanRTS16473 |

## 6. Precedents

| precedent | what it shows | source id | kind |
|---|---|---|---|
| Eastglen Leisure Centre, Edmonton (2017 functional program) | hot pool 40 m² + steam room 18 m² share change rooms, desk and plant with a lap pool; plant ≈⅓–½ of water inside a 1.3–1.5 grossing factor | arch_edmEastglen2017; arch_sup_eastglenRooms | government |
| Ogden Ave barge spa, Vancouver (RTS 18653) | 870 m² over three levels, hot and cold baths, saunas; no room breakdown | arch_wet_vanCD1Ogden | government report |
| Exmouth Leisure Centre, UK | immersion-cooled "digital boiler" heats pool water; "62%" gas cut (Deep Green claim, projected) | arch_ho_eddcExmouth | operator claim (UK) |
| Oró et al. 2018 | liquid-cooled data centre heat to an indoor pool (design and economic study); figures not read (?) | typ_heat_cascade_oro2018 | peer-reviewed (title/metadata only) |
| Data centre + spa, built | ? none found | — | — |

## 7. Fit on both sites (our arithmetic; plant-included ratios from the 3 Nov golden runs, tool results not sources)

| | V339 (I-3) | E06B (BE) |
|---|---|---|
| Allowed floor area (tool) | 5,257 m² (envelope) | 6,854 m² (FAR 1.6) |
| Programs' share at plant-included ratio (tool) | 30 % = 1,577 m² | 30 % = 2,056 m² |
| Warm bath 415–485 m² | 7.9–9.2 % of floor area; 26–31 % of the programs' share | 6.1–7.1 %; 20–24 % |
| At grade | needs ≈415–485 m² of ground floor with no hall above; the run left the spa unable to fit one floor once the refuge took the street front | footprint 4,022 m²; fits |
| Height | ground storey ≥6.0 m (I-3 3.1.2.9) covers therapy hall ~4.5 m clear and sauna ≤3.6 m | 16.0 m; one storey |
| Caps | well under I-3 1.00 FSR (4,503 m²) | each ≤500 m²; combined 415–485 m² also ≤500 if counted as one establishment (our reading) |
| **Verdict** | spa fits (C); therapy pool ? (not at grade if a Health Care Office) | therapy pool fits (P); spa use ? |
| What limits it | ground-floor frontage shared with other public programs; therapy-pool use class | spa use class only |

## 8. Gaps and open questions

- Spa use class in Edmonton BE (Indoor Sales and Service vs Minor Indoor Entertainment); Development Planner's call (?).
- Therapy pool use in Vancouver I-3 (accessory to Health Care Office keeps it off the ground floor ?).
- Sauna and rest-area m²; spa staff count; spa code class (A-3 or D).
- Annual kWh/m²·yr and supply temperature for hot pools and therapy pools (?).
- Steam-table inputs to the evaporation arithmetic are not in the register (?).
- No filed plan of a spa beside a data hall.
