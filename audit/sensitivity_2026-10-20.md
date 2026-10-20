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


## Run on 1,010 sampled lots (20 Oct 2026, afternoon)

The sample is every non-single-family zone in each city, spread from small to large lots: 501 in Vancouver, leaving out R1-1 and RS; 509 in Edmonton, leaving out RS, RSF, RSM and RR. The test went in four stages:

1. **The walk.** Each lot was walked as a user would, rotating the three templates. If the set-up fit no size, "Find a set-up that fits" was tried.
2. **The screen check.** Every step was checked for broken text, broken drawings, stuck steps and errors.
3. **The sensitivity screen.** The same one-part-at-a-time test was run at the size the walk ended on. Heat costs were tested on every 10th lot only, because routing is slow.
4. **The number checks.** Ranges in order, results finite, size within the floor, sound plausible.

Files: lots/lots_van.jsonl, lots/lots_edm.jsonl, lots/sample.json, lots/lot_page.js, lots/analyse.py.

### What it found

- **Blank answers ignored the labelled defaults.** With no answer yet, "what is being built" was read as "not new", which gave every lot no floor. Fixed (engine.js, site.js), and the run was restarted on the fixed version.
- **Records larger than the outline (Edmonton).** Some assessment records cover far more land than the lot outline found. An example is a 28,114 m² record on a 225 m² outline, likely strata or multi-lot properties. The tool sized on the record area but laid out on the outline. It now uses the outline and says why (index.html).
- **3D errors.** On a few lots the 3D broke on Over time and Two cities: a label had no position, or a plant yard clipped to nothing. Fixed (scene3d.js).
- **Best heat set-up showing "$NaN" or "$-Infinity".** This happened when a route could not be measured. Fixed (cards.js).
- **One very large lot timed out.** An 80 ha A5 lot in Edmonton took over 4 minutes on one step. The size search itself takes about 1 s. Left open: a performance check.
- **Small lots.** Most lots under 500 m² fit no data centre: Vancouver 256 of 299, Edmonton 96 of 165. Above 1,000 m², every Vancouver lot fits one. "Find a set-up that fits" rescued 150 Vancouver lots and 95 Edmonton lots that the defaults could not fit.

### Swings across the lots where a size fits

The swing is the range of each result as one part moves across its sourced range, as a share of the usual value. Sound is in dB, counts are counts. The rule on the cards now uses the **90th percentile** across lots, not the three worked examples. The main changes from the three-example run:

- Pipe cost per metre moves the heat cost by up to 67% (90th percentile).
- Heat caught by liquid cooling moves the heat cost by 29%.
- The size that fits moves by 100% with floor per MW, and by 41% with the hall share.

```
capture    best heat set-up cost        n=  70 median 6%  p90 27%  max 31%
capture    cheapest building cost       n=  71 median 4%  p90 29%  max 38%
capture    heat offered                 n=  72 median 43%  p90 43%  max 43%
capture    homes' worth of heat         n=  72 median 43%  p90 43%  max 43%
cop        best heat set-up cost        n=  70 median 2%  p90 10%  max 12%
cop        cheapest building cost       n=  71 median 8%  p90 11%  max 15%
cop        heat offered                 n=  72 median 15%  p90 15%  max 15%
cop        homes' worth of heat         n=  72 median 15%  p90 15%  max 15%
estimates  best heat set-up cost        n=  70 median 0%  p90 18%  max 30%
estimates  cheapest building cost       n=  71 median 0%  p90 12%  max 24%
ftf        largest size that fits       n= 641 median 0%  p90 0%  max 51%
ftf        size on floor space alone    n= 641 median 0%  p90 0%  max 69%
hallShare  largest size that fits       n= 618 median 12%  p90 41%  max 307%
hallShare  size on floor space alone    n= 641 median 29%  p90 37%  max 103%
hallShare  jobs                         n= 641 median 37%  p90 37%  max 37%
homeMWh    best heat set-up cost        n=  70 median 0%  p90 0%  max 6%
homeMWh    cheapest building cost       n=  71 median 0%  p90 0%  max 5%
homeMWh    homes' worth of heat         n=  72 median 14%  p90 15%  max 15%
hpFLH      best heat set-up cost        n=  70 median 16%  p90 22%  max 24%
hpFLH      cheapest building cost       n=  71 median 16%  p90 20%  max 21%
inside     largest size that fits       n= 641 median 0%  p90 15%  max 400%
inside     size on floor space alone    n= 641 median 0%  p90 4%  max 215%
inside     sound power                  n= 641 median 0.8 dB  p90 3.4 dB  max 3.6 dB
inside     plant space                  n= 641 median 25%  p90 25%  max 25%
lw         sound power                  n= 641 median 3.0 dB  p90 3.0 dB  max 3.0 dB
m2PerMW    largest size that fits       n= 608 median 44%  p90 100%  max 800%
m2PerMW    size on floor space alone    n= 641 median 59%  p90 69%  max 215%
m2PerMW    jobs                         n= 641 median 69%  p90 69%  max 69%
pipe       best heat set-up cost        n=  70 median 33%  p90 67%  max 79%
pipe       cheapest building cost       n=  71 median 28%  p90 55%  max 79%
plant      plant space                  n= 641 median 38%  p90 38%  max 38%
pue        carbon from electricity      n= 641 median 10%  p90 10%  max 10%
pue        electricity a year           n= 641 median 10%  p90 10%  max 10%
pue        largest size that fits       n= 641 median 0%  p90 11%  max 267%
pue        size on floor space alone    n= 641 median 0%  p90 7%  max 43%
pue        sound power                  n= 641 median 0.0 dB  p90 0.7 dB  max 2.4 dB
pue        plant space                  n= 641 median 9%  p90 9%  max 9%
rate       best heat set-up cost        n=  70 median 39%  p90 50%  max 54%
rate       cheapest building cost       n=  71 median 36%  p90 45%  max 54%
size       best heat set-up cost        n=  70 median 12%  p90 66%  max 92%
size       cheapest building cost       n=  71 median 12%  p90 52%  max 75%
size       carbon from electricity      n= 641 median 224%  p90 2400%  max 2400%
size       electricity a year           n= 641 median 224%  p90 2400%  max 2400%
size       heat offered                 n= 641 median 224%  p90 2400%  max 2400%
size       homes' worth of heat         n= 641 median 224%  p90 2400%  max 2400%
size       jobs                         n= 641 median 220%  p90 405%  max 1500%
size       sound power                  n= 641 median 4.0 dB  p90 7.6 dB  max 7.6 dB
size       plant space                  n= 641 median 224%  p90 2400%  max 2400%

```
