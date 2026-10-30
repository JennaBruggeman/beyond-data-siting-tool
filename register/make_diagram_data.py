#!/usr/bin/env python3
"""Build diagram_data.json for the Beyond Data tool-logic diagram from formula_register.json.
Run after any register edit: python3 make_diagram_data.py"""
import json, os, re
here = os.path.dirname(os.path.abspath(__file__))
r = json.load(open(os.path.join(here, 'formula_register.json'), encoding='utf-8'))
Q = {q['id']: q for q in r['quantities']}

STAGES = [
    ('input', 'What we start with', 'what the tool reads or asks for'),
    ('size', 'How big it can be', 'how big the data centre is'),
    ('place', 'What the site offers', 'what the place offers the data centre'),
    ('characterise', 'What it gives off', 'what it gives off and holds'),
    ('prospect', 'Who is nearby', 'who is nearby and what they need'),
    ('opportunity', 'What it could become', 'what the output could become, sized'),
    ('test', 'What it would take', 'the figures the conditions are judged on'),
    ('decide', 'Who gains, who pays', 'ledger and trade-off table'),
]

# External inputs: what they are and where the tool gets them
INPUTS = {
    'parcel': ('Parcel', 'address → folio, lot, zoning, footprint, storeys; lot area from the outline (Edmonton record as a note), corrected to true degree lengths (+0.8% Van, +0.9% Edm; 30 Oct 2026)', 'City open data (Vancouver property-tax report, 2009 footprints; Edmonton parcels); BCA extract', 80),
    'cooling_type': ('Cooling type', 'air / glycol-dry cooler / chilled water / liquid', 'permits (public record), operator page (claim), site visit', 70),
    'weather': ('Weather file', 'CWEC typical year, hourly', 'ECCC CWEC 2020 (Vancouver Intl, Edmonton Intl)', 80),
    'plant_schedule': ('Plant on site', 'generators, chillers, dry coolers, transformers — what, where', 'permits, filed noise reports, site visit', 70),
    'receivers': ('Receivers nearby', 'buildings and uses within 3 km (receiver_radius; RVO reaches kept as reference only, 30 Oct 2026)', 'City energy report (4 buildings read), BCUC network decisions, Statistics Canada facility databases (to download), site visit', 60),
    'receiver_temp': ('Receiver temperature', '°C the receiver needs', 'receiver type (DH 70/35, floor heat 35–45, RAS 12–15, greenhouse 38–82)', 70),
    'receptors': ('Noise receptors', 'nearest dwellings and their distance', 'City parcels, site visit', 80),
    'lighting_plan': ('Lighting', 'exterior lighting as seen', 'site visit', 60),
    'massing': ('Massing', 'height and footprint; parts with no recorded height labelled, never shown as a height (30 Oct 2026)', '2009 footprints (Vancouver), parcels (Edmonton)', 80),
    'spare_cooling': ('Spare cooling', 'cooling capacity beyond IT load', 'operator claim or judged', 40),
    'area': ('Area considered', 'hectares around the parcel', 'tool radius setting', 100),
    'plot_ratio': ('Plot ratio', 'built area ÷ land area', 'parcels and footprints', 70),
    'start_case': ('What is being built', 'new or existing · whole or part · which floor · or a special case', 'asked first (J.B., 14 Oct); quick-path default: new, whole building', 100),
    'host_building': ('Host building', 'part of an existing building: owner or tenant, other uses, heating system, walls and orientation, room for heat rejection, electrical service, floor height, floor load', 'asked; "don\'t know" gives a labelled assumption', 50),
    'zone': ('Zone', 'zoning district and sub-area', 'Vancouver property-tax report zoning field; Edmonton zoning map (11,549 polygons); sub-area maps from the schedules', 80),
    'flood_area': ('Floodplain', 'whether, and what share of, the parcel is in the designated floodplain (grid over the whole lot, 30 Oct 2026)', 'City of Vancouver designated-floodplain layer', 80),
    'sewer_flow': ('Sewer flow', 'm³/day in the main past the parcel', 'sewer-mains layer gives type and material only; flow by request', 20),
}

# Conditions grouped by heading, in heading order
HEADINGS = ['1 Technical', '2 Spatial', '3 Temporal', '4 Economic', '5 Organizational', '6 Regulatory', '7 Security', '8 Social', '9 Environmental', '10 Experiential', '11 What if we added']

