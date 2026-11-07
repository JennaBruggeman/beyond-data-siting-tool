// Ground sweep (WORKLIST 3, 7 Nov 2026): the lighter run. For every lot in a data-centre zone: the ground the one-rectangle fit leaves unused, the lot's
// length and width, and whether Architecture's Ratios finds any size at all. No 3D (three.js, jspdf and fonts are not loaded), no screenshots, several
// pages in parallel, one lot after another on each page. Read-only: it changes nothing in the repo.
// Usage (from checks/tests/, tool served on :8766): NODE_PATH=<node_modules with playwright> node sweep_ground.js <out.jsonl> [N=lots] [W=pages]
//   env CITY=van|edm (default both), LOTS=<id,id> to run named lots only, MIN=<lot m², default 0>
// Output: one JSON line per lot (ids, zone, areas in m², MW). Edmonton lot outlines are Altalis data (academic use only): the output stays out of git;
// only aggregate counts and distributions may be reported.
const fs = require('fs'), path = require('path');
const NM = (process.env.NODE_PATH || '').split(path.delimiter)[0];
const { chromium } = require('playwright');
const ROOT = path.join(__dirname, '..', '..'), TILES = path.join(ROOT, 'tool', 'tiles');
const Z = JSON.parse(fs.readFileSync(path.join(ROOT, 'tool', 'data', 'zones.json'), 'utf8'));
const zoneKey = (city, a) => city === 'van' ? String(a[1] || '').trim() : String(a[2] || a[1] || '').trim().split(/\s+/)[0].toUpperCase();
function lots() { const out = [], want = process.env.LOTS ? new Set(process.env.LOTS.split(',')) : null;
  for (const city of (process.env.CITY ? [process.env.CITY] : ['van', 'edm'])) { const rows = city === 'van' ? Z.ZV : Z.ZE;
    for (const f of fs.readdirSync(path.join(TILES, city)).filter(f => /^t_-?\d+_-?\d+\.json$/.test(f))) {
      const t = JSON.parse(fs.readFileSync(path.join(TILES, city, f), 'utf8')), tile = f.slice(2, -5);
      for (const [id, a] of Object.entries(t.A || {})) { const k = zoneKey(city, a); if (!rows[k]) continue; if (want && !want.has(id)) continue; out.push({ city, tile, id, zone: k }); } } }
  return out; }
(async () => {
  const outF = process.argv[2] || 'sweep_ground.jsonl', N = +(process.argv[3] || 0), W = +(process.argv[4] || 4);
  let L = lots(); if (N) L = L.slice(0, N);
  const done = new Set(fs.existsSync(outF) ? fs.readFileSync(outF, 'utf8').split('\n').filter(Boolean).map(l => { try { const j = JSON.parse(l); return j.city + ':' + j.id; } catch (e) { return ''; } }) : []);
  L = L.filter(x => !done.has(x.city + ':' + x.id)); console.log('lots to run', L.length, '(already done', done.size + ')');
  const b = await chromium.launch(); let next = 0; const t0 = Date.now();
  async function worker(w) { const p = await b.newPage({ viewport: { width: 1280, height: 800 } }); let errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.route(/three|OrbitControls|jspdf|autotable|fonts\.(googleapis|gstatic)|d3/, r => r.abort());
    await p.addInitScript(() => { try { localStorage.setItem('bd-tier', 'arch'); } catch (e) {} });
    await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForTimeout(5000);
    await p.evaluate(() => { const w = document.getElementById('welcome'); if (w) w.remove(); });
    while (next < L.length) { const x = L[next++], ts = Date.now(); errs = [];
      let r; try { r = await p.evaluate(async (x) => { const A = BD.S.answers; for (const k of Object.keys(A)) delete A[k]; Object.assign(A, { built: 'new', extent: 'whole', floor: '' });
          BD.arch.ratio = null; BD.arch.picks = []; if (BD.S.city !== x.city) await BD.setCity(x.city, true); await BD.select({ city: x.city, tile: x.tile, id: x.id, quiet: true });
          BD.modelReset(); let M = BD.model(); if (!M || !M.F) return { skip: 'no model' };
          const ar = r => r && r.length >= 6 ? BD.area(r) : 0, Zm = M.Z || {};
          const base = { lot: M.lotArea, len: M.F.L, wid: M.F.W, zoneOK: !Zm.assumed && !Zm.notAllowed, existing: !!M.existing };
          try { await BD.views.arat(); } catch (e) { base.ratErr = String(e.message || e).slice(0, 120); }
          M = BD.model(); const P = M.plant || {}, yard = P.yard ? ar(BD.clipYards ? BD.clipYards(M, P.yard) : P.yard) : 0;
          const build = M.inset ? ar(BD.buildArea(M)) : M.lotArea, rect = M.hallRoom || 0, strip = M.loading ? ar(M.loading) : 0, r0 = BD.arch.ratio || {};
          return Object.assign(base, { build, rect, yard, strip, dock: M.loadInside ? M.loadInside.m2 : 0, unused: Math.max(0, build - rect - yard - strip), mw: r0.mw || 0, dc: r0.dc || 0,
            gens: P.placed ? P.placed.gy : null, miss: (P.miss || []).length, truck: P.truck ? P.truck.type : null, bigYard: P.bigYard || 0,
            reach: (M.edgeYards || []).some(e => (e.abuts === 'street' || e.abuts === 'alley') && e.kind !== 'front'), yardD: M.plantYardDepth || 0 }); }, x); }
      catch (e) { r = { err: String(e.message || e).slice(0, 160) }; }
      const row = Object.assign({ city: x.city, tile: x.tile, id: x.id, zone: x.zone, ms: Date.now() - ts, errs: errs.length }, r);
      for (const k of ['lot', 'len', 'wid', 'build', 'rect', 'yard', 'strip', 'dock', 'unused']) if (typeof row[k] === 'number') row[k] = Math.round(row[k] * 10) / 10;
      fs.appendFileSync(outF, JSON.stringify(row) + '\n');
      if (next % 50 === 0) console.log(next, 'of', L.length, Math.round((Date.now() - t0) / 1000) + ' s'); }
    await p.close(); }
  await Promise.all(Array.from({ length: Math.max(1, W) }, (_, w) => worker(w)));
  await b.close(); console.log('done', L.length, 'lots in', Math.round((Date.now() - t0) / 1000), 's'); })().catch(e => { console.error(e); process.exit(1); });
