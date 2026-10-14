#!/usr/bin/env python3
"""13 Oct 2026 — restructure formula_register.json around the tool-logic decisions (tool_logic_decisions.md)
and fold in the deep dive (sources/14). Idempotent: safe to run again.
Everything marked 'proposed' is Claude's classification for J.B. to check."""
import json, os
here = os.path.dirname(os.path.abspath(__file__))
P = os.path.join(here, 'formula_register.json')
r = json.load(open(P, encoding='utf-8'))
Q = {q['id']: q for q in r['quantities']}
C = {c['id']: c for c in r['conditions']}
S = r['new_sources']

# ---------------------------------------------------------------- sources from hunt 14
S.update({
 'van3575s2': "City of Vancouver Zoning and Development By-law 3575, Section 2 (Jun 2026 consolidation): 'Bulk Data Storage' = 'The use of a wholly enclosed building for the storage of information on operating data servers', in the Transportation and Storage Uses group — https://bylaws.vancouver.ca/zoning/zoning-by-law-section-2.pdf",
 'vanDistricts': "Vancouver district schedules (Jun 2026 / Nov 2025): Bulk Data Storage Conditional in I-2 (s.2.2.7, not at ground floor), I-3 sub-area A (s.2.2.11), I-1C (s.2.2.1); not listed in I-1, I-1A, I-1B, I-4, IC-1–3, M-1, M-1A, M-1B, M-2, MC-1/2; Downtown ODP (DD) does not list it; CD-1 sets its own uses — https://bylaws.vancouver.ca/zoning/ (district schedule PDFs)",
 'rts19744p4': "RTS 19744 p.4: 'While the site's existing I-1A zoning does not allow data centres, this use is consistent with the RGS and ODP'; DCLs $0 on the applicant's estimate of no net floor area (p.6); pulled from the 23 Jul 2026 hearing, further consultation after the election (Shape Your City) — https://council.vancouver.ca/20260714/documents/rr1.pdf ; https://www.shapeyourcity.ca/111-e-5",
 'vanRezoneTime': "City of Vancouver: typical CD-1 rezoning 'Target ~16 weeks to Letter of Response', 'Target ~15 months to decision' (process overview); 'about one year to process (from fee payment to public hearing)' (apply-to-rezone page, Jun 2026) — https://vancouver.ca/files/cov/rezoning-process-overview.pdf",
 'vanFees2026': "City of Vancouver 2026 development and building permit fees (effective 1 Jan 2026), Schedule 2 s.3 new CD-1: elsewhere $94,500 + $1,590 per 100 m² (max $343,700) under 8,000 m²; Downtown/Broadway $226,300 + $1,590/100 m²; larger bands to $8,183,200; development permit 'all other uses' conditional $2,530 per 100 m² to 500 m² then $1,570 (max $366,600) — https://vancouver.ca/files/cov/vancouver-development-building-permit-fees.pdf",
 'vanDCL': "Vancouver DCL Bulletin (amended 25 Aug 2026), Table 1 rates from 10 Dec 2025: Industrial (I-2, M-1, M-1A, M-1B, M-2) $112.87/m²; Mixed Employment (IC-1–3, I-1, I-1A–C, I-3, I-4) $211.54/m²; no levy where floor area does not increase (s.6.1(a)) — https://guidelines.vancouver.ca/bulletins/bulletin-development-cost-levies.pdf",
 'vanACC': "Vancouver Amenity Cost Charges, RTS 18333 (6 Jul 2026) Table 5: Industrial $12.92/m², Mixed-Employment $24.22/m², Commercial $32.29/m², effective 30 Sep 2026, in addition to DCLs — https://council.vancouver.ca/20260714/documents/r4.pdf",
 'vanCAC': "Vancouver CAC Policy (amended 30 Sep 2026) s.8.2(c): rezonings submitted after 30 Sep 2026 that are 100 % commercial, industrial and institutional are exempt — https://guidelines.vancouver.ca/policy-community-amenity-contributions-for-rezonings.pdf",
 'vanPermitTimes': "City of Vancouver memo to Council, 10 Feb 2025 (3-3-3-1 permitting): Target D 'One year to approve permits for high rise and large-scale projects'; industrial/data-centre times not stated — https://vancouver.ca/files/cov/2025-02-10-council-memo-3-3-3-1-permitting-program-update.pdf",
 'edm20001': "Edmonton Zoning Bylaw 20001, s.8.10 use definitions (no 'Data Centre' use); zone use lists: IM 'Major Industrial, limited to those existing as of January 1, 2024', Minor Industrial; BE Minor Industrial in an enclosed building; IH use list UNVERIFIED; s.7.20(3.3.2) unlisted activities 'always considered a Discretionary Use' — https://zoningbylaw.edmonton.ca/part-8-definitions/810-use-definitions",
 'edmLDA26': "City of Edmonton engagement page, LDA26-0225 (received 6 Jul 2026): 'an AI Data Centre would be considered a heavy industrial use'; 'A small-scale data centre could be considered as a Minor Industrial Use' where nuisances are minimal and contained on site; rezoning, text amendment and public hearing needed in EETIM — https://engaged.edmonton.ca/eetpdatacentre",
 'edmRezone': "City of Edmonton rezoning page: fees paid before acceptance; notice to at least 60 m; public hearing; Direct Control needs 21-day pre-application notice; 'Processing times vary'; fees and durations not stated on the page — https://www.edmonton.ca/business_economy/rezoning",
 'parklandLUB': "Parkland County Land Use Bylaw 2025-12 (passed 27 May 2025): 'Data Processing Facility' listed in BI, MI, HI and C districts (permitted vs discretionary UNVERIFIED); s.5.80 regulations not read; Bylaw 2025-23 creates a 'Data Processing and Infrastructure Direct Control District (DC Area 7)' — https://www.parklandcounty.com/media/iault5lh/amended-2025-12-july.pdf",
 'abConsult': "Government of Alberta, data centres — Indigenous consultation: a project 'cannot receive its Water Act licence, its public lands disposition or its environmental approval' until consultation is complete; EPEA approval needed for backup generation over 50 MW (EPA fact sheet 20 Jul 2026) — https://www.alberta.ca/datacentres/indigenous",
 'gvsddUT008': "Metro Vancouver (GVS&DD) Policy UT-008 Sewage Waste Heat Recovery (rev. 29 Jul 2022): access 'on a first-come first-served basis'; private applicants need a letter of support from the host municipality; heat user pays access costs; no $/GJ — https://metrovancouver.org/services/liquid-waste/Documents/sewage-waste-heat-recovery-policy.pdf",
 'gvsdd299': "GVS&DD Sewer Use Bylaw 299, Sch. A 4(b),(c): prohibited 'Any Waste which will raise the temperature of Waste entering any Sewage Facility to 40 degrees Centigrade' and non-domestic waste at 65 °C — https://metrovancouver.org/boards/Bylaws/GVSDD_Bylaw_299_Consolidated.pdf",
 'neuSewage': "City of Vancouver, NEU sewage heat recovery: '3.2 megawatts (MW) of sewage heat recovery capacity', expansion 'an additional 6.6 megawatts' (two 3.3 MW heat pumps, end of 2024) — https://vancouver.ca/home-property-development/sewage-heat-recovery-expansion-project.aspx",
 'edm18100': "Edmonton Drainage Bylaw 18100 s.5.10(i): non-contact cooling water to the sanitary sewer only with prior written EWSI approval; no EPCOR sewer-heat programme found — https://www.edmonton.ca/residential_neighbourhoods/Bylaws/C18100.pdf",
 'bcWSRfees': "BC Water Sustainability Fees, Rentals and Charges Tariff Regulation 37/2016, Sch.1–2: industrial 'cooling' application $1,000; 'heat exchange' annual rental $2.25 per 1,000 m³, minimum $200 — https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/37_2016",
 'thermalLimits': "Thermal discharge limits: BC Water Quality Guideline (temperature, 2001) marine '+ or - 1 degree Celsius change from natural ambient background', ≤0.5 °C/h; CCME marine ±1 °C; proposed Burrard Inlet objective 'No further increase in temperature' (Jul 2024); Alberta Surface Water Quality Guidelines 1999 'Not to be increased by more than 3°C above ambient' — https://www2.gov.bc.ca/assets/gov/environment/air-land-water/water/waterquality/water-quality-guidelines/approved-wqgs/temperature-or.pdf",
 'enwaveDLWC': "City of Toronto reports (2000; 21 Nov 2019) on Enwave Deep Lake Water Cooling: water drawn at 4 °C, returned at ≤13 °C; 50-year Energy Transfer Agreement to 2054; serves 'over 80 buildings … including data centers' (DLWC Expansion EA 2020) — https://www.toronto.ca/legdocs/mmis/2019/ie/bgrd/backgroundfile-140486.pdf",
 'neuConnect': "City of Vancouver NEU Connectivity Guidelines (May 2026 Rev.1): network 'minimum 65°C'; building supply 60 °C year-round; 'a maximum return water temperature of 45°C must be achieved under all conditions'; the NEU does not provide cooling; waste heat from building cooling may be accepted for a bill credit — https://guidelines.vancouver.ca/guidelines-neighbourhood-energy-utility-connectivity-requirements.pdf",
 'bchRS2289': "BC Hydro self-generation: RS 1289 net metering closing; from 1 Jul 2026 RS 2289 — export 'up to 100 kW per phase', excess purchased 'at 10 cents per kWh'; community generation up to 2 MW net injection — https://www.bchydro.com/toolbar/about/strategies-plans-regulatory/rate-design/self-generation-rate-updates.html",
 'abMicrogen': "Alberta micro-generation: capacity 'that does not exceed five (5) megawatts' (AUC); small (<150 kW) credited at retail, large at hourly wholesale; emissions ≤418 kg/MWh (alberta.ca, 2 Mar 2026) — https://www.alberta.ca/micro-generation",
 'abGridPage': "Government of Alberta, data centres — grid: 'projects that pair their demand with dedicated new generation or storage go to the front of the connection line'; interim allocation 1,200 MW, fully allocated — https://www.alberta.ca/datacentres/grid",
 'bchLGS': "BC Hydro business rates (Large General Service RS 1600–1611, Revision 26, effective 1 Jul 2026): basic 29.99 ¢/day, demand $13.83/kW, energy 6.79 ¢/kWh; Transmission Service RS 1830 (fiscal 2027): $12.178/kVA, 4.914 ¢/kWh (RS 1823 cancelled 1 Apr 2026) — https://app.bchydro.com/accounts-billing/rates-energy-use/electricity-rates/business-rates.html",
 'bcIEAF': "BC Industrial Electricity Allocation Framework (updated 31 Mar 2026): '300MW for AI projects, 100MW for data centre projects'; data centre and AI projects ≥10 MW enter competitive selection; BC news release 2025ECS0044: loads over 150 MW pay 'the full cost of both incremental electricity generation and upgrades' — https://www2.gov.bc.ca/gov/content/industry/electricity-alternative-energy/electricity/industrial-electricity-allocation-framework",
 'aesoStats2025': "AESO 2025 Annual Market Statistics, Table 1 p.2: average pool price $43.68/MWh (2025), $62.78 (2024); on-/off-peak 2025 52.15 / 26.74 — https://www.aeso.ca/assets/Annual-Market-Stats-2025.pdf",
 'epcorDASSAS': "EPCOR Distribution & Transmission 2026 interim tariffs (effective 1 Jan 2026): DAS-TOUP $67.45678/site/day + $0.13822/kW/day; SAS-TOUP $0.00250/kWh + capacity $0.13497/kW/day + demand $0.28126/kW/day + OR 7.99 % × pool price; DAS-CS (>5,000 kVA) closed to new service — https://www.epcor.com/content/dam/epcor/documents/rates/distribution-access-service-tariffs/2026-01-distribution-access-service-tariff.pdf",
 'fortisAB2026': "FortisAlberta rates effective 1 Oct 2026 (AUC 30274-D01-2025): Rate 63 Large General Service (>2,000 kW) transmission $0.214447 + $0.174184 /kW-day + $0.006228/kWh; distribution $27.080602 per contract km-day + $0.015170/kW-day + $15.998863/day — https://www.fortisalberta.com/docs/default-source/default-document-library/rates-options-and-riders-schedules-effective-october1-2026.pdf",
 'bocFX2025': "Bank of Canada annual average exchange rates: 1 EUR = 1.5782 CAD (2025), 1.4818 (2024) — https://www.bankofcanada.ca/rates/exchange/annual-average-exchange-rates/",
 'uptime2025': "Uptime Institute Global Data Center Survey 2025 (INDUSTRY SURVEY): weighted average PUE 1.54 (n=681); facilities commissioned in the last five years 1.48; North America 1.49 — https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2025.Annual.Survey.Report.pdf",
 'lbnlCapture': "Coles & Greenberg 2014 (LBNL), direct-to-chip liquid capture 'The best results ranged from 67 percent to 75 percent', 57–59 % at 30 °C supply; NREL/TP-2C00-62905: RackCDU 'up to 64% of server heat'; Heydari et al. 2024 Appl. Therm. Eng. 239:122122 cold plate 94 %; air-cooled capture: no primary figure — https://escholarship.org/content/qt0g50294h/qt0g50294h.pdf",
 'vanWater2026': "City of Vancouver 2026 metered rates (Sch. D): water high season $5.128, low season $4.091, sewer $7.960 per unit (1 unit = 2.83168466 m³); one rate for all metered uses — https://council.vancouver.ca/20251112/documents/spec1a.pdf",
 'epcorReclaimed': "EPCOR 2024 Edmonton Wastewater Quality Annual Report p.11: '4,226 ML (3.9%) of reclaimed water provided to industrial customers'; price and customers not stated — https://www.epcor.com/content/dam/epcor/documents/water-quality-reports/2024_edmonton_wastewater-quality_annual-report.pdf",
 'mvReclaimed': "Metro Vancouver Interim Reclaimed Water Policy UT-019 (29 Sep 2023): industrial uses case-by-case; no rates — https://metrovancouver.org/boards/Policies/interim-reclaimed-water.pdf",
 'vanOfficeConv': "City of Vancouver Downtown Office Conversion Policy (2009): applies to buildings ≥50,000 sq ft of office; addresses residential conversion only — https://guidelines.vancouver.ca/policy-downtown-office-conversion.pdf",
 'edmPermits': "City of Edmonton General Building Permits (open data 24uj-dj8v): 'DATA CENT' records incl. office → data centre (2009, 2011), warehouse → data centre (17204 114 Ave NW, 2015, 2020), and a 2021 demolition of a 'Sobeys Data Centre'; occupancy dates for non-residential permits completed since 2024 — https://data.edmonton.ca/d/24uj-dj8v",
 'van6555zones': "Vancouver Noise Control By-law 6555 (consol. 14 Jul 2026), continuous sound ss.2.1–2.3: quiet→quiet 55 day / 45 night; activity→quiet 60 / 55; intermediate/activity→other 70 / 65; 'background noise' credited only for commercial premises (s.3.1(b)); no ambient credit for equipment — https://bylaws.vancouver.ca/6555c.PDF",
 'lbnlLife': "Shehabi et al. 2024 (LBNL) p.31: average server lifetime 'is 4.4 years, increasing to 5 years in 2020, and to 5.7 years by 2023' — https://climate.mit.edu/sites/default/files/2025-02/lbnl-2024-united-states-data-center-energy-usage-report.pdf",
 'tenK_life': "Company filings on server useful life: Microsoft FY2022 four → six years; Alphabet FY2023 servers four → six; Amazon six (2024), a subset back to five (2025, 'increased pace of technology development'); Meta 4–5 → 5.5 years (2025) — SEC filings (OPERATOR FILING)",
 'ashraeLife': "ASHRAE Handbook HVAC Applications 2015, ch.37 Table 4 (median service life): centrifugal chiller >25 yr; cooling tower galvanized >22; air-cooled condenser 20; commercial water-to-air heat pump >24; base-mounted pump 20; shell-and-tube heat exchanger 24; transformer 30 — https://handbook.ashrae.org/Handbooks/A15/IP/A15_CH37/a15_ch37_ip.aspx",
 'en253Life': "Energiforsk 2022:872 (RISE): 'EN 253 (2019) states that the service life shall be 30 years at 120 °C'; 'If a service life of 50 years is desired, the temperatures must be below 115 °C' (p.32) — https://energiforsk.se/media/31455/liftetime-predictions-and-status-assessments-energiforskrapport-2022-872.pdf",
 'jlarc2024': "Virginia JLARC Report 598, Data Centers in Virginia (Dec 2024): building 'usually takes about 12 to 18 months'; campus 'five or more years'; ~50 full-time workers per 250,000 sq ft ('one employee per 5,000 square feet'), about half contract; ~1,500 workers at peak construction; grid additions 12–36 months longer; 'One-third of data centers are currently located near residential areas'; residential bills +$14–37/month — https://jlarc.virginia.gov/pdfs/reports/Rpt598-2.pdf",
 'ieaEnergyAI': "IEA, Energy and AI (2025): 'a data centre can be operational in two to three years' — https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai",
 'dlrContracts': "Digital Realty 10-K FY2024, Item 1: 0–1 MW colocation 'Contract length generally 2-5 years'; >1 MW 'generally 5-10+ years' (OPERATOR FILING) — https://www.sec.gov/Archives/edgar/data/1297996/000155837025001424/dlr-20241231x10k.htm",
 'velkova2019': "Velkova 2019, 'Data centers as impermanent infrastructures', Culture Machine 18: operators 'tend to limit their lifespan to six years only'; Ericsson Vaudreuil QC shut down less than a year after inauguration — https://culturemachine.net/vol-18-the-nature-of-data-centers/data-centers-as-impermanent/",
 'census2021DA': "Statistics Canada, Census Profile 2021, 98-401-X2021006 (dissemination areas; BC file 006_BC_CB, Prairies 006_Prairies); DA boundary file 92-169-X — https://www150.statcan.gc.ca/n1/en/catalogue/98-401-X2021006",
 'statcanEP2024': "Statistics Canada 46-28-0001 (20 Feb 2024), Estimation of Energy Poverty Rates Using the 2021 Census: energy bills ≥10 % of after-tax income; Canada 5.6 %, BC 4.9 %, Alberta 7.3 %; provincial only. CUSP's tool is no longer at energypoverty.ca (observed 13 Oct 2026) — https://www150.statcan.gc.ca/n1/pub/46-28-0001/2024001/article/00001-eng.htm",
 'panFang2025': "Pan Fang & Greenstein 2025, 'Where the cloud rests: the economic geography of data centers', Strategy Science 10(4) (abstract): third-party firms favour urban settings and are 'sensitive to buyer demand for proximity'; cloud providers have 'a lower propensity for locating in urban areas'",
 'malecki2002': "Malecki 2002, Economic Geography 78(4):399–424 (abstract): 'a global bias of Internet backbone networks toward world cities', tempered by urban areas 'that serve as interconnection points'",
 'satya2017': "Satyanarayanan 2017, 'The Emergence of Edge Computing', Computer (Jan): head-tracked VR needs latencies under 16 ms (p.32); 'End-to-end latency of a few tens of milliseconds is a safe but achievable goal' (p.32)",
 'isedPrinciples': "ISED, Canada's Responsible Data Centre Development Principles (15 Sep 2026): local benefits; 'Proponents must pay the costs of connecting and serving their projects'; waste heat recovery a priority technology; no siting criteria",
 'bchCfDRfA': "BC Hydro 2026 Call for Demand, Request for Applications: 300 MW AI + 100 MW storage data centres; projects 10–145 MW; scoring 30 % cost, 30 % data sovereignty, 20 % community (incl. brownfield), 10 % environment ('heat recovery ready', PUE, WUE), 10 % First Nations — https://app.bchydro.com/content/dam/BCHydro/customer-portal/documents/accounts-billing/electrical-connections/2026-cfd-request-for-applications.pdf",
 'receiversBCUC': "BCUC decisions on Vancouver-region networks: Creative Energy Core steam 971,259 klb forecast, >200 buildings (G-310-21A, 2021); NE False Creek 24 MW peak, 48,100 MWh/yr by 2024 (C-12-15); Sen̓áḵw DES 10,343 kW peak, 11,218 MWh/yr (C-5-23); River District 11.0 → 26.1 MW peak, ~33,600 MWh/yr (C-3-23); SFU Burnaby Mountain 43,787 MWh/yr (G-279-21) — https://www.ordersdecisions.bcuc.com/",
 'edmReceivers': "Edmonton receivers: Downtown District Energy (City/EPCOR) Phase 1 three buildings, up to 50 by 2050, heat only in phases 1–2; Blatchford Renewable Energy Utility 13.1 MW heating / 12.3 MW cooling, ambient-temperature sharing network; University of Alberta district energy (capacity not stated) — https://www.edmonton.ca/projects_plans/district-energy ; https://blatchfordutility.ca/about-us/",
})

