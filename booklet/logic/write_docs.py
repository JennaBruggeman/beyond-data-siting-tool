# Writes the math hand-off for the logic graphics: ALL_PARTS_MATH.md (every part, verbatim from diagram_data.json) and
# MATH_BY_GRAPHIC.md (what each graphic shows and the exact rule behind it). Run after gen.py.
import json, os, re
from gen import N, NODES, EDGES, STAGES, D, COLS, G
H = os.path.dirname(os.path.abspath(__file__))
src = D['sources']
def part(n):
    ins = [i for i, (a, b) in enumerate(EDGES)]
    feeds = [a for a, b in EDGES if b == n['id']]; used = [b for a, b in EDGES if a == n['id']]
    L = [f"### {n['name']}  (`{n['id']}`)", '',
         f"- Stage: {dict((s['id'], s['name']) for s in STAGES)[n['stage']]} · unit: {n.get('unit') or '—'} · level: {dict(resident='Everyday', community='Civic', full='Technical').get(G.get(n['id'], {}).get('tier'), 'not assigned in the templates')}",
         f"- Inputs (formula arguments): {', '.join(n.get('inputs') or []) or '—'}",
         f"- Fed by (diagram links): {', '.join(feeds) or '—'} · feeds: {', '.join(used) or '—'}",
         f"- Trust: own {n.get('conf') if n.get('conf') is not None else '—'} / 100 · weakest input (chain) {n.get('upstream') if n.get('upstream') is not None else '—'} / 100 · status: {n.get('status') or '—'}",
         '', '```', f"{n['id']} = f({', '.join(n.get('inputs') or [])})", (n.get('formula') or '—'), '```']
    if n.get('coef'): L += ['', 'Coefficients: ' + n['coef'].strip('; ')]
    if n.get('sources'): L += ['', 'Sources: ' + ' | '.join(f"`{s}` {src.get(s, s).split(' — ')[0]}" for s in n['sources'])]
    return '\n'.join(L) + '\n'
with open(os.path.join(H, 'ALL_PARTS_MATH.md'), 'w') as f:
    f.write('# Every part of the logic, with its math\n\nVerbatim from `diagram_data.json` (the tool\'s own register, 21 Oct 2026): formula, coefficients, inputs, trust and sources. 195 parts in 8 stages, 261 links. Use these words and symbols as they are; do not simplify the numbers.\n\n')
    for s in STAGES:
        f.write(f"\n## {STAGES.index(s) + 1}. {s['name']}\n\n")
        for c in COLS:
            if c['stage'] == s['id']:
                for i in c['ids']: f.write(part(N[i]) + '\n')
print('ok')
