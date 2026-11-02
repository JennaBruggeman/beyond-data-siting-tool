"""2 Nov 2026 fix pass (J.B.: "go ahead"; spec checks/fix_pass_2026-11-02_SPEC.md).
A. Opportunity triage of 30 Oct 2026 (checks/opportunity_triage_2026-10-30.md; math findings N-01, N-02):
   struck labels and try-menu entries move to meta.dropped_opportunities (record kept); quantities used only by them move to
   meta.dropped_quantities; reserved capacity moves to the rules (power_allocation); engineering-only try-menu entries get tier 'full';
   the two seasonal stores merge into one card; aquaculture is fish only; EV chargers get their own connection.
B. Clear-cut fixes (checks/findings_nearby_opp.md): tes_volume ÷ 0.85, rare_earth roles, ev_stalls DCFC range, missing roles.
C. Calls: boiler 0.85 labelled and sourced; hospital heat (CEUD used, SCIEU for comparison); pipe cost per metre; N-07 not computed.
D. Unsourced audit: van6555zones s. 2.1(b)(ii) row; Edmonton 82.7 mm cites src_fill_ecccEdmCity; service_class power factor band.
Idempotent: safe to run twice."""
import json, pathlib, copy
R = pathlib.Path(__file__).resolve().parents[2]
D = '2 Nov 2026'; WHO = 'J.B. triage 30 Oct 2026'
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']
Q = {q['id']: q for q in d['quantities']}
OL = m['opportunity_labels']; OQ = d['opportunity_quantities']; TM = m['try_menu']
dop = m.setdefault('dropped_opportunities', {})
dq = m.setdefault('dropped_quantities', {})

# ---------- A. struck opportunity labels ----------
STRUCK_L = {
 'Reserved capacity and batteries to the grid': ('28, 29, 30', 'battery room for the grid (28) and UPS batteries to the grid (29) struck; reserved capacity (30) moved to rules: the BC 2026 Call makes curtailment an entry condition (register power_allocation; shown in Energy, Getting connected)'),
 'Backup power for neighbours in a blackout': ('31', 'public-utility law in both provinces; refuge kept (power used on the data centre\'s own property is allowed)'),
 'Cooling for neighbours': ('22', 'only one case, cooling its own equipment, now shut'),
 "Solar on neighbours' roofs": ('27', 'struck'),
 'Grid upgrades shared with neighbours': ('32', 'refund rules exist; no precedent'),
 'Distributed servers as heaters': ('9', 'struck'),
 'Material bank: copper': ('55', 'no city material-bank case; parts return to company supply chains'),
 'Batteries at end of life': ('56', 'large UPS batteries outside BC/AB programs; no local case'),
}
for name, (no, why) in STRUCK_L.items():
    if name in OL or name in OQ:
        dop[name] = {'date': '30 Oct 2026 (applied ' + D + ')', 'by': WHO, 'triage_no': no, 'why': why,
                     'was': OL.pop(name, None), 'quantities': OQ.pop(name, None)}

# ---------- A. struck try-menu entries ----------
STRUCK_T = {'battery': ('28', 'battery room for the grid struck'), 'ups': ('29', 'colocation tenants rely on them; no BC/AB case; ESI excludes existing UPS'),
            'chp': ('35', 'struck'), 'absorption': ('22', 'cooling for neighbours struck'), 'wind': ('38', 'struck'), 'biomass': ('37', 'struck')}
keep = []
for t in TM:
    if t['id'] in STRUCK_T:
        no, why = STRUCK_T[t['id']]
        dop['try_menu:' + t['id']] = {'date': '30 Oct 2026 (applied ' + D + ')', 'by': WHO, 'triage_no': no, 'why': why, 'was': t}
    else:
        keep.append(t)
TM[:] = keep

