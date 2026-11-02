# Filling the unsourced items (audit of 2 Nov 2026)

Research pass, 2 Nov 2026. Covers every HIGH and MEDIUM row in `checks/unsourced_audit_2026-11-02.md`. Sources in `unsourced_fill_sources.json` (ids `src_fill_…`). Nothing in the tool or register was edited.

Labels used: **sourced** (quote found) · **our arithmetic** (derived from register sources) · **our assumption** / **our threshold** / **our study radius** (no source exists or none found) · **?** (unconfirmed).

## Summary

| # | Item (audit row) | Result | Label for the tool | Source id |
|---|---|---|---|---|
| 1 | Gas boiler efficiency 0.85 (engine.js:370) | Range found; 0.85 itself has no source | "0.85: our assumption, within NRCan's rated range" | src_fill_eer2016_317, src_fill_nrcanComBoiler, src_fill_nrcanFurnace, src_fill_nrcanHeatingGas2012 |
| 2 | Quiet-zone source → non-quiet neighbour, 55 dBA night (engine.js:656) | **Sourced**: s. 2.1(b)(ii) | none needed; fix register text | src_fill_van6555s21 |
| 3 | Power factor 1 (engine.js:257) | Range found for server power supplies only | "power factor 0.95 (server supplies; facility value ?)" | src_fill_estarServers4 |
| 4 | Hospital heating intensity | SCIEU is hospital-specific and newer, but total energy | see below | scieu2024, ceud2023com |
| 5 | Plant replaced every 20 yr (addons.js:229) | Medians exist (paywalled ASHRAE); public: FEMP 23 yr for chillers | "20 yr: our point within ASHRAE medians" | ashraeLife, src_fill_fempChillers |
| 6 | Sight lines 350 m; noise 600 / 650 m; 5 m | No guidance for urban plant | "our study radius" | src_fill_rule012_s13 (benchmark only) |
| 7 | Opportunity cut-offs 20 % of heat; 200 m² free | No basis found | "our threshold" | — |
| 8 | 460 m²/MW ÷ 0.6; floor band ×0.48–×1.23 | Derive from register ranges / our own check | "our arithmetic" | size_fit, hall_area, floor_area |
| 9 | Other medium items | see section 9 | mixed | src_fill_smw2021, src_fill_ruizArias2009, src_fill_ecccEdmCity |

## 1. Gas boiler and furnace efficiency (BC, Alberta)

Federal minimums apply in both provinces. No separate BC or Alberta minimum found.

| What | Value | Source id | Where | Kind | Conf. |
|---|---|---|---|---|---|
| New home boilers, hot water | AFUE ≥ 90 % (made from 1 Jul 2023); ≥ 82 % (2010–2023); ≥ 80 % (1998–2010) | src_fill_eer2016_317 | SOR/2016-311 s. 317, Table 1 items 3–7 | rule | 95 |
| New home boilers, steam | AFUE ≥ 82 % (from 15 Jan 2021) | src_fill_eer2016_317 | Table 1 item 2.1 | rule | 95 |
| New home furnaces (≤ 65.92 kW) | AFUE 95 % (made from 3 Jul 2019) | src_fill_nrcanFurnace | NRCan guide, gas furnaces | government guide | 85 |
| New commercial boilers, hot water | thermal eff. ≥ 90 % (87.92–732.68 kW); combustion eff. ≥ 90 % (to 2,930.71 kW); made from 1 Jan 2025 | src_fill_eer2016_317, src_fill_nrcanComBoiler | s. 317(3), Table 2 | rule | 95 |
| Commercial boilers before 2025 | no federal minimum in the 2017–2019 text | src_fill_eer2016_317 | s. 317 (2017-06-28 version) | rule (our reading) | 70 |
| Existing stock, old (c. 1970) | 55–65 % (natural-draft boiler); 60 % (furnace/boiler c. 1970) | src_fill_nrcanHeatingGas2012 | Table 1 p. 35; Table 3 p. 38 | government guide | 85 |
| Existing stock, mid-efficiency | 78–84 % (power-vented); 80–88 % (boiler c. 1985); 82–89 % (non-condensing boilers) | src_fill_nrcanHeatingGas2012 | Tables 1, 3; p. 25 | government guide | 85 |
| Condensing | furnaces 90–98 %; boilers 89–99 % | src_fill_nrcanHeatingGas2012 | Table 1 p. 35; Table 3 p. 38 | government guide | 85 |
| BC from 2030 | new heating equipment to be "high-efficiency, low carbon" (no number; status in 2026 ?) | src_fill_bcHEES2023 | regulatory bulletin, Dec 2023 | government policy (consultation) | 50 |
| Share of BC / AB stock that is old, mid or condensing | ? | — | SHEU 2019 CMA tables have no efficiency table; CEUD table list blocked this session | — | — |

