# Add-on: Public edge (leftover public-front ground)

Research 4 Nov 2026 per `BRIEF.md` (J.B. 4 Nov: warm public ground, EV charging ≥≈150 m², or both; outside the secure line). Check 1 only. New ids in `public_edge_sources.json` (`typ_public_edge_*`); register ids reused. "?" = not found. "our arithmetic" / "our reading" labelled. ASHRAE 2023 ch. 52 is a single-user licensed copy: **figures only are quoted here, no text or tables reproduced.**

## Key findings

- **No Canadian design figures for heated public ground.** ASHRAE 2023 ch. 52 lists 46 US cities, none Canadian (arch_up4_ashraeCh52). Edmonton's Winter Design Guidelines give principles and no canopy, plaza, seat or path dimensions (arch_up3_edmWinterDG); heated sidewalks are "research and evaluate" only (arch_hce_edmWinterNum p. 46).
- **Snow-melt figures (US benchmarks):** surface flux at 99 % of snowfall hours, Ar = 1: Minneapolis 801, Great Falls 869, Seattle 647 W/m². Pipe output at 55 °C mean fluid 440 / 555 / 665 W/m² at 300 / 230 / 150 mm spacing. Entering fluid ≤66 °C (concrete). Back losses ≈20 % steady, 1–3 % with 50 mm insulation. May run off **district return piping**.
- **Soil warming:** 32–49 °C water, ≈63 W/m² floor at 35 °C (US greenhouse guide); outdoor beds: ?
- **Vancouver covered edge:** canopy over a street lowest point **≥2.75 m** (VBBL 1.8.8.3); plaza within 1.0 m of street level and "some overhead weather protection" (Plaza Design Guidelines). Cooling space aim ≤26 °C (VCH).
- **EV charging:** ≥≈150 m² (4 chargers / 6 stalls, catalogue, BC Hydro guide); intakes ≥1.5 m from a parking space (Table 6.3.2.9).
- **Zoning gap:** neither city lists a plaza or park use in its data-centre zones except Vancouver "Park or Playground" (C in I-3). Our reading: the edge is landscaped open space accessory to the principal use unless publicly secured. Edmonton EV use class: ?

---

## 1. Program list

| part | size | basis | source id | kind |
|---|---|---|---|---|
| Warm path (snow-melt) | leftover frontage; no minimum | — | — | ? |
| Seating, wind screens | ? | south-facing seating; bench with central pedestal; wood warmer than metal; wind screens, gas fire pits | arch_up3_edmWinterDG 2.2.4, 2.4.4 | City guide |
| Planting with soil warming | ? | conifers N and W, deciduous S; plants set back from walks for snow storage | arch_up3_edmWinterDG 2.1.10 | City guide |
| Small warm shelter (optional) | ? | barrier-free warming huts, dark colours | arch_up3_edmWinterDG 2.4.2 | City guide |
| Covered edge (Vancouver) | canopy ≥2.75 m clear (street rule, used as benchmark on private land) | VBBL 1.8.8.3 | arch_hce_vbblCanopy | rule |
| EV hub | ≥150 m² (6 stalls × 22 m² + accessible + pads, our arithmetic); transformer zone ? | ≥1.5 stalls per charger; ≥4 vehicles | arch_sup_bchFastCharge2024; arch_pub_vanStall | utility guide; City guide |
| Washroom (if provided) | 6.25 m² (2.5 × 2.5) | City facility minimum | arch_sup_vanWashroomTG2024 | City guide |
| Snow-melt plant | in the `heat_hub` room or ? | — | — | — |

**Sharing:** warm path and EV hub share the frontage; EV hub can take snow melt on its access (Table 4: parking lot Ar 0.5 at 90 %, arch_up4_ashraeCh52). Heat comes from the hub or the hall's return loop (district return, ch. 52 pp. 52.12–52.13).

## 2. Adjacency

- Outside the secure line, between the street and the public programs (J.B. 4 Nov).
- **Evaporative heat rejection: 3 m from occupiable outdoor space** (arch_nbc63215). Generator exhaust 3 m from occupiable outdoor space (arch_nbc6331; whether it applies to gensets ?). Metro Vancouver: no stack exhaust drawn into intakes (arch_mv1329).
- Intakes ≥1.5 m from parking spaces; ≥4.5 m from garbage (arch_nbc6329).
- Property-line noise limits do not protect the owner's own plaza (our reading).
- Cameras: avoid filming passers-by; narrow views on the owner's plaza (security_more.md; access_control.md).
- Edmonton: roofs designed so ice, snow and leaders do not fall onto walkways (arch_up3_edmWinterDG 2.1.3); snow storage in sunny areas (2.2.11 F); canopies or eaves ≤0.6 m into a required setback (arch_hce_edmEntranceWP 5.90).
- Vancouver: plaza within 1.0 m of street level; weather protection at waiting points (arch_pub_vanPlazaDG 2.2, 4.4). Fence ≤1.9 m in required yards (security_perimeter.md) — the edge stays unfenced.

