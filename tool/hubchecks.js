/* Beyond Data — shared hub checks, ported from the frozen scripts (Claude Link eh/, freeze EH-FREEZE-2026-11-11, 11 Nov 2026).
   Port set, this step (J.B. 11 Nov 2026: yard gates, room access, clear sizes; sizing-to-load and the room-minimum check wait for
   EH-FREEZE-2026-11-11b):
     reach.py      9b5c5338626a78e9  T-reach R0–R8, kind(), SERVES (D3), cap_area (R8), bays
     dcspace.py    2119db4ae14e72f1  public route to a street off data-centre ground (R2, D2); used by reach and yardgate
     portal.py     b1115a7598d7aee3  security portal free-exit row (used by yardgate)
     yardgate.py   8b875e73a0468586  plant yards, gates, vehicle gates, dock doors (v7)
     audit_rooms.py 6dabc907ecf9d514 clear sizes only: clear_geom (walls off: fire / exterior 0.15 m a side, partitions 0.05 m),
                                     local_width, max_square. RULES / HARD (room minimums) are not ported yet.
   Input G = a fit's geometry as checks/tests/hub_port/export_geom.py writes it (S by storey, D doors, PLANT, PLANT_YARDS, GATES ...).
   Every rule and threshold is the script's own; comments name the script line it follows. Differences from the Python, where a
   library call is reproduced by arithmetic (shapely buffers, scipy's distance transform), are listed in
   checks/tests/hub_port/PORT_NOTES.md. Tested against the Python on every hub board: checks/tests/hub_port/port_test.js. */
(function (root) {
'use strict';

/* ---------- Python-compatible helpers ---------- */
const T = x => !(x == null || x === false || x === 0 || x === '' || (Array.isArray(x) && !x.length) || (typeof x === 'object' && !Array.isArray(x) && !Object.keys(x).length));
const get = (G, k, d) => (G[k] === undefined || G[k] === null) ? d : G[k];
const isRect = s => s.length === 4 && s.every(v => typeof v === 'number');
const f1 = x => (Math.round(x * 10 + (x >= 0 ? 1e-9 : -1e-9)) / 10).toFixed(1);   // Python '%.1f' (ties: see PORT_NOTES)
const pyRound1 = x => Number(pyFixed(x, 1)), pyRound2 = x => Number(pyFixed(x, 2));   // Python round(x, n): exact binary value, ties to even
function pyRoundInt(x) { const f = Math.floor(x), d = x - f; return d > 0.5 ? f + 1 : d < 0.5 ? f : (f % 2 === 0 ? f : f + 1); }   // round half to even
const pyList = a => '[' + a.map(s => `'${s}'`).join(', ') + ']';
const storeys = G => Object.keys(G.S).map(Number).sort((a, b) => a - b);
const roomsOf = (G, st) => G.S[String(st)] || [];
const hyp = Math.hypot;
/* Python's math.hypot is correctly rounded (vector_norm, 3.10+); JS Math.hypot may be one unit off. Exact x² + y² in double-double,
   square root, one correction step: the correctly rounded result, so near-ties fall as in Python. */
function twoProd(a, b) { const p = a * b, S = 134217729, ah = a * S - (a * S - a), al = a - ah, bh = b * S - (b * S - b), bl = b - bh; return [p, ((ah * bh - p) + ah * bl + al * bh) + al * bl]; }
function twoSum(a, b) { const s = a + b, bb = s - a; return [s, (a - (s - bb)) + (b - bb)]; }
function pyHypot(x, y) {
  x = Math.abs(x); y = Math.abs(y); if (x === 0) return y; if (y === 0) return x; if (!isFinite(x) || !isFinite(y)) return Infinity;
  const [px, ex] = twoProd(x, x), [py_, ey] = twoProd(y, y), [s, es] = twoSum(px, py_), lo = es + ex + ey, [hi, lo2] = twoSum(s, lo);
  let r = Math.sqrt(hi); const [rr, er] = twoProd(r, r); r += ((hi - rr) - er + lo2) / (2 * r); return r;
}
const minOf = (a, f) => { let m = Infinity; for (const x of a) { const v = f(x); if (v < m) m = v; } return m; }, maxOf = (a, f) => { let m = -Infinity; for (const x of a) { const v = f(x); if (v > m) m = v; } return m; };

/* ---------- reach.py: kinds and lines ---------- */
const LINE = { lobby: 'P', pcor: 'P', ccor: 'P', pcore: 'P', proom: 'P', croom: 'P', exitpas: null,
  scor: 'S', score: 'S', sroom: 'S', hall: 'S', dock: 'S', bay: 'S', entry: 'S', plant: 'X', shaft: 'X', spare: null };
const CIRC = new Set(['lobby', 'pcor', 'ccor', 'pcore', 'scor', 'score', 'exitpas']);
const HALL_OK = /\bups\b|battery|electrical|switchgear|\bmv\b|transformer room|suppression|cylinder|clean agent|heat[- ]recovery/;
const PROOM_OK = /\bwcs?\b|washroom|toilet|shower|\bcot\b|first aid/;
function kind(x, st) {
  const i = x.id, g = x.g, n = x.n.toLowerCase();
  if (g === 'hall') return 'hall';
  if (i.startsWith('lob')) return 'lobby';
  if (i === 'cor') return 'pcor';
  if (i === 'ccor') return 'ccor';
  if (['dcor', 'scor', 'xcor', 'ecor', 'link'].includes(i)) return 'scor';
  if (i === 'pas' || i === 'rst' || i.startsWith('pas')) return 'exitpas';
  if (['psh', 'sh1', 'sh2', 'ris3'].includes(i) || n.includes('shaft')) return 'shaft';
  if (x.core || x.stair) return g === 'circ' ? 'pcore' : 'score';
  if (i === 'ves') return 'entry';
  if (i === 'dock' || i === 'lv') return 'dock';
  if (g === 'load') return i !== 'aisle' ? 'bay' : 'shaft';
  if (g === 'plant') return 'plant';
  if (g === 'spare') return 'spare';
  if (g === 'pub') return 'proom';
  if (g === 'clin') return 'croom';
  return 'sroom';
}

/* ---------- dcspace.py ---------- */
const ROUTE_W = 1.1, GRID = 0.25;
function inShape(sh, x, y) {
  if (isRect(sh)) return sh[0] < x && x < sh[1] && sh[2] < y && y < sh[3];
  let c = false; const n = sh.length;
  for (let i = 0; i < n; i++) { const [x1, y1] = sh[i], [x2, y2] = sh[(i + 1) % n]; if ((y1 > y) !== (y2 > y) && x < (x2 - x1) * (y - y1) / (y2 - y1) + x1) c = !c; }
  return c;
}
function outsidePoint(G, st, u, v, o, d = 0.3) {
  const pts = o === 'v' ? [[u + d, v], [u - d, v]] : [[u, v + d], [u, v - d]];
  for (const p of pts) if (!roomsOf(G, st).some(x => x.r.some(r => r[0] < p[0] && p[0] < r[1] && r[2] < p[1] && p[1] < r[3]))) return p;
  return pts[0];
}
function dcGround(G, p) {
  if (get(G, 'WALK', []).some(w => inShape(w, p[0], p[1]))) return false;
  return get(G, 'DCSPACE', []).some(s => inShape(s, p[0], p[1]));
}
function truckRoutes(G) {
  const TR = get(G, 'TRUCK_ROUTES', null);
  if (TR !== null) return Object.assign({}, TR);
  const o = {}; for (const k of ['DRIVE', 'APRON', 'AISLE', 'COURT', 'YARD_AISLE']) if (T(get(G, k, null))) o[k] = G[k];
  return o;
}
function shapesTruck(G) {
  const S = (get(G, 'DCSPACE', []) || []).slice();
  S.push(...Object.values(truckRoutes(G)), ...(get(G, 'PLANT_YARDS', []) || []), ...(get(G, 'TRUCK_GROUND', []) || []));
  for (const x of roomsOf(G, 1)) if (x.g === 'load') S.push(...x.r);
  return S;
}
function segD(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = dx * dx + dy * dy;
  const t = L === 0 ? 0 : Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L));
  return hyp(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
}
/* exact Euclidean distance transform (as scipy.ndimage.distance_transform_edt): distance in cells from each true cell to the
   nearest false cell. Felzenszwalb & Huttenlocher's separable lower-envelope method, squared distances in integers. */
function edt(free, nu, nv) {
  const INF = 1e20, g = new Float64Array(nu * nv), out = new Float64Array(nu * nv);
  const f = new Float64Array(Math.max(nu, nv)), d = new Float64Array(Math.max(nu, nv)), vv = new Int32Array(Math.max(nu, nv)), z = new Float64Array(Math.max(nu, nv) + 1);
  function pass(n) {
    let k = 0; vv[0] = 0; z[0] = -INF; z[1] = INF;
    for (let q = 1; q < n; q++) {
      let s;
      while (true) { const p = vv[k]; s = ((f[q] + q * q) - (f[p] + p * p)) / (2 * q - 2 * p); if (s <= z[k] && k > 0) k--; else break; }
      if (s <= z[k]) { vv[0] = q; z[0] = -INF; z[1] = INF; k = 0; continue; }
      k++; vv[k] = q; z[k] = s; z[k + 1] = INF;
    }
    k = 0;
    for (let q = 0; q < n; q++) { while (z[k + 1] < q) k++; const p = vv[k]; d[q] = (q - p) * (q - p) + f[p]; }
  }
  for (let j = 0; j < nv; j++) { for (let i = 0; i < nu; i++) f[i] = free[i * nv + j] ? INF : 0; pass(nu); for (let i = 0; i < nu; i++) g[i * nv + j] = d[i]; }
  for (let i = 0; i < nu; i++) { for (let j = 0; j < nv; j++) f[j] = g[i * nv + j]; pass(nv); for (let j = 0; j < nv; j++) out[i * nv + j] = free[i * nv + j] ? Math.sqrt(d[j]) : 0; }
  return out;
}
const GRIDCACHE = new Map();
function grid(G, st, avoidTruck, extraBlock) {
  const key = JSON.stringify([st, avoidTruck, extraBlock, G.LOTPOLY, roomsOf(G, st).map(x => x.r), avoidTruck ? shapesTruck(G) : null, get(G, 'WALK', null)]);
  if (GRIDCACHE.has(key)) return GRIDCACHE.get(key);
  const lot = G.LOTPOLY, us = lot.map(p => p[0]), vs = lot.map(p => p[1]);
  const u0 = Math.min(...us) - 2.0, v0 = Math.min(...vs) - 2.0;
  const nu = Math.trunc((Math.max(...us) + 2.0 - u0) / GRID) + 1, nv = Math.trunc((Math.max(...vs) + 2.0 - v0) / GRID) + 1;
  const cu = i => u0 + (i + 0.5) * GRID, cv = j => v0 + (j + 0.5) * GRID;
  const N = nu * nv;
  function mask(sh) {
    const m = new Uint8Array(N);
    if (isRect(sh)) { for (let i = 0; i < nu; i++) { const U = cu(i); if (!(U > sh[0] && U < sh[1])) continue; for (let j = 0; j < nv; j++) { const V = cv(j); if (V > sh[2] && V < sh[3]) m[i * nv + j] = 1; } } return m; }
    const n = sh.length;
    for (let e = 0; e < n; e++) {
      const [x1, y1] = sh[e], [x2, y2] = sh[(e + 1) % n]; if (y1 === y2) continue;
      for (let j = 0; j < nv; j++) { const V = cv(j); if ((y1 > V) === (y2 > V)) continue; const X = (x2 - x1) * (V - y1) / (y2 - y1) + x1; for (let i = 0; i < nu; i++) if (cu(i) < X) m[i * nv + j] ^= 1; }
    }
    return m;
  }
  const free = mask(lot);
  for (const x of roomsOf(G, st)) for (const r of x.r) { const m = mask(r); for (let k = 0; k < N; k++) if (m[k]) free[k] = 0; }
  if (avoidTruck) {
    const tg = new Uint8Array(N);
    for (const sh of shapesTruck(G)) { const m = mask(sh); for (let k = 0; k < N; k++) if (m[k]) tg[k] = 1; }
    for (const w of (get(G, 'WALK', []) || [])) { const m = mask(w); for (let k = 0; k < N; k++) if (m[k]) tg[k] = 0; }
    for (let k = 0; k < N; k++) if (tg[k]) free[k] = 0;
  }
  for (const sh of extraBlock) { const m = mask(sh); for (let k = 0; k < N; k++) if (m[k]) free[k] = 0; }
  const D = edt(free, nu, nv), clear = new Float64Array(N); for (let k = 0; k < N; k++) clear[k] = D[k] * GRID;
  const out = { u0, v0, nu, nv, free, clear, cu, cv };
  GRIDCACHE.set(key, out); return out;
}
function dcRoute(G, st, u, v, o, opt) {
  opt = opt || {}; const avoidTruck = opt.avoid_truck !== false, extraBlock = opt.extra_block || [], start = opt.start || null;
  const edges = get(G, 'STREET_EDGES', null);
  if (avoidTruck && !shapesTruck(G).length) return [true, 'no truck ground on the lot'];
  if (!T(edges)) return [false, 'STREET_EDGES not declared: the route to a street or lane cannot be judged'];
  const p = start || outsidePoint(G, st, u, v, o);
  const dmin = Math.min(...edges.map(([a, b]) => segD(p, a, b)));
  if (dmin <= 1.0) return [true, `discharges at the street or lane (${f1(dmin)} m)`];
  const g = grid(G, st, avoidTruck, extraBlock), { nu, nv, free, clear, u0, v0, cu, cv } = g;
  const half = ROUTE_W / 2 - GRID / 2, ok = new Uint8Array(nu * nv);
  for (let k = 0; k < nu * nv; k++) ok[k] = free[k] && clear[k] >= half ? 1 : 0;
  const i0 = Math.trunc((p[0] - u0) / GRID), j0 = Math.trunc((p[1] - v0) / GRID), R = Math.trunc(1.2 / GRID) + 1, starts = [];
  for (let i = Math.max(0, i0 - R); i < Math.min(nu, i0 + R + 1); i++)
    for (let j = Math.max(0, j0 - R); j < Math.min(nv, j0 + R + 1); j++)
      if (ok[i * nv + j] && (cu(i) - p[0]) ** 2 + (cv(j) - p[1]) ** 2 <= 1.44) starts.push(i * nv + j);
  if (!starts.length) return [false, `no clear ground ≥ ${ROUTE_W.toFixed(1)} m outside the door (truck ground, building or lot line)`];
  const tgt = new Uint8Array(nu * nv);
  for (const [a, b] of edges) {
    const lu = Math.min(a[0], b[0]) - 2, hu = Math.max(a[0], b[0]) + 2, lv = Math.min(a[1], b[1]) - 2, hv = Math.max(a[1], b[1]) + 2;
    for (let i = 0; i < nu; i++) { const U = cu(i); if (U < lu || U > hu) continue; for (let j = 0; j < nv; j++) { const V = cv(j); if (V < lv || V > hv) continue; if (segD([U, V], a, b) <= 1.0 + ROUTE_W / 2) tgt[i * nv + j] = 1; } }
  }
  const seen = new Uint8Array(nu * nv), q = starts.slice(); for (const s of starts) seen[s] = 1;
  for (let h = 0; h < q.length; h++) {
    const k = q[h]; if (tgt[k]) return [true, avoidTruck ? `clear route ≥ ${ROUTE_W.toFixed(1)} m to a street or lane, off truck ground` : 'clear route to a street or lane'];
    const i = Math.floor(k / nv), j = k % nv;
    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const a = i + di, b = j + dj; if (a < 0 || a >= nu || b < 0 || b >= nv) continue; const n = a * nv + b;
      if (ok[n] && !seen[n]) { seen[n] = 1; q.push(n); }
    }
  }
  return [false, avoidTruck ? `no route ≥ ${ROUTE_W.toFixed(1)} m to a street or lane that stays off truck ground (drive, court, apron, bays, plant yard) except on a fenced walkway` : 'no route to a street or lane'];
}

/* ---------- reach.py: run(G) ---------- */
function reach(G, opt) {
  const SERVES = !!(opt && opt.serves);
  const nodes = new Map(), K = new Map(), key = (st, i) => st + '|' + i;
  for (const st of storeys(G)) for (const x of roomsOf(G, st)) { const k = key(st, x.id); nodes.set(k, { st, id: x.id, x }); K.set(k, kind(x, st)); }
  const adj = new Map(), ext = new Map(), A = k => { if (!adj.has(k)) adj.set(k, new Set()); return adj.get(k); }, E = k => { if (!ext.has(k)) ext.set(k, new Set()); return ext.get(k); };
  for (const d of G.D) {
    const st = d[0], a = d[1], b = d[2];
    if (b === 'OUT' || b === 'YARD') { E(key(st, a)).add(b); continue; }
    if (nodes.has(key(st, a)) && nodes.has(key(st, b))) { A(key(st, a)).add(key(st, b)); A(key(st, b)).add(key(st, a)); }
  }
  for (const [k, nd] of nodes) if (['pcore', 'score'].includes(K.get(k)) && nodes.has(key(nd.st + 1, nd.id))) { A(k).add(key(nd.st + 1, nd.id)); A(key(nd.st + 1, nd.id)).add(k); }
  const adjOf = k => adj.get(k) || new Set(), extOf = k => ext.get(k) || new Set();
  const out = [], node = k => [nodes.get(k).st, nodes.get(k).id];
  function touch(a, b) {
    for (const r of a.r) for (const q of b.r) {
      const ou = Math.min(r[1], q[1]) - Math.max(r[0], q[0]), ov = Math.min(r[3], q[3]) - Math.max(r[2], q[2]);
      if ((Math.abs(r[1] - q[0]) < 1e-6 || Math.abs(q[1] - r[0]) < 1e-6) && ov > 0.5) return true;
      if ((Math.abs(r[3] - q[2]) < 1e-6 || Math.abs(q[3] - r[2]) < 1e-6) && ou > 0.5) return true;
    }
    return false;
  }
  function baychain(n) {
    const seen = new Set([n]), q = [n];
    while (q.length) {
      const c = q.pop();
      for (const m of nodes.keys()) {
        if (nodes.get(m).st !== nodes.get(c).st || seen.has(m) || !touch(nodes.get(c).x, nodes.get(m).x)) continue;
        if (K.get(m) === 'dock') return true;
        if (K.get(m) === 'bay') { seen.add(m); q.push(m); }
      }
    }
    return false;
  }
  const line = new Map();
  for (const n of nodes.keys()) {
    let l = LINE[K.get(n)];
    if (l === null || l === undefined) { l = '?'; for (const m of adjOf(n)) { const lm = LINE[K.get(m)]; if (lm && 'PS'.includes(lm)) { l = lm; break; } } }
    line.set(n, l);
  }
  const E6 = 1e-6;
  function onwall(x, u, v, o, side) {
    for (const r of x.r) {
      if (o === 'v' && r[2] - E6 <= v && v <= r[3] + E6 && ((side >= 0 && Math.abs(r[1] - u) < E6) || (side <= 0 && Math.abs(r[0] - u) < E6))) return Math.abs(r[1] - u) < E6 ? 1 : -1;
      if (o === 'h' && r[0] - E6 <= u && u <= r[1] + E6 && ((side >= 0 && Math.abs(r[3] - v) < E6) || (side <= 0 && Math.abs(r[2] - v) < E6))) return Math.abs(r[3] - v) < E6 ? 1 : -1;
    }
    return 0;
  }
  for (const d of G.D) {
    const [st, a, b, u, v, o] = d, ka = key(st, a);
    if (!nodes.has(ka)) { out.push(['R0', [st, a], 'door names a missing room']); continue; }
    const sa = onwall(nodes.get(ka).x, u, v, o, 0);
    if (!sa) { out.push(['R0', [st, a], `door to ${b} at (${u}, ${v}) is not on its wall`]); continue; }
    if (b === 'OUT' || b === 'YARD') {
      const same = [...nodes.values()].filter(n => n.st === st);
      if (same.some(n => n.id !== a && n.x.g !== 'load' && onwall(n.x, u, v, o, -sa) === -sa)) out.push(['R0', [st, a], `exterior door at (${u}, ${v}) opens into another room`]);
      if (line.get(ka) === 'P' && same.some(n => n.x.g === 'load' && onwall(n.x, u, v, o, -sa) === -sa)) out.push(['R2', [st, a], `public exit at (${u}, ${v}) opens into a loading bay or truck aisle (secure line)`]);
      if (line.get(ka) === 'P') {
        if (dcGround(G, outsidePoint(G, st, u, v, o))) out.push(['R2', [st, a], `public exit at (${u}, ${v}) discharges into data-centre ground (drive, court or plant yard) with no walkway`]);
        else { const [ok, why] = dcRoute(G, st, u, v, o); if (!ok) out.push(['R2', [st, a], `public exit at (${u}, ${v}): ${why}`]); }
      }
    } else if (nodes.has(key(st, b)) && onwall(nodes.get(key(st, b)).x, u, v, o, -sa) !== -sa) out.push(['R0', [st, a], `door to ${b} at (${u}, ${v}) is not on a shared wall`]);
    if (b !== 'OUT' && b !== 'YARD' && nodes.has(key(st, b))) {
      const hw = (d.length > 6 ? d[6] : 0.9) / 2, ends = o === 'v' ? [[u, v - hw], [u, v + hw]] : [[u - hw, v], [u + hw, v]];
      if (!ends.every(([eu, ev]) => onwall(nodes.get(ka).x, eu, ev, o, sa) === sa && onwall(nodes.get(key(st, b)).x, eu, ev, o, -sa) === -sa))
        out.push(['R0', [st, a], `door to ${b} at (${u}, ${v}) runs past the shared wall`]);
    }
  }
  for (const n of nodes.keys()) { if (K.get(n) === 'shaft' || K.get(n) === 'bay') continue; if (!adjOf(n).size && !extOf(n).size) out.push(['R1', node(n), 'no door']); }
  const lt = (n, m) => { const A1 = nodes.get(n), B1 = nodes.get(m); return A1.st !== B1.st ? A1.st < B1.st : A1.id < B1.id; };
  for (const n of nodes.keys()) for (const m of adjOf(n)) { const s = new Set([line.get(n), line.get(m)]); if (s.size === 2 && s.has('P') && s.has('S') && lt(n, m)) out.push(['R2', node(n), `door to ${nodes.get(m).id} crosses the secure line`]); }
  function reachFrom(starts, L) {
    const seen = new Set(starts), q = starts.slice();
    for (let h = 0; h < q.length; h++) {
      const n = q[h];
      for (const m of adjOf(n)) {
        if (seen.has(m) || line.get(m) !== L) continue;
        if (nodes.get(m).x.stair && nodes.get(m).st !== nodes.get(n).st) continue;
        if (['pcore', 'score'].includes(K.get(m)) && nodes.get(m).x.stair) continue;
        seen.add(m); q.push(m);
      }
    }
    return seen;
  }
  const lob = [...nodes.keys()].filter(n => K.get(n) === 'lobby' && extOf(n).has('OUT'));
  const ent = [...nodes.keys()].filter(n => K.get(n) === 'entry' && extOf(n).size);
  if (!lob.length) out.push(['R6', null, 'no lobby with a street door']);
  if (!ent.length) out.push(['R4', null, 'no data-centre staff entrance with an outside door']);
  const P = reachFrom(lob, 'P'), S_ = reachFrom(ent, 'S');
  for (const n of nodes.keys()) {
    const k = K.get(n), x = nodes.get(n).x;
    if (k === 'shaft' || k === 'plant' || (['pcore', 'score'].includes(k) && x.stair) || k === 'exitpas') continue;
    if (line.get(n) === 'P' && !P.has(n)) out.push(['R3', node(n), 'not reached step-free from the lobby street door']);
    if (line.get(n) === 'S' && !S_.has(n) && k !== 'bay') out.push(['R4', node(n), 'not reached step-free from the staff entrance']);
  }
  const ids = s => pyList([...s].map(m => nodes.get(m).id).sort());
  const nm = m => nodes.get(m).x.n.toLowerCase(), offcirc = m => [...adjOf(m)].some(z => CIRC.has(K.get(z)));
  for (const n of nodes.keys()) {
    const k = K.get(n), x = nodes.get(n).x, Aa = adjOf(n);
    if (CIRC.has(k) || ['shaft', 'hall', 'entry', 'dock'].includes(k)) continue;
    if (k === 'plant') { if (!(extOf(n).size || [...Aa].some(m => ['pcor', 'ccor', 'lobby'].includes(K.get(m))))) out.push(['R5', node(n), 'plant room not off the exterior or the public corridor']); continue; }
    if (k === 'bay') {
      if ([...Aa].some(m => CIRC.has(K.get(m))) || baychain(n)) continue;
      const bw = Math.min(...x.r.map(r => Math.min(r[1] - r[0], r[3] - r[2])));
      if (G.D.some(d => d[0] === nodes.get(n).st && d[1] === x.id && d[2] === 'OUT' && (d.length > 6 ? d[6] : 0.9) >= bw - 0.01)) continue;
      out.push(['R5', node(n), `reached only through ${ids(Aa)}`]); continue;
    }
    const nmn = x.n.toLowerCase();
    if (SERVES && Aa.size === 1 && k === 'proom') {
      const p0 = [...Aa][0];
      if (K.get(p0) === 'proom' && offcirc(p0) && ((nmn.includes('stor') && !nmn.includes('staff')) || (nmn.includes('staff') && /\bwcs?\b|washroom|toilet/.test(nmn)))) continue;
      if (nmn.includes('growing house') && nm(p0).includes('headhouse') && offcirc(p0)) continue;
    }
    if (k === 'proom') {
      if ([...Aa].some(m => ['pcor', 'ccor', 'lobby'].includes(K.get(m)))) continue;
      const par = [...Aa].filter(m => K.get(m) === 'proom' && /refuge|shelter/.test(nm(m)) && [...adjOf(m)].some(z => ['pcor', 'ccor', 'lobby'].includes(K.get(z))));
      if (par.length && PROOM_OK.test(nmn)) continue;
      out.push(['R5', node(n), `(15a: public rooms open off the public corridor or lobby; only WCs, showers, cot storage and first aid may open off the refuge or shelter they serve) reached only through ${ids(Aa)}`]); continue;
    }
    if (k === 'croom') {
      if ([...Aa].some(m => K.get(m) === 'ccor')) continue;
      if (nmn.includes('waiting') && [...Aa].some(m => ['pcor', 'lobby'].includes(K.get(m)))) continue;
      out.push(['R5', node(n), `(15a: clinic rooms open off the clinic corridor) reached only through ${ids(Aa)}`]); continue;
    }
    if (k === 'sroom') {
      if ([...Aa].some(m => K.get(m) === 'scor')) continue;
      if (HALL_OK.test(nmn) && [...Aa].some(m => K.get(m) === 'hall')) continue;
      if (nmn.includes('shipping') && [...Aa].some(m => K.get(m) === 'dock' || (K.get(m) === 'score' && !nodes.get(m).x.stair))) continue;
      out.push(['R5', node(n), `(15a: secure rooms open off the secure corridor; off the hall only rooms serving it alone, shipping off E2 or the dock) reached only through ${ids(Aa)}`]); continue;
    }
    if (k === 'spare') {
      if ([...Aa].some(m => ['pcor', 'ccor', 'scor'].includes(K.get(m)))) continue;
      out.push(['R5', node(n), `(15a: unassigned floor opens off one corridor, never through another room) reached only through ${ids(Aa)}`]); continue;
    }
    if ([...Aa].some(m => CIRC.has(K.get(m)))) continue;
    out.push(['R5', node(n), `reached only through ${ids(Aa)}`]);
  }
  for (const l of lob) if (![...adjOf(l)].some(m => K.get(m) === 'pcor')) out.push(['R6', node(l), 'lobby does not touch the public corridor']);
  for (const [use, spec] of Object.entries(get(G, 'CAPS', {}))) {
    const a = capArea(G, use), cap = spec[1];
    if (a > cap + 1e-6) out.push(['R8', null, `${use} ${f1(a)} m2 over the ${cap} m2 cap per establishment`]);
  }
  const Kout = {}; for (const [k, v] of K) Kout[k] = v;
  return { out, K: Kout };
}
const rArea = r => (r[1] - r[0]) * (r[3] - r[2]);
function cappedArea(G, groups) { let s = 0; for (const st of storeys(G)) for (const x of roomsOf(G, st)) if (groups.includes(x.g)) for (const r of x.r) s += rArea(r); return s; }
function capArea(G, use, detail) {
  const C = G.CAPS[use], groups = C[0], spec = C.length > 2 ? C[2] : {};
  const area = (gs, idset) => { let s = 0; for (const st of storeys(G)) for (const x of roomsOf(G, st)) if (gs.includes(x.g) || idset.has(x.id)) for (const r of x.r) s += rArea(r); return s; };
  const own = area(groups, new Set(spec.own || []));
  const shared = new Set(spec.shared || []); let sh = 0; for (const st of storeys(G)) for (const x of roomsOf(G, st)) if (shared.has(x.id)) for (const r of x.r) sh += rArea(r);
  let oth = 0; for (const [g, i] of (spec.others || [])) oth += area(g, new Set(i));
  const tot = own + (own + oth > 0 ? sh * own / (own + oth) : 0.0);
  return detail ? [tot, own, sh, oth] : tot;
}

