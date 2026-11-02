# Research brief: Architecture mode, added programs (2 Nov 2026)

J.B. moved the whole backlog into the first version (hospital cut; outpatient clinic added instead). Same rules as BRIEF.md (read it first: primary sources only, Canadian first, exact quotes with section/page, "?" for anything unconfirmed, "our arithmetic" labelled, never circumvent blocks or paywalls, Canadian spelling, short). Read adj_programs.md and pool_laundry.md for the house format and to avoid repeating sources we already have (reuse their ids where they apply).

Context: "Beyond Data" (UBC M.Arch studio tool) places a data centre (assumed NBC Group F-2, 2 h data hall) and other programs together on one urban lot in Vancouver or Edmonton, in simple massing (no envelope, structure or cost by program). Heat comes from the data centre (liquid cooling ~45–60 °C, air ~25–35 °C; higher via heat pump).

## For each PROGRAM (a mass in the 3D)
1. Typical size (m², and height/storeys if relevant), with real Canadian examples where possible.
2. Minimum sensible size, and size steps if it comes in set units (beds, lanes, stalls, tanks). No source → "?".
3. Heat: peak kW and yearly MWh per m² (or per unit), and the supply temperature it needs. Also cooling or water demand if large.
4. Code: NBC/BCBC/NBC(AE) major occupancy group and the fire separation needed from an F-2 occupancy (Table 3.1.3.1), plus any program-specific code part.
5. Zoning: is it permitted in Vancouver's industrial/employment districts (I-1, I-2, I-3, M-1, M-2, IC, etc.) and Edmonton's BE / IM / IH / mixed zones (Zoning Bylaw 20001)? Quote the use name and section.
6. Adjacency: what it must be near, what it must be kept from (generators, fuel, chillers/dry coolers, transformers, loading dock, air intakes, street), with distances and sources. A table not saying something is not proof there is no rule: search the program's own regulations (health, licensing, food safety, care facility acts).
7. Social fit: who it serves and a catchment or provision standard (government plans first). No standard → say so.
8. Operator or maker claims labelled as claims.

## For each SYSTEM (feeds the heat or water budget; not a mass, except a plant room)
Capacity per unit (kW per borehole or per m of bore, L/s, m³ per m² roof), land/space needed, spacing and setback rules, permits and who issues them (BC Water Sustainability Act, Alberta Water Act, federal Fisheries Act, Vancouver/Edmonton by-laws), temperature limits on discharge, and the sources.

## Groups (one agent each; output file stem in brackets)
- A [prog_wet]: bathhouse / Nordic spa; therapy or rehab pool; aquarium (public); fish farming (land-based aquaculture / recirculating systems).
- B [prog_grow]: botanical conservatory / tropical house; drying (food, lumber, wastewater sludge).
- C [prog_public]: heated public space (winter garden, atrium, covered plaza, warming shelter); covered winter market; indoor recreation / climbing gym; EV charging hub.
- D [prog_housing]: outpatient clinic / urgent care (Group B-2 vs D? check NBC; BC and Alberta health facility guidance; CSA Z8 is paywalled — public summaries only); housing (rental apartments; tested case); seniors' housing / care home (BC Community Care and Assisted Living Act, BC Hospital Act residential care; Alberta Continuing Care Act and standards); community or commercial kitchen (BC Food Premises Regulation, Alberta Food Regulation, health authority guides).
- E [sys]: neighbourhood heat plant room (start of a network: energy centre sizing per MW, City of Vancouver NEU and Edmonton Blatchford/Downtown District Energy guidance); river or inlet cooling (waterfront lots); borefield (geoexchange: CSA C448 is paywalled — record only public summaries; BC/Alberta well rules); rain tank (BC/Vancouver/Edmonton rainwater harvesting guidance, CSA B805 paywalled).

## Output (in checks/research_arch_v1/)
- <stem>.md: per program/system, a table: what | value | source id | where | kind | confidence 0-100; then gaps "?" and a short "paywalled / blocked" list.
- <stem>_sources.json: {"arch_<id>": "<KIND: title, issuer, date: quoted figures with section/page — URL>"}.
Do not edit any other file. Do not commit. End your reply with a 5-line summary: programs covered, strongest sources, biggest gaps, paywalled items, anything J.B. must decide.