# Worked example: 555 W Hastings, match = recovered heat → host building + downtown network
EX = {
    'site': '555 W Hastings St (Harbour Centre), Vancouver',
    'match': 'Recovered heat → the host tower and the downtown steam network (Creative Energy)',
    'values': {
        'parcel': ('73,225 m² GFA, 1977, office, 30 storeys', 'City energy report 2025; property-tax report', 90),
        'floor_area': ('73,225 m²', 'measured (City energy report 2025, GFA 788,192 ft²)', 90),
        'server_floor': ('≈1,500–3,000 m² across three tenants', 'operator pages: VAN1 5,000 ft², VAN5 10,800 ft², VAN-2 unstated — claims', 50),
        'it_load_outside': '0.8–1.5 MW (server floor × 500 W/m²)',
        'it_load_claim': ('≥ 3.7 MW nameplate', 'VAN5 1.6 + VAN-2 2.14 + VAN1 unstated — operator claims', 50),
        'it_load_actual': ('1.3–2.2 MW average', '≥3.7 MW × utilisation 0.35–0.6; whole-tower non-heat energy 32.5 GWh ≈ 3.7 MW is the ceiling', 70),
        'pue': ('1.4–1.6', 'assumed, colocation in an office tower', 60),
        'heat_rejected': ('16–31 GWh/yr', 'IT × PUE × 8,760 h', 60),
        'cooling_type': ('glycol in-row with rooftop dry coolers; P1 chiller room (2019 permit)', 'operator claim + permit record', 70),
        'heat_temp': ('25–35 °C (air/glycol)', 'air-cooled class', 70),
        'liquid_capture': ('0.5–0.8', 'glycol loop share, judged', 40),
        'receiver_temp': ('70 / 35 °C (network); 45 °C (host, retrofit)', 'receiver type', 70),
        'cop': ('3.0–3.6', 'Lorenz η 0.55, 30 → 70 °C; DEA 3 MW waste-heat 3.6', 70),
        'heat_delivered': ('12–34 GWh/yr (1.4–3.9 MW average)', 'Q × capture × COP ÷ (COP − 1)', 60),
        'hp_electricity': ('3–12 GWh/yr', 'Q_out ÷ COP', 60),
        'erf': ('0.4–1.0 of IT energy reused', 'heat_delivered ÷ IT energy', 60),
        'free_cooling_hours': ('7,109 h at 18 °C; 8,645 h at 24 °C', 'CWEC Vancouver Intl, computed', 80),
        'spare_capacity': ('unknown; 13.8 kV primary + standby feeders (claim); BC Hydro primary-service upgrade 2022 (permit)', 'operator claim + permit', 40),
        'flexible_load': ('judged 10–30% of IT load', 'colocation, no public demand-response record', 40),
        'grid_co2': ('BC 18.1 g/kWh (consumption, 2024); heat-pump electricity 3–12 GWh/yr adds ≈ 54–217 t/yr at the average factor (BC marginal factor unpublished)', 'NIR 2026 Annex 7', 90),
        'rainwater': ('≈ 2,200 m³/yr from a 2,400 m² roof', '1,160 mm × roof area × 0.8', 70),
        'noise_level': ('rooftop dry coolers and P1 chiller; receptors: mixed-use towers across W Hastings and Seymour', 'permit record + site; no measurement', 50),
        'noise_limit': ('DD is in the Activity Zone (By-law 6555 Sch. A; outside the B.1 outline): 70 dBA day / 65 night at receptors in activity or intermediate zones, 60 / 55 at a quiet zone; the City\'s permit note for air-conditioning units is stricter, 55 / 45', 'Noise Control By-law 6555 ss. 2.3, Sch. A, B.1; permit records (sources/11)', 80),
        'receivers': ('host tower (4.9 GWh heat/yr); 515 W Hastings (SFU + data halls, adjacent); downtown steam network (Creative Energy)', 'City energy report 2025; permits', 80),
        'receiver_demand': ('host 4.9 GWh/yr; network: tens of GWh', 'measured for the host; network demand not public', 60),
        'demand_profile': ('DJF 47% of annual, JJA 2.5%; peak ÷ min month 3.9', 'CWEC + STRATEGO + CEUD 46% space heat', 70),
        'homes_heated': ('heat available for the equivalent of 800–2,400 BC homes (space + hot water) — available, not heated: the host takes 4.9 GWh, the rest needs the network', '12–34 GWh ÷ 52.5 GJ (14.58 MWh) per home', 70),
        'price_floor': ('≈ $37–57/MWh levelised', 'DEA capex 0.95–1.13 M€/MW × CRF 6%/20 yr + O&M + electricity $80–120/MWh ÷ COP', 60),
        'price_ceiling': ('gas-equivalent $38.6; Creative Energy tiers $39.6–66.6; RNG $70.7; NEU credit $32.59 per MWh', 'tariffs on file', 60),
        'window': ('overlaps at $39–57 only if the buyer pays above plain gas', 'floor vs ceiling', 60),
        'lcoh': ('$37–57/MWh', 'see price_floor', 60),
        'payback': ('6–15 yr at $40–60/MWh; never at $32.59', 'capex ÷ (price − cost)', 60),
        'risk_term': ('high class: small, heat-pump-based (14 of 19 terminated in Sweden)', 'Lygnerud & Werner', 70),
        'capex_split': ('network operator usually owns the heat pump (Fortum/Exergi pattern); here no precedent', 'Nordic contracts', 70),
        'grid_headroom': ('existing connection is the asset; no new feeder positions downtown FY2027–2032', 'West End Substation CPCN', 90),
        'lead_time': ('transmission-class: 2–3 yr studies; WES in service 2032', 'BC Hydro', 90),
        'crossing_type': ('host: inside one envelope; network: pipe under W Hastings (Encroachment By-law 4243)', 'public records', 90),
        'standoff': ('data hall on floor 9, chiller at P1: no public standoff issue', 'permits', 80),
        'licence_flag': ('none for air-to-water recovery', 'no groundwater involved', 90),
        'horizons': ('heritage B tower, 1977; data-centre tenants on leases; network franchise to 2039+', 'property record, franchise', 60),
        'build_cost': ('$7–13/W (textbook); local: $18 M for three floors at 515 W Hastings', 'Barroso; permits', 70),
        'reserved_cost': ('unknown spare capacity → cannot price', '—', 20),
        'lrmc_bc': ('$410k per MW·yr if 1 MW could be shed at peak', 'BC Hydro IRP App. F', 90),
        'affordability': ('not a deprivation site; commercial receivers', 'census not yet joined', 40),
        'deprivation': ('downtown core: low residential deprivation nearby; SRO stock to the east', 'judged, census pending', 20),
        'visibility': ('seen: tower, lobby, loading bays (now chiller room); closed: floor 9 halls, P1; documents only: BC Hydro Vista room', 'site + permits', 80),
        'watched_area': ('standard office-tower lobby cameras; no felt exclusion at the edge (J.B. to confirm)', 'site visit pending', 20),
        'ledger': ('operator: pays capture + HP unless the network does; network: pays pipe + HP in the Nordic pattern; City: encroachment fee; residents: none directly', 'derived', 50),
    },
    'conditions': {  # explicit condition states for the example (first attempt); others not judged
        't_quantity': 'pass', 't_quality': 'partial', 'e_window': 'partial', 'e_payback': 'partial', 'e_risk': 'partial',
        'tm_overlap': 'partial', 'r_grid': 'pass', 'sec_crossing': 'pass', 'x_visible': 'pass', 'soc_watched': 'unassessed',
    }
}

