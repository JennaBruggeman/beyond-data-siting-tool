// T-reach, dead ends and room widths on Cowork's Emergency hub hand fits (tool/treach.js), with parity against
// Cowork's Python (eh/reach.py, eh/deadend.py, eh/audit_rooms.py; outputs saved by checks/tests/eh_fixtures_export.py
// as expected_<fit>.json) and the spec 15d negative test.   node checks/tests/t_reach.js [--quiet]
// Fixtures: checks/fixtures/eh/ (Vancouver, committed) and checks/fixtures/eh_local/ (Edmonton, licensed lots: never committed).
'use strict';
const fs = require('fs'), path = require('path');
const T = require('../../tool/treach.js');
const FX = path.join(__dirname, '..', 'fixtures');
const quiet = process.argv.includes('--quiet');
let bad = 0;
const fail = s => { bad++; console.log('  PARITY FAIL ' + s); };

function fixtures() {
  const out = [];
  for (const dir of ['eh', 'eh_local']) {
    const d = path.join(FX, dir);
    if (!fs.existsSync(d)) { console.log(`(${dir}: not present)`); continue; }
    for (const f of fs.readdirSync(d).sort()) {
      if (!f.endsWith('.json') || f.startsWith('expected_')) continue;
      const fit = f.replace('.json', ''), e = path.join(d, 'expected_' + f);
      out.push({ fit, dir, G: JSON.parse(fs.readFileSync(path.join(d, f), 'utf8')), E: fs.existsSync(e) ? JSON.parse(fs.readFileSync(e, 'utf8')) : null });
    }
  }
  return out;
}
const fkey = o => `${o.rule}|${o.storey}|${o.room}`;

function report(fit, G) {
  const r = T.tReach(G), de = T.deadEnds(G), w = T.tWidth(G);
  console.log(`\n=== ${fit}`);
  console.log(`  T-reach: ${r.length ? r.length + ' findings' : 'PASS'}`);
  for (const o of r) console.log(`    ${o.rule}  st${o.storey} ${o.room}: ${o.reason}`);
  console.log('  Dead ends (limit 6.0 m):');
  for (const c of de) console.log(`    st${c.storey} ${c.corridor.padEnd(16)} ${c.kind}  exits ${c.exits} [${c.exitNames.join(', ')}]  dead end ${c.deadEnd_m === null ? 'no exit' : c.deadEnd_m.toFixed(1) + ' m'}  ${c.ok ? 'ok' : 'FAIL'}`);
  const fails = w.rows.filter(x => x.sev === 'fail'), notes = w.rows.filter(x => x.sev === 'note');
  console.log(`  T-width: ${fails.length} fails, ${notes.length} notes`);
  for (const x of fails) console.log(`    FAIL st${x.storey} ${x.room.padEnd(5)} ${x.name.slice(0, 40).padEnd(40)} ${x.what}  [${x.basis}]`);
  if (!quiet) for (const x of notes) console.log(`    note st${x.storey} ${x.room.padEnd(5)} ${x.name.slice(0, 40).padEnd(40)} ${x.what}`);
  for (const x of w.refuge) console.log(`    refuge st${x.storey} ${x.room}: ${x.area_m2} m2 drawn, ${x.counted_m2} m2 counted (parts >= 2.4 m wide)`);
  return { r, de, w };
}

