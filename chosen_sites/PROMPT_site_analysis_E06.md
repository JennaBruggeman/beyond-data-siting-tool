I've moved my Edmonton site for GP2 (Beyond Data: data centres as neighbours). The new site is at the edge of Blatchford, the City's new low-carbon neighbourhood on the old City Centre Airport. I need a full site analysis of it, at the same depth as the earlier sites:

- a 3D model of the neighbourhood;
- site maps;
- an axonometric with the exchanges;
- every exchange documented;
- the data centre's program, layout and specifications.

Everything you need is in the connected folder `chosen_sites/`, mainly `E06_74_64_Airport_Rd_NW/`. **`SITE_LEDGER_2026-10-25.md` overrides any older figure**: use its numbers. Read this whole prompt, then the folder's `README.md` (its data gaps especially), then tell me your plan and which drawings you'll make before making them.

## Why the site moved (say this in the booklet)

- The GP1 site maps ranked 8803 Stadium Rd NW (E05) first in Edmonton.
- The later money test found that at Edmonton's gas prices, waste heat sold into a hot network (downtown, 70/50 °C) doesn't pay. Most of the cost is the heat pump needed to lift the heat that far.
- Blatchford's loop runs at 8–32 °C (Blatchford District Energy Design Guide v8, June 2025). A data centre's waste heat can go in without a heat pump. Delivery costs a few dollars per MWh.
- So the move is a **finding**: the tool's #1 site failed the money test, and the network decided the site.
- The GP1 site maps still rank E06 lower (0.40 vs 0.59 overall). They score heat by demand and distance, not by network temperature or cost, and the people score uses 2021 census data from before most of Blatchford was built. Show this openly; don't hide it.

## The site

| | |
|---|---|
| Addresses | 74 and 64 Airport Rd NW, Edmonton |
| Folder | `E06_74_64_Airport_Rd_NW/` |
| Centre | 53.568862, −113.522429 (midway between the two City assessment points) |
| Neighbourhood | Blatchford Area (City assessment) |
| Zoning | BE (Business Employment), both lots: height 16.0 m, floor area ratio 1.6 (about 14,140 m²), setbacks 4.5 m to Airport Rd. A data centre isn't a listed use (discretionary, or argued as Minor Utility). Public uses capped at 500 m² each unless varied. |
| Lots | 4,562.5 m² and 4,274.4 m², about 8,840 m² together |
| On them now | Nothing on record: open gravel lots |
| Across the road | Blatchford's new townhouses (missing from the 3D data, see below). The site is **outside** Blatchford's utility service area, about 50–60 m across Airport Rd. |
| Owner | Unknown: land title search pending (J.B.) |

## What's in the folder

- **`E06_footprints.geojson`, `E06_heights.csv`:** buildings in a 1,000 m square, from the City's 3D Buildings model (roof outlines, not surveyed footprints). `datasets.md` explains every column. A blank means the data doesn't give that value; don't fill it in.
- **`E06_parcels_500m.csv`:** assessment points within 500 m (points, not lot outlines), with zoning and area.
- **`E06_heat_receivers.csv`:** larger heat users within 1,500 m, as the site maps count them. Columns as in the E05 pack.
- **`E06_substations.csv`, `E06_ev_chargers.csv`:** substations within 3 km (nearest 596 m) and public chargers within 1.5 km.
- **`E06_pack.json`:** the site's 100 m cell from the GP1 site maps: scores and raw factors.
- **`E06_tool_fit.json`:** the tool's fit for each lot alone: 3.6–10.3 MW (74) and 3.4–10.3 MW (64), two floors. The tool can't combine lots.
- **`DESIGN_BRIEF.md`:** the design that makes each exchange possible, and plant space per MW.
- The E05 folder, for comparison only.

**No tool reports for E06 yet, on purpose.** The tool still assumes a heat pump for every network, which is wrong for Blatchford's ambient loop. It will be re-run after its heat fixes. Until then:
- heat numbers come from `SITE_LEDGER_2026-10-25.md`;
- sizes and plant areas come from `E06_tool_fit.json` and the per-MW rules in `DESIGN_BRIEF.md`;
- anything that would need the tool is marked "tool re-run pending".

## Data gaps: read before modelling

- **Blatchford's new buildings are missing.** The 3D data has no buildings from 2015 on, but the assessment roll has 210 parcels built since 2015 in Blatchford (all BRH zone). Trace them from a current aerial or a newer City or OpenStreetMap layer, and label the source and date on every drawing. Don't estimate heights; if you can't find them, draw outlines only and say so.
- **Blatchford homes aren't in the heat-receiver list**, so heat demand next door is undercounted. Use the Blatchford figures below instead, labelled.
- **People counts lag** (2021 census). Say so on the people map.

## Blatchford's network (sources in the library)

- Loop temperature 8–32 °C; ground boreholes plus a central energy centre (Design Guide v8, June 2025).
- About 400 homes connected today; Energy Centre One is 1–3 MW.
- Planned at full build-out: about 46,800 MWh a year heating (34.5 MW peak) and 43,700 MWh a year cooling.
- An expansion of $79.2M ($23.7M federal) adds 13.1 MW of capacity. That's what's being added, not the system total.
- 570 boreholes now, planned to reach 2,100. Sewer heat is listed as "in design and construction".
- The utility bylaw (C17943) has no rules or prices for heat from outside sources. Service can be cut for "undue or abnormal fluctuations" (s. 41(g)(ii)).
- The utility's finances are a risk (an advisor called it not viable without support). Treat this as a risk to state, not a fact to resolve; the figures behind it are from news reports, so label them unverified.

