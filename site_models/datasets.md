# Site models: footprints and heights, 12 sites (21 Oct 2026)

Files per site: `<site>_footprints.geojson` (WGS84 lon/lat) and `<site>_heights.csv` (one row per footprint part; `building_id` matches the GeoJSON).
A blank cell means the data does not give that value. Nothing is estimated.

## Datasets used

| Dataset | Publisher | Date | Used for |
|---|---|---|---|
| Building footprints 2009 | City of Vancouver Open Data | 2009 | Vancouver footprints, one polygon per building part; `hgt_agl`, `max_ht`, `base_elev` (ground elevation), roof type |
| LiDAR 2022 (classified points, 148 1-km tiles) | City of Vancouver Open Data | 2022; processed 14–15 Oct 2026 (`tool/lidar_hybrid.py`) | Vancouver heights: 90th percentile and maximum of building points above ground per footprint; outlines of buildings found in 2022 but not in 2009 (traced from points, not surveyed) |
| Property parcel polygons | City of Vancouver Open Data | 2026 | Vancouver parcels, linking footprints to addresses |
| Property tax report | City of Vancouver Open Data | 2026 | Vancouver civic address, year built, folio |
| Public streets | City of Vancouver Open Data | 2026 | V07 street question |
| 3D Buildings (78sz-qcfr), layer Building_MP_Merge | City of Edmonton Open Data | downloaded 15 Oct 2026 | Edmonton footprints (each object split into its roof parts), heights, roof and ground elevations |
| Property assessment and information | City of Edmonton Open Data | 2026 | Edmonton address, year built, tax class (in `use`) |
| Inventory Extracts, Non-Residential (2026-04-01) and Residential (2026-04) | BC Assessment, via UBC Abacus | 2026 | Vancouver year built, storeys, manual class: joined **on your computer only** (`bca_sites.py`); never sent to Claude |

## How to read the columns

- **Vancouver `height_m`:** LiDAR 2022, 90th percentile, where 2022 building points cover at least 60 % of the 2009 footprint; otherwise the 2009 `hgt_agl`, with a note that the building may have been demolished or rebuilt. `notes` keeps both values and the LiDAR maximum.
- **Vancouver `roof_elevation_m`:** blank; the data gives heights above ground and a ground elevation, not a roof elevation.
- **Edmonton:** the 3D file stores some downtown blocks as one object. Each object is split into roof parts: flat roof faces grouped by elevation, and sloped faces. Each part's outline is that roof seen from above, not a surveyed footprint.
  - `height_m` = the part's roof elevation − the object's lowest point.
  - `roof_elevation_m` and `ground_elevation_m` are elevations as stored in the file.
- **`storeys` and `use`:** not in the City data for Vancouver. Storeys come from BC Assessment in your local `<site>_heights_bca.csv`. BCA's actual-use code and civic address are not in the extracts you hold (they are in its Data Advice tables). Edmonton `use` is the assessment tax class, not a building use.
- **`parcel_id`:** Vancouver LAND_COORDINATE (several where parcels overlap, e.g. strata over land); Edmonton assessment account numbers.

## Site notes

- **V04, V05, V07, V08:** boxes recentred on the parcel at the street address (V05 on 555 W Hastings).
- **515 W Hastings and 720 Beatty** are not in the City's property tax report. The V06 box stays on your point; 515 W Hastings falls inside the V05 box.
- **E03 (Acheson, Parkland County):** no footprints. The box is outside the City of Edmonton datasets, and the project holds no Parkland County data.
- **V07:** see `V07_named_towers.md`.
