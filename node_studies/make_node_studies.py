# Node studies page (14 Oct). Diagrams live in diagrams.py.
import os, sys
here = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, here)
from diagrams import *
DIAG = [('heat_out', d_heat_out, 'heat_captured'), ('sound', d_sound, 'noise_level'), ('water', d_water, 'wue'), ('heat_use', d_heat_use, 'homes_heated')]

def figure(fam, fn, sel):
    F, kind, cap = fn(sel)
    return f'''<figure class="dg"><div class="dghead"><svg width="20" height="20" viewBox="0 0 24 24">{icon(fam,0,0,1,fcol(fam),1.5)}</svg><b>{E(FAM[fam][0])}</b><span class="tag">{E(kind)}</span></div>
{F.svg(cap)}<figcaption class="draft">{E(cap)}</figcaption>{F.key(sel)}</figure>'''

# ---------- drawing type per family ----------
PLAN = [
 ('heat_out', '3D cutaway', 'servers → liquid → boundary → heat pump → pipe'),
 ('heat_use', '3D neighbourhood', 'search radius, pipe, receivers'),
 ('sink', '2D street section', 'sewer main and sea or river under and beside the site'),
 ('power', '2D one-line + stacked bar', 'grid → substation → IT load and overheads'),
 ('water', '2D flow diagram', 'sources, use, where it goes'),
 ('sound', '2D section + chart', 'plant → distance → window, level vs distance'),
 ('seen', '3D eye level', 'what a passer-by sees; light at a window; watched area'),
 ('carbon', '2D stacked bar over the lifecycle', 'grid, generators, refrigerant, embodied'),
 ('materials', '2D exploded inventory', 'what is in the building and where it goes'),
 ('space', '3D massing', 'parcel, floor area, what could be offered'),
 ('it', '3D cutaway', 'halls, racks, plant on the roof'),
 ('money', '2D price window', 'operator floor vs buyer ceiling; who pays'),
 ('rules', '2D process timeline', 'zoning, rezoning, consultation, permits'),
 ('people', '2D plan with rings', 'who is within reach, and how they are affected'),
 ('time', '2D lifecycle strip', 'construction, ramp-up, refreshes, closure'),
 ('ground', '2D ground section', 'strata, water table, wells'),
 ('account', 'Table', 'the trade-off table itself'),
]
plan_rows = ''.join(f'<tr><td><svg width="18" height="18" viewBox="0 0 24 24">{icon(f,0,0,1,fcol(f),1.5)}</svg> {E(FAM[f][0])}</td><td>{E(k)}</td><td>{E(w)}</td></tr>' for f, k, w in PLAN)

# ---------- guide tab mock: rationale for heat out ----------
RAT = {
 'heat_rejected': 'Almost all the electricity a data centre uses ends up as heat; this is the total that has to go somewhere.',
 'liquid_capture': 'Heat caught in liquid at the chip is warmer and easier to pass on than heat in air; the share sets how much is usable.',
 'heat_temp': 'The temperature decides who can use the heat directly, and how hard a heat pump has to work.',
 'heat_captured': 'The heat that crosses the data centre boundary into a reuse system: the quantity the international standard (ISO/IEC 30134-6) asks to be measured.',
 'erf': 'Captured heat as a share of the energy used: the standard\'s headline ratio, and how the built cases are compared.',
 'cop': 'How much heat a heat pump gives per unit of electricity at these temperatures.',
 'hp_electricity': 'Lifting the heat to network temperature costs electricity; counting it keeps the gain honest.',
 'heat_delivered': 'What reaches the network after the heat pump: the figure the neighbours can actually use.',
 'heat_in_water': 'Heat carried per volume of water, which sizes the pipes and the flow.',
 'free_cooling_hours': 'Hours when outside air alone can cool the data centre; they change how much heat is worth capturing.',
}
rat_list = ''.join(f'<li><b>{E(NODE[q]["name"])}</b> <em>{E(NODE[q].get("unit") or "")}</em><br><span class="draft">{E(t)}</span></li>' for q, t in RAT.items())
fam_list = ''.join(f'<li class="{"on" if f=="heat_out" else ""}"><svg width="16" height="16" viewBox="0 0 24 24">{icon(f,0,0,1,fcol(f),1.6)}</svg>{E(FAM[f][0])}</li>' for f in FAM)
F0, _, cap0 = d_heat_out('heat_captured')

