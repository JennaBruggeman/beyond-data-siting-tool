"""4 Nov 2026: typology library v1 research (checks/research_typ/<slug>.md and <slug>_sources.json, 11 typologies, 45 typ_* ids).
Check 1 by the research agent (4 Nov 2026). Check 2 by an independent agent (no part in check 1), 4 Nov 2026:
checks/research_typ/checkV2_result.json. Check-2 corrections are already written into the *_sources.json texts, which this patch copies.
WRONG at check 2 (all page numbers or truncated quotes; no figure changed): edmDrainage pages (43 and 45 of 45), vanUrbanFarmB (p. 47),
edmCustomMfg (pp. 1013-1014), edmShelterDefs (pp. 1051, 1057), vanS2Accessory (Principal Building p. 31), terenius2023 ('as-is' pp. 16, 19),
vanFireHall5Report ('fire hall at grade and second floor'; separate entries App. D p. 1). bcbc3131 note on F-1 completed (D/F-1, E/F-1 3 h)."""
import json, pathlib
from _licensed import clean  # 11 Nov 2026: loaded checks/ files pass the licensed-text guard
R = pathlib.Path(__file__).resolve().parents[2]
A = R / 'checks/research_typ'
D = '4 Nov 2026'
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
KIND = [('OPERATOR CLAIM','operator claim'),('MAKER CLAIM','manufacturer claim'),('MAKER GUIDE','manufacturer claim'),('BROKER CLAIM','broker claim'),('DEVELOPER CLAIM','developer claim'),
        ('PERMIT','rule'),('OUR ARITHMETIC','our arithmetic (not a source)'),('PEER-REVIEWED','peer-reviewed'),('INTERGOVERNMENTAL','intergovernmental'),
        ('GOVERNMENT-FUNDED','government (benchmark, outside Canada)'),('UNIVERSITY / GOVERNMENT','university / government paper (benchmark, outside Canada)'),
        ('UNIVERSITY','university summary'),('RESEARCH INSTITUTE','research institute'),('SECONDARY','secondary (not primary for the facility)'),
        ('DESIGN BENCHMARK','government (US)'),('DESIGN GUIDE','design guide (benchmark, outside Canada)'),
        ('GOV','government'),('RULE','rule'),('REGULATOR','government'),('UTILITY','utility record'),('INSTITUTION','institution'),('ENG','engineer claim'),('LEAD','lead (not evidence)')]
res = clean(json.load(open(A / 'checkV2_result.json')))
n_new = n1 = n2 = 0
for f in sorted(A.glob('*_sources.json')):
    src = clean(json.load(open(f))); md = 'checks/research_typ/' + f.name.replace('_sources.json', '.md')
    for k, v in src.items():
        if k.startswith('_'): continue
        if k not in S: n_new += 1
        S[k] = v
        kind = next((kk for pre, kk in KIND if v.upper().startswith(pre)), 'named in our notes, not yet checked')
        m['source_kinds'][k] = kind; m['source_check'][k] = 'claude'
        cl = m['check_log'].setdefault(k, [])
        if not any(c.get('check') == 1 for c in cl):
            cl.append({'check': 1, 'by': 'Claude (research agent)', 'date': D, 'where': md, 'what': 'figures quoted in the source entry'}); n1 += 1
        r = res[k]; v2 = [c['verdict'] for c in r['claims']]
        wrong = v2.count('WRONG'); nf = v2.count('NOT FOUND'); un = v2.count('UNREACHABLE')
        if un: what = f'{un} figure(s) UNREACHABLE; see checks/research_typ/checkV2_result.json'
        elif wrong or nf: what = f'{wrong} quote(s) wrong, {nf} not found; corrected; see checks/research_typ/checkV2_result.json'
        else: what = f'ok: {len(v2)} figures re-found in the source'
        if not any(c.get('check') == 2 and c.get('date') == D for c in cl):
            cl.append({'check': 2, 'by': 'Claude (independent agent, no part in check 1)', 'date': D, 'where': r['where_read'][:200], 'what': what}); n2 += 1
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('new', n_new, 'check1', n1, 'check2', n2)
