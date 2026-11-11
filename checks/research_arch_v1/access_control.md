# Access control: portals, locks, cameras, guard room, glazing

Research 1 Nov 2026, per BRIEF.md. Builds on security_rest.md (zones, entrances, viewing window) and the VAN3 tour (register tourVAN3; quantity security_layers). Items there are cited, not repeated.

Codes read from repo copies: NBC 2020 (nbc.txt), BCBC 2024 (bcbc2024.txt), VBBL 2025 Book I (vbbl2025_v1.txt), NBC(AE) 2023 (nbc_ab2023.txt). Our word-by-word comparison: 3.4.6.15–3.4.6.17 are **identical** in NBC, BCBC and NBC(AE); VBBL adds text (below).

Codes column: N = NBC, B = BCBC, V = VBBL, A = NBC(AE). "our reading" = not stated by the source. "?" = not confirmed.

## 1. Security portals (mantraps)

### What VAN3 had (tourVAN3)
- A round glass single-person portal between the lobby and the hall side; it "weighed me and measured me" (her words; how she knew ?). The guide used a swing door beside it with "biometrics AND a scanner".
- Maker and model not recorded ?. Our reading: "weighed" fits a weighing floor (Boon Edam "Weight System", Gunnebo load cell); "measured" could be a volume sensor (Gunnebo ultrasound) or an overhead 3D sensor (Boon Edam StereoVision). Not confirmed.

