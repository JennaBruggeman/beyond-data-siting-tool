# Typology 6: Conservatory (low biome)

Research 4 Nov 2026 per `BRIEF.md`. Check 1 only. New ids in `conservatory_sources.json` (`typ_conservatory_*`); register ids reused (most of the evidence is in prog_grow.md, sup_grow.md, heights_conservatory_edge.md). "?" = not found. "our arithmetic" / "our reading" labelled. "Tool run" = golden arch outputs (not sources).

## Key findings

- **Low biome, two forms (our reading):** (a) glasshouse, gutter **4–5.5 m** (Alberta guide, arch_hb_abGreenhouse); (b) pyramid, top **≤17.7 m in BE** (16.0 m + roof top ≤1.7 m above max Height, arch_hce_edm570Roof 1.7) and **≤18.3 m in I-3** to the highest point (arch_hce_vanI3Height). The Muttart arid pyramid (59 ft ≈ 18.0 m) misses BE by ≈0.3 m and fits I-3 on grade.
- **Room schedule:** one ≈390 m² biome (Muttart arid) + production glass + one universal WC, grossed on support only → **≈481–495 m²** (sup_grow.md, our arithmetic). Entry, shop, office, plant rooms, visitor WCs: **?** — no Canadian conservatory publishes a room schedule (Muttart, Bloedel, Leaf, Gage Park, Saskatoon checked).
- **Zoning:** Edmonton BE **P** as Major Indoor Entertainment ("indoor botanical gardens"), **≤500 m²** per establishment, 3.18 variance. Vancouver: "Zoo or Botanical Garden" not listed in I-2, I-3, I-1C, FC-2 → **rezoning**.
- **Heat:** wet tropics 20/18 °C (Kew); arid 12 °C winter (Muttart). Annual ≈590 kWh/m²·yr (Kew, London, our arithmetic). Peak conduction per m² glass: Vancouver ≈100, Edmonton ≈185 W/m² (our arithmetic). Supply temperature: **?**.
- **A-2, 2 h** from the F-2 hall (our reading). No built conservatory on data-centre heat found (?).

---

## 1. Program list and room schedule

| room | net m² | basis | source id | kind |
|---|---|---|---|---|
| Display biome (one) | 390 | Muttart arid "4,200 square feet and 59 feet high" | arch_pg_edmMuttartPyr | City (operator) |
| Production greenhouse | 65.5 | Muttart production 3,870 ft² ≈ 17 % of 2,140 m² display (our arithmetic) | arch_pg_edmMuttartGH; arch_pg_williamsMuttart | City blog; CONSULTANT CLAIM |
| Universal washroom | 4.6 | required where WCs required | arch_per_nbcWC; arch_sup_abGFNArooms | rule; guide |
| Visitor WCs (A-2) | ? | Table 3.7.2.2.-A by designed occupant load + posted sign (3.1.17.1.(1)(c)) | arch_sup_nbcA3722 | rule (N ?) |
| Entry / reception, shop, office, plant room, storage, classroom | ? | none published | — | — |
| Circulation and walls (support only) | 21.0–35.1 | ×1.3–1.5 (Eastglen, by analogy) | arch_edmEastglen2017 | City functional program |
| **Total** | **≈481–495** | our arithmetic | tool/arch_programs.json | — |

**Comparison set (larger, for scale):**

| facility | size | source id | kind |
|---|---|---|---|
| Muttart, Edmonton | 2 × 660 + 2 × 410 m² pyramids, "six supporting greenhouses"; temporary tropical house 44 × 12 m | arch_pg_williamsMuttart; arch_pg_edmMuttartGH | CONSULTANT CLAIM; City blog |
| Bloedel, Vancouver | "0.14 hectare" dome (≈1,400 m²); 70 ft high (claim) | arch_pg_vanVDBStrategy2021; arch_hce_vdbBloedel | Park Board; OPERATOR CLAIM |
| The Leaf, Winnipeg | tropical biome 2,000 m² | arch_hce_apcLeaf | OPERATOR CLAIM |
| Kew POWC, UK | 4,500 m², 10 zones | arch_pg_kewPOWC | OPERATOR CLAIM (benchmark) |
| Gage Park, Hamilton; Civic Conservatory, Saskatoon | City pages read: no area or height given | typ_conservatory_hamiltonGage; typ_conservatory_saskatoon | City pages (no figures) |

