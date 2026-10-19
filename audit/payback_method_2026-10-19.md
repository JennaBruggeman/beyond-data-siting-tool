# Heat payback method (19 Oct 2026)

J.B. asked: drop the 5-year line, show years, count the heat pump and upkeep, check the method makes sense, explain the range.

## What changed
- Before: "pays back within 5 years" (RVO 2018, Dutch, investor-style); cost counted was the pipe and the connection levy only.
- Now each receiver shows:
  - Years to pay back (simple, no interest), counting pipe, connection, heat pump and upkeep. Middle case plus range.
  - Cost per MWh of heat over the parts' life, against what the heat is worth (levelised cost).
  - Status: costs less than the heat is worth / depends on the costs / costs more (over the pipe's 30-year life).
- RVO 2018 kept only as the reason for the 1.5 km search radius; the card says so.

## Sources read
| Item | Value used | Source | Note |
|---|---|---|---|
| Method in a BC NEU study | levelised cost over 30 years | Squamish NEU feasibility, Compass Resource Management with FVB Energy and Hemmera, 15 Jun 2010, pp. 27, 42–45 | BCUC-regulated private utility case |
| Cost of capital | 5.6% real (WACC; ROE 10% / 8% real, debt 6%, 60/40) | same, p. 44 | 2010; one BC example, not a rule |
| Pipe life | 30 years at 120 °C; 50 years needs < 115 °C | EN 253:2019 as quoted in Energiforsk 2022:872, s. 8.2 (Jakubowicz et al.) | Standard itself not read (paywalled). Lower temperatures age slower (×2.5 per 10 °C, same report) |
| Squamish depreciation | DPS 1.5%/yr, ETS 3%/yr, equipment 3%/yr | Squamish p. 44 | Implies long pipe lives; not used |
| Heat pump capital | 1.13 M€/MW at 1 MW, 0.95 at 3 and 10 MW (total investment) | DEA technology data sheet 40, Aug 2026 (already in register) | Includes building and "other" (0.47–0.52) |
| Heat pump upkeep | 2,100 €/MW·yr fixed + 3.07 €/MWh variable, electricity excluded | DEA sheet 40 | |
| Heat pump life | 25 years | DEA sheet 40 | |
| Running hours | 4,400–7,100 h/yr at full output (mature years) | register price_floor calibration: Odense 2024, Mäntsälä, STACK Oslo (claim) | Sizes the heat pump: MW = MWh sold ÷ hours |
| Federal practice | opportunity cost of capital; social rate if long-term (50+ yr) or consumption; minimum 10-year horizon | TBS Policy on Cost-Benefit Analysis, 1 Sep 2018, ss. 7.1, 7.4 | Percent not stated in the policy; not used |
| Scotland heat recovery study | NPV at 9%, 40-year life | Scottish Government, 4 Nov 2011 | Context |
| Vancouver NEU rates | levelised rate, commercial utility model with a return on capital | City of Vancouver RTS 18251, 21 Oct 2025 | No rate or horizon stated |

## Why the range is wide (Grandview Terrace, 1425 Clark Dr, checked by hand)
- 154 homes × 16.81 MWh = 2,589 MWh/yr; route 369 m.
- Pipe: $1,038–2,620/m (×2.5). Heat pump efficiency COP 3.0–4.5 (×1.5 on electricity). Running hours 4,400–7,100 (×1.6 on heat pump size).
- Best: ($507k pipe + $650k heat pump) ÷ $51.8k a year = 22 yr. Worst: ($1.09M + $1.05M) ÷ $31.5k = 68 yr. Middle (every range at its midpoint): 37 yr.
- The range pairs every low with every low; the middle case is shown first.
- Before the heat pump was counted the same building read 8–24 years.

## Not yet counted / open
- Demand charges (both cities), inflation, who pays, carbon value.
- Connection: Vancouver NEU levy used as a stand-in, also for Edmonton (no Edmonton figure).
- Heat pump below 1 MW held at 1.13 M€/MW; smaller units likely cost more (ReUseHeat 0.3 MW ≈ 1.53).
- A more recent BC cost of capital (BCUC TES decisions) would be better than 2010.
- EN 253 itself not read.
