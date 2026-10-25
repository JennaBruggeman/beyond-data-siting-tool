"""Prints the browser JavaScript that saves every public source on one website.
Usage: python3 make_js.py <domain>   (writes dl_<domain>.json with the list)"""
import json, sys, urllib.parse
dom = sys.argv[1]
m = json.load(open('../sweep/sweep_merged.json'))
done = set(__import__('os').listdir('../../sources/library/public'))
L = [[r['id'], r['correct_url']] for r in m if r['verdict'].startswith('Found') and r.get('copyright') == 'public'
     and urllib.parse.urlparse(r.get('correct_url') or '').netloc == dom and r['id'] not in done]
json.dump(L, open(f'dl_{dom}.json', 'w'))
U = {}
for i, u in L: U.setdefault(u, []).append(i)
L = [[ids[0], u] for u, ids in U.items()]
js = """const L = %s;
const out = []; const save = (blob, name) => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); out.push([name, blob.size]); };
const sleep = ms => new Promise(r => setTimeout(r, ms));
for (const [id, url] of L) {
  try { const r = await fetch(url); const ct = r.headers.get('content-type') || ''; const b = await r.blob();
    if (!r.ok) { out.push([id + ' HTTP ' + r.status, 0]); continue; }
    if (ct.includes('pdf')) save(b, id + '/full.pdf');
    else { const html = await b.text(); save(new Blob([html], {type: 'text/html'}), id + '/page.html');
      const doc = new DOMParser().parseFromString(html, 'text/html'); const host = new URL(url).host;
      const pdfs = [...new Set([...doc.querySelectorAll('a[href]')].map(a => { try { return new URL(a.getAttribute('href'), r.url).href; } catch (e) { return ''; } }).filter(h => /\\.pdf(\\?|#|$)/i.test(h) && new URL(h).host === host))];
      let n = 0; for (const p of pdfs.slice(0, 2)) { try { const pr = await fetch(p); if ((pr.headers.get('content-type') || '').includes('pdf')) { save(await pr.blob(), id + '/linked_' + n + '__' + p.split('/').pop().split('?')[0]); n++; await sleep(300); } } catch (e) {} } }
  } catch (e) { out.push([id + ' ERR ' + String(e).slice(0, 60), 0]); }
  await sleep(400); }
out""" % json.dumps(L)
open(f'dl_{dom}.js', 'w').write(js)
print(len(L), 'unique links;', 'first url:', L[0][1] if L else None)
