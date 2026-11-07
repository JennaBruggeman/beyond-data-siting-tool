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

