# Beyond Data: start here (handover for Claude Code, 5 Nov 2026)

**Work from `WORKLIST.md`:** every task in order, with owners and gates. This file is the background.

J.B. (Jenna Bruggeman, UBC M.Arch) — Beyond Data siting tool, ARCH 540 and the GP1 thesis. Branch `overnight-2026-10-30`. Nothing merges to `main` without J.B.'s approval. Never push `backup/pre-purge-2026-10-28`.

## Standards (every change)

- Every rule, figure, size and layout choice is sourced, indexed in the register, verified, and live in the logic diagram and templates. No source → "?".
- Primary sources only (codes, by-laws, government guides, filed drawings, standards). Label operator, maker and broker claims, our arithmetic, our reading, drawing choices.
- Don't circumvent blocked or paywalled sites.
- Hard rules (code, by-law) block. Rezonings, conditional uses and variances are flagged options, not blocks.
- Canadian spelling. Short text, no long paragraphs.
- Interface: white, greys, accent #CC746C for flagged items only, IBM Plex Sans. Drawing leaders right-angled; labels off the drawing.
- **Report weaknesses, gaps, what wasn't checked and anything out of date up front, unprompted, in every report.** Never hand over out-of-date work without saying so.

## Files and data rules

- Never commit raw data, BC Assessment data or Altalis data. Edmonton lot lines (Altalis, `tool/tiles/edm/l_*.json`) are academic use only: not for redistribution, and boards that show them stay inside the course.
- Don't commit NFPA, CSA, ASHRAE, BSI/IEC or other licensed PDFs or screenshots. ASHRAE PDFs are single-user: quote figures only.
- `tool/tiles/` (≈119 MB) and `data/` (≈2.8 GB) are git-ignored. The tool and tests need `tool/tiles/`; `data/` is only needed to rebuild tiles or grade.
- Deleting files in J.B.'s connected folders needs her permission.

## Register

- `register/formula_register.json` changes only through a patch in `register/patches/*.py` (one per change; keys starting with "_" are skipped).
- After any register patch, rebuild:
  `for s in make_register_md make_diagram_data make_templates build_diagram; do python3 register/$s.py; done`

## Tests

Serve the tool first: `python3 -m http.server 8766 -d tool` (from the repo root, in the background).
Then from `checks/tests/` (`NODE_PATH` = a node_modules with playwright, three, jspdf, jspdf-autotable; set `PW_EXE` only if Playwright needs a specific browser):

- Golden, 8 lots: `node golden_run.js <outdir>`; compare with `checks/golden/*.json`. **Known flaky:** `answers.mwPick` flips to "large" on some lots (a `tiers.js` timer race). Ignore that field only.
- Architecture baseline: `SPLIT=60/30 node arch_run.js <outdir> CLARK E06A E06B V339`; compare with `checks/golden/arch/`. Explain every changed field before re-baselining.
- Ratios probe: `EXPR="<async js>" node ratio_probe.js E14715 E4103 E06B V339 E05`.
- Register wiring: `node register_wiring.js` must pass.

Commits: author "Jenna Bruggeman" <bangpowjenna@gmail.com>, with the Co-Authored-By and Claude-Session trailer lines used in the history.

## Where things are

- Decisions and history: `checks/architecture_mode_notes_2026-10-30.md` (the main record; read the 3–5 Nov entries first).
- Agent briefs and reports: `checks/agents/`.
- Research: `checks/research_arch_v1/` (zones, heights, uploads, facility conflicts), `checks/research_typ/` (one file per typology, code checklist, test fits).
- Build plan to Dec 10 (Claude Doc linked in CLAUDE.md): written 24 Oct, **out of date**; this file's order replaces it.
- Plan for the typologies, and the weak spots: Claude Doc "Beyond Data: Typology library (draft)", sections "Adjusting to any lot" and "Weak spots and their fixes".
- Design boards (mockups, not the tool): Cowork design artifact "Beyond Data white interface". Each board says whether it is a mockup; test-fit boards carry OUT OF DATE / TO RE-CHECK banners (5 Nov).

