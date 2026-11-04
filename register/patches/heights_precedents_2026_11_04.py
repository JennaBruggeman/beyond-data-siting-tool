"""4 Nov 2026: floor-to-floor and clear heights from precedents and guides (checks/research_arch_v1/heights_precedents.md,
heights_precedents_sources.json, ids arch_hp_*). Check 1 by the research agent (WebFetch summaries). Check 2 by an independent agent
(checks/research_arch_v1/checkV2_result_heights_precedents.json): every quoted figure re-found; no WRONG or NOT FOUND; three wording fixes
(VA OPC 'every plate that states a height'; NEU Table 2 thresholds are net floor area; FAO pump quote p. 29–30 ?)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
A = R / 'checks/research_arch_v1'
F = 'checks/research_arch_v1/checkV2_result_heights_precedents.json'
D = '4 Nov 2026'
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
src = json.load(open(A / 'heights_precedents_sources.json')); res = json.load(open(R / F))
FIX = {
 'arch_hp_vaOPC2009': ("every room plate (", "every plate that states a height ("),
 'arch_hp_vanNEUConn2020': ("Table 2 minimum room 20 × 10 ft (6 × 3 m) for buildings <13,940 m²", "Table 2 minimum room 20 × 10 ft (6 × 3 m) for buildings <13,940 m² net floor area"),
 'arch_hp_faoRAS2022': ("p. 29 pump", "p. 29–30 ? pump"),
}
def kind(k, v):
    u = v.upper()
    bench = 'benchmark' in v[:80].lower() or 'US ' in v[:60] or 'UK ' in v[:60]
    if u.startswith('STAFF') or u.startswith('MUNICIPAL'): return 'government'
    if u.startswith('DESIGN GUIDE'): return 'design guide (benchmark, outside Canada)'
    if u.startswith('INTERGOVERNMENTAL'): return 'government (benchmark, outside Canada)'
    if u.startswith('GOVERNMENT'): return 'government (benchmark, outside Canada)' if bench else 'government'
    return 'named in our notes, not yet checked'
n = 0
for k, v in src.items():
    if k.startswith('_'): continue
    if k in FIX and FIX[k][0] in v: v = v.replace(*FIX[k])
    if k not in S: n += 1
    S[k] = v; m['source_kinds'][k] = kind(k, v); m['source_check'][k] = 'claude'
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('check') == 1 for c in cl):
        cl.append({'check': 1, 'by': 'Claude (research agent)', 'date': D, 'where': 'checks/research_arch_v1/heights_precedents.md (WebFetch summaries)', 'what': 'figures quoted in the source entry'})
    r = res.get(k)
    if r and not any(c.get('check') == 2 for c in cl):
        b = [c for c in r['claims'] if c['verdict'] in ('WRONG', 'NOT FOUND')]
        fx = [c for c in r['claims'] if c.get('fix')]
        what = (f"ok: {len(r['claims'])} claims re-found" if not b else f"{len(b)} claim(s) wrong or not found") + (f"; {len(fx)} wording fix(es) applied" if fx else '') + f"; see {F}"
        cl.append({'check': 2, 'by': 'Claude (independent agent, no part in check 1)', 'date': D, 'where': r['where_read'][:200], 'what': what})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('new sources', n)
