"""7 Nov 2026 (J.B.; Cowork's heat card): By-law 9552 clause read (checks/research_arch_v1/clause_reads_9552_2026-11-07.md): what a connected new building
must take from the NEU (all space heating, domestic hot water and make-up air heat), the supplements allowed (its own waste heat via 5.2(a)(ii), (iii), (v)),
the 125 W/m2 peak exemption (5.2(c)), and the 50 % credit for heat returned (Sch. C Part 4). Adds to van9552 and r_de_compulsory."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); m = d['meta']; S = d['new_sources']
D = '7 Nov 2026'; WHERE = 'checks/research_arch_v1/clause_reads_9552_2026-11-07.md'
TAG = ' ‖ 7 Nov 2026 clause read (local copy consolidated to 9 Dec 2025): '
TEXT = ("s. 1.2 'heat energy' = 'heat distributed or delivered by water including space heating, domestic hot water, and heat for ventilation make-up air'; "
        "s. 2.1 new buildings in the service area 'must make use of the energy utility system … unless the City Engineer is of the opinion that providing the "
        "service to a building is not practical or economical'; s. 3.1 the system is to 'supply the entire heat energy demand for each designated building'; "
        "s. 5.2 'must utilize the energy utility system for all the space heating and domestic hot water requirements … and must not incorporate any heat "
        "production equipment including boilers, furnaces, hot water heaters or make-up air heaters, air-source or ground-source heat pumps', except (a) "
        "supplements: solar heat, water-to-air heat pumps and water-source VRF 'where the source of heat is the energy utility system or waste heat recovered "
        "inside the building', electric resistance in stairwells and isolated below-grade storage, and '(v) equipment to recover waste heat energy from the "
        "refrigeration or cooling system of the building'; (c) new or non-residential buildings above 125 W/m² peak heat demand intensity may add on-site heat "
        "production for the portion above 125 W/m² only, the NEU staying the primary source; s. 5.3(b) the NEU 'must provide the heat energy requirements for "
        "all domestic hot water and space heating'; s. 8.3 and Sch. C Part 4 'Credit for heat energy returned to energy transfer station $65.172 per each MW "
        "hour multiplied by 50%'. No other terms for supplying heat to the network (?).")
if TAG not in S['van9552']: S['van9552'] += TAG + TEXT
cl = m['check_log'].setdefault('van9552', [])
if not any(c.get('date') == D and c.get('where') == WHERE for c in cl):
    cl.append({'check': 3, 'by': 'Claude Code (clause read)', 'date': D, 'where': WHERE, 'what': 's. 1.2, 2.1, 3.1, 5.2, 5.3(b), 8.3, Sch. C quoted'})
C = {c['id']: c for c in d['conditions']}
c = C.get('r_de_compulsory')
if c and 'all its space heating' not in c['note']:
    c['note'] += (" 7 Nov 2026 clause read: a connected building must take all its space heating, domestic hot water and make-up air heat from the NEU "
                  "(s. 5.2, 5.3(b)); its own waste heat may only supplement (5.2(a)(ii), (iii), (v)); on-site heat production only above 125 W/m² peak "
                  "(5.2(c)); exemption only if the City Engineer finds service not practical or economical (s. 2.1). Inside the area: 339 1st Ave E, 182 m in.")
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('van9552 obligations')
