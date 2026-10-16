# Precedent search, 15 Oct 2026: settles the "how proven" label for each opportunity and add-on.
# Four research passes (heat uses; power and land; storage, districts, servers, materials; refuge, water, solar, rules).
# Every source below was opened by the research pass; Claude re-opened a sample (EPA Quincy, Codema Tallaght, IURC 46276,
# RVO datacenters, Bill 22 as introduced, Edmonton ZB 20001 s. 5.70 and s. 7.120, Green Mountain, Göteborg Energi).
# "How proven" is about the idea paired with a data centre. Operator and vendor pages count as claims and are labelled.
# Idempotent. Run after add_labels.py.
import json, os
h = os.path.dirname(os.path.abspath(__file__))
P = os.path.join(h, 'formula_register.json')
r = json.load(open(P, encoding='utf-8'))
m = r['meta']
SEARCHED = 'Precedent search 15 Oct 2026.'

SRC = {
 # heat
 'codemaTallaght': 'Codema (Dublin energy agency), Tallaght District Heating Scheme: "uses waste heat from the nearby Amazon data centre"; "Phase 1 of the scheme has been operational since 2023"; 3,770 MWh in the first year; almost 1,100 t CO2 saved in 2023 (checked by Claude) — https://www.codema.ie/our-work/tallaght-district-heating-scheme/',
 'seaiTallaght': 'SEAI case study, Tallaght District Heating: "the planned addition of large thermal energy stores" — https://seai.ie/case-studies/tallaght-district-heating',
 'rvoDatacenters': 'RVO (Netherlands Enterprise Agency), Restwarmte — datacenters: Equinix exchanges heat and cold "via een bodemenergiesysteem (WKO). De Universiteit van Amsterdam is daarvan de afnemer"; a data centre on the Mijnwater network takes cold and returns heat (checked by Claude) — https://www.rvo.nl/onderwerpen/restwarmte/datacenters',
 'equinixAM3': 'OPERATOR CLAIM: Equinix press release 8 Oct 2012, AM3 Science Park: "uses Aquifer Thermal Energy Storage (ATES) in the ground instead of mechanical cooling" — https://equinix.mediaroom.com/2012-10-08-Equinix-Unveils-New-Digital-Gateway-AM3-Science-Park-in-Amsterdam',
 'stavangerBTES2023': 'EGU23-16904 (University of Stavanger): measured BTES simulated with "a continuous supply of waste heat from a data center"; borehole life could fall "from 30 to 10 years" (study) — https://meetingorganizer.copernicus.org/EGU23/EGU23-16904.html',
 'epicDOE': 'US DOE, Geothermal heat pump case study: Epic Systems, Verona WI — 3.5 MW data centre; 6,100 wells in 4 borefields plus lakes; "Excess heat from the data center is transferred into the relatively cooler ground" — https://www.energy.gov/eere/geothermal/articles/geothermal-heat-pump-case-study-epic-systems-corporation',
 'ubcoBorefield2021': 'CSME 2021 paper (UBC Okanagan), borefield for a 250 kW data centre: "it is not feasible to operate the system under steady-state conditions" (study) — https://library.upei.ca/islandora/object/csme2021%3A113/datastream/PDF/download/csme2021_113.pdf',
 'cordisModerator': 'CORDIS, MODERATOR (2024–27): "combining a 40 kW data centre immersion cooling system and a 500 kWh TES for WHR (TRL8)" (demonstration; phase-change store) — https://cordis.europa.eu/project/id/101136156/de',
 'mainovaWestville': 'Mainova (utility) press release 8 Jul 2021: Westville, Frankfurt (about 1,300 homes), at least 60% of heat from the Telehouse data centre; "Der Beginn der Wärmelieferung ist ab Anfang 2023 vorgesehen" — https://www.mainova.de/resource/blob/76624/8658ad28e9ad7ddaf86445e6a84ff960/pm-08072021-rz-abwaermenutzung-westville-data.pdf',
 'opdcOldOak': 'OPDC (London development corporation) 2023: £36M to heat over 9,000 homes from data centres, "expected to deliver 95GWh of heat across 5 phases between 2026 and 2040" (proposed) — https://www.london.gov.uk/who-we-are/city-halls-partners/old-oak-and-park-royal-development-corporation-opdc/opdc-media-centre/opdc-press-releases/opdc-awarded-ps36m-keep-thousands-homes-warm-waste-heat-data-centres-uk-first',
 'greenMountainHima': 'OPERATOR CLAIM: Green Mountain, Turning waste heat into value: warm water from DC-Telemark "is sent directly to Hima Seafood", 800 m apart; target 8,000 t trout/yr (target, not output); facility "entered operation less than a year ago" (checked by Claude) — https://greenmountain.no/turning-waste-heat-into-value/',
 'whiteDCeel': 'OPERATOR CLAIM: White Data Center slide deck on the Hokkaido METI site (Oct 2025): eel farming started Jan 2024 (3,500 eels) at a 20-rack data centre, Bibai — https://www.hkd.meti.go.jp/hokpp/20251015/1111/data01.pdf',
 'data4algae': 'PARTNER CLAIM: Université Paris-Saclay news, Data4 Marcoussis: 1,000 L Chlorella, "ground-breaking proof-of-concept project" (pilot) — https://www.universite-paris-saclay.fr/en/news/data4-and-universite-paris-saclay-foundation-transform-waste-heat-algae-biomass',
 'riseMealworm': 'RISE (Swedish state research institute), ICE data centre: mealworms grown in a heat box (pilot, no results reported) — https://www.ri.se/en/unique-data-center-experiments-insects-as-chicken-food',
 'goteborgGH': 'Göteborg Energi (city utility): greenhouse at a Backa data centre, 130 m², heat about 24 °C, "a so-called proof of concept", operational summer 2024 (checked by Claude) — https://www.goteborgenergi.se/i-var-stad/artikelbank/chili-peppers-and-ginger-grown-with-waste-heat-recovered-from-data-centers',
 'quebecQScale': 'Québec MELCCFP (waste-heat coordinator), Vecteur Environnement, Mar 2026: QScale Lévis heat to a 12 ha greenhouse park (Les fraises de l\'île d\'Orléans), under construction — https://cdn-contenu.quebec.ca/cdn-contenu/environnement/rejets-thermiques/developpper-ia-decarboner-quebec.pdf',
 'canaanMB': 'OPERATOR CLAIM: Canaan press release Jan 2026: 3 MW compute heat-recovery proof of concept at a Manitoba greenhouse, water above 75 °C; "Actual performance metrics will be confirmed once fully operational" — https://finviz.com/news/268229/canaan-inc-expands-energy-efficiency-initiatives-with-3-mw-compute-heat-recovery-proof-of-concept-at-canadian-greenhouse',
 'lrzCoolMUC': 'OPERATOR (LRZ, public computing centre) documentation: CoolMUC-2 adsorption chillers cooled the centre\'s own equipment from 45 °C waste heat; shut off 13 Dec 2024 — https://doku.lrz.de/coolmuc-2-11484376.html',
 'wilde2017': 'Wilde et al. 2017, IEEE SEMI-THERM, CoolMUC-2: supercomputing cluster with heat recovery for adsorption cooling (peer-reviewed) — https://research.ibm.com/publications/coolmuc-2-a-supercomputing-cluster-with-heat-recovery-for-adsorption-cooling',
 'yuan2023': 'Yuan et al. 2023, Renewable and Sustainable Energy Reviews 188 (review of data-centre waste-heat recovery): absorption cooling of a neighbouring office building appears only as a proposal (Lin et al.) — https://acris.aalto.fi/ws/portalfiles/portal/124210750/1_s2.0_S1364032123006342_main.pdf',
 'qarnotCordis': 'CORDIS, EeHPC (2014–15, Qarnot): "The grid is composed of calculation units that are actually electric heaters" — https://www.cordis.europa.eu/project/id/652200',
 'heataCentrica': 'OPERATOR CLAIM: Centrica 2025, British Gas trial with Heata: "10 heata units will be installed in the homes of British Gas employees" (pilot) — https://centrica.com/media-centre/news/2025/british-gas-partners-with-heata-on-trial-to-reuse-waste-heat-from-data-processing',
 'msCircular': 'OPERATOR CLAIM: Microsoft Azure blog, Circular Centers (Amsterdam 2020; Dublin, Boydton 2022): "83 percent reuse and 17 percent recycle of critical parts" — https://azure.microsoft.com/ja-jp/blog/learn-how-microsoft-circular-centers-are-scaling-cloud-supply-chain-sustainability/',
 'googleFervo': 'OPERATOR CLAIM: Google 2023, Fervo geothermal: electricity "flowing onto the local grid that serves our data centers in Nevada" (electricity contract, no heat link) — https://blog.google/company-news/outreach-and-initiatives/sustainability/google-fervo-geothermal-energy-partnership/',
 # power and land
 'iurc46276': 'Indiana Utility Regulatory Commission, Cause 46276 order (Indiana Michigan Power / Google, Fort Wayne): "The Contract also contains demand response obligations designed to reduce I&M\'s peak load and capacity obligations"; specified interruptible load and curtailment parameters (checked by Claude) — https://secure.in.gov/iurc/files/ord_46276_042926.pdf',
 'enelxDLR': 'OPERATOR CLAIM: Enel X case study, Digital Realty Ireland: nine data centres in EirGrid DS3 frequency response; "when the grid frequency drops below 50Hz, the data centre can safely draw some power from its batteries" — https://www.enelx.com/ie/en/resources/digital-realty-case-study',
 'fluenceStGhislain': 'VENDOR CLAIM: Fluence 2022, Google St. Ghislain, Belgium: 2.75 MW / 5.5 MWh battery replacing diesel backup and in Elia\'s ancillary-services market; a "proof-of-concept" — https://ir.fluenceenergy.com/node/7211/pdf',
 'lclHVO': 'VENDOR CLAIM: Caterpillar testimonial, LCL Brussels-West, Aalst: six 3516B gensets "operates exclusively on HVO100" — https://www.cat.com/en_GB/by-industry/electric-power/Articles/Testimonials/lcl-data-centers-fuels-standby-power-system-with-hvo-a-renewable-alternative-to-diesel.html',
 'msSweden2021': 'OPERATOR CLAIM: Microsoft Nov 2021, Sweden region backup generators on Preem Evolution Diesel Plus (≥50% renewable) — https://news.microsoft.com/source/emea/2021/11/microsoft-opens-its-sustainable-datacenter-region-in-sweden-creating-new-opportunities-for-a-cloud-first-sweden',
 'xealLaitent': 'OPERATOR CLAIM: Xeal, Sep 2026: GPU pods at EV-charging sites using idle charging capacity; first pod "by the end of 2026" (announced; the reverse pairing) — https://www.financialcontent.com/article/bizwire-2026-9-18-xeal-to-launch-laitent-worlds-first-edge-inference-compute-using-idle-ev-charging-capacity',
 # water
 'epaQuincy': 'US EPA case study, Quincy Water Reuse Utility (WA): "treats cooling water from a Microsoft data center and recirculates it to the data center for the same purpose"; operational 30 Jun 2021; about 138 million gallons saved per year (checked by Claude) — https://www.epa.gov/node/286187',
 'loudounWater': 'Loudoun Water (utility), Reclaimed water program: pipelines "to supply irrigation and industrial cooling water to Loudoun County\'s rapidly growing data center industry" — https://www.loudounwater.org/commercial-customers/reclaimed-water-program',
 'msWaterFacts': 'OPERATOR CLAIM: Microsoft data-centre water fact sheet (hosted by Dorr Township, MI): "harvesting rainwater to partially offset cooling and humidification" (Netherlands, Ireland); no sites or volumes — https://www.dorrtownshipmi.gov/Portals/1076/Parks%20Minutes/Microsoft/Datacenter-water-consumption-fact-sheet.pdf',
 # solar
 'equinixME1': 'OPERATOR CLAIM: Equinix blog 26 Feb 2024: ME1 Melbourne "a 1MW rooftop solar system" — https://blog.equinix.com/blog/2024/02/26/rooftop-solar-systems-in-melbourne-green-the-grid/',
 'onyxMAD01': 'VENDOR CLAIM: Onyx Solar, MAD01 Madrid data centre: PV ventilated facade "covering 3,600 m2 that achieve 600 kWp" — https://onyxsolar.com/photovoltaic-facade-data-center',
 # refuge
 'vanRR1_2026': 'City of Vancouver referral report 30 Jun 2026 (111 E 5th Ave and 2060 Quebec St, CD-1, up to 40 MW): requires "an active, high-quality public realm interface"; waste heat to the NEU "a material condition of the proposed use" (proposed) — https://council.vancouver.ca/20260714/documents/rr1.pdf',
 'parisPool': 'Ville de Paris, Butte-aux-Cailles pool (2017): heat recovered from a data centre warms the pool water — https://www.paris.fr/pages/un-bassin-nordique-pour-nager-en-toutes-saisons-3583/',
 # rules
 'abBill22': 'Alberta Bill 22 (2022), Electricity Statutes (Modernizing Alberta\'s Electricity Grid) Amendment Act, as introduced 22 Feb 2022: "self-supply" defined; EUA s. 2(1)(b) exempts self-supply "consumed solely on that property by that owner or tenant"; no clause allowing export of surplus (checked by Claude; enacted text not yet read) — https://docs.assembly.ab.ca/LADDAR_files/docs/bills/bill/legislature_30/session_3/20220222_bill-022.pdf',
 'rlcAUC2021': 'SECONDARY (law-firm summary): Regulatory Law Chambers on the AUC Distribution System Inquiry final report: EV charging stations "are not clearly defined in legislation"; AUC report itself blocked to Claude — https://regulatorylawchambers.ca/2021-4-5-auc-distribution-system-inquiry-final-report-auc-proceeding-24116/',
 'edmZB570': 'Edmonton Zoning Bylaw 20001 s. 5.70: roof up to 1.7 m above maximum height; flat-roof parapet 0.4 m; no height limit for listed items (mechanical penthouse, tanks, "other similar architectural features") — solar collectors not named (checked by Claude) — https://zoningbylaw.edmonton.ca/570-measuring-height-and-grade',
 'edmZB7120': 'Edmonton Zoning Bylaw 20001 s. 7.120 cl. 3.7: no development permit for "A Solar Collector that complies with the regulations of this Bylaw" on a building not on the historic inventory or register (checked by Claude); the Solar Collectors regulation (s. 5.10) did not load — https://zoningbylaw.edmonton.ca/part-7-administrative-and-interpretive-clauses/development-permits/7120-no-development-permit',
}
r['new_sources'].update(SRC)
# Bennett Jones summary conflicts with the bill text on export
r['new_sources']['bennettBill22'] = r['new_sources']['bennettBill22'].replace('Act itself not yet read', 'CONFLICTS with the bill as introduced, which exempts only self-supply consumed on the property and has no export clause (abBill22)')

