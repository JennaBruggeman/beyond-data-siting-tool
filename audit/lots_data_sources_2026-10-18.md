# Lots & data group: source check (18 Oct 2026)

## M81 EV stations
- No re-download needed. The NRCan files already in data/raw/nrcan (16 Oct 2026) carry "Access Code" (public / private) and "Groups With Access Code".
- Vancouver: 549 ELEC rows in the tool's box, 39 private. Edmonton: 213, 9 private.
- Also in the files: "TEMPORARILY UNAVAILABLE (Public)", "Open to Teslas only", "For fleet use only".
- NRCan/NREL field documentation not read; the meaning is taken from the file's own labels (unverified beyond that).

## M62 Vancouver noise zones
- By-law 6555, consolidated to 14 Jul 2026 (incl. By-law 14786). Local copy: data/raw/van/6555.txt, 6555c.pdf. Later amendments not checked.
- Sch. A (activity) lists 129 CD-1 numbers; Sch. B (intermediate) 247; Sch. G (event) 4: 311, 519, 520, 593.
- Three numbers appear in both A and B (70, 125, 905): one CD-1 with sites in both, or a by-law error (905 lists two by-laws, 14398 and 14397). Treat as "listed in both, by site".
- Sch. B.1 is a map with no coordinates (north shore of False Creek). It cannot be placed exactly. Parcels there are flagged, not guessed.
- Tile zones read "CD-1 (177)", the CD-1 number used in the schedules.

## M61 Edmonton residential zones
- Bylaw 14600 ss. 19–22 (consolidated 22 Oct 2024): "property zoned for use as residential". The bylaw does not define it.
- Zoning Bylaw 20001 s. 1.8.10: "residential Zone means a Zone where the Purpose is to primarily enable Residential Uses". s. 1.8.6 defines "mixed use Zone" separately.
- Residential (Part 2): RS, RSF, RSM, RM, RL, RR.
- Residential by stated Purpose (Part 3, read): HDR, RMU, BRH, BLMR, BMR, RCES, RAES, CCHD, CCMD, CCLD, CCSD, OLD, ORH, ORA, SLD, SRH, SRA, RTCR, RTCMR, RVRH, PLD, PRH, ALA, GLD, GRH, GLRA, GLDF, GMRA. (BLMR and PLD: by zone name; purpose text not found in the OCR.)
- Not settled: mixed use (MU, MUN, CMUV) and Direct Control (DC, DC1, DC2). Residents live there, but 20001 does not call them residential zones.
- Codes in the tiles not found in 20001: RCRM, RCRL, A5 (likely older or Direct Control). Unknown.

## M64 Sight lines
- Vancouver street file (Public streets) has no lanes. Edmonton Road Network includes alleys.

## M71 Water parcels
- Vancouver legal type "OTHER" (155 parcels) is mostly parks and public land, not water. Exclude by water-body name only: BURRARD INLET, FRASER RIVER NORTH ARM.

## M70 Edmonton heights
- 14,383 outlines keep an estimate (no 3D part inside); 219 estimates exceed 40 m, 93 exceed 100 m, max 280 m.
- Tallest measured kept: 163.5 m. Two taller towers (243 m, 200 m) are among the 75,074 dropped 3D parts with no outline.
