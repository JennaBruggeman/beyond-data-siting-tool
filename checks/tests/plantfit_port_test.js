// The plantfit port (tool/plantfit.js) against the hub's packer (Claude Link eh/plantfit.py), J.B. 13 Nov 2026 layout (a): the fixture holds, per
// board, the packer's inputs as eh/stepback.py builds them and the Python packer's result for the board's order and for six other orders
// (checks/tests/plantfit_fixture.py; the fixture holds board geometry and stays out of git). Pass = the same units at the same places (1 cm).
// Usage: node plantfit_port_test.js <fixture.json>
const PF = require('../../tool/plantfit.js'), F = require(require('path').resolve(process.argv[2]));
const key = it => it.map(i => i.kind + ':' + i.r.map(v => v.toFixed(2)).join(',')).sort().join(' ');
let pass = 0, n = 0;
for (const [f, x] of Object.entries(F)) {
  const need = { gen: x.need.gen, pad: x.need.pad, hub: x.need.hub, chill: x.need.chill };
  const runs = [[x.order.join('|'), { why: x.refWhy, items: x.ref }]].concat(Object.entries(x.refAll || {}));
  for (const [ord, ref] of runs) { n++;
    const t0 = Date.now(), r = PF.place(x.yard, x.lot, x.bld, need, { fill: x.fill, order: ord.split('|') }), ok = key(r.items) === key(ref.items) && (r.why || null) === (ref.why || null);
    if (ok) pass++; else console.log(f, ord, 'DIFFERS', '\n  js  ', r.why, key(r.items).slice(0, 300), '\n  py  ', ref.why, key(ref.items).slice(0, 300));
    if (ord === x.order.join('|')) console.log(f, ord, ok ? 'same' : 'differs', `${Date.now() - t0} ms`); } }
console.log(`${pass} / ${n} packings the same as the hub's packer`);
