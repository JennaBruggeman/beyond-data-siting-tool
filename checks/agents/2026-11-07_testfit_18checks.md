# Hand test fits on the 18 schematic checks (independent check, 7 Nov 2026)

WORKLIST §5, first item. Checker: independent agent (did not draw the plans). Repo read only; nothing edited.

## Answer first

- **No plan is fully clean, but most fails are small.** Ten plans checked. The one big fail is new: **8238 Fraser St breaks the I-2 ground-storey minimum (6.1 m)**, and fixing it breaks the height.
- **Vancouver loading is under-counted on every Vancouver plan.** The tool counts per class of use, so the public programs need their own bay. V339 (all three typologies), V1330 and V8238 are each short by 1 space or more.
- **Check 12 (lobby exits) now passes on every board, by the boards' own account.** Since pass 3, no data-centre room opens onto the shared lobby and no upper-storey stair leads through it. I could not confirm this on the geometry (see weaknesses).
- **Generator noise at the lot lines (check 17) is new and fails in Edmonton** where sets sit 3.0 m from a lot line (E06B, E14715, E4103), unless sets are tested one at a time. One set gives 85.4 dB(A) at 3.0 m against 85 (our arithmetic). Overnight outages fail everywhere near homes in Edmonton (flag, as asked).
- **V339 lobby door is 0.7 m above the ground slab with no ramp drawn.** As drawn, that fails the accessible entrance rule.
- **Usable as the reference now (after small fixes): E06B Emergency hub, E06B Community pool, E06B Heat cascade.** All V339 boards and both Edmonton lot boards (E14715, E4103) are out of date. Redraw them before they become references.

## Weaknesses (read before the tables)

- **I could not re-measure any geometry.** The boards (`whitemock/project/TestFit_*.dc.html`) and their scripts (`tf3/`, `tfl/`, `tfcp/`, `tfhc/`, `chk2/`) are in Cowork's scratchpad, not on this computer. I searched `C:\Users\bangp` and the temp and Claude data folders: not found.
  - So travel along the path, exit spacing, yards and door positions come from the test-fit files' own figures, and for the four Emergency hub boards (E06B, V339, V1330, V8238) from check 2's own SVG parser (`testfit_check2.md`). The Community pool and Heat cascade boards were never measured by a second agent.
  - The only images in the repo are `checks/agents/elev_shots/TestFit_EH_E06B.png` and `TestFit_EH_V339.png`. They are **OUT OF DATE** (the redraw stage, 28/14 and 31/11 checks, before the access fix, pass 3 and the check-2 fixes). They show the old portal and guard room off the lobby. I used them only for the overall arrangement (bands, plant yard position).
- **The code texts (`data/raw/codes/`) are not in this repo copy.** I used the register entries (`arch_nbc3131`, `arch_nbc3227`, `arch_nbc3432`, `arch_nbc3442`, `arch_sec_nbcFireAccess`, `nbc2020_v1`, `nbcAB2023`, `arch_sup_nbcT3722A`, `arch_per_nbcWC`, `arch_sup_nbcT31171`, `arch_pub_nbc31171`, `van_zdb_i2`, `van_zdb_i3`, `vanParking5`, `edmZB580`, `arch_csa_b139`, `arch_csa_c282`, `arch_hb_vbblFlood`, `van6555s41c`, `edm14600s19to24`, `kohlerG6154sound`), `clause_reads_2026-11-07.md`, `noise_reads_2026-11-07.md`, `code_checklist.md` and `adj_service.md`. These are second-hand reads of the codes. Where a clause's wording matters and the repo only has a summary, I say so.
- **Generator noise is our arithmetic on one maker claim**: 78 dB(A) at 7 m, Rehlko KD2000 SL2 (`kohlerG6154sound`). It is used for the KD1000 sets too, as asked; the KD1000 figure is not in the repo (?). Formula (free field, no screening): Lp(r) = 78 − 20 log10(r / 7), plus 10 log10(n) for n sets at once. **Inside 7 m this estimate is unreliable** (near field), so results at 3 m are flags, not hard fails, for one set.
- **Thin margins carried over:** E06B Emergency hub travel 44.4–44.7 of 45 m; V8238 travel 44.3–44.6 of 45 m; V8238 height 18.21 of 18.3 m; V339 height 17.97 of 18.3 m; E06B pool and cascade height 15.9 of 16.0 m; V1330 chiller noise 64.7 of 65 dB(A).
- **Errors that may cancel:** the travel proxy uses 4-way steps on a 0.25 m grid. In open rooms that is longer than the real path. In a racked hall it can be shorter (racks are not modelled). Hall travel could go either way.

## Plan versions checked

| Plan | Version checked (text) | Board state |
|---|---|---|
| EH E06B, 64 Airport Rd NW (BE) | `testfit_emergency_hub.md` up to "Check 2 fixes (4 Nov)": pass 3 + check-2 fixes; 3.7 MW | current (tool still 3.7 MW at this lot) |
| EH V339, 339 1st Ave E (I-3) | same file, pass 3 + check-2 fixes; 1.5 MW | **OUT OF DATE**: drawn at 1.5 MW, tool now 1.4 (notes 5 Nov); J.B. 5 Nov: "All V339 test-fit boards out of date" (back half unused, new layout rules) |
| EH V1330, 1330 Glen Dr (I-2) | `testfit_lots.md`, Vancouver section + check-2 fixes; 0.4 MW | current as far as the notes say |
| EH V8238, 8238 Fraser St (I-2) | same, + check-2 fixes; 1.4 MW | current as far as the notes say |
| EH E14715, 14715 Yellowhead Trail NW (BE) | `testfit_lots.md`, "Redraw at the tool's new size" (17.5 MW); hub kept from the first pass | **OUT OF DATE**: drawn at 17.5 MW, tool now 12.1 MW (5 Nov loading fix); hall fails its own size row |
| EH E4103, 4103 97 St NW (BE) | same (7.6 MW) | **OUT OF DATE**: drawn at 7.6 MW, tool now 5.2 MW |
| CP E06B · CP V339 (Community pool) | `testfit_community_pool.md`, 5 Nov pass (3.7 · 1.4 MW) | E06B current; **V339 OUT OF DATE** (J.B. 5 Nov, all V339 boards). Check 1 only before this |
| HC E06B · HC V339 (Heat cascade) | `testfit_heat_cascade.md`, 5 Nov pass (3.7 · 1.4 MW) | E06B current; **V339 OUT OF DATE** (same). Check 1 only before this |

