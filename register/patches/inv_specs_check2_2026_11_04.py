"""4 Nov 2026 (night brief part 4): independent check 2 of the facility spec sources.
26 arch_inv2_* ids (inv_specs_sources.json) and the 11 J.B.-upload spec-sheet ids. Result: checks/research_arch_v1/checkV2_result_inv_specs.json.
Web pages re-read by fetch; sheets re-read by pdftotext of the uploads; CWH page from J.B.'s screenshots plus the live page.
Corrections (WRONG at check 2): arch_inv2_bcucG15512 applicant is FortisBC, not FortisAlberta; arch_inv2_bcucC113Pages page numbers
(1,400 kW quote is Appendix A p. 15, not p. 6; adjacency quote is p. 6, not p. 7). Three sources UNREACHABLE (fetch refused the URL):
arch_inv2_equinixVa1Spec, arch_inv2_aucD30518, arch_inv2_iaac90123 — check 2 logged as not done for them.
Note: inv_specs_2026_11_03.py copies inv_specs_sources.json over the register text; it must not be re-run after this patch."""
import json, pathlib
from _licensed import clean  # 11 Nov 2026: loaded checks/ files pass the licensed-text guard
R = pathlib.Path(__file__).resolve().parents[2]
F = 'checks/research_arch_v1/checkV2_result_inv_specs.json'
res = clean(json.load(open(R / F)))
D = '4 Nov 2026'
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
n_log = n_fix = 0
for k, r in res.items():
    if k.startswith('_'): continue
    assert k in S, k
    v = [c['verdict'] for c in r['claims']]
    wrong = v.count('WRONG'); nf = v.count('NOT FOUND'); un = v.count('UNREACHABLE')
    if un: what = 'not done: source UNREACHABLE (fetch refused the URL); J.B. to open it or upload a copy'
    elif wrong or nf: what = f'{wrong} quote(s) wrong, {nf} not found; corrected; see {F}'
    else: what = f'ok: {len(v)} figures re-found in the source'
    if r.get('new_text') and S[k] != r['new_text']:
        S[k] = r['new_text']; n_fix += 1
    if r.get('kind_change'): m['source_kinds'][k] = r['kind_change']
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('check') == 2 and c.get('date') == D for c in cl):
        cl.append({'check': 2, 'by': 'Claude (independent agent, no part in check 1)', 'date': D, 'where': r['where_read'][:200], 'what': what}); n_log += 1
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('logged', n_log, 'texts fixed', n_fix)