# ---------- A. merge: seasonal ground store + aquifer store (10, 12) ----------
OLD_SS, NEW_SS = 'Seasonal storage in the ground', 'Seasonal heat store'
if OLD_SS in OL:
    L = OL.pop(OLD_SS); qs = OQ.pop(OLD_SS)
    for rr in L.get('rules', []):
        if rr.get('rung') == 'Ground licence':
            rr['van'] = ['approval', 'boreholes: registered driller; report. Aquifer store: water licence']
            rr['edm'] = ['approval', 'boreholes: setbacks (2018 directive). Aquifer store: Water Act approval or licence']
    L['unknowns'] = L.get('unknowns', []) + ['whether an aquifer lies under the site']
    L['merged'] = f'{D}: seasonal ground store (10) and aquifer heat store (12) merged into one card ({WHO})'
    OL[NEW_SS] = L; OQ[NEW_SS] = qs + (['ates'] if 'ates' not in qs else [])
tb = next((t for t in TM if t['id'] == 'btes'), None); ta = next((t for t in TM if t['id'] == 'ates'), None)
if tb and ta:
    dop['try_menu:ates'] = {'date': '30 Oct 2026 (applied ' + D + ')', 'by': WHO, 'triage_no': '12', 'why': 'merged into try_menu btes (Seasonal heat store)', 'was': copy.deepcopy(ta)}
    tb['name'] = NEW_SS
    tb['quantities'] = ['btes', 'ates']
    tb['status'] = 'screening'  # N-07: btes is not computed by the tool
    tb['rules'] = {'vancouver': 'boreholes as borefield; aquifer store: water licence', 'edmonton': 'boreholes as borefield; aquifer store: Water Act approval or licence'}
    tb['changes'] = ['winter heat ↑', 'land ↑', 'licence time ↑', 'first years weak']
    tb['readiness'] = 'built_elsewhere'
    tb['readiness_basis'] = 'Aquifer store: Equinix Amsterdam with the University of Amsterdam (RVO). Borehole store with data-centre heat: studies only (Stavanger 2023; Li et al. 2021).'
    tb['readiness_sources'] = list(dict.fromkeys(tb.get('readiness_sources', []) + ta.get('readiness_sources', [])))
    tb['merged'] = f'{D}: aquifer heat store merged in ({WHO})'
    TM[:] = [t for t in TM if t['id'] != 'ates']

# ---------- A. aquaculture: fish only ----------
OLD_AQ, NEW_AQ = 'Aquaculture / insects / algae', 'Aquaculture (fish)'
if OLD_AQ in OL:
    L = OL.pop(OLD_AQ); qs = OQ.pop(OLD_AQ)
    gone = 'Algae (Data4, Paris-Saclay) and mealworms (RISE, Sweden) are pilots. '
    dop['Aquaculture: insects and algae'] = {'date': '30 Oct 2026 (applied ' + D + ')', 'by': WHO, 'triage_no': '5', 'why': 'keep fish; drop insects and algae',
                                             'was': {'basis_text': gone.strip(), 'sources': ['data4algae', 'riseMealworm'], 'quantities': ['algae_kg', 'insect_check']}}
    L['basis'] = L['basis'].replace(gone, '')
    L['sources'] = [s for s in L['sources'] if s not in ('data4algae', 'riseMealworm')]
    OL[NEW_AQ] = L; OQ[NEW_AQ] = [q for q in qs if q not in ('algae_kg', 'insect_check')]

# ---------- A. engineering only: rainwater label loses condensate, greywater, blackwater, blowdown recovery ----------
OLD_RW, NEW_RW = 'Rainwater, condensate and water reuse', 'Rainwater and reclaimed water'
if OLD_RW in OL:
    L = OL.pop(OLD_RW); qs = OQ.pop(OLD_RW)
    L['basis'] = L['basis'].replace("Blowdown recovery: Quincy Water Reuse Utility, WA, treats and returns a Microsoft data centre's cooling water since 2021 (US EPA). ", '').replace('Greywater or blackwater for cooling: none found. ', '')
    L['sources'] = [s for s in L['sources'] if s != 'epaQuincy']
    L['rules'] = 'try:rainwater,reclaimed'
    L['engineering_only'] = f'{D} ({WHO}): blowdown recovery, condensate, greywater and blackwater are shown in the engineering (full) template only (try_menu tier "full"); the Quincy precedent stays on try_menu blowdown'
    OL[NEW_RW] = L; OQ[NEW_RW] = qs
