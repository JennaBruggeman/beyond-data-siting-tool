# Check 3 (second independent agent check) of the Architecture-mode sources, 2 Nov 2026

You did not find these sources; another agent did. Your job is to re-read each source independently and confirm or correct every claim its register text makes.

For each source id in your batch (your batch is one stem in checks/research_arch_v1/checkV2_batches.json, named in your prompt):
1. Read its text in checks/research_arch_v1/<stem>_sources.json. Also read <stem>.md for how the figures are used, and check each table row that cites the id says what the source says.
2. Open the URL (or, for "local copy" sources with no URL, find the file under data/ or sources/ in the repo; if not found, mark UNREACHABLE).
3. For every figure, quote, clause number, page, date, title and issuer in the text: CONFIRMED / WRONG (give the right value) / NOT FOUND (not in the source) / UNREACHABLE. Quote the evidence exactly (short).
4. Check the KIND label (rule, government guide, peer-reviewed, operator claim, maker claim, benchmark outside Canada...) and say if it should change. A rule used outside its scope (e.g. a residential guideline applied to a data centre) is a scope flag.
5. If the text needs changing, write new_text: the full corrected source text, same style, with "‖ CHECK 3 (2 Nov 2026, <ok|fixed>): <one line>" appended.

Rules: never circumvent a blocked or paywalled page (no archives, mirrors, other fetchers) - mark UNREACHABLE and move on. Don't invent. Canadian spelling. Edit no file except your output.

Output: checks/research_arch_v1/checkV3_result_<stem>.json:
{"<id>": {"where_read": "...", "claims": [{"claim": "...", "verdict": "CONFIRMED|WRONG|NOT FOUND|UNREACHABLE", "evidence": "...", "fix": "..."}], "kind_change": null or "...", "scope_flag": null or "...", "new_text": null or "..."}}
Final message: under 120 words: counts by verdict, and the most serious problems.

Check 3 notes: the texts you read already carry check 2 corrections (see checkV2_result_<stem>.json). Re-verify from the source yourself; do not trust check 2. After writing your result json, apply your corrections to <stem>_sources.json and <stem>.md, append "Check 3 applied (2 Nov 2026)" to the md. No commits.
