const L = [["gridAB", "https://www.alberta.ca/albertas-greenhouse-gas-emissions-reduction-performance"], ["goaGrid", "https://www.alberta.ca/datacentres/grid"], ["abConsult", "https://www.alberta.ca/datacentres/indigenous"], ["abMicrogen", "https://www.alberta.ca/micro-generation"], ["abRFS2026", "https://www.alberta.ca/renewable-fuels-standard-resources"], ["abDCenv2026", "https://www.alberta.ca/system/files/epa-data-centre-regulatory-role-and-environmental-requirements.pdf"], ["smoke2026", "https://www.alberta.ca/air-indicators-wildfire-smoke"], ["abNewLicenceLast", "https://www.alberta.ca/datacentres/water"], ["abDCpay", "https://www.alberta.ca/powering-new-pathways-for-data-centres"]];
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