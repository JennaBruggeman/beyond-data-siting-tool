# Lot lines: front, side, rear, flanking (4 Nov 2026)

Brief: `checks/agents/LOTLINES_BRIEF_2026-11-04.md` part 1. Local by-law copies only (no web). Quotes and pages: `lotlines_sources.json`. Check 1: this read (layout text). Check 2: `checks/agents/2026-11-04_lotlines_check2.json` (separate reading, `pdftotext -raw`; 36 of 36 quotes re-found, 3 fragments by eye where the PDF layout splits a line).

## Vancouver: Zoning and Development By-law

| Term | What the by-law says | Where |
|---|---|---|
| Front, rear, side property line | **Not defined.** Only the yards are: front yard from the "ultimate front property line", rear yard from the "ultimate rear property line", side yard from the "ultimate side property line" | s. 2, pp. 17, 33, 42 |
| Corner site | "at the intersection or junction of 2 or more streets" (no angle) | s. 2, p. 9 |
| Double fronting site | "abutting 2 parallel or approximately parallel streets" (no angle) | s. 2, p. 11 |
| Exterior side yard | on a corner site, beside "the side property line adjacent to the flanking street" | s. 2, p. 14 |
| Lane | "only a secondary means of access to a site, at the side or rear" | s. 2, p. 22 |
| Site | land "abutting on a street not being a lane" | s. 2, p. 43 |
| Yard diagram | F at the street, S at both sides, R at the lane | s. 2, p. 49 |
| Which street is the front | corner site: "the shortest boundary abutting on a street, or as otherwise determined by the Director of Planning"; equal lengths: the Director decides; more than 1 lot: the shortest | s. 10.26.1, p. 12 |
| Double fronting | placement needs the Director's approval, **except in M or I districts** | s. 10.6.1, p. 3 |
| No street | not a site; the Director may permit development | s. 10.25.1, p. 11 |
| Exterior side yard = front yard | I-2 sub-area B s. 3.2.2.13; I-3 s. 3.1.2.15; FC-2 ss. 3.1.2.10, 3.2.2.10, 3.3.2.10, 3.4.2.10 | schedules |
| Not found | rear or side property line; irregular, notched or panhandle sites; any angle for "approximately parallel"; frontage of a single-lot double fronting site with unequal streets | ? |

## Edmonton: Zoning Bylaw 20001 (as adopted, Jan 2024 PDF)

| Term | What the bylaw says | Where |
|---|---|---|
| Front Lot Line | the lot line on the abutting street; on a **Corner Lot the shorter** street line; on a curved corner the shorter of the 2 segments either side of the actual corner | s. 8.20, p. 1035 |
| Rear Lot Line | the lot line "**furthest from and opposite** the Front Lot Line"; if none, the point where the furthest opposite lines meet | s. 8.20, p. 1047 |
| Flanking Side Lot Line | a lot line, other than the front, abutting a street on a corner site | s. 8.20, p. 1032 |
| Interior Side Lot Line | every lot line that is not front, flanking or rear | s. 8.20, p. 1039 |
| Corner Lot | at the intersection of 2 streets "if the angle of the intersection is **less than 135 degrees**", or on a street curved less than 135 degrees | s. 8.20, p. 1027 |
| Double Fronting Site | abuts 2 streets "parallel or nearly parallel" (no angle); **must have 2 Front Lot Lines** | s. 8.20, p. 1029; s. 5.130.4 |
| Equal street lines | the Development Planner decides | s. 5.130.2 |
| Curved corner | angle of the tangents at the 2 ends; the corner is the point nearest where they meet | s. 5.130.5–6 |
| Alley | not a street ("Street means any public roadway other than an Alley") | s. 8.20, pp. 1021, 1055 |
| Industrial setbacks | by what the line **abuts** (street, alley, site and its zone), not by front or rear | IM Table 4.1 (BE, IH alike) |
| Not found | any angle for "nearly parallel" or "opposite"; panhandle or flag lots | ? |

## Tests the tool uses (part 2)

- Street line: a lot edge with a City street centreline found outside it (not an alley or lane).
- Corner: 2 street lines meeting at less than 135° (Edmonton s. 8.20; for Vancouver **borrowed**, our reading ?). A street run that turns more than 45° in all is split at the point nearest where its end tangents meet (s. 5.130.5–6).
- Front: the only street line; on a corner the shorter (both cities). Equal to 0.5 m: **unclear**.
- Parallel (double fronting): street lines within 45° of parallel and not meeting at the lot (the complement of the 135° test; our reading ?). Edmonton: both front. Vancouver: **unclear** (s. 10.26.1 has no rule for unequal lines on one lot).
- Flanking: any other street line on a corner.
- Rear: the line facing within 45° of directly away from the front and furthest from it (Edmonton s. 8.20; Vancouver by the s. 2 yard diagram, our reading ?).
- Other lines facing away from the front but nearer (a notch): Edmonton interior side (by definition); Vancouver **unclear**.
- Lines facing the same way as the front but not on a street: Edmonton interior side; Vancouver **unclear**.
- Lines facing sideways (45–135°): side.
- No street found: every line **unclear**.
- An unclear line takes the deepest yard it could have (hard rules block), and is flagged "which yard this edge has is not known (?)".

## Open (for J.B.)

1. Vancouver defines no property lines. Is "rear = opposite the front, side = the rest" acceptable as our reading, or ask the City (Development Planning) for its practice?
2. Vancouver double fronting on one lot: which street is the front? The by-law leaves it open in I districts.
3. 45° bands are borrowed from Edmonton's 135° corner test. No source gives "approximately parallel" or "opposite" a number.