**Range to show:**

- Existing stock: **0.55–0.89**, rated.
- New equipment: **0.90–0.98**, rated.
- These are rated AFUE or thermal-efficiency figures, not measured in use. In-use efficiency is **?**.

**Label:** "0.85: our assumption (NRCan rated range 0.55 old to 0.98 condensing; stock mix ?)".

- Also fix the register: receiver_demand says "not yet sourced", while price_ceiling and abgas use 0.85.
- Vancouver note: 29 % of homes heat with electric baseboards (sheu2019cma). The gas factor should apply only to gas homes.

## 2. Vancouver By-law 6555: quiet-zone source, non-quiet receiver

**Found.** The tool's 55 dBA is right.

- **s. 2.1(b)(ii)** sets the night limit for continuous sound made in a quiet zone. It is 55 dBA "when received at a point of reception within an intermediate zone, an activity zone or an event zone".
- The day limit (s. 2.1(a)(ii)) is 60 dBA.
- Source: saved copy `data/raw/van/6555.txt`, lines 185–204, consolidated to 14 Jul 2026.

The register has gaps:

- **van6555zones** leaves out the quiet→other row.
- Its "intermediate/activity→other 70 / 65" row is the s. 2.2 figure. s. 2.3(b)(ii) is also 65 at night, but it names only "an intermediate zone or an activity zone" as receivers, so event zones are not covered.
- **bylaw6555** and **van6555** quote only intermediate→quiet.

**Fix:** add "quiet→intermediate/activity/event 60 day / 55 night (s. 2.1(a)(ii), (b)(ii))" to van6555zones, and merge van6555 into it.

The tool's other limits also match the by-law: limQ 45 / 50 / 55 and limO 55 / 65 / 65.

## 3. Power factor of data-centre loads

| What | Value | Source id | Where | Kind | Conf. |
|---|---|---|---|---|---|
| Server power supply minimum PF, 50–100 % load | 0.90–0.95 (multi-output); 0.95 (single-output) | src_fill_estarServers4 | ENERGY STAR Servers v4.0, s. 3.2.3, Table 2 p. 11 | government programme spec (US EPA) | 85 |
| Same, light load (10–20 %) | 0.65–0.90 | src_fill_estarServers4 | Table 2 | government programme spec | 85 |
| Facility PF at the utility meter (after UPS, cooling drives, correction) | ? | — | maker sheet blocked this session (Schneider Galaxy VX) | maker claim at best | — |

**Label:**

- Show MVA = MW ÷ 0.95.
- Show a band using PF 0.90–1.0 (our arithmetic), and keep the "?".
- Screen text: "power factor 0.95: server supply minimum (ENERGY STAR v4.0); facility value ?".

## 4. Hospital heating intensity (BC, Alberta)

| | CEUD 2023 (ceud2023com) | SCIEU 2024 (scieu2024) |
|---|---|---|
| Category | "Health Care and Social Assistance": hospitals plus clinics, care homes, social services | hospitals only |
| Measure | space + water heating ÷ floor space | all energy ÷ floor space ("not space heat only", register check 2) |
| BC / AB | 1.096 / 2.348 GJ/m² | 1.90 / 2.46 GJ/m² |
| Reference year | 2023 | 2024 (released 26 Jun 2026) |
| Re-checked this session | No: tables 15/17/19 not in saved copies; local Table 3 has energy and shares only | No: StatCan page refused this session |

