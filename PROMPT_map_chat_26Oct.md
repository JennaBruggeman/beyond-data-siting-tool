Big update before my progress review on **Wednesday 28 Oct**. A lot has changed since you made the booklet (`Beyond_Data_booklet_white6_spreads_22Oct`).

Please read this whole prompt and the files it names (all in the connected Claude Link folder). Then send me a **page list**, with a title and a one-line plan for each spread, before drawing anything.

---

## 1. What changed

**The Edmonton site has changed.**
- 8803 Stadium Rd NW (E05) is dropped as a thesis site.
- The new Edmonton site is **E06: 74 and 64 Airport Rd NW**, two vacant lots at the edge of Blatchford, the City's new low-carbon neighbourhood on the old City Centre Airport.
- Vancouver stays **V09: 275 1st Ave E**.

**Why it moved (this is a finding, say it in the booklet):**
- A hand check found that at Edmonton's gas prices, waste heat sold into a hot network through a heat pump doesn't pay at any power price from 2021 to 2025. That was the route E05 relied on.
- Blatchford's district energy loop runs at 8–32 °C, so a data centre's heat can go in **with no heat pump**.
- The network decided the site.

**The thesis pairing is now "join vs grow":**

| | Edmonton, E06 ("grow") | Vancouver, V09 ("join") |
|---|---|---|
| What's scarce | Heat demand, for now | Land and power |
| Network | Young ambient loop (8–32 °C), no heat pump | Mature hot network (NEU, at least 65 °C), heat pump needed |
| How it would share | Over time | At the same time (stacked) |
| Heat money | Pays if the tie-in is close | Doesn't pay under today's tariff |
| Lead exchange | Heat | Power and space |

**The site-map method was corrected (now v4)**, because the old method couldn't see the problem above.

**All numbers for both sites were checked against primary sources.** Several were wrong.

## 2. Files, in reading order

1. **`chosen_sites/SITE_LEDGER_2026-10-25.md`**: checked numbers for both sites. **It overrides any older figure anywhere**, including the V09 tool reports.
2. **`site_maps/METHODS.md`** (sections Method v2, v3, v4), **`site_maps/factors.csv`**, **`site_maps/networks_v2.json`**: the corrected method.
3. **`chosen_sites/E06_74_64_Airport_Rd_NW/`**: the new site's data pack and `README.md` (read its data gaps).
4. **`chosen_sites/V09_275_1st_Ave_E/`**: as before, with a new `V09_pack.json`.
5. **`chosen_sites/DESIGN_BRIEF.md`**: the design qualities behind each exchange, and plant space per MW.
6. The old map prompts (`PROMPT_for_map_chat.md`, `PROMPT_site_analysis.md` and the addenda), for data descriptions and style only. **Where they differ from this prompt, this prompt wins.** The files `PROMPT_addendum_method_v4.md`, `PROMPT_site_analysis_E06.md` and `PROMPT_site_analysis_V09_update.md` repeat parts of this prompt in more detail.

---

## 3. The site maps: method v4

**What changed and why**
1. **Heat is scored by whether it pays, not by demand alone.** The old maps gave any cell inside any network a heat score of 1.
   - Each route now carries a "pays" factor (value ÷ cost, capped at 1).
   - Direct to buildings: Edmonton 0.34, Vancouver 0.94.
   - Networks: the score falls with the pipe cost to reach them. Steam (Creative Energy downtown) = 0. Planned networks (Edmonton downtown Phases 2–4) × 0.5.
   - Blatchford's outline now follows the bylaw map.
   - Edmonton people now include homes built since the 2021 census.
2. **Already built (site factor):** a site loses up to 30 % as its 100 m cell fills with buildings.
3. **Public uses the zone allows (people factor):** people × (0.5 + 0.5 × uses), from each zone's use table.
   - Edmonton: BE 1.00, IM 0.25, IH 0.
   - Vancouver: I-2 0.50, I-1C 0.58, I-3 0.50, FC-2 0.67.
4. **Zoning is a gate, not a bonus.** Allowed and case-by-case both count 1.0; site-specific 0.5; rezoning 0.1.

Changes 2–4 were added after seeing that they favour E06. They apply to every cell in both cities, and the earlier versions are kept for comparison (`site_maps/v1_2026-10-21/`).

**Results (zoning counted)**

