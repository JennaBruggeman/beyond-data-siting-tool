# Hunt 1 — Site evidence: IT load, floor area, cooling type (6 Oct 2026; sections 7a, 7b, 8–14 restored/added 11 Oct 2026 after an editing loss; verifier corrections of 9 Oct applied)

Type key: PR public record · OC operator claim · M measured · NF not found · BL blocked. Aggregator sites used only to locate documents, not cited (except Atlas Cloud, flagged).

## VANCOUVER

### 1. Harbour Centre carrier hotel — 555 W Hastings St
| item | value | source | section | type |
|---|---|---|---|---|
| Cologix VAN1 floor area | "5K SQFT across two suites in the Harbour Centre" | https://www.cologix.com/data-centers/vancouver/van1/ | facility page | OC |
| Cologix VAN1 utility feed | "13.8 KV primary and standby redundant feeders", utility ATS | same | | OC |
| Cologix VAN1 cooling | perimeter CRAC + "Glycol-cooled in-row cooling (IRC) units with rooftop dry coolers"; "50-ton cooling capacity" | same | | OC |
| Cologix VAN1 IT power | not stated | | | NF |
| Cologix VAN1 spec sheet | JS-gated | https://cologix.com/resources/spec-sheets/van1-data-center-spec-sheet/ | | BL |
| Cologix VAN5 floor area | "10,800 SQFT across two suites" | https://cologix.com/data-centers/vancouver/van5/ | | OC |
| Cologix VAN5 power | "1.6 MW of power" | same | | OC |
| Cologix VAN5 cooling | "Glycol-cooled DX air conditioners with rooftop dry coolers", N+1 | same | | OC |
| eStruxture VAN-2 (ex-Aptum/Peer 1) power | "2.14 MW of critical IT load"; up to 10 kW/cabinet; 8 UPS 60 kVA–300 kW | https://www.estruxture.com/data-centers/vancouver/van-2 | | OC |
| eStruxture VAN-2 cooling | containment; "closed glycol loop with dry coolers on roof" + chilled loop "N+1 chillers and cooling towers" | same | | OC |
| Whole-building electrical | not found | | | NF |

Sum of claims ≥3.7 MW (VAN5 1.6 + VAN-2 2.14 + VAN1 unstated) — lower bound from claims.

### 2. Cologix VAN4 — 175 W Cordova St
| Power | "4 MW of colocation capacity"; 3–10 kW/cabinet | https://cologix.com/data-centers/vancouver/van4/ | OC |
| Floor area | "68K SQFT across four floors" | same | OC |
| Cooling | "Pumped refrigerant and air-cooled chilled water" | same | OC |
| DP-2022-00689 (issued 26 Jul 2023) | "adding new air cooled chiller units", "relocating existing load-bank", "replacing existing exhaust fans", "removing fuel tank at the roof level", "replacing transformers at the basement level"; height ≈24.7 m; HA-2 | https://www.shapeyourcity.ca/175-w-cordova-st | PR |
| Spec sheet | form-gated | https://cologix.com/resources/spec-sheets/van4-data-center-spec-sheet/ | BL |

### 3. Cologix VAN2 — 1050 W Pender St
| Power | "2 MW"; utility ATS | https://cologix.com/data-centers/vancouver/van2/ | OC |
| Feed | "Primaire 12,5 kV" (BC Hydro); 2 MW redundant | https://www.cologix.com/pdf/Vancouver-VAN2-SpecSheet-French.pdf | OC |
| UPS | "2 Mitsubishi de 750 kW chacun" (UPS, not generators — corrected 10 Oct) | same | OC |
| Generators | N+1 diesel, ≥24 h fuel, no kW stated | same | OC |
| Floor area | "15K SQFT"; design "150 [W] par p.c." | same | OC |
| Cooling | perimeter free-cooling CRAC DX with airside economizers; 180 t N+1; chimney cabinets | same | OC |
| Building | 22-storey office tower | same | OC |

