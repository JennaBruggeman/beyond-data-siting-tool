# Exchange logic, 14 Oct 2026: what the learning-series critique added to the tool.
# - each exchange names its mechanism (physical transfer / through the grid / shared space / shared service)
# - evidence types for cases and model results (operating · measured · operator claim · modelled · proposed · speculative)
# - commitment states (existing · committed · planned · proposed · possible); only existing and committed count as delivered
# - a next action for every condition the tool cannot judge
# - futures: as planned · tenant changes cooling · tenant leaves · receiver leaves
# - receivers and competing sources around the parcel; carbon against the displaced source (can be negative)
# - who controls the computing (colocation tenants vs the operator); gates (grid, zoning) reported first
# Idempotent: re-running replaces earlier exchange entries. Run after add_siting.py.
import json, os
h = os.path.dirname(os.path.abspath(__file__))
P = os.path.join(h, 'formula_register.json')
r = json.load(open(P, encoding='utf-8'))
m = r['meta']

SRC = {
 'bcPools2025': 'BC Ministry of Health, Health Protection Branch, B.C. Guidelines for Pool Operations v3 (2025), s. 5.2 and 5.6 (Pool Regulation ss. 10(2)(b), 16(b)): pool water ≤ 37 °C, hot tubs ≤ 40 °C; competitive pools 25–28 °C recommended — https://islandhealth.ca/sites/default/files/environment/documents/bc-guidelines-for-pool-operations-v3-april-2025.pdf',
 'vanNEU2025': 'City of Vancouver, Southeast False Creek Neighbourhood Energy Utility (web page, modified 21 May 2025): 70% renewable, mostly sewage heat recovery; 6.6 MW sewage heat recovery added; 100% renewable by 2030 — https://vancouver.ca/home-property-development/southeast-false-creek-neighbourhood-energy-utility.aspx',
 'blatchfordDESS': 'City of Edmonton / Blatchford, District energy sharing system overview (undated, uploaded 2016): ambient-temperature loop, geo-exchange and sewer heat exchange, heat pumps in buildings — https://blatchfordedmonton.ca/wp-content/uploads/2016/05/Blatchford-district-energy-sharing-system-overview.pdf',
 'npc2612': 'City of Vancouver Building By-law 2025, Book II (Plumbing), Div. B 2.6.1.12.(1): storage-type service water heaters operate at not lower than 60 °C; 2.6.1.1.(3): recirculated hot water not less than 49 °C at any point (convenience copy, By-law 14343 as amended by 14488) — data/raw/codes/vbbl2025_bookII_insert.pdf; Edmonton: National Plumbing Code 2020 as adopted in Alberta, sentence text to confirm',
 'odrsf': 'Statistics Canada, Open Database of Sport and Recreational Facilities v2 (ODSRF), 21-26-0002, product 2021001, released 24 Sep 2026, ~249,000 records (pools, arenas, rinks, community centres…; type, year_built, ownership, geometry) — https://www150.statcan.gc.ca/n1/pub/21-26-0002/2021001/zip/odsrf_v2_gpkg.zip (not yet downloaded)',
 'odhf': 'Statistics Canada, Open Database of Healthcare Facilities (published 17 Apr 2020; coverage Nov 2019–Mar 2020): hospitals, nursing and residential care, ambulatory — https://www150.statcan.gc.ca/n1/pub/13-26-0001/2020001/ODHF.zip (not yet downloaded)',
 'odef': 'Statistics Canada, Open Database of Educational Facilities v2.1 (published 28 Nov 2022; archived) — https://www150.statcan.gc.ca/n1/pub/37-26-0001/2022001/ODEF_v2.1.zip (not yet downloaded)',
 'learningSeries': 'J.B., Beyond Data learning series (manuscript, Oct 2026), critique 14 Oct 2026 — a learning aid; figures it reports are unverified until the papers are read',
 'roudbari2025': 'Shafiee Roudbari, Kantor, Parakkal Menon, Eicker 2025, Energy 335:137902 — https://doi.org/10.1016/j.energy.2025.137902 (not yet read)',
 'ravi2026': 'Ravi et al. 2026, Applied Energy 402:127049 — https://doi.org/10.1016/j.apenergy.2025.127049 (abstract and EPFL pages checked by the atlas chat 15 Oct)',
 'wang2026': 'Wang et al. 2026, Environmental Science and Ecotechnology 31:100702 — https://doi.org/10.1016/j.ese.2026.100702 (full text checked by the atlas chat 15 Oct)',
 'zhang2025': 'Zhang et al., Applied Energy 377:124697 (DOI year 2024) — https://doi.org/10.1016/j.apenergy.2024.124697 (abstract checked by the atlas chat 15 Oct)',
 'oltmanns2020': 'Oltmanns et al. 2020, Energy Science & Engineering — https://doi.org/10.1002/ese3.633 (checked by the atlas chat 15 Oct)',
 'socci2024': 'Socci et al. 2024, Energy 313:134013 (checked by the atlas chat 15 Oct)',
 'crozier2025': 'Crozier & Liska 2025, Current Sustainable/Renewable Energy Reports 12(1) art. 12, open-access review: no single flexible share; price signals alone do not create flexibility; UPS rarely offered; inference inflexible; checkpointed training can pause (checked by the atlas chat 15 Oct)',
 'wangX2022': 'Xihao Wang et al. 2022, Sustainability 14(11):6814 — EV charging and interconnected data centres, simulated (found by the atlas chat 15 Oct)',
 'epaQuincy': 'US EPA, Water Reuse Case Study: Quincy, Washington — https://www.epa.gov/waterreuse/water-reuse-case-study-quincy-washington (checked by the atlas chat 15 Oct)',
}

