// Self-walkthrough (overnight 13 Nov 2026, queue B; Claude Link MILESTONE1_WALKTHROUGH_2026-11-12.md): every template on the five test lots, desktop (1440)
// and phone (390) width, every card. Per card: page errors, "undefined" / "NaN" / "[object Object]" / "{{" in the text, a card that could not be drawn
// or is still "Drawing…", sideways scroll, Back/Next on screen, and the hub's MW where the card shows it. Screenshots (JPEG) to
// checks/walkthrough_2026-11-13/ (git-ignored: several hundred images); findings to <out.json>.
// Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node walkthrough.js <out.json> [lotKey ...]
const fs = require('fs'), path = require('path'); const { chromium } = require('playwright');
const LOTS = { V339: ['van', '339 1st Ave E'], V1425: ['van', '1425 Clark Dr'], V555: ['van', '555 Hastings St W'], E64: ['edm', '64 Airport Rd NW'], E16075: ['edm', '16075 Fort Rd NW'] };
const TPLS = ['municipal', 'engineering', 'architecture', 'resident'];
const SHOTS = process.env.WT_SHOTS || path.join(__dirname, '..', 'walkthrough_2026-11-13'), BASE = process.env.WT_BASE || 'http://localhost:8766';   /* WT_BASE: e.g. the public build on :8767 */
(async () => { const out = process.argv[2] || 'walkthrough.json', keys = process.argv.slice(3).length ? process.argv.slice(3) : Object.keys(LOTS);
  fs.mkdirSync(SHOTS, { recursive: true }); const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl'] }); const res = []; const doneRes = new Set();
  for (const key of keys) for (const tpl of TPLS) for (const [wname, W, H] of [['desk', 1440, 900], ['phone', 390, 844]]) {
    const [city, addr] = LOTS[key]; if (tpl === 'resident') { const k = city + wname; if (doneRes.has(k)) continue; doneRes.add(k); }
    const p = await b.newPage({ viewport: { width: W, height: H } }); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text().slice(0, 200)); });
    const tag = `${tpl === 'resident' ? city : key}_${tpl}_${wname}`; let picked = null;
    try {
      await p.goto(BASE + '/index.html?nointro&x=' + Date.now()); await p.waitForSelector('#f1'); await p.waitForTimeout(2500);
      await p.evaluate(t => BD.f1.viewer(t, { pick: true }), tpl); await p.waitForTimeout(1500);
      await p.click(`#f1v [data-pcity="${city}"]`); await p.waitForTimeout(1200);
      if (tpl !== 'resident') { await p.fill('#f1pick-q', addr); await p.waitForTimeout(3000); picked = await p.evaluate(() => { const b = document.querySelector('#f1v [data-hit="0"]'); return b ? b.textContent : null; }); if (!picked) throw new Error('no address hit for ' + addr); await p.click('#f1v [data-hit="0"]'); await p.waitForTimeout(9000); }
      else await p.waitForTimeout(5000);
      const n = await p.evaluate(() => document.querySelectorAll('#f1v .f1v-strip [data-to]').length);
      for (let i = 0; i < n; i++) {
        if (i) { await p.evaluate(() => { const b = document.querySelector('#f1v [data-step="next"]'); b && b.click(); }); }
        let st = null; for (let t = 0; t < 30; t++) { await p.waitForTimeout(1000); st = await p.evaluate(() => { const d = document.querySelector('#f1v .f1v-draw'); return d && /Drawing…/.test(d.textContent) ? 'drawing' : 'ok'; }); if (st === 'ok') break; }
        const m = await p.evaluate(() => { const W = document.getElementById('f1v'), txt = W.innerText, title = (W.querySelector('.f1v-panel h2') || {}).textContent, nx = W.querySelector('[data-step="next"]'), r = nx && nx.getBoundingClientRect();
          const bad = (txt.match(/\bundefined\b|\bNaN\b|\[object Object\]|\{\{/g) || []).slice(0, 3);
          const mw = [...W.querySelectorAll('.f1c-hero > div')].map(h => h.innerText.replace(/\s+/g, ' ')).filter(t => /MW/.test(t)).slice(0, 2);
          const est = (W.querySelector('.f1c-est') || {}).textContent || null, nofit = /doesn’t fit|doesn't fit/i.test((W.querySelector('.f1v-panel .lead') || {}).textContent || '');
          return { title, bad, cannot: /could not be drawn/.test(txt), sideways: document.documentElement.scrollWidth > innerWidth + 1 || W.scrollWidth > W.clientWidth + 1, nextOn: r ? (r.bottom <= innerHeight + 1 || getComputedStyle(nx).position === 'sticky') : null, mw, est, nofit }; });
        m.stillDrawing = st === 'drawing';
        await p.screenshot({ path: path.join(SHOTS, `${tag}_${String(i + 1).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 55 });
        res.push(Object.assign({ lot: tpl === 'resident' ? city : key, tpl, width: wname, i: i + 1, picked }, m, { errs: errs.splice(0) }));
      }
    } catch (e) { res.push({ lot: key, tpl, width: wname, fatal: String(e.message || e).slice(0, 300), errs: errs.splice(0) }); }
    await p.close(); fs.writeFileSync(out, JSON.stringify(res, null, 1)); console.log(tag, 'cards', res.filter(r => r.tpl === tpl && r.width === wname && (r.lot === key || r.lot === city)).length); }
  await b.close(); })();
