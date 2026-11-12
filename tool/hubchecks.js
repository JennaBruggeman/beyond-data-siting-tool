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
function transformers(Q, hubKw) {
  const kva = Q * 1000 + (hubKw || 0); let size, fp, duty;
  if (kva <= 2500) { [size, fp] = TX.find(t => t[0] >= kva); duty = 1; } else { [size, fp] = TX[TX.length - 1]; duty = Math.ceil(kva / 2500 - 1e-9); }
  return { kva: size, duty, n: duty + 1, pad: fp, load_kva: kva };
}
function switchMargin(g, t) { return [g.duty * g.kw - g.load_kw, (t.duty === 1 ? t.kva : t.duty * 2500) - t.load_kva]; }
const HUBSETS = [[80, 'KD80', [[0.25, 7.3], [0.50, 15.1], [0.75, 22.1], [1.00, 28.0]], [2.27, 1.149], 'G5-641'],
  [100, 'KD100', [[0.25, 9.5], [0.50, 18.7], [0.75, 26.7], [1.00, 32.9]], [2.27, 1.149], 'G5-642'], [300, 'KD300', KD300_LH, null, 'g5650']];
function hubSet(hubKw) {
  const h = HUBSETS.find(([kw]) => hubKw <= kw + 1e-9);
  if (!h) return { model: '?', kw: null, need_l: null, footprint: null, src: 'load over 300 kW ?' };
  const [kw, model, c, fp0, src] = h, need = curve(c, hubKw / kw) * HUB_HOURS; let fp = fp0, tank = null;
  if (fp == null) { const t = TANK300.find(t => t[0] >= need) || null; fp = t ? t[1] : null; tank = t ? t[0] : null; }
  return { model, kw, load: hubKw / kw, need_l: need, tank_l: tank, footprint: fp, src };
}
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
  const g = gens(Q, 0.0), t = transformers(Q, m.hub.kw);
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
    + `${n0(hb.kw)} kW (normal power, our reading): ${t.duty} + 1 × ${comma(String(t.kva))} kVA (pad ${f2(t.pad[0])} × ${f2(t.pad[1])} m). `
    + `Drawn: ${ng} × ${dkw ? comma(String(dkw)) : '?'} kW sets, ${nt} × ${dkva ? comma(String(dkva)) : '?'} kVA pads. Rule: smallest set size with at most 3 duty sets `
    + `(our reading), N+1; Rehlko KD230–300 ADV-10068 and g5650 fuel curve, KD1000, KD2000 (fuel 0.264 L/kWh, register fuel_on_site); Eaton CA08104001E (maker claims). `
    + `Headroom before a step up: generators ${n0(gm)} kW, transformers ${n0(tm)} kVA`;
  const near = gm < 100 || tm < 100, sameG = ng === g.n && dkw === g.kw, sameT = nt === t.n && dkva === t.kva, fb = cfg.sizing_fallback;
  if (!sameG && fb) txt += ' — ' + fb + ' (next size up: J.B. 11 Nov)'; else if (!(sameG && sameT)) txt += ' — differs from the drawing: board fix pending';
  if (near) txt += ' — within 0.1 MW of a sizing switch point (fans and space heat ? could step it up): ' + TIGHT.replace('J.B. 9 Nov', 'D1, J.B. 11 Nov');
  const st = (!sameG && fb) || !(sameG && sameT) ? 'flag' : (near ? 'tight' : 'pass');
  return [st, 'Plant sized to load', 'J.B. 11 Nov (sizing to load); eh/sizing.py', txt];
}
function hubsetRow(G, cfg, m) {
  const hs = m.hub_set, [nm, r, where] = hubgen(G), src = 'J.B. 11 Nov (own set); eh/sizing.hub_set';
  const fp = hs.footprint ? `${f2(hs.footprint[0])} × ${f2(hs.footprint[1])} m` : '?';
  let txt = `hub load ${n0(m.hub.kw)} kW (NECB 2020 build-up; fans and space heat ?) → ${hs.model} (${hs.kw} kW standby, ${f0(hs.load * 100)} % load; `
    + `Rehlko ${hs.src}, maker claim): 72 h at that load on its curve ${n0(hs.need_l)} L in a sub-base tank`
    + (hs.tank_l ? ` (${n0(hs.tank_l)} L, ADV-10068)` : ' (tank sizes not published ?: drawn at the set footprint)') + `, set ${fp}. `;
  if (!nm) return ['fail', 'Hub generator (72 h)', src, txt + 'Not drawn.'];
  const ok = nm.includes(hs.model);
  txt += `Drawn: ${nm} (${where === 'grade' ? 'at grade; clearances with the other sets (Generator tanks row)' : 'in its own 2 h room'}, ${f2(r[1] - r[0])} × ${f2(r[3] - r[2])} m)`;
  if (!ok) return ['fail', 'Hub generator (72 h)', src, txt + ' — model differs from the rule'];
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

const api = { kind, LINE, CIRC, reach,
  gens, transformers, switchMargin, kd300lh, hubTank, hubSet, battCabinets, battRoom, hubLoad, RULES, HARD, hard, rule, auditGeom,
  st_, t_, measureSizing, sizingRow, hubsetRow, batteryRow, widthRow, pyFixed, capArea, cappedArea, dcRoute, dcGround, outsidePoint, shapesTruck, portal, yards, yardgate,
  clearGeom, clearSize, localWidth, maxSquare, version: 'EH-FREEZE-2026-11-11 port (yardgate v7, reach, dcspace, portal, clear sizes)' };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
if (root) { root.BD = root.BD || {}; root.BD.hubchecks = api; }
})(typeof window !== 'undefined' ? window : null);
