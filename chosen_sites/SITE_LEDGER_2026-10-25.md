# Site numbers ledger: E06 (Blatchford edge) and V09 (275 1st Ave E)

25 Oct 2026. Every number the thesis uses for the two sites, with its source and status.
- **Confirmed:** checked against a primary source.
- **Corrected:** the earlier figure was wrong; the right one is given.
- **Assumption:** no source; a range is given and tested.
- **Unknown:** needs someone outside (utility, City, land titles).

Math: `site_math.py` (results in `results.json`). Site facts were checked by two independent reviewers against the City data, bylaws, BCUC filings and utility documents in the project.

## E06: 74 and 64 Airport Rd NW

### Site
| Item | Value | Source | Status |
|---|---|---|---|
| Lots | 4,562.5 m² + 4,274.4 m² = 8,836.9 m² | City assessment 2026 (open data export, 13 Oct) | Confirmed |
| Legal | Plan 1315NY Blk 18B Lot 2A; Plan 8222638 Blk 18B Lot 3B | same | Confirmed |
| Assessed | $1,213,500; $1,151,500 | same | Confirmed |
| Vacant | No building permits 2009–2026; gross area 0, but "year built 1991" on record | City building permits | Building permits confirmed; development permits unknown; check aerial |
| Owner | — | — | Unknown: land title search |
| Zone | BE (Business Employment) | Bylaw 20001 s. 2.120 | Confirmed |
| Height | **16.0 m** | Table 4.1.1 | Confirmed |
| Floor area ratio | **1.6**: about 14,140 m² total on both lots | Table 4.1.2 | Confirmed |
| Setbacks | 4.5 m to Airport Rd (collector); 6.0 m to a street or residential site; 0 m to other sites and alleys | Table 4.1.3–7 | Confirmed |
| Data centre as a use | Not defined in 20001. A use that fits no definition is **always Discretionary** (s. 7.20 3.3.2). Arguable as Minor Utility (examples: telecommunications, switching and wire centres, district heating plants; list not exclusive). Generators or a large cooling plant read as **Major Utility (not allowed in BE)**. | s. 8.10, s. 7.20 | Confirmed; the planner decides |
| Size limit on public uses | **500 m² per establishment** for Community Service, Indoor Sales and Service, Major Indoor Entertainment, Food and Drink, Health Service (variance possible, s. 3.18) | s. 3.3.1, 3.7.1, 3.12.1 | Confirmed. **Affects the interim halls.** |
| Screening | Cooling towers, transformers and ducts screened from streets and non-industrial sites | s. 5.2 | Confirmed |
| Inside Blatchford's service area? | **No.** The boundary runs along the far (northeast) side of Airport Rd; the site is about 50–60 m outside it | Bylaw C17943 Sch. A (2022 consolidation), read visually | **Corrected** (the repo said 0 m, inside) |
| In the City's district energy plan? | Yes: "Blatchford / Royal Alex / Kingsway" is one opportunity area | DE Strategy 2022, Table 1 | Confirmed |
| Nearest substation | **617 m** (unnamed, 1977 map) | CanVec | Corrected from 596 |
| NAIT | 1,324 m to the campus point; NAIT's campus extension into Blatchford is to be served by Energy Centre One | ODEF; Blatchford budget 2023–26 p. 6 | Confirmed |
| Royal Alexandra Hospital | 2,069 m | ODHF | Confirmed |
| Alberta grid | 346 g CO₂e/kWh (2024, preliminary) | NIR 2026 Annex 7 | Confirmed |

### Blatchford network
| Item | Value | Source | Status |
|---|---|---|---|
| Loop temperature | 8 °C minimum (winter) to 32 °C maximum (summer) | Design Guide v8, Table 8 | Confirmed |
| Homes connected | "Over 100" (2024); 442 accounts projected by 2026 | Utility site; budget 2023 p. 7 | **Corrected** (400 was not sourced) |
| Energy Centre One | **1 MW heating / 1 MW cooling** now, expanding to 4.25 / 4 MW | Budget 2023 p. 6 | **Corrected** (from "1–3 MW") |
| Build-out loads | Heating 46,789 MWh/yr (34.5 MW peak); cooling 43,747 MWh/yr (46.6 MW peak), described as "net District Energy Sharing System" loads | Budget 2023 p. 6 | Confirmed; **what "net" means is unknown** |
| Expansion | $79.2M; $23.7M federal; adds 13.1 MW heating and 12.3 MW cooling | NRCan, 31 Jul 2024 | Confirmed |
| Boreholes | 570, 150 m deep (operator claim); "2,100" not found | Utility site | 2,100 removed |
| Sewer heat | **Deferred**: EPCOR's lower sewer-flow forecast cut its potential, so a $15.3M peaking energy centre comes first (due 2026) | Budget 2023 p. 7 | **Corrected** (not "in design and construction") |
| Outside heat | No rules or prices in the bylaw | C17943 (2022) | Confirmed |
| Customer rate 2026 | $0.0358/kWh = $35.80/MWh, plus fixed charges | Blatchford rates 2026 | Confirmed |
| Fluctuation clause | s. 41, item (ii): "undue or abnormal fluctuations" (most likely 41(g)(ii); the lead-in words are lost at a page break in the 2022 copy) | C17943 (2022) | Confirmed wording; lettering uncertain |

