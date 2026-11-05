# Test fits: Emergency hub on four more lots (4 Nov 2026)

Brief: `checks/agents/TESTFIT_LOTS_BRIEF_2026-11-04.md`. Each city agent appends its own section.

## Edmonton: lots (3) LARGE and (4) CORNER (Edmonton agent, 4 Nov 2026)

### Redraw at the tool's new size (4 Nov 2026, after fe3b989)

Boards redrawn in place (same files, banner removed). Scripts: scratchpad `tf5/` (copy of `tf4/`, new `lotgeom.py`). Screens `tf5/s_E14715.png`, `tf5/s_E4103.png` (2×), checked by eye; 0 leader crossings.

- **Size:** the tool's Ratios low end with the plant room (Architecture default): **E14715 17.5 MW** (Ratios 17.5–38.0, DC 69 %), **E4103 7.6 MW** (7.6–16.5, 54 %). Both under the plant-included maximum (21.9, 9.0). Tool plant: 20 / 9 chillers, 15 / 7 × 2 MW generators (rehlkoKD2000), 12 / 6 transformers, racks 2,188–2,465 / 950–1,071.
- **Result: neither lot fits the hall.**

| | E14715 | E4103 |
|---|---|---|
| Hall needed (630 m²/MW, arch_dc_hall) | 11,025 m² | 4,788 m² |
| Hall drawn, 2 storeys | **7,150 m² (65 %)** | **2,865 m² (60 %)** |
| MW that drawn hall holds (our arithmetic) | about 11.3 | about 4.5 |
| Floor area · FAR (with plant room) | 10,001 m² · 0.99 (1.13) ≤ 1.6 | 4,973 m² · 0.89 (1.01) ≤ 1.6 |
| Worst travel along the path | 40.9 m (hall, both storeys) | 43.8 m (hall storey 2) |
| Code check | 33 pass, 24 to fix (1 fail: hall size) | 33 pass, 24 to fix (1 fail: hall size) |

- **Rule that stops it:** BE height 16.0 m allows 2 hall storeys at the tool's 6.0 m. The ground is shared with the 1-storey hub (refuge, clinic at grade) and a plant yard sized for the full MW. Floor area is not the limit (FAR 1.0–1.1 of 1.6).
- **Finding for the tool:** the Ratios split counts floor area only. It does not set aside ground for the hub or the generator yard. So its low end overstates what fits on both lots.
- **Kept from the first pass:** the hub (refuge 65 + shelter 30 on E14715, lobby shortened 1.4 m on E4103), plant at the rear, docks off the street, a separate DC staff entrance and a secure line inside the building.
- **New placement rules learned:**
  - Plant room on the hub roof, not over the hall (FM 5-32). On E14715, 20 chillers fit only with the long side across the hub (4 × 5, 1,350 m²; our drawing).
  - Hall storey 2 may sit over the dock, ETS and garbage (nothing wet *over* the hall, our reading).
  - Generators in one row at the rear, 3.0 m from lot lines (CSA B139). Transformers 6.0 m from the building (EPCOR).
- **E14715 exit court:** the hub's DC rooms (lockers) were 49.5 m from an exit once the hall moved behind the DC rooms. Fixed with an open court beside the secure corridor and stair S6. The court leaves by a 1.65 m covered passage. Whether a court counts as outdoors is **?**.
- **Noise** (tool method, plant room −25 dB): worst receiver 49.1 dBA (E14715, 14815 Yellowhead Trail NW, 48.4 m) and 48.9 dBA (E4103, 4143 97 Street NW, 33.4 m) ≤ 60. Own street lines reach 61.3 / 60.3 dBA (standard rating). They are not receiving lots (our reading).
- Six stairs (E14715) and two stairs (E4103), each 7.0 × 2.6 m (our arithmetic), plus a freight elevator. Storey 2 access by the freight elevator is **?**.
- Open for J.B.: should Ratios reserve ground for the hub and the yard? Hub on 2 storeys under the hall (needs > 16 m)?

