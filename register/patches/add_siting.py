# Siting additions, 14 Oct 2026: starting step, zoning use and envelope, component space, position in a building,
# utility service, and precedents for "if you moved a limit". From sources/16–24 and J.B.'s decisions of 14 Oct.
# Idempotent: re-running replaces earlier siting entries. Run after add_addons.py.
import json, os
h = os.path.dirname(os.path.abspath(__file__))
P = os.path.join(h, '..', 'formula_register.json')
r = json.load(open(P, encoding='utf-8'))

SRC = {
 'van_zdb_s2': 'City of Vancouver Zoning and Development By-law No. 3575, Section 2 (definitions: Bulk Data Storage), June 2026 — https://bylaws.vancouver.ca/zoning/Sec02.pdf',
 'van_zdb_i2': 'City of Vancouver Zoning and Development By-law, I-2 District Schedule (current) — https://bylaws.vancouver.ca/zoning/zoning-by-law-district-schedule-I-2.pdf',
 'van_zdb_i1c': 'City of Vancouver Zoning and Development By-law, I-1C District Schedule (current) — https://bylaws.vancouver.ca/zoning/zoning-by-law-district-schedule-i-1c.pdf',
 'van_zdb_i3': 'City of Vancouver Zoning and Development By-law, I-3 District Schedule (June 2026), ss. 2.2.11, 3.1.1–3.1.2 — https://bylaws.vancouver.ca/zoning/zoning-by-law-district-schedule-i-3.pdf',
 'van_zdb_fc2': 'City of Vancouver Zoning and Development By-law, FC-2 District Schedule (June 2026), ss. 2.2.4, 3.1–3.4 — https://bylaws.vancouver.ca/zoning/zoning-by-law-district-schedule-fc-2.pdf',
 'van_rts19744': 'City of Vancouver, Referral Report RTS 19744, rezoning of 111 E 5th Ave (data centre), 14 Jul 2026 — https://council.vancouver.ca/20260714/documents/rr1.pdf',
 'van_cd1': 'City of Vancouver, CD-1 (Comprehensive Development) by-laws index — https://cd1-bylaws.vancouver.ca/',
 'van_f014': 'City of Vancouver, Flood Plain Standards and Requirements (F014, 2014, amended Mar 2023) — https://guidelines.vancouver.ca/F014.pdf',
 'van_floodplain': 'City of Vancouver Open Data, Designated floodplain — https://opendata.vancouver.ca/explore/dataset/designated-floodplain/',
 'edm_bl20001': 'City of Edmonton, Charter Bylaw 20001 (Zoning Bylaw), as adopted, PDF 3 Jan 2024: s. 2.130 IM, s. 2.140 IH, s. 5.70, s. 5.120, s. 8.10 — https://www.edmonton.ca/sites/default/files/public-files/assets/Bylaws/Bylaw20001.pdf',
 'edm_matrix': 'City of Edmonton, Zoning Bylaw 20001 Land Use & Zoning Matrix: Uses in Standard Zones, October 2026 — https://www.edmonton.ca/sites/default/files/public-files/Edmonton-Zoning-Bylaw-Land-Use-and-Zoning-Matrix.pdf',
 'edm_dcpage': 'City of Edmonton, Data Centre Development (web page, saved 14 Oct 2026) — https://www.edmonton.ca/business_economy/economic_investment/data-centre-development',
 'nbc2020_4153': 'NRC, National Building Code of Canada 2020, Vol. 1, Div. B, Table 4.1.5.3 and Sentence 4.1.5.1.(1) — doi:10.4224/w324-hv93',
 'nfc2020_4313': 'NRC, National Fire Code of Canada 2020, Div. B, 4.3.13–4.3.14 and Table 4.3.13.4.-B — https://publications.gc.ca/collections/collection_2022/cnrc-nrc/NR24-27-2020-eng.pdf',
 'van_genroom': 'City of Vancouver, Emergency generator rooms (Building By-law bulletin 2000-015; VBBL 3.6.2.8) — https://vancouver.ca/files/cov/2000-015-emergency-generator-rooms.pdf',
 'bch_primary': 'BC Hydro, Primary Service Guide (distribution standards) — https://app.bchydro.com/content/dam/BCHydro/customer-portal/documents/distribution/standards/ds-primary-guide.pdf',
 'epcor_ccg': 'EPCOR, Power Customer Connection Guide — https://epcor.com/content/dam/epcor/documents/supporting-documents/power_customer-connection-guide.pdf',
 'lbnl_proto2021': 'Sun, Luo, Luo, Hong, Prototype energy models for data centers, Energy and Buildings 231:110603 (2021) — https://eta-publications.lbl.gov/sites/default/files/prototype_energy_models_for_data_centers.pdf',
 'hillingdon_up4': 'London Borough of Hillingdon, planning committee report, Ark UP4 data centre — https://modgov.hillingdon.gov.uk/documents/s64459/739%20REPORT.pdf',
 'cat3516c': 'Caterpillar 3516C 2,500 kW standby generator set specification (manufacturer claim) — https://www.hanovercounty.gov/DocumentCenter/View/5983/CAT-3516C-2500KW-Cut',
 'src16': 'Beyond Data research note 16: data centre components and sizing (sources/16_dc_components_sizing.md)',
 'src17': 'Beyond Data research note 17: Vancouver zoning (sources/17_zoning_vancouver.md)',
 'src18': 'Beyond Data research note 18: Edmonton zoning (sources/18_zoning_edmonton.md)',
 'src19': 'Beyond Data research note 19: Fairfax and Loudoun precedents (sources/19_precedent_fairfax_loudoun.md)',
 'src20': 'Beyond Data research note 20: Frankfurt, German EnEfG, EU EED (sources/20_precedent_frankfurt_germany_eu.md)',
 'src21': 'Beyond Data research note 21: Calgary and Alberta precedents (sources/21_precedent_calgary_alberta.md)',
 'src22': 'Beyond Data research note 22: Vancouver floors, flood, water (sources/22_vancouver_floors_flood_water.md)',
 'src23': 'Beyond Data research note 23: fuel and vibration (sources/23_fuel_and_vibration.md)',
}

