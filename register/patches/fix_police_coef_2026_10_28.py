"""B3 follow-up (28 Oct 2026): the vanBudget2026 coef fix was skipped by the patch's own guard (the new wording already
appeared in the source text). Applies it to the part text: utilities are the largest spending share, police second."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
a, b = 'police the largest spending share', 'utilities the largest spending share (24%), police second (22%)'
for f, kw in (('register/formula_register.json', dict(ensure_ascii=False, indent=1)), ('tool/opps.json', dict(ensure_ascii=False, separators=(',', ':')))):
    p = R / f; t = p.read_text(); n = t.count(a); p.write_text(t.replace(a, b)); print(f, n)
