/* Beyond Data — Emergency hub layout, rule sheet v1 (job F2, 8 Nov 2026; spec Claude Link/eh/specs/emergency_hub.md parts 1–3 FINAL, Part 7;
   room minimums and widths: eh/specs/room_minimums_rule_2026-11-08.md).
   BD.hub.build(P) lays the Emergency hub out on the tool's lot (P = arch.js place(), P.s.M = the site model) and returns the shape of
   BD.plan.build (storeys with rooms, corridors, stairs, lifts, doors, exits, walls; exitSep; flags; version) plus: every room's kind and line
   (spec 15a), its minimum and target area, minimum width, step and source, rank; doors in the treach.js format; the variant and fallback
   ladder step with its limiting rule; the plant layout with the Vertiv clear zones; loading; grades and the step-free result; height;
   travel along the path; exits apart; and the T-reach, dead-end and T-width results (tool/treach.js).
   Placement, sizes and MW of the rest of the tool are not changed: the hub is drawn on the lot, from its own rules (the Architecture cards only).
   Every dimension is a code or bylaw figure with its clause, a spec figure, or a DRAWING CHOICE named in RULES; missing figures are '?'.
   Frame: a = metres from the front building line toward the rear, b = metres across from the side away from the drive (or lane) to the drive
   side. Output rectangles are in the tool's lot frame (u, v): [u0, u1, v0, v1]. The core (layout) is plain data in, plain data out, so
   checks/tests/hub_part7.js runs it in node. */
(function (root) {
'use strict';
const TRm = (typeof module !== 'undefined' && module.exports) ? require('./treach.js') : null;
const TR = () => (root && root.BD && root.BD.treach) || TRm;
const r2 = x => Math.round(x * 100) / 100, up1 = x => Math.ceil(x * 10 - 1e-6) / 10, sum = a => a.reduce((s, x) => s + x, 0);
const ra = r => (r[1] - r[0]) * (r[3] - r[2]);

/* ---------- the rule sheet: every figure with its source, or named a drawing choice ---------- */
const RULES = {
  version: 'hub rule sheet v1 (8 Nov 2026)',
  cor: { w: 2.0, why: 'public and secure corridors 2.0 m (spec 15b, drawing choice; code ≥ 1,100 mm, VBBL 3.3.1.9)' },
  ccor: { w: 2.0, why: 'clinic corridor 2.0 m (spec 15b 1.8–2.0 m, drawing choice; stretcher widths in CSA Z8000, unread ?)' },
  stair: { w: 2.6, l: 6.9, why: 'exit stairs 2.6 × 6.9 m (drawing choice, as Cowork’s fits; two 1.1 m flights, VBBL 3.4.3.2)' },
  e1: { w: 2.4, l: 3.0, why: 'public lift E1 shaft 2.4 × 3.0 m (drawing choice; a lift to every storey, VBBL 3.8.2.3)' },
  e2: { w: 2.6, l: 3.6, why: 'freight lift E2 shaft 2.6 × 3.6 m (spec 1b car ≈ 2.5 × 3.4 m, drawing choice; passenger-rated, the staff accessible route)' },
  door: { w: 0.9, why: '0.9 m doors (doorway ≥ 850 mm, VBBL / NBC Table 3.4.3.2.-A); travel measured through 0.9 m doors (spec rule 6)' },
  street: { w: 1.8, why: 'street doors 1.8 m (spec 15c, drawing choice)' },
  lobby: { w: 6.0, m2: 20, why: 'shared lobby ≥ 20 m² (spec 15c, drawing choice), 6.0 m wide on the street (drawing choice)' },
  band: { why: 'bands street → rear (spec rule 1): hub front row (refuge, shelter, lobby on the street) → public corridor → hub service row → data-centre entrance row and loading → covered truck court → plant yard' },
  rowB: { d: 5.0, why: 'beside variant: service rows 5.0 m deep (drawing choice; keeps a 5-exam clinic under 500 m², BE 3.3.1)' },
  rowR: { d: 6.9, why: 'hub service row as deep as a stair (6.9 m, drawing choice) so the clinic stairs and lift sit in it' },
  wcMod: { w: 0.9, why: 'washroom rooms 0.9 m of wall per WC, stalls along the room depth (drawing choice; counts from VBBL Table 3.7.2.2.-A/-B)' },
  smallRoom: { w: 1.6, why: 'small rooms (cot storage, single WC, storage) 1.6 m wide (drawing choice; T-width minimum 1.5 m, spec)' },
  dcFront: { d: 3.6, why: 'storey-2 data-centre front row 3.6 m deep, as the freight lift (drawing choice)' },
  ves: { w: 2.6, l: 6.0, why: 'staff vestibule, guard point and portal 2.6 × 6.0 m (portal 1.8 × 1.8 m, arch_acc_gcpsg015RZ; rest drawing choice)' },
  dock: { l: 6.0, why: 'dock and lift lobby 6.0 m deep (drawing choice)' },
  aisle: { w: 6.1, why: '6.1 m truck aisle (Parking By-law 5.4.1; Edmonton not given, Vancouver’s used ?) and a 6.1 m yard aisle behind the building (drawing choice)' },
  pexit: { w: 1.2, why: 'exit passages 1.2 m (≥ 1.1 m, VBBL 3.3.1.9; 2 h)' },
  storeyH: { hall: 6.0, up: 4.0, why: 'hall storey 6.0 m (drawing choice, TIA-942 unread); upper storeys 4.0 m (I-2 3.2.2.9 / I-3 3.1.2.9 minimum); ground 6.1 m I-2 (3.1.2.4), 6.0 m I-3 (3.1.2.9); Edmonton one storey at 6.0 m (no storey minimum in BE, drawing choice)' },
  hallPerMW: { v: 630, why: 'data hall 630 m² a MW (spec 1b: fits use the tool’s low-MW end; dc_rooms.json arch_dc_hall)' },
  cap: { m2: 2325, why: 'hub cap: data centre ≤ 2,325 m² and one hall storey on every lot, smaller where the lot can’t hold it (J.B. 8 Nov, drawing choice; Vancouver Parking By-law 5.2.5 step)' },
  grid: { g: 0.25, why: 'travel along the path on a 0.25 m grid, 8 directions, through the doors (spec rule 6); ≤ 45 m sprinklered (VBBL 3.4.2.5)' },
  base: { why: 'base surface: the corner grades joined by triangles; both triangulations computed (fans from neighbouring corners: on a four-corner lot the two diagonals) and the lower surface used under the building (Z&D s. 2 joins the corner grades; J.B. 8 Nov, our reading)' },
};
/* program minimums (spec Part 1; step = room_minimums_rule step) */
const PRG = {
  refuge: { m2: 175, w: 4.0, step: 4, src: 'arch_ahsReceptionCentres, arch_edmExtremeWeather: 50 people × 3.5 m² (J.B. 8 Nov)', rank: 1 },
  shelter: { m2: 56, w: 4.0, step: 4, src: '16 guests × 3.5 m² (J.B. 8 Nov; our extension of the rate)', rank: 2 },
  fa: { m2: 9.3, w: 2.7, step: 3, src: 'WorkSafeBC first aid facilities (guidance); width spec', rank: 1 },
  off: { m2: 8, w: 2.4, step: 6, src: 'drawing choice (target 8 m², arch_sup_eastglenRooms analogy)', rank: 1 },
  uwc: { m2: 5.5, w: 2.0, step: 1, src: 'VBBL 3.8.3.13: 1,700 mm turning circle (2.0 m wide, drawing choice)', rank: 1 },
  sho: { m2: 2.7, w: 1.8, step: 1, src: 'VBBL 3.8.3.17.(1): 1.5 × 1.8 m', rank: 1 },
  cot: { m2: null, w: 1.6, step: 6, src: 'no source: drawing choice', rank: 1 },
  pmec: { m2: null, w: 2.0, step: 6, src: 'no source: drawing choice (filtration plant, emergency panel)', rank: 1 },
  exam: { m2: 12.0, w: 3.0, step: 3, src: 'arch_sup_abGFNARooms (guideline); width spec', rank: 3 },
  proc: { m2: 15.5, w: 3.0, step: 3, src: 'arch_sup_abGFNARooms', rank: 3 },
  cons: { m2: 12.0, w: 3.0, step: 3, src: 'arch_sup_abGFNARooms', rank: 3 },
  med: { m2: 10.0, w: 1.6, step: 3, src: 'arch_sup_abGFNARooms', rank: 3 },
  cln: { m2: 11.0, w: 1.6, step: 3, src: 'arch_sup_abGFNARooms', rank: 3 },
  soil: { m2: 13.5, w: 2.0, step: 3, src: 'arch_sup_abGFNARooms', rank: 3 },
  hk: { m2: 7.0, w: 1.6, step: 3, src: 'arch_sup_abGFNARooms', rank: 3 },
  cstf: { m2: null, w: 2.4, step: 3, src: 'staff lounge 0.5 m² a staff member (arch_sup_abGFNARooms); staff count ?', rank: 3 },
  coff: { m2: null, w: 2.4, step: 6, src: 'drawing choice', rank: 3 },
  cst: { m2: null, w: 1.6, step: 6, src: 'drawing choice', rank: 3 },
  wait: { m2: null, w: 4.0, step: 6, src: 'drawing choice', rank: 3 },
  ups: { w: 3.0, step: 2, src: '⌈MW⌉ + 1 modules (ups_modules, galaxyVX) + 1.0 m working space (CEC 2-308, second-hand ?)' },
  bat: { w: 3.0, step: 2, src: 'battery_cabinets, vertivLi5; 2 h room (nfpa855_2026)' },
  bhv: { w: 3.0, step: 6, src: 'arch_up_fm0528 (insurer); size ?' },
  mv: { w: 3.0, step: 2, src: 'arch_up_fm0523; equipment + working space ?' },
  mmr: { w: 2.4, step: 6, src: 'TIA-942 unread: drawing choice' },
  valv: { w: 1.5, step: 6, src: 'drawing choice' },
  jan: { w: 1.5, step: 6, src: 'drawing choice' },
  garb: { w: 2.4, step: 6, src: 'drawing choice' },
  noc: { w: 2.4, step: 6, src: 'drawing choice (TIA-942 unread)' },
  doff: { m2: 100, w: 2.4, step: 5, src: 'burlingtonPlans2026 (one filed plan)' },
  brk: { m2: 24, w: 2.4, step: 5, src: 'burlingtonPlans2026' },
  dwc: { w: 1.6, step: 1, src: '1 WC per ≤ 25 staff (VBBL 3.7.2.2)' },
  ship: { m2: 45 + 58.6, w: 2.4, step: 5, src: 'shipping 45 + storage and staging 40 + 18.6 m² (burlingtonPlans2026)' },
};
/* VBBL Table 3.7.2.2.-A, WCs a sex (M, F) by persons of that sex (spec Part 1) */
const TA = [[25, 1, 1], [50, 1, 2], [75, 2, 3], [100, 2, 4], [125, 3, 5], [150, 3, 6], [175, 4, 7], [200, 4, 8], [250, 5, 9], [300, 5, 10], [350, 6, 11], [400, 6, 12]];
function wcA(n) { for (const r of TA) if (n <= r[0]) return [r[1], r[2]]; return [7 + Math.ceil((n - 400) / 200), 13 + Math.ceil((n - 400) / 100)]; }
function wcB(p) { return p <= 25 ? 1 : p <= 50 ? 2 : 3 + Math.ceil((p - 50) / 50); }   // VBBL Table 3.7.2.2.-B ('over 50: 3 + 1 per extra 50'): a partial increment counts, so 51–100 → 4 (J.B. 8 Nov: our reading, conservative)

/* ---------- geometry helpers on the lot ---------- */
function inPoly(p, ring) { let c = false; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) { const [xi, yi] = ring[i], [xj, yj] = ring[j]; if ((yi > p[1]) !== (yj > p[1]) && p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi) c = !c; } return c; }
function dSeg(p, a, b) { const dx = b[0] - a[0], dy = b[1] - a[1], l = dx * dx + dy * dy || 1; let t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l; t = Math.max(0, Math.min(1, t)); return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy); }

/* ---------- the site, from the tool (browser adapter) ---------- */
let GPV = null;
function gradePoints(city, id) { if (city !== 'van' || !root || typeof XMLHttpRequest === 'undefined') return null;
  if (GPV === null) { try { const x = new XMLHttpRequest(); x.open('GET', 'data/grade_points_van.json', false); x.send(null); GPV = JSON.parse(x.responseText).lots || {}; } catch (e) { GPV = {}; } }
  return GPV[id] || null; }
