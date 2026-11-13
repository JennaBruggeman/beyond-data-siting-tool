/* Beyond Data — layout (c), the hall grown into the plant yard (J.B. 13 Nov 2026): the hub's step-back for at-grade fits (Claude Link eh/stepback.py,
   EH-FREEZE-2026-11-11g, the BUILD path) in JS, so the tool can grow a placed at-grade plan on its own lot. A fit is given at growth 0 and growth 1
   (every coordinate the growth moves shifts by exactly d: checked at d = 1 and 2 when the fit is exported), with its limit (DMAX, LIMIT), its floor
   (MW_FLOOR), its exit zones and the hub load. Rule (J.B. 12 Nov): the data centre grows to the 2,325 m² floor cap (hall at 630 m²/MW) or the fit's
   limit, whichever comes first; where the fit fails at a size the hall comes back 0.05 MW at a time. At each size: exit spacing per zone (door to door
   against the larger of half the zone's diagonal and 9 m; VBBL 3.4.2.3); the plant sized to the load (hubchecks: data-centre sets, pads, the hub set,
   chillers ceil(Q / 1.489) + 1) and packed in the plant yard (tool/plantfit.js, the hand units kept first, then every order of the four kinds); every
   yard door keeps its 1.1 m route to the gate (hubchecks.yardgate); travel at most 45 m (VBBL/NBC 3.4.2.5; the boards' own travel rule, ported).
   Nothing below the fit as drawn (MW_FLOOR): if no size at or above it fits, the fit as drawn stands. Checked against the hub's own step lists
   (checks/tests/growyard_port_test.js). */
