# Architecture mode: decisions so far (30 Oct 2026, J.B. with Claude)

Fourth template. Full becomes Engineering. Opportunity triage: checks/opportunity_triage_2026-10-30.md.

## How it works
- Pick programs. Each starts at a sourced typical size.
- The tool lays them out by rules (adjacency matrix: must be near / prefer near / keep apart; hard rules vs soft preferences).
- Resize any program; unlocked programs share the change. Locks per program; the data centre's MW locked by default.
- Programs with set sizes (pool lanes, refuge capacity) move in steps.
- Hard floor at a sourced minimum and a ceiling at what lot, zoning and heat allow; the tool says which limit stops a change. No source for a minimum: "?" and ask J.B.
- Delete a program to make room.
- Two budgets: space (lot, zoning floor area, roof) and heat (after the data centre's own use).
- Live, side by side, no total score: energy, shared systems (heat, heat pump, generator power on its own lot, stored water and rain, roof solar), cost and savings, rules pass/fail, people served.
- First version: the tool places by rules. Generating several arrangements, each best at one goal (Pareto), comes later if time allows. "Best" is never one score.

## Site
- Adjacent lots can be selected and merged (consolidation; Vancouver Subdivision By-law 5208 s. 2.2; Edmonton process ? ).
- Guardrails: touching lots only (or across a lane); what is there now shown as a burden (homes or businesses lost, demolition carbon), never netted; mixed zoning checked per part or flagged as rezoning; land cost from assessed values where available, else ?; limit about one block.

## Scope agreed (Claude's sort, J.B. agreed)
- Core: allowed programs by zoning; secure line and edges; heat cascade and seasons; fit test with spatial rules; social fit; options side by side.
- Light (rule or label): section stacking rules; fire separations flagged; equinox shadow and a warm-air zone; refuge event mode only; ownership labels.
- Not tool features: expression of the infrastructure (J.B.'s design call); growth phasing beyond meanwhile uses.

## Decided (J.B.: "as suggested")
- Programs can sit inside the data centre building and as separate masses on the lot.
- Test sites first: 339 1st Ave E and 74/64 Airport Rd NW, then any lot in either city.
- Heat shown at peak and over the year.
- Residents and community see a plain summary (e.g. "this site could hold a refuge and a pool, using about X% of the heat").
- First version programs: refuge, pool, greenhouse, laundry, public ground floor, roof and facade solar.

## Backlog: programs to add after the first version (J.B.: "don't forget the rest")
From the triage: fish farming; bathhouse or Nordic spa; drying (food, lumber, sludge); heated public space (winter garden, atrium, covered plaza, shelter); EV charging hub; housing (tested case); river or inlet cooling (waterfront lots); borefield; rain tank; meanwhile uses.
J.B.'s new ideas: hospital; aquarium.
Claude's suggestions (unresearched, J.B. to confirm): botanical conservatory or tropical house; indoor recreation or climbing gym; therapy or rehab pool; community or commercial kitchen; covered winter market; care home or seniors' housing (tested case, as housing); neighbourhood heat plant room (the start of a network).

## Secure line (1 Nov 2026, J.B.)
- A design choice, not fixed: the user sets it (lot line, building wall, hall wall, or drawn anywhere between); the tool tests the consequences.
- **Starting line suggested by the tool** (J.B.: "suggested starting line is fine"): the tightest line that keeps every required room inside (data hall, battery/UPS/electrical rooms, generators and fuel, loading dock), with firefighter access to the battery room. The user then moves it.
- Checks on any line: required rooms inside; public programs (refuge, public ground floor, café, pool entrance) outside or flagged; each shared system crossing the line flagged (meters, valves, keys); entrances (public, staff, truck; dock 7.5 m from intakes; parked fuel truck 15 m from buildings); a fence is 2.4 m anti-climb mesh and may not block battery or plant airflow (NFPA 855 4.7.7.2); emergency mode: can the refuge open while the data centre stays locked.
- Shown side by side, not judged: street frontage to public use, controlled doors from street to servers, share of the lot the public can reach.
- Replaces the removed Off/Today/Proposed toggle in Architecture mode; Engineering keeps the single fence on/off.

## Heat hand-over across the secure line (research 1 Nov 2026: checks/research_arch_v1/handover.md, check 1 only)
- District energy practice: an energy transfer station (ETS) room for the utility's equipment, on an outside wall, utility keyed access. Vancouver NEU: min 6 × 3 m (below 13,940 m² of floor), 6 × 4 m (to 23,230 m²), first basement, hand-over at the first valve on the building side. Blatchford: 12–55 m², ground floor or first parkade level, 2 h separation, utility owns heat pumps, exchanger and meter, card-reader door.
- Data-centre cases (TELUS Garden, BC regulator orders; Odense, claims): the utility or receiver owns the heat pump; no source says whether the utility enters the data centre.
- Meters: Measurement Canada-approved for billing (unapproved non-exempt meters out of use by 1 Jan 2028); no rule on meter location.
- No source for a room straddling a secure line. Tool proposal (our design, not a rule): a hand-over room on the line, one door from each side, sized at the NEU minimum (?) until a per-MW source is found.

## Refuge placement (1 Nov 2026, J.B.: "three options")
All three offered in Architecture mode, no default; each shows its consequences (research: checks/research_arch_v1/refuge_placement.md, check 1):
- **Own building on the lot:** spacing between buildings or a 4 h firewall if joined; overnight sleeping allowed; keeps its own seismic category.
- **Side by side in the data centre's building:** 2 h wall; overnight sleeping limited by the one-residential-suite rule in an F-2 building; shared structure takes the higher seismic category unless split.
- **Ground floor under the hall:** 2 h floor; same overnight limit; whole building takes the refuge's seismic category; best fit with Vancouver's no-data-storage-at-grade rule.
- All: generator power legal on the owner's own lot (owner or tenant); code needs only 30 min emergency lighting, so heat, cooling and filtered air in a blackout are design choices; Edmonton allows the refuge only in BE (≤500 m²); no rule keeps the refuge reachable when the host is locked: the tool flags it.

## Glazing (1 Nov 2026)
- J.B.: bullet-resistant glass is used, per operators and insurers (her statement; VAN3 tour: the guard's room behind 'bullet proof glass', her words). Recorded as operator practice (claim), not a code rule.
- Open (?): whether any one glazing product is both bullet-resistant (e.g. UL 752 levels, paywalled) and fire-rated (1.5 h in a 2 h wall). Research needed before a viewing window into the hall is offered.
- J.B. (1 Nov 2026): biometric access control is used (VAN3 tour: the guide used a door with 'biometrics AND a scanner'; a single-person portal 'weighed me and measured me'). Operator practice (claim). Architectural effects to research: portal/mantrap footprints at each layer, a security control room, and the code limit that locked doors on an exit path must still release (NBC 3.4.6.16, electromagnetic locks).

## Access control, cameras, guard room, glazing (research 1 Nov 2026: access_control.md, check 1)
- Security portal (the VAN3 'glass tube'): maker claims, Boon Edam Circlelock Solo 1000 × 2200 mm, 5–6 people a minute; Gunnebo HiSec 1050–1800 mm square (1800 mm is the wheelchair model); both offer weighing floors, Gunnebo volume sensing. Not an exit (our reading of NBC 3.4.6.15): a swing door beside each portal, 850 mm accessible door at each layer.
- Locked exit doors (NBC/BCBC/NBC(AE) 3.4.6.16): maglocks release on fire alarm and power loss, and within 15 s of pushing; Vancouver adds a push-button option and a written sequence of operation.
- Biometrics: federal privacy guidance asks consent and another way in for those who decline (data rule, not architecture).
- Cameras: 2008 federal/BC/Alberta guidelines: avoid passers-by, don't record beyond the premises; the owner's plaza with signs and narrow views, not the street (our reading).
- Guard room: in the reception zone at the entry (RCMP zone guides); no source for its size, glazing level or document slot.
- Glazing: Pilkington Pyrostop BR claims fire ratings to 120 min with Canadian tests and bullet resistance to UL 752 Level 3; 27–62 mm, 63–126 kg/m² (maker claims); whether the Canadian listing covers 90 min not confirmed (?).

## Cameras, insurers, exterior (research 1 Nov 2026: security_more.md, check 1)
- Cameras (RCMP): on rooftops, light poles, ceiling corners; face-identification at every portal; a fence needs intrusion sensors, cameras alone are not detection; camera areas lit to at least 20 lux; fence line lit to 20 lux from 3 m inside to 9 m outside, little spill. Clash: a fence on the street line lights and films the sidewalk, which privacy guidance says to avoid. Spacing and pixel targets: IEC 62676-4 (paywalled).
- FM 5-32 2.8.9: FM Approved Level 1 intrusion alarm where data rooms have emergency doors exiting outside the secure area.
- Insurers: FM 1-15 caps roof PV arrays at 46 × 46 m with 1.2 m aisles; facade PV to FM 1-57 (not read); FM's 2025 tests: fire reached the top of the wall on 3 of 4 double-glass facade PV systems (insurer test data). OP Insurance (Finland): an unmanned data hall as a windowless room in the middle of the building (insurer guidance). No insurer source on public uses next to a data hall.
- Exterior: combustible cladding incl. facade PV needs a sprinklered building (or ≤3 storeys) and a CAN/ULC-S134 full-wall test (NBC/BCBC/VBBL/NBC(AE) 3.1.5.5); RCMP G13-02 slab-to-slab steel-stud wall with steel mesh or sheet for the hall; no forced-entry or ballistic rule in the building code.
- FM sheets J.B. to download (fm.com refused): 9-1, 9-16, 1-20, 1-3, 1-57 (and 5-23, 5-28, 13-26, 7-88, 1-40 from before).

## Guards, perimeter, vehicle entry (research 1 Nov 2026: security_perimeter.md, check 1)
- Guards: 24/7 on-site staff is operator practice (four operators' claims); no rule requires guards (RCMP: by threat and risk assessment). Staff washroom: industrial table, up to 10 staff per washroom with a sink (VBBL up to 25); BC toilet within 60 m of each post (federal summary, ?). Break room: RCMP practice only.
- Fence height: Vancouver caps fences in required yards at 1.9 m (below the RCMP 2.4 m minimum): a taller fence needs Director of Planning approval, a spot behind the yard line, or the building wall as the line. Edmonton: no non-residential cap; fence behind a 3–6 m planted setback (our reading).
- Crash ratings: barrier run-out drawn by rating: P1 under 1 m, P2 up to 7 m.
- Gate: Vancouver wants a stopped vehicle fully on the lot before the gate; design trucks SU-9 and WB-17, so the gate sits about 17 m+ in (our arithmetic, ?).

## Servicing and social fit (research 1 Nov 2026: servicing_social.md, check 1)
- Pool (Alberta, NBC(AE) 7.2.3.38/.45, STANDATA 19-BCI-008): plant room with an outside door; chlorine-gas room at grade, outward door to outside, no door into the building: the pool's plant side faces a yard or lane. BC: not found yet.
- Garbage (Vancouver): at grade beside the truck stop, 4.5 m clear, truck in and out forwards; ≈14 m² for a 150 m² café (our arithmetic, Metro Vancouver model). Edmonton commercial waste: private haulers.
- Refuge drop-off: Vancouver passenger space 4.0 m wide, 3.5 m clear; no ambulance-bay rule.
- Fire access: principal entrance 3–15 m from the fire route, 45 m hose distance (NBC 3.2.5).
- Social fit: refuge by heat-dome risk groups (BC coroner 2022: 619 deaths, 67 % aged 70+, 56 % lived alone, 98 % indoors at home; distance a barrier, no walking standard); pool catchments 2/3/4 km (VanSplash), indoor recreation within 5 km (Edmonton); laundromat and greenhouse only stand-in indicators (renters, low income, seniors), unsourced. Data lacking: living alone, deprivation index, homelessness counts, food stores, Vancouver pool locations.

## From J.B.'s uploads (2 Nov 2026: uploads_2026_11_02.md, check 1)
- Vancouver 10.34.1: one principal building per site; a separate refuge or generator building only as an accessory building, if the district allows, or by rezoning. 10.21.1: each principal building and separate use has its main entrance from a street. Schedule C still not obtained.
- FM 5-23: generators outside important buildings first; inside, a 1 h room on an outside wall reachable by firefighters; switchgear its own 1 h room. Conflict: FM 5-23 allows a 3 h basement vault, FM 5-32 says never in a basement.
- FM 7-88: diked fuel tanks 7.5 m from a noncombustible building; listed double-walled 1.5 m; a fuel truck unloading without containment 23 m.
- FM 5-28: UPS battery rooms with HVAC separate from the hall, above the flood level; lithium-ion is in FM 5-33 (to get). Conflict: FM 1 h vs NFPA 855 2 h (tool keeps 2 h, the stricter).
- FM 1-20 (Apr 2025): distances moved to FM 1-42 (to get); dumpsters 9 m from buildings.
- FM 1-57: facade PV must be an FM Approved system; glass-glass panels count as combustible.
- FM 1-40: 339 1st Ave E fails FM's site test (29 % in the floodplain); its 500-year level vs Vancouver's 4.6 m FCL not compared yet.
- FM 9-1: heavy metal bar fence or concrete wall, no chain-link, around plant and tanks; one-lane sliding vehicle gate; separate visitor and staff entrances. Conflicts: no power-dependent locks (vs code maglocks on exits); cameras on neighbouring property (vs privacy guidance); fence 2 m with barbed wire (FM 9-16) vs RCMP 2.4 m vs Vancouver 1.9 m cap.
- FM 13-26: not for emergency generators. BC Fire Code 2024: no changes for tanks, batteries, generators or pools.
- Edmonton access guide (COE-IM-GUIDE-0023, 2023): driveway 11.5–13.5 m two-way for large trucks; a security gate set so the largest design vehicle queues fully on site; throat 15 m (arterial) for light industrial under 1 ha.

## Graphics and use (2 Nov 2026, J.B.)
- Main drawing: 3D massing (J.B.: "the 3d i think"). Plan and section as toggles (proposed, not yet confirmed).
- Refuge is one of the programs in the pick list, not a separate step (J.B.). Its three placements (own building, side by side, under the hall) sit on its row once picked (proposed).
- Proposed, awaiting J.B.: four steps (Site, Programs, Arrange, Compare); space and heat budget bars split by program; broken rules drawn red in the 3D, passing rules quiet; greys with red for the selected program, labels with right-angled leaders; heat lines from hall to program, thickness by heat share; secure line dashed.
- J.B. (2 Nov 2026): likes Claude's suggested programs (now confirmed); wants research for the whole backlog and all of it moved into the first version.
- J.B. (2 Nov 2026): hospital cut. River/inlet cooling, borefield and rain tank to be systems feeding the budgets (proposed); meanwhile uses a label.
- J.B. (2 Nov 2026): outpatient clinic added in place of hospital ("clinic is better").
- J.B. (2 Nov 2026) on the added programs: housing dropped; overnight vs day-only shelter is a design move (user picks, tool shows consequences: overnight = Group C, separate building); sludge drying dropped; conservatory, aquarium and fish farm kept in Vancouver too (flagged as needing rezoning); fish farm warm vs cold species: research first.
- J.B. (2 Nov 2026): fish farm warm species only (tilapia or barramundi); cold species dropped (adds cooling load, no exchange). BC: flag the new-species review (Introductions and Transfers Committee).
- J.B. (2 Nov 2026): what happens to the fish after harvest (processing, selling, food security) is out of scope.
- J.B. (2 Nov 2026): seniors' programs dropped (assisted living and care home).
- J.B. (2 Nov 2026): secure line starts with presets only (lot line, building wall, hall wall, from the tool's suggested line); draw-your-own later.
- J.B. (2 Nov 2026): yes to the graphics proposal (plan/section toggles, budget bars, red rule flags, greys + red selected, right-angled leaders, heat lines, dashed secure line) and to check 3 on the new research. Plans: one per storey (storey picker); sections likewise can be several. Simple massing throughout. References sent: exploded axonometric zoning diagram (floors pulled apart, dashed drop lines, legend off the drawing), program bubble diagram, stacked axon with flow arrows and storey heights.
- J.B.: ignore the reference colours; they show the massing idea only (palette stays greys + red).
- J.B. (2 Nov 2026): no heat arrows on the massing. Instead a heat view: (a) a heat gradient laid over plan and section showing direction; (b) a mode that shows only direction and amount.
- J.B. (2 Nov 2026): heat gradient uses a separate warm-to-cool scale, used only in the heat view.
- J.B. (2 Nov 2026): winter market dropped. Winter garden kept; gym kept (16 °C benchmark label); climbing gym folded into gym.
- J.B. (2 Nov 2026): the four defaults stand (roof generators flagged; no public viewing window; own stair for public roof programs; F-2). Paywalled sources coming from J.B. 3 Nov.
- J.B. (2 Nov 2026): everything must follow the code; limits block, never just warn (height, floor-space ratio, BE caps).
- J.B. (2 Nov 2026): every program's massing must be a working whole (main space + support spaces: mechanical, washrooms, change rooms, storage, staff, circulation), each part rooted in research (a general overview, less deep than the data centre) and stated in the panel and the report. Research this and the limits on rezoning before the code-blocking build.
- J.B. (2 Nov 2026): hard rules block everywhere in the tool (audit: checks/agents/2026-11-02_code_audit_*.md); rezonings and conditional uses stay as chosen options. Noise block rule proposed (block when the quieter units exceed, flag when only standard do): awaiting J.B.
- J.B. (2 Nov 2026): noise rule: block a size when even the quieter units exceed the by-law limit at a receiver; flag (not block) when only the standard units do.
- J.B. (2 Nov 2026): in Architecture mode only, the data centre is broken into its own massing items, one per space it needs (hall per floor, electrical/UPS, battery, MV switchgear, telecom entrance and meet-me, fire suppression, storage and staging, shipping and receiving, security control and guard room, portals, offices, break room, staff washrooms, plant: chillers or dry coolers, generators and fuel, transformers, heat-recovery room), each sized, separated and placed by rules. Other templates keep the current model.
- J.B. (2 Nov 2026): equipment display toggles: hidden-line vs wireframe; equipment as massing vs physical equipment.
- J.B. (2 Nov 2026, correction): the data-centre breakdown into its own massing items applies in EVERY template, not only Architecture mode (replaces the single-source 48–72 % hall share). Equipment toggles (hidden-line vs wireframe; massing vs physical equipment) in every template too.
- J.B. (2 Nov 2026): resident template redesigned. No site selecting. Residents only see data centres that exist, are proposed or are under construction on the map. Click one: a visual, diagrammed, almost video-like explanation from its operator claims (labelled) — how it sits in the city, who it serves, equipment type, how it works; a 3D, Blender-style model with animations of the processes (power in, cooling, heat out, water, backup) and effects (noise, heat, etc.).
- J.B. (2 Nov 2026): resident animations are pre-rendered, recreated videos of how the process works in a GENERIC data centre, in three archetypes: a data centre in a tower, a smaller urban facility, a bigger urban facility (with a security perimeter; her words "bigger urban security", Claude's reading). Each real data centre on the map links to its archetype. Map covers the whole metro regions (Metro Vancouver; Edmonton region).
- J.B. (2 Nov 2026): Architecture mode does not include the Exchanges steps; they stay in Engineering. (Arrange keeps its own heat budget.)
- J.B. (2 Nov 2026, clarified): Architecture mode includes the MIXED-PROGRAM exchange (between the data centre and the programs on its own site); Engineering mode is about the greater URBAN exchange (neighbours, networks, the city). The 15139b3 skip removes the urban Exchanges steps from Architecture; an on-site exchange step replaces them.
- J.B. (2 Nov 2026): Architecture mode starts by setting site ratios: first how much of the site to build on, then the split of program (e.g. 1/3 data centre, 2/3 pool); the massing, heat, layout and rules follow from those ratios.
- J.B. (2 Nov 2026): the ratio splits FLOOR AREA (all storeys), not footprint.
- J.B. (2 Nov 2026): the community/municipal template is to be revamped: no design; regulatory overviews instead (proposal pending).
- J.B. (2 Nov 2026): municipal template plan agreed (one city first, comparison last): Claude Doc https://claude.ai/artifact/9WuA4zPVKKKe1SuhcpvoXr
- J.B. (2 Nov 2026): yes to the bug sweep and a check round for the ~260 under-checked sources, before the Architecture rebuild.
- J.B. (2 Nov 2026): make the whole INTERFACE white, crisp and clean, like her white Blender section models (white walls, soft grey shading, black section poke, hairline type, grey zone bands). Replaces the 30 Oct "dark again" choice.
- J.B. (2 Nov 2026): white only (no dark option).
- J.B. (3 Nov 2026): do whichever order gives the best build with the fewest bugs: lean refactor first (constants and tables out of code, every displayed figure wired to its register entry with a failing test), then the builds.

## White interface (J.B., 3 Nov 2026)
- White look approved; keep it quiet (greys, one red for selected or flagged only).
- Drawing is zoomable. Labels sit on shared rows above and below the drawing; leader elbows share one line; labels keep screen size as you zoom and hide once zoomed in too close.
- Labels on/off toggle beside the view buttons.
- If the leaders can't do all of that, switch to numbers keyed to a list.

## Decisions (J.B., 3 Nov 2026)
- Golden re-baselined to today's results (1080fab).
- Noise screen vs EVAPCO layout rule: screen allowed (by-law is the hard rule; EVAPCO is maker advice). Conflict flagged on screen; how to keep air reaching the units (e.g. gap at the screen base) is "?" until sourced.
- Trane RTAF low-noise units: allowed, labelled maker claim; footprint "?".
- People step in Architecture: yes, context only, no scoring, just before Arrange; includes who is near and the sight-line view.

## Flow (J.B., 3 Nov 2026; wireframes in the Design artifact "Beyond Data white interface")
- Steps: Site, People, Design, Report. Design tabs: Ratios, Arrange, Exchange, Compare.
- Ratios is its own tab before Arrange (coverage, then floor-area split; DC share sets MW). Arrange shows the split as one line with "Edit ratios".
- Compare is its own tab; the Report shows the chosen arrangement plus a short table of the others.
- Build order: Ratios, Arrange with DC rooms, Exchange, Compare, Report.

## Edmonton site (J.B., 3 Nov 2026)
- Edmonton design site is 64 Airport Road NW (E06B) only. 74 Airport Road NW (E06A) is dropped as a site: building there would block the hotel's view.
- E06A stays in the test lots (golden, arch baseline) as a check case only; mockups and design work move to 64 Airport Rd.

## Decisions (J.B., 3 Nov 2026, after hall fix 7e3fa46)
- Programs list: side list inside the Arrange tab.
- Arrange tests the low end of the Ratios MW range by default, with a switch to the high end.
- Transformer counted in the Ratios split once sourced; heat recovery and ETS only when an exchange is chosen.
- Coverage limits: source them from the by-laws (I-3, BE, others); "?" until then.
- 74 Airport Rd (E06A) kept as a hidden test lot.
- View check for 64 Airport Rd: the Comfort Inn's view (People step, sight line).
- Climbing wall kept (EN 12572-3 received).

## Typology library (J.B., 3 Nov 2026) — proposed direction, not yet approved in detail
- Architecture mode moves from free arranging to prebuilt program-sharing typologies: tested combinations with set adjacencies and size ratios, applied to any lot and adjusted to it. Less room for error; also a library showing people the options.
- Build 2 (BUILD2_BRIEF) on hold for its Arrange parts (4, 5) until the typology plan is agreed; register, zones and lot-side parts still stand.
- Mockup issues J.B. raised: programs read as separate buildings; chillers float above the hall roof (mockup drawing error); DC support rooms listed but not drawn.

## Templates (J.B., 3 Nov 2026)
- Four templates only: Resident, Municipal, Engineering, Architecture. Community is dropped (tier id `community` to be removed from tiers.js, flow.js SKIP, templates.json and the register's tier tags; anything only it showed goes to Resident or Engineering).
- Each template has its own report type, same white look, header and source style.

## Reports per template (J.B., 3 Nov 2026; boards in the Design artifact)
- Resident: select a data centre on the map, export a report with everything known about that one facility. Generic graphics by type: stand-alone, hyperscale, tower. Map with its location, still frames from the "how it works" video, plain answers on noise, heat, water, power. Board: VAN3 Cologix (2 pages).
- Municipal: select a parcel, get its regulations; two-city comparison on the last page. Board: 339 1st Ave E (I-3) + comparison.
- Open: how the three types map to the inventory's earlier types (tower; smaller urban; larger urban with secure perimeter).

## Facility figures (J.B., 4 Nov 2026)
- Report one number per figure. Where a spec sheet exists, its figure is the one shown; other operator figures stay in the register as conflicts, not shown.
- Applied: eStruxture VAN-3 10 MW and single 25 kV entrance; Qu EDM1 2.5 MW; Cologix VAN1 400 kW, VAN3 3 MW, VAN5 1 MW (sheets). TransLink bylaw adopted 8 Feb 2021; Meta federal review IAAC 90123 (records, not conflicts).
- eStruxture VAN-3 status: operating (J.B., 4 Nov 2026; matches the operator index page).
- M3 (111 E 5th Ave): 8,305 m² above grade, the City draft by-law figure (J.B., 4 Nov 2026); below grade ?.
- TELUS Garden data centre: kept (BCUC orders), placed "next to TELUS Garden, address ?"; find the address in City permits (J.B., 4 Nov 2026).
- SFU Cedar: PUE 1.07 (SFU and BC Hydro), J.B. 4 Nov 2026; the engineer's 1.097 design target kept as a conflict.
- Qu EDM2: 3 MW (Tier III, operator sheet), whole site; phases ≈2 MW + 1 MW from N+1 generators (our arithmetic). J.B. 4 Nov 2026.
- Wolfpaw: EDM1 10060 Jasper Ave; EDM2 10200 102 Ave NW; EDM3 17204 114 Ave NW (J.B. 4 Nov 2026, from a search summary citing Data Center Map: directory lead, not a primary source). EDM2 and EDM3 share addresses with Qu EDM1 and Qu EDM2, so they are shown as Wolfpaw space inside those buildings, not new map points.
- Meta (Sturgeon County): 970 MW Phase 1 grid allocation shown; 1,800 MW full build-out noted; Meta's "1 GW" kept as its claim (J.B. 4 Nov 2026). All conflicts settled.

## Lot lines (J.B., 4 Nov 2026)
- Vancouver rear/side: keep "rear = opposite and furthest from the front" (our reading, labelled); no City enquiry.
- Neighbouring parcels with no zone on record: read their zone from the City zoning map instead of assuming the deepest yard.
- Vancouver double frontage: both street lines stay "unclear", flagged.
- 45° band for "opposite": used in both cities, labelled our reading (from Edmonton's 135° corner test).
- EETB/EETC: apply the street setback to flanking lines too.
- Municipal report lists each lot edge's class and yard.

## Typology answers (J.B., 4 Nov 2026)
- Q1: variants, not separate typologies. "Public front" = one typology with two variants: stacked (Plinth) and beside (Street row); the tool picks the one the zone allows, the user can switch where both pass.
- Q2: research floor-to-floor heights by program (code minimums, provincial facility guides, filed Canadian permit drawings); until sourced a program height is "?" and it is not stacked on the hall. Queued after the typology questions.
- Q3: each typology carries a default plant layout tested with its programs (chillers, generators, fuel); the tool fits it to the lot and falls back to the plant room or quieter units where noise requires. "The plant working is essential."
- Q4: BE 500 m² cap is a flagged option, not a block, where s. 3.18 allows a variance (discretionary, with mitigation): drawn with a red "needs a variance" note and listed under approvals needed. Changes the 2 Nov "cap blocks" rule for this case only.
- Q5: Heat hub (ETS + heat pumps, the hand-over room to a heat network) is an add-on toggle for any typology, not a typology; ties to the Engineering urban exchange. Other pairs only as tested combinations in the library, each with its own plant layout.
- Q6: the tool tests the ratio range with plant included (chillers, generators, noise); the report shows the geometric maximum as context ("floor area would allow X; plant limits it to Y").
- Q7: lumber drying and aquarium dropped (J.B. 4 Nov 2026). Outpatient clinic joins Public front (upper floor in Vancouver; BE variance flag in Edmonton). Conservatory, EV hub and covered plaza: being discussed.
- Q7 cont.: conservatory kept, research a lower biome height and smaller Canadian conservatories. EV hub goes on the public side (Public front), not Work yard. Covered plaza: rethink as a designed public space on the leftover public-front ground (not just paving); options heated public area or EV charging; climate question (Edmonton vs Vancouver) under discussion.
- Public edge (J.B. 4 Nov 2026): leftover public-front ground becomes designed public space, outside the secure line; user picks warm public ground (heated paths and seating, planting with soil warming, maybe a small warm shelter; not hardscape), EV charging (min ≈150 m²), or both. Edmonton: heat is the point (winter use). Vancouver: covered edge (rain shelter, shade and cooling in heat events). Replaces "covered plaza".

## Typology library v1 (J.B., 4 Nov 2026)
- Criteria for a strong typology: real heat use at a temperature the hall can supply; allowed (permitted/conditional) in data-centre zones of at least one city; sourced room sizes; plant works (noise, distances); clear public benefit.
- Nine typologies + two add-ons: 1 Emergency hub (refuge, warming shelter, clinic; stacked/beside variants); 2 Warm bath (spa, therapy pool); 3 Community pool (pool, gym, shared change rooms); 4 Aquaponics (greenhouse, fish farm); 5 Food hub (greenhouse, community kitchen); 6 Conservatory (low biome); 7 Heat cascade (spa → pool → greenhouse → public edge); 8 Twin (overnight shelter, own building); 9 Shelter + laundry. Add-ons: heat hub; public edge (warm ground / EV charging).
- Out for now (weak): work yard, winter garden, food drying alone.
- Next: research per typology, then build.
- Twin dropped (J.B. 4 Nov 2026: "makes things complicated"). Overnight shelter is out of the library; day-use warming room stays in Emergency hub. Library v1 is now 8 typologies + 2 add-ons.
- Aquaponics (J.B. 4 Nov 2026): commercial ratio 111 m² greenhouse per t/yr of fish; greenhouse sized by the lot, fish farm sized to match.
- Heat cascade order (J.B. 4 Nov 2026): the tool orders stages by sourced supply temperature, hottest first; pool vs greenhouse order "?" until the pool supply temperature is sourced.

## Schematic compliance per typology (J.B., 4 Nov 2026)
- Each typology is worked through as one building, schematically: floor plans per storey, a section, cores (stairs, elevators, shafts), corridors and shared lobbies, rated walls and floors, entrances, loading and service routes, the full data centre (hall + all support rooms) inside the secure line, and a compliance table with clause per item ("?" where no source).
- Method: one shared code checklist first (exits, travel distance, occupant load, fire separations, firewalls, spatial separation, accessibility, washrooms, mezzanines, sprinklers, service rooms, zoning envelope, plant distances, noise), then typology by typology; J.B. reviews each before the next. Start: Emergency hub on 64 Airport Rd NW and 339 1st Ave E.
- Mockup issue it answers: blocks read as separate buildings, in-between space undefined, grey = hall only.
- Program and conditions views (J.B. 4 Nov 2026, refs: Sol Marengo program plan; an atelier temperature plan/section): a plan and section view that draws the program (spaces as blocks, circulation, entrances, flows) and shows each space's needed conditions (temperature first; others to agree). Colour use in this view to agree with J.B.
- Emergency hub test fit done (testfit_emergency_hub.md; boards TestFit_EH_E06B, TestFit_EH_V339). E06B: 0 fail, 13 open. V339: 2 fails (fence over 1.9 m in required yards; refuge and generators at grade vs 4.6 m flood level, site grade ?). DC with all support rooms is 39 % (E06B) and 118 % (V339) bigger than the tool's split.
- Site grade, 339 1st Ave E (4 Nov 2026): from City LiDAR 2022 ground (class 2) points already processed on J.B.'s computer (lidar_out/492000_5457000.npz, 0.5 m cells; only the part of the parcel in this tile, ≈2,470 of ≈4,487 m²): ground 2.2–6.3 m, median 4.8 m, p10 3.5 m. Vertical datum of the City LAS vs the 4.6 m flood construction level's datum: not confirmed (?). Our arithmetic. Use the adjoining tile for the rest of the parcel.
- J.B.: travel distance 44.3 of 45 m is fine at schematic stage ("tight is fine").
- Fence (J.B. 4 Nov 2026): a fence is a design choice, not code. Fence height 1.9 m everywhere (meets Vancouver s. 10.10.3 in required yards); RCMP's 2.4 m shown as guidance only. Vancouver yard note dropped.
- Secure line varies (J.B. 4 Nov 2026): it may have no fence at all, e.g. the building wall or a line inside the building (hall and support rooms). Typologies carry the secure line as a choice; plant outside the building then needs its own enclosure (?).
- Test-fit drawing rules (J.B. 4 Nov 2026): every room is its own block, even within one program (group tint shared); circulation must actually connect: every room reaches the shared lobby and an exit by a path outside the secure line; travel distance measured along the real path. Clinic corridor strips on E06B were cut off (drawing error).
- Out of date (4 Nov 2026): TestFit_EH_E14715 and TestFit_EH_E4103 were drawn before the noise fix (fe3b989); bannered "OUT OF DATE" on the boards; to redraw. Rule (J.B.): never give out-of-date work without saying it is out of date.
