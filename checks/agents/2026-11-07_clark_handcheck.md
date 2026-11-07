# Hand check: 1425 Clark Dr (23060741, van 2_1, I-2), Architecture mode

Checked 7 Nov 2026 by an independent agent (did not write the code). Branch overnight-2026-10-30, repo clean before and after (no file edited). Tool run headless with `arch_run.js` (SPLIT=60/30) plus a probe copy in the scratchpad that dumps `BD.model()`, `groundItems`, `dcCapPct` and the plant packer at several sizes. Rules read from the saved primary PDFs: I-2 schedule (June 2026), ZDB s. 2 and s. 10, Parking By-law s. 5 (May 2026).

## Answer first

- Lot, yards, buildable area, envelope and the floor-area arithmetic agree with my own measurement.
- **The MW does not follow from the ground.** The tool tests 4.9 MW because the generator packer caps the set-up at 5.1 MW. That cap is a packing artefact, not a measured limit (item 3).
- The Ratios ground takes off a 463 m² drive that this lot does not need. A code bug causes it on every Vancouver lot (item 5).
- My loading count is 5 bays plus some set by the Director (?). The tool's is 4 (item 4).
- SPLIT=60/30 is not tested. The Ratios view caps the data centre at 19 %, so the run tests 19/30.

## Weaknesses of this check (read first)

- **Not checked against the standard:** CSA B139 (tank distances), CSA C282, NFPA 37, BC Hydro ES54 F and the Eaton pad size. I used the tool's register figures for these as given.
- **Not checked:** the per-MW room sizes (hall 290–630, UPS, Li-ion).
- **Missing source:** Schedule C (s. 10.7 landscape setbacks) is not in the sources. If Clark Dr or the other two streets are listed, there is a setback the tool does not apply (?).
- **Unmapped:** sub-area A of I-2 is not mapped. If the lot is in it, s. 3.1.2.4 asks for a 6.1 m first floor; the tool draws 6.0 m.
- **Unconfirmed names:** street names are not in the tool's street data. "Grant St" for the south street is our reading, from the address of the I-2 lot in the notch.
- **Thin margin:** generator rows on the 78.5 m rear line. Five sets with 1.5 m end clearance need 78.47 m.
- **Projection:** the tile metres read short. Areas are corrected (× 1.00804); distances are not (0.2–0.6 %). I used the same correction, so lot area is not an independent survey figure. The assessment record says 5,845 m².

## 1. Lot

| Item | Tool | Mine | Agree? | Note |
|---|---|---|---|---|
| Lot area | 5,882 m² | 5,834.6 m² in data metres × 1.00804 = 5,881.5 m² (shoelace; 0.1 m grid gives 5,881.6) | yes | Assessment record 5,845 m² (0.6 % less). FSR is on site area, so 3 × 37 = 111 m² of FSR is at stake. It does not bind here (envelope binds). |
| Shape | L-shape | L-shape: two I-2 lots (1471 Clark Dr, 1291 Grant St) take the SE notch | yes | |
| Street edges | S 44.0 m local, W 85.5 m local, E 60.5 m arterial (Clark Dr) | same (true lengths 44.08 / 86.03 / 60.87 m) | yes | No lane within 40 m in the City lanes data. |
| Front | S edge, 44.0 m | S edge: ZDB 10.26.1(b), corner site, "the shortest boundary abutting on a street" | yes | The Director may decide otherwise; the address is on Clark Dr. |
| Rear | N edge, 78.5 m, abuts 1345 Clark Dr (I-2) | same | yes | |
| Depth / width (frame) | 85.5 / 78.7 m | 85.5 m on the W side; rear line 78.5 m | yes | |
| Front yard | 0 | 0 (I-2: none) | yes | |
| Rear yard | 3.1 m | 3.1 m (3.1.2.3). No lane, so the 3.1.2.8 lane reduction does not apply. | yes | |
| Side / flank yards | 0 | 0. Every adjoining lot is I-2, so 3.1.2.2(c) "not required". Flanks take the side yard (I-2 outside sub-area B). | yes | |
| Notch edge (34.5 m, faces S onto 1471 Clark Dr) | "unclear", deepest applied: 3.1 m | Our reading: a side line, 0 m. It is neither front nor rear by the s. 2 definitions. (?) | no (?) | 108 m² of buildable area. |
| Buildable area | 5,528 m² | 5,528 m² with the band reading of the notch yard. 5,513 m² if the yard is measured as distance (rounds the reflex corner). 5,636 m² if the notch is a side line. | yes | |
| Height / storeys | 18.3 m, 3 storeys (6.0 + 6.0 + 6.0 = 18.0) | same (3.1.2.1). Sub-area A floor heights not applied (?). | yes | |

