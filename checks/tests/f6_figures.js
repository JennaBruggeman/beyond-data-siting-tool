// F6 inventory: every figure on every card (hero figures and schedule rows), with its data-k key, both cities.
// node f6_figures.js <out.json>   (tool on :8766). Text only; no images saved.
const fs = require('fs'); const { chromium } = require('playwright');
(async () => { const out = process.argv[2]; const b = await chromium.launch(); const res = {};
  for (const tpl of ['resident', 'municipal', 'engineering', 'architecture']) for (const city of ['van', 'edm']) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto('http://localhost:8766/index.html?nointro&x=' + Date.now()); await p.waitForSelector('#f1'); await p.waitForTimeout(2500);
    await p.evaluate(t => BD.f1.viewer(t), tpl); await p.waitForTimeout(3000);
    if (city === 'edm') { await p.click('#f1v [data-city="edm"]'); await p.waitForTimeout(5000); }
    const n = await p.$$eval('#f1v [data-to]', a => a.length);
    for (let k = 0; k < n; k++) {
      await p.click(`#f1v [data-to="${k}"]`);
      await p.waitForFunction(() => { const d = document.querySelector('#f1v .f1v-draw'); return d && !/Drawing…/.test(d.innerText); }, null, { timeout: 60000 }).catch(() => {});
      await p.waitForTimeout(800);
      const r = await p.evaluate(() => {
        const title = (document.querySelector('#f1v h2, #f1v .f1v-title') || {}).innerText || '';
        const figs = [...document.querySelectorAll('#f1v [data-fig]')].map(e => ({ k: e.dataset.k || '', t: e.innerText.replace(/\s+/g, ' ').trim().slice(0, 120) }));
        const rows = [...document.querySelectorAll('#f1v .f1v-side tr, #f1v .f1v-rows > div, #f1v dl > div')].map(e => e.innerText.replace(/\s+/g, ' ').trim().slice(0, 140));
        return { title, figs, rows };
      });
      (res[tpl] = res[tpl] || {})[`${city}:${k + 1}`] = r;
    }
    await p.close();
  }
  fs.writeFileSync(out, JSON.stringify(res, null, 1)); console.log('wrote', out); await b.close(); })();