(function (root) {
'use strict';
const CAP = 2325.0, HPM = 630.0, STEP = 0.05, KINDS = ['gen', 'pad', 'hub', 'chill'];
const HX = () => (root && root.BD && root.BD.hubchecks) || (typeof require !== 'undefined' ? require('./hubchecks.js') : null);
const PF = () => (root && root.BD && root.BD.plantfit) || (typeof require !== 'undefined' ? require('./plantfit.js') : null);
const ra = r => (r[1] - r[0]) * (r[3] - r[2]), sum = a => a.reduce((s, x) => s + x, 0);
const pyRound = (x, n) => { const f = Math.pow(10, n); return Math.round(x * f) / f; };
/* every order of the four kinds, as itertools.permutations */
const PERMS = (function perm(a) { if (a.length <= 1) return [a.slice()]; const out = []; a.forEach((x, i) => perm(a.slice(0, i).concat(a.slice(i + 1))).forEach(p => out.push([x].concat(p)))); return out; })(KINDS);
/* the fit at growth d: g0 + d (g1 - g0), number by number */
function lerp(a, b, d) { if (typeof a === 'number') return Math.round((a + d * (b - a)) * 1e4) / 1e4; if (Array.isArray(a)) return a.map((x, i) => lerp(x, b[i], d)); if (a && typeof a === 'object') { const o = {}; for (const k of Object.keys(a)) o[k] = lerp(a[k], b[k], d); return o; } return a; }
function geomAtRaw(F, d) { const G = lerp(F.base, F.g1, d); G.S = Object.fromEntries(Object.entries(G.S).map(([k, v]) => [+k, v])); return G; }
const hallArea = G => sum(Object.values(G.S).flat().filter(x => x.g === 'hall').map(x => sum(x.r.map(ra))));
const dcArea = G => sum(Object.entries(G.S).flatMap(([st, xs]) => xs.filter(x => x.g === 'hall' || x.g === 'sup' || (x.g === 'spare' && +st > 1))).map(x => sum(x.r.map(ra))));
function exits(G, zones) {
  return zones.map(([name, st, ids, [e1, e2]]) => {
    const door = (a, b) => { const d = G.D.find(d => d[0] === st && ((d[1] === a && d[2] === b) || (d[1] === b && d[2] === a))); return [d[3], d[4]]; };
    const pts = []; G.S[st].filter(x => ids.includes(x.id)).forEach(x => x.r.forEach(r => { for (const u of [r[0], r[1]]) for (const v of [r[2], r[3]]) pts.push([u, v]); }));
    let mx = 0; for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) mx = Math.max(mx, Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]));
    const p = door(...e1), q = door(...e2), dd = Math.hypot(p[0] - q[0], p[1] - q[1]), need = Math.max(mx / 2, 9.0);
    return { zone: name, apart: pyRound(dd, 2), need: pyRound(need, 2), ok: dd >= need - 1e-9 }; });
}
const kindOf = p => p.id.startsWith('h') ? 'hub' : /enerator/.test(p.n) ? 'gen' : ({ t: 'pad', c: 'chill' })[p.id[0]] || null;
function drawn(G) {
  const dg = G.PLANT.filter(p => /enerator/.test(p.n) && !p.id.startsWith('h')), kw = new Set(dg.map(p => { const m = /([\d,]+) kW/.exec(p.n); return m ? +m[1].replace(/,/g, '') : 1000; }));
  const tp = G.PLANT.filter(p => p.id.startsWith('t')), kva = new Set(tp.map(p => { const m = /([\d,]+) kVA/.exec(p.n); return m ? +m[1].replace(/,/g, '') : 2500; }));
  const nc = G.PLANT.filter(p => p.id.startsWith('c')).length + (G.CHILL || []).length;
  return [dg.length, kw.size === 1 ? [...kw][0] : null, tp.length, kva.size === 1 ? [...kva][0] : null, nc];
}
/* building rects for the packer, a 1.2 × 1.2 m landing outside every exterior door at grade, the declared yard walks (stepback._bld) */
function bld(G) {
  const rs = Object.values(G.S).flat().flatMap(x => x.r).concat(G.YARD_WALK || []), s1 = G.S[1].flatMap(x => x.r);
  const inside = q => s1.some(r => Math.min(q[1], r[1]) - Math.max(q[0], r[0]) > 0.01 && Math.min(q[3], r[3]) - Math.max(q[2], r[2]) > 0.01);
  for (const d of G.D) { if (d[0] !== 1 || (d[1] !== 'OUT' && d[2] !== 'OUT')) continue; const [u, v, o] = [d[3], d[4], d[5]];
    const c = o === 'v' ? [[u, u + 1.2, v - 0.6, v + 0.6], [u - 1.2, u, v - 0.6, v + 0.6]] : [[u - 0.6, u + 0.6, v, v + 1.2], [u - 0.6, u + 0.6, v - 1.2, v]]; c.forEach(q => { if (!inside(q)) rs.push(q); }); }
  return rs;
}
const asPlant = (items, gkw) => { const pre = { gen: 'g', pad: 't', hub: 'h', chill: 'c' }, nm = { gen: `Generator, ${(gkw || 1000).toLocaleString('en-US')} kW`, pad: 'Transformer pad', hub: 'Hub generator', chill: 'Chiller (at grade)' }, cnt = {};
  return items.slice().sort((a, b) => KINDS.indexOf(a.kind) - KINDS.indexOf(b.kind)).map(it => { cnt[it.kind] = (cnt[it.kind] || 0) + 1; return { id: pre[it.kind] + cnt[it.kind], n: nm[it.kind], r: it.r }; }); };
