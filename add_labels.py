# Opportunity labels, 15 Oct 2026 (agreed with J.B.): three separate labels replace "cannot judge".
#  1 How proven the idea is   built here · built elsewhere · pilot · speculative · not yet known (needs a precedent search)
#  2 What the rules say        allowed · allowed with approval · not allowed · no rule yet · not yet known · not applicable
#  3 What we know              known (sourced) · not yet known — needs X
# "How proven" is about the idea paired with a data centre, decided by a sourced precedent. Labels marked
# provisional rest on the register's sources only; a precedent search has not been done for them.
# Idempotent. Run after add_exchange.py.
import json, os
h = os.path.dirname(os.path.abspath(__file__))
P = os.path.join(h, 'formula_register.json')
r = json.load(open(P, encoding='utf-8'))
m = r['meta']

SRC = {
 'vanRoofBulletin2022': 'City of Vancouver, Bulletin: Roof-mounted energy technologies and green roofs (effective 3 Feb 2009, amended 14 Nov 2022): solar panels may receive "minor additional height" at the Director of Planning\'s discretion (Zoning and Development By-law s. 10.1.1(d)); written rationale and drawings; no figure or edge setback stated — https://guidelines.vancouver.ca/bulletins/bulletin-roof-mounted-energy-technologies-and-green-roofs.pdf',
 'gowlingEV2021': 'SECONDARY (law-firm summary): Gowling WLG, Regulation of electric vehicle charging services (2021): BC exempts EV charging from UCA Part 3 (BCUC G-66-19, pre-authorised by MO M104); Alberta unresolved — AUC Distribution System Inquiry final report (21 Feb 2021) made no final decision, p.60 "most parties were of the view that no additional regulatory oversight is required at this time"; AUC report itself not yet read — https://gowlingwlg.com/en/insights-resources/articles/2021/regulation-of-electric-vehicle-charging-services',
 'bennettBill22': 'SECONDARY (law-firm summary): Bennett Jones, Alberta\'s Electricity Statutes (Modernizing Alberta\'s Electricity Grid) Amendment Act (Bill 22; Royal Assent 31 May 2022; proclaimed 6 Mar 2024), 11 Mar 2024: self-supply and export of surplus electricity permitted when s. 2(1)(b) conditions are met; Act itself not yet read — https://www.bennettjones.com/fr/Insights/Blogs/2024/03/Albertas-long-awaited-Electricity-Statutes-Modernizing-Albertas-Electricity-Grid-Amendment/pdf',
}
r['new_sources'].update(SRC)

m['label_systems'] = {
 'note': 'Agreed 15 Oct 2026: "cannot judge" is retired. Three labels answer three different questions and are never combined into a score. "Speculative" here describes the idea (never built with a data centre); it is separate from the evidence type "speculative", which describes a single figure no source states.',
 'readiness': {'question': 'How proven is the idea, paired with a data centre?', 'states': [
   {'id': 'built_here', 'name': 'built here', 'means': 'operating in BC or Alberta, with a source'},
   {'id': 'built_elsewhere', 'name': 'built elsewhere', 'means': 'operating outside BC and Alberta, with a source'},
   {'id': 'pilot', 'name': 'pilot', 'means': 'a demonstration or trial, with a source'},
   {'id': 'speculative', 'name': 'speculative', 'means': 'proposed, designed or studied, but not built with a data centre; still sized with physics and sourced coefficients'},
   {'id': 'unknown', 'name': 'not yet known', 'means': 'no precedent in the register either way; a precedent search is needed'}]},
 'rules': {'question': 'What do the rules say, rung by rung (zoning → building code → energy or utility rules → permit)?', 'states': [
   {'id': 'allowed', 'name': 'allowed', 'means': 'a clause permits it'},
   {'id': 'approval', 'name': 'allowed with approval', 'means': 'permitted at an official\'s discretion, or with a licence, variance or report'},
   {'id': 'not_allowed', 'name': 'not allowed', 'means': 'a clause rules it out'},
   {'id': 'no_rule', 'name': 'no rule yet', 'means': 'the rules do not cover it; a grey zone'},
   {'id': 'unknown', 'name': 'not yet known', 'means': 'the clause has not been found or read yet'},
   {'id': 'na', 'name': 'not applicable', 'means': 'the rung does not bear on it'}]},
 'knowledge': {'question': 'Do we have the figure?', 'states': [
   {'id': 'known', 'name': 'known', 'means': 'sourced, with a confidence'},
   {'id': 'unknown', 'name': 'not yet known', 'means': 'missing; the tool names what is needed'}]},
}

