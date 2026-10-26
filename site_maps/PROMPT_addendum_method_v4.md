The site-map method has changed. Please update the maps from the new files before my progress review on Wednesday (28 Oct). This replaces the earlier versions wherever they differ.

Read first, in the Claude Link folder:
- `site_maps/METHODS.md` (sections "Method v2", "Method v3" and "Method v4");
- `site_maps/factors.csv`;
- `site_maps/networks_v2.json`;
- `chosen_sites/SITE_LEDGER_2026-10-25.md`.

## What changed and why

**1. Heat is scored by whether it pays (v2).** The old maps gave every cell inside any district network a heat score of 1.
- A hand check found that heat sold through a heat pump doesn't pay anywhere in Edmonton at today's gas price. Edmonton's old #1 site, 8803 Stadium Rd, relied on exactly that.
- Each route now carries a "pays" factor (value ÷ cost, capped at 1):
  - direct to buildings: Edmonton 0.34, Vancouver 0.94;
  - networks: the factor falls with the pipe cost to reach them;
  - steam = 0; planned networks × 0.5.
- Blatchford's ambient loop needs no heat pump, so it scores 1 near its edge.
- Blatchford's outline now follows the bylaw map: the strip between Kingsway and Airport Rd is outside.
- Edmonton people now include homes built since the 2021 census.

**2. What's already built (v3, site factor).**
- The site score = site × (0.7 + 0.3 × readiness).
- Readiness falls as the cell fills with buildings; half covered counts as fully built.
- At most 30 % comes off, because an existing shell may be reused.

**3. The public uses the zone allows (v3, people factor).**
- People score = people × (0.5 + 0.5 × uses).
- Uses = how many of six public kinds the zone allows: community, events and entertainment, markets, food, child care, urban agriculture.
- Edmonton: BE 1.00, IM 0.25, IH 0.00. Vancouver: I-2 0.50, I-1C 0.58, I-3 0.50, FC-2 0.67.

**4. Zoning is a gate, not a bonus (v4).** Before, a zone that allows a data centre outright (IH) multiplied the result higher than one that allows it case by case. A vacant heavy-industrial lot with almost no heat exchange (12503 66 St NW) ranked #1 in Edmonton. Now:
- allowed and case-by-case both count 1.0;
- site-specific counts 0.5;
- rezoning needed counts 0.1.

The ranking is set by the exchanges.

Factors 2–4 were added after seeing that they favour E06. They apply to every cell in both cities, and v2 is kept for comparison.

## Results (zoning counted)

| | Before (21 Oct) | v2: heat pays | v4: + built, public uses, zoning gate |
|---|---|---|---|
| **Vancouver #1 area** | 225–245 E 2nd Ave / 275 1st Ave E | Same | Same (stability 100 %) |
| **V09, 275 1st Ave E (cell)** | #2 of 9,856 | #3 | #5–6; stability 99 %; in the #1 area |
| **Edmonton #1 area** | 8803 Stadium Rd NW | Blatchford's southwest edge | **Blatchford's south edge**: #1 with equal and heat-priority weights, #2 with spread weights |
| **E06, 64 Airport Rd (cell)** | #122 of 34,428 | #30 | **#4** (equal), **#3** (heat-priority), #7 (spread); stability 53 % |
| **E06, 74 Airport Rd (cell)** | #119 | #25 | #6 (equal), #7 (heat-priority), #13 (spread) |
| **12003–12025 Kingsway (cell)** | #21 | #1 | #6 (equal), #10 (heat-priority) |
| **8803 Stadium Rd, E05 (cell)** | #1 | #6 | #23 |
| **12503 66 St NW (cell)** | top 5 | top 5 | #65 |

**Top five areas, v4, equal weights**

| | Edmonton | Vancouver |
|---|---|---|
| 1 | **Blatchford's south edge** (best cell 11440 Kingsway; E06 about 370 m away) | **225–245 E 2nd Ave** (next to V09) |
| 2 | 8635 Stadium Rd NW | 1342 Georgia St E / 636 Clark Dr |
| 3 | 4999 98 Ave NW | 1525 Coal Harbour Quay |
| 4 | 5703 125 Ave NW | 8729 Aisne St |
| 5 | 10008 166 St NW | 1661 Granville St |

**Known limits.** Please put these in a small note on the sheets.
- The screen works in 100 m cells, not lots, and doesn't check lot size. 11440 Kingsway is only 1,828 m², too small for a data centre; E06's cells are the next best in that area.
- The Blatchford outline is still approximate at the Kingsway / Airport Rd southeast corner.

