// Street names from fronting lot addresses (tool/streetnames.js, our method; J.B. 8 Nov 2026): for the five check lots, how many street segments
// within R m of the lot get a name, how many are lanes, how many stay '?'; and the name each lot edge facing a street gets.
// Usage (from checks/tests/): NODE_PATH=<node_modules with playwright> node streetnames_probe.js <out.json> [R=150]
// Needs the tool served at http://localhost:8766. Output holds street names and counts only (no lot outlines).
const fs = require('fs'), path = require('path');
const NM = (process.env.NODE_PATH || '').split(path.delimiter)[0];
const { chromium } = require('playwright');
const LOTS = {
  V339: { lab: '339 1st Ave E', sel: { city: 'van', tile: '1_1', id: '63819485' } },
  V09: { lab: '275 1st Ave E', sel: { city: 'van', tile: '1_1', id: '63819363' } },
  CLARK: { lab: '1425 Clark Dr', sel: { city: 'van', tile: '2_1', id: '23060741' } },
  E06A: { lab: '74 Airport Rd NW', sel: { city: 'edm', tile: '-1_1', id: '176767' } },
  E06B: { lab: '64 Airport Rd NW', sel: { city: 'edm', tile: '-1_1', id: '146402' } },
};
(async () => {
  const out = process.argv[2] || 'streetnames.json', R = +(process.argv[3] || 150), res = {};
  const b = await chromium.launch({ ...(process.env.PW_EXE ? { executablePath: process.env.PW_EXE } : {}) });
  for (const key of Object.keys(LOTS)) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
    const local = (re, file, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, file)), contentType: type }));
    await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript');
    await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
    await p.route(/flow\.js/, async r => { const rs = await r.fetch(); let t = await rs.text();
      t = t.replace('const EXAMPLES=[', 'const EXAMPLES=window.__EX=[').replace('async function runExample(i){', 'window.__run=runExample; async function runExample(i){'); r.fulfill({ response: rs, body: t }); });
    await p.route(/fonts\.(googleapis|gstatic)|d3|jspdf|autotable/, r => r.abort());
    await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForTimeout(6000);
    await p.evaluate(x => { window.__EX.push(Object.assign({ sub: '', ans: { built: 'new', extent: 'whole', floor: '' } }, x)); const w = document.getElementById('welcome'); if (w) w.remove(); window.__run(window.__EX.length - 1); }, LOTS[key]);
    await p.waitForTimeout(8000);
    res[key] = await p.evaluate(async R => { const s = BD.S.sel, G = await BD.streets(s.city), SN = BD.streetNames, ring = s.ring;
      const E = SN.edgeNames(G, BD.S.tiles, s.city, ring, R); const seg = [...E.N.values()];
      const near = { segments: seg.length, named: seg.filter(v => v.name).length, lanes: seg.filter(v => v.lane).length, unnamed: seg.filter(v => !v.lane && !v.name).length,
        unnamedWithVotes: seg.filter(v => !v.lane && !v.name && v.n).length, names: [...new Set(seg.filter(v => v.name).map(v => v.name))].sort() };
      const ey = (BD.model() || {}).edgeYards || [];
      const edges = ey.filter(e => e.abuts === 'street' || e.abuts === 'alley').map(e => { const a = E.at(e.ax, e.ay, e.bx, e.by); return { kind: e.kind, abuts: e.abuts, len: Math.round(e.len * 10) / 10, name: a ? a.name : null, votes: a ? a.votes : null }; });
      return { addr: s.a && s.a[0], R, ownSegs: E.ownSegs, near, edges }; }, R);
    res[key].errors = errs; console.log(key, JSON.stringify(res[key].near), JSON.stringify(res[key].edges)); await p.close();
  }
  fs.writeFileSync(out, JSON.stringify(res, null, 1)); await b.close();
})();
