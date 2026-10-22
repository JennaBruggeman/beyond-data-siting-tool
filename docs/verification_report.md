# Verification report — 9–10 October 2026

Every figure marked confirmed in `sources/01`–`08` was re-opened by an independent pass that treated the earlier reports as claims to test. Six verifier runs; 258 items re-checked. Derived arithmetic was recomputed from stated inputs.

## Counts
| verdict | items |
|---|---|
| Confirmed (exact) | 195 |
| Confirmed, wording or page note | 37 |
| Mismatch, corrected below | 10 |
| Not on cited page, citation fixed or marked unverified | 6 |
| Unreachable (robots) | 1 (StatCan CSV; the NL Statistics mirror stands) |
| Arithmetic errors | 0 of 9 recomputed |

## Mismatches corrected (value changed)
1. **Cologix VAN2**: "2 × 750 kW Mitsubishi" are **UPS units, not generators**; generators are N+1 diesel with no kW stated. (sources/01)
2. **Pärssinen et al. 2019 payback**: medium **2.14–3.72 yr** (min case >10), large **1.82–5.14 yr**; the earlier ranges were swapped; "(2 MW)" label dropped. (sources/03)
3. **BC Hydro RS 1830**: effective **1 Apr 2024**; 1 Apr 2026 is when energy charges were consolidated and RS 1823 cancelled. Rates unchanged. (sources/03)
4. **Cummins S-1443 enclosures**: QuietSite L2 **73–76**, L1 **78–87**, weather-protective **89–91** dBA @7 m; "74–80" matched no level. (sources/08)
5. **Kelvion dry cooler 94 dBA**: printed under a "per fan" heading; if per fan the unit would be ≈102 dBA, but the 61 dBA @10 m line only fits a unit total. **Unresolved; do not cite 94 as a unit value.** (sources/08)
6. **Stulz CyberAir 3PRO**: range 30–**150** kW, not 140. (sources/08)
7. **AMCA fan law**: 50·log(N₂/N₁) is on **p.3**; "5252-08" is a paper number, not a standard. (sources/08)
8. **Persson 2019 "Eq.7"**: linear heat density is defined at **Eq.4**; Eq.7 is the pipe-diameter relation. 1.5 GJ/m limit confirmed. (sources/07)
9. **DEA storage footprint**: 20.15·V^0.61 is in media/6448 ch.140 (text after Table 2); PlanEnergi 7413 gives **23,100 m²** design and **~26,000 m²** realistic for 100,000 m³ and a different fit (15.4·V^−0.369); "22,600" was computed, not on the page. (sources/07)
10. **ASHRAE/EnergyPlus walking**: **207 W** at 3.2 km/h; 180 W is "walking about, office". (sources/06)

## Not on the cited page (citation fixed)
- FCNEU "3.2 MW original" and "24 MW boilers": not on the City page or the 2018 report. Replaced with RTS 06419 (2006): 2.5 MW base sewage heat, COP ~3, $59/MWh levelized; and the confirmed +6.6 MW.
- Alberta greenhouse set-point 20–24 °C: cited to Agdex 250/830-2 p.8, not fetched — marked unverified.
- Stockholm Data Parks "data centre owns its heat pumps": not on the 2019 post; now sourced to Energiforsk 2020:681 (supplier owns and invests in the heat pump).
- GWELLS well count: page is JavaScript-only; marked unverified.
- RTS 19744 pages: "up to 40 MW" is p.17; 579 submissions p.7 and p.24; online breakdown p.24.
- WES in-service: "an earlier expected in-service date of July 2032" (pp.2, 21); the province says "as early as 2032". Not a firm date.

