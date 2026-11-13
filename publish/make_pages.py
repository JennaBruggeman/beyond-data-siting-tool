# The public version's own pages (J.B. 13 Nov 2026): Sources and licences (sources.html) and the seven Edmonton test fits as images (edm-test-fits.html).
# Writes publish/pages/; publish/build_public.py copies them into public/. The test-fit figures come from the private frozen-board file (MW, data centre,
# stopping rule and address only: no geometry). Run before the build: python publish/make_pages.py
import os, json, html
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); PUB = os.path.join(ROOT, 'publish'); OUTD = os.path.join(PUB, 'pages'); os.makedirs(OUTD, exist_ok=True)
E = html.escape
HEAD = lambda title: f'''<!doctype html><html lang="en-CA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{E(title)}</title><style>
@font-face{{font-family:'IBM Plex Sans';src:url(fonts/IBMPlexSans-Regular-Latin1.woff2) format('woff2');font-weight:400}}
:root{{--ink:#222;--mute:#666;--line:#ddd;--red:#CC746C;--bg:#fff}}
body{{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 'IBM Plex Sans',system-ui,sans-serif}}
main{{max-width:900px;margin:0 auto;padding:24px 16px 64px}} h1{{font-weight:400;font-size:28px;margin:8px 0 4px}} h2{{font-weight:500;font-size:18px;margin:28px 0 8px}}
p,li{{max-width:72ch}} .mute{{color:var(--mute)}} .k{{color:var(--red)}} a{{color:inherit}} nav a{{margin-right:16px}}
table{{border-collapse:collapse;width:100%;font-size:14px}} th,td{{text-align:left;vertical-align:top;padding:6px 8px;border-bottom:1px solid var(--line)}} th{{font-weight:500}}
figure{{margin:16px 0 32px}} figure img{{max-width:100%;height:auto;border:1px solid var(--line)}} figcaption{{color:var(--mute);font-size:13px}}
.fig{{display:flex;gap:24px;flex-wrap:wrap;margin:6px 0}} .fig div{{min-width:120px}} .fig b{{display:block;font-size:22px;font-weight:400}}
</style></head><body><main><nav class="mute"><a href="index.html">The tool</a><a href="sources.html">Sources and licences</a><a href="edm-test-fits.html">Edmonton test fits</a></nav>'''
FOOT = '</main></body></html>'

# ---------- Sources and licences ----------
OGL = {'van': 'Contains information licensed under the Open Government Licence – Vancouver.',
       'edm': 'City of Edmonton. Contains information licensed under the Open Government Licence – City of Edmonton.',
       'can': 'Contains information licensed under the Open Government Licence – Canada.',
       'ab': 'Contains information licensed under the Open Government Licence – Alberta.',
       'bc': 'Contains information licensed under the Open Government Licence – British Columbia.',
       'statcan': 'Source: Statistics Canada. Reproduced and distributed on an “as is” basis with the permission of Statistics Canada (Statistics Canada Open Licence).'}
