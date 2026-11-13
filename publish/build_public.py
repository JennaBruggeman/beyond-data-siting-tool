# The public web version of the tool (J.B. 13 Nov 2026): assembles public/ from tool/ with open data only, then checks it.
#   Kept: the tool's code and pages; City of Vancouver and City of Edmonton open data (parcels or parcel points, zoning, streets, buildings and LiDAR,
#   trees, receivers from public lists), Statistics Canada census, NRCan, Government of Alberta flood maps, the frozen hub test fits for Vancouver lots.
#   Left out: Altalis lot outlines and everything derived from them (Edmonton l_ tiles, Edmonton hub boards and growth data, Edmonton lot types and
#   variant needs), BC Assessment (vanBCA receivers: all 683 points), licensed code texts, Claude Link notes (the typology spec copies), checks/, scripts.
#   Edmonton test fits: PNG images only (publish/edm_fits/*.png, rendered by publish/render_edm_fits.js), no geometry.
#   Text: comments stripped from JS, CSS and HTML; names and internal labels in the remaining text rewritten (TEXT_RULES); the check then fails the
#   build on anything that should not be there (CHECKS). Writes public/MANIFEST.md (every file, source, licence, size) for J.B.'s approval.
# Usage: python publish/build_public.py            (from the repository root; needs tool/tiles/ on this computer)
import os, sys, re, json, shutil, glob, hashlib, subprocess
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); TOOL = os.path.join(ROOT, 'tool'); OUT = os.path.join(ROOT, 'public'); PUB = os.path.join(ROOT, 'publish')

# ---------- 1. what goes in ----------
SKIP_DIRS = {'__pycache__', 'bca', 'lots', 'specs'}                    # scripts on J.B.'s computer; Claude Link spec copies (tool/f1/specs)
SKIP_FILES = {'data/hub_frozen_edm.json', 'data/hub_grow_edm.json'}   # Altalis frame
SKIP_EXT = {'.py', '.pdf', '.md', '.bak', '.orig'}
def wanted(rel):
    parts = rel.split('/')
    if any(p in SKIP_DIRS for p in parts[:-1]): return False
    if rel in SKIP_FILES or os.path.splitext(rel)[1].lower() in SKIP_EXT: return False
    if re.match(r'tiles/edm/l_.*\.json$', rel): return False            # Altalis lot outlines
    if re.match(r'fonts/(OpenSans|Barlow)', rel): return False             # fonts the tool no longer uses (fonts/LICENCE.txt)
    return True

# ---------- 2. text: comments out, names and internal labels rewritten ----------
def strip_js(src):
    """remove // and /* */ comments; strings, template literals (with ${} nesting) and regex literals are kept as they are"""
    out, i, n = [], 0, len(src); stack = []   # stack: template-literal depth for ${ }
    prev = ''   # last significant character outside comments (decides regex vs division)
    while i < n:
        c = src[i]; c2 = src[i:i + 2]
        if stack and c == '}' and stack[-1] == 0:   # end of ${ } in a template literal: back into the literal
            stack.pop(); out.append(c); i += 1; i = _tmpl(src, i, out, stack); prev = '`'; continue
        if stack and c == '{': stack[-1] += 1
        elif stack and c == '}': stack[-1] -= 1
        if c2 == '//': j = src.find('\n', i); i = n if j < 0 else j; continue
        if c2 == '/*': j = src.find('*/', i + 2); i = n if j < 0 else j + 2; out.append(' '); continue
        if c in '"\'':
            j = i + 1
            while j < n and src[j] != c:
                if src[j] == '\\': j += 1
                j += 1
            out.append(src[i:j + 1]); i = j + 1; prev = c; continue
        if c == '`': out.append(c); i = _tmpl(src, i + 1, out, stack); prev = '`'; continue
        if c == '/' and (prev == '' or prev in '(,=:[!&|?{};+-*%<>~^' or re.search(r'\b(return|typeof|case|do|else|in|of|void|delete|throw|new)\s*$', ''.join(out[-12:]))):
            j = i + 1; cls = False
            while j < n:
                if src[j] == '\\': j += 2; continue
                if src[j] == '[': cls = True
                elif src[j] == ']': cls = False
                elif src[j] == '/' and not cls: break
                elif src[j] == '\n': break
                j += 1
            j += 1
            while j < n and src[j].isalpha(): j += 1
            out.append(src[i:j]); i = j; prev = '/'; continue
        out.append(c)
        if not c.isspace(): prev = c
        i += 1
    return ''.join(out)
