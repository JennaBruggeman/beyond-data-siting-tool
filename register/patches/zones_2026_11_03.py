"""3 Nov 2026 (Build 2, part 7; checks/agents/BUILD2_BRIEF_2026-11-03.md): zones where a data centre is permitted, conditional or discretionary.
Research: checks/research_arch_v1/zones.md and zones_sources.json (check 1 by the research agent). New ids arch_zns_* and arch_mun_edm7100; entries marked
'ADD TO EXISTING ENTRY' are appended to the existing register text. Check 2 (checks/agents/2026-11-03_zones_check2.json): the build agent, not the research
agent, re-found every figure tool/data/zones.json uses in the local by-law texts (regex on whitespace-normalised text)."""
import json, pathlib, re
R = pathlib.Path(__file__).resolve().parents[2]
Z = json.load(open(R / 'checks/research_arch_v1/zones_sources.json'))
C2 = json.load(open(R / 'checks/agents/2026-11-03_zones_check2.json'))
D = '3 Nov 2026'
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
PRE = re.compile(r'^ADD TO EXISTING ENTRY \(([^)]*)\):\s*')
def log(k, entry):
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('date') == D and c.get('check') == entry['check'] and c.get('where') == entry['where'] for c in cl): cl.append(entry)
n_new = n_add = 0
for k, v in Z.items():
    mm = PRE.match(v)
    if k in S:
        add = PRE.sub('', v)
        tag = ' ‖ 3 Nov 2026 zones research (' + (mm.group(1) if mm else 'local copy') + '): '
        if tag not in S[k]: S[k] = S[k] + tag + add; n_add += 1
    else:
        S[k] = ('RULE: ' + PRE.sub('', v)) if mm else v; n_new += 1
        m['source_kinds'][k] = 'rule'; m['source_check'][k] = 'claude'
    log(k, {'check': 1, 'by': 'Claude (research agent)', 'date': D, 'where': 'checks/research_arch_v1/zones.md', 'what': 'zone figures quoted in the source entry'})
    r = C2.get(k)
    if r:
        bad = [c for c in r['claims'] if c['verdict'].startswith(('WRONG', 'NOT FOUND'))]
        log(k, {'check': 2, 'by': r['by'], 'date': D, 'where': r['where'],
                'what': ('ok: ' + str(len(r['claims'])) + ' figures re-found') if not bad else f"{len(bad)} claim(s) wrong or not found; see checks/agents/2026-11-03_zones_check2.json"})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('new', n_new, 'added to', n_add)