def Q(id, name, stage, unit, formula, inputs, coef, sources, conf, status, direction=''):
    q = dict(id=id, name=name, stage=stage, unit=unit, formula=formula, inputs=inputs, coef=coef, sources=sources,
             source_roles=[dict(id=s, term=name, role='data', conf=conf, verified=conf >= 60 and '(not yet' not in SRC.get(s, '')) for s in sources],
             conf=conf, status=status, exchange=True)
    if direction: q['direction'] = direction
    return q

NEW = [
 Q('receivers_nearby', 'Receivers within reach', 'prospect', 'list: type, distance, demand, temperature, evidence',
   'every candidate receiver whose straight-line distance ≤ its type\'s reach (receiver_radius); each carries its demand (disclosed, else floor area × intensity), the temperature its type needs, its profile, and where the record came from',
   ['parcel', 'receiver_radius', 'receiver_demand', 'receiver_temp'],
   'types: hot-water district network · ambient (low-temperature) network · steam network · pool · ice rink (also a source) · school · hospital or care home · housing · office · greenhouse · wastewater plant. '
   'Pools: water ≤ 37 °C by regulation, 25–28 °C recommended for competition pools (BC 2025). Ambient networks (Blatchford) take heat near ground temperature and lift it in each building. '
   'Hot water stored for taps must be at least 60 °C, and 49 °C anywhere in a recirculation loop (Vancouver Building By-law 2025 Book II, 2.6.1.12.(1), 2.6.1.1.(3)); so data-centre heat at 25–35 °C can preheat tap water but a heat pump or other source must finish it. '
   'Map records: City buildings in the energy report (4 read), BCUC network decisions (6), Statistics Canada facility databases (recreation v2 2026, health 2020, education v2.1 2022 — not yet downloaded)',
   ['rvo2018', 'bcPools2025', 'blatchfordDESS', 'npc2612', 'vanEnergyReport', 'receiversBCUC', 'odrsf', 'odhf', 'odef'], 40,
   'logic defined; map data pending download (cloud cannot reach the open-data hosts; via J.B.\'s computer)'),
 Q('competing_sources', 'Other sources for the same receiver', 'prospect', 'list: source, capacity, status',
   'sources already serving, or planned for, each receiver: sewage heat recovery, wastewater plants, ice-rink refrigeration, other data centres, ground loops; a receiver whose demand is already met by a low-carbon source is a weaker match, not a missing one',
   ['receivers_nearby', 'sewage_heat'],
   'Vancouver NEU: 70% renewable, mostly sewage heat recovery, 6.6 MW added, 100% renewable target 2030 (City page, May 2025); Blatchford (Edmonton): ambient loop on geo-exchange and sewer heat. Ice rinks reject refrigeration heat — a source as well as a receiver',
   ['vanNEU2025', 'blatchfordDESS'], 60, 'two networks sourced; others per receiver'),
 Q('displaced_source', 'What the receiver uses now', 'test', 'fuel · kg CO₂e/MWh of heat',
   'the heat source a match would replace: from the host-building question (gas boilers · hot-water system · electric baseboard · district energy) or the network\'s supply mix; carbon change = displaced heat × its factor − heat-pump electricity × grid factor, which can be zero or negative where the displaced source is already low-carbon',
   ['host_building', 'competing_sources', 'grid_co2', 'hp_electricity'],
   'factors from grid_co2 (NIR 2026) and the network\'s own reported mix; a network share described as "renewable" is the operator\'s word and is shown as such',
   ['nir2026', 'vanNEU2025'], 60, 'logic defined; factors per network to source'),
 Q('hourly_overlap', 'Hour-by-hour match', 'test', '% of receiver demand met · MWh surplus · MW backup',
   'for each hour of the typical year: delivered = min(heat available, receiver demand); report the share of the receiver\'s annual demand met, the heat still rejected (surplus), and the receiver\'s peak that must be met without the data centre',
   ['heat_delivered', 'demand_profile', 'load_factor', 'stored_heat'],
   'annual totals overstate the match: Vancouver heat demand is 47% in Dec–Feb and 2.5% in Jun–Aug (CWEC, computed); the data centre\'s heat is near-flat',
   ['cwec', 'stratego'], 70, 'computable from data in hand'),
 Q('workload_control', 'Who controls the computing', 'characterise', 'operator · tenants · mixed',
   'flexible load is offered only by whoever runs the workloads: a single-owner or hyperscale operator can shift its own computing; in colocation the building operator controls power and cooling, not the tenants\' computing, so flexibility needs each tenant\'s agreement',
   ['it_load_claim'],
   'business model from operator pages (claims) and permits; the learning-series EV and workload papers are models of single-operator fleets',
   ['learningSeries', 'crozier2025'], 50, 'logic defined; per-site model from operator pages; Crozier & Liska 2025: no published flexible share — inference is inflexible, checkpointed training can pause'),
 Q('commitment', 'How firm the exchange is', 'decide', 'existing · committed · planned · proposed · possible',
   'existing = operating; committed = in a contract, permit condition or funded budget; planned = in a utility filing or adopted plan; proposed = an applicant or operator says so; possible = the tool found it and nobody has proposed it. Only existing and committed count as delivered',
   ['receivers_nearby'],
   'states and rule set 14 Oct 2026 (learning-series critique); promised heat that is only possible is shown, never counted',
   ['learningSeries'], 100, 'rule'),
 Q('futures', 'Futures', 'decide', 'one table per future',
   'rerun the match in four futures: (1) as planned; (2) the tenant changes cooling — air ↔ liquid changes heat temperature, capture share and flexibility; (3) the tenant leaves — the receiver\'s backup carries its full peak and the building\'s reusable parts are listed; (4) the receiver leaves — all heat goes back to rejection, so full rejection capacity stays',
   ['horizons', 'heat_temp', 'liquid_capture', 'hourly_overlap', 'risk_term'],
   'lifespans from horizons (servers ~6 years, plant 15–25, network 40–50); closure cases in meta.lifecycle',
   ['learningSeries'], 60, 'logic defined'),
]

