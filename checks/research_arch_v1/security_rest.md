# Security line: entrances and loading, viewing window, roof

Research 1 Nov 2026, per BRIEF.md. Builds on architecture_adjacency_draft.md, architecture_mode_notes_2026-10-30.md (secure line), adj_service.md (fire access), separations.md and spatial_rules.md (loading). Items already there are cited, not repeated.

Codes read from repo copies: NBC 2020 (nbc.txt), BCBC 2024 (bcbc2024.txt), VBBL 2025 Book I (vbbl2025_v1.txt), NBC(AE) 2023 (nbc_ab2023.txt). Edmonton Zoning Bylaw 20001 from the local copy (data/raw/edm/bylaw/b.txt, as adopted Jan 2024).

Codes column: N = NBC, B = BCBC, V = VBBL, A = NBC(AE). "our reading" = not stated by the source. "?" = not confirmed.

## 1. Entrances and loading

### Building code: fire access (all four codes; detail in adj_service.md s. 7)
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Access route needed | building >3 storeys or >600 m² building area (V: every building) | arch_sec_nbcFireAccess | 3.2.5.4.(1) | rule | 90 |
| Principal entrance to fire route | "not less than 3 m and not more than 15 m" from the route (V: measured along the path of travel) | arch_sec_nbcFireAccess | 3.2.5.5.(1) | rule | 90 |
| Firefighter path | ≤45 m vehicle to FDC (or principal entrance if no FDC) | arch_sec_nbcFireAccess | 3.2.5.5.(2)–(3) | rule | 90 |
| **A cut-off portion** (e.g. a secure part with no way into the public part) | each portion needs its own entrance ≤45 m from the vehicle | arch_sec_nbcFireAccess | 3.2.5.5.(4) | rule | 85 |
| Fire lane | 6 m wide, 12 m radius, 5 m headroom | arch_sec_nbcFireAccess | 3.2.5.6.(1) | rule | 90 |
| FDC placement | A: 3–15 m from principal entrance; V: within 5 m, visible from the street | adj_service.md | 3.2.5.15 | rule | 85 |
| A fire route gate through a secure fence | no clause found ? | — | — | — | — |

### Vancouver loading (Parking By-law 6059)
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Class B bays (data centre = Transportation and Storage) | 1 for the first 465 m², +1 for the next 1,860 m², +1 per further 2,325 m² | vanParking5 | s. 5, row 5.2.5 | rule | 80 |
| Class C (large truck) | 1 at 2,000–5,000 m², 2 above, only for manufacturing, retail, storage warehouse, wholesale; data centre unclear ? | vanParking5 | s. 5 | rule | 60 |
| Size | B 3.4 × 10.2 m, 3.8 m high; C 3.6 × 23.1 m, 4.3 m high | vanParking5; arch_sep_vanLoadingSupp | s. 5; supplement 3.3 | rule | 85 |
| Location | access from the lane where there is one (6.1 m aisle); Class A at grade off the lane | vanParking5; arch_sep_vanLoadingSupp | 5.4.1; supplement 3.4(a) | rule / guide | 75 |
| Loading vs pedestrian entrances | no rule | arch_sep_vanLoadingSupp | — | guide | 80 |
| Bays for public programs (library, pool, café) | not read: s. 5 page blocked to this session ? | — | — | — | — |