/* ---------- portal.py ---------- */
function portal(G) {
  const P = get(G, 'PORTAL', null), H = get(G, 'EXIT_HW', null);
  if (!T(P) || !T(H)) return ['fail', 'no portal or exit-hardware door declared', false];
  const eq5 = (a, b) => a.slice(0, 5).every((v, i) => v === b[i]);
  const door = G.D.find(d => eq5(d, H[0][0]));
  if (!door) return ['fail', 'the exit-hardware door is not drawn', false];
  if (eq5(door, P)) return ['fail', 'the exit-hardware door is the portal itself', false];
  const same = new Set([door[1], door[2]]).size === new Set([P[1], P[2]]).size && [door[1], door[2]].every(z => z === P[1] || z === P[2]) && [P[1], P[2]].every(z => z === door[1] || z === door[2]);
  const gap = hyp(door[3] - P[3], door[4] - P[4]), w = door.length > 6 ? door[6] : 0.9;
  const probs = (same ? [] : ['joins other rooms than the portal']).concat(gap <= 3.0 + 1e-6 ? [] : [`${f1(gap)} m from the portal (> 3.0)`]).concat(w >= 0.9 - 1e-6 ? [] : [`${w.toFixed(2)} m wide (< 0.9)`]);
  const txt = `exit door beside the portal (${P[1]}–${P[2]}), ${f1(w)} m wide, ${f1(gap)} m from it [script]; hardware: ${H[0][1]}: check in design` + (probs.length ? `; FAILS: ${probs.join('; ')}` : '');
  return [probs.length ? 'fail' : 'tight', txt, !probs.length];
}

/* ---------- yardgate.py v7 ---------- */
const YW = 1.1, YTIGHT = 0.5;
function insideP(p, P) { let c = false; const n = P.length; for (let i = 0; i < n; i++) { const a = P[i], b = P[(i - 1 + n) % n]; if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; }
function edgeD(p, P) { let m = Infinity; for (let i = 0; i < P.length; i++) m = Math.min(m, segD(p, P[(i - 1 + P.length) % P.length], P[i])); return m; }
function rectD(p, r) { const dx = Math.max(r[0] - p[0], 0, p[0] - r[1]), dy = Math.max(r[2] - p[1], 0, p[1] - r[3]); return hyp(dx, dy); }
function gseg(g) { return g.length > 3 && g[3] === 'v' ? [[g[0], g[1]], [g[0], g[2]]] : [[g[0], g[2]], [g[1], g[2]]]; }
function within(p, a, b) { const dx = b[0] - a[0], dy = b[1] - a[1], L = dx * dx + dy * dy, t = L === 0 ? 0 : ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L; return t >= -1e-6 && t <= 1 + 1e-6; }
function yards(G) {
  const Y = get(G, 'PLANT_YARDS', null);
  if (Y === null) throw new Error('PLANT_YARDS not declared (J.B. 10 Nov: the plant yard is an explicit field per fit)');
  return Y.map(P => isRect(P) ? [[P[0], P[2]], [P[1], P[2]], [P[1], P[3]], [P[0], P[3]]] : P.slice());
}
function yardgate(G) {
  const out = { gates: [], doors: [], vgates: [] }, Ys = yards(G);
  for (const P of Ys) { const o = judge(G, P); for (const k of Object.keys(out)) out[k].push(...(o[k] || [])); }
  for (const g of get(G, 'GATES', [])) {
    const [a, b] = gseg(g);
    if (!Ys.some(P => Math.max(edgeD(a, P), edgeD(b, P)) < 0.05)) out.gates.push({ gate: g, width: pyRound2(hyp(a[0] - b[0], a[1] - b[1])), on_fence: false, in_walkway: null, status: 'fail' });
  }
  resolve(G, out); return out;
}
function judge(G, P) {
  const out = { gates: [], doors: [] };
  const gates = get(G, 'GATES', []).filter(g => Math.max(edgeD(gseg(g)[0], P), edgeD(gseg(g)[1], P)) < 0.05);
  for (const g of gates) {
    const [a, b] = gseg(g), w = hyp(a[0] - b[0], a[1] - b[1]);
    const on = Math.max(edgeD(a, P), edgeD(b, P), edgeD([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], P)) < 0.05;
    const pts = []; for (let i = 0; i <= 10; i++) pts.push([a[0] + (b[0] - a[0]) * i / 10, a[1] + (b[1] - a[1]) * i / 10]);
    const trucks = (get(G, 'WALK', []) || []).slice(); for (const k of ['DRIVE', 'APRON', 'AISLE']) if (T(get(G, k, null))) trucks.push(G[k]);
    const walk = pts.some(q => trucks.some(r => rectD(q, r) < -1e-9 || (r[0] < q[0] && q[0] < r[1] && r[2] < q[1] && q[1] < r[3])));
    let st = (w < YW - 1e-6 || !on || walk) ? 'fail' : (w < YW + YTIGHT - 1e-6 ? 'tight' : 'pass'), why = null;
    if (st !== 'fail') {
      const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], vert = g.length > 3 && g[3] === 'v';
      const cand = vert ? [[mid[0] + 0.6, mid[1]], [mid[0] - 0.6, mid[1]]] : [[mid[0], mid[1] + 0.6], [mid[0], mid[1] - 0.6]];
      const Yall = yards(G), outp = cand.filter(q => !Yall.some(Q => insideP(q, Q)));
      if (!outp.length) { st = 'fail'; why = 'gate does not open out of the yards'; }
      else {
        const [ok, w2] = dcRoute(G, 1, mid[0], mid[1], vert ? 'v' : 'h', { avoid_truck: false, extra_block: Yall, start: outp[0] });
        if (!ok) { st = 'fail'; why = 'gate does not lead to a street or lane: ' + w2; }
      }
    }
    out.gates.push(Object.assign({ gate: g, width: pyRound2(w), on_fence: on, in_walkway: walk, status: st }, why ? { why } : {}));
  }
  out.vgates = [];
  const vg = get(G, 'VGATES', []), fence = [];
  for (let i = 0; i < P.length; i++) {
    const a = P[(i - 1 + P.length) % P.length], b = P[i], n = Math.max(1, Math.trunc(hyp(a[0] - b[0], a[1] - b[1]) / 0.1));
    for (let j = 0; j < n; j++) fence.push([a[0] + (b[0] - a[0]) * j / n, a[1] + (b[1] - a[1]) * j / n]);
  }
  const TR = truckRoutes(G), ENT = get(G, 'TRUCK_ENTRIES', {}), VIA = get(G, 'TRUCK_VIA', {}), ALONG = new Set(get(G, 'TRUCK_ALONG', []));
  for (const [k, r] of Object.entries(TR)) {
    const RP = isRect(r) ? [[r[0], r[2]], [r[1], r[2]], [r[1], r[3]], [r[0], r[3]]] : r.slice();
    const touch = fence.filter(q => insideP(q, RP) || edgeD(q, RP) <= 0.05);
    if (!touch.length) continue;
    const inner = fence.filter(q => insideP(q, RP) && edgeD(q, RP) > 0.05);
    const ent = [];
    for (const [a, b] of (ENT[k] || [])) for (let j = 0; j <= 50; j++) { const q = [a[0] + (b[0] - a[0]) * j / 50, a[1] + (b[1] - a[1]) * j / 50]; if (edgeD(q, P) < 0.1) ent.push(q); }
    const Lt = pyRound1(0.1 * touch.length);
    if (ALONG.has(k) || k in VIA) {
      if (inner.length) out.vgates.push({ route: k, crossing_points: inner.length, uncovered_m: null, status: 'fail', why: `declared ${ALONG.has(k) ? 'along the fence' : 'reached via ' + String(VIA[k])} but crosses the yard fence` });
      else out.vgates.push({ route: k, crossing_points: 0, uncovered_m: 0.0, status: 'pass', why: ALONG.has(k) ? 'runs along the fence, no entry (declared)' : `reached via ${VIA[k]} (declared)` });
      continue;
    }
    const cr = inner.concat(ent);
    if (!cr.length) { out.vgates.push({ route: k, crossing_points: 0, uncovered_m: Lt, status: 'fail', why: `meets the plant-yard fence over ${Lt} m and nothing is declared (TRUCK_ENTRIES with VGATES, TRUCK_VIA or TRUCK_ALONG)` }); continue; }
    const unc = cr.filter(q => !vg.some(([a, b]) => segD(q, a, b) < 0.06)), L = unc.length ? 0.1 * unc.length : 0.0;
    const st = !unc.length ? 'pass' : (L <= 0.5 + 1e-6 ? 'tight' : 'fail');
    out.vgates.push({ route: k, crossing_points: cr.length, uncovered_m: pyRound2(L), status: st, why: !unc.length ? 'vehicle gate spans the crossing' : `${pyRound1(L)} m of the crossing without a vehicle gate` });
  }
  const S1 = roomsOf(G, 1), K = {}, grp = {}; for (const x of S1) { K[x.id] = kind(x, 1); grp[x.id] = x.g; }
  const plant = G.PLANT.map(x => x.r), bld = []; for (const x of S1) bld.push(...x.r);
  function free(p, half, near, s) {
    if (!insideP(p, P)) return false;
    if (plant.some(r => rectD(p, r) < half)) return false;
    const atDoor = s != null && hyp(p[0] - s[0], p[1] - s[1]) < 1.0;
    if (!atDoor && bld.some(r => rectD(p, r) < half)) return false;
    if (bld.some(r => rectD(p, r) < 0.05)) return false;
    if (edgeD(p, P) < half && !near(p)) return false;
    return true;
  }
  const g0 = 0.25;
  for (const d of G.D) {
    if (d[0] !== 1 || !['OUT', 'YARD'].some(z => z === d[1] || z === d[2])) continue;
    const room = (d[2] === 'OUT' || d[2] === 'YARD') ? d[1] : d[2];
    const side = [];
    for (const sg of [1, -1]) {
      for (let i = 0; i < 15; i++) {
        const dist = 0.6 + 0.1 * i, q = d[5] === 'v' ? [d[3] + sg * dist, d[4]] : [d[3], d[4] + sg * dist];
        if (insideP(q, P)) { side.push(q); break; }
        if (S1.some(x => x.g !== 'load' && x.r.some(r => r[0] < q[0] && q[0] < r[1] && r[2] < q[1] && q[1] < r[3]))) break;
        if ((get(G, 'WALK', []) || []).some(w => w[0] < q[0] && q[0] < w[1] && w[2] < q[1] && q[1] < w[3])) break;
      }
      if (side.length) break;
    }
    if (!side.length) continue;
    const k = K[room], gname = grp[room];
    const pub = ['pub', 'clin', 'circ'].includes(gname) || ['lobby', 'pcor', 'ccor', 'proom', 'croom'].includes(k);
    const rec = { door: [room, d[3], d[4]], kind: k === undefined ? null : k, group: gname === undefined ? null : gname };
    if (pub) { Object.assign(rec, { status: 'fail', why: 'public or clinic door into the plant yard (rule 6)' }); out.doors.push(rec); continue; }
    const s = side[0];
    if (S1.some(x => x.g === 'load' && x.r.some(r => rectD(s, r) < 0.3))) { Object.assign(rec, { status: 'pending', loading: true, d }); out.doors.push(rec); continue; }
    if (!gates.length) { Object.assign(rec, { status: 'fail', why: 'no gate to the street drawn (Q24)' }); out.doors.push(rec); continue; }
    const gs = gates.map(gseg);
    const near = p => hyp(p[0] - s[0], p[1] - s[1]) < 1.0 || gs.some(([a, b]) => segD(p, a, b) < 1.0);
    function route(width) {
      const half = width / 2, st0 = [pyRoundInt(s[0] / g0), pyRoundInt(s[1] / g0)], K0 = c => c[0] + ',' + c[1];
      const D = new Map([[K0(st0), 0.0]]), heap = [[0.0, st0[0], st0[1]]];
      const push = e => { heap.push(e); let i = heap.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (cmp(heap[i], heap[p]) < 0) { [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } else break; } };
      const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < heap.length && cmp(heap[l], heap[m]) < 0) m = l; if (r < heap.length && cmp(heap[r], heap[m]) < 0) m = r; if (m === i) break; [heap[i], heap[m]] = [heap[m], heap[i]]; i = m; } } return top; };
      function cmp(x, y) { return x[0] - y[0] || x[1] - y[1] || x[2] - y[2]; }
      while (heap.length) {
        const [dd, ci, cj] = pop(); if (dd > D.get(ci + ',' + cj)) continue;
        const p = [ci * g0, cj * g0];
        if (gs.some(([a, b]) => segD(p, a, b) <= 0.3 && within(p, a, b))) return dd;
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
          const ni = ci + dx, nj = cj + dy, pn = [ni * g0, nj * g0], step = g0 * hyp(dx, dy), kk = ni + ',' + nj;
          if (free(pn, half, near, s) && dd + step < (D.has(kk) ? D.get(kk) : 1e9)) { D.set(kk, dd + step); push([dd + step, ni, nj]); }
        }
      }
      return null;
    }
    const L = route(YW);
    if (L === null) Object.assign(rec, { status: 'fail', why: `no ${YW} m clear route to a gate` });
    else {
      const L2 = route(YW + YTIGHT);
      Object.assign(rec, { status: L2 !== null ? 'pass' : 'tight', length: pyRound1(L), length_1_6: L2 === null ? null : pyRound1(L2), why: L2 !== null ? 'route ≥ 1.6 m' : `route only ${YW}–${pyRound1(YW + YTIGHT)} m wide somewhere` });
    }
    out.doors.push(rec);
  }
  return out;
}
function resolve(G, out) {
  const S1 = roomsOf(G, 1), K = {}; for (const x of S1) K[x.id] = kind(x, 1);
  const yardSt = new Map(); for (const r of out.doors) if (!r.loading) yardSt.set(r.door[1] + ',' + r.door[2], r.status);
  const loadids = new Set(S1.filter(x => x.g === 'load').map(x => x.id));
  const portalOk = T(get(G, 'PORTAL', null)) ? portal(G)[2] : false;
  const barred = new Set(S1.filter(x => ['pub', 'clin', 'circ'].includes(x.g) || (K[x.id] === 'entry' && !portalOk) || x.n.toLowerCase().includes('lift') || /^e\d+$/.test(x.id)).map(x => x.id));
  const ldoors = new Set(out.doors.filter(r => r.loading).map(r => r.d[3] + ',' + r.d[4]));
  const isOut = e => ['OUT', 'YARD'].some(z => z === e[1] || z === e[2]);
  function exitsOf(rid, accept) {
    const res = [];
    for (const e of G.D) {
      if (e[0] !== 1 || !(e[1] === rid || e[2] === rid) || !isOut(e) || ldoors.has(e[3] + ',' + e[4])) continue;
      res.push([e, accept.includes(yardSt.has(e[3] + ',' + e[4]) ? yardSt.get(e[3] + ',' + e[4]) : 'pass')]);
    }
    return res;
  }
  for (const r of out.doors) {
    if (!r.loading) continue;
    const d = r.d; delete r.d; const room = r.door[0];
    const others = G.D.filter(e => e[0] === 1 && (e[1] === room || e[2] === room) && e !== d && !isOut(e) && !(loadids.has(e[1]) || loadids.has(e[2])));
    const own = exitsOf(room, ['pass', 'tight']).filter(([, ok]) => ok).map(([e]) => e);
    let found = null, prev = new Map(), acc = null;
    for (const a of [['pass'], ['pass', 'tight']]) {
      acc = a; const seen = new Set([room]), q = [room]; prev = new Map(); found = null;
      const ownOk = exitsOf(room, a).filter(([, ok]) => ok).map(([e]) => e);
      if (ownOk.length) found = [room, ownOk[0]];
      while (q.length && !found) {
        const c = q.shift();
        for (const e of G.D) {
          if (e[0] !== 1 || !(e[1] === c || e[2] === c)) continue;
          const n = e[1] === c ? e[2] : e[1];
          if (n === 'OUT' || n === 'YARD' || loadids.has(n) || seen.has(n) || barred.has(n)) continue;
          if (c === room && !others.includes(e)) continue;
          seen.add(n); prev.set(n, c); q.push(n);
          const ok = exitsOf(n, a).filter(([, g]) => g).map(([x]) => x);
          if (ok.length) { found = [n, ok[0]]; break; }
        }
      }
      if (found) break;
    }
    if (!others.length && !own.length) Object.assign(r, { status: 'fail', why: 'door onto a loading space; its room has no other door clear of the bay (J.B. 10 Nov condition)' });
    else if (!found) Object.assign(r, { status: 'fail', why: 'door onto a loading space; no route from its room to another exit that avoids the bay, public rooms, lifts and an unverified security vestibule (J.B. 10 Nov conditions)' });
    else {
      const path = [found[0]]; while (prev.has(path[0])) path.unshift(prev.get(path[0]));
      if (path[0] !== room) path.unshift(room);
      Object.assign(r, { status: acc.length === 1 ? 'pass' : 'tight', why: `loading door (${room} exits via ${path.join(' → ')} → door at (${found[1][3].toFixed(1)}, ${found[1][4].toFixed(1)}))`, exit_via: path });
    }
  }
  return out;
}

