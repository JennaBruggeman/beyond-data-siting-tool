This updates the Vancouver site analysis for GP2 (275 1st Ave E, V09). It **replaces** the earlier `PROMPT_site_analysis.md` for V09. Use that file only for its data descriptions (what's in the folder) and its data rules. **`SITE_LEDGER_2026-10-25.md` overrides any older figure.** The Edmonton site is now E06 (`PROMPT_site_analysis_E06.md`); 8803 Stadium Rd is dropped.

**This is a site analysis, not a building design.** The building is GP2's work and isn't designed yet.
- **Don't draw a data centre on the site:** no massing, no plan, no section of a building.
- **Do show:** the exchanges, the money, the adjacencies, the site rules, and the **qualities a data centre here would need** to make each exchange possible.
- Any program is **speculative and graphic**, never a plan.

Use the same spread structure as E06 so the two sites compare page for page. Propose the spreads (title plus a one-line plan each) before drawing.

## The pairing

| | Edmonton, E06 ("grow") | Vancouver, V09 ("join") |
|---|---|---|
| What's scarce | Heat demand, for now | Land and power |
| Network | Young ambient loop (8–32 °C), no heat pump | Mature hot network (NEU, at least 65 °C), heat pump needed |
| How it would share | Over time | At the same time (stacked) |
| Heat money | Pays if the tie-in is close | **Doesn't pay under today's tariff** |
| The exchange to lead with | Heat | **Power and space** |

## The site (from the ledger)

- **Lot:** about 7,850 m² (legal area needs the land title plan).
- **Existing building:** 1956. It covers 36 % of the lot in the 2009 data, **about 60 % if two 2022 LiDAR outlines are real** (unverified).
- **Zoning, I-3 sub-area A:**
  - data storage conditional, sub-area A only;
  - **no data storage on the ground floor** "except for entrances";
  - first floor at least 6.0 m; floors above at least 4.0 m;
  - height 18.3 m outright, up to 30.5 m or 45.7 m at the City's discretion;
  - floor area up to 3.0 × the lot (about 23,550 m²); the extra 2.0 doesn't apply to storage;
  - yards: front 0.6 m, side 7.6 m, rear 3.1 m, with more above 18.3 m; max 61 m wide and deep.
- **Public uses allowed** (I-3 s. 2.1): Arts and Culture Event outright (at most 6 days a month). Conditional: community centre, social service centre, child care, hall, fitness, farmers' market, Restaurant Class 1, urban farm.
- **NEU:**
  - inside the service area, about 220 m from the edge; new buildings must connect unless exempted;
  - network at least 65 °C; building return at most 45 °C;
  - no published terms for feeding heat in;
  - credit $32.59/MWh, netted on the building's own bill;
  - levy $123,873 + $146/kW (2026), if it applies to a supplier.
- **Power:**
  - downtown feeders full by fiscal 2027; BC Hydro will use "temporary measures" to keep connecting; West End substation July 2032 (an application, not yet a BCUC decision);
  - large loads must curtail at least 10 % on 24 h notice (2026 Call for Demand, 10–145 MW);
  - electricity $67.90/MWh for energy, about $86.90 with the demand charge.
- **Neighbours:** Vancouver Detox Centre 146 m; Emily Carr 359 m; Centre for Digital Media 573 m; False Creek 596 m; nearest substation 604 m; Murrin substation 1.05–1.10 km.
- **Site maps v4:** V09 is in Vancouver's #1 area, stable in 99 % of 500 random weightings. Use the new `V09_pack.json`.
- **The folder's tool reports** say NEU heat pays. **They leave out capital costs; use the ledger.**

## What the booklet should show (same structure as E06)

**1. Adjacencies.** The NEU, the substations, Emily Carr and the Centre for Digital Media, the Detox Centre, False Creek, homes and studios nearby, truck routes. Give distances and what each link crosses.

**2. Site rules.** I-3 as a diagram of limits: the 6 m ground floor where data storage isn't allowed, 4 m upper floors, heights, floor area, yards. Plus the NEU's compulsory-connection rule and the downtown feeder limit. Rules, not a building.

**3. The exchanges.** One compact treatment per exchange (heat, energy, water, materials, people and place):
- what could be given and taken;
- with whom (named, with distances);
- how much;
- what would have to be true;
- what's ruled out;
- how sure.

Lead with **power**: curtailment, batteries, backup for neighbours such as the Detox Centre.

**4. The money.**
- Heat-pump route $37–59/MWh against the NEU credit ($32.59, netted on the bill) or gas parity ($39.40, only by negotiation). Verdict: doesn't pay today.
- Power: what curtailing at least 10 % means in MW and hours (144 h a year).

**5. Power over time.** The feeder freeze to 2032 against what a data centre could be allowed and could give back.

**6. Qualities the data centre would need,** as a list or diagram per exchange, marked **GP2 hypotheses**:
- **Energy:** a load sized to the power available; able to curtail; batteries that answer the grid; a backup-power role.
- **People:** the ground floor for public and production use (the zoning already requires it), a refuge room on backup power.
- **Heat:** liquid cooling, a heat exchanger at the boundary, a heat pump, a visible NEU connection room.
- **Water:** dry coolers.
- **Materials:** a dock for refreshes.

**7. A speculative program,** graphic only: proportions per MW (`DESIGN_BRIEF.md`) and the stacking logic the zoning implies (public ground, data above), drawn as a diagram. No plan, no layout, no massing on the site.

**8. A 3D model of the neighbourhood** for context only: the site highlighted, existing building shown as existing, no new building. OBJ or 3DM plus GeoJSON, local frame centred on the site; state the origin.

## Rules
As before. Don't make anything up; every number from the folder, the ledger or the library, with its source. Mark unverified items. The tool's results are trade-offs, not verdicts, and its re-run is pending. Raw BC Assessment data must not be sought. Booklet style. Canadian spelling. Short labels. Leave a "TEXT · J.B." box.