## Wording notes worth carrying into citations
- BC 22.8 g/kWh is **consumption-based** (net imports); Alberta 335 is **generation-based**. Different bases.
- Alberta offset handbook v3.0 (0.52 t/MWh) is watermarked "superseded by v3.1"; v3.1–3.3 values unread.
- Fortum's page does not name Espoo; attribute to "Fortum's network". The sentence about heat temperature affecting price is not on the page; the model is "own production cost and outdoor temperature".
- Creative Energy G-5-26 "ranges" are old→new rate pairs; 2026 interim rates are $19.53 / 16.53 / 14.63 / 11.60 per M# (≈ $66.6 to $39.6 per MWh).
- NEU 71% renewable (2025) is a forecast.
- Wahlroos 2017 "75 °C heat pump payback < 2 yr" is a cited result (Stenberg), not the authors'.
- Hiltunen & Syri's own assumption is 0.6 M€/MW_heat; 0.5–0.65 is their cited range; the paper does not say the DH operator "usually invests".
- Fan et al. 2007: 59.5% is average ÷ nameplate-sum peak; average ÷ observed peak is 82.8%.
- Synapse: ~30 m is para 28; "more than 700 residences within 800 m" para 33; 1,800 MW diesel is 3,200 − 1,400, not stated. Decision dated 17 Aug 2026; release 18 Aug.
- Drake Landing 0.96 is our mean of Mesquita Table 2 (measured); NRCan states 97% in year five.
- Giacomelli U-values are our SI conversions of Btu figures (slide 2); 180 °F is a worked-example assumption (slide 7). Root-zone 100 °F is typical practice; 54 °C is the polyethylene pipe limit.
- LBNL: colocation utilisation 21% (2014) → 35% (2027); idle 36% is of maximum power.
- Cologix VAN5: page says 1.6 MW in the body and 1 MW in its meta description.
- Wolfpaw permits at 10155 102 St name "Commerce Place"; the Wolfpaw page gives no street address.
- EPCOR downtown DE: a City–EPCOR partnership for Phase 1; ownership and operation not stated.
- M104 authorises the BCUC to exempt EV charging; the exemption itself is BCUC G-66-19.
- Edmonton Bylaw 14600 s.13(e) reads "National Standards Institute S 1.4-1983 (R2006)".

## Second search: formerly "not found", now sourced
- **RVO 2018 primary report found and read** (IF Technology for RVO, 7 Nov 2018): 4.38 MWh/m²·yr (p.4); pools 1,000 m, existing housing 1,200 m, greenhouses 1,500–2,100 m, new housing 1,200 m at 5-year payback (pp.7–9); areas below 1,000 GJ/ha not viable (p.8, printed "GJ/h"). The handoff's figures are confirmed and page-cited.
- **Edmonton HDD18 = 5,120** (NECB 2020 Table C-1; same data set as NBC 2020 Table C-2).
- **Alberta Data Centre Regulation**: Alta Reg 117/2026, 9 Jun 2026: 75 MW threshold, tethered vs bridged, 1,600 MW bridging pool for ≤3 years, bridged load curtailed first (law-firm summaries; King's Printer and CanLII robots-blocked).
- **Edmonton Zoning Bylaw 20001** (current): stalls 5.5 × 2.6 m, 90° aisle 7.0 m; s.5.120 lighting and nuisance provisions qualitative.
- **Vancouver GFA by parcel**: BC Assessment Non-Residential Inventory Extract has Gross Building Area and leasable areas; available to UBC researchers via UBC Library / Abacus under signed terms.
- **Trane sound power** (Sintesis Prime RTAF, 2020 EU brochure): Lw 94–101 dBA standard, 91–98 low-noise, 333–1,010 kW. **Güntner** small dry cooler Lw 67 dBA from a public permit submittal.
- **RAS heat**: 4.6 GWh/yr heating for 1,000 t/yr trout (Luke, Finland, slide); thermal ≥ one-third of 9.59 kWh/kg (Ayuso-Virgili 2023, via summary).
- **Insect heat**: mealworm 2.88 kWh/kg live (Dreyer 2021, peer-reviewed); BSF 3,404 kWh heat per tonne substrate (Öko-Institut for UBA 2022).
- **Contract terms**: Stockholm Exergi called-off contracts 10 yr + 5 yr option, spot open-ended, supplier owns the heat pump, Exergi owns meter and pipes (Energiforsk 2020:681). **Denmark** 2025 surplus-heat price cap 95 DKK/GJ (Forsyningstilsynet).
- **Québec**: $40 M provincial grant to Île d'Orléans greenhouses on QScale Lévis heat (no heat price).
- **Server mass and LCA**: Dell R760 36.1 kg (2U); LCA 4,177 kg CO2e (2025, EPEAT-verified); LBNL benchmarking 1.8–2.5 m² per rack.
- **Heat-pump plant footprint**: ~102 m²/MW for evaporators (Dansk Fjernvarme catalogue, industry); DEA chapter still unread.
- **FCNEU 2006 design**: 2.5 MW base sewage heat, COP ~3, levelized $59/MWh (RTS 06419).

## Still not found after two passes
BC long-run marginal grid factor (none published); heat price paid to any Canadian or US data centre; Odense/Tallaght/Lévis agreement prices; FCNEU sewage flow in L/s; Canadian summer/winter district-heating ratio as a published figure (annual-only in NEU, Creative Energy, UBC, Lonsdale reports; compute from CWEC + degree-days); servers per rack from a standard; Grange Castle SD20A/0121 noise chapter (only on the SDCC portal); DEA heat-pump footprint values (chapter beyond fetch limit).