/* ---------- audit_rooms.py: clear sizes (J.B. 11 Nov: rooms drawn to wall centrelines; sizes are clear sizes) ---------- */
const STEP = 0.05, T_FIRE = 0.30, T_PART = 0.10;
function lineOf(x, st) { const k = kind(x, st); if (x.core || x.stair || ['pcore', 'score', 'shaft', 'exitpas'].includes(k)) return 'F'; return LINE[k] === undefined ? null : LINE[k]; }
/* sorted distinct values, kept as computed (edge ± inset in floating point, as GEOS computes them); equal within 1e-9 counts once */
const uniqRaw = a => { const s = [...a].sort((p, q) => p - q); return s.filter((v, i) => i === 0 || v - s[i - 1] > 1e-9); };
const uniq = a => { const s = [...a].map(v => Math.round(v * 1e9) / 1e9).sort((p, q) => p - q); return s.filter((v, i) => i === 0 || v - s[i - 1] > 1e-9); };
const inRects = (rs, p) => rs.some(r => r[0] <= p[0] && p[0] <= r[1] && r[2] <= p[1] && p[1] <= r[3]);
/* boundary of a union of rectangles: maximal axis-aligned edges, each with its inside side */
function boundary(rs) {
  const xs = uniq(rs.flatMap(r => [r[0], r[1]])), ys = uniq(rs.flatMap(r => [r[2], r[3]]));
  const inC = (i, j) => i >= 0 && j >= 0 && i < xs.length - 1 && j < ys.length - 1 && inRects(rs, [(xs[i] + xs[i + 1]) / 2, (ys[j] + ys[j + 1]) / 2]);
  const E = [];
  for (let i = 0; i < xs.length; i++) for (let j = 0; j < ys.length - 1; j++) { const L = inC(i - 1, j), R = inC(i, j); if (L !== R) E.push({ o: 'v', c: xs[i], a: ys[j], b: ys[j + 1], ins: R ? 1 : -1 }); }
  for (let j = 0; j < ys.length; j++) for (let i = 0; i < xs.length - 1; i++) { const B = inC(i, j - 1), A = inC(i, j); if (A !== B) E.push({ o: 'h', c: ys[j], a: xs[i], b: xs[i + 1], ins: A ? 1 : -1 }); }
  E.sort((p, q) => (p.o < q.o ? -1 : p.o > q.o ? 1 : 0) || p.c - q.c || p.ins - q.ins || p.a - q.a);
  const M = [];
  for (const e of E) { const l = M[M.length - 1]; if (l && l.o === e.o && Math.abs(l.c - e.c) < 1e-9 && l.ins === e.ins && Math.abs(l.b - e.a) < 1e-9) l.b = e.b; else M.push(Object.assign({}, e)); }
  return M;
}
/* parts of edge e lying within 0.01 of rectangle q: [lo, hi] along the edge, or null */
function nearPart(e, q) {
  const d = e.o === 'v' ? Math.max(q[0] - e.c, 0, e.c - q[1]) : Math.max(q[2] - e.c, 0, e.c - q[3]);
  if (d > 0.01 + 1e-12) return null;
  const ext = Math.sqrt(Math.max(0, 0.01 * 0.01 - d * d)), lo = (e.o === 'v' ? q[2] : q[0]) - ext, hi = (e.o === 'v' ? q[3] : q[1]) + ext;
  const a = Math.max(e.a, lo), b = Math.min(e.b, hi); return b > a + 1e-12 ? [a, b] : null;
}
const rectDist = (r, q) => hyp(Math.max(q[0] - r[1], 0, r[0] - q[1]), Math.max(q[2] - r[3], 0, r[2] - q[3]));
function clearGeom(x, rooms, st) {
  const rs = x.r, lx = lineOf(x, st), E = boundary(rs);
  const part = E.map(() => []), open = E.map(() => []);
  for (const y of rooms) {
    if (y === x || y.id === x.id) continue;
    const ly = lineOf(y, st), touching = y.r.some(q => rs.some(r => rectDist(r, q) <= 0.01));
    if (x.g === 'load' && y.g === 'load') { if (touching) E.forEach((e, i) => y.r.forEach(q => { const p = nearPart(e, q); if (p) open[i].push(p); })); continue; }
    if (lx === 'F' || ly === 'F') continue;
    if (['P', 'S'].includes(lx) && ['P', 'S'].includes(ly) && lx !== ly) continue;
    if (!touching) continue;
    E.forEach((e, i) => y.r.forEach(q => { const p = nearPart(e, q); if (p) part[i].push(p); }));
  }
  const inAny = (iv, t) => iv.some(([a, b]) => t >= a - 1e-12 && t <= b + 1e-12);
  /* per edge: split into pieces typed 'fire' | 'part' | 'open' (open wins over part, as the Python removes open sides first) */
  const pieces = [];
  E.forEach((e, i) => {
    const cuts = uniq([e.a, e.b, ...part[i].flat(), ...open[i].flat()].filter(t => t >= e.a - 1e-12 && t <= e.b + 1e-12));
    for (let k = 0; k < cuts.length - 1; k++) { const m = (cuts[k] + cuts[k + 1]) / 2; pieces.push({ e, a: cuts[k], b: cuts[k + 1], t: inAny(open[i], m) ? 'open' : inAny(part[i], m) ? 'part' : 'fire' }); }
  });
  const hasPart = pieces.some(p => p.t === 'part'), hasOpen = pieces.some(p => p.t === 'open');
  /* join squares (mitre): at a point where two pieces of the same type meet at a corner of the boundary */
  const joins = { fire: [], part: [] }, endKey = (p, end) => { const t = end ? p.b : p.a; return p.e.o === 'v' ? [p.e.c, t] : [t, p.e.c]; };
  for (let i = 0; i < pieces.length; i++) for (let j = i + 1; j < pieces.length; j++) {
    const p = pieces[i], q = pieces[j]; if (p.t !== q.t || p.t === 'open' || p.e.o === q.e.o) continue;
    for (const ep of [0, 1]) for (const eq of [0, 1]) { const A1 = endKey(p, ep), B1 = endKey(q, eq); if (Math.abs(A1[0] - B1[0]) < 1e-9 && Math.abs(A1[1] - B1[1]) < 1e-9) joins[p.t].push(A1); }
  }
  /* strips: a piece buffered with flat caps = a rectangle reaching d on both sides of the wall line */
  const strip = (p, d) => p.e.o === 'v' ? [p.e.c - d, p.e.c + d, p.a, p.b] : [p.a, p.b, p.e.c - d, p.e.c + d];
  const fireR = pieces.filter(p => p.t === 'fire').map(p => strip(p, T_FIRE / 2)).concat(joins.fire.map(([u, v]) => [u - T_FIRE / 2, u + T_FIRE / 2, v - T_FIRE / 2, v + T_FIRE / 2]));
  const partR = hasOpen ? pieces.filter(p => p.t === 'part').map(p => strip(p, T_PART / 2)).concat(joins.part.map(([u, v]) => [u - T_PART / 2, u + T_PART / 2, v - T_PART / 2, v + T_PART / 2])) : [];
  const open_ = r => r[0] < 0 ? 0 : 0;   // (placeholder for symmetry; nothing along an open side)
  void open_; void hasPart;
  const eroded = p => { /* square of half-size T_PART/2 around p inside the union of rooms (mitre inset of a rectilinear polygon) */
    const h = T_PART / 2, sq = [p[0] - h, p[0] + h, p[1] - h, p[1] + h];
    const xs = uniq([sq[0], sq[1], ...rs.flatMap(r => [r[0], r[1]]).filter(v => v > sq[0] && v < sq[1])]), ys = uniq([sq[2], sq[3], ...rs.flatMap(r => [r[2], r[3]]).filter(v => v > sq[2] && v < sq[3])]);
    for (let i = 0; i < xs.length - 1; i++) for (let j = 0; j < ys.length - 1; j++) if (!inRects(rs, [(xs[i] + xs[i + 1]) / 2, (ys[j] + ys[j + 1]) / 2])) return false;
    return true;
  };
  const strictIn = (R, p) => R.some(r => r[0] < p[0] && p[0] < r[1] && r[2] < p[1] && p[1] < r[3]);
  const member = p => {
    if (!inRects(rs, p)) return false;
    if (hasOpen) { if (strictIn(partR, p)) return false; }
    else if (!eroded(p)) return false;
    return !strictIn(fireR, p);
  };
  /* exact area on the compressed grid of every boundary the shapes can have */
  const bx = new Set(), by = new Set();
  for (const r of rs) for (const d of [0, T_PART / 2, -T_PART / 2]) { bx.add(r[0] + d); bx.add(r[1] + d); by.add(r[2] + d); by.add(r[3] + d); }
  for (const r of fireR.concat(partR)) { bx.add(r[0]); bx.add(r[1]); by.add(r[2]); by.add(r[3]); }
  const X = uniqRaw(bx), Y = uniqRaw(by), cellsIn = [];
  let aI = 0;   /* exact: coordinates in 0.0001 m units, integer products, one division at the end (the nearest double to the true area) */
  const I = v => Math.round(v * 1e4);
  for (let i = 0; i < X.length - 1; i++) for (let j = 0; j < Y.length - 1; j++) { const p = [(X[i] + X[i + 1]) / 2, (Y[j] + Y[j + 1]) / 2]; if (member(p)) { aI += (I(X[i + 1]) - I(X[i])) * (I(Y[j + 1]) - I(Y[j])); cellsIn.push([X[i], X[i + 1], Y[j], Y[j + 1]]); } }
  let area = aI / 1e8;
  /* a rectangular clear shape: shapely's area is (x1 - x0)(y1 - y0) on the float corners (rect edge ± inset), whatever the ring's start;
     use the same product so a true halfway area (8.85) rounds as the Python does */
  if (cellsIn.length) {
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity; for (const c of cellsIn) { x0 = Math.min(x0, c[0]); x1 = Math.max(x1, c[1]); y0 = Math.min(y0, c[2]); y1 = Math.max(y1, c[3]); }
    if ((I(x1) - I(x0)) * (I(y1) - I(y0)) === aI) area = (x1 - x0) * (y1 - y0);
  }
  /* 0.05 m cells whose centre lies strictly inside the clear shape (shapely prepared contains) */
  const inside = p => { const e = 1e-9; return [[e, 0], [-e, 0], [0, e], [0, -e]].every(([a, b]) => inRects(cellsIn, [p[0] + a, p[1] + b])); };
  const cs = new Set();
  if (cellsIn.length) {
    const u0 = minOf(cellsIn, c => c[0]), u1 = maxOf(cellsIn, c => c[1]), v0 = minOf(cellsIn, c => c[2]), v1 = maxOf(cellsIn, c => c[3]);
    for (let a = Math.trunc(u0 / STEP) - 1; a < Math.trunc(u1 / STEP) + 2; a++) for (let b = Math.trunc(v0 / STEP) - 1; b < Math.trunc(v1 / STEP) + 2; b++)
      if (inside([(a + 0.5) * STEP, (b + 0.5) * STEP])) cs.add(a + ',' + b);
  }
  const bb = cellsIn.length ? [minOf(cellsIn, c => c[0]), minOf(cellsIn, c => c[2]), maxOf(cellsIn, c => c[1]), maxOf(cellsIn, c => c[3])] : [0, 0, 0, 0];
  return { area, cells: cs, rects: cellsIn, bounds: bb };
}
function localWidth(cells) {
  const C = cells, H = new Map(), V = new Map(), has = (a, b) => C.has(a + ',' + b);
  for (const c of C) { if (H.has(c)) continue; const [a, b] = c.split(',').map(Number); let a0 = a; while (has(a0 - 1, b)) a0--; let a1 = a0; while (has(a1 + 1, b)) a1++; for (let k = a0; k <= a1; k++) H.set(k + ',' + b, (a1 - a0 + 1) * STEP); }
  for (const c of C) { if (V.has(c)) continue; const [a, b] = c.split(',').map(Number); let b0 = b; while (has(a, b0 - 1)) b0--; let b1 = b0; while (has(a, b1 + 1)) b1++; for (let k = b0; k <= b1; k++) V.set(a + ',' + k, (b1 - b0 + 1) * STEP); }
  const out = new Map(); for (const c of C) out.set(c, Math.min(H.get(c), V.get(c))); return out;
}
function maxSquare(cells) {
  if (!cells.size) return 0.0;
  const P = [...cells].map(c => c.split(',').map(Number)), a0 = minOf(P, p => p[0]), a1 = maxOf(P, p => p[0]), b0 = minOf(P, p => p[1]), b1 = maxOf(P, p => p[1]);
  const dp = new Map(); let best = 0;
  for (let b = b0; b <= b1; b++) for (let a = a0; a <= a1; a++) if (cells.has(a + ',' + b)) { const v = 1 + Math.min(dp.get((a - 1) + ',' + b) || 0, dp.get(a + ',' + (b - 1)) || 0, dp.get((a - 1) + ',' + (b - 1)) || 0); dp.set(a + ',' + b, v); if (v > best) best = v; }
  return best * STEP;
}
/* clear size of one room, as audit_geom reads it (area, widest square, width of the largest rectangle's clear part) */
function clearSize(x, rooms, st) {
  const g = clearGeom(x, rooms, st), big = x.r.reduce((m, r) => rArea(r) > rArea(m) ? r : m, x.r[0]);
  let bb = [0, 0, 0, 0];
  if (g.rects.length) { const I = g.rects.map(c => [Math.max(c[0], big[0]), Math.min(c[1], big[1]), Math.max(c[2], big[2]), Math.min(c[3], big[3])]).filter(c => c[1] > c[0] && c[3] > c[2]); if (I.length) bb = [minOf(I, c => c[0]), minOf(I, c => c[2]), maxOf(I, c => c[1]), maxOf(I, c => c[3])]; }
  const [bigW, bigL] = [bb[2] - bb[0], bb[3] - bb[1]].sort((p, q) => p - q);
  return { A: g.area, w: pyRound2(maxSquare(g.cells)), bigW, bigL, cells: g.cells };
}

/* ================= EH-FREEZE-2026-11-11b additions (J.B. 11 Nov 2026, late: hold lifted) =================
   sizing.py     fe04e6175b6a4aae  plant sized to load, KD300 curve, Eaton pads, hub set (KD80–300), battery cabinets
   hubload.py    4cd41a1240bcd17c  hub emergency load, NECB 2020 build-up
   audit_rooms.py 6dabc907ecf9d514 room minimums (RULES, HARD, audit_geom) on clear sizes
   tfboard.py    b01e2d4abc7fb12a  _st (D1), _t, measure (the sizing part), _sizing_row, _hubset_row, _battery_row, _width_row */

/* Python number formatting: f'{x:,.0f}', f'{x:,.1f}', f'{x:.2f}' (round half to even on exact ties, as Python) */
function pyFixed(x, d) {
  /* toFixed rounds the exact binary value correctly except on an exact tie, where it rounds up; Python rounds a tie to even.
     A tie only when the exact decimal expansion is ...5000... after the d-th digit (read from toFixed(d + 30), exact digits). */
  const e = Math.abs(x).toFixed(Math.min(100, d + 30)), dot = e.indexOf('.'), tail = e.slice(dot + 1 + d);
  if (/^50*$/.test(tail)) {
    const keep = e.slice(0, dot + 1 + d).replace(/\.$/, ''), last = Number(keep.slice(-1));
    const down = (last % 2 === 0) ? keep : null;
    if (down !== null) return (x < 0 && Number(down) !== 0 ? '-' : '') + down;
  }
  return x.toFixed(d);
}
const comma = s => { const neg = s.startsWith('-'), t = neg ? s.slice(1) : s, [i, f] = t.split('.'); return (neg ? '-' : '') + i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (f !== undefined ? '.' + f : ''); };
const n0 = x => comma(pyFixed(x, 0)), n1 = x => comma(pyFixed(x, 1)), f2 = x => pyFixed(x, 2), f0 = x => pyFixed(x, 0);
const pyF = v => Number.isInteger(v) ? v.toFixed(1) : String(v);   // repr of a Python float written in the script (3.0 -> '3.0')

/* ---------- sizing.py ---------- */
const GEN = [[300, 'KD300', null], [1000, 'KD1000', [8.43, 2.62]], [2000, 'KD2000', [13.5, 3.5]]];
const TANK300 = [[1855, [4.100, 1.350], 'ADV-10068 sheet 1, 490 gal'], [3634, [5.116, 1.350], 'sheet 1, 960 gal'], [7305, [6.985, 1.900], 'sheet 3, 1,930 gal']];
const TX = [[150, [1.829, 1.346]], [225, [1.930, 1.448]], [300, [1.930, 1.499]], [500, [1.930, 1.651]], [750, [1.930, 1.702]],
  [1000, [1.930, 1.727]], [1500, [2.362, 1.905]], [2000, [2.667, 2.007]], [2500, [2.667, 2.616]]];
const L_PER_KWH = 0.264, DC_HOURS = 12, HUB_HOURS = 72;
const KD300_LH = [[0.25, 27.3], [0.50, 50.7], [0.75, 67.6], [1.00, 83.7]];
function curve(c, f) { f = Math.max(0.25, Math.min(1.0, f)); for (let i = 0; i < c.length - 1; i++) { const [a, la] = c[i], [b, lb] = c[i + 1]; if (f <= b + 1e-9) return la + (lb - la) * (f - a) / (b - a); } return c[c.length - 1][1]; }
const kd300lh = f => curve(KD300_LH, f);
function hubTank(hubKw) { const f = hubKw == null ? 1.0 : hubKw / 300.0, need = kd300lh(f) * HUB_HOURS, t = TANK300.find(t => t[0] >= need) || null; return { need_l: need, tank_l: t ? t[0] : null, footprint: t ? t[1] : null }; }
function gens(Q, hubKw, size) {
  const load = Q * 1000 + (hubKw || 0); let kw, model, fp, duty;
  for ([kw, model, fp] of GEN) { duty = Math.max(1, Math.ceil(load / kw - 1e-9)); if ((size == null && duty <= 3) || kw === size || kw === GEN[GEN.length - 1][0]) break; }
  let tank = Q * 1000 * DC_HOURS * L_PER_KWH / duty, note = '';
  if (kw === 300) tank = kd300lh(load / duty / kw) * DC_HOURS;
  if (fp == null) { const t = TANK300.find(t => t[0] >= tank) || null; fp = t ? t[1] : null; note = t ? t[2] : 'no standard tank holds it ?'; }
  return { kw, model, duty, n: duty + 1, tank_l: tank, footprint: fp, tank_note: note, load_kw: load };
}
/* EH-FREEZE-2026-11-11c: Vancouver up to 1,500 kVA on BC Hydro's pad, 2.21 x 2.21 m (ES54 Table 1); above, and in Edmonton, the Eaton pad */
const BCH_PAD = [2.21, 2.21];
function transformers(Q, hubKw, city = 'v') {
  const kva = Q * 1000 + (hubKw || 0); let size, fp, duty;
  if (kva <= 2500) { [size, fp] = TX.find(t => t[0] >= kva); duty = 1; } else { [size, fp] = TX[TX.length - 1]; duty = Math.ceil(kva / 2500 - 1e-9); }
  let src = 'Eaton CA08104001E, cabinet + 4 in (our reading)';
  if (city === 'v' && size <= 1500) { fp = BCH_PAD; src = 'BC Hydro ES54 Table 1'; }
  return { kva: size, duty, n: duty + 1, pad: fp, pad_src: src, load_kva: kva };
}
function switchMargin(g, t) { return [g.duty * g.kw - g.load_kw, (t.duty === 1 ? t.kva : t.duty * 2500) - t.load_kva]; }
const HUBSETS = [[80, 'KD80', [[0.25, 7.3], [0.50, 15.1], [0.75, 22.1], [1.00, 28.0]], [2.27, 1.149], 'G5-641'],
  [100, 'KD100', [[0.25, 9.5], [0.50, 18.7], [0.75, 26.7], [1.00, 32.9]], [2.27, 1.149], 'G5-642'], [300, 'KD300', KD300_LH, null, 'g5650']];
function hubSet(hubKw) {
  const h = HUBSETS.find(([kw]) => hubKw <= kw + 1e-9);
  if (!h) return { model: '?', kw: null, need_l: null, footprint: null, src: 'load over 300 kW ?' };
  const [kw, model, c, fp0, src] = h, need = curve(c, hubKw / kw) * HUB_HOURS; let fp = fp0, tank = null;
  if (fp == null) { const t = TANK300.find(t => t[0] >= need) || null; fp = t ? t[1] : null; tank = t ? t[0] : null; }
  return { model, kw, load: hubKw / kw, need_l: need, tank_l: tank, footprint: fp, src, enclosure: ENCLOSURE[model] || null };
}
/* EH-FREEZE-2026-11-11c: outdoors the hub set stands in its enclosure (G12-625, KD80 126 x 46 x 65 in); KD100 assumed the same */
const ENCLOSURE = { KD80: [[3.200, 1.168], 'G12-625'], KD100: [[3.200, 1.168], 'G12-625, KD80 size assumed ?'] };
const CAB_KW = { 10: 186.6, 15: 124.4 }, CAB_L = 0.6, CAB_W = 0.75, CAB_FRONT = 0.914, CAB_WALL = 0.025, DOOR_END = 1.1;
const battCabinets = (mw, minutes = 15) => Math.max(1, Math.ceil(mw * 1000 / CAB_KW[minutes] - 1e-9));
function battRoom(n, L, W) {
  [L, W] = [Math.max(L, W), Math.min(L, W)];
  const d1 = CAB_WALL + CAB_W + CAB_FRONT, d2 = 2 * (CAB_WALL + CAB_W) + CAB_FRONT, l1 = n * CAB_L + DOOR_END, l2 = Math.ceil(n / 2) * CAB_L + DOOR_END;
  if (L >= l1 - 1e-6 && W >= d1 - 1e-6) return [true, 1, l1, d1, 0.0];
  if (L >= l2 - 1e-6 && W >= d2 - 1e-6) return [true, 2, l2, d2, 0.0];
  return [false, 2, l2, d2, Math.max(L < l2 ? (l2 - L) / l2 : 0, W < d2 ? (d2 - W) / d2 : 0)];
}

/* ---------- hubload.py ---------- */
const HL_TYPES = [[/stair|lift|shaft/, 'excluded (stairs, lifts, shafts)', 0, 0, 0, null], [/exit passage|corridor/, 'corridor', 4.4, 0, 0, null],
  [/lobby/, 'lobby', 9.0, 1, 0, null], [/refuge|shelter|rest area|day room/, 'refuge: fire station sleeping quarters', 2.5, 2.5, 500, 'people'],
  [/\bwcs?\b|washroom|shower|toilet/, 'washroom', 6.8, 1, 0, null], [/exam|consult|procedure|first aid|treatment/, 'healthcare exam/treatment', 15.1, 10, 90, 20],
  [/nurse/, "healthcare nurses' station", 12.6, 2.5, 45, 20], [/recovery/, 'healthcare recovery room', 13.5, 10, 180, 20],
  [/patient/, 'healthcare patient room', 7.3, 10, 90, 20], [/kitchen|food/, 'food preparation', 11.7, 10, 0, null], [/laundry/, 'laundry', 5.7, 20, 0, null],
  [/office/, 'office', 8.0, 7.5, 0, null], [/lounge|waiting/, 'lounge', 6.3, 1, 0, null], [/storage|cot|medication|clean supply|soiled|housekeeping|janitor/, 'storage', 5.5, 1, 0, null]];
const HL_OTHER = ['other (lounge values)', 6.3, 1, 0, null];
function hubLoad(G, people) {
  let li = 0, rc = 0, sw = 0, used = false; const other = new Set();
  for (const st of storeys(G)) for (const x of roomsOf(G, st)) {
    if (!['pub', 'clin', 'circ'].includes(x.g)) continue;
    if (x.g === 'circ' && x.n.toLowerCase().includes('secure')) continue;
    const A = x.r.reduce((s, r) => s + rArea(r), 0), l = x.n.toLowerCase(), t = HL_TYPES.find(t => t[0].test(l)), [lab, a, b, s, occ] = t ? t.slice(1) : HL_OTHER;
    li += A * a; rc += A * b;
    if (s && occ === 'people' && !used) { sw += people * s; used = true; } else if (s && typeof occ === 'number') sw += A / occ * s;
    if (lab.startsWith('other')) other.add(x.n.split(' (')[0]);
  }
  return { kw: (li + rc + sw) / 1000, light: li / 1000, plug: rc / 1000, swh: sw / 1000, other: [...other].sort() };
}

