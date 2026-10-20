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
| Emergency water | Opportunity, Water | — (NFPA not read) | allowed (non-potable) | approval (drinking water to neighbours = private utility waterworks, Reg 277/2003) |
| Condensate | Add-on, Water | hours with dew point > 15 °C (CWEC) | allowed (VBBL 2025 Table 2.7.1.3, Column B) | not yet read |

## Computed here (not from a source)
- CWEC: hours a year with outdoor dew point above 15 °C: Vancouver 417, Edmonton 117.
- Snow (ECCC normals 1991–2020, replacing the CWEC estimate): days with ≥ 1 cm on the ground Vancouver 8.2, Edmonton 145.1; snowfall 36.6 and 126.7 cm.
- Dew point from normal vapour pressure (July 1.5 and 1.4 kPa): about 13 and 12 °C.
- Flow to carry heat: 24–49 L/s per MW at a 10–5 °C rise (K, derived).
- RS 2290: 2 MW ÷ 24 kW = at least 84 households to reach the cap.

## Labelled as reasoning or analogue
- Backup power: "only the spare unit could serve others" is reasoning, not sized.
- Vancouver snowmelt uses Seattle from ASHRAE 2015 ch. 51 (no Canadian city listed): 420–647 W/m² at 99%; Edmonton keeps NRC CBD 160 (1974), Edmonton's own figures.
- Stormwater uses the whole lot as hard surface (upper bound); Vancouver's full 10-year volume not computed.

## Templates (tiers confirmed by J.B., 19 Oct)
Resident: snowmelt_area, fire_water, backup_neighbours, community_solar. Community: clean_power_price, chp_heat, stormwater_volume, grid_refund. Full: condensate. Counts now 45 / 125 / 195.

## Gaps
NFPA 1142 volumes; Alberta PPA strike prices; Electric Utilities Act text (law-firm summary used for self-supply).

## Correction (19 Oct)
Alta Reg 117/2026 was already in the register (alta117_2026, J.B. PDF 16 Oct); research note L wrongly called it blocked and I used a law-firm summary. J.B. re-uploaded it; read in full and the gas-plant add-on now cites it directly. All the summary's points held; the regulation adds s. 7 (AESO may require zoning approvals and water licences) and expiry 31 May 2035.

## Correction 2 (19 Oct): codes already held locally
data/raw/codes holds BCBC 2024, NBC 2020, NFC 2020, NFC 2023 Alberta Edition, VBBL 2025 (Books I and II) and the Electric Utilities Act. I asked J.B. to download some of these again by mistake. Now read from the local copies: BCBC 3.2.5.7 and its note (firefighting water; sprinklered buildings deemed to comply), the NFC(AE) cross-reference to the same NBC(AE) clause, EUA s. 1(1)(vv.1) and 2(1)(b) (self-supply, replacing the law-firm summary), and VBBL Table 2.7.1.3 (condensate as cooling-tower make-up: allowed, already in the register as vbbl2025_272).

J.B. upload 19 Oct: Electric Utilities Act from CanLII, current to 6 Feb 2026, the same version as the local copy (no change). Potable Water Regulation 277/2003 read and added.

J.B. uploads 19 Oct (late): Activities Designation Regulation (registration if passing on city water, approval if own source), ASHRAE 2015 ch. 51 (kept local, not shared), BC Hydro Tariff Supplement 6 (transmission refund rules, 1991 filing).

J.B. upload 19 Oct (late): Edmonton 2026 Planning and Development Fee Schedules — already held (data/, edmFees2026, used for rezoning); its encroachment fees (Bylaw 12513) now added to the snowmelt card.

20 Oct: Vancouver shoreline in (CanVec 50K Hydro BC: ocean, Fraser River and its side channels, extracted on J.B.'s computer; tool/shore.json). Distance to the water: 1425 Clark Dr about 1,380 m (False Creek), 555 W Hastings about 560 m. CanVec source maps date from the 1980s on, so recent fill and seawalls may differ.
