# Place stage: hand calculation (A) against the screen (B), 30 Oct 2026

A = `checks/place_check/place_check.json` (with `build_place_check.py`). B = `checks/place_check/screen/<LOT>_tabs.json`.
Read-only. Nothing in the tool, register or A was changed.

## IT load: the tool used a different size on 5 of 8 lots

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

Every comparison below uses A × factor. Cross-check after rescaling: annual energy matches on all 8 lots (e.g. V09 A 70.6–78.2 GWh, screen "71–78 GWh"; E05 A 243.6–269.7, screen "244–270"). So both sides use PUE 1.4–1.55 and load factor 0.6.

## Summary: part × verdict (8 lots each)

| Part | MATCH | DIFFERS | NOT SHOWN | NOT COMPARABLE |
|---|---|---|---|---|
| sewer_sink | 8 | | | |
| surface_water_sink | | | 8 | |
| rooftop_solar | | | | 8 |
| self_gen_rules | 4 (Edm) | 4 (Van) | | |
| electricity_price | 4 (Edm) | 4 (Van) | | |
| water_supply | 8 | | | |
| existing_building | | | 8 | |
| ambient_cover | 8 | | | |
| interconnection | | | 8 | |
| reclaimed_makeup | | | | 8 |
| greywater_neighbours | | | 8 | |
| borefield | | | | 8 |
| ates | | | 8 | |
| deep_geo | | | 8 | |
| flood_exposure | | | 8 | |
| service_class | 8 | | | |
| uhi_context | | | 8 | |
| restriction_history | | | 8 | |
| seismic_sa02 | | | 8 | |
| nations_named | | | 8 | |
| **Total (160)** | **40** | **8** | **88** | **24** |

## MATCH: what was compared

| Part | Screen text (quoted) | A | Note |
|---|---|---|---|
| sewer_sink | "per-pipe flow near the parcel is not published"; Van rule "Metro Vancouver gives access first come, first served, with a letter of support (UT-008)"; Edm gate "no EPCOR sewer-heat programme found; Blatchford's sewer heat was deferred" | not derivable: no sewer flow at any parcel | Both say no figure. Edm rung still says "not yet read"; the register coef has a rule (Bylaw 19627 Sch. 2 s. 5.10, EWSI written approval) the card does not give. |
| water_supply | Van "water $1.445–1.811 per m³ … + sewer $2.811"; hybrid line "$74,294–$134,472" on "17,456–29,094 m³" = 4.256–4.622 $/m³. Edm "placeholder from the 2022–23 commercial water tiers"; hybrid line works out to 2.532–3.882 $/m³ | Van 4.256–4.622; Edm 2.532–3.882 | Exact on all 8. The Van rate is shown as plain fact; register coef marks sewer "$7.960 per unit ?" (P-11). |
| ambient_cover | Van (all 4): "activity zone: 55 dBA at night at a quiet-zone home, 65 at a mixed or industrial neighbour". Edm (all 4): "50 dBA next to homes, 60 dBA next to other uses (Bylaw 14600)" | Van activity→quiet 60/55, activity→other 70/65; Edm source 65/50 residential, 75/60 non-residential | Night values agree. The tool sets each lot's zone class itself (`engine.js:385–390`, By-law 6555 schedules coded in, comment M62). A found the zone→class mapping is not in the register, so the class per lot is the tool's own step. Edm figures follow source `bylaw14600`; register coef still says "pending". |
| service_class | "power at the meter at full load": V09 13–15 MW, E05 46–51, CLARK 11–12, E123 31–34, V339 5.3–5.9, E06A/B 14–16, HAST 2.7–2.9 | IT × PUE × factor: 13.44–14.88, 46.34–51.31, 10.78–11.94, 30.66–33.95, 5.32–5.89, 14.28–15.81, 2.66–2.94 | kW figure matches. The class is not shown on screen (no 6.5 / 13 MVA or 2,500 kVA text outside source lists). At the tool's size, A's class changes: V09 goes from "below 6.5 MVA" to above 13 MVA (in kW). |
| self_gen_rules (Edm) | card: "micro-generation on owned, leased or adjacent property, up to the site's own use; it cannot sell to the neighbour"; Solar "more" text (`xecon.js:13`): "under 5 MW is micro-generation: exports credited at the retail energy rate under 150 kW, at the hourly pool price above (AESO 2025)" | ≤5 MW, retail <150 kW, wholesale above, own use, owned/leased/adjacent | Same rule. Cites "AESO 2025"; register source is `abMicrogen` (P-17). |
| electricity_price (Edm) | "Alberta pool averaged $43.68/MWh in 2025"; "$49.74 per MWh it does not buy" | energy part 43.68 × 1.0799 + 2.50 = $49.67/MWh (pool 2025) to $70.30 (pool 2024) | 0.14 % gap at the low end. Constants differ: tool 2.53 and 8.09 % (`cards.js:45`), A 2.50 and 7.99 % from `epcorDASSAS` (P-03). The 2024 pool and A's annual $/yr (with daily charges) are not shown: screen says "pool + wires", no dollar total. |

