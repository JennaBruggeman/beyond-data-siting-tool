**Simulation spreads: redesign brief (S1–S4, S12–S16), with style options to choose from.**

S5–S11 are the standard and stay as they are. Each is one strong figure per page, Vancouver left and Edmonton right, legend and top-five list beside the map, short notes.

The other spreads need redrawing. For each one below:
- the **fixes** apply to every version;
- then draw **each style option (A, B, C)** as a separate draft;
- I'll pick one per spread (or mix parts), and you finalize only the picks.

No new numbers: everything comes from the method v4 files (`site_maps/`: grids, `weighting_summary.json`, `weighting_top5.csv`, `realistic_top5.csv`, `cell_land.csv`, `factors.csv`, `networks_v2.json`; `site_maps/v1_2026-10-21/` for v1).

## Fixes for every spread and every option

1. **Delete every "TEXT · J.B." box.** The drawings and notes carry the page.
2. **One main figure per page**, filling the frame inside the GP2 margins.
3. **Maps:** same scale, framing, north arrow, scale bar and grey cell base as S5–S11.
4. **Notes:** at most three lines each, attached to what they explain by a thin leader line or a numbered call-out. No paragraphs.
5. **Type:** Lato, 9 pt minimum. Ink for titles and labels; grey for secondary text; red only for V09, E06 and one key word per page.
6. **Colour:** exchange colours only for exchanges (heat #d4202b, energy #f1b604, water #1f78c7, materials #2e9d4e, people #7b3fb4). Everything else is ink and three greys.
7. **Lines:** 0.25–0.5 pt for structure, 1 pt for data. No boxes around figures.

## The three style families

Use these as the meaning of A, B and C on every spread, so a family can be chosen across the booklet:

- **A · Chart:** clean data-journalism graphics (bars, dots, slope lines on plain axes). Precedents: FT Visual Vocabulary, Datawrapper.
- **B · Drawing:** architectural representation: axonometric layer stacks, plans with hatching, sections, exploded views. Precedent: Ian McHarg's overlay maps (*Design with Nature*, 1969), MVRDV's *KM3*.
- **C · Atlas:** one dense, finely labelled diagram that reads like a large research chart: many small annotations, thin leaders, no boxes. Precedent: Crawford & Joler, *Calculating Empires*.

## S1 How the simulation works

- **A · Chart:** a strip of seven equal frames across both pages (about 45 × 45 mm each), joined by thin arrows. Frames: inputs (6 labelled layer outlines with counts) → 100 m grid → six score miniatures (2 × 3) → zoning gate (1 / 0.5 / 0.1) → overlap → three weight bars → shortlist with five dots. Under each: step number, 2–4 word title, one grey line, and the spread it leads to in red. Precedent: R2D3's step-by-step explainer.
- **B · Drawing:** McHarg-style **axonometric stack** of the real Vancouver layers: six score maps as thin tilted sheets, one above the other, in their exchange colours, the zoning gate as a perforated grey sheet, and the overlap result as the bottom sheet in greys with the five places marked. Labels on leaders to the right of each sheet, each with its spread number.
- **C · Atlas:** one large flow diagram across the spread: data sources on the left (named, with counts), passing through the rules in the middle (the six exchanges as coloured bands), merging into the overlap and shortlist on the right. Every source, rule and weight labelled small along the bands.

## S2 Two cities as cells

- **A · Chart:** three frames in a row with zoom lines: both cities at one scale (cell counts, 10 km bar) → 1 × 1 km around V09 with the grid visible → the single cell as a 40 × 40 mm square. Right page: that cell's six scores as horizontal bars, then overlap and overlap × zoning.
- **B · Drawing:** one **exploded axonometric** of the V09 cell: the 100 m square lifted off the city grid, with its six scores as thin coloured slabs stacked above it, slab height = score. Right page: both cities in plan, same scale, as a figure–ground of cells.
- **C · Atlas:** the 1 × 1 km block around V09 drawn at large scale in plan, every cell labelled with its overlap score in small type, the V09 cell annotated with all six scores and its inputs.

## S3 How far each reach goes

- **A · Chart:** left, rings at true scale around the Vancouver #1 cell on streets and receivers; right, a row of six small identical fade-with-distance charts (0–2 km, 0–1).
- **B · Drawing:** a **section** through the site: distance along the ground, with each reach drawn as a coloured line falling off to its distance, and receivers (pool, greenhouse, homes, substation) drawn in elevation at their true distances.
- **C · Atlas:** one large plan of the 4 × 4 km around the cell, all rings drawn, and every receiver within reach labelled by name and distance.

## S4 The rules

- **A · Chart:** left, a 6-row × 4-column table (what goes in · the rule as a tiny drawing · weight inside the score · how sure ●◐○), hairline rules between rows only. Right, four before/after pairs (v1 | v4) with a red arrow: heat that pays; already built; public uses; zoning as a gate.
- **B · Drawing:** six **small plan diagrams**, one per exchange, each showing the rule acting on the same sample block (e.g. heat: receivers and the network outline; zoning: zones hatched by gate value). The four before/after changes as pairs of the same plan.
- **C · Atlas:** one diagram per page with the rules as branches from the cell: each branch names its inputs, sources, weights and certainty, with the four changes marked on their branches as red "v2/v3/v4" tags.

Keep the red note on every option: "Changes 2–4 were added after seeing that they favour E06; they apply to every cell in both cities."

## S12 The shortlist

- **A · Chart:** each page = one city. Top half: the city map, five numbered dots, V09 or E06 ringed in red. Bottom half: one row per place with aligned columns: rank and address · six tiny score bars (same height in every row) · stability bar · lead over next · land bar with a red tick at 2,000 m².
- **B · Drawing:** each page = one city. The map, plus the six places as **small plan vignettes** (the 100 m cell with City building footprints and streets), each with its six-score bars beneath. No licensed lot outlines.
- **C · Atlas:** the city map at full page with every shortlisted place annotated directly on the map: address, scores, stability and land on leaders.

## S13 How the weighting changes it

- **A · Chart:** a bump chart: three axes (Equal, Heat priority, Spread), each topped with its weight bar, ranks 1–10, one line per place; V09 or E06 in red at 1.5 pt. Right third: a stability strip (share of 500 random weightings).
- **B · Drawing:** **three small maps** side by side (one per weighting), same scale, top five marked, plus a fourth map of stability as dot size.
- **C · Atlas:** the 500 weightings drawn as faint lines in a parallel-coordinates chart (one axis per exchange weight), each line coloured by which place comes first.

## S14 Can it be built there?

- **A · Chart:** one row per place (both cities' land-checked five, plus V09, E06 and 11440 Kingsway): grey land bar against a red 2,000 m² line, ink dot for building cover against a 50 % line. Rows that fail get a grey "fails" tag.
- **B · Drawing:** the same places as **small plans** at one scale, buildings in grey, the land zoned allowed or case by case hatched, and a 2,000 m² square drawn beside each for scale.
- **C · Atlas:** the "cell isn't a lot" inset made the main figure: the 11440 Kingsway cell at large scale, annotated, with the comparison rows small beside it.

## S15 What changed

- **A · Chart:** left, 2 × 2 maps (v1 | v4, Edmonton and Vancouver), same scale, #1 marked, a red arrow from the v1 #1 to the v4 #1. Right, a slope chart of ranks v1 → v4 for Blatchford's edge, E06, V09 and the v1 Edmonton #1.
- **B · Drawing:** one Edmonton map with v1 and v4 **overlaid** (v1 as hatching, v4 as tone) and the #1 move drawn as an arrow; the four changes as a timeline strip v1 → v2 → v3 → v4.
- **C · Atlas:** a single timeline across the spread from 21 to 26 Oct, each method change a node with what it changed, which places moved, and by how many ranks.

## S16 What throws it off

- **A · Chart:** a 3 × 3 grid of equal tiles: big number, one line on what it means, one on what it does to the results, and a status badge (Fixed (v2) / Fixed (v4) in ink, Partly fixed in grey outline, Open in red outline). Open items in the top row.
- **B · Drawing:** each issue drawn as a tiny diagram of what goes wrong (e.g. a network outline too big, a lot the cell misses), with its badge.
- **C · Atlas:** one chart plotting every issue by how much it could change the rankings (across) against how sure we are (up), labelled, coloured by status.

## How to send them

1. **Round 1:** S1, S4, S12 and S13, all three options each (12 drafts). Quick but legible: real data, correct scales, final type sizes. Not polished.
2. Put them on **one contact sheet per spread**, labelled S1-A, S1-B, S1-C and so on, so they can be compared side by side.
3. I'll pick. Then do round 2 (S2, S3, S14, S15, S16) in the families I picked, with one alternate each.
4. Finalize the picks only.

## Precedents (open before drawing)

- McHarg overlay method: https://courses.ems.psu.edu/geog160/node/1975
- FT Visual Vocabulary: https://data.europa.eu/apps/data-visualisation-guide/visual-vocabulary
- Crawford & Joler, Calculating Empires: https://knowingmachines.org/publications/calculating-empires
- R2D3, A Visual Introduction to Machine Learning: https://r2d3.us
- MVRDV, KM3: https://mvrdv.com/publications/922/km3
- Small multiples: https://www.cdc.gov/cove/data-visualization-types/small-multiples.html
- Datawrapper slope chart: https://www.datawrapper.de/academy/how-to-create-a-slope-chart
- Datawrapper range plot: https://www.datawrapper.de/academy/how-to-create-a-range-plot
- Datawrapper dot plots: https://www.datawrapper.de/blog/brand-new-dot-plots
