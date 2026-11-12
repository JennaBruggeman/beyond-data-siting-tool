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
/* accepted by J.B. (11 Nov 2026): shapely leaves one inside corner of the 339 refuge's fire-wall inset unrounded where its outline starts (library quirk) */
const ACCEPTED = [['v339', 'clear', '1|ref ']];
const accepted = (fit, d) => ACCEPTED.some(([f, c, w]) => f === fit && d.check === c && d.what.startsWith(w));
/* the answer key: the 11b boards (Claude Link eh/ic37/) */
const IC37DIR = process.env.BD_IC37 || 'C:/Users/bangp/Desktop/Claude Link/eh/ic37';
const IC37 = { v339: 'TestFit_EH_V339.dc.html', v1330: 'TestFit_EH_V1330.dc.html', v1353: 'TestFit_EH_V1353.dc.html', v1360: 'TestFit_EH_V1360.dc.html',
  v8238_mid: 'TestFit_EH_V8238_Outright.dc.html',   /* the Outright board is the mid variant (geom_mid.py); geom.py has no ic37 board */
  v8980: 'TestFit_EH_V8980.dc.html', e06b: 'TestFit_EH_E06B.dc.html', e10003: 'TestFit_EH_E10003.dc.html',
  e10004: 'TestFit_EH_E10004.dc.html', e14715: 'TestFit_EH_E14715.dc.html', e15231: 'TestFit_EH_E15231.dc.html', e16075: 'TestFit_EH_E16075.dc.html', e4103: 'TestFit_EH_E4103.dc.html' };
const unesc = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&amp;/g, '&');
function boardRows(p) {
  if (!fs.existsSync(p)) return null;
  const t = fs.readFileSync(p, 'utf8'), out = [], re = /<tr><td[^>]*>([^<]*)<\/td><td[^>]*><div[^>]*>([\s\S]*?)<\/div><div[^>]*>([\s\S]*?)<\/div>/g; let m;
  const strip = x => unesc(x.replace(/<[^>]+>/g, '')).trim();
  while ((m = re.exec(t))) out.push([strip(m[1]), strip(m[2]), strip(m[3])]);
  return out;
}
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
  /* ---- EH-FREEZE-2026-11-11b: sizing to load, hub set, battery cabinets, room minimums ---- */
  out.sizing = [0, 0]; out.audit = [0, 0]; out.rows = [0, 0]; out.board = [0, 0];
  if (R.m && R.cfg) {
    const m = H.measureSizing(G, R.cfg);
    const cmp = (a, b, p) => {
      if (typeof a === 'number' && typeof b === 'number') { if (Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(a))) out.sizing[0]++; else diff('sizing', p, a, b); return; }
      if (Array.isArray(a) && Array.isArray(b)) { if (a.length !== b.length) diff('sizing', p, a, b); else a.forEach((x, i) => cmp(x, b[i], p + '[' + i + ']')); return; }
      if (a && typeof a === 'object' && b && typeof b === 'object') { for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) cmp(a[k], b[k], p + '.' + k); return; }
      if (a === b || (a == null && b == null)) out.sizing[0]++; else diff('sizing', p, a, b);
    };
    for (const k of Object.keys(R.m)) cmp(R.m[k], m[k], k);
    /* every audit_geom call the board made */
    for (const a of R.audit) {
      const S = {}; for (const st of a.storeys) S[String(st)] = G.S[String(st)];
      const js = H.auditGeom(S, a.name, a.fold), byId = new Map(js.map(r => [r.st + '|' + r.id, r]));
      for (const r of a.rows) {
        const j = byId.get(r.st + '|' + r.id), keys = ['A', 'A_centre', 'Acount', 'w', 'L', 'issue', 'kind', 'basis', 'note'];
        const bad = !j ? ['missing'] : keys.filter(k => norm(JSON.stringify(r[k])) !== norm(JSON.stringify(j[k])));
        if (!bad.length) out.audit[0]++; else diff('audit', `${a.name}/${a.fold} ${r.st}|${r.id} ${r.n}: ${bad.join(',')}`, bad.map(k => r[k]), j ? bad.map(k => j[k]) : null);
      }
    }
    /* the four rows, against the board's own rows and against the ic37 board (the answer key) */
    const FN = { _sizing_row: () => H.sizingRow(G, R.cfg, m), _hubset_row: () => H.hubsetRow(G, R.cfg, m), _battery_row: () => H.batteryRow(G, R.cfg, m), _width_row: () => H.widthRow(G, R.cfg) };
    const ic = IC37[fit] ? boardRows(path.join(IC37DIR, IC37[fit])) : null;
    for (const [k, py] of Object.entries(R.rows)) {
      const j = FN[k]();
      if (j[0] === py[0] && j[1] === py[1] && j[3] === py[3]) out.rows[0]++; else diff('rows', k + ' (vs the board run)', [py[0], py[3]], [j[0], j[3]]);
      if (ic) { const b = ic.find(r => r[1] === j[1]); if (b && b[0] === j[0] && b[2] === j[3] + ' · ' + j[2]) out.board[0]++;   /* a board row prints text · source */ else diff('board', k + ' (vs ic37)', b ? [b[0], b[2]] : 'row not on the ic37 board', [j[0], j[3]]); }
    }
    /* the re-run reproduces the ic37 board, every row */
    if (ic && R.board_rows) {
      const a = JSON.stringify(R.board_rows), b = JSON.stringify(ic);
      if (a === b) out.board[0]++; else { const n = Math.max(ic.length, R.board_rows.length); for (let i = 0; i < n; i++) if (JSON.stringify(ic[i]) !== JSON.stringify(R.board_rows[i])) { diff('board', 're-run vs ic37 row ' + i, ic[i] || null, R.board_rows[i] || null); break; } }
    }
  }
  res[fit] = out; out.accepted = out.diffs.filter(d => accepted(fit, d)); out.diffs = out.diffs.filter(d => !accepted(fit, d)); const bad = out.diffs.length; totalBad += bad;
  console.log(fit.padEnd(10), ['reach', 'yard', 'route', 'portal', 'clear', 'sizing', 'audit', 'rows', 'board'].map(k => `${k} ${out[k][0]}${out[k][1] ? '/' + out[k][1] + ' DIFF' : ''}`).join('  '));
}
fs.writeFileSync(path.join(__dirname, 'port_test_result.json'), JSON.stringify(res, null, 1));
console.log((totalBad ? `${totalBad} differences (port_test_result.json)` : 'all match') + `; accepted: ${Object.values(res).reduce((n, o) => n + ((o.accepted || []).length), 0)} (339 refuge corner)`);
process.exit(totalBad ? 1 : 0);