ENG = {'greywater': '41', 'blackwater': '42', 'blowdown': '43', 'condensate': '44', 'genset': '36', 'tes': '11', 'ppa': '34'}
for t in TM:
    if t['id'] in ENG:
        t['tier'] = 'full'; t['tier_note'] = f'engineering only ({WHO}, item {ENG[t["id"]]}; applied {D})'
# tes_volume (11) out of the district-heat card; it stays on the engineering-only try_menu 'tes'
k = 'District heat to a network'
if k in OQ: OQ[k] = [q for q in OQ[k] if q != 'tes_volume']

# ---------- A. EV hub (33): chargers on the lot with their own new connection ----------
if 'EV charging hub' in OL:
    L = OL['EV charging hub']; add = f' Here (30 Oct 2026 triage, applied {D}): chargers on the data centre\'s lot with their own new grid connection; the data centre has no spare capacity to set aside.'
    if 'own new grid connection' not in L['basis']: L['basis'] += add
q = Q['ev_stalls']
q['formula'] = 'stalls = P_connection ÷ (SF × P_charger), per MW of the chargers\' own new grid connection (no spare data-centre capacity: J.B. triage 30 Oct 2026, applied 2 Nov 2026); SF 0.5–1 (corrected 18 Oct 2026: SF divides, it does not multiply)'
q['inputs'] = [i for i in q['inputs'] if i != 'spare_capacity']
q['coef'] = q['coef'].replace('DCFC 50–350 kW', 'DCFC 25–400 kW (vanDCFC)')

# ---------- A. reserved capacity (30) → rules ----------
pa = Q['power_allocation']
if 'reserved capacity moved here' not in pa['status']:
    pa['status'] += f'; {D}: reserved capacity moved here from the opportunities ({WHO}, item 30); the curtailment entry condition is shown in Energy, Getting connected'

# ---------- A. quantities used only by struck items ----------
DROPQ = {'backup_neighbours': '31', 'chp_heat': '35', 'community_solar': '27', 'rooftop_solar': '27 (input only to community_solar)',
         'distributed_servers_homes': '9', 'grid_refund': '32', 'absorption': '22', 'ups_flex': '29', 'peak_relief': '28, 29 (inputs battery, ups_flex; feeds nothing)',
         'algae_kg': '5', 'insect_check': '5'}
for k, no in DROPQ.items():
    q = Q.get(k)
    if q: dq[k] = {'date': '30 Oct 2026 (applied ' + D + ')', 'by': WHO, 'why': f'used only by struck items (triage {no})', 'was': q}
d['quantities'] = [q for q in d['quantities'] if q['id'] not in DROPQ]
for q in d['quantities']:
    bad = [i for i in q.get('inputs', []) if i in DROPQ]
    assert not bad, (q['id'], bad)  # nothing kept may still use a dropped part
for oq in OQ.values():
    oq[:] = [i for i in oq if i not in DROPQ]
dc = m.setdefault('dropped_conditions', {})
keepc = []
for c in d['conditions']:
    if c['id'] == 'a_absorption_temp':
        dc[c['id']] = {'date': '30 Oct 2026 (applied ' + D + ')', 'by': WHO, 'why': 'its only part, absorption (cooling for neighbours, 22), was struck', 'was': c}
        continue
    c['quantities'] = [i for i in c.get('quantities', []) if i not in DROPQ and i not in dq]
    keepc.append(c)
d['conditions'] = keepc
Q = {q['id']: q for q in d['quantities']}

# ---------- B. register fixes ----------
q = Q['tes_volume']
q['coef'] = ('169 L/kWh at ΔT 6 K, 34 L/kWh at 30 K (3,600 ÷ (4.18 × ΔT) ÷ 0.85; corrected 2 Nov 2026, N-22: the 0.85 had been left out); '
             'ice ≈ 10.5 kg per kWh (latent heat alone gives 3,600 ÷ 334 = 10.8 ?); usable share 0.85 and tank heights are assumptions; costs too wide to use (IRENA range)')
