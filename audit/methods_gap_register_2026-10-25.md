# Methods gap register: site maps and tool (25 Oct 2026)

First pass, from a code review of `site_maps/` and `tool/` by an independent reviewer, plus a web check of Edmonton's networks. **V** = checked in code or data. **I** = inferred, not checked yet. Nothing has been changed yet.

## The core problem

The site maps contain **no money, network-temperature or capacity test**. The tool's own money test has flaws that can turn "doesn't pay" into "pays". This is why E05 ranked #1 and nobody flagged it.

## Edmonton networks: what exists

| Network | Type / temperature | Status | In the maps? |
|---|---|---|---|
| Blatchford DESS | Ambient loop, 8–32 °C (Design Guide v8) | Operating, expanding | Yes, but scored like any network |
| Downtown District Energy (DDEI) Ph. 1 | Heat only; temperature not published | Operating since Sept 2025, gas boilers | Yes |
| DDEI Ph. 1A, 2–4 | Heat only | Planned (Ph. 2 in design) | Yes, **counted as if built** |
| U of Alberta | Steam 205 °C; chilled water 5 °C | Operating | Listed, not mapped |
| NAIT | Campus district energy (Stantec study); type **I** | **I** | No |
| Edmonton Institutions, Boyle Renaissance | Steam / **I** | Operating | Listed, not mapped |
| River Crossing, Exhibition Lands, Bonnie Doon, Heritage Valley | City-proposed neighbourhood systems; type not stated | Feasibility only | **No** |

Blatchford is the only **operating** low-temperature network found. The four City-proposed systems are new or regrowing communities, so they're possible "grow" sites; their temperatures are unknown.

## Gaps, ranked

**Changes which sites win**
1. **No money test in the maps.** Heat = demand × distance, or 1 inside a network (`build_site_maps.py:122–136`). E05 scored 1.0 while costing about $37/MWh against $13 value. **V**
2. **Network type ignored.** Steam, hot water, ambient and planned all score 1 (`build_site_maps.py:129–135`). Vancouver's heat #1 sits in Creative Energy's steam area; Edmonton's heat #1 sits in planned DDEI Ph. 2–4. **V**
3. **Network list incomplete** (table above). **V/I**
4. **No network capacity or timing.** Blatchford has about 400 homes today; E05's offer (113–205 GWh/yr) dwarfs Blatchford's whole build-out (46.8 GWh). **V**
5. **Receivers differ between cities.** Edmonton has no condos, no non-market housing, no small housing; maps use the high demand estimate (about 1.7× measured) (`make_bigrecv.py:12, 39`). **V**
6. **Grid capacity reduced to distance**, from 1977/1986 maps. The Alberta interim cap and tethering rule (AR 117/2026) and the BC Hydro large-load call are in the research but not in the maps; Vancouver gets the downtown × 0.5, Edmonton nothing comparable. **V**
7. **Maps and tool use different reach** (maps 1,000–1,500 m; tool a 3 km cost search). **V**
8. **Data vintage:** 2021 census, pre-2015 3D buildings in Blatchford; growth areas invisible. **V**
9. **Hazards uneven:** floodplain in Vancouver only; no Edmonton flood layer. **V**
10. **Zoning simplified:** all I-3 at 0.7, though data storage is allowed only in sub-area A; no land cost. **V**
11. **Double counting:** Vancouver heat, water and materials correlate (+0.5 to +0.72); "water" means different things in each city; cooling demand isn't a receiver. **V**

**Changes whether an exchange pays**
12. **One COP everywhere** (3.0–4.5 "to 70 °C", `engine.js:27, 340`); there's no ambient or low-temperature sink, so Blatchford heat is charged heat-pump costs it wouldn't have. **V**
13. **NEU "pays" with no capital cost:** the $32.59/MWh credit is compared only with heat-pump electricity (`opps.js:54`), and may be capped by bill netting (**I**: needs By-law 9552 Sch. C). V09 could flip to "doesn't pay". **V**
14. **The money gate can't say "fails"**: it says "possible with a price change" (`opps.js:38, 44`). **V**
15. **No monthly matching:** heat sold = min(annual demand, annual offer) (`cards.js:93`), which overstates summer sales. **V**
16. **Ambient-loop heat valued as gas** (`cards.js:65`); it really displaces boreholes or pumping. **I**
17. **Gas assumed as the comparator everywhere**; Vancouver's new buildings are often electric. **I**
18. **One year of Alberta power prices** (2025, $43.68/MWh); 2022–23 were far higher (**I**: check AESO). **V**
19. **Gas tariffs built differently** (FortisBC with riders, ATCO without). **V**
20. **Vancouver NEU levy used in Edmonton** (`cards.js:39`); same pipe cost in both, no frost allowance. **V**

## Proposed order of fixes
1. Complete the network list, with type, temperature, status, capacity and outside-heat rules for each (research).
2. Fix the tool's money test: sink temperature per network (ambient = no heat pump), capital costs in the NEU gate, a "fails at today's prices" state, monthly matching, Edmonton's own connection costs, and a 5-year price range.
3. Add to the maps: heat margin ($/MWh) instead of demand alone; network class and timing; capacity flags.
4. Make the two cities consistent (receivers, hazards, water, zoning sub-areas).
5. Re-run both cities' maps and the weighting study, and show the before and after.

## Added 25 Oct (J.B.), for the tool phase

21. **What's already on the land isn't scored.** Cost, demolition carbon and displacement all depend on it. **Fix:** a site factor (like zoning, not a sixth exchange) for redevelopment readiness.
    - Vancouver: building value ÷ land value (tax report).
    - Edmonton: no land/building split, so use building floor area ÷ lot, year built and total assessed value per m².
    - Flag homes separately. Treat an existing shell as possibly reusable, not only a cost. Flag former airport or industrial land for an environmental site assessment (Bylaw 20001 s. 7.140).
    - Apply citywide in both cities and show results with and without. **Severity:** changes rankings (Kingsway vs E06).
22. **Which public uses the zoning allows isn't scored.** It decides whether the building can host people at all. IM allows no community, event or market uses; BE allows them up to 500 m² each. **Fix:** a second term in the people exchange.
    - People = who lives nearby (as now) × what the zone lets the building offer.
    - Scored from each zone's use table: permitted 1, discretionary or conditional 0.5, not listed 0.
    - Uses counted: Community Service, assembly and entertainment, Indoor Sales and Service (markets), Food and Drink, Child Care, Urban Agriculture. Each is reduced by its size cap.
    - Sources: Bylaw 20001 zone tables; Vancouver district schedules. Weights within the people exchange are an assumption.
    - Apply citywide in both cities, with and without. **Severity:** changes rankings.

Both were raised after seeing that they favour E06, so the before/after comparison is required, not optional.
