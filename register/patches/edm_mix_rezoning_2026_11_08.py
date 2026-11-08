"""8 Nov 2026 (J.B.): in Edmonton, the Emergency hub and any typology that mixes a data centre with public uses needs a rezoning: no zone allows both.
A data centre is Major Industrial (register edm_dc_major), permitted only in IH (s. 2.140, 2.1) and EETC (s. 3.52, 2.1). IH lists no Community, Health or Emergency
Service use (permitted uses 2.1-2.11: industrial, utility and sign uses only); EETC's only community use is Special Event (2.3). BE (s. 2.120) allows Community and Health
Service uses but not Major Industrial. Read by Code in J.B.'s Bylaw20001.pdf, 8 Nov 2026 (and J.B.'s note, Claude Link edmonton_data_centre_use_class_2026-11-08.md).
A flag on every Edmonton lot whose typology holds a public program; shown as if rezoned, as the tool's other rezoning flags."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']; m = d['meta']
TAG = ' ‖ 8 Nov 2026 (mix rule)'
add = {'arch_hb_edmIH': "IH s. 2.140 permitted uses (2.1-2.11): Major Industrial; Minor Industrial existing on 1 Jan 2024; Natural Resource Development; Major and Minor Utility; signs. No Community, Health or Emergency Service use (read by Code in J.B.'s Bylaw20001.pdf).",
       'arch_zon_EdmZones': "EETC s. 3.52 permitted uses: Major and Minor Industrial; Special Event (the only community use); utilities, Recycling Drop-off Centre, Transit Facility; signs; discretionary Indoor Self Storage. No Community, Health or Emergency Service use (read by Code in J.B.'s Bylaw20001.pdf)."}
for k, t in add.items():
    if TAG not in S[k]: S[k] += TAG + ': ' + t
if not any(c['id'] == 'r_edm_mix_rezoning' for c in d['conditions']):
    d['conditions'].append({"id": "r_edm_mix_rezoning", "heading": "6 Regulatory", "name": "Edmonton: a data centre with public uses needs a rezoning",
      "test": "Edmonton lot and the typology holds a public program (refuge, shelter, clinic, pool …): no zone allows both, so 'needs rezoning', shown as if rezoned",
      "quantities": ["zoning_status"], "move": ["policy"], "parties": ["operator", "city"], "constraint": True,
      "note": "Major Industrial (every data centre, edm_dc_major) is permitted only in IH and EETC, which list no Community, Health or Emergency Service use; BE allows those uses but not Major Industrial. J.B. 8 Nov 2026: keep BE representative lots, each Edmonton hub is a rezoning variant.",
      "sources": ["edm_dc_major", "arch_hb_edmIH", "arch_zon_EdmZones", "arch_edmZB20001_BE"]})
for q in d['quantities']:
    if q['id'] == 'zoning_status' and TAG not in q['coef']:
        q['coef'] += TAG + ': in Edmonton a data centre with public uses needs a rezoning in every zone (IH and EETC: no Community, Health or Emergency Service; BE: no Major Industrial).'
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('edm mix rezoning')