## DIFFERS

| Part | Lot | Screen | A (× factor) | % gap | Likely cause | Which side follows the register |
|---|---|---|---|---|---|---|
| electricity_price | V09 | "$7.0–7.8M a year on BC Hydro large general service" | $3.47–5.31 M (energy only, RS 1830 low to LGS high) | +102 % low, +47 % high | (1) tool always uses LGS, never RS 1830 (`addons.js:153`); (2) tool adds demand charge $13.83/kW × peak kW × 12 (`addons.js:153`, "a month" in `xecon.js:95`). Rebuilt A with LGS + 12 × demand: $7.03–7.78 M, same as screen. | Register formula: "BC Hydro LGS or Transmission (RS 1830)". A brackets both; tool uses one. Register coef gives "$13.83/kW" with no billing period, so the ×12 is not in the register. A follows the register more closely. |
| electricity_price | CLARK | "$5.6–6.2M" | $2.78–4.26 M | +101 % / +46 % | same; rebuilt $5.64–6.24 M | same |
| electricity_price | V339 | "$2.8–3.1M" | $1.37–2.10 M | +104 % / +48 % | same; rebuilt $2.78–3.08 M | same |
| electricity_price | HAST | "$1.4–1.5M" | $0.69–1.05 M | +104 % / +43 % | same; rebuilt $1.39–1.54 M | same |
| self_gen_rules | V09 | Solar on the roof, "Who takes it … more" → `xecon.js:13`: "exports above the site's own use earn 10 ¢/kWh, up to 100 kW per phase (RS 2289 …)" | RS 2289 is for distribution voltage only; a data centre on RS 1830 (≥60 kV) cannot use it | rule | Tool states RS 2289 for every size with no voltage condition (`xecon.js:13`, 83) | A. Register coef: "RS 2289 applies only at distribution voltage, so a data centre supplied at 60 kV or higher (RS 1830) cannot use it". |
| self_gen_rules | CLARK | same text | same | rule | same | A |
| self_gen_rules | V339 | same text | same | rule | same; at 5.3–5.9 MW the lot may be on distribution, so the text may hold here, but the condition is still missing | A |
| self_gen_rules | HAST | same text | same | rule | same; 2.7–2.9 MW, as V339 | A |

The RS 2290 part agrees on all 4 Van lots: card "RS 2290: up to 2 MW, neighbours credited on their bills at 10 ¢/kWh (BCUC G-64-26)".

## Sub-figure differences (not one of the 20 verdicts)

**Nearest substation** (B `sub`, A `service_class.extra.substation_m`):

| Lot | Screen | A | Gap | Cause |
|---|---|---|---|---|
| V09 | 604 m (CanVec) | 544 | +11 % | tool measures from the lot centre (`xecon.js:48`, `f.c`); A from the lot edge (`build_place_check.py:153`) |
| E05 | 2,021 | 1,971 | +2.5 % | same |
| CLARK | 1,091 (East Vancouver, named) | 1,654 | −34 % | tool adds named stations and counts East Vancouver ("BC Hydro project (replaces Murrin)") as live; A uses CanVec only |
| E123 | 2,114 | 2,054 | +2.9 % | centre vs edge |
| V339 | 572 | 524 | +9.2 % | centre vs edge |
| E06A | 620 | 587 | +5.6 % | centre vs edge |
| E06B | 599 | 565 | +6.0 % | centre vs edge |
| HAST | 1,080 (Murrin, named) | 928 | +16 % | centre vs edge, and named-station swap (CanVec points within 300 m of a named one are dropped, `xecon.js:49`) |

**Make-up water, low end** (within reclaimed_makeup): the tool's hybrid make-up equals A's make-up × factor × wet-hours share (12.4 % Van, 10.4 % Edm). The high end matches exactly on all 8 lots. The low end is +10.7 % on all 8 (e.g. V09 17,456 vs 15,767 m³). Cause: `xecon.js:105` uses only the high PUE (`R.pue[1]`); A varies PUE 1.4–1.55. The register formula names no PUE end.