# ---------------------------------------------------------------- meta: parties, move categories, exchanges, lifecycle, options
r['meta']['parties'] = [
 {'id':'operator','name':'Operator','note':'owns or runs the data centre'},
 {'id':'host','name':'Host / landlord','note':'owns the building or land it sits in'},
 {'id':'receiver','name':'Receiver','note':'takes heat, power, water or space: a network, a building, a greenhouse, a shelter'},
 {'id':'utility','name':'Utility','note':'electricity, water, sewer and district-energy operators'},
 {'id':'city','name':'City','note':'zoning, permits, public land, enforcement of conditions'},
 {'id':'neighbours','name':'Neighbours','note':'people who live and work within reach today'},
 {'id':'public','name':'The public passing by','note':'the street edge, security zones, surveillance as experienced'},
 {'id':'ratepayers','name':'Ratepayers and taxpayers','note':'who pays costs passed through tariffs or budgets'},
 {'id':'workers','name':'Workers','note':'people who build and run it'},
 {'id':'future','name':'Future residents','note':'people who live with a 40-year building and network after today\'s neighbours'},
 {'id':'climate','name':'The climate','note':'carbon, counted on average and marginal factors'},
 {'id':'nations','name':'First Nations (rights holders)','note':'Musqueam, Squamish and Tsleil-Waututh (Vancouver); Treaty 6 nations (Edmonton, Amiskwacîwâskahikan). The tool describes which processes and rights apply to an option, with sources, and never speaks for them; their gains and losses are left for the Nations to state. Decided for now; J.B. may revisit.'},
]
r['meta']['move_categories'] = [
 {'id':'choice','name':'a different option','note':'changes with the design or the site, not with a price'},
 {'id':'money','name':'money','note':'equipment, pipe, enclosure, a higher price paid'},
 {'id':'time','name':'time and process','note':'permits, rezoning, licences, contracts, consultation'},
 {'id':'policy','name':'a change in policy or law','note':'tariffs, by-laws, provincial or federal rules'},
 {'id':'infra','name':'city-scale infrastructure','note':'substations, networks, transmission'},
 {'id':'physics','name':'not movable','note':'physics and climate; the ceiling everything else works under'},
]
r['meta']['move_note'] = "Proposed by Claude (13 Oct 2026), for J.B. to check: each condition lists what it would take to move it, cheapest first. Only 'not movable' is a hard constraint; everything else is a trade-off at a price. A limit set by a user is respected, and what relaxing it would open is shown separately."
r['meta']['exchanges'] = [
 {'id':'heat','name':'Heat and cold','dc_to_place':['heat_captured','heat_delivered','stored_heat'],'place_to_dc':['free_cooling_hours','ground','sewer_sink','surface_water_sink']},
 {'id':'power','name':'Power','dc_to_place':['spare_capacity','flexible_load','backup_hours'],'place_to_dc':['electricity_price','grid_headroom','rooftop_solar','self_gen_rules']},
 {'id':'water','name':'Water','dc_to_place':['rainwater','blowdown'],'place_to_dc':['water_supply']},
 {'id':'space','name':'Space','dc_to_place':['offerable_area'],'place_to_dc':['existing_building','zoning_status','row_cost']},
 {'id':'materials','name':'Materials','dc_to_place':['copper_tonnes','ewaste','rare_earth'],'place_to_dc':['existing_building']},
 {'id':'sound','name':'Sound','dc_to_place':['noise_level'],'place_to_dc':['ambient_cover']},
]
r['meta']['lifecycle'] = [
 {'id':'planning','name':'Planning, permits, grid','years':'1–3 (Vancouver rezoning ~15 months to decision; grid can add 12–36 months)','sources':['vanRezoneTime','jlarc2024','bchTransmission','aesoPerf'],'conf':70},
 {'id':'construction','name':'Construction','years':'1–1.5 per building; 2–3 to operation','sources':['jlarc2024','ieaEnergyAI'],'conf':60},
 {'id':'rampup','name':'Ramp-up','years':'first 1–4 years at 1,300–4,400 full-load hours of the heat pump','sources':['tallaghtD22','fjfAars2020','fjfAars2124'],'conf':70},
 {'id':'mature','name':'Mature year (the table)','years':'—','sources':[],'conf':70},
 {'id':'refresh','name':'Server refresh','years':'every 5–6 years (LBNL average 5.7 in 2023)','sources':['lbnlLife','tenK_life'],'conf':80},
 {'id':'contracts','name':'Contracts and leases','years':'colocation 2–5 years; scale 5–10+; heat contracts 10 + 5 (Stockholm)','sources':['dlrContracts','exergiAR2023'],'conf':50},
 {'id':'plant','name':'Plant replacement','years':'chillers and heat pumps ~20–25 years (ASHRAE medians)','sources':['ashraeLife'],'conf':80},
 {'id':'network','name':'Network life','years':'30 years at 120 °C; 50 only below 115 °C (EN 253)','sources':['en253Life'],'conf':80},
 {'id':'closure','name':'Closure or reuse','years':'case evidence only: heat-pump recoveries 14 of 19 ended (Sweden); Ericsson Vaudreuil closed within a year; a Sobeys data centre demolished (Edmonton 2021)','sources':['lygnerud','velkova2019','edmPermits'],'conf':50},
]
r['meta']['options_logic'] = {
 'steps':['build every combination the tool knows (size, position on the parcel or another parcel, adjacency, technology, both cities, in or out of town)',
          'set aside options that break a user limit — and keep them for the "if you moved this limit" panel',
          'drop options worse than another on every row for every party (not a trade-off)',
          'pick as many as the user asked for, as different as possible on the rows the user emphasised',
          'show them side by side, in no order, each with its full trade-off table'],
 'preferences':[{'id':'pref_count','name':'Number of options','note':'how many suggestions the user wants'},
                {'id':'pref_limits','name':'Limits','note':'non-negotiables, e.g. no rezoning; ≤ 45 dB at the nearest bedroom at night'},
                {'id':'pref_emphasis','name':'Emphasis','note':'which rows the options should differ on; never a weight'},
                {'id':'pref_lens','name':'Lens','note':'which party\'s view is read first; every row stays visible'}],
}
r['meta']['verdict_states_note'] = ("Condition states (met / with a change / not met / not applicable or declined / cannot judge / not judged) describe single conditions only. "
  "There is no match verdict: decided 13 Oct 2026 — the tool lays out trade-offs by party and does not rank or score options. Wording is suggested for J.B. to accept.")