/* ---------- audit_rooms.py: room minimums ---------- */
const RULES = [
  [/loading space/, 3.4, null, 'Class B 3.4 m (Parking By-law 5.5.1.2)', 'loading space'], [/exit passage|exit steps/, 1.1, null, 'VBBL 3.3.1.9 / 3.4.3.2 1.1 m', 'exit passage|exit steps'],
  [/mechanical|panel|shaft|riser/, 1.0, null, 'access; our judgment ?', 'mechanical|panel|shaft|riser'], [/truck aisle|drive/, 6.1, null, '6.1 m aisle (5.4.1)', 'truck aisle|drive'],
  [/corridor/, 1.8, null, 'spec Part 3: 2.0 public/secure, 1.8 clinic; code 1.1', 'corridor'], [/stair/, 2.4, null, 'two 1.1 m flights side by side ~2.4 m; our arithmetic ?', 'stair'],
  [/dock|lobby/, 2.4, null, 'two people passing with a trolley; our judgment ?', 'dock|lobby'], [/freight lift|lift e2/, 2.4, null, 'spec car 2.5 x 3.4 is the car, shaft drawn 2.4+ (drawing choice ?)', 'freight lift|lift e2'],
  [/lift/, 2.0, null, 'accessible car ~1.7 + shaft; our judgment ?', 'lift'],
  [/universal wc|universal washroom|clinic universal/, 1.7, 5.3, 'J.B.: 1,700 mm circle clear of the WC and its 900 mm transfer space (VBBL 3.8.3.13): 1.7 x 3.2 at least, our arithmetic', 'universal wc|universal washroom|clinic universal'],
  [/shower/, 1.5, 2.7, 'VBBL 3.8.3.17 1.5 x 0.9 + 0.9 clear', 'shower'], [/\bwcs?\b|washroom|toilet/, 1.5, null, 'single WC 1.5; our judgment ?', '\\bwcs?\\b|washroom|toilet'],
  [/procedure/, 3.0, 15.5, 'J.B. 8 Nov: 3.0 m (step 6); AHS 15.5 m2', 'procedure'], [/exam|consult/, 3.0, 12.0, 'J.B. 8 Nov: 3.0 m (step 6); AHS 12.0 m2', 'exam|consult'],
  [/medication/, 1.5, 10.0, 'audit 1.5 m ?; AHS 10.0 m2', 'medication'], [/clean supply/, 1.5, 11.0, 'audit 1.5 m ?; AHS 11.0 m2', 'clean supply'],
  [/soiled/, 1.5, 13.5, 'audit 1.5 m ?; AHS 13.5 m2', 'soiled'], [/housekeeping/, 1.5, 7.0, 'audit 1.5 m ?; AHS 7.0 m2', 'housekeeping'],
  [/shipping|receiving/, 2.4, null, 'trolley + aisle; our judgment ?', 'shipping|receiving'], [/cylinder/, 1.5, null, 'cylinders + access; our judgment ?', 'cylinder'],
  [/first aid/, 2.7, 9.3, 'J.B. 8 Nov: 2.7 m (step 6); WorkSafeBC 9.3 m2', 'first aid'], [/data hall/, 6.0, null, 'two rack rows + aisles 6.0 m; our arithmetic ?', 'data hall'],
  [/ups|battery|switchgear|electrical|\bmv\b/, 3.0, null, 'J.B. 8 Nov: 3.0 m (CEC 2-308 second-hand ?)', 'ups|battery|switchgear|electrical|\\bmv\\b'],
  [/meet-me|noc|office|lounge|break|staff room/, 2.4, null, 'J.B. 8 Nov: 2.4 m (step 6)', 'meet-me|noc|office|lounge|break|staff room'],
  [/medication|clean|soiled|housekeeping|janitor|storage|cot|garbage|valve/, 1.5, null, 'J.B. 8 Nov: 1.5 m (step 6)', 'medication|clean|soiled|housekeeping|janitor|storage|cot|garbage|valve'],
  [/vestibule|portal|guard/, 1.8, null, '1.8 m portal (GCPSG-015)', 'vestibule|portal|guard'],
  [/shelter/, 4.0, 56.0, 'J.B. 8 Nov: 4.0 m; room minimums rule: shelter 16 guests x 3.5 m2 = 56 m2 (fix batch 10 Nov, finding 8)', 'shelter'],
  [/refuge|shelter|waiting|rest area/, 4.0, null, 'J.B. 8 Nov: 4.0 m refuge and shelter (waiting: our judgment ?)', 'refuge|shelter|waiting|rest area'],
  [/mechanical|panel|shaft|riser/, 1.0, null, 'access; our judgment ?', 'mechanical|panel|shaft|riser']];
const HARD = { 'loading space': [true, null], 'exit passage|exit steps': [true, null], 'truck aisle|drive': [true, null],
  'universal wc|universal washroom|clinic universal': [true, true], 'shower': [true, true], 'procedure': [false, true], 'exam|consult': [false, true],
  'medication': [false, true], 'clean supply': [false, true], 'soiled': [false, true], 'housekeeping': [false, true], 'first aid': [false, true],
  'ups|battery|switchgear|electrical|\\bmv\\b': [true, null], 'vestibule|portal|guard': [true, null], 'shelter': [false, true] };
const CORRIDOR_CODE = 1.1;
function hard(n) { const l = n.toLowerCase(); for (const R of RULES) if (R[0].test(l)) { const h = HARD[R[4]] || [false, false]; return [!!h[0], !!h[1]]; } return [false, false]; }
function rule(n) { const l = n.toLowerCase(); for (const R of RULES) if (R[0].test(l)) return [R[1], R[2], R[3]]; return null; }
function auditGeom(S, name = '', fold = '') {
  const rows = [];
  for (const st of Object.keys(S).map(Number).sort((a, b) => a - b)) {
    const rooms = S[String(st)];
    for (const x of rooms) {
      const rs = x.r, A0 = rs.reduce((s, r) => s + rArea(r), 0);
      const big = rs.reduce((m, r) => rArea(r) > rArea(m) ? r : m, rs[0]), L = Math.max(big[1] - big[0], big[3] - big[2]), shb = Math.min(big[1] - big[0], big[3] - big[2]);
      const c = clearSize(x, rooms, st), A = c.A, w = c.w, LW = localWidth(c.cells), bigW = c.bigW, bigL = c.bigL;
      const nl = x.n.toLowerCase(), ru = !(['spare', 'sup'].includes(x.g) && nl.includes('refuge')) ? rule(x.n) : null, issue = [], kind = [];
      let basis;
      if (ru) {
        let [mw, ma, b] = ru; basis = b;
        if (mw === 3.4 && fold.startsWith('e')) { mw = 3.3; basis = 'Edmonton Zoning Bylaw Table 7.2: 9.0 x 3.3 m'; }
        const [hw, ha] = hard(x.n);
        if (w + 1e-6 < mw) { issue.push(`clear width ${f2(w)} < ${pyF(mw)}`); kind.push(hw ? 'hard' : 'judged'); }
        if (/corridor/.test(nl) && w + 1e-6 < CORRIDOR_CODE) { issue.push(`clear width ${f2(w)} < ${pyF(CORRIDOR_CODE)} (code)`); kind.push('hard'); }
        if (ma && A + 1e-6 < ma) { issue.push(`area ${pyFixed(A, 1)} < ${pyF(ma)}`); kind.push(ha ? 'hard' : 'judged'); }
        if (/universal wc|clinic universal/.test(nl) && !(bigW >= 1.7 - 1e-6 && bigL >= 3.2 - 1e-6)) { issue.push(`${f2(bigW)} x ${f2(bigL)}: needs 1.7 x 3.2 (1.7 m circle beside a 1.6 x 1.5 m WC + 0.9 m transfer zone, our arithmetic ?)`); kind.push('hard'); }
      } else basis = 'no rule';
      const ispub = nl.includes('refuge') && !nl.includes('staff') && x.g === 'pub';
      let thin = 0; if (ispub) for (const v of LW.values()) if (v < 2.4 - 1e-6) thin += STEP * STEP;
      const cnt = A - thin, note = ispub && thin > 0.05 ? `${pyFixed(thin, 1)} m2 under 2.4 m wide, not counted (counts ${pyFixed(cnt, 1)})` : '';
      if (L / Math.max(shb, 0.01) > 6 && rs.length === 1 && !/corridor|passage|stair|aisle|drive|shaft|riser|lift/.test(nl)) { issue.push(`very long and thin (${pyFixed(L, 1)} x ${pyFixed(shb, 1)})`); kind.push('judged'); }
      rows.push({ st, id: x.id, n: x.n, A: pyRound1(A), A_centre: pyRound1(A0), Acount: pyRound1(cnt), w: pyRound2(w), L: pyRound2(L), issue, kind, basis, note, clear: true });
    }
  }
  const pubref = rows.filter(r => r.n.toLowerCase().includes('refuge') && !r.n.toLowerCase().includes('staff') && !r.n.toLowerCase().startsWith('unassigned'));
  if (pubref.length) {
    const mr = pubref.reduce((m, r) => r.Acount > m.Acount ? r : m, pubref[0]), small = name.startsWith('1330') || name === 'small';
    if (mr.Acount + 1e-6 < 175 && !(small && pubref.reduce((s, r) => s + r.Acount, 0) >= 175)) { mr.issue.push(`refuge main room counts ${pyF(mr.Acount)} m2 < 175 (J.B. 8 Nov)`); mr.kind.push('hard'); }
  }
  return rows;
}

/* ---------- tfboard.py: D1 and the rows ---------- */
const TIGHT = 'tight: check in design (J.B. 9 Nov: within 0.5 m or 5 % of the limit)';
/* D1 (J.B. 10 Nov late): within 0.5 m (lengths) or 5 % of the limit (rel) on EITHER side is tight; past it by more is fail.
   Returns 'pass' | 'fail' | 'tight', or {st:'tight', over, unit} when past the limit (the Python's _Tight). */
function st_(ok, margin, rel, limit) {
  const tol = rel && limit ? 0.05 * limit : 0.5;
  if (!ok) { if (-tol - 1e-9 <= margin && margin <= 1e-9) return { st: 'tight', over: -margin, unit: rel ? '' : ' m' }; return 'fail'; }
  return margin < tol - 1e-9 ? 'tight' : 'pass';
}
const S_ = s => typeof s === 'object' ? s.st : s;
function t_(s, txt) { if (typeof s === 'object' && s.over != null) return txt + ` — tight: over by ${f2(s.over)}${s.unit}, fix in design (J.B. 10 Nov: within 0.5 m or 5 % past the limit; never compliant)`; return txt + (S_(s) === 'tight' ? ' — ' + TIGHT : ''); }
const rArea2 = x => x.r.reduce((s, r) => s + rArea(r), 0);
/* the sizing part of tfboard.measure (MW from the hall at 630 m² a MW, Q × 1.55, people from the counted refuge, hub load, sets) */
function measureSizing(G, cfg) {
  let hall = 0; for (const st of storeys(G)) for (const x of roomsOf(G, st)) if (x.g === 'hall') hall += rArea2(x);
  const MW = hall / 630, Q = MW * 1.55, m = { hall, MW, Q };
  const rr = auditGeom({ 1: roomsOf(G, 1) }).filter(r => (cfg.refuge_ids || []).includes(r.id));
  m.ref_counted = rr.reduce((s, r) => s + r.Acount, 0); m.ref_main = rr.length ? Math.max(...rr.map(r => r.Acount)) : 0.0;
  m.people = Math.trunc(Math.floor(m.ref_counted / 3.5));
  m.hub = hubLoad(G, m.people);
  const g = gens(Q, 0.0), t = transformers(Q, m.hub.kw, cfg.city === 'edm' ? 'e' : 'v');
  Object.assign(m, { sz_gen: g, sz_tx: t, ngen: g.n, genkw: g.kw, ntx: t.n, tank: g.tank_l });
  if (cfg.sizing_fallback_kw) { const d = gens(Q, 0.0, cfg.sizing_fallback_kw); m.ngen = d.n; m.genkw = d.kw; m.tank = d.tank_l; }
  m.hub_tank = hubTank(m.hub.kw); m.hub_set = hubSet(m.hub.kw); m.sz_margin = switchMargin(g, t);
  return m;
}
function hubgen(G) {
  const p = (G.PLANT || []).filter(x => x.id.startsWith('h'));
  if (p.length) return [p[0].n, Array.isArray(p[0].r[0]) ? p[0].r[0] : p[0].r, 'grade'];
  const hg = get(G, 'HUBGEN', null); return hg ? [hg[1], hg[0], 'room'] : [null, null, null];
}
function sizingRow(G, cfg, m) {
  const g = m.sz_gen, t = m.sz_tx, dg = (G.PLANT || []).filter(p => p.n.includes('enerator') && !p.id.startsWith('h'));
  let ng = dg.length; const kws = [], kvas = [], add = (a, v) => { if (!a.includes(v)) a.push(v); };
  for (const p of dg) { const k = /([\d,]+) kW/.exec(p.n); add(kws, k ? parseInt(k[1].replace(/,/g, ''), 10) : 1000); }
  if (!ng) for (const st of storeys(G)) for (const x of roomsOf(G, st)) if (x.n.toLowerCase().startsWith('generator room')) {
    let k = /(\d+) sets/.exec(x.n); ng += k ? parseInt(k[1], 10) : 0; k = /([\d,]+) kW/.exec(x.n); add(kws, k ? parseInt(k[1].replace(/,/g, ''), 10) : 1000);
  }
  const tp = (G.PLANT || []).filter(p => p.id.startsWith('t')), nt = tp.length;
  for (const p of tp) { const k = /([\d,]+) kVA/.exec(p.n); add(kvas, k ? parseInt(k[1].replace(/,/g, ''), 10) : 2500); }
  const dkw = kws.length === 1 ? kws[0] : null, dkva = kvas.length === 1 ? kvas[0] : null;
  const fp = g.footprint ? `${f2(g.footprint[0])} × ${f2(g.footprint[1])} m` : '?', hb = m.hub, [gm, tm] = m.sz_margin;
  let txt = `data centre ${n1(m.MW)} MW × 1.55 = ${n1(m.Q)} MW on its own sets: generators ${g.duty} + 1 spare × ${comma(String(g.kw))} kW `
    + `(${g.model}, ${fp}${g.tank_note ? ', ' + g.tank_note : ''}; 12 h fuel ${n0(g.tank_l)} L a duty set); transformers carry the data centre and the hub `
    + `${n0(hb.kw)} kW (normal power, our reading): ${t.duty} + 1 × ${comma(String(t.kva))} kVA (pad ${f2(t.pad[0])} × ${f2(t.pad[1])} m, ${t.pad_src}). `
    + `Drawn: ${ng} × ${dkw ? comma(String(dkw)) : '?'} kW sets, ${nt} × ${dkva ? comma(String(dkva)) : '?'} kVA pads. Rule: smallest set size with at most 3 duty sets `
    + `(our reading), N+1; Rehlko KD230–300 ADV-10068 and g5650 fuel curve, KD1000, KD2000 (fuel 0.264 L/kWh, register fuel_on_site; maker claims). `   /* EH-FREEZE-2026-11-11c wording: the pad source now sits with the pad */
    + `Headroom before a step up: generators ${n0(gm)} kW, transformers ${n0(tm)} kVA`;
  const near = gm < 100 || tm < 100, sameG = ng === g.n && dkw === g.kw, sameT = nt === t.n && dkva === t.kva, fb = cfg.sizing_fallback;
  if (!sameG && fb) txt += ' — ' + fb + ' (next size up: J.B. 11 Nov)'; else if (!(sameG && sameT)) txt += ' — differs from the drawing: board fix pending';
  if (near) txt += ' — within 0.1 MW of a sizing switch point (fans and space heat ? could step it up): ' + TIGHT.replace('J.B. 9 Nov', 'D1, J.B. 11 Nov');
  const st = (!sameG && fb) || !(sameG && sameT) ? 'flag' : (near ? 'tight' : 'pass');
  return [st, 'Plant sized to load', 'J.B. 11 Nov (sizing to load); eh/sizing.py', txt];
}
function hubsetRow(G, cfg, m) {
  const hs = m.hub_set, [nm, r, where] = hubgen(G), src = 'J.B. 11 Nov (own set); eh/sizing.hub_set';
  let fp = hs.footprint ? `${f2(hs.footprint[0])} × ${f2(hs.footprint[1])} m` : '?';
  if (hs.enclosure) { const e_ = hs.enclosure; fp = `drawn in its enclosure ${f2(e_[0][0])} × ${f2(e_[0][1])} m (${e_[1]}; the open set is ${fp})`; }
  let txt = `hub load ${n0(m.hub.kw)} kW (NECB 2020 build-up; fans and space heat ?) → ${hs.model} (${hs.kw} kW standby, ${f0(hs.load * 100)} % load; `
    + `Rehlko ${hs.src}, maker claim): 72 h at that load on its curve ${n0(hs.need_l)} L in a sub-base tank`
    + (hs.tank_l ? ` (${n0(hs.tank_l)} L, ADV-10068)` : ' (tank sizes not published ?: drawn under the enclosure)') + `, set ${fp}. `;
  if (!nm) return ['fail', 'Hub generator (72 h)', src, txt + 'Not drawn.'];
  const ok = nm.includes(hs.model);
  txt += `Drawn: ${nm} (${where === 'grade' ? 'at grade; clearances with the other sets (Generator tanks row)' : 'in its own 2 h room'}, ${f2(r[1] - r[0])} × ${f2(r[3] - r[2])} m)`;
  if (!ok) return ['fail', 'Hub generator (72 h)', src, txt + ' — model differs from the rule'];
  if (where === 'grade' && hs.enclosure) {   /* EH-FREEZE-2026-11-11c: outdoors the drawn rectangle is the enclosure */
    const L_ = Math.max(r[1] - r[0], r[3] - r[2]), W_ = Math.min(r[1] - r[0], r[3] - r[2]), [eL, eW] = hs.enclosure[0];
    if (L_ < eL - 0.05 || W_ < eW - 0.05) return ['fail', 'Hub generator (72 h)', src, txt + ` — drawn smaller than its enclosure (${f2(eL)} × ${f2(eW)} m)`];
  }
  if (where === 'room') {
    const rm = []; for (const st of storeys(G)) for (const x of roomsOf(G, st)) for (const q of x.r) if (q[0] <= r[0] + 1e-6 && q[1] >= r[1] - 1e-6 && q[2] <= r[2] + 1e-6 && q[3] >= r[3] - 1e-6) rm.push(q);
    if (!rm.length) return ['fail', 'Hub generator (72 h)', src, txt + ' — not inside a drawn room'];
    const q = rm[0], side = (r[1] - r[0]) < (r[3] - r[2]) ? Math.min(r[0] - q[0], q[1] - r[1]) : Math.min(r[2] - q[2], q[3] - r[3]);
    const s = st_(side >= 1.0 - 1e-6, side - 1.0);
    return [S_(s), 'Hub generator (72 h)', src, t_(s, txt + `; ${n1(side)} m to the side walls (≥ 1.0, our reading)`)];
  }
  return ['pass', 'Hub generator (72 h)', src, txt];
}
function batteryRow(G, cfg, m) {
  const rows = auditGeom(G.S, cfg.small_lot ? 'small' : '', cfg.city === 'edm' ? 'e' : 'v');
  const br = rows.filter(r => r.n.toLowerCase().startsWith('battery room') && !r.n.toLowerCase().includes('hvac'));
  const n15 = battCabinets(m.MW, 15), n10 = battCabinets(m.MW, 10);
  const src = 'J.B. 11 Nov (10–15 min, FM 5-32 3.5.2.1); tool/engine.js R.equip.cabKW, tool/dcrooms.js; Vertiv EnergyCore Li5 31.1 kWh (maker claim)';
  if (!br.length) return ['fail', 'Battery cabinets (UPS 10–15 min)', src, `${n15} cabinets for 15 min: no battery room drawn`];
  const r = br.reduce((a, b) => b.A > a.A ? b : a, br[0]), [fits, rws, l, d, sh] = battRoom(n15, r.L, r.w);
  const txt = `data centre ${n1(m.MW)} MW: ${n15} cabinets for 15 min (${n10} for 10 min; 124.4 / 186.6 kW a cabinet, our arithmetic); `
    + `${rws === 1 ? 'one row' : 'two rows facing one 0.914 m aisle (our reading)'} needs ${pyFixed(l, 1)} × ${f2(d)} m clear; `
    + `${r.n.split(',')[0]} (storey ${r.st}) is ${pyFixed(r.L, 1)} × ${f2(r.w)} m clear`;
  if (fits) return ['pass', 'Battery cabinets (UPS 10–15 min)', src, txt];
  const s = st_(false, -sh, true, 1.0);
  return [S_(s), 'Battery cabinets (UPS 10–15 min)', src, txt + ` — short by ${f0(sh * 100)} %`];
}
function widthRow(G, cfg) {
  const rows = auditGeom(G.S, cfg.small_lot ? 'small' : '', cfg.city === 'edm' ? 'e' : 'v'), bad = rows.filter(r => r.issue.length);
  const minw = r => { const ru = rule(r.n); return ru ? ru[0] : null; };
  const near = rows.filter(r => !r.issue.length && minw(r) && r.w < 1.05 * minw(r) - 1e-9);
  const src0 = 'J.B. 8 Nov minimum widths (mostly step 6, drawing choice); eh/audit_rooms.py';
  if (!bad.length && near.length) return ['tight', 'Room widths and shapes', src0, `all ${rows.length} rooms meet their minimum clear width; ${near.length} sit within 5 % of it (` + [...new Set(near.map(r => r.n.split(' (')[0].replace(/[0-9 ]+$/, '')))].sort().join(', ') + ') — ' + TIGHT];
  if (!bad.length) return ['pass', 'Room widths and shapes', src0, `all ${rows.length} rooms meet their minimum clear width; universal WCs hold the 1.7 m circle beside the WC transfer zone (our arithmetic ?)`];
  function issSt(r, iss, k) {
    if (k === 'judged') return 'judged';
    const ru = rule(r.n);
    if (iss.startsWith('clear width') && iss.includes('(code)')) return S_(st_(false, r.w - CORRIDOR_CODE, true, CORRIDOR_CODE));
    if (iss.startsWith('clear width') && ru) return S_(st_(false, r.w - ru[0], true, ru[0]));
    if (iss.startsWith('area') && ru && ru[1]) return S_(st_(false, r.A - ru[1], true, ru[1]));
    if (iss.startsWith('refuge main room counts')) return S_(st_(false, r.Acount - 175, true, 175));
    if (iss.includes('needs 1.7 x 3.2')) { const [W_, L_] = iss.split(':')[0].split(' x ').map(Number); return S_(st_(false, -Math.max((1.7 - W_) / 1.7, (3.2 - L_) / 3.2, 0.0), true, 1.0)); }
    return 'fail';
  }
  const roomSt = r => { const o = r.issue.map((i, k) => issSt(r, i, (r.kind || [])[k] || 'hard')); return o.includes('fail') ? 'fail' : (o.includes('tight') ? 'tight' : 'judged'); };
  const sts = bad.map(roomSt), stw = sts.includes('fail') ? 'fail' : 'tight';
  const nm = r => (Object.keys(G.S).length > 1 ? `st${r.st} ` : '') + r.n.split(' (')[0].split(',')[0];
  const ls = (r, want) => r.issue.filter((i, k) => ((r.kind || [])[k] === 'judged') === (want === 'judged')).map(i => i.split(':')[0]).join(', ');
  const fl = bad.filter((r, i) => sts[i] === 'fail'), tl = bad.filter((r, i) => sts[i] === 'tight'), jl = bad.filter(r => (r.kind || []).includes('judged'));
  const txt = 'clear sizes inside the walls (J.B. 11 Nov); only sourced minimums (steps 1-4) fail, steps 5-6 read tight, judged (J.B. 11 Nov). '
    + `${fl.length} more than 5 % under a sourced minimum (fail): ` + (fl.map(r => `${nm(r)} (${ls(r, 'hard')})`).join('; ') || 'none')
    + ` · ${tl.length} 5 % or less under a sourced minimum (tight: check in design, D1): ` + (tl.map(nm).join(', ') || 'none')
    + ` · ${jl.length} under a judged minimum (tight, judged): ` + (jl.map(nm).join(', ') || 'none') + ` · ${rows.length} rooms checked`;
  return [stw, 'Room widths and shapes', 'J.B. 8 Nov minimum widths; eh/audit_rooms.py', txt];
}

/* ================= remaining board scripts (J.B. 11 Nov 2026: port in full, same method) =================
   deadend.py aa10e3fde2181264 · egress2.py 6384340c3f170537 · egress3.py 0899ee81148da1ed · walkload.py a128dc3a63b22752 ·
   sep2h.py 1d79eead43134f8b · padcheck.py 525e0b7d6624c81b · intakes.py 8e232c5089540c2d · fuelfill.py 293b18fe176c12f0 ·
   claims.py ea19cf7902a44e16 · tfboard.py b01e2d4abc7fb12a (zone_exits, _egress_row, _area_row, _walk_row, common_checks) */

