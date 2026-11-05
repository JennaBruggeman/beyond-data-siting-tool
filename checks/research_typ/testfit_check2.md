# Test fit check 2: E06B, V339, V1330, V8238 (4 Nov 2026)

Second, independent check of the four emergency-hub boards (`whitemock/project/TestFit_EH_<site>.dc.html`, scratchpad) against `testfit_emergency_hub.md`, `testfit_lots.md` and `code_checklist.md`. Boards not edited.

**Method (our arithmetic).** Own parser of each plan's SVG (scratchpad `chk2/`): scale from the scale bar; rooms = tinted blocks; doors = the white 0.9 m gaps; exits = stair blocks, the exit passage, door gaps in the building outline; secure zone = blocks inside the dashed secure line. Travel on a 0.25 m grid, 4-way steps, walls block except at doors (same proxy as the boards; racks not modelled). Storeys aligned by the lot outline. Code text read from `data/raw/codes/vbbl2025_v1.txt` (3.4.2.3–3.4.2.5).

**Code reading used.** 3.4.2.3.(1): least distance between 2 exits = ½ the max diagonal **of the floor area** (the storey, not a program zone); need not exceed 9 m where the floor area has a public corridor; not less than 9 m otherwise. **There is no ⅓-with-sprinklers rule** (that is the US IBC; ⅓ in NBC is 3.3.1.5.(2), doors from a room). 3.4.2.3.(2): exemption when a fire separation splits the floor area ≥ ⅓ each side and exits are only reached from each other through it.

## E06B, 64 Airport Rd NW (BE)

| Item | Board claims | Measured | Verdict |
|---|---|---|---|
| Room areas vs list | list sizes | all 79 blocks within 3 % of the list; blocks tile 2,808 / 1,598 m², no gaps or overlaps | OK |
| Group table | hall 2,335; support 592; refuge 327; clinic 356; circulation 749 | 2,336 / 592 / 327 / 356 / 749 | OK |
| Plant group | 263 m², "yard units, roof chillers, heat hub, mech room" | 263 = yard units + ETS + mech room; the 5 roof chillers (143 m²) are not in it | WRONG (caption) → **FIXED**: 406 m² incl. chillers |
| Public rooms → lobby, 2 exits, outside secure line | all | all reach the lobby; clinic 4 exits, refuge 6 | OK |
| DC rooms → own exits | L1 8, L2 2 | L1 8, L2 2 | OK |
| Worst travel | L1 44.7, L2 38.9 m | L1 44.4 (DC lockers → S1), L2 38.9 | OK; 0.6 m margin (racks ?) |
| Exit separation | per zone, ≥ ½ zone diagonal | L1 has a public corridor → 9 m; all pairs ≥ 9 m. L2 no public corridor: 54.9 ≥ 31.1 | OK |
| Corridor widths | public 2.0, secure 2.4 | clinic, refuge 2.00; secure, service 2.40; secure passage 3.5 | OK |
| A-2 / F-2 walls (Table 3.1.3.1, 2 h) | "2 h along the refuge and lobby" | A-2 touches F-2 at lobby, lobby WC, public janitor, first aid, refuge WCs and the warming shelter; the shelter also touches the **guard point and DC staff vestibule** (DC rooms outside the secure line) | ? |
| F-2 over A-2 | none | none | OK |
| Yards | street 4.5, others 0 | street 4.46 m (0.04 m, drawing tolerance); others in | OK |
| Plant enclosure fence | inside the lot | transformer fence runs **0.39 m past the west lot line** (3.5 m² on the neighbour) | WRONG → **FIXED**: pads 0.6 m east, fence 0.21 m inside |
| FAR | 4,357 m² ÷ 4,284 = 1.02 | drawn 2,808 + 1,598 = **4,407** → 1.03 ≤ 1.6 | WRONG figure, still passes → **FIXED**: 4,407, 1.03 |
| Wet over hall | none | nothing wet over either hall storey; chillers over the hub | OK |
| Generators · transformers to building | 2.7 · 14.1 m | 2.74 · 14.14 m | OK |
| Loading | 1 space 9.0 × 3.0 m | 1 bay 10.1 × 3.4 m inside the building; only a 0.9 m door drawn (truck door not drawn) | OK |
| Fence 1.9 m · height | claims | not shown in plan | ? |

## V339, 339 1st Ave E (I-3)

