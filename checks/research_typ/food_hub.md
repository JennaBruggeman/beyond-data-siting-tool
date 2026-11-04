# Typology 5: Food hub (greenhouse + community kitchen)

Research 4 Nov 2026 per `BRIEF.md`. Check 1 only. New ids in `food_hub_sources.json` (`typ_food_hub_*`); register ids reused. "?" = not found. "our arithmetic" / "our reading" labelled. "Tool run" = golden arch outputs (not sources). Shared rules: `typologies_draft.md`.

## Key findings

- **Kitchen exhaust distances (primary):** NBC/BCBC/NBC(AE) Table 6.3.2.9: outdoor air intake ≥**3.0 m** from "Kitchen cooking exhaust" (arch_nbc6329, re-read in local nbc.txt). NBC 6.3.1.6.(1) sends the rest to **NFPA 96** (paywalled). Vancouver's K2 kitchen ventilation form restates NFPA 96 7.8: exhaust **10 ft (3.05 m)** from air intakes and property lines, **40 in (1.02 m)** above the roof.
- **Vancouver adds (VBBL 6.3.1.6.(2)–(4)):** a wall termination within **3 m of a lane, property line or street property line** needs an "ecology unit" (99.97 % grease removal); no exhaust onto pedestrians or over outdoor seating; must meet the Noise By-law.
- **Kitchen heat 60–71 °C needs a lift:** DHW 60 °C; high-temperature dishwasher final rinse "at least 71 C … at plate level". Above both air-cooled (25–35 °C) and liquid-cooled (50–60 °C) hall heat → heat pump (and booster for 71 °C) (our reading).
- **Edmonton BE kitchen use class — resolved (our reading):** "commercial kitchens" are a typical example of **Custom Manufacturing**, **P in BE (2.7)**, enclosed building (3.6.1), **no floor-area cap**. A teaching kitchen open to the public may instead read as Community Service or Food and Drink Service (both P, **≤500 m²**). IM: Custom Manufacturing P with ≤150 m² Public Space. IH: not listed.
- **Precedent:** The Stop's Green Barn, Toronto (2008): 280 m² greenhouse + industrial kitchen (university exhibit board). No data-centre-heated food hub found (?).

---

## 1. Program list and room schedule

| room | net m² | basis | source id | kind |
|---|---|---|---|---|
| Growing house | 153 | Baie-Comeau DC-heat greenhouse | arch_etsBaieComeau | university summary |
| Headhouse | 15.3 | ≥10 % of greenhouse | arch_sup_purdueHO346 | US extension (benchmark) |
| Teaching kitchen (12 participants) | 111.6 | 12 × 9.30 m²/p code kitchen density: **indicative, not a size rule** (our arithmetic) | arch_sup_nbcOccLoadOther; arch_hsg_vanKitchenDG2018 | rule (egress density); City guide (≈12 participants) |
| Dining next to kitchen | 14.4 | 12 × 1.20 m²/p (our arithmetic) | arch_pub_nbc31171; arch_hsg_vanKitchenDG2018 | rule; City guide |
| Janitor / mop sink | 7.0 | GFNA housekeeping (analogy) | arch_sup_abGFNArooms | AB guide |
| Dry store, walk-in cooler, waste, grease interceptor, loading | ? (required or advised, no m²) | — | arch_hsg_vanKitchenDG2018 | City guide |
| Universal washroom | 4.6 | — | arch_per_nbcWC; arch_sup_abGFNArooms | rule; guide |
| Heat-transfer room | 0–18 | 6 × 3 m (analogy) | neuETS | City guide |
| Grossing | greenhouse ×1.047; kitchen ×1.3–1.5 | — | arch_sup_abGhVeg2018; arch_edmEastglen2017 | guides |

Catalogue totals: greenhouse 190 m² (181–199), kitchen 185 m² (173–200) → **≈354–399 m²** apart (our arithmetic).