- **SCIEU 2024 is hospital-specific and newer.** CEUD is heating-only but covers the whole sector.
- The two are **not like for like**. N-04 compares a heating figure with an all-energy figure.
- **Suggestion:** use SCIEU × a heating share, and show it as our arithmetic. The hospital heating share is **?** (CEUD's sector share would be a stand-in), so label it.

## 5. Plant service life (tool: 20 yr)

| What | Value | Source id | Kind | Conf. |
|---|---|---|---|---|
| Centrifugal chiller | > 25 yr median | ashraeLife (ASHRAE HVAC Applications 2015 ch. 37 Table 3; paywalled) | design guide (survey medians) | 70 |
| Air-cooled condenser | 20 yr | ashraeLife (Table 4, Akalin 1978, possibly outdated) | design guide | 60 |
| Water-to-air heat pump | > 24 (Abramson 2005) / 19 (Akalin) | ashraeLife | design guide | 60 |
| Chiller life-cycle period | 23 yr (basis not stated) | src_fill_fempChillers | government guide (US) | 60 |
| Dry coolers, generators, UPS | ? | none public found | — | — |

**Label:** "20 yr: our point within ASHRAE survey medians (19–25+ yr); generators, UPS ?".

## 6. Study radii

| Radius | Finding | Label |
|---|---|---|
| Noise 600 m (3D 650 m), minimum 5 m | No Vancouver or Edmonton rule sets a search radius. AUC Rule 012 uses 1.5 km from the property line (s. 1.3, p. 1), but it covers power plants and substations only. | "our study radius" (AUC 1.5 km as a benchmark). The 600 vs 650 m mismatch should be resolved. |
| Sight lines 350 m | No Canadian guidance found. The only guidance found was wind-farm or highway LVIA (Ireland, UK), which is not comparable. GLVIA3 is paywalled. | "our study radius" |
| Shading obstacles 500 m | none | "our study radius" |

## 7. Opportunity cut-offs

- 20 % of heat to non-market homes (opps.js:56): no basis found. Label **"our threshold"**.
- 200 m² free for meanwhile uses (opps.js:103): no basis found. Label **"our threshold"**.

## 8. Midpoint sizing and floor band

**460 m²/MW ÷ 0.6.** Our arithmetic:

- 460 = (290 + 630) ÷ 2. These are R.m2PerMW, operator claims: eStruxture VAN-1 ≈ 290, VAN5 ≈ 627 (sources/16 §2.7).
- 0.60 = (0.48 + 0.72) ÷ 2, from hall_area (Burlington plans).
- 460 ÷ 0.6 ≈ 767 m² of floor per MW.
- Register gap: size_fit's text names 111 E 5th ≤ 291 and VAN5 ≈ 627, but not eStruxture VAN-1 (?).

**×0.48–×1.23.** Our arithmetic from our own check:

- 1 ÷ 2.09 = 0.478, so ×0.48 covers estimates that were 109 % high.
- 1 ÷ 0.81 = 1.235, so ×1.23 covers estimates that were 19 % low.
- The check file for the 255 buildings was not found (?). Add it to floor_area.
- The 4 m storey height is the midpoint of floor_area's 3.5–4.5 m.

## 9. Other medium items

| Item | Finding | Label / source |
|---|---|---|
| Point-only lot drawn as ≥ 900 m² square (site.js:111) | no source | "our drawing assumption" |
| UPS text 2.0–2.4 + 2.2 m²/MW (site.js:254) | register component_space has UPS 2.4–3.3 and Li-ion batteries 1.0–1.8 (maker claims, 29 Oct) | update the text to the register |
| Map layer "size that fits" (extras.js:261) | 0.6 and 460 as in item 8. The 5.75 m floor has no source; the register gives Vancouver I-3 floor-to-floor ≥ 6.0 m ground, 4.0 m above | "our arithmetic"; 5.75 m "our assumption ?" |
| Edmonton rain tank 82.7 mm (addons.js:192) | the ECCC 1991–2020 July normal, Edmonton (City), in the saved extract | src_fill_ecccEdmCity (= eccc); add to register rainwater |
| Solar shading method (xecon.js:35) | Ruiz-Arias et al. is 2009 (IJGIS 23(8)), not 2010. The SVF formula was not checked. Antonanzas-Torres 2018 and the NREL SAM shade method were not found. | src_fill_ruizArias2009; other two "?"; 500 m "our study radius" |
| Roof screen + 0.9 m (addons.js:69) | memo found: "approx. 2–3 feet taller than the height of the units" (one US project, 2021) | src_fill_smw2021, "consultant claim" |
| Noise 600 / 650 / 5 m; sight 350 m; plant 20 yr | see items 5 and 6 | — |

## Blocked this session (not circumvented)

- NRCan CEUD table list (oee.nrcan.gc.ca …/comprehensive_tables/list.cfm)
- StatCan Daily 26 Jun 2026 (SCIEU 2024)
- Schneider Galaxy VX technical specifications (productinfo.se.com)
