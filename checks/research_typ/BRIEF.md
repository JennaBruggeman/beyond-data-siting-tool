# Research brief: typology library v1 (4 Nov 2026)

Read first: checks/architecture_mode_notes_2026-10-30.md (all entries, esp. "Typology answers" and "Typology library v1"), checks/research_arch_v1/typologies_draft.md, tool/arch_programs.json, and the research files it cites (prog_*.md, sup_*.md, heights_*.md, zones.md, dc_rooms.md, noise_mitigation.md, uploads_4nov*.md). Sites: 64 Airport Rd NW Edmonton (BE, E06B) and 339 1st Ave E Vancouver (I-3, V339); also check a few other data-centre-zone lots (zones in tool/data/zones.json).

Rules: primary sources first (codes, by-laws, government/provincial/municipal guides and functional programs, filed Canadian drawings and staff reports); built precedents count (architect/owner documents labelled DESIGNER/OWNER CLAIM); peer-reviewed for heat and process; US/UK/EU as labelled benchmarks; no news/blogs/AI summaries as evidence; quote with page/clause; "?" where not found; "our arithmetic"/"our reading" labelled; never circumvent blocks or paywalls. No commits, no code changes.

For EACH assigned typology, produce:
1. Program list and room schedule: every room with net m² and source; shared support (change rooms, washrooms, reception, plant) and how sharing cuts area (sourced or our arithmetic); total range.
2. Adjacency and stacking: what sits beside/above/below the hall and each other; street side; secure line; "nothing wet over the hall"; fire separations (NBC Table 3.1.3.1 occupancies); entrances; separate building if needed.
3. Heat: each program's supply temperature, load (kWh/m²·yr and peak W/m²), whether hall heat serves it directly or by heat pump; for cascades, the temperature order and how much heat each stage takes (our arithmetic from sourced figures).
4. Plant layout: where chillers, generators, fuel and the heat hub go relative to the programs (generator-to-intake and opening distances, fuel distances, noise at the property line), sourced; the default layout to use.
5. Zoning and approvals per city (BE, I-3; plus IM/IH and I-2/FC-2 where it differs): permitted / conditional / variance (BE 3.18) / rezoning, with clause.
6. Precedents: at least one built or filed precedent of the combination (any country, labelled), with what it shows.
7. Fit on both sites at the plant-included ratio range (our arithmetic), and what limits it.
8. Gaps and open questions.

Output per typology: checks/research_typ/<slug>.md and <slug>_sources.json ({"typ_<slug>_<camelCase>": "KIND: title, issuer, date: quoted figures — URL or path"}). Reuse existing register ids where they cover a fact. Reply under 150 words.
