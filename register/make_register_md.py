#!/usr/bin/env python3
"""Regenerate formula_register.md from formula_register.json. Run: python3 make_register_md.py"""
import json, datetime, os
here=os.path.dirname(os.path.abspath(__file__))
r=json.load(open(os.path.join(here,'formula_register.json'),encoding='utf-8'))
Q={q['id']:q for q in r['quantities']}
STAGES=[('size','Size the facility'),('place','What the place offers'),('characterise','Characterise what it gives off and holds'),('prospect','Prospect the surroundings'),('opportunity','Opportunities: what the output could become'),('test','Test the match'),('decide','Decide and account')]
def upstream(i,seen=None):
    seen=seen or set()
    if i not in Q or i in seen: return 100
    seen=seen|{i}; q=Q[i]
    vals=[q['conf']]
    for x in q['inputs']:
        if x=='*': vals.append(min(upstream(y,seen) for y in Q if y!=i))
        elif x in Q: vals.append(upstream(x,seen))
    return min(vals)
usedby={}
for c in r['conditions']:
    for x in c['quantities']: usedby.setdefault(x,[]).append(c['name'])
d=datetime.date.today().strftime('%-d %b %Y')
L=[f"# Beyond Data — formula register\n\nGenerated {d} from `formula_register.json` (the diagram reads the JSON; edit that, then run `make_register_md.py`).\n",
f"**Scale.** {r['meta']['confidence_scale']}\n", f"**Rule.** {r['meta']['rule']}\n", f"**Verification.** {r['meta']['verified']}\n",
f"**Counts.** {len(r['quantities'])} quantities · {len(r['conditions'])} conditions under 10 headings · {len(r['opportunity_quantities'])} opportunities quantified.\n",
"## Quantities\n", '"own" is the confidence of the quantity\'s own coefficient and source; "upstream" is the lowest confidence of anything feeding it.\n']
for sid,sname in STAGES:
    L.append(f"### {sname}\n\n| id | quantity | unit | formula | inputs | coefficients | sources | own | upstream | status | used by |\n|---|---|---|---|---|---|---|---|---|---|---|")
    for q in r['quantities']:
        if q['stage']!=sid: continue
        esc=lambda s:str(s).replace('|','∣')
        L.append(f"| `{q['id']}` | {esc(q['name'])} | {esc(q['unit'])} | {esc(q['formula'])} | {', '.join(q['inputs']) or '—'} | {esc(q['coef']) or '—'} | {', '.join(q['sources'])} | {q['conf']} | {upstream(q['id'])} | {esc(q['status'])} | {'; '.join(usedby.get(q['id'],[])) or '— (input to others)'} |")
    L.append("")
L.append("## How the tool reads a match (decided 13 Oct 2026; see docs/tool_logic_decisions.md)\n")
L.append("No verdict and no score. Each option gets a trade-off table: every party, every row, in its own unit, never summed or ranked. Facts are shared; the weighting belongs to whoever is deciding.\n")
L.append("### Parties\n")
for p in r['meta'].get('parties',[]): L.append(f"- **{p['name']}** — {p['note']}")
L.append("\n### What it would take to move a condition\n")
if r['meta'].get('move_note'): L.append(r['meta']['move_note']+"\n")
for m in r['meta'].get('move_categories',[]): L.append(f"- `{m['id']}` **{m['name']}** — {m['note']}")
L.append("\n### Exchanges, both directions\n\n| exchange | data centre → place | place → data centre |\n|---|---|---|")
for e in r['meta'].get('exchanges',[]): L.append(f"| {e['name']} | {', '.join('`'+x+'`' for x in e['dc_to_place'])} | {', '.join('`'+x+'`' for x in e['place_to_dc'])} |")
L.append("\n### Lifecycle\n\n| phase | duration | basis | conf |\n|---|---|---|---|")
for ph in r['meta'].get('lifecycle',[]): L.append(f"| {ph['name']} | {ph['years']} | {', '.join(ph['sources']) or '—'} | {ph['conf']} |")
ol=r['meta'].get('options_logic',{})
if ol:
    L.append("\n### How options are made\n")
    for i,s in enumerate(ol['steps'],1): L.append(f"{i}. {s}")
    L.append("\nPreferences: " + '; '.join(f"**{p['name']}** — {p['note']}" for p in ol['preferences']))
L.append("")
L.append("## Condition states\n")
if r['meta'].get('verdict_states_note'): L.append(r['meta']['verdict_states_note']+"\n")
for s in r['meta'].get('verdict_states',[]): L.append(f"- `{s['id']}` **{s['label']}** — {s['means']}")
L.append("")
L.append("## Conditions (open list, from GP1 8 Oct 2026; additions 13 Oct)\n\n| heading | condition | test | quantities | weakest | to move it | parties |\n|---|---|---|---|---|---|---|")
for c in r['conditions']:
    w=min([upstream(x) for x in c['quantities'] if x in Q] or [0])
    L.append(f"| {c['heading']} | {c['name']} | {c['test'].replace('|','∣')} | {', '.join('`'+x+'`' for x in c['quantities'])} | {w} | {', '.join(c.get('move',[]))} | {', '.join(c.get('parties',[]))} |")
L.append("\n## Opportunities and the quantities that size them\n")
for name,qs in r['opportunity_quantities'].items():
    w=min([upstream(x) for x in qs if x in Q] or [0])
    L.append(f"- **{name}**: {', '.join('`'+x+'`' for x in qs)} (weakest {w})")
L.append("\n## Sources by term\n")
if r['meta'].get('source_roles_note'): L.append(r['meta']['source_roles_note']+"\n")
L.append("| quantity | source | supplies | role | conf | placement |\n|---|---|---|---|---|---|")
for q in r['quantities']:
    if len(q.get('source_roles',[]))<2: continue
    for x in q['source_roles']:
        L.append(f"| `{q['id']}` | `{x['id']}` | {x['term'].replace('|','∣')} | {x['role']} | {x['conf']} | {'' if x['verified'] else 'unverified'} |")
L.append("\n### Own confidence vs sources (for review)\n")
for q in r['quantities']:
    cs=[x['conf'] for x in q.get('source_roles',[]) if x['role'] in ('coefficient','rule','method','data') and x['conf']>0]
    if cs and min(cs)!=q['conf']: L.append(f"- `{q['id']}` own {q['conf']}, lowest coefficient-role source {min(cs)} — {q['status']}")
L.append("\n## Sources\n")
if r['meta'].get('source_note'): L.append(r['meta']['source_note']+"\n")
for k,v in r['new_sources'].items(): L.append(f"- `{k}` — {v}")
if r.get('old_sources'):
    L.append("\nSource ids from the first register (hunts 1–8; full reports in sources/01–08):\n")
    for k,v in sorted(r['old_sources'].items()): L.append(f"- `{k}` — {v}")
L.append("\n## Remaining gaps (after two search passes, verification, hunts 9–10)\n")
for i,g in enumerate(r['meta'].get('gaps',[]),1): L.append(f"{i}. {g}")
open(os.path.join(here,'formula_register.md'),'w',encoding='utf-8').write('\n'.join(L)+'\n')
missing=sorted({x for q in r['quantities'] for x in q['inputs'] if x not in Q and x not in ('*',)})
print('written; non-quantity inputs:',missing)
