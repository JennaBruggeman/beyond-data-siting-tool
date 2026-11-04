# Build (4 Nov 2026): ground elevation in the tool + simple test-fit redraw

Repo /mnt/attach/outputs, branch overnight-2026-10-30; commit per part (author/trailer as REBUILD1_BRIEF_2026-11-03.md). Never push or publish. No made-up figures; "?" where no source.

## Part A — ground elevation per lot
- Vancouver: City LiDAR 2022 ground (class 2) means, downsampled to 2 m cells, in data/lidar_ground2m/<x>_<y>.npz (ground_dm int16 = decimetres; x0, y0 = tile SW corner UTM 10N EPSG:26910; res = 2.0; row order: check with a known lot — 339 1st Ave E parcel ground was 2.2–6.3 m, median 4.8 m from the 0.5 m data, and verify the flip). Source: https://webtransfer.vancouver.ca/opendata/2022LiDAR/ (register: find the existing LiDAR source id; vertical datum of the City LAS: find it in the City's LiDAR metadata/readme if reachable, else "?"). This data folder is git-ignored: keep it that way; ship only the derived per-lot table.
- For every Vancouver lot in tool/tiles/van (lot rings decode as index.html decodeRing), compute ground min / p10 / median / max (m) inside the lot; write a compact per-lot file the tool loads (e.g. tool/tiles/van/g_<tile>.json keyed by lot id), plus coverage share.
- Edmonton: try NRCan High Resolution DEM (CanElevation series, open government licence) for the two Edmonton test lots and the lot tiles around them, from the official NRCan/open.canada.ca sources only; if a download is blocked or too big, do 64 Airport Rd NW (E06B) and 74 Airport Rd (E06A) only and list the rest as "?". Datum CGVD2013 per NRCan metadata.
- Tool: show grade on the set-up card (min–max, median, datum); use median grade as the base for height measurement only where the by-law measures from grade (read how each zone measures height: Vancouver ZDB definitions "height" / "base surface"; Edmonton Bylaw 20001 Height and Grade definitions) — if the rule is not settled, show grade only and flag "?"; flood check: Vancouver flood construction level where the register has it (4.6 m FCL near False Creek / 339 1st Ave E; datum of the FCL from the register/source) vs lot grade — flag ground floors and generators below it; Edmonton floodplain overlay as already in the tool.
- Register: patch for the LiDAR ground and HRDEM sources, check 1. Golden must not change except new grade fields; list changes; re-baseline only if all explained.

## Part B — simple redraw of the Emergency hub test fit
Redo both boards (whitemock/project/TestFit_EH_E06B.dc.html, TestFit_EH_V339.dc.html; keep the same file names) so they are readable at a glance, following J.B.'s reference (rooms as soft tinted blocks grouped by type, circulation spine, entrance arrows):
- Per storey plan + one section. Rooms grouped into: data hall; data-centre support; refuge + warming shelter; clinic; shared lobby and circulation; plant (generators, transformers, fuel, heat hub); public edge. One soft tint per group (muted, low-saturation; accent #CC746C only for problems); one label per group, not per room; leaders right-angled, labels off the drawing.
- Symbols only: entrance arrows (public, data centre, service), exit stairs, secure line (now inside the building by default, no fence — J.B. 4 Nov: the secure line may be the wall or inside the building; plant outside it gets its own enclosure, drawing choice), fence 1.9 m only where used.
- Beside the plan: a short group table (group, m², rooms count) and the room list collapsed below; code check as a short list: "Passes" (count) and "Needs fixing" (each with one line and clause). Fix the V339 fails: fence → 1.9 m or none; flood → raise refuge floor and generators to ≥4.6 m FCL using the new grade (and recheck the 18.3 m height with the raised floor).
- Screenshot each with Playwright from /home/claude and LOOK; fix overlaps and crossing leaders; the board must read clearly at 1440 px wide.
Update checks/research_typ/testfit_emergency_hub.md with the changes.

Report: checks/agents/2026-11-04_elev_redraw.md; reply under 150 words.
