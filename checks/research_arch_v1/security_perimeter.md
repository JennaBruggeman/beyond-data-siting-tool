# Security perimeter: guards, barriers, vehicle entry

Research 1 Nov 2026, per BRIEF.md. Builds on security_rest.md (zones, entrances, loading, fire access), security_more.md (cameras, lighting, clear zones, fence detection) and access_control.md (portals, guard room, glazing). Items there are cited, not repeated.

Codes read from repo copies: NBC 2020, BCBC 2024, VBBL 2025, NBC(AE) 2023. Edmonton Zoning Bylaw 20001 from the local copy (as adopted Jan 2024; later amendments not checked). Vancouver I-2 and I-3 schedules from local copies (June 2026).

Codes column: N = NBC, B = BCBC, V = VBBL, A = NBC(AE). "our reading" = not stated by the source. "?" = not confirmed. Operator claims are labelled.

## 1. Guard staffing and rooms

### Do guards stay on site? (operator claims)
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Cologix VAN1, VAN4 (Vancouver, downtown) | "Security Personnel 24/7/365" | arch_per_cologixVan4Sheet | datasheet | operator claim | 65 |
| eStruxture VAN-2 (Vancouver tower) | "24 / 7 / 365 Building Security Guards" | arch_sec2_estruxVan2 | datasheet V5 | operator claim | 60 |
| eStruxture CAL-2 (Rocky View County, AB) | "24/7 on site security and support"; "Gates controlled by central security" | arch_per_estruxCal2 | datasheet V4 | operator claim | 60 |
| Digital Realty IAD12 (US campus) | "24x7 onsite security personnel"; "manned guard gates" | arch_per_dlrIad12 | site page | operator claim | 60 |
| Equinix | "security personnel managing lockdown" at the mantrap; 24/7 surveillance | arch_sec2_equinix5 | infographic | operator claim | 55 |
| Uptime Tiers | do not set security or staffing | uptimeMyths | — | industry body | 80 |
| Guards required by any rule | **no**. RCMP: guards only "If a TRA identifies a security requirement" | arch_per_gcpsg010 | 7.6.7 | gov. guide | 85 |

**So:** 24/7 guards are normal practice in all four operators read (claims), not a rule. The tool should treat a staffed post as a default, not a code item.

### Where guard posts sit
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Building entry | Reception Zone, where "interaction with security guards occurs" | arch_per_gcpsg010; arch_acc_gcpsg015RZ | 6.2.2; 5.3.2 | gov. guide | 85 |
| Entry points | traffic channelled to be controlled "by personnel, guards or automated means" | arch_per_gcpsg010 | 7.4.1 | gov. guide | 80 |
| Vehicle gate | "manned guard gates" (DLR); gates "controlled by central security", i.e. remote (eStruxture) | arch_per_dlrIad12; arch_per_estruxCal2 | — | operator claim | 55 |
| Dock | no source puts a guard at the dock; RCMP only keeps the dock unlinked from restricted areas | arch_per_gcpsg010 | 7.4.3 | gov. guide | 70 |
| Control room (SOC) | Security Zone, "out of sight but within audible range of the public" (already in register) | arch_sec2_gcpsg003 | 4.3; 6.6 | gov. guide | 80 |
| US benchmark: gatehouse | one gatehouse per entry, controls barriers, lighting, cameras; on a median or to the side; booth per lane; 0.9 m from curb face | arch_per_ufc402201 | 5-4 | US DoD rule | 60 |
| RCMP guard and control-room guides | G1-008 "Guidelines for Guard Services" (2001), G1-013 "Security Control Room Space Requirements" (2006): archived, GC staff only ? | arch_per_rcmpIndex | — | — | — |

**Tool (our reading):** posts at (1) building entry / Reception Zone, (2) the SOC inside the secure line, (3) a vehicle gate post *only* if the gate is not run remotely. The VAN3 vestibule guard (access_control.md) is (1).