def Q(id, name, stage, unit, formula, inputs, coef, sources, conf, status, direction=''):
    q = dict(id=id, name=name, stage=stage, unit=unit, formula=formula, inputs=inputs, coef=coef, sources=sources,
             source_roles=[dict(id=s, term=name, role='data', conf=conf, verified=conf >= 60) for s in sources],
             conf=conf, status=status, siting=True)
    if direction: q['direction'] = direction
    return q

NEW = [
 Q('envelope', 'Buildable envelope', 'size', 'm² floor area · m height',
   'max floor area = site area × FSR (or FAR) available to the data-centre use; height, setbacks and building-width limits from the zone',
   ['parcel', 'zone'],
   'Vancouver I-3 A: FSR 3.00 (bonus not open to storage uses), 18.3 m (30.5 m discretionary), side yard 7.6 m, max building width and depth 61.0 m, floor-to-floor ≥ 6.0 m ground / 4.0 m above; '
   'FC-2: FSR 1.00–5.00 by sub-area (6.50 at discretion), 10.7–22.9 m (to 51.8 m), side yards not permitted; I-2: FSR 3.00, 18.3 m (to 30.5–36.5 m); I-1C: FSR 6.00, 46.5 m. '
   'Vancouver counts plant floor space above grade (excluded only at or below base surface, e.g. I-2 s. 4.1.2(c)). '
   'Edmonton IM: 18.0 m, FAR 2.0, setbacks 3.0 m street / 6.0 m to non-industrial; IH: 30.0 m, FAR 2.0, min site 1.0 ha; BE: 16.0 m, FAR 1.6. '
   'Edmonton s. 5.70(1.9): ventilating equipment, mechanical penthouses, tanks and stacks have no height limit',
   ['van_zdb_i2', 'van_zdb_i1c', 'van_zdb_i3', 'van_zdb_fc2', 'van_rts19744', 'edm_bl20001', 'src17', 'src18'], 75,
   'sourced for I-2, I-1C, I-3, FC-2, BE, IM, IH; FC-2 sub-area D bonus and E height unread; sub-area maps to digitise'),
 Q('component_space', 'Space for the plant', 'size', 'm² per MW, by component',
   'Σ components (electrical yard and switchgear, UPS and batteries, generators and fuel, heat rejection, heat recovery, fire suppression, loading) × IT load × redundancy',
   ['start_case', 'cooling_type'],
   'Manufacturer claims per MW: UPS ≈2.0–2.4 m², Li-ion batteries ≈2.2 m² (5 min), air-cooled chillers 17–26 m², cooling towers ≈8 m², dry coolers ≈24.5 m², heat pumps ≈3.4 m² per MW heat, CDUs ≈0.6 m²; '
   'equipment only, without clearances; EPCOR transformer clearances 3.0 m door side / 2.0 m others; fuel room 2 h separation and 550 mm clearance (NFC 4.3.14); generator room 2 h (VBBL 3.6.2.8)',
   ['src16', 'epcor_ccg', 'nfc2020_4313', 'van_genroom', 'cat3516c'], 40,
   'manufacturer claims; clearances and switchgear room sizes unsourced'),
 Q('hall_area', 'Room for the data hall', 'size', 'm²',
   'new: envelope floor area − plant space − support − ground-floor uses the zone requires; part of an existing building: the floor area offered',
   ['envelope', 'component_space', 'host_building'],
   'Vancouver I-2, I-3 and FC-2: no data storage at the ground floor except entrances; calibration: Burlington 3,710 m² of halls = 48–72 % of gross area',
   ['van_zdb_i3', 'van_zdb_fc2', 'van_zdb_i2', 'src16'], 50, 'arithmetic on sourced limits; white-space share from one calibration case'),
 Q('size_fit', 'Largest size that fits', 'size', 'MW IT (range)',
   'hall area ÷ area per MW (range); for part of a building, also capped by floor load, electrical service and heat-rejection space',
   ['hall_area', 'floor_load_need', 'service_class'],
   'LBNL prototypes 3.7–13.9 m² per rack → ≈186–2,325 m² per MW; Ark UP4 28 MW IT in 15,410 m² (three buildings); 111 E 5th ≤ 291 m² per MW (upper bound); Uptime 2024 average 8 kW per rack (industry survey)',
   ['lbnl_proto2021', 'hillingdon_up4', 'van_rts19744', 'src16'], 50, 'range, wide; narrows with rack density'),
 Q('floor_load_need', 'Floor strength', 'test', 'kPa needed vs designed',
   'equipment load of the hall (racks, batteries) vs the floor\'s design load for its original use',
   ['host_building', 'start_case'],
   'NBC 2020 Table 4.1.5.3: office 2.4 kPa (upper floors), 4.8 kPa (basement and ground floors with exterior access); equipment and service rooms ≥ 3.6 kPa; office row excludes computer rooms; data halls designed for actual loads (4.1.5.1.(1)); data-hall values 7.2 kPa (US DoD) and 12 kPa (TIA-942 Rated-3) need the standard',
   ['nbc2020_4153', 'src16'], 70, 'code values sourced; data-hall loads need the standard'),
 Q('fuel_on_site', 'Fuel kept on site', 'characterise', 'L',
   'generator capacity × runtime hours × fuel per kWh, against the limit per storage room for the storey it sits on',
   ['start_case', 'backup_hours'],
   'NFC 2020 Table 4.3.13.4.-B (Class II): first storey 200 000 L per room; basement or above the first storey 20 000 L (tanks > 2 500 L) or 45 000 L (tanks > 20 000 L); tanks > 230 L in a dedicated 2 h room; '
   'fuel use ≈0.263 L/kWh (one Cat model, manufacturer claim) ≈6.3 m³ per MW per 24 h; Uptime ≥ 12 h on site; whether data-centre standby counts as "emergency generators" is for the authority to decide',
   ['nfc2020_4313', 'cat3516c', 'src16', 'src23'], 60, 'code limits sourced; fuel rate is a manufacturer claim'),
 Q('flood_exposure', 'Flood exposure', 'place', 'm above or below the flood level',
   'floor elevation of the plant vs the flood construction level, for parcels in the designated floodplain',
   ['flood_area', 'start_case'],
   'Vancouver FCL 4.6 m (GVRD datum, includes 1 m sea-level rise to 2100, 1:500-yr, 0.6 m freeboard); switchgear, electrical panels and fire protection not below FCL unless flood-protected (VBBL Div. C 2.2.9.3(2)); main switchgear in industrial buildings at or above FCL (F014 s. 3.3)',
   ['van_f014', 'van_floodplain', 'src22'], 70, 'Vancouver sourced; datum conversion not found; Edmonton not yet looked at', 'place'),
 Q('vibration_rank', 'Vibration to neighbours', 'characterise', 'ranked: slab on grade → long-span upper floor',
   'qualitative rank of how hard plant vibration is to isolate at each position in the building',
   ['start_case', 'host_building'],
   'NBC/VBBL apparent STC 47 between dwellings and other spaces (STC 55 by elevator shafts) — airborne only, no equipment-vibration limit; isolator deflection rises with floor span (US government spec citing ASHRAE); ASHRAE Applications ch. 49 not read',
   ['src23'], 40, 'ranked, no dB values'),
 Q('service_class', 'Electrical service', 'place', 'class of connection',
   'IT load × PUE → the utility service class and what it brings (second feeder, transmission, clearances)',
   ['it_load_actual', 'parcel'],
   'BC Hydro: above 6.5 MVA (12.5 kV areas) or 13 MVA (25 kV areas) a two-feeder supply may be required; 60 kV and above under transmission rules. EPCOR: primary service typical above 2,500 kVA; transformer clearances 3.0 m / 2.0 m; access road 4.6 m in a 6.5 m strip',
   ['bch_primary', 'epcor_ccg', 'src16'], 75, 'sourced thresholds', 'place'),
]

