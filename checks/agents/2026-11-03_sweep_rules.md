# Sweep: rules slice (3 Nov 2026)

All four templates. 27 lots, each opened as a worked example (findFit). Then 43–56 probes per lot through `BD.S.answers`, each checked two ways: against `BD.setupProblems()`, and against our own geometry and limits. UI tests on 8 lots (V09, E05, CLARK, E123, HAST, VI2S, VFC2, EBEL) in each template.

What the probes covered: storeys 3/6/12/40, "With approval", sizes above the largest fit, 40 MW, plant on the roof, in the yard and split, generators on the roof, in the yard and none, roof generators at and above the fuel cap (N+1 and 2N), seen/screen/enclose/indoors with each cooling choice, existing building (whole, and each floor), shared new building, ends swapped. The three options were checked too.

- Script: `checks/tests/sweep_rules.js`.
- Raw results: `/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/sweep/rules/results.json`. EIHL noise was re-run with stale levels excluded: `rerun_noise.json` in the same folder.
- Failure screenshots: the same folder.
- Ad-hoc probes: `/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/sweeprules_dbg/` (carry.js, fence.js, opts.js, floorunset.js).
- No tool files edited. No commits.

## What held

- 0 page errors and 0 console errors on all 27 lots.
- **Height:** "Set the storeys" at 3, 6, 12 and 40 is clamped on every new-building lot. No set-up went above the outright height, and "With approval" stays within the approval height.
- **Size:** anything above the largest fit is blocked on every lot.
- **Fuel:** over 20,000 L of roof fuel, worked from the load, is always blocked. The largest fit stops at 4.0 MW with roof generators.
- **Towers and hybrids:** never closer than 3 m to the lot line (NBC 6.3.2.15.(5)).
- **Noise:**
  - Every noise block reaches `setupProblems`.
  - Every required mitigation is named in `m.notes`.
  - No neighbour level written by the check is over its night limit without a block.
- **BE:** "seen" stays at screen.
- **UI:** in all four templates on the 8 lots, these refused to go on: Next, the deck's last card ("What fits here"), the residents' card button, and the step bar.

## Ways past a block

1. **Changing template** jumps forward past the block (bug 5).
2. **Clicking another lot** keeps the old answers, so a ground-floor lease carries into I-2/I-3/FC-2, where no rule catches it (bug 2).
3. **The report and Three options** draw option C, which breaks the floor rule, because the report skips the floor check and Three options checks nothing (bug 3).
4. **Required yards** are not tested against the real lot lines, so the fence, the hall and yard plant sit in yards on irregular lots with nothing to block (bug 1).
5. **Roof fuel** is checked from the load, not from what the tanks of every set hold (bug 4, ?).

## Bugs, most severe first

