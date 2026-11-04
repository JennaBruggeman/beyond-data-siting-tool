# Typology 4: Aquaponics (greenhouse + fish farm, tilapia or barramundi)

Research 4 Nov 2026 per `BRIEF.md`. Check 1 only (finding agent). New ids in `aquaponics_sources.json` (`typ_aquaponics_*`); register ids reused as named. "?" = not found. "our arithmetic" / "our reading" = ours, not the source's. "Tool run" = golden arch outputs `checks/golden/arch/{V339,E06B}_arch.json` (tool results, not sources). Shared rules (fire, generators, intakes, noise, secure line) are in `typologies_draft.md` "Rules every typology shares" and are only cited here where they bite.

## Key findings

- **Edmonton names it.** Urban Agriculture's typical examples include "hydroponic or aquaponic systems" (Bylaw 20001 s. 8.10; arch_zon_EdmDefs). Permitted in BE (2.25) and IM (2.16), no floor-area cap, "within or on a building" (BE 3.16.1, IM 3.8.1). Not listed in IH. This settles the earlier "fish-only RAS ?" for the combined version (our reading: fish-only RAS is still ?).
- **Vancouver has no fish use.** Urban Farm – Class B is "cultivation of fruits or vegetables for sale … may take place in a greenhouse" (Section 2, p. 47; van3575s2). Fish are not in it (our reading). Greenhouse half: conditional in I-2, I-3, I-1C, FC-2. Fish half: rezoning.
- **Plant-to-fish area: two Alberta figures that disagree.** Savidov (AB government researcher): commercial model 36 t/yr tilapia on 1,000 m² with **4,000 m²** of basil greenhouse (≈111 m² plants per t/yr, our arithmetic); Brooks pilot 3.7 t/yr with **84 m²** plants (≈23 m² per t/yr). CONFLICT, kept both.
- **Heat.** Tanks 25–31 °C; RAS heating water 35–45 °C; greenhouse 35–60 °C. Liquid-cooled hall heat (50–60 °C) serves both directly; air-cooled (25–35 °C) needs a heat pump (register heat_temp; our reading).
- **Precedents with data-centre heat:** greenhouses only (Baie-Comeau QC; Boden, Sweden). **No built or filed aquaponics-with-data-centre case found in a primary source (?).**
- **Fit:** E06B yes at grade (≈14–16 t/yr in a 2,056 m² programs share, our arithmetic). V339 no as of right (fish = rezoning; tool run finds no free ground).

---

## 1. Program list and room schedule

Sizing goes by fish tonnes per year. Per t/yr (our arithmetic from the sources):

| room | net m² | basis | source id | kind |
|---|---|---|---|---|
| Fish hall (tanks, aisles) | 10–28 per t/yr | FAO "about 1 000 m² per 100 tonnes" (p. 54; per t/yr is our reading); LSU ≈12.3; AB model 1,000 ÷ 36 ≈ 28 | arch_sup_faoRasGuide2022; arch_sup_lsuGhTilapia1998; arch_fish_savidov2015 | intergovernmental guide; US extension; AB government researcher |
| Tanks inside that hall | ≈23 % (AB) to ≈64 % (LSU) of hall | "32 tanks – 10 feet round" | arch_sup_savidovTanks; arch_sup_lsuGhTilapia1998 | as above |
| Greenhouse (plant beds) | 23–111 per t/yr | 84 m² ÷ 3.7 t (pilot) vs 4,000 m² ÷ 36 t (commercial model) | arch_fish_savidov2015; arch_sup_savidovTanks | AB government researcher |
| Headhouse (work, storage, packing, office) | ≥10 % of greenhouse | "at least 10% of the greenhouse area" | arch_sup_purdueHO346 | US extension (benchmark) |
| Filtration, feed store | ? (bead filters, "adjoining storage area", no m²) | — | arch_sup_lsuGhTilapia1998 | — |
| Purge, harvest | ? (post-harvest out of scope, J.B. 2 Nov) | — | notes | — |
| Universal washroom | 4.6 | staff ≤10 → 1 WC (3.7.2.2.(2)); BC universal (3.8.2.8.(4)) | arch_per_nbcWC; arch_sup_abGFNArooms | rule; AB guide by analogy |
| Heat-transfer room (if fed like a NEU building) | 0–18 | 6 × 3 m | neuETS | government guide (analogy) |
| Circulation and walls | ×1.047 on greenhouse | AB large tomato houses | arch_sup_abGhVeg2018 | AB guide (benchmark) |

