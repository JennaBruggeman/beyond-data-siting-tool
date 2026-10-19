# Best set-up for heat, per site (19 Oct 2026)

J.B.: after the selection, show which set-up and equipment would make the numbers more feasible, on each site. Agreed: heat first; best set-up per exchange; on the exchange card.

## What the search varies
- Size: current size, and the largest that fits (heat offered caps what can be sold).
- Which buildings share one pipe: start from the building with the lowest cost per MWh on its own; add the building that lowers the group's cost most; stop when nothing lowers it (greedy, up to 40).
- The buildings' heating temperature: 70/50 °C (baseboards, fan coils) and 60/45 °C (panel radiators).
- Cooling: liquid to the chip only (the only cooling with a sourced heat figure).

## Sources read (19 Oct)
| Item | Value | Source |
|---|---|---|
| Liquid-cooled water temperatures | supply 24 °C, return 35–40 °C; reused to heat offices and labs; building needs ≥ 35 °C (95 °F) on the coldest day; ERE 0.929 | NREL, Van Geet 2019, Data Center Optimization Strategies: NREL ESIF (fy19osti/74464); NREL warm-water liquid cooling page |
| ASHRAE facility water classes | W17, W27, W32, W40, W45, W+ (upper limits); several makers design around 40 °C, few run above 45 °C | Upsite blog on ASHRAE Thermal Guidelines 5th ed. (secondary; ASHRAE not read) |
| Building heating temperatures (max) | radiant floor 45/35; panels 60/45; baseboard 70/50; fan coils 70/50; make-up air 65/45; DHW 60 °C | City of Vancouver, Neighbourhood Energy Connectivity Standards bulletin, Dec 2013, s. 4.3 |
| Heat pump COP | Lorenz, η 0.40–0.50 (register cop; Odense check) | register |
| Pipe cost vs diameter | €212 + €4,464 × d per metre | Persson & Werner (register distribution_cost) |

## Method notes
- Shared street segments dug once; segment carrying several buildings sized by continuity (diameter ∝ √heat carried, from the DN100 the tool assumes for one building) — my derivation, stated on the card. Peak assumed proportional to annual heat (same building types).
- One connection (NEU levy stand-in) per building; one heat pump sized from total heat ÷ full-load hours, DEA cost per MW falling from 1 to 3 MW.
- The heat offered is not recomputed for the warmer source (small effect; noted).
- Radiant floors (≤ 45 °C): direct use possible much of the year (ESIF), not modelled; said in words.

## Results on the worked examples (middle case, cost per MWh against worth)
| Site | One building, base | Best found | 60/45 heating | Worth |
|---|---|---|---|---|
| 1425 Clark Dr | $68 | $63 (2 buildings, 530 m) | $60 | $40 |
| 555 W Hastings | $67 | $59 (2 buildings, 370 m) | $56 | $40 |
| Edmonton 12603 123 St | $238 | $187 | $185 | $13 |
- Hand check, Clark Dr group: (0.0698 × $1.22 M pipe + 0.0754 × $1.31 M heat pump + $23 k upkeep) ÷ 4,236 MWh + $13.2 electricity ≈ $62. Matches.
- The heat pump is the largest cost in every case (DEA total investment, includes building and "other").

## Decision for J.B.
- The base card's COP (3.0–4.5) comes from sources at 8–27 °C (DEA, Odense air side). With liquid cooling at ESIF temperatures the same method gives 4.6–5.7 to 70 °C. The base heat offered already assumes liquid cooling, so the base COP is conservative. Switch the base to the liquid figure?

## Not searched yet
- Feeding an existing network (NEU credit $32.59/MWh; Creative Energy), air cooling, heat storage, the other exchanges.