r['meta']['date'] = '2026-10-13'

# ---------------------------------------------------------------- quantities: direction tags
place_ids = {'free_cooling_hours','ground','grid_headroom','row_cost','lead_time','grid_co2','lrmc_bc','noise_limit','licence_flag','ev_exemption'}
for q in r['quantities']:
    if q['id'] in place_ids: q['direction'] = 'place'

def addq(qd):
    if qd['id'] in Q:
        Q[qd['id']].update(qd)
    else:
        r['quantities'].append(qd); Q[qd['id']] = qd

def roles(*xs): return [{'id':a,'term':b,'role':c,'conf':d,'verified':True} for a,b,c,d in xs]

addq({'id':'sewer_sink','name':'Sewer as heat source or sink','stage':'place','direction':'place','unit':'MW at the pipe',
 'formula':'Q = flow × 4.18 × ΔT, within the temperature rules: sewage arriving at the plant ≥ 11 °C when used as a source (KWL design rule); waste entering a facility < 40 °C, non-domestic waste < 65 °C when used as a sink (Bylaw 299)',
 'inputs':['sewer_flow'],'coef':'Vancouver: ~45 MW city-wide, ~100 MW region-wide (KWL 2014, secondary); NEU uses 3.2 + 6.6 MW; access first-come first-served with a letter of support (UT-008); heat user pays access costs; per-pipe flow near a parcel is not published (only North Surrey 6 MW). Edmonton: no EPCOR sewer-heat programme or data found; non-contact cooling water to sanitary sewer needs EWSI written approval (Bylaw 18100 s.5.10)',
 'sources':['kwlSewer','gvsddUT008','gvsdd299','neuSewage','edm18100'],'source_roles':roles(('gvsdd299','temperature limits for rejection','rule',90),('gvsddUT008','allocation and cost rule','rule',90),('kwlSewer','city-wide capacity','bound',60),('neuSewage','built precedent','check',80),('edm18100','Edmonton approval gate','rule',90)),
 'conf':40,'status':'rules in hand for Vancouver; flow at a parcel and all Edmonton figures are gaps'})
