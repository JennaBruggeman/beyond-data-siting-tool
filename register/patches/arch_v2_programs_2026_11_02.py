"""2 Nov 2026: Architecture mode, added programs and systems (J.B. moved the backlog into v1; hospital, housing, seniors' care, sludge drying, cold-water fish and the winter market dropped).
Research: checks/research_arch_v1/{prog_wet,prog_grow,prog_public,prog_housing,sys,fish_species,temps_public}.md and _sources.json.
Texts already carry checks 2 and 3 (checkV2_result_*, checkV3_result_*); this patch adds them and logs checks 1-3."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
A = R / 'checks/research_arch_v1'
D = '2 Nov 2026'
STEMS = ['prog_wet', 'prog_grow', 'prog_public', 'prog_housing', 'sys', 'fish_species', 'temps_public']
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
KIND = [('OPERATOR CLAIM', 'operator claim'), ('MAKER CLAIM', 'manufacturer claim'), ('PEER-REVIEWED', 'peer-reviewed'), ('PREPRINT', 'preprint (not peer-reviewed)'),
        ('CONSULTANT REPORT', 'consultant report'), ('RULE', 'rule'), ('MUNICIPAL', 'rule'), ('STANDARD', 'standard'), ('DESIGN GUIDE', 'design guide'),
        ('GOVERNMENT', 'government'), ('COUNCIL', 'government'), ('UNIVERSITY', 'university summary'), ('RESEARCH', 'research institute')]
def bad(res, k):
    r = res.get(k) or {}
    return [c for c in r.get('claims', []) if c.get('verdict') in ('WRONG', 'NOT FOUND', 'UNREACHABLE')], r
n = 0
for st in STEMS:
    src = json.load(open(A / f'{st}_sources.json'))
    r2 = json.load(open(A / f'checkV2_result_{st}.json')); r3 = json.load(open(A / f'checkV3_result_{st}.json'))
    for k, v in src.items():
        if k not in S: n += 1
        S[k] = v
        kind = next((kk for pre, kk in KIND if v.upper().startswith(pre)), m['source_kinds'].get(k, 'named in our notes, not yet checked'))
        if any(t in v[:80] for t in ('(US', 'UK', '(EU', 'outside Canada', 'benchmark')) and 'outside Canada' not in kind: kind += ' (benchmark, outside Canada)'
        for res in (r2, r3):
            if (res.get(k) or {}).get('kind_change'): kind = res[k]['kind_change']
        m['source_kinds'][k] = kind; m['source_check'][k] = 'claude'
        cl = m['check_log'].setdefault(k, [])
        if not any(c.get('date') == D and c.get('check') == 1 for c in cl):
            cl.append({'check': 1, 'by': 'Claude (research agent)', 'date': D, 'where': f'checks/research_arch_v1/{st}.md', 'what': 'figures quoted in the source entry'})
        for no, res, fn in ((2, r2, f'checkV2_result_{st}.json'), (3, r3, f'checkV3_result_{st}.json')):
            b, r = bad(res, k)
            if k in res and not any(c.get('date') == D and c.get('check') == no for c in cl):
                cl.append({'check': no, 'by': 'Claude (independent agent)', 'date': D, 'where': r.get('where_read', '')[:200],
                           'what': 'ok' if not b else f'{len(b)} claim(s) corrected or unconfirmed; see {fn}'})
dp = m.setdefault('dropped_programs', {})
for k, why in {'hospital': 'J.B. 2 Nov 2026: cut (clinic instead)', 'housing': 'J.B. 2 Nov 2026: dropped (one residential suite per F-2 building)',
               'seniors_care': 'J.B. 2 Nov 2026: dropped', 'sludge_drying': 'J.B. 2 Nov 2026: dropped (explosive dust, odour, not allowed in data-centre districts)',
               'cold_water_fish': 'J.B. 2 Nov 2026: dropped (adds cooling load, no exchange)', 'winter_market': 'J.B. 2 Nov 2026: dropped (set-point only office guidance)',
               'fish_after_harvest': 'J.B. 2 Nov 2026: out of scope'}.items():
    dp[k] = why
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('new sources', n)
