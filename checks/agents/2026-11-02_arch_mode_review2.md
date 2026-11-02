# Architecture mode review 2 (2 Nov 2026)

Second review of tool/arch.js after the fixes for checks/agents/2026-11-02_arch_mode_review.md. Nothing was edited.

Runs: `_arch_run.js` with MW=1 on E06A, V339, E05 and CLARK (side by side), E06A and V339 (under hall), E06A and CLARK (own building). No page errors. Saving works in every run, including under the hall. Two scratchpad copies of the runner also dumped box extents, how much of each raised box has something under it, each secure preset, the overnight option, a refuge with no placement, and two resizes.

Old items: FIXED 16, PARTLY 9, CHANGED-DESIGN 1, NOT FIXED 2.
New: high 3, medium 5, low 10.

## Part A: the 28 items from review 1

| # | Status | Evidence |
|---|---|---|
| 1 | FIXED | Boxes keep their full size (73–91). Drawn area equals m² in every run (pool 2,131 = 2,131). Side effect: see N1. |
| 2 | PARTLY | There is now a height record (61–65, 85, 90), so boxes no longer collide. But a box's base is the highest top anywhere under it, and nothing checks what holds it up (N1). Roof plant counts as a floor to build on (N2). |
| 3 | FIXED | The under-hall box has `u`/`v` (72). `saved` = 2 in the under-hall runs. |
| 4 | FIXED | Shows as a note "outside the line at grade, with a 2 h floor between (a design choice)" (133). |
| 5 | PARTLY | `zoneMatch` (124–126). E05 (IM): refuge, pool and shelter now `bad`. The BE cap is applied only in BE (139). Still missing: I-1C "Social Service Centre only" passes as fully conditional. Fish farm `districts:'none'` gives `?` while the pool's "rezoning" gives `bad`. The I-2 office cap on the clinic is not checked (N9). |
| 6 | FIXED | The hall is drawn at `mid(dcTemp())` and labelled with the heat_temp range (280, 288). |
| 7 | FIXED | A grid search over the whole buildable area (80–88). E06A spa no longer lifted while the street band is free. |
| 8 | FIXED | With no placement chosen, a `q` flag and no box or rules (75). The space budget still counts its 175 m² (N11). |
| 9 | PARTLY | Overnight now gives a C note, not `bad` (140–141). The warming shelter still has no own-building option. No count of C programs, though the catalogue has only this one. The C separation shows nothing rather than `?` (N10). This review did not check the NBC 3.1.3.2 wording against the source. |
| 10 | FIXED | `dcTemp` reads `answers.inside` (154). "Direct" now means `t[1] <= d[0]`, with a "partly" band (155). |
| 11 | FIXED | At grade, not at grade and roof are enforced (76, 86). "Not at grade" applies only in I-3/FC-2 (97). The V339 clinic sits at 32 m. |
| 12 | FIXED | (a) Programs with no minimum are never shrunk and are named (236–239). (b) It loops. (c) `over = min(v−old, overrun)` (235). (d) There is a heat ceiling (240), but see N7. |
| 13 | PARTLY | In arch.js: lot line in `--line-2` (283), `.o` grey (163), warm end sand rgb(209,163,94) (259). In scene3d.js:153 and 164 the lot ring and the model's server footprint are still drawn in the accent in the arch 3D view; screenshots E06A_arr3d and E06A_explode show a red lot outline and a red dashed rectangle (N8). |
| 14 | PARTLY | Space and heat lines carry chips (193–194). Compare has no source row or chips. The footnote points to Arrange (256). Plan and section figures (°C, "height limit 16 m") carry no chip (N18). |
| 15 | CHANGED-DESIGN | Roof plant is now something programs stand on (62), not room taken out of the roof. E06A pool base 18.9 m = chiller tops (N2). `dist` treats one ring as inside another only if its first vertex is inside (109). Crossing rings with no vertex inside still give a distance above 0. |
| 16 | PARTLY | `secArea` is now the union, sampled on a 1 m grid (122–123). The suggested line is still separate islands (120–121, comment "it may be several"), though the text says "the tightest line". New false flag on CLARK (N4). |
| 17 | PARTLY | The vertical legs now step apart (`kx = right−6−4·(n−1−i)`, 290). Horizontal legs still cross blocks; E06A plan: the refuge leader runs across the hall. With about 8 labels the leftmost legs sit inside the lot's right edge. |
| 18 | FIXED | Keep-apart rules that are not checked are grouped in a `q` line (145–148). Rules of type `must near` and `prefer near` are still skipped silently (N14). |
| 19 | FIXED | "fire separation … ? (occupancy ?)" with `occ.src` (143). |
| 20 | FIXED | Uses `ftf.ground`. In Edmonton it says "Vancouver's I-2/I-3 ground-floor minimum, used here only as a drawing height" (216). |
| 21 | PARTLY | Line 216 lists the 2 m grid, proportions, the 3 m gap and storey height. Still not labelled: the 6-storey input cap (176), the 10 % / 10 m² step (228), the 0.95 free-area factor (78), the aspect list and the 6 m depth for the first proportion (80–81). |
| 22 | FIXED | The street-entrance check runs for the own building. The 3 m gap is kept on all sides, and a no-go block above stops stacking over it (77, 84–85, 90). |
| 23 | FIXED | Per-box `levels`, so multi-storey boxes show on every storey (94–95, 281). Roof and top boxes appear on their storey. The plan draws the secure line dashed and yard plant in grey (283). Rounding issue: N12. |
| 24 | FIXED | Unknown zoning is `q` and the box does not turn red (138). |
| 25 | NOT FIXED | `budgets` still uses only `lot × fsr[1]` (103). There is no I-2/I-3 1.00 FSR cap for non-industrial uses. CLARK: clinic resized to 6,000 m² with no message. |
| 26 | FIXED | `re()` clears `A.msg`; only resize keeps it (219, 227–228). |
| 27 | NOT FIXED | flow.js:148 still skips `social` in `arch`. Awaiting J.B.'s decision. |
| 28 | PARTLY | The Compare row has been added as `?` (255). The register entry arch_compare formula does not list it. |

