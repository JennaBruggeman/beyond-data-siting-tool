# Research brief: Architecture mode, first version (30 Oct 2026)

Context: "Beyond Data" (UBC M.Arch studio tool) places a data centre and other programs together on one urban lot in Vancouver or Edmonton, in simple massing. Each program needs SOURCED: a typical size, a minimum size, size steps (if it comes in set sizes), its heat need (peak kW and yearly MWh, and the water/supply temperature it needs), and the spatial rules that decide where it may sit relative to a data centre's plant (standby diesel generators, air-cooled chillers/dry coolers, fuel tanks, pad-mount transformers, loading docks) and to the street.

Standing rules (strict):
- Primary sources only: codes, by-laws, government and utility guidance, standards bodies' public summaries, peer-reviewed papers, official design guides. No popular sources (news, blogs, vendor marketing pages are claims at best: label "operator claim" / "maker claim").
- Canadian first (BC, Alberta, Vancouver, Edmonton, NBC/BCBC/NBC(AE), CSA where publicly summarised); then US/EU as labelled benchmarks.
- Quote the exact words or figures, with page/section, document title, issuer, date, URL. Never invent a figure. Anything unconfirmed: "?". Your own arithmetic: "our arithmetic".
- If a site blocks you or is paywalled, note it and move on; never circumvent (no archives/mirrors/other fetch methods).
- Canadian spelling. Short.

Output (one file per agent, in checks/research_arch_v1/):
1. <topic>.md: per program, a table of: what | value | source id | where (page/section) | kind (rule / government guide / peer-reviewed / design guide / operator claim / maker claim) | confidence 0-100; then gaps marked "?".
2. <topic>_sources.json: {"<sourceId>": "<register-style source text: KIND: title, issuer, date: quoted figures with section/page — URL>"} using short camelCase ids not clashing with common ones (prefix with arch_).
Do not edit any other file. Do not commit.