O = m['opportunity_labels']
def setL(name, readiness, basis, sources, prov=False):
    L = O[name]; L['readiness'] = readiness; L['basis'] = basis + ' ' + SEARCHED; L['sources'] = sources; L['provisional'] = prov

setL('District heat to a network', 'built_here',
 'Vancouver: TELUS data centre heat to the TELUS Garden thermal energy system (BCUC Order C-1-13, 2013) — a development-scale system, not a city network. Elsewhere: Tallaght, Dublin, Amazon data-centre heat, operating since 2023 (Codema); Meta Odense → Fjernvarme Fyn (COP 4.5, 2020); Mäntsälä.',
 ['bcucTelus', 'bcucC113', 'codemaTallaght', 'fjfAars2020', 'nivosMantsala'])
setL('Hospital or campus anchor', 'built_elsewhere',
 'Université Laval, Québec: supercomputer heat to the campus loop, 1,150,000 kWh/yr. Equinix Amsterdam exchanges heat and cold with the University of Amsterdam through an aquifer store (RVO, Dutch government).',
 ['ulavalCVD', 'rvoDatacenters'])
setL('New district with the data centre as heat plant', 'built_elsewhere',
 'Westville, Frankfurt: a new quarter of about 1,300 homes planned with at least 60% of its heat from a Telehouse data centre (Mainova, utility, 2021); 2,400 MWh/yr reported in a 2023 best-practice overview (Bytes2Heat). Old Oak, London is proposed (OPDC: over 9,000 homes, 2026–2040). Tallaght is a new network but serves existing buildings.',
 ['mainovaWestville', 'bytes2heat', 'opdcOldOak', 'codemaTallaght'])