### Maker data (all maker claims)
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Boon Edam Circlelock Solo (round, full portal) | unit 1000 × 2200 mm (w × h); 584 mm throat; 750 kg; wide option 1500 mm diameter; height option 2100–2600 mm | arch_acc_boonSolo | product page | maker claim | 70 |
| Circlelock Solo throughput | 5–6 persons/min one way, "dependent on access control system" | arch_acc_boonSolo | product page | maker claim | 70 |
| Circlelock Solo detection | StereoVision piggybacking detection; "Integrated sensors confirm the user is alone"; biometrics an option | arch_acc_boonSolo | product page | maker claim | 70 |
| Circlelock (2014 sheet) | 1000 and 1500 mm models; throat 584 / 937 mm; 5 / 4 per min; options: **"Weight System; detects tailgating and piggybacking"**, contact mats, sensors, StereoVision | arch_acc_boonPDS2014 | PDS v. 2014-01 | maker claim (older) | 55 |
| Circlelock Combi (half portal joined to a swing door) | 1500 × 2200 mm; 680 kg; 5–6/min; "Supervised disabled entry is possible" | arch_acc_boonCombi | product page; PDS V2-1224 | maker claim | 65 |
| Tourlock 180 (security revolving door, 4 wings) | 1600 × 2200 mm; 1038 mm throat; 900 kg; 18/min; wide option 1800–2200 mm | arch_acc_boonTourlock | product page | maker claim | 70 |
| Gunnebo HiSec² 6 / 7 / 9 / 10 | overall 1050² / 1150² / 1500² / 1800² mm; clear passage 600 / 700 / 900 / 1050 mm | arch_acc_gunneboHiSec | product page | maker claim | 70 |
| Gunnebo detection | ultrasound measures "the volume inside the portal"; load cell (max weight, weight band, actual weight); double contact mat | arch_acc_gunneboHiSec | product page | maker claim | 70 |
| Wheelchair model | Gunnebo HiSec 10 "typically meeting wheelchair access regulations"; Boon Edam: "Supervised disabled entry is possible" | arch_acc_gunneboHiSec; arch_acc_boonSolo | product pages | maker claim | 65 |
| Egress (maker's own words) | "Support for emergency egress (subject to local regulations)"; "Escape route requirements are subject to local regulations"; fail-safe standard, fire alarm connection | arch_acc_boonSolo; arch_acc_boonPDS2014 | product page; PDS | maker claim | 70 |
| Portal glass options | Boon Edam: RC3 burglary, BR2NS / BR4NS bullet (European classes, standards not named; our reading EN 1627 / EN 1063, paywalled) | arch_acc_boonCombi | PDS V2-1224 | maker claim | 60 |
| dormakaba, Automatic Systems portals | not read (only gates found in search) ? | — | — | — | — |

**For the tool:** portal footprint ≈ 1.0–1.8 m square or round, 2.2 m high plus canopy (maker claims); a wheelchair-width unit is the larger size (≈1.5–1.8 m).

### Do portals count as exits? (code)
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Revolving door used as exit | must be collapsible, have **"hinged doors providing equivalent exiting capacity located adjacent to it"**, ground floor only, not at the foot of a stair (N, B, V, A) | arch_acc_nbcRevolving | 3.4.6.15.(1) | rule | 90 |
| Revolving door capacity | "not … more than 45 persons" (unless power-collapsing per (3)) | arch_acc_nbcRevolving | 3.4.6.15.(2)–(3) | rule | 90 |
| Doors in an access to exit | "readily openable … without requiring keys, special devices or specialized knowledge"; maglocks allowed per 3.4.6.16.(5) | arch_acc_nbcDoorRelease | 3.3.1.13.(2), (7) | rule | 90 |
| Obstructions in egress | none narrowing egress below 750 mm "unless an alternative means of egress is provided adjacent to, accessible from, and plainly visible" (Note names turnstiles) | arch_acc_nbcObstruction | 3.3.1.24.(1); A-3.3.1.24.(1) | rule | 90 |
| Turnstiles in an exit | none may project into the required width of an exit | arch_acc_nbcObstruction | 3.4.3.3.(1) | rule | 90 |
| **So, for a portal** (our reading) | an interlocked portal is not a readily openable door; it may sit on a route only with a **swing door beside it** that serves egress (maglock released on alarm). Matches VAN3 (door beside the portal). | — | — | our reading | 75 |

### Accessibility (code)
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Entrances | all pedestrian entrances accessible / barrier-free (except service entrances); one doorway per entrance enough (N, B, A; V 3.8.2.2 not checked, V 3.8.2.7 same as B) | arch_acc_nbcAccessible | 3.8.2.2.(1), (3) | rule | 90 |
| Path of travel | to "all other normally occupied floor areas"; not needed to service rooms or spaces; BCBC exempts high-hazard industrial only | arch_acc_nbcAccessible | 3.8.2.3 | rule | 85 |
| Door width | 850 mm clear (BCBC: measured at 90° to the stop) | arch_acc_nbcAccessible | 3.8.3.6.(2) | rule | 90 |
| Power operators | on self-closing doors at entrances, vestibule inner doors and the route to rooms off a public corridor | arch_acc_nbcAccessible | 3.8.2.7.(1) | rule | 85 |
| **So** (our reading) | if the hall floor is "normally occupied", each security layer needs an 850 mm accessible door or a wheelchair-size portal; a 584 mm throat portal alone fails | — | — | our reading | 70 |
| BC / Alberta accessibility acts beyond the codes | not checked ? | — | — | — | — |

### How many layers
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| VAN3 | 4 controlled doors to the portal side, 5 to a tenant's servers | tourVAN3 | security_layers | site fact (one visit) | 40 |
| RCMP zones | Public → Reception → Operations → Security → High Security; not skipped | arch_sec_gcpsg015AppC | 5.3, 6.1 | gov. guide | 85 |
| Reception Zone | "Typically located at the entry … where initial contact between visitors and the department … occurs"; may be a reception desk with staff | arch_acc_gcpsg015RZ | 5.3.2 | gov. guide | 85 |
| Boon Edam | 4 layers: perimeter turnstile; revolving door at building; revolving door lobby→building; mantrap portal at server room | arch_acc_boonDCtips | "5 Tips" | maker claim | 50 |
| Uptime Tiers | do not prescribe security | uptimeMyths | — | industry body | 80 |
| TIA-942 security annex | not read (paywalled) ? | — | — | — | — |

## 2. Card, biometric and locked doors

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Exit and principal entrance doors | release from inside, one operation, no keys or special knowledge | arch_acc_nbcDoorRelease | 3.4.6.16.(1) | rule | 90 |
| **Electromagnetic locks** | allowed if: fire alarm system; "releases upon actuation of the alarm signal"; "releases immediately upon loss of power"; manual switch for staff; 90 N on the hardware starts an irreversible release **within 15 s**; signs; total delay on a path ≤15 s; emergency lighting | arch_acc_nbcDoorRelease | 3.4.6.16.(5) | rule | 90 |
| Not on | doors "leading directly from a high-hazard industrial occupancy" | arch_acc_nbcDoorRelease | 3.4.6.16.(5) | rule | 90 |
| Hardware height | 900–1100 mm | arch_acc_nbcDoorRelease | 3.4.6.16.(7) | rule | 90 |
| Intent | maglocks are for security beyond normal hardware, "not intended for indiscriminate use"; one switch should release all | arch_acc_nbcDoorRelease | A-3.4.6.16.(5) | rule (Note) | 85 |
| Bank/retail key-locked exits | only banks and retail; **not a data centre** | arch_acc_nbcDoorRelease | 3.4.6.17 | rule | 90 |
| Re-entry from exit stairs | see security_rest.md (3.4.6.18) | arch_sec_nbcExits | 3.4.6.18 | rule | 85 |
| **VBBL extra** | alternative release: push button wired directly to the lock power, "EXIT" embossed, lit, plus motion sensor or pad; auto reset not before 15 s | arch_acc_vbblMaglock | V 3.4.6.16.(8) | rule | 85 |
| **VBBL extra** | designer must give the Chief Building Official a **sequence of operation** for any maglocks that could "delay occupant egress or emergency responder access" | arch_acc_vbblMaglock | V A-3.3.1.13.(7) | rule (Note) | 85 |
| Biometrics placement | "generally less appropriate for high-traffic areas"; PIA before use (GC) | arch_acc_gcpsg006 | 7.4.3 | gov. guide | 80 |
| Airlocks vs turnstiles | two-door airlock: one door at a time, but several people can stand inside (piggyback risk) | arch_acc_gcpsg006 | 7.5.4 | gov. guide | 80 |
| Emergency exits as a weak point | "can also be used to circumvent access control"; interior opening only | arch_acc_gcpsg006 | 6.4.1 | gov. guide | 80 |
| Biometric data (one line) | sensitive; express consent; offer another means of access to those who decline; verification over identification; avoid central databases. Governs data, not the plan (but: an alternative door or card path, our reading) | arch_acc_opcBiometrics | guidance 2025-08-11 | gov. guide (PIPEDA) | 80 |
| BC / Alberta PIPA biometrics guidance | not read ? | — | — | — | — |

## 3. CCTV

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| FM 5-32 | data centre to be supervised per Data Sheet 9-1; FM-approved intrusion alarm if data rooms have emergency doors leading outside the secure area | arch_acc_fmSecurity | 2.2.1.7; 2.8.9.2.1 | insurer guide | 85 |
| FM DS 9-1 | not read (free at fm.com) ? | — | — | — | — |
| RCMP camera placement | parking, perimeter, entrances and exits; domes for entrances, stairwells, lobbies, screening; cameras out of public reach | arch_acc_gcpsg011 | 6.1; 7.1.1; 7.3.2 | gov. guide | 85 |
| RCMP monitoring | "within, or immediately adjacent to," a Security Operations Centre | arch_acc_gcpsg011 | 5.1.3 | gov. guide | 85 |
| RCMP coverage figures | none (no pixel or screen-height targets) | arch_acc_gcpsg011 | — | gov. guide | 80 |
| **Privacy: streets and passers-by** | "Cameras should be positioned to reduce capturing images of individuals who are not being targeted"; "a store security camera should not be recording passersby outside the store" | arch_acc_video2008 | guidelines | gov. guide (OPC, BC OIPC, AB OIPC jointly) | 85 |
| Privacy: viewing range | "Limit the use and viewing range of cameras as much as possible"; not at areas of heightened privacy (e.g. windows); notice before people enter | arch_acc_video2008 | guidelines | gov. guide | 85 |
| **Cameras over a public refuge or plaza** (our reading) | the guidelines cover "publicly accessible areas", so the operator's own plaza may be filmed with signs and a narrow view; aim away from the street, neighbours' windows and refuge sleeping areas | arch_acc_video2008 | — | our reading | 60 |
| Municipal camera rules (Vancouver, Edmonton) | none found ? | — | — | — | — |

## 4. Guard room / security control room

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| VAN3 | vestibule guard in a closed room, "bullet proof glass" (her words), slot for ID, screens and cameras; before the lobby | tourVAN3 | — | site fact (one visit) | 40 |
| Location | Reception Zone at the facility entry | arch_acc_gcpsg015RZ | 5.3.2 | gov. guide | 85 |
| Reception desk | placed "to allow for observation of the entry area" | arch_acc_gcpsg006 | 6.1, Fig. 1b | gov. guide | 75 |
| Secure data centre control room | glazed window or wall; "should permit observation of the servers"; occupied while server access allowed | arch_acc_gcpsg015RZ | App. C 2.3 | gov. guide | 85 |
| Maglock staff switch | release switch "readily accessible only to authorized personnel" (care occupancies B-2/B-3 only, 3.4.6.16.(6)(b)(iii): "constantly attended location") | arch_acc_nbcDoorRelease | 3.4.6.16.(5)(d) | rule | 85 |
| Size (m²), document slot, glazing level | **no source** ? | — | — | — | — |

## 5. Bullet-resistant glazing

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Rating standards | UL 752 (preferred) and NIJ 0108.01 | arch_sec_gcpsg013 | 6.2 | gov. guide | 80 |
| Canadian ballistic glazing standard | none found; code safety glazing is CAN/CGSB-12.1 (scope not read) ? | arch_acc_nbcRevolving | 3.4.6.15.(1)(e) | — | 50 |
| **Fire-rated + bullet-resistant, one product** | Pilkington Pyrostop BR (TGP): fire ratings 45–120 min; tests named UL 9, UL 10B/10C, ASTM E119/UL 263, **"CAN4 S-104", "CAN4 S-106", CAN/ULC-S101**; up to **UL 752 Level 3** (Level 8 with added laminate); "Classified and labeled by UL … and Underwriters Laboratories of Canada" | arch_acc_tgpPyrostopBR | fact sheet | maker claim | 65 |
| Thickness and weight | Level I, 60 min: 27 mm, 63 kg/m²; Level II, 120 min: 41 mm, 91 kg/m²; Level II/III, 120 min IGU: 62 mm, 126 kg/m² | arch_acc_tgpPyrostopBR | fact sheet | maker claim | 60 |
| Size limits | e.g. Level II/III 120 min IGU ≤2.40 m², ≤2.81 m each way; Level I 60 min ≤4.80 m² (column reading ?) | arch_acc_tgpPyrostopBR | fact sheet | maker claim | 50 |
| Rated frame | SAFTI FIRST GPX frames listed 60/90/120 min, met UL 752 (1995) Level 3 (2005 release) | arch_acc_saftiGPX | press release | maker claim (old) | 45 |
| Whether the Canadian listing covers the 90 min (1.5 h) window needed in a 2 h hall wall | ? (listing not read; "CAN4" is the old ULC designation) | — | — | — | — |

**For the tool:** a guard window can be both bullet-resistant and fire-rated (maker claim). Budget about 60–130 kg/m² and 27–62 mm of glass. No code requires bullet-resistant glass; it is operator practice (J.B., VAN3).

## Gaps (?)
- VAN3 portal maker and how it "measured" her.
- Boon Edam brochures on the maker's blob store refused by this session; Gunnebo BIM page failed; dormakaba and Automatic Systems portal sheets not read.
- Guard room size and glazing level: no source.
- FM DS 9-1 not read (free).
- BC/AB OIPC biometrics guidance; provincial accessibility acts; municipal camera rules.
- ULC listing of Pyrostop BR at 90 min; CAN/CGSB-12.1 scope.
- Paywalled: logged in checks/paywalled_standards.md.
