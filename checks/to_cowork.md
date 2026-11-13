# Questions for Cowork

Claude Code writes research, clause-read and board requests here; J.B. brings them to the Cowork chat. Cowork answers in the Claude Link folder.

| Date | Worklist item | Question | Answer (file) |
|---|---|---|---|

## 7 Nov 2026 — hand test fits on the 18 schematic checks (Code; report checks/agents/2026-11-07_testfit_18checks.md)

The checker could not re-measure geometry (the boards are in Cowork's scratchpad, not on this computer); figures are the boards' own or check 2's. Board fixes, ranked:
1. **V8238 (8238 Fraser St, I-2):** ground storey 5.0 m; I-2 needs 6.1 m in both sub-areas (3.1.2.4 and 3.2.2.9, register van_zdb_i2), which puts the roof at ≈19.3 m > 18.3. Label "needs discretionary height (I-2 3.1.2.5)" or lose a hall storey. Also: third loading bay (or s. 5.1 relaxation as an approval), move the generator row ≥ 1.1 m (bay approach and 0.1 m yard intrusion), 2 h floor under all storey-2 F-2 over the hub (label).
2. **V1330 (1330 Glen Dr):** needs ≥ 3 loading bays (per class of use), 1 drawn; no small fix: mark "doesn't fit here" for the Emergency hub, or a s. 5.1 relaxation.
3. **V339 (all three typologies) — in the redraw already asked for:** third Class B loading bay (per class of use); lobby door 0.7 m above the 5.0 m slab, no ramp (internal 1:12 ramp ≈ 8.4 m, or a stepped lobby); DC lift on the pool and cascade boards.
4. **Edmonton generator test noise (E06B EH/CP/HC, E14715, E4103):** sets 3.0 m from a lot line give 85.4 dB(A) for one set vs 85 (non-residential, C14600 s. 21(3)); show "test one set at a time" and the row ≥ 3.2 m off that line. Say which line is the 3.0 m one (side or alley).
5. **E14715:** refuge exterior doors 2 × 0.9 m = 1,800 mm < 1,854 mm needed (304 persons × 6.1 mm): two doors ≥ 0.93 m or a third door; second loading space if not drawn (10,001 m² > 7,500).
6. **E06B flags:** wrap the 2 h line round the shelter–DC vestibule and guard-point contacts; street face 4.46 → 4.5 m; storey-2 hall access lift (passenger-rated or show why exempt); rooftop chiller room on the hub roof vs "plant never on the public edge" — J.B. to choose.
7. **Pool, gym, spa occupant loads:** no Table 3.1.17.1 row; a sourced design load is needed for exits and washrooms (checks 10, 14 "?" on four boards).
8. **Refuge classification:** if it sleeps people overnight (cots drawn), it may be residential: then 3.4.4.2.(2)(c) applies to its lobby and NBC 3.1.3.2.(2) limits residential suites in an F-2 building. J.B. to decide.
Out of date (redraw before use as references): all V339 boards, E14715, E4103, the two elev_shots screenshots.

## 7 Nov 2026 — for the step-free entrance and the V339 redraw (Code)

- Ramp slope and landings for an accessible entrance: BCBC 2024 / VBBL 3.8 text is not in the repo (the tool uses 1:12 marked ?). Please read 3.8.3.x (ramps) and quote it.
- Street grade at the V339 entrance door (the tool has the lot's LiDAR range only, 2.2–6.2 m): the board's 5.7 m, or a City grade, to size the ramp or a lowered entrance.
- checks/layouts/V339.json now has corridors, stairs, lifts, doors, exits and walls (rule sheet v0). It is a first pass: no shared lobby, no bands; the clinic is 478 of 605 m² net after its stairs and lift. V339 is inside the NEU service area (182 m in, By-law 9552 Schedule A trace): connection is compulsory for new buildings.

## 7 Nov 2026 — By-law 9552 for the heat card (Code)

- Clause read: checks/research_arch_v1/clause_reads_9552_2026-11-07.md (register van9552, condition r_de_compulsory). A connected new building must take all its space heating, domestic hot water and make-up air heat from the NEU; its own waste heat may only supplement (5.2(a)(ii), (iii), (v)); on-site heat production only above 125 W/m2 peak (5.2(c)); heat returned is credited at 50% of the energy charge (Sch. C Part 4). Terms for supplying the network beyond that credit are not in the by-law (?): read the NEU Connectivity Guidelines (neuConnect).
- Ramp slope: left to your VBBL 3.8 clause read (J.B. 7 Nov).

## 7 Nov 2026 — V339 board problems, fixed in the tool (Code)

checks/layouts/V339.json re-exported. (1) Stairs: the data-centre stairs are now 25 m apart against 17.9 m needed (one in line, one at the far corner by a spur; plan.exitSep lists each block). (2) Gaps: the refuge, warming shelter and clinic now touch the data centre (blocks within 6 m are stretched; one building outline with a shared lobby is the next step, paused until your typology specs). (3) The 24 m: the I-3 61 m greatest building depth was centred on the 108 m lot; it now starts at the front yard line. V339 now tests 1.8 MW at Ratios' defaults (was 1.1). (4) UPS 28.6 m² and Li-ion 12.7 m² at 1.8 MW: equipment plus working space and a door end (register electrical_room). (5) The clinic's 3 upper storeys at 6 m would pass the 18 m limit, so it is drawn at 4 m and flagged as not lining up (a split level).

## 7 Nov 2026 — Job A1 lot types: gate report (Code)

Full report: checks/lot_types_2026-11-07.md. Read 382,581 lots; 5,931 qualify (Vancouver 699, Edmonton 5,232; 370 Prior St left out, I-3 sub-area B). All measured.

Starting cut-offs (Van / Edm): irregular 66 / 585, corner 344 / 2,679, small 171 / 274, large 28 / 652, narrow_deep 5 / 184, wide_shallow 15 / 51, regular 70 / 807.

Five check lots (aspect, irregularity, buildable m²): 339 1st Ave E 2.43, 0.87, 2,762 (regular); 275 1st Ave E 1.18, 0.86, 6,090 (large); 1425 Clark Dr 1.09, 0.87, 5,528 (corner); 74 Airport Rd 1.23, 1.00, 4,293 (regular); 64 Airport Rd 1.28, 0.99, 4,022 (regular).

Questions (not chosen):
1. 98 Vancouver lots: lot area counts every part of the tax coordinate, frame and edges only one part (irregularity up to 15). Which area?
2. Corner by edge count counts one street in several segments twice. Use street lines ≥ 45° apart (Van 296, Edm 1,854)? Or corner as a flag?
3. narrow_deep at 2.0, not 2.5 (no break at 2.5; 339 is 2.43)?
4. Buildable: inside the yard lines, or with the 61 m depth limit (275 1st Ave E: 6,090 vs 3,743)?

## 7 Nov 2026 — Job A1 lot types: frozen (Code)

Applied your gate reply as J.B. approved it. Files: checks/lot_types_2026-11-07.csv (5,928 rows, ids and measures only) and checks/lot_types_2026-11-07.md (ranges, two representatives and a corner example per type and city).

Lots: Vancouver 696 (three lots listed in two tiles were counted twice at the gate), Edmonton 5,232.

Types (Van / Edm): irregular 70 / 573, small 276 / 622, large 100 / 1,912, narrow_deep 56 / 595, wide_shallow 23 / 119, regular 171 / 1,411. Corner flag 330 / 2,186.

Multipart: 100 Vancouver, 3 Edmonton, measured on the framed part; 18 change type, mostly to irregular.

Depth limit: clause found. I-2 sub-area B ss. 3.2.2.1–8 and I-3 sub-area A ss. 3.1.2.1–8, 'maximum depth and width 61.0 m' (van_zdb_i2, van_zdb_i3). buildable_depthlim_m2 is filled only there.

Five lots: 339 1st Ave E narrow_deep (aspect 2.43, buildable 2,762 m²); 275 1st Ave E large (6,090); 1425 Clark Dr regular, corner (5,528); 74 and 64 Airport Rd regular (4,293; 4,022).

Ground export: held until the LiDAR datum is read from the dataset's metadata.

## 7 Nov 2026 — Job F1 step 1: landing page and card shell, gate (Code)

Branch site-f1. The landing page (Final_F_Landing) is the first screen; the old tool sits behind "Old tool". Each template row has Start and See the cards. See the cards opens the card shell (STYLE.md §4) on 339 1st Ave E or 64 Airport Rd NW, with a city switch, Back / Next and a strip to jump. Screenshots: checks/f1/ (46, both lots, 1440 and 390 px). No page or console errors; golden and Architecture unchanged.

Questions:
1. The cards come in steps 2–4, so each one says "not built yet". Fine for this gate?
2. The old tool has no Municipal template, so Municipal Start is off until step 3. The other three open the old tool. OK?
3. The board's hero is 64 Airport Rd (Altalis lot lines). I used 339 1st Ave E, Vancouver open data, so the page can be published. Its lot line is red (old style). Keep?
4. With no Sources page yet, "Sources" opens the logic diagram.
5. Architecture: Compare in Visualize (storyboard), Report alone, Checks has 3 cards.
6. The Downloads copy adds §3b. Which sheet governs step 3?

## 7 Nov 2026 — Job F1 step 1, second gate: logic view and gate-1 fixes (Code)

Done: the logic view (§3d) opens from "How it works" and "Sources" in the header, "See the logic", and "How this is worked out" on every card. Card lists are now Resident 4, Municipal 12, Engineering 12. The landing images draw the lot line and outline in INK, not red. Screenshots: checks/f1/ (49). No page or console errors; golden and Architecture results unchanged.

Older Municipal flow: none in the tool code. tiers.js and templates.json say "Municipal not built yet". The nearest was the Community template (tier `community`), removed in a38224a (4 Nov). Research: checks/research_arch_v1/municipal.md.

Questions:
1. Municipal has no tag in logic.json. Parts the Municipal view shows (please confirm): parcel, zone, zoning_status, rezoning_price, envelope, floor_area, noise_limit, component_space, visibility, standoff.
2. No part has a value per lot in the tool, so "on this lot" shows a red "?" everywhere.
3. Industrial land and jobs: I put it under Process. Right chapter?

## 7 Nov 2026 — Job F1 step 2: Architecture cards, gate (Code)

All 21 Architecture cards are built and draw on both example lots. No page or console errors; golden and Architecture results unchanged. Screenshots: checks/f1/ (Vancouver). The Edmonton cards stay local: several show Altalis lot lines. Gate-2 fold-ins done; municipal_logic_parts.md is in Claude Link.

Shown as red "?" (not in the tool yet): lots allowed per city; clinics and shelters nearby; Edmonton libraries, ground heights and flood level; the LiDAR datum; the other seven typologies; add-on fit; longest walk to an exit; stair-shaft and battery-room ratings; fire access, transformers, fuel truck spot; the warming shelter's heat; a 3-D still on Drawing styles.

Questions:
1. The library holds one typology, so Pick a typology shows one tile, not eight. OK?
2. Rooms shows plans with storey tabs, not the board's axon. OK?
3. Neighbours and views: leaders cross building footprints, against STYLE.md rule 8. Allow on maps, or move the labels?
4. Drawing styles: keep 3-D as "?", or allow a still from the tool's own renderer?

## 8 Nov 2026 — Job F1 step 3a: Municipal cards, gate (Code)

All 12 Municipal cards are rule diagrams (no massing) and draw on both lots with no errors. Screenshots: checks/f1/ (Vancouver only; Edmonton kept local, Altalis lots).

Folded in: card 4 policy read (draft: J.B. to confirm; designation ?); noise limits read from engine.js (one export line, nothing moved); Municipal tag and three new parts in the logic (register patch); Vancouver LiDAR datum (register, grade.json, card 7, V339_ground.json); not_a_site flag (455 lots); clause fixes (5.4.1; Health Care Office s. 2; office row already 5.2.9). Golden: only grade.datum moved on the four Vancouver lots (re-based); Architecture unchanged.

Item 8: 1330 Glen Dr (22260652, 0.4 MW): the massing starts at grade, but the ground storey holds only the loading dock and "other uses"; the hall starts at 6 m. The dock is the one data-centre support room at grade on I-2 and I-3, and fails the strict reading. No layout change.

Engineering: cooling card as you set it; Three options removed with it.

## 8 Nov 2026 — Job F1b: Municipal redraw, gate (Code)

Done: the height card with rooftop folded in, so Municipal is 11 cards; storey stack; noise limits around the lot; loading step chart; one-page report; site context on every lot plan (Municipal 6, 7, 9; Architecture 4, 5, 6, 8, 14, 15, 16); dock-at-grade finding on Rooms (I-2, I-3). Leaders: 0 jogs, 0 crossings, at most 4 per card. No errors; golden and Architecture unchanged. Screenshots re-shot: checks/f1/ (Edmonton kept local).

Notes:
1. Noise: the tool finds a quiet-zone lot (375 1st Ave E, CD-1 402) adjoining 339 at 0 m; the board says 131 m. The tool's lot lines also show 339 abutting CD-1 (402).
2. Loading: 7 bays assume the zone's most floor space (13,509 m²), said on the card. Edmonton BE has no storey rule.

Engineering, before I build:
3. The job sheet lists 12 cards (heat offered + who could take it); J.B.'s message said 11 (one heat card). Which?
4. Its cooling row includes electricity; J.B. said leave it out (one PUE line). I'll leave it out unless you say otherwise.


## 8 Nov 2026 — Engineering gate (Code)

Done (local, not pushed): F1b answers; Edmonton Major Industrial rule; 8 Nov register additions; the 12 Engineering cards. Gate: 109 screenshots, 0 errors, no NaN. Golden and Architecture unchanged after the one Edmonton re-base.
- **375 1st Ave E** is CD-1 (402), a quiet zone (By-law 6555 s. 1.2). The noise check does **not** test 55 dBA at its line: it tests only lots holding a building, and 375's building is not in LiDAR 2022. Card 6 marks it "not tested ?". By the tool's formula: 50–53 dBA with the required plant room (75–78 without). Test empty lots too?
- **Edmonton:** allowed lots 5,232 → 386 (IH 375, EETC 11). EETC permits Major Industrial (s. 3.52, 2.1) but J.B. said "outright only in IH": keep EETC? FD: rezoning.
- **Engineering:** plans, not 3-D (wanted?). Heat cards assume liquid cooling while the default is air: shown with a note. Card 3's binding rule is rebuilt from site.js (the tool does not expose it): acceptable? No building is cheaper than its heat in either city.
- **Spec check:** six VBBL 2025 clauses are held only as NBC entries (checks/eh_spec_sources_2026-11-08.md).

## 8 Nov 2026 — Engineering gate fixes (Code)

1. Noise: every neighbouring lot is tested, building or not (By-law 6555 s. 1.2 quoted in register van6555_por; empty lots: our reading). 375 1st Ave E governs for 339: 49–52 dBA with the plant room vs 55 (74–77 without). Empty outlines with no zoning record (roads, remnants) are not tested, only counted: OK?
2. Heat cards follow the air pick (no figure for air reuse, "?"); liquid shown as a labelled comparison.
3. "Could become" removed from the Engineering report (templates.json, report3.js).
4. Card 3's limiting reason now comes from the engine (BD.fitWhy).
5. E05 flake: a 500 ms timer (tiers.js) dropped mwPick when it ran after findFit. Fixed; two golden runs identical.
6. Only IH and EETC permit Major Industrial (IM: existing only; FD and all other zones: no; DC zones: site by site ?).
Golden re-based once: noise worst cases and counts only; no size, fit or block moved.

## 8 Nov 2026 — F1c room plans (Code)

Rooms, Separations and the new Exits card (Architecture is now 22 cards) share one schematic plan per storey (STYLE §5), drawn once per layout. Golden and Architecture unchanged; gate 111 screenshots, no errors.
- Corridor finding: 339 1st Ave E, 6 rooms without corridor access, 2 of 5 storeys with no corridor or lobby; 64 Airport Rd NW, 4 rooms. Layout untouched (F2).
- Exits: spacing drawn from plan.js exitSep (VBBL / NBC 3.4.2.3): data centre 23.4 m of 17.9 m needed, clinic 16.1 of 13.4. Worst travel path not computed: "?", not drawn.
- "?": leftover room sizes, exit stair shaft ratings, names of streets other than the front one (the street file has no names: is there a source?).

## 8 Nov 2026 — F1c gate items (Code)

1. Exits card, clinic row: "(our reading: the clinic corridor is inside the suite, not a public corridor, so max(½ diagonal, 9 m))" added. Dimension stays diagonal.
2. NBD_Roads_GPKG.zip (BC and AB files read): it is ISED broadband availability by road segment. Fields are road_id_route, colour and availability flags only; no street-name field and no licence file in the zip. Not used, not added to the register; "street name ?" stays.
Waiting for the Emergency hub spec (parts 1–3 final) before F2.

## 8 Nov 2026 — street names from fronting lot addresses (Code)

Plans (Rooms, Separations, Exits) now name each street segment from the addresses of the lots that front it: "named from fronting lot addresses (our method)", tool/streetnames.js, register method_streetNamesAddr (trust 60). Only lots on one street vote (a corner lot's address could be on either street); a name needs at least 2 votes and more than half. Lanes, corner-only segments and split votes stay "street name ?". A lot on one street keeps its own address street. No new data.
Segments within 150 m named (lanes apart): 339 1st Ave E 8 of 23; 275 1st Ave E 7 of 23; 1425 Clark Dr 7 of 23; 74 Airport Rd NW 8 of 17; 64 Airport Rd NW 9 of 23.
On the plans: 339 and 64 Airport unchanged (one street each, own address). 1425 Clark Dr (corner): the east edge is named Clark Dr; the south (front) and west edges stay "?" (votes split or none).
Question: the register says the City's Vancouver street file is "by hundred block" (likely a name field); the tool's copy dropped it and the raw file is not on this computer. Re-run make_streets.py with names if J.B. still has it?
Golden identical; register unrecorded 0.

## 8 Nov 2026 — F2 job plan: Emergency hub layout from spec Part 3 (Code; waiting for J.B.'s OK)

Base: eh/specs/emergency_hub.md parts 1–3 (final), Part 7, eh/reach.py, eh/deadend.py. Nothing built yet.

**What changes.** A new layout module, tool/hub.js (rule sheet v1), builds the Emergency hub. plan.js v0.1 stays for the other typologies. hub.js output has the same shape as plan.js (storeys, rooms, doors, cores, exits, walls), plus a kind and a line on every room (rule 15a). The Rooms, Separations and Exits cards draw it unchanged.

**Steps** (one commit each, golden and the other typologies unchanged at every step):
0. Diff the final spec's source ids against the register; add any missing ones (standing rule).
1. Tests first. Port reach.py and deadend.py to JS (tool/treach.js, so the tool can also show the result) and add checks/tests/t_reach.js. They must give the same results as Cowork's Python on the seven hand fits: the three Vancouver fits PASS, the negative test finds R2, R5, R5, and dead ends match to 0.1 m.
2. Bands and one outline (rules 1–2), the shared lobby (15c), ground floor by zone (4), and the stacked and beside variants with the hub cap (≤ 2,325 m² of data centre, one hall storey).
3. Corridors and dead ends ≤ 6 m (15b), cores, doors on shared walls, the secure and public lines (15a), and exits (rule 6). Travel along the path is measured on a 0.25 m grid; this replaces the F1c "?".
4. Plant (rule 9): Vertiv clear zones (1.5 / 2.1 / 2.5 m; 3.0 / 4.2 m between units), panel end to the access path, pad fronts to the aisle. Drains and the A2L leak distance stay "?". Edmonton is flagged.
5. Loading (10), entrances (11), step-free 13 mm (12), yards (13), and the fallback ladder (14) with "doesn't fit" and its limiting rule.
6. Part 7 check: the 19 steps on 339 1st Ave E, one row each with the tool's figure against Part 7's and every difference explained. Run T-reach and dead ends on both example lots.
7. Gate: screenshots, one Architecture re-base (what moved listed), independent re-measure on a sample.

**Questions for J.B. (I won't choose):**
1. Variants in this job: stacked, beside, side drive, small and clinic ≤ 500 only, with corner, through, turned and height-capped next? (my suggestion)
2. Step-free and height use LiDAR street and corner grades (Claude Link lidar_ground2m). The tool doesn't hold them. Add them to the tool, or show "?"?
3. Edmonton hand-fit geometry for the test fixtures may rest on Altalis lot lines. Keep it local, uncommitted?
4. Spec Q5: in BE, is the refuge Community Service (500 m² cap) or Emergency Service (no cap)? Until you answer, both are flagged.
5. What counts as a Part 7 match: counts and pass/fail exact, areas within 10 %?

## 8 Nov 2026 — Vancouver street names from the City file (Code)

public-streets.csv (J.B.'s 16 Oct download) is back in data/raw/van (data/ stays out of git). Licence confirmed on the portal: Open Government Licence – Vancouver v1.0 (register vanStreets2026). tool/add_street_names.py adds HBLOCK without the block range to streets_van.json; segment geometry checked identical. 17,069 of 17,073 street segments named; lanes unnamed. The portal file was modified 2 Nov 2026, after the download (not re-downloaded).
Named within 150 m (lanes apart): 339 1st Ave E 23 of 23; 275 1st Ave E 23 of 23; 1425 Clark Dr 23 of 23 (all City); 74 Airport Rd NW 8 of 17; 64 Airport Rd NW 9 of 23 (address method, unchanged).
Plans now show the City's spelling ("E 1st Av", "Clark Drive"). 1425 Clark Dr: Clark Drive, Vernon Drive, Grant St (the tool's front is Grant St, while the address is on Clark Drive). Golden identical.

## 8 Nov 2026 — F4 pre-checks (Code; nothing built)

**Trees:** neither city tree CSV is in Claude Link yet. I'll check size, columns, date and licence when they arrive.

**Edmonton buildings** (both City of Edmonton open data; both already feed the tool's Edmonton tiles via make_tiles.py, edm_heights.py and edm_3d_add.py; **neither has its own register entry**, a gap):
- Rooflines_20261014.csv (138.5 MB; zip 45.3 MB): 320,182 outlines, columns the_geom, OBJECTID, TAX_ROLL_N, CENTROID_X/Y, AREA, COMMENT, Shape_Leng, Shape_Area. No heights. It matches portal dataset "Rooflines" (8zxj-vxqb), rows last updated 25 Jun 2021; the dataset states no coverage year and no licence. The portal also has "Rooflines (as of 2019)" (jpxi-a9a5) with rooftop and ground elevation and height.
- 3dBuildings.gdb.zip (225.4 MB, same byte size as the portal file): "3D Buildings" (78sz-qcfr), built from the 2019 rooflines and 2019 LiDAR. "Static… newer buildings may not be present". Updated 25 May 2023, public 15 Jun 2023.
- Licence: the portal's terms page is "Open Government Licence – Edmonton" v1.0 (July 2022); neither dataset lists a licence. Label: City 3D buildings as of 2019; outlines of unknown year.

**How the public build shows Edmonton lots:** not in git (tool/tiles/ ignored, no GitHub Pages). But two published claude.ai tool artifacts contain the Altalis lot files (tiles/edm/l_*.json): "Beyond Data" GCCZtgddsc9bY8ey8REkX8 (3 Nov, 135 files) and EBxWgBawKaDps5z245GpAn (20 Oct). KjjapFALf9sUejWZFB6diB (23 Oct) has none: it shows Edmonton lots from the City parcels only. Artifacts are private unless shared: has J.B. shared either? Fix (needs J.B.'s OK): republish both without l_*.json, or delete them.

F3: starts with F2, once J.B. OKs the F2 plan.

## 8 Nov 2026 — J.B.'s items: artifacts, front line, register (Code)

- **Artifacts:** "Beyond Data" GCCZtgddsc9bY8ey8REkX8 (v24) and EBxWgBawKaDps5z245GpAn (v130) republished at the same URLs without the 135 tiles/edm/l_*.json files. Edmonton lots now come from the City parcels, as in the 23 Oct build (both pages skip a missing lot file). Earlier versions in each artifact's history still hold the files (owner only). Audit of the other artifacts: to follow.
- **Front lot line (1425 Clark Dr):** the tool does not use the address. Z&D s. 2 defines no front, rear or side property line (register lot_van_s2_lines: only Front Yard, from the "front property line"). The rule the tool applies is s. 10.26.1(b): on a corner site the frontage is "the shortest boundary abutting on a street, or as otherwise determined by the Director of Planning". Clark Dr's street lines are Grant St 44.0 m, Clark Drive 60.5 m and Vernon Drive 85.5 m, so the front is Grant St; Clark and Vernon are flanks. Clark and Vernon are also roughly parallel (a corner double-fronting site); s. 10.6.1 (Director's approval of placement) excludes I districts, so I-2 is not caught. The Director may decide otherwise (10.26.1).
- **Register:** edm_3dBuildings and edm_rooflines added (OGL – Edmonton v1.0; dates and columns as reported), on floor_area. unrecorded 0.
- **F2 plan** copied to Claude Link F2_plan_from_code.md. F3 starting.

## 8 Nov 2026 — F3 gate: approval path on the Municipal map (Code)

Municipal cards 1 and 2 have their own drawings now (Architecture and Engineering keep A01, A02). Three-way key (Permitted outright, DC blue; Conditional / approval, DCS; Needs a rezoning, grey hatch shown with the toggle "Show lots that need a rezoning"); Edmonton Direct Control as a fourth, dotted, "site by site (?)". The key carries the lines "No Vancouver zone allows a data centre outright. Edmonton: permitted only in IH and EETC (Major Industrial)." and the outright weakness; the large-scale line stays. Hover: zone (card 1) or lot (card 2), class, clause.
Lots per class (property records in the tiles, counted as job A1; checks/tests/approval_counts.py → tool/data/approval_counts.json):
- Vancouver: permitted 0 · conditional 696 · rezoning 92,705 (no zone 362, not counted).
- Edmonton: permitted 386 · conditional 0 · rezoning 280,113 · Direct Control 8,228 (?) (no zone 11).
Display only: golden identical; Architecture cards 1–2 render unchanged. Vancouver screenshots: checks/f1/F3_*.png; Edmonton (lot lines) local only.

## 8 Nov 2026 — F5 part 1: checks (Code)

- (a) "How it works" in a template's cards opens the interactive logic diagram on that template's tab (only its nodes shown); on the landing page it opens the full diagram. Existed; no change.
- (b) Landing "Logic diagram →" per template: missing. Added (opens the diagram on that template's tab).
- (c) Tapping a figure: missing everywhere (only the per-card "How this is worked out" button). Added: every hero figure and row value opens the diagram at the card's nodes, or at one node where the card names it (hero k / row [2]; no card names one yet). Cards with no nodes mapped, so a tap opens the template tab with nothing lit (28 of 49): Resident all 4; Municipal Industrial land and jobs, Report; Engineering Your city, Your parcel, Report; Architecture 19 of 22 (only 3 have nodes mapped).
- docs/STYLE.md updated from Claude Link (§7 Terms).

## F2 plan addendum: minimum widths (Code, 8 Nov 2026; still waiting for J.B.'s OK to build)

Source: eh/specs/room_minimums_rule_2026-11-08.md, "Minimum widths" (register rule_roomMinimums, spec only).
- **Sizing (steps 2–3):** hub.js sizes every room to its minimum area **and** its minimum clear width (short side of the room's main rectangle). A room that can't reach both shrinks or drops by rank (Part 1 ladder), never by going long and thin. Refuge parts under 2.4 m wide are drawn but not counted toward the 175 m².
- **Test (step 1, with T-reach and the dead-end check):** T-width, checks/tests/t_width.js (logic in tool/treach.js). Rule per room kind and name from the spec table. Output PASS or one line per room: storey, room, width against the minimum, basis. The universal WC is tested as its own case (1,700 mm circle clear of the WC and its 900 mm transfer space).
- **Check against Cowork:** run it on the same hand fits as eh/audit_rooms.py. It must flag the same rooms (janitor, valve, battery HVAC, meet-me, MV, exam and consult, 4103 first aid, the 339 refuge strips, the 8980 refuge second room) and must not flag 1330's exit passage.
- **Part 7 check:** a T-width row for 339 1st Ave E.

Question 6: audit_rooms.py also sets widths the spec table doesn't list: data hall 6.0, dock and lobby 2.4, vestibule 1.8, lift 2.0, WCs 1.5, mechanical 1.0, corridor 1.8. Should T-width fail on those too, or only note them? My suggestion: note only, and fail on the spec table plus Part 3.

## 8 Nov 2026 — Altalis river purge, artifacts, receivers (Code)

- **Edmonton river:** tool/shore.json's Edmonton part now comes from NRCan CanVec 50K Hydro, Alberta (register canvecHydroAB, OGL – Canada; tool/make_shore_edm_canvec.py). CanVec labels the river's polygons near Edmonton "Not Identified" and puts the name on its flow lines, so the rule is: permanent water polygons a "North Saskatchewan River" flow line runs through (our rule). 6 rings, source maps 1977; median 9–10 m from the old outline. Vancouver part unchanged. make_shore.py no longer reads the EPSB file. Golden identical.
- **Artifacts:** the three tool artifacts (GCCZ…, EBxWg…, KjjapF…) now serve the CanVec shore.json (checked: same file, no Altalis text).
- **History purge (prepared, not run):** checks/purge/purge_altalis_2026-11-08.sh removes the two historical shore.json versions with the EPSB river from main, overnight-2026-10-30 and site-f1 (tested on a clone: about 4 min; afterwards only the CanVec version exists; main and overnight lose shore.json entirely, because theirs was the Altalis one). J.B. runs, in Git Bash:
  `cd ~/Projects/beyond-data-siting-tool && git checkout site-f1 && bash checks/purge/purge_altalis_2026-11-08.sh`
  then `git push --force origin main overnight-2026-10-30` (site-f1 is not on GitHub yet: push only when J.B. says). Local backup branches backup/pre-altalis-purge-2026-11-08-*: never push. GitHub keeps old commits reachable by their hash until GitHub Support removes them (sensitive-data removal request); forks and other clones keep copies.
- **Also found (J.B. to decide):** the public overnight-2026-10-30 branch holds 181 Edmonton tool screenshots (checks/agents/*_shots, e.g. lotlines_shots/E06B_card.png shows 64 Airport Rd's Altalis lot outline). The same script can drop them in the same pass: EXTRA_PATHS="checks/agents/*/E0* checks/agents/*/*/E0*" (to confirm per folder before running).
- **BC Assessment receivers:** the 683 vanBCA receivers' coordinates are representative points of the City of Vancouver property parcels (open data, data/vancouver_parcels_2026.geojson, matched by tax coordinate; tool/make_bigrecv.py), not BC Assessment geometry. No change.

## 8 Nov 2026 — F5 part 2: terms pass (STYLE §7) (Code)
Strings changed (file: old → new):
- f1.js: “Workflows” → “Templates”
- f1.js: “Choose a workflow” → “Choose a template”
- f1.js: “Four workflows, each ending in its own report.” → “Four templates, each a workflow that ends in its own report.”
- f1.js: “Workflows” / “Each one shows one idea per card, then makes a report.” → “Templates” / “Each template’s workflow shows one idea per card, then makes a report.”
- f1.js: “See the cards” → “See the workflow”
- f1.js: “One logic runs under all four workflows. Every number in it is tied to a source and a check status, so a reader can follow any figure back to where it came from.” / “See the logic” → “One logic runs under all four templates. Every number in it is tied to a source and a check status, so a reader can follow any figure back to where it came from.” / “Open the interactive logic diagram”
- f1.js: “How this is worked out” → “This card in the interactive logic diagram”
- f1logic.js: “The logic under every card” → “The interactive logic diagram”
- f1logic.js: “One logic runs under all four workflows. Every part has a formula, a source and a trust rating. Click a part to see them.” → “One logic runs under all four templates. Every part has a formula, a source and a trust rating. Click a part to see them.”
- tiers.js: “aria-label="The tool's logic diagram:” → “aria-label="The interactive logic diagram:”
- logic.js: “b.textContent=open?'Hide the logic':'The logic” → “b.textContent=open?'Hide the interactive logic diagram':'Interactive logic diagram”
Kept: “How it works” (top bar; opens the interactive logic diagram, as the storyboard names it); “template” already used for Resident, Municipal, Engineering, Architecture in the logic view tabs. One code comment in f1logic.js updated to match; other comments not changed.

## 8 Nov 2026 — F2 step 1: T-reach, dead ends, T-width as tool tests (Code)

tool/treach.js (BD.treach: tReach, deadEnds, tWidth) and checks/tests/t_reach.js, ported from eh/reach.py, deadend.py and audit_rooms.py. On all 8 hand fits T-reach and dead ends match the Python exactly (dead ends to 0.1 m); the 15d negative test gives R2, R5, R5 in both. Fixtures: checks/fixtures/eh/ (Vancouver: rooms and doors only, no lot outline); Edmonton in checks/fixtures/eh_local/ (gitignored).
- Results: v339, v1330, v1353, v8980 and the Edmonton plan PASS T-reach, every dead end ≤ 6 m. **v8238 fails**: R2 (storey 1 exit passage `pas` opens into the loading area) and dead ends 15–22 m: so "the three Vancouver fits pass" cannot include 8238.
- T-width (fail on the spec table + Part 3, J.B.): 7–16 fails per fit, mostly exam/consult rooms at 2.3–2.5 m, first aid, offices, battery/MV, janitor/valve, freight lift E2 at 2.4 m; v8238 secure corridor `link` 1.6 m; v1330 refuge alcove 2.4 m. Refuge counted area (parts ≥ 2.4 m): v339 ref 163 of 174.8 m² (under 175).
- Our readings (to confirm): Housekeeping is a note, not janitor; freight lift E2 fails below the Part 1 car width 2.5 m (Part 3 gives none); stairs fail below 1.1 m (VBBL 3.4.3.2), the 2.4 m two-flight width is a note; the refuge width rule applies to public rooms only; the 6.1 m truck aisle is a fail; Edmonton loading space 3.3 m (Part 3 rule 10), not 3.4. No fixture draws the WC in the universal washroom: the 1.7 m circle fits in all; "WC position not drawn".
- In Cowork's scripts (not changed): audit_rooms.py tests "drive" before "exit passage" (1330's 1.9 m passage fails against 6.1 m) and uses 1.8 m for every corridor; it applies the refuge rule to the "Unassigned" room; deadend.py's min() fails on a corridor in disconnected parts; reach.py gives a spare room or exit passage the line of whichever neighbour a Python set yields first; e06b and e14715 read e4103/geom.py without an encoding ("×" → "Ã—").

## 8 Nov 2026 — F5 part 3: the landing intro (Code)

tool/f1intro.js with captions in tool/data/intro.json (J.B. edits there). Six scenes, about 54 s, built from the real interface: (1) skyline, one block fills DC blue, dashed lines to heat, space, power; (2) both city maps as "Your city" draws them (zones, no lot outlines), counts read at run time from tool/data/approval_counts.json; (3) the four template cards from the landing lift in turn with their lines; (4) the real viewer on 339 1st Ave E, strip outlined in blue, a blue pointer steps 2–5; (5) "How it works" outlined, the real interactive logic diagram opens at a figure's part; (6) zoom out to the landing, both ways in outlined. First visit only (localStorage bd-f1-intro, try/catch), Skip intro and Esc, reduced motion = six still slides, "Watch the intro" on the landing. Never autoplays under automation (navigator.webdriver), also ?nointro: the test scripts are unaffected. Frames: checks/f5/.
Differences from the storyboard: scene 2 lights zones at city scale, not lots (Edmonton lot outlines are licensed); scene 2's caption is the board's ("Two cities. Every lot where one could go."), as the job sheet gives none; scene 3 uses the landing images, not each template's first card.

## 8 Nov 2026 — F2 steps 2–7: the Emergency hub layout in the tool (Code)

tool/hub.js (rule sheet v1, BD.hub.build) lays the hub out on the tool's lot from spec parts 1–3 and the room minimums rule; the Architecture cards (Rooms, Separations, Exits, Plant and site) draw it when the typology is the Emergency hub; plan.js v0.1 stays for the rest. Register: r_hub_v1 (patch hub_rule_sheet_2026_11_08.py).
- **339 1st Ave E** (stacked, side drive, ladder step 2): 1.80 MW, hall 1,134 m², data centre 1,924 m², clinic 5 exams 488 m², 3 bays, height 16.2 m. Part 7: 14 of 19 rows match (5 on pass/fail with other distances), 3 partly, 2 differ: checks/hub/part7_V339.md.
- **64 Airport Rd NW** (beside, ladder step 2): 1.87 MW, data centre 1,978 m², clinic 482 m², 1 loading space, 3 chillers on the hub roof (the yard holds the generators and pads only).
- Both lots: T-reach PASS, dead ends ≤ 6 m (worst 4.0 m), no T-width fail; travel ≤ 33.3 m; every zone's exits far enough apart.
- **Architecture re-base:** nothing moved: `SPLIT=60/30 arch_run.js CLARK E06A E06B V339` gives the same results as checks/golden/arch (rooms, blocks, MW, height identical): arch.js placement is unchanged and arch_run does not read the plan layer, so no re-base was made. The hub plan is drawn by the cards only.
- Golden: golden_run.js on all 8 lots identical to checks/golden.

Differences from Part 7, and the path taken (each a question):
1. **No second refuge room.** In the bands the ground floor behind the hub is the data-centre entrance row and a covered truck court (bays open to it), so there is no enclosed spare floor at grade; refuge 177 m² = 50 people (Part 7: 114). The spare rule says refuge first at grade: should the covered court area be enclosed as refuge floor where the bays don't need it? Taken: covered court (conservative for loading), flagged in Part 7 rows 4, 10, 11, 17.
2. **Clinic 488 m² (Part 7 296).** The clinic sits over the hub's front row (9.4 m deep: refuge 175 + shelter 56 + lobby across 30.6 m), corridor and service row, and grows into that floor (spare rule: clinic upstairs). Still < 500 m² (no loading). OK, or keep the clinic at its minimum and leave the rest unassigned?
3. **Side drive on the SE side.** site.js places it there; the hub follows the tool (Part 7: NW). The lobby then sits at the SE end, street 4.8 m (LiDAR), slab 4.8 ≥ FCL 4.6: sloped floor, survey before design.
4. **Table 3.7.2.2.-B "over 50: 3 + 1 per extra 50"**: read as 51–100 → 3, 101–150 → 4. Confirm.
5. **Base surface**: corner grades joined by a fan of triangles from the first corner (our reading): 339 lowest 4.63 m under the building (Part 7 4.9).
6. **Edmonton hub cap**: the tool's 3.0 MW is capped by the lot (plant behind the building, 0 m side yards) to 1.87 MW, one hall storey; chillers on the hub roof (rule 1: a lower roof not over the hall); Edmonton chillers a placeholder (Vertiv range).
7. Not built yet (flagged when a lot needs them): corner, through, turned, height-capped.

## F2 answers applied (J.B., 8 Nov 2026, evening)
1. Truck court kept; refuge at 50 people, the minimum (flag on the plan).
2. Clinic into the spare floor (< 500 m²): kept, flagged on the plan.
3. Southeast side drive: kept, labelled (drawing choice, accepted).
4. Table 3.7.2.2.-B: a partial increment counts, 51–100 → 4 (hub.js wcB, "our reading, conservative"). **Knock-on on 339:** the clinic (about 53 persons) now needs 4 WCs a sex = 7 WC rooms; at 1.6 m each (drawing choice) the clinic back row needs 30.6 m of 30.56 m, so the ladder drops to step 3 (no clinic). Drawn at 1.5 m (the T-width minimum for a single WC, our judgment ?) the clinic comes back: 5 exam rooms, 464 m², every check passes. **Question to J.B.:** clinic WC rooms at 1.5 m, or accept no clinic on 339? Committed as no clinic (her rules as given); Edmonton 64 Airport Rd keeps its clinic (498 m², 7 WC rooms).
5. Base surface: both triangulations (fans from neighbouring corners; on a four-corner lot the two diagonals), lower surface under the building. 339: 4.63 m either way (the lowest point is a shared corner), height 16.2 m.
6. Edmonton 1.87 MW with chillers on the hub roof: accepted; flag "Chillers on the hub roof, over the refuge: A2L refrigerant pools below a leak; no safe distance in the maker's guide (?)".
- Height-capped: the spec's height-capped section (ground, 4.0 m support storey, one hall storey) is what the hub cap draws on every stacked lot, so it is labelled on the plan; a lot over its limit even with that section is flagged "not built yet". Turned: flagged "not built yet (?)" when the ladder runs out and the frontage is longer than the buildable depth (no spec threshold for "wide-shallow"). Corner and through: flagged as before. (Item 7 above said all four were flagged; turned and height-capped were not until now.)
- Fixtures re-copied from eh/ (8238 now geom_mid.py, as audit_rooms.py audits it). tool/treach.js re-ported to Cowork's 17:24 deadend.py (centreline) and audit_rooms.py (clear width = largest square; refuge thin parts by local width; 'Unassigned' no rule). All 8 fits: T-reach PASS, dead ends ≤ 6.0 m (v1330 dcor and v8238 scor+xcor exactly 6.0), no T-width fail. Freight lift E2 2.4 m < 2.5 m car: a note, not a fail (not in the widths table or Part 3). One explained parity difference: v339 storey-2 clinic corridor 1.8 (py) vs 1.5 m (js), a door on a 0.25 m cell boundary (tie).

## VBBL 2025 second checks (Code, 8 Nov 2026, from J.B.'s copy vbbl-2025-volume-1-v4-01.pdf)
Confirmed, with omissions added to the register: 3.3.1.9 (p. 268), 3.4.2.5 (p. 297), 3.4.2.3 (p. 296), 3.3.1.5 (p. 267), 3.8.3.5 (p. 338), Table 3.7.2.2.-B (p. 327), and 3.1.17.1 with its table (pp. 174–175; vbbl25_31171 was never added, so it's added now). Three findings change the hub's reading, so J.B. decides. Nothing in the tool is changed yet.
1. **Dead ends inside a suite (3.3.1.9.(5)):** "Except for a dead-end corridor that is entirely within a suite…". If the clinic is a suite, its corridor's dead ends aren't limited to 6 m. The tool applies 6 m to every corridor, which is conservative. Keep it?
2. **Two egress doorways by area (3.3.1.5.(1)(d)):** in a floor area sprinklered throughout, a room or suite larger than Table 3.3.1.5.-B needs 2 egress doorways at least ⅓ of its diagonal apart. The limits are A 200 m², D 300 m², F-2 200 m². That covers the data hall (F-2, about 1,130 m²), the clinic suite (D, 464 m²) and any refuge room over 200 m², whatever their load. The tool's exit checks are per zone (exits apart, VBBL 3.4.2.3), not per room. Add a per-room egress-doorway check (2 doors, ⅓ diagonal) to hub.js?
3. **Table 3.7.2.2.-B counts persons of each sex:** 3.7.2.2.(1) splits the load equally, so the table applies to half the load. The tool and Part 7 apply it to the total: the clinic's 50 persons give 2 WCs a sex, where the code gives 25 a sex → 1. That over-provides. Also, (2) lets a single WC serve both sexes up to 25 persons. And (15) allows two unisex rooms up to 200 m² and 60 persons, which doesn't apply here (the clinic is 464 m²). Apply the table per sex, as written?

## Code-check level and J.B.'s three answers (9 Nov 2026)
- **Code-check level** (CODE_LEVEL_RULE_2026-11-09.md, register `rule_codeLevel`):
  - `tool/treach.js` `judge()` marks a result within 0.5 m (lengths) or 5 % (other quantities) of its limit as "tight: check in design". Tight passes; only a miss by more than that fails.
  - It applies to dead ends, travel, exits apart, exterior discharges, height and egress doorways.
  - Room widths: only a room under its minimum by 0.5 m or less becomes tight. Rooms drawn at exactly their minimum are not flagged, because the layout sizes them to the minimum on purpose.
  - Tight results show on the cards and in one plan flag. No fixture-level checks were added.
- **1. Dead ends inside a suite:** 6 m everywhere, as before.
- **2. Egress doorways:** new `treach.js` `egressDoors()` (part `egress_doorways`, VBBL 3.3.1.5.(1)(b), (d), (2)).
  - Rule: a room with a load over 60, or larger than Table 3.3.1.5.-B (A 200 m², D 300 m², F-2 200 m²), needs 2 doorways at least ⅓ of its diagonal apart.
  - Load: refuge, shelter and waiting rooms ÷ 0.75 m² (Part 1); clinic rooms ÷ 9.3 m². Washrooms, storage and service rooms are tested by area only.
  - `hub.js` adds the second door on a wall shared with a public room or corridor.
  - Tool: on 339 and 64 Airport Rd, the refuge, shelter and hall all pass. 64 Airport Rd's shelter gained a second door, into the refuge.
  - **Hand fits:** all 8 pass, on the fixtures re-exported 9 Nov (after Cowork's egress fixes); this agrees with Cowork's egress2.py and egress3.py. An earlier run on the 8 Nov copies showed one-door shelters; those were fixed by Cowork, so no action is needed.
- **3. Table 3.7.2.2.-B:** `hub.js` `wcBload` applies it per sex, with the load split equally and a partial increment counting. 339's clinic is 48 persons (24 a sex): 1 WC a sex, so 1 WC room plus the universal WC; the clinic is now 443 m². Part 7's own 32 persons would be 16 a sex → 1, not the 2 it shows. Part 7 row 9 explains this.
- Part 7 is unchanged: 14 match, 3 partly, 2 differ. Golden and Architecture are identical.

## Community pool spec: status line (Code, 9 Nov 2026 evening)
- J.B. says the Community pool spec passed her final gate on 10 Nov, and `community_pool/specs/GATE_community_pool_2026-11-10.md` agrees ("Decision: PASSED").
- The spec's own first line still reads: "parts 1–3 FINAL (J.B., 9 Nov 2026 …) … Part 4: two of six fits drawn (self-checked); the small-lot question is open (Part 4). Parts 5–7 to follow."
- Its Part 4 heading says all six fits are drawn, and the gate note says the small-lot question is settled (the shared message pointing to the Emergency hub V1360).
- The site publishes the spec exactly as written, so the page shows the old status line under an approved gate.
- **Question for the pool chat:** please update the status line in `community_pool/specs/community_pool.md` to match the gate. Code will re-copy it; the spec copy check fails until then.

## Register quote check: four conflicts with the passed specs (Code, 9 Nov 2026 evening)
A separate Code agent checked every quote in the 9 Nov research notes against the source documents (register patch `typology_research_2026_11_09.py`). Most match word for word. Four points conflict with what the specs say. Code has not changed any spec or the tool's labels; these are for the chats and J.B. to decide.
1. **Flood clause division.** VBBL 2025 2.2.10.3 is in **Division C** (printed p. 251), not Division B. Affects `community_pool/specs/community_pool.md` rule 12 and `research_pool_FCL_supplytemp_2026-11-09.md`. The register (`arch_hb_vbblFlood`) has Div. C.
2. **FM 5-32 does not place transformers.** FM DS 5-32 2.6.4.3 and 2.6.4.3.1 cover emergency generators only (separate building, then yard, then ground floor; not on a roof or in a basement). `eh/specs/emergency_hub.md` (Part 3, about line 154) and the small-lot note say "generators and transformers at grade (FM 5-32)". The pads-at-grade limit has no FM source as read; FM Data Sheet 5-4 (transformers) was not read. Code changed only its own wording on the typologies page ("it places generators; transformer pads are not in it").
3. **VBBL 3.6.2.8 is about emergency generators.** Its opening words: "a generator intended to supply emergency power for lighting, fire safety and life safety systems". Whether a data centre's standby generators are covered (and so whether "meets code as read" holds for the generators-upstairs variant) is **?**. The typologies page still shows the spec's label "Meets code as read; not FM 5-32 (insurer)". **Question for J.B. / the hub chat:** keep the label as is, or add "(emergency generators; standby ?)"?
4. **Construction rules differ between the two specs.** The figures are confirmed (3.2.2.77: 18,000 / 9,000 / 6,000 / 4,500 m²; 3.2.2.31: 12,000 / 6,000 m²; 3.2.2.29: floors 2 h). The Heat cascade applies 3.2.2.29 (floors 2 h) to 3-storey buildings with a pool; the Community pool's 3-storey fits cite only 3.2.2.77 ("F-2 governs"), which conflicts with 3.2.2.6 (the most restricted major occupancy governs). Neither considers 3.2.2.7 (superimposed occupancies). **Question for the pool chat:** apply 3.2.2.29 as the Heat cascade does?

Also from the check, for information:
- The 2.2.10.6 flood-level relaxation needs the owner to show the FCL is impractical and a stamped P.Eng report: a weak fallback for the 8980 Oak St ramp.
- ES54 alcoves and slabs are only for buildings "built to the property line", each with BC Hydro designer approval and a right-of-way. F0-02 and F3-08 do cover pads over a parkade; roofs are not mentioned.
- Parking By-law 5.2.3 also lists "Community centre … or similar place of assembly" and "Fitness Centre", so the pool may not need the similar-use route.
- Not read (rows held with trust "?"): Sport England Appendix 2; the HPAC 2014 article on ASHRAE classes; the BC Pool Operations guideline (URL 404; its 37 °C and 40 °C limits are confirmed in the Pool Regulation, ss. 10(2)(b) and 16(b)).

## F2b: which line is the front of 8980 Oak St? (Code, 10 Nov 2026)
- The tool's site model takes the slanted 57.5 m street line as the front of 8980 Oak St and the 77.5 m line as the flanking street. The lot is addressed on Oak St.
- From that front the lot is under 10 m wide for the first 6 m, so the tool's hub does not fit (it now says so, with this reason). Stepping the building back far enough to fit would put the lobby 28 m from the street, which breaks spec 15c (lobby on the main street), so Code capped the step-back at 6 m (drawing choice) instead.
- The Part 4 hand fit draws the hub from a different street line, with the building moved 2.1 m for a walkway.
- **Question:** for the tool, should the hub be laid out from the street line the hand fit uses (which one: Oak St?), even where the site model calls another line the front? Code has not changed the site model.

## HANDOFF (Code, 10 Nov 2026): account switch, F2b half done
**Branch `site-f1`, all local, nothing pushed.** GitHub has `site-f1` at 975c2e6 (pushed by J.B. 9 Nov after the purge; `main` and `overnight-2026-10-30` force-pushed then too). The commits since then are listed at the end of this section.

### Where things stand
- **Purge:** done and pushed (9 Nov). Backups `backup/pre-altalis-purge-2026-11-08-*` are local only: never push them. J.B. decided not to send the GitHub Support request (draft kept untracked: `checks/purge/github_support_request_2026-11-09.md`). `checks/push_list_2026-11-09.md` (untracked) is the pre-push list, now out of date.
- **F2b (Emergency hub variants in `tool/hub.js`), J.B. chose "fix the layout too":**
  - Done: corner and through named from the lot's streets (corner takes service from the side street); large, irregular, small and wide-shallow named from the job A1 lot type (`tool/data/lot_types.json`); the variant is shown on the cards.
  - Done: turned variant (1353 Pender St E fits, 2.13 MW); large beside lots capped at 60 m frontage (14715 travel 46.7 → 40.3 m); irregular slanted fronts step back at most 6 m; refuge egress door fixes.
  - Done: narrow-lot groundwork (front row deepens, lobby 6.0/5.0/4.0 m, overflow rooms beside the refuge, no clinic stairs or lift once the clinic drops).
  - Test: `checks/tests/hub_lots.js` (nine spec test lots, summary only). Golden identical, F1 gate clean, spec copy check passes (8a2dcde).
  - Result now: fits on 339, 1353, 64 Airport, 4103, 14715; **doesn't fit on 1330 Glen Dr, 8238 Fraser St, 1360 Frances St, 8980 Oak St** (hand fits fit 1330, 8238, 8980; 1360 only with generators upstairs).

### Exact next step
Build the narrow-lot layout in `tool/hub.js` for 1330 Glen Dr and 8238 Fraser St (stacked, Vancouver):
- the hub's three bands run back from the street: refuge and shelter strip | public corridor | service strip, with the lobby across the corridor and service bands at the street end;
- the data-centre entrance and bays at the far end of the depth;
- the corridor's far-end exit: into the side drive (1330) or an exit passage along the lot line to the rear street (8238);
- storey 2 and the hall as in `stacked()`.

Follow the hand fits `tool/f1/eh_fits/v1330.json` and `v8238.json`. Trigger: `stacked()` fails on width (roughly W < 20 m). Then run `node checks/tests/hub_lots.js <out.json>` (tool served on :8766), the Part 7 tests (`hub_part7.js`, `--edm`), golden and the F1 gate.

After that: 1360 Frances St's generators-upstairs variant (V1360) and the new Edmonton lot types Cowork drew on 10 Nov (10004, 15231, 16075, 10003: add them to `hub_lots.js`, outputs local only). Then the queue: Phase C sweep, F4 white model (tree tiles are built, git-ignored), Resident, Reports.

### Waiting on J.B.
1. **F7 small-lot band:** switch to buildable ground per the hub spec's 10 Nov "Lot or buildable" note (750 m² at grade; about 512 m² Vancouver, about 408 m² Edmonton with generators upstairs), or keep "about 530 m² lot area"?
2. **8980 Oak St front line** (section above): lay the hub out from Oak St (the hand fit's line) when the site model calls another line the front?
3. **"Meets code as read" label** (register quote check, item 3): VBBL 3.6.2.8 covers emergency generators; keep the label or add "(emergency generators; standby ?)"?
4. The other three spec conflicts from the register quote check (flood clause Div. C; FM 5-32 and transformers; pool construction 3.2.2.29), and the ES54 PDF a subagent's web read saved into Claude's session folder (delete it, or move it into the library?).
5. `checks/trust_to_rate_2026-11-09.md`: the separate rating round.

### Commits on site-f1 not on GitHub
Listed by `git log --oneline origin/site-f1..site-f1` (this handoff commit on top).

## F2b step 5: narrow-lot layout in the tool (Code, 10 Nov 2026, new account)
`tool/hub.js` `narrowLot()` (RULES.narrow, drawing choices): where the stacked rows don't fit a lot under 20 m wide, the hub bands run back from the street: refuge strip | public corridor | 3.0 m service strip, lobby across the corridor and service strip at the street, stair S1 at the refuge's street corner, overflow rooms in a 3.5 m pocket of the refuge strip. Rear: the data-centre entrance row, then the bays. No clinic (spec Part 6). Hall over the hub only; the rear is two storeys, chillers on its roof.
- With a side drive (1330): entrance row only as wide as the bays, S2 and E2 turned across, the dock and vestibule behind them, bays across the lot onto the drive, plant yard behind the refuge (as the hand fit).
- No drive (8238, 8980): S2 along the exit passage, opening onto a rear truck court; the passage (2 h) runs from the corridor along the lot line to the court. A narrow lot with no drive and no street or lane at the rear or side doesn't fit (no truck access).

| Lot | Tool now | Hand fit (spec Part 4) |
|---|---|---|
| 8238 Fraser St | **fits**, 0.70 MW, 3 bays, 17.1 m; T-reach PASS, dead ends ≤ 6 m, no width fail; travel ≤ 33 m | fits, 0.94 MW |
| 8980 Oak St | **fits** (new), 0.70 MW, 17.4 m, from the site model's front line with the 6 m step-back | fits, 0.94 MW, from another street line |
| 1330 Glen Dr | **doesn't fit**: the 2nd generator and both chillers don't fit. Note: hand fit puts chillers on a storey-2 roof over the drive (our reading); not modelled | doesn't fit outright (drive aisle 4.9 m); chillers on a storey-2 roof over the drive |
| 1360 Frances St | doesn't fit (3 bays don't fit beside S2 on 13.96 m) | at grade doesn't fit (as spec) |
| 339, 1353, Edmonton | unchanged | |

Questions:
1. **1330 chillers:** the hand fit's storey 2 reaches over the side drive and carries the chillers. The tool never builds over the drive. Allow storey 2 over the drive (truck clearance under it ?), or keep "doesn't fit" with the plant as the limiting rule?
2. **Refuge grows** to fill the strip beside the service rooms (8238: 239 m², 68 people), so the washrooms are sized for 394 people. The hand fits keep the refuge near 50 and draw spare floor. Keep it growing (spare floor at grade → refuge first), or hold it at 175 m² and draw the rest unassigned?
3. **8980** now fits from the slanted front line with the 6 m step-back (lobby by a walkway, not drawn). The front-line question (Oak St) is still open.
Golden identical (one V339 noise count flaked 4,729 → 4,728 once; two re-runs identical). F1 gate clean. Part 7 (339 and 64 Airport Rd) unchanged. Emergency hub and heat cascade specs re-copied (Claude Link 11:41 and 11:53).

### Step 5b: J.B.'s answers applied (10 Nov 2026)
1. **1330 Glen Dr:** stays "doesn't fit". The tool doesn't build over the side drive. Row note (J.B.): "hand fit puts chillers on a storey-2 roof over the drive (our reading); not modelled".
2. **Refuge capped** at the spec size on narrow lots (175 m², 50 people, as the hand fits). The shelter follows it. The rest of the refuge strip is **open ground, not built** (as the hub decision of 10 Nov). Washrooms are sized to the capped refuge and shelter (load 308).
   - Result: 8238 and 8980 now 0.68 MW (was 0.70). Smaller washrooms shorten the service strip, so the hub and the hall over it get shorter.
   - Open ground: 54 m² (8238) and 55 m² (8980), beside the corridor at the far end of the strip. Storey 2 is drawn over it, so it is a covered open area. Whether it stays covered is not decided (?).
   - The stacked and beside layouts are unchanged: there the spec's spare-floor rule (refuge first at grade) still applies. 339's refuge is 177 m² there.
3. **Front line** = the lot line on the street named in the address (J.B. 10 Nov). The tool now checks this with the City street names (Vancouver street centrelines, 16 Oct download). If the front line faces another street, the hub isn't laid out, and the board says why.
   - 8980 Oak St: the site model's front (bearing 1°, facing west) faces **Oak St**, 10.1 m to the centreline. The flank faces W Kent Ave North. So the layout stands.
   - All six Vancouver test lots front onto their address street. Negative test (8980 given the address W Kent Ave North): refused, naming the flank line.
   - Edmonton: no street names in the file (edmRoads2026 has classes only), so it's flagged "not checked (?)".


## F8: building against the plant yard, front public yard (Code, 10 Nov 2026; gate passed 10 Nov, `GATE_front_public_yard_2026-11-10.md`)
Job `CODE_JOB_F8_front_public_yard.md`, spec note `SPEC_NOTE_front_public_yard_2026-11-10.md`. Committed **off by default** (`?front=yard` in the address or `localStorage bd-front=yard` turns it on; `A.front='yard'` in the site model). Default on in Architecture waits for J.B. to see the before-and-after screenshots.
- Gate addition: every front yard gets "covered beds and heated paths fed by data-centre heat", figures ? until the heat cascade research. Shown as a line on the hub flag and the card row; nothing sized or drawn.

What the flag does:
- `site.js`: the zone's greatest depth (61 m) is counted from the plant-yard edge toward the street. The building sized to its MW sits against the plant-yard side (it was centred). `m.frontYard = {m2, dMin, dMax, public, toStreet, beside}`.
- `site.js`, new drawing choice: with no depth cap, the frame's rear can be a wedge of a skewed lot (339). The rear band (loading, plant yard) now starts where the lot inside the yard line is its full width; the wedge behind stays open.
- `hub.js`: a second pass moves the whole hub (building, truck court, plant) back by the spare depth. It keeps the move only if the hub is the same (kind, narrow or not, ladder step, variant), the MW isn't lower, and there's no new T-reach finding or travel fail. Otherwise it bisects to the largest move that works, down to 0.5 m.
- Cards: a "Front public yard" row on Municipal (lot allows) and Architecture (What the lot allows).

| Lot | Hub, flag off | Hub, flag on | Front yard (hub) | Site model's building |
|---|---|---|---|---|
| 339 1st Ave E | 1.80 MW | 1.80 MW | moved 17.5 m; about 533 m², public | 236 m², 10.2–10.3 m |
| 1515 Boundary Rd | 3.23 MW | **5.07 MW** | moved 40.5 m; about 3,172 m², public | 1,430 m², 25.6–25.9 m |
| 8238 Fraser St | 0.68 MW | 0.70 MW | moved 10 m; about 160 m², public | 318 m², 26.5 m |
| 8980 Oak St | 0.68 MW | 0.84 MW | moved 2 m (not public) | none |
| 1353 Pender St E | 2.13 MW | 2.13 MW | no move (reaches the rear yard) | none |
| 1330, 1360 | doesn't fit | doesn't fit | | |
| 64 Airport Rd NW | 1.87 MW | 1.87 MW | moved 2 m (not public) | 4.8 m (not public) |
| 4103 97 St NW | 2.39 MW | 2.54 MW | moved 4 m (not public) | 6.4–6.9 m, public |
| 14715 Yellowhead Tr NW | 2.54 MW | 2.54 MW | moved 28.5 m; about 1,710 m², public | 14.8–16 m, public |

Not settled by the spec note (questions):
1. **MW rises on some lots** (1515, 8980, 4103, 8238): moved back, the lot is wider, or (1515) the site model's size search finds a higher MW because the plant yard is now a clean rectangle (site model 4.6 → 8.8 MW). On 1515 the hub's hall then fails travel (46.7 m > 45). Should the move keep the flag-off MW (same building, only moved), or take what the new place allows?
2. **Two models disagree** on the front yard (4103: hub 4 m, site model 6.4 m). The hub's own building is the one drawn on the hub cards. Report the hub's figure there, and the site model's elsewhere?
3. **1515 Boundary Rd has no depth limit in the site model** (I-2: `Z.yards.max` empty; 339's I-3 has 61 m). Is that right for I-2?
4. Travel to the street is the worst hub travel plus the yard depth, a straight add, not a path. Step-free across the yard, its grades and the fence or kerb to the side drive are not drawn or checked (?).

Also from the Municipal report (main chat):
- **Buildable area** on the cards is now the area inside the yard line itself (each lot line moved in by its own yard), not clipped to the rectangular frame. A second row gives the area within the zone's depth of the front yard line. The 3D fence line is unchanged. Golden is unaffected (these are card figures).
- **Loading rounding:** `site.js` already rounds 5.2.5's third step to the nearest whole number (5.1.7). The hub rounded up (`bays5_2_5`, and 5.2.3 for the refuge). Fixed to nearest, one-half up, at least 1 above zero. No test lot changes: the hub caps the data centre at 2,325 m², so the third step never applies to it.

### F8b: J.B.'s answers applied; on by default in Architecture (10 Nov 2026)
1. **Moving back keeps the MW** (same building, moved). The Architecture size search runs with the rule off; the rule is then switched on, keeping that MW. The hub moves back only where its MW stays within 0.01. Any MW gain is a separate decision.
2. **Hub cap fixed on every lot:** where the depth can't come down further, the stacked building narrows 1 m at a time; if it still can't, the hub doesn't fit. 1515 Boundary Rd: 3,392 m² → 2,285 m², 3.23 → 2.18 MW, 53.3 m wide; all travel checks now pass.
3. **1515 has no 61 m limit:** correct (I-2: s. 3.2 sub-area B only, 3.2.2.7–8; J.B.).
4. **On by default in Architecture** (`?front=off` turns it off). Engineering and Municipal stay off unless `?front=yard`. "What the lot allows" in Architecture shows the hub's own yard, so it agrees with the hub's plans.

| Lot | MW (off → on) | Front yard (hub) |
|---|---|---|
| 339 1st Ave E | 1.80 → 1.80 | 17.5 m, about 533 m², public |
| 1515 Boundary Rd | 2.18 → 2.18 | 70.5 m, about 3,758 m², public |
| 8238 Fraser St | 0.68 → 0.69 | 6 m, about 95 m², public |
| 8980 Oak St, 4103 97 St NW | unchanged | stay at the front (any move changes the MW) |
| 1353 Pender St E | unchanged | no move (reaches the rear yard) |
| 64 Airport Rd NW | 1.87 → 1.87 | 2 m (under 6 m) |
| 14715 Yellowhead Trail NW | 2.54 → 2.54 | 28.5 m, about 1,710 m², public |

Golden identical; T-check parity; Part 7 (339, 64 Airport Rd) unchanged.
- 1515's plan card is clipped at the top with the 70.5 m yard (the drawing is taller than its frame): to fix in the Phase C sweep.
- Pool, cascade and garden notes stay with those chats. Yardgate v6/v7 goes into `tool/treach.js` after the hub's fix-list batch (`FIXLIST_rules_vs_scripts_2026-11-10.md`) lands.

## F9: Engineering cards exported for 339 1st Ave E (Code, 10 Nov 2026)
`checks/tests/eng_export.js` → `checks/eng_export/V339/eng_V339.json` (copied to Claude Link `reports/eng_V339.json`); a screenshot of each card in `checks/eng_export/V339/cards/` (for checking only, not committed or published). Tool at commit 1901761, tool folder clean. Read-only: no figure changed.
- **Set-up used:** golden V339's answers exactly (2.5 MW, roof plant, **dry coolers outside**, air inside, N+1, generators in the yard, N+1 generators). The job file says "air-cooled chillers ... plant room": golden's answer is dry coolers outside. With an air-cooled hall the tool places air-cooled chillers (the Cooling card says so). The Noise card's measure is a plant room.
- **Twelve cards** (the template as it is): Your city, Your parcel, What fits, Cooling, Backup power, Noise, Heat offered, Who could take it, Electricity, Water, Materials, Report. "The three options" are folded into Cooling (exported as `options`: inside Air / Liquid to the chip / Immersion; outside Dry coolers / Cooling towers / Hybrid coolers). "Could become" and "two cities" are not Engineering cards (dropped 8 Nov), so nothing to export.
- Per card: hero figures and rows (value, unit, range low/high where shown, label), every "?" (`gaps`) and the card's own missing list, the source lines, the register text of every source or quantity id they name, tables as lists, the drawing's text (`drawText`), and the panel text as shown (`screenText`).
- **Can't be exported as a list:** the receivers in reach (type, distance, demand, pays back). With air cooling the card prices none ("?") and shows counts only (1,055 buildings within 3 km; liquid case: 0 within, 0 depends, 989 beyond, 66 unknown); the per-building list isn't on the card. The Noise card's table of the nearest lots is in `drawText` as lines, not parsed into rows.
- Spot-check (screenshots vs JSON, one for one): Backup power 3 × 2 MW, 12,200 L, 4 × 1 MW, 7–10 cabinets; Noise 74–77 dBA, 55 dBA, 23 m, −25 dB. All match.
- **Two copies (J.B. 10 Nov):** the committed `checks/eng_export/V339/eng_V339.json` names receivers by type only (`checks/tests/eng_redact.js`: 10 receiver names on Heat offered and Who could take it replaced by "[a commercial building]" etc.; distance and the card's figures kept). The full copy, with names and addresses, is only in Claude Link `reports/eng_V339.json` (not public). The receiver list is partly BC Assessment-based.
- **Re-export 10 Nov (tool bc38a8d):** the Cooling card now names the dry option as placed: "Air-cooled chillers" (hero, options, pick), as `plant.js` places them and the Water card already said. No figure changed. Water check (J.B.): the Water card's option bars are water **evaporated** (towers at most 30,551, hybrid 3,788 m³/yr); the Cooling card's are **make-up** water = evaporation + blowdown at 2–6 cycles (× 1.2 to × 2: towers 36,661–61,101, hybrid 4,546–7,577). Both right; the Water card shows the make-up range in its own row. One run read 4,728 noise lots (KB-1 flake); the saved export reads 4,729.

## 12 Nov 2026 (Code): hub cap as floor area in hub.js; the 339 board needs re-growing
- hub.js now grows the data centre to the 2,325 m² floor cap (one hall storey) and lets MW follow, with the hall density for the cooling type (air 630, liquid 150). Where exit spacing fails at the cap, it comes back 0.05 MW at a time (the pool spec's rule 15 step 4 wording, applied to the hub as J.B. asked for every engine) and names the stopping rule.
- Effect on the 13 board lots: only **339 1st Ave E** changes: 1.80 → **1.95 MW**, 2,113 m² of data centre (at the cap 2.10 MW / 2,307 m², the hall exits are 25.26 m apart, 27.17 m needed). Hall exits 25.36 / 25.85 m, "tight". Front public yard 6 m (was 17.5 m). The other lots are limited by depth, height or width, or don't fit: unchanged.
- The ic40 board for 339 is at 1.83 MW, so the engine-vs-board match on 339 now differs on 8 rows (was 7). **Needs: the hub's 339 board re-grown to the cap**, as the pool and cascade are doing, so the answer key matches the rule.

## 12 Nov 2026 (Code), later: hub.js step 2 (sizing) changes the cap result on two lots
- Sets and pads now come from the shared sizing rule (gens / transformers / hubSet, 11d), with kW and kVA on the labels; the hub's own set is drawn at grade in its enclosure; the battery room holds the 15-min cabinets in two rows.
- **339 1st Ave E: 1.95 → 1.86 MW** (2,003 m²). The KD2000 sets the rule picks (13.50 × 3.50 m) leave no room for the 4th chiller at 2.11 MW, so the plant yard stops it, not exit spacing. Front yard 2 m (no public yard). The board re-grow for 339 should land near 1.86 MW, stopped by the plant yard.
- **1353 Pender St E: 2.13 → 1.83 MW.** Turned variant: the plant yard beside the building has to be 32 m wide to hold the larger plant, which narrows the building.
- 13 board lots: rows agreeing 101 → 112, differing 53 → 42. Every Plant sized to load, Hub generator (72 h) and Battery cabinets row now matches its board, except E14715 Plant sized to load (tool "tight", within 0.1 MW of a sizing switch point; board "pass").

## 12 Nov 2026 (Code), milestone 1 section C, for the main chat's report scripts
- `reports/eng_V339_layout.json` is written by Code (`checks/tests/eng_layout_export.js`): the tool's own layout (lot, footprint, generator sets, loading, racks per hall floor) and `top_receivers` ranked by cost of heat. Notes inside it: the cooling plant on 339 sits in an enclosed plant room (the noise measure), the Engineering model counts transformer pads but does not place them, and racks are counts, not positions.
- J.B. asked to drop "fire-fighting water" everywhere. The tool no longer shows it; `reports/report_eng.py` line ~206 still has a "Fire-fighting water ?" fact (main chat's script, not edited by Code).
- Grid text: the tool now gives J.B.'s Murrin / East Vancouver sentence east of the downtown peninsula (339, 275 1st Ave E, 1425 Clark Dr) and the West End text on the peninsula (555 W Hastings, 1050 W Pender); outside the study area, "No utility publishes spare capacity; the connection is BC Hydro's answer". p7 can use the same split.
- BC Hydro rate: the tool's 6.79 ¢/kWh + $13.83/kW are the Electric Tariff RS 1600-1611, Revision 16, in effect from 1 April 2026 (register bchTariff2026); the business-rates page's 6.53 ¢ + $13.30 are the older, undated figures. No change to the yearly cost.
