# 15 Oct 2026: NRCan municipal PV potential (J.B. download, data/raw/nrcan) and the AUC Distribution System Inquiry
# final report (read by Claude from media.auc.ab.ca in the in-app browser). Idempotent. Run after add_precedents.py.
import json, os, csv
h = os.path.dirname(os.path.abspath(__file__))
P = os.path.join(h, '..', 'formula_register.json')
r = json.load(open(P, encoding='utf-8'))
m = r['meta']

rows = list(csv.reader(open(os.path.join(h, '..', '..', 'data', 'raw', 'nrcan', 'municip_potentiel-potential.csv'), encoding='latin-1')))
cols = ['vertical', 'latitude', 'lat+15', 'lat-15', 'tracking', 'horizontal']
A = {}
for x in rows[3:]:
    if len(x) > 8 and x[2].startswith('Annual') and x[1] in ('Vancouver', 'Edmonton', 'Spruce Grove'):
        A[x[1]] = dict(zip(cols, map(int, x[3:9])))
assert set(A) == {'Vancouver', 'Edmonton', 'Spruce Grove'}, A
json.dump(A, open(os.path.join(h, '..', '..', 'data', 'nrcan_pv_annual.json'), 'w'), indent=1)
V, E = A['Vancouver'], A['Edmonton']

r['new_sources'].update({
 'nrcanPVmunic': 'NRCan, Photovoltaic potential and solar resource maps of Canada — municipal values (CSV, J.B. download 15 Oct 2026; Canadian Forest Service with CanmetENERGY; CERES 1974–1993 insolation, 144 stations; performance ratio 0.75; "within about 10%%" of lifetime averages). Annual kWh/kWp — Vancouver: horizontal %d, latitude tilt %d, vertical %d; Edmonton: horizontal %d, latitude tilt %d, vertical %d; Spruce Grove (proxy for Parkland County / Acheson): horizontal %d, latitude %d — https://natural-resources.canada.ca/energy-sources/renewable-energy/photovoltaic-potential-solar-resource-maps-canada' % (V['horizontal'], V['latitude'], V['vertical'], E['horizontal'], E['latitude'], E['vertical'], A['Spruce Grove']['horizontal'], A['Spruce Grove']['latitude']),
 'aucDSI2021': 'AUC, Distribution System Inquiry — Final Report, Proceeding 24116, 19 Feb 2021 (read by Claude 15 Oct 2026): p. 60 "The question arose during the inquiry whether any regulatory oversight was required of EV charging stations that provide public access to charging services. Most parties were of the view that no additional regulatory oversight is required at this time"; p. 68 "most parties agree that EV charging stations, similar to electricity storage, are not defined clearly in legislation and their regulatory status within the evolving electricity system is unclear"; p. 69 no party suggested charging owners have "any significant monopolistic advantages" — https://media.auc.ab.ca/prd-wp-uploads/2021/12/24116_X_Distribution-System-Inquiry-Final-Report_000839.pdf',
})

for q in r['quantities']:
    if q['id'] == 'pv_roof':
        q['coef'] = ('yield, annual kWh/kWp (NRCan municipal values, ±10%%, losses in a 0.75 performance ratio): Vancouver %d horizontal to %d at latitude tilt; Edmonton %d to %d. '
                     'A flat-roof array at about 15° tilt lies between the two, so the tool uses horizontal as the low end and latitude tilt as the high end. Edmonton yields about 6–24%% more than Vancouver per kWp. '
                     'Module density 0.16 kWp/m² (2014 median) to 0.20 (current) (NREL); module cover 0.70 of a flat roof at 15° tilt; 66%% of large roofs suitable (NREL 2016); roof share taken by plant from the cooling module') % (V['horizontal'], V['latitude'], E['horizontal'], E['latitude'])
        q['sources'] = ['nrcanPVmunic', 'nrel_rooftop2016', 'nrel_bench2023', 'vanRoofBulletin2022', 'edmZB510']
        q['source_roles'] = [{'id': 'nrcanPVmunic', 'term': 'annual yield by orientation', 'role': 'coefficient', 'conf': 80, 'verified': True}] + [x for x in q.get('source_roles', []) if x['id'] not in ('nrcan_pv2006', 'nrcanPVmunic', 'edmZB510')] + [{'id': 'edmZB510', 'term': 'Edmonton collector projection rules', 'role': 'rule', 'conf': 90, 'verified': True}]
        q['conf'] = 70; q['status'] = 'in hand (NRCan municipal values, 15 Oct 2026)'
    if q['id'] == 'pv_facade':
        q['formula'] = 'MWh = south facade area × module density × vertical yield'
        q['coef'] = ('vertical (south-facing, 90°) yield, annual kWh/kWp: Vancouver %d, Edmonton %d (NRCan municipal values). Vertical gives %d%% of the latitude-tilt yield in Vancouver and %d%% in Edmonton; '
                     'in Edmonton a south wall yields more than a flat roof (%d vs %d), because of low winter sun. Replaces the interim 0.4–0.6 factor. No Canadian BIPV cost found') % (V['vertical'], E['vertical'], round(100 * V['vertical'] / V['latitude']), round(100 * E['vertical'] / E['latitude']), E['vertical'], E['horizontal'])
        q['sources'] = ['nrcanPVmunic', 'ieapvps_bipv']
        q['source_roles'] = [{'id': 'nrcanPVmunic', 'term': 'vertical yield', 'role': 'coefficient', 'conf': 80, 'verified': True}, {'id': 'ieapvps_bipv', 'term': 'context', 'role': 'check', 'conf': 50, 'verified': True}]
        q['conf'] = 70; q['status'] = 'in hand (NRCan vertical values, 15 Oct 2026)'
    if q['id'] == 'ev_exemption':
        q['formula'] = 'BC: exempt from UCA Part 3 (MO M104, 2019; G-66-19). Alberta: no rule yet — the AUC found parties agreed EV charging is "not defined clearly in legislation" and that its status is "unclear"; most saw no need for more oversight (AUC Distribution System Inquiry, 2021)'
        q['sources'] = ['m104', 'aucDSI2021']
        q['source_roles'] = [{'id': 'm104', 'term': 'BC exemption', 'role': 'rule', 'conf': 90, 'verified': True}, {'id': 'aucDSI2021', 'term': 'Alberta: status unclear, no added oversight (pp. 60, 68–69)', 'role': 'rule', 'conf': 90, 'verified': True}]
        q['status'] = 'both cities confirmed from primary sources'

for L in m['opportunity_labels'].values():
    if isinstance(L['rules'], list):
        for x in L['rules']:
            if x['rung'] == 'Utility rules' and 'm104' in x.get('sources', []):
                x['edm'] = ['no_rule', 'not defined clearly in legislation; status unclear; most parties saw no need for more oversight (AUC Distribution System Inquiry, 2021, pp. 60, 68)']
                x['sources'] = ['m104', 'aucDSI2021']
json.dump(r, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('PV', A)