/* ---------- small geometry kit (what the scripts ask shapely for: distances, boundary pieces, clipped areas) ---------- */
const ptInPoly = (p, P) => insideP(p, P);
function segSegD(a, b, c, d) {
  const cross = (o, p, q) => (p[0] - o[0]) * (q[1] - o[1]) - (p[1] - o[1]) * (q[0] - o[0]);
  const d1 = cross(c, d, a), d2 = cross(c, d, b), d3 = cross(a, b, c), d4 = cross(a, b, d);
  if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) return 0;
  return Math.min(segD(a, c, d), segD(b, c, d), segD(c, a, b), segD(d, a, b));
}
const rectPoly = r => [[r[0], r[2]], [r[1], r[2]], [r[1], r[3]], [r[0], r[3]]];
/* GEOS's own distance arithmetic (Distance::pointToSegment, segmentToSegment), so float ties fall as shapely's */
const gPP = (p, a) => Math.sqrt((p[0] - a[0]) * (p[0] - a[0]) + (p[1] - a[1]) * (p[1] - a[1]));
function gPS(p, A, B) {
  if (A[0] === B[0] && A[1] === B[1]) return gPP(p, A);
  const len2 = (B[0] - A[0]) * (B[0] - A[0]) + (B[1] - A[1]) * (B[1] - A[1]), r = ((p[0] - A[0]) * (B[0] - A[0]) + (p[1] - A[1]) * (B[1] - A[1])) / len2;
  if (r <= 0.0) return gPP(p, A); if (r >= 1.0) return gPP(p, B);
  const s = ((A[1] - p[1]) * (B[0] - A[0]) - (A[0] - p[0]) * (B[1] - A[1])) / len2; return Math.abs(s) * Math.sqrt(len2);
}
function gSS(A, B, C, D) {
  if (A[0] === B[0] && A[1] === B[1]) return gPS(A, C, D);
  if (C[0] === D[0] && C[1] === D[1]) return gPS(D, A, B);
  let no = false;
  if (Math.max(A[0], B[0]) < Math.min(C[0], D[0]) || Math.min(A[0], B[0]) > Math.max(C[0], D[0]) || Math.max(A[1], B[1]) < Math.min(C[1], D[1]) || Math.min(A[1], B[1]) > Math.max(C[1], D[1])) no = true;
  else { const den = (B[0] - A[0]) * (D[1] - C[1]) - (B[1] - A[1]) * (D[0] - C[0]); if (den === 0) no = true; else { const rn = (A[1] - C[1]) * (D[0] - C[0]) - (A[0] - C[0]) * (D[1] - C[1]), sn = (A[1] - C[1]) * (B[0] - A[0]) - (A[0] - C[0]) * (B[1] - A[1]), s = sn / den, r = rn / den; if (r < 0 || r > 1 || s < 0 || s > 1) no = true; } }
  return no ? Math.min(gPS(A, C, D), gPS(B, C, D), gPS(C, A, B), gPS(D, A, B)) : 0.0;
}
const gBox = r => [[r[1], r[2]], [r[1], r[3]], [r[0], r[3]], [r[0], r[2]]];   /* shapely box(), ccw: (maxx, miny) first */
const gRing = P => P.map((p, i) => [p, P[(i + 1) % P.length]]);
function gPolyD(A, B) { if (A.some(p => insideP(p, B)) || B.some(p => insideP(p, A))) return 0; let m = Infinity; for (const [a, b] of gRing(A)) for (const [c, d] of gRing(B)) m = Math.min(m, gSS(a, b, c, d)); return m; }
function gPolySegs(A, segs) { let m = Infinity; for (const [c, d] of segs) { if (insideP(c, A) || insideP(d, A)) return 0; for (const [a, b] of gRing(A)) m = Math.min(m, gSS(a, b, c, d)); } return m; }
const polyOf = s => isRect(s) ? rectPoly(s) : s.map(p => [p[0], p[1]]);
const edgesOf = P => P.map((p, i) => [p, P[(i + 1) % P.length]]);
/* distance between two polygons (0 when they overlap or touch), as shapely's distance */
function polyD(A, B) {
  if (A.some(p => ptInPoly(p, B)) || B.some(p => ptInPoly(p, A))) return 0;
  let m = Infinity; for (const [a, b] of edgesOf(A)) for (const [c, d] of edgesOf(B)) m = Math.min(m, segSegD(a, b, c, d));
  return m;
}
function polySegsD(A, segs) {
  let m = Infinity; for (const [c, d] of segs) { if (ptInPoly(c, A) || ptInPoly(d, A)) return 0; for (const [a, b] of edgesOf(A)) m = Math.min(m, segSegD(a, b, c, d)); }
  return m;
}
/* the parts of segment [a, b] outside a set of convex polygons (flat-capped buffers of gate or street lines) */
function segMinus(a, b, cuts) {
  let iv = [[0, 1]];
  for (const C of cuts) {
    let t0 = 0, t1 = 1; const n = C.length; let inside = true;
    for (let i = 0; i < n && inside; i++) {   /* Cyrus–Beck against a convex polygon (any orientation) */
      const p = C[i], q = C[(i + 1) % n], cx = C.reduce((s, z) => s + z[0], 0) / n, cy = C.reduce((s, z) => s + z[1], 0) / n;
      let nx = q[1] - p[1], ny = -(q[0] - p[0]); if ((cx - p[0]) * nx + (cy - p[1]) * ny > 0) { nx = -nx; ny = -ny; }   /* outward normal */
      const num = (a[0] - p[0]) * nx + (a[1] - p[1]) * ny, den = (b[0] - a[0]) * nx + (b[1] - a[1]) * ny;
      if (Math.abs(den) < 1e-15) { if (num > 0) inside = false; continue; }
      const t = -num / den; if (den < 0) t0 = Math.max(t0, t); else t1 = Math.min(t1, t);
      if (t0 > t1) inside = false;
    }
    if (!inside || t1 - t0 < 1e-12) continue;
    iv = iv.flatMap(([s, e]) => (t1 <= s || t0 >= e) ? [[s, e]] : [[s, Math.max(s, t0)], [Math.min(e, t1), e]].filter(([x, y]) => y - x > 1e-12));
  }
  return iv.map(([s, e]) => [[a[0] + (b[0] - a[0]) * s, a[1] + (b[1] - a[1]) * s], [a[0] + (b[0] - a[0]) * e, a[1] + (b[1] - a[1]) * e]]);
}
/* a segment buffered with flat caps (cap_style=2): the rectangle around it */
function flatBuf(a, b, d) { const L = hyp(b[0] - a[0], b[1] - a[1]) || 1, nx = -(b[1] - a[1]) / L * d, ny = (b[0] - a[0]) / L * d; return [[a[0] + nx, a[1] + ny], [b[0] + nx, b[1] + ny], [b[0] - nx, b[1] - ny], [a[0] - nx, a[1] - ny]]; }
/* area of a polygon clipped to an axis-aligned box (Sutherland–Hodgman) */
function clipArea(P, bx) {
  let poly = P.slice();
  const edges = [[p => p[0] >= bx[0], (p, q) => { const t = (bx[0] - p[0]) / (q[0] - p[0]); return [bx[0], p[1] + t * (q[1] - p[1])]; }],
    [p => p[0] <= bx[1], (p, q) => { const t = (bx[1] - p[0]) / (q[0] - p[0]); return [bx[1], p[1] + t * (q[1] - p[1])]; }],
    [p => p[1] >= bx[2], (p, q) => { const t = (bx[2] - p[1]) / (q[1] - p[1]); return [p[0] + t * (q[0] - p[0]), bx[2]]; }],
    [p => p[1] <= bx[3], (p, q) => { const t = (bx[3] - p[1]) / (q[1] - p[1]); return [p[0] + t * (q[0] - p[0]), bx[3]]; }]];
  for (const [inside, cut] of edges) {
    const out = []; for (let i = 0; i < poly.length; i++) { const p = poly[i], q = poly[(i + 1) % poly.length]; if (inside(p)) { out.push(p); if (!inside(q)) out.push(cut(p, q)); } else if (inside(q)) out.push(cut(p, q)); }
    poly = out; if (!poly.length) return 0;
  }
  let s = 0; for (let i = 0; i < poly.length; i++) { const p = poly[i], q = poly[(i + 1) % poly.length]; s += p[0] * q[1] - q[0] * p[1]; } return Math.abs(s) / 2;
}
/* union area of axis-aligned rectangles inside a box (exact, compressed grid) */
function rectUnionArea(rs, bx) {
  const C = rs.map(r => [Math.max(r[0], bx[0]), Math.min(r[1], bx[1]), Math.max(r[2], bx[2]), Math.min(r[3], bx[3])]).filter(r => r[1] > r[0] && r[3] > r[2]);
  if (!C.length) return 0;
  const xs = uniqRaw(C.flatMap(r => [r[0], r[1]])), ys = uniqRaw(C.flatMap(r => [r[2], r[3]])); let a = 0;
  for (let i = 0; i < xs.length - 1; i++) for (let j = 0; j < ys.length - 1; j++) { const p = [(xs[i] + xs[i + 1]) / 2, (ys[j] + ys[j + 1]) / 2]; if (C.some(r => r[0] <= p[0] && p[0] <= r[1] && r[2] <= p[1] && p[1] <= r[3])) a += (xs[i + 1] - xs[i]) * (ys[j + 1] - ys[j]); }
  return a;
}
/* pieces of a union-of-rectangles boundary lying within dist of a set of rectangles: [[a, b] point pairs], merged where they join */
function boundaryNear(rs, near, dist) {
  const out = [];
  for (const e of boundary(rs)) {
    const iv = [];
    for (const q of near) {
      const dd = e.o === 'v' ? Math.max(q[0] - e.c, 0, e.c - q[1]) : Math.max(q[2] - e.c, 0, e.c - q[3]);
      if (dd > dist + 1e-12) continue;
      const ext = Math.sqrt(Math.max(0, dist * dist - dd * dd)), lo = (e.o === 'v' ? q[2] : q[0]) - ext, hi = (e.o === 'v' ? q[3] : q[1]) + ext;
      const a = Math.max(e.a, lo), b = Math.min(e.b, hi); if (b > a + 1e-12) iv.push([a, b]);
    }
    iv.sort((p, q) => p[0] - q[0]); const M = [];
    for (const v of iv) { const l = M[M.length - 1]; if (l && v[0] <= l[1] + 1e-12) l[1] = Math.max(l[1], v[1]); else M.push(v.slice()); }
    for (const [a, b] of M) out.push(e.o === 'v' ? [[e.c, a], [e.c, b]] : [[a, e.c], [b, e.c]]);
  }
  return out;
}
/* join pieces that meet end to end into chains (GEOS returns merged lines); returns chains as point lists */
function chains(pieces) {
  const key = p => `${Math.round(p[0] * 1e6)},${Math.round(p[1] * 1e6)}`, used = new Array(pieces.length).fill(false), out = [];
  const deg = new Map(); for (const [a, b] of pieces) for (const p of [a, b]) deg.set(key(p), (deg.get(key(p)) || 0) + 1);
  const grow = (ch, atEnd) => { for (;;) { const end = atEnd ? ch[ch.length - 1] : ch[0]; if (deg.get(key(end)) !== 2) return; let found = false;
    for (let j = 0; j < pieces.length; j++) if (!used[j]) { const [a, b] = pieces[j]; const nxt = key(a) === key(end) ? b : key(b) === key(end) ? a : null;
      if (nxt) { used[j] = true; if (atEnd) ch.push(nxt); else ch.unshift(nxt); found = true; break; } }
    if (!found) return; } };
  for (let i = 0; i < pieces.length; i++) { if (used[i]) continue; used[i] = true; const ch = [pieces[i][0], pieces[i][1]]; grow(ch, true); grow(ch, false); out.push(ch); }
  return out;
}
const chainLen = ch => ch.slice(1).reduce((s, p, i) => s + hyp(p[0] - ch[i][0], p[1] - ch[i][1]), 0);

/* ---------- deadend.py ---------- */
const DG0 = 0.05;
function inload(rooms, u, v, o) {
  const pts = o === 'v' ? [[u + 0.3, v], [u - 0.3, v]] : [[u, v + 0.3], [u, v - 0.3]];
  return rooms.some(x => x.g === 'load' && x.r.some(r => pts.some(p => r[0] < p[0] && p[0] < r[1] && r[2] < p[1] && p[1] < r[3])));
}
function pubOk(G, st, d, k) { if (dcGround(G, outsidePoint(G, st, d[3], d[4], d[5]))) return false; if (k === 'scor') return true; return dcRoute(G, st, d[3], d[4], d[5])[0]; }
function exitIdent(G, rooms, K, st, other, d, k, strict) {
  const r2k = v => pyRound2(v);
  if (other === 'OUT' || other === 'YARD') {
    if (inload(rooms, d[3], d[4], d[5])) return new Set();
    if ((k === 'pcor' || k === 'ccor' || strict) && !pubOk(G, st, d, k)) return new Set();
    return new Set([`OUT|${st}|${r2k(d[3])}|${r2k(d[4])}`]);
  }
  if (!(other in K)) return new Set();
  const x = rooms.find(y => y.id === other);
  if ((K[other] === 'pcore' || K[other] === 'score') && x.stair) return new Set([`stair|${other}`]);
  if (K[other] === 'lobby' && k !== 'pcor') return new Set();
  if (K[other] !== 'exitpas' && K[other] !== 'lobby') return new Set();
  const seen = new Set([other]), todo = [other], outs = new Set();
  while (todo.length) {
    const c = todo.pop();
    for (const e of G.D) {
      if (e[0] !== st || !(c === e[1] || c === e[2])) continue;
      const o2 = e[1] === c ? e[2] : e[1];
      if (o2 === 'OUT' || o2 === 'YARD') { if (!inload(rooms, e[3], e[4], e[5]) && !((k === 'pcor' || k === 'ccor' || strict) && !pubOk(G, st, e, k))) outs.add(`OUT|${st}|${r2k(e[3])}|${r2k(e[4])}`); }
      else if (o2 in K && !seen.has(o2) && (K[o2] === 'exitpas' || K[o2] === 'lobby') && (K[o2] === K[other] || K[other] === 'lobby')) { seen.add(o2); todo.push(o2); }
    }
  }
  return outs;
}
const ck = (a, b) => a + ',' + b, cxy = s => s.split(',').map(Number);
function cline(r) {
  const a0 = pyRoundInt(r[0] / DG0), a1 = pyRoundInt(r[1] / DG0), b0 = pyRoundInt(r[2] / DG0), b1 = pyRoundInt(r[3] / DG0);
  const am = Math.floor((a0 + a1 - 1) / 2), bm = Math.floor((b0 + b1 - 1) / 2), w = r[1] - r[0], h = r[3] - r[2], out = new PySet();
  if (w >= h / 1.5) { const c = new PySet(); for (let a = a0; a < a1; a++) c.add(a, bm); out.merge(c); }
  if (h >= w / 1.5) { const c = new PySet(); for (let b = b0; b < b1; b++) c.add(am, b); out.merge(c); }
  return out.order();
}
function lpath(p, q) {
  const out = new Set(); let [a, b] = p;
  let step = q[0] >= a ? 1 : -1; while (a !== q[0]) { out.add(ck(a, b)); a += step; }
  step = q[1] >= b ? 1 : -1; while (b !== q[1]) { out.add(ck(a, b)); b += step; }
  out.add(ck(q[0], q[1])); return out;
}
/* Python's min(set, key=...) keeps the first minimum in the set's own order (CPython hash order, not insertion). setOrder() gives that
   order for a set of (int, int) tuples, so ties fall the same way. */
function centreline(rs) {
  const CL = rs.map(r => [r, cline(r)]), cells = new Set(); for (const [, c] of CL) for (const z of c) cells.add(z);
  for (let i = 0; i < CL.length; i++) for (let j = i + 1; j < CL.length; j++) {
    const [r, ci] = CL[i], [q, cj] = CL[j], ou = Math.min(r[1], q[1]) - Math.max(r[0], q[0]), ov = Math.min(r[3], q[3]) - Math.max(r[2], q[2]);
    let m;
    if ((Math.abs(r[1] - q[0]) < 1e-6 || Math.abs(q[1] - r[0]) < 1e-6) && ov > 0.3) { const ue = Math.abs(r[1] - q[0]) < 1e-6 ? r[1] : r[0]; m = [ue, (Math.max(r[2], q[2]) + Math.min(r[3], q[3])) / 2]; }
    else if ((Math.abs(r[3] - q[2]) < 1e-6 || Math.abs(q[3] - r[2]) < 1e-6) && ou > 0.3) { const ve = Math.abs(r[3] - q[2]) < 1e-6 ? r[3] : r[2]; m = [(Math.max(r[0], q[0]) + Math.min(r[1], q[1])) / 2, ve]; }
    else continue;
    for (const [rr, cc] of [[r, ci], [q, cj]]) {
      const ma = Math.min(Math.max(Math.floor(m[0] / DG0), pyRoundInt(rr[0] / DG0)), pyRoundInt(rr[1] / DG0) - 1);
      const mb = Math.min(Math.max(Math.floor(m[1] / DG0), pyRoundInt(rr[2] / DG0)), pyRoundInt(rr[3] / DG0) - 1);
      const tgt = pyMin(setOrder(cc), c => { const [x, y] = cxy(c); return Math.abs(x - ma) + Math.abs(y - mb); });
      for (const z of lpath([ma, mb], cxy(tgt))) cells.add(z);
    }
  }
  return [cells, CL];
}
const pyMin = (arr, f) => { let best = null, bv = Infinity, n = 0; for (const x of arr) { const v = f(x); if (v < bv) { bv = v; best = x; n = 1; } else if (v === bv) n++; } if (n > 1) TIES.push(bv); return best; };
const pyMax = (arr, f) => { let best = null, bv = -Infinity; for (const x of arr) { const v = f(x); if (v > bv) { bv = v; best = x; } } return best; };
function project(CL, u, v) {
  let best = null;
  for (const [r, cc] of CL) {
    if (!(r[0] - 1e-6 <= u && u <= r[1] + 1e-6 && r[2] - 1e-6 <= v && v <= r[3] + 1e-6) || !cc.length) continue;
    const dist = c => { const [x, y] = cxy(c); return pyHypot((x + 0.5) * DG0 - u, (y + 0.5) * DG0 - v); };
    const c = pyMin(setOrder(cc), dist), dd = dist(c);
    if (best === null || dd < best[0]) best = [dd, c];
  }
  return best ? best[1] : null;
}
function dijkstraCells(cells, src) {
  const D = new Map(); for (const q of src) D.set(q, 0.0);
  const heap = src.map(q => [0.0, q]); heap.sort((a, b) => a[0] - b[0]);
  /* plain binary heap */
  const H = []; const push = e => { H.push(e); let i = H.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (H[i][0] < H[p][0]) { [H[i], H[p]] = [H[p], H[i]]; i = p; } else break; } };
  const pop = () => { const t = H[0], l = H.pop(); if (H.length) { H[0] = l; let i = 0; for (;;) { const a = 2 * i + 1, b = a + 1; let m = i; if (a < H.length && H[a][0] < H[m][0]) m = a; if (b < H.length && H[b][0] < H[m][0]) m = b; if (m === i) break; [H[i], H[m]] = [H[m], H[i]]; i = m; } } return t; };
  for (const e of heap) push(e);
  while (H.length) {
    const [dd, c] = pop(); if (dd > D.get(c)) continue; const [x, y] = cxy(c);
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const n = ck(x + dx, y + dy); if (cells.has(n) && dd + DG0 < (D.has(n) ? D.get(n) : 1e9)) { D.set(n, dd + DG0); push([dd + DG0, n]); } }
  }
  return D;
}
function corridors(G, opt) {
  const strict = !!(opt && opt.strict), out = [];
  for (const st of Object.keys(G.S).map(Number)) {   /* Python: G.S.items() order (storeys as written) */
    const rooms = roomsOf(G, st), K = {}; for (const x of rooms) K[x.id] = kind(x, st);
    const groups = new Map();
    for (const x of rooms) if (['pcor', 'ccor', 'scor'].includes(K[x.id])) { if (!groups.has(K[x.id])) groups.set(K[x.id], []); groups.get(K[x.id]).push(x); }
    for (const [k, xs] of groups) {
      const xid = xs.map(y => y.id).join('+'), xr = xs.flatMap(y => y.r), ids = new Set(xs.map(y => y.id));
      const [cells, CL] = centreline(xr), ex = new Map(), idn = new Map();
      for (const d of G.D) {
        if (d[0] !== st || !(ids.has(d[1]) || ids.has(d[2])) || (ids.has(d[1]) && ids.has(d[2]))) continue;
        const other = ids.has(d[1]) ? d[2] : d[1], ident = exitIdent(G, rooms, K, st, other, d, k, strict);
        if (!ident.size) continue;
        const c0 = project(CL, d[3], d[4]); if (c0 === null) continue;
        const kk = `${other}|${pyRound2(d[3])}|${pyRound2(d[4])}`; ex.set(kk, [c0]); idn.set(kk, ident);
      }
      const dmap = new Map(); for (const [kk, c] of ex) dmap.set(kk, dijkstraCells(cells, c));
      const names = [...dmap.keys()], two = new Set();
      for (let i = 0; i < names.length; i++) for (let j = i + 1; j < names.length; j++) {
        const a = dmap.get(names[i]), b = dmap.get(names[j]);
        if ([...idn.get(names[i])].some(z => idn.get(names[j]).has(z))) continue;
        const reach_ = ex.get(names[j]).filter(q => a.has(q)).map(q => a.get(q)); if (!reach_.length) continue;
        const L = Math.min(...reach_); for (const c of cells) if (a.has(c) && b.has(c) && a.get(c) + b.get(c) <= L + 1e-6) two.add(c);
      }
      let worst;
      if (two.size) {
        for (const kk of names) if ([...dmap.get(kk).keys()].some(c => two.has(c))) for (const c of ex.get(kk)) two.add(c);
        const rest = new Set([...cells].filter(c => !two.has(c))), seen = new Set();
        for (const c0 of [...rest]) {
          if (seen.has(c0)) continue; const comp = new Set([c0]), q = [c0]; seen.add(c0);
          while (q.length) { const [x, y] = cxy(q.pop()); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const n = ck(x + dx, y + dy); if (rest.has(n) && !seen.has(n)) { seen.add(n); comp.add(n); q.push(n); } } }
          const touch = [...comp].filter(c => { const [x, y] = cxy(c); return [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => two.has(ck(x + dx, y + dy))); });
          let groupsN = 0; const left = new Set(touch);
          while (left.size) { groupsN++; const f = left.values().next().value; left.delete(f); const s2 = [f]; while (s2.length) { const [x, y] = cxy(s2.pop()); for (const dx of [-1, 0, 1]) for (const dy of [-1, 0, 1]) { const n = ck(x + dx, y + dy); if (left.has(n)) { left.delete(n); s2.push(n); } } } }
          if (groupsN >= 2) for (const c of comp) two.add(c);
        }
        const dt = dijkstraCells(cells, [...two]);
        for (const c of cells) if (!dt.has(c)) { let m = Infinity; for (const kk of names) if (dmap.get(kk).has(c)) m = Math.min(m, dmap.get(kk).get(c)); dt.set(c, m); }
        worst = dt.size ? Math.max(...dt.values()) : 0.0;
      } else if (names.length) worst = Math.max(...dmap.get(names[0]).values());
      else worst = Infinity;
      out.push([st, xid, k, names.length, worst < Infinity ? pyRound2(worst + (names.length ? DG0 / 2 : 0)) : Infinity, [...new Set(names.map(n => n.split('|')[0]))].sort()]);
    }
  }
  return out;
}

