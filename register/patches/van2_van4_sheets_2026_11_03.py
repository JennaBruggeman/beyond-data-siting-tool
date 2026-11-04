"""3 Nov 2026: Cologix VAN2 and VAN4 spec sheets, uploaded by J.B. Operator claims."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
new = {
 'arch_inv_cologixVan4Sheet2026': ("OPERATOR CLAIM: Cologix, VAN4 Spec Sheet, VAN4.E.052026.R2 (May 2026), uploaded by J.B. 3 Nov 2026: 175 West Cordova Street; 'Site Capacity 6.5 MW'; "
   "'Site Type Leased building, single tenant'; 'DC Space 40K SQFT'; 'Building 4-story concrete frame'; 'Multiple data halls per floor'; "
   "'Cooling Pumped refrigerant and air-cooled chilled water'; 'Fire Suppression Dual interlock pre-action with Nitrogen (N2) VESDA'; 'Fuel Storage 24 hours'; "
   "'Generator + UPS 5-to-make-4, distributed redundant'; 'Load Design 6-8 kW per cabinet'; 'Power Usage Effectiveness (PUE) 1.5'; 'Dual-diverse MMRs'; "
   "'6 unique network providers' — local upload (not in repo)"),
 'arch_inv_cologixVan2Sheet2026': ("OPERATOR CLAIM: Cologix, VAN2 Spec Sheet (May 2026), uploaded by J.B. 3 Nov 2026: 1050 West Pender Street; 'Site Capacity 2 MW'; "
   "'Site Type Multi-tenant office tower'; 'DC Space 15K SQFT'; 'Building Office tower; concrete and brick; seismic zone 4; outside of flood plain'; 'Data Halls 3 suites'; "
   "'Cooling N+1, efficient heat management through ceiling plenum'; 'free cooling' chimney cabinets; 'Fire Suppression In-room, cross-zoned VESDA/Dual interlocked pre-action dry-pipe'; "
   "'Fuel storage 6,000 liters'; 'Generator + UPS 1 power entrance facility/N+1 UPS and Generator'; 'Power Usage Effectiveness (PUE) 1.25' — local upload (not in repo)"),
}
for k, v in new.items():
    S[k] = v; m['source_kinds'][k] = 'operator claim'; m['source_check'][k] = 'claude'
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('check') == 1 for c in cl):
        cl.append({'check': 1, 'by': 'Claude', 'date': '3 Nov 2026', 'where': 'pdftotext of the uploaded PDF, pp. 1-2', 'what': 'all quotes read from the text layer'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