CONDS = [
 dict(id='z_use', heading='6 Regulatory', name='A data centre is an allowed use in this zone',
      test='zoning_status is allowed or case by case', quantities=['zoning_status'], move=['policy', 'time', 'money'], parties=['operator', 'city', 'neighbours'], constraint=False,
      note='Vancouver: conditional only in I-2, I-1C, I-3 (sub-area A) and FC-2; every other district, including all commercial and mixed-use districts, needs a rezoning (RTS 19744 is the test case). Edmonton: the City says large-scale data centres are Major Industrial — IH, or IM where it existed on 1 Jan 2024; elsewhere a rezoning and sometimes a plan amendment, with a Council public hearing. A unit in a mixed-use building is not an allowed use in either city today.',
      sources=['van_zdb_s2', 'van_zdb_i3', 'van_zdb_fc2', 'van_rts19744', 'edm_matrix', 'edm_dcpage']),
 dict(id='z_site_specific', heading='6 Regulatory', name='Site-specific zoning is read on its own',
      test='parcel is not CD-1 (Vancouver) or Direct Control (Edmonton)', quantities=['zoning_status'], move=['time', 'policy'], parties=['operator', 'city'], constraint=False,
      note='CD-1 and DC1/DC2 zones each have their own by-law; the tool links to it and treats the parcel as a rezoning route. About 9 % of Edmonton zone features are Direct Control.',
      sources=['van_cd1', 'src18']),
 dict(id='z_edm_class', heading='6 Regulatory', name='Edmonton: effects stay inside the site (Minor) or reach beyond it (Major)',
      test='noise at the lot line, emissions and fuel or battery hazards needing separation', quantities=['noise_level', 'fuel_on_site', 'battery'], move=['choice', 'money', 'policy'], parties=['operator', 'neighbours', 'city'], constraint=False,
      note='Bylaw 20001 s. 8.10: Major Industrial creates Nuisances beyond the Site or needs separation for fire, explosion or toxic risk; Minor Industrial\'s nuisance is less. Enclosing and quieting plant widens where a data centre can go (BE, IM, UI) — interpretation; the Development Planner decides, and the City\'s page treats large-scale data centres as Major.',
      sources=['edm_bl20001', 'edm_dcpage']),
 dict(id='z_envelope', heading='2 Spatial', name='The building fits the envelope',
      test='floor area ≤ envelope; height, setbacks and width within limits', quantities=['envelope', 'hall_area', 'component_space'], move=['choice', 'policy'], parties=['operator', 'city', 'neighbours'], constraint=False,
      note='Height can often be raised at the City\'s discretion (Vancouver I-3 to 30.5 m, FC-2 to 51.8 m; Edmonton IH for operating features). I-3 caps building width and depth at 61 m.',
      sources=['van_zdb_i3', 'van_zdb_fc2', 'edm_bl20001']),
 dict(id='z_plant_counts', heading='2 Spatial', name='Vancouver: plant above grade counts as floor area',
      test='mechanical and electrical space placed at or below grade, or within the FSR', quantities=['envelope', 'component_space'], move=['choice', 'policy'], parties=['operator', 'city'], constraint=False,
      note='District schedules exclude heating and mechanical floor space only at or below base surface; electrical rooms are not mentioned. The 111 E 5th rezoning counted data-centre plant and reached about 4.2 FSR against 3.0.',
      sources=['van_zdb_i2', 'van_rts19744', 'src22']),
 dict(id='z_ground_floor', heading='2 Spatial', name='Vancouver: no data storage at the ground floor',
      test='ground floor holds another use or entrances', quantities=['hall_area'], move=['choice'], parties=['operator', 'neighbours', 'city'], constraint=False,
      note='I-2 s. 2.2.7, I-3 s. 2.2.11, FC-2 s. 2.2.4: bulk data storage not permitted at the ground floor except entrances. Even where allowed, a data centre stacks over another use.',
      sources=['van_zdb_i2', 'van_zdb_i3', 'van_zdb_fc2']),
 dict(id='b_floor', heading='1 Technical', name='The floor can carry the hall',
      test='equipment load ≤ floor design load, or reinforcement', quantities=['floor_load_need'], move=['money', 'choice'], parties=['operator', 'host'], constraint=False,
      note='An office upper floor (2.4 kPa) is the case most likely to need reinforcing; a slab on grade carries any load.',
      sources=['nbc2020_4153']),
 dict(id='b_fuel', heading='6 Regulatory', name='Fuel fits the storey\'s limit',
      test='fuel_on_site ≤ per-room limit for that storey', quantities=['fuel_on_site'], move=['choice', 'money'], parties=['operator', 'neighbours', 'city'], constraint=False,
      note='About 3 MW of generators for a day fits a basement or upper-floor room (20 000 L); more pushes fuel to the first storey or outdoor tanks.',
      sources=['nfc2020_4313', 'van_genroom']),
 dict(id='b_flood', heading='9 Environmental', name='Electrical plant sits above the flood level',
      test='switchgear and electrical rooms at or above the FCL in the floodplain', quantities=['flood_exposure'], move=['choice', 'money'], parties=['operator', 'city'], constraint=False,
      note='Mostly a basement question in low areas such as False Creek Flats.', sources=['van_f014']),
 dict(id='b_vibration', heading='10 Experiential', name='Neighbours above and below are not disturbed',
      test='plant isolated for its position; airborne separation meets STC/ASTC', quantities=['vibration_rank'], move=['money', 'choice'], parties=['neighbours', 'operator'], constraint=False,
      note='The code limits airborne sound between units, not equipment vibration; a mixed-use position carries this row.', sources=['src23']),
 dict(id='p_service', heading='1 Technical', name='The electrical service class is available',
      test='service class and its feeders or transmission can be had in the time asked', quantities=['service_class'], move=['money', 'time', 'infra'], parties=['operator', 'utility', 'ratepayers'], constraint=False,
      note='Above the BC Hydro two-feeder thresholds the service changes class; in Alberta the interim large-load limit (1,200 MW) is fully allocated and the province favours data centres that bring their own generation.',
      sources=['bch_primary', 'epcor_ccg', 'src21', 'edm_dcpage']),
]

