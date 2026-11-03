"""2 Nov 2026: J.B.'s decision — noise by-law limits are hard rules (code audit site 1, 23; exchanges F12).
Records the block/flag rule and where the level is measured in the noise_limit quantity (formula and coef). Tool code: engine.js noiseCheck,
site.js model() (m.warn / m.notes). Texts read by Claude from the saved copies: data/raw/van/6555.txt (s. 1.2 'point of reception',
ss. 2.1–2.3, s. 4.1(c)) and the Bylaw 14600 consolidation (ss. 20(1), 22(1)), both already indexed (bylaw6555, van6555zones,
src_fill_van6555s21, bylaw14600, arch_adj_edm14600)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text())
q = next(x for x in d['quantities'] if x['id'] == 'noise_limit')
TAG = '2 Nov 2026 (J.B.): hard rule'
F = (" ‖ " + TAG + ": BLOCK a set-up or size when the level from the cooling plant with the QUIETER unit rating (low end of noise_level) exceeds the "
     "night limit at any neighbouring lot; FLAG (note, not a block) when only the STANDARD (louder) rating exceeds it. Night limit governs: the plant runs 24 h. "
     "Measured at the point of the receiving lot nearest the centre of the cooling units: Vancouver By-law 6555 s. 1.2 'point of reception' (a point in the lane "
     "or street adjacent to but outside the recipient's property, at the shortest distance to the source; where no lane, street or other public property lies "
     "between, any point outside the source's property line); Edmonton Bylaw 14600 ss. 20(1), 22(1) 'as measured at the property line of a property zoned for …'. "
     "Where no lot outline holds a neighbouring building, its outline is used, labelled (building, not property line: reads low ?). A lot with no zoning "
     "record, or an Edmonton mixed-use or Direct Control lot, blocks only above the looser possible limit (Van 55/65 by source zone; Edm 60) and is flagged "
     "above the stricter one.")
C = (" ‖ " + TAG + ": limits used, night, by source zone → receiving zone (sections): Van quiet source s. 2.1(b)(i) 45 / (ii) 55; intermediate s. 2.2(b)(i) 50 / "
     "(ii) 65; activity or event s. 2.3(b)(i) 55 / (ii) 65; Edm residential s. 20(1) 50, other s. 22(1) 60. Lp = Lw − 20 log r − 8, r ≥ 5 m (tool near-field "
     "floor), horizontal distance; receivers: lots holding a building within 1.5 km. No reduction credited for screens, enclosures or indoor plant (no verified "
     "dBA figure ?). Generator testing (By-law 6555 s. 4.1(c): ≤ once a month, daytime, ≤ 60 min, plus once a year ≤ 180 min, ≤ 80 dBA at the point of "
     "reception or 6.1 m, whichever is greater): not checked (?), no rated generator sound level with a source in the register.")
if TAG not in q['formula']: q['formula'] += F
if TAG not in q['coef']: q['coef'] += C
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