### Staff facilities
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| SOC support spaces | "Rest Area/Break Room", "Washroom/Shower/Changing Room(s)", "Kitchenette", "Locker Room"; sizes set at design | arch_per_gcpsg003support | 6.2; 6.3 | gov. guide | 80 |
| Shifts | "24 hour surveillance"; "8 or 12 hours shifts"; staff per post "TBD" | arch_per_gcpsg003support | 4.1; 5.5 | gov. guide | 80 |
| Water closets: industrial (F) | per sex: 1–10 → 1; 11–25 → 2; 26–50 → 3 (N, B, A, V same table) | arch_per_nbcWC | Table 3.7.2.2.-C | rule | 90 |
| Count on staff only | industrial floor areas "only intermittently occupied" may count staff, not area (Note: substations) | arch_per_nbcWC | 3.7.2.1.(2) | rule | 85 |
| One shared WC | if occupant load ≤10 (**V: ≤25**) | arch_per_nbcWC | 3.7.2.2.(2) | rule | 90 |
| Lavatory | 1 per room with 1–2 WCs | arch_per_nbcWC | 3.7.2.3.(1) | rule | 90 |
| Universal washroom | B: one in the entrance storey where WCs are required (unless accessible route to one elsewhere) | arch_per_nbcWC | B 3.8.2.8.(4) | rule | 85 |
| Alberta exemption | no fixtures needed in a building of "low human occupancy" (pump houses); a staffed data centre is not one (our reading) | arch_per_nbcWC | A 3.7.2.1.(6) | rule | 75 |
| BC workplace distance | toilets "within 60 metres of the work area", ≤1 floor away (OHS Reg 4.85, via CCOHS summary) | arch_per_ccohsSanitation | BC | gov. summary | 65 |
| Alberta workplace | no "unreasonable restrictions" on toilet access (OHS Code 357) | arch_per_ccohsSanitation | AB | gov. summary | 65 |
| Break room / lunchroom | **no code clause**; BC/AB OHS eating-area rules not read ? | — | — | — | — |

**For the tool (our arithmetic):** a guard post plus SOC with ≤10 on shift needs 1 shared WC + lavatory; separate rooms per sex are not needed (3.7.2.2.(2)). Within 60 m of each post in BC. A gate post far from the building needs its own WC or a short walk (our reading). Add a break room/kitchenette as RCMP practice, not code.

### Provincial security acts
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| BC Security Services Regulation | licences, uniforms, vehicles ("SECURITY" ≥7.5 cm), equipment. **No rule on the site where guards work** | arch_per_bcSecReg | ss. 4, 10–12, 15 | rule | 85 |
| Alberta SSIA | licensing; policy manual has Alberta address and branch-office rules only, as read | arch_per_abSSIA | 3.6.2, 3.7.2 | gov. guide | 65 |
| Alberta exception | manual lists 8.6.1 "Holding/Detention Rooms" and App. C on building them. Text not reached; applies only if guards hold arrested persons (our reading) ? | arch_per_abSSIA | TOC | gov. guide | 40 |

**So:** neither act shapes the plan. Only a holding room (AB) might, and a data centre is unlikely to have one.

## 2. Perimeter barriers

### Types and ratings
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Fence | ≥2.4 m security fence; ≥3.6 m high security (register) | rcmpGCPSG009 | 10.1 | gov. guide | 85 |
| Crash fence | panels with "integral crash beams or cables"; continuous cables spread impact | arch_per_gcpsg009hvm | 10.3.2; 10.5 | gov. guide | 80 |
| Where people walk | bollards, large planters or rocks; back-filled retaining wall | arch_per_gcpsg009hvm | 9.1 | gov. guide | 80 |
| Landform | ditches and berms sloped to stop or slow vehicles | arch_per_gcpsg009hvm | 9.1; 9.5 | gov. guide | 80 |
| Planters and furniture | "generally not able to restrain a vehicle deliberately driven at a high rate of speed" unless engineered | arch_per_gcpsg002hvm | 6.3 | gov. guide | 80 |
| ASTM F2656 M-ratings | 15,000 lb truck at M30 48 km/h, M40 64 km/h, M50 80 km/h | arch_per_gcpsg009hvm | 8.2 | gov. guide (summary of paywalled standard) | 80 |
| P-ratings (penetration past barrier) | P1 <1 m; P2 1.1–7 m; P3 7–30 m; P4 ≥30.1 m | arch_per_gcpsg009hvm | 8.2 | gov. guide | 80 |
| Which rating | set by a TRA from setback and standoff; no default | arch_per_gcpsg009hvm | 8.2 | gov. guide | 85 |
| Bollard gap | **≤1,200 mm** clear at 600 mm height (UK, withdrawn 2022) | arch_per_nactsoHvm | — | UK gov. guide (benchmark) | 55 |
| Static vs active | static barriers preferred; active (rising) only where frequent access needed | arch_per_nactsoHvm | — | UK gov. guide | 55 |
| Canadian HVM standard (CSA) | none found; RCMP names ASTM F2656, and CSA S850 for blast only ? | arch_per_gcpsg002hvm | 6.3 | — | 60 |
| Operators' crash ratings | none stated on pages read (DLR: "berms, and hardscaping") | arch_per_dlrIad12 | — | operator claim | 55 |

**Tool:** P-rating is space. An M30 **P1** barrier needs ≈1 m behind it; P2 up to 7 m (our reading of 8.2). Draw a run-out zone behind the line, sized by P class.

