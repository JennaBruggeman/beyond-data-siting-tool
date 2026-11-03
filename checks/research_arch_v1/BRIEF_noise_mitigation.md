# Research brief: sourced noise reduction for data-centre plant (2 Nov 2026)

Rules as BRIEF.md (primary sources; government and standards bodies first; exact figures with section/page; operator and maker claims labelled as claims; "?" where not found; never circumvent blocks or paywalls; ISO 9613-2 itself is paywalled: use government documents that state its method or equations, and note that).

Why: J.B. made the Vancouver Noise Control By-law 6555 and Edmonton Community Standards Bylaw 14600 limits hard rules in the Beyond Data tool. With no mitigation credit, a single air-cooled chiller (sound power Lw ≈ 98.5–102.8 dBA, maker claims in the register) breaks the 60–65 dBA night limit at a neighbouring property line closer than about 31 m, so nothing fits on most urban lots. Real data centres on such lots meet the limits by mitigation. The tool needs sourced reductions it can model.

Find, with numbers the tool can compute:
1. Barrier (screen) attenuation: the method in government guidance (e.g. ISO 9613-2-based equations as stated by a government; US FHWA noise barrier design handbook; Ontario MECP NPC-300 / Environmental Noise Guideline; UK or EU government guides; Health Canada guidance), as a function of path difference / Fresnel number, with the stated maximum (e.g. 20 or 25 dB) and the limits for rooftop screens around plant.
2. Plant enclosures and acoustic louvres: insertion loss ranges (government guides first; maker claims labelled).
3. Low-noise variants: sound power of low-noise or "super low noise" air-cooled chillers and dry coolers at a stated capacity (maker data sheets: label maker claims; give model, capacity, Lw, conditions).
4. Night fan-speed reduction: sound power change with fan speed (fan laws in a standards or government source; maker claims for EC fans).
5. Distance and ground effects the tool already uses (Lp = Lw − 20 log r − 8): confirm the hemispherical-radiation formula in a government source, and whether multiple units add as 10 log n.
6. How each by-law treats mitigation (does it only judge the received level; any approval or acoustic report requirement; Vancouver By-law 6555, Edmonton Bylaw 14600; register ids bylaw6555, bylaw14600, src_fill_van6555s21, arch_adj_edm14600).
7. Case evidence: any Canadian data-centre or similar development permit or acoustic report (government-hosted) showing the mitigation used to meet these by-laws.
Output: checks/research_arch_v1/noise_mitigation.md (table per item: what | value | source id | where | kind | confidence; then gaps and paywalled) and noise_mitigation_sources.json ({"arch_nz_<camelCase>": "KIND: title, issuer, date: quoted figures with section/page — URL"}). No commits. Reply under 120 words: what reductions the tool could model with sources, and gaps.
