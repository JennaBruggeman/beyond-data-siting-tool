"""31 Oct 2026: J.B. 'Don't bother with' the US generator-setback benchmarks (Washington, California). Removed from the register
(kept in checks/research_arch_v1/separations.md as research record) so they are neither shown nor checked."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']
DROP = ['arch_sep_cahsc42301_6', 'arch_sep_carbAtcm93115', 'arch_sep_waEcologyHIA2025', 'arch_sep_ccr2480']
used = json.dumps(d['quantities']) + json.dumps(m.get('opportunity_labels', {})) + json.dumps(m.get('try_menu', {}))
for k in DROP:
    assert k not in used, k
    d['new_sources'].pop(k, None)
    for t in ('source_kinds', 'source_check', 'check_log'): m.get(t, {}).pop(k, None)
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('removed', len(DROP))
