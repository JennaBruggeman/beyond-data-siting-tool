# Set-point and supply temperatures: winter garden, winter market, gym / climbing (2 Nov 2026)

Per BRIEF.md. New ids → `temps_public_sources.json` (`arch_tmp_*`). Reused ids from prog_public / prog_grow / greenhouse_solar / refuge_publicfloor are not repeated. "?" = not confirmed. "our reading" / "our arithmetic" labelled.

## Key findings first

- **No Canadian code sets an indoor set point for these programs.** NBC/BCBC/NBC(AE)/VBBL 6.2.1.1 send HVAC design to "good engineering practice" (ASHRAE etc.). The only fixed figure, 22 °C (9.33.3.1), is for Part 9 **residential** living spaces.
- **Supply temperature is sourced, and it fits data-centre heat.** Vancouver NEU guide: radiant floor **45 °C supply / 35 °C return**. Edmonton Blatchford: building heating **max 49 °C** at design, reset to 30 °C. Both are within 45–60 °C.
- **Fan coils and make-up air coils are the problem terminals.** Vancouver NEU lists 70/50 °C (fan coils) and 65/45 °C (make-up air). Blatchford shows the same spaces can be designed for ≤49 °C.
- **25–35 °C heat via heat pump has a Canadian precedent:** Blatchford's loop runs 8–32 °C to building heat pumps.
- **Heat per m² stays weak.** Only our arithmetic (glazing conduction) for the winter garden; nothing sourced for market or gym.

---

## 1. Winter garden / glazed atrium

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Code set point (non-residential) | none; HVAC to "good engineering practice such as … the ASHRAE Handbooks and Standards" | arch_tmp_nbc62 | NBC Div. B 6.2.1.1.(1), p. 6-1; same in BCBC 2024, NBC(AE) 2023, VBBL 2025 (Vol. 1) | rule (negative) | 90 |
| Interior loads | "determined in accordance with good practice … based on the intended use of the space" | arch_tmp_nbc62 | 5.2.1.2.(1), p. 5-3 | rule | 90 |
| Winter garden set point (Kew, UK) | **20 °C day / 18 °C night** ("Winter garden" zone) | arch_pg_ward2013Kew | Table 1, p. 1257 | peer-reviewed (benchmark outside Canada) | 80 |
| Coolest tempered zones (Kew) | temperate ferns 15/13 °C; dry tropics 14/12 °C | arch_pg_ward2013Kew | Table 1, p. 1257 | peer-reviewed | 80 |
| Greenhouse night design | "16 °C (60 °F) generally meets the needs of most plants" | arch_asabeEp406 | 4.7 | design guide (standard) | 85 |
| Data-centre greenhouse (Quebec) | 20 °C day / 18 °C night | arch_etsBaieComeau | news page | university summary | 55 |
| People-only atrium (comfort, clo 1.0) | 18–23 °C at 50 % RH (ASHRAE 55 per CCOHS) | arch_tmp_ccohsComfort | Table 1 | government guide (summary of standard) | 75 |
| Summer | Kew ventilation opens 4 °C above day set point (≈24 °C, our arithmetic) | arch_pg_ward2013Kew | p. 1257 | peer-reviewed | 70 |
| NECB treatment of low set points | intent: "permit a different set-point temperature … where the set-point temperature is lower than 18°C" (NECB 2017; full sentence not read ?) | arch_tmp_necbIntent | 8.4.3.2.(3) intent | rule (intent statement) | 55 |
| Supply: radiant floor | **HWS 45 °C / HWR 35 °C** ("guidelines only") | arch_tmp_vanNEU2020 | s. 6.2.3, p. 20 | utility guide (Vancouver) | 85 |
| Supply: floor / bench heating (greenhouse) | "35 to 40°C" | arch_asabeEp406 | 5.5.2, 5.6.3 | design guide | 85 |
| Supply: rigid floor | "45–50 °C based on the design outdoor temperature"; suspended 55–60 °C | arch_tmp_vadiee2020 | s. 2.2 | peer-reviewed (Sweden; cited from Khorasanizadeh et al.) | 75 |
| Supply: fan coils / make-up air | 70/50 °C; 65/45 °C | arch_tmp_vanNEU2020 | s. 6.2.3, p. 21 | utility guide | 85 |
| Peak glazing conduction, 20 °C inside, double glass (U 3.7) | Vancouver ≈100 W/m² cover (ΔT 27); Edmonton ≈185 (ΔT 50); excl. infiltration | arch_asabeEp406, arch_bcbcAppC, arch_pg_abClimateEdm | Table 1; Table C-2 | our arithmetic | 50 |
| Same at 16 °C night | Vancouver ≈85 W/m²; Edmonton ≈170 | as above | — | our arithmetic | 50 |
| Unheated (no-heat) practice | ? (no primary source found) | — | — | — | — |
| Frost-free minimum for plants | ? (no primary source found; Kew lowest zone 12–13 °C night) | — | — | — | — |
| Yearly kWh/m² | ? | — | — | — | — |