| | Before (21 Oct) | Now (v4) |
|---|---|---|
| Vancouver #1 area | 225–245 E 2nd Ave / 275 1st Ave E | Same (stability 100 %) |
| V09 (cell) | #2 of 9,856 | #5–6; stability 99 %; in the #1 area |
| Edmonton #1 area | 8803 Stadium Rd NW | **Blatchford's south edge** (#1 with equal and heat-priority weights, #2 with spread) |
| E06 (cells) | #119–122 of 34,428 | **#3–7** (#13 with spread); stability 51–53 % |
| 12003–12025 Kingsway | #21 | #6 (equal), #10 (heat-priority) |
| 8803 Stadium Rd (E05) | #1 | #23 |
| 12503 66 St NW | top five | #65 |

**Land-checked lists (use these for S12, as on 22 Oct).** `realistic_top5.csv` re-run on v4: only cells with at least 2,000 m² of land zoned allowed or case-by-case.
- **Vancouver #1** is still **302 Industrial Ave / 235 1st Ave E**, the same cell as the S2/S3 example, so those spreads stay valid. V09 is #3–4 of 295 land-checked cells.
- **Edmonton #1** is **11720 Kingsway NW** (BE, 2,533 m², 1969 building), about 200 m from E06 on Blatchford's edge. E06's 64 Airport Rd cell is #2–5 of 3,088 land-checked cells; the 74 cell is #5–10.
- 11440 Kingsway (1,828 m²) fails the land check.

**Top five areas, v4, equal weights (cells, not land-checked)**
- **Edmonton:** 1 Blatchford's south edge (best cell 11440 Kingsway; E06 about 370 m away); 2 8635 Stadium Rd NW; 3 4999 98 Ave NW; 4 5703 125 Ave NW; 5 10008 166 St NW.
- **Vancouver:** 1 225–245 E 2nd Ave (next to V09); 2 1342 Georgia St E / 636 Clark Dr; 3 1525 Coal Harbour Quay; 4 8729 Aisne St; 5 1661 Granville St.

**Known limits** (put these in a small note):
- The screen works in 100 m cells, not lots, and doesn't check lot size. 11440 Kingsway is only 1,828 m², too small for a data centre.
- The Blatchford outline is approximate at its southeast corner.

**Honest labels**
- **E06:** "In Edmonton's #1 area; its cells rank 3rd–13th of 34,428 depending on the weighting."
- **V09:** "In Vancouver's #1 area, stable in 99 % of 500 random weightings."

**Map label on every sheet:** "Screen, method v4 (26 Oct 2026): heat scored by whether it pays; existing buildings and permitted public uses counted; zoning as a gate. The tool itself has not yet been re-run with these fixes; results may shift."

**New data fields** in `<city>_grid.geojson`:
- `heat_net_best` (which network);
- `heat_net_term`;
- `built_cover` and `site_ready` (already built);
- `public_uses`.

Peaks are in `<city>_peaks.geojson`; rankings in `top_sites.csv`, `weighting_top5.csv` and `weighting_summary.json`.

---

## 4. The booklet: consolidate the simulation section

Keep the graphic style exactly as it is. The simulation section goes from **24 spreads to 16**.

**S1–S11 stay, updated in place**
- **S1–S3:** unchanged apart from the method label.
- **S4 The rules:** add the four v4 changes, in the same diagram style.
- **S5 Zoning:** show the gate. Add a small **"already built"** inset map (`built_cover`).
- **S6 Heat:** recolour from the new `heat`. Legend by network type (ambient, hot water, steam, planned). One line: "scored by whether it pays".
- **S7–S9:** recolour from the new data.
- **S10 People:** recolour. Add a small **"public uses the zone allows"** inset map (`public_uses`).
- **S11 Where they overlap:** recolour, new peaks.

**S12–A3 (13 spreads) become 5**

| New | Title | Replaces | What's on it |
|---|---|---|---|
| S12 | The shortlist | S12, S17, S19 | Top five areas per city on the map. One table per city: score, stability, lead over the next, rank in each weighting. |
| S13 | How the weighting changes it | S15, S16, S18 | Three small maps per city (equal, heat-priority, spread). Rezoning candidates as a short margin list. |
| S14 | Can it be built there? | S13, S14 | Lot size against the size needed, and what stands on the land. Name the cell-vs-lot limit. |
| S15 | What changed | A1–A3 | Before and after, v1 (21 Oct) vs v4 (26 Oct). One line per change and why. State that three changes were added after seeing they favour E06, and are applied city-wide. |
| S16 | What throws it off | S20, S21 | The S21 tiles, each marked **fixed in v4** or **still open**. Fold in S20's key point (Edmonton water tells only 12 % of the city apart). |

---

## 5. The two site analyses

**This is a site analysis, not a building design.** The building is GP2's work and isn't designed yet.
- **Don't draw a data centre on either site:** no massing, plan or building section.
- **Do show:** the exchanges, the money, the adjacencies, the site rules, and the **qualities a data centre would need** to make each exchange possible.
- Any program is **speculative and graphic**, never a plan.

