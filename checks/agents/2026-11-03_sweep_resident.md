# Bug sweep: resident template (3 Nov 2026)

Slice: localStorage `bd-tier` = `resident`. Every step of the guided flow on 27 lots, from the set-up to the PDF report. Script: `checks/tests/sweep_resident.js` (main run; `SWITCH=1` runs the lot-switch, slider and "Use this set-up" test; `PROBE=1` checks when each Next button appears and whether residents see the height limit). Raw results: scratchpad `sweep/resident/json/`. Screenshots (failures only): scratchpad `sweep/resident/`. No tool files edited. No commits.

**Clean on every lot:** no page errors. No console errors (the only two are the fonts and d3 requests the script blocks). No NaN, undefined, null or "[object" in any visible text or report page. No step threw or rendered empty. The report built on all 27 lots (5 pages; PDF saved). Plant placement: no unit outside the lot, inside a required yard, on the building or loading, or off the roof. No tower or hybrid unit within 3 m of the lot line. This held for the set-up used and for every offered "Set-up that opens the most".

## Bugs, most severe first

| # | Template | Step | Lots | What happens | file:line | Sev | Reproduce |
|---|---|---|---|---|---|---|---|
| 1 | resident | Set-up | 16 of 27 are blocked when they open: E05, E06A, E06B, E123, HAST (5 of 8 golden), EAJ, EDC2, EMU, VFC2L, VFC2S, VI1C, VI2S, VI3L, VI3S, VM1, VM2 | The assumed set-up does not work, so the card says "Nothing fits" and "What fits here" is disabled. Roof and Yard (the residents' only choice) still fail on 14 of these lots: noise, or the generators do not fit. The card says "Change a choice below", but residents have no choices below. The only way on is "Find a set-up that fits" in the panel footer, below the fold. The card also does not use its own roof-or-split fallback when it first opens: E123 and VFC2L open blocked but pass once Roof is clicked. | tiers.js:91–103 (`residentCard`; text at 103); tiers.js:109–113 (fallbacks only on click) | high | Resident template, pick E05 (8803 Stadium Rd NW). |
| 2 | resident | What fits | all | The size slider is shown to residents and offers every step from 0.1 to 40 MW, whatever fits. On CLARK, 12 sizes are above the 2.6 MW that fits. Picking 40 MW blocks the walk ("Fix the set-up to go on"). The thumb also sits at 0.1 MW whenever the size is not a slider step (`ST.indexOf(mw)` = −1): V09 1.9, EBEM 1.4, EIMM 1.9, VI1C 3.8, VIC3 0.9 and others. | engine.js:297 (`max=ST.length-1`, `value=ST.indexOf(mw)`), engine.js:313 (onchange, no cap) | high | V09 → What fits. The thumb is at 0.1 while the text says 1.9 MW. Drag to 40 MW. |
| 3 | resident | Opportunities: Set-ups that open the most | E123, VFC2L, VI1C | An offered set-up does not work at the size it offers. E123: liquid, dry coolers, split, 2.5 MW gives "1 of 3 dry coolers do not fit on the roof", though fitMax for it is 10.6. VFC2L: roof, roof generators, 2.5 MW gives "2 of 3 generators do not fit on the roof" (fitMax 4). VI1C: no generators, 2.5 MW gives "4 of 5 dry coolers do not fit on the roof" (fitMax 5.3). Cause: once a size is set, the building shrinks to that size, so a smaller size has a smaller roof. fitMax's binary search assumes a smaller size never needs more room. The resident's typical size (min(2.5, fitMax)) has the same risk. | site.js:167–171 (`serverFoot` sized to MW); site.js:200 (`fitMax` assumes monotonic); opps.js:115–124 (`bestSetups` sizes at typ or mid without re-checking) | high | E123 → Set-ups that open the most → "Use this set-up" on the second card. |
| 4 | resident | Set-up, after "Find a set-up that fits" | E05, E06A, E06B, EAJ, EDC2, EMU, HAST, VFC2S, VI3L, VI3S, VM1, VM2 (indoors); same lots plus VI1C and VI2S (size) | The assumed answers shown are no longer what is used. (a) The plant goes indoors (`vis`='indoors', a plant room taking about 557 m² on E05), but the list still says "Where does the plant go? Roof". `vis` is not in the deck, so it is never listed. (b) The size becomes the largest that fits (`mwPick`='large'), not the residents' typical size (E05 4.0 MW, while 2.5 fits). The card still describes "Typical" as 2–2.5 MW and does not say the size was raised. (c) Roof is now marked as chosen. | flow.js:105–109 (`findFit` sets `mwPick:'large'`); tiers.js:94 (rows only from the deck); decide.js:50–81 (no `vis` entry) | medium | E05 → "Find a set-up that fits" → read "Everything else, chosen for you" and "How big". |
| 5 | resident | Set-up on the next lot | any (tested CLARK → V339) | After "Use this set-up" (which sets `residentEdit`), the next lot picked opens the full set-up deck ("What is being built?") instead of "What we assumed for you". It stays there: the 500 ms interval clears `residentEdit` after `select()` has already drawn the card. `mwSite` is also left from the old lot. | tiers.js:126 (interval); tiers.js:123 (`setup.start` patch); index.html:621–660 (`select` calls `setup.start` straight away) | medium | CLARK → Set-ups that open the most → Use this set-up → pick V339 on the map. |
| 6 | resident | Set-up, What fits, whole walk | all 27 | Roof plant always stands above the zone's outright height. Tops are about 2.9 m above for chillers and dry coolers and 4.8 m above for roof generators (E05 22.8 m against 18 m). A required 4.9 m noise screen adds more. Residents are never told. The `PROBE` run found no mention of height, roof equipment, s. 10.1.1 or s. 5.70 on any resident step. Vancouver allows it only at the Director of Planning's discretion (the tool's own zone note: ZDB s. 10.1.1), so it is a "with approval" item, like height. Edmonton s. 5.70 cl. 1.9.5 names ventilating equipment, plumbing stacks and mechanical penthouses. Whether generator sets are covered is our reading (?). Needs J.B.'s call: say it, or treat it as needing approval. | site.js:27–28 (`ROOFNOTE`, shown only in the zone checklist); plant.js `roof()` (units at `roofH`, no height check) | medium | V09 → set-up: building 18.3 m (limit 18.3 m), chillers on top to 21.2 m. |
| 7 | resident | Set-up | all; worst EIHL 13.6 s, E05 9.6 s, EDC2 8.6 s | Clicking Roof or Yard freezes the page for 1.2–13.6 s, with no sign that it is working. The click runs up to four fitMax binary searches, with noise checks, synchronously. "Find a set-up that fits" takes 1.4–6.4 s. | tiers.js:109–113 | medium | EIHL (12225 17 St NW) → click Roof. |
| 8 | resident | What fits; Over time | all | The Next button names a step residents skip. What fits says "Next: Real buildings" but goes to Heat. Over time says "Next: Programs" but goes to Two cities. | flow.js:123 (`nx=F.steps[F.i+1]` ignores `SKIP`) | low | Any lot → What fits → read the Next button. |
| 9 | resident | Set-up | all | Two forward buttons do the same thing: the card's "What fits here →" and the footer's "Keep the defaults →". When the set-up is blocked, both say "Fix the set-up to go on". | tiers.js:107; flow.js:123–125 (`foot`) | low | Any lot → set-up. |
| 10 | resident | Set-up | 15 lots where cooling (roof) and generators (yard) are in different places, e.g. V09, CLARK | Neither Roof nor Yard is marked for the assumed set-up. Only the "Now: …" line says where things are. | tiers.js:93 (`where`), 99 | low | V09 → set-up. |
| 11 | resident | Set-up (blocked) | the 16 lots in #1 | The block reason is one long red paragraph (about 120 words on E05). It points to controls residents cannot reach ("Seen or hidden: Bring it indoors", "the cooling plant in the yard or split"). Against J.B.'s style rules (red only for key words; no long paragraphs). Screenshot: `E05_setup_roof_blocked.png`. | tiers.js:103 (`dwarn`); engine.js noise block text | low | E05 → set-up. |
| 12 | resident | Report | all | The "Set-up" fact gives the building and cooling type only. It does not say where the plant and generators are, whether the plant is indoors, or the noise measures required, even though the residents' report is titled "what affects neighbours". | flow.js:203–205 (`facts`) | low | Any lot → Report → Baseline. |

Counts: 3 high, 4 medium, 5 low.

Not bugs (checked): picking one lot after another does not carry the old size; `mwPick` is cleared, so the card resizes. The footer of the Electricity step appeared about 1 s late under load. The `PROBE` run shows it is present by 1 s. The "How big" size buttons were removed on purpose (commit c9ac475); a `[data-sz]` handler is left over in tiers.js with nothing to attach to.

## How the walk was run

Each lot gets a fresh page with tier `resident`. The golden lots get their golden answers, and `BD.select` is called as a map click would. Then:

1. Record the assumed-answers card.
2. Click Roof, then Yard, and record each.
3. Restore the set-up. (A script slip: on a lot where the default failed, it restored the state after Roof was clicked.)
4. If still blocked, try "Use the largest size that fits", then "Find a set-up that fits".
5. Click Next to the report and build the PDF through a stub download capability.

Plant legality was measured from `BD.model()`: unit rings against the lot rings, the required-yard rectangle (`m.inset`), the drawn building, the loading area and the roof outline; evaporative units against 3 m from the lot line; roof tops against `Z.hOutright`.

## Lots (27)

| Key | Address | Zone | Opened | Set-up used (MW, plant, generators) |
|---|---|---|---|---|
| V09 | 275 1st Ave E | I-3 (golden) | ok | 1.9, roof, yard |
| E05 | 8803 Stadium Rd NW | IM (golden) | blocked | 4.0, indoors, roof (Find) |
| CLARK | 1425 Clark Dr | I-2 (golden) | ok | 2.5, roof, yard |
| E123 | 12603 123 St NW | IH (golden) | blocked | 2.5, split, yard (after Roof) |
| V339 | 339 1st Ave E | I-3 (golden) | ok | 1.9, roof, yard |
| E06A | 74 Airport Rd NW | BE (golden) | blocked | 4.0, indoors, roof (Find) |
| E06B | 64 Airport Rd NW | BE (golden) | blocked | 4.0, indoors, roof (Find) |
| HAST | 555 W Hastings, existing upper floor | DD (golden) | blocked | 2.5, indoors, roof (Find) |
| VFC2L | 1220 Station St | FC-2 | blocked | 1.9, split, yard (after Roof) |
| VFC2S | 260 Northern St, 713 m² | FC-2 | blocked | 3.0, indoors, roof (Find) |
| VI1C | 360 2nd Ave W | I-1C | blocked | 3.8, roof, none (Find) |
| VI1 | 5 4th Ave W | I-1 (as I-2) | ok | 2.5, roof, yard |
| VI2S | 1239 Odlum Dr, 1,291 m² | I-2 | blocked | 0.9, yard, roof (Find) |
| VI2L | 250 70th Ave W, 11 ha | I-2 | ok | 2.5, roof, roof (after Roof) |
| VI3S | 370 Prior St, 381 m² | I-3 | blocked | 0.6, indoors, none (Find) |
| VI3L | 320 Industrial Ave, 5 ha | I-3 | blocked | 4.0, indoors, roof (Find) |
| VM1 | 1250 45th Ave E | M-1 (as I-2) | blocked | 4.0, indoors, roof (Find) |
| VM2 | 1376 Powell St, 624 m² | M-2 (as I-2) | blocked | 1.7, indoors, roof (Find) |
| VIC3 | 2050 Scotia St | IC-3 (as I-2) | ok | 0.9, roof, yard |
| EBEM | 7545 52 St NW | BE | ok | 1.4, roof, yard, screened |
| EBEL | 250 Karl Clark Rd NW, 63 ha | BE | ok | 2.5, roof, yard, screened |
| EIMM | 3911 78 Ave NW | IM | ok | 1.9, roof, yard |
| EIHM | 12410 67 St NW | IH | ok | 2.5, roof, yard |
| EIHL | 12225 17 St NW, 46 ha | IH | ok | 2.5, roof, yard |
| EMU | 13022 82 St NW, 641 m² | MU (as IM) | blocked | 2.2, indoors, roof (Find) |
| EDC2 | 708 Wilkin Close NW | DC2 (as IM) | blocked | 3.8, indoors, roof (Find) |
| EAJ | 11400 University Ave NW | AJ (as IM) | blocked | 4.0, indoors, roof (Find) |
