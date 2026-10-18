# Hunt 3 — Heat price window (6 Oct 2026)

FX: Bank of Canada 2026-10-05: 1 SEK = 0.1419 CAD; 1 EUR = 1.5974 CAD (https://www.bankofcanada.ca/valet/observations/group/FX_RATES_DAILY/json). All conversions DERIVED.

## 1. Revealed purchase prices (operator floor side)

| Item | Value | Unit | Source | Status |
|---|---|---|---|---|
| Fortum Avoin kaukolämpö (Espoo/Kauniainen/Kirkkonummi) — valid 1 May 2026, VAT 0 | ≤ −8 °C: 50.00; −7.9 to −7: 47.50; −6.9 to −4: 45.00; −3.9 to −3: 42.50; −2.9 to −2: 40.00; −1.9 to −1: 35.00; −0.9 to 4: 30.00; 4.1–6: 20.00; 6.1–7: 18.00; 7.1–16: 14.50; ≥ 16.1: 11.00 | €/MWh | https://www.fortum.com/fi/lammitys-ja-jaahdytys/yritykset-ja-taloyhtiot/kaukolampoa-yrityksille/avoin-kaukolampo/avoin-kaukolampo-ostohinnat | **CONFIRMED, re-checked** |
| Fortum price model | "Lämmön ostohinta määrittyy ulkolämpötilan ja oman tuotantomme rajakustannuksen perusteella. Ostohintaan vaikuttaa myös lämmön lämpötila." Supply line only; annual change capped ±5%; hourly metering | | https://www.fortum.com/fi/lammitys-ja-jaahdytys/yritykset-ja-taloyhtiot/kaukolampoa-yrityksille/avoin-kaukolampo | CONFIRMED |
| Fortum 2024 table (secondary) | 13.00 (>16.1), 17.50 (7.1–16), 20.00 (6.1–7), 22.00 (4.1–6); cold bands same | €/MWh | https://www.hamk.fi/wp-content/uploads/2025/09/Hinnoittelu-ja-sopimusmallit.pdf | UNVERIFIED |
| Fortum in CAD | 17.6–79.9 | CAD/MWh | | DERIVED |
| Stockholm Exergi Öppen Fjärrvärme | No public tariff. Compensation "utifrån vad motsvarande värme hade kostat om vi själva producerat den"; "Ersättningsnivån styrs av utomhustemperatur"; two models; two zones | | https://www.stockholmexergi.se/foretag/fjarrvarme-for-foretag/varmeatervinning/ | CONFIRMED |
| Stockholm Exergi indicative | "Indikativt betalar Stockholm Exergi 2 MSEK årligen för en värmeleverans motsvarande 1 MW" / "vid 5000 timmar" | | same; https://www.stockholmexergi.se/wp-content/uploads/2023/05/Produktblad_tjanster_Oppen-Fjarrvarme.pdf (2023-02-15) | CONFIRMED |
| Implied | 400 SEK/MWh ≈ 56.8 CAD/MWh | | | DERIVED |
| Contract models | Öppen Avropsvärme (fixed effektersättning + energiersättning; supply normally 68 °C; activation at ≤ 10 °C outdoor); Öppen Spotvärme (Prima 68–103 °C, Inblandning 68–80 °C, Retur ≥ 3 °C above return); combined (2023) | | product sheet pp.1–2 | CONFIRMED |
| Stockholm Exergi retail 2026 | Energy 334 (Apr–Oct, > −3 °C), 894 (Nov–Mar, > −3 °C), 1,243 (< −3 °C) SEK/MWh | | https://www.stockholmexergi.se/wp-content/uploads/2026/04/Normalprislista_fjarrvarme_2026-1.pdf | CONFIRMED |
| Helen (Helsinki) | case-by-case; "at least 80 degrees Celsius"; no price list | | https://www.helen.fi/en/companies/heating-for-companies/open-district-heat | CONFIRMED |
| Helen model (secondary) | 40–70% of DH energy charge by season, < 0.5 MW | | HAMK PDF | UNVERIFIED |
| Kuopion / Tampereen Energia (secondary) | winter 30–31.03; shoulder 20–26.22; summer 10–14.98 €/MWh | | HAMK PDF | UNVERIFIED |
| Vattenfall / Danish | not located | | | NOT FOUND |

## 2. Vancouver filings

| Item | Value | Source | Status |
|---|---|---|---|
| BCUC Order G-94-25 (10 Apr 2025) | Creative Energy Vancouver Platforms; "New Plant Premises and Interconnection Infrastructure Capital Expenditures" (720 Beatty). **Rejected**: "Creative Energy's capital expenditure schedule of $38.5 million … is rejected." Directed CE to apply for any low-carbon service rate ≥ 6 months ahead. Components: New Plant ≈ $31.0 M; Interconnection ≈ $7.5 M. Developer 720 Beatty LP (Westbank); CE rate-base share "limited to $15 million" (C-1-20). Rate impact if ratepayers bore it: 2026 steam $16.95/M# (+35%); with Decarbonization Plant $22.71 (+81%). **No heat purchase, waste heat, data centre or 150 W Georgia content.** | https://www.ordersdecisions.bcuc.com/bcuc/orders/en/522707/1/document.do ; G-269-24 https://www.ordersdecisions.bcuc.com/bcuc/orders/en/522480/1/document.do | CONFIRMED |
| 720 Beatty cost split | ≈ $74 M total; developer ≈ $59 M; CE $15 M | https://www.ordersdecisions.bcuc.com/bcuc/decisions/en/521408/1/document.do (G-360-22) p.4 | CONFIRMED |
| Creative Energy 2025 Core steam | $13.84/M#; NEFC contribution $10.99/MWh; revenue requirement $15,431,015; load 1,115,063 M# | https://www.ordersdecisions.bcuc.com/bcuc/orders/en/522881/1/document.do (G-199-25A) | CONFIRMED |
| Creative Energy 2026 interim | Downtown steam tiers $18.13–19.53 (first 50 M#) … $10.77–11.60; NEFC hot water $52.24–56.28 … $31.04–33.44/MWh | https://www.ordersdecisions.bcuc.com/bcuc/orders/en/523033/1/document.do (G-5-26) | CONFIRMED as summarised; ranges odd — re-read |
| Steam → MWh | $13.84/M# ÷ ~0.293 MWh/M# ≈ $47/MWh (≈1,000 Btu/lb) | | DERIVED |
| RTS 19744 | report 30 Jun 2026; "up to 40 MW" p.18; cond. 1.11 heat recovery study; "material condition"; applicant's sole cost — "not borne by the City, the NEU, or recovered from the NEU through rates or other charges"; CAC $0, DCL $0; no payment to owner specified | https://council.vancouver.ca/20260714/documents/rr1.pdf | **CONFIRMED, re-checked** |
| Referral 21 Jul 2026 | 23 Jul public hearing agenda https://vancouver.ca/files/cov/cov-public-hearing-july-23-2026.pdf ; 15 Jul motion https://council.vancouver.ca/20260715/documents/cfscmotion5.pdf ; see hunt 1 for agenda item 6 wording | | PARTIAL |
| **FCNEU 2026 rates — By-law 9552 (consolidated to By-law 14524 eff. 1 Jan 2026)** | Class 1 capacity levy $0.696/m²/month; Class 2 & 3 $10.466/kW peak/month; energy charge **$65.172/MWh**; riders $5.78 (Enhanced Green Heat), $9.73 (100% Renewable). **"Credit for heat energy returned to energy transfer station $65.172 per each MW hour multiplied by 50%" = $32.59/MWh** | https://bylaws.vancouver.ca/9552c.PDF Sch. C Parts 2–4 | **CONFIRMED, re-checked** |
| NEU rates report RTS 18251 (21 Oct 2025) | +3.2%; Class 1 net effective $141.4/MWh; 47 buildings, 667,000 m²; 71% renewable 2025; gas $2.23/GJ commodity; RNG $9.23 + $7.00/GJ → $5.78/MWh rider; "Four of the ETS's also enable customer-generated energy (from solar and waste heat)" | https://council.vancouver.ca/20251112/documents/spec1d.pdf pp.2, 6, App. A, B, F | CONFIRMED |
| NEU low-carbon expansion | $14.2 M → $20.1 M; +6.6 MW sewage heat pumps; no $/MWh cost of supply | https://council.vancouver.ca/20221025/documents/RTS15389-Incamerarelease-FINA-AdministrativeReport.pdf | CONFIRMED |
| Neighbourhood Energy Strategy heat-purchase terms | 2018 report located, not read | https://council.vancouver.ca/20180221/documents/pspc3.pdf | NOT CHECKED |

## 3. Buyer-ceiling inputs

| Item | Value | Source | Status |
|---|---|---|---|
| FortisBC Rate 3 (eff. 1 Jul 2026, G-131-26) | Basic $4.3395/day; delivery $5.165; S&T $1.171; gas $1.660; Rider 5 $0.212; Rider 8 $0.909 $/GJ | https://www.cdn.fortisbc.com/libraries/docs/default-source/about-us-documents/regulatory-affairs-documents/gas-utility/rateschedule_3.pdf | CONFIRMED |
| FortisBC Rate 2 | Basic $1.4178/day; delivery $5.665; S&T $1.365; gas $1.660; riders same | …/rateschedule_2.pdf | CONFIRMED |
| BC carbon tax | eliminated 1 Apr 2025 | https://www.ordersdecisions.bcuc.com/bcuc/orders/en/522700/1/document.do (G-88-25) | CONFIRMED |
| Rate 3 variable | 9.12 $/GJ = 32.8 $/MWh fuel → 38.6 $/MWh heat at 85% | | DERIVED (Rider 6 excluded) |
| Correction 18 Oct 2026 | Checked against the Rate 3 PDF (pages R-3.1 to R-3.3): all per-GJ charges total $9.305/GJ (delivery 5.377 incl. Rider 5; S&T 2.268 incl. Riders 6 and 8; gas 1.660). The tool and register now include Rider 6 → ≈ $39.4/MWh heat at 85% | | VERIFIED |
| Rate 2 variable | 9.81 $/GJ → 41.6 $/MWh heat | | DERIVED |
| BC Hydro LGS RS 1600 | basic 29.99 ¢/day; demand $13.83/kW; energy 6.79 ¢/kWh (no effective date on page) | https://app.bchydro.com/accounts-billing/rates-energy-use/electricity-rates/business-rates.html | UNVERIFIED |
| BC Hydro RS 1823 → 1830 | 1823 closed end F2026; RS 1830 (effective 1 Apr 2024; energy charges consolidated 1 Apr 2026): demand $12.178/kVA; energy 4.914 ¢/kWh | https://app.bchydro.com/accounts-billing/rates-energy-use/electricity-rates/transmission_rate.html | CONFIRMED |
| Alberta DERS gas Oct 2026 | $1.458/GJ (Sep $1.124); Apex $1.602/GJ | https://www.ucahelps.alberta.ca/regulated-rates.aspx | CONFIRMED |
| ATCO Gas North 2025 interim | Mid-Use fixed $1.899/day, variable $1.062/GJ; High-Use fixed $7.214/day, demand $0.177/GJ/day; Ultra fixed $8.142/day, demand $0.209 | https://act-media.auc.ab.ca/prd-wp-uploads/Shared%20Documents/Rates/Appendix3-ATCO-Gas-North-2025-interim-rate-schedules.pdf | CONFIRMED (2026 not fetched) |
| DERS North non-energy eff. 1 Jul 2026 | $0.371/day (G1), $0.423/day (G3) | https://media.auc.ab.ca/prd-wp-uploads/Shared%20Documents/Rates/DirectEnergyNorth-non-energy-rates.pdf | CONFIRMED |
| Alberta RRO/RoLR small business | EPCOR 12.01 ¢/kWh 2025–2026 | https://www.epcor.com/ca/en/ab/edmonton/account/rates/business/regulated-business.html | CONFIRMED |
| EPCOR default supply Aug 2026 | 7.22 ¢/kWh (<150 kW) | https://www.epcor.com/content/dam/epcor/documents/rates/actual-default-supply/2026-actual-flowthrough-default-prices.pdf | CONFIRMED |
| EPCOR DAS tariff eff. 1 Jan 2026 | Small $0.64111/day + $0.03351/kWh; Medium $1.94742/day + $0.27106/kVA/day; Large (150–4,999 kW) $43.4621/day + $0.22878/kW/day | https://www.epcor.com/content/dam/epcor/documents/rates/distribution-access-service-tariffs/2026-01-distribution-access-service-tariff.pdf | CONFIRMED |
| Edmonton downtown DE | **Not ENMAX** (exemption denied, AUC 24056-D01-2019); City + EPCOR Phase 1 operational Sep 2025 (Winspear, Century Place, Chancery Hall); gas-fired; no rates published | https://efiling-webapi.auc.ab.ca/Document/Get/652756 ; https://www.edmonton.ca/projects_plans/district-energy | CONFIRMED |
| Blatchford REU 2026 (frozen) | townhouse $2.07/unit/day + $0.0358/kWh; multi-unit $13.18/kW·month + $0.0358 (unit typo on page) | https://blatchfordutility.ca/2026-rates-blatchford-renewable-energy/ | CONFIRMED |

## 4. Literature

| Item | Value | Source | Status |
|---|---|---|---|
| Wahlroos, Pärssinen, Manner, Syri 2017, Energy 140:1228–1238, doi 10.1016/j.energy.2017.08.078 | purchase price 13.8–40.4 €/MWh seasonal; Elspot 41 (2013), 30 (2015); HP to 75 °C payback < 2 yr | https://acris.aalto.fi/ws/portalfiles/portal/17305461/1_s2.0_S0360544217314548_main.pdf Table 1 p.1233 | CONFIRMED (OA) |
| Pärssinen, Wahlroos, Manner, Syri 2019, SCS 44:428–444, doi 10.1016/j.scs.2018.10.023 | HP capex €60 k / €575 k / €5.5 M; DH pays marginal minus €5/MWh; Espoo marginal 14.7–57.8; Fortum 2018 list 15–50; consumer 74.8 €/MWh; payback medium 2.14–3.72 yr (min case >10), large 1.82–5.14 yr (corrected after verification) | https://acris.aalto.fi/ws/portalfiles/portal/29723097/ELEC_parssinen_et_al_waste_heat_sustainability.pdf s.2.4–2.5, Tables 3–4 | CONFIRMED (OA) |
| Wahlroos et al. 2018, RSER 82(2):1749–1764, doi 10.1016/j.rser.2017.10.058 | OA via Aaltodoc; not read | https://aaltodoc.aalto.fi/items/e1e2e35f-a2f0-4561-901b-3500c8b031f9 | NOT READ |
| Lygnerud & Werner 2018, Energy 151:430–441, doi 10.1016/j.energy.2018.03.047 | ~6% of recoveries lost/yr; premium "lower than often presumed" | https://ideas.repec.org/a/eee/energy/v151y2018icp430-441.html | BLOCKED (paywall) |
| Persson, Wiechers, Möller, Werner 2019, Energy 176:604–622, doi 10.1016/j.energy.2019.03.189 | Cd = a·(C1 + C2·da)/(qL·w); C1 = 212 €/m, C2 = 4,464 €/m²; w = 137.5e+5 (e ≤ 0.4) else 60 m; da = 0.0486·ln(qL·w)+0.0007; a = 0.051; EU28 marginal 6.34 €/GJ | https://vbn.aau.dk/ws/files/330989757/1_s2.0_S0360544219306097_main.pdf Eq. 5–7 | CONFIRMED (OA) |

## Derived window
**Vancouver** — floor: lower $18–33 (Fortum summer; NEU credit $32.59; 111 E 5th implicit $0 + unrecovered capex); central $45–57 (Stockholm 400 SEK); upper $80 (Fortum cold). Ceiling: gas $39–42 (Rate 3/2 at 85%); RNG ~$69; HP electricity at COP 3 ≈ $23 before capex; retail NEU $65.17, CE steam ≈ $47. **Window ≈ $39–69 vs floor $18–80 — overlaps.**
**Edmonton** — floor same Nordic references; ceiling gas ≈ $11, electric ≈ $24 at COP 3, Blatchford retail $35.8. **Window likely negative without carbon price or capacity value.**

## Blocked / not reached
- Lygnerud & Werner 2018 full text (ScienceDirect)
- stockholmexergi.se/oppen-fjarrvarme/ 404 (content moved; read at värmeåtervinning page)
- helen.fi older URL 404 (alternate read)
- BC Hydro LGS page 404; electric tariff PDF returned TOC only
- FortisBC web rate pages nav-only (PDFs used)
- Not located: Vattenfall/Danish purchase tariffs; NES third-party heat terms; FortisBC large-volume schedules; ATCO Gas North 2026 final rates
