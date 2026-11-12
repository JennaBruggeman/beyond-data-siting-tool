# Hall density by cooling type: plan (J.B. decision 12 Nov 2026; plan before the commit)

## Weaknesses and questions first
- **A second ceiling caps the denser line.** The floor test is not the only limit: the engine's own floor-space range (siteFacts mw[1], from size.json's dense end, about 293 m²/MW) stops 1425 Clark Dr at 14.1 MW on the RICS line. For the RICS line and for liquid at 150 m²/MW, that range has to use the same density, or the line just repeats the cap. Planned: the range follows the density used.
- **Liquid-cooled options on air lots.** The Options tab's options b and c are "liquid-cooled servers and a heat pump" and take their size from Largest that fits, which today is the air figure. Under the new rule, a liquid option would size at 150 m²/MW. That changes the option sizes and heat figures on every lot, and golden includes those options. Planned: **not changed in this commit**; your call (question below).
- RD99 is one maker's reference design (3,818 kW on 574 m² of IT floor, racks up to 73 kW): a claim (trust 50), labelled "maker's reference design".

## What the RICS line gives (floor test with the hall at RICS's conservative end, 400 m²/MW, plus UPS and battery as now)
| Lot | Largest that fits now (air) | With a modern denser hall (RICS) | What limits it |
|---|---|---|---|
| 339 1st Ave E | 2.5 MW | **2.5 MW (no change)** | the generator yard (23 m at 2.6 MW, beyond the 21.7 m tested), not the floor |
| 64 Airport Rd NW | 5.2 MW | about 7.1 MW | floor space |
| 1425 Clark Dr | 9 MW | 14.1 MW (capped by the floor-space range, see above) | floor space |
| 12603 123 St NW | none | none | the generator yard |

## Cards and pages that change
| Where | Change |
|---|---|
| Engineering, What fits (f1eng_a) | new row "With a modern denser hall (2.5–4.0 kW/m², RICS Construction Journal): about X MW", not the default; liquid lots: the main figure at 150 m²/MW ("maker's reference design", Schneider RD99), RICS 250–400 as the conservative end |
| Old interface, Largest data centre that fits (engine.js) | the same line |
| Engineering report (report.js key figures, report3) | the same line |
| Architecture | no change (sizes from the size tested, not Largest that fits) |

## How (no change to air-cooled results)
- `site.js` fitMax / fitStep / roomWhy take a density argument: default = the current hall high end (630), so air lots run exactly as now; `fitMax({hall: 400})` for the RICS line; liquid (A.inside liquid or immersion) uses 150 for the main figure.
- Register: RD99 as a new source (maker claim, 50) and the RICS Construction Journal (industry guidance); `arch_dc_hall` gets the two densities by cooling type. Dated patch.
- Checks: golden (air lots unchanged: none of the golden lots sets liquid cooling), F1 gate, a probe of the four lots above.

## Question for J.B.
Options b and c (liquid-cooled with a heat pump) on an air-cooled lot: size them at the liquid density (150 m²/MW, larger sizes and more heat on every lot, golden changes) or keep them at the air figure for now?
