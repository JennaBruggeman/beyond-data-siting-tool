# Limits on rezoning beside a data centre (2 Nov 2026)

Question (J.B.): can any site be rezoned to something different? Short answer: **no**. Council can rezone, but only within its plans, the regional plan, and land it controls. Codes and other laws stay.

"?" = not confirmed. "Our reading" = our interpretation, not a clause. New ids `arch_rz_*` in rezoning_sources.json; existing ids reused, not duplicated.
Method note: quotes come from the fetch tool's page extract (short excerpts, max ~125 characters). Re-check against the PDF before they go into the register.

## 0. Key findings

- **Vancouver now has a citywide ODP** (By-law 14660, enacted 31 Mar 2026). Council "shall not authorize, permit, or undertake any development contrary to or at variance with" an ODP (Charter s. 563(2)). Industrial and Employment land in the ODP: production, distribution, repair; "Residential uses are generally not permitted." Community facilities incl. childcare are "enabled within every GLU designation except Agricultural."
- **Public hearing (Vancouver):** required unless the by-law is consistent with an ODP (s. 559.02(1), (3)). A non-residential, ODP-consistent rezoning (e.g. industrial or institutional) *may* skip the hearing; Council still decides.
- **Regional (Metro 2050):** changing Industrial or Employment land to another of Industrial / Employment / General Urban inside the Urban Containment Boundary is a **Type 3** amendment: "an affirmative 50% + 1 weighted vote" of the MVRD Board. Type 2 (two-thirds) is for UCB, Rural, Agricultural changes and Employment to General Urban *outside* the UCB.
- **Edmonton:** "City Council makes the final decision on rezoning and plan amendment applications at a City Council Public Hearing." District Plans "will inform and guide" rezonings; new Direct Control zones "must align with" them; City Plan prevails. Medium and heavy industrial land: conversion to other non-residential uses (incl. public uses) discouraged (District Policy 2.5.3.4).
- **Edmonton regional (EMRB):** rezonings themselves are **not** referred. A *plan amendment* is referred if, outside Downtown, it converts more than 32 ha of a major employment area to non-employment uses or changes its boundaries (REF 4.3(d)).
- **Most data-centre lots need no rezoning for a public use:** zoning.md already shows Community Centre, Child Day Care, Fitness Centre etc. are conditional in I-2 / I-3 A / I-1C / FC-2. A rezoning is only needed for a use the district does not list.

## 1. Vancouver

