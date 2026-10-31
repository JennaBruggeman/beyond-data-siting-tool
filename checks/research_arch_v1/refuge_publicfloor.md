# Refuge + public ground floor — research (30 Oct 2026)

Rules: primary sources only; "?" = not confirmed; "our arithmetic" marked. Ids match refuge_publicfloor_sources.json.

## A) REFUGE (warming / cooling / clean-air room / reception centre)

### Floor area and capacity

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Reception centre floor area | ~3.5 m²/person | arch_ahsReceptionCentres | p. 4 | government guide (AB) | 85 |
| Reception centre, wheelchair / service animal / assistance | up to 9 m²/person | arch_ahsReceptionCentres | p. 4 | government guide (AB) | 85 |
| Sleeping area (group lodging in reception centre) | ≥3.5 m²/person, ~1 m between cots | arch_ahsReceptionCentres | p. 6 | government guide (AB) | 85 |
| Covered living space benchmark (Sphere 2018, via UNHCR) | 3.5 m²/person warm climate; 4.5–5.5 m²/person cold climate | arch_unhcrShelterStandards | "Emergency Shelter Solutions and Standards" | design guide (intl. benchmark) | 75 |
| Clean-air space occupancy | no m²/person; "set before an emergency" using ASHRAE 62.1-2019 | arch_hcCleanerAirSpaces | occupancy section | government guide | 85 |
| Cooling centre m²/person | ? (VCH guide gives none) | arch_vchCoolingSpaces | — | — | — |
| Vancouver cooling network | 39 civic facilities (19 community centres + 20 libraries) | arch_covHeatMemo2025 | p. 3; App. Table 1 p. 6 | government (council memo) | 90 |
| Vancouver cleaner-air spaces | 14 at community centres and libraries "with high-performance air filtration systems" | arch_covHeatMemo2025 | p. 5 | government (council memo) | 90 |
| Vancouver site capacities | ? (memo gives none) | arch_covHeatMemo2025 | — | — | — |
| Edmonton extreme cold overnight site | "up to 50 temporary overnight emergency shelter spaces" (Al Rashid Mosque) | arch_edmExtremeWeather | Extreme Cold section | government (city) | 80 |
| Edmonton respite sites | recreation centres and libraries (cold + heat); no capacities | arch_edmExtremeWeather | Extreme Cold; Extreme Heat & Poor Air Quality | government (city) | 80 |
| BC ESS reception centre m²/person | ? (ESS Program Guide read to 100k of 121k chars: none) | arch_essProgramGuide2025 | — | — | — |

### Services and conditions

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Cooling space indoor temp | "at or below 26°C" | arch_vchCoolingSpaces | p. 5 | government guide (health authority) | 90 |
| Cooling space services | accessible washrooms; drinking water; "maximize air flow and filtration" | arch_vchCoolingSpaces | p. 5, p. 7 | government guide | 90 |
| Clean-air space filter | "MERV value of 13 or more is recommended" | arch_hcCleanerAirSpaces | HVAC section | government guide | 90 |
| Portable air cleaner sizing | CADR (smoke) ≥ 2–3 × room volume per hour | arch_hcCleanerAirSpaces | portable air cleaners | government guide | 90 |
| Clean-air space conditions | <26 °C; CO <10 ppm; CO₂ <1000 ppm; RH 35–50 % | arch_hcCleanerAirSpaces | conditions section | government guide | 90 |
| Clean-air space building features | emergency power; staged entry vestibule; tight envelope; recirculation/outdoor-air switch; PM2.5 monitors | arch_hcCleanerAirSpaces | building features | government guide | 90 |
| Generator placement (clean-air space) | fuel-burning generators away from building, downwind of clean-air intakes | arch_hcCleanerAirSpaces | building features | government guide | 85 |
| Clean-air space water/washrooms | outside document scope | arch_hcCleanerAirSpaces | scope | — | — |
| City of Vancouver new-building filter | "MERV 13 is the starting minimum… for all new Part 3 and Part 9 buildings"; MERV 16 in wildfire-prone areas | arch_covFiltrationStudy | p. 2 | consultant report for City | 70 |
| Reception centre temp (warming) | 19–22 °C | arch_ahsReceptionCentres | p. 4 | government guide (AB) | 85 |
| Reception centre toilets | ~1 per 20–25 people (final number by AHJ under Alberta Building Code) | arch_ahsReceptionCentres | p. 5 | government guide (AB) | 85 |
| Reception centre water | ~2 L/person/day drinking; 7.5–12 L/person/day with food + hygiene | arch_ahsReceptionCentres | p. 4 | government guide (AB) | 85 |
| Vancouver heat warning trigger | ≥29 °C day / ≥16 °C night, 2+ days; emergency ≥31 °C rising 3+ days (Southwest) | arch_bcHarsVch | pp. 3–4 | government guide (BC HEAT criteria) | 75 |
| Edmonton activation | cold ≤ −20 °C with wind chill 3+ days; heat 29 °C day / ≥14 °C night 3+ days; AQHI ≥7 2+ days | arch_edmExtremeWeather | Overview | government (city) | 80 |

