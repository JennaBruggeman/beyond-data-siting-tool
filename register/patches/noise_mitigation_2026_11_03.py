"""3 Nov 2026: sourced noise mitigation in the noise by-law check (follows noise_block_2026_11_02.py; J.B.'s hard rule of 2 Nov 2026).
Research: checks/research_arch_v1/noise_mitigation.md and noise_mitigation_sources.json (ids arch_nz_*). The texts already carry checks 2 and 3
(checkV2_result_noise_mitigation.json, checkV3_result_noise_mitigation.json); this patch adds the sources, logs checks 1-3, and records the
mitigation rules in the noise_level and noise_limit quantities (formula, coef, sources, source_roles). Tool code: engine.js noiseCheck."""
import json, pathlib
from _licensed import clean  # 11 Nov 2026: loaded checks/ files pass the licensed-text guard
R = pathlib.Path(__file__).resolve().parents[2]
A = R / 'checks/research_arch_v1'
D = '2 Nov 2026'      # date of the research and of checks 2 and 3
DP = '3 Nov 2026'     # date of this patch
ST = 'noise_mitigation'
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
KIND = [('OPERATOR CLAIM', 'operator claim'), ('MAKER CLAIM', 'manufacturer claim'), ('GOVERNMENT-COMMISSIONED', 'government-commissioned study (consultant report to a government)'),
        ('GOVERNMENT GUIDE', 'government guide'), ('FILED STUDY', 'filed study (consultant report for a proponent, hosted by a government)'),
        ('STANDARDS-BODY', 'standards-body conference paper'), ('JOURNAL ITEM', 'journal item (review status not shown)'), ('RULE', 'rule'), ('GOVERNMENT', 'government')]
def bad(res, k):
    r = res.get(k) or {}
    return [c for c in r.get('claims', []) if c.get('verdict') in ('WRONG', 'NOT FOUND', 'UNREACHABLE')], r
src = clean(json.load(open(A / f'{ST}_sources.json')))
r2 = clean(json.load(open(A / f'checkV2_result_{ST}.json'))); r3 = clean(json.load(open(A / f'checkV3_result_{ST}.json')))
n = 0
for k, v in src.items():
    if k not in S: n += 1
    S[k] = v
    kind = next((kk for pre, kk in KIND if v.upper().startswith(pre)), m['source_kinds'].get(k, 'named in our notes, not yet checked'))
    if any(t in v[:90] for t in ('(US', '(EU', 'Hong Kong', 'outside Canada')) and 'outside Canada' not in kind: kind += ' (benchmark, outside Canada)'
    if k == 'arch_nz_nswDcNoise' and 'outside Canada' not in kind: kind += ' (benchmark, outside Canada; a proposed pathway, adoption not stated ?)'
    for res in (r2, r3):
        if (res.get(k) or {}).get('kind_change'): kind = res[k]['kind_change']
    m['source_kinds'][k] = kind; m['source_check'][k] = 'claude'
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('date') == D and c.get('check') == 1 for c in cl):
        cl.append({'check': 1, 'by': 'Claude (research agent)', 'date': D, 'where': f'checks/research_arch_v1/{ST}.md', 'what': 'figures quoted in the source entry'})
    for no, res, fn in ((2, r2, f'checkV2_result_{ST}.json'), (3, r3, f'checkV3_result_{ST}.json')):
        b, r = bad(res, k)
        if k in res and not any(c.get('date') == D and c.get('check') == no for c in cl):
            cl.append({'check': no, 'by': 'Claude (independent agent)', 'date': D, 'where': (r.get('where_read') or '')[:200],
                       'what': 'ok' if not b else f'{len(b)} claim(s) corrected or unconfirmed; see {fn}'})

TAG = '3 Nov 2026 (mitigation)'
LV = next(x for x in d['quantities'] if x['id'] == 'noise_level')
LM = next(x for x in d['quantities'] if x['id'] == 'noise_limit')
F_LV = (" ‖ " + TAG + ": Lp = Lw − 20·log10(r) − 8 − (path reduction), summed logarithmically over the plant groups (roof, yard, indoors; NSW 2021 s. 4.1 "
        "'summed logarithmically'; FHWA s. 3.1 energy addition). Only sourced reductions are credited: (1) solid screen around outdoor cooling plant: "
        "the lower of NSW 2021 s. 4.3 (8 dB if solid, within 20 m of the source, at least 4 m above the source floor, breaking line of sight to the "
        "receiver, 2 m beyond the source if not surrounding it) and FHWA s. 3.5.1 (5 dB at line-of-sight break + 1.5 dB per metre above it; cap 20 dB, s. 3.4.2); "
        "FHWA figures are for highway line sources and are used here only to lower the NSW credit (our extension ?); (2) cooling plant indoors in a plant "
        "room: NSW 2021 s. 4.3, 25 dB (solid walls, roof sheeting at least RW 47, gaps sealed, louvres at least the Table 4-5 insertion loss); "
        "(3) low-noise chiller variant (maker claim): Trane RTAF size 280, 1,010 kW, Lw 98 dBA low-noise vs 101 standard, replacing the basis chiller "
        "capacity for capacity; (4) night fan-speed reduction for dry coolers: ΔLw = 50·log10(N2/N1) (AMCA 301 as stated in Mathson 2008 p. 4), only "
        "for 0.6 ≤ N2/N1 (Annex A.2, informative), so at most 11.1 dB; heat rejection at the lower speed not checked (?). Source changes (3, 4) and "
        "path reductions (1, 2) add in dB through the formula; screens and plant rooms are not combined. No credit: per-unit housings ('enclose'), "
        "silencers (case values only), cooling towers (SPX gives 50 log as an upper bound, 'no greater than'), hybrid coolers.")
