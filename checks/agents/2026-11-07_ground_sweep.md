# Ground sweep, 7 Nov 2026 (WORKLIST 3): what the one-rectangle fit leaves unused

Run: `checks/tests/sweep_ground.js` (the lighter run: no 3D, no screenshots, 4 pages), after the section 3 gate answers (2d4e74f) and the generator noise checks (this commit).
All 5,932 lots in data-centre zones in the tool's tiles: Vancouver 700 (I-2 641, I-3 32, FC-2 26, I-1C 1), Edmonton 5,232 (IM 2,827, BE 1,930, IH 375, EIB 69, EETC 11, EIM 8, EETM 5, EETIM 5, EETL 2).
475 s in all; no errors, no page errors. Per-lot output stays outside the repo (Edmonton outlines are Altalis data); only totals below. Earlier runs the same day are superseded (see the end).

## Weaknesses first

- **Unused ground** = buildable area (inside the yards) − the building's largest rectangle − the plant yard (with its truck lane) − an outside loading strip − the side drive where one is drawn. Programs are not placed, so this is ground the one-rectangle fit cannot use, not ground that stays empty in a design.
- **Defaults only:** Architecture's Ratios defaults on a new building; no typology, no picks.
- **Size test** at the conservative end: ≈635 m² per MW for hall, UPS and battery, plus support rooms at 33 % (the register's 27–33 %), and no generator yard deeper than the tested 21.7 m.
- **Generator noise** uses one maker claim (78 dB(A) at 7 m, Kohler G6-154), free field, one set, this lot's own property lines classed by what they abut (our reading). No screening, no ground absorption, no sets running together.
- **Not measured:** the leftover's shape, cooling-plant noise beyond the set-up's own check, CD-1 lots, sub-area A of I-2.

## Results

| | Vancouver | Edmonton |
|---|---|---|
| Lots | 700 | 5,232 |
| Hold a data centre (Ratios MW ≥ 0.1) | 385 | 3,747 |
| Hold nothing | 315 | 1,485 |
| Unused share of buildable, lots that hold something (p10 / p50 / p90) | 3 / 6 / 24 % | 1 / 5 / 24 % |
| Unused m², p50 / p90 | 183 / 1,558 | 368 / 3,757 |
| Lot length (frame), p10 / p50 / p90 | 32 / 46 / 131 m | 40 / 92 / 220 m |
| Lot width (frame), p10 / p50 / p90 | 10 / 31 / 98 m | 16 / 62 / 172 m |
| Smallest lot that holds anything | 585 m² | 1,422 m² |
| Side drive to the dock (no street or lane at the rear or sides): in the side yard / building narrowed | 7 / 78 | 0 / 2,098 |
| Largest fit cut at the tested yard depth ("beyond the tested range" above it) | 246 | 3,357 |

Share of lots that hold something, by lot size (median MW where they do):

| Lot | Vancouver | Edmonton |
|---|---|---|
| < 500 m² | 0 / 108 | 0 / 375 |
| 500–1,000 m² | 25 / 142 (0.5 MW) | 0 / 292 |
| 1,000–2,000 m² | 90 / 138 (1.0) | 18 / 437 (0.1) |
| 2,000–5,000 m² | 129 / 153 (2.4) | 1,154 / 1,366 (2.4) |
| ≥ 5,000 m² | 141 / 159 (8.1) | 2,575 / 2,762 (8.7) |

## Generator noise (lots that hold something, with yard generators)

| | Vancouver (385) | Edmonton (3,702) |
|---|---|---|
| Test level within the limit | 385 (≤ 80 dB(A) at 6.1 m or the nearest line, 6555 s. 4.1(c)) | 2,876 (≤ 75 residential, ≤ 85 non-residential, C14600 s. 19(3), 21(3)) |
| Test level over the limit | 0 | 826 (mostly sets 3.0 m from a non-residential line: 85.4 dB(A); 85 holds from about 3.1 m) |
| Nearest lot line closer than 6.1 m (measured at 6.1 m) | 349 | — |
| Overnight power cut over the night limit (flag, not a block; no generator exemption, s. 24) | — | 3,702 (all) |
| Has a residential line on its own edges | — | 16 |

## Reading

- On most lots the one rectangle wastes little (median 5–6 % of the buildable area); one lot in ten wastes about a quarter. Those are the irregular lots (339 1st Ave E, 12603 123 St NW) where the section 5 rule sheet (leftovers become yards, plant on awkward ground) matters.
- The conservative size test roughly halves the median MW on the larger lots compared with the lenient run (Vancouver ≥ 5,000 m²: 15.7 → 8.1 MW).
- Most Edmonton lots (2,098 of 3,747) need the side drive to reach the dock; the building is 6.1 m narrower for it.
- Generator noise: in Edmonton one set at night is over the limit everywhere (free field, no screening). The daytime test fails on 826 lots only because the sets stand at the 3.0 m B139 minimum: moving them about 0.2 m further from the line would pass. The tool shows the test result as "bad" in Arrange but does not yet move the sets or reduce the MW.

Earlier runs the same day: lenient 290 m² per MW and no truck lane (531 / 4,063 lots held something); conservative 635 without support rooms (410 / 3,982).
