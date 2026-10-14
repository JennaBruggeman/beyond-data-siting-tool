# Hunt 6 — Coefficients to quantify opportunities (9 Oct 2026)

confirmed = read in the cited page · UNVERIFIED = cited by a read source, primary not opened · operator claim · derived = our arithmetic.

## 1. EV charging hub
Formula: stalls = P_reserved (kW) × SF ÷ P_charger (kW); area = stalls × A_stall.
| item | value | source | status |
|---|---|---|---|
| Level 2 AC | 7.4 / 11 / 22 kW; J1772 up to 19.2 kW; 208–240 V | https://www.energy.wsu.edu/documents/1%20Charging%20Speeds%20Ports%20Specs.pdf | confirmed (WSU Energy Program) |
| DC fast tiers | 50 / 100 / 150 / 240 / 300 kW; CCS up to 350 kW | same | confirmed |
| City of Vancouver DCFC definition | "typically supplies output power between 25 and 400 kW" | https://council.vancouver.ca/20210706/documents/r4.pdf App. A | confirmed (draft text) |
| BC Hydro fast charger | 180 kW unit splittable to 2 × 90 kW | https://www.bchydro.com/news/press_centre/news_releases/2023/ev-fully-charged.html | confirmed (utility) |
| Vancouver EV-ready | 100% dwelling stalls Level 2; 45% non-dwelling; EVEMS ≥12 kWh per EVSE over 8 h | r4.pdf s.4.14; https://vancouver.ca/files/cov/2019-006-electric-vehicle-charging-for-buildings.pdf | confirmed |
| Vancouver stall | 2.50 × 5.50 m; 90° aisle 6.6 m → 13.75 m² net, ≈22 m² gross | https://guidelines.vancouver.ca/bulletins/bulletin-parking-loading-design-supplement.pdf Fig.1 p.6, Table 2 p.8 | confirmed + derived |
| Edmonton stall (Bylaw 12800, superseded) | 2.6 × 5.5 m; aisle 7.0 m → 14.3 m² net, ≈23.4 m² gross | https://webdocs.edmonton.ca/zoningbylaw/ZoningBylaw/Part1/Development/54_1_General_On-Site_Parking_and_Loading_Requirements.htm | confirmed; Bylaw 20001 BLOCKED |
| Simultaneity factor | 0.5 "in most cases" | Silber, Scheubner, Märtz 2024, IJEPES 155:109540, doi 10.1016/j.ijepes.2023.109540 https://publikationen.bibliothek.kit.edu/1000163825 | confirmed (abstract) |
| NREL bound | 25–100% peak plug utilisation | https://www.nrel.gov/docs/fy21osti/77634.pdf pp.6–7, 34, 39 | confirmed (slides) |
| BC Ministerial Order M104 (18 Mar 2019) | exempts public EV charging providers from UCA Part 3 (except ss.25, 38 safety); implemented by BCUC G-66-19 | https://www.bclaws.gov.bc.ca/civix/document/id/mo/hmo/m0104_2019 ; https://www.bcuc.com/Documents/Proceedings/2019/DOC_53650_G-66-19-BCUC-EV-Inquiry-Exemption.pdf | confirmed |

## 2. Homes heated
Formula: homes = Q_available ÷ (E_household × f_spaceheat).
| item | value | source | status |
|---|---|---|---|
| Household energy BC | 81.2 GJ/household/yr (2021) | StatCan 25-10-0060 via NL Statistics mirror https://www.stats.gov.nl.ca/Statistics/Topics/industry/PDF/Household_Energy_Consumption_CanProvsTerrs.pdf ; CSV https://www150.statcan.gc.ca/n1/tbl/csv/25100060-eng.zip | confirmed (mirror; StatCan page BLOCKED) |
| Household energy AB | 121.8 GJ (2021) | same | confirmed (mirror) |
| Canada average | 95.70 GJ (2020); 14.9 M households | https://oee.rncan-nrcan.gc.ca/publications/statistics/trends/2020/residential.cfm | confirmed |
| Space-heating share, Canada | 0.61 (2020) | same | confirmed |
| Derived space heat | BC ≈ 50 GJ; AB ≈ 74 GJ per household/yr | | derived (national share applied) |
| Provincial CEUD space-heat tables | | oee.nrcan.gc.ca | BLOCKED |