Also out of date: the two screenshots in `checks/agents/elev_shots/` (see above); the top compliance table in `testfit_emergency_hub.md` (rows such as "Lobby used as an exit ?", "Travel 44.3 m", guard room and portal off the lobby are superseded by its own later sections); the E14715/E4103 "first pass" section (marked superseded in the file).

## Conventions

- pass / **fail** / flag (passes on a reading, or a thin margin, or needs an approval) / ? (no text or no dimension to check).
- "our arithmetic", "our reading" as labelled. "Board figure" = a figure in the test-fit file that I could not re-measure.
- Exit width: occupant load × 6.1 mm (doors, corridors), × 8 mm (stairs); each exit counts for at most half (3.4.3.2.(7)); minimum doorway 850 mm, corridor 1,100 mm, stair 1,100 mm (Table 3.4.3.2.-A, `arch_nbc3432`). Door gaps are drawn 0.9 m on all boards (drawing choice).
- Washrooms: load split 50/50 by sex (`arch_sup_nbcA3722`); Table 3.7.2.2.-A for assembly, -B for business.
- Loading: Edmonton one count on the whole building's non-residential floor area (`edmZB580`, Table 7.2: < 2,500 m² 0; 2,500–7,500 1; > 7,500 2). Vancouver per class of use, summed (`vanParking5`, s. 5.1): storage class (data centre) 1 for the first 465 m², 1 for the next 1,860 m², 1 per further 2,325 m²; assembly class row 5.2.3 (community centre, fitness centre, pool) 1 per 2,800 m², none under 100 m²; fractions go to "the nearest whole number above zero" (our reading: any fraction gives at least 1).
- Generator test limits: Vancouver ≤ 80 dB(A) at the point of reception or 6.1 m, whichever is greater (`van6555s41c`); Edmonton daytime ≤ 1 h: ≤ 75 at a residential line, ≤ 85 at a non-residential line; overnight 50 / 60 (flag) (`edm14600s19to24`).

---

## 1. EH E06B — Emergency hub, 64 Airport Rd NW (BE), beside variant

| # | Result | Clause | Measurement or reason |
|---|---|---|---|
| 1 Use | flag | BE 3.3.1, 3.12.1, 3.18 | Clinic 484 m² ≤ 500 only if waiting 80 m² and offices 19.6 m² hold (benchmark 604 m² → variance). Refuge + shelter 384 m² ≤ 500 whether one use or two. Data centre allowed (tool). |
| 2 Height, floor area | pass | BE 4.1.1, 4.1.2 | FAR 4,407 ÷ 4,284 = 1.03 ≤ 1.6. Hall roof 12.0 m; hub 6.0 m + rooftop plant room ≈3.9 m = 9.9 m ≤ 16.0 m. Grade ? (no HRDEM). |
| 3 Yards | flag | BE Table 4.1 | Street 4.46 m measured by check 2 vs 4.5 m: 0.04 m in (called "drawing tolerance", not fixed). Others 0 m. Plant not in a setback (setbacks 0 m). |
| 4 Storey heights | n/a | — | No BE storey-height rule found (`code_checklist.md` §15 "?"). |
| 5 Loading | pass | BZ 5.80 Table 7.2; BE 5.8 | 4,407 m² → 1 space; 1 bay 10.1 × 3.4 m inside ≥ 9.0 × 3.0 m; on the alley side, not between building and street. Truck door not drawn (minor). |
| 6 Construction, area | pass | 3.2.2.6, 3.2.2.77 | F-2 governs; 2 storeys; building area 2,808 ≤ 9,000 m²; sprinklered, noncombustible. |
| 7 Separations | flag | Table 3.1.3.1 (`arch_nbc3131`) | A-2 meets F-2 at the lobby, lobby WC, janitor, first aid, refuge WCs and shelter; the shelter also meets the DC staff vestibule and guard point (check 2). Board says "2 h along the refuge and lobby": the 2 h line must wrap every A-2/F-2 contact. Clinic (D) to F-2: none needed. No F-2 over A-2. Rooftop chiller room (data-centre plant) sits over the hub (A-2): rating of that roof ? (our reading: plant room, not a storey). |
| 8 Two exits ≥ ½ diagonal | pass | 3.4.2.1, 3.4.2.3.(1) | Storey 1 has a public corridor → 9 m cap; all pairs ≥ 9 m (check 2). Storey 2 (no public corridor): 54.9–55.6 m ≥ 31.1 m. |
| 9 Travel ≤ 45 m | flag | 3.4.2.5.(1) | Storey 1 44.7 m (board) / 44.4 m (check 2), DC lockers → S1: 0.3–0.6 m margin. Storey 2 38.9 m (hall; racks not modelled). J.B. accepted "tight is fine" (4 Nov). |
| 10 Exit width | flag | 3.1.17.1; 3.4.3.2 | Refuge (non-fixed seats 0.75): 175.1 ÷ 0.75 = 233 → 233 × 6.1 = 1,421 mm; 2 doors × 0.9 m = 1,800 mm: pass. If the refuge counts as standing space (0.40, 3.1.17.1.(4) "greatest number"): 438 → 2,672 mm: needs 3 doors at 0.9 m or 2 at ≥ 1.34 m (zone has 6 exits, room doors ?). Data hall at the 4.60 "process" row: 1,168 ÷ 4.6 = 254 a storey → stairs 254 × 8 = 2,032 mm ≤ 2 × 1,100 = 2,200 mm: pass even on the strict reading (thin). |
| 11 Corridors, dead ends | flag | 3.3.1.9.(1), (5) | Public corridors 2.0 m ≥ 1.1 m; public stubs ≤ 6.0 m. Secure passage 12.0 m and storey-2 service corridor 19.7 m dead ends: whether (5) applies inside the secure line is ? (not re-stated in pass 3). |
| 12 Exit through lobby | pass (board) | 3.4.4.2.(1), (2)(c) (`arch_nbc3442`) | Pass 3: DC staff enter by their own alley door; no F-2 room opens onto the lobby; storey-2 stairs S1, S2 do not lead through it. Mechanical room and janitor open onto the lobby: service rooms of the hub, not industrial (our reading). Not re-measured. If the refuge sleeps people overnight it becomes residential (see "could not check"). |
| 13 Lift, accessible route | flag | NBC(AE) 3.8.2.3; 3.8.2.2 | Storey 2 (hall, 1,168 m²) reached only by a freight elevator; whether it counts as the accessible route is ?. Street entrances step-free on the board; grade ?. |
| 14 Washrooms | pass | Table 3.7.2.2.-A, -B | Refuge + shelter 233 + 73 = 306 → 153 a sex → 4 M + 7 F = 11 drawn. Clinic 484 ÷ 9.3 = 52 → 26 a sex → 2 + 2 = 4 drawn. DC staff ≤ 10 → 1 WC (designed load, our reading; 3.7.2.2.(2)). On the 0.40 refuge reading: 438 + 73 = 511 → 256 a sex → 5 M + 10 F = 15 (flag). |
| 15 Fire access, FDC | ? / pass | 3.2.5.5.(1); NBC(AE) 3.2.5.15.(3) | The street is the route: entrance 4.5 m behind the lot line; kerb distance ? (passes if the boulevard is ≤ 10.5 m, our arithmetic). FDC 5.0 m from the principal entrance (3–15 m): pass. Hydrant ≤ 45 m ?. |
| 16 Generators, fuel | pass | CSA C282 6.2.1; B139 Table 2; NBC 6.3.2.9 | Outdoor enclosures. Sub-base tanks ≈4,100–4,500 L a set (16,350–18,110 L ÷ 4, our arithmetic) → 2,500–50,000 L band: 1.5 m to building (2.7 drawn), 3.0 m to lot line (3.0 drawn, 0 margin). Exhaust to nearest exit door 4.1 m ≥ 3.0 m (outlet position ?). |
| 17 Plant edge, noise | **fail** (test) / flag | Bylaw 14600 ss. 19–22; BE 5.2 | Generators 3.0 m from a lot line (neighbour BE, non-residential): one set 78 + 20 log(7/3) = **85.4 dB(A) vs 85** (near-field, flag); four tested together **91.4 → fail**. Overnight outage: 85 at that line vs 60 → flag. Nearest home (8065 Cedric Mah Rd NW; distance given for the chillers only, 91 m, generator distance ?): one set 55.7, four 61.7 ≤ 75 daytime; > 50 overnight → flag. Chillers: plant room passes (board, not re-run), but it sits on the **hub roof, the public street row** → flag against "plant never on the public edge" (conflicts with "not over the hall"; J.B. to choose). |
| 18 Flood level | ? | — | No Edmonton flood level in the repo; grade ?. |

