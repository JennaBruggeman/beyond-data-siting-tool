# Exchange sheets brief: sourced numbers and ideas (30 Oct 2026)

**How to read the marks**

- **[2]** means two independent reads agree (first and second check done).
- **[1]** means read once, by me or an earlier research pass; the second check is still open.
- **[tool]** means computed by the Beyond Data tool on 29–30 Oct, from register sources. The method is in the tool's "How it is worked out".
- **?** means not verified, or our own choice.

Site runs used the tool defaults: new building, air-cooled chillers on the roof, N+1 spares, generators in the yard. "Heat offered" assumes liquid cooling plus a heat pump.

---

## 0. Corrections to what you already have

1. **BC Call for Demand: heat recovery *is* scored.**
   - Bids are scored on: cost and benefits to BC Hydro 30 %; data sovereignty 30 %; community and economy 20 %; environment 10 % ("heat recovery ready", "power usage efficiency", "water usage efficiency", none of them defined); First Nations 10 %. Price is not a separate criterion. [2] (BC Hydro RFA, 1 Feb 2026, Sch. 3)
   - Curtailment is a pass/fail entry condition: at least 10 % of the load, 4 consecutive hours, 36 events and 144 h a year, on 24 h notice, without compensation. [2]
   - Size window is 10–145 MW. Allocation is 300 MW for AI plus 100 MW for storage data centres, over two years from 1 Feb 2026. [2]
   - The Call drew 15 applications for about 800 MW; results come after the government transition. [2] (BC Hydro page, printed 15 Oct 2026)
2. **Both your sites are below the thresholds.** Vancouver (3.8 MW) is under BC's 10 MW floor. Edmonton is far under Alberta's 75 MW "large data centre" line. The provincial allocation rules don't bind them; see §5.
3. **RS 2290:** the 2 MW AC cap is on *net injection to the grid*; the facility itself "can be any size". Credits come from surplus measured at the facility's meter. Facilities must be built no earlier than 1 Jul 2026. [2]
4. **AESO:** 2025 gas share is **76.8 %** (wind, solar, hydro 21.0 %), from the 2025 Annual Market Statistics. Use it rather than 2024's 74.7 %. [2]
5. **Bill 31 Royal Assent 27 Nov 2025:** I haven't seen this date in a primary source. ?
6. **Blatchford "building heat rejection already required":** not one I've read. ?

---

## 1. Policy, made explicit

### Alberta

| Topic | What it says | Source | Check |
|---|---|---|---|
| Who counts as a "large data centre" | 75 MW or more of maximum demand directly from the transmission system, or a lower threshold the AESO sets. Data centres on the same or adjacent parcels with the same owner can be aggregated (s. 2–3). It may be "tethered" to new generation or storage that covers its maximum demand, and tethered requests are processed first (s. 5–6). | Data Centre Regulation, Alta Reg 117/2026 | [1] |
| Interim limit | AESO Phase 1, 4 Jun 2025: an interim large-load connection limit of 1,200 MW. 15 projects (4,800 MW) qualified; 1,200 MW was assigned to 3 projects. Over 20,000 MW of data-centre load is on AESO's list. | AESO Data Centre Update, Sep 2025 | [1] |
| Bring your own generation | AESO Phase 2A proposal (26 Jun 2026, **not final**): loads of 75 MW and up; first intake gas-fired, "net new". Before its own plant runs, a load can bridge on grid power: at most 20/30/40 % of its request, 1,600 MW in total, up to 3 years, **fully interruptible**. Commitment fee $15k/MW. | AESO BYOG proposal | [1] |
| Legislation | Bill 8 received royal assent on 11 Dec 2025. It encourages data centres to "bring their own generation", and "Data centres (not Alberta ratepayers) will pay for any necessary transmission upgrades". | alberta.ca, Powering new pathways | [1] |
| Incentives | "Alberta's government is not providing subsidies or discounted government power contracts for data centres." | alberta.ca, Data centres in Alberta | [1] |
| Levy | Consulted Jul–Aug 2025 on a levy on computing equipment *or* on electricity, reduced by a "compute-in-kind" contribution. Final rate and base not read. Secondary sources report 2 % on hardware. ? | alberta.ca, levy engagement page | [1] |
| Heat | The AI Data Centre Strategy (Dec 2024) says Alberta "will explore innovative ways of capturing and utilizing the heat". This is an intention, not a rule. | GoA strategy | [1] |
| Selling heat | The AUC treats district-energy systems as public utilities under the Public Utilities Act. Municipally owned systems are outside Part 2 (s. 78(2)) unless a bylaw brings them in. A private heat seller needs AUC approval or a granted exemption; Calgary's downtown district energy got light, complaint-based regulation (AUC Decision 26717-D01-2022). | ABlawg (law-faculty commentary, secondary) | [1] ? read the decision itself |
| Selling power across a property line | Micro-generation: renewable, up to the lesser of 5 MW or the service rating. It supplies **only sites the customer owns or leases**; the unit may sit on adjacent land the customer owns or leases. **It cannot power a neighbour.** | AUC micro-generation guideline 2026, Reg s. 1(1)(h) | [2] |

