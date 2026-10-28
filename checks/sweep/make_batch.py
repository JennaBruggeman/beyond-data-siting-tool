"""Second-check queue for sources checked once (J.B. 28 Oct 2026). Usage: python3 make_batch.py N  -> writes
B_batchN_ids.json and BN_q1..q5.json (claims with numbers blanked). Queue: group A single-check items first, then
'Found' sources by number of tool parts using them, then group C new sources (no check yet: they get two checker runs)."""
import csv, json, re, sys, glob, pathlib
H = pathlib.Path(__file__).resolve().parent; R = H.parents[1]
r = json.load(open(R / 'register/formula_register.json')); o = json.load(open(R / 'tool/opps.json'))
S = {**r['old_sources'], **r['new_sources'], **o['sources']}; arch = set(r.get('archived_sources', {}))
c1 = {x['id']: x for x in csv.DictReader(open(H / 'sweep_results.csv'))}
tri = {x['id']: x for x in csv.DictReader(open(H / 'triage_2026-10-27.csv'))}
done = set()
for f in glob.glob(str(H / 'B_batch*_ids.json')): done |= set(json.load(open(f)))
A = [i for i, t in tri.items() if t['group'].startswith('A') and 'single' in t['status'] and i in S]
F = sorted([i for i, x in c1.items() if x['verdict'] == 'Found' and i in S and i not in arch],
           key=lambda i: -len([u for u in c1[i]['used_by'].split(';') if u.strip()]))
C = [i for i in S if i not in c1 and i not in arch]
queue = [i for i in A + F + C if i not in done]
n = int(sys.argv[1]); ids = queue[:50]
json.dump(ids, open(H / f'B_batch{n}_ids.json', 'w'))
Q = []
for i in ids:
    t = S[i]; m = re.findall(r'https?://[^\s;]+', t)
    link = m[0] if m else (c1.get(i, {}).get('correct_url') or '')
    claim = re.sub(r'(?<![A-Za-z])\d[\d,.]*', '___', re.sub(r'https?://[^\s;]+', '', t).rstrip(' —;'))
    Q.append({'id': i, 'link': link, 'other_links': m[1:], 'claims_with_numbers_blanked': claim})
for k in range(5): json.dump(Q[k::5], open(H / f'B{n}_q{k+1}.json', 'w'), ensure_ascii=False, indent=1)
print(len(ids), 'in batch;', len(queue) - len(ids), 'left in queue;', sum(i in C for i in ids), 'group C (need two runs)')
