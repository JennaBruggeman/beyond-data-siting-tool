# Architecture mode review (2 Nov 2026)

Independent review of tool/arch.js, scene3d.js `arch`, flow.js and tiers.js step changes, against checks/architecture_mode_notes_2026-10-30.md and register arch_placement, arch_space_budget, arch_heat_budget, arch_heat_lift, arch_secure_line, arch_rules, arch_compare. Nothing was edited.

Runs: `_arch_run.js` on E06A (refuge side by side), plus a copy in the scratchpad with the refuge under the hall and the box extents dumped.

Counts: high 6, medium 11, low 11.

Checked and correct: heat need (kWh/m²·yr × m² ÷ 1000; E06A gives 993.0–1,026.7 MWh, matches by hand); "% at most" (need high ÷ offered low); offered = engine `r.avail` (heat_delivered); space cap = min(lot × FSR high, buildable × floors) (E06A 7,310 = lot × 1.6 BE); no total score; no economics; four secure-line presets; refuge selector shows "choose…" with no default; heat buttons only in plan and section; hatched pattern where there is no temperature; leaders are right-angled; labels sit right of the drawing; every source id resolves in opps.json.

## High

1. **arch.js:74, 77–78. Packing makes programs smaller than their size, without saying so.** `fit()` caps depth at `z.len` and width at `z.W`, so the box is drawn at whatever area the zone has left. E06A: the pool (2,131 m²) is drawn at 10.7 × 20.0 = 213 m², and the fish farm (1,000 m²) at 428 m² (under-hall run). Space and Compare still count the full m². Fix: when `d*w < fp − 0.5`, move to the next zone, or split across rows/storeys. If it still does not fit, push a `bad` flag ("drawn at X of Y m²: does not fit here").

2. **arch.js:66, 77–82. Storeys ignore what is below.** Level-k zones start at base k × 6.0 m with `cur=0`, so they do not know about boxes already placed on lower levels. A level-0 box taller than 6 m collides with level-1 boxes in the same band (spa 3 × 6 = 18 m, conservatory 18 m, any storeys > 1). A short one (pool 3.5 m) leaves blocks floating. The same happens across the eight top zones. Fix: keep an occupancy record per band, (u, v) to top height. Set each box's base to the highest top under its footprint, and treat multi-storey boxes as filling every level they span.

3. **arch.js:91, 222. Save crashes when the refuge is under the hall.** The under-hall box has no `u` or `v`, and `snapshot()` reads `b.v[1]` because the refuge is `front` and `public`. Confirmed: TypeError "reading '1'" three times, `saved` stays 0. Fix: add `u:[…], v:[hv0,hv1]` to that box (and to roof boxes), or guard with `b.v?…:0`.

4. **arch.js:126 (with 116, 118). The refuge under the hall is always flagged "public but inside the secure line".** The test uses the plan centroid against the hall ring and ignores height. Confirmed with the Suggested preset. The same happens with Hall wall and Lot line, so the option the research calls the best fit always shows red. Fix: for `underHall`, test the ground-floor box against the line at grade, so the hall above does not count. Pass it when it has its own street face and the line runs above it (2 h floor), and state that as a design choice.

5. **arch.js:127–128. Zoning is checked per city, not per site zone.** The `zones` and `districts` strings are shown but never tested against the lot's zone. Edmonton's refuge is "permitted" with zones "BE only (IM, IH not permitted)", so on an IM or IH lot (E05, E123) it passes. The 500 m² BE cap is applied on IM lots too. Vancouver differences between districts (I-1C: Social Service Centre only) are lost. Fix: parse the zone list against `s.Z` or `M.zone`. If the zone is not listed, mark `bad` ("not permitted in IM"). If the parse is unclear, mark `?`. Apply `cap_m2` only where the cap's zone applies.

6. **arch.js:259. The hall's temperature in the heat gradient is made up.** `t: mid(dcTemp())+10` draws the hall at 40 °C (air) or 65 °C (liquid). The "+10" has no source. Fix: draw the hall at the heat_temp range itself, with its register chip. Or hatch it as `?` like any other block with no supply temperature.

## Medium

