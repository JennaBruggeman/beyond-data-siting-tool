// F9 (J.B. 10 Nov 2026): the public copy of an Engineering export. Receivers are named only by their type (and the distance the card already gives):
// the receiver list is BC Assessment-based in part, so no receiver's name or address goes in a committed file. The full export stays only in
// Claude Link reports/ (not public). Receiver names and types come from the tool's own receiver file (tool/tiles/<city>/receivers.json).
// Usage (from checks/tests/): node eng_redact.js <full.json> <public.json> [city]
const fs = require('fs'), path = require('path');
const [inp, out, city = 'van'] = process.argv.slice(2); if (!inp || !out) { console.error('usage: eng_redact.js <full.json> <public.json> [city]'); process.exit(1); }
const J = JSON.parse(fs.readFileSync(inp, 'utf8')), R = JSON.parse(fs.readFileSync(path.join(__dirname, `../../tool/tiles/${city}/receivers.json`), 'utf8'));
const TYPE = new Map(); R.pts.forEach(p => [p.n].concat(p.aka || []).forEach(n => { if (n && n.length >= 4) TYPE.set(n, p.t || 'building'); }));
const names = [...TYPE.keys()].sort((a, b) => b.length - a.length);   /* longest first, so a name with a suffix goes before the bare name */
const CARDS = new Set(['Heat offered', 'Who could take it']);          /* the cards that list receivers; other cards name substations, viewpoints and lots */
let n = 0; const hits = new Set();
/* case-insensitive: the cards title-case names the receiver file writes in another case */
const RE = names.map(nm => [nm, new RegExp(nm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')]);
const art = t => (/^[aeiou]/i.test(t) ? 'an ' : 'a ') + t;
const fix = s => { if (typeof s !== 'string') return s; let t = s; for (const [nm, re] of RE) { re.lastIndex = 0; if (re.test(t)) { hits.add(nm); n++; re.lastIndex = 0; t = t.replace(re, `[${art(TYPE.get(nm))} building]`); } } return t; };
const walk = o => Array.isArray(o) ? o.map(walk) : o && typeof o === 'object' ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, walk(v)])) : fix(o);
J.cards = J.cards.map(c => CARDS.has(c.title) ? walk(c) : c);
J.redacted = { by: 'checks/tests/eng_redact.js', what: 'receiver names and addresses on the Heat offered and Who could take it cards replaced by the receiver type (J.B. 10 Nov 2026); distances and the card figures kept', names: hits.size, replacements: n, full: 'Claude Link reports/eng_' + J.lot + '.json (not public)' };
fs.writeFileSync(out, JSON.stringify(J, null, 1)); console.log(`${hits.size} receiver names, ${n} replacements`);