### Edmonton

| Topic | What it says | Source | Check |
|---|---|---|---|
| Blatchford utility | City-owned. All buildings except net-zero-carbon ones must connect for heating, cooling and hot water. Sources: geoexchange, sewer heat, solar. LRT design is studying supplying and drawing heat with LRT utility complexes. | Blatchford Renewable Energy business plan 2021–24 | [2] |
| Blatchford bylaw | Bylaw 17943 bars reselling energy the City supplies (s. 10(1)). **No route for a customer to supply heat into the system**; its definitions cover heat delivered from it only. | Bylaw 17943 (consol. 1 Jan 2022) | [2] |
| Loop temperatures | Ambient loop supply 8 °C (winter) to 32 °C (summer); return 4 °C (winter); design ΔT 5 °C. | DESS design guide v8 (Jun 2025) | [1] |
| District Energy Strategy | An estimated 230,000 t CO₂ a year across all district-energy opportunity areas; no data-centre content found. | edmonton.ca district energy page | [1] |
| BE zone (Airport Rd) | Minor Industrial is permitted, Major is not, and the City treats a large data centre as Major. Result: **"smaller only"**, and the Development Planner decides. Height 16 m; floor area up to 1.6 × the lot. | Zoning Bylaw 20001, via the tool | [1] |
| BE allows a refuge | Community Service, which includes **shelters**, is permitted in BE (up to 500 m², except shelters). "District heating plants" are a Minor Utility use permitted in BE. | Bylaw 20001 s. 8.10 | [1] ? zone section not re-checked |
| Pending change | An application to the City's EETP to permit data centres in the Medium Industrial Precinct (feedback closed 25 Oct 2026). **A proposal, not current zoning.** | City data-centre page | [2] |

### BC and Vancouver

| Topic | What it says | Source | Check |
|---|---|---|---|
| Allocation | B.C. Reg. 8/2026 rules apply to requests of 10 MW or more. Under 10 MW is outside them, by our reading; no provision says so outright. ? | Reg. 8/2026 | [2] |
| Selling heat | Anyone supplying "light, heat, cold or power" to the public or a corporation for compensation is a public utility. Exclusions include municipalities within their boundaries and supplying only oneself, one's employees or tenants. | UCA s. 1 | [2] |
| Small heat systems | BCUC exempts "Micro TES" (capital cost below a threshold) from most of Part 3. The dollar value isn't in the order ?, and the TES Stream A/B guidelines weren't read. ? | BCUC G-46-25 | [2] |
| NEU connection | New buildings in the service area *must* use the NEU (s. 2.1); the only exemption is the City Engineer's opinion. The by-law has **no third-party supply route**. A building's own cooling-system heat recovery is allowed (s. 5.2(a)(v)), and there is a credit for heat returned (Sched. C). | By-law 9552 | [2] online copy consolidated to 2020; ? 2026 consolidation |
| NEU temperatures | Network at least 65 °C; building return at most 45 °C; the NEU does not provide cooling; waste heat from building cooling may be accepted for a bill credit. | NEU Connectivity Guidelines, Rev 1 (May 2026) | [1] |
| I-3 zone (339 1st Ave E) | "Bulk Data Storage" is a conditional use. Floor area up to 3.0 × the lot; height 18.3 m (30.5 m possible); ground floor 6.0 m floor-to-floor, **no data storage on the ground floor**. | I-3 district schedule, via the tool | [1] |
| Grid at this site | In the downtown supply area (to Nanaimo St), no new 12 kV feeder positions from fiscal 2027 until the West End substation (expected Jul 2032, not yet approved). | BC Hydro West End CPCN | [1] |