## 3. Heat

| use | temperature | load | annual | source id | kind |
|---|---|---|---|---|---|
| Snow-melt path | entering fluid ≤66 °C (concrete); PE ≈60 °C; table at 55 °C mean | 99 % flux, Ar = 1: Minneapolis 801, Great Falls 869, Seattle 647 W/m² (surface only) | melting + idling, Ar = 1: Minneapolis 52.1 + 580.3; Great Falls 62.1 + 390.5; Seattle 3.8 + 33.1 kWh/m² (no back/edge loss) | arch_up4_ashraeCh52 | design guide (US) |
| Soil warming | 32–49 °C water | ≈63 W/m² at 35 °C (greenhouse floor) | ? | arch_hce_rutgersRootZone | US university guide |
| Heated seating | ? | ? | ? | — | — |
| Cooling shelter (Van) | ≤26 °C | ? | ? | arch_hce_vchCooling | health authority guide |

**Our arithmetic, 200 m² warm path, Edmonton on the Minneapolis benchmark (city choice is ours, unsourced):** peak 200 × 801 ≈ 160 kW at the surface (+≈20 % back loss uninsulated, 1–3 % insulated); annual 200 × 632 ≈ 126 MWh/yr if idling all season. Without idling (melting only): ≈10 MWh/yr. ≈0.6–0.9 % of E06B's 14,252–21,878 MWh/yr with idling. Vancouver on Seattle: 200 × 36.9 ≈ 7 MWh/yr.

**Direct or lift (our reading):** at 55 °C mean fluid, liquid-cooled heat (50–60 °C) is at the edge; air-cooled (25–35 °C) needs a lift. Soil warming at 32–49 °C: liquid-cooled direct; air-cooled marginal. The path can run on the network's return water (ch. 52), so it is the last stage of any cascade.

## 4. Plant layout

- Edge on the street front; generators, fuel, chillers and loading behind the secure line, away from it.
- EV transformer clearance: EPCOR up to 6.0 m (epcor_ccg 6.4(g)); BC 3 m in front, 1 m sides (bchES54F).
- Snow-melt manifold in the `heat_hub` room (our design).

## 5. Zoning

| zone | warm ground / plaza | EV charging | clause | source id |
|---|---|---|---|---|
| Edmonton BE / IM | no Park, Plaza or Parking Facility use listed; landscaping accessory to the principal use (our reading); Special Event P (temporary) | Vehicle Support Service **P** (BE 2.17, IM 2.10) if EV charging counts as "fuelling" (?); s. 6.110 not read | BE/IM s. 2; 8.10 | typ_public_edge_edmUses; arch_edmZB20001_BE |
| Edmonton definitions | "Park" includes "plazas" | "Parking Facility" = parking on a site with another principal use | 8.10 | typ_public_edge_edmUses |
| Vancouver I-3 | Park or Playground **C**; "Plaza" defined (Sec. 2 p. 31) but not listed in I-3 | Parking Uses **C** (may include retail sale of electricity) | 2.1 | typ_public_edge_vanPlaza; arch_pub_vanSched; arch_pub_vanS2 |

## 6. Precedents

- No built data-centre-heated public ground found (?).
- ASHRAE ch. 52: snow melt tied to district return piping (guidance, not a project).
- Edmonton Winter Design Guidelines and Policy C588 (arch_up3_edmC588): City design direction for winter public space.

## 7. Fit (our arithmetic)

- **E06B:** street setback 6.0 m (4.5 m on a Collector or Local Road; Airport Rd class ?) × frontage (? m, from the tool's lot geometry) is the natural edge. EV hub needs ≥150 m² of that strip or the ground beside it; at 6.0 m deep that is ≥25 m of frontage (our arithmetic; stall layout in a 6 m strip not checked ?).
- **V339:** front yard 0.6 m only (I-3 3.1.2.2); the edge must come from ground left after the building (tool run: none ≥6 × 6 m at default ratios). Covered edge as a canopy on the building face is the realistic form.

## 8. Gaps

- Canadian snow-melt or heated-seating data; which US city stands for Edmonton (J.B. to choose).
- Outdoor soil warming (only greenhouse sources).
- Edmonton EV use class; s. 6.110.
- Minimum public-space size (both cities: none).
- Edge frontage lengths on both lots.