## 2. Ground (Ratios)

| Item | Tool | Mine | Agree? | Note |
|---|---|---|---|---|
| Footprint after plant yard (G0) | 5,038 m² | 5,528 − the strip between the skewed rear-yard line and the plant-yard line (5.91–6.49 m × 78.6 m ≈ 491 m²) = 5,037 m² | yes | |
| Yard units over it | −535 m² (5 generator clearance boxes, 16.49 × 6.49 m each) | 5 × 107.0 = 535 m² | arithmetic yes | The sets sit on open ground at the front, not in the plant yard (item 3). The empty plant yard is also already taken off. |
| Transformer pads | −100 m² (5 pads, 3 m from the building) | 7.595 MW / 2.5 MVA = 3.04, so 4 + 1 = 5. Row 5 × (2.631 + 1.0) = 18.16 m, × (2.492 + 3.0) = 99.7 m² | arithmetic yes | Pads are not placed or drawn, so whether they fit is not checked (?). Source values not checked (?). |
| Loading bays inside | −129 m² (3 bays) in Ratios; 169 m² (4 bays) in Arrange | 3 × 4.0 + 0.6 = 12.6 m; × 10.2 = 128.5 m² | arithmetic yes | The 0.6 m gaps are a drawing choice; the by-law minimum is 3 × 10.2 × 3.4 = 104 m². Ratios is not re-run after programs are picked (3 → 4 bays). |
| Drive to rear | −463 m² (6.1 × 75.9 m, "no other street reaches it") | 0. The W flanking street reaches the rear directly. | **no** | Bug (item 5). |
| Ground for the hall (G) | 3,811 m² (Ratios); 3,771 m² (Arrange) | 4,274 m² (Ratios), keeping the tool's own placement and dropping the drive | **no** | |
| Largest hall rectangle (hallRoom) | 2,151 m² | 47.79 × 78.54 = 3,754 data m² (behind the notch yard line, full width) | **no** | `inscribe` scaled search misses it. It caps the ground share at 25 %. Not binding today (item 6). |

## 3. Plant yard

| Item | Tool | Mine | Agree? | Note |
|---|---|---|---|---|
| Generator sets at 4.9 MW | 5 × 2 MW (4 + 1) | Q = 4.9 × 1.55 = 7.595 MW; ⌈7.595 / 2⌉ = 4, + 1 = 5 | yes | |
| Set size, clearances | 13.493 × 3.488 × 4.777 m; 1.5 m to walls; 2.0 m between | as the register says | not checked (?) | |
| Tank distance (B139 Table 2) | 5,992 L a set → 1.5 m to building, 3.0 m to property line | 7.595 × 1000 × 12 h × 0.263 L/kWh / 4 = 5,992 L | arithmetic yes | Table not read (?). |
| Plant-yard depth | 6.488 m (1 row of 5) | 1 row holds only **4**: (78.5 − 2 × 3.0 + 2.0) / 15.493 = 4.8. The row ends need 3.0 m to the W and E property lines (B139). 5 sets need 2 rows = 1.5 + 3.488 + 2.0 + 3.488 + 1.5 = **11.98 m**. | **no** | `rowDepth` uses the 1.5 m wall clearance at the row ends, not the 3.0 m property-line distance. |
| Sets in the plant yard | 0 of 5 | — | **no** | The strip is square to the frame. The rear lot line is skewed 0.58 m over 78.5 m. The packer allows 0.05 m, so every box corner past v ≈ −32.6 falls in the rear yard and the first row fails. |
| Where the sets go | All 5 on open ground at the SW front | all inside the lot, outside required yards; ≥ 6.99 m to the W line and ≥ 5.2 m to the S line; none under or over the hall or a program box (≥ 4.55 m to the refuge) | yes | Schedule C setback on the S or W street (?). |
| Size cap | fitMax 5.1 MW. At 5.2 MW (6 sets) only 3 place: "3 of 6 generators do not fit in the yard". | With a plant yard aligned to the rear line: the drawn 6.49 m holds 4 sets (≤ 3.8 MW); an 11.98 m yard holds 8 sets (7 + 1, Q ≤ 14 MW → **≤ 9.0 MW**, our arithmetic). | **no** | 5.1 MW only passes because the sets land on the front ground. Other rules at 9 MW not checked (?). |
| Cooling | 7 chillers (6 + 1), indoors, plant room 650 m² | 7.595 / 1.489 = 5.1 → 6 + 1; 7 × 13.941 × 6.662 = 650 m² | arithmetic yes | The 650 m² room is in neither the Ratios split nor Arrange (?). |