### Vancouver: fence height and street edge
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| **Fence in any required yard** | **≤1.9 m** (all districts, incl. I) | arch_per_vanS10 | 10.10.3 | rule | 90 |
| "Fence" includes | gates, screens, walls | arch_per_vanS10 | 10.10.1 | rule | 90 |
| Higher fence | Director of Planning may permit, after notifying owners | arch_per_vanS10 | 10.10.6 | rule | 90 |
| 1.2 m front yard cap | C-1 and R districts only; **not I-zones** | arch_per_vanS10 | 10.10.4 | rule | 90 |
| I-3 A required yards | front 0.6 m; side 7.6 m; rear 3.1 m | arch_per_vanI3yards | 3.1.2.2–3.1.2.6 | rule | 90 |
| I-2 required yards | no front yard listed; side not required (unless next to R); rear 3.1 m | arch_per_vanI3yards | I-2 3.1.2 | rule | 85 |
| I-3 street fence | must "facilitate pedestrian interest to the satisfaction of the Director of Planning" | arch_per_vanI3yards | 4.5.1 | rule | 90 |
| Schedule C streets (M, I, CD-1) | landscaped setback; "no building or structure of any kind"; only "open ornamental fences" for landscaping | arch_per_vanS10 | 10.7.1 | rule | 85 |
| Which streets / depths | Schedule C not read (fetch failed) ? | — | — | — | — |
| Fence beyond the required yard | no 10.10 cap; whether it is a "structure" under setbacks is unclear ? | — | — | our reading | 50 |
| Barbed wire | no clause in s. 10 | arch_per_vanS10 | — | rule | 75 |

**So (our reading):** a 2.4 m RCMP fence **exceeds** the Vancouver 1.9 m cap in a required yard. Options: (a) Director's relaxation, (b) set the fence behind the yard line, or (c) let the building wall be the line on the street. On Schedule C streets the setback must stay open and planted. (c) also fixes the light and camera spill flagged in security_more.md.

### Edmonton: fence height and street edge
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Fence height table | **residential only**; **no non-residential fence height cap found** | arch_per_edmFence | 5.100 1.1 | rule | 80 |
| Benchmark in the bylaw | Edmonton South only: no permit needed for a "chain-link security Fence" ≤2.5 m in non-residential areas | arch_per_edmFence | 7.120 9.1.5 | rule | 85 |
| Fence in a street setback | a Fence is "a structure"; setbacks apply to "development"; so the fence sits **behind** the setback (our reading) | arch_per_edmFence | 8.20 | rule / our reading | 60 |
| Street setbacks | BE 6.0 m (4.5 m on collector/local); IM 3.0 m; IH 3.0 m | arch_per_edmFence | BE 4.1.3–4.1.4; IM 4.1.3; IH 4.1.4 | rule | 90 |
| Setback must be landscaped | yes; 1 tree + 2 shrubs per 30 m² | arch_per_edmFence | 5.60 2.2; 4.1.1 | rule | 90 |
| Screening height | IM: max 3.7 m (storage/service screening) | arch_per_edmFence | IM 5.3 | rule | 85 |
| Barbed wire | not permitted for non-industrial development (so BE likely; IM/IH not barred) (our reading) | arch_per_edmFence | 5.120 1.1.5 | rule | 70 |
| Berms | named as screening and nuisance mitigation | arch_per_edmFence | 5.120 2.1 | rule | 80 |

**So:** in Edmonton a 2.4–3.6 m fence is not capped, but it sits behind a 3–6 m planted setback. Berms and planting in that setback can double as vehicle barriers (our reading).

### Barriers on city land
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver | anything on a street needs an agreement; fences, steps, hedges permitted if the Engineer is satisfied; planters, retaining walls listed (no annual charge); bollards not named | arch_per_vanEncroach | s. 3(1), 3(3); Sch. D | rule | 80 |
| Vancouver revocation | Engineer may require removal; owner indemnifies City | arch_per_vanEncroach | ss. 9A, 13 | rule | 80 |
| Edmonton | Licence of Occupation for "landscaping and gardening, walls and fences" on road right-of-way; planters need City approval | arch_per_edmRow | web page | gov. guide | 65 |
| Crash-rated bollards on a sidewalk | no rule found in either city ? | — | — | — | — |
| RCMP on easements | public or utility access "can limit the tenant's ability to control access" | arch_per_gcpsg010 | 7.3.1 | gov. guide | 75 |

**Tool:** keep rated barriers on the lot. Street-side items are revocable licences, not a secure line (our reading).

## 3. Vehicle entry

