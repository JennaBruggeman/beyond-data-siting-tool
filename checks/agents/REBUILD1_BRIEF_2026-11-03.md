# Architecture rebuild, part 1 (3 Nov 2026): DC rooms in the register, People step, Ratios tab

Repo `/mnt/attach/outputs`, branch `overnight-2026-10-30` only. Commit as
`git -c user.name="Jenna Bruggeman" -c user.email="bangpowjenna@gmail.com" commit`, message ending:
```
Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Y7veAmNyDwsKK66yW3AD7W
```
Never push. Don't add untracked files you didn't create. No made-up figures: every number shown carries a register id; anything without one shows "?". Operator and maker claims are labelled as claims. Hard rules (code, by-law) block; Canadian spelling; short text.

Read first: `checks/architecture_mode_notes_2026-10-30.md` (all decisions, esp. 3 Nov), `tool/arch.js`, `tool/flow.js`, `tool/data/arch.json`, `checks/research_arch_v1/dc_rooms.md` and `dc_rooms_sources.json` (+ checkV2/V3 results), `checks/agents/2026-11-03_refactor.md`. Wireframes: the boards People, Ratios, Arrange in the Design artifact, described in the notes; white look tokens in the notes.

## 1. DC rooms into the register
Patch `register/patches/dc_rooms_2026_11_03.py` in the style of `arch_v2_programs_2026_11_02.py`: add the `arch_dc_*` sources with kinds, check log 1–3 from the check result files; add arch-tier quantities for each room the research sizes (data hall per MW, electrical room per MW, battery room per MW Li-ion, plus any others with sourced rules); rooms with no size rule are listed with "?". Then rebuild: `for s in make_register_md make_diagram_data make_templates build_diagram; do python3 register/$s.py; done`. Room figures go in `tool/data/dc_rooms.json` with `src` ids; `checks/tests/register_wiring.js` must pass for it.

## 2. People step in Architecture
Remove `social` (the People step) from arch's SKIP set in flow.js so it shows just before Design. Context only: no scoring. Reuse the existing People view; check it renders in arch for one Vancouver and one Edmonton lot.

## 3. Ratios tab (Design: Ratios, Arrange, Exchange, Compare)
- Design group tabs as in the wireframe. Ratios comes before Arrange.
- Building coverage: slider up to the zone's coverage limit where the register has one, else up to the buildable area inside yards, with the limit shown as "?" if not sourced.
- Floor-area split: data centre % and programs %, of the allowed floor area (min of FSR × lot and the envelope, as arch.js budgets already compute). Unused shown.
- The DC share sets MW: invert the hall + rooms sizing from part 1 (hall m² per MW range gives an MW range; show the range, don't pick a midpoint unless the register does). Feed that MW into `BD.S.answers.mw` for Arrange.
- The space budget in Arrange then uses the programs share; Arrange shows the split as one line with "Edit ratios".
- Hard rules still block (height, FSR, BE caps, zoning).

## Tests
- Server: `(setsid nohup python3 -m http.server 8766 -d /mnt/attach/outputs/tool >/dev/null 2>&1 &)`. SP=/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad.
- Golden: `cd checks/tests && NODE_PATH=$SP/node_modules node golden_run.js $SP/grR1` must match `checks/golden/*.json` exactly (non-arch templates unchanged). If a register rebuild changes golden, stop and list why.
- Arch: `arch_run.js` on E06A, V339 and one more lot; screenshots; check nothing floats, overlaps, leaves the lot or breaks a hard rule. Write the new arch outputs to `checks/golden/arch/` as the arch baseline.
- Run `register_wiring.js`.

## Report
`checks/agents/2026-11-03_rebuild1.md`: what changed, figures added with ids, "?" left, test results, screenshots paths, open questions. Commit per part. Reply under 150 words.
