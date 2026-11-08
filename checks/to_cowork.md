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
- (c) Tapping a figure: missing everywhere (only the per-card "How this is worked out" button). Added: every hero figure and row value opens the diagram at the card's nodes, or at one node where the card names it (hero k / row [2]; no card names one yet). Cards with no nodes mapped, so a tap opens the template tab with nothing lit (28 of 49): Resident all 4; Municipal Industrial land and jobs, Report; Engineering Your city, Your parcel, Report; Architecture 19 of 22 (all but What fits / Cooling-type cards mapped via CARD).
- docs/STYLE.md updated from Claude Link (§7 Terms).
