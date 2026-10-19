# G — Electricity exchange (Vancouver / Edmonton)

Researched 2026-10-19. WebSearch + WebFetch only. Quotes are verbatim and under 15 words. "Derived" means my arithmetic on the source's own numbers.
Status codes: **V** = verified on the source page. **D** = derived from verified numbers. **UNVERIFIED** = not confirmed.

---

## 1. Rooftop solar PV (100 kW–1 MW)

### 1a. Cost and life

| Item | Value | Unit | Quote | Source / section | URL | Status |
|---|---|---|---|---|---|---|
| Capex 2022 (US) | 1.99 | USD/W_DC (about 1,990 USD/kW_DC) | "System prices of $1.99/WDC in 2022 and $1.78/WDC in 2023" | NREL ATB 2024, Commercial PV, CAPEX. 200 kW_DC flat roof, DC/AC 1.23 | https://atb.nrel.gov/electricity/2024/commercial_pv | V. Dollar year not stated |
| Capex 2023 (US) | 1.78 | USD/W_DC | same as above | same as above | same as above | V |
| Capex 2035, Moderate | 1.24 | USD/W_DC | (page value; 2030 is interpolated, not printed) | same as above | same as above | V |
| Fixed O&M | ~21 (range 0–40) | USD/kW_DC-yr | "The FOM cost of about $21/kWDC-yr" | same as above, O&M | same as above | V |
| Working life | 30 | years | "the 30-year lifetime of the plant" | same as above | same as above | V |
| What FOM covers | asset mgmt, insurance, security, cleaning, component failure | — | "insurance products, site security, cleaning, vegetation removal, and component failure" | same as above | same as above | V. Inverter replacement not named |
| Capex, Canada (200 kW, current) | 2.210 | CAD/W | "Commercial and Community" 200 kW array, current installation | CER (archived), *Economics of Solar Power in Canada – Methods* (2018 study; page modified 2022-06-30) | https://cer-rec.gc.ca/en/data-analysis/energy-commodities/electricity/report/archive/solar-power-economics/economics-solar-power-in-canada-methods.html | V. Dated, archived, excludes sales tax |
| Capex, Canada (near-future / low-cost) | 1.772 / 1.529 | CAD/W | same as above | same as above | same as above | V |
| Inverter replacement | 20-yr mean interval, $10,000/inverter (no size given) | — | slides 10, 15 example | NREL, Walker, *PV O&M Cost Model* (2017 workshop slides) | https://www.nrel.gov/docs/fy17osti/68023.pdf | V as an example only. No $/kW. **Treat as UNVERIFIED for the model** |

### 1b. Self-generation rules and credit

| Item | Value | Unit | Quote | Source / section | URL | Status |
|---|---|---|---|---|---|---|
| BC: RS 1289 net metering closes | 1 Jul 2026 | date | RS 1289 closed to new customers; RS 2289 effective 1 Jul 2026 | BCUC Order G-64-26 + Decision (24 Mar 2026) | https://www.ordersdecisions.bcuc.com/bcuc/orders/en/523115/1/document.do | V |
| BC: old RS 1289 size cap | 100 | kW installed | (cap raised from 50 to 100 kW in 2014 application) | BC Hydro RS 1289 amendment application (28 Feb 2014), App. B p.1 | https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/corporate/independent-power-producers-calls-for-power/net-metering/application-to-amend-rate-schedule-1289-net-metering.pdf | V. Now superseded |
| BC: new RS 2289 export limit | 100 per phase (300 for 3-phase) | kW net injection | "a net injection limit of 100 kW per phase after serving the customer's load" | G-64-26 Decision §2.4 p.16 | same as G-64-26 | V |
| BC: export credit (RS 2289) | 10 | ¢/kWh (CAD) | "an Energy Price of 10 cents per kWh for Net Generation" | G-64-26 Decision §2.3 p.14 | same as G-64-26 | V |
| BC: self-use offsets retail energy charge | yes, instantaneous netting | — | "Customers will be able to offset their consumption with their generation" | G-64-26 Decision §2.2 p.6 | same as G-64-26 | V. Demand-charge offset not addressed |
| BC: LGS eligible for RS 2289? | implied, not stated | — | "Particularly Medium General Service and Large General Service customers" | G-64-26 Decision §2.4 p.15 fn 103 | same as G-64-26 | Partly V. Transmission-rate eligibility **UNVERIFIED** |
| AB: micro-generation size limit | < 5 | MW, on customer site | "Generator capacity is less than 5 MW" | AESO, *Connecting Microgeneration* (17 Sep 2025) p.1 | https://www.aeso.ca/assets/Connecting-Microgeneration.pdf | V |
| AB: small / large split | < 150 kW / 150 kW–<5 MW | kW | "Small micro-generators: less than 150 kilowatts (kW)" | same, p.1 | same | V |
| AB: small credit | retailer's retail energy rate | ¢/kWh | "paid for their exported electrical energy based on the same price" | same, p.2 | same | V. EPCOR rate not retrieved |
| AB: large credit | hourly pool price | $/MWh | "multiplied by the pool price for the given hour" | same, p.2 | same | V |
| AB: 2025 average pool price | 43.68 (2024: 62.78) | CAD/MWh | Table 1, Annual Market Price Statistics | AESO *Annual Market Statistics 2025* p.1 | https://www.aeso.ca/assets/Annual-Market-Stats-2025.pdf | V |