q['status'] = 'NOT COMPUTED YET: physics; 0.85 usable share our assumption (no source found ?); costs a gap'
q = Q['rare_earth']
q['source_roles'] = [{'id': 'danczak2018', 'term': 'NdFeB 6–19 g (3.5") and 2–6 g (2.5") per HDD; Nd, Pr, Dy shares (Table 6)', 'role': 'proxy', 'conf': 70, 'verified': True,
                      'relabel': '2 Nov 2026 (N-23): role was filed under dell; the figures come from Dańczak 2018; consumer HDDs, so a proxy for data-centre drives'}]
q = Q['receivers_nearby']; have = {r['id'] for r in q['source_roles']}
for sid, term, role, conf in [('bcResCare', 'Vancouver care homes, licensed places', 'data', 80), ('abCCcompliance2026', 'Edmonton continuing-care homes', 'data', 80)]:
    if sid in q['sources'] and sid not in have: q['source_roles'].append({'id': sid, 'term': term, 'role': role, 'conf': conf, 'verified': True, 'added': D})
q = Q['competing_sources']; have = {r['id'] for r in q['source_roles']}
for sid, term, role, conf in [('neuTraced', 'NEU service area (traced from By-law 9552 Sch. A, ±45 m)', 'site fact', 60), ('van9552', 'NEU connection rule and 50% credit', 'rule', 90)]:
    if sid in q['sources'] and sid not in have: q['source_roles'].append({'id': sid, 'term': term, 'role': role, 'conf': conf, 'verified': True, 'added': D})

# ---------- C. boiler efficiency, hospital heat ----------
FILL = ['src_fill_eer2016_317', 'src_fill_nrcanComBoiler', 'src_fill_nrcanFurnace', 'src_fill_nrcanHeatingGas2012']
q = Q['receiver_demand']
q['coef'] = q['coef'].replace(
    'hospitals from SCIEU 2024 (BC 1.90, AB 2.46 GJ/m² total)',
    'hospitals and care homes: the heat search uses CEUD 2023 "Health Care and Social Assistance" (BC 1.096, AB 2.348 GJ/m², heating only, the whole sector); SCIEU 2024 hospitals (BC 1.90, AB 2.46 GJ/m²) is total energy, not heating, shown for comparison only (2 Nov 2026)').replace(
    'delivered fuel, not useful heat (boiler efficiency not yet sourced)',
    'delivered fuel, not useful heat: × 0.85 boiler efficiency, our assumption within NRCan\'s rated range (existing 0.55–0.89, new 0.90–0.98; src_fill_eer2016_317, src_fill_nrcanComBoiler, src_fill_nrcanFurnace, src_fill_nrcanHeatingGas2012; rated, not measured in use ?)')
assert 'SCIEU 2024 hospitals' in q['coef'] and 'our assumption within NRCan' in q['coef'], 'receiver_demand text not matched'
for s in FILL:
    if s not in q['sources']: q['sources'].append(s)
    if not any(r['id'] == s for r in q['source_roles']):
        q['source_roles'].append({'id': s, 'term': 'boiler and furnace efficiency, rated range (0.85 is our point)', 'role': 'bound', 'conf': 95 if s == 'src_fill_eer2016_317' else 85, 'verified': True, 'added': D})

# ---------- C. pipe cost: the per-metre method the tool uses ----------
q = Q['distribution_cost']
if not q['formula'].startswith('cost per metre'):
    q['formula_persson_not_used'] = q['formula'] + ' (Persson; kept as a note, not used by the tool, 2 Nov 2026)'
    q['formula'] = ('cost per metre of trench, DN100: CAD 1,038–2,620 per m (658 € and (160 + 1,500) € per m × 1.5782 CAD/€); other sizes scaled by '
                    '(212 + 4,464 d) ÷ (212 + 446.4); annualised at 5.6 % real over 30 years (factor 0.0696); the tool\'s method since 19 Oct 2026')
    q['status'] = 'per-metre method as the tool uses it (2 Nov 2026, N-06); the Persson formula and the heat_density / linear_heat_density classes are not computed'

