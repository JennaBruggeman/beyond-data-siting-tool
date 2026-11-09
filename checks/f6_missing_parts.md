# F6: logic parts for the 28 cards with no link (8 Nov 2026, step 1: the list)

Inventory: `checks/tests/f6_figures.js` read every figure on every card (both example lots). 49 cards; 21 already link to parts. Of the 28 without links:

- **4 Resident cards have no figures yet.** The template isn't built; Resident step 0 loads the facility inventory. Nothing to link until then.
- **13 cards need only a mapping** to parts that already exist.
- **3 Report cards** show page counts. These are the tool's own output, not register figures, so they link to the existing report step (`tradeoffs`, `ledger`).
- **8 cards need new parts.** There are 14 new parts in all, with their register sources below.

## A. Map to existing parts (no new part)
| Card | Figures → parts |
|---|---|
| Engineering, Architecture · Your city (2) | zone allowed → `zoning_status` |
| Engineering, Architecture · Your parcel (2) | address, lot area → `parcel`; zone → `zone`; conditional / rezoning → `zoning_status` |
| Architecture · What the lot allows | height, FSR, area inside the yards → `envelope`, `floor_area`, `plot_ratio`; yards by edge → `envelope`; "no data storage except entrances" → `zoning_status`; ground-floor rule → `storey_min` |
| Architecture · Pick a typology | typologies in the library, minimum ground → `arch_program_catalogue`, `typology_spec_rules`; conditional / rezoning → `zoning_status` |
| Architecture · Variant and add-ons | refuge placements → `arch_placement`; ground the heat hub needs → `arch_space_budget` |
| Architecture · The numbers | floor area → `floor_area`; MW tested → `size_fit`; MWh/yr → `heat_delivered` |
| Architecture · What's left for neighbours | GWh/yr left → `arch_heat_budget`; receivers within reach → `receivers_nearby`; NEU / Blatchford service area → `competing_sources` |
| Architecture · Heat flow | offered → `heat_delivered`; used in programs, left → `arch_heat_budget`; MW IT → `it_load_actual`; °C → `heat_temp` |
| Architecture · Drawing styles | storeys, height limit → `storey_min`, `envelope` |
| Architecture · Compare | GWh/yr offered in each city → `heat_delivered` |
| Municipal, Engineering, Architecture · Report (3) | the report step (`tradeoffs`, `ledger`); page counts are the tool's own output |

## B. New parts (proposed ids, what they hold, register sources)
| New part | Cards | Formula / what | Sources (register ids) | Trust |
|---|---|---|---|---|
| `zoned_land` | Municipal · Industrial land and jobs | area of the zones where a data centre is allowed; this lot's share | City zoning layers (`edmZoningGeo`; Vancouver zoning layer: id ?), `vanDistricts`, `edm_matrix` | 80 |
| `industrial_jobs` | same | jobs on that land | none: gap ("not in the tool yet") | 0 |
| `programs_nearby` | Architecture · Programs nearby | libraries, community centres, recreation within 1 km, nearest named | `odrsf`, `vanPublicRooms2026` (Edmonton libraries ?) | 80 |
| `site_grade` | Architecture · Ground and flood; Plant and site | ground median; corner and street grades (CGVD28 GVRD) | `van_lidar2022_ground` (Edmonton ?) | 80 |
| `flood_level` | Ground and flood | flood construction level, share of lot in the floodplain | `van_f014`, `van_floodplain` (Edmonton: none loaded) | 90 / 80 |
| `hub_layout` | Governing principle; Rooms; Program diagram | bands street → rear, rooms per storey, ladder step, net area after stairs and lifts | `r_hub_v1` (spec Part 3 rules 1, 2, 15), `arch_dc_hall` | 60 |
| `t_reach` | Rooms | spec 15d reach test | spec 15d (`r_hub_v1`) | 100 (test) |
| `dead_ends` | Rooms | centreline dead end ≤ 6 m | VBBL 3.3.1.9.(5) (source id ?) | 90 |
| `room_widths` | Rooms | clear width ≥ the table minimums; refuge parts under 2.4 m not counted | room_minimums_rule_2026-11-08 (register id ?) | 20–90 by row |
| `fire_separations` | Separations | hours by wall and floor | `arch_nbc3131` (VBBL Table 3.1.3.1), NFPA 75/76 room (`fire_protection`) | 90 |
| `travel_distance` | Exits | worst travel along the path ≤ 45 m | VBBL 3.4.2.5 (source id ?) | 90 |
| `exit_separation` | Exits | exits apart ≥ ½ diagonal (or 9 m) | `arch_sec_nbcExits`, `arch_nbc3442` | 90 |
| `plant_clearances` | Plant and site | Vertiv clear zones, set and pad spacing, tank distances | `vertivAFC`, `arch_csa_c282`, `arch_csa_b139`, `arch_dc_fm0532rooms` | 90 / 50 |
| `building_height` + `step_free_entry` | Plant and site | roof − base surface (both triangulations, lower); slab vs sidewalk ≤ 13 mm or slope | Z&D s. 2 (`van3575s2`), VBBL 3.8.3.2.(3), `van_lidar2022_ground` | 60 |

Already linked once these exist: Plant and site's generators, chillers and loading (`generator_sets`, `cooling_units`, `loading_need`, `chiller_winter_range`). On the Program diagram: programs asked for (`arch_space_budget`) and the data hall (`arch_dc_hall`).

## Questions before adding
1. Each new part takes its trust from its lowest input (CLAUDE.md §3). Are the proposed ratings right?
2. Four sources are marked "id ?": the Vancouver zoning layer, VBBL 3.3.1.9 and 3.4.2.5, and the room-minimums rule. Should they be registered as new sources in the same patch?
3. Report page counts: link them to the report step, or show them without a link?
