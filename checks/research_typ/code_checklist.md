# Shared schematic code checklist (typologies, both cities)

Research 4 Nov 2026 per `BRIEF_code_checklist.md`. Codes read in local texts (`data/raw/codes/`): NBC 2020 (`nbc.txt`), NBC(AE) 2023 (`nbc_ab2023.txt`), BCBC 2024 (`bcbc2024.txt`), VBBL 2025 Book I (`vbbl2025_v1.txt`). Zoning: I-3 (`data/raw/van/i3.txt`), Bylaw 20001 (`data/raw/edm/bylaw/b.txt`, same as the 4 Nov upload), Parking By-law s. 5 (register `arch_up3_vanPkg5`). Vancouver = VBBL; Edmonton = NBC(AE).

Ids in `code_checklist_sources.json` (`cc_*` new; register ids reused). "Same" = wording or figures compared in the local texts today. "?" = not found. "our reading" / "our arithmetic" labelled. NBC line numbers are `nbc.txt` lines.

## Key findings

- **F-2 governs** construction in a mixed building (3.2.2.6, "most restricted"); the 10 % small-occupancy waiver **never applies to F-2** (3.2.2.8). Small A-2/D rooms ≤10 % of a storey can be ignored for 3.2.2 (not for separations, our reading).
- **2 h** between F-2 and any A or B; **none** F-2 to D, E, F-3 (Table 3.1.3.1). F-3 parkade still 1.5 h (3.3.5.6).
- **Vancouver sprinklers every new building** (VBBL Div. A 1.3.3.6, Div. B 3.2.2.18.(3)). Edmonton: only by the article chosen.
- **Firewall turns one building into two** (Div. A 1.3.3.4.(1)); F-2 side **4 h**, masonry/concrete, 900 mm parapet. Splits the public part off the F-2 construction rules.
- **Exits:** 2 per floor area; ≥½ diagonal apart; travel **45 m** sprinklered (40 m D unsprinklered, 30 m otherwise); same in all four codes. An exit through a lobby can't have **industrial rooms opening onto the lobby** (3.4.4.2.(2)(c)).
- **Access:** VBBL drops the NBC 2-storey exemption → **every storey reached by elevator or lift** in Vancouver (VBBL 3.8.2.3.(2)(g)). Edmonton keeps it, but a physician clinic upstairs needs access (NBC(AE) 3.8.2.3.(2)(g)(v)).
- **Fire department:** principal entrance 3–15 m from the route (both). FDC: Vancouver **within 5 m** of the principal entrance; Edmonton **3–15 m** and ≤45 m to a hydrant.
- **Not triggered (our arithmetic):** high building (3.2.6.1) at 1–4 storeys; interconnected floor space only if storeys are opened to each other (3.2.8).

---

## 1. Building classification and construction (3.2.2)

Sources: cc_nbc3225to8, cc_nbcF2Construction, cc_nbcA2A3DConstruction, cc_vbblSprinklerAll, cc_nbcSprinklerStandpipe.