## Split between sessions

- **Claude Code (this repo):** all tool code, fixes, tests, git. The repo on J.B.'s computer is the only real copy.
- **Cowork:** research, clause reads, design boards, the typology doc, decisions with J.B. Cowork no longer edits tool code; its notes arrive through the Claude Link folder for Claude Code to commit.
- A board approved in Cowork comes with a short spec (screen, what changes, what stays). Build from that.

## Next, in order (whole build to Dec 10)

Gate each step: tests pass, weaknesses reported, J.B. says "go" before the next.

**A. Architecture: fixes the sweep would inherit**
1. Draw the inside loading dock in Arrange (a ground-storey block at the rear of the building on the drive side; the hall may sit over it). Today only Ratios counts it.
2. Loading count: the tool counts loading from the data centre's floor only (64 Airport Rd: 2,399 m², under the 2,500 m² trigger) instead of the whole building. Re-read Bylaw 20001 Table 7.2 / s. 5.80 (whole building or each use?) before changing it.

**B. Architecture: typology library**
3. Sweep: for every lot in a data-centre zone (≈697 Vancouver, ≈5,232 Edmonton; ≈4,800 at ≥ 1,000 m²), the ground the one-rectangle fit wastes, plus lot depth and width. Read-only. Needs a lighter run (no 3D, no screenshots, parallel pages).
4. Zone rule: in Architecture mode, typologies only on lots where a data centre is permitted, conditional or discretionary; other lots say "not allowed here; rezoning needed".
5. Clause reads (with Cowork): fire access width (NBC/BCBC 3.2.5.6), plant in side yards, LiDAR vs flood-level datum, lobby size from occupant load (NBC 3.1.17, 3.4.3).
6. Emergency hub rule sheet: bands (forecourt → public → lobby → data centre → plant), one corridor spine, room minimum / target / rank, fallback ladder, leftovers become yards, plant never on the public edge, checks after every layout. Test on the six test lots against the hand test fits.
7. Independent check; then the other typologies, staged (cheap screen, then full layouts; 300-lot sample before all). Typologies: Emergency hub, Warm bath, Community pool, Aquaponics, Food hub, Conservatory, Heat cascade, Shelter + laundry; add-ons Heat hub and Public edge (`checks/research_typ/`, Typology library doc). Realistic for Dec 10: 2–3 automated, the rest hand-drawn on 64 Airport Rd and 339 1st Ave E (in Cowork).
8. Program and Conditions views in Arrange (plan and section, each room's needs), from Cowork boards.
9. Typology library in the tool (picker, variants, add-ons).

**C. Other templates** (four only: Resident, Municipal, Engineering, Architecture; each its own report; same white look, header and source style; specs in the notes file, "Templates" and "Reports per template", 3 Nov)
10. Remove the Community template (tier id `community` in tiers.js, flow.js SKIP, templates.json, register tier tags); move anything only it showed to Resident or Engineering.
11. Resident: select a data centre on the map, export a report about that one facility: generic graphic by type (stand-alone, hyperscale, tower), location map, stills from the "how it works" video, plain answers on noise, heat, water, power. One number per figure (spec sheet first). Board: Resident1–2 (VAN3 Cologix). Facility figures: notes, "Facility figures" (4 Nov) and `checks/research_arch_v1/inv_*`.
12. Municipal: select a parcel, get its regulations (incl. each lot edge's class and yard); two-city comparison on the last page. Plan: Claude Doc https://claude.ai/artifact/9WuA4zPVKKKe1SuhcpvoXr. Boards: Municipal1–2.
13. Engineering: J.B. has changes in mind but hasn't given them yet. Ask before starting.

**D. Finish**
14. Full check round (golden, Architecture baseline, register wiring, every template's report), Excel recalculation check of the register templates, independent check.
15. Publish to the live page only after J.B. reviews.

**Sourcing check on every step ("nodes"):** every new rule or figure gets a register id via a patch, shows in the logic diagram (`register/diagram_data.json`, `build_diagram.py`) and the templates after the rebuild, and `register_wiring.js` must pass (it reports numbers in `tool/data` not wired to the register and unmarked literals in `tool/*.js`).

## Also open (found 5 Nov in memory, old files and the catalogue; check before building on them)

- **The repo is public** (since 28 Oct, for the mid-review page). Nothing course-only (Altalis lots, boards that show them) and no licensed files may go in. Source PDFs live in the private repo `beyond-data-sources`.
- **Studio dates:** match a user by Nov 6; peer reviews Nov 13/17 and Nov 27; final Dec 10. User tests with practising architects (≈45 min) are being recruited, so the tool must run end to end before them.
- **One build only:** the tool lives in this repo; the Cowork session is the only chat that worked on it (J.B., 5 Nov). Nothing to merge from elsewhere.
- **Dropped items still in the data:** Twin is still a typology in `tool/data/arch.json` (dropped by J.B.; Ratios' hold-back can pick it); aquarium and lumber drying (dropped) and food drying and winter garden ("out for now") are still in `tool/arch_programs.json`. Remove or hide them. Climbing wall stays (J.B. kept it).
- **Users do not arrange blocks** (J.B., 5 Nov: too complicated). The typology library lays everything out; users pick a typology, a variant and add-ons. No drag, no free arranging.
- **On hold since 3 Nov:** public ground floor under the hall (Build 2 part 5) and basements. Decide with J.B. whether they become typology variants.
- **Facility inventory for the Resident map:** the 4 Nov figure decisions are in `checks/research_arch_v1/inv_*.md` and the notes ("Facility figures"), not yet in the tool. Wolfpaw EDM2 and EDM3 show as space inside the Qu buildings; EDM1 at 10060 Jasper Ave. TELUS Garden data centre address still to find (City permits).
- **Open source items, 28 Oct:** `checks/open_items_sorted_2026-10-28.csv`, 374 rows (23 for J.B., 46 may change a number). Not re-checked since; some were settled by check 2 (decisions 1–16 applied, 8179ccb). Re-sort before using.
- **Paywalled standards:** `checks/paywalled_standards.md`. Remind J.B. of it now and then; she gets them through UBC Library.
- **Older to-dos (Oct, status not re-checked):** tower floor areas (596 Vancouver towers on an estimate; BC Assessment gross area pending Jeremy Buhler's written OK); NEU sewage heat 3.2 vs 2.5 MW; LRMC range; Edmonton parking stall 23.4 m²; FortisBC 2026 gas cost; the ten electricity and water avenues J.B. wanted in the tool (19 Oct) — check which are built.
- **Standing rule:** with every research addition, update all four templates, check whether it is relevant to each user group, and ask J.B. when unsure.
- **Old archive:** `checks/archive_2026-10/` (check 2 decisions, fix lists, briefs). Historical; the notes file wins where they differ (e.g. old notes say a 2.4 m fence; it is now 1.9 m everywhere).
- **Reminders:** remind J.B. to link her computer / push at the end of each work round and before reviews.

## Open decisions for J.B.

- Loading inside the building as the Architecture default (assumed yes until she says otherwise).
- Plant room added automatically by the noise ladder vs asking first (recommended: automatic with a note).
- Ratios hold-back before any picks (smallest library typology).
- Support share 27–33 %.
- Heat cascade placement breaks (spa on storey 2; greenhouse on the pool hall roof).
- Engineering template changes (not yet given).

## Known weak spots now

- Ratios runs 7–16 % above the hand test fits with the Emergency hub: the shared lobby has no sourced size.
- 1425 Clark Dr went 2.8 → 4.9 MW with the loading fix; not checked by hand.
- Edmonton site grade "?" (government elevation sites blocked); LiDAR vs flood-level datum "?".
- I-3 lots counted whole; only sub-area A allows a data centre, and the tool doesn't know the sub-area. CD-1 lots not read.
- The yard packer has had bugs (units over the footprint); no test guards it yet.
