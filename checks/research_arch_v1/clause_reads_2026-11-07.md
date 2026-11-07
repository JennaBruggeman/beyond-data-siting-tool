# Clause reads, 7 Nov 2026 (Cowork, WORKLIST §4)

Read from the code and by-law texts already in the project (`data/raw/codes/`, `data/raw/van/`, `data/raw/edm/bylaw/`) unless a URL is given. Quotes are verbatim. Code: add each result to the register by patch, then use it. "?" = not settled.

## 1. Fire department access route (3.2.5.6) — DONE

Same text in NBC 2020, BCBC 2024, NBC(AE) 2023 and VBBL 2025 (read in all four). 3.2.5.6.(1): a required access route "shall
a) have a clear width not less than 6 m, unless it can be shown that lesser widths are satisfactory,
b) have a centre-line radius not less than 12 m,
c) have an overhead clearance not less than 5 m,
d) have a change of gradient not more than 1 in 12.5 over a minimum distance of 15 m,
e) be designed to support the expected loads imposed by firefighting equipment and be surfaced with concrete, asphalt or other material designed to permit accessibility under all climatic conditions,
f) have turnaround facilities for any dead-end portion of the access route more than 90 m long, and
g) be connected with a public thoroughfare."
- VBBL adds 3.2.5.6.(3): firefighter path from curb to the main entrance and to every access opening "no less than 1.2 m in width" (900 mm for one dwelling unit), surfaced with concrete, asphalt or similar.
- Note A-3.2.5.6.(1): consult the local fire department; the 6 m can be less "unless it can be shown". The tool uses 6 m and says so.
- When a route is required (3.2.5.4) and the 3–15 m entrance distance (3.2.5.5): already in `adj_service.md` §7, unchanged.
- **Check 15 in the tool:** a street can serve as the access route, so a route on the lot is needed where the principal entrance is more than 15 m from the street (3.2.5.5; our reading, ?: confirm with the fire department note). Then it must meet (a)–(g). On deep lots with the entrance at the rear, the 6 m lane and a turnaround past 90 m take real ground: count it in the ground budget.

## 2. Lobby size from occupant load and exit width — DONE (with a finding)

