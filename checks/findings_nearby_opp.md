# Findings: "Who is nearby" and "What it could become" (2 Nov 2026)

Three checks: independent workbook (checks/nearby_opp_check/), math agent (checks/agents/2026-11-02_nearby_opp_math.md, N-01–N-28), screen vs workbook (checks/nearby_opp_check/compare_nearby_opp.md: 12 match, 60 differ, 104 not shown, 136 not comparable of 312). Display check: no page errors on the 8 lots.

## Already decided, ready to apply (J.B., 30 Oct triage)
- N-01, N-02: none of the triage strikes, moves or merges are in the tool yet: struck cards and add-ons (battery for the grid, UPS to the grid, backup for neighbours, gas plant, biomass, wind, cooling for neighbours, neighbours' solar, shared grid upgrades, distributed servers, copper and battery banks) still show; EV still "1 MW set aside"; insects and algae still in fish farming; the two seasonal stores separate; engineering-only items still in other templates. Apply in one pass.

## Clear-cut fixes
- N-08: greenhouse card says "measured" for a modelled figure.
- N-05: ENERGY STAR comparison medians on receiver cards don't match the source (e.g. school 0.75 vs 0.70).
- N-09: battery cost computed two ways (CAD 574–627 vs 467–627). Moot if the battery is struck.
- Snowmelt area: the tool divides the middle of its heat range by both ends of the W/m² range (high end 50 % low).
- Register: tes_volume omits ÷ 0.85; rare_earth sources vs roles; ev_stalls 25–400 kW per source; source roles missing on receivers_nearby, competing_sources.

## Your call
1. N-03 homes heated: the code divides by 85 % (boiler efficiency), which the register formula doesn't have and the register calls "not yet sourced". Gives 17.6 % more homes. Suggest: drop the factor until sourced, or source it.
2. N-04 hospital heat demand two ways: CEUD 1.096 GJ/m² (BC) in the search vs SCIEU 1.90 in the register. Suggest: SCIEU 2024 (newer, hospital-specific).
3. N-06 pipe cost: the register's Persson formula is never used; the tool prices pipe per metre (CAD 1,038–2,620 for DN100). Suggest: keep per metre (it's what the tool shows) and change the register formula to match.
4. N-07: 16 parts never computed (refuge people, clean-air volume, cooling-centre people, deprivation, sewage heat, stored heat, etc.). Many feed Architecture mode (refuge sizing). Suggest: build those with Architecture mode; drop the rest like the 30 Oct triage.
5. Copper: the tool uses full rated MW, the workbook average load; the register's coefficient is per MW of capacity, so the tool is right; register input to be fixed.

## Not errors
- Heat-based figures 29–40 % below the workbook: the tool rightly takes heat from the servers (register fixed 31 Oct, O-13); the workbook used the older formula.
- People nearby: the tool spreads census counts by 100 m cells; the workbook by whole areas. Method difference, both labelled.
