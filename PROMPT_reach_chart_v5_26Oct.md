**Redesign the "how far each reach goes" chart (S3), and add the method v5 factors.**

The method is getting new factors (method v5). I'm computing the scores separately. **Your job is the drawing only:** don't invent distances or rules. All rows and numbers are below; draw only these.

## What changes

1. **Condense it vertically.** Group the rows by exchange (heat, energy, water, materials, people):
   - one small group label in the exchange colour;
   - one line per row: name in ink, then what it does in grey, on the **same line**. No second line.
   - Aim for about 60 % of the current height.
2. **Three kinds of mark, so the chart shows how each thing is reached, not only how far:**
   - **Fades with distance** (as now): a wedge from full at 0 to nothing at the reach, with the number at the tip.
   - **On site**: a solid dot at 0 and no bar, labelled "on site". The data centre's own lot is all it needs.
   - **Through a network**: a solid bar that runs the full width past 5 km and ends in an arrow, labelled "anywhere on the grid" (or "anywhere on the network"). Distance doesn't matter because the utility carries it.
3. **Layout:** the "fades with distance" rows go on top, against the 0–5 km axis. Below a hairline, put the "on site" and "through a network" rows, using the same row grouping and colours.
4. Add a three-item key at the bottom: wedge = fades with distance, dot = on site, arrow = through a network.
5. Keep the GP2 frame, Lato at 9 pt minimum, the exchange colours, and no boxes.

## Rows

All numbers are now checked. **Basis** says where each reach comes from. Draw sourced reaches as solid wedges and assumed ones as outline wedges (same shape, no fill), and add "outline = our assumption" to the key.

**Fades with distance (top):**

| Exchange | Row | Does | Reach | Basis |
|---|---|---|---|---|
| Heat | Swimming pools | could use the heat | 1,000 m | sourced (RVO 2018) |
| Heat | Homes | could use the heat | 1,200 m | sourced (RVO 2018) |
| Heat | Other buildings | could use the heat | 1,200 m | sourced (RVO 2018) |
| Heat | Greenhouses | could use the heat | 1,500 m | sourced (RVO 2018) |
| Heat | District heating network | could take the heat | 1,200 m | sourced (tool) |
| Heat | **Hospitals and campuses** (new) | use heat all year | 2,000 m | sourced (Ricardo-AEA for Defra: about 2 km for a 500 kW user) |
| Heat | **Conservatories, zoo, aquarium, museums, exhibition halls** (new) | use heat all year | 2,000 m | sourced (Ricardo-AEA: about 2 km for a 500 kW user); size assumed |
| Heat | **Hotels, food plants, laundries, ice and curling rinks, child care** (new) | use heat all year | 400 m | sourced (Ricardo-AEA: about 400 m for a 100 kW user) |
| Heat | **Large sewer mains** (new) | a second low-temperature source for a network | 300 m, with a tick at 150 m "preferred" | sourced (Fraunhofer IBP) |
| Energy | Electrical substation | supplies the power | 2,000 m | assumption |
| Energy | Homes with few car chargers | could charge at the site | 1,000 m | sourced (tool) |
| Water | Cooling towers (Vancouver) | could share water treatment | 500 m | sourced (tool) |
| Water | Gold Bar wastewater plant (Edmonton) | could supply recycled water | 5,000 m | assumption |
| Water | **Iona Island wastewater plant (Vancouver)** (new) | could supply recycled water once built | 5,000 m, **dashed**, labelled "planned, 2027–2035" | assumption (same as Gold Bar) |
| Materials | Arterial road | truck access for equipment | 500 m | assumption |
| Materials | Industrial lots | repair and reuse nearby | 1,000 m | assumption |
| Materials | **Recyclers** (new) | take retired equipment | 1,000 m | assumption |
| Materials | Schools | could reuse retired computers | 2,000 m | assumption |
| People | People nearby | could use what the site offers | 800 m | assumption |
| People | **Rapid transit stop** (new) | people can get there | 800 m, wedge stays full to 800 m then fades to 0 at 1,200 m | sourced (TransLink; BC Reg 263/2023; Edmonton TOD Guidelines); fade is our assumption |
| People | **Bus stop** (new) | people can get there | 400 m, full to 400 m then fades to 0 at 600 m | sourced (same); fade is our assumption |
| People | **Libraries, community centres, neighbourhood houses, shelters** (new) | partners for public rooms and a cooling refuge | 800 m | sourced (Kim et al. 2021, walk to a cooling refuge) |
| People | Homes right next door | noise lowers the score | 150 m | assumption |

Drop the "Sea, river or lake" row: there's no sourced reach, and it isn't scored. Mention it in one grey line under the water group instead: "Sea or river cooling: not measured (needs permits)."

Two things the method now uses aren't distances, so they don't get a row. Put them in one grey line under the chart: "Also counted: flood hazard on the lot (Edmonton) and neighbourhood need (Census deprivation index)."

**On site (dot at 0):**
- Energy: **Rooftop solar**, part of the data centre's own load.
- Water: **Rain and condensate**, collected and reused on site.
- Heat: **Snowmelt**, for the sidewalks along the site.
- People: **A room open to the street**, on the ground floor.

**Through a network (arrow, "anywhere on the grid"):**
- Energy: **Using less when asked**, i.e. demand response, paid by the utility.
- Energy: **Reserves and grid services**, through the grid operator.
- Energy: **New clean power**, a power purchase deal anywhere in the province.
- Energy: **Electric bus depots**, overnight charging for transit fleets.
- Energy: **Fire halls and emergency centres**, backup power and space in an outage.
- Materials: **Refurbishers and trade programs**, pick up retired computers anywhere in the city.

Add one note under the energy arrows: "Buildings can't sell power across a property line; it goes through the utility (BC Hydro tariff s. 9.1; Alberta self-supply must be on the same property)."

## First reply

Send the redrawn chart with all rows.
