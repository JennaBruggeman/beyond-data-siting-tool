"""11 Nov 2026 (J.B.): licensed standards' text off GitHub; figures and clause numbers only; no history rewrite.

Quoted passages from licensed standards (NFPA, ASHRAE standards and Handbook chapters, CSA, FM Global data sheets,
EN / prEN / BS EN, ISO/IEC) in the register are replaced by short plain paraphrases. Every figure, unit and
clause / table / page number is kept; meaning (shall / permitted / not less than) is kept; nothing is added.
Titles of documents stay as cited. Government codes, by-laws, government guides, maker pages and papers are not touched.
The old patch scripts that held the same quotes were edited in place with the same paraphrases.
Idempotent: each old passage must be found once, or its paraphrase must already be there.
"""
import json, pathlib, re
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
Q = {q['id']: q for q in d['quantities']}

# (where, [(old, new), ...]); where = ('src', key) | ('q', id, field)
E = [
 (('q', 'recirculation_flag', 'coef'), [
  ('ASHRAE: recirculation "can be a serious problem" for units with intake and exhaust on one housing; roof air "considerably hotter" cuts condenser capacity',
   'ASHRAE: recirculation can be a serious risk for units with intake and exhaust on one housing; much hotter roof-level air cuts condenser capacity'),
 ]),
 (('src', 'iso30134_6'), [
  ("heat pumps outside the boundary 'shall not be included in the calculation' (cl.5)",
   "heat pumps outside the boundary are left out of the calculation (cl.5)"),
  ("measured 'at the logical boundary of the data centre at the handoff point' by flow and temperature rise (cl.6)",
   "measured where heat leaves the data centre's logical boundary (the handoff point), by flow and temperature rise (cl.6)"),
  ("cl.5 heat pumps outside boundary 'shall not be included in the calculation' → Source not opened",
   "cl.5 heat pumps outside boundary left out of the calculation → Source not opened"),
  ("cl.6 measured 'at the logical boundary ... at the handoff point' by flow",
   "cl.6 measured at the logical boundary, at the handoff point, by flow"),
 ]),
 (('src', 'nfpa855_2026'), [
  ("9.6.1.2.1.1 in occupied work centres ESSs 'shall be permitted in the same room as the equipment that they support'",
   "9.6.1.2.1.1 in occupied work centres ESSs are permitted in the same room as the equipment they serve"),
  ("4.7.14 rooms or spaces containing ESSs 'shall be separated from other areas of the building by fire barriers with a minimum 2-hour fire resistance rating and horizontal assemblies with a minimum 2-hour fire resistance rating', unless",
   "4.7.14 rooms or spaces containing ESSs are separated from the rest of the building by fire barriers and horizontal assemblies each rated at least 2 hours, unless"),
 ]),
 (('src', 'ashraeCh45'), [
  ("roof-mounted equipment draws air near the roof that can be 'considerably hotter', reducing",
   "roof-mounted equipment draws air near the roof that can be much hotter than ambient, reducing"),
  ("obstructions next to horizontal-discharge units 'can drastically reduce equipment performance'",
   "obstructions next to horizontal-discharge units can cut equipment performance sharply"),
  ("exhaust-to-intake recirculation 'can be a serious problem' (SI 2015 re-read: 'can be a serious problem ...; Recirculation is even more serious than reduction in airflow rate') for equipment",
   "exhaust-to-intake recirculation can be a serious risk (SI 2015 re-read: the Handbook ranks recirculation as more serious than reduced airflow) for equipment"),
 ]),
 (('src', 'ashrae2015ch51'), [
  ("Table 3 excludes back and edge losses ('not included in the energy values')",
   "Table 3 excludes back and edge losses (the energy values leave them out)"),
  ("the 2015 sentence 'usually 630 to 950 W/m2, which includes back and edge losses' is not in the 2023 text",
   "the 2015 figure of usually 630 to 950 W/m² (back and edge losses included) is not in the 2023 text"),
 ]),
 (('src', 'arch_ashrae621v'), [
  ("'Significant contaminant or odor intensity (Class 3) 15 (5)' ft (m); 'Noxious or dangerous particles (Class 4) 30 (10)'",
   "Class 3 (significant contaminant or odour intensity) 15 ft (5 m); Class 4 (noxious or dangerous particles) 30 ft (10 m)"),
 ]),
 (('src', 'arch_ashrae621ag'), [
  ("minimum dilution factor 'Diesel generators, diesel truck loading area or dock, diesel bus parking/idling area' 2000 × e",
   "minimum dilution factor for diesel generators, diesel truck loading areas or docks and diesel bus parking or idling areas 2000 × e"),
  ("heat rejection equipment 'shall conform to Table 5-1'",
   "heat rejection equipment follows Table 5-1"),
  ("'Approved by ASHRAE and the American National Standards Institute on April 30, 2024', p. i",
   "approved by ASHRAE and ANSI on 30 Apr 2024, p. i"),
  ("Table B-1 (p. 4) 'Diesel generators, diesel truck loading area or dock, diesel bus parking/idling area' 2000 × e",
   "Table B-1 (p. 4) diesel generators, diesel truck loading areas or docks and diesel bus parking or idling areas 2000 × e"),
  ("B1.1 Exception f: 'The minimum separation distances for heat rejection equipment shall conform to Table 5-1' (p. 1)",
   "B1.1 Exception f: minimum separation distances for heat rejection equipment are those of Table 5-1 (p. 1)"),
  ("B2.1 flue vents: 'assume a value of 250 cfm per million Btu/h (0.00043 m3/s per kW) of combustion input' unless",
   "B2.1 flue vents: take 250 cfm per million Btu/h (0.00043 m3/s per kW) of combustion input unless"),
 ]),
 (('src', 'arch_sep_abStandataESS'), [  # CSA C22.1 rule wording, as reproduced in the STANDATA
  ("outdoor ESS batteries 'shall not be located within' 3 m of",
   "outdoor ESS batteries not within 3 m of"),
  ("not 'directly beneath an exit required by National Building Code'",
   "not directly below an exit the National Building Code requires"),
 ]),
 (('src', 'arch_adj_nfpa75PI'), [
  ("quote 2024 edition 6.1.3.2 'The fire resistance rating shall be commensurate with the exposure but not less than 1 hour for both' (antecedent unclear, per PI 50)",
   "cite 2024 edition 6.1.3.2: rating matched to the exposure, at least 1 hour for both (antecedent unclear, per PI 50)"),
  ("PI 58 quotes 1.3.1 'A documented risk assessment shall be the basis for implementation of this standard'",
   "PI 58 cites 1.3.1: the standard is implemented on the basis of a documented risk assessment"),
  ("applied 'optionally based on a risk assessment'",
   "applied optionally, on the basis of a risk assessment"),
 ]),
 (('src', 'arch_adj_csaZ32'), [
  ("1.1.1 deals with '(a) electrical safety associated with health care provision; and (b) essential electrical systems for health care facilities'",
   "1.1.1 covers (a) electrical safety in health care provision and (b) essential electrical systems for health care facilities"),
 ]),
 (('src', 'arch_adj_csaZ3172'), [
  ("scope 'requirements for the planning, design, construction, commissioning, operation, and maintenance of HVAC systems in HCFs'",
   "scope: requirements for HVAC systems in HCFs from planning and design through construction, commissioning, operation and maintenance"),
 ]),
 (('src', 'fmDS0532'), [
  ("2.2.4.1 'Provide one-hour fire-rated interior walls and partitions' for",
   "2.2.4.1 one-hour fire-rated interior walls and partitions for"),
  ("2.2.4.1.1 'If multiple data processing equipment rooms are within the data center, provide two-hour fire-rated interior walls for compartmentation'",
   "2.2.4.1.1 two-hour fire-rated interior walls to compartment the data centre where it has more than one data processing equipment room"),
  ("2.2.13.1 'Select a building site that is above the predicted 0.2% annual exceedance (500-year) flood elevation and includes 1 to 2 ft (0.3 to 0.6 m) of freeboard', at least",
   "2.2.13.1 site above the predicted 0.2% annual exceedance (500-year) flood elevation plus 1 to 2 ft (0.3 to 0.6 m) of freeboard, at least"),
  ("in order of preference, 'In a separate, purpose-built building', 'In the yard with adequate space separation to important buildings', 'At the ground-floor level in the data center'",
   "in order of preference, in a separate purpose-built building, in the yard with enough space separation from important buildings, or on the ground floor of the data centre"),
  ("2.6.4.3.1 'Do not locate emergency generators at roof level or in basement areas'",
   "2.6.4.3.1 no emergency generators at roof level or in basements"),
  ("2.6.4.4.1.1 'Do not locate diesel fuel tanks inside the data center, including the basement, or at roof level'",
   "2.6.4.4.1.1 no diesel fuel tanks inside the data centre (basement included) or at roof level"),
  ("air paths 'independent from those connected to other building spaces'",
   "air paths separate from those serving other parts of the building"),
  ("2.2.1.3.1 'Do not expose the air intake(s) of the building to combustible materials'",
   "2.2.1.3.1 keep the building's air intakes clear of exposure to combustible materials"),
  ("gaseous agents 'not recommended' as they don't cool, and 'cooling the surroundings is a critical factor'",
   "gaseous agents not recommended as they don't cool, and cooling the surroundings is critical"),
 ]),
 (('src', 'nfpa37_2024'), [
  ("4.1.1.1 engines 'readily accessible for maintenance, repair, and firefighting'",
   "4.1.1.1 engines readily accessible (NFPA 37's defined term) for maintenance, repair and firefighting"),
  ("4.1.1.2 air supply designed 'to prevent flue gas products from being drawn from stacks or flues'",
   "4.1.1.2 air supply designed so that flue gases are not drawn in from stacks or flues"),
  ("walls, floors and ceilings 'of at least 1-hour fire resistance rating'",
   "walls, floors and ceilings rated at least 1 hour"),
  ("4.1.4.1 'at least 1.5 m (5 ft) from any openings in the walls of structures' (no exceptions)",
   "4.1.4.1 1.5 m (5 ft) minimum from openings in structure walls (no exceptions)"),
  ("walls, floor, ceiling 'not less than 1 hour'",
   "walls, floor, ceiling rated at least 1 hour"),
  ("discharging outside 'without recirculation'",
   "discharging outside with no recirculation"),
  ("6.5.5 'Overflows, vents, fuel piping, and fuel tanks shall not be located at or near engine air intake, exhaust piping, mufflers, or filters'",
   "6.5.5 overflows, vents, fuel piping and fuel tanks kept away from engine air intakes, exhaust piping, mufflers and filters"),
  ("fill pipe on an exterior wall 'at least 600 mm (24 in.) from any building opening at the same or lower level'",
   "fill pipe on an exterior wall 600 mm (24 in.) minimum from building openings at the same or a lower level"),
  ("8.2.3.1 exhaust 'shall terminate outside the structure at a point where hot gases, sparks, or products of combustion will discharge to a safe location'",
   "8.2.3.1 exhaust ends outside the structure where hot gases, sparks and combustion products discharge safely"),
 ]),
 (('src', 'nfpa75_2024'), [
  ("6.1.1 the ITE area 'shall be housed in a fully sprinklered building' or a Type I or II",
   "6.1.1 the ITE area in a fully sprinklered building or a Type I or II"),
  ("6.1.3 'The ITE area shall be separated from other occupancies within the building, including atria or other open-space construction, by fire-resistant-rated construction'",
   "6.1.3 fire-resistance-rated construction separates the ITE area from other occupancies in the building, atria and other open spaces included"),
  ("6.1.3.2 'The fire resistance rating shall be commensurate with the exposure but not less than 1 hour for both'",
   "6.1.3.2 rating matched to the exposure, at least 1 hour for both"),
  ("6.3.1 the ITE area 'shall not be located above, below, or adjacent to areas or other structures where hazardous processes are located unless approved protective features are provided'",
   "6.3.1 the ITE area not above, below or next to areas or structures with hazardous processes unless approved protection is provided"),
  ("6.3.2 'Access to the ITE area shall be restricted to authorized persons'",
   "6.3.2 ITE area access limited to authorized persons"),
  ("7.1.1 'Only ITE and support equipment shall be permitted in the ITE room'",
   "7.1.1 the ITE room holds only ITE and support equipment"),
  ("and 'all adjacent exposures'",
   "and all adjacent exposures"),
 ]),
 (('src', 'ashrae621_2022'), [
  ("'both those on the subject property and those on adjacent properties'",
   "on the subject property and on adjacent properties alike"),
  ("(the 'diesel generator' dilution factor",
   "(the diesel-generator dilution factor"),
 ]),
 (('src', 'arch_ho_sccC9001'), [
  ("'covers meters for closed systems only'",
   "scope limited to meters for closed systems"),
 ]),
 (('src', 'arch_open_csaC282scope'), [
  ("applies to 'generator sets and associated equipment for providing an emergency electrical power supply' where 'an emergency electrical power supply is required by the National Building Code of Canada (NBCC)',",
   "applies to generator sets and related equipment supplying emergency electrical power where the National Building Code of Canada (NBCC) requires such a supply,"),
  ("Note 3 'Normative provisions of this Standard are not limited to the installations where an generator set is used as the NBCC required emergency power supply source'",
   "Note 3: the normative provisions are not limited to installations where a generator set is the emergency power source the NBCC requires"),
  ("Note 5 other equipment 'could be connected to the generator set (see Clause 6.4.1)'",
   "Note 5 other equipment may be connected to the generator set (see Clause 6.4.1)"),
  ("Note 6 other systems 'should meet the requirements of this Standard, where practical' (Annex E)",
   "Note 6 other systems should meet the Standard where practical (Annex E)"),
 ]),
 (('src', 'arch_open_sccC282'), [
  ("scope 'emergency generators … required by the National Building Code of Canada (NBCC)'",
   "scope: emergency generators required by the National Building Code of Canada (NBCC)"),
 ]),
 (('src', 'arch_open_vanBul2000015'), [  # the C282 quote only; the City's own wording is not in scope
  ("C282: rooms 'used solely for the generator sets and all auxiliary equipment'",
   "C282: rooms used only for the generator sets and their auxiliary equipment"),
 ]),
 (('src', 'arch_open_iaeiTsisserev'), [  # CE Code (CSA C22.1) wording
  ("item c) 'in conformance with CSA C282' (body text",
   "item c), which requires conformance with CSA C282 (body text"),
 ]),
 (('src', 'arch_acc_fmSecurity'), [
  ("2.2.1.7 'Provide supervision of the data center to prevent unauthorized access to the premises and assets in accordance with Data Sheet 9-1, Supervision of Property'",
   "2.2.1.7 supervise the data centre against unauthorized access to premises and assets per Data Sheet 9-1, Supervision of Property"),
  ("2.8.9.2.1 'Install an FM Approved Level 1 or better intrusion alarm system for data and record storage rooms, if these areas have emergency doors that exit outside the secure area'",
   "2.8.9.2.1 an FM Approved intrusion alarm, Level 1 or better, for data and record storage rooms whose emergency doors exit outside the secure area"),
 ]),
 (('src', 'arch_sec2_fm115'), [
  ("'See ... Data Sheet 1-57, Plastics in Construction, for wall-mounted, building-integrated photovoltaic (BIPV) façade systems'",
   "wall-mounted building-integrated photovoltaic (BIPV) façades referred to Data Sheet 1-57, Plastics in Construction"),
  ("has the rating 'negated once PV panels are placed above it' unless",
   "loses that rating once PV panels are placed above it unless"),
  ("2.1.1.4 A 'Use only noncombustible frames and mounting systems. Use PV panels that are glass backed.'",
   "2.1.1.4 A noncombustible frames and mounting systems only, and glass-backed PV panels"),
  ("3.2 'plastic frames, backsheets and adhesives' 'can ignite'",
   "3.2 plastic frames, backsheets and adhesives can ignite"),
  ("encapsulants (EVA) 'provide additional fuel'",
   "encapsulants (EVA) add fuel"),
 ]),
 (('src', 'arch_up_fm0523'), [
  ("2.2.1 'Locate power systems and their associated fuel supply systems outside important buildings'",
   "2.2.1 power systems and their fuel supply systems located outside important buildings"),
  ("tanks 'not considered an alternative'",
   "tanks not accepted as an alternative"),
  ("2.2.3 A at or above grade 'a minimum 1-hour fire-rated cutoff room located along an outside wall with openings accessible to firefighters'",
   "2.2.3 A at or above grade a cutoff room rated at least 1 hour, on an outside wall, with openings firefighters can reach"),
  ("B below grade 'a 3-hour fire-rated, liquid-tight, concrete or masonry vault'",
   "B below grade a 3-hour, liquid-tight concrete or masonry vault"),
  ("2.3.2.3 'multiple generators in isolated areas' where",
   "2.3.2.3 several generators in separate areas where"),
  ("2.4.4 exhaust 'exit the building in the shortest, most direct route'",
   "2.4.4 exhaust leaves the building by the shortest, most direct route"),
 ]),
 (('src', 'arch_up_fm1326'), [
  ("1.0 'Recommendations contained in this data sheet are not applicable to engines used to drive fire pumps or emergency electric power generators'",
   "1.0 the data sheet does not apply to engines driving fire pumps or emergency electric power generators"),
 ]),
 (('src', 'arch_up_fm0788'), [
  ("'A minimum of 5 ft (1.5 m) from building walls or openings'",
   "5 ft (1.5 m) minimum to building walls or openings"),
  ("'at least 5 ft (1.5 m) from building openings and 15 ft (4.5 m) from powered air-intake devices'",
   "5 ft (1.5 m) minimum to building openings and 15 ft (4.5 m) to powered air intakes"),
 ]),
 (('src', 'arch_up_fm0528'), [
  ("2.2.4 'Locate lead-acid and nickel-cadmium batteries in a minimum one-hour fire-rated room'",
   "2.2.4 lead-acid and nickel-cadmium batteries in a room rated at least one hour"),
  ("'HVAC systems separate from the equipment areas'",
   "own HVAC, separate from the equipment areas"),
 ]),
 (('src', 'arch_up_fm0120'), [
  ("separation 'in accordance with Data Sheet 1-42'",
   "separation per Data Sheet 1-42"),
  ("dumpsters 'at least 30 ft (9 m) from exposed buildings' unless",
   "dumpsters 30 ft (9 m) minimum from exposed buildings unless"),
  ("2.2.11 'metal chain link fencing around the yard' per DS 10-6",
   "2.2.11 metal chain-link fence around the yard per DS 10-6"),
  ("combustible walls include 'Any wall with windows that can be opened'",
   "combustible walls include any wall with operable windows"),
 ]),
 (('src', 'arch_up_fm0157'), [
  ("2.2.25.1 'Use FM Approved, wall-mounted BIPV façade systems' (FM 4483)",
   "2.2.25.1 wall-mounted BIPV façade systems to be FM Approved (FM 4483)"),
  ("Note 'glass-glass building integrated photovoltaics … are considered combustible'",
   "Note: glass-glass building-integrated photovoltaics count as combustible"),
  ("3.2.25 'No standardized testing is globally available for BIPV facades systems'",
   "3.2.25 no standard test for BIPV façade systems exists worldwide"),
 ]),
 (('src', 'arch_up_fm0140'), [
  ("flood zones 'by both elevation and footprint'",
   "flood zones in both elevation and footprint"),
  ("freeboard, 'at least 500 ft (152 m) from direct wave impacts' or flows",
   "freeboard, 500 ft (152 m) or more from direct wave impacts or flows"),
  ("2.2.1.3 'not in an area protected by a levee or other man-made flood control works'",
   "2.2.1.3 not in an area whose flood protection is a levee or other constructed flood-control works"),
  ("2.3.1 flood-prone areas 'used solely for nonessential operations'",
   "2.3.1 flood-prone areas used only for nonessential operations"),
 ]),
 (('src', 'arch_up_fm0901'), [
  ("2.3.1.1 A 'metal fences of heavy industrial-grade construction with bars spaced closely together. Chain-link fences and gates should not be used. Walls should be reinforced masonry or concrete', anti-climb",
   "2.3.1.1 A heavy industrial-grade metal fences with closely spaced bars, no chain-link fences or gates, walls of reinforced masonry or concrete, anti-climb"),
  ("barriers 'also protect cooling equipment, generators, fuel tanks, and utilities'",
   "barriers also around cooling equipment, generators, fuel tanks and utilities"),
  ("parking, 'Neighboring property', garbage",
   "parking, neighbouring property, garbage"),
  ("D 'Do not use locks that require electrical power, e.g. electromagnetic locks, to secure physical access'",
   "D no power-dependent locks (e.g. electromagnetic locks) to secure physical access"),
 ]),
 (('src', 'arch_up_fm0916'), [
  ("(1) lighting 'ten ft (three m) on either side of fences, and areas within 40 ft (12 m) of building entrances'",
   "(1) lighting 10 ft (3 m) each side of fences and within 40 ft (12 m) of building entrances"),
  ("(3) fences 'flush with the ground and a minimum of 7 ft (2 m) in height, with barbed wire at the top tilted toward the outside'",
   "(3) fences flush with the ground, at least 7 ft (2 m) high, topped with barbed wire angled outward"),
  ("(source prints '1 in. (25 cm)')",
   "(source prints 1 in. as 25 cm)"),
  ("(5) tenant cutoffs 'solid masonry construction, complete from the floor to the underside of the roof'",
   "(5) tenant cutoffs of solid masonry, full height from floor to underside of roof"),
 ]),
 (('src', 'arch_pub_en12572cat'), [
  ("scope 'specifies the safety requirements and calculation methods for bouldering walls, including the safety zone'",
   "scope: safety requirements and calculation methods for bouldering walls and their safety zone"),
 ]),
 (('src', 'arch_hsg_sccZ8000'), [
  ("(no date shown): 'This Standard describes essential elements and specific requirements for the planning, design, and construction of HCFs'; covers 'Facilities providing outpatient diagnosis and treatment services', hospitals, 'residential care facilities'.",
   "(no date shown): scope is essential elements and specific requirements for planning, designing and building HCFs; covers outpatient diagnosis and treatment facilities, hospitals and residential care facilities."),
 ]),
 (('src', 'arch_sys_sccC448'), [
  ("minimum requirements for 'equipment and material selection, site survey, system design, installation, testing and verification, documentation, and commissioning and decommissioning'",
   "minimum requirements covering equipment and material choice, site survey, design, installation, testing and verification, documentation, commissioning and decommissioning"),
 ]),
 (('src', 'arch_sys_sccB805'), [
  ("'design, materials, installation, and operation of rainwater harvesting systems' for potable",
   "covers design, materials, installation and operation of rainwater harvesting systems for potable"),
 ]),
 (('src', 'arch_tmp_ashrae55fs'), [
  ("'Specifies thermal environmental conditions acceptable for healthy adults in indoor spaces'; covers 'floor temperature, radiant asymmetry, temperature stratification and draft'",
   "sets indoor thermal conditions acceptable to healthy adults; covers floor temperature, radiant asymmetry, stratification and draft"),
 ]),
 (('src', 'arch_dc_fm0532rooms'), [
  ("2.3.1.1.1 'Do not store packing materials or other combustibles (e.g., cardboard, plastic containers, etc.,) in the data processing equipment room or other critical areas (e.g., utility, UPS rooms, battery rooms, etc.,)'",
   "2.3.1.1.1 no packing materials or other combustibles (cardboard, plastic containers and the like) stored in the data processing equipment room or other critical areas (utility, UPS and battery rooms and the like)"),
  ("2.3.1.1.2 'De-box equipment outside the data processing equipment rooms or other critical areas' (p. 7)",
   "2.3.1.1.2 unpack equipment outside the data processing equipment rooms and other critical areas (p. 7)"),
  ("2.4.3.2.3.7 'Provide a permanently connected reserve of clean agent supply cylinder(s)' (p. 19)",
   "2.4.3.2.3.7 a permanently connected reserve supply of clean agent cylinders (p. 19)"),
  ("2.6.6.4.2 'Provide audible and visual alarms in the vicinity of the equipment and at a constantly attended location' (p. 28)",
   "2.6.6.4.2 audible and visual alarms near the equipment and at a constantly attended location (p. 28)"),
  ("spaces 'are typically located in different parts of the facility'",
   "spaces usually sit in different parts of the facility"),
  ("UPS 'providing power to critical systems typically for 10-15 minutes while backup/emergency generators activate'; 'UPS architecture can be centralized with batteries located inside dedicated battery rooms or electrical rooms', or 'UPS systems dedicated to each data hall' (p. 50)",
   "UPS carries critical systems typically for 10–15 minutes while backup or emergency generators start; UPS may be centralized, with batteries in dedicated battery rooms or electrical rooms, or dedicated to each data hall (p. 50)"),
 ]),
 (('src', 'arch_up2_fm0532'), [
  ("2.2.1.6 'Do not route cooling or domestic liquid piping above areas containing critical/high-value equipment' (p. 5)",
   "2.2.1.6 no cooling or domestic liquid piping routed above areas with critical or high-value equipment (p. 5)"),
  ("2.2.5.2 'Limit the maximum height of ceilings in data centers to 30 ft (9 m)' (p. 6)",
   "2.2.5.2 data-centre ceilings at most 30 ft (9 m) high (p. 6)"),
  ("2.6.4.3.1 'Do not locate emergency generators at roof level or in basement areas' (p. 26)",
   "2.6.4.3.1 no emergency generators at roof level or in basements (p. 26)"),
  ("2.6.4.4.1.1 'Do not locate diesel fuel tanks inside the data center, including the basement, or at roof level' (p. 27)",
   "2.6.4.4.1.1 no diesel fuel tanks inside the data centre (basement included) or at roof level (p. 27)"),
 ]),
 (('src', 'arch_up2_fm0533'), [
  ("all 'accessible for manual firefighting'",
   "all reachable for manual firefighting"),
 ]),
 (('src', 'arch_up2_tocs'), [
  ("(6.2.1 'Protection of emergency electrical power supply system by location', p. 20",
   "(6.2.1 protection of the emergency power supply system by location, p. 20"),
  ("7.3.3 'Protection and location of supply tanks')",
   "7.3.3 protection and location of supply tanks)"),
  ("clause on installations 'located in flood-prone and high-velocity wind conditions'",
   "clause on installations in flood-prone and high-wind locations"),
 ]),
 (('src', 'arch_csa_c282'), [
  ("5.2 all system components 'separated from the remainder of the building by a fire separation with a fire-resistance rating of not less than 2 h' (p. 18)",
   "5.2 all system components separated from the rest of the building by a fire separation rated at least 2 h (p. 18)"),
  ("6.1.1.1 set 'on the same property as the building it supplies or on an adjoining property' (p. 19)",
   "6.1.1.1 set on the property of the building it serves or on an adjoining one (p. 19)"),
  ("6.2.1 the system 'located in areas above the flood elevation', in a separate",
   "6.2.1 the system above the flood elevation, in a separate"),
  ("6.5.1.1 working space 'not less than 1 m clearance' around",
   "6.5.1.1 working space of at least 1 m clearance around"),
  ("non-emergency loads such as 'telecommunications and data-processing equipment' may be connected",
   "non-emergency loads such as telecommunications and data-processing equipment may be connected"),
  ("7.3.1 fuel for at least 2 h at maximum site design load 'maintained on site at all times' (p. 29)",
   "7.3.1 fuel for at least 2 h at maximum site design load kept on site at all times (p. 29)"),
 ]),
 (('src', 'arch_csa_b139'), [
  ("'at least 600 mm (24 in) clearance around the tank'",
   "600 mm (24 in) minimum clearance round the tank"),
  ("'a minimum distance of 3 m (10 ft) from the exposing wall' to adjacent properties or buildings",
   "3 m (10 ft) minimum from the exposing wall to adjacent properties or buildings"),
  ("7.4.4 'Floor drains shall not be installed in tank storage rooms' (p. 81)",
   "7.4.4 no floor drains in tank storage rooms (p. 81)"),
  ("8.2 tanks 'shall not be installed above ground level outside of a building' except as B139.1.1 permits ('above ground level' includes roofs)",
   "8.2 no tanks outside a building above ground level except as B139.1.1 permits (above ground level includes roofs)"),
  ("engine supply tanks 'shall be installed in engine service rooms' (p. 232)",
   "engine supply tanks go in engine service rooms (p. 232)"),
  ("aggregate in a protected 2 h room, else 'not permitted'",
   "aggregate in a protected 2 h room, else not permitted"),
  ("6.5.3 tanks supplying engines 'outside above the ground-level storey' (roof, balcony, parking structure): 'an individual capacity of 1250 L (275 gal) nor an aggregate capacity of 2500 L (550 gal)' per supply line",
   "6.5.3 tanks supplying engines outdoors above the ground-level storey (roof, balcony, parking structure): no more than 1250 L (275 gal) each or 2500 L (550 gal) in aggregate per supply line"),
 ]),
 (('src', 'arch_csa_b52'), [
  ("machinery rooms 'shall not exceed 250 kg (550 lb)'",
   "machinery rooms at most 250 kg (550 lb)"),
  ("4.5.8.1 'No portion of a refrigeration system shall be installed in or on a public stairway, stair landing, or exit'",
   "4.5.8.1 no part of a refrigeration system in or on a public stair, stair landing or exit"),
  ("all of a machinery room 'within 46 m (150 ft) and in a direct line of an exit door'",
   "all of a machinery room within 46 m (150 ft) of an exit door, in a direct line"),
  ("and 'not open to a public corridor or any room used for assembly'",
   "and not opening onto a public corridor or an assembly room"),
  ("vestibule 'not less than 1.8 m (6 ft) long'",
   "vestibule at least 1.8 m (6 ft) long"),
  ("exit door 'that opens directly to the outdoors'",
   "exit door opening straight outdoors"),
  ("ventilation for those groups 'operated continuously'",
   "ventilation for those groups runs continuously"),
 ]),
 (('src', 'arch_csa_c448'), [
  ("for vertical ground heat exchangers 'beneath a building or parking garage, clearances shall be defined by the local AHJ and the structural engineer'",
   "for vertical ground heat exchangers under a building or parking garage, the local AHJ and the structural engineer set the clearances"),
  ("warm-up and cool-down 'increased sizing (by no more than 30%)' or thermal storage",
   "warm-up and cool-down by sizing up (30% at most) or thermal storage"),
  ("winter water 'within 12.2 °C (22 °F)' and summer 'within 16.6 °C (30 °F)' of",
   "winter water within 12.2 °C (22 °F) and summer within 16.6 °C (30 °F) of"),
  ("load side 'no greater than 52 °C (125 °F)' when possible",
   "load side 52 °C (125 °F) at most when possible"),
  ("heating water 'maximum supply temperature of 125 °F (52 °C) with a temperature differential of 20 °F (11 °C)'",
   "heating water supply at most 125 °F (52 °C) with a 20 °F (11 °C) differential"),
  ("system heating COP 'greater than 3.0'; combined heating and cooling COP 'greater than 6.0'",
   "system heating COP above 3.0; combined heating and cooling COP above 6.0"),
 ]),
 (('src', 'arch_csa_b805'), [
  ("vehicle loads 'as defined by AASHTO M43'",
   "vehicle loads per AASHTO M43"),
  ("access openings 'shall not be located directly under sanitary, waste, or storm drainage piping'",
   "access openings not directly below sanitary, waste or storm drainage piping"),
 ]),
 (('src', 'arch_csa_b1281'), [
  ("access openings for entry 'not less than 450 mm'",
   "access openings for entry at least 450 mm"),
  ("by '100 mm when above ground' and '300 mm when below ground'",
   "by 100 mm above ground and 300 mm below ground"),
 ]),
 (('src', 'arch_nfpa_96'), [
  ("rooftop terminations: '(1) A minimum of 10 ft (3 m) of horizontal clearance from the outlet to adjacent buildings, property lines, and air intakes';",
   "rooftop terminations: (1) at least 10 ft (3 m) horizontally from the outlet to adjacent buildings, property lines and air intakes;"),
 ]),
 (('src', 'arch_nfpa_13'), [
  ("examples end with 'Mechanical rooms'",
   "examples end with mechanical rooms"),
  ("includes 'Diesel fire pump houses and rooms containing pump drivers and fuel tanks'",
   "includes diesel fire pump houses and rooms holding pump drivers and fuel tanks"),
 ]),
 (('src', 'arch_nfpa_2001'), [
  ("4.3.6 adjacent areas: 'Consideration shall be given to the possibility of a clean agent migrating to adjacent areas outside of the protected space'",
   "4.3.6 adjacent areas: account for clean agent possibly migrating to areas next to the protected space"),
 ]),
 (('src', 'arch_nfpa_76'), [
  ("'separated from the remainder of the building by 2-hour fire-resistance-rated partitions'",
   "separated from the rest of the building by partitions rated 2 hours"),
  ("built 'to protect against the leakage of water from the roof or occupied areas above'",
   "built to keep out water leaking from the roof or occupied areas above"),
  ("by 'a minimum 1-hour fire-resistive construction'",
   "by construction rated at least 1 hour"),
 ]),
 (('src', 'arch_hce_cimspaClimb'), [  # the guide quoting BS EN 12572-2 s. 4.3; the guide's own words are not in scope
  ("'at least 2.5m' for walls over 3 m",
   "at least 2.5 m for walls over 3 m"),
 ]),
 (('src', 'arch_hce_en12572_1sample'), [
  ("cl. 1 applies to 'ACS in normal use for sport climbing'; cl. 4.1 'the height of the first point shall not exceed 3,10 m';",
   "cl. 1 applies to ACS in normal sport-climbing use; cl. 4.1 first protection point no higher than 3.10 m;"),
 ]),
 (('src', 'arch_up4_en12572_1'), [
  ("cl. 1 'applicable for ACS in normal use for sport climbing'",
   "cl. 1 applies to ACS in normal sport-climbing use"),
  ("cl. 4.1 p. 6 'the height of the first point shall not exceed 3,10 m'",
   "cl. 4.1 p. 6 first protection point no higher than 3.10 m"),
  ("spacing x '1 m if h ≤ 4 m' rising to '2,00 m for h > 10 m' (±10 %)",
   "spacing x 1 m where h ≤ 4 m, rising to 2.00 m where h > 10 m (±10 %)"),
  ("cl. 4.7 p. 11 'The horizontal falling space shall be 2 m behind, 1,5 m either side and 8 m below the protection points' (Figure 6)",
   "cl. 4.7 p. 11 falling space 2 m behind, 1.5 m each side and 8 m below the protection points (Figure 6)"),
  ("cl. 4.8 free space 'shall allow the climber to land safely and other users to move without being obstructed' (no dimension)",
   "cl. 4.8 free space lets the climber land safely and others move unobstructed (no dimension)"),
 ]),
 (('src', 'arch_up4_en12572_2'), [
  ("height 'measured between the highest possible point a climber can hold and the top of the impact area'",
   "height measured from the top of the impact area to the highest hold a climber can reach"),
  ("cl. 4.1 p. 5 'The maximum height for bouldering shall be 4 500 mm. It shall be up to 4 000 mm high, where it is possible to stand on the top'",
   "cl. 4.1 p. 5 bouldering walls at most 4 500 mm high, or 4 000 mm where a climber can stand on top"),
  ("shingle 8–16 mm, 'minimum depth of 400 mm'",
   "shingle 8–16 mm, at least 400 mm deep"),
 ]),
 (('src', 'arch_up4_prEN12572_1'), [
  ("'Will supersede EN 12572-1:2017'",
   "to supersede EN 12572-1:2017"),
  ("'THIS IS A DRAFT AND MUST NOT BE REGARDED OR USED AS A BRITISH STANDARD'",
   "marked as a draft, not to be used as a British Standard"),
  ("falling space '2 m behind, 1,5 m either side and 8 m below' unchanged, plus 'Consideration should be given … when using large macros and volumes' (p. 12)",
   "falling space 2 m behind, 1.5 m each side and 8 m below unchanged, plus a note to consider large macros and volumes (p. 12)"),
 ]),
 (('src', 'arch_up4_prEN12572_2'), [
  ("'This document will supersede EN 12572-2:2017'",
   "to supersede EN 12572-2:2017"),
  ("incl. 'modified Table 2', 'modified Figure 1',",
   "incl. Table 2 and Figure 1 modified,"),
  ("NOTE 2 'Macros and volumes … are to be taken into account for the length (L1)'",
   "NOTE 2 macros and volumes count toward the length (L1)"),
  ("overhanging 'the impact flooring shall fill any space to keep a continuous impact area up to 500mm'",
   "overhanging the impact flooring fills gaps to keep the impact area continuous up to 500 mm"),
 ]),
 (('src', 'arch_up4_ashraeCh52'), [
  ("p. 52.2 'entering fluid temperatures should not exceed 66°C' (concrete)",
   "p. 52.2 entering fluid at most 66 °C (concrete)"),
  ("'Heat fluxes are at the snow-melting surface only'",
   "fluxes are at the snow-melting surface only"),
  ("back and edge losses 'may vary from 4 to 50%', back losses in steady state 'approximately 20%', '50 mm insulation layer reduces back losses to approximately 1 to 3%'",
   "back and edge losses range 4 to 50%, steady-state back losses about 20%, cut to about 1 to 3% by a 50 mm insulation layer"),
  ("transient start-up fluxes 'up to five times greater', edge losses '15 to 35%' of the heat",
   "transient start-up fluxes as much as five times higher, edge losses 15 to 35% of the heat"),
  ("standard practice '20 mm pipe or tube on 230 mm centers', 'minimum of 50 mm of concrete above. This requires a 130 mm slab'",
   "standard practice 20 mm pipe or tube at 230 mm centres with at least 50 mm of concrete above, so a 130 mm slab"),
  ("PE limit 'typically 60°C', concrete entering water 'usually must be less than 65°C, or the value specified in the relevant standard (e.g., CSA Standard A23)'",
   "PE limit typically 60 °C, concrete entering water usually below 65 °C or the limit in the relevant standard (e.g., CSA A23)"),
  ("p. 52.12–52.13 'In a district heating system, the snow-melting system may be tied to the return piping of the district'",
   "p. 52.12–52.13 with district heating, the snow-melting system may connect to the district's return piping"),
  ("fluid ΔT 'less than 17 K'; pipe 'within about 50 mm of the surface'",
   "fluid ΔT under 17 K; pipe about 50 mm or less below the surface"),
  ("The 2015 sentence 'usually 630 to 950 W/m2, which includes back and edge losses' is not in the 2023 text",
   "The 2015 figure of usually 630 to 950 W/m² (back and edge losses included) is not in the 2023 text"),
 ]),
 (('src', 'arch_up4_ashraeCh6Pools'), [
  ("natatorium air 'ideally at or above the water temperature, with a maximum of 30°C db'",
   "natatorium air ideally at or above water temperature, at most 30 °C db"),
  ("space temperatures '5 to 8 K warmer' than",
   "space temperatures 5 to 8 K warmer than"),
  ("dew point '16 to 20°C for ambient conditions of 28 to 29°C and 50 to 60% rh'",
   "dew point 16 to 20 °C at 28 to 29 °C and 50 to 60% rh"),
  ("pools air '1 to 2 K above the water temperature (but not above the comfort threshold of 30°C)'",
   "pools air 1 to 2 K above water temperature, not over the 30 °C comfort threshold"),
  ("p. 6.6 'negative pressure of 15 to 40 Pa', 'Most codes require a minimum of six air changes per hour', pool areas '4 to 6', spectator '6 to 8' ACH; 'indoor pools usually have high ceilings' (no height given)",
   "p. 6.6 negative pressure 15 to 40 Pa; most codes call for at least six air changes per hour; pool areas 4 to 6, spectator 6 to 8 ACH; indoor pools usually have high ceilings (no height given)"),
  ("glass blanketed with '15 to 28 L/s per square metre'",
   "glass blanketed with 15 to 28 L/s per m²"),
  ("chemical storage in 'a separate, dedicated, well-ventilated space that is under negative pressure'",
   "chemical storage in its own well-ventilated room under negative pressure"),
  ("heated 'with compressor waste heat'",
   "heated by compressor waste heat"),
 ]),
 (('src', 'arch_up4_csaZ8000_12'), [
  ("12.2.1.6 p. 572 'Indoor relative humidity of 30% or greater can result in excessive condensation on or within the building envelope during winter' (note)",
   "12.2.1.6 p. 572 indoor RH of 30% or more can cause heavy condensation on or in the envelope in winter (note)"),
  ("12.2.2.1 p. 573 'The minimum ceiling height shall be 2.4 m', exceptions: corridors, storage, toilet rooms 'not less than 2.4 m', small unoccupied spaces may be reduced; rooms with ceiling-mounted equipment 'of sufficient height'; mental-health patient bedrooms and secure/observation rooms 'minimum ceiling height of 2.75 m'; specialized areas 'as specified in Table 9.3, Items 1 to 3' (not sent); 12.2.2.2 overhead clearances 'not less than 2.2 m' in bed and stretcher paths, 'other areas may be 2 m', existing structures 'up to 1.9 m';",
   "12.2.2.1 p. 573 minimum ceiling height 2.4 m; exceptions: corridors, storage, toilet rooms at least 2.4 m, small unoccupied spaces may be lower; rooms with ceiling-mounted equipment high enough for it; mental-health patient bedrooms and secure/observation rooms at least 2.75 m; specialized areas per Table 9.3, Items 1 to 3 (not sent); 12.2.2.2 overhead clearances at least 2.2 m in bed and stretcher paths, 2 m allowed elsewhere, existing structures up to 1.9 m;"),
  ("12.2.3.5 stretcher doors 'at least 1100 mm'; 12.2.3.9 'The minimum door height shall be 2100 mm';",
   "12.2.3.5 stretcher doors at least 1100 mm; 12.2.3.9 doors at least 2100 mm high;"),
  ("housekeeping pads 'a minimum 100 mm thick'",
   "housekeeping pads at least 100 mm thick"),
  ("12.3.4.6 'Floors for mechanical rooms shall have a minimum of 130 mm thick concrete'",
   "12.3.4.6 mechanical room floors at least 130 mm of concrete"),
 ]),
 (('src', 'arch_up4_csaZ8000_9'), [
  ("9.2.3.1 p. 313 'All HVAC shall be in accordance with CSA Z317.2'",
   "9.2.3.1 p. 313 all HVAC to CSA Z317.2"),
  ("strollers 'allow 2.5 m² per stroller', 'Typically, five spaces'",
   "strollers 2.5 m² each, typically five spaces"),
  ("9.2.4.2.3 p. 315 'When possible, the adult day program shall be located at street level'",
   "9.2.4.2.3 p. 315 adult day program at street level where possible"),
  ("participant washrooms 'not more than 12 m away from the activity room'",
   "participant washrooms within 12 m of the activity room"),
  ("space tables give 'the minimum size of a room' where",
   "space tables give minimum room sizes where"),
  ("exam rooms (items 1–3) 'See Table 13.1, Item 12' (not sent: ?)",
   "exam rooms (items 1–3) per Table 13.1, Item 12 (not sent: ?)"),
  ("multi-purpose room 'Minimum 11.2', 'suggest allocation of 1.5 to 2.0 m² per person'",
   "multi-purpose room at least 11.2, with 1.5 to 2.0 m² per person suggested"),
 ]),
 (('src', 'typ_heat_cascade_ashraeCh52T6'), [
  ("p. 52.12 'heat may be available from secondary sources'; 'Other low-temperature waste … with or without heat pumps'; 'the snow-melting system may be tied to the return piping of the district, which increases the overall temperature drop' (Brown 1999)",
   "p. 52.12 heat may come from secondary sources, including other low-temperature waste heat, with or without heat pumps; the snow-melting system may connect to the district's return piping, which widens the overall temperature drop (Brown 1999)"),
 ]),
 (('src', 'ashraeTG5liquid'), [
  ('Table 3.1 "2021 Thermal Guidelines for Liquid Cooling", p. 47',
   'Table 3.1, 2021 Thermal Guidelines for Liquid Cooling, p. 47'),
  ('"Minimum water temperature for all classes is 2°C"',
   'minimum water temperature 2 °C for all classes'),
  ('p. 48: "The liquid cooling classes with supply temperatures of 32°C ... and higher (shown in Table 3.1) are candidates for district heating."',
   'p. 48: classes with supply temperatures of 32 °C and above (Table 3.1) are candidates for district heating.'),
 ]),
 (('src', 'weyburnC282'), [  # fire department summary; the quoted sentences may be C282 wording
  ("'The emergency electrical power shall be thoroughly tested monthly', running the set at 'at least 30% of the rated load for 60 minutes'",
   "a thorough monthly test of the emergency electrical power, running the set at no less than 30% of rated load for 60 minutes"),
 ]),
]


