// The tool against freeze EH-FREEZE-2026-11-11i (13 Nov 2026; boards eh/ic45) on the 14 board lots (10220 104 Ave NW left out of the milestone tests, J.B. 12 and 13 Nov) (J.B. 12 Nov 2026): opens each lot, builds the hub (tool/hub.js) and compares
// MW, data-centre m² and the stopping rule with the freeze's per-board table, and says whether the frozen board was read (tool/data/hub_frozen_<city>.json).
// Edmonton lots read their board only where the git-ignored hub_frozen_edm.json is present; otherwise the engine runs ("rule pending").
// ENGINE=1: the 13-board rebuild test (J.B. 12 Nov, option 2): the hub engine alone (BD.hubEngineOnly), not the frozen boards, against the same table.
// Usage (from checks/tests/, tool on :8766): [ENGINE=1] NODE_PATH=<node_modules> node hub_frozen_check.js <out.json> [key ...]
const fs = require('fs'), path = require('path');
const NM = (process.env.NODE_PATH || '').split(path.delimiter)[0];
const { chromium } = require('playwright');
const LOTS = {   /* lot selection as checks/tests/hub_match.js; freeze 11g per-board table */
  V339: { lab: '339 1st Ave E', sel: { city: 'van', tile: '1_1', id: '63819485' }, f: [1.98, 2324.5, 'floor cap'] },   /* 11i */
  V1330: { lab: '1330 Glen Dr', sel: { city: 'van', tile: '1_1', id: '22260652' }, f: [0.41, 1140, 'not grown: upper floors over the truck drive (frozen failing)'] },
  V8238: { lab: '8238 Fraser St', sel: { city: 'van', tile: '1_-3', id: '21083038' }, f: [0.94, 1688, 'not grown: roof holds only two chillers'] },
  V1353: { lab: '1353 Pender St E', sel: { city: 'van', tile: '2_2', id: '59223039' }, f: [1.82, 2325, 'floor cap'] },
  V8980: { lab: '8980 Oak St', sel: { city: 'van', tile: '-1_-4', id: '14984188' }, f: [1.55, 1988.6, 'plant yard'] },   /* 11i */
  V1360: { lab: '1360 Frances St', sel: { city: 'van', tile: '2_2', id: '59423054' }, f: [0.37, 1104, 'not grown: only room left is over transformer alcove 2'] },
  E06B: { lab: '64 Airport Rd NW', sel: { city: 'edm', tile: '-1_1', id: '146402' }, f: [1.89, 1798, 'drawn plant (roof chillers)'] },
  E4103: { lab: '4103 97 St NW', sel: { city: 'edm', tile: '0_-3', id: '904935' }, f: [1.89, 1798, 'plant yard'] },
  E14715: { lab: '14715 Yellowhead Trail NW', sel: { city: 'edm', tile: '-2_1', id: '150388' }, f: [1.89, 1798, 'drawn plant (roof chillers)'] },
  E10003: { lab: '10003 63 Avenue NW', sel: { city: 'edm', tile: '0_-2', id: '701026' }, f: [1.82, 1752, 'plant yard'] },
  E10004: { lab: '10004 167 Street NW', sel: { city: 'edm', tile: '-3_-1', id: '16765' }, f: [0.31, 805, 'not grown: only room left holds a roof chiller'] },
  E15231: { lab: '15231 118 Avenue NW', sel: { city: 'edm', tile: '-3_1', id: '149677' }, f: [1.20, 1367, 'plant yard, then travel distance'] },
  E16075: { lab: '16075 Fort Road NW', sel: { city: 'edm', tile: '3_3', id: '980987' }, f: [0.95, 1179, 'plant yard'] },
  V1425: { lab: '1425 Clark Dr', sel: { city: 'van', tile: '2_1', id: '23060741' }, f: [1.82, 2325, 'floor cap'] },   /* EH-FREEZE-2026-11-11h */
};
const new_ = { built: 'new', extent: 'whole', floor: '' };
/* J.B. 13 Nov 2026: boards whose size was drawn, not grown by the hub's step-back (no grown.json, or grown 0 m), are being grown in freeze 11i.
   In the rebuild tests (ENGINE=1, LOO=1) they show as "drawn, awaiting 11i" and are not counted. V8980 grew 11.7 m but J.B. listed it (the hub may re-grow it). */
