# Register pass B, 4 Nov 2026: climbing, ASHRAE pool and snow melt, CSA Z8000

Brief: `BRIEF_uploads_4nov_b.md`. Sources: `uploads_4nov_b_sources.json`. Check 2: `checkV2_result_uploads_4nov_b.json`. Patch: `register/patches/uploads_4nov_b_2026_11_04.py`. Uploads and screenshots not committed.

## Climbing walls (EN 12572, European benchmark, outside Canada)

| what | value | source id | where | kind |
|---|---|---|---|---|
| Boulder wall, max height | 4.5 m; 4.0 m if you can stand on top | arch_up4_en12572_2 | 4.1, p. 5 | standard |
| Boulder wall height measured | highest hold to top of impact area | arch_up4_en12572_2 | 3.6 | standard |
| Impact area in front (L1) | ≥ 2.0 m (wall ≤ 3 m); ≥ 2.5 m (wall > 3 m) | arch_up4_en12572_2 | 4.3.1, Table 2, p. 6 | standard |
| Impact area at sides (L2) | ≤ 10°, no side holds: 50 % of height (≤ 3 m) or 1.5 m (> 3 m); > 10°: 50 % of height | arch_up4_en12572_2 | Table 2, p. 6 | standard |
| Lead wall, first protection point | ≤ 3.10 m | arch_up4_en12572_1 | 4.1, p. 6 | standard |
| Lead wall, falling space | 2 m behind, 1.5 m each side, 8 m below protection points | arch_up4_en12572_1 | 4.7, p. 11 | standard |
| Room clear height, lead wall height | not given: ? | arch_up4_en12572_1, _2 | — | — |
| Part 3 (holds) | same text as the 3 Nov upload | arch_up2_en12572_3 | — | standard |

## BSI drafts, July 2025 (DRAFT, not in force)

| what | value | source id | where | kind |
|---|---|---|---|---|
| DPC 25/30498654 DC | prEN 12572-1:2025, will supersede EN 12572-1:2017; heights, spacing, falling space unchanged | arch_up4_prEN12572_1 | foreword p. 3; 4.1; 4.7 | draft |
| DPC 25/30504608 DC | prEN 12572-2:2025, will supersede EN 12572-2:2017; 4.5 / 4.0 m and L1 unchanged | arch_up4_prEN12572_2 | foreword p. 3; 4.1; Table 2 p. 7 | draft |
| Change that matters | side L2 values swapped in Table 2 (1.5 m for walls ≤ 3 m, 50 % above); volumes count in L1; continuous impact flooring up to 500 mm | arch_up4_prEN12572_2 | Table 2, Fig. 1 | draft |

## Snow melt (ASHRAE 2023 ch. 52, US cities only; replaces 2015 ch. 51)

| what | value | source id | where | kind |
|---|---|---|---|---|
| Canadian cities | none (46 US cities) | arch_up4_ashraeCh52 | Table 1 | design guide |
| Surface flux, 99 % of snowfall hours, Ar = 1 / 0.5 / 0 | Fairbanks 639 / 342 / 152; Great Falls 869 / 453 / 238; Minneapolis 801 / 485 / 355; Seattle 647 / 420 / 386 W/m² | arch_up4_ashraeCh52 | Table 1, pp. 52.3–52.4 | design guide |
| Application guidance | public building sidewalk Ar 1.0 at 95 %; commercial 1.0 at 90–95 % | arch_up4_ashraeCh52 | Table 4, p. 52.8 | design guide |
| Back and edge losses | 4–50 %; back ≈ 20 % steady state; 1–3 % with 50 mm insulation; edge 15–35 % | arch_up4_ashraeCh52 | pp. 52.8–52.9 | design guide |
| Supply temperature | entering fluid ≤ 66 °C (concrete); usually < 65 °C or per CSA A23; PE ≈ 60 °C | arch_up4_ashraeCh52 | pp. 52.2, 52.11 | design guide |
| Pipe output at 55 °C mean fluid | 440 / 555 / 665 W/m² at 300 / 230 / 150 mm | arch_up4_ashraeCh52 | Table 7, p. 52.11 | design guide |
| Slab | 20 mm pipe at 230 mm; 50 mm cover; 130 mm slab | arch_up4_ashraeCh52 | p. 52.11 | design guide |
| District heat | may run off district return piping | arch_up4_ashraeCh52 | pp. 52.12–52.13 | design guide |