def get(w):
    if w[0] == 'src':
        return d['new_sources'][w[1]]
    return Q[w[1]][w[2]]


def put(w, s):
    if w[0] == 'src':
        d['new_sources'][w[1]] = s
    else:
        Q[w[1]][w[2]] = s


# 11 Nov 2026 (from-scratch rebuild): an old patch may load a checks/ file whose quote was paraphrased there in its own words;
# then neither this old passage nor this paraphrase is in the entry. Accepted when none of the old passage's quoted words remain.
QW = re.compile(r"'([^']{12,})'|\"([^\"]{12,})\"")
def upstream(old, s):
    inner = [a or b for a, b in QW.findall(old)]
    return bool(inner) and not any(t in s for t in inner)
n_done = n_already = n_up = 0
for w, pairs in E:
    s = get(w)
    for old, new in pairs:
        c = s.count(old)
        if c == 1:
            s = s.replace(old, new); n_done += 1
        elif c == 0 and new in s:
            n_already += 1
        elif c == 0 and upstream(old, s):
            n_up += 1
        else:
            raise SystemExit(f'{w}: found {c} times: {old[:80]}')
    put(w, s)
for w, _ in E:
    if w[0] == 'q':
        Q[w[1]]['revised'] = '2026-11-11'
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print(f'{len(E)} entries; {n_done} passages rewritten, {n_already} already done, {n_up} paraphrased upstream')

