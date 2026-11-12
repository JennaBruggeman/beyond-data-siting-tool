/* The hub's failure tests (fixbatch_tests.py 155, ic20_yardgate_tests.py 19) replayed on tool/hubchecks.js: every call the suites made
   into a ported check (ref_tests/calls.json from capture_tests.py), run again in JS on the same input, result compared with the Python's.
   Usage: node port_tests_replay.js   Writes ref_tests/replay_result.json. */
const H = require('../../../tool/hubchecks.js'), fs = require('fs'), path = require('path');
if (process.env.BD_FREEZE === '11c') H.setPadRule('11c');   /* test against the 11c boards (ic39) */
const C = JSON.parse(fs.readFileSync(path.join(__dirname, 'ref_tests', 'calls.json'), 'utf8').replace(/Infinity/g, '1e999'));   /* Python writes Infinity; JSON has no such token (no room or text holds the word) */
const norm = s => String(s).replace(/(\d)\.0(?!\d)/g, '$1');
const J = x => norm(JSON.stringify(x));
const tally = {}, diffs = [], skipped = {};
const T = (fn, ok, info) => { tally[fn] = tally[fn] || [0, 0]; tally[fn][ok ? 0 : 1]++; if (!ok) diffs.push(Object.assign({ fn }, info)); };
const near = (a, b) => typeof a === 'number' && typeof b === 'number' ? Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a)) : J(a) === J(b);
const deep = (a, b) => { if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every((x, i) => deep(x, b[i])); if (a && b && typeof a === 'object' && typeof b === 'object') return [...new Set([...Object.keys(a), ...Object.keys(b)])].every(k => deep(a[k], b[k])); return near(a, b); };
for (const c of C) {
  const fn = c.fn, G = c.geom, a = c.args || [], kw = c.kw || {};
  try {
    if (fn === 'reach.run') {
      const js = H.reach(G, { serves: c.serves }).out.map(o => J([o[0], o[1], o[2]])).sort(), py = c.out[0].map(o => J([o[0], o[1], o[2]])).sort();
      T(fn, J(js) === J(py), { suite: c.suite, py: py.filter(x => !js.includes(x)), js: js.filter(x => !py.includes(x)) });
    } else if (fn === 'yardgate.check') {
      let j; try { j = H.yardgate(G); } catch (e) { T(fn, c.out === undefined, { suite: c.suite, js: 'error ' + e.message }); continue; }
      const key = { gates: g => [J(g.gate), g.status, g.width, norm(g.why || '')], doors: d => [J(d.door), d.status, d.length == null ? null : d.length, d.length_1_6 == null ? null : d.length_1_6, norm(d.why || '')], vgates: v => [v.route, v.status, v.uncovered_m, norm(v.why || '')] };
      const P = k => (c.out[k] || []).map(key[k]).map(x => JSON.stringify(x)).sort(), Q = k => (j[k] || []).map(key[k]).map(x => JSON.stringify(x)).sort();
      const ok = ['gates', 'doors', 'vgates'].every(k => J(P(k)) === J(Q(k)));
      T(fn, ok, { suite: c.suite, py: ok ? null : ['gates', 'doors', 'vgates'].map(P), js: ok ? null : ['gates', 'doors', 'vgates'].map(Q) });
    } else if (fn === 'dcspace.route') {
      const [st, u, v, o, ...rest] = a, opt = { avoid_truck: rest.length > 0 ? rest[0] : (kw.avoid_truck !== undefined ? kw.avoid_truck : true), extra_block: rest.length > 1 ? rest[1] : (kw.extra_block || []), start: rest.length > 2 ? rest[2] : (kw.start || null) };
      const j = H.dcRoute(G, st, u, v, o, opt); T(fn, j[0] === c.out[0] && norm(j[1]) === norm(c.out[1]), { suite: c.suite, py: c.out, js: j });
    } else if (fn === 'portal.check') {
      const j = H.portal(G); T(fn, j[0] === c.out[0] && norm(j[1]) === norm(c.out[1]) && j[2] === c.out[2], { suite: c.suite, py: c.out, js: j });
    } else if (fn === 'hubload.load') {
      const j = H.hubLoad(G, a[0]); T(fn, deep(c.out, j), { suite: c.suite, py: c.out, js: j });
    } else if (fn === 'audit_rooms.audit_geom') {
      if (c.clear_flag === false) { skipped[fn + ' (CLEAR = False: centreline sizes, not ported)'] = (skipped[fn + ' (CLEAR = False: centreline sizes, not ported)'] || 0) + 1; continue; }
      const name = a.length > 0 ? a[0] : (kw.name || ''), fold = a.length > 1 ? a[1] : (kw.fold || '');
      const js = H.auditGeom(c.S, name, fold), keys = ['st', 'id', 'A', 'A_centre', 'Acount', 'w', 'L', 'issue', 'kind', 'basis', 'note'];
      const pick = r => keys.map(k => r[k]), ok = J(c.out.map(pick)) === J(js.map(pick));
      T(fn, ok, { suite: c.suite, py: ok ? null : c.out.map(pick).filter((r, i) => J(r) !== J(pick(js[i] || {}))), js: ok ? null : js.map(pick).filter((r, i) => J(r) !== J(pick(c.out[i] || {}))) });
    } else if (fn === 'audit_rooms.clear_geom') {
      if (c.clear_flag === false) continue;
      const g = H.clearGeom(c.x, c.rooms, c.st), py = new Set(c.out.cells);
      const ok = Math.abs(g.area - c.out.area) <= 0.01 && g.cells.size === py.size && [...g.cells].every(z => py.has(z));
      T(fn, ok, { suite: c.suite, room: c.x.id, py: [c.out.area, py.size], js: [g.area, g.cells.size] });
    } else if (fn.startsWith('sizing.')) {
      const name = fn.split('.')[1], M = { gens: H.gens, transformers: H.transformers, switch_margin: H.switchMargin, hub_tank: H.hubTank, hub_set: H.hubSet, batt_cabinets: H.battCabinets, batt_room: H.battRoom, kd300_lh: H.kd300lh }[name];
      const args = a.slice(); if (name === 'gens') { args[1] = args[1] !== undefined ? args[1] : (kw.hub_kw || 0); args[2] = args[2] !== undefined ? args[2] : (kw.size !== undefined ? kw.size : null); }
      if (name === 'batt_cabinets' && args.length < 2 && kw.minutes) args[1] = kw.minutes;
      const j = M(...args); T(fn, deep(c.out, j), { suite: c.suite, args, py: c.out, js: j });
    } else if (fn === 'tfboard._st') {
      const [ok_, margin, rel, limit] = [a[0], a[1], a.length > 2 ? a[2] : (kw.rel || false), a.length > 3 ? a[3] : (kw.limit !== undefined ? kw.limit : null)];
      const j = H.st_(ok_, margin, rel, limit), st = typeof j === 'object' ? j.st : j, over = typeof j === 'object' ? j.over : null;
      T(fn, st === c.out[0] && near(over, c.out[1]), { suite: c.suite, args: a, py: c.out, js: [st, over] });
    } else if (fn === 'tfboard._width_row') {
      if (c.clear_flag === false) { skipped[fn + ' (CLEAR = False: centreline sizes, not ported)'] = (skipped[fn + ' (CLEAR = False: centreline sizes, not ported)'] || 0) + 1; continue; }
      const j = H.widthRow(G, c.cfg); T(fn, j[0] === c.out[0] && j[3] === c.out[3], { suite: c.suite, py: [c.out[0], c.out[3]], js: [j[0], j[3]] });
    } else if (['tfboard._sizing_row', 'tfboard._hubset_row', 'tfboard._battery_row'].includes(fn)) {
      const f = { _sizing_row: H.sizingRow, _hubset_row: H.hubsetRow, _battery_row: H.batteryRow }[fn.split('.')[1]];
      const j = f(G, c.cfg, c.m); T(fn, j[0] === c.out[0] && j[3] === c.out[3], { suite: c.suite, py: [c.out[0], c.out[3]], js: [j[0], j[3]] });
    } else if (fn === 'deadend.corridors') {
      const js = H.corridors(G, { strict: c.strict }).map(r => r.slice(0, 6)), py = c.out.map(r => r.slice(0, 6)); T(fn, deep(py, js), { suite: c.suite, py, js });
    } else if (fn === 'egress2.check') { const js = H.egress2(G).map(r => r.slice()); T(fn, J(js) === J(c.out), { suite: c.suite, py: c.out, js });
    } else if (fn === 'egress3.check') { const js = H.egress3(G); T(fn, J(js) === J(c.out), { suite: c.suite, py: c.out, js });
    } else if (fn === 'walkload.check') { const js = H.walkload(G); T(fn, deep(c.out, js), { suite: c.suite, py: c.out, js });
    } else if (fn === 'sep2h.walls') { const js = Object.fromEntries([...H.sep2hWalls(G, c.cfg)].map(([k, v]) => [String(k), v])); T(fn, deep(c.out, js), { suite: c.suite, py: c.out, js });
    } else if (fn === 'sep2h.text') { const js = H.sep2hText(G, c.cfg); T(fn, J(js) === J(c.out), { suite: c.suite, py: c.out, js });
    } else if (fn === 'padcheck.analyse') { const js = H.padAnalyse(G), py = c.out && c.out.map(d => { const o = Object.assign({}, d); delete o.front; return o; }); T(fn, deep(py, js), { suite: c.suite, py, js });
    } else if (fn === 'padcheck.bond_row') { const js = H.bondRow(G, a[0]); T(fn, J(js) === J(c.out), { suite: c.suite, py: c.out, js });
    } else if (fn === 'intakes.row') { const js = H.intakeRow(G, c.cfg, (c.m === null && a.length > 1) ? a[1] : 'VBBL'); T(fn, J(js) === J(c.out), { suite: c.suite, py: c.out, js });
    } else if (fn === 'fuelfill.check') { const js = H.fuelFill(G); T(fn, J(js) === J(c.out), { suite: c.suite, py: c.out, js });
    } else if (fn === 'tfboard.zone_exits') { const js = H.zoneExits(G, a[0], a[1]); T(fn, J(js) === J(c.out), { suite: c.suite, py: c.out, js });
    } else if (fn === 'tfboard._egress_row' || fn === 'tfboard._area_row' || fn === 'tfboard._walk_row') {
      const f = { 'tfboard._egress_row': H.egressRow, 'tfboard._area_row': H.areaRow, 'tfboard._walk_row': H.walkRow }[fn]; const js = fn === 'tfboard._area_row' && c.e3rows ? f(G, c.cfg, c.e3rows) : f(G, c.cfg); T(fn, J(js) === J(c.out), { suite: c.suite, py: c.out, js });
    } else if (fn === 'tfboard.common_checks') { const js = H.commonChecks(G, c.cfg, c.m); T(fn, J(js) === J(c.out), { suite: c.suite, py: c.out, js });
    } else if (fn === 'claims.apply') { const js = H.claimApply(G, c.m, c.cfg, a[0]); T(fn, J(js) === J(c.out), { suite: c.suite, py: c.out, js });
    } else if (fn.startsWith('claims.')) {
      const name = fn.split('.')[1], key = { pads: 'Transformer pads', gens: 'Generator tanks', chillers: 'Chiller clear zones', off_hall: 'Nothing wet over the hall', loading: 'Loading count and size', storeys: 'Every storey reached', at_grade: 'At grade: data centre only as entrances', separations: 'Fire separations', hub_cap: 'Data-centre size: hub cap', public_exits: 'Public exits beside the drive, not on it' }[name];
      const f = H.CLAIMS[key], r = name === 'separations' ? f(G, c.m, c.cfg, a[0]) : f(G, c.m, c.cfg), js = r === null ? null : [typeof r[0] === 'object' ? r[0].st : r[0], r[1]];
      T(fn, J(js) === J(c.out), { suite: c.suite, py: c.out, js });
    } else skipped[fn] = (skipped[fn] || 0) + 1;
  } catch (e) { T(fn, false, { suite: c.suite, js: 'error ' + e.message + ' ' + (e.stack || '').split('\n')[1] }); }
}
for (const [k, [ok, bad]] of Object.entries(tally)) console.log(k.padEnd(26), ok + ' match' + (bad ? `, ${bad} DIFFER` : ''));
for (const [k, n] of Object.entries(skipped)) console.log('skipped', k, n);
fs.writeFileSync(path.join(__dirname, 'ref_tests', 'replay_result.json'), JSON.stringify({ tally, skipped, diffs }, null, 1));
console.log(diffs.length ? `${diffs.length} differences (ref_tests/replay_result.json)` : 'all match');
process.exit(diffs.length ? 1 : 0);