### Edmonton loading (Zoning Bylaw 20001)
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Number (non-residential) | <2,500 m² 0; 2,500–7,500 m² 1; >7,500 m² 2 | arch_sec_edm580 | 5.80 Table 7.2 | rule | 90 |
| Size | 9.0 × 3.0 m (3.1/3.3 with obstructions), 4.0 m clear; wholly on site; no backing into street or alley traffic | arch_sec_edm580 | 5.80 7.1 | rule | 90 |
| **"Rear or side only"** | **only in some zones**: UF 5.3, PU 5.3, CN 6.3. **Not in BE, IM or IH** | arch_sec_edmZoneLoading | zone sections | rule | 85 |
| BE | loading "must not be located between a building and a Street", screened | arch_sec_edmZoneLoading | BE 5.8 | rule | 90 |
| IM, IH | loading only kept out of required setbacks; the "not between building and Street" rule names storage, waste and service areas, not loading (our reading) | arch_sec_edmZoneLoading | IM 5.1–5.2; IH 5.1–5.2 | rule | 75 |
| Pedestrian paths | 1.8 m direct paths from main entrances to sidewalks, transit, parking; vehicle and pedestrian routes "clearly defined, safe" | arch_sec_edm580 | 5.80 3.1.1–3.1.2 | rule | 90 |
| Parkade | pedestrian access at grade "separate from vehicle access" | arch_sec_edm580 | 5.80 4.2.3 | rule | 90 |
| BE public entrance | "Main entrances for public access … must be visible from a Street or Surface Parking Lot" | arch_sec_edmZoneLoading | BE 5.3.1 | rule | 90 |
| CPTED | entrapment spots avoided, access points clearly defined; assessment may be required | arch_ezb5110 | 5.110 | rule | 90 |

### CPTED and security guidance on separating entrances
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver CPTED guideline | none citywide found; CPTED appears only in some CD-1 guidelines ? | — | — | — | 60 |
| Public to staff route | "Pedestrian circulation routes from PZ to OZ should pass through a RZ" | arch_sec_gcpsg014 | 6.7 | gov. guide | 85 |
| Public stairs | "All stairs required as a means of egress for PZ should be located in the PZ" | arch_sec_gcpsg014 | 6.7 | gov. guide | 85 |
| Lifts | "only allow access between the same zones" | arch_sec_gcpsg014 | 6.6 | gov. guide | 85 |
| Drop-off | no "parking, stopping, or drop-off points" at main or side entrances | arch_sec_gcpsg014 | 7.1.4 | gov. guide | 85 |
| **Loading dock** | "away from and not directly linked or adjacent to" restricted-access areas; shipping and receiving better kept apart | arch_sec_gcpsg014 | 6.16 | gov. guide | 85 |
| Mailroom | at least an Operations Zone, near receiving, can be isolated | arch_sec_gcpsg014 | 6.15 | gov. guide | 85 |
| Server rooms | managed as restricted-access areas | arch_sec_gcpsg014 | 6.18 | gov. guide | 85 |
| Standoff | set by a threat and risk assessment (TRA); no figure | arch_sec_gcpsg014 | 6.3, 7.1.1.5 | gov. guide | 85 |
| Blast zones | "Exclusion Zone … minimum of 3m"; "Watch Zone … minimum of 30 m … on average"; minimize parking in the watch zone; vet vehicles on adjacent roads | arch_sec_gcpsg002 | 6.1–6.3 | gov. guide (only where a TRA finds a blast threat) | 75 |
| Parking | no "parking close to buildings"; discourage casual use of shipping areas | arch_sec_pspcCSM | Annex B IV.C | gov. guide | 75 |
| Fence | 2.4 m minimum security fence | rcmpGCPSG009 | 10.1 | gov. guide | 85 |
| US benchmark: standoff | 6 m from the controlled perimeter with ≥9 m clear zone outside; 15 m aggregate (or 15 m with no outer clear zone); unobstructed space 10 m | arch_sec_ufc401001 | Std 1, 3-2.1; Std 2, 3-3 | US DoD rule (benchmark) | 60 |
| US benchmark: docks | loading docks and mail rooms on the building perimeter, "as far from heavily populated areas" as possible | arch_sec_ufc401001 | Std 13, 3-14 | US DoD rule (benchmark) | 70 |
| US GSA/ISC | not read: countermeasure tables are not public ? | — | — | — | — |

**Dock inside or outside the secure line:** no source places it. The RCMP guide keeps it away from, and not linked to, the hall; FM 5-32 and NFPA 75 are silent. Tool: dock inside the fence line, outside the hall's zone (our reading of GCPSG-014 6.16).

