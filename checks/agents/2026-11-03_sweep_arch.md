# Sweep: architecture slice (3 Nov 2026)

Template: `bd-tier` = arch. Programs → Arrange → Compare on 27 lots, each opened as a worked example. Everything was driven through the panel's own controls: Add buttons, the placement and option selects, the size boxes, +/−, lock, storeys, ✕, the secure-line presets, the 3D / Plan / Section / Explode / storey / heat buttons, Save, then Compare.

- Script: `checks/tests/sweep_arch.js`.
- Raw results and failure screenshots: `/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/sweep/arch/` (results.json, log.txt, *.png).
- Targeted probes: `/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/sweeparch_probe/` (probe_arch.js, probe.json).
- No tool files edited. No commits.

**Method.** Each lot was first checked once at the size the worked example opens at (the largest that fits). All the arrangement tests then ran at 1 MW, or at the fit size where that is smaller; 1 MW is the size the 2 Nov reviews used.

Each lot ran through these arrangements:
- refuge with no placement, then each of its three placements
- warming shelter overnight, then day
- greenhouse on the roof, then on the lot
- commercial laundry
- each secure-line preset (lot, wall, hall, suggest)

Each arrangement was checked independently of arch.js for:
- lot ring and required yards (`M.yardRect`)
- zone height and set-up height
- floor-space ratio and the I-2/I-3 1.00 non-industrial cap
- flat bases (sampled on a 1 m grid)
- no 3D overlap with the hall or other blocks
- no plan overlap with plant, plant yard or loading
- drawn area = size
- not-permitted uses not drawn
- red flags
- source chips
- NaN/undefined/null in the text

The resize tests then ran on every program:
- +, then −
- typed 1 m²
- typed back to its size
- 99,999 m² with another program locked
- a moderate grow
- storeys set to 2
- delete

## What came out clean