---

## 2. Batteries for the grid

### 2a. AESO operating reserve (OR)

AESO does **not** publish annual average prices for regulating, spinning or supplemental reserve separately. Table 13 gives volume and cost by category only.

| Item | 2024 | 2025 | Unit | Quote | Source | URL | Status |
|---|---|---|---|---|---|---|---|
| Active procured, volume / cost | 5,834 / 255 | 5,928 / 206 | GWh / CAD M | TABLE 13: Annual Operating Reserve Statistics | AESO *Annual Market Statistics 2025* p.55 | https://www.aeso.ca/assets/Annual-Market-Stats-2025.pdf | V |
| Active procured, average | 43.71 | 34.75 | CAD/MW-h | — | cost ÷ volume | same | D (costs rounded to $M) |
| Standby procured, volume / cost | 713 / 10 | 709 / 8 | GWh / CAD M | same | p.55 | same | V |
| Standby procured, average | 14.03 | 11.28 | CAD/MW-h | — | derived | same | D |
| Standby activated, volume / cost | 87 / 6 | 110 / 4 | GWh / CAD M | same | p.55 | same | V |
| Standby activated, average | 68.97 | 36.36 | CAD/MWh | — | derived | same | D |
| Total OR cost | 271 | 218 | CAD M | (2025 down 19.6%) | p.55 | same | V |
| Storage share of active spinning | 25.8% | 32.0% | % | Figure 49 | p.57 | same | V |
| Storage share of active supplemental | 9.1% | 18.7% | % | Figure 49 | p.57 | same | V |
| Product-level prices (reg / spin / supp) | — | — | — | not in report | — | — | **UNVERIFIED / gap** |

### 2b. BC Hydro programmes and demand charge

