# Ground sweep, 7 Nov 2026 (WORKLIST 3): what the one-rectangle fit leaves unused

Run: `checks/tests/sweep_ground.js` (the lighter run: no 3D, no screenshots, 4 pages), commit 77c385f, after the Clark Dr fixes (12b8c79).
All 5,932 lots in data-centre zones in the tool's tiles: Vancouver 700 (I-2 641, I-3 32, FC-2 26, I-1C 1), Edmonton 5,232 (IM 2,827, BE 1,930, IH 375, EIB 69, EETC 11, EIM 8, EETM 5, EETIM 5, EETL 2).
326 s in all (median 0.16 s a lot); no errors, no page errors. Per-lot output stays outside the repo (Edmonton outlines are Altalis data); only totals below.

## Weaknesses first

- **Unused ground** = buildable area (inside the yards) − the building's largest rectangle − the plant yard − an outside loading strip. Programs are not placed, so this is ground the one-rectangle fit cannot use, not ground that stays empty in a design.
- **Defaults only:** Architecture's Ratios defaults on a new building; no typology, no picks. Each lot's own set-up choices are not tried.
- **Optimistic sizes:** the size test passes a footprint that holds the smallest floor a size could need (290 m² per MW ÷ 0.72, the most optimistic density). Stricter density lowers the MW and raises "nothing fits".
- **Not measured:** the leftover's shape (slivers vs usable yards), truck access to the dock (unreachable on all four test lots), noise beyond what the set-up checks, CD-1 lots, and sub-area A of I-2.
- **Generators:** 146 Vancouver and 773 Edmonton lots report generators that do not fit their plant yard at the size Ratios settles on (the tool flags them; the size is still counted).

## Results

| | Vancouver | Edmonton |
|---|---|---|
| Lots | 700 | 5,232 |
| Hold a data centre (Ratios MW ≥ 0.1) | 531 | 4,063 |
| Hold nothing | 169 | 1,169 |
| Unused share of buildable, lots that hold something (p10 / p50 / p90) | 3 / 7 / 23 % | 2 / 6 / 25 % |
| Unused m², p50 / p90 | 137 / 1,308 | 420 / 4,217 |
| Unused m², all lots that hold something | ≈ 443,000 | ≈ 10.7 million |
| Lot length (frame), p10 / p50 / p90 | 32 / 46 / 131 m | 40 / 92 / 220 m |
| Lot width (frame), p10 / p50 / p90 | 10 / 31 / 98 m | 16 / 62 / 172 m |
| Smallest lot that holds anything | 407 m² | 1,422 m² |

Share of lots that hold something, by lot size (median MW where they do):

| Lot | Vancouver | Edmonton |
|---|---|---|
| < 500 m² | 10 / 108 (0.2 MW) | 0 / 375 |
| 500–1,000 m² | 105 / 142 (0.3) | 0 / 292 |
| 1,000–2,000 m² | 120 / 138 (1.1) | 31 / 437 (0.2) |
| 2,000–5,000 m² | 144 / 153 (4.2) | 1,280 / 1,366 (3.2) |
| ≥ 5,000 m² | 152 / 159 (15.7) | 2,752 / 2,762 (16.9) |

## Reading

- On most lots the one rectangle wastes little (median 6–7 % of the buildable area); one lot in ten wastes a quarter or more. Those are the irregular lots (like 339 1st Ave E) where the section 5 rule sheet (leftovers become yards, plant on awkward ground) matters.
- Edmonton lots under about 1,400 m² hold nothing with the defaults; in Vancouver, lots from about 400 m² do (small, at 0.2–0.3 MW). Why Edmonton's small lots fail (setbacks, B139 distances, loading) is not broken down here (?).