/* ---------- egress2.py, egress3.py ---------- */
const dseg = d => { const w = (d.length > 6 ? d[6] : 0.9) / 2; return d[5] === 'v' ? [[d[3], d[4] - w], [d[3], d[4] + w]] : [[d[3] - w, d[4]], [d[3] + w, d[4]]]; };
const pts21 = s => { const o = []; for (let t = 0; t <= 20; t++) o.push([s[0][0] + (s[1][0] - s[0][0]) * t / 20, s[0][1] + (s[1][1] - s[0][1]) * t / 20]); return o; };
function segDist21(a, b) { let m = Infinity; for (const p of pts21(a)) for (const q of pts21(b)) m = Math.min(m, hyp(p[0] - q[0], p[1] - q[1])); return m; }
function egress2(G) {
  const out = [];
  for (const st of storeys(G)) for (const x of roomsOf(G, st)) {
    const K = {}; for (const y of roomsOf(G, st)) K[y.id] = kind(y, st);
    const n = x.n.toLowerCase();
    if (x.g !== 'pub' || !(n.includes('refuge') || n.includes('shelter')) || n.includes('staff') || n.includes('storage')) continue;
    const A = x.r.reduce((s, r) => s + rArea(r), 0), load = Math.floor(A / 0.75);
    const u0 = Math.min(...x.r.map(r => r[0])), u1 = Math.max(...x.r.map(r => r[1])), v0 = Math.min(...x.r.map(r => r[2])), v1 = Math.max(...x.r.map(r => r[3])), diag = hyp(u1 - u0, v1 - v0);
    const other = d => d[1] === x.id ? d[2] : d[1];
    const doors = G.D.filter(d => d[0] === st && (d[1] === x.id || d[2] === x.id) && (['OUT', 'YARD'].includes(other(d)) || ['lobby', 'pcor', 'ccor', 'exitpas'].includes(K[other(d)])));
    let best = 0.0; for (let i = 0; i < doors.length; i++) for (let j = i + 1; j < doors.length; j++) best = Math.max(best, segDist21(dseg(doors[i]), dseg(doors[j])));
    const need = A > 45 + 1e-9, ok = !need || (doors.length >= 2 && best >= diag / 3 - 1e-6);
    const row = [x.id, pyRound1(A), need && load <= 60 ? pyRound1(A / 0.75) : load, doors.length, pyRound1(best), pyRound1(diag / 3), ok ? 'ok' : 'FAIL']; row.f2 = need && load <= 60; out.push(row);
  }
  return out;
}
const LIM3 = { 'F-2': 200, 'A': 200, 'D': 300 };
function egress3(G) {
  const out = [];
  for (const st of Object.keys(G.S).map(Number)) {
    const rooms = roomsOf(G, st), K = {}; for (const y of rooms) K[y.id] = kind(y, st);
    const units = [];
    for (const x of rooms) { const n = x.n.toLowerCase(); if (x.g === 'hall') units.push(['F-2', x.n, new Set([x.id]), x.r]); else if (x.g === 'pub' && (n.includes('refuge') || n.includes('shelter')) && !n.includes('staff') && !n.includes('storage')) units.push(['A', x.n, new Set([x.id]), x.r]); }
    const cl = rooms.filter(x => x.g === 'clin' || x.id === 'ccor');
    if (cl.length) units.push(['D', 'Clinic suite', new Set(cl.map(x => x.id)), cl.flatMap(x => x.r)]);
    for (const [grp, name, ids, rs] of units) {
      const A = rs.reduce((s, r) => s + rArea(r), 0), okK = ['lobby', 'pcor', 'ccor', 'scor', 'exitpas', 'pcore', 'score'];
      const oth = d => ids.has(d[1]) ? d[2] : d[1];
      let doors = G.D.filter(d => d[0] === st && (ids.has(d[1]) !== ids.has(d[2])) && (['OUT', 'YARD'].includes(oth(d)) || okK.includes(K[oth(d)])));
      if (grp === 'D') doors = doors.filter(d => K[oth(d)] !== 'ccor');
      const u0 = Math.min(...rs.map(r => r[0])), u1 = Math.max(...rs.map(r => r[1])), v0 = Math.min(...rs.map(r => r[2])), v1 = Math.max(...rs.map(r => r[3])), diag = hyp(u1 - u0, v1 - v0);
      let best = 0.0; for (let i = 0; i < doors.length; i++) for (let j = i + 1; j < doors.length; j++) best = Math.max(best, segDist21(dseg(doors[i]), dseg(doors[j])));
      let far = 0.0;
      for (const r of rs) for (let i = 0; i < Math.trunc((r[1] - r[0]) / 0.5) + 1; i++) for (let j = 0; j < Math.trunc((r[3] - r[2]) / 0.5) + 1; j++) {
        const p = [Math.min(r[0] + i * 0.5, r[1]), Math.min(r[2] + j * 0.5, r[3])];
        far = Math.max(far, doors.length ? Math.min(...doors.map(d => hyp(p[0] - d[3], p[1] - d[4]))) : 1e9);
      }
      const need = A > LIM3[grp] || far > 25, ok = !need || (doors.length >= 2 && best >= diag / 3 - 1e-6);
      out.push({ st, grp, name, A: pyRound1(A), lim: LIM3[grp], need, n: doors.length, apart: pyRound1(best), third: pyRound1(diag / 3), far: pyRound1(far), ok, doors: doors.map(d => [d[1], d[2], d[3], d[4]]) });
    }
  }
  return out;
}

/* ---------- walkload.py ---------- */
function walkload(G) {
  const S1 = roomsOf(G, 1), K = {}; for (const x of S1) K[x.id] = kind(x, 1);
  const ra = x => x.r.reduce((s, r) => s + rArea(r), 0);
  const hub = Math.ceil(S1.filter(x => x.g === 'pub' && (x.n.toLowerCase().includes('refuge') || x.n.toLowerCase().includes('shelter')) && !x.n.toLowerCase().includes('storage')).reduce((s, x) => s + ra(x), 0) / 0.75);
  const clin1 = Math.ceil(S1.filter(x => x.g === 'clin').reduce((s, x) => s + ra(x), 0) / 9.3), clin2 = Math.ceil(roomsOf(G, 2).filter(x => x.g === 'clin').reduce((s, x) => s + ra(x), 0) / 9.3);
  const pub = ['pub', 'circ'], byId = id => S1.find(x => x.id === id);
  const hubExits = G.D.filter(d => d[0] === 1 && ['OUT', 'YARD'].includes(d[2]) && byId(d[1]) && pub.includes(byId(d[1]).g) && !byId(d[1]).core);
  const W = (get(G, 'WALK', []) || []).slice(), touch = (a, b) => a[0] <= b[1] + 1e-6 && b[0] <= a[1] + 1e-6 && a[2] <= b[3] + 1e-6 && b[2] <= a[3] + 1e-6;
  let groups = [];
  for (const w of W) { const g = groups.filter(x => x.some(y => touch(w, y))); const nw = [w].concat(...g); groups = groups.filter(x => !g.includes(x)).concat([nw]); }
  const per = new Map();
  for (const w of W) {
    const on = G.D.filter(d => d[0] === 1 && ['OUT', 'YARD'].includes(d[2]) && inShape(w, ...outsidePoint(G, 1, d[3], d[4], d[5])));
    let share = 0.0; const full = new Map(), names = [];
    for (const d of on) {
      const x = byId(d[1]); let s, f, cat;
      if (x.core && x.stair && x.g === 'sup') { const loads = storeys(G).filter(st => st >= 2).map(st => Math.ceil(roomsOf(G, st).filter(y => ['sup', 'hall', 'spare'].includes(y.g) && !y.core).reduce((a, y) => a + ra(y), 0) / 46.0)); f = loads.length ? Math.max(...loads) : 0; s = f / 2; cat = 'dc'; }
      else if (x.core && x.g === 'circ' && clin2) { s = clin2 / 2; f = clin2; cat = 'clin2'; }
      else if (x.g === 'clin' || (K[d[1]] === 'exitpas' && clin1 && G.D.some(e => e[0] === 1 && (e[1] === d[1] || e[2] === d[1]) && K[e[2] === d[1] ? e[1] : e[2]] === 'ccor'))) { s = clin1 / 2; f = clin1; cat = 'clin1'; }
      else if (pub.includes(x.g)) { s = hub / Math.max(hubExits.length, 1); f = hub; cat = 'hub'; }
      else { s = 0; f = 0; cat = 'none'; }
      share += s; full.set(cat, f); names.push(d[1]);
    }
    per.set(w, [share, full, names]);
  }
  const out = [];
  for (const grp of groups) {
    const share = grp.reduce((a, w) => a + per.get(w)[0], 0), full = new Map(), names = [];
    for (const w of grp) { for (const [k, v] of per.get(w)[1]) full.set(k, v); names.push(...per.get(w)[2]); }
    const fl = [...full.values()].reduce((a, b) => a + b, 0), width = Math.min(...grp.map(w => Math.min(w[1] - w[0], w[3] - w[2])));
    const need = Math.max(1.1, share * 0.0061), needf = Math.max(1.1, fl * 0.0061);
    out.push([grp.map(w => w.map(v => pyRound2(v))), names, pyRoundInt(share), fl, pyRound2(width), pyRound2(need), pyRound2(needf), width + 1e-6 >= need ? 'ok' : 'FAIL']);
  }
  return [out, hub, hubExits.length];
}

/* ---------- sep2h.py ---------- */
const HUBPLANT = new Set(['pmec', 'mec']);
const side2h = x => (['pub', 'circ'].includes(x.g) || HUBPLANT.has(x.id)) ? 'hub' : x.g === 'clin' ? null : ['sup', 'hall', 'load', 'plant'].includes(x.g) ? 'dc' : null;
function sep2hWalls(G, cfg) {
  const out = new Map();
  for (const st of Object.keys(G.S).map(Number)) {
    const rooms = roomsOf(G, st), H_ = rooms.filter(x => side2h(x) === 'hub').flatMap(x => x.r), D_ = rooms.filter(x => side2h(x) === 'dc').flatMap(x => x.r);
    if (!H_.length || !D_.length) continue;
    const w = chains(boundaryNear(H_, D_, 0.02));
    const L = w.map(chainLen).filter(l => l > 0.05).reduce((a, b) => a + b, 0);
    if (L < 0.3) continue;
    const marks = ((cfg.two_hour || {})[String(st)] || (cfg.two_hour || {})[st] || []);
    let U = 0;
    for (const ch of w) {   /* the wall line outside every mark (marks buffered 0.2 m, round) */
      const segs = [];
      for (let i = 0; i < ch.length - 1; i++) {
        const a = ch[i], b = ch[i + 1], o = Math.abs(a[0] - b[0]) < 1e-9 ? 'v' : 'h';
        const e = o === 'v' ? { o, c: a[0], a: Math.min(a[1], b[1]), b: Math.max(a[1], b[1]) } : { o, c: a[1], a: Math.min(a[0], b[0]), b: Math.max(a[0], b[0]) };
        const cut = [];
        for (const q of marks) { const dd = o === 'v' ? Math.max(q[0] - e.c, 0, e.c - q[1]) : Math.max(q[2] - e.c, 0, e.c - q[3]); if (dd > 0.2) continue; const ext = Math.sqrt(0.04 - dd * dd); cut.push([(o === 'v' ? q[2] : q[0]) - ext, (o === 'v' ? q[3] : q[1]) + ext]); }
        cut.sort((p, q) => p[0] - q[0]); let cur = e.a;
        for (const [lo, hi] of cut) { if (lo > cur) segs.push(o === 'v' ? [[e.c, cur], [e.c, Math.min(lo, e.b)]] : [[cur, e.c], [Math.min(lo, e.b), e.c]]); cur = Math.max(cur, hi); if (cur >= e.b) break; }
        if (cur < e.b) segs.push(o === 'v' ? [[e.c, cur], [e.c, e.b]] : [[cur, e.c], [e.b, e.c]]);
      }
      U += chains(segs.filter(([a, b]) => hyp(a[0] - b[0], a[1] - b[1]) > 1e-9)).map(chainLen).filter(l => l > 0.3).reduce((a, b) => a + b, 0);
    }
    out.set(st, [L, U]);
  }
  return out;
}
function sep2hText(G, cfg) {
  const W = sep2hWalls(G, cfg);
  if (!W.size) return ['pass', 'no storey where hub rooms meet data-centre rooms [script]'];
  const bad = [...W.values()].some(([, u]) => u > 0.3);
  const t = [...W.entries()].sort((a, b) => a[0] - b[0]).map(([st, [L, u]]) => `storey ${st}: 2 h walls between the hub and the data-centre rooms, cores, bays and plant beside it, ${pyFixed(L, 1)} m` + (u > 0.3 ? `, ${pyFixed(u, 1)} m NOT marked` : ', all dashed')).join('; ');
  return [bad ? 'fail' : 'pass', t + ' [script, eh/sep2h.py]'];
}
/* Python iterates a set in its hash-table order, and min() keeps the first minimum, so a tie (a door exactly between two centreline
   cells) falls by that order. PySet reproduces CPython's set table (Objects/setobject.c: set_add_entry, set_insert_clean,
   set_table_resize, set_merge; LINEAR_PROBES 9, PERTURB_SHIFT 5) and its tuple hash (xxHash lanes, Objects/tupleobject.c) for
   tuples of two small ints, so the cells come out in Python's order. */
const TIES = [];
const M64 = (1n << 64n) - 1n, XP1 = 11400714785074694791n, XP2 = 14029467366897019727n, XP5 = 2870177450012600261n;
function pyHashInt(n) { const h = BigInt(n === -1 ? -2 : n); return h & M64; }
function pyHashTuple2(a, b) {
  let acc = XP5;
  for (const v of [a, b]) { const lane = pyHashInt(v); acc = (acc + lane * XP2) & M64; acc = ((acc << 31n) | (acc >> 33n)) & M64; acc = (acc * XP1) & M64; }
  acc = (acc + (2n ^ (XP5 ^ 3527539n))) & M64;
  if (acc === M64) return 1546275796n;
  return acc;
}
class PySet {
  constructor() { this.mask = 7; this.table = new Array(8).fill(null); this.fill = 0; this.used = 0; }
  static key(a, b) { return a + ',' + b; }
  insertClean(table, mask, e) {
    let perturb = e.h, i = Number(e.h & BigInt(mask));
    for (;;) {
      if (table[i] === null) { table[i] = e; return; }
      if (i + 9 <= mask) for (let j = 0; j < 9; j++) { i++; if (table[i] === null) { table[i] = e; return; } }
      perturb >>= 5n; i = Number((BigInt(i) * 5n + 1n + perturb) & BigInt(mask));
    }
  }
  resize(minused) {
    let n = 8; while (n <= minused) n <<= 1;
    const old = this.table, nt = new Array(n).fill(null), nm = n - 1;
    for (const e of old) if (e !== null) this.insertClean(nt, nm, e);
    this.table = nt; this.mask = nm; this.fill = this.used;
  }
  addEntry(e) {
    let perturb = e.h, i = Number(e.h & BigInt(this.mask));
    for (;;) {
      let probes = (i + 9 <= this.mask) ? 9 : 0, idx = i;
      do {
        const t = this.table[idx];
        if (t === null) { this.table[idx] = e; this.fill++; this.used++; if (this.fill * 5 < this.mask * 3) return; this.resize(this.used > 50000 ? this.used * 2 : this.used * 4); return; }
        if (t.h === e.h && t.k === e.k) return;
        idx++;
      } while (probes-- > 0);
      perturb >>= 5n; i = Number((BigInt(i) * 5n + 1n + perturb) & BigInt(this.mask));
    }
  }
  add(a, b) { this.addEntry({ k: PySet.key(a, b), h: pyHashTuple2(a, b) }); return this; }
  merge(o) {   /* so |= other */
    if (o === this || o.used === 0) return this;
    if ((this.fill + o.used) * 5 >= this.mask * 3) this.resize((this.used + o.used) * 2);
    if (this.fill === 0 && this.mask === o.mask && o.fill === o.used) { this.table = o.table.slice(); this.fill = o.fill; this.used = o.used; return this; }
    if (this.fill === 0) { this.fill = o.used; this.used = o.used; for (const e of o.table) if (e !== null) this.insertClean(this.table, this.mask, e); return this; }
    for (const e of o.table) if (e !== null) this.addEntry(e);
    return this;
  }
  order() { return this.table.filter(e => e !== null).map(e => e.k); }
}
const setOrder = arr => arr;

/* Python text of numbers and tuples as the scripts print them */
const pyNum = v => typeof v === 'number' ? (Number.isInteger(v) ? v.toFixed(1) : (v === Infinity ? 'inf' : v === -Infinity ? '-inf' : String(v))) : String(v);
const pyTuple = a => '(' + a.map(v => typeof v === 'string' ? `'${v}'` : Array.isArray(v) ? pyTuple(v) : pyNum(v)).join(', ') + (a.length === 1 ? ',' : '') + ')';
const n1i = x => x === Infinity ? 'inf' : n1(x);

/* ---------- padcheck.py ---------- */
function truckRoutesAll(G) {   /* padcheck._routes: TRUCK_ROUTES plus the named rects that are not None */
  const TR = get(G, 'TRUCK_ROUTES', null), d = TR !== null ? Object.assign({}, TR) : {};
  for (const k of ['DRIVE', 'APRON', 'AISLE', 'COURT', 'YARD_AISLE']) if (G[k] !== undefined && G[k] !== null && !(k in d)) d[k] = G[k];
  return d;
}
const prect = x => Array.isArray(x.r[0]) ? x.r[0] : x.r;
function padAnalyse(G) {
  const PL = G.PLANT || [], pads = PL.filter(x => x.id.startsWith('t'));
  if (!pads.length) return null;
  const S1 = roomsOf(G, 1), bldR = S1.filter(x => !x.id.startsWith('alc')).flatMap(x => x.r), alc = S1.filter(x => x.id.startsWith('alc'));
  const gens_ = PL.filter(x => x.id.startsWith('g')).map(prect);
  const chl = PL.filter(x => x.id.startsWith('c')).map(prect).concat((get(G, 'CHILL', []) || []).filter(r => rectUnionArea(bldR, r) < 0.5));
  const vg = get(G, 'VGATES', []) || [], gatePolys = vg.map(([a, b]) => flatBuf(a, b, 0.08));
  const fl = (get(G, 'PLANT_YARDS', []) || []).map(polyOf).concat((get(G, 'WALK', []) || []).map(polyOf));
  const strip = get(G, 'STRIP', null); if (strip !== null) fl.push(polyOf(strip));
  const fenceSegs = []; for (const P of fl) for (const [a, b] of edgesOf(P)) fenceSegs.push(...(gatePolys.length ? segMinus(a, b, gatePolys) : [[a, b]]));
  const lot = G.LOTPOLY.map(p => [p[0], p[1]]), se = get(G, 'STREET_EDGES', []) || [], streetPolys = se.map(([a, b]) => flatBuf(a, b, 0.3));
  const lotSegs = []; for (const [a, b] of edgesOf(lot)) lotSegs.push(...(streetPolys.length ? segMinus(a, b, streetPolys) : [[a, b]]));
  const TR = Object.entries(truckRoutesAll(G)).map(([k, v]) => [k, polyOf(v)]);
  const lineBufs = fenceSegs.concat(lotSegs).map(([a, b]) => { const L = hyp(b[0] - a[0], b[1] - a[1]) || 1, ex = 0.02 / L, a2 = [a[0] - (b[0] - a[0]) * ex, a[1] - (b[1] - a[1]) * ex], b2 = [b[0] + (b[0] - a[0]) * ex, b[1] + (b[1] - a[1]) * ex]; return flatBuf(a2, b2, 0.02); });
  const out = [], P = pads.map(x => [x.id, prect(x)]);
  for (const [pid, r] of P) {
    const others = P.filter(([i]) => i !== pid).map(([, q]) => q), pb = gBox(r), bd = q => gPolyD(pb, gBox(q));
    const inalc = alc.some(a => { const q = a.r[0]; return q[0] - 0.05 <= r[0] && r[1] <= q[1] + 0.05 && q[2] - 0.05 <= r[2] && r[3] <= q[3] + 0.05; });
    const d = { id: pid };
    d.bld = bldR.length ? Math.min(...bldR.map(bd)) : 0;
    d.gen = gens_.length ? Math.min(...gens_.map(bd)) : 99;
    d.chl = chl.length ? Math.min(...chl.map(bd)) : 99;
    d.fence = fenceSegs.length ? gPolySegs(pb, fenceSegs) : 99;
    d.pad = others.length ? Math.min(...others.map(bd)) : 99;
    const rectObs = bldR.concat(gens_, chl, others);
    const [u0, u1, v0, v1] = r;
    const frontBox = (k, t) => ({ S: [u0, u1, v0 - t, v0], N: [u0, u1, v1, v1 + t], W: [u0 - t, u0, v0, v1], E: [u1, u1 + t, v0, v1] })[k];
    const blocked = bx => { if (bx[1] - bx[0] <= 0 || bx[3] - bx[2] <= 0) return 0; let a = rectUnionArea(rectObs, bx); for (const L of lineBufs) { a += clipArea(L, bx); if (a >= 0.01) break; } return a; };
    d.depth = {}; for (const k of ['S', 'N', 'W', 'E']) { let got = 0.0; for (let x = 40; x >= 0; x--) { const t = x / 10; if (blocked(frontBox(k, t)) < 0.01) { got = t; break; } } d.depth[k] = got; }
    d.alcove = inalc;
    d.metal3 = [['generator sets', d.gen], ['chillers', d.chl], ['fence or gate', d.fence]].filter(([, v]) => v < 3.0).map(([n]) => n);
    d.bld3 = d.bld < 3.0 && !inalc;
    d.truck = TR.filter(([, t]) => gPolyD(pb, t) < 3.0).map(([k]) => k).sort();
    d.street = streetPolys.length > 0 && Math.min(...streetPolys.map(s => gPolyD(pb, s))) < 3.0;
    out.push(d);
  }
  return out;
}
function bondRow(G, city) {
  const A = padAnalyse(G);
  if (!A) return ['pass', 'Pad bonding and bollards', 'BC Hydro ES54 F0-02.02, .03', 'no transformer pads on this lot'];
  const src = 'BC Hydro ES54 F0-02.02 (Mechanical Protection), F0-02.03 (Grounding), Sep 2022' + (city === 'V' ? '' : '; EPCOR rule not read ?, BC Hydro read as the analogue (our reading)');
  const metal = [...new Set(A.flatMap(d => d.metal3))].sort(), bld = A.some(d => d.bld3), truck = [...new Set(A.flatMap(d => d.truck))].sort(), street = A.some(d => d.street);
  const parts = [];
  if (metal.length) parts.push('bond to the transformer ground: ' + metal.join(', ') + ' within 3 m (fence material ?)');
  if (bld) parts.push(`pad ${pyFixed(Math.min(...A.map(d => d.bld)), 1)} m from the building: if its walls are conductive or carry metal, ES54 F3-07 and a stamped grounding report (wall material ?)`);
  if (truck.length || street) parts.push('bollards (ES54 U2-02): within 3 m of ' + truck.map(t => t.toLowerCase().replace(/_/g, ' ')).concat(street ? ['a street or lane'] : []).join(', ') + '; roadway concrete barriers to be considered for trucks (F0-02.02)');
  if (!parts.length) return ['pass', 'Pad bonding and bollards', src, 'no metal, building or truck route within 3 m of the pads'];
  return ['tight', 'Pad bonding and bollards', src, 'check in design: ' + parts.join('; ')];
}