## 3. Greenhouse heat
Formula: area = Q_available ÷ q_greenhouse; peak check Q = U × A × ΔT.
| item | value | source | status |
|---|---|---|---|
| Manitoba double-poly, Sep–May | 2.1 GJ/m²/yr | https://www.gov.mb.ca/agriculture/crops/crop-management/print,energy-calculations.html | confirmed |
| Ontario vegetable heating | 42.01 ekWh/ft² → 1.63 GJ/m²/yr | IESO Greenhouse Energy Profile Study 2019, Exhibit 53 p.60 https://ieso.ca/-/media/Files/SaveOnEnergy/Industry/Greenhouse-Energy-Profile-Study.ashx | confirmed + derived |
| Ontario flowers | 34.21 ekWh/ft² → 1.33 GJ/m²/yr | same, Exhibit 73 p.79 | confirmed + derived |
| Dutch benchmark | tomato 1.80–1.87; cucumber 1.37–1.75 GJ/m² | https://www.eeca.govt.nz/assets/EECA-Resources/Energy-Benchmarking-in-Covered-Cropping.pdf Tables 5a–5d | confirmed (comparison) |
| Alberta design ΔT | 50–60 °C; lows −30 to −40 °C | https://www1.agric.gov.ab.ca/$department/deptdocs.nsf/all/opp2892 | confirmed |
| Set-point | 20–24 °C day | Alberta Agdex 250/830-2 p.8 | confirmed |
| Envelope U | single glass 6.8; double poly 4.5; polycarbonate 3.4 W/m²K | https://ceac.arizona.edu/sites/default/files/giacomelli%20heating.pdf p.2 | confirmed (lecture notes) |
| Supply temp, pipe-rail | 82 °C | same p.6 | confirmed |
| Supply temp, root-zone/floor | ~38 °C target; max 54 °C; <25% of coldest-night load | https://farm-energy.extension.org/root-zone-heating-systems-for-greenhouses/ | confirmed |
| BC/AB GJ/m² | | | not found |

## 4. Land-based aquaculture (RAS)
| item | value | source | status |
|---|---|---|---|
| RAS energy, salmon smolt | 5.1–12.8, mean 8.8 kWh/kg (total electricity) | https://www.ntnu.no/bridge/node/22667 | confirmed (summary) |
| RAS grow-out model | 9.59 kWh/kg | https://hvlopen.brage.unit.no/hvlopen-xmlui/handle/11250/3062037 | confirmed (abstract) |
| DFO closed containment | 80 kg/m³ max density; 199–1,576 TJ per 2,500 t cycle | https://waves-vagues.dfo-mpo.gc.ca/library-bibliotheque/332156.pdf pp.9, 14 | confirmed |
| Rainbow trout temperature | growth 9–14 °C; optimum <21 °C | https://fao.org/fishery/docs/CDrom/aquaculture/I1129m/file/en/en_rainbowtrout.htm | confirmed |
| Heat per tonne | | | not found — model from make-up water × ΔT × 1.16 |

## 5. Sewage heat
| item | value | source | status |
|---|---|---|---|
| Heat equation | P = Q × 4.18 × ΔT → 1.161 kWh/m³·K | Wilson & Worrall 2021, doi 10.1039/d1ew00411e https://pubs.rsc.org/en/content/articlepdf/2021/ew/d1ew00411e p.1764 | confirmed |
| Cooling limit | 0.5 °C suggested (literature) | same p.1761 | confirmed |
| Metro Vancouver constraints | sewage not below 6 °C; WWTP inflow ≥ 11 °C; ~100 MW region, ~45 MW City | https://www.canadianconsultingengineer.com/awards/pdfs/2014/F5_HeatSeekingSewerModel.pdf | confirmed (consultant award) |
| False Creek NEU sewage plant | 2006 design: 2.5 MW base sewage heat, COP ~3, $59/MWh levelized (RTS 06419); +6.6 MW expansion confirmed; '3.2 MW' and '24 MW boilers' not found on cited pages — withdrawn | https://vancouver.ca/home-property-development/southeast-false-creek-neighbourhood-energy-utility.aspx ; https://council.vancouver.ca/20180918/documents/a9.pdf | confirmed |
| Sewage flow | | | not found |