### Superseded: first pass at 1.7 / 0.8 MW (before fe3b989)

Kept for the record. The sizes, plant counts, areas and noise below are out of date.

Brief: `checks/agents/TESTFIT_LOTS_BRIEF_2026-11-04.md`. Boards (scratchpad, not published): `whitemock/project/TestFit_EH_E14715.dc.html`, `TestFit_EH_E4103.dc.html` (canvas y 9400, x 3080 and 4620). Scripts: scratchpad `tf4/` (`find.js` lot search, `lotgeom.py`, `lotcontent.py`, `lotboard.py`, `noise4.py`). Screens: `tf4/s_E14715.png`, `tf4/s_E4103.png` (2×), checked by eye; 0 leader crossings (script).

Method as the 64 Airport Rd (E06B) pass 3 boards. The hub (clinic, lobby, refuge + shelter, DC rooms behind the lobby, DC staff entrance) is the E06B hub, mirrored to meet each street, with the changes named below. The data centre part is new. Labels: "our arithmetic", "our reading", "drawing choice"; **?** = no source. Lot outlines: Altalis (academic use only; noted on both boards).

### Lot choice

Searched every Edmonton lot with a record in a zone where the tool allows a data centre (`tool/data/zones.json` ZE), using the tool's own `lotside.js` and `site.js` frame (`tf4/find.js`, our arithmetic). Excluded E05, E06A, E06B, E123.

| | E14715: 14715 Yellowhead Trail NW (LARGE) | E4103: 4103 97 Street NW (CORNER) |
|---|---|---|
| Zone | BE | BE |
| Lot | 10,087 m² tool (city record 10,064 m²) | 5,592 m² tool (city record 5,582 m²) |
| Shape | rectangle 110 × 91.5 m | 86.5 × 65 m, corner cut |
| Streets (tool class) | one: Local, 91.5 m frontage | front 97 Street NW, Collector, 55.5 m; flank Local, 77 m |
| Yards (tool, per line) | street 4.5 m; sides and rear 0 m | front 4.5 m, flank 4.5 m; rear, side 0 m |
| Neighbours | BE | IM |
| Why | BE lot nearest 10,000 m² that is a plain rectangle with one street; size is the only variable | two streets of different classes, so the front-line rule is tested; mid size |
| MW tested (tool, plant included, low end) | 1.7 MW (range 1.78–3.85) | 0.8 MW (range 0.85–1.83) |
| Plant (tool) | 4 × 1,000 kW gensets; 3 chillers; racks 213–240 | 3 × 1,000 kW; 2 chillers; racks 100–113 |

- An IM large lot (10922 120 Street NW) was tried first. The tool says the warming shelter is not permitted in IM, and the refuge isn't either (Community Service is BE only, `arch_programs.json`; clinic in IM ?). That rule stops the typology on IM and IH, as `emergency_hub.md` says. Not drawn.
- The tool's Ratios default gave the data centre only 6–7 % of the allowed floor area on both lots (E06B: 35 %): the noise by-law with the roof plant, traced in `checks/agents/2026-11-04_dcshare.md` and fixed in fe3b989.

### What fits

| | E14715 | E4103 |
|---|---|---|
| Fits? | **yes**, one storey | **yes**, one storey |
| Building | 3,004 m²; FAR 0.30 ≤ 1.6 | 2,219 m²; FAR 0.40 ≤ 1.6 |
| Hall | 1,074 m² (630 m²/MW × 1.7 = 1,071) | 505 m² (630 × 0.8 = 504) |
| Data centre with support | 1,866 m² vs the tool split 1,130 m² (+65 %); support 42 % (in 13–52 %) | 1,216 m² vs 537 m² (+126 %); support **58 %**, above 13–52 % |
| Hub | clinic 484 m²; refuge + shelter 485 m²; lobby 140 m² | clinic 484 m²; refuge + shelter 368 m²; lobby 122 m² |
| Worst travel along the path | 42.2 m (DC lockers) ≤ 45 | 43.2 m (DC lockers) ≤ 45 |
| Code check | 34 pass, 21 to fix (all ?, no fail) | 34 pass, 22 to fix (all ?, no fail) |