function siteOf(P) { const s = P.s, M = s.M, F = M.F, L = (X, Y) => F.toL(X, Y).map(r2);
  const ring = []; for (let i = 0; i < M.ring.length; i += 2) ring.push(L(M.ring[i], M.ring[i + 1]));
  if (ring.length > 1 && Math.hypot(ring[0][0] - ring[ring.length - 1][0], ring[0][1] - ring[ring.length - 1][1]) < 0.01) ring.pop();
  const edges = (M.edgeYards || []).map(e => ({ kind: e.kind, abuts: e.abuts, d: e.d || 0, a: L(e.ax, e.ay), b: L(e.bx, e.by) }));
  const bb = ring2 => { const q = []; for (let i = 0; i < ring2.length; i += 2) q.push(L(ring2[i], ring2[i + 1])); return [Math.min(...q.map(x => x[0])), Math.max(...q.map(x => x[0])), Math.min(...q.map(x => x[1])), Math.max(...q.map(x => x[1]))]; };
  const sel = (root.BD && root.BD.S && root.BD.S.sel) || {}, Z = M.Z || {}, base = Z.base || {}, An = (root.BD.S && root.BD.S.answers) || {};
  const gp = gradePoints(M.city, sel.id); let grade = null;
  if (gp) grade = { corners: (gp.c || []).map(c => L(c[0], c[1]).concat([c[2]])), edges: (gp.e || []).map(e => ({ a: L(e[0], e[1]), b: L(e[2], e[3]), z: e[4] })) };
  return { city: M.city, id: sel.id || null, addr: sel.a ? sel.a[0] : null, zone: String(Z.zone || '').toUpperCase(), dir: s.dir < 0 ? -1 : 1, uf: s.uf, ring, edges,
    sideDrive: M.sideDrive ? { w: M.sideDrive.w, inYard: M.sideDrive.inYard, r: bb(M.sideDrive.ring) } : null, maxDepth: base.yards && base.yards.max || null,
    hLimit: M.H || null, mw: (P.ratio && P.ratio.mwTest) || An.mw || M.mwSized || null, fcl: M.grade && M.grade.fcl ? { v: M.grade.fcl.v, datum: M.grade.fcl.datum, src: M.grade.fcl.src } : null,
    gradeDatum: M.grade ? M.grade.datum : null, grade };
}