def _tmpl(src, i, out, stack):
    n = len(src)
    while i < n:
        c = src[i]
        if c == '\\': out.append(src[i:i + 2]); i += 2; continue
        if c == '`': out.append(c); return i + 1
        if src[i:i + 2] == '${': out.append('${'); stack.append(0); return i + 2
        out.append(c); i += 1
    return i
def strip_css(s): return re.sub(r'/\*[\s\S]*?\*/', ' ', s)
def strip_html(s):
    s = re.sub(r'<!--[\s\S]*?-->', '', s)
    s = re.sub(r'(<script\b[^>]*>)([\s\S]*?)(</script>)', lambda m: m.group(1) + strip_js(m.group(2)) + m.group(3), s)
    s = re.sub(r'(<style\b[^>]*>)([\s\S]*?)(</style>)', lambda m: m.group(1) + strip_css(m.group(2)) + m.group(3), s)
    return s
TEXT_RULES = [   # in the text left after comments are stripped (what a reader can see, and data notes)
    (r'\(J\.B\.,\s*', '(project decision, '), (r'\(J\.B\.\s+(?=\d)', '(project decision, '), (r'J\.B\.[’\']s\b', 'the project’s'), (r'\bJ\.B\.\s+(?=\d{1,2} (?:Oct|Nov|Dec))', 'project decision, '),
    (r'\bJ\.B\.', 'the project'), (r'\bmain chat[’\']s\b', 'the project’s'), (r'\b[Mm]ain chat\b', 'the project'), (r'\bCowork[’\']s\b', 'the test-fit study’s'), (r'\bCowork\b', 'the test-fit study'),
    (r'Claude Link/?[\w./-]*', 'project files'), (r'\bClaude\b', 'the assistant'),
]
JS_RULES = [(r'\bvanBCA\b', 'bcaList')]   # scripts only: the source key in code (no vanBCA point is published; data files keep the name so the check sees any)
def rewrite_js(s):
    s = rewrite(s)
    for a, b in JS_RULES: s = re.sub(a, b, s)
    return s
def rewrite(s):
    for a, b in TEXT_RULES: s = re.sub(a, b, s)
    return s

# ---------- 3. data filters ----------
DROP_SRC = {'vanBCA', 'abPSI'}   # BC Assessment (licensed); Alberta campuses from a PDF list with no stated open licence (left out: doubtful)
def drop_vanbca(d):
    """receivers: no BC Assessment points, no abPSI points, and no district-energy outlines ("nets": traced from City maps, a budget PDF and a
    utility's web page, none under an open licence: left out as doubtful, J.B. 13 Nov rule)"""
    if isinstance(d, list): return [p for p in d if not (isinstance(p, dict) and p.get('src') in DROP_SRC)]
    if isinstance(d, dict) and 'pts' in d: return dict(d, pts=[p for p in d['pts'] if p.get('src') not in DROP_SRC], nets=[])
    return d
DATA_FILTERS = {
    'tiles/van/receivers.json': drop_vanbca, 'receivers_van.json': drop_vanbca, 'tiles/edm/receivers.json': drop_vanbca, 'receivers_edm.json': drop_vanbca,
    'data/lot_types.json': lambda d: {k: v for k, v in d.items() if k != 'edm'},        # Edmonton lot types: measured on Altalis outlines
    'data/variant_need.json': lambda d: {k: v for k, v in d.items() if k != 'edm'},     # built from those lot types
}
PUBLIC_FLAG = '<script>window.BD_PUBLIC=true;</script>'
PUBLIC_BAR = ('<div id="pubbar" style="position:fixed;left:0;bottom:0;z-index:5;font:12px/1.4 sans-serif;background:#fff;border-top:1px solid #ddd;'
              'border-right:1px solid #ddd;padding:4px 10px;color:#666">Public version: open data only · <a href="sources.html" style="color:inherit">Sources and licences</a>'
              ' · <a href="edm-test-fits.html" style="color:inherit">Edmonton test fits</a></div>')

