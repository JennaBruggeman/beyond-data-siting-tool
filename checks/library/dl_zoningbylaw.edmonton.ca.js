const L = [["edmBylaw20001", "https://zoningbylaw.edmonton.ca/part-5-general-development-regulations/580-parking-access-site-circulation-and-bike-parking"], ["edm20001", "https://zoningbylaw.edmonton.ca/part-8-definitions/810-use-definitions"], ["edmZB570", "https://zoningbylaw.edmonton.ca/570-measuring-height-and-grade"], ["edmZB7120", "https://zoningbylaw.edmonton.ca/part-7-administrative-and-interpretive-clauses/development-permits/7120-no-development-permit"], ["edmZB510", "https://zoningbylaw.edmonton.ca/part-5-general-development-regulations/510-accessory-uses-buildings-and-structures"], ["edmZB5120", "https://zoningbylaw.edmonton.ca/part-5-general-development-regulations/5120-site-performance-standards"], ["edmZB2120", "https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays/industrial-zones/2120-be-business-employment-zone"], ["edmZBres", "https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays"], ["edm7140sun", "https://zoningbylaw.edmonton.ca/"]];
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