### Occupant load (code)

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Non-fixed seats | 0.75 m²/person | arch_ottawaOccLoad | Table 3.1.17.1 (reproduced) | rule (OBC via Ottawa Fire; NBC/BCBC identical ?) | 65 |
| Non-fixed seats and tables | 0.95 m²/person | arch_ottawaOccLoad | same | rule | 65 |
| Standing space | 0.40 m²/person | arch_ottawaOccLoad | same | rule | 65 |
| Dining / cafeteria | 1.10 m²/person | arch_ottawaOccLoad | same | rule | 65 |
| Reading/writing rooms, lounges | 1.85 m²/person | arch_ottawaOccLoad | same | rule | 65 |
| Exhibition halls | 2.80 m²/person | arch_ottawaOccLoad | same | rule | 65 |

Note: these are maximum-density egress loads, not comfort sizes. A refuge sized at 3.5 m²/person (AHS) is ~4–5 × the code assembly density (our arithmetic: 3.5 / 0.75 ≈ 4.7).

### Heat need

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver TEDI, office/retail (VBBL 2021) | 20 kWh/m²·yr (Option A); 30 (Option B, connected to LCES) | arch_covEnergyTargets | p. 2, p. 6 table | government guide | 80 |
| Vancouver TEDI, rezoning (2017) | office 27, retail 21 kWh/m²·yr | arch_covEnergyTargets | p. 2 | government guide | 80 |
| Assembly/community TEDI category | none in VBBL table — ? | arch_covEnergyTargets | — | — | — |
| Library or archives, total EUI (Canada 2019) | 1.01 GJ/m² | arch_statcanSCIEU2019 | Table 2 | government statistics | 90 |
| Recreation centre total EUI | 1.07 GJ/m² | arch_statcanSCIEU2019 | Table 2 | government statistics | 90 |
| Office total EUI | 1.04 GJ/m² | arch_statcanSCIEU2019 | Table 2 | government statistics | 90 |
| Space heating share, commercial/institutional (2020) | 57 % | arch_nrcanTrends2020 | Commercial/Institutional | government statistics | 85 |
| Existing library heat, Canada average | ≈0.58 GJ/m² ≈ 160 kWh/m²·yr (our arithmetic: 1.01 × 0.566 ÷ 0.0036) — existing stock, national, not climate-specific | — | — | our arithmetic | 50 |
| Peak heat W/m² (Vancouver / Edmonton community room) | ? | — | — | — | — |
| Edmonton TEDI-type limit | ? (Alberta uses NECB tiers; not checked) | — | — | — | — |
| Supply water temperature | ? | — | — | — | — |

## B) PUBLIC GROUND FLOOR

### Sizes

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| VPL system space | 0.80 sq ft/capita (2017); guideline 1 sq ft/capita (ARUPLO) | arch_vplFmpSpace2018 | p. 3 | government (library board report) | 85 |
| VPL small branch, proposed | ~10,000 sq ft (East Fraserlands; Collingwood target) ≈ 930 m² (our arithmetic) | arch_vplFmpSpace2018 | p. 5 | government | 85 |
| VPL branch targets range | 10,000–25,000 sq ft (≈ 930–2,320 m², our arithmetic) | arch_vplFmpSpace2018 | p. 5 | government | 85 |
| VPL existing branches | 1,930 (Carnegie) – 13,000 (Oakridge) sq ft; most 3,600–9,700 | arch_vplFmpSpace2018 | p. 5 | government | 85 |
| VPL minimum branch size | ? | — | — | — | — |
| EPL new-branch trigger | population 20,000 growing to 30,000–35,000 in 5 years; no branch within 4–5 km | arch_eplPolicyB2002 | s. 1(a), 1(b) | government (library board policy) | 85 |
| EPL branch m² | ? (policy states none) | arch_eplPolicyB2002 | — | — | — |
| Community room typical/minimum size (Vancouver, Edmonton) | ? | — | — | — | — |

