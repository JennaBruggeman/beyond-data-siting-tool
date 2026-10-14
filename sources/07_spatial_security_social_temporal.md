# Hunt 7 — Spatial, security, social/economic, temporal coefficients (9 Oct 2026)

VERIFIED = read in source · PARTIAL = source reached, figure in unread part · UNVERIFIED · BLOCKED.

## A. Spatial
| item | formula / threshold | value | source | status |
|---|---|---|---|---|
| Heat density classes (Heat Roadmap Europe) | q_L = population density × floor space per capita × specific demand; classes at 20 / 50 / 120 / 300 MJ/m²·yr (= 200 / 500 / 1,200 / 3,000 GJ/ha) | | Persson et al. 2019, Energy 176:604–622 https://vbn.aau.dk/ws/files/330989757/1_s2.0_S0360544219306097_main.pdf Eq.1, Tables 1–2 | VERIFIED |
| Effective width | w = 137.5e + 5 (e ≤ 0.4); w = 60 m (e > 0.4) | | same Eq.6 | VERIFIED |
| Linear heat density | q_L,w = Q_s ÷ L (Eq.4, p.607); lower limit 1.5 GJ/m (p.608) | | same | VERIFIED (equation number corrected) |
| Distribution cost | C_d = a(C1 + C2·d_a) ÷ q_L,w; d_a = 0.0486 ln(q_L,w) + 0.0007; C1 212 €/m, C2 4,464 €/m², a 0.051 | marginal 6.34 €/GJ at 50% share | same Eq.5, 7 | VERIFIED |
| RVO 1,000 GJ/ha | areas below 1,000 GJ/ha not viable (printed 'GJ/h') | RVO report p.8 https://www.rvo.nl/sites/default/files/2018/11/Rapportage%20kansenkaart%20warmte%20uit%20datacenters.pdf | | CONFIRMED on second pass (10 Oct) |
| Heat-pump plant footprint | DEA metric "1000 m² per MW" defined; chapter values unread | | https://ens.dk/media/3277/download p.12; ch.40 p.277 | PARTIAL |
| Pit storage footprint | 20.15 V^0.61 m² (DEA ch.140, text after Table 2); PlanEnergi: 100,000 m³ → 23,100 m² design, ~26,000 m² realistic; PlanEnergi fit 15.4 V^−0.369 (corrected) | | https://ens.dk/media/6448/download ch.140 Table 2; https://ens.dk/media/7413/download pp.31–32 | VERIFIED |
| PTES energy density | ≈ 47–97 kWh/m³ (Høje Taastrup, Gram) | | DEA ch.140 Table 3 | VERIFIED data; ratio derived |
| Boiler storage rule | ~30 m³ per MWh (100 MW boiler → 3,000 m³/h) | | https://ens.dk/media/7413/download p.21 | VERIFIED |
| Obtrusive light (CIE 150:2017 via ILP GN01/20) | vertical illuminance at window pre/post curfew: E1 2/<0.1; E2 5/1; E3 10/2; E4 25/5 lx; ULR 0/0/2.5/5/15% | | https://mta-sts.brighton-hove.gov.uk/sites/default/files/2021-05/OD65%20ILP-Guidance%20Note%201%202020.pdf Tables 3, 6, 8 | VERIFIED (ILP copy; CIE paywalled) |
| Vancouver property-line lux | none; 2015 motion to develop an Outdoor Lighting By-law | | https://council.vancouver.ca/20150203/documents/motionb2.pdf | VERIFIED (absence) |
| Edmonton lighting | Bylaw 12800 s.51 qualitative ("deflect, shade, and focus light away from Abutting Sites") | | https://webdocs.edmonton.ca/zoningbylaw/ZoningBylaw/Part1/Development/51__Lighting_of_Sites.htm | VERIFIED; Bylaw 20001 unchecked |
| Vancouver street right of way | Encroachment By-law 4243: agreement under s.5 required for pipes/ducts/tunnels under streets; $244.97/yr + $6.53/ft² over 150 ft²; prep $1,344.23 | | https://bylaws.vancouver.ca/4243c.pdf ss.3, 5, 10, Sch. A/B | VERIFIED |
| Vancouver neighbourhood energy franchise | City–Creative Energy Franchise Agreement (26 May 2014); permits ≤ 5 years | | https://www.bcuc.com/Documents/Proceedings/2015/DOC_43626_B-2_Updates-Bylaw-Schedule-8.pdf | VERIFIED |
| Edmonton ROW | Utility Line Assignment permit; private utilities sign Right of Way Consent and Access Agreement or Franchise Agreement; OSCAM for excavation | | https://www.edmonton.ca/business_economy/utility-line-assignment-permit | VERIFIED |