setL('Seasonal storage in the ground', 'built_elsewhere',
 'Aquifer store: Equinix Amsterdam with the University of Amsterdam (RVO, Dutch government; Equinix 2012 claim). Borehole store with data-centre heat: studies only (Stavanger 2023 warns borehole life could fall from 30 to 10 years; Li et al. 2021). Built here with solar heat only: Drake Landing, Okotoks AB.',
 ['rvoDatacenters', 'equinixAM3', 'stavangerBTES2023', 'li2021_dcbtes', 'drake_landing'])
setL('Aquaculture / insects / algae', 'built_elsewhere',
 'Fish: Green Mountain DC-Telemark → Hima Seafood trout farm, Rjukan, Norway, 800 m apart, operating at test capacity (operator claim); White Data Center eel farm, Hokkaido, since Jan 2024 (operator claim). Algae (Data4, Paris-Saclay) and mealworms (RISE, Sweden) are pilots. Operator claims only — no independent source yet.',
 ['greenMountainHima', 'whiteDCeel', 'data4algae', 'riseMealworm'])
setL('Warming centre, refuge, clean-air room', 'speculative',
 'No case found of a data centre hosting a public warming, cooling or clean-air room or refuge. Nearest: Vancouver\'s 111 E 5th rezoning requires "an active, high-quality public realm interface" (City report, proposed); the reverse — data-centre heat warming a public pool — is built in Paris (Butte-aux-Cailles, 2017).',
 ['vanRR1_2026', 'parisPool', 'ess'])
