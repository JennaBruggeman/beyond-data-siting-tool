# Learning series: critique and claims to verify (14 Oct 2026)

This is a critique of J.B.'s manuscript *Beyond Data: a narrated introduction to resource-sharing with data centres* (about 25,000 words, 30 chapters). Claude wrote it. The manuscript is a learning aid and a source of hypotheses. Treat its figures as unverified until the papers have been read.

## Strongest ideas (kept in the tool)

- **Capacity is not contribution.** Heat or water only counts once there is a receiver that can use it at the right temperature or quality, in the right place, at the right time.
- **A flow is not an exchange.** An exchange is a flow plus a matched receiver plus an agreement between the parties.
- **Different mechanisms work differently.** Heat transfer, smart charging, V2G, shifting computing to another time or place, and water reuse each work in their own way.
- **Each condition gets its own status and a next action**, rather than everything being folded into a single score (ch. 26).
- **Plan for things going wrong.** Graceful disconnection, three futures, and treating "no-go" as a valid result (ch. 20, 27, 28).
- **Compare against a realistic baseline**, not against an imaginary world with no costs.

## Where the argument jumps from capacity to benefit

1. **Heat in is not heat captured.** It is true that almost all the electricity a data centre uses ends up as heat. But how much of that heat can be captured depends on the cooling system: direct-to-chip 48–75 %, cold plate up to 94 %, hot-water cooled 80 %; for air-cooled there is no primary figure (register: liquid_capture). *(Corrected 15 Oct: an earlier version gave 0.39–0.53 here, which is the heat pump's Lorenz efficiency in built cases, not a capture share.)*
2. **Annual shares hide the seasons.** The headline figures (74%, 40%) are shares of a whole year. Matching has to be done hour by hour: in Vancouver, space heating alone runs 19:1 winter (Dec–Feb) to summer (Jun–Aug); with hot water added, total heat demand from the peak month to the lowest is about 4:1 (3.9; Edmonton 3.3). *(Corrected 15 Oct.)*
3. **Heat delivered is not emissions avoided.** The saving depends on which source the data-centre heat displaces. Near the NEU, that source is mostly sewage heat already, so the data centre and the sewer compete to supply the same receiver.
4. **Recovering heat adds equipment; it does not remove any.** The data centre must keep its full cooling capacity for summer and for any outage at the receiver.
5. **EVs and data centres are coordinated through the grid, not connected to each other.** That coordination is a service to the utility, not a contribution from the building to its neighbours.

## Missing constraints and failure modes

- **Grid access comes first.** Downtown Vancouver has no new feeder positions until 2032.
- **Regulation of heat sales.** In BC this falls to the BCUC (thermal energy systems); the Alberta equivalent still needs checking.
- **Who controls the workload.** In a colocation facility the tenants control the computing, so the building operator cannot promise to shift it.
- **Reliability clashes with dependence.** A data centre built for redundancy does not want to depend on a receiver, and a receiver does not want to depend on a data centre.
- **Opportunity cost** of the grid capacity the data centre takes up.
- **Benefit-washing.** Heat is promised to win approval and never delivered.
- **Survivorship bias.** No failed or abandoned cases are included.

## The five conditions

The five conditions (technical, spatial, temporal, economic, organisational) are not independent of each other:

- The economic condition follows from the technical, spatial and temporal ones (pipe length, temperature lift, storage).
- The organisational condition decides who pays, so economics has to be worked out for each party separately.

The five also leave out regulatory, security, social and environmental conditions; the tool covers these as headings 6–10.

**Proposed test:** run the conditions against the built calibration cases plus some failed ones, and see whether they predict which projects happened. The register's first result is that delivery was limited by the receiver in 4 of 5 built cases.

## Claims to verify

| Claim (as the manuscript reports it) | Type | Notes |
|---|---|---|
| Wang 2026: 1.3 bn m³, 84 Mt CO₂e, US$95.4 bn; 4,775 DCs / 57,547 WWTPs / 98 countries | model | Not transferable to a parcel. Check whether "net" includes treatment capex. "Cooling ≈30%" is background the paper cites, not its finding |
| Shafiee Roudbari 2025: 74%, −95% emissions, +11% cost, 800 m | model | Building or campus? (the manuscript contradicts itself). Is the data centre real? Quebec's hydro grid makes this the closest analogue to Vancouver |
| Ravi 2026: 40% of district heating demand, 60% of rejected heat, 18.2 MWh buffer; PV self-consumption 90% or 28% | model | The PV figure is inconsistent within the manuscript |
| Zhang 2025: >20% less fluctuation, ~15% less line occupancy; 3 DCs, 1,400 EVs | simulation | The manuscript says both "distribution" and "transmission" |
| "Wang 2022", EVs and data centres | unknown | No citation given |
| Crozier & Liska 2025 | review | What share of load do they treat as flexible? |
| Quincy (EPA): US$31 M, 138 Mgal/yr designed offset, since 2021 | operating; the offset is a design figure | EPA page not yet read |
| Helen/Telia: heat for up to 14,000 two-room flats | operator claim | Already in the register as reported |
| Oltmanns 2020; Socci 2024; Yuan 2025; Ngata 2025 | not read | — |
| Telephone exchanges, jobs and tax, sound as a contribution (ch. 23, 24, 29) | manuscript's own inference | Needs precedent sources |
| Permanent support with a changing tenant; graceful disconnection | thesis hypothesis | To be tested through design |

## Paper check by the atlas chat (15 Oct 2026)

The atlas chat read these from abstracts or open full texts; no paywalls were bypassed. This session has not re-read them, so they are recorded as that chat's reading.

| Source | What the check found | Status |
|---|---|---|
| Wang 2026 (full text) | Figures confirmed, all modelled ("first-order" estimate). Water ~1,300 million m³, not labelled annual. US$95.4 bn excludes the social cost of carbon. Shenzhen = real WWTP data + simulated data centre. Cooling share ~40 % (cited from Shehabi 2024), not 30 % | modelled |
| EPA Quincy | Operating since 30 Jun 2021; US$31 M; "an estimated 138 million gallons of water per year"; source is cooling-tower blowdown; lime softening → UF → softening → RO → ~8 h storage → conductivity blending → brine to evaporation ponds; "as of 2022" only Microsoft connected | operating; saving estimated |
| Zhang 2025 | >20 % and ~15 % confirmed, simulated. DOI year 2024 (10.1016/j.apenergy.2024.124697). 3 DCs, 1,400 EVs, ToU comparison and battery wear not verifiable from the abstract | simulation |
| "Wang 2022" | Exists: Xihao Wang et al., *Sustainability* 14(11):6814 (Jun 2022), EV charging + interconnected data centres, simulated | simulation; keep or drop on relevance |
| Crozier & Liska 2025 | *Curr. Sustain./Renew. Energy Rep.* 12(1) art. 12, open-access review. No single flexible share (poorly known, little published data); price signals alone won't create flexibility; UPS rarely offered; inference inflexible; checkpointed training can pause | review; supports workload_control |
| Ravi 2026 | "Up to 40 % of the heat demand of the campus" confirmed. **28 % = increase in buffering potential for variable renewables, not PV self-consumption; "90 %" found nowhere.** The real data centre sits inside EPFL's heating plant, 2 → 4 MW; an EPFL slide pairs the 40 % with 10 MW. 60 % and 18.2 MWh unverified | modelled |
| Shafiee Roudbari 2025 | Abstract names no site and no figures; all unverified | needs UBC Library |
| Oltmanns 2020 | TU Darmstadt Lichtenberg II, 45 °C hot-water cooling, 20–50 % of waste heat usable, up to 720 t CO₂/yr | modelled |
| Socci 2024 | *Energy* 313:134013. 100–500 kW data centre, gas-CHP third-generation network; waste heat 12–59 % of the mix, gas −11 to −58 %. City not named (don't assume) | modelled |
| Yuan 2025 | Metadata confirmed; barriers only, no numbers | review |
| Ngata 2025 | Late Breaking Work (6 pp., preliminary); noise = one pair of phone readings; "Data Center Valley"; the $37/month figure comes from another study | preliminary |
| Helen/Telia | 14,000 apartments is a target ("could eventually"); ~7,000 homes and offices as of Feb 2024 | operator claim |
| Monstadt & Saltzman | Renewables and housing are not in the abstract; its conclusion calls for public debate on priorities when electricity and land are scarce | — |

## Added from the atlas chat

- Every receiver in the core cases is an institution. No study found measures how the value of reused heat splits between operator, utility and residents. This is a gap the thesis could fill.
- The cases are campus or hyperscale sites with a single operator. The atlas sites are mostly 2–3 MW colocation buildings.
