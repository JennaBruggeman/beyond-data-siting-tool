# Resident step 0: the data-centre inventory in the tool (12 Nov 2026)

`tool/data/facilities.json`, built by `checks/tests/inventory_load.py` from `checks/research_arch_v1/inv_van.md` and `inv_edm.md` (research 2–3 Nov 2026, check 2) and the main chat's addresses and floors (Claude Link `RESIDENT_addresses_floors_2026-11-12.md`). Register part `resident_facilities` (patch `register/patches/resident_facilities_2026_11_12.py`, 58 sources added, 63 cited). Nothing shows on a card yet.

## Weaknesses first
- **Vancouver places by address, not by coordinates.** No row has coordinates. Each is placed on the first parcel the tool's own address search finds (our method, labelled). Some addresses match several parcels (701 W Georgia: 9; 308 E 5th: 5; 111 E 5th: 4), so the dot may sit on one part of a larger site.
- **Two Vancouver rows can't be placed:** eStruxture VAN-1 (55 E 7th Ave is not in the City's address records; 53 E 7th is, but that would be a guess) and the TELUS Garden data centre (building not named in any source).
- **3448 Cornett Rd** is placed at 2772 Natal St, its former address in the City's records (as the inventory gives it).
- **Hut 8 VAN2 (701 W Georgia)** rests on a directory listing (proxy confidence 40), labelled; that sets the part's confidence at 40.
- **One size figure per facility, but not one kind.** MW of IT, site capacity, design and grid requests are mixed. Each carries its scope and label, so the report chart can use one kind at a time. Where operator figures differ (VAN1 400 vs 520 kW; VAN4 4 vs 6.5 MW; Qu EDM1 1 vs 2.5 MW), the range is kept.
- **Edmonton is placed by the City permit geocode only** (no lot ids: Edmonton lot geometry is licensed). Three Edmonton rows have no location and aren't placed (ThinkTel, Sovereign Cloud, EETP).

## Counts
| | Vancouver | Edmonton region |
|---|---|---|
| Rows | 25 | 21 |
| On the map | 17 | 9 |
| In the city, not placed | 2 | 3 |
| Outside the map (listed, no dot) | 6 (Burnaby 4, Coquitlam 1, UBC 1) | 9 (Acheson, Sturgeon, Parkland, Leduc County, Fort Saskatchewan) |
| Status | 17 operating · 2 approved · 2 proposed · 1 permitted · 1 use approved · 1 rezoning · 1 ? | 6 operating · 4 ? · 1 closed · 1 announced · 1 plant approved · 8 proposed |
| Type | 10 inside a tower · 13 stand-alone · 2 not confirmed | 4 inside a building · 11 stand-alone · 6 not confirmed |
| Floors named by a source | 5 (VAN1 floor 9; eStruxture VAN-2 floor 26 + one unnamed; Spencer 6, 8, 9; VAN2 floor 2; Hut 8 Vault basement) | 3 (Qu EDM1 floor 3, our reading; Wolfpaw floor 3; EPCOR P1) |
| Towers with floors not published | 5 | 1 |
| Fenced site (sourced) | 2 (VAN3, eStruxture VAN-3) | 1 (Qu EDM2) |
| One size figure | 13 | 10 |

Field fill (cells not "?"): Vancouver address 23, operator 25, status 25, building 24, size text 22, cooling/power 21, heat reuse 18, serves 23, opened 7; Edmonton address 21, operator 17, status 21, building 17, size text 15, cooling/power 12, heat reuse 4, serves 17, opened 6.

The status counts match the inventories' own summaries (Vancouver: 17 operating, 2 approved, 2 proposed, 1 permitted, 1 use approved, 1 rezoning, 1 "?"; Edmonton: operating 6, "?" 4, closed 1, announced or plant approved 2, proposed 8).

## Checks
Register rebuild clean (no unrecorded sources); `register_wiring.js`: every number in the new file has a register id; golden identical; F1 gate clean.
