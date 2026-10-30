# What it gives off: hand calculation (A) against the screen (B), 30 Oct 2026

A = `checks/emit_check/emit_check.json` (with `build_emit_check.py`). B = `checks/emit_check/screen/<LOT>_tabs.json` (tabs heat, energy, water, materials, social, opps2, opts, and the 22 opportunity cards).
Read-only. Nothing in the tool, register or A was changed. `tool/*.js` and `checks/agents/` were not opened, so causes are taken from screen text and arithmetic only.

## IT load: same split as the place stage

| Lot | A assumed | Tool used (`mw`) | Factor applied to A's linear figures |
|---|---|---|---|
| V09 | 2.5 MW | 9.6 MW | × 3.840 |
| E05 | 10.2 | 33.1 | × 3.245 |
| CLARK | 5.2 | 7.7 | × 1.481 |
| E123 | 22.2 | 21.9 | × 0.986 |
| V339 | 3.8 | 3.8 | × 1 |
| E06A | 10.2 | 10.2 | × 1 |
| E06B | 10.2 | 10.2 | × 1 |
| HAST | 1.1 | 1.9 | × 1.727 |

Rescaled (× factor): heat_rejected, heat_captured, heat_delivered, hp_electricity, evaporation, blowdown, water_behind_electricity, grid_co2 (and its heat-pump extra), generator_co2, generator_nox_pm, genset_test, genset_emission_rate, fuel_on_site, flexible_load, jobs, treatment_energy upper end, blowdown_recovery, heat_flux_site.
Not rescaled: shares and coefficients (pue, load_factor, liquid_capture, erf, wue, heat_temp, heat_in_water), climate hours, backup_hours, rainwater and stormwater_volume (roof or lot area).
noise_level is not linear: A's unit count (ceil IT MW to ceil facility peak MW) was recomputed at the tool's size.

Cross-check after rescaling: annual electricity matches on all 8 lots (V09 A 70.6–78.2 GWh, screen "71–78 GWh"; E123 A 161.1–178.4, screen "161–178"). Peak and average power on screen equal IT × 1.4–1.55 and × 0.6 exactly.

## Summary: part × verdict (8 lots each)

| Part | MATCH | DIFFERS | NOT SHOWN | NOT COMPARABLE |
|---|---|---|---|---|
| heat_rejected | 8 | | | |
| heat_temp | | 8 | | |
| liquid_capture | | 8 | | |
| cop | | | | 8 |
| heat_captured | | | 8 | |
| heat_delivered | | 8 | | |
| hp_electricity | | 8 | | |
| erf | | | 8 | |
| heat_in_water | | | 8 | |
| free_cooling_hours | | | 8 | |
| pue | 8 | | | |
| spare_capacity | | | | 8 |
| backup_hours | | 8 | | |
| flexible_load | | | 8 | |
| load_factor | 8 | | | |
| evaporation | | | | 8 |
| blowdown | | 8 | | |
| wue | | | 8 | |
| water_behind_electricity | 4 (Van) | 4 (Edm) | | |
| rainwater | | 5 | | 3 (V339, E06A, E06B) |
| grid_co2 | 8 | | | |
| generator_co2 | | | 8 | |
| generator_nox_pm | | | 8 | |
| refrigerant_co2e | | | | 8 |
| embodied_it | | | | 8 |
| embodied_building | | | | 8 |
| noise_level | | 8 | | |
| lf_flag | | | | 8 |
| light_at_window | | | | 8 |
| shadow | | | | 8 |
| ground | | | | 8 |
| visibility | | | | 8 |
| watched_area | | | | 8 |
| jobs | | 8 | | |
| treatment_energy | | | 8 | |
| blowdown_recovery | | | 8 | |
| pv_roof | | | | 8 |
| pv_facade | | | | 8 |
| genset_test | | | 8 | |
| hvo_swap | | | | 8 |
| fuel_on_site | | 8 | | |
| vibration_rank | | | | 8 |
| workload_control | | | | 8 |
| computing_served | | | | 8 |
| heat_flux_site | | | 8 | |
| heat_plume_dT | | | | 8 |
| genset_emission_rate | | | 8 | |
| air_screen_1h | | | | 8 |
| no2_at_receptor | | | | 8 |
| free_cooling_hours_2050s | | | 8 | |
| condensate | | | 8 | |
| stormwater_volume | 8 | | | |
| security_layers | | | | 8 |
| **Total (424)** | **44** | **81** | **120** | **179** |

## MATCH: what was compared

