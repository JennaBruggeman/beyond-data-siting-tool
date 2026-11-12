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
/* the shared hub checks, ported from the frozen scripts (tool/hubchecks.js, EH-FREEZE-2026-11-11b; spec v2 step 1, 11 Nov 2026) */
const HCm = (typeof module !== 'undefined' && module.exports) ? require('./hubchecks.js') : null;
const HC = () => (root && root.BD && root.BD.hubchecks) || HCm;
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
  lobby: { w: 6.0, m2: 20, ws: [6.0, 5.0, 4.0], why: 'shared lobby ≥ 20 m² (spec 15c, drawing choice), 6.0 m wide on the street, narrowed to 5.0 or 4.0 m on narrow lots (drawing choices; the 1330 Glen Dr hand fit draws 4.4 m)' },
  overflow: { why: 'narrow lots (F2b, 9 Nov 2026): when the hub service row is full, the staff office, first aid and cot storage move into the front row beside the refuge, still off the public corridor (drawing choice, as the 1330 Glen Dr and 8238 Fraser St hand fits)' },
  band: { why: 'bands street → rear (spec rule 1): hub front row (refuge, shelter, lobby on the street) → public corridor → hub service row → data-centre entrance row and loading → covered truck court → plant yard' },
  rowB: { d: 5.0, why: 'beside variant: service rows 5.0 m deep (drawing choice; keeps a 5-exam clinic under 500 m², BE 3.3.1)' },
  rowR: { d: 6.9, why: 'hub service row as deep as a stair (6.9 m, drawing choice) so the clinic stairs and lift sit in it' },
  wcMod: { w: 0.9, why: 'washroom rooms 0.9 m of wall per WC, stalls along the room depth (drawing choice; counts from VBBL Table 3.7.2.2.-A/-B)' },
  smallRoom: { w: 1.6, why: 'small rooms (cot storage, single WC, storage) 1.6 m wide (drawing choice; T-width minimum 1.5 m, spec)' },
  clinicWC: { w: 1.5, why: 'clinic single WC rooms 1.5 m wide: the width-table minimum for a single WC (J.B. 8 Nov); the universal WC keeps its own rule (1,700 mm circle)' },
  dcFront: { d: 3.6, why: 'storey-2 data-centre front row 3.6 m deep, as the freight lift (drawing choice)' },
  ves: { w: 2.6, l: 6.0, why: 'staff vestibule, guard point and portal 2.6 × 6.0 m (portal 1.8 × 1.8 m, arch_acc_gcpsg015RZ; rest drawing choice)' },
  dock: { l: 6.0, why: 'dock and lift lobby 6.0 m deep (drawing choice)' },
  aisle: { w: 6.1, why: '6.1 m truck aisle (Parking By-law 5.4.1; Edmonton not given, Vancouver’s used ?) and a 6.1 m yard aisle behind the building (drawing choice)' },
  pexit: { w: 1.2, why: 'exit passages 1.2 m (≥ 1.1 m, VBBL 3.3.1.9; 2 h)' },
  storeyH: { hall: 6.0, up: 4.0, why: 'hall storey 6.0 m (drawing choice, TIA-942 unread); upper storeys 4.0 m (I-2 3.2.2.9 / I-3 3.1.2.9 minimum); ground 6.1 m I-2 (3.1.2.4), 6.0 m I-3 (3.1.2.9); Edmonton one storey at 6.0 m (no storey minimum in BE, drawing choice)' },
  hallPerMW: { v: 630, why: 'data hall 630 m² a MW (spec 1b: fits use the tool’s low-MW end; dc_rooms.json arch_dc_hall)' },
  setBack: { max: 6, why: 'irregular fronts: the building line steps back at most 6 m from a slanted front line, so the lobby stays on the main street (spec 15c; drawing choice, F2b 9 Nov 2026)' },
  largeW: { w: 60, why: 'beside variant: the building takes at most 60 m of frontage; on wider lots the rest of the land stays open (spec Part 2 large lot; drawing choice, F2b 9 Nov 2026: at 85 m the data-centre travel on 14715 Yellowhead Trail was 46.7 m, over 45 m)' },
  cap: { m2: 2325, why: 'hub cap: data centre ≤ 2,325 m² and one hall storey on every lot, smaller where the lot can’t hold it (J.B. 8 Nov, drawing choice; Vancouver Parking By-law 5.2.5 step)' },
  grid: { g: 0.25, why: 'travel along the path on a 0.25 m grid, 8 directions, through the doors (spec rule 6); ≤ 45 m sprinklered (VBBL 3.4.2.5)' },
  narrow: { wMax: 20, dS: 3.0, dO: 3.5, dA: 5.2, pl: 1.5, why: 'narrow lots (F2b, 10 Nov 2026, as the 1330 Glen Dr and 8238 Fraser St hand fits): where the stacked rows do not fit across a lot under 20 m wide, the hub bands run back from the street: refuge and shelter strip | public corridor | 3.0 m service strip, the lobby across the corridor and service strip at the street; overflow rooms in a 3.5 m pocket of the refuge strip on the corridor; the data-centre entrance row and the bays at the rear (with a side drive: a 5.2 m row only as wide as the bays, stair S2 and lift E2 turned across, the dock and vestibule behind them, the plant yard behind the refuge, as the 1330 hand fit; with no drive: across the lot, stair S2 along the exit passage); the hall only over the hub, the rear two storeys with chillers on their roof (all drawing choices); the refuge held at the spec size, the rest of its strip open ground, not built (J.B. 10 Nov)' },
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
function wcB(p) { return p <= 25 ? 1 : p <= 50 ? 2 : 3 + Math.ceil((p - 50) / 50); }   // VBBL Table 3.7.2.2.-B, p = persons OF EACH SEX ('over 50: 3 + 1 per extra 50'): a partial increment counts, so 51–100 → 4 (J.B. 8 Nov: our reading, conservative)
const wcBload = load => wcB(Math.ceil(load / 2));   // 3.7.2.2.(1): the load split equally between the sexes; Table B per sex (J.B. 9 Nov, as the code reads)

/* ---------- geometry helpers on the lot ---------- */
function inPoly(p, ring) { let c = false; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) { const [xi, yi] = ring[i], [xj, yj] = ring[j]; if ((yi > p[1]) !== (yj > p[1]) && p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi) c = !c; } return c; }
function dSeg(p, a, b) { const dx = b[0] - a[0], dy = b[1] - a[1], l = dx * dx + dy * dy || 1; let t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l; t = Math.max(0, Math.min(1, t)); return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy); }

/* ---------- the site, from the tool (browser adapter) ---------- */
let GPV = null;
function gradePoints(city, id) { if (city !== 'van' || !root || typeof XMLHttpRequest === 'undefined') return null;
  if (GPV === null) { try { const x = new XMLHttpRequest(); x.open('GET', 'data/grade_points_van.json', false); x.send(null); GPV = JSON.parse(x.responseText).lots || {}; } catch (e) { GPV = {}; } }
  return GPV[id] || null; }
/* job A1 lot type (tool/data/lot_types.json, from checks/lot_types_2026-11-07.csv): [type, corner, lane]; null where not measured or 'not a site' */
let LTY = null;
function lotTypeOf(city, id) { if (!root || typeof XMLHttpRequest === 'undefined') return null;
  if (LTY === null) { try { const x = new XMLHttpRequest(); x.open('GET', 'data/lot_types.json', false); x.send(null); LTY = JSON.parse(x.responseText); } catch (e) { LTY = {}; } }
  const r = (LTY[city] || {})[id]; return r ? { type: r[0] || null, corner: !!r[1], lane: !!r[2] } : null; }
