# Sweep: engineering slice (3 Nov 2026)

Template: `bd-tier` = full. Every step on 27 lots, opened as a worked example (findFit), from Set up to Report, then the PDF built.
Script: `checks/tests/sweep_engineering.js`. Raw results and failure screenshots: `/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/sweep/engineering/` (results_a.json, results_b.json). Ad-hoc probes (option fit, note placement, own-site path, search timing): `/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/sweepeng_dbg/`. No tool files edited. No commits.

## What came out clean

- 0 page errors and 0 console errors on all 27 lots (only swiftshader WebGL warnings).
- No NaN, undefined, null, Infinity or "[object" in any step's visible or hidden text, or on the report pages.
- Heat, Electricity, Water, Materials and People figures match the register formulas exactly on every lot:
  - heat offered = IT MWh × capture 0.57–0.75 × COP ÷ (COP − 1); ratio to IT MWh 0.733–1.125 on every lot
  - power = MW × PUE 1.4–1.55; GWh = × 8,760 × 0.6
  - water make-up 1.2–2 × evaporation (towers and hybrid both tested); hybrid wet share 12.4 % (Van) and 10.4 % (Edm)
  - racks = MW ÷ 8 kW; servers = MW ÷ 0.6 kW
- Fuel: roof generators held under the NFC 20,000 L (HAST 12,230 L; EDC2 16,632 L). No set-up over the limit got through.
- Noise: on every lot that needs mitigation, the People tab names it. Mitigations seen: low-noise chillers + 4.9 m screen; screen only; plant room; low-noise chillers + plant room.
- Three options: three sizes in order, none above the largest that fits. Option C (plate cooling + heat pump) fits at that size on the 5 lots tested.
- Over time and Two cities draw on every lot.
- Report: 11 pages on every lot. The PDF builds in 2–8 s (3.2–3.6 MB, starts `%PDF-`).

## Bugs, most severe first

| # | Template / step | Lots | What happens | file:line | Severity | Reproduce |
|---|---|---|---|---|---|---|
| 1 | full: Set up, What fits, Real buildings, Heat, Water, Materials, People, Three options, Over time, Two cities (Electricity only sometimes) | all 27 (every lot needs noise mitigation; probed on V09 and CLARK) | The set-up note ("Noise: needs …" and the louder-rating flag) is moved out of the step's foot into the closed **Sources** fold. The `.fnote` box is left empty. In the report, the note is listed **3 times as a source**. The required mitigation is still named in the People tab text, but on every other step it reads as fine print. | flow.js:127 builds `<div class="fnote"><p class="src nflag">`. engine.js:666 `finePrint` takes `:scope > div > p.src`, so it catches it (finePrintAll runs from wireTabs on a setTimeout, after decorate). | high | Open CLARK as a worked example and go to Heat. `.fnote` text is ""; the note is inside `details.fp` "Sources". `BD.report3.collect()` → `D.D.srcs` holds 3 "Noise: needs …" entries. |
| 2 | full: Real buildings, Over time, Two cities | all 27 | The logic panel can't open. The "The logic" button and panel exist, but `#wc.nov .wcvis` is `display:none` on these steps, and that is where the panel lives. logic.js defines parts for prec, time and cities (STEP), but they are never shown. | stage.js:10 (`NO3D`); index.html:270; logic.js:145 (`panelEl` puts the panel in `.wcvis`) | medium | Any lot, with `bd-logic` = 1. Go to Real buildings: `#wcLogic` has `offsetParent === null`. |
| 3 | full: Opportunities → "Set-ups that open the most" | 26 of 27 over 30 s | The page freezes while 243 set-ups are tried, each with its own `fitMax`, all on the main thread with no yield. In this container: step 39–268 s; `BD.bestSetups()` alone took 27 s (VI2S) to 166 s (VM1). A real laptop is faster, but this is still a long freeze with no progress shown. | opps.js:115–123; called from opps.js:142 (`oppBest`) and opps.js:105 (`oppIndex`) | medium | V09 worked example. Time `BD.bestSetups()` in the console: about 119 s here. |
| 4 | full: Real buildings | all 27 | The step has no `h2` heading (sections only). Its report title falls back to the step name. | engine.js:842–846 (`precView`) | low | Any lot. `#side h2` is empty on Real buildings. |
| 5 | full: Electricity | VI1S, VI3S (0.1 MW), VI1C (0.9 MW) | The yearly cost tile collapses to "$0.1–0.1M" or "$0.7–0.7M" (`toFixed(1)` on both ends). | addons.js:157 | low | VI1S worked example → Electricity, third tile. |
| 6 | full: Three options | VI1S, VI3S | When the largest fit is 0.1 MW, A, B and C all come out at 0.1 MW. "Smaller, air-cooled" is not smaller. | engine.js:365 (`Math.max(0.1, chosen/2)`) | low | VI1S → Three options. `optionSet` gives 0.1 / 0.1 / 0.1. |
| 7 | full: Water (towers, hybrid) | all | The low ends mix two PUEs. Make-up's low end uses evaporation at PUE 1.4; blowdown's low end uses PUE 1.55 (`bd=[evap/5, evap]`). So at the low end, make-up minus blowdown is not evaporation, which breaks the register rule "make-up = E + B". It moves numbers by about 10 %. | addons.js:203 | low | Any lot. Set `BD.S.answers.outside='towers'` and redraw Water. Compare the make-up low end with blowdown ÷ evaporation. |

