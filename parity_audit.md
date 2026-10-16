# Parity audit: is each quantity really the same in both cities?

Step 1 of the oversimplification check (16 Oct 2026). Claude's first pass, not yet independently reviewed.

**Scope.** The 81 diagram quantities that do not have their own Vancouver and Edmonton sources. The other 58 already have both.

**The three tests.** For each quantity: do the **rules** differ, does the **physical setting** differ (climate, grid, geology, water), or does the **market or supply** differ?

**The four results.**

- **Split:** at least one test says yes, and the tool uses one value for both cities. These are the likely oversimplifications.
- **Split inside:** one source already gives a separate value for each city, so the counter missed it.
- **Shared:** physics, a definition, or a global supply chain. One value is right for both cities.
- **Logic:** a method or a display rule, with no number to localise.

Split items are ranked by how much they move the tool's outputs: **H** high, **M** medium, **L** low. The ranking is my judgement; step 3 (varying each value across its range) will test it.

## A. Split: likely oversimplified (27)

| # | Quantity | Test that fails | What differs | Rank | Where to look |
|---|---|---|---|---|---|
| 1 | PUE (`pue`) | physical | One range (1.40–1.55) is applied to both cities. Climate changes cooling energy. The computed free-cooling hours are close (air-side at 18 °C: 7,109 h Vancouver, 7,614 h Edmonton), so the gap may be small, but it hasn't been tested. | H | Derive from the CWEC hours already in hand (no new source needed). |
| 2 | Water use, WUE / evaporation (`wue`; compare.js 1.5 L/kWh) | physical | Evaporation depends on wet-bulb temperature. Vancouver is humid and Edmonton is dry, so the same tower evaporates different amounts. | H | Compute from CWEC wet-bulb (in hand), plus a tower-performance source. |
| 3 | Water behind the electricity (`water_behind_electricity`) | physical | The BC grid is mostly hydro (reservoir evaporation). The Alberta grid is mostly gas (thermoelectric cooling water). Only US and "BC as a range" values are used now. | H | NRCan or Canada Energy Regulator provincial generation mix, combined with per-technology water factors. |
| 4 | Receiver search radius (`receiver_radius`) | market | It's a Dutch payback distance, and it depends on the heat price. Alberta gas costs $1.61/GJ (AESO 2025), far below BC, so a viable pipe may be much shorter in Edmonton. | H | Recompute from pipe cost, gas price (FortisBC, ATCO, in hand) and the CRF (in hand). |
| 5 | Payback and IRR (`payback`) | market | A Finnish study. The answer turns on what the heat displaces, and Alberta's cheap gas changes it. | H | Recompute per city with local gas and electricity prices (in hand). |
| 6 | Levelised cost of heat (`lcoh`) | market | Heat-pump electricity price: BC Hydro's tariff vs Alberta pool price plus delivery. | H | BC Hydro tariff (in hand); EPCOR or Alberta delivery rates (to retrieve). |
| 7 | What the receiver uses now (`displaced_source`) | supply | Only the NEU's own mix is sourced. Edmonton's networks (Blatchford ambient loop, DDE) and gas-heated buildings need their own. | H | Blatchford business plan (in hand) and the DDE documents. |
| 8 | Blowdown and make-up (`blowdown`) | physical | Cycles of concentration depend on water hardness. Metro Vancouver water is very soft; EPCOR's river water is much harder. | M | Metro Vancouver and EPCOR annual water-quality reports (hardness, mg/L CaCO₃). |
| 9 | Blowdown recovery (`blowdown_recovery`) | physical | The only test was a hard-water site, which suits Edmonton better than Vancouver. | M | Same water-quality reports. |
| 10 | Generator NOx and PM (`generator_nox_pm`) | rules | Metro Vancouver regulates engine emissions under its own air-quality bylaw. Alberta regulates them under provincial rules. | M | Metro Vancouver bylaw on non-road or stationary engines; Alberta Environment (EPEA) code for engines. |
| 11 | Fuel kept on site (`fuel_on_site`) | rules | The National Fire Code is used. Vancouver has its own Fire By-law, and Alberta adopts the NFC(AE). Limits may differ. | M | Vancouver Fire By-law 12472; National Fire Code – 2023 Alberta Edition. |
| 12 | Surface water as a cooling sink (`surface_water_sink`) | rules, physical | Vancouver only. Edmonton's option is the North Saskatchewan River, under Alberta's Water Act and its thermal limits. | M | Alberta Water Act licensing; any EPCOR or Alberta river thermal guideline. |
| 13 | Surveillance as experienced (`watched_area`) | supply | Vancouver fieldwork only. | M | Your own site visit to one Edmonton data centre (exterior only, as in Vancouver). |
| 14 | Heat-pump COP inputs (`cop`) | physical | The formula is right for both cities. The sink temperatures are not the same: NEU vs Blatchford's ambient loop vs DDE. The tool uses one range (3.0–4.5). | M | Network supply and return temperatures (partly in hand: RDE 70/50 °C). |
| 15 | Heat density of the receiving area (`heat_density`) | physical | Specific heat demand is higher in Alberta (CEUD per province, in hand). Check that the tool uses each province's value. | M | Check only. |
| 16 | Clean-air room (`clean_air_volume`) | physical | The standard is shared, but the need differs: wildfire-smoke days per year in each city. | M | ECCC or provincial air-quality records (smoke days, PM2.5). |
| 17 | Homes heated by distributed servers (`distributed_servers_homes`) | physical | US climate-zone values. Edmonton's heating season is about twice Vancouver's (HDD18 5,514 vs 2,810, computed). | M | Rescale with HDD (in hand). |
| 18 | Heat-cost share of income (`affordability`) | market | Incomes and energy costs differ by city. | M | StatCan income by CMA; provincial energy costs (in hand). |
| 19 | Embodied carbon, building (`embodied_building`) | supply, physical | A generic median. Snow and seismic loads, concrete supply and the provinces' grids differ. | L | Local EPD or LCA benchmarks, if any exist. |
| 20 | Greywater from neighbours (`greywater_neighbours`) | physical | US litres per person. Metro Vancouver and EPCOR publish their own per-capita use. | L | Metro Vancouver and EPCOR consumption reports. |
| 21 | Ground warming (`ground_warming`) | physical | Undisturbed ground temperature and geology differ (colder ground in Edmonton). | L | Alberta Geological Survey; well records (in hand). |
| 22 | Seasonal stored heat (`stored_heat`) | physical | Ground heat capacity and losses differ. Drake Landing (Okotoks, AB) suits Edmonton better than Vancouver. | L | Same as 21. |
| 23 | Linear heat density threshold (`linear_heat_density`) | market | A European viability threshold that depends on pipe cost and heat price. | L | Follows from 4. |
| 24 | Jobs (`jobs`) | market | A Virginia ratio. No Canadian figure found for either city. | L | Keep as labelled transfer; ask in interviews. |
| 25 | Algae (`algae_kg`) | physical | The heat needed depends on climate (an Italian plant). | L | Rescale with HDD. |
| 26 | Insect rearing (`insect_check`) | physical | Austrian figure; climate-dependent. | L | Rescale with HDD. |
| 27 | Renewable diesel (`hvo_swap`) | rules, supply | Already found. BC has a carbon-intensity limit; Alberta has a blend rule; the supply differs. | M | Retrieval list sent 16 Oct. |