setL('Reserved capacity and batteries to the grid', 'built_elsewhere',
 'Demand response: Google\'s contract with Indiana Michigan Power carries interruptible load and curtailment obligations (Indiana regulator, Cause 46276; operation not confirmed). UPS batteries: Digital Realty, nine Irish data centres in EirGrid frequency response (operator claim). Battery: Google St. Ghislain, Belgium, 2.75 MW proof of concept (vendor claim). None found in BC or Alberta.',
 ['iurc46276', 'enelxDLR', 'fluenceStGhislain', 'cfd', 'aeso_or'])
setL('EV charging hub', 'speculative',
 'No built case of a data centre sharing its capacity or site with public charging. The reverse is announced in the US: GPU pods at EV-charging sites using idle capacity (Xeal, Sep 2026, operator claim).',
 ['xealLaitent'])
setL('Meanwhile uses on land held for growth', 'speculative',
 'No documented interim public use of land a data centre holds for expansion. Closest: sheep grazing an on-site solar park (LCL Gembloux, operator claim), not shown to be expansion land or public.',
 ['bins'])
setL('Rainwater, condensate and water reuse', 'built_elsewhere',
 'Blowdown recovery: Quincy Water Reuse Utility, WA, treats and returns a Microsoft data centre\'s cooling water since 2021 (US EPA). Reclaimed wastewater: Loudoun Water pipes reclaimed water to data centres for cooling (utility). Rainwater: Microsoft claims partial use in the Netherlands and Ireland, no figures (operator claim). Greywater or blackwater for cooling: none found. None found in Canada.',
 ['epaQuincy', 'loudounWater', 'msWaterFacts'])