### 4. Hut 8 — 900 W Hastings St
Address linkage unresolved: "Vancouver" page gives 900 W Hastings; "Vancouver Vault" page gives 1700-666 Burrard but FAQ also says 900 W Hastings.
| Hut 8 Vancouver (VAN1) | "0.6 MW designed power capacity"; "900kW UPS each for A and B side"; "435 kW supplied by 2 generators" | https://canada.hut8.com/centers/colocation-vancouver | OC |
| VAN1 floor area | "900 sq. ft. facility" — implausible vs 0.6 MW, flag | same | OC |
| VAN1 cooling | "118-tonne CRAC units, supporting 329 (N) kW IT Load", N+1 | same | OC |
| Vancouver Vault | "1 MW designed power capacity"; "560 kW UPS"; "600 kW generator", >48 h | https://canada.hut8.com/centers/vancouver-vault | OC |
| Vault floor | "6,210 sq. ft. facility", "4,155 sq. ft. of total whitespace" | same | OC |
| Vault cooling | five chillers "supporting 693 (N) kW IT Load", closed-loop CHW; Tier I | same | OC |

### 5. 111 E 5th Ave + 2060 Quebec St — RTS 19744
| Report | RTS 19744, 30 Jun 2026, Council 14 Jul 2026; applicant Westbank for 111 E 5th Property Inc.; architect WZMH | https://council.vancouver.ca/20260714/documents/rr1.pdf p.1–2 | PR |
| Use | I-1A → CD-1 "to add Bulk Data Storage Use"; 3 levels above + 2 below; ground-floor café | rr1 p.2; https://council.vancouver.ca/20260723/documents/phea6sr.pdf | PR |
| Load | "The rezoning application identifies a data centre with an anticipated load of up to 40 MW and contemplates the capture of waste heat and delivery of recovered waste heat to the NEU as part of the project concept." | rr1 p.17 (re-checked; page corrected) | PR (applicant figure reported by staff) |
| Area | site 2,767.3 m²; applicant FSR 3.0; staff est. up to 4.2 FSR = 11,622.6 m²; max height 20 m | rr1 p.4, 10, 28 | PR |
| Cooling | not specified; "The VBBL sets requirements for recirculation of cooling water"; rooftop mechanical with screening | rr1 p.5, 26 | NF |
| Heat recovery | Cond. 1.10 NEU connection; 1.11 "Data Centre Waste Heat Recovery Study and implementation concept"; "Successful waste heat recovery and delivery to the NEU is a material condition of the proposed use" | rr1 p.14–16 | PR |
| Who pays | "the costs of constructing and installing the waste heat infrastructure are not borne by the City, the NEU, or recovered from the NEU through rates or other charges" | rr1 cond. 1.11 (re-checked) | PR |
| Heat quantity | not stated | | NF |
| BC Hydro | "BC Hydro service to the site to be primary…"; "Supply and pricing of electricity is overseen by BC Hydro who have policies regarding new data centre connection" | rr1 cond. 1.16 p.17; p.26 | PR |
| DCL / CAC | $0 | rr1 p.7, App. E | PR |
| Consultation | 579 submissions; 289 online (3 support / 275 oppose / 11 mixed) | rr1 p.7 and p.24 (re-checked; page corrected) | PR |
| Referral back | "At the Council meeting of July 21, 2026 (reconvening from July 14 and 16, 2026), Council referred the referral report back to staff." | https://council.vancouver.ca/20260723/phea20260723ag.htm item 6; https://www.shapeyourcity.ca/111-e-5 | PR |
| Minutes motion text | not parsed from https://council.vancouver.ca/20260714/documents/regu20260714min.pdf | | unverified |
| Draft by-law, support letters | https://council.vancouver.ca/20260723/documents/phea6zdbylaw.pdf ; …/phea6support20260721_redacted.pdf | | PR (not parsed) |
| TELUS as operator | not in any City document; press only | | NF |

### 6. eStruxture VAN-1 — 55 E 7th Ave
| IT power | "2.4Mw critical IT load"; "up to 30kW/cabinet" | https://www.estruxture.com/hubfs/site-files/eStruxture_Datasheet_VAN1_EN-V5.pdf | OC |
| Substation | "Single high voltage entry with a dedicated 2.5MVA unit substation" | same | OC |
| Generators | ≥28 h fuel (datasheet) / 24 h (web) | same; https://www.estruxture.com/data-centers/vancouver/van-1 | OC |
| Floor area | "10,000 sq. ft. total space", "7,500 sq. ft. of cabinet space", 4 halls, 3 floors | datasheet | OC |
| Cooling | "rear door radiator cooling"; "40 Ton mechanical Loop1, N+1 250 Ton Mechanical Loop2"; "optimal free cooling (8+ months / year)" | datasheet | OC |

