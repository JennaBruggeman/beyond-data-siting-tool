# Hub checks port: JS vs the frozen Python (11 Nov 2026)

Port: `tool/hubchecks.js` (reach, dcspace, portal, yardgate v7, clear sizes from audit_rooms). Freeze EH-FREEZE-2026-11-11; the five scripts are byte-identical in EH-FREEZE-2026-11-11b (sha256 prefixes 9b5c5338626a78e9, 2119db4ae14e72f1, b1115a7598d7aee3, 8b875e73a0468586, 6dabc907ecf9d514).

## How it's tested
- `export_geom.py`: geom.py of each fit as JSON (geom/; Edmonton git-ignored).
- `capture_ref.py`: runs each board's own run.py (Python 3.13, shapely 2.2.0, scipy 1.18.1, numpy 2.5.4; the freeze ran 3.12) and records the geometry the checks saw plus every result. ref/ is 137 MB and git-ignored; re-create it with the script.
- `port_test.js`: JS against ref/ on the 13 boards plus 8238 mid.

## Result (boards re-run on EH-FREEZE-2026-11-11b)
- T-reach: every finding the same on every call the boards made (all with SERVES off, as the hub runs; the pool and cascade setting is not exercised).
- Public routes to a street (dcspace.route): all 263 calls the boards made, same result and reason.
- Plant yards, gates, vehicle gates, dock doors: all the same (30 items).
- Portal row: same on both boards that have one (1360, 10004).
- Clear sizes: 795 of 796 rooms the same (area within 0.01 m², the same 0.05 m cells, the same widest square).

## The one difference
- 339 1st Ave E, Refuge and warming shelter day room: JS clear area 165.91 m², Python 165.93 m² (8 cells, 0.02 m²). Widest square the same (6.85 m).
- Cause: at an inside corner the fire-wall inset is a square corner (shapely's mitre join). Shapely leaves that corner off where the room's outline happens to start, because the wall line is cut there. The refuge's outline starts at that corner (10.6, 14.5). JS draws the square corner everywhere.
- Our reading: the script's result there is a library artefact, not a rule. Left as it is; flagged by the test.

## What the test does not cover
- Fail branches the 14 boards never reach (most boards pass reach and yardgate). The Python break tests (eh/tests/fixbatch_tests.py, 155 cases; ic20_yardgate_tests.py, 19) are not yet run against the JS.
- Room minimums (RULES, HARD) and sizing to load: not ported yet.