Not a bug, noted: on the own-site path (pick a lot, keep the defaults), the default size fits none of the 5 lots tested (V09, VI2S, E05, VM1, EIHS). The walk stops at Set up with "Use the largest size that fits" or "Find a set-up that fits", as designed. After the fix, every exchange tab uses the same MW.

## Lots (27)

| Key | Lot | Zone / case | Lot m² | MW (largest fit) | Plant / generators / visibility |
|---|---|---|---|---|---|
| V09 | 275 1st Ave E (golden) | I-3 | 7,865 | 1.9 | roof / yard |
| E05 | 8803 Stadium Rd NW (golden) | IM | 8,826 | 28.8 | roof / yard / indoors |
| CLARK | 1425 Clark Dr (golden) | I-2 | 5,882 | 2.6 | roof / yard |
| E123 | 12603 123 Street NW (golden) | IH | 14,565 | 3.2 | split / yard |
| V339 | 339 1st Ave E (golden) | I-3 | 4,503 | 1.9 | roof / yard |
| E06A | 74 Airport Rd NW (golden) | BE | 4,569 | 8.6 | roof / yard / indoors |
| E06B | 64 Airport Rd NW (golden) | BE | 4,284 | 8.0 | roof / yard / indoors |
| HAST | 555 W Hastings (golden) | existing, one upper floor | 6,294 | 2.5 | roof / roof / indoors |
| VI1S | 116 8th Ave W | I-1, small | 235 | 0.1 | roof / none / indoors |
| VI1L | 2450 Ontario St | I-1 | 3,072 | 1.9 | roof / yard |
| VI1C | 360 2nd Ave W | I-1C | 1,666 | 0.9 | yard / yard |
| VI2S | 1250 Frances St | I-2, small | 310 | 0.6 | (findFit) |
| VI2L | 1940 Glen Dr | I-2, large | 27,468 | 4.0 | (findFit) |
| VI3S | 670 Industrial Ave | I-3, small | 1,109 | 0.1 | (findFit) |
| VFC2 | 1220 Station St | FC-2 | 3,849 | 1.9 | split / yard |
| VM1 | 1250 45th Ave E | M-1 | 6,924 | 19.1 | roof / yard / indoors |
| VM2L | 570 Kent Ave South E | M-2, large | 45,424 | 16.3 | roof / yard |
| VIC2 | 1620 5th Ave W | IC-2 | 6,987 | 6.7 | roof / yard |
| VIC3X | 2050 Scotia St | IC-3, existing building | 5,021 | 1.9 | roof / yard |
| EBEL | 2010 76 Avenue NW | BE, large | 50,639 | 12.4 | roof / yard / screen |
| EIM | 7282 68 Street NW | IM | 4,966 | 2.8 | roof / yard |
| EIHS | 9565 60 Avenue NW | IH, under 1 ha | 4,294 | 15.5 | roof / yard / indoors |
| EIHL | 550 Hayter Road NW | IH, very large | 164,415 | 11.1 | roof / yard |
| EMU | 10323 78 Avenue NW | MU | 9,366 | 2.6 | roof / yard / screen |
| EDC2 | 12431 Stony Plain Road NW | DC2, small | 928 | 3.4 | roof / roof / indoors |
| EDCX | 5904 51 Avenue NW | DC, existing building | 33,835 | 5.7 | roof / yard / screen |
| ECMV | 10550 102 Street NW | CMUV, existing building | 17,501 | 0.8 | roof / yard / indoors |

Out of this slice, for the sizing sweep to look at: EDC2 (928 m², assumed envelope) fits 3.4 MW, and EIHS (IH, under 1 ha) fits 15.5 MW.
