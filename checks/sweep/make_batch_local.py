"""Second checks from saved copies (J.B. 28 Oct 2026). Usage: python3 make_batch_local.py N -> B_batchN_ids.json and
BN_q1..q5.json for up to 50 sources that still need a second check AND have a saved local copy (saved_copies_manifest.json
+ match_out.json 'confirmed'). Each question lists the files to read; checkers read only those (no web)."""
import csv, json, re, sys, glob, pathlib
H = pathlib.Path(__file__).resolve().parent; R = H.parents[1]
r = json.load(open(R / 'register/formula_register.json')); o = json.load(open(R / 'tool/opps.json'))
S = {**r['old_sources'], **r['new_sources'], **o['sources']}; arch = set(r.get('archived_sources', {}))
tri = {x['id']: x for x in csv.DictReader(open(H / 'triage_2026-10-27.csv'))}
done = set()
for f in glob.glob(str(H / 'B_batch*_ids.json')): done |= set(json.load(open(f)))
F = dict(json.load(open(H / 'saved_copies_manifest.json')))
for i, m in json.load(open(H / 'match_out.json')).items():
    if m.get('confidence') == 'confirmed': F.setdefault(i, []); F[i] += [p for p in m['files'] if p not in F[i]]
unread = [i for i, t in tri.items() if 'could not read' in t['status']]
need = [i for i in S if i not in arch and (i not in done or i in unread)]
queue = [i for i in dict.fromkeys(need) if i in F]
n = int(sys.argv[1]); ids = queue[:50]
json.dump(ids, open(H / f'B_batch{n}_ids.json', 'w'))
Q = []
for i in ids:
    t = S[i]
    claim = re.sub(r'(?<![A-Za-z])\d[\d,.]*', '___', re.sub(r'https?://[^\s;]+', '', t).rstrip(' —;'))
    Q.append({'id': i, 'files': F[i], 'claims_with_numbers_blanked': claim})
for k in range(5): json.dump(Q[k::5], open(H / f'B{n}_q{k+1}.json', 'w'), ensure_ascii=False, indent=1)
print(len(ids), 'in batch;', len(queue) - len(ids), 'left with saved copies')