def build():
    os.makedirs(OUT, exist_ok=True)   # emptied, not removed (a local test server may hold the folder open)
    for x in os.listdir(OUT):
        q = os.path.join(OUT, x); shutil.rmtree(q) if os.path.isdir(q) else os.remove(q)
    files = []
    for dp, dn, fn in os.walk(TOOL):
        for f in fn:
            full = os.path.join(dp, f); rel = os.path.relpath(full, TOOL).replace('\\', '/')
            if not wanted(rel): continue
            dst = os.path.join(OUT, rel); os.makedirs(os.path.dirname(dst), exist_ok=True); ext = os.path.splitext(f)[1].lower()
            if rel in DATA_FILTERS:
                d = json.load(open(full, encoding='utf-8')); d = DATA_FILTERS[rel](d)
                open(dst, 'w', encoding='utf-8', newline='').write(rewrite(json.dumps(d, ensure_ascii=False, separators=(',', ':'))))
            elif ext == '.js': open(dst, 'w', encoding='utf-8', newline='').write(rewrite_js(strip_js(open(full, encoding='utf-8').read())))
            elif ext == '.css': open(dst, 'w', encoding='utf-8', newline='').write(rewrite(strip_css(open(full, encoding='utf-8').read())))
            elif ext in ('.html', '.htm'):
                s = rewrite(strip_html(open(full, encoding='utf-8').read()))
                if rel == 'index.html': s = PUBLIC_FLAG + '\n' + s + '\n' + PUBLIC_BAR + '\n'   # the page has no <head> or <body> tags: first and last
                open(dst, 'w', encoding='utf-8', newline='').write(s)
            elif ext in ('.json', '.tsv', '.txt', '.svg'): open(dst, 'w', encoding='utf-8', newline='').write(rewrite(open(full, encoding='utf-8').read()))
            else: shutil.copy2(full, dst)
            files.append(rel)
    # the public pages: Sources and licences, Edmonton test fits (images), the publish notes
    for f in glob.glob(os.path.join(PUB, 'pages', '*')): shutil.copy2(f, os.path.join(OUT, os.path.basename(f))); files.append(os.path.basename(f))
    os.makedirs(os.path.join(OUT, 'edm_fits'), exist_ok=True)
    for f in sorted(glob.glob(os.path.join(PUB, 'edm_fits', '*.png'))): shutil.copy2(f, os.path.join(OUT, 'edm_fits', os.path.basename(f))); files.append('edm_fits/' + os.path.basename(f))
    open(os.path.join(OUT, '.nojekyll'), 'w').close()
    return files

