"""8 Nov 2026 (J.B.; Claude Link register_additions_2026-11-08.md): sources that came in on 7-8 Nov through Cowork, added with the trust levels given.
Read once by Cowork unless noted. The register keeps one entry per document (meta id_aliases): proposed ids that duplicate an existing entry become aliases,
and their new detail is appended to that entry. Sources only a typology spec uses (job F2) hang on one part, typology_spec_rules, status
'spec, not live yet'. Live: VBBL 2025 3.4.2.3 on the plan rule (r_plan_v0), next to NBC 3.4.2.3 (Vancouver's own code)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']; m = d['meta']
D = '8 Nov 2026'; RD = "Read once by Cowork from J.B.'s PDF of the Vancouver Building By-law 2025 (Claude Link register_additions_2026-11-08.md); no second check."
NEW = {
 'vbbl25_3423': f"RULE: Vancouver Building By-law 2025, vol. 1, Div. B 3.4.2.3.(1)-(5): exits apart at least the lesser of half the diagonal and 9 m where served by a public corridor, the greater of half the diagonal and 9 m otherwise; the smoke-travel measure; an exterior stair discharges at least 9 m away (6 m sprinklered, within 15 m of a street). {RD} Trust 90.",
 'vbbl25_3315': f"RULE: Vancouver Building By-law 2025, Div. B 3.3.1.5.(1)(b), (2): a room for more than 60 people needs 2 egress doorways, at least one third of the diagonal apart. {RD} Trust 90. Spec, not live yet (refuge; Emergency hub spec).",
 'vbbl25_3722B': f"RULE: Vancouver Building By-law 2025, Div. B Table 3.7.2.2.-B and 3.7.2.2.(15): water closets for business and personal services; two universal (unisex) rooms for a floor area up to 200 m2 and up to 60 people. {RD} Trust 90. Spec, not live yet (clinic).",
 'vbbl25_3835': f"RULE: Vancouver Building By-law 2025, Div. B 3.8.3.5.(1): ramps at most 1:12, at least 1,000 mm wide, level areas 1,700 mm, a landing at most every 9 m. {RD} Trust 90. Spec, not live yet (step-free entrances).",
 'vbbl25_3831x': f"RULE: Vancouver Building By-law 2025, Div. B 3.8.3.12, 3.8.3.13, 3.8.3.16, 3.8.3.17: accessible water-closet stall, universal washroom, lavatory and shower dimensions. {RD} Trust 90. Spec, not live yet (room minimums).",
 'wsbc_firstAid': "GUIDANCE (regulator web page): WorkSafeBC, 'First aid facilities': a first aid room at least 9.3 m2; a dressing station 4.2 m2 (worded 'should'). Read once by Cowork on the web (Claude Link register_additions_2026-11-08.md). Trust 80 (regulator guidance). Spec, not live yet (room minimums).",
 'rule_roomMinimums': "DECISION (J.B., 8 Nov 2026): Claude Link eh/specs/room_minimums_rule_2026-11-08.md: a six-step ladder for where a room's minimum size comes from; refuge minimum 50 people (J.B.'s count). A decision, not a source: no trust rating (n/a). Spec, not live yet (every typology).",
 'vertivAFC_clear': "MAKER (installer guide): Vertiv Liebert AFC installer guide SL-70790 (c) 2026, s. 4.2.4, Fig. 4.2, p. 37 (J.B.'s screenshot 8 Nov 2026, Claude Link eh/vertiv_AFC_SL-70790_p37_fig4-2.png): clear zones around one unit: 1,500 mm on each long (air-intake) side, 2,100 mm at each end; 2.5 m clear above the fans; avoid hot-air recirculation; unit width 2,350 mm. Spacing between two units not stated: 3.0 m side to side (two 1.5 m zones, not shared) is our reading (?). Trust 50 (maker claim). Spec, not live yet: would replace evapcoLayout2026 for the AFC in the plant layout.",
 'vertivAFC_siting': "MAKER (installer guide): Vertiv Liebert AFC installer guide SL-70790 (c) 2026, s. 4.1-4.2, p. 34 (J.B.'s screenshots, Claude Link eh/vertiv_AFC_SL-70790_p33-34.png, eh/vertiv_AFC_SL-70790_p34-35_fig4-1.png): refrigerant R1234ze, safety group A2L (ASHRAE 34); location class III (open air), access category C, authorized personnel only (ASHRAE 15); away from medium-high voltage power lines (no distance given); at least 5 m (16.4 ft) from drains and manholes, in free airflow; leaked gas is heavier than air and pools below the unit; keep safety distances from openings (no distance given). Fig. 4.1: slab high-point marking only. Trust 50 (maker claim). Spec, not live yet (chiller siting, Emergency hub spec rule 9).",
 'vertivAFC_weights_location': "MAKER (installer guide): Vertiv Liebert AFC installer guide SL-70790 (c) 2026, s. 4.2.3 p. 36 and s. 4.3 Tables 4.1-4.2 p. 38 (J.B.'s screenshots, Claude Link eh/vertiv_AFC_SL-70790_p35-36_location.png, eh/vertiv_AFC_SL-70790_p38_weights.png): outdoors only; level surface that carries the weight; good airflow; clean air, away from loose dirt. Shipping weights FH3 090-175: 19,600-30,750; CH3 120-175: 21,250-25,750 (12-20 fans); unit not printed (likely lb ?); operating weight: consult factory. Trust 50 (maker claim). Spec, not live yet (chiller siting; roof loads: Architecture stays at massing, flag only).",
}
KIND = lambda k: 'rule' if k.startswith('vbbl') else 'decision' if k.startswith('rule_') else 'guidance' if k.startswith('wsbc') else 'maker'
for k, v in NEW.items():
    if k not in S: S[k] = v
    m['source_kinds'][k] = KIND(k)
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('date') == D for c in cl):
        cl.append({'check': 1, 'by': 'Cowork (main chat)', 'date': D, 'where': 'Claude Link register_additions_2026-11-08.md', 'what': 'read once; trust as given'})
# aliases: one entry per document; the new detail appended
TAG = ' ‖ 8 Nov 2026 (register_additions)'
AL = {
 'vbbl25_fcl': ('arch_hb_vbblFlood', "Div. A definitions 'Flood construction level' and 'Designated flood plain': 4.6 m GVRD datum for buildings used for habitation, business or storage of goods; the wave-effect zone may need more; Still Creek has its own levels. Read by Cowork from J.B.'s PDF; trust 90."),
 'edmZB_BE': ('arch_edmZB20001_BE', "BE: height 16.0 m, FAR 1.6, setbacks; Community and Health Service uses at most 500 m2 each; Minor Industrial permitted, Major Industrial not listed. Read by Cowork from J.B.'s PDF; trust 90."),
 'edmZB_IM_IH': ('arch_zon_EdmZones', "Major Industrial: IH s. 2.140 2.1 permitted; IM s. 2.130 2.3 only those existing on 1 Jan 2024. Read by Cowork from J.B.'s PDF and by Code from Bylaw20001.pdf (8 Nov 2026); trust 90."),
 'edmZB_defs': ('arch_pg_edmUseDefs', "s. 8.10 Major and Minor Industrial definitions; data centres not named (Code searched the Bylaw20001.pdf text, 8 Nov 2026: no 'data cent' anywhere). Trust 90."),
 'edm_dcPage': ('edm_dc_major', "same page (proposed id edm_dcPage). Trust 80 (City guidance, not bylaw)."),
 'edm_districtPolicy_2534': ('arch_rz_edmDistrictPolicy', "2.5.3.4: preserve opportunities for medium and heavy industrial development on Commercial/Industrial Employment land. Context only on Municipal card 4 (the 'conversion' reading dropped, J.B. 8 Nov 2026). Read by Cowork from J.B.'s PDF; trust 90."),
}
for a, (k, txt) in AL.items():
    m['id_aliases'][a] = f'{k} (8 Nov 2026: one entry per document)'
    if TAG not in S[k]: S[k] += TAG + ': ' + txt
# live: VBBL 2025 exits on the plan rule
for c in d['conditions']:
    if c['id'] == 'r_plan_v0' and 'vbbl25_3423' not in c.setdefault('sources', []): c['sources'].append('vbbl25_3423')
# spec-only sources: one part, so they show in the logic view
SPEC = ['vbbl25_3315', 'vbbl25_3722B', 'vbbl25_3835', 'vbbl25_3831x', 'wsbc_firstAid', 'rule_roomMinimums', 'vertivAFC_clear', 'vertivAFC_siting', 'vertivAFC_weights_location']
if not any(q['id'] == 'typology_spec_rules' for q in d['quantities']):
    d['quantities'].append({"id": "typology_spec_rules", "name": "Typology spec rules (spec, not live yet)", "stage": "test", "unit": "rules",
      "formula": "rules a typology spec (Claude Link eh/specs/, job F2) will apply once built into the tool: room minimums, egress doorways, washrooms, ramps, first aid room, chiller clear zones and siting. Not computed by the tool yet.",
      "inputs": ["massing"], "coef": "see each source; trust 90 (VBBL 2025 clauses), 80 (WorkSafeBC guidance), 50 (Vertiv installer guide, maker claim), n/a (J.B.'s room-minimums decision)",
      "sources": SPEC, "conf": 50, "status": "spec, not live yet (8 Nov 2026)"})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('register additions', len(NEW), 'new,', len(AL), 'aliases')