TRY = {'battery': 'battery', 'ups': 'ups', 'btes': 'btes', 'rainwater': 'rainwater', 'reclaimed': 'reclaimed', 'greywater': 'greywater', 'blackwater': 'blackwater', 'absorption': 'absorption', 'pv': 'pv'}
O = {
 'District heat to a network': {
   'readiness': 'built_here', 'provisional': False,
   'basis': 'Vancouver: the TELUS data centre offers a 1,400 kW year-round base load to the TELUS Garden thermal energy system (BCUC Order C-1-13, 2013; a development-scale system). Elsewhere: Meta Odense → Fjernvarme Fyn (realised COP 4.5, 2020); Mäntsälä (20 GWh delivered in 2018).',
   'sources': ['bcucTelus', 'bcucC113', 'fjfAars2020', 'nivosMantsala'],
   'rules': [{'rung': 'Utility rules', 'van': ['approval', 'heat sold to others is a BCUC-regulated thermal energy system (TELUS Garden: Order C-1-13); NEU credit for heat returned $32.59/MWh (By-law 9552 Sch. C)'], 'edm': ['unknown', 'Alberta rule for selling heat not yet read; Blatchford: connection compulsory, net-zero buildings exempt (Bylaw C17943 s. 6, s. 8)'], 'sources': ['bcucTelus', 'neu9552', 'blatchford2023']}],
   'unknowns': ['receiver demand for each site', 'pipe route and its cost'], 'visual': 'pipe route from the site to the network, homes within reach'},
 'Hospital or campus anchor': {
   'readiness': 'built_elsewhere', 'provisional': False,
   'basis': 'Université Laval, Québec: Colosse supercomputer heat to the campus loop, 1,150,000 kWh/yr, heat pumps to 40 °C, COP about 7 (case study, 2021).',
   'sources': ['ulavalCVD'],
   'rules': [{'rung': 'Utility rules', 'van': ['approval', 'as district heat if heat is sold across a property line'], 'edm': ['unknown', 'not yet read'], 'sources': ['bcucTelus']}],
   'unknowns': ['the anchor\'s heat demand and supply temperature'], 'visual': 'one pipe to one building'},
 'New district with the data centre as heat plant': {
   'readiness': 'speculative', 'provisional': True,
   'basis': 'No source in the register describes a new district planned around a data centre as its heat plant; built cases feed existing networks (Equinix PA10 → Plaine Commune Énergie, utility release).',
   'sources': ['engiePA10'],
   'rules': [{'rung': 'Zoning', 'van': ['approval', 'rezoning (about 15 months to decision)'], 'edm': ['approval', 'rezoning'], 'sources': ['vanRezoneTime']}],
   'unknowns': ['who pays for the network (capital split)', 'heat density of a future district'], 'visual': 'massing of a future district around the site'},
 'Seasonal storage in the ground': {
   'readiness': 'speculative', 'provisional': True,
   'basis': 'With data-centre heat: a design study only (Li et al. 2021, 0.9 MW, peer-reviewed). The store itself is built here with solar heat: Drake Landing, Okotoks AB (measured efficiency 0.06 → 0.54 over ten years).',
   'sources': ['li2021_dcbtes', 'drake_landing', 'drake'],
   'rules': [{'rung': 'Ground licence', 'van': ['approval', 'registered driller; report'], 'edm': ['approval', 'setbacks (2018 directive)'], 'sources': ['wsa', 'abDirective']}],
   'unknowns': ['land for the borefield on or next to the parcel'], 'visual': 'borefield drawn under a lot or park'},
 'Aquaculture / insects / algae': {
   'readiness': 'unknown', 'provisional': True,
   'basis': 'The register holds heat-demand studies (fish farms, mealworms, algae) but no built case using data-centre heat; precedent search needed.',
   'sources': ['ion2022', 'dreyer2021', 'gurreri2023'],
   'rules': [{'rung': 'Zoning', 'van': ['unknown', 'food production in industrial zones not yet read'], 'edm': ['unknown', 'not yet read'], 'sources': []}],
   'unknowns': ['a built precedent', 'food-safety rules'], 'visual': 'tank or rearing-room footprint to scale'},
 'Warming centre, refuge, clean-air room': {
   'readiness': 'speculative', 'provisional': True,
   'basis': 'No source describes a data centre hosting a public refuge; sized from emergency-lodging and cleaner-air standards (BC ESS / JIBC; Health Canada).',
   'sources': ['ess'],
   'rules': [{'rung': 'Building code', 'van': ['unknown', 'assembly occupancy beside a data centre not yet read'], 'edm': ['unknown', 'not yet read'], 'sources': []}],
   'unknowns': ['who runs it', 'separation from the secure area'], 'visual': 'room inside the building with its own street entry'},
 'Reserved capacity and batteries to the grid': {
   'readiness': 'unknown', 'provisional': True,
   'basis': 'Programmes exist (BC Hydro 2026 Call for Demand; AESO operating reserve); no case of a data centre taking part is in the register yet.',
   'sources': ['cfd', 'aeso_or'],
   'rules': [{'rung': 'Utility programme', 'van': ['allowed', 'BC Hydro 2026 Call: curtail ≥10% on 24 h notice, ≥144 h a year'], 'edm': ['allowed', 'AESO operating reserve ≥5 MW, or through an aggregator'], 'sources': ['cfd', 'aeso_or']},
             {'rung': 'Condition on large loads', 'van': ['approval', 'BC Hydro 2026 Call: curtailable ≥10% on 24 h notice, ≥144 h a year'], 'edm': ['approval', 'Data Centre Regulation (Alta Reg 117/2026), ≥75 MW from transmission: may tether to new generation or storage covering its peak; in mandatory load shed, large data centres cut before all others; bridged load (≤3 yr) cut first when supply is short. AESO process (proposal, Jun 2026): first intake gas only, bridging ≤40%. Under 75 MW or on distribution: no flexibility term found'], 'sources': ['cfd']},  # AESO sources attached in add_research_pass.py
             {'rung': 'UPS batteries to the grid', 'van': ['no_rule', 'no BC programme found'], 'edm': ['allowed', 'AESO reserves ≥5 MW or via aggregator'], 'sources': ['aeso_or']},
             {'rung': 'Fire code (battery room)', 'van': ['unknown', 'code path unconfirmed'], 'edm': ['unknown', 'code path unconfirmed'], 'sources': []}],
   'unknowns': ['data-centre participation precedent', 'battery fire-code path'], 'visual': 'daily power curve with the share given back'},
 'EV charging hub': {
   'readiness': 'unknown', 'provisional': True,
   'basis': 'Public charging is built in both cities; no case of a data centre setting aside its capacity for public charging is in the register yet.',
   'sources': [],
   'rules': [{'rung': 'Utility rules', 'van': ['allowed', 'exempt from UCA Part 3 (MO M104; BCUC G-66-19, 2019)'], 'edm': ['no_rule', 'AUC 2021 inquiry made no final decision (secondary source; AUC report to read)'], 'sources': ['m104', 'gowlingEV2021']},
             {'rung': 'Parking layout', 'van': ['allowed', 'stall 2.5 × 5.5 m, aisle 6.6 m'], 'edm': ['allowed', 'stall 2.6 × 5.5 m, 90° aisle 7.0 m (Bylaw 20001 Table 5.1.3)'], 'sources': ['vanParking', 'edmBylaw20001']}],
   'unknowns': ['grid headroom at the parcel', 'a built precedent'], 'visual': 'stalls drawn to scale on the lot, charger count'},
 'Meanwhile uses on land held for growth': {
   'readiness': 'speculative', 'provisional': True,
   'basis': 'Precedents noted in the GP1 Bins sheet are mostly operator claims.',
   'sources': ['bins'],
   'rules': [{'rung': 'Permit', 'van': ['unknown', 'temporary-use permit not yet read'], 'edm': ['unknown', 'not yet read'], 'sources': []}],
   'unknowns': ['how long land is held', 'who would use it'], 'visual': 'lot phasing over time'},
 'Rainwater, condensate and water reuse': {
   'readiness': 'unknown', 'provisional': True,
   'basis': 'No data-centre case in the register; blowdown recovery was evaluated at a US federal building (GSA GPG-052, NREL evaluation).',
   'sources': ['gsa_gpg052'],
   'rules': 'try:rainwater,reclaimed,greywater,blackwater',
   'unknowns': ['a data-centre precedent'], 'visual': 'roof catchment and tank'},
 'Material bank: copper': {
   'readiness': 'speculative', 'provisional': True,
   'basis': 'Copper content from an industry figure (Copper Development Association 2023, 20–40 t/MW); no source describes recovery planned as a city material bank.',
   'sources': ['cda2023'],
   'rules': [{'rung': 'Rules', 'van': ['na', ''], 'edm': ['na', ''], 'sources': []}],
   'unknowns': ['who would take the material and when'], 'visual': 'over-time view of materials leaving at each refresh'},
 'Distributed servers as heaters': {
   'readiness': 'speculative', 'provisional': True,
   'basis': 'Concept paper (Liu et al. 2011, The Data Furnace); commercial deployments not yet sourced.',
   'sources': ['liu2011'],
   'rules': [{'rung': 'Building code', 'van': ['unknown', 'not yet read'], 'edm': ['unknown', 'not yet read'], 'sources': []}],
   'unknowns': ['a built precedent'], 'visual': 'map of homes, not the site'},
 'Greenhouse': {
   'readiness': 'unknown', 'provisional': True,
   'basis': 'Greenhouse heat demand is sourced (Manitoba Agriculture; IESO 2019); no built case with data-centre heat in the register yet.',
   'sources': ['manitobaGH', 'iesoGH'],
   'rules': [{'rung': 'Zoning', 'van': ['unknown', 'greenhouse in industrial zones not yet read'], 'edm': ['unknown', 'not yet read'], 'sources': []}],
   'unknowns': ['a built precedent', 'land for the glasshouse'], 'visual': 'glasshouse footprint to scale'},
 'Sewage heat as comparator source': {
   'readiness': 'built_here', 'provisional': False,
   'basis': 'Vancouver NEU: 3.2 MW of sewage heat recovery, expanding by 6.6 MW (City of Vancouver). A comparator that competes with data-centre heat, not a data-centre opportunity.',
   'sources': ['neuSewage'],
   'rules': [{'rung': 'Rules', 'van': ['allowed', 'operating City utility'], 'edm': ['unknown', 'not yet read'], 'sources': ['neuSewage']}],
   'unknowns': [], 'visual': 'side by side with data-centre heat'},
 'Cooling for neighbours': {
   'readiness': 'unknown', 'provisional': True,
   'basis': 'Absorption chillers are an established technology (Energies 2026 gives driving temperatures); no built case using data-centre heat in the register. Physics gate: air-cooled heat at 25–35 °C is below the driving temperature; liquid-cooled only.',
   'sources': ['absorption2026'],
   'rules': [{'rung': 'Rules', 'van': ['na', 'physics gate first'], 'edm': ['na', 'physics gate first'], 'sources': []}],
   'unknowns': ['heat temperature at the site'], 'visual': 'temperature bar against the chiller\'s minimum'},
}
missing = [k for k in r['opportunity_quantities'] if k not in O]
assert not missing, missing
S = {**r.get('old_sources', {}), **r['new_sources']}
for k, v in O.items():
    for s in v['sources'] + [x for rr in (v['rules'] if isinstance(v['rules'], list) else []) for x in rr['sources']]:
        assert s in S, (k, s)
