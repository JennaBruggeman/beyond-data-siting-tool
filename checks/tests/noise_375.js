// check (8 Nov 2026, Engineering gate): the noise by-law check at 375 1st Ave E (CD-1 (402), quiet zone, no building on record) for 339 1st Ave E, Engineering setup
const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForSelector('#f1'); await p.waitForTimeout(2500);
  await p.evaluate(() => BD.f1.viewer('engineering')); await p.waitForTimeout(5000);
  const r = await p.evaluate(async () => { const M = await BD.f1cards.eng(); const nc = M.noise; let key = null;
    for (const k in BD.S.tiles) { if (!k.startsWith('van:')) continue; for (const q of BD.S.tiles[k].par) if (q.id == '63819495') key = q.id + ':' + q.r[0]; }
    return { at375: BD.eng.noiseLot(key), worst: nc.worst && { addr: nc.worst.r && nc.worst.r.addr, lo: nc.worst.lo, hi: nc.worst.hi, d: nc.worst.d }, req: nc.req, block: nc.block, flag: nc.flag, tested: nc.tested, overQ: nc.overQ, overS: nc.overS, byCls: nc.byCls }; });
  console.log(JSON.stringify(r, null, 1)); await b.close(); })();