CONDS = [
 dict(id='t_mechanism', heading='1 Technical', name='The mechanism is named',
      test='each exchange says whether it is a physical transfer, coordination through the grid, shared space or a shared service', quantities=['commitment'],
      move=['choice'], parties=['operator', 'receiver', 'utility'], constraint=False,
      note='Coordination through the grid (smart charging, shifting work) is a service to the utility, not something the building delivers to a neighbour; it is drawn dotted and counted under Power.'),
 dict(id='s_competition', heading='2 Spatial', name='No other source already serves the receiver',
      test='competing_sources for the receiver: none, spare demand left, or already met by a low-carbon source', quantities=['competing_sources', 'receivers_nearby'],
      move=['choice', 'infra'], parties=['receiver', 'utility', 'climate'], constraint=False,
      note='Near the NEU the data centre competes with sewage heat recovery; the match may still work for the share the sewer cannot cover.'),
 dict(id='tm_hourly', heading='3 Temporal', name='Supply meets demand hour by hour',
      test='hourly_overlap: share of the receiver\'s demand met, surplus rejected, backup peak named', quantities=['hourly_overlap'],
      move=['money', 'physics'], parties=['receiver', 'operator'], constraint=False),
 dict(id='tm_receiver_leaves', heading='3 Temporal', name='Still works if the receiver leaves',
      test='futures (4): full heat rejection kept on site; nothing in the data centre depends on the receiver', quantities=['futures'],
      move=['money'], parties=['operator', 'receiver', 'future'], constraint=False),
 dict(id='tm_tenant_changes', heading='3 Temporal', name='Still works if the tenant changes',
      test='futures (2) and (3): the receiver\'s backup carries its peak; the interface takes a different heat temperature', quantities=['futures'],
      move=['money', 'choice'], parties=['receiver', 'host', 'future'], constraint=False),
 dict(id='o_workload', heading='5 Organizational', name='Whoever runs the computing agrees to shift it',
      test='workload_control: operator, or tenants who have opted in', quantities=['workload_control'],
      move=['time', 'choice'], parties=['operator', 'utility'], constraint=False),
 dict(id='o_committed', heading='5 Organizational', name='The exchange is committed, not only possible',
      test='commitment is existing or committed; otherwise shown as a possibility with what would commit it', quantities=['commitment'],
      move=['time', 'policy'], parties=['receiver', 'city', 'neighbours', 'future'], constraint=False,
      note='Guards against a heat promise that wins approval and is never built (see Promises enforceable).'),
]

