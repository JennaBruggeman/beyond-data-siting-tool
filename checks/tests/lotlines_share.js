// LOTLINES (4 Nov 2026), part 3: lot-line classes on a sample of lots in every data-centre zone (tool/data/zones.json), both cities, with the same
// functions the tool uses (tool/lotside.js lotEdges + classify). Per zone up to PER lots, evenly spread over all lots of that zone with an assessment
// record. Reports the share of lot lines (and of edges) classed front, flank, rear, side, unclear, and the share of lots with any unclear line; Edmonton
// also the share of edges whose abutment is unknown (no zone on the lot behind, or nothing found). Edmonton outlines are Altalis (local only, academic
// use): only counts leave this script. Usage: node checks/tests/lotlines_share.js [PER=30] [outJson]
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..'), TOOL = path.join(ROOT, 'tool');
const LSF = require(path.join(TOOL, 'lotside.js'));
const LSD = JSON.parse(fs.readFileSync(path.join(TOOL, 'data/lotside.json'), 'utf8')), ZON = JSON.parse(fs.readFileSync(path.join(TOOL, 'data/zones.json'), 'utf8'));
const LINES = { cornerDeg: LSD.lines.cornerDeg.v };
const PER = +process.argv[2] || 30, OUT = process.argv[3] || null;
function decode(a, ox, oy, q) { const r = new Float64Array(a.length); let x = 0, y = 0; for (let i = 0; i < a.length / 2; i++) { x += a[2 * i]; y += a[2 * i + 1]; r[2 * i] = ox + x / q; r[2 * i + 1] = oy + y / q; } return r; }
function bbox(r) { let a = 1e9, b = 1e9, c = -1e9, d = -1e9; for (let i = 0; i < r.length; i += 2) { a = Math.min(a, r[i]); b = Math.min(b, r[i + 1]); c = Math.max(c, r[i]); d = Math.max(d, r[i + 1]); } return [a, b, c, d]; }
function area(r) { let s = 0; for (let i = 0, j = r.length - 2; i < r.length; j = i, i += 2) s += (r[j] + r[i]) * (r[j + 1] - r[i + 1]); return Math.abs(s / 2); }
function run(city) {
  const D = path.join(TOOL, 'tiles', city), meta = JSON.parse(fs.readFileSync(path.join(D, 'meta.json'))), q = meta.Q;
  const ST = JSON.parse(fs.readFileSync(path.join(TOOL, 'streets_' + city + '.json'))); const cache = new Map(), REC = {};
  const tile = k => { if (cache.has(k)) return cache.get(k); let t = null; try { t = JSON.parse(fs.readFileSync(path.join(D, 't_' + k + '.json'))); } catch (e) { cache.set(k, null); return null; }
    const [ox, oy] = t.o, par = []; Object.assign(REC, t.A);
    if (city === 'van') for (const [id, a] of (t.P || [])) { const r = decode(a, ox, oy, q); par.push({ id, ids: [id], r, bb: bbox(r) }); }
    else { try { const l = JSON.parse(fs.readFileSync(path.join(D, 'l_' + k + '.json'))); const [lx, ly] = l.o; l.L.forEach(([a, ids], n) => { const r = decode(a, lx, ly, q); par.push({ id: 'L' + k + '_' + n, ids, r, bb: bbox(r) }); }); } catch (e) {} }
    const T = { par }; cache.set(k, T); return T; };
  const zc = rec => rec ? String((city === 'edm' ? (rec[2] || rec[1]) : rec[1]) || '').trim().split(/\s+/)[0].toUpperCase() : null;
  const want = new Set(Object.keys(city === 'van' ? ZON.ZV : ZON.ZE).map(z => z.split(' ')[0].replace(/^I-2B$/, 'I-2')));
  const keys = meta.tiles.map(t => t[0] + '_' + t[1]); keys.forEach(tile);
  // J.B. 4 Nov 2026: a parcel with no zone on record takes its zone from the City zoning map (Edmonton; meta.json overview, register edmZoningGeo)
  const OV = city === 'edm' ? (meta.overview || []).map(([zi, a]) => { const r = decode(a, 0, 0, q); return { zi, r, bb: bbox(r) }; }) : [];
  const pip = (x, y, r) => { let c = false; for (let i = 0, j = r.length - 2; i < r.length; j = i, i += 2) { const xi = r[i], yi = r[i + 1], xj = r[j], yj = r[j + 1]; if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) c = !c; } return c; };
  const zoneAt = OV.length ? (x, y) => { for (const o of OV) { const b = o.bb; if (x < b[0] || x > b[2] || y < b[1] || y > b[3]) continue; if (pip(x, y, o.r)) return String(meta.zones[o.zi] || '').trim().split(/\s+/)[0].toUpperCase() || null; } return null; } : null;
  const cand = {}; const seen = new Set();
  for (const k of keys) { const T = tile(k); if (!T) continue; for (const p of T.par) { const rec = p.ids.map(i => REC[i]).find(Boolean); if (!rec) continue; const z = zc(rec); if (!want.has(z)) continue;
      if (seen.has(p.id)) continue; seen.add(p.id); if (area(p.r) < 50) continue; (cand[z] = cand[z] || []).push({ k, p, rec }); } }
  const res = { zones: {}, lots: 0, lines: {}, edges: {}, lotsUnclear: 0, lotsNoStreet: 0, edgesUnAbut: 0, lotsUnAbut: 0, edgesAll: 0, corner: 0, dbl: 0, unclearWhy: {} };
  for (const z of [...want].sort()) { const C = cand[z] || []; const n = Math.min(PER, C.length), pick = []; for (let i = 0; i < n; i++) pick.push(C[Math.floor(i * C.length / n)]);
    const Z = res.zones[z] = { available: C.length, sampled: n, lines: {}, lotsUnclear: 0 };
    for (const { k, p } of pick) { const [ti, tj] = k.split('_').map(Number), parcels = [];
      for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) { const t2 = tile((ti + dx) + '_' + (tj + dy)); if (!t2) continue;
        for (const o of t2.par) { if (o.bb[2] < p.bb[0] - 40 || o.bb[0] > p.bb[2] + 40 || o.bb[3] < p.bb[1] - 40 || o.bb[1] > p.bb[3] + 40) continue; const r2 = o.ids.map(i => REC[i]).find(Boolean) || null;
          parcels.push({ r: o.r, bb: o.bb, zone: zc(r2), rec: !!r2, own: city === 'van' ? o.id === p.id : o === p }); } }
      const E = LSF.lotEdges(p.r, { city, streets: ST, parcels, classMap: LSD.classes[city], zoneAt }), K = LSF.classify(E, city, LINES);
      res.lots++; if (K.corner) res.corner++; if (K.dbl) res.dbl++; if (!K.lines.some(l => l.street)) res.lotsNoStreet++;
      for (const l of K.lines) { res.lines[l.kind] = (res.lines[l.kind] || 0) + 1; Z.lines[l.kind] = (Z.lines[l.kind] || 0) + 1; res.edges[l.kind] = (res.edges[l.kind] || 0) + l.e.length; }
      for (const l of K.lines) if (l.kind === 'unclear') { const w = l.why.replace(/ \(.*$/, ''); res.unclearWhy[w] = (res.unclearWhy[w] || 0) + 1; }
      if (K.unclear) { res.lotsUnclear++; Z.lotsUnclear++; }
      if (city === 'edm') { let u = 0; for (const e of E) { res.edgesAll++; if (!e.street && !e.nbr.length) { res.edgesUnAbut++; u++; } } if (u) res.lotsUnAbut++; } } }
  return res; }
const pc = (a, b) => (100 * a / Math.max(1, b)).toFixed(1) + ' %', out = {};
for (const city of ['van', 'edm']) { const R = out[city] = run(city); const tl = Object.values(R.lines).reduce((a, b) => a + b, 0), te = Object.values(R.edges).reduce((a, b) => a + b, 0);
  console.log(`${city}: ${R.lots} lots; lot lines ${tl}: ` + ['front', 'flank', 'rear', 'side', 'unclear'].map(k => `${k} ${pc(R.lines[k] || 0, tl)}`).join(', ') + `; edges ${te}: ` + ['front', 'flank', 'rear', 'side', 'unclear'].map(k => `${k} ${pc(R.edges[k] || 0, te)}`).join(', '));
  console.log(`  lots with any unclear line ${pc(R.lotsUnclear, R.lots)}; no street found ${pc(R.lotsNoStreet, R.lots)}; corner ${pc(R.corner, R.lots)}; double fronting ${pc(R.dbl, R.lots)}` + (city === 'edm' ? `; edges abutting no zoned lot and no street ${pc(R.edgesUnAbut, R.edgesAll)} (lots with any ${pc(R.lotsUnAbut, R.lots)})` : ''));
  console.log('  unclear lines by reason: ' + JSON.stringify(R.unclearWhy));
  for (const [z, Z] of Object.entries(R.zones)) console.log(`  ${z}: ${Z.sampled} of ${Z.available}; with unclear ${Z.lotsUnclear}; ` + JSON.stringify(Z.lines)); }
if (OUT) fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
