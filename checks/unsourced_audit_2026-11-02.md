# Unsourced audit, Beyond Data tool — 2 Nov 2026

Read-only. Scanned `tool/*.js` and `tool/index.html` (data files and `.py` builders skipped) against `register/formula_register.json` (quantities, conditions, opportunity quantities, new and old sources) and `tool/opps.json`. Machine data: `checks/unsourced_audit_2026-11-02.json`.

**Method.** Every non-trivial number was matched against all register text; unmatched ones were read in context, and matched ones were spot-checked (about 150 by hand). TRACED counts are automated: numeric occurrences outside comments whose value appears somewhere in register text. They are an upper bound (clause numbers and coincidental matches count). The register is very thorough; most figures trace.

## Counts per area

| Area | TRACED (auto, upper bound) | UNSOURCED high | UNSOURCED medium | UNSOURCED low | LABELLED |
|---|---|---|---|---|---|
| What fits | 634 | 3 | 3 | 5 | 2 |
| Heat | 255 | 1 | 0 | 3 | 0 |
| Water | 75 | 0 | 1 | 0 | 3 |
| Energy | 236 | 0 | 1 | 1 | 0 |
| People | 76 | 1 | 3 | 0 | 2 |
| Materials | 47 | 0 | 1 | 1 | 1 |
| Opportunities | 146 | 2 | 0 | 1 | 1 |
| 3D | 383 | 0 | 0 | 7 | 5 |
| Report | 39 | 0 | 0 | 0 | 0 |
| Templates | 7 | 0 | 0 | 0 | 0 |
| Register | — | 0 | 0 | 2 | 0 |
| **Total** | ~1898 | 7 | 9 | 20 | 14 |

Report and Templates: no unsourced figures of their own; they print engine values.

## UNSOURCED, high and medium

| Sev. | Area | File:line | What | Value | Register |
|---|---|---|---|---|---|
| high | What fits | `tool/engine.js:154` | Existing-building floor area shown as a band: estimate × 0.48 to × 1.23, from our own check against 255 Vancouver buildings (19% low to 109% high); storey height ÷ 4 m | 0.48; 1.23; 4 m | floor_area |
| high | What fits | `tool/site.js:156` | Building sized to a chosen MW at single midpoints: 460 m² of hall per MW ÷ 0.6 hall share (midpoints of 290–630 and 0.48–0.72); sets the drawn building and feeds the "largest that fits" search | 460 m²/MW; 0.6 | size_fit; hall_area |
| high | What fits | `tool/engine.js:257` | Service class thresholds compare facility MW directly with MVA/kVA (power factor 1). Register service_class marks this "our assumption ?"; screen gives no "?" | PF = 1 (MW = MVA) | service_class |
| high | Heat | `tool/engine.js:370` | Gas boiler efficiency 0.85 converts energy bought to heat (homes heated, heat value, CO2). Register uses it in price_ceiling/payback, but receiver_demand says "boiler efficiency not yet sourced"; no source text gives 0.85 | 0.85 | price_ceiling; homes_heated; receiver_demand |
| high | People | `tool/engine.js:656` | Vancouver source in a quiet zone: 55 dBA night at a non-quiet neighbour (limO quiet 55; text line 394 "55 elsewhere"). van6555zones lists quiet→quiet, activity→quiet, intermediate→quiet, intermediate/activity→other only | 55 dBA | noise_limit |
| high | Opportunities | `tool/opps.js:56` | New district: demand verdict "yes" if non-market homes take ≥ 20% of the heat offered, else "maybe" | 0.2 | none |
| high | Opportunities | `tool/opps.js:103` | Meanwhile uses: land verdict "yes" if more than 200 m² is free, else "no" | 200 m² | none |
| medium | What fits | `tool/site.js:111` | A lot known only as a point is drawn as a square of at least 900 m² | 900 m² | none |
| medium | What fits | `tool/site.js:254` | Set-up text: UPS "about 2.0–2.4 m² per MW plus 2.2 m² for batteries"; register component_space now gives UPS 2.4–3.3, batteries 1.0–1.8 m² per MW (29 Oct study) | 2.0–2.4; 2.2 | component_space |
| medium | What fits | `tool/extras.js:261` | Map layer "Size that fits, middle case": MW = floor × 0.6 ÷ 460, storeys from 6 m + 5.75 m floors; midpoints, no setbacks or plant; method in legend, no register quantity | 0.6; 460; 5.75 m | none |
| medium | Water | `tool/addons.js:192` | Edmonton rain tank = one wet month of 82.7 mm; register rainwater gives Jun–Aug 213 mm, no 82.7 (Vancouver 124 mm is traced). Also xecon.js:107,118 and addons.js:220 | 82.7 mm | rainwater |
| medium | Energy | `tool/xecon.js:35` | Solar roof shading loss (beam shading from CWEC sun bins + sky-view diffuse loss; NREL SAM method, Antonanzas-Torres 2018, Ruiz-Arias 2010; obstacles within 500 m). Method and sources not in the register; pv_roof has no shading term | method; 500 m | pv_roof |
| medium | People | `tool/engine.js:670` | "Neighbours over their limit" counted within 600 m (3D tints to 650 m, scene3d.js:349); minimum distance 5 m | 600 m; 650 m; 5 m | noise_level |
| medium | People | `tool/addons.js:249` | Plant sight-line count over buildings within 350 m; register visibility is a field ledger, not a computed count | 350 m | visibility |
| medium | People | `tool/addons.js:69` | Roof screen height = unit + 0.9 m ("2–3 ft taller", SM&W 2021 acoustic consultant memo): source not in the register | 0.9 m | none |
| medium | Materials | `tool/addons.js:229` | Cooling and heat pumps "replaced N times (15–25 years)": count uses 20 years (Math.floor(yr/20)), a point from the range | 20 yr | horizons |

