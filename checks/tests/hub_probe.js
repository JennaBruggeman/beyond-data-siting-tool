// Probe: the Architecture state the F1 cards read (BD.f1cards.arch) on an example lot, dumped as JSON (site model essentials, placement, hub plan).
// Usage (tool on :8766): NODE_PATH=<node_modules> node hub_probe.js <van|edm> <out.json>   Edmonton output holds Altalis lot lines: keep it out of git.
const fs = require('fs'); const { chromium } = require('playwright');
(async () => { const [city, out] = process.argv.slice(2); const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForSelector('#f1'); await p.waitForTimeout(2500);
  await p.evaluate(() => BD.f1.viewer('architecture')); await p.waitForTimeout(3000);
  if (city === 'edm') { await p.click('#f1v [data-city="edm"]'); await p.waitForTimeout(5000); }
  const r = await p.evaluate(async () => { const P = await BD.f1cards.arch(); const M = P.s.M, F = M.F, rd = x => Math.round(x * 100) / 100;
    const poly = ring => { const o = []; for (let i = 0; i < ring.length; i += 2) o.push(F.toL(ring[i], ring[i + 1]).map(rd)); return o; };
    const lb = ring => { const q = poly(ring); return [Math.min(...q.map(x => x[0])), Math.max(...q.map(x => x[0])), Math.min(...q.map(x => x[1])), Math.max(...q.map(x => x[1]))]; };
    const DP = BD.archTest.dcPieces(P);
    let H = null, herr = null, site = null; try { site = BD.hub ? BD.hub.siteOf(P) : null; H = BD.hub ? BD.hub.build(P) : null; if (H && H.hub) { delete H.hub.toUV; } } catch (e) { herr = String(e.stack || e); }
    return { sel: BD.S.sel && { id: BD.S.sel.id, city: BD.S.sel.city, a: BD.S.sel.a }, zone: M.Z && M.Z.zone, Zkeys: Object.keys(M.Z || {}), Z: M.Z, dir: P.s.dir, uf: P.s.uf, a0: P.s.a0, v: M.v, uBuild: M.uBuild, H: M.H, ftf: P.s.ftf, floors: P.s.floors, lotArea: M.lotArea,
      ring: poly(M.ring), yardRect: M.yardRect ? lb(M.yardRect) : null, buildable: M.inset && BD.buildArea ? poly(BD.buildArea(M)) : null,
      edges: (M.edgeYards || []).map(e => ({ kind: e.kind, abuts: e.abuts, d: e.d, a: F.toL(e.ax, e.ay).map(rd), b: F.toL(e.bx, e.by).map(rd) })),
      grade: M.grade, mwSized: M.mwSized, ratio: P.ratio && { mwTest: P.ratio.mwTest, dcM2: P.ratio.dcM2, r: P.ratio.r }, hall: P.hall, boxes: P.boxes.map(x => ({ id: x.id, u: x.u, v: x.v, base: x.base, h: x.h, storeys: x.storeys, m2: x.q.m2, front: x.front })),
      plant: (M.plant && M.plant.boxes || []).map(x => ({ name: x.name, kind: x.kind, r: lb(x.ring) })), plantKeys: Object.keys(M.plant || {}), genTank: M.plant && M.plant.genTank, truck: M.plant && M.plant.truck,
      loadingNeed: M.loadingNeed, loadInside: M.loadInside, sideDrive: M.sideDrive ? { w: M.sideDrive.w, inYard: M.sideDrive.inYard, r: lb(M.sideDrive.ring) } : null,
      dc: DP ? DP.L.pieces.map(q => ({ id: q.id, name: q.name, base: q.base, h: q.h, m2: rd(q.m2), r: q.r })) : null, dcRooms: DP ? DP.L.rooms : null, Mkeys: Object.keys(M), site, hub: H, herr }; });
  r.errs = errs; fs.writeFileSync(out, JSON.stringify(r, (k, v) => (v instanceof Float64Array ? '[ring]' : v), 1)); console.log('wrote', out, 'errors', errs.length, errs.slice(0, 3).join(' | ')); await b.close(); })();
