I've chosen one site in each city for my GP1 thesis (Beyond Data: data centres as neighbours). I need a full site analysis of each neighbourhood for my booklet:

- a 3D model of the neighbourhood;
- the data centre's program, site layout and technical specifications;
- an axonometric drawing;
- site maps;
- every exchange between the data centre and its neighbours, documented.

Everything you need is in the connected folder `chosen_sites/`. Read this whole prompt and look through the folder before you start. Then tell me your plan and which drawings you'll make, before making them.

## The two sites

| | Vancouver | Edmonton |
|---|---|---|
| Address | 275 1st Ave E | 8803 Stadium Road NW |
| Folder | `V09_275_1st_Ave_E/` | `E05_8803_Stadium_Rd_NW/` |
| Location | 49.268811, −123.096970 (City parcel centroid) | 53.555110, −113.477327 (City assessment point) |
| Neighbourhood | E 1st Ave, about 250 m east of Main St | McCauley (City assessment data) |
| Zoning | I-3, data centre case by case | IM, case by case |
| Lot | 7,791 m² | 8,812 m² |
| On it now | A 1956 industrial building covering about 36 % of the lot, worth little next to the land: a redevelopment | One small 1980 building (877 m²) on mostly open land: a new building |
| Why chosen | #1 in Vancouver on equal weighting; in the city's top 30 cells in 99.8 % of 500 random weightings | #1 in Edmonton on equal weighting; in the top 30 cells in 77 % of weightings (Edmonton's top five are near-equals) |

## What's in each site folder

- **`*_footprints.geojson` and `*_heights.csv`:** every building in a 1,000 m square around the site, from City data. One polygon per building part, with height, ground elevation, address and year built. Build the 3D model from these.
  - **Vancouver:** 2009 City footprints. Heights are from 2022 LiDAR where it still finds the building, otherwise the 2009 value. Outlines found only in 2022 are traced from the LiDAR points.
  - **Edmonton:** the City's 3D Buildings model, split into roof parts. Each outline is the roof seen from above, not a surveyed footprint.
  - A blank means the data doesn't give that value. Don't fill it in.
  - `datasets.md` (in `site_models/` in the repo, copied here) explains every column.
- **`*_parcels_500m.csv`:** every parcel within 500 m, with address, zoning and area.
  - **Vancouver:** City parcels.
  - **Edmonton:** assessment points (point locations, not lot outlines).
  - Use these for the zoning and land-use maps.
- **`*_heat_receivers.csv`:** every building the tool counts as a possible heat user within 1,500 m: type, name, distance, whether it's within reach, and its heat demand.
  - Heat demand is in MWh a year, as the tool's site maps count it: fuel bought for heating × 0.85.
  - `counted_at_this_distance` is what that demand is worth here, after fading with distance to zero at the reach (1,000 m for pools, 1,200 m for most buildings, 1,500 m for greenhouses).
  - The `measured` column says whether the demand is the building's reported energy use (yes) or estimated from its floor area (no).
- **`*_substations.csv`:** substations within 3 km (NRCan CanVec). Named substations are in the pack file.
- **`*_ev_chargers.csv`:** public chargers within 1.5 km (NRCan, 16 Oct 2026).
- **`V09_water_permits.csv`** (Vancouver only): cooling towers and water-treatment systems on the City's permit list within 1 km.
- **`*_pack.json`:** the site's 100 m cell from the site maps:
  - all six scores (0–1, compared within its city only);
  - the raw factors behind them: distance to the district energy network, substation distance, households and population nearby, people within 150 m, truck access, industrial share, schools;
  - the weighting and robustness results;
  - the named substations.
- **`tool_data_full.json`:** the tool's complete working for this lot at the Technical level: zoning envelope, fit, plant, heat economics for every receiver, best set-up, and opportunities with their rules and precedents.
- **`report_*.pdf` and `report_*_notes.json`:** the Beyond Data tool run on this exact lot, at its three levels: Everyday (`resident`), Civic (`community`) and Technical (`full`). This is the tool's own verdict for the site: what fits, the heat economics, energy, water, materials, people, every opportunity that's possible or ruled out, the options, and Vancouver against Edmonton. Treat it as the main source for the exchanges.
  - The tool's run toggled two speculative opportunities on for the "Speculative" step: backup power for neighbours in a blackout, and snowmelt on sidewalks and streets. They're speculative; label them so.

Also useful, in the same Claude Link folder:

- `site_maps/`, especially `METHODS.md`, `factors.csv`, `SITE_CHARACTER.md` and `WHAT_AFFECTS_THE_RESULTS.md`;
- the booklet PDF (for its style, and its matrix of exchanges, rows 1–49).

## What I'd like

**1. A 3D model of each neighbourhood**

- Extrude every footprint by its height, in the 1,000 m square.
- Highlight the site lot. Show the existing building on it as existing, to be replaced or kept. Leave room for the new data centre as a simple massing.
  - Vancouver: the tool says 2.7–10 MW fits on about 5,260 m² of usable floor.
  - Edmonton: take the figure from its report.
- Keep it light: plain grey massing, site in accent, ground plane, streets if you can add them from open data.
- Export something I can open in Rhino: OBJ or 3DM, plus GeoJSON. Keep the model in metres, in a local frame centred on the site, and say what the origin is.

**2. An axonometric of each site**