### What was scaled, and why

- **E14715 refuge: 50 → 65 people (227.5 m²); shelter: 16 → 30 guests (105 m²).** A 5.1 m strip runs through the refuge main room, refuge corridor and shelter. 65 is the most people that keeps refuge + shelter ≤ 500 m² as one BE use: 485 m², and each use is smaller still if they count as two. So the BE cap passes on either reading.
  - WCs follow the table load: 304 + 142 = 446 → 223 a sex → 5 M + 9 F (Table 3.7.2.2.-A), up from 4 + 7. The men's room takes 1.25 m of the cot store (cot store 4.4 m², ?).
- **Clinic: not scaled (13 exam rooms).** A 14th room adds 17.3 m² (tool step), so 501 m² > the BE 500 m² cap.
- **E4103: nothing scaled.** No rule or demand figure asks for more or less. The straight front is 53.7 m against the 55.0 m hub row, so the lobby (size ?) was shortened 1.4 m rather than cutting refuge capacity.
- **Hall on one storey on both lots** (drawing choice; the tool draws 2). Both lots have the room. So there are no stairs, lifts or shafts, and the chillers sit on the hub roof.

### What failed first, and the rule

- **E14715 travel distance 48.2 > 45 m** (NBC 3.4.2.5.(1)). The longer hub pushed the secure corridor's end exit away from the DC rooms behind the lobby. Fixed by moving the secure-corridor-to-hall door and the hall's side exit (42.2 m). Rule: growing the hub row lengthens the DC staff rooms' path.
- **E4103 noise.** With the chillers on the clinic roof, 5 m from the interior side lot line, it was still 62.1 dBA (standard rating) > 60 even with the plant room (Bylaw 14600 s. 22(1), tool method). Moved over the refuge, 40.8 m from that line: 40.6 / 38.9 dBA. Rule: on a lot with a 0 m side yard, keep the roof plant off the side-lot-line end.
- **E4103 generators 3.0 m from the side lot line** (CSA B139 ≥ 3.0 m) failed by rounding at first; moved 0.1 m.
- **E14715 refuge exit width (?)**. A load of 304 needs 1.85 m at 6.1 mm a person; the 2 exterior doors must each be ≥ 0.93 m. Door widths are not drawn.

### Placement rules: held or broke

| Rule | E14715 | E4103 |
|---|---|---|
| Public front on the street edge | held | held on the front. The 55 m row does not fit the 53.7 m straight front; the refuge end and the shelter door turn onto the flank street |
| Hub row needs ≥ 55 m of straight frontage | held (91.5 m) | **broke by 1.3 m**: lobby shortened (size ?) |
| Plant at the rear | held (rear yard behind the hall, 100 m from the street) | held, but the rear yard is open to the flank street: screening ? (BE 5.2) |
| Loading not between building and street (BE 5.8) | held: dock on the side drive, 35 m behind the street face | held: dock faces the rear yard |
| Chillers on the hub roof, not over the hall (FM 5-32) | held | held, but only once moved off the side-lot-line end (noise) |
| DC staff entrance of its own | held: off the side drive | held: on the flank side |
| Cores at the ends | n/a: one storey, no cores | n/a |
| Transparent street faces (BE 5.3) | held | ?: the flank street sees 23 m of blank data-centre wall |
| Loading count | 3,004 m² → 1 space | 2,219 m² < 2,500 → none required; 1 drawn (drawing choice) |
| Support share 13–52 % | held (42 %) | **broke** (58 %): support rooms do not shrink with MW |

