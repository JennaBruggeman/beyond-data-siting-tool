# Research brief: what each program's massing contains (2 Nov 2026)

Same rules as BRIEF.md (read it): primary sources only (government functional programs, design guides, codes, health and licensing regulations, peer-reviewed papers); Canadian first, labelled benchmarks after; exact figures with page/section; "?" for anything not found; "our arithmetic" labelled; operator/maker claims labelled; never circumvent blocks or paywalls; Canadian spelling; short.

J.B.: "when we have a massing sized x, we understand what amount of x is actually a pool or a greenhouse versus the support space … a reasonable estimate that includes the necessary spaces for a program to function … a general overview."

For each program, give a breakdown of a small but WORKING version that would sit on an urban lot next to a data centre:
1. Main space (net m²) with its source.
2. Support spaces, each with net m² or a ratio to the main space, and its source: washrooms (code fixture counts: NBC/BCBC 3.7.2 and Table 3.7.2.2.A by occupancy and occupant load; universal washroom), change rooms/showers, mechanical/plant (incl. pool plant, chemical rooms), electrical, storage, staff/office, reception/entry, garbage, any program-specific room (e.g. first aid, laundry room, triage).
3. Circulation and walls: a grossing factor (net to gross) with its source (e.g. Alberta Infrastructure grossing factors 2021; facility functional programs).
4. The resulting gross m² (our arithmetic) and how it compares with the catalogue's current typical size (tool/arch_programs.json, field size.typical_m2 and size.note).
5. Gaps "?".
Reuse ids already in register/formula_register.json new_sources where they hold the figure (e.g. Eastglen functional program for pools; Alberta grossing factors). New ids: arch_sup_<camelCase>.

Output (in checks/research_arch_v1/): <stem>.md (a table per program: part | m² or ratio | source id | where | kind | confidence) and <stem>_sources.json ({"arch_sup_<id>": "KIND: title, issuer, date: quoted figures with section/page — URL"}). Edit nothing else; no commits. Reply in under 100 words: programs covered, the biggest changes from the current sizes, gaps.

Groups:
- A [sup_wet]: pool, therapy pool, spa / bathhouse, laundry (laundromat and community/commercial), aquarium.
- B [sup_care]: refuge (warming, cooling, cleaner-air room), warming shelter (day and overnight), outpatient clinic, community kitchen.
- C [sup_public]: public ground floor (e.g. library branch, community room), gym (incl. climbing), winter garden / atrium, covered plaza, EV charging hub (stalls, aisles, electrical room).
- D [sup_grow]: greenhouse, conservatory, fish farm (tilapia RAS: tanks, filtration, feed, packing, staff), food drying, lumber drying, neighbourhood heat plant room.
