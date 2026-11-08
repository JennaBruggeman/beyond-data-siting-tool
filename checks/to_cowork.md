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