---

## 2. Tool numbers for both sites

The Edmonton run is lot 1 of 2 (74 Airport Rd, 4,563 m²). Lot 2 (64 Airport Rd, 4,274 m²) gives a similar upper size (3.2–10.2 MW).

| | Vancouver, 339 1st Ave E | Edmonton, 74 Airport Rd NW |
|---|---|---|
| Lot, zone | 4,467 m², I-3 (City parcel outline 4,487 m², table 4,454.9 ?) | 4,563 m², BE |
| **MW of servers that fit** | 1.0–3.9 MW (default 3.8) | 3.4–10.3 MW per lot, but the zone allows **smaller only** |
| Power at full load / average / year | 5.3–5.9 / 3.2–3.5 MW / 28–31 GWh | 14–16 / 8.6–9.5 MW / 75–83 GWh (at 10.2 MW) |
| Grid carbon | 18.1 g/kWh → 506–560 t CO₂e/yr | 346.1 g/kWh → 25,977–28,760 t CO₂e/yr |
| **Heat offered**, liquid cooling + heat pump | 12–22 GWh/yr, about 863–1,573 homes | 33–60 GWh/yr, about 1,175–2,141 homes |
| Heat-pump electricity | 2.7–7.5 GWh/yr → 50–136 t CO₂e | 7.4–20 GWh/yr → 2,545–6,958 t CO₂e |
| Seasonality | busiest to quietest month about 4.9 : 1 | about 5.0 : 1 |
| **Network** | Inside the NEU service area (tool trace; edge 182 m). Compulsory connection; network at least 65 °C, so a heat pump is needed. NEU runs mostly on sewage heat. | Inside the Blatchford area (tool outline approximate ?). Ambient loop 8–32 °C: liquid-cooled heat (35–40 °C) **fits in winter with no heat pump**; above 32 °C in summer. |
| What the heat is worth | $40/MWh (gas replaced); $17.8–25.3 left after heat-pump electricity. Cheapest single connection costs $57/MWh. NEU credit $32.59/MWh → $0.40–0.73 M/yr *if* the NEU took all of it. | $13/MWh (gas); −$3.6 to +$1.9 after heat-pump electricity. Cheapest single connection $36/MWh. Price only makes sense **without** a heat pump. |
| **Receivers within 3 km** | 989 buildings with known heat demand, plus 66 without. **None pays back at today's prices**; closest is a commercial building 1,530 m away, about 25 years. | 150 with known demand, plus 19 without; none pays back at today's prices. |
| Water | Air-cooled: **none evaporated**; 623 m³/yr rain on the roof | none evaporated; 748 m³/yr rain |
| Materials | 475 racks; 6,333 servers; **22–28 t/yr** retired; copper **76–152 t** | 1,275 racks; 17,000 servers; 60–75 t/yr; copper 204–408 t |
| **People nearby** (Census 2021; the 400 / 800 m rings are our choice ?) | 400 m: about 3,050 people, 9 % aged 65+. 800 m: about 14,700, 10 % 65+. Low income about 11 %. | 400 m: about 100 people. 800 m: about 1,160, 12 % 65+. **2021 census predates most of Blatchford.** |
| Nearest public rooms | Mount Pleasant community centre and library, 539 m; both are on the City's 2025 cooling-centre list. Detox centre (care home) 119 m. Non-market housing: The Aster (77 homes) 310 m, Mount Pleasant Lions Manor (36) 320 m. | Schools: Campbell College 187 m, Amiskwaciy Academy 196 m |
| **Substation** | Nearest about 570 m (1986); 3 within 2 km | Nearest about 620 m (1977); 2 within 2 km |
| Standby fuel, 12 h | 16,790–18,589 L | 45,068–49,896 L |
| Sound | 5 chillers, 110–113 dBA combined (rated) | 12 chillers, 114–117 dBA |
| Jobs | 3.3–11 (Virginia ratio, transferred; operator claim) | 8.8–29 |