| rule | figure | clause | Vancouver | Edmonton | plan consequence | confidence |
|---|---|---|---|---|---|---|
| Whole-building size | "the building height and building area of the entire building shall be used" | NBC 3.2.2.5.(1) | same | same | size the article on the whole building, not per program | read |
| Most restrictive governs | "the requirements … for the most restricted major occupancy contained shall apply to the whole building" | 3.2.2.6.(1) | same + 3.2.2.93 (encapsulated mass timber) | same | F-2 article sets construction for A-2/A-3/D too | read |
| Stacked occupancies | each portion "as if the entire building were of that major occupancy"; floor between rated "for the lower major occupancy" | 3.2.2.7.(1)–(2) | same + EMTC encapsulation 3.2.2.7.(3) | same | public floors fully above or below the hall can use their own article (our reading) | read |
| 10 % waiver | ≤10 % of the storey "need not be considered as major occupancies … provided they are not … Group F, Division 1 or 2" | 3.2.2.8.(1) | same | same | small café/office ≤10 % ignored for 3.2.2; F-2 never ignored | read |
| F-2, any size | noncombustible; sprinklered; floors **2 h**; mezzanines 1 h | 3.2.2.76 | same | same | default if over the limits below | read |
| F-2, ≤4 storeys, sprinklered, increased area | area ≤ **18 000 / 9 000 / 6 000 / 4 500 m²** (1/2/3/4 storeys); noncombustible; floors **1 h** | 3.2.2.77 | same | same | likely article for 2–4 storey typologies (our reading) | read |
| F-2, ≤4 storeys, sprinklered | area ≤ **9 600 / 4 800 / 3 200 / 2 400 m²**; combustible permitted; floors **45 min** | 3.2.2.79 | same | same | combustible only for small buildings | read |
| F-2, ≤2 storeys, sprinklered | ≤ **4 500 m²** (1 storey) / **1 800 m²** (2); combustible | 3.2.2.81 | same | same | — | read |
| F-2 unsprinklered | ≤1 500 m² (3 storeys, Table 3.2.2.78); ≤1 000–1 500 / 600–900 m² (Table 3.2.2.80) | 3.2.2.78, .80 | **not available** (all new buildings sprinklered) | available | Vancouver: ignore | read |
| A-2, sprinklered | any area ≤6 storeys, noncombustible, floors 1 h (3.2.2.24); ≤2 storeys ≤4 800/2 400 m², combustible (3.2.2.26) | 3.2.2.23–.27 | same | same | over 2 storeys with A-2 → noncombustible | read |
| A-3 (pool, arena) | ≤2 storeys ≤12 000 / 6 000 m², noncombustible, floors 1 h (3.2.2.31); else 3.2.2.29: noncombustible, floors **2 h** | 3.2.2.29, .31 | same | same | pool above the 2nd storey → 2 h floors throughout (our reading via 3.2.2.6) | read |
| D, ≤4 storeys, sprinklered | ≤ **3 600 m²**; combustible; floors 1 h | 3.2.2.61 | same | same | — | read |
| Sprinklers under a sprinklered storey | all lower storeys sprinklered | 3.2.2.18.(2) | same; plus (3) all new buildings, (4) assembly in basement | same | — | read |

## 2. Major-occupancy separations and closures (3.1.3, 3.1.8)

Sources: arch_pub_nbc3131full, arch_hsg_nbc3131D, typ_warm_bath_bcbc3131, arch_sec_nbcGlazing, cc_nbcFirewallBuilding (3.1.8.6).

| rule | figure | clause | Vancouver | Edmonton | plan consequence | confidence |
|---|---|---|---|---|---|---|
| F-2 to A-1…A-4, B-1…B-3, C | **2 h** (C note 6) | Table 3.1.3.1 | same hours, notes (7), (8) absent | same (note 8) | 2 h wall/floor between hall and every public room | read; register arch_pub_nbc3131full |
| F-2 to D, E, F-3 | **—** (none) | Table 3.1.3.1 | same | note (8): 1 h D/F-2 if built to 3.2.2.57 | offices, shop, EV hub need no occupancy separation from the hall | read |
| A-2 to A-3; A to D; A to F-3 | 1 h; 1 h (A-2/D note 4); 1 h | Table 3.1.3.1 | same | same | pool vs hall/gym 1 h | read |
| D to B; B to F-2 | 2 h; 2 h | Table 3.1.3.1 | same | same | — | read |
| Storage garage | **1.5 h** to other occupancies | 3.3.5.6.(1) | same | same | parkade/EV storage not separation-free | register arch_pub_nbc3131full |
| One suite of residence in F-2 | "Not more than one suite of residential occupancy" | 3.1.3.2.(2) | VBBL adds live/work, flex exceptions | same | no housing in an F-2 building beyond one suite | register arch_pub_nbcDefs |
| Closures | 1 h → 45 min; 1.5 h → 1 h; **2 h → 1.5 h**; 3 h → 2 h; 4 h → 3 h | Table 3.1.8.4 | same | same | 2 h hall wall → 1.5 h doors | register arch_sec_nbcGlazing |
| Opening size | ≤ **22 m², ≤6 m** any side (both sides sprinklered); 11 m², 3.7 m if not | 3.1.8.6.(1)–(2) | same (sprinklered) | same | max one opening 6 m wide in a rated wall | read (NBC) |
| Wired glass | only in separations ≤1 h | 3.1.8.16.(1) | same | same | no glass in the 2 h hall wall except rated assemblies | register arch_sec_nbcGlazing |