**Fails ranked by layout change**
1. Generator test noise (17): smallest fix: an operating rule "test one set at a time" plus moving the row from 3.0 to ≥ 3.2 m off that lot line (one set ≤ 85); all four at once need ≥ 6.3 m (our arithmetic). Check which line is the 3.0 m one: if it is the alley line, the receiving property is across the alley and the figure drops (≈ 81.8 for four sets at 9 m).

**Flags to settle on the board:** wrap the 2 h line around the shelter–vestibule and guard-point contacts; pull the street face 0.04 m; make the DC lift a passenger-rated accessible lift or show why storey 2 is exempt; decide the rooftop chiller room vs the public edge (set it back on the hub roof, away from the street face).

## 2. EH V339 — Emergency hub, 339 1st Ave E (I-3), stacked variant — OUT OF DATE

| # | Result | Clause | Measurement or reason |
|---|---|---|---|
| 1 Use | flag | I-3 2.1; Map 1 | Bulk Data Storage conditional; lot in sub-area A (31 of 32 I-3 lots; only 370 Prior St is B, clause reads 7 Nov): settled. Community Centre / SSC and Health Care Office conditional. |
| 2 Height, floor area | flag | I-3 3.1.2.1, 3.1.1.1 | FSR 3,320 ÷ 4,503 = 0.74 ≤ 3.00; non-industrial 1,159 ≤ 4,503 m². Height 23.0 − 5.03 = 17.97 ≤ 18.3 m (0.33 m margin); base surface from existing corner grades, official grades ?; stair and lift overruns above 18.3 m: s. 10.1.1 ?. |
| 3 Yards | pass / flag | I-3 3.1.2.2–6; Z&D 10.13.1 | Front 0.6, sides 7.6, rear 3.1 m; north wall moved inside (check-2 fix). Plant yard inside the buildable area (fence 11.3 m off the lot line): pass. Truck drive in the 7.6 m side yard: allowed ? (10.13.1 allows only what the by-law or Parking By-law provides). |
| 4 Storey heights | pass | I-3 3.1.2.9 | 6.0 / 6.0 / 6.0 m (≥ 6.0 ground, ≥ 4.0 upper). |
| 5 Loading | **fail** | Parking By-law s. 5.1, 5.2.3, 5.2.5 | Data centre 2,180 m² → 1 + 1 = 2. Refuge + shelter + lobby ≈ 616 m² (1,159 − 543 clinic, our arithmetic), assembly class: 616 ÷ 2,800 = 0.22 → 1. Clinic class ? (not in the rows read). **Needs ≥ 3, drawn 2.** Off the street: pass (inside, gate 19.8 m in). |
| 6 Construction, area | pass | 3.2.2.6, 3.2.2.77 | 3 storeys, 1,311 ≤ 6,000 m²; sprinklered (VBBL). |
| 7 Separations | flag | Table 3.1.3.1; 3.2.2.7 | Refuge (A-2) to DC at storey 1: 2 h (check 2 confirmed). Clinic (D) beside the hall: none needed. Refuge under clinic: 1 h. No F-2 over A-2. Storey-2 lift lobby touches the secure corridor: 2 h if the lift lobby is A-2 (?). Public floors not fully above or below the hall, so the F-2 article governs the whole building (it does). |
| 8 Two exits | pass | 3.4.2.3.(1) | Storey 1 public corridor → 9 m cap: met. Storey 2: clinic 27.3 m, DC 31.7 m ≥ 19.4. Storey 3: 31.7 ≥ 19.4 (board; check 2 32.1). |
| 9 Travel | pass | 3.4.2.5.(1) | 24.0 / 30.9 / 30.9 m (after check-2 fix; check 2 parser 24.1 / 31.1 / 31.1) ≤ 45. |
| 10 Exit width | pass | 3.4.3.2 | Refuge 174.6 ÷ 0.75 = 233 → 1,421 mm; 7 exits. Clinic 59 × 8 = 472 mm ≤ 1,100 stairs. Hall at 4.60: 477 ÷ 4.6 = 104 → 830 mm stairs. 0.40 refuge reading → 437 → 2,666 mm: flag (7 exits in the zone, likely enough; door count of the main room ?). |
| 11 Corridors, dead ends | pass | 3.3.1.9 | Public 2.0 m (2.15 m after the check-2 fix); no dead end over 6 m (board). |
| 12 Exit through lobby | pass (board) | 3.4.4.2 | Pass 3: DC staff door on the north side yard; lobby serves public rooms only; no storey-2 exit through it. Not re-measured. |
| 13 Lift, accessible route | **fail** (as drawn) | 3.8.2.2.(1); VBBL 3.8.2.3.(2)(g) | Lobby street door at grade 5.7 m, slab 5.0 m: **0.7 m step, no ramp drawn**. Lifts: E1 public to the clinic; E2 freight for DC storeys (accessible ?). |
| 14 Washrooms | pass | Table 3.7.2.2.-A, -B | 233 + 75 = 308 → 154 a sex → 4 + 7 = 11. Clinic 59 → 30 a sex → 2 + 2 = 4. DC 1 WC (VBBL ≤ 25). |
| 15 Fire access, FDC | ? / pass | VBBL 3.2.5.5, 3.2.5.15.(2) | Principal entrance 0.6 m behind the lot line; 3–15 m to the route "along the path": kerb ?. FDC 3.0 m ≤ 5 m: pass. |
| 16 Generators, fuel | flag | C282 6.2.1; B139 Table 2 | KD1000 12 h tank 3,475 L → 2,500–50,000 band (1.5 / 3.0 m): met. Pads 5.0 ≥ 4.6 m FCL, LiDAR datum ?. Exhaust 5.7 m to the dock doors ≥ 3.0. |
| 17 Plant edge, noise | pass / flag | By-law 6555 s. 4.1(c) | Sets ≥ 12.8 m from lot lines (fence 11.3 + 1.5 m clear, our arithmetic): one set 72.8, four 78.8 ≤ 80: pass. Generator yard behind the building, off the public edge: pass. Chillers on the clinic roof, the street half → flag (public edge rule). Street line 60.2–63.5 dB(A) (board). |
| 18 Flood level | ? | VBBL Div. A FCL | Slab and pads 5.0 m ≥ 4.6 m only if the LiDAR datum matches GVRD datum (?). |

