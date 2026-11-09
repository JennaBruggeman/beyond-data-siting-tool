// T-reach, dead ends and room widths for an Emergency hub layout (spec eh/specs/emergency_hub.md Part 3 rule 15;
// eh/specs/room_minimums_rule_2026-11-08.md "Minimum widths"). Port of Cowork's eh/reach.py, eh/deadend.py and
// eh/audit_rooms.py (8 Nov 2026). Parity with the Python: checks/tests/t_reach.js.
//
// G = {S: {storey: [room {id, n, g, r: [[u0,u1,v0,v1], ...], core?, stair?, kind?}]}, D: [[storey, a, b, u, v, o, w?], ...], city?}
//   b is a room id, 'OUT' or 'YARD'; o is 'v' (door on a wall of constant u) or 'h' (constant v); w door width (0.9 m default).
//   A room's kind (rule 15a) is taken from room.kind when set, else inferred from its id, group and name as reach.py does.
// tReach(G)  -> [{rule, storey, room, reason}]              empty = PASS (rules R0-R6 of 15d; R7 is deadEnds)
// deadEnds(G) -> [{storey, corridor, kind, exits, exitNames, deadEnd_m, ok, limit_m, basis}]
// tWidth(G)  -> {rows: [{storey, room, name, width_m, min_m, basis, sev: 'fail'|'note', what}], refuge: [{storey, room, area_m2, counted_m2}]}
(function (root) {
  'use strict';

  // ---------- kinds and lines (rule 15a) ----------
  const LINE = { lobby: 'P', pcor: 'P', ccor: 'P', pcore: 'P', proom: 'P', croom: 'P', exitpas: null,
    scor: 'S', score: 'S', sroom: 'S', hall: 'S', dock: 'S', bay: 'S', entry: 'S', plant: 'X', shaft: 'X', spare: null };
  const CIRC = new Set(['lobby', 'pcor', 'ccor', 'pcore', 'scor', 'score', 'exitpas']);
  // rooms that may be reached through one other room, and which (15a "Through another room?"); drawing choice, no clause found (?)
  const THROUGH = { proom: new Set(['proom']), sroom: new Set(['hall', 'dock']), bay: new Set(['dock', 'bay']),
    entry: new Set(), croom: new Set(), spare: new Set(), plant: new Set() };
  const isCore = k => k === 'pcore' || k === 'score';

  function inferKind(x) {   // = reach.py kind()
    const i = x.id, g = x.g, n = String(x.n || '').toLowerCase();
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
  const kindOf = x => x.kind || inferKind(x);

  const storeys = G => Object.keys(G.S).map(Number);
  const rooms = (G, st) => G.S[st] || G.S[String(st)] || [];
  const key = (st, id) => st + '\u0000' + id;
  const EXT = new Set(['OUT', 'YARD']);
  // Python's round(): half to even (only exact halves; x/0.25 is exact in binary)
  function pyRound(x) { const f = Math.floor(x), d = x - f; if (d === 0.5) return f % 2 === 0 ? f : f + 1; return Math.round(x); }
  const r1 = x => pyRound(x * 10) / 10;
  const pyNum = x => (Number.isInteger(x) ? x.toFixed(1) : String(x));   // Python repr of a float (reasons only)

  // ---------- T-reach R0-R6 (reach.py run) ----------
  function tReach(G) {
    const nodes = new Map(), K = new Map();
    for (const st of storeys(G)) for (const x of rooms(G, st)) { const k = key(st, x.id); nodes.set(k, { st, id: x.id, x }); K.set(k, kindOf(x)); }
    const adj = new Map(), ext = new Map();
    const A = k => { if (!adj.has(k)) adj.set(k, new Set()); return adj.get(k); };
    const E = k => { if (!ext.has(k)) ext.set(k, new Set()); return ext.get(k); };
    for (const d of G.D) {
      const [st, a, b] = d;
      if (EXT.has(b)) { E(key(st, a)).add(b); continue; }
      if (nodes.has(key(st, a)) && nodes.has(key(st, b))) { A(key(st, a)).add(key(st, b)); A(key(st, b)).add(key(st, a)); }
    }
    for (const [k, nd] of nodes) {   // cores join storeys
      const up = key(nd.st + 1, nd.id);
      if (isCore(K.get(k)) && nodes.has(up)) { A(k).add(up); A(up).add(k); }
    }
    const adjOf = k => adj.get(k) || new Set(), extOf = k => ext.get(k) || new Set();
    const out = [];
    const push = (rule, k, reason) => { const nd = k ? nodes.get(k) : null; out.push({ rule, storey: nd ? nd.st : (k === undefined ? null : k), room: nd ? nd.id : null, reason }); };
    const pushSR = (rule, st, id, reason) => out.push({ rule, storey: st, room: id, reason });

    function touch(a, b) {   // rects share an edge segment over 0.5 m
      for (const r of a.r) for (const q of b.r) {
        const ou = Math.min(r[1], q[1]) - Math.max(r[0], q[0]), ov = Math.min(r[3], q[3]) - Math.max(r[2], q[2]);
        if ((Math.abs(r[1] - q[0]) < 1e-6 || Math.abs(q[1] - r[0]) < 1e-6) && ov > 0.5) return true;
        if ((Math.abs(r[3] - q[2]) < 1e-6 || Math.abs(q[3] - r[2]) < 1e-6) && ou > 0.5) return true;
      }
      return false;
    }
    function baychain(n) {   // bays are open to each other and the truck aisle: the chain must touch the dock lobby
      const seen = new Set([n]), q = [n];
      while (q.length) {
        const c = q.pop(), cs = nodes.get(c).st;
        for (const [m, nd] of nodes) {
          if (nd.st !== cs || seen.has(m) || !touch(nodes.get(c).x, nd.x)) continue;
          if (K.get(m) === 'dock') return true;
          if (K.get(m) === 'bay') { seen.add(m); q.push(m); }
        }
      }
      return false;
    }
    // spare floor and exit passages take the line of the room they open off (first public or secure neighbour)
    const line = new Map();
    for (const n of nodes.keys()) {
      let l = LINE[K.get(n)];
      if (l === null || l === undefined) {
        l = '?';
        for (const m of adjOf(n)) { const lm = LINE[K.get(m)]; if (lm === 'P' || lm === 'S') { l = lm; break; } }
      }
      line.set(n, l);
    }
    // R0 every door sits on a wall the two rooms share (an exterior door on the room's outside wall)
    function onwall(x, u, v, o, side) {
      for (const r of x.r) {
        if (o === 'v' && r[2] - 1e-6 <= v && v <= r[3] + 1e-6 && ((side >= 0 && Math.abs(r[1] - u) < 1e-6) || (side <= 0 && Math.abs(r[0] - u) < 1e-6))) return Math.abs(r[1] - u) < 1e-6 ? 1 : -1;
        if (o === 'h' && r[0] - 1e-6 <= u && u <= r[1] + 1e-6 && ((side >= 0 && Math.abs(r[3] - v) < 1e-6) || (side <= 0 && Math.abs(r[2] - v) < 1e-6))) return Math.abs(r[3] - v) < 1e-6 ? 1 : -1;
      }
      return 0;
    }
    for (const d of G.D) {
      const [st, a, b, u, v, o] = d, ka = key(st, a);
      if (!nodes.has(ka)) { pushSR('R0', st, a, 'door names a missing room'); continue; }
      const sa = onwall(nodes.get(ka).x, u, v, o, 0);
      if (!sa) { push('R0', ka, `door to ${b} at (${pyNum(u)}, ${pyNum(v)}) is not on its wall`); continue; }
      if (EXT.has(b)) {
        const same = [...nodes.values()].filter(nd => nd.st === st);
        if (same.some(nd => nd.id !== a && nd.x.g !== 'load' && onwall(nd.x, u, v, o, -sa) === -sa)) push('R0', ka, `exterior door at (${pyNum(u)}, ${pyNum(v)}) opens into another room`);
        if (line.get(ka) === 'P' && same.some(nd => nd.x.g === 'load' && onwall(nd.x, u, v, o, -sa) === -sa)) push('R2', ka, `public exit at (${pyNum(u)}, ${pyNum(v)}) opens into a loading bay or truck aisle (secure line)`);
      } else if (nodes.has(key(st, b)) && onwall(nodes.get(key(st, b)).x, u, v, o, -sa) !== -sa) push('R0', ka, `door to ${b} at (${pyNum(u)}, ${pyNum(v)}) is not on a shared wall`);
    }
    // R1 every room has a door (shafts excepted; bays open to the truck aisle)
    for (const n of nodes.keys()) {
      if (K.get(n) === 'shaft' || K.get(n) === 'bay') continue;
      if (!adjOf(n).size && !extOf(n).size) push('R1', n, 'no door');
    }
    // R2 no door between the public line and the secure line
    const lt = (n, m) => { const a = nodes.get(n), b = nodes.get(m); return a.st !== b.st ? a.st < b.st : a.id < b.id; };
    for (const n of nodes.keys()) for (const m of adjOf(n)) {
      const ls = new Set([line.get(n), line.get(m)]);
      if (ls.size === 2 && ls.has('P') && ls.has('S') && lt(n, m)) push('R2', n, `door to ${nodes.get(m).id} crosses the secure line`);
    }
    // R3 / R4 step-free reach (lifts, not stairs; VBBL 3.8.2.3) from the street door and the staff entrance, within the line
    function reach(starts, L) {
      const seen = new Set(starts), q = [...starts];
      while (q.length) {
        const n = q.shift();
        for (const m of adjOf(n)) {
          if (seen.has(m) || line.get(m) !== L) continue;
          const xm = nodes.get(m).x;
          if (xm.stair && nodes.get(m).st !== nodes.get(n).st) continue;   // no storey change by stair
          if (isCore(K.get(m)) && xm.stair) continue;
          seen.add(m); q.push(m);
        }
      }
      return seen;
    }
    const lob = [...nodes.keys()].filter(n => K.get(n) === 'lobby' && extOf(n).has('OUT'));
    const ent = [...nodes.keys()].filter(n => K.get(n) === 'entry' && extOf(n).size);
    if (!lob.length) out.push({ rule: 'R6', storey: null, room: null, reason: 'no lobby with a street door' });
    if (!ent.length) out.push({ rule: 'R4', storey: null, room: null, reason: 'no data-centre staff entrance with an outside door' });
    const P = reach(lob, 'P'), S_ = reach(ent, 'S');
    for (const [n, nd] of nodes) {
      const k = K.get(n);
      if (k === 'shaft' || k === 'plant' || (isCore(k) && nd.x.stair) || k === 'exitpas') continue;
      if (line.get(n) === 'P' && !P.has(n)) push('R3', n, 'not reached step-free from the lobby street door');
      if (line.get(n) === 'S' && !S_.has(n) && k !== 'bay') push('R4', n, 'not reached step-free from the staff entrance');
    }
    // R5 through-room limit
    for (const [n, nd] of nodes) {
      const k = K.get(n), nb = [...adjOf(n)];
      if (CIRC.has(k) || ['shaft', 'hall', 'entry', 'dock'].includes(k)) continue;
      if (k === 'plant') {
        if (!(extOf(n).size || nb.some(m => ['pcor', 'ccor', 'lobby'].includes(K.get(m))))) push('R5', n, 'plant room not off the exterior or the public corridor');
        continue;
      }
      if (nb.some(m => CIRC.has(K.get(m)))) continue;
      if (k === 'bay' && baychain(n)) continue;
      const par = nb.filter(m => (THROUGH[k] || new Set()).has(K.get(m)));
      if (k === 'sroom' && nb.some(m => K.get(m) === 'hall') && ![...nodes.keys()].some(x => nodes.get(x).st === nd.st && K.get(x) === 'scor')) continue;
      if (k === 'proom' && par.length && par.some(p => [...adjOf(p)].some(x => CIRC.has(K.get(x))))) continue;
      if (k === 'sroom' && nb.some(m => K.get(m) === 'dock')) continue;
      const ids = nb.map(m => nodes.get(m).id).sort();
      push('R5', n, `reached only through [${ids.map(s => `'${s}'`).join(', ')}]`);
    }
    // R6 the lobby touches the public corridor
    for (const l of lob) if (![...adjOf(l)].some(m => K.get(m) === 'pcor')) push('R6', l, 'lobby does not touch the public corridor');
    return out;
  }

  // ---------- dead-end corridors (deadend.py corridors), VBBL 3.3.1.9.(5), 6 m, strict reading (J.B. 8 Nov) ----------
  const G0 = 0.25, DEAD_LIMIT = 6.0, DEAD_BASIS = 'VBBL 3.3.1.9.(5) 6 m; strict reading (J.B. 8 Nov; the code text gives no definition)';
  const ck = (a, b) => a + ',' + b;
  const N4 = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const r2 = x => (Math.round(x * 100) / 100).toFixed(2);

  function inload(rs, u, v, o) {   // a point 0.3 m past an exterior door, either side, inside a loading bay or truck aisle
    const pts = o === 'v' ? [[u + 0.3, v], [u - 0.3, v]] : [[u, v + 0.3], [u, v - 0.3]];
    return rs.some(x => x.g === 'load' && x.r.some(r => pts.some(p => r[0] < p[0] && p[0] < r[1] && r[2] < p[1] && p[1] < r[3])));
  }
  function exitIdent(G, rs, K, st, other, d, k) {
    if (other === 'OUT') {
      if ((k === 'pcor' || k === 'ccor') && inload(rs, d[3], d[4], d[5])) return new Set();
      return new Set([`OUT|${st}|${r2(d[3])}|${r2(d[4])}`]);
    }
    if (!K.has(other)) return new Set();
    const x = rs.find(y => y.id === other);
    if (isCore(K.get(other)) && x.stair) return new Set([`stair|${other}`]);
    if (K.get(other) === 'lobby' && k !== 'pcor') return new Set();
    if (!['exitpas', 'lobby'].includes(K.get(other))) return new Set();
    const seen = new Set([other]), todo = [other], outs = new Set();
    while (todo.length) {
      const c = todo.pop();
      for (const e of G.D) {
        if (e[0] !== st || (c !== e[1] && c !== e[2])) continue;
        const o2 = e[1] === c ? e[2] : e[1];
        if (o2 === 'OUT') { if (!inload(rs, e[3], e[4], e[5])) outs.add(`OUT|${st}|${r2(e[3])}|${r2(e[4])}`); }
        else if (K.has(o2) && !seen.has(o2) && ['exitpas', 'lobby'].includes(K.get(o2)) && (K.get(o2) === K.get(other) || K.get(other) === 'lobby')) { seen.add(o2); todo.push(o2); }
      }
    }
    return outs;
  }
  function bfs(src, cells) {   // uniform 0.25 m steps: breadth-first = Dijkstra
    const D = new Map(); let q = [];
    for (const c of src) if (!D.has(c)) { D.set(c, 0); q.push(c); }
    let dd = 0;
    while (q.length) {
      const nq = []; dd += G0;
      for (const c of q) {
        const [a, b] = c.split(',').map(Number);
        for (const [dx, dy] of N4) { const n = ck(a + dx, b + dy); if (cells.has(n) && !D.has(n)) { D.set(n, dd); nq.push(n); } }
      }
      q = nq;
    }
    return D;
  }

  // centreline of one corridor rectangle (both axes when nearly square: a waiting bay or landing) = deadend.py _cline
  function cline(r) {
    const a0 = pyRound(r[0] / G0), a1 = pyRound(r[1] / G0), b0 = pyRound(r[2] / G0), b1 = pyRound(r[3] / G0);
    const am = Math.floor((a0 + a1 - 1) / 2), bm = Math.floor((b0 + b1 - 1) / 2), w = r[1] - r[0], h = r[3] - r[2], out = [];
    if (w >= h / 1.5) for (let a = a0; a < a1; a++) out.push([a, bm]);
    if (h >= w / 1.5) for (let b = b0; b < b1; b++) if (!out.some(c => c[0] === am && c[1] === b)) out.push([am, b]);
    return out;
  }
  function lpath(p, q) {   // = _lpath: along a, then along b
    const out = []; let a = p[0]; const b = p[1];
    let step = q[0] >= a ? 1 : -1; while (a !== q[0]) { out.push([a, b]); a += step; }
    let bb = b; step = q[1] >= bb ? 1 : -1; while (bb !== q[1]) { out.push([a, bb]); bb += step; }
    out.push(q); return out;
  }
  function centreline(rs) {   // = deadend.py centreline(): each rectangle's centreline, joined through the middle of every shared edge
    const CL = rs.map(r => [r, cline(r)]), cells = new Set();
    for (const [, cc] of CL) for (const c of cc) cells.add(ck(c[0], c[1]));
    for (let i = 0; i < CL.length; i++) for (let j = i + 1; j < CL.length; j++) {
      const [r, ci] = CL[i], [q, cj] = CL[j];
      const ovu = Math.min(r[1], q[1]) - Math.max(r[0], q[0]), ovv = Math.min(r[3], q[3]) - Math.max(r[2], q[2]);
      let m = null;
      if ((Math.abs(r[1] - q[0]) < 1e-6 || Math.abs(q[1] - r[0]) < 1e-6) && ovv > 0.3) { const ue = Math.abs(r[1] - q[0]) < 1e-6 ? r[1] : r[0]; m = [ue, (Math.max(r[2], q[2]) + Math.min(r[3], q[3])) / 2]; }
      else if ((Math.abs(r[3] - q[2]) < 1e-6 || Math.abs(q[3] - r[2]) < 1e-6) && ovu > 0.3) { const ve = Math.abs(r[3] - q[2]) < 1e-6 ? r[3] : r[2]; m = [(Math.max(r[0], q[0]) + Math.min(r[1], q[1])) / 2, ve]; }
      if (!m) continue;
      for (const [rr, cc] of [[r, ci], [q, cj]]) {
        if (!cc.length) continue;
        const ma = Math.min(Math.max(Math.floor(m[0] / G0), pyRound(rr[0] / G0)), pyRound(rr[1] / G0) - 1);
        const mb = Math.min(Math.max(Math.floor(m[1] / G0), pyRound(rr[2] / G0)), pyRound(rr[3] / G0) - 1);
        let tgt = cc[0]; for (const c of cc) if (Math.abs(c[0] - ma) + Math.abs(c[1] - mb) < Math.abs(tgt[0] - ma) + Math.abs(tgt[1] - mb)) tgt = c;
        for (const c of lpath([ma, mb], tgt)) cells.add(ck(c[0], c[1]));
      }
    }
    return { cells, CL };
  }
  function project(CL, u, v) {   // a door's point on the centreline: nearest centreline cell of the rectangle whose wall holds the door
    let best = null;
    for (const [r, cc] of CL) {
      if (!(r[0] - 1e-6 <= u && u <= r[1] + 1e-6 && r[2] - 1e-6 <= v && v <= r[3] + 1e-6) || !cc.length) continue;
      for (const c of cc) { const dd = Math.hypot((c[0] + 0.5) * G0 - u, (c[1] + 0.5) * G0 - v); if (!best || dd < best[0] - 1e-9) best = [dd, c, false]; else if (Math.abs(dd - best[0]) <= 1e-9 && (c[0] !== best[1][0] || c[1] !== best[1][1])) best[2] = true; }
    }
    if (best && best[2]) project.tie = true;   // the door sits on a cell boundary: two cells equally near (deadend.py picks by set order)
    return best ? ck(best[1][0], best[1][1]) : null;
  }

  function deadEnds(G) {
    const out = [];
    for (const st of storeys(G)) {
      const rs = rooms(G, st);
      const K = new Map(rs.map(x => [x.id, kindOf(x)]));
      const groups = new Map();
      for (const x of rs) { const k = K.get(x.id); if (k === 'pcor' || k === 'ccor' || k === 'scor') { if (!groups.has(k)) groups.set(k, []); groups.get(k).push(x); } }
      for (const [k, xs] of groups) {
        const xid = xs.map(y => y.id).join('+'), xr = xs.flatMap(y => y.r), ids = new Set(xs.map(y => y.id));
        const { cells, CL } = centreline(xr); project.tie = false;   // J.B. 8 Nov: measured along the corridor centreline (strict), as deadend.py
        const ex = new Map(), idn = new Map();
        for (const d of G.D) {
          if (d[0] !== st) continue;
          const inA = ids.has(d[1]), inB = ids.has(d[2]);
          if (!(inA || inB) || (inA && inB)) continue;
          const other = inA ? d[2] : d[1];
          const [, , , u, v, o] = d, half = (d.length > 6 && d[6] != null ? d[6] : 0.9) / 2;
          const ident = exitIdent(G, rs, K, st, other, d, k);
          if (!ident.size) continue;
          const c0 = project(CL, u, v);
          if (c0 === null) continue;
          const span = [c0];
          const kname = `${other}|${r2(u)}|${r2(v)}`;
          ex.set(kname, { other, span }); idn.set(kname, ident);
        }
        const names = [...ex.keys()];
        const dmap = new Map(names.map(n => [n, bfs(ex.get(n).span, cells)]));
        let two = new Set(), worst;
        for (let i = 0; i < names.length; i++) for (let j = i + 1; j < names.length; j++) {
          const a = dmap.get(names[i]), b = dmap.get(names[j]);
          if ([...idn.get(names[i])].some(s => idn.get(names[j]).has(s))) continue;   // two doors into the same exit
          let L = Infinity; for (const q of ex.get(names[j]).span) if (a.has(q)) L = Math.min(L, a.get(q));   // (Python raises here if none)
          for (const c of cells) if (a.has(c) && b.has(c) && a.get(c) + b.get(c) <= L + 1e-6) two.add(c);
        }
        if (two.size) {
          for (const n of names) for (const c of ex.get(n).span) two.add(c);   // every exit point counts as two-way (centreline: no spread across the width)
          // a loop of corridor that rejoins the two-way path at two separate places is two-way too
          const rest = new Set([...cells].filter(c => !two.has(c))), seen = new Set();
          for (const c0 of rest) {
            if (seen.has(c0)) continue;
            const comp = new Set([c0]), q = [c0]; seen.add(c0);
            while (q.length) {
              const [a, b] = q.pop().split(',').map(Number);
              for (const [dx, dy] of N4) { const n = ck(a + dx, b + dy); if (rest.has(n) && !seen.has(n)) { seen.add(n); comp.add(n); q.push(n); } }
            }
            const left = new Set([...comp].filter(c => { const [a, b] = c.split(',').map(Number); return N4.some(([dx, dy]) => two.has(ck(a + dx, b + dy))); }));
            let ng = 0;
            while (left.size) {
              ng++; const s0 = left.values().next().value; left.delete(s0); const stk = [s0];
              while (stk.length) {
                const [a, b] = stk.pop().split(',').map(Number);
                for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) { const n = ck(a + dx, b + dy); if (left.has(n)) { left.delete(n); stk.push(n); } }
              }
            }
            if (ng >= 2) for (const c of comp) two.add(c);
          }
          const dt = bfs(two, cells);
          worst = dt.size ? Math.max(...dt.values()) : 0;
        } else if (names.length) worst = Math.max(...dmap.get(names[0]).values());
        else worst = Infinity;
        const w = Number.isFinite(worst) ? r1(worst + (names.length ? G0 : 0)) : null;   // deadend.py adds one cell (the walk ends at the far wall's half cell)
        out.push({ storey: st, corridor: xid, kind: k, exits: names.length, exitNames: [...new Set(names.map(n => ex.get(n).other))].sort(),
          deadEnd_m: w, tie: !!project.tie, ok: w !== null && w <= DEAD_LIMIT, limit_m: DEAD_LIMIT, basis: DEAD_BASIS });
      }
    }
    return out;
  }

  // ---------- room widths (audit_rooms.py, with J.B.'s 8 Nov rule: fail only on the spec table and Part 3) ----------
  // clear width = side of the largest square that fits in the room (audit_rooms.py max_square, 0.05 m raster; re-measure 8 Nov).
  // First matching rule wins (as audit_rooms.py); 'Unassigned' rooms have no rule (Cowork fix).
  // fail: spec "Minimum widths" table (room_minimums_rule_2026-11-08.md) or Part 3 code/spec widths. note: everything else.
  const SPEC = 'room_minimums_rule_2026-11-08.md, Minimum widths';
  const WRULES = [
    { rx: /^unassigned/, none: true },
    { rx: /loading space/, sev: 'fail', min: G => (G.city === 'edm' ? 3.3 : 3.4),
      basis: G => (G.city === 'edm' ? 'Edmonton space 9.0 x 3.3 m (Zoning Bylaw 20001 s. 5.80; spec Part 3 rule 10)' : 'Class B 10.2 x 3.4 m (Parking By-law 5.5.1.2; spec Part 3 rule 10)') },
    { rx: /exit passage|exit steps/, sev: 'fail', min: 1.1, basis: 'exit passage >= 1.1 m (VBBL 3.3.1.9; spec Part 3 rule 15b)' },
    { rx: /truck aisle|drive/, sev: 'fail', min: 6.1, basis: G => (G.city === 'edm' ? 'aisle not given in Edmonton: Vancouver 6.1 m used (?) (spec Part 3 rule 10)' : '6.1 m aisle (Parking By-law 5.4.1; spec Part 3 rule 10)') },
    { rx: /corridor/, sev: 'fail', min: (G, x, k) => (k === 'ccor' ? 1.8 : (k === 'pcor' || k === 'scor') ? 2.0 : 1.1),
      basis: (G, x, k) => (k === 'ccor' ? 'clinic corridor 1.8 m (spec 15b, drawing choice; code >= 1.1 m VBBL 3.3.1.9)'
        : (k === 'pcor' || k === 'scor') ? `${k === 'pcor' ? 'public' : 'secure'} corridor 2.0 m (spec 15b, drawing choice; code >= 1.1 m VBBL 3.3.1.9)`
        : 'corridor >= 1.1 m (VBBL 3.3.1.9)') },
    { rx: /stair/, sev: 'fail', min: 1.1, basis: 'exit stair >= 1.1 m (VBBL 3.4.3.2)',
      also: { min: 2.4, basis: 'two 1.1 m flights side by side ~2.4 m (audit_rooms.py; our arithmetic ?)' } },
    { rx: /freight lift|lift e2/, sev: 'note', min: 2.5, basis: 'freight lift car ~2.5 x 3.4 m (spec 1b, drawing choice; not in the widths table or Part 3, so a note: J.B. 8 Nov answer 6)' },
    { rx: /lift/, sev: 'note', min: 2.0, basis: 'accessible car ~1.7 m + shaft (our judgment ?)' },
    { rx: /universal wc|universal washroom/, sev: 'fail', circle: true, min: 1.7, area: 4.8,
      basis: '1,700 mm turning circle clear of the WC and its 900 mm transfer space (VBBL 3.8.3.13; ' + SPEC + ')' },
    { rx: /shower/, sev: 'note', min: 1.5, area: 2.7, basis: 'VBBL 3.8.3.17 1.5 x 0.9 + 0.9 clear (audit_rooms.py)' },
    { rx: /\bwc\b|washroom|toilet/, sev: 'note', min: 1.5, basis: 'single WC 1.5 m (our judgment ?)' },
    { rx: /exam|consult|procedure|stretcher/, sev: 'fail', min: 3.0, area: 11.0, basis: 'table + 0.9 m each side + counter (clearance rule second-hand ?; ' + SPEC + ')' },
    { rx: /first aid/, sev: 'fail', min: 2.7, area: 9.3, basis: 'cot with access both sides (judgment; ' + SPEC + ')' },
    { rx: /data hall|hall\b/, sev: 'note', min: 6.0, basis: 'two rack rows 1.2 + aisles 1.2 = 6.0 m (our arithmetic ?)' },
    { rx: /switchgear|\bmv\b|\bups\b|battery/, sev: 'fail', min: 3.0, basis: 'equipment + 1.0 m working space (CEC 2-308 second-hand ?; ' + SPEC + ')' },
    { rx: /electrical/, sev: 'note', min: 3.0, basis: 'equipment 1.0 deep + 1.0 working space each side (our arithmetic ?)' },
    { rx: /meet-me|\bnoc\b|office|lounge|break|staff room/, sev: 'fail', min: 2.4, basis: 'desk or rack row + aisle (judgment; ' + SPEC + ')' },
    { rx: /janitor|valve|storage|garbage|\bcot\b/, sev: 'fail', min: 1.5, basis: 'fixtures/shelving + access (judgment; ' + SPEC + ')' },
    { rx: /medication|clean|soiled|housekeeping/, sev: 'note', min: 1.5, basis: 'shelving 0.6 + 0.9 access (our judgment ?)' },
    { rx: /vestibule|portal|guard/, sev: 'note', min: 1.8, basis: '1.8 m portal (GCPSG-015)' },
    { rx: /refuge|shelter/, kinds: ['proom'], sev: 'fail', min: 4.0, refuge: true, basis: 'rows of cots + aisle; parts under 2.4 m wide do not count toward the area (judgment; ' + SPEC + ')' },
    { rx: /dock|lobby/, sev: 'note', min: 2.4, basis: 'two people passing with a trolley (our judgment ?)' },
    { rx: /waiting|rest area/, sev: 'note', min: 4.0, basis: 'rows of cots 1.9 + aisle (our judgment ?)' },
    { rx: /mechanical|panel|shaft|riser/, sev: 'note', min: 1.0, basis: 'access (our judgment ?)' },
  ];
  const val = (f, G, x, k) => (typeof f === 'function' ? f(G, x, k) : f);
  const ra = r => (r[1] - r[0]) * (r[3] - r[2]), rw = r => Math.min(r[1] - r[0], r[3] - r[2]), rl = r => Math.max(r[1] - r[0], r[3] - r[2]);

  // does a circle of diameter dia fit in the union of rects, clear of the keep-out rects? 0.05 m raster (tolerance 0.05 m)
  function circleFits(rects, dia, keepOut) {
    const h = 0.05, rad = dia / 2, inR = (p, q) => rects.some(r => r[0] <= p && p <= r[1] && r[2] <= q && q <= r[3]) && !(keepOut || []).some(r => r[0] < p && p < r[1] && r[2] < q && q < r[3]);
    const u0 = Math.min(...rects.map(r => r[0])), u1 = Math.max(...rects.map(r => r[1])), v0 = Math.min(...rects.map(r => r[2])), v1 = Math.max(...rects.map(r => r[3]));
    const nu = Math.round((u1 - u0) / h), nv = Math.round((v1 - v0) / h), inside = [];
    for (let i = 0; i < nu; i++) { inside.push([]); for (let j = 0; j < nv; j++) inside[i].push(inR(u0 + (i + 0.5) * h, v0 + (j + 0.5) * h)); }
    const off = [], R = Math.ceil(rad / h) + 1;
    for (let di = -R; di < R; di++) for (let dj = -R; dj < R; dj++) if (Math.hypot((di + 0.5) * h, (dj + 0.5) * h) < rad - 1e-9) off.push([di, dj]);
    for (let i = 0; i <= nu; i++) for (let j = 0; j <= nv; j++) {   // centres on grid points; cell (i+di, j+dj) centre is (di+0.5)h away
      if (off.every(([di, dj]) => { const a = i + di, b = j + dj; return a >= 0 && b >= 0 && a < nu && b < nv && inside[a][b]; })) return true;
    }
    return false;
  }

  const STEP = 0.05;
  function grid(rs) {   // 0.05 m cells of the union of rects, as audit_rooms.py cells()
    let a0 = Infinity, a1 = -Infinity, b0 = Infinity, b1 = -Infinity;
    const R = rs.map(r => [pyRound(r[0] / STEP), pyRound(r[1] / STEP), pyRound(r[2] / STEP), pyRound(r[3] / STEP)]);
    for (const r of R) { a0 = Math.min(a0, r[0]); a1 = Math.max(a1, r[1]); b0 = Math.min(b0, r[2]); b1 = Math.max(b1, r[3]); }
    const nu = Math.max(0, a1 - a0), nv = Math.max(0, b1 - b0), C = new Uint8Array(nu * nv);
    for (const r of R) for (let a = r[0]; a < r[1]; a++) for (let b = r[2]; b < r[3]; b++) C[(a - a0) * nv + (b - b0)] = 1;
    return { C, nu, nv };
  }
  function maxSquare(rs) {
    const { C, nu, nv } = grid(rs); if (!nu || !nv) return 0;
    const dp = new Uint16Array(nu * nv); let best = 0;
    for (let a = 0; a < nu; a++) for (let b = 0; b < nv; b++) { const i = a * nv + b; if (!C[i]) continue;
      const v = 1 + Math.min(a ? dp[i - nv] : 0, b ? dp[i - 1] : 0, a && b ? dp[i - nv - 1] : 0); dp[i] = v; if (v > best) best = v; }
    return best * STEP;
  }
  function thinArea(rs, lim) {   // area of cells whose clear width there (min of the row and column runs through it) is under lim, as audit_rooms.py local_width
    const { C, nu, nv } = grid(rs), H = new Float64Array(nu * nv), V = new Float64Array(nu * nv);
    for (let b = 0; b < nv; b++) for (let a = 0; a < nu;) { if (!C[a * nv + b]) { a++; continue; } let e = a; while (e < nu && C[e * nv + b]) e++; for (let k = a; k < e; k++) H[k * nv + b] = (e - a) * STEP; a = e; }
    for (let a = 0; a < nu; a++) for (let b = 0; b < nv;) { if (!C[a * nv + b]) { b++; continue; } let e = b; while (e < nv && C[a * nv + e]) e++; for (let k = b; k < e; k++) V[a * nv + k] = (e - b) * STEP; b = e; }
    let n = 0; for (let i = 0; i < C.length; i++) if (C[i] && Math.min(H[i], V[i]) < lim - 1e-6) n++;
    return n * STEP * STEP;
  }

  function tWidth(G) {
    const rows = [], refuge = [];
    for (const st of storeys(G)) for (const x of rooms(G, st)) {
      const rs = x.r, k = kindOf(x), nm = String(x.n || ''), l = nm.toLowerCase();
      const A = rs.reduce((s, r) => s + ra(r), 0);
      let big = rs[0]; for (const r of rs) if (ra(r) > ra(big)) big = r;
      const w = +maxSquare(rs).toFixed(2), L = rl(big);
      const row = (min, basis, sev, what, wv) => rows.push({ storey: st, room: x.id, name: nm, width_m: +(wv === undefined ? w : wv).toFixed(2), min_m: min, basis, sev, what });
      const ru = WRULES.find(R => R.rx.test(l) && (!R.kinds || R.kinds.includes(k)));   // refuge rule: public rooms only (not 'Unassigned (... refuge minimum ...)')
      if (ru && !ru.none) {
        const min = val(ru.min, G, x, k), basis = val(ru.basis, G, x, k);
        if (ru.circle) {
          const keep = x.wc ? [x.wc].concat(x.wcTransfer ? [x.wcTransfer] : []) : null;
          if (!circleFits(rs, 1.7, keep)) row(min, basis, ru.sev, keep ? '1.7 m circle does not fit clear of the WC and transfer space' : '1.7 m circle does not fit (WC position not drawn)');
          else if (!keep) row(min, basis, 'note', '1.7 m circle fits; WC position not drawn, so not tested clear of the WC and transfer space');
        } else if (w + 1e-6 < min) row(min, basis, ru.sev, `clear width ${w.toFixed(2)} < ${pyNum(min)}`);
        if (ru.also && w + 1e-6 < ru.also.min) row(ru.also.min, ru.also.basis, 'note', `clear width ${w.toFixed(2)} < ${pyNum(ru.also.min)}`);
        if (ru.area && A + 1e-6 < ru.area) row(ru.area, 'area (audit_rooms.py; not a width)', 'note', `area ${A.toFixed(1)} < ${pyNum(ru.area)}`);
        if (ru.refuge) {
          const counted = A - thinArea(rs, 2.4);   // cells where the room is under 2.4 m wide do not count (audit_rooms.py local_width)
          refuge.push({ storey: st, room: x.id, name: nm, area_m2: +A.toFixed(1), counted_m2: +counted.toFixed(1), basis: 'parts under 2.4 m wide do not count (' + SPEC + ')' });
        }
      }
      // shape notes, as audit_rooms.py
      const sl = rs.filter(r => r !== big && rw(r) < 1.2 && ra(r) > 0.5).map(r => +rw(r).toFixed(2));
      if (sl.length && !/corridor|lobby|passage/.test(l)) row(null, 'audit_rooms.py shape check (our judgment ?)', 'note', `slivers [${sl.map(pyNum).join(', ')}] m wide`);
      if (rs.length === 1 && L / rw(big) > 6 && !/corridor|passage|stair|aisle|drive|shaft|riser|lift/.test(l)) row(null, 'audit_rooms.py shape check (our judgment ?)', 'note', `very long and thin (${L.toFixed(1)} x ${rw(big).toFixed(1)})`);
    }
    return { rows, refuge };
  }

  const api = { tReach, deadEnds, tWidth, inferKind, kindOf, circleFits, maxSquare, DEAD_LIMIT };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) { root.BD = root.BD || {}; root.BD.treach = api; }
})(typeof window !== 'undefined' ? window : null);