## 3. Firewalls (3.1.10)

Sources: cc_nbcFirewallBuilding, arch_hsg_nbcFirewall, cc_fireAccess.

| rule | figure | clause | Vancouver | Edmonton | plan consequence | confidence |
|---|---|---|---|---|---|---|
| Firewall makes separate buildings | "each portion of the building so divided shall be considered as a separate building" | Div. A 1.3.3.4.(1) | same article | same article | public building can be combustible/smaller-article; F-2 rules stay on its side | read (NBC); article present in all four |
| Rating, F-2 side | **4 h**, noncombustible (upper part 2 h if it separates non-E/F-1/F-2) | 3.1.10.2.(1) | same | same | thick masonry/concrete wall on the secure line | register arch_hsg_nbcFirewall |
| Other occupancies | 2 h | 3.1.10.2.(2) | same | same | — | register |
| Material | masonry or concrete (≤2 h may be other, 3.1.10.2.(4)) | 3.1.10.2.(3) | same | same | — | read |
| Continuity | "from the ground continuously through … all storeys" | 3.1.10.3.(1) | same | same | firewall runs full height; no overhangs across it | register |
| Parapet | 150 mm (2 h); **900 mm** (4 h); none if roofs differ >3 m | 3.1.10.4 | ? (not compared) | ? (not compared) | 900 mm parapet on the line | read (NBC) |
| Openings | per 3.1.8.6; aggregate ≤ **25 %** of wall length per storey | 3.1.10.5 | ? | ? | few, rated openings in the firewall | read (NBC) |
| Firefighter access each part | cut-off portion: path to one entrance ≤45 m | 3.2.5.5.(4); VBBL 3.2.5.5.(2)(b) | VBBL wording | same as NBC | each building needs its own fire entrance | read |

## 4. Spatial separation (3.2.3)

Sources: cc_nbcSpatial, typ_twin_nbc3231, typ_twin_nbc3237, cc_vanI3Yards, cc_edmBEdesign.

| rule | figure | clause | Vancouver | Edmonton | plan consequence | confidence |
|---|---|---|---|---|---|---|
| Limiting distance | to "a property line, the centre line of a street, lane or public thoroughfare, or … an imaginary line between 2 buildings" | Div. A 1.4.1.2 | same | same | street/lane faces measure to the centre line | read |
| Openings, E/F-2, sprinklered (≥200 m² face) | 0 % at 0 m; **8 %** at 1.2–2.5 m; 10 % at 3 m; 50 % at 10 m; 100 % at 15 m | Table 3.2.3.1.-E | same rows | same rows | blank F-2 walls on lot lines | read; register typ_twin_nbc3231 |
| Openings, A/B/C/D/F-3, sprinklered (≥150 m²) | 0 % at 0 m; 14 % at 1.2 m; 22 % at 3 m; 100 % at 9 m | Table 3.2.3.1.-D | ? (first rows match) | ? | public faces get more glass at the same distance | read (NBC) |
| Construction, 0–10 % openings | E/F-1/F-2 **2 h**, noncombustible, noncombustible cladding; A/B/C/D/F-3 1 h | Table 3.2.3.7 | ? (not compared) | ? (not compared) | 0 m lot-line F-2 wall: 2 h noncombustible | read; register typ_twin_nbc3237 |
| Wall <1.2 m from line | openings protected by rated closures; no wired glass/glass block | 3.2.3.5 | ? | ? | no windows on BE 0 m side/rear (our reading) | register typ_twin_nbc3231 |
| BE side/rear 0 m; I-3 side 7.6 m | BE Table 4.1.5, 4.1.7: 0 m; I-3 3.1.2.4: 7.6 m | zoning | 7.6 m side → about 28–34 % F-2 openings, 66–82 % public, if the side lot line is the limit (our arithmetic, Tables -E/-D, 7–8 m columns) | 0 m → blank walls | — | read |

## 5. Exits (3.4)

Sources: cc_nbcExits, arch_sec_nbcExits, arch_acc_vbblMaglock, arch_hb_nbcHeadroom.