## B. Split inside: already a separate value per city (10)

These count as "generic" only because one source covers both cities. Nothing to change except the label.

`free_cooling_hours` (CWEC, computed for both) · `hourly_overlap` (CWEC; check Edmonton's monthly shares are computed too) · `rainwater` · `homes_heated` · `refuge_people` · `pv_facade` · `people_affected` · `flood_exposure` · `lrmc_bc` (the Alberta pool price is attached, but the counter still tags it Vancouver-only; a labelling fix).

`rooftop_solar` shows no source, but per-city NRCan values are already in the tool (`nrcan_pv.json`). The source needs attaching.

## C. Shared: one value is right for both (32)

Each has the reason it can be shared. These should be shown in the tool as **shared assumption**.

- **Physics:** `heat_rejected`, `heat_in_water`, `hp_electricity`, `tes_volume`, `absorption` (temperature thresholds), `storage_footprint`, `noise_level` (propagation; the limits are already per city).
- **Definitions and standards:** `erf`, `heat_captured` (ISO/IEC 30134-6), `crf`, `spare_capacity`, `backup_hours`.
- **Server and building design** (the same equipment is sold in both cities): `server_floor` (Qu EDM1 and eStruxture VAN-1, one of each city), `it_load_outside`, `servers`, `liquid_capture`, `load_factor`, `heat_temp` (set by cooling type), `offerable_area`, `reserved_cost`.
- **Global supply chains:** `embodied_it`, `copper_tonnes`, `rare_earth`.
- **National rules or data:** `refrigerant_co2e` (federal halocarbon rules, IPCC GWPs), `floor_load_need` (NBC; VBBL follows it for floor loads, *to confirm*), `deprivation` (CIMD is national), `pv_cost` (national survey), `treatment_energy`.
- **Transferred, with no local data in either city:** `risk_term` (Swedish), `standoff` (Ontario standard), `vibration_rank`.
- **Operator-level:** `workload_control`.

## D. Logic (6)

`window`, `tradeoffs`, `crossing_type`, `commitment`, `futures`, `price_floor` (a shared gap: no Canadian figure for either city).

## D2. Already on the parity list (6)

These are being worked one at a time with J.B.: `light_at_window`, `genset_test`, `btes` and `deep_geo` (Vancouver side missing); `it_load_actual` (Edmonton has BEB Year 6, Vancouver has the global utilisation range only); `generator_co2` (the factor is shared, but testing hours follow each city's rule, which is `genset_test`).

## E. Found in the tool itself, not only the diagram

- `engine.js` uses one PUE (1.40–1.55), heat capture (0.48–0.75) and COP (3.0–4.5) for both cities. Items A1 and A14 would change these.
- `compare.js` uses 1.5 L/kWh evaporation for both cities (item A2).

The grid carbon (18.1 vs 346.1 g/kWh) and household heat (14.58 vs 29.19 MWh) are already per city.

## What happens next

1. **Step 2, independent review:** someone other than me checks this sort, especially section C, since anything wrongly called shared stays hidden.
2. **Step 3, sensitivity:** vary each section A item across its range and rank by how much the outputs move.
3. **Step 4, reality check:** compare against VAN4, Qu EDM2 and the Rogers permits.
4. **Fixable now with data in hand:** A1, A2, A4, A5, A14, A15, A17, A25 and A26. The rest need the retrievals listed.