- 0 page errors and 0 console errors on all 27 lots.
- No program block (other than the refuge under the hall, see #1 and #2) was outside the lot ring, crossed a required yard, or went over the zone height. None overlapped the hall, another block, yard plant, the plant yard or loading.
- Total floor never went past the floor-space ratio. Non-industrial floor never went past 1.00 on I-2 or I-3.
- Drawn area matched the size for every block that went through the main placement loop.
- Locks held. Sizes never went below a sourced minimum, except for the pool on BE (#4). Delete removed the block.
- Explode toggled. The plan's storey buttons matched the levels. Plan, section, heat gradient and heat flow all drew, with no NaN. Every leader line was right-angled.
- Save and Compare worked: 3 saved gave 3 columns, and the secure-line row read correctly.
- The four existing-building lots (HAST, VIC3X, EDCX, ECMV) show the "needs a new building" message on Arrange and Compare, with no errors.

## Bugs, most severe first

| # | Template / step | Lots | What happens | file:line | Severity | Reproduce |
|---|---|---|---|---|---|---|
| 1 | arch: Arrange, refuge "Ground floor under the hall" | E05, EIM (IM); E123, EIHS, EIHL (IH); EMU (MU); VI1S, VI1L (I-1); VM1 (M-1); VM2L (M-2); VIC2 (IC-2) | **A not-permitted refuge is drawn.** The refuge under the hall is placed before the placement loop, so it skips every hard check there: not permitted in the zone, the BE cap, the I-2/I-3 1.00 cap and the floor-space ratio. In these zones the catalogue says "BE only (IM, IH not permitted)" or "I-2, I-3, FC-2; I-1C … only". The same refuge as its own building or side by side is correctly not drawn. rules() then draws it red ("Refuge in IM: not permitted"), but it is still drawn and counted in the space and heat budgets. | arch.js:85–86 (pushed before the loop at 90–97); masses filter at 82 | high | E05 → Programs: add Refuge → Arrange → Placement "Ground floor under the hall". A refuge block appears at 0–6 m, and `BD.archTest.place().boxes` includes it. |
| 2 | arch: Arrange (all steps that draw) | VI2L (1940 Glen Dr, I-2, irregular 27,468 m²). Any lot where `inscribe` fails, so there is no `serverFoot`. | **The data hall is drawn as the bounding box of the clipped footprint**, about 438 × 201 m, with all four corners outside the lot ring. It is also counted at 81,927 m² of floor whatever the MW (82,192 of 82,404 m² at 1 MW). So no program fits ("would pass the floor-space ratio … 212 m² left"). The under-hall refuge comes out as a 1.3 m × 201 m strip outside the lot. | arch.js:62 (`ext(s.M.serverFoot\|\|s.M.foot)`), arch.js:41 (`hallM2` falls back to `footArea × floors`); site.js:174 (no `serverFoot` when `inscribe` returns null) | high | VI2L worked example → Programs: add any → Arrange. 3D shows the hall over the neighbours (screenshot VI2L_refuge_under_hall.png). `P.hall.u` = [−228.7, 209.3]. |
| 3 | arch: Arrange, refuge under the hall on a one-storey building | V09 (any lot), set-up storeys = 1 | **The hall is pushed above the height limit.** With one storey, the hall is lifted onto the refuge's 6 m floor: base 6 m, height 6 m, top 12 m, against a 6 m limit. The tool's own check fires: "Check: something is drawn to 12 m, over this zone's 6 m limit. This should not happen; please report it." `hallH = max(ftf.ground, H − hallBase)` never limits the top to H. | arch.js:63–64 | high | V09, `BD.S.answers.hmode='storeys'; BD.S.answers.storeys=1; BD.modelReset()`, then Arrange → refuge under the hall. Screenshot: sweeparch_probe/V09_one_storey_under_hall.png. |
| 4 | arch: Arrange, resize (typed size or +/−), pool on BE | E06B, EBEL (and any BE lot) | **The pool is drawn below its sourced minimum.** On add, the pool is correctly not drawn ("minimum 815 m² is over the 500 m² cap, so it cannot go on a BE lot"). But any typed size or + then gets clamped to 815 (the minimum) and then to 500 (the cap). The pool is drawn at 500 m² (32 × 15.6 m), with no red flag, below its 815 m² minimum. + makes it smaller (1,065 → 500). | arch.js:262–263 (the minimum is applied first, then the cap overrides it); the placement loop only checks `m2 > cap` (arch.js:93) | high | E06B → add the pool → Arrange → type 900 in its size box. Message: "500 m² is the most this use may have in BE". Pool block drawn. |
| 5 | arch: Arrange, secure line "Building wall" / "Hall wall" | All 23 new-build lots (V09, CLARK, E05, E06A, VI2S …) | **No flag when required parts end up outside the line.** With these presets the plant yard, loading and/or generators are outside the line, and nothing says so. The flag that should say "Outside the secure line: …" sits inside a `//` comment, on the same line as the `outReq` calculation. | arch.js:155 (`… // suggested line holds them by construction (review 2, N4) if(outReq.length) out.push(…)`) | medium | CLARK → Arrange → Hall wall. The rules list has no "Outside the secure line". Loading is drawn outside the dashed line in Plan. |
| 6 | arch: Arrange, resize up | 20 lots (every lot where refuge was resized; general) | **Growing a program past a limit removes it from the drawing.** Typing 99,999 m² keeps 99,999 and drops the block from the drawing, with no message. The limit can be the floor-space ratio, the 1.00 cap, the BE cap for programs without one, or no room. The cause: `resize` only stops at the space budget, and that budget leaves out programs that were not drawn. So once the program itself is undrawn, there is always "room left". | arch.js:264–270 (`over=min(v−old, −B.space.left)` with `B.space` from budgets(), which skips `notDrawn`, arch.js:126–128) | medium | V09 → Arrange → type 99999 in the refuge's size box. The size stays 99,999, the refuge appears in "Not drawn", and there is no "Stopped at" message. |
| 7 | arch: Arrange, Plan view, ground storey, refuge under the hall | 23 lots | **The plan shows the Data hall on the ground floor**, outlined and labelled over the refuge, though the hall starts at 6 m. The plan filter only checks that the storey is below the hall's top, not that it is above the hall's base. | arch.js:312 (`b.hall?A.storey*ftf.ground<b.base+b.h:…`) | medium | V09 → refuge under the hall → Plan → Ground. Labels include "Data hall" and "Refuge". |
| 8 | arch: Arrange, refuge under the hall | E123, EIHS, EIHL, VI1C, VI1S, VI2S, VI3S | **Drawn area is smaller than the size.** The refuge under the hall is cut to the hall's footprint (`fp=min(refuge.m2, hall area)`), so a 265 m² refuge is drawn at 150–230 m² where the hall is small. The panel, the budgets and Compare all still say 265 m². There is no flag. | arch.js:85 | medium | E123 at 1 MW → refuge under the hall. The refuge box is (u1−u0)·(v1−v0) < 265. |
| 9 | arch: Arrange at the worked-example size | V339, E06A, E06B (thesis sites), E05, VI2S, VI3S, VM1, EIHS, VI2L | **Nothing can be drawn at the size the worked example opens at.** At the largest size that fits, the hall is centred in the buildable rectangle with margins all round, and those margins are under the 6 m minimum side. With the plant yard and loading blocking the rest, 0 of 8–9 programs are drawn. Yet the space bar still shows room ("1,738 left" on V339). Only lowering the MW in the set-up gives room, and nothing says so. | site.js:170–171 (serverFoot centred, `k` applied to both sides); arch.js:75–81 (grid over the buildable area) | medium | V339 worked example → Programs: add any → Arrange. Every program reads "no room … not drawn"; Space reads 1,457 of 3,195 m². |
| 10 | arch: Arrange, any program "on the hall roof" (greenhouse) | All 23 new-build lots | **A roof program can never be placed.** The hall is always drawn up to the set-up height H (`hallH = H − base`), and blocks are capped at H (`Hmax = s.H`). So the roof option always ends "no room below the 18 m height limit … (on the hall roof); not drawn". | arch.js:64, 87, 108 | medium | V09 → greenhouse → "on the hall roof". |
| 11 | arch: Arrange, Edmonton zone not in the program's zone list | E05, EIM (IM: spa, therapy pool, conservatory); EMU (clinic, aquarium); IH lots | **Drawn with a "?" note, not blocked**, where the catalogue's Edmonton zone list (e.g. "BE (MU also)", "BE (≤500 m²); MU also") leaves the lot's zone out. `zoneMatch` returns "?" unless the list says "only" or "not permitted", and only "no" blocks. Whether Bylaw 20001 treats unlisted uses as not permitted: unverified (?); J.B.'s call. | arch.js:96, 149–151 | medium | E05 → add spa, therapy pool, conservatory → Arrange. All three are drawn, with "whether that covers IM is not confirmed (?)". |
| 12 | arch: Arrange (blocks on blocks) | VI1C (360 2nd Ave W, I-1C) | **A raised block does not rest flat.** The clinic at base 6 m runs 0.21 m past the edge of the EV hub it sits on. The EV hub's width is trimmed to its exact area, but the height grid still marks the whole 2 m cell as built. So a block can overhang by up to just under 2 m. | arch.js:114 (vB trimmed), arch.js:79–81 (whole-cell heights) | medium | VI1C at 1 MW → refuge side by side. Clinic v = [−14.55, 10.66]; EV hub v = [−14.55, 10.45]. |
| 13 | arch: Arrange, program notes | All 23 new-build lots (laundry, food drying, lumber drying, winter garden, covered plaza, EV hub, community kitchen, heat plant) | **Visible "null" in the text:** "… earlier: null (same)" / "earlier: null (22 m² per stall only)". This comes from catalogue data, not code. | arch_programs.json size.note (lines 566, 2141, 2324, 2728, 2907, 3506, 3904, 4135) | medium | Any lot → add EV charging hub → Arrange. The size note ends "earlier: null (22 m² per stall only)". |
| 14 | arch: Arrange, EMU / Edmonton zones with map modifiers | EMU (10323 78 Ave NW) | The zone code used for the program rules is the whole map string "MU H16 F3.5 CF", not "MU". Rule texts read "not permitted in MU H16 F3.5 CF", and programs listed as "MU also" get "?" instead of a match. | arch.js:57 (`zoneCode`) | low | EMU → add clinic → Arrange. "permitted in Edmonton (BE (MU also)); whether that covers MU H16 F3.5 CF is not confirmed (?)". |
| 15 | arch: Arrange | V339, E06A, VI1S, VI1L, VM1, CLARK, E06B, VIC2, VI2L | **Block sides under the drawing minimum.** Some blocks have a side under 6 m (5.0–5.9 m; the VI2L under-hall strip is 1.3 m), because the width is trimmed to the exact area after the 6 m test. | arch.js:104 (test on full cells) vs 114 (trim) | low | V339 at 1 MW → EV hub. One side is about 5.8 m. |
| 16 | arch: Arrange, rules | 13 lots | **A red flag for something that is not a failed rule.** "X does not fit on one floor here; drawn over N storeys only to show its size. Whether it can be split across floors is a design question" is `sev:'bad'` (red), and it turns the block red. | arch.js:113 | low | V09 at 1 MW → gym. |
| 17 | arch: Arrange, resize messages | E06A, E06B, EBEL (BE caps); all lots on hitting a minimum | **The message after a size is held has no source chip, and it is red.** ("500 m² is the most this use may have in BE", "815 m² is its sourced minimum.") It is drawn as `aflag bad` with no chips. | arch.js:239 | low | E06A → refuge → type 900. |
| 18 | arch: Arrange, option lines | All lots (refuge placements, warming shelter, greenhouse, laundry options) | **Option effect text has figures but no source chip** (e.g. "2 h wall; overnight limited to one residential suite (F-2)…", "30–40 °C supply"). | arch.js:210 (`ch.effect` with no chips) | low | Any lot → refuge → side by side. Read the line under the selects. |

Not a bug, noted:
- **VI3S plant yard.** The script flagged the plant yard as outside the suggested line. The plant yard there has zero depth (`plantYardDepth` 0), so this is a false positive.
- **Rezoning flags.** In Vancouver, programs whose zone list says "not listed" (pool, aquarium, conservatory, fish farm) are drawn and flagged red as "rezoning". This follows J.B.'s 2 Nov decision.
- **Heat flow with no lines.** Heat flow draws no lines where none of the drawn programs has a sourced heat demand (V339, VI1S, VI1C …). This is as designed.
- **Timing.** `place()` takes 0.2–1.4 s on the largest lots (EIHL, VI2L, VM2L).

## Lots (27)

| Key | Lot | Zone / case | Lot m² | MW at fit / tested | Program set |
|---|---|---|---|---|---|
| V09 | 275 1st Ave E (golden) | I-3 | 7,865 | 1.9 / 1 | A |
| E05 | 8803 Stadium Rd NW (golden) | IM | 8,826 | 28.8 / 1 | B |
| CLARK | 1425 Clark Dr (golden) | I-2 | 5,882 | 2.6 / 1 | C |
| E123 | 12603 123 Street NW (golden) | IH | 14,565 | 3.2 / 1 | D |
| V339 | 339 1st Ave E (golden) | I-3 | 4,503 | 1.9 / 1 | A |
| E06A | 74 Airport Rd NW (golden) | BE | 4,569 | 8.6 / 1 | B |
| E06B | 64 Airport Rd NW (golden) | BE | 4,284 | 8.0 / 1 | C |
| HAST | 555 W Hastings (golden) | existing, upper floor | 6,294 | n/a | D (message only) |
| VI1S | 116 8th Ave W | I-1, small | 235 | 0.1 / 0.1 | A |
| VI1L | 2450 Ontario St | I-1 | 3,072 | 1.9 / 1 | B |
| VI1C | 360 2nd Ave W | I-1C (46.5 m, FSR 6) | 1,666 | 0.9 / 0.9 | C |
| VI2S | 1250 Frances St | I-2, small | 310 | 0.6 / 0.6 | D |
| VI2L | 1940 Glen Dr | I-2, large, irregular | 27,468 | 4.0 / 1 | A |
| VI3S | 670 Industrial Ave | I-3, small | 1,109 | 0.1 / 0.1 | B |
| VFC2 | 1220 Station St | FC-2 | 3,849 | 1.9 / 1 | C |
| VM1 | 1250 45th Ave E | M-1 | 6,924 | 19.1 / 1 | D |
| VM2L | 570 Kent Ave South E | M-2, large | 45,424 | 16.3 / 1 | A |
| VIC2 | 1620 5th Ave W | IC-2 | 6,987 | 6.7 / 1 | B |
| VIC3X | 2050 Scotia St | IC-3, existing | 5,021 | n/a | C (message only) |
| EBEL | 2010 76 Avenue NW | BE, large | 50,639 | 12.4 / 1 | D |
| EIM | 7282 68 Street NW | IM | 4,966 | 2.8 / 1 | A |
| EIHS | 9565 60 Avenue NW | IH, under 1 ha | 4,294 | 15.5 / 1 | B |
| EIHL | 550 Hayter Road NW | IH, huge | 164,415 | 11.1 / 1 | C |
| EMU | 10323 78 Avenue NW | MU (assumed IM limits) | 9,366 | 2.6 / 1 | D |
| EDC2 | 12431 Stony Plain Road NW | DC2, small | 924 | n/a / 1 | A |
| EDCX | 5904 51 Avenue NW | DC, existing | – | n/a | B (message only) |
| ECMV | 10550 102 Street NW | CMUV, existing | – | n/a | C (message only) |

Program sets:
- A: refuge, pool, greenhouse, clinic, EV hub, warming shelter, public ground floor, gym
- B: refuge, warming shelter, spa, therapy pool, community kitchen, fish farm, conservatory, laundry, EV hub
- C: refuge, pool, greenhouse, heat plant, EV hub, clinic, covered plaza, roof solar, winter garden, food drying
- D: refuge, clinic, pool, warming shelter, greenhouse, aquarium

Sizes were typed for programs with no typical size: laundry 150, heat plant 88, covered plaza 300, winter garden 250, food drying 120 m².