EX['values'].update({'it_load_actual': ('0.7–2.2 MW average', "≥3.7 MW claimed × utilisation 0.20–0.60 (calibrated: Telia snapshot 0.20), capped by the tower's measured 3.7 MW", 70), 'heat_rejected': ('9–31 GWh/yr', 'IT × PUE 1.4–1.6 × 8,760 h', 60), 'heat_captured': ('4.5–25 GWh/yr', 'heat rejected × capture 0.5–0.8, at the boundary (ISO/IEC 30134-6)', 40), 'cop': ('6.0–8 (capped)', 'full Lorenz, η 0.40–0.50, 25–35 °C source → host loop 45/35 °C; calibrated on Odense, Telia, Laval', 60), 'heat_delivered': ('5–30 GWh/yr available', 'E_reuse × COP ÷ (COP − 1); the host takes 4.9 of it', 40), 'hp_electricity': ('0.7–5.0 GWh/yr', 'Q_out ÷ COP', 40), 'erf': ('0.5–0.8', 'E_reuse ÷ E_DC (ISO); equals the captured share', 40), 'receiver_temp': ('host loop 45 / 35 °C after retrofit; the Creative Energy network is steam — outside the calibrated range', 'receiver type; NEU minimum 65 °C for comparison', 60), 'price_floor': ('≈ $31–58/MWh', 'DEA capex × CRF 6 %/20 yr ÷ 4,000–6,000 h + O&M + electricity ÷ COP (first-attempt assumptions; tariffs now sourced)', 60), 'window': ('overlaps at $39–58/MWh', 'floor vs gas-equivalent and Creative Energy tiers', 60), 'payback': ('4–24 yr at the buyer ceiling', 'capex per MW ÷ (ceiling − running cost) × hours', 60), 'lcoh': ('$31–58/MWh', 'see operator floor', 60), 'pue': ('1.4–1.6', 'assumed for colocation in a tower; sourced range 1.4 (LBNL 2023) – 1.54 (Uptime 2025)', 60), 'tradeoffs': ('no verdict — the host takes ~5 GWh a year of 5–30 available; the operator would carry a heat pump and capture loop worth roughly $1–6 M; neighbours across Hastings and Seymour face a free-field screen of 50–56 dBA against 45–55 limits; carbon displaced ~1,000–6,600 t/yr on the average factor', 'trade-off table (first run; party rows not yet computed)', 40)})
EX['match'] = 'Recovered heat → the host tower (retrofit to a 45 °C loop); the downtown steam network is outside the calibrated range'