const DRAWN = {};   /* 13 Nov 2026: 11i landed (Claude Link eh/ic45), every board counts; the 'drawn, awaiting 11i' marking is kept for the next re-freeze */
const REBUILD = !!(process.env.ENGINE || process.env.LOO);
(async () => {
  const out = process.argv[2] || 'hub_frozen_check.json', keys = process.argv.slice(3).length ? process.argv.slice(3) : Object.keys(LOTS);
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl'] }), res = {}; let pass = 0, counted = 0;
  for (const key of keys) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } }), errs = []; p.on('pageerror', e => errs.push(e.message));
    const local = (re, file, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, file)), contentType: type }));
    await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript');
    await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
    await p.route(/flow\.js/, async r => { const rs = await r.fetch(); let t = await rs.text();
      t = t.replace('const EXAMPLES=[', 'const EXAMPLES=window.__EX=[').replace('async function runExample(i){', 'window.__run=runExample; async function runExample(i){'); r.fulfill({ response: rs, body: t }); });
    await p.route(/fonts\.(googleapis|gstatic)|d3/, r => r.abort());
    await p.addInitScript(() => { try { localStorage.setItem('bd-tier', 'arch'); } catch (e) {} });
    await p.goto('http://localhost:8766/index.html?nointro&x=' + Date.now()); await p.waitForTimeout(6000);
    const L = LOTS[key];
    await p.evaluate(x => { window.__EX.push(x); const w = document.getElementById('welcome'); if (w) w.remove(); window.__run(window.__EX.length - 1); }, { lab: L.lab, sub: '', sel: L.sel, ans: new_ });
    await p.waitForTimeout(9000);
    if (process.env.ENGINE || process.env.LOO) await p.evaluate(l => { BD.hubEngineOnly = true; if (l) BD.hubLeaveOut = true; }, !!process.env.LOO);
    if (process.env.NOTP) await p.evaluate(() => { BD.hub.RULES.transplant = false; });   /* NOTP=1 (with ENGINE=1): the engine's own layouts only, no placed plans */   /* LOO=1: leave-one-out, each lot borrows from the most similar other board */
    const r = await p.evaluate(async () => { try { if (BD.arch) BD.arch.typology = 'emergency_hub'; const P = await BD.f1cards.arch(); const H = BD.hub.build(P), h = (H && H.hub) || {};
      return { frozen: h.frozen || null, borrowed: h.transplant ? h.transplant.addr : null, MW: h.doesntFit ? null : h.MW, dc: h.dcArea, stop: h.sizeStop ? h.sizeStop.rule : null, doesntFit: h.doesntFit ? h.doesntFit.limiting.slice(-1)[0] : null, rows: ((h.v2 || {}).rows || []).length,
        reach: h.treach ? (h.treach.reach || []).length : null, travel: (h.travel || []).map(t => `${t.zone} ${t.worst} ${t.status}`), height: h.grades && h.grades.height, plantUp: BD.hub.plantUpWhy ? BD.hub.plantUpWhy() : null, layout: h.plantUp ? 'plant up' : h.narrow ? 'narrow' : null }; } catch (e) { return { err: String(e.stack || e) }; } });
    const f = L.f, failing = /frozen failing/.test(f[2]), ok = failing ? !!r.doesntFit : (r.MW != null && Math.abs(r.MW - f[0]) < 0.005 && Math.abs((r.dc || 0) - f[1]) < 1 && r.stop === f[2]);   /* a board the freeze keeps failing: the doesn't-fit state */
    const drawn = REBUILD && DRAWN[key]; r.freeze = f; r.match = ok; r.drawn = drawn || null; r.errors = errs; res[key] = r; if (!drawn) { counted++; if (ok) pass++; }
    console.log(key.padEnd(7), drawn ? 'drawn, awaiting 11i (' + drawn + '; ' + (ok ? 'match' : 'differs') + ')' : ok ? 'MATCH' : 'differ', '| freeze', f[0], f[1], f[2], '| tool', r.MW == null ? '-' : (+r.MW).toFixed(2), r.dc == null ? '-' : Math.round(r.dc), r.stop || r.doesntFit || r.err || '', r.borrowed ? '| borrowed from ' + r.borrowed : r.frozen ? '| frozen board' : '| engine', errs.length ? '| page errors ' + errs.length : '');
    await p.close(); }
  console.log(REBUILD ? `${pass} / ${counted} match the freeze (${keys.length - counted} drawn, awaiting 11i, not counted)` : `${pass} / ${keys.length} match the freeze`); fs.writeFileSync(out, JSON.stringify(res, null, 1)); await b.close(); })();
