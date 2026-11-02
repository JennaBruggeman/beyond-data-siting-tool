# Fix pass spec (2 Nov 2026). J.B.: "go ahead".

Repo /mnt/attach/outputs, branch overnight-2026-10-30. Implement in tool/*.js, tool/index.html and the register (via a new patch register/patches/fix_pass_2026_11_02.py; never hand-edit register/formula_register.json or tool/opps.json — opps.json is rebuilt from the register). Do not commit. After edits: node syntax check every changed JS (new Function(src)), index.html inline scripts; rebuild with: for s in make_register_md make_diagram_data make_templates build_diagram; do python3 register/$s.py; done (from repo root). Keep every edit minimal and labelled with a short comment "2 Nov 2026 fix pass: <id>".

## A. Opportunity triage (decisions in checks/opportunity_triage_2026-10-30.md; math findings N-01, N-02 in checks/agents/2026-11-02_nearby_opp_math.md)
- STRUCK: remove from what the tool shows (opportunity cards, try_menu add-ons, Energy-tab add-ons, "set-ups that open the most" counts, reports): battery room for the grid (28), UPS batteries to the grid (29), backup power for neighbours (31), own gas plant with heat (35), biomass/renewable gas (37), small wind (38), cooling for neighbours (22), solar on neighbours' roofs (27), grid upgrades shared (32), distributed servers as heaters (9), material bank copper (55), batteries at end of life (56). In the register, move their opportunity labels / try_menu entries to meta.dropped_opportunities (keep the record, with date and "J.B. triage 30 Oct 2026"); quantities used ONLY by struck items go to meta.dropped_quantities the same way (check inputs of remaining quantities first; don't drop anything still used).
- MOVED to rules: reserved capacity (30): keep the BC 2026 Call curtailment rule where the tool shows grid connection; no longer an opportunity.
- ENGINEERING ONLY: greywater (41), blackwater (42), blowdown recovery (43), condensate (44), cleaner backup fuel (36), hot/chilled water tank (11), buying new clean power (34): show only in the full/engineering template (tool/tiers.js and register templates tiers: set their tier to 'full').
- MERGES: seasonal ground store + aquifer store (10, 12) → one card "Seasonal heat store" (keep both quantities inside it); aquaculture card shows fish farming only (drop insects and algae text; quantities algae_kg and insect_check to dropped_quantities if used only there).
- EV hub (33): reword: chargers on the lot with their own new grid connection (there is no spare capacity); remove "1 MW set aside".
## B. Clear-cut fixes (checks/findings_nearby_opp.md)
- N-08 greenhouse card: "measured" → "modelled" per register iesoGH relabel.
- N-05 ENERGY STAR comparison medians on receiver cards: use the values in the register source text energyStarCA exactly; where the source has no category, drop that comparison line.
- N-09 battery cost two ways: moot if battery struck; if any battery figure remains, use one range.
- Snowmelt area: divide the low heat by the high W/m² and the high heat by the low W/m² (ends consistent), as the register formula implies.
- Register: tes_volume coefficient with ÷ 0.85 (169 / 34 L/kWh) and give it its source; rare_earth source roles match its sources; ev_stalls 25–400 kW per vanDCFC; add missing source roles on receivers_nearby, competing_sources.
## C. Calls (decided as Claude suggested, adjusted by new research checks/research_arch_v1/unsourced_fill.md)
- Boiler efficiency 0.85: keep 0.85 but label on screen "our assumption, within NRCan's rated range (existing 0.55–0.89, new 0.90–0.98)"; register receiver_demand coef updated with sources src_fill_* ids.
- Hospital heat: the search keeps CEUD (heating-only, sector-wide); fix the register receiver_demand coef so it says CEUD is used, and SCIEU 2024 is total energy (not heating) shown only for comparison. No number change.
- Pipe cost: keep per metre; update register distribution_cost formula to the per-metre method the tool uses (CAD 1,038–2,620 per m for DN100, with the conversion stated), Persson formula kept as a note "not used".
- The never-computed parts (N-07): keep in register, status prefixed "NOT COMPUTED YET:"; refuge_people, clean_air_volume, cooling_centre_people to be built with Architecture mode.
## D. Unsourced audit (checks/unsourced_audit_2026-11-02.md, unsourced_fill.md)
- Show labels on screen where values are ours: power factor: replace the assumed 1 with a band 0.90–1.0 (low end from ENERGY STAR server PSU minimum 0.95 is per server; facility "?") and label it; 350 m sight-line, 600 m noise search (make the 3D use 600 m too, not 650), 500 m: label "our study radius"; opportunity cut-offs 20 % heat and 200 m² free: label "our threshold"; plant life 20 years: "our point within ASHRAE medians"; midpoint sizing and existing-building floor band: "our arithmetic"; 0.9 m screen: "consultant claim"; UPS set-up text in site.js to the register's current figures.
- Register: van6555zones gets the s. 2.1(b)(ii) row (src_fill_van6555s21); Edmonton rain 82.7 mm cites src_fill_ecccEdmCity; Ruiz-Arias year 2009.
## Report
Write checks/fix_pass_2026-11-02_DONE.md: each item, what changed (file:line), and anything not done with the reason. Final message under 250 words.
