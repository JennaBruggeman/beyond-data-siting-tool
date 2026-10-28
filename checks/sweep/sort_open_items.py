"""Sorts checks/sweep/open_items.csv by impact (J.B. 28 Oct 2026): 1 = a number in the '?' text also appears in the coef or
formula of a tool part that cites the source; 2 = source used by a tool part, '?' on wording, title, date or link;
3 = source not used by any part. J.B.'s decisions (type 'decision' etc.) keep their own rows. Writes open_items_sorted.csv."""
import json, csv, re, pathlib
H = pathlib.Path(__file__).resolve().parent; R = H.parents[1]
r = json.load(open(R / 'register/formula_register.json')); o = json.load(open(R / 'tool/opps.json'))
use = {}
def add(sid, pid, txt):
    use.setdefault(sid, []).append((pid, txt))
for p in r['quantities'] + r['conditions']:
    ids = set(p.get('sources') or []) | {s.get('id') for s in p.get('source_roles', [])}
    for s in ids: add(s, p['id'], f"{p.get('formula','')} {p.get('coef','')}")
for qid, q in o['quantities'].items():
    for s in q.get('sources') or []: add(s, qid, f"{q.get('formula','')} {q.get('coef','')} {q.get('basis','')}")
for name, op in o['opportunities'].items():
    for s in op.get('sources') or []: add(s, name, f"{op.get('basis','')}")
for a in o['addons']:
    for s in a.get('sources') or []: add(s, a['id'], json.dumps(a, ensure_ascii=False))
num = lambda t: {n.replace(',', '').rstrip('.') for n in re.findall(r'\d[\d,]*\.?\d*', t) if len(n.replace(',', '').replace('.', '')) >= 2 and not re.fullmatch(r'(19|20)\d\d', n.rstrip('.'))}
rows = list(csv.DictReader(open(H / 'open_items.csv')))
# hand/agent tiers from sort_out_*.json (reviewed 28 Oct 2026) override the number-matching guess
T = {}
for f in sorted(H.glob('sort_out_*.json')):
    for a in json.load(open(f)): T[a['id']] = a
out = []
for x in rows:
    i = x['id']; u = use.get(i, [])
    if x['type'] != 'source ?':
        tier = 0
    elif not u:
        tier = 3
    else:
        hits = num(x['what is open']) & set().union(*(num(t) for _, t in u))
        tier = 1 if hits else 2
    if x['type'] == 'source ?' and x['id'] in T:
        tier = T[x['id']]['tier']; x['number at stake'] = T[x['id']].get('number_at_stake') or ''
    x['impact'] = {0: '0 your decision', 1: '1 may change a number', 2: '2 wording/citation, used', 3: '3 not used by the tool'}[tier]
    x['used by'] = '; '.join(sorted({pid for pid, _ in u}))[:200]
    out.append(x)
out.sort(key=lambda x: (x['impact'], x['id']))
with open(H / 'open_items_sorted.csv', 'w', newline='') as f:
    w = csv.DictWriter(f, fieldnames=['impact', 'id', 'type', 'what is open', 'number at stake', 'used by', 'where found', 'status'], extrasaction='ignore', restval=''); w.writeheader(); w.writerows(out)
import collections; print(collections.Counter(x['impact'] for x in out))