nodes, edges = [], []
SIDE = {'cooling_type':'dc','plant_schedule':'dc','spare_cooling':'dc','lighting_plan':'dc','start_case':'dc','host_building':'place'}
for k, (name, desc, src, conf) in INPUTS.items():
    nodes.append({'id': k, 'kind': 'input', 'stage': 'input', 'side': SIDE.get(k, 'place'), 'name': name, 'formula': desc, 'coef': '', 'unit': '', 'sources': [], 'source_text': src, 'conf': conf, 'status': 'read or asked', 'inputs': []})
for q in r['quantities']:
    nodes.append({'id': q['id'], 'kind': 'quantity', 'stage': q['stage'], 'name': q['name'], 'formula': q['formula'], 'coef': q.get('coef', ''), 'unit': q['unit'], 'sources': q['sources'], 'source_roles': q.get('source_roles', []), 'conf': q['conf'], 'status': q['status'], 'direction': q.get('direction', ''), 'trial': q.get('trial', ''), 'inputs': [i for i in q['inputs'] if i != '*']})
    for i in q['inputs']:
        if i == '*':
            continue
        edges.append({'from': i, 'to': q['id']})
conds = []
for h in HEADINGS:
    for c in r['conditions']:
        if c['heading'] == h:
            conds.append({'id': c['id'], 'heading': h, 'name': c['name'], 'test': c['test'], 'quantities': c['quantities'], 'move': c.get('move', []), 'parties': c.get('parties', []), 'constraint': c.get('constraint', False), 'note': c.get('note', ''), 'sources': c.get('sources', []), 'next_action': c.get('next_action', '')})
OL_ = r['meta'].get('opportunity_labels', {})
opps = [{'name': k, 'quantities': v, **({'labels': OL_[k]} if k in OL_ else {})} for k, v in r['opportunity_quantities'].items()]

# upstream confidence
def upstream(i, seen=frozenset()):
    n = next((x for x in nodes if x['id'] == i), None)
    if n is None or i in seen:
        return 100
    vals = [n['conf']] + [upstream(x, seen | {i}) for x in n['inputs']]
    return min(vals)
for n in nodes:
    n['upstream'] = upstream(n['id'])

