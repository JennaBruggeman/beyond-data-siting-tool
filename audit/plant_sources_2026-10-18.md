# Plant items M30–M32: source check (18 Oct 2026)

## What an air-cooled hall's water runs at
- NREL for DOE FEMP, *Best Practices Guide for Energy-Efficient Data Center Design* (rev. July 2024, DOE/GO-102024-6283), government guide:
  - "A CRAH unit that uses 55°F or higher chilled water" (s. 5.2.1, p. 16); a medium-temperature loop of 55 °F or higher (s. 5.3.2).
  - Water-side economizers "most effectively" serve loops of 50 °F and above (s. 5.4.2).
  - Heat rejection "depends on the ambient dry bulb temperature" (s. 5.1); higher ASHRAE W-classes "may allow the use of dry coolers" (s. 5.6).
  - https://www.energy.gov/sites/default/files/2024-07/best-practice-guide-data-center-design.pdf
- Trane white paper DC-WPR006A (June 2026), MANUFACTURER CLAIM:
  - Free cooling needs outdoor air colder than the return water: full free cooling, hybrid (economizer plus chiller), and mechanical only when outdoor air is warmer than the return water (pp. 10–11).
  - Economizer coils on air-cooled chillers "require no additional footprint" (p. 7).
  - https://elibrary.tranetechnologies.com/public/commercial-hvac/Literature/White%20Paper/DC-WPR006A-EN_06302026.pdf
- ASHRAE facility water classes W17 / W27 / W32 / W40 / W45 / W+ (5th ed., 2021). Read only via an industry blog (Upsite); ASHRAE text not read.

## Dry-cooler approach and area (manufacturer claims)
| Unit | Rating | Approach (fluid out − air) | Footprint | m² per MW of heat |
|---|---|---|---|---|
| Thermokey GH2490.CX (sources/16) | 737.6 kW, 48 → 42.7 °C, air 32 °C | 10.7 K | 7.53 × 2.40 m | 24.5 |
| Mark AWSVN-58D-835M | 835 kW, 40 → 35 °C, air 25 °C | 10 K | 12.43 × 2.05 m (A × B; axes not labelled) | ≈ 30.5 |
| EVAPCO eco-Air EAVWD9120ZA | 4,680 MBH ≈ 1,371 kW, 110 → 100 °F, air 92 °F | ≈ 4.5 K | 39 ft 4⅞ in × 7 ft 3¾ in ≈ 12.0 × 2.23 m | ≈ 19.5 |
| Güntner GFD 090.2D (Deerfield MA submittal) | ≈ 2,524 kW, 115 → 100 °F, air 95 °F db / 80 °F wb | ≈ 2.8 K | 7.43 × 2.58 m | ≈ 7.6 (wet-bulb listed: likely adiabatic-assisted; not used) |

- A dry cooler cannot cool its water below the outdoor air. Rated units leave the water about 3–11 K above it.
- For liquid cooling (water about 30–45 °C) dry coolers alone cover almost all hours. Tool: CWEC 30 °C fluid = 7,675 h Vancouver, 7,846 h Edmonton; 40 °C = all hours.
- For air cooling (13 °C supply, about 18 °C return): full free cooling only when outdoor air is at or below about 8 °C. That is 3,284 h Vancouver and 5,522 h Edmonton in the CWEC year (my count). Summer peaks are 25.6 °C (Vancouver) and 29.0 °C (Edmonton), so chillers are needed for the full load.

## Sound (manufacturer claims)
- Güntner GFD 090.2D, about 2.5 MW, 10 fans at 1,200 rpm: LWA 98.5 dB(A); LpA 66 dB(A) at 30 ft (Deerfield submittal).
- Thermokey: Lw 102 dB(A) at 737.6 kW (sources/16).
- Trane RTAF air-cooled chiller, about 1 MW: 98 / 101 dB(A) low-noise / standard (tool R.lwUnit).
- Mark dB(A) values: basis not stated (pressure or power, distance unknown). Not used.

## Unread or blocked
- ASHRAE TC 9.9 liquid-cooling white paper (W-class equipment table).
- Güntner and EVAPCO full sound tables.
