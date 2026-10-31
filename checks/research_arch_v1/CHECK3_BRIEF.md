# Check 3 (second agent round) of the Architecture-mode sources, 31 Oct 2026

Check 2 changed or flagged these sources (list: checks/research_arch_v1/check3_batches.json, your batch index in your prompt). You are a third, independent reader. For each id:
1. Read the CURRENT text in register/formula_register.json -> new_sources[id] (it already includes check 2's corrections), and what check 2 said (checks/research_arch_v1/check2_result_*.json, same id).
2. Open the source yourself and re-check every claim check 2 marked WRONG, NOT FOUND or UNREACHABLE, plus check 2's corrections, plus any kind_change or scope_flag. Also re-read the source's main figure(s) once.
3. Verdict per item: AGREE (check 2 was right and the current text is right) / DISAGREE (give evidence and the right text) / STILL UNREACHABLE.
4. If the current text still needs changing, give new_text (full text, same style), ending "‖ CHECK 3 (31 Oct 2026, <ok|fixed>): <one line>".
Rules: never circumvent blocked or paywalled pages; don't invent; Canadian spelling; edit nothing except your output.
Output: checks/research_arch_v1/check3_result_<batch>.json:
{"<id>": {"where_read": "...", "items": [{"item": "...", "verdict": "AGREE|DISAGREE|STILL UNREACHABLE", "evidence": "..."}], "new_text": null or "...", "kind_change": null or "..."}}
Final message: under 120 words: counts, and any disagreements with check 2.