### Noise (tool method, test-fit positions, our arithmetic)

Lp = Lw − 20 log r − 8; Lw 102.8 / 106.1 dBA a unit (vertivAFC); night limit governs; rooftop plant room −25 dB (NSW 2021 s. 4.3).

| | E14715 (3 chillers, hub roof 6.0 m) | E4103 (2 chillers, over the refuge) |
|---|---|---|
| No mitigation | 62.6 dBA at 14815 Yellowhead Trail NW (BE), 70.7 m, limit 60 | 65.6 dBA at 4143 97 Street NW (IM), 40.8 m, limit 60 |
| With plant room | 37.6 (quieter) / 37.5 (standard) ≤ limits | 40.6 / 38.9 ≤ limits |
| Own lot lines, with plant room | up to 53.9 dBA (street line, 15.8 m) | up to 52.2 dBA (front, 15.6 m) |
| Nearest residential | 12460 141 Street NW (RS), 613 m: 35.8–39.1 ≤ 50 | 4012 89 Street NW (RS), 911 m: 30.6–33.9 ≤ 50 |
| Flag | a building with no parcel record reads as residential (?) | same |

Not modelled: generators and the programs mechanical room (no sound power on file ?).

### Other figures (our arithmetic, measured on the drawings)

- E14715: generators 4.3 m from the building, 15.8 m from a lot line; transformers 10.3 m from the building (EPCOR ≥ 6.0); fuel truck 6.1 m from the generators, 6.8 m from the transformers; dock door 14.4 m from the hub roof intakes (≥ 7.6).
- E4103: generators 22.9 m from the building, 3.1 m from the side lot line; transformers 29.8 m; fuel truck 6.0 m from the generators, 9.1 m from the transformers; dock 21.8 m from the intakes.
- Grade ? (no Edmonton grade tiles; NRCan HRDEM not reached). Flood ? (the tool holds a flood construction level for Vancouver only).
- Fuel 12 h: E14715 7,510–8,320 L; E4103 3,530–3,910 L (claims, 0.263 L/kWh). Battery rooms are drawn at 3.5 m² a cabinet, the V339 room scaled (our arithmetic).

### Open questions for J.B.

- One-storey hall on lots with room: keep, or follow the tool's two storeys?
- Large lot: refuge 65 and shelter 30 filled to the BE cap. Is "fill to the cap" the scaling rule you want, or a demand figure?
- Corner: shorten the lobby or the refuge when the frontage is short? Screen the rear plant yard from the flank street?
- Why does the tool's Ratios default give the data centre only 6–7 % on these lots?

Check 2 done (`testfit_check2.md`); its fixes are above.

## Vancouver: lots (1) SMALL and (2) NARROW (Vancouver agent, 4 Nov 2026)

Boards (scratchpad, not published): `whitemock/project/TestFit_EH_V1330.dc.html`, `TestFit_EH_V8238.dc.html` (canvas y 9400, x 0 and 1540). Scripts: scratchpad `tfl/` (`cands.py` lot search, `extract.js` tool run, `geomL.py`, `pathsL.py`, `boardL.py`, `contentL.py`, `buildL.py`, `noise_extract.js`, `noiseL.py`, `go.sh`). Screens: `tfl/b_V1330.png`, `tfl/b_V8238.png` (2×), checked by eye per storey; 0 leader crossings (script).

Method as the E06B / V339 boards (pass 3): every room its own numbered block, group tints, right-angled leaders off the drawing, secure line inside the building, separate DC staff entrance (vestibule, guard point, portal), plant in 1.9 m enclosures, connected corridors, travel along the path (0.25 m grid), two exits, column grid and ducts (drawing choices), noise re-run with the tool's method (receivers read from the tool), grade from City LiDAR 2022 (datum ?). Labels: "our arithmetic", "our reading", "drawing choice"; **?** = no source.

### Why these lots

