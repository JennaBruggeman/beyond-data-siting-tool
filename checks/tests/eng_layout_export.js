// Milestone 1 section C (J.B. 12 Nov 2026): the Engineering geometry export for the report's layout page (Claude Link reports/eng_layout.py schema)
// and the top receivers, ranked by cost of heat. Opens the tool headless, the Engineering viewer on the example lot (Vancouver 339 1st Ave E;
// the tool's own Engineering set-up, the size search as the cards run it), and writes Claude Link/reports/eng_<lot>_layout.json:
//   lot, building {rect, storeys, height, hall_floors}, yard, loading, units [{type, rect, level, label}], hall {rect, racks: [], rack_count, rooms: []},
//   top_receivers [{rank, building, distance_m, heat_taken, cost_per_MWh, status}], sample: false, source.
// Metres in the site model's lot frame (site.js F.toL). Racks and hall rooms: the tool holds counts, not positions (scene3d.js layoutCheck): racks [] (?).
// Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node eng_layout_export.js <outdir> [van|edm]
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const { chromium } = require('playwright');
(async () => {
  const out = process.argv[2], city = process.argv[3] || 'van', key = city === 'van' ? 'V339' : 'E64AIRPORT';
  const commit = execSync('git rev-parse --short HEAD', { cwd: __dirname }).toString().trim();
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl'] }); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:8766/index.html?nointro&x=' + Date.now()); await p.waitForSelector('#f1'); await p.waitForTimeout(2500);
  await p.evaluate(() => BD.f1.viewer('engineering')); await p.waitForTimeout(4000);
  if (city === 'edm') { await p.click('#f1v [data-city="edm"]'); await p.waitForTimeout(6000); }
  { const kf = await p.evaluate(() => [...document.querySelectorAll('#f1v [data-to]')].findIndex(b => /What fits/.test(b.textContent))); await p.click(`#f1v [data-to="${kf}"]`); await p.waitForTimeout(9000); }   /* the rack layout check runs with this card */
  const L = await p.evaluate(async () => { const M = await BD.f1cards.eng(), F = M.F, toL = (X, Y) => F.toL(X, Y).map(v => Math.round(v * 100) / 100);
    const pts = r => { const o = []; for (let i = 0; i < r.length; i += 2) o.push(toL(r[i], r[i + 1])); return o; };
    const rect = r => { const q = pts(r); return [Math.min(...q.map(a => a[0])), Math.max(...q.map(a => a[0])), Math.min(...q.map(a => a[1])), Math.max(...q.map(a => a[1]))]; };
    const lc = BD.scene3d && BD.scene3d.layoutCheck ? BD.scene3d.layoutCheck() : null, nF = Array.isArray(M.nF) ? M.nF[1] : M.nF;
    const typ = n => /generator/i.test(n) ? 'genset' : /transformer|pad/i.test(n) ? 'transformer' : /chill|cool|dry|tower/i.test(n) ? 'chiller' : /ups/i.test(n) ? 'ups' : /batter/i.test(n) ? 'battery' : null;
    const TAG = { genset: 'G', transformer: 'T', chiller: 'C', ups: 'U', battery: 'B' }, cnt = {}, units = [];
    for (const bx of (M.plant && M.plant.boxes) || []) { const t = typ(bx.name || ''); if (!t) continue; cnt[t] = (cnt[t] || 0) + 1; units.push({ type: t, rect: rect(bx.ring), level: bx.base > 0.5 ? 'roof' : 'grade', label: TAG[t] + cnt[t], name: bx.name }); }
    const bld = rect(M.foot);
    return { lot: pts(M.ring), sample: false, building: { rect: bld, storeys: nF, height: M.H, hall_floors: lc ? lc.floors : null },
      yard: M.plant && M.plant.yard ? pts(M.plant.yard) : [], loading: [M.loading ? rect(M.loading) : null].concat((M.loadSpaces || []).map(rect)).filter(Boolean),
      units, hall: { rect: bld, racks: [], rack_count: lc && lc.floors ? Math.round(lc.placed / lc.floors) : null, rack_count_all: lc ? lc.placed : null, racks_needed: lc ? lc.need : null, rooms: [] },
      mw: M.mwSized,
      notes: [M.plant && M.plant.indoor ? 'cooling plant: in an enclosed plant room (the noise measure the set-up needs), not drawn as units' : (M.plant && (M.plant.coolRoof || M.plant.coolYard) ? null : 'cooling plant: no units placed in this set-up (?)'),
        'transformer pads: the Engineering model counts them but does not place them on the lot (?)', 'racks and the UPS and battery rooms: counts only; the tool does not keep their positions (?)'].filter(Boolean) }; });
  /* the receivers: the "Who could take it" card's table, ranked by cost of heat */
  const n = await p.evaluate(() => document.querySelectorAll('#f1v [data-to]').length);
  const k = await p.evaluate(() => [...document.querySelectorAll('#f1v [data-to]')].findIndex(b => /Who could take it/.test(b.textContent)));
  await p.click(`#f1v [data-to="${k}"]`); await p.waitForTimeout(8000);
  const rec = await p.evaluate(() => [...document.querySelectorAll('#f1v table tbody tr')].map(tr => [...tr.querySelectorAll('td')].map(td => td.innerText.trim())).filter(r => r.length >= 6));
  const num = s => { const m = /-?[\d,]+(\.\d+)?/.exec(String(s).replace(/–.*/, '')); return m ? +m[0].replace(/,/g, '') : null; };
  const top = rec.map(r => ({ building: r[1], distance: r[2], heat_taken: r[3], cost_per_MWh: r[4], status: r[5], _c: num(r[4]) }))
    .sort((a, b) => (a._c == null) - (b._c == null) || (a._c || 0) - (b._c || 0)).map((r, i) => { const { _c, ...o } = r; return Object.assign({ rank: i + 1 }, o); });
  L.top_receivers = top; L.top_receivers_basis = 'the Engineering "Who could take it" card: the nearest buildings with a known heat demand, ranked here by the cost of heat ($/MWh, low end of the range); air cooling picked by default, so the $/MWh is for liquid cooling, as the card labels it';
  L.source = `the tool's own layout (Beyond Data site-f1 ${commit}): site.js model (lot, footprint, plant boxes, loading), scene3d.js layoutCheck (racks: counts, not positions); exported by checks/tests/eng_layout_export.js`;
  fs.mkdirSync(out, { recursive: true }); const f = path.join(out, `eng_${key}_layout.json`); fs.writeFileSync(f, JSON.stringify(L, null, 1));
  console.log(f, '| units', L.units.length, '| receivers', top.length, '| MW', L.mw); await b.close(); })();
