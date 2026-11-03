# What a wet-program massing contains (group A, 2 Nov 2026)

Brief: BRIEF_support.md. Source ids: existing register ids, or new `arch_sup_*` ids in `sup_wet_sources.json`. "Our arithmetic" = worked out here, not in the source. "?" = not found.

## Summary

- **Pool: the catalogue's two figures stop clashing.** The Eastglen rooms add up to 1,484 m² net. × 1.45 = 2,152 m², which matches its stated 2,131 m² gross (our arithmetic). That total includes 418 m² net of rooms that aren't pool: fitness, multipurpose room, viewing area, hot pool and steam room. Leave those out and you get 1,386–1,599 m² gross, which agrees with the catalogue's own 6-lane step model (1,395 m²). A 4-lane working pool comes to **≈990–1,140 m² gross**, against the catalogue minimum of 949 m².
- **Code sets the change area.** Under Alberta's code (NBC(AE) Part 7), the bathing load sets dressing area at **0.5 m² per bather** and showers at **1 per 50, with at least 3 per room**. WCs follow Table 3.7.2.2.-A. BC's figure is a guideline, not a rule: 0.32 m² per bather.
- **Eastglen counts pool plant inside its grossing factor.** Its p. 22 says pool mechanical, about ½ the water area, "is considered a grossing allowance". The 1.3–1.5 factor therefore already covers pool plant, building mechanical (5 %) and circulation (≈15 %). Don't add plant again on top.
- **Therapy pool:** ≈140–160 m² gross (24 m² water) or ≈205–240 m² gross (46.75 m² water), plus an office, rest area and storage that have no sourced size. The catalogue has 134 m² typical: too small once changing and a Changing Places room are added.
- **Spa:** a small working version built from sourced parts comes to ≈325–375 m² gross, plus a sauna and rest area that have no sourced size. The catalogue's 870 m² is a whole 3-level destination (Ogden barge) whose report gives no room breakdown.
- **Laundry and aquarium:** no primary source gives m² per machine or per exhibit. Only washroom counts and grossing benchmarks are sourced.

---

## 1. Public indoor pool (small working version: 4 lanes, 25 m)

