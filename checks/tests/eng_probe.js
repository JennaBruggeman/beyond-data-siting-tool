// probe: the model at the Engineering tier ('full') for the example lots after answers reset + findFit; dumps top-level fields
const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForSelector('#f1'); await p.waitForTimeout(2500);
  await p.evaluate(() => BD.f1.viewer('engineering')); await p.waitForTimeout(5000);
  const r = await p.evaluate(async () => { BD.setTier('full'); const A = BD.S.answers; for (const k of Object.keys(A)) delete A[k]; Object.assign(A, { built: 'new', extent: 'whole', floor: '', mw: null });
    BD.modelReset(); BD.flow.findFit(); const m = BD.model(); const o = {};
    for (const k in m) { const v = m[k]; o[k] = v == null ? null : typeof v === 'object' ? (Array.isArray(v) ? `[${v.length}] ` + JSON.stringify(v).slice(0, 80) : '{' + Object.keys(v).slice(0, 14).join(',') + '}') : String(v).slice(0, 80); }
    return { A: JSON.stringify(A), tier: BD.tier(), o }; });
  console.log(JSON.stringify(r, null, 0).replace(/","/g, '",\n"')); await b.close(); })();
