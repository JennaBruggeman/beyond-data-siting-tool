# Noise by-law as a hard rule (2 Nov 2026)

J.B.'s decision (2 Nov 2026): noise by-law limits are hard rules. Sources: code audit site items 1 and 23, exchanges F12. No commits.

## Rule

- **Block:** over the night limit at any neighbouring lot, even with the quieter unit rating (low end of `lwUnit` / `lwUnitDry`).
- **Flag:** over only with the standard (louder) rating. This is a note, not a block.
- **Night limit governs:** the plant runs 24 h.
- **Where it is measured:** the point of the receiving lot nearest the centre of the cooling units.
  - Vancouver By-law 6555 s. 1.2, "point of reception": in the lane or street next to, but outside, the recipient's property, at the shortest distance to the source. Where nothing public lies between, any point outside the source's property line.
  - Edmonton Bylaw 14600 ss. 20(1), 22(1): "as measured at the property line of a property zoned for …".
  - A neighbouring building with no lot outline is measured at its own outline. The message says so: "(building, not property line: reads low ?)".
- **Limits (sourced only):**

  | City | Source zone | Section | Quiet receiver | Other receiver |
  |---|---|---|---|---|
  | Vancouver | quiet | s. 2.1(b) | 45 | 55 |
  | Vancouver | intermediate | s. 2.2(b) | 50 | 65 |
  | Vancouver | activity or event | s. 2.3(b) | 55 | 65 |

  | City | Receiver | Section | Limit |
  |---|---|---|---|
  | Edmonton | residential | s. 20(1) | 50 |
  | Edmonton | other | s. 22(1) | 60 |

  A lot with no zoning record, or an Edmonton MU or DC lot, blocks only above the looser possible limit (Vancouver 55 or 65, Edmonton 60). Above the stricter one it is flagged.
- **Level:** Lp = Lw − 20 log r − 8 (register noise_level).
  - r is horizontal, at least 5 m (the tool's existing floor).
  - Receivers are lots that hold a building, within 1.5 km.
  - Screens, enclosures and indoor plant get no credit: no verified dBA figure (?).
- **Generator testing** (By-law 6555 s. 4.1(c)): not checked (?). The register has no rated generator sound level with a source.

## Changes

| File:line | Change |
|---|---|
| engine.js:405–474 | `noiseSrc`, `noiseLimitAt`, `noiseRecv` (receivers cached per site), `noiseCheck`. Block and flag text names the by-law, section, receiver, level, limit and fixes: smaller size; move the plant (roof, yard or split); liquid cooling (dry coolers, if chillers are in use); the indoors or enclosed caveat. |
| site.js:184–187 | `model()` runs `noiseCheck`: a block goes to `m.warn`, which reaches setupProblems, fitMax, the flow, setup drawer Next (via flow.next), the deck and the report plans. A flag goes to `m.notes`. `m.noise` holds the summary. |
| site.js:284; decide.js:149; flow.js:123–125, 127; engine.js:285 | The flag note is shown (grey, not red) in the setup drawer, the deck, the flow foot and What fits. |
| engine.js:284 | The headline adds "within the noise by-law". |
| engine.js:506 | Generator testing row: s. 4.1(c), "Not checked (?)". |
| engine.js:736–763 | The People tab counts lots over the limit with the by-law check, gives the math line for the worst lot, and labels the limit `limLab` with its section. |
| addons.js:281–286 | The unsourced `limit:50` is replaced by `noiseFallback`: the governing sourced limit and section from `noiseCheck`. |
| scene3d.js:357–360 | The tint uses the property-line level; red only above the certain limit; the contour label names the limit and section. |
| register/patches/noise_block_2026_11_02.py | Rule and measurement point added to noise_limit formula and coef; rebuild run. |

## Golden diffs (vs checks/golden, errors ignored; 0 page errors)

Earlier expected diffs (Z.screen, srcId, maxStoreys, yardRect, HAST inset/fuel) are not repeated.

| Lot | Largest fit (answers.mw) | Cause |
|---|---|---|
| V09 275 1st Ave E | 9.6 → none | 83–86 dBA at 320 Industrial Ave (I-3), 14.6 m; limit 65 (s. 2.3(b)(ii)) |
| CLARK 1425 Clark Dr | 7.7 → none | 77–80 at 1345 Clark Dr (I-2), 25.9 m; 65 |
| V339 339 1st Ave E | 3.8 → none | 77–80 at 275 1st Ave E, 22.9 m; 65 |
| HAST 555 W Hastings | 1.9 → none (plantAt split→roof, genAt roof→yard: findFit found nothing) | 70–73 at 550 W Hastings (CD-1 316, quiet), 69 m; 55 (s. 2.3(b)(i)) |
| E05 8803 Stadium Rd | 33.1 → none | 73–76 at 8720 106A Ave (RM), 50 m; 50 (s. 20(1)) |
| E06A 74 Airport Rd | 10.2 → none | 85–88 at 11830 Kingsway (BE), 8 m; 60 (s. 22(1)) |
| E06B 64 Airport Rd | 10.2 → none | 64–67 at 8065 Cedric Mah Rd (BRH), 94 m; 50 |
| E123 12603 123 St | 21.9 → 0.9 (plantAt roof→yard) | Bigger sizes blocked. At 0.9 MW: flag only (no-record lot, 142 m, 55–58 vs 50/60) |

The other changed values all follow from these:

- Where nothing fits, the model falls back to its provisional size, so `mwSized`, `mwProvisional`, `sizedTo` and `foot`/`footArea` change, along with the plant counts (`s.n`, `need`, `gN`, `gNeed`, `Q`, `coolRoof`, `genYard`, `placed`), the plant lines, `loadingNeed` and `plantYardDepth`/`yardU`.
- The new keys are `noise`, `notes` and the noise line in `warn`.
- E123 also changes `loading` (removed), `fp`, `uBuild` and `plantYardStart`.

Full diff: /tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/gdiff_final.txt

**Finding:** no size passes on 7 of 8 golden lots, even at 0.1 MW, for any plant position, liquid cooling or indoors (probe). One chiller (Lw 102.8) is over 65 dBA closer than about 31 m. To pass, the tool would need a sourced dBA reduction for screens, enclosures or indoor plant. That is J.B.'s call (?).
