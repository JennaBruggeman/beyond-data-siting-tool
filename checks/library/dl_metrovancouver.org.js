const L = [["gvsddUT008", "https://metrovancouver.org/boards/Policies/sewage-and-waste-heat-recovery.pdf"], ["gvsdd299", "https://metrovancouver.org/boards/Bylaws/GVSDD_Bylaw_299_Consolidated.pdf"], ["mvReclaimed", "https://metrovancouver.org/boards/Policies/interim-reclaimed-water.pdf"], ["mvWDP2021", "https://metrovancouver.org/services/liquid-waste/Documents/general-waste-discharge-application.pdf"], ["waterHardness2026", "https://metrovancouver.org/services/water/Documents/water-quality-annual-report-volume-1-2025.pdf"], ["mvBylaw1329", "https://metrovancouver.org/boards/Bylaws/MVRD_Bylaw_1329.pdf"], ["mvBylaw1082", "https://metrovancouver.org/boards/Bylaws/MVRD_Bylaw_1082_Consolidated.pdf"], ["mvAirSummary2024", "https://metrovancouver.org/services/air-quality-climate-action/Documents/annual-air-quality-summary-2024.pdf"]];
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