setL('Material bank: copper', 'speculative',
 'Corporate reuse exists (Microsoft Circular Centers: 83% reuse, 17% recycle of critical parts — operator claim), but recovered material returns to company or global supply chains. No case of a data centre planned as a city material bank.',
 ['msCircular', 'cda2023'])
setL('Distributed servers as heaters', 'pilot',
 'Qarnot\'s computing heaters were deployed under an EU-funded project (CORDIS EeHPC, 2014–15); British Gas is trialling Heata units in 10 homes (2025, operator claim). Current scale not confirmed; several firms have closed.',
 ['qarnotCordis', 'heataCentrica', 'liu2011'])
setL('Greenhouse', 'pilot',
 'Göteborg Energi runs a 130 m² proof-of-concept greenhouse on about 24 °C data-centre heat since 2024 (city utility). In Canada: QScale Lévis heat to a 12 ha greenhouse park, under construction (Québec government); a 3 MW proof of concept in Manitoba (operator claim). Alberta: studies only.',
 ['goteborgGH', 'quebecQScale', 'canaanMB', 'manitobaGH'])
setL('Cooling for neighbours', 'speculative',
 'Data-centre heat has driven chillers only to cool the centre\'s own equipment (LRZ CoolMUC-2, Garching, adsorption, 2016–2024, now shut down). Cooling a neighbouring building appears only as a proposal (Yuan et al. 2023 review). Needs roughly 65 °C or more: liquid-cooled only.',
 ['lrzCoolMUC', 'wilde2017', 'yuan2023', 'absorption2026'])
O['Sewage heat as comparator source']['basis'] = O['Sewage heat as comparator source']['basis'].split(' Precedent search')[0]