| rule | figure | clause | Vancouver | Edmonton | plan consequence | confidence |
|---|---|---|---|---|---|---|
| Number | "at least 2 exits" per floor area | 3.4.2.1.(1) | same | same | 2 stairs on every upper storey | read |
| One exit allowed | ≤2 storeys, ≤60 persons; sprinklered: travel ≤25 m and area ≤ A 200, D 300, F-2 **200 m²** | 3.4.2.1.(2), Table 3.4.2.1.-B | same | same | only tiny mezzanine floors | read |
| Separation | ½ the max diagonal (≤9 m needed with a public corridor; ≥9 m otherwise) | 3.4.2.3.(1) | same | same | stairs at opposite ends | read |
| Exterior discharges | ≥9 m apart (6 m if sprinklered and within 15 m of a street) | 3.4.2.3.(4) | ? | ? | — | read (NBC) |
| Travel distance | **45 m** sprinklered; 40 m D; 25 m F-1; 30 m otherwise; 105 m with 9 m public corridor | 3.4.2.5.(1) | same | same | hall ≤45 m to an exit; 60 m-apart perimeter exits as alternative (3.4.2.5.(2)) | read |
| Exit width per person | **6.1 mm** doors/corridors/ramps ≤1:8; **8 mm** stairs (rise ≤180, run ≥280); 9.2 mm otherwise | 3.4.3.2.(1) | same | same | e.g. 300 persons → 2.4 m stair total (our arithmetic) | read |
| Each exit share | ≤ half the required width | 3.4.3.2.(7) | same | same | — | read |
| Minimum widths | corridors 1 100; ramps 1 100; stairs 900 (≤2 storeys above exit level) / **1 100**; doors 850 mm | Table 3.4.3.2.-A | same | same | — | read |
| Headroom | 2 050 mm exits; 2 030 doors | 3.4.3.4 | same | same | — | read; register arch_hb_nbcHeadroom |
| Exit enclosure | ≥ floor rating, ≥45 min, ≤2 h | 3.4.4.1 | ? | ? | stair rated 1 h under 3.2.2.77 floors (our reading) | read (NBC) |
| Exit through lobby | one only; lobby ≤4.5 m above grade; ≤**15 m** through it; no care, residential or **industrial** rooms opening on it | 3.4.4.2.(2) | ? | ? | public lobby can carry one exit; hall must not open into it | read (NBC) |
| Service room into exit | "shall not open directly into an exit" | 3.4.4.4.(7) | same | same | — | register arch_sec_nbcExits |
| Exit door locks | openable without keys; maglocks per 3.4.6.16.(5) | 3.4.6.16 | VBBL alternative (8) | same | secure line can lock with release on alarm | register arch_sec_nbcExits, arch_acc_vbblMaglock |

## 6. Occupant load (Table 3.1.17.1, m² per person)

Sources: cc_nbcOccLoad, cc_nbcA3121 (classification of each program).

| program | figure | clause | Vancouver | Edmonton | plan consequence | confidence |
|---|---|---|---|---|---|---|
| Refuge, warming room (non-fixed seats) | 0.75; standing 0.40 | Table 3.1.17.1 | same table | same | sets exits and WCs | read |
| Dining (community kitchen) | 1.20 | same | same | same | — | read |
| Seats and tables | 0.95 | same | same | same | — | read |
| Lounges, reading | 1.85 | same | same | same | — | read |
| Kitchens | 9.30 | same | same | same | — | read |
| Offices; clinic (D) | 9.30 | same | same | same | — | read |
| Personal services | 4.60 | same | same | same | — | read |
| Gym, pool, spa | **no row** → designed load (3.1.17.1.(1)(c)) | 3.1.17.1 | same | same | state a designed load and post a sign (3.1.17.1.(2)) | read |
| Data hall | no row; "manufacturing or process rooms" 4.60 or designed staff load (our reading) | same | same | same | posted designed load keeps exits small (our reading) | read |
| Warehouse storage; storage | 28.00; 46.00 | same | same | same | — | read |
| Storage garage (EV hub) | 46.00 | same | same | same | — | read |
| Mixed-use room | value "which gives the greatest number of persons" | 3.1.17.1.(4) | same | same | refuge/gym dual use: take 0.40–0.75 | read |