### Zoning

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver I-3 ground floor, data | "Bulk data storage is not permitted at the ground floor, except for entrances." (sub-area A) | arch_covI3Draft2022 | s. 2.2.11 | rule — CONSULTATION DRAFT Apr 2022; adopted text not fetched ? | 55 |
| Vancouver I-3 ground floor, office | health care office and conditional general office "not permitted at the ground floor, except for entrances" | arch_covI3Draft2022 | s. 2.2.6 | rule (draft) | 55 |
| I-3 first-floor height (sub-area A) | ≥6.0 m | arch_covI3Draft2022 | s. 3.1.2.9(a) | rule (draft) | 55 |
| I-3 community centre / neighbourhood house | conditional | arch_covI3Draft2022 | s. 2.1 | rule (draft) | 55 |
| I-3 artist studio | Class A outright; Class B outright in sub-area A | arch_covI3Draft2022 | s. 2.1, 2.2.2 | rule (draft) | 55 |
| I-3 library | not listed | arch_covI3Draft2022 | s. 2.1 | rule (draft) | 55 |
| I-3 restaurant | conditional, total ≤300 m² | arch_covI3Draft2022 | s. 2.2.10 | rule (draft) | 55 |
| I-3 retail | sub-area A, ≤16 seats food; retail ≤1,000 m² | arch_covI3Draft2022 | s. 2.2.8, 3.1.1.1(b)(i) | rule (draft) | 55 |
| Edmonton BE: Community Service | permitted; max 500 m² per establishment (not shelters) | arch_edmZB20001_BE | 2.120, s. 2.19, 3.12 | rule | 90 |
| Edmonton BE: Food and Drink, Indoor Sales and Service | permitted; 500 m² per establishment | arch_edmZB20001_BE | s. 2.8, 2.10, 3.3.1, 3.7.1 | rule | 90 |
| Edmonton BE: Child Care Service, Emergency Service | permitted | arch_edmZB20001_BE | s. 2.18, 2.21 | rule | 90 |
| Edmonton IM: Community Service, Food and Drink, Child Care | not permitted (only Special Event under Community Uses) | arch_edmZB20001_IM | 2.130, s. 2 | rule | 90 |
| Edmonton IM: Office | 300 m² per establishment | arch_edmZB20001_IM | s. 3.5.1 | rule | 85 |
| Edmonton "Community Service" includes | community halls, community league buildings, recreation centres, seasonal/year-round shelters; EXCLUDES Libraries, Child Care, Schools | arch_edmCommunityServiceDef | definition | rule | 90 |
| Edmonton Library use in BE / IM | not listed in either zone ? (separate "Library" use) | arch_edmZB20001_BE; arch_edmZB20001_IM | s. 2 | rule | 75 |

## Gaps (?)

- Adopted Vancouver I-3 schedule: fetch of bylaws.vancouver.ca/zoning/zoning-by-law-district-schedule-i-3.pdf not approved; only the April 2022 consultation draft read. Confirm s. 2.2.11 in adopted text.
- Edmonton Bylaw20001.pdf blocked (robots); zone web pages used instead.
- Sphere Handbook direct page (spherestandards.org) not fetchable; 3.5 m² taken via UNHCR.
- NBC/BCBC Table 3.1.17.1 not read directly; values from Ottawa (OBC) reproduction.
- Cooling centre / clean-air room m²/person, typical capacities in Vancouver/Edmonton: none found.
- BC ESS / EMCR reception centre m²/person; Red Cross planning standard: not found.
- Peak heat W/m², Edmonton heat benchmark, supply temperature: not found.
- Minimum library branch / community room size (both cities): not found.