**Fails ranked by layout change**
1. Loading (5): add a third Class B bay (10.2 × 3.4 m) beside the two, sharing the 6.1 m aisle; the unused back half has room. Or ask the Director of Planning for shared loading under s. 5.1.
2. Lobby step (13): an internal ramp at 1:12 (≈ 8.4 m run plus landings) in the lobby, or a stepped lobby floor at 5.7 m with a ramp inside. A higher slab (5.3 m) still leaves 0.4 m and puts the refuge door 0.3 m below the slab.

Both should be designed into the redraw J.B. already asked for.

## 3. EH V1330 — Emergency hub, 1330 Glen Dr (I-2), scaled, stacked by zone

| # | Result | Clause | Measurement or reason |
|---|---|---|---|
| 1 Use | ? / flag | I-2 2.1 | Bulk Data Storage conditional. Clinic within the health care office cap. Refuge and shelter use in I-2: not stated in the files (?). |
| 2 Height, floor area | flag | I-2 3.1.1.1, 3.1.2.1; Z&D 10.1.1 | FSR 1,658 ÷ 1,041 = 1.59 ≤ 3.00; non-industrial 871 ≤ 1,041; clinic 512 ≤ 552. Building 21.3 − 4.30 = 17.0 ≤ 18.3 m. **Roof noise screen reaches 21.8 m, plant room option also over 18.3 m**: needs s. 10.1.1 (Director ?). |
| 3 Yards | pass | I-2 3.1.2.2–3 | Front 0, sides 0, rear 3.1 m (16.8 m drawn). |
| 4 Storey heights | pass | I-2 3.1.2.4 / 3.2.2.9 | 6.1 / 4.5 / 6.0 m (≥ 6.1 ground, ≥ 4.0 upper). 0 margin on the ground storey. |
| 5 Loading | **fail** | s. 5.1, 5.2.3, 5.2.5 | Data centre ≈ 790 m² → 1 + 1 = 2; refuge + shelter > 100 m² → 1; clinic class ?. **Needs ≥ 3, drawn 1** (the board already fails 1 of 2). |
| 6 Construction, area | pass | 3.2.2.77 | 3 storeys, building area 601 m² ≤ 6,000. |
| 7 Separations | pass | Table 3.1.3.1; 3.2.2.7 | Stacked: refuge (A-2) storey 1, clinic (D) storey 2 (1 h floor), hall storey 3 over D (none). 2 h around storey-1 DC rooms; contacts only refuge corridor ↔ secure corridor and DC janitor (check 2). |
| 8 Two exits | pass | 3.4.2.3 | Storey 3: 19.0 ≥ 17.4 m (½ of 34.7). Storey 1–2 public corridor → 9 m cap. |
| 9 Travel | pass | 3.4.2.5 | 21.6 / 23.4 / 28.9 m (check 2). |
| 10 Exit width | pass / flag | 3.4.3.2 | Refuge 109.9 ÷ 0.75 = 147 → 897 mm; 2 doors × 0.9. Storey-1 DC exits: S2, shipping door and a **loading-space door** (check 2): the same issue check 2 fixed on V8238; if that is a truck door, 2 exits remain (S2, shipping door): flag. |
| 11 Corridors | pass | 3.3.1.9 | 2.0 m. |
| 12 Exit through lobby | ? | 3.4.4.2 | Refuge rooms reach a second exit only through the lobby (first storey: (1) does not apply, our reading). Where storey-2 stairs S1, S3 discharge, and whether any DC room opens onto the lobby: not stated. |
| 13 Lift | ? | VBBL 3.8.2.3.(2)(g) | No lift is named in `testfit_lots.md` for V1330. Every storey must be reached in Vancouver. |
| 14 Washrooms | pass | Table 3.7.2.2.-A, -B | 147 + 29 = 176 → 88 a sex → 2 M + 4 F; clinic 56 → 28 a sex → 4. |
| 15 Fire access, FDC | ? | VBBL 3.2.5.5, 3.2.5.15 | Front yard 0 m: entrance on the lot line; 3 m minimum to the route depends on the sidewalk (?). FDC not stated. |
| 16 Generators, fuel | flag | B139; C282 6.2.1; 6.3.2.9 | 3.0 m to building and side lot line (B139 1.5 / 3.0: 0 margin). Exhaust outlet vs openings in the wall 3.0 m away: ?. Pads vs FCL 4.6 m (lot grade 4.2–4.7): pad level not stated (?). |
| 17 Plant edge, noise | flag | 6555 s. 4.1(c) | Sets 3.0 m from the side line → measured at 6.1 m: one set 79.2 ≤ 80 (0.8 dB); two together 82.2 → fail unless tested one at a time. Chillers: low-noise + screen 64.7 vs 65 (0.3 dB, maker claim). Plant at the rear by a 6.1 m drive: off the public edge. |
| 18 Flood level | ? | FCL | Whole lot in the floodplain; grade 4.2–4.7 vs 4.6 m; slab level not stated; datum ?. |