### Gates and barriers
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Gate barrier types | fixed or movable bollards, wedge/ramp barriers, locking arms, cable barriers | arch_per_gcpsg009hvm | 10.6 | gov. guide | 80 |
| Gates are weak | "typically the weakest portion of any fence" (register) | arch_sec2_gcpsg009b | 10.6 | gov. guide | 80 |
| Slow the approach | curves, chicanes, parallel approach; half speed = quarter force | arch_per_gcpsg009hvm | 10.6 | gov. guide | 80 |
| Sliding, cantilever, swing | not compared by RCMP ? | — | — | — | — |
| US benchmark | final denial barrier at the end of the entry; ≥2 s deployment assumed | arch_per_ufc402201 | 5-5.1; 5-5.1.5 | US DoD rule | 55 |

### Queue before the gate
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| **Vancouver** | gate placed so a vehicle is "fully on private property when stopped" | arch_per_vanPkgSupp | 1.5 | design guide | 85 |
| Vancouver ticket dispenser | ≥15 m inside the property line; attendant booth ≥30 m | arch_per_vanPkgSupp | 2.6 | design guide | 85 |
| Vancouver ramp | ≤10% slope in first 6.1 m from property line | arch_per_vanPkgSupp | 1.2 | design guide | 85 |
| **Edmonton** | access and curb crossings approved case by case; parkade entries must not block the sidewalk or traffic | arch_per_edmFence | 5.80 1.1; 4.2.2 | rule | 85 |
| Edmonton loading | no backing or turning into Streets or Alleys (register) | arch_sec_edm580 | 7.1 | rule | 90 |
| Edmonton queue spaces | 6.5 × 3.0 m each, **drive-through uses only** | arch_per_edmFence | 6.110 7 | rule | 85 |
| US benchmark | stack length from peak-hour arrivals; trucks processed apart from cars | arch_per_ufc402201 | 4-1.1.1; 3-2; 2-2.3.2 | US DoD rule | 55 |

**Tool (our arithmetic):** hold one design vehicle wholly on site before the gate. WB-17 (Vancouver Class C) ≈17 m + clear zone; SU-9 ≈9 m. Lengths are from the vehicle names; confirm against TAC ?. The guard post at a manned gate goes ≥15–30 m in, on Vancouver's ticket and booth figures (analogy only).

### Vehicle screening area
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Inspection | roadway access limited to vetted, inspected vehicles (where TRA finds blast threat) | arch_per_gcpsg002hvm | 6.2 | gov. guide | 75 |
| Lighting | 100 lux at vehicle inspection (register) | arch_sec2_gcpsg004 | 7.2 | gov. guide | 80 |
| Size | no Canadian figure ? | — | — | — | — |

### Truck turning and widths
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| **Vancouver design vehicles** | Class A: P; Class B: **SU-9**; Class C: **WB-17** (not WB-15 or WB-20) | arch_per_vanPkgSupp | Table 3 | design guide | 85 |
| Vancouver aisles | Class B 6.1 m; Class C 14.0 m | arch_per_vanPkgSupp | Fig. 5 | design guide | 85 |
| Forward exit | backing ≤10 m; exit forward | arch_per_vanPkgSupp | 2.8 | design guide | 80 |
| Edmonton design vehicle | not found (COE-IM-GUIDE-0023 refused) ? | — | — | — | — |
| WB-15 / WB-20 turning radii | in TAC Geometric Design Guide (paywalled, logged); BC and AB supplements read had none ? | — | — | — | — |

## Clashes for the tool (our reading)
- **Fence height vs zoning:** RCMP 2.4 m > Vancouver 1.9 m in required yards. Edmonton has no cap but a planted setback in front.
- **Gate vs street:** Vancouver wants the stopped vehicle wholly on the lot. With WB-17 trucks that is ≈17 m+ of driveway before the gate.
- **Barrier run-out:** P2 can need 7 m behind the line. On a tight urban lot, prefer P1 or let the building wall stop vehicles.
- **Guards vs public programs:** a staffed entry post can double as the public desk only if the Reception Zone is shared. GCPSG-014 keeps public and secure routes apart (security_rest.md).

## Gaps (?)
- Vancouver Schedule C (streets and setback depths): fetch failed.
- Edmonton COE-IM-GUIDE-0023 and Licence of Occupation guide PDF: robots-blocked. J.B. to download.
- Alberta SSIA policy manual 8.6.1 and App. C (holding rooms): not reached. J.B. to download.
- WorkSafeBC OHS Reg 4.85 and eating-area text: page refused; only CCOHS summary read.
- RCMP G1-008 and G1-013: archived, GC staff only.
- TAC GDG (design vehicle radii), ASTM F2656, CSA S850, PAS 68 / IWA 14-1: paywalled, logged.
- UFC 4-022-01 guard-facility clauses (5-7.7, 5-7.8) not reached.
- Edmonton bylaw amendments since Jan 2024 not checked.
