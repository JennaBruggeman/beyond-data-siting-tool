"""Usage: python3 compare_batch.py N -> prints check 1 vs check 2 per source for batch N (compact)."""
import json, csv, glob, sys, pathlib
H = pathlib.Path(__file__).resolve().parent; n = sys.argv[1]
c1 = {x['id']: x for x in csv.DictReader(open(H / 'sweep_results.csv'))}
A = {}
for f in sorted(glob.glob(str(H / f'B{n}_a*.json'))):
    for a in json.load(open(f)): A.setdefault(a['id'], []).append(a)
for i in json.load(open(H / f'B_batch{n}_ids.json')):
    x = c1.get(i, {})
    L = A.get(i, [{}]); L = [a for a in L if a.get('reachable')] or L[-1:]
    for a in L:
        u = str(a.get('unsupported_wording', '')).strip()
        ok = a.get('reachable') and u.lower() in ('none', 'none.', '')
        print(f"# {i} | C1: {x.get('verdict','-')} {x.get('problem','')[:200]} | C2: {'OK' if ok else ('reach' if a.get('reachable') else 'UNREACHABLE')}")
        if not ok:
            if a.get('reachable'): print('   C2 title/date:', a.get('title','')[:100], '|', a.get('date',''))
            print('   C2 unsupported:', u[:500]); print('   C2 note:', str(a.get('note',''))[:250])
