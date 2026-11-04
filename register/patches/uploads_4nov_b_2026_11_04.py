"""4 Nov 2026 (checks/research_arch_v1/BRIEF_uploads_4nov_b.md): register pass B, ids arch_up4_*.
BS EN 12572-1/-2:2017 (climbing walls; -3 is the same text as the 3 Nov upload, arch_up2_en12572_3), BSI drafts for public comment
prEN 12572-1/-2:2025 (DRAFT, not in force), ASHRAE Handbook HVAC Applications 2023 ch. 52 Snow Melting (replaces the 2015 ch. 51 as the
public-edge benchmark) and ch. 6 Indoor Swimming Pools, CSA Z8000:24 screenshots (Clause 9.2, Table 9.2, Clause 12).
Check 1: Claude reading (pdftotext -layout; screenshots read as images). Check 2: scripted re-find in a fresh extraction
(pdftotext -raw; tesseract OCR), checks/research_arch_v1/checkV2_result_uploads_4nov_b.json; same agent, no independent agent available.
Uploads and screenshots are not committed; paths point to J.B.'s upload folder. Summary: checks/research_arch_v1/uploads_4nov_b.md."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
A = R / 'checks/research_arch_v1'
F = 'checks/research_arch_v1/checkV2_result_uploads_4nov_b.json'
D = '4 Nov 2026'
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
src = json.load(open(A / 'uploads_4nov_b_sources.json')); res = json.load(open(R / F))
KIND = {
 'arch_up4_en12572_1': 'standard (European, benchmark outside Canada)',
 'arch_up4_en12572_2': 'standard (European, benchmark outside Canada)',
 'arch_up4_prEN12572_1': 'standard (DRAFT for public comment, not in force; outside Canada)',
 'arch_up4_prEN12572_2': 'standard (DRAFT for public comment, not in force; outside Canada)',
 'arch_up4_ashraeCh52': 'design guide (paywalled; US cities only, benchmark)',
 'arch_up4_ashraeCh6Pools': 'design guide (paywalled; US, benchmark)',
 'arch_up4_csaZ8000_12': 'standard',
 'arch_up4_csaZ8000_9': 'standard',
}
NOTE = {
 'ashrae2015ch51': " ‖ SUPERSEDED for the public edge (4 Nov 2026): 2023 edition ch. 52 (arch_up4_ashraeCh52); Table 1 and Table 3 values re-found unchanged in 2023; the 2015 sentence 'usually 630 to 950 W/m2, which includes back and edge losses' is not in the 2023 text, which gives Table 7 instead (440 / 555 / 665 W/m² at 300 / 230 / 150 mm, mean fluid 55 °C)",
 'arch_hce_ashraeCh51Cold': " ‖ 2023 EDITION (4 Nov 2026, arch_up4_ashraeCh52): every Table 1 and Table 3 figure above re-found unchanged (Table 3 on p. 52.6); still no Canadian city",
 'arch_up2_en12572_3': " ‖ 4 Nov 2026: second upload (10252feb-BS_EN_12572-3_2017_4_Nov_2026_07-03PM_UTC.pdf) has the same text (pdftotext diff empty); Parts 1 and 2 now read: arch_up4_en12572_1, arch_up4_en12572_2",
 'arch_pub_en12572cat': " ‖ STANDARD TEXT (4 Nov 2026, arch_up4_en12572_2 cl. 4.1 p. 5): 4 500 mm maximum, 4 000 mm where it is possible to stand on top, confirmed",
 'arch_hce_en12572_1sample': " ‖ FULL TEXT (4 Nov 2026, arch_up4_en12572_1): preview figures confirmed; cl. 4.7 falling space 2 m behind, 1,5 m either side, 8 m below the protection points; cl. 4.8 free space has no dimension",
 'arch_hsg_sccZ8000': " ‖ 4 Nov 2026: CSA Z8000:24 pages read from J.B. screenshots (UBC Library licence): arch_up4_csaZ8000_9, arch_up4_csaZ8000_12",
}
n = 0
for k, v in src.items():
    if k.startswith('_'): continue
    if k not in S: n += 1
    S[k] = v; m['source_kinds'][k] = KIND[k]; m['source_check'][k] = 'claude'
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('check') == 1 and c.get('date') == D for c in cl):
        cl.append({'check': 1, 'by': 'Claude (register agent)', 'date': D, 'where': 'J.B. upload; pdftotext -layout / screenshots read as images; checks/research_arch_v1/uploads_4nov_b.md', 'what': 'figures quoted with clause and page'})
    r = res.get(k)
    if r and not any(c.get('check') == 2 and c.get('date') == D for c in cl):
        b = [c for c in r['claims'] if c['verdict'] != 'OK']
        art = [c for c in r['claims'] if c.get('note')]
        what = (f"ok: {len(r['claims'])} quoted figures re-found" if not b else f"{len(b)} claim(s) not found") + (f" ({len(art)} after an extraction artefact, by eye)" if art else '') + f"; see {F}"
        cl.append({'check': 2, 'by': 'Claude (same agent, scripted re-find in a separate extraction; not independent)', 'date': D, 'where': r['where_read'], 'what': what})
for k, t in NOTE.items():
    if t not in S[k]: S[k] += t
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('date') == D and 'uploads_4nov_b' in c.get('where', '') for c in cl):
        c = 3 if any(e.get('check') == 2 for e in cl) else 2
        cl.append({'check': c, 'by': 'Claude (register agent)', 'date': D, 'where': 'J.B. uploads 4 Nov 2026 (uploads_4nov_b)', 'what': 'note added; figures compared with the new upload'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('new sources', n)