addq({'id':'surface_water_sink','name':'Sea or river water as a cooling sink','stage':'place','direction':'place','unit':'MW (site-specific)',
 'formula':'capacity set by the thermal limit at the outfall and mixing, not by the licence: marine ±1 °C (BC, CCME), Burrard Inlet proposed "no further increase"; Alberta freshwater +3 °C over ambient',
 'inputs':['parcel'],'coef':'BC licence: cooling application $1,000; heat-exchange rental $2.25 per 1,000 m³ (min $200); DFO intake screens 2.54 mm, approach velocity 0.035–0.055 m/s (internal conflict — confirm); Alberta Water Act review as for any industrial project; Toronto Enwave precedent: 4 °C in, ≤13 °C out, 50-year agreement',
 'sources':['bcWSRfees','thermalLimits','enwaveDLWC'],'source_roles':roles(('thermalLimits','thermal limit (binding)','rule',90),('bcWSRfees','licence fees','rule',90),('enwaveDLWC','built precedent','check',80)),
 'conf':40,'status':'rules in hand; capacity is site-specific and unmodelled'})
addq({'id':'rooftop_solar','name':'Solar from roofs nearby','stage':'place','direction':'place','unit':'MWh/yr',
 'formula':'roof area × kWh/kWp (NRCan municipal values) × kWp/m²','inputs':['massing'],
 'coef':'NRCan municipal kWh/kWp values blocked — J.B. retrieval D9; a 0.1–40 MW load would use a roof\'s output on site','sources':[],'source_roles':[],'conf':0,'status':'gap: NRCan values pending'})
