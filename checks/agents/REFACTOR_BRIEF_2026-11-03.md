# Lean refactor brief (3 Nov 2026)

Repo `/mnt/attach/outputs`, branch `overnight-2026-10-30`. Commit only to this branch, as
`git -c user.name="Jenna Bruggeman" -c user.email="bangpowjenna@gmail.com" commit`, message ending:

```
Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Y7veAmNyDwsKK66yW3AD7W
```

Never push, never touch main, never commit raw/BCA/Altalis data, never add `.git-rewrite/`, `_stage/` or other untracked files you didn't create.

## Goal
Behaviour stays identical; numbers move out of code into data that carries its register id, and a test fails if any displayed number has no register entry.

1. **Constants and tables out of code.** In `tool/engine.js` (R equipment bases and ranges, zone tables, plant sizes), `tool/plant.js`, `tool/site.js`, `tool/decide.js`, `tool/addons.js`, `tool/tiers.js` (template rules), `tool/arch.js`: move literal figures and tables into JSON files under `tool/data/` (one per subject). Every entry: `{"v": <value>, "src": "<register id>"}` or the table carries a `src` per row. Use only ids that exist in `register/formula_register.json` (`new_sources`, quantities, or rule ids). Where a figure has no id, do not invent one: list it in `checks/agents/2026-11-03_refactor_unsourced.md` (file, line, value, what it is) and keep it working. Pure drawing constants (pixel sizes, colours, gaps) stay in code, marked `/* drawing */`.
2. **Wiring test.** Add `checks/tests/register_wiring.js`: loads every `tool/data/*.json`, fails on any number without a `src`, and on any `src` not found in the register. Also scan `tool/*.js` for remaining numeric literals ≥ 2 that are not marked `/* drawing */` or listed in the unsourced file, and report them (fail mode once the list is empty; report-only for now).
3. **Golden identical.** Before any change, run the golden: start the server `(setsid nohup python3 -m http.server 8766 -d /mnt/attach/outputs/tool >/dev/null 2>&1 &)`, then `cd checks/tests && NODE_PATH=$SP/node_modules node golden_run.js $SP/grX` (SP=/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad) and compare with `checks/golden/*.json` (8 lots). After each file, re-run; output must match exactly. Also run `MW=8 node arch_run.js` for one Edmonton lot (E06A) before and after; arch output must match. Restart the server if it has died. Commit per file once it matches.
4. **Bugs in touched code.** Fix only the sweep bugs in `checks/agents/2026-11-03_sweep_*.md` that sit in lines you are already moving, and only if the fix is a hard-rule or obvious defect; anything that changes golden output must be listed, not done.
5. Rebuild the register outputs if you touch the register: `for s in make_register_md make_diagram_data make_templates build_diagram; do python3 register/$s.py; done` (register changes only via `register/patches/*.py`).

## Report
Write `checks/agents/2026-11-03_refactor.md`: files moved, data files made, count of figures wired vs unsourced, golden result, bugs fixed, bugs found but left. Reply under 150 words.