| Item | Board claims | Measured | Verdict |
|---|---|---|---|
| Room areas vs list | list sizes | all blocks within 3 %; tile 1,311 / 1,311 / 725 m² | OK |
| Group table | hall 947; support 714; refuge 323; clinic 384; circulation 915 | 948 / 714 / 323 / 384 / 915 | OK |
| Plant group | 166 m² incl. roof chillers | 166 excludes the 3 roof chillers (86 m²) | WRONG (caption) → **FIXED**: 252 m² |
| Public rooms → lobby, 2 exits | all | all reach the lobby; refuge ≥ 5 exits without the lobby; clinic L2 S1, S3 | OK |
| DC rooms → own exits | L1 7, L2 2, L3 2 | 7 / 2 / 2 | OK |
| Worst travel | 24.0 / 31.1 / 31.2 m | 24.1 / 31.1 / 31.1 | OK |
| Exit separation | ≥ ½ zone diagonal | all pairs ≥ 9 m where a public corridor; L3 32.1 ≥ 19.4 | OK |
| Corridor widths | 2.0 / 2.4 | 2.00 / 2.40 | OK |
| Separations | 2 h A-2/F-2 at L1; refuge under clinic 1 h; no F-2 over A-2 | confirmed. L2 lift lobby touches the secure corridor: 2 h if the lift lobby counts as A-2 | OK / ? |
| Yards | front 0.6, sides 7.6, rear 3.1 | north side: **7.38 m** at the rear corner (lot line not parallel to the wall); 4.0 m² past the tool's yard line | WRONG → **FIXED**: north wall to v 15.15, inside |
| FSR · hub cap | 3,347 · 1,168 | 3,348 · 1,172 | OK |
| Height | 23.0 − 5.03 = 17.97 m | arithmetic right; grades ? | OK / ? |
| Wet over hall | none | none (ETS is under the hall, not over) | OK |
| Generators to dock doors · transformers | 5.7 · 15.9 m | 5.69 · 15.93 m | OK |
| Plant enclosure | 1.9 m fence | 11.3 m off the lot line, inside the buildable area | OK (height ?) |
| Loading | 2 Class B | 2 × 10.2 × 3.4 m; count from the data centre only, hub uses not counted | OK / ? |

## V1330, 1330 Glen Dr (I-2)

| Item | Board claims | Measured | Verdict |
|---|---|---|---|
| Room areas vs list | list sizes | all within 3 %; tile 457 / 601 / 601 m² | OK |
| Group table | hall 252; support 244; refuge 197; clinic 380; circulation 556 | 252 / 244 / 197 / 380 / 556 | OK |
| Plant group | 87 m² incl. roof chillers | 87 excludes the 2 roof chillers (57 m²) | WRONG (caption) → **FIXED**: 144 m² |
| Building area | 457 m² | **601 m²** (storeys 2–3 overhang the truck drive) | WRONG; no limit affected → **FIXED**: 601 m² |
| Public rooms → lobby, 2 exits | all | all; some refuge rooms reach a second exit only through the lobby | OK |
| DC rooms → own exits | L1 3, L3 2 | L1 3 (S2, shipping door, loading-space door); L3 2 | OK |
| Worst travel | 22.1 / 23.4 / 29.0 m | 21.6 / 23.4 / 28.9 | OK |
| Exit separation | L3 18.9 ≥ 17.4 | 19.0 ≥ 17.4 (½ of 34.7 m) | OK |
| Stair discharges (3.4.2.3.(4)) | S1–S3 29.0; S2–S4 23.6 | 29.0; 23.6 | OK |
| Corridor widths | 2.0 | 2.00 | OK |
| Separations | 2 h around L1 DC rooms; refuge under clinic 1 h; clinic under hall none | A-2/F-2 contact only refuge corridor ↔ secure corridor, DC janitor; no F-2 over A-2 | OK |
| Yards | front 0, sides 0, rear 3.1 | rear 16.8 m; all inside | OK |
| FSR · non-industrial · clinic cap | 1,659; 871; 512 ≤ 552 | 1,658; 871; 552 | OK |
| Height | 21.3 − 4.30 = 17.0 m; roof screen over 18.3 (open) | arithmetic right | OK / ? |
| Wet over hall | chillers over support only | roof chillers do not overlap the hall | OK |
| Generators · transformers | 3.0 m to building and side lot line | 3.00 · 3.00 m | OK |
| Loading | 1 of 2 (fail) | 1 bay 10.2 × 3.4 m | fail confirmed |

## V8238, 8238 Fraser St (I-2)