| part | m² or ratio | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Main: water, 25 × 8.5 m, 4 lanes | 212.5 m² | arch_sportEngPoolsDGN | p. 10 | design guide (UK benchmark) | 75 |
| Main: deck, code minimum | ≥1.8 m wide all round → ≈134 m² (our arithmetic: 28.6 × 12.1 − 212.5) | arch_sup_nbcAE7Pools | NBC(AE) 7.2.3.15.(1)(a) | rule (AB) | 85 |
| Main: deck, BC | ≥1.2 m beyond pool edge and gutter | arch_bcPoolDesign2025 | s. 3.2 | government guide | 85 |
| Main: deck, working | Eastglen 366 m² deck : 326 m² tank = 1.12 → ≈239 m² (our arithmetic) | arch_edmEastglen2017 | pp. 30–31 | government (functional program) | 70 |
| Bathing load | 1 bather per 1.5 m² of pool → 142 (our arithmetic). Eastglen: 326 m² → "217 persons (rounded to 220)" | arch_sup_nbcAE7Pools; arch_sup_eastglenRooms | 7.2.4.1.(1)(a); p. 22 | rule (AB) | 85 |
| Bathing load, BC | D/2.5 + S/0.93 (D = depth ≥1.5 m, S = shallower) | arch_sup_bcPoolDesign5 | s. 8.7 p. 34 | government guide | 80 |
| Dressing rooms (excl. showers, WCs) | 0.5 m² per bather → 71 m² (AB). BC 0.32 m² per bather → 45 m² (our arithmetic) | arch_sup_nbcAE7Pools; arch_sup_bcPoolDesign5 | 7.2.4.3.(1); s. 5.1 p. 21 | rule (AB) / government guide | 85 |
| Showers | AB: 1 per 50 bathers, ≥3 per dressing room → 3 + 3. BC: 2 heads for the first 100 users of each sex, +1 per 50 | arch_sup_nbcAE7Pools; arch_sup_bcPoolDesign5 | 7.2.4.7.(2); s. 5.1 | rule / guide | 85 |
| WCs (bathers) | from bathing load under 3.7.2.2. Assembly Table A at 71 per sex: male 2, female 3 (with only 2 male WCs, one may be a urinal: 3.7.2.2.(3)) | arch_sup_nbcAE7Pools; arch_sup_nbc372 | 7.2.4.8; Table 3.7.2.2.-A | rule | 85 |
| Shower + WC rooms | Eastglen 28 m² per sex (3 showers, 3–4 WCs) → 56 m² | arch_sup_eastglenRooms | pp. 51, 53 | government (functional program) | 75 |
| Non-bather washrooms | required outside the wet area, to 3.7.2. Size ? | arch_sup_nbcAE7Pools | 7.2.4.10 | rule (AB) | 85 |
| Universal washroom | one at each washroom location on a barrier-free storey. Turning circle ≥1,700 mm. No m² in code (?) | arch_sup_nbcUniversal | NBC 3.8.2.8.(1), 3.8.3.13.(1)(j); BCBC 3.8.3.13 | rule | 85 |
| Universal dressing and shower room | required where showers serve the public. Accessible shower ≥1.5 × 0.9 m + 0.9 m clear (≈2.7 m²), plus bench 1.83 × 0.76 m with 0.9 m transfer space (≈3.0 m²) and a lavatory → ≈5.7 m² of clear spaces before the lavatory (our arithmetic). Eastglen 6 m² | arch_sup_nbcUniversal; arch_sup_eastglenRooms | 3.8.2.8.(13), 3.8.3.17.(1)–(2); p. 47 | rule / functional program | 75 |
| Pool mechanical (plant) | "1/3 to ½ of the water surface area" → 71–106 m². Eastglen counts it **inside** the grossing factor (p. 22) | arch_edmEastglen2017; arch_sup_eastglenRooms | p. 23; p. 22 | government | 80 |
| Chemical storage | required, not near heating, no direct public access. Eastglen 3 m² | arch_sup_nbcAE7Pools; arch_sup_eastglenRooms | 7.2.3.39; p. 58 | rule / functional program | 80 |
| Pool storage | 44 m² (Eastglen, not scaled) | arch_sup_eastglenRooms | p. 34 | functional program | 70 |
| Reception / control desk + cash | 15 + 4 m² | arch_sup_eastglenRooms | pp. 36–37 | functional program | 75 |
| First aid | 6 m² | arch_sup_eastglenRooms | p. 40 | functional program | 75 |
| Lifeguard office + foreman office | 20 + 8 m² | arch_sup_eastglenRooms | pp. 38, 43 | functional program | 75 |
| Staff break + staff change | 19 + 20 m² | arch_sup_eastglenRooms | pp. 45, 54 | functional program | 75 |
| Admin storage | 20 m² | arch_sup_eastglenRooms | p. 41 | functional program | 75 |
| Laundry room | 6 m² | arch_sup_eastglenRooms | p. 46 | functional program | 75 |
| Custodial | 10 m² | arch_sup_eastglenRooms | p. 59 | functional program | 75 |
| Electrical | "Size: Per code" (no m²) | arch_sup_eastglenRooms | p. 21 | functional program | — |
| Building mechanical | 5 % of assigned area (p. 23); "5-7% of gross" (p. 21): inside the grossing factor | arch_sup_eastglenRooms | pp. 21, 23 | functional program | 75 |
| Garbage | ? (no room in Eastglen) | — | — | — | 0 |
| **Net total (4 lanes)** | ≈760 m² (deck at Eastglen ratio) / ≈629 m² (deck at code minimum, dressing at BC rate): sum of every sized row above, incl. admin storage 20 m² (our arithmetic) | — | — | our arithmetic | 60 |
| Grossing factor | "1:1.3 to 1:1.5 is within the range common for recreation facilities"; Eastglen 1:1.45 (p. 4). Circulation ≈15 % (p. 23) | arch_edmEastglen2017; arch_sup_eastglenRooms | p. 23; pp. 4, 23 | government | 80 |
| **Gross (4 lanes)** | **≈990–1,140 m²** (760 × 1.3–1.5). Lean version ≈820 m² (629 × 1.3) (our arithmetic) | — | — | our arithmetic | 60 |
| Check: Eastglen whole | rooms total 1,484 m² net × 1.45 = 2,152 vs stated 2,131 gross (our arithmetic) | arch_sup_eastglenRooms | pp. 30–59; p. 23 | our arithmetic | 70 |
| Check: Eastglen pool only | leave out fitness 186, multipurpose 139, viewing 35, hot pool 40, steam 18 → 1,066 net → 1,386–1,599 gross (our arithmetic) | arch_sup_eastglenRooms | pp. 32–33, 39, 42, 44 | our arithmetic | 65 |

