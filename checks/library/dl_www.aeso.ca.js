const L = [["aeso", "https://www.aeso.ca/grid/connecting-to-the-grid/large-load-projects"], ["woodcroft", "https://www.aeso.ca/assets/Uploads/projects/2582/EDTI-Distribution-Deficiency-Report-2025-Updated.pdf"], ["aesoPerf", "https://www.aeso.ca/assets/Uploads/grid/April-2026-Connection-Process-Performance.pdf"], ["aesoList", "https://www.aeso.ca/assets/AESO-Connection-Project-List-Guide-v2.pdf"], ["aesoStats2025", "https://www.aeso.ca/assets/Annual-Market-Stats-2025.pdf"], ["aesoTariff5", "https://www.aeso.ca/assets/documents/Section-5-effective-2025-01-01.pdf"]];
const out = []; const save = (blob, name) => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); out.push([name, blob.size]); };
const sleep = ms => new Promise(r => setTimeout(r, ms));
for (const [id, url] of L) {
  try { const r = await fetch(url); const ct = r.headers.get('content-type') || ''; const b = await r.blob();
    if (!r.ok) { out.push([id + ' HTTP ' + r.status, 0]); continue; }
    if (ct.includes('pdf')) save(b, id + '/full.pdf');
    else { const html = await b.text(); save(new Blob([html], {type: 'text/html'}), id + '/page.html');
      const doc = new DOMParser().parseFromString(html, 'text/html'); const host = new URL(url).host;
      const pdfs = [...new Set([...doc.querySelectorAll('a[href]')].map(a => { try { return new URL(a.getAttribute('href'), r.url).href; } catch (e) { return ''; } }).filter(h => /\.pdf(\?|#|$)/i.test(h) && new URL(h).host === host))];
      let n = 0; for (const p of pdfs.slice(0, 2)) { try { const pr = await fetch(p); if ((pr.headers.get('content-type') || '').includes('pdf')) { save(await pr.blob(), id + '/linked_' + n + '__' + p.split('/').pop().split('?')[0]); n++; await sleep(300); } } catch (e) {} } }
  } catch (e) { out.push([id + ' ERR ' + String(e).slice(0, 60), 0]); }
  await sleep(400); }
out