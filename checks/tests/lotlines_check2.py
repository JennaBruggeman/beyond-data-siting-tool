"""Check 2 for the lot-line research (4 Nov 2026, LOTLINES brief part 1): a separate reading. Re-extracts the by-law PDFs with pdftotext -raw
(not the -layout text the research read) and re-finds every quoted phrase of checks/research_arch_v1/lotlines_sources.json, whitespace and
case normalised, OCR quote marks folded. Writes checks/agents/2026-11-04_lotlines_check2.json. Usage: python3 checks/tests/lotlines_check2.py <tmpdir>"""
import json, pathlib, re, subprocess, sys
R = pathlib.Path(__file__).resolve().parents[2]; T = pathlib.Path(sys.argv[1]); T.mkdir(parents=True, exist_ok=True)
PDF = {'lot_van_s2_lines': ['sources/library/public/van_zdb_s2/full.pdf'], 'lot_van_s10_frontage': ['sources/library/public/vanZDBs10/full.pdf'],
       'lot_van_exterior_side': ['sources/library/public/van_zdb_i2/full.pdf', 'sources/library/public/van_zdb_i3/full.pdf', 'sources/library/public/van_zdb_fc2/full.pdf'],
       'lot_edm_820_lines': [('data/raw/edm/bylaw/Bylaw20001.pdf', 1020, 1058)], 'lot_edm_5130': [('data/raw/edm/bylaw/Bylaw20001.pdf', 880, 884), ('data/raw/edm/bylaw/Bylaw20001.pdf', 110, 113)]}
norm = lambda s: re.sub(r'\bom\b', '0 m', re.sub(r'[^a-z0-9.]+', ' ', s.lower().replace('’', "'")).replace('.', ' ')).strip()  # OCR reads '0m' as 'Om'
def frags(q):  # a definition table puts the term apart from 'means ...': search the term and each clause of the text separately
    q = re.sub(r'^([A-Z][A-Za-z ]+?) means ', r'\1 ||| means ', q)
    return [p for p in re.split(r'\s*\|\|\|\s*|\s*\.\.\.\s*|\s*…\s*|(?<=[.;:])\s+(?=[A-Za-z0-9(])|\s+(?=[a-e][.)]\s)|\s+(?=\d\.\s)', q) if len(norm(p)) >= 8]
def text(spec):
    f, a, b = (spec, None, None) if isinstance(spec, str) else spec
    out = T / (pathlib.Path(f).parent.name + (f'_{a}_{b}' if a else '') + '.txt')
    if not out.exists(): subprocess.run(['pdftotext', '-raw'] + (['-f', str(a), '-l', str(b)] if a else []) + [str(R / f), str(out)], check=True)
    return norm(out.read_text(errors='ignore'))
S = json.load(open(R / 'checks/research_arch_v1/lotlines_sources.json')); res = {}
# fragments the regex cannot re-find because of the PDF's layout, read by eye in the -raw text (file and line given)
EYE = {'located at the intersection of 2 Streets, if the angle of the intersection is less than 135 degrees': 'bylaw_1020_1058.txt l. 273-274: an OCR stray "." splits "less than . 135 degrees"',
       'Abutting a Site in a non-industrial Zone 6.0 m': 'bylaw_110_113.txt l. 89-90: table row 4.1.5 split, "Abutting a Site in a 6.0 m C / non-industrial Zone"',
       'Abutting a Site in an industrial Zone 0 m': 'bylaw_110_113.txt l. 91-92: table row 4.1.6 split, "Abutting a Site in an Om D / industrial Zone" (OCR "Om")'}
for k, v in S.items():
    hay = ' '.join(text(s) for s in PDF[k]); claims = []
    for q in re.findall(r"'([^']{12,})'", v):
        parts = frags(q)
        miss = [p for p in parts if norm(p) not in hay and not any(norm(e) == norm(p) for e in EYE)]
        eye = [EYE[e] for e in EYE for p in parts if norm(e) == norm(p) and norm(p) not in hay]
        claims.append({'claim': q[:160], 'verdict': ('CONFIRMED' + (' (by eye: ' + '; '.join(eye) + ')' if eye else '')) if not miss else 'NOT FOUND: ' + ' | '.join(m[:80] for m in miss)})
    res[k] = {'by': 'Claude (build agent; separate reading: pdftotext -raw of the PDFs, not the research text)', 'where': ', '.join(s if isinstance(s, str) else f'{s[0]} pp. {s[1]}-{s[2]}' for s in PDF[k]), 'claims': claims}
(R / 'checks/agents/2026-11-04_lotlines_check2.json').write_text(json.dumps(res, indent=1, ensure_ascii=False))
for k, r in res.items(): print(k, sum(c['verdict'].startswith('CONFIRMED') for c in r['claims']), '/', len(r['claims']), [c['verdict'][:90] for c in r['claims'] if not c['verdict'].startswith('CONFIRMED')])
