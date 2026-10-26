I've moved my Edmonton site for GP2 (Beyond Data: data centres as neighbours). The new site is at the edge of Blatchford, the City's new low-carbon neighbourhood on the old City Centre Airport. I need a site analysis of it for my booklet.

**This is a site analysis, not a building design.** The building is GP2's work and isn't designed yet.
- **Don't draw a data centre on the site:** no massing, no plan, no section of a building.
- **Do show:**
  - the exchanges;
  - the money behind them;
  - the adjacencies (what's near, how far, across what);
  - the site rules;
  - the **qualities a data centre here would need** to make each exchange possible.
- Any program is **speculative and graphic** (proportions, relationships, phases), never a plan.

Everything you need is in the connected folder `chosen_sites/`, mainly `E06_74_64_Airport_Rd_NW/`. **`SITE_LEDGER_2026-10-25.md` overrides any older figure.** Read this whole prompt and the folder's `README.md` (its data gaps especially). Then propose your spreads (title plus a one-line plan each) before drawing. I'd expect about 6–8 spreads, but you propose.

## Why this site (say this in the booklet)

- The GP1 screen ranked 8803 Stadium Rd NW first in Edmonton.
- A hand check then found that at Edmonton's gas prices, heat sold into a hot network through a heat pump doesn't pay at any 2021–25 power price.
- Blatchford's loop runs at 8–32 °C (Design Guide v8, June 2025). A data centre's heat can go in **without a heat pump**.
- So the move is a **finding**: the network decided the site.
- With the method corrected (site maps v4, see `site_maps/PROMPT_addendum_method_v4.md`):
  - Blatchford's south edge is **Edmonton's #1 area**;
  - E06's cells rank 3rd–13th of 34,428, depending on the weighting.

## The site

| | |
|---|---|
| Addresses | 74 and 64 Airport Rd NW, Edmonton |
| Centre | 53.568862, −113.522429 (midway between the two City assessment points) |
| Lots | 4,562.5 m² and 4,274.4 m², about 8,840 m² together; vacant gravel; owner unknown (land title search pending) |
| Zoning | **BE** (Bylaw 20001 s. 2.120): height 16.0 m; floor area ratio 1.6 (about 14,140 m²); setbacks 4.5 m to Airport Rd (collector), 6 m to a street or residential site, 0 m to other sites |
| Data centre as a use | Not listed: discretionary, or argued as Minor Utility. Generators or big cooling plant read as Major Utility, which BE doesn't allow |
| Public uses allowed | Community Service, Indoor Sales and Service (markets), entertainment, Food and Drink, Child Care, Urban Agriculture: **up to 500 m² each** unless varied |
| Blatchford | The site is **outside** its utility service area, about 50 m across Airport Rd (Bylaw C17943 Sch. A) |
| Neighbours | Blatchford row housing across Airport Rd; Edmonton Inn on Kingsway; NAIT campus 1.3 km (its Blatchford extension is to be served by Energy Centre One); Royal Alexandra Hospital 2.1 km; substation 617 m |
| Possible risk | Former airport land: expect an environmental site assessment (Bylaw 20001 s. 7.140) |

## What's in the folder

- **`E06_footprints.geojson`, `E06_heights.csv`:** buildings in a 1,000 m square (City 3D Buildings). A blank means the data doesn't give that value.
- **`E06_parcels_500m.csv`:** assessment points within 500 m, with zoning.
- **`E06_heat_receivers.csv`, `E06_substations.csv`, `E06_ev_chargers.csv`.**
- **`E06_pack.json`:** the site's cell in the site maps (v4).
- **`E06_tool_fit.json`:** how much the zoning would fit (3.4–10.3 MW per lot). Use only as a range for scale, never as a drawn building.
- **`DESIGN_BRIEF.md`:** the design qualities that make each exchange possible, and plant space per MW.

**No tool reports for E06 yet, on purpose.** The tool still assumes a heat pump for every network, which is wrong here. Heat and money come from the ledger. Anything that would need the tool is marked "tool re-run pending".

## Data gaps

- **Blatchford's new buildings are missing** from the 3D data: none from 2015 on, against 210 parcels built since. Trace them from a current aerial or a newer City or OpenStreetMap layer, and label the source and date. Don't estimate heights; outlines only if unknown.
- **Blatchford homes aren't in the heat-receiver list.** Use the network figures below, labelled.
- **People counts lag** (2021 census); say so.

## Blatchford's network (from the ledger)

- Loop 8 °C minimum (winter) to 32 °C maximum (summer).
- Energy Centre One: **1 MW heating / 1 MW cooling (2023)**, expanding to 4.25 / 4 MW. "Over 100" homes (2024); 442 accounts projected by 2026.
- Build-out: 46,789 MWh/yr heating (34.5 MW peak) and 43,747 MWh/yr cooling (46.6 MW peak).
- Expansion: $79.2M ($23.7M federal), adding 13.1 MW heating and 12.3 MW cooling.
- 570 boreholes.
- **Sewer heat deferred**: lower sewer-flow forecasts, so a $15.3M peaking energy centre comes first.
- Customer rate $35.80/MWh (2026).
- The bylaw has no rules or prices for outside heat. Service can be cut for "undue or abnormal fluctuations" (s. 41, item (ii)).
- **Open question:** does the loop gain or lose heat over a year? Only the utility can say. Show both readings from the ledger.

## What the booklet should show

**1. Adjacencies.**
- What's near and how it connects: the loop edge, substation, NAIT, the hospital, homes across the road, truck routes.
- Distances, and what each link crosses (Airport Rd, Kingsway).
- Trace Blatchford's buildings for this.

**2. Site rules.**
- Zoning as a diagram of limits on the empty lots (height, floor area ratio, setbacks, the 500 m² public-use cap, what counts as Minor vs Major Utility). Rules, not a building.
- The service-area boundary and what being outside it means: no compulsory connection, no published terms.

**3. The exchanges.** One compact treatment per exchange (heat, energy, water, materials, people and place):
- what could be given and taken;
- with whom (named, with distances);
- how much (range and units);
- what would have to be true;
- what's ruled out and why;
- how sure (trust).

Add **land and time** (meanwhile use of space held for growth) as its own exchange.

**4. The money.**
- Heat delivered with no heat pump: $5–15/MWh at the boundary for winter heat; more at a farther tie-in.
- Against what the heat could be worth: unknown, with the $35.80 customer rate as a ceiling.
- Beside it, why the heat-pump route fails in Edmonton: $30–75/MWh against $13, at 2021–25 power prices.
- The carbon price that would close the gap: $108–238/t.
- A monthly picture: 70 % of heating falls in Nov–Mar, but a data centre gives heat evenly all year.

**5. The network over time.** Blatchford's build-out (homes, MW) against the share of a 3–4 MW data centre's heat that could be used, rising over time. Speculative and labelled.

**6. Qualities the data centre would need** (from `DESIGN_BRIEF.md` and the ledger), as a list or diagram per exchange, not a design:
- **Heat:** liquid cooling; a heat exchanger at the boundary (the meter); **no heat pump** here; its own full cooling for summer.
- **Energy:** grid-ready batteries; a load it can curtail; a backup role.
- **Water:** dry coolers (almost no water); a rain tank.
- **Materials:** dock and truck route sized for refreshes; drive wiping on site.
- **People:** space that can host public uses, sized to the 500 m² cap; acoustic screening.
- **Land and time:** a shell built ahead of servers, lent until needed.

Mark these as **GP2 hypotheses**, not decisions.

**7. A speculative program**, graphic only:
- the proportions of spaces per MW (from `DESIGN_BRIEF.md`) and their relationships (what must touch what: the meter at the boundary, the dock at the street, public space at the front door);
- how it might grow from about 3–4 MW to about 9 MW.

No plan, no layout, no massing on the site.

**8. A 3D model of the neighbourhood**, for context only: footprints extruded, traced Blatchford buildings labelled, both lots highlighted and **left empty**. OBJ or 3DM plus GeoJSON, in metres, local frame centred on the site; state the origin.

## Rules

- **Accuracy:** don't make anything up. Every number from the folder, the ledger or the library, with its source; show any calculation. Mark what you can't confirm as unverified. Label operator or industry figures as claims. No popular sources.
- **The tool's results are trade-offs, not verdicts:** an early feasibility study, not engineering.
- **Data terms:** Edmonton lot outlines aren't in the folder (licensed). Use the assessment points and the 3D model.
- **Style** (match the booklet, `Beyond_Data_booklet_white6_spreads_22Oct`): white pages; Barlow (Light text, SemiBold titles); ink #1c1c1e; greys for lines. Exchange colours: heat #d4202b, energy #f1b604, water #1f78c7, materials #2e9d4e, people #7b3fb4. S-page headers. Thin lines; plain and professional.
- **Writing:** Canadian spelling. Short labels. Leave a "TEXT · J.B." box.
- **Output:** vector PDF and 300 dpi PNG per drawing, plus model files, named by site and drawing.