/* ---------- the core ---------- */
function layout(S0) {
  const S = S0, city = S.city, van = city === 'van', zone = S.zone || '', flags = [], notes = [];
  const I2 = /^I-2/.test(zone), I3 = /^I-3/.test(zone), stackedZone = van && (I2 || I3);
  /* yard test: inside the lot and at least each edge's yard from it (Z&D 10.13.1; Edmonton s. 2.120 setbacks as the tool's edges carry them) */
  const ring = S.ring, E = S.edges.filter(e => e.d > 0);
  const inYard = (u, v) => inPoly([u, v], ring) && E.every(e => dSeg([u, v], e.a, e.b) >= e.d - 1e-6);
  const drive = S.sideDrive && S.sideDrive.r, inDrive = (u, v) => drive && u > drive[0] + 1e-6 && u < drive[1] - 1e-6 && v > drive[2] + 1e-6 && v < drive[3] - 1e-6;
  /* drive side: the side drive, else a lane along a side, else the low-v side (drawing choice) */
  const vs = ring.map(p => p[1]), vMid = (Math.min(...vs) + Math.max(...vs)) / 2;
  let sv = -1, driveWhy = 'no lane or side drive: the drive side is taken as the low-v side (drawing choice)';
  if (drive) { sv = (drive[2] + drive[3]) / 2 > vMid ? 1 : -1; driveWhy = `side drive ${S.sideDrive.w} m ${S.sideDrive.inYard > 0.1 ? 'in the side yard' : 'taking frontage'} (site.js); the side is the site model's choice (drawing choice, accepted by J.B. 8 Nov)`; }
  else { const al = S.edges.find(e => e.abuts === 'alley' && e.kind !== 'front'); if (al) { sv = (al.a[1] + al.b[1]) / 2 > vMid ? 1 : -1; driveWhy = 'the lane along the side'; } }
  const dir = S.dir, uf = S.uf, uOf = a => uf - dir * a;
  /* across-span of the yard at depth a (v interval, 0.05 m samples), the drive cut out */
  const vMin = Math.min(...vs), vMax = Math.max(...vs);
  function span(a) { const u = uOf(a); let best = null, cur = null;
    for (let v = vMin; v <= vMax + 1e-9; v += 0.05) { const ok = inYard(u, v) && !inDrive(u, v); if (ok) { if (!cur) cur = [v, v]; cur[1] = v; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
    if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; return best; }
  let a0 = 0; { const ref = span(3); for (let a = 0; a < 3; a += 0.05) { const sp = span(a); if (sp && ref && sp[1] - sp[0] >= ref[1] - ref[0] - 0.06) { a0 = r2(a); break; } } }
  const spanOver = (a1, a2) => { let lo = -1e9, hi = 1e9; for (let a = a1; a <= a2 + 1e-9; a += 0.5) { const sp = span(a0 + Math.min(a, a2)); if (!sp) return null; lo = Math.max(lo, sp[0]); hi = Math.min(hi, sp[1]); } return [r2(lo + 0.02), r2(hi - 0.02)]; };
  /* depth available for the building: the yard, and the zone's depth limit (I-3 3.1.2.7 61 m) */
  let aMax = 0; for (let a = 0; a < 200; a += 0.5) { const sp = span(a0 + a); if (!sp || sp[1] - sp[0] < 10) break; aMax = a; }
  if (S.maxDepth) aMax = Math.min(aMax, S.maxDepth);
  const res = { site: { a0, aMax: r2(aMax), driveSide: sv > 0 ? 'high v' : 'low v', driveWhy }, flags, notes };

  /* variants (spec Part 2; J.B. 8 Nov: stacked, beside, side drive, small, clinic ≤ 500 now; corner, through, turned, height-capped not yet) */
  const streets = S.edges.filter(e => e.abuts === 'street');
  const variant = { main: stackedZone ? 'stacked' : 'beside', sideDrive: !!drive, notBuilt: [] };
  if (streets.some(e => e.kind !== 'front')) { variant.notBuilt.push(streets.some(e => e.kind === 'rear') ? 'through lot' : 'corner'); }
  if (!van) flags.push('Edmonton: every hub needs a rezoning (a data centre is Major Industrial, not in BE; IH does not allow the refuge, shelter or clinic). Shown as if rezoned; the design does not change (J.B. 8 Nov).');
  if (van && !stackedZone) flags.push(`Zone ${zone}: the stacked variant is drawn only for I-2 and I-3; ${zone} drawn as beside (?)`);

  const H = RULES.storeyH, ground = van ? (I2 ? 6.1 : 6.0) : H.hall;
  const lad = [{ k: 1, t: 'full program', exams: 13, shelter: true, shared: false }, { k: 2, t: 'clinic 13 → 5 exam rooms', exams: 5, shelter: true, shared: false },
    { k: 3, t: 'no clinic', exams: 0, shelter: true, shared: false }, { k: 4, t: 'shelter merged into the refuge (day)', exams: 0, shelter: false, shared: false },
    { k: 5, t: 'shared loading by approval (Parking By-law 5.1.5)', exams: 0, shelter: false, shared: true }];
  let out = null, why = [];
  for (const st of lad) {
    const tryMW = mw => (variant.main === 'stacked' ? stacked : beside)({ S, st, mw, a0, aMax, spanOver, uOf, sv, van, I2, I3, ground, inYard, inDrive, flags });
    let mw = S.mw || 1.8, L = tryMW(mw);
    if (L.fail) { why.push(`step ${st.k} (${st.t}): ${L.fail}`); continue; }
    /* the plant must fit: else the hall shrinks ("smaller where the lot can't hold it") */
    let guard = 0; while (L.plant && !L.plant.ok && guard++ < 16) { mw = r2(L.MW - 0.25); if (mw < 0.3) break; const L2 = tryMW(mw); if (L2.fail) break; L = L2; }
    if (L.plant && !L.plant.ok) { why.push(`step ${st.k} (${st.t}): plant does not fit (${L.plant.why})`); continue; }
    out = L; out.ladder = { step: st.k, what: st.t, limiting: why.slice() }; break;
  }
  if (!out) { res.doesntFit = { limiting: why }; flags.push('Doesn’t fit here (ladder step 7): ' + why.join('; '));
    const front = streets.find(e => e.kind === 'front'), fw = front ? Math.hypot(front.b[0] - front.a[0], front.b[1] - front.a[1]) : null;
    if (fw && fw > aMax) flags.push(`Not built yet: the turned variant (bands along the street, spec Part 2) might fit this wide, shallow lot (frontage ${Math.round(fw)} m, depth ${Math.round(aMax)} m) (?)`);
    return res; }
  if (variant.notBuilt.length) flags.push(`Not built yet: the ${variant.notBuilt.join(', ')} variant (J.B. 8 Nov: not this pass); drawn as ${variant.main}`);
  if (drive && van && I3 && S.sideDrive.inYard > 0.1) flags.push('Side drive in the I-3 side yard: flagged approval (I-3 3.1.2.16: the Director may decrease the side yard for loading access)');
  if (drive && van && I2) flags.push('Side drive in I-2 (0 m side yards): it takes frontage from the hub');
  if (!van) { const rs = sum(out.rooms[1].filter(x => x.block === 'hub' && x.kind === 'proom' && /^(ref|shel)/.test(x.id)).map(x => sum(x.r.map(ra))));
    flags.push(`Refuge and day shelter as Community Service (Bylaw 20001 s. 8.10, our reading): ${Math.round(rs)} m² ${rs <= 500 ? '≤' : '>'} 500 m² per establishment (3.12.1)`); }
  Object.assign(res, out, { variant, ground });
  res.toUV = (a, b) => [r2(uf - dir * (a0 + a)), r2(res.bOrigin + sv * b)];
  finish(res, S);
  return res;
}

/* row packing: items get max(min width, min area ÷ depth) to 0.1 m; the grow item takes what is left */
function pack(items, W, d) {
  const ws = items.map(it => it.fix != null ? it.fix : Math.max(it.w || 0, it.m2 ? up1(it.m2 / d) : 0));
  const tot = r2(sum(ws)); if (tot > W + 1e-6) return { fail: tot };
  const left = r2(W - tot), gi = items.findIndex(it => it.grow); if (gi >= 0) ws[gi] = r2(ws[gi] + left); else if (left > 0.01) ws[ws.length - 1] = r2(ws[ws.length - 1] + left);
  return { ws };
}
function place(items, ws, b0, aA, aB) { let b = b0; return items.map((it, i) => { const r = [r2(aA), r2(aB), r2(b), r2(b + ws[i])]; b = r2(b + ws[i]); return Object.assign({}, it, { rr: r }); }); }

/* room record */
function room(st, id, n, g, kind, rects, o) { return Object.assign({ st, id, n, g, kind, r: rects.map(r => r.map(r2)) }, o || {}); }

/* ---------- STACKED (Vancouver I-2 2.2.7, I-3 2.2.11 strict; I-3 2.2.6 clinic off the ground floor) ---------- */
function stacked(C) {
  const { st, van } = C, cw = RULES.cor.w, SW = RULES.stair.w, SL = RULES.stair.l, dR = RULES.rowR.d, wcm = RULES.wcMod.w, sm = RULES.smallRoom.w;
  /* the width: the yard across the first 40 m (refined once the depth is known) */
  let sp = C.spanOver(0, Math.min(40, C.aMax)); if (!sp) return { fail: 'no buildable width' };
  let W = r2(sp[1] - sp[0]);
  const build = (W, Da) => {
    const R = [], D = [];
    /* storey 1, front row: refuge (grows) | day shelter | lobby on the drive side (spec 15c: one wall on the main street) */
    const minF = (PRG.refuge.m2 + (st.shelter ? PRG.shelter.m2 : 0)) / (W - RULES.lobby.w);
    const dF = Math.max(6.0, up1(minF));
    const fItems = [{ id: 'ref', n: st.shelter ? 'Refuge main room' : 'Refuge main room, day shelter merged (ladder step 4)', k: 'refuge', w: 4.0, m2: PRG.refuge.m2, grow: true }]
      .concat(st.shelter ? [{ id: 'shel', n: 'Warming shelter rest area (day)', k: 'shelter', w: 4.0, m2: PRG.shelter.m2 }] : [])
      .concat([{ id: 'lob', n: 'Shared lobby', k: 'lobby', w: RULES.lobby.w }]);
    const pf = pack(fItems, W, dF); if (pf.fail) return { fail: `front row needs ${pf.fail} m across; ${W} m available (refuge ${PRG.refuge.m2} m² + shelter + lobby, spec 1a, 15c)` };
    const F = place(fItems, pf.ws, 0, 0, dF);
    const aC = dF, aR = r2(dF + cw), aB = r2(aR + dR);
    /* hub load and washrooms (Part 1: refuge + shelter area ÷ 0.75 m² a person, half each sex; Table 3.7.2.2.-A) */
    let ref2w = 0, rItems, pr;
    for (let it = 0; it < 4; it++) {
      const areaRS = sum(F.filter(x => x.k === 'refuge' || x.k === 'shelter').map(x => ra(x.rr))) + ref2w * dR;
      const load = Math.ceil(areaRS / 0.75), [nM, nF] = wcA(Math.ceil(load / 2));
      rItems = [{ id: 'p2', n: 'Stair P2 (clinic)', k: 'pcore', fix: SW, stair: true }, { id: 'e1', n: 'Lift E1 (public, storeys 1–2)', k: 'pcore', fix: RULES.e1.w, lift: true },
        { id: 'wcw', n: `WC women (${nF})`, k: 'proom', w: Math.max(sm, r2(nF * wcm)), wc: nF }, { id: 'wcm', n: `WC men (${nM})`, k: 'proom', w: Math.max(sm, r2(nM * wcm)), wc: nM },
        { id: 'uwc', n: 'Universal WC', k: 'proom', w: PRG.uwc.w }, { id: 'sho', n: 'Universal shower', k: 'proom', w: PRG.sho.w },
        { id: 'fa', n: 'First aid', k: 'proom', w: PRG.fa.w, m2: PRG.fa.m2 }, { id: 'off', n: 'Staff office (shared)', k: 'proom', w: PRG.off.w, m2: PRG.off.m2 },
        { id: 'cot', n: 'Cot and supply storage', k: 'proom', w: sm }, { id: 'pmec', n: 'Programs mechanical, emergency panel', k: 'plant', w: PRG.pmec.w },
        { id: 'ref2', n: 'Refuge, second room (grown into spare floor)', k: 'refuge2', w: 0, grow: true }, { id: 'p1', n: 'Stair P1 (clinic)', k: 'pcore', fix: SW, stair: true }];
      pr = pack(rItems, W, dR); if (pr.fail) return { fail: `hub service row needs ${pr.fail} m across; ${W} m available (washrooms for a load of ${load}, Table 3.7.2.2.-A)`, load };
      const g = pr.ws[rItems.findIndex(x => x.id === 'ref2')];
      if (g < PRG.refuge.w) { const ci = rItems.findIndex(x => x.id === 'cot'); pr.ws[ci] = r2(pr.ws[ci] + g); pr.ws[rItems.findIndex(x => x.id === 'ref2')] = 0; if (ref2w === 0) break; ref2w = 0; continue; }
      if (Math.abs(g - ref2w) < 0.05) break; ref2w = g;
    }
    const Rr = place(rItems, pr.ws, 0, aR, aB).filter(x => x.rr[3] - x.rr[2] > 0.01);
    /* storey 1 rooms */
    const pub = (x, rect, extra) => R.push(room(1, x.id, x.n, x.k === 'plant' ? 'plant' : x.k === 'lobby' ? 'circ' : x.k === 'pcore' ? 'circ' : 'pub', x.k === 'refuge' || x.k === 'shelter' || x.k === 'refuge2' ? 'proom' : x.k, rect, Object.assign({ block: 'hub' }, extra || {})));
    F.forEach(x => pub(x, [x.rr], { prog: x.k }));
    R.push(room(1, 'cor', 'Public corridor', 'circ', 'pcor', [[aC, aR, 0, W]], { block: 'hub', corridor: true }));
    Rr.forEach(x => { if (x.lift) { pub(x, [[aR, r2(aR + RULES.e1.l), x.rr[2], x.rr[3]]], { core: true, lift: true }); R.push(room(1, 'psh', 'Programs shaft', 'circ', 'shaft', [[r2(aR + RULES.e1.l), aB, x.rr[2], x.rr[3]]], { block: 'hub', core: true })); }
      else pub(x, [x.rr], { core: !!x.stair, stair: !!x.stair, prog: x.k }); });
    /* storey 1, data-centre entrance row (rule 4: entrance rooms only): S1 | bays | dock | E2 | vestibule | S2 */
    const bayL = van ? 10.2 : 9.0, bayW = van ? 3.4 : 3.3;
    return { R, D, F, Rr, dF, aC, aR, aB, bayL, bayW };
  };
  /* first pass for the hub rows, then the depth from the hall the MW needs */
  let B = build(W, 0); if (B.fail) return B;
  const aB = B.aB, cores = 2 * SW * SL + RULES.e2.w * RULES.e2.l;
  const hallNeed = RULES.hallPerMW.v * C.mw;
  let Da = up1((hallNeed + cores) / W);
  const minDa = r2(aB + RULES.dcFront.d + RULES.cor.w + 6.0);   // a storey-2 back row of at least 6 m (drawing choice)
  Da = Math.max(Da, minDa, r2(aB + B.bayL + 0.1));
  if (Da > C.aMax) { Da = Math.floor(C.aMax * 10) / 10; if (Da < minDa) return { fail: `the lot is ${C.aMax} m deep inside the yards and depth limit; the stacked hub needs ${minDa} m` }; }
  /* width over the full depth (slanted yard lines) */
  sp = C.spanOver(0, Da); if (!sp) return { fail: 'no width over the building depth' };
  if (r2(sp[1] - sp[0]) < W - 0.01) { W = r2(sp[1] - sp[0]); B = build(W, Da); if (B.fail) return B; }
  const bOrigin = C.sv < 0 ? sp[1] : sp[0];
  C.mapUV = (a, b) => [C.uOf(C.a0 + a), bOrigin + C.sv * b];
  const L = stackedRest(C, B, W, Da);
  if (L.fail) return L;
  Object.assign(L, { W, Da, bOrigin });
  /* hub cap: data centre ≤ 2,325 m² */
  let guard = 0; while (L.dcArea > RULES.cap.m2 + 0.5 && guard++ < 60) { const Da2 = r2(L.Da - 0.5); if (Da2 < minDa) break; const L2 = stackedRest(C, B, W, Da2); if (L2.fail) break; Object.assign(L2, { W, Da: Da2, bOrigin }); Object.assign(L, L2); L.capped = true; }
  return L;
}
function stackedRest(C, B, W, Da) {
  const { st, van } = C, cw = RULES.cor.w, SW = RULES.stair.w, SL = RULES.stair.l, sm = RULES.smallRoom.w;
  const R = B.R.slice(), aB = B.aB, aC = B.aC, aR = B.aR, dF = B.dF;
  /* loading count (rule 10) needs the areas: first the rooms, then the bays */
  const hubArea = sum(R.filter(x => x.block === 'hub' && !x.core).map(x => sum(x.r.map(ra))));
  /* storey 2, clinic over the hub (I-3 2.2.6): front row | clinic corridor (over the public corridor) | back row with P2, E1, P1 */
  const R2 = []; let clin = 0, clinWhy = null;
  const dcFrontD = RULES.dcFront.d;
  if (st.exams > 0) {
    const fI = [];
    for (let i = 1; i <= st.exams; i++) fI.push({ id: 'ex' + i, n: 'Exam room ' + i, w: PRG.exam.w, m2: PRG.exam.m2, p: 'exam' });
    fI.push({ id: 'proc', n: 'Procedure room', w: PRG.proc.w, m2: PRG.proc.m2, p: 'proc' }, { id: 'wait', n: 'Clinic waiting, reception', w: PRG.wait.w, grow: true, p: 'wait' },
      { id: 'coff', n: 'Clinic office', w: PRG.coff.w, p: 'coff' }, { id: 'cstf', n: 'Clinic staff lounge, lockers', w: PRG.cstf.w, p: 'cstf' }, { id: 'cst', n: 'Clinic storage', w: PRG.cst.w, p: 'cst' });
    const pf = pack(fI, W, dF);
    if (pf.fail) return { fail: `clinic front row needs ${pf.fail} m for ${st.exams} exam rooms ${PRG.exam.w} m wide (spec width); ${W} m available` };
    /* back row between the clinic stairs: P2 | E1 | consult, medication, clean, soiled, housekeeping, WCs, universal WC | unassigned | P1 */
    let nwc = 1, bI, pb;
    for (let it = 0; it < 3; it++) {
      bI = [{ id: 'p2', fix: SW }, { id: 'e1', fix: RULES.e1.w }, { id: 'cons', n: 'Consult room', w: PRG.cons.w, m2: PRG.cons.m2, p: 'cons' }, { id: 'med', n: 'Medication room', w: PRG.med.w, m2: PRG.med.m2, p: 'med' },
        { id: 'cln', n: 'Clean supply', w: PRG.cln.w, m2: PRG.cln.m2, p: 'cln' }, { id: 'soil', n: 'Soiled holding', w: PRG.soil.w, m2: PRG.soil.m2, p: 'soil' }, { id: 'hk', n: 'Housekeeping', w: PRG.hk.w, m2: PRG.hk.m2, p: 'hk' }]
        .concat(Array.from({ length: Math.max(0, 2 * nwc - 1) }, (_, i) => ({ id: 'cwc' + (i + 1), n: 'Clinic WC ' + (i + 1), w: sm, p: 'cwc' })))
        .concat([{ id: 'cuw', n: 'Clinic universal WC', w: PRG.uwc.w, p: 'uwc' }, { id: 'cspare', n: 'Unassigned (no use yet), off the clinic corridor', w: 0, grow: true, spare: true }, { id: 'p1', fix: SW }]);
      pb = pack(bI, W, RULES.rowR.d); if (pb.fail) return { fail: `clinic back row needs ${pb.fail} m; ${W} m available` };
      const est = W * dF + W * cw + sum(bI.map((x, i) => (x.p ? pb.ws[i] : 0))) * RULES.rowR.d;
      const n2 = wcB(Math.ceil(est / 9.3)); if (n2 === nwc) break; nwc = n2;
    }
    const Fc = place(fI, pf.ws, 0, 0, dF), Bc = place(bI, pb.ws, 0, aR, aB);
    Fc.forEach(x => R2.push(room(2, x.id, x.n, 'clin', 'croom', [x.rr], { block: 'clinic', prog: x.p })));
    R2.push(room(2, 'ccor', 'Clinic corridor', 'clin', 'ccor', [[aC, aR, 0, W]], { block: 'clinic', corridor: true }));
    Bc.forEach(x => { if (x.id === 'p2' || x.id === 'p1') R2.push(room(2, x.id, `Stair ${x.id.toUpperCase()} (clinic)`, 'circ', 'pcore', [x.rr], { block: 'clinic', core: true, stair: true }));
      else if (x.id === 'e1') { R2.push(room(2, 'e1', 'Lift E1 (public)', 'circ', 'pcore', [[aR, r2(aR + RULES.e1.l), x.rr[2], x.rr[3]]], { block: 'clinic', core: true, lift: true })); R2.push(room(2, 'psh', 'Programs shaft', 'circ', 'shaft', [[r2(aR + RULES.e1.l), aB, x.rr[2], x.rr[3]]], { block: 'clinic', core: true })); }
      else if (x.rr[3] - x.rr[2] > 0.01) R2.push(room(2, x.id, x.n, x.spare ? 'spare' : 'clin', x.spare ? 'spare' : 'croom', [x.rr], { block: x.spare ? 'spare' : 'clinic', prog: x.p })); });
    clin = sum(R2.filter(x => x.block === 'clinic' && !x.core).map(x => sum(x.r.map(ra))));
    if (clin > 500 && van) clinWhy = 'clinic over 500 m²: one loading space (Parking By-law 5.2.9)';
  } else {
    /* no clinic: storey 2 over the hub is unassigned floor off the public lift (spare rule) — kept, with P1, P2 and E1 so it is reached */
    R2.push(room(2, 'ccor', 'Corridor to unassigned floor', 'circ', 'ccor', [[aC, aR, 0, W]], { block: 'spare', corridor: true }));
    R2.push(room(2, 'sparef', 'Unassigned (no use yet)', 'spare', 'spare', [[0, dF, 0, W]], { block: 'spare' }));
    const Rr = B.Rr; Rr.forEach(x => { if (x.id === 'p2' || x.id === 'p1') R2.push(room(2, x.id, `Stair ${x.id.toUpperCase()}`, 'circ', 'pcore', [x.rr], { block: 'spare', core: true, stair: true }));
      else if (x.id === 'e1') { R2.push(room(2, 'e1', 'Lift E1 (public)', 'circ', 'pcore', [[aR, r2(aR + RULES.e1.l), x.rr[2], x.rr[3]]], { block: 'spare', core: true, lift: true })); R2.push(room(2, 'psh', 'Programs shaft', 'circ', 'shaft', [[r2(aR + RULES.e1.l), aB, x.rr[2], x.rr[3]]], { block: 'spare', core: true })); } });
    const b0 = r2(B.Rr.find(x => x.id === 'e1').rr[3]), b1 = r2(B.Rr.find(x => x.id === 'p1').rr[2]);
    R2.push(room(2, 'sparer', 'Unassigned (no use yet)', 'spare', 'spare', [[aR, aB, b0, b1]], { block: 'spare' }));
  }
  /* storey 1 DC entrance row */
  const dcGuess = W * (Da - aB) + (W * Da - 2 * SW * SL - RULES.e2.w * RULES.e2.l) + 3 * 20;
  const nDC = van ? bays5_2_5(dcGuess) : 0, nRef = van ? (hubArea < 100 ? 0 : Math.ceil(hubArea / 2800)) : 0, nCl = van ? (clin < 500 ? 0 : clin <= 5000 ? 1 : clin <= 10000 ? 2 : 3) : 0;
  let nb = van ? (st.shared ? Math.max(nDC, nRef) + nCl : nDC + nRef + nCl) : null;
  if (!van) { const tot = hubArea + clin + dcGuess; nb = tot < 2500 ? 0 : tot <= 7500 ? 1 : 2; }
  const bayL = B.bayL, bayW = B.bayW;
  const dItems = [{ id: 's1', fix: SW }].concat(Array.from({ length: nb }, (_, i) => ({ id: 'b' + (i + 1), fix: bayW })))
    .concat([{ id: 'dock', w: 2.4, grow: true }, { id: 'e2', fix: RULES.e2.w }, { id: 'ves', fix: RULES.ves.w }, { id: 's2', fix: SW }]);
  const pd = pack(dItems, W, bayL); if (pd.fail) return { fail: `the data-centre entrance row needs ${pd.fail} m (${nb} loading spaces ${bayW} m wide, rule 10); ${W} m available`, nb };
  const Dd = place(dItems, pd.ws, 0, aB, aB);
  const at = id => Dd.find(x => x.id === id).rr;
  const sec = (st_, id, n, kind, rects, o) => room(st_, id, n, kind === 'hall' ? 'hall' : kind === 'bay' ? 'load' : 'sup', kind, rects, Object.assign({ block: 'data centre' }, o || {}));
  const s1 = at('s1'), s2 = at('s2'), e2 = at('e2'), ves = at('ves'), dock = at('dock');
  const S1r = [aB, r2(aB + SL), s1[2], s1[3]], S2r = [aB, r2(aB + SL), s2[2], s2[3]], E2r = [aB, r2(aB + RULES.e2.l), e2[2], e2[3]];
  const VESr = [aB, r2(aB + RULES.ves.l), ves[2], ves[3]], DOCKr = [aB, r2(aB + RULES.dock.l), dock[2], dock[3]];
  R.push(sec(1, 's1', 'Stair S1 (data centre)', 'score', [S1r], { core: true, stair: true }));
  Dd.filter(x => /^b\d/.test(x.id)).forEach((x, i) => R.push(sec(1, x.id, `Loading space ${i + 1}, ${van ? 'Class B 10.2 × 3.4 m' : '9.0 × 3.3 m'}`, 'bay', [[aB, r2(aB + bayL), x.rr[2], x.rr[3]]])));
  R.push(sec(1, 'dock', 'Dock and lift lobby (entrance)', 'dock', [DOCKr, [r2(aB + RULES.e2.l), r2(aB + RULES.dock.l), e2[2], e2[3]]].filter(r => r[1] - r[0] > 0.01)));
  R.push(sec(1, 'e2', 'Freight lift E2 (passenger-rated)', 'score', [E2r], { core: true, lift: true }));
  R.push(sec(1, 'ves', 'DC staff entrance: vestibule, guard point, portal', 'entry', [VESr]));
  R.push(sec(1, 's2', 'Stair S2 (data centre)', 'score', [S2r], { core: true, stair: true }));
  /* storey 2 data centre: secure corridor between S1 and S2, front row (3.6 m) and back row */
  const aS = r2(aB + RULES.e2.l), aS2 = r2(aS + RULES.cor.w), SC = [aS, aS2, s1[3], s2[2]];
  R2.push(sec(2, 's1', 'Stair S1 (data centre)', 'score', [S1r], { core: true, stair: true }), sec(2, 's2', 'Stair S2 (data centre)', 'score', [S2r], { core: true, stair: true }),
    sec(2, 'e2', 'Freight lift E2', 'score', [E2r], { core: true, lift: true }), sec(2, 'dcor', 'Secure corridor', 'scor', [SC], { corridor: true }));
  const mw = C.mw, q = (W * Da - 2 * SW * SL - RULES.e2.w * RULES.e2.l);
  const MWest = q / RULES.hallPerMW.v;
  const upsM2 = r2(MWest * 3.3 + 1.0 * PRG.ups.w), batM2 = r2(MWest * 1.8 + 1.0 * PRG.bat.w);
  const frontL = [{ id: 'ups', n: `UPS room (${Math.ceil(MWest) + 1} modules, N+1)`, w: PRG.ups.w, m2: upsM2 }, { id: 'bat', n: 'Battery room, Li-ion', w: PRG.bat.w, m2: batM2 },
    { id: 'bhv', n: 'Battery room HVAC (separate)', w: PRG.bhv.w }, { id: 'mv', n: 'MV switchgear, main electrical', w: PRG.mv.w }];
  const frontR = [{ id: 'mmr1', n: 'Meet-me room 1', w: PRG.mmr.w }, { id: 'mmr2', n: 'Meet-me room 2', w: PRG.mmr.w }, { id: 'valv', n: 'Sprinkler valve room, cylinders', w: PRG.valv.w },
    { id: 'jan', n: 'Janitor (DC)', w: PRG.jan.w }, { id: 'dwc', n: 'DC staff WC, shower', w: PRG.dwc.w }, { id: 'garb', n: 'Garbage and recycling', w: PRG.garb.w, grow: true }];
  /* front row: the rooms fill the stretch left of E2, then right of E2; what does not fit goes to the back row; the rest of each stretch is unassigned */
  const lW = r2(e2[2] - s1[3]), rW = r2(s2[2] - e2[3]), wOf = x => Math.max(x.w || 0, x.m2 ? up1(x.m2 / dcFrontD) : 0);
  const sides = [{ b0: s1[3], W: lW, it: [] }, { b0: e2[3], W: rW, it: [] }], moved = [];
  frontL.concat(frontR.map(x => Object.assign({}, x, { grow: false }))).forEach(x => { const sd = sides.find(z => r2(sum(z.it.map(wOf)) + wOf(x)) <= z.W + 1e-6); if (sd) sd.it.push(x); else moved.push(x); });
  sides.forEach((sd, k) => { const it = sd.it.concat([{ id: k ? 'fsp2' : 'fspare', n: 'Unassigned (no use yet)', w: 0, grow: true, spare: true }]); const pk = pack(it, sd.W, dcFrontD); if (pk.fail) return; const li = it.length - 1; if (pk.ws[li] < 1.5 && li > 0) { pk.ws[li - 1] = r2(pk.ws[li - 1] + pk.ws[li]); pk.ws[li] = 0; }
    place(it, pk.ws, sd.b0, aB, aS).forEach(x => { if (x.rr[3] - x.rr[2] < 0.01) return; R2.push(x.spare ? room(2, x.id, x.n, 'spare', 'spare', [x.rr], { block: 'spare' }) : sec(2, x.id, x.n, 'sroom', [x.rr], { prog: x.id })); }); });
  /* back row: NOC, offices, break room, shipping and storage (+ any moved rooms), then unassigned; the strips behind S1 and S2 join the end rooms */
  const dBk = r2(Da - aS2);
  const back = moved.map(x => Object.assign({}, x, { grow: false })).concat([{ id: 'noc', n: 'Security control room / NOC', w: PRG.noc.w }, { id: 'doff', n: 'DC offices', w: PRG.doff.w, m2: PRG.doff.m2 },
    { id: 'brk', n: 'DC break room', w: PRG.brk.w, m2: PRG.brk.m2 }, { id: 'ship', n: 'Shipping, receiving, storage and staging (one room)', w: PRG.ship.w, m2: PRG.ship.m2 },
    { id: 'spare2', n: 'Unassigned (no use yet)', w: 0, grow: true, spare: true }]);
  const bW = r2(s2[2] - s1[3]); const pbk = pack(back, bW, dBk); if (pbk.fail) return { fail: `storey-2 back row needs ${pbk.fail} m at ${dBk} m deep; ${bW} m available` };
  const Bk = place(back, pbk.ws, s1[3], aS2, Da);
  Bk.forEach((x, i) => { const rects = [x.rr]; if (i === 0) rects.push([r2(aB + SL), Da, 0, s1[3]]); if (i === Bk.length - 1) rects.push([r2(aB + SL), Da, s2[2], W]);
    const rr = rects.filter(r => r[1] - r[0] > 0.01 && r[3] - r[2] > 0.01); if (x.rr[3] - x.rr[2] < 0.01) return;
    R2.push(x.spare ? room(2, x.id, x.n, 'spare', 'spare', rr, { block: 'spare' }) : sec(2, x.id, x.n, 'sroom', rr, { prog: x.id })); });
  if (!Bk.length || Bk[Bk.length - 1].rr[3] - Bk[Bk.length - 1].rr[2] < 0.01) return { fail: 'storey-2 back row empty' };
  /* storey 3: one hall storey over the whole footprint, S1, S2, E2 through it */
  const cut = [S1r, S2r, E2r], hallR = subAll([[0, Da, 0, W]], cut);
  const R3 = [sec(3, 'hall', 'Data hall (one storey)', 'hall', hallR), sec(3, 's1', 'Stair S1 (data centre)', 'score', [S1r], { core: true, stair: true }), sec(3, 's2', 'Stair S2 (data centre)', 'score', [S2r], { core: true, stair: true }), sec(3, 'e2', 'Freight lift E2', 'score', [E2r], { core: true, lift: true })];
  const hall = sum(hallR.map(ra)), MW = hall / RULES.hallPerMW.v;
  /* data-centre floor (Cowork's count, labelled: hall, support, DC cores, entrance rooms, unassigned upper floors) */
  const dcArea = sum(R.filter(x => x.block === 'data centre' && x.kind !== 'bay').map(x => sum(x.r.map(ra)))) + sum(R2.filter(x => x.block === 'data centre' || (x.block === 'spare' && x.r[0][0] >= aB - 0.01)).map(x => sum(x.r.map(ra)))) + sum(R3.map(x => sum(x.r.map(ra))));
  const rooms = { 1: R, 2: R2, 3: R3 };
  const H = [C.ground, RULES.storeyH.up, RULES.storeyH.hall];
  const truck = { court: [r2(aB + bayL), r2(Da + RULES.aisle.w), 0, W], covered: [r2(aB + bayL), Da, 0, W], why: 'bays open to a covered truck court under storeys 2–3, reached from the drive; 6.1 m yard aisle behind the building (Parking By-law 5.4.1 aisle; drawing choice)' };
  const plant = plantLayout(C, W, Da, MW, rooms);
  return { rooms, H, hall, MW, dcArea, hubArea, clin, nb, nDC, nRef, nCl, clinWhy, shared: st.shared, truck, plant, aB, aC, aR, dF, kind: 'stacked', storeyNames: ['Hub at grade; data-centre entrance rooms only', 'Clinic over the hub; data-centre support', 'One data-hall storey'] };
}
function bays5_2_5(m2) { return m2 <= 0 ? 0 : m2 <= 465 ? 1 : m2 <= 2325 ? 2 : 2 + Math.ceil((m2 - 2325) / 2325); }
function subR(a, b) { if (!(b[0] < a[1] - 1e-6 && b[1] > a[0] + 1e-6 && b[2] < a[3] - 1e-6 && b[3] > a[2] + 1e-6)) return [a]; const o = [];
  if (b[0] > a[0]) o.push([a[0], b[0], a[2], a[3]]); if (b[1] < a[1]) o.push([b[1], a[1], a[2], a[3]]); const m0 = Math.max(a[0], b[0]), m1 = Math.min(a[1], b[1]);
  if (b[2] > a[2]) o.push([m0, m1, a[2], b[2]]); if (b[3] < a[3]) o.push([m0, m1, b[3], a[3]]); return o.filter(r => ra(r) > 0.05).map(r => r.map(r2)); }
const subAll = (rs, cut) => cut.reduce((acc, c) => acc.flatMap(r => subR(r, c)), rs);

/* ---------- BESIDE (Edmonton BE: hall at grade behind the hub; one storey) ---------- */
function beside(C) {
  const { st, van } = C, cw = RULES.cor.w, sm = RULES.smallRoom.w, wcm = RULES.wcMod.w, pw = RULES.pexit.w;
  let sp = C.spanOver(0, Math.min(40, C.aMax)); if (!sp) return { fail: 'no buildable width' };
  let W = r2(sp[1] - sp[0]), L = null;
  for (let it = 0; it < 4; it++) { L = besideW(C, W); if (!L.narrow) return L; W = L.narrow; }
  return { fail: 'width narrows over the depth' };
}
function besideW(C, W) {
  const { st, van } = C, cw = RULES.cor.w, sm = RULES.smallRoom.w, wcm = RULES.wcMod.w, pw = RULES.pexit.w; let sp;
  const R = [];
  /* front row: hub exit passage | refuge (grows) | shelter | lobby | clinic exit passage | waiting | exams | procedure | office | staff | storage */
  const hubI = [{ id: 'pas', n: 'Exit passage from the public corridor to the street', k: 'exitpas', fix: pw }, { id: 'ref', n: st.shelter ? 'Refuge main room' : 'Refuge main room, day shelter merged (ladder step 4)', k: 'refuge', w: 4.0, m2: PRG.refuge.m2 }]
    .concat(st.shelter ? [{ id: 'shel', n: 'Warming shelter rest area (day)', k: 'shelter', w: 4.0, m2: PRG.shelter.m2 }] : []).concat([{ id: 'lob', n: 'Shared lobby', k: 'lobby', w: RULES.lobby.w }]);
  const clI = st.exams > 0 ? [{ id: 'wait', n: 'Clinic waiting, reception', k: 'croom', w: PRG.wait.w, p: 'wait' }, { id: 'pas2', n: 'Clinic exit passage to the street', k: 'exitpas', fix: pw }]
    .concat(Array.from({ length: st.exams }, (_, i) => ({ id: 'ex' + (i + 1), n: 'Exam room ' + (i + 1), k: 'croom', w: PRG.exam.w, m2: PRG.exam.m2, p: 'exam' })))
    .concat([{ id: 'proc', n: 'Procedure room', k: 'croom', w: PRG.proc.w, m2: PRG.proc.m2, p: 'proc' }, { id: 'coff', n: 'Clinic office', k: 'croom', w: PRG.coff.w, p: 'coff' }, { id: 'cstf', n: 'Clinic staff lounge, lockers', k: 'croom', w: PRG.cstf.w, p: 'cstf' }]) : [];
  /* front-row depth: refuge + shelter on the hub's share; the refuge grows with what is left (spare floor at grade: refuge first) */
  let dF = 6.0, pf, fI;
  for (; dF <= 14; dF = r2(dF + 0.1)) { fI = hubI.map((x, i) => Object.assign({}, x, { grow: x.id === 'ref' })).concat(clI); pf = pack(fI, W, dF); if (!pf.fail) break; }
  if (pf.fail) return { fail: `front row needs ${pf.fail} m across at ${dF} m deep; ${W} m available` };
  const F = place(fI, pf.ws, 0, 0, dF);
  const bLob = F.find(x => x.id === 'lob').rr[3];
  const aC = dF, aR = r2(dF + cw);
  /* back row: hub rooms behind the public corridor, clinic rooms behind the clinic corridor */
  const areaRS = sum(F.filter(x => x.k === 'refuge' || x.k === 'shelter').map(x => ra(x.rr))), load = Math.ceil(areaRS / 0.75), [nM, nF] = wcA(Math.ceil(load / 2));
  const dR = RULES.rowB.d;
  const hubR = [{ id: 'pmec', n: 'Programs mechanical, emergency panel', k: 'plant', w: PRG.pmec.w }, { id: 'wcw', n: `WC women (${nF})`, k: 'proom', w: Math.max(sm, r2(nF * wcm)) }, { id: 'wcm', n: `WC men (${nM})`, k: 'proom', w: Math.max(sm, r2(nM * wcm)) },
    { id: 'uwc', n: 'Universal WC', k: 'proom', w: PRG.uwc.w }, { id: 'sho', n: 'Universal shower', k: 'proom', w: PRG.sho.w }, { id: 'fa', n: 'First aid', k: 'proom', w: PRG.fa.w, m2: PRG.fa.m2 },
    { id: 'off', n: 'Staff office (shared)', k: 'proom', w: PRG.off.w, m2: PRG.off.m2 }, { id: 'cot', n: 'Cot and supply storage', k: 'proom', w: sm, grow: true }];
  const ph = pack(hubR, bLob, dR); if (ph.fail) return { fail: `hub service row needs ${ph.fail} m; ${bLob} m behind the public corridor` };
  let clin = 0, Rc = [];
  if (st.exams > 0) {
    let nwc = 1, cR, pc;
    for (let it = 0; it < 3; it++) {
      cR = [{ id: 'cons', n: 'Consult room', w: PRG.cons.w, m2: PRG.cons.m2, p: 'cons' }, { id: 'med', n: 'Medication room', w: PRG.med.w, m2: PRG.med.m2, p: 'med' }, { id: 'cln', n: 'Clean supply', w: PRG.cln.w, m2: PRG.cln.m2, p: 'cln' },
        { id: 'soil', n: 'Soiled holding', w: PRG.soil.w, m2: PRG.soil.m2, p: 'soil' }, { id: 'hk', n: 'Housekeeping', w: PRG.hk.w, m2: PRG.hk.m2, p: 'hk' }]
        .concat(Array.from({ length: Math.max(0, 2 * nwc - 1) }, (_, i) => ({ id: 'cwc' + (i + 1), n: 'Clinic WC ' + (i + 1), w: sm, p: 'cwc' })))
        .concat([{ id: 'cuw', n: 'Clinic universal WC', w: PRG.uwc.w, p: 'uwc' }, { id: 'cst', n: 'Clinic storage', w: PRG.cst.w, p: 'cst' }, { id: 'cspare', n: 'Unassigned (no use yet), off the clinic corridor', w: 0, grow: true, spare: true }]);
      pc = pack(cR, r2(W - bLob), dR); if (pc.fail) return { fail: `clinic back row needs ${pc.fail} m; ${r2(W - bLob)} m` };
      const est = (W - bLob) * (dF + cw + dR); const n2 = wcB(Math.ceil(est / 9.3)); if (n2 === nwc) break; nwc = n2;
    }
    Rc = place(cR, pc.ws, bLob, aR, r2(aR + dR)).filter(x => x.rr[3] - x.rr[2] > 0.01);
    clin = r2((W - bLob) * (dF + cw) - pw * dF + sum(Rc.filter(x => !x.spare).map(x => ra(x.rr))));
    if (clin > 500) return { fail: `clinic ${Math.round(clin)} m² over 500 m² (${van ? 'Parking By-law 5.2.9: a loading space' : 'BE 3.3.1: Health Service 500 m² per establishment'}; clinic ≤ 500 variant)` };
  }
  const aB = r2(aR + dR);
  F.forEach(x => R.push(room(1, x.id, x.n, x.k === 'croom' ? 'clin' : x.k === 'lobby' || x.k === 'exitpas' ? 'circ' : 'pub', x.k === 'refuge' || x.k === 'shelter' ? 'proom' : x.k, [x.rr], { block: x.k === 'croom' || x.id === 'pas2' ? 'clinic' : 'hub', prog: x.p || x.k })));
  R.push(room(1, 'cor', 'Public corridor', 'circ', 'pcor', [[aC, aR, 0, bLob]], { block: 'hub', corridor: true }));
  if (st.exams > 0) R.push(room(1, 'ccor', 'Clinic corridor', 'clin', 'ccor', [[aC, aR, bLob, W]], { block: 'clinic', corridor: true }));
  place(hubR, ph.ws, 0, aR, aB).forEach(x => R.push(room(1, x.id, x.n, x.k === 'plant' ? 'plant' : 'pub', x.k, [x.rr], { block: 'hub', prog: x.id })));
  Rc.forEach(x => R.push(x.spare ? room(1, x.id, x.n, 'spare', 'spare', [x.rr], { block: 'spare' }) : room(1, x.id, x.n, 'clin', 'croom', [x.rr], { block: 'clinic', prog: x.p })));
  if (!(st.exams > 0)) { R.push(room(1, 'sparef', 'Unassigned (no use yet)', 'spare', 'spare', [[0, aB, bLob, W]], { block: 'spare' })); }
  const hubArea = sum(R.filter(x => x.block === 'hub').map(x => sum(x.r.map(ra))));
  /* data centre behind: hall | secure corridor | support row with the dock, bay and vestibule at the rear (truck aisle) */
  const bayL = van ? 10.2 : 9.0, bayW = van ? 3.4 : 3.3, dS = C.dS || Math.max(bayL, 9.0);
  const supportGuess = 520;
  const hallNeed = RULES.hallPerMW.v * C.mw;
  let dH = up1(hallNeed / W);
  const cap = RULES.cap.m2; if (dH * W + W * (cw + dS) > cap) dH = Math.floor((cap - W * (cw + dS)) / W * 10) / 10;
  let Da = r2(aB + dH + cw + dS);
  if (Da > C.aMax) { Da = Math.floor(C.aMax * 10) / 10; dH = r2(Da - aB - cw - dS); if (dH < 6) return { fail: `the lot is ${C.aMax} m deep; the hub and the data centre need ${r2(aB + 6 + cw + dS)} m` }; }
  sp = C.spanOver(0, Da); if (!sp) return { fail: 'no width over the building depth' };
  if (r2(sp[1] - sp[0]) < W - 0.01) return { narrow: r2(sp[1] - sp[0]) };
  const bOrigin = C.sv < 0 ? sp[1] : sp[0];
  C.mapUV = (a, b) => [C.uOf(C.a0 + a), bOrigin + C.sv * b];
  const aH = r2(aB + dH), aS = r2(aH + cw);
  const sec = (id, n, kind, rects, o) => room(1, id, n, kind === 'hall' ? 'hall' : kind === 'bay' ? 'load' : 'sup', kind, rects, Object.assign({ block: 'data centre' }, o || {}));
  R.push(sec('hall', 'Data hall (one storey)', 'hall', [[aB, aH, 0, W]]), sec('scor', 'Secure corridor', 'scor', [[aH, aS, 0, W]], { corridor: true }));
  const MWest = (dH * W) / RULES.hallPerMW.v;
  const tot = hubArea + clin + dH * W + W * (cw + dS), nb = st.shared ? 1 : (tot < 2500 ? 0 : tot <= 7500 ? 1 : 2);
  const sI = [{ id: 'pas3', n: 'Exit passage (2 h) from the secure corridor to the rear', fix: pw }, { id: 'ups', n: `UPS room (${Math.ceil(MWest) + 1} modules, N+1)`, w: PRG.ups.w, m2: r2(MWest * 3.3 + 3.0) }, { id: 'bat', n: 'Battery room, Li-ion', w: PRG.bat.w, m2: r2(MWest * 1.8 + 3.0) },
    { id: 'bhv', n: 'Battery room HVAC (separate)', w: PRG.bhv.w }, { id: 'mv', n: 'MV switchgear, main electrical', w: PRG.mv.w }, { id: 'mmr1', n: 'Meet-me room 1', w: PRG.mmr.w }, { id: 'mmr2', n: 'Meet-me room 2', w: PRG.mmr.w },
    { id: 'valv', n: 'Sprinkler valve room, cylinders', w: PRG.valv.w }, { id: 'pas4', n: 'Exit passage (2 h) from the middle of the secure corridor to the rear', fix: pw }, { id: 'noc', n: 'Security control room / NOC', w: PRG.noc.w }, { id: 'doff', n: 'DC offices', w: PRG.doff.w, m2: PRG.doff.m2 }, { id: 'brk', n: 'DC break room', w: PRG.brk.w, m2: PRG.brk.m2 },
    { id: 'dwc', n: 'DC staff WC, shower', w: PRG.dwc.w }, { id: 'jan', n: 'Janitor (DC)', w: PRG.jan.w }, { id: 'garb', n: 'Garbage and recycling', w: PRG.garb.w }, { id: 'ship', n: 'Shipping, receiving, storage and staging (one room)', w: PRG.ship.w, m2: PRG.ship.m2, grow: true }]
    .concat(Array.from({ length: nb }, (_, i) => ({ id: 'b' + (i + 1), fix: bayW, bay: true }))).concat([{ id: 'dock', n: 'Dock lobby (entrance)', w: 2.4 }, { id: 'ves', n: 'DC staff entrance: vestibule, guard point, portal', fix: RULES.ves.w }]);
  let ps = pack(sI, W, dS), dS2 = dS; while (ps.fail && dS2 < 20) { dS2 = r2(dS2 + 0.5); ps = pack(sI, W, dS2); }
  if (ps.fail) return { fail: `data-centre support row needs ${ps.fail} m; ${W} m` };
  if (dS2 > dS) { return besideW(Object.assign({}, C, { dS: dS2 }), W); }
  place(sI, ps.ws, 0, aS, Da).forEach((x, i) => { if (x.bay) R.push(sec(x.id, `Loading space ${x.id.slice(1)}, ${van ? 'Class B 10.2 × 3.4 m' : '9.0 × 3.3 m'}`, 'bay', [[r2(Da - bayL), Da, x.rr[2], x.rr[3]]]));
    else if (x.id === 'pas3' || x.id === 'pas4') R.push(sec(x.id, x.n, 'exitpas', [x.rr]));
    else if (x.id === 'dock') R.push(sec('dock', x.n, 'dock', [x.rr])); else if (x.id === 'ves') R.push(sec('ves', x.n, 'entry', [x.rr])); else R.push(sec(x.id, x.n, 'sroom', [x.rr], { prog: x.id })); });
  /* bays shorter than the row: the strip in front of each bay joins the dock lobby side (open to the bay) */
  R.filter(x => x.kind === 'bay').forEach(x => { const r = x.r[0]; if (r[0] > aS + 0.01) R.find(y => y.id === 'dock').r.push([aS, r[0], r[2], r[3]]); });
  const hall = dH * W, MW = hall / RULES.hallPerMW.v;
  const dcArea = sum(R.filter(x => x.block === 'data centre' && x.kind !== 'bay').map(x => sum(x.r.map(ra))));
  const rooms = { 1: R };
  const truck = { court: [Da, r2(Da + RULES.aisle.w), 0, W], covered: null, why: 'bays open to a 6.1 m truck aisle behind the building (Parking By-law 5.4.1 aisle, Vancouver’s figure used in Edmonton ?)' };
  const plant = plantLayout(Object.assign({}, C, { lowRoof: { r: [0, aB, 0, W], z: RULES.storeyH.hall } }), W, Da, MW, rooms);
  return { rooms, H: [RULES.storeyH.hall], hall, MW, dcArea, hubArea, clin, nb, shared: st.shared, truck, plant, aB, aC, aR, dF, W, Da, bOrigin, kind: 'beside', storeyNames: ['Hub, clinic and the data centre at grade (one storey)'] };
}

/* ---------- plant (rule 9): generators, transformer pads, chillers with Vertiv clear zones, packed in the yard behind the building ---------- */
function plantLayout(C, W, Da, MW, rooms) {
  const Q = MW * 1.55, big = Q > 3, nG = Math.ceil(Q / (big ? 2 : 1)) + 1, nC = Math.ceil(Q / 1.489) + 1, nT = Math.ceil(Q / 2.5) + 1;
  const tank = MW * 1.55 * 1000 * 12 * 0.263 / Math.ceil(Q / (big ? 2 : 1));
  const tankLot = tank >= 2500 && tank <= 50000 ? 3.0 : tank < 2500 ? null : null, tankBld = tank >= 2500 ? 1.5 : null;
  const G = { l: 8.43, w: 2.62 }, T = { l: 2.49, w: 2.63 }, CH = { l: 12.14, w: 2.36, side: 1.5, end: 2.1 };
  const aP = r2(Da + RULES.aisle.w), items = [], why = [];
  /* candidate test in the local frame: inside the yard (and off the drive), clear of everything placed (with their keep-outs) */
  let roof = null;   /* chillers on the lower roof over the hub block when the yard cannot hold them (spec rule 1: a lower roof not over the hall) */
  const okRect = (r, keepLot) => { if (roof) return r[0] >= roof[0] - 1e-6 && r[1] <= roof[1] + 1e-6 && r[2] >= roof[2] - 1e-6 && r[3] <= roof[3] + 1e-6; for (let a = r[0]; a <= r[1] + 1e-9; a += Math.max(0.5, (r[1] - r[0]) / 6)) for (let b = r[2]; b <= r[3] + 1e-9; b += Math.max(0.5, (r[3] - r[2]) / 6)) { const [u, v] = C.mapUV(Math.min(a, r[1]), Math.min(b, r[3])); if (!C.inYard(u, v) || C.inDrive(u, v)) return false; } return true; };
  const hit = (r, s) => r[0] < s[1] - 1e-6 && r[1] > s[0] + 1e-6 && r[2] < s[3] - 1e-6 && r[3] > s[2] + 1e-6;
  const grow = (r, d) => [r[0] - d, r[1] + d, r[2] - d, r[3] + d];
  const lotDist = r => { let m = 1e9; for (const [a, b] of [[r[0], r[2]], [r[0], r[3]], [r[1], r[2]], [r[1], r[3]], [(r[0] + r[1]) / 2, r[2]], [(r[0] + r[1]) / 2, r[3]], [r[0], (r[2] + r[3]) / 2], [r[1], (r[2] + r[3]) / 2]]) { const p = C.mapUV(a, b); for (let i = 0; i < C.S.ring.length; i++) m = Math.min(m, dSeg(p, C.S.ring[i], C.S.ring[(i + 1) % C.S.ring.length])); } return m; };
  const span = r2(Math.max(40, C.aMax + 60));
  const tryPlace = (it0, aFix) => { for (const rot of (it0.rot ? [false, true] : [false])) { const it = rot ? Object.assign({}, it0, { L: it0.Wd, Wd: it0.L, zone: it0.zoneR }) : it0;
    const aS0 = roof ? roof[0] : aFix != null ? aFix : aP, aS1 = roof ? roof[1] : aFix != null ? aFix : Da + span;
    for (let a = aS0; a <= aS1; a = r2(a + 0.5)) for (let b = roof ? roof[2] : -10; b <= (roof ? roof[3] : W + 10); b = r2(b + 0.5)) {
      const r = [a, r2(a + it.L), b, r2(b + it.Wd)], z = it.zone ? it.zone(r) : r;
      if (!okRect(r) || (it.zone && !okRect(z))) continue;
      if (it.lot != null && lotDist(r) < it.lot - 1e-6) continue;
      if (items.some(o => !!o.roof === !!roof && (hit(z, o.keep) || hit(o.z, it.keepFor ? it.keepFor(r) : grow(r, 0)) || hit(grow(r, it.gap || 0), o.r)))) continue;
      return { r, z, rot };
    } }
    return null; };
  /* transformer pads: front row on the yard aisle (front faces the aisle, 3 m clear in front: the aisle; 1 m apart and from structures; BC Hydro ES54 F) */
  for (let i = 0; i < nT; i++) { const p = tryPlace({ L: T.l, Wd: T.w, gap: 1.0 }, aP); if (!p) { why.push(`transformer pad ${i + 1} of ${nT}`); break; }
    items.push({ id: 't' + (i + 1), n: `Transformer pad ${i + 1}`, kind: 'pad', r: p.r, z: p.r, keep: grow(p.r, 1.0), front: 'faces the yard aisle' }); }
  /* generators at grade (FM 5-32 2.6.4.3): sets 2.0 m apart (CSA C282 6.5.1.1); tanks 1.5 m to the building, 3.0 m to lot lines (CSA B139 Table 2) */
  for (let i = 0; i < nG; i++) { const p = tryPlace({ L: G.l, Wd: G.w, gap: 2.0, lot: tankLot, rot: true }); if (!p) { why.push(`generator ${i + 1} of ${nG}`); break; }
    items.push({ id: 'g' + (i + 1), n: `Generator ${i + 1}, ${big ? '2,000' : '1,000'} kW, sub-base tank`, kind: 'gen', r: p.r, z: p.r, keep: grow(p.r, 2.0) }); }
  /* chillers (Vertiv Liebert AFC): 1.5 m on each long side, 2.1 m at each end, zones not shared (3.0 / 4.2 m between units, our reading); long axis along a, panel end to the yard aisle */
  const lowRoof = C.lowRoof || null; let onRoof = 0;
  for (let i = 0; i < nC; i++) { let p = roof ? null : tryPlace({ L: CH.l, Wd: CH.w, zone: r => [r2(r[0] - CH.end), r2(r[1] + CH.end), r2(r[2] - CH.side), r2(r[3] + CH.side)], zoneR: r => [r2(r[0] - CH.side), r2(r[1] + CH.side), r2(r[2] - CH.end), r2(r[3] + CH.end)], gap: 0, rot: true });
    if (!p && lowRoof) { roof = lowRoof.r; p = tryPlace({ L: CH.l, Wd: CH.w, zone: r => [r2(r[0] - CH.end), r2(r[1] + CH.end), r2(r[2] - CH.side), r2(r[3] + CH.side)], zoneR: r => [r2(r[0] - CH.side), r2(r[1] + CH.side), r2(r[2] - CH.end), r2(r[3] + CH.end)], gap: 0, rot: true }, null, true); if (p) onRoof++; }
    if (!p) { why.push(`chiller ${i + 1} of ${nC}`); break; }
    items.push({ id: 'c' + (i + 1), n: `Chiller ${i + 1} (${roof ? 'on the hub roof, ' + lowRoof.z + ' m' : 'at grade'})`, kind: 'chiller', roof: !!roof, r: p.r, z: p.z, keep: p.z, panel: p.rot ? 'end toward the side (long axis across the lot: panel end to an access path ?)' : 'end toward the yard aisle' }); }
  const ok = !why.length; if (onRoof) why.length = 0;
  return { ok, why: why.length ? why.join(', ') + ' do not fit in the yard' : null, Q: r2(Q), nG, nC, nT, setKW: big ? 2000 : 1000, tank: Math.round(tank), tankLot, tankBld, items, aisle: [Da, aP],
    rules: ['generators and pads at grade (FM 5-32 2.6.4.3, insurer)', 'sets 2.0 m apart (CSA C282 6.5.1.1)', `tank ${Math.round(tank)} L a set: 1.5 m to the building, 3.0 m to lot lines (CSA B139 Table 2)`,
      'pads 1 m apart and from structures, 3 m clear in front, front to the aisle (BC Hydro ES54 F; drawing choice)', 'chiller clear zones 1.5 m long sides, 2.1 m ends, 2.5 m above (open sky); 3.0 / 4.2 m between units (Vertiv SL-70790 s. 4.2.4, our reading)',
      'chillers ≥ 5 m from drains: drains not drawn (?); A2L leak distance ? ; MV/HV distance ?', 'chillers at grade, never on the hall roof (FM 5-32 2.2.1.6)'] };
}

/* ---------- doors, exits, checks: on the finished rooms (local frame) ---------- */
function finish(res, S) {
  const L = res, van = S.city === 'van', R = L.rooms, D = [], dW = RULES.door.w, sW = RULES.street.w;
  const by = (st, id) => (R[st] || []).find(x => x.id === id);
  /* a door on the longest shared wall stretch of two rooms, at fraction t */
  function shared(A, B) { let best = null;
    for (const r of A.r) for (const q of B.r) {
      if (Math.abs(r[1] - q[0]) < 1e-6 || Math.abs(r[0] - q[1]) < 1e-6) { const at = Math.abs(r[1] - q[0]) < 1e-6 ? r[1] : r[0], f = Math.max(r[2], q[2]), t = Math.min(r[3], q[3]); if (t - f > 0.5 && (!best || t - f > best.len)) best = { o: 'v', at, f, t, len: t - f }; }
      if (Math.abs(r[3] - q[2]) < 1e-6 || Math.abs(r[2] - q[3]) < 1e-6) { const at = Math.abs(r[3] - q[2]) < 1e-6 ? r[3] : r[2], f = Math.max(r[0], q[0]), t = Math.min(r[1], q[1]); if (t - f > 0.5 && (!best || t - f > best.len)) best = { o: 'h', at, f, t, len: t - f }; } }
    return best; }
  const door = (st, a, b, t, w) => { const A = by(st, a), B = by(st, b); if (!A || !B) return; const s = shared(A, B); if (!s || s.len < (w || dW) + 0.1) { L.flags.push(`No shared wall for a door: ${A.n} – ${B.n} (storey ${st}) (?)`); return; }
    const half = (w || dW) / 2, c = r2(Math.min(s.t - half - 0.05, Math.max(s.f + half + 0.05, s.f + (s.t - s.f) * (t == null ? 0.5 : t))));
    D.push(s.o === 'v' ? [st, a, b, r2(s.at), c, 'v', w || dW] : [st, a, b, c, r2(s.at), 'h', w || dW]); };
  /* exterior door on a side of a room's rect k: side 'a0' (street face), 'a1' (rear), 'b0', 'b1'; t along the side */
  const ext = (st, a, side, t, w, k) => { const A = by(st, a); if (!A) return; const r = A.r[k || 0], half = (w || dW) / 2;
    if (side === 'a0' || side === 'a1') { const at = side === 'a0' ? r[0] : r[1], c = r2(Math.min(r[3] - half - 0.05, Math.max(r[2] + half + 0.05, r[2] + (r[3] - r[2]) * t))); D.push([st, a, 'OUT', at, c, 'v', w || dW]); }
    else { const at = side === 'b0' ? r[2] : r[3], c = r2(Math.min(r[1] - half - 0.05, Math.max(r[0] + half + 0.05, r[0] + (r[1] - r[0]) * t))); D.push([st, a, 'OUT', c, at, 'h', w || dW]); } };
  const W = L.W;
  if (L.kind === 'stacked') {
    /* storey 1 */
    ext(1, 'lob', 'a0', 0.5, sW); door(1, 'lob', 'cor', 0.5); ext(1, 'ref', 'a0', 0.5, sW); door(1, 'ref', 'cor', 0.5); if (by(1, 'shel')) { door(1, 'shel', 'cor', 0.5); ext(1, 'shel', 'a0', 0.5, sW); }
    ext(1, 'cor', 'b0', 0.5, sW);   // the far end of the public corridor: exterior door to the side yard (15b: an exit at its far end)
    ['wcw', 'wcm', 'uwc', 'sho', 'fa', 'off', 'cot', 'pmec', 'e1', 'p2', 'p1'].forEach(id => door(1, id, 'cor', 0.5));
    if (by(1, 'ref2')) { door(1, 'ref2', 'cor', 0.5); }
    ext(1, 'p2', 'b0', 0.12); ext(1, 'p1', 'b1', 0.12);
    ext(1, 's1', 'b0', 0.88); ext(1, 's2', 'b1', 0.88);
    door(1, 'ves', 'e2', 0.5); ext(1, 'ves', 'a1', 0.5); door(1, 'dock', 'e2', 0.5); ext(1, 'dock', 'a1', 0.5, 1.8, 0);
    R[1].filter(x => x.kind === 'bay').slice(-1).forEach(x => door(1, 'dock', x.id, 0.5, 1.8));
    /* storey 2 */
    R[2].filter(x => x.st === 2 && (x.kind === 'croom' || (x.kind === 'spare' && x.r[0][0] < L.aB - 0.01) || x.id === 'e1' || x.id === 'p1' || x.id === 'p2')).forEach(x => door(2, x.id, 'ccor', 0.5));
    door(2, 's1', 'dcor', 0.5); door(2, 's2', 'dcor', 0.5); door(2, 'e2', 'dcor', 0.5);
    R[2].filter(x => (x.kind === 'sroom' || (x.kind === 'spare' && x.r[0][0] >= L.aB - 0.01))).forEach(x => door(2, x.id, 'dcor', 0.5));
    door(3, 'hall', 's1', 0.5); door(3, 'hall', 's2', 0.5); door(3, 'hall', 'e2', 0.5);
  } else {
    ext(1, 'lob', 'a0', 0.5, sW); door(1, 'lob', 'cor', 0.5); ext(1, 'ref', 'a0', 0.5, sW); door(1, 'ref', 'cor', 0.5); if (by(1, 'shel')) door(1, 'shel', 'cor', 0.5);
    ext(1, 'pas', 'a0', 0.5); door(1, 'pas', 'cor', 0.5);
    ['pmec', 'wcw', 'wcm', 'uwc', 'sho', 'fa', 'off', 'cot'].forEach(id => door(1, id, 'cor', 0.5));
    if (by(1, 'ccor')) { ext(1, 'pas2', 'a0', 0.5); door(1, 'pas2', 'ccor', 0.5); ext(1, 'ccor', 'b1', 0.5, sW); door(1, 'wait', 'lob', 0.5, 1.8); door(1, 'wait', 'ccor', 0.5);
      R[1].filter(x => (x.kind === 'croom' || (x.kind === 'spare' && x.id === 'cspare')) && x.id !== 'wait').forEach(x => door(1, x.id, 'ccor', 0.5)); }
    if (by(1, 'sparef')) door(1, 'sparef', 'lob', 0.5);
    door(1, 'hall', 'scor', 0.15); door(1, 'hall', 'scor', 0.5); door(1, 'hall', 'scor', 0.85);
    ext(1, 'scor', 'b1', 0.5); door(1, 'pas3', 'scor', 0.5); ext(1, 'pas3', 'a1', 0.5); if (by(1, 'pas4')) { door(1, 'pas4', 'scor', 0.5); ext(1, 'pas4', 'a1', 0.5); }
    R[1].filter(x => x.kind === 'sroom').forEach(x => door(1, x.id, 'scor', 0.5));
    door(1, 'ves', 'scor', 0.5); ext(1, 'ves', 'a1', 0.5); door(1, 'dock', 'scor', 0.5);
    const bays = R[1].filter(x => x.kind === 'bay'); if (bays.length) door(1, 'dock', bays[bays.length - 1].id, 0.5);
  }
  L.D = D;
  /* the T-reach graph, in the local frame */
  const G = { S: {}, D, city: S.city };
  Object.keys(R).forEach(k => { G.S[k] = R[k].map(x => ({ id: x.id, n: x.n, g: x.g, kind: x.kind, r: x.r, core: !!x.core, stair: !!x.stair })); });
  L.G = G;
  const T = TR();
  if (T) { L.treach = { reach: T.tReach(G), dead: T.deadEnds(G), width: T.tWidth(G) }; }
  /* travel along the path, exits apart, exterior discharges */
  L.zones = zonesOf(L);
  L.travel = L.zones.map(z => travel(L, z));
  L.apart = L.zones.map(z => apart(L, z));
  L.discharge = discharges(L);
  L.grades = grades(L, S);
  L.loading = loadingOf(L, S);
}
function zonesOf(L) { const R = L.rooms, Z = [];
  const ids = (st, f) => (R[st] || []).filter(x => x.kind !== 'exitpas' && f(x)).map(x => x.id);
  if (L.kind === 'stacked') {
    Z.push({ name: 'hub', st: 1, pubCor: true, ids: ids(1, x => x.block === 'hub' && !x.core) });
    if ((R[2] || []).some(x => x.block === 'clinic' && !x.core)) Z.push({ name: 'clinic', st: 2, ids: ids(2, x => (x.block === 'clinic' || (x.kind === 'spare' && x.r[0][0] < L.aB - 0.01)) && !x.core) });
    Z.push({ name: 'storey 2 data centre', st: 2, ids: ids(2, x => (x.block === 'data centre' || (x.kind === 'spare' && x.r[0][0] >= L.aB - 0.01)) && !x.core) });
    Z.push({ name: 'hall', st: 3, ids: ['hall'] });
  } else {
    Z.push({ name: 'hub', st: 1, pubCor: true, ids: ids(1, x => x.block === 'hub' && !x.core) });
    if (R[1].some(x => x.block === 'clinic')) Z.push({ name: 'clinic', st: 1, ids: ids(1, x => x.block === 'clinic') });
    Z.push({ name: 'data centre', st: 1, ids: ids(1, x => x.block === 'data centre' && x.kind !== 'bay') });
  }
  return Z; }
/* exits of a zone: exterior doors of its rooms, doors into exit stairs, into exit passages (their exterior door counts) */
function exitsOf(L, z) { const R = L.rooms[z.st], inZ = new Set(z.ids), K = new Map(R.map(x => [x.id, x])), out = [];
  for (const d of L.D) { if (d[0] !== z.st) continue; const [st, a, b, u, v, o, w] = d;
    const one = inZ.has(a) ? b : inZ.has(b) ? a : null; if (one == null) continue; const own = inZ.has(a) ? a : b;
    if (one === 'OUT') { const x = K.get(own); if (x && x.kind === 'bay') continue; if (x && x.kind === 'dock') continue; out.push({ via: own, to: 'outside', u, v, o, w }); continue; }
    const y = K.get(one); if (!y) continue;
    if (y.stair) out.push({ via: own, to: y.id, u, v, o, w, stair: true });
    else if (y.kind === 'exitpas') out.push({ via: own, to: y.id, u, v, o, w, pas: true }); }
  return out; }
function travel(L, z) {
  const g = RULES.grid.g, R = L.rooms[z.st], inZ = new Set(z.ids), rs = R.filter(x => inZ.has(x.id) && x.kind !== 'shaft');
  const cell = new Map(), key = (i, j) => i + ',' + j;
  rs.forEach(x => x.r.forEach(r => { for (let i = Math.round(r[0] / g); i < Math.round(r[1] / g); i++) for (let j = Math.round(r[2] / g); j < Math.round(r[3] / g); j++) cell.set(key(i, j), x.id); }));
  /* door links: the two cells either side of a door wall, across its width */
  const link = new Set(), tgt = [];
  for (const d of L.D) { if (d[0] !== z.st) continue; const [st, a, b, u, v, o, w] = d, h = w / 2;
    const ab = [a, b].filter(x => inZ.has(x)); if (!ab.length) continue;
    const ex = exitsOf(L, z).some(e => Math.abs(e.u - u) < 1e-6 && Math.abs(e.v - v) < 1e-6);
    if (o === 'v') { const i1 = Math.round(u / g), i0 = i1 - 1; for (let j = Math.floor((v - h) / g + 1e-6); j < Math.ceil((v + h) / g - 1e-6); j++) { link.add(key(i0, j) + '|' + key(i1, j)); link.add(key(i1, j) + '|' + key(i0, j)); if (ex) [key(i0, j), key(i1, j)].forEach(k => { if (cell.has(k) && inZ.has(cell.get(k))) tgt.push(k); }); } }
    else { const j1 = Math.round(v / g), j0 = j1 - 1; for (let i = Math.floor((u - h) / g + 1e-6); i < Math.ceil((u + h) / g - 1e-6); i++) { link.add(key(i, j0) + '|' + key(i, j1)); link.add(key(i, j1) + '|' + key(i, j0)); if (ex) [key(i, j0), key(i, j1)].forEach(k => { if (cell.has(k) && inZ.has(cell.get(k))) tgt.push(k); }); } } }
  if (!tgt.length) return { zone: z.name, worst: null, why: 'no exit door in the zone' };
  /* Dijkstra, 8 directions; a diagonal step only inside one room; a step between rooms only through a door */
  const dist = new Map(), prev = new Map(), H = [];
  const push = (k, d) => { H.push([d, k]); let i = H.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (H[p][0] <= H[i][0]) break; [H[p], H[i]] = [H[i], H[p]]; i = p; } };
  const pop = () => { const t = H[0], l = H.pop(); if (H.length) { H[0] = l; let i = 0; for (;;) { const a = 2 * i + 1, b = a + 1; let m = i; if (a < H.length && H[a][0] < H[m][0]) m = a; if (b < H.length && H[b][0] < H[m][0]) m = b; if (m === i) break; [H[m], H[i]] = [H[i], H[m]]; i = m; } } return t; };
  tgt.forEach(k => { dist.set(k, g / 2); push(k, g / 2); });
  const N8 = [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, Math.SQRT2], [1, -1, Math.SQRT2], [-1, 1, Math.SQRT2], [-1, -1, Math.SQRT2]];
  while (H.length) { const [d, k] = pop(); if (d > dist.get(k) + 1e-9) continue; const [i, j] = k.split(',').map(Number), rid = cell.get(k);
    for (const [di, dj, c] of N8) { const n = key(i + di, j + dj); if (!cell.has(n)) continue; const nid = cell.get(n);
      if (nid !== rid) { if (di && dj) continue; if (!link.has(k + '|' + n)) continue; }
      else if (di && dj && (cell.get(key(i + di, j)) !== rid || cell.get(key(i, j + dj)) !== rid)) continue;
      const nd = d + c * g; if (nd < (dist.has(n) ? dist.get(n) : Infinity) - 1e-9) { dist.set(n, nd); prev.set(n, k); push(n, nd); } } }
  let worst = -1, wk = null, unreached = 0; for (const k of cell.keys()) { if (!dist.has(k)) { unreached++; continue; } if (dist.get(k) > worst) { worst = dist.get(k); wk = k; } }
  const path = []; for (let k = wk; k; k = prev.get(k)) { const [i, j] = k.split(',').map(Number); path.push([r2((i + 0.5) * g), r2((j + 0.5) * g)]); }
  return { zone: z.name, st: z.st, worst: r2(worst), ok: worst <= 45, limit: 45, path, unreached, basis: RULES.grid.why };
}
function apart(L, z) { const ex = exitsOf(L, z), R = L.rooms[z.st].filter(x => z.ids.includes(x.id));
  let a = [1e9, -1e9, 1e9, -1e9]; R.forEach(x => x.r.forEach(r => { a = [Math.min(a[0], r[0]), Math.max(a[1], r[1]), Math.min(a[2], r[2]), Math.max(a[3], r[3])]; }));
  const diag = Math.hypot(a[1] - a[0], a[3] - a[2]), need = z.pubCor ? Math.min(diag / 2, 9) : Math.max(diag / 2, 9);
  let best = null; for (let i = 0; i < ex.length; i++) for (let j = i + 1; j < ex.length; j++) { const d = Math.hypot(ex[i].u - ex[j].u, ex[i].v - ex[j].v); if (!best || d > best.d) best = { d, a: ex[i], b: ex[j] }; }
  return { zone: z.name, st: z.st, exits: ex.length, apart_m: best ? r2(best.d) : null, need_m: r2(need), ok: !!best && best.d >= need - 1e-6, rule: z.pubCor ? 'with a public corridor: ≥ min(½ diagonal, 9 m)' : '≥ max(½ diagonal, 9 m)', a: best && best.a, b: best && best.b, how: 'door to door as a stand-in (VBBL 3.4.2.3.(1), (3))' }; }