## 4. Loading bays (Parking By-law s. 5)

Rounding (s. 5.1, p. 5-1): "the nearest whole number above zero shall be taken … a fraction of one-half shall be rounded up". Our reading: round to the nearest whole number, halves up, at least 1. The tool rounds every fraction up (ceil). Register arch_up3_vanPkg5 summarises this as "fractions to the next whole number", which the text does not say.

| Item | Tool | Mine | Agree? | Note |
|---|---|---|---|---|
| Data centre, row 5.2.5 (Transportation and Storage) | 3 bays on 3,151 m² (1 + 1 + ⌈826 / 2,325⌉) | On 3,151 m²: 1 + 1 + round(0.355) = **2**. On the whole data centre, hall + UPS + battery 3,151 + support rooms 1,552 = 4,703 m²: 1 + 1 + round(1.02) = **3** (our reading: support rooms are part of the use). | no (count) | My count is 3 on 4,703 m², the same number as the tool but on a different floor area. Ceil on 4,703 m² would give 4. |
| Row 5.2.3 group | +1: refuge 265 + pool 1,065 + warming shelter 100 = 1,430 m²; 1 per 2,800 | +1. Community centre and "pool or similar place with spectator facilities" are both in 5.2.3 (raw text, p. 5-3). Warming shelter (Social Service Centre) is not listed, so the Director sets it (?). 1,330 / 2,800 = 0.475 → 1 ("above zero"). | yes | |
| Outpatient clinic 605 m² | not counted ("Director") | **+1**. Health Care Office is an Office Use (s. 2). Row 5.2.9 Class B: one space at 500–5,000 m². | **no** | |
| Spa, greenhouse, fish farm, EV hub | not counted (?) | not listed in s. 5.2; Director (?) | yes | |
| Total (Arrange) | 4 | **5 + ?** | **no** | +1 bay ≈ 41 m² of ground. |
| Class C (23.1 × 3.6 m, 14.0 m aisle) | named "if the City reads a storage warehouse"; not drawn | same reading; not deducted | yes | |
| Bay size | 10.2 × 3.4 m, 3.8 m clear | 5.5.1.2 same; 6.0 m ground storey clears 3.8 m | yes | |
| Dock position | Inside the ground storey, NW corner of the hall, opening N (rear) | Opens onto the 6.49 m plant-yard strip and the 3.1 m rear yard. A truck reaches it from the W street along that strip (6.49 ≥ 6.1 m, 5.4.1). | yes, by accident | This only works because the plant yard is empty. If the sets stood where the tool reserves them, no truck could reach the dock. The W face is only 3.94 m from the W line, too narrow for a 6.1 m aisle (our arithmetic). |

## 5. Drive and access

| Item | Tool | Mine | Agree? | Note |
|---|---|---|---|---|
| Lane | none | none abutting (City lanes data, 40 m search) | yes | 5.4.1: access from a street. |
| Truck entry | not drawn; Ratios assumes a drive from the front | From the W (local) street into the rear strip, our reading. Clark Dr (arterial) also abuts the rear corner. | **no** | |
| Drive ground | 6.1 × 75.9 = 463 m² | 0 extra. The aisle lies in the rear strip already taken off. | **no** | Cause: `groundItems` looks for `e.abuts==='street'`. `yardsOf` sets `abuts` only in the Edmonton branch, so it is null on every Vancouver edge. Every Vancouver lot is charged a drive even with a flanking street. |
| 5.5.3 setbacks for outdoor aisles | not applied | front yard 0, flank side yard 0, no R district or lane next door: 0 | yes | |

## 6. Floor area and MW (Ratios, SPLIT 60/30)

