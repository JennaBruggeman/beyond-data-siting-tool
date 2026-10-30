# Input stage ("What we start with") findings, 30 Oct 2026

Two independent routes, as for Size:

- **Data check:** `checks/input_check/`, a script that rederives each input from the raw data without reading the tool's code or results. Claude compared it with the eight golden lots.
- **Math and data-handling agent:** `checks/agents/2026-10-30_input_math.md`, with 26 rows: 2 high, 7 medium, 15 low and 2 with no defect.

## Data check against the tool (8 golden lots)

| Item | Result |
|---|---|
| Zone | All 8 match. Edmonton was confirmed against both the record and the zoning map; Vancouver only from the tax record, since no zoning map is saved. |
| Lot area | Edmonton matches within 0.1%. Vancouver is 0.4–0.9% low on all four lots, the projection constant (I-10). |
| Buildings on the lot | Counts and heights agree. The tool uses LiDAR 2022 where a building is newer than the 2009 footprints (275 1st Ave E: 17.6 m). 1425 Clark Dr: the tool says 6.2 m, against the 2009 maximum of 10.3 m (which measure is used ?). |
| Floodplain (Vancouver) | Independent: 275 1st Ave E 48%, 1425 Clark Dr 36% and **339 1st Ave E 29%** inside the designated floodplain (FCL 4.6 m); 555 W Hastings outside. The tool tests only lot corners and the vertex mean (I-09), so a partly flooded lot can read "outside". Not yet verified on screen. |
| Weather | 3,284 / 5,522 h a year at or below 8 °C, against the tool's "about 3,300 / 5,500". Matches. |
| Receivers | Within 3 km: 1,067 at 339 1st Ave E and 175 at 74 Airport Rd. The tool still cuts at 1.0–1.5 km for some counts (I-03). |
| Sewer flow; Edmonton floodplain | No data saved, so not derivable. The tool shows these as gaps, which is correct. |

## Screen fixes (wrong or unlabelled on screen)

| id | Fix |
|---|---|
| I-01 | Edmonton lots whose record area is 1.2–3× the drawn outline: show both areas, and size on the outline unless J.B. decides otherwise (decision D-1) |
| I-02 | Lot parts, buildings and noise neighbours are searched only in loaded map tiles: load the needed tiles, or warn |
| I-03 | Receiver reach: use the register's 3 km everywhere, or label the 1.0–1.5 km cut |
| I-04, I-15 | Edmonton source lines name the wrong source (record vs outline; record vs map zone) |
| I-06 | Missing heights stored as −1, and estimates over 40 m forced to 4 m, appear as real heights: label them "no height" |
| I-07 | Lots with no outline get a made-up square (900 m² when there's no area): label it as made up |
| I-08 | The set-up summary says "dry coolers" while the plant uses chillers: use the right name |
| I-09 | Floodplain test: test the whole outline, not just its corners |

## Code fixes (results move slightly; golden runs to be re-baselined with J.B.'s OK)

| id | Fix |
|---|---|
| I-05 | Keep holes in footprints and zoning polygons |
| I-10 | Projection: use the meridian degree at the site's latitude (Vancouver areas +0.8%) |
| I-11 | Use the area centroid, which can't fall outside the lot |
| I-13, I-17, I-19 | Tile edges, first-account area, distance from the lot rather than from the plant |

## Register fixes

| id | Fix |
|---|---|
| I-14 | Storeys: floor vs round, with one rule |
| I-16 | I-2 and I-3 conditional heights: make one table agree |
| I-18 | CAL 1.6 vs 1.7 |
| I-20 | Non-market homes: say proposed and under-construction projects are included |
| I-21 | receiver_temp: 70/50 and 60/45 sinks; NEU 65 vs 67 °C |
| I-22 | host_building: questions not asked, so mark them "not asked" |
| I-23 | Unregistered radii: 600 m, 1,200 m, 200/500 m |
| I-24 | Click-to-record limits: 150 m, 60 m, 400 m, 25 m |

## Decisions for J.B.

- **D-1.** For an Edmonton lot whose assessment area is larger than its drawn outline, size on the outline (what can be built) and show the record as a note?
- **D-2.** Fix the projection constant (I-10)? It moves every Vancouver area and distance up by about 0.6–0.9%, so all golden results shift a little and are re-baselined.
