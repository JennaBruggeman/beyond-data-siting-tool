I need a set of maps for my M.Arch GP1 thesis (data centres that exchange heat, energy, water, materials and people-benefits with their city). Another chat built the data from my Beyond Data tool. Please make the maps from the files I'm attaching, without changing the data or the scoring.

FILES (folder site_maps)
- van_grid.geojson, edm_grid.geojson: 100 m cells, WGS84 (Vancouver 9,856, Edmonton 34,428). Each cell has 0–1 scores: site, heat, energy, water, materials, people, overlap, overlap_zoned, plus n_strong (0–5) and the raw values behind them.
- van_peaks.geojson, edm_peaks.geojson: for each aspect, the top 5 cells at least 2 km apart (Point features, with rank and score), each with a circle at that aspect's radius (Polygon features, property kind = "radius"). Edmonton water has one peak only (one source).
- top_sites.csv: the same peaks as a table, with the parcels in each cell (address, zone, zoning status).
- factors.csv: every factor, formula, radius, weight and source, and whether it is sourced or an assumption.
- METHODS.md: method, gaps, and notes for the map maker.
- check_van.png, check_edm.png: rough check plots. I like this style; match it.

WHAT THE SCORES MEAN (short)
- site: what zoning allows a data centre (allowed 1.0, case by case 0.7, site-specific 0.35, rezoning 0.1; Vancouver floodplain x 0.6).
- heat: heat demand of nearby buildings within reach (pool 1,000 m, housing 1,200 m, greenhouse 1,500 m, others 1,200 m), or a district energy network nearby.
- energy: a substation within 2 km, plus households with few public EV chargers nearby; Vancouver downtown feeder-constrained area x 0.5.
- water: Vancouver: cooling towers and water-treatment systems within 500 m. Edmonton: distance to the Gold Bar wastewater plant (reclaimed water), within 5 km.
- materials: truck access, an industrial neighbourhood (stand-in for recyclers), schools within 2 km.
- people: population within 800 m, reduced where many people live within 150 m (night noise).
- overlap = mean of the five exchanges; overlap_zoned = overlap x site; n_strong = how many of the five score 0.5 or more.
Scores compare places within one city, not between cities.

MAPS I NEED, for each city (Vancouver, Edmonton)
1. Six single-aspect maps: site, heat, energy, water, materials, people. Colour cells by the score; draw that aspect's top 5 peaks (numbered) and radius circles.
2. One overlap map: colour by overlap_zoned. Draw all five exchanges' radius circles together, each exchange in its own colour, so you can see where they overlap. Number the top 5 overlap_zoned sites.
3. A "top 5 if zoning didn't matter" map: the five "overlap" peaks (aspect = "overlap"), where a rezoning could be tried. Same layout as map 4.
4. A "top 5 locations" map: just the five overlap_zoned peaks (aspect = "overlap_zoned" in the peaks file), numbered, on a quiet base, with a small table beside it. Use the address, zone, scores and n_strong from top_sites.csv.

TOP 5 SITES (overlap_zoned, from top_sites.csv)
Vancouver
1. 225–245 E 2nd Ave (FC-2, case by case), score 0.48
2. 1389–1485 Venables St (I-2, case by case), 0.32
3. 700 W Pender / 535 Granville (CD-1 and DD, site-specific), 0.25
4. 8610–8690 Ash St / 8655 Cambie St (I-2, case by case), 0.24
5. 3432 Lougheed Hwy (I-2, case by case), 0.20
Edmonton
1. 8803 Stadium Rd NW (IM, smaller data centres only), 0.41
2. 12503 66 St NW (IH, allowed), 0.39
3. 12521 123 St NW (IH, allowed), 0.36
4. 119 St NW (BE, smaller data centres only), 0.35
5. 5630 103A St NW (IH, allowed), 0.35

TOP 5 IF ZONING DIDN'T MATTER (overlap, from top_sites.csv; rezoning candidates)
Vancouver
1. 45 E 4th Ave / 6 E 3rd Ave (I-1, rezoning needed), 0.73
2. 700 W Pender / 535 Granville (CD-1 and DD, site-specific), 0.70
3. 1295–1301 Johnston St, Granville Island (FCCDD, not yet reviewed), 0.58
4. 1395 Grandview Hwy N (I-2, case by case), 0.49
5. 5319–5357 Joyce St (R1-1 and RM-10, rezoning needed), 0.45
Edmonton
1. 8803 Stadium Rd NW (IM), 0.585
2. 9804 107 St NW (AJ, special area), 0.584
3. 11410 Groat Rd NW (CG, rezoning needed), 0.575
4. 11305 83 Ave NW (AJ, special area), 0.573
5. 8132–8204 169B St NW (RS, rezoning needed), 0.557
Note: Edmonton's five are within 0.03 of each other, so treat them as a group, not a ranking.

STYLE
- Like the check plots: dark background (#202124), square cells, a dark-purple-to-orange-to-pale-yellow heat ramp (matplotlib "magma"), no basemap clutter, thin light circles for radii.
- Typeface: IBM Plex Sans. Text white, greys for secondary text. Accent soft red #CC746C only for key words.
- Exchange colours where an exchange needs its own colour: heat #d99a4e, energy #6fa3d8, water #6fc3c3, materials #a9c49a, people #b79fd6.
- Plain and professional, nothing that looks AI-generated. Canadian spelling.
- Each map gets a title, a legend for the 0–1 scale, a north arrow, a scale bar, and a source line ("Beyond Data, built from City of Vancouver / City of Edmonton open data, Census 2021, NRCan; see factors.csv").

RULES
- Don't change scores, weights or locations. If something looks wrong, tell me instead of fixing it.
- Label these as screens built on stated assumptions, not findings. A short note on each map: "Weights and distances: see factors.csv (several are assumptions)."
- Known gaps to mention where relevant (from METHODS.md):
  - Iona Island plant not placed (Vancouver water).
  - No recycler, refurbisher or greenhouse locations.
  - Substation map layer is old; no grid capacity data.
  - Gold Bar location inferred from an assessment parcel (to check).
- Output: one PNG (300 dpi) and one PDF per map, named <city>_<aspect>.png/.pdf.
