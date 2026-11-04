"""3 Nov 2026: Cologix VAN1 spec sheet (VAN1.042026.R4), uploaded by J.B. Operator claim. Matches the Apr 2026 sheet figure (400 kW); web page said 520 kW (both kept)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
k = 'arch_inv_cologixVan1Sheet2026'
S[k] = ("OPERATOR CLAIM: Cologix, VAN1 Spec Sheet, VAN1.042026.R4 (file named May 2026), uploaded by J.B. 3 Nov 2026: 555 West Hastings Street; "
        "'Site Capacity 400 kW' (web page 520 kW, arch_inv_cologixVan1Web: conflict kept); 'Site Type Cologix is a tenant'; 'DC Space 5K SQFT across 2 suites'; "
        "'Building Office building; concrete and brick; seismic zone 4; outside of flood plain'; 'Cooling N+1 chilled water cooling, N+1 dry cooler (985), N+1 IRC'; "
        "'Fire Suppression Dual interlocked pre-action dry pipe'; 'Generator + UPS N/N+1 Generator/UPS'; 'Power Usage Effectiveness (PUE) 1.2'; "
        "'Meet-Me-Room (MMR) 3, controlled by landlord'; '13 diverse paths of building fiber' — local upload (not in repo)")
m['source_kinds'][k] = 'operator claim'; m['source_check'][k] = 'claude'
cl = m['check_log'].setdefault(k, [])
if not any(c.get('check') == 1 for c in cl):
    cl.append({'check': 1, 'by': 'Claude', 'date': '3 Nov 2026', 'where': 'pdftotext of the uploaded PDF, pp. 1-2', 'what': 'all quotes read from the text layer'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
