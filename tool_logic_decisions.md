# Tool logic — decisions log

Running record of decisions J.B. has made about the tool's logic, in the order made. Feeds the tool-logic spec. Claude's wording; J.B. to rewrite.

## Earlier in the conversation (12–13 Oct 2026)
- No right or wrong, only trade-offs. The verdict is value-based; the facts are shared, the weighting belongs to whoever is deciding. Values change the reading, never hide a row (never-net rule).
- Lenses, not weights: the same trade-off table read from different parties' points of view; no summed score.
- Constraints vs trade-offs: only physics is a hard constraint. Every other constraint carries "what it would take to move it" (nothing · money · time and process · a change in policy or law · city-scale infrastructure · not movable). Example: an unzoned site with more reciprocity, at the price of a rezoning — and the rezoning is also where the city can attach conditions and residents get a say (111 E 5th).
- Every downside gets a mitigation, its price, and the residual burden.
- The twin: every run places the same load at the default location (power first, cheap land, out of sight) beside the urban option; the "why urban" argument is the difference between the two columns, shown honestly both ways.
- Scale finding from calibration: delivered heat is receiver-limited for large data centres; urban-scale data centres can be absorbed by their neighbours. Show it as a curve.
- Modes, by question asked (not by user type): evaluate a proposal · design for a site (3D, five options spanning the trade-offs) · site a load · from my address (resident).
- Users for 6 Nov: planners, operators, councillors, residents, other students — all of them.

## Scope questions (13 Oct 2026)
1. What counts as a data centre — **decided: the tool designs from about 0.1 to 40 MW; hyperscale (75 MW+) appears only as the twin.**
2. New, existing, or both — **decided: both. An existing data centre is a starting state the options can modify (e.g. 555 W Hastings at its next cooling refresh).** Options for an existing site are tied to their windows: cooling refresh, server refresh (~6 yr), lease renewal, change of tenant.
3. Does reciprocity run both ways — **decided: absolutely, both ways. Built into the diagram and tool logic; each city-to-data-centre flow needs its own sources of truth to size it.** Six exchanges × two directions; inputs split into what the data centre brings and what the place brings; the twin reads both ways (what the city gets, and what the city offers that a field can't). City→DC sinks and supplies to hunt: sewer flow near a parcel, sea/river water licensing (WSA, Water Act, Fisheries Act), rooftop solar potential and self-generation rules, reclaimed water, existing buildings for conversion, traffic noise as acoustic cover (AUC Rule 012 road categories); Enwave deep-lake as built precedent.
4. Digital service to the neighbourhood — **decided: out of scope, stated as such in the tool so a user who asks gets an answer.**
5. The twin — **decided: no twin, no baseline, no default.** The tool is not arguing that urban beats exurban or that Vancouver beats Edmonton; it puts options on the table for people to evaluate. The same load in other places (Vancouver urban / out of town, Edmonton urban / out of town) simply appears among the options, each with the same trade-off table, none coloured or ordered as better. The "why urban" argument is J.B.'s, made in the thesis from what the tool shows. Carbon by grid (Vancouver ~18 g/kWh vs Edmonton ~346 g/kWh, NIR 2026 average factors; BC marginal factor unpublished) and heating demand (HDD 5,126 vs 2,781) are rows, not a conclusion.
6. How options are made — **decided: the user sets how many options they want and their preferences; the tool returns that many suggestions with different trade-offs.** Not fixed at five; not fixed archetypes; options described by what they gain and give up rather than by evaluative labels. Any option can be adjusted and kept.
   - **Preferences work without a score** (agreed 13 Oct). No weights, no points, no ranking. Preferences act like a design brief: **limits** (non-negotiables: "no rezoning", "≤ 45 dB at the nearest bedroom at night") set options aside, and the tool says which and why; **emphasis** ("explore noise and carbon") decides along which rows the options differ, not which wins. Options worse than another on every row for every party are dropped as not a trade-off. Remaining options are chosen to differ as much as possible on the emphasised rows, shown side by side in no order, each with the full table. If fewer distinct options exist than asked for, the tool shows what it has and explains what the limits cost. Analogy: a design team presenting schemes to a client.
   - **Limits are respected but never silent** (decided 13 Oct, option b). The tool shows, in a separate "if you moved this limit" panel, what relaxing each limit would open up and at what price ("accept a rezoning → two more options: one recovers three times the heat, one gives the ground floor to the street"). The user's limit is never overridden; relaxed options never appear among the results.
7. Parties — **decided for now (may revisit):** operator, host, receiver, utility, city, neighbours, ratepayers and taxpayers, the climate, plus workers, future residents, and the public passing by. The Musqueam, Squamish and Tsleil-Waututh Nations (Vancouver) and the Treaty 6 nations (Edmonton, Amiskwacîwâskahikan) appear as a distinct party of rights holders, not neighbours. Discipline: the tool describes which processes and rights apply to each option (consultation triggers, lands, licences), with sources, and never speaks for them; their gains/losses cells are left for the Nations to fill or leave blank. J.B. may revisit, possibly with guidance from her instructor or UBC.
8. Time — **decided: the trade-off table shows a typical mature year; a lifecycle strip underneath marks construction, ramp-up, server refreshes, lease renewals and closure/reuse, and how each row changes across them.** The strip also carries the windows for existing data centres (Q2). Basis per phase in the register is uneven: ramp-up and termination are evidenced (calibration cases; Lygnerud & Werner 2018); the horizons figures (servers ~6 yr, plant 15–25, shell ≤40, network 40–50) rest on a synthesis note at 60–70, not primary sources — to hunt; lease terms, reuse and construction duration for a data centre are gaps.
9. Units — **decided: each row stays in its own unit** (dollars for money, months and steps for process, dB for noise, people affected, tonnes for carbon, m² for space). Rows are never converted to a common currency.
10. What a user leaves with — **decided: a link that reopens the exact scenario; a report of a few pages (options side by side, rows, sources); an image of the 3D scene.** The report is designed as a professional package (to be designed with J.B.). Technical note: the hosted page blocks downloads and printing for viewers, so file output needs the artifact's file-saving capability (check the user's roster at build time); the scenario link can carry state in a plain #token.
11. Who writes the sentences — **decided: J.B.'s templates.** The tool's plain-language summaries are templates J.B. writes, with blanks the tool fills with numbers; Claude drafts them in red for her to accept or rewrite. The tool never composes new sentences at run time — every word a user reads is J.B.'s or a sourced number.
12. Cities — **decided: Vancouver and Edmonton equally, from the start.** Edmonton data must be brought to Vancouver's depth before the build: parcels and heights, groundwater wells, benchmarking, permits, receivers, Parkland County for Acheson.
13. How much plant shows in the 3D model — **decided (to start): generated options show plant plainly** as simple volumes by type (cooling, generators, transformers, storage) with sound and light reach as soft fields. **Real sites use three states**: seen from public space (drawn), known from public documents (drawn faintly, at the level the permit states), and withheld by the tool (a marked, labelled absence: equipment models, fuel storage, utility entry points, loading and entry routes, anything that locates a weakness). Surveillance on real sites shows as the watched area experienced past the lot line, never camera positions or coverage edges.

14. Screen style for the 3D city — **decided: Study A, the dark line drawing** (style_studies.html): thin hidden-line massing on near-black, one accent for the option in view, fields washed over the drawing, flows in two directions. To be explored at several zoom levels.