**Compared with the catalogue:** typical 2,131 m² (6 lanes) and min 949 m² (4 lanes). The 4-lane build-up (990–1,140 m²) supports the minimum. The 2,131 m² is a leisure centre: about 600 m² of it is fitness, multipurpose and leisure-water space. Suggestion: typical pool-only 6 lanes ≈1,400–1,600 m², with "leisure add-ons ≈600 m²" as a separate note.

## 2. Therapy pool

| part | m² or ratio | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Main: water | 4 × 6 m = 24 m² (12 bathers at 2 m²), or 5.5 × 8.5 m ≈ 46.75 m² for 100 bathers per 12 h | arch_wet_atacp2019 | s. 2.6 p. 11 | design guide (UK benchmark) | 75 |
| Main: concourse | 2 m on 2 sides, 1.5 m on the others → 47.25 m² (24 m² pool) / 61.25 m² (46.75 m² pool), taking the two 2 m sides as adjacent; 46–48 m² for other arrangements of the 24 m² pool (our arithmetic) | arch_sup_atacpSupport | s. 2.6 p. 12 | design guide | 75 |
| Main: AB deck rule (Section 7.2 applies to public and semi-public pools, 7.2.1.1) | deck ≥1.8 m all round (7.2.3.15). A special purpose pool not drained after every use follows the rest of Section 7.2 (7.2.6.1). 7.2.6.2 is the **whirlpool** article (jetted pools only) | arch_sup_nbcAE7Pools; arch_wet_nbcAE726 | 7.2.3.15, 7.2.6.1 | rule (AB) | 60 |
| Bathing load (AB) | 1 per 1.5 m² → 16 / 31 bathers (our arithmetic). A therapy pool is a "special purpose swimming pool"; the 1 per 1.0 m² whirlpool rate applies only if it has hydrojets or air bubbles | arch_sup_nbcAE7Pools | 7.2.4.1.(1)(a); Div. A 1.4.1.2 | rule (AB) | 70 |
| Changing | sized on "maximum potential numbers" (10 users → up to 20 changing). AB 0.5 m² per bather → 8 / 15.5 m² (our arithmetic) | arch_sup_atacpSupport; arch_sup_nbcAE7Pools | s. 2.11 p. 16; 7.2.4.3 | guide / rule | 60 |
| Changing Places room | 3 × 4 m (12 m²) with tracking hoist into the pool: "gold standard" | arch_sup_atacpSupport | s. 2.11 p. 16 | design guide | 75 |
| Accessible shower + WC cubicle | 2.4 × 2.5 m (6.0 m²). Wheelchair shower alone 2 × 2.2 m. Toilets 1:6, ≥1 accessible | arch_sup_atacpSupport | s. 2.12 p. 18 | design guide | 75 |
| Universal washroom / dressing-shower room | as for the pool (NBC 3.8.2.8.(1), (13)) | arch_sup_nbcUniversal | — | rule | 85 |
| Staff changing | "separate changing area with shower and toilet for staff". Size ? | arch_sup_atacpSupport | p. 19 | design guide | 75 |
| Plant room | "15-30% of the pool water area" → 3.6–7.2 / 7–14 m² | arch_wet_atacp2019 | s. 2.16 p. 19 | design guide | 75 |
| Chemical store | separate, secure, bunded to 110 %. Size ? (Eastglen 3 m² as proxy) | arch_sup_atacpSupport; arch_sup_eastglenRooms | s. 2.16 p. 20; p. 58 | guide / proxy | 50 |
| Staff office | desk, lockable storage, "ideally" a full view of the pool. Size ? | arch_sup_atacpSupport | s. 2.14 p. 19 | design guide | — |
| Reception, rest area | "may be required"; rest area with drinking water. Size ? | arch_sup_atacpSupport | s. 2.13 p. 18 | design guide | — |
| Storage (therapy and cleaning equipment, hoists) | "several storage areas". Size ? | arch_sup_atacpSupport | s. 2.15 p. 19; s. 2.8 p. 14 | design guide | — |
| Grossing factor | 1.3–1.5 (recreation, Eastglen). If inside a clinic: Ambulatory Care / CHC departmental 1.44 | arch_edmEastglen2017; arch_hsg_abGFNA2021 | p. 23; p. 12 | government | 65 |
| **Gross** | 24 m² pool: 107 m² sourced net × 1.3–1.5 = **≈140–160 m²**. 46.75 m² pool: 158.5 × 1.3–1.5 = **≈205–240 m²**. Both before office, rest and storage (?) (our arithmetic) | — | — | our arithmetic | 55 |

