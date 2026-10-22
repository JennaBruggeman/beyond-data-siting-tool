# Beyond Data

A siting tool for urban data centres as neighbours. Give it a real lot in Vancouver or Edmonton. It works out what data centre could fit there and what that building could exchange with the people and buildings around it: heat, energy, water, materials, and people and place. Every figure carries its formula, its sources and how far to trust it.

Jenna Bruggeman, M.Arch. GP1 thesis and ARCH 540, UBC School of Architecture and Landscape Architecture, 2026.

The results are trade-offs, not verdicts. This is an early feasibility study: it shows professionals where to look first. It doesn't replace engineering, planning or legal review.

**[Watch the pitch (5:10, Vimeo)](https://vimeo.com/1238531048)**

## Run the tool

```
cd tool
python3 -m http.server 8766
```

Then open http://localhost:8766. Map tiles (`tool/tiles/`) are kept out of git because of their size and licences; see "Data that stays out" below.

## What's where

| Folder | What it holds |
|---|---|
| `tool/` | The tool itself: `index.html` plus its scripts and data. The `make_*.py` scripts build its JSON from city open data. |
| `register/` | The logic behind every number. `formula_register.json` is the single source: every part, formula, coefficient, source and trust rating. The other files are built from it (see below). |
| `register/patches/` | Dated one-off updates already applied to the register. Kept as a record; check one before running it again. |
| `site_maps/` | Best sites in each city for each exchange, on a 100 m grid: factors, three weightings, robustness and a land check. Start with `METHODS.md` and `WHAT_AFFECTS_THE_RESULTS.md`. |
| `site_models/` | Footprints and heights around the field sites, from City data. |
| `booklet/` | Booklet graphics: the 704-sources grid and the logic-diagram pages (`booklet/logic/`, with the full math in `ALL_PARTS_MATH.md`). |
| `pitch/` | The pitch video: animations (`anim/`), tool recordings (`tool-shots/`), chapter marks (`chap/`), the voiceover build (`build/`) and the script. |
| `sources/` | Research notes by topic (01–17): what each source says and where it is used. |
| `audit/` | Verification sweeps, sensitivity studies and their working files. A record of checks, not needed to run anything. |
| `bench/` | Benchmarks and tests: the heat and size chains against known cases. |
| `node_studies/`, `style_studies/` | Studies for the logic diagram and the visual style. |
| `docs/` | Hand-offs, decisions (`tool_logic_decisions.md`), reviews, and the calibration and verification reports. |
| `archive/` | The first single-file version of the tool. |

## Rebuilding after the register changes

Edit `register/formula_register.json`, then run, from `register/`:

1. `python3 make_register_md.py` writes `formula_register.md`, the readable version.
2. `python3 make_diagram_data.py` writes `diagram_data.json`, the 195 parts and 261 links.
3. `python3 make_templates.py` writes `templates.json` (the Everyday, Civic and Technical levels) and the tool's copies in `tool/`.
4. `python3 build_diagram.py` writes `workflow-map.html`, the interactive logic diagram.

## Trust ratings

Every part is rated out of 100 for how far to trust it:

- 100: arithmetic or physics
- 90: a regulation, tariff or standard read directly
- 80: a government dataset
- 70: a peer-reviewed coefficient from another context
- 60: derived with a stated assumption
- 50: an operator's or industry claim (labelled as a claim)
- 40: a proxy
- 20: judged
- 0: a gap

A result is only as sure as its weakest input, so each part also shows its chain rating.

## Data that stays out of git

- **BC Assessment:** licensed through UBC Library (Abacus). Raw fields never leave J.B.'s computer; only calculated, rounded values appear. The scripts that read it (`tool/bca/`) run on her computer only.
- **Edmonton lot outlines:** Altalis title mapping, approved for academic use. Not for redistribution, so raw and derived lot files stay out.
- **Everything else too large or licensed:** raw downloads (`data/`), PDFs, spreadsheets, weather files, map tiles, videos and audio. Videos and audio are on J.B.'s computer.

Everything else comes from City of Vancouver and City of Edmonton open data, Statistics Canada, NRCan and the sources listed in the register.