Searched all 694 tool parcels in Vancouver data-centre zones (I-2, I-3, FC-2, I-1C; tool tiles, decodeRing); excluded V339, V09, CLARK, HAST.

| | V1330: 1330 Glen Dr (I-2) | V8238: 8238 Fraser St (I-2) |
|---|---|---|
| Pick | SMALL: smallest single-street rectangle in a data-centre zone (1,041 m²) | NARROW: deepest rectangle-like lot with frontage ≤ 25 m (15.5 m on Fraser St, 99.5 m deep, ratio 5:1) |
| Lot (tool measure · record) | 1,041 · 1,028 m², 25.5 × 40.7 m | 1,738 · 1,727 m², 15.5 m (Fraser St) to 19.5 m (local street) × 99.5 m |
| Edges (tool lot lines) | one street (west), no lane; front 0, sides 0, rear 3.1 m | through lot: Fraser St (arterial) and a local street; front not settled (s. 10.26.1, double fronting): 3.1 m kept at both ends; sides 0 |
| Corner | no | no (two streets at opposite ends) |
| Grade (LiDAR) · FCL | 4.2–4.7 m · 4.6 m (whole lot in the floodplain) | 2.5–6.2 m (falls to the east) · 4.6 m (87 % in the floodplain) |
| MW tested (plant-included, low end) | 0.4 (range 0.50–1.08) | 1.4 (range 1.46–3.16) |
| Plant (tool counts) | 2 × 1,000 kW gens, 2 chillers, 2 transformer pads | 4 × 1,000 kW gens, 3 chillers, 2 pads |

Also run in the tool and not picked: 1245 Glen Dr, 1200 Raymur Ave, 1390 4th Ave E (corner lots), 8750 Heather St, 8280 Manitoba St (narrow, but 0.4 MW), 2799 Renfrew St, 520 Industrial Ave (I-3: 7.6 m side yards on a 22.8 m lot; tool finds no data-centre split).

### What fit (short)

- **V1330 fits, scaled, with one fail.** Storey 1 (6.1 m): refuge, shelter, lobby on Glen Dr, DC entrance, loading at the rear; storey 2 (4.5 m): clinic only; storey 3 (6.0 m): data centre only, hall 252 m² in one storey. 35 pass, 18 ?, **1 fail: loading** (2 Class B spaces needed, 1 fits).
- **V8238 fits, scaled, no fail.** Storey 1 (5.0 m): refuge, shelter, lobby on Fraser St; 5-exam clinic; DC ground rooms and 2 loading spaces at the back. Storeys 2–3 (6.0 m): hall 2 × 529 m² in the east block, DC support in the west of storey 2; chillers in a plant room on the storey-2 roof. Plant yard at the local-street end. 33 pass, 21 ? (after check 2).

### What was scaled and why

| | V1330 | V8238 |
|---|---|---|
| Refuge | 50 → **31 people** (109.9 m² drawn): the 6.1 m truck drive takes the north side, leaving a 19.4 m front shared with 2 stairs and the lobby | 50 → **41 people** (145.6 m²): the exit passage takes 1.13 m of the 15.5 m front |
| Warming shelter | 16 → **6 guests** (21.1 m²) | 16 guests kept (56.0 m²) |
| Clinic | 13 → **12 exam rooms** (512 m², storey 2) | 13 → **5 exam rooms** (335 m², storey 1): the hall needs storeys 2–3 and the lot is 15.5–19.5 m wide |
| WCs (Table 3.7.2.2.-A, table load) | load 147 + 29 = 176 → 2 M + 4 F | load 196 + 75 = 271 → 3 M + 6 F |
| Clinic WCs (Table 3.7.2.2.-B) | load 56 → 4 | load 36 → 2 |
| DC support below the benchmarks | shipping 13.6 of 45 m²; storage/staging and garbage room not drawn (no room) | shipping 29.4 of 45 m² |

