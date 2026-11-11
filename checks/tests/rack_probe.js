// probe (d), 11 Nov 2026, read-only: racks from the tool's own rack-layout check (scene3d layoutCheck) on the Vancouver example lot (339 1st Ave E),
// with the Schneider 2.32 m² per rack row thinning (as the tool runs) and without it (rows packed: rack + aisle only, cooling units, UPS room and corridors as drawn).
// Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node rack_probe.js
const fs = require('fs'), path = require('path'); const NM = (process.env.NODE_PATH || '').split(path.delimiter)[0];
const { chromium } = require('playwright');
(async () => { const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl'] }); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  p.on('pageerror', e => console.log('ERR', e.message));
  const local = (re, f, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, f)), contentType: type }));
  await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript'); await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
  const G = JSON.parse(fs.readFileSync(path.join(__dirname, '../golden/V339.json'), 'utf8'));
  await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForSelector('#f1'); await p.waitForTimeout(2500);
  await p.evaluate(() => BD.f1.viewer('engineering')); await p.waitForTimeout(5000);
  const r = await p.evaluate(async (ans) => { Object.assign(BD.S.answers, ans); const C = BD.f1cards; await C.eng();
    if (BD.scene3d.ensure) await BD.scene3d.ensure();
    const M = BD.model(), L = BD.eng.R.layout, keep = L.rackFloor, out = { mwPicked: BD.S.answers.mw, foot: Math.round(M.footArea), nF: M.nF, H: M.H, kwRack: BD.eng.R.equip.kwRack, rackFloor: keep, layout: Object.assign({}, L) };
    out.dbg = { existing: !!M.existing, kit: !!(BD.kit && BD.kit.make), T: !!window.THREE, fitMax: BD.fitMax ? BD.fitMax() : null, built: BD.S.answers.built };
    out.withThinning = BD.scene3d.layoutCheck(); L.rackFloor = 0; out.packed = BD.scene3d.layoutCheck(); L.rackFloor = keep;
    const st = BD.scene3d.state(); out.rooms = st.rooms ? { floors: st.rooms.floors } : null; return out; }, G.answers);
  console.log(JSON.stringify(r, null, 1)); await b.close(); })();
