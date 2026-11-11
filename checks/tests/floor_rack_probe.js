// probe (11 Nov 2026, read-only): 339 1st Ave E, the floor test (site.js roomWhy) against the rack layout check (scene3d layoutCheck):
// footprint, storeys, the floor each counts, racks per floor, m² per rack and m² per MW each implies. Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node floor_rack_probe.js
const fs = require('fs'), path = require('path'); const NM = (process.env.NODE_PATH || '').split(path.delimiter)[0]; const { chromium } = require('playwright');
(async () => { const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl'] }); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); p.on('pageerror', e => console.log('ERR', e.message));
  const local = (re, f, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, f)), contentType: type }));
  await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript'); await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
  const G = JSON.parse(fs.readFileSync(path.join(__dirname, '../golden/V339.json'), 'utf8'));
  await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForSelector('#f1'); await p.waitForTimeout(2500);
  await p.evaluate(() => BD.f1.viewer('engineering')); await p.waitForTimeout(5000);
  const r = await p.evaluate(async (ans) => { Object.assign(BD.S.answers, ans); await BD.f1cards.eng(); if (BD.scene3d.ensure) await BD.scene3d.ensure();
    const A = BD.S.answers, out = { mwAnswer: A.mw, kwRack: BD.eng.R.equip.kwRack, layout: BD.eng.R.layout };
    const one = mw => { A.mw = mw; BD.modelReset(); const M = BD.model(); return { mw, footArea: Math.round(BD.area(M.foot)), footAreaM: Math.round(M.footArea), nF: M.nF, ground: !!(M.Z && M.Z.ground), sizedTo: M.sizedTo || null, H: M.H }; };
    out.fit = BD.fitMax(); out.why = BD.fitWhy && BD.fitWhy(); out.at = [one(out.fit), one(2.6), one(4.0)];
    const perHi = BD.data.dc_rooms.rooms.filter(x => x.split && x.perMW).reduce((t, x) => t + x.perMW[1], 0), perLo = BD.data.dc_rooms.rooms.filter(x => x.split && x.perMW).reduce((t, x) => t + x.perMW[0], 0), L = BD.eng.R.layout, keepRF = L.rackFloor;
    out.perMW = [perLo, perHi]; out.bySize = [];
    for (const mw of [2.5, 2.6, 3.0, 3.5, 4.0]) { A.mw = mw; BD.modelReset(); const M = BD.model(), up = M.Z && M.Z.ground ? M.nF[0] - 1 : M.nF[0], fl = BD.area(M.foot) * up, P = M.plant || {};
      const row = { mw, yard: P.genYard && P.genYard.depth || P.bigYard || null, foot: Math.round(BD.area(M.foot)), upFloor: Math.round(fl), floorTestMW: [+(fl / perHi).toFixed(2), +(fl / perLo).toFixed(2)], racksNeeded: BD.eng.equip(mw, A).racks };
      for (const rf of [2.32, 2.9, 3.4, 4.0]) { L.rackFloor = rf; A.mw = mw; BD.modelReset(); const lc = BD.scene3d.layoutCheck(); row['layout_rf' + rf] = lc ? { racks: lc.racks, mw: lc.mw.map(x => +x.toFixed(2)), gross_m2_per_rack: +(fl / lc.racks).toFixed(2) } : null; }
      L.rackFloor = keepRF; out.bySize.push(row); }
    A.mw = out.fit; BD.modelReset(); out.lc = BD.scene3d.layoutCheck(); const st = BD.scene3d.state(); out.rooms = st.rooms ? { floors: st.rooms.floors, otherFloor: st.rooms.otherFloor, maxRacks: st.rooms.maxRacks, need: st.rooms.need, got: st.rooms.got } : null;
    out.elec = st.elecRoom ? Math.round(BD.area(st.elecRoom)) : null; out.equip = BD.eng.equip(out.lc ? out.lc.mw[0] : 3.6, A);
    return out; }, G.answers);
  console.log(JSON.stringify(r, null, 1)); await b.close(); })();
