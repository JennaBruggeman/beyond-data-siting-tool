# Verification sweep — brief for every agent (17 Oct 2026)

## The project
"Beyond Data" is J.B.'s UBC M.Arch thesis tool. It shows what a data centre on a real parcel in **Vancouver** or **Edmonton** could exchange with its neighbourhood (heat, electricity, water, materials, people), as trade-offs. No scores, no verdicts. The two cities get equal treatment.

J.B. is worried that one wrong number undermines the thesis. Your job is to **find errors**, not to reassure. Be specific, quote what the tool says, and say what the source actually says.

## Where things are (all under /mnt/user-data/outputs)
- `tool/`: the web tool. JS files: engine.js (core figures, R constants, SRC2/SRC3 source strings), plant.js (equipment sizing), cards.js, addons.js (add-ons: solar, battery, rain, generators, cooling), opps.js (opportunities, gates), compare.js, decide.js (set-up cards), explain.js ("How it works" cards and charts), extras.js (limits), site.js, scene3d.js, flow.js (guided path and report), index.html (map, parcel selection, lot area).
- `tool/*.json`: opps.json (opportunity and add-on register, 139 quantities, 496 sources), precedents.json (130 sites), receivers_*.json, census_*.json, ev_*.json, nrcan_pv.json, water_permits_van.json, etc. `tool/*.py` builds them.
- `formula_register.json` / `.md`: every quantity's formula, coefficients, confidence and sources (139 quantities, 101 conditions). `sources/01…25_*.md`: research reports with URLs and quotes. `verification_report.md`: an earlier check (9–10 Oct). `gap_register.md`, `parity_audit.md`, `tool_logic_decisions.md`.
- `data/`: primary documents downloaded earlier (PDFs, xls, csv, epw). Check these first before going to the web.

## Rules (from J.B.)
1. **Don't make things up or assume.** If you can't confirm something, say "unverified" and why. Never present a guess as a finding or as a correction.
2. **Don't circumvent blocked sites.** If WebFetch or WebSearch can't reach a page, do NOT use curl, Python or other HTTP clients, mirrors, caches or archives to get it. Record it as "unreachable".
3. **No popular sources.** News articles, blogs and Wikipedia don't count as evidence. Operator or vendor statements are **claims** and must be labelled as claims.
4. **Report only. Do not edit any file in tool/ or the registers.** You may write scratch files under /tmp or under `/mnt/user-data/outputs/audit/scratch/`.
5. **BC Assessment licence:** do not open or send any raw BC Assessment data file. The user guide PDF is fine.
6. Canadian spelling in your text.

## What counts as a finding
- **calc**: wrong arithmetic, wrong units or conversions (kW/MW, m²/ft², GJ/MWh, per year vs per hour), lo/hi swapped, a formula that doesn't match the register, rounding that changes meaning, NaN/negative/absurd output.
- **source**: the value, date, page, quote, clause number or attribution doesn't match the source; a claim labelled as fact; an outdated value where the source has a newer one; a dead or wrong citation.
- **consistency**: the same fact stated differently in two places (e.g. a grid factor 18.1 g/kWh in one place and 22.8 in another), or the tool's constant differs from the register.
- **parity**: Vancouver and Edmonton handled differently without a reason.
- **wording**: text that states more than the source supports (overclaiming), or misleads.

Severity:
- **critical**: a headline number or verdict-like statement is wrong.
- **major**: a displayed figure is wrong, or a source misrepresented.
- **minor**: small numeric or citation slip that doesn't change meaning.
- **note**: unverifiable or worth a look.

## Running the tool
- Server: `cd /mnt/user-data/outputs/tool && (curl -s -o /dev/null localhost:8765 || (setsid nohup python3 -m http.server 8765 >/dev/null 2>&1 &))`
- `node /mnt/user-data/outputs/audit/harness.js <arg> <out.json>` walks the whole guided path and dumps every step's text plus `BD.eng.siteFacts()`. `<arg>` is `0` or `1` (the worked examples: 1425 Clark Dr, Vancouver; and the Edmonton example), or a parcel hash such as `van-m1_1-13860893` (1169 Richards St, empty lot) or `van-2_1-23060741`. It takes about 3–4 minutes, so use a Bash timeout of 300000. Run several in the background in parallel if you need more.
- Edmonton parcel hashes look like `edm-<tile>-<id>`. To find them, read the tile files in tool/tiles, or select via `BD.select` in a custom script.
- In page scripts you can evaluate `BD.eng.siteFacts()`, `BD.model()`, `BD.eng.R`, `BD.S.answers`.

## Output
Return findings in the requested schema. Each finding must quote the tool or register text exactly, give the location (file:line or the step and parcel), and give the evidence (source URL or local file and page, with a short quote under 15 words, or your recomputation shown).