| Item | Board claims | Measured | Verdict |
|---|---|---|---|
| Room areas vs list | list sizes | all within 3 %; tile 1,076 / 1,076 / 574 m² | OK |
| Group table | hall 1,057; support 492; refuge 305; clinic 251; circulation 592 | 1,058 / 492 / 305 / 251 / 592 | OK |
| Plant group | 129 m² incl. roof chillers | 129 excludes the 3 roof chillers (86 m²) | WRONG (caption) → **FIXED**: 215 m² |
| Clinic exits | 2, "none through another program"; lobby "not counted as an exit" | clinic's 2nd exit is the **lobby street door** (via public corridor and shared lobby); without the lobby only the exit passage | ? (allowed as access to exit, but the board's wording is wrong) → **FIXED**: wording corrected, 3.4.4.2 re-read |
| DC exits, storey 1 | 3, 14.5 ≥ 10.6 m | S2 plus the **two loading-space doors**; truck doors not drawn. If those are overhead doors, only S2 (+ portal to vestibule) | ? → **FIXED**: own exit door via a DC exit corridor; truck doors not counted |
| Exits, storey 2 | 3.4.2.3.(2) | 23.4 m < 33.8 m. S1 opens on the support side, S2 only via the hall; hall 529 / support ≈ 502 m², each ≥ ⅓ → (2) holds on our reading | ? |
| Worst travel | 42.5 / 44.5 / 24.0 m | 42.6 / 44.6 / 24.1 | OK; 0.4 m margin on L2 |
| Corridor widths | public 2.0–2.4; exit passage 1.13 m | 2.0–2.41; passage 1.13 ≥ 1.1. Stair doors open into the 1.13 m passage (swing ?) | OK / ? |
| F-2 over A-2 (2 h) | "2 h floor over the refuge and shelter" | F-2 is also over the shared lobby, public corridor, WCs, first aid, staff office, cot store: whole floor over the hub needs 2 h | ? (wording) |
| Yards | 3.1 m at both street ends | Fraser St end: **2.91 m** at one corner (0.19 m into the yard, 1.5 m²) | WRONG → **FIXED**: street face to u −46.47, inside |
| FSR · non-industrial · clinic cap | 2,725; 835; 335 ≤ 907 | 2,726; 836 | OK |
| Height | 21.6 − 3.39 = 18.21 m (0.09 m spare) | arithmetic right; grades ? | OK / ? |
| Wet over hall | none | none | OK |
| Generators · transformers | 8.2 · 1.0 m | 8.14 · 1.00 m | OK |
| Plant enclosure | "no fence on the lot lines" | generator fence sits in the local-street 3.1 m yard (11.4 m², 1.5 m off the lot line); cap there if it is a front yard ? | ? |
| Loading | 2 Class B, aisle in the yard | 2 × 10.2 × 3.4 m inside the building; straight approach to bay 1 overlaps the generator fence by ≈1.1 m | ? |

## Real problems

- **E06B:** transformer enclosure fence crosses the west lot line by 0.39 m. FAR figure 4,357 m² should be 4,407 m² (still 1.03 ≤ 1.6). **FIXED 4 Nov:** pads moved 0.6 m, fence 0.21 m inside the lot (pads to building now 13.5 m, fuel truck 7.3 m); FAR 4,407 m², 1.03.
- **V339:** building 0.22 m into the 7.6 m north side yard at the rear corner (lot line not parallel). "Yards: pass" is wrong as drawn. **FIXED 4 Nov:** north wall pulled back 0.25 m on all storeys; FSR 3,320 m², width 30.6 m; travel 24.0 / 30.9 / 30.9 m.
- **V8238:** building 0.19 m into the 3.1 m Fraser St yard at one corner. Storey-1 data-centre exits lean on loading-bay doors. Clinic's second exit runs through the shared lobby, against the board's own wording. 2 h floor needed under all of storey-2 F-2, not just refuge and shelter. **FIXED 4 Nov:** street face pulled back 0.19 m; DC exit corridor to its own exterior door (S2 and that door 12.7 m apart; truck doors not counted; transformer fence trimmed to clear it, side clearance ?); clinic wording corrected (lobby route is access to exit on the first storey, 3.4.4.2.(1) not applicable; our reading). 2 h floor wording **not changed** (not in the fix brief).
- **V1330:** building area is 601 m², not 457 m². **FIXED 4 Nov:** 601 m² (largest footprint).
- **All four:** the Plant group total leaves out the roof chillers, but its caption says they are in. **FIXED 4 Nov:** chillers added (E06B 406, V339 252, V1330 144, V8238 215 m²).
- **Exit separation basis:** the boards measure by program zone. The code measures by floor area, with the 9 m cap where there is a public corridor. All storeys still pass, but V8238 storey 2 passes only under 3.4.2.3.(2). The ⅓ rule in the older V339 row is 3.3.1.5.(2), not an exit rule.
- **Thin margins:** travel distance has 0.6 m to spare (E06B L1) and 0.4 m (V8238 L2). Height has 0.09 m (V8238).
- **Not checkable from the plans (?):** fence heights, wall ratings as built, roof heights, official grades, truck turning.

Check 2; geometry measured, not redrawn. Fixes applied 4 Nov 2026 (boards re-run; see `testfit_emergency_hub.md` and `testfit_lots.md`, "Check 2 fixes").
