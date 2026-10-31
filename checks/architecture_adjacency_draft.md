# Adjacency rules for Architecture mode: draft (31 Oct 2026)

From checks/research_arch_v1/adj_occupancy.md, adj_service.md, adj_programs.md, spatial_rules.md, separations.md, zoning.md; independently checked in adj_check.md (corrections applied below). Codes: NBC 2020, BCBC 2024, VBBL 2025, NBC(AE) 2023, NFC 2020, NFC(AE) 2023 — wording the same in all four building codes unless noted.

## The data centre's own class (decides most of the rest)
- No code names a data centre. NBC examples: electrical substations F-2, power plants F-3; the F-2/F-3 line is fire load 1,200 MJ/m². VBBL's upgrade table lists "Computer Centres" as Group D (an existing-building note only). No quantity of batteries or fuel makes it F-1.
- Tool assumption until settled: **F-2 (?)**, the stricter reading. Shown as "?" with the alternatives.

## The data hall itself
- Building code: no rating for the hall as such. NFPA 75 (6.1.3.2): IT equipment area separated by "not less than 1 hour" (from NFPA's public record; standard paywalled). J.B. understands 2 h: operator or insurer practice (FM Global 5-32, not read ?). Tool: 1 h minimum (NFPA 75), 2 h shown as "operator practice ?" until a source confirms.
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