**Compared with the catalogue:** typical 134 m², min 90 m². Both sit below even the sourced-only build-up. Changing (Changing Places 12 m², shower/WC 6 m²) and grossing are missing from them.

## 3. Spa / bathhouse (small working version)

No Canadian functional program found. The Ogden report gives only "870 sq. m … over three levels", with no rooms, capacity or staff (arch_wet_vanCD1Ogden, p. 6). The parts below come from code rules and the Eastglen leisure-pool rooms.

| part | m² or ratio | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Main: hot pool | 40 m² incl. ramp (Eastglen hot pool; room sheet occupant load 20) | arch_sup_eastglenRooms | p. 32 | functional program | 70 |
| Main: hot-pool deck | whirlpool rule (applies only if jetted): ≥1.8 m at main entry, ≥0.9 m elsewhere → ≈33 m² for a 5 × 8 m pool, entry on a short side; ≈35 m² with entry on a long side (our arithmetic; **shape assumed**) | arch_wet_nbcAE726 | 7.2.6.2.(7)–(8) | rule (AB) | 55 |
| Main: steam room | 18 m², max 12 people | arch_sup_eastglenRooms | p. 33 | functional program | 70 |
| Main: cold plunge | tub ≈1.8 × 0.9 × 0.9 m (≈1.6 m², our arithmetic) (survey of operators) | arch_wet_vanRTS16473 | App. D pp. 1–2 | government report (survey) | 55 |
| Main: sauna | ? (only "maximum height of 3.6 m"; NBC(AE) 7.2.9 sets finishes, doors and viewing panel, no size) | arch_wet_vanRTS16473; arch_sup_nbcAE7Pools | App. D p. 2; 7.2.9 | — | 0 |
| Main: rest / relaxation area | ? | — | — | — | 0 |
| Bathing load | whirlpool (jetted, >30 °C) 1 per 1.0 m² → 40 (AB); Eastglen p. 16 also gives ≈40. BC hot tub 0.6 m bench per person. Eastglen room sheet says 20: conflict | arch_sup_nbcAE7Pools; arch_wet_bcPoolDesignHT | 7.2.4.1.(1)(b); s. 8.7 | rule / guide | 75 |
| Dressing rooms | 0.5 m² per bather → 20 m² (our arithmetic) | arch_sup_nbcAE7Pools | 7.2.4.3.(1) | rule (AB) | 75 |
| Showers | ≥3 per dressing room (AB) | arch_sup_nbcAE7Pools | 7.2.4.7.(2) | rule (AB) | 80 |
| WCs | 20 per sex: 1 male + 1 female under Table A (A-3) or Table B (D); both give the same count. Class of a spa unsettled | arch_sup_nbc372; arch_wet_nbcA3121 | Tables 3.7.2.2.-A, -B | rule | 75 |
| Shower + WC rooms | Eastglen 28 m² per sex → 56 m² (proxy; sized for a bigger pool) | arch_sup_eastglenRooms | pp. 51, 53 | proxy | 50 |
| Universal washroom; universal dressing and shower room | required (3.8.2.8.(1), (13)). Eastglen universal change 6 m² | arch_sup_nbcUniversal; arch_sup_eastglenRooms | — ; p. 47 | rule / proxy | 70 |
| Plant | pool mechanical ⅓–½ of water area → 13–20 m² (pool ratio applied to a hot pool: proxy) | arch_edmEastglen2017 | p. 23 | proxy | 45 |
| Chemical storage | required (AB). 3 m² (Eastglen) | arch_sup_nbcAE7Pools; arch_sup_eastglenRooms | 7.2.3.39; p. 58 | rule / proxy | 70 |
| Reception | 15 m² (Eastglen control desk, proxy) | arch_sup_eastglenRooms | p. 36 | proxy | 50 |
| Towel laundry; custodial | 6 m²; 10 m² (Eastglen, proxy) | arch_sup_eastglenRooms | pp. 46, 59 | proxy | 50 |
| Staff change | 20 m² (Eastglen, proxy) | arch_sup_eastglenRooms | p. 54 | proxy | 50 |
| Office, storage, garbage | ? | — | — | — | 0 |
| Grossing factor | 1.3–1.5 (recreation) | arch_edmEastglen2017 | p. 23 | government | 65 |
| **Gross** | ≈249 m² sourced net (every sized row above, incl. staff change 20 m²) × 1.3–1.5 = **≈325–375 m²**, plus sauna and rest area (?) (our arithmetic) | — | — | our arithmetic | 45 |