# "If you moved a limit": rules from elsewhere, applied as a what-if. Values from notes 19–21; status as read.
PRESETS = [
 dict(id='fx_res', place='Fairfax County, VA', name='Building 61 m from homes', limit='distance from residential', value='≥ 200 ft (61 m) building; ≥ 300 ft (91 m) ground-level equipment, or behind the building', families=['space', 'sound', 'seen'], favours='neighbours', costs='operator (fewer parcels)', status='adopted 10 Sep 2024', sources=['src19']),
 dict(id='fx_transit', place='Fairfax County, VA', name='Away from transit stations', limit='distance from a rapid-transit station', value='≥ 1 mile (1,609 m) from a Metro entrance (read as SkyTrain or LRT — a tool choice)', families=['space', 'people'], favours='city (station land for homes and jobs)', costs='operator', status='adopted 10 Sep 2024', sources=['src19']),
 dict(id='fx_enclose', place='Fairfax County, VA', name='All plant enclosed', limit='equipment screening', value='equipment fully enclosed; substation behind a solid wall', families=['sound', 'seen'], favours='neighbours', costs='operator (cost, heat rejection)', status='adopted 10 Sep 2024', sources=['src19']),
 dict(id='fx_gen', place='Fairfax County, VA', name='Generator testing hours', limit='testing window', value='7 a.m.–9 p.m., ≤ 2 h a day', families=['sound', 'carbon'], favours='neighbours', costs='operator (scheduling)', status='adopted 10 Sep 2024', sources=['src19']),
 dict(id='fx_noise', place='Fairfax County, VA', name='Noise at homes', limit='noise limit at the residential line', value='60 dBA day / 55 dBA night (Ch. 108.1)', families=['sound'], favours='neighbours', costs='operator', status='in force', sources=['src19']),
 dict(id='ld_se', place='Loudoun County, VA', name='Case-by-case approval everywhere', limit='approval route', value='special exception in OP, IP, GI and MR-HI; not in the rural area', families=['rules', 'time'], favours='neighbours, city', costs='operator (time)', status='adopted 18 Mar 2025', sources=['src19']),
 dict(id='ld_berm', place='Loudoun County, VA', name='Berms and acoustic barriers', limit='screening', value='berm ≥ 6 ft (1.8 m); acoustic barriers on four sides', families=['sound', 'seen', 'space'], favours='neighbours', costs='operator (land)', status='UNVERIFIED in force (read from Phase 2 drafts)', sources=['src19']),
 dict(id='ffm_zones', place='Frankfurt', name='Designated data-centre zones', limit='where data centres may go', value='commercial land sorted suitable / restricted / excluded; mixed-use areas excluded; small basement data centres by exception', families=['rules', 'space'], favours='city (planning certainty)', costs='mixed-use urban siting', status='council decision 9 Jun 2022 (cited; not opened)', sources=['src20']),
 dict(id='de_pue', place='Germany (EnEfG)', name='Efficiency floor for new builds', limit='PUE', value='≤ 1.2 for data centres from July 2026 (≤ 1.5 / 1.3 for existing from 2027 / 2030); ≥ 300 kW', families=['power', 'heat_out'], favours='grid, ratepayers', costs='operator (design)', status='law 2023; 2026 bill would loosen', sources=['src20']),
 dict(id='de_erf', place='Germany (EnEfG)', name='Heat-reuse quota', limit='energy reuse factor', value='≥ 10 / 15 / 20 % for new data centres commissioned 2026 / 2027 / 2028; waived if no heat network accepts an offer at cost within six months', families=['heat_out', 'heat_use', 'money'], favours='heat receivers, city', costs='operator (capture, heat pump)', status='law 2023; 2026 bill would loosen', sources=['src20']),
 dict(id='de_re', place='Germany (EnEfG)', name='Renewable electricity', limit='renewable share', value='50 % from 2024, 100 % from 2027', families=['power', 'carbon'], favours='climate', costs='operator (price)', status='law 2023; bill would move 100 % to 2030', sources=['src20']),
 dict(id='eu_report', place='EU (EED 2023/1791)', name='Public reporting', limit='disclosure', value='≥ 500 kW IT: annual public reporting incl. PUE, WUE, ERF, waste heat (kWh, °C)', families=['account'], favours='public, city', costs='operator (reporting)', status='in force; Art. 26(6) heat cost-benefit wording UNVERIFIED', sources=['src20']),
 dict(id='yyc_gen', place='Calgary', name='On-site generation threshold', limit='generation approval route', value='1–12.5 MW permitted in I-G and I-R, ≥ 50 m from residential, enclosed; ≥ 12.5 MW only under Direct Control', families=['power', 'rules', 'sound'], favours='neighbours', costs='operator (process above 12.5 MW)', status='Land Use Bylaw 1P2007 s. 264–265', sources=['src21']),
 dict(id='rv_district', place='Rocky View County, AB', name='A data-centre district', limit='zoning', value='Special, Data Centre District (2025, amended 2026); Beacon plan: 30 m setback, enclosed equipment, provincial noise rule', families=['rules', 'space', 'sound'], favours='operator (certainty)', costs='farmland, neighbours', status='district text not read (blocked)', sources=['src21']),
]