/* ---------- intakes.py ---------- */
const GEN_H = 3.5, CH_H = 2.90, WALL_Z = 1.5, ROOF_Z = 0.3, NEED_I = { gen: 3.0, bay: 7.6, chill: 7.6, art: 7.6 }, GEN_TIGHT = 10.0;
const zsOf = G => { const z = [get(G, 'SLAB', 0.0)]; for (const h of G.H) z.push(z[z.length - 1] + h); return z; };
const isGenRoom = x => x.id === 'gen' || x.n.toLowerCase().startsWith('generator');
function intakeSources(G, cfg) {
  const zs = zsOf(G), src = [];
  for (const p of (G.PLANT || [])) { const r = prect(p); if (p.n.includes('enerator')) src.push(['gen', ['box', r], 0.0, GEN_H]); if (p.n.includes('hiller')) src.push(['chill', ['box', r], 0.0, CH_H]); }
  for (const st of Object.keys(G.S).map(Number)) for (const x of roomsOf(G, st)) {
    const n = x.n.toLowerCase();
    if (isGenRoom(x)) for (const r of x.r) src.push(['gen', ['box', r], zs[st - 1], zs[st - 1] + GEN_H]);
    if (x.g === 'load' && ['bay', 'loading space', 'apron', 'truck court'].some(k => n.includes(k)) && !n.includes('lobby')) for (const r of x.r) src.push(['bay', ['box', r], 0.0, 0.0]);
  }
  for (const poly of (get(G, 'TRUCK_GROUND', []) || [])) src.push(['bay', ['poly', poly], 0.0, 0.0]);
  const units = cfg.chill_units;
  if (T(units)) for (const [r, s, b] of units) src.push(['chill', ['box', r], b, b + CH_H]);
  else { const seen = []; for (const r of (cfg.chill_rects || []).concat(get(G, 'CHILL', []) || [])) { if (seen.some(q => r.every((a, i) => Math.abs(a - q[i]) < 0.01))) continue; seen.push(r); const b = cfg.chill_base !== undefined && cfg.chill_base !== null ? cfg.chill_base : zs[cfg.chill_storey !== undefined && cfg.chill_storey !== null ? cfg.chill_storey : 1]; src.push(['chill', ['box', r], b, b + CH_H]); } }
  for (const [a, b] of (get(G, 'ARTERIAL_EDGES', []) || [])) src.push(['art', ['line', [a, b]], 0.0, 0.0]);
  return src;
}
function hdist(p, g) {   /* shapely Point.distance: GEOS point-to-segment over the shape's ring (0 inside) */
  if (g[0] === 'line') return gPS(p, g[1][0], g[1][1]);
  const P = g[0] === 'box' ? gBox(g[1]) : g[1].map(q => [q[0], q[1]]);
  if (insideP(p, P)) return 0; let m = Infinity; for (const [a, b] of gRing(P)) m = Math.min(m, gPS(p, a, b)); return m;
}
function intakeZones(G) {
  const Z = [['hub', x => x.g === 'pub'], ['clinic', x => x.g === 'clin'], ['data centre', x => ['hall', 'sup'].includes(x.g) && !isGenRoom(x)]];
  return Z.map(([k, f]) => [k, Object.keys(G.S).map(Number).flatMap(st => roomsOf(G, st).filter(f).map(x => [st, x]))]);
}
function intakeCandidates(G, rooms) {
  const zs = zsOf(G), out = [];
  for (const st of [...new Set(rooms.map(([s]) => s))].sort((a, b) => a - b)) {
    const allR = roomsOf(G, st).flatMap(x => x.r), ZR = rooms.filter(([s]) => s === st).flatMap(([, x]) => x.r);
    /* zone outline lying on the storey's outline (exterior walls of the zone) */
    const BA = boundary(allR), pieces = [];
    for (const e of boundary(ZR)) for (const f of BA) {
      if (f.o !== e.o || Math.abs(f.c - e.c) > 1e-9 || f.ins !== e.ins) continue;
      const a = Math.max(e.a, f.a), b = Math.min(e.b, f.b); if (!(b > a + 1e-9)) continue;
      /* shapely keeps every room-rectangle corner on an outline as a vertex, and the overlay splits there: cut the piece at each */
      const cuts = uniqRaw(allR.concat(ZR).flatMap(r => [[r[0], r[2]], [r[0], r[3]], [r[1], r[2]], [r[1], r[3]]])
        .filter(q => e.o === 'v' ? Math.abs(q[0] - e.c) < 1e-9 && q[1] > a + 1e-9 && q[1] < b - 1e-9 : Math.abs(q[1] - e.c) < 1e-9 && q[0] > a + 1e-9 && q[0] < b - 1e-9)
        .map(q => e.o === 'v' ? q[1] : q[0]));
      const ts = [a].concat(cuts, [b]);
      for (let k = 0; k < ts.length - 1; k++) pieces.push(e.o === 'v' ? [[e.c, ts[k]], [e.c, ts[k + 1]]] : [[ts[k], e.c], [ts[k + 1], e.c]]);
    }
    /* GEOS returns the overlay's edges unmerged, split at every corner of either outline: one straight piece each */
    for (const ch of pieces) {
      const L = chainLen(ch); if (L < 0.5) continue; const n = Math.max(1, Math.trunc(L / 0.5));
      for (let i = 0; i <= n; i++) { let t = L * i / n, k = 0; while (k < ch.length - 2 && t > hyp(ch[k + 1][0] - ch[k][0], ch[k + 1][1] - ch[k][1])) { t -= hyp(ch[k + 1][0] - ch[k][0], ch[k + 1][1] - ch[k][1]); k++; }
        const sl = hyp(ch[k + 1][0] - ch[k][0], ch[k + 1][1] - ch[k][1]) || 1, f = Math.min(1, t / sl); out.push([[ch[k][0] + (ch[k + 1][0] - ch[k][0]) * f, ch[k][1] + (ch[k + 1][1] - ch[k][1]) * f], zs[st - 1] + WALL_Z, st, 'wall']); }
    }
    const above = G.S[String(st + 1)] ? roomsOf(G, st + 1).flatMap(x => x.r) : null;
    for (const [s, x] of rooms) {
      if (s !== st) continue; const top = zs[st - 1] + (x.h !== undefined ? x.h : G.H[st - 1]) + ROOF_Z;
      for (const r of x.r) for (let u = r[0] + 0.5; u < r[1]; u += 1.0) for (let v = r[2] + 0.5; v < r[3]; v += 1.0)
        if (above === null || !(above.some(q => q[0] < u && u < q[1] && q[2] < v && v < q[3]) || (above.some(q => q[0] <= u && u <= q[1] && q[2] <= v && v <= q[3]) && interiorOfUnion(above, [u, v])))) out.push([[u, v], top, st, 'roof']);
    }
  }
  return out;
}
const interiorOfUnion = (R, p) => [[1e-9, 0], [-1e-9, 0], [0, 1e-9], [0, -1e-9]].every(([a, b]) => R.some(q => q[0] <= p[0] + a && p[0] + a <= q[1] && q[2] <= p[1] + b && p[1] + b <= q[3]));
function intakeCheck(G, cfg) {
  const src = intakeSources(G, cfg), res = new Map();
  for (const [zn, rooms] of intakeZones(G)) {
    if (!rooms.length) continue; let best = null;
    for (const [p, z, st, kd] of intakeCandidates(G, rooms)) {
      const d = {}; for (const k of Object.keys(NEED_I)) { let m = 99.0; for (const [kk, g, z0, z1] of src) if (kk === k) { const dh = hdist(p, g), dz = (z0 <= z && z <= z1) ? 0.0 : Math.min(Math.abs(z - z0), Math.abs(z - z1)); m = Math.min(m, pyHypot(dh, dz)); } d[k] = m; }
      const m = Math.min(...Object.keys(NEED_I).map(k => d[k] - NEED_I[k])), key2 = [m >= 0.5 ? 1 : 0, Math.min(d.gen, GEN_TIGHT + 0.5), m];
      const gt = (a, b) => a[0] !== b[0] ? a[0] > b[0] : a[1] !== b[1] ? a[1] > b[1] : a[2] > b[2];
      if (best === null || gt(key2, best[0])) best = [key2, p, z, st, kd, d, m];
    }
    if (best === null) continue;
    const [, p, z, st, kd, d, m] = best, lim = pyMin(Object.keys(NEED_I), k => d[k] - NEED_I[k]);
    res.set(zn, { p, z, st, kind: kd, d, margin: m, limit: lim });
  }
  return res;
}
function intakeRow(G, cfg, C = 'VBBL') {
  const R = intakeCheck(G, cfg);
  if (!R.size) return ['?', 'Outdoor air intakes', `${C} Table 6.3.2.9`, 'no zone found'];
  let worst = 'pass'; const parts = [], order = { pass: 0, tight: 1, fail: 2 }, lab = { gen: 'generator', bay: 'bays', chill: 'chillers', art: 'arterial' };
  for (const [zn, r] of R) {
    let s = st_(r.margin >= 0, r.margin), note = '';
    if (S_(s) === 'pass' && r.d.gen < GEN_TIGHT) { s = 'tight'; note = ' (3–10 m from a generator: tight, check in design; ASHRAE 62.1, our reading)'; }
    if (typeof s === 'object' && s.over != null) note += ` (over by ${f2(s.over)} m, fix in design)`;
    const where = `storey ${r.st} ${r.kind === 'roof' ? 'roof' : 'wall'}`;
    let dd = Object.keys(NEED_I).filter(k => r.d[k] < 50).map(k => `${lab[k]} ${pyFixed(r.d[k], 1)}`).join(', '); dd = dd ? dd + ' m' : 'every source more than 50 m away';
    parts.push(`${zn}: best point ${where} (${dd})${S_(s) !== 'pass' ? ': ' + S_(s) : ''}${note}`);
    if (order[S_(s)] > order[worst]) worst = S_(s);
  }
  const txt = 'one intake per zone, placed by the script at the best point on its walls (1.5 m up) or roof (0.3 m up); best spot found; actual HVAC layout may differ: '
    + parts.join(' · ') + '. Needs: generator exhaust ≥ 3.0 m (vent for combustion products; 3–10 m tight, ASHRAE 62.1, our reading), '
    + 'bays and arterial roads ≥ 7.6 m, chiller discharge ≥ 7.6 m; 3-D distance (our reading); generator exhaust 3.5 m up (?). '
    + 'Garbage, kitchen and sanitary vents not drawn [script]';
  return [worst, 'Outdoor air intakes', `BCBC 2018 Table 6.3.2.9 (${C} to confirm); J.B. 11 Nov; eh/intakes.py`, txt];
}

/* ---------- fuelfill.py ---------- */
function fuelFill(G) {
  const Gs = (G.PLANT || []).filter(x => x.n.includes('enerator'));
  if (!Gs.length) return null;
  const FF = get(G, 'FUEL_FILL', null);
  if (!T(FF)) return ['?', `${Gs.length} yard generator(s); fuel fill point not drawn`];
  const yds = yards(G), TR = truckRoutes(G), ENT = new Set(Object.keys(get(G, 'TRUCK_ENTRIES', {}))), VIA = new Set(Object.keys(get(G, 'TRUCK_VIA', {})));
  const stand = Object.values(TR).map(polyOf).concat((get(G, 'FUEL_STAND', []) || []).map(polyOf)), dIn = (p, P) => insideP(p, P) ? 0.0 : edgeD(p, P);
  const out = [];
  for (const q of FF) {
    const p = [q[0], q[1]], far = Math.max(...Gs.map(x => rectD(p, prect(x)))), pp = pyTuple(p);
    const on = yds.filter(P => edgeD(p, P) <= 0.3);
    if (on.length) {
      const gap = stand.length ? Math.min(...stand.map(S => insideP(p, S) ? 0.0 : edgeD(p, S))) : null;
      const g = gap !== null ? `${pyFixed(gap, 1)} m from truck ground` : 'no truck ground declared next to it';
      out.push([gap !== null ? 'tight' : '?', `fill box ${pp} on the yard fence: truck stays outside, ${g} (hose reach ?), fill pipe ≤ ${pyFixed(far, 1)} m to the farthest generator (limit ?)`]);
    } else if (yds.some(P => insideP(p, P))) {
      const ok = Object.keys(TR).filter(k => (ENT.has(k) || VIA.has(k)) && dIn(p, polyOf(TR[k])) <= 1.0);
      out.push(ok.length ? ['pass', `fill ${pp} inside the yard on the ${ok[0]} route, which enters through a drawn vehicle gate`] : ['fail', `fill ${pp} inside the yard: a fuel truck must enter and no declared gated route reaches it`]);
    } else {
      const gap = stand.length ? Math.min(...stand.map(S => insideP(p, S) ? 0.0 : edgeD(p, S))) : null;
      out.push(gap !== null && gap <= 1.0 ? ['tight', `remote fill box ${pp} outside the yard beside truck ground (${pyFixed(gap, 1)} m), fill pipe ≤ ${pyFixed(far, 1)} m to the farthest generator (limit ?)`] : ['fail', `fill ${pp} is not on a plant-yard fence, not inside a yard and not beside truck ground`]);
    }
  }
  let st = out.some(([s]) => s === 'fail') ? 'fail' : out.some(([s]) => s === '?') ? '?' : out.some(([s]) => s === 'tight') ? 'tight' : 'pass';
  let txt = out.map(([, t]) => t).join('; ');
  if (T(get(G, 'FUEL_ASSUMED', null)) && st !== 'fail') { st = '?'; txt = txt + ' — ? ' + G.FUEL_ASSUMED; }
  return [st, txt];
}

/* ---------- claims.py (typed rows checked by script) ---------- */
const CTOL = 0.5;
const crd = (a, b) => hyp(Math.max(a[0] - b[1], b[0] - a[1], 0), Math.max(a[2] - b[3], b[2] - a[3], 0));
const cov = (a, b) => Math.max(0, Math.min(a[1], b[1]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[2], b[2]));
const cr = x => Array.isArray(x.r) && Array.isArray(x.r[0]) ? x.r : [x.r];
const cst = (ok, margin) => st_(ok, margin);
function cPads(G, m, cfg) {
  const A = padAnalyse(G); if (!A) return null;
  const alc = roomsOf(G, 1).filter(x => x.id.startsWith('alc'));
  const alcD = d => { const q = prect((G.PLANT || []).find(x => x.id === d.id)); for (const a_ of alc) { const r = a_.r[0]; if (r[0] - 1e-6 <= q[0] && q[1] <= r[1] + 1e-6 && r[2] - 1e-6 <= q[2] && q[3] <= r[3] + 1e-6) return Math.min(q[0] - r[0], r[1] - q[1], q[2] - r[2]); } return null; };
  const parts = [], margins = [];
  for (const d of A) {
    let b = d.alcove ? alcD(d) : null; b = b === null ? d.bld : b;
    const cand = [['building', b], ['generator set', d.gen], ['chiller', d.chl], ['fence', d.fence]], s_ = Math.min(...cand.map(c => c[1])), what = pyMin(cand, c => c[1])[0];
    const fr = Math.max(...Object.values(d.depth));
    margins.push(s_ - 1.0, d.pad < 50 ? d.pad - 1.0 : 9, fr - 3.0);
    parts.push(`${d.id}: ${n1(s_)} m to the nearest structure (${what}; ≥ 1.0)` + (d.pad < 50 ? `, ${n1(d.pad)} m to the next pad (≥ 1.0)` : '') + `, best front clear ${n1(fr)} m (≥ 3.0)`);
  }
  const mg = Math.min(...margins);
  return [cst(mg >= -1e-6, mg), `${A.length} pads: ` + parts.join('; ') + ' (ES54 F0-02.01-.02; structures = buildings, generator sets, chillers at grade, yard fences: our reading; front = the best side, not drawn) [script]'];
}
function cStoreys(G) {
  const sts = storeys(G);
  if (sts.length === 1) return ['pass', 'one storey: everything at grade'];
  const lifts = {}; for (const st of sts) lifts[st] = roomsOf(G, st).filter(x => x.n.toLowerCase().includes('lift'));
  const dc = sts.filter(st => roomsOf(G, st).some(x => ['hall', 'sup'].includes(x.g))), pub = sts.filter(st => roomsOf(G, st).some(x => ['pub', 'clin'].includes(x.g)));
  const miss = dc.filter(st => !lifts[st].some(x => x.n.toLowerCase().includes('freight') || x.id === 'e2')).map(st => `storey ${st} data centre`)
    .concat(pub.filter(st => st > 1 && !lifts[st].some(x => ['circ', 'pub', 'clin'].includes(x.g) && x.id !== 'e2')).map(st => `storey ${st} public`));
  return [miss.length ? 'fail' : 'pass', miss.length ? 'lift missing: ' + miss.join(', ') : `freight lift on storeys ${dc.join(', ')}; public lift on ${pub.filter(s => s > 1).join(', ') || 'no upper public storey'} (VBBL 3.8.2.3)`];
}
const ENTRY_IDS = ['s1', 's2', 's3', 's4', 'e2', 'ves', 'lv', 'dock', 'b1', 'b2', 'b3', 'b4', 'scor', 'link', 'sh1', 'sh2', 'psh', 'ris3'];
function cAtGrade(G, m, cfg) {
  let bad = roomsOf(G, 1).filter(x => x.g === 'hall' || (x.g === 'sup' && !(x.stair || x.core || ENTRY_IDS.includes(x.id) || x.id.startsWith('pas') || x.n.toLowerCase().includes('lift') || x.n.toLowerCase().includes('vestibule') || x.n.toLowerCase().includes('stair')))).map(x => x.id);
  if (cfg.no_clinic_at_grade) bad = bad.concat(roomsOf(G, 1).filter(x => x.g === 'clin').map(x => x.id));
  return [bad.length ? 'fail' : 'pass', bad.length ? 'at grade: ' + bad.join(', ') : 'storey 1 holds only data-centre stairs, lifts, vestibules, the dock and bays' + (cfg.no_clinic_at_grade ? ' and no clinic room' : '')];
}
function cSeparations(G, m, cfg, typed) {
  const sts = storeys(G), over = [];
  for (const st of sts.slice(0, -1)) {
    const hub = roomsOf(G, st).filter(x => ['pub', 'circ'].includes(x.g) && !x.core).flatMap(x => x.r), dc = roomsOf(G, st + 1).filter(x => ['hall', 'sup', 'plant', 'load'].includes(x.g) && !x.core).flatMap(x => x.r);
    let a = 0; for (const h of hub) for (const d of dc) a += cov(h, d);
    if (a > 0.5) over.push([st + 1, a]);
  }
  if (sts.length === 1) return ['pass', 'one storey: hub and data centre side by side; 2 h wall between them (drawing claim)'];
  if (over.length && typed.includes('no data-centre room over the hub')) return ['fail', 'data-centre rooms over the hub: ' + over.map(([s, a]) => `${n1(a)} m² on storey ${s}`).join(', ') + ', but the row says none'];
  return ['pass', over.length ? 'data-centre rooms over the hub: ' + over.map(([s, a]) => `${n1(a)} m² on storey ${s}`).join(', ') + ' → 2 h floor there (VBBL Table 3.1.3.1; the drawn floor is a drawing claim)' : 'no data-centre room over the hub'];
}
const WET = /\bwcs?\b|washroom|toilet|shower|pool|\bspa\b|spa hall|steam|sauna|change room|universal change|dressing|greenhouse|growing|rest area|janitor|mop|kitchen|laundry|hot tub|whirlpool/;
function cOffHall(G) {
  const hall = []; for (const st of Object.keys(G.S).map(Number)) for (const x of roomsOf(G, st)) if (x.g === 'hall') for (const r of x.r) hall.push([st, r]);
  const eq = (G.PLANT || []).flatMap(p => cr(p).map(r => [p.id, r])).concat((get(G, 'CHILL', []) || []).map(c => ['chiller', c]), (get(G, 'GENS', []) || []).map(g => ['generator', g]));
  const hit = [...new Set(eq.filter(([, r]) => hall.some(([, h]) => cov(r, h) > 0.01)).map(([i]) => i))].sort();
  const wet = new Set(); for (const st of Object.keys(G.S).map(Number)) for (const x of roomsOf(G, st)) if (x.g !== 'hall' && WET.test(x.n.toLowerCase())) for (const r of x.r) for (const [hs, h] of hall) if (st > hs && cov(r, h) > 0.01) wet.add(`${x.n} (storey ${st})`);
  const bad = hit.concat([...wet].sort());
  return [bad.length ? 'fail' : 'pass', bad.length ? 'over or under the hall in plan: ' + bad.join(', ') : `no generator, tank, pad or chiller over or under the hall, and no wet room (WCs, showers, pools, greenhouse ...) over it, in plan (${eq.length} plant items checked; FM 5-32 2.2.1.6)`];
}
const covered = x => { const n = x.n.toLowerCase(); return !(x.open || ['aisle', 'apron', 'court'].includes(x.id) || /truck aisle|\baisle\b|apron|truck court|open/.test(n)); };
function cGens(G) {
  const Gs = (G.PLANT || []).filter(p => p.n.includes('enerator') || p.id.startsWith('g')); if (!Gs.length) return null;
  const bld = roomsOf(G, 1).filter(covered).flatMap(x => (x.n.includes('enerator') && x.g === 'plant') ? [] : x.r);
  const yard = Gs.filter(p => !bld.some(r => cov(cr(p)[0], r) > 0.01)); if (!yard.length) return null;
  const gaps = []; for (let i = 0; i < yard.length; i++) for (let j = i + 1; j < yard.length; j++) gaps.push(crd(cr(yard[i])[0], cr(yard[j])[0]));
  const tob = bld.length ? Math.min(...yard.map(p => Math.min(...bld.map(r => crd(cr(p)[0], r))))) : 99;
  const lot = G.LOTPOLY, tolot = q => { const pts = [[q[0], q[2]], [q[1], q[2]], [q[1], q[3]], [q[0], q[3]]]; let m = Infinity; for (const p of pts) for (let i = 0; i < lot.length; i++) m = Math.min(m, segD(p, lot[(i - 1 + lot.length) % lot.length], lot[i])); return m; };
  const tol = Math.min(...yard.map(p => tolot(cr(p)[0]))), g = gaps.length ? Math.min(...gaps) : 99;
  const stt = cst(g >= 2.0 - 1e-6 && tob >= 1.5 - 1e-6 && tol >= 3.0 - 1e-6, Math.min(g - 2.0, tob - 1.5, tol - 3.0));
  return [stt, `${yard.length} sets: ${gaps.length ? n1(g) : 'one set'} m apart (≥ 2.0, CSA C282 6.5.1.1); tanks ${n1(tob)} m to the building (≥ 1.5) and ${n1(tol)} m to lot lines (≥ 3.0, CSA B139 Table 2, 2,500–50,000 L)`];
}
const roomTop = (G, st, x) => get(G, 'SLAB', 0.0) + G.H.slice(0, st - 1).reduce((a, b) => a + b, 0) + (x.h !== undefined ? x.h : G.H[st - 1]);
function cChillers(G, m, cfg) {
  const grade = (G.PLANT || []).filter(p => p.n.includes('hiller')).map(p => cr(p)[0]);
  let roof = [];
  if (T(cfg.chill_units)) roof = cfg.chill_units.map(([r, s_, z_]) => [r, s_, z_]);
  else for (const r of (cfg.chill_rects || []).concat(get(G, 'CHILL', []) || [])) if (!roof.some(q => r.every((a, i) => Math.abs(a - q[0][i]) < 0.01))) roof.push([r, cfg.chill_storey === undefined ? null : cfg.chill_storey, cfg.chill_base === undefined ? null : cfg.chill_base]);
  if (!grade.length && !roof.length) return null;
  const margins = [], notes = [], alongU = r => (r[1] - r[0]) >= (r[3] - r[2]);
  const sideEnd = (r, q) => {
    const ou = Math.min(r[1], q[1]) - Math.max(r[0], q[0]), ovv = Math.min(r[3], q[3]) - Math.max(r[2], q[2]);
    if (ou > 0 && ovv > 0) return [0.0, 1.5, 'unit on an obstacle'];
    if (alongU(r)) { if (ou > 0) return [crd(r, q), 1.5, 'side']; if (ovv > 0) return [crd(r, q), 2.1, 'end']; }
    else { if (ovv > 0) return [crd(r, q), 1.5, 'side']; if (ou > 0) return [crd(r, q), 2.1, 'end']; }
    return null;
  };
  const faces = r => { const n = 5, us = [], vs = []; for (let i = 0; i < n; i++) { us.push(r[0] + (r[1] - r[0]) * (i + 0.5) / n); vs.push(r[2] + (r[3] - r[2]) * (i + 0.5) / n); }
    const [su, sv] = !alongU(r) ? [1.5, 2.1] : [2.1, 1.5];
    return [[vs.map(v => [r[0], v]), [-1, 0], su], [vs.map(v => [r[1], v]), [1, 0], su], [us.map(u => [u, r[2]]), [0, -1], sv], [us.map(u => [u, r[3]]), [0, 1], sv]]; };
  const depthIn = (p, d, inside, cap = 6.0) => { let t = 0.0; while (t < cap) { const q = [p[0] + d[0] * (t + 0.01), p[1] + d[1] * (t + 0.01)]; if (!inside(q)) return pyRound2(t + 0.005); t += 0.01; } return cap; };
  const lot = G.LOTPOLY;
  grade.forEach((r, i) => {
    const obs = roomsOf(G, 1).flatMap(x => x.r).concat((G.PLANT || []).map(p => cr(p)[0]).filter(q => !(q[0] === r[0] && q[1] === r[1] && q[2] === r[2] && q[3] === r[3])));
    for (const q of obs) { const s = sideEnd(r, q); if (s) { margins.push(s[0] - s[1]); if (s[0] - s[1] < 0.5) notes.push(`chiller ${i + 1} ${s[2]} ${n1(s[0])} m (≥ ${pyNum(s[1])})`); } }
    let yds = []; try { const c = [(r[0] + r[1]) / 2, (r[2] + r[3]) / 2]; yds = yards(G).filter(P => insideP(c, P)); } catch (e) { /* as the Python: no yards */ }
    const insideAll = q => inShape(lot, q[0], q[1]) && yds.every(P => insideP(q, P));
    for (const [pts, d, req] of faces(r)) { const free = Math.min(...pts.map(p => depthIn(p, d, insideAll))); margins.push(free - req); if (free - req < 0.5) notes.push(`chiller ${i + 1} zone to the ${yds.length ? 'yard fence or lot line' : 'lot line'} ${n1(free)} m (≥ ${pyNum(req)})`); }
  });
  roof.forEach(([r, cs, zb], i) => {
    let high, level = [];
    if (zb !== null && zb !== undefined) high = Object.keys(G.S).map(Number).flatMap(st => roomsOf(G, st).filter(x => roomTop(G, st, x) > zb + 0.05).flatMap(x => x.r));
    else high = Object.keys(G.S).map(Number).filter(st => cs !== null && cs !== undefined && st > cs).flatMap(st => roomsOf(G, st).flatMap(x => x.r));
    level = Object.keys(G.S).map(Number).flatMap(st => roomsOf(G, st).filter(x => (zb !== null && zb !== undefined && Math.abs(roomTop(G, st, x) - zb) <= 0.05) || ((zb === null || zb === undefined) && st === cs)).flatMap(x => x.r));
    for (const q of high) { const s = sideEnd(r, q); if (s) { margins.push(s[0] - s[1]); if (s[0] - s[1] < 0.5) notes.push(`roof chiller ${i + 1} ${s[2]} ${n1(s[0])} m to a wall above the roof (≥ ${pyNum(s[1])})`); } }
    if (level.length) {
      const onroof = q => level.some(a => a[0] <= q[0] && q[0] <= a[1] && a[2] <= q[1] && q[1] <= a[3]);
      const ends = faces(r).filter(([, , req]) => req === 2.1), best = Math.max(...ends.map(([pts, d]) => Math.min(...pts.map(p => depthIn(p, d, onroof)))));
      margins.push(best - 2.1); if (best - 2.1 < 0.5) notes.push(`roof chiller ${i + 1}: the better end zone has ${n1(best)} m of roof at its level (≥ 2.1)`);
    }
  });
  const units = grade.map(u => [u, 'g']).concat(roof.map(([u]) => [u, 'r']));
  for (let i = 0; i < units.length; i++) for (let j = i + 1; j < units.length; j++) {
    const [a, ka] = units[i], [b, kb] = units[j]; if (ka !== kb) continue;
    const ou = Math.min(a[1], b[1]) - Math.max(a[0], b[0]), ovv = Math.min(a[3], b[3]) - Math.max(a[2], b[2]); if (!(ou > 0 || ovv > 0)) continue;
    const side = alongU(a) ? ou > 0 : ovv > 0, need = side ? 3.0 : 4.2, gap = crd(a, b);
    margins.push(gap - need); if (gap - need < 0.5) notes.push(`units ${n1(gap)} m apart ${side ? 'side to side' : 'end to end'} (≥ ${pyNum(need)})`);
  }
  const mg = margins.length ? Number(pyFixed(Math.min(...margins), 3)) + 0.0 : 99, st = cst(mg >= -1e-9, mg);
  let txt = `${units.length} chillers: clear zones 1.5 m sides, 2.1 m ends free of walls, plant and fences; units 3.0 m side to side, 4.2 m end to end (Vertiv SL-70790 4.2.4, maker claim; spacing our reading); least margin ${n1(mg)} m`;
  if (notes.length) txt += ' — ' + [...new Set(notes)].sort().join('; ');
  return [st, txt];
}
const cHubCap = (G, m) => [m.dc <= 2325 + 1e-6 ? 'pass' : 'fail', `data centre ${n1(m.dc)} m² ≤ 2,325 (hub cap, J.B. 8 Nov)`];
function cPublicExits(G) { const r2 = reach(G).out.filter(o => o[0] === 'R2'); return [r2.length ? 'fail' : 'pass', r2.length ? r2.map(o => `${pyTuple(o[1])} ${o[2]}`).join('; ') : 'T-reach R2: no public or clinic exit into data-centre ground, bays, drives or plant yards except onto a walkway (eh/reach.py)']; }
function cLoading(G, m) {
  const bays = Object.keys(G.S).map(Number).flatMap(st => roomsOf(G, st).filter(x => x.g === 'load' && (/^b\d+$/.test(x.id) || x.n.toLowerCase().includes('loading'))));
  const dims = bays.flatMap(x => x.r.slice(0, 1).map(r => [r[1] - r[0], r[3] - r[2]].sort((a, b) => a - b)));
  if (m.nb === null || m.nb === undefined) return ['?', `${bays.length} bays drawn; number needed not set`];
  return [bays.length >= m.nb ? 'pass' : 'fail', `${bays.length} bays drawn ≥ ${m.nb} needed; sizes ${dims.map(([a, b]) => `${pyFixed(a, 1)} × ${pyFixed(b, 1)}`).join(', ')} m (size against the by-law: by hand)`];
}
const CLAIMS = { 'Loading count and size': cLoading, 'Transformer pads': cPads, 'Every storey reached': cStoreys, 'At grade: data centre only as entrances': cAtGrade,
  'At grade: no data storage, no health care office': cAtGrade, 'Fire separations': cSeparations, '2 h floor over the hub': cSeparations,
  'Nothing wet over the hall': cOffHall, 'Generator tanks': cGens, 'Chiller clear zones': cChillers, 'Plant off the hall': cOffHall, 'Plant off the public edge and off the hall': cOffHall,
  'Data-centre size: hub cap': cHubCap, 'Public exits beside the plant yard, not through it': cPublicExits, 'Public exits beside the drive, not on it': cPublicExits,
  'Clinic exit beside the plant yard, not through it': cPublicExits, "Public corridor's second exit": cPublicExits, 'P2 and the exit passage on Pender St': cPublicExits };
