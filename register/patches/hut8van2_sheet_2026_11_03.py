"""3 Nov 2026: Hut 8 Canada, Vancouver Data Center (VAN2) spec sheet, as at Q3 2026, uploaded by J.B. Operator claim. Settles the address: 701 W Georgia."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
k = 'arch_inv_hut8Van2Sheet2026'
S[k] = ("OPERATOR CLAIM: Hut 8 Canada, Vancouver Data Center (VAN2) spec sheet, 'As-built, as at Q3 2026', uploaded by J.B. 3 Nov 2026: '701 West Georgia Street, Vancouver, BC'; "
        "'Designed power 0.6 MW'; '2,900 sq ft total facility (≈ 269 m²)'; '118 tonnes of CRAC cooling (N+1), 329 kW IT load at capacity'; 'Hot aisle containment'; "
        "'2 generators (435 kW total), >24 h at full load'; 'UPS 900 kW per side, double conversion'; '2N UPS'; '1.3 target PUE' (design target); "
        "'Majority renewable hydroelectricity'; 'Tier I designed, commissioned 2015'; 'Failover Hut 8 Kelowna (KEL1)' — local upload (not in repo)")
m['source_kinds'][k] = 'operator claim'; m['source_check'][k] = 'claude'
cl = m['check_log'].setdefault(k, [])
if not any(c.get('check') == 1 for c in cl):
    cl.append({'check': 1, 'by': 'Claude', 'date': '3 Nov 2026', 'where': 'pdftotext of the uploaded PDF, pp. 1-2', 'what': 'all quotes read from the text layer'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