---

## 3. Register figures for the sheets

| Figure | Value | Source | Check |
|---|---|---|---|
| Heat captured in liquid | direct-to-chip 48–75 % | LBNL 2014 | [1] |
| | 60–90 % | Schneider WP133, maker claim | [1] |
| | up to 94 % | Heydari 2024 | [1] |
| | air-cooled: no reliable figure ? | | |
| Liquid-cooled return temperature | measured 24 °C supply, **35–40 °C return**; 50–60 °C claims unverified ? | NREL ESIF | [1] |
| Air-side return | 25–47 °C | Oró et al. 2019; Yuan et al. 2025 | [1] |
| Heat-pump COP | tool range **3.0–4.5** | DEA 2026: 3.0–3.6 to 70 °C | [1] |
| | | Meta Odense: 4.5 in 2020, about 3.9 in 2022–24 | |
| Refuge capacity | 3.5 m² sleeping area per person | JIBC/PHAC | [2] |
| Refuge services | toilets 5 per 75–100 + 1 per 30 more; 1 shower per 50; water 126 L per person per day | JIBC/PHAC | [2] |
| Clean air | MERV 13+, recirculating | Health Canada 2020 | [2] |
| **Refuge cooling load** | **not sourced ?** (heat per person is in ASHRAE, paywalled) | | |
| Generator testing | about 14.5 h/yr per unit, about 4 h at full load | AUC 27938, derived ? | [1] |
| | Vancouver noise exemption: up to once a month for ≤60 min in daytime, plus once a year for ≤180 min, at ≤80 dBA | By-law 6555 s. 4.1(c) | [2] |
| Solar yield | Vancouver 892–1,007 kWh/kWp; Edmonton 944–1,244 | NRCan | [1] |
| | south wall: Vancouver 716, Edmonton 989 (an Edmonton wall beats a flat roof) | NRCan | [1] |
| Water | air-cooled or dry coolers: about 0 evaporated | | |
| | towers: up to about 1.5 L per kWh of heat rejected (our derivation from latent heat, not FEMP's figure) | | ? |
| | blowdown = E ÷ (cycles − 1) | | |
| Copper | 20–40 t/MW, only about 3 t/MW at rack level; data cabling now mostly fibre (VAN3 guide, claim) | CDA 2023, industry | [1] |
| E-waste | 21.2–26.3 kg per server, 6-year refresh | Dell | [1] |
| | large UPS batteries outside BC and Alberta consumer programs | | [1] |

---

## 4. Making each sheet explicit

Give every sheet the same strip: **what crosses → how much → to whom → when → under which rule → strong or small.**

| Sheet | The one claim | The number that proves it | Strip (Vancouver / Edmonton) |
|---|---|---|---|
| **Overview** | Same building, opposite grids: Vancouver's exchange is *institutional*, Edmonton's is *physical*. | Grid carbon 18.1 vs 346.1 g/kWh. Vancouver connection compulsory (By-law 9552 s. 2.1); Edmonton loop 8–32 °C. | |
| **Heat** | The surplus is large; what limits it is who can take it and the price, not the physics. | Vancouver 12–22 GWh/yr ≈ 863–1,573 homes, but $40 worth against $57 cheapest cost. Edmonton 33–60 GWh/yr, worth $13. | Water at 35–40 °C → 12–22 / 33–60 GWh → NEU / Blatchford → winter-heavy (about 5 : 1) → By-law 9552 credit / no supply-in route (?) → **strong in quantity, weak in price** |
| **Power** | It's about *when*, not *how much*. | BC Call: ≥10 % curtailment, 144 h/yr (but your site is under 10 MW). Feeder constraint F2027–2032. Alberta alert 13 Jan 2024: 100–200 MW dropped. | Load at the peak → a few MW for 4 h → BC Hydro / AESO → winter evenings → Demand Response for Business (voluntary) / AESO reserve ≥5 MW → **small but timely** |
| **Water** | Small if designed for it. | 0 m³ evaporated with dry or air cooling, against up to about 1.5 L per kWh of heat with towers ?. Rain on the roof: 623 / 748 m³/yr. | → **small; carrier, refuge storage, rain, snowmelt** |
| **Materials** | Slow: an afterlife story, not a daily flow. | 22–28 t of servers a year; 76–152 t of copper leaves only at refits or closure; the UPS battery gap. | → **small, long cycle** |
| **People / refuge** | The refuge needs little of the plant, but must reach people. | Heat dome: 98 % of the 619 deaths indoors, 56 % living alone (BC Coroners 2022). I-3 bars data storage on the ground floor; BE permits shelters. | Space, power, heat, clean air → 3.5 m² per person → neighbours (3,050 within 400 m in Vancouver, 9 % 65+) → heat dome, smoke, quake / −30 °C, grid alert → municipal emergency plan → **strong need; load not sourced ?** |

---

## 5. Where the reframe is wrong or missing

1. **"The province gives power" doesn't apply to your sites.** BC's allocation starts at 10 MW and Alberta's large-data-centre rules at 75 MW. At 1–4 MW (Vancouver) and a "smaller only" Edmonton site, your deal is with the **City**: conditional-use or development permit, the NEU or Blatchford agreement, a refuge in the emergency plan. Reframe it as "the **city** gives permission and connection".
2. **Edmonton heat only pencils out without a heat pump.**
   - Alberta gas makes heat worth about $13/MWh. A heat pump's electricity on a 346 g/kWh grid costs more than the heat is worth and adds 2,545–6,958 t CO₂e/yr.
   - The case rests on feeding the 8–32 °C loop **directly**, and in summer the heat goes to the roof.
   - The Blatchford bylaw has no route for an outside supplier. That's the policy gap your design asks the City to fill.
3. **Alberta wants data centres to bring gas generation.** The BYOG first intake is gas-only, there are no subsidies, and a levy is coming. Gas power with heat could feed Blatchford, but Blatchford's stated goal is 100 % renewable and carbon-neutral. That conflict is worth putting on the sheet.
4. **Vancouver's NEU is compulsory, and it already credits returned heat.** That's your strongest institutional hook. But there's no route for a third party to supply heat, and the NEU runs mostly on sewage heat at 65 °C or more, so the data centre competes with an existing source.
5. **A heat dome needs cooling, not heat.** The NEU doesn't provide cooling, and the data centre can't give cold without chillers. In a heat dome the refuge's value is spare cooling and power, not heat.
6. **Edmonton's people numbers are pre-Blatchford.** Census 2021 shows about 100 people within 400 m. The refuge's demand there is a future one; tie it to Blatchford's build-out.
7. **Absorb vs connect works.** One flag: a "clinic room" needs a health authority to staff and license it. ?
8. **Design anchors you can cite:** I-3 bars data storage on the ground floor; BE permits shelters. Both let the refuge sit at grade *because of* the zoning.

**Sources:** BC Hydro RFA and page; B.C. Reg. 8/2026; UCA s. 1; BCUC G-46-25; Vancouver By-law 9552; NEU Connectivity Guidelines Rev 1; Alta Reg 117/2026; AESO Data Centre Update (Sep 2025) and BYOG proposal (Jun 2026); alberta.ca (Powering new pathways; Data centres in Alberta; levy engagement); GoA AI Data Centre Strategy (2024); ABlawg on AUC 26717-D01-2022; AUC micro-generation guideline 2026; Edmonton Bylaws 17943 and 20001; DESS design guide v8; Blatchford business plan; BC Coroners Service 2022; Health Canada 2020; JIBC ESS guide 2012; NRCan PV; CDA 2023; Census 2021 (tool grid). Full URLs are in the tool's register under each source ID.
