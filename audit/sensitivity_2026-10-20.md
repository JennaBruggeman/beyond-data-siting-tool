# Sensitivity test against the full template (step 7), 20 Oct 2026

One part at a time (screening, after Morris): each part the engine computes with is set to the low end of its sourced range, then the high end, with everything else at its usual range; the midpoint of each result is compared. Three worked examples: 1425 Clark Dr (Vancouver, new, 10.8 MW), 12603 123 Street NW (Edmonton, new, 22.3 MW), 555 W Hastings (Vancouver, existing tower, 1.3 MW). Air-cooled as set; heat figures as if liquid-cooled (the heat step's method). Swing = (largest − smallest) ÷ the usual value, the largest of the three sites; sound in dB; counts as counts.

Script: audit/sensitivity_2026-10-20/harness.js (runs in the tool page). Results: sens_0/1/2.json.

Scope: 15 parts, the ones the engine computes with that have a sourced range or a documented alternative (13 ranges, 2 choices). The other parts of the 195 are rules, qualitative gates or inputs read from data; they have no range to vary here. Grid carbon, gas and electricity prices are single published figures and were not varied.

| Part varied (node, shown from) | Low / high | Results it moves most (shown from) |
|---|---|---|
| PUE 1.40 / 1.55 (pue, full) | | largest size that fits 15% (resident); electricity a year 10% (community); carbon from its electricity 10% (resident); plant space 9% (full); sound power of the plant 0.5 dB (resident) |
| heat caught by liquid cooling 48% / 75% (liquid_capture, full) | | heat offered 43% (community); homes' worth of heat 43% (resident); cost of the best heat set-up 7% (community); cost of heat to the cheapest building 8% (community) |
| heat pump COP 3.0 / 4.5 (cop, full) | | heat offered 15% (community); homes' worth of heat 15% (resident); cost of heat to the cheapest building 13% (community) |
| hall share of floor 48% / 72% (hall_area, full) | | largest size that fits 33% (resident); size on floor space alone 37% (community); jobs 37% (resident) |
| hall m² per MW 290 / 630 (server_floor, full) | | largest size that fits 66% (resident); size on floor space alone 69% (community); jobs 69% (resident) |
| upper floor heights 5.5 / 6.0 m (envelope, community) | | under 5% on every result |
| plant m² per MW, low / high ends (component_space, full) | | plant space 38% (full) |
| sound power per cooling unit, low-noise / standard (plant_schedule, full) | | sound power of the plant 3.0 dB (resident) |
| a home's heat: 2023 (warmest year) / 2018–22 average (receiver_demand, community) | | homes' worth of heat 15% (resident) |
| assessment-estimated buildings: estimate ÷ 1.7 / estimate (receiver_demand, community) | | cost of the best heat set-up 6% (community); cost of heat to the cheapest building 10% (community) |
| pipe cost per metre, low / high (distribution_cost, full) | | cost of the best heat set-up 22% (community); cost of heat to the cheapest building 21% (community) |
| cost of capital 3% / 8% (5.6% base) (crf, full) | | cost of the best heat set-up 34% (community); cost of heat to the cheapest building 32% (community) |
| heat pump full-load hours 4,400 / 7,100 (demand_profile, full) | | cost of the best heat set-up 22% (community); cost of heat to the cheapest building 20% (community) |
| cooling inside: air / liquid to the chip (cooling_type, community) | | largest size that fits 15% (resident); plant space 25% (full); sound power of the plant 3.4 dB (resident) |
| size: 2.5 MW (resident default) / largest that fits (size_fit, resident) | | electricity a year 92% (community); carbon from its electricity 92% (resident); plant space 92% (full); sound power of the plant 5.3 dB (resident); jobs 92% (resident); heat offered 92% (community); homes' worth of heat 92% (resident); cost of the best heat set-up 32% (community); cost of heat to the cheapest building 22% (community) |

## Parts hidden from a template that move a result that template shows

| Part (shown from) | Result (shown from) | Swing |
|---|---|---|
| cooling inside: air / liquid to the chip (community) | sound power of the plant (resident) | 3.4 dB |
| sound power per cooling unit, low-noise / standard (full) | sound power of the plant (resident) | 3.0 dB |
| PUE 1.40 / 1.55 (full) | sound power of the plant (resident) | 0.5 dB |
| hall m² per MW 290 / 630 (full) | size on floor space alone (community) | 69% |
| hall m² per MW 290 / 630 (full) | jobs (resident) | 69% |
| hall m² per MW 290 / 630 (full) | largest size that fits (resident) | 66% |
| heat caught by liquid cooling 48% / 75% (full) | heat offered (community) | 43% |
| heat caught by liquid cooling 48% / 75% (full) | homes' worth of heat (resident) | 43% |
| hall share of floor 48% / 72% (full) | jobs (resident) | 37% |
| hall share of floor 48% / 72% (full) | size on floor space alone (community) | 37% |
| cost of capital 3% / 8% (5.6% base) (full) | cost of the best heat set-up (community) | 34% |
| hall share of floor 48% / 72% (full) | largest size that fits (resident) | 33% |
| cost of capital 3% / 8% (5.6% base) (full) | cost of heat to the cheapest building (community) | 32% |
| heat pump full-load hours 4,400 / 7,100 (full) | cost of the best heat set-up (community) | 22% |
| pipe cost per metre, low / high (full) | cost of the best heat set-up (community) | 22% |
| pipe cost per metre, low / high (full) | cost of heat to the cheapest building (community) | 21% |
| heat pump full-load hours 4,400 / 7,100 (full) | cost of heat to the cheapest building (community) | 20% |
| PUE 1.40 / 1.55 (full) | largest size that fits (resident) | 15% |
| cooling inside: air / liquid to the chip (community) | largest size that fits (resident) | 15% |
| a home's heat: 2023 (warmest year) / 2018–22 average (community) | homes' worth of heat (resident) | 15% |
| heat pump COP 3.0 / 4.5 (full) | heat offered (community) | 15% |
| heat pump COP 3.0 / 4.5 (full) | homes' worth of heat (resident) | 15% |
| heat pump COP 3.0 / 4.5 (full) | cost of heat to the cheapest building (community) | 13% |
| PUE 1.40 / 1.55 (full) | carbon from its electricity (resident) | 10% |
| PUE 1.40 / 1.55 (full) | electricity a year (community) | 10% |
| heat caught by liquid cooling 48% / 75% (full) | cost of heat to the cheapest building (community) | 8% |
| heat caught by liquid cooling 48% / 75% (full) | cost of the best heat set-up (community) | 7% |

## Findings from the run (checks)

- Plant space (m² per MW) moves the plant-space figure by 38% but not the size that fits: the fit uses the laid-out units (plant.js), the figure uses R.plant. Two measures of the same thing; to reconcile in the sweep.
- Upper floor heights (5.5 vs 6.0 m) change nothing at these three lots: the storey count comes out the same. It can matter on other lots (a height limit near a multiple).
- No building passes "heat pays" at any setting, so that count does not move; the cost per MWh does (rate 34%, pipe 22%, full-load hours 22%).
- Opportunity counts do not move with these ranges: the gates are qualitative.
- Size and cooling choice move most results; they are choices, already assumed and shown for residents.

## Cut-offs: J.B. to set (proposal below, not decided)

- Proposal: at or above 25% (or 3 dB): name the part on the card as what most of the range comes from, in plain words; no new question. 10–25%: fold into the range and list it under what this template leaves out. Under 10%: no change.
- Tier changes are J.B.'s call; none made.
