// probe: the Engineering setup (BD.f1cards.eng) on an example lot, and a read-only cooling swap (withAnswers); prints the main model figures
const { chromium } = require('playwright');
(async () => { const city = process.argv[2] || 'van'; const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForSelector('#f1'); await p.waitForTimeout(2500);
  await p.evaluate(() => BD.f1.viewer('engineering')); await p.waitForTimeout(4000);
  if (city === 'edm') { await p.click('#f1v [data-city="edm"]'); await p.waitForTimeout(6000); }
  const r = await p.evaluate(async () => { const C = BD.f1cards; const M = await C.eng(); const A = BD.S.answers;
    const sum = m => ({ mw: m.mwSized, cool: m.plant && m.plant.s && m.plant.s.k && m.plant.s.k.name, n: m.plant && m.plant.s && m.plant.s.n, noise: m.noise && { limit: m.noise.limit, overQ: m.noise.overQ, block: !!m.noise.block }, warn: m.warn.length, notes: m.notes.length });
    const base = sum(M), ans = JSON.stringify(A);
    const sw = {}; for (const o of ['dry', 'towers', 'hybrid']) sw[o] = await C.withAnswers({ outside: o }, m => sum(m));
    for (const i of ['air', 'plate', 'immersion']) sw[i] = await C.withAnswers({ inside: i }, m => sum(m));
    return { tier: BD.tier(), ans, base, sw, after: JSON.stringify(BD.S.answers) === ans, f: Object.keys(BD.eng.siteFacts ? (BD.eng.siteFacts() || {}) : {}).slice(0, 60).join(',') }; });
  console.log(JSON.stringify(r, null, 1)); await b.close(); })();
