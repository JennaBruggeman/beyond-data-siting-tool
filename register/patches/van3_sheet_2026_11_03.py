"""3 Nov 2026: Cologix VAN3 spec sheet (May 2026), uploaded by J.B. Operator claim; conflicts with the web page (5 MW) on site capacity: both kept."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
k = 'arch_inv_cologixVan3Sheet2026'
S[k] = ("OPERATOR CLAIM: Cologix, VAN3 Spec Sheet, VAN3.E.052026.R3 (May 2026), uploaded by J.B. 3 Nov 2026: "
        "'Site Capacity 3 MW' (web page read 2 Nov 2026 says 5 MW, arch_inv_cologixVan3Web: conflict kept); 'DC Space 42K SQFT'; "
        "'Site Type 2-story building'; 'Building Concrete and brick; seismic zone 4; outside of flood plain'; 'Data Halls 2'; "
        "'Cooling N+1, Air-cooled chillers'; 'Fire Suppression In-room cross zoned VESDA with nitrogen dry-pipe, pre-action system'; "
        "'Fuel Storage 48 hours'; 'Generator + UPS 4 to make 3'; 'Up to 20 kW per cabinet'; 'Power Usage Effectiveness (PUE) 1.29'; "
        "'K-rated perimeter fence'; 'Security Personnel 24/7/365'; 'Meet-Me-Rooms (MMRs) 2' — local upload (not in repo)")
m['source_kinds'][k] = 'operator claim'; m['source_check'][k] = 'claude'
cl = m['check_log'].setdefault(k, [])
if not any(c.get('check') == 1 for c in cl):
    cl.append({'check': 1, 'by': 'Claude', 'date': '3 Nov 2026', 'where': 'pdftotext of the uploaded PDF, pp. 1-2', 'what': 'all quotes read from the text layer'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