ZS = dict(inputs=['parcel', 'zone', 'start_case'],
  coef='Vancouver: "Bulk Data Storage" (s. 2) is conditional in I-2, I-1C, I-3 sub-area A and FC-2 only; not permitted elsewhere, including all commercial and mixed-use districts; CD-1 site-specific. '
       'Edmonton: no named use; the City treats large-scale data centres as Major Industrial (permitted IH; IM only where existing 1 Jan 2024); '
       'Minor Industrial permitted in BE, IM, UI and IH-existing; Direct Control site-specific; s. 7.20(3.3.2) may make an ill-fitting use discretionary',
  sources=['van_zdb_s2', 'van_zdb_i2', 'van_zdb_i1c', 'van_zdb_i3', 'van_zdb_fc2', 'van_cd1', 'edm_matrix', 'edm_dcpage', 'edm_bl20001'], conf=80,
  status='sourced for standard zones; Edmonton Major or Minor turns on the data centre\'s own effects (Development Planner decides)')
for q in r['quantities']:
    if q['id'] == 'zoning_status':
        q.update(ZS); q['source_roles'] = [dict(id=x, term=q['name'], role='data', conf=80, verified=True) for x in ZS['sources']]
ids = {q['id'] for q in NEW}
r['quantities'] = [q for q in r['quantities'] if q['id'] not in ids and not q.get('siting')] + NEW
cids = {c['id'] for c in CONDS}
r['conditions'] = [c for c in r['conditions'] if c['id'] not in cids] + CONDS
r['new_sources'].update(SRC)
r['meta']['limit_presets'] = PRESETS
r['meta']['limit_presets_note'] = 'Rules from elsewhere, tried as "if you moved a limit": each shows what the rule would change here and who it favours. Never applied silently; values and status from research notes 19–21 (14 Oct 2026).'
r['meta']['start_step'] = dict(
    questions=['New or existing building?', 'Whole building or part of one?', 'Only for part of an existing building: which floor? (basement · ground · floor n · roof)'],
    special=['Modular or containerised unit', 'At existing infrastructure (substation, sewage plant, district energy plant, telecom exchange)', 'Expanding an existing data centre'],
    notes=['For a new mixed-use building, position (basement, ground, upper floor, roof) is compared as options, not asked.', 'Phasing is a timeline option inside any case.'],
    decided='J.B., 14 Oct 2026')
ol = r['meta']['options_logic']
step = 'compare positions in the building as options where the user has not fixed one (basement · ground · upper floor · roof), each with its floor load, fuel, flood, vibration and street-front rows'
if step not in ol['steps']: ol['steps'].insert(3, step)
r['meta']['date'] = '2026-10-14'
json.dump(r, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(NEW), 'quantities,', len(CONDS), 'conditions,', len(PRESETS), 'presets')
