"""Builds browser_batch actions for several sites: navigate to the first link, then download all of that site's links.
Usage: python3 make_batch.py <tag> <domain> [<domain> ...]  -> prints actions JSON; writes dl_<tag>.json"""
import json, sys, os, urllib.parse
tag, doms = sys.argv[1], sys.argv[2:]
m = json.load(open('../sweep/sweep_merged.json')); done = set(os.listdir('../../sources/library/public'))
BODY = ("const out = window.__out; const save = (blob, name) => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); out.push([name, blob.size]); };\n"
        "for (const [id, url] of L) { try { const c = new AbortController(); const t = setTimeout(() => c.abort(), 60000); const r = await fetch(url, {signal: c.signal}); const ct = r.headers.get('content-type') || ''; const b = await r.blob(); clearTimeout(t); "
        "if (!r.ok) { out.push([id + ' HTTP ' + r.status, 0]); continue; } if (ct.includes('pdf')) save(b, id + '/full.pdf'); else { const html = await b.text(); save(new Blob([html], {type: 'text/html'}), id + '/page.html'); } } "
        "catch (e) { out.push([id + ' ERR ' + String(e).slice(0, 60), 0]); } await new Promise(r => setTimeout(r, 300)); }\nwindow.__done = true;")
allL, actions = [], []
for dom in doms:
    L = [[r['id'], r['correct_url']] for r in m if r['verdict'].startswith('Found') and r.get('copyright') == 'public'
         and urllib.parse.urlparse(r.get('correct_url') or '').netloc == dom and r['id'] not in done]
    allL += L; U = {}
    for i, u in L: U.setdefault(u, []).append(i)
    uniq = [[v[0], u] for u, v in U.items()]
    if not uniq: continue
    actions.append({'name': 'navigate', 'input': {'url': uniq[0][1]}})
    actions.append({'name': 'javascript_tool', 'input': {'action': 'javascript_exec', 'text': 'window.__out = []; window.__done = false; (async () => { const L = ' + json.dumps(uniq) + ';\n' + BODY + ' })(); "started"'}})
    actions.append({'name': 'javascript_tool', 'input': {'action': 'javascript_exec', 'text': 'for (let i = 0; i < 35 && !window.__done; i++) await new Promise(r => setTimeout(r, 1000)); ({done: window.__done, out: window.__out})'}})
json.dump(allL, open(f'dl_{tag}.json', 'w'))
print(json.dumps(actions))
