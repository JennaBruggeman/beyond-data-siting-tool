# Ground sweep, 7 Nov 2026 (WORKLIST 3): what the one-rectangle fit leaves unused

Run: `checks/tests/sweep_ground.js` (the lighter run: no 3D, no screenshots, 4 pages) after 7482a0b (conservative size test ≈635 m² per MW, plant-yard cap, truck lane to the dock).
All 5,932 lots in data-centre zones in the tool's tiles: Vancouver 700 (I-2 641, I-3 32, FC-2 26, I-1C 1), Edmonton 5,232 (IM 2,827, BE 1,930, IH 375, EIB 69, EETC 11, EIM 8, EETM 5, EETIM 5, EETL 2).
409 s in all (median 0.21 s a lot); no errors, no page errors. Per-lot output stays outside the repo (Edmonton outlines are Altalis data); only totals below.
An earlier run the same day (after 12b8c79, lenient 290 m² per MW, no truck lane) is superseded; its main difference is shown at the end.

## Weaknesses first

- **Unused ground** = buildable area (inside the yards) − the building's largest rectangle − the plant yard (with its truck lane) − an outside loading strip. Programs are not placed, so this is ground the one-rectangle fit cannot use, not ground that stays empty in a design.
- **Defaults only:** Architecture's Ratios defaults on a new building; no typology, no picks. Each lot's own set-up choices are not tried.
- **Support rooms** are not added in the size test (?), so sizes still lean a little high.
- **Dock access** is not run lot by lot (it needs Arrange); the proxy below is whether any street or lane reaches the rear or a side.
- **Generator noise** is not checked anywhere (no sourced sound level for the sets, ?); yards deeper than the test lots' are only flagged.
- **Not measured:** the leftover's shape (slivers vs usable yards), noise of the cooling plant beyond what the set-up checks, CD-1 lots, sub-area A of I-2.
- **Generators that do not fit** at the size Ratios settles on: 288 Vancouver and 980 Edmonton lots (flagged by the tool; the size is still counted).

## Results

| | Vancouver | Edmonton |
|---|---|---|
| Lots | 700 | 5,232 |
| Hold a data centre (Ratios MW ≥ 0.1) | 410 | 3,982 |
| Hold nothing | 290 | 1,250 |
| Unused share of buildable, lots that hold something (p10 / p50 / p90) | 3 / 6 / 22 % | 2 / 6 / 23 % |
| Unused m², p50 / p90 | 200 / 1,430 | 402 / 4,017 |
| Lot length (frame), p10 / p50 / p90 | 32 / 46 / 131 m | 40 / 92 / 220 m |
| Lot width (frame), p10 / p50 / p90 | 10 / 31 / 98 m | 16 / 62 / 172 m |
| Smallest lot that holds anything | 585 m² | 1,422 m² |
| Truck route: straight from a rear lane or street / lane along the rear | 71 / 339 | 127 / 3,854 |
| No street or lane at the rear or sides (dock needs a drive from the front: flagged) | 95 | 2,240 |
| Generator yard deeper than the test lots' (noise not checked) | 171 | 2,149 |

Share of lots that hold something, by lot size (median MW where they do):

| Lot | Vancouver | Edmonton |
|---|---|---|
| < 500 m² | 0 / 108 | 0 / 375 |
| 500–1,000 m² | 27 / 142 (0.5 MW) | 0 / 292 |
| 1,000–2,000 m² | 94 / 138 (1.1) | 17 / 437 (0.2) |
| 2,000–5,000 m² | 137 / 153 (3.6) | 1,215 / 1,366 (2.5) |
| ≥ 5,000 m² | 152 / 159 (14.2) | 2,750 / 2,762 (15.2) |

## Reading

- On most lots the one rectangle wastes little (median 6 % of the buildable area); one lot in ten wastes over a fifth. Those are the irregular lots (like 339 1st Ave E) where the section 5 rule sheet (leftovers become yards, plant on awkward ground) matters.
- More than half the Edmonton lots that hold something (2,240 of 3,982) have no street or lane at the rear or sides: the inside dock then needs a drive from the front, which the layout does not draw. That is the largest open design question the sweep shows.
- Over half of the Edmonton lots that hold something have a generator yard deeper than any test lot's: generator noise needs a source before these sizes are trusted.

Earlier run (lenient density, no truck lane): 531 Vancouver and 4,063 Edmonton lots held something; smallest Vancouver lot 407 m²; median unused share 7 % / 6 %.
