# Ground elevation and test-fit redraw: report (4 Nov 2026)

Brief: `ELEV_REDRAW_BRIEF_2026-11-04.md`. Branch `overnight-2026-10-30`. Not pushed.

| Part | Commit |
|---|---|
| A Ground elevation per lot | `ac364b8` |
| B Redraw of the Emergency hub boards | the commit with this report |

## Part A: ground elevation

**Row order (checked).** Row 0 of each `data/lidar_ground2m` raster is the **north** edge.

| 339 1st Ave E, part in tile 492000_5457000 | min | p10 | median | max |
|---|---|---|---|---|
| 0.5 m data (J.B.'s note) | 2.2 | 3.5 | 4.8 | 6.3 |
| 2 m data, north-first rows | 2.3 | 3.6 | 4.8 | 6.0 |
| 2 m data, south-first rows | 3.8 | 3.9 | 4.1 | 4.6 |

- Whole lot (both tiles): **2.2–6.2 m, p10 3.6, median 4.9 m**, 100 % covered.
- The rasters have no empty cells. How cells under buildings or water were filled is not recorded in the repo (?).

**Per-lot table**
- `tool/make_grade.py` (in git) writes `tool/tiles/van/g_<tile>.json`: deciles in dm + coverage %.
- 71 files, 5.7 MB. `tool/tiles/` and `data/` stay git-ignored.
- 93,764 lots: 93,742 have grade; 6 are partly covered (lowest 64 %); 22 have no cell.

**Datums: not confirmed (?)**
- City LAS datum: `webtransfer.vancouver.ca` and `opendata.vancouver.ca` were refused by the network. Not worked around.
- FCL: 4.6 m, Greater Vancouver Regional District datum (VBBL 2025 Div. A 1.4.1.2, re-read in the local text).

**Edmonton: grade ? for every lot**
- open.canada.ca, ftp.maps.canada.ca, datacube.services.geo.ca and the CanElevation bucket were all refused. Nothing downloaded.
- This includes E06B and E06A. J.B. can download the DTM tiles; the script reads `data/raw/edm/hrdem/`.
- CGVD2013 is from the brief, not read in the metadata (?).

**Height base: not settled in either city, so grade only + "?"**
- Vancouver ZDB s. 2: from the **base surface**, the official building grades at the site corners (City Engineer). Existing grades only by exception.
- Edmonton 20001 s. 5.70.2: **Grade** is set by the Development Planner, by one of 3 methods or another.
- Neither uses the median of the lot, so the median is never used as the base.

**Tool**
- The set-up card has a Grade row (min–max, median, datum, "height base ?").
- Vancouver lots in the designated floodplain also get a flood box:
  - share of the lot below 4.6 m;
  - how much a ground floor would need raising;
  - generator pads;
  - the datum flag.
- Edmonton floodplain: still "not yet looked at", as before. The FPO is in the register only (?).
- New `tool/data/grade.json`. The 4.6 m figure is wired to `arch_hb_vbblFlood`.

**Register:** no LiDAR source id existed. Added `van_lidar2022_ground` and `nrcan_hrdem` (patch `grade_2026_11_04.py`, check 1). Rebuilt.

**Checks**
- Golden, 8 lots: only the new grade fields changed. Re-baselined.
- `register_wiring.js`: 0 failures (438 wired).
- Arch 60/30: differs from the baseline on V339, E06B, E06A and CLARK (programs share, boxes). The unchanged tool (HEAD) gives the same for CLARK, E06B and V339 (E06A not rerun), so this work did not cause it. **Not re-baselined; J.B. to look.**
- Screens: `elev_shots/<lot>_setup_card.png`.

**V339 flood box, as shown:** 18 % of the lot below 4.6 m; raise up to 2.4 m. 29 % of the lot is in the designated floodplain.

## Part B: redraw

- **Boards:** same names, in the scratchpad `whitemock/project/`. Generator `tf/redraw.py`. Room geometry unchanged.
- **Groups:** 7 soft tints; one label per group per storey. Leaders at 90°, labels off the drawing. 0 leader crossings (script) and checked by eye at 1440 px.
- **Symbols:** entrance arrows, exit stairs, secure line, fence 1.9 m.
- **Secure line:** 1.2 m inside the data-centre walls (drawing choice). Plant in its own 1.9 m enclosure.
- **Beside the plan:** group table, code check (Passes / Needs fixing, one line + clause), room list collapsed.

**V339 fails fixed**
- **Fence:** plant-only fence at 1.9 m. Pass.
- **Flood:** ground slab and pads at 5.0 m (drawing choice: the refuge door grade). That is ≥ 4.6 m.
  - Grade: refuge 4.6–5.3 m; generators 4.7–5.1 m.
  - Result **?**: the datum only.
- **Height:** 23.0 − 5.03 m (base surface from existing corner grades; official ?) = **17.97 m ≤ 18.3 m**. Pass.
- **New ? items:**
  - the lobby door is 0.7 m above the slab;
  - S2 and the refuge side door open onto low ground (2.9–4.5 m).

| Code check | Pass | Needs fixing |
|---|---|---|
| E06B | 28 | 14 (all ?) |
| V339 | 31 | 11 (all ?, no fail) |

Screens: `elev_shots/TestFit_EH_E06B.png`, `TestFit_EH_V339.png`. Notes updated: `checks/research_typ/testfit_emergency_hub.md`.

## For J.B.
1. Confirm the City LiDAR's vertical datum (readme behind the blocked host).
2. Download HRDEM for E06A and E06B, or OK another source.
3. V339 lobby step: ramp, regrade, or slab 5.3 m (height 18.27 m)?
4. Arch baseline drift (it existed before this work).
