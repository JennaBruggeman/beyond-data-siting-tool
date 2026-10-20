# Logic test: heat receivers and heat economics (19 Oct 2026)

J.B.: before moving on, test every rule in the heat chain so none is an arbitrary borrowed rule like the 5-year Dutch payback.
Method: list each rule, where it comes from, whether it fits our use, and a numeric test (best building within reach, middle case, cost per MWh against worth) on the three worked examples.

Baseline after the fix in row 1 (cost per MWh / worth): Clark Dr 72 / 40 (Grandview Terrace); Edmonton lot 51 / 13; 555 W Hastings 54 / 40 (Fairmont Waterfront).

| # | Rule | Source | Fits our use? | Test | Verdict |
|---|---|---|---|---|---|
| 1 | Demand = energy bought (CEUD, homes, Vancouver HEI) treated as heat delivered | CEUD and the City's HEI count fuel bought (City FAQ 69: gas and district energy, not electricity) | **No: error.** Heat delivered = fuel × boiler efficiency | Fixed: × 0.85 everywhere (demand, homes heated, opportunity gate). Fairmont 52 → 54; Clark Dr 68 → 72 | **Fixed** |
| 2 | Search radius 1.5 km | RVO 2018 (Dutch, 5-yr payback distances) | **Borrowed.** Large buildings can justify longer pipes | Best beyond 1.5 km (to 3 km): Clark Dr 133 vs 72 inside; W Hastings 87 vs 54; **Edmonton 51 at 2.9 km (Kingsway Mall) = 51 inside** | Binding in Edmonton. **Proposed: search to 3 km and let cost decide** |
| 3 | Large-building size thresholds (4,645 / 9,290 m²) | Vancouver GHG by-law reporting thresholds | **Borrowed for data parity**, not physics | Not yet testable in Vancouver (no smaller-building data until BCA) | Keep, labelled as data parity; revisit with BCA |
| 4 | Heat pump full-load hours 4,400–7,100 | Network heat pumps (Odense, Mäntsälä, STACK claim) | **Partly.** Network figures assume year-round load and peak boilers | CWEC degree-hours: a building's own load gives 3,000–4,500 h if the heat pump covers the full peak. With 3,000–4,500: Clark Dr 72 → 85; W Hastings 54 → 64 | **Choice for J.B.:** building keeps its boiler for cold hours (current), or heat pump covers everything |
| 5 | Cost of capital 5.6% real | One BC utility study (Squamish NEU, 2010) | Fits (regulated utility), but one example | 3% / 5.6% / 8%: Clark Dr 60 / 72 / 85; W Hastings 46 / 54 / 62; Edmonton 43 / 51 / 59 | Does not flip any result. **Proposed: show the 3–8% range on the card** |
| 6 | Pipe life 30 yr | EN 253 (120 °C design) | Conservative for 35–70 °C heat | 50 yr: Clark Dr 72 → 69; W Hastings 54 → 53 | Keep; small effect |
| 7 | Connection cost $123,873 per building | Vancouver NEU levy, stand-in (also used for Edmonton) | **Stand-in**, Edmonton has none | Without it: Clark Dr 72 → 68; W Hastings 54 → 53 | Keep, labelled; small effect |
| 8 | Heat worth = gas price ÷ 0.85 | FortisBC / ATCO tariffs | Fits gas hot-water buildings. BC carbon tax eliminated 1 Apr 2025 (BC Gov page), so no carbon charge in BC; Alberta not re-checked | — | Keep; electric-heated buildings need a retrofit (already on the card) |
| 9 | Heat pump cost: DEA total investment (includes building and internal pipes) | Danish Energy Agency | Conservative (some double counting with the street pipe possible) | — | Keep, labelled |
| 10 | Edmonton apartments 0.777 GJ/m² | CEUD Alberta, all dwellings | **Likely high** for apartments (houses use more per m²) | — | **Proposed:** find CEUD apartment-specific intensity |
| 11 | Edmonton commercial 1.40 GJ/m² for every commercial building | CEUD Alberta commercial, heating only | **Likely high** for warehouses, low for some others | — | **Proposed:** split by use when data allows (BCA-like data not available for Edmonton) |
| 12 | Grouping search: greedy, top 60 | Claude's method | A heuristic; can miss the best group | — | Keep, stated on the card |
| 13 | Shared-pipe sizing √(heat) from DN100 | Claude's derivation + Persson & Werner cost | Physics-based but simplified | — | Keep, stated |
| 14 | COP: Lorenz η 0.40–0.50 | Register, Odense check | Fits | — | Keep |

## What changes the answer, biggest first
1. Heat pump sizing (row 4): up to +$13/MWh.
2. Cost of capital (row 5): ±$8–13/MWh.
3. Fuel vs heat (row 1): +$2–4/MWh (fixed).
4. Search radius (row 2): changes which building is best in Edmonton.
None of these turns "costs more than the heat is worth" into "pays its way" on the three examples; W Hastings comes closest ($46 at 3%, against $40).

## J.B. decisions (19 Oct, same day) — built
- Radius: search to 3 km (street-routing limit), cost decides; the Dutch 1.5 km circles retired from map, 3D and text. Clark Dr now 476 buildings with a demand figure, Edmonton lot 106.
- Heat pump sizing: both shown. Middle case keeps the building's boiler for the coldest hours; each card adds the cost if the heat pump covers everything (CWEC full-load hours, Vancouver 3,200–4,500, Edmonton 2,900–3,900).
- Cost of capital: middle case at 5.6% with 3% and 8% beside it, on each building's card and on the best set-up.
- Best set-up after the changes (middle case; 3% / 8% / heat pump covers all): Clark Dr $66 ($54 / $79 / $78) vs $40; Edmonton lot $48 ($40 / $56 / $64) vs $13; 555 W Hastings $49 ($42 / $57 / $58) vs $40.
