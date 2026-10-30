"""30 Oct 2026, J.B. 'yes' (start with weights): plant weights from the makers' sheets already in the register, and the code's floor load. Check 1 (Claude)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]; D = '30 Oct 2026'
ADD = {
 'rehlkoKD2000': " WEIGHT AND AIR (check 1, 30 Oct 2026, G5-626 rev 6/24d p. 5 and p. 3): max. weight 40,394 kg (89,054 lb) with Sound Level 2 enclosure, 38,564 kg with SL1; tank capacity 8,577–16,383 L (p. 1; tank per enclosure in G6-154); exhaust flow 443 m³/min at 415 °C; radiator cooling air 2,809 m³/min; combustion air 189 m³/min; exhaust outlet height not given (see ADV drawing ?)",
 'vertivAFC': " WEIGHT (check 1, 30 Oct 2026, SL-71060 R09/24, FIZ table): FIZ135 est. dry weight 13,110 kg (28,900 lb); operating weight with fluid not given (?)",
 'eatonCA022021': " WEIGHT (check 1, 30 Oct 2026, Table 14.1-20 p. 14.1-27): 2,500 kVA 15,500 lb (7,031 kg) with 560 gal (2,120 L) of liquid at 5/15 kV; 18,800 lb (8,528 kg), 730 gal at 25/35 kV",
 'vertivLi5': " WEIGHT (check 1, 30 Oct 2026, SL-71271 R06/26 specifications table): 18-module cabinet 590 kg; floor loading not given",
}
NEW = {'nbc2020_4153': "National Building Code of Canada 2020, Div. B 4.1.5.1.(1) and Table 4.1.5.3 (local copy data/raw/codes/nbc.txt): equipment areas and service rooms, including generator rooms and transformer vaults, minimum specified live load 3.6 kPa, but not less than 'the loads due to the intended use and occupancy' where that is more critical (note 4 → 4.1.5.1.(1)); office floors 2.4 kPa (4.8 at grade). BCBC and NBC(AE) adopt the same article (not re-checked ?)"}
Q = {'id': 'plant_weight', 'name': 'What the plant weighs, and what floor it needs', 'unit': 'kg; kPa', 'stage': 'size', 'conf': 50,
     'status': 'maker weights read (check 1); rack, UPS and thermal-wall weights not found (?); spread loads are our arithmetic, not a structural design',
     'inputs': ['generator_sets', 'cooling_units', 'transformers', 'battery_cabinets'], 'sources': ['rehlkoKD2000', 'vertivAFC', 'eatonCA022021', 'vertivLi5', 'nbc2020_4153'],
     'formula': 'load spread over the unit footprint = weight × 9.81 ÷ (L × W); compared with the code minimum for equipment rooms (3.6 kPa) and office floors (2.4 kPa)',
     'coef': ("2 MW generator in SL2 enclosure 40,394 kg over 13.49 × 3.49 m ≈ 8.4 kPa (rehlkoKD2000); 1.49 MW chiller 13,110 kg dry over 12.14 × 2.36 m ≈ 4.5 kPa, plus its fluid (?) (vertivAFC); "
              "2,500 kVA transformer 7,031–8,528 kg ≈ 12.7 kPa (eatonCA022021); battery cabinet 590 kg over 0.6 × 0.75 m ≈ 12.9 kPa (vertivLi5); code minimum for generator rooms and transformer vaults 3.6 kPa, or the actual load where greater (nbc2020_4153). "
              "All spread loads are our arithmetic; point loads at mounts and vibration not sourced (?)"),
     'source_roles': [{'id': k, 'term': t, 'role': 'coefficient', 'conf': 60, 'verified': True} for k, t in (('rehlkoKD2000', 'generator weight'), ('vertivAFC', 'chiller dry weight'), ('eatonCA022021', 'transformer weight'), ('vertivLi5', 'battery cabinet weight'))] + [{'id': 'nbc2020_4153', 'term': 'floor load minimum', 'role': 'rule', 'conf': 80, 'verified': True}]}
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; d = json.loads(p.read_text()); S = d['new_sources'] if pretty else d['sources']
    for k, a in ADD.items():
        if k in S and 'check 1, 30 Oct 2026' not in S[k].split('‖')[0] and a.strip()[:10] not in S[k]: S[k] += a
    S.update(NEW)
    if pretty:
        m = d['meta']; m['source_kinds']['nbc2020_4153'] = 'code'; m['source_check']['nbc2020_4153'] = 'claude'
        for k in list(ADD) + list(NEW):
            L = m['check_log'].setdefault(k, [])
            if not any(c.get('date') == D and c.get('what', '').startswith('weight') for c in L): L.append({'check': 1, 'by': 'Claude', 'date': D, 'where': 'maker sheet / local code copy', 'what': 'weights, airflows and floor load'})
        if not any(q['id'] == 'plant_weight' for q in d['quantities']): d['quantities'].append(Q)
    else:
        d['quantities']['plant_weight'] = {k: Q[k] for k in ('name', 'formula', 'coef', 'unit', 'sources', 'conf', 'status')}
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, 'ok')