| Item | Value | Unit | Quote | Source / section | URL | Status |
|---|---|---|---|---|---|---|
| LGS demand charge | 13.83 | CAD/kW per billing period (highest 15-min demand) | "$13.83 per kW." | BC Hydro Business rates page (RS 1600/1601/1610/1611) | https://app.bchydro.com/accounts-billing/rates-energy-use/electricity-rates/business-rates.html | V. **1 Apr 2026 effective date UNVERIFIED** (not on page) |
| LGS energy charge | 6.79 | ¢/kWh | "6.79 cents per kWh." | same | same | V |
| LGS basic charge | 29.99 | ¢/day | "29.99 cents per day." | same | same | V |
| DR for Business payment | 50 | CAD/kW per winter season (average kW reduced) | "$50 per average kilowatt (kW) demand reduction" | BC Hydro DR behavioural page | https://www.bchydro.com/powersmart/business/programs/large-demand-response/behavioural.html | V |
| DR season / events | 1 Nov–31 Mar; ≤20 events; ≤4 h; ≥1 business day notice; ≥50% participation | — | "up to a maximum of twenty (20) Events a Season" | DR T&Cs v2.1 (rev. 17 Feb 2026) §5, 6, 9 | https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/power-smart/business/programs/demand-response-for-business-terms-and-conditions.pdf | V |
| DR: fossil generators | not allowed | — | "Diesel and other fossil fuel generators are prohibited in this program" | DR customer manual (2026-08-05) §2.2.5 p.5 | https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/power-smart/business/programs/demand-response-for-business-customer-manual.pdf | V. Batteries not named in DR manual; covered by ESI below |
| Energy Storage Incentive (ESI) | lesser of $10,000 × kW, $10,000 × kWh/4, or 80% of eligible cost | CAD | "80% of eligible project costs" | ESI customer manual (2026-09-24) §2.2 p.7 | https://bchydro.com/content/dam/BCHydro/customer-portal/documents/power-smart/business/programs/esi-customer-program-manual.pdf | V. In practice the 80% cap binds |
| ESI terms | ≥25 kW; 10-yr contract; non-exporting, behind the meter; events ≤4 h, ≤2/day; pass ≥85% of events | — | "Batteries must meet a minimum nominated capacity requirement of 25 kW." | same, pp.3, 8, 16–18 | same | V |
| ESI eligible rates | SGS/MGS/LGS, irrigation; not transmission, not RS 2289/2290 | — | (§2.3 p.8) | same | same | V |
| ESI clawback | 10% per failed annual test; pro-rata over 120 months if withdrawn | — | (p.18) | same | same | V |

### 2c. Battery cost and life

| Item | Value | Unit | Quote | Source / section | URL | Status |
|---|---|---|---|---|---|---|
| Utility-scale 4 h capex, 2024 | 334 | USD 2024/kWh | "The 2024 starting point of $334/kWh" | NREL TP-6A40-93281, *Cost Projections for Utility-Scale Battery Storage: 2025 Update* (Jun 2025) p.8, Table 2 | https://docs.nrel.gov/docs/fy25osti/93281.pdf | V. Utility-scale basis (ATB uses 60 MW) |
| 2030 projection | 207 / 279 / 354 (low/mid/high) | USD 2024/kWh | Table 2 p.16 | same | same | V |
| Fixed O&M | 4% of $/kW capex per year | %/yr | "4% of the $/kW capacity cost for a 4-hour battery" | same p.11 | same | V |
| Life / round-trip efficiency | 15 yr / 85% | — | "The lifetime we selected is 15 years" | same p.12 | same | V |
| Commercial (100–2,000 kW) pack price, 2 h / 4 h | 215 / 199 | USD 2022/kWh (pack only) | (pack price, plus inverter $97.5/kW_DC) | NREL ATB 2024, Commercial Battery Storage | https://atb.nrel.gov/electricity/2024/commercial_battery_storage | V. Total installed $/kWh not in page text (spreadsheet only) |
| Commercial fixed O&M / life | 2.5% of $/kW capex; 15 yr; 85% RTE | — | "FOM costs are estimated at 2.5% of the capital costs" | same | same | V |

---

## 3. EV charging sold to the public