function discharges(L) { const out = [], st = L.rooms[1].filter(x => x.stair), ex = L.D.filter(d => d[0] === 1 && d[2] === 'OUT' && st.some(x => x.id === d[1]));
  for (let i = 0; i < ex.length; i++) for (let j = i + 1; j < ex.length; j++) { const p = ex[i], q = ex[j], d = Math.hypot(p[3] - q[3], p[4] - q[4]), near = p[3] <= 15 && q[3] <= 15, need = near ? 6 : 9;
    out.push({ a: p[1], b: q[1], d: r2(d), need, ok: d >= need - 1e-6, why: near ? 'sprinklered, both within 15 m of the street: 6 m (VBBL 3.4.2.3.(4))' : '9 m (VBBL 3.4.2.3.(4))' }); }
  return out; }
function loadingOf(L, S) { const van = S.city === 'van';
  if (van) return { n: L.nb, why: L.shared ? 'shared by approval (5.1.5)' : `data centre ${Math.round(L.dcArea)} m² → ${L.kind === 'stacked' ? L.nDC : '?'} (5.2.5); refuge and shelter rooms ${Math.round(L.hubArea)} m² → ${L.nRef} (5.2.3, our reading of the use); clinic ${Math.round(L.clin)} m² → ${L.nCl} (5.2.9)`, size: 'Class B 10.2 × 3.4 × 3.8 m (5.5.1.2)', aisle: '6.1 m (5.4.1)' };
  const tot = L.hubArea + L.clin + L.dcArea; return { n: L.nb, why: `non-residential floor ${Math.round(tot)} m² → ${L.nb} (Zoning Bylaw 20001 s. 5.80 Table 7.2: under 2,500 none, to 7,500 one)`, size: '9.0 × 3.3 m, 4.0 m clear (Table 7.2)', aisle: '6.1 m (Vancouver’s, ?)' }; }