const pyNum = x => Number.isInteger(x) ? x.toFixed(1) : String(x);
function routeWhy(G, plantList, cache) {
  if (!(G.PLANT_YARDS || []).length) return null;
  const k = JSON.stringify(plantList.map(p => p.r.map(v => pyRound(v, 3))).sort());
  if (cache.has(k)) return cache.get(k);
  const old = G.PLANT; G.PLANT = plantList; let yg; try { yg = HX().yardgate(G); } finally { G.PLANT = old; }
  let why = null;
  for (const [key, lab] of [['doors', 'door'], ['gates', 'gate']]) { for (const x of yg[key]) if (x.status === 'fail') { const id = x.door ? `('${x.door[0]}', ${pyNum(x.door[1])}, ${pyNum(x.door[2])})` : JSON.stringify(x.gate); why = `yard route from ${lab} ${id}: ${x.why || 'fail'}`; break; } if (why) break; }
  cache.set(k, why); return why;
}
function plant(G, F, MW, hkw, ctx) {
  const H = HX(), P = PF(), Q = MW * 1.55, g = H.gens(Q, 0), t = H.transformers(Q, hkw, F.CITY || 'v'), hs = H.hubSet(hkw);
  const enc = hs.enclosure ? hs.enclosure[0] : hs.footprint, nchill = Math.ceil(Q / 1.489 - 1e-9) + 1;
  const need = { gen: [g.n, g.footprint], pad: [t.n, t.pad], hub: enc ? enc.slice() : null, chill: nchill }, B = bld(G), fill = G.FUEL_FILL || [];
  const base = { gen: g, tx: t, hub: hs, nchill, Q };
  const dg = drawn(G), same = { gen: dg[1] === g.kw, pad: dg[3] === t.kva, chill: true, hub: true };
  const fixed = G.PLANT.filter(p => kindOf(p) && same[kindOf(p)]).map(p => ({ kind: kindOf(p), r: p.r.slice() }));
  const have = Object.fromEntries(KINDS.map(k => [k, fixed.filter(f => f.kind === k).length])), want = { gen: g.n, pad: t.n, hub: need.hub ? 1 : 0, chill: nchill };
  const key = `${MW.toFixed(4)}`;
  if (KINDS.every(k => have[k] <= want[k]) && fixed.length && !ctx.keptFail.has(key)) {
    const need2 = { gen: [want.gen - have.gen, need.gen[1]], pad: [want.pad - have.pad, need.pad[1]], hub: have.hub === 0 ? need.hub : null, chill: want.chill - have.chill };
    for (const perm of PERMS) { const r = P.place(G.PLANT_YARDS, G.LOTPOLY, B, need2, { fill, order: perm, fixed });
      if (r.why == null && routeWhy(G, asPlant(r.items, g.kw), ctx.rw) == null) return Object.assign({ ok: true, order: perm, items: r.items, kept: fixed.length }, base); }
    ctx.keptFail.add(key);
  }
  for (const kd of KINDS) {   /* a kind whose single unit does not fit the empty yard fails every order */
    const one = { gen: [0, need.gen[1]], pad: [0, need.pad[1]], hub: null, chill: 0 };
    if (kd === 'gen' || kd === 'pad') { if (need[kd][0] === 0) continue; one[kd] = [1, need[kd][1]]; } else if (kd === 'hub') { if (!need.hub) continue; one.hub = need.hub; } else { if (!need.chill) continue; one.chill = 1; }
    const r = P.place(G.PLANT_YARDS, G.LOTPOLY, B, one, { fill });
    if (r.why) { const n = kd === 'gen' || kd === 'pad' ? need[kd][0] : kd === 'chill' ? need.chill : 1; return Object.assign({ ok: false, why: r.why.split(' of ')[0] + ` of ${n}` }, base); } }
  let first;
  for (const perm of PERMS) { const r = P.place(G.PLANT_YARDS, G.LOTPOLY, B, need, { fill, order: perm }); let why = r.why;
    if (why == null) { const rw = routeWhy(G, asPlant(r.items, g.kw), ctx.rw); if (rw) why = rw; }
    if (first === undefined) first = why;
    if (why == null) return Object.assign({ ok: true, order: perm, items: r.items }, base); }
  return Object.assign({ ok: false, why: first }, base);
}
/* travel along the path (the boards' travel_part.py): 0.25 m grid, 8-way inside a room, through the doors; worst per room to an exit */
function travel(G, st) {
  const g = 0.25, rooms = G.S[st], cells = new Map(), K = (a, b) => a + ',' + b, idx = new Map(rooms.map((x, i) => [x.id, i])), DW = G.DOOR_W || 0.9;
  rooms.forEach((rm, i) => rm.r.forEach(r => { for (let a = Math.round(r[0] / g); a < Math.round(r[1] / g); a++) for (let b = Math.round(r[2] / g); b < Math.round(r[3] / g); b++) cells.set(K(a, b), i); }));
  const cross = new Map(), sources = [];
  const link = (c1, c2, a, b) => { const k1 = K(...c1), k2 = K(...c2); if (!cells.has(k1) && !cells.has(k2)) return;
    for (const [c, o] of [[k1, k2], [k2, k1]]) { if (!cells.has(c)) continue; const rc = cells.get(c), other = cells.has(o) ? cells.get(o) : null, tgt = other != null ? rooms[other] : null;
      if ((b === 'OUT' && rooms[rc].id === a) || (other == null && b === 'OUT') || (tgt && tgt.stair && rooms[rc].id !== tgt.id)) { if ((rooms[rc].id === a || rooms[rc].id === b) && !rooms[rc].stair) sources.push(c); }
      if (other != null && new Set([rooms[rc].id, rooms[other].id]).size === 2 && [a, b].includes(rooms[rc].id) && [a, b].includes(rooms[other].id)) { if (!cross.has(c)) cross.set(c, []); cross.get(c).push(o); } } };
  for (const dd of G.D) { const [s, a, b, u, v, o] = dd; if (s !== st) continue; const half = (dd.length > 6 && typeof dd[6] === 'number' ? dd[6] : DW) / 2;
    if (o === 'v') { const ia = Math.round(u / g); for (let k = Math.floor((v - half) / g); k < Math.ceil((v + half) / g); k++) link([ia - 1, k], [ia, k], a, b); }
    else { const ib = Math.round(v / g); for (let k = Math.floor((u - half) / g); k < Math.ceil((u + half) / g); k++) link([k, ib - 1], [k, ib], a, b); } }
  const dist = new Map(); const pq = []; const push = (d, c) => { pq.push([d, c]); let i = pq.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (pq[p][0] <= pq[i][0]) break; [pq[p], pq[i]] = [pq[i], pq[p]]; i = p; } };
  const pop = () => { const top = pq[0], last = pq.pop(); if (pq.length) { pq[0] = last; let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < pq.length && pq[l][0] < pq[m][0]) m = l; if (r < pq.length && pq[r][0] < pq[m][0]) m = r; if (m === i) break; [pq[m], pq[i]] = [pq[i], pq[m]]; i = m; } } return top; };
  sources.forEach(c => { dist.set(c, 0); push(0, c); });
  const nb8 = [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, Math.SQRT2], [1, -1, Math.SQRT2], [-1, 1, Math.SQRT2], [-1, -1, Math.SQRT2]];
  while (pq.length) { const [d, c] = pop(); if (d > (dist.has(c) ? dist.get(c) : 1e9)) continue; const ri = cells.get(c); if (rooms[ri].stair || rooms[ri].core) continue;
    const [ca, cb] = c.split(',').map(Number);
    for (const [dx, dy, w] of nb8) { const n = K(ca + dx, cb + dy); if (cells.get(n) !== ri) continue; if (dx && dy && (cells.get(K(ca + dx, cb)) !== ri || cells.get(K(ca, cb + dy)) !== ri)) continue;
      const nd = d + w * g; if (nd < (dist.has(n) ? dist.get(n) : 1e9)) { dist.set(n, nd); push(nd, n); } }
    for (const n of (cross.get(c) || [])) { const rn = rooms[cells.get(n)]; if (rn.stair || rn.core) continue; const nd = d + g; if (nd < (dist.has(n) ? dist.get(n) : 1e9)) { dist.set(n, nd); push(nd, n); } } }
  const out = {};
  for (const [c, ri] of cells) { const rm = rooms[ri]; if (rm.core || rm.g === 'load') continue; const dd = dist.get(c), k = rm.id;
    if (dd === undefined) { if (!(k in out)) out[k] = null; continue; } if (out[k] == null || dd > out[k]) out[k] = dd; }
  return out;
}
const isShaft = x => ['psh', 'sh1', 'sh2', 'ris3'].includes(x.id) || /shaft/.test(x.n.toLowerCase());
/* the lot outline and plant yards on another lot: the yard rectangles clipped to the lot (Sutherland–Hodgman) */
function clipRect(P, r) { let out = P.slice();
  const E = [[p => p[0] >= r[0], (a, b) => [r[0], a[1] + (b[1] - a[1]) * (r[0] - a[0]) / (b[0] - a[0])]], [p => p[0] <= r[1], (a, b) => [r[1], a[1] + (b[1] - a[1]) * (r[1] - a[0]) / (b[0] - a[0])]],
    [p => p[1] >= r[2], (a, b) => [a[0] + (b[0] - a[0]) * (r[2] - a[1]) / (b[1] - a[1]), r[2]]], [p => p[1] <= r[3], (a, b) => [a[0] + (b[0] - a[0]) * (r[3] - a[1]) / (b[1] - a[1]), r[3]]]];
  for (const [inn, cut] of E) { const src = out; out = []; for (let i = 0; i < src.length; i++) { const a = src[i], b = src[(i + 1) % src.length]; if (inn(b)) { if (!inn(a)) out.push(cut(a, b)); out.push(b); } else if (inn(a)) out.push(cut(a, b)); } if (!out.length) break; }
  return out; }
