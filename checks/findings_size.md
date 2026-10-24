# Size stage findings, 24 Oct 2026

Two independent routes: the hand calculation in `size_check.xlsx` (live formulas, 5 golden lots) and a math-check agent reading the code (`agents/2026-10-24_size_math.md`).

**Workbook result:** 0 mismatches on gross floor area, hall area (strict and lenient), largest size, and the whole-building check, for all 5 lots, once the plant cap (stableFacts fixed point) is included.

## Wrong on screen (fix)

| id | Problem | Fix |
|---|---|---|
| F-01 | "Plant space, dry coolers" uses air-cooled chiller figures when cooling is air; the written sum leaves out × PUE | Label the cooler actually used; show × PUE |
| F-02 | Cooling towers or hybrid chosen: plant m² still uses chillers or dry coolers | Use the outside-cooling answer |
| F-03 | After the plant cap, only the top MW is capped; hall bars and the "hall ÷ 290 = …" math line don't add up | Cap all, or show the cap as its own step |
| F-04 | Page error on 1425 Clark Dr: "Cannot read properties of undefined (reading 'sources')" | Trace and fix |
| F-05 | Indoor plant floor is subtracted but never shown in the math | Add the line |

## Register text out of step with the code (fix)

| id | Part | Fix |
|---|---|---|
| R-01 | hall_area | Formula text: hall = 48–72 % of upper floors (Burlington); plant handled by the plant-fit cap |
| R-02 | size_fit | Coefficients: 290–630 m²/MW (operator claims), not LBNL 186–2,325; add plant-fit cap rule; drop part-of-building caps or apply them |
| R-03 | it_load_outside | High density is 250–290, not about 250 |
| R-04 | size check | Register `grossPerMW` 505–1,109 as a check coefficient |
| R-05 | floor_area | Existing buildings: register floor(h ÷ 4 m), the ×0.48–1.23 spread and its source; City report is used as data |
| R-06 | component_space | Narrow to "equipment only, no spares or generators" or add them; heat pump per MW of servers vs heat |

## Decisions for J.B.

| id | Question | Options |
|---|---|---|
| D-01 | The tool caps every size at 40 MW; not in the register. 12603 123 St NW would reach 72 MW without it | Keep and register it · raise it · remove it |
| D-02 | Server count uses nameplate MW, register says average IT load | Nameplate (servers installed) · average |
| D-03 | `server_floor` (75–87 % raised floor) is unused | Retire it · wire it in |
| D-04 | The "fits with its plant" headline sizes the building from a midpoint (460 m²/MW) | Keep midpoint · use the pessimistic end |
| D-05 | FC-2 low height uses 22.9 m, not 10.7 m | Use 10.7 m for the low end |

## Lower priority

Storey count below 6 m height; I-2 sub-area B 6.1 m ground floor; dry-cooler unit size from the midpoint (could undercount units ~25 %); helpers BD.area/BD.pip not reviewed.

## Not yet checked

Sources (operator and manufacturer figures, Burlington plans, benchmark buildings): source-check agent, next session.
