# Hunt 10 — Figures read from Jenna's uploads (10 Oct 2026)

Full texts supplied by J.B. (UBC Library access); read by text extraction. Page numbers are the journal's. These replace "abstract only" and "summary" entries in the register.

## Lygnerud & Werner 2018, Energy 151:430–441 (risk of losing industrial heat recovery)
| item | value | where | status |
|---|---|---|---|
| Sample | 107 industrial excess-heat deliveries to Swedish district heating, 1974–2014 (41 years); 74 still operating in 2014, 33 terminated; annual average delivery 19.9 PJ, of which 2.6 PJ from the terminated ones (13%) | abstract; Table 2 p.434 | VERIFIED |
| Heat pumps | 19 of 107 used heat pumps; 14 of those 19 terminated (vs 19 of 88 without); 1.4 of 2.6 PJ terminated volume was heat-pump-based | Table 2 p.434 | VERIFIED — a data centre at 25–35 °C is in this class |
| Size | no large delivery (>300 TJ/yr) was ever lost (0 of 16); small (<55 TJ/yr) 19 of 45 terminated | Table 2 p.434 | VERIFIED |
| Loss rate | the two major explanations for terminated delivery (terminated industrial activity; substitution by another heat supply) "correspond to approximately 6% of all annual average heat recoveries" | abstract | VERIFIED |
| Risk factors | small annual heat recovery; use of heat pumps when low-temperature heat was recovered | abstract | VERIFIED — both apply to a small air-cooled data centre, so the 6% is a floor for our case, not a ceiling |
| Conclusion on premium | "The risk premium of losing industrial heat recovery for this specific reason should be considered to be lower than often presumed in feasibility studies"; argument for a lower premium for large-scale recoveries (§5) | abstract; §5 | VERIFIED |
Register: `risk_term` 40 → 70 (peer-reviewed, Swedish context transferred); the register now carries two figures: 6% volume-weighted for the sector and 14/19 by count for heat-pump-based small recoveries.

## Wahlroos, Pärssinen, Rinne, Syri, Manner 2018, RSER 82:1749–1764 (future views on waste heat utilisation)
| item | value | where | status |
|---|---|---|---|
| Heat-pump capex | 500 EUR/kW_heat, "rather low", assumes a DH pipeline "very near" the DC; taken from Finnish sewage-water heat-pump experience, same size class (>10 MW heat) | p.1760 §5 | VERIFIED |
| Worked example (Table 2, Finnish average system) | servers 55 GWh/a; cooling 10 → 16 GWh/a with HPs; HP electricity 29 GWh/a (20 → 75 °C); heat recovered 71 GWh/a; 12 MW constant DH output; extra investment 5 MEUR; DH from DC incl. HP electricity 100 GWh/a; direct payback 5 years | p.1760 Table 2 | VERIFIED |
| HP to 75 °C, COP 3.5 | €420,000 more than reference case | abstract/§1 | VERIFIED |
| Operator payback claim | Bahnhof (Stockholm, Fortum network) "projected a return on investment between 3 and 5 years for the heat recovery" | p.1760 §5.1 | VERIFIED as quoted — operator claim |
| Roles | DC operator and DH operator "not operating with the same" expectations; DC business investment-intensive, economies of scale; DH operator regulated with lower return expectation | p.1757–58 §4 | VERIFIED |
Register: `capex_split` gains the 500 €/kW and 5-year figures; `window` floor gets a capex anchor (0.5 M€/MW agrees with Hiltunen & Syri 0.5–0.65).

## Ayuso-Virgili et al. 2023, Aquacultural Engineering 101:102314 (energy demand of a salmon RAS, simulated)
| item | value | where | status |
|---|---|---|---|
| Specific energy, constant flow | 9.589 kWh/kg; total 663.8 MWh for the grow-out | §4, p.9; Table 2 | VERIFIED |
| Shares, constant flow | pumps (RAS + oxygen cones) 45.48%; freshwater thermal energy 30.10%; blower 23.19%; lighting 1.21% | §4; Table 2 | VERIFIED |
| Freshwater thermal, adjusted flow | 2.905 kWh/kg of 8.827 kWh/kg total (33%) | Table 2; §3.3 | VERIFIED |
| What the thermal term is | heating the make-up freshwater only, between 5 °C and 12 °C (difference of thermal energy of freshwater), not tank or building losses | Table 2 note; §3.3 | VERIFIED — so heat_per_kg ≈ 2.9 kWh/kg is a lower bound for heat a data centre could supply |
Register: `aquaculture_tonnes` thermal coefficient 2.9 kWh/kg (heating make-up water, Norwegian climate, simulated) beside Luke's 4.6 kWh/kg; 50 → 70.

## Ion, Popescu, Coman et al. 2022, Energy Reports 8:11707–11714 (heat requirement in an indoor RAS)
| item | value | where | status |
|---|---|---|---|
| Case | indoor RAS, Galați, Romania: 6 tanks, 461 m² water surface, 706.5 m³ water; building 782 m² × 2.8 m | §3 | VERIFIED |
| Annual heat | 426,696 kWh/yr without heat recovery; 214,363 kWh/yr with exhaust-air and drainage-water recovery (€600 investment) | §5 | VERIFIED |
| Per m³ of tank water | ≈ 604 kWh/m³·yr without recovery; ≈ 303 with | our arithmetic | derived |
| Heat-loss shares | evaporation, ventilation, evacuated water, envelope; monthly split in Fig. 4 (January vs July) | §4 Fig. 4 | VERIFIED (figure not read numerically) |
| Literature range | 2.9–81.48 kWh/kg fish | §1 | VERIFIED |
No tonnage given, so no kWh/kg from this paper. Use it for a tank-volume route: heat ≈ 300–600 kWh per m³ of tank per year in a continental climate (Galați ≈ 2,700 HDD), scaled by HDD for Edmonton.

