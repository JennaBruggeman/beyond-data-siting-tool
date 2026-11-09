// Spec copies (J.B., 9 Nov 2026): every typology spec published with the tool (tool/f1/specs/*.md) must be byte-for-byte the same as
// Cowork's file in Claude Link, so a stale copy can't be published. Each spec is listed in tool/data/typologies.json (list[].spec:
// file = the copy in tool/f1/specs, link = its path in Claude Link). Fails on: a copy that differs, a copy not listed, a listed copy
// or Claude Link file that is missing, or no Claude Link folder at all (nothing to compare against = not checked = fail).
// Run by f1_gate.js and by checks/hooks/pre-push. Usage: node checks/tests/spec_sync.js   (CLAUDE_LINK=<folder> to override the default)
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const LINK = process.env.CLAUDE_LINK || 'C:/Users/bangp/Desktop/Claude Link';
function check() {
  const bad = [], ok = [];
  const T = JSON.parse(fs.readFileSync(path.join(ROOT, 'tool/data/typologies.json'), 'utf8'));
  const dir = path.join(ROOT, 'tool/f1/specs');
  const copies = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.md')) : [];
  const listed = T.list.filter(t => t.spec && t.spec.file);   /* a spec with no file (draft, not published yet) has no copy to compare */
  for (const f of copies) if (!listed.some(t => t.spec.file === f)) bad.push(`spec copy tool/f1/specs/${f} is not listed in typologies.json (list[].spec)`);
  if (listed.length && !fs.existsSync(LINK)) bad.push(`Claude Link folder not found (${LINK}): the spec copies can't be compared; set CLAUDE_LINK`);
  else for (const t of listed) {
    const a = path.join(dir, t.spec.file), b = path.join(LINK, t.spec.link);
    if (!fs.existsSync(a)) { bad.push(`${t.id}: copy tool/f1/specs/${t.spec.file} missing`); continue; }
    if (!fs.existsSync(b)) { bad.push(`${t.id}: Claude Link ${t.spec.link} missing`); continue; }
    if (Buffer.compare(fs.readFileSync(a), fs.readFileSync(b)) !== 0) bad.push(`${t.id}: tool/f1/specs/${t.spec.file} differs from Claude Link ${t.spec.link} (stale copy: re-copy it, or don't publish)`);
    else ok.push(t.id); }
  return { bad, ok };
}
module.exports = { check };
if (require.main === module) { const r = check();
  console.log('spec copies:', r.ok.length ? 'same as Claude Link: ' + r.ok.join(', ') : 'none checked', r.bad.length ? '\nPROBLEMS\n' + r.bad.join('\n') : '');
  process.exit(r.bad.length ? 1 : 0); }
