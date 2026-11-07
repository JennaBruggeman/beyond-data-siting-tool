"""7 Nov 2026 (J.B.; Cowork reads checks/research_arch_v1/noise_reads_2026-11-07.md, 'For Code'): KD2000 SL2 78 dB(A) at 7 m (Kohler G6-154, maker claim);
Vancouver Noise Control By-law 6555 s. 4.1(c) generator testing and s. 4.3(c) emergency works (reading ?); Edmonton Community Standards Bylaw C14600
ss. 19–22, 24 (consolidated 17 Mar 2026). The tool checks the generator test at the lot lines (one set, free field, our arithmetic) and flags an overnight
outage in Edmonton. Replaces the 'noise not checked (?)' condition text."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); m = d['meta']; S = d['new_sources']
D = '7 Nov 2026'; WHERE = 'checks/research_arch_v1/noise_reads_2026-11-07.md'
def new(k, text, kind, what):
    if k not in S: S[k] = text
    m['source_kinds'][k] = kind; m['source_check'][k] = 'claude'
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('date') == D and c.get('where') == WHERE for c in cl): cl.append({'check': 1, 'by': 'Claude (Cowork)', 'date': D, 'where': WHERE, 'what': what})
new('kohlerG6154sound', "MAKER: Kohler/Rehlko G6-154 9/23r, Aluminum Sound Enclosures and Subbase Fuel Tank, p. 11 sound data, KD2000/2250/2500 (KD62V12 and KD62V12A engines): SL1 enclosure 90 dB(A), SL2 enclosure 78 dB(A), 'Sound Pressure Level at 60 Hz with Full Load', 'Log average sound pressure level of 8 measured positions around the perimeter of the unit at a distance of 7 m (23 ft.)' — https://resources.kohler.com/power/kohler/industrial/pdf/KD800-2500_G6154.pdf (read through a web reader twice, not seen as an image; manufacturer claim; one value for 2,000–2,500 kW; no sound power level, ?)", 'operator', '78 dB(A) at 7 m SL2')
new('van6555s41c', "RULE: City of Vancouver Noise Control By-law 6555 (consolidated to 14 Jul 2026), s. 4.1(c): the zone limits and 3.1(j) 'do not apply to noise or sound made … as a consequence of the lawful testing of an emergency generator provided that it is not operated more than once a month during the daytime, and for a maximum of 60 minutes, plus once a year for a maximum of 180 minutes, and its continuous sound level does not exceed a rating of 80 dBA on an approved sound meter when measured at the point of reception or at least 6.1 m from its source, whichever is the greater'; s. 4.3(c): sound may exceed the levels when 'performing works of an emergency nature for the preservation or protection of property, life or health'. Standby power in a power cut as such works: our reading (?).", 'rule', 's. 4.1(c), 4.3(c)')
new('edm14600s19to24', "RULE: City of Edmonton Community Standards Bylaw C14600 (consolidated 17 Mar 2026, PDF supplied by J.B.): residential property line 65 dB(A) 7 a.m.–10 p.m. (s. 19(1)), s. 19(3) up to 70 for ≤ 2 h, 75 for ≤ 1 h, 80 for ≤ 30 min, 85 for ≤ 15 min in any one day; 50 overnight (s. 20); non-residential 75 daytime (s. 21(1)), s. 21(3) 80 for ≤ 2 h, 85 for ≤ 1 h a day; 60 overnight (s. 22); s. 24 exceptions only for City snow and ice management and a City Manager permit: no exemption for emergency or standby generators; s. 14 disturbance applies whether or not a limit is exceeded; s. 55(d) repeals Bylaw 7255.", 'rule', 'ss. 19–22, 24')
C = {c['id']: c for c in d['conditions']}
g = C.get('r_generator_noise_unchecked')
if g:
    g['name'] = 'Generator noise at the lot lines (checked from 7 Nov 2026; id kept so earlier patches stay re-runnable)'
    g['test'] = ("one KD2000 SL2 set, 78 dB(A) at 7 m (maker claim), Lp(r) = 78 − 20 log10(r / 7), free field, one set at a time (our arithmetic). Vancouver: test ≤ 80 dB(A) at the point of reception or 6.1 m, whichever is farther (6555 s. 4.1(c)); "
                 "running in a power cut as emergency works, s. 4.3(c), our reading (?). Edmonton: daytime test ≤ 1 h ≤ 75 dB(A) at residential and ≤ 85 at non-residential lines (C14600 s. 19(3), 21(3)); an overnight outage over 50 / 60 is flagged, not blocked (ss. 20, 22, 24: no generator exemption)")
    g['sources'] = ['kohlerG6154sound', 'van6555s41c', 'edm14600s19to24']
    g['note'] = "Property lines are this lot's own, classed by what they abut (our reading). Cooling plant noise in normal operation is unchanged (the existing noise screen). 7 Nov 2026."
    g['next_action'] = 'sound power level (Lw) for ISO 9613 use, if a fuller noise model is wanted (?)'
q = {x['id']: x for x in d['quantities']}['arch_ratios']
if 'generator noise (7 Nov 2026' not in q['formula']:
    q['formula'] += "; generator noise (7 Nov 2026): test level at the lot lines checked (Vancouver 6555 s. 4.1(c); Edmonton C14600 s. 19(3), 21(3)), Edmonton overnight outage flagged"
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('generator noise')