### 7. Atlas Cloud — 308 E 5th Ave
No operator publication located. Aggregator only ("1 MW", "3,000 sq.f.", 30 kW/rack; "No data supplied by Atlas Cloud") https://www.datacentermap.com/canada/vancouver/atlas-cloud/specs/ — do not cite.
| item | value | source | type |
|---|---|---|---|
| Operator pages (10 Oct 2026) | "308 East 5th Avenue site"; long-term lease on a former packing company's manufacturing plant; "the first phase of 16 racks is installed"; "ample load capacity and power available" — no kW, no area; services: power, cooling, bandwidth; SSAE 16 Type I audit, undated | https://www.atlasdatacenter.ca/about-atlas-cloud/ ; https://www.atlasdatacenter.ca/about-atlas-cloud/site-location/ | OC |
| Company | Atlas Cloud Enterprises Inc., CSE: AKE; Jan 2018 release: colocation plus digital-currency mining, 1,000 S9 miners in temporary colocation, 3 MW owned site in Electric City WA; MarketScreener lists the instrument as inactive and the profile under "Atlas Blockchain Group"; address 308 East 5th Ave V5T 1H4 | https://webfiles.thecse.com/AKE_NR_1.24.18_S9_Miners_V6.pdf ; https://www.marketscreener.com/quote/stock/ATLAS-CLOUD-ENTERPRISES-I-20706106/company/ | PR (CSE filing) / secondary |
| City permits | none issued at 308 E 5th 2017–2026 (three searches) | issued-building-permits exports | PR (absence) |

Reading: the site existed as a small colocation room (16 racks) in a leased industrial building, operated by a company that pivoted to crypto mining in 2018 and whose listing is now inactive. Current operation unverified; treat as a 16-rack, sub-100 kW room at most, or vacant. Keep on the list at 20 (judged) as the "small tenant in an industrial shell" case; confirm by site visit.

### 7a. Harbour Centre East Tower (Spencer Building) — 515 W Hastings St  [added 10 Oct 2026 from permits]
| item | value | source | section | type |
|---|---|---|---|---|
| Occupancy change | Office (Group D) → Bulk Data Storage (Group F2), entire floors 6, 8 and 9 of the East Tower; $18.0 M; issued 14 Apr 2023; applicant Gensler | City of Vancouver issued building permits, BP-2022-05512 (data/vancouver_permits_7sites.json) | permit description | PR |
| Plant | mechanical shaft P1 → level 1; Revision 1: generators moved from P1 to a new roof well on L8, radiators to L8, chiller platform widened ~93 → ~129 ft, pump-house reservoir on L5 dropped | same | Revision 1 | PR |
| Generator replacement | replace generator at parkade P1, $1.25 M, issued 1 Oct 2024 | BP-2024-01976 | | PR |
| Building | East Tower / Spencer Building, 8 storeys, Vancouver Heritage Register B; 24 permits 2018–2026 | permit export 10 Oct 2026 | | PR |
| Co-tenants | SFU Harbour Centre campus on floors 2, 3 and 7 (permits 2018, 2020, 2021, 2026 incl. $5.5 M 3rd-floor fit-out Apr 2026); Bombardier office #580 (2019); floor 6 cleared to shell Aug 2021 ahead of the 2023 conversion; a tenant "computer and server room" on floor 5 (#508, 2023) | BP-2018-00962, BP-2020-02040, BP-2026-00993, BP-2019-04029, BP-2021-02666, BP-2023-03181 | | PR |
| Operator | not named in the permit record | | | NF |
| IT load | not stated | | | NF |
| Floor area | pending BCA extract / footprint × storeys | | | NF |

Reading: the largest recent Vancouver fit-out in the public record; adjacent to site 1 and on the same block. Heat rejection on the L8 roof well. A university campus (SFU, three floors) shares the building with three floors of data hall — an institutional receiver inside the same envelope, which is the hospital-or-campus-anchor case without a street crossing.

### 7b. Uniserve — 333 + 369 Terminal Ave  [added 11 Oct 2026 from J.B.'s site visit; atlas V03]
| item | value | source | type |
|---|---|---|---|
| Operator | "uniserve" lettered at the top of 333; Uniserve listed at 802 in the lobby directory; filings place the data-centre room at Suite 209 | J.B. site visit (sources/12) | OBS |
| Co-tenants | schools, colleges, a high school, a music school, MCFD, an eatery, studios, events | lobby directory | OBS |
| Standby plant | Cummins generator in a 333 parkade stall; two Modapower enclosures in a cage between 333 and 369 (which building they serve not established) | J.B. site visit | OBS |
| IT load, area | not stated | | NF |

