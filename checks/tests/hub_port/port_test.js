/* JS port (tool/hubchecks.js) against the frozen Python (Claude Link eh/, EH-FREEZE-2026-11-11), on every hub board.
   Reference: checks/tests/hub_port/ref/<fit>.json from capture_ref.py (the geometry each board's checks saw, and the scripts' results).
   Compared: reach (every finding: rule, room, message), yardgate (gates, doors, vehicle gates: status, widths, lengths, reasons),
   dcspace.route (every call the board made: result and reason), portal, clear sizes (every room: clear area, 0.05 m cells, widest square).
   Messages are compared after one normalization: Python writes 7.0 where JS writes 7 (JSON keeps no int/float difference).
   Usage: node port_test.js [fit ...]   Writes port_test_result.json beside it. */
const H = require('../../../tool/hubchecks.js'), fs = require('fs'), path = require('path');
const REF = path.join(__dirname, 'ref');
const only = process.argv.slice(2);
const norm = s => String(s).replace(/(\d)\.0(?!\d)/g, '$1');
const res = {}; let totalBad = 0;
for (const f of fs.readdirSync(REF).filter(f => f.endsWith('.json')).sort()) {
  const fit = f.replace('.json', ''); if (only.length && !only.includes(fit)) continue;
  const R = JSON.parse(fs.readFileSync(path.join(REF, f), 'utf8')), G = R.geom, out = { reach: [0, 0], yard: [0, 0], route: [0, 0], portal: [0, 0], clear: [0, 0], diffs: [] };
  if (!G) { res[fit] = { error: 'no geometry captured' }; continue; }
  const diff = (k, what, py, js) => { out[k][1]++; out.diffs.push({ check: k, what, py, js }); };
  /* reach */
  for (const r of R.reach) {
    const js = H.reach(G, { serves: r.serves }).out.map(o => norm(o[0] + ' | ' + (o[1] ? o[1].join(',') : '-') + ' | ' + o[2])).sort();
    const py = r.out.map(o => norm(o[0] + ' | ' + (o[1] ? o[1].join(',') : '-') + ' | ' + o[2])).sort();
    const a = new Set(js), b = new Set(py);
    py.forEach(x => a.has(x) ? out.reach[0]++ : diff('reach', 'finding only in Python', x, null));
    js.forEach(x => { if (!b.has(x)) diff('reach', 'finding only in JS', null, x); });
    if (!py.length && !js.length) out.reach[0]++;
  }
  /* yardgate */
  for (const y of R.yardgate) {
    let j; try { j = H.yardgate(G); } catch (e) { diff('yard', 'JS error', null, e.message); continue; }
    const key = { gates: g => [norm(JSON.stringify(g.gate)), g.status, g.width, norm(g.why || '')], doors: d => [norm(JSON.stringify(d.door)), d.status, d.length == null ? null : d.length, d.length_1_6 == null ? null : d.length_1_6, norm(d.why || '')], vgates: v => [v.route, v.status, v.uncovered_m, norm(v.why || '')] };
    for (const k of Object.keys(key)) {
      const P = (y[k] || []).map(key[k]).map(x => JSON.stringify(x)).sort(), J = (j[k] || []).map(key[k]).map(x => JSON.stringify(x)).sort();
      const n = Math.max(P.length, J.length);
      for (let i = 0; i < n; i++) { if (P[i] === J[i]) out.yard[0]++; else diff('yard', k, P[i] || null, J[i] || null); }
    }
  }
  /* routes */
  for (const c of R.route) {
    const [st, u, v, o, avoid, extra, start] = c.args;
    const j = H.dcRoute(G, st, u, v, o, { avoid_truck: avoid, extra_block: extra || [], start });
    if (j[0] === c.out[0] && norm(j[1]) === norm(c.out[1])) out.route[0]++; else diff('route', JSON.stringify(c.args).slice(0, 120), c.out, j);
  }
  /* portal */
  for (const p of R.portal) { const j = H.portal(G); if (j[0] === p[0] && norm(j[1]) === norm(p[1]) && j[2] === p[2]) out.portal[0]++; else diff('portal', 'row', p, j); }
  /* clear sizes */
  for (const [k, c] of Object.entries(R.clear)) {
    const [st, id] = [k.split('|')[0], k.split('|').slice(1).join('|')], rooms = G.S[st] || [], x = rooms.find(z => z.id === id);
    if (!x) { diff('clear', k, 'room', 'missing in geometry'); continue; }
    const g = H.clearGeom(x, rooms, +st), w = Math.round(H.maxSquare(g.cells) * 100) / 100;
    const py = new Set(c.cells); let only1 = 0, only2 = 0; for (const z of g.cells) if (!py.has(z)) only2++; for (const z of py) if (!g.cells.has(z)) only1++;
    const okA = Math.abs(g.area - c.area) <= 0.01, okW = Math.abs(w - c.w) < 1e-9, okC = !only1 && !only2;
    if (okA && okW && okC) out.clear[0]++;
    else diff('clear', k + ' ' + x.n, { area: +c.area.toFixed(3), w: c.w, cells: c.n_cells }, { area: +g.area.toFixed(3), w, cells: g.cells.size, onlyPy: only1, onlyJs: only2 });
  }
  res[fit] = out; const bad = out.diffs.length; totalBad += bad;
  console.log(fit.padEnd(10), ['reach', 'yard', 'route', 'portal', 'clear'].map(k => `${k} ${out[k][0]}${out[k][1] ? '/' + out[k][1] + ' DIFF' : ''}`).join('  '));
}
fs.writeFileSync(path.join(__dirname, 'port_test_result.json'), JSON.stringify(res, null, 1));
console.log(totalBad ? `${totalBad} differences (port_test_result.json)` : 'all match');
process.exit(totalBad ? 1 : 0);