**Compared with the catalogue:** typical 870 m² on 3 storeys. That is a destination spa with no breakdown. A small working spa is about ⅓ to ½ of it. Suggestion: keep 870 m² as an "example, large" and add ≈325–375 m² + sauna as the working minimum, marked low confidence.

## 4. Laundry

### 4a. Self-service laundromat

| part | m² or ratio | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Code class | "Laundries, self-service" = Group D | arch_sup_nbcA3121Laundry | Note A-3.1.2.1.(1), p. 3-228 | rule (note) | 90 |
| Main: machine floor | m² per washer or dryer: ? (only trade sources found, not used) | — | — | — | 0 |
| Whole-premises cap (Vancouver) | "maximum floor area of 300 m2" | van3575s2 | Sec. 2 p. 22 | rule | 90 |
| Occupant load | 4.60 m² per person ("personal services shops"; also "cleaning and repair goods") | arch_sup_nbcT31171 | Table 3.1.17.1, p. 3-43 | rule | 85 |
| WCs | Table B: 300 m² → 65 people → 33 per sex → 2 WCs per sex. 150 m² → 1 per sex. Occupant load ≤10 → 1 shared WC (our arithmetic) | arch_sup_nbc372 | 3.7.2.2.(2), (10), Table B | rule | 80 |
| Universal washroom | one where washrooms are provided (3.8.2.8.(1)) | arch_sup_nbcUniversal | — | rule | 85 |
| Dryer exhaust | NBC 6.3.2.10.(7)–(9) covers laundry-drying exhaust ducts. Seen in the index only, not read (?) | — | — | rule (not read) | 20 |
| Staff, storage, electrical, mechanical, garbage | ? | — | — | — | 0 |
| Grossing | ? (no laundromat factor). VA benchmark: net to department 1.15, building gross 1.35 | arch_r2_vaLaundry2022 | s. 3.C | design guide (US benchmark) | 50 |

### 4b. Community laundry (in housing)

| part | m² or ratio | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Machines | "one set for every 10 units in common laundry rooms" | arch_sup_vanHDTG | s. 4.2.6 p. 7 | government design guideline | 80 |
| Fit-out | sorting counter ≥1,500 mm, central floor drain, seating area next to it, card-reload unit | arch_sup_vanHDTG | s. 4.2.6 p. 7 | government design guideline | 80 |
| Room m² per set | ? | — | — | — | 0 |

### 4c. Commercial laundry (plant)

