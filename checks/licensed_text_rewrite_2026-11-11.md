# Licensed-standard text in the register: rewrite, diff summary (11 Nov 2026)

Patch: register/patches/licensed_text_rewrite_2026_11_11.py (J.B. 11 Nov 2026: figures plus clause numbers; no history rewrite). Committed locally, **not pushed**.

## Weaknesses first
- **Git history keeps the old text** (as agreed).
- **checks/ research files still hold the original quotes**: about 40 files, mostly checks/research_arch_v1/*.json and *.md (FM, ASHRAE, CSA, EN, NFPA; longest about 30 words, a few candidate passages of 112–234 words). Two old patches (uploads_4nov_b_2026_11_04.py, heights_uploads_2026_11_03.py) load some of these files at run time, so re-running those patches from scratch would bring quotes back. Not edited: your call.
- **Also still quoted:** checks/eng_export/V339/eng_V339.json (a tool export; the next re-export refreshes it), booklet/logic/ALL_PARTS_MATH.md, checks/sweep/ and checks/check2/ results (short lines).
- **Paraphrases closest to a meaning shift** (reviewed; one fixed):
  - ASHRAE Ch. 45 recirculation: kept the "can" ("can be a serious risk"; the agent's first version said "is"). Fixed.
  - NFPA 37 4.1.1.1: kept "readily accessible (NFPA 37's defined term)" (J.B. 11 Nov; first version said "easy to reach").
  - FM 1-40 2.2.1.3: the original covers a levee **or other man-made flood-control works**, so the scope stays: "not in an area whose flood protection is a levee or other constructed flood-control works" (J.B. 11 Nov; first version said "relies on a levee or other built flood defences", which changed "protected by").
  - ASHRAE Ch. 52 pipe depth: "within about 50 mm of the surface" → "about 50 mm or less below the surface".
  - EN 12572 decimal commas now points (3,10 → 3.10 m).
- **Scope calls to confirm.** Treated as in scope (the quoted words may be the standard's): Weyburn fire department's C282 summary, Alberta STANDATA quoting CSA C22.1, the CE Code phrase "in conformance with CSA C282", one C282 quote in a City bulletin, one BS EN 12572-2 figure. Left out: OP S710 (Finnish insurer, like FM, 6 quotes), Energiforsk quoting EN 253, the ASHRAE activity label via EnergyPlus, a City document restating NFPA 96, a trade report on ASHRAE, CCOHS wording, government codes, titles and status labels.
- **register_wiring.js fails, as it did before:** 11,856 "number has no src" in tool/data/lot_types.json. Identical at HEAD without this change, so not caused by it; still a failing test on the branch.

## What changed
- 205 quoted passages in 63 register entries (sources, one quantity's coefficient, check-log lines) became plain paraphrase with every figure, unit and clause, table and page number kept. Figures compared before and after: none dropped or added (notation only: W/m2 → W/m², "ten ft (three m)" → "10 ft (3 m)").
- Largest: FM 5-32 (13 → 1 title left), ASHRAE Handbook ch. 52 (14 → 0), CSA Z8000 ch. 12 (12 → 0), NFPA 37 (10 → 1 title), ASHRAE pools (10 → 0), CSA B139 and Z8000 ch. 9 (9 → 0), CSA C448 and FM 5-32 rooms (8 → 0), NFPA 75 and CSA B52 (7 → 0). Full table: the agent's report in this session.
- The quotes left in those entries are titles, SCC status labels, the hub spec's and the City's own words.
- **13 old patch scripts** had the same passages replaced, each with the line "11 Nov 2026: quoted text replaced by paraphrase": nfpa37, nfpa37b, nfpa75, nfpa855, ashrae621, ashrae621_uploads, fm532, heights_uploads, uploads_4nov_b, loop_case_pair, gen_test, add_research, fix_sweep_B7_verified.
- **Regenerated:** formula_register.md, diagram_data.json, workflow-map.html, tool/opps.json, tool/logic.json. templates.json unchanged.
- **Search after the rebuild:** none of the 205 old passages remain in the register or any generated file.

## Tests
- Golden: every lot ok (V09, E05, CLARK, E123, V339, E06A, E06B, HAST).
- The patch is idempotent (run three times; nothing changes after the first).
- register_wiring: as above.
