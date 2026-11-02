# Security, more: cameras and lighting, insurers, the exterior

Research 1 Nov 2026, per BRIEF.md. Builds on access_control.md (CCTV basics, privacy, guard room, glazing), security_rest.md (zones, entrances, viewing window, roof) and the 30 Oct notes (secure line). Items there are cited, not repeated.

Codes read from repo copies: NBC 2020 (nbc.txt), BCBC 2024 (bcbc2024.txt), VBBL 2025 (vbbl2025_v1.txt), NBC(AE) 2023 (nbc_ab2023.txt). FM 5-32 from /tmp/fm/fm.txt (register fmDS0532, Jan 2026, interim rev. July 2026).

"our reading" = not stated by the source. "?" = not confirmed. Insurer, operator and maker figures are labelled as such.

## 1. Camera placement

### Where cameras go (government guides)
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Perimeter, entrances, parking | already in register (GCPSG-011 6.1, 7.1.1) | arch_acc_gcpsg011 | — | gov. guide | 85 |
| Mounting | "ceiling corners, on top of building structures, or on top of security lighting poles" (out of public reach) | arch_sec2_gcpsg011b | 7.3.2 | gov. guide | 80 |
| Coverage | each camera to capture "the entire space intended" where no other camera overlaps; blind spots named as the usual failure | arch_sec2_gcpsg011b | 7.3.2; 5.1.2 | gov. guide | 80 |
| Fence line | fixed cameras "Commonly used for 24/7 monitoring of perimeter fencing" | arch_sec2_gcpsg011b | 7.1.1 | gov. guide | 80 |
| Cameras alone don't detect | video surveillance alone "is not an effective method of detection" at a fence; combine sensors | arch_sec2_gcpsg009b | 10.1 | gov. guide | 80 |
| Every portal | video "clear enough to identify all individuals entering through portals into each respective space"; "should not view the interior of the space" (said of the SOC) | arch_sec2_gcpsg003 | 6.6 item 2 | gov. guide | 75 |
| Inside an Operations Zone | "Restrict surveillance to access points and travel routes" | arch_sec2_gcpsg021 | Table 2 | gov. guide | 75 |
| Inside a secure data centre | areas out of direct view of the control room "continuously monitored by CCTV" (see arch_sec_gcpsg015AppC) | arch_sec_gcpsg015AppC | App. C 2.3 | gov. guide | 85 |
| Camera spacing, heights, pixel targets | **none** in GCPSG-011 | arch_sec2_gcpsg011b | — | gov. guide | 80 |
| Pixel-density classes (detect / observe / recognize / identify) | in IEC/EN 62676-4: paywalled ? | — | — | — | — |

### Operator claims (what they say they have)
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Equinix | "24/7 internal and external surveillance covering all critical areas"; "perimeter fencing with advanced detection devices"; security lobby, check-in, mantrap | arch_sec2_equinix5 | infographic | operator claim | 60 |
| Cologix VAN1 | CCTV; "Dual interlocking doors in the building lobby"; cards + biometrics | arch_sec2_cologixVan1 | site page | operator claim | 60 |
| Cologix VAN4 | "Security begins at the perimeter"; biometrics; 24/7 surveillance and on-site staff | arch_sec2_cologixVan4 | FAQ, 15 Jul 2025 | operator claim | 55 |
| eStruxture VAN-2 (555 W Hastings, 28-storey multi-tenant tower) | "minimum 90 days of video retention"; mantraps; 24/7 guards; dual-factor biometrics | arch_sec2_estruxVan2 | datasheet V5 | operator claim | 60 |
| Cameras on aisles and cages | no operator page read states it ? | — | — | — | — |

**So (our reading):** a camera at the fence line (facing in), every gate, every door and portal (identify faces), the dock, roof access points, and along hall aisles. No source gives spacing; the tool can mark points, not count cameras.

