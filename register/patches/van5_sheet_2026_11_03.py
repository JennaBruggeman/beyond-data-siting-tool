"""3 Nov 2026: Cologix VAN5 spec sheet (VAN5.E.062026.R3), uploaded by J.B. Operator claim. 1 MW vs the web page's 1.6 MW: both kept."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
k = 'arch_inv_cologixVan5Sheet2026'
S[k] = ("OPERATOR CLAIM: Cologix, VAN5 Spec Sheet, VAN5.E.062026.R3 (file named May 2026), uploaded by J.B. 3 Nov 2026: 555 West Hastings St; "
        "'Site Capacity 1 MW' (web page 1.6 MW, arch_inv_cologixVan5Web: conflict kept); 'DC Space 10.8K SQFT'; "
        "'Building Multi-story mixed use office building, concrete and brick, seismic zone 4, outside of flood plain'; 'Data Halls 2'; "
        "'Cooling N+1/DX and chilled loop'; 'Fire Suppression In-room cross zoned VESDA with Nitrogen (N2) dry-pipe, pre-action system'; "
        "'Generator + UPS N+1 UPS'; 'Load Design 4 kW'; 'Meet-Me-Rooms (MMR) 4, controlled by landlord'; PUE not stated — local upload (not in repo)")
m['source_kinds'][k] = 'operator claim'; m['source_check'][k] = 'claude'
cl = m['check_log'].setdefault(k, [])
if not any(c.get('check') == 1 for c in cl):
    cl.append({'check': 1, 'by': 'Claude', 'date': '3 Nov 2026', 'where': 'pdftotext of the uploaded PDF, pp. 1-2', 'what': 'all quotes read from the text layer'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
