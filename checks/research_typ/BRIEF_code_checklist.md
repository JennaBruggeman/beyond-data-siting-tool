# Research brief (4 Nov 2026): shared schematic code checklist for typologies

Purpose: every typology will be drawn as one building and checked schematically. Build ONE reusable checklist of the code and by-law requirements that decide layout, with exact clauses and figures, for both cities.

Codes (local texts in data/raw/codes/: NBC 2020, BCBC 2024, VBBL 2025, NBC(AE) 2023; zoning in the register and tool/data/zones.json; Edmonton Bylaw 20001 full text at /mnt/user-data/uploads/Bylaw20001-.pdf; Vancouver Parking By-law s. 5 at /root/.claude/uploads/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/a1e1ad9e-sec05.pdf). Use VBBL for Vancouver and NBC(AE) for Edmonton; note where they differ from NBC.

Occupancies in play: F-2 (data centre, tool default, our reading), A-2 (refuge, warming room, community kitchen dining, gym), A-3 (pool, spa, arena-type?), B-3 (clinic? check: outpatient clinic is usually D unless treatment renders patients incapable), D (offices, clinic), E (?), F-3 (EV hub, storage), greenhouse (?).

For each item give the rule, figure, clause, city difference, and what it means for a schematic plan:
1. Building classification by size/height/occupancy (3.2.2): which construction articles apply for a mixed F-2 + A-2/A-3/D building of 1–4 storeys, sprinklered; whether the most restrictive occupancy governs (3.2.2.8 and the "major occupancy" rules); combustible/noncombustible.
2. Fire separations between major occupancies (Table 3.1.3.1) and fire-resistance ratings of floors and walls; rated doors and glazing (3.1.8).
3. Firewalls (3.1.10) and when one building becomes two.
4. Spatial separation and exposure protection (3.2.3): unprotected openings vs limiting distance; what it means for walls near lot lines (BE side/rear 0 m; I-3 side yards).
5. Exits (3.4): number of exits per floor area and storey, separation of exits (half the diagonal), travel distance limits by occupancy and sprinklering, exit width per person, exits through lobbies (3.4.4.2), dead-end corridors.
6. Occupant load (Table 3.1.17.1) for each program type.
7. Access to exit and corridors: widths, public corridors, fire separation of corridors.
8. Stairs and elevators: when an elevator is required (accessibility, storeys), stair widths, number of stairs.
9. Accessibility (3.8): accessible entrances, path, washrooms.
10. Washrooms: water closets by occupant load (3.7.2), for each program.
11. Service rooms and shafts (3.6): electrical, generator rooms, fuel, vertical service spaces.
12. Fire department access (3.2.5): principal entrance distance, access route, fire department connection.
13. Sprinklers and standpipes required (3.2.5.12, 3.2.9).
14. High buildings or interconnected floor spaces: not triggered? confirm.
15. Zoning items that shape the plan: yards per edge, height, floor area, ground floor rules (I-3 2.2.11), BE screening and street-front transparency, loading spaces (Vancouver s. 5, Edmonton 5.80), weather protection.
16. Data-centre specific from the register: secure line, generator room 2 h, fuel separations, intakes vs exhausts (NBC 6.3, ASHRAE 62.1 Table 5-1), noise at the property line, nothing wet over the hall (FM 5-32).

Output: checks/research_typ/code_checklist.md (one table per item: rule | figure | clause | Vancouver | Edmonton | plan consequence | confidence) and code_checklist_sources.json (reuse register ids; new ids "cc_<camelCase>"). Quote figures exactly. "?" where not found; "our reading" labelled. No commits, no code changes. Reply under 150 words.
