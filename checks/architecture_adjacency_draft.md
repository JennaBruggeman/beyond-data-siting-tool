# Adjacency rules for Architecture mode: draft (31 Oct 2026)

From checks/research_arch_v1/adj_occupancy.md, adj_service.md, adj_programs.md, spatial_rules.md, separations.md, zoning.md; independently checked in adj_check.md (corrections applied below). Codes: NBC 2020, BCBC 2024, VBBL 2025, NBC(AE) 2023, NFC 2020, NFC(AE) 2023 — wording the same in all four building codes unless noted.

## The data centre's own class (decides most of the rest)
- No code names a data centre. NBC examples: electrical substations F-2, power plants F-3; the F-2/F-3 line is fire load 1,200 MJ/m². VBBL's upgrade table lists "Computer Centres" as Group D (an existing-building note only). No quantity of batteries or fuel makes it F-1.
- Tool assumption until settled: **F-2 (?)**, the stricter reading. Shown as "?" with the alternatives.

## The data hall itself
- Building code: no rating for the hall as such. NFPA 75 (6.1.3.2): IT equipment area separated by "not less than 1 hour" (from NFPA's public record; standard paywalled). J.B. understands 2 h: operator or insurer practice (FM Global 5-32, not read ?). Tool (J.B., 1 Nov 2026): **assume 2 h**, labelled "operator and insurer practice (J.B.)". FM Global 5-32 (read 1 Nov 2026): 1 h walls around each data room, network room and generator room; **2 h between data rooms** where there are several; ¾ h doors, few windows; walls slab to slab.
- Service rooms: electrical 1 h (3.6.2.1); diesel equipment 1 h (3.6.2.1.(5), our reading); life-safety generator room 2 h (3.6.2.8); transformer vault 3 h, or 2 h sprinklered (3.6.2.7); indoor fuel tanks: 2 h dedicated room, limits by storey (NFC 4.3.13–4.3.14). No service room directly under a required exit (3.6.2.2) or opening into an exit (3.4.4.4.(7)).
- Batteries/UPS: no clause in any of the six codes; electrical code via Alberta STANDATA: 3 m from exits, 1.5 m from openings.

## Program next to the data centre (if F-2)
| Program | Its class | Separation to F-2 | Other rules |
|---|---|---|---|
| Refuge / community room (day use) | A-2 | 2 h | Patrons may not exit through a service space, kitchen or storage (NBC(AE) 3.3.1.3.(10), Alberta) |
| Refuge with overnight sleeping | C (our reading) | 2 h | **An F-2 building may hold only one residential suite (3.1.3.2.(2))**, so an overnight shelter needs its own building |
| Public ground floor: library, studios | A-2 | 2 h | Vancouver: every ground-floor street-access suite 2 h to suites beside and above (VBBL 3.3.1.1.(5)) |
| Café | A-2 (seating) | 2 h | Vancouver: kitchen exhaust within 3 m of a lane or property line needs an ecology unit, not over outdoor seating (VBBL 6.3.1.6) |
| Shops, laundromat | E | none (Table 3.1.3.1) | — |
| Industrial laundry | F-2/F-3 | none | Dryer exhaust rules (stricter in Alberta) |
| Pool | A-3 (?) | 2 h | Pool chemicals are oxidizers: over 250 kg a 2 h room, separate compartment from diesel and acids (NFC Table 3.2.7.6). Alberta only: chlorine-gas room at grade, outside door, 1 h, exhaust 3 m from intakes |
| Greenhouse | F-2/F-3, or A-2 if public (not Group G: that needs farm land) | 2 h if A-2 | A dome-type greenhouse can't sit on a roof (3.1.18.2.(1)) |
| Housing | C | 2 h | Only one suite in an F-2 building (3.1.3.2.(2)); Vancouver's flex-space exception caps F-2 under housing at 500 m² (3.1.3.5); noise bylaws don't protect units on the same lot |
| Childcare | A-2 | 2 h | Edmonton: not in a building bay next to Minor Industrial (s. 6.40.1.1); play space 2 m from equipment and exhaust. Vancouver: play area ≤55 dB(A) 24-h, rooms ≤45; no exhaust beside play areas; 3 h of winter-solstice sun. Metro Vancouver: no Tier 0/1 engines within 100 m of a day care |

## Stacking and separate buildings
- Assembly above F-2 is allowed: 2 h floor, sprinklers through all storeys below (3.2.2.7); the 10 % small-use exemption never applies to F-1 or F-2.
- Separate buildings on one lot: spatial separation by limiting distance (3.2.3). A firewall between them is 4 h, masonry or concrete, where F-2 is on either side (3.1.10.2).
- Egress: no exit through a lobby onto which an industrial room opens (3.4.4.2.(2)(c)). Vancouver allows public-corridor egress through a D suite under conditions (3.3.1.13.(11)), not through F-2.

## Air and distances
- Combustion exhaust 3 m from intakes, doors, operable windows, outdoor spaces people use (6.3.3.1.(2)); for diesel it may instead fall under 6.3.3.1.(1) via CSA B139 (unresolved ?).
- Air intakes 7.6 m from a truck loading dock (Table 6.3.2.9). Vancouver: MERV 13 on outdoor air (VBBL).
- Fuel tanks outdoors: 3 m to property lines and buildings (1.5 m up to 50,000 L; Alberta 80,000 L); fuel truck left over 1 h: 15 m from buildings.
- Generators: Metro Vancouver Bylaw 1329, no Tier 0/1 engines within 100 m of a hospital, elementary school, day care or community care facility. Edmonton s. 7.140: risk assessment possible for sensitive uses within 1.5 km of dangerous-goods storage (our reading for diesel ?).
- Alberta food code: 30 m from "potential sources of contamination" ("should"; generators counting is our reading ?).
- No Canadian distance for transformers (EMF) or dry coolers.

## Searched and not found (absence recorded)
- Any code clause naming a data centre; any battery/UPS clause in the six codes; a BC/AB distance from generators to housing; a rule keeping a refuge reachable when the host building is locked; BC reception-centre siting criteria.

## Open
- The data centre's class (F-2 / F-3 / D).
- Whether IT standby generators count as "emergency generators" (NFC 4.3.13.1).
- BC Fire Code 2024 text not in the repo.
- Paywalled: see checks/paywalled_standards.md.

## Insurer guidance (FM Global 5-32, Jan 2026; not law, but what an insured operator is held to)
- Generators: separate building first, then the yard, then ground floor; **never on the roof or in a basement**.
- Diesel tanks: buried first, then outdoor above ground; never inside, in the basement or on the roof. 24 h of fuel.
- Flood: site above the 500-year flood level plus 0.3–0.6 m freeboard; 152 m from wave impact.
- Air: the data hall's air system independent of other spaces; data rooms kept at positive pressure to neighbours; intakes not exposed to combustibles.
- Ceilings at most 9 m.

## NFPA 37 (2024), US benchmark
- Generator rooms inside a building: 1 h walls, floors, ceilings; attached rooms 1 h common wall; fire doors and dampers on openings.
- Outdoors or on a roof: 1.5 m from any opening in a wall (no exception); 1.5 m from combustible walls unless that wall is 1 h, or a fire test or calculation shows it's safe.
- Detached generator building: 1.5 m from openings and combustible walls, unless a wall is 1 h or the generator building is sprinklered.
- Roof units need an oil-containment curb and a noncombustible surface 300 mm beyond. NFPA 37 allows roofs; FM 5-32 advises against.
- Fuel indoors: over 2,500 L per tank, or 5,000 L in total, needs its own room.

## NFPA 75 (2024), US benchmark
- The IT area is separated from other occupancies by rated construction, **at least 1 h**, slab to slab; doors ¾ h (1 h walls) or 1½ h (2 h walls). A fire risk assessment can set another separation.
- Not above, below or beside hazardous processes unless protected.
- Access restricted to authorized persons.
- A window into the hall (e.g. a public viewing window) is allowed only as a fire-rated window or with a fire shutter that closes automatically on smoke or fire.
- Only IT and support equipment in the IT room; sprinklered building; leak removal under the IT floor.
- The risk assessment must cover people in adjacent spaces and the public.
- Fuel rooms (NFPA 37): up to 5,000 L, 1 h room, 1 h self-closing door, 380 mm round each tank, vented outside; over 5,000 L, 3 h room and doors.
- Tank fill and vent pipes: at least 600 mm from any building opening at the same or lower level. Tanks, vents and fuel piping not near the engine's air intake or exhaust.
- Generator exhaust: NFPA 37 sets **no distance** to windows or air intakes, only "a safe location" and not toward combustibles. So the distance still comes from the building code's 3 m (6.3.3.1.(2), our reading) or ASHRAE 62.1 (not read).

## NFPA 855 (2026), US benchmark: UPS batteries
- Applies above 20 kWh of lithium-ion; the UPS exemptions cover only lead-acid and similar, **not lithium-ion** (our reading).
- Indoors: groups of at most 50 kWh, 0.9 m apart and from walls; may share the room with the equipment they serve; locked cabinet or authorized-only room; never in or opening onto sleeping rooms (matters for an overnight refuge or housing).
- Outdoors (battery containers in the yard): 3 m from lot lines, public ways, buildings, combustibles (0.9 m with a 1 h barrier, a blank noncombustible wall or a 2 h enclosure); battery exhaust 4.57 m from intakes, windows, doors, loading docks; 3 m from exits.
- Roof: 1.5 m from the edge, 3 m from the fire access point, 3 m from neighbouring buildings and lot lines.
- Dedicated battery building: no other occupancy allowed.
- Battery room indoors: **2 h** walls and floors (4.7.14); reachable by fire-department ladders; not below the exit level unless approved; accessible to first responders; locked; outward-opening egress doors with panic hardware; nothing unrelated stored in it.

## ASHRAE 62.1-2022, US benchmark: air intakes and exhaust
- Air intakes (including windows used for ventilation) to: combustion vents and flues **5 m** (our reading for generator exhaust); cooling-tower exhaust 7.5 m; truck dock or bus idling 7.5 m; busy road 7.5 m; loading area or garage entry 5 m; dumpsters 5 m; street or parking 1.5 m.
- Combustion and cooling-tower exhaust must keep the full distance from operable windows and doors, **including on neighbouring lots**; no credit for height if the exhaust is less than 20 m below.
- Outdoor air MERV 11 where fine particulate exceeds the national standard (Vancouver's own bylaw asks MERV 13).
