# Place stage ("What the site offers") findings, 30 Oct 2026

Three routes:

- an independent workbook: `checks/place_check/`, with 750 live formulas from the register only;
- the math agent: `checks/agents/2026-10-30_place_math.md`, with 25 findings (0 high, 10 medium, 14 low, 1 no defect);
- a comparison of the workbook against what the tool shows on 8 lots: `checks/place_check/compare_place.md`.

**Comparison: 160 lot × part pairs.**

- 40 match.
- 8 differ: the Vancouver electricity price and the Vancouver self-generation rule.
- 88 not shown: 11 parts are register-only, which is by design for most.
- 24 not comparable.
- Annual energy matches on all 8 lots once the tool's own IT load is used.

## Differences, and Claude's reading

| id | What | Reading |
|---|---|---|
| P-02 | Vancouver price uses BC Hydro large general service (LGS) at every size; transmission (RS 1830) never used | LGS is right for a site connected at distribution voltage, which is what 2.5–10 MW sites are. The register doesn't give a threshold for moving to transmission, so the tool can't switch at the right size. The fix is to label it "distribution-connected" and source the threshold (research). The demand charge × 12 is right: BC Hydro bills demand monthly. The register just doesn't say so (register fix). |
| P-01 | RS 2289 solar export offered at every size | It applies only at distribution voltage. True for J.B.'s sites; label it so. |
| P-03, P-04 | Edmonton: EPCOR $2.53 / 8.09% in code vs $2.50 / 7.99% in the register source; two solar cards price Edmonton power differently ($43.68 vs $49.74) | Use the register's values and one price |
| — | Make-up water low end +10.7% | The tool uses only the high PUE (xecon.js:105); use the 1.4–1.55 range |

## Screen fixes (clear-cut)

| id | Fix |
|---|---|
| P-01, P-02 | Label the Vancouver rate and the export rule "distribution-connected (2.5–10 MW sites); transmission rules not yet applied" |
| P-03, P-04 | Edmonton EPCOR constants to the register source; one Edmonton price in both solar cards |
| P-06 | Edmonton sewer rule cites the repealed Bylaw 18100; cite Bylaw 19627 Sch. 2 s. 5.10. The "300 m³ in 30 days" is not in the register: mark it "?" |
| P-07 | "Gold Bar supplies one industrial customer by a 5.5 km pipe" is not in the register (trade press only): remove the detail |
| P-08 | Decision 16 (show both afterlife views, dated) is in the register but not on screen: add it |
| P-11 | The Vancouver water bill: one formula (water + sewer), rates labelled "as proposed 2026" |
| P-14 | The flood clause citation: settle the clause number (VBBL 2.2.10.3 vs 2.2.9.3) by reading the by-law; show the FCL datum |
| P-15 | Surface water: fresh-water properties for the North Saskatchewan; don't call a Fraser arm "sea water" |
| P-16 | Solar yields: one set of numbers (1,006 / 947 / 1,243) |
| P-17, P-23 | Alberta export and greywater texts: cite the register's sources; one wording |
| make-up | PUE range, not only the high end |

## Register fixes

- **Formulas and units:**
  - P-20 (ATES): the formula is missing × 1,000.
  - P-21 (deep_geo): state the return temperature.
  - P-22 (borefield): "≈2 ha per MW" holds only at 12 W/m; give the range.
  - P-05 (128/159 kWh/m²): mark it "our derivation, optimistic end".
- **Rates:** P-12, power factor 1 stated (kW = kVA assumption); the BC demand charge is monthly.
- **Stale or unsourced text:**
  - P-13: Edmonton noise limits no longer "pending".
  - P-19: the restriction dates stay hidden until sourced.
  - P-18: the logic panel cuts coefficients at 500 characters, which drops qualifiers; raise the limit.
- **Pipeline (P-09):** tool/opps.json has drifted for 5 parts, and make_tool_opps.py points at a missing file. Fix the builder so the register is the single source.

## Research (no decision)

- BC Hydro's threshold for transmission service.
- The VBBL flood clause number.

## Not shown, by design

Seismic, Nations named, urban heat, restriction history, interconnection, deep geothermal, aquifer storage, borefield, greywater and existing-building stock are register-only context. The floodplain is shown on the site card, not in the tabs.