# ---------- 4. the check: the build fails on anything that should not be public ----------
def check():
    bad = []; texts = {}
    for dp, dn, fn in os.walk(OUT):
        for f in fn:
            full = os.path.join(dp, f); rel = os.path.relpath(full, OUT).replace('\\', '/')
            if rel.lower().endswith('.pdf'): bad.append(f'PDF: {rel}')
            if rel.startswith(('checks/', 'sources/')) or '/checks/' in rel or 'library/private' in rel: bad.append(f'from checks/ or sources/: {rel}')
            if re.match(r'tiles/edm/l_', rel) or re.search(r'hub_(frozen|grow)_edm', rel): bad.append(f'Altalis-derived file: {rel}')
            if rel.startswith('edm_fits/') and not rel.endswith('.png'): bad.append(f'Edmonton test fit not a PNG: {rel}')
            if rel == 'index.html' and 'window.BD_PUBLIC=true' not in open(full, encoding='utf-8').read(): bad.append('index.html: the public flag is missing (Edmonton cards would not switch to the public text)')
            if os.path.splitext(f)[1].lower() in ('.js', '.json', '.html', '.css', '.tsv', '.txt', '.md', '.svg'): texts[rel] = open(full, encoding='utf-8', errors='replace').read()
    words = [('Claude Link', r'Claude Link'), ('J.B.', r'J\.B\.'), ('Cowork', r'\bCowork\b'), ('main chat', r'\bmain chat\b'), ('vanBCA', r'vanBCA')]
    # BC Assessment addresses: the "n" of every vanBCA point in the private file
    bca = set(); src = os.path.join(TOOL, 'tiles', 'van', 'receivers.json')
    if os.path.exists(src): bca = {p['n'] for p in json.load(open(src, encoding='utf-8'))['pts'] if p.get('src') == 'vanBCA' and p.get('n')}
    # Edmonton lot geometry: fingerprints of every Altalis ring (its first six encoded numbers, as the tiles write them) and of every Edmonton board
    # outline (its corner pairs to 0.1 m); any of them in a public file fails
    fps = set()
    for f in glob.glob(os.path.join(TOOL, 'tiles', 'edm', 'l_*.json')):
        for a, ids in json.load(open(f, encoding='utf-8'))['L']:
            if len(a) >= 6: fps.add(','.join(str(v) for v in a[:6]))
    pairs = {}   # board key -> its outline corners, in order
    for f in ('data/hub_frozen_edm.json', 'data/hub_grow_edm.json'):
        p = os.path.join(TOOL, f)
        if not os.path.exists(p): continue
        def walk(o, key):
            if isinstance(o, dict):
                key = o.get('key', key)
                for k, v in o.items():
                    if k == 'LOTPOLY' and key and key not in pairs: pairs[key] = [(round(q[0], 1), round(q[1], 1)) for q in v if isinstance(q, list) and len(q) == 2]
                    else: walk(v, k if re.match(r'E\d', k) else key)
            elif isinstance(o, list): [walk(v, key) for v in o]
        walk(json.load(open(p, encoding='utf-8')), None)
    # BC Assessment addresses that a public record also carries (another receiver source, the data-centre inventory): allowed, listed in MANIFEST.md
    pubaddr = set()
    if os.path.exists(src): pubaddr |= {p['n'] for p in json.load(open(src, encoding='utf-8'))['pts'] if p.get('src') != 'vanBCA' and p.get('n')}
    fac = os.path.join(TOOL, 'data', 'facilities.json')
    if os.path.exists(fac): pubaddr |= {a for a in bca if a in open(fac, encoding='utf-8').read()}   # the inventory's addresses are the operators' own (public)
    shared = sorted(a for a in bca if a in pubaddr); bca = {a for a in bca if a not in pubaddr}
    bca_rx = re.compile(r'(?<![\w-])(?:' + '|'.join(re.escape(a) for a in sorted(bca, key=len, reverse=True) if len(a) > 6) + r')(?![\w])') if bca else None   # whole addresses only ("200 Burrard St" is not "1200 Burrard St")
    near = []   # one- or two-corner board matches: (file, line, board, corners, text around it)
    trivial = [0]   # single corners like (0, 0) or (6, 0): counted, not listed
    distinctive = lambda x, y: x != 0 and y != 0 and (x != int(x) or y != int(y))
    NUM = re.compile(r'-?\d+(?:\.\d+)?')
    for rel, t in texts.items():
        for lab, rx in words:
            m = re.search(rx, t)
            if m: bad.append(f'"{lab}" in {rel}: …{t[max(0, m.start() - 60):m.end() + 40]}…')
        if rel.endswith('.json') and re.search(r'bcaList', t): bad.append(f'a BC Assessment point (renamed source) in {rel}')
        if bca_rx:
            m = bca_rx.search(t)
            if m: bad.append(f'BC Assessment address "{m.group(0)}" in {rel}')
        ms = list(NUM.finditer(t)); nums = [m.group(0) for m in ms]
        win = {','.join(nums[i:i + 6]) for i in range(len(nums) - 5)}   # every run of six numbers in the file
        hit = next(iter(win & fps), None)
        if hit: bad.append(f'Edmonton lot outline (Altalis ring {hit}) in {rel}')
        # Edmonton board outlines: corners as x, y next to each other in the file's numbers. Three or more consecutive corners of one board fail;
        # one or two are listed in MANIFEST.md (J.B. 13 Nov) to be looked at before approval
        # tile files store outlines as rings: the first point, then differences, in half-metre units (make_tiles.py ring_enc). Those rings are decoded
        # to positions in metres before the comparison (a board outline put into a tile would sit there as positions, not as differences);
        # the Altalis fingerprint test above reads the rings as stored. Other files are read as their numbers stand.
        src_at = None
        if rel.startswith('tiles/') and rel.endswith('.json'):
            try: J = json.loads(t)
            except Exception: J = None
            if J is not None:
                vals = []; src_at = []
                def rings(o):
                    if isinstance(o, list) and len(o) >= 6 and len(o) % 2 == 0 and all(isinstance(v, int) for v in o):
                        x = y = 0
                        for k in range(0, len(o), 2):
                            x, y = (o[0], o[1]) if k == 0 else (x + o[k], y + o[k + 1]); vals.extend([round(x / 2, 1), round(y / 2, 1)]); src_at.append(None); src_at.append(None)
                        vals.extend([float('nan'), float('nan')]); src_at.extend([None, None])
                    elif isinstance(o, list): [rings(v) for v in o]
                    elif isinstance(o, dict): [rings(v) for v in o.values()]
                rings(J)
        if src_at is None: vals = [round(float(x), 1) for x in nums]
        pos = {}
        for i in range(0, len(vals) - 1): pos.setdefault((vals[i], vals[i + 1]), []).append(i)
        for key, cs in pairs.items():
            best, at = 0, None
            for j, c in enumerate(cs):
                for i in pos.get(c, []):
                    run = 1
                    while run < len(cs) and i + 2 * run + 1 < len(vals) and (vals[i + 2 * run], vals[i + 2 * run + 1]) == cs[(j + run) % len(cs)]: run += 1
                    if run > best: best, at = run, i
            if best >= 3: bad.append(f'Edmonton board outline ({key}: {best} consecutive corners) in {rel}')
            elif best == 1 and not distinctive(vals[at], vals[at + 1]): trivial[0] += 1
            elif best and src_at is not None: near.append((rel, 1, key, best, f'decoded tile outline, position {vals[at]}, {vals[at + 1]} m'))
            elif best: near.append((rel, t.count('\n', 0, ms[at].start()) + 1, key, best, t[max(0, ms[at].start() - 30):ms[at].start() + 30].replace('\n', ' ')))
    return bad, len(fps), sum(len(v) for v in pairs.values()), len(bca), near, shared, trivial[0]