# rule corrections
for L in O.values():
    if isinstance(L['rules'], list):
        for x in L['rules']:
            if x['rung'] == 'Utility rules' and 'AUC 2021 inquiry' in x['edm'][1]:
                x['edm'] = ['no_rule', 'no statute or regulation found that classifies EV charging; AUC 2021 inquiry reportedly made no final decision (secondary sources; the AUC report would not open)']
                x['sources'] = ['m104', 'gowlingEV2021', 'rlcAUC2021']

# add-on readiness (paired with a data centre)
RD = {
 'pv': ('built_elsewhere', 'Equinix ME1 Melbourne, 1 MW rooftop (operator claim). None found in Canada.', ['equinixME1']),
 'pv_facade': ('built_elsewhere', 'MAD01 Madrid, 600 kWp PV facade on 3,600 m² (vendor claim).', ['onyxMAD01']),
 'battery': ('pilot', 'Google St. Ghislain, Belgium, 2.75 MW / 5.5 MWh proof of concept (vendor claim).', ['fluenceStGhislain']),
 'ups': ('built_elsewhere', 'Digital Realty, nine Irish data centres in EirGrid frequency response (operator claim).', ['enelxDLR']),
 'genset': ('built_elsewhere', 'LCL Aalst, Belgium, gensets on HVO100 (vendor claim); Microsoft Sweden on ≥50% renewable diesel (operator claim). Alberta approvals found are conventional diesel.', ['lclHVO', 'msSweden2021']),
 'borefield': ('built_elsewhere', 'Epic Systems, Wisconsin: 3.5 MW data centre rejecting heat to 6,100 wells and lakes (US DOE). UBC Okanagan study found steady-state operation not feasible for 250 kW.', ['epicDOE', 'ubcoBorefield2021']),
 'btes': ('speculative', 'Borehole store with data-centre heat: studies only (Stavanger 2023; Li et al. 2021).', ['stavangerBTES2023', 'li2021_dcbtes']),
 'ates': ('built_elsewhere', 'Equinix Amsterdam with the University of Amsterdam (RVO).', ['rvoDatacenters', 'equinixAM3']),
 'deep_geo': ('speculative', 'Only electricity contracts found (Google–Fervo, operator claim); no direct heat or cooling link.', ['googleFervo']),
 'tes': ('pilot', 'EU demonstrations (MODERATOR, 500 kWh store with a 40 kW data centre); Tallaght plans large stores (SEAI).', ['cordisModerator', 'seaiTallaght']),
 'absorption': ('speculative', 'For neighbours: proposal only. Own-equipment cooling ran at LRZ 2016–2024.', ['yuan2023', 'lrzCoolMUC']),
 'rainwater': ('built_elsewhere', 'Microsoft, Netherlands and Ireland, partial (operator claim, no figures).', ['msWaterFacts']),
 'reclaimed': ('built_elsewhere', 'Loudoun Water reclaimed-water supply to data centres for cooling (utility).', ['loudounWater']),
 'greywater': ('speculative', 'None found; a data centre has too few occupants to make much greywater.', []),
 'blackwater': ('speculative', 'None found.', []),
 'blowdown': ('built_elsewhere', 'Quincy Water Reuse Utility, operating since 2021 (US EPA).', ['epaQuincy']),
}
for t in m['try_menu']:
    if t['id'] in RD:
        a, b, s = RD[t['id']]; t['readiness'] = a; t['readiness_basis'] = b; t['readiness_sources'] = s
    if t['id'] in ('pv', 'pv_facade'):
        t['rules']['edmonton'] = ('no development permit for a compliant solar collector (ZB 20001 s. 7.120 cl. 3.7); height rule for collectors not yet read (s. 5.10); '
                                  'self-supply exempt only when used on the property (Bill 22); export through micro-generation ≤5 MW')
        t['rule_sources'] = ['bchRS2289', 'vanRoofBulletin2022', 'edmZB7120', 'edmZB570', 'abBill22', 'abMicrogen']
m['try_menu_readiness_note'] = 'How proven each add-on is, paired with a data centre: from the precedent search of 15 Oct 2026. Operator and vendor pages are claims.'

S = {**r.get('old_sources', {}), **r['new_sources']}
for L in O.values():
    for s in L['sources']:
        assert s in S, s
for t in m['try_menu']:
    for s in t.get('readiness_sources', []) + t.get('rule_sources', []):
        assert s in S, s
json.dump(r, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
from collections import Counter
print(Counter(L['readiness'] for L in O.values()), '; sources +', len(SRC))
