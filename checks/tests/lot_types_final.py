"""Job A1 final step (J.B.'s OK and Cowork's gate reply, 7 Nov 2026): freeze the lot types, write checks/lot_types_<date>.csv and the final part of the md.
Input: the JSONL from checks/tests/lot_types.js (ids and measures only). Usage: python -I lot_types_final.py <lots.jsonl> <date>
Decisions (COWORK_REPLY_A1_gate.md, approved by J.B.; drawing choices unless a source is named):
  multi-part lots: irregularity on the part the frame covers (part_area_m2 / bbox_m2); area_m2 stays the tool's full figure; flag multipart;
  street lines: street edges merged end to end (within 30°) or on one line (within 10°, 3 m); corner = street lines at least 45° apart, a FLAG, not a type;
  types in order: irregular (< 0.75) → small (buildable < 853 m²) → large (≥ 6,000 m²) → narrow_deep (aspect ≥ 2.0) → wide_shallow (≤ 0.8) → regular;
  buildable_m2 = inside the yard lines; buildable_depthlim_m2 only where a depth limit applies (I-2 sub-area B ss. 3.2.2.1–8, I-3 sub-area A ss. 3.1.2.1–8:
  'maximum depth and width 61.0 m'; registers van_zdb_i2, van_zdb_i3); no_rear_access = no lane and one street line."""
import json, sys, csv, collections, statistics as S, os
src, date = sys.argv[1], sys.argv[2]
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
R = [json.loads(l) for l in open(src, encoding='utf-8') if l.strip()]
bad = [r for r in R if r.get('err') or r.get('skip')]
q0 = [r for r in R if not (r.get('err') or r.get('skip')) and not r.get('subB')]
seen = set(); q = []; dup = 0                     # a lot that crosses two tiles is listed in both: one row each (measures are identical)
for r in q0:
    k = (r['city'], r['id'])
    if k in seen: dup += 1; continue
    seen.add(k); q.append(r)
DL = {'I-2B': 'I-2 ss. 3.2.2.1–8 (sub-area B), van_zdb_i2', 'I-3': 'I-3 ss. 3.1.2.1–8 (sub-area A), van_zdb_i3'}
def sub(r):
    z = r['zone']
    if z.startswith('FC-2 '): return z[5:]
    if z == 'I-3': return 'A'
    if z == 'I-2B': return 'B'
    return ''
for r in q:
    r['bbox'] = r['depth'] * r['width']; r['aspect'] = r['depth'] / r['width']
    r['multipart'] = r['area'] - r['partArea'] > 1.0
    r['irr'] = r['partArea'] / r['bbox']; r['irr_full'] = r['area'] / r['bbox']
    r['corner'] = bool(r['cornerAngle']); r['nra'] = (not r['lane']) and r['nLines'] == 1
    r['dlim'] = r['buildCap'] if r['zone'] in DL else None
def typ(r, irr='irr'):
    if r[irr] < 0.75: return 'irregular'
    if r['build'] < 853: return 'small'
    if r['build'] >= 6000: return 'large'
    if r['aspect'] >= 2.0: return 'narrow_deep'
    if r['aspect'] <= 0.8: return 'wide_shallow'
    return 'regular'
T = ['irregular', 'small', 'large', 'narrow_deep', 'wide_shallow', 'regular']
# not_a_site (Cowork notes 8 Nov 2026, J.B.): no frontage (no lot line classed front) or a framed part under 200 m²: flagged, not typed
for r in q: r['nas'] = (r['frontage'] or 0) < 0.5 or r['partArea'] < 200
OLD = {}
try:
    for row in csv.DictReader(open(os.path.join(root, 'checks', f'lot_types_{date}.csv'), encoding='utf-8')): OLD[(row['city'], row['key'])] = row['type']
except FileNotFoundError: pass
for r in q: r['type'] = '' if r['nas'] else typ(r); r['type_full'] = '' if r['nas'] else typ(r, 'irr_full')
assert all(r['type'] in T or r['nas'] for r in q) and len({(r['city'], r['id']) for r in q}) == len(q)   # exactly one type per lot
rd = lambda x, d=2: '' if x is None else round(x, d)
cols = ['key', 'city', 'zone', 'subarea', 'status', 'address', 'area_m2', 'part_area_m2', 'multipart', 'frontage_m', 'n_street_edges', 'n_street_segments', 'corner', 'lane',
        'depth_m', 'width_m', 'aspect', 'bbox_m2', 'irregularity', 'buildable_m2', 'buildable_depthlim_m2', 'buildable_w_m', 'buildable_d_m', 'height_m', 'ground_storey_m', 'upper_storey_m', 'type', 'no_rear_access', 'not_a_site']
