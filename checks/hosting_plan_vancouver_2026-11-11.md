# Hosting plan: a Vancouver-only public version (11 Nov 2026, plan only)

Nothing deployed. Needs J.B.'s OK before any step that publishes.

## Weaknesses first
- **Tested only the new interface's card walkthroughs** with Edmonton blocked (checks below). The old interface behind Start, the PDF report and the logic view were not run that way.
- **The register's licensed quotes would go out with it** (tool/opps.json, tool/logic.json) unless the rewrite lands first.
- **Vancouver tiles become a public download.** That's redistribution of City of Vancouver open data, allowed under the Open Government Licence – Vancouver with attribution (our reading of the licence; the exact wording to copy is not checked ?).
- **Needs the internet:** three.js comes from cdnjs, one font file from Google Fonts.
- **Not a final product:** the same gaps as the tool (Resident cards, pool and cascade, Start on any lot).

## What it needs
1. **A city setting** (one line in the tool, e.g. `BD.cities=['van']`) that hides:
   - the Vancouver/Edmonton switch in the card header and the landing page;
   - the Edmonton half of "Your city" (all templates) and Architecture "Compare";
   - Edmonton facilities on the Resident map (when built);
   - Edmonton in the old interface's city picker.
2. **A deploy branch, not main** (e.g. `pages`): the contents of tool/ at its root, plus tool/tiles/van/ (36 MB, 237 files). tool/tiles/edm/ never goes in. Built by a small script from site-f1, so main and site-f1 never hold tiles.
   - GitHub Pages serves a branch's root or /docs; limits: site up to 1 GB, files under 100 MB, about 100 GB a month of traffic (GitHub's published limits, not re-read ?).
   - Size: 17 MB tool + 36 MB tiles ≈ 53 MB.
3. **Attribution page and footer:** City of Vancouver Open Data (property parcels, tax report 2026, building footprints 2009, floodplain), City of Vancouver LiDAR 2022 (heights, ground levels), with licence name and link. Statistics Canada and NRCan where the cards use them.
4. **A check before each deploy:** the F1 gate run with /tiles/edm/ blocked, no page errors; a file list of the deploy branch with no tiles/edm, no Altalis, no licensed PDFs.
5. **Turn on Pages** for the `pages` branch (repo setting, J.B.'s OK).

## What breaks today with Edmonton blocked (probe, 11 Nov)
Run: every card of Municipal, Engineering and Architecture on 339 1st Ave E, then the Edmonton switch, with every /tiles/edm/ request answered 404.

| Where | What happens |
|---|---|
| "Your city", all three templates | Console error (tiles/edm/meta.json 404); the Edmonton half can't draw |
| Architecture "Compare" | Same error; the Edmonton comparison is missing |
| Edmonton switch | Header shows "146402 (lot not loaded: tiles/edm/meta.json 404)" |
| Every other card | No errors |

No page errors (uncaught exceptions) anywhere. Only meta.json was requested: no Edmonton lot, building or receiver tiles were reached from Vancouver cards.

## Effort
About 1–1.5 days: the city setting and its five places, the deploy script, the attribution page, the blocked-Edmonton gate. Then deployment on your OK.
