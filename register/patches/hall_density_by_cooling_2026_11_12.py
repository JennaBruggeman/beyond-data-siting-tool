"""12 Nov 2026 (J.B.): hall density by cooling type. Air keeps the four built Canadian halls (560-640 m2 per MW, size.json / dc_rooms.json).
Liquid to the chip: about 150 m2 per MW of IT floor, Schneider Electric reference design RD99 (maker's reference design, a claim).
Immersion: the same figure as a stand-in (immersion density not sourced yet). Every lot also shows RICS Construction Journal's
2.5-4.0 kW/m2 net white space (250-400 m2 per MW) as a line, run at 400 (the conservative end), not the default.
The Options tab's liquid-cooled options (b with heat recovery, c) size the hall at the liquid density. Idempotent."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
S = d['new_sources']
S.setdefault('schneiderRD99', 'MAKER CLAIM (trust 50): Schneider Electric, reference design RD99 (download.schneider-electric.com/doc/RD99DSR0_EN/RD99DSR5.pdf). '
  'Hybrid hall: direct-to-chip liquid-cooled racks up to 73 kW and air-cooled racks up to 40 kW; 3,818 kW of IT on 574 m2 of IT floor (two IT rooms); '
  'whole facility 3,060 m2. About 150 m2 of IT floor per MW (our arithmetic: 574 / 3.818). One maker\'s reference design, not a built hall. Read 12 Nov 2026.')
S.setdefault('ricsDCdemand', 'INDUSTRY GUIDANCE (trust 50): RICS Construction Journal, "Data centre demand". Net data hall 2.5-4.0 kW/m2 = 250-400 m2 per MW '
  'net white space (our arithmetic); 30 MW example 8,570 m2 net; gross 571-714 m2 per MW; white space 40-50 % of gross. Read 12 Nov 2026.')
TXT = ('; by cooling type (J.B. 12 Nov 2026): air 560-640 m2 per MW (four built Canadian halls); liquid to the chip about 150 m2 per MW '
       '(Schneider RD99, maker\'s reference design, claim); immersion the same figure as a stand-in, density not sourced yet; '
       'shown beside every lot: RICS 2.5-4.0 kW/m2 net white space (250-400 m2 per MW), run at 400, not the default')
for qid in ('arch_dc_hall', 'size_fit'):
    q = next(x for x in d['quantities'] if x['id'] == qid)
    if 'by cooling type' not in q['coef']:
        q['coef'] += TXT
    for s in ('schneiderRD99', 'ricsDCdemand'):
        if s not in q['sources']: q['sources'].append(s)
        if 'source_roles' in q and not any(r['id'] == s for r in q['source_roles']):
            q['source_roles'].append({'id': s, 'term': q['name'], 'role': 'data (claim)' if s == 'schneiderRD99' else 'cross-check (industry)', 'conf': 50, 'verified': True})
SC = d['meta'].setdefault('source_check', {})
SC.setdefault('schneiderRD99', 'main chat, read 12 Nov 2026 (Claude Link SOURCING_crosscheck_batch3_2026-11-12.md)')
SC.setdefault('ricsDCdemand', 'main chat, read 12 Nov 2026 (Claude Link SOURCING_crosscheck_batch2_2026-11-12.md)')
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('hall density by cooling type: done')
