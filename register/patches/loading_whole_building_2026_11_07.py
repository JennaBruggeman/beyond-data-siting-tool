"""7 Nov 2026 (WORKLIST 2, loading count): does the loading count use the whole building or each use?
Re-read by Claude Code from local copies: Bylaw 20001 (Desktop/Claude Link/Bylaw20001.zip, adopted text effective 1 Jan 2024; Part 5.80
subs. 7, PDF p. 844) and Vancouver Parking By-law s. 5 (Claude Link beyond-data-sources/public/vanParking5/full.pdf, page footers May 2026, p. 5-1).
Edmonton: one threshold on the building's non-residential Floor Area; Vancouver: each class of use counted separately and summed.
Updates the two sources (quotes), arch_ratios (formula and coef), and adds a condition."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); m = d['meta']; S = d['new_sources']
D = '7 Nov 2026'
def log(k, where, what):
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('date') == D and c.get('where') == where for c in cl):
        cl.append({'check': 3, 'by': 'Claude Code (re-read for the loading-count fix)', 'date': D, 'where': where, 'what': what})
def add_to(k, text):
    tag = ' ‖ ' + D + ' loading count re-read: '
    if tag not in S[k]: S[k] = S[k] + tag + text
add_to('edmZB580',
  "Table 7.2 'Minimum Loading Space Quantities': 7.2.1 'Less than 2,500 m2 of Floor Area in the case of non-Residential Uses or less than 100 "
  "Dwellings' 0; 7.2.2 'Between 2,500 m2 and 7,500 m2 of Floor Area in the case of non-Residential Uses or 100 to 199 Dwellings' 1; 7.2.3 'Greater "
  "than 7,500 m2 of Floor Area in the case of non-Residential Uses or 200 Dwellings or greater' 2. No clause splits the count by use. 8.20: 'Floor "
  "Area means the area of a building or structure, contained within the outside surface of the exterior and Basement walls.' Reading (ours): one "
  "count on the building's total non-residential floor area, so a data centre and its programs in one building are added. 1.17.2: loading-space "
  "numbers with a tenth of 0.5 or more round up.")
log('edmZB580', 'Desktop/Claude Link/Bylaw20001.zip (pdftotext), PDF pp. 844, 950, General Definitions', 'Table 7.2, 8.20 Floor Area, 1.17.2 quoted')
add_to('vanParking5',
  "s. 5.1 'Multi-Use Developments' (p. 5-1): 'For the purposes of this section, uses with the same formula for determining required loading spaces "
  "shall be considered to be of the same class. If a development contains more than one use as defined in section 5.2, the total number of loading "
  "spaces shall be the sum of the loading spaces required for the various classes of uses calculated separately and, unless otherwise permitted by the "
  "Director of Planning, in consultation with the City Engineer, taking into account the time-varying demand of uses, a loading space required for one "
  "use shall be deemed not to meet the requirement for any other use in that development.' 'Uses Not Listed': 'If a use is not listed in the tables, "
  "the number of loading spaces shall be calculated on the basis of a similar use as determined by the Director of Planning.' 'Rounding of Fractional "
  "Numbers': 'the nearest whole number above zero shall be taken'. Row 5.2.3 (community centre, activity centre or similar place of assembly; fitness "
  "centre; pool or similar place with spectator facilities): Class B one space for each 2 800 m², none under 100 m² (table layout read as text; "
  "row-to-figure match as in arch_up3_vanPkg5).")
log('vanParking5', 'Claude Link beyond-data-sources/public/vanParking5/full.pdf (pdftotext), p. 5-1 to 5-4', 's. 5.1 Multi-Use Developments, Uses Not Listed, rounding quoted')
q = {x['id']: x for x in d['quantities']}['arch_ratios']
F = ("; loading count (7 Nov 2026): Edmonton counts the whole building's non-residential floor (data centre + programs: picked block programs, or "
     "before any pick the Ratios programs' share; Table 7.2); Vancouver counts each class separately and adds them (s. 5.1): the data centre in row "
     "5.2.5, picked refuge, warming shelter, gym and pool in row 5.2.3 (our reading), other programs '?' (Director of Planning)")
if 'loading count (7 Nov 2026)' not in q['formula']: q['formula'] += F
C = ("; loading count: picked programs are counted even where Arrange cannot draw them (e.g. a pool over the BE area cap): an overcount, flagged; "
     "Vancouver programs outside row 5.2.3 are not counted (?)")
if 'loading count: picked programs' not in q['coef']: q['coef'] += C
Cs = {c['id']: c for c in d['conditions']}
if 'r_loading_whole_building' not in Cs:
    d['conditions'].append({"id": "r_loading_whole_building", "heading": "6 Regulatory", "name": "Loading counted for the whole building, not the data centre alone",
      "test": "Edmonton: one Table 7.2 threshold on the building's non-residential floor (data centre + programs); Vancouver: each class of use counted separately and summed (Parking By-law s. 5.1), uses not listed set by the Director of Planning",
      "quantities": ["arch_ratios"], "move": ["policy"], "parties": ["operator", "city"], "constraint": True,
      "note": "Before 7 Nov 2026 the tool counted the data centre's floor only, so 64 Airport Rd (2,399 m²) and 74 Airport Rd at 3.7 MW (2,412 m²) fell under Edmonton's 2,500 m² trigger and drew no bay.",
      "sources": ["edmZB580", "vanParking5", "arch_up3_vanPkg5"], "next_action": "independent check of the 1425 Clark Dr and E06A/E06B bays (WORKLIST 2)"})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('loading count: sources, arch_ratios and condition updated')