## NOT COMPARABLE

- **rooftop_solar** (8): screen shows only the rate, "about 128 kWh a year per m² of roof footprint (NRCan factors, transferred)" (Van) and 159 (Edm). This equals A's register coefficient. A's quantity is the total over neighbour roofs within 200–500 m (e.g. V09 3,492–31,530 MWh/yr); the tool computes no total. "Solar on the roof" is the data centre's own roof (pv_roof), not this part.
- **reclaimed_makeup** (8): the default design is air-cooled, so screen shows make-up "—". A gives s (0.74–0.99) × tower make-up. The tool never applies s, and shows only the hybrid case (see make-up note above). Towers sit behind "more", not captured.
- **borefield** (8): screen gives yard available, not area needed: V09 "4,167 m² of yard left for a borefield", V339 "2,700 m²", the other 6 "little yard left". A's area needed at the tool's size: V09 101,883–297,631 m²; V339 40,320–117,828 m². The land gate reads "possible with a change" without showing that gap.

## NOT SHOWN

No figure or rule text for these parts in any tab or card on any of the 8 lots (source lists excluded):

- surface_water_sink (8): only the "Cooling from the inlet or river" add-on label; the L/s add-on (`addons.js:90`) was not open.
- existing_building (8): no footprint, year built or reuse text (A: e.g. V09 2,806.5 m², 1956).
- interconnection (8): no VANIX/YEGIX or latency text (A: V09 1.766 km, HAST 0 km; Edm not derivable).
- greywater_neighbours (8): no volume. Only the rule: Van "not allowed: greywater only within the same dwelling (VBBL 2025)", Edm "an alternative solution, led by the province, for multi-property projects". The register coef says "cross-property sharing: no BC or Alberta rule text found" (P-23).
- ates, deep_geo, flood_exposure, uhi_context, restriction_history, seismic_sa02, nations_named (8 each).

## Findings from `checks/agents/2026-10-30_place_math.md`

| ID | Status | Basis |
|---|---|---|
| P-01 | Confirmed | RS 2289 text with no voltage condition, all 4 Van lots, including V09 at 13–15 MW |
| P-02 | Confirmed | Van cost rebuilt exactly as LGS energy + 12 × $13.83/kW; RS 1830 never used |
| P-03 | Confirmed | $49.74 on screen vs $49.67 at A's constants |
| P-04 | Partly | $49.74 (xecon) is on screen; the add-on's $43.68 payback was not open |
| P-05 | Confirmed | 128 / 159 as a single point, labelled "NRCan factors, transferred"; no Σ over roofs |
| P-06 | Not tested | Sewer rule in "Blowdown to the sewer" not open. Stormwater card still cites "Bylaw 18100, now repealed by 19627 … ?" |
| P-07 | Confirmed | All 4 Edm lots: "Gold Bar supplies one industrial customer by a 5.5 km pipe" and, on the same tab, "customers not named" |
| P-08 | Confirmed | existing_building not shown |
| P-10 | Confirmed | All 9 listed parts not shown; borefield only as yard area |
| P-11 | Partly | Live rate is water + sewer and shown as plain fact; fallback not seen |
| P-12 | Partly | No class or clause on screen at all |
| P-13 | Confirmed | Edm 50/60 on screen while the register coef says "pending"; Van matches source |
| P-16 | Partly | Live yields 892–1,006 / 947–1,243 kWh/kWp agree with the sums; the fallback mismatch is not on screen |
| P-17 | Partly | "(AESO 2025)" cite confirmed. The roof-lease question is on the card under "Not yet known" ("Alberta: whether a roof lease counts as leased property"), though not in the gate |
| P-23 | Confirmed | Both rule texts on screen; register coef says none found |
| P-25 | Confirmed | 4.256–4.622 and 2.532–3.882 $/m³; heat-pump $15–23/MWh on the district-heat card |
| P-09, P-14, P-15, P-18–P-22, P-24 | Not tested | Register, pipeline or panels not on these screens |

New, not in the agent file:
1. The tool used a different IT load from A on 5 lots (biggest: V09 9.6 vs 2.5 MW, E05 33.1 vs 10.2 MW).
2. The make-up low end uses the high PUE only (`xecon.js:105`), +10.7 %.
3. Substation distance: lot centre vs lot edge, and named stations added (CLARK −34 %).
4. The ×12 demand period is in the tool but not in the register.
