# Beyond Data worklist (from Cowork, 5 Nov 2026)

How to use this file (Claude Code):
- Work top to bottom. One item at a time. Tick it (`[x]`) with the commit id when done.
- **Gate** = stop, report to J.B. (weaknesses first, then results), wait for "go".
- **Owner:** Code = Claude Code does it. J.B. = her decision or retrieval: ask, don't guess. Cowork = research or design boards done in the Cowork chat: write the question into `checks/to_cowork.md` and carry on with the next Code item.
- Every item: sourced or "?", register patch + rebuild, tests pass (START_HERE.md "Tests"), all four templates checked for relevance.
- Every report says what is weak, what wasn't checked, what is out of date. Never hand over out-of-date work without saying so.
- At the end of every session: commit, push (with J.B.'s OK), and remind J.B. of anything in the J.B. column.

Dates: match a user **6 Nov**; peer reviews **13/17 Nov** and **27 Nov**; architect user tests (being booked); final **10 Dec**.

## 0. Set-up (first session)

- [x] Code (7 Nov): clone, add the bundle, unzip the tiles, install test tools (`Desktop\Claude Link\CLAUDE_CODE_FIRST_STEPS.md`).
- [x] Code (7 Nov): run golden + Architecture baseline; both must match `checks/golden/` before any change. Matched apart from the known mwPick race and the Next-label race (fixed 75ca761).
- [x] Code: push `overnight-2026-10-30` (all commits after ade54ea) with J.B.'s OK. Pushed 7 Nov, ade54ea..971ed92.
- [x] Code (7 Nov): read START_HERE.md, CLAUDE.md, the 3–5 Nov notes. Then tell J.B. in 5 lines what you understood and what looks wrong or missing. **Gate.**

## 1. Clean-up of decisions already made

- [x] Code: remove Twin from `tool/data/arch.json` typologies (dropped by J.B.). Check the Ratios hold-back still picks the right smallest typology. 94d622e. Hold-back picks Heat hub (an add-on, not a typology): J.B. to decide.
- [x] Code: remove aquarium and lumber drying from `tool/arch_programs.json` (dropped); hide food drying and winter garden ("out for now"). Keep the climbing wall. 9f97412.
- [x] Code: remove the Community template (tiers.js, flow.js SKIP, templates.json, register tier tags); move anything only it showed to Resident or Engineering. Already done 4 Nov (a38224a); left: `checks/tests/sweep_community.js` still runs the dropped tier (delete with J.B.'s OK).
- [x] Code: check the old 2.4 m fence wording is gone everywhere (now 1.9 m everywhere; notes line 40 is historical). e8895ac (register security_layers, scene3d.js).
- [x] Code: Arrange stays automatic: no drag, no free arranging (J.B. 5 Nov). Remove any leftover "arrange it yourself" wording. None found; the Arrange lead still offers resize and lock, which the tool still has (J.B.: remove now or with the typology picker?).
- [x] Code: CLAUDE.md: repo is public, four templates, phase table marked out of date. 6d7ca1b. **Gate.**

## 2. Architecture fixes the sweep would inherit

- [x] Code: draw the inside loading dock in Arrange (ground-storey block at the rear, drive side; the hall may sit over it). f7a3d94 (dcrooms.js; rear end, v0 corner as a drawing choice: which side the drive is on is not checked ?). On Edmonton lots the dock takes ~40 m² of hall floor on the ground storey, said in the room note.
- [x] Code: loading count uses the data centre's floor only. Re-read Bylaw 20001 Table 7.2 / s. 5.80 and Vancouver Parking By-law s. 5 (whole building or each use?), then fix. 630178f: Edmonton Table 7.2 is one threshold on the building's non-residential floor (data centre + programs); Vancouver s. 5.1 counts each class separately and adds them. E06A's bay is back; E06B gains one (3.5 → 3.4 MW); CLARK 3 → 4 and V339 2 → 3 after picks. Re-baselined 7bfbc49.
- [x] Code: hand-check 1425 Clark Dr (2.8 → 4.9 MW after the loading fix) by an independent agent: re-measure ground, plant yard, bays, drive. Done 7 Nov (checks/agents/2026-11-07_clark_handcheck.md): lot, yards, buildable area and floor arithmetic agree; the MW does not follow from the ground. Fixes waiting for J.B.: (1) generator plant yard square to the frame on a skewed rear line, no B139 3.0 m row-end distance, so the sets fall to the front and cap 5.1 MW; (2) 463 m² drive charged on every Vancouver lot (edge 'abuts' set only for Edmonton; confirmed in code); (3) the dock is reached only through the empty plant yard; (4) hallRoom 2,151 vs 3,754 m²; (5) loading: clinic as Office Use (5.2.9) +1, by-law rounding to nearest (our reading), data centre support rooms in its floor; (6) notch edge yard (our reading).
- [x] J.B.: inside loading dock as the Architecture default — yes or no? **Gate.** Yes (J.B. 7 Nov 2026).
- [x] Dock access (7 Nov, 7482a0b, J.B.'s rule): a truck lane is reserved in the plant yard (straight from a rear lane or street, units beside it; else 6.1 m along the rear face). Reached on CLARK and E06B; E06A and V339 have no street or lane at the rear or sides and are flagged (a drive from the front is needed and not drawn). Sweep: 95 Vancouver and 2,240 Edmonton lots are like that. Open for J.B.: draw that drive, or another rule.
- [x] Size test (7 Nov, 7482a0b): at the conservative ≈635 m² per MW (J.B.). Engineering: CLARK 14.1 → 9.0, E06A 8.9 → 7.2, E06B 8.4 → 6.8; E123 stays 40 MW (slider maximum) with an 86 m yard. Open: generator noise not checked (no sourced sound level; J.B. retrieval: Rehlko KD2000 Sound Level 2 sheet; read Van 6555 and Edm 14600 on standby generators).
- [ ] Open (7 Nov): which side the trucks' drive is on. The dock is drawn in the v0 corner at the rear as a drawing choice; nothing checks that a truck can reach it from a lane or drive. Settle with the section 5 rule sheet (bands, service routes).
- [ ] Open (7 Nov): 74 Airport Rd (E06A) clinic is off the street front since the hold-back change (b86cfba). The section 5 bands rule (forecourt → public → lobby → data centre → plant) should put the clinic back on the street front; check it there.

## 3. Size of the problem

- [x] Code: zone rule: in Architecture mode typologies only on lots where a data centre is permitted, conditional or discretionary; others say "not allowed here; rezoning needed". 573ace3: not-allowed lots say so on every Architecture tab; 'as if rezoned' is a flagged opt-in.
- [x] Code: build the lighter test run (no 3D, no screenshots, parallel pages) and time it. 77c385f: sweep_ground.js, ≈0.16 s a lot with 4 pages (5,932 lots in 326 s).
- [x] Code: sweep every data-centre-zone lot (≈697 Vancouver, ≈5,232 Edmonton): ground wasted by the one-rectangle fit, leftover shape, lot depth and width, minimum lot size that holds anything. Report the distribution. **Gate.** checks/agents/2026-11-07_ground_sweep.md (aggregates only). Median 6–7 % of buildable unused, p90 23–25 %; leftover shape not measured.

## 4. Clause reads (Cowork does the reading, Code wires the results)

- [x] Cowork: fire access route width (NBC/BCBC 3.2.5.6). Done 7 Nov: `checks/research_arch_v1/clause_reads_2026-11-07.md` §1.
- [x] Cowork: what may sit in side and rear yards (I-2, I-3, BE, IM, IH). Done 7 Nov (§3); "service area" reading to confirm.
- [ ] Cowork: LiDAR vertical datum vs flood-level datum (Vancouver). Partly done 7 Nov (§4): FCL 4.6 m GVRD datum read; LiDAR datum and GVRD↔CGVD link still ? (retrieval).
- [x] Cowork: lobby size from occupant load and exit width (NBC 3.1.17, 3.4.3). Done 7 Nov (§2): no code lobby area; NEW rule 3.4.4.2.(2)(c); doorways 850 mm.
- [x] Cowork: which lots are in I-3 sub-area A; CD-1 by-laws naming data centres. Done 7 Nov (§5): 31 of 32 I-3 lots in A, 370 Prior St in B; CD-1 (818) found, other CD-1s not searched.
- [ ] Code: add each result to the register by patch and use it. 7 Nov: register done (43f2ba1: sources + 5 conditions); 370 Prior St flagged sub-area B (f866712); plant already packed outside required yards (plant.js), no test yet; no 800 mm doorway found. Left: checks 8, 10, 15 and 18 use the conditions when section 5 builds them; CD-1 (818) not in the zone table: 720 Beatty St and 701 Expo Blvd are not in the Vancouver tiles (searched 7 Nov); datum retrieval open.

## 5. Emergency hub rule sheet (the first automatic typology)

- [ ] Code + Cowork: **check the hand test fits before they become the reference** (J.B. 5 Nov: not convinced the plans work; not a full code analysis, the main code moves must work). Independent agent, plan by plan, on the 18 schematic checks below. A fail on a hand plan is fixed on the board (Cowork) before the automatic fit copies it. **Gate.**
- [ ] Code: the same 18 checks run after every automatic layout and show as one pass / flag / "?" line each, with clause, in the tool and the report (marked "schematic: main code moves only"):
  - Zoning: (1) use allowed, or flagged rezoning / conditional use; (2) height and floor area; (3) yards per edge; (4) storey heights (I-3 6 m ground, 4 m upper); (5) loading count and placement, off the street.
  - Building code: (6) construction and area limit, F-2 governs (NBC 3.2.2.6, 3.2.2.77); (7) separations: 2 h data centre to A/B uses, 1 h pool to gym, public floors fully above or below the hall (Table 3.1.3.1, 3.2.2.7); (8) two exits per floor area ≥ ½ diagonal apart (3.4.2); (9) travel along the path ≤ 45 m sprinklered (3.4.2.5); (10) exit width from occupant load (3.1.17, 3.4.3); (11) corridor width, dead ends ≤ 6 m (3.3.1.9); (12) exit through the lobby: one only, no industrial rooms opening onto it (3.4.4.2); (13) lift to every storey in Vancouver (VBBL 3.8.2.3), accessible route from the street; (14) washrooms from occupant load (3.7.4).
  - Site and plant: (15) fire department access route (3.2.5.6, figures to read) and connection (Vancouver ≤ 5 m, Edmonton 3–15 m from the principal entrance); (16) generators and fuel: rated room or outside, intake distances (CSA C282, B139, NBC 6.3.2.9); (17) plant noise at the lot lines, plant off the public edge; (18) entrances at the flood level.
  - Left out on purpose: door swings, stair dimensions, guards, envelope, structure.
- [ ] Code: occupant loads (for 10 and 14): rooms listed in NBC Table 3.1.17.1 use the table; rooms it doesn't list (pool, deck, gym, greenhouse, fish farm, data hall) use a sourced design load (e.g. bather load from the BC pool guide), labelled "designed load", with the posted-sign note (3.1.17.1.(1)(c), (2)); rooms with two readings (refuge: table 233 vs designed 50 on 64 Airport Rd) show both and J.B. chooses. Cowork sources the design loads.
- [ ] Code: FM 5-32 (insurer guidance, not code): its rules are flags, not blocks (only codes and by-laws block). Kept as labelled defaults (J.B. 5 Nov): no plant or water piping over the hall (2.2.1.6), generators not in a basement. Code parts of the same checks (CSA C282, B139, fire code, NBC 6.3.2.9) still block.
- [ ] Code: write the rule sheet: bands (forecourt → public → lobby → data centre → plant), one corridor spine along the long side (side-by-side bands on wide shallow lots), rooms with minimum / target / rank, fallback ladder (at grade → stack → over/under hall → drop lowest rank → "doesn't fit here" with the reason), the building as one rectangle on a grid, leftovers as yards (plant farthest from the street, forecourt at the front, slivers landscape only), plant never on the public edge or over the hall (FM 5-32 2.2.1.6), compliance table after every layout.
- [ ] Code: section rules: slab at the flood level; step the ground floor where grade drops more than a storey; ramps per BCBC 3.8; fill "?".
- [ ] Code: test on the six test lots (64 Airport Rd, 339 1st Ave E, 1330 Glen Dr, 8238 Fraser St, 14715 Yellowhead Trail, 4103 97 St) against J.B.'s hand test fits. Explain every difference.
- [ ] Code: yard-packer test: no unit over the building, off the lot or inside a clearance.
- [ ] Code: independent agent re-measures exits, travel along the path and yards on a sample. **Gate.**
- [ ] Code: 300-lot sample across zones, sizes and shapes; then all lots. Report how many fit and which ladder step they reached. **Gate.**

## 6. Other typologies

Staged: cheap screen (zone allows the program, minimum ground, frontage), then full layouts for the pairs that pass; a sample of screened-out pairs gets a full layout as a check.
- [ ] Code: Community pool, then Heat cascade (both hand-tested). **Gate after each.**
- [ ] J.B.: which others to automate before 10 Dec (Warm bath, Aquaponics, Food hub, Conservatory, Shelter + laundry). The rest are hand-drawn on 64 Airport Rd and 339 1st Ave E in Cowork.
- [ ] Code: add-ons, the user's design choices besides the typology and variant (J.B. 5 Nov): Heat hub (ETS + heat pumps), Public plaza / edge (Edmonton warm ground, Vancouver covered edge), Solar (roof, facade), EV charging (public side). Each add-on carries its own tested footprint and plant, so adding one never moves the typology's layout; where it can't fit, it says so. Each add-on declares the ground it needs (street front, roof, inside the building, yard). When two picked add-ons need the same ground and both don't fit, the later one shows "can't fit with <add-on> here" and offers a swap; nothing is dropped silently and no add-on wins by a hidden rule (J.B. 5 Nov).
- [ ] Cowork: tested footprints for Solar (roof and facade: area per kW, fire-access pathways on PV roofs, setbacks; NRCan/BC/Alberta sources, "?" where none) and EV charging (stall and charger pad sizes, access aisle, electrical room or transformer share; Vancouver Parking By-law and Edmonton Bylaw 20001 EV clauses). Then a test fit of each add-on on 64 Airport Rd and 339 1st Ave E with the Emergency hub.
- [ ] Code: Architecture walks **one idea per card** (J.B. 5 Nov: more, smaller cards are easier to digest), **21 cards in five chapters** in the step bar (J.B. 7 Nov). Site (8): city; parcel; then the six context cards: people nearby; programs nearby; heat receivers nearby; what the lot allows; ground and flood; neighbours and views. Typology (5): pick a typology; variant and add-ons; the governing principle; the numbers; what's left for neighbours. Checks (4): rooms; fire separations; exits; plant and site. Each Checks card shows the room-level massing with only that group highlighted and ends with that group's checks and clauses (the section 5 checks, pass / flag / "?"). Visualize (3): program diagram; drawing styles (plan, section, exploded axon, heat flow, 3D massing); compare typologies (up to three, numbers table with a still image of each, no extra live layouts; J.B. keeps it, 5 Nov). Report (1). Each card only reads what came before and never changes it, so more cards does not mean more bugs. Board: Arch_A01–A21 in the Cowork design (replaces Story_Architecture).
- [ ] Code: **site and surroundings** in Architecture, when a site is picked (J.B. 5 Nov): a map of the area showing potential heat receivers, existing public programs (community centres, clinics, pools, shelters, libraries) and people (census). Data already in the tool: `receivers_van/edm.json`, `census_van/edm.json`, `public_rooms_van.json`, `ev_van/edm.json`, `nrcan_pv.json`. **Gap:** no Edmonton public-rooms file (Cowork to source). Each typology card then says what nearby needs it supports (e.g. "nearest pool 3.2 km"; "12 heat receivers within 1 km") — facts with distances, no score. Replaces the People step in Architecture.
- [ ] Code: typology picker in the tool (typology, variant, add-ons). Each typology carries its tested data-centre share (plant included); **remove the free Ratios slider** and its settle loop (the source of the Ratios bugs). What fits becomes read-only: the range on this lot. (J.B. 5 Nov.)
- [ ] Code: Program and Conditions views (plan and section, each room's needs), from Cowork boards.

## Interface graphics (all sections)

- Graphics are designed in the Cowork chat as boards with J.B.; they are not settled yet. Code builds only boards J.B. has approved, from the short spec that comes with each (screen, what changes, what stays). Don't restyle on your own.
- Street trees layer (J.B. 5 Nov). Sources: City of Vancouver open data "Public trees" and City of Edmonton open data "Trees" (both blocked from the Cowork cloud; download from her computer). Keep raw CSVs out of the repo; process into git-ignored tiles with location, height range and diameter where given (check each dataset's fields and licence first, add both to the register). Draw trees in the 3D and plan views. Canopy size: use the dataset field if one exists, otherwise a sourced rule per height class, else "?". Public street trees only: no private-lot trees.
- Equipment drawn at booklet level (`equip` drawings on the boards): outer sizes sourced (Vertiv AFC, Rehlko KD2000, Eaton 2,500 kVA at 2.084 m); fans, louvres, doors, stack and fins are drawing choices. Carry the same detail into the 3D equipment list when it is built.

## 7. Resident, Municipal, Engineering

- [ ] Code: facility inventory into the tool for the Resident map, with the 4 Nov decisions (`checks/research_arch_v1/inv_*.md`, notes "Facility figures"): one number per figure, spec sheet first; Wolfpaw EDM2/EDM3 as space inside the Qu buildings, EDM1 at 10060 Jasper Ave.
- [ ] Cowork: TELUS Garden data centre address (City permits); M3 floor area below grade; how the three generic types map to the inventory types.
- [ ] Code: Resident report from boards Resident1–2: select a data centre on the map, export; generic graphic by type (stand-alone, hyperscale, tower), location map, video stills, plain answers on noise, heat, water, power.
- [ ] Code: Municipal report from boards Municipal1–2 and the plan doc (https://claude.ai/artifact/9WuA4zPVKKKe1SuhcpvoXr): select a parcel, get its regulations incl. each lot edge's class and yard; two-city comparison last.
- [ ] Code: simplify Engineering to six steps (J.B. 5 Nov, to cut bugs): Site → Set-up and what fits (one step; real buildings as a closed section) → Exchanges (one step, tabs Heat / Electricity / Water / Materials, each ending with its own opportunities) → Options (three set-ups; "Could become" as the last closed section, feeding the report) → Two cities → Report. Remove the Opportunities step, "Set-ups that open the most", Real buildings as a step, People, Over time. Build rules: one way through; no step changes an earlier answer; nothing on a timer; each step has its own test on the golden lots. Board: Story_Engineering. The 3D equipment view is the main view in every step (J.B. 5 Nov: a big part of this workflow): Set-up shows it in detail with the limiting equipment highlighted; each Exchanges tab highlights its own equipment (heat recovery, heat pumps, ETS; transformers, UPS, generators; cooling and tanks) with a map inset; Options shows one live 3D view with an A / B / C switch, plus three still images of the set-ups rendered once when the step opens (not three live scenes). **Gate.**
- [ ] Code: 3D equipment view, built so it doesn't break (J.B. 5 Nov), in this order, each with tests passing before the next: (1) one equipment list per set-up (type, size, position, tags heat / power / water / cooling), built in one place; (2) tabs change only colour and transparency by tag, never geometry; (3) Options. Detail at booklet level (J.B. 5 Nov). Tests: the equipment list for the eight golden lots saved as a baseline (every change explained); no floating, overlap or off-lot; one screenshot per tab on two lots. Speed: repeated units drawn once and copied (instancing); less detail when zoomed out; measure the current 3D on J.B.'s laptop first, then set a shape-count and load-time budget (our choice, labelled) and test it on the largest golden lot.
- [ ] J.B.: any further Engineering changes. **Ask before starting.**
- [ ] Code: open bug: Resident list has no "indoors" row. ("Set-ups that open the most" is removed with the Engineering simplification.)

## One idea per card, all four workflows (J.B. 5 Nov: cleaner, more digestible)

- [ ] Code: Resident 9 cards (city; pick a data centre; what it is; noise; heat; water; power and backup; how it works; report), Skip to report on every card after "what it is". Municipal 11 cards (city; parcel; is a data centre allowed; height and floor area; yards by edge; storey heights and ground floor; loading; rooftop equipment and screening; approval process; two cities; report), every card shown on every lot ("no rule here" where none). Engineering 13 cards (city; parcel; size and cooling; backup power; what fits; heat; electricity; water; materials; three options; could become; two cities; report), the 3D equipment view on screen from size to options. Architecture 21 cards in five chapters (Site 8, Typology 5, Checks 4, Visualize 3, Report 1; see above; J.B. 7 Nov). At most five chapters in each step bar. Cards only read what came before. Boards: Story_Resident, Story_Municipal, Story_Engineering, Arch_A01–A21.

## Fifth workflow: Inside a data centre (J.B. 5 Nov, proposal)

- Audience: students and anyone curious (J.B.). Each card asks one question in plain words, has one thing to try and a Words list for the terms on it; the report is a one-page summary. Everyday comparisons only where sourced (tennis court: ITF).
- No lot: one generic air-cooled hall module sized by the tool's own rules (rack_count, hall_layout, room_cooling_type, room_cooling_units, ups_modules, battery_cabinets). Boards: Story_Interior (11 cards: Size 2, The hall 4, Power 2, Heat 2, Report 1) and style frame Final_G_Interior. Build only after J.B. approves the boards.
- Example module: 120 racks (8 rows, runs of 5 + 3 empty places), 0.85–0.96 MW, hall 302 m², 262–295 W/ft² → thermal wall 2 + 1 spare, UPS 2 × 1,000 kW (N+1), 4 Li5 cabinets.
- Drawing choices to confirm or source: storey 6.0 m; warm-aisle containment; electrical-room depth beyond UPS working space; air paths.
- Gaps (?): exit doors and travel distance in the hall; power distribution inside the hall (PDUs, busway); what liquid cooling changes in the drawing (CDUs are in the register).
- Reuses the Engineering 3D equipment list (same instancing and speed budget). Landing page gets a fifth row.

## 8. Decisions waiting for J.B. (ask when the item they block comes up; don't block other work)

- Plant room added automatically by the noise ladder vs asking first (recommended: automatic with a note).
- Ratios hold-back before any picks; support share 27–33 %; start Ratios from the set-up that allows the most, or as chosen.
- Rooftop plant rooms vs fewer, quieter units.
- Heat cascade: spa on storey 2 and greenhouse on the pool-hall roof, or drop a stage; pool supply temperature (decides pool vs greenhouse order).
- Community pool: gas or liquid chlorine; pool plant under the hall on 339 1st Ave E; undersized pool storage.
- Emergency hub: refuge load (233 people and 11 WCs vs 50 with a sign); 44.7 of 45 m travel on 64 Airport Rd; dead-end limits inside the secure line; 1330 Glen Dr 1 loading space (relaxation); corner lots: shorten lobby or refuge; 339 1st Ave E lobby step (ramp, regrade, slab 5.3 m).
- Interface: colour in the Program and Conditions views; Massing/Equipment toggle in Architecture; Programs as a step under Arrange.
- Snow-melt figure (2023, 440–665 W/m²); US stand-in climate cities.
- Public ground floor under the hall and basements: variants, or drop?
- Feedback on the report boards.

## 9. Retrievals by J.B.

- Z8000 pages for the clinic (campus): 6.3.8 key relationships p. 132; Table 13.1 items 12a–g, 23, 26, 5, 36, 38–39, 9, 30a–b. Then rework the clinic layout.
- Edmonton elevation tile (NRCan HRDEM) or a check of ABFloodMapping.zip. Until then Edmonton grade stays "?".
- Burlington or Mississauga filed drawings (data-hall span and grid).
- Three equipment spec sheets the night run couldn't reach (`checks/agents/2026-11-04_night.md`).
- Her review of the clinic program.
- Street-tree CSVs from both city portals into Claude Link (or Claude Code fetches them).
- Paywalled standards still missing: `checks/paywalled_standards.md` (remind her now and then).

## 10. Older open items (status not re-checked)

- [ ] Code: re-sort `checks/open_items_sorted_2026-10-28.csv` (374 rows) against the register; close what check 2 settled; list what's left for J.B.
- [ ] Code: tower floor areas (596 Vancouver towers on an estimate; BC Assessment gross area pending Jeremy Buhler's written OK).
- [ ] Code: NEU sewage heat 3.2 vs 2.5 MW; LRMC range; Edmonton parking stall 23.4 m²; FortisBC 2026 gas cost.
- [ ] Code: which of the ten electricity and water avenues (19 Oct) are built; list the rest for J.B.
- [ ] Code: hall plant: the 4.9 m screen is taller than the units (maker's layout rule); low-noise unit footprint not in the register; electrical and battery rooms drawn without working space.
- [ ] Code: engine.js and addons.js literals one by one (refactor follow-up).

## 11. Finish

- [ ] Code: full check round (golden, Architecture baseline, register wiring, every template's report), Excel recalculation check of the register templates, independent check.
- [ ] Cowork: redraw the out-of-date test-fit boards; final board pass.
- [ ] Code: publish to the live page only after J.B. reviews. **Gate.**