function siteOf(P) { const s = P.s, M = s.M, F = M.F, L = (X, Y) => F.toL(X, Y).map(r2);
  const ring = []; for (let i = 0; i < M.ring.length; i += 2) ring.push(L(M.ring[i], M.ring[i + 1]));
  if (ring.length > 1 && Math.hypot(ring[0][0] - ring[ring.length - 1][0], ring[0][1] - ring[ring.length - 1][1]) < 0.01) ring.pop();
  const LE = ((root.BD && root.BD.S && root.BD.S.sel) || {}).edges || [];   /* lot-side edges (lotside.js): the street's name, by edge index (10 Nov 2026) */
  const roadOf = i => { const e = LE.find(x => x.i === i); return e && e.street && e.street.road || null; };
  const edges = (M.edgeYards || []).map(e => ({ kind: e.kind, abuts: e.abuts, d: e.d || 0, a: L(e.ax, e.ay), b: L(e.bx, e.by), road: roadOf(e.i) }));
  const bb = ring2 => { const q = []; for (let i = 0; i < ring2.length; i += 2) q.push(L(ring2[i], ring2[i + 1])); return [Math.min(...q.map(x => x[0])), Math.max(...q.map(x => x[0])), Math.min(...q.map(x => x[1])), Math.max(...q.map(x => x[1]))]; };
  const sel = (root.BD && root.BD.S && root.BD.S.sel) || {}, Z = M.Z || {}, base = Z.base || {}, An = (root.BD.S && root.BD.S.answers) || {};
  const gp = gradePoints(M.city, sel.id); let grade = null;
  if (gp) grade = { corners: (gp.c || []).map(c => L(c[0], c[1]).concat([c[2]])), edges: (gp.e || []).map(e => ({ a: L(e[0], e[1]), b: L(e[2], e[3]), z: e[4] })) };
  return { city: M.city, id: sel.id || null, addr: sel.a ? sel.a[0] : null, zone: String(Z.zone || '').toUpperCase(), dir: s.dir < 0 ? -1 : 1, uf: s.uf, ring, edges,
    sideDrive: M.sideDrive ? { w: M.sideDrive.w, inYard: M.sideDrive.inYard, r: bb(M.sideDrive.ring) } : null, maxDepth: base.yards && base.yards.max || null,
    hLimit: M.H || null, mw: (P.ratio && P.ratio.mwTest) || An.mw || M.mwSized || null, fcl: M.grade && M.grade.fcl ? { v: M.grade.fcl.v, datum: M.grade.fcl.datum, src: M.grade.fcl.src } : null,
    gradeDatum: M.grade ? M.grade.datum : null, grade, lotType: lotTypeOf(M.city, sel.id), frontYard: An.front === 'yard' };   /* F8 flag (10 Nov 2026) */
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
  else { /* F2b (9 Nov 2026): a corner lot takes service, loading and plant from the side street (spec Part 2 'Corner'); else a lane along the side */
    const fl = S.edges.find(e => e.abuts === 'street' && e.kind === 'flank'), al = S.edges.find(e => e.abuts === 'alley' && e.kind !== 'front');
    if (fl) { sv = (fl.a[1] + fl.b[1]) / 2 > vMid ? 1 : -1; driveWhy = 'the side street: service, loading and plant from it (corner variant, spec Part 2)'; }
    else if (al) { sv = (al.a[1] + al.b[1]) / 2 > vMid ? 1 : -1; driveWhy = 'the lane along the side'; } }
  const dir = S.dir, uf = S.uf, uOf = a => uf - dir * a;
  /* across-span of the yard at depth a (v interval, 0.05 m samples), the drive cut out */
  const vMin = Math.min(...vs), vMax = Math.max(...vs);
  function span(a) { const u = uOf(a); let best = null, cur = null;
    for (let v = vMin; v <= vMax + 1e-9; v += 0.05) { const ok = inYard(u, v) && !inDrive(u, v); if (ok) { if (!cur) cur = [v, v]; cur[1] = v; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
    if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; return best; }
  let a0 = 0; { const ref = span(3); for (let a = 0; a < 3; a += 0.05) { const sp = span(a); if (sp && ref && sp[1] - sp[0] >= ref[1] - ref[0] - 0.06) { a0 = r2(a); break; } } }
  const spanOver = (a1, a2) => { let lo = -1e9, hi = 1e9; for (let a = a1; a <= a2 + 1e-9; a += 0.5) { const sp = span(a0 + Math.min(a, a2)); if (!sp) return null; lo = Math.max(lo, sp[0]); hi = Math.min(hi, sp[1]); } return [r2(lo + 0.02), r2(hi - 0.02)]; };
  /* depth available for the building: the yard, and the zone's depth limit (I-3 3.1.2.7 61 m) */
  const depthFrom = f => { let am = 0; for (let a = 0; a < 200; a += 0.5) { const sp = span(f + a); if (!sp || sp[1] - sp[0] < 10) break; am = a; } return am; };
  let aMax = depthFrom(a0), setBack = 0;
  /* F2b (9 Nov 2026), irregular lots: where the front lot line is slanted the lot is under 10 m wide at the front building line, so there is no
     depth from it (8980 Oak St). The building line steps back from the front, 0.5 m at a time up to RULES.setBack.max, to the setback with the largest
     building area (width over the first 40 m × depth, the depth limit applied); the lobby is then reached by a walkway from the street (?).
     Drawing choice. */
  if (aMax < 15) { let best = null;
    for (let k = 0.5; k <= RULES.setBack.max + 1e-9; k = r2(k + 0.5)) { let am = depthFrom(a0 + k); if (S.maxDepth) am = Math.min(am, S.maxDepth); if (am < 15) continue;
      let lo = -1e9, hi = 1e9; for (let a = 0; a <= Math.min(40, am) + 1e-9; a += 0.5) { const sp = span(a0 + k + a); if (!sp) { lo = 1; hi = 0; break; } lo = Math.max(lo, sp[0]); hi = Math.min(hi, sp[1]); }
      const score = Math.max(0, hi - lo) * am; if (!best || score > best.score + 1) best = { k, am, score }; }
    if (best) { setBack = best.k; a0 = r2(a0 + best.k); aMax = best.am;
      flags.push(`Irregular front: the front lot line is slanted, so the building line steps back ${best.k} m from the front to the setback with the largest building; the lobby is reached by a walkway from the street (drawing choice; walkway not drawn ?)`); }
    else flags.push(`Irregular front: the lot is under 10 m wide within ${RULES.setBack.max} m of the front line the site model picked (${(fr0 => fr0 ? Math.round(Math.hypot(fr0.b[0] - fr0.a[0], fr0.b[1] - fr0.a[1])) + ' m long' : '?')(S.edges.find(e => e.abuts === 'street' && e.kind === 'front'))}); a hub laid out from another street line is not built (?)`); }
  const aFull = r2(aMax);   /* F8: the depth to the rear before the zone's depth limit */
  if (S.maxDepth) aMax = Math.min(aMax, S.maxDepth);
  /* F8 (10 Nov 2026, flag; J.B.'s gate passed 10 Nov): second pass, the whole hub (building, truck court, plant) moved back by S.frontShift so the plant
     yard sits at the rear yard line; the ground in front is the front public yard. The building's depth limit still holds (the first pass was capped) */
  if (S.frontShift) { a0 = r2(a0 + S.frontShift); aMax = r2(Math.min(aFull - S.frontShift, S.maxDepth || 1e9)); }
  const res = { site: { a0, aMax: r2(aMax), aFull, driveSide: sv > 0 ? 'high v' : 'low v', driveWhy }, flags, notes };

  /* variants (spec Part 2). F2b (9 Nov 2026): corner and through from the lot's streets; large, irregular, small, wide-shallow from the job A1 lot type */
  const streets = S.edges.filter(e => e.abuts === 'street');
  const LT = S.lotType || null, ltype = LT && LT.type;
  const variant = { main: stackedZone ? 'stacked' : 'beside', sideDrive: !!drive, notBuilt: [], flags: [], lotType: ltype || (LT ? 'not a site (job A1)' : '?') };
  if (streets.some(e => e.kind === 'flank')) { variant.flags.push('corner'); flags.push('Corner: hub and lobby on the main street; service, loading and plant from the side street (spec Part 2)'); }
  /* through: a street at the rear, or two street lines the site model could not tell front from rear ('unclear', as 8238 Fraser St) */
  if (streets.some(e => e.kind === 'rear') || streets.filter(e => e.kind === 'unclear' || e.kind === 'front').length >= 2 && streets.some(e => e.kind === 'unclear')) { variant.flags.push('through'); flags.push('Through lot: hub on the main street; service, loading and plant from the street at the rear (spec Part 2); an exit passage where side yards are 0 m'); }
  if (ltype === 'large') { variant.flags.push('large'); flags.push('Large lot: hub-sized data centre (≤ 2,325 m² of data-centre floor, one hall storey, J.B. 8 Nov); the rest of the land stays open (spec Part 2)'); }
  if (ltype === 'irregular') { variant.flags.push('irregular'); flags.push('Irregular lot (job A1: lot area under 0.75 of its bounding rectangle): the hub is drawn in the widest width the yards allow at each depth'); }
  if (ltype === 'small') variant.flags.push('small');
  if (ltype === 'wide_shallow') { variant.flags.push('wide-shallow'); variant.notBuilt.push('turned'); }
  if (LT && !ltype) flags.push('Job A1 lists this lot as not a site (no street frontage found); the variant is named from the lot’s streets in the tool (?)');
  if (!van) flags.push('Edmonton: every hub needs a rezoning (a data centre is Major Industrial, not in BE; IH does not allow the refuge, shelter or clinic). Shown as if rezoned; the design does not change (J.B. 8 Nov).');
  if (van && !stackedZone) flags.push(`Zone ${zone}: the stacked variant is drawn only for I-2 and I-3; ${zone} drawn as beside (?)`);
  /* front line (J.B. 10 Nov 2026): the front is the lot line on the street the address is on (as the hub's corner rule). Street names: City street
     centrelines (Vancouver, 16 Oct 2026 download); a front line on another street is not laid out from, and the board says so */
  const nrm = t => String(t || '').toUpperCase().replace(/[.,]/g, ' ').split(/\s+/).filter(Boolean).map(w => ({ DRIVE: 'DR', AVENUE: 'AV', AVE: 'AV', STREET: 'ST', ROAD: 'RD', PLACE: 'PL', CRESCENT: 'CR', CRES: 'CR', BOULEVARD: 'BLVD', HIGHWAY: 'HWY' })[w] || w).join(' ').replace(/^(.*\S)\s+(E|W|N|S|NE|NW|SE|SW)$/, (m0, x, d) => /^(NE|NW|SE|SW)$/.test(d) ? m0 : d + ' ' + x);   /* Vancouver: '1ST AV E' = 'E 1ST AV' */
  const addrSt = S.addr ? nrm(String(S.addr).replace(/^\s*[\d\-A-Z]*\d[\dA-Z\-]*\s+/, '')) : null, frontE = streets.filter(e => e.kind === 'front' || e.kind === 'unclear').sort((x, y) => Math.abs((x.a[0] + x.b[0]) / 2 - S.uf) - Math.abs((y.a[0] + y.b[0]) / 2 - S.uf))[0];   /* the street line at the hub's front (a = 0, u = uf) */
  if (!addrSt || !frontE) flags.push('Front line: no address or no street front line in the site model; the front is the site model’s pick (?)');
  else if (!frontE.road) flags.push(`Front line: no street names in the site model${van ? ' (a site model saved before 10 Nov 2026)' : ' (Edmonton’s street file has road classes only)'}; the front is the site model’s pick, not checked against ${S.addr} (?)`);
  else if (nrm(frontE.road) !== addrSt) {
    const onAddr = streets.find(e => e.road && nrm(e.road) === addrSt), why0 = `front line: the site model's front faces ${frontE.road}, not ${addrSt} (the street on the address, J.B. 10 Nov); ${onAddr ? `the line on ${addrSt} is its ${onAddr.kind} line` : `no lot line faces ${addrSt} in the street file`}; not laid out from it`;
    res.doesntFit = { limiting: [why0] }; res.variant = variant; flags.push('Doesn’t fit here: ' + why0 + ' (?)'); return res; }

  const H = RULES.storeyH, ground = van ? (I2 ? 6.1 : 6.0) : H.hall;
  const lad = [{ k: 1, t: 'full program', exams: 13, shelter: true, shared: false }, { k: 2, t: 'clinic 13 → 5 exam rooms', exams: 5, shelter: true, shared: false },
    { k: 3, t: 'no clinic', exams: 0, shelter: true, shared: false }, { k: 4, t: 'shelter merged into the refuge (day)', exams: 0, shelter: false, shared: false },
    { k: 5, t: 'shared loading by approval (Parking By-law 5.1.5)', exams: 0, shelter: false, shared: true }];
  const ladder = extra => { const why = [];
    for (const st of lad) {
      const tryMW = mw => (variant.main === 'stacked' ? stacked : beside)(Object.assign({ S, st, mw, a0, aMax, spanOver, uOf, sv, van, I2, I3, ground, inYard, inDrive, flags }, extra || {}));
      let mw = S.mw || 1.8, L = tryMW(mw);
      if (L.fail) { why.push(`step ${st.k} (${st.t}): ${L.fail}`); continue; }
      /* the plant must fit: else the hall shrinks ("smaller where the lot can't hold it") */
      let guard = 0; while (L.plant && !L.plant.ok && guard++ < 16) { mw = r2(L.MW - 0.25); if (mw < 0.3) break; const L2 = tryMW(mw); if (L2.fail || L2.MW >= L.MW - 0.01) break; L = L2; }   /* the narrow layout's hall is set by the footprint: no smaller hall to try */
      if (L.plant && !L.plant.ok) { why.push(`step ${st.k} (${st.t}): plant does not fit (${L.plant.why})`); continue; }
      L.ladder = { step: st.k, what: st.t, limiting: why.slice() }; return { out: L, why };
    }
    return { out: null, why }; };
  let { out, why } = ladder();
  /* TURNED (spec Part 2, wide-shallow lots; F2b 9 Nov 2026): no yard behind the building for the plant, so the building takes less than the
     frontage and the plant goes in a yard beside it, the bands still running along the street (as the 1353 Pender St E hand fit). The widest
     building that works is kept: the plant yard grows 2 m at a time (drawing choice). A screened street-front plant yard is not drawn (?). */
  if (!out && variant.main === 'stacked') {
    const fr = streets.find(e => e.kind === 'front'), frw = fr ? Math.hypot(fr.b[0] - fr.a[0], fr.b[1] - fr.a[1]) : 0, sp0 = spanOver(0, Math.min(40, aMax));
    if (sp0 && (ltype === 'wide_shallow' || frw > aMax)) { const Wfull = r2(sp0[1] - sp0[0]);
      for (let cut = 8; cut <= Wfull - 20 && !out; cut += 2) { const t = ladder({ maxW: r2(Wfull - cut), Wfull, turned: true }); if (t.out) { out = t.out; out.turnedYard = cut; } }
      if (out) { variant.flags.push('turned'); variant.notBuilt = variant.notBuilt.filter(x => x !== 'turned');
        flags.push(`Turned (spec Part 2): the building takes ${out.W} m of the ${Wfull} m width; the plant stands in a yard about ${out.turnedYard} m wide beside it, the bands still along the street (drawing choice; a screened street-front yard not drawn)`); } }
  }
  if (!out) { res.doesntFit = { limiting: why }; res.variant = variant; flags.push('Doesn’t fit here (ladder step 7): ' + why.join('; '));
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
  res.fromUV = (u, v) => [r2((uf - u) / dir - a0), r2((v - res.bOrigin) * sv)];   /* the lot frame back into the layout frame (the inverse of toUV) */
  finish(res, S);
  if (!S.noV2) withV2(res, S);   /* 12 Nov 2026: pushBack's trial layouts skip the v2 rows (its same-hub test doesn't read them); added once to the layout kept */
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
/* F2b (10 Nov 2026): the stacked rows first; where they do not fit on a lot under RULES.narrow.wMax wide (not turned), the narrow layout */
function stacked(C) {
  const L = stackedRows(C); if (!L.fail || C.turned) return L;
  const sp = C.spanOver(0, Math.min(40, C.aMax)); if (!sp || r2(sp[1] - sp[0]) >= RULES.narrow.wMax) return L;
  const N = narrowLot(C); return N.fail ? { fail: `${L.fail}; narrow layout: ${N.fail}` } : N;
}
function stackedRows(C) {
  const { st, van } = C, cw = RULES.cor.w, SW = RULES.stair.w, SL = RULES.stair.l, dR = RULES.rowR.d, wcm = RULES.wcMod.w, sm = RULES.smallRoom.w;
  /* the width: the yard across the first 40 m (refined once the depth is known) */
  let sp = C.spanOver(0, Math.min(40, C.aMax)); if (!sp) return { fail: 'no buildable width' };
  let W = r2(sp[1] - sp[0]); if (C.maxW) W = Math.min(W, C.maxW);   /* turned: a narrower building, the plant beside it */
  const build = (W, Da) => {
    const R = [], D = [];
    /* the hub service row behind the public corridor (hub load and washrooms, Part 1: refuge + shelter area ÷ 0.75 m² a person, half each sex;
       Table 3.7.2.2.-A): [P2 E1] WCs, universal WC and shower, first aid, office, cot storage, programs mechanical, the refuge's second room
       (grows into what is left), [P1]; rooms in 'ovf' already sit in the front row; the clinic stairs and lift only with a clinic (F2b) */
    const clinicStairs = st.exams > 0;
    const serviceRow = (F, ovf) => { let ref2w = 0, rI, prr, load;
      for (let it = 0; it < 4; it++) {
        const areaRS = sum(F.filter(x => x.k === 'refuge' || x.k === 'shelter').map(x => ra(x.rr))) + ref2w * dR;
        load = Math.ceil(areaRS / 0.75); const [nM, nF] = wcA(Math.ceil(load / 2));
        rI = (clinicStairs ? [{ id: 'p2', n: 'Stair P2 (clinic)', k: 'pcore', fix: SW, stair: true }, { id: 'e1', n: 'Lift E1 (public, storeys 1–2)', k: 'pcore', fix: RULES.e1.w, lift: true }] : [])
          .concat([{ id: 'wcw', n: `WC women (${nF})`, k: 'proom', w: Math.max(sm, r2(nF * wcm)), wc: nF }, { id: 'wcm', n: `WC men (${nM})`, k: 'proom', w: Math.max(sm, r2(nM * wcm)), wc: nM },
          { id: 'uwc', n: 'Universal WC', k: 'proom', w: PRG.uwc.w }, { id: 'sho', n: 'Universal shower', k: 'proom', w: PRG.sho.w },
          { id: 'fa', n: 'First aid', k: 'proom', w: PRG.fa.w, m2: PRG.fa.m2 }, { id: 'off', n: 'Staff office (shared)', k: 'proom', w: PRG.off.w, m2: PRG.off.m2 },
          { id: 'cot', n: 'Cot and supply storage', k: 'proom', w: sm }, { id: 'pmec', n: 'Programs mechanical, emergency panel', k: 'plant', w: PRG.pmec.w },
          { id: 'ref2', n: 'Refuge, second room (grown into spare floor)', k: 'refuge2', w: 0, grow: true }])
          .concat(clinicStairs ? [{ id: 'p1', n: 'Stair P1 (clinic)', k: 'pcore', fix: SW, stair: true }] : []).filter(x => !ovf.includes(x.id));
        prr = pack(rI, W, dR); if (prr.fail) return { fail: `hub service row needs ${prr.fail} m across; ${W} m available (washrooms for a load of ${load}, Table 3.7.2.2.-A)`, load };
        const gi = rI.findIndex(x => x.id === 'ref2'), g = prr.ws[gi];
        if (g < PRG.refuge.w) { const ci = rI.findIndex(x => x.id === (ovf.includes('cot') ? 'pmec' : 'cot')); prr.ws[ci] = r2(prr.ws[ci] + g); prr.ws[gi] = 0; if (ref2w === 0) break; ref2w = 0; continue; }
        if (Math.abs(g - ref2w) < 0.05) break; ref2w = g;
      }
      return { rItems: rI, pr: prr }; };
    /* storey 1, front row: refuge (grows) | day shelter | [overflow rooms] | lobby on the drive side (spec 15c: one wall on the main street).
       F2b (9 Nov 2026): the front row deepens until it fits (it was one depth only), the lobby narrows on narrow lots (RULES.lobby.ws), rooms
       that overflow the service row move beside the refuge (RULES.overflow), and when the clinic is dropped (ladder step 3 on) its stairs P1, P2
       and lift E1 are not built: the floor over the hub is unassigned data-centre floor off the secure corridor */
    const OVF = ['off', 'fa', 'cot'];
    let F, dF, fItems, rItems, pr, lobW;
    for (let moveN = 0; moveN <= OVF.length; moveN++) {
      const ovf = OVF.slice(0, moveN);
      const ovfItems = ovf.map(id => id === 'off' ? { id: 'off', n: 'Staff office (shared)', k: 'proom', w: PRG.off.w, m2: PRG.off.m2, ovf: true } : id === 'fa' ? { id: 'fa', n: 'First aid', k: 'proom', w: PRG.fa.w, m2: PRG.fa.m2, ovf: true } : { id: 'cot', n: 'Cot and supply storage', k: 'proom', w: sm, ovf: true });
      let pf = null;
      for (lobW of RULES.lobby.ws) {
        fItems = [{ id: 'ref', n: st.shelter ? 'Refuge main room' : 'Refuge main room, day shelter merged (ladder step 4)', k: 'refuge', w: 4.0, m2: PRG.refuge.m2, grow: true }]
          .concat(st.shelter ? [{ id: 'shel', n: 'Warming shelter rest area (day)', k: 'shelter', w: 4.0, m2: PRG.shelter.m2 }] : []).concat(ovfItems)
          .concat([{ id: 'lob', n: 'Shared lobby', k: 'lobby', w: lobW, m2: RULES.lobby.m2 }]);
        const minF = (PRG.refuge.m2 + (st.shelter ? PRG.shelter.m2 : 0)) / Math.max(1, W - lobW);
        pf = { fail: r2(W + 0.1) };
        for (dF = Math.max(6.0, up1(minF)); dF <= 24 + 1e-9; dF = r2(dF + 0.1)) { pf = pack(fItems, W, dF); if (!pf.fail) break; }
        if (!pf.fail) break;
      }
      if (pf.fail) return { fail: `front row needs ${pf.fail} m across; ${W} m available (refuge ${PRG.refuge.m2} m² + shelter + lobby ≥ ${RULES.lobby.m2} m², spec 1a, 15c)` };
      F = place(fItems, pf.ws, 0, 0, dF);
      const sr = serviceRow(F, ovf); if (sr.fail && moveN < OVF.length) continue; if (sr.fail) return sr; rItems = sr.rItems; pr = sr.pr; break;
    }
    const aC = dF, aR = r2(dF + cw), aB = r2(aR + dR);
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
  /* 10 Nov 2026 fix (J.B.: the cap holds on every lot; 1515 Boundary Rd was 3,392 m²): where the depth can't come down further, the building narrows
     1 m at a time from the far side (the drive side stays; the rest of the land stays open, as the large-lot rule); if it still can't, the hub doesn't fit */
  if (L.dcArea > RULES.cap.m2 + 0.5) { let W2 = W; const Da0 = L.Da;
    while (L.dcArea > RULES.cap.m2 + 0.5 && guard++ < 260) { W2 = r2(W2 - 1); if (W2 < 15) break; const B2 = build(W2, Da0); if (B2.fail) continue; const L2 = stackedRest(C, B2, W2, Da0); if (L2.fail) continue;
      Object.assign(L2, { W: W2, Da: Da0, bOrigin }); Object.assign(L, L2); L.capped = true; L.capW = { from: W, to: W2 }; }
    if (L.dcArea > RULES.cap.m2 + 0.5) return { fail: `the data centre stays ${Math.round(L.dcArea)} m² at the smallest depth and width tried, over the hub cap of ${RULES.cap.m2} m² (J.B. 8 Nov)` }; }
  return L;
}
function stackedRest(C, B, W, Da) {
  const { st, van } = C, cw = RULES.cor.w, SW = RULES.stair.w, SL = RULES.stair.l, sm = RULES.smallRoom.w;
  const R = B.R.slice(), aB = B.aB, aC = B.aC, aR = B.aR, dF = B.dF;
  /* loading count (rule 10) needs the areas: first the rooms, then the bays */
  const hubArea = sum(R.filter(x => x.block === 'hub' && !x.core).map(x => sum(x.r.map(ra))));
  /* storey 2, clinic over the hub (I-3 2.2.6): front row | clinic corridor (over the public corridor) | back row with P2, E1, P1 */
  const R2 = []; let clin = 0, clinWhy = null, hubSpareDC = false;
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
        .concat(Array.from({ length: Math.max(0, 2 * nwc - 1) }, (_, i) => ({ id: 'cwc' + (i + 1), n: 'Clinic WC ' + (i + 1), w: RULES.clinicWC.w, p: 'cwc' })))
        .concat([{ id: 'cuw', n: 'Clinic universal WC', w: PRG.uwc.w, p: 'uwc' }, { id: 'cspare', n: 'Unassigned (no use yet), off the clinic corridor', w: 0, grow: true, spare: true }, { id: 'p1', fix: SW }]);
      pb = pack(bI, W, RULES.rowR.d); if (pb.fail) return { fail: `clinic back row needs ${pb.fail} m; ${W} m available` };
      const est = W * dF + W * cw + sum(bI.map((x, i) => (x.p ? pb.ws[i] : 0))) * RULES.rowR.d;
      const n2 = wcBload(Math.ceil(est / 9.3)); if (n2 === nwc) break; nwc = n2;
    }
    const Fc = place(fI, pf.ws, 0, 0, dF), Bc = place(bI, pb.ws, 0, aR, aB);
    Fc.forEach(x => R2.push(room(2, x.id, x.n, 'clin', 'croom', [x.rr], { block: 'clinic', prog: x.p })));
    R2.push(room(2, 'ccor', 'Clinic corridor', 'clin', 'ccor', [[aC, aR, 0, W]], { block: 'clinic', corridor: true }));
    Bc.forEach(x => { if (x.id === 'p2' || x.id === 'p1') R2.push(room(2, x.id, `Stair ${x.id.toUpperCase()} (clinic)`, 'circ', 'pcore', [x.rr], { block: 'clinic', core: true, stair: true }));
      else if (x.id === 'e1') { R2.push(room(2, 'e1', 'Lift E1 (public)', 'circ', 'pcore', [[aR, r2(aR + RULES.e1.l), x.rr[2], x.rr[3]]], { block: 'clinic', core: true, lift: true })); R2.push(room(2, 'psh', 'Programs shaft', 'circ', 'shaft', [[r2(aR + RULES.e1.l), aB, x.rr[2], x.rr[3]]], { block: 'clinic', core: true })); }
      else if (x.rr[3] - x.rr[2] > 0.01) R2.push(room(2, x.id, x.n, x.spare ? 'spare' : 'clin', x.spare ? 'spare' : 'croom', [x.rr], { block: x.spare ? 'spare' : 'clinic', prog: x.p })); });
    clin = sum(R2.filter(x => x.block === 'clinic' && !x.core).map(x => sum(x.r.map(ra))));
    if (clin > 500 && van) clinWhy = 'clinic over 500 m²: one loading space (Parking By-law 5.2.9)';
  } else if (!B.Rr.some(x => x.id === 'e1')) {
    /* F2b (9 Nov 2026): no clinic, so no clinic stairs or public lift: the floor over the hub joins the data-centre storey as unassigned floor
       off the secure corridor (as the 1330 Glen Dr hand fit); placed below once the cores and the secure corridor are known */
    hubSpareDC = true;
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
  const nDC = van ? bays5_2_5(dcGuess) : 0, nRef = van ? (hubArea < 100 ? 0 : rh517(hubArea / 2800)) : 0, nCl = van ? (clin < 500 ? 0 : clin <= 5000 ? 1 : clin <= 10000 ? 2 : 3) : 0;
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
  const upsM2 = r2(MWest * 3.3 + 1.0 * PRG.ups.w), batM2 = r2(MWest * 3.8 + 1.0 * PRG.bat.w)   /* F11 B4 (J.B. 11 Nov 2026): 10–15 min (FM 5-32), 3.8 m² per MW at the high end; was 1.8 for about 5 min */;
  const frontL = [{ id: 'ups', n: `UPS room (${Math.ceil(MWest) + 1} modules, N+1)`, w: PRG.ups.w, m2: upsM2 }, { id: 'bat', n: 'Battery room, Li-ion', w: PRG.bat.w, m2: batM2 },
    { id: 'bhv', n: 'Battery room HVAC (separate)', w: PRG.bhv.w }, { id: 'mv', n: 'MV switchgear, main electrical', w: PRG.mv.w }];
  const frontR = [{ id: 'mmr1', n: 'Meet-me room 1', w: PRG.mmr.w }, { id: 'mmr2', n: 'Meet-me room 2', w: PRG.mmr.w }, { id: 'valv', n: 'Sprinkler valve room, cylinders', w: PRG.valv.w },
    { id: 'jan', n: 'Janitor (DC)', w: PRG.jan.w }, { id: 'dwc', n: 'DC staff WC, shower', w: PRG.dwc.w }, { id: 'garb', n: 'Garbage and recycling', w: PRG.garb.w, grow: true }];
  /* front row: the rooms fill the stretch left of E2, then right of E2; what does not fit goes to the back row; the rest of each stretch is unassigned */
  const lW = r2(e2[2] - s1[3]), rW = r2(s2[2] - e2[3]), wOf = x => Math.max(x.w || 0, x.m2 ? up1(x.m2 / dcFrontD) : 0);
  const sides = [{ b0: s1[3], W: lW, it: [] }, { b0: e2[3], W: rW, it: [] }], moved = [];
  frontL.concat(frontR.map(x => Object.assign({}, x, { grow: false }))).forEach(x => { const sd = !hubSpareDC && sides.find(z => r2(sum(z.it.map(wOf)) + wOf(x)) <= z.W + 1e-6); if (sd) sd.it.push(x); else moved.push(x); });
  if (hubSpareDC) R2.push(room(2, 'sparehub', 'Unassigned (no use yet; clinic dropped), off the secure corridor', 'spare', 'spare', subAll([[0, aS, 0, W]], [S1r, S2r, E2r]), { block: 'spare', dcSide: true }));
  if (!hubSpareDC) sides.forEach((sd, k) => { const it = sd.it.concat([{ id: k ? 'fsp2' : 'fspare', n: 'Unassigned (no use yet)', w: 0, grow: true, spare: true }]); const pk = pack(it, sd.W, dcFrontD); if (pk.fail) return; const li = it.length - 1; if (pk.ws[li] < 1.5 && li > 0) { pk.ws[li - 1] = r2(pk.ws[li - 1] + pk.ws[li]); pk.ws[li] = 0; }
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
/* ---------- NARROW (F2b, 10 Nov 2026): the stacked hub with its bands running back from the street (RULES.narrow) ----------
   Storey 1: refuge strip b [0, Wr] (stair S1 at its street corner, the refuge, an overflow pocket on the corridor, the day shelter at the far end)
   | public corridor b [Wr, Wr + 2] | service strip b [Wr + 2, W] (washrooms, then any rooms that did not overflow, an exit passage at the far end);
   the lobby across the corridor and service strip at the street. Then the data-centre entrance row (dock, freight lift E2, staff vestibule and stair S2
   turned across, on the drive side) and the bays: along the side drive (bays across the lot) or, with no drive, open to a truck court at the rear.
   With no side drive an exit passage runs from the corridor's far end along the lot line to that court (0 m side yards, I-2).
   Storey 2: data-centre support off a secure corridor over the public corridor; the rest of the floor over the hub unassigned. Storey 3: the hall
   over the hub only; the rear is two storeys, its roof the lower roof for the chillers. No clinic (no second separate exit fits: spec Part 6). */
function narrowLot(C) {
  const { st, van } = C, N = RULES.narrow, cw = RULES.cor.w, SW = RULES.stair.w, SL = RULES.stair.l, dS = N.dS, dO = N.dO, dA = N.dA, wcm = RULES.wcMod.w, sm = RULES.smallRoom.w;
  if (st.exams > 0) return { fail: 'narrow lot: the clinic cannot have two separate exits (spec Part 6, as 1330 Glen Dr and 8238 Fraser St)' };
  const drive = !!(C.S.sideDrive), pw = drive ? 0 : RULES.pexit.w, bayL = van ? 10.2 : 9.0, bayW = van ? 3.4 : 3.3;
  const dAx = drive ? dA : SL;   /* no drive: stair S2 runs along the lot (6.9 m) so it opens onto the truck court */
  /* no drive: the rear truck court must be reached from a street or lane at the rear or side (through, corner or lane lot), else no loading */
  const svcEdge = drive ? null : C.S.edges.find(e => (e.abuts === 'street' || e.abuts === 'alley') && e.kind !== 'front');
  if (!drive && !svcEdge) return { fail: 'narrow lot with no side drive and no street or lane at the rear or side: the bays cannot be reached' };
  const svcWhy = svcEdge ? `the ${svcEdge.abuts === 'alley' ? 'lane' : 'street'} on the ${svcEdge.kind === 'flank' ? 'side (corner lot)' : svcEdge.kind === 'rear' ? 'rear (through lot)' : 'second street line (front and rear unclear, through lot read)'}` : null;
  const L0 = c => { const sp = C.spanOver(0, c); return sp ? r2(sp[1] - sp[0]) : 0; };
  const len = it => it.fix != null ? it.fix : Math.max(it.w || 0, it.m2 ? up1(it.m2 / (it.d || dS)) : 0);
  const SV = nW => [{ id: 'wcw', n: `WC women (${nW[1]})`, k: 'proom', w: Math.max(sm, r2(nW[1] * wcm)) }, { id: 'wcm', n: `WC men (${nW[0]})`, k: 'proom', w: Math.max(sm, r2(nW[0] * wcm)) },
    { id: 'uwc', n: 'Universal WC', k: 'proom', w: PRG.uwc.w }, { id: 'sho', n: 'Universal shower', k: 'proom', w: PRG.sho.w },
    { id: 'fa', n: 'First aid', k: 'proom', w: PRG.fa.w, m2: PRG.fa.m2 }, { id: 'off', n: 'Staff office (shared)', k: 'proom', w: PRG.off.w, m2: PRG.off.m2 },
    { id: 'cot', n: 'Cot and supply storage', k: 'proom', w: sm }, { id: 'pmec', n: 'Programs mechanical, emergency panel', k: 'plant', w: PRG.pmec.w }];
  const OVF = ['pmec', 'cot', 'off', 'fa'];
  const plan = (W, moveN) => {
    const Wr = r2(W - cw - dS), Wd = r2(W - pw);
    if (Wr < SW + PRG.refuge.w) return { fail: `refuge strip ${Wr} m wide beside stair S1 needs ${r2(SW + PRG.refuge.w)} m (lot ${W} m wide)` };
    const rowW = drive ? SL + RULES.e2.l : SW + RULES.e2.w + 2.4; if (Wd < rowW) return { fail: `data-centre entrance row needs ${r2(rowW + pw)} m across; ${W} m available` };
    const lobD = Math.max(4.0, up1(RULES.lobby.m2 / (cw + dS))), shL = st.shelter ? Math.max(PRG.shelter.w, up1(PRG.shelter.m2 / Wr)) : 0;
    const ovf = OVF.slice(0, moveN);
    const areaRS = PRG.refuge.m2 + (st.shelter ? PRG.shelter.m2 : 0), pA0 = pk => r2(sum(pk.map(len)) * dO); let aE = 0, svc, pocket, load;
    for (let it = 0; it < 8; it++) {
      load = Math.ceil(areaRS / 0.75); const nW = wcA(Math.ceil(load / 2));
      svc = SV(nW).filter(x => !ovf.includes(x.id)); pocket = SV(nW).filter(x => ovf.includes(x.id)).map(x => Object.assign({}, x, { d: dO }));
      const svcLen = r2(sum(svc.map(len)) + N.pl), pL = r2(sum(pocket.map(len))), pA = pL * dO;
      const aE2 = up1(Math.max(lobD + svcLen, (PRG.refuge.m2 + SW * SL + pA) / Wr + shL, lobD + pL + 1.0 + shL, SL + 1.0 + shL));
      if (Math.abs(aE2 - aE) < 0.05) { aE = aE2; break; } aE = aE2; }
    /* the refuge holds at the spec size (J.B. 10 Nov: about 50 people, as the hand fits); the shelter follows it; the rest of the strip is
       open ground, not built (spare floor at grade not built, as the hub decision of 10 Nov); a remainder under 1.5 m joins the refuge */
    let aRef = up1(Math.max((PRG.refuge.m2 + SW * SL + pA0(pocket)) / Wr, lobD + sum(pocket.map(len)) + 1.0, SL + 1.0));
    if (aE - shL - aRef < 1.5) aRef = r2(aE - shL);
    const refA = r2(Wr * aRef - SW * SL - pA0(pocket));
    return { W, Wr, Wd, lobD, shL, ovf, svc, pocket, aE, aRef, refA, load, areaRS: r2(refA + (st.shelter ? shL * Wr : 0)) };
  };
  /* the loading count from the floor areas (Parking By-law 5.2.5, 5.2.3; no clinic), then the depth */
  const nbOf = (P, Dend) => { const hub = P.areaRS + (P.W - P.Wr) * P.aE; const dc = 2 * P.W * P.aE + 2 * P.W * (Dend - P.aE);
    const nDC = van ? bays5_2_5(dc) : 0, nRef = van ? (hub < 100 ? 0 : rh517(hub / 2800)) : 0; if (!van) return { nb: hub + dc < 2500 ? 0 : hub + dc <= 7500 ? 1 : 2, nDC, nRef };
    return { nb: st.shared ? Math.max(nDC, nRef) : nDC + nRef, nDC, nRef }; };
  const depthOf = (P, nb) => r2(P.aE + dAx + (drive ? nb * bayW : bayL));
  let W = L0(Math.min(40, C.aMax)), P = null, nbr = null, Dend = null, why = null;
  for (let pass = 0; pass < 2; pass++) {
    P = null;
    for (let m = 0; m <= OVF.length; m++) { const Q = plan(W, m); if (Q.fail) { why = Q.fail; break; }
      let nb0 = nbOf(Q, Q.aE + dAx + bayL), D = depthOf(Q, nb0.nb); nb0 = nbOf(Q, D); D = depthOf(Q, nb0.nb);
      if (!drive && nb0.nb * bayW > Q.Wd - SW - 1.1) { why = `${nb0.nb} loading spaces ${bayW} m wide need ${r2(nb0.nb * bayW)} m across; ${r2(Q.Wd - SW - 1.1)} m left beside stair S2 and a vestibule door`; continue; }
      if (D <= C.aMax + 1e-6) { P = Q; nbr = nb0; Dend = D; break; }
      why = `the narrow hub needs ${D} m of depth (hub ${Q.aE} m, entrance row ${dAx} m, ${nb0.nb} bays); ${C.aMax} m inside the yards`; }
    if (!P) return { fail: why || 'narrow layout does not fit' };
    const W2 = L0(Dend); if (W2 >= W - 0.01) break; W = W2;
  }
  const { Wr, Wd, lobD, shL, aE, svc, pocket } = P, nb = nbr.nb, aR0 = r2(aE + dAx);
  const R = [], R2 = [];
  const hubRoom = (id, n, g, kind, rects, o) => R.push(room(1, id, n, g, kind, rects, Object.assign({ block: 'hub' }, o || {})));
  const sec = (s, id, n, kind, rects, o) => room(s, id, n, kind === 'hall' ? 'hall' : kind === 'bay' ? 'load' : 'sup', kind, rects, Object.assign({ block: 'data centre' }, o || {}));
  /* storey 1: the hub */
  const S1r = [0, SL, 0, SW];
  let a = lobD; const pocketR = [lobD, r2(lobD + sum(pocket.map(len))), r2(Wr - dO), Wr];
  pocket.forEach(x => { const l = len(x); hubRoom(x.id, x.n, x.k === 'plant' ? 'plant' : 'pub', x.k, [[a, r2(a + l), r2(Wr - dO), Wr]], { prog: x.id, ovf: true }); a = r2(a + l); });
  const aEr = P.aRef, aOpen = r2(aEr + shL);
  hubRoom('ref', st.shelter ? 'Refuge main room' : 'Refuge main room, day shelter merged (ladder step 4)', 'pub', 'proom', subAll([[0, aEr, 0, Wr]], [S1r].concat(pocket.length ? [pocketR] : [])).sort((x, y) => x[0] - y[0] || x[2] - y[2]), { prog: 'refuge' });   /* street piece first (its street door) */
  if (st.shelter) hubRoom('shel', 'Warming shelter rest area (day)', 'pub', 'proom', [[aEr, aOpen, 0, Wr]], { prog: 'shelter' });
  const openR = aE - aOpen > 0.01 ? [aOpen, aE, 0, Wr] : null;   /* open ground at grade (not built), under storey 2 */
  hubRoom('lob', 'Shared lobby', 'circ', 'lobby', [[0, lobD, Wr, P.W]], { prog: 'lobby' });
  const passR = drive ? [[r2(aE - N.pl), aE, r2(Wr + cw), P.W]] : [[r2(aE - N.pl), aE, r2(Wr + cw), P.W], [aE, r2(Dend), Wd, P.W]];
  /* the service strip: rooms in order, what is left goes to the last room (≥ 1.5 m as unassigned) */
  a = lobD; const sEnd = r2(aE - N.pl);
  svc.forEach((x, i) => { let l = len(x); if (i === svc.length - 1) { const left = r2(sEnd - a - l); if (left > 0 && left < 1.5) l = r2(l + left); } hubRoom(x.id, x.n, x.k === 'plant' ? 'plant' : 'pub', x.k, [[a, r2(a + l), r2(Wr + cw), P.W]], { prog: x.id }); a = r2(a + l); });
  if (sEnd - a >= 1.5 - 1e-6) hubRoom('sspare', 'Unassigned (no use yet), off the public corridor', 'spare', 'spare', [[a, sEnd, r2(Wr + cw), P.W]]);
  R.push(room(1, 'cor', 'Public corridor', 'circ', 'pcor', [[lobD, aE, Wr, r2(Wr + cw)]], { block: 'hub', corridor: true }));
  R.push(room(1, 'pas', drive ? 'Exit passage to the side drive (corridor far end)' : 'Exit passage (2 h) along the lot line to the truck court', 'circ', 'exitpas', passR, { block: 'hub' }));
  R.push(sec(1, 's1', 'Stair S1 (data centre)', 'score', [S1r], { core: true, stair: true }));
  /* storey 1: the data-centre entrance row and bays */
  /* drive: S2 turned across (2.6 m deep) on the drive edge, the vestibule behind it, both opening onto the drive; no drive: S2 along the lot beside
     the exit passage and the vestibule beside S2, both opening onto the truck court (the stair is not opened into the public passage, spec 15a) */
  /* drive: a row only as wide as the bays at the drive edge (b from Wb0): S2 and E2 turned across at the front (2.6 m), the dock (lift lobby) and the
     vestibule behind them, both doors onto the drive or the bays; the rest of the width behind the refuge stays open for the plant (1330 hand fit).
     No drive: across the lot, S2 along the lot beside the exit passage, E2 beside it at the end of the storey-2 corridor, the vestibule behind E2;
     S2 and the vestibule open onto the truck court beside the bays (the stair is not opened into the public passage, spec 15a) */
  const Wb0 = drive ? r2(P.W - SL - RULES.e2.l) : 0;
  const vB = drive ? [r2(Wb0 + RULES.e2.l), P.W] : [r2(Wd - SW - RULES.e2.w), r2(Wd - SW)], eB1 = vB[0];
  const S2r = drive ? [aE, r2(aE + SW), vB[0], P.W] : [aE, r2(aE + SL), r2(Wd - SW), Wd];
  const E2r = drive ? [aE, r2(aE + SW), Wb0, vB[0]] : [aE, r2(aE + RULES.e2.l), vB[0], vB[1]];
  const stub = null;
  const VESr = drive ? [r2(aE + SW), aR0, vB[0], vB[1]] : [r2(aE + RULES.e2.l), aR0, vB[0], vB[1]];
  R.push(sec(1, 'dock', 'Dock and lift lobby (entrance)', 'dock', drive ? [[r2(aE + SW), aR0, Wb0, vB[0]]] : subAll([[aE, aR0, 0, eB1]], [E2r])));
  R.push(sec(1, 'e2', 'Freight lift E2 (passenger-rated)', 'score', [E2r], { core: true, lift: true }));
  R.push(sec(1, 'ves', 'DC staff entrance: vestibule, guard point, portal', 'entry', [VESr]));
  R.push(sec(1, 's2', drive ? 'Stair S2 (data centre), turned across' : 'Stair S2 (data centre)', 'score', [S2r], { core: true, stair: true }));
  const BB = drive ? [aR0, r2(aR0 + nb * bayW), r2(P.W - bayL), P.W] : [aR0, r2(aR0 + bayL), 0, r2(nb * bayW)];
  for (let i = 0; i < nb; i++) R.push(sec(1, 'b' + (i + 1), `Loading space ${i + 1}, ${van ? 'Class B 10.2 × 3.4 m' : '9.0 × 3.3 m'}`, 'bay',
    [drive ? [r2(aR0 + i * bayW), r2(aR0 + (i + 1) * bayW), BB[2], BB[3]] : [aR0, BB[1], r2(i * bayW), r2((i + 1) * bayW)]]));
  /* storey 2 */
  const xL = Math.min(Wr, r2(E2r[3] - 1.2));
  R2.push(sec(2, 's1', 'Stair S1 (data centre)', 'score', [S1r], { core: true, stair: true }), sec(2, 's2', 'Stair S2 (data centre)', 'score', [S2r], { core: true, stair: true }),
    sec(2, 'e2', 'Freight lift E2', 'score', [E2r], { core: true, lift: true }),
    sec(2, 'dcor', 'Secure corridor', 'scor', [[0, aE, Wr, r2(Wr + cw)], [0, cw, SW, Wr], [r2(aE - cw), aE, xL, Wr], [r2(aE - cw), aE, r2(Wr + cw), P.W]].concat(stub ? [stub] : []).filter(r => r[1] - r[0] > 0.01 && r[3] - r[2] > 0.01), { corridor: true }));
  const hallR0 = subAll([[0, aE, 0, P.W]], [S1r]).concat(stub ? [stub] : []), MWest = sum(hallR0.map(ra)) / RULES.hallPerMW.v;
  const upsM2 = r2(MWest * 3.3 + 1.0 * PRG.ups.w), batM2 = r2(MWest * 3.8 + 1.0 * PRG.bat.w)   /* F11 B4 (J.B. 11 Nov 2026): 10–15 min (FM 5-32), 3.8 m² per MW at the high end; was 1.8 for about 5 min */;
  const sideL = [{ id: 'ups', n: `UPS room (${Math.ceil(MWest) + 1} modules, N+1)`, w: PRG.ups.w, m2: upsM2 }, { id: 'bat', n: 'Battery room, Li-ion', w: PRG.bat.w, m2: batM2 },
    { id: 'bhv', n: 'Battery room HVAC (separate)', w: PRG.bhv.w }, { id: 'mv', n: 'MV switchgear, main electrical', w: PRG.mv.w }, { id: 'mmr1', n: 'Meet-me room 1', w: PRG.mmr.w }, { id: 'mmr2', n: 'Meet-me room 2', w: PRG.mmr.w },
    { id: 'valv', n: 'Sprinkler valve room, cylinders', w: PRG.valv.w }, { id: 'jan', n: 'Janitor (DC)', w: PRG.jan.w }, { id: 'dwc', n: 'DC staff WC, shower', w: PRG.dwc.w }, { id: 'garb', n: 'Garbage and recycling', w: PRG.garb.w }];
  const bandL = r2(aE - cw), sD = r2(P.W - Wr - cw), inBand = [], toSide = [];
  sideL.forEach(x => { const l = Math.max(x.w, x.m2 ? up1(x.m2 / sD) : 0); if (r2(sum(inBand.map(y => y.l)) + l) <= bandL + 1e-6) inBand.push(Object.assign({}, x, { l })); else toSide.push(x); });
  a = 0; inBand.forEach(x => { R2.push(sec(2, x.id, x.n, 'sroom', [[a, r2(a + x.l), r2(Wr + cw), P.W]], { prog: x.id })); a = r2(a + x.l); });
  if (bandL - a > 0.01) { if (bandL - a < 1.5 && inBand.length) { const lr = R2[R2.length - 1]; lr.r[0][1] = bandL; } else R2.push(room(2, 'fsp2', 'Unassigned (no use yet)', 'spare', 'spare', [[a, bandL, r2(Wr + cw), P.W]], { block: 'spare', dcSide: true })); }
  /* the floor over the refuge strip: NOC, offices, break room (reference sizes, J.B. 9 Nov), rooms that did not fit the band, then unassigned */
  const sideI = toSide.concat([{ id: 'noc', n: 'Security control room / NOC', w: PRG.noc.w }, { id: 'doff', n: 'DC offices (reference size)', w: PRG.doff.w, m2: PRG.doff.m2 },
    { id: 'brk', n: 'DC break room', w: PRG.brk.w, m2: PRG.brk.m2 }]);
  const dR2 = 3.0, rowL = r2(aE - 2 * cw);   /* a 3.0 m row along the secure corridor (drawing choice); the floor behind it unassigned */
  let ps = pack(sideI.concat([{ id: 'sp', w: 0, grow: true, spare: true }]), rowL, dR2), sideIt = sideI;
  if (ps.fail) { sideIt = sideI.map(x => Object.assign({}, x, { m2: null })); ps = pack(sideIt.concat([{ id: 'sp', w: 0, grow: true, spare: true }]), rowL, dR2); }
  if (ps.fail) return { fail: `storey-2 support rooms need ${ps.fail} m along the secure corridor; ${rowL} m available` };
  const Sd = place(sideIt.concat([{ id: 'srow', n: 'Unassigned (no use yet), off the secure corridor', w: 0, grow: true, spare: true }]), ps.ws, cw, r2(Wr - dR2), Wr)
    .map(x => Object.assign(x, { rr: [x.rr[2], x.rr[3], x.rr[0], x.rr[1]] }));   /* place() packs across b; here the rooms run along a */
  Sd.filter(x => x.rr[1] - x.rr[0] > 0.01).forEach(x => R2.push(x.spare ? room(2, x.id, x.n, 'spare', 'spare', [x.rr], { block: 'spare', dcSide: true }) : sec(2, x.id, x.n, 'sroom', [x.rr], { prog: x.id })));
  R2.push(room(2, 'sparehub', 'Unassigned (no use yet; no clinic), off the secure corridor', 'spare', 'spare',
    subAll([[cw, aE, 0, Wr]], [S1r, [cw, r2(aE - cw), r2(Wr - dR2), Wr], [r2(aE - cw), aE, xL, Wr]]).sort((x, y) => x[0] - y[0] || x[2] - y[2]), { block: 'spare', dcSide: true }));
  /* the rear, storey 2: shipping over the dock, staging over the vestibule and (with a drive) the bays */
  if (drive) R2.push(sec(2, 'ship', 'Shipping, receiving, storage and staging (over the entrance row and bays)', 'sroom', [[r2(aE + SW), aR0, Wb0, P.W], BB], { prog: 'ship' }));
  else { R2.push(sec(2, 'ship', 'Shipping and receiving', 'sroom', [[aE, aR0, 0, E2r[2]], BB], { prog: 'ship' }),
    sec(2, 'stag', 'Storage and staging', 'sroom', [VESr], { prog: 'ship' })); }
  /* storey 3: the hall over the hub (and the lift lobby in front of E2); the rear stays two storeys */
  const R3 = [sec(3, 'hall', 'Data hall (one storey, over the hub)', 'hall', hallR0), sec(3, 's1', 'Stair S1 (data centre)', 'score', [S1r], { core: true, stair: true }),
    sec(3, 's2', 'Stair S2 (data centre)', 'score', [S2r], { core: true, stair: true }), sec(3, 'e2', 'Freight lift E2', 'score', [E2r], { core: true, lift: true })];
  const hall = sum(hallR0.map(ra)), MW = hall / RULES.hallPerMW.v;
  const rooms = { 1: R, 2: R2, 3: R3 };
  const hubArea = sum(R.filter(x => x.block === 'hub' && !x.core && x.kind !== 'exitpas').map(x => sum(x.r.map(ra))));
  const dcArea = sum(R.filter(x => x.block === 'data centre' && x.kind !== 'bay').map(x => sum(x.r.map(ra)))) + sum(R2.filter(x => x.block === 'data centre' || x.dcSide).map(x => sum(x.r.map(ra)))) + sum(R3.map(x => sum(x.r.map(ra))));
  const H = [C.ground, RULES.storeyH.up, RULES.storeyH.hall];
  const spD = C.spanOver(0, Dend); if (!spD) return { fail: 'no width over the building depth' }; const bOrigin = C.sv < 0 ? spD[1] : spD[0];
  C.mapUV = (aa, b) => [C.uOf(C.a0 + aa), bOrigin + C.sv * b];
  const court = drive ? null : [BB[1], r2(BB[1] + RULES.aisle.w), 0, P.W];
  const truck = drive ? { court: BB, why: 'bays across the lot, open to the 6.1 m side drive (Parking By-law 5.4.1 aisle; drawing choice)' }
    : { court, why: `bays open to a 6.1 m truck court behind the building, reached from ${svcWhy} (drawing choice); route and turning not checked (?)` };
  const keeps = (drive ? [[0, aE, 0, P.W], [aE, aR0, Wb0, P.W]] : [[0, aR0, 0, P.W]]).concat([BB]).concat(court ? [court] : []).concat(drive ? [] : [[aR0, BB[1], Wd, P.W]]);
  const roofs = drive ? [[aE, BB[1], r2(P.W - bayL), P.W]] : [BB, [aE, aR0, 0, E2r[2]]];
  const plant = plantLayout(Object.assign({}, C, { keeps, lowRoof: { rs: roofs, z: r2(C.ground + RULES.storeyH.up), what: 'on the storey-2 roof at the rear' } }), P.W, Dend, MW, rooms);
  const L = { rooms, H, hall, MW, dcArea, hubArea, clin: 0, nb, nDC: nbr.nDC, nRef: nbr.nRef, nCl: 0, clinWhy: null, shared: st.shared, truck, plant, aB: aE, aC: lobD, aR: aE, dF: aE,
    kind: 'stacked', narrow: { drive, svcWhy, Wr, aE, aR0, vesT: drive ? 0.5 : r2(((Math.max(vB[0], BB[3]) + vB[1]) / 2 - vB[0]) / (vB[1] - vB[0])), overflow: P.ovf, load: P.load, refuge: P.refA, open: openR, openM2: openR ? r2(ra(openR)) : 0 }, W: P.W, Da: Dend, bOrigin,
    storeyNames: ['Hub at grade, bands back from the street; data-centre entrance rooms at the rear', 'Data-centre support over the hub; unassigned floor', 'One data-hall storey over the hub'] };
  return L;
}
/* Parking By-law 6059 row 5.2.5 Class B: one for the first 465 m², one for the next 1,860 (to 2,325), one per further 2,325; fractions to the nearest
   whole number above zero, one-half up (5.1.7; register arch_up3_vanPkg5). Was rounded up (10 Nov 2026 fix; no test lot changes: the hub caps the data centre at 2,325 m²) */
const rh517 = x => Math.max(1, Math.floor(x + 0.5));
function bays5_2_5(m2) { return m2 <= 0 ? 0 : m2 <= 465 ? 1 : m2 <= 2325 ? 2 : 2 + Math.floor((m2 - 2325) / 2325 + 0.5); }
function subR(a, b) { if (!(b[0] < a[1] - 1e-6 && b[1] > a[0] + 1e-6 && b[2] < a[3] - 1e-6 && b[3] > a[2] + 1e-6)) return [a]; const o = [];
  if (b[0] > a[0]) o.push([a[0], b[0], a[2], a[3]]); if (b[1] < a[1]) o.push([b[1], a[1], a[2], a[3]]); const m0 = Math.max(a[0], b[0]), m1 = Math.min(a[1], b[1]);
  if (b[2] > a[2]) o.push([m0, m1, a[2], b[2]]); if (b[3] < a[3]) o.push([m0, m1, b[3], a[3]]); return o.filter(r => ra(r) > 0.05).map(r => r.map(r2)); }
const subAll = (rs, cut) => cut.reduce((acc, c) => acc.flatMap(r => subR(r, c)), rs);

/* ---------- BESIDE (Edmonton BE: hall at grade behind the hub; one storey) ---------- */
function beside(C) {
  const { st, van } = C, cw = RULES.cor.w, sm = RULES.smallRoom.w, wcm = RULES.wcMod.w, pw = RULES.pexit.w;
  let sp = C.spanOver(0, Math.min(40, C.aMax)); if (!sp) return { fail: 'no buildable width' };
  let W = Math.min(r2(sp[1] - sp[0]), RULES.largeW.w), L = null;
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
        .concat(Array.from({ length: Math.max(0, 2 * nwc - 1) }, (_, i) => ({ id: 'cwc' + (i + 1), n: 'Clinic WC ' + (i + 1), w: RULES.clinicWC.w, p: 'cwc' })))
        .concat([{ id: 'cuw', n: 'Clinic universal WC', w: PRG.uwc.w, p: 'uwc' }, { id: 'cst', n: 'Clinic storage', w: PRG.cst.w, p: 'cst' }, { id: 'cspare', n: 'Unassigned (no use yet), off the clinic corridor', w: 0, grow: true, spare: true }]);
      pc = pack(cR, r2(W - bLob), dR); if (pc.fail) return { fail: `clinic back row needs ${pc.fail} m; ${r2(W - bLob)} m` };
      const est = (W - bLob) * (dF + cw + dR); const n2 = wcBload(Math.ceil(est / 9.3)); if (n2 === nwc) break; nwc = n2;
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
  const tank = MW * 1.55 * 1000 * 12 * ((typeof BD !== 'undefined' && BD.data && BD.data.equipment && BD.data.equipment.fuelLkWh) || 0.264) / Math.ceil(Q / (big ? 2 : 1));   /* 11 Nov 2026 (J.B.): fuel rate from tool/data/equipment.json (Rehlko KD2000 G5-626); was 0.263 written here */
  const tankLot = tank >= 2500 && tank <= 50000 ? 3.0 : tank < 2500 ? null : null, tankBld = tank >= 2500 ? 1.5 : null;
  const G = { l: 8.43, w: 2.62 }, T = { l: 2.49, w: 2.63 }, CH = { l: 12.14, w: 2.36, side: 1.5, end: 2.1 };
  const aP = r2(Da + RULES.aisle.w), items = [], why = [];
  /* turned (F2b): the yard beside the building also holds plant; the building and its rear aisle are kept clear, 1.5 m around (tanks to the building, CSA B139) */
  const side = !!C.maxW || !!C.keeps, Wscan = C.maxW ? (C.Wfull || W) : W;
  /* narrow (F2b 10 Nov): the yard beside the rear bays also holds plant; the building, bays and truck court kept clear, 1.5 m around */
  (C.keeps || (C.maxW ? [[0, r2(Da + RULES.aisle.w), 0, W]] : [])).forEach((bR, k) => items.push({ id: 'bld' + k, pseudo: true, r: bR, z: bR, keep: [bR[0] - 1.5, bR[1] + 1.5, bR[2] - 1.5, bR[3] + 1.5] }));
  /* candidate test in the local frame: inside the yard (and off the drive), clear of everything placed (with their keep-outs) */
  let roof = null;   /* chillers on the lower roof over the hub block when the yard cannot hold them (spec rule 1: a lower roof not over the hall) */
  const okRect = (r, keepLot) => { if (roof) return r[0] >= roof[0] - 1e-6 && r[1] <= roof[1] + 1e-6 && r[2] >= roof[2] - 1e-6 && r[3] <= roof[3] + 1e-6; for (let a = r[0]; a <= r[1] + 1e-9; a += Math.max(0.5, (r[1] - r[0]) / 6)) for (let b = r[2]; b <= r[3] + 1e-9; b += Math.max(0.5, (r[3] - r[2]) / 6)) { const [u, v] = C.mapUV(Math.min(a, r[1]), Math.min(b, r[3])); if (!C.inYard(u, v) || C.inDrive(u, v)) return false; } return true; };
  const hit = (r, s) => r[0] < s[1] - 1e-6 && r[1] > s[0] + 1e-6 && r[2] < s[3] - 1e-6 && r[3] > s[2] + 1e-6;
  const grow = (r, d) => [r[0] - d, r[1] + d, r[2] - d, r[3] + d];
  const lotDist = r => { let m = 1e9; for (const [a, b] of [[r[0], r[2]], [r[0], r[3]], [r[1], r[2]], [r[1], r[3]], [(r[0] + r[1]) / 2, r[2]], [(r[0] + r[1]) / 2, r[3]], [r[0], (r[2] + r[3]) / 2], [r[1], (r[2] + r[3]) / 2]]) { const p = C.mapUV(a, b); for (let i = 0; i < C.S.ring.length; i++) m = Math.min(m, dSeg(p, C.S.ring[i], C.S.ring[(i + 1) % C.S.ring.length])); } return m; };
  const span = r2(Math.max(40, C.aMax + 60));
  const tryPlace = (it0, aFix) => { for (const rot of (it0.rot ? [false, true] : [false])) { const it = rot ? Object.assign({}, it0, { L: it0.Wd, Wd: it0.L, zone: it0.zoneR }) : it0;
    const aS0 = roof ? roof[0] : aFix != null ? aFix : side ? 0 : aP, aS1 = roof ? roof[1] : aFix != null ? aFix : Da + span;
    for (let a = aS0; a <= aS1; a = r2(a + 0.5)) for (let b = roof ? roof[2] : -10; b <= (roof ? roof[3] : Wscan + 10); b = r2(b + 0.5)) {
      const r = [a, r2(a + it.L), b, r2(b + it.Wd)], z = it.zone ? it.zone(r) : r;
      if (!okRect(r) || (it.zone && !okRect(z))) continue;
      if (it.lot != null && lotDist(r) < it.lot - 1e-6) continue;
      if (items.some(o => !!o.roof === !!roof && (hit(z, o.keep) || hit(o.z, it.keepFor ? it.keepFor(r) : grow(r, 0)) || hit(grow(r, it.gap || 0), o.r)))) continue;
      return { r, z, rot };
    } }
    return null; };
  /* transformer pads: front row on the yard aisle (front faces the aisle, 3 m clear in front: the aisle; 1 m apart and from structures; BC Hydro ES54 F) */
  for (let i = 0; i < nT; i++) { const p = tryPlace({ L: T.l, Wd: T.w, gap: 1.0 }, side ? null : aP); if (!p) { why.push(`transformer pad ${i + 1} of ${nT}`); break; }
    items.push({ id: 't' + (i + 1), n: `Transformer pad ${i + 1}`, kind: 'pad', r: p.r, z: p.r, keep: grow(p.r, 1.0), front: 'faces the yard aisle' }); }
  /* generators at grade (FM 5-32 2.6.4.3): sets 2.0 m apart (CSA C282 6.5.1.1); tanks 1.5 m to the building, 3.0 m to lot lines (CSA B139 Table 2) */
  for (let i = 0; i < nG; i++) { const p = tryPlace({ L: G.l, Wd: G.w, gap: 2.0, lot: tankLot, rot: true }); if (!p) { why.push(`generator ${i + 1} of ${nG}`); break; }
    items.push({ id: 'g' + (i + 1), n: `Generator ${i + 1}, ${big ? '2,000' : '1,000'} kW, sub-base tank`, kind: 'gen', r: p.r, z: p.r, keep: grow(p.r, 2.0) }); }
  /* chillers (Vertiv Liebert AFC): 1.5 m on each long side, 2.1 m at each end, zones not shared (3.0 / 4.2 m between units, our reading); long axis along a, panel end to the yard aisle */
  const lowRoof = C.lowRoof || null; let onRoof = 0;
  for (let i = 0; i < nC; i++) { let p = roof ? null : tryPlace({ L: CH.l, Wd: CH.w, zone: r => [r2(r[0] - CH.end), r2(r[1] + CH.end), r2(r[2] - CH.side), r2(r[3] + CH.side)], zoneR: r => [r2(r[0] - CH.side), r2(r[1] + CH.side), r2(r[2] - CH.end), r2(r[3] + CH.end)], gap: 0, rot: true });
    if (!p && lowRoof) { for (const rr of (lowRoof.rs || [lowRoof.r])) { roof = rr; p = tryPlace({ L: CH.l, Wd: CH.w, zone: r => [r2(r[0] - CH.end), r2(r[1] + CH.end), r2(r[2] - CH.side), r2(r[3] + CH.side)], zoneR: r => [r2(r[0] - CH.side), r2(r[1] + CH.side), r2(r[2] - CH.end), r2(r[3] + CH.end)], gap: 0, rot: true }, null, true); if (p) break; } if (p) onRoof++; }
    if (!p) { why.push(`chiller ${i + 1} of ${nC}`); break; }
    items.push({ id: 'c' + (i + 1), n: `Chiller ${i + 1} (${roof ? (lowRoof.what || 'on the hub roof') + ', ' + lowRoof.z + ' m' : 'at grade'})`, kind: 'chiller', roof: !!roof, r: p.r, z: p.z, keep: p.z, panel: p.rot ? 'end toward the side (long axis across the lot: panel end to an access path ?)' : 'end toward the yard aisle' }); }
  const ok = !why.length; if (onRoof) why.length = 0;
  for (let i = items.length - 1; i >= 0; i--) if (items[i].pseudo) items.splice(i, 1);
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
  if (L.narrow) {
    /* F2b (10 Nov 2026), the narrow layout */
    const dv = L.narrow.drive;
    ext(1, 'lob', 'a0', 0.5, sW); door(1, 'lob', 'cor', 0.5); ext(1, 'ref', 'a0', 0.6, sW); door(1, 'ref', 'lob', 0.5); door(1, 'ref', 'cor', 0.9); if (by(1, 'shel')) door(1, 'shel', 'cor', 0.5);
    ext(1, 's1', 'a0', 0.5);
    ['wcw', 'wcm', 'uwc', 'sho', 'fa', 'off', 'cot', 'pmec', 'sspare'].forEach(id => { if (by(1, id)) door(1, id, 'cor', 0.5); });
    door(1, 'pas', 'cor', 0.5); if (dv) ext(1, 'pas', 'b1', 0.5); else ext(1, 'pas', 'a1', 0.5, null, 1);
    door(1, 'ves', 'e2', 0.5); door(1, 'dock', 'e2', 0.5);
    if (dv) { ext(1, 'ves', 'b1', 0.5); ext(1, 's2', 'b1', 0.5); } else { ext(1, 'ves', 'a1', L.narrow.vesT); ext(1, 's2', 'a1', 0.5); }
    const bays = R[1].filter(x => x.kind === 'bay'); if (bays.length) door(1, 'dock', bays[0].id, 0.5, 1.8);
    door(2, 's1', 'dcor', 0.5); door(2, 's2', 'dcor', 0.5); door(2, 'e2', 'dcor', 0.5);
    R[2].filter(x => x.kind === 'sroom' && x.id !== 'stag' && x.id !== 'ship' || (x.kind === 'spare' && x.dcSide)).forEach(x => door(2, x.id, 'dcor', 0.5));
    if (by(2, 'stag')) { door(2, 'stag', 'e2', 0.5); door(2, 'stag', 's2', 0.5); door(2, 'ship', 'e2', 0.5); } else { door(2, 'ship', 's2', 0.5); door(2, 'ship', 'e2', 0.5); }
    door(3, 'hall', 's1', 0.5); door(3, 'hall', 's2', 0.5); door(3, 'hall', 'e2', 0.5);
  } else if (L.kind === 'stacked') {
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
    R[2].filter(x => x.st === 2 && (x.kind === 'croom' || (x.kind === 'spare' && !x.dcSide && x.r[0][0] < L.aB - 0.01) || x.id === 'e1' || x.id === 'p1' || x.id === 'p2')).forEach(x => door(2, x.id, 'ccor', 0.5));
    door(2, 's1', 'dcor', 0.5); door(2, 's2', 'dcor', 0.5); door(2, 'e2', 'dcor', 0.5);
    R[2].filter(x => (x.kind === 'sroom' || (x.kind === 'spare' && (x.dcSide || x.r[0][0] >= L.aB - 0.01)))).forEach(x => door(2, x.id, 'dcor', 0.5));
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
  /* VBBL 3.3.1.5 (J.B. 9 Nov): a room with a load over 60 or an area over Table 3.3.1.5.-B gets a second egress doorway, on a wall it shares
     with a room or corridor on its own line (public rooms: the lobby, the public corridor or another public room), as far from its first door
     as the wall allows. Rooms of the data centre and clinic are left to the test (their layouts already give them 2 or more). */
  { const T0 = TR(); if (T0 && T0.egressDoors) {
      const G0 = { S: {}, D, city: S.city }; Object.keys(R).forEach(k => { G0.S[k] = R[k].map(x => ({ id: x.id, n: x.n, g: x.g, kind: x.kind, r: x.r, core: !!x.core, stair: !!x.stair })); });
      for (const e of T0.egressDoors(G0).filter(e => e.doors < 2 && e.group === 'A')) {
        const st = e.storey, X = by(st, e.room), d0 = D.find(d => d[0] === st && (d[1] === e.room || d[2] === e.room)); if (!X || !d0) continue;
        const have = new Set(D.filter(d => d[0] === st && (d[1] === e.room || d[2] === e.room)).map(d => d[1] === e.room ? d[2] : d[1]));
        let best = null;
        for (const Y of R[st].filter(y => y.id !== e.room && !have.has(y.id) && (y.kind === 'proom' || y.kind === 'lobby' || y.kind === 'pcor' || y.kind === 'refuge2' || (y.kind === 'pcore' && y.stair)))) {   /* F2b: a door into an exit stair counts (an exit) */
          for (const t of [0.1, 0.5, 0.9]) { const n0 = D.length; const fl = L.flags.length; door(st, e.room, Y.id, t); L.flags.length = fl; if (D.length === n0) break;
            const dn = D.pop(), dist = Math.hypot(dn[3] - d0[3], dn[4] - d0[4]); if (!best || dist > best.dist) best = { dist, d: dn }; } }
        if (best) D.push(best.d); else L.flags.push(`Egress doorways: ${X.n} needs a second door and shares no wall with a public room or corridor (?)`);
      }
      /* F2b: a large refuge or shelter whose two doors are too close: the corridor door and the street door move to opposite ends (only where the test fails) */
      if (L.kind === 'stacked') { const G1 = { S: {}, D, city: S.city }; Object.keys(R).forEach(k => { G1.S[k] = R[k].map(x => ({ id: x.id, n: x.n, g: x.g, kind: x.kind, r: x.r, core: !!x.core, stair: !!x.stair })); });
        for (const e of T0.egressDoors(G1).filter(e => e.doors >= 2 && !e.ok && e.storey === 1 && (e.room === 'ref' || (e.room === 'shel' && !L.narrow)))) {   /* narrow: the shelter has no street face */
          for (let i = D.length - 1; i >= 0; i--) { const d = D[i]; if (d[0] === 1 && (d[1] === e.room || d[2] === e.room) && (d[2] === 'cor' || d[1] === 'cor' || d[2] === 'OUT')) D.splice(i, 1); }
          door(1, e.room, 'cor', 0.06); ext(1, e.room, 'a0', 0.94, sW); } }
    } }
  L.D = D;
  /* the T-reach graph, in the local frame */
  const G = { S: {}, D, city: S.city };
  Object.keys(R).forEach(k => { G.S[k] = R[k].map(x => ({ id: x.id, n: x.n, g: x.g, kind: x.kind, r: x.r, core: !!x.core, stair: !!x.stair })); });
  L.G = G;
  const T = TR();
  if (T) { L.treach = { reach: T.tReach(G), dead: T.deadEnds(G), width: T.tWidth(G), egress: T.egressDoors ? T.egressDoors(G) : [] }; }
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
    if ((R[2] || []).some(x => x.block === 'clinic' && !x.core)) Z.push({ name: 'clinic', st: 2, ids: ids(2, x => (x.block === 'clinic' || (x.kind === 'spare' && !x.dcSide && x.r[0][0] < L.aB - 0.01)) && !x.core) });
    Z.push({ name: 'storey 2 data centre', st: 2, ids: ids(2, x => (x.block === 'data centre' || (x.kind === 'spare' && (x.dcSide || x.r[0][0] >= L.aB - 0.01))) && !x.core) });
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
  const status = TR() ? TR().judge(worst, 45, 'max', 'm') : (worst <= 45 ? 'pass' : 'fail');
  return { zone: z.name, st: z.st, worst: r2(worst), status, ok: status !== 'fail', limit: 45, path, unreached, basis: RULES.grid.why };
}
function apart(L, z) { const ex = exitsOf(L, z), R = L.rooms[z.st].filter(x => z.ids.includes(x.id));
  let a = [1e9, -1e9, 1e9, -1e9]; R.forEach(x => x.r.forEach(r => { a = [Math.min(a[0], r[0]), Math.max(a[1], r[1]), Math.min(a[2], r[2]), Math.max(a[3], r[3])]; }));
  const diag = Math.hypot(a[1] - a[0], a[3] - a[2]), need = z.pubCor ? Math.min(diag / 2, 9) : Math.max(diag / 2, 9);
  let best = null; for (let i = 0; i < ex.length; i++) for (let j = i + 1; j < ex.length; j++) { const d = Math.hypot(ex[i].u - ex[j].u, ex[i].v - ex[j].v); if (!best || d > best.d) best = { d, a: ex[i], b: ex[j] }; }
  return { zone: z.name, st: z.st, exits: ex.length, apart_m: best ? r2(best.d) : null, need_m: r2(need), status: best ? (TR() ? TR().judge(best.d, need, 'min', 'm') : (best.d >= need - 1e-6 ? 'pass' : 'fail')) : 'fail', ok: !!best && (TR() ? TR().judge(best.d, need, 'min', 'm') !== 'fail' : best.d >= need - 1e-6), rule: z.pubCor ? 'with a public corridor: ≥ min(½ diagonal, 9 m)' : '≥ max(½ diagonal, 9 m)', a: best && best.a, b: best && best.b, how: 'door to door as a stand-in (VBBL 3.4.2.3.(1), (3))' }; }
function discharges(L) { const out = [], st = L.rooms[1].filter(x => x.stair), ex = L.D.filter(d => d[0] === 1 && d[2] === 'OUT' && st.some(x => x.id === d[1]));
  for (let i = 0; i < ex.length; i++) for (let j = i + 1; j < ex.length; j++) { const p = ex[i], q = ex[j], d = Math.hypot(p[3] - q[3], p[4] - q[4]), near = p[3] <= 15 && q[3] <= 15, need = near ? 6 : 9;
    const status = TR() ? TR().judge(d, need, 'min', 'm') : (d >= need - 1e-6 ? 'pass' : 'fail');
    out.push({ a: p[1], b: q[1], d: r2(d), need, status, ok: status !== 'fail', why: near ? 'sprinklered, both within 15 m of the street: 6 m (VBBL 3.4.2.3.(4))' : '9 m (VBBL 3.4.2.3.(4))' }); }
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
    if (at) { out.base = r2(lo); out.baseAt = at; out.roof = r2(out.slab + roofRel); out.height = r2(out.roof - lo); out.hLimit = S.hLimit; out.heightStatus = S.hLimit ? (TR() ? TR().judge(out.height, S.hLimit, 'max', 'm') : (out.height <= S.hLimit + 1e-6 ? 'pass' : 'fail')) : null; out.heightOk = S.hLimit ? out.heightStatus !== 'fail' : null; out.baseWhy = RULES.base.why; let lo0 = 1e9; for (let a = 0; a <= L.Da + 1e-9; a += 1) for (let b = 0; b <= L.W + 1e-9; b += 1) { const [u, v] = L.toUV(Math.min(a, L.Da), Math.min(b, L.W)), z = zFan0(u, v); if (z != null && z < lo0) lo0 = z; } out.baseFan0 = lo0 < 1e9 ? r2(lo0) : null; }
  }
  return out; }

/* ---------- spec v2, step 1 (11 Nov 2026): the frozen board checks on the tool's own layout ----------
   The layout is handed to the ported checks in the boards' geometry format (layout frame: a from the front building line, b across):
   rooms, doors, storey heights, the lot outline and its street and lane edges, plant at grade, the truck court as data-centre ground.
   What rule sheet v1 doesn't draw yet is left out, so the checks that need it say so: plant yards and gates (step 4: yards, Q24 gates),
   kVA on the pads and the hub's own set (step 2: sizing), 2 h wall marks (step 3/4), fuel fill (step 5). Rows only; the cards don't use them yet. */
function v2Checks(L, S) {
  const H = HC(); if (!H || !L.G || !L.fromUV) return null;
  const G = { S: {}, D: L.D, H: L.H, SLAB: 0.0 };
  Object.keys(L.G.S).forEach(k => { G.S[k] = L.G.S[k].map(x => ({ id: x.id, n: x.n, g: x.g, r: x.r, core: !!x.core, stair: !!x.stair })); });
  G.LOTPOLY = S.ring.map(p => L.fromUV(p[0], p[1]));
  G.STREET_EDGES = S.edges.filter(e => e.abuts === 'street' || e.abuts === 'alley').map(e => [L.fromUV(e.a[0], e.a[1]), L.fromUV(e.b[0], e.b[1])]);
  G.PLANT = ((L.plant && L.plant.items) || []).filter(it => !it.pseudo && !it.roof).map(it => ({ id: it.id, n: it.n, r: it.r }));
  G.DCSPACE = L.truck && L.truck.court ? [L.truck.court] : [];
  if (L.truck && L.truck.court) G.COURT = L.truck.court;
  const st1 = G.S['1'] || [], van = S.city === 'van';
  const cfg = { city: S.city, code: van ? 'VBBL' : 'NBC 2023 (AE)', refuge_ids: st1.filter(x => x.g === 'pub' && /^ref/.test(x.id)).map(x => x.id),
    shelter_ids: st1.filter(x => x.g === 'pub' && /^shel/.test(x.id)).map(x => x.id), small_lot: !!(S.lotType && S.lotType[0] === 'small'), zones: L.zones || [] };
  const m = H.measureSizing(G, cfg);
  m.exits = (L.apart || []).filter(a => a.apart_m != null).map(a => [a.zone, a.apart_m, a.need_m, a.need_m, !!((L.zones || []).find(z => z.name === a.zone) || {}).pubCor]);
  m.discharges = (L.discharge || []).map(d => [d.a, d.b, d.d, d.need]);
  m.travel = (L.travel || []).map(t => [t.zone, t.worst == null ? Infinity : t.worst, t.worst == null ? (t.why || 'no exit reached') : '-']);
  m.zone_exits = (L.zones || []).map(z => [z.name].concat(H.zoneExits(G, z.st, z.ids)));
  m.nb = L.nb; m.ref = m.ref_counted;
  const area = x => x.r.reduce((a, r) => a + (r[1] - r[0]) * (r[3] - r[2]), 0), sts = Object.keys(G.S).map(Number);
  m.dc = sts.reduce((a, st) => a + G.S[st].filter(x => ['hall', 'sup'].includes(x.g) || (st > 1 && x.g === 'spare')).reduce((b, x) => b + area(x), 0), 0);
  m.gen1 = 78 - 20 * Math.log10(6.1 / 7); m.genall = m.gen1 + 10 * Math.log10(m.ngen);
  const rows = H.commonChecks(G, cfg, m);
  return { rows, cfg, notDrawn: ['plant yards and gates (step 4)', 'pad kVA labels and the hub set (step 2)', '2 h wall marks (steps 3–4)', 'fuel fill (step 5)'], version: H.version };
}

/* ---------- public entry: P → the plan shape the Architecture cards draw ---------- */
function build(P) { if (!P || !P.s || !P.s.M || !P.s.M.F) return null; const S = siteOf(P); return fromSite(S); }
function withV2(L, S) { try { L.v2 = v2Checks(L, S); } catch (e) { L.v2 = { error: String(e && e.message || e) }; } return L; }
function fromSite(S) {
  let L = layout(S.frontYard ? Object.assign({}, S, { noV2: true }) : S);
  if (S.frontYard && L.rooms) L = pushBack(S, L);
  if (L.rooms && !L.v2) withV2(L, S);
  if (!L.rooms) return { version: RULES.version, rules: RULES, storeys: [], flags: L.flags, exitSep: [], programs: [], entrances: [], hub: L };
  return toPlan(L, S);
}
/* F8 (10 Nov 2026, flag A.front==='yard'; SPEC_NOTE_front_public_yard, gate passed 10 Nov): the hub against the plant yard. The deepest thing the first pass drew
   (rooms, truck court, plant and its clear zones) sets how far back the whole hub can move; it is re-laid out there (the lot's width can change with
   depth). The largest move, 1 m less at a time, that still fits at the same MW is kept. A front public yard where the move is ≥ 6 m (J.B. 10 Nov). */
function pushBack(S, L) {
  const ends = [L.Da || 0];
  Object.values(L.rooms).forEach(rs => rs.forEach(x => x.r.forEach(r => ends.push(r[1]))));
  if (L.truck && L.truck.court) ends.push(L.truck.court[1]);
  if (L.plant) L.plant.items.filter(it => !it.pseudo).forEach(it => { ends.push(it.r[1]); if (it.z && !it.roof) ends.push(it.z[1]); });
  const used = Math.max(...ends), room = Math.floor((L.site.aFull - used) * 2) / 2;
  if (room < 0.5) { L.frontYard = { depth: 0, why: 'the hub already reaches the rear yard line' }; return L; }
  /* the largest move that keeps the same hub: the full move first, then halving to 0.5 m (assumes a smaller move fits where a larger one does) */
  const nF = X => ((X.treach && X.treach.reach) || []).length + (X.travel || []).filter(t => t.status === 'fail').length;
  const ok = X => X.rooms && X.kind === L.kind && !!X.narrow === !!L.narrow && (X.ladder && X.ladder.step) === (L.ladder && L.ladder.step) && JSON.stringify(X.variant && X.variant.flags) === JSON.stringify(L.variant && L.variant.flags) && nF(X) <= nF(L) && Math.abs(X.MW - L.MW) <= 0.01;   /* same MW (J.B. 10 Nov: same building, moved) */
  const tryS = sh => layout(Object.assign({}, S, { frontShift: sh, noV2: true }));
  let best = null; { const Lh = tryS(room); if (ok(Lh)) best = [room, Lh]; }
  if (!best) { let lo = 0, hi = room;   /* bisection on a 0.5 m grid: lo always fits (0 = the first pass), hi does not */
    while (hi - lo > 0.5 + 1e-9) { let mid = Math.round(lo + hi) / 2; if (mid <= lo) mid = r2(lo + 0.5); if (mid >= hi) mid = r2(hi - 0.5); const Lm = tryS(mid); if (ok(Lm)) { lo = mid; best = [mid, Lm]; } else hi = mid; } }
  for (const [sh, L2] of best ? [best] : []) {
    {   /* the same hub moved back: same kind, narrow or not, ladder step and variant; no new T-reach finding or travel fail; same MW */ const d = r2(sh), pub = d >= 6, worst = Math.max(0, ...(L2.travel || []).filter(t => /hub/.test(t.zone)).map(t => t.worst || 0));
      L2.frontYard = { depth: d, m2: Math.round(d * (L2.W || 0)), public: pub, hubToStreet: worst ? r2(worst + d) : null, used: r2(used), aFull: L.site.aFull };
      L2.flags.push(pub ? `Front public yard (F8, J.B.’s gate 10 Nov 2026): the hub moved ${d} m back against the plant yard; about ${L2.frontYard.m2} m² in front of the hub, ${d} m deep. The lobby, refuge and stair S1 street doors open onto the yard; from the hub’s exits to the street is ${d} m further across it` + (worst ? ` (worst hub travel ${worst} m to an exit, about ${r2(worst + d)} m to the street)` : '') + `; step-free across the yard and its grades not checked (?); maximum front setback not read (?); noise at the yard not checked (?); covered beds and heated paths fed by data-centre heat (J.B. gate 10 Nov; figures ? until the heat cascade research)`
        : `Front yard ${d} m deep (under 6 m: a deeper front yard, not a public yard; F8)`);
      if (S.sideDrive) L2.flags.push('Front public yard: the side drive runs beside it: fence or kerb between them (spec note rule 4; not drawn ?)');
      return L2; } }
  L.frontYard = { depth: 0, why: `moving the hub back by even 0.5 m (of ${room} m) changes the hub (its fit, layout, MW or a check); left at the front` };
  L.flags.push(`F8 flag: the hub stays at the front: ${L.frontYard.why}`); return L; }
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
  const exitSep = L.apart.map(z => ({ block: z.zone, stairs: `${z.exits} exits`, apart_m: z.apart_m, need_m: z.need_m, status: z.status, ok: z.ok, how: z.how + '; ' + z.rule, a: z.a ? Object.assign({}, z.a, { uv: toUV(z.a.u, z.a.v) }) : null, b: z.b ? Object.assign({}, z.b, { uv: toUV(z.b.u, z.b.v) }) : null, st: z.st }));
  L.travel.forEach(t => { if (t.path) t.pathUV = t.path.map(p => toUV(p[0], p[1])); });
  if (L.plant) L.plant.items.forEach(it => { it.rect = R2uv(it.r); it.zoneUV = R2uv(it.z); });
  if (L.truck) { L.truck.courtUV = R2uv(L.truck.court); }
  const programs = [];
  const T = L.treach, flags = L.flags.slice();
  if (L.plant && !L.plant.ok) flags.push('Plant: ' + L.plant.why);
  if (T) (T.egress || []).filter(e => !e.ok).forEach(e => flags.push(`Egress doorways: ${e.name} (storey ${e.storey}) needs 2, ${e.doors < 2 ? 'has ' + e.doors : e.apart_m + ' m apart, needs ' + e.need_m + ' m'} (${e.why}; VBBL 3.3.1.5)`));
  { /* J.B. 9 Nov (CODE_LEVEL_RULE_2026-11-09.md): results within 0.5 m (or 5 %) of a limit: tight, check in design (not re-planned) */
    const tg = [];
    (L.travel || []).filter(t => t.status === 'tight').forEach(t => tg.push(`travel, ${t.zone} ${t.worst} m of 45 m`));
    (L.apart || []).filter(z => z.status === 'tight').forEach(z => tg.push(`exits apart, ${z.zone} ${z.apart_m} m, needs ${z.need_m} m`));
    (L.discharge || []).filter(d => d.status === 'tight').forEach(d => tg.push(`exterior discharges ${d.a}–${d.b} ${d.d} m, needs ${d.need} m`));
    if (T) (T.dead || []).filter(c => c.status === 'tight').forEach(c => tg.push(`dead end, storey ${c.storey} ${c.corridor} ${c.deadEnd_m} m of 6 m`));
    if (T) (T.width.rows || []).filter(r => r.sev === 'tight').forEach(r => tg.push(`width, ${r.name} ${r.width_m} m of ${r.min_m} m`));
    if (T) (T.egress || []).filter(e => e.status === 'tight').forEach(e => tg.push(`egress doorways, ${e.name} ${e.apart_m} m apart, needs ${e.need_m} m`));
    if (L.grades && L.grades.heightStatus === 'tight') tg.push(`height ${L.grades.height} m of ${L.grades.hLimit} m`);
    if (tg.length) flags.push('Tight, check in design (within 0.5 m or 5 % of the limit, J.B. 9 Nov): ' + tg.join('; '));
  }
  if (L.kind === 'stacked') flags.push('Section: ground storey, 4.0 m support storey, one hall storey: the spec’s height-capped section, drawn on every lot by the hub cap (J.B. 8 Nov)');
  if (L.grades && L.grades.heightOk === false) flags.push(`Not built yet: ${L.grades.height} m is over the ${L.grades.hLimit} m limit even with the height-capped section; a lower section is not built (?)`);
  if (L.kind === 'stacked' && !L.narrow) flags.push('Refuge at 50 people, the minimum; the ground floor behind the hub stays the data-centre entrance row and covered truck court (J.B. 8 Nov)');
  if (L.capW) flags.push(`Hub cap (2,325 m² of data centre, J.B. 8 Nov): at its smallest depth the building was still over the cap, so it narrows from ${L.capW.from} m to ${L.capW.to} m wide; the rest of the land stays open (drawing choice, 10 Nov 2026)`);
  if (L.narrow) { const n = L.narrow;
    flags.push(`Narrow lot (F2b, 10 Nov 2026): the hub bands run back from the street (refuge strip ${n.Wr} m | public corridor | service strip), the data-centre entrance and ${L.nb} bays at the rear; ${n.drive ? 'the corridor ends in an exit passage to the side drive' : 'an exit passage (2 h) runs from the corridor along the lot line to the truck court'} (drawing choices, as the 1330 Glen Dr and 8238 Fraser St hand fits)`);
    flags.push(`Refuge ${n.refuge} m² (${Math.floor(n.refuge / 3.5)} people at 3.5 m²), held at the spec size (J.B. 10 Nov); washrooms for a load of ${n.load} (refuge and shelter, Table 3.7.2.2.-A)` + (n.overflow.length ? `; ${n.overflow.join(', ')} moved into a pocket of the refuge strip on the corridor` : ''));
    if (n.open) flags.push(`Open ground at grade beside the corridor, ${n.openM2} m², not built (spare floor at grade, J.B. 10 Nov); storey 2 is drawn over it, so it is a covered open area: whether it stays covered is not decided (?)`);
    flags.push('No clinic on a narrow lot: no second separate exit fits (spec Part 6); the floor over the hub is data-centre support and unassigned floor');
    flags.push('Hall over the hub only; the rear (entrance row and bays) is two storeys, chillers on its roof (spec rule 1: a lower roof not over the hall)');
    if (!n.drive) flags.push(`Truck court behind the building, open to the sky, reached from ${n.svcWhy}; the route from that street to the court and truck turning are not checked (?)`); }
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

const api = { build, fromSite, siteOf, layout, RULES, PRG, wcA, wcB, wcBload };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
if (root) { root.BD = root.BD || {}; root.BD.hub = api; }
})(typeof window !== 'undefined' ? window : null);