| Part | Screen text (quoted) | A (× factor) | Note |
|---|---|---|---|
| heat_rejected | energy tab "71–78 GWh a year" (V09); E05 "244–270", CLARK "57–63", E123 "161–178", V339 "28–31", E06A/B "75–83", HAST "14–15" | 70.6–78.2, 243.6–269.7, 56.7–62.7, 161.1–178.4, 28.0–31.0, 75.1–83.1, 14.0–15.5 GWh | Screen shows it as electricity; A equates heat rejected with electricity drawn. |
| pue | not printed; "13–15 MW power at the meter at full load" = 9.6 × 1.4–1.55 | 1.4–1.55 | Implied on all 8. Source list: "register: pue (LBNL 2023; Uptime 2025)". |
| load_factor | "about 8.1–8.9 MW on average" = peak × 0.6 | 0.6 | Implied on all 8. Source list: "register: load_factor (Fan et al. 2007)". |
| grid_co2 | V09 "1,279–1,416 t CO₂e a year at 18.1 g/kWh"; E05 "84,297–93,329 t … at 346.1" | V09 1,276–1,413; E05 84,298–93,330 | Within 0.3 % on all 8; same intensities (BC 18.1, AB 346.1). |
| water_behind_electricity (Van) | V09 "88,301–1,313,916 m³"; CLARK "70,825–1,053,870"; V339 "34,952–520,092"; HAST "17,476–260,046" | identical to the m³ | 1.25 to 16.8 L/kWh, both sides. |
| stormwater_volume | Van: V09 "about 118 m³ for the first 15 mm over the lot, released at 3.9 L/s"; CLARK 88 / 2.9; V339 68 / 2.3; HAST 94 / 3.1. Edm: E05 "331 m³ for the 100-year storm (447 for the 200-year), released at 30.9 L/s"; E123 546/738, 51.0; E06A 171/232, 16.0; E06B 161/217, 15.0 | V09 117.7 / 3.92; CLARK 88.3; V339 67.3; HAST 94.1; E05 330.1–446.3 / 30.8; E123 544.5–736.2 / 50.8; E06A 171.0–231.2 / 16.0; E06B 160.4–216.8 / 15.0 | Volume and release rate within rounding on all 8 (card "Stormwater held for the neighbourhood"). |

## DIFFERS

