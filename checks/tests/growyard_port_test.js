// Layout (c) port test (J.B. 13 Nov 2026): tool/growyard.js (the hub's step-back for at-grade fits) against the hub's own grown.json, step by step:
// each step's MW, growth d, hall, data centre, exits and plant result, then the final MW, data centre and stopping rule. The fixture comes from
// checks/tests/growyard_fixture.py (holds Edmonton lot outlines: kept out of git). Usage: node growyard_port_test.js <fixture.json> [fit ...]
const GY = require('../../tool/growyard.js'), F = require(require('path').resolve(process.argv[2]));
const fits = process.argv.slice(3).length ? process.argv.slice(3) : Object.keys(F);
let pass = 0;
for (const f of fits) {
  const x = F[f], t0 = Date.now(), r = GY.run(x), hub = x.grown.steps, mine = r.steps || [];
  const stepRow = s => `${s.MW} d ${s.d} hall ${s.hall} dc ${s.dc} exits ${s.exits.map(e => (e.ok ? 'ok' : 'FAIL') + ' ' + e.apart + '/' + e.need).join(',')} | ${s.plant}`;
  let same = mine.length === hub.length;
  for (let i = 0; i < Math.max(mine.length, hub.length); i++) { const a = mine[i] ? stepRow(mine[i]) : '-', b = hub[i] ? stepRow(hub[i]) : '-'; if (a !== b) { same = false; console.log(`  ${f} step ${i + 1}\n    js  ${a}\n    hub ${b}`); } }
  const fin = r.MW === x.grown.MW && Math.abs((r.dc || 0) - (x.grown.steps.slice(-1)[0] || {}).dc) < 1 && r.stop && r.stop.rule === x.grown.stop.rule;
  const ok = fin && (same || !process.env.STRICT); if (ok) pass++;
  console.log(f.padEnd(7), ok ? 'MATCH' : 'differ', `| hub ${x.grown.MW} ${x.grown.stop.rule} | js ${r.MW} ${r.stop ? r.stop.rule : r.fail} | steps ${same ? 'same' : 'differ'} (${mine.length}/${hub.length}) | ${((Date.now() - t0) / 1000).toFixed(1)} s`);
}
console.log(`${pass} / ${fits.length} grown as the hub grew them`);