# ---------- 5. every published file with its source and licence (a file this table can't name is left out and listed) ----------
L_VAN = 'Open Government Licence – Vancouver'; L_EDM = 'Open Government Licence – City of Edmonton'; L_CAN = 'Open Government Licence – Canada'
L_AB = 'Open Government Licence – Alberta'; L_SC = 'Statistics Canada Open Licence'; L_OWN = 'the project’s own work (Jenna Bruggeman, UBC M.Arch); no open licence chosen yet'
L_OFL = 'SIL Open Font Licence 1.1'
CLASS = [
 (r'^(index\.html|[^/]+\.(js|css))$', 'Beyond Data tool code and page (comments stripped, names rewritten)', L_OWN),
 (r'^(sources\.html|edm-test-fits\.html|MANIFEST\.md|\.nojekyll)$', 'The public version’s own pages (publish/make_pages.py) and this list', L_OWN),
 (r'^edm_fits/.+\.png$', 'Edmonton hub test fits, freeze 11i: plan drawings as PNG images only (lot lines visible; the licensed outline data is not published, the author’s standing rule)', L_OWN),
 (r'^fonts/(IBMPlexSans.+|LICENCE\.txt)$', 'IBM Plex Sans (IBM Corp.), unmodified files and licence text', L_OFL),
 (r'^f1/(img|icons|kit)/', 'Images and icons made for the tool', L_OWN),
 (r'^f1/eh_fits/v\d+\.json$', 'Vancouver hub test-fit drawings (the project’s own) on City of Vancouver lot geometry', L_OWN + '; lot geometry ' + L_VAN),
 (r'^f1/intro\.json$', 'Tool text', L_OWN),
 (r'^tiles/van/t_[-\d_]+\.json$', 'City of Vancouver Open Data: property parcels, property tax report 2026, building footprints 2009, LiDAR 2022 heights', L_VAN),
 (r'^tiles/van/lid_[-\d_]+\.json$', 'City of Vancouver Open Data: LiDAR 2022, buildings new or changed since 2009', L_VAN),
 (r'^tiles/van/g_[-\d_]+\.json$', 'City of Vancouver Open Data: LiDAR 2022 ground points, per-lot grades', L_VAN),
 (r'^tiles/van/(r_[-\d_]+|trees)\.json$', 'City of Vancouver Open Data: Public trees', L_VAN),
 (r'^tiles/van/s_\w+\.tsv$', 'City of Vancouver Open Data: property tax report 2026 (address search)', L_VAN),
 (r'^tiles/van/meta\.json$', 'City of Vancouver Open Data: zoning overview and designated floodplain; tile index', L_VAN),
 (r'^tiles/edm/t_[-\d_]+\.json$', 'City of Edmonton Open Data: Property Information (dkk9-cj3x), Property Assessment Data (q7d6-ambg), Land Parcels_Assessment Parcels (Point) (dm3i-bp8w), rooflines and 3D buildings', L_EDM),
 (r'^tiles/edm/(r_[-\d_]+|trees)\.json$', 'City of Edmonton Open Data: Trees (eecg-fc54)', L_EDM),
 (r'^tiles/edm/s_\w+\.tsv$', 'City of Edmonton Open Data: Property Information (address search)', L_EDM),
 (r'^tiles/edm/meta\.json$', 'City of Edmonton Open Data: Zoning Bylaw geographical data (overview); tile index', L_EDM),
 (r'^(tiles/van/receivers|receivers_van)\.json$', 'Heat receivers: Statistics Canada ODEF, ODHF, ODSRF; City of Vancouver non-market housing and energy benchmarking; BC residential care and post-secondary lists (no BC Assessment points; no district-energy outlines)', f'{L_SC}; {L_VAN}; Open Government Licence – British Columbia'),
 (r'^(tiles/edm/receivers|receivers_edm)\.json$', 'Heat receivers: Statistics Canada ODEF, ODHF, ODSRF; City of Edmonton property assessment; Alberta continuing care reporting (no district-energy outlines, no campus list)', f'{L_SC}; {L_EDM}; {L_AB}'),
 (r'^census_(van|edm)\.json$', 'Statistics Canada, Census of Population 2021 and dissemination area boundaries', L_SC),
 (r'^streets_van\.json$', 'City of Vancouver Open Data: Public streets, Lanes', L_VAN),
 (r'^streets_edm\.json$', 'City of Edmonton Open Data: Road Network', L_EDM),
 (r'^(shore|substations)\.json$', 'Natural Resources Canada, CanVec 50K (hydro; transformer stations)', L_CAN),
 (r'^ev_(van|edm)\.json$', 'Natural Resources Canada, Electric Charging and Alternative Fuelling Stations Locator', L_CAN),
 (r'^nrcan_pv\.json$', 'Natural Resources Canada, Photovoltaic potential and solar resource maps of Canada', L_CAN),
 (r'^sun\.json$', 'Environment and Climate Change Canada, CWEC weather years (statistics derived from them)', L_CAN),
 (r'^water_permits_van\.json$', 'City of Vancouver Open Data: Operating permits – water systems', L_VAN),
 (r'^public_rooms_van\.json$', 'City of Vancouver Open Data: libraries, community centres', L_VAN),
 (r'^public_rooms_edm\.json$', 'City of Edmonton Open Data: Public Libraries, Recreation Facilities, Community League Halls', L_EDM),
 (r'^data/flood_edm\.json$', 'Government of Alberta, Alberta Flood Mapping (flood hazard layer)', L_AB),
 (r'^data/grade_points_van\.json$', 'City of Vancouver Open Data: LiDAR 2022 ground, per-lot corner grades', L_VAN),
 (r'^data/(hub_frozen_van|hub_grow_van)\.json$', 'Vancouver hub test fits, freeze 11i (the project’s own) on City of Vancouver lot geometry', L_OWN + '; lot geometry ' + L_VAN),
 (r'^data/(lot_types|variant_need|approval_counts|viewpoints)\.json$', 'The project’s counts and classes over City open data (Vancouver lot types only)', L_OWN + '; underlying data ' + L_VAN + ', ' + L_EDM),
 (r'^data/[a-z_]+\.json$', 'The project’s figures with their cited sources (register ids per entry); operator figures labelled as claims', L_OWN),
 (r'^(precedents|refs_sites|opps|logic|templates|arch_programs|lidar_tiles_city)\.json$', 'The project’s research compilations and tool logic, each figure cited; operator figures labelled as claims', L_OWN),
]
def classify(rel):
    for rx, src, lic in CLASS:
        if re.match(rx, rel): return src, lic
    return None