## 2. Covered winter market (indoor or semi-enclosed)

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Code set point | none (6.2.1.1 good practice) | arch_tmp_nbc62 | 6.2.1.1.(1) | rule (negative) | 90 |
| BC workplace comfort minimum | none; BC OHS Reg. lists only heat/cold stress (ss. 7.27–7.38, ACGIH TLVs) | arch_tmp_ccohsLeg | BC entry | government summary | 70 |
| Alberta workplace guide | "comfortable when the air temperature is about 22 degrees Celsius"; "Work settings and activities may require different temperatures"; RH 30–60 % | arch_tmp_abGH014 | GH014, 'Factors that impact indoor air quality' (no page numbers) | government guide | 75 |
| Alberta guideline (per CCOHS) | 20–25 °C winter; 23–28 °C summer ("non-regulatory") | arch_tmp_ccohsLeg | Alberta entry | government summary (source doc not seen ?) | 55 |
| Alberta Infrastructure IAQ | "22oC" (no season stated; year-round, our reading), "with a 2oC upswing at peak outdoor design temperature (summer)"; for Government of Alberta occupied facilities | arch_tmp_abInfraIAQ | App. 3, p. 7 | government guide (2002) | 70 |
| Comfort range, winter clothing | 18–23 °C (clo 1.0), 21–25 °C (clo 0.65), at 50 % RH | arch_tmp_ccohsComfort | Table 1 | government guide (ASHRAE 55 summary) | 75 |
| Food prep / personal service rooms (federal works only) | "not less than 18°C and not more than 29°C" | arch_tmp_ccohsLeg | COHSR s. 9.9 | rule (federal; not provincial markets: benchmark) | 70 |
| Market-specific set point | ? | — | — | — | — |
| Semi-enclosed (open-sided) market | ? (no source; tempering only, our reading) | — | — | — | — |
| Supply: radiant floor | 45/35 °C | arch_tmp_vanNEU2020 | s. 6.2.3, p. 20 | utility guide | 85 |
| Supply: make-up air coils (large air volumes) | 65/45 °C | arch_tmp_vanNEU2020 | s. 6.2.3, p. 21 | utility guide | 85 |
| Supply: low-temp design (Edmonton) | max 49 °C at design; reset 49 → 30 °C between −5 and 15 °C outdoor; return ≤38 °C | arch_tmp_edmDESS2025 | s. 6.1, p. 14; Table 6, p. 21 | utility guide (Edmonton) | 85 |
| W/m², kWh/m² | ? | — | — | — | — |

