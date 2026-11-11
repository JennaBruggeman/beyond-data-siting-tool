// probe (11 Nov 2026, read-only): 339 1st Ave E at sizes above the 2.5 MW cap: generator yard depth, sets, the existing one-set test note (site.js genNoise),
// the plant noise check's receivers (engine.js noiseCheck), and a power-cut estimate with every running set: Lw per set = Lp7 + 20 log 7 + 8 (the screening
// formula reversed; our arithmetic), Lp = Lw + 10 log n − 20 log r − 8 at the nearest lot line and at the plant check's nearest receiver.
// Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node gen_noise_probe.js
const fs = require('fs'), path = require('path'); const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); p.on('pageerror', e => console.log('ERR', e.message));
  const G = JSON.parse(fs.readFileSync(path.join(__dirname, '../golden/V339.json'), 'utf8'));
  if (process.argv[2] === 'nocap') await p.route(/\/plant\.js/, async r => { const rs = await r.fetch(); let t = await rs.text(); const n0 = t.length; t = t.replace('gd>21.72', 'gd>999'); if (t.length === n0) console.log('cap hook not applied'); r.fulfill({ response: rs, body: t }); });   /* probe only: the 21.7 m cap lifted in the test browser */
  await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForSelector('#f1'); await p.waitForTimeout(2500);
  await p.evaluate(() => BD.f1.viewer('engineering')); await p.waitForTimeout(5000);
  const r = await p.evaluate(async (ans) => { Object.assign(BD.S.answers, ans); await BD.f1cards.eng(); const A = BD.S.answers, keep = A.mw, GN = BD.data.noise.gen, out = [];
    const lw1 = GN.lp7 + 20 * Math.log10(7) + 8;
    for (const mw of [2.5, 2.6, 3.0, 3.5, 4.0]) { A.mw = mw; BD.modelReset && BD.modelReset(); const m = BD.model(), P = m.plant || {}, s = P.s || {}, gn = m.genNoise, nc = m.noise;
      const nRun = s.gNeed || 0, d = gn ? (gn.d != null ? gn.d : Math.min(gn.dr, gn.dn)) : null;
      const rec = nc && nc.rows ? nc.rows : null;
      out.push({ mw, bigYard: P.bigYard || 0, genYard: P.genYard, setMW: s.g && s.g.mw, gNeed: s.gNeed, gN: s.gN, testNote: gn ? { d: gn.d, at: gn.at, L: gn.L, ok: gn.ok } : null,
        cutAtLotLine: d != null ? +(lw1 + 10 * Math.log10(Math.max(1, nRun)) - 20 * Math.log10(Math.max(d, 1)) - 8).toFixed(1) : null,
        noiseKeys: nc ? Object.keys(nc) : null, limit: nc && nc.limit, lpPlant: nc && (nc.lp || nc.L || nc.worst), recv: nc && (nc.recv || nc.near || nc.at) }); }
    A.mw = keep; BD.modelReset && BD.modelReset(); let fit = null, why = null; try { fit = BD.fitMax(); why = BD.fitWhy(); } catch (e) { why = String(e); } return { lw1: +lw1.toFixed(1), fit, why, out }; }, G.answers);
  console.log(JSON.stringify(r, null, 1)); await b.close(); })();