**Fails ranked by layout change**
1. Loading (5): 3 bays need about 3 × 4.0 m + aisle on a 25.5 m frontage with no lane. There is no small fix. Our reading: this lot is the fallback ladder's "doesn't fit here" case for the Emergency hub, unless the Director relaxes loading (s. 5.1) or the hub drops to one program.

## 4. EH V8238 — Emergency hub, 8238 Fraser St (I-2), narrow through lot

| # | Result | Clause | Measurement or reason |
|---|---|---|---|
| 1 Use | ? | I-2 2.1 | As V1330. |
| 2 Height, floor area | **fail** (after the check-4 fix) | I-2 3.1.2.1 | FSR 2,719 ÷ 1,738 = 1.56; non-industrial 836 ≤ 1,738. Height now 18.21 ≤ 18.3 m (0.09 m) with a 5.0 m ground storey. With the required 6.1 m: 18.21 + 1.1 = **19.31 m > 18.3**. |
| 3 Yards | flag | Z&D 10.13.1 | Building inside both 3.1 m street yards (check-2 fix). Generator fence 1.5 m off the local-street line; with the 1.5 m clearance rule the sets sit 3.0 m off it, **0.1 m inside the 3.1 m yard** (our arithmetic). Which end is the front is not settled (10.26.1). |
| 4 Storey heights | **fail** | I-2 3.1.2.4 (sub-area A), 3.2.2.9 (sub-area B) (`van_zdb_i2`) | Ground storey 5.0 m < 6.1 m. The register lists 6.1 m in **both** sub-areas, so the open "sub-area A ?" question does not save it (our reading). |
| 5 Loading | **fail** | s. 5.1, 5.2.3, 5.2.5 | Data centre ≈ 1,550 m² → 2; refuge + shelter + lobby ≈ 500 m² → 1; clinic ?. Needs ≥ 3, drawn 2. Straight approach to bay 1 overlaps the generator fence by ≈ 1.1 m (check 2). |
| 6 Construction, area | pass | 3.2.2.77 | 3 storeys, 1,073 m² ≤ 6,000. |
| 7 Separations | **fail** (board wording) | Table 3.1.3.1; 3.2.2.7.(2) | F-2 sits over the shared lobby, public corridor, WCs, first aid, staff office, cot store, not only refuge and shelter (check 2). The board still says "2 h floor over the refuge and shelter". 2 h floor needed under all storey-2 F-2 over A-2. |
| 8 Two exits | flag | 3.4.2.3.(1), (2) | Storey 2 (no public corridor): 23.4 m < ½ diagonal 33.8 m. Passes only by 3.4.2.3.(2) (fire separation splits the floor area, hall 529 / support ≈ 502 m², each ≥ ⅓): our reading of check 2's summary; the clause text is not in the repo. |
| 9 Travel | flag | 3.4.2.5 | 42.5–42.6 / 44.3–44.6 / 24.0–24.1 m: storey 2 has 0.4–0.7 m margin. |
| 10 Exit width | pass | 3.4.3.2 | Refuge 145.6 ÷ 0.75 = 194.1 → 195 → 1,190 mm, 2 doors × 0.9 m. Exit passage 1.13 m ≥ 1.10 m (0.03 m). Clinic 36 persons. |
| 11 Corridors | pass | 3.3.1.9 | 2.0–2.4 m. |
| 12 Exit through lobby | pass / flag | 3.4.4.2 | Clinic (storey 1) second exit through the shared lobby: (1) covers only upper and lower storeys (our reading); only the public corridor and shelter open onto it, so (2)(c) is met even on a strict reading; path through the lobby ≤ 15 m: not measured (?). |
| 13 Lift, accessible route | ? | VBBL 3.8.2.3; 3.8.2.2 | No lift named for storeys 2–3. Grade falls 6.2 → 2.5 m eastward; slab 4.6 m. If the Fraser St end is near 6 m (our reading of "falls to the east"), the public doors sit ≈ 1.5 m below the sidewalk: accessible entrance ?. |
| 14 Washrooms | pass | Table 3.7.2.2.-A, -B | 194–196 + 75 = 271 → 136 a sex → 3 M + 6 F; clinic 36 → 18 a sex → 2. |
| 15 Fire access, FDC | ? | VBBL 3.2.5.5, 3.2.5.15 | Entrance 3.1 m behind the Fraser St line; kerb ?; FDC not stated. |
| 16 Generators, fuel | flag | C282 6.2.1; B139 | Pads at 4.6 m = FCL (0 margin, datum ?); yard grade 2.5–3.4 m (fill ?). Sets ≈ 3.0 m from the lot line = B139 3.0 m (0 margin). Transformer fence side clearance vs BC Hydro ES54 F ?. |
| 17 Plant edge, noise | flag | 6555 s. 4.1(c) | Plant yard on the local-street frontage (a street edge, not the public front): flag. One set at 6.1 m 79.2 ≤ 80; four together 85.2 → fail unless tested one at a time. Chillers in a plant room 56.7–60.0 ≤ 65 (board). |
| 18 Flood level | flag / ? | FCL | Slab 4.6 m = FCL (0 margin, datum ?); bays and passage door 1.2–2.1 m above the yard. |

