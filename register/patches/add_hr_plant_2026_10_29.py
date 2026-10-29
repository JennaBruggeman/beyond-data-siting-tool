"""Heat-recovery plant: flow, pipe size, heat pumps, plate heat exchangers, buffer tanks, pumps, plant room (J.B. 29 Oct 2026: 'go for it').
Research: scratchpad hr_plant.md (agent) → re-read by Claude 29 Oct 2026: Energiforsk 2021:813 Tables 1–2 and pp.16/18; Kelvion NP flyer;
TSBC D-BP 2024-05; Vancouver NEU Connectivity Guidelines Rev 1 (May 2026) s.6.1 Table 1 and s.6.3; Daikin EWW-VZ IOM rev 13 s.2.10;
UBC 33 61 00 (Nov 2025) s.3.1; NBC 2020 / NBC(AE) 2023 6.2.1.5. Not re-read (verified False): TSBC IB-DA 2020-01, Armstrong 4030, UBC 23 60 00.
Equipment sizes (DualPAC, T20, Reflex, Logstor) were checked in the equipment study (checks/node_review/kit_hall.md, select_hall.md)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
NEWSRC = {
 'energiforsk2021': "Energiforsk Rapport 2021:813, Åkerlund, Nordin, Penttinen, Dimensionering av servisledningar i distributionssystem (Oct 2021): Table 1 p.26 'optimal' velocity by DN from Värmekulverthandbok (Maurin 1986): DN50 1.2, DN65 1.4, DN80 1.5, DN100 1.8, DN125 2.0, DN150 2.2, DN200 2.5, DN300 2.6, DN400 2.7 m/s; Table 2 p.27 theoretical Pa/m at 60 °C (DN200 250); p.16 'we recommend a maximum flow velocity of 1.5 m/s in straight service pipes'; p.18 erosion risk above 2 m/s copper, 3 m/s steel — https://energiforsk.se/media/30563/dimensionering-av-servisledningar-i-distributionssystem-energiforskrapport-2021-813.pdf",
 'ubc336100': "UBC Technical Guidelines 33 61 00, UBC Vancouver District Hot Water Energy Distribution (Nov 2025): 3.1.1 mains 2–3.5 m/s, service lines max 2 m/s; 3.2.1 based on 250 Pa/m; 3.1.2 supply 70 °C, ΔT 30 °C; 3.1.5 for preliminary sizing only; 4.1.5 heat exchangers sized for a maximum 5 °C approach; 4.1.2 brazed plate for space heating — https://technicalguidelines.ubc.ca/guidelines/336100-2025_District_Hot_Water_Energy_Distribution_UBCV.pdf",
 'neuETS': "City of Vancouver, NEU Connectivity Guidelines & Requirements, Rev 1 (1 May 2026), s.6.1 pp.18–19: ETS room on the first sub-level (P1) unless below the flood construction level, directly adjoining the building perimeter; Table 1 minimum ETS room 6 × 3 m (< 13,940 m² building), 6 × 4 m (13,940–23,230 m²), larger 'to be determined by NEU Engineer'; skid about 2 × 3 m; headroom ≥ 2.7 m; double door ≥ 1.83 m wide; floor drains; s.6.3: network ≥ 65 °C, ΔT ≥ 15 °C, return ≤ 45 °C, ≤ 35 kPa across the building side of the ETS — https://vancouver.ca/files/cov/connectivity-guidelines-and-requirements.pdf",
 'sabroeDualPAC': "Johnson Controls, Sabroe DualPAC data sheet (johnsoncontrols.de, undated ?): 716-W 1,991 kW heating at 50 → 70 °C with source 30 → 20 °C, 1,841 kW at 70 → 90 °C; 6100 × 3000 × 2100 mm; two-stage ammonia (manufacturer claim) — https://www.johnsoncontrols.de/-/media/project/jci-global/johnson-controls/ce-region/germany-johnson-controls/events-pdfs/jci-dualpac_datenblatt-ly-1.pdf",
 'kelvionNP': "Kelvion, NP-plate gasketed plate heat exchanger flyer (Version 01, 12/18): NP150X 640 × 2377 mm, DN150, max 350 m³/h (1,541 USGPM), 32.3 barg; NP250L 895 × 2866 mm, DN250, printed '350 m³/h' beside '4,620 USGPM' (≈ 1,050 m³/h): the two do not agree ? — https://d2xjeen3zaup4u.cloudfront.net/asset/767398133948/document_q319pc2v312f34qm2b2rlmja1l/PF_PHE_GPHE_NPPlate_EN_V2.pdf",
 'alfaT20': "Alfa Laval T20 leaflet CHE00078EN (2016-04): H 2145, W 780, frame length 930–3930 mm, DN200 ports; duty not printed — https://www.alfalaval.in/globalassets/documents/microsites/heating-and-cooling-hub/pd-leaflets---gasketed/t20.pdf",
 'alfaManual': "Alfa Laval, Instruction manual BaseLine and M line 200000423-1-EN-GB (2019-02) s.4.2 p.20: 'Free space is required for lifting plates in and out'; 'refer to the delivered PHE drawing for actual measurements' (no distance printed) — https://test03.alfalaval.com/globalassets/documents/products/heat-transfer/plate-heat-exchangers/gasketed-plate-and-frame-heat-exchangers/instruction-manuals/instruction-manual-alfa-laval-baseline-and-m-line-english.pdf",
 'daikinEWWVZ': "Daikin, EWW(D/H/S)-VZ Installation, Operation and Maintenance manual D-EIMWC003H02-18 rev 13 (06-2026) s.2.10 p.25: minimum system water content 5 l/kW (single circuit), 3.5 l/kW (dual circuit), kW = nominal cooling at 12/7 °C; a minimum for stable control, not storage — https://www.daikin.eu/content/dam/document-library/installation-manuals/as/water-cooled-chiller/ewwd-vzss/EWW(D.H.S)-VZ(P.S.X)S_Installation.Operation.Maintenance%20manual_D-EIMWC003H02-18_13_German.pdf",
 'reflexH5000': "Reflex Winkelmann, Storatherm Heat H 5000/R data sheet (created 09-09-2026): 5,000 L, Ø 1500 mm without insulation, H 3211 mm — https://xom-web.reflex.de/xom-rest/assets/ec68e2bd-9188-4e92-94f6-00b5a42eef5d/content?locale=en",
 'logstor2014': "LOGSTOR Product Catalogue s.6 TwinPipe (2014.09, third-party copy): DN200 twin, casing Ø 560 / 630 / 710 mm (series 1/2/3); check against the current edition ? — https://districtheating-prod.s3.amazonaws.com/uploads/2015/02/09/logstortwin-pipe-specification.pdf",
 'armstrong4030': "Armstrong Fluid Technology, Series 4030 base-mounted end-suction pump submittals 80-250A (40.63iec) and 200-330A (40.77iec), 26 Apr 2016: flanged 100/80 mm and 250/200 mm; dimension columns ha, hb, hc, hf not mapped to length/width/height ? — https://armstrongfluidtechnology.com/~/media/documents/specifications/submittal-data/4030-base-mounted-pumps/4030-uk-submittals/40-63iec_4030_80_250a_submittal.pdf",
 'tsbcDBP202405': "Technical Safety BC, Directive D-BP 2024-05 Certification and Registration of Refrigeration Systems (issued 31 Dec 2024): certified factory-assembled systems exempt from design registration up to '500 kW for systems utilizing A1 or A2L type refrigerants' and '125 kW for systems utilizing a refrigerant type other than A1 or A2L'; refers to CSA B52:2023 — https://assets.contentstack.io/v3/assets/bltdec2ded849740f4d/bltc37381c7418e482e/6769e745b1ed3cc9addc5b84/D-BP-2024-05_-_Certification_and_Registration_of_Refrigeration_Systems.pdf",
 'tsbcIBDA202001': "Technical Safety BC, Information Bulletin IB-DA 2020-01 (19 Oct 2020): design registration for A1/A2/B1 refrigerants ≥ 125 kW prime mover, A3/B2/B3 ≥ 25 kW; refers to CSA B52 cl. 5.3 (read by agent only)",
 'nbc6215': "National Building Code of Canada 2020, Div. B 6.2.1.5.(1) (J.B.'s copy NBC2020p2.pdf): mechanical refrigeration equipment designed, constructed and installed to CSA B52, subject to provincial or territorial requirements; NBC(AE) 2023 the same with Alberta regulations. CSA B52:23 itself is paywalled and not read ?",
}
DUAL = "Q = V × 1.16 × ΔT (heat_in_water; water 4.18 kJ/kg·K × 1,000 kg/m³ ÷ 3,600 = 1.16 kWh/m³·K, physics; a primary property table not yet cited ?)"
QS = [
 dict(id='hr_flow', name='Heat-recovery water flow', unit='m³/h', stage='size', conf=60, status='in hand',
  inputs=['heat_captured', 'heat_delivered', 'heat_in_water'], sources=['neuETS', 'ubc336100', 'sabroeDualPAC'],
  formula='V = Q ÷ (1.16 × ΔT), at design peak (servers × capture, not the yearly average); source side (data centre → heat pump) and network side (heat pump → network) separately',
  coef='network side ΔT 15 K (Vancouver NEU minimum) to 30 K (UBC operating ΔT); source side ΔT 10 K (DualPAC rating, 30 → 20 °C); ' + DUAL,
  source_roles=[dict(id='neuETS', term='ΔT ≥ 15 K, return ≤ 45 °C', role='rule', conf=80, verified=True),
                dict(id='ubc336100', term='ΔT 30 K at 70 °C supply', role='rule', conf=80, verified=True),
                dict(id='sabroeDualPAC', term='source 30 → 20 °C', role='coefficient', conf=60, verified=True)]),
 dict(id='hr_pipe_size', name='Heat-recovery pipe size', unit='DN', stage='size', conf=55, status='in hand',
  inputs=['hr_flow'], sources=['energiforsk2021', 'ubc336100', 'logstor2014'],
  formula='smallest DN whose velocity (flow ÷ bore area) is at or below the guide velocity for that DN; a service line to the network also kept at or below 2 m/s',
  coef="guide velocities by DN (Energiforsk 2021:813 Table 1, 'optimal' values from a 1986 Swedish handbook, not limits): DN100 1.8, DN125 2.0, DN150 2.2, DN200 2.5, DN300 2.6 m/s; UBC: service lines ≤ 2 m/s at 250 Pa/m, mains 2–3.5 m/s, preliminary sizing only; bore taken as the steel carrier inside diameter (DN200 ≈ 210 mm ?); pre-insulated twin pipe casing from Logstor (DN200 Ø 560 mm)",
  source_roles=[dict(id='energiforsk2021', term='velocity by DN', role='coefficient', conf=60, verified=True),
                dict(id='ubc336100', term='service ≤ 2 m/s', role='rule', conf=80, verified=True),
                dict(id='logstor2014', term='casing Ø', role='coefficient', conf=50, verified=True)]),
 dict(id='heat_pumps', name='Heat pumps', unit='count', stage='size', conf=50, status='in hand',
  inputs=['heat_delivered', 'cop'], sources=['sabroeDualPAC', 'geaRedHP'],
  formula='n = ⌈peak network-side heat ÷ unit heating capacity⌉',
  coef='unit 1,991 kW at 50 → 70 °C (Sabroe DualPAC 716-W, nearest the median of 10 Sabroe and GEA units; 1,841 kW at 70 → 90 °C); spare heat pump: no rule found ?',
  source_roles=[dict(id='sabroeDualPAC', term='1,991 kW unit', role='coefficient', conf=50, verified=True),
                dict(id='geaRedHP', term='range across makers', role='check', conf=50, verified=True)]),
 dict(id='phe_frames', name='Plate heat exchangers', unit='count', stage='size', conf=45, status='in hand',
  inputs=['hr_flow'], sources=['kelvionNP', 'alfaT20', 'alfaManual', 'ubc336100'],
  formula='n = ⌈flow ÷ 350 m³/h⌉ at each interface',
  coef="350 m³/h per frame (Kelvion NP150X, DN150; the NP250L line does not agree with itself ?); frame drawn: Alfa Laval T20, 0.78 × up to 3.93 × 2.145 m; approach ≤ 5 °C (UBC 4.1.5); free space to lift plates in and out — distance not printed, 'refer to the delivered PHE drawing' ?; which loops are separated by a heat exchanger (data centre loop / heat pump / network) is our reading ?",
  source_roles=[dict(id='kelvionNP', term='350 m³/h per frame', role='coefficient', conf=50, verified=True),
                dict(id='alfaT20', term='frame size', role='coefficient', conf=50, verified=True),
                dict(id='alfaManual', term='free space for plates (no number)', role='rule', conf=40, verified=True),
                dict(id='ubc336100', term='5 °C approach', role='rule', conf=80, verified=True)]),
 dict(id='buffer_tanks', name='Buffer tanks', unit='count', stage='size', conf=40, status='in hand',
  inputs=['heat_pumps'], sources=['daikinEWWVZ', 'reflexH5000'],
  formula='n = ⌈heat-pump capacity (kW) × 3.5–5 L/kW ÷ 5,000 L⌉',
  coef="3.5 (dual circuit) – 5 (single circuit) L/kW is Daikin's minimum system water content for its water-to-water units, rated on cooling kW at 12/7 °C; using it on heating kW is our reading ?; pipework water also counts, so this is an upper bound; it is a minimum for stable control, not heat storage (no l/kW storage rule found ?); tank Reflex Storatherm H 5000/R, Ø 1.5 × 3.211 m",
  source_roles=[dict(id='daikinEWWVZ', term='3.5–5 L/kW minimum water content', role='coefficient', conf=40, verified=True),
                dict(id='reflexH5000', term='5,000 L tank', role='coefficient', conf=60, verified=True)]),
 dict(id='hr_pumps', name='Heat-recovery pumps', unit='count', stage='size', conf=35, status='in hand',
  inputs=['hr_flow'], sources=['armstrong4030'],
  formula='one duty pump per loop (source side, network side); standby pumps ?',
  coef='no N+1 or duty/standby rule found in Vancouver NEU, UBC 33 61 00, Edmonton DESS v8, Toronto DE-Ready or the CIBSE draft ?; pump frame Armstrong 4030 (200-330A to about 800 m³/h at 1,500 rpm), dimensions not mapped ?',
  source_roles=[dict(id='armstrong4030', term='pump frame', role='coefficient', conf=30, verified=False)]),
 dict(id='hr_plant_room', name='Heat-recovery plant room', unit='m²', stage='size', conf=35, status='in hand',
  inputs=['heat_pumps', 'phe_frames', 'buffer_tanks', 'hr_pumps'], sources=['nbc6215', 'nbcAB2023', 'tsbcDBP202405', 'tsbcIBDA202001', 'neuETS', 'nfc2020_2712'],
  formula='room = the units laid side by side with 1.1 m aisles between and around; heat pumps in a refrigeration machinery room; the network connection (ETS) in its own room to the NEU table',
  coef="refrigeration equipment to CSA B52 (NBC 2020 / NBC(AE) 2023 6.2.1.5); ammonia units of about 2 MW are over TSBC's 125 kW exemption, so the design must be registered (D-BP 2024-05); B52 machinery-room rules (ventilation, detection, doors) not read — paywalled ?; aisles 1.1 m by analogy with NFC 2.7.1.2 open floor areas ?; ETS room ≥ 6 × 3 m (building < 13,940 m²) or 6 × 4 m, 2.7 m headroom, on P1 against the building perimeter (Vancouver NEU Rev 1 Table 1); where the plant room sits in the building ?",
  source_roles=[dict(id='nbc6215', term='CSA B52 applies', role='rule', conf=80, verified=True),
                dict(id='tsbcDBP202405', term='registration above 125 kW (ammonia)', role='rule', conf=80, verified=True),
                dict(id='tsbcIBDA202001', term='older thresholds', role='check', conf=50, verified=False),
                dict(id='neuETS', term='ETS room size, location', role='rule', conf=80, verified=True),
                dict(id='nfc2020_2712', term='1.1 m aisles (by analogy)', role='rule', conf=40, verified=True)]),
]
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; d = json.loads(p.read_text())
    (d['new_sources'] if pretty else d['sources']).update(NEWSRC); qs = d['quantities']
    for Q in QS:
        if pretty:
            qs[:] = [x for x in qs if x['id'] != Q['id']] + [Q]
        else:
            qs[Q['id']] = {k: Q[k] for k in ('name', 'formula', 'coef', 'unit', 'sources', 'conf', 'status')}
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, 'ok')
