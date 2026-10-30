"""30 Oct 2026: the security fence (J.B.: 'one fence in the tool... the type expected of a tier 3 or 4 facility'; secure line on/off).
CHECK 1 only (Claude, 30 Oct 2026); check 2 open."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
D = '30 Oct 2026'
NEW = {
 'rcmpGCPSG009': "GOVERNMENT GUIDE: RCMP Lead Security Agency for Physical Security, Security Fencing Considerations Guide, GCPSG-009 (effective 27 Jan 2022): "
                 "'Fences with a height of 2 meters or less should not be referred to as security fencing as they provide little delay'; 'The minimum height for a security fence should be 2.4 meters'; "
                 "'High security installations should consider fences of at least 3.6 meters' (s. 10.1, p. 10); anti-climb types: small-mesh chain link or welded mesh (½–¾ in.), vertical slat panels (s. 9.5, p. 8); "
                 "setbacks kept clear on both sides (s. 9.1, p. 6); ASTM F2656 for hostile-vehicle mitigation, K-ratings 'now outdated', replaced by M-ratings: M30 (K4) 48 km/h, M40 (K8) 64 km/h, M50 (K12) 80 km/h, "
                 "15,000 lb vehicle, P-ratings for penetration (s. 8.2, pp. 5–6). Guidance, not a code. Read from a copy hosted at grc.ca (official RCMP copy not found ?) — https://grc.ca/sites/default/files/doc/gcpsg-gsmgc-009-eng.pdf",
 'ufc4_022_03': "US GOVERNMENT CRITERIA: UFC 4-022-03, Security Fences and Gates (US Department of Defense, 1 Oct 2013): chain link 'minimum fence fabric height of 7 feet (2.13m), excluding the top guard', "
                "8 ft (2.44 m) with outriggers (s. 2-8, 2-9, p. 22); clear zones 'may be 30 feet (9 m)' outside and '20 feet (6 m)' inside (s. 2-12.1, p. 26); standard gates 'not considered to resist impact by vehicles' (s. 3-4, p. 45). "
                "US military benchmark — https://www.wbdg.org/FFC/DOD/UFC/ufc_4_022_03_2013.pdf",
 'uptimeMyths': "INDUSTRY BODY PAGE: Uptime Institute, 'Tier Myths and Misconceptions': 'The Tier Classification System does not prescribe security provisions'; reinforced perimeter fencing is listed among measures that are best practice 'regardless of Tier' — https://uptimeinstitute.com/myths",
}
KIND = {'rcmpGCPSG009': 'government guide (benchmark)', 'ufc4_022_03': 'US government criteria (benchmark)', 'uptimeMyths': 'industry body web page'}
WHERE = {'rcmpGCPSG009': 'PDF pp. 5–6, 8, 10', 'ufc4_022_03': 'PDF pp. 22, 26, 45', 'uptimeMyths': 'web page'}
ADD = ("; FENCE (30 Oct 2026, J.B.: one fence, the type expected at a Tier III/IV site): Tier III and IV prescribe no security (uptimeMyths), so the fence follows the RCMP's minimum for a security fence: "
       "2.4 m anti-climb welded mesh at the lot line (rcmpGCPSG009 s. 10.1, 9.5; agrees with UFC 4-022-03's 2.44 m, ufc4_022_03); 3.6 m is the RCMP's suggestion for 'high security installations', not used (whether a colocation site counts is not stated ?); "
       "crash rating (ASTM F2656 M30–M50) not drawn; VAN3 fence type not recorded beyond her words 'K gate fence' (tourVAN3); post spacing not sourced (?). The 3D 'Secure line' is on or off")
ROLES = [{'id': 'rcmpGCPSG009', 'term': 'fence height and type', 'role': 'benchmark', 'conf': 60, 'verified': True},
         {'id': 'ufc4_022_03', 'term': 'fence height (cross-check)', 'role': 'check', 'conf': 50, 'verified': True},
         {'id': 'uptimeMyths', 'term': 'Tiers do not set security', 'role': 'check', 'conf': 60, 'verified': True}]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text())
d['new_sources'].update(NEW); m = d['meta']; m['source_kinds'].update(KIND); m['source_check'].update({k: 'claude' for k in NEW})
for k in NEW:
    m['check_log'].setdefault(k, [])
    if not any(c.get('date') == D for c in m['check_log'][k]): m['check_log'][k].append({'check': 1, 'by': 'Claude', 'date': D, 'where': WHERE[k], 'what': 'quotes in the source entry'})
q = next(q for q in d['quantities'] if q['id'] == 'security_layers')
if 'rcmpGCPSG009' not in q['coef']: q['coef'] += ADD
for k in NEW:
    if k not in q['sources']: q['sources'].append(k)
for r in ROLES:
    if not any(x['id'] == r['id'] for x in q['source_roles']): q['source_roles'].append(r)
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