with open(os.path.join(root, 'checks', f'lot_types_{date}.csv'), 'w', encoding='utf-8', newline='') as f:
    w = csv.writer(f, lineterminator='\n'); w.writerow(cols)
    for r in sorted(q, key=lambda r: (r['city'], r['zone'], r['id'])):
        w.writerow([r['id'], r['city'], r['zone'], sub(r), r['status'], r['addr'], rd(r['area'], 1), rd(r['partArea'], 1), r['multipart'], rd(r['frontage']), r['nLines'], r['nStreet'], r['corner'], r['lane'],
                    rd(r['depth']), rd(r['width']), rd(r['aspect'], 3), rd(r['bbox'], 1), rd(r['irr'], 3), rd(r['build'], 1), rd(r['dlim'], 1), rd(r['bw']), rd(r['bd']), rd(r['height'], 1), r['ground'] or '', r['upper'] or '', r['type'], r['nra'], r['nas']])
def f(x):
    return '–' if x is None else (f'{x:,.0f}' if abs(x) >= 100 else f'{x:.2f}')
def rank(vals):
    s = sorted(vals); n = max(1, len(s) - 1); return lambda x: s.index(x) / n
L = []; P = L.append
P(f'# Lot types, job A1 (frozen {date}, Code)\n')
P("Frozen after J.B.'s OK and Cowork's gate reply (COWORK_REPLY_A1_gate.md). Ids and measures only, no geometry (public repo). One row per lot: "
  f"`checks/lot_types_{date}.csv`. Measures from the tool's own model (checks/tests/lot_types.js). The gate report that set these cut-offs follows below.\n")
P('**Rules.** Types, first that applies: irregular (part area ÷ bounding rectangle < 0.75) → small (buildable < 853 m², the Emergency hub minimum ground, tool/data/arch.json) → large (≥ 6,000 m²) → narrow_deep (depth ÷ width ≥ 2.0) → wide_shallow (≤ 0.8) → regular. '
  'Flags, not types: corner (street lines at least 45° apart, after merging segments of one street), multipart (the tool\'s lot area counts parts the frame does not cover), no_rear_access (no lane and one street line). '
  'Buildable = inside the yard lines; `buildable_depthlim_m2` only on I-2 sub-area B and I-3 sub-area A, where the by-law sets a maximum building depth and width of 61.0 m (I-2 ss. 3.2.2.1–8, I-3 ss. 3.1.2.1–8; registers van_zdb_i2, van_zdb_i3). '
  'All cut-offs are drawing choices (Cowork), except 853 m² (the smallest typology).\n')
nv, ne = sum(r['city'] == 'van' for r in q), sum(r['city'] == 'edm' for r in q)
P(f'Lots: {nv:,} Vancouver, {ne:,} Edmonton (I-3 sub-area B left out: 370 Prior St; {dup} lots listed in two tiles counted once, so Vancouver is not the 699 of the gate report). Not measured: {len(bad)}. Every lot has exactly one type.\n')
nas = [r for r in q if r['nas']]
P(f"**Not a site** (flag, not a type; Cowork notes 8 Nov): {sum(r['city']=='van' for r in nas):,} Vancouver, {sum(r['city']=='edm' for r in nas):,} Edmonton. "
  f"No frontage (no lot line classed front): {sum((r['frontage'] or 0)<0.5 for r in q):,}; framed part under 200 m²: {sum(r['partArea']<200 for r in q):,}; both: {sum((r['frontage'] or 0)<0.5 and r['partArea']<200 for r in q):,}. "
  f"The note's 161 counts the full lot area (area_m2 under 200: {sum(r['area']<200 for r in q):,}); this file uses the framed part, as the note says (question to Cowork).\n")
if OLD:
    P('| Type | Vancouver before | Vancouver now | Edmonton before | Edmonton now |\n|---|---|---|---|---|')
    for k in T + ['']:
        b = lambda c: sum(1 for (cc, _), v in OLD.items() if cc == c and v == k); n = lambda c: sum(1 for r in q if r['city'] == c and r['type'] == k)
        P(f"| {k or 'not a site (no type)'} | {b('van'):,} | {n('van'):,} | {b('edm'):,} | {n('edm'):,} |")
    P('')
