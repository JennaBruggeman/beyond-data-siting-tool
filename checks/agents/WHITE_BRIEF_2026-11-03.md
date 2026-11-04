# White interface on the real tool (3 Nov 2026)

Repo `/mnt/attach/outputs`, branch `overnight-2026-10-30`; commit as in REBUILD1_BRIEF_2026-11-03.md (author, trailer). Never push, never publish. Another agent works in parallel on the register, tool/data/zones.json, site.js lot-side facts and the People step: `git add` only the files you changed, and if git reports an index.lock, wait and retry.

Goal: replace the dark look with the approved white look in every template (resident, community, engineering, arch) and the report, with no change to any number or logic.

Look (J.B. approved; see the Design artifact boards and checks/architecture_mode_notes_2026-10-30.md "White interface"): white ground; hairlines #E4E4E2 (#E6E5E2 in mockup); text #1F2022 / #1E1F21, secondary #6E6E6B / #66655F; zone bands #F2F2F0, #E6E6E3, #D7D7D4; accent #CC746C only for selected or flagged items and key words; section cut black #1A1A1A; IBM Plex Sans 300/400/500 (fonts in tool/fonts if present, else Google Fonts); massing white faces with light grey sides (#EEEEEC, #E2E2DF), strokes #B9B8B4, soft shadow; right-angled leaders, labels off the drawing, aligned rows, Labels on/off toggle; quiet: no colour except the accent and the heat-view warm-to-cool scale (93,127,153 → 209,163,94). Reference mockup HTML: /tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/whitemock/project/*.dc.html.

Do: put colours in CSS custom properties (one token set) and replace hard-coded dark colours in tool/*.css, index.html and inline styles/canvas/three.js colours in tool/*.js (scene3d.js, kit3d.js, arch.js, report*.js, sheet.js, cards.js, flow.js, etc.). Mark drawing colours `/* drawing */`. Keep contrast at WCAG AA for text.

Tests: golden (8 lots) must match checks/golden/*.json exactly; arch baseline checks/golden/arch must match; register_wiring.js still passes. Screenshots of each template's main steps and the report for 64 Airport Rd NW (E06B) and 339 1st Ave E (V339) into checks/agents/white_shots/. List anything still dark.

Report: checks/agents/2026-11-03_white.md; reply under 120 words.
