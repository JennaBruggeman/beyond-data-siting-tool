"""30 Oct 2026, J.B.: 'leave the vertiv its fine, its a public guide. yes to the rest' / 'as suggested' — decisions 1–16 of checks/check2/check2_decisions_2026-10-30.md applied.
(17 Vertiv guide: kept, J.B. says it is public. 18 I-3 ground floor: read in two drafts, see i3_ground_2026_10_30.py.)"""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]; D = '30 Oct 2026'; TAG = f' [decision {D}]'
def coef_add(q, txt):
    if txt not in q['coef']: q['coef'] += '; ' + txt + TAG
def role(q, sid, new):
    for x in q.get('source_roles', []):
        if x['id'] == sid and x.get('role') != new: x['relabel'] = f"{D} (J.B. decision): {x.get('role')} → {new}"; x['role'] = new
def fix(d, pretty):
    Q = {q['id']: q for q in d['quantities']} if pretty else d['quantities']
    # 1 shadow, 2 light, 3 low-frequency, 4 Edmonton noise, 5 Alberta rainwater, 6 BC 150 MW: benchmark/context, labelled
    coef_add(Q['shadow'], "Vancouver's solar-access guideline protects downtown parks, plazas and sidewalks only: used as a benchmark for these sites, not a rule")
    coef_add(Q['light_at_window'], "VBBL 10.2.2.10 (4 / 2 lux) covers residential buildings only: a benchmark for a data centre, not a rule")
    coef_add(Q['lf_flag'], "worth checking, no rule: Vancouver's dBC limits cover amplified sound only, and AUC Rule 012 covers power plants and substations (benchmark)")
    coef_add(Q['noise_limit'], "Edmonton: AUC Rule 012 is for power plants and substations, used as a benchmark; the City's own noise bylaw still to be read (?)")
    coef_add(Q['rainwater'], "Alberta's rainwater guideline is written for houses: a benchmark for a data centre")
    coef_add(Q['electricity_price'], "BC's over-150 MW full-cost rule is stated for industrial customers on the North Coast line; data centres not named: context, not a rule for the Vancouver site")
    coef_add(Q['grid_headroom'], "BC's over-150 MW rule: context only (industrial, North Coast)")
    # 7 Metro Vancouver engines, 8 Vancouver test exemption
    coef_add(Q['generator_nox_pm'], "Metro Vancouver Bylaw 1329: no Tier 0/1 engines within 100 m of hospitals, schools and day cares; the sets the tool draws are EPA Tier 2 (maker claim), so not barred; shown with the generators")
    coef_add(Q['genset_test'], "Vancouver Noise By-law s. 4.1(c): a test is exempt from the noise limits at most once a month, daytime, up to 60 min, plus once a year up to 180 min, at no more than 80 dBA")
    # 9 Alberta fire flow
    if 'fire_water' in Q: coef_add(Q['fire_water'], "Edmonton: NBC(AE) 3.2.5.7.(1) — for buildings over 3 storeys or 600 m², municipal supply at least 3,800 L/min at 140 kPa, or an on-site volume by formula")
    # 10 electrical room 1 h even when sprinklered
    coef_add(Q['electrical_room'], "corrected: a code-required electrical service room is drawn with a 1 h fire separation whether or not the storey is sprinklered (check 2; the safer reading)")
    # 11 VAN2 out of the hall-density range; 12 VAN4 4–6.5 MW
    for qid in ('size_fit', 'hall_area'):
        if qid in Q: coef_add(Q[qid], "Cologix VAN2 (≈619 m² per MW) dropped: its 2 MW is site capacity, not IT load; the range is unchanged, VAN5 (≈627) sets the top")
    coef_add(Q['it_load_claim'], "Cologix VAN4: 4–6.5 MW (two Cologix pages disagree)")
    # 13 heat price ceiling on hot-water tiers
    coef_add(Q['price_ceiling'], "Creative Energy (Calgary, BCUC… G-5-26 ?) ceiling uses its hot-water tiers: $56.28–33.44 per MWh, not $66.6–39.6 (steam), since a data centre sells hot water")
    # 14 AESO list
    coef_add(Q['grid_headroom'], "AESO connection list: 40 data-related projects, 19,789 MW requested (saved extract); the 56 / 23,549 MW figure could not be found")
    # 15 fourth future, 16 afterlife both views
    if 'futures' in Q: coef_add(Q['futures'], "three futures from the learning series; the fourth is our addition, labelled so")
    for qid in ('afterlife', 'existing_building'):
        if qid in Q: coef_add(Q[qid], "both views shown, dated: UK valuation note 2017 'not readily adaptable'; 2026 note: such buildings can take another use")
    if pretty:
        role(Q['rainwater'], 'abRainwater2010', 'benchmark'); role(Q['electricity_price'], 'bcIEAF', 'context'); role(Q['grid_headroom'], 'bcIEAF', 'context')
        role(Q['lf_flag'], 'rule012', 'benchmark'); role(Q['genset_test'], 'bylaw6555', 'rule') if any(x['id']=='bylaw6555' for x in Q['genset_test'].get('source_roles',[])) else None
        role(Q['genset_test'], 'mvBylaw1329', 'rule'); role(Q['generator_nox_pm'], 'mvBylaw1329', 'rule')
        if not any(x['id'] == 'bylaw6555' for x in Q['genset_test'].get('source_roles', [])):
            Q['genset_test'].setdefault('source_roles', []).append({'id': 'bylaw6555', 'term': 'test exemption: monthly, daytime, ≤60 min, ≤80 dBA', 'role': 'rule', 'conf': 70, 'verified': True})
            if 'bylaw6555' not in Q['genset_test']['sources']: Q['genset_test']['sources'].append('bylaw6555')
        if 'fire_water' in Q and 'nfcAB2023_5635' not in Q['fire_water']['sources']: Q['fire_water']['sources'].append('nfcAB2023_5635')
        for x in Q['price_ceiling'].get('source_roles', []):
            if x['id'] == 'ceG526': x['term'] = 'Creative Energy hot-water tiers $56.28 / $33.44 per MWh'
        for x in Q['grid_headroom'].get('source_roles', []):
            if x['id'] == 'aesoList': x['term'] = '40 data-related projects, 19,789 MW requested'
        sz = Q.get('size_fit')
        if sz:
            sz['sources'] = [s for s in sz['sources'] if s != 'cologixVAN2web'] if 'cologixVAN2web' in sz['sources'] else sz['sources']
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; d = json.loads(p.read_text()); fix(d, pretty)
    if not pretty:
        for q in d['quantities'].values():
            if 'sources' in q and 'bylaw6555' not in q['sources'] and q is d['quantities'].get('genset_test'): q['sources'].append('bylaw6555')
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, 'ok')