## 7. Access to exit and corridors (3.3.1)

Sources: cc_nbcAccessToExit, nbcAB2023.

| rule | figure | clause | Vancouver | Edmonton | plan consequence | confidence |
|---|---|---|---|---|---|---|
| Public corridor width | **1 100 mm** | 3.3.1.9.(1) | same | same | — | read |
| Dead end | ≤ **6 m** | 3.3.1.9.(5) | same | same | — | read |
| Public corridor separation | 45 min; no rating if storey sprinklered (not care/residential); none if travel ≤45 m sprinklered | 3.3.1.4.(2)–(4) | ? | ? | sprinklered: corridors can be open (our reading) | read (NBC) |
| Two egress doorways | room >60 persons; F-2 room >**200 m²** or >25 m travel (sprinklered) | 3.3.1.5.(1), Table 3.3.1.5.-B | ? | ? | every hall: ≥2 doors | read (NBC) |
| Door spacing | ≥ ⅓ of the room's max diagonal | 3.3.1.5.(2) | ? | ? | hall doors at opposite corners | read (NBC) |
| Door swing | toward exit if >60 persons | 3.3.1.11.(2) | ? | ? | — | read (NBC) |
| Aisles | per NFC | 3.3.1.10 | per "Fire By-law" | per NFC(AE) | — | read |
| Non-public corridor width | ? | — | ? | ? | hall service corridor width: open | register nbcAB2023 |

## 8. Stairs and elevators

Sources: cc_nbcExits, cc_accessStoreys, bcbc2024_326.

| rule | figure | clause | Vancouver | Edmonton | plan consequence | confidence |
|---|---|---|---|---|---|---|
| Number of stairs | = number of exits (2) | 3.4.2.1 | same | same | — | read |
| Elevator required | not by Part 3 directly; by access to storeys (item 9) | 3.8.2.3 | **every storey** (only multi-level suites exempt) | 2-storey buildings exempt unless ≥600 m², assembly >100 m², integral facilities, or physician clinic | Vancouver: elevator in every multi-storey typology | read |
| Unsprinklered upper floors | elevator protected / zones | 3.3.1.7 | n/a (sprinklered) | applies if unsprinklered | — | read (NBC) |
| Firefighters' elevator | only high buildings | 3.2.6.5 | — | — | not triggered | register bcbc2024_326 |

## 9. Accessibility (3.8)

Sources: arch_acc_nbcAccessible, cc_accessStoreys, cc_abPhysicianClinic, arch_sup_nbcUniversal.

| rule | figure | clause | Vancouver | Edmonton | plan consequence | confidence |
|---|---|---|---|---|---|---|
| Entrances | all pedestrian entrances accessible except service entrances | 3.8.2.2.(1) | same ("accessible") | same | every public door step-free | read; register arch_acc_nbcAccessible |
| Path of travel | entrance storey and "all other normally occupied floor areas" | 3.8.2.3.(1) | "normally occupied areas" | same as NBC | — | read |
| Exempt | service rooms, service spaces, high-hazard industrial | 3.8.2.3.(2)(a)–(i) | same | same | plant rooms need no access | read |
| Unstaffed buildings | "not intended to be occupied on a daily or full-time basis" exempt | 3.8.2.1.(1)(c) | ? | ? | staffed DC with public program: in scope | register arch_acc_nbcAccessible |
| Door width | 850 mm clear | 3.8.3.6.(2) | measured at 90° | same | — | register |
| Physician clinic | doors **915 mm**, power operators, 1 700 mm turning in waiting room; 1 in 5 exam rooms accessible | — | n/a | NBC(AE) 3.8.5.2–3.8.5.3 | clinic layout in Edmonton | read |
| Universal washroom | at each washroom location on an accessible storey; turning **1 700 mm** | 3.8.2.8.(1), 3.8.3.13.(1)(j) | VBBL: in entrance storey (3.8.2.8.(4)) | same as NBC | one per washroom bank | register arch_sup_nbcUniversal |
| Showers | one universal dressing and shower room | 3.8.2.8.(13) | same | same | pool, spa, shelter | register |

## 10. Water closets (3.7.2)

Sources: arch_sup_nbcT3722A, arch_per_nbcWC.

