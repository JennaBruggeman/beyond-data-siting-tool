// quick card screenshots: node cardshot.js <out> <tpl> <city> <k,k,...>
const { chromium } = require('playwright');
(async () => { const [out, tpl, city, ks] = process.argv.slice(2); const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/404/.test(m.text())) errs.push(m.text()); });
  await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForSelector('#f1'); await p.waitForTimeout(2500);
  await p.evaluate(t => BD.f1.viewer(t), tpl); await p.waitForTimeout(3000);
  if (city === 'edm') { await p.click('#f1v [data-city="edm"]'); await p.waitForTimeout(5000); }
  for (const k of ks.split(',')) { await p.click(`#f1v [data-to="${+k - 1}"]`); await p.waitForFunction(() => { const d = document.querySelector('#f1v .f1v-draw'); return d && !/Drawing…/.test(d.innerText); }, null, { timeout: 60000 }).catch(() => errs.push('timeout card ' + k)); await p.waitForTimeout(500);
    await p.screenshot({ path: `${out}/${tpl}_${city}_${k}.png` }); }
  console.log('errors', errs.length, errs.slice(0, 4).join(' | ')); await b.close(); })();