## Indoor pools (ASHRAE 2023 ch. 6, US benchmark)

| what | value | source id | where | kind |
|---|---|---|---|---|
| Air / water, recreational | 24–29 / 24–29 °C, RH 50–60 % | arch_up4_ashraeCh6Pools | Table 2, p. 6.6 | design guide |
| Air / water, competition; therapeutic; spa | 26–29 / 24–28; 27–29 / 29–35; 27–29 / 36–40 °C | arch_up4_ashraeCh6Pools | Table 2, p. 6.6 | design guide |
| Air vs water | 1–2 K above water, max 30 °C | arch_up4_ashraeCh6Pools | pp. 6.1, 6.5 | design guide |
| Pressure, air changes | −15 to −40 Pa; 4–6 ACH pool, 6–8 spectators | arch_up4_ashraeCh6Pools | p. 6.6 | design guide |
| Heating load per m² water, hall height or volume | not given: ? | arch_up4_ashraeCh6Pools | — | — |

## CSA Z8000:24 (screenshots, UBC licence)

| what | value | source id | where | kind |
|---|---|---|---|---|
| Ceiling height | min 2.4 m; mental-health bedrooms and secure rooms 2.75 m; specialised per Table 9.3 (not sent: ?) | arch_up4_csaZ8000_12 | 12.2.2.1, p. 573 | standard |
| Overhead clearance | 2.2 m on bed and stretcher paths; 2 m elsewhere | arch_up4_csaZ8000_12 | 12.2.2.2, p. 573 | standard |
| Door height | min 2100 mm | arch_up4_csaZ8000_12 | 12.2.3.9, p. 574 | standard |
| Floor-to-floor | not in 12.3: ? | arch_up4_csaZ8000_12 | pp. 596–599 | standard |
| Mechanical room floor | ≥ 130 mm concrete; pads ≥ 100 mm | arch_up4_csaZ8000_12 | 12.3.4.6, 12.3.4.5 | standard |
| Clinic rooms, net m² | physio/OT 14.0 and 23.0; multi-purpose min 11.2 (1.5–2.0 per person); chiropody 13.0; telehealth 13.0; dental operatory 11.2 | arch_up4_csaZ8000_9 | Table 9.2, pp. 317–323 | standard |
| Exam rooms | per Table 13.1 item 12 (not sent: ?) | arch_up4_csaZ8000_9 | Table 9.2 items 1–3 | standard |
| Adult day program | at street level when possible | arch_up4_csaZ8000_9 | 9.2.4.2.3, p. 315 | standard |

## Tool changes (`tool/arch_programs.json`)

- clinic: `size.clear_height_m` 2.4 (clear height, not floor-to-floor); three flags (Table 9.2 rooms, doors and clearances, adult day).
- gym: `size.climbing` (boulder 4.5 / 4.0 m, impact area 2.0 / 2.5 m, lead falling space); room clear height `null` (?).
- pool, therapy_pool, spa: `heat.design_C` from ASHRAE Table 2. `setpoint_C` and `floor_height_m` unchanged.

## Checks and tests

- Check 2 (scripted re-find, same agent; no independent agent here): 97 of 101 found; 4 were extraction artefacts, found by eye. No WRONG.
- Rebuild done. `register_wiring.js` passes. Golden 8 lots match exactly.

## For J.B.

- `covered_plaza` still shows 630–950 W/m² from the 2015 edition. That sentence is gone in 2023. Replace it with Table 7 (440–665 W/m² at 55 °C) plus back loss? Not changed here.
- Exam-room size still from AB GFNA (12.0 m²). Z8000 Table 13.1 would settle it: screenshot needed.
- Both ASHRAE PDFs carry a third party's single-user licence stamp. Keep them out of anything shared.