m['opportunity_labels'] = O

# rule states for the "What if we added" menu (from each entry's rule text)
RS = {
 'rainwater': ('allowed', 'approval'), 'reclaimed': ('approval', 'approval'), 'greywater': ('not_allowed', 'approval'),
 'blackwater': ('not_allowed', 'approval'), 'blowdown': ('allowed', 'allowed'), 'pv': ('approval', 'allowed'),
 'pv_facade': ('approval', 'allowed'), 'battery': ('unknown', 'unknown'), 'ups': ('no_rule', 'allowed'),
 'genset': ('allowed', 'allowed'), 'borefield': ('approval', 'approval'), 'btes': ('approval', 'approval'),
 'ates': ('approval', 'approval'), 'deep_geo': ('na', 'approval'), 'tes': ('allowed', 'allowed'), 'absorption': ('na', 'na'),
}
for t in m['try_menu']:
    if t['id'] in RS:
        t['rule_state'] = {'vancouver': RS[t['id']][0], 'edmonton': RS[t['id']][1]}
    if t['id'] == 'pv':
        t['rules'] = {'vancouver': 'export ≤100 kW per phase (RS 2289); extra height at the Director of Planning\'s discretion (s. 10.1.1(d); bulletin, Nov 2022)',
                      'edmonton': 'micro-generation ≤5 MW; self-supply and export permitted (Bill 22, proclaimed 2024 — secondary source); roof-height rule not yet found'}
        t['rule_sources'] = ['bchRS2289', 'vanRoofBulletin2022', 'abMicrogen', 'bennettBill22']
