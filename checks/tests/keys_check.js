// Queue D (overnight 13 Nov 2026): keyboard and layers, Change lot, "See the workflow" on Edmonton lots.
// Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node keys_check.js
const { chromium } = require('playwright');
(async () => { const b = await chromium.launch({ args: ['--use-gl=swiftshader'] }); const out = []; const ok = (t, v, extra) => { out.push([v ? 'PASS' : 'FAIL', t, extra || '']); };
  const page = async () => { const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); p.errs = []; p.on('pageerror', e => p.errs.push(e.message)); await p.goto('http://localhost:8766/index.html?nointro&x=' + Date.now()); await p.waitForSelector('#f1'); await p.waitForTimeout(2500); return p; };
  const pick = async (p, tpl, city, addr) => { await p.evaluate(t => BD.f1.viewer(t, { pick: true }), tpl); await p.waitForTimeout(1500); await p.click(`#f1v [data-pcity="${city}"]`); await p.waitForTimeout(1000); await p.fill('#f1pick-q', addr); await p.waitForTimeout(3000); await p.click('#f1v [data-hit="0"]'); await p.waitForTimeout(8000); };
  const cur = p => p.evaluate(() => { const W = document.getElementById('f1v'); return W ? { title: (W.querySelector('.f1v-panel h2') || {}).textContent, where: (W.querySelector('.f1v-where') || {}).textContent, n: (W.querySelector('.f1v-no') || {}).textContent } : null; });
  /* 1. arrows, the logic diagram on top, Esc order (I40) on an Edmonton lot */
  let p = await page(); await pick(p, 'architecture', 'edm', '64 Airport Rd NW');
  for (let i = 0; i < 11; i++) { await p.keyboard.press('ArrowRight'); await p.waitForTimeout(400); }
  let c = await cur(p); ok('ArrowRight x11 reaches card 12 on 64 Airport Rd NW', c && /^12 \//.test(c.n), c && c.n);
  await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(600); c = await cur(p); ok('ArrowLeft goes back one card', c && /^11 \//.test(c.n), c && c.n);
  await p.evaluate(() => { const h = document.querySelector('#f1v [data-how]'); h && h.click(); }); await p.waitForTimeout(2500);
  const hasL = await p.evaluate(() => !!document.getElementById('f1l')); ok('How it works opens the logic diagram over the cards', hasL);
  await p.keyboard.press('Escape'); await p.waitForTimeout(800);
  let st = await p.evaluate(() => ({ l: !!document.getElementById('f1l'), v: !!document.getElementById('f1v') })); ok('Esc closes the logic diagram only (I40)', !st.l && st.v, JSON.stringify(st));
  await p.keyboard.press('Escape'); await p.waitForTimeout(800); st = await p.evaluate(() => ({ v: !!document.getElementById('f1v'), land: !!document.getElementById('f1') })); ok('Esc again closes the cards, back to the landing page', !st.v && st.land, JSON.stringify(st));
  ok('no page errors (part 1)', !p.errs.length, p.errs.slice(0, 2).join(' | ')); await p.close();
  /* 2. Change lot keeps the card (I43): Edmonton to Edmonton, and Vancouver to Edmonton */
  p = await page(); await pick(p, 'architecture', 'edm', '64 Airport Rd NW');
  await p.evaluate(() => { const b = [...document.querySelectorAll('#f1v .f1v-strip [data-to]')].find(x => /Rooms/.test(x.textContent)); b.click(); }); await p.waitForTimeout(6000);
  await p.evaluate(() => { const b = document.querySelector('#f1v [data-relot]'); b && b.click(); }); await p.waitForTimeout(1200);
  await p.click('#f1v [data-pcity="edm"]'); await p.waitForTimeout(800); await p.fill('#f1pick-q', '16075 Fort Rd NW'); await p.waitForTimeout(3000); await p.click('#f1v [data-hit="0"]'); await p.waitForTimeout(9000);
  c = await cur(p); ok('Change lot on Rooms (64 Airport to 16075 Fort Rd) stays on Rooms', c && c.title === 'Rooms' && /16075/i.test(c.where || ''), JSON.stringify(c));
  const mw = await p.evaluate(() => [...document.querySelectorAll('#f1v .f1c-hero > div')].map(h => h.innerText.replace(/\s+/g, ' ')).find(t => /MW/.test(t)) || null); ok('16075 Fort Rd shows 0.95 MW on Rooms', /0\.95/.test(mw || ''), mw);
  await p.evaluate(() => { const b = document.querySelector('#f1v [data-relot]'); b && b.click(); }); await p.waitForTimeout(1200);
  await p.click('#f1v [data-pcity="van"]'); await p.waitForTimeout(800); await p.fill('#f1pick-q', '339 1st Ave E'); await p.waitForTimeout(3000); await p.click('#f1v [data-hit="0"]'); await p.waitForTimeout(9000);
  c = await cur(p); ok('Change lot to Vancouver 339 stays on Rooms, header says Vancouver', c && c.title === 'Rooms' && /Vancouver/.test(c.where || ''), JSON.stringify(c));
  ok('no page errors (part 2)', !p.errs.length, p.errs.slice(0, 2).join(' | ')); await p.close();
  /* 3. See the workflow, then Edmonton on step 1, each template */
  for (const t of ['municipal', 'engineering', 'architecture', 'resident']) {
    p = await page(); await p.evaluate(x => BD.f1.viewer(x), t); await p.waitForTimeout(4000);
    const hasCity = await p.evaluate(() => !!document.querySelector('#f1v [data-city="edm"]')); ok(`${t}: step 1 offers Edmonton`, hasCity);
    if (hasCity) { await p.click('#f1v [data-city="edm"]'); await p.waitForTimeout(9000); }
    c = await cur(p); ok(`${t}: the Edmonton example opens on step 1`, c && /Edmonton/.test(c.where || '') && /^1 \//.test(c.n || ''), JSON.stringify(c));
    const bad = await p.evaluate(() => (document.getElementById('f1v').innerText.match(/\bundefined\b|\bNaN\b|\[object Object\]/g) || []).length); ok(`${t}: no undefined/NaN on the Edmonton step 1`, !bad);
    ok(`${t}: no page errors`, !p.errs.length, p.errs.slice(0, 2).join(' | ')); await p.close(); }
  out.forEach(r => console.log(r.join(' | '))); console.log(out.filter(r => r[0] === 'FAIL').length, 'fail of', out.length); await b.close(); })();