| what | rule | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Power to zone | "The Council may make by-laws ... dividing the city or any portion thereof into districts or zones"; "regulating, within any designated district or zone, the use or occupancy of land" | arch_rz_vanCharter28 | Vancouver Charter s. 565(1)(a), (b) | rule | 85 |
| Comprehensive (CD-1) zoning | s. 565(1)(f)(ii): zones where development needs Council approval of form; "CD-1" not named in the Charter | arch_rz_vanCharter28 (related part: van_cd1, not a source) | s. 565(1)(f)(ii) | rule | 70 |
| Public hearing required | Council "must not adopt" an ODP or zoning by-law "without holding a public hearing on the by-law" | arch_rz_vanCharter28 | s. 559.02(1) | rule | 85 |
| Hearing optional | not required for a zoning by-law consistent with an ODP | arch_rz_vanCharter28 | s. 559.02(3) | rule | 85 |
| Hearing prohibited | consistent with ODP and residential ≥ half the gross floor area; or sole purpose s. 565.03 | arch_rz_vanCharter28 | s. 559.02(4), (5) | rule | 85 |
| Who decides | after a hearing Council "may adopt the proposed by-law" | arch_rz_vanCharter28 | s. 559.07(1) | rule | 80 |
| Origin of the hearing rules | Bill 18-2024, Vancouver Charter Amendment Act (No. 2), 3rd reading 10 Apr 2024; s. 5 adds the hearing rules; s. 18 repeals old s. 566 (new s. 566 = zoning-amendment fees); s. 28 transition | arch_rz_vanBill18 | Bill s. 5, s. 18, s. 28 | rule (bill) | 80 |
| City process | ODP-consistent with <50 % residential (e.g. "majority industrial, office, or institutional uses"): Council may refer to hearing or decide at a Council meeting; not ODP-consistent: hearing required | arch_rz_vanDAPfaq | FAQ pp. 2-3 (DAP By-law 14357, eff. 9 Jun 2025) | government guide | 80 |
| ODP binds Council | "The Council shall not authorize, permit, or undertake any development contrary to or at variance with the" ODP; contrary development unlawful | arch_rz_vanCharter28 | s. 563(2), (3) | rule | 85 |
| Citywide ODP | By-law No. 14660, enacted 31 Mar 2026; "all future development must be consistent with (not contrary to or at variance with) the Vancouver ODP" | arch_rz_vanODP14660 | cover; p. 20 (or 19 ?) | rule | 85 |
| ODP: Industrial and Employment | "primarily intended for production, distribution, and repair activities"; office upper floors; hotels near rapid transit; "Residential uses are generally not permitted" | arch_rz_vanODP14660 | p. 51 (or 50 ?); GLU p. 77 | rule | 85 |
| ODP: community uses | community facilities, incl. "childcare centres," "enabled within every GLU designation except Agricultural" | arch_rz_vanODP14660 | p. 72 | rule | 75 |
| ODP: jobs only | "preserving employment lands as exclusively 'jobs only'" (Rapid Transit Areas) | arch_rz_vanODP14660 | FG1.6.3 (Rapid Transit Areas), p. 56 (or 55 ?) | rule | 80 |
| ODP: urban structure | Urban Structure Strategy "does not enable rezonings" | arch_rz_vanODP14660 | p. 40 (or 39 ?) | rule | 75 |
| ODP and region | Regional Context Statement (App. A) "confirms consistency with the Regional Growth Strategy"; Board acceptance of the updated RCS is an adoption requirement | arch_rz_vanODP14660 | p. 11, p. 20 (or 19 ?); App. A p. 182 | rule | 75 |
| Industrial Lands Policy | rezoning of industrial land only if "enabled by a Council approved area plan or policy" (5.1.1); minor non-residential amendments with no height/density increase (5.2.1); housing only on sites identified for affordable rental housing in a Council approved area plan (5.3.1); replaces 1995 policies | arch_rz_vanIndLands2023 | App. C s. 5.1-5.3 (RTS 15772, report 31 Oct 2023; approved 14 Nov 2023 per arch_rz_vanHousingIndMemo2025) | government policy | 75 |
| Same policy: institutional/community | institutional, community or public uses not addressed (absence, our reading; no clause) | arch_rz_vanIndLands2023 | App. C | government policy | 60 |
| City framework for housing on industrial land | Type B sites: "Do not support housing. Creates expectations for future conversion"; outside the 200 m clause, housing "only allowed after the Metro Vancouver Board approves a change in the land use designation to General Urban" = Type 3, 50 % + 1 weighted vote | arch_rz_vanHousingIndMemo2025 | Table 1 p. 4; p. 3; App. D p. 11 ? (memo RTS 16078, 17 Mar 2025) | government guide | 80 |
| Public benefits on industrial rezonings | Principle (e): "childcare, green spaces, arts and culture, and community economic development" where feasible | arch_rz_vanHousingIndMemo2025 | p. 4 | government guide | 70 |
| Data-centre rezoning precedent | CD-1 rezoning 111 E 5th Ave: data centres are "Transportation and Storage use" | arch_open_vanRezoning111E5 | RTS 19744 p. 4 | government report | 85 |
| ELER (Employment Lands and Economy Review) | background study (Phase 2 report 15 Oct 2020); superseded in practice by the 2023 Industrial Lands Policy and the ODP (our reading) | ? (not read) | ? | ? | 30 |

## 2. Metro Vancouver (regional)