## Part B: new bugs

### High

**N1. arch.js:85. Raised blocks float: nothing checks what is under them.**
- `base = max(top of every occupied cell under the footprint)`, and nothing requires the footprint to rest on anything. Share of each raised box with something directly under it:

  | Run | Box | Supported | Notes |
  |---|---|---|---|
  | E06A side by side | pool | 4 % | 46 × 46 m at 18.9 m, over a 20 × 19 m hall |
  | E06A under hall | clinic | 12 % | |
  | E06A own building | clinic | 59 % | |
  | CLARK | fish farm | 76 % | |
  | CLARK | pool | 1 % | |

- The header comment (43–45) says "nothing floats".
- Fix: accept a spot only if every grid cell under the footprint has a top within about 0.1 m of `base` (or the ground). Otherwise try the next spot. If no spot works, push `bad` ("does not fit at grade or on what is built; X m²").

**N2. arch.js:62. Programs are stacked on top of roof plant.**
- Roof plant goes into the height record as a floor to build on. The E06A pool and fish farm sit on the air-cooled chillers' tops (16–18.9 m).
- No source allows building over chillers, and the plant cannot work enclosed.
- Fix: treat roof plant as no-go to the sky (`[…,0,1e9,true]`). Add any sourced clearance; if there is none, add a `q` note.

**N3. arch.js:78. The "fits on one floor" test ignores the hall and the no-go areas.**
- `free = bl × bw` is the whole buildable rectangle. E06A: 63 × 61 m gives about 3,650 m², so a 2,131 m² pool "fits". In fact the largest free ground rectangle is about 23 × 61 m (about 1,400 m²).
- So no flag is raised, and the pool goes up onto the hall (and N1 leaves it floating).
- Fix: measure the largest free rectangle at grade, or let the grid search fail and then retry with more storeys. Flag "drawn over N storeys" as now.

### Medium

**N4. arch.js:130. False "Outside the secure line: plant yard" on Suggested (CLARK).**
- The clipped yard is a thin ring with zero-width slivers (8 vertices: 3089,2412 … 3010,2413 … 3054,2412 …). Its centroid (3056, 2411) is not inside the ring.
- So the suggested line, which contains the yard by construction, flags itself red.
- Fix: under `suggest`, treat the required parts as inside by construction. For other presets, test an interior sample point or several vertices, not the centroid.

**N5. register/formula_register.json `arch_placement`. The register still describes the old packer.**
- It says "street band, beside and behind the hall, storey by storey at 6.0 m, then on top of the hall".
- The new rules are not in the register: the 2 m grid, the base from the height record, the aspect list, the lowest-base-then-street order, the 0.95 factor, at / not-at-grade and the roof option.
- This breaks the "every move in the register and logic diagram" standard.
- Fix: rewrite the formula and coef, and rebuild the diagram data.

