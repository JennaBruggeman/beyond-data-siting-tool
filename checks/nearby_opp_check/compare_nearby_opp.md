# Who is nearby and what it could become: hand calculation (A) against the screen (B), 1 Nov 2026

A = `checks/nearby_opp_check/nearby_opp_check.json` (with `build_nearby_opp_check.py`; 39 parts: 10 prospect, 29 opportunity). B = `checks/nearby_opp_check/screen/<LOT>_tabs.json` (tabs heat, energy, water, materials, social, opps2, opts, and the 22 opportunity cards; only the gate text above each card's source list was used).
Read-only. Nothing in the tool, register or A was changed. `tool/*.js` and `checks/agents/` were not opened, so causes are taken from screen text and arithmetic only.

## IT load: same split as the place and emit stages

| Lot | A assumed | Tool used (`mw`) | Factor applied to A's linear figures |
|---|---|---|---|
| V09 | 2.5 MW | 9.6 MW | × 3.840 |
| E05 | 10.2 | 33.1 | × 3.245 |
| CLARK | 5.2 | 7.7 | × 1.481 |
| E123 | 22.2 | 21.9 | × 0.986 |
| V339 | 3.8 | 3.8 | × 1 |
| E06A | 10.2 | 10.2 | × 1 |
| E06B | 10.2 | 10.2 | × 1 |
| HAST | 1.1 | 1.9 | × 1.727 |

Rescaled (× factor): homes_heated, homes_heated_2050s, greenhouse_area, aquaculture_tonnes, algae_kg, snowmelt_area, copper_tonnes, battery, ups_flex, btes, chp_heat.
Not rescaled: everything that depends on place, not size (receivers, people, densities, distribution cost, offerable area, refuge figures, coefficients).

Heat basis (sets most opportunity gaps). Screen heat offered = IT × 0.6 × 8,760 h × 0.57–0.75 × COP ÷ (COP − 1), COP 4.5 low, 3.0 high; rebuilt exactly from the greenhouse figures (V09: 36,978–56,765 MWh, screen "37–57 GWh/yr"). A takes heat_delivered from emit_check: facility energy (× PUE 1.4–1.55) × 0.5–0.8 × the same COP term. Screen ÷ A = 0.814 low, 0.605 high on every lot.
The capture share on screen is now 57–75 % ("LBNL 2014 — direct-to-chip 57–75%"); emit compare (30 Oct) recorded 48–75 %. Changed since that check.

## Summary: part × verdict (8 lots each)

| Part | Stage | MATCH | DIFFERS | NOT SHOWN | NOT COMPARABLE |
|---|---|---|---|---|---|
| offerable_area | prospect | | | 8 | |
| receiver_radius | prospect | 8 | | | |
| heat_density | prospect | | | 8 | |
| linear_heat_density | prospect | | | 8 | |
| distribution_cost | prospect | | | | 8 |
| receiver_demand | prospect | | | 8 | |
| deprivation | prospect | | | | 8 |
| people_affected | prospect | | 8 | | |
| receivers_nearby | prospect | 4 (V09, CLARK, V339, HAST) | 4 (E05, E123, E06A, E06B) | | |
| competing_sources | prospect | | | 8 | |
| refuge_people | opportunity | | | 8 | |
| clean_air_volume | opportunity | | | | 8 |
| cooling_centre_people | opportunity | | | | 8 |
| homes_heated | opportunity | | 8 | | |
| greenhouse_area | opportunity | | 8 | | |
| aquaculture_tonnes | opportunity | | 8 | | |
| algae_kg | opportunity | | | 8 | |
| insect_check | opportunity | | | 8 | |
| distributed_servers_homes | opportunity | | | | 8 |
| ev_stalls | opportunity | | | | 8 |
| ev_area | opportunity | | | | 8 |
| stored_heat | opportunity | | | | 8 |
| storage_footprint | opportunity | | | | 8 |
| sewage_heat | opportunity | | | | 8 |
| copper_tonnes | opportunity | | 8 | | |
| ewaste | opportunity | | | | 8 |
| rare_earth | opportunity | | | | 8 |
| battery | opportunity | | 8 | | |
| ups_flex | opportunity | | | 8 | |
| btes | opportunity | | | 8 | |
| tes_volume | opportunity | | | | 8 |
| absorption | opportunity | | | | 8 |
| homes_heated_2050s | opportunity | | | 8 | |
| chp_heat | opportunity | | | 8 | |
| snowmelt_area | opportunity | | 8 | | |
| backup_neighbours | opportunity | | | | 8 |
| community_solar | opportunity | | | | 8 |
| fire_water | opportunity | | | | 8 |
| refuge_services | opportunity | | | 8 | |
| **Total (312)** | | **12** | **60** | **104** | **136** |

## MATCH: what was compared

| Part | Screen text (quoted) | A | Note |
|---|---|---|---|
| receiver_radius | heat tab "None of the … buildings with a known heat demand within 3 km" | 3,000 m | All 8. |
| receivers_nearby (V09) | "None of the 1006 buildings with a known heat demand …" + "67 more … have no demand figure yet" = 1,073 | 1,082 (1,015 with demand, 67 without) | −0.8 %; no-demand count exact. |
| receivers_nearby (CLARK) | 688 + 41 = 729 | 744 (700 + 44) | −2.0 % |
| receivers_nearby (V339) | 989 + 66 = 1,055 | 1,067 (1,001 + 66) | −1.1 %; no-demand exact. |
| receivers_nearby (HAST) | 944 + 62 = 1,006 | 1,011 (948 + 63) | −0.5 % |

## DIFFERS

| Lot | Part | A (× factor) | Screen (quoted) | Gap | Likely cause |
|---|---|---|---|---|---|
| E05 | receivers_nearby | 267 (232 + 35) | "225 buildings with a known heat demand"; "35 more" | −2.6 % | Screen is lower on every lot, always in the with-demand group (−4 to −12). A measures lot edge to point; the tool's origin (edge or centre) is not on screen: ? |
| E123 | receivers_nearby | 135 (126 + 9) | "122 …"; "8 more" | −3.7 % | same |
| E06A | receivers_nearby | 175 (157 + 18) | "150 …"; "19 more" | −3.4 % | same |
| E06B | receivers_nearby | 183 (163 + 20) | "158 …"; "21 more" | −2.2 % | same |
| V09 | people_affected | 200 m 889; 500 m 6,400 | social "within 200 m about 370 people in 225 households"; "within 500 m about 4,950 people in 3,030 households" | −58 % / −23 % | Screen: "2021 census, spread evenly over each dissemination area and summed by 100 m cell". A: raw DA counts × area share of the 200 / 500 m buffer from the lot edge (register's 100 m grid not used, A note). Where the cell distance is measured from: ? Shares of 65+ agree (A 6.6 / 9.3 %, screen 7 / 9 %). |
| E05 | people_affected | 819; 5,097 | "about 340 … 180 households"; "about 4,390 … 2,325" | −58 % / −14 % | same |
| CLARK | people_affected | 453; 3,942 | "about 270"; "about 3,350" | −40 % / −15 % | same |
| E123 | people_affected | 212; 1,307 | "about 90"; "about 910" | −57 % / −30 % | same |
| V339 | people_affected | 782; 5,675 | "about 400"; "about 4,950" | −49 % / −13 % | same |
| E06A | people_affected | 13; 223 | "about 0 people in 0 households"; "about 180" | −100 % / −19 % | same |
| E06B | people_affected | 16.5; 230.5 | "about 0"; "about 190" | −100 % / −18 % | same |
| HAST | people_affected | 1,281; 6,067 | "about 1,000"; "about 4,850" | −22 % / −20 % | same |
| V09 | homes_heated | 2,702–5,583 | heat tab "2,588–3,973 homes' heating, as an equal (provincial average)" | −4.2 % / −28.8 % | Two causes: (1) heat basis (× 0.814 / 0.605, above); (2) screen divides by 14.29 MWh (BC) and 28.17 MWh (AB) a home, A by 16.81 / 33.14. 14.29 = 16.81 × 0.85 and 28.17 = 33.14 × 0.85: the tool appears to apply the 85 % boiler it names on the heat tab (our arithmetic). A's register note: household figure is delivered fuel, "boiler efficiency not sourced". |
| E05 | homes_heated | 4,725–9,764 | "4,526–6,948" | −4.2 % / −28.8 % | same |
| CLARK | homes_heated | 2,167–4,478 | "2,076–3,186" | −4.2 % / −28.9 % | same |
| E123 | homes_heated | 3,126–6,460 | "2,995–4,597" | −4.2 % / −28.8 % | same |
| V339 | homes_heated | 1,069–2,210 | "1,024–1,573" | −4.2 % / −28.8 % | same |
| E06A, E06B | homes_heated | 1,456–3,009 | "1,395–2,141" | −4.2 % / −28.8 % | same |
| HAST | homes_heated | 535–1,105 | "512–786" | −4.2 % / −28.9 % | same |
| V09 | greenhouse_area | 77,849–207,279 m² | Greenhouse card "could warm about 63,391–125,370 m² … at 1.63–2.1 GJ/m²" | −18.6 % / −39.5 % | Heat basis only; coefficients 2.1 / 1.63 GJ/m² agree. |
| E05 / CLARK / E123 | greenhouse_area | 268,416–714,679 / 62,441–166,255 / 177,593–472,854 | "218,568–432,266" / "50,845–100,557" / "144,611–286,001" | same | same |
| V339 / E06A, E06B / HAST | greenhouse_area | 30,815–82,048 / 82,714–220,233 / 15,408–41,024 | "25,092–49,626" / "67,353–133,206" / "12,546–24,813" | same | same |
| V09 | aquaculture_tonnes | 9,872–32,363 t | Aquaculture card "support about 8,039–19,574 t of fish a year by heat alone" | −18.6 % / −39.5 % | Heat basis only; 4.6–2.9 kWh/kg agree. |
| E05 / CLARK / E123 | aquaculture_tonnes | 34,038–111,583 / 7,918–25,957 / 22,521–73,827 | "27,717–67,490" / "6,448–15,700" / "18,338–44,653" | same | same |
| V339 / E06A, E06B / HAST | aquaculture_tonnes | 3,908–12,810 / 10,489–34,385 / 1,954–6,405 | "3,182–7,748" / "8,541–20,797" / "1,591–3,874" | same | same |
| V09 | snowmelt_area | 8,012–25,509 m² | Snowmelt card "about 5 MW of heat (the middle of what this size offers) keeps about 8,270–12,740 m² clear at 420–647 W/m²" | +3.2 % / −50.1 % | Screen divides one heat figure (the middle of its range) by both W/m² ends; A pairs low heat with the high W/m² and high heat with the low. W/m² agree (Van 420–647, Edm 430–700). |
| E05 / CLARK / E123 | snowmelt_area | 25,534–85,906 / 6,427–20,460 / 16,894–56,838 | "26,355–42,904" / "6,633–10,218" / "17,437–28,386" | same | same |
| V339 / E06A, E06B / HAST | snowmelt_area | 3,172–10,097 / 7,869–26,473 / 1,586–5,049 | "3,274–5,043" / "8,121–13,221" / "1,637–2,521" | same | same |
| V09 | copper_tonnes | 115–230 t | Copper card "192–384 t of copper in the facility (industry figure)" | +66.7 % both ends | Screen = IT nameplate × 20–40 t/MW; A = it_load_actual (0.6 × IT), per the part's named input. A's own nameplate route (extra) gives 384 at the high end: match. Which basis the register means: ? (A note: t/MW is per MW of capacity). |
| E05 / CLARK / E123 | copper_tonnes | 397–794 / 92–185 / 263–526 | "662–1,324" / "154–308" / "438–876" | +66.7 % | same |
| V339 / E06A, E06B / HAST | copper_tonnes | 46–91 / 122–245 / 23–46 | "76–152" / "204–408" / "38–76" | +66.7 % | same |
| all 8 | battery | it_load_actual × 1–8 h; at 4 h: V09 23.0, E05 79.4, CLARK 18.5, E123 52.5, V339 9.1, E06A/B 24.5, HAST 4.6 MWh | energy tab "1 MW for 4 hours, 4,000 kWh (set in the battery add-on)" on every lot | V09 −83 % at 4 h; HAST −12 % | Screen uses the add-on's fixed default (1 MW), not the data centre's load. Cost per kWh matches: screen "$1,867,461–$2,506,759" ÷ 4,000 = 466.87–626.69, A cost_checks 466.87–626.69. |

## Sub-figure checks (not one of the 39 verdicts)

| Item | Screen | A | Result |
|---|---|---|---|
| Lot inside a heat network (competing_sources extra `lot`) | V09, V339 "inside the Neighbourhood Energy Utility"; E06A, E06B "inside the Blatchford …"; HAST "inside the Creative Energy"; CLARK NEU edge 263 m, E05 DDE edge 915 m, E123 Blatchford edge 443 m (outside) | inside: V09, V339, E06A, E06B, HAST; outside: E05, CLARK, E123 | match on all 8. A's headline (receivers inside an outline: 370, 56, 229 …) is not on screen. |
| Rinks within 3 km (competing_sources extra) | building lists: E05 "3 arenas", E123 "2 arenas", E06A/B "3 arenas"; none in Vancouver | E05 3, E123 2, E06A/B 3, Van 0 | match |
| Non-market demand (receiver_demand) | V09 "22,272 non-market homes within 3 km would take about 318 GWh a year"; CLARK 18,132 / 259; V339 22,026 / 315; HAST 19,824 / 283 | A uses units × 16.81 MWh, no total printed for the subset | screen = homes × 14.29 MWh (the 0.85 again); A would give 374 GWh for V09. Full receiver_demand sum not on screen. |
| Care homes and hospitals within 1 km (backup_neighbours extra) | V09 "1 care home"; E05 "5 care homes (230 units) and 1 hospital"; CLARK 3; E123 "No care homes"; V339 1; E06A/B 1; HAST 5 | 1, 6, 3, 0, 1, 1, 1, 5 | match on all 8 |
| Households for 2 MW (community_solar extra) | Van "2 MW needs at least 84 households (24 kW each)"; Edm "micro-generation … it cannot sell to the neighbour" | 84; AB rule as register | match; rule text agrees in both provinces |
| Ground-floor rule (offerable_area extra) | V09, CLARK, V339 "this zone keeps the ground floor free of data storage"; E05, E123, E06A/B "nothing in the zone requires another use at grade"; HAST "not known: this zone's rules are not yet read" | yes (I-3, I-2); no rule (IM, IH, BE, DD) | match on 7; HAST (DD) differs: A "no ground-floor rule", screen "not yet read": ? The 200–600 m² support block is not on screen. |
| Refuge rules (refuge_services) | "5 toilets per 75–100 people, 1 shower per 50 and about 126 L of water a person a day (BC ESS guide 2012)" | 126 L × people; toilets from 75–100 | rule matches; no people or L/day figure on screen |
| EV stalls per MW (ev_stalls reference) | "1 MW set aside serves about 52–270 Level 2 stalls (7.4 … to 19.2 kW)" | 2.86–270.3 per MW | high end match; A's low end includes DC fast chargers at 350 kW, screen is Level 2 only |
| m² per stall (ev_area reference) | V09 "4,167 m² … about 189 stalls"; E05 304 / 13; CLARK 404 / 18; V339 2,700 / 123; E06A 426 / 18; E06B 456 / 19; HAST 255 / 12 | 13.75–22 (Van), 14.3–23.4 (Edm) | screen uses the high end (22 / 23.4 m², rounded): match on all 8 |
| Absorption temperature | "air-cooled heat (25–47 °C) is too cold for an adsorption chiller (about 45–65 °C) or an absorption chiller (70–90 °C or more)" | "no: 25–60 °C is below 70 °C" | agrees in kind; screen's air band 25–47 °C differs from A's 25–60 °C (liquid run), as found in emit compare |
| Snowmelt middle heat | V09 "about 5 MW"; E05 18; CLARK 4; E123 12; V339 2; E06A/B 6; HAST 1 | screen mid heat (e.g. V09 46.87 GWh ÷ 8,760 = 5.35 MW) | consistent with the screen's own heat range |
| Fire water | "non-potable firefighting water: no permit if unconnected and marked (DWPR s. 3.1(b))"; Edm NBC(AE) 3.2.5.7; "the volume is not sized" | same rule; volume not sized | agrees |

## NOT COMPARABLE

- A not computable (13 parts × 8): deprivation, clean_air_volume, cooling_centre_people, distributed_servers_homes, ev_stalls, ev_area, stored_heat, storage_footprint, sewage_heat, ewaste, rare_earth, tes_volume, absorption. Reference values checked above where the screen shows one.
- Qualitative in A (3 × 8): backup_neighbours, community_solar, fire_water. Rules and the counts in A's extra agree (above).
- distribution_cost (8): A is an area figure in 2015 € per GJ (Persson; CAD not convertible). The screen gives a per-building cost of heat including the heat pump (V09 "$48 ($38–$65) against $40 worth") — a different quantity.

## NOT SHOWN

No figure for these parts in any tab or card on any of the 8 lots (source lists excluded):

- offerable_area (only the ground-floor rule), heat_density, linear_heat_density (no GJ/ha or GJ/m anywhere), receiver_demand (only the non-market subset), competing_sources (only the lot's own status and arena counts).
- refuge_people, refuge_services: rule only.
- algae_kg, insect_check: the Aquaculture / insects / algae card shows fish only.
- ups_flex: the screen shows "24–37 UPS battery cabinets" (V09), a different part (battery_cabinets), and the add-on "Offer UPS batteries to the grid" without a figure.
- btes: only yard area ("4,167 m² of yard left for a borefield"; "little yard left" on 5 lots).
- homes_heated_2050s: no 2050s figure anywhere.
- chp_heat: only the add-on "Own gas power plant with heat — not yet known".

## Triage of 30 Oct (`checks/opportunity_triage_2026-10-30.md`): strikes not yet applied

All 8 lots show the same 22 cards and the same 8 energy add-ons. The triage says strikes and moves are "to be applied to the register and tool in one pass"; none is applied yet.

| On screen (all 8 lots) | Where | Triage | Status on screen |
|---|---|---|---|
| Backup power for neighbours in a blackout | card 12 | #31 Strike | present ("speculative"; "not here" on the 4 Edmonton lots) |
| Cooling for neighbours | card 20; also add-on "Cooling for neighbours (absorption or adsorption chiller)" | #22 Strike | present |
| Solar on neighbours' roofs | card 14 | #27 Strike | present |
| Grid upgrades shared with neighbours | card 13 | #32 Strike | present ("built here") |
| Distributed servers as heaters | card 9 | #9 Strike | present ("pilot") |
| Material bank: copper | card 21 | #55 Strike | present, with a tonnage |
| Batteries at end of life | card 22 | #56 Strike | present |
| A battery for the grid | add-on and energy-tab panel (cost per kW) | #28 Strike | present |
| Offer UPS batteries to the grid | add-on | #29 Strike | present |
| Own gas power plant with heat | add-on | #35 Strike | present |
| Reserved capacity and batteries to the grid | card 10 | #30 Move to rules | still a card |
| EV charging hub | card 11 | #33 Move to on site, own connection | still framed as "1 MW set aside" and "more needs an adjacent lot" |
| Seasonal storage in the ground | card 6 | #10, 12 Merge into seasonal heat store | old name |
| Aquaculture / insects / algae | card 5 | #5 Keep fish, drop insects and algae | old name |
| Rainwater, condensate and water reuse | card 15 | #44 condensate Engineering only; #39 rainwater for cooling Architecture | still combined |
| Cleaner backup power; Buy new clean power | add-ons | #36, #34 Engineering only | still offered as add-ons |

Already consistent: Small wind (#38) and Biomass or renewable gas (#37) sit under "Left out, and why". Kept items on screen as cards: district heat, hospital or campus anchor, new district, greenhouse, sewage heat, snowmelt, stormwater, emergency water, warming centre / refuge, meanwhile uses. Kept items with no card yet: pool, bathhouse, laundry, drying, heated public space, housing on the same site, public ground floor.