/* grades: street at the lobby door vs the slab (rule 12), base surface and height (rule 7) */
function grades(L, S) { const out = { datum: S.gradeDatum || '?' };
  const lob = (L.D || []).find(d => d[0] === 1 && d[1] === 'lob' && d[2] === 'OUT');
  const roofRel = sum(L.H); out.storeys = L.H; out.roofRel = r2(roofRel);
  if (!S.grade) { out.slab = null; out.street = null; out.stepFree = '?'; out.height = null; out.why = S.city === 'van' ? 'no corner and street grades on file for this lot (?)' : 'Edmonton: grades ? (J.B. 8 Nov)'; return out; }
  const doorUV = lob ? L.toUV(lob[3], lob[4]) : null; let street = null, sd = 1e9;
  if (doorUV) for (const e of S.grade.edges) { const [ax, ay] = e.a, [bx, by] = e.b, dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy || 1; const t = Math.max(0, Math.min(1, ((doorUV[0] - ax) * dx + (doorUV[1] - ay) * dy) / l2));
    const d = Math.hypot(doorUV[0] - ax - t * dx, doorUV[1] - ay - t * dy); if (d < sd) { sd = d; const ts = [0.1, 0.3, 0.5, 0.7, 0.9]; let z = null, bd = 1e9; ts.forEach((tt, i) => { if (e.z[i] != null && Math.abs(tt - t) < bd) { bd = Math.abs(tt - t); z = e.z[i]; } }); street = z; } }
  out.street = street; out.streetWhy = 'sidewalk grade 1.5 m outside the street edge nearest the lobby door (LiDAR 2022, 0.1 m steps; make_grade_points.py)';
  const fcl = S.fcl ? S.fcl.v : null; out.fcl = fcl;
  out.slab = street != null ? r2(Math.max(street, fcl || -1e9)) : fcl; out.slabWhy = fcl != null ? `the higher of the street at the lobby door and the FCL ${fcl} m (VBBL Div. A; slab flush with the sidewalk where it is above the FCL, drawing choice)` : 'flush with the street at the lobby door (drawing choice)';
  if (street != null && out.slab != null) { const dz = r2(out.slab - street);
    out.rise = dz; out.stepFree = dz <= 0.013 ? (dz <= 0.0 ? 'level (LiDAR reads the street at the slab: 0.0–0.1 m, sloped floor ≤ 1:20 over 2.0 m drawn, survey before design)' : 'level') : dz <= 0.1 ? 'sloped floor ≤ 1:20 over the first 2.0 m inside the door (LiDAR 0.1 m steps: survey before design)' : `ramp ≤ 1:12 inside the lobby: ${r2(12 * dz)} m plus landings (VBBL 3.8.3.5) (?)`;
    if (dz <= 0.0) out.stepFree = 'sloped floor ≤ 1:20 over the first 2.0 m inside the door: LiDAR reads 0.0–0.1 m (0.1 m steps cannot show 13 mm), survey before design'; }
  /* base surface: corner grades joined by triangles, both triangulations, the lower surface; lowest point under the building footprint (our reading) */
  const C = S.grade.corners.filter(c => c[2] != null); out.corners = C.length;
  if (C.length >= 3 && out.slab != null) {
    const zFan = (k, u, v) => { const n = C.length; for (let i = 1; i < n - 1; i++) { const A = C[k], B = C[(k + i) % n], Cc = C[(k + i + 1) % n], d = (B[1] - Cc[1]) * (A[0] - Cc[0]) + (Cc[0] - B[0]) * (A[1] - Cc[1]); if (Math.abs(d) < 1e-9) continue;
      const l1 = ((B[1] - Cc[1]) * (u - Cc[0]) + (Cc[0] - B[0]) * (v - Cc[1])) / d, l2 = ((Cc[1] - A[1]) * (u - Cc[0]) + (A[0] - Cc[0]) * (v - Cc[1])) / d, l3 = 1 - l1 - l2;
      if (l1 >= -1e-6 && l2 >= -1e-6 && l3 >= -1e-6) return l1 * A[2] + l2 * B[2] + l3 * Cc[2]; } return null; };
    /* both triangulations: fans from corner 0 and corner 1 (four corners: the two diagonals); the lower surface at each point (J.B. 8 Nov) */
    const zAt = (u, v) => { const a = zFan(0, u, v), b = zFan(1, u, v); return a == null ? b : b == null ? a : Math.min(a, b); };
    const zFan0 = (u, v) => zFan(0, u, v);
    let lo = 1e9, at = null; for (let a = 0; a <= L.Da + 1e-9; a += 1) for (let b = 0; b <= L.W + 1e-9; b += 1) { const [u, v] = L.toUV(Math.min(a, L.Da), Math.min(b, L.W)), z = zAt(u, v); if (z != null && z < lo) { lo = z; at = [a, b]; } }
    if (at) { out.base = r2(lo); out.baseAt = at; out.roof = r2(out.slab + roofRel); out.height = r2(out.roof - lo); out.hLimit = S.hLimit; out.heightOk = S.hLimit ? out.height <= S.hLimit + 1e-6 : null; out.baseWhy = RULES.base.why; let lo0 = 1e9; for (let a = 0; a <= L.Da + 1e-9; a += 1) for (let b = 0; b <= L.W + 1e-9; b += 1) { const [u, v] = L.toUV(Math.min(a, L.Da), Math.min(b, L.W)), z = zFan0(u, v); if (z != null && z < lo0) lo0 = z; } out.baseFan0 = lo0 < 1e9 ? r2(lo0) : null; }
  }
  return out; }