**Use the same structure for both sites** so they compare page for page. Propose the spreads (about 6–8 per site, your call).
1. **Adjacencies:** what's nearby, how far, and what each link crosses.
2. **Site rules:** zoning limits drawn on the empty lot, plus network and grid rules. Rules, not a building.
3. **The exchanges:** one compact treatment each (heat, energy, water, materials, people and place):
   - what could be given and taken;
   - with whom (named, with distances);
   - how much (range and units);
   - what would have to be true;
   - what's ruled out and why;
   - how sure (trust).
4. **The money.**
5. **Over time.**
6. **Qualities the data centre would need,** per exchange, marked **GP2 hypotheses**.
7. **Speculative program:** proportions per MW (`DESIGN_BRIEF.md`) and what must sit next to what, as diagrams only.
8. **3D neighbourhood model** for context: site highlighted, no new building. OBJ or 3DM plus GeoJSON, metres, local frame centred on the site; state the origin.

### E06: 74 and 64 Airport Rd NW, Edmonton ("grow")

**Site**
- Lots 4,562.5 + 4,274.4 m², about 8,840 m², vacant gravel. Owner unknown.
- Centre 53.568862, −113.522429.
- Former airport land: expect an environmental site assessment.

**Zoning: BE** (Bylaw 20001 s. 2.120)
- Height 16.0 m; floor area ratio 1.6 (about 14,140 m²).
- Setbacks: 4.5 m to Airport Rd (collector), 6 m to a street or residential site, 0 m to other sites.
- A data centre isn't a listed use: discretionary, or argued as Minor Utility. Generators or big cooling plant read as Major Utility, which BE doesn't allow.
- Public uses allowed up to **500 m² each**: community, markets, entertainment, food, child care, urban agriculture.

**Blatchford**
- The site is **outside the utility's service area**, about 50 m across Airport Rd (Bylaw C17943 Sch. A). No compulsory connection, and no published terms for outside heat.
- Loop 8 °C minimum (winter) to 32 °C maximum (summer).
- Energy Centre One: 1 MW heating / 1 MW cooling (2023), expanding to 4.25 / 4 MW. "Over 100" homes (2024).
- Build-out: 46,789 MWh/yr heating (34.5 MW peak) and 43,747 MWh/yr cooling (46.6 MW peak).
- Two separate projects; don't add them together:
  - the Energy Centre One expansion to 4.25 MW heating / 4 MW cooling (2023–26 budget, $3.2M);
  - the $79.2M expansion ($23.7M federal, July 2024), adding 13.1 MW heating and 12.3 MW cooling.
- Sewer heat **deferred**; a $15.3M peaking energy centre comes first.
- Customer rate $35.80/MWh.
- **Open question:** does the loop gain or lose heat over a year? Show both readings from the ledger.

**Adjacencies**
- Blatchford row housing across Airport Rd.
- Edmonton Inn on Kingsway.
- NAIT 1.3 km; its Blatchford extension is to be served by Energy Centre One.
- Royal Alexandra Hospital 2.1 km.
- Substation 617 m.

**Data gaps**
- Blatchford's 210 post-2015 buildings are **missing** from the 3D data. Trace them from a current aerial or newer layer, and label the source and date. Don't estimate heights.
- Blatchford homes aren't in the heat-receiver list.
- The census lags.

**Money**
- No heat pump: **$5–15/MWh** to deliver winter heat at the boundary; more at a farther tie-in.
- Value unknown; the $35.80 customer rate is the ceiling.
- Beside it: Edmonton's heat-pump route costs $30–75/MWh against $13 of value at 2021–25 power prices, and fails. The carbon price that would close that gap is $108–238/t.
- 70 % of heating falls in Nov–Mar, but a data centre gives heat evenly all year.

**Over time**
- Blatchford's build-out against the share of a 3–4 MW data centre's heat that could be used (speculative, labelled).
- Possible clients: NAIT or City research computing (unconfirmed).

**Qualities (GP2 hypotheses)**
- **Heat:** liquid cooling; an exchanger at the boundary; **no heat pump**; its own full cooling for summer.
- **Energy:** grid-ready batteries; a load it can curtail.
- **Water:** dry coolers; a rain tank.
- **Materials:** a dock for refreshes; drive wiping on site.
- **People:** space that can host public uses, sized to the 500 m² cap; acoustic screening.
- **Land and time:** a shell built ahead of servers and lent until needed. Add **land and time** as its own exchange.

**Alternate to mention:** 12003–12025 Kingsway ranks well on the screen, but it's IM (no community, event or market uses), has two 1970s buildings on it, and sits across Kingsway from the loop.

