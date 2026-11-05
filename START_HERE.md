# Beyond Data: start here (handover for Claude Code, 5 Nov 2026)

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
- Plan for the typologies, and the weak spots: Claude Doc "Beyond Data: Typology library (draft)", sections "Adjusting to any lot" and "Weak spots and their fixes".
- Design boards (mockups, not the tool): Cowork design artifact "Beyond Data white interface". Each board says whether it is a mockup; test-fit boards carry OUT OF DATE / TO RE-CHECK banners (5 Nov).

## Split between sessions

- **Claude Code (this repo):** all tool code, fixes, tests, git. The repo on J.B.'s computer is the only real copy.
- **Cowork:** research, clause reads, design boards, the typology doc, decisions with J.B. Cowork no longer edits tool code; its notes arrive through the Claude Link folder for Claude Code to commit.
- A board approved in Cowork comes with a short spec (screen, what changes, what stays). Build from that.

## Next, in order

1. Draw the inside loading dock in Arrange (a ground-storey block at the rear of the building on the drive side; the hall may sit over it). Today only Ratios counts it.
2. Loading count: the tool counts loading from the data centre's floor only (64 Airport Rd: 2,399 m², under the 2,500 m² trigger) instead of the whole building. Re-read Bylaw 20001 Table 7.2 / s. 5.80 (whole building or each use?) before changing it.
3. Sweep: for every lot in a data-centre zone (≈697 Vancouver, ≈5,232 Edmonton; ≈4,800 at ≥ 1,000 m²), the ground the one-rectangle fit wastes, plus lot depth and width. Read-only. A lighter run (no 3D, no screenshots, parallel pages) is needed for the time.
4. Zone rule: in Architecture mode, typologies only on lots where a data centre is permitted, conditional or discretionary; other lots say "not allowed here; rezoning needed".
5. Clause reads (with Cowork): fire access width (NBC/BCBC 3.2.5.6), plant in side yards, LiDAR vs flood-level datum, lobby size from occupant load (NBC 3.1.17, 3.4.3).
6. Emergency hub rule sheet: bands (forecourt → public → lobby → data centre → plant), one corridor spine, room minimum / target / rank, fallback ladder, leftovers become yards, plant never on the public edge, checks after every layout. Test on the six test lots against the hand test fits.
7. Independent check, then the other typologies (staged: cheap screen, then full layouts; 300-lot sample before all).

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
