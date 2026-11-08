// probe (read-only): the tool's noise check on 339 1st Ave E, and the level its own formula gives at the nearest point of 375 1st Ave E (CD-1 (402), quiet zone),
// which the check leaves out because its only building outline is flagged 'not found in LiDAR 2022' (f = 3)
const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForSelector('#f1'); await p.waitForTimeout(2500);
  await p.evaluate(() => BD.f1.viewer('Engineering')); await p.waitForTimeout(6000);
  const r = await p.evaluate(async () => { await BD.f1cards.arch(); const m = BD.model(), nc = m.noise;
    let par = null; for (const k in BD.S.tiles) { if (!k.startsWith('van:')) continue; for (const q of BD.S.tiles[k].par) if (q.id == '63819495') par = q; }
    const ringD = (x, y, r) => { let d = 1e9; for (let i = 0; i < r.length; i += 2) { const j = (i + 2) % r.length, ax = r[i], ay = r[i + 1], dx = r[j] - ax, dy = r[j + 1] - ay, L2 = dx * dx + dy * dy; let t = L2 ? ((x - ax) * dx + (y - ay) * dy) / L2 : 0; t = Math.max(0, Math.min(1, t)); d = Math.min(d, Math.hypot(x - ax - t * dx, y - ay - t * dy)); } return d; };
    const R = BD.eng.R, LU = R.lwUnit, rm = BD.eng.NMIT.room.dB; const G = (nc.groups || []).map(g => Object.assign({}, g, { c: nc.src, room: g.kind === 'indoors' ? rm : 0 }));
    const at = (rho, room) => { let e = 0; for (const g of G) { const d = Math.max(5, ringD(g.c[0], g.c[1], par.r)); e += Math.pow(10, (LU[rho] + 10 * Math.log10(g.n) - 20 * Math.log10(d) - 8 - (room ? (g.room || 0) : 0)) / 10); } return 10 * Math.log10(e); };
    return { groups: G.map(g => ({ kind: g.kind, n: g.n, room: g.room, d375: +ringD(g.c[0], g.c[1], par.r).toFixed(1) })), LU, mit: nc.mit && (nc.mit.short || nc.mit.id), worst: nc.worst && { lo: nc.worst.lo, hi: nc.worst.hi, d: nc.worst.d, L: nc.worst.r && nc.worst.r.L, addr: nc.worst.r && nc.worst.r.addr },
      at375_noRoom: [at(0, false), at(1, false)].map(v => +v.toFixed(1)), at375_withRoom: [at(0, true), at(1, true)].map(v => +v.toFixed(1)), req: nc.req }; });
  console.log(JSON.stringify(r, null, 1)); await b.close(); })();