**How to label the sites honestly**
- **E06:** "In Edmonton's #1 area; its cells rank 3rd–13th of 34,428 depending on the weighting."
- **V09:** "In Vancouver's #1 area, stable in 99 % of 500 random weightings."

## Please update

1. **Heat maps, both cities:** recolour from the `heat` field. Peaks are in `<city>_peaks.geojson`. Legend: network type (ambient, hot water, steam, planned).
2. **Overlap and overlap-zoned maps, both cities:** new peaks and numbers.
3. **People maps, both cities:** new values (public uses). Edmonton also includes the post-2021 homes.
4. **Two new maps per city:** "already built" (`built_cover` / `site_ready` fields) and "public uses the zone allows" (`public_uses` field).
5. **Weighting charts:** re-run from `weighting_summary.json`, `weighting_top5.csv`, `factor_study.csv`.
6. **A before-and-after sheet per city:** use the results table above. The old files are in `site_maps/v1_2026-10-21/`.
7. **Site sheets for E06 and V09:** use the new `*_pack.json` in each `chosen_sites` folder, and the corrections in the ledger:
   - E06 is outside the Blatchford service area (about 50 m across Airport Rd);
   - BE zoning: 16 m height, floor area ratio 1.6, public uses up to 500 m² each;
   - Vancouver heat doesn't pay under today's tariff.

## Label on every map
"Screen, method v4 (26 Oct 2026): heat scored by whether it pays; existing buildings and permitted public uses counted; zoning as a gate. The tool itself has not yet been re-run with these fixes; results may shift." Sources and dates as before.

## Rules as before
Don't make anything up. Every number from the files. Mark assumptions (the new factors are trust 60: derived with stated assumptions). Booklet style. Canadian spelling. Short labels.

## Booklet plan: consolidate the simulation section

Keep the graphic style exactly as it is. The section is too long: S12 to A3 is 13 spreads answering three questions:
- who wins;
- does it hold up;
- can it be built there.

Consolidate that part to **5 spreads**, and update S4–S10 in place. Every change below is either a merge or a replacement. Nothing new in style.

**Keep, updated to v4 (no new spreads)**
- **S1–S3:** unchanged, apart from the method label.
- **S4 The rules:** add the four v2–v4 changes (heat that pays, already built, public uses, zoning as a gate), in the same diagram style.
- **S5 Zoning:** show the gate (allowed / case by case = 1, site-specific 0.5, rezoning 0.1). Add a small **"already built"** inset map (`built_cover`).
- **S6 Heat:** recolour from the new `heat`. Legend by network type: ambient, hot water, steam, planned. Add a one-line note: "scored by whether it pays".
- **S7–S9:** recolour from the new data (Edmonton energy changes slightly).
- **S10 People:** recolour. Add a small **"public uses the zone allows"** inset map (`public_uses`).
- **S11 Where they overlap:** recolour, new peaks.

**Consolidate S12–A3 (13 spreads) into 5**

| New | Title | Replaces | What's on it |
|---|---|---|---|
| S12 | The shortlist | S12 top five, S17 what holds up, S19 how much they win by | Top five areas per city on the map. One table per city: score, stability (share of 500 weightings), lead over the next, and rank in each of the three weightings. Stability and margin become columns, not separate spreads. |
| S13 | How the weighting changes it | S15 and S16 (counted and ignored), S18 rezoning candidates | One row of three small maps per city (equal, heat-priority, spread). With zoning now a gate, the "zoning ignored" spread isn't needed. Rezoning candidates become a short list in the margin. |
| S14 | Can it be built there? | S13 enough land, S14 what stands there | Lot size against the size needed, and what stands on the land (the "already built" factor). Name the limit: the screen works in cells, so 11440 Kingsway (1,828 m²) is too small. |
| S15 | What changed | A1–A3 first pass | Before and after, one column each, v1 (21 Oct) vs v4 (26 Oct): Edmonton #1 moves from 8803 Stadium Rd to Blatchford's edge; V09 stays in Vancouver's #1 area. One line per change and why: heat that pays, already built, public uses, zoning as a gate. State that the last three were added after seeing they favour E06, and are applied city-wide. |
| S16 | What throws it off | S20 what each exchange can tell apart, S21 what throws it off | The S21 tiles, updated. Mark each problem **fixed in v4** or **still open**. Fold in S20's key point (Edmonton water only tells 12 % of the city apart). |

**Result:** the simulation section goes from 24 spreads to 16, with no information lost. The old A1–A3 content survives as the before/after on S15.

**Before drawing**, send me the page list with each spread's title and a one-line content plan so I can approve it.
