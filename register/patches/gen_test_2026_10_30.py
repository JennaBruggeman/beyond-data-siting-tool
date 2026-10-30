"""30 Oct 2026: J.B. 'data center operators have to test generators monthly'. Source found (check 1, Claude): a fire department summary of CSA C282."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]; D = '30 Oct 2026'
K = 'weyburnC282'
TXT = ("SECONDARY (fire department summary of a paywalled standard): Weyburn Fire Department, 'Emergency Power Systems Requirements' (undated; posted Apr 2024 ?), citing CSA C282 'Emergency Electrical Power Supply for Buildings': "
       "'The emergency electrical power shall be thoroughly tested monthly', running the set at 'at least 30% of the rated load for 60 minutes' with transfer switches operated under load; an annual 2-hour full-load test; weekly tests for health-care facilities. "
       "Applies to emergency (life-safety) power systems; whether a data centre's standby generators for IT load fall under C282 is not stated (?; Vancouver bulletin 2000-015 points emergency generator rooms to C282). "
       "CSA C282 itself not read (paywalled) — https://weyburn.ca/wp-content/uploads/2024/04/Emergency-Power-Systems-Requirements.pdf")
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; d = json.loads(p.read_text()); S = d['new_sources'] if pretty else d['sources']; S[K] = TXT
    if pretty:
        m = d['meta']; m['source_kinds'][K] = 'municipal summary of a standard'; m['source_check'][K] = 'claude'
        L = m['check_log'].setdefault(K, [])
        if not any(c.get('date') == D for c in L): L.append({'check': 1, 'by': 'Claude', 'date': D, 'where': 'Weyburn PDF via WebFetch', 'what': 'monthly test, 30% load 60 min, annual 2 h, scope'})
        q = next(q for q in d['quantities'] if q['id'] == 'generator_sets')
        if K not in q['sources']: q['sources'].append(K)
        if not any(x['id'] == K for x in q.setdefault('source_roles', [])): q['source_roles'].append({'id': K, 'term': 'testing: monthly at ≥30% load for 60 min (emergency power, C282 via summary)', 'role': 'check', 'conf': 50, 'verified': True})
        add = '; testing (check 1, 30 Oct 2026): emergency power systems are tested monthly at ≥30% of rated load for 60 min and yearly for 2 h at full load (CSA C282, via a fire department summary; whether IT standby sets fall under C282 ?)'
        if 'weyburnC282' not in q['coef']: q['coef'] += add + ' (weyburnC282)'
    else:
        q = d['quantities'].get('generator_sets')
        if q and K not in q['sources']: q['sources'].append(K); q['coef'] += '; testing: monthly at ≥30% load for 60 min, yearly 2 h full load (CSA C282 via summary; IT standby sets ?) (weyburnC282)'
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, 'ok')
