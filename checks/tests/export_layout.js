// Layout export (7 Nov 2026, J.B.): the tool's Architecture layout of one lot as JSON, so Cowork's boards draw from the tool, not a hand mockup.
// Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node export_layout.js <lotKey> <out.json> [picks=refuge,warming_shelter,clinic]
// Coordinates: metres in the lot frame (u along the lot's long axis, v across; F.toW turns them into map coordinates). Rectangles are [u0,u1,v0,v1].
// Walls, doors, stairs, lifts, exits and corridors come from tool/plan.js (rule sheet v0, 7 Nov 2026): drawing choices are named in plan.rules.
// Edmonton lot outlines are Altalis data: export Vancouver lots only into the repo.
const fs = require('fs'), path = require('path');
const NM = (process.env.NODE_PATH || '').split(path.delimiter)[0];
const { chromium } = require('playwright');
const LOTS = {
  V339: { lab: '339 1st Ave E', sub: 'I-3', sel: { city: 'van', tile: '1_1', id: '63819485' }, ans: { built: 'new', extent: 'whole', floor: '' } },
  CLARK: { lab: '1425 Clark Dr', sub: 'I-2', sel: { city: 'van', tile: '2_1', id: '23060741' }, ans: { built: 'new', extent: 'whole', floor: '' } },
};
(async () => {
  const key = process.argv[2] || 'V339', out = process.argv[3] || key + '.json', picks = (process.argv[4] || 'refuge,warming_shelter,clinic').split(',');
  if (!LOTS[key]) throw new Error('unknown lot ' + key);
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl'] }); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  const local = (re, file, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, file)), contentType: type }));
  await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript'); await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
  await local(/jspdf\.umd/, 'jspdf/dist/jspdf.umd.min.js', 'application/javascript'); await local(/autotable/, 'jspdf-autotable/dist/jspdf.plugin.autotable.min.js', 'application/javascript');
  await p.route(/flow\.js/, async r => { const res = await r.fetch(); let t = await res.text(); t = t.replace('const EXAMPLES=[', 'const EXAMPLES=window.__EX=[').replace('async function runExample(i){', 'window.__run=runExample; async function runExample(i){'); r.fulfill({ response: res, body: t }); });
  await p.route(/fonts\.(googleapis|gstatic)|d3/, r => r.abort()); await p.addInitScript(() => { try { localStorage.setItem('bd-tier', 'arch'); } catch (e) {} });
  await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForTimeout(7000);
  await p.evaluate(x => { window.__EX.push(x); const w = document.getElementById('welcome'); if (w) w.remove(); window.__run(window.__EX.length - 1); }, LOTS[key]); await p.waitForTimeout(9000);
  const r = await p.evaluate(async (picks) => {
    await BD.arch.ready; BD.flow.to('arat'); await new Promise(r => setTimeout(r, 1500)); /* Ratios at its own defaults (no split forced) */
    BD.flow.to('aprog'); await new Promise(r => setTimeout(r, 800)); BD.modelReset(); picks.forEach(id => BD.archTest.add(id)); const rf = BD.arch.picks.find(q => q.id === 'refuge'); if (rf) rf.opt = 'side_by_side';
    BD.flow.to('aarr'); await new Promise(r => setTimeout(r, 2500));
    const P = BD.archTest.place(), R = BD.archTest.rules(P), M = BD.model(), F = M.F, rd = x => Math.round(x * 100) / 100;
    const lb = ring => { let a = 1e9, b = -1e9, c = 1e9, d = -1e9; for (let i = 0; i < ring.length; i += 2) { const [u, v] = F.toL(ring[i], ring[i + 1]); a = Math.min(a, u); b = Math.max(b, u); c = Math.min(c, v); d = Math.max(d, v); } return [a, b, c, d].map(rd); };
    const poly = ring => { const o = []; for (let i = 0; i < ring.length; i += 2) o.push(F.toL(ring[i], ring[i + 1]).map(rd)); return o; };
    const RT = P.ratio, An = BD.S.answers, mw = RT && RT.mwTest ? RT.mwTest : An.mw, s = P.s, nf = Math.max(1, (P.hall.storeys || s.floors) - (P.hall.base > 0 ? 1 : 0)), fh = P.hall.h / nf, g = s.Z && s.Z.ground && P.hall.base === 0 && nf > 1 ? 1 : 0;
    const LI = M.loadInside, TK = M.plant && M.plant.truck, PL = BD.plan ? BD.plan.build(P) : null;
    const e = BD.eng, f = e.siteFacts(), dR = await e.loadRecv(f.city), nets = e.netsAt(f, dR).map(n => ({ name: n.n, inside: n.inside, edge_m: Math.round(n.edge), kind: n.kind, src: n.src }));
    const L = BD.dcRooms.layout({ F, u: P.hall.u, v: P.hall.v, z0: P.hall.base + g * fh, fh: Array(nf - g).fill(fh), mw, end: RT && RT.r && RT.r.end === 'high' ? 'lo' : 'hi', ground: g * fh, dock: LI && P.hall.base === 0 ? { n: LI.n, len: LI.len, wid: LI.wid, rearHi: s.dir < 0, v: TK && TK.type === 'straight' ? TK.v : null } : null });
    return {
      lot: { key: BD.S.sel.id, city: M.city, zone: M.Z && M.Z.zone, area_m2: rd(M.lotArea), outline: poly(M.ring), frame: { L: rd(F.L), W: rd(F.W), front: s.dir < 0 ? 'low u' : 'high u', uFront: rd(s.uf) }, yardLine: M.yardRect ? lb(M.yardRect) : null, buildable: M.inset ? poly(BD.buildArea(M)) : null,
        edges: (M.edgeYards || []).map(e => ({ kind: e.kind, abuts: e.abuts, len: rd(e.len || 0), yard: e.d })) },
      size: { mw, dcShare: RT && RT.r ? RT.r.dc : null, dcFloor_m2: RT ? rd(RT.dcM2) : null, storeys: s.floors, hallStoreys: P.hall.storeys, ground_m: s.ftf && s.ftf.ground },
      dataCentre: (L ? L.pieces : []).map(q => ({ id: q.id, name: q.name, level: q.level, base_m: rd(q.base), h_m: rd(q.h), m2: rd(q.m2), rect: q.r ? q.r.map(rd) : null, outline: q.r ? null : poly(q.ring) })),
      programs: P.boxes.map(x => ({ id: x.id, name: x.p.name, m2: Math.round(x.q.m2 || 0), storeys: x.storeys, base_m: rd(x.base), h_m: rd(x.h), rect: [x.u[0], x.u[1], x.v[0], x.v[1]].map(rd), streetFront: !!x.front, underHall: !!x.underHall })),
      notDrawn: P.notDrawn || [],
      plant: (M.plant && M.plant.boxes || []).map(x => ({ name: x.name, where: x.kind, rect: lb(x.ring), clear: x.clear ? lb(x.clear) : null, base_m: rd(x.base || 0), h_m: rd(x.h || 0) })),
      plantYard: M.plant && M.plant.yard ? lb(M.plant.yard) : null, truckRoute: TK ? { type: TK.type, rect: M.plant.truckRing ? lb(M.plant.truckRing) : null } : null,
      sideDrive: M.sideDrive ? { width_m: M.sideDrive.w, inSideYard_m: rd(M.sideDrive.inYard), narrowed_m: rd(M.sideDrive.narrow), rect: lb(M.sideDrive.ring) } : null,
      dock: L && L.dock ? { bays: L.dock.n, m2: rd(L.dock.m2All || L.dock.m2), rect: L.dock.r.map(rd) } : null,
      loading: M.loadingNeed ? { bays: M.loadingNeed.n, basis: M.loadingNeed.basis } : null,
      rules: R.map(x => ({ sev: x.sev, text: x.t, src: x.src || [] })),
      plan: PL,
      heatNetworks: { nets, note: 'From the trace in the tool of By-law 9552 Schedule A (register van9552, neuTraced; ±45 m). vanNEU2025 (the utility web page) gives no boundary. Inside the area, connection is compulsory for new buildings (By-law 9552 s. 2.1, condition r_de_compulsory).' },
      notYet: 'Rule sheet v0.1: no bands, no fallback ladder, no shared lobby (its size has no code source); exit separation measured straight between doors (plan.exitSep), path-based checks 8 and 9 not yet (WORKLIST 5).'
    };
  }, picks);
  r.made = { date: new Date().toISOString().slice(0, 10), by: 'checks/tests/export_layout.js', picks, pageErrors: errs };
  fs.writeFileSync(out, JSON.stringify(r, null, 1)); console.log('wrote', out, 'page errors', errs.length); await b.close();
})().catch(e => { console.error(e); process.exit(1); });