| part | m² or ratio | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Code class | "Laundries, except self-service" = F-2 | arch_sup_nbcA3121Laundry | Note A-3.1.2.1.(1) | rule (note) | 90 |
| Rooms and grossing | room NSF by tier (e.g. clean linen processing 1,000 NSF for the smallest tier); net to department 1.15; building gross 1.35 | arch_r2_vaLaundry2022 | s. 3.C, 5.B–5.C | design guide (US hospital benchmark) | 50 |
| WCs | Table C (industrial): 1–10 per sex 1 WC, 11–25 2 | arch_sup_nbc372 | Table 3.7.2.2.-C | rule | 85 |

**Compared with the catalogue:** typical is null and max 300 m² (Vancouver). That still stands: no sourced typical size found. Washroom counts above are the only new sourced support figures.

## 5. Public aquarium

| part | m² or ratio | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Main / whole (benchmark) | building "ca. 5400 m2" usable; 2,345 m² air-conditioned; 775 m² under the two main tanks (≈14 % of usable, our arithmetic) | arch_wet_thyer2018 | text | peer-reviewed (Australian benchmark) | 70 |
| Small cap (Edmonton BE) | Major Indoor Entertainment (examples include "aquariums") max 500 m² | arch_zon_EdmZones | 3.3.1 | rule | 85 |
| Code class | not listed. Nearest A-2 "Museums" (our reading) | arch_wet_nbcA3121 | Note A-3.1.2.1.(1) | rule (note) | 50 |
| Occupant load | no exhibit-gallery row in Table 3.1.17.1 → designer's count, posted (3.1.17.1.(1)(c), (2)) | arch_sup_nbcT31171 | 3.1.17.1 | rule | 75 |
| WCs | Table A (assembly), once occupant load is set | arch_sup_nbc372 | Table 3.7.2.2.-A | rule | 80 |
| Life support (filtration, pumps), quarantine, food prep, husbandry, office, storage | ? (no primary source; the one US zoo LSS study gives volumes, not areas) | — | — | — | 0 |
| Grossing | ? | — | — | — | 0 |

**Compared with the catalogue:** typical 5,400 m² (Reef HQ). No small working version can be built from sources. Edmonton caps the use at 500 m² in BE. Suggestion: flag 5,400 m² as a large benchmark, and treat the minimum and the support split as gaps.

---

## Gaps "?"

- Universal washroom m²: the code gives only the 1,700 mm turning circle and fixture rules. The BCBC figures A-3.8.3.13 have dimensions that weren't readable in the text extract.
- Pool: garbage room, electrical room m² ("per code"), and non-bather washroom m².
- Therapy pool: office, rest area, reception and storage m². (Part 7 scope settled at Check 2: Section 7.2 applies to public and semi-public pools.)
- Spa: sauna and rest-area m², staff count, plant ratio for hot pools, and the spa's code class (A-3 or D). No Canadian functional program.
- Laundry: m² per machine, laundromat grossing, and community laundry m² per machine set.
- Aquarium: everything below whole-building level (life support, back of house, grossing). No Canadian cold-water example.
- Not reached: VA PG-18-9 full room list (fetch refused: not in this session's allowed sources). BC Pool Design s. 9.8–9.9 room sizes (none stated, per register).

Check 2 applied (2 Nov 2026)

Check 3 applied (2 Nov 2026): all sup_wet sources re-read (local NBC, NBC(AE), BCBC; Eastglen, BC Pool Design, ATACP, Vancouver HDTG by fetch). Fixes: NBC(AE) Section 7.2 runs pp. 7-2 to 7-19; Eastglen existing-building 57 % is p. 9; therapy-pool row now cites 7.2.6.1 (7.2.6.2 is whirlpools only); hot-pool deck marked jetted-only, ≈33–35 m². All "our arithmetic" re-done and confirmed (1,484 net × 1.45 = 2,152; pool-only 1,066 → 1,386–1,599; 4-lane 759 / 628 net → 987–1,138 / 817 gross; therapy 107 / 158.5 net; spa 249 net → 323–373). Sport England DGN not reachable (fetch refused), row kept from register. Detail: checkV3_result_sup_wet.json.
