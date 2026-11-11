# Scope: floor test vs rack layout on 339 1st Ave E, 11 Nov 2026 (no change made)

Probe: checks/tests/floor_rack_probe.js (339 1st Ave E, golden answers, read-only; tool as on site-f1 at 042cbe7).

## Weaknesses first
- **The "Hall holds 3.6–4.0 MW" line is misleading.** The rack layout counts racks on the building of the 2.5 MW set-up. A 3.6–4.0 MW set-up needs more generators, a deeper yard and so a smaller building. On that building the same layout places far fewer racks (table below). The line went into your report; it should not stand as a capacity.
- **What sets 2.5 MW, more exactly:** the generator yard, through the floor. At 2.6 MW a fourth set is needed, the yard goes to 23 m and the building footprint drops from 842 to 672 m². The tool stops it with the 21.7 m cap. With the cap lifted, the floor test stops it, but only because the building shrank. On the 2.5 MW building the floor test would allow up to 2.64 MW.
- **Why the footprint drops 170 m² for a 1.3 m deeper yard:** not checked. The yard arrangement changes from 3 to 4 sets (?).
- **Built-hall figures are trust 40** (from the (d) note: derived, operator claims, floor may include support rooms).
- **The layout's row-break rule is coarse.** Any spacing from 3.4 m² per rack up gives the same count (runs of 2 racks, then 3 gaps). A finer rule is needed if the layout takes a built-hall spacing.

## Why they disagree
Two reasons, the first larger.

| | Floor test (site.js roomWhy) | Rack layout (scene3d layoutCheck) |
|---|---|---|
| Building tested | the building at the size tested (yard and footprint change with size) | always the building of the current size (2.5 MW), whatever size it reports |
| Floor per MW | 637 m² (hall 630 + UPS 3.3 + battery 3.8: the conservative end of dc_rooms.json, J.B. 7 Nov) | rows at Schneider WP 46 2.32 m² per rack, plus corridors, thermal-wall gallery and UPS room as drawn |
| Floor per rack (our arithmetic) | 4.5–5.1 m² (637 × 7.1–8 kW) | 3.4 m² gross (1,683 m² ÷ 500 racks) |
| Against built halls, 2.9–7.4 m² per rack ((d) note) | middle of the range | low end |

The 2.3 m² per rack you quote is the rows only. Across the whole hall floors the layout gives 3.4 m².

## 339 at each size (2 storeys above a ground floor kept from data storage)
| Size | Generator yard | Footprint | Upper floors | Floor test holds (637 / 295 m² per MW) | Racks needed (8 / 7.1 kW) | Layout, 2.32 m² spacing | Layout, 2.9 m² spacing |
|---|---|---|---|---|---|---|---|
| 2.5 MW | within 21.7 m | 842 m² | 1,683 m² | 2.64 / 5.72 MW | 313–353 | 500 (3.55–4.0 MW) | 390 (2.8–3.1 MW) |
| 2.6–3.5 MW | 23 m | 672 m² | 1,343 m² | 2.11 / 4.56 MW | 325–493 | 380 (2.7–3.0 MW) | 320 (2.3–2.6 MW) |
| 4.0 MW | 28 m | 501 m² | 1,003 m² | 1.57 / 3.40 MW | 500–564 | 270 (1.9–2.2 MW) | 210 (1.5–1.7 MW) |

(Racks needed: size ÷ kW per rack. Layout racks from the tool's own check, run on each size's building. Our arithmetic.)

- **The layout on each size's own building:** at 2.32 m² it fits 2.6 MW (380 racks ≥ 367) and fails at 3.0 MW (380 < 423). At 2.9 m² it fits 2.5 MW and fails at 2.6.
- **4.0 MW never fits:** its building holds 270 racks at the tool's densest spacing, against 500–564 needed.
- **So the two tests nearly agree once both use the right building:** 2.5 MW (floor test, conservative) and 2.5–2.6 MW (layout).

## Which to trust
- **The floor test**, for sizing. Its figure comes from four built Canadian halls (register arch_dc_hall). It sits in the middle of the built-hall range and is the conservative end you chose on 7 Nov.
- **The rack layout is a drawing, not a capacity.** Its 2.32 m² is a white-paper figure below every built hall we hold. It also ran on the wrong building.

## One method for both (proposal)
1. **One figure:** hall m² per MW from dc_rooms.json, the conservative end (637 incl. UPS and battery) for "fits". Per rack that's 4.5–5.1 m², inside the built range.
2. **One building:** both tests run on the building at the size being tested (yard, footprint, storeys as that size leaves them).
3. **The floor test decides.** The layout draws the racks that size needs, with its rows thinned to the same figure, instead of Schneider's 2.32. It flags only when the geometry can't place them, e.g. a hall too narrow for a row.
4. **Engineering card:** drop "Hall holds 3.6–4.0 MW". Replace it with "Racks needed: 313–353 (2.5 MW at 7.1–8 kW); the layout places them on 2 floors". Rewrite "Why the gap" to name the yard: a fourth set deepens the yard and shrinks the building below what 2.6 MW needs.

**What 339 gives:** 2.5 MW, unchanged. "Hall holds 3.6–4.0 MW" goes. Racks: 313–353.

**Effects elsewhere:**
- Golden is unchanged: it holds the site model only, not the layout count.
- The drawn hall would show fewer racks with more breaks.
- The engine.js "Rack layout check" line and the Engineering card change wording.
- The row-break rule needs finer steps first.
- Estimate: about half a day, plus a 339 re-export.
