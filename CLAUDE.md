# Beyond Data: instructions for Claude

Read this file, then the build plan, before any work in this repo:
**Build plan to Dec 10:** https://claude.ai/artifact/9127WfPaQqU8RbrGdhmLxd (a living doc; its Status table says where things stand).

Beyond Data is J.B.'s siting tool for urban data centres as neighbours (UBC M.Arch, ARCH 540; GP1 thesis is a separate study). The tool may widen beyond data centres into urban energy and resource symbiosis. The thesis stays on data centres.

---

## 1. Standing rules

- **Don't make things up.** Every number has a source, page or table, date and trust rating. Mark anything unverified. Never guess a number.
- **Primary sources only:** codes, bylaws, government and utility documents, peer-reviewed research. No news, blogs, Wikipedia or AI summaries.
- **Operator and industry figures are claims** (trust 50), labelled as such.
- **Don't circumvent paywalls or blocked sites.** Say what's behind them and that J.B. can get it through UBC Library.
- **Downloading needs J.B.'s explicit OK:** file name, source and size.
- **With every addition, update the templates** (resident, community, full), check whether it's relevant to each user group, and ask J.B. if unsure.
- **Ask when uncertain.** One question, options, a recommendation.
- **Writing:** Canadian spelling. Short, plain text. No long paragraphs. J.B. is not an engineer.
- **Style:** IBM Plex Sans; red #CC746C only for key words; greys; plain and professional; nothing that reads as AI-made.

## 2. Licensed data

| Data | Rule |
|---|---|
| BC Assessment (UBC Abacus) | Raw data never goes to Claude. Scripts in `tool/bca/` run on J.B.'s computer only. Only calculated, rounded values appear anywhere. |
| Altalis lot outlines (Edmonton, via EPSB GIS) | Academic use only, not for redistribution. Never in git, published artifacts or shared files. The published tool artifact runs without them. |
| City open data, Statistics Canada, NRCan | May be used and shown with attribution. |

## 3. Trust scale

100 arithmetic · 90 regulation, tariff or standard read directly · 80 government dataset · 70 peer-reviewed coefficient from another context · 60 derived with a stated assumption · 50 operator or industry claim · 40 proxy · 20 judged · 0 gap.

A part's trust is the lowest of its inputs. Ranges, not points. Burdens are recorded beside benefits, never netted.

## 4. Source of truth

- `register/formula_register.json` holds every part (195), formula, coefficient, source and trust rating.
- Generated from it, never hand-edited: `formula_register.md`, `diagram_data.json`, `templates.json` (+ copies in `tool/`), `workflow-map.html`. Rebuild steps are in `README.md`.
- Every register change is a dated script in `register/patches/` and is noted in the build plan's decisions log.

## 5. How work proceeds (from the build plan)

Phases, in order. Don't start one until the previous gate has passed and J.B. has said "go".

| Phase | Work | Gate |
|---|---|---|
| A. Mega clean | Freeze; build the checks; stage-by-stage review of all 195 parts; fixes | All tests pass; every part verified or marked; visual issue log done |
| B. Foundations | Facility profiles; place packs; design system | Golden results unchanged; design system approved |
| C. Interface and visuals | Apply the design system; size and draw every opportunity | Golden results unchanged; screen matches engine; J.B. approves |
| D. Symbiosis | Wastewater, sewer heat, waste-to-energy, rinks, one at a time | Each verified; data centre results unchanged |
| E. New places | UBC first; Toronto only if time | Each place pack verified like Vancouver and Edmonton |
| F. Final | Re-run every check; final design pass; package for Dec 10 | J.B. signs off |

**Principles:**

- One kind of change at a time: math fixes, design changes and new features never share a step.
- Checks exist before fixes.
- Reorganizing never changes results: golden results must stay identical.
- Every addition takes the path research → register → tests → visual → templates → gate.

## 6. Checks (built in phase A, used from then on)

| Check | What | Where |
|---|---|---|
| Excel workbook | Live formulas for every part, built separately from the code (openpyxl, recalculated with LibreOffice) | `checks/register_check.xlsx` |
| Golden results | 275 1st Ave E, 8803 Stadium Rd NW and 3–4 other lots | `checks/golden/` |
| Automatic tests | Engine vs golden results and workbook; run after every change | `checks/tests/` |
| Screenshots | Every screen at 1440, 1024 and 390 px | `checks/screens/` |
| Source agent | Opens each source; confirms value, page, date; labels claims | `checks/agents/` |
| Math agent | Didn't write the code; checks formulas, units, signs, range direction | `checks/agents/` |
| Display agent | Screenshots, labels, units, trust shown; logs visual issues | `checks/agents/visual_issues.md` |

Agents get the source and the code, **never the expected answer.** Reports are dated. A fix that breaks a golden result is undone.

Large multi-agent runs use a lot of usage. Run them stage by stage, and tell J.B. before starting a big one.

## 7. Each session

1. Read this file and the build plan's Status table; say where things stand.
2. Do that session's step; bring findings short, in a table.
3. J.B. decides anything uncertain.
4. Run the checks; commit.
5. Update the build plan's Status table and decisions log.
6. Remind J.B. to link her computer so the commit can be pushed.

## 8. Git

- Repo: `JennaBruggeman/beyond-data-siting-tool` (private).
- Commit as `Jenna Bruggeman <bangpowjenna@gmail.com>`, one commit per finished step, plain messages.
- Pushes go from J.B.'s computer through the Claude Link folder. Never print credentials.
- Never commit raw data, BC Assessment or Altalis files, map tiles, video or audio (see `.gitignore`).
- `lot_proforma/` is a separate project and stays out of this repo.

## 9. Design

- Design system decided once in phase B; nothing restyled screen by screen.
- Design passes: Impeccable (`/critique`, `/audit`, `/polish`) after phases C and F. Other skills only from GitHub links J.B. confirms.
- Opportunity visuals: one system for all, sized from the tool's numbers, shown even when they don't fit.