**No tool reports for E06, on purpose.** The tool still assumes a heat pump for every network. Use the ledger, and mark anything tool-only as "tool re-run pending".

### V09: 275 1st Ave E, Vancouver ("join")

**Site**
- Lot about 7,850 m². The 7,791 and 7,803 figures come from the same City outline, measured with the tool's flat-map scale, which reads about 0.7 % low. The City record gives no area; the legal area needs the land title plan.
- Existing building from 1956. It covers 36 % of the lot in the 2009 data, about 60 % if two 2022 LiDAR outlines are real (unverified).

**Zoning: I-3, sub-area A**
- Data storage conditional; **none on the ground floor** except entrances.
- First floor at least 6.0 m; floors above at least 4.0 m.
- Height 18.3 m outright, up to 30.5 m or 45.7 m at the City's discretion.
- Floor area up to 3.0 × the lot (about 23,550 m²); the extra 2.0 doesn't apply to storage.
- Yards: front 0.6 m, side 7.6 m, rear 3.1 m.
- Public uses: Arts and Culture Event outright (at most 6 days a month). Conditional: community centre, social service, child care, hall, fitness, farmers' market, restaurant, urban farm.

**NEU**
- Inside the service area, about 220 m from the edge; new buildings must connect.
- Network at least 65 °C; building return at most 45 °C (NEU Connectivity Guidelines, May 2026; By-law 9552). This replaces 67/50 °C, an operator-reported inventory figure not found in a primary source.
- No published terms for feeding heat in.
- Credit $32.59/MWh, netted on the building's own bill.
- Levy $123,873 + $146/kW, if it applies to a supplier.

**Power**
- Downtown feeders full by fiscal 2027. BC Hydro will use temporary measures to keep connecting. West End substation July 2032 (an application, not yet decided).
- Large loads must curtail at least 10 % on 24 h notice, up to 144 h a year (2026 Call for Demand, 10–145 MW).
- Electricity $67.90/MWh for energy, about $86.90 with the demand charge.

**Adjacencies**
- Vancouver Detox Centre 146 m; Emily Carr 359 m; Centre for Digital Media 573 m; False Creek 596 m.
- Nearest substation 604 m; Murrin substation 1.05–1.10 km.

**Money**
- Heat-pump route **$37–59/MWh**, against the NEU credit (netted on the bill) or gas parity ($39.40, only by negotiation). **Doesn't pay today.**
- The folder's tool reports say it pays: they leave out capital costs, so use the ledger.
- Power: what curtailing at least 10 % means in MW and hours.

**Over time:** the feeder freeze to 2032, against what a data centre could be allowed and give back.

**Qualities (GP2 hypotheses)**
- **Energy (lead):** a load sized to the power available; able to curtail; batteries that answer the grid; backup power for neighbours such as the Detox Centre.
- **People:** the ground floor for public and production use (the zoning already requires it); a refuge on backup power.
- **Heat:** liquid cooling; an exchanger; a heat pump; a visible NEU connection room.
- **Water:** dry coolers.
- **Materials:** a dock.

**Speculative program:** the stacking logic the zoning implies (public ground floor, data above), as a diagram only.

---

## 6. Rules

- **Accuracy:** don't make anything up. Every number from the files, the ledger or the library, with its source; show any calculation. Mark what you can't confirm as unverified. Label operator or industry figures as claims. No popular sources (news, blogs, Wikipedia).
- **The tool's results are trade-offs, not verdicts.** The tool's own re-run with these fixes is pending; say so where it matters.
- **Data terms:**
  - Raw BC Assessment data must not be sought; use only the rounded values given.
  - Edmonton lot outlines are licensed and not in the folder; use assessment points and the 3D model.
- **Style:** the GP2 frame (32 mm left margin, 9 pt minimum text) and Graphic Standards v6 (Lato) adopted on 25 Oct, not the old Barlow white-booklet style. Keep the existing graphic language (maps, exchange colours, diagrams); re-set type and frame to GP2. Exchange colours: heat #d4202b, energy #f1b604, water #1f78c7, materials #2e9d4e, people #7b3fb4. Thin lines; plain and professional; nothing that looks AI-generated.
- **Writing:** Canadian spelling. Short labels, no long paragraphs. Leave a "TEXT · J.B." box where I'll write.
- **Output:** vector PDF and 300 dpi PNG per drawing, plus model files, named by site and drawing.

## 7. First reply

Send only:
1. the booklet page list (simulation section and both site analyses), with a title and a one-line plan per spread;
2. any file you can't find or any number that conflicts;
3. your questions (one at a time is fine).

Then wait for my OK before drawing.