### Heat math (start size 3–4 MW of servers)
| Item | Value | How | Status |
|---|---|---|---|
| Heat offered | 7,600–15,800 MWh/yr in liquid; up to 15,000–20,000 if the loop also takes air-side heat | MW × 8,760 h × 0.6 load × 0.48–0.75 captured | Load and capture factors are **tool assumptions**; air-side share is **my reasoning** |
| Winter share | 70 % of Edmonton heating falls in Nov–Mar; a data centre gives only 41 % of its heat then | CWEC degree-days (18 °C) | Confirmed calculation |
| Blatchford in July vs December (build-out) | about 440 vs 7,540 MWh of heating; July is understated because hot water (flat all year) is in the total | 46,789 × degree-day share | Rough |
| Delivery cost, no heat pump, all heat sold | **$2–8/MWh** at the boundary (60 m); $5–19 at 300 m; $7–33 at 600 m | Pipe $2,000–5,000/m (**assumption**), exchanger $250k (**assumption**), pumping 1.5 % | Depends on the **unknown** tie-in point |
| Same, winter heat only (Nov–Mar) | **$5–15/MWh** at 60 m; $10–42 at 300 m; $16–75 at 600 m | Same costs spread over 41 % of the heat | More likely case if summer heat isn't wanted |
| What the heat is worth | Unknown. Ceiling about $36/MWh (what customers pay); summer value could be zero or negative | — | **Unknown: ask the utility** |
| Does it pay? | Likely **if** the tie-in is close (within a few hundred metres) and the utility pays at least about $5–15/MWh for winter heat. Far tie-ins or summer-only demand break it. | — | Conditional |

**The open question that matters most.** If the build-out figures are what buildings use, then customers' heat pumps take about 31,000–35,000 MWh a year from the loop. Cooling puts back about 52,000–56,000. That leaves the loop with **17,000–25,000 MWh a year more heat than it needs** (assuming heating COP 3–4 and cooling COP 3.5–5.5). If instead "net" means what the utility itself must supply and remove, it adds 46,789 MWh of heat and removes 43,747 MWh a year, with the boreholes storing heat between seasons. Then the yearly shortfall may be small and mostly **seasonal**. The budget says sewer heat was to supply "the majority" of demand, but gives no figure.
- **First reading:** the data centre's heat is wanted only in winter, and its own cooling competes with Blatchford's summer cooling.
- **Second reading:** the data centre helps with the winter peak that the deferred sewer heat was meant to cover. How much it helps is unknown.

Only the utility can say which is true. Either way, the data centre needs its own cooling, and summer heat needs its own uses (greenhouse, snowmelt storage, the lent halls).

### For comparison: any heat-pump route in Edmonton (E05 downtown)
| Power price | Heat-pump cost per MWh of heat | Value | Verdict |
|---|---|---|---|
| 2025 ($49.74) | $30–47 | $13 | Fails |
| 2021–25 average ($111.59) | $41–60 | $13 | Fails |
| 2022 ($178.13) | $52–75 | $13 | Fails |

Pipe is not even counted. The carbon price that would close the gap is **$108–238 per tonne** (2025 power, 2024 grid intensity).
- Breakdown: heat-pump capital $16–31, upkeep $5–6, electricity $9–11 per MWh (2025).
- **Fails at every 2021–25 power price at the current gas value.**
- Limits of that claim:
  - The $13 value is held flat, and it is likely understated (riders excluded, and gas was dearer in 2022).
  - No credit is given for the data centre's own cooling savings.
  - The best case ($30) would pass only if heat were worth about $30/MWh or more.

## V09: 275 1st Ave E