const CORD = ['pass', 'tight', 'flag', 'flag-red', '?', 'approval', 'fail'];
const worse = (a, b) => CORD.indexOf(a) >= CORD.indexOf(b) ? a : b;
function claimApply(G, m, cfg, row) {
  const [st, name, clause, text] = row, f = CLAIMS[name];
  if (!f) return [row, null];
  let r;
  try { r = f === cSeparations ? f(G, m, cfg, text) : f(G, m, cfg); }
  catch (ex) { return [['?', name, clause + ' · checked by script', text + ` [script failed: ${ex.message}]`], [name, st, '?', String(ex.message)]]; }
  if (r === null) return [row, null];
  const sScr = S_(r[0]); let t2 = r[1];
  const s2 = (st === '?' || st === 'approval') ? (sScr === 'fail' ? 'fail' : st) : worse(st, sScr);
  if (s2 === 'fail' && st !== 'fail') t2 = 'SCRIPT FAILS: ' + t2;
  return [[s2, name, clause + ' · checked by script', text + ` [script: ${t2}]`], s2 !== st ? [name, st, s2, t2] : null];
}
/* board(): a pass row with no margin reads tight */
const finalizeRows = rows => rows.map(c => (c[0] === 'pass' && (c[3].includes('0 margin') || c[3].includes('no margin')) && !c[3].includes(TIGHT)) ? ['tight', c[1], c[2], c[3] + ' — ' + TIGHT] : c);

/* ---------- tfboard.py: zone exits and the shared rows ---------- */
function zoneExits(G, st, ids) {
  const rooms = new Map(roomsOf(G, st).map(x => [x.id, x])), K = {}; for (const [i, x] of rooms) K[i] = kind(x, st);
  const P = new Set(['lobby', 'pcor', 'ccor', 'pcore', 'proom', 'croom']), seen = new Set(ids.filter(i => rooms.has(i))), todo = [...seen], ex = new Map();
  while (todo.length) {
    const c = todo.pop();
    for (const d of G.D) {
      if (d[0] !== st || !(c === d[1] || c === d[2])) continue;
      const o = d[2] === c ? d[1] : (d[1] === c ? d[2] : d[1]);
      const oo = d[1] === c ? d[2] : d[1];
      if (oo === 'OUT' || oo === 'YARD') {
        if (inload(roomsOf(G, st), d[3], d[4], d[5])) continue;
        if (oo === 'OUT' && P.has(K[c])) { if (dcGround(G, outsidePoint(G, st, d[3], d[4], d[5])) || !dcRoute(G, st, d[3], d[4], d[5])[0]) continue; }
        ex.set(`door ${pyNum(pyRound2(d[3]))}, ${pyNum(pyRound2(d[4]))}`, 1); continue;
      }
      void o;
      const x = rooms.get(oo); if (!x) continue;
      if (x.stair) { ex.set(`stair ${oo}`, 1); continue; }
      if (x.core || x.g === 'load') continue;
      if (!seen.has(oo)) { seen.add(oo); todo.push(oo); }
    }
  }
  return [ex.size, [...ex.keys()].sort()];
}
function egressRow(G, cfg) {
  const rows = egress2(G), bad = rows.filter(r => r[r.length - 1] !== 'ok'), big = rows.filter(r => r[2] > 60);
  const txt = big.map(r => `${r[0]} ${r.f2 ? pyNum(r[2]) : r[2]} people, ${r[3]} doors ${pyNum(r[4])} ≥ ${pyNum(r[5])} m`).join(' · '), C = cfg.code || 'VBBL';
  const s = st_(!bad.length, big.length ? Math.min(...big.map(r => r[4] - r[5])) : 99);
  return [S_(s), 'Refuge and shelter egress doors', `${C} Table 3.1.17.1 (0.75 m² a person), 3.3.1.5.(2); J.B. 9 Nov`, t_(s, txt + " (doors ≥ ⅓ of the room's diagonal apart)")];
}
function areaRow(G, cfg, rowsIn) {   /* rowsIn: egress3 rows given directly (the hub's failure tests stub them) */
  const rows = rowsIn || egress3(G), need = rows.filter(r => r.need), near = rows.filter(r => !r.need && r.A > 0.95 * r.lim && !(r.n >= 2 && r.apart >= r.third));
  const lab = { 'F-2': 'data hall', 'A': 'refuge', 'D': 'clinic suite' };
  const txt = need.map(r => `${lab[r.grp]} ${n0(r.A)} m² > ${r.lim}: ${r.n} doors ${n1(r.apart)} ≥ ${n1(r.third)} m`).join(' · ') || 'no room or suite over the table';
  const C = cfg.code || 'VBBL', ed = C === 'VBBL' ? '' : "; NBC 2020 Table 3.3.1.5.-B (J.B.'s copy) gives the same limits; NBC 2023 (AE) not read ?";
  const sts = need.map(r => r.n < 2 ? st_(false, r.lim - r.A, true, r.lim) : st_(r.apart >= r.third - 1e-9, r.apart - r.third)).concat(near.map(() => 'tight'));
  const s = sts.find(x => S_(x) === 'fail') || sts.find(x => typeof x === 'object' && x.over != null) || (sts.some(x => S_(x) === 'tight') ? 'tight' : 'pass');
  return [S_(s), 'Egress doorways by room area', `${C === 'VBBL' ? 'VBBL' : 'NBC 2020'} 3.3.1.5.(1)(d), Table 3.3.1.5.-B (sprinklered: A 200, D 300, F-2 200 m²); J.B. 9 Nov${ed}`, t_(s, txt + ' (data hall F-2, refuge A, clinic suite D: our reading; unassigned floor not checked)')];
}
function walkRow(G, cfg) {
  const [rows, hub, n] = walkload(G), bad = rows.filter(r => r[r.length - 1] !== 'ok');
  const txt = rows.map(r => `${r[1].join('+')}: ${r[2]} people (full load ${r[3]}) → ${f2(r[5])} m needed, ${f2(r[4])} m drawn`).join(' · '), C = cfg.code || 'VBBL';
  const s = st_(!bad.length, rows.length ? Math.min(...rows.map(r => r[4] - r[5])) : 99);
  return [S_(s), 'Walkways carry their load', `${C} 3.4.3.2.(1)(a); J.B. 9 Nov`, t_(s, txt + `. Load per exit: the storey's public load (${hub}) split over its ${n} exits, each at least half where there are two (3.4.3.2.(7)); data-centre storeys at 46 m² a person (storage, fallback for designed staff, our reading)`)];
}
function reachRow(G) {
  let out; try { out = reach(G).out; } catch (ex) { return ['?', 'T-reach (doors, lines, through-rooms, lobby)', 'spec rule 15d; eh/reach.py', `not run (${ex.message}) [script]`]; }
  out = out.filter(o => o[0] !== 'R8');
  if (!out.length) return ['pass', 'T-reach (doors, lines, through-rooms, lobby)', 'spec rule 15d; eh/reach.py', 'R0–R7 pass: doors on shared walls, public and secure lines never share a door, step-free reach, through-rooms as rule 15a, lobby [script]'];
  return ['fail', 'T-reach (doors, lines, through-rooms, lobby)', 'spec rule 15d; eh/reach.py', out.slice(0, 8).map(o => `${o[0]} ${o[1] ? o[1][1] : ''} (storey ${o[1] ? o[1][0] : '-'}): ${o[2]}`).join('; ') + (out.length > 8 ? ` (+${out.length - 8} more)` : '') + ' [script]'];
}
/* tfboard.common_checks: the rows every hub board shares. m carries what measure() gives (exits, discharges, travel, zone exits, people ...). */
function commonChecks(G, cfg, m) {
  const C = cfg.code || 'VBBL';
  const ex = m.exits.map(([z, d, need, half, pc]) => `${z} ${n1(d)} ≥ ${n1(need)} m` + (pc ? ' (public corridor: ≤ 9 m needed)' : '')).join(' · ');
  const exok = m.exits.every(([, d, need]) => d >= need - 1e-9);
  const dis = m.discharges.map(([a, b, d, need]) => `${a}–${b} ${n1(d)} ≥ ${n1(need)} m`).join(' · '), disok = m.discharges.every(([, , d, need]) => d >= need - 1e-9);
  const tr = m.travel.map(([z, d, k]) => d !== Infinity && d !== null && d !== 'inf' ? `${z} ${n1(d)}` : `${z}: ${k}`).join(' · '), trok = m.travel.every(([, d]) => typeof d === 'number' && d <= 45);
  const exm = m.exits.length ? Math.min(...m.exits.map(([, d, need]) => d - need)) : 99, dism = m.discharges.length ? Math.min(...m.discharges.map(([, , d, need]) => d - need)) : 99;
  const trm = 45 - (m.travel.length ? Math.max(...m.travel.map(([, d]) => typeof d === 'number' ? d : Infinity)) : 0);
  const sEx = st_(exok, exm), sDis = st_(disok, dism), sTr = st_(trok, trm);
  const ze = m.zone_exits || [], mr = m.ref_main || 0.0, small = !!cfg.small_lot;
  const sRef = st_(m.people >= 50 && (mr >= 175 || small), (small ? (m.ref_counted !== undefined ? m.ref_counted : m.ref) : mr) - 175, true, 175);
  let rows = [
    [sEx, 'Exits apart', `${C} 3.4.2.3.(1), (3)`, t_(sEx, `${ex}. Rule: with a public corridor min(½ diagonal, 9 m), otherwise max(½ diagonal, 9 m); door to door stands in for the smoke path (our arithmetic)`)],
    [sDis, 'Exterior stair discharges apart', `${C} 3.4.2.3.(4)`, t_(sDis, `${dis}. 9 m, or 6 m sprinklered with both within 15 m of a street; measured door edge to door edge (J.B. 9 Nov)`)],
    [sTr, 'Travel along the path', `${C} 3.4.2.5.(1)`, t_(sTr, `${tr} m ≤ 45 m (0.25 m grid, through 0.9 m doors)`)],
    reachRow(G),
    [!ze.length ? '?' : ze.every(([, n]) => n >= 2) ? 'pass' : 'fail', 'Two exits from every zone', `${C} 3.4.2.1; spec rule 6; eh/tfboard.zone_exits`, ze.map(([z, n]) => `${z} ${n}`).join(' · ') + ' exits reached (distinct exterior doors, yard doors and exit stairs; loading doors and public doors with no clear route to a street not counted) [script]'],
    [sRef, 'Refuge minimum', 'spec Part 1 (refuge main room); J.B. 8 Nov: 50 people at 3.5 m²', `${n0(m.ref_counted)} m² clear, counted → ${m.people} people ≥ 50; largest refuge room ${n0(mr)} m² clear ` + (small ? '(small lot: refuge and shelter count together)' : '≥ 175') + ' (clear = inside the walls: 0.15 m off fire and exterior walls, 0.05 m off partitions, J.B. 11 Nov)'],
    ['pass', 'Loading count and size', cfg.city === 'van' ? 'Parking By-law 5.1.5, 5.2.3, 5.2.5, 5.2.9, 5.5.1.2' : 'Zoning Bylaw 20001 s. 5.80 Table 7.2', `${m.nb} needed; drawn count from the plan (eh/claims.loading; see Loading)`],
    m.genkw === 300 ? ['?', 'Generator test noise', cfg.city === 'van' ? 'By-law 6555 s. 4.1(c)' : 'Bylaw 14600 s. 21', `${m.ngen} small sets (300 kW): no sourced noise figure: check in design (J.B. 11 Nov)`]
      : cfg.city === 'van' ? ['flag', 'Generator test noise', 'By-law 6555 s. 4.1(c)', `one set ${n1(m.gen1)} ≤ 80 dBA at 6.1 m; ${m.ngen} together ${n1(m.genall)}: test one at a time (maker claim, our arithmetic)`]
      : ['?', 'Generator test noise', 'Bylaw 14600 s. 21', `one set ${n1(m.gen1)} dBA at 6.1 m (maker claim); limit 85 dBA at a non-residential lot line: distance to the lines not modelled`],
    intakeRow(G, cfg, C), sizingRow(G, cfg, m), hubsetRow(G, cfg, m), batteryRow(G, cfg, m), bondRow(G, cfg.city === 'edm' ? 'E' : 'V'),
    ['?', 'Hall heat used by the hub', 'DECISIONS 11 Nov (every typology board, provisional)', "share of the hall's heat the hub uses: ? (the hub's heat demand is not sourced: space heat is ? in the NECB 2020 build-up): provisional"],
    ['?', 'Seismic importance', `${C} Table 4.1.2.1; 4.1.8.1 (IE)`, 'High: the refuge is a building likely to be used as a post-disaster shelter (Table 4.1.2.1), IE 1.3; '
      + 'the whole structure unless the parts are separated by a seismic joint (our reading; no mixed-use rule read). Clinic: primary care, '
      + 'not an emergency treatment facility (our reading, J.B. 11 Nov): if the clinic is meant to treat injuries after an earthquake, it is '
      + 'post-disaster (IE 1.5). Data centre as a communications facility (post-disaster) ?'],
    ['?', 'Hub emergency power', 'J.B. 11 Nov; spec 1c; NECB 2020 Tables 4.2.1.6, A-8.4.3.2(2); Rehlko G5-641, G5-642, g5650; CSA C282 (2 h minimum, life safety; not read, secondary source)',
      `the hub runs 72 h on its own set (${m.hub_set.model}, row 'Hub generator (72 h)'), the data centre 12 h on its own sets; hub load ${n0(m.hub.kw)} kW `
      + '(lighting, receptacles, hot water; NECB 2020); fans and space heat ? (check in design)' + (m.hub.other.length ? `; rooms read with lounge values: ${m.hub.other.join(', ')}` : '')],
  ];
  if (cfg.city === 'edm') rows.unshift(['flag', 'Indicative', 'J.B. 11 Nov', 'indicative: tool rectangle, placeholder cooling']);
  if (!m.discharges.length) rows = rows.filter(r => r[1] !== 'Exterior stair discharges apart');
  try {
    const de = corridors(G), ok = de.every(r => r[4] <= 6.0);
    let sDe = st_(ok, 6.0 - (de.length ? Math.max(...de.map(r => r[4])) : 0));
    const txt = de.map(r => `storey ${r[0]} ${r[2].replace('pcor', 'public').replace('ccor', 'clinic').replace('scor', 'secure')} ${n1i(r[4])} m`).join(' · ');
    rows.splice(3, 0, widthRow(G, cfg)); rows.splice(4, 0, egressRow(G, cfg)); rows.splice(5, 0, areaRow(G, cfg));
    if (T(get(G, 'WALK', null))) rows.splice(6, 0, walkRow(G, cfg));
    const ds = corridors(G, { strict: true });
    const q24 = de.map((r, i) => [r, ds[i]]).filter(([r, s]) => s[4] > 6.0 && r[4] <= 6.0);
    let note = '', Y = null, ygErr = null; try { Y = yards(G); } catch (e) { ygErr = e.message; }
    const yg = T(Y) ? yardgate(G) : null, GN = get(G, 'GATE_NOTES', {}) || {}, gnote = g => GN[pyTuple(g)] !== undefined ? GN[pyTuple(g)] : GN['(' + g.join(', ') + ')'];
    if (q24.length && yg !== null && T(get(G, 'GATES', null))) {
      const bad = yg.doors.filter(d => d.status === 'fail').concat(yg.gates.filter(g => g.status === 'fail'), (yg.vgates || []).filter(v => v.status === 'fail'));
      const tg = yg.gates.filter(g => g.status === 'tight').concat(yg.doors.filter(d => d.status === 'tight'));
      note = ' · secure exits into the plant yard counted: the yard gate to an open public thoroughfare (street or lane; J.B. 10 Nov) is drawn and opens from inside without a key (J.B. 9 Nov, Q24; our reading)' + Object.values(GN).map(v => '; gate ' + String(v)).join('') + '; '
        + `clear routes ≥ 1.1 m from ${yg.doors.length} yard doors to the gate (eh/yardgate.py v3), gate ${yg.gates.map(g => n1(g.width)).join('/')} m wide`
        + ((yg.vgates || []).length ? `; truck route crosses the yard fence at a drawn vehicle gate (${yg.vgates.map(v => v.route.toLowerCase()).join(', ')})` : '');
      if (bad.length) { sDe = 'fail'; note += ' · FAILS: ' + bad.map(b => (b.door ? pyTuple(b.door) : pyTuple(b.gate)) + ' ' + (b.why !== undefined ? b.why : 'gate')).join('; '); }
      else if (tg.length && S_(sDe) === 'pass') sDe = 'tight';
    } else if (q24.length) {
      sDe = 'fail';
      note = ' · ' + q24.map(([r, s]) => `storey ${r[0]} secure ${n1i(s[4])} m: the exit into the plant yard needs a drawn gate to the street that opens from inside without a key (J.B. 9 Nov, Q24)`).join(' · ');
    }
    if (ygErr) rows.splice(3, 0, ['?', 'Plant-yard doors and gates', 'spec rule 6; Q24 (J.B. 9 Nov); eh/yardgate.py v6', ygErr]);
    else if (yg === null) rows.splice(3, 0, ['pass', 'Plant-yard doors and gates', 'spec rule 6; Q24 (J.B. 9 Nov); eh/yardgate.py v6', 'no plant yard on this fit (PLANT_YARDS empty) [script]']);
    else {
      const all = yg.doors.map(d => ['door ' + String(d.door[0]), d]).concat(yg.gates.map(g => ['gate ' + pyTuple(g.gate) + (gnote(g.gate) !== undefined ? ' ' + gnote(g.gate) : ''), g]), (yg.vgates || []).map(v => ['truck route ' + v.route, v]));
      const sty = all.some(([, x]) => x.status === 'fail') ? 'fail' : all.some(([, x]) => x.status === 'tight') ? 'tight' : 'pass';
      const tx = all.length ? `${Y.length} plant yard(s), ${yg.gates.length} gate(s) to a street or lane drawn, ${yg.doors.length} door(s) into the yard: ` + all.map(([k, x]) => `${k} ${x.status}` + (x.why && x.status !== 'pass' ? ` (${x.why})` : '')).join('; ') + ' [script]' : `${Y.length} plant yard(s); no door opens into it and no gate is drawn [script]`;
      rows.splice(3, 0, [sty, 'Plant-yard doors and gates', 'spec rule 6; Q24 (J.B. 9 Nov); eh/yardgate.py v6', tx]);
    }
    const ff = fuelFill(G);
    if (ff) rows.splice(4, 0, [ff[0], 'Fuel fill (generators)', 'J.B. 10 Nov; eh/fuelfill.py; hose and pipe limits not sourced', ff[1] + ' [script]']);
    rows.splice(3, 0, [S_(sDe), 'Dead-end corridors', `${C} 3.3.1.9.(5); J.B. 8 Nov (strict)`, t_((!note || S_(sDe) !== 'tight') ? sDe : 'tight', `${txt} ≤ 6 m, along the corridor centreline from the last point with two ways to separate exits (J.B. 8 Nov; eh/deadend.py, our arithmetic)` + note)]);
  } catch (ex_) { rows.splice(3, 0, ['?', 'Dead-end corridors', `${C} 3.3.1.9.(5)`, `not measured (${ex_.message})`]); }
  return rows.map(r => [S_(r[0])].concat(r.slice(1)));
}

const api = { kind, LINE, CIRC, reach,
  gens, transformers, switchMargin, kd300lh, hubTank, hubSet, battCabinets, battRoom, hubLoad, RULES, HARD, hard, rule, auditGeom,
  st_, t_, measureSizing, sizingRow, hubsetRow, batteryRow, widthRow, pyFixed,
  corridors, egress2, egress3, walkload, sep2hWalls, sep2hText, padAnalyse, bondRow, intakeCheck, intakeRow, fuelFill, claimApply, CLAIMS, finalizeRows,
  zoneExits, egressRow, areaRow, walkRow, reachRow, commonChecks, TIES, capArea, cappedArea, dcRoute, dcGround, outsidePoint, shapesTruck, portal, yards, yardgate,
  clearGeom, clearSize, localWidth, maxSquare, version: 'EH-FREEZE-2026-11-11c port (every shared board check)' };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
if (root) { root.BD = root.BD || {}; root.BD.hubchecks = api; }
})(typeof window !== 'undefined' ? window : null);
