# Two levels of equipment drawing: plan (J.B. 12 Nov 2026; plan only, after the hub.js work)

## Weaknesses and questions first
- **Transformer source (item 4): not settled from what's been read.**
  - The kit's figure, Eaton CA022021EN Table 14.1-20, is a *secondary unit substation* transformer: close-coupled to switchgear, 600 V class row (register `eatonCA022021`).
  - The hub's pads use CA08104001E, which `sizing.py` cites for *pad-mounted* cabinets ("cabinet + 4 in", the pool chat's reading). Neither document was re-read for this plan.
  - What decides it is what the hub's yard holds. The boards draw outdoor pads to BC Hydro ES54, and ES54 covers pads for pad-mounted transformers. So the pad-mounted catalogue is the matching *type*; a unit-substation figure fits a transformer bolted to the switchgear, in or beside the building.
  - But in Vancouver a pad-mounted unit on an ES54 pad is usually BC Hydro's own transformer, so its size would come from BC Hydro's standard, not Eaton. Edmonton would be EPCOR's.
  - **Recommendation:** read ES54's pad and transformer tables (already a register source) for the 2,500 kVA row first. Until then, use the pad-mounted figure (CA08104001E) in both the kit and the hub, so they agree, marked "?". Needs your OK, and it changes kit SPEC (flag for A2).
- **KD80 size (item 5) conflicts with the frozen hub.**
  - You give the enclosed KD80 as 3.2 × 1.2 × 1.7 m (Rehlko G12-625).
  - The hub's frozen `sizing.py` draws the KD80 at its 2.27 × 1.149 m skid, with the tank drawn at the set footprint (sub-base tank sizes not published).
  - If the kit uses the enclosure, the hub boards' set footprint and its clearances (generator tanks row) are 0.93 m short in length. Needs the hub chat (an amended freeze) or your call on which one the tool uses. I won't change the hub's figure on my own.
- **A2 (item 3):** I haven't seen design board page A2 in this session. Every SPEC change below is listed for you to carry into A2.

## Steps
1. **3D kit on Engineering only (item 1).** `scene3d.js`: `kitUnit()` (plant boxes drawn as kit models) and the hall fit-out (`put()` for UPS, batteries, CRAH, heat pumps and racks) run only when the open template is Engineering (`BD.f1` viewer template id `engineering`). Architecture, Municipal and Resident get the plain massing prisms already drawn when no kit model exists. Check: F1 gate screenshots of the 3D cards in all four templates; golden unchanged (no numbers change).
2. **Kit stills for the Engineering report (item 2).** A node script (`checks/tests/kit_stills.js`, run by you or me) renders each kit model the lot uses at one scale beside a 1.75 m person, white background, IBM Plex labels: name, size, count for this lot, source (SPEC). Output: PNG plus SVG labels into `Claude Link/reports/kit/<lot>/`, and one report page in the Engineering PDF. Count for this lot comes from the engine's equipment schedule.
3. **KD80 in the kit (item 5).** New SPEC entry `genset80` (enclosed, on its sub-base tank), size after you settle the conflict above; source Rehlko G12-625. The UPS entry stays as it is (Galaxy VX 3.6 m, 990-5451L).
4. **Transformer (item 4).** After your answer: SPEC `transformer` and the hub's pad (`hubchecks.js` TX table and hub.js) use one source.
5. **A2 list (item 3):** a short table of SPEC sizes as they stand (after steps 3–4), each with its source, for you to check A2 against: changed rows marked.

## Order
After hub.js steps 1–6 (step 1 done: `df152c2`), except step 1 here (Engineering-only kit), which is quick (about an hour) and can go in between hub.js steps if you want it sooner. Steps 3–4 wait on your two answers above.
