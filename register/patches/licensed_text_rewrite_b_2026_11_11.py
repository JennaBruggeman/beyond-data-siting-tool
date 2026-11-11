"""11 Nov 2026 (J.B.): second scope call on licensed text. OP S710 (Finnish insurer's safety regulation) treated as licensed,
like FM; the EN 253 sentence quoted by Energiforsk 2022:872 paraphrased;
the CIBSE guide line quoted in Dudzińska 2021 paraphrased (J.B. 11 Nov 2026, later the same day). Same method as licensed_text_rewrite_2026_11_11.py:
figures, units, clause and page numbers kept; titles kept. Energiforsk's own sentences stay quoted (report text, not the standard).
Idempotent: each old passage must be found once, or its paraphrase must already be there.
"""
import json, pathlib, re
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'
d = json.loads(p.read_text(encoding='utf-8'))
S = d['new_sources']

E = [
 ('arch_sec2_opS710', [
  ("4.2 'Any unmanned data centre should be located in the middle of a building in a windowless room'",
   "4.2 an unmanned data centre sits in the middle of a building, in a room without windows"),
  ("'It must not be possible to remove the construction or any part of it from the outside without breaking it'",
   "no part of the construction can be removed from outside without breaking it"),
  ("'A Class 3 anti-burglar wall'",
   "a Class 3 burglar-resistant wall"),
  ("4.5 water hazards above: 'toilets and washrooms, water-circulation central heating', production processes, roof",
   "4.5 water hazards above: toilets and washrooms, water-based central heating, production processes, roof"),
  ("'built above ground floor or the equipment must be on a raised platform'",
   "the room is above the ground floor, or the equipment stands on a raised platform"),
 ]),
 ('arch_tmp_dudzinska2021', [
  ("CIBSE (cited) for multi-purpose halls 'the optimal operative temperature may be between 12 and 18 °C depending on the type of activity'",
   "CIBSE (cited) for multi-purpose halls: optimal operative temperature possibly 12 to 18 °C, depending on the activity"),
 ]),
 ('en253Life', [
  ("'EN 253 (2019) states that the service life shall be 30 years at 120 °C'",
   "EN 253 (2019) service life: 30 years at 120 °C (second-hand, as the report gives it)"),
 ]),
 ('energiforsk2022life', [
  ("'EN 253 (2019) states that the service life shall be 30 years at 120 °C with single peaks of 140 °C'",
   "EN 253 (2019) service life: 30 years at 120 °C, with single peaks of 140 °C (second-hand, as the report gives it)"),
 ]),
]

# 11 Nov 2026 (from-scratch rebuild): an old patch may load a checks/ file whose quote was paraphrased there in its own words;
# then neither this old passage nor this paraphrase is in the entry. Accepted when none of the old passage's quoted words remain.
QW = re.compile(r"'([^']{12,})'|\"([^\"]{12,})\"")
def upstream(old, s):
    inner = [a or b for a, b in QW.findall(old)]
    return bool(inner) and not any(t in s for t in inner)
n_done = n_already = n_up = 0
for k, pairs in E:
    s = S[k]
    for old, new in pairs:
        c = s.count(old)
        if c == 1:
            s = s.replace(old, new); n_done += 1
        elif c == 0 and new in s:
            n_already += 1
        elif c == 0 and upstream(old, s):
            n_up += 1
        else:
            raise SystemExit(f'{k}: found {c} times: {old[:80]}')
    S[k] = s
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print(f'{len(E)} entries; {n_done} passages rewritten, {n_already} already done, {n_up} paraphrased upstream')
