"""2 Nov 2026: Architecture mode's own parts in the register (tool/arch.js; J.B. decisions in checks/architecture_mode_notes_2026-10-30.md).
Shown only in the Architecture template (templates tier 'arch_only'). Sources: the program catalogue tool/arch_programs.json (built from checked
sources only; checks/research_arch_v1/CATALOGUE_BRIEF.md) and the register entries named below."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); S = d['new_sources']
cat = json.loads((R / 'tool/arch_programs.json').read_text())
def ids(o):
    out = set()
    if isinstance(o, dict):
        for k, v in o.items():
            if k == 'src' and isinstance(v, list): out |= set(v)
            else: out |= ids(v)
    elif isinstance(o, list):
        for v in o: out |= ids(v)
    elif isinstance(o, str):
        import re
        for m in re.findall(r'\[([A-Za-z0-9_,; ]+)\]\s*$', o): out |= {x.strip() for x in re.split(r'[,;]', m) if x.strip()}
    return out
CS = sorted(i for i in ids(cat['programs']) if i in S)
Q = [
 dict(id='arch_program_catalogue', name='Programs a site could hold (Architecture mode)', unit='per program',
      formula='for each program: typical and minimum size, size steps, storeys, NBC major occupancy and fire separation from F-2, room and supply temperature, yearly heat per m², zoning status per city, placement needs, adjacency rules with distances, options, who it serves',
      inputs=['zone'], coef=f"{len(cat['programs'])} programs (20 masses, 2 surfaces, 3 systems) in tool/arch_programs.json; every value from a checked source or null with '?'; dropped by J.B. 2 Nov 2026: hospital, housing, seniors' care, sludge drying, cold-water fish, winter market (meta.dropped_programs)",
      sources=CS, conf=70, status='in hand (checks 1–3)', stage='decide'),
 dict(id='arch_placement', name='Where each program is drawn (Architecture mode)', unit='massing',
      formula='hall at the set-up model\'s server footprint; a 2 m height grid over the buildable area records what stands on each cell (hall to its roof; yard plant, plant yard, loading and roof plant as no-go, widened by the largest hard distance a picked program needs); programs by priority (own street entrance, at grade, public, rest) are tried at every cell in six proportions; a spot must rest flat on the ground or on what is built; lowest base wins, then nearest the street; at-grade programs only at grade, not-at-grade (Vancouver I-3, FC-2) only above it, roof option only on the hall roof; a program that fits nowhere on one floor is drawn over more storeys and flagged; code limits block, never just warn (J.B., 2 Nov 2026): no block above the zone\'s height limit, none past the floor-space ratio, none over an Edmonton BE area cap (a program starts at the cap where its minimum allows); a program that cannot meet them is not drawn and the tool names the limit',
      inputs=['envelope', 'size_fit', 'generator_sets', 'cooling_units', 'arch_program_catalogue'],
      coef='a diagram, not a design: the layout is the tool\'s drawing, labelled "drawn, not a rule"; storey height 6.0 m (the Vancouver I-2/I-3 ground-floor minimum used for the hall; in Edmonton only a drawing height) where a program\'s own height has no source; clearance from NBC 6.3.2.9 (intake 3.0 m from a combustion vent, 7.6 m from a truck dock) where a picked program carries it; a separate refuge building kept one 2 m cell clear all round (drawn, not a rule; spacing ? until FM 1-42 / NBC 3.2.3 is applied); review: checks/agents/2026-11-02_arch_mode_review.md and _review2.md',
      sources=['van_zdb_i2', 'van_zdb_i3', 'edm_bl20001', 'arch_nbc6329'], conf=50, status='in hand (drawing rule)', stage='decide'),
 dict(id='arch_space_budget', name='Space budget (Architecture mode)', unit='m² of floor',
      formula='cap = min(lot area × most floor-space ratio the zone allows, buildable area inside setbacks × floors under the height limit); left = cap − hall floor − Σ program floor; growing one program takes floor from unlocked programs down to their sourced minimums',
      inputs=['envelope', 'floor_area', 'arch_program_catalogue'], coef='our arithmetic on the zoning and set-up model the rest of the tool uses',
      sources=['van_zdb_i2', 'van_zdb_i3', 'edm_bl20001'], conf=70, status='in hand', stage='decide'),
 dict(id='arch_heat_budget', name='Heat budget (Architecture mode)', unit='MWh/yr',
      formula='need = Σ program size × sourced yearly heat per m²; offered = heat the hall gives after the heat pump (heat_delivered); programs with no sourced demand are listed, not counted',
      inputs=['heat_captured', 'heat_delivered', 'arch_program_catalogue'], coef='no total score; heat used shown as a share of what is offered',
      sources=['dea', 'dfKatalog2022'], conf=60, status='in hand', stage='decide'),
 dict(id='arch_heat_lift', name='Whether a program can take the hall\'s heat directly', unit='direct / heat pump / too hot',
      formula='program supply temperature ≤ the hall\'s heat temperature (air-cooled 25–35 °C; liquid 50–60 °C, unverified): direct; ≤ 70 °C: heat pump; above 70 °C: hotter than the heat pumps in the register reach',
      inputs=['heat_temp', 'cop', 'arch_program_catalogue'], coef='heat view: a warm-to-cool scale of each program\'s sourced supply temperature over plan and section (a diagram, not a thermal simulation); flow view: routes from the hall, width = yearly heat',
      sources=['dea', 'nrelESIF2019', 'yuan2025'], conf=55, status='in hand', stage='decide'),
 dict(id='arch_secure_line', name='Secure line presets (Architecture mode)', unit='line',
      formula='suggested: the tightest line holding the hall, yard plant, plant yard and loading; or the lot line, the building wall, or the hall wall; checks: required parts inside, public programs outside, share of the lot the public can reach, street front given to public use',
      inputs=['security_layers', 'arch_placement'], coef='a design choice, not a rule (J.B., 1 Nov 2026); presets first, draw-your-own later (J.B., 2 Nov 2026)',
      sources=[s for s in ('arch_sec_gcpsg015AppC', 'gcpsg015', 'rcmpGCPSG009') if s in S], conf=60, status='in hand', stage='decide'),
 dict(id='arch_rules', name='Rules an arrangement passes or fails (Architecture mode)', unit='flags',
      formula='zoning status and Edmonton area caps per program; NBC Table 3.1.3.1 separation from F-2; one residential suite in an F-2 building (overnight shelter); hard distances to generators, chillers and loading (plan distance with the height between, our arithmetic); own street entrance; height limit; required parts inside the secure line',
      inputs=['arch_program_catalogue', 'arch_placement', 'arch_secure_line'], coef='broken rules drawn red; passing rules stay quiet; nothing is scored',
      sources=[s for s in ('arch_nbc3131', 'arch_nbc6329', 'arch_up_vanZDB10', 'arch_zon_EdmZones') if s in S], conf=70, status='in hand', stage='decide'),
 dict(id='arch_compare', name='Arrangements side by side (Architecture mode)', unit='table',
      formula='per saved arrangement: programs, secure line, floor used, heat used, street front to public use, share of the lot the public can reach (1 m sampling), rules flagged, controlled doors from street to servers (? not modelled yet); no total score',
      inputs=['arch_space_budget', 'arch_heat_budget', 'arch_rules', 'arch_secure_line'], coef='our arithmetic on the drawn massing',
      sources=[], conf=60, status='in hand', stage='decide'),
]
have = {q['id']: i for i, q in enumerate(d['quantities'])}
for q in Q:
    if q['id'] in have: d['quantities'][have[q['id']]] = q
    else: d['quantities'].append(q)
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('arch quantities', len(Q), 'catalogue sources', len(CS))
