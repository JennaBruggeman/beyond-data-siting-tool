# Sweep: community template (3 Nov 2026)

Template: "What it means for the neighbourhood" (localStorage `bd-tier` = `community`). Script: checks/tests/sweep_community.js. Raw results (every step's text, the checks, errors): scratchpad `sweep/community/out/<lot>.json`. Analysis: scratchpad `sweep/analyse_community.py`. No tool files edited. No commits.

What was run on every lot: the worked-example start (findFit), every set-up card in turn, then every step to the report (Opportunities: every family, every row clicked; Could become: two opportunities added). Zoning text was read for New, Share, Retrofit and Lease on the "What is being built?" card. On 5 deep lots (CLARK, E06A, HAST, VDD, EIH), every option on every card was also clicked, and a second walk was run with other answers: liquid or immersion cooling, hybrid coolers or towers, split or yard plant, 2N or N, roof or no generators, 60% cover and 2 storeys. When a walk got stuck, the offered way out was used. The PDF was built on 7 lots.

## Bugs, most severe first

| # | Template | Step | Lots | What happens | file:line | Severity | How to reproduce |
|---|---|---|---|---|---|---|---|
| 1 | community | Report (all pages) | CLARK (probe) | Step notes recorded under an earlier set-up go into the report with no marker. After a set-up is picked in "Set-ups that open the most", the report's baseline is worked out fresh: largest that fits 2.8 MW, plate cooling and towers. The What fits, Heat and other notes it quotes were recorded under air cooling (fits note: 2.6 MW). `n.sig` no longer matches. | report3.js:92–94 (`note`, `secs`, `lead` never check `n.sig`). The old flow.js:221 "Recorded with earlier choices" marker is gone, because report3.js:365 replaces that view. | medium | CLARK. Walk to Set-ups that open the most and pick the first set-up (changes air to plate, dry to towers). Next through to Report. Compare the baseline with the recorded fits note. |
| 2 | community | Set-up cards | HAST, EIH, E06A, VDD (52 card states) | After any answer changes, the card says "Doesn't fit at N MW", with N far above the floor-space range on the same card. HAST lease: 14 MW against 3.6 MW at most. EIH retrofit or lease: 6.3 MW against 0.7. E06A: 5.6 against 5.2. | plant.js:64–65: provisional size = lot × FSR, ignoring lease, retrofit, share and coverage. decide.js `changed()` sets `mw=null`. | medium | HAST. Set-up card 1: click Lease, then any other card. |
| 3 | community | Set-up → "Find a set-up that fits" | E06A (walk B); ERS (walk A, not checked whether any set-up fits) | Says "No set-up fits this lot", but one does: with the default answers, E06A fits 8.6 MW. The search only varies plant place, generators and screening. It keeps coverage, storeys, cooling and spares, the very answers that broke the fit. | flow.js:100–106 (`findFit` tries), 131 (message) | medium | E06A: cover 60%, Set the storeys 2, plate, hybrid, split, 2N, generators on the roof. Then click Find a set-up that fits. |
| 4 | community | Heat, Electricity (async steps) | HAST B, EIH B (Heat); CLARK fresh page (Electricity, first opening) | The step bar, Next and Back are missing for a moment after the step renders. In 2 walks, Next was absent when the step had been open about 1 s. In a repro it came back within about a second, so it is not confirmed that anyone stays stuck. Cause: `show()` does not wait for `tabView` (heatIndex and energyIndex are async). `decorate()` runs on the old content. The late render's mutation is then ignored while `F.busy` is set. | flow.js:173 (`BD.tabView(k)` not returned); 158, 137, 139 | medium (intermittent) | CLARK, fresh page: Keep the defaults → Next to Heat → Next. Read `#fNext` and `.flowbar` 3 s later. |
| 5 | community | Report pages | EMU, CLARK B, VM1, VDD, VI1C, VI1S, VI2S, V09 and every lot at 1.9 MW (options page) | Rounding makes empty or wrong ranges. "3–3 GWh" where the step says 2.9–3.3; "0.6–0.6 MW"; "7–7 GWh" for option A at 6.6–7.3; "0–1 GWh" for 0.4–0.6; "2–2 GWh" of heat for 1.5–2.4. | report3.js:16 (`rng` compares before rounding); 296 (options bars at 0 decimals) | low | Any lot that fits under about 1 MW, then Report. |
| 6 | community | Over time, Two cities | all 27 | Over time's button says "Next: Programs →" but goes to Two cities. Two cities' back button says "← Compare" but goes to Over time. Both name Design steps that this template skips. | flow.js:123 (`nx`, `pv` = steps[i±1], no SKIP) | low | Any lot: walk to Over time. |
| 7 | community | Real buildings | all 27 | The step has no heading. Its only title is an h3 shown to engineers, so the page opens on "Closest in size". | engine.js:866 | low | Any lot: Real buildings. |
| 8 | community | Report, What fits section drawing | 18 walks (e.g. V09, CLARK, EMU) | Unrounded label: "roof plant, 2.896 m". | report.js:69 (`s.k.H`) | low | V09 → Report, page 01. |
| 9 | community | Opportunities | CLARK B | After a set-up is chosen in "Set-ups that open the most", Next opens the same step again. | flow.js:179–180 (`invalidate` re-inserts `opps`) | low | Choose a set-up there, then click Next. |
| 10 | community | Three options | VI1S (0.1 MW) | A "Smaller", B and C are all 0.1 MW. | engine.js:365 (`Math.max(0.1, …)`) | low | 116 8th Ave W, then Three options. |
| 11 | community | People | 17 lots, e.g. VDD, CLARK | "Plant seen from 0 of 0 nearby homes" sits beside "Non-market homes within 200 m: 298". Homes counted are only buildings in quiet or low-density zones. The wording contradicts the line above it. | addons.js:257 | low | VDD → People. |
| 12 | community | Two cities | all | The note "Size from the slider; set a size on the What fits page." refers to a slider that this template's What fits does not have. | extras.js:200 | low | Any lot. |
| 13 | community | Three options, "Four futures" | Vancouver lots with option C to a network (e.g. V09) | Option C is liquid-cooled, but "Receiver leaves: all heat goes back to the air-cooled chillers". `dryName()` reads the current answers, not the option. | engine.js:573, 878 | low | V09 → Three options. |

Counts: high 0, medium 4, low 9.

## Slice checks that passed

- No page errors, console errors, empty steps, or NaN/undefined/null/"[object" in visible text. This covers every step, the set-up cards, every opportunity row, the 3D captions and the report pages, in 32 walks.
- The zoning status is named on New, Retrofit and Lease on every lot where the option is possible: case by case, smaller only, site-specific, rezoning needed, or allowed. Where there is no building, the reason is "nothing to retrofit". The Three options "Zoning path" row matches.
- Costs agree: the heat $/MWh and "worth" figures are identical in the Heat step and the report in all 30 walks that reached the report. Energy-step electricity, the Three options rows, Two cities heat and the report cover agree, apart from #5. Option MWs (A = half, B = chosen, C = largest) match fitMax and the report options page.
- PDF: 7 of 7 built and saved (CLARK, E06A, HAST, VDD, EMU, EIH, VC2), 3.2–3.7 MB.
- Every option on every card was clicked on the 5 deep lots. The storeys input clamps (9 asked, 3 used). The roof-generator fuel block names NFC Table 4.3.13.4.-B.

## Not confirmed

- People step: the "Who is near" list and the sight-line sentence were missing on about half the lots when the step had been open about 1 s. They render later and asynchronously, so this may be timing only.

## Lots (27; the 8 golden lots marked G)

| Key | Lot | Zone | Notes |
|---|---|---|---|
| V09 G | 275 1st Ave E | I-3 | 1.9 MW |
| E05 G | 8803 Stadium Rd NW | IM | 28.8 MW |
| CLARK G | 1425 Clark Dr | I-2 | deep, 2 walks |
| E123 G | 12603 123 Street NW | IH | |
| V339 G | 339 1st Ave E | I-3 | |
| E06A G | 74 Airport Rd NW | BE | deep; walk B stuck (#3) |
| E06B G | 64 Airport Rd NW | BE | |
| HAST G | 555 W Hastings | DD (as I-2) | existing upper floor; deep |
| VI1S | 116 8th Ave W | I-1 | small, 0.1 MW |
| VI1C | 360 2nd Ave W | I-1C | |
| VI2S | 1250 Frances St | I-2 | small |
| VI2H | 250 70th Ave W | I-2 | 112,529 m² |
| VI3L | 320 Industrial Ave | I-3 | large |
| VFC2 | 1220 Station St | FC-2 | |
| VFC2S | 1500 Main St | FC-2 | small |
| VM1 | 769 Hastings St E | M-1 | small |
| VM2 | 1376 Powell St | M-2 | |
| VIC2 | 1620 5th Ave W | IC-2 | retrofit |
| VDD | 556 Beatty St | DD | retrofit; deep |
| VC2 | 1404 Marine Dr SW | C-2 | not industrial |
| EBE | 7545 52 Street NW | BE | |
| EIM | 12115 Fort Road NW | IM | |
| EIH | 12410 67 Street NW | IH | deep |
| EIHS | 15115 117 Avenue NW | IH | small |
| EMU | 10717 98 Street NW | MU | lease, upper floor |
| EDC | 7225 104 Street NW | DC | |
| ERS | 8404 42 Avenue NW | RS | not industrial; nothing fits with defaults |