**Fails ranked by layout change**
1. Storey heights + height (4, 2): the 6.1 m ground storey pushes the roof to ≈ 19.3 m. Smallest fix: ask for the discretionary height increase (I-2 3.1.2.5, up to 30.5 m, our reading of the register summary) and say so on the board. Without it, one hall storey is lost (hall halves).
2. Loading (5): a third bay at the local-street end (the yard has room once the generators move) or a s. 5.1 relaxation. Move the generator row ≥ 1.1 m to clear the approach and the 0.1 m yard intrusion together.
3. 2 h floor (7): board label and section only; no layout change.

## 5. EH E14715 and E4103 — Emergency hub, Edmonton large and corner lots — OUT OF DATE

Both boards were drawn at 17.5 / 7.6 MW. Their own hall-size row fails (65 % / 60 %). The tool is now 12.1 / 5.2 MW. Redraw first; the rows below check the redraw as written.

| # | E14715 | E4103 | Clause | Measurement or reason |
|---|---|---|---|---|
| 1 Use | pass | pass | BE 3.18 | Refuge + shelter 485 · 368 m² ≤ 500; clinic 484 ≤ 500 (a 14th exam room → 501, fail). |
| 2 Height, area | pass | pass | BE 4.1 | FAR 0.99 (1.13 with plant room) · 0.89 (1.01) ≤ 1.6; 2 hall storeys 12 m ≤ 16 m. Grade ?. |
| 3 Yards | pass | flag | BE Table 4.1; 5.2 | Street 4.5 m; E4103 flank 4.5 m; rear plant yard open to the flank street: screening ? (BE 5.2). |
| 4 Storey heights | n/a | n/a | — | No BE rule. |
| 5 Loading | ? | pass / ? | BZ 5.80 Table 7.2 | E14715 10,001 m² > 7,500 → **2 needed**; the redraw does not state how many (first pass drew 1 for 3,004 m²). E4103 4,973 m² → 1; 1 drawn in the first pass, redraw ?. |
| 6 Construction | pass | pass | 3.2.2.77 | 2 storeys; E14715 building area ≈ 6,400 m² (10,001 − hall storey 2 3,575, our arithmetic) ≤ 9,000. |
| 7 Separations | flag | flag | Table 3.1.3.1 | Hub = E06B hub mirrored: same wrap flag. E14715 plant room 1,350 m² on the hub roof. |
| 8 Two exits | pass | ? | 3.4.2.3 | E14715 six stairs; E4103 storey 2 pair distance not stated. |
| 9 Travel | flag | flag | 3.4.2.5 | 40.9 m, but only with the **exit court** (DC lockers 49.5 m without it); whether a court reached by a 1.65 m covered passage counts as outdoors is ?. E4103 43.8 m (1.2 m margin). |
| 10 Exit width | **fail** | pass | 3.4.3.2 | E14715 refuge 227.5 ÷ 0.75 = 304 → 1,854 mm; 2 exterior doors × 0.9 m = 1,800 mm: **54 mm short**. E4103 refuge as E06B. |
| 11 Corridors | pass | pass | 3.3.1.9 | As E06B. |
| 12 Lobby | ? | ? | 3.4.4.2 | DC rooms sit behind the lobby; whether any opens onto it, and where storey-2 stairs discharge, is not stated for the redraw. |
| 13 Lift | flag | flag | NBC(AE) 3.8.2.3 | Freight elevator only; accessible ?. |
| 14 Washrooms | pass | pass | Table 3.7.2.2.-A | E14715 304 + 142 = 446 → 223 a sex → 5 M + 9 F (drawn). E4103 as E06B. |
| 15 Fire access | ? | ? | 3.2.5.5 | Entrance 4.5 m behind the street line; kerb ?; FDC not stated. |
| 16 Generators | pass | pass | B139 Table 2 | Rows 3.0 m (E4103 3.1 m) from lot lines (0–0.1 m margin). Transformers ≥ 6 m (EPCOR). |
| 17 Noise | **fail** (test) / flag | **fail** (test) / flag | 14600 ss. 19–22 | E14715 15 sets at 3.0 m from a BE line: one 85.4 (flag), 15 together 97.1 (fail); ≥ 12.2 m needed for 15 at once. Overnight: home 613 m, 15 sets 50.9 > 50 (flag). E4103 7 sets at 3.1 m from the IM line: one 85.1 (flag), 7 together 93.5 (fail; ≥ 8.3 m). Home 911 m: 44.2 ≤ 50. |
| 18 Flood | ? | ? | — | No Edmonton FCL; grade ?. |

**Fails ranked by layout change:** (1) generator test noise: test one set at a time, and pull the row ≥ 3.2 m off the line; (2) E14715 refuge doors: two doors ≥ 0.93 m each (e.g. 1.0 m) or a third door; (3) E14715 second loading space if not drawn. All wait for the redraw at the tool's current MW.

## 6. CP E06B and HC E06B — Community pool and Heat cascade, 64 Airport Rd NW (BE)

Check 1 only before this. Same data-centre side and plant yard as EH E06B.