def write_manifest(near, shared, ntriv, left, nfp, npair, nbca):
    rows = []
    for dp, dn, fn in os.walk(OUT):
        for f in fn:
            rel = os.path.relpath(os.path.join(dp, f), OUT).replace('\\', '/')
            if rel == 'MANIFEST.md': continue
            c = classify(rel); rows.append((rel, os.path.getsize(os.path.join(dp, f)), c))
    rows.sort(); total = sum(r[1] for r in rows)
    m = [f'# Public web version: published files', '',
         f'Built by `publish/build_public.py` from `tool/` (13 Nov 2026). {len(rows) + 1} files, {total / 1e6:.1f} MB. Served by GitHub Pages from an Actions artifact: none of these data files is committed to git.', '',
         '## The leak check (the build fails on any of these)', '',
         '- Any PDF; any file from `checks/` or `sources/library/private/`.',
         '- Altalis-derived files (Edmonton `l_` tiles, Edmonton hub boards and growth data) and Edmonton test fits other than PNG.',
         f'- Any Altalis lot ring: {nfp:,} ring fingerprints (the first six encoded numbers of every outline) searched in every text file.',
         f'- Any Edmonton board outline: three or more consecutive corners of a board ({npair} corners, 7 boards); tile outlines are decoded to positions first. One- or two-corner matches are listed below (goal: none).',
         f'- Any point or address from the licensed assessment list: {nbca} addresses searched as whole words; addresses a public record also carries are listed below.',
         '- Internal names: the project’s note folder, people’s initials and working-session names, and the licensed list’s source key.',
         '- `index.html` without the public flag (Edmonton cards would not switch to the public text).',
         '- Every stripped script must still parse (`node --check`).', '',
         '## Result', '',
         f'- Problems: 0. One- or two-corner board matches: {len(near)}. Single trivial corners like (0, 0) not listed: {ntriv}.',
         *[f'  - `{a}` line {b}: {c}, {d} corner(s): `{e}`' for a, b, c, d, e in near],
         f'- BC Assessment addresses also carried by a public record (kept): {", ".join(shared) if shared else "none"}. Both are data-centre addresses the operators publish (the data-centre inventory, data/facilities.json).', '',
         '## Left out as doubtful (the author’s rule: leave out, list, don’t ask)', '',
         '- District-energy service areas (receiver "nets", 7 outlines): traced from City maps, a budget PDF and a utility company’s web page; none is under an open licence.',
         '- Alberta post-secondary campuses (receiver source abPSI, 1 point): from a PDF list on alberta.ca with no stated open licence.',
         '- The typology specification copies (`f1/specs/`): written in the project’s working notes.',
         '- Fonts the tool no longer uses (Open Sans, Barlow).',
         *[f'- `{r}`: no named source and licence in the build’s table' for r in left], '',
         '## Text changes in the published copy', '',
         '- Comments removed from every script, stylesheet and the page.',
         '- In the remaining text, internal names are rewritten: initials and dates of decisions → "(project decision, date"; working-session names → "the project" or "the test-fit study"; note-folder paths → "project files"; in scripts only, the licensed list’s source key → `bcaList` (no such data is published).', '',
         '## Every file', '', '| File | Size | Source | Licence |', '|---|---:|---|---|']
    m += [f'| `{r}` | {s:,} | {c[0]} | {c[1]} |' for r, s, c in rows]
    open(os.path.join(OUT, 'MANIFEST.md'), 'w', encoding='utf-8', newline='').write('\n'.join(m) + '\n')

