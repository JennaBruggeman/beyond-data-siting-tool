"""30 Oct 2026: Architecture mode, first-version research (four agents; checks/research_arch_v1/*.md and *_sources.json).
Adds 85 sources as CHECK 1 (agent read, figures quoted with page/section); check 2 open. Also two corrections the spatial agent found:
Bylaw 1329's exhaust clause is s. 13 (not s. 12), and its sensitive receptors are 'a hospital, an elementary school, a day care facility or a community care facility'."""
import json, pathlib, glob, re
R = pathlib.Path(__file__).resolve().parents[2]
D = '30 Oct 2026'
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']
KIND = [('OPERATOR CLAIM', 'operator claim'), ('MAKER CLAIM', 'manufacturer claim'), ('PEER-REVIEWED', 'peer-reviewed'), ('PREPRINT', 'preprint (not peer-reviewed)'),
        ('STUDENT REPORT', 'student report (low confidence)'), ('CONSULTANT REPORT', 'consultant report'), ('RULE', 'rule'), ('MUNICIPAL', 'rule'), ('STANDARD', 'standard'),
        ('DESIGN GUIDE', 'design guide'), ('GOVERNMENT', 'government'), ('COUNCIL', 'government'), ('UNIVERSITY', 'university summary'), ('RESEARCH INSTITUTE', 'research institute')]
n = 0
for f in sorted(glob.glob(str(R / 'checks/research_arch_v1/*_sources.json'))):
    for k, v in json.load(open(f)).items():
        if k in d['new_sources']: continue
        if k in ('arch_sep_cahsc42301_6', 'arch_sep_carbAtcm93115', 'arch_sep_waEcologyHIA2025', 'arch_sep_ccr2480'): continue  # dropped 31 Oct 2026 (J.B.)
        d['new_sources'][k] = v; n += 1
        kind = next((kk for pre, kk in KIND if v.upper().startswith(pre)), 'named in our notes, not yet checked')
        if '(US' in v[:60] or 'UK' in v[:60] or '(EU' in v[:60] or 'intl.' in v[:60]: kind += ' (benchmark, outside Canada)'
        m['source_kinds'][k] = kind; m['source_check'][k] = 'claude'
        cl = m['check_log'].setdefault(k, [])
        if not any(c.get('date') == D for c in cl):
            cl.append({'check': 1, 'by': 'Claude (research agent)', 'date': D, 'where': 'checks/research_arch_v1/' + pathlib.Path(f).name.replace('_sources.json', '.md'), 'what': 'figures quoted in the source entry'})
S = d['new_sources']
if 'mvBylaw1329' in S and '(exhaust: s. 13' not in S['mvBylaw1329']:
    S['mvBylaw1329'] = S['mvBylaw1329'].replace('keep exhaust away from building openings and air intakes', 'keep exhaust away from building openings and air intakes (exhaust: s. 13, corrected 30 Oct 2026)', 1)
    S['mvBylaw1329'] += " ‖ 30 Oct 2026 (research agent): sensitive receptors defined as 'a hospital, an elementary school, a day care facility or a community care facility' (s. 57)."
RW = ('hospitals, schools and day cares', 'hospitals, elementary schools, day care and community care facilities')
for q in d['quantities']:
    for fld in ('coef', 'formula'):
        if RW[0] in q.get(fld, ''): q[fld] = q[fld].replace(*RW)
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('added', n)