| # | CP | HC | Clause | Measurement or reason |
|---|---|---|---|---|
| 1 Use | flag | flag / ? | BE 3.12.1, 3.18 | Pool 1,001 · 995 m² > 500 m² → s. 3.18 variance (flag, decision Q4). Gym permitted. HC spa: no defined use ?; greenhouse Urban Agriculture permitted. |
| 2 Height, area | flag | flag | BE 4.1 | FAR 4,856 · 5,009 ÷ 4,284 = 1.13 · 1.17 ≤ 1.6. Height 12.0 + plant room ≈ 3.9 = **15.9 of 16.0 m**; plant-room height is a drawing choice; grade ?. |
| 3 Yards | ? | ? | BE Table 4.1 | Board: street 4.5 m. Not re-measured by anyone (the EH outline measured 4.46 m). |
| 4 Storey heights | n/a | n/a | — | — |
| 5 Loading | pass | pass | Table 7.2; BE 5.8 | 4,856 · 5,009 m² → 1; alley dock. |
| 6 Construction | pass | pass | 3.2.2.6, 3.2.2.77 | F-2 governs (our reading); 2 storeys. |
| 7 Separations | flag | flag | Table 3.1.3.1 | Pool (A-3) to F-2: 2 h drawn. Pool to gym: 1 h floor (A-2/A-3 1 h). Storey-2 gym (CP) / spa (HC) beside hall storey 2: a 2 h wall is not mentioned (?). HC greenhouse occupancy ? (F-2, F-3 or A-2) → rating ?. |
| 8 Two exits | pass | pass | 3.4.2.3 | Storey 1 public corridor → 9 m cap; storey 2 DC 55.6 ≥ 31.1 m. Lobby 5.8 m pair is a zone figure; by floor area it passes. |
| 9 Travel | pass | pass | 3.4.2.5 | 36.0 / 39.0 m · 35.9 / 39.0 m (board, not second-checked). |
| 10 Exit width | ? | ? | 3.1.17.1 | Pool, gym, spa: no Table 3.1.17.1 row; designed load not set. Hall as EH (pass). |
| 11 Corridors | pass | pass | 3.3.1.9 | 2.0 m; secure passage 22 m ends at an egress-only door. |
| 12 Lobby | pass (board) | pass (board) | 3.4.4.2 | S6 to the street, S5 to the alley; DC staff door own street door. |
| 13 Lift | ? | ? | NBC(AE) 3.8.2.3 | Public lift E1 to storey 2. **No DC lift in the room list** (the EH board had a freight elevator): hall storey 2 access ?. |
| 14 Washrooms | ? | ? | Table 3.7.2.2.-A | Pool load ? → WC count ?. |
| 15 Fire access, FDC | ? | ? | 3.2.5.5, 3.2.5.15.(3) | Kerb ?; FDC not in the table (lobby moved, so the EH 5.0 m figure may not hold). |
| 16 Generators | pass | pass | B139; C282 | Same yard as EH. Chlorine room 43 m from the nearest generator. |
| 17 Noise, edge | **fail** (test) / flag | **fail** (test) / flag | 14600 | Generators as EH E06B (3.0 m: 85.4 one, 91.4 four). Chillers over the gym / spa on storey 2: public block, so the edge flag applies. |
| 18 Flood | ? | ? | — | — |

**Fails ranked:** generator test noise only (as EH E06B). Flags: storey-2 hall access lift; 2 h wall storey-2 public room ↔ hall; pool and spa design loads (sets exits and WCs); greenhouse occupancy.

## 7. CP V339 and HC V339 — Community pool and Heat cascade, 339 1st Ave E (I-3), "with rezoning" — OUT OF DATE

| # | CP | HC | Clause | Measurement or reason |
|---|---|---|---|---|
| 1 Use | flag | flag | I-3 2.1 | Swimming Pool not listed → rezoning. Gym (Fitness Class 2), spa (Beauty and Wellness), greenhouse (Urban Farm B), data centre: conditional. |
| 2 Height, area | flag | flag | I-3 3.1 | FSR 3,023 · 3,219 ÷ 4,503 = 0.67 · 0.71; programs 1,177 · 1,373 ≤ 4,503. Height 17.97 m (as EH; official grades ?). |
| 3 Yards | pass | pass | I-3 3.1.2 | North wall at 15.15 m (check-2 fix carried). |
| 4 Storey heights | pass | pass | I-3 3.1.2.9 | 6.0 m storeys. |
| 5 Loading | **fail** | **fail** | s. 5.1, 5.2.3, 5.2.5 | Data centre 1,706 m² → 2. Pool + gym 1,177 m² → 0.42 → 1 (pool without spectators read as community centre class, our reading). HC: pool class 1, spa and greenhouse classes ?. **Needs ≥ 3, drawn 2.** |
| 6 Construction | pass | pass | 3.2.2.77 | 3 storeys, ≤ 6,000 m². |
| 7 Separations | flag | flag | Table 3.1.3.1; 3.2.2.7.(2) | Pool staff rooms (A-3) and pool plant at grade **under** hall storey 2: F-2 over A-3 needs a 2 h floor there (board names walls only). Gym / spa beside the hall on storey 2: 2 h wall ?. Greenhouse ?. |
| 8 Two exits | pass | pass | 3.4.2.3 | Storey 2–3 DC 31.7 ≥ 19.3 m; public corridors → 9 m cap. |
| 9 Travel | pass | pass | 3.4.2.5 | 34.4 / 30.9 / 31.0 · 34.4 / 35.1 / 31.0 m (board). |
| 10 Exit width | ? | ? | 3.1.17.1 | Pool, gym, spa loads ?. Hall 445 ÷ 4.6 = 97 → 776 mm stairs: pass. |
| 11 Corridors | pass | pass | 3.3.1.9 | 2.0–2.6 m. |
| 12 Lobby | pass (board) | pass (board) | 3.4.4.2 | S1 and S3 to the street. |
| 13 Lift, access | ? | ? | VBBL 3.8.2.3.(2)(g); 3.8.2.2 | E1 to the gym / spa landing; **no DC lift listed for storeys 2–3** (EH V339 had E2). Lobby door grade vs 5.0 m slab: not stated (EH lobby had a 0.7 m step). |
| 14 Washrooms | ? | ? | Table 3.7.2.2.-A | Pool load ?. |
| 15 Fire access, FDC | ? | ? | VBBL 3.2.5 | FDC not in the table; kerb ?. |
| 16 Generators | flag | flag | C282 6.2.1 | Pads 5.0 m (datum ?). Chlorine 16 m from the nearest generator. |
| 17 Noise, edge | pass / flag | pass / flag | 6555 s. 4.1(c) | Same generator yard as EH V339: ≥ 12.8 m, 72.8 / 78.8 ≤ 80. Chillers over the gym / spa (public block): edge flag. |
| 18 Flood | ? | ? | FCL | 5.0 m slab, datum ?. South doors open onto a 2.4–2.9 m side yard. |

