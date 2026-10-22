# Site maps: where each exchange does best (Vancouver, Edmonton)

Built 21 Oct 2026 by `build_site_maps.py` from the Beyond Data tool's own data. A suitability screen, not a verdict. Every factor, radius, weight and source is in `factors.csv`.

## Files

| File | What it is |
|---|---|
| `van_grid.geojson`, `edm_grid.geojson` | 100 m cells (Vancouver 9,856; Edmonton 34,428), WGS84. One score per aspect (0–1), the overlap scores, and the raw values behind them. |
| `van_peaks.geojson`, `edm_peaks.geojson` | For each aspect: the top 5 cells, at least 2 km apart (points), each with a circle at that aspect's radius (`kind: radius`). Edmonton water has one peak: Gold Bar is its only source. |
| `top_sites.csv` | The same peaks in a table, with the parcels in each cell (address, zone, zoning status). |
| `factors.csv` | Every factor: formula, radius, weight, data, source and date, and what is sourced or assumed. |
| `summary.json` | Cell counts and mean scores. |
| `check_van.png`, `check_edm.png` | Quick check plots only, not the finished maps. |

## Scores (per cell)

- **site**: what zoning allows a data centre. Allowed 1.0, case by case 0.7, site-specific 0.35, rezoning 0.1. Vancouver floodplain × 0.6.
- **heat**: heat demand of the tool's receivers within their reach (pool 1,000 m, housing 1,200 m, greenhouse 1,500 m, others 1,200 m), fading with distance. A district energy network nearby scores high too.
- **energy**: a substation within 2 km (0.6), plus households with few public chargers nearby (0.4). Vancouver's downtown CPCN area × 0.5.
- **water**: in Vancouver, cooling towers and water-treatment systems within 500 m. In Edmonton, distance to Gold Bar (reclaimed water), within 5 km.
- **materials**: truck access (0.4), an industrial neighbourhood (0.4) and schools within 2 km (0.2).
- **people**: population within 800 m, reduced where many people live within 150 m (night noise).
- **overlap**: mean of the five exchanges. **overlap_zoned** = overlap × site. **n_strong**: how many of the five score 0.5 or more.

Counts are scaled so the city's 95th percentile = 1. Scores compare places within a city, not between cities.

## Grid and coordinates

Cells use the tool's local metre frame: x = (lon − lon0) × cos(lat0) × 111,320, y = (lat − lat0) × 110,540. Origins: Vancouver 49.25, −123.12; Edmonton 53.54, −113.50. Cell corners are converted back to WGS84 in the files. A city's grid is every cell that holds at least one parcel, so parks and water are mostly empty.

## For the map maker

- **One map per aspect:** colour cells by that score, then draw that aspect's peaks and radius circles on top.
- **Overlap map:** colour by `overlap_zoned` or `n_strong`, with all aspects' circles together.
- **Labels:** say these are screens built on stated assumptions (see `factors.csv`), not findings.

## Gaps (marked in factors.csv)

- **Iona Island WWTP** (1000 Ferguson Rd, Richmond) is not placed: it is outside the Vancouver data and needs coordinates.
- **Recyclers and refurbishers:** their locations are not in the project, so materials uses an industrial-zoning proxy.
- **Greenhouses:** no locations in either city.
- **Substations:** the CanVec map dates are old (1986, 1977), and there is no capacity map for either city.
- **Gold Bar's location** is inferred from an assessment parcel zoned PU (19.7 ha) in River Valley Gold Bar. Check it.
- **Weights and decay distances** marked "assumption" are choices for J.B. to confirm or change.

## Weighting study (added 21 Oct)
`weighting_study.py` tests equal, priority and spread weightings and 500 random ones (stability). `weighting_charts.py` draws charts/01–05. Findings and what throws the results off: `WHAT_AFFECTS_THE_RESULTS.md`. Hand-off: `PROMPT_addendum_weighting.md`.
