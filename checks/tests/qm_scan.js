// Read-only (12 Nov 2026): every "?" the tool shows on the two example lots, by template and card. For each card: every row or
// sentence of the card panel (visible text and the closed "more" and "sources" sections) that contains a "?", with its row label.
// Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node qm_scan.js <out.json>
const fs = require('fs'), path = require('path');
const NM = (process.env.NODE_PATH || '').split(path.delimiter)[0];
const { chromium } = require('playwright');
(async () => {
  const out = process.argv[2] || 'qm.json';
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const local = (re, f, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, f)), contentType: type }));
  await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript'); await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
  await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForSelector('#f1', { timeout: 20000 }); await p.waitForTimeout(2500);
  const T = await p.evaluate(() => BD.f1.TPL.map(t => ({ id: t.id, name: t.name || t.id, cards: t.cards.map(c => c.title || c.chap || '') })));
  const res = [];
  for (const t of T) {
    await p.evaluate(id => BD.f1.viewer(id), t.id); await p.waitForTimeout(2500);
    for (const city of ['van', 'edm']) {
      if (city === 'edm') { await p.click('#f1v [data-city="edm"]'); await p.waitForTimeout(4000); }
      for (let k = 0; k < t.cards.length; k++) {
        await p.click(`#f1v [data-to="${k}"]`);
        try { await p.waitForFunction(() => { const d = document.querySelector('#f1v .f1v-draw'); return !d || !/Drawing…/.test(d.innerText); }, null, { timeout: 90000 }); } catch (e) {}
        await p.waitForTimeout(600);
        const r = await p.evaluate(() => {
          const root = document.getElementById('f1v'), lot = (root.querySelector('.f1v-lot, [data-lot], header') || {}).innerText || '';
          const title = ((root.querySelector('h1, h2, .f1v-title') || {}).innerText || '').trim();
          const found = [], seen = new Set();
          /* rows: table rows, list items, paragraphs, labelled blocks; the smallest element holding the "?" */
          const els = [...root.querySelectorAll('tr, li, p, dd, dt, .row, .f1-row, div, span, text, summary, td')];
          for (const e of els) {
            const tx = (e.textContent || '').replace(/\s+/g, ' ').trim();
            if (!tx.includes('?') || tx.length > 700) continue;
            if ([...e.children].some(c => (c.textContent || '').includes('?') && (c.textContent || '').length < 700)) continue;   /* a child holds it: take the child */
            if (seen.has(tx)) continue; seen.add(tx);
            const row = e.closest('tr, li, .row, .f1-row'), label = row && row !== e ? (row.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 160) : '';
            const hidden = !!e.closest('details:not([open])');
            /* context for a bare "?": the parent's text and the text just before it (the row's label) */
            const par = e.parentElement ? (e.parentElement.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 240) : '';
            let prev = e.previousElementSibling; while (prev && !(prev.textContent || '').trim()) prev = prev.previousElementSibling;
            const before = prev ? (prev.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 160) : '';
            const sec = (() => { let a = e; while (a && a !== root) { let h = a.previousElementSibling; while (h) { if (/^H[2-4]$/.test(h.tagName) || /f1v-h|title/.test(h.className || '')) return (h.textContent || '').trim().slice(0, 80); h = h.previousElementSibling; } a = a.parentElement; } return ''; })();
            found.push({ text: tx, row: label && label !== tx ? label : '', hidden, par: par !== tx ? par : '', before, sec });
          }
          return { title, lot: lot.trim().slice(0, 120), found };
        });
        res.push(Object.assign({ tpl: t.id, tplName: t.name, city, card: k + 1, cardName: t.cards[k] }, r));
        console.log(t.id, city, k + 1, r.title.slice(0, 40), r.found.length);
      }
      if (city === 'edm') { await p.click('#f1v [data-city="van"]'); await p.waitForTimeout(3000); }
    }
    await p.click('#f1v [data-x]'); await p.waitForTimeout(300);
  }
  fs.writeFileSync(out, JSON.stringify(res, null, 1)); await b.close();
})().catch(e => { console.error(e); process.exit(1); });