### Lighting for cameras (RCMP GCPSG-004)
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Camera zones | average ≥**20 lux**, uniformity ≥0.33, measured vertically 1.5 m off the ground | arch_sec2_gcpsg004 | 7.2 | gov. guide | 80 |
| Patrolled or sensored perimeter | **20 lux** "from 3m on the patrol side to 9m on the approach side"; tight beam control to limit spill onto neighbours and roads | arch_sec2_gcpsg004 | 7.2 | gov. guide | 80 |
| Staff entrances | **50–200 lux**, wall lights 3–4 m high | arch_sec2_gcpsg004 | 7.2 | gov. guide | 80 |
| Paths | ≥20 lux on the path, ≥5 lux 5 m to the side | arch_sec2_gcpsg004 | 7.2 | gov. guide | 80 |
| Open parking / enclosed parking | 25 lux / 65 lux | arch_sec2_gcpsg004 | 7.2 | gov. guide | 80 |
| Vehicle inspection (sally port) | 100 lux | arch_sec2_gcpsg004 | 7.2 | gov. guide | 80 |
| Light placement | luminaires "above and behind security cameras"; backlight less than 4× front light; on below 40 lux ambient | arch_sec2_gcpsg004 | 7.1–7.2; 8 | gov. guide | 75 |
| Fence lights | LED; "Aim towards the unsecured side" | arch_sec2_gcpsg009b | 10.7 | gov. guide | 80 |
| Colour | CRI 80+ as a starting target | arch_sec2_gcpsg004 | 6.4 | gov. guide | 70 |
| North American lighting standard | IES G-1-22 (security lighting): paywalled ? | — | — | — | — |

**For the tool (our reading):** a lit band about 12 m deep at the fence (3 m in, 9 m out). Aimed outward, it spills onto the sidewalk and neighbours, which GCPSG-004 itself says to limit. Flag it where the fence is on a street line.

### Clear zones by the fence
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Setbacks | outer setback "often cleared and trimmed"; inner setback "kept clear of any obstructions"; **no width given** | arch_sec2_gcpsg009b | 9.1 | gov. guide | 85 |
| Only figure | compacted gravel 300 mm deep, "at least 900mm on either side" (where no anti-tunnelling barrier) | arch_sec2_gcpsg009b | 10.10 | gov. guide | 80 |
| Double fence | spacing "at least twice the fence height" (≈4.8 m for 2.4 m fences, our arithmetic) | arch_sec2_gcpsg009b | 10.2 | gov. guide | 80 |
| Planting at the building | trim to keep "clear lines of sight at eye level"; building "observable from the roadway by first responders and passers-by" | arch_sec2_gcpsg014b | 7.1.1.3–7.1.1.4 | gov. guide | 80 |
| US benchmark | 9 m clear zone outside a 6 m standoff (security_rest.md) | arch_sec_ufc401001 | — | US rule | 60 |

### Privacy limits applied to public programs (from access_control.md)
- Aim fence cameras **inward**; a camera at a street-line fence films the sidewalk, which the 2008 guidelines say not to do (arch_acc_video2008).
- A public plaza, café or refuge entrance on the operator's lot may be filmed with signs and narrow views; not neighbours' windows or sleeping areas (our reading, as before).
- RCMP: CCTV not for monitoring staff performance (arch_acc_gcpsg011 5.1); SOC portal cameras "should not view the interior of the space" (arch_sec2_gcpsg003).
- **Conflict (our reading):** fence lighting aimed outward and cameras filming the approach both reach past the lot line when the fence sits on it. A fence set back from the street, with a public edge in front, fixes both.

## 2. Insurers beyond FM 5-32

### FM data sheets named by 5-32
| sheet | status | what 5-32 asks of it |
|---|---|---|
| 9-1 Supervision of Property (Apr 2017, rev. Jan 2021) | **J.B. to download**: fm.com fetch failed (site error); container download refused | supervision "to prevent unauthorized access" (2.2.1.7; 2.8.9.1) |
| 9-16 Burglary and Theft (Jan 2000, rev. Apr 2025) | **J.B. to download** (same) | building security design (2.8.9.2) |
| 1-20 Protection Against Exterior Fire Exposure | **J.B. to download** (same) | external exposure (2.2.1.3) |
| 1-57 Plastics in Construction | **J.B. to download** (not found by search) | named by 1-15 for BIPV facades |
| 1-3 High-Rise Buildings (Apr 2026) | **J.B. to download** | multi-storey data centres (2.2.1.4) |

### What FM 5-32 already gives (from fm.txt, not repeated elsewhere)
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Intrusion alarm | FM Approved **Level 1** or better for data rooms with emergency doors exiting outside the secure area; **Level 2** "if previous experience indicates this need"; line supervision or local alarm; response per FM-15 | fmDS0532 | 2.8.9.2.1–2.8.9.2.3 | insurer guide | 90 |
| Air intakes | "Do not expose the air intake(s) of the building to combustible materials" | fmDS0532 | 2.2.1.3.1 | insurer guide | 90 |
| Rooftop PV | "becoming increasingly common at data centers" (context only) | fmDS0532 | 3.5 | insurer guide | 85 |