**N6. arch.js:134. Boxes at or above the hall roof are silently left out of "public inside the secure line".**
- `!(b.top && A.secure !== 'lot')` skips the check with no note.
- E06A pool (public, over the hall) raises no secure-line flag under Suggested or Hall wall.
- Fix: push a note "above the hall roof: treated as outside the line (a design choice)" with a source or `?`. Or test against the line in 3D.

**N7. arch.js:236–240. The heat ceiling runs after other programs were already shrunk for space.**
- If heat then pulls `q` back, the space given up by the others is not returned. Their sizes stay reduced for growth that never happened.
- The heat message also overwrites the space message.
- Fix: work out the heat ceiling first and cap `v`, then share space. Or keep the donors' sizes and roll them back.

**N8. scene3d.js:153, 164. Red in the arch 3D view for items that are neither selected nor flagged.**
- The lot ring and the model's server footprint are drawn in `C.acc`.
- Under the hall, the red server-footprint rectangle no longer matches the hall as drawn (widened at arch.js:54).
- Fix: in `arch()`, hide these or redraw them grey.

### Low

**N9. arch.js:124–126. Zoning parse gaps.**
- "I-1C Social Service Centre only" is read as fully allowed.
- `districts:'none'` gives `?`, not "rezoning", for the fish farm in Vancouver.
- The I-2 clinic office cap ("≤ greater of 235 m² or 33.3 %") is in the data but not checked.
- Fix: carry an "only <use>" clause into the message. Treat 'none' as not listed. Check the I-2 office cap.

**N10. arch.js:136–141. Overnight shelter gaps.**
- The Vancouver line still reads "conditional" for the overnight option, though the catalogue says "overnight: no listed use ?". It should be `q`.
- No separation figure for C: show "separation from F-2 ?" with sources.

**N11. arch.js:101–103. Budgets count programs that are not drawn.**
- Examples: the refuge with no placement chosen, and the V339 fish farm ("no room left … not drawn").
- Fix: count drawn boxes only, or show "not drawn: X m²" separately.

**N12. arch.js:94. Storeys come from rounding to 6 m.**
- `level = round(base/6)` and `levels = round(h/6)`. A 3-storey pool (3 × 3.5 = 10.5 m) is listed on 2 storeys.
- Boxes at 18.9 m and 22.4 m land on storey 4 and 5, against a hall top of 16 m.
- Fix: build each box's storey list from its own storey height, and map it to plan levels by height.

**N13. arch.js:268, 281. `A.storey` is not reset when the levels change.**
- The plan can show a storey that no button names, or show it empty.
- Fix: clamp it to `P.levels`.

**N14. arch.js:145. `must near` and `prefer near` rules are neither checked nor listed.**
- Example: the refuge "must near street".
- Fix: add them to the grouped "not checked" line.

**N15. arch.js:114. `plantRings` writes `r.z` onto the model's own plant rings.**
- This is a side effect on shared state.
- Fix: return `{ring, z}` objects.

**N16. scene3d.js:359–361. Explode lifts upper boxes out of the frame.**
- `level × 14 m` on top of base. In E06A under hall, the explode screenshot shows only the hall, the refuge and the shelter.
- Fix: reframe the camera to the exploded extents.

**N17. arch.js:54–57. Under the hall: three problems.**
- The widened hall is not tested against the yard, loading or plant no-go areas.
- Its ground floor beyond the refuge's 175 m² is empty, so the hall floats over a void.
- The flag reads "1 floors".
- Fix: test the widened hall against the no-go areas. Draw or flag the rest of the ground floor. Fix the plural.

**N18. arch.js:288, 283, 250–253. Figures on screen with no chip and no `?`.**
- Plan and section: "58 °C" and "height limit 16 m". The legend says "(sourced)" but names nothing.
- Compare: the floor and heat figures.
- Fix: add a sources line under the drawing (supply_C sources per labelled block, zoning for the height limit), and a sources row in Compare.

**N19. arch.js:203, 214. Red used for a count.**
- `<span class="k">` (`--accent-2`, a pale red) is used for the "N picked" count, which is neither selected nor flagged.
- Keep it for "N flagged" only.

## Checked and correct

- No total score and no ranking. Compare says "No row is a source-backed score".
- Heat need and offered are unchanged (993–1,027 of 3,852–5,913 MWh/yr at E06A).
- The heat bar is grey and the heat scale's warm end is sand, clear of the accent.
- Red in arch.js is used only for `bad`, `sel` and pressed buttons.
- Hatched `?` blocks are where there is no supply temperature.
- Leaders are right-angled and the labels sit right of the drawing.
- All four secure presets run.
- E05 IM zoning is now caught.