| program | figure | clause | Vancouver | Edmonton | plan consequence | confidence |
|---|---|---|---|---|---|---|
| Assembly (refuge, dining, gym, pool) | per sex: 1–25 1/1; 26–50 1/2; 51–75 2/3; 76–100 2/4; … over 400 7 + 1/200 M, 13 + 1/100 F | Table 3.7.2.2.-A | same | same | — | register arch_sup_nbcT3722A |
| Business (offices, clinic) | 1–25 1; 26–50 2; over 50 3 + 1 per 50 | Table 3.7.2.2.-B | same | same | — | register arch_per_nbcWC |
| Industrial (data centre) | 1–10 1; 11–25 2; 26–50 3; …; staff count only if intermittently occupied | Table 3.7.2.2.-C; 3.7.2.1.(2) | same | + 3.7.2.1.(6) low human occupancy: none | staff WCs sized on staff | register |
| One shared WC | load ≤ **10** | 3.7.2.2.(2) | ≤ **25** | ≤10 | — | register |
| Unisex rooms | two serve ≤200 m², ≤60 persons | — | VBBL 3.7.2.2.(15) | n/a | — | register |
| Gender-neutral | load >200 → one gender-neutral facility | — | VBBL 3.7.2.9.(1) | n/a | — | register |

## 11. Service rooms and shafts (3.6)

Sources: arch_nbc3628, arch_hb_nbc3628, arch_open_nbc3628, cc_nbcVertService, arch_sep_nfc4311, arch_sep_nfcAB4321, arch_open_nbc3275.

| rule | figure | clause | Vancouver | Edmonton | plan consequence | confidence |
|---|---|---|---|---|---|---|
| Fuel-fired appliances | service room **1 h** | 3.6.2.1.(1) | same | same | boiler/standby generator room 1 h (our reading for non-life-safety gensets) | register arch_nbc3628 |
| Emergency generator (life safety) | room **2 h**, only the set and related equipment; not if the building houses only the generator | 3.6.2.8.(1) | same | same | separate genset for life safety, or a stand-alone generator building | register arch_hb_nbc3628, arch_open_nbc3628 |
| Electrical vault | 3 h (2 h sprinklered); sill ≥100 mm | 3.6.2.7 | same | same | — | register arch_nbc3628 |
| Electrical code rooms | 1 h | 3.6.2.1.(6) | same | Alberta Electrical Code Regulation | — | register nbcAB2023 |
| Vertical service space | floor 1 h → shaft 45 min; floor 2 h → shaft 1 h | Table 3.6.3.1 | ? | ? | risers 45 min under 3.2.2.77 floors | read (NBC) |
| Fuel tanks | NFC Part 4 applies to generator tanks >2 500 L | NFC 4.1.1.1.(3)(b) | Fire By-law (?) | NFC(AE) 4.3.2.1.(6): 1.5 m to building to 80 000 L | — | register arch_sep_nfc4311, arch_sep_nfcAB4321 |
| Emergency power | per CSA C282 | 3.2.7.5.(1) | same | same | — | register arch_open_nbc3275 |

## 12. Fire department access (3.2.5)

Sources: cc_fireAccess, arch_sec_nbcFireAccess, arch_dc_vbblFDC, arch_open_vbbl32520.

| rule | figure | clause | Vancouver | Edmonton | plan consequence | confidence |
|---|---|---|---|---|---|---|
| When needed | >3 storeys or >600 m² | 3.2.5.4.(1) | **every building** | same as NBC | all typologies (our arithmetic) | read |
| Principal entrance | **3–15 m** from route | 3.2.5.5.(1) | same, measured along path | same | entrance near the street or fire lane | read |
| Hydrant to building | FDC: pumper beside hydrants; no FDC: ≤90 m; firefighter path ≤45 m | 3.2.5.5.(2) | hydrant to principal entrance ≤ **90 m** (3.2.5.5.(4)) | same as NBC | — | read |
| Route | 6 m wide, 12 m radius, 5 m clear | 3.2.5.6.(1) | + grade 1:12.5, turnaround >90 m dead end | same | fire lane on large lots | read; register arch_sec_nbcFireAccess |
| FDC | ≤45 m to hydrant | 3.2.5.15.(1)–(2) | **within 5 m** of principal entrance, visible from street | + **3–15 m** from principal entrance (3.2.5.15.(3)) | FDC and valve room by the front door | read; register arch_dc_vbblFDC |
| Radio coverage | ≥98 % in generator room | — | VBBL 3.2.5.20.(3)(j) | n/a | — | register arch_open_vbbl32520 |