/* ---------- public entry: P → the plan shape the Architecture cards draw ---------- */
function build(P) { if (!P || !P.s || !P.s.M || !P.s.M.F) return null; const S = siteOf(P); return fromSite(S); }
function fromSite(S) {
  const L = layout(S);
  if (!L.rooms) return { version: RULES.version, rules: RULES, storeys: [], flags: L.flags, exitSep: [], programs: [], entrances: [], hub: L };
  return toPlan(L, S);
}
function toPlan(L, S) {
  const toUV = L.toUV;
  const R2uv = r => { const p = toUV(r[0], r[2]), q = toUV(r[1], r[3]); return [Math.min(p[0], q[0]), Math.max(p[0], q[0]), Math.min(p[1], q[1]), Math.max(p[1], q[1])]; };
  const z0 = [0]; L.H.forEach((h, i) => z0.push(z0[i] + h));
  const storeys = Object.keys(L.rooms).map(Number).sort((a, b) => a - b).map(st => {
    const S1 = { z: r2(z0[st - 1]), name: L.storeyNames[st - 1], rooms: [], corridors: [], stairs: [], lifts: [], doors: [], exits: [], walls: [] };
    const rs = L.rooms[st];
    rs.forEach(x => { const meta = { kind: x.kind, line: lineOf(x), block: x.block === 'spare' ? 'spare' : x.block, id: x.id, name: x.n };
      x.r.forEach((r, k) => { const R = R2uv(r), m2 = r2(ra(r));
        if (x.corridor) S1.corridors.push(Object.assign({ rect: R, w: RULES.cor.w }, meta));
        else if (x.stair) S1.stairs.push(Object.assign({ rect: R }, meta));
        else if (x.lift) S1.lifts.push(Object.assign({ rect: R }, meta));
        else S1.rooms.push(Object.assign({ rect: R, m2, part: k, min: minOf(x), room: x.id }, meta)); }); });
    (L.D || []).filter(d => d[0] === st).forEach(d => { const [_, a, b, u, v, o, w] = d, p = toUV(u, v), along = o === 'v' ? 'v' : 'u';
      const rec = { from: a, room: a, to: b, u: p[0], v: p[1], along, w };
      if (b === 'OUT') { const x = rs.find(y => y.id === a); S1.exits.push(Object.assign({ id: a + '_out', block: x ? x.block : '', via: a, to: 'outside', entrance: a === 'lob', kind: x && (x.kind === 'dock') ? 'loading' : undefined }, rec)); }
      else { const xa = rs.find(y => y.id === a); S1.doors.push(Object.assign({}, rec, { from: xa && xa.stair ? stairName(xa) : a })); } });
    S1.walls = wallsOf(rs.flatMap(x => x.r), R2uv);
    return S1; });
  const exitSep = L.apart.map(z => ({ block: z.zone, stairs: `${z.exits} exits`, apart_m: z.apart_m, need_m: z.need_m, ok: z.ok, how: z.how + '; ' + z.rule, a: z.a ? Object.assign({}, z.a, { uv: toUV(z.a.u, z.a.v) }) : null, b: z.b ? Object.assign({}, z.b, { uv: toUV(z.b.u, z.b.v) }) : null, st: z.st }));
  L.travel.forEach(t => { if (t.path) t.pathUV = t.path.map(p => toUV(p[0], p[1])); });
  if (L.plant) L.plant.items.forEach(it => { it.rect = R2uv(it.r); it.zoneUV = R2uv(it.z); });
  if (L.truck) { L.truck.courtUV = R2uv(L.truck.court); }
  const programs = [];
  const T = L.treach, flags = L.flags.slice();
  if (L.plant && !L.plant.ok) flags.push('Plant: ' + L.plant.why);
  if (L.kind === 'stacked') flags.push('Section: ground storey, 4.0 m support storey, one hall storey: the spec’s height-capped section, drawn on every lot by the hub cap (J.B. 8 Nov)');
  if (L.grades && L.grades.heightOk === false) flags.push(`Not built yet: ${L.grades.height} m is over the ${L.grades.hLimit} m limit even with the height-capped section; a lower section is not built (?)`);
  if (L.kind === 'stacked') flags.push('Refuge at 50 people, the minimum; the ground floor behind the hub stays the data-centre entrance row and covered truck court (J.B. 8 Nov)');
  if (L.kind === 'stacked' && L.clin > 0) flags.push('Clinic grows into the spare floor over the hub (spare-floor order: the refuge grows only at grade; clinic kept under 500 m², J.B. 8 Nov)');
  if (L.plant && L.plant.items.some(it => it.kind === 'chiller' && it.roof)) flags.push('Chillers on the hub roof, over the refuge: A2L refrigerant pools below a leak; no safe distance in the maker’s guide (?)');
  if (S.city !== 'van') flags.push('Edmonton cooling: the Liebert AFC is outside Vertiv’s stated range at −30 °C (SL-70790 pp. 9–10): chillers are a placeholder (?)');
  const entrances = [{ id: 'lob_out', block: 'hub', slab_m: L.grades.slab, street_m: L.grades.street, stepFree: L.grades.stepFree }];
  return { version: RULES.version, rules: RULES, storeys, exitSep, flags, programs, entrances, hub: L, typology: 'emergency_hub' };
}
const stairName = x => (/^s[12]$/.test(x.id) ? 'dc_stair_' + (x.id === 's1' ? 'A' : 'B') : /^p[12]$/.test(x.id) ? 'clinic_stair_' + (x.id === 'p2' ? 'A' : 'B') : x.id);
function lineOf(x) { const P = { lobby: 1, pcor: 1, ccor: 1, pcore: 1, proom: 1, croom: 1, exitpas: 1 }, Sx = { scor: 1, score: 1, sroom: 1, hall: 1, dock: 1, bay: 1, entry: 1 };
  return P[x.kind] ? 'public' : Sx[x.kind] ? 'secure' : x.kind === 'spare' ? 'of its corridor' : '—'; }
