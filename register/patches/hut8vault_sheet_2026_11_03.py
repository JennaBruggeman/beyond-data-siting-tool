"""3 Nov 2026: Hut 8 Canada, Vancouver Vault (VAN1) spec sheet, as at Q3 2026, uploaded by J.B. Operator claim. Gives 900 W Hastings St (settles the address)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
k = 'arch_inv_hut8VaultSheet2026'
S[k] = ("OPERATOR CLAIM: Hut 8 Canada, Vancouver Vault Data Center (VAN1) spec sheet, 'Specifications as at Q3 2026', uploaded by J.B. 3 Nov 2026: '900 W Hastings Street, Vancouver, BC'; "
        "'Designed power 1 MW'; '4,155 sq ft white space (≈ 386 m²), 6,210 sq ft total'; 'Built for the Bank of Canada', 'Acquired by Hut 8 in 2022'; "
        "'4.5 ft steel-reinforced walls, solid concrete floors', '1 m thick ceilings'; 'Generator 600 kW, >48 h at full load'; 'UPS 560 kW, N+1'; "
        "'5 × 50-tonne chillers (N+1), chilled-water closed loop, in-row cooling'; 'Hot aisle containment, 693 kW IT load at capacity'; '1.3 target PUE' (design target); "
        "'Energy source Majority renewable hydroelectricity'; 'Tier I designed'; 'Failover Hut 8 Kelowna (KEL1)' — local upload (not in repo)")
m['source_kinds'][k] = 'operator claim'; m['source_check'][k] = 'claude'
cl = m['check_log'].setdefault(k, [])
if not any(c.get('check') == 1 for c in cl):
    cl.append({'check': 1, 'by': 'Claude', 'date': '3 Nov 2026', 'where': 'pdftotext of the uploaded PDF, pp. 1-2', 'what': 'all quotes read from the text layer'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
