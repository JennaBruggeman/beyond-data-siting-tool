// probe (11 Nov 2026, read-only): 339 1st Ave E, why the footprint drops between 2.5 and 2.6 MW: plant yard depth, skew, truck lane, rows of sets, building extent.
// Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node yard_probe.js
const fs = require('fs'), path = require('path'); const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); p.on('pageerror', e => console.log('ERR', e.message));
  const G = JSON.parse(fs.readFileSync(path.join(__dirname, '../golden/V339.json'), 'utf8'));
  await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForSelector('#f1'); await p.waitForTimeout(2500);
  await p.evaluate(() => BD.f1.viewer('engineering')); await p.waitForTimeout(5000);
  const r = await p.evaluate(async (ans) => { Object.assign(BD.S.answers, ans); await BD.f1cards.eng(); const A = BD.S.answers, out = [];
    for (const mw of [2.4, 2.5, 2.6, 3.0, 3.5, 3.6, 4.0]) { A.mw = mw; BD.modelReset(); const m = BD.model(), P = m.plant || {}, s = P.s || {}, F = m.F;
      const fb = BD.plant.localBounds(F, m.foot), yb = P.yard ? BD.plant.localBounds(F, P.yard) : null;
      const sets = (P.boxes || []).filter(x => x.kind === s.g || (x.k && x.k === s.g) || /gen/i.test(x.name || x.kind && x.kind.name || ''));
      out.push({ mw, gN: s.gN, gNeed: s.gNeed, setL: s.g && s.g.L, setW: s.g && s.g.W, gap: s.g && s.g.gap, wall: s.g && s.g.wall, coolYard: P.coolYard, genYard: P.genYard,
        wv: +(m.v[1] - m.v[0]).toFixed(1), uBuild: m.uBuild && +Math.abs(m.uBuild[1] - m.uBuild[0]).toFixed(1), yardDepth: +(m.plantYardDepth || 0).toFixed(2), skew: P.skew, endExtra: P.endExtra, deepened: P.deepened || 0, truck: P.truck && P.truck.type, truckAisle: P.truck && P.truck.aisle, bigYard: P.bigYard,
        tank: P.genTank, foot: Math.round(BD.area(m.foot)), footL: +(fb[1] - fb[0]).toFixed(1), footW: +(fb[3] - fb[2]).toFixed(1), yardU: yb && +(yb[1] - yb[0]).toFixed(1), short: P.short }); }
    return out; }, G.answers);
  r.forEach(x => console.log(JSON.stringify(x))); await b.close(); })();