addq({'id':'self_gen_rules','name':'Rules for generation beside the data centre','stage':'place','direction':'place','unit':'rule',
 'formula':'export cap and compensation by province; connection priority for paired generation (Alberta)',
 'inputs':[],'coef':'BC: RS 2289 from 1 Jul 2026, export up to 100 kW per phase at $0.10/kWh; community generation up to 2 MW. Alberta: micro-generation ≤5 MW (retail credit <150 kW, wholesale above); data centres paired with dedicated new generation or storage go to the front of the connection line (Alta Reg 117/2026, government summary)',
 'sources':['bchRS2289','abMicrogen','abGridPage','altaReg117'],'source_roles':roles(('bchRS2289','BC caps and price','rule',90),('abMicrogen','Alberta caps','rule',90),('abGridPage','connection priority','rule',80),('altaReg117','regulation text','rule',90)),
 'conf':80,'status':'in hand'})
addq({'id':'electricity_price','name':'Price of power at the site','stage':'place','direction':'place','unit':'$/MWh + $/kW',
 'formula':'tariff for the customer class: BC Hydro LGS or Transmission (RS 1830); Alberta pool price + EPCOR (Edmonton) or FortisAlberta (Parkland) distribution and transmission',
 'inputs':['parcel'],'coef':'BC LGS (1 Jul 2026): $13.83/kW, 6.79 ¢/kWh, 29.99 ¢/day; RS 1830: $12.178/kVA, 4.914 ¢/kWh; loads >150 MW pay full incremental cost; 300 MW AI + 100 MW DC allocation. Alberta: pool $43.68/MWh (2025), $62.78 (2024); EPCOR DAS-TOUP and SAS-TOUP; FortisAlberta Rate 63; Rate of Last Resort not available to these loads. Replaces the first attempt\'s assumed $80–120/MWh',
 'sources':['bchLGS','bcIEAF','aesoStats2025','epcorDASSAS','fortisAB2026'],'source_roles':roles(('bchLGS','BC tariffs','rule',90),('bcIEAF','BC allocation and >150 MW rule','rule',90),('aesoStats2025','Alberta energy price','data',80),('epcorDASSAS','Edmonton delivery charges','rule',90),('fortisAB2026','Parkland delivery charges','rule',90)),
 'conf':90,'status':'in hand (2026 tariffs)'})
addq({'id':'water_supply','name':'Water the place can supply','stage':'place','direction':'place','unit':'$/m³; ML/yr',
 'formula':'potable at the metered rate; reclaimed where a utility offers it to industry',
 'inputs':['parcel'],'coef':'Vancouver 2026: water $4.091–5.128 per unit + sewer $7.960 per unit (unit = 2.832 m³), no large-user rate; Metro Vancouver reclaimed water case-by-case, no rate. Edmonton: EPCOR supplied 4,226 ML of reclaimed water to industry in 2024 (price, customers not stated); commercial potable rates not extracted',
 'sources':['vanWater2026','mvReclaimed','epcorReclaimed'],'source_roles':roles(('vanWater2026','Vancouver price','rule',90),('mvReclaimed','Vancouver reclaimed route','rule',80),('epcorReclaimed','Edmonton reclaimed volume','data',80)),
 'conf':70,'status':'Vancouver in hand; Edmonton partial'})
addq({'id':'existing_building','name':'Existing building to convert','stage':'place','direction':'place','unit':'m² available',
 'formula':'parcels with buildings whose use and age suit conversion (from the parcel tables), less what policy steers to other uses',
 'inputs':['parcel','massing'],'coef':'Precedents: 515 W Hastings office → Bulk Data Storage (2023); Edmonton office → data centre (2009, 2011), warehouse → data centre (Qu EDM2); Vancouver Downtown Office Conversion Policy addresses residential conversion only; no official vacancy statistics in either city',
 'sources':['vanPermits','edmPermits','vanOfficeConv'],'source_roles':roles(('vanPermits','Vancouver precedent','check',80),('edmPermits','Edmonton precedents','check',80),('vanOfficeConv','policy context','rule',90)),
 'conf':20,'status':'precedents in hand; stock at a parcel needs the parcel tables (N1–N7)'})