t = collections.Counter((r['city'], r['type']) for r in q)
P('| Type | Vancouver | Edmonton | of which corner (Van / Edm) | no rear access (Van / Edm) |\n|---|---|---|---|---|')
for k in T:
    g = lambda c, fl: sum(1 for r in q if r['city'] == c and r['type'] == k and r[fl])
    P(f"| {k} | {t[('van',k)]:,} | {t[('edm',k)]:,} | {g('van','corner'):,} / {g('edm','corner'):,} | {g('van','nra'):,} / {g('edm','nra'):,} |")
P(f"| all | {nv:,} | {ne:,} | {sum(r['corner'] for r in q if r['city']=='van'):,} / {sum(r['corner'] for r in q if r['city']=='edm'):,} | {sum(r['nra'] for r in q if r['city']=='van'):,} / {sum(r['nra'] for r in q if r['city']=='edm'):,} |\n")
mp = [r for r in q if r['multipart']]; ch = [r for r in q if r['type'] != r['type_full']]
P(f"**Multi-part lots:** {sum(r['city']=='van' for r in mp)} Vancouver, {sum(r['city']=='edm' for r in mp)} Edmonton. Measured on the part the frame covers, "
  f"{len(ch)} change type against the full-area reading ({', '.join(sorted(set(f'{a} → {b}' for a,b in [(r['type_full'],r['type']) for r in ch]))) or 'none'}). "
  "Their buildable area and frontage are of that part too (the tool's yard lines and edges).\n")
mm = [('area', 'lot area m²'), ('partArea', 'part area m²'), ('frontage', 'frontage m'), ('depth', 'depth m'), ('width', 'width m'), ('aspect', 'aspect'), ('irr', 'irregularity'), ('build', 'buildable m²'), ('height', 'height m')]
P('\n## Per type and city\n')
P('Ranges: min · median · max. Representative lots: the two nearest the group\'s median aspect and buildable area (rank distance), and the nearest corner lot where the group has one.\n')
for k in T:
    P(f'### {k}\n')
    for c, cn in (('van', 'Vancouver'), ('edm', 'Edmonton')):
        g = [r for r in q if r['city'] == c and r['type'] == k]
        if not g: P(f'{cn}: none.\n'); continue
        P(f'**{cn}: {len(g):,} lots**\n')
        P('| Measure | min | median | max |\n|---|---|---|---|')
        for m, lab in mm:
            v = [r[m] for r in g if r[m] is not None]
            if v: P(f'| {lab} | {f(min(v))} | {f(S.median(v))} | {f(max(v))} |')
        ra, rb = rank([r['aspect'] for r in g]), rank([r['build'] for r in g])
        ma, mb = S.median(ra(r['aspect']) for r in g), S.median(rb(r['build']) for r in g)
        d = sorted(g, key=lambda r: (ra(r['aspect']) - ma) ** 2 + (rb(r['build']) - mb) ** 2)
        reps = d[:2] + ([x for x in d if x['corner'] and x not in d[:2]][:1])
        P('\n| | key | address | zone | aspect | buildable m² | frontage m | corner | lane |\n|---|---|---|---|---|---|---|---|---|')
        for i, r in enumerate(reps):
            lab = ['representative', 'second', 'corner example'][i] if not (i < 2 and r['corner'] and False) else ''
            P(f"| {lab} | {r['id']} | {r['addr']} | {r['zone']} | {f(r['aspect'])} | {f(r['build'])} | {f(r['frontage'])} | {r['corner']} | {r['lane']} |")
        P('')
five = ['63819485', '63819363', '23060741', '176767', '146402']
P('\n## The five check lots (job sheet §6)\n')
P('| ' + ' | '.join(cols) + ' |'); P('|' + '---|' * len(cols))
with open(os.path.join(root, 'checks', f'lot_types_{date}.csv'), encoding='utf-8') as fh:
    for row in csv.reader(fh):
        if row[0] in five: P('| ' + ' | '.join(row) + ' |')
P('\nGolden and Architecture baselines: unchanged (the job only reads; no tool file changed since 2202eec).\n')
md = os.path.join(root, 'checks', f'lot_types_{date}.md'); old = open(md, encoding='utf-8').read()
gate = old[old.index('\n', old.index('# ')) + 1:] if '# Lot types, job A1 (frozen' not in old else old[old.index('# Gate report (before the OK)'):].split('\n', 1)[1]
open(md, 'w', encoding='utf-8', newline='\n').write('\n'.join(L) + '\n\n---\n\n# Gate report (before the OK)\n' + gate)
print('\n'.join(L[:40]))