### Site
| Item | Value | Source | Status |
|---|---|---|---|
| Lot | **About 7,850 m²** (both 7,791 and 7,803 come from the tool's flat-map scale, about 0.7 % low) | City parcel outline, measured properly | **Corrected**; legal area needs the land title plan |
| Zone | I-3, sub-area A | I-3 Map 1 | Confirmed |
| Data centre use | "Bulk Data Storage", conditional, sub-area A only; counts as a storage use | I-3 s. 2.1 | Confirmed |
| Ground floor | No data storage "except for entrances" | s. 2.2.11 | Confirmed |
| Floor heights | First floor at least 6.0 m; **floors above at least 4.0 m** | s. 3.1.2.9 | Confirmed (4.0 m is new to the brief) |
| Height | 18.3 m outright; up to 30.5 m and 45.7 m at discretion (both sub-area A) | s. 3.1.2 | Confirmed |
| Floor area | 3.0 × lot (about 23,550 m²); the extra 2.0 doesn't apply to storage | s. 3.1.1 | Confirmed |
| Yards | Front 0.6, side 7.6, rear 3.1 m; more above 18.3 m; max 61 m wide and deep | s. 3.1.2 | Confirmed |
| Existing building | Built 1956; 36 % coverage in 2009 data, **about 60 % if two 2022 LiDAR outlines are real** | City data | Unknown: site visit |
| NEU | Inside the service area, about 220 m from the edge | By-law 9552 Sch. A (2026) | Confirmed |
| NEU temperatures | Network at least 65 °C; building return at most 45 °C. The "50 °C" figure is a building **supply** rule | Connectivity Guidelines 2026 | **Corrected** |
| Feeding heat into the NEU | No published spec or tariff; "talk to the NEU engineer" | Guidelines | Confirmed (a gap) |
| Heat credit | $32.59/MWh, **netted on the building's own bill**; no stated payout above it | Sch. C Part 4; s. 8.3–8.4 | Confirmed; cap unknown |
| Connection levy | $123,873 + $146/kW (2026); $136,260 + $161/kW (2027); plus $10.466/kW-month capacity levy | Sch. C | Confirmed (whether a heat supplier pays it is unknown) |
| Downtown power | Feeders full by fiscal 2027, but BC Hydro "will implement temporary measures"; West End substation July 2032; not yet a BCUC decision | BC Hydro CPCN application, Nov 2025 | **Corrected** (not a ban) |
| Large-load rules | Curtail at least 10 % on 24 h notice (unpaid, up to 144 h/yr); 10–145 MW; 2026 intake closed | BC Hydro 2026 Call for Demand | Confirmed |
| Substations | Nearest 604 m (unnamed, 1986 map); Murrin 1.05–1.10 km (operating); East Vancouver 1.88 km (future) | CanVec; CPCN | Corrected from 567 |
| Electricity | $67.90/MWh energy only; **about $86.90 with the demand charge** | BC Hydro LGS (Apr 2026) | Confirmed; label it |
| Gas | $33.50/MWh (FortisBC Rate 3), so heat value $39.40 | FortisBC tariff 2026 | Confirmed |
| BC grid | 18 g CO₂e/kWh (2024, preliminary) | NIR 2026 | Confirmed |
| Distances | Emily Carr 359 m; Centre for Digital Media 573 m; False Creek 596 m; Detox Centre 146 m | City and federal points | Confirmed |

### Heat math
| Item | Value | Status |
|---|---|---|
| Heat-pump route cost | **$33–51/MWh** on the energy price alone; **$37–59** with the demand charge spread over the heat pump's run hours; plus pipe and possibly the levy | Calculation (checked independently) |
| Value under today's by-law | Up to $32.59/MWh, and only against the data centre's own NEU bill, which is small | Confirmed rule; cap unknown |
| Value if the City pays gas parity | $39.40/MWh | Would need a negotiated deal |
| Verdict | **Doesn't pay under the published tariff.** Pays only with a negotiated price near gas parity *and* costs at the low end. Change "marginal" to "doesn't pay today; depends on a deal with the City". | |

## What changes in the thesis
1. **E06 is outside Blatchford's service area**, about 50–60 m across Airport Rd. It is a neighbour asking to join, which fits "grow". Don't say "inside" or "0 m".
2. **A data centre isn't a listed use in Edmonton.** Expect a discretionary use, argued as Minor Utility. Generators and big cooling plant push it towards Major Utility, which BE doesn't allow, so design without them or keep them small.
3. **Interim halls:** public uses in BE are capped at **500 m² each** unless the planner grants a variance. Size lent halls at about 500 m², or argue the variance.
4. **Height 16 m and floor area ratio 1.6** in BE set the massing.
5. **Blatchford is smaller and earlier than we said:** 1 MW in 2023 (now expanding to 4.25 MW), and "over 100" homes in 2024. Sewer heat was deferred and a peaking energy centre comes first (fuel not stated). How much this helps the thesis depends on the open question above.
6. **Vancouver heat doesn't pay under today's rules.** That supports making space and power the Vancouver story.
7. **Edmonton's heat-pump route fails at every 2021–25 power price at today's gas value.** It isn't proof against a much higher gas or carbon price.

## Questions only others can answer
- **Blatchford utility:**
  - Are the 46,789 / 43,747 MWh figures building loads or the utility's own net loads?
  - Is the loop gaining or losing heat over a year?
  - Where could an outside source tie in, and at what temperature and price?
- **Development planner:** use class (Minor Utility vs discretionary); a variance on the 500 m² cap; generators.
- **Land titles:** the owner of both lots.
- **NEU engineer:** terms for feeding heat in; whether the credit pays out beyond the bill; whether a supplier pays the levy.
- **BC Hydro:** what's available for about 15 MW at V09 before 2032.
