# Templates idea (J.B. and Xun) — notes, 19 Oct 2026

Not built yet. J.B. is sending ideas one at a time; build only after all are agreed.

## The idea
- The tool-logic diagram becomes the script that drives the tool, not only a picture of it.
- Three templates (like Grasshopper templates), each switching nodes on, off, or to a simpler stand-in.
- Fact nodes (bylaws, physics, measured data) are locked; only choice nodes switch.

## The three tiers (agreed)
| Tier | Who | Question it answers |
|---|---|---|
| Minimal | residents, laypeople | What does this mean for me? |
| Middle | councillors, community groups (also receivers, policy planners) | What does it mean for the neighbourhood and city; who gains and loses? |
| Full | engineers, architects, bylaw professionals | How is it calculated, and does it hold up? |

- The full template stays the master and keeps growing.

## How the cut is made
- Relevance: tag every node by who it affects (component by component, not whole categories). E.g. residents keep heat rate/bill, public costs passed through, local jobs; drop operator capex, pipe $/m, tariffs, payback.
- A cost only counts as reaching residents if a source shows the pass-through; otherwise "likely", labelled.
- Importance: sensitivity test against the full template (drop or simplify one node at a time, measure how outputs move; cut-offs set by J.B.). Re-run whenever the full template grows. Literature to read: Saltelli; Morris screening.
- Less detail = wider ranges, not a different answer; each card says what was dropped.
- No users yet: tags and reasoning are written down so a reviewer can check them.

## Decided (19 Oct, revisit if needed)
- Minimal tier cuts questions: only "where?" and maybe "how big?"; every assumed answer shown, sourced and changeable.
- Middle tier cuts the display; keeps the questions. Full tier: everything.
- Any user can ask for more detail: "show more" on a card steps that item up a tier.
- The diagram comes into the tool's interface and user path; the separate workflow map keeps being updated. Templates built in both, from one shared diagram data file.

- User path: landing page → choose a tier (first step) → city → site → setup. Tier can be changed later without losing the site.

- For now: templates only, no user rewiring. Long term: user-made templates may follow; build templates as data (node on / off / stand-in lists) with declared dependencies so that path stays open.

- Diagram also appears after the start (J.B. 19 Oct): beside the results, opening a card lights up the nodes and wires behind it; drawn at the tier's level of detail.

- Report changes by tier (agreed): residents a plain page or two (what affects them, what was assumed); community who gains and loses, money, approvals, comparisons; professionals the full report with each result's diagram path.

- Residents (19 Oct): one comparison per card (e.g. against a typical data centre), not all of them; Claude drafts plain-language names for J.B. to check.

- Residents' size (19 Oct): not asked upfront; default 2.5 MW in both cities (typical of in-city data centres built in Edmonton/Calgary 2.5 and Vancouver 2.1, operator claims; audit/typical_size_sources_2026-10-19.md), capped by what fits; shown in plain terms (building size, homes' worth of power); changeable: typical / middle / as large as fits.

## Open
- Vancouver and Edmonton may have different minimal sets; the diagram's city switch shows it.

## Build plan (19 Oct)
1. Tier data: templates.json — every node tagged with parties and the lowest tier that shows it (done: resident 30, community 95, full 156; draft, judged).
2. (done 19 Oct, tool v90) Tier step after the landing page; tier switch kept; residents' setup cut to where (and how big), other answers assumed, shown, changeable.
3. Diagram panel beside the results; opening a card lights its path; drawn at the tier's level; node click = formula, source, confidence.
4. Cards filtered by tier, with "show more".
5. Reports by tier.
6. Workflow map: same tiers from the same templates.json.
7. Sensitivity test against the full template; J.B. sets cut-offs; adjust tiers.
8. Full interface sweep.