addq({'id':'ambient_cover','name':'Acoustic cover from the place','stage':'place','direction':'place','unit':'dBA allowed',
 'formula':'the zone pair sets what is allowed; a louder zone is the cover — Vancouver credits no ambient noise for equipment',
 'inputs':['receptors','parcel'],'coef':'Vancouver By-law 6555: quiet→quiet 55/45, activity→quiet 60/55, intermediate or activity→other 70/65 (day/night); background credited only for commercial premises. AUC Rule 012 road categories credit ambient but apply only to power plants and substations. Neither city publishes a road-noise map (traffic counts only). Edmonton Bylaw 14600 limits pending (J.B. retrieval D1)',
 'sources':['van6555zones','rule012','bylaw14600'],'source_roles':roles(('van6555zones','Vancouver zone pairs','rule',90),('rule012','Alberta facilities only','rule',90),('bylaw14600','Edmonton limits (earlier read, to recheck)','rule',70)),
 'conf':60,'status':'Vancouver in hand; Edmonton to recheck'})
addq({'id':'interconnection','name':'Closeness to networks and customers','stage':'place','direction':'place','unit':'km / ms',
 'formula':'distance to the nearest interconnection point and to customers; latency targets of tens of milliseconds',
 'inputs':['parcel'],'coef':'Why operators locate in cities: third-party (colocation) firms favour urban settings for buyer proximity (Pan Fang & Greenstein 2025); backbone networks are biased to cities that serve as interconnection points (Malecki 2002); edge latency targets of a few tens of ms, VR under 16 ms (Satyanarayanan 2017); internet exchange and customer proximity (JLARC 2024). Locations of internet exchange points in Vancouver and Edmonton not yet sourced',
 'sources':['panFang2025','malecki2002','satya2017','jlarc2024'],'source_roles':roles(('panFang2025','urban preference of colocation','data',70),('malecki2002','interconnection in cities','data',70),('satya2017','latency thresholds','coefficient',70),('jlarc2024','exchange point and proximity','data',80)),
 'conf':20,'status':'rationale sourced; local exchange-point locations a gap'})
addq({'id':'zoning_status','name':'Zoning: allowed, conditional or rezoning','stage':'test','direction':'place','unit':'class',
 'formula':'look up the district: outright / conditional (development permit) / not listed (rezoning or text amendment)',
 'inputs':['parcel'],'coef':'Vancouver: Bulk Data Storage conditional in I-2, I-3 sub-area A, I-1C; not in I-1A and most industrial and downtown districts; CD-1 rezoning otherwise (111 E 5th). Edmonton: no data-centre use; a small one may be Minor Industrial (BE, IM), a large one Major Industrial (heavy industrial; IM only where existing at 1 Jan 2024); unlisted activities are always discretionary. Parkland County: "Data Processing Facility" listed in BI, MI, HI, C (permitted vs discretionary unverified); DC Area 7 created 2025',
 'sources':['van3575s2','vanDistricts','rts19744p4','edm20001','edmLDA26','parklandLUB'],'source_roles':roles(('van3575s2','use definition','rule',90),('vanDistricts','district tables','rule',90),('rts19744p4','I-1A confirmed','rule',90),('edm20001','Edmonton use classes','rule',90),('edmLDA26','City interpretation','data',70),('parklandLUB','Parkland listing','rule',60)),
 'conf':80,'status':'in hand; Parkland P/D and Edmonton IH to confirm'})
addq({'id':'rezoning_price','name':'What a rezoning takes','stage':'test','direction':'place','unit':'months; $',
 'formula':'duration + application fee + levies and charges on new floor area',
 'inputs':['zoning_status','floor_area'],'coef':'Vancouver: target ~15 months to decision (~1 year from fee to hearing); CD-1 fee $94,500 (elsewhere) or $226,300 (downtown/Broadway) + $1,590 per 100 m² under 8,000 m²; DCL industrial $112.87/m², mixed employment $211.54/m² (none if floor area does not increase); ACC $12.92–24.22/m² from 30 Sep 2026; CAC exempt for 100 % industrial after 30 Sep 2026. Also where the City attaches conditions (111 E 5th heat delivery) and residents get a say (579 submissions). Edmonton: duration and fees not stated on the City page (J.B. retrieval D2)',
 'sources':['vanRezoneTime','vanFees2026','vanDCL','vanACC','vanCAC','rts19744','edmRezone'],'source_roles':roles(('vanRezoneTime','duration','data',90),('vanFees2026','application fee','rule',90),('vanDCL','levy','rule',90),('vanACC','amenity charge','rule',90),('vanCAC','CAC exemption','rule',90),('rts19744','conditions and response','check',90),('edmRezone','Edmonton process','rule',90)),
 'conf':80,'status':'Vancouver in hand; Edmonton fees and times pending'})
addq({'id':'consultation','name':'Consultation and rights that apply','stage':'test','direction':'place','unit':'process',
 'formula':'list the approvals an option needs that trigger consultation; describe, never predict',
 'inputs':['licence_flag','grid_headroom'],'coef':'Alberta: Water Act licences, public-land dispositions and environmental approvals wait on consultation; EPEA approval for backup generation over 50 MW. BC: Water Sustainability Act licences, BCUC CPCNs, City of Vancouver UNDRIP Strategy — to source. BC Hydro\'s 2026 Call for Demand scores First Nations criteria at 10 %. The tool never speaks for the Nations',
 'sources':['abConsult','bchCfDRfA'],'source_roles':roles(('abConsult','Alberta triggers','rule',90),('bchCfDRfA','BC Hydro scoring','rule',90)),
 'conf':40,'status':'Alberta partly in hand; BC to source'})
addq({'id':'people_affected','name':'People within reach','stage':'prospect','unit':'people',
 'formula':'dissemination-area population × share of the DA within each radius (noise, light, heat receivers)',
 'inputs':['receptors','area'],'coef':'Census Profile 2021 at DA level and DA boundaries (J.B. retrievals P1–P3)',
 'sources':['census2021DA'],'source_roles':roles(('census2021DA','population by DA','data',80)),'conf':0,'status':'gap: census download pending'})
addq({'id':'jobs','name':'Work created','stage':'characterise','unit':'FTE',
 'formula':'floor area ÷ 5,000 ft² per operating job; construction peak separately',
 'inputs':['floor_area'],'coef':'Virginia JLARC 2024: about one full-time worker per 5,000 sq ft, about half contract; ~1,500 at peak construction for large campuses — transferred from Virginia hyperscale, use with caution at urban scale',
 'sources':['jlarc2024'],'source_roles':roles(('jlarc2024','jobs per floor area','coefficient',60)),'conf':40,'status':'transferred coefficient'})
