"""Source sweep group D (J.B. 27 Oct 2026): sources no part or card uses. Six archived (moved to 'archived_sources' with a reason, not deleted);
five kept for coming work (greenhouse, fish farm, Quebec precedent, wastewater, Danish heat-pump network). No values change."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
WHY = {'roudbari2025': 'not found in the sweep; unused', 'socci2024': 'not found in the sweep; unused', 'zhang2025': 'unreachable in the sweep; unused',
       'rlcAUC2021': 'secondary law-firm summary; superseded by the AUC report itself (aucDSI2021)', 'rts19744p4': 'unused; I-1A rezoning precedent, kept on file',
       'parklandLUB': 'unused; Parkland County is outside the tool'}
reg = R / 'register/formula_register.json'; r = json.loads(reg.read_text())
op = R / 'tool/opps.json'; o = json.loads(op.read_text())
used = json.dumps(r['quantities']) + json.dumps(r['conditions']) + json.dumps(o['opportunities']) + json.dumps(o['addons'])
arch = r.setdefault('archived_sources', {})
for i, why in WHY.items():
    assert f'"{i}"' not in used, i
    for d in (r['new_sources'], r['old_sources']):
        if i in d: arch[i] = {'citation': d.pop(i), 'why': why, 'date': '2026-10-27'}
    o['sources'].pop(i, None); o.get('source_kinds', {}).pop(i, None); o.get('source_check', {}).pop(i, None)
reg.write_text(json.dumps(r, ensure_ascii=False, indent=1)); op.write_text(json.dumps(o, ensure_ascii=False, separators=(',', ':')))
print('archived', len(WHY))