## 3. Gym and climbing gym

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Code set point | none (6.2.1.1 good practice) | arch_tmp_nbc62 | 6.2.1.1.(1) | rule (negative) | 90 |
| Gymnasium design temperature (Poland) | "a design temperature, used in the design of gymnasiums, of 16 °C" (Polish regulation, cited) | arch_tmp_dudzinska2021 | s. 3.1 | peer-reviewed (cites national rule; benchmark outside Canada) | 65 |
| Multi-purpose halls (CIBSE, cited) | "optimal operative temperature may be between 12 and 18 °C depending on the type of activity" | arch_tmp_dudzinska2021 | s. 3.1 | peer-reviewed (secondary; CIBSE Guide paywalled) | 55 |
| Sports halls (Trianti-Stourna, cited) | "temperature between 18 and 20 °C" | arch_tmp_dudzinska2021 | s. 3.1 | peer-reviewed (secondary) | 55 |
| Summer upper limit, low activity | 26 °C (ISO 7730, cited) | arch_tmp_dudzinska2021 | s. 3.2 | peer-reviewed (secondary) | 55 |
| Climbing gym set point | ? (none found; sports-hall range applies by analogy, our reading) | — | — | — | — |
| Edmonton rec-facility mechanical criteria | ? (Technical Guidelines v05 s. 4.10, pp. 44–48, text not extractable) | — | — | — | — |
| Supply: radiant floor | 45/35 °C | arch_tmp_vanNEU2020 | s. 6.2.3, p. 20 | utility guide | 85 |
| Supply: fan coils / make-up air | 70/50; 65/45 °C | arch_tmp_vanNEU2020 | s. 6.2.3, p. 21 | utility guide | 85 |
| Supply: Edmonton low-temp | ≤49 °C design; fan coils, radiant, radiators permitted | arch_tmp_edmDESS2025 | s. 6.1, p. 14; Table 6, p. 21 | utility guide | 85 |
| Heat per m² | ≈168 kWh/m²·yr, rough (rec centres incl. pools/rinks) | arch_statcanSCIEU2019, arch_nrcanTrends2020 | (see prog_public) | our arithmetic | 30 |
| Peak W/m² | ? | — | — | — | — |

## Can data-centre heat serve these? (our reading)

| heat source | radiant floor (35–50 °C) | fan coil / make-up air (65–70 °C) | ≤49 °C designed system |
|---|---|---|---|
| Direct 45–60 °C | yes | no, unless coils sized for lower water (our reading) | yes |
| 25–35 °C via heat pump | yes, after lift | lift to 65–70 °C ? | yes: Blatchford loop 8–32 °C feeds building heat pumps (arch_tmp_edmDESS2025, Table 8, p. 28) |

Utility temperatures:
| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver NEU space-heat max supply / return | winter 70 / 50 °C; summer 50 / 30 °C; min ΔT 20 °C (alignment: our reading) | arch_tmp_vanNEU2020 | Table 1, s. 3.4, p. 11 | utility guide | 75 |
| Vancouver NEU network supply | "never less than 65°C" | arch_tmp_vanNEU2020 | s. 3.4, p. 11 | utility guide | 85 |
| Blatchford loop | "min. 8°C (winter) max. 32°C (summer)" | arch_tmp_edmDESS2025 | Table 8, p. 28 | utility guide | 85 |

## Gaps (?)
- Frost-free / unheated winter garden practice: no primary source.
- Market- and climbing-specific set points: none.
- Peak W/m² and kWh/m² for market and gym: none; winter garden only by our arithmetic.
- NECB 2020 full text (semi-heated spaces, set points in Part 8 schedules): not read.
- CSA Z412 public summary: not found.

## Paywalled / blocked
- ASHRAE 55 full text (paywalled; fact sheet arch_tmp_ashrae55fs gives scope only, no °C; CCOHS summary used). CIBSE Guide A (paywalled; cited second-hand).
- City of Edmonton Consultant Manual Vol. 2 Technical Guidelines v05: PDF text stops at s. 4.9.4.1; mechanical s. 4.10 not reached.
- ccohs.gc.ca redirect target refused by fetch tool (same page later read via search link on ccohs.ca).
- Statistics Canada t002c table: fetch refused (not re-tried).
- open.alberta.ca GH014 page: server error (bulletin read from ohs-pubstore instead).

Check 2 applied (2 Nov 2026)

Check 3 applied (2 Nov 2026)
