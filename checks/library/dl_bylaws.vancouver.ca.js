const L = [["bylaw6555", "https://bylaws.vancouver.ca/6555c.PDF"], ["neu9552", "https://bylaws.vancouver.ca/9552c.PDF"], ["bylaw4243", "https://bylaws.vancouver.ca/4243c.pdf"], ["van3575s2", "https://bylaws.vancouver.ca/zoning/Sec02.pdf"], ["vanDistricts", "https://bylaws.vancouver.ca/zoning/zoning-by-law-district-schedule-I-2.pdf"], ["van_zdb_i1c", "https://bylaws.vancouver.ca/zoning/zoning-by-law-district-schedule-i-1c.pdf"], ["van_zdb_i3", "https://bylaws.vancouver.ca/zoning/zoning-by-law-district-schedule-i-3.pdf"], ["van_zdb_fc2", "https://bylaws.vancouver.ca/zoning/zoning-by-law-district-schedule-fc-2.pdf"], ["vanParking5", "https://bylaws.vancouver.ca/parking/sec05.pdf"], ["vanZDBs10", "https://bylaws.vancouver.ca/zoning/zoning-by-law-section-10.pdf"], ["vanFire14419", "https://bylaws.vancouver.ca/14419c.pdf"], ["vanLight2019", "https://bylaws.vancouver.ca/4548c.pdf"]];
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