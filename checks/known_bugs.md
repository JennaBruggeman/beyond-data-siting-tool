# Known bugs

Open bugs that can change a checked result. Each has the steps to reproduce. Newest first.

## KB-1: noise count of neighbouring lots can drop by one (logged 10 Nov 2026)

**Status:** open. Cause not found. Doesn't block F2b (J.B. 10 Nov).

**What happened.** On 10 Nov, about 11:57, one golden run of V339 (339 1st Ave E) gave `facts.M.noise.tested` = **4,728**; golden says 4,729.
- No other field differed. `noRec` (outlines with no zoning record, not tested) was 13 in both, and the levels and over-limit counts were the same.
- So one lot went missing from the list of candidates. It was not skipped as "no record".
- Two re-runs straight after gave 4,729. Five more on 10 Nov afternoon, run one after another: all 4,729, `noRec` 13. Not reproduced yet.

**Also seen (10 Nov, evening): 64 Airport Rd NW (E06B), `noRec` 157 against golden 158**, `tested` 3,133 in every run.
- On the committed code (93cfe25): 1 run in 8 gave 157.
- With the F8 changes (flag off): 6 runs in 8 gave 157. The flag-off code path is unchanged, so this is most likely timing (when a tile or its records arrive), not a result change. The higher rate isn't explained.
- So the same family as above: an outline with no zoning record is counted or not depending on what has loaded.

**Why it matters.** If a lot can drop out while tiles load, then:
- golden can fail without a real change, or pass when a real change is hidden by a dropped lot;
- a viewer of the tool can see a count one lot short.

So golden's noise counts can't be fully trusted until this is fixed.

**Steps to reproduce**
1. Serve the tool: `python -m http.server 8766 -d tool` (from the repository).
2. From `checks/tests/`, run V339 several times:
   ```bash
   for i in 1 2 3 4 5 6 7 8 9 10; do NODE_PATH=<bd-testenv>/node_modules node golden_run.js "$TEMP/flake/r$i" V339; done
   ```
3. In each `V339.json`, compare `facts.M.noise.tested` and `facts.M.noise.noRec` with `checks/golden/V339.json` (4,729 and 13).
4. A failing run shows 4,728 (or fewer) with `noRec` unchanged.

Rate so far: 1 run in 8 (the flaky one ran in a full golden run, 8 lots one after another). It may be more likely when the server is busy (not tested).

**Where to look (not verified)**
- `tool/engine.js`, the neighbour list (around line 449). The candidates come from the tiles **already loaded** (`S.tiles`), within a 1,500 m square (`far()`, `NRAD`).
- The list is cached in `NREC`. Its key includes the number of tiles loaded, so a tile that arrives later does rebuild the list, but only on the next call.
- So if `golden_run.js` reads the result before the last tile in range has arrived, or before the next redraw, the count is short.
- A tile at the edge of the square may hold only one lot inside it. That would explain a drop of exactly one.
- `golden_run.js` waits a fixed 9 s after selecting the lot. It doesn't wait for every tile within 1,500 m to finish loading.

**Fix to try (not done)**
1. Have `golden_run.js` wait until every tile within NRAD has loaded (and the noise result is rebuilt after it), not a fixed time.
2. In the tool, show the count only once those tiles are in, or mark it "still loading".
3. Re-run V339 20 times and expect 4,729 every time.