# Next action when a condition cannot be judged: by heading, with specific overrides
NEXT_BY_HEADING = {
 '1 Technical': 'engineering figure from the operator or a study (temperature, flow, capture)',
 '2 Spatial': 'route survey and utility locates; confirm the receiver\'s location and size',
 '3 Temporal': 'hourly or monthly demand data from the receiver',
 '4 Economic': 'cost model at low / central / high (pipe, plant, prices)',
 '5 Organizational': 'name a party willing to own, run and pay for the connection',
 '6 Regulatory': 'ask the authority (City, BCUC or AUC, utility) — cite the rule',
 '7 Security': 'the operator\'s own assessment — not public, and the tool does not ask for it',
 '8 Social': 'consultation record or a conversation with the people named',
 '9 Environmental': 'the displaced source and its factor; measured water use',
 '10 Experiential': 'site visit at the times that matter (night, generator test)',
 '11 What if we added': 'a supplier quote or a rule check for the addition',
}
NEXT = {
 'r_grid': 'the utility\'s capacity answer for this parcel (load application); in downtown Vancouver none before 2032',
 'tm_hourly': 'the receiver\'s monthly bills or meter data; otherwise the tool uses the typical-year profile and says so',
 's_competition': 'ask the network operator what it already plans to supply',
 'o_workload': 'the operator\'s business model (single owner, hyperscale, colocation)',
 'o_committed': 'a contract, permit condition or budget line',
 'env_carbon': 'the displaced source and its factor; the network\'s reported mix',
}

ids = {q['id'] for q in NEW}
r['quantities'] = [q for q in r['quantities'] if q['id'] not in ids and not q.get('exchange')] + NEW
cids = {c['id'] for c in CONDS}
r['conditions'] = [c for c in r['conditions'] if c['id'] not in cids] + CONDS
for c in r['conditions']:
    c['next_action'] = NEXT.get(c['id'], NEXT_BY_HEADING.get(c['heading'], ''))
    if c['id'] == 'env_carbon':
        c['test'] = 'against the source it displaces; both grid factors reported; can be zero or negative'
        c['quantities'] = ['grid_co2', 'hp_electricity', 'generator_co2', 'displaced_source']
    if c['id'] == 'tm_profile':
        c['quantities'] = sorted(set(c['quantities']) | {'hourly_overlap'})
r['new_sources'].update(SRC)

m['mechanisms'] = [
 dict(id='physical', name='Physical transfer', line='solid', means='a pipe, cable or duct carries the resource from one party to another', examples='heat to a network; reclaimed water to cooling'),
 dict(id='grid', name='Through the grid', line='dotted', means='two loads coordinated by prices or signals through a utility; nothing passes between them directly', examples='shifting computing; smart charging; V2G; demand response'),
 dict(id='space', name='Shared space', line='long dash', means='another party uses rooms, roof, land or edge', examples='public room at the edge; roof for solar'),
 dict(id='service', name='Shared service', line='dash-dot', means='staff, monitoring, backup supply or maintenance shared', examples='backup power to a shelter; shared loading'),
]
for e in m['exchanges']:
    e['mechanism'] = {'heat': 'physical', 'power': 'grid', 'water': 'physical', 'space': 'space', 'materials': 'physical', 'sound': 'physical'}.get(e['id'], 'physical')
    if e['id'] == 'heat':
        e['dc_to_place'] = sorted(set(e['dc_to_place']) | {'hourly_overlap'})
        e['place_to_dc'] = sorted(set(e['place_to_dc']))
m['evidence_types'] = [
 dict(id='operating', name='operating', means='built and running, reported by a regulator, utility or independent party'),
 dict(id='measured', name='measured', means='metered or surveyed values'),
 dict(id='claim', name='operator claim', means='what the operator or vendor says; shown as a claim'),
 dict(id='modelled', name='modelled', means='a calculation or simulation under stated assumptions'),
 dict(id='proposed', name='proposed', means='filed, planned or announced, not built'),
 dict(id='speculative', name='speculative', means='a design inference by the tool or J.B.; no source states it'),
]
m['evidence_note'] = 'Evidence type says what kind of thing a figure or case is; the confidence ring says how much to trust the number. Both show.'
m['commitment_states'] = [
 dict(id='existing', name='existing', counts=True), dict(id='committed', name='committed', counts=True),
 dict(id='planned', name='planned', counts=False), dict(id='proposed', name='proposed', counts=False),
 dict(id='possible', name='possible', counts=False)]
