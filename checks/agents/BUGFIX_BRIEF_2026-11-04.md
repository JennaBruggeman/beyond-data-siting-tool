# Fix the 8 open high-severity bugs (4 Nov 2026)

Repo `/mnt/attach/outputs`, branch `overnight-2026-10-30`; commit one bug per commit, author and trailer as in REBUILD1_BRIEF_2026-11-03.md. Never push or publish. No made-up figures; hard rules block (J.B.). Read checks/agents/2026-11-04_retest.md (evidence, probe scripts in /home/claude/retest/) and the original sweep reports for each bug.

Bugs (from the retest table):
1. Resident: lots open blocked (E05, E06B). Find why every set-up is blocked at open; the Resident template must open on a set-up that passes, or say plainly which rule blocks all of them.
2. Resident: MW slider offers up to 40 MW with the thumb at 0.1. Range from the lot's own feasible span (min and max that pass hard rules); start at a passing value.
3. Resident: an offered set-up doesn't fit (E123, 2.5 MW). Never offer a set-up the tool's own rules block.
4. Engineering: the noise note sits in the closed Sources fold. Show the noise result and required mitigation in the main text; sources stay in the fold.
5. Architecture/set-up: VI2L hall drawn 438 × 201 m. Fix the set-up cause (lot geometry reading); the hall must stay inside the lot.
6. Rules: V339 fence 7.6 m into the side yard. Fences in required yards follow the by-law (Vancouver caps fence height in required yards at 1.9 m; check the register entry) — either keep the secure line out of the yard or cap it and flag.
7. Rules: leased ground floor carries to I-3 unblocked. I-3 s. 2.2.11 bars bulk data storage at the ground floor except entrances: block it.
8. Rules: "Three options" shows failing option A (E123) without a warning. Mark failing options as blocked with the rule.

Tests: golden 8 lots and arch baseline (checks/golden/arch). Numbers may change only where a fix makes them change; list each changed field with the reason, and re-baseline only if all are explained. register_wiring.js passes. Re-run the retest probes for these 8.
Report: checks/agents/2026-11-04_bugfix.md; reply under 150 words.
