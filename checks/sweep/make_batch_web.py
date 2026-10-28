"""Remaining second checks that need the web (J.B. 28 Oct 2026): sources not yet second-checked plus those whose second
check could not read the source. Usage: python3 make_batch_web.py N -> B_batchN_ids.json, BN_q1..q5.json (50 per batch)."""
import csv, json, re, sys, glob, pathlib
H = pathlib.Path(__file__).resolve().parent; R = H.parents[1]
r = json.load(open(R / 'register/formula_register.json')); o = json.load(open(R / 'tool/opps.json'))
S = {**r['old_sources'], **r['new_sources'], **o['sources']}; arch = set(r.get('archived_sources', {}))
c1 = {x['id']: x for x in csv.DictReader(open(H / 'sweep_results.csv'))}
tri = {x['id']: x for x in csv.DictReader(open(H / 'triage_2026-10-27.csv'))}
done = set()
for f in glob.glob(str(H / 'B_batch*_ids.json')): done |= set(json.load(open(f)))
unread = [i for i, t in tri.items() if 'could not read' in t['status'] and i in S]
rank = lambda i: -len([u for u in c1.get(i, {}).get('used_by', '').split(';') if u.strip()])
queue = sorted([i for i in S if i not in arch and i not in done], key=rank) + [i for i in unread if i not in arch]
tried = set()
for k in range(14, 100):
    f = H / f'B_batch{k}_ids.json'
    if f.exists() and k != int(sys.argv[1]): tried |= set(json.load(open(f)))
notdoc = {i for i, x in c1.items() if x['verdict'] == 'Not a document'}
queue = [i for i in dict.fromkeys(queue) if i not in notdoc and not (i in tried and i in unread)]
n = int(sys.argv[1]); ids = queue[:50]
json.dump(ids, open(H / f'B_batch{n}_ids.json', 'w'))
Q = []
for i in ids:
    t = S[i]; m = re.findall(r'https?://[^\s;]+', t)
    link = m[0] if m else (c1.get(i, {}).get('correct_url') or '')
    claim = re.sub(r'(?<![A-Za-z])\d[\d,.]*', '___', re.sub(r'https?://[^\s;]+', '', t).rstrip(' —;'))
    Q.append({'id': i, 'link': link, 'other_links': m[1:], 'claims_with_numbers_blanked': claim})
for k in range(5): json.dump(Q[k::5], open(H / f'B{n}_q{k+1}.json', 'w'), ensure_ascii=False, indent=1)
print(len(ids), 'in batch;', len(queue) - len(ids), 'left;', sum(i not in c1 for i in ids), 'with no first check')
