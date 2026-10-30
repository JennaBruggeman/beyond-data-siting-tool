"""30 Oct 2026: J.B.'s answer to the tour question 'what puts a fire out at VAN3?'. Check 1 (Claude): transcribed."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]; D = '30 Oct 2026'
TOUR = (" FIRE (her answer in chat, 30 Oct 2026; told by the guide or seen ?): 'vesda fire system with sniffers everhwhere (nitrogen) and targeted sprinklers rathere than whole building'."
        " VESDA is air-sampling smoke detection; what 'nitrogen' refers to (pipe charge, as at VAN4, or a gas system ?) is not stated.")
COEF_OLD = "VAN3: VESDA on the tour (her note, read as 'he showed me' ?), suppression type not stated (?)"
COEF_NEW = ("VAN3 (tour, her answer 30 Oct 2026): VESDA air-sampling detection 'everywhere', 'nitrogen', and 'targeted sprinklers rather than whole building'"
            " (zoned sprinklers; whether pre-action as at VAN1/VAN4, and what the nitrogen is for, not stated ?)")
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; d = json.loads(p.read_text())
    S = d['new_sources'] if pretty else d['sources']
    if 'FIRE (her answer' not in S['tourVAN3']: S['tourVAN3'] += TOUR
    q = next(q for q in d['quantities'] if q['id'] == 'fire_protection') if pretty else d['quantities']['fire_protection']
    q['coef'] = q['coef'].replace(COEF_OLD, COEF_NEW)
    if pretty:
        tl = d['meta']['check_log'].setdefault('tourVAN3', [])
        if not any('fire' in c.get('what', '') for c in tl): tl.append({'check': 1, 'by': 'Claude', 'date': D, 'where': "J.B.'s answer in chat, 30 Oct 2026", 'what': 'fire answer transcribed, her wording kept'})
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, COEF_NEW[:20] in q['coef'])