ROWS = [
 ('City of Vancouver Open Data', 'van', ['Property parcel polygons', 'Property tax report 2026 (zoning, values)', 'Building footprints 2009', 'LiDAR 2022 (buildings and ground, processed into tiles)',
   'Public streets and lanes', 'Designated floodplain', 'Public trees', 'Non-market housing', 'Libraries and community centres', 'Operating permits – water systems',
   'Energy benchmarking (buildings that disclosed their reports)']),
 ('City of Edmonton Open Data', 'edm', ['Property Information (Current Calendar Year), dkk9-cj3x', 'Property Assessment Data (Current Calendar Year), q7d6-ambg',
   'Land Parcels_Assessment Parcels (Point), dm3i-bp8w (lot area at each parcel point)', 'Zoning Bylaw geographical data', 'Road Network', 'Rooflines and 3D buildings',
   'Trees, eecg-fc54', 'Public Libraries, jn25-zspi', 'Recreation Facilities, nz3t-vyg3', 'Community League Halls, kaps-rk7z']),
 ('Statistics Canada', 'statcan', ['Census of Population 2021 (98-401-X2021006) and dissemination area boundaries (92-160-X)', 'Open Database of Educational Facilities v2.1',
   'Open Database of Healthcare Facilities', 'Open Database of Sport and Recreation Facilities v2']),
 ('Natural Resources Canada', 'can', ['CanVec 50K: hydro (shorelines) and transformer stations', 'Photovoltaic potential and solar resource maps of Canada', 'Electric Charging and Alternative Fuelling Stations Locator']),
 ('Environment and Climate Change Canada', 'can', ['Canadian Weather Year for Energy Calculation (CWEC), Vancouver and Edmonton: sun statistics derived from it']),
 ('Government of Alberta', 'ab', ['Alberta Flood Mapping, flood hazard layer', 'Continuing Care Accommodation Standards compliance reporting (care homes)']),
 ('Government of British Columbia', 'bc', ['Residential Care Facilities', 'Locations of Post-Secondary Institutions']),
]
s = HEAD('Sources and licences') + '<h1>Sources and licences</h1><p class="mute">The public web version of Beyond Data uses open data only. Each source keeps its licence; the attribution each licence asks for is given with it.</p>'
s += '<h2>Open data</h2><table><thead><tr><th>Publisher</th><th>Data</th><th>Licence and attribution</th></tr></thead><tbody>'
for pub, lic, data in ROWS: s += f'<tr><td>{E(pub)}</td><td>{"<br>".join(E(d) for d in data)}</td><td>{E(OGL[lic])}</td></tr>'
s += '</tbody></table>'
s += '''<h2>What the public version leaves out</h2><ul>
<li><b>Edmonton lot outlines.</b> The City of Edmonton does not publish them as open data: “As of November 1st, 2021, the City will no longer provide datasets with land parcel boundary polygon geometry” (City of Edmonton Open Data, Vacant Land – Industrial, <a href="https://data.edmonton.ca/d/stt5-pzaa">stt5-pzaa</a>). The full version uses licensed title mapping for academic work. Here, Edmonton lots are the City’s parcel points; cards that need a lot outline say so, and the seven Edmonton test fits are shown as images.</li>
<li><b>A licensed assessment list.</b> The full version also counts commercial and apartment buildings from a licensed property assessment list as heat receivers; none of those records is published here.</li>
<li><b>Code and standard texts</b> that are licensed are not reproduced; the tool cites them by clause.</li></ul>
<h2>Figures from other sources</h2><p>Operator and industry figures (data-centre sizes, equipment) are labelled as claims where they appear. District-energy service areas are traced from City and utility maps and labelled as approximate.</p>
<h2>Fonts and libraries</h2><p>IBM Plex Sans (SIL Open Font Licence 1.1). three.js (MIT licence).</p>'''
open(os.path.join(OUTD, 'sources.html'), 'w', encoding='utf-8', newline='').write(s + FOOT)

# ---------- Edmonton test fits (images) ----------
F = json.load(open(os.path.join(ROOT, 'tool', 'data', 'hub_frozen_edm.json'), encoding='utf-8'))['boards']
boards = {}
for b in F.values(): boards.setdefault(b['key'], b)
imgs = json.load(open(os.path.join(PUB, 'edm_fits', 'index.json'), encoding='utf-8'))
date = lambda f: '13 Nov 2026' if str(f).endswith('11i') else '12 Nov 2026'
s = HEAD('Edmonton test fits') + '<h1>Edmonton test fits</h1><p class="mute">Seven Emergency hub test fits on Edmonton lots, checked by hand against the codes and bylaws they cite. Shown as images: the lot outlines they are drawn on are licensed data and are not published. Room numbers are as on each board.</p>'
for key in ['E4103', 'E06B', 'E14715', 'E10003', 'E15231', 'E16075', 'E10004']:
    b = boards.get(key)
    if not b: continue
    s += f'<h2>{E(b["addr"])}</h2><div class="fig"><div><b>{b["MW"]:.2f} MW</b>IT load, one hall storey</div><div><b>{round(b["dcArea"]):,} m²</b>of data centre</div><div><b>{E(b["stop"])}</b>what stopped it growing</div></div><p class="mute">Checked test fit, {date(b.get("freeze"))}.</p>'
    for k, lab, f in imgs:
        if k == key: s += f'<figure><img src="edm_fits/{E(f)}" alt="{E(b["addr"])}: {E(lab)}" loading="lazy"><figcaption>{E(lab)}</figcaption></figure>'
open(os.path.join(OUTD, 'edm-test-fits.html'), 'w', encoding='utf-8', newline='').write(s + FOOT)
print('pages written:', os.listdir(OUTD))