### 8. UBC University Data Centre — Pharmaceutical Sciences Building

| item | value | source URL | page/section | type |
|---|---|---|---|---|
| Floor area / racks | "5000 sq. ft. facility with a 110 Data Rack capacity" | https://it.ubc.ca/services/web-servers-storage/data-centre-co-location-service | service page | PR (university) |
| Completion | "completed in November 2012" | https://it.ubc.ca/node/2897 | — | PR |
| Heat recovery | "capturing waste heat from the data centre and recycling it into the building"; with other measures "about 1.2 million kilowatt hours of savings every year" (building-level, not DC-specific) | https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/power-smart/business/programs/success-story-ubc.pdf | case study | PR (utility) |
| kW/MW, PUE, cooling type | not found (searched UBC IT, BoG, Facilities, BC Hydro) | — | — | NF |

---

## EDMONTON

Primary dataset used: City of Edmonton General Building Permits (Socrata, open API).

### 9. Wolfpaw — 10155 102 St (permits name "Commerce Place"; the Wolfpaw page gives no street address — verifier 9 Oct)

| item | value | source URL | page/section | type |
|---|---|---|---|---|
| Operator specs | EDM1 "Downtown Edmonton", "Dual Power Grid", "Natural Gas & Diesel Backup Generator", "Redundant UPS", "Fully Redundant HVAC", Tier 3 standard; **no kW/MW or sq ft** | https://www.wolfpaw.com/edmonton-ab-data-center/ | facilities page | OC |
| Permits at 10155 102 St | 0-88859092 (2009-08-20) "redevelopment of computer server room" $193,600; 0-135801693 (2013-04-23) "Server Room renovations – Mechanical/Electrical" $83,477 (tenant not named) | https://data.edmonton.ca/resource/24uj-dj8v.json?$where=upper(address)%20like%20%2710155%20-%20102%20STREET%25%27 | API result | PR |
| Cooling type / measured energy | not found | — | — | NF |

### 10. ThinkTel — 10250 101 St (HSBC Bank Place)

| item | value | source URL | page/section | type |
|---|---|---|---|---|
| Operator specs | only "Colocation Facilities in Toronto, Ottawa, Montreal and Edmonton" | https://www.thinktel.ca/ ; https://thinktel.ca/our-network/ | — | NF |
| Permits at 10250 101 St | 38 permits 2009–2025; none mention data centre/server/generator/UPS; one "electrical/mechanical upgrades… main floor" (0-141765335, 2016) | https://data.edmonton.ca/resource/24uj-dj8v.json?$where=upper(address)%20like%20%2710250%20-%20101%20STREET%25%27 | API result | PR (negative) |
| Capacity / area / cooling | not found | — | — | NF |

### 11. Qu EDM1 — 10200 102 Ave (Edmonton City Centre) (permit query returned 24 rows — verifier 9 Oct)

| item | value | source URL | page/section | type |
|---|---|---|---|---|
| Power | "2.5MW Capacity"; "~5-10kW per rack"; "N+1 1MW Generators (x3)", 24 h fuel | https://qudatacentres.com/hubfs/location-spec-sheets/EDM1-Spec-Sheet.pdf | spec sheet | OC |
| Floor area | "18,000 ft² Building", "15712 ft² Raise Floor" | same | spec sheet | OC |
| Cooling | "248 Tons of N+1 cooling"; type not stated | same | spec sheet | OC |
| Address | Qu publishes only "Financial Core, Edmonton"; 10200 102 Ave link is from aggregators — unverified | https://qudatacentres.com/locations/edmonton-data-centre | — | unverified |
| Permits at 10200 102 Ave | 0-115388941 (2011-09-20) "Primus Data Centre City Centre West" $231,000; 0-134265322 (2013-02-14) "interior alterations (Data room…)" $1,000,000; 0-309784686 (2019-04-26) "data room (Powerhouse Data Centre Group, Unit 302G)" $35,000 | https://data.edmonton.ca/resource/24uj-dj8v.json?$where=upper(address)%20like%20%2710200%20-%20102%20AVENUE%25%27 | API result | PR |
| Ownership chain (Primus→Shaw/Rogers→Qu) | trade press only — not verified | — | — | NF |

### 12. The Internet Centre — 4130 95 St NW

