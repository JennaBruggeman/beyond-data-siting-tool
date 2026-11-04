"""4 Nov 2026 (LOTLINES brief part 1; checks/agents/LOTLINES_BRIEF_2026-11-04.md): definitions of front, side, rear and flanking lot lines, corner and
double fronting sites, in the Vancouver Zoning and Development By-law (s. 2, s. 10, district schedules) and Edmonton Zoning Bylaw 20001 (s. 8.20, s. 5.130).
Research: checks/research_arch_v1/lotlines.md and lotlines_sources.json (check 1, layout text). Check 2: checks/agents/2026-11-04_lotlines_check2.json,
a separate reading (pdftotext -raw of the PDFs; checks/tests/lotlines_check2.py). New ids lot_van_s2_lines, lot_van_s10_frontage, lot_van_exterior_side,
lot_edm_820_lines, lot_edm_5130 (kind rule)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
Z = json.load(open(R / 'checks/research_arch_v1/lotlines_sources.json'))
C2 = json.load(open(R / 'checks/agents/2026-11-04_lotlines_check2.json'))
D = '4 Nov 2026'
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
def log(k, entry):
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('date') == D and c.get('check') == entry['check'] and c.get('where') == entry['where'] for c in cl): cl.append(entry)
n = 0
for k, v in Z.items():
    if S.get(k) != v: S[k] = v; n += 1
    m['source_kinds'][k] = 'rule'; m['source_check'][k] = 'claude'
    log(k, {'check': 1, 'by': 'Claude (research agent)', 'date': D, 'where': 'checks/research_arch_v1/lotlines.md', 'what': 'clauses quoted in the source entry, with pages'})
    r = C2[k]; bad = [c for c in r['claims'] if not c['verdict'].startswith('CONFIRMED')]
    log(k, {'check': 2, 'by': r['by'], 'date': D, 'where': r['where'],
            'what': ('ok: ' + str(len(r['claims'])) + ' quotes re-found') if not bad else f"{len(bad)} quote(s) not found; see checks/agents/2026-11-04_lotlines_check2.json"})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('sources set', n)
