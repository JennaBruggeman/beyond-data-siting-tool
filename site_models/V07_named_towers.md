# V07: named towers and the street south of 1050 W Pender

Heights are from the data the project holds, not from published building heights. **Building names are matched by address only, from my general knowledge of the addresses; please confirm each.** Storeys are not in the City data; they are in your local BC Assessment file (V07_bca_parcels.csv, on your computer only).

| Building (address used) | Tallest part | Height, LiDAR 2022 (90th percentile) | LiDAR 2022 maximum | 2009 footprints `hgt_agl` | Year built (City tax report) | Parts in the file |
|---|---|---|---|---|---|---|
| 1050 W Pender St tower (1050 Pender St W) | V2009-159345 | 88.6 m | 90.9 m | 87.42 m | 1974 | 4 |
| Marriott Pinnacle Downtown (1128 Hastings St W) | V2009-161553 | 114.0 m | 121.5 m | 107.96 m | 1999–2000 | 4 |
| Bentall Centre Tower One (505 Burrard St) | V2009-162670 | 86.0 m | 89.6 m | 86.51 m | 1967 | 4 |
| Oceanic Plaza (1066 Hastings St W) | V2009-158858 | 101.6 m | 109.0 m | 101.67 m | 1978 | 2 |
| Marine Building (355 Burrard St) | V2009-162724 | 93.2 m | 97.2 m | 88.1 m | 1930 | 6 |
| Pinnacle Harbourfront (1133 Hastings St W) | V2009-161555 | 63.2 m | 65.6 m | 62.71 m | 1972 | 8 |

- **1050 W Pender:** the City tax report gives year built **1974**; your notes say 1973. Both kept; check the BC Assessment value in your local file.
- **Marriott Pinnacle:** its strata parcel (1128 W Hastings, built 1999 per the City) overlaps the land parcel at 1111 W Pender (2000), so the tower's rows list both addresses and parcels.
- **What the heights mean:** the LiDAR 90th percentile is the height most of the roof reaches; the maximum catches spires, masts and rooftop plant. The 2009 `hgt_agl` is the City's 2009 value for that footprint part.

## The street on the south side of 1050 W Pender's block

**Eveleigh St.** In the City of Vancouver's public streets dataset, the nearest segments to the 1050 W Pender parcel are the 1000 block of W Pender St, 28 m to the north-northeast, and the 1000 block of Eveleigh St, 32 m to the south-southwest. The parcel runs through from W Pender (north side) to Eveleigh (south side). The downtown grid is rotated, so "south" here is roughly southwest.

Sources: City of Vancouver Open Data, Building footprints 2009; City of Vancouver LiDAR 2022 (processed 14–15 Oct 2026); property parcel polygons and property tax report 2026; public streets.