## 6. Copper and metals
| item | value | source | status |
|---|---|---|---|
| Copper per MW | 20–40 t/MW; 400 kg/rack basis | Copper Development Association / BlueWeave 2023 https://live.copper.org/copperpowers/reports/copper-in-data-centers-report.pdf p.21 | confirmed (industry) |
| Busbar copper | up to 200 kg per 1 MW rack | https://developer.nvidia.com/blog/nvidia-800-v-hvdc-architecture-will-power-the-next-Generation-of-ai-factories | operator claim |
| Rack density average | below 8 kW | Uptime Institute survey 2024 key findings | confirmed (summary) |
| IT density modelled | 1,076–5,382 W/m² large; 430–1,076 small room | Sun et al. 2021, Energy & Buildings 231:110603 https://eta-publications.lbl.gov/publications/prototype-energy-models-data-centers | confirmed (abstract) |
| Measured federal DCs | 33 / 50 / 62 W/ft² | https://www.energy.gov/sites/prod/files/2014/06/f16/casestudy_3federaldatacenters_0.pdf Table 2 | confirmed |

## 7. Distributed servers as heaters
| item | value | source | status |
|---|---|---|---|
| Data Furnace design | 350 W/server; 37–114 servers per 1,700 ft² house by climate | Liu et al. 2011 https://classpages.cselabs.umn.edu/Fall-2021/csci8980-ec/papers/EdgeArch/furnace.pdf §2, Table 2 | confirmed (workshop paper) |
| heata | up to 4.8 kWh/day hot water | press | operator claim |
| Qarnot | 350 heaters >150 kW → ≈0.43 kW each | press | operator claim |

## 8. Insects and algae
| item | value | source | status |
|---|---|---|---|
| BSF larvae temperature | 27–39 °C growth; commercial ~34–35 °C | Schøn et al. 2024, J. Insects as Food and Feed | confirmed temps |
| Insect heat per kg | | | not found |
| Chlorella thermoregulation | 217 kWh/kg dry weight; 24 °C | Gurreri et al. 2023, Chem. Eng. Trans. 105:229, doi 10.3303/CET23105039 https://www.cetjournal.it/cet/23/105/039.pdf | confirmed |

## 9. Warming / cooling centre
| item | value | source | status |
|---|---|---|---|
| Upper indoor limit (older adults) | 26 °C | Health Canada June 2026 https://www.canada.ca/en/health-canada/services/publications/healthy-living/guidance-upper-indoor-temperature-limits-protecting-older-adults.html | confirmed |
| BC thresholds | ≤26 safe; 26–31 risk; >31 avoid; fans ineffective >35 °C | https://www.islandhealth.ca/sites/default/files/environment/documents/extreme-heat-letter.pdf | confirmed |
| Metabolic heat | seated 108 W; standing 126; walking 207 W (3.2 km/h); 180 W is 'walking about, office' (corrected) | ASHRAE Fundamentals via EnergyPlus docs https://bigladdersoftware.com/epx/docs/9-0/input-output-reference/group-internal-gains-people-lights-other.html | confirmed (secondary) |

## Blocked
bylaws.vancouver.ca/parking/sec04.pdf; oee.nrcan.gc.ca CEUD; www150.statcan.gc.ca table page; zoningbylaw.edmonton.ca; cer-rec.gc.ca; PMC article (CAPTCHA); Uptime full report (login).
