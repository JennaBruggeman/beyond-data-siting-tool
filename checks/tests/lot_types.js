// Code job A1 (CODE_JOB_A1_lot_types.md, 7 Nov 2026): lot measures for every lot in a zone where a data centre is permitted, conditional or
// discretionary (tool/data/zones.json ZV, ZE, and the 573ace3 zone rule: I-3 sub-area B is not allowed). Read-only: no Ratios, no 3D, no result changes.
// Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node lot_types.js <out.jsonl> [W=pages]   env CITY=van|edm, LOTS=<id,id>
// Output: one JSON line per lot, ids and measures only. No lot geometry is written (Edmonton outlines are Altalis data; public repo).
// Every measure comes from the tool's own model (site.js model(): lot frame F, lotside.js edge classes in m.edgeYards, yard lines, inscribe):
//   part_area_m2 = the part of a multi-part lot the frame, edges and Arrange use (BD.area(M.ring); area = the tool's full lot area, every part);
//   frontage_m = edges classed front; n_street_edges = edges abutting a street (lanes not counted); lane = any edge abutting a lane;
//   depth_m, width_m = frame L, W (L runs from the front end to the rear end); bbox_m2 = L × W (the frame is the lot's bounding rectangle);
//   buildable_m2 = inside the yard lines (m.yardLine, before the I-2/I-3 61 m depth limit); buildable_cap_m2 = the tool's buildable polygon with that limit;
//   buildable_w_m, buildable_d_m = the largest rectangle inside the yard lines, in the lot frame (site.js inscribe, as Arrange uses it);
//   height_m = the height the zone allows outright (Z.hOutright; heightMax = the most with the City's approval); ground/upper storey = tool/data/arch.json storeyMin (I-3 only; blank elsewhere).
const fs = require('fs'), path = require('path');
const NM = (process.env.NODE_PATH || '').split(path.delimiter)[0];
const { chromium } = require('playwright');
const ROOT = path.join(__dirname, '..', '..'), TILES = path.join(ROOT, 'tool', 'tiles');
const Z = JSON.parse(fs.readFileSync(path.join(ROOT, 'tool', 'data', 'zones.json'), 'utf8'));
const SM = JSON.parse(fs.readFileSync(path.join(ROOT, 'tool', 'data', 'arch.json'), 'utf8')).storeyMin || {};
const zoneKey = (city, a) => city === 'van' ? String(a[1] || '').trim() : String(a[2] || a[1] || '').trim().split(/\s+/)[0].toUpperCase();
const status = (city, k) => { const r = (city === 'van' ? Z.ZV : Z.ZE)[k] || {}, c = (r.cl || []).find(x => /data centre/i.test(x[0])); const t = c ? c[1] : '';
  return /discretionary/i.test(t) ? 'discretionary' : /conditional/i.test(t) ? 'conditional' : /permitted/i.test(t) ? 'permitted' : '?'; };
let READ = { van: 0, edm: 0 };
function lots() { const out = [], want = process.env.LOTS ? new Set(process.env.LOTS.split(',')) : null;
  for (const city of (process.env.CITY ? [process.env.CITY] : ['van', 'edm'])) { const rows = city === 'van' ? Z.ZV : Z.ZE;
    for (const f of fs.readdirSync(path.join(TILES, city)).filter(f => /^t_-?\d+_-?\d+\.json$/.test(f))) {
      const t = JSON.parse(fs.readFileSync(path.join(TILES, city, f), 'utf8')), tile = f.slice(2, -5);
      for (const [id, a] of Object.entries(t.A || {})) { READ[city]++; const k = zoneKey(city, a); if (!rows[k]) continue; if (want && !want.has(id)) continue;
        out.push({ city, tile, id, zone: k, status: status(city, k), addr: a[0] }); } } }
  return out; }
async function newPage(b) { const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  await p.route(/three|OrbitControls|jspdf|autotable|fonts\.(googleapis|gstatic)|d3/, r => r.abort());
  await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForTimeout(5000);
  await p.evaluate(() => { const w = document.getElementById('welcome'); if (w) w.remove(); }); return p; }