| item | value | source URL | page/section | type |
|---|---|---|---|---|
| Operator specs | "Our own Edmonton data centre, network and phone switch"; address 4130 95 Street NW; no capacity figures | https://www.incentre.net/ ; https://incentre.net/business/business-hosting/ | — | OC (qualitative) |
| Permit | 2-518758248 (2024-08-13) "Installation of two new RTU's (AC Only) with removal of old condenser units" $120,000 → rooftop DX air cooling | Edmonton permits API (query above incl. 4130 - 95 STREET) | API result | PR |
| Capacity / area | not found | — | — | NF |

### 13. Qu EDM2 — 17204 114 Ave NW (Edmonton permit query returned 8 rows at this address, not 5 — verifier 9 Oct)

| item | value | source URL | page/section | type |
|---|---|---|---|---|
| Power | "2.5MW Tier II / 3MW Tier III"; Phase 1 "N+1 1MW Generators (x3)", Phase 2 "N+1 1MW (x2)"; Uptime Tier III certified | https://qudatacentres.com/hubfs/location-spec-sheets/EDM2-Spec-Sheet.pdf | spec sheet | OC |
| Floor area | "35,000 ft² Building"; raised floor Ph1 19,000 ft² + Ph2 14,196 ft² | same | spec sheet | OC |
| Cooling | "1450 Tons of N+1 cooling"; type not stated | same | spec sheet | OC |
| Permits (Rogers DC2 era) | 11-889736 (2012) screening walls for exterior mechanical, 30,140 sq ft; 3-166061828 (2015-05-12) "addition… (data centre and mechanical equipment). new RTU on roof" $850,000; 9-166061828 (2017) "install 2 air handling units", 9,690 sq ft; 1-342133530 (2019) fire alarm "in 2 generator buildings – Rogers EDC2"; 1-356648187 (2020-05-21) "EDMONTON DC2 HALL 7 & 8 EXPANSION" $4,000,000, 9,518.95 sq ft | https://data.edmonton.ca/resource/24uj-dj8v.json?$where=upper(address)%20like%20%2717204%20-%20114%20AVENUE%25%27 | API result | PR |
| Rogers→Qu transfer | trade press only (DCD, RENX) — not verified against a filing | — | — | NF |

---


### 14. Kyndryl Acheson-Edmonton — 9672 279 St, Acheson (Parkland County)  [added 11 Oct 2026; atlas E03]
| item | value | source | type |
|---|---|---|---|
| Building | windowless precast, ≈114 × 62 m (OSM footprint), front to 279 St; all plant on the south side | J.B. site visit (sources/12) | OBS |
| Cooling | two water-cooled chillers at 550 tons each (≈3.9 MW thermal) | Baxtel | OC |
| Power | dual utility feeds, standby generation (two "DG-1" enclosures seen); FortisAlberta 25 kV on 279 St, AltaLink 138 kV just east — feed not established | Baxtel; OSM; J.B. | OC / OBS |
| Grid territory | FortisAlberta, not EPCOR — Alta Reg 117/2026 and the AESO list apply; EPCOR area constraints do not | | PR (territory) |
| Carriers | Telus, Shaw/Rogers, Allstream/Zayo | Baxtel | OC |
| IT load, area, year | not stated | | NF |

## Server power & mass references

