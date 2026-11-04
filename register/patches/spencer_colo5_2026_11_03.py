"""3 Nov 2026: Spencer Building Colo5 page (link from J.B.). Operator claim. Confirms the carrier hotel runs a colocation room (Phase 1)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
k = 'arch_inv_spencerColo5'
S[k] = ("OPERATOR CLAIM: Spencer Building, 'Colo5 – Vancouver Carrier Hotel & Data Centre' page, read 3 Nov 2026 (copyright 2026): "
        "'Phase 1, featuring 100kW capacity, has 12 full-size cabinets and 8 quarter cabinets'; '7kW per cabinet', 'Max 10kW per cabinet (requires approval)'; "
        "'N+1 CRAC units with cold aisle containment'; 'Raised floor plenum provides cooling to cold aisle'; 'N+1 UPS with dual zinc battery cabinets'; "
        "'VESDA and Pre-Action'; 'Two-factor access control and HD digital cameras'; '24/7 onsite security patrols'; 'Phase 2 set to roll out in Q1 2025' (status of Phase 2 ?); "
        "Phase 1 'selling out quickly'; space connected to 'MMR5'; address, generators, fuel, PUE, heat reuse not stated — https://spencerbuilding.com/colo5/")
m['source_kinds'][k] = 'operator claim'; m['source_check'][k] = 'claude'
cl = m['check_log'].setdefault(k, [])
if not any(c.get('check') == 1 for c in cl):
    cl.append({'check': 1, 'by': 'Claude', 'date': '3 Nov 2026', 'where': 'page fetched 3 Nov 2026', 'what': 'quotes from the page text'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
