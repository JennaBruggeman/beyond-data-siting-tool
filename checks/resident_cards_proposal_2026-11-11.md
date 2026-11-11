# Resident: what each of the 4 cards shows (proposal for J.B.'s approval, 11 Nov 2026)

Built on your 7 Nov decisions (CODE_JOB_F1_site_build.md §3c): show where data centres are, let people pick one, explain how it operates with the information there is, and give a report. **No 3-D, no heat, noise, water or power cards.** Nothing built yet.

## Weaknesses first
- **No coordinates in the inventory.** Every facility is placed by matching its address to the tool's parcels: "our method", labelled. Rows inside a multi-address building (e.g. 555 W Hastings, 4 facilities) all land on the same parcel.
- **Addresses still "?":** Hut 8 (two candidate addresses each), TELUS Garden ("next to TELUS Garden"), Wolfpaw (directory lead). The main chat is sourcing them. Until then they're listed but not on the map.
- **Edmonton region:** about 10 of the Edmonton rows are outside the city (Sturgeon County, Keephills, Genesee, Leduc County, Parkland) and some are only grid-allocation records with no site. The tool's map stops at the city. Proposal: list them below the map as "outside the map area", no dot.
- **Three types in the inventory, two in your schematic.** The inventory sorts facilities as (a) in a tower, (b) smaller urban, (c) larger urban with a secure perimeter. Your §3c schematic has two: stand-alone or inside a tower. Proposal: (a) → "inside a tower"; (b) and (c) → "stand-alone building", with (c) adding "fenced site" only where a source says so (VAN3: your visit; eStruxture VAN-3: datasheet). Several types are "?" in the inventory and would show as "type not confirmed".
- **Opening year is filled for 5 of 25 Vancouver rows.** Shown only where known ("not published" otherwise).
- **Size figures mix units and scopes:** MW of IT, "site capacity", floor area, racks. The bar chart (report) uses one figure type per chart and says how many facilities have none.

## The inventory (from checks/research_arch_v1/inv_van.md, inv_edm.md, inv_specs.md)
- Vancouver: 25 rows. Status: 17 operating, 2 approved, 2 proposed, 1 permitted, 1 use approved, 1 rezoning, 1 "?". Types: 10 tower, 10 smaller urban, 3 secure perimeter, 2 "?".
- Fields filled (Vancouver): address 24/25, status 24, building 24, size 22, cooling/power 21, heat reuse 18, serves 23, opened 5.
- Edmonton: 21 rows (E1–E21), about half inside the city.
- Step 0 (before the cards): load the inventory into tool/data by register patch, one number per figure, spec sheet first, operator figures labelled "operator claim" (your 4 Nov rules). Report the counts per city and per field when loaded.

## R1 Your city
- **Drawing:** both cities' maps, data-centre zones shaded (as Municipal and Engineering "Your city"), plus every mapped facility as a dot.
- **Panel:** one line: "Vancouver: N data centres on record (M operating). Edmonton: N (M)." Counts from the inventory.
- **Sources:** inventory register ids; zone maps (City open data, as now).

## R2 Find a data centre
- **Drawing:** the city map with every facility as a dot, operating solid, approved/proposed hollow. Search by address; click a dot to pick.
- **Panel:** count per city; filter operating / approved or proposed; the list of facilities with name, operator, address. Facilities without a mapped address listed under "address not confirmed". Edmonton regional ones under "outside the map area".
- **Sources:** each row's source ids; "placed by address, our method".

## R3 What it is
- **Drawing:** close-up map of the parcel (building outlined, neighbours light), and the plain schematic: stand-alone building, or a tower outline labelled "data centre inside" (never which floors).
- **Panel rows:** name; operator; status (with source and date); address; type (stand-alone / inside a tower / type not confirmed); size (one figure: MW of IT where a spec sheet gives it, else the operator's figure labelled "operator claim"); cooling and backup power (as the source words it, short); heat reuse (yes / no / not published); who it serves; opened. Missing = "not published", not a red "?".
- **Sources:** per row, with trust (operator claim 50, government record 80–90, J.B.'s site visit labelled).

## R4 Report
- **Pages:** (1) the R3 content; (2) location map (site and its block) and the schematic; (3) where a size figure exists: one bar chart of every facility in that city with the same figure type, this one in ink, the others light, and "N facilities publish no figure"; (4) sources.
- No comparisons to homes or cars (no sourced conversion).
- Export PDF, the same report style as the other templates.

## Questions for you
1. Types: (a) → inside a tower; (b) and (c) → stand-alone, with "fenced site" only where sourced. OK?
2. Edmonton facilities outside the city: list below the map without dots (proposed), or leave them out?
3. Video stills: your 7 Nov decisions don't include them. I've left them out; say if you want them, and from which video.

## Effort
Step 0 inventory load (register patch, parcel matching, counts): 1 day. Four cards and the report: 2–3 days. Then the F1 gate on Resident.