addq({'id':'construction_time','name':'Time to build and connect','stage':'test','unit':'months',
 'formula':'planning and permits + construction + grid connection (often the longest)',
 'inputs':['zoning_status','lead_time'],'coef':'12–18 months per building; 2–3 years to operation; grid can add 12–36 months (JLARC; IEA); Vancouver rezoning ~15 months; Edmonton permit data give build times for non-residential permits since 2024',
 'sources':['jlarc2024','ieaEnergyAI','vanRezoneTime','edmPermits'],'source_roles':roles(('jlarc2024','construction and grid delay','data',80),('ieaEnergyAI','to operation','data',80),('vanRezoneTime','rezoning','data',90),('edmPermits','local derivation possible','check',80)),
 'conf':60,'status':'in hand (transferred); local derivation possible for Edmonton'})

# trade-off table replaces the verdict
if 'verdict' in Q:
    v = Q['verdict']; v.update({'id':'tradeoffs','name':'Trade-off table','unit':'parties × rows','formula':'for each option: every party, every row, gains and losses in their own units — never summed, never ranked',
      'coef':'Replaces the match verdict (decided 13 Oct 2026). Constraints that cannot move are stated as such; everything else carries what it would take to move it.','conf':100,'status':'logic defined','stage':'decide'})
    Q['tradeoffs'] = Q.pop('verdict')

# ---------------------------------------------------------------- update existing quantities with hunt figures
def addsrc(qid, ids, rl):
    q = Q[qid]
    for s in ids:
        if s not in q['sources']: q['sources'].append(s)
    q.setdefault('source_roles', [])
    have = {x['id'] for x in q['source_roles']}
    q['source_roles'] += [x for x in rl if x['id'] not in have]

Q['horizons']['coef'] = ("Servers: average life 4.4 → 5 → 5.7 years (2000–2019, 2020, 2023; LBNL 2024); filings moved server useful lives to 5–6 years (Microsoft, Alphabet, Meta; Amazon partly back to 5 in 2025); "
  "Barroso: servers depreciated over 3–4 years, facilities over 15–20; plant medians ~20–25 years (ASHRAE); district-heating pipes 30 years at 120 °C, 50 only below 115 °C (EN 253); "
  "contracts: colocation 2–5 years, scale 5–10+ (Digital Realty); heat contracts 10 + 5 (Stockholm Exergi); Tallaght plant 25–35 years; Seattle permit 10 + two 10-year renewals; "
  "Vancouver property-tax report flags holding sites (improvement ÷ land value)")
Q['horizons']['conf'] = 80; Q['horizons']['status'] = 'primary sources found (13 Oct 2026)'
addsrc('horizons', ['lbnlLife','tenK_life','barroso2018','ashraeLife','en253Life','dlrContracts'], roles(('lbnlLife','server life','data',80),('tenK_life','server useful life (filings)','check',60),('barroso2018','depreciation periods','coefficient',70),('ashraeLife','plant life','coefficient',80),('en253Life','pipe life','rule',80),('dlrContracts','contract terms','data',50)))

Q['pue']['coef'] = (Q['pue'].get('coef','') + "; 13 Oct 2026: US average 1.4 (2023, LBNL); global 1.54, North America 1.49, new facilities 1.48 (Uptime 2025, INDUSTRY SURVEY); no Canadian figure (NRCan: no sufficient survey); no source splits existing buildings from purpose-built — use 1.4–1.55").strip('; ')
addsrc('pue', ['uptime2025'], roles(('uptime2025','PUE survey averages','check',50)))
Q['liquid_capture']['coef'] = (Q['liquid_capture'].get('coef','') + "; 13 Oct 2026: direct-to-chip 48–75 % (LBNL 2014; NREL), cold plate up to 94 % (Heydari 2024), hot-water cooled 80 % (Zimmermann 2012); air-cooled: no primary figure; the often-cited 97 % (Lu et al. 2011) describes electricity becoming heat, not capture — unverified at source. A water-cooled chiller plant rejects all heat to the condenser loop").strip('; ')
addsrc('liquid_capture', ['lbnlCapture'], roles(('lbnlCapture','capture ratios by technology','coefficient',80)))
Q['receiver_temp'] = Q.get('receiver_temp')  # input, not a quantity — leave
Q['affordability']['coef'] = (Q['affordability'].get('coef','') + "; 13 Oct 2026: CUSP's tool is no longer at energypoverty.ca; Statistics Canada (2024) uses ≥10 % of after-tax income on energy bills: BC 4.9 %, Alberta 7.3 % (provincial only); small-area data would need a custom table").strip('; ')
addsrc('affordability', ['statcanEP2024'], roles(('statcanEP2024','official threshold and rates','data',80)))
Q['grid_headroom']['coef'] += "; 13 Oct 2026: BC allocation framework — 300 MW AI + 100 MW data centres, ≥10 MW competitive, >150 MW full incremental cost; ISED principles (Sep 2026): proponents pay connection costs"
addsrc('grid_headroom', ['bcIEAF','isedPrinciples'], roles(('bcIEAF','BC allocation','rule',90),('isedPrinciples','federal principle','rule',80)))
Q['grid_co2']['coef'] += "; 13 Oct 2026 deep dive: no official BC marginal or incremental factor exists (BC 2025 methodology is consumption-based, net-import)"
Q['cfd_score']['coef'] = (Q['cfd_score'].get('coef','') + "; 2026 RfA: 30 % cost, 30 % data sovereignty, 20 % community (incl. brownfield), 10 % environment ('heat recovery ready', PUE, WUE), 10 % First Nations; projects 10–145 MW").strip('; ')
addsrc('cfd_score', ['bchCfDRfA'], roles(('bchCfDRfA','scoring weights','rule',90)))
Q['noise_limit']['coef'] += "; 13 Oct 2026: Vancouver zone pairs confirmed — quiet→quiet 55/45, activity→quiet 60/55, intermediate/activity→other 70/65; no standing variance for operating noise (111 E 5th amended the by-law's schedule instead)"
addsrc('noise_limit', ['van6555zones'], roles(('van6555zones','zone pairs','rule',90)))
Q['receiver_demand']['coef'] += "; 13 Oct 2026 receivers: NEU 667,000 m², 47 buildings (data centres named as a future heat source); Creative Energy Core >200 buildings; NE False Creek 48,100 MWh/yr; Sen̓áḵw 11,218 MWh/yr; River District ~33,600 MWh/yr at build-out; UBC ADES ~89 GWh; Edmonton DDE ≤50 buildings by 2050; Blatchford 13.1 MW heat / 12.3 MW cooling"
addsrc('receiver_demand', ['receiversBCUC','edmReceivers','neuConnect'], roles(('receiversBCUC','Vancouver-region network loads','data',90),('edmReceivers','Edmonton networks','data',80),('neuConnect','NEU temperatures','rule',90)))
Q['embodied_building']['coef'] += "; 13 Oct 2026: still no per-m² data-centre benchmark; Alissa et al. 2025 (Nature) LCA spreadsheets on Zenodo to read (J.B. D10 / Claude)"

# ---------------------------------------------------------------- conditions: new ones, links, move, parties
def addc(cd):
    if cd['id'] in C: C[cd['id']].update(cd)
    else: r['conditions'].append(cd); C[cd['id']] = cd