m['futures'] = [
 dict(id='planned', name='As planned'), dict(id='cooling', name='Tenant changes cooling'),
 dict(id='tenant_leaves', name='Tenant leaves'), dict(id='receiver_leaves', name='Receiver leaves')]
m['next_action_note'] = 'Every condition the tool cannot judge names the next step that would let it judge — a research to-do, not a verdict.'
m['model_results'] = [
 dict(id='roudbari', place='Montreal (per the learning series)', what='data-centre heat to campus heating', figures='74% of heating demand, −95% emissions, +11% annual cost — as reported by the learning series only; the abstract names no site and no figures', evidence='modelled', status='unverified — full text needed (UBC Library)', sources=['roudbari2025']),
 dict(id='ravi', place='Lausanne, EPFL', what='real data centre inside EPFL\'s heating plant, 2 → 4 MW; modelled as heat and flexibility prosumer', figures='up to 40% of the campus heat demand (an EPFL slide pairs this with 10 MW); 28% = increase in buffering potential for variable renewables; 60% of rejected heat and 18.2 MWh unverified; the series\' "90% PV self-consumption" appears nowhere', evidence='modelled', status='checked by the atlas chat 15 Oct (abstract or open full text); not re-read in this session', sources=['ravi2026']),
 dict(id='wang', place='98 countries; Shenzhen example (real WWTP data, simulated data centre)', what='treated wastewater to cooling; heat back to treatment plants', figures='~1,300 million m³ water (not labelled annual), 84 Mt CO₂e, US$95.4 bn excluding the social cost of carbon; a "first-order" global estimate', evidence='modelled', status='checked by the atlas chat 15 Oct (abstract or open full text); not re-read in this session; not transferable to a parcel', sources=['wang2026']),
 dict(id='zhang', place='simulated network', what='coordinated data-centre workloads and EV charging, priced', figures='> 20% less load fluctuation; ~15% less line occupancy (3 DCs and 1,400 EVs not confirmed from the abstract)', evidence='modelled', status='checked by the atlas chat 15 Oct (abstract or open full text); not re-read in this session', sources=['zhang2025']),
 dict(id='oltmanns', place='TU Darmstadt, Lichtenberg II', what='45 °C hot-water-cooled HPC, heat to nearby buildings', figures='20–50% of waste heat usable; up to 720 t CO₂/yr', evidence='modelled', status='checked by the atlas chat 15 Oct (abstract or open full text); not re-read in this session', sources=['oltmanns2020']),
 dict(id='socci', place='Italy (city not named)', what='100–500 kW data centre into a gas-CHP third-generation network', figures='waste heat 12–59% of the supply mix; gas −11 to −58%', evidence='modelled', status='checked by the atlas chat 15 Oct (abstract or open full text); not re-read in this session', sources=['socci2024']),
 dict(id='quincy', place='Quincy, WA', what='industrial water reuse utility treating cooling-tower blowdown (lime softening → UF → softening → RO → storage → blending; brine to evaporation ponds)', figures='US$31 M; "an estimated 138 million gallons of water per year"; operating since 30 Jun 2021; as of 2022 only Microsoft connected', evidence='operating', status='checked by the atlas chat 15 Oct (abstract or open full text); not re-read in this session; the saving is an estimate', sources=['epaQuincy']),
]
m['model_results_note'] = 'Results from other places shown as precedent ranges with their evidence type; never used as defaults for a parcel. Every receiver in these cases is an institution, and the operators are single-owner campus or hyperscale sites; no study found measures how the value of reused heat splits between operator, utility and residents (atlas chat, 15 Oct).'
ol = m['options_logic']
G = 'report the gates first — grid connection (r_grid) and zoning use (z_use): a blocked gate is named before any exchange is weighed, and the exchanges still show as "if the gate moved"'
F = 'run each option through the four futures (as planned · tenant changes cooling · tenant leaves · receiver leaves) and show what changes'
ol['steps'] = [s for s in ol['steps'] if s not in (G, F)]
ol['steps'].insert(1, G); ol['steps'].append(F)
m['date'] = '2026-10-14'
json.dump(r, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(NEW), 'quantities,', len(CONDS), 'conditions; next actions on', sum(1 for c in r['conditions'] if c.get('next_action')), 'conditions')
