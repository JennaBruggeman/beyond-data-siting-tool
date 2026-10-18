# Verification sweep — 17 Oct 2026

For J.B. Report only: no tool or register file was changed.

## Counts

| | |
|---|---|
| Units audited | 102 |
| Flags raised | 1,547 |
| Critical and major flags checked by a skeptic | 337 |
| Confirmed | 323 |
| Refuted | 2 |
| Downgraded to note | 2 |
| Needs a web check | 10 |
| Left unverified | 0 |
| Minor flags not checked | 729 |
| Notes not checked | 481 |

- Each critical or major flag got **one independent skeptic**. Skeptics worked from **local files only**: no web access overnight.
- Below, findings that several units raised are **merged into one entry**, so there are fewer entries than 323. Units are listed on each entry.
- Severity is the confirmed severity. A merged entry takes the highest severity any unit confirmed.
- Operator and vendor figures are **claims**. "Needs J.B." means the fix is a design choice or rests on something unconfirmed.

## How to read an entry

- **Where**: file:line, or the step and parcel.
- **Tool says**: quoted text.
- **Right**: what the source or the arithmetic gives.
- **Evidence**: local file or recomputation.
- **Fix**: suggested change, or "needs J.B."

---

## Critical (4)

### C1. "Average power" is really full-load power
Units: code-addons-code, recomp-ex0, recomp-ex1, recomp-richards, recomp-van2 (all critical); code-compare, code-engine-a, code-engine-b, code-explain, code-extras, consistency-a, register-q2, register-q4, register-q19, runtime-edm, runtime-van (major).
- **Where**: engine.js:163, :213, :317; addons.js:140; explain.js:103, :128; extras.js:214. Every parcel.
- **Tool says**: "Average power drawn: 8.4–9.3 MW at the meter (servers × PUE 1.4–1.55; PUE is a yearly average, so peak demand is higher)" beside "44–49 GWh a year" (1425 Clark Dr, 6 MW).
- **Right**: the yearly figure is mw × PUE × 8,760 × **0.6** (R.lf). So mw × PUE is the full-load basis, and the average is 0.6 × that: **5.0–5.6 MW** at 6 MW. 8.4 MW × 8,760 h would be 73.6 GWh, not 44. The same clash shows at every size (1 MW: "1.4–1.55 MW average" next to 7.4–8.1 GWh, which is 0.84–0.93 MW).
- Same root: the cooling card says "about 1.4–1.6 MW of heat to get rid of, **all the time**" (explain.js:103). That is the peak used to size the plant (plant.js:22, 26).
- The demand charge (fac × 1,000 × $13.83 × 12) also bills this figure as peak. "So peak demand is higher" is therefore backwards.
- **Evidence**: engine.js:25 lf:0.6; engine.js:286 r.facMWh = fac × 8760 × R.lf; register load_factor "average ÷ peak". Harness dumps for examples 0 and 1, Richards, van-2_1-23060741.
- **Fix**: needs J.B. Either relabel as "power at the meter at full IT load (servers × PUE)", or show the average as mw × PUE × 0.6. See also M94: the 0.6 itself may not be "average ÷ peak".

### C2. "What fits" changes about 2.3× on a second visit
Unit: runtime-answers.
- **Where**: engine.js:172–175 (fitsView). 1425 Clark Dr: new build, hybrid coolers in the yard, generators yes.
- **Tool says**: first visit "Available: 4,716 m² / 2.4–11 MW of servers". Second visit, same answers: "Available: 10,849 m² / 5.5–25 MW of servers".
- **Right**: one answer per set of inputs. fitsView reads siteFacts() while the plant is sized at the provisional 8.9 MW. It then sets A.mw to the low end (2.5 MW), which re-sizes the plant and so the free floor.
- **Evidence**: engine.js:172 `const f=siteFacts()` runs before :175 `A.mw=snap(...)`; plant.js:52–53. Probe dump probe2.json.
- **Fix**: needs J.B. (settle the plant size before showing the range, or state the plant size the range assumes). Related: M36.

### C3. Edmonton UI zone shown as "Smaller only"
Units: sources-18_ (critical); register-c8, register-q20 (major).
- **Where**: index.html:408 (edmStatus); register and opps.json zoning_status coef.
- **Tool says**: "Minor Industrial is permitted in UI; Major Industrial is not." (amber, "Smaller only"). Register: "Minor Industrial permitted in BE, IM, UI and IH-existing".
- **Right**: UI's s. 2 permitted list has no Minor Industrial. It appears only in Appendix IV (NAIT Main Campus): "limited to indoor and outdoor storage" (10.5), "only permitted in Sub-Area 2" (10.11.1). All 11 UI features (40 property records) are wrongly amber.
- Register "IH-existing" is also wrong: the 1 Jan 2024 "existing" limit is on Major Industrial in IM.
- **Evidence**: data/raw/edm/bylaw/b.txt s. 2.210 and Appendix IV; sources/18:37.
- **Fix**: treat UI as rezoning needed. Register: "Minor Industrial permitted in BE, IM and IH; in UI only in Appendix IV Sub-Area 2, as storage".

### C4. "None of the 150 buildings … pays back" while 16 were never assessed
Unit: recomp-van2.
- **Where**: Heat step headline and report, van-2_1-23060741 (cards.js heatIndex).
- **Tool says**: "None of the 150 buildings within 1.5 km pays back at today's prices."
- **Right**: 16 of the 150 (15 schools, 1 care home) have "demand not yet known" and no break-even. The breakdown itself says "none within break-even; 134 beyond".
- **Evidence**: heatEcon sets status 'unknown' with no demand; script result {beyond:134, unknown:16}.
- **Fix**: e.g. "None of the 134 buildings with a known demand pays back at today's prices; 16 have no demand figure yet". Wording: J.B.

---

## Major

### Heat money and receivers

