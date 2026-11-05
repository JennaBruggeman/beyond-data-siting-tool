# Hall placement fix (3 Nov 2026)

Repo `/mnt/attach/outputs`, branch `overnight-2026-10-30` only; commit as in REBUILD1_BRIEF_2026-11-03.md (same author and trailer). Never push. No made-up figures; "?" where no register id. Hard rules block. Read first: `checks/architecture_mode_notes_2026-10-30.md` (incl. 3 Nov: Edmonton site is 64 Airport Rd NW = E06B), `checks/agents/2026-11-03_rebuild1.md` (Q4), `tool/arch.js`, `tool/site.js`.

## Problem
With a ratio set, site.js draws the hall full width at the back of the buildable area and to the height limit, leaving a 3–7 m strip; programs (min sides 6 m) get "not drawn" though their floor share exists. That layout is a drawing choice, not a rule.

## Fix
1. Hall: draw it at the storeys its floor area needs (hall floor-to-floor from the register), over the smallest footprint that holds its rooms, not stretched full width. Try footprints from compact (near square) toward long, both along the back and along a side, and keep hard rules (yards, I-2/I-3/FC-2 hall off ground floor, height, FSR, plant yard, loading, keep-apart distances).
2. Programs: Arrange tries each program beside the hall at grade and on top of the hall when height remains; it evaluates hall footprint options and keeps the one that draws the most of the programs' floor share (ties: fewer storeys over the limit flags, then nearest the street for street-entrance programs). Deterministic.
3. A program still not drawn names the rule that stops it (height, FSR, minimum size or sides, zoning, BE cap, keep-apart, coverage), with its register id.
4. No ratio set: behaviour unchanged (golden must match exactly).

## Tests
Golden (8 lots) must match `checks/golden/*.json`. Arch: run `arch_run.js` on E06B, V339, E06A, CLARK with a 60/30 split and the default program set; screenshots; check nothing floats, overlaps, leaves the lot or breaks a hard rule; report m² of programs drawn vs share before and after. Update `checks/golden/arch/` with the new outputs (add E06B) and say so.

## Report
`checks/agents/2026-11-03_hallfix.md`; reply under 120 words.