| Item | Tool | Mine | Agree? | Note |
|---|---|---|---|---|
| Allowed floor | 16,585 m² = min(5,882 × 3 = 17,646; 5,528 × 3) | same | yes | The envelope binds. "Footprint × storeys" is the tool's cap, not a by-law cap. |
| Data centre share | 19 % (asked 60 %) | floor(5.1 × 635.1 / 16,585 × 100) = floor(19.53) = 19 | arithmetic yes | 60/30 is never tested. |
| Data centre floor | 3,151 m² | 0.19 × 16,585 = 3,151.2 | yes | |
| MW range / tested | 4.96–10.74 / 4.9 | 3,151 / 635.1 = 4.96; / 293.4 = 10.74; tested floor(49.6) / 10 = 4.9 | yes | The share is floored to a whole % and then the MW to 0.1, so 0.2 MW is lost against fitMax 5.1. |
| Ground cap | 25 % (room 4,303 = hallRoom 2,151 × 2) | With a hallRoom of 3,754: room = min(7,507; (4,274 × 2 + 2,958 + 463) × 0.67 ≈ 8,019) ≈ 7,507 m² ≈ 45 % | **no** | Not binding today. |
| Programs | 30 %, 4,976 m² (≤ 1.00 FSR = 5,882 m², 3.1.1.1(b)) | same | yes | |
| Does the MW follow from the ground? | — | **No.** The 19 % comes from the 5.1 MW generator cap (item 3). Neither the yards nor the ground set it. | **no** | |

## Disagreements, ranked by effect on MW or layout

1. **Generator placement sets the MW cap (5.1 MW, tested 4.9).**
   - The rear plant yard is drawn square to the frame. The rear line is skewed 0.58 m, so no set fits in it.
   - Its depth (6.49 m) ignores the 3.0 m B139 distance at the row ends.
   - The sets fall back to open front ground; at 6 sets that fails too.
   - Our arithmetic for a rear yard aligned to the lot line: 6.49 m holds 4 sets (≤ 3.8 MW); 11.98 m holds 8 (≤ 9.0 MW). Either way, 5.1 MW is not a measured limit.
2. **Ghost drive, 463 m², on every Vancouver lot.** The flanking-street test reads `abuts`, which is never set outside Edmonton. Here the W street reaches the rear.
3. **The empty plant yard is the dock's only access.** The layout works only because the yard is empty. A correct plant yard (item 1) blocks the dock unless the dock moves.
4. **hallRoom 2,151 m² against 3,754 m² available.** It caps the ground share at 25 %. This would bind once item 1 is fixed: 25 % × 16,585 / 635.1 ≈ 6.5 MW.
5. **Loading count 4 against 5 + ?** The clinic is an Office Use (row 5.2.9). The tool's rounding is ceil; the by-law rounds to the nearest whole number (our reading). The tool counts only hall + UPS + battery as the data centre's floor, not its support rooms. About +41 m² of dock.
6. **Notch edge yard 3.1 m against 0 m (our reading, ?).** +108 m² buildable and +325 m² allowed floor. The tested MW would go 4.9 → 5.0.
7. **Lot area measured (5,882) against assessment record (5,845).** Not binding.

## Could not check, and why

- **Schedule C landscape setbacks (s. 10.7):** not in the sources.
- **Sub-area A:** the map is not in the tool or the sources.
- **Standards:** CSA B139 Table 2, CSA C282, NFPA 37 and BC Hydro ES54 F were not read. The register figures are used as given.
- **Transformers:** pad placement and fit are not drawn, so they cannot be measured.
- **Plant room:** where the 650 m² enclosed plant room goes, and whether it counts as floor area or height (4.1.2(c), s. 10.1.1).
- **Ground floor:** whether data-centre support rooms and the dock may sit on the ground floor under I-2 s. 2.2.7 ("except for entrances"). The tool's reading is that they may (?).
- **Other rules at a higher MW:** noise, fuel and transformers above 5.1 MW are not checked, so 9.0 MW is a generator-only bound.
- **Director decisions:** the loading count for the uses s. 5.2 does not list (spa, greenhouse, fish farm, EV hub, warming shelter).

Scratch files (course use only, not for sharing): the probe and its outputs are in the scratchpad `probe/` folder, and the run is in `run1/`.
