"""4 Nov 2026 (night build, part 1; checks/agents/NIGHT_BRIEF_2026-11-04.md): four templates only (J.B., 3 Nov 2026):
Resident, Municipal, Engineering ('full'), Architecture ('arch'). Community dropped.

The node tier tags live in register/make_templates.py (T). The middle tag 'community' is renamed 'arch': a node so tagged is shown in
Architecture and Engineering, not to residents. These are exactly the nodes Architecture (rank 1) and Engineering (rank 2) showed
before, so no template's view changes except that Community is gone. No node moves to Resident (nothing was shown by Community alone;
every community node was also in Engineering and Architecture). Municipal is not built (no tier id yet).
This patch records the decision in the register; it changes no quantity, coefficient or source."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']
m['templates'] = {
    'date': '4 Nov 2026',
    'decided': 'J.B., 3 Nov 2026 (checks/architecture_mode_notes_2026-10-30.md, Templates)',
    'templates': ['resident', 'municipal (not built)', 'full (Engineering)', 'arch (Architecture)'],
    'dropped': ['community'],
    'tier_tags': {'resident': 'every template', 'arch': 'Architecture and Engineering (was community)',
                  'full': 'Engineering only', 'arch_only': 'Architecture only'},
    'where': 'register/make_templates.py (T); tool/tiers.js, flow.js, logic.js, report.js, report3.js; register/diagram_template.html',
}
m['fix_pass_log']['4 Nov 2026'] = 'Community template dropped (four_templates_2026_11_04.py); report checks/agents/2026-11-04_night.md'
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok templates')