## 2. Viewing window into the data hall

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| NFPA 75 (US benchmark) | fire-rated window, or a shutter closing on smoke or fire; rated as the wall | nfpa75_2024 | 6.6.2 | standard | 80 |
| FM 5-32 | "minimize" windows to the data room; tempered or wired glass | fmDS0532 | 2.2.2.1 | insurer guide | 85 |
| **Wired glass or glass block** | only in a fire separation of **1 h or less** (N, B, A same; V same number) | arch_sec_nbcGlazing | 3.1.8.16.(1) | rule | 90 |
| **So, with a 2 h hall wall** (J.B. assumption) | no wired glass; the window must be a closure tested to CAN/ULC-S106 with a **1.5 h** fire-protection rating | arch_sec_nbcGlazing | 3.1.8.4.(1)–(2), Table 3.1.8.4 | rule | 85 |
| With a 1 h hall wall | closure 45 min; wired glass allowed | arch_sec_nbcGlazing | Table 3.1.8.4; 3.1.8.16 | rule | 90 |
| Area limits | only where the wall is an exit enclosure, firewall or dead-end corridor: 0.0645 m² (or 0 in a firewall). **No area limit** in an ordinary separation (our reading) | arch_sec_nbcGlazing | 3.1.8.18, Table 3.1.8.17 | rule | 80 |
| Installation | windows in fire separations per NFPA 80 | arch_sec_nbcGlazing | 3.1.8.5.(2) | rule | 90 |
| Whether a 1.5 h window or rated glazed wall is made | ? (CAN/ULC-S106 and S101 listings not read) | — | — | — | — |
| **RCMP: windows into server rooms** | a secure data centre is watched from a control room: "The glazing should permit observation of the servers" | arch_sec_gcpsg015AppC | App. C 2.3 | gov. guide | 85 |
| Zone of a server room | Protected A/B: Operations Zone; Protected C to Secret: Security Zone; Top Secret: High Security | arch_sec_gcpsg015AppC | App. C 1.1 | gov. guide | 85 |
| Server room walls | slab to slab; a suspended ceiling is not enough | arch_sec_gcpsg015AppC | App. C 2 | gov. guide | 85 |
| Zone order | zones nest; "should not be skipped, by-passed or omitted"; a Security Zone is entered only from an Operations Zone | arch_sec_gcpsg015AppC; arch_sec_pspcCSM | 5.3, 6.1; Annex B II.D | gov. guide | 85 |
| Views between zones | blinds or privacy film on partition glazing in security zones | arch_sec_gcpsg023 | 5.7, 6.7 | gov. guide | 75 |
| Glazing type | laminated glass "greatly increases the forced entry delay"; UL 752 for ballistic | arch_sec_gcpsg013 | 5.5, 6.2 | gov. guide | 80 |
| Upper floors | restricted areas "can be situated on upper floors to limit sightlines from other buildings" | arch_sec_gcpsg014 | 7.1.1.4 | gov. guide | 80 |
| **A window from a public space into a hall** | no Canadian source allows or forbids it. RCMP glazing looks from a control room (inside the secure zone), not from the public | — | — | — | 70 |
| Precedent: NWSC, Cheyenne (US) | guided tours enter the supercomputer room (Grade 9 and up); self-guided visitor centre | arch_sec_nwscTours | tours page | operator claim | 60 |
| Precedent: MareNostrum, Barcelona | glass box in a chapel, visitor tours; official page blocked (bot wall) ? | — | — | operator claim, not read | — |

**For the tool:** a public viewing window is a design choice with conditions: rated closure to match the hall wall (1.5 h if 2 h), screen or blinds option, and a flag that it crosses a zone line.

