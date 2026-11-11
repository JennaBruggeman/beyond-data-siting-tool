# Merge summary: site-f1 → main, for J.B.'s review (11 Nov 2026, read-only)

Nothing merged or pushed. main stays at 22e0272 (29 Oct) until you decide.

## Weaknesses first
- **Licensed text.** The register quotes NFPA, ASHRAE, CSA, FM and EN/ISO standards in about 55 entries, and in six old patch scripts. A rewrite into figures and clause numbers is under way (dated patch, no history rewrite). Merge after it lands, or main gets the quotes in its current files too. Both branches are public already, so the text is visible either way.
- **The README is out of date on both branches.** It still describes the October tool (195 parts). Visitors see main's README first.
- **The new interface is half the story.** The landing page and card walkthroughs are new, but Start still opens the old interface, Resident has no cards, and pool and cascade aren't in the tool. A merge now shows an unfinished tool as the default branch.
- **The repo copy of the cascade spec (tool/f1/specs/heat_cascade.md) is behind Claude Link.** Re-copy before the merge.
- **Large files on both branches, not new:** audit/scratch/s09/gw/well.csv (56 MB), lithology.csv (31 MB) and four edm_grid.geojson copies (22–33 MB) in site_maps/. Raw data the repo rules say shouldn't be committed (?). A merge doesn't change them. Removing them from the tree is a separate decision; from the history it would need another purge.
- **Not checked here:** the tool's behaviour on main vs site-f1 on any lot beyond the golden lots.

## What a merge does
- **Fast-forward.** main has no commits that site-f1 lacks: no conflicts. main becomes site-f1 exactly.
- **411 commits**, 29 Oct to 11 Nov. 997 files: 945 added, 52 changed, none deleted.

| Area | Files | What |
|---|---|---|
| checks/ (agents, research, F1, tests, golden) | ≈ 690 | Agent reports and screenshots (Vancouver only on GitHub), research for Architecture and typologies, test scripts, golden results |
| register/patches/ | 120 | Dated patches: 195 → 225 parts, 101 → 112 conditions, 800 → 1,711 sources |
| tool/ | ≈ 100 | New interface (landing, card shell, Municipal, Engineering, Architecture cards, logic view, intro), hub layout engine (hub.js, plan.js, treach.js), tool/data/*.json (register-wired figures), fonts |
| docs/, register outputs | rest | Icons; rebuilt register, diagram and templates |

## What changes for someone opening the public repo
- **Code:** the default branch shows the new interface's code. The landing page opens first; the old interface stays behind Start.
- **Golden results:** V09 and V339 change (re-baselined with the October–November decisions); four Architecture baselines are added (CLARK, E06A, E06B, V339).
- **.gitignore:** adds tool/data/ as tracked, ignores F1 board inputs and new screenshot folders, and ignores Edmonton screenshots. With your 11 Nov decision (images showing Altalis lot lines may be public), the Edmonton screenshot rules can stay as they are or be relaxed; the Altalis data files stay ignored either way.
- **No hosting changes:** GitHub Pages is off; nothing goes live from a merge.

## What I'd review first
1. The licensed-text rewrite diff (coming to you before any push).
2. README: a short current version (what the tool is, the four templates, how to run it, data rules). Proposed, not written.
3. Whether main should wait for "operational" (four templates, three typologies) or take site-f1 now as the work-in-progress branch.
4. The large raw-data files above: keep, remove from the tree, or purge.
5. tool/data/*.json and tool/f1/eh_fits/*.json: small, hand-written or derived; check none holds BC Assessment values beyond rounded figures (not checked here ?).
