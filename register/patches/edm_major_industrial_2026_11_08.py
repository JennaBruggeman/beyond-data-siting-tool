"""8 Nov 2026 (J.B.): every data centre in Edmonton is treated as Major Industrial (strictest reading; Claude Link edmonton_data_centre_use_class_2026-11-08.md).
Source: City of Edmonton, "Data Centre Development" (https://www.edmonton.ca/business_economy/economic_investment/data-centre-development), saved by J.B.
as PDF 8 Nov 2026: "Large-scale data centres are considered a Major Industrial Use in Edmonton's Zoning Bylaw and would only be allowed in areas designated
for these uses. An applicant would be required to apply for a rezoning ..." (quote as read in Cowork's note; Code could not read the PDF's text layer).
The page names only large-scale data centres and gives no size threshold, so the tool applies it to every data centre. Guidance, not bylaw text: trust 80.
Zoning Bylaw 20001 (J.B.'s copy, Claude Link Bylaw20001.zip, read 8 Nov 2026): Major Industrial is a Permitted Use in IH (s. 2.140, 2.1) and EETC (s. 3.52, 2.1);
IM lists it 'limited to those existing as of January 1, 2024' (s. 2.130, 2.3), so a new one needs a rezoning; BE (s. 2.120), EETB, EETL, EETM, EETIM, EIB and
EIM do not list it (rezoning); FD (s. 2.240) does not list it (Minor Industrial only as temporary outdoor storage, 3.9): rezoning.
The 'deemed use, always discretionary' path (s. 7.20 3.3.2) is no longer used for data centres: the City names the Use.
tool/data/zones.json ZE rows keep their limits (drawn for comparison, flagged) and get 'path': 'permitted' or 'rezoning'."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']; m = d['meta']
D = '8 Nov 2026'; SID = 'edm_dc_major'
S[SID] = ('GUIDANCE (government web page): City of Edmonton, "Data Centre Development", https://www.edmonton.ca/business_economy/economic_investment/data-centre-development, '
  'saved by J.B. as PDF 8 Nov 2026 (9:05 am; Downloads "Data Centre Development _ City of Edmonton.pdf"): "Large-scale data centres are considered a Major Industrial Use in '
  'Edmonton\'s Zoning Bylaw and would only be allowed in areas designated for these uses. An applicant would be required to apply for a rezoning and, in some cases, a land use '
  'plan amendment ... to build a large-scale data centre in an area that doesn\'t currently allow major industrial uses." Quote as read by Cowork (Claude Link '
  'edmonton_data_centre_use_class_2026-11-08.md); Code could not read the PDF text layer. No size threshold is given. Decision (J.B., 8 Nov 2026): every data centre in '
  'Edmonton is treated as Major Industrial. With Zoning Bylaw 20001 (J.B.\'s copy, read 8 Nov 2026): Major Industrial permitted in IH s. 2.140 2.1 and EETC s. 3.52 2.1; '
  'IM s. 2.130 2.3 only those existing on 1 Jan 2024 (new = rezoning); not listed in BE s. 2.120, EETB, EETL, EETM, EETIM, EIB, EIM, FD s. 2.240 (rezoning). Trust 80 '
  '(government guidance, not bylaw text).')
m['check_log'].setdefault(SID, []).append({'check': 1, 'by': 'J.B. (saved page) + Cowork read', 'date': D, 'where': 'Claude Link edmonton_data_centre_use_class_2026-11-08.md', 'what': 'Major Industrial for every data centre; use lists checked in Bylaw 20001 by Code'})
TAG = ' ‖ 8 Nov 2026 (J.B.)'
def add(sid, txt):
    if TAG not in S[sid]: S[sid] += TAG + ': ' + txt
add('edm20001', 'every data centre is treated as Major Industrial (register edm_dc_major); the s. 7.20 3.3.2 deemed-use path is no longer used for data centres.')
add('arch_zon_Edm720', 'no longer applied to data centres: the City names the Use (Major Industrial, register edm_dc_major).')
for q in d['quantities']:
    if q['id'] == 'zoning_status' and TAG not in q['coef']:
        q['coef'] += TAG + ': every Edmonton data centre is treated as Major Industrial (edm_dc_major): permitted in IH and EETC only; IM (new), BE, EETB, EETL, EETM, EETIM, EIB, EIM, FD need a rezoning.'
        q.setdefault('sources', []); 
        if SID not in q['sources']: q['sources'].append(SID)
for c in d['conditions']:
    if c['id'] == 'r_arch_zone_allowed':
        c['test'] = c['test'].replace('Edmonton IH, IM, BE, EETB, EETC, EETL, EETM, EETIM, EIB, EIM', 'Edmonton IH, EETC (every data centre treated as Major Industrial, J.B. 8 Nov 2026, edm_dc_major)')
    if c['id'] == 'z_edm_class' and TAG not in c['note']:
        c['note'] += TAG + ': the tool now treats every data centre as Major Industrial (edm_dc_major); the Minor Industrial argument is not used to widen where one can go.'
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
# zones.json: the path per Edmonton row, and the data-centre clause re-worded
z = R / 'tool/data/zones.json'; Z = json.loads(z.read_text(encoding='utf-8')); ZE = Z['ZE']
LINE = 'The City treats large-scale data centres as Major Industrial; it gives no size threshold, so the tool applies it to every data centre.'
NEW = {
 'IH': ('permitted', 'Major Industrial is Permitted. ' + LINE, 'IH s. 2.140, 2.1; City "Data Centre Development" (edm_dc_major)'),
 'EETC': ('permitted', 'Major Industrial is Permitted (no significant nuisance inside the 1.5 km Risk Buffer, 4.1–4.2). ' + LINE, 'EETC s. 3.52, 2.1, 4.1–4.2; edm_dc_major'),
 'IM': ('rezoning', 'Major Industrial only where it existed on 1 Jan 2024, so a new data centre needs a rezoning. ' + LINE, 'IM s. 2.130, 2.3; edm_dc_major'),
 'BE': ('rezoning', 'Major Industrial is not listed, so a data centre needs a rezoning. ' + LINE, 'BE s. 2.120, 2; edm_dc_major')}
for k in ('EETB', 'EETL', 'EETM', 'EETIM', 'EIB', 'EIM'):
    NEW[k] = ('rezoning', 'Major Industrial is not listed, so a data centre needs a rezoning. ' + LINE, f'{k} s. 2; edm_dc_major')
for k, (path, t, s) in NEW.items():
    if k not in ZE: continue
    r = ZE[k]; r['path'] = path
    for c in r['cl']:
        if c[0] == 'Data centre': c[1] = t; c[2] = s
    if SID not in r['src']: r['src'].append(SID)
missing = [k for k in ZE if 'path' not in ZE[k]]
assert not missing, missing
z.write_text(json.dumps(Z, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('edm major industrial', {k: ZE[k]['path'] for k in ZE})
