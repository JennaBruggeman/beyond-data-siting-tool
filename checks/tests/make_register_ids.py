# The register's ids as one list for the tool (audit C13, 12 Nov 2026): every quoted id-like string in register/formula_register.json
# (part ids, source and coefficient ids). The tool shows these as small grey tags in "Sources and assumptions"; other code-like tokens are dropped.
# Generated, never hand-edited. Usage: python checks/tests/make_register_ids.py  (writes tool/data/register_ids.json)
import json, re, os
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
s = open(os.path.join(root, 'register', 'formula_register.json'), encoding='utf-8').read()
ids = sorted(set(m for m in re.findall(r'"([A-Za-z][A-Za-z0-9_]{2,60})"', s) if ('_' in m or re.search(r'[a-z][A-Z]', m) or re.search(r'[a-z]\d', m))))
json.dump({'_about': 'Register ids (generated from register/formula_register.json by checks/tests/make_register_ids.py).', 'ids': ids}, open(os.path.join(root, 'tool', 'data', 'register_ids.json'), 'w', encoding='utf-8'), indent=0)
print(len(ids), 'ids')