## Nistad 2020, NTNU MSc thesis (energy use and efficiency in RAS, Norwegian smolt facilities)
| item | value | where | status |
|---|---|---|---|
| Measured range | 5.1–12.8 kWh per kg live-weight smolt, mean 8.8 kWh/kg; ~30% saving available; 4–5 kWh/kg if biomass optimised | abstract; §4 | VERIFIED |
| Heat share, measured facilities | heat pump ≈ 10% of total energy; pumps ≈ 20%; oxygenation ≈ 20%; degassing 8%; "other" ~15% | §4.2 p.29 | VERIFIED |
| Heat share, model case (150 → 500 g) | 2.6 kWh/kg total; recirculation pump 23%; heat pump 15%; building heating and ventilation 15% | §2 p.10 | VERIFIED |
| Boiler → heat pump | 70–90% less energy for heating (boiler η 0.85, COP 3; COP up to 10 with heat exchangers); fleet mean 8.8 → 7.7 kWh/kg if all had heat pumps | §2.4.4; §4 Fig. 12 | VERIFIED |
Register: with heat pump electricity at 10–15% of 8.8 kWh/kg and COP 3, delivered heat ≈ 2.6–4 kWh/kg — consistent with Ayuso-Virgili 2.9 and Luke 4.6.

## Barroso, Hölzle, Ranganathan 2018, The Datacenter as a Computer, 3rd ed. (Morgan & Claypool / Springer)
| item | value | where | status |
|---|---|---|---|
| Build cost, Table 6.1 | $12–25/W Uptime small-to-medium (Tier I lower bound); $9–13/W Dupont Fabros 2010–11 (NJ1 $11.23, ACC6 $8.94, SC1 $12.56); $8–10/W Microsoft Dublin $9.85, Facebook Prineville $7.50 | p.129–130 | VERIFIED |
| Trend | Tier III historically $9–13/W; most recent constructions $7–9/W from DLR, CyrusOne, QTS 10-Ks | p.130 | VERIFIED |
| Partially filled data centre | scale capex and opex (excluding power) by the inverse of the occupancy factor; two-thirds full → 50% higher opex; half-full example: server TCO $8,981 vs $6,310 full ("all that for a server that we assumed cost just $2,000") | §6.5 p.135 | VERIFIED. The earlier recalled wording "half-full = 100% higher cost per watt" is not in the text; replaced |
| Chapter 1 recall | "$10–20 per watt (see Chapter 6)… can vary considerably" | p.? (ch.1) | VERIFIED |
Register: `build_cost` 50 → 70 ($7–13/W, 2010–2017 data, USD); new `reserved_cost` formula from §6.5.

## GWELLS export (BC Groundwater Wells and Aquifers), gwells.zip
| item | value | status |
|---|---|---|
| Files | well.csv (133,129 rows read; 130,975 with coordinates), lithology.csv, screen.csv, pt_aquifer_parameters.csv (pump tests: transmissivity, hydraulic conductivity, storativity, specific capacity, method), README.md | VERIFIED (files opened) |
| Useful fields in well.csv | well_tag_number, latitude_Decdeg, longitude_Decdeg, intended_water_use_code, diameter_inches, total_depth_drilled_ft-bgl, finished_well_depth_ft-bgl, bedrock_depth_ft-bgl, static_water_level_ft-btoc, well_yield_usgpm, yield_estimation_method_code / rate / duration, aquifer_id, specific_yield, aquifer_lithology_code, construction/decommission dates | VERIFIED |
| Wells inside City of Vancouver (bbox 49.19–49.32 N, −123.23 to −123.02) | 333; use codes mostly NA (271) / UNK (21); COM 12, DOM 8, OP_LP_GEO 2 (open-loop geoexchange); 208 with finished depth (median 59 ft, p10 16, p90 210); 114 with yield (median 0, p90 100 USgpm — many zero/unknown); 90 with static level (median 11 ft) | derived from export |
| Edmonton | not covered (BC dataset); Alberta equivalent is AWWID (retrieval guide F6) | — |
Register: new quantity `ground` (nearby well depth, static level, yield, aquifer id, lithology, pump-test transmissivity) at 80 for Vancouver, feeding `stored_heat` and `licence_flag`; the tool reads the nearest N wells to the parcel and reports the spread, never a point.

## Corrections carried into the register
1. Barroso §6.5 wording (above).
2. Lygnerud & Werner: "6%" is the share of annual average heat recoveries lost to the two main reasons combined over 41 years (13% counting all reasons, 33 of 107 cooperations) — not "6% per year". For a small, heat-pump-based recovery the table gives a much higher termination share (14 of 19), which is what a data centre resembles.
3. Ayuso-Virgili thermal share is 30.1% (constant flow) or 33% (adjusted), and covers make-up water only.
