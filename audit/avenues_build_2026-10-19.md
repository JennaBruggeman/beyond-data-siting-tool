# Ten avenues built into the tool (19 Oct 2026)

J.B.: "all of the things we've listed are supposed to be part of the tool." Research: `research_2026-10-19/K_water_body_cooling.md`, `L_power_avenues.md`, `M_water_avenues.md`. Register script: `add_avenues_2026_10_19.py`.

## Where each one sits

| Avenue | In the tool as | Site figure computed | Vancouver rule | Edmonton rule |
|---|---|---|---|---|
| New clean power (PPA) | Add-on, Energy | GWh a year; share of BC Hydro's 2025 call | not yet known (no direct route found) | allowed |
| Own gas plant with heat (CHP) | Add-on, Energy | MW of heat at 0.8–2.0 per MW of power | approval | allowed |
| Backup power for neighbours | Opportunity, Electricity | nearest community centre (Vancouver) | approval | not allowed (EPCOR T&C s. 4.4) |
| Grid upgrades shared | Opportunity, Electricity | nearest substation | allowed (refund reviews yr 5/10/15) | allowed (AESO refund discretionary) |
| Solar on neighbours' roofs | Opportunity, Electricity | yield per m² of roof | allowed (RS 2290, ≤ 2 MW, credits) | approval (own use only) |
| Sea or river cooling | Add-on, Water | L/s per MW | approval | approval |
| Stormwater held | Opportunity, Water | m³ and L/s from the lot area | allowed (required) | allowed (required > 0.16 ha) |
| Snowmelt with server heat | Opportunity, Heat | m² kept clear; snow days (CWEC) | not yet read | approval (encroachment) |
| Emergency water | Opportunity, Water | — (NFPA not read) | allowed (non-potable) | not yet researched |
| Condensate | Add-on, Water | hours with dew point > 15 °C (CWEC) | not yet known | not yet read |

## Computed here (not from a source)
- CWEC: hours a year with outdoor dew point above 15 °C: Vancouver 417, Edmonton 117.
- Snow (ECCC normals 1991–2020, replacing the CWEC estimate): days with ≥ 1 cm on the ground Vancouver 8.2, Edmonton 145.1; snowfall 36.6 and 126.7 cm.
- Dew point from normal vapour pressure (July 1.5 and 1.4 kPa): about 13 and 12 °C.
- Flow to carry heat: 24–49 L/s per MW at a 10–5 °C rise (K, derived).
- RS 2290: 2 MW ÷ 24 kW = at least 84 households to reach the cap.

## Labelled as reasoning or analogue
- Backup power: "only the spare unit could serve others" is reasoning, not sized.
- Vancouver snowmelt uses Portland, Oregon design heat as the nearest published climate.
- Stormwater uses the whole lot as hard surface (upper bound); Vancouver's full 10-year volume not computed.

## Templates (tiers confirmed by J.B., 19 Oct)
Resident: snowmelt_area, fire_water, backup_neighbours, community_solar. Community: clean_power_price, chp_heat, stormwater_volume, grid_refund. Full: condensate. Counts now 45 / 125 / 195.

## Gaps
Shoreline file (distance to water); NFPA 1142 volumes; Alberta fire and potable-water rules; Alberta PPA strike prices; Alta Reg 117/2026 and EUA text (blocked; law-firm summaries used).