| Item | Value | Unit | Quote | Source / section | URL | Status |
|---|---|---|---|---|---|---|
| BC Hydro L2 rate | 28.28 | ¢/kWh (before riders) | "28.28 cents per kilowatt-hour (kWh) for Level 2 charging" | BCUC Order G-30-26 (23 Feb 2026), Recital B | https://www.ordersdecisions.bcuc.com/bcuc/orders/en/523073/1/document.do | V. Unchanged since G-67-24 (2024) |
| BC Hydro DCFC rate, 2024 base | 34.34 | ¢/kWh (before riders) | "34.34 cents per kWh for all fast-charging stations" | same | same | V |
| BC Hydro DCFC rise | +6% from 1 Apr 2026 | % | "by 6 percent, effective April 1, 2026." | G-30-26 Order ¶1 | same | V |
| BC Hydro DCFC rate from 1 Apr 2026 | 39.70 | ¢/kWh (incl. F2027 general rate increase) | "resulting in a proposed fast-charging rate of 39.70 cents per kWh" | G-30-26 Decision §2.1.3 p.10 | same | V as quoted ("proposed" wording) — final tariff page not checked |
| BC Hydro idle fee | 40 | ¢/minute (extended stay) | (G-67-24, cited in G-235-25) | BCUC Order G-235-25 (26 Sep 2025) | https://www.ordersdecisions.bcuc.com/bcuc/orders/en/522903/1/document.do | V via second-hand order text. Unchanged in G-30-26 |
| Alberta public rate (utility/city network) | — | — | — | none found | — | **UNVERIFIED / gap** |
| Capex per port, L2 (2025) | 15,000 (2030+: 10,000) | CAD 2022/port | "Per-port installation and equipment cost estimates (2022 dollars)" | Dunsky + ICCT for NRCan, *EV Charging Infrastructure for Canada* (Feb 2024) §2.5.1 Table 12 | https://natural-resources.canada.ca/energy-efficiency/transportation-alternative-fuels/resource-library/electric-vehicle-charging-infrastructure-for-canada/25756 | V. Report is Feb 2024, values are for 2025 |
| Capex per port, DCFC (2025) | 160,000 at 125 kW avg (2030: 240,000 at 175 kW) | CAD 2022/port | same as above | same | same | V |
| Utilisation, DCFC | high case 11% (2025), 18% (2030), 20% (2035–40); Europe 15% | % | "Average network utilization of 15% for DC fast charging" | same §2.6.1 Table 14 | same | V. Baseline % not stated (high case is "roughly double" baseline) |
| Utilisation, L2 | — | — | — | not found in gov or peer-reviewed source | — | **UNVERIFIED / gap** |

---

## 4. Curtailment / flexibility (BC Hydro 2026 Call for Demand)

| Item | Value | Unit | Quote | Source / section | URL | Status |
|---|---|---|---|---|---|---|
| Eligible request size | 10–145 | MW | "10MW of capacity or greater, but not more than 145MW" | BC Hydro 2026 CfD info session (9 Feb 2026), slide 8 | https://app.bchydro.com/content/dam/BCHydro/customer-portal/documents/accounts-billing/electrical-connections/2026-cfd-info-session-2026feb09.pdf | V |
| Curtailment depth | ≥10% of requested load | % | "no less than 10% percent of the electricity or load requested" | slide 10 | same | V |
| Curtailment hours | ≥144 h/yr (Oct–Sep); ≥36 events; ≥4 h each | h/yr | "no fewer than 144 hours of curtailment per 12-month period" | slide 10 | same | V |
| Payment for curtailing | none | — | "without any incentive or compensation" | slide 10 | same | V. Value to the site is getting connected, not cash |
| Minimum bid price | 10% over RS 1830 or RS 1611 | — | "minimum bid price of 10% over Rate Schedule (RS) 1830 or RS1611" | slide 10 | same | V |
| Bid security / study fee | 25,000/MW; 75,000 (10,000 some distribution) | CAD | "Amount is $25,000 per MW of the request" | slides 12–13 | same | V |
| 24 h notice | — | — | not stated in slides | — | same | **UNVERIFIED** |

---

## Blocked
- https://www.bchydro.com/powersmart/electric-vehicles/charging-on-the-go/charging-rates-roaming.html (robots disallowed). BCUC orders used instead.

## Gaps
1. AESO gives no annual price per product (regulating / spinning / supplemental). Only blended category averages (derived) are available.
2. No Canadian primary source for **current** commercial PV capex. CER figure (CAD 2.21/W) dates from 2018. NREL is US (dollar year not stated).
3. Inverter replacement for commercial PV: no primary $/kW figure found.
4. NREL commercial battery total installed $/kWh is only in the ATB spreadsheet, not the page. Utility-scale $334/kWh (2024 USD) is the best verified figure.
5. Effective date of BC Hydro LGS $13.83/kW is not on the rates page (1 Apr 2026 **UNVERIFIED**).
6. RS 2289 eligibility for transmission-rate customers is not stated. Whether self-generation lowers the demand charge is not addressed.
7. Alberta: no utility- or city-run public EV rate found. EPCOR retail energy rate (small micro-gen credit) not retrieved.
8. The NRCan report gives no baseline DCFC or L2 utilisation %. No peer-reviewed utilisation figure retrieved.
9. Call for Demand: the 24 h notice is not in the info-session slides, and the CfD offers no $ value for curtailing.
