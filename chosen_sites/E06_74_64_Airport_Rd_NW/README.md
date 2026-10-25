# E06 — 74 and 64 Airport Rd NW, Edmonton (Blatchford edge)

New Edmonton site (J.B., 25 Oct 2026), replacing E05 (8803 Stadium Rd NW) for the "grow" building. Data pack built the same way as E05 (site_models/build_sites.py, site_maps/site_pack.py), centred midway between the two lots' assessment points: 53.568862, −113.522429.

## The two lots (City assessment 2026)
| | 74 Airport Rd NW | 64 Airport Rd NW |
|---|---|---|
| Lot | 4,562.5 m² | 4,274.4 m² |
| Zone | BE | BE |
| Building on record | none (gross area 0; year 1991) | none (gross area 0; year 1991) |
| Assessed | $1,213,500 | $1,151,500 |
| Neighbourhood | Blatchford Area | Blatchford Area |
| Tool fit (each alone) | 3.6–10.3 MW, 2 floors, ~4,700 m² gross | 3.4–10.3 MW, 2 floors, ~4,400 m² gross |

Together about 8,840 m². The tool can't combine lots; a combined fit needs a new run. Owner: unknown (land title search needed).

## Files
- `E06_footprints.geojson`, `E06_heights.csv`: every building in the 1,000 m square (City 3D Buildings, downloaded 15 Oct 2026, and Rooflines 2019). 222 building parts.
- `E06_parcels_500m.csv`: 476 assessment points within 500 m.
- `E06_heat_receivers.csv`: 23 heat users within 1,500 m (tool rule: fuel bought × 0.85).
- `E06_substations.csv` (4 within 3 km; nearest 596 m), `E06_ev_chargers.csv` (3 within 1.5 km).
- `E06_pack.json`: the site's 100 m cell from the GP1 site maps.
- `E06_tool_fit.json`: the tool's fit for each lot.

## Data gaps — read before modelling
- **Blatchford's new buildings are missing from the 3D data.** The 1,000 m square has 0 buildings dated 2015 or later, but the assessment roll has **210 parcels built since 2015** in Blatchford Area (all BRH zone, the townhouses across Airport Rd). The City's 3D Buildings and Rooflines layers predate them. Don't estimate them: trace from aerials, or find a newer City or OSM layer, and label the source.
- **Blatchford homes aren't in the heat-receiver list** (the tool's list covers larger buildings), so heat demand next to the site is undercounted.
- **People counts lag:** households within 1 km (1,211) and population within 150 m (2) come from 2021 census data, before most of Blatchford was built.

## Scores vs E05 (GP1 site maps, 0–1 within Edmonton)
| | E05 Stadium Rd | E06 Airport Rd |
|---|---|---|
| Heat | 1.00 | 1.00 |
| Energy | 0.36 | 0.51 |
| Water | 0.12 | 0.00 |
| Materials | 0.59 | 0.38 |
| People | 0.85 | 0.11 (census lag, see above) |
| Overlap (mean of five) | 0.59 | 0.40 |
| Network | Downtown DE planned Phases 2–4, 860 m | Blatchford DESS, 0 m |
| Nearest substation | 2,012 m | 596 m |

The GP1 site maps rank E06 lower. They score heat by demand and distance to a network, not by network temperature or the money test, which is why E05 led. The move to E06 rests on the later finding: at Edmonton gas prices only a low-temperature network (no heat pump) pays. State that explicitly.
