// Build 2 (3 Nov 2026), part 3: the share of lots where each lot-side fact is found (tool/lotside.js, the same functions the tool uses).
// For every lot with an assessment record: a street found beside it (any side), a street at an end of its frame (after turning the frame as site.js does),
// an Edmonton road class (not 'unclassified'), and a neighbouring lot in a residential zone. Vancouver: City parcel outlines; Edmonton: Altalis lot
// outlines (local only, academic use). Usage: node checks/tests/lotside_share.js [van|edm] [maxLots]
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..'), TOOL = path.join(ROOT, 'tool');
const LSF = require(path.join(TOOL, 'lotside.js'));
const LSD = JSON.parse(fs.readFileSync(path.join(TOOL, 'data/lotside.json'), 'utf8'));
// frameOf and hull, taken from site.js so the frame is the tool's own
const SITE = fs.readFileSync(path.join(TOOL, 'site.js'), 'utf8');
const grab = n => { const i = SITE.indexOf('function ' + n + '('); let d = 0, j = SITE.indexOf('{', i); for (; j < SITE.length; j++) { if (SITE[j] === '{') d++; else if (SITE[j] === '}') { d--; if (!d) break; } } return SITE.slice(i, j + 1); };
const frameOf = new Function(grab('hull') + '\n' + grab('frameOf') + '\nreturn frameOf;')();
function decode(a, ox, oy, q) { const r = new Float64Array(a.length); let x = 0, y = 0; for (let i = 0; i < a.length / 2; i++) { x += a[2 * i]; y += a[2 * i + 1]; r[2 * i] = ox + x / q; r[2 * i + 1] = oy + y / q; } return r; }
function bbox(r) { let a = 1e9, b = 1e9, c = -1e9, d = -1e9; for (let i = 0; i < r.length; i += 2) { a = Math.min(a, r[i]); b = Math.min(b, r[i + 1]); c = Math.max(c, r[i]); d = Math.max(d, r[i + 1]); } return [a, b, c, d]; }
function area(r) { let s = 0; for (let i = 0, j = r.length - 2; i < r.length; j = i, i += 2) s += (r[j] + r[i]) * (r[j + 1] - r[i + 1]); return Math.abs(s / 2); }
function run(city, maxLots) {
  const D = path.join(TOOL, 'tiles', city), meta = JSON.parse(fs.readFileSync(path.join(D, 'meta.json'))), q = meta.Q;
  const ST = JSON.parse(fs.readFileSync(path.join(TOOL, 'streets_' + city + '.json')));
  const cache = new Map(), REC = {};
  const tile = k => { if (cache.has(k)) return cache.get(k); let t = null; try { t = JSON.parse(fs.readFileSync(path.join(D, 't_' + k + '.json'))); } catch (e) { cache.set(k, null); return null; }
    const [ox, oy] = t.o, par = []; Object.assign(REC, t.A);
    if (city === 'van') for (const [id, a] of (t.P || [])) { const r = decode(a, ox, oy, q); par.push({ id, ids: [id], r, bb: bbox(r) }); }
    else { try { const l = JSON.parse(fs.readFileSync(path.join(D, 'l_' + k + '.json'))); const [lx, ly] = l.o; l.L.forEach(([a, ids], n) => { const r = decode(a, lx, ly, q); par.push({ id: 'L' + k + '_' + n, ids, r, bb: bbox(r) }); }); } catch (e) {} }
    const T = { par }; cache.set(k, T); return T; };
  const zc = rec => rec ? String((city === 'edm' ? (rec[2] || rec[1]) : rec[1]) || '').trim().split(/\s+/)[0].toUpperCase() : null;
  const isRes = z => !z ? false : city === 'edm' ? (LSD.edmResidential.part2.includes(z) || LSD.edmResidential.special.includes(z)) : LSD.vanResidential.prefix.some(p => z.startsWith(p));
  const keys = meta.tiles.map(t => t[0] + '_' + t[1]); const N = { lots: 0, street: 0, streetEnd: 0, rotated: 0, classKnown: 0, alley: 0, res: 0, resBE: 0, nBE: 0 };
  const seen = new Set();
  for (const k of keys) { const T = tile(k); if (!T) continue; const [ti, tj] = k.split('_').map(Number); const nb = [];
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) { const t2 = tile((ti + dx) + '_' + (tj + dy)); if (t2) nb.push(t2); }
    // Vancouver: a lot is every part with the same id; the largest part is the one the tool sizes on
    const lots = new Map(); for (const p of T.par) { const rec = p.ids.map(i => REC[i]).find(Boolean); if (!rec) continue; const key = city === 'van' ? p.id : p.id; if (seen.has(key)) continue; const a = area(p.r); if (a < 50) continue; const o = lots.get(key); if (!o || a > o.a) lots.set(key, { p, a, rec }); }
    for (const [key, { p, rec }] of lots) { if (maxLots && N.lots >= maxLots) break; seen.add(key);
      const parcels = []; for (const t2 of nb) for (const o of t2.par) { if (o.bb[2] < p.bb[0] - 40 || o.bb[0] > p.bb[2] + 40 || o.bb[3] < p.bb[1] - 40 || o.bb[1] > p.bb[3] + 40) continue; const r2 = o.ids.map(i => REC[i]).find(Boolean) || null;
        parcels.push({ r: o.r, bb: o.bb, zone: zc(r2), rec: !!r2, own: city === 'van' ? o.id === p.id : o === p }); }
      const E = LSF.lotEdges(p.r, { city, streets: ST, parcels, classMap: LSD.classes[city] }); let F = frameOf(p.r), S = LSF.assign(E, F);
      const has = k2 => !!S[k2].street; N.lots++;
      if (!has('u0') && !has('u1') && (has('v0') || has('v1'))) { const o = F, ux = -o.uy, uy = o.ux; S = LSF.assign(E, { ux, uy }); N.rotated++; }
      const sides = ['u0', 'u1', 'v0', 'v1'].map(k2 => S[k2]);
      if (sides.some(s => s.street)) N.street++; if (S.u0.street || S.u1.street) N.streetEnd++;
      if (sides.some(s => s.street && s.street.cls !== 'unclassified')) N.classKnown++; if (sides.some(s => s.alley)) N.alley++;
      const res = sides.some(s => s.nbr.some(isRes)); if (res) N.res++; if (zc(rec) === 'BE') { N.nBE++; if (res) N.resBE++; } }
    if (maxLots && N.lots >= maxLots) break; }
  const pc = v => (100 * v / Math.max(1, N.lots)).toFixed(1) + ' %';
  console.log(city, JSON.stringify(N)); console.log(`  street found beside the lot ${pc(N.street)}; at an end of its frame ${pc(N.streetEnd)} (frame turned for ${pc(N.rotated)}); street class known ${pc(N.classKnown)}; alley or lane ${pc(N.alley)}; residential neighbour ${pc(N.res)}${N.nBE ? `; BE lots ${N.nBE}, residential neighbour on ${N.resBE}` : ''}`);
  return N; }
const which = process.argv[2] ? [process.argv[2]] : ['van', 'edm'], max = +process.argv[3] || 0; const out = {};
for (const c of which) out[c] = run(c, max);
if (process.env.OUT) fs.writeFileSync(process.env.OUT, JSON.stringify(out, null, 1));
