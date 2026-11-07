# Code job A1: lot types (7 Nov 2026)

Part of MASTER_PLAN_2026-11-07.md, Phase A1. Written by Cowork; J.B. approves the result.
Purpose: know which lot shapes exist, so every typology spec covers them with real test fits, and so we can say where each typology works.

If anything below is unclear or doesn't match the tool's data, **stop and write the question in `checks/to_cowork.md`**. Don't choose.

---

## 1. Which lots

Every lot in the tool's lot files (Vancouver and Edmonton) whose zone allows a data centre as **permitted, conditional or discretionary** (the same test as the 573ace3 zone rule; `tool/data/zones.json`). Include lots with existing buildings (the tool treats a new building as the case). Exclude nothing else; report how many lots were read and how many qualified.

## 2. What to measure, per lot

Use the tool's own functions so the numbers match what the tool shows (`lotside.js` edges, the lot frame and yard lines used by Arrange and `export_layout.js`). Don't write a second geometry.

| Column | Definition |
|---|---|
| `key`, `city`, `zone`, `subarea` | as in the tool |
| `address` | as in the tool (Vancouver); Edmonton: the tool's label |
| `area_m2` | lot area |
| `frontage_m` | total length of edges classed **front** by `lotside.js` |
| `n_street_edges` | number of edges abutting a street (not lanes) |
| `corner` | true if `n_street_edges` ≥ 2 |
| `lane` | true if any edge abuts a lane |
| `depth_m` | the lot frame's length perpendicular to the front (frame `L` in the export) |
| `width_m` | frame `W` |
| `aspect` | `depth_m / width_m` |
| `bbox_m2` | area of the minimum bounding rectangle in the lot frame |
| `irregularity` | `area_m2 / bbox_m2` (1 = rectangle) |
| `buildable_m2` | area inside the yard lines (the tool's buildable polygon) |
| `buildable_w_m`, `buildable_d_m` | width and depth of the largest rectangle inside the buildable polygon, in the lot frame |
| `height_m` | zone height limit used by the tool |
| `ground_storey_m`, `upper_storey_m` | storey-height rule used by the tool (or blank if none) |

## 3. How to classify (fixed order: the first rule that applies wins)

Starting cut-offs are **drawing choices** (Cowork's), to be checked against the distributions in step 4:

1. `irregular` — irregularity < 0.75
2. `corner` — corner = true
3. `small` — buildable_m2 < 853 (Emergency hub minimum ground, `tool/data/arch.json`, the smallest typology)
4. `large` — buildable_m2 ≥ 6,000
5. `narrow_deep` — aspect ≥ 2.5
6. `wide_shallow` — aspect ≤ 0.8
7. `regular` — everything else

Add a second flag column (not a type): `no_rear_access` = not lane and only one street edge (dock reached by a side drive, as on 339 1st Ave E).

## 4. Report first, then wait (gate)

Before finalizing:
- histograms (or quantile tables: 10/25/50/75/90 %) per city of aspect, irregularity, buildable_m2, frontage_m;
- the count per type per city with the starting cut-offs;
- any cut-off you would move and why (e.g. a natural break in the data), with the counts it would give.
Write this to `checks/lot_types_<date>.md` and **wait for J.B.'s OK** (through Cowork) before freezing the types.

## 5. Final output (after the OK)

- `checks/lot_types_<date>.csv`: one row per qualifying lot, the columns of §2 plus `type` and `no_rear_access`. **Ids and measures only: no coordinates, no Altalis or BC Assessment geometry** (public repo).
- `checks/lot_types_<date>.md`: per type and city: count, ranges of each measure, and **two representative real lots** (the one nearest the type's median aspect and buildable area, and a second), with key and address.

## 6. Checks before reporting

- Every qualifying lot has exactly one type.
- Print every column for these five lots so Cowork can verify by hand: 339 1st Ave E (63819485), 275 1st Ave E (63819363), 1425 Clark Dr (23060741), 74 Airport Rd NW (176767), 64 Airport Rd NW (146402).
- Golden and Architecture baselines unchanged (this job reads; it changes no result).

## 7. Rules for this job

- Don't change any size, MW or layout result.
- Commit locally; push only after J.B. says so.
- Reply to J.B. in under 200 words: counts, the five lots' measures, the cut-off questions.

## 8. Allowed while waiting (doesn't depend on any typology spec)

- **Exit-distance module** as a pure function over a layout JSON (format of `checks/layouts/V339.json`): travel on a 0.25 m grid through doors only, from every point of every room to the nearest exit; the same with every door moved to its worst position along its wall (0.5 m steps); exits apart measured **door to door** (doors into exit stairs, exterior exit doors), against max(9 m, ½ the floor area's largest diagonal) (NBC 3.4.2.3, 3.4.2.5). Test it on V339.json: Cowork measured data centre 26.9 m longest walk, stair doors 7.2 m apart against 13.6 m; refuge 15.6 m; warming shelter 6.6 m; clinic 10.2 m. Report any difference.
- **I-2 storey heights:** apply 6.1 m ground / 4.0 m upper to every I-2 lot (register van_zdb_i2, 3.1.2.4 and 3.2.2.9), re-run golden, report what moved.

**Not allowed:** any layout rule (bands, lobby, stairs, stacking). Those come from the typology specs.
