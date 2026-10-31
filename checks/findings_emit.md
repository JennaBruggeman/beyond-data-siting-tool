# Findings: "What it gives off" (30 Oct 2026)

Three checks: an independent workbook (`checks/emit_check/`), a math agent (`checks/agents/2026-10-30_emit_math.md`, O-01–O-27), and the screen against the workbook (`checks/emit_check/compare_emit.md`).

- **Screen vs workbook:** 44 match, 81 differ, 120 not shown, 179 not comparable, out of 424 (53 parts × 8 lots).
- **Matches on all 8 lots:** energy, PUE, load factor, grid carbon, stormwater.
- **Display check:** one page error on V09 ("reading 'sources'"). It didn't repeat on a re-run. The likely cause is the map legend being drawn before the city's data loads. A guard is added; that cause is unconfirmed (?).

## Changes results: your call

| # | Part | Now | Suggest |
|---|---|---|---|
| 1 | Liquid capture share | 48–75 %; 48 % is in no source | 57–75 % (LBNL: 57–59 % typical, 67–75 % best). Heat offered rises about 19 % at the low end |
| 2 | Jobs | Only 465 m² per job, the fewest-jobs end | Show 154–465 m² per job, labelled operator claim. Jobs go up to 3× at the high end |
| 3 | Backup fuel | 12 h only (Uptime minimum) | Show 12 h minimum plus 24–48 h typical (operator claims) |
| 4 | Edmonton rain tank | 80 mm "wet month", not sourced | 82.7 mm (July, Edmonton City normals) |
| 5 | Solar yields | Monthly sums (947 / 1,243 …) | NRCan's published annual values (944 / 1,244; 892 / 1,007; vertical 716 / 989). Under 0.3 % change. This undoes my P-16 choice |
| 6 | 15 parts never computed | Logic panel text only. Examples: heat plume, NO₂ at neighbours, WUE, ERF, shadow hours, refrigerant leaks | Leave as register text for now, and say "not computed" on the logic panel |

## Clear-cut fixes (no decision needed)

- **Fuel (O-06):**
  - Stop showing NFC Part 4 tank limits as the rule. The register's own source says generator tanks fall under CSA B139 (paywalled), so Part 4 doesn't apply.
  - Keep the NFC figures as "for comparison".
- **Make-up water (O-02):** one calculation (PUE 1.4–1.55) in both places on the Water tab.
- **Solar card (O-07):** the text says $43.68 but the calculation uses $49.67. Fix the text.
- **Noise (O-08, O-23, O-24):**
  - The 102.8–106.1 dB range is two different chiller models, not "low-noise to standard". Say so.
  - The unit count comes from the plant sizing, not "about one per MW".
  - The dry-cooler figures must agree between the cooling card and the People tab.
- **Water behind electricity (O-09):** the femp source holds no grid water figures. Re-cite or mark "?".
- **"?" marks to restore** (O-15, O-19, O-21):
  - server manufacturing share 10–15 %;
  - greywater and blackwater treatment energy (Arden 2021, unread);
  - Edmonton water hardness, 178 mg/L.
- **Scope (O-20):** Edmonton's stormwater rate covers 0.16–3.0 ha lots only. Say so on larger lots.
- **Generator test (O-17):**
  - add Vancouver's yearly test of up to 180 min;
  - show the particulate (PM) figure the register has.
- **Server carbon (O-15):** the first fit-out isn't counted, only refreshes. Count it.
- **Backup (O-25):** "half kept for outages" has no source. Mark it "?".

## Register fixes

- **heat_captured (O-13):** the formula should apply the capture share to server heat, as the code does. The workbook's 1.4–1.55× overstatement came from the register formula, not the tool.
- **Citations:**
  - generator CO₂ and NOx cite the climate normals; cite AP-42 (O-16);
  - refrigerant source roles (O-18);
  - Westville is 0.8 %, not 1 % (O-14);
  - Allen 2011's 119 W/m² is a peak cell, not a city value (O-26).
- **Formula wording:**
  - free-cooling hours "<" should be "≤";
  - blowdown recovery 53 % / 16 % vs the 54 % / 19 % its cycles give;
  - give the blowdown cycles their source;
  - pv_facade coef: one set of yields (O-12).
- **grid_co2 (O-11):** the formula promises average and marginal. Only the average is used; say so.

## Research (mine)

- Why rain on the roof differs (E05 +328 %, E123 +131 %, CLARK +117 %): which roof the tool uses.
- Cooling-tower cycles, 2 vs 3, at the high end of make-up water: find a source.
- Edmonton water behind electricity, 1.6 L/kWh: basis.
- Chiller sound per unit: the FH3135 source for 80 dB(A).

## Applied (30 Oct 2026)

J.B.: jobs dropped ("so irrelevant"); backup fuel and the rest as suggested; the 15 uncomputed parts held for her question.

- **Decisions:** liquid capture 57–75 % (LBNL); jobs removed from the screen, the engine and the register (record kept in `meta.dropped_quantities`); backup fuel 12 h minimum plus 24–48 h typical (claims); Edmonton rain tank 82.7 mm (July); solar back to NRCan's published annual values (892–1,007 / 944–1,244; vertical 716 / 989), replacing P-16.
- **Screen:** O-02, O-06 (CSA B139; NFC Part 4 for comparison only), O-07, O-08, O-15 (?), O-17 (yearly 180 min test), O-20, O-21, O-23, O-24, O-25. The rain tank text names its month.
- **Register** (`register/patches/emit_fixes_2026_10_30.py`): heat_captured uses IT heat (O-13); free-cooling ≤; AP-42 cited for generators (O-16); refrigerant roles (O-18); water behind electricity marked ? (O-09); Westville ≈0.8 % (O-14); Allen peak cell (O-26); grid_co2 marginal not computed (O-11); treatment energy ? (O-19); blowdown recovery arithmetic noted.
- **Not done yet:** counting the first server fit-out (O-15), the PM figure on generator tests (O-17), and the cooling-tower cycles source; these go to research.
- **Golden:** unchanged on all 8 lots. Note: the golden files hold site and plant results only, not heat, water or fuel, so they can't catch changes in this stage; the workbook and screen dumps do.
- **Display check** (V339, E06A): 57–75 %, the fuel row and the quieter/louder noise labels show; no jobs; no page errors.
