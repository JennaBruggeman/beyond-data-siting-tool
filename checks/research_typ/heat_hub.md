# Add-on: Heat hub (ETS + heat pumps, hand-over to a heat network)

Research 4 Nov 2026 per `BRIEF.md` (J.B. Q5: an add-on toggle for any typology). Check 1 only. New ids in `heat_hub_sources.json` (`typ_heat_hub_*`); register ids reused (most evidence is in handover.md, sys.md, sup_grow.md). "?" = not found. "our arithmetic" / "our reading" labelled.

## Key findings

- **Room sizes (register):** Vancouver NEU ETS room **6 × 3 m** below 13,940 m² of building net floor area, **6 × 4 m** to 23,230 m², larger by the NEU Engineer; ≥2.7 m headroom; double door ≥1.83 m; first sub-level against the perimeter unless below the FCL (neuETS; arch_ho_vanNEUconn2020). Blatchford: **12–55 m²** by unit count, ground floor or first parkade level, exterior wall, **2 h** separation, ≥2.44 m ceiling, door 1.83 × 2.03 m, **card reader on the outside of the door** (arch_ho_breMultiUnit2025).
- **Heat pumps:** 5.6–15.1 m² per MW of heat, equipment only (register component_space; maker claims); room = units + 1.1 m aisles (register hr_plant_room, aisle by analogy).
- **Temperatures:** NEU supply "never less than 65°C" → lift needed. Blatchford loop 8–32 °C (design guide) / 10–25 °C (claim); buildings ≤49 °C supply → heat can enter without lift (our reading).
- **Door on the secure line:** no source for a room straddling a security line (handover.md). Both utility guides put the room on an **exterior wall** with **utility keys or card access** — which matches a room on the line with an outside (utility) door and an inside (data centre) door (our design).
- **Zoning:** Edmonton Minor Utility ("district heating plants") **P** in BE, IM, IH. Vancouver **Public Utility C in I-3** (2.1, p. 5) and in the 3.00 FSR bucket; whether a private plant is a "Public Utility": ?

---

## 1. Room schedule

| room | m² | basis | source id | kind |
|---|---|---|---|---|
| ETS room, Vancouver NEU | 18 (6 × 3) / 24 (6 × 4) / larger by NEU | by building net floor area | neuETS; arch_ho_vanNEUconn2020 | City guide |
| ETS room, Blatchford | 12–55 | townhouse <15 units 12; apartment/mixed 27–55 | arch_ho_breMultiUnit2025 | utility guide |
| Heat-pump room | 5.6–15.1 per MW heat + 1.1 m aisles | equipment only (Sabroe, GEA) | register component_space; hr_plant_room | MAKER CLAIM; analogy |
| Neighbourhood heat plant (boilers), optional | 41–44 per MW gross | UBC 3 × 15 MW in 1,858–2,000 m² | arch_sys_ubcAdes2019; arch_sys_ubcCecBldg | institution |
| Electrical, control | ? | — | — | — |

**Our arithmetic, sample:** E06B tests 3.7 MW IT (tool run). A 1 MW-heat pump set ≈ 5.6–15.1 m² of equipment; with aisles and the ETS room the hub is ≈30–60 m² (our arithmetic, aisle layout ?). ≤1 % of floor area on either site.

**Sharing:** the heat-recovery heat pumps can serve both the on-site programs (Architecture exchange) and the network (Engineering exchange) from one room (our reading). Each typology's own "heat-transfer room" (0–18 m²) is dropped when the hub is on (our arithmetic: −18 m² per program).

## 2. Adjacency, stacking and the secure line

- **On an exterior wall**, near where network pipes enter (both guides). NEU: first basement; V339 is ≈29 % in the flood plain, FCL 4.6 m → NEU allows the room above if P1 is below the FCL (neuETS s. 6.1) → **ground floor default on V339** (our reading). Blatchford: ground floor or first parkade level.
- **2 h** separation (Blatchford s. 6.4.2). Refrigeration machinery-room doors: open outward, self-closing, **not to a public corridor or assembly room** (arch_up2_b52 6.2.2.2); ammonia or A2/A3/B2/B3 outside industrial occupancies: one exit door direct to outdoors (6.2.2.4).
- **Secure line (our design, no source):** room sits on the line. Utility door from outside (NEU: keys or fobs to the utility, 5.1.4; Blatchford: card reader on the exterior of the door, 6.4.5). Data-centre door from inside. Demarcation at the first valve on the building side (NEU 5.1.2). The tool flags the room as a line crossing (meters, valves, keys) per the 1 Nov secure-line checks.
- Ownership: Blatchford "BRE will own, operate, and maintain" the ETS and meters; data-centre cases: utility or receiver owns the heat pump (handover.md). Whether the utility enters the data centre: ? → the two-door room avoids it.
- Meters: Measurement Canada-approved for billing (handover.md).

## 3. Heat

| network | supply / return | data-centre heat | source id |
|---|---|---|---|
| Vancouver NEU | supply ≥65 °C (design 95/55 winter); building return ≤45 °C, ΔT ≥15 K | air-cooled 25–35 and liquid 50–60 °C both need a lift | arch_tmp_vanNEU2020; neuETS; register heat_temp |
| Blatchford ambient loop | 8–32 °C loop (guide); 10–25 °C (claim); building supply ≤49 °C | enters without lift; heat pumps in each ETS | arch_tmp_edmDESS2025; arch_sys_breIdea2021 (claim) |
| NEU waste-heat credit | NEU may accept waste heat from customer cooling with bill credit | — | neuConnect |

## 4. Plant layout

- Hub on the wall facing the street or lane where network pipes run (our reading); next to the hall's heat-recovery tap; not next to the public dining or assembly rooms (B52).
- Ammonia above 125 kW in BC: design registration with Technical Safety BC (tsbcDBP202405 via hr_plant_room).
- Generators: no rule ties them to the ETS.

## 5. Zoning

| zone | status | clause | source id |
|---|---|---|---|
| Edmonton BE / IM / IH | Minor Utility **P** (typical example "district heating plants") | BE 2.22; IM 2.13; IH 2.5; 8.10 | arch_sys_edmUtilityUses; typ_heat_hub_edmMinorUtility |
| Edmonton | "cooling plants" are Major Utility: IH only; Child Care not abutting Major Utility | 8.10; 6.40 1.2 | arch_ezb640 |
| Vancouver I-3 | Public Utility **C**; utility uses in the 3.00 FSR bucket | 2.1 (p. 5); 3.1.1.1(a) | typ_heat_hub_vanI3Utility |
| Vancouver I-2 | Public Utility O if ≥61 m from an R district, else C | 2.2.8 | arch_sys_vanI2Utility |
| Vancouver mechanical floor area | excluded only at or below base surface | 4.1.2(c) | van_zdb_i3 |

## 6. Precedents

- TELUS Garden data-centre heat to the building's district system (BCUC orders; handover.md).
- Odense (Meta) heat to the district network (claims; handover.md).
- Blatchford ETS rooms (guide) and NEU-connected buildings (guide): the room types, not data-centre cases.

## 7. Fit

- Both sites: ≈30–60 m² (our arithmetic) on an exterior ground-floor wall; ≤1 % of floor area. Limits: wall length on the street side shared with public fronts; V339 flood level.
- Network distance: Blatchford ≈3 km north of E06B (map reading, heights_basement.md); NEU from V339: ?

## 8. Gaps

- Heat-pump m² per MW from a non-maker source; electrical room size.
- Whether a private heat plant is a Vancouver "Public Utility".
- Any source for a room shared across a security line.
- NEU route and distance from V339.