## B. Security (published standards only)
| item | value | source | status |
|---|---|---|---|
| Ontario GO-ITS 25.18 v1.2 (2015) | exists; 10 m standoff all new facilities, 45 m enhanced; 10 m clear landscaped ground; parking ≥45 m (enhanced); siting >5 km from industrial-disaster sites; no identifying signage (enhanced); fence ≥2.2 m; zones Public / Reception / Operations / Security / High Security | https://files.ontario.ca/tbs-2019-11-14/go-its-25-18-data-centre-physical-security.pdf ss.2.3, 2.4, 2.8, 2.9, 2.10 | VERIFIED |
| RCMP GCPSG-015 (2024) | zone definitions PZ/RZ/OZ/SZ/HSZ; server room minimum zone by classification (App. C) | https://rcmp.ca/en/lead-security-agency-physical-security/guidance-and-publications/gcpsg-015-2024-guide-application-physical-security-zones | VERIFIED |
| TBS Operational Security Standard | rescinded 2019 | https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=12329 | BLOCKED |
| TIA-942 ratings | Rated-1 to 4 definitions; public page sets no perimeter rules | https://tiaonline.org/?p=16534 | VERIFIED; standard text paywalled |

## C. Social and economic
| item | value | source | status |
|---|---|---|---|
| Energy poverty threshold (CUSP) | >6% of after-tax income on home energy; national median ≈3% | https://energypoverty.ca/ ; https://sustain.ubc.ca/sites/default/files/2020-30_Energy%20Poverty%20Community%20Profile_McNaughton.pdf p.2 | VERIFIED |
| Household energy spend, Canada | $2,535/yr (2019) | StatCan 11-10-0222-01 https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1110022201 | VERIFIED (Canada only) |
| Cost per watt of data-centre build | $10–20 USD/W (2007) | Fan, Weber, Barroso 2007 https://www.barroso.org/publications/PowerProvisioning.pdf §1 | VERIFIED |
| Barroso 3rd ed. §6.5 partially filled DC | p.135; "100% higher cost per watt" wording unread | https://link.springer.com/10.1007/978-3-031-01761-2 | PARTIAL |
| Turner & Townsend Canada 2025 | Vancouver 910–1,200; Calgary 815–1,080 CAD/ft² | https://assets.foleon.com/eu-central-1/de-uploads-7e3kk3/48604/cost_data_table_2025.e9125d36911e.pdf | VERIFIED (industry) |
| Heat-recovery capex | 0.5–0.65 M€/MW_heat; O&M 2,000 €/MW·yr; 6%, 20 yr | Hiltunen & Syri 2020, Energies 13(14):3551 https://www.mdpi.com/1996-1073/13/14/3551 §2.5 | VERIFIED (OA) |
| Fortum model | DH operator usually invests in the heat pump when not in the DC; upgrades to supply temperature; price by outdoor temperature and supply/return side | Wahlroos 2017 §3.3, §4.1.2; Hiltunen & Syri 2020 §2.3, 4.4 | VERIFIED |
| Risk term | ~6% of recoveries lost per year | Lygnerud & Werner 2018 abstract | VERIFIED abstract only |

## D. Temporal
| item | value | source | status |
|---|---|---|---|
| Vancouver HDD (design) | 2,925 °C·d below 18 °C (VBBL 2014, NRC) | https://free.bcpublications.ca/civix/document/id/public/vbbl2014/ep001021.1 | VERIFIED |
| Burnaby HDD (BCBC 2024) | 2,735 (137 m) | https://www.burnaby.ca/sites/default/files/acquiadam/2021-08/Climatic-and-Seismic-Values-for-Building-Design-in-Burnaby-Informational-Guide.pdf | VERIFIED |
| Edmonton HDD | ≈5,120 (NBC App. C, recalled) | | UNVERIFIED |
| ECCC normals 1991–2020 | | climate.weather.gc.ca | BLOCKED |
| Hourly profile from degree-days | hourly HDD = max(0, 16 − T_out); space heat ∝ hourly HDD; DHW constant; losses ~15% baseload | STRATEGO/HRE D2.2 2015 https://heatroadmap.eu/wp-content/uploads/2018/09/STRATEGO-WP2-Background-Report-2-Hourly-Distributions-1.pdf §2.1.2 | VERIFIED |
| DC capacity utilisation | 50% assumed (TWh→GW); colocation server utilisation 21→35% | LBNL 2024 pp.7, 23, 28 | VERIFIED |
| Average ÷ peak | ≈0.6 at facility level (Fan et al. 2007) | https://www.barroso.org/publications/PowerProvisioning.pdf Table 3, §4.5 | VERIFIED |
| BC Hydro transmission load connection | conceptual 4–6 wk; SIS 6–9 mo; transition 3–4 mo; FS 6–9 mo; >150 MVA assessed outside queue | https://app.bchydro.com/accounts-billing/electrical-connections/large-load/transmission.html | VERIFIED |
| AESO connection performance (Apr 2026) | Stages 0–2 target 24 wk, actual avg 86 wk; Stage 3 target 32, actual 134 wk | https://www.aeso.ca/assets/Uploads/grid/April-2026-Connection-Process-Performance.pdf p.2 | VERIFIED |

## Blocked / gaps
TBS security standard; ECCC normals; CER snapshots; Morgan & Claypool; DEA heat-pump chapter (truncated); RVO 1,000 GJ/ha primary not found; Edmonton HDD; Vancouver/Edmonton heating cost in dollars; CIE 150, TIA-942, Lygnerud & Werner full texts paywalled.