const polyA = P => Math.abs(P.reduce((t, p, i) => t + p[0] * P[(i + 1) % P.length][1] - P[(i + 1) % P.length][0] * p[1], 0)) / 2;
function run(F, opt) {
  opt = opt || {}; const H = HX(), ctx = { rw: new Map(), keptFail: new Set() }, hpm = opt.hpm || HPM;
  const geomAt = (F_, d) => { const G = geomAtRaw(F_, d); if (opt.clip) { G.LOTPOLY = opt.clip; G.PLANT_YARDS = G.PLANT_YARDS.map(Y => Y.length === 4 && typeof Y[0] === 'number' ? clipRect(opt.clip, Y) : Y).filter(P => P.length >= 3 && polyA(P) > 1); } return G; };
  const G0 = geomAt(F, 0), G1 = geomAt(F, 1), baseHall = hallArea(G0), baseDC = dcArea(G0), dc1 = dcArea(G1) - baseDC, h1 = hallArea(G1) - baseHall;
  const dCap = Math.floor((CAP - baseDC) / dc1 * 100) / 100, dLine = Math.min(dCap, F.DMAX), dFor = a => Math.max(0, a / h1);
  const byLine = dLine < dCap - 1e-9 || dcArea(geomAt(F, dLine)) < CAP - 1.0, limit = F.LIMIT || 'building line', dTop = dLine;
  const capMW = hallArea(geomAt(F, dTop)) / hpm, hkw = F.hub_kw, steps = [];
  for (let k = 0; ; k++) {
    const MW = k === 0 ? capMW : pyRound(capMW, 2) - STEP * k;
    if (MW < Math.max(baseHall / hpm, F.MW_FLOOR || 0) - 1e-9) break;
    const d = k === 0 ? dTop : dFor(MW * hpm - baseHall), Gd = geomAt(F, d), ex = exits(Gd, F.ZONES);
    const Q = MW * 1.55, g = H.gens(Q, 0), t = H.transformers(Q, hkw, F.CITY || 'v'), nc = Math.ceil(Q / 1.489 - 1e-9) + 1, dr = drawn(Gd);
    const same = JSON.stringify(dr) === JSON.stringify([g.n, g.kw, t.n, t.kva, nc]);
    let pl;
    if (d < 1e-6) pl = { ok: true, hand: true, gen: g, tx: t, nchill: nc };
    else if (same || (Gd.CHILL || []).length) {
      let why = same ? null : `the rule asks for ${g.n} x ${g.kw} kW, ${t.n} x ${t.kva} kVA, ${nc} chillers; drawn ${dr[0]} x ${dr[1]} kW, ${dr[2]} x ${dr[3]} kVA, ${dr[4]} chillers (roof chillers: not re-packed)`;
      if (why == null) { const fx = Gd.PLANT.filter(p => kindOf(p)).map(p => ({ kind: kindOf(p), r: p.r.slice() })); const r = PF().place(Gd.PLANT_YARDS, Gd.LOTPOLY, bld(Gd), { gen: [0, [1, 1]], pad: [0, [1, 1]], hub: null, chill: 0 }, { fill: Gd.FUEL_FILL || [], fixed: fx }); why = r.why || routeWhy(Gd, Gd.PLANT, ctx.rw); }
      if (why == null) pl = { ok: true, hand: true, gen: g, tx: t, nchill: nc };
      else if ((Gd.CHILL || []).length) pl = { ok: false, why, gen: g, tx: t, nchill: nc };
      else pl = plant(Gd, F, MW, hkw, ctx);
    } else pl = plant(Gd, F, MW, hkw, ctx);
    const st = { MW: pyRound(MW, 3), d: pyRound(d, 3), hall: pyRound(hallArea(Gd), 1), dc: pyRound(dcArea(Gd), 1), exits: ex,
      plant: pl.ok ? (pl.hand ? 'as drawn' : 'fits') : (/rule asks|kept|yard route/.test(pl.why) ? pl.why : `${pl.why} does not fit`), sets: `${pl.gen.n} x ${pl.gen.kw} kW`, pads: `${pl.tx.n} x ${pl.tx.kva} kVA`, chillers: pl.nchill };
    if (pl.ok && ex.every(e => e.ok)) {
      let worst = [0, '-']; for (const s of Object.keys(Gd.S).map(Number)) { const TR = travel(Gd, s), sh = new Set(Gd.S[s].filter(isShaft).map(x => x.id)); for (const [kx, vx] of Object.entries(TR)) { if (vx == null || sh.has(kx)) continue; if (vx > worst[0]) worst = [vx, kx]; } }
      st.travel = [pyRound(worst[0], 1), worst[1]];
      if (worst[0] > 45 + 1e-9) { pl = Object.assign({}, pl, { ok: false }); st.plant += `; travel ${worst[0].toFixed(1)} m from ${worst[1]} > 45 m`; }
    }
    st._pl = pl; steps.push(st); if (opt.log) opt.log(st);
    if (pl.ok && ex.every(e => e.ok)) break;
  }
  const last = steps[steps.length - 1], ok = last && ['fits', 'as drawn'].includes(last.plant) && last.exits.every(e => e.ok);
  if (!ok && F.MW_FLOOR) { const s0 = steps[0];
    return { MW: pyRound(baseHall / hpm, 3), d: 0, dc: pyRound(baseDC, 1), hall: pyRound(baseHall, 1), steps, plant: null, G: G0,
      stop: { rule: 'plant yard', text: s0 ? `not grown: plant yard (no size from ${s0.MW.toFixed(2)} down to ${F.MW_FLOOR.toFixed(2)} MW fits; at ${s0.MW.toFixed(2)} MW: ${s0.plant}); the board as drawn stands (J.B. 12 Nov)` : 'not grown' } }; }
  if (!ok) return { fail: 'no size passes down to the fit as drawn', steps };
  let stop;
  if (steps.length === 1 && byLine) stop = { rule: limit, text: `stopped by the ${limit}; data centre ${last.dc.toLocaleString('en-CA')} m², ${Math.round(CAP - last.dc)} m² under the cap` };
  else if (steps.length === 1) stop = { rule: 'floor cap', text: `held at the 2,325 m² floor cap (data centre ${last.dc} m²): exits and plant pass at the cap` };
  else { const s0 = steps[0], whyc = s0.exits.filter(e => !e.ok).map(e => `${e.zone} exits ${e.apart} m apart, ${e.need} m needed`).concat(['fits', 'as drawn'].includes(s0.plant) ? [] : [`plant: ${s0.plant}`]).join('; ');
    let rule = s0.exits.some(e => !e.ok) ? 'exit spacing' : 'plant yard'; if (rule === 'plant yard' && /roof chillers/.test(s0.plant)) rule = 'drawn plant (roof chillers)';
    if (steps.slice(0, -1).some(x => /travel/.test(x.plant) && !/does not fit/.test(x.plant))) rule = 'plant yard, then travel distance';
    stop = { rule, text: `stopped at ${last.MW.toFixed(2)} MW by the ${rule}, stepping back 0.05 MW at a time (${byLine ? `at the ${limit}` : 'at the cap'}, ${s0.MW.toFixed(2)} MW: ${whyc})` }; }
  const Gd = geomAt(F, last.d), pl = last._pl;
  return { MW: last.MW, d: last.d, dc: last.dc, hall: last.hall, steps, stop, G: Gd, plant: pl.hand ? null : pl, order: pl.order || null };
}
const api = { run, geomAt: geomAtRaw, hallArea, dcArea, exits, drawn, travel, CAP, HPM };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
if (root) { root.BD = root.BD || {}; root.BD.growyard = api; }
})(typeof window !== 'undefined' ? window : null);
