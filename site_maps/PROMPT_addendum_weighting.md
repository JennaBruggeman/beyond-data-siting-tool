This is an add-on to the site maps you're already making for my GP1 thesis (same folder, same style, same rules: don't change scores, weights or locations; tell me if something looks wrong).

WHAT'S NEW
We tested how much the best sites depend on how the five exchanges (heat, energy, water, materials, people) are weighed against each other, and what in the data affects or throws off the results. I want this to be a section of the thesis with its own maps and charts.

READ FIRST
- WHAT_AFFECTS_THE_RESULTS.md: the findings in plain words. Use its wording for captions; keep it short.

NEW FILES (folder site_maps)
- van_weighting.geojson, edm_weighting.geojson: the same 100 m cells. Each cell has:
  - the five exchange scores and site;
  - ov_equal, ov_priority, ov_spread (overlap under three weighting schemes, zoning ignored);
  - ov_equal_zoned, ov_priority_zoned, ov_spread_zoned (the same × site, zoning counted);
  - stability and stability_zoned: share of 500 random weightings in which the cell is among the city's best 30 cells.
- weighting_top5.csv: the top 5 sites (at least 2 km apart) for each scheme and for stability, per city, with scores, stability and the parcels in each cell.
- weighting_summary.json: the weights used, top-5 scores, margins.
- factor_study.csv: per exchange, how much it varies and how much of the city it covers.
- factor_correlation.csv: how the exchanges go together.
- charts/01–05 PNGs: draft charts. Restyle them if you like, but keep what each one shows and its numbers.
- check_weighting_van.png, check_weighting_edm.png: rough check maps of the new layers.

THE THREE SCHEMES
- equal: 20 % each.
- priority: heat 35, energy 20, water 15, materials 15, people 15. An example of thesis priorities; label it as such.
- spread: weight = how much a score varies across the city × the share of the city where it is above 0.
  - Vancouver: heat 35, materials 19, energy 17, people 15, water 14.
  - Edmonton: heat 33, materials 22, energy 22, people 21, water 2.

MAPS TO ADD, per city
1. Robustness map (the key one): colour by stability_zoned; number the stability_zoned top 5. A second version with stability (zoning ignored) for rezoning candidates.
2. Small multiples: ov_equal_zoned, ov_priority_zoned and ov_spread_zoned side by side, same colour scale, top 5 numbered on each. Do the same for the three zoning-ignored versions.

CHARTS TO INCLUDE (from charts/)
- 01: how each scheme weighs the exchanges.
- 02: what each exchange can tell apart (coverage and variation). Edmonton water covers only 12 % of the city.
- 03: which exchanges rise and fall together. In Vancouver, heat, water and materials reward the same blocks.
- 04: how much the top sites win by. Vancouver has a clear #1; Edmonton's top five are near-equals.
- 05: which sites hold up whatever the priorities, with each site's rank in each scheme.

HEADLINE FINDINGS (for captions)
- Robust with zoning: Vancouver 225–245 E 2nd Ave (#1 in every scheme, 100 % stability); Edmonton 8803 Stadium Rd NW (#1 in every scheme, 77 %).
- Robust rezoning candidates: Vancouver 45 E 4th Ave (59 %) and 700 W Pender (42 %); Edmonton 8803 Stadium Rd, 9804 107 St, 11305 83 Ave, 11410 Groat Rd (39–46 %).
- What throws it off (one line each on a "limits" panel):
  - Edmonton water is a single source.
  - Vancouver double-counts dense mixed-use blocks.
  - Zoning outweighs every exchange.
  - Capped scores tie at the top.
  - Downtown Vancouver energy is halved for the feeder limit.
  - Old substation data; missing recycler, greenhouse and Iona plant locations.

STYLE AND RULES
Same as before:
- Dark background #202124, IBM Plex Sans (TTFs in site_maps/fonts), magma ramp for cell maps.
- Exchange colours: heat #d99a4e, energy #6fa3d8, water #6fc3c3, materials #a9c49a, people #b79fd6.
- Accent #CC746C only for key words. Canadian spelling.
- Water and materials are close in colour: always label bars and series directly, never rely on colour alone.
- Label everything as a screen built on stated assumptions, not a finding.
- Output: PNG at 300 dpi and PDF, named <city>_<layer>.png / chart_<nn>_<name>.png.