C_LV = (" ‖ " + TAG + ": screen height = max(4 m above the source floor, unit height + 2 m) so both methods reach 8 dB for a receiver level with the unit "
        "tops (FHWA 5 + 1.5 × 2 = 8); per receiver the credit is min(8, 5 + 1.5·e) where e = screen top − line of sight from the unit top (receiver "
        "height = tallest recorded building on the receiving lot; none recorded → no screen credit there ?); the 20 m test uses the farthest any unit "
        "lies from the screen toward the receiver. Mass: solid, at least 20 kg/m² (FHWA s. 3.4.2: transmission loss at least 20 dB(A); Ottawa ENCG allows "
        "10 kg/m² on rooftops with justification). A screen taller than the units conflicts with EVAPCO's layout rule that unit tops be level with or "
        "above any wall around them at these clearances (maker; more space or the maker's approval ?); a 3.7 m wall 1.8 m from a chiller cut capacity "
        "≥ 4.5% and raised power ≥ 6% (York, maker claim). Low-noise count: ceil(basis units × 1.489 / 1.010); the layout is still drawn with the basis "
        "unit (the Trane unit's size is not in the register ?). Case evidence (not used as credits): TELUS Regent, Vancouver (BKL 2025, FOI 2026-098): "
        "rooftop barrier −2 to −7 dBA, with silencers R1 57 → 48; Olds AB (OpenCycle 2026): combined measures −23.6 to −26.1 dBA, no per-measure split.")
F_LM = (" ‖ " + TAG + ": BLOCK only when no modelled option, alone or combined (source change + screen, or source change + plant room), brings the "
        "QUIETER rating under the night limit at every receiver; when one does, the set-up passes with that option named as required. Options are tried "
        "source first (low-noise units or night fan speed), then the screen, then both (Ottawa ENCG Intro p. 1: barriers only after other measures; "
        "Part 1 s. 3.3). FLAG when the STANDARD rating would need more than the option the quieter rating needs, or no option is enough for it. Neither "
        "by-law limits how the level is met: only the received level counts (Van 6555 ss. 2.1–2.3 'when received at a point of reception'; Edm 14600 "
        "ss. 19–22 'as measured at the property line'); Edmonton s. 14(3) nuisance applies whatever the dB level (not modelled).")
C_LM = (" ‖ " + TAG + ": generator testing (Van 6555 s. 4.1(c)) stays not checked (?): the research gives only a design intent for one generator "
        "enclosure (TELUS Regent, 65 dBA at 7 m), not a rated level for the tool's generator sets.")
if TAG not in LV['formula']: LV['formula'] += F_LV
if TAG not in LV['coef']: LV['coef'] += C_LV
if TAG not in LM['formula']: LM['formula'] += F_LM
if TAG not in LM['coef']: LM['coef'] += C_LM
ROLES_LV = [('arch_nz_nswDcNoise', 'screen 8 dB (conditions); plant room 25 dB; louvre IL Table 4-5; summed logarithmically', 'coefficient', 80),
            ('arch_nz_fhwaNBDH', 'screen 5 dB at line-of-sight break + 1.5 dB/m, cap 20 dB; 20 kg/m²; energy addition', 'coefficient', 85),
            ('arch_nz_ottawaENCG', 'rooftop barrier ≥ 10 kg/m²; barriers after other measures', 'rule', 85),
            ('traneRTAF', 'low-noise variant Lw 98 vs 101 at 1,010 kW (size 280)', 'coefficient', 50),
            ('arch_nz_amcaMathson', 'fan law 50 log(N2/N1); valid from 0.6 × base speed', 'method', 75),
            ('arch_nz_kaltraDC', 'EC fans limited at night to reduce noise (no dB)', 'context', 50),
            ('arch_nz_spxAEJB21A', 'towers: 50 log is an upper bound ("no greater than"): not credited', 'context', 70),
            ('arch_nz_bklTelusRegent', 'Vancouver case: rooftop barrier −2 to −7 dBA; generator enclosure 65 dBA @ 7 m', 'benchmark', 80),
            ('arch_nz_oldsNIAmit', 'Olds AB case: combined −23.6 to −26.1 dBA', 'benchmark', 75),
            ('arch_nz_cnossosDiv', 'point source divergence 20 lg d + 11', 'method', 90),
            ('arch_nz_cnossosDiff', 'diffraction cap 25 dB (horizontal edge)', 'benchmark', 85),
            ('arch_nz_hkEpdEM', 'barriers 5 to 10 dB(A); enclosure where > 20 dB(A)', 'benchmark', 70),
            ('arch_nz_piercyISO', 'ISO 9613-2 accuracy ±3 dB', 'context', 60)]
ROLES_LM = [('arch_nz_van6555s44', 'acoustic report only for construction or special-event exceptions', 'rule', 90),
            ('arch_nz_edm14600s14', 's. 14(3) nuisance whatever the dB level; s. 24(b) City Manager permit', 'rule', 90),
            ('arch_nz_ottawaENCG', 'order: source measures before barriers', 'rule', 85)]
for q, roles in ((LV, ROLES_LV), (LM, ROLES_LM)):
    sr = q.setdefault('source_roles', [])
    for sid, term, role, conf in roles:
        if sid not in q['sources']: q['sources'].append(sid)
        if not any(x['id'] == sid and x.get('added') == DP for x in sr):
            sr.append({'id': sid, 'term': term, 'role': role, 'conf': conf, 'verified': sid != 'arch_nz_daikinEWADTZXS', 'added': DP})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('new sources', n)