**Notes on the high items**

- Boiler 0.85: the register contradicts itself (used in price_ceiling and payback; "not yet sourced" in receiver_demand). It moves homes heated, heat value and gas CO2.
- Quiet-zone 55 dBA: the saved by-law copy (van6555zones) has no quiet→other row; read s. 2.1–2.3 before keeping it.
- Power factor 1: the register already marks it "our assumption ?"; the screen should say so.
- 460 ÷ 0.6 and 0.48–1.23: our own derivations; add them to the register (size_fit, floor_area) or show them as our arithmetic.
- Opportunity cut-offs (20% of heat, 200 m² free): no source; mark as our choice or replace with a sourced rule.

## LABELLED assumptions

- `tool/compare.js:26` — Comparison rows built on "our choices"
- `tool/plant.js:57` — Provisional plant size until a size is set (floor × 0.48 ÷ 630), labelled provisional
- `tool/addons.js:212` — Edmonton water hardness about 178 mg/L CaCO3 (EPCOR 2026, "not confirmed ?"); Vancouver about 20; neither in the register
- `tool/addons.js:40` — Hybrid coolers wet above 18 °C: 30 °C loop, 12 K approach "assumed"
- `tool/xecon.js:118` — Rain runoff 0.8 and tank = one wet month, both shown as "assumed" (register says the same)
- `tool/addons.js:229` — Server manufacturing share 10–15% "?"
- `tool/addons.js:69` — Barrier example: 2 m behind, listener 30 m, 500 Hz; ISO 9613-2 20 dB cap "not verified"; "an illustration, not this site"
- `tool/addons.js:63` — Enclosure attenuation "not yet verified for coolers"
- `tool/opps.js:65` — BC allocation regulation read as applying at 10 MW or more: "our reading ?"
- `tool/scene3d.js:305` — Rack arrangement inside each 2.32 m²: "our choice ?"; heat-recovery room location "our choice (?)" (:209, :232, :387)
- `tool/scene3d.js:289` — Fence post spacing "not sourced (?)"
- `tool/plant.js:13` — Generators 1 m clear around each set "not checked ?"; Mark dry-cooler document "?" (:10)
- `tool/kit3d.js:46` — Drawn equipment details in each SPEC "unsure" list (fan Ø, basin and pad heights, radiator depth, BESS cooling unit, CRV height 2.0 m, tank count)
- `tool/scene3d.js:304` — Room-cooling W/ft² bands "approximate"; CDUs "not placed: no placement rule found"

## Low items

20 UNSOURCED low items (UI tolerances, 3D drawing offsets, dead code in overridden engine views, unused specs, two register gaps). Listed in the JSON.

## Not covered

- Text claims (B) were read in the Heat, Water, Energy, People, Materials and Opportunities tabs and the 3D key; `index.html` zone texts, `report3.js` captions and `explain.js` diagrams were scanned for numbers only.
- 37 register quantities carry a "?" in their coefficient. Their flagged clauses were spot-checked against the screen: service_class (power factor) is shown without its "?"; the others checked are either not shown or shown with "?". Not every one was traced to every screen.
