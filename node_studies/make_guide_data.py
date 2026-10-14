# Families, icons, colours, mechanism diagrams and rationale for the diagram page (tool-logic icons, side panel, Guide tab).
import json, os, sys
here = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, here)
import diagrams as d
from families import FAM, ICON, GROUP, family_of, group_of
from rationale import RAT
fams = {}
for f, (name, ids) in FAM.items():
    F, kind, cap = d.DIAGRAMS[f](None); svg = F.svg(cap)
    g = group_of(f)
    fams[f] = dict(name=name, icon=ICON[f], colour=GROUP[g][1], group=g, group_name=GROUP[g][0], kind=kind, caption=cap,
                   svg=svg, key=[[n, q] for n, q in F.calls], nodes=ids)
out = dict(order=list(FAM), families=fams, node_family={i: f for f, (_, ids) in FAM.items() for i in ids}, rationale=RAT,
           groups={g: dict(name=v[0], colour=v[1], families=v[2]) for g, v in GROUP.items()})
missing = [n['id'] for n in d.D['nodes'] if n['id'] not in RAT]
assert not missing, missing
json.dump(out, open(os.path.join(here, '..', 'guide_data.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print('guide_data.json', sum(len(v['svg']) for v in fams.values()) // 1024, 'KB of diagrams')