| item | value | source URL | page/section | type |
|---|---|---|---|---|
| Green Grid SEED (Server Energy Efficiency Database v2.0) | anonymized SPEC SERT data from manufacturers; download requires sign-in; licence forbids redistribution | https://thegreengrid.org/SEED ; https://www.thegreengrid.org/resources/library-and-tools/tggs-server-energy-efficiency-database | — | BL (login) |
| LBNL 2024 US DC Energy Usage Report — per-server W | 2-socket server operational power 365 W (pre-2014) → 600 W (2023) → 782 W (2028); 4S assumed 2× 2S; AI servers: 2-GPU ~3–4 kW, 4-GPU ~6–8 kW, 8-GPU ~10–12 kW rated; workload at 70% of rated; idle 36% of max (2023) conventional, 20% AI; colocation utilisation 21%→35% | https://climate.mit.edu/sites/default/files/2025-02/lbnl-2024-united-states-data-center-energy-usage-report.pdf (publisher page: https://eta-publications.lbl.gov/publications/2024-lbnl-data-center-energy-usage-report) | Fig 3.1 p.19; Fig 3.3 p.21–22; Fig 3.5 p.26; Fig 3.6 p.27 | peer-reviewed/government |
| Dell PowerEdge R650 (1U) weight | "Product Weight 21.25 kg"; U-height not stated in that doc | https://www.delltechnologies.com/asset/en-us/products/servers/technical-support/poweredge-r650.pdf | assumptions table | manufacturer |
| Dell PowerEdge R740 (2U) weight | "26.3 kg"; yearly TEC 1760.3 kWh; 4-yr life | https://i.dell.com/sites/csdocuments/corpcomm_docs/en/carbon-footprint-poweredge-r740.pdf | assumptions table | manufacturer |
| Dell PowerEdge R540 (2U) weight | "25.4 kg"; TEC 1636.368 kWh/yr | https://i.dell.com/sites/csdocuments/corpcomm_docs/en/carbon-footprint-poweredge-r540.pdf | assumptions table | manufacturer |
| Dell R760 (2U) LCA | 7,892.8–9,630.7 kWh over 4 yr (≈225–275 W avg); no total mass | https://www.delltechnologies.com/asset/en-us/products/servers/briefs-summaries/poweredge-r760-life-cycle-assessment.pdf | key findings | manufacturer |
| HPE DL380 Gen11 (2U) weight | "最大 37 kg" (8LFF/12LFF), "最大 33 kg" (8SFF/24SFF) — Japanese-language HPE spec | https://h50146.www5.hpe.com/directplus_ent/library/pdfs_servers/dl380gen11.pdf | p.5–7 | manufacturer |

Note: R740/R540 U-height (2U) is from general Dell product knowledge, not the footprint PDFs — verify against QuickSpecs before citing.

## Policy context found incidentally (primary)

- BC Industrial Electricity Allocation Framework: data-centre projects ≥10 MW must enter BC Hydro competitive selection; enabling Act = Bill 31 *Energy Statutes Amendment Act* (Nov 2025); call opened 30 Jan/1 Feb 2026. Framework page says 100 MW allocated to data centres over two years; news release says "as much as 400 megawatts" (likely all categories) — reconcile before use. https://www2.gov.bc.ca/gov/content/industry/electricity-alternative-energy/electricity/industrial-electricity-allocation-framework ; https://news.gov.bc.ca/releases/2026ECS0005-000095
- Energize Vancouver: applies to buildings ≥4,645 m²; enforcement paused by Council 21 May 2026; public disclosure only for owners who opt in. https://vancouver.ca/green-vancouver/green-large-commercial-and-multi-family-buildings.aspx

## BLOCKED URLs

- https://opendata.vancouver.ca/api/explore/v2.1/catalog/datasets?search=energy — robots.txt disallows /api/ (so building-permit and any benchmarking datasets could not be queried; none of the 8 Vancouver addresses could be checked)
- http://energycarbonreport.vancouver.ca/map/ — loads, but table is JS-populated; no rows retrievable
- https://cologix.com/resources/spec-sheets/van1-data-center-spec-sheet/ and …/van4-data-center-spec-sheet/ — JS redirect / form gate
- https://www.thegreengrid.org/resources/library-and-tools/tggs-server-energy-efficiency-database — sign-in required
- https://council.vancouver.ca/20260721/… and https://vancouver.ca/docs/council/phea20260723ag_revised.pdf — 404
- https://www.datacentermap.com/canada/edmonton/wolfpaw-edm/specs — page-view limit

## Most useful datasets/documents

1. City of Vancouver RTS 19744 referral report (the only public record with a stated data-centre load in either city): https://council.vancouver.ca/20260714/documents/rr1.pdf
2. City of Edmonton General Building Permits, Socrata API (full-text searchable; returned data-centre permits at 10200 102 Ave and 17204 114 Ave): https://data.edmonton.ca/resource/24uj-dj8v.json
3. Shape Your City DP summaries (confirm cooling plant from permits): https://www.shapeyourcity.ca/175-w-cordova-st ; https://www.shapeyourcity.ca/111-e-5
4. LBNL 2024 report, Ch. 3 (per-server power parameters): URL above
5. Dell carbon-footprint/LCA PDFs (server mass + TEC): i.dell.com / delltechnologies.com URLs above
6. Operator spec sheets with the most quantitative content: eStruxture VAN1 datasheet; Cologix VAN2 French spec sheet; Qu EDM1/EDM2 spec sheets

Overall: no measured energy use was found for any of the 13 sites; no Vancouver address could be checked against benchmarking data because the open-data API is robots-blocked for this agent (manual check at opendata.vancouver.ca/explore is recommended).