const measure = async (p, x) => p.evaluate(async (x) => { const A = BD.S.answers; for (const k of Object.keys(A)) delete A[k]; Object.assign(A, { built: 'new', extent: 'whole', floor: '' });
  if (BD.S.city !== x.city) await BD.setCity(x.city, true); await BD.select({ city: x.city, tile: x.tile, id: x.id, quiet: true });
  BD.modelReset(); const M = BD.model(); if (!M || !M.F) return { skip: 'no model' };
  const ar = g => g && g.length >= 6 ? BD.area(g) : 0, E = M.edgeYards || [], F = M.F, G = BD.siteGeo;
  const lb = ring => { let a = 1e9, b = -1e9, c = 1e9, d = -1e9; for (let i = 0; i < ring.length; i += 2) { const [u, v] = F.toL(ring[i], ring[i + 1]); a = Math.min(a, u); b = Math.max(b, u); c = Math.min(c, v); d = Math.max(d, v); } return [a, b, c, d]; };
  const yr = M.yardRect ? lb(M.yardRect) : (M.inset ? lb(M.inset) : null); let q = null; try { if (yr) q = G.inscribe(F, M.ring, yr[0], yr[1], yr[2], yr[3], true, M.edgeYards); } catch (e) {}
  /* corner by angle, for comparison with the job sheet's edge count: street edges whose directions differ by 45° or more (one street drawn as several segments is one line) */
  const dirOf = e => Math.atan2(e.by - e.ay, e.bx - e.ax), st = E.filter(e => e.abuts === 'street'); let cornerAngle = false; for (let i = 0; i < st.length; i++) for (let j = i + 1; j < st.length; j++) { let d = Math.abs(dirOf(st[i]) - dirOf(st[j])) % Math.PI; d = Math.min(d, Math.PI - d); if (d >= Math.PI / 4) cornerAngle = true; }
  /* street lines (Cowork, A1 gate): street edges merged when they meet end to end within 30°, or lie on one line (within 10° and 3 m) */
  const par = st.map((_, i) => i), fd = i => par[i] === i ? i : (par[i] = fd(par[i])), adiff = (a, b) => { let d = Math.abs(dirOf(a) - dirOf(b)) % Math.PI; return Math.min(d, Math.PI - d); };
  const near = (a, b) => [[a.ax, a.ay], [a.bx, a.by]].some(([x, y]) => [[b.ax, b.ay], [b.bx, b.by]].some(([X, Y]) => Math.hypot(x - X, y - Y) < 0.5));
  const offs = (a, b) => { const dx = a.bx - a.ax, dy = a.by - a.ay, l = Math.hypot(dx, dy) || 1; return Math.abs(((b.ax + b.bx) / 2 - a.ax) * dy - ((b.ay + b.by) / 2 - a.ay) * dx) / l; };
  for (let i = 0; i < st.length; i++) for (let j = i + 1; j < st.length; j++) { const d = adiff(st[i], st[j]); if ((near(st[i], st[j]) && d < Math.PI / 6) || (d < Math.PI / 18 && offs(st[i], st[j]) < 3)) par[fd(i)] = fd(j); }
  const nLines = new Set(st.map((_, i) => fd(i))).size;
  const streetFrontage = E.filter(e => e.abuts === 'street').reduce((t, e) => t + (e.len || 0), 0);
  return { partArea: BD.area(M.ring), nLines, cornerAngle, streetLen: streetFrontage, frontStreet: E.filter(e => e.kind === 'front' && e.abuts === 'street').length, area: M.lotArea, frontage: E.filter(e => e.kind === 'front').reduce((t, e) => t + (e.len || 0), 0), nStreet: E.filter(e => e.abuts === 'street').length,
    lane: E.some(e => e.abuts === 'alley'), depth: F.L, width: F.W, build: M.yardLine ? ar(M.yardLine) : (M.inset ? ar(BD.buildArea(M)) : M.lotArea), buildCap: M.inset ? ar(BD.buildArea(M)) : null,
    bw: q ? q[3] - q[2] : null, bd: q ? q[1] - q[0] : null, height: M.Z ? M.Z.hOutright : null, heightMax: M.Z && M.Z.hx ? M.Z.hx[1] : null, subB: !!(M.Z && M.Z.notAllowed === 'subB'), zoneAssumed: !!(M.Z && M.Z.assumed),
    existing: !!M.existing, unclear: E.filter(e => e.kind === 'unclear').length, edges: E.length, noYardLine: !M.yardLine }; }, x);
(async () => {
  const outF = process.argv[2] || 'lot_types.jsonl', W = +(process.argv[3] || 4);
  let L = lots(); console.log('lots read', JSON.stringify(READ), 'in data-centre zones', L.length);
  fs.writeFileSync(outF + '.read.json', JSON.stringify(READ));
  const done = new Set(fs.existsSync(outF) ? fs.readFileSync(outF, 'utf8').split('\n').filter(Boolean).map(l => { try { const j = JSON.parse(l); return j.err ? '' : j.city + ':' + j.id; } catch (e) { return ''; } }) : []);
  L = L.filter(x => !done.has(x.city + ':' + x.id)); console.log('to run', L.length);
  const b = await chromium.launch(); let next = 0; const t0 = Date.now();
  async function worker() { let p = await newPage(b);
    while (next < L.length) { const x = L[next++]; let r = null;
      for (let tr = 0; tr < 2 && !r; tr++) { try { r = await measure(p, x); } catch (e) { const m = String(e.message || e); if (tr) r = { err: m.slice(0, 160) }; try { await p.close(); } catch (e2) {} p = await newPage(b); } } /* a crashed page is replaced and the lot tried once more */
      const sm = x.city === 'van' ? SM[x.zone] : null;
      fs.appendFileSync(outF, JSON.stringify(Object.assign({ city: x.city, id: x.id, tile: x.tile, zone: x.zone, status: x.status, addr: x.addr, ground: sm ? sm.ground : null, upper: sm ? sm.above : null }, r)) + '\n');
      if (next % 250 === 0) console.log(next, 'of', L.length, Math.round((Date.now() - t0) / 1000) + ' s'); } }
  await Promise.all(Array.from({ length: W }, () => worker())); await b.close(); console.log('done', Math.round((Date.now() - t0) / 1000) + ' s');
})().catch(e => { console.error(e); process.exit(1); });