if __name__ == '__main__':
    files = build()
    # a file the source table can't name is left out and listed (J.B. 13 Nov: anything doubtful, leave it out)
    left = [f for f in files if not classify(f)]
    for f in left: os.remove(os.path.join(OUT, f))
    files = [f for f in files if f not in left]
    # every stripped script still parses
    js = [os.path.join(OUT, f) for f in files if f.endswith('.js')]
    nodebad = [f for f in js if subprocess.run(['node', '--check', f], capture_output=True).returncode != 0]
    bad, nfp, npair, nbca, near, shared, ntriv = check()
    if near: bad.append(f'{len(near)} one- or two-corner board matches: the list must be empty to publish (J.B. 13 Nov)')
    print(f'left out (no named source): {len(left)}', left[:20])
    print(f'one- or two-corner board matches: {len(near)}; BC Assessment addresses also in a public record: {len(shared)}')
    for x in near[:40]: print('  near:', x)
    for a in shared: print('  shared address:', a)
    print(f'public/: {len(files)} files; scripts that do not parse after stripping: {len(nodebad)}; check: {len(bad)} problems '
          f'(searched for {nfp} Altalis ring fingerprints, {npair} board outline corners, {nbca} BC Assessment addresses)')
    for f in nodebad: print('  does not parse:', os.path.relpath(f, OUT))
    for b in bad[:60]: print('  ', b[:300])
    if nodebad or bad: sys.exit(1)
    write_manifest(near, shared, ntriv, left, nfp, npair, nbca)
    bad2 = check()[0]   # the list itself is published: checked like every other file
    if bad2: print('MANIFEST.md fails the check:', bad2[:5]); sys.exit(1)
    print('wrote public/MANIFEST.md (checked)')