| # | Template / step | Lots | What happens | file:line | Severity | Reproduce |
|---|---|---|---|---|---|---|
| 1 | all: Set up, What fits, the 3D (fence, plant, hall outline) | **V339** (I-3), **VM2L**, **EIHS**, EMU; 0.3–1.0 m on E05, E06A, E06B, EBEL, VM1; on notched lots (?) CLARK, V09, VI2L, VFC2, E123, EDC2, EIHL | Required yards are a rectangle set in from the lot's bounding rectangle, then clipped to the lot. They are not set in from the real lot lines. Where a lot line is angled, the fence, the hall and the yard plant sit in a required yard, and the set-up passes. **V339:** the 2.4 m fence stands on the angled side lot line, 7.6 m into the 7.6 m side yard (s. 10.10.3 caps fences there at 1.9 m). The 3D key still says it "stands on the line of the required yards … not on the lot line". Generators sit 0.6–0.9 m into the side yard; with the ends swapped, the hall sits 7.5 m into it. **VM2L:** the fence sits 3.1 m into the rear yard; generators 1.4 m. **EIHS:** the hall sits 1.2 m into the 3 m street setback, the fence stands on the front line, and existing-building generators sit 0.46 m into it. **Notched lots:** the fence or hall stands up to 3.1 m from an inner edge facing the rear or front. That counts only if such edges are rear or front lot lines (?). | site.js:132, 143–147 (`yardRect`, `inset` from `rectW` of the frame); scene3d.js:301 (`fenceLine`), 303 (key text); plant.js `pack` (region = clip of the inset) | high | V339 worked example. What fits, Secure line On. Screenshot `V339_V339_fence_side_yard.png`. `fence.js` gives the deepest fence point 7.6 m into the side yard, and `setupProblems()` is []. |
| 2 | all: Set up (deck), What fits, everything after | via UI: VI1C → V09; via answers: V09, CLARK, VI2S, VI3S | A leased **ground floor** in I-2/I-3/FC-2 is not blocked. The ground-floor rule is applied only to a whole existing building, and `setupProblems` has no ground-floor rule. The deck greys Ground out, but answers are never reset when another lot is clicked. **UI path:** on VI1C (I-1C), pick Lease, then Ground floor. Click V09 (I-3). The floor card shows "✕ Ground floor · Not possible here · … Nothing changes: the site stays as set up", yet the set-up stays on the ground floor. "Use the largest size that fits (1.9 MW)" then walks on to What fits and Real buildings with the data hall at grade. | engine.js:159 (`A.extent!=='part'`); site.js:193 (`setupProblems`: no ground rule); decide.js:105, 149; index.html:476 (answers kept across lots) | high | `carry.js` on VI1C: `afterFit.problems` [], `after2.step` 'prec', `floor` 'ground'. Screenshot `VI1C_carry_ground.png`. |
| 3 | full, community: Three options; report (HTML, PDF) | option C: E05 (28.8 MW, floor holds 27.5), E06A 8.6, E06B 8.0, VM1 19.1, EIHS 15.5, EDC2 3.4; option A: E123 1.6 MW | **Option C** (liquid cooling) at the largest size needs more floor than the building holds. Its dry coolers take more indoor plant floor. The report still draws it as a plan, because report.js and report3.js call `setupProblems(true)`, which skips the floor check. The Three options step checks nothing: on E123, option A (1.6 MW, chillers don't fit on the roof) appears there without a word. The report does name option A ("Not drawn …"). | report.js:109, report3.js:288 (`setupProblems(true)`); engine.js:546 (`optionsView`, no check); engine.js:363 (`optionSet` sizes C at `fitMax` worked out with air cooling) | high | E05: `opts.js` gives C `full` = ["28.8 MW … (up to 27.5 MW)"] and `noFloor` = []. The report has no "Not drawn". |
| 4 | all: What fits, Set up (roof generators) | as opened: VI2L (4.0 MW), EDC2 (3.4 MW); also E05, E06A/B, VM1, VM2L, VIC2, EBEL, EIHS, EDCX, CLARK (split) at their roof-generator fits | The NFC 4.3.13.4.-B check counts the fuel the load burns in 12 h. It does not count the fuel stored in every set's sub-base tank, spares included. At 4.0 MW: 5 sets of 2 MW (N+1) hold 31,560 L, and 2N (8 sets) 50,496 L, if each tank holds 12 h at the set's rating. The tool passes 19,567 L. EDC2 as opened: 4 sets, 25,248 L. (?) The tool's own KD1000 basis is "with the 12 h tank" (G6-154). The KD2000 tank size is not in the tool. Whether every set's tank is full needs a source. | site.js:182–183; plant.js:33 (`gN` sets, not counted in fuel) | medium (high if confirmed) | VI2L worked example. `BD.model().plant.s.gN` = 5; `m.fuel.L` = 19,567. |
| 5 | Changing template while blocked | all 8 UI lots | Changing template on a step the new template skips jumps **forward** past the block. `go()` steps over skipped steps before anything checks the block. Blocked at Real buildings → Residents lands on **Heat**. Blocked at Heat → Architecture lands on **Programs**, and the 3D draws the hall massing and plant at a size that does not fit. Blocked at Programs → Engineering or Civic lands on **Two cities**. The block note stays and Next stays disabled, so the report is not reached. Its Back button reads "Over time", a step Architecture skips (low). | flow.js:154 (SKIP loop in `go`); tiers.js:79 (`go(BD.flow.i)` on change) | medium | Any lot: walk to Real buildings and set `A.mw` to twice the largest fit plus 1. Switch "Showing" to residents: `F.steps[F.i].k` = 'heat', `F.stuck` true. Screenshot `E123_tierskip.png`. |
| 6 | all: Set up | FC-2 (VFC2), I-2 (CLARK, VI2S, VI2L), IM/BE (E05, EIM, E06A/B, EBEL), IH (EIHS) | Where a hard rule hangs on a fact the tool has not read, the most permissive reading is used, with no block and no named condition. **FC-2:** height 22.9 m in every sub-area (10.7 m in C1, C2, D). **I-2:** "not in sub-area B" is the default (sub-area B has 0.6/7.6/3.1 m yards and a 61 m cap). **I-2 side yards** beside RM/R sites: none used. **IM/BE:** 6 m next to non-industrial or residential zones is not applied, though the neighbours' zones are loaded for the noise check. **IH:** minimum site 1.0 ha (EIHS, 4,294 m², passes; whether it binds an existing lot ?). All are stated in the clause table. | site.js:20 (FC-2), 254 (sub-area B default), 23 (IH), 24–25 (IM, BE) | medium | VFC2: `BD.model().Z.hOutright` = 22.9. |
| 7 | all: Set up, What fits | every Vancouver new building with roof plant | Roof plant, plus the 4.9 m noise screen the check may require, rises above the outright height. In Vancouver that needs the Director of Planning's discretion (s. 10.1.1: "may"). It is shown as a clause and never named as a condition of the set-up (?). | site.js:27 (ROOFNOTE); scene3d.js:180 | medium | CLARK: roof units 2.9 m plus a 4.9 m screen on an 18.0 m building. |
| 8 | full: People; 3D neighbour hover | EIHL (found), any lot | Noise levels per building (`NLEV`) are never cleared. A building outside the current check keeps the level from an earlier set-up, e.g. 51.9 dBA at 1,360 m from a 40 MW probe. | engine.js:445, 502 | low | EIHL: run the 40 MW probe, then the opened set-up, and read `BD.eng.noiseLevel(b)` for a far building. |
| 9 | all: Set up (Lease) | code read; not confirmed in the 3D | "Lease space" sets no floor. The deck shows "Upper floor", but scene3d.js:160 draws the leased floor at `A.floor\|\|'ground'`, and engine.js:262 then has no floor (no upper-storey fuel note). | scene3d.js:160 vs decide.js:52, scene3d.js:424 | low | V09: pick Lease. `A.floor` is '' while the card shows Upper floor. Screenshot `V09_lease_floor_unset_3d.png`. |
| 10 | all: 3D, plant | VI2L (blocked set-ups only) | Clipping a concave lot by the yard rectangle can bridge outside the lot. Roof generators were drawn outside the lot. | site.js `clip` (Sutherland–Hodgman needs a convex subject) | low | VI2L, plant roof, generators on the roof, 40 MW. |
| 11 | arch: Arrange | Vancouver lots with yards | The "Lot line" secure-line preset puts the line on the lot line, in required yards, with no s. 10.10.3 note. Whether the Architecture secure line is the 2.4 m fence (?). | arch.js:142 | low | Code read. |
| 12 | Switching to residents | all 8 UI lots | The residents' card resizes silently (e.g. 4.8 → 1.9 MW), so a block disappears with no note that the size changed. | tiers.js:89–90 (`sizeSet`) | low | Block at Set up in full, then switch to residents: `A.mw` changes. |

Counts: 3 high, 4 medium, 5 low.

## Lots (27; golden lots first)

| Key | Lot | Zone | Lot m² | Buildings | Largest fit (MW) | As opened (built / plant / gens / vis) | Probes (blocked) |
|---|---|---|---|---|---|---|---|
| V09 | 275 1st Ave E | I-3 | 7,865 | 7 | 1.9 | new/roof/yard | 52 (25) |
| E05 | 8803 Stadium Rd NW | IM | 8,826 | 6 | 28.8 | new/roof/yard/indoors | 51 (25) |
| CLARK | 1425 Clark Dr | I-2 | 5,882 | 3 | 2.6 | new/roof/yard | 56 (26) |
| E123 | 12603 123 Street NW | IH | 14,565 | 10 | 3.2 | new/split/yard | 52 (26) |
| V339 | 339 1st Ave E | I-3 | 4,503 | 0 | 1.9 | new/roof/yard | 46 (24) |
| E06A | 74 Airport Rd NW | BE | 4,569 | 0 | 8.6 | new/roof/yard/indoors | 45 (25) |
| E06B | 64 Airport Rd NW | BE | 4,284 | 0 | 8.0 | new/roof/yard/indoors | 45 (25) |
| HAST | 555 W Hastings | DD (existing, upper floor) | 6,294 | 10 | 2.5 | existing/roof/roof/indoors | 43 (27) |
| VI1S | 116 8th Ave W | I-1 | 235 | 1 | 0.1 | new/roof/none/indoors | 49 (34) |
| VI1L | 2450 Ontario St | I-1 | 3,072 | 1 | 1.9 | new/roof/yard | 52 (25) |
| VI1C | 360 2nd Ave W | I-1C | 1,666 | 3 | 0.9 | new/yard/yard | 51 (33) |
| VI2S | 1250 Frances St | I-2 | 310 | 1 | 0.6 | new/roof/none/indoors | 49 (35) |
| VI2L | 1940 Glen Dr | I-2 | 27,468 | 2 | 4.0 | new/roof/roof/indoors | 44 (33) |
| VI3S | 670 Industrial Ave | I-3 | 1,109 | 2 | 0.1 | new/roof/yard/indoors | 50 (35) |
| VFC2 | 1220 Station St | FC-2 | 3,849 | 3 | 1.9 | new/split/yard | 45 (26) |
| VM1 | 1250 45th Ave E | M-1 | 6,924 | 2 | 19.1 | new/roof/yard/indoors | 51 (25) |
| VM2L | 570 Kent Ave South E | M-2 | 45,424 | 4 | 16.3 | new/roof/yard | 52 (22) |
| VIC2 | 1620 5th Ave W | IC-2 | 6,987 | 10 | 6.7 | new/roof/yard | 56 (26) |
| VIC3X | 2050 Scotia St | IC-3 (existing) | 5,021 | 4 | 1.9 | existing/roof/yard | 44 (18) |
| EBEL | 2010 76 Avenue NW | BE | 50,639 | 2 | 12.4 | new/roof/yard/screen | 51 (22) |
| EIM | 7282 68 Street NW | IM | 4,966 | 2 | 2.8 | new/roof/yard | 52 (26) |
| EIHS | 9565 60 Avenue NW | IH (under 1 ha) | 4,294 | 1 | 15.5 | new/roof/yard/indoors | 51 (26) |
| EIHL | 550 Hayter Road NW | IH | 164,415 | 17 | 11.1 | new/roof/yard | 50 (26) |
| EMU | 10323 78 Avenue NW | MU | 9,366 | 1 | 2.6 | new/roof/yard/screen | 51 (26) |
| EDC2 | 12431 Stony Plain Road NW | DC2 | 928 | 1 | 3.4 | new/roof/roof/indoors | 51 (30) |
| EDCX | 5904 51 Avenue NW | DC (existing) | 33,835 | 4 | 5.7 | existing/roof/yard/screen | 50 (16) |
| ECMV | 10550 102 Street NW | CMUV (existing) | 17,501 | 2 | 0.8 | existing/roof/yard/indoors | 43 (30) |

Notes on the method:

- **Yard check:** each lot edge gets the yard the tool's own frame gives it (front at −L/2 unless the ends are swapped; side along v). A point counts as in a yard if it is more than 0.3 m inside that edge's yard depth.
- **Notches:** edges marked "inner edge" (a notch or step in the lot) depend on which lines are rear or front lot lines (?).
- **The EIHL noise hit in results.json** was a stale `NLEV` value (bug 8). It is gone in `rerun_noise.json`.