addc({'id':'t_sink','heading':'1 Technical','name':'A sink the place offers','test':'heat can be rejected to or drawn from sewer, water, ground or air within their rules','quantities':['sewer_sink','surface_water_sink','ground','free_cooling_hours']})
addc({'id':'s_conversion','heading':'2 Spatial','name':'An existing building to reuse','test':'a building nearby suits conversion; its embodied carbon is kept','quantities':['existing_building','embodied_building']})
addc({'id':'e_power_price','heading':'4 Economic','name':'Price of power at the site','test':'tariff and allocation rules for the load and the heat pump','quantities':['electricity_price','grid_headroom']})
addc({'id':'e_interconnection','heading':'4 Economic','name':'Closeness to networks and customers','test':'what the operator gains from being in the city (latency, interconnection, buyers)','quantities':['interconnection']})
addc({'id':'r_consult','heading':'6 Regulatory','name':'Consultation and rights','test':'which approvals trigger consultation with rights holders; described, never predicted','quantities':['consultation']})
addc({'id':'soc_people','heading':'8 Social','name':'People within reach','test':'how many people live within each radius of benefit and burden','quantities':['people_affected']})
addc({'id':'soc_jobs','heading':'8 Social','name':'Work created','test':'operating and construction jobs, and who gets them','quantities':['jobs']})
addc({'id':'x_cover','heading':'10 Experiential','name':'Acoustic cover','test':'how much the place\'s own noise and zoning absorb the plant','quantities':['ambient_cover','noise_level']})
for cid, add in [('r_zoning',['zoning_status','rezoning_price']),('tm_lead',['construction_time']),('soc_afford',['affordability']),('soc_need',['people_affected'])]:
    if cid in C:
        for q in add:
            if q in Q and q not in C[cid]['quantities']: C[cid]['quantities'].append(q)

MOVE = {
 't_quantity':['money','physics'],'t_quality':['money'],'t_form':['money'],'t_conversion':['money'],'t_reliability':['money'],'t_cooling_change':['time'],'t_metering':['money'],'t_sink':['money','time'],
 's_distance':['money'],'s_density':['infra'],'s_route':['money','time'],'s_network':['infra'],'s_exit':['money'],'s_room':['money'],'s_building_type':['choice'],'s_usable':['money'],'s_adjacency':['time'],'s_burden_reach':['money'],'s_conversion':['money','time'],
 'tm_profile':['money'],'tm_overlap':['physics'],'tm_storage':['money'],'tm_horizons':['time'],'tm_growth':['time'],'tm_lead':['time','infra'],'tm_termination':['money','policy'],
 'e_window':['money','policy'],'e_capex':['money'],'e_payback':['money'],'e_risk':['money'],'e_split_incentive':['policy'],'e_reserved_cost':['money'],'e_passthrough':['policy'],'e_savings':['money'],'e_flex_value':['policy'],'e_power_price':['policy'],'e_interconnection':['choice'],
 'o_control':['time'],'o_chain':['time'],'o_common':['policy'],'o_data':['time'],
 'r_zoning':['time','money'],'r_utility':['policy'],'r_grid':['infra','time'],'r_noise':['money'],'r_incentives':['policy'],'r_critical':['policy'],'r_code':['policy'],'r_consult':['time'],
 'sec_crossing':['money'],'sec_zones':['money'],'sec_rating':['choice'],'sec_info':['money'],'sec_ops':['time'],
 'soc_need':['choice'],'soc_winners':['policy'],'soc_residents':['time'],'soc_dependency':['money'],'soc_enforce':['policy'],'soc_afford':['policy','money'],'soc_legibility':['money'],'soc_access':['money'],'soc_record':['time'],'soc_fix':['choice'],'soc_watched':['money','choice'],'soc_people':['choice'],'soc_jobs':['choice'],
 'env_carbon':['infra','choice'],'env_water':['money'],'env_embodied':['choice'],'env_burdens':['money'],
 'x_edge':['money'],'x_sound':['money'],'x_light':['money'],'x_agree':['time'],'x_visible':['money','choice'],'x_cover':['choice'],
}
HEAD_PARTIES = {'1 Technical':['operator','receiver'],'2 Spatial':['operator','host','receiver','city','neighbours'],'3 Temporal':['operator','receiver','future'],'4 Economic':['operator','receiver','utility','ratepayers'],
 '5 Organizational':['operator','host','receiver','utility','city'],'6 Regulatory':['city','operator'],'7 Security':['public','operator'],'8 Social':['neighbours','public','city','future'],
 '9 Environmental':['climate','neighbours'],'10 Experiential':['neighbours','public']}
PARTY_OVR = {'r_consult':['nations','city','operator'],'r_utility':['utility','nations','city'],'e_passthrough':['ratepayers','utility'],'e_flex_value':['utility','ratepayers','operator'],'r_grid':['utility','operator','ratepayers'],
 'env_carbon':['climate'],'soc_jobs':['workers','city'],'tm_termination':['receiver','future','operator'],'soc_afford':['neighbours','future'],'r_noise':['neighbours','city','operator'],'e_interconnection':['operator'],
 'e_power_price':['operator','utility','ratepayers'],'t_sink':['operator','utility','nations'],'s_conversion':['host','operator','climate'],
 'r_incentives':['city','operator','ratepayers'],'r_critical':['city','operator','public'],'r_code':['city','public','operator'],'env_embodied':['climate'],'env_water':['utility','neighbours','climate'],'s_density':['receiver','city'],'s_building_type':['operator','host'],'s_exit':['operator','host'],'s_room':['operator','host'],'s_usable':['host','city','public'],'soc_fix':['city'],'soc_legibility':['public','neighbours'],'x_agree':['public','neighbours','city'],'r_zoning':['city','operator','neighbours','nations'],'soc_people':['neighbours','future'],'x_cover':['neighbours','public']}
for c in r['conditions']:
    c['move'] = MOVE.get(c['id'], ['money'])
    c['parties'] = PARTY_OVR.get(c['id'], HEAD_PARTIES.get(c['heading'], ['operator']))
    c['constraint'] = c['move'] == ['physics']

# verdict references elsewhere
for c in r['conditions']:
    c['quantities']=['tradeoffs' if q=='verdict' else q for q in c['quantities']]
for q in r['quantities']:
    q['inputs']=['tradeoffs' if x=='verdict' else x for x in q.get('inputs',[])]
for o, qs in r['opportunity_quantities'].items():
    r['opportunity_quantities'][o] = ['tradeoffs' if q=='verdict' else q for q in qs]

json.dump(r, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('quantities', len(r['quantities']), 'conditions', len(r['conditions']), 'sources', len(S) + len(r.get('old_sources', {})))
missing = sorted({s for q in r['quantities'] for s in q['sources'] if s not in S and s not in r.get('old_sources', {})})
print('missing source ids', missing)
badq = sorted({q for c in r['conditions'] for q in c['quantities'] if q not in Q})
print('conditions pointing at unknown quantities', badq)