SIDE = [
 ('Family and kind', 'Which family the item belongs to (its icon) and whether it is an input, a quantity or a condition.'),
 ('Name and unit', 'Each figure stays in its own unit; nothing is converted to a common score.'),
 ('Confidence ring', 'How far the tool can trust the figure: full is arithmetic, three-quarters a regulation or government data, half an operator\'s claim.'),
 ('Diagram', 'Where the figure sits in the mechanism it belongs to.'),
 ('Formula', 'How it is worked out, from which other figures.'),
 ('Sources and their roles', 'Which source gives which term, and how sure that placement is.'),
 ('Conditions it feeds', 'Which conditions are judged on it, and what would move them.'),
]
side_list = ''.join(f'<li><span class="n">{i+1}</span><b>{E(a)}</b><br><span class="draft">{E(b)}</span></li>' for i, (a, b) in enumerate(SIDE))

group_cells = ''.join(f'''<div class="grp"><div class="gh"><i style="background:{col}"></i>{E(name)}</div>{"".join(f'<div class="ic"><svg viewBox="0 0 24 24" width="24" height="24">{icon(f,0,0,1,col,1.4)}</svg><span>{E(FAM[f][0])}<em>{len(FAM[f][1])}</em></span></div>' for f in fams)}</div>''' for g, (name, col, fams) in GROUP.items())
sample = ['heat_captured', 'homes_heated', 'sewer_sink', 'pue', 'noise_level', 'zoning_status']
nodes_svg = ''.join(node(q, (i % 3) * 222, (i // 3) * 58, sel=(q == 'heat_captured')) for i, q in enumerate(sample))
figs = ''.join(figure(f, fn, s) for f, fn, s in DIAG)

page = f'''<title>Node Icon Studies</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap">
<style>
:root{{color-scheme:dark;--bg:#17181a;--panel:#1e2023;--line:#30343a;--line-2:#3c4148;--fg:#e9e6e1;--muted:#9d9a94;--faint:#6b6964;--accent:#CC746C;--accent-2:#e39a93}}
body{{background:var(--bg);color:var(--fg);font:300 14px/1.55 "Open Sans",system-ui,sans-serif;margin:0}}
.wrap{{max-width:1200px;margin:0 auto;padding-block:28px 64px;padding-inline:20px}}
h1{{font-size:20px;font-weight:600;margin:0}} h2{{font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:600;margin:44px 0 6px}}
p{{max-width:74ch;color:var(--muted)}} .draft{{color:var(--accent-2)}} .note{{font-size:12px;color:var(--faint)}}
.dec{{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;margin-top:12px}} .dec div{{border:1px solid var(--line);border-radius:6px;padding:10px 12px;font-size:13px}} .dec b{{display:block;font-weight:600;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:2px}}
.groups{{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:12px;margin-top:12px}}
.grp{{border:1px solid var(--line);border-radius:8px;padding:10px 12px}} .gh{{font-size:12px;letter-spacing:.1em;text-transform:uppercase;font-weight:600;color:var(--muted);display:flex;align-items:center;gap:8px;margin-bottom:6px}} .gh i{{width:22px;height:3px;border-radius:2px;display:inline-block}}
.ic{{display:flex;align-items:center;gap:10px;padding:4px 0;font-size:13px}} .ic em{{font-style:normal;color:var(--faint);margin-left:6px;font-size:11.5px}}
.dgs{{display:grid;grid-template-columns:repeat(auto-fill,minmax(520px,1fr));gap:18px;margin-top:14px}}
@media (max-width:600px){{.dgs{{grid-template-columns:1fr}}}}
.dg{{margin:0;background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:14px 16px;min-width:0}}
.dghead{{display:flex;align-items:center;gap:8px;margin-bottom:8px}} .dghead b{{font-weight:600}} .tag{{margin-left:auto;font-size:11px;border:1px solid var(--line-2);border-radius:999px;padding:1px 9px;color:var(--muted)}}
figcaption{{font-size:12.5px;margin-top:6px}}
.ckey{{list-style:none;padding:0;margin:10px 0 0;columns:2;column-gap:20px;font-size:12.5px}} .ckey li{{break-inside:avoid;margin:3px 0;color:var(--fg)}} .ckey em{{font-style:normal;color:var(--faint);font-size:11.5px}}
.n{{display:inline-grid;place-items:center;width:18px;height:18px;border-radius:50%;border:1px solid var(--line-2);font-size:10.5px;font-weight:600;margin-right:7px;vertical-align:1px}}
.ckey li.on{{color:var(--accent-2)}} .ckey li.on .n{{background:var(--accent);border-color:var(--accent);color:#17181a}}
table{{border-collapse:collapse;width:100%;font-size:13px;margin-top:10px}} td{{border-top:1px solid var(--line);padding:7px 10px 7px 0;vertical-align:top}} td:first-child{{white-space:nowrap}} td svg{{vertical-align:-4px;margin-right:6px}}
.tw{{overflow-x:auto}}
.guide{{display:grid;grid-template-columns:220px minmax(0,1fr) 300px;gap:0;border:1px solid var(--line);border-radius:10px;overflow:hidden;margin-top:14px;background:var(--panel)}}
@media (max-width:980px){{.guide{{grid-template-columns:1fr}}}}
.guide>div{{padding:14px 16px;min-width:0}} .guide .fl{{border-right:1px solid var(--line)}} .guide .rt{{border-left:1px solid var(--line)}}
.fl ul{{list-style:none;padding:0;margin:8px 0 0;font-size:13px}} .fl li{{display:flex;gap:8px;align-items:center;padding:4px 6px;border-radius:5px;color:var(--muted)}} .fl li.on{{background:#24272b;color:var(--fg)}}
.rt ul{{list-style:none;padding:0;margin:8px 0 0;font-size:13px}} .rt li{{margin:0 0 10px}} .rt b{{font-weight:400}} .rt em{{font-style:normal;color:var(--faint);font-size:11.5px}}
.k{{font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:600}}
.side{{list-style:none;padding:0;margin:10px 0 0;display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px 20px;font-size:13px}} .side b{{font-weight:400}}
ol.q{{color:var(--muted);max-width:76ch}} ol.q li{{margin:6px 0}}
</style>
<div class="wrap">
<h1>Node icons and diagrams — study 2</h1>
<p class="draft">After J.B.'s review: icons sit beside the ring, the outline takes the family's colour, heat splits in three, and a Guide tab explains every node and the side panel. The diagrams are redrawn in 2D or 3D, whichever shows the mechanism more clearly.</p>
<p class="note">Draft wording (Claude) — for J.B. to rewrite. All drawings are diagrams of how things work, not measured; numbers appear only in the worked example.</p>

<div class="dec"><div><b>Decided</b>Icons beside the ring (C).</div><div><b>Decided</b>Outline coloured by family group.</div><div><b>Decided</b>A Guide tab: diagrams, rationale per node, how to read the side panel.</div><div><b>Proposed</b>Heat in three: heat out · what the heat becomes · cooling the place offers.</div></div>

<h2>1 · Seventeen families in six colour groups</h2>
<p>Seventeen outline colours would be impossible to tell apart, so the families share six colours by group; the icon tells families within a group apart. The red accent stays reserved for what is selected and for the user's own values. The grey-green tick on the left edge still marks what the place offers.</p>
<div class="groups">{group_cells}</div>

<h2>2 · Nodes as they would look</h2>
<p>Icon at the left, confidence ring at the right, outline in the group colour; the selected node turns red.</p>
<div class="tw"><svg viewBox="-2 -2 670 120" style="width:100%;max-width:670px;min-width:560px;font-family:Open Sans,system-ui,sans-serif">{nodes_svg}</svg></div>

<h2>3 · Mechanism diagrams, redrawn</h2>
<p>Drafting conventions throughout: three line weights (structure, flows, notes), numbered tags instead of labels on the drawing; a box gets its number as a badge with no leader; every other leader runs only orthogonal or at 45°, and tags line up in columns or rows in empty space; tags are numbered in reading order; a key under each figure with the node names, and the selected node in red. Two are 3D, where space and adjacency are the point; two are 2D, where a section or a flow reads more clearly.</p>
<div class="dgs">{figs}</div>

<h2>4 · Drawing type for each family</h2>
<div class="tw"><table><tr><td class="k">Family</td><td class="k">Drawing</td><td class="k">What it shows</td></tr>{plan_rows}</table></div>

<h2>5 · The Guide tab (mock)</h2>
<p>A third tab beside Tool logic and User workflow. Pick a family on the left; its diagram fills the middle; the right column says why each node is in the tool. A second page explains the side panel.</p>
<div class="guide"><div class="fl"><div class="k">Families</div><ul>{fam_list}</ul></div>
<div><div class="k">Heat out of the data centre</div>{F0.svg(cap0)}{F0.key('heat_captured')}</div>
<div class="rt"><div class="k">Why each node is here</div><ul>{rat_list}</ul></div></div>

<h3 style="font-weight:600;font-size:15px;margin:22px 0 0">Reading the side panel</h3>
<ul class="side">{side_list}</ul>

<h2>Questions for J.B.</h2>
<ol class="q">
<li>Heat in three (out · what it becomes · cooling the place offers) — right split?</li>
<li>Do the six colour groups make sense, and do the colours read as calm enough next to the red accent?</li>
<li>Diagram quality: is this the level to aim for? Which of the four is closest to what you want, and what would you push further?</li>
<li>The drawing type per family (section 4): anything you would switch between 2D and 3D?</li>
<li>Guide tab: rationale written by you (my drafts in red to start from), as with the other user-facing text?</li>
</ol>
</div>'''
open(os.path.join(here, 'node_studies.html'), 'w', encoding='utf-8').write(page)
print('written')