**Sharing (our arithmetic).** Separately (catalogue): greenhouse 190 + fish farm 685 = 875 m², each with its own WC and support. Combined: one headhouse serves both (packing, feed, office), one WC instead of two (−4.6 m²), one heat-transfer room instead of two (−18 m²). The fish hall's own "office and restroom" (LSU) folds into the headhouse. Saving ≈23 m² plus a shared headhouse; no source sizes a shared aquaponics headhouse (?).

**Total range per t/yr (our arithmetic):** fish 10–28 + plants 23–111 + headhouse 2.3–11.1 ≈ **35–150 m² per t/yr**, plus WC 4.6 and ETS 0–18. Sample, 10 t/yr: ≈355–1,520 m². Savidov's own commercial model: 5,000 m² for 36 t/yr (≈139 m²/t, no headhouse).

## 2. Adjacency and stacking

- **Greenhouse at grade, south of the hall, off its shadow.** Yield −0.7 to −1 % per 1 % less light (arch_marcelis2006); north wall "very little light" (arch_abGhBmp). Edmonton Winter Guidelines: glazing and transitional spaces on the south (arch_up3_edmWinterDG 2.1.5).
- **Fish hall between the hall and the greenhouse** (our reading): it needs no light, shares a wall with the hall (F-2 to F-2, no separation: arch_nbc3131; occupancy F-2 off farmland is our reading, arch_wet_nbcA3121), and its water runs to the plant beds next door.
- **Greenhouse occupancy ?** (F-2, F-3 or A-2; Group G only on farmland, arch_pg_nbcGroupG). If A-2 (public tours): 2 h to the hall. Default: no public tours → F (our reading); tours flagged.
- **Nothing wet over the hall** (fmDS0532 2.2.1.6; arch_sec2_opS710). No greenhouse or tanks on the hall roof. A roof greenhouse also takes the chillers' roof (tool, plant.js).
- **Below the hall:** tanks under a hall: no rule found (?). Not offered.
- **Street side:** greenhouse can face the street (glazed front reads as BE's transparent frontage, BE 5.3, our reading). Entrance from the street outside the secure line.
- **Secure line:** both outside. Shared heat pipe crosses the line at the heat hand-over room (add-on `heat_hub`).
- **Separate building?** Not required (F to F). If built apart, spacing by limiting distance or a 4 h firewall if joined (arch_hsg_nbcFirewall).

## 3. Heat

| program | set point / water | supply °C | annual | peak | direct or lift | source id |
|---|---|---|---|---|---|---|
| Fish tanks, tilapia | best 28 °C (25–30) | heating water 35–45 | heat-only ? (Sweden: 3,086 kWh electricity per t incl. heat, light, ice) | ? | direct from liquid-cooled; lift from air-cooled | arch_fish_omafraTilapia; arch_wet_geofood2022; arch_fish_bergman2020 |
| Fish tanks, barramundi | max growth ≈31.4 °C | 35–45 (RAS, by analogy) | ? | ? | as above | arch_fish_katersky2007 |
| Greenhouse | 16–20 °C air; root zone 13–24 °C | 35–60 (benches 35–40) | 413–583 kWh/m²·yr (Prairie, our arithmetic) | 627 W/m² floor (Quebec, our arithmetic) | benches direct from liquid; air-cooled needs lift | arch_asabeEp406; arch_mbGhEnergy; arch_ahamed2019; arch_etsBaieComeau; arch_hce_rutgersRootZone |

**Cascade (our reading).** Hall → greenhouse heating (35–60 °C) → RAS heating water (35–45 °C) → tanks at 25–31 °C → tank water to plant beds (root zone 13–24 °C). Fish water to plants is the nutrient loop, not the heat loop; tank water at 28 °C is warmer than the root-zone range, so it may need cooling before the beds (?; no source on aquaponic bed temperature, FAO TP 589 §3.2.3 not read).

**How much each stage takes, 15 t/yr at E06B (our arithmetic):** greenhouse 1,665 m² × 413–583 = **690–970 MWh/yr**; fish heat-only ?. Against E06B's 14,252–21,878 MWh/yr on offer (tool run), ≈3–7 %. Greenhouse peak 1,665 × 627 W/m² ≈ 1.0 MW (Quebec figure; Edmonton peak ?).

**Catch:** gas heating also gives greenhouses CO₂; data-centre heat does not (arch_berenschotHK). CO₂ source ?.

## 4. Plant layout (default)

- Greenhouse south/street, fish hall against the hall's south wall, headhouse at the shared end (our design).
- Generators and fuel in a yard on the **north or rear**, away from the glass: intakes ≥3.0 m from combustion vents (arch_nbc6329); Metro Vancouver: no stack exhaust drawn into intakes (arch_mv1329 s. 13). Greenhouse vents count as intakes (our reading).
- Truck dock ≥7.6 m from greenhouse and fish-hall intakes (arch_nbc6329). Feed and harvest share the data centre's dock only if the dock stays inside the secure line and the hand-over is a door (our reading; no source).
- Fuel: yard tank 3.0 m from property line, 1.5 m from building (arch_csa_b139); diked 7.5 m (arch_up_fm0788, insurer).
- Chillers on the hall roof (tool). Evaporative units 7.6 m from intakes, 3 m from occupiable outdoor space (arch_nbc63215). Dry coolers: no code distance.
- Noise: property-line limits (bylaw6555; arch_adj_edm14600) do not protect programs on the same lot (our reading). Fish staff hours are day-time.
- Heat: one heat-recovery room at the hall's south wall, feeding both (add-on `heat_hub` sizes it).

## 5. Zoning and approvals

| zone | greenhouse | fish | clause | source id |
|---|---|---|---|---|
| Edmonton BE | Urban Agriculture **P**, within or on a building, no cap | **P** as aquaponics (named example) | 2.25, 3.16.1; 8.10 | arch_edmZB20001_BE; arch_zon_EdmDefs |
| Edmonton IM | **P** | **P** as aquaponics | 2.16, 3.8.1 | arch_edmZB20001_IM |
| Edmonton IH | not listed (NP) | NP | 2.1–2.11 | arch_pub_edmZB |
| Edmonton EET/EI zones | D or P by zone (EIM P 2.6) | as greenhouse | zones.md §3 | arch_zns_* |
| Vancouver I-3, I-2, I-1C, FC-2 | Urban Farm – Class B **C** | **rezoning** (no fish use) | Sec. 2 p. 47; s. 2.1 | van3575s2; van_zdb_* |

- Vancouver I-3: the greenhouse is not in the 3.00 FSR industrial bucket, so it counts in the 1.00 FSR "all other uses" (3.1.1.1(b); our reading) → 4,503 m² on V339.
- **Fish licences.** Alberta: commercial fish culture licence ($500 / 5 yr); species from Table 1 only: tilapia ("contained waters only") and barramundi are on it; Water Act licence for some projects (arch_wet_abFishCulture). BC: federal land-based aquaculture licence (arch_wet_dfoAuthBC2025); species "other than species currently licensed by DFO" need an Introductions and Transfers Committee review (arch_fish_bcLBGuide2017 p. 26; arch_fish_dfoITC); tilapia and *Lates* are not on the Controlled Alien Species list (arch_fish_bcCAS); waste registration before construction (arch_wet_bcLBFWCR s. 4(1)). Whether tilapia is now licensed in BC: ? (DFO CSV blocked).
- Sewer: Metro Vancouver ≥65 °C prohibited (arch_mvSewerBylaw299).

## 6. Precedents

| precedent | what it shows | source id | kind |
|---|---|---|---|
| Baie-Comeau, QC | 153 m² gothic greenhouse on a 1 MW server room; heat pump lifts to 60 °C; 96 kW peak; −66 % vs propane | arch_etsBaieComeau | university summary |
| Boden, Sweden | "300-square-meter smart greenhouse" on a "half-megawatt data center" (GDA) | typ_aquaponics_bodenGH | municipal news (operator facts) |
| RISE, Boden / ICE Luleå | DC exhaust air "about 30–45 °C"; vertical hydroponic lettuce; "fish and insect farms" planned, not built | typ_aquaponics_riseLettuce; typ_aquaponics_riseDCFarming | research institute pages |
| Brooks, AB (CDC South) | aquaponics pilot 3.7 t/yr tilapia, 73 m³, 84 m² plants (no data centre) | arch_fish_savidov2015 | AB government researcher |
| Green Mountain, Norway | trout and lobster on DC heat (cold species, claims) | arch_wet_greenMountain2021; arch_fish_investNorway2023 | OPERATOR CLAIM |
| Chen 2024 (China) | cites a DC heating a fish pond, second-hand, no figures | arch_fish_chen2024 | peer-reviewed (mention only) |
| Aquaponics + data centre, built | **? none found** (a Finnish bachelor's thesis turned up in search: not used) | — | — |

## 7. Fit on both sites (our arithmetic, tool-run ratios)

**E06B (BE).** Tool run: allowed 6,854 m² (FAR), DC 35 % (2,399 m², 3.7–8.1 MW), programs 30 % = 2,056 m²; hall footprint ≈1,200 m² over 2 storeys; buildable footprint 4,022 m².
- Per t/yr 132–150 m² (fish + plants at 111 m²/t + headhouse) → 2,056 ÷ 150–132 ≈ **13.7–15.6 t/yr**, all at grade (one storey; greenhouse gutter 4–5.5 m, arch_hb_abGreenhouse).
- Ground left after hall (≈1,200) and programs (2,056) ≈ 770 m² for plant yard, loading, fuel and setbacks; whether that holds the generator yard: ? (tool run already capped the DC by "2 of 4 generators do not fit in the yard").
- Limits: ground area and sun (greenhouse cannot stack), not zoning or heat.

**V339 (I-3).** Tool run: allowed 5,257 m² (envelope), buildable footprint 1,752 m², DC 17 % (894 m²).
- Fish: rezoning. Greenhouse alone: conditional, but the tool run found no free ground ≥6 × 6 m left beside hall, plant, yard and loading.
- Limits: zoning (fish), ground (greenhouse), sun under an 18.3 m building (?; orientation of the lot ?).

## 8. Gaps and open questions

- Plant-to-fish area: commercial 111 vs pilot 23 m² per t/yr. Which to use? FAO TP 589 feed-rate ratio (p. 17) not read (body text not returned by the reader).
- Heat-only kWh per t of fish; aquaponic bed water temperature.
- Greenhouse occupancy (F or A-2) — AHJ question.
- BC: is tilapia or barramundi currently licensed? ITC outcome.
- Fish-only RAS under Edmonton Urban Agriculture (definition names "aquaponic", not fish alone).
- CO₂ source for the greenhouse.
- Any built aquaponics farm on data-centre heat (primary source).


> Check 2 fix (4 Nov 2026, independent agent): Urban Farm – Class B definition is on Section 2 p. 47, not p. 46 (two places). See checkV2_result.json.
