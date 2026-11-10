"""9 Nov 2026 (J.B.): register rows from the typology chats' research notes in Claude Link:
research_small_lot_plant_2026-11-09.md, research_pool_FCL_supplytemp_2026-11-09.md, NOTE_TO_MAIN_heat_cascade_2026-11-09.md s. 8
(VBBL 2025 3.2.2.29, .31, .77), the Parking By-law 5.1.5 and 5.1.6 readings in community_pool/, and the rows of
register_additions_2026-11-09_community_pool.md added after typology_additions_2026_11_09.py ran (file edited 18:51).
Every quote was checked against the source by a separate Code agent (register_quote_check, 9 Nov 2026): VBBL 2025 Book I v4.01 (J.B.'s
copy), Bulletin 2000-015, BC Hydro ES54 F (read on the web), FM 5-32, the Pool Regulation (bclaws), Parking By-law s. 5, I-2 schedule.
Not read, kept as HOLD rows with trust '?': Sport England Appendix 2, the HPAC 2014 article. Not read at all: FM Data Sheet 5-4, CSA C282.
Conflicts with the specs go to checks/to_cowork.md, not into these rows' choices.
Off-scale trust figures in the notes (85, 70) set on the CLAUDE.md scale: City bulletin 80, utility standard 90.

The Emergency hub's live part typology_spec_rules is untouched: the small-lot variant (not live) gets its own spec-only part,
hub_small_lot_rules, so live results and trust cannot change."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']; m = d['meta']
D = '9 Nov 2026'
VB = "Vancouver Building By-law 2025, Book I (Volume 1, v4.01, consolidated to 30 Sep 2026; J.B.'s copy in Downloads, vbbl-2025-volume-1-v4-01.pdf, not yet in the source library)"

NEW = {
 'vbbl25_3628': f"RULE: {VB}, Div. B 3.6.2.8.(1), printed p. 303: 'Where a generator intended to supply emergency power for lighting, fire safety and life safety systems is located in a building, except where such building is used solely for the purpose of housing the generator and its ancillary equipment, it shall be located in a room that a) is separated from the remainder of the building by a fire separation having a fire-resistance rating not less than 2 h, and b) contains only the generating set and equipment related to the emergency power supply system.' No storey named. 3.2.7.5.(1), p. 243: emergency power supply installed in conformance with CSA C282 (C282-15 in the referenced-documents table). Applies to emergency generators; data-centre standby sets may not be 'emergency' (?). Used by: Emergency hub small-lot variant (generators upstairs: 'meets code as read; not FM 5-32, insurer'); Community pool and Heat cascade small-lot pointer. Read 9 Nov 2026 (register_quote_check). Trust 90.",
 'vbbl25_32277': f"RULE: {VB}, Div. B 3.2.2.77 Group F, Division 2, up to 4 storeys, increased area, sprinklered, printed p. 193: building area not more than 18 000 m2 (1 storey), 9 000 (2), 6 000 (3), 4 500 (4); noncombustible; floor assemblies fire separations 1 h; mezzanines 1 h; loadbearing walls, columns and arches as the supported assembly. Used by: the construction row of the Heat cascade (heat_cascade/tfchk.py), Community pool and Emergency hub fits. Read 9 Nov 2026 (register_quote_check); figures match tfchk.py. Trust 90.",
 'vbbl25_32231': f"RULE: {VB}, Div. B 3.2.2.31 Group A, Division 3, up to 2 storeys, sprinklered, printed p. 174: building area not more than 12 000 m2 (1 storey) or 6 000 m2 (2); noncombustible; floors 1 h; mezzanines 1 h; arches may be heavy timber. Used by: construction rows for 1-2 storey buildings with a pool or spa (Heat cascade, Community pool). Read 9 Nov 2026 (register_quote_check). Trust 90.",
 'vbbl25_32229': f"RULE: {VB}, Div. B 3.2.2.29 Group A, Division 3, any height, any area, sprinklered, printed p. 173: noncombustible; floors fire separations 2 h; mezzanines 1 h; loadbearing as the supported assembly. 3.2.2.6.(1), p. 166: in a building with more than one major occupancy the requirements for the most restricted major occupancy apply to the whole building (3.2.2.7 superimposed occupancies, same page, not applied: ?). Used by: construction rows for 3+ storey buildings with a pool or spa (Heat cascade; Community pool fits on 3 storeys currently cite 3.2.2.77 only: conflict). Read 9 Nov 2026 (register_quote_check). Trust 90.",
 'cp_fit_rules': "DECISION (J.B., 9 Nov 2026): Claude Link community_pool/specs/community_pool.md rules 2, 5, 9, 14, 15: pool hall single volume, the data hall never over or under it; wet kind and bather path (R8); chlorine rules in both cities; spare-floor order; fallback ladder with the learner pool. A decision, not a source: no trust rating (n/a). Spec, not live yet.",
 # HOLD until read:
 'arch_sportEngPoolsApp2': "HOLD, NOT READ: DESIGN GUIDE (UK benchmark): Swimming Pools Design Guidance Note 2013, Appendix 2 Servicing the building, Sport England (hosted by CIBSE), Table 4 (citing PWTAG 2009): pool water temperatures by pool type and air about 1 °C above water, as reported by the main Cowork chat 9 Nov 2026 (figures ? until read: 28 competitive, 29 main, 30 leisure, 31 children, 32 babies/disabled, 35 hydrotherapy, 40 spa) — https://cibse.org/media/vihawrzw/swimming-pools-2013-appendix-2-servicing-the-building.pdf. Trust ? (benchmark, outside Canada).",
 'hpacAshraeLC2014': "HOLD, NOT READ: TRADE REPORT: HPAC Engineering, 22 Apr 2014, on ASHRAE TC 9.9 Liquid Cooling Guidelines 2nd ed.: 'five water-temperature classes', the highest 'greater than 45°C' (as reported by the main Cowork chat 9 Nov 2026; edition differs from upsiteASHRAE5's 5th-edition W classes) — https://www.hpac.com/air-conditioning/article/20927580/ashrae-adds-supply-water-temp-class-to-data-center-cooling-guidance. Trust 50 (trade report); replace with the ASHRAE text.",
}
KINDS = {'vbbl25_3628':'rule','vbbl25_32277':'rule','vbbl25_32231':'rule','vbbl25_32229':'rule','cp_fit_rules':'decision',
         'arch_sportEngPoolsApp2':'design guide (benchmark, outside Canada)','hpacAshraeLC2014':'trade report (secondary)'}

EXTEND = {
 'van_genroom': "Re-read 9 Nov 2026 from Claude Link beyond-data-sources/public/van_genroom/full.pdf (3 pp.): Bulletin 2000-015-BU/EL rev. 5 Oct 2015, attachment rev. 30 Nov 2020; generator either in a 2 h room per VBBL 3.6.2.8.(1) or in 'a prefabricated metal enclosure outside the building envelope' if the location is accepted by the City during the development permit process, installed per 3.6.1.4, the enclosure fire or spatially separated, structurally adequate (flood, snow, wind), braced, weatherproof, clearances per CSA C282; room holds the C282 Clause 5.1 system (engine, fuel per 7.3, transfer switches, wiring per 9, ventilation, exhaust). Roofs not mentioned. Emergency (life-safety) generators only. City guidance: trust 80. Used by: Emergency hub small-lot variant.",
 'bchES54F': "Re-read 9 Nov 2026 (BC Hydro PDF via WebFetch; not in the source library): F3-06 rev. 12, issued and effective 2026-03-13: pad 'on top of the soil within the footprint of the building' in an alcove, 'under special circumstances' where 'the building is built to the property line', BC Hydro designer approval for each alcove and a specific right-of-way; 'The building alcove shall face the street or back lane'; unobstructed truck access in front; 'operating area of 3.0 m in front of the transformer and 1.0 m maintenance access on the sides. The 3.0 m unobstructed operating area may include a city street or lane.' F3-07 rev. 6 (2026-03-13): outside the footprint, less than 3.0 m from the building, '1.0 m minimum setback from any property line'. F3-08 rev. 2 (issued 2025-05-14, effective 2025-08-14): 'an open concrete slab (floor or parkade)' or alcove, same special circumstances, 3.0 m front / 1.0 m sides, oil-containment curb. F0-02 R2 (Sep 2022): pads within a building footprint 'such as a building alcove or above a building parkade' follow F3-06. Table 1 minimum alcove (W x H x D, mm) / pad: LPT 2,000 kg 3100 x 4600 x 3200 / 1160 x 1360; PMT up to 500 kVA (symbol ?) 4,000 kg 3700 x 4600 x 3600 / 1730 x 1630; 750-1500 kVA 7,000 kg 4200 x 4600 x 4200 / 2210 x 2210. Roofs not mentioned. Utility standard read directly: trust 90. Used by: Emergency hub small-lot variant (lane-facing alcove).",
 'fmDS0532': "Re-read 9 Nov 2026 (J.B.'s copy in Downloads, FMDS0532.pdf p. 26): 2.6.4.3 and 2.6.4.3.1 concern emergency generators only; transformers are not placed by 2.6.4.3 (Data Sheet 5-4, Transformers: not read ?). The hub spec's 'generators and transformers at grade (FM 5-32 2.6.4.3)' overstates it for transformers. Insurer guidance, not law (trust unchanged).",
 'arch_hb_vbblFlood': "Re-read 9 Nov 2026 from J.B.'s Book I v4.01 (Downloads): Div. C 2.2.10.3 (printed p. 251) (1) FCL by structural elevation, compacted fill or both; (2) and (3) as quoted; (4) 'All piping, wiring and conduit penetrations shall be water stopped and sealed to prevent water seepage into the building.' 2.2.10.5 (p. 252): CBO may increase FCL or setbacks for a site-specific geological or hydrological feature. 2.2.10.6 (p. 252): CBO, with the City Engineer, may relax the FCL only if the owner shows it is impractical because of existing site characteristics and infrastructure, the construction mitigates flood damage, and a stamped P.Eng report certifies the habitable space is safe. Div. C 1.5.2.11 (p. 206): on a designated flood plain the CBO may require plans, a covenant, withhold the permit; (2) increase per 2.2.10.5; (3) relax per 2.2.10.6. Div. A FCL definition (p. 21) re-confirmed word for word. Note: 2.2.10 is Division C (some notes and the Community pool spec say Div. B). Used by: Community pool and Heat cascade rule 12 (tank shell, plant, chemicals at or above the FCL; 8980 ramp). Trust 90.",
 'bcPools2025': "9 Nov 2026: the islandhealth.ca URL returned HTTP 404; guideline wording not re-read. The figures rest on the Pool Regulation (arch_bcPoolReg296, re-confirmed 9 Nov). Used by: Heat cascade and Community pool supply temperature (pool <= 37 °C, hot tub <= 40 °C).",
 'arch_bcPoolReg296': "Re-confirmed 9 Nov 2026 on bclaws.gov.bc.ca (current to 3 Nov 2026): s. 10(2)(b) 'no more than 37°C'; s. 16(b) 'no more than 40°C'. Used by: Heat cascade heat order (spa first) and Community pool supply temperature.",
 'vanParking5': "Re-read 9 Nov 2026 (saved copy p. 5-1, 5-3, 5-4): 5.1.6 'Where gross floor area is used to calculate the number of required loading spaces, it shall be calculated in the same manner as the floor space ratio of the applicable district schedule or official development plan.' 5.1.7 fractions to the nearest whole number above zero. 5.2.3 row also lists 'Community centre, activity centre, or similar place of assembly' and 'Fitness Centre' (Class B one per 2 800 m2, none under 100 m2). Reading for the 1050 Georgia St E fit (J.B. 10 Nov): data centre held to 446 m2 counted (<= 465 m2: one Class B space, 5.2.5); the pool's own space shared with it only by a 5.1.5 Director of Planning permission. Used by: Community pool loading rows. Trust 90.",
 'van_zdb_i2': "I-2 District Schedule, June 2026, s. 4.1.1-4.1.2 (pp. 18-19): floor area counts all floors 'both above and below ground level, measured to the extreme outer limits of the building'; excludes balconies and decks (<= 12 %), patios and roof decks, parking, loading, bicycle, heating and mechanical floors only at or below base surface (or parking in a rear-yard accessory building), amenity areas (lesser of 20 % or 100 m2), artist studio storage below base surface. With Parking By-law 5.1.6 this sets the loading floor area. Read 9 Nov 2026 (register_quote_check). Spec, not live yet (Community pool 1050 fit).",
 'van3575s2': "Section 2 definitions (saved copy PDF p. 29): 'Office Uses' = Financial Institution; General Office; Health Care Office; Health Enhancement Centre; Temporary Sales Office. So Parking By-law 5.2.9 applies to a clinic directly (not by 5.1.4). Read 9 Nov 2026 (register_quote_check). Used by: Emergency hub clinic loading.",
 'van_lidar2022_ground': "9 Nov 2026 (Community pool fits, self-measured, not re-checked): 1050 Georgia St E street grade 7.4-9.3 m; 8980 Oak St, Oak St 2.9-3.8 m, yards 3.0-4.8 m (CGVD28), via eh/grade/vg.py.",
}

ALIASES = {
 'van_bulletin2000015': 'van_genroom', 'bch_ES54_F': 'bchES54F', 'fm532_atgrade': 'fmDS0532',
 'vbbl25_22103': 'arch_hb_vbblFlood', 'vbbl25_15211': 'arch_hb_vbblFlood', 'bc_poolOps_v3': 'bcPools2025',
 'ashrae_lcClasses_hpac': 'hpacAshraeLC2014', 'vanParking5_515_reading': 'vanParking5', 'vanParking5_516': 'vanParking5',
 'van_zdb_i2_41': 'van_zdb_i2', 'nbcAE_72_bathing': 'arch_sup_nbcAE7Pools', 'sportEng_p38': 'arch_sportEngPoolsDGN',
 'van_lidar_v1050_v8980': 'van_lidar2022_ground',
}

ATTACH = {   # id -> quantity / condition it hangs on
 'vbbl25_3628': ['r_hub_v1', 'hub_layout', 'heat_cascade_spec_rules', 'community_pool_spec_rules'],
 'van_genroom': ['r_hub_v1', 'hub_layout'],
 'bchES54F': ['r_hub_v1', 'hub_layout'],
 'fmDS0532': ['r_hub_v1 (already)', 'heat_cascade_spec_rules', 'community_pool_spec_rules'],
 'arch_hb_vbblFlood': ['r_hub_v1 (already)', 'heat_cascade_spec_rules', 'community_pool_spec_rules'],
 'bcPools2025': ['heat_cascade_spec_rules', 'community_pool_spec_rules'],
 'arch_bcPoolReg296': ['heat_cascade_spec_rules', 'community_pool_spec_rules'],
 'vbbl25_32277': ['heat_cascade_spec_rules', 'community_pool_spec_rules', 'r_hub_v1'],
 'vbbl25_32231': ['heat_cascade_spec_rules', 'community_pool_spec_rules'],
 'vbbl25_32229': ['heat_cascade_spec_rules', 'community_pool_spec_rules'],
 'vanParking5': ['r_hub_v1 (already)', 'community_pool_spec_rules'],
 'van_zdb_i2': ['community_pool_spec_rules (already)'],
 'van3575s2': ['r_hub_v1'],
 'van_lidar2022_ground': ['r_hub_v1 (already)', 'community_pool_spec_rules'],
 'cp_fit_rules': ['community_pool_spec_rules'],
 'arch_sportEngPoolsApp2': ['heat_cascade_spec_rules', 'community_pool_spec_rules'],   # HOLD
 'hpacAshraeLC2014': ['heat_cascade_spec_rules'],                                      # HOLD
}

TAG = f' ‖ {D} (register_quote_check): '
for k, txt in NEW.items():
    if k not in S: S[k] = txt
    m['source_kinds'][k] = KINDS[k]
for k, txt in EXTEND.items():
    if TAG not in S[k]: S[k] += TAG + txt
for a, k in ALIASES.items():
    m['id_aliases'].setdefault(a, f'{k} ({D}: one entry per document)')
for k in list(NEW) + list(EXTEND):
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('date') == D and c.get('by') == 'Code (register_quote_check)' for c in cl):
        held = k in ('arch_sportEngPoolsApp2', 'hpacAshraeLC2014', 'bcPools2025')
        cl.append({'check': 2, 'by': 'Code (register_quote_check)', 'date': D, 'where': 'source documents',
                   'what': 'not read: HOLD' if held and k != 'bcPools2025' else ('guideline URL 404; figures via the Pool Regulation' if k == 'bcPools2025' else 'quotes checked against the source')})

Q = {q['id']: q for q in d['quantities']}
HUB = ['vbbl25_3628', 'van_genroom', 'bchES54F', 'fmDS0532', 'vbbl25_32277', 'van3575s2', 'vanParking5']
if 'hub_small_lot_rules' not in Q:
    d['quantities'].append({"id": "hub_small_lot_rules", "name": "Emergency hub small-lot variant rules (spec, not live yet)",
      "stage": "test", "unit": "rules",
      "formula": "the Emergency hub's generators-upstairs variant (Claude Link eh/specs/emergency_hub.md Part 4, V1360; 'meets code as read; not FM 5-32 "
                 "(insurer)'): generators in a 2 h room upstairs, transformer alcoves on the street or lane, loading. Shown as the 530-750 m2 band on the "
                 "typologies page; not computed by the tool yet.",
      "inputs": ["massing"], "coef": "see each source; trust 90 (by-law clauses, utility standard), 80 (City bulletin); FM 5-32 is insurer guidance, not law",
      "sources": HUB, "conf": 50, "status": f"spec, not live yet ({D})"})
for pid, add in (('heat_cascade_spec_rules', ['vbbl25_3628', 'fmDS0532', 'arch_hb_vbblFlood', 'bcPools2025', 'arch_bcPoolReg296', 'vbbl25_32277',
                                              'vbbl25_32231', 'vbbl25_32229', 'arch_sportEngPoolsApp2', 'hpacAshraeLC2014']),
                 ('community_pool_spec_rules', ['vbbl25_3628', 'fmDS0532', 'arch_hb_vbblFlood', 'bcPools2025', 'arch_bcPoolReg296', 'vbbl25_32277',
                                                'vbbl25_32231', 'vbbl25_32229', 'vanParking5', 'van_lidar2022_ground', 'cp_fit_rules', 'arch_sportEngPoolsApp2'])):
    for s in add:
        assert s in S, s
        if s not in Q[pid]['sources']: Q[pid]['sources'].append(s)
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print(f'typology research: {len(NEW)} new ({2} HOLD), {len(EXTEND)} extended, {len(ALIASES)} aliases, part hub_small_lot_rules')