## 3. Roof access and roof programs

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Roof access (maintenance, fire) | building >3 storeys, roof slope <1 in 4: stair or hatch ≥550 × 900 mm with fixed ladder, from the floor below (N, B, V, A) | arch_sec_nbcRoof | 3.2.5.3.(1) | rule | 90 |
| Alberta rooftop HVAC | roof access per CSA B149.1 4.14.5–4.14.6 (paywalled) | arch_sec_abRoofHvac | NBC(AE) 3.6.4.7 | rule | 85 |
| Occupied roof structure | the roof is built as a **floor** assembly (fire separation rules for floors) | arch_sec_nbcRoof | 3.2.2.13.(1) | rule | 90 |
| Public roof over F-2 | assembly above F-2: 2 h floor, sprinklers in all storeys below | adjacency draft | 3.2.2.7; Table 3.1.3.1 | rule | 80 |
| **Exits from an occupied roof: NBC, NBC(AE)** | a means of egress from every roof intended for occupancy; **two** to exit stairs if >60 people | arch_sec_nbcRoof | 3.3.1.3.(3)–(4) | rule | 90 |
| **BCBC, VBBL (stricter)** | a means of egress **at roof level built as an exit**, from any roof occupancy; two if >60; occupied area counts as floor area | arch_sec_bcRoofEgress | 3.3.1.3.(5)–(7) | rule | 90 |
| Guards | 1,070 mm round any roof with access other than maintenance; 100 mm sphere | arch_sec_nbcRoof | 3.3.1.18.(1)(a), (2) | rule | 90 |
| Exit stair walls | no openings except exit doors and wired glass; no service room opening into it | arch_sec_nbcExits | 3.4.4.4 | rule | 90 |
| **Stair doors onto secure floors** | may be locked from the stair only if an unlocked door is within 2 storeys; maglocks allowed but **release on fire alarm** and power loss | arch_sec_nbcExits | 3.4.6.18; 3.4.6.16.(5) | rule | 85 |
| Where an exit ends | a public thoroughfare, or open space with access to one | arch_sec_nbcExits | Div. A 1.4.1.2 | rule | 90 |

**Does a public roof need exits not through the secure zone?** No code says "secure zone". But (our reading):
- Exits are separated stairs, so they pass the secure floors without entering them.
- If those stairs have doors onto secure floors, the doors unlock on alarm. So use a public stair with no doors onto secure floors.
- The stair must end at a street or open space with access to one, so not inside a locked yard.
- RCMP says the same: public-zone stairs belong in the public zone (GCPSG-014 6.7).

### Plant on the same roof (register sources, what they mean for public use)
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Generators and diesel tanks | never on the roof | fmDS0532 | 2.6.4.3.1; 2.6.4.4.1.1 | insurer guide | 90 |
| If generators are on the roof anyway (US) | 1.5 m from wall openings; oil curb; 300 mm noncombustible margin | nfpa37_2024 | 4.1.3 | standard | 85 |
| Rooftop batteries (US) | 1.5 m from roof edge, **3 m from the fire service access point**, 3 m from other buildings, lot lines, public ways, parking; 1.5 m walkways | nfpa855_2026 | 9.6.3.1.1.2; 9.6.3.1.3.1 | standard | 85 |
| Battery exhaust | 4.57 m from intakes, windows, doors; 3 m from any exit path; no "occupied work centres" in outdoor installations | nfpa855_2026 | 9.6.2.7.1.6–7; 9.6.2.6 | standard | 80 |
| Combustion exhaust → roof garden | 3 m from outdoor spaces people use (Canada, our reading); 5 m from intakes and operable windows, incl. greenhouse vents (US) | adjacency draft; ashrae621_2022 | NBC 6.3.3.1.(2); Table 5-1, B1.3 | rule / standard | 70 |
| Intakes | not exposed to combustibles (planting and greenhouse films, our reading) | fmDS0532 | 2.2.1.3.1 | insurer guide | 60 |
| Roof hatches | locked "with heavy-duty commercial hardware" | arch_sec_gcpsg014 | 7.1.1.1 | gov. guide | 85 |
| US benchmark | no exterior roof access: internal stairs or ladders only | arch_sec_ufc401001 | Std 14, 3-15 | US DoD rule | 70 |

**For the tool:** public roof = separate fenced zone; own exit stair(s) without doors onto secure floors; 2 h roof slab; keep plant clearances (batteries 3 m from the fire access point and exits, exhaust 3 to 5 m); no generators or tanks on that roof.

## Gaps (?)
- Vancouver loading for public programs; Parking By-law s. 5 page blocked.
- Whether 1.5 h fire-rated windows are made (S106 listings).
- A fire-route gate through a secure fence: no clause found.
- GSA/ISC standoff tables not public.
- Edmonton bylaw amendments since Jan 2024 not checked.
- No Canadian precedent of a public window into a data hall found.