function minOf(x) { const p = PRG[x.prog] || PRG[x.id] || PRG[(x.id || '').replace(/\d+$/, '')] || null; if (!p) return { m2: null, w: null, step: 6, src: 'drawing choice' };
  return { m2: p.m2 != null ? p.m2 : null, w: p.w != null ? p.w : null, step: p.step, src: p.src, rank: p.rank || null }; }
function wallsOf(rects, R2uv) { const segs = [], key = s => [s.axis, s.at, s.from, s.to].join(',');
  const inAny = (a, b) => rects.some(r => a > r[0] + 1e-6 && a < r[1] - 1e-6 && b > r[2] + 1e-6 && b < r[3] - 1e-6);
  rects.forEach(r => { [[0, 'a'], [1, 'a'], [2, 'b'], [3, 'b']].forEach(([k, ax]) => { const at = r[k], lo = ax === 'a' ? r[2] : r[0], hi = ax === 'a' ? r[3] : r[1], out = (k === 0 || k === 2) ? -0.05 : 0.05;
    const cuts = new Set([lo, hi]); rects.forEach(q => { (ax === 'a' ? [q[2], q[3]] : [q[0], q[1]]).forEach(c => { if (c > lo && c < hi) cuts.add(c); }); });
    const cs = [...cuts].sort((x, y) => x - y); for (let i = 0; i < cs.length - 1; i++) { const m = (cs[i] + cs[i + 1]) / 2, ext = ax === 'a' ? !inAny(at + out, m) : !inAny(m, at + out);
      const p = ax === 'a' ? R2uv([at, at, cs[i], cs[i + 1]]) : R2uv([cs[i], cs[i + 1], at, at]); const s = p[0] === p[1] ? { axis: 'u', at: p[0], from: p[2], to: p[3], exterior: ext } : { axis: 'v', at: p[2], from: p[0], to: p[1], exterior: ext };
      if (!segs.some(t => key(t) === key(s))) segs.push(s); } }); });
  return segs; }

const api = { build, fromSite, siteOf, layout, RULES, PRG, wcA, wcB };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
if (root) { root.BD = root.BD || {}; root.BD.hub = api; }
})(typeof window !== 'undefined' ? window : null);