## Research: data centres and household power bills (19 Oct, first pass)
- BC Gov release, 17 Mar 2025: rate stability direction, BC Hydro +3.75%/yr for 2 years; cites demand from "business and industrial development"; no data-centre link, no allocation between customer classes.
- BC Hydro news, 30 Jan 2026: competitive process for AI and data-centre power; says nothing on rates or who pays. The government release it points to could not be fetched (robots block; not circumvented).
- AESO 2025 Transmission Rate Outlook (Apr 2025): rate $43 → $57/MWh 2025–2034 with load 63.5 → 67.5 TWh; no attribution to large loads.
- AESO via The Energy Mix (2026): "the bridging load is anticipated to increase pool prices while reducing transmission costs" — an email to a reporter and a recorded session, not a published AESO document.
- Finding: no primary source read yet quantifies pass-through to households, and the direction is mixed (higher energy prices, lower per-unit transmission costs). Not added to the resident tier.
- Next to read if J.B. wants: BCUC BC Hydro large-load / rate-design evidence; AUC proceedings on AESO large-load tariff; Pembina 2026 backgrounder (advocacy, label as such).

## Research: household power bills (19 Oct, second pass — regulatory sources)
- BC Hydro, Transmission Customer Interconnection Policy, Workshop #2 (4 Mar 2026), slides 12–34: for transmission-voltage customers, revenue has so far exceeded reinforcement cost (F2021–25: ~$940 M revenue vs $450 M reinforcement, PV 20 yr). Modelled impact on all ratepayers by F2036 for one new customer of 75 / 100 / 150 / 170 / 250 MVA: no threshold +0.4 / +0.6 / +0.9 / +1.0 / +1.5 %; 150 MVA threshold 0 up to 150, −0.1 at 170, −0.6 at 250; 50 MVA threshold −0.1 to −1.2 %. Approaches for data centres "emerging". Utility document (policy options, not decided).
- AESO Update on Data Centres (Sep 2025): "Are large loads paying their fair share of transmission costs?" listed as an open Phase II question (ISO tariff contributions and demand rates); 20,000+ MW of data-centre load on the project list; "load is outpacing generation".
- AESO (2026, email to The Energy Mix; recorded session): bridging load expected to raise pool prices and lower transmission costs. Not a published document.
- LBNL (Jan 2025), Electricity rate designs for large loads: mechanisms (stranded assets, forecast error, avoided charges) and protections (minimum bills, exit fees, collateral, contributions); no quantified rate effect.
- Reading for the tool: a typical in-city data centre (~2.5 MW) is far below the 75 MVA cases; no source shows a measurable household effect at that size. For very large loads the effect depends on policy and is about ±1.5% or less in BC Hydro's own modelling. Proposed resident node: "Effect on household power bills" — qualitative, by size and province, sourced as above.

## Step 2 notes (19 Oct)
- Residents' size text gives the floor the servers need (same figure as the 3D label), not the zone's largest building. At "as large as fits" it gives the zone's floor and the MW range by rack packing.
- Sweep item: the engine caps size at 40 MW (Edmonton large lots hit it); the card says so.
- Homes'-power comparison not shown: no BC household electricity figure sourced yet.
- Tier card shows a thumbnail of the real diagram (stage columns and wires from diagram_data.json, via templates.json 'graph'); this tier's parts lit. Link to the full diagram (private artifact: others can't open it until shared).
- New 'Where?' card after the tier (own-site path): Vancouver and Edmonton side by side, each with its zoning bylaw and hours cold enough for full free cooling (CWEC, 3,284 / 5,522 h). Picking a city focuses the address search. Examples skip it (they set the city).

## Decisions 19 Oct (later)
- Heat payback: no 5-year line; years and cost per MWh over the parts' life (audit/payback_method_2026-10-19.md).
- Best set-up per exchange, on the exchange card; heat first (audit/heat_search_2026-10-19.md).
- Set-ups that open the most opportunities: top 3 by count, shown as counts (J.B. chose this over "no order"); counts treat every opportunity the same and the card says so (audit/setup_search_2026-10-19.md).
