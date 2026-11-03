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