### FM DS 1-15, roof PV (read)
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Scope | roof PV only; **BIPV facades go to DS 1-57** | arch_sec2_fm115 | 1.0 | insurer guide | 90 |
| Array size | max 46 × 46 m (150 × 150 ft) | arch_sec2_fm115 | 2.1.1.4 B | insurer guide | 85 |
| Gaps | ≥1.2 m aisle between arrays; ≥1.2 m to expansion joints; ≥1.8 m to skylights | arch_sec2_fm115 | 2.1.1.4 C–E | insurer guide | 85 |
| Frames | "Use only noncombustible frames and mounting systems" | arch_sec2_fm115 | 2.1.1.4 A | insurer guide | 85 |
| Roof rating | an FM Class 1A roof loses that rating under PV unless the system is FM Approved | arch_sec2_fm115 | 2.0 | insurer guide | 75 |

### Other insurers (public)
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| AXA XL exposure method | separation = (NFPA 80A guide number × height) + 1.5 m; worked example 21 m for a 30.5 × 7.6 m wall, 25% openings, severe | arch_sec2_axaPrc205 | "Position" | insurer guide (2020) | 70 |
| AXA XL wall protection | within half the distance: blank 3 h wall; openings within 1.5 m filled or 3 h shutters; within 3 m 1½ h; beyond half: wired glass + water curtain | arch_sec2_axaPrc205 | "Means of Protection" | insurer guide | 65 |
| OP Insurance (Finland) S710 | "Any unmanned data centre should be located in the middle of a building in a windowless room" | arch_sec2_opS710 | 4.2 | insurer guide (2018, EU) | 65 |
| OP S710 walls and alarm | "Class 3 anti-burglar wall"; construction not removable from outside without breaking; alarm ≥ Class 3 (EN 50131-1) to a 24 h centre, sirens inside and out | arch_sec2_opS710 | 4.2 | insurer guide | 65 |
| OP S710 what's above | consider washrooms, heating water and the roof above the hall | arch_sec2_opS710 | 4.5 | insurer guide | 65 |
| Zurich, Allianz public reports | **no** construction, security or mixed-use guidance; Zurich: hail-rated roofs, avoid combustible insulation (quotes from staff) | arch_sec2_zurich2026; arch_sec2_allianz2025 | whitepaper; pp. 19–27 | insurer report | 60 |
| Munich Re, Swiss Re | not searched ? | — | — | — | — |
| **Public uses next to an insured hall** | **no insurer source found** (FM 5-32 silent; OP S710 only on what is above) | — | — | — | 70 |

## 3. Building exterior

### Construction (codes and FM)
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| FM | "Construct data centers of noncombustible or FM Approved materials" | fmDS0532 | 2.2.1.1 | insurer guide | 90 |
| Combustible cladding on a noncombustible building | allowed if ≤3 storeys **or** sprinklered, **and** the wall passes CAN/ULC-S134: flame ≤5 m above the opening, ≤35 kW/m² at 3.5 m (N, B, V, A identical) | arch_sec2_nbc3155 | 3.1.5.5.(1); A-3.1.5.5 | rule | 90 |
| Near a lot line | where limiting distance allows ≤10% unprotected openings, Table 3.2.3.7 construction governs | arch_sec2_nbc3155 | 3.1.5.5.(2) | rule | 85 |
| Combustible parts inside the wall | same test, or 25 mm masonry/concrete cladding | arch_sec2_nbc3155 | 3.1.5.6 | rule | 85 |
| Plastic glazing | combustible vertical glazing allowed "no higher than the second storey", FSR ≤75 (≤150 if ≤25% of wall and conditions) | arch_sec2_nbc3155 | 3.1.5.4.(2)–(4) | rule | 85 |
| **Facade PV (BIPV)** | no PV clause; as cladding it falls under 3.1.5.5 (now confirmed in 2020/2024 texts; replaces the 2005 archive in greenhouse_solar.md) | arch_sec2_nbc3155 | 3.1.5.5 | our reading | 70 |
| BIPV fire tests (FM research) | 3 of 4 double-glass cavity BIPV spread fire to the top of a 16 ft (4.9 m) test; the 6 mm glass one held at ~8 ft; a flexible PV ~11 MW, flames >9.1 m; EN 13501-1 and UL 1703 listings "did not correlate" | arch_sec2_fmBipv2025 | exec. summary | insurer research | 75 |
| Exterior fire exposure (Canada) | spatial separation already in register (adj_occupancy.md, 3.2.3) | — | — | rule | — |