| what | rule | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Industrial designation | "intended for heavy and light industrial activities"; "Residential uses are not intended"; "Limited industrial-serving commercial uses" | arch_adj_mvIndGuide | Guideline p. 4 | government guide | 85 |
| Employment designation | "intended for light industrial, commercial, and other employment-related uses"; residential only upper floors within 200 m of rapid transit | arch_adj_mvIndGuide | p. 4 | government guide | 85 |
| Institutional = non-industrial | non-industrial list incl. "Institutional uses (e.g. schools, day cares, hospitals)" and places of worship; "Other uses, including residential, stand-alone office, and retail, are not appropriate" | arch_adj_mvIndGuide | p. 8, p. 19 | government guide | 80 |
| Type 1 | "an affirmative 50% + 1 weighted vote" + acceptance by all affected local governments (goals, strategies, LGA s. 437(4) matters) | arch_rz_mvAmendGuide2025 | s. 1.0 pp. 3-4 | government guide | 85 |
| Type 2 | "an affirmative two-thirds weighted vote" + enhanced engagement: UCB changes, some Agricultural / Conservation and Recreation changes, Rural to Industrial/Employment/General Urban, Employment to General Urban **outside** UCB | arch_rz_mvAmendGuide2025 | s. 1.0 p. 3 | government guide | 85 |
| Type 3 | "an affirmative 50% + 1 weighted vote": incl. Industrial, Employment or General Urban to "any other such regional land use designation(s)" **inside** UCB | arch_rz_mvAmendGuide2025 | s. 1.0 p. 4 item b | government guide | 85 |
| Who starts it | member jurisdiction (OCP/ODP amendment + Council resolution + RCS amendment) or Metro Vancouver; "encouraged" (not required) to submit after the local public hearing and bylaw reading | arch_rz_mvAmendGuide2025 | s. 2.0 pp. 4-6; s. 3.0 p. 7-8 ? | government guide | 80 |
| Municipal flexibility | Metro 2050 s. 6.2.7: boundary adjustments inside UCB without amendment, only if the RCS has permitting language; notify Board within 30 days (6.2.9) | arch_rz_mvAmendGuide2025 | s. 1.0 pp. 3-5 | government guide | 75 |
| Vancouver's RCS uses 6.2.7? | ? (ODP App. A not read for this) | ? | ? | ? | 0 |
| Regional public hearing | not described in the guideline; public input is "a minimum of 45 days" comment | arch_rz_mvAmendGuide2025 | s. 2.0 p. 6; s. 4.0 pp. 9-11 ? | government guide | 60 |

## 3. Edmonton

| what | rule | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Who decides | "City Council makes the final decision on rezoning and plan amendment applications at a City Council Public Hearing" | arch_rz_edmRezoning | Rezoning and Plan Amendments page | government guide | 85 |
| Consistency (City) | non-complex applications must "Align with all statutory plans in effect and other City guidelines" | arch_rz_edmRezoning | same | government guide | 75 |
| DC notice | "Applications for Direct Control Zones require a 21-day pre-application notice" | arch_rz_edmRezoning | same | government guide | 80 |
| MGA power, public hearing, DC (s. 639, 641, 692) | ? King's Printer blocked (robots); not read | ? | ? | ? | 0 |
| City Plan | Charter Bylaw 20,000, approved 7 Dec 2020; "combines a Municipal Development Plan and Transportation Master Plan" | arch_rz_edmCityPlan | City Plan page | government guide | 85 |
| District Policy status | "additional statutory plans" under MGA s. 635.1; Charter Bylaw 24000 (2 Oct 2024), consolidation Apr 2026 | arch_rz_edmDistrictPolicy | s. 1.2 p. 10 | rule | 80 |
| City Plan prevails | "In the event of a discrepancy, The City Plan shall prevail over the District Plans and District Policy" | arch_rz_edmDistrictPolicy | s. 1.2 p. 10 | rule | 85 |
| Rezonings | District Plans and Policy "will inform and guide" rezonings, discretionary permits, text amendments; where an ARP/ASP applies, that plan guides | arch_rz_edmDistrictPolicy | s. 1.1, 1.2, 1.3 | rule | 80 |
| Direct Control | DC zones approved after adoption "must align with" the District Policy and District Plan | arch_rz_edmDistrictPolicy | s. 1.3 p. 11 | rule | 80 |
| Industrial land | Commercial/Industrial Employment areas "exclude residential uses" except special cases; preserve medium and heavy industry; "Discourage conversion to other non-residential uses" (so public uses too) unless industrial use impractical or incompatible with surroundings | arch_rz_edmDistrictPolicy | s. 2.5.3.2, 2.5.3.4 p. 28 (am. Bylaw 21164); glossary p. 44 | rule | 80 |
| Community uses | districts need enough Urban Service land for schools, utility, emergency and community services; recreation and early learning supported | arch_rz_edmDistrictPolicy | s. 2.5.1.3, 2.5.1.9 | rule | 70 |
| Plan amendment | "All amendments to the plan must be presented as a proposed bylaw to City Council for consideration at a public hearing" | arch_rz_edmDistrictPolicy | s. 1.4 p. 11 | rule | 85 |
| Unlisted use | an activity deemed to a Use is "always considered a Discretionary Use" (general rule; applying it to a data centre is our reading) | arch_zon_Edm720 | Bylaw 20001 s. 7.20 3.3.2 | rule | 90 |