# ---------- C. N-07: parts the tool never computes ----------
ARCH = {'refuge_people', 'clean_air_volume', 'cooling_centre_people'}
for k in ['offerable_area', 'refuge_people', 'clean_air_volume', 'cooling_centre_people', 'deprivation', 'stored_heat', 'storage_footprint', 'btes',
          'tes_volume', 'sewage_heat', 'rare_earth', 'homes_heated_2050s', 'competing_sources']:
    q = Q.get(k)
    if not q or q['status'].startswith('NOT COMPUTED YET'): continue
    tail = ' To build with the Architecture mode.' if k in ARCH else ' (networks listed only; other sources per receiver not listed)' if k == 'competing_sources' else ''
    q['status'] = f'NOT COMPUTED YET ({D}):{tail} ' + q['status']

# ---------- D. unsourced audit ----------
S = d['new_sources']
if 'quiet→intermediate/activity/event' not in S['van6555zones']:
    S['van6555zones'] = S['van6555zones'].replace('intermediate→quiet 60 / 50;', 'intermediate→quiet 60 / 50; quiet→intermediate/activity/event 60 day / 55 night (s. 2.1(a)(ii), (b)(ii); src_fill_van6555s21, added 2 Nov 2026);')
assert 'quiet→intermediate/activity/event' in S['van6555zones']
q = Q['noise_limit']
if 'src_fill_van6555s21' not in q['sources']:
    q['sources'].append('src_fill_van6555s21')
    q['source_roles'] = q.get('source_roles', []) + [{'id': 'src_fill_van6555s21', 'term': 'quiet-zone source to a non-quiet neighbour: 55 dBA night', 'role': 'rule', 'conf': 90, 'verified': True, 'added': D}]
q = Q['rainwater']
if '82.7' not in q['coef']:
    q['coef'] = q['coef'].replace('Jun–Aug 213 mm', 'Jun–Aug 213 mm, July 82.7 mm (the tank month; src_fill_ecccEdmCity)')
assert '82.7' in q['coef']
if 'src_fill_ecccEdmCity' not in q['sources']:
    q['sources'].append('src_fill_ecccEdmCity')
    q['source_roles'] = q.get('source_roles', []) + [{'id': 'src_fill_ecccEdmCity', 'term': 'Edmonton (City) July normal 82.7 mm', 'role': 'data', 'conf': 80, 'verified': True, 'added': D}]
q = Q['service_class']
if 'power factor 0.90–1.0' not in q['coef']:
    q['coef'] = q['coef'].replace('power factor taken as 1, so kW = kVA (our assumption ?)',
        'power factor taken as 1, so kW = kVA (our assumption ?); 2 Nov 2026: replaced by a band, MVA = MW ÷ power factor 0.90–1.0 (our band; server power supplies ≥ 0.95, ENERGY STAR Servers v4.0, src_fill_estarServers4; facility value ?)')
assert 'power factor 0.90–1.0' in q['coef']
if 'src_fill_estarServers4' not in q['sources']:
    q['sources'].append('src_fill_estarServers4')
    q['source_roles'] = q.get('source_roles', []) + [{'id': 'src_fill_estarServers4', 'term': 'server PSU power factor ≥ 0.90–0.95', 'role': 'bound', 'conf': 85, 'verified': True, 'added': D}]

m.setdefault('fix_pass_log', {})[D] = 'checks/fix_pass_2026-11-02_SPEC.md; report checks/fix_pass_2026-11-02_DONE.md'
p.write_text(json.dumps(d, ensure_ascii=False, indent=1))
print('labels', len(OL), 'try_menu', len(TM), 'quantities', len(d['quantities']), 'conditions', len(d['conditions']),
      'dropped_opportunities', len(dop), 'dropped_quantities', len(dq))