**Sharing (our arithmetic):** one universal WC (−4.6), one heat-transfer room (−18), one loading/waste area, and the headhouse doubles as the kitchen's receiving and dry store (Vancouver guide: "loading → cooler → service"; arch_hsg_vanKitchenDG2018 3.i). Combined ≈**330–380 m²**. Limit: washrooms "may not open directly into any room where food is … prepared" (arch_hsg_ihFoodPlans2026 p. 4), and BC food premises must be separate from "incompatible" areas (arch_adj_bcFPR 4(1)(d)) — so the greenhouse work area cannot be the kitchen prep room.

## 2. Adjacency and stacking

- **Greenhouse at grade on the sunny side** (arch_marcelis2006); kitchen between greenhouse and street, dining on the street front (our design; dining must sit next to the kitchen, arch_hsg_vanKitchenDG2018 3.i).
- **Kitchen occupancy ?**: public teaching or dining → A-2 → **2 h** to F-2; production only → F-3 or D (none or 1 h) (arch_hsg_nbcOcc; arch_hsg_nbc3131D). Default A-2 (public program).
- **Kitchen exhaust vs every intake ≥3.0 m** — includes the data centre's and the greenhouse's vents (our reading: a greenhouse vent is an outdoor air opening).
- **Grease duct:** a vertical grease duct through other floors needs a rated enclosure (NBC 3.6.3.5; NFPA 96). Under the hall (V339 ground-floor case) it would rise through the hall. Default: **no kitchen under the hall**; kitchen in a one-storey wing with roof exhaust (our reading). Nothing wet over the hall (fmDS0532 2.2.1.6).
- **Edmonton:** AB Food Code "minimum set back of 30 metres is recommended from potential sources of contamination" ("should"; arch_adj_abFoodCode s. 2.1(b)). Whether generators count: ? (our reading: treat the generator yard and dumpsters as sources; flag, not block).
- **Secure line:** both outside; separate public entrance from the street (Van 10.21.1, arch_up_vanZDB10).

## 3. Heat

| program | temperature | supply | annual | peak | direct or lift | source id |
|---|---|---|---|---|---|---|
| Greenhouse | 16–20 °C air | 35–60 °C | 413–583 kWh/m²·yr (Prairie) | 627 W/m² floor (Quebec) | direct from liquid; air-cooled needs lift | arch_asabeEp406; arch_mbGhEnergy; arch_etsBaieComeau |
| Kitchen DHW | stored/supplied 60 °C | 60 °C | ? (heat alone); total energy restaurants 3.17 GJ/m² ≈ 881 kWh/m² (all uses) | ? | **heat pump** | neuConnect; arch_hsg_nrcanMedian2018 |
| Dishwasher rinse | ≥71 °C at plate (high-temp) or ≥38 °C (chemical) | — | — | — | **booster or chemical machine** | arch_hsg_ihFoodPlans2026 |
| Make-up air | tempered to indoor design temperature | ? | ? | ? | heat pump or direct (?) | arch_hsg_nbc6316 6.3.2.8 |

**Order (our reading):** not a cascade. The greenhouse takes hall heat directly; the kitchen takes it through a heat pump (source side = hall loop). Kitchen DHW is used and drained, so nothing returns. Low-temperature chemical dishwashing (≥38 °C) removes the 71 °C step.

**Our arithmetic, sample:** greenhouse 190 m² × 413–583 = 78–111 MWh/yr. Kitchen heat ?. Against 5,393–8,278 MWh/yr (V339) or 14,252–21,878 (E06B) on offer (tool run): <2 %.

## 4. Plant layout (default)

- Kitchen exhaust fan on the kitchen's own roof, 1.02 m above roof, ≥3.05 m from intakes and property lines (Vancouver K2 / NFPA 96 7.8); ≥3.0 m from any intake (arch_nbc6329). If a wall termination is within 3 m of a lane or property line in Vancouver: ecology unit (VBBL 6.3.1.6.(2)).
- Generators and fuel on the far side of the hall from kitchen and greenhouse; truck dock ≥7.6 m from intakes (arch_nbc6329); dumpsters 9 m from buildings (FM 1-20, insurer) and ≥4.5 m from intakes (Table 6.3.2.9).
- Shared loading: kitchen deliveries need their own loading outside the secure line (our reading; Vancouver Class B loading counts each use separately, arch_up3_vanPkg5 5.1.5).
- Heat pump for kitchen DHW in the heat-recovery room (add-on `heat_hub`); refrigeration machinery-room door may not open to an assembly room (arch_up2_b52 6.2.2.2) → not off the dining room.