7. **arch.js:78. The packer never goes back to an earlier zone.** Once it moves on, room left in the street band is lost. That pushes programs up and raises false height flags. E06A: the spa goes to level 1 ("Stacked to about 24 m; this zone allows 16 m") while about 17 × 52 m of the ground street band is free. Fix: first-fit over all zones for each program (try zones in order from 0; keep per-zone row state).

8. **arch.js:28, 44, 81. "No default" for the refuge holds only in the menu.** With `opt=null` the refuge is still drawn, and the rules run as if it were side by side. Fix: while `opt` is null, do not draw it and do not run its placement rules. Push a `q` flag instead ("Refuge: choose a placement").

9. **arch.js:129–130. The overnight shelter misreads NBC 3.1.3.2.** An F-2 building may hold one suite of residential occupancy, so a single overnight shelter can be that suite. The tool always flags `bad`. The warming shelter has no own-building option, so the flag can never clear. Its separation note also still says A-2 when overnight (C). Fix:
   - Flag `bad` only when more than one residential (C) program is in the joined building.
   - Otherwise add a note: "uses the one residential suite allowed in an F-2 building".
   - Add an own-building option (like the refuge's), or let the gap apply to it.
   - Show C when overnight is chosen.

10. **arch.js:138–139. Heat lift reads the wrong input and leans optimistic.** `dcTemp()` keys off `density`, but heat_temp is by cooling type (`answers.inside`: air vs plate or immersion). Typical density with liquid cooling gets the air range. "Direct" also compares the program's top supply with the hall's top (`d[1]`). A greenhouse at 35–60 °C counts as direct from a 50–60 °C hall although at 50 °C it is not. Fix: use `(A.inside||'air')==='air'`. Call it direct only if `t[1] <= d[0]`; if it falls between, say "direct at the upper end, else heat pump". Keep the "(unverified)" label on liquid.

11. **arch.js:70, 75–83. Grade requirements are not enforced.** The clinic is `grade:'not at grade'` (Van I-3: health care office not at ground floor), yet E06A puts it at level 0. "At grade" programs can also end up on level 1 or on the hall roof with no flag. Fix: skip level-0 zones for "not at grade" and keep "at grade" on level 0. If that is impossible, flag it with `p.place.src`.

12. **arch.js:217–220. Resize sharing has four problems.**
    - (a) `minOf(...)||0` lets a program with no sourced minimum shrink to 0, against "no source: ? and ask J.B.".
    - (b) One proportional pass does not pass on what a program at its minimum could not give, so it stops early and blames "locked programs and minimums".
    - (c) If the budget is already over, one "+" step takes the whole existing overrun from the others.
    - (d) Heat is never a ceiling, though the notes say the cap is "what lot, zoning and heat allow".

    Fix: treat a missing minimum as not shrinkable and name those programs in the message. Loop until the overrun is gone or no one can give. Take from others only `min(over, v−old)`. Add a heat ceiling with its own message.

13. **arch.js:147, 178, 262, 238. Red is used for things that are not selected or flagged.** The lot outline in plan is `stroke=var(--accent)`. Every heat bar segment uses class `o` (accent at 0.5). The warm end of the heat scale, rgb(201,115,58), sits next to #CC746C (the clinic at 58 °C looks flagged in the E06A plan). Fix: draw the lot line in `--line-2`, use a grey for `.o`, and move the warm end off red (e.g. a sand or amber, kept out of the accent's hue).

14. **arch.js:177–178, 230–233. Budget and Compare figures have no sources.** The space cap (zoning FSR, setbacks), heat offered (engine heat_delivered: dea, dfKatalog2022) and the Compare rows have no chips. Fix: add `chips(['van_zdb_i2','van_zdb_i3','edm_bl20001'])` to the space line and the heat_delivered sources to the heat line. In Compare, add a sources row (or chips per row header), with `?` where the register lists no source (arch_compare `sources: []`).

15. **arch.js:57, 67, 87–88, 107–109. Roof clashes and contained distances.**
    - Top zones and roof programs ignore plant on the hall roof (`kind==='roof'` is skipped). In E06A, chillers sit at u −7…5 on the hall roof.
    - The roof greenhouse and the top0 zone both start at `hu0` on the hall roof and overlap.
    - `dist()` returns the distance between edges, so a box that contains or overlaps a plant ring reads as metres away instead of 0.

    Fix: subtract roof-plant extents from the top zones, and place the roof greenhouse into the same occupancy record as item 2. In `dist`, return 0 if any vertex of one ring is inside the other.

16. **arch.js:118–119, 221. The suggested secure line is separate islands.** The hall, each plant clearance, the yard and loading are separate rings. A public block between the hall and the generators then counts as outside the line, and the public share is inflated. `secA` also adds overlapping ring areas (generator clearances overlap), which counts them twice. Fix: use one ring, e.g. the convex hull or the bounding rectangle in (u, v) of the required parts, labelled "suggested, a design choice". Compute `secA` from the union, or from that single ring.

17. **arch.js:269–270. Leaders overlap.** Every leader's vertical leg sits on the same x (`kx = right−12`), so legs stack on one line and cannot be told apart. Horizontal legs also cross other blocks. Fix: step `kx` per label (e.g. `right−12−4*i`, sorted so legs do not cross), or route the horizontal leg along the block's nearest free edge first.

## Low

18. **arch.js:131. Some rules are skipped without a trace.** Rules with no distance are dropped silently: the pool's hard "keep apart hall", Metro Van s. 13, `intakes`, `transformer`. Fix: push a `q` flag for each one ("not checked: no distance / not modelled").

19. **arch.js:129. A missing separation shows nothing.** When `sep_h_from_F2` is null (greenhouse, covered plaza, kitchen, heat plant), no rule line appears. Fix: show "separation from F-2 ?" with the `occ.src` chips.

20. **arch.js:93, 200. The 6.0 m storey is mislabelled in Edmonton.** "Drawn at 6.0 m (the zone's ground-floor minimum)" is shown on Edmonton BE lots too, where no such minimum exists (envEdm has no `ground`). The flag also hard-codes "6.0". Fix: use `R.ftf.ground`, and say "Vancouver I-2/I-3 ground-floor minimum, used here as a drawing height" in Edmonton.

21. **arch.js:61–64, 67, 74, 81, 160, 212. Drawing numbers are not labelled on screen.** The 6 m minimum band and depth, the 3 m refuge gap (labelled only in the header comment), eight top levels, the 6-storey cap, and the 10 % / 10 m² step are never called "drawn, not a rule". Fix: add one line under Arrange listing them as drawn, not rules. Flag the 3 m gap as "spacing ? (FM 1-42 / NBC 3.2.3)", as arch_placement says.

22. **arch.js:81, 133. The own-building refuge is only partly separate.** It skips the street-entrance check, though Van 10.21.1 applies to each principal or separate use. The gap is only on its `vA` side, so neighbours on the other side, and level-1 boxes above, still touch it. Fix: keep the entrance check, add the gap on all sides, and block stacking over it.

23. **arch.js:260. Plan per storey leaves blocks out.** Multi-storey boxes appear only on their first storey. Roof and top programs never appear (`&&false` is dead code). The plan has no secure line or plant, though J.B. confirmed "secure line dashed". Fix: show a box on every storey it spans, add a "Roof" storey, and draw the secure line dashed plus plant in grey.

24. **arch.js:127. Unknown zoning is drawn as broken.** Zoning `?` gets `sev:'bad'` (red) and `b.bad`. Fix: use `sev:'q'` and do not turn the block red; unknown is not a failure.

25. **arch.js:101. A sourced Vancouver cap is missing from the space budget.** I-2/I-3 allow 1.00 FSR for all non-industrial uses combined (van_zdb_i3, on the refuge's flag list). The space budget uses FSR 3.00 for everything. Fix: in I-2/I-3, add a second cap, lot × 1.00, for programs that are not industrial, and say which cap stops a resize.

26. **arch.js:194, 215. Stale resize messages.** `A.msg` stays on screen after unrelated re-renders (secure preset, option change). Fix: clear it in `wire()` handlers other than resize.

27. **flow.js:148. People is skipped in Architecture mode.** The arch template skips `social` (People), though the 30 Oct scope lists "social fit" as core. Confirm with J.B., or show catchments and risk groups in Arrange.

28. **arch.js:224–235. Compare is missing a row.** "Controlled doors from street to servers" is listed in the 1 Nov secure-line notes as shown side by side, but it is not in Compare or arch_compare. Fix: add the row (`?` until doors are modelled) and add it to the register entry.