**Fails ranked:** (1) loading: third bay (as EH V339); (2) none else. HC also leaves admin storage at 0 of 20 m² (not one of the 18 checks).

---

## All fails, ranked by how much they change the layout

| Rank | Plan | Check | Smallest fix on the board (Cowork) |
|---|---|---|---|
| 1 | V8238 | 4 storey height → 2 height | Ground storey to 6.1 m and label "needs discretionary height (I-2 3.1.2.5)"; otherwise lose one hall storey. |
| 2 | V1330 | 5 loading (3 needed, 1 drawn) | No small fix. Mark "doesn't fit here" for the Emergency hub, or a s. 5.1 relaxation. |
| 3 | V339 EH, CP, HC; V8238 | 5 loading per class | Third Class B bay on the shared aisle (V339 back half; V8238 local-street end), or a s. 5.1 shared-loading relaxation, shown as an approval. |
| 4 | V339 EH | 13 lobby 0.7 m step | Internal 1:12 ramp in the lobby (≈ 8.4 m run) or a stepped lobby floor. |
| 5 | V8238 | 5 approach + 3 yard | Move the generator row ≥ 1.1 m toward the building (clears the bay approach and the 0.1 m yard intrusion). |
| 6 | E06B (EH, CP, HC), E14715, E4103 | 17 generator test noise | "Test one set at a time" on the board, and generator row ≥ 3.2 m off the nearest lot line. |
| 7 | E14715 | 10 refuge door width | Two exterior doors ≥ 0.93 m, or a third door. |
| 8 | V8238 | 7 2 h floor extent | Board label: 2 h floor under all storey-2 F-2 over the hub. |

## What check 2 found, and what changed on re-check

- Check 2's geometry fixes (E06B fence, V339 north yard, V8238 Fraser St yard, V8238 DC exits, chiller totals, V1330 area) are recorded as done. I could not re-measure them.
- Still open from check 2: E06B street yard 4.46 m (not fixed); V8238 2 h floor wording (not fixed); V8238 storey-2 exits pass only by 3.4.2.3.(2).
- New here (check 2 did not test them): Vancouver loading per class; I-2 6.1 m ground storey on V8238 (both sub-areas); generator noise at lot lines; V339 lobby step as a fail; missing lifts in V1330, V8238 and the DC lift on the pool and cascade boards; E14715 refuge door width; the same loading-space-door exit on V1330 that check 2 fixed on V8238.

## What I could not check, and why

- **Geometry:** no board files on this computer (see weaknesses). Travel, exit spacing, door positions, yards, which rooms open onto the lobby: board or check-2 figures only.
- **Clause texts:** `data/raw/codes/` is not in this repo copy. 3.4.2.3.(2) wording, the scope of the 6 m dead-end rule (3.3.1.9.(5)) inside the secure line, whether Table 3.1.17.1 has a lobby row, and NBC(AE) 3.8.2.3's 2-storey exemption trigger (building area or storey area): register summaries only, or "?".
- **Kerb and boulevard widths, hydrants (15):** not in the files. Every principal-entrance-to-route distance is "?".
- **Official grades (Vancouver height), Edmonton grade (HRDEM), LiDAR vs GVRD datum (18):** not on file.
- **Generator sound:** KD1000 SL2 level not on file (78 dB(A) is the KD2000–2500 figure, maker claim); exhaust outlet positions not drawn; which E06B lot line is the 3.0 m one (side or alley) is not stated.
- **Loading class** of a health care office, a spa and an urban farm in the Parking By-law: not in the rows read (`vanParking5`).
- **Refuge classification:** the boards class the refuge A-2. If it sleeps people overnight (cot storage is drawn), it may be residential. Then 3.4.4.2.(2)(c) applies to its lobby, and NBC 3.1.3.2.(2) allows "Not more than one suite of residential occupancy" in an F-2 building (`arch_nbc3131`). Our reading; not settled in the files.
- **Pool, gym and spa occupant loads:** no table row; no designed load set. Checks 10 and 14 stay "?" on four boards.

## Verdict per plan

| Plan | Verdict |
|---|---|
| EH E06B | **Usable as the reference after listed fixes** (generator test rule and row offset; 2 h wrap at the vestibule; storey-2 accessible lift; 0.04 m street face; chiller room vs public edge decision). |
| EH V339 | **Not usable until redrawn** (out of date, J.B. 5 Nov). Build the third loading bay and the lobby ramp into the redraw. |
| EH V1330 | **Not usable as a passing reference.** Usable as the "doesn't fit here" case (loading), with the roof plant over 18.3 m. |
| EH V8238 | **Not usable until the height is settled** (6.1 m ground storey → 19.3 m). Then fix loading, generator row and the 2 h label. |
| EH E14715, E4103 | **Not usable: out of date** (17.5 / 7.6 MW; hall does not fit). Redraw at the tool's current MW, then fix noise, refuge doors, loading count. |
| CP E06B | **Usable after listed fixes** (generator test rule; DC lift; storey-2 2 h wall; designed pool load). |
| HC E06B | **Usable after listed fixes** (as CP E06B, plus greenhouse occupancy). Its broken placement rules (spa on storey 2, greenhouse on the pool roof) are J.B.'s call, not code fails. |
| CP V339, HC V339 | **Not usable until redrawn** (out of date). Add the third loading bay and the DC lift. |

Checked by: independent agent, 7 Nov 2026. Self-check only on my own arithmetic (re-run once). Not checked by a second agent.
