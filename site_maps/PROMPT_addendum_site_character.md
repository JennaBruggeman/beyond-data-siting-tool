Second add-on to the site maps (same folder, style and rules). We checked what stands on the top sites now and whether each can actually hold a data centre. Please use this in the maps and the thesis section.

READ FIRST
- SITE_CHARACTER.md: what stands on each top site, its type, and what changes.

NEW FILES
- site_character.csv: every parcel in each top cell, with:
  - zoning and zoning status, lot size, year built;
  - Vancouver: land and building value, and 2009 footprint cover and height;
  - Edmonton: gross floor area, and 2019 roofline counts;
  - a "kind" column: building / open yard / building valued as land.
- realistic_top5.csv: the top 5 again, keeping only cells with at least 2,000 m² of usable land. Layers: ov_equal (zoning ignored), ov_equal_zoned, stability, stability_zoned. For the zoning-counted layers, the 2,000 m² must itself be zoned allowed or case by case.
- cell_land.csv: usable_land_m2 and allowed_land_m2 for every cell (join to the grids on cell = id).

SITE TYPES (the tool's four starting points)
- **new:** blank or yard site, or replace a small building.
- **shared:** a new building with other uses.
- **retrofit:** fit out an existing building.
- **lease:** a floor in an existing building.

Mark each site on the top-5 maps with its type: a small text tag next to the number. A legend line reads "type from City tax/assessment records and footprints (2009 Vancouver, 2019 Edmonton); to be checked on site".

WHAT CHANGES (use these lists for the final "top 5" maps; keep the earlier lists only in an appendix)

Vancouver, zoning counted (realistic)
1. 302 Industrial Ave / 235 1st Ave E / 320 Industrial Ave, I-3, 10,650 m²: older industrial, about 30 % covered. Type: new (redevelopment).
2. 1510–1568 Venables St, I-2: older industrial. Type: new or shared (redevelopment).
3. 8610–8690 Ash St / 8655 Cambie St, I-2: mostly yards. Type: new.
4. 3432 Lougheed Hwy, I-2: mostly open. Type: new.
5. 710 Marine Dr SE, I-2: partly open. Type: new.
Most robust: 275 1st Ave E (I-3), next to #1.
Note on the map: "I-3 allows data storage in sub-area A only: to confirm."
The former #1, 225–245 E 2nd Ave, has only about 900 m² of FC-2 land; mention it as the reason the site moved one block.

Edmonton, zoning counted (realistic): unchanged
1. 8803 Stadium Rd NW (IM): mostly open. Type: new.
2. 12503 66 St NW (IH): blank. Type: new.
3. 12521 123 St NW (IH): blank. Type: new.
4. 11204–11311 119/120 St NW (IM, BE): yards. Type: new.
5. 5630 103A St NW (IH): yard. Type: new.

Rezoning candidates (zoning ignored, realistic)
- Vancouver: 45 E 4th Ave (I-1), retrofit or new; 700 W Pender (downtown towers), retrofit or lease; Granville Island buildings (FCCDD), retrofit; 1395 Grandview Hwy N (I-2); 795 Powell St (M-2).
- Edmonton: 8803 Stadium Rd; 11410 Groat Rd (mostly open); 11145 87 Ave, Meadowlark Rd and 109A Ave, which are recent mixed-use towers (mark them "unlikely soon").
- Dropped: house lots (Joyce St, 169B St, 171 St) and Alternative Jurisdiction land (9804 107 St NW, 11305 83 Ave NW).

A THESIS POINT (one sentence on the summary map)
"In Edmonton the best sites are open industrial land, so new buildings. In Vancouver they are older industrial blocks next to heat demand, so redevelopment, shared buildings or retrofits."

ALSO
Add "usable land" as an optional layer: cells shaded by allowed_land_m2 (zoning counted) or usable_land_m2 (zoning ignored), with 2,000 m² as the cut-off.