## 5. Zoning and approvals

| zone | greenhouse | kitchen | clause | source id |
|---|---|---|---|---|
| Edmonton BE | Urban Agriculture **P**, within or on a building | Custom Manufacturing **P** ("commercial kitchens"), enclosed, no cap; or Community Service / Food and Drink **P ≤500 m²** (variance 3.18) | 2.25, 3.16.1; 2.7, 3.6.1; 2.8, 2.19, 3.3.1, 3.12.1; 8.10 | arch_edmZB20001_BE; typ_food_hub_edmCustomMfg |
| Edmonton IM | **P** | Custom Manufacturing **P**, Public Space ≤150 m² | 2.16; 2.6, 3.4.1 | arch_edmZB20001_IM; typ_food_hub_edmCustomMfg |
| Edmonton IH | NP | NP | 2 | arch_pub_edmZB |
| Vancouver I-3 | Urban Farm – Class B **C** | Catering Establishment **C**; community kitchen inside a Community Centre **C** (our reading) | 2.1 | van_zdb_i3; arch_pub_vanSched |
| Vancouver I-2, I-1C, FC-2 | **C** | Catering **O** | 2.1 | van_zdb_i2/i1c/fc2 |

- I-3 floor area: both fall in the 1.00 FSR "all other uses" bucket (catering is conditional, not an outright service use) → ≤4,503 m² on V339 (3.1.1.1(b); our reading) (typ_food_hub_vanI3Fsr).
- Health approvals: BC plans approved by a health officer (arch_adj_bcFPR s. 3(1)); VCH permit decided by design (arch_hsg_vanKitchenDG2018 2.2). Edmonton: AHS plan approval, reviewed through Planning & Development (arch_hsg_ahsFoodEdm2019 pp. 4–5).

## 6. Precedents

| precedent | what it shows | source id | kind |
|---|---|---|---|
| The Stop Green Barn, Artscape Wychwood Barns, Toronto (2008–) | "280 m2 greenhouse" + "industrial kitchen that opens to a gathering/event space"; geothermal heat | typ_food_hub_greenBarn | university exhibit board (Carrot City, TMU); DESIGNER/OWNER facts |
| Baie-Comeau, QC | DC heat to a 153 m² greenhouse, lifted to 60 °C | arch_etsBaieComeau | university summary |
| City-affiliated kitchens, Vancouver | design rules for community kitchens in City facilities | arch_hsg_vanKitchenDG2018 | City guide |
| Food hub on data-centre heat | **? none found** | — | — |

## 7. Fit on both sites (our arithmetic)

- **E06B:** ≈330–380 m² = 4.8–5.5 % of 6,854 m²; well inside the 2,056 m² programs share (tool run). One storey at grade south of the hall. Limits: sun, the 30 m food setback advice vs the generator yard (lot depth ?).
- **V339:** ≈330–380 m² = 6.3–7.2 % of 5,257 m² (tool run), inside the 4,503 m² non-industrial cap. Kitchen could take ground floor (I-3 bars data storage at grade, 2.2.11) but not under the hall (grease duct; our default). Greenhouse: tool run finds no free ground ≥6 × 6 m. Limits: ground area and sun.

## 8. Gaps and open questions

- NFPA 96 itself (paywalled; J.B. via UBC Library) — K2 figures are the City's summary.
- Kitchen size: no Canadian m² for a community kitchen (sup_care.md); 12-person size is indicative.
- Kitchen occupancy A-2 vs F-3/D (AHJ).
- Kitchen heat (not total energy) per m²; make-up air load.
- Does a generator count as a "source of contamination" under the AB 30 m advice?
- Edmonton: which use class the City would assign to a public teaching kitchen.
