# Agent check of new Architecture-mode sources (hand-over, refuge placement, security, open items, standards J.B. supplied), 1 Nov 2026

You did not find these sources; another agent did. Your job is to re-read each source independently and confirm or correct every claim its register text makes.

For each source id in your batch (list in checks/research_arch_v1/check_r3_batches.json, your batch index given in your prompt):
1. Read its text in register/formula_register.json -> new_sources[id]. Also read the topic file it came from (checks/research_arch_v1/*.md) for context.
2. Open the URL (or, for "local copy" sources with no URL, find the file under data/ or sources/ in the repo; if not found, mark UNREACHABLE).
3. For every figure, quote, clause number, page, date, title and issuer in the text: CONFIRMED / WRONG (give the right value) / NOT FOUND (not in the source) / UNREACHABLE. Quote the evidence exactly (short).
4. Check the KIND label (rule, government guide, peer-reviewed, operator claim, maker claim, benchmark outside Canada...) and say if it should change. A rule used outside its scope (e.g. a residential guideline applied to a data centre) is a scope flag.
5. If the text needs changing, write new_text: the full corrected source text, same style, with "‖ CHECK 2 (1 Nov 2026, <ok|fixed>): <one line>" appended.

Rules: never circumvent a blocked or paywalled page (no archives, mirrors, other fetchers) - mark UNREACHABLE and move on. Don't invent. Canadian spelling. Edit no file except your output.

Output: checks/research_arch_v1/checkR3_result_<batch>.json:
{"<id>": {"where_read": "...", "claims": [{"claim": "...", "verdict": "CONFIRMED|WRONG|NOT FOUND|UNREACHABLE", "evidence": "...", "fix": "..."}], "kind_change": null or "...", "scope_flag": null or "...", "new_text": null or "..."}}
Final message: under 120 words: counts by verdict, and the most serious problems.

Note for fmDS0532, nfpa37_2024, nfpa75_2024, nfpa855_2026, ashrae621_2022: these were read from J.B.'s uploads or screenshots of read-only pages. For FM 5-32 and ASHRAE 62.1 the text is extracted at /tmp/fm/fm.txt and /tmp/a.txt (check against them). NFPA texts cannot be re-opened by you (NFPA Free Access needs a login): mark their claims UNREACHABLE unless a public NFPA page confirms them; do not use other copies.