## 4. Edmonton Metropolitan Region

| what | rule | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Growth Plan binds | approved by Alberta "making it a requirement that member municipalities align their respective statutory plans to the growth plan" | arch_rz_emrbFact2021 | fact sheet | government guide | 80 |
| Legal basis | approved "pursuant to Section 708.1 of the Municipal Government Act"; REF in Ministerial Order MSD:088/20 (14 Dec 2020) | arch_rz_emrbRef2024 | Toolkit p. 4, p. 7 | government guide | 80 |
| What is referred | statutory plans and amendments only; rezonings not referred (toolkit silent on LUB) | arch_rz_emrbRef2024 | REF 4.1, 4.3 pp. 9-14 | government guide | 70 |
| Trigger for an industrial lot | outside Downtown, an amendment that converts more than 32 ha of a major employment area to non-employment uses, or changes its boundaries | arch_rz_emrbRef2024 | REF 4.3(d) | government guide | 80 |
| Other triggers | within 0.4 km of planned LRT or TOD Centre, or includes a Park and Ride; unplanned regional infrastructure or >8 ha ASP expansion; regional water/wastewater capacity; within 0.8 km of future pipeline corridor | arch_rz_emrbRef2024 | REF 4.3(c), (e), (f), (j) | government guide | 75 |
| Test and decision | consistent with the Growth Plan; EMRB recommendation within 25 working days; 28-day appeal period if approval recommended; Board decides | arch_rz_emrbRef2024 | s. 8.1; p. 8 | government guide | 75 |
| District plans | new statutory plans, need REF submission | arch_rz_emrbRef2024 | pp. 39-40 | government guide | 70 |

## 5. Land outside city zoning

| what | rule | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Port land use plan | port authority "shall ... develop a detailed land-use plan" that takes into account "zoning by-laws that apply to neighbouring lands" | arch_rz_canMarineAct48 | Canada Marine Act s. 48(1) (current to 19 Oct 2026) | rule | 85 |
| Port projects | projects must conform to uses in the Land Use Plan; "Port Terminal" designation "primarily for deep-sea marine and river terminals" | arch_rz_vfpaLup2026 | Backgrounder, 18 Aug 2026 | government agency guide | 75 |
| Port permits | PER "applies to all proposed physical works and activities on federal lands and waters" | arch_sys_vfpaPER | p. 3 | government agency guide | 85 |
| City zoning does not apply on port/federal land | ? no primary source read says so in words (Marine Act s. 48(1), VFPA backgrounder and PER guide all silent); our reading only | ? | ? | ? | 40 |
| Provincial Crown land | ? not researched | ? | ? | ? | 0 |
| ALR (BC) | bylaws inconsistent with ALCA have "no force or effect"; local governments "may only permit uses or structures on ALR land if it is permitted under the ALCA"; non-farm use needs an ALC application | arch_rz_alcBylawGuide | s. 2.1, 4.2 (ALCA s. 18, 46(4)) | government guide | 80 |
| Is any Vancouver data-centre lot in the ALR? | ? (check ALC map; likely only relevant in south Vancouver) | ? | ? | ? | 0 |
| Alberta equivalent of ALR | ? none found; not confirmed | ? | ? | ? | 0 |

