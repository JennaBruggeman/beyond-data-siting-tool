// F1 gate checks and screenshots (CODE_JOB_F1_site_build.md §5–6): the landing page and every card of every template's viewer, on both example lots,
// at 1440 × 900; landing and one card per template at 390 px. Fails on page errors, console errors, or "NaN" / "undefined" in the visible text.
// Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node f1_gate.js <shots dir> [all]   (without "all": one card per chapter)
const fs = require('fs'), path = require('path');
const NM = (process.env.NODE_PATH || '').split(path.delimiter)[0];
const { chromium } = require('playwright');
(async () => {
  const out = process.argv[2] || 'f1'; const all = process.argv[3] === 'all'; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl'] }); const bad = []; let shots = 0;
  const ss = require('./spec_sync.js').check(); bad.push(...ss.bad); console.log('spec copies same as Claude Link:', ss.ok.join(', ') || 'none');   /* J.B. 9 Nov: no stale spec copy */
  async function page(w, h) { const p = await b.newPage({ viewport: { width: w, height: h } }); p.errs = [];
    p.on('pageerror', e => p.errs.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error' && !/status of 404/.test(m.text())) p.errs.push('console: ' + m.text()); });
    /* 404s are checked by URL: the old tool asks for Edmonton ground tiles (tiles/edm/g_*.json) that were never built (no HRDEM file, tool/make_grade.py); known, reported, not an F1 error */
    p.known = new Set(); p.on('response', r => { if (r.status() >= 400) { if (/\/tiles\/edm\/g_-?\d+_-?\d+\.json$/.test(r.url())) p.known.add('Edmonton ground tiles missing (404)'); else p.errs.push(r.status() + ' ' + r.url()); } });
    const local = (re, f, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, f)), contentType: type }));
    await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript'); await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
    await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForSelector('#f1', { timeout: 20000 }); await p.waitForTimeout(2500); return p; }
  const textCheck = async (p, where) => { const t = await p.evaluate(() => { const e = document.getElementById('f1v') || document.getElementById('f1'); return e ? e.innerText + ' ' + [...e.querySelectorAll('svg text')].map(x => x.textContent).join(' ') : ''; });
    if (/\bNaN\b|\bundefined\b|\bnull\b|Infinity/.test(t)) bad.push(where + ': NaN, undefined, null or Infinity in the text'); if (/could not be drawn/.test(t)) bad.push(where + ': card could not be drawn'); };
  for (const [w, h, tag] of [[1440, 900, '1440'], [390, 844, '390']]) {
    const p = await page(w, h); await textCheck(p, 'landing ' + tag);
    await p.screenshot({ path: path.join(out, `landing_${tag}.png`), fullPage: true }); shots++;
    const T = await p.evaluate(() => BD.f1.TPL.map(t => ({ id: t.id, cards: t.cards.map(c => c.chap) })));
    for (const t of T) {
      await p.evaluate(id => BD.f1.viewer(id), t.id); await p.waitForTimeout(2500);
      for (const city of (tag === '1440' ? ['van', 'edm'] : ['van'])) {
        if (city === 'edm') { await p.click('#f1v [data-to="0"]'); await p.waitForTimeout(800); await p.click('#f1v [data-city="edm"]'); await p.waitForTimeout(4000); }
        const idx = tag === '390' ? [0] : all ? t.cards.map((_, k) => k) : t.cards.map((c, k) => k).filter(k => k === 0 || t.cards[k] !== t.cards[k - 1]);
        for (const k of idx) { await p.click(`#f1v [data-to="${k}"]`); await p.evaluate(() => { document.getElementById('f1v').scrollTop = 0; }); await p.waitForFunction(() => { const d = document.querySelector('#f1v .f1v-draw'); return d && !/Drawing…/.test(d.innerText); }, null, { timeout: 90000 }).catch(() => bad.push(`${t.id} ${city} card ${k + 1} ${tag}: still drawing after 90 s`)); await p.waitForTimeout(400); await p.evaluate(() => { document.getElementById('f1v').scrollTop = 0; }); await textCheck(p, `${t.id} ${city} card ${k + 1} ${tag}`);
          await p.screenshot({ path: path.join(out, `${t.id}_${city}_${String(k + 1).padStart(2, '0')}_${tag}.png`) }); shots++; }
        if (city === 'edm') { await p.click('#f1v [data-to="0"]'); await p.waitForTimeout(800); await p.click('#f1v [data-city="van"]'); await p.waitForTimeout(3000); } }   /* 12 Nov 2026: the city is chosen on step 1 */
      await p.click('#f1v [data-x]'); await p.waitForTimeout(300); }
    /* the logic view (§3d): each template tab with one part selected, then a card's parts lit (Engineering, Heat), and the plain view */
    const LV = [['resident', 'zoning_status'], ['municipal', 'zoning_status'], ['full', 'heat_delivered'], ['arch', 'envelope'], ['all', null]];
    for (const [tab, part] of (tag === '1440' ? LV : [['full', 'heat_delivered']])) {
      await p.evaluate(tab => BD.f1logic.open({ tab }), tab); await p.waitForTimeout(800);
      if (part) { await p.click(`#f1l g[data-k="${part}"]`); await p.waitForTimeout(300); }
      const lt = await p.evaluate(() => document.getElementById('f1l').innerText); if (/NaN|undefined/.test(lt)) bad.push(`logic ${tab} ${tag}: NaN or undefined`);
      await p.screenshot({ path: path.join(out, `logic_${tab}${part ? '_' + part : ''}_${tag}.png`) }); shots++; await p.click('#f1l [data-close]'); await p.waitForTimeout(200); }
    if (tag === '1440') { await p.evaluate(() => BD.f1.viewer('engineering')); await p.waitForTimeout(2500); await p.click('#f1v [data-to="5"]'); await p.click('#f1v [data-how="card"]'); await p.waitForTimeout(900);
      await p.screenshot({ path: path.join(out, 'logic_card_engineering_heat_1440.png') }); shots++; await p.click('#f1l [data-close]'); await p.click('#f1v [data-x]'); }
    if (p.errs.length) bad.push(`${tag}: ` + p.errs.slice(0, 5).join(' | ')); if (p.known.size) console.log(tag, 'known:', [...p.known].join('; '));
    await p.close(); }
  await b.close(); console.log('screenshots', shots, '·', bad.length ? 'PROBLEMS\n' + bad.join('\n') : 'no page errors, no console errors, no NaN or undefined');
  process.exit(bad.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
