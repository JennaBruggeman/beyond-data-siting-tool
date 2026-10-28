"""Usage: python3 set_status.py N "fix ids" "mark ids" -> batch N statuses in triage_2026-10-27.csv (rest: confirmed by
two checks if the second check reached it, else single check)."""
import csv, json, sys, pathlib
H = pathlib.Path(__file__).resolve().parent; n = sys.argv[1]
FIX = set(sys.argv[2].split()); MARK = set(sys.argv[3].split())
ids = json.load(open(H / f'B_batch{n}_ids.json')); A = {}
for p in sorted(H.glob(f'B{n}_a*.json')):
    for a in json.load(open(p)):
        if a.get('reachable') or a['id'] not in A: A[a['id']] = a
C1 = {x['id'] for x in csv.DictReader(open(H / 'sweep_results.csv')) if x['verdict'] not in ('', '-')}
rows = list(csv.DictReader(open(H / 'triage_2026-10-27.csv'))); f = list(rows[0].keys()); have = {r['id'] for r in rows}
for i in ids:
    if i not in have: rows.append({k: '' for k in f} | {'id': i, 'verdict': 'Found', 'group': 'second check'})
for r in rows:
    i = r['id']
    if i not in ids: continue
    if i not in C1:
        r['status'] = (f'B{n} 28 Oct: single check: one web check only (no first check); points marked ?' if A.get(i, {}).get('reachable') else
                       f'B{n} 28 Oct: unchecked: no first check and the web check could not read it'); continue
    r['status'] = (f'B{n} 28 Oct: agreed fixes applied; single-check points marked ?' if i in FIX else
                   f'B{n} 28 Oct: two checks; disputed points marked ?' if i in MARK else
                   f'B{n} 28 Oct: confirmed by two checks' if A.get(i, {}).get('reachable') else
                   f'B{n} 28 Oct: second check could not read it (single check)')
w = csv.DictWriter(open(H / 'triage_2026-10-27.csv', 'w', newline=''), fieldnames=f); w.writeheader(); w.writerows(rows)