## 6. What a rezoning cannot change

| what | rule | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Scope of zoning | zoning by-laws regulate use, occupancy, density, height, form (s. 565(1)); building and fire safety sit in separate by-laws (VBBL, Fire By-law 14419) | arch_rz_vanCharter28; vanFire14419 ? (register entry unverified, no source text) | s. 565(1) | rule + our reading | 50 |
| Building / fire code | a rezoning does not vary the VBBL, BCBC, NBC(AE) or fire codes: our reading; no clause read that says so | ? | ? | our reading | 40 |
| Alberta: bylaw vs provincial law | MGA s. 13 (bylaw inconsistent with enactment) and Safety Codes Act: ? not read (King's Printer blocked) | ? | ? | ? | 0 |
| ALR, federal port law | above: provincial and federal law prevail over city zoning | arch_rz_alcBylawGuide; arch_rz_canMarineAct48 | — | rule / guide | 70 |

## 7. Labels for the tool

Our reading, built from the rules above. Check in order; first match wins.

| label | when | based on |
|---|---|---|
| **not possible** | the program breaks a building or fire code, ALR rule, or federal law that zoning cannot vary | §5, §6 (conf. 40-80) |
| **outside city zoning** | lot is port authority / federal land (VFPA Land Use Plan + PER apply) | §5 (conf. 40-75) |
| **needs a regional amendment** | Vancouver: lot is Metro Industrial or Employment and the program is not an industrial / employment use the designation allows (e.g. housing outside the 200 m clause) → Type 3, 50 % + 1 weighted vote, after Council. Edmonton: the plan amendment converts >32 ha of a major employment area (outside Downtown) or changes its boundary → EMRB REF | §2, §4 |
| **needs a rezoning (council decision)** | program is not listed in the lot's district (NP in zoning.md) but fits the ODP / District Plan; Council decides (hearing unless ODP-consistent, Vancouver; public hearing, Edmonton) | §1, §3 |
| (no label) | program already listed O / C / D in the district | zoning.md |

Open question for the label: is an institutional / community use (e.g. library, pool) on **Metro Industrial** land a regional amendment? Metro guideline calls institutional "non-industrial", but the Vancouver ODP enables community facilities in every GLU. ? — needs Metro 2050 text (s. 2.2.9) and Vancouver's RCS.

## 8. Gaps "?"

- Alberta MGA text (s. 13, 618, 638, 639, 640, 641, 692, 708.x): King's Printer refused (robots). Not circumvented (no CanLII or City-hosted copies used).
- Edmonton DC zones discussion paper: robots refused. VFPA land use FAQ: site error.
- Vancouver RCS (ODP App. A): which Metro designations cover each data-centre lot; whether 6.2.7 language is included.
- Metro 2050 bylaw text itself (s. 2.2.9, 6.3): only the guidelines read.
- Primary statement that municipal zoning does not bind federal port land; provincial Crown land.
- Clause stating a zoning by-law cannot vary building / fire codes (BC and Alberta).
- ELER Phase 2 (2020) not read; Industrial Lands Policy final adopted text (only the Oct 2023 report appendix read).
- Edmonton: which lots are in a Growth Plan "major employment area" (map not read).
- Edmonton City Plan full PDF (48 MB) not read; only its web page.
- All quotes via fetch-tool extracts; re-check exact wording against the PDFs.
- Session note: direct downloads (curl) refused by the session proxy for all hosts; pages read with the web fetch tool.

Check 2 applied (2 Nov 2026)

Check 3 applied (2 Nov 2026)
