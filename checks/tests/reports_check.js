// Reports page by page (overnight 13 Nov 2026, queue C): Architecture, Engineering, Municipal and Resident reports on 339 1st Ave E and 64 Airport Rd NW.
// Per page: overflow (content taller than the letter page), blank page, internal notes (file names, code names, freeze ids, "J.B."), "undefined"/"NaN"/
// "[object Object]", and the headline figures against the cards. Screenshots to checks/walkthrough_2026-11-13/reports_*.jpg (git-ignored).
// Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node reports_check.js <out.json>
const fs = require('fs'), path = require('path'); const { chromium } = require('playwright');
const LOTS = { V339: ['van', '339 1st Ave E'], E64: ['edm', '64 Airport Rd NW'] };
const SHOTS = path.join(__dirname, '..', 'walkthrough_2026-11-13');
const NOTE = /\b[\w-]+\.(?:js|py|md|json)\b|\bBD\.\w|\bEH-FREEZE|\bJ\.B\.|\bCowork\b|\bmain chat\b|Claude Link|\bundefined\b|\bNaN\b|\[object Object\]/;
(async () => { const out = process.argv[2]; const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl'] }); const res = [];
  for (const key of Object.keys(LOTS)) for (const tpl of ['architecture', 'engineering', 'municipal', 'resident']) {
    const [city, addr] = LOTS[key]; const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
    try {
      await p.goto('http://localhost:8766/index.html?nointro&x=' + Date.now()); await p.waitForSelector('#f1'); await p.waitForTimeout(2500);
      await p.evaluate(t => BD.f1.viewer(t, { pick: true }), tpl); await p.waitForTimeout(1500); await p.click(`#f1v [data-pcity="${city}"]`); await p.waitForTimeout(1200);
      if (tpl !== 'resident') { await p.fill('#f1pick-q', addr); await p.waitForTimeout(3000); await p.click('#f1v [data-hit="0"]'); await p.waitForTimeout(9000); } else await p.waitForTimeout(4000);
      const cardFigs = []; const n = await p.evaluate(() => document.querySelectorAll('#f1v .f1v-strip [data-to]').length);   /* straight to the report (stepping through every card first raced the report build); the cards' figures come from the walkthrough */
      await p.evaluate(k => document.querySelectorAll('#f1v .f1v-strip [data-to]')[k].click(), n - 1); await p.waitForTimeout(15000);
      const pages = await p.evaluate(() => [...document.querySelectorAll('#f1v .f1r-sheet, #f1v .f1c-mua-sheet, #f1v .f1c-eng-b-pg .sh')].map((s, i) => ({ i: i + 1, over: s.scrollHeight > s.clientHeight + 4, h: [s.scrollHeight, s.clientHeight], words: s.innerText.trim().split(/\s+/).length, text: s.innerText.replace(/\s+/g, ' ').slice(0, 4000) })));
      await p.screenshot({ path: path.join(SHOTS, `reports_${key}_${tpl}.jpg`), type: 'jpeg', quality: 60, fullPage: true });
      pages.forEach(pg => { const m = NOTE.exec(pg.text); pg.note = m ? pg.text.slice(Math.max(0, m.index - 40), m.index + 60) : null; pg.blank = pg.words < 12; delete pg.text; });
      res.push({ key, tpl, pages, cardMW: [...new Set(cardFigs.filter(t => /MW\b/.test(t)))].slice(0, 8), errs });
    } catch (e) { res.push({ key, tpl, fatal: String(e.message || e).slice(0, 300), errs }); }
    await p.close(); console.log(key, tpl, (res[res.length - 1].pages || []).length, 'pages'); }
  fs.writeFileSync(out, JSON.stringify(res, null, 1)); await b.close(); })();