- **No code sets a minimum lobby area.** The codes set the occupant load and the exit widths that run through the lobby. Lobby area stays a design choice: label it "design choice" with its source, or "?". (This is why the shared lobby has no source; it can't get one from the code.)
- Occupant load, 3.1.17.1.(1)(c): "the number of persons for which the area is designed, but not less than that determined from Table 3.1.17.1." A lobby used for waiting or events: "standing space 0.40" m² a person or "space with non-fixed seats 0.75". If designed for fewer, (2): "a permanent sign indicating that occupant load shall be posted".
- Exit width, 3.4.3.2.(1)(a): occupant load × "6.1 mm per person for … doorways, corridors and passageways"; (b) 8 mm a person for stairs with rise ≤ 180 mm and run ≥ 280 mm; (7) with more than one exit, each counts for at most half.
- Minimum widths, Table 3.4.3.2.-A (Groups A, B-1, C, D, E, F): corridors and passageways 1 100 mm, ramps 1 100, stairs 900 (≤ 2 storeys above / 1 below the exit level) or 1 100, **doorways 850 mm** (NBC 2020 text and BCBC 2024 page 3-236 read as an image). **Correction:** `checks/node_review/layout_rules.md` quotes doorways as 800 mm; the current codes say 850. Code: find and fix any 800 mm in the tool.
- **Finding, exits through a lobby (3.4.4.2, same in all four codes):** only one exit from a floor area may lead through a lobby, and only if (a) the lobby floor is ≤ 4.5 m above grade, (b) the path through the lobby to outdoors is ≤ 15 m, and **(c) "the adjacent rooms or premises having direct access to the lobby do not contain a care, residential or industrial occupancy"**. The data centre is Group F, Division 2 (industrial; check 6). So **if the data centre opens onto the shared lobby, no exit may run through that lobby.** For the Emergency hub this means one of the following:
  - the data centre gets its own entrance and does not open onto the public lobby; or
  - the lobby carries no required exit (each public floor has its exits elsewhere).

  The same applies if the refuge has sleeping rooms (residential) or the clinic is a care occupancy (?: depends on the clinic program). Add this to check 8 (exits) as a rule.
- Also (1): no exit from a floor above or below the first storey may lead through a lobby, except the one case above.

## 3. What may sit in side and rear yards — DONE for the text; one reading to confirm

**Vancouver** (Zoning and Development By-law Section 10, https://bylaws.vancouver.ca/zoning/zoning-by-law-section-10.pdf, read 7 Nov; page header read as "April 2025" while the search listing said "October 2026" ?):
- 10.13.1: "No building or development is permitted in any required yard, except as otherwise provided for by this by-law or the Parking By-law."
- 10.8.1 lists what may project into a required yard (steps, eaves, balconies, canopies, bay windows, chimneys and similar). It lists no mechanical equipment, generators or transformers.
- 10.10.3: a fence up to 1.9 m is permitted in a required yard.
- I-3 2.2.2(a): outright uses must be "wholly within a completely enclosed building, except for off-street parking and loading, heating and mechanical equipment …". So plant may be outdoors, **but not in a required yard** (10.13.1).
- I-3 2.2.13 and I-2 2.2.11: accessory buildings up to 3.7 m high (4.6 m peak) are outright, in I-3 only "in the rear yard" and ≥ 3.1 m from a lane centre line, total ≤ 10 % of the site.
- I-2 4.2.2: eaves and similar "may project into the minimum side yards to a maximum of 1.0 m".
- **Rule for the tool (Vancouver):** generators, chillers, transformers and the plant yard sit outside the required yards. Where a required yard is 0 m (I-3 front 0.6 m, I-2 none), this costs little; the I-3 7.6 m side yard (3.1.2.4) and 3.1 m rear yards matter.

**Edmonton** (Zoning Bylaw 20001, local copy):
- BE 5.4: "Surface Parking Lots, and loading, waste collection, storage, service, and display areas must not be located within a Setback." 5.8: not between a building and a Street; screened from Abutting Streets and from Sites in non-industrial Zones.
- IM 5.1 and IH 5.1: same rule: "loading, storage, waste collection, service and display areas must not be located within a required Setback." 5.2: not between a principal building and a Street, and screened (except a Local Road serving IH or IM, or an IH/IM neighbour). IM 5.3: screening up to 3.7 m.
- BE 5.2: "All mechanical and electrical equipment, transformers, ducts, cooling towers … must be screened from view from Abutting Streets and Sites in non-industrial Zones."
- 5.90 (projections into setbacks): eaves 0.6 m, steps, platforms, cantilevers, ramps. No equipment.
- **Reading to confirm (?):** that a plant yard counts as a "service area". The bylaw does not define "service area" in what was read. The safe reading (used in the tool): plant stays out of required setbacks and is not between the building and the street.

## 4. LiDAR datum vs flood level (Vancouver) — PARTLY DONE; one retrieval

- VBBL 2025 Div. A definition: flood construction level on the Burrard Inlet, English Bay, False Creek and Fraser River flood plains: underside of floor or top of slab "shall not be lower than 4.6m Greater Vancouver Regional District datum", plus a wave run-up allowance in the wave-effect zone (an engineer sets it). Still Creek: levels from its map. FCL applies to buildings "used for habitation, business, or for the storage of goods which may be damaged by flood water".
- **Open (?):** (1) the vertical datum of the City of Vancouver 2022 LiDAR the tool's grade comes from (CGVD2013 or CGVD28). The raw LAS files are no longer on J.B.'s computer, so it can't be read from their headers; read it on the City's 2022 LiDAR open-data page (blocked from Cowork). (2) How "GVRD datum" relates to CGVD28/CGVD2013. No primary source found yet; needs a City or Metro Vancouver engineering document.
- Until both are read, the tool compares grade with 4.6 m only with a "?" and a note that the datums may differ.
- **Retrieval for J.B. or Code:** the 2022 LiDAR dataset page or metadata (vertical datum), and a City Engineering survey or datum note on GVRD datum.

## 5. I-3 sub-area A; CD-1 by-laws naming data centres — DONE for I-3; CD-1 partly done

**I-3 sub-areas** (I-3 schedule, June 2026, Map 1, read as an image at 400 dpi): sub-area B is only two small pieces on the south side of Prior St east of Gore Ave. All other I-3 land is sub-area A.
- Of the 32 I-3 lots in the tool's tiles, **31 are in sub-area A**. **370 Prior St (381 m²) is in sub-area B** (it matches the thin strip). 220 Prior St (1 835 m²) is the small sub-area A square east of Main St.
- How: map georeferenced on Main St (-123.0999) and Clark Dr (-123.0772), both from the tool's street file; strip and square match the two lots' centres within about one lot width. Code: mark 370 Prior St "not allowed (sub-area B)".
- The sub-area B block east of the strip has no lot in the tiles (?): if a lot appears there later, it is sub-area B.

**CD-1 naming Bulk Data Storage:**
- **CD-1 (818), 720 Beatty St and 701 Expo Blvd** (By-law 13399, amended to 13918, 27 Feb 2024; https://cd1-bylaws.vancouver.ca/CD-1(818).pdf): s. 5(h) permits "Transportation and Storage Uses, limited to Bulk Data Storage". Floor area: sub-area A 59 233 m², sub-area B 3 961 m² (s. 6). Subject to Council approval of the form of development.
- Not yet searched: the other CD-1 by-laws (several hundred). The CD-1 site is reachable from J.B.'s computer. Code can download the CD-1 PDFs and search them for "Bulk Data Storage" (ask J.B. first; check terms of use).
- Not adopted, so not in the tool: the 111 E 5th Ave rezoning application (data centre in an existing office building) and a 120–150 W Georgia text amendment (council report 25 Jul 2023) that the search surfaced. Read before citing.

## For Code

1. Register patches for 1–5 above (sources: NBC 2020, BCBC 2024, NBC(AE) 2023, VBBL 2025 Div. A and 3.2.5.6.(3), Vancouver Z&D By-law s. 10.8.1, 10.10.3, 10.13.1, I-2 2.2.11 / 4.2.2, I-3 Map 1, 2.2.2, 2.2.13, Bylaw 20001 BE 5.2/5.4/5.8, IM 5.1–5.3, IH 5.1–5.2, 5.90, CD-1 (818)).
2. Check 8 gains the lobby rule (3.4.4.2.(2)(c)).
3. Doorway minimum 850 mm, not 800.
4. Plant out of required yards and setbacks in both cities.
5. Mark 370 Prior St as sub-area B; add CD-1 (818) to the zone table as a lot where data storage is permitted by its CD-1.
6. Grade vs FCL keeps a "?" until the datum is read.