- The neighbourhood massing with the exchanges drawn on it: lines from the data centre to the actual receivers in the CSVs.
  - **Heat:** to the nearest and largest users in reach, and the district energy network.
  - **Energy:** to the substation, and to EV chargers.
  - **Water:** to the permitted cooling towers in Vancouver.
  - **People:** homes and population close by, and night-noise neighbours within 150 m.
  - **Materials:** truck access.
- Label the receivers by name and distance.
- One full axo per site. Then zoom-in versions for the strongest two exchanges at each site.

**3. Site maps** (8.5 × 11 and 17 × 11, the booklet's sheet style)

- Figure-ground.
- Zoning within 500 m.
- Heat receivers by type and demand, with reach rings.
- Energy: substations and chargers.
- Water (Vancouver).
- People: population, and the 150 m night-noise ring.
- Materials: truck access, industrial land.
- Each map with a scale bar, north arrow, source line and date.

**4. The exchanges, documented**, one sheet or spread per exchange per site.

For each exchange (heat, energy, water, materials, people and place):

- What this site could give and take.
- Who receives it: named buildings, with distances.
- How much, with the range and its units.
- What would have to be true.
- What the tool rules out here, and why.
- How sure: the tool's trust ratings.

Cover all 21 opportunities in the tool and say which apply at each site:

- **Heat:** district heat to a network; hospital or campus anchor; new district with the data centre as heat plant; seasonal storage in the ground; aquaculture, insects or algae; distributed servers as heaters; greenhouse; sewage heat as comparator; cooling for neighbours; snowmelt.
- **Electricity:** reserved capacity and batteries to the grid; EV charging hub; backup power for neighbours; grid upgrades shared with neighbours; solar on neighbours' roofs.
- **Water:** rainwater, condensate and water reuse; stormwater held for the neighbourhood; emergency water for neighbours.
- **Land and time:** meanwhile uses on land held for growth.
- **People:** warming centre, refuge, clean-air room.
- **Materials:** material bank (copper).

Then a comparison spread: the two sites side by side, same logic, different answer.

**5. The data centre itself: program, site layout and technical specifications**

Read `DESIGN_BRIEF.md` first. It sets out:

- the design that makes each exchange possible (liquid cooling, heat exchanger, heat pump, buffer tank, twin pipe; grid-ready batteries; dry coolers; dock; active ground floor and refuge);
- the plant space per MW;
- each site's zoning envelope, size, power, heat and grid figures from the tool;
- what the design still has to decide.

For each site, please make:

- **A program:** every space with its area, sized from the tool's figures:
  - data halls;
  - electrical (UPS, batteries, switchgear);
  - cooling plant (coolant units, dry coolers);
  - heat pump and buffer tank;
  - the heat-exchange room at the boundary (the meter);
  - generators;
  - loading and drive wiping;
  - staff;
  - the public ground floor and refuge room;
  - rain tank.

  Show the per-MW rule behind each area. Where the tool has no figure, mark it as an assumption for me to confirm.
- **A site layout plan and sections:** within the zoning envelope, setbacks and height. Show where the pipe, the cable and the trucks leave the site, the public door, and the plant with its sound screen.
- **A technical specification sheet:**
  - size in MW;
  - PUE;
  - cooling type and temperatures;
  - share of heat captured in liquid;
  - heat pump size and COP;
  - heat offered per year;
  - grid connection;
  - battery and backup;
  - water use;
  - refresh cycle.

  Every line should carry its source and trust level from the tool. Keep the conventional baseline beside it (air cooling, no heat recovery) so the difference is visible.
- **Edmonton:** the zoning allows only a smaller data centre without a rezoning to IH. Show two sizes, the largest that fits (34.7 MW) and a smaller one sized to the heat that can be used nearby, and ask me which to develop.

## Rules

- **Accuracy:**
  - Don't make anything up. Every number comes from the files here, with its source. If you calculate something, show how.
  - Mark anything you can't confirm as unverified.
  - Label operator or industry figures as claims.
  - Don't use popular sources (news, blogs, Wikipedia) for facts.
- **The tool's role:** the tool's results are trade-offs, not verdicts. It's an early feasibility study that shows professionals where to look first; it doesn't replace engineering. Say that where it matters.
  - Vancouver: the site sits inside the traced service area of the City's Neighbourhood Energy Utility (NEU) in the tool's data, yet the tool finds no single nearby building that pays back a direct pipe yet. Show both facts as the tool gives them; don't resolve them.
- **Data terms:**
  - Heat receivers marked `vanBCA` are calculated, rounded values from BC Assessment data (licensed, UBC). Show only those values as given; raw BC Assessment data is not available and must not be sought.
  - Edmonton lot outlines are not in this folder (licensed, not for redistribution). Use the assessment points and the 3D building model.
- **Style** (match the booklet, `Beyond_Data_booklet_white6_spreads_22Oct`):
  - White pages; Barlow (Light for text, SemiBold for titles); ink #1c1c1e; greys for lines.
  - Exchange colours: heat #d4202b, energy #f1b604, water #1f78c7, materials #2e9d4e, people #7b3fb4.
  - Headers like the S pages: a page code, a title, a grey subtitle, a short black bar, and a tracked meta line top right.
  - Thin lines. Plain and professional, nothing that looks AI-generated.
- **Writing:** Canadian spelling. Short labels, no long paragraphs. Leave a "TEXT · J.B." box where I'll write.
- **Output:** vector PDF and 300 dpi PNG for every drawing, plus the model files. Name them clearly, by site and drawing.
