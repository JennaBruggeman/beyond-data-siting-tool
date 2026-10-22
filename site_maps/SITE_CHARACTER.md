# What stands on the top sites now

From `site_character.py` and `site_character.csv`, 21 Oct 2026. The data is City records only:
- **Vancouver:** 2026 tax report (year built, land and building value), and 2009 building footprints (coverage and height per parcel).
- **Edmonton:** 2026 assessment (year built, gross floor area), and 2019 rooflines.

**Read this as a first look.** Footprints are old (Vancouver 2009, Edmonton 2019), so anything built since is missing. "Building valued at under 10 % of the property" means the land carries the value: the usual sign of a site ripe for redevelopment, not of a vacant lot. Check each site on street view or a visit before you name it as a type.

The four types below match the tool's four starting points: new building, share a new building, retrofit, lease space.

## Vancouver

| Site | Zoning | What stands there | Type |
|---|---|---|---|
| 225–245 E 2nd Ave (+ 1888 Main St) | FC-2, IC-1/3 | Low-rise industrial buildings, built 1947–1995, about 8–18 m. Three of the five are valued at under 10 % of the property. | Redevelop (new or shared building) |
| 1389–1485 Venables St | I-2 | One- and two-storey industrial buildings (1946–2014, about 8 m). The largest lot (1410, 4,400 m²) is a third covered. | Redevelop or extend; part open yard |
| 8610–8690 Ash St / 8655 Cambie St (Marpole) | I-2 | Lots only 17–26 % covered, buildings from 1957–1970. | Mostly open yards: closest to a blank site |
| 3432 Lougheed Hwy | I-2 | A 4,700 m² lot, 14 % covered (1970). | Mostly open yard: near-blank |
| 700 W Pender / 535 Granville (downtown) | CD-1, DD | A 103 m office tower (1973) and older mid-rises (1929–1987). | Existing towers: retrofit or lease space |
| 45 E 4th Ave / E 3rd Ave (rezoning candidate) | I-1 | One- to three-storey industrial (1948–1995), mostly fully covered. | Retrofit or redevelop |
| 1295–1301 Johnston St, Granville Island (rezoning candidate) | FCCDD | Existing island buildings, about 16 m. | Existing buildings: retrofit or share |
| 5319–5357 Joyce St (rezoning candidate) | R1-1, RM-10 | Houses (1912–1971). | Assembling house lots: unlikely |

## Edmonton

| Site | Zoning | What stands there | Type |
|---|---|---|---|
| 8803 Stadium Rd NW | IM | A small building (877 m², 1980) on an 8,800 m² lot. | Mostly open: new building, keeping or replacing the small one |
| 12503 66 St NW | IH | A 1.7 ha lot with no building recorded. | Blank site |
| 12521 123 St NW | IH | A 1.6 ha lot with no building recorded. | Blank site |
| 5630 103A St NW | IH | A 1.1 ha lot with no floor area recorded (yard). | Blank or yard site |
| 11204–11311 119/120 St NW | IM, BE | Large lots with no floor area recorded, and one 1,000 m² building. | Mostly yards: near-blank |
| 9804 107 St NW (rezoning candidate) | AJ (special area) | A 23 ha public site with 36,000 m² of floor. | Large institutional site: check what it is before using it |
| 11410 Groat Rd NW (rezoning candidate) | CG | A 1.4 ha lot with 260 m² of floor. | Mostly open |
| 169B St / 171 St NW (rezoning candidates) | RS | Houses (1965–1973). | Assembling house lots: unlikely |

## In short

- **Edmonton's best zoned sites are mostly open industrial land:** new buildings, or a blank site.
- **Vancouver's are older low-rise industrial blocks:** redevelopment, a shared new building, or a retrofit. Two Marpole and Lougheed lots are the closest to blank.
- **Downtown Vancouver** is the one existing-tower case (retrofit or lease space).
- **Residential cells** that score high on the exchanges (Joyce St, west Edmonton) need lots assembled and a rezoning. Treat them as unlikely.

The site scores do not yet include what stands on the site. The tool's "What is being built" step would sort them into new, shared, retrofit or lease.

## Update: can the site actually hold a data centre? (realistic_sites.py)

A cell scored on its best parcel, even when that parcel is small. So I kept only cells with at least 2,000 m² of usable land:
- **Zoning ignored:** not houses, parks or other-jurisdiction land.
- **Zoning counted:** the 2,000 m² must itself be zoned allowed or case by case.

The 2,000 m² floor is an assumption (about the smallest small urban data centre with its plant). Scores are unchanged; this is a filter. Results are in `realistic_top5.csv`, and land per cell is in `cell_land.csv`.

**What changes:**
- **Vancouver, zoning counted:** the former #1 (225–245 E 2nd Ave) has only about 900 m² of FC-2 land; the rest of the block needs a rezoning. The best site moves about 200 m, to the I-3 block next to it:
  - 302 Industrial Ave / 235 1st Ave E / 320 Industrial Ave: 10,650 m² of I-3 land. Buildings from 1930 and 1980 cover about 30 % of it; 320 Industrial (2,115 m²) is open. A land-led redevelopment.
  - 275 1st Ave E (I-3, 7,791 m², a 1956 building covering 36 %) is the most robust site (#1 under almost every weighting).
  - Check: I-3 allows data storage only in sub-area A. Confirm these lots are in it.
  - Downtown (700 W Pender) drops out of the zoned list. It remains a strong rezoning or retrofit case.
- **Vancouver, other zoned sites:** Venables St (1510–1568), Ash/Cambie, 3432 Lougheed Hwy and 710 Marine Dr SE. All are older I-2 industrial, partly open.
- **Edmonton, zoning counted:** no change. All are open or yard industrial land of 0.9–2.3 ha.
- **Rezoning candidates:**
  - Drop out: house lots (Joyce St, 169B St, 171 St) and the Alternative Jurisdiction land (9804 107 St NW, a 23 ha provincial or federal site; 11305 83 Ave NW).
  - Come in: 795 Powell St (M-2, 1994–2008 industrial buildings) in Vancouver. In Edmonton, 11145 87 Ave, Meadowlark Rd and 109A Ave. These are mixed-use and Direct Control sites with towers built 2019–2022 (not realistic soon).