m['try_menu_readiness_note'] = 'The add-ons carry rule states only; how proven each is (paired with a data centre) is not yet labelled — it needs a precedent search.'

# quantities that carry the new sources
for q in r['quantities']:
    if q['id'] == 'ev_exemption':
        q['formula'] = 'BC: exempt from UCA Part 3 (MO M104, 2019; G-66-19); Alberta: no rule yet (AUC 2021 inquiry, no final decision)'
        q['sources'] = ['m104', 'gowlingEV2021']; q['status'] = 'BC confirmed; Alberta from a secondary source — AUC report to read'
        q['source_roles'] = [x for x in q.get('source_roles', []) if x['id'] != 'gowlingEV2021'] + [{'id': 'gowlingEV2021', 'term': 'Alberta status (law-firm summary)', 'role': 'rule', 'conf': 50, 'verified': True}]
    if q['id'] == 'self_gen_rules':
        if 'bennettBill22' not in q['sources']:
            q['sources'].append('bennettBill22')
        q['source_roles'] = [x for x in q.get('source_roles', []) if x['id'] != 'bennettBill22'] + [{'id': 'bennettBill22', 'term': 'Alberta self-supply and export (law-firm summary)', 'role': 'rule', 'conf': 50, 'verified': True}]
    if q['id'] == 'pv_roof':
        if 'vanRoofBulletin2022' not in q['sources']:
            q['sources'].append('vanRoofBulletin2022')
        q['source_roles'] = [x for x in q.get('source_roles', []) if x['id'] != 'vanRoofBulletin2022'] + [{'id': 'vanRoofBulletin2022', 'term': 'extra height for panels at the Director\'s discretion', 'role': 'rule', 'conf': 90, 'verified': True}]

# retire "cannot judge"
for v in m.get('verdict_states', []):
    if v['id'] == 'cannot':
        v['label'] = 'not yet known'
        v['means'] = 'a figure or clause the condition needs is missing; the tool names what is needed (operator floor price, parcel MW headroom, BC marginal factor, per-activity intensity)'
if 'verdict_states_note' in m:
    m['verdict_states_note'] = m['verdict_states_note'].replace('cannot judge', 'not yet known')

json.dump(r, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('labels for', len(O), 'opportunities;', sum(1 for v in O.values() if v['provisional']), 'provisional; sources +', len(SRC))