function parity(fit, G, E, res) {
  console.log(`  parity vs Python (${fit}):`);
  // kinds
  let kd = 0;
  for (const st of Object.keys(G.S)) for (const x of G.S[st]) { const p = E.kinds[`${st}:${x.id}`]; if (p !== T.kindOf(x)) { kd++; fail(`kind st${st} ${x.id}: py ${p} js ${T.kindOf(x)}`); } }
  // T-reach: same findings (rule, storey, room) and reasons
  const pj = E.reach.map(fkey).sort(), jj = res.r.map(fkey).sort();
  if (JSON.stringify(pj) !== JSON.stringify(jj)) fail(`T-reach py [${pj}] js [${jj}]`);
  else {
    const pr = E.reach.map(o => fkey(o) + '|' + o.reason).sort(), jr = res.r.map(o => fkey(o) + '|' + o.reason).sort();
    console.log(`    T-reach: same ${pj.length} findings${JSON.stringify(pr) === JSON.stringify(jr) ? ', same reasons' : ' (reason text differs: ' + jr + ' / ' + pr + ')'}`);
  }
  // dead ends to 0.1 m
  if (E.deadend.length !== res.de.length) fail(`dead-end corridor count py ${E.deadend.length} js ${res.de.length}`);
  let dm = 0;
  for (const p of E.deadend) {
    const j = res.de.find(c => c.storey === p.storey && c.corridor === p.corridor);
    if (!j) { fail(`dead end st${p.storey} ${p.corridor} missing in js`); continue; }
    const same = p.deadEnd_m === j.deadEnd_m || (p.deadEnd_m !== null && j.deadEnd_m !== null && Math.abs(p.deadEnd_m - j.deadEnd_m) < 0.05 + 1e-9);
    if (!same && j.tie && p.deadEnd_m !== null && j.deadEnd_m !== null && Math.abs(p.deadEnd_m - j.deadEnd_m) <= 0.25 + 0.05 + 1e-9 && p.exits === j.exits && JSON.stringify(p.exitNames) === JSON.stringify(j.exitNames)) {
      console.log(`    tie st${p.storey} ${p.corridor}: py ${p.deadEnd_m} m, js ${j.deadEnd_m} m: a door sits on a 0.25 m cell boundary, so its nearest centreline cell is a tie (Python picks by set order); one cell apart, explained`); continue; }
    if (!same || p.exits !== j.exits || JSON.stringify(p.exitNames) !== JSON.stringify(j.exitNames)) fail(`dead end st${p.storey} ${p.corridor}: py ${p.deadEnd_m} m ${p.exits} [${p.exitNames}] js ${j.deadEnd_m} m ${j.exits} [${j.exitNames}]`);
    else dm++;
  }
  console.log(`    dead ends: ${dm}/${E.deadend.length} corridors match to 0.1 m, kinds ${kd ? kd + ' differ' : 'all match'}`);
  // widths: every Python clear-width flag on a spec-table / Part 3 room is a js fail; list every difference with its reason
  const diffs = [];
  for (const p of E.audit) {
    const mw = p.issue.find(s => s.startsWith('clear width'));
    const js = res.w.rows.filter(x => x.storey === p.st && x.room === p.id);
    const jf = js.filter(x => x.sev === 'fail');
    if (mw && !jf.length) {
      const jn = js.find(x => x.what && x.what.startsWith('clear width'));
      diffs.push(`st${p.st} ${p.id} "${p.n.slice(0, 34)}": py ${mw} (${p.basis.slice(0, 40)}); js ${jn ? 'note: ' + jn.what + ' [' + jn.basis + ']' : js.length ? js.map(x => x.sev + ': ' + x.what).join('; ') : 'no flag'}`);
    }
    if (!mw && jf.length) diffs.push(`st${p.st} ${p.id} "${p.n.slice(0, 34)}": py no width flag (${p.w} vs ${p.basis.slice(0, 30)}); js fail: ${jf.map(x => x.what + ' [' + x.basis + ']').join('; ')}`);
    for (const s of p.issue.filter(s => !s.startsWith('clear width'))) if (!js.some(x => x.what === s)) fail(`width st${p.st} ${p.id}: py "${s}" not reported by js`);
  }
  console.log(`    widths: ${E.audit.filter(p => p.issue.some(s => s.startsWith('clear width'))).length} python clear-width flags; ${diffs.length} differences`);
  for (const d of diffs) console.log('      diff ' + d);
  return diffs;
}