Steps: refuge 3.5 m² a person, shelter 3.5 m² a guest, clinic 17.3 m² an exam room (tool arch_programs.json). None has a sourced minimum (?), so each was scaled to what the plan holds.

### What failed and the rule

- **V1330 loading (fail):** Parking By-law s. 5 (vanParking5): 2 Class B spaces for ≈790 m² of data centre (466–2,325 m²). With no lane, the 6.1 m aisle has to run on the lot; it takes 24 % of the 25.5 m frontage and leaves room for 1 bay.
- V1330 roof plant: the noise screen (4.9 m) reaches 21.8 m over the base surface, above 18.3 m (s. 10.1.1, Director ?).
- V8238 height: east block 18.21 m ≤ 18.3 m with a 5.0 m ground storey. If the lot is in I-2 sub-area A (6.1 m ground minimum, s. 3.1.2.4; map not checked ?), the roof goes to 19.3 m: fail.
- V8238 exits: no side yards, so the only exterior walls are the two ends. The clinic's second exit and both DC stairs use one 2 h exit passage (1.13 m) along the whole lot, with a door at each end. Reading of 3.4.2.3.(4) (stair discharges counted at the passage doors) **?**.
- V8238 flood + slope: slab 4.6 m (FCL); the yard is 2.5–3.4 m, so pads, bays and the passage door sit 1.2–2.1 m above grade (fill or ramps ?).
- V8238 storey 2 exits 25 m apart < ½ diagonal 33.8 m: passes only by 3.4.2.3.(2) (the hall's 2 h separation splits the storey) (our reading).

### Placement rules: held or broke

| Rule | V1330 | V8238 |
|---|---|---|
| Public front on the street edge | held, but only 19.4 m of 25.5 m (drive) | held on Fraser St; 1.1 m lost to the exit passage |
| Plant at the rear | held; reached only by a 6.1 m drive along a side lot line | held; the second street makes it easy (service from the local street) |
| Cores at the ends | broke: 4 stairs (2 public for the clinic, 2 DC) on a 23.6 × 25.5 m floor; public and DC zones stacked so no storey mixes them | broke: no stair can discharge mid-lot (0 m side yards), so stairs discharge into an exit passage |
| Hall not at grade (I-2 s. 2.2.7) | held: hall on top | held: storeys 2–3 |
| Nothing wet over the hall (FM 5-32) | held: hall on the top storey; chillers over the support half | held: chillers on the storey-2 roof over the support rooms |
| Stacked vs beside | stacked by zone: public / clinic / data centre, one per storey | beside, stretched: public at the front, hall over the clinic and DC rooms behind |
| Two exits ½ diagonal | eased by 3.4.2.3.(1)(a): 9 m is enough where a public corridor serves the floor area | same; storey 2 needs 3.4.2.3.(2) |

New rule candidates for the automatic fit:
- On a lot with no lane, reserve a 6.1 m aisle from the street to the yard before sizing the front (V1330).
- On a 0 m side-yard lot deeper than about 45 m of travel, add an exit passage end to end, or the rear programs get no second exit (V8238).
- Floodplain lots: add slab height (≥ FCL) to the height check before choosing storey heights (V1330 +0.4 m, V8238 +1.2 m at the low end).
- I-2: check the health care office cap (greater of 235 m² or 33.3 % of floor area) and the 1.00 FSR non-industrial cap; both passed here (clinic 512 ≤ 552 m²; 335 ≤ 907 m²).

### Exits, travel, noise (our arithmetic)

| | V1330 | V8238 |
|---|---|---|
| Connected | 63 rooms, 3 storeys: all | 58 rooms, 3 storeys: all |
| Worst travel | L1 22.1 · L2 23.4 · L3 29.0 m | L1 42.5 (clinic, to the passage) · L2 44.3 (MMR 1 to S1) · L3 24.0 m |
| Noise, no mitigation | 75.7–79.0 dBA at 1268 Glen Dr, 12.8 m (limit 65) | 81.7–85.0 dBA at 8240 Fraser St, 7.8 m (limit 65) |
| First option that passes (tool order) | low-noise chillers + screen: 64.7 dBA (0.3 dB margin; maker claim) | rooftop plant room (−25 dB): 56.7–60.0 dBA |
| Nearest residential | 1328 Grant St (RM-4), 369 m: 35.4 ≤ 55 | 759 Marine Dr SE (R1-1), 147 m: 31.3–34.6 ≤ 55 |

### Check 2 fixes (4 Nov 2026, testfit_check2.md)

Patch at the end of `tfl/geomL.py`; rows in `tfl/buildL.py`. Re-run `tfl/go.sh`. Pre-fix copies: `tfl/*_pre_chk2.*` (scratchpad).

- **V8238 Fraser St yard:** street face pulled back 0.19 m (u −46.66 → −46.47) on all storeys. The building is now inside the slanted 3.1 m yard line.
  - Refuge 145.6 m² (41 people kept). Shelter 56.0 m²: its south wall moves 0.04 m, so lobby, universal WC, mechanical room and cot store each lose 0.04 m.
  - FSR 2,719 m², 1.57; clinic cap 905 m²; building area 1,073 m².
- **V8238 storey-1 data-centre exits:** the loading-space truck doors no longer count as exits. Those openings are removed; the service arrows still mark truck entry.
  - New DC exit corridor (1.2 m, drawing choice) runs from the secure corridor past the MV room to an exterior exit door at the north end of the east wall, onto the drive. Shipping 35.3 → 29.4 m² and MV 14.7 → 10.8 m² (size ?).
  - S2's door moved to the west end of the stair. Exits: S2 and the new door, **12.7 m apart ≥ 10.6 m** (½ zone diagonal; ≥ 9 m on the floor-area reading). Loading space 2 now opens into loading space 1.
  - Worst DC travel on storey 1: 26.9 m (valve room; check-2 parser).
  - To clear the door, the transformer fence now stops 0.7 m north of the pads (was 1.5 m). Side clearance not checked against BC Hydro ES54 F: **?** (new to-fix row).
- **V8238 clinic second exit:** wording corrected. The second exit goes through the public corridor and shared lobby to the lobby street door.
  - 3.4.4.2.(1) limits exits from floor areas above or below the first storey. The clinic is on the first storey, so the lobby route is access to exit. No storey-2 exit uses the lobby.
  - Only the public corridor and shelter open onto the lobby, so (2)(c) is met if applied (our reading). Route not changed.
- **V1330 building area:** 457 → **601 m²**, the largest footprint (storeys 2–3 overhang the truck drive). No limit affected.
- **Plant group, both boards:** now includes the roof chillers, as the caption says. V1330 87 → **144 m²**; V8238 129 → **215 m²**.
- Counts: V1330 35 pass, 19 to fix (incl. 1 fail), unchanged. V8238 33 pass, 21 to fix (was 34 / 20; + transformer side clearance ?).
- Not changed (beyond the brief): the V8238 "2 h floor over the refuge and shelter" wording. Check 2 says the whole floor over the hub needs 2 h.
- Screens checked by eye: `tfl/b_V1330.png`, `tfl/b_V8238.png`. 0 leader crossings (script).

### Open questions for J.B.

- V1330: accept 1 loading space (relaxation), or give up refuge frontage for a second bay?
- V1330: DC staff walk the truck drive (no walkway). Accept?
- V1330: plant room (50.7–54.0 dBA) instead of the 0.3 dB screen margin? Both go over 18.3 m.
- V8238: is the lot in I-2 sub-area A (6.1 m ground storey)? If so, the 3-storey scheme fails height.
- V8238: accept one exit passage serving the clinic and both DC stairs?
- Both: design to the refuge table load or a posted lower load (fewer WCs, bigger refuge)?

Check 2 done (`testfit_check2.md`); its fixes are above.
