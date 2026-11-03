# Hard rules fix: site and exchanges FLAG ONLY items (2 Nov 2026)

J.B.'s rule (2 Nov 2026): hard regulatory rules block. Rezonings and conditional uses stay as choices. Sources: checks/agents/2026-11-02_code_audit_site.md and 2026-11-02_code_audit_exchanges.md.

Not touched: tool/arch.js, the noise items (site 1, exchanges F12), index.html (no change needed). No commits.

Every source id cited below is in register/formula_register.json new_sources: van_zdb_i2, van_zdb_i3, van_zdb_fc2, van_zdb_i1c, edm_bl20001, nfc2020_4313, arch_sep_nbc63215full, arch_per_vanS10, arch_per_edmFence, arch_ezbLoad, edmZB5120, vbbl2025_272. (`fuel_on_site` and `arch_ezb5120`, named in the audits, are not in new_sources, so they are not cited.)

## What changed

| # | Audit item | file:line | Rule (source id) | Change |
|---|---|---|---|---|
| 1 | site 2 | site.js:136–140; decide.js:64 (option text), 64 extra (input max and note), 149 (result line); site.js storeys input | Zone height limit (van_zdb_i2/i3/fc2/i1c; edm_bl20001, via new `Z.srcId`, site.js:50) | "Set the storeys" is clamped in `model()` to the most storeys the outright limit holds (or the user's own limit, a rezoning they chose). Because the clamp is in the model, it holds in the setup drawer, the deck and the 3D. `m.hClamp.text` says what was asked, what is used, and that more height needs "With approval" (the City's discretion) or a rezoning. Inputs get `max = m.maxStoreys`. The old over-limit warning is gone, because it can no longer happen. |
| 2 | site 11, 12 | scene3d.js:290–298 (`fenceLine`, `fenceWhy`), 302–304; site.js:141 (`m.yardRect`) | Vancouver By-law s. 10.10.3, 1.9 m cap in a required yard (arch_per_vanS10); Edmonton s. 8.20 (arch_per_edmFence, our reading ?) | The 2.4 m fence is now drawn on the line of the required yards (lot ring clipped to the yard rectangle, before the 61 m width cap). Where a yard is 0 m, that line is the lot line. The 3D key says why, for each city. In Edmonton it stands behind the street setback, labelled as our reading. |
| 3 | site 14 | engine.js:156–162; mathFits engine.js (ground line) | I-2 s. 2.2.7, I-3 s. 2.2.11, FC-2 s. 2.2.4 (van_zdb_i2/i3/fc2) | A whole existing building in a zone that has the rule (not an assumed rezoning): the ground floor (the sum of the building footprints) is taken out of the hall. Both readings are kept, as for a new building: strict (hall share of the floors above) and lenient (support rooms at grade). `f.how`, "Ground floor" and "Show the math" say so. Retrofit feasibility text says it (decide.js:100). |
| 4 | site 4 | site.js:178–183 (check in `model()`, so it reaches `m.warn` → setupProblems → flow, fitMax, report); site.js:197–198 (fitMax search starts at the fuel cap); engine.js:263–266 and the Standby fuel row; decide.js:109 | NFC 2020 Table 4.3.13.4.-B (nfc2020_4313) | Generators on the roof: 12 h of fuel above the first storey is compared with 20,000 L (one storage area, tanks over 2,500 L each). Above it, the set-up is blocked, and the tool names the rule and the largest size allowed (4.0 MW at PUE 1.55, 12 h, 0.263 L/kWh). The table is written for tanks inside buildings, so applying it to rooftop tanks is labelled as our reading (?). Yard sets stand outdoors at grade, where the table does not apply: the text says so (outdoor siting, NFC 4.3.2, is not tested). `fuelLim` now follows where the generators are, not the leased floor. |
| 5 | site 3 | plant.js:16–21 (`evap:3` on hybrid and tower kinds), 36–42 (`EDGE`, distance helpers), 52 (test in `pack`), 77, 104; P.lines note | NBC 2020 / BCBC 2024 / NBC(AE) 2023 6.3.2.15.(5) (arch_sep_nbc63215full) | Tower and hybrid units, on the roof or in the yard, are placed only where the whole unit is at least 3 m inside the lot line. The neighbours' doors, windows and outdoor spaces are not known, so the lot line stands in for them. A unit that cannot be placed is reported as not fitting, which blocks. 2.15 m holds, because the units are at least 2.88 m tall. 7.6 m from air intakes is not tested, because no intakes are drawn (?). |
| 6 | site 8, exchanges F9 | site.js:52–55 (`Z.screen`), 112 (enforced in `model()` before the cache key); addons.js:57, 68–69, 73 | Edmonton BE s. 5.2 (arch_ezbLoad); s. 5.120 subs. 1.1.2 (edmZB5120) | BE: `A.vis` defaults to and is held at "screen". The "seen or hidden" card does not offer "Leave it seen" and gives the reason. On Edmonton lots in non-industrial zones (assumed rezoning), s. 5.120 1.1.2 is applied in the same way, labelled as our reading (?). |
| 7a | exchanges F7 | opps.js:18 | Van I-2 s. 2.2.1(b), 2.2.2(b) (van_zdb_i2) | Aquaculture in I-2 returns 'no', so it moves to "Not here". |
| 7b | exchanges F8 | opps.js:153–155 | rules gate 'no' | `opp3d` draws nothing when the rules gate is 'no', and the 3D note names the reason. |
| 7c | exchanges F10 | addons.js:211–213, 218–219 | VBBL 2025 Art. 2.7.1.2 (vbbl2025_272) | Water connections with rule_state `not_allowed` for the city (Vancouver greywater and blackwater) are listed under "Not here", with the rule, and have no Explore button. |
| 7d | exchanges F11 | report.js:108–109, 210, 276–278; report3.js:287–290 | setupProblems (all hard rules above) | An option that breaks a hard rule is not drawn, in the HTML, the PDF or the report3 pages. "Not drawn: at X MW this set-up breaks a hard rule" and "Not allowed at this size: …" name the rule instead. |
| 8a | site 15 | decide.js:93–101 (`zoneFeas`, `withZone`) | Zone status (statusOf) | Retrofit and lease show the zoning status (rezoning, conditional use, case by case) in the same way "New building" does. These stay choices, but the status is always named. |
| 8b | site 16 | site.js:130–132 | Zone yards (Z.srcId) | `m.inset` is now set for existing buildings too (yards only, no 61 m cap), so yard plant (plant.js) and the open-land uses (opps EV, meanwhile) stay out of the required yards. |

