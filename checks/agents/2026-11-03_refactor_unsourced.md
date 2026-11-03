# Figures with no register id (lean refactor, 3 Nov 2026)

These figures were met while moving each file's tables into `tool/data/`. None has an id in `register/formula_register.json` (new_sources, quantities or rule ids), so none was given one. They stay in code, working as before. `checks/tests/register_wiring.js` reads this table (file, line, value) and leaves these out of its count of literals still in code.

To clear one: add its source to the register through `register/patches/*.py`, move the figure into the right `tool/data/*.json` with that id, and delete its row here.

| file | line | value | what it is |
|---|---|---|---|
| tool/engine.js | 17 | 5.5, 6 | Data-hall floor-to-floor, 5.5–6.0 m (`R.ftf.up`). The 6.0 is Burlington (burlingtonPlans2026). The 5.5 is HK TPB A/KC/510B, which is not in the register. They are kept together. |
| tool/engine.js | 22 | 505, 1109 | Whole building per MW of IT, min–max of the 11 buildings in `bench/benchmarks.json` (`R.grossPerMW`). The benchmark file has no register id. |
| tool/engine.js | 23 | 1.6 | Cologix VAN5 IT load, 1.6 MW (`R.cases.van[0]`). The operator claim is not in the register (opClaims names VAN2 and VAN4, not VAN5). |
| tool/engine.js | 24 | 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40 | Size slider steps, 0.1–40 MW (`R.steps`). A tool choice with no source. |
| tool/engine.js | 410 | 1500 | Noise receivers searched within 1.5 km (`NRAD`), the extent of the loaded tiles. A tool choice. |
| tool/engine.js | 745 | 0.8 | Roof runoff coefficient. The register (rainwater) gives it as "assumed (CSA B805 not read)". |
| tool/engine.js | 746 | 1.25, 16.8 | Water behind electricity, thermal ~1.25 and hydro ~16.8 L/kWh. The register (water_behind_electricity, O-09) says their source is not indexed. |
| tool/engine.js | 749 | 4.256, 4.622 | Vancouver water and sewer rates per m³ of make-up (2026, as proposed; sewer rate marked ?). No register id found. |
| tool/data.js | 20 | 200 | HTTP status code. Not a figure. |
| tool/plant.js | 19 | 4, 6, 2, 2, 2, 2 | Side-to-side gap between tower cells, 4.0 m (small plant) and 6.0 m (large), and 2.0 m between generator sets ("assumed from the 1 m service clearance"). The 1.8 m end gap for towers sits on the same line. BAC's layout guide (bacLayout2023) gives the 1.8 m and the air-inlet distance but not the side gaps. |
| tool/plant.js | 26 | 6, 6 | Over 6 MW of heat, the "large" tower spacing is used. Chillers switch at the same point but keep the same unit. No source. |
| tool/plant.js | 60 | 2, 40 | Provisional size before one is set: 2 storeys if the model has none, capped at 40 MW (the top of the slider). Tool choices. |
| tool/site.js | 86 | 100 | Vancouver: no loading bay under 100 m² of floor. Not in the Parking By-law text the register quotes (vanParking5). |
| tool/site.js | 112 | 4, 4, 4 | An existing building with no recorded height is taken as one storey at 4 m, and storeys as 4 m each (finding I-06, labelled in the tool). An assumption. |
| tool/site.js | 162 | 12, 12 | A sized-down data hall is kept at least 12 m deep. A tool choice. |
| tool/decide.js | 60 | 70, 70 | Default coverage 70 % on the coverage slider (`A.cover||70`). A UI default. |
| tool/decide.js | 64 | 12 | Storeys input capped at 12 (input max). A UI limit. |
| tool/decide.js | 101 | 8 | A building under 8 m tall is read as "one or two storeys" (lease feasibility). An assumption, no source. |
| tool/decide.js | 104 | 8 | Same 8 m threshold: under it, no upper floor to lease. |
| tool/decide.js | 154 | 12 | Storeys typed in clamped to 1–12 (matches the input max on line 64). |
| tool/addons.js | 91 | 3500, 3500 | BC Hydro's 2025 call, about 3,500 GWh a year (power purchase add-on). The register's clean_power_price entry gives the call's prices but not 3,500 GWh. |
| tool/addons.js | 93 | 24, 49, 23.9, 47.8 | Litres per second per MW of heat at a 10–5 °C rise (P-15: sea water 4.0 kJ/kg·K × 1.025 kg/L; fresh water 4.18). Derived in code. The heat capacities have no register id. |
| tool/addons.js | 105 | 6, 2 | PV layout block, 6 × 2 m, with 1 m and 0.5–1.5 m clearances. A layout choice. register pv_roof describes the layout but gives no block size. |
| tool/addons.js | 107 | 12 | Area of one PV block, 6 × 2 = 12 m². Follows from line 105. |
| tool/addons.js | 115 | 67.9, 49.67 | Fallback electricity price, $/MWh, used when BD.ECON has not loaded. 67.9 matches BC LGS 6.79 ¢/kWh (register electricity_price). 49.67 for Edmonton has no register text. |
| tool/tiers.js | 17 | 2.5 | `TYPICAL_MW`, the residents' "typical" size. The register calls "2–4 MW typical downtown colocation" an internal note read across operator claims, with no primary source. |
| tool/arch.js | 59 | 6, 6 | Smallest side of any block except the pool, 6 × 6 m. The code comment calls it "a drawing rule, not a code rule". No source. |
| tool/arch.js | 102 | 2 | Placement grid cell, 2 m (`cs`). Blocks are sized and placed in 2 m steps. A tool choice. |
| tool/arch.js | 135 | 2 | Refuge as its own building: one 2 m cell kept clear all round ("drawn, not a rule"). A tool choice. |
| tool/arch.js | 139 | 8 | Placement tries up to 8 storeys for a block. A tool limit. |
| tool/arch.js | 411 | 6 | Storeys typed for a block clamped to 1–6. A UI limit. |
| tool/arch.js | 413 | 10, 100 | Resize step when a program has no step: 10 % of its size, at least 10 m² (100 m² taken when size is not set). A UI choice. |
| tool/arch.js | 423 | 12 | Up to 12 passes when shrinking other blocks to make room. A loop limit. |
| tool/arch.js | 325 | 4 | Ratios: up to 4 passes to settle the data centre's cap while the plant yard moves with the MW (rebuild part 1, 3 Nov 2026). A loop limit. |
| tool/site.js | 197 | 6 | Hall fix (3 Nov 2026): a hall footprint option has no side under 6 m (the same drawing rule as the program blocks). A tool choice. |
| tool/site.js | 199 | 2, 3, 4 | Hall fix: hall footprint proportions tried, 1, 1.5, 2, 3 and 4 : 1, then full width or length. A tool choice, not a rule. |
| tool/arch.js | 82 | 10000 | Hall fix: tie-break weight that ranks an option leaving a street-entrance program undrawn after every option that draws it. Arithmetic for the ranking. |
| tool/arch.js | 160 | 8 | Hall fix: the "not drawn" text gives the block's floor over 1 to 8 storeys, the placement limit above. |
