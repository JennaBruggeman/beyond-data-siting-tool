# Fix pass, 2 Nov 2026: done

Spec: `checks/fix_pass_2026-11-02_SPEC.md`. Not committed.

**Register patch:** `register/patches/fix_pass_2026_11_02.py`. It can be run twice safely. `make_templates.py` gets three tier changes.

**Rebuild:** all four steps ran clean (`check_sources`: 0 unrecorded).
- 14 opportunities
- 15 add-ons
- 185 quantities
- 100 conditions

**Checks:**
- `new Function` passes on all 10 changed JS files and on the index.html inline script.
- Golden run on all 8 lots: identical before and after, with no page errors.
- Smoke test of all tabs, full and community templates, V09 and E05: 0 page errors.

## A. Triage

| Item | What changed | Where |
|---|---|---|
| Struck cards (9, 22, 27, 28, 29, 31, 32, 55, 56) | Taken out of the card families, so also out of the guided path, the "set-ups that open the most" counts, report.js, report3.js and sheet.js. Their gate code is deleted. The Materials family is gone. | opps.js:34–38, 66; report.js:113–128 |
| Struck add-ons (28, 29, 22, 35, 37, 38) | Battery, UPS, cooling for neighbours and own gas plant rows removed from the Energy tab. The "Flexibility" row is removed. The battery section is removed from the Electricity exchange. Wind and biomass leave "Left out" on their own (no longer in the register). | addons.js:161; xecon.js:90 |
| Register | 8 labels and 7 try-menu entries (`ates` merged) moved to `meta.dropped_opportunities`, with date and "J.B. triage 30 Oct 2026". Moved to `dropped_quantities`: backup_neighbours, chp_heat, community_solar, rooftop_solar, distributed_servers_homes, grid_refund, absorption, ups_flex, peak_relief, algae_kg, insect_check. Condition `a_absorption_temp` moved to `meta.dropped_conditions`. | patch |
| Reserved capacity (30) → rules | The 2026 Call curtailment rule now sits in Getting connected (Vancouver), and Alta Reg 117 (Edmonton). Noted in the `power_allocation` status. | addons.js:174–176 |
| Engineering only (11, 34, 36, 41–44) | try_menu entries get `tier:'full'`. New `BD.tierAllows` hides them outside the full template. Affected: genset, ppa and condensate add-ons, plus the greywater and blackwater rows. The sewer row (discharge) stays. tes_volume is taken off the district-heat card. hvo_swap, clean_power_price and greywater_neighbours are set to F in templates. | tiers.js:25–27; addons.js:77, 200, 209; make_templates.py:57, 63, 110 |
| Merge 10 + 12 | One card, "Seasonal heat store", holding btes and ates. The try_menu `btes` entry is merged (status: screening). | opps.js:64; register |
| Aquaculture | Now "Aquaculture (fish)". The insect and algae text and sources go to the dropped record. The Vancouver I-2 zoning text now says fish only. | opps.js:18, 63 |
| EV (33) | The card now says the chargers have their own new connection, and "1 MW set aside" is gone. ev_stalls formula reworded; spare_capacity input removed. | opps.js:67; register |

## B. Clear-cut fixes

- **N-08:** "measured" changed to "modelled" (opps.js:62).
- **N-05:** comparison values now 0.70, 2.20 and 1.10. Care, pool, recreation and hall lines dropped. Year shown as "?" (cards.js:156, 161).
- **N-09:** moot. The battery is struck and its section removed.
- **Snowmelt:** low heat ÷ high W/m², high heat ÷ low W/m² (opps.js:73, 76).
- **Register:**
  - tes_volume corrected to 169 / 34 L/kWh.
  - rare_earth role is now danczak2018 (proxy).
  - ev_stalls DCFC range is 25–400 kW (vanDCFC).
  - Roles added for bcResCare, abCCcompliance2026, neuTraced and van9552.

## C. Calls

- **Boiler 0.85:** labelled on screen (engine.js:338; cards.js:324; extras.js:185). The receiver_demand coefficient now cites the 4 `src_fill_*` sources.
- **Hospital:** the coefficient text now says CEUD is used and SCIEU is total energy, for comparison only. No number changed.
- **Pipe cost:** distribution_cost formula changed to the per-metre method. Persson is kept as `formula_persson_not_used`.
- **N-07:** 13 parts now carry the "NOT COMPUTED YET:" status prefix (17 with the 30 Oct ones). refuge_people, clean_air_volume and cooling_centre_people also say "to build with the Architecture mode".

## D. Unsourced audit

| Item | Where |
|---|---|
| Power factor band 0.90–1.0, labelled. Thresholds now use MW ÷ 0.90. | engine.js:257–260 |
| 350 m: "our study radius" | addons.js:268 |
| 600 m: "our study radius" | engine.js:672 |
| 3D noise radius 650 → 600 m | scene3d.js:349 |
| 500 m shade: "our study radius" | xecon.js:82 |
| 20 % and 200 m²: "our threshold" | opps.js:58, 86 |
| Plant life 20 years: "our point within ASHRAE medians" | addons.js:229 |
| Midpoint sizing and floor band: "our arithmetic" | tiers.js:103; scene3d.js:267; extras.js:272; engine.js:154 |
| 0.9 m screen: "consultant claim" | addons.js:69 |
| UPS text now 2.4–3.3 + 1.0–1.8 m²/MW; grid-battery sentence removed | site.js:254 |
| Ruiz-Arias year: 2009 | xecon.js:30 |
| Register: van6555zones s. 2.1(b)(ii) row; noise_limit and rainwater cite the `src_fill` sources; service_class coefficient now has the power-factor band | patch |

## Not done, or done partly

- **tes_volume source:** no source for the 0.85 usable share or the physics was found in the register. Marked "our assumption (no source found ?)".
- **Kept, because something else still uses them:**
  - battery: input to battery_code_path and condition z_edm_class. Still community tier in templates, but not shown in the tool.
  - spare_capacity, flexible_load, lrmc_bc, reserved_cost: other inputs and conditions use them.
  - copper_tonnes, ewaste, rare_earth, battery_cabinets, afterlife: shown or used elsewhere.
- **Unreachable code left in place:** the engine.js Energy fallback (replaced by addons.js; it still has the battery, UPS and "1 MW set aside" lines), batteryCard and xecon `battery()`. Nothing calls them.
- **New card names for J.B. to confirm:** "Rainwater and reclaimed water" (the old name included condensate) and "Aquaculture (fish)".
- **Outside the spec, not touched:** N-08's "53 growers", site.js 900 m², and the 500 m cooling-tower count (xecon.js:101).
