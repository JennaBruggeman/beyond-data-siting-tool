"""12 Nov 2026 (J.B., milestone 1 section C): the grid text by the lot's nearer substation. Two BC Hydro project pages (read by the main chat 12 Nov 2026,
queue block 2 C): East Vancouver Substation (replaces Murrin, 721 Main St, built 1947; new substation at 303 Vernon Dr; construction could begin in 2027 at
the earliest and take about four years) and West End Substation (construction starting November 2026; replaces Dal Grauer; serves downtown). Added to
grid_headroom. Idempotent."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
S = d['new_sources']; SC = d['meta'].setdefault('source_check', {})
NEW = {'bchEastVanSub': 'UTILITY PROJECT PAGE (trust 80): BC Hydro, East Vancouver Substation project page (read 12 Nov 2026): Murrin substation on Main Street (built 1947) to be replaced by a new East Vancouver substation at 303 Vernon Drive; construction could begin in 2027 at the earliest and take about four years.',
       'bchWestEndSub': 'UTILITY PROJECT PAGE (trust 80): BC Hydro, West End Substation project page (read 12 Nov 2026): construction starting November 2026; replaces Dal Grauer; serves downtown.'}
for k, v in NEW.items():
    S.setdefault(k, v); SC.setdefault(k, 'main chat, read 12 Nov 2026 (Claude Link QUEUE_for_when_computer_is_back_2026-11-12.md, block 2 C)')
q = next(x for x in d['quantities'] if x['id'] == 'grid_headroom')
for k in NEW:
    if k not in q['sources']: q['sources'].append(k)
if 'nearer substation' not in q.get('coef', ''):
    q['coef'] = q.get('coef', '') + '; the card names the lot\'s nearer substation inside the Downtown supply study area (straight line, our reading: Murrin and its East Vancouver replacement east of the peninsula; the West End substation on the peninsula); no utility publishes spare capacity (12 Nov 2026)'
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('grid note sources: done')