**Sharing:** with a data centre, nothing obvious to share except the heat-transfer room and the loading dock (deliveries of plants). Shared WCs with another public program would cut ≈4.6 m² (our arithmetic). The 500 m² BE cap is per establishment, so sharing does not raise it.

## 2. Adjacency and stacking

- **At grade, south of the hall** (light: arch_marcelis2006; Edmonton Winter Guidelines glazing south, arch_up3_edmWinterDG 2.1.5). Never over the hall (irrigation; fmDS0532 2.2.1.6).
- **Shared wall with the hall: 2 h** (A-2 / F-2, arch_nbc3131; class our reading, arch_pg_nbcA3121). A glass wall cannot be that separation without a rated glazing product (? — J.B.'s default: no viewing window).
- **Street side:** public entrance from the street (Van 10.21.1, arch_up_vanZDB10); outside the secure line.
- **Pyramid form:** a free-standing pyramid is its own building → spacing by limiting distance or 4 h firewall if joined (arch_hsg_nbcFirewall). Vancouver allows one principal building per site (10.34.1) → a joined glasshouse is the as-of-right form there (our reading).
- **Shadow:** hall height vs biome on the south: equinox shadow check in the tool (not sourced per crop).

## 3. Heat

| item | value | source id | kind |
|---|---|---|---|
| Set points | wet tropics 20 °C day / 18 night; dry tropics 14/12; temperate ferns 15/13 | arch_pg_ward2013Kew | peer-reviewed (UK) |
| Arid biome | winter 12 °C; summer can exceed 30 °C | arch_pg_edmMuttartPyr | City (operator) |
| Annual | ≈690 kWh gas/m²·yr ≈ 590 kWh heat/m²·yr (Kew, London; our arithmetic) | arch_pg_ward2013Kew; arch_pg_kewPOWC | our arithmetic |
| Glazing U | double glass 3.7 W/m²·K | arch_asabeEp406 | US design standard |
| Design outdoor | Vancouver −7 °C; Edmonton −30 °C (Jan 2.5 %) | arch_bcbcAppC; arch_pg_abClimateEdm | rule |
| Supply temperature | ? ("Hot water pipes are used for heating", Kew; growing benches 35–40 °C) | arch_pg_kewPOWC; arch_asabeEp406 | — |
| Canadian annual (Muttart, Bloedel) | ? | — | — |

**Peak, low glasshouse, 490 m² (our arithmetic):** square ≈22.1 m side, 4.5 m walls → walls ≈398 m² + roof ≈490 m² (pitch ignored) ≈ 888 m² glass (≈1.8 × floor). Edmonton 3.7 × 50 K ≈ 185 W/m² → ≈164 kW (≈335 W/m² floor); Vancouver 3.7 × 27 K ≈ 100 W/m² → ≈89 kW (≈181 W/m² floor). Conduction only; infiltration ?. One wall shared with the hall cuts ≈100 m² of glass (our arithmetic).

**Annual (our arithmetic, London benchmark, not scaled to climate):** 490 × 590 ≈ **289 MWh/yr** → 3.5–5.4 % of V339's 5,393–8,278 MWh/yr; 1.3–2.0 % of E06B's 14,252–21,878 (tool run).

**Direct or lift (our reading):** at 18–20 °C air with hot-water pipes, liquid-cooled heat (50–60 °C) likely serves directly; air-cooled (25–35 °C) needs a heat pump. Unconfirmed until a supply temperature is sourced (?).

## 4. Plant layout (default)

- Biome south/street; heat-transfer room on the shared wall; generators, fuel and loading on the north/rear (our design).
- Intakes ≥3.0 m from combustion vents, ≥7.6 m from the dock, ≥7.6 m from evaporative discharge (arch_nbc6329; arch_nbc63215); evaporative units 3 m from doors and occupiable outdoor space (arch_nbc63215).
- Metro Vancouver s. 57 (Tier 0/1 engines ≥100 m from sensitive receptors) does not list a conservatory (arch_mv1329; our reading).
- Plastic glazing (if any): FM Approved only (arch_up_fm0157, insurer).
- Roof chillers stay on the hall roof; the biome's glass roof is not a plant deck.

## 5. Zoning and approvals

| zone | status | clause | source id |
|---|---|---|---|
| Edmonton BE | Major Indoor Entertainment **P**, **≤500 m²** per establishment; variance 3.18 (flag, J.B. Q4) | 2.11, 3.3.1, 3.18; 8.10 | arch_edmZB20001_BE; arch_pg_edmUseDefs |
| Edmonton IM, IH | not listed (NP) | s. 2 | arch_edmZB20001_IM; arch_pub_edmZB |
| Edmonton MU | P (uncapped >1 ha) | — | arch_wet_edmMU |
| Vancouver I-2, I-3, I-1C, FC-2 | "Zoo or Botanical Garden" **not listed → rezoning (CD-1)**; I-3 2.2.15 route closed because the use is listed and defined (our reading) | 2.1; 2.2.15 | arch_pg_vanZoningUses; van_zdb_* |
| Vancouver fallback | Urban Farm – Class B **C** (production for sale, not a display) | Sec. 2 p. 47 | van3575s2 |
| Height | BE 16.0 m, roof top +1.7 m; I-3 18.3 m outright, 30.5 m with approval | BE Table 4.1; 5.70 1.7; I-3 3.1.2.1 | arch_hb_edmBE; arch_hce_edm570Roof; arch_hce_vanI3Height |

## 6. Precedents

- **Muttart Conservatory, Edmonton (1976):** four pyramid biomes, smallest ≈390 m² × 18 m; shows a single biome is a workable public unit (City; consultant claims for areas).
- **Bloedel, Vancouver (1969):** ≈1,400 m² dome; "tens of thousands of visitors annually" (arch_pg_vanVDBStrategy2021 p. 4).
- **Conservatory with a data centre:** ? none found. Nearest: DC-heated greenhouses (Baie-Comeau, arch_etsBaieComeau; Boden, typ_aquaponics_bodenGH) — production, not public display.

## 7. Fit on both sites (our arithmetic)

- **E06B (BE):** 490 m² = 7.1 % of 6,854 m² (tool run allowed); inside the 2,056 m² programs share. Fits as a low glasshouse or a pyramid ≤17.7 m. Limit: the **500 m² cap** — any entry, shop or visitor WCs beyond the schedule push it over → 3.18 variance.
- **V339 (I-3):** 490 m² = 9.3 % of 5,257 m² (tool run). Rezoning. On grade a pyramid ≤18.3 m fits; over a 6.0 m ground floor only a low glasshouse (≤12.3 m remains). Tool run finds no free ground ≥6 × 6 m beside hall, plant and loading. Limits: zoning, ground.

## 8. Gaps and open questions

- Any Canadian conservatory room schedule or gross floor area (Muttart, Bloedel, Leaf, Gage Park, Saskatoon).
- Supply temperature and Canadian annual heat (kWh/m²) for a tropical house.
- Infiltration and humidity loads.
- Glazing that meets 2 h if J.B. later wants a view into the hall (none sourced).
- Low biome default: glasshouse (simpler, fits both) or pyramid (Muttart form)? Recommend glasshouse.


> Check 2 fix (4 Nov 2026, independent agent): Urban Farm – Class B definition is on Section 2 p. 47, not p. 46. See checkV2_result.json.
