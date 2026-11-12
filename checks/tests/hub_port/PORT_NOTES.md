# Hub checks port: JS vs the frozen Python (11 Nov 2026)

Port: `tool/hubchecks.js`, from the scripts of **EH-FREEZE-2026-11-11b** (Claude Link `eh/FROZEN_EH-FREEZE-2026-11-11b.md`; it supersedes the first freeze).

| Script (sha256, 16) | What is ported |
|---|---|
| reach.py 9b5c5338626a78e9 | T-reach R0–R8, kind(), SERVES (D3), cap_area (R8), bays |
| dcspace.py 2119db4ae14e72f1 | public route to a street off truck ground (used by reach and yardgate) |
| portal.py b1115a7598d7aee3 | security portal free-exit row |
| yardgate.py 8b875e73a0468586 | plant yards, gates, vehicle gates, dock doors (v7) |
| audit_rooms.py 6dabc907ecf9d514 | clear sizes (clear_geom, local_width, max_square) and room minimums (RULES, HARD, audit_geom, refuge 175 m²) |
| sizing.py fe04e6175b6a4aae | data-centre sets, transformers, switch margin, KD300 curve and tanks, hub set (KD80/KD100/KD300, 72 h), battery cabinets and room |
| hubload.py 4cd41a1240bcd17c | hub emergency load (NECB 2020 build-up) |
| tfboard.py b01e2d4abc7fb12a | `_st` (D1), `_t`, the sizing part of `measure`, rows Plant sized to load, Hub generator (72 h), Battery cabinets (UPS 10–15 min), Room widths and shapes; zone_exits, the egress, area and walkway rows, `common_checks` (every shared board row, with the dead-end / Q24 yard logic) |
| deadend.py aa10e3fde2181264 | dead-end corridors along the centreline (strict and Q24 readings) |
| egress2.py 6384340c3f170537, egress3.py 0899ee81148da1ed | refuge and shelter egress doors; egress doorways by room area |
| walkload.py a128dc3a63b22752 | walkway width by load |
| sep2h.py 1d79eead43134f8b | 2 h walls between hub and data centre |
| padcheck.py 525e0b7d6624c81b | ES54 pads (distances, best front), the bonding and bollards row |
| intakes.py 8e232c5089540c2d | outdoor air intakes: **computed on the boards** (one intake per zone placed at the best wall or roof point, 3-D distances to generators, bays, chillers, arterials), ported as frozen |
| fuelfill.py 293b18fe176c12f0 | fuel fill: **computed on the boards** (fill point on a yard fence, inside on a gated route, or remote beside truck ground), ported as frozen |
| claims.py ea19cf7902a44e16 | typed rows checked by script (pads, storeys, at grade, separations, wet rooms off the hall, generator tanks, chiller zones, hub cap, public exits, loading) and `apply` |

### Second port step (11 Nov 2026): the remaining board scripts
- **Boards:** 967 recorded calls into these scripts (every call the 14 board runs made, including the full `common_checks` row list and every typed row through `claims.apply`): all the same except 4, below.
- **Failure tests:** 531 replayed calls match (the 458 earlier plus dead ends, egress, pads, intakes, claims called directly by the tests); 6 centreline-mode calls skipped as before.
- **To match Python exactly** the JS reproduces: CPython's set order (tuple hash and set table) where the dead-end script takes the first of two equally near centreline cells; Python's correctly rounded `math.hypot`; GEOS's point-to-segment arithmetic for distances; and how shapely splits outlines (pieces cut at every room corner on an outline).

### Not matched, for J.B. (no status changes)
- **2 h walls on 1360, 8238 mid, 8980** (sep2h): Python's wall line is cut where shapely starts each union outline ring, leaving a 0.02 m stub alone, below the script's 0.05 m filter; JS keeps the stub joined to its wall. Totals differ by 0.02 m (8980 storey 2 prints 13.8 m in Python, 13.9 m in JS). All three rows pass either way. Where a union ring starts depends on shapely's internal union order; same kind of library quirk as the 339 corner.

## How it's tested
1. **Boards** (`capture_ref.py` → `port_test.js`): each hub board's own run.py re-run from Claude Link `eh/`; the geometry its checks saw and every result recorded; JS run on the same geometry. 13 boards plus the 8238 mid variant.
2. **Answer key:** the re-run boards reproduce every row of the 11b boards (`eh/ic37/`) exactly, all 13. The "8238 Outright" board is the mid variant (geom_mid.py). Python 3.13, shapely 2.2.0, numpy 2.5.4, scipy 1.18.1 (the freeze ran 3.12, shapely 2.2, numpy 2.5; same pages).
3. **Failure tests** (`capture_tests.py` → `port_tests_replay.js`): the hub's fixbatch_tests.py (155/155) and ic20_yardgate_tests.py (19/19) run unchanged; each of their 458 calls into a ported check replayed in JS.

## Result
| Check | Boards | Failure tests |
|---|---|---|
| T-reach | every finding the same (26 calls) | 50 the same |
| Street routes | 263 the same | 185 the same |
| Yards, gates, vehicle gates, dock doors | 30 items the same | 28 the same |
| Portal | 2 the same | 2 the same |
| Clear sizes | 795 of 796 rooms (one accepted, below) | 34 the same |
| Room audit rows (area, width, issues, kind, notes) | 2,265 the same | 21 the same; 3 skipped |
| Sizing values (MW, sets, pads, tanks, hub set, hub load, margins) | 602 the same | 39 the same |
| D1 (`_st`) | inside the rows | 79 the same |
| The four rows, vs the board run and vs ic37 | all the same | 15 the same; 3 skipped |

Skipped (6): calls one test makes with `audit_rooms.CLEAR = False` (old centreline sizes, a switch inside the test). Not ported: the freeze uses clear sizes.

## Accepted difference (J.B. 11 Nov 2026)
- 339 1st Ave E, refuge day room: JS clear area 165.91 m², Python 165.93 m² (8 cells, 0.02 m²); widest square the same (6.85 m). Shapely leaves one inside corner of the fire-wall inset unrounded where the room's outline starts (10.6, 14.5); JS rounds every inside corner. Library quirk, not a rule. Listed in `port_test.js` (ACCEPTED), so the test passes with it.

## Matching Python exactly (how)
- **Number text:** Python's `f'{x:.1f}'` and `round()` round the exact binary value, ties to even. JS `toFixed` rounds exact ties up; `pyFixed` reads the exact digits and rounds true ties to even (1.905 → 1.91, 0.125 → 0.12, 2.5 → 2).
- **Areas exactly halfway (8.85):** shapely's float error decides the rounding. For a rectangular clear shape its area is (x1 − x0)(y1 − y0) on the corners as computed (edge ± inset in floating point), whatever the ring's start; JS uses the same product. Other shapes use exact arithmetic; none sat on a halfway value on any board.

## Not covered
- Reach with SERVES on (pool and cascade setting): only the failure tests' D3 cases (passed).
- A non-rectangular clear shape whose true area is exactly halfway could round 0.1 m² differently in the text. None on the boards.
- ref/ (137 MB) and ref_tests/ (3.7 MB) are git-ignored: re-create them with the two capture scripts.
