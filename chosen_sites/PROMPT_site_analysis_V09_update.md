This updates the Vancouver site analysis for GP2 (275 1st Ave E, V09). The earlier prompt `PROMPT_site_analysis.md` paired V09 with 8803 Stadium Rd. **The Edmonton site is now E06** (74 and 64 Airport Rd NW, see `PROMPT_site_analysis_E06.md`). Keep the earlier prompt's structure, data rules and style for V09, with the changes below. **`SITE_LEDGER_2026-10-25.md` overrides any older figure.**

## The pairing

The two buildings make one argument: **join vs grow**.

| | Edmonton, E06 ("grow") | Vancouver, V09 ("join") |
|---|---|---|
| What's scarce | Heat demand, for now | Land and power |
| Network | Young ambient loop (8–32 °C), no heat pump | Mature hot network (NEU, at least 65 °C), heat pump needed |
| How it shares | **Over time:** halls lent out, then taken back | **At the same time:** stacked and shared |
| Heat money | Pays if the tie-in is close | **Doesn't pay under today's tariff** |

## Corrections for V09 (from the ledger)

- **Lot:** about 7,850 m², not 7,791 or 7,803. Legal area needs the land title plan.
- **Zoning, I-3 sub-area A:**
  - data storage is conditional, sub-area A only;
  - no data storage on the ground floor "except for entrances";
  - first floor at least 6.0 m; **floors above at least 4.0 m**;
  - height 18.3 m outright, up to 30.5 m or 45.7 m at the City's discretion;
  - floor area up to 3.0 × the lot (about 23,550 m²); the extra 2.0 doesn't apply to storage;
  - yards: front 0.6 m, side 7.6 m, rear 3.1 m, with more above 18.3 m; max 61 m wide and deep.
- **Existing building:** 1956. It covers 36 % of the lot in the 2009 data, but **about 60 % if two 2022 LiDAR outlines are real**. Mark as unverified.
- **NEU:**
  - inside the service area, about 220 m from the edge;
  - network at least 65 °C; building return at most 45 °C (**50 °C is a building supply rule, not the return**);
  - no published terms for feeding heat in;
  - credit $32.59/MWh, netted on the data centre's own bill;
  - connection levy $123,873 + $146/kW (2026), if it applies to a supplier at all.
- **Heat money:**
  - heat-pump route costs **$37–59/MWh** with the demand charge;
  - it **doesn't pay under the published tariff**;
  - it pays only with a negotiated price near gas parity ($39.40) and low-end costs.
  - The tool report in the folder says the NEU route pays. **It leaves out capital costs; use the ledger instead.**
- **Power:**
  - downtown feeders are full by fiscal 2027;
  - BC Hydro says it will keep connecting customers with temporary measures; the West End substation is due July 2032;
  - this is BC Hydro's application, not a BCUC decision.
  - Large loads must curtail at least 10 % on 24 h notice (2026 Call for Demand, 10–145 MW). Electricity is $67.90/MWh for energy, about $86.90 with the demand charge.
- **Substations:** nearest 604 m (unnamed); Murrin 1.05–1.10 km (operating); East Vancouver 1.88 km (future).
- **Neighbours:** Emily Carr 359 m; Centre for Digital Media 573 m; False Creek 596 m; Vancouver Detox Centre 146 m.
- **Site maps v4:** V09 is in Vancouver's #1 area, stable in 99 % of 500 random weightings. Use the new `V09_pack.json`.

## The building: "space and power at the same time" (decided)

- **Size:** by the same rule as Edmonton, set by its client and the power available. Likely client: the Great Northern Way campus (Emily Carr, Centre for Digital Media), unconfirmed. Show the size the power supply allows during the feeder freeze. If you need a range, use the tool's 2.7–10.2 MW and mark the chosen size as J.B.'s to confirm.
- **A vertical hybrid:**
  - the **6 m ground floor** is permanent public and production space (studios, recording, making), since I-3 bars data storage there;
  - **data floors above**, at least 4.0 m each;
  - the **NEU connection room** made into a visible civic room at the street.
- **A good grid citizen:**
  - curtails load at peaks (at least 10 % on 24 h notice);
  - shares its batteries;
  - acts as a backup-power hub for neighbours such as the Detox Centre.
  - Power is the exchange the architecture expresses.
- **Heat:** join the NEU with a heat pump. Show it honestly: it doesn't pay today and depends on a deal with the City.

## Drawings

As in the earlier prompt (3D model, site maps, axonometric, the exchanges documented, program, plan and sections, specification sheet), plus **the GP2 drawing set shared with E06**:
1. a section;
2. the five exchanges;
3. the network over time;
4. the heat-interface detail;
5. an inhabited civic view;
6. the tool's numbers.

For Vancouver, put the **power exchange** first in the axonometric and the section: substation, batteries, curtailment, backup to neighbours. Use the same per-MW rules from `DESIGN_BRIEF.md`.

## Rules
As before. Don't make anything up; every number from the folder, the ledger or the library, with its source. Mark unverified items. The tool's results are trade-offs, not verdicts, and its re-run is pending: mark any tool-only figure "tool re-run pending". Raw BC Assessment data must not be sought. Booklet style. Canadian spelling. Short labels. Leave a "TEXT · J.B." box.