### Forced entry, windows, roof
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Building code | no forced-entry or ballistic wall rule found (our reading of NBC Part 3) | — | — | our reading | 60 |
| RCMP secure data centre perimeter | built to **G13-02 Secure Demising Wall** | arch_sec_gcpsg015AppC | App. C 2.3 | gov. guide | 85 |
| G13-02 wall | slab to slab; 2" × 6" 18 ga steel studs (≈152 mm deep, our conversion) at 300 mm; ¾-9F expanded mesh or 16 ga sheet steel on the attack side, riveted (screws not acceptable); 16 ga steel 1200 mm each side of the door; floors and roofs of wood or steel framing reinforced to match | arch_sec2_g1302 | pp. 7, 10–13 | gov. guide (2013) | 80 |
| SOC | "protected on all six sides from brute force entry"; "out of sight but within audible range of the public"; Security Zone nested in an Operations Zone; interlocked vestibule | arch_sec2_gcpsg003 | 4.3; 6.6 | gov. guide | 80 |
| No windows into halls | insurer: windowless room in the middle of the building (OP S710); FM: "minimize" interior windows (2.2.2.1); operators: no claim read ? | arch_sec2_opS710; fmDS0532 | 4.2; 2.2.2.1 | insurer guide | 65 |
| Facade glazing | security and safety glazing chosen at design; specs per GCPSG-013 (laminated) | arch_sec2_gcpsg014b | 6.9 | gov. guide | 80 |
| Roof | hatches, intakes, ducts "safeguarded"; hatches locked with heavy-duty hardware | arch_sec2_gcpsg014b | 6.12; 7.1.1.1 | gov. guide | 85 |
| Utility rooms | "should not be located adjacent to entrances to more restrictive zones" | arch_sec2_gcpsg014b | 6.12 | gov. guide | 80 |
| Lure spaces | avoid washrooms, cafeterias etc. that draw people across zone lines | arch_sec2_gcpsg014b | 6.2 | gov. guide | 80 |
| Mixed buildings | "The impact of departmental operations on adjacent occupants should be considered" | arch_sec2_gcpsg014b | 6.13 | gov. guide | 75 |

### Perimeter intrusion detection
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Fence sensors | disturbance (noise of fence motion) and deflection (taut wire); "more reliable when combining more than one type" | arch_sec2_gcpsg009b | 9.6 | gov. guide | 80 |
| Vibration sensors | "most commonly installed on fences"; CCTV can record on any trigger | arch_sec2_gcpsg021 | "Vibration Detectors"; "Alarm Systems" | gov. guide | 75 |
| Gates | "typically the weakest portion of any fence"; limit gaps under and around | arch_sec2_gcpsg009b | 10.6 | gov. guide | 80 |
| Buried, microwave, infrared | not covered in GCPSG-021 ? | — | — | — | — |

### Clashes with a public frontage and facade PV (our reading)
- **Glazed ground floor vs hall:** fine if the public floor is its own zone and the hall sits above or behind a G13-02 wall. Glass is noncombustible; only plastic glazing is limited (3.1.5.4).
- **RCMP vs insurer on visibility:** RCMP wants the building seen from the road (7.1.1.4) and the SOC heard by the public (4.3); OP S710 wants unmanned halls windowless in the middle. Both fit if public glass faces the street and the hall is inside.
- **Restricted areas upstairs** cut sightlines (arch_sec_gcpsg014 7.1.1.4), which suits a public ground floor.
- **Facade PV:** sprinklered building + CAN/ULC-S134 test of the whole wall; FM wants noncombustible or FM Approved (5-32) and points to DS 1-57. FM's own tests show most double-glass BIPV spread fire. Tool: facade PV flagged "needs tested assembly", not passed by default.
- **Fence on the street line:** lighting spill and camera view onto the sidewalk (GCPSG-004 7.2; video2008). Set the fence back or let the building wall be the line.

## Gaps (?)
- FM DS 9-1, 9-16, 1-20, 1-57, 1-3: J.B. to download (logged).
- Camera spacing or pixel targets: only in IEC/EN 62676-4 (paywalled, logged).
- IES G-1-22 security lighting (paywalled, logged).
- Operator claims of cameras on aisles and cages; no-windows practice: not found on public pages.
- Insurer guidance on public uses beside a hall: none found. Munich Re / Swiss Re not searched.
- GCPSG-004 page names the wrong guide in its effective-date line (2020-12-02).