## 13. Sprinklers and standpipes

Sources: cc_vbblSprinklerAll, cc_nbcSprinklerStandpipe. (Brief's "3.2.9" is Integrated Fire Protection testing, not standpipes; standpipes are 3.2.5.8–3.2.5.10.)

| rule | figure | clause | Vancouver | Edmonton | plan consequence | confidence |
|---|---|---|---|---|---|---|
| Sprinklers | by article (3.2.2.18.(1)) | NBC | **all new buildings** (Div. A 1.3.3.6; Div. B 3.2.2.18.(3)) | by article | sprinklered everywhere (our reading for Edmonton too: all likely articles need it) | read |
| Design standard | NFPA 13 | 3.2.5.12.(1) | same | same | — | read |
| Standpipes | >3 storeys or >14 m to top ceiling; else area limits unless sprinklered (F-2: 1 500/1 500/1 000 m²) | 3.2.5.8, Table 3.2.5.8 | same | same | 4-storey typologies need standpipes in stairs | read |
| Integrated testing | CAN/ULC-S1001 | 3.2.9.1 | same number | ? | — | read (NBC, VBBL) |

## 14. High buildings, interconnected floor spaces

Sources: cc_nbcHighIFS, bcbc2024_326, arch_hb_vanI3.

| rule | figure | clause | Vancouver | Edmonton | plan consequence | confidence |
|---|---|---|---|---|---|---|
| High building (A, D, E, F) | top floor >36 m; or >18 m with load test | 3.2.6.1.(1)(a) | same | same | I-3: 6.0 + 4.0 + 4.0 = 14 m to the 4th floor (our arithmetic) → **not triggered** | read |
| Group C above 18 m | — | 3.2.6.1.(1)(d) | same | same | not triggered | register bcbc2024_326 |
| Interconnected floor space | openings between storeys need 3.2.8.3–8 | 3.2.8.1 | ? | ? | avoid open stairs/atria; mezzanine ≤500 m² exempt (3.2.8.2.(1)(c)) | read (NBC) |

## 15. Zoning items that shape the plan

Sources: cc_vanI3Yards, van_zdb_i3, arch_hb_vanI3, vanZDBs10, cc_edmBEdesign, arch_up3_vanPkg5, arch_up3_edm580.

| rule | figure | clause | Vancouver (I-3) | Edmonton (BE) | plan consequence | confidence |
|---|---|---|---|---|---|---|
| Yards | — | — | front 0.6, side 7.6, rear 3.1 m (I-3 3.1.2.2–3.1.2.6); rear reduced by lane half-width (3.1.2.17); corner exterior side = front (3.1.2.15); DP may vary (3.1.2.14, .16, .18) | street 6.0 m (4.5 m Collector/Local), sites 0 m, alley 0 m, residential site 6.0 m (Table 4.1) | — | read |
| Height | — | — | 18.3 m (3.1.2.1); 30.5/45.7 m by discretion | 16.0 m (4.1.1) | — | read |
| Floor area | — | — | FSR 3.00 (3.1.1.1) | FAR 1.6 (4.1.2) | — | register van_zdb_i3; read |
| Depth/width | — | — | ≤61.0 m each (3.1.2.7–8) | ? | long halls need a functional-need relaxation (3.1.2.19) | read |
| Floor heights | — | — | first floor ≥6.0 m, upper ≥4.0 m (3.1.2.9) | ? | — | register arch_hb_vanI3 |
| Ground floor | — | — | "Bulk data storage is not permitted at the ground floor, except for entrances" (2.2.11) | none | Vancouver: public program on ground floor | read |
| Transparency | — | — | ? (none in I-3, our reading of grep) | ≤10 % of ground-floor street windows non-transparent (5.3.2) | Edmonton street face clear glass where windows exist | read |
| Entrances | — | — | ? | main public entrances visible from a Street or Surface Parking Lot (5.3.1) | — | read |
| Screening | — | — | none in I-3 (vanZDBs10) | mechanical, transformers, cooling towers screened (5.2); loading/service not between building and street, screened (5.8) | plant yard to the rear or side | read |
| Loading and parking in setbacks | — | Parking By-law 5.5.3; BE 5.4 | outdoor loading set back by front yard, flanking side yard, 1.25 m from a flanking lane or R district | not in a Setback | loading inside the buildable area | read; register arch_up3_vanPkg5 |
| Loading count | — | — | storage/utility row: 1 for first 465 m², 1 for next 1 860, +1 per 2 325 m² (s. 5.2.5) | <2 500 m² 0; 2 500–7 500 1; >7 500 2 (5.80 Table 7.2) | — | register arch_up3_vanPkg5, arch_up3_edm580 |
| Loading size | — | — | Class B 10.2 × 3.4 × 3.8 m; aisle 6.1 m (5.5.1.2, 5.4.1) | 9.0 × 3.0 × 4.0 m (Table 7.1.4) | — | register |
| Façade articulation | — | — | ? | walls >25 m facing a Street or non-industrial Site: 2+ techniques (5.1) | — | read |
| Weather protection | — | — | ? (none in I-3) | ? (none in BE; other zones only) | — | read (our reading of grep) |

## 16. Data-centre specific

Sources as listed per row; FM 5-32 is insurer guidance, not law.

| rule | figure | clause | Vancouver | Edmonton | plan consequence | confidence |
|---|---|---|---|---|---|---|
| Secure line exits | locks release on alarm, power loss, switch, 15 s after 90 N push | 3.4.6.16.(5) | + alternative (8) | same | hall exits leave through public side only with release (our reading) | register arch_sec_nbcExits, arch_acc_vbblMaglock |
| Generator room | 2 h (life-safety); FM: ground floor, not roof/basement | 3.6.2.8; FM 5-32 2.6.4.3.1 | same | same | — | register arch_hb_nbc3628, arch_up2_fm0532 (insurer) |
| Fuel | no diesel tanks inside the data centre (FM) | FM 5-32 2.6.4.4.1.1 | NFC Part 4 >2 500 L | NFC(AE) | tanks outside | register arch_up2_fm0532 (insurer) |
| Intakes vs exhausts | loading dock 7.6 m; garage entry 4.5 m; street 1.5 m; combustion vent 3.0 m; evaporative discharge 7.6 m | NBC 6.3.2.9, Table 6.3.2.9 | VBBL same | same | generator exhaust away from public intakes | register arch_nbc6329 |
| ASHRAE 62.1 Table 5-1 | flue 5 m; cooling tower exhaust 7.5 m; loading 7.5 m | ASHRAE 62.1-2022 | benchmark | benchmark | — | register ashrae621_2022 |
| Noise at property line | quiet zone 55 dBA day / 45 night | By-law 6555 s. 2.1 | applies | — | plant away from residential edges | register van6555zones |
| Noise at property line | residential 65 dB(A) day / 50 night; non-residential 75 / 60 | Bylaw 14600 ss. 19–22 | — | applies | — | register arch_adj_edm14600 |
| Nothing wet over the hall | no cooling or domestic liquid piping routed above areas with critical or high-value equipment | FM 5-32 2.2.1.6 | insurer | insurer | pool, kitchen, washrooms never above the hall | register arch_up2_fm0532 (insurer) |
| Hall walls (FM) | 1 h rooms; 2 h between multiple halls | FM 5-32 2.2.4.1–2.2.4.1.1 | insurer | insurer | stricter than code for hall-to-hall | register fmDS0532 (insurer) |

## Open (?)

- Firewall parapet and opening limits, Table 3.2.3.1.-D, 3.3.1.4–3.3.1.5 and 3.6.3.1: read in NBC only; VBBL/NBC(AE) not compared.
- Non-public (service) corridor width: not found.
- Vancouver fire code for tanks and aisles: VBBL refers to the "Fire By-law"; not in local texts.
- Data hall occupant load: no Table 3.1.17.1 row; designed-load approach is our reading.
- Data centre as F-2 is the tool default (our reading); a D or F-3 classification changes items 1, 2, 4, 5 and 10.