| Lot | Part | A (× factor) | Screen (quoted) | Gap | Likely cause |
|---|---|---|---|---|---|
| all 8 | heat_temp | air 25–35 °C; liquid 50–60 °C (register band, A marks unverified); measured return 35–40 in A's extra | heat tab "liquid to the chip: water leaves the servers at about 35–40 °C and returns at 24 °C (NREL's ESIF …)"; heat tab "air-cooled heat (25–35 °C)"; opts "air-cooled heat (25–47 °C)" | liquid high 40 vs 60 | Tool shows NREL's measured value, not the register's 50–60 band. Air 25–35 agrees on the heat tab; opts says 25–47 on the same lot: ? |
| all 8 | liquid_capture | 0.5–0.8 | opts sources "LBNL 2014, NREL — direct-to-chip 48–75%" | −4 % / −6 % | Tool uses the LBNL 48–75 % figures; A uses the register band 0.5–0.8 (A: "no primary for the band"). |
| V09 | heat_delivered | 45.4–93.9 GWh | "31–57 GWh a year with liquid cooling and a heat pump" | −32 % / −39 % | Screen = IT energy (IT × 0.6 × 8,760) × 0.48–0.75 × COP ÷ (COP − 1), COP 4.5 low, 3.0 high; rebuilt exactly. A = facility energy × 0.5–0.8 × same COP term. A's own register note says the formula overstates by the PUE factor; the tool uses IT heat. |
| E05 | heat_delivered | 156.6–323.6 | "107–196 GWh" | same | same |
| CLARK | heat_delivered | 36.4–75.3 | "25–46" | same | same |
| E123 | heat_delivered | 103.6–214.1 | "71–129" | same | same |
| V339 | heat_delivered | 18.0–37.1 | "12–22" | same | same |
| E06A, E06B | heat_delivered | 48.3–99.7 | "33–60" | same | same |
| HAST | heat_delivered | 9.0–18.6 | "6.2–11" | same | same |
| V09 | hp_electricity | 10.1–31.3 GWh | opts "Heat-pump electricity 6.9–19 GWh/yr" | −32 % / −39 % | follows heat_delivered (Q_out ÷ COP 4.5 / 3.0, both sides) |
| E05 / CLARK / E123 / V339 | hp_electricity | 34.8–107.9 / 8.1–25.1 / 23.0–71.4 / 4.0–12.4 | "24–65" / "5.6–15" / "16–43" / "2.7–7.5" | same | same |
| E06A, E06B / HAST | hp_electricity | 10.7–33.2 / 2.0–6.2 | "7.4–20" / "1.4–3.7" | same | same |
| all 8 | backup_hours | 12–48 h | opts "Standby fuel, 12 h" | high end 12 vs 48 | Tool fixes 12 h (A's low end, Uptime minimum); A's 48 h end is the operator claims. |
| V09 | fuel_on_site | 42,417–187,845 L | opts column at 9.6 MW: "42,417–46,961 L" | low exact; high −75 % | Screen = peak kW × 12 h × 0.263 L/kWh at PUE 1.4–1.55; A runs 12 h at PUE 1.4 to 48 h at PUE 1.55. |
| E05 / CLARK / E123 / V339 | fuel_on_site | 146,249–647,674 / 34,022–150,667 / 96,763–428,522 / 16,790–74,355 | "146,249–161,919" / "34,022–37,667" / "96,763–107,130" / "16,790–18,589" | same | same |
| E06A, E06B / HAST | fuel_on_site | 45,068–199,585 / 8,395–37,178 | "45,068–49,896" / "8,395–9,294" | same | same |
| V09 | blowdown (make-up) | hybrid: A make-up × 12.4 % wet share = 15,767–21,820 m³ | water tab "hybrid coolers: 15,767–29,094 m³"; "make-up water a year (2–6 cycles)" | low exact; high +33 % | Cycles: tool C = 2–6 (on screen), A C = 3–6 (femp example; register gives no C). High end ratio 2 ÷ 1.5 = 1.333 on every lot. |
| E05 / CLARK / E123 | blowdown | 45,595–63,100 / 12,646–17,502 / 30,167–41,749 | "45,595–84,134" / "12,646–23,336" / "30,167–55,665" | +33 % high | same (Edm wet share 10.4 %) |
| V339 / E06A, E06B / HAST | blowdown | 6,241–8,637 / 14,050–19,445 / 3,121–4,319 | "6,241–11,516" / "14,050–25,926" / "3,121–5,758" | +33 % high | same |
| E05 | water_behind_electricity | 304,454–337,074 m³ (1.25 L/kWh both ends) | "about 431,455 m³ … (Alberta 2021: 85% coal and gas at ~1.25 L/kWh, 3% hydro at ~16.8 …)" | +28 % on A high | Screen = high-end electricity × 1.60 L/kWh. Basis of 1.60: ? (the screen's own shares give 0.85 × 1.25 + 0.03 × 16.8 = 1.57). A's note: register has no Alberta value. |
| E123 | water_behind_electricity | 201,436–223,019 | "about 285,464 m³" | +28 % | same |
| E06A, E06B | water_behind_electricity | 93,820–103,872 | "about 132,956 m³" | +28 % | same |
| V09 | rainwater | 2,513–2,603 m³ (existing roof 2,806.5 m²) | "1,505 m³ of rain on the roof a year (ECCC Normals × 0.8 runoff, assumed)" | −42 % | Roof area: screen implies 1,620–1,680 m² at A's rain depths, against A's existing footprint. The tool also gives a roof on vacant lots (V339, E06A/B), so it is not the existing building; which roof it uses: ? |
| E05 | rainwater | 275–352 (roof 1,042 m²) | "1,506 m³" | +328 % | same; implied roof 4,460–5,720 m² |
| CLARK | rainwater | 1,758–1,821 (roof 1,963.5 m²) | "3,957 m³" | +117 % | same; implied 4,270–4,420 m² |
| E123 | rainwater | 1,523–1,954 (roof 5,781.7 m²) | "4,518 m³" | +131 % | same; implied 13,370–17,150 m² |
| HAST | rainwater | 5,216–5,404 (roof 5,825.5 m²) | "5,601 m³" | +3.6 % | same; implied 6,040–6,260 m² |
| V09 | noise_level | combined Lw 108.0–112.8 dBA (10–15 units × 98–101) | social "11 air-cooled chillers … rated 113–117 dBA together"; "Lw per unit 102.8–106.1 dBA" | +5.0 / +4.2 dB | (1) unit rating: screen Vertiv 102.8–106.1 ("our conversion from Lp at 1 m"), A Trane 98–101 (claim); which the register now holds: ? (2) count: screen = ceil(peak ÷ 1.49 MW) + 1 on all 8, though labelled "about one unit per MW". A's Lp at the nearest residential parcel is not on screen; the screen gives distance to the limit instead. |
| E05 | noise_level | 113.3–118.2 (34–52 units) | "36 … 118–122 dBA" | +4.7 / +3.8 | same |
| CLARK | noise_level | 107.0–111.8 (8–12) | "10 … 113–116" | +6.0 / +4.2 | same |
| E123 | noise_level | 111.4–116.3 (22–34) | "24 … 117–120" | +5.6 / +3.7 | same |
| V339 | noise_level | 104.0–108.8 (4–6) | "5 … 110–113" | +6.0 / +4.2 | same |
| E06A, E06B | noise_level | 108.4–113.0 (11–16) | "12 … 114–117" | +5.6 / +4.0 | same |
| HAST | noise_level | 101.0–105.8 (2–3) | "3 … 108–111" | +7.0 / +5.2 | same |
| V09 | jobs | 17.1–34.3 FTE | "8.3–27 operating jobs (Virginia ratio, transferred)" | −51 % / −21 % | Route: screen = MW × 290–630 m² hall per MW ÷ hall share 0.72–0.48 ÷ 464.5 m² per job (JLARC, in the part's sources); A = MW × 50–100 ÷ 28 (Ark UP4 applicant claim, not in the part's sources) because floor area is size stage. |
| E05 / CLARK / E123 / V339 | jobs | 59.1–118.2 / 13.7–27.5 / 39.1–78.2 / 6.8–13.6 | "29–94" / "6.7–22" / "19–62" / "3.3–11" | about −51 % / −21 % | same |
| E06A, E06B / HAST | jobs | 18.2–36.4 / 3.4–6.8 | "8.8–29" / "1.6–5.4" | same | same |

## Sub-figure checks (not one of the 53 verdicts)

| Item | Screen | A | Result |
|---|---|---|---|
| Heat-pump carbon (grid_co2 extra) | V09 "6.9–19 GWh/yr → 125–342 t CO₂e/yr"; E05 "8,258–22,580 t" | 182–565 t; 12,043–37,332 t | differs by the heat_delivered cause |
| Hybrid wet share | "wet only above 18 °C, 12.4% … Vancouver and 10.4% … Edmonton (CWEC, computed)" | free_cooling_hours_2050s extra, hours > 18 °C now: 1,085 / 914 h = 12.4 % / 10.4 % | match |
| Evaporation rate | "at most 1.5 L per kWh of heat (towers)" | 1 ÷ 2,400 kJ/kg = 1.5 L/kWh | match; default design shows "none", so evaporation is NOT COMPARABLE |
| Make-up low end | V09 hybrid low 15,767 m³ | 15,767 | now exact; the place check found +10.7 % (17,456). Changed since that check. |
| embodied_it basis | "16,000 servers at about 600 W"; "Making those servers 27–50 kt CO₂e" over 25 years | 4,177 kg × 10–15 % per server | same per-server basis (16,000 × 4,177 × 10 % × 4 = 26.7 kt; × 15 % × 5 = 50.1 kt); A gives no total |
| pv_roof per m² | V09 "1.9–2.4 kWp on 12 m² … 1.7–2.4 MWh" = 142–200 kWh/m²; E05 288 m², 44–71 MWh = 153–247 | 142.7–201.4; 151.0–248.8 | match per m²; A has no roof area, so NOT COMPARABLE |
| COP range | V09, V339 money gate "BC Hydro 6.79 ¢ ÷ COP 3.0–4.5"; heat figures imply 4.5 / 3.0 | register range 3.0–4.5 | match; the per-building "COP 4.6–5.7" (Lorenz) has no A counterpart |
| flexible_load basis | card "BC Hydro 2026 Call: curtail ≥10% on 24 h notice"; "events up to 4 h" | 10 % × 4 h low end | rule matches; no MW·h figure on screen |
| Rain on worked-example rows | V09 water tab "Vancouver, modelled … about 4,003 m³/yr" (CLARK lot), "Edmonton … about 3,608" (E123 lot) | CLARK tab "3,957", E123 tab "4,518" | screen disagrees with itself (−1 % / −20 %): ? |

## NOT COMPARABLE

- A not computable (15 parts × 8): cop, spare_capacity, refrigerant_co2e, embodied_it, embodied_building, lf_flag, light_at_window, shadow, ground, pv_roof, pv_facade, hvo_swap, heat_plume_dT, air_screen_1h, no2_at_receptor. The screen shows figures for some (pv_roof, embodied_it, cop per building); bases checked above.
- Qualitative in A (6 × 8): visibility, watched_area, vibration_rank, workload_control, computing_served, security_layers. watched_area text agrees in kind ("seen only on site … recorded as one person's account").
- evaporation (8): default design is air-cooled, screen "none … at most"; only the rate is comparable (match).
- rainwater (3): V339, E06A, E06B have no building, so A is not computable; screen gives 628, 754, 706 m³.

## NOT SHOWN

No figure for these parts in any tab or card on any of the 8 lots (source lists excluded):

- heat_captured: only the heat after the heat pump is shown.
- erf, wue, heat_in_water, free_cooling_hours, free_cooling_hours_2050s, heat_flux_site.
- condensate: only the add-on label "Condensate to cooling water".
- flexible_load: rule only (see sub-figures).
- generator_co2, generator_nox_pm, genset_test, genset_emission_rate: "Standby generators: testing, emissions, sound — Explore" was not open; opts shows only the rule "exempt if ≤ 1 h a month in daytime, ≤ 80 dBA".
- treatment_energy, blowdown_recovery: only a precedent line ("Quincy Water Reuse Utility … since 2021").