// Spec 15d negative test on a copy of v339: lobby door into the staff vestibule; waiting only through an exam room;
// clinic WC only through the consult room. Expect R2, R5, R5 (and nothing else).
function negative(G0) {
  const G = JSON.parse(JSON.stringify(G0));
  const room = (st, id) => G.S[st].find(x => x.id === id);
  const swapIds = (st, a, b) => {   // move two rooms of the same kind: swap their ids and names, and in the doors
    const A = room(st, a), B = room(st, b); [A.id, B.id] = [b, a]; [A.n, B.n] = [B.n, A.n];
    for (const d of G.D) if (d[0] === st) for (const i of [1, 2]) d[i] = d[i] === a ? b : d[i] === b ? a : d[i];
  };
  const wallDoor = (st, a, b) => {   // a door at the middle of the longest wall the two rooms share (fixtures are re-planned by Cowork: no fixed points)
    let best = null;
    for (const r of room(st, a).r) for (const q of room(st, b).r) {
      for (const [x1, x2] of [[r[1], q[0]], [r[0], q[1]]]) if (Math.abs(x1 - x2) < 1e-6) { const f = Math.max(r[2], q[2]), t = Math.min(r[3], q[3]); if (t - f > 1 && (!best || t - f > best.len)) best = { len: t - f, d: [st, a, b, x1, (f + t) / 2, 'v'] }; }
      for (const [y1, y2] of [[r[3], q[2]], [r[2], q[3]]]) if (Math.abs(y1 - y2) < 1e-6) { const f = Math.max(r[0], q[0]), t = Math.min(r[1], q[1]); if (t - f > 1 && (!best || t - f > best.len)) best = { len: t - f, d: [st, a, b, (f + t) / 2, y1, 'h'] }; }
    }
    if (!best) throw new Error(`negative test: ${a} and ${b} share no wall in this fixture`);
    return best.d;
  };
  // 1. the vestibule gets a front part on the lobby's street wall (u = 0.85), with a door from the lobby
  room(1, 'ves').r.push([-1.5, 0.85, 22.0, 24.0]);
  G.D.push([1, 'lob', 'ves', 0.85, 23.0, 'v']);
  // 2. exam room 5 moves next to the waiting room (swap with the procedure room); waiting loses its corridor door
  swapIds(2, 'ex5', 'proc');
  G.D = G.D.filter(d => !(d[0] === 2 && [d[1], d[2]].includes('wait') && [d[1], d[2]].includes('ccor')));
  G.D.push(wallDoor(2, 'wait', 'ex5'));
  // 3. the consult room moves next to the clinic WCs (swap with soiled holding); the WCs lose their corridor door
  swapIds(2, 'cons', 'soil');
  G.D = G.D.filter(d => !(d[0] === 2 && [d[1], d[2]].includes('cwc') && [d[1], d[2]].includes('ccor')));
  G.D.push(wallDoor(2, 'cwc', 'cons'));
  const r = T.tReach(G);
  console.log('\n=== Negative test (spec 15d) on a copy of v339');
  for (const o of r) console.log(`    ${o.rule}  st${o.storey} ${o.room}: ${o.reason}`);
  const got = r.map(fkey).sort().join(' '), want = ['R2|1|lob', 'R5|2|wait', 'R5|2|cwc'].sort().join(' ');
  if (got === want) console.log('  negative test: OK (R2, R5, R5)');
  else { bad++; console.log(`  negative test FAIL: got ${got}, want ${want}`); }
  return G;
}

const all = fixtures(), summary = [];
for (const { fit, G, E } of all) {
  const res = report(fit, G);
  const diffs = E ? parity(fit, G, E, res) : (console.log('  (no expected_ file: parity skipped)'), null);
  summary.push([fit, res.r.length ? res.r.map(o => o.rule).join(',') : 'PASS',
    res.de.map(c => `${c.corridor}:${c.deadEnd_m === null ? '-' : c.deadEnd_m}`).join(' '),
    res.w.rows.filter(x => x.sev === 'fail').length, res.w.rows.filter(x => x.sev === 'note').length, diffs ? diffs.length : '-']);
}
const v339 = all.find(f => f.fit === 'v339');
if (v339) { const G = negative(v339.G); if (process.env.TREACH_NEG_OUT) fs.writeFileSync(process.env.TREACH_NEG_OUT, JSON.stringify(G)); }
else { bad++; console.log('negative test: v339 fixture missing'); }

console.log('\n fit      T-reach      dead ends (m)                                   width fails  notes  width diffs vs py');
for (const s of summary) console.log(` ${String(s[0]).padEnd(8)} ${String(s[1]).padEnd(12)} ${String(s[2]).padEnd(48)} ${String(s[3]).padStart(5)} ${String(s[4]).padStart(9)} ${String(s[5]).padStart(8)}`);
console.log(bad ? `\n${bad} PARITY/NEGATIVE FAILURES` : '\nparity: T-reach and dead ends match the Python on every fixture; negative test OK');
process.exit(bad ? 1 : 0);
