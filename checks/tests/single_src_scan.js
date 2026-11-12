// Read-only (12 Nov 2026): which register quantities each card uses. Per card: the parts its logic link lights (BD.f1logic.cardIds and
// the per-figure ids) and every register quantity id quoted in the card's own definition (BD.f1cards spec: build code and source lines).
// Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node single_src_scan.js <out.json>
const fs = require('fs'), path = require('path'), NM = (process.env.NODE_PATH || '').split(path.delimiter)[0];
const { chromium } = require('playwright');
(async () => {
  const Q = JSON.parse(fs.readFileSync(path.join(__dirname, '../../register/formula_register.json'), 'utf8')).quantities.map(q => q.id);
  const b = await chromium.launch(); const p = await b.newPage();
  await p.route(/three\.min\.js|OrbitControls\.js|fonts\.(googleapis|gstatic)/, r => r.abort());
  await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForSelector('#f1', { timeout: 20000 }); await p.waitForTimeout(2500);
  const res = await p.evaluate(Q => {
    const out = [];
    for (const t of BD.f1.TPL) for (const c of t.cards) {
      const title = c.t || c.title, ids = new Set();
      try { (BD.f1logic.cardIds(title, t.tab) || []).forEach(x => ids.add(x)); const F = BD.f1logic.FIG[t.tab] && BD.f1logic.FIG[t.tab][title]; if (F && F.f) F.f.forEach(([, a]) => a.forEach(x => ids.add(x))); } catch (e) {}
      const spec = BD.f1cards && BD.f1cards.get(t.id, title); let txt = '';
      if (spec) { for (const k of Object.keys(spec)) txt += ' ' + (typeof spec[k] === 'function' ? spec[k].toString() : JSON.stringify(spec[k])); }
      const quoted = Q.filter(id => new RegExp(`['"\`]${id}['"\`]`).test(txt));
      out.push({ tpl: t.id, tab: t.tab, card: title, logic: [...ids], quoted });
    }
    return out;
  }, Q);
  fs.writeFileSync(process.argv[2] || 'single_src.json', JSON.stringify(res, null, 1)); await b.close();
  console.log(res.length, 'cards;', res.filter(r => r.logic.length || r.quoted.length).length, 'name at least one part');
})().catch(e => { console.error(e); process.exit(1); });
