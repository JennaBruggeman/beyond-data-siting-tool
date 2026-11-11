# Scope: v0 Architecture cards to the hub's v1 rooms (10 Nov 2026)

Source change only: areas and MW come from `hub.js` (rule sheet v1), the same as Rooms, Separations and Exits. No figure's rule changes (same heat per m², same heat pump, same envelope arithmetic).

## Weaknesses first
- Two things have **no v1 equivalent** and stay as they are, labelled:
  - **Variant and add-ons:** "refuge placements offered" (side by side / under the hall) is an Arrange option; the v1 hub has one fixed placement. The card will say so and show the hub's variant instead.
  - **The 3-D massing still** (Drawing styles) is the tool's 3-D scene of the Arrange blocks; the hub has no 3-D model. Kept, labelled "Arrange massing, rule sheet v0".
- **The front yard** has no separate figure on these cards. Sections and the exploded view drawn from v1 rooms will show the building set back from the street by the yard depth, labelled.
- MW differs from what the cards show now where the hub capped or narrowed the building (1515: 4.6 → 2.18 MW), so heat offered and "left for neighbours" drop there. 339 keeps 1.8 MW.

## Cards and figures that change
| Card | Figures from v1 |
|---|---|
| The numbers | IT load tested (hub MW); floor area, all storeys (hub rooms); heat made and heat used by the programs (hub refuge, shelter, clinic areas); longest walk to an exit (hub travel, not plan.js) |
| What's left for neighbours | heat made, used by the programs, left for neighbours |
| Heat flow | size tested, GWh offered, used in the programs, left; the section drawn from the hub's storeys |
| Program diagram | programs asked for vs net in the plan (hub rooms), data hall floor, storeys drawn, data-centre floor; plan and section from the hub |
| Drawing styles | storeys by floor level, plan, section and exploded view from the hub; the 3-D still stays Arrange (see above) |
| Compare | both cities: IT size, data hall floor, programs, heat offered and used, left for neighbours |
| Pick a typology, The governing principle | tag only (no areas or MW) |
| Variant and add-ons | tag; placements line says the v1 hub has one placement |

## How
- One adapter: the hub layout for the example lot (`BD.hub.build(P)`, cached as the Rooms card does), and `budgets()` run with the hub's areas and MW in place of the picks' areas and the site model's size.
- Section, exploded view and plan drawn from the hub's storeys and rooms.
- Tags on these cards: "Draft plan · rule sheet v1".

## Checks
Tool output before and after for 339 1st Ave E and 1515 Boundary Rd (every changed figure listed); the F1 gate; golden unchanged (no engine change). Commit to `site-f1`, no push.

## Estimate
About half a day of work: the adapter and the six cards, then the drawings. One commit for the source switch, one for the drawings if they need their own.
