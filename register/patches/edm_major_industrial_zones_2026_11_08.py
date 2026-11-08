"""8 Nov 2026 (J.B., Engineering gate item 6): keep EETC (rule: a data centre is allowed wherever Major Industrial is permitted). Code searched the whole text of
J.B.'s Zoning Bylaw 20001 copy (Claude Link Bylaw20001.zip, every standard and special-area zone in it, spacing in the PDF text allowed for): Major Industrial is a
Permitted Use only in IH (s. 2.140, 2.1) and EETC (s. 3.52, 2.1); IM lists it only where existing on 1 Jan 2024 (s. 2.130, 2.3); FD (s. 2.240) and every other zone
do not list it. Direct Control zones (DC1, DC2) carry their own site provisions, not in this text: site by site (?)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']
TAG = ' ‖ 8 Nov 2026 (zone search)'
if TAG not in S['edm_dc_major']:
    S['edm_dc_major'] += (TAG + ": Code searched the whole Bylaw 20001 text (J.B.'s copy): Major Industrial is permitted only in IH (2.140, 2.1) and EETC (3.52, 2.1); "
        "IM only where existing on 1 Jan 2024 (2.130, 2.3); FD (2.240) and all other standard and special-area zones do not list it; Direct Control zones are site by site (?). "
        "J.B. 8 Nov 2026: keep EETC; the rule is wherever Major Industrial is permitted.")
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('edm major industrial zones')