out = {
    'meta': {'title': 'Beyond Data — tool logic', 'date': r['meta']['date'], 'scale': r['meta']['confidence_scale'], 'rule': r['meta']['rule'],
             'counts': {'inputs': len(INPUTS), 'quantities': len(r['quantities']), 'conditions': len(conds), 'opportunities': len(opps), 'sources': len(r['new_sources'])+len(r.get('old_sources',{}))}},
    'stages': [{'id': a, 'name': b, 'desc': c} for a, b, c in STAGES],
    'verdict_states': r['meta'].get('verdict_states', []),
    'headings': HEADINGS,
    'nodes': nodes, 'edges': edges, 'conditions': conds, 'opportunities': opps,
    'sources': {**r.get('old_sources',{}), **r['new_sources']},
    'example': EX,
    'parties': r['meta'].get('parties', []),
    'move_categories': r['meta'].get('move_categories', []),
    'move_note': r['meta'].get('move_note', ''),
    'exchanges': r['meta'].get('exchanges', []),
    'lifecycle': r['meta'].get('lifecycle', []),
    'options_logic': r['meta'].get('options_logic', {}),
    'verdict_note': r['meta'].get('verdict_states_note', ''),
    'try_menu': r['meta'].get('try_menu', []),
    'try_menu_note': r['meta'].get('try_menu_note', ''),
    'limit_presets': r['meta'].get('limit_presets', []),
    'limit_presets_note': r['meta'].get('limit_presets_note', ''),
    'start_step': r['meta'].get('start_step', {}),
    'mechanisms': r['meta'].get('mechanisms', []),
    'evidence_types': r['meta'].get('evidence_types', []),
    'commitment_states': r['meta'].get('commitment_states', []),
    'futures': r['meta'].get('futures', []),
    'model_results': r['meta'].get('model_results', []),
    'label_systems': r['meta'].get('label_systems', {}),
    'try_menu_readiness_note': r['meta'].get('try_menu_readiness_note', ''),
    'research_pass': r['meta'].get('research_pass', {}),
    'source_kinds': r['meta'].get('source_kinds', {}),
    'source_check': r['meta'].get('source_check', {}),
}
# city of each source (J.B., 16 Oct: one diagram, a Vancouver / Edmonton / Both switch; same nodes, sources and maths differ by city).
# Classified from each source's own text by place names; 'gen' = general (physics, studies, other places), used in both cities.
SRC_ALL = {**r.get('old_sources', {}), **r['new_sources']}
RX_V = re.compile(r"Vancouver|\bVBBL\b|BC Hydro|FortisBC|British Columbia|\bBC\b|BCUC|Creative Energy|River District|By-law 9552|\bNEU\b|Cologix VAN|Metro Vancouver")
RX_E = re.compile(r"Prairies|Edmonton|Alberta|\bAB\b|EPCOR|AESO|Blatchford|Bylaw 20001|Bylaw C17943|Gold Bar|\bAUC\b")
def src_city(k):
    t = json.dumps(SRC_ALL.get(k, ''), ensure_ascii=False); v, e = bool(RX_V.search(t)), bool(RX_E.search(t))
    return 'both' if v and e else 'van' if v else 'edm' if e else 'gen'
out['source_city'] = {k: src_city(k) for k in out['sources']}
for n in out['nodes']:
    if n.get('kind') != 'quantity': continue
    c = {'van': 0, 'edm': 0, 'both': 0, 'gen': 0}
    for k in n.get('sources', []): c[src_city(k)] += 1
    n['city'] = c
gap_v = [n['id'] for n in out['nodes'] if n.get('city') and n['city']['edm'] and not (n['city']['van'] or n['city']['both'])]
gap_e = [n['id'] for n in out['nodes'] if n.get('city') and n['city']['van'] and not (n['city']['edm'] or n['city']['both'])]
out['city_gaps'] = {'van': gap_v, 'edm': gap_e}
print('city gaps: no Vancouver source', len(gap_v), '· no Edmonton source', len(gap_e))
json.dump(out, open(os.path.join(here, 'diagram_data.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
dangling = [e for e in edges if not any(n['id'] == e['from'] for n in nodes)]
print('nodes', len(nodes), 'edges', len(edges), 'conditions', len(conds), 'dangling', dangling)
missing_ex = [n['id'] for n in nodes if n['id'] not in EX['values']]
print('example covers', len(EX['values']), 'of', len(nodes), '; without example value:', len(missing_ex))