#### M1. Heat value leaves out boiler efficiency (÷ 0.85)
Units: recomp-ex0, recomp-richards, recomp-van2, register-c3, register-q13, consistency-a (major); recomp-ex1 (minor).
- **Where**: cards.js:38 (ECON.gas), :66–71 (heatEcon), :145, :188; engine.js:265–266.
- **Tool says**: "At BC prices (gas $9.30/GJ, power $67.90/MWh) the heat is worth $10.9–18.4 per MWh after the heat pump". Edmonton: "($-7.6 to $-2.0 per MWh of heat)".
- **Right**: the register's price_ceiling is "fuel price ÷ boiler efficiency (0.85)", giving about $38.6 (Van) and $10.7 (Edm) per MWh. On the tool's own inputs with ÷ 0.85: Vancouver **$16.8–24.3**, Edmonton **−$6.0 to −$0.5** per MWh of heat. The code mixes $/MWh of gas with $/MWh of heat. Break-even distances and statuses all move with this.
- Register inputs also disagree (Fortis $9.12 vs $9.305/GJ; rider treatment).
- **Evidence**: cards.js:38 `gas:{van:9.305*3.6,edm:(1.045+1.458)*3.6}`; cards.js:67; sources/03:44 "38.6 $/MWh heat at 85%". Recomputed: 9.305 × 3.6 ÷ 0.85 = 39.41.
- **Fix**: needs J.B. (apply ÷ 0.85 in the tool, or change the register to the tool's basis; confirm the current Fortis Rate 3 and ATCO Mid Use figures).

#### M2. Edmonton gas valued at one shoulder month
Unit: register-c3.
- **Where**: cards.js:38 (ECON.gas.edm); feeds engine.js:265 "no route pays back at any distance".
- **Tool says**: "ATCO Mid Use delivery 1.045 + Alberta regulated rate Oct 2026 1.458 $/GJ".
- **Right**: October ($1.458) is confirmed, but heating peaks in winter ($2.4–3.4/GJ). The 12-month average (Nov 2025–Oct 2026) is **$2.025/GJ**, 39% higher.
- **Evidence**: formula_register.md:1407 atcoGas2026 monthly values; sources/03:50.
- **Fix**: needs J.B. (choose the averaging basis). At least soften "no route pays back at any distance" for Edmonton.

#### M3. Break-even not capped at the heat offered
Unit: runtime-van.
- **Where**: cards.js:66–70; van-m1_m1-71215942 (756 26th Ave W), 0.1 MW.
- **Tool says**: "4 of 49 buildings within 1.5 km could take the heat within break-even", beside "Heat this size could offer 0.3–0.6 GWh a year". BC Children's Hospital: "within break-even … 947 m".
- **Right**: value uses the receiver's whole demand, never min(demand, heat offered). A 0.1 MW site gets credited with a hospital's whole heat load.
- **Evidence**: cards.js:66, :69; heatEcon never reads r.avail.
- **Fix**: needs J.B. (probably value = min(receiver demand, heat offered)).

#### M4. "Who is within 1.5 km" actually counts within 1.2 km
Units: code-explain, consistency-b, data-receivers, register-c1.
- **Where**: explain.js:18, :114, :123 vs cards.js:126, :137. 1425 Clark Dr.
- **Tool says**: How it works: "Who is within 1.5 km: 102 buildings that could take heat". Heat tab, same site: "None of the 150 buildings within 1.5 km".
- **Right**: explain.js starts from e.nearby(), which already cuts at each type's reach (1,200 m; pools 1,000 m), so the 1,500 m filter does nothing. The two labels match but the counts don't.
- **Evidence**: engine.js:30 reach; engine.js:237 nearby(); headless: nearby 102, within 1,500 m 150.
- **Fix**: label "within 1.2 km (pools 1 km)", or count from the same 1,500 m set as the Heat tab. One radius, stated once.

#### M5. Options "Within reach — N candidates" marked met, while Heat says none break even
Units: recomp-ex0, recomp-ex1, recomp-richards, recomp-van2.
- **Where**: engine.js:237, :323 (Options and report).
- **Tool says**: "Within reach — 102 candidates" (Clark Dr, shown as met), but the Heat step on the same parcel says "none within break-even; 134 beyond". Edmonton example: 6 candidates vs "none within break-even; 7 beyond". Richards: 139 vs 1 within break-even.
- **Right**: the Options count is straight-line distance within each type's reach (Dutch RVO circles). It is not the BC break-even test, and the row does not say so.
- **Evidence**: engine.js:237 `if(dist<=reach)`; :323 `state(near.length?'met':'not')`.
- **Fix**: needs J.B. (label "within straight-line reach; none within break-even", or don't show "met" when nothing passes).

#### M6. Receiver floor areas: whole parcels and duplicate records
Units: data-receivers (2 findings), opps-1, runtime-van (major); recomp-richards (minor).
- **Where**: receiver_floor.py:128–137; make_receivers.py:20–30; receivers_van.json, receivers_edm.json; shown at cards.js:89, :192 and opps.js:42.
- **Tool says**: Mazankowski Heart Institute fa 1,027,454 m² (one outline × 16 "storeys"). University of Alberta (school) 1,525,146 m². "Community League Building" 148,534 m² (1,214 outlines).
- **Duplicates**: BC Children's Hospital appears twice under two names; it shares 228,511 m² with BC Women's and with **St. Vincent's Brock Fahrni (a care home)**. Four St Paul's records each carry 115,937 m², three at one coordinate. At 1169 Richards St the gate says "4 hospitals within 1.2 km": all four are St Paul's records. Vancouver: 20 hospital records for about 6 sites. Edmonton pools are duplicated too (Scona ×2, QE ×2 …).
- **Right**: each receiver should carry only its own building, once.
- **Evidence**: receivers_*.json fields fa/fm/fh; odsrf_v2.gpkg query; demand line gives 1,027,454 × 2.348 ÷ 3.6 ≈ 670,128 MWh/yr for one building.
- **Fix**: needs J.B. (de-duplicate; assign floor area per building, not per parcel).

#### M7. Receiver categories mean different things in each city
Unit: data-receivers.
- **Where**: make_receivers.py:21–22.
- **Tool says**: Edmonton pool 23, rec 161, arena 22. Vancouver pool 0, rec 27, arena 1.
- **Right**: Edmonton "rec" = 141 community league halls + 20 rec centres; Vancouver "rec" = 27 community centres. 10 of 23 Edmonton pools are outdoor (seasonal) but use the year-round CEUD intensity (1.458 GJ/m²).
- **Evidence**: odsrf_v2.gpkg class counts.
- **Fix**: needs J.B. (align categories; flag outdoor pools).

#### M8. Edmonton shows "0" non-market homes: no dataset loaded
Unit: runtime-edm.
- **Where**: engine.js:571, :582 (People step), all 16 Edmonton runs.
- **Tool says**: "Non-market homes within 200 m: 0 (City list; private housing not counted)".
- **Right**: tiles/edm/receivers.json has **no** housing points (Vancouver has 622). A missing dataset is shown as a finding. Care homes: Edmonton 2 vs Vancouver 103.
- **Fix**: show "not known: no non-market housing list loaded for Edmonton". The Edmonton source list itself: unverified.

#### M9. Non-housing receivers print "undefined homes"
Unit: code-cards.
- **Where**: cards.js:187 (connection card); all 309 Edmonton receivers with floor area, 155 in Vancouver.
- **Tool says**: "about … MWh/yr (${p.u} homes × ${R.homeMWh[city]} MWh, provincial average…)" — prints "undefined homes × 29.19 MWh".
- **Right**: for schools, hospitals, pools etc. demand comes from floor area × CEUD (cards.js:66), not homes.
- **Fix**: use floor-area wording when the receiver is not housing.

#### M10. Share of heat prints low above high ("474–100%")
Unit: code-cards.
- **Where**: cards.js:182, :187.
- **Tool says**: `share=[demand/avail[1], Math.min(1, demand/avail[0])]`.
- **Right**: only the high end is capped. At 1 MW (avail 3,244–5,913 MWh) the largest Vancouver housing record (1,924 homes) prints e.g. "474–100%".
- **Fix**: cap both ends, or say "more than all the heat offered".

#### M11. "What would close the gap" gives the zero-value power price
Unit: code-cards.
- **Where**: cards.js:74 (heatEcon, Edmonton).
- **Tool says**: "electricity below about $41/MWh for the heat pump (now about $50 …)".
- **Right**: v × COP is where net value reaches zero. At that price five years of value is $0, so no route pays back the levy plus pipe.
- **Fix**: compute the route's own break-even price, (v − (fixed + route × pipe)/(5 × demand)) × COP, or reword: "below about $41/MWh before any route can start to pay back".

#### M12. Simple payback leaves out the heat pump
Unit: register-q14.
- **Where**: cards.js:66–71, :200.
- **Tool says**: "Simple payback: X–Y years." Cost = NEU levy + pipe only.
- **Right**: no heat-pump capital, O&M or demand charges. The register's lcoh ("(CRF × capex + O&M + energy) ÷ MWh") and payback ("NPV, IRR") are not built.
- **Fix**: label "simple payback on the connection levy and pipe only; heat pump, O&M and demand charges excluded", or add heat-pump capex. Mark register lcoh and payback "not built".

#### M13. NEU yearly credit counted on all heat offered
Unit: register-q3.
- **Where**: engine.js:292, :326 (Options, option C).
- **Tool says**: "$X–$Y a year at the NEU's credit ($32.59/MWh)" on r.avail.
- **Right**: the register's match is min(heat out, receiver demand). calibration_report.md: 111 E 5th could supply 57–361 GWh against NEU demand of 44–59 GWh.
- **Fix**: needs J.B. (cap at demand, or label "if all heat were taken").

#### M14. Busiest-to-quietest month ratio uses the national 61% share
Units: code-engine-b, code-extras, parity, register-q13, register-q28.
- **Where**: engine.js:324; cards.js:211; extras.js:187; register demand_profile.
- **Tool says**: "about 3.9 : 1 (Vancouver) / about 3.3 : 1 (Edmonton) between the busiest and quietest month".
- **Right**: the register says provincial CEUD shares replace 0.61, but the ratios were not rerun. Units got different results depending on the share definition:
  - Register's stated 0.46 / 0.63 (space ÷ all residential energy): about **2.7 : 1** Van, **3.5 : 1** Edm.
  - Space ÷ (space + water), CEUD 2023 (BC 0.63, AB 0.73): about **4.2 : 1** Van, **4.5–4.6 : 1** Edm.
  - Either way **the order of the two cities flips**: Edmonton becomes more seasonal.
- **Evidence**: data/cwec_derived.json monthly_HDD16_share; data/nrcan_ceud_latest.json (BC space 72.129, water 42.331 PJ; AB 128.462 / 47.204).
- **Fix**: needs J.B. (choose the share definition, then recompute both cities with their own share).

#### M15. Heat-based opportunities ignore the cooling choice
Units: code-opps-code, opps-5, code-compare, runtime-answers.
- **Where**: opps.js:36, :43–48 (Greenhouse, Aquaculture, New district); engine.js:288–289; compare.js:16.
- **Tool says**: with default air cooling, district heat says "(no primary capture figure)", but Greenhouse shows physics "yes" and "could warm about 33,364–78,356 m²" (Clark Dr, 6 MW). compare.js treats **immersion** as recovery with the direct-to-chip 48–75% capture.
- **Right**: calc() always applies liquid capture 48–75%. The Heat step says "none to reuse with air cooling". decide.js:68 says immersion capture "is not yet sourced".
- **Fix**: needs J.B. (withhold or label heat-offered figures "if liquid-cooled"; heat-based physics gates follow heatPhys; immersion "not yet sourced").

### District networks

#### M16. Wrong network picked; NEU wording and credit applied to any network
Units: code-opps-code (2), opps-1 (3), parity, consistency-b (major); code-cards (minor).
- **Where**: opps.js:40–41; cards.js:150, :170, :234 (netCard); engine.js:238 netsAt (no sort).
- **Tool says**: at 1169 Richards St, "733 m from Neighbourhood Energy Utility (NEU): a pipe to it" and money "credit $32.59/MWh against heat-pump electricity…".
- **Right**:
  - `nets.find(x=>x.inside)||nets[0]` takes the first network in file order. At Richards the nearest is **Creative Energy (downtown), about 272 m** (south downtown 375 m).
  - The money gate keys on city, not network. Every Vancouver parcel gets the NEU credit (even near Creative Energy or River District, which publish none). Every Edmonton parcel gets Blatchford's rate.
  - The demand gate is "possible here" even outside the NEU (Clark Dr, 263 m outside). By-law 9552 credits heat "returned to energy transfer station" from a connected building; whether the NEU takes a data centre's export is not published. The Options table refuses the same network (needs inside && edge ≥ 50).
  - netCard "Explore ›" always opens nets[0].
- **Evidence**: scratch/oppscode/out_van-m1_1-13860893.json edges (NEU 732.87, CE downtown 271.90, CE south 375.48); data/raw/van/9552.txt l.863–865, 1107, 1125.
- **Fix**: pick the nearest network (inside first). Key the credit on nn.src==='van9552' and Blatchford's rate on 'blatchford2023'; others "what this network pays for heat is not published". Outside the NEU set demand and money to "not yet known" until 9552 is read on outside heat (needs J.B.).

#### M17. "The NEU runs mostly on sewage heat" shown inside any network
Units: code-compare, code-engine-b, parity, register-c9, register-q12, register-q18.
- **Where**: engine.js:309, :325 (Options, "Other source already serving"); :343 adds src('neu').
- **Tool says**: `net?…'the NEU runs mostly on sewage heat'` with `net=nets.find(n=>n.inside)`.
- **Right**: inside River District, Creative Energy (steam, 237 MW), Edmonton Downtown District Energy or Blatchford, this is false. Only the NEU note supports it.
- **Fix**: NEU wording and src('neu') only when net.src==='van9552'; otherwise that network's own stated source, or "not known".

#### M18. Every network cites By-law 9552 and "±45 m of the tracing"
Unit: data-receivers.
- **Where**: engine.js:42, :244 (recvView).
- **Right**: only the NEU is traced from By-law 9552. Others are placed from maps ("placed to about ±150 m", River District per make_receivers.py notes).
- **Fix**: per-network source line and accuracy.

#### M19. Blatchford variable rate: outdated $0.0269
Units: consistency-b, opps-1, parity, recomp-ex1, register-c3, runtime-edm (major); consistency-a, register-c10 (minor).
- **Where**: opps.js:41 (Edmonton money gate); tiles/edm/receivers.json Blatchford note.
- **Tool says**: "Blatchford variable rate $0.0269/kWh". The Heat card on the same parcel (cards.js:161): "$0.0358 per kWh … 2025–26 (frozen by Council)".
- **Right**: $0.0269 is the 1 Jan 2022 consolidation. Bylaw (1 Jan 2024): $0.0325/kWh, infrastructure fee $1,947.03/unit or $22.24/m². 2025–26 operator rate (claim): **$0.0358/kWh**. The note also repeats 2022 fees ($1,845.78; $21.09/m²).
- **Evidence**: data/raw/edm/blatchford_C17943_2022.pdf; formula_register.md:1490 blatchfordRates2026. The operator rates page was not re-read tonight.
- **Fix**: opps.js:41 "Blatchford variable rate $0.0358/kWh (2025–26, frozen by Council); what it pays for heat in is not published". Update the receivers.json note. Fix the blatchfordRates2026 source string, which attaches $0.0358 to the 2022 consolidation.

#### M20. Blatchford area called "traced" in some views, "not yet traced" in others
Unit: consistency-b.
- **Where**: extras.js:193, :39; engine.js:365; scene3d.js:195.
- **Tool says**: "service areas not yet traced in the tool" vs "(traced)" and "443 m from" Blatchford.
- **Right**: it is a convex hull of property records, approximate, not Schedule A (make_receivers.py:75).
- **Fix**: label it "approximate (property-record hull), not Schedule A" everywhere, and qualify the 443 m.

#### M21. NEU connection levy is the 2025 figure
Units: code-cards, register-q27, sources-03_.
- **Where**: cards.js:36–37 (ECON.fixed), :197; opps.json vanNEUlevy2025.
- **Tool says**: "fixed:112611 // City of Vancouver NEU connection levy 2025 … (+ $133/kW …)".
- **Right**: By-law 9552 as amended by By-law 14524 (in force 1 Jan 2026): **$123,873 + $146/kW**. From 1 Jan 2027: $136,260 + $161/kW. Edmonton borrows this levy too.
- **Evidence**: data/raw/van/9552.txt l.161–163, 1081–1093; 9552c.pdf Sch. C Part 1.
- **Fix**: use the 2026 figures; update the source line and the register ("proposed" → in force).

#### M22. 65 °C network minimum attributed to By-law 9552
Units: code-cards, register-c1.
- **Where**: cards.js:102.
- **Tool says**: "the data centre's heat still needs lifting to the network's 65 °C (By-law 9552)".
- **Right**: 9552 has no 65 °C. It sets a ≥ 15 °C drop at the meter (s. 5.3(c)) and building supply ≤ 50 °C above 0 °C outdoors (s. 5.3(g)). The 65 °C is in the NEU Connectivity Guidelines (May 2026).
- **Fix**: cite the Guidelines (not re-read tonight; needs J.B. to confirm at source).

### Grid

#### M23. Downtown feeder constraint applied by zone list, not the CPCN Study Area
Units: code-engine-a, register-c4, register-c7, register-q15, sources-01_.
- **Where**: engine.js:76 (f.downtown); used at engine.js:217, 319, 480, 499; addons.js:141, 149, 157.
- **Tool says**: `/^(DD|CWD|DEOD|BCPED|HA-1|HA-1A|HA-2)$/`; 1425 Clark Dr is told "not in the downtown feeder freeze".
- **Right**: the CPCN Study Area is the downtown peninsula plus east to Nanaimo St (West End, Strathcona, Grandview-Woodland), bounded by Great Northern Way, Broadway, N Grandview Hwy. It takes in False Creek Flats I-2 / I-3 / FC-2 and Clark Dr.
- **Evidence**: data/BCH_West_End_Substation_CPCN_2025-11-10.pdf p.2 fn 1; s.2.2.2.
- **Fix**: needs J.B. (trace the CPCN Figure 1 boundary; check which parts the 12 kV dual-radial system serves).

#### M24. "Freeze to 2032" overstates the CPCN
Units: register-c4, register-c7, register-q15.
- **Where**: engine.js:319 (state "not"); extras.js:37, :192; addons.js:157; register r_grid.
- **Tool says**: "no new downtown feeders before 2032"; "downtown feeders frozen to 2032".
- **Right**: feeder **positions** run out by fiscal 2027. "To connect new customers in the interim period, BC Hydro will implement temporary measures." July 2032 is the expected in-service date in an application not yet decided.
- **Fix**: "No new 12 kV feeder positions in the Study Area from fiscal 2027 until the West End substation (expected July 2032); in the interim BC Hydro connects new customers by temporary measures." Use state "met with a change", not "not".

#### M25. "The grid can add 12–36 months": Virginia figure, wrong source
Units: register-c3, register-c4, register-q15.
- **Where**: engine.js:479–480, both cities.
- **Right**: 12–36 months is Dominion Energy via Virginia JLARC 2024. The card cites src('grid'), which is the NIR carbon-intensity source. The register holds local figures: BC Hydro study stages about 16–23.5 months; AESO April 2026 actuals 86 wk (stages 0–2) + 134 wk (stage 3).
- **Fix**: needs J.B. (attribute as Virginia, transferred, or use lead_time per city).

#### M26. AESO indicative weeks are for generation, not loads
Units: consistency-a, register-c3, register-q15.
- **Where**: addons.js:158 (Edmonton grid card).
- **Tool says**: "indicative weeks for stages 1–4: 14, 39, 55, 30 (AESO guide 2021)".
- **Right**: opps.json aesoConnect says these are "generation and storage indicative weeks". AESO April 2026 load actuals: 86 wk (0–2), 134 wk (3).
- **Fix**: label them as generation and storage figures, or show the register's lead_time actuals. (The April 2026 AESO PDF was not re-read tonight.)

#### M27. Battery card shows BC Hydro earnings in Edmonton; battery eligibility not stated
Units: addons-3, sources-15c (2).
- **Where**: addons.js:130 (batteryCard "What it earns"); no city test.
- **Tool says**: "BC Hydro pays $50/kW a season for winter peak relief (Demand Response for Business…)".
- **Right**: Edmonton gets the BC line and no Alberta line (register: AESO reserves ≥ 5 MW supplemental, ≥ 10 MW spinning, smaller via an aggregator). The DR for Business manual does **not** say batteries qualify (sources/15d:209).
- **Fix**: city branch. BC: add "the manual does not state whether a battery qualifies". Edmonton: AESO figures from the register (unverified tonight; J.B. to confirm).

#### M28. UPS row shows "0.0 MWh"
Unit: addons-3.
- **Where**: addons.js:167 (flexCard), any site under about 1.2 MW.
- **Right**: 1 MW × 1–5 min × 0.5 = 0.0083–0.0417 MWh; rounding shows "0.0 MWh". Should read **about 8–42 kWh**.
- **Fix**: show kWh.

#### M29. Reserved capacity rung cites the 2026 Call for Demand as a utility programme
Unit: opps-3.
- **Where**: opps.json "Reserved capacity and batteries to the grid" rules[0], rules[1] (Vancouver).
- **Right**: the Call is an unpaid pass/fail condition for new load, and its intake has closed. The same clause is "allowed" in one rung and "approval" in the next. sources/02:51: "This is reducing demand, NOT giving power back".
- **Fix**: programme rung: BC Hydro Demand Response for Business (battery eligibility not stated). Keep the Call only under "Condition on large loads".

### Cooling, plant and sound

#### M30. Dry-cooler area: per IT MW in one place, per heat MW in another
Units: code-compare, code-plant, register-q25, recomp-richards.
- **Where**: engine.js:24, :126, :161–165, :287 (plantPerMW) vs plant.js:15, :26–28.
- **Tool says**: engine: "(UPS 2–2.4 + batteries 2.2 + dry coolers 24.5) = 28.7–29.1 m² per MW; × 6". plant.js: "24.5 m² of unit per MW of heat", Q = mw × 1.55, plus N+1.
- **Right**: the source figure is per MW of heat. At 1 MW: plant.js 3 × 28.8 = 86.4 m²; engine 24.5 m². At Richards (10 MW): 287–291 m² in text, 15 units drawn (432 m² of unit), and 16 units in the noise line.
- **Fix**: needs J.B. (one basis — heat MW × redundancy — for plant space, drawn units and noise count).

#### M31. 24.5 m²/MW dry-cooler figure is for warm (liquid-cooling) water
Units: code-engine-a, code-plant.
- **Where**: engine.js:24, :214; plant.js:9, :15.
- **Right**: from one unit at 48 → 42.7 °C fluid. sources/16: "UNVERIFIED: dry-cooler area at 25–30 °C … much larger". The tool applies it to the default air-cooled set-up.
- **Fix**: state the warm-water condition and flag air-cooled sizing as unverified (factor: needs J.B.).

#### M32. Dry-cooler sound is a Trane chiller figure
Units: code-addons-code, sources-07_, sources-16_, sources-20_ (major); sources-07_ (minor).
- **Where**: addons.js:38 (and hybrid "as dry coolers"); engine.js:465, :555; addons.js:253, 257; explain.js:143.
- **Tool says**: "fans: about 91–101 dBA per unit (low-noise to standard, maker data)".
- **Right**: 91–101 dBA is the Trane Sintesis Prime RTAF **air-cooled chiller** (333–1,010 kW, Eurovent). The register says dry-cooler sound power is unresolved; the cited mfrDryCooler gives no sound data. The noise screen also assumes one unit per MW whatever cooling is chosen, while plant.js sizes dry coolers at about 1.2 MW each.
- **Fix**: needs J.B. Label as "air-cooled chiller ratings used as a stand-in", or cite a dry-cooler value (Thermokey Lw 102 dBA at 737.6 kW, claim; Güntner small unit 67 dBA).

#### M33. Heat-pump plant area: unit only, 9–30× below DEA plant figures
Unit: sources-07_.
- **Where**: cards.js:202; engine.js:24 hp:[3.4,3.4].
- **Tool says**: "heat pump and pumps in the plant room (about 3.4 m² per MW of heat, manufacturer claim)".
- **Right**: DEA (Aug 2026, sheet 40, waste heat): whole plant 100 m²/MW at 1 MW, 50 at 3 MW, 30 at 10 MW.
- **Fix**: "unit about 3.4 m²/MW (manufacturer claim, unit only); whole plant 30–100 m²/MW at 10–1 MW (DEA)".

#### M34. Plant-position chart hides a generator shortfall
Unit: consistency-b.
- **Where**: decide.js:112, :123; explain.js:42. Edmonton example.
- **Tool says**: tooltip "Roof: 22–40 MW of servers — Doesn't fit: 11 of 19 generators do not fit in the yard", while the card says "✓ Possible here" and What fits, Options and report show the full range.
- **Fix**: needs J.B. (show the shortfall on the card and What fits; state the MW the chart is sized at).

#### M35. Provisional plant size is not "the low end of what fits"
Units: code-plant, runtime-answers (2).
- **Where**: plant.js:52–53, :96; decide.js:111–112.
- **Tool says**: "Sized for 8.9 MW of servers (the low end of what fits…)".
- **Right**: the formula (lot × FSR × (n−1)/n × 0.48 ÷ 630) ignores footprint, storeys, yard and existing buildings. Clark Dr fits 6.6–30 MW (or 2.4 MW with hybrids in the yard), so 8.9 is not the low end. Retrofit and lease give **0.1 MW** while 1.49–4.86 and 1.02–3.33 MW fit. Set-up card charts compare options at this provisional size.
- **Fix**: needs J.B. (take siteFacts().mw[0], or drop the phrase).

#### M36. Top of the "fits" range assumes a yard sized for the bottom
Unit: runtime-answers.
- **Where**: engine.js:172–175, plant.js:50–60. Clark Dr, hybrid in yard.
- **Tool says**: "5.5–25 MW of servers" while plant is "Sized for 2.5 MW … 7 hybrid coolers with spares".
- **Right**: at 25 MW the sizing rule needs 58 hybrids and 20 generators (25 × 1.55 = 38.75 MW), which would take back much of the floor area behind 25 MW.
- **Fix**: needs J.B.

#### M37. Standby fuel shown when "No generators" is chosen
Unit: runtime-answers.
- **Where**: engine.js:166, :177, :215.
- **Tool says**: "Standby fuel: 11.2–12.4 MW × 1,000 (kW) × 12 h × 0.263 L per kWh = 35,347–39,134 L".
- **Fix**: hide the row or show "no generators" when gens = none (needs J.B.).

#### M38. Fuel-room limit: wrong storey assumed and a missing NFC tier
Units: register-c9, sources-22_.
- **Where**: engine.js:26, :180–181, :186, :215.
- **Tool says**: "a basement or upper-storey room may hold 20,000 L — more than one room or an outdoor tank" (new build, Clark Dr).
- **Right**: `pos` is '' for every new or whole building, so the basement limit is applied without a storey being chosen. NFC 2020 Table 4.3.13.4.-B: basement or upper storeys 20,000 L (tanks > 2,500 L) **or 45,000 L** (tanks > 20,000 L); first storey 200,000 L.
- **Evidence**: data/raw/codes/nfcp-188.png (NFC p. 4-32).
- **Fix**: when no storey is chosen, show both limits.

#### M39. Generator testing "up to" figure uses facility load, not installed sets
Units: addons-4, register-q23.
- **Where**: addons.js:160 (genCard); engine.js:475, :487.
- **Tool says**: "about 4 full-load hours a year: up to … t CO₂ and … kg NOₓ (uncontrolled-engine upper bound, AP-42)".
- **Right**: register genset_test is "units × kW × test hours". At 1 MW IT (3 × 1.0 MW sets, N+1): 12,000 kWh → **about 8.5 t CO₂ and 175 kg NOₓ**, not 4.4 t and 91 kg. Not an upper bound.
- **Fix**: use s.gN × s.g.mw × 1,000 × 4 h.

#### M40. Edmonton generators "exempt from approval"
Units: addons-4, sources-15c (major); register-c6 (minor).
- **Where**: opps.json addons[genset].rules.edmonton, rule_state "allowed"; register genset_test coef.
- **Right**: exemption is from **EPEA** approval only (AUC 27938-D01-2023 para 10). AUC power-plant approval (HEEA s. 11) was still required. The GoA fact sheet (20 Jul 2026, claim recorded in the register) requires EPEA approval for backup systems over 50 MW, which the tool's range passes.
- **Fix**: "Standby exempt from EPEA approval; AUC power-plant approval (HEEA s. 11) still required in the Amazon case; EPEA approval needed over 50 MW (GoA 2026)". State "approval".

#### M41. "Cooling for neighbours": no temperature gate, three thresholds
Units: addons-6 (2), opps-5, register-q25 (major); opps-5 (minor).
- **Where**: opps.js:65; opps.json "Cooling for neighbours".basis; register absorption.
- **Tool says**: physics "nk — a data centre rejects heat; giving cooling needs a chiller and a pipe" at every site. Basis: "Needs roughly 65 °C or more: liquid-cooled only."
- **Right**: register: single-effect absorption ≥ 90 °C, two-stage 70–80 °C (Chen et al. 2026); air-cooled heat 25–35 °C (no); liquid 50–60 °C only with a heat-pump lift. 65 °C is an adsorption figure (iDataCool).
- **Fix**: air-cooled physics "no"; liquid "possible with a change". Split absorption and adsorption thresholds, each with its source (needs J.B.).

#### M42. Absorption add-on can never open; wind and biomass never shown
Unit: addons-6 (2).
- **Where**: addons.js:76–87, :145, :195.
- **Right**: addRow exists only for pv, pv_facade, battery, ups, genset, rainwater. The absorption card, and small wind and biomass ("shown so users can see why it is out"), never reach the user. No JS reads `.reason`.
- **Fix**: add rows, or update the register text and decision note.

### Water

#### M43. "Blowdown to the sewer" row shows the recovery add-on's rules
Units: addons-2, consistency-c.
- **Where**: addons.js:187, :194–198.
- **Tool says**: "Vancouver allowed, Edmonton allowed … internal process … built elsewhere (Quincy)".
- **Right**: those belong to "Recover blowdown". Sewer discharge needs a Metro Vancouver permit above Bylaw 299 thresholds (> 300 m³ in 30 days), and EPCOR approval in Edmonton.
- **Fix**: city-specific sewer-discharge rule states for this row; exact states needs J.B.

#### M44. Blackwater "not permitted in buildings" shown for Edmonton
Units: addons-2, consistency-c, register-c8, sources-15a.
- **Where**: addons.js:189.
- **Right**: only Vancouver bans it (VBBL 2025 Art. 2.7.1.2(2)(f)). Edmonton: alternative solution; Alberta Environment authorisation likely (notice, 2021) — the same row shows "approval" for Edmonton.
- **Fix**: city-specific text.

#### M45. "The sewer as a heat sink": Vancouver rules shown in Edmonton; "at the plant" wrong
Units: register-c7, register-q18, sources-13_.
- **Where**: engine.js:517, :462.
- **Tool says**: "warm water to the sewer must stay below 40 °C at the plant; heat taken from sewage needs a letter of support, first come first served".
- **Right**: no city branch. Edmonton: non-contact cooling water to sanitary sewer needs EWSI written approval (Bylaw 18100 s. 5.10); no EPCOR sewer-heat programme found. Bylaw 299 sets 40 °C at entry to **any sewage facility**, not "at the plant"; non-domestic waste < 65 °C.
- **Fix**: city branch; "must not raise waste entering any sewage facility to 40 °C (GVS&DD Bylaw 299, Sch. A 4(b))".

#### M46. EPCOR Gold Bar: "Suncor named" not in any accepted source
Unit: addons-1.
- **Where**: addons.js:186; opps.json epcorGoldBar.
- **Right**: EPCOR names no customer; only trade press names a refinery. "Through an existing pipe" is not in the source either.
- **Fix**: "EPCOR says Gold Bar supplies local industry with reclaimed water (utility claim; 4,226 ML in 2024, customers not named); terms not published".

#### M47. Rain on the roof: 0 m³ with no outline; whole-outline roof otherwise
Unit: runtime-edm.
- **Where**: engine.js:456 roofArea(); addons.js:184, :192.
- **Tool says**: edm-2_4-1012101 "0 m³ rain on the roof a year" with a 436 m² footprint drawn; edm-2_2-552724 "331 m³" on a 367 m² lot.
- **Right**: roof uses the lot outline × 0.86², not the drawn footprint; no outline → existing buildings → 0. 552724's outline covers four records.
- **Fix**: needs J.B. (base it on the drawn footprint; fall back to recorded lot area).

#### M48. Rainwater sizing "per CSA B805" — tool says B805 not read
Unit: register-q6.
- **Where**: register rainwater coef/status; engine.js:461; addons.js:175–177.
- **Right**: tool uses C = 0.8 "assumed" and says the B805 method was not read. The "femp" source cited for the method is the cooling-tower BMP.
- **Fix**: register: "C = 0.8 assumed (CSA B805 not read); tank = one wet month, assumed". Drop "CSA B805 method" from engine.js:461.

### Zoning, envelope and set-up

#### M49. Vancouver rezoning time shown on Edmonton parcels
Units: code-compare, code-engine-b, parity, register-q20, register-q21.
- **Where**: engine.js:315 (Options, Zoning path).
- **Tool says**: "Rezoning needed — about 15 months to a Vancouver decision" (e.g. edm-1_1-843460).
- **Right**: Edmonton: rezoning target 160 calendar days for complex files (90 non-complex); 147-day average Apr–Jun 2026; then a public hearing.
- **Evidence**: data/Edmonton_Rezoning_Complexity_2024.pdf; register rezoning_price coef.
- **Fix**: suffix only when f.city==='van'; Edmonton uses its own figures.

#### M50. Edmonton told the tool uses "I-2 limits"
Units: parity, register-q20, runtime-edm (major); code-decide (minor).
- **Where**: decide.js:94 (FEAS.built.new 'site').
- **Tool says**: "Zone CCA has site-specific rules; the tool uses I-2 limits as if rezoned".
- **Right**: Edmonton uses IM (FAR 2.0, 18 m) — site.js:40–41, engine.js:189.
- **Fix**: `${x.f.city==='van'?'I-2':'IM'}`.

#### M51. Conditional ("case") zones shown as "✓ Possible here"
Units: code-decide, consistency-b, register-q20.
- **Where**: decide.js:94 vs engine.js:308.
- **Tool says**: set-up card "✓ Possible here — A data centre is case by case in zone I-2". Options: "Case by case", state "met with a change".
- **Right**: Vancouver I-2, I-3, I-1C, FC-2 are conditional uses; Edmonton IM/BE ("A large data centre here needs a rezoning to IH").
- **Fix**: map k==='case' to "Possible, with a condition" with the status's own reason.

#### M52. Edmonton FD shown "Case by case"
Units: register-c8, register-q20, sources-18_.
- **Where**: index.html:409; legend :655.
- **Right**: Minor Industrial in FD is discretionary only as "temporary outdoor storage … does not involve the construction of permanent structures" (s. 2.240, 3.9, 4.3). 108 features, 297 records.
- **Fix**: class as rezoning needed.

#### M53. Edmonton BE setbacks "not yet read"
Units: register-q25, sources-18_.
- **Where**: site.js:25; index.html:401; engine.js:15; register envelope.
- **Tool says**: "Setbacks — not yet read — whole lot assumed".
- **Right**: Bylaw 20001 s. 2.120 Table 4.1: street 6.0 m (4.5 m on collector or local road); 0 m to sites; 6.0 m beside a residential zone; 0 m to alleys. BE is Edmonton's most common industrial zone (476 features).
- **Fix**: apply them as for IM and IH.

#### M54. Edmonton IH: 1.0 ha minimum site never checked
Unit: sources-18_.
- **Where**: index.html:406; site.js:23.
- **Right**: s. 2.140, 4.1.1 "Minimum Site area 1.0 ha". Recount: **381 of 489** IH records have lot_size_m2 < 10,000 (370 by parcel_area_m2). The raising unit's 193 was wrong.
- **Fix**: flag "below the 1.0 ha minimum site area" instead of plain "Allowed".

#### M55. Vancouver I-2 sub-area B: data centre allowed to 4.0 FSR
Units: code-site-index, register-q25.
- **Where**: site.js:13–14, :209.
- **Right**: s. 3.2.1.1(a)(iv) caps transportation and storage uses (incl. Bulk Data Storage) at 3.00. The 4.00 total (s. 3.2.1.2) needs ≥ 1.00 FSR of s. 3.2.1.1(c) uses.
- **Evidence**: data/raw/codes/van_I-2_schedule.txt l.357–360, 731–741, 843+.
- **Fix**: sub-area B data-centre FSR [3,3].

#### M56. FC-2 outright height 22.9 m for all sub-areas
Unit: code-site-index.
- **Right**: A and B 22.9 m; C1, C2, D 10.7 m; E 18.3 m (data/raw/van/fc2.txt l.542, 678, 883, 1040).
- **Fix**: add sub-area choice, or flag it.

#### M57. Vancouver I-3: 45.7 m discretionary height missing
Unit: sources-16_.
- **Where**: site.js:17; index.html VAN_ENV['I-3']; engine.js:14; register envelope.
- **Right**: June 2026 schedule s. 3.1.2.11 allows up to 45.7 m in sub-area A (data/raw/van/i3.txt:674–678).
- **Fix**: add it to hx and the clause text.

#### M58. Warming centre: ground-floor rule asserted for an unread zone
Units: code-opps-code, opps-2.
- **Where**: opps.js:60; engine.js:79–105. 1169 Richards St (DD).
- **Tool says**: "this zone keeps the ground floor free of data storage: room for a public room".
- **Right**: for unread zones the tool borrows the I-2 envelope (envAssumed true). The rule exists only in I-2 s. 2.2.7, I-3 s. 2.2.11, FC-2 s. 2.2.4.
- **Fix**: when envAssumed, gate "not yet known".

#### M59. Social tab: ground-floor rule missed for existing buildings
Unit: code-engine-c.
- **Where**: engine.js:579, :105.
- **Tool says**: "nothing in the zone requires another use at grade" in I-2, I-3, FC-2 for an existing building or one floor.
- **Fix**: test the zone rule (f.envU.ground), not f.ground.

#### M60. Retrofit: "checked against NBC 2020 loads" vs "not checked here"
Unit: code-decide.
- **Where**: decide.js:46 vs :96.
- **Fix**: drop "(checked against NBC 2020 loads)", or "(NBC loads given for comparison; not checked for this building)".

#### M61. Edmonton noise: residential zones detected by an "R" prefix only
Unit: register-c4.
- **Where**: engine.js:566; used at :575–576, addons.js:232.
- **Right**: Bylaw 14600 s. 20(1) "zoned for use as residential". Special-area residential zones (GLDF, GRH, BLMR, SLD, SRH …) get 60 dB(A) instead of 50.
- **Fix**: explicit list; whether MU/MUN/CB/DC count is unverified (needs J.B.).

#### M62. Vancouver noise: CD-1 zones never matched
Unit: register-q16.
- **Where**: engine.js:300–301, :557–562; explain.js:144–145.
- **Right**: By-law 6555 Sch. A and B list CD-1 districts as activity or intermediate. Tile zones read "CD-1 (177)", which never match, so every CD-1 parcel gets the quiet limit.
- **Fix**: map CD-1 numbers from Sch. A/B (and B.1, G), or label CD-1 "not read".

#### M63. "Neighbours over their limit" ignores buildings beyond 600 m
Unit: code-engine-c.
- **Where**: engine.js:568 `if(r>600) continue`; :576.
- **Right**: the same panel says the limit is reached at 249–786 m (Edmonton 20 MW) or 225–710 m (Vancouver quiet, 5 MW).
- **Fix**: extend the count, or state "within 600 m".

#### M64. Edmonton sight lines: note says "4 m outside the lot", code uses centrelines
Units: code-addons-code, register-q18.
- **Where**: addons.js:233–235, :248, :251.
- **Right**: streets_edm.json loads (50,755 segments, alleys included), so centrelines run in Edmonton too. Vancouver excludes lanes; Edmonton includes alleys.
- **Fix**: needs J.B. (match networks, then rewrite the note).

#### M65. Flood: Edmonton rule held but shown as "not looked at"; Vancouver wording too strong
Unit: register-c9 (2).
- **Where**: register flood_exposure, b_flood; index.html:596, :614; decide.js:53.
- **Right**: the register holds a verified Edmonton rule (Bylaw 20001 s. 2.250 FPO). Vancouver: "this mostly rules against a basement data centre" overstates VBBL 2.2.10.3(2), which allows services below FCL if protected and accessible. Citation "VBBL Div. C 2.2.9" is a deleted article.
- **Fix**: status "Edmonton rule sourced (s. 2.250), map not built"; Vancouver: services below FCL must be protected and accessible (VBBL 2.2.10).

### Lots, buildings and heights

#### M66. Existing-building floor area: tallest part × all footprints
Units: data-lidar-tiles, register-q1.
- **Where**: engine.js:114–115; site.js:120.
- **Tool says**: 555 W Hastings: "5,990 m² × 40 = 239,620 m²".
- **Right**: per-part storeys give about **100,239 m²** (tool about 2.4× high). The 40 storeys come from a 72 m² spire part.
- **Fix**: needs J.B. (footprint × own height per part; check against vanEnergyReport GFAs).

#### M67. Existing footprint sums sit inside a comment
Unit: code-site-index.
- **Where**: site.js:121.
- **Right**: `m.feet=…; m.footArea=…` are after `//`, so they never run. 1425 Clark Dr shows 1,341 m² (largest part) instead of **1,956 m²** (three parts).
- **Fix**: move them out of the comment.

#### M68. Edmonton lot picking and lot area
Units: code-site-index (2), data-lidar-tiles (2).
- **Where**: index.html:527–538, :558–563, :595; site.js:110; engine.js:70.
- **Right**:
  - A click picks the record with the **largest recorded lot area**. Worked example: clicking 12603 123 St NW's outline (14,435 m²) selects "12005 127 AVENUE NW" (118,416 m², zone AJ). 1,571 Edmonton lots affected.
  - No measured-outline fallback (Vancouver has one). 290 lots have a record under half the outline (673 Howatt Dr SW: 1 m² vs 68,050 m²); 544 have 0 or none.
  - 544 lots list ids stored only in a neighbouring tile → "No civic address", blank zone, "Lot area: — m²".
- **Fix**: needs J.B. (pick by containment; same fallback rule as Vancouver; cross-tile lookup).

#### M69. Vancouver "tax record" lot area is not from the tax report; multi-part parcels
Unit: data-lidar-tiles (2).
- **Where**: index.html:563, :585; make_tiles.py:74–79.
- **Right**: a[8] is the area of the first parcel polygon written for that tax coordinate. 750 Hornby's "1 m²" is a sliver polygon. 3,031 tax coordinates have several parts: 210 Nanaimo St clicked on its 379 m² part shows lot 846 and no buildings; by search it shows 2 buildings.
- **Fix**: relabel the source; needs J.B. for multi-part handling.

#### M70. Edmonton heights: "measured" label on estimates; absurd estimates; dropped 3D parts
Unit: data-lidar-tiles (3).
- **Where**: index.html:598; make_tiles.py:188–195; edm_heights.py:44–60; engine.js:113.
- **Right**:
  - Worked example shows "20.0 m — measured from the City's 3D buildings"; tallest measured is 9.3 m; 20.0 m is an estimate.
  - 219 unmeasured outlines over 40 m, 93 over 100 m, up to 280 m on 16–45 m² sheds (tallest measured 163.5 m).
  - 75,074 of 383,292 3D parts dropped (no roofline outline), incl. the two tallest (243 m, 200 m). Vancouver adds new LiDAR outlines instead.
- **Fix**: label by flag; cap or drop estimates; needs J.B. on adding unmatched parts.

#### M71. Burrard Inlet modelled as a lot
Unit: runtime-van.
- **Where**: van-m2_3-56110825 (legal "OTHER").
- **Tool says**: "40 MW of servers fit · 10,904,331 m² floor"; "Only 572 of 4692 loading spaces fit".
- **Fix**: exclude water / "OTHER" parcels (needs J.B.).

### Model display

#### M72. Opportunities use 1 MW while the model uses the sized MW
Units: code-opps-code, opps-4.
- **Where**: opps.js:25 `mw=A.mw||1`; :66 (copper).
- **Right**: A.mw is null on the guided path, so heat, fish, copper and housing figures are for 1 MW while the building and yard are sized at 8.9 MW (Clark), 22.1 MW (Edmonton), 12.3 MW (Richards).
- **Fix**: needs J.B. (one MW for both).

#### M73. EV land gate: 19 stalls in text, 3 packed in 3D
Unit: code-opps-code.
- **Where**: opps.js:54 vs :92.
- **Tool says**: "411 m² free on the lot holds 19 stalls"; 3D "3 stalls on the open lot"; Edmonton "0 stalls" but 3D draws 3.
- **Fix**: report the packed count; use the inset lot.

#### M74. 3D "X MW needs" label
Unit: code-scene3d (2).
- **Where**: scene3d.js:174, :188.
- **Tool says**: "40 MW needs ≈ 6,400 m² …" (falls back to what the lot holds when the need doesn't fit). With no size set, the figure is the whole footprint × all storeys, incl. a ground floor the zone keeps for other uses.
- **Right**: 40 MW needs about **30,700 m²** (mw × 766.7) on every parcel.
- **Fix**: separate "needs" from "lot holds"; default label needs J.B.

#### M75. 10 m standoff drawn inside the outline
Unit: code-scene3d.
- **Where**: scene3d.js:77–82, :230.
- **Right**: offsetRing always offsets inward (normal and sign flip together). Small outlines collapse.
- **Fix**: flip the sign and test both windings.

#### M76. "What matters most" has no 40 MW cap
Unit: code-extras.
- **Where**: extras.js:118–122 vs engine.js:118.
- **Tool says**: bars to about 60 MW on the Edmonton example; What fits shows up to 40 MW.
- **Fix**: apply Math.min(40, …).

#### M77. Report: baseline recomputed, step notes stale
Unit: code-flow-report.
- **Where**: flow.js:140–164.
- **Tool says**: same report: "Floor area available 12,236 m² / 6.2–28 MW" and "Available: 13,068 m² / 6.6–30 MW".
- **Fix**: needs J.B. (drop notes when inputs change, or recompute the baseline from captured values).

#### M78. Report drops Energy, Water and Materials sources
Unit: code-flow-report.
- **Where**: flow.js:167 (dedupe on first 90 characters).
- **Right**: those blocks share the compare.js preamble with Heat, so they are deduplicated away (21 blocks → 18).
- **Fix**: dedupe on the whole string or by line.

#### M79. Qu EDM2 and VAN4: cooling type asserted
Unit: code-compare.
- **Where**: compare.js:28–29, :39, :42.
- **Tool says**: Qu EDM2 "Water evaporated on site: none (dry coolers)".
- **Right**: operator states "1450 Tons of N+1 cooling"; type not stated (sources/01:161). Field notes record possible evaporative equipment.
- **Fix**: "not stated" for heat and water; VAN4 "none stated (operator claim)".

### Opportunities: rules and readiness

#### M80. EV stalls: simultaneity factor applied backwards
Units: code-engine-c, code-opps-code, opps-3, register-q11, sources-05_.
- **Where**: opps.js:53–54; engine.js:486; register ev_stalls.
- **Tool says**: "1 MW set aside serves about 26–68 Level 2 stalls (7.4–19.2 kW, 0.5 diversity)". Register: "P_reserved × SF ÷ P_charger".
- **Right**: with SF as a simultaneity factor, stalls = P ÷ (SF × P_charger) = **about 104–270** per MW; parking 2,290–5,950 m².
- **Fix**: needs J.B. — also whether SF 0.5 (derived for DC fast sites) applies to Level 2 at all (see web list).

#### M81. EV stations: private stations counted as public
Unit: data-census-streets.
- **Where**: opps.js:55; ev_van.json, ev_edm.json.
- **Tool says**: 1425 Clark Dr: "9 public charging stations … 28 Level 2 … 8 DC".
- **Right**: public only: **5 stations, 9 Level 2, 2 DC**. Files: Vancouver 39 of 544 private; Edmonton 9 of 211.
- **Fix**: filter on NRCan Access Code.

#### M82. Edmonton routes: bridges dropped; false fallback wording
Unit: data-census-streets.
- **Where**: make_streets.py:35, :46; cards.js:59–63, :183, :191.
- **Right**: dropping Ramp/Overpass/Bridge breaks the network. 34 of 339 test pairs fail and fall back to an L, and the card says "street centrelines not loaded for this city", which is false.
- **Fix**: keep bridges; reword the fallback.

#### M83. Seasonal ground storage: Edmonton "water-well licence"
Units: opps-2, register-q16, sources-05_, sources-15c.
- **Where**: opps.js:49.
- **Right**: owner of a vertical closed loop above the base of groundwater protection needs **no** Water Act authorization (AB EPA fact sheet, 8 Oct 2025). The driller needs a Class F approval (Directive 2018). Contradicts the register's licence_flag.
- **Fix**: use that wording; add Table 4 setbacks (3 m to property lines, 1 m to buildings).

#### M84. Vancouver aquaculture under Food Manufacturing Class B
Unit: opps-2.
- **Where**: opps.js:18, :48.
- **Right**: I-2 s. 2.2.1(b), 2.2.2(b): uses "must not involve the keeping of live animals". Live fish or insects can't sit under Class B.
- **Fix**: gate "no" or "not yet known" with that clause.

#### M85. Same card, two zoning states (gate vs ladder)
Units: consistency-c (3), opps-5.
- **Where**: opps.js:46, :48, :50, :60; opps.json ladders.
- **Right**: Greenhouse gate cites the use tables (Vancouver conditional, Edmonton permitted); ladder says "not yet read". Aquaculture likewise. Sewage heat: ladder "allowed", gate "with a change" (UT-008 letter → "approval"). Warming centre: gate replaces ladderWorst and drops an "unknown" building-code rung.
- **Fix**: update ladders to the read clauses; keep the worst rung in the gate.

#### M86. "Hospital or campus anchor" never tests campuses
Unit: opps-1.
- **Where**: opps.js:42.
- **Right**: only type "hospital". U of A sits as a "school". Precedents are campuses (Laval, Amsterdam). Shown as "Not here".
- **Fix**: include campuses, or rename.

#### M87. Readiness labels not backed by operation
Units: opps-1 (2), register-q3 (2), sources-24_.
- **District heat "built here" (TELUS Garden)**: sources show a 2013 CPCN and 2015 rates order; current operation UNVERIFIED (sources/25:34; register precedent "proposed"). Its delivered-heat figures (5,194 MWh, 94%) are design forecasts (C-1-13 p.16). Fix: "built elsewhere" unless operation is sourced (needs J.B.).
- **New district "built elsewhere" (Westville)**: planned ("ab Anfang 2023 vorgesehen"); "2,400 MWh/yr reported" is a planned minimum ("mind. 60%" of about 4,000). The 35 MW is connected capacity; actual draw about 20 MW. Fix: "at least 2,400 of about 4,000 MWh/yr planned"; readiness needs J.B.

#### M88. Cold days: "maximum" left out
Units: consistency-a (major), opps-2 (minor).
- **Where**: opps.js:61.
- **Tool says**: "Edmonton has 6.1–6.5 days a year at or below −20 °C".
- **Right**: days whose **daily maximum** is ≤ −20 °C (data/normals_1991_2020_extract.json).
- **Fix**: "… when the temperature stays at or below −20 °C all day (daily maximum)".

#### M89. Climate claim: "lower-carbon" never computed
Unit: register-c6.
- **Where**: cards.js:210.
- **Right**: the displaced side is never calculated; "lower-carbon" is triggered by a money test; "against the gas burnt now" assumes the receiver's fuel.
- **Fix**: needs J.B.

### Precedents and benchmarks

#### M90. Benchmark set: "built or approved, public records" is wrong
Units: code-engine-a, consistency-c, precedents-1, precedents-6.
- **Where**: engine.js:205, :21.
- **Right**: 11 benchmarks (not 10): 6 approved, 2 proposed, 1 refused, 1 under construction, 1 unknown; none recorded as built. Both endpoints are applicant claims: 505 (Manor Farm, GIA) and 1,109 (Iver Woodlands Park, **refused**, "up to" GEA across 3 buildings). SJ04 is "Under Review".
- **Fix**: reword, or rebuild the tier (needs J.B.); comment "11".

#### M91. Precedents legend: fill means tier, not evidence
Units: consistency-c, precedents-6 (major); code-engine-c (minor).
- **Where**: engine.js:614, :625, :631.
- **Tool says**: "filled: public record; open: claim".
- **Right**: Manor Farm, Woodlands Park, SJ04 are filled but applicant claims; Lafayette, Chandos Road Ph 2, U of T McLennan are open but public record.
- **Fix**: "filled: benchmark tier; open: reference tier".

#### M92. Aggregator copies used as sources
Unit: precedents-7 (2).
- **SFO12 (365 Main)**: figures from datacentermap's copy; the operator page was robots-blocked. Breaks rules 2 and 3. Sets the reference-tier max (2,452 m²/MW). Fix: label "operator claim, unverified (aggregator copy)" or drop until J.B. opens the operator page.
- **Chicago 400 S LaSalle**: Baxtel CDN copy; "former CBOE building" not in the flyer. Fix: drop that phrase; label as above; 22 MW is "expandable".

#### M93. CloudHQ Offenbach: area type and status
Unit: precedents-3.
- **Where**: precedents.json sites[32]; sets benchmark p75 (964 m²/MW).
- **Right**: own fact says area type "not specified"; headline says "gross". Status rests on a 2021 record.
- **Fix**: needs J.B. (German primary source, or mark area basis unspecified).

### Register entries

#### M94. Load factor 0.6 is not "average ÷ peak" in Fan et al. 2007
Unit: register-q5.
- **Right**: in Fan et al. the 0.6 is average power as a share of summed "actual peak" (provisioned). Average ÷ observed peak for the same data centre is about 0.8.
- **Fix**: drop the "average ÷ peak" label (register, opps.json, extras.js:96, engine.js "60% of peak"). Bears on C1.

#### M95. Register IT-load entries don't match the tool
Unit: register-q1 (2).
- **it_load_outside**: register density ≈ 500 W/m² (RVO) or 355–667 W/m² measured; tool uses 290–630 m²/MW (1,587–3,448 W/m²).
- **it_load_actual**: register band 0.20–0.60; every yearly MWh uses the single 0.6.
- **Fix**: needs J.B. (align register and code).

#### M96. Homes heated: 2023 was the warmest year
Unit: register-q10.
- **Where**: engine.js:27 homeMWh {van 14.58, edm 29.19}.
- **Right**: correctly read, but CEUD HDD index 2023 is 0.773 (BC), 0.842 (AB), the lowest of 2018–23. 2018–22 means: about BC 16.8, AB 33.1 MWh.
- **Fix**: needs J.B. (multi-year or weather-normalised).

#### M97. Edmonton priority areas misordered
Unit: register-q9.
- **Right**: City Centre: Oliver is **first** priority; Mill Woods Town Centre is the only second.
- **Evidence**: data/Edmonton_District_Energy_Strategy_2022.pdf l.230–241.

#### M98. Sources that don't contain the figure
Units: register-q5, register-q6 (3), register-q12 (minor).
- **water_behind_electricity**: 1.25 and 16.8 L/kWh cited to FEMP and CER; neither holds them. No local source.
- **generator_co2**: 2.681 kg CO₂/L cited to "eccc" (Climate Normals). Probably NIR Annex 6; unverified.
- **generator_nox_pm**: AP-42 factor cited to "eccc"; should be ap42_34; confidence 80 here, 65 in genset_test.
- **refrigerant_co2e**: 3%/yr leak and 50–600 kg charge have no source; conf 90 "in hand".
- **Fix**: correct sources; refrigerant needs J.B. (source or relabel conf 20/0).

#### M99. Embodied IT: "in Vancouver making the servers is the largest carbon item"
Unit: register-q7.
- **Right**: Alissa et al. give only US-grid and 100%-renewable cases. At 1 MW the tool's own figures overlap (servers 116–174 t/yr; Vancouver electricity 133–147 t/yr).
- **Fix**: mark it the tool's own inference; drop "largest".

#### M100. Vancouver wells: 333 is a bounding box, not the City
Unit: register-q17.
- **Right**: the box includes 47 North Vancouver, 39 Richmond, 3 Burnaby wells; both open-loop geoexchange wells are in Richmond.
- **Fix**: "Wells in a lat/long box around Vancouver (incl. North Vancouver, Richmond, Burnaby): 333; both OP_LP_GEO wells recorded in Richmond".

#### M101. heat_temp marked verified; COP 3.9 not Meta Odense
Unit: register-q2 (2).
- **heat_temp**: report 14 says air 25–35 / liquid 50–60 °C are UNVERIFIED (second-hand via Sethuramalingam). Set verified:false.
- **COP**: from 2021 Fjernvarme Fyn pools Meta's heat pumps with Ejby Mølle wastewater ones; 3.9 is a derivation (only 2023 prints 393%). Fix SRC2.cop: "4.5 in 2020; 4.2 all-in 2021–22 (Dansk Fjernvarme 2022 p.10); Fyn heat pumps combined about 3.9".

#### M102. PV roof formula is not what users see
Unit: register-q22.
- **Right**: the register formula lives only in energyView, which is overridden (addons.js:261). The live card packs 6 × 2 m panel rows.
- **Fix**: needs J.B. (align register to the layout method, or remove dead code).

#### M103. Backup hours: "UPS 10–15 s" not in any source
Unit: register-q4.
- **Right**: UPS runtime 1–2 min (hyperscale), ~5 min (colo), 10–15 min (financial); generators take over in 10–20 s (vendor claim via sources/15d). Uptime: 12 h fuel minimum.
- **Fix**: use those, labelled.

#### M104. PUE confidence 100
Units: consistency-c (major), register-q4 (minor).
- **Right**: 100 fits the definition, not the 1.4–1.55 range (LBNL estimate + Uptime survey). engine.js badges it "survey".
- **Fix**: at most 80, or 50 if the survey sets 1.55 (needs J.B.).

#### M105. Heat contract "10 years + 5" shown as fact
Units: register-q15 (major); register-q14 (minor).
- **Where**: extras.js:150; cards.js:211/216; register horizons.
- **Right**: the register's own role for this term is verified:false, conf 50. Local reports support only "10-yr call-off contracts".
- **Fix**: "10-year call-off contracts (reported)"; "+5" needs J.B.

#### M106. Telia ERF 0.75 "on the ISO basis"
Unit: sources-13_.
- **Right**: the PDF gives 0.75 without a definition. The derived 0.20 utilisation floor assumes ERF = 4.11 MW ÷ E_DC; on 5.65 MW delivered it would be about 0.27.
- **Fix**: label as an operator claim, basis not stated.

#### M107. Building shell "up to about 40 years"
Unit: sources-13_.
- **Where**: extras.js:150.
- **Right**: 40 years is an accounting depreciation life (Amazon 10-K); physical life is not published.
- **Fix**: "written off over 7–40 years in company accounts; physical life not published".

---

## Minor

Short form: where — problem — fix.

1. **hourly_overlap** (register-q28): 47% / 2.5% are space heating only, labelled "heat demand". With flat hot water: Vancouver 38.7% Dec–Feb, about 11% Jun–Aug.
2. **risk_term** (register-q14, sources-09_): unit "%/yr" is wrong (share over 1974–2014); and each cause is about 6% (≈ 12% together), per the paper's body. Its abstract says "together … about 6%" — flag the paper's own inconsistency.
3. **LRMC capacity range** (register-c7, register-q18): "150–400" → **200–400** $/kW-yr (IRP App. F s. 1.2.2).
4. **Grid factors "both reported"** (register-c6, register-q6): only the average is reported; BC marginal unpublished. Reword condition and formula.
5. **TELUS Garden rate "charges customers"** (register-q13): BCUC C-1-13 denied the initial rates; amended rates later (G-2-15).
6. **Mäntsälä "supplier-owned, paid"** (register-q14): price and heat-pump ownership not stated in primary sources.
7. **Affordability 6%** (register-q14): thresholds cover all home energy, not heat alone; StatCan uses ≥ 10%.
8. **Edmonton parking stall size** (register-q11): code uses Vancouver 22 m²; Edmonton 23.4 m² (2.6 × 5.5 m, 7.0 m aisle).
9. **stored_heat ρc** (register-q11): 1,238–2,683 kJ/m³K has no source; efficiency band supported by Drake is 0.32–0.56.
10. **rare_earth** (register-q12): "Danczak 2018" has no title, URL or page; Dell PDF doesn't mention rare earths.
11. **Reg 117/2026 scope** (register-q19): priority applies only to ≥ 75 MW transmission-connected data centres, ranked against untethered ones.
12. **COP fixed** (register-q2): register Lorenz formula not built; code uses fixed 3.0–4.5.
13. **Jobs range low > high** (register-q21, runtime-edm): Math.max(1, …) only on the low end at engine.js:582, :587 ("1.0–0.8 operating jobs").
14. **Reclaimed water 4,226 ML** (register-q21): tool shows it with no source or claim label; register says "no volumes". Update register.
15. **Greywater between properties** (register-q21): three different statements; Edmonton "needs a variance" is unverified. AEP leads multi-property reuse (notice 2021 s. 4).
16. **pv_cost** (register-q23): figures are from NREL ATB 2024, not the cited benchmark.
17. **HVO fuel codes** (addons-4, register-q24): RLCF-012 readings disagree; BCLCF889.0 (131.35 g/MJ) was valid at 29 Apr 2026; −7.03 had expired. Needs J.B. to re-tally.
18. **size_fit coef** (register-q26): 290–630 / 250–290 m²/MW and their operator sources are missing from the register.
19. **fuel_on_site formula** (register-q26): code uses facility load, register says generator capacity.
20. **heat_captured** (register-q3): code uses E_IT × capture; register heat_rejected × capture.
21. **ERF numerator** (register-q3): captured heat is not reused energy under ISO 30134-6.
22. **generator_co2 "564 h/yr"** (register-q6): no local source; tool uses 4 h.
23. **CLF 461 kg/m²** (register-q7): no edition, table or scope; not found in CLF pages reached.
24. **Homes MWh three figures** (register-q9): register gives 81.2×0.61, 71.7 and the tool's 14.58/29.19; state the tool's method.
25. **CEUD per-activity "not published"** (register-q9): outdated; Tables 15, 17, 19 are held locally.
26. **femp source** (register-q5): BMP #10 has no h_fg, B = E ÷ (C−1) or WUE; label as physics/derived.
27. **fuelHours 12 vs 24–48 h** (register-q4): align register with the tool's 12 h (Uptime minimum).
28. **server_floor share** (register-q1): register 0.75–0.87, tool 0.48–0.72.
29. **LBNL utilisation** (register-q1): 21% → 35% is server utilisation, not power ÷ nameplate.
30. **Woodcroft peak** (register-q15): 74.2 vs 66.2 MVA in two places; needs J.B. to re-read the EPCOR report.
31. **Blatchford "terms not yet read"** (register-c10): compulsory connection is read (C17943 s. 6).
32. **btes readiness** (addons-4): FGZ Friesenberg is a built case; check it is a seasonal store charged by data-centre heat (needs J.B.).
33. **tes readiness** (addons-5): precedents are phase-change (MODERATOR) and planned (Tallaght), not water tanks.
34. **tes_volume coef** (addons-5): 144 and 29 L/kWh leave out ÷ 0.85; with it 169 and 34.
35. **deep_geo Vancouver** (addons-5): "not plausible" in the rules slot; BC Geothermal Resources Act covers ≥ 80 °C.
36. **"Same 0 MW of servers"** (code-compare): fmt rounds 0.1–0.3 to 0, 1.5 to 2.
37. **Dry coolers "the most space"** (code-decide, code-explain): hybrids take more on the same chart.
38. **Immersion bar "none"** (code-decide): value unknown, not 0%.
39. **SRC2.size citation** (code-engine-a): cites reference/context sites, not the benchmark endpoints.
40. **Racks: 3D vs Materials** (code-scene3d): 1,113 vs 125 racks with no size set; 8 kW hard-coded.
41. **Rainwater Vancouver "allowed"** (opps-4): needs an operating permit and engineer (VBBL 2.7.5.3, 2.7.6.1) → "approval".
42. **Rainwater demand "no"** (opps-4): toilets and irrigation are real uses; "Not here" misleads (needs J.B.).
43. **"na" rules shown as "possible here"** (opps-5): Cooling for neighbours; no rule read.
44. **Warming centre parity** (opps-2): Edmonton's 10.5 humidex-30 days left out; state rules differ.
45. **LCL Gembloux** (opps-3): no source anywhere.
46. **Global Switch area sum** (precedents-1): source says don't add the two areas.
47. **Cruiserath 73 MW** (precedents-2): objector's figure, disputed, labelled "applicant claim".
48. **Cologix VAN4** (precedents-4): May 2026 spec sheet (claim) gives 6.5 MW, 40K ft², 6–8 kW/cabinet.
49. **DUB06 hall share** (precedents-8): mixes original and altered buildings (0.615 → 0.375, or skip).
50. **NEU 3.2 MW** (sources-03_): use 2.5 MW base (RTS 06419); earlier correction not applied here.
51. **Nat Bailey "Indoor arena"** (data-receivers): outdoor baseball stadium.
52. **Noise unit counts** (consistency-b): People step 10 units, card 9, plant 9 or 28.

---

## Needs a web check (to do with J.B.)

| # | Where | Claim | Page to check |
|---|---|---|---|
| 1 | decide.js:66 (Air upside) | 75% air-cooling share | Uptime 2025 Annual Survey report |
| 2 | cards.js:38 ECON.gas.van | Rate 3 components ($9.305 all-in vs $9.12 + riders) | FortisBC Rate Schedule 3 PDF |
| 3 | engine.js:581 (Light at night); register light_at_window | Vancouver shows only an absence of rules | Vancouver By-law 4548 s. 7 |
| 4 | register it_load_outside, rvo2018 | 4.38 MWh/m² per server-room area; IT or facility? | RVO Kansenkaart restwarmte report |
| 5 | register ev_stalls, silber2024 | SF 0.5 derived for DC fast sites, applied to Level 2 | Silber, Scheubner, Märtz 2024 full text |
| 6 | register row_cost, edmULA | Edmonton ULA fees "not published" | City of Edmonton Utility_Line_Assignment_Fees.pdf |
| 7 | register borefield | 19 W/m from the ground-only optimum, not the hybrid | Zurmuhl 2018 |
| 8 | engine.js:555; addons.js:253, 257; explain.js:143 | 91 dBA low bound = smallest Trane unit (333 kW) | Trane RTAF brochure RTAF-SLB001-GB |
| 9 | register noise_level, traneRTAF | Missing row: size 245, 877 kW, SN 107 / LN 103 dB(A) | Trane RTAF brochure |
| 10 | register borefield (sources/15c §1.1, §8) | 760 m is the ground-only optimum | Zurmuhl 2018 (same as 7) |

Rule 2 applies: if a page is blocked, record it as unreachable.

## Refuted (2)

- engine.js:509, :514 vs addons.js:192 — "water behind electricity computed two ways": refuted.
- opps.js:48 (Aquaculture physics) — "2.9–4.6 shown as the heat fish tanks need, 2.9 is a lower bound": refuted.


## Unreachable sources (100)

Not fetched overnight, mostly because the fetch tool refused URLs outside its provenance set. No workaround was tried (rule 2). Figures that rest on these were checked only against local research reports.

**register-q1**

- https://s29.q4cdn.com/106493612/files/doc_financials/2025/q2/Digital-Realty-2Q25-Earnings-Supplemental-07-24-2025.pdf — WebFetch provenance block; search did not return the supplemental, so occupancy 96.4% and 55.8 MW (p.24) were not checked
- https://council.vancouver.ca/20260714/documents/rr1.pdf (RTS 19744) — not fetched (provenance); 40 MW quote page unverified
- Edmonton Property Information dkk9-cj3x (data.edmonton.ca) — not fetched; total_gross_area units not checked against the primary source
- energycarbonreport.vancouver.ca — screenshot source by J.B.; only the derived JSON was checked, not the primary map values
- Qu EDM1/EDM2 spec sheets and eStruxture VAN-1 datasheet — not re-fetched; values taken from sources/01 and opps.json (operator claims)

**register-q2**

- https://eta-publications.lbl.gov/sites/default/files/62716-p5-dc-22-finalf.pdf (lbnlBench): WebFetch provenance block; I did not try a workaround, so 377 racks / 10,000 ft² and the 1.8 m² bound are unconfirmed
- Wahlroos et al. 2018 RSER 82:1749–1764 full text (p.1753, heat_temp): aaltodoc and research.aalto.fi pages link no open-access PDF; the DOI is the publisher page (paywalled)
- Alissa et al. 2025 Nature 641:331–338 p.332 (heat_temp): full text not attempted beyond the earlier report; marked unverified
- Heydari et al. 2024 Appl. Therm. Eng. 239:122122 (cold plate 94 %): not found by WebSearch; par.nsf.gov URL not in provenance
- https://escholarship.org/content/qt0g50294h/qt0g50294h.pdf (Coles & Greenberg 2014): not in provenance; the LBNL abstract page gives no percentages, so 67–75 % rests on report 14's quote
- Fjernvarme Fyn Årsberetning 2020–2024 PDFs (fjernvarmefyn.dk): URLs not in provenance; figures checked only against sources/13 quotes

**register-q3**

- https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R1364 — WebFetch refused (PROVENANCE_REQUIRED); relied on sources/13 record of Annex II 1(j) and Annex III(c)
- https://services.bis.gov.in/tmp/LITD39622436_17102023_1.pdf (ISO/IEC 30134-6 BIS adoption) — WebFetch refused (PROVENANCE_REQUIRED); relied on sources/13
- https://www.tax.dk/jv-2024-1/ea/E_A_4_6_10_3.htm — WebFetch refused (PROVENANCE_REQUIRED); skatOverskud not independently re-checked
- https://www1.eere.energy.gov/buildings/publications/pdfs/rsf/rsf_data_center_case_study.pdf — WebFetch refused (PROVENANCE_REQUIRED); ERE 0.91 / PUE 1.18 not independently re-checked
- https://www.ordersdecisions.bcuc.com/bcuc/orders/en/118621/1/document.do — WebFetch refused (PROVENANCE_REQUIRED); relied on sources/13
- https://www.bouwstenen.nl/sites/default/files/uploads/Rapportage-Restwarmte-uit-datacenters.pdf — WebFetch refused (PROVENANCE_REQUIRED); relied on sources/13
- https://nivos.fi/ajankohtaista/paikallisen-datakeskuksen-kanssa-yhteistyossa-luotu-ekosysteemi-lammittaa-mantsalassa/ — WebFetch refused (PROVENANCE_REQUIRED); relied on sources/13
- https://ucalgary.scholaris.ca/server/api/core/bitstreams/8f66f77b-d1cd-4408-aad2-9cbb3076bcbc/content (Bartlett 2025) — WebFetch refused (PROVENANCE_REQUIRED); 490 MWh/MW/month checked only against sources/13's 5,875 MWh/yr (5,875 ÷ 12 = 490)
- Green Grid WP#29 — behind sign-in per sources/13; not attempted
- Stockholm Exergi annual report 2023 and Alberta AI Data Centre Strategy — not attempted (fetch tool refusing unseen URLs)

**register-q4**

- https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2025.Annual.Survey.Report.pdf (no ?version=0): blocked by the fetch provenance rule; the ?version=0 copy was read instead
- https://app.bchydro.com/content/dam/BCHydro/customer-portal/documents/accounts-billing/electrical-connections/2026-cfd-request-for-applications.pdf (cfd source): not fetched (provenance). Curtailment terms confirmed from the BC Hydro 9 Feb 2026 info-session PDF instead; the '100 + 300 MW' figure in the cfd source text is unverified
- ECCC CWEC 2020 download page (collaboration.cmc.ec.gc.ca): not fetched; the edition is taken from the local file header (CWEC2011 format, years 2000–2017), which matches the register

**register-q5**

- https://www.energy.gov/node/849241: direct WebFetch refused (provenance) on the first try; fetched successfully after it appeared in search results
- http(s)://www.cer-rec.gc.ca/en/data-analysis/energy-markets/province-territory-energy-profiles/british-columbia.html: redirect loop (https→http 302 repeatedly), so BC capacity 15,953/18,514 MW and 71.7 TWh are unverified
- EPCOR 2021 Edmonton water quality report (Rossdale avg 170, E.L. Smith 169): not fetched, unverified; 2026 YTD 177.8 confirmed but the monthly PDF does not split by plant
- DCRE 2 L/kWh WUE cap: no source found by search

**register-q6**

- https://www2.gov.bc.ca/gov/content/environment/climate-change/data/electricity — WebFetch refused (URL not in provenance set); the BC 22.8 / 9.9 tCO2e/GWh figures were not re-checked against the live page, only against sources/04 and sources/14
- https://www.epa.gov/system/files/documents/2025-04/c03s04_april2025.pdf — WebFetch permission not answered; AP-42 Table 3.4-1 values checked only against sources/15d quotes and recomputed conversions
- CSA B805:22 — not held locally, no URL in sources (paywalled standard); runoff coefficient 0.8 cannot be verified
- ECCC NIR Annex 6 (diesel 2.681 kg CO2/L) — not held locally, no cited URL; unverified

**register-q7**

- https://www.delltechnologies.com/asset/en-us/products/servers/briefs-summaries/poweredge-r760-life-cycle-assessment.pdf — fetch permission not granted (PROVENANCE_REQUIRED, timed out)
- https://zenodo.org/records/14268168 — PROVENANCE_REQUIRED (used local workbook copy instead)
- https://info.hoffman-hoffman.com/hubfs/CAT624.pdf — PROVENANCE_REQUIRED; Daikin 96–100 dBA unverified
- https://mta-sts.brighton-hove.gov.uk/sites/default/files/2021-05/OD65%20ILP-Guidance%20Note%201%202020.pdf — PROVENANCE_REQUIRED
- https://www.copeland.gov.uk/sites/default/files/planning-applications/guidance_notes_for_the_reduction_of_obtrusive_light_2020.pdf — fetch error
- CLF 461 kgCO2e/m² source — no URL in register; CLF benchmark report pages reached show no figures
- Cummins S-1443, Climaveneta i-FX, Kelvion, mtu DS2250, Stulz, Olds/Burlington NIAs — not fetched (not in provenance set); register values checked only against sources/08_plant_sound_power.md

**register-q8**

- https://bigladdersoftware.com/epx/docs/9-0/input-output-reference/group-internal-gains-people-lights-other.html — WebFetch refused it (URL not in provenance set). I checked the same table in the 8-2 version of the docs instead: 108/126/207/180 W confirmed, based on 2005 ASHRAE Fundamentals Table 4 p. 8.6.
- https://zoningbylaw.edmonton.ca/ — not fetched. I used the local copy of Bylaw 20001 (uploads/Claude Link/Bylaw20001.zip, unzipped to /tmp/q8bylaw), so later amendments are not checked.
- BC Group Lodging Operational Guidelines (Province of BC) — no URL found. I used the JIBC Intro to Group Lodging page instead.
- GP1 'Formulas sheet' and 'Bins sheet' (cited by ess, solar, bins) — no local copy found, so the offerable_area source (bins) could not be checked. Its conf 20 'judged' does match the scale.

**register-q9**

- https://oee.rncan-nrcan.gc.ca/publications/statistics/trends/2020/residential.cfm — WebFetch permission request not answered (NRCan Trends 2020 95.7 GJ/household and 61% space heating not checked)
- https://www.ordersdecisions.bcuc.com/bcuc/decisions/en/521940/1/document.do — WebFetch provenance block (Senakw 10,343 kW / 11,218 MWh not re-checked; other BCUC figures rely on sources/14)
- https://oee.nrcan.gc.ca/corporate/statistics/neud/dpa/showTable.cfm (CEUD per-activity Tables 15/17/19) — provenance block; local copies hold Table 3 only
- energycarbonreport.vancouver.ca map — not attempted; heat intensities 0.24/0.32/0.26 GJ/m² come from J.B. screenshots (derived arithmetic in data/vancouver_energy_report.json checked: 4.88, 2.50, 0.90 GWh; heat/non-heat 15.0%, 22.4%, 18.1%)

**register-q10**

- https://www.cetjournal.it/cet/23/105/039.pdf: WebFetch permission request not answered (Gurreri 217 kWh/kgDW unverified at the source)
- https://www.gov.mb.ca/agriculture/crops/crop-management/print,energy-calculations.html: permission not answered (Manitoba 2.1 GJ/m², and whether it is measured or calculated)
- https://ccacoalition.org/sites/default/files/resources//Oeko-Institut_Black_Soldier_Flies_20220516_final.pdf: permission not answered (3,404 kWh/t, p.5, UBA attribution)
- https://link.springer.com/article/10.1007/s11367-021-01980-4 and /doi/ variant: permission not answered or fetch error (Dreyer 10.38 MJ/kg)
- https://kamk.fi/wp-content/uploads/2025/11/ESITYS_Hukkalampo-kalankasvatuksessa-KAMK-Webinar-Pasi-Laajala-Luke-29.10.2025.pdf: permission not answered (Luke 4.6 GWh, 15.5 °C)
- IESO Greenhouse Energy Profile Study, FAO trout sheet, DFO SAR 2008/001, root-zone and Giacomelli pages: not attempted after the five fetches above all failed on permission; checked only against sources/06 and sources/10

**register-q11**

- https://zoningbylaw.edmonton.ca/part-5-general-development-regulations/580-parking-access-site-circulation-and-bike-parking (WebFetch refused: URL not in provenance set; did not appear in search results)
- https://ens.dk/media/6448/download (DEA ch.140 pit storage; WebFetch provenance refusal, not found via search)
- https://council.vancouver.ca/20210706/documents/r4.pdf (vanDCFC; not surfaced by search, WebFetch provenance refusal)
- NRCan/Dunsky EV charging infrastructure report (dunskyNRCan2024) not re-read in this pass
- INL and UCLA Luskin reports (inlL2_2015, uclaWorkplace) not re-read; pending-build sources

**register-q13**

- https://www.cdn.fortisbc.com/.../rateschedule_3.pdf (WebFetch provenance block; could not confirm the Rider 5/6/8 breakdown of $9.12 vs $9.305 — the FortisBC one-page sheet confirmed only the all-in $9.305)
- https://www.fortisbc.com/accounts/billing-rates/natural-gas-rates/business-rates (page returned navigation only)
- https://www.fortum.com/fi/.../avoin-kaukolampo-ostohinnat (provenance block; €11–50 relied on sources/03 report)
- https://cbhcc-cchcc.ca/eng/public-review/2023_2/pcfs/necb20_divb_appc_001732.html (provenance block; Edmonton 5,120 not re-checked)
- https://www.mdpi.com/1996-1073/13/14/3551 first attempt blocked; reached on second try after search
- ATCO Gas North 2026 rate schedule ($1.045/GJ Mid Use) — not located
- Forsyningstilsynet 2026 surplus-heat price cap — not located (2025 value 95 DKK/GJ confirmed)

**register-q14**

- https://energiforsk.se/media/28252/verktygslada-for-prosumtion-inom-fjarrvarme-energiforskrapport-2020-681.pdf — WebFetch permission request not answered (provenance); could not check the '10 yr + 5 yr option' contract term
- https://www150.statcan.gc.ca/n1/pub/46-28-0001/2024001/article/00001-eng.htm — provenance block on the /n1/ path; the same article was read at /pub/46-28-0001/2024001/article/00001-eng.htm instead (same StatCan host, found by WebSearch)
- https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1110022201 — returned an unrelated table page (98-10-0057-01); $2,535 not confirmed
- https://www150.statcan.gc.ca/n1/daily-quotidien/220713/mc-d002-eng.htm — 'website is currently unavailable'
- https://energypoverty.ca/ — CUSP tool removed (per register, 13 Oct 2026); not re-fetched
- Lygnerud & Werner 2018 (Energy 151) and Wahlroos et al. 2018 (RSER 82) full texts — paywalled; no local copy found under outputs/ or uploads/; figures accepted only as recorded in sources/10 from J.B.'s uploads, not independently re-read

**register-q15**

- https://www.aeso.ca/assets/Uploads/projects/2582/EDTI-Distribution-Deficiency-Report-2025-Updated.pdf — WebFetch permission request not answered (PROVENANCE_REQUIRED); Woodcroft peak 66.2 vs 74.2 MVA left unresolved
- https://www.aeso.ca/assets/Uploads/grid/April-2026-Connection-Process-Performance.pdf — not in provenance set; 86/134 wk not re-read
- https://link.springer.com/content/pdf/10.1007/978-3-031-01761-2_6.pdf — not in provenance set; Barroso Table 6.1 and §6.5 checked only against sources/10_jenna_uploads.md
- https://handbook.ashrae.org/Handbooks/A15/IP/A15_CH37/a15_ch37_ip.aspx — not in provenance set; ASHRAE medians unverified
- AESO Connection Project List October 2026 full Excel — not in data/ (only a partial extract), so the 56 / 23,549 MW counts could not be recounted
- data/raw/bchydro/emerging_industries_connections_2026-10.pdf — text layer garbled, Call for Demand figures not re-read
- data/Alta_Reg_117_2026_Data_Centre_Regulation.pdf — text layer garbled; used data/raw/ab/alta_reg_117_2026.txt (King's Printer extract) instead

**register-q16**

- https://media.auc.ab.ca/prd-wp-uploads/2021/12/24116_X_Distribution-System-Inquiry-Final-Report_000839.pdf — WebFetch refused (provenance); search didn't surface it; no local copy
- AUC Bulletin 2026-03 (17 Apr 2026), cited in noise_limit coef — not checked; no local copy
- https://tiaonline.org/?p=16534 (TIA-942) — not fetched; proxy role only

**register-q17**

- https://www.alberta.ca/datacentres/grid: WebFetch refused (PROVENANCE_REQUIRED). Could not confirm the abGridPage quote ('front of the connection line'; 1,200 MW fully allocated) used as cfd_score's parity source.
- https://www.aeso.ca/grid/connecting-to-the-grid/large-load-projects: not fetched. aeso source string (970 + 230 MW; Edmonton load ≈ 1,400 MW; 1,600 MW BYOG) not rechecked in this unit.
- https://apps.nrs.gov.bc.ca/gwells: not fetched. Used J.B.'s local GWELLS export (well.csv dated 2026-10-10) instead.
- Primary papers for nonComp (Munda; Cinelli et al. 2014; Rowley et al. 2012): not opened. Only the handoff citation was checked.

**register-q18**

- https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/37_2016: WebFetch refused (URL not in provenance set); not fetched through any other host. BC fees taken from sources/14 only.
- https://www2.gov.bc.ca/assets/gov/environment/air-land-water/water/waterquality/water-quality-guidelines/approved-wqgs/temperature-or.pdf: WebFetch refused (provenance); BC marine ±1 °C not re-verified
- https://www2.gov.bc.ca/.../burrard_inlet_physical_parameters_report.pdf: not fetched (provenance); 'No further increase' not re-verified
- https://ccme.ca/en/res/temperature-marine-en-canadian-water-quality-guidelines-for-the-protection-of-aquatic-life.pdf: not fetched (provenance)
- https://www.toronto.ca/legdocs/2000/agendas/council/cc/cc000607/wks12rpt/cl004.pdf: not fetched (provenance); Enwave 4 °C / ≤13 °C not re-verified
- https://www.alberta.ca/datacentres/water: not fetched (provenance)
- https://metrovancouver.org/boards/GVSDD/SDD_2022-Jul-29_AGE.pdf: not fetched; North Surrey 6 MW not re-verified
- https://metrovancouver.org/services/liquid-waste/Documents/sewage-waste-heat-recovery-policy.pdf (the register's URL): provenance refusal. Verified UT-008 instead at https://metrovancouver.org/boards/Policies/sewage-and-waste-heat-recovery.pdf (Metro Vancouver's own site, found by search). The register URL itself was not confirmed live.
- Edmonton Bylaw 19627 primary text: not found by search

**register-q19**

- https://council.vancouver.ca/20251112/documents/spec1a.pdf — WebFetch refused (URL not in provenance set); no local copy found in data/
- https://www.bchydro.com/toolbar/about/strategies-plans-regulatory/rate-design/self-generation-rate-updates.html — not fetched (provenance); verified against the local tariff PDF text data/raw/bchydro/tariff.txt (RS 2289/2290) instead
- https://www.epcor.com/content/dam/epcor/documents/rates/distribution-access-service-tariffs/2026-01-distribution-access-service-tariff.pdf and the SAS tariff — not fetched (provenance); EPCOR DAS/SAS figures not independently verified
- https://www.fortisalberta.com/docs/default-source/default-document-library/rates-options-and-riders-schedules-effective-october1-2026.pdf — not fetched (provenance); Rate 63 figures and effective date unverified
- https://metrovancouver.org/boards/Policies/interim-reclaimed-water.pdf — not fetched (provenance); relied on sources/14 quote

**register-q20**

- https://vancouver.ca/files/cov/vancouver-development-building-permit-fees.pdf: WebFetch refused (PROVENANCE_REQUIRED); no local copy; WebSearch did not return the file

## Coverage

Checked = items each unit examined. Flags = flags it raised (all severities).

| Unit | Checked | Flags |
|---|---:|---:|
| register-q1 | 52 | 20 |
| register-q2 | 52 | 21 |
| register-q3 | 48 | 20 |
| register-q4 | 46 | 16 |
| register-q5 | 34 | 12 |
| register-q6 | 64 | 16 |
| register-q7 | 44 | 18 |
| register-q8 | 34 | 13 |
| register-q9 | 52 | 14 |
| register-q10 | 46 | 15 |
| register-q11 | 38 | 16 |
| register-q12 | 38 | 13 |
| register-q13 | 52 | 16 |
| register-q14 | 67 | 17 |
| register-q15 | 52 | 18 |
| register-q16 | 58 | 13 |
| register-q17 | 41 | 10 |
| register-q18 | 48 | 21 |
| register-q19 | 52 | 13 |
| register-q20 | 52 | 21 |
| register-q21 | 46 | 15 |
| register-q22 | 64 | 15 |
| register-q23 | 62 | 14 |
| register-q24 | 46 | 17 |
| register-q25 | 64 | 19 |
| register-q26 | 38 | 13 |
| register-q27 | 58 | 16 |
| register-q28 | 31 | 13 |
| register-c1 | 31 | 9 |
| register-c2 | 38 | 10 |
| register-c3 | 41 | 14 |
| register-c4 | 34 | 16 |
| register-c5 | 24 | 9 |
| register-c6 | 46 | 15 |
| register-c7 | 36 | 17 |
| register-c8 | 58 | 18 |
| register-c9 | 46 | 19 |
| register-c10 | 24 | 9 |
| opps-1 | 46 | 20 |
| opps-2 | 46 | 18 |
| opps-3 | 48 | 12 |
| opps-4 | 38 | 15 |
| opps-5 | 58 | 19 |
| addons-1 | 46 | 18 |
| addons-2 | 52 | 20 |
| addons-3 | 46 | 15 |
| addons-4 | 42 | 13 |
| addons-5 | 34 | 10 |
| addons-6 | 27 | 12 |
| precedents-1 | 96 | 10 |
| precedents-2 | 135 | 14 |
| precedents-3 | 19 | 9 |
| precedents-4 | 134 | 8 |
| precedents-5 | 31 | 6 |
| precedents-6 | 68 | 10 |
| precedents-7 | 143 | 13 |
| precedents-8 | 132 | 9 |
| precedents-9 | 143 | 9 |
| precedents-10 | 150 | 8 |
| sources-01_ | 74 | 18 |
| sources-03_ | 48 | 14 |
| sources-05_ | 64 | 17 |
| sources-07_ | 46 | 17 |
| sources-09_ | 87 | 14 |
| sources-11_ | 46 | 8 |
| sources-13_ | 78 | 14 |
| sources-15a | 68 | 16 |
| sources-15c | 74 | 21 |
| sources-16_ | 64 | 15 |
| sources-18_ | 68 | 13 |
| sources-20_ | 46 | 8 |
| sources-22_ | 38 | 11 |
| sources-24_ | 68 | 14 |
| code-engine-a | 82 | 21 |
| code-engine-b | 46 | 13 |
| code-engine-c | 82 | 19 |
| code-plant | 64 | 15 |
| code-cards | 46 | 14 |
| code-addons-code | 112 | 20 |
| code-opps-code | 96 | 29 |
| code-compare | 64 | 16 |
| code-decide | 62 | 20 |
| code-explain | 64 | 19 |
| code-extras | 96 | 16 |
| code-site-index | 64 | 16 |
| code-flow-report | 62 | 10 |
| code-scene3d | 46 | 17 |
| recomp-ex0 | 68 | 18 |
| recomp-ex1 | 64 | 16 |
| recomp-richards | 68 | 13 |
| recomp-van2 | 74 | 14 |
| runtime-van | 54 | 14 |
| runtime-edm | 410 | 19 |
| runtime-answers | 890 | 12 |
| consistency-a | 92 | 22 |
| consistency-b | 74 | 15 |
| consistency-c | 420 | 26 |
| parity | 48 | 29 |
| data-receivers | 46 | 18 |
| data-census-streets | 58 | 15 |
| data-pv-weather | 132 | 10 |
| data-lidar-tiles | 46 | 12 |
| **Total (102 units)** | **7690** | **1547** |

## What this sweep did not check

- **Minor flags (729) and notes (481) were not verified.** They are raw and may be wrong. See `audit/raw_findings_unverified_2026-10-17.json`. Minor items listed above are only those a skeptic confirmed while checking a critical or major flag.
- **No web access overnight.** Every figure that rests on a primary web page in the unreachable list is unverified at source.
- **One skeptic per flag.** Confirmed means one independent check agreed, not two.
- **Recomputed fixes are not checked against each other** where units disagree. Example: M14 (month ratio) has two sets of corrected values depending on the share definition.
- **Operator and vendor figures** (precedents, spec sheets, utility pages) were checked for correct quoting, not for truth.
- **No fixes were applied.** Nothing in tool/ or the registers was edited.
- **BC Assessment raw data** was not opened (licence).
- Units with zero confirmed critical or major findings in this report (for example data-pv-weather, precedents-5, precedents-9, precedents-10, sources-11_, register-q8, register-c2, register-c5) still raised flags. Any of their flags not listed here were minor or notes (unverified), or were refuted, downgraded or sent to the web list.

---

## Web checks done with J.B. (18 Oct 2026)

| # | Result | Change |
|---|---|---|
| Fan et al. 2007 (M94) | Confirmed: the real data centre averaged 59.5% of "actual peak" (sum of each machine's measured maximum); its observed peak was 71.9%, so average ÷ observed peak ≈ 0.83 (Table 3, s. 4.3–4.5). | 0.6 kept; label changed to "average ÷ the servers' combined maximum power" in register, opps.json, extras. Tool calls servers × PUE "full load". |
| 1 Uptime 75% | Confirmed: 75% of respondents use perimeter air cooling (Cooling Systems Survey 2025, n = 512, choose all that apply). | decide.js wording made exact. |
| 2 FortisBC Rate 3 | Checked against the schedule PDF J.B. downloaded: every per-GJ charge totals $9.305/GJ (incl. Riders 5, 6, 8). The tool was right; the research report had left out Rider 6. | Register and research note aligned to $9.305 (≈ $39.4/MWh heat at 85%). |
| 3 By-law 4548 s. 7 | Confirmed: no outdoor light casting light directly onto a residential window across the street or adjacent **and** unreasonably disturbing the neighbour. | Tool and register now state it. |
| 4 RVO 4.38 MWh/m² | Confirmed: per m² of server-room floor, not gross floor; IT vs total not stated; "an order of magnitude". | Register corrected. |
| 5 Silber 2024 | Confirmed: SF 0.5 "in most cases" for fast-charging sites. Also confirmed the sweep's formula error: stalls = P ÷ (SF × P_charger). | EV stalls now 52–270 per MW (SF 1 to 0.5), with the transfer to Level 2 stated. |
| 6 Edmonton ULA fees | Published (2025): inspection $356.64 / $570.63 / $1,560.31, + $2.67 per m over 20 m; pavement degradation $2.59 per m, one-time. | Register corrected (one-time vs Vancouver's yearly fee noted). |
| 7, 10 Zurmuhl 2018 | Confirmed: 760 m is the ground-only economic optimum (base 1,248 m); the hybrid only reused 760 m; no W/m stated (derived). | Register label corrected. |
| 8, 9 Trane RTAF | Confirmed: HSE table p.13; 1,010 kW (size 280) is 98 low-noise / 101 standard; size 245 printed 107 / 103, out of line with neighbours. | Per-unit sound power at ~1 MW now 98–101 (was 91–101) everywhere; register notes size 245. |
