"""Overnight pass, 30 Oct 2026 (review branch overnight-2026-10-30; J.B. to review before merge).
Every source added or re-read tonight is logged in meta.check_log as CHECK 1 (Claude, 30 Oct 2026, where it was read).
A second, independent check is OPEN for every item: nothing here counts as fully verified until it is done.
Tour material (tourVAN3) is J.B.'s observations and the guide's claims, never verified facts."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
D = '30 Oct 2026'

NEWSRC = {
 'cologixVAN3web': "Cologix, VAN3 facility page (2828 Natal St; read 30 Oct 2026): 'Site Capacity: 5 MW'; '42K SQFT'; 'Hot aisle containment'; 'Scalable N+1 distributed redundant electrical solution with N+1 mechanical'; 'Tier III construction with no single points of failure'; ISO 27001, HIPAA assessment, SOC 1 Type 2, SOC 2 Type 2, PCI DSS listed (OPERATOR CLAIMS; the tour guide said 2N) — https://cologix.com/data-centers/vancouver/van3/",
 'bcReg8_2026': "B.C. Reg. 8/2026 (O.C. 25/2026, deposited 30 Jan 2026), Data Centre Facility and Hydrogen Production Facility Power Supply Regulation (Utilities Commission Act ss. 1 and 21.1): s. 1 project definitions each need 'at least 10 MW of capacity'; s. 2(1)(d)–(f) restrict 10 MW or more of incremental capacity to existing customers; s. 3 aggregate caps over two years from 1 Feb 2026; s. 4(3)(a) competitive-process requests not more than 145 MW. A request under 10 MW does not fall within those definitions (our reading of a text extract, not legal advice ?) — https://free.bcpublications.ca/civix/document/id/complete/statreg/8_2026",
 'bchCfDInfo2026': "BC Hydro, 2026 Call for Demand information session (9 Feb 2026): slide 8 eligibility 10–145 MW; slide 10 curtailment minimums (10% of load, 4 consecutive hours, 5 days a week, 2 weeks a month, 36 events and 144 hours a year, 'without any incentive or compensation'); slide 16 environmental benefits (10%) 'including heat recovery ready, power usage efficiency and water usage efficiency' — 'heat recovery ready' is not defined (?) — https://app.bchydro.com/content/dam/BCHydro/customer-portal/documents/accounts-billing/electrical-connections/2026-cfd-info-session-2026feb09.pdf",
 'bccsHeat2022': "BC Coroners Service, Extreme Heat and Human Mortality (death review panel), news release 7 Jun 2022: '619 deaths later identified as heat-related'; '98% of deaths occurred indoors'; '56% of decedents lived alone'; '67% of decedents were 70 or older'; recommendations: a provincial heat alert and response system, identify and support the populations most at risk, prevention and long-term mitigation. Read from the release, not the report itself (?) — https://news.gov.bc.ca/releases/2022PSSG0042-000903",
 'covHeat2025': "City of Vancouver, memo 'Extreme heat plans summer 2025' (S. Singh, Deputy City Manager, to Mayor and Council, 3 Jul 2025): 'Vancouver has designated 39 civic facilities (community centres and libraries) as cooling centres'; checks on residents of non-market housing during Heat Warnings and Extreme Heat Emergencies; 31 misting stations; no walking-distance or backup-power statement — https://vancouver.ca/files/cov/2025-07-03-memo-extreme-heat-plans-summer-2025.pdf",
 'atcoDrake2024': "ATCO Gas, Decommissioning Drake Landing Solar Community (page read 30 Oct 2026): 'the Drake Landing Solar Community must be decommissioned'; critical components failing; natural-gas backup boilers now provide most of the heat; annual losses of $42,000–$62,000; all homes to move to another heat source by 31 Oct 2024 (gas furnace, gas furnace and tankless water heater, electric heat pump, or a cash payment) — https://gas.atco.com/Drake.html",
 'aesoAlert2024': "AESO, news release 13 Jan 2024: Grid Alert declared at 3:30 p.m. and ended 8:40 p.m., caused by 'extreme cold and high electricity demand'; after the public appeal, 'a significant 100 MW drop in electricity demand' and 'a 200 MW reduction within minutes' (both figures printed) — https://aeso.ca/aeso/media/aeso-thanks-albertans-for-quick-response-to-call-for-power-conservation/",
 'msDublinUPS2022': "Microsoft, news story 7 Jul 2022 (OPERATOR CLAIM): a grid-interactive UPS developed and tested with Eaton at its Dublin datacenter; through Enel X it can receive EirGrid signals to 'discharge our batteries to compensate for our load', replacing fossil-fuel spinning reserve — https://news.microsoft.com/source/?p=782",
 'hcCleanAir2020': "Health Canada, Guidance for Cleaner Air Spaces during Wildfire Smoke Events (published Sep 2020): 'A MERV value of 13 or more is recommended to remove fine particulate matter'; portable air cleaners with a smoke CADR of 'at least two to three times the room volume per hour'; a ventilation system that 'can be switched from recirculation mode'; 'Recirculate the air when outdoor conditions are poor'; no per-person area (it refers to ASHRAE 62.1-2019) — https://www.canada.ca/en/health-canada/services/publications/healthy-living/guidance-cleaner-air-spaces-during-wildfire-smoke-events.html",
 'bcucG46_25': "BCUC Order G-46-25, Thermal Energy Systems – Micro TES Exemption (26 Feb 2025): exempts Micro TES providers from most of Part 3 of the Utilities Commission Act (not ss. 23, 25, 38, 41–44); Micro TES is below 'a certain minimum dollar threshold as determined by the BCUC' — the value is not in the order's text (Appendix A is an image, not read ?) — https://www.ordersdecisions.bcuc.com/bcuc/orders/en/522653/1/document.do",
 'edmBylaw17943': "City of Edmonton Bylaw 17943, Blatchford Renewable Energy Utility Bylaw (consolidated 1 Jan 2022; local copy data/raw/edm/blatchford_C17943_2022.pdf): s. 1 purpose — regulate connections between building systems and the District Energy Sharing System (DESS) and access to it; s. 10(1) no one may sell or supply energy the City supplies to them to others without approval; no provision found for a customer supplying heat into the DESS (?)",
 'edmBlatchfordBP': "City of Edmonton, Blatchford Renewable Energy 2021–2024 Business Plan (report CR_8340, Attachment 1; local copy data/raw/edm/blatchford_business_plan_2021_2024.pdf): 'A new public, city owned utility'; it owns and operates the DESS; 'All buildings in Blatchford, with the exception of net-zero carbon buildings, must be connected'; sources geoexchange, sewer heat exchange and solar; LRT design studying 'the opportunity for Blatchford Renewable Energy to supply and draw thermal energy from nearby LRT utility complexes'; no data-centre heat source mentioned",
 'bcbcGroupC': "BCBC 2024 Div. A definitions (local copy; NBC 2020 has the same wording): 'Residential occupancy (Group C) means the occupancy or use of a building or part thereof by persons for whom sleeping accommodation is provided but who are not harboured for the purpose of receiving care or treatment and are not involuntarily detained.'",
 'jibcESSqrg2012': "JIBC, Emergency Social Services Quick Reference Guide (2012; standards attributed to the Public Health Agency of Canada Emergency Lodging Service, 2007), group lodging: '3.5 square metres … minimum sleeping area per person'; '5 toilets per 75-100 people, add 1 toilet for each additional 30 people'; '1 washbasin per 10 people, 1 shower per 50 people'; water about 2 L drinking, 12 L washing and 112 L sanitation per person per day. A 2012 guide: whether BC's current ESS standard is the same is not checked (?) — https://www.jibc.ca/sites/default/files/2020-05/EMD-ESS-Quick-Reference-Guide-20121102.pdf",
 'eatonCA022021': "Eaton, substation transformer catalogue CA022021EN (Jan 2020) Table 14.1-20, 2,500 kVA: H 2084.1 × W 2263.1 × D 2390.1 mm; radiators 'may be mounted on the front and back' (equipment study 29 Oct 2026, kit3d basis; not re-read tonight)",
 'tourVAN3': "J.B., guided tour of Cologix VAN3, 2828 Natal St, Vancouver (about 2 hours, Oct 2026; her notes and three lobby photos). OBSERVED: no clear front, entrance hard to find; perimeter fence with a video-and-voice intercom at the gate; ramp up to a buzzed building door; vestibule with a guard behind glazing, an ID slot, screens and cameras; visitor pass, buzzed door into a lobby; client hot desks, private client offices, client kitchen and boardroom; washrooms with lockers and showers; a technicians' room with two desks; a POP room and meet-me room at the front right and another pair at the back left, behind scanner doors; a single-person security portal that weighed and measured her; a staff door with biometric and card; a first-floor hall on an 18 in raised floor reached by a ramp; three tenant enclosures with their own biometrics and cameras; 400 A wall panels; VESDA; a humidifier; a loading bay with two docks and a client delivery room; a freight elevator to a second-floor hall. GUIDE'S CLAIMS: anti-ram ('K') fence sunk about 9 ft; 24/7 guard; three tenants on that floor; a sensor on every rack reporting temperature and humidity to an outside monitoring company; the second POP is for redundancy; some clients work overnight; power export 'is not a thing'; generator testing the only give-back; 2N (Cologix's page says N+1); industry moving to liquid-to-chip cooling in a closed loop; data cabling mostly fibre now. One visit: observations, not measurements.",
}
KIND = {'cologixVAN3web': 'operator claim', 'bcReg8_2026': 'rule', 'bchCfDInfo2026': 'utility', 'bccsHeat2022': 'government',
        'covHeat2025': 'government', 'atcoDrake2024': 'operator', 'aesoAlert2024': 'system operator', 'msDublinUPS2022': 'operator claim',
        'hcCleanAir2020': 'government', 'bcucG46_25': 'regulator order', 'edmBylaw17943': 'rule', 'edmBlatchfordBP': 'government',
        'bcbcGroupC': 'rule', 'jibcESSqrg2012': 'government (training guide)', 'eatonCA022021': 'manufacturer claim', 'tourVAN3': 'site visit (J.B.)'}

# CHECK 1 log: who read what, where, tonight
C1 = lambda where, what: [{'check': 1, 'by': 'Claude', 'date': D, 'where': where, 'what': what}]
CHECK = {
 'cologixVAN3web': C1('cologix.com VAN3 page', 'capacity, area, cooling, redundancy, tier, certifications'),
 'bcReg8_2026': C1('bcpublications text', 's. 1 definitions, s. 2–4 thresholds; reading of the under-10 MW case'),
 'bchCfDRfA': C1('BC Hydro RFA PDF (1 Feb 2026)', 'Sch. 3 pp. 29–30 curtailment and weights; s. 9.2 Table 1 size; s. 1.1 allocations'),
 'bchCfDInfo2026': C1('BC Hydro info-session PDF', 'slides 8, 10, 16'),
 'cfdPage': C1("J.B.'s print of the BC Hydro page (15 Oct 2026), read as page images", '15 applications, ~800 MW, timeline extended, bids revise price and curtailment'),
 'bccsHeat2022': C1('BC government news release', '619; 98% indoors; 56% alone; 67% 70+; three recommendations'),
 'covHeat2025': C1('City memo PDF', '39 cooling centres; check-ins; no walking distance or backup power'),
 'atcoDrake2024': C1('ATCO page', 'decommissioning, reasons, 31 Oct 2024'),
 'aesoAlert2024': C1('AESO release', 'times, cause, 100 / 200 MW'),
 'msDublinUPS2022': C1('Microsoft story', 'Eaton, Enel X, EirGrid signal'),
 'hcCleanAir2020': C1('canada.ca page', 'MERV 13, CADR 2–3 room volumes, recirculation, date'),
 'bcucG46_25': C1('BCUC order text', 'exemption scope; threshold not stated'),
 'bcUCAs1': C1('bcpublications consolidation current to 27 Oct 2026', "s. 1 'public utility' (a) incl. 'light, heat, cold or power' and exclusions (c)–(g)"),
 'edmBylaw17943': C1('local PDF (pdftotext)', 's. 1 purpose; s. 10(1); search for customer supply'),
 'edmBlatchfordBP': C1('local text', 'city-owned; mandatory connection; LRT supply/draw'),
 'bcbcGroupC': C1('local BCBC 2024 text, line 2279; NBC text line 1901', 'Group C definition'),
 'nbcImportance': C1('local BCBC 2024 text: Table 4.1.2.1, Note A-Table 4.1.2.1, Div. A post-disaster definition', 'community centres High; data centres not named; telephone exchanges post-disaster'),
 'jibcESSqrg2012': C1('JIBC PDF', 'sleeping area, toilets, washbasins, showers, water'),
 'cologixVAN1_2026': C1('local spec sheet (pdftotext)', "'Dual interlocked pre-action dry pipe'; cooling N+1; 'N/N+1 Generator/UPS'"),
 'cologixVAN4_2026': C1('local spec sheet (pdftotext)', "'Dual interlock pre-action with Nitrogen (N2) VESDA'; '5-to-make-4, distributed redundant'"),
 'bchTariff2026': C1('local tariff text, T&C s. 3.12–3.13 (Revision 4, effective 1 Apr 2026)', 'primary service: customer supplies transformation; equipment must also take 25 kV'),
 'bchCustGen': C1('BC Hydro community generation and benefitting-customer pages', 'RS 2290; ≤ 2 MW AC; surplus measured at the meter the facility connects to; benefitting customers anywhere in BC'),
 'aucMicro2026': C1('AUC Micro-generation Notice Submission Guideline 2026', "s. 1(1)(h): supplies only a site the customer owns or leases; unit on that property or adjacent owned/leased property"),
 'aesoAMS2025': C1('local AESO 2025 Annual Market Statistics text', "gas-fired 76.8 per cent of Alberta's generation in 2025; wind, solar, hydro 21.0"),
 'tourVAN3': C1("J.B.'s notes in chat, 30 Oct 2026", 'transcribed as observations vs claims'),
}

def sr(i, term, role, conf, ver=True): return dict(id=i, term=term, role=role, conf=conf, verified=ver)

QS = [
 dict(id='power_allocation', name='Getting power for a data centre', unit='rule', stage='decide', conf=70, status='rules read 30 Oct 2026 (check 1)',
  inputs=['it_load_actual'], sources=['bcReg8_2026', 'bchCfDRfA', 'bchCfDInfo2026', 'cfdPage', 'aesoBYOG2026'],
  formula="BC: requests of 10 MW or more fall under the allocation regulation (B.C. Reg. 8/2026) and BC Hydro's competitive Call for Demand (10–145 MW); under 10 MW the regulation's definitions do not apply (our reading ?); Alberta: see grid_headroom",
  coef="2026 Call: 300 MW for AI and 100 MW for storage data centres over two years from 1 Feb 2026; curtailment is a pass/fail entry condition — at least 10% of the load, 4 consecutive hours, 36 events and 144 hours a year, on 24 hours' notice, without compensation; scoring: cost and benefits to BC Hydro 30%, data sovereignty 30%, community and provincial economy 20% (brownfield sites named), environment 10% ('heat recovery ready', PUE, WUE — 'heat recovery ready' not defined ?), First Nations 10%; Oct 2026: 15 applications, close to 800 MW requested; bids could revise price and curtailment after feasibility studies; results after the government transition. Alberta's BYOG process for loads of 75 MW and up is a proposal (aesoBYOG2026)",
  source_roles=[sr('bcReg8_2026', '10 MW threshold, caps', 'rule', 70), sr('bchCfDRfA', 'curtailment, weights, sizes', 'rule', 90), sr('bchCfDInfo2026', 'slides 8, 10, 16', 'check', 90), sr('cfdPage', 'applications, MW, timing', 'data', 90), sr('aesoBYOG2026', 'Alberta large-load proposal', 'rule', 50)]),
 dict(id='heat_sale_rules', name='Rules for selling heat or power to others', unit='rule', stage='decide', conf=60, status='rules read 30 Oct 2026 (check 1)',
  inputs=['heat_delivered'], sources=['bcUCAs1', 'bcucG46_25', 'edmBylaw17943', 'edmBlatchfordBP', 'aucMicro2026'],
  formula="BC: whoever supplies electricity, steam or 'any other agent for the production of light, heat, cold or power' to the public or a corporation for compensation is a public utility (UCA s. 1), unless an exclusion or exemption applies; Edmonton (Blatchford): a city-owned utility with compulsory connection, and no route found for a customer to supply heat into it (?)",
  coef="UCA exclusions include a municipality within its own boundaries and a person supplying only itself, its employees or tenants; BCUC exempts Micro TES providers from most of Part 3 (G-46-25; the dollar threshold is not stated in the order ?); whether a data centre selling heat to the City's NEU is a public utility: not settled in what was read (?); Blatchford Bylaw 17943 s. 10(1) bars reselling energy the City supplies; the utility plans to 'supply and draw thermal energy' with LRT utility complexes (city-owned); Alberta micro-generation (electricity) may serve only sites the customer owns or leases",
  source_roles=[sr('bcUCAs1', "s. 1 'public utility' incl. heat", 'rule', 80), sr('bcucG46_25', 'Micro TES exemption', 'rule', 70), sr('edmBylaw17943', 's. 10(1); no supply-in provision', 'rule', 70), sr('edmBlatchfordBP', 'city-owned; compulsory; LRT supply/draw', 'data', 80), sr('aucMicro2026', 'own or leased sites only', 'rule', 80)]),
 dict(id='refuge_services', name='Washrooms, showers and water for a refuge', unit='count, L/day', stage='opportunity', conf=60, status='2012 guide (check 1); current BC standard not checked',
  inputs=['refuge_people'], sources=['jibcESSqrg2012', 'tourVAN3'],
  formula="toilets: 5 for 75–100 people, plus 1 for each 30 more; washbasins: 1 per 10 people; showers: 1 per 50 people; water a day: 2 L drinking, 12 L washing, 112 L sanitation per person",
  coef="JIBC ESS Quick Reference Guide 2012, attributed to PHAC Emergency Lodging Service 2007 (whether BC's current ESS standard is the same ?); VAN3 already has washrooms with lockers and showers for clients who stay overnight (tour; number not recorded ?)",
  source_roles=[sr('jibcESSqrg2012', 'ratios and water', 'coefficient', 60), sr('tourVAN3', 'showers exist at VAN3', 'site fact', 40, False)]),
 dict(id='refuge_code', name='Code class of a refuge where people sleep', unit='rule', stage='test', conf=60, status='definitions read (check 1); separations not read',
  inputs=['refuge_people', 'importance_cat'], sources=['bcbcGroupC', 'nbcImportance'],
  formula="sleeping accommodation provided → that part is residential occupancy (Group C); a community centre is High importance for structure (Table 4.1.2.1); a data centre is not named in either list",
  coef="fire separations between a Group C refuge and the data centre's own occupancy: Table 3.1.3.1 not read tonight (?); the data centre's own occupancy group is not stated in the codes read (?); whether an emergency shelter is post-disaster is for the municipality's emergency plan (Note A-1.4.1.2 ?)",
  source_roles=[sr('bcbcGroupC', 'Group C definition', 'rule', 90), sr('nbcImportance', 'High for community centres', 'rule', 90)]),
 dict(id='crisis_events', name='What each crisis asks of a refuge', unit='table', stage='test', conf=70, status='events read (check 1); plant headroom in each event not sourced',
  inputs=['refuge_people', 'clean_air_volume'], sources=['bccsHeat2022', 'covHeat2025', 'hcCleanAir2020', 'edmWarming', 'eccc', 'aesoAlert2024'],
  formula="per city, the events a refuge answers and what each needs: heat → cooling and reaching people who stay home; smoke → filtered, recirculated air; earthquake → structure, power and water (refuge_after_quake); cold → heat; grid alert → load taken off the grid",
  coef="Vancouver heat 2021: 619 deaths, 98% indoors, 56% lived alone, 67% aged 70+ (BC Coroners Service 2022) — the people most at risk stayed home, so reach matters as much as capacity; the City runs 39 civic cooling centres and checks residents of non-market housing (memo 3 Jul 2025); smoke: MERV 13+ and recirculation (Health Canada 2020); Edmonton cold: warming spaces open at −20 °C with wind chill for 3 days; 6.1–6.5 days a year at or below −20 °C all day (ECCC 1991–2020); grid alert 13 Jan 2024: 100–200 MW dropped after a public appeal (AESO); how much spare cooling a data centre has in a heat wave, or with outside air shut off for smoke: not sourced (?)",
  source_roles=[sr('bccsHeat2022', 'who died and where', 'data', 90), sr('covHeat2025', 'City cooling centres, check-ins', 'data', 90), sr('hcCleanAir2020', 'MERV 13, recirculation', 'rule', 90), sr('edmWarming', 'warming trigger', 'rule', 70), sr('eccc', 'cold days', 'data', 90), sr('aesoAlert2024', '13 Jan 2024', 'data', 90)]),
 dict(id='fire_protection', name='Fire detection and suppression in the hall', unit='type', stage='size', conf=50, status='operator claims and one tour (check 1); not drawn',
  inputs=['hall_area'], sources=['cologixVAN1_2026', 'cologixVAN4_2026', 'tourVAN3'],
  formula='type as built or claimed at Vancouver colocation sites; not drawn in the 3D',
  coef="Cologix VAN1 'Dual interlocked pre-action dry pipe'; VAN4 'Dual interlock pre-action with Nitrogen (N2) VESDA' (spec sheets 05-2026, operator claims); VAN3: VESDA seen on the tour, suppression type not stated (?); room for pre-action valves and nitrogen equipment: no source read (?)",
  source_roles=[sr('cologixVAN1_2026', 'pre-action dry pipe', 'data', 50), sr('cologixVAN4_2026', 'pre-action with nitrogen, VESDA', 'data', 50), sr('tourVAN3', 'VESDA seen', 'site fact', 40, False)]),
 dict(id='transformers', name='Transformers', unit='count', stage='size', conf=40, status='count rule drafted (check 1); not in the engine or 3D',
  inputs=['it_load_actual', 'pue', 'spare_cooling'], sources=['eatonCA022021', 'bchTariff2026', 'cologixVAN3web', 'cologixVAN4_2026', 'fujiRedundancy'],
  formula='n = ⌈facility peak ÷ 2,500 kVA⌉, then the set-up\'s spare rule (N+1 or 2N)',
  coef="unit: Eaton 2,500 kVA substation transformer, 2.263 × 2.39 × 2.084 m (CA022021EN); facility kW taken as kVA (power factor 1: not sourced ?); at primary service the customer supplies the transformation and its equipment must also take 25 kV (BC Hydro T&C 3.12–3.13, effective 1 Apr 2026); built examples claim 'N+1 distributed redundant' (VAN3) and '5-to-make-4, distributed redundant' (VAN4); location and clearances not read (?); switchgear sections per transformer not sourced (?)",
  source_roles=[sr('eatonCA022021', '2,500 kVA unit', 'coefficient', 50), sr('bchTariff2026', 'customer supplies transformation', 'rule', 80), sr('cologixVAN3web', 'N+1 distributed redundant', 'check', 50), sr('cologixVAN4_2026', '5-to-make-4', 'check', 50), sr('fujiRedundancy', 'N+1, 2N', 'rule', 50)]),
 dict(id='security_layers', name='Controlled doors from the street to the servers', unit='count', stage='characterise', conf=40, status='one site visit (J.B.)',
  inputs=[], sources=['tourVAN3', 'cologixVAN3web'],
  formula="count the controlled doors a visitor passes between the street and a tenant's servers",
  coef="VAN3 (tour, Oct 2026): 5 — gate intercom, building door, vestibule door, single-person portal (weighs and measures; staff use a biometric and card door), tenant enclosure with its own biometrics and cameras; POP and meet-me rooms behind scanner doors; the lobby, client offices, kitchen, boardroom and showers sit inside the third door but outside the portal; Cologix lists ISO 27001 and SOC 2 Type 2 (claims); one site",
  source_roles=[sr('tourVAN3', 'doors counted on the visit', 'site fact', 40, False), sr('cologixVAN3web', 'certifications listed', 'data', 50)]),
]

UPD = {  # appended to coef (and sources added)
 'copper_tonnes': ("; of that, 'nearly 3 tons/MW' at rack level (CDA 2023 p. 21), so most sits outside the racks (where exactly: not broken down in what was read ?); data cabling is now mostly fibre (VAN3 guide, claim)", ['tourVAN3']),
 'flexible_load': ("; Microsoft's Dublin UPS batteries answer EirGrid signals through Enel X (operator claim, 2022); Alberta grid alert 13 Jan 2024: 100–200 MW dropped after a public appeal (AESO); BC's 2026 Call makes curtailment an entry condition (power_allocation)", ['msDublinUPS2022', 'aesoAlert2024']),
 'hall_layout': ("; observed at VAN3 (tour, Oct 2026): a first-floor hall on an 18 in (457 mm) raised floor reached by a ramp, so the slab layout drawn here is one variant", ['tourVAN3']),
 'jobs': ("; VAN3 tour: one guard and a two-desk technicians' room seen (one visit; shifts and total staff not known ?)", ['tourVAN3']),
 'clean_air_volume': ("; Health Canada 2020 read 30 Oct 2026 (check 1): MERV 13+, smoke CADR 2–3 room volumes an hour, a system that can switch to recirculation", ['hcCleanAir2020']),
}

OPP_NEW = ('Batteries at end of life', {
  'readiness': 'speculative', 'provisional': False,
  'basis': "Large UPS batteries fall outside BC's and Alberta's consumer recycling programs as read (register: afterlife). No case found of a data centre's batteries going to a local reuse or recycling stream. Added 30 Oct 2026 from the materials review.",
  'sources': ['bcRecyclingIT', 'abElectronicsReg', 'vertivLi5'],
  'rules': [{'rung': 'Stewardship programs', 'van': ['no_rule', 'IT products covered; large UPS batteries not found in the program as read'], 'edm': ['no_rule', 'computer equipment designated; large UPS batteries not found as read'], 'sources': ['bcRecyclingIT', 'abElectronicsReg']}],
  'unknowns': ['battery service life (not read ?)', 'who would take them'],
  'visual': 'battery cabinets leaving through the loading dock'}, ['battery_cabinets', 'afterlife'])

for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; d = json.loads(p.read_text())
    srcs = d['new_sources'] if pretty else d['sources']
    for k, v in NEWSRC.items(): srcs[k] = v
    if pretty:
        if 'bcUCAs1' in srcs and 'heat, cold or power' not in srcs['bcUCAs1']:
            srcs['bcUCAs1'] += " Re-read 30 Oct 2026 (current to 27 Oct 2026): para. (a) covers 'electricity, natural gas, steam or any other agent for the production of light, heat, cold or power to or for the public or a corporation for compensation'; exclusions (c) municipalities within their boundaries, (d) supply only to the person, employees or tenants, (e) petroleum, (f) geothermal, (g) designated agreements."
        if 'drake_landing' in srcs and 'decommissioned' not in srcs['drake_landing']:
            srcs['drake_landing'] += '; DECOMMISSIONED: ATCO says it "must be decommissioned", gas boilers supplied most of the heat, homes off the system by 31 Oct 2024 (atcoDrake2024)'
    d.setdefault('source_kinds', {}); d.setdefault('source_check', {})
    if pretty:
        m = d['meta']; m.setdefault('source_kinds', {}).update(KIND); m.setdefault('source_check', {}).update({k: 'claude' for k in NEWSRC})
        cl = m.setdefault('check_log', {})
        for k, v in CHECK.items():
            cl.setdefault(k, [])
            if not any(c.get('date') == D and c.get('check') == 1 for c in cl[k]): cl[k] += v
        m['check_log_note'] = ("check_log (30 Oct 2026): every source read during the overnight pass has a CHECK 1 entry (who, date, where, what). "
                               "A second, independent check is open for all of them; until it is done the item is first-check only, whatever its 'verified' flag says.")
        qs = d['quantities']
        for Q in QS: qs[:] = [x for x in qs if x['id'] != Q['id']] + [Q]
        for qid, (add, ss) in UPD.items():
            x = next(x for x in qs if x['id'] == qid)
            if add not in x.get('coef', ''): x['coef'] = (x.get('coef') or '') + add
            for s in ss:
                if s not in x['sources']: x['sources'].append(s)
                if not any(r['id'] == s for r in x.get('source_roles', [])): x.setdefault('source_roles', []).append(sr(s, 'added 30 Oct 2026', 'check', 40 if s == 'tourVAN3' else 70, s != 'tourVAN3'))
        ol = m['opportunity_labels']; oq = d['opportunity_quantities']
        ol[OPP_NEW[0]] = OPP_NEW[1]; oq[OPP_NEW[0]] = OPP_NEW[2]
        w = 'Warming centre, refuge, clean-air room'
        for q in ('refuge_services', 'refuge_code', 'crisis_events', 'security_layers'):
            if q not in oq[w]: oq[w].append(q)
        rr = ol[w]['rules'][0]
        if rr.get('rung') == 'Building code' and 'Group C' not in json.dumps(rr):
            rr['van'] = ['unknown', 'people sleeping in it makes that part residential occupancy (Group C, BCBC 2024 definition); separations from the data centre not yet read']
            rr['edm'] = ['unknown', 'same Group C definition (NBC 2020 / NBC(AE) 2023); separations not yet read']
            rr['sources'] = ['bcbcGroupC']
        ol[w].setdefault('unknowns', [])
        if 'whether it reaches the people most at risk (2021: 98% died indoors, 56% lived alone)' not in ol[w]['unknowns']:
            ol[w]['unknowns'].append('whether it reaches the people most at risk (2021: 98% died indoors, 56% lived alone)')
        s = ol['Seasonal storage in the ground']
        if 'decommissioned' not in s['basis']:
            s['basis'] = s['basis'].replace('Built here with solar heat only: Drake Landing, Okotoks AB.', 'Built here with solar heat only: Drake Landing, Okotoks AB — decommissioned in 2024 (failing parts, gas boilers supplying most heat; ATCO).')
            s['sources'].append('atcoDrake2024')
        c = ol['Material bank: copper']
        c['visual'] = 'over-time view of materials leaving at refits and at closure'
    else:
        qs = d['quantities']
        for Q in QS: qs[Q['id']] = {k: Q[k] for k in ('name', 'formula', 'coef', 'unit', 'sources', 'conf', 'status')}
        for qid, (add, ss) in UPD.items():
            if qid in qs:
                if add not in qs[qid].get('coef', ''): qs[qid]['coef'] = (qs[qid].get('coef') or '') + add
                for s in ss:
                    if s not in qs[qid]['sources']: qs[qid]['sources'].append(s)
        d['opportunities'][OPP_NEW[0]] = OPP_NEW[1]; d['opp_quantities'][OPP_NEW[0]] = OPP_NEW[2]
        w = 'Warming centre, refuge, clean-air room'
        for q in ('refuge_services', 'refuge_code', 'crisis_events', 'security_layers'):
            if q not in d['opp_quantities'][w]: d['opp_quantities'][w].append(q)
        d['source_kinds'].update(KIND); d['source_check'].update({k: 'claude' for k in NEWSRC})
        if 'Material bank: copper' in d['opportunities']: d['opportunities']['Material bank: copper']['visual'] = 'over-time view of materials leaving at refits and at closure'
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, 'ok')
# keep the three opportunity entries edited above identical in the tool copy
reg = json.loads((R / 'register/formula_register.json').read_text())['meta']['opportunity_labels']
p = R / 'tool/opps.json'; d = json.loads(p.read_text())
for k in ('Warming centre, refuge, clean-air room', 'Seasonal storage in the ground', 'Material bank: copper', 'Batteries at end of life'):
    d['opportunities'][k] = reg[k]
p.write_text(json.dumps(d, ensure_ascii=False, separators=(',', ':'))); print('opps synced')