## Checks run

- Golden run (`grD`) against checks/golden: no page errors on any lot. Pre-change baseline (`grD0`): identical to golden.
- Targeted run on 1425 Clark Dr (I-2) and 74 Airport Rd NW (BE), no page errors:
  - 8 storeys clamps to 3 (18.0 m) and 2 (12.0 m), with the note.
  - Roof generators block above 4.0 MW, and fitMax gives 4.0.
  - The closest tower unit is 11.1 m from the lot line.
  - Aquaculture in I-2 is 'no'.
  - Greywater and blackwater are "Not here" in Vancouver and still explorable in Edmonton.
  - A retrofit at Clark Dr leaves out 1,972 m² of ground floor.
  - BE "reveal" is not offered.
  - The fence key names s. 10.10.3.
  - The deck shows the I-2 conditional-use status on retrofit and lease.
  - With roof generators, report option A (2 MW, does not fit) is not drawn in HTML, PDF or report3.

## Golden differences (errors ignored)

No numeric value changed on any lot: floor area, MW, plant, footprint and loading are all identical. The changes:

| Lot | Changed value | Cause |
|---|---|---|
| E06A, E06B (BE) | `answers.vis`: absent → `screen` | Edmonton BE s. 5.2 screening now binds (arch_ezbLoad) |
| E06A, E06B | `facts.M.Z.screen`: absent → {src: arch_ezbLoad, why} | same |
| HAST (existing, DD as if I-2) | `facts.M.inset`: absent → ring | Required yards now apply to yard plant beside an existing building (site 16). The split coolers placed in the yard did not move. |
| HAST | `facts.M.fuel`: absent → {L 9,294, lim 20,000, at roof} | Roof generators fuel check (NFC Table 4.3.13.4.-B). Within the limit, so no block. |
| all 8 lots | new keys `facts.M.Z.srcId`, `facts.M.yardRect`; `facts.M.maxStoreys` (new-building lots) and `facts.M.Z.screen` = null | Bookkeeping for the rules above (source id, fence line, storey cap). No value they feed changed. |

If the golden set should be refreshed, these are the only expected differences.

## Open (?)

- Applying Table 4.3.13.4.-B to rooftop outdoor tanks.
- Edmonton fence behind the setback.
- s. 5.120 on assumed-rezoning lots.
- 7.6 m from intakes: not tested, because no intakes are drawn.
- fitMax still assumes a smaller size never needs more room. With roof generators at Clark Dr, sizes below 3 MW fail, because the roof of a smaller building is too small for the sets. This was already so before this fix.
