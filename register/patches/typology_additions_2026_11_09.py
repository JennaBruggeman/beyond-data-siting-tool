"""9 Nov 2026 (J.B.): Claude Link register_additions_2026-11-09_heat_cascade.md and register_additions_2026-11-09_community_pool.md, from the
Heat cascade and Community pool typology chats. Read once by Cowork from J.B.'s saved by-law copies (pdftotext, page numbers not recorded);
no second check. Trust as given in the files.

One entry per document (meta id_aliases, as on 8 Nov): clause-level additions are appended to the existing entry, tagged 'Spec, not live
yet' because only a typology spec uses the new clauses; the entries themselves stay live where they already were (zoning cards).
Proposed ids that duplicate an existing entry become aliases.

Every other id the two specs cite was already in the register (checked 9 Nov against Claude Link heat_cascade/specs/heat_cascade.md and
community_pool/specs/community_pool.md, and checks/research_typ/*_sources.json: none missing). But 14 of them hung on no part, so the logic
view did not show them. They now hang on one part per spec, status 'spec, not live yet', as typology_spec_rules did for the Emergency hub."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']; m = d['meta']
D = '9 Nov 2026'
HC, CP = 'Claude Link register_additions_2026-11-09_heat_cascade.md', 'Claude Link register_additions_2026-11-09_community_pool.md'
RD = "Read once by Cowork from J.B.'s saved copy (pdftotext; page numbers not recorded); no second check. Trust 90."

def log(k, where):
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('date') == D and c.get('where') == where for c in cl):
        cl.append({'check': 1, 'by': 'Cowork (typology chat)', 'date': D, 'where': where, 'what': 'read once; trust as given'})

def extend(k, txt, where):
    tag = f' ‖ {D} ({where.split()[-1]})'
    if tag not in S[k]: S[k] += tag + ': ' + txt
    log(k, where)

# --- Heat cascade: clause detail on existing entries ---
extend('van_zdb_i2', "I-2 District Schedule, June 2026, s. 2.1 and 2.2.10: Beauty and Wellness Centre conditional, 'limited to hydrotherapy and "
  "thermal therapy'; Urban Farm - Class B conditional; Community Centre or Neighbourhood House conditional; Park or Playground conditional; Bulk Data "
  f"Storage conditional (2.2.7 ground floor); Swimming Pool and Fitness Centre not listed. {RD} Spec, not live yet (Heat cascade Part 2a; Warm bath; Community pool).", HC)
extend('van_zdb_i3', "I-3 District Schedule, June 2026, s. 2.1, 2.2.11, 2.2.12, 3.1.1.1(b), 4.1.2(d): Beauty and Wellness Centre conditional, same "
  "limit (2.2.12); Fitness Centre conditional; Urban Farm - Class B conditional; Bulk Data Storage conditional, sub-area A only (2.2.11 ground floor); "
  "Health Care Office 2.2.6 ground floor; FSR 1.00 for all other uses combined; fitness or recreation amenity excluded up to the lesser of 20 % or "
  f"100 m2. {RD} Spec, not live yet (Heat cascade Part 2a; Emergency hub spec).", HC)
extend('van_zdb_s2', "Section 2, June 2026: 'Beauty and Wellness Centre' includes hydrotherapy, thermal therapy, massage, 'but does not include "
  "Fitness Centre'; Swimming Pool and Park or Playground are Cultural and Recreational uses (definition text not located in the extract ?); 'Urban "
  f"Farm - Class B' 'may take place in a greenhouse or other structure'; also 'Bulk Data Storage', 'Plaza', use lists. {RD} Spec, not live yet (Heat cascade Part 2a).", HC)
extend('edm_bl20001', "BE s. 2.120 (2.9, 2.10, 2.12, 2.19, 2.25; 3.3.1, 3.7.1, 3.12.1, 3.16.1, 3.18); IM 2.130 (2.3, 2.7, 2.16); IH 2.140 (2.1-2.2); "
  "8.10 definitions: BE Indoor Sales and Service permitted, 500 m2 per establishment (3.7.1); Community Service permitted, 500 m2 (3.12.1), 'community "
  "recreation centres' in its definition; Urban Agriculture permitted, 'within or on a building' (3.16.1); Minor Indoor Entertainment permitted "
  "('fitness facilities, gyms'); 3.18 variance to Floor Area caps with mitigation; IM: Indoor Sales and Service only where existing on 1 Jan 2024; "
  f"IH: Major Industrial permitted, no commercial or community uses. Read from J.B.'s saved Bylaw20001.zip. {RD} Spec, not live yet (Heat cascade Part 2a).", HC)
# new: the City's summary table, kept as the conflict record only
if 'van_landUseTable2023' not in S:
    S['van_landUseTable2023'] = ("REFERENCE ONLY, SUPERSEDED: City of Vancouver, 'Land Uses by Zoning District', Oct 2023 (summary table; web, read through "
      "WebFetch, small-model read). Out of date against the June 2026 district schedules: reads Bulk Data Storage and Urban Farm - Class B as outright "
      "in I-2 and I-3 and omits Beauty and Wellness Centre. The schedules govern (van_zdb_i2, van_zdb_i3). Kept as the conflict record only; no figure "
      f"uses it. Trust 50 (reference only). Spec, not live yet (Heat cascade Part 2a, conflict record). ({HC})")
m['source_kinds']['van_landUseTable2023'] = 'city web page (reference only, superseded)'
log('van_landUseTable2023', HC)

# --- Community pool: proposed ids are clauses of documents already in the register -> aliases, detail appended ---
CPA = {
 'van_zdb_unlisted': ('van_zdb_i3', "I-3 s. 2.2.15 and I-2 s. 2.2.13 (June 2026): 'Any other use that is not specifically listed and defined as a use in "
   "Section 2 of this by-law may be permitted as a conditional approval use if the Director of Planning considers the use to be comparable in nature to "
   "the uses listed in section 2.1': so a use that is listed in Section 2 (Swimming Pool) but not in the schedule cannot come in this way: rezoning "
   f"(our reading). {RD} Spec, not live yet (Community pool Part 2: Vancouver = rezoning)."),
 'van_zdb_i3_fitness': ('arch_pub_vanSched', "I-3 s. 2.1 (June 2026): Fitness Centre conditional (2.2.1); Community Centre or Neighbourhood House "
   "conditional; Hall conditional; no Swimming Pool row. I-2 s. 2.1: Community Centre conditional, no Fitness Centre, no Swimming Pool. "
   f"{RD} Spec, not live yet (Community pool Part 2)."),
 'edmZB_indoorEnt': ('arch_pg_edmUseDefs', "s. 8.10 'Minor Indoor Entertainment': indoor facilities for entertainment or active recreation, a local "
   "or district attraction, examples 'climbing facilities, fitness facilities, gyms'; 'Major Indoor Entertainment': a regional or city attraction, "
   "examples include aquariums, arenas and sports or entertainment complexes; Major capped at 500 m2 in BE (2.120 3.3.1), Minor uncapped. Neither names "
   f"swimming pools. Read from J.B.'s saved edm_bl20001 PDF. {RD} Spec, not live yet (Community pool Part 2: Edmonton gym permitted; pool use class ?)."),
}
for a, (k, txt) in CPA.items():
    m['id_aliases'][a] = f'{k} ({D}: one entry per document)'
    extend(k, txt, CP)
# I-2 s. 2.2.13 is the I-2 half of van_zdb_unlisted
extend('van_zdb_i2', "s. 2.2.13 (June 2026): the 'any other use' conditional clause, same words as I-3 2.2.15 (see van_zdb_i3). Spec, not live yet (Community pool Part 2).", CP)
# the community pool file names nbcAE2023 as already registered; the register's id is nbcAB2023
m['id_aliases'].setdefault('nbcAE2023', f'nbcAB2023 ({D}: id used in Claude Link register_additions_2026-11-09_community_pool.md)')

# --- spec-only parts so every source the two specs use shows in the logic view ---
PARTS = [
 ('heat_cascade_spec_rules', 'Heat cascade spec rules (spec, not live yet)',
  "rules and figures the Heat cascade spec (Claude Link heat_cascade/specs/heat_cascade.md) will apply once built into the tool: which zones allow "
  "each heat use, snow-melt and pool heat loads, cascade temperatures. Not computed by the tool yet.",
  ['van_zdb_i2', 'van_zdb_i3', 'van_zdb_s2', 'edm_bl20001', 'van_landUseTable2023', 'arch_hce_vbblCanopy', 'arch_hp_vanAquaticDPB2025',
   'arch_up2_bcPoolGuide', 'arch_up3_edmWinterDG', 'arch_up4_ashraeCh52', 'arch_up4_ashraeCh6Pools', 'typ_community_pool_bcPoolGuide51',
   'typ_heat_cascade_ashraeCh52T6', 'typ_heat_cascade_lund2005', 'typ_warm_bath_bcPoolGuide', 'typ_warm_bath_bcbc3131']),
 ('community_pool_spec_rules', 'Community pool spec rules (spec, not live yet)',
  "rules and figures the Community pool spec (Claude Link community_pool/specs/community_pool.md) will apply once built into the tool: which zones "
  "allow a pool or gym (Vancouver: rezoning), pool and change-room sizes, climbing-wall clearances. Not computed by the tool yet.",
  ['van_zdb_i2', 'van_zdb_i3', 'arch_pub_vanSched', 'arch_pg_edmUseDefs', 'arch_bcPoolDesign2025', 'arch_sup_edmMillWoods2013', 'arch_up2_bcPoolGuide',
   'arch_up4_ashraeCh6Pools', 'arch_up4_en12572_2', 'typ_community_pool_bcPoolGuide51', 'typ_warm_bath_bcbc3131']),
]
have = {q['id'] for q in d['quantities']}
for pid, name, formula, src in PARTS:
    for s in src: assert s in S or s in d['old_sources'], s
    if pid not in have:
        d['quantities'].append({"id": pid, "name": name, "stage": "test", "unit": "rules", "formula": formula, "inputs": ["massing"],
          "coef": "see each source; trust 90 (by-law clauses, codes), lower for benchmarks outside Canada and guides; 50 for van_landUseTable2023 (reference only, superseded)",
          "sources": src, "conf": 50, "status": f"spec, not live yet ({D})"})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('typology additions: 4 + 4 entries extended, 1 new source, 4 aliases, 2 spec-only parts')