## The building (decided)

- **Size:** sized by its client and power supply: about 3–4 MW to start, growing towards about 9 MW. Likely client: NAIT (main campus about 1.3 km away) or City research computing, both unconfirmed.
- **Heat:** straight into Blatchford's loop at its temperature; no heat pump at the data centre. The share of heat used is small at first and grows as Blatchford builds out.
- **Its own full cooling** (dry coolers), because the loop can't always take its heat.
- **Built full, filled over time:**
  - permanent public wing;
  - structure, power and risers built for the full size now;
  - about 5–8 halls of about 500 m² each (BE caps each public use at 500 m² unless varied), 2–3 live at the start;
  - empty halls lent only to uses designed to leave: markets, events, recreational sport, maker space, a winter greenhouse;
  - halls built to the data-hall module, so each reads as a data centre lent out;
  - a published timeline for when halls convert, so nobody is evicted.
- **Two doors per hall:** a fixed secure spine on one side, a public arcade on the other. Which door is locked decides what the hall is. The security line never moves.
- **Built to assembly occupancy from day one:** exits, fire separations, construction type, pre-action sprinklers and alarm, barrier-free. Plugged in when a hall turns public: fresh air, lighting, finishes. Washrooms in the permanent wing. This is general code logic, not an Alberta code review; mark it so.
- **Framed as an architectural experiment:** hypothesis, fixed vs changing parts, what's measured, what would count as failure.

## What I'd like

**1. 3D model**

- Extrude every footprint by its height in the 1,000 m square, plus the traced Blatchford buildings (labelled as traced).
- Both lots highlighted; a simple massing for the full shell (from the fit file), with the halls marked.
- Plain grey massing, site in accent, ground plane, streets from open data.
- OBJ or 3DM plus GeoJSON, in metres, local frame centred on the site; state the origin.

**2. Site maps** (8.5 × 11 and 17 × 11)

- Figure-ground (with traced Blatchford).
- Zoning within 500 m.
- Heat: receivers by type and demand, reach rings, and Blatchford's network and energy centre.
- Energy: substations and chargers.
- People: population (with the census-lag note), the 150 m night-noise ring, Blatchford homes across the road.
- Materials: truck access, industrial land.
- Water: say what the folder has and doesn't; no Edmonton water permit list exists in the pack.
- Scale bar, north arrow, source line and date on each.

**3. Axonometric**

- Neighbourhood massing with exchange lines to real receivers, labelled by name and distance: the loop, the substation, chargers, nearby homes, truck route.
- One full axo, plus zoom-ins of the two strongest exchanges (likely heat to the loop and the public halls).

**4. Exchanges, documented** (heat, energy, water, materials, people and place)

For each: what the site gives and takes, who receives it, how much (range and units), what would have to be true, what's ruled out and why, and how sure. Cover the tool's 21 opportunities and say which apply. Add **meanwhile use of empty halls** as its own exchange, since it's the core of this building.

**5. The data centre: program, layout, specifications**

- Program by phase (start at 3–4 MW, full at about 9 MW): data halls, electrical (UPS, batteries, switchgear), cooling, the heat-exchange room at the boundary, generators, loading, staff, public wing, refuge, interim halls. Show the per-MW rule from `DESIGN_BRIEF.md` behind each area; mark assumptions for me to confirm.
- Site plan and sections within BE zoning: where the pipe, cable and trucks leave, the secure spine, the public arcade, the plant and its sound screen.
- Specification sheet with source and trust level on each line, beside a conventional baseline (air cooling, no heat recovery).

**6. The GP2 drawing set** (shared with the Vancouver building, so the two compare)

1. a section through the building;
2. the five exchanges;
3. the network over time (Blatchford's build-out against the halls going live, and the share of heat used rising);
4. the heat-interface detail (data centre to loop);
5. an inhabited civic view of a lent hall;
6. the tool's numbers.

## Rules

- **Accuracy:** don't make anything up. Every number from the folder or the library, with its source; show any calculation. Mark what you can't confirm as unverified. Label operator or industry figures as claims. No popular sources (news, blogs, Wikipedia) for facts.
- **The tool's results are trade-offs, not verdicts:** an early feasibility study that shows where to look first, not engineering.
- **Data terms:** Edmonton lot outlines aren't in the folder (licensed, not for redistribution). Use the assessment points and the 3D model.
- **Style** (match the booklet, `Beyond_Data_booklet_white6_spreads_22Oct`): white pages; Barlow (Light text, SemiBold titles); ink #1c1c1e; greys for lines. Exchange colours: heat #d4202b, energy #f1b604, water #1f78c7, materials #2e9d4e, people #7b3fb4. S-page headers: page code, title, grey subtitle, short black bar, tracked meta line top right. Thin lines; plain and professional.
- **Writing:** Canadian spelling. Short labels. Leave a "TEXT · J.B." box where I'll write.
- **Output:** vector PDF and 300 dpi PNG per drawing, plus model files, named by site and drawing.
