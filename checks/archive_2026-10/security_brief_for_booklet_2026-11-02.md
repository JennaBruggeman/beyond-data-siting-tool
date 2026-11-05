# Data centre security: what we've learned (for the booklet spread)

From the Beyond Data tool research, 30 Oct – 2 Nov 2026. Every point carries its source. Labels: **rule** (law or code), **guidance** (government or standards body), **insurer** (FM Global and others: what an insured operator is held to, not law), **operator** (company claims or J.B.'s VAN3 tour), **maker** (manufacturer claims), **our reading** (an interpretation), **?** (not confirmed). Quote only what's labelled; don't upgrade a claim to a rule.

## The big idea: layers, and a line that can move
- Security works in **layers**, each a controlled door. At Cologix VAN3 (J.B.'s tour, Oct 2026, operator) a visitor passed: a gate intercom at the fence; a buzzed front door; a guard behind bullet-resistant glass with an ID slot; a buzzed door into the lobby; a single-person glass portal that "weighed me and measured me" (her words); then each tenant's cage with its own biometrics. About **five layers** street to servers.
- The RCMP's physical security guides (guidance, written for federal buildings, so a benchmark for a private data centre) use **zones**: public → reception → operations → security → high-security. The public reaches staff areas only through a reception zone.
- The **secure line** (where the locked perimeter sits) is a design choice: at the lot line (a fence around everything, as at VAN3), at the building wall, or pulled tight around the data hall so public uses can face the street. No rule fixes where it goes.
- No code or emergency agency requires a public space (e.g. a refuge) to stay reachable when the data centre is locked down (searched, not found). That's a design problem, not a rule.

## Perimeter: fence, gate, barriers
- **Fence height:** RCMP Security Fencing Considerations Guide GCPSG-009 (2022, guidance): fences 2 m or lower "should not be referred to as security fencing"; minimum **2.4 m**; high-security sites consider **3.6 m**; anti-climb welded or small-mesh (13–19 mm) or vertical slats; clear zones either side so the fence can be seen.
- **Insurers disagree on fence type:** FM Global 9-1 (insurer): heavy metal bar fence or concrete wall around plant and tanks, **no chain-link**; FM 9-16: about 2 m with barbed wire (written for warehouses and factories, not data centres).
- **Zoning collides with security:** Vancouver caps fences in required yards at **1.9 m** (rule), below the RCMP minimum. A taller fence needs approval, a spot behind the yard line, or the building wall becomes the line. Edmonton has no height cap for non-residential fences; fences sit behind a 3–6 m planted setback (our reading).
- **Uptime Institute** (the Tier III/IV body): "The Tier Classification System does not prescribe security provisions"; reinforced perimeter fencing is best practice "regardless of Tier" (industry body).
- **Crash ratings:** ASTM F2656 M-ratings replaced the old K-ratings: M30 (K4) 48 km/h, M40 (K8) 64 km/h, M50 (K12) 80 km/h, a 6,800 kg truck; P-ratings say how far the truck gets past the barrier (P1 under 1 m, up to P4 over 30 m) (RCMP GCPSG-009 summarising ASTM, guidance). Barriers need that run-out space behind them. Extra standoff zones only where a threat assessment calls for them (RCMP blast guide).
- **Vehicle gate:** FM 9-1: one-lane sliding gate (insurer). Vancouver wants a stopped vehicle fully on the lot before the gate (rule); with its design trucks that's roughly 17 m in from the street (our arithmetic ?). Edmonton's access guide (2023, guidance): place the gate so the largest truck queues fully on site; truck driveways 11.5–13.5 m wide.
- **Fences can't block airflow:** NFPA 855 (US standard): security barriers and fences must not block air to or exhaust from battery systems.

## Entrances and the loading dock
- Separate **public, staff and truck/fuel** entrances; FM 9-1 asks separate visitor and staff entrances (insurer).
- RCMP guides: loading docks away from, and not linked to, server areas (guidance). Whether the dock sits inside or outside the secure line: no source says (our reading: inside).
- A locked-off secure part still needs its own entrance within 45 m of the fire truck (National Building Code 3.2.5.5, rule).
- Air intakes 7.5 m from a truck dock (ASHRAE 62.1, US standard); a fuel truck parked over an hour 15 m from buildings (National Fire Code, rule).

## Doors, portals, biometrics
- **The glass tube (security portal):** single-person booths. Boon Edam Circlelock Solo ~1.0 × 1.0 m, 2.2 m tall, 5–6 people a minute; Gunnebo HiSec 1.05–1.8 m square, the 1.8 m model fits a wheelchair; both offer weighing floors, Gunnebo also senses volume (maker claims). Which one VAN3 has: ?
- A portal is **not an exit** (our reading of the National Building Code): each needs a swing door beside it, as at VAN3, and an 850 mm accessible door at each layer.
- **Biometric and card locks on exit routes** must release on fire alarm, on power loss, and within 15 s of pushing the door (National Building Code 3.4.6.16, rule). Vancouver also wants a written sequence of operation. This limits how sealed a secure line can be in a fire.
- FM 9-1 says no locks that need power (insurer) — it yields to the code on exit doors.
- **Privacy:** federal guidance on biometrics asks for consent and another way in for people who decline (guidance; data rule, not architecture).
- **Access rules in the standards:** NFPA 75 (US): access to the IT area "restricted to authorized persons"; only IT and support equipment in the IT room. NFPA 855: battery rooms locked but reachable by firefighters.

## Guards and the control room
- 24/7 on-site guards: claimed by Cologix, Equinix, eStruxture, Digital Realty (operator). **No rule requires guards**; RCMP: by threat and risk assessment.
- Guard room at the entry, in the reception zone (RCMP); VAN3: guard in a closed room behind bullet-resistant glass with an ID slot (operator/tour). No source gives its size.
- Staff washroom: up to 10 staff per washroom under the code's industrial table (Vancouver up to 25) (rule). Break room: practice only.

## Cameras, lighting, detection
- RCMP (guidance): cameras on rooftops, light poles, ceiling corners; **face identification at every portal**; a fence needs intrusion sensors too — cameras alone aren't detection.
- Lighting for cameras at least **20 lux**; the fence line lit to 20 lux from 3 m inside to 9 m outside, with little spill onto neighbours (RCMP).
- FM 5-32 (insurer, Jan 2026): an FM Approved intrusion alarm where data rooms have emergency doors leading outside the secure area. FM 9-1 wants cameras covering neighbouring property.
- **Privacy clash:** the 2008 federal/BC/Alberta video-surveillance guidelines say avoid filming passers-by and don't record beyond the premises (guidance). So a fence on the street line, lit and filmed, ends up filming the sidewalk. A fence set back, with public uses in front, is better on both counts (our reading). Camera spacing and pixel targets: IEC 62676-4 (paywalled).

## Walls, glass, and what you can see
- FM 5-32 (insurer): 1 h walls round each data room; 2 h between data rooms; ¾ h doors; minimize interior windows and doors to the data room. The tool assumes **2 h** (operator and insurer practice, J.B.); NFPA 75's minimum is 1 h.
- OP Insurance (Finland, insurer): an unmanned data hall as a windowless room in the middle of the building.
- RCMP standard for secure-room walls: slab-to-slab steel stud with steel mesh or sheet (guidance).
- The building code has **no forced-entry or ballistic rule** (searched, not found). Bullet-resistant glass is operator and insurer practice (J.B.; VAN3 guard room).
- A **viewing window into the hall:** NFPA 75 allows it only as a fire-rated window or with a shutter that closes on smoke or fire. In a 2 h wall that means a tested 1.5 h window. One maker (Pilkington Pyrostop BR) claims glass that is both fire-rated (to 120 min) and bullet-resistant (UL 752 Level 3), 27–62 mm thick, 63–126 kg/m² (maker claim); its Canadian 90-min listing: ?. RCMP's server-viewing window is from a staff control room, not for the public. No Canadian public-viewing precedent found.
- FM 5-32: air system of the data hall separate from other spaces and kept at positive pressure to them (keeps dust and smoke out).

## Where security meets the public program (design consequences)
- **Heat crossing the line:** district energy uses an energy transfer room on an outside wall with the utility's own key (Vancouver NEU: min 6 × 3 m; Blatchford: 12–55 m², 2 h, card reader) (guidance). A hand-over room on the secure line with one door from each side is our design proposal — no source for a room straddling a secure line.
- **Refuge placement:** own building, side by side, or under the hall — all allowed, each with different fire separation and earthquake consequences. Vancouver allows one principal building per site, so a separate refuge building is harder there (rule).
- **A public roof** needs its own stair with no doors onto secure floors, because stair doors onto secure floors must unlock on fire alarm (our reading of the code).

## Sources to cite
RCMP GCPSG-009 Security Fencing Considerations Guide (2022) and the GCPSG zone guides · Uptime Institute "Tier Myths and Misconceptions" · FM Global Data Sheets 5-32 (Jan 2026), 9-1, 9-16 · NFPA 75 (2024), NFPA 855 (2026) · ASTM F2656 (via RCMP) · National Building Code of Canada 2020 3.2.5, 3.4.6.16 · Vancouver Zoning and Development By-law (fence height, s. 10) · City of Edmonton Access Management Guidelines COE-IM-GUIDE-0023 (2023) · Office of the Privacy Commissioner video-surveillance guidelines (2008) and biometrics guidance · Boon Edam, Gunnebo, Pilkington product data (maker claims) · J.B.'s Cologix VAN3 tour, Oct 2026.
