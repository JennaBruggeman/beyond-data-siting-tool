# Sourcing: 60 % load, pipe cost per metre; (d) racks from the layout check. 11 Nov 2026, report only, no tool changes

## Weaknesses first
- **Load:** no source gives a typical load as a share of design capacity. Uptime gives one band statement. LBNL's 50 % is unsourced. Fan 2007 (0.6) stays the only measured figure, and it is one Google site in 2007.
- **Pipe:** still no Canadian per-metre cost. All figures are European or US planning prices. None states what it includes except NPRO (pipe + excavation and installation).
- **"Lund" studies:** I couldn't tell which study you meant (Lund University, or Henrik Lund / Heat Roadmap Europe at Aalborg). I read the Chalmers ones (Persson & Werner). Point me to the Lund one and I'll read it.
- **Cached copies:** WebFetch automatically cached four public PDFs, 10.3 MB in all, in Claude's session folder (not the repo, not Claude Link): Uptime 2024 survey (1.4 MB), Cambridge Appendix 5 (1.2 MB), Persson et al. 2019 (3.6 MB), Persson 2015 thesis (4.1 MB). I didn't ask for these first. They're used only to read text; nothing was copied into the project.

## 1. 60 % load
| Source | What it gives | Kind | Trust |
|---|---|---|---|
| Uptime, Global Data Center Survey 2024 (report 146M), p. 9, re-read 11 Nov | "one in four data centers in our survey is typically under 40% utilized by available UPS capacity" (exact wording). Nothing else on load: no average, no bands, no n for this question. The report also says "There are no standardized methods for generating and capturing IT utilization data and reports are likely to be estimates" | operator survey, self-reported | 50 |
| LBNL 2024 (Shehabi et al.), held | "Assuming an average capacity utilization rate of 50%" to turn TWh into GW; no source given | government lab, assumption | 40 as a figure |
| Fan, Weber, Barroso 2007, held | real site averaged 59.5 % of its machines' combined maximum | peer-reviewed, one Google site in 2007 | 70 |
| Capacity-planning reports (search 11 Nov) | Nothing primary. Found: a Raritan/PTS vendor paper (about 31 % of nameplate, garbled text); arXiv preprints with model coefficients 0.48 (conventional) and 0.62–0.75 (AI training), and a simulated 73 % peak. CBRE, JLL and Cushman report occupancy, not load | vendor / preprint | not usable |

**What it means:** 0.6 is about Uptime's band: if a quarter of sites are below 40 %, 0.6 is plausible as typical but not shown. A range could be 0.4–0.6, citing Uptime (low) and Fan (high). That would lower yearly MWh, heat offered and carbon by up to a third at the low end. **No change until you decide.**

## 2. Pipe cost per metre (DN100; the tool uses CAD 1,038–2,620/m)
| Source | DN100 figure | Basis | Notes |
|---|---|---|---|
| Cambridge MA, Net Zero LCESS Appendix 5, Table 12, p. 7 (re-read 11 Nov) | **$336/ft** from 2026 on (480 in 2017, falling each year to 336 in 2026; held flat to 2040) ≈ $1,102/m | "Specific estimated pipe prices for planning ($ / ft)" | Currency, price year and inclusions not stated (the register's "US$ ?" stays). The register's 336 is right. The prices fall over time, a planning assumption the appendix doesn't explain |
| NPRO cost overview (re-read 11 Nov) | pipe **€160** + installation **€700** unpaved / **€1,060** suburban / **€1,500** urban paved per m | pipes: Logstor TCO tool, KMR pipe pairs; installation: KWW Technikkatalog Wärmeplanung (v1.1, Aug 2024, from the file name); cross-checked to a 2023 Frankfurt study | Excavation and installation included. Pipe pair likely, not stated. No price year. "no guarantee can be made regarding accuracy or completeness". The **suburban** column (€1,060) is new to us |
| Persson et al. 2019 (Energy 176), s. 2, Fig. 2 (held, now read further) | average C1 212 €/m + C2 4,464 €/m² × 0.1 m = **€658/m** (2015 €) | 2007 Swedish catalogue costs, indexed to 2015 | The inner-city, outer-city and park curves are in Fig. 2 only, with no numbers in the text. The average "is used uniformly … as representative of average current construction cost conditions in Europe" |
| Persson & Werner 2011 (Applied Energy 88), Table 1 as reprinted in Persson's 2015 Chalmers thesis | **inner city** C1 286 + C2 2,022 × 0.1 = **€488/m**; outer city €387/m; park €289/m (2007 €, 10.8 SEK/€) | Swedish experience (SDHA 2007) | Older and lower than the 2019 average: 2019 indexed costs to 2015 and refit C2 for pipes up to 0.3 m. Plot-ratio bands: inner city e ≥ 0.5 |

**Caveat for all four Persson numbers:** d<sub>a</sub> is the average pipe diameter of a whole network, not one service pipe. Using it for a single DN100 connection is our reading (?).

**In CAD (rates as the tool uses: 1.5782 CAD/€; US$ ≈ 1.40 CAD, not yet in the register):**
- Persson 2011 inner city: about $770/m (2007 €, not indexed).
- Persson 2019 average: $1,038/m (the tool's low end today).
- Cambridge 2026: about $1,540/m (as the tool's pipeCheck).
- NPRO suburban: about $1,925/m.
- NPRO urban paved: $2,620/m (the tool's high end today).

**What it means:** the current range (1,038–2,620) is bracketed by sources already held. Cambridge, the nearest North American source, falls in the middle. Persson 2011 inner city would add a lower end (about $770) but is 2007 money, so I don't recommend it as a low end without indexing. With (c), the break-even pipe cost for 339's cheapest receiver is up to about $300/m, below every source. So the verdict doesn't change whichever source is used. **No change until you decide.**

## 3. (d) Racks from the tool's rack-layout check, 339 1st Ave E
Run with checks/tests/rack_probe.js (scene3d layoutCheck, golden answers). The building is 842 m² footprint, 3 storeys, ground floor kept for other uses (I-3), so 2 hall floors. The layout places the UPS and battery room (1.5 m working space), room cooling units along the walls, 1.1 m corridors and 1.2 m aisles.

| Layout | Racks | MW at 7.1–8 kW (the tool's density) | MW at 15 kW | Floor per rack (2 floors × 842 m²) |
|---|---|---|---|---|
| As the tool runs it: rows thinned so each rack takes 2.32 m² (Schneider WP 46) | **500** | **3.6–4.0** | 7.5 | 3.4 m² |
| Rows packed: rack + aisle only, all drawn rooms and units kept | **815** | **5.8–6.5** | 12.2 | 2.1 m² |
| Tool today (hall m² per MW, built halls) | — | **2.5** (largest that fits; plant and generators limit it) | — | — |

**Reading:**
- The thinned layout's 3.4 m² per rack sits inside the built-hall range from my earlier (d) report (2.9–7.4 m²). The packed layout's 2.1 m² is below every built hall.
- **Recommendation:** use the layout as the tool already runs it (with the 2.32 thinning, since the drawn rooms don't cover cooling-unit service space, PDUs and cross aisles). That gives 3.6–4.0 MW of hall on 339.
- Even then, the plant, generators and fuel cap 339 at 2.5 MW today, so the tool's answer for 339 wouldn't change. The hall would show spare racks.
- **Build, when you say go:** MW from racks × density as a second "hall holds" figure beside the plant-limited "fits" figure. Rack density as a visible choice (8 / 15 kW). Golden would change on lots where the hall, not the plant, limits the size. About half a day.