## Built into the register and diagram (13 Oct 2026, v5)
- Inputs split into what the data centre brings and what the place offers; a new "The place" stage holds nine place-side quantities (sewer, sea/river water, rooftop solar, self-generation rules, electricity price, water supply, existing buildings, acoustic cover, closeness to networks), and place-side quantities elsewhere are marked.
- Six exchanges recorded in both directions (meta.exchanges).
- Every condition carries what would move it (option · money · time and process · policy · infrastructure · not movable) and the parties it touches — Claude's proposals for J.B. to check. Eight conditions added: a sink the place offers; an existing building to reuse; price of power at the site; closeness to networks and customers; consultation and rights; people within reach; work created; acoustic cover.
- The match verdict is gone. Conditions feed an Options stage (generator, "if you moved a limit", and the user's count, limits, emphasis and lens entering from below), then one trade-off table per option, which fans out to twelve parties.
- A lifecycle strip with nine phases and their sources.
- New figures from the deep dive (sources/14) folded in; gaps listed in retrieval_guide.md (J.B.'s list and Claude's second-pass hunt list).

## Proposed 14 Oct — layered input (Claude's proposal; J.B. to confirm before the build)
- A first-time user needs two clicks: a city and a parcel. Everything else has a default, is decided by the tool from data, or sits in an expert panel.
- Which question: optional; clicking a parcel starts "design for a site".
- New or existing: the tool decides (existing only if the parcel holds a known data centre); the user can change it.
- What the data centre brings (size, cooling, plant, spare cooling, lighting): expert panel ("Specify the data centre"); left open, carried as ranges that fit the parcel.
- Preferences in plain words: tap what matters (→ emphasis), tap again for a must (→ limit); exact limits and number of options in the expert panel. Default: three options, no limits, spread across all rows. The list of plain-language concerns and their mapping to rows is to be drafted with J.B.
- Lens: optional, offered when reading ("See it as…"); default neutral, all parties.
- Results always say what was left open, in plain words (J.B.'s templates).

## 14 Oct — node icons and the Guide tab (after review with Annalisa Meyboom)
- **Decided:** each node carries a family icon, placed beside the confidence ring (icon left, small ring right).
- **Decided:** node outline coloured by family. Proposal: six colour groups (heat, power, water, sound and sight, matter and carbon, city and process), since 17 outline colours cannot be told apart; red stays reserved for selection and user values; the grey-green left tick keeps marking what the place offers.
- **Decided (split proposed by Claude):** heat splits into heat out of the data centre · what the heat becomes · cooling the place offers. 17 families in all (node_studies/families.py).
- **Decided:** a third tab, the Guide: one mechanism diagram per family, the reason each node is in the tool, and how to read the side panel. The tool-logic diagram is the informational overview of the tool.
- **Decided:** mechanism diagrams use 2D or 3D, whichever is clearer per family; legibility and professionalism to be raised (numbered callouts, key, three line weights). Drawing type per family proposed in node_studies.html §4.
- Rationale text in the Guide: J.B.'s, from Claude's red drafts (as with all user-facing text).
- **Decided (J.B., 14 Oct) — callout rules for every diagram:** a box carries its number as a badge, no leader; all other leaders only orthogonal or at 45°; number tags line up in columns or rows and sit in empty space, never over the drawing; tags numbered in reading order with a key below.
- **Built 14 Oct:** icons and group-coloured outlines on every node of the tool-logic diagram; the side panel shows the family's diagram with the node's number in red and a one-line reason; a Guide tab (17 family diagrams, reasons for all 116 nodes, how to read the side panel and the diagram). All reasons and captions are Claude's drafts in red for J.B. to rewrite. Diagrams: node_studies/diagrams.py; reasons: node_studies/rationale.py; page assembled by build_diagram.py.

## 14 Oct — add-ons: "what would happen if we added X" (J.B.)
- **Decided (J.B.):** the tool must let users try add-ons on any option, with sources of truth for each: greywater, blackwater, rainwater, reclaimed water, blowdown recovery, solar (roof and facade), geothermal (borefield, seasonal ground store, aquifer store, deep geothermal), batteries and the UPS, cleaner backup power, water tanks, cooling for neighbours. Small wind and biomass are shown only to explain why they are out.
- **Built (Claude):** research reports sources/15a–15d; 20 add-on quantities, 5 add-on conditions (heading "11 Add-ons"), an add-on catalogue in the register (meta.addons) with rule status per city and what each changes; an "Add-ons" node in the Options column; a 3D add-ons diagram in the Guide; the workflow's "What next?" now includes trying an add-on.
- **Findings to carry into the thesis:** rooftop solar covers ~1–5 % of a 1 MW site's power and under 1 % of a 10 MW site's; a borefield needs ~2 ha per MW rejected and warms unless neighbours take heat out in winter; greywater and blackwater are possible but barred as sources in Vancouver's 2019 by-law (2025 by-law to confirm) and need a variance in Alberta — a rule, not engineering, is what moves them; absorption cooling needs ≥90 °C, so air-cooled data-centre heat cannot drive it.
- **Open:** the conflict on Vancouver greywater (2019 bars it; 2025 allows residential NSF 350 systems — non-residential to confirm from the 2025 by-law §2.7).
- **Decided (J.B., 14 Oct) — reorganised by exchange direction:** the "add-ons" are not one bucket. Opportunities (the data centre gives the place: seasonal ground store, cooling for neighbours, batteries and UPS for the grid, water tanks) sit in Opportunities beside EV charging; what the place gives the data centre (city wastewater, neighbours' greywater, borefield, aquifer, deep geothermal) sits in The place; the data centre's own technology choices (solar, blowdown recovery, water treatment, cleaner backup power) sit with its characterisation. "What if we added…" is the user's menu for trying any of them on an option; each family diagram in the Guide ends with a "what if we added…" strip, and each item says which way it runs.
- **Decided (J.B., 14 Oct):** rain for cooling stays as a technology choice; small wind and biomass stay in the "What if we added…" menu marked "left out", each with its sourced reason, so users can see why they are out (agreed with the parallel claude.ai research chat).
- **Decided (J.B., 14 Oct, before the build):** three options by default. Red draft text stays red at the mid review ("reads nicely"); all current drafts approved for now. The tool is built as its own page for now and combined with the map later; both read the same register so the sources of truth appear in the tool. Edmonton: any parcel in the city, not one site. Not yet approved, so not built: flag-not-edit for place data, link keeps the parcel, "from my address" residents' lens.
- **Decided (J.B., 14 Oct):** starting step = (1) new or existing building? (2) whole building or part of one? (3) only for part of an existing building: which floor (basement / ground / floor n / roof). Special cases below: modular unit, at existing infrastructure, expanding an existing data centre. For a new mixed-use building, position (basement vs upper floor etc.) is an option compared side by side, not a question. Phasing is a timeline option, not a starting case.
- **Diagram update (14 Oct), from sources 16–24:** new family "Siting: what fits where" (13 nodes: what is being built, host building, zone, buildable envelope, space for the plant, room for the data hall, largest size that fits, floor strength, fuel kept on site, flood exposure, floodplain, vibration to neighbours, electrical service) with a 2D-section mechanism diagram; zoning node now carries both cities' use rules; 11 new conditions (allowed use, site-specific zoning, Edmonton Major/Minor, envelope, Vancouver plant counts as floor area, no data storage at grade, floor load, fuel per storey, flood level, vibration, service class); "If you moved a limit" lists 14 rules from Fairfax, Loudoun, Frankfurt, Germany, the EU, Calgary and Rocky View; workflow step "What is being built?" replaces "New or existing?", with a new "What fits here" output. Vancouver water reuse rules updated to the 2025 by-law.
- **Build round 1 (14 Oct):** the tool page is published (https://claude.ai/artifact/EBxWgBawKaDps5z245GpAn) with both cities tiled from open data (tool/make_tiles.py → tool/tiles, not in git). City → parcel or address → site card (zone and whether a data centre is an allowed use, lot, values, buildings, sources) → "What is being built?" (new/existing, whole/part, floor, host-building questions, special cases). Downtown plan areas (DD, FCCDD, CWD, BCPED, DEOD) and Edmonton special-area zones show as "not yet reviewed" rather than a rezoning claim. Floodplain not yet loaded (Vancouver layer blocked from the cloud; to retrieve).

## 14 Oct — exchange logic from the learning-series critique (J.B.: "build the logic out fully before the mid review")
- **Built (register, add_exchange.py):** 7 quantities — receivers within reach, other sources for the same receiver, what the receiver uses now, hour-by-hour match, who controls the computing, how firm the exchange is, futures; 7 conditions — the mechanism is named, no other source already serves the receiver, supply meets demand hour by hour, still works if the receiver leaves, still works if the tenant changes, whoever runs the computing agrees to shift it, the exchange is committed not only possible.
- **Built:** every one of the 100 conditions carries a next action for when it cannot be judged (by heading, with overrides). Carbon is now judged against the displaced source and can be zero or negative. Options logic reports the gates (grid connection, zoning use) first and runs each option through four futures.
- **Built (meta):** mechanisms (physical · through the grid · shared space · shared service, with line styles), evidence types (operating · measured · operator claim · modelled · proposed · speculative), commitment states (only existing and committed count as delivered), futures, and "results from elsewhere" (Montreal, Lausanne, global wastewater, EV coordination, Quincy) labelled by evidence type, unverified, never used as a parcel's numbers.
- **Diagram:** condition panels show "if it cannot be judged → next"; quantity panels show each exchange's mechanism; "If you moved a limit" lists results from elsewhere; the user workflow text updated (gates first, mapped receivers and rival sources, mechanism and firmness, next actions, four futures).
- **Data for the map (pending):** Statistics Canada ODSRF v2 (2026), ODHF (2020), ODEF v2.1 (2022) — the cloud cannot reach the hosts; to fetch from J.B.'s computer. Network service areas (NEU, Creative Energy, Blatchford, Edmonton DDE) not yet found as data; drawn as labelled approximate areas until found.
- **Verified 14 Oct:** hot-water storage ≥ 60 °C, recirculation ≥ 49 °C (VBBL 2025 Book II 2.6.1.12.(1), 2.6.1.1.(3), already on file); Alberta text to confirm.
- **Not yet verified:** the five papers behind "results from elsewhere".
- All new wording is Claude's draft for J.B.

## 15 Oct — reply from the atlas chat (J.B.'s other account), folded in
- **Corrected (Claude's errors in the critique):** 0.39–0.53 is the heat pump's Lorenz η in built cases, not a capture share; capture is liquid_capture (direct-to-chip 48–75 %, cold plate ≤ 94 %, hot-water 80 %, air-cooled no primary figure). "19:1" is space heating only; total heat demand peak-to-minimum month is 3.9 Vancouver, 3.3 Edmonton.
- **Results from elsewhere updated** from the atlas chat's paper check (abstracts or open full texts; not re-read here): Ravi's 28 % is buffering potential, not PV self-consumption, and the "90 %" appears nowhere; Wang's US$95.4 bn excludes the social cost of carbon; Zhang's DOI year is 2024; Quincy treats cooling-tower blowdown; Oltmanns and Socci added; Montreal still unverified (full text via UBC Library). "Wang 2022" found (Xihao Wang et al., Sustainability 2022). Crozier & Liska added to workload_control.
- **Gap for the thesis (atlas chat):** every receiver in the core cases is an institution; no study measures how heat-reuse value splits between operator, utility and residents. The cases are single-operator campus or hyperscale; the atlas sites are mostly 2–3 MW colocation.
- **Spelling:** Sen̓áḵw (as in sources/14), corrected in the handoff and retrieval guide.
- **For J.B. to decide:** one grid-carbon basis for both the atlas and the register (register: NIR 2026 — BC 16.7 generation / 18.1 consumption; AB 334.8 / 346.1 g/kWh, 2024; atlas: BC 22.8 / AB 335).
- **To add beside sources/13 (from the atlas chat; to source before use):** TELUS Garden, Equinix TR5, Humano Sherbrooke, QScale Lévis (greenhouses, Québec government document), Enwave Toronto. No EV-charging precedent found.

## 15 Oct — atlas chat's read of the diagram (v17), checked here
- **homes_heated (example):** relabelled "heat available for the equivalent of 800–2,400 homes — available, not heated" (the host takes 4.9 GWh). The figures stand: the example's heat_delivered is 12–34 GWh ÷ 14.58 MWh; the atlas chat's 5–30 GWh is a different input.
- **grid_co2 (example):** 3–12 GWh heat-pump electricity is the example's own hp_electricity (12–34 GWh ÷ COP 3.0–3.6), so 50–200 t was consistent; restated at the consumption basis as ≈ 54–217 t/yr, average factor.
- **noise_limit (example):** corrected — 55/45 is the City's permit note for air-conditioning units, not the by-law limit for this site; the by-law limit depends on the zone pair, and the schedule for downtown (DD) is not yet checked.
- **Grid basis:** applied consumption intensity everywhere (BC 18.1, AB 346.1 g/kWh, NIR 2026, 2024) — proposed by Claude and the atlas chat; **J.B. to confirm**. pv_share no longer uses 22.8 / 335.
- **workload_control:** source now Crozier & Liska 2025 only.

## 15 Oct (night) — LiDAR complete; retrievals folded in; build rounds 2 and 3 published (tool v6)
- **LiDAR 2022:** all 148 City tiles processed; 122,458 footprints measured, 16,412 new outlines kept on City parcels, 3,662 dropped as outside the City (Burnaby, river). One tile (485000_5456000) was re-downloaded after a corrupted save.
- **Receivers on the map:** Statistics Canada ODSRF v2 / ODHF / ODEF v2.1 and Vancouver non-market housing (975 Vancouver points, 475 Edmonton). Gaps stated in the tool: Vancouver pools not separate records; Edmonton care homes and most hospitals lack locations; private housing and offices not yet mapped.
- **NEU service area** traced from By-law 9552 Schedule A (±45 m) and drawn on the map; s. 2.1 compulsory connection and the 50% credit carried into the logic (new condition r_de_compulsory). 111 E 5th Ave falls inside — consistent with RTS 19744.
- **Noise zones** from By-law 6555 Schedules A/B/B.1; DD is an activity zone.
- **Round 2 — What fits here (built):** floor area from the zone envelope (or, where the zone has none, shown "as if rezoned" to I-2 / IM, labelled an assumption), storeys at 6.0 / 4.0 m, ground-floor exclusion where the zone bans storage at grade, hall share 48–72%, size range at 8 kW per rack, a size slider; what that size needs: power, plant (equipment only), 12 h fuel vs the room limit for the storey, service class, the downtown grid gate, floor strength for upper floors.
- **Who could take the heat (built):** candidates within reach by type (RVO reach; housing figure used as a labelled guide for types with none), district energy inside/edge/outside, downtown steam noted (no map), firmness of housing projects from their status.
- **Round 3 — three options (built):** smaller air-cooled · chosen size with heat to neighbours · largest with heat to the network (or neighbours). Trade-off table by party (operator, utility and grid, receivers, climate, neighbours, workers), each row in its own unit, identical cells merged, states shown as met / with a change / not met / cannot judge, four futures under each option. **Option names and the choice of these three are Claude's drafts for J.B.**
- **Assumptions to review (J.B.):** storeys from the I-3 floor-to-floor minimums; "as if rezoned" comparison zone; existing-building storeys = height ÷ 4 m; one floor = the largest footprint; housing reach used as a guide for schools, care, hospitals, recreation; consumption grid basis (BC 18.1, AB 346.1).

## 15 Oct — exchange tabs with a live 3D site view (J.B.: "the test fit is very heat specific")
- **Decided (J.B.):** live 3D in the tool (Study A dark line drawing); tabs beside Heat for energy, water, materials and people/place; the social tab = measured layers plus J.B.'s field notes, described as experienced, never scored.
- **Built (tool v7):** "What it exchanges →" opens tabs Heat · Energy · Water · Materials · People · Options. Each tab replaces the map with a 3D view of the site (neighbours at LiDAR heights within 420 m; the data centre massing or the existing building and floor; generic roof plant at the register's m² per MW) and its own overlay: heat arcs to candidate receivers, reach rings and the NEU outline; roof solar, a generic service drop and a battery; rain on the roof, cistern, water in and sewer out, evaporation if cooling towers are chosen; racks lifted out of the shell (replaced ~6-yearly); a 10 m standoff ring and neighbours coloured by screened night sound (red: over the limit even with low-noise units; accent: over only with standard units).
- **Numbers per tab** come from the register (electricity price, PV, UPS, battery, demand response, EV, generator testing; evaporation, blowdown, rain, water behind electricity, reuse rules; servers, e-waste, copper, embodied carbon; sound screen, low-frequency flag, standoff, light, homes nearby, jobs). Embodied carbon of servers uses the manufacturing share (10–15%) of the Dell assessment, not the whole-life total.
- **Assumptions to review (J.B.):** one cooling unit per MW of facility power for sound (Lw 91–101 dBA each); sound coloured against a quiet-zone home limit for every neighbour (neighbour zones not yet read); roof = 0.86² of the lot for a new building; runoff coefficient 0.8; field notes kept in the viewer's browser only.
- **15 Oct, v8:** roof equipment now packed only where it fits inside the roof outline, along its long side, and labelled (dry coolers, + heat pumps, cooling towers, sound sources); units that don't fit are counted ("+n do not fit — yard or another roof"); solar panels fill the roof the plant leaves free. **Options tab (J.B.): three 3D views side by side** — one camera orbits all three; A shows plant venting to the air, B arcs to nearby receivers, C arcs to the network (if inside its area) or to more receivers.

## 15 Oct 2026 — v9: size chain corrected after logic test

- Logic test (110 4th Ave W): old low end 1.7 MW implied 4,826 m² of building per MW, outside every built case (291–1,580). Cause: LBNL's loosest room (13.9 m²/rack, a 56 m² server room) paired with an independent 8 kW/rack.
- Area per MW now the five built Canadian halls, 290–630 m² of hall per MW (operator claims). LBNL 186–2,325 shown as outer bounds only.
- Storeys: data-hall floors 5.5–6.0 m (Burlington; HK TPB A/KC/480, A/KC/510B). Zoning's 4.0 m is a minimum. 18.3 m → 3 storeys. Floor area capped at lot × storeys; "up to" when that needs full lot coverage (I-2 yards unread).
- Ground floor: two readings shown — strict (ground holds none of the data centre) and lenient (support rooms at grade). City to confirm.
- Whole-building check line added: floor area ÷ 291–1,580 m²/MW.
- "Power drawn" → "Average power drawn" (PUE is a yearly ratio).
- Slider: steps 0.1–40 MW, log-spaced; bar for what fits; ticks for Cologix VAN5, eStruxture VAN-1, 111 E 5th (Vancouver), Qu EDM1 (Edmonton); starts at the low end of what fits; label compares to the nearest case.
- Register: repeated coefficient notes removed (9 quantities); add_exchange.py now drops exact repeats.
- J.B. to review: all new red wording; the strict/lenient split; full-coverage caveat.

## 15 Oct 2026 — precedent catalogue, benchmark test, show the math (tool v10)

- bench/: 89 sites, 538 sourced facts from four research passes (UK/Ireland, Australia/Europe/Asia, Canada, US) plus cases already in sources/16. Tiers: 10 benchmark (IT MW + gross area, public or filed record), 11 reference (operator claim or doubt), 68 context.
- Claude re-fetched 16 core quotes (8 sites): 15 matched; Lafayette's 66 MW IT was not re-found (moved to reference).
- Catalogue says: 505–1,109 m² of building per MW IT (benchmarks, median 706); 250–674 m² of hall per MW (built, operator); hall share 20–92% (middle half 49–80%); data-hall floors 5.5–6.0 m.
- bench/test_size_chain.py reads engine.js and checks: every benchmark falls inside the tool's range (10/10; they sit 8–71% up the range, median ≈38%, so the top of the range is optimistic); coefficients within the catalogue; check line in sync. The check line moved from 291–1,580 to the benchmark 505–1,109.
- Show the math: size chain and "what that size needs" now print each step with the site's numbers.
- Catalogue page published (db capability: J.B.'s "matches source" checks are stored in collection `checks`, readable by Claude).

## 15 Oct 2026 — catalogue round 2: small urban sites and conversions

- Four targeted passes (US, UK/Europe, Canada, Asia-Pacific): 41 new sites, 130 in all, 762 facts. Planning records for small sites rarely state IT MW; most small and conversion pairs are operator claims.
- One new benchmark: Colt Les Ulis DH10+ (12.8 MW IT, 7,590 m² surface de plancher; MRAe opinion re-checked by Claude). Benchmarks now 11; range unchanged 505–1,109 m²/MW (median 680).
- Re-checked by Claude: 3060 Raymond (the 6 MW "critical load" equals the stated maximum facility use, so IT is unclear → reference); Vantage LHR12 (30 MW "data centre capacity", not stated as IT → reference).
- Small sites and conversions (information only, test section 3): 10 of 15 inside the tool's range; denser than the tool: eStruxture VAN-1 (387 m²/MW, operator), 111 E 5th (291, "up to", applicant), 3060 Raymond (378, IT unclear); less dense: 365 Main (2,452, aggregator copy), eStruxture MTL-3 (1,858, operator conflict). Small sites scatter more widely than large ones; the two Vancouver cases sit above the tool's top.
- Tool wording no longer names a benchmark count.

## 15 Oct 2026 — v12: high-density option, small-site note, Precedents tab

- Defaults kept: 290–630 m² of hall per MW, 48–72% hall share (they match built and approved buildings; benchmarks sit ≈40% up the range).
- New "Hall layout" switch: High-density, liquid-cooled uses 250–290 m²/MW (NEXTDC S3, QScale ≈250, operator claims; 290 = VAN-1). Tested against the catalogue.
- Small-site note (red draft) when floor area < 3,000 m²: small buildings can exceed the range because most of the floor becomes hall (VAN-1 ≈75%). VAN-1 exceeded the range through hall share, not hall density.
- Precedents tab (first tab): log-log chart of real buildings with this site's range as a bar, the tool's band and the benchmark lines; the eight closest-in-size buildings with source links; catalogue summary. Data: tool/precedents.json, written by bench/make_benchmarks.py.

## 15 Oct 2026 — v13–v16: map fixes, Edmonton lots

- Map stretching fixed (canvas sized at paint time). Edmonton picking fixed (tile still loading; 30 m pick radius too small).
- Edmonton lot outlines from the EPSB "Titled Lots Current" layer (Altalis title mapping; academic use approved by Xun, by email). Lot picked first, so empty lots can be chosen. Raw file and lot tiles kept out of git; Altalis credit shown on the card.

## 15 Oct 2026 — v17: explain, check, compare

- Show the math on Heat, Energy, Water, Materials and People (each step with the site's numbers).
- Evidence badges on every figure: record, filed, peer-reviewed, survey, operator claim, physics, transferred, assumption.
- Range bars; glossary on hover; three worked examples on the intro (1425 Clark Dr, 12603 123 Street NW, 555 W Hastings).
- New pages: What matters most (sensitivity bars), Over time (50 years), Two cities, About and limits (data dates, versions), Feedback (db collection `feedback`). Site report download (downloads capability).
- Screening layer: colours every parcel by the middle-case size that fits (0–1, 1–5, 5–10, 10–20, 20–40 MW). Middle case only; not a ranking.
- COP for heat recovery widened from the previous range to 3.0–4.5: observed at Meta Odense (4.5 in 2020; ≈3.9 in 2022–24). bench/test_heat_chain.py checks the heat chain against Odense / Fjernvarme Fyn and Telia figures. J.B. to accept or revert.
- Edmonton heights now measured from the City's 3D buildings (305,926 outlines, f = 5); measured ≈1.4× the old floor-area estimates. 14,327 outlines keep the estimate. tool/edm_heights.py, run after make_tiles.py edm.
- Yards now reduce the footprint: I-2 rear 3.1 m; I-3 front 0.6, sides 7.6, rear 3.1; FC-2 front and rear 0.6; Edmonton IM front 3.0.
- Sound: each neighbour's limit comes from its own zone (Vancouver quiet / intermediate / activity; Edmonton 50 dBA next to residential, otherwise 60).
- Edmonton Heat tab: Blatchford district energy is compulsory to connect (Bylaw C17943 s. 6; s. 8 net-zero exemption).
- Still blocked: Edmonton district energy service area maps (need tracing), census population, I-2 sub-area B mapping, the City's answer on strict vs lenient ground floor.

## 15 Oct 2026 — opportunity labels (agreed with J.B.)

- "Cannot judge" retired. Three labels, never combined: how proven the idea is when paired with a data centre (built here · built elsewhere · pilot · speculative · not yet known), what the rules say rung by rung (allowed · allowed with approval · not allowed · no rule yet · not yet known · not applicable), and what we know (known · not yet known — needs X).
- All 15 opportunities labelled in the register (add_labels.py, run after add_exchange.py); 12 are provisional — from the register's sources only, precedent search still to do. Built here: district heat (TELUS Garden, BCUC C-1-13), sewage heat (NEU, comparator). Built elsewhere: campus anchor (Université Laval).
- "What if we added" entries carry a rule state per city; their readiness is not labelled yet.
- New sources: Vancouver roof-mounted energy bulletin (Nov 2022); Gowling 2021 on EV charging and Bennett Jones 2024 on Bill 22 — both law-firm summaries, labelled secondary until the AUC report and the Act are read.
- Diagram: opportunity bands show the readiness tag; "Opportunities · how labelled" opens the label key and an overview table; each opportunity shows its rule ladder. Tool wording "cannot judge" → "not yet known".

## 15 Oct 2026 — precedent search settles "how proven"

- Four research passes, primary sources preferred, operator and vendor pages labelled as claims; Claude re-opened a sample (EPA Quincy, Codema Tallaght, IURC 46276, RVO, Bill 22, Edmonton ZB 20001 s. 5.70 and 7.120, Green Mountain, Göteborg Energi). add_precedents.py, run after add_labels.py; 41 sources added.
- Opportunities: built here 2 (district heat via TELUS Garden; sewage heat comparator) · built elsewhere 6 (campus anchor; new district — Westville, Frankfurt; ground storage — Equinix Amsterdam ATES; fish farming — operator claims only; grid flexibility — Indiana regulator order for Google, Irish UPS frequency response; water reuse — EPA Quincy blowdown, Loudoun reclaimed water) · pilot 2 (greenhouse — Göteborg 130 m², QScale Lévis under construction; servers as heaters — Qarnot EU project, Heata trial) · speculative 5 (refuge; EV hub; meanwhile uses; material bank; cooling for neighbours).
- None of the data-centre pairings is operating in Alberta; in BC only TELUS Garden. Canada: QScale Lévis greenhouse (under construction), Manitoba 3 MW greenhouse proof of concept (operator claim), Université Laval.
- Add-ons labelled too (solar 1 MW rooftop Melbourne and 600 kWp facade Madrid — claims; borefield Epic Systems — US DOE; HVO backup — vendor claim; etc.).
- Correction: the Bennett Jones summary says Bill 22 permits export of surplus self-supply; the bill as introduced exempts only self-supply consumed on the property and has no export clause. Enacted text still to read.
- Edmonton solar: no development permit for a compliant collector (s. 7.120 cl. 3.7); s. 5.70 does not list collectors among items with no height limit; s. 5.10 collector rules would not load — to read by hand. AUC 2021 inquiry report would not open; EV status stays "no rule yet" from secondary sources.

## 15 Oct 2026 — v18: retrievals folded in

- Solar: NRCan municipal values replace the 2006 table. Roof yield is now a range from horizontal to latitude tilt (Vancouver 892–1,007, Edmonton 944–1,244 kWh/kWp a year); south wall 716 / 989. In Edmonton a south wall out-yields a flat roof. Facade factor 0.4–0.6 retired.
- Alberta EV charging: AUC Distribution System Inquiry final report read (pp. 60, 68–69) — parties agreed EV charging is "not defined clearly in legislation" and its status "unclear"; most saw no need for added oversight. Label stays "no rule yet", now from the primary source.
- Alberta export: Electric Utilities Act consolidation (in force 6 Feb 2026) — self-supply exempt only when consumed on the property (s. 2(1)(b)); energy leaving the site goes through the power pool (s. 18(2)).
- BC Hydro tariff: LGS and RS 1830 prices confirmed (effective 1 Apr 2026). RS 2289 is only for customers at distribution voltage, so a data centre on transmission service (60 kV or higher) cannot sell solar under it. RS 4100 (BC Hydro public EV charging) prices noted.
- Census: the files received are census subdivisions (whole municipalities), not dissemination areas; the DA file is still needed for "people affected".

## 16 Oct 2026 — v18 continued: census, water rules, battery costs, LCA shares

- People tab: 2021 census by dissemination area (both regions, extracted on J.B.'s computer) spread evenly over each area onto a 100 m grid; the tab sums people, households, 65+, under 15, renters, shelter-cost burden and low income within 200 m, 500 m and the sound distance. Indigenous identity was not carried into the tool.
- Water: VBBL 2025 Table 2.7.1.3 — rainwater and clear-water waste may be cooling-tower make-up in Vancouver; greywater only within a single dwelling; blackwater not permitted. Alberta: any reuse beyond toilets or sub-surface irrigation needs an alternative solution from the City, which must support and oversee it.
- Battery: PNNL 2022 LFP at 1 MW 448 and 10 MW 411 US$/kWh (4 h, 2021), about 10% above the 100 MW figure.
- Embodied carbon: Alissa et al. 2025 — the building is under 1% of life-cycle GHG on a US-average grid (about 5% on renewable power); making servers is 9% on that grid but about 82% on renewable power. In Vancouver the servers' making dominates; in Edmonton running them does.
- BC Hydro 2026 Call: 15 applications, close to 800 MW requested; results after the government transition.
- Parkland County (Acheson) dropped: a case study for J.B., not a tool site.

## 16 Oct 2026 — research pass for the build (sources only; nothing built)
- 77 sources added (register 411), each tagged by kind and by check status ("checked" = re-read by Claude; "to check" = research agent read it). Diagram v28 adds a "Sources of truth" view grouped by carrier (plant on the site, seen and heard, heat, water, electricity, opportunities next door, materials) and by gate (physics, land, rules, demand, time, money); a group highlights the nodes that cite it. Subcategories are in that view only, so the main graph stays as it was.
- Corrections: Edmonton s. 5.120 rooftop concealment is for non-industrial development only (IM, IH no mechanical clause; BE screens from streets and non-industrial zones). VBBL 2.7.1.3(2) governs what an installed alternate water system serves, not who must install one. Vancouver loading row 5.2.5 is manufacturing/wholesale-type uses; data centres are not listed, so the Director of Planning sets the rate.
- Pipe cost: no Canadian per-metre figure; Edmonton DDE filings give only bundled capital ($35.9M Phase 1). European (Persson 2019; npro) and US (Cambridge) figures held, labelled.
- NFPA 855: not cited in NFC 2020 or the BC Fire Code 2024 amendments; the other codes are on J.B.'s list (R7–R9).
- Gaps still open: redundancy practice, cistern cost, truck cost and emissions, walking-distance norms, street permits, centrelines, Alberta cooling-tower rules, TIER 2026 price.

## 16 Oct 2026 — v19 published (tool artifact version 21; diagram v29)
- Opportunities tab: 15 opportunities in a fixed order by family; each gate (physics, land, rules, demand, time, money) is possible here, possible with a change, not here or not yet known, with its reason. Never ranked or scored.
- I-2 sub-area B (I-2 District Schedule, June 2026): a choice on setup card 2 for I-2 lots; the tool does not map the sub-areas (Map 1). Outside B the discretionary height is 30.5 m (it said 30.5–36.5 before; 36.5 m is sub-area B only).
- New sources: vanI2_2026, mvWWTP2026 (plant addresses not checked: the chat search used business listings), epcorGoldBar2026, statcanGH2021 (Canada only), blatchfordBP2021 (no third-party heat intake described).

## 16 Oct 2026 — reciprocity is relative (J.B.)
- J.B.: "reciprocity is relative" — every outcome is shown against references, never as an absolute. Decided (AskUserQuestion, 16 Oct): the Vancouver reference is both a real facility (public figures, operator claims, security details excluded) and a modelled one; the comparison appears on every card.
- Proposed references (Claude, to confirm): (1) conventional here — same site, same size, air-cooled, dry coolers, no heat recovery, no add-ons; (2) Vancouver, real — Cologix VAN1 where its sheet publishes a figure; (3) Vancouver, modelled — same size, conventional, at the Vancouver worked-example site; (4) Edmonton — same size and design at the Edmonton worked-example site.
- Also 16 Oct: receiver floor areas estimated from parcels and building heights (receiver_floor.py, run after make_receivers.py); Edmonton Downtown District Energy drawn from the City phases map; Vancouver EV stations from NRCan.
- 16 Oct (built): compare.js adds a "Compared with" table under the heading of the Heat, Energy, Water and Materials tabs: this design; conventional on this site; Cologix VAN4 (claims: PUE 1.5, no heat recovery stated); Vancouver modelled (conventional, 1425 Clark Dr); Edmonton same design and conventional (12603 123 St NW). Site figures for the worked-example lots from refs_sites.json (computed by the tool). J.B. answer: Edmonton both. Not yet: People and Opportunities comparisons; materials beyond lifetime electricity.
- 16 Oct (J.B.): Vancouver and Edmonton are equally important and need the same operations. Parity audit logged in retrieval_guide.md section 9.
- 16 Oct (J.B., AskUserQuestion): one diagram with a Vancouver / Edmonton / Both switch, same nodes. Each source is classed by city from its own text (place names; 'general' otherwise — a keyword classification, check odd cases). In one-city view a node with sources only for the other city is dashed "no <city> source yet"; in Both, "Vancouver only" / "Edmonton only". First count: 19 nodes lack an Edmonton source, 7 lack a Vancouver one. The worked example is Vancouver only; an Edmonton worked example is a parity gap.

## Ambient loop: Blatchford (16 Oct 2026, J.B.: "yes u can model it")
Blatchford's District Energy Sharing System is an ambient loop (8–32 °C supply, design guide v8, 2025), so server heat can enter through a heat exchanger with no heat pump at the data centre, including air-cooled heat. The Edmonton heat tab shows it when Blatchford is within reach: heat offered (IT energy as the upper bound), when it is wanted (CWEC: 75–89% of hours below a 12–18 °C balance point; June–August 6.5% of heating need), scale against the 2021 plan's 3,031 MWh delivered 2020–24, money not yet known, and the open questions (outside heat accepted? winter capacity? summer heat). Not a verdict: shown as an observation with its unknowns.

## Receiver list condensed (16 Oct 2026, J.B.: "a lot of information that doesn't do anything")
Rows are listed only for buildings within reach of break-even or whose demand is unknown (up to 15 per kind). Buildings beyond break-even are summed in one line per kind: how many, homes in all, the range of route lengths, and what would close the gap for the nearest; the box lists them on request (off by default). The connection difficulty shared by most of a kind goes in the header with its count; a row shows it only when it differs.

## The path and closed sections (16 Oct 2026, J.B.: "tabs that open (but present closed)… make the path through the tool clear")
Five steps across the top of the panel on every site view: 1 Site, 2 What fits, 3 Exchanges (Heat, Electricity, Water, Materials, People), 4 Could become (Opportunities, Three options, Over time), 5 Report (PDF and HTML, to be built). Real buildings and Two cities are context links under the steps. Views open with the finding (red = emphasis), then sections that start closed but show their one-line answer; opening state is kept for the session. Piloted on Heat; other views to follow once J.B. approves the pattern.

## Simple massing (16 Oct 2026, J.B.: "why are we making the shape be funny… i just want simple massing")
The building is now the largest plain rectangle, in the lot's own frame, that sits wholly inside the lot and its setbacks (scaled down to the coverage when coverage is set), instead of the lot clipped by a rectangle (which made wedges and curves). The loading strip is fitted the same way, so it never sits outside the lot or under a neighbour. "Class B" is now described as a truck loading bay (the Parking By-law's mid-size bay, 10.2 × 3.4 m, 3.8 m clear).

## Equipment, not a building (16 Oct 2026, J.B.: "its not a massing tool… its more about capacity")
No building is drawn for a new data centre. The 3D shows the lot, the zoning's buildable area as a grey dashed outline, a flat red outline of the floor the chosen size needs ("any shape"; MW × 460 m² of hall per MW ÷ 0.6 hall share, spread over the storeys; with m² and ft²), the racks inside it, and the plant at real sizes (roof units drawn at roof height). Capacity ("what fits") is still worked out on the full buildable area, so the drawing never feeds back into the numbers.

## One guided path (J.B., 16 Oct 2026)
- A welcome card opens at once: a worked example, or my own site.
- Everyone walks the same steps: site, set-up, what fits, real buildings, heat, electricity, water, materials, people, each opportunity not ruled out here, the ones not possible here, three options, over time, two cities, report.
- Back goes to any step already reached; there is no skipping ahead. Picking another parcel restarts at its set-up; changing an answer drops what later steps showed.
- Only opportunities not ruled out get a step (J.B.'s choice); the rest are listed once with the gate that fails.
- Real buildings, Over time and Two cities are folded into the steps (J.B.'s choice).
- The report is built from what each step showed when it was passed, and downloads as HTML or PDF.

## How-it-works cards (J.B., 17 Oct 2026)
- Every exchange step and every opportunity step has an optional "How it works" card: a few steps, each a schematic animation or a chart of this site's own figures, with the trade-off in a sentence.
- Charts use the tool's numbers only (same model as the panel); drawings are schematic and say so. Chart colours validated for the dark panel; every mark is labelled; "Show the numbers" gives the table.
- Pie (donut) charts only for parts of one whole (power split, receivers by kind); bars for comparisons, one unit per chart.

## Decisions as cards (J.B., 17 Oct 2026)
- The set-up is now one decision per card: an animation of the option picked, its upsides and downsides, the choices as one row, and what fits as it stands. Next moves to the next decision.
- What is being built has four options: a new building, a shared new building, a retrofit of an existing building, or leased space in a building (same answers underneath: new/existing × whole/part).
- To do: the same card form for the exchanges, the opportunities, the options and the report.

## The walk-through card (J.B., 17 Oct 2026)
- Once a parcel is picked, every step opens as one centred card over the map; the side panel collapses. "New parcel" clears the site and returns to the map.
- Left: the 3D, turning slowly, seen from above, nearby buildings see-through; under it, the step's chart, large. Right: the words, choices and Next.
- Each set-up option is checked against the parcel (possible, with a condition, not yet known, not possible and why); an impossible option shows its reason and no animation.

## Design pass on the walk-through card (17 Oct 2026)
- One header: step names always shown in the tabs; the group's place shown as a thin segmented bar, not a second text line. Kickers are sentence case, not tracked capitals.
- Readable type in the card: body 14.5 px, lead 15.5 px, headings 22 px; small labels no smaller than 12.5 px.
- Section tiles became rows (label left, answer right, two lines, ›). Gate tables summarise as counts ("2 possible here, 3 not yet known"); rule tables as "rung: verdict".
- The cooling assumption moved from above the title to a quiet line above the buttons. Sources moved into "All the detail".
- Buttons stay pinned at the bottom of the card. Long step names shorten to "Back" / "Next".
- 3D key hidden behind a "Key" button; label collision boxes larger, so fewer labels overlap.
- A not-possible option keeps its upsides and downsides, faded and marked "(elsewhere)".
- A heading that repeats the address gives way to the step's name. Report is a centred 900 px column.

## Pushing it further (17 Oct 2026)
- Section names in plain language (Draft wording (Claude), for J.B. to rewrite): How it compares, What could connect, What could be added, Does it work here?, What the rules say, Where it has been done, The street edge, Who is nearby.
- Each step says its point once, large (the lead line); the step's topic sits small above it.
- Opportunities grouped by family: six cards instead of thirteen, plus "Not here" in each card. Rows show the status pill, readiness pill and the first unknowns or the gate that needs a change. Picking a row shows its detail, How it works and 3D. The path is now 19 steps, not 27.
- A not-possible option greys out the 3D, with a line saying the 3D shows the site as set up.

## Cards inside the card (17 Oct 2026)
- J.B.: "the add-ons need to be their own card and each add-on opens another new card, because this right-hand toolbar is in the way."
- While the walk-through card is open, the side drawer no longer opens over the map. Everything it showed (a step's section, the add-on list, each add-on, the cooling choice, Explore cards) opens in the card's right column, over the step, with "← <where it came from>". The 3D stays on the left and shows the add-on.
- Clicking a row on a step opens that section as its own card (it used to expand "All the detail"). "What could be added" is the add-ons card; each add-on opens from it, and Back returns to the list.

## Fixes from the verification sweep, critical items (18 Oct 2026)
- **C1 full-load vs average power.** "Average power" was servers × PUE, which is full-load power; the yearly energy already uses the 0.6 load factor. Now shown as two figures: power at full load (sizes the grid connection, cooling plant and, conservatively, the demand charge) and power on average (× 0.6, sets the yearly energy). Cooling card: heat "at full load" and "averaged over a year". The "60% of peak" wording waits on reading Fan et al. 2007 (sweep M94: the 0.6 may be average ÷ provisioned).
- **C2 What fits was history-dependent.** The range is now worked out with the cooling plant sized for the top of the range itself (found by halving between 0.1 and 40 MW, since a bigger plant leaves less floor). Plant comes in whole units, so the top is capped at the size the plant was sized for. "How" says which size the plant was sized for. The size the user picks still sizes the plant in the 3D and the equipment counts.
- **C3 Edmonton UI and FD.** Checked against Bylaw 20001 (data/raw/edm/bylaw/b.txt): UI s. 2 lists no industrial use; Minor Industrial appears only in Appendix IV (NAIT Main Campus, Sub-Area 2), limited to storage. FD allows Minor Industrial only as temporary outdoor storage with no permanent structures. Both now "Rezoning needed". Register entry corrected; the sweep's claim that "IH-existing" was wrong was itself wrong (IH s. 2.2: Minor Industrial limited to those existing on 1 Jan 2024), so that part is kept.
- **C4 Heat headline.** Counts only buildings with a known heat demand and says how many have none yet, by type.
- **Web checks (18 Oct, with J.B.)**: see audit/verification_sweep_2026-10-17.md, "Web checks done". Sound power per ~1 MW unit now 98–101 dBA (Trane RTAF size 280), up from 91–101, so quiet-zone distances grow. EV stalls per MW corrected to 52–270. Vancouver light rule (By-law 4548 s. 7) now stated. Fan et al. load factor relabelled.

## Sweep fixes, batch 2 (18 Oct 2026)
- **Heat value ÷ 0.85 (M1).** A MWh of heat displaces 1 ÷ 0.85 MWh of gas (register price_ceiling). Vancouver heat now worth $16.8–24.3/MWh after the heat pump (was $10.9–18.4); Edmonton −$6.0 to −$0.5 (was −$7.6 to −$2.0). Break-even distances move with it (1169 Richards: 4 within break-even, was 1). "Gas at about $X/GJ" in the cards is converted back to gas.
- **NEU levy (M21).** $123,873 + $146/kW, in force 1 Jan 2026 (By-law 9552 Sch. C Part 1 via By-law 14524, read from data/raw/van/9552.txt); credit $65.172 × 50% = $32.59/MWh confirmed.
- **Networks (M16–M18).** Networks are sorted inside first, then nearest, so every view names the nearest (1169 Richards: Creative Energy, 272 m, not the NEU at 733 m). The $32.59 credit and "possible here" only for a parcel inside the NEU; outside it, or for another network, demand and money are "not yet known". Blatchford money line uses $0.0358/kWh (2025–26, operator claim) instead of the 2022 $0.0269. "The NEU runs mostly on sewage heat" and the ±45 m / By-law 9552 source line only for the NEU.
- **Vancouver rules on Edmonton parcels (M27, M44, M45, M49, M50, M46).** Rezoning time: Edmonton's 160-day target for a complex rezoning (City complexity sheet, data/), then a public hearing. "I-2 limits" → "IM limits" in Edmonton. Battery earnings: AESO reserve thresholds (5 MW supplemental, 10 MW spinning, or an aggregator; ISO Rules 205.5–205.6) in Edmonton; the BC line now says the programme doesn't state whether batteries qualify. Blackwater ban only in Vancouver. Sewer rules by city (Bylaw 299 wording corrected to "entering any sewage facility"; EPCOR Bylaw 18100 approval in Edmonton). Gold Bar: "Suncor named" and "existing pipe" removed; utility claim, customers not named.

## Sweep fixes, batch 3 (18 Oct 2026)
- M4: How-it-works heat card counts every receiver within 1.5 km, as the Heat step does.
- M5: Options "Within reach" no longer marked met; says it is straight-line reach (Dutch distances), and that the Heat step tests break-even.
- M8: Edmonton non-market homes "not known: no list loaded" instead of 0.
- M9/M10: connection card gives floor area × CEUD for non-housing receivers; share of heat no longer prints low above high ("more than all the heat offered" where so).
- M11: "electricity below about $X … before any route can start to pay back".
- M12: simple payback labelled "on the connection levy and pipe only; heat pump, operation and demand charges not included".
- M13: NEU yearly credit labelled "if the NEU took all the heat offered".
- Connection card "value of the gas": gas $/GJ burnt in an 85% boiler = $/MWh of heat (follows the M1 fix).
- M20: district-energy areas labelled NEU traced, others approximate (legend, 3D labels, limits, cities table).
- M22: 65 °C attributed to the NEU guidelines, not By-law 9552 (guidelines not re-read).
- M24: downtown grid: "no new 12 kV feeder positions from fiscal 2027 until the West End substation (expected July 2032; application not yet decided); temporary measures in between" (CPCN s. 2.2.2, local PDF); state "with a change", not "not". Parcels outside the checked zones no longer told they are "not in the freeze" (M23 boundary still to trace).
- M25/M26: 12–36 months attributed to Dominion Energy via JLARC (transferred); AESO 2021 weeks labelled as generation and storage, not loads.
- M28: UPS flexibility in kWh.
- M33: heat-pump plant area: unit 3.4 m²/MW (claim) plus DEA whole-plant 100/50/30 m²/MW at 1/3/10 MW (sheet 40, local extract).
- M37: no standby fuel shown when no generators are chosen.
- M43: blowdown-to-sewer row has its own rules (Metro Vancouver permit above 300 m³/30 days; EPCOR written approval), not the recovery add-on's.
- M51: "case by case" zones show "Possible, with a condition" with the zone's reason.
- Options table: "Power at full load" and "Power on average" (follows C1).

## Sweep fixes, batch 4 (18 Oct 2026)
- M38: fuel storage room limits from NFC 2020 Table 4.3.13.4.-B (checked on the code page in data/raw/codes): 200,000 L first storey; basement or upper storey 20,000 L (tanks 2,500–20,000 L) or 45,000 L (tanks over 20,000 L); both shown when no storey is chosen.
- M39: generator testing uses every installed set (spares included), per the register's units × kW × hours; no longer called an upper bound.
- M40: Edmonton standby generators: EPEA exemption only, AUC power-plant approval still required (AUC 27938-D01-2023); GoA says EPEA approval over 50 MW. Rule state "approval".
- M48: rainwater source line: runoff 0.8 and tank assumed; CSA B805 not read.
- M53: Edmonton BE setbacks applied from Bylaw 20001 Table 4.1: 6.0 m street (4.5 m on collector or local road; road class not read, 6.0 used), none to sites or alleys, 6.0 m beside residential (not applied).
- M54: Edmonton IH lots under 1.0 ha flagged (s. 2.140, 4.1.1) as "Allowed use, lot under 1.0 ha" in the site facts (map colour unchanged).
- M55: Vancouver I-2 sub-area B: data-centre FSR 3.0 (transportation and storage capped at 3.00, s. 3.2.1.1(a)(iv)); the 4.0 total needs other uses.
- M56: FC-2 heights by sub-area stated (22.9 A/B, 10.7 C1/C2/D, 18.3 E); tool still uses 22.9 as sub-area is not read.
- M57: I-3 sub-area A discretionary height to 45.7 m (s. 3.1.2.11).
- M58/M59: ground-floor rule read from the zone (not the new-build case) and "not known" where the zone is not read.
- M60: retrofit downside no longer claims an NBC load check.
- M63: "Neighbours over their limit … within 600 m".
- M65: Vancouver flood wording from VBBL 2025 s. 2.2.10.3(2)–(3) (read locally): services below FCL protected and accessible; no hazardous substances such as diesel below it.

## Sweep fixes, batch 5 (18 Oct 2026)
- M67: existing buildings: all parts' footprints now count (the code sat inside a comment); yard plant avoids every part.
- M70: Edmonton height labelled per part: tallest measured part (City 3D) and estimated parts shown separately.
- M73: EV stalls "by area" with a note that the 3D packs whole rows.
- M74: 3D floor label says "X MW needs" only when sized; otherwise "data-centre floors hold", without a ground floor the zone keeps.
- M75: 10 m standoff ring now drawn outside the building (offset sign was inward for both windings).
- M76: What-matters-most bars capped at 40 MW like What fits.
- M78: report sources deduplicated on the whole string, so Energy, Water and Materials sources are kept.
- M79: Qu EDM2 heat and water "not stated"; VAN4 water "none stated (operator claim)".
- M81 (partly): EV stations labelled "public and private together" (the NRCan access code is not in the tool's file; filtering needs a re-download).
- M82 (partly): route fallback wording no longer claims centrelines are missing.
- M83: Edmonton ground storage: no Water Act authorization for a vertical closed loop above the base of groundwater protection; driller Class F; 3 m / 1 m setbacks (sources/15c, verified there).
- M84: Vancouver I-2 bans keeping live animals (s. 2.2.1(b), 2.2.2(b), read locally): fish and insects out, algae possible; other zones "not read".
- M88: Edmonton cold days defined by daily maximum.
- M90/M91: benchmark wording (11 buildings: 6 approved, 2 proposed, 1 refused, 1 under construction, 1 unknown; checked in bench/benchmarks.json); precedent legend fill = tier.
- M92: SFO12 and 400 S LaSalle labelled "operator claim, unverified (aggregator copy)"; "former CBOE building" dropped; 22 MW noted as expandable.
- M97: Edmonton priority areas re-read from the Strategy table (Oliver first priority; Mill Woods the only second).
- M99/M100/M101/M103/M105/M106/M107: register and limits wording (servers' making vs running is the tool's own inference; wells box wording; heat_temp air/liquid unverified; Meta COP after 2021 is combined; UPS minutes and generator 10–20 s labelled; Stockholm "10-year call-off contracts (reported)"; Telia ERF basis not stated; building shell life is an accounting write-off).
- Batch 5 additions: M29 Vancouver utility-programme rung is BC Hydro Demand Response for Business (battery eligibility not stated), not the Call for Demand. Minor: jobs range no longer prints low above high; immersion capture bar "not yet sourced" instead of none; comparison MW not rounded to 0; "na" rules count as not yet known; Nat Bailey Stadium (outdoor) removed from receivers; Vancouver rainwater "with an operating permit and an engineer's design" (VBBL 2025 s. 2.7.5.3, 2.7.6.1, read locally).
- Items needing J.B.: audit/decisions_for_JB.md.

## Batch 7 — heat items 1–7 (18 Oct 2026, J.B. "go")
Sources for every item: `audit/heat_items_sources_2026-10-18.md`.
1. **Gas price (M2):** the commodity is averaged over the same 12 months in both cities (Nov 2025 – Oct 2026); the rest of each tariff stays at the current schedule.
   - Vancouver: FortisBC cost of gas $2.230 → $1.660 (BCUC G-50-26), mean $1.8975 → $9.54/GJ in all. October 2026 "unchanged" is from a FortisBC release copy; the BCUC letter was not read (unverified).
   - Edmonton: UCA regulated rate, mean $2.025 + ATCO delivery $1.045 → $3.07/GJ.
   - Effect: at COP 4.5 Edmonton heat is now worth +$1.9/MWh (was negative); at COP 3.0 it is still −$3.6.
2. **Break-even cap (M3):** a building buys min(its demand, heat offered). This flows into value, break-even distance, payback and "what would close the gap". Example: St Paul's at 1169 Richards takes 3,244–5,913 MWh of its 35,296 at 1 MW.
3. **Month ratio (M14):** s = space ÷ (space + water), CEUD residential 2018–22 (BC 0.674, AB 0.761) → 4.9 : 1 Vancouver, 5.0 : 1 Edmonton (was 3.9 / 3.3). Edmonton is now the more seasonal city. Stored in R.monthRatio.
4. **Air cooling (M15/M41 wording):**
   - "None to reuse" is removed everywhere. Air cooling with chillers is "possible with a change: heat pumps on the chilled-water loop or chiller condenser" (Oró 2019; Požgaj 2025).
   - The figure is "not yet known". Greenhouse, aquaculture and new-district sizes are labelled "if liquid-cooled", and their physics gate follows the cooling choice.
   - Compare: designs without recovery say "no heat recovery in this design".
5. **Cooling for neighbours:** temperature gate added. Liquid-cooled: adsorption possible (from about 45–65 °C; LRZ operator doc and a preprint, lower confidence); absorption needs 70–90 °C+ (Chen 2026). Air-cooled: heat pump first ("possible with a change").
6. **"Lower-carbon" (M89):** the word is dropped. The connection card shows per MWh of heat: gas boiler ≈ 218 kg CO₂e against heat-pump electricity 4–6 kg (BC) or 77–115 kg (AB). Average grid; the data centre's own cooling is not counted.
7. **Homes heated (M96):** 2018–22 average, 16.81 / 33.14 MWh per home (was 2023: 14.58 / 29.19).
Also: negative money is shown as −$; the BC/Alberta price label now follows the city, not the sign. Register updated (homes_heated, demand_profile, price_ceiling, absorption, liquid_capture, heat_temp, grid_co2) with 9 new sources.

## Batch 8 — receivers and networks (18 Oct 2026, J.B. "yes")
- **M6 one record per site, own building only** (`tool/dedupe_receivers.py`; replaces receiver_floor.py's whole-parcel sum).
  - Hospital records on one campus are merged: Vancouver 20 → 6 sites, Edmonton 13 → 8. Same-name duplicates are merged (Scona, Oliver, Fred Broadstock, Queen Elizabeth, Mill Creek pools; Evansdale, Delwood, Avonmore halls; Columbia College; Youngstown School). Merged names stay in "also listed as".
  - Floor area = the building outline the point sits in (else the nearest within 40 m) × storeys at its tallest point; an upper estimate.
  - Records with floor area: Vancouver 154 → 259; Edmonton 309 → 299 (it was a parcel sum before).
  - Demand is shown as not yet known, with the reason, for:
    - a connected complex under one outline over 30,000 m² (University of Alberta Hospital with Mazankowski and Stollery; NAIT; Commonwealth; Londonderry mall);
    - schools that rent space (ODEF "Private Institution", 63 Vancouver / 54 Edmonton, or a school in a building 40 m or taller);
    - a second record in a building already counted (an arena inside a recreation centre).
  - Largest remaining: Vancouver General 41,138 m²; Grey Nuns 182,901 m² (one 18,290 m² outline × 10 storeys at 38.6 m; upper estimate).
- **M7 categories:** Edmonton's 141 ODSRF "Community league hall" records become their own type (134 after merging), so "recreation centre" means the same in both cities (Vancouver 27, Edmonton 20). Outdoor pools are summer-only (4); Scona and Borden are listed both indoor and outdoor (2, "sources differ"); demand not yet known for both.
- **M16 outside the NEU (By-law 9552 read):** s. 2.2 lets an owner "outside the boundaries, but in the vicinity" apply. The City Engineer must find the system capable and the service necessary or desirable, and the owner pays toward the extension. The credit (Sch. C Part 4) is netted on the connected building's own bill (s. 8.3). Gate is now "possible with a change", not "not yet known".
- **M23 downtown grid area:** the tool now tests BC Hydro's Study Area (CPCN, 10 Nov 2025, p. 2 fn 1), not seven downtown zones. It is drawn as the union of the four City local areas the footnote names (Downtown, West End, Strathcona, Grandview-Woodland; City open data, J.B. download): `data/networks/van_cpcn_study_area.geojson`, f.cpcn. 1425 Clark Dr (I-2) is now inside. Wording: "downtown supply area (to Nanaimo St)". The downtown steam note stays on downtown zones (f.downtown).
- **M86 campuses:** new type 'campus' for public universities and colleges with their own grounds.
  - Vancouver: 7 sites from the B.C. Locations of Post-Secondary Institutions file, "Public Post-Secondary", not "Centre", inside the City (UBC Point Grey is outside). One of them is the Centre for Digital Media, shared by BCIT, ECU, SFU and UBC.
  - Edmonton: 4 sites from the four public types on Alberta's list: U of A, NAIT, NorQuest, and MacEwan (City Centre Campus address from macewan.ca, located by the City property record).
  - Independent academic institutions (Concordia, King's, MaKami) stay schools, for parity with BC's private degree-granting institutions.
  - Campus demand is "not yet known" (several buildings; the institution's own energy reports not read). BCIT Downtown and SFU Harbour Centre sit in towers.
  - The "Hospital or campus anchor" gate now counts both hospitals and campuses.
- **M66 existing floor area (18 Oct 2026, J.B.: "we can't have wrong square footages").**
  - City reporting map, Export data → Disclosed Data (316 buildings, reporting year 2025): owner-reported gross floor area is now used on 266 parcels (255 buildings), matched by address (`tool/make_gfa_reported.py` → `tool/gfa_van.js`). Not used where the reported area exceeds 1.2 × a 3 m-storey estimate (28 left out, e.g. 1255 Seymour).
  - Elsewhere: each part × its own storeys (height ÷ 4 m), shown as a range of 0.48–1.23 × the estimate. Against the 255 reported buildings this method was 19% low to 109% high for the middle 80% (median +14%), so it is not always an overestimate.
  - Buildings 40 m or taller: 727 by address, 131 with a reported area, 596 still estimated. BC Assessment Gross Building Area would cover them (licence: needs Jeremy Buhler's written OK).

## Batch 9 — plant, size and model (18 Oct 2026; sources in audit/plant_sources_2026-10-18.md)
- **M31 cooling equipment by type.** Air cooling with "dry" outside is now laid out as air-cooled chillers with free-cooling coils: 12.1 × 2.2 m at about 1.06 MW, or 17.1 × 3.0 m at about 2.29 MW above 6 MW of heat (Trane TCA, claim). Liquid cooling keeps dry coolers. Set-up text says dry coolers can't make water cold enough in summer, and free cooling covers about 37% (Vancouver) / 63% (Edmonton) of hours (Claude's count from CWEC).
- **M30 one basis.** Cooling space is per MW of heat (× PUE): chillers 17–26, dry coolers 19.5–30.5 m²/MW. The noise count uses the same units the plant lays out, spares included.
- **M32 noise.** Lw per unit: chillers 98–101 dBA, dry coolers 98.5–102 dBA (manufacturer claims). Towers and hybrid coolers are labelled as using a stand-in.
- **M34.** A plant shortfall ("Doesn't fit at 22.1 MW: 11 of 19 generators do not fit in the yard") is shown on the set-up card.
- **M35/M72.** "The low end of what fits" is replaced by "a provisional size until one is set". Opportunities, Heat, connection cards and Solar use the same provisional size as the plant (rounded to 0.1 MW), not 1 MW. The report says when a size is provisional.
- **M77.** Report steps recorded before an input change are marked "Recorded with earlier choices — open this step again to update it".
- **M102.** Register pv_roof now matches the panel-row layout the card uses.

## Batch 10: sight lines (M64), 18 Oct 2026
- M64: Vancouver lanes added (City of Vancouver Open Data "Lanes", 7,856 segments, updated 27 Jul 2026; J.B. approved download 18 Oct). Both cities now place street viewpoints on street and lane/alley centrelines; Edmonton unchanged. Lanes also join the Vancouver pipe-route network (Edmonton alleys already did). Lane surface not recorded: drawn as paved. 1425 Clark Dr: 128 → 150 street points, 26 → 27 see the plant.
- Also downloaded: "Noise control areas" (3 outlines, City, modified 2020). Its "Intermediate Zone" outline matches the shape of By-law 6555 Schedule B.1 (north shore of False Creek, plus a small area at the south end of the Burrard/Granville bridges) — to be used for M62.

## Batch 11: Lots & data (18 Oct 2026, J.B. "go ahead")
- M47 Rain on the roof: new building = the footprint drawn from the site setup (else the yard-based footprint); existing = all roofs on the lot added together (before: lot outline × 0.86², 0 with no outline; existing used the largest roof only). Register: C = 0.8 and tank assumed, CSA B805 not read.
- M81 EV stations: rebuilt from the NRCan files already held (make_ev.py): open and public only. Vancouver 505 (was 544; 39 private dropped), Edmonton 201 (9 private dropped). Tesla-only stations counted and named on the card (16 / 5).
- M62 Vancouver noise zones: CD-1 by number from By-law 6555 Sch. A/B/G; B.1 outline from City open data (Intermediate Zone). Unlisted CD-1s are quiet zones, as the by-law reads (e.g. Coal Harbour CD-1 289, 316, 363). 70/125/905 in both lists → intermediate.
- M61 Edmonton noise: explicit residential list (Bylaw 20001 s. 1.8.10 purposes); mixed use and Direct Control = residential limit, assumed, counted apart.
- M71 Water lots: BURRARD INLET and FRASER RIVER NORTH ARM are not selectable as sites (shown as "Water lot").
- M68 Edmonton lot picking: the record whose recorded lot area best fits the clicked outline (was the largest); record looked up in neighbouring tiles; lot area falls back to the measured outline when the record is missing or under half of it (as Vancouver).
- M69 Vancouver lot area: all parts of the tax coordinate, measured from the City parcel outlines; buildings found across all parts; label no longer says "tax record".
- M70 Edmonton heights: unmeasured estimates over 40 m (219) shown as "height not known" and drawn one storey. City 3D parts with no roofline outline added as buildings (edm_3d_unmatched.py, edm_3d_add.py): 75,041 parts → 54,249 buildings (≥ 10 m², ≥ 2.5 m), flag 7, outline = convex hull of the parts; includes the 243 m and 200 m downtown towers.

## Batch 12: Labels & register (19 Oct 2026, J.B. "yes")
- M85: Greenhouse, Aquaculture, Sewage heat and Warming centre ladders now state the clauses read, zone by zone; the card gate joins the zone's use-table result with the ladder's other rungs (the warming centre's building-code rung no longer drops out) and shows the worst.
- M87: District heat readiness → built elsewhere (Tallaght, Odense, Mäntsälä operating). TELUS Garden TES is operating (BCUC G-152-24, 2024; service since 2016) but no source read says data-centre heat is still recovered. New district readiness → speculative: Westville/'Franky' still being built in Sep 2024 (ZfK, trade press); 2,400 MWh/yr marked as the planned minimum; heat_delivered calibration notes marked planned / design forecast.
- M93: CloudHQ Offenbach — the City page (German, read 19 Oct 2026) gives 108,000 m² Nutzfläche (usable floor area, not gross): moved to context. Gross benchmark now n = 10, p75 814 (was 964).
- M95: register it_load_outside aligned to the tool (290–630 m² of hall per MW, Canadian operator claims; RVO and US federal densities kept as context); it_load_actual states the single 0.6 used.
- M98: refrigerant_co2e sourced to IPCC 2019 Refinement Vol. 3 Ch. 7 Table 7.9 (chillers: 10–2,000 kg charge, 2–15%/yr loss, lower end for developed countries); confidence 90 → 60.
- M104: PUE confidence 100 → 80.

## Parked: the site report (20 Oct 2026, J.B.: "we can keep polishing this part over the coming weeks")
- Done: three reports, one per template (make_templates.py `reports`), drawn in the tier chooser, on each cover and on the logic page; white1 booklet style; opportunity tests legible.
- To come back to: empty space on pages 02, 04, 05; Edmonton section label overlap; depth differences between the community and full reports beyond the logic page; whether the three reports also go on the full tool-logic diagram (workflow map tiers, step 6).
