The site-map method has changed. Please update the maps from the new files before my progress review on Wednesday (28 Oct). This replaces the earlier versions wherever they differ.

Read first, in the Claude Link folder:
- `site_maps/METHODS.md` (new section "Method v2");
- `site_maps/factors.csv`;
- `site_maps/networks_v2.json`;
- `chosen_sites/SITE_LEDGER_2026-10-25.md`.

## What changed and why

- **Heat is now scored by whether it pays, not by demand alone.**
  - The old maps gave every cell inside any district network a heat score of 1.
  - A hand check found that heat sold through a heat pump doesn't pay anywhere in Edmonton at today's gas price. Edmonton's old #1 site (8803 Stadium Rd) relied on exactly that.
- **Each route now carries a "pays" factor** (value ÷ cost, capped at 1):
  - Direct to buildings: Edmonton 0.34, Vancouver 0.94.
  - Networks: the factor falls with the pipe cost to reach them. Steam (Creative Energy downtown) = 0. Planned networks (Edmonton downtown Phases 2–4) × 0.5.
  - Blatchford's ambient loop needs no heat pump, so it scores 1 near its edge, falling quickly with distance.
- **Blatchford's outline is corrected** to the bylaw map. The strip between Kingsway and Airport Rd is outside the service area.
- **Edmonton people** now include about 44,000 homes built since the 2021 census (from the 2026 assessment roll).
- Everything else is unchanged.

## Results (equal weights, zoning counted)

| | Before (21 Oct) | After (25 Oct) |
|---|---|---|
| Vancouver #1 area | 225–245 E 2nd Ave / 275 1st Ave E (stability 100 %) | Same (stability 100 %) |
| 275 1st Ave E (V09) | cell #2 of 9,856 | cell #3 of 9,856; stability 99 %; inside the #1 area |
| Edmonton #1 area | 8803 Stadium Rd NW (E05) | **Blatchford's southwest edge** (best cell 12003–12025 Kingsway NW, 76 m from the loop); stability 64 % |
| 74/64 Airport Rd NW (E06) | cell #119–122 of 34,428 | **cell #25–30** (equal weights), **#12–13** (heat-priority weights); about 470 m from the area's best cell, in the #1 area |
| 8803 Stadium Rd NW (E05) | #1 | cell #6; heat falls from 1.0 to 0.34 |

Edmonton's top five areas (equal weights, zoning counted): 1 Blatchford southwest edge; 2 12503 66 St NW; 3 8803 Stadium Rd NW; 4 5630 103A St NW; 5 east industrial (about 53.537, −113.395).

**How to label E06 honestly:** "In Edmonton's #1 area (Blatchford's southwest edge), 50 m from the loop." Don't call it the single best cell.
- The best cell (12003–12025 Kingsway) scores higher on people and truck access.
- E06 differs in being vacant land (no existing building), which the screen doesn't score.

## Please update

1. **Heat maps, both cities:** recolour from the new `heat` field. Peaks are in `<city>_peaks.geojson`. Add network type to the legend: ambient, hot water, steam, planned.
2. **Overlap and overlap-zoned maps, both cities:** new peaks and new numbers.
3. **Edmonton people and energy maps:** small changes from the added homes.
4. **Weighting charts:** re-run from `weighting_summary.json`, `weighting_top5.csv`, `factor_study.csv`.
5. **A before-and-after sheet per city:** the old #1 vs the new #1, and where V09 and E06 sit. Use the table above; the old files are in `site_maps/v1_2026-10-21/`.
6. **Site sheets for E06 and V09:** use the new `*_pack.json` in each `chosen_sites` folder, and the corrections in the ledger:
   - E06 is outside the Blatchford service area (about 50 m across Airport Rd);
   - BE zoning: 16 m height, floor area ratio 1.6;
   - Vancouver heat doesn't pay under today's tariff.

## Label on every map
"Screen, method v2 (25 Oct 2026): heat scored by whether it pays. The tool itself has not yet been re-run with these fixes; results may shift slightly." Sources and dates as before.

## Rules as before
Don't make anything up. Every number from the files. Mark assumptions (the pays factors are trust 60: derived with stated assumptions). Booklet style. Canadian spelling. Short labels.
