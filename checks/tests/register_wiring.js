// Register wiring test (3 Nov 2026 lean refactor).
// 1. Loads every tool/data/*.json. Fails on any number that has no register id (`src`) on itself ({v, src}),
//    on its row, or on its table; fails on any `src` id not in register/formula_register.json
//    (new_sources, old_sources, quantities, conditions or opportunity quantities).
// 2. Scans tool/*.js for numeric literals >= 2 left in code that are not on a line marked /* drawing */
//    and not listed in checks/agents/2026-11-03_refactor_unsourced.md. Report-only for now; it fails
//    once the unsourced list is empty (set WIRING_STRICT=1 to fail now).
//    Arithmetic constants are not counted as figures: x/2, 2*x, i+=2, 10*Math.log10, hex sizes, sentinels >= 1e9.
// Usage: node checks/tests/register_wiring.js [--list]   (from the repo root or anywhere)
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const REG = JSON.parse(fs.readFileSync(path.join(ROOT, 'register/formula_register.json'), 'utf8'));
const IDS = new Set([
  ...Object.keys(REG.new_sources || {}), ...Object.keys(REG.old_sources || {}),
  ...(REG.quantities || []).map(q => q.id), ...(REG.conditions || []).map(c => c.id),
  ...Object.keys(REG.opportunity_quantities || {}),
]);
const LIST = process.argv.includes('--list');
let fail = 0;
const bad = m => { fail++; console.log('FAIL ' + m); };

// ---- 1. data files ----
const DD = path.join(ROOT, 'tool/data');
const files = fs.existsSync(DD) ? fs.readdirSync(DD).filter(f => f.endsWith('.json')).sort() : [];
let wired = 0;
const checkSrc = (s, where) => { const a = Array.isArray(s) ? s : [s];
  if (!a.length) bad(where + ': empty src');
  for (const id of a) if (typeof id !== 'string' || !IDS.has(id)) bad(where + ': src "' + id + '" is not in the register'); };
function walk(o, where, covered) {
  if (typeof o === 'number') { if (covered) wired++; else bad(where + ': number ' + o + ' has no src'); return; }
  if (Array.isArray(o)) { o.forEach((x, i) => walk(x, where + '[' + i + ']', covered)); return; }
  if (o && typeof o === 'object') {
    let here = covered;
    if ('src' in o) { checkSrc(o.src, where + '.src'); here = true; }
    for (const k of Object.keys(o)) { if (k === 'src' || k.startsWith('_')) continue; walk(o[k], where + '.' + k, here); }
  }
}
for (const f of files) { let d; try { d = JSON.parse(fs.readFileSync(path.join(DD, f), 'utf8')); } catch (e) { bad(f + ': not JSON (' + e.message + ')'); continue; } walk(d, f, false); }
console.log(`data: ${files.length} files, ${wired} numbers wired to the register${fail ? ', ' + fail + ' failures' : ''}`);

// ---- 2. literals left in code ----
const UNS = path.join(ROOT, 'checks/agents/2026-11-03_refactor_unsourced.md');
const listed = new Set(); // "file:line:value"
if (fs.existsSync(UNS)) for (const l of fs.readFileSync(UNS, 'utf8').split('\n')) {
  const m = l.match(/^\|\s*(tool\/[\w.]+\.js)\s*\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|/); if (!m) continue;
  for (const v of m[3].split(/[,\s]+/).filter(Boolean)) listed.add(m[1] + ':' + m[2] + ':' + (+v.replace(/[`]/g, '')));
}
// strip comments and string text (keep ${…} expressions in template strings); returns [{line, value}] for numeric literals
function literals(src) {
  const out = []; let i = 0, line = 1; const n = src.length; let prev = ''; const stack = []; // stack of template depths
  const num = /^(?:0[xX][\da-fA-F]+|(?:\d[\d_]*\.?\d*(?:[eE][+-]?\d+)?|\.\d+(?:[eE][+-]?\d+)?))/;
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (c === '\n') { line++; i++; continue; }
    if (c === '/' && d === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (c === '/' && d === '*') { i += 2; while (i < n && !(src[i] === '*' && src[i + 1] === '/')) { if (src[i] === '\n') line++; i++; } i += 2; continue; }
    if (c === '"' || c === "'") { i++; while (i < n && src[i] !== c) { if (src[i] === '\\') i++; else if (src[i] === '\n') line++; i++; } i++; prev = 'x'; continue; }
    if (c === '`' || (c === '}' && stack.length && stack[stack.length - 1] === 0)) {
      if (c === '}') stack.pop(); i++;
      while (i < n && src[i] !== '`') { if (src[i] === '\\') { i += 2; continue; } if (src[i] === '\n') line++;
        if (src[i] === '$' && src[i + 1] === '{') { i += 2; stack.push(0); break; } i++; }
      if (src[i] === '`') i++; prev = 'x'; continue; }
    if (c === '{' && stack.length) { stack[stack.length - 1]++; i++; prev = c; continue; }
    if (c === '}' && stack.length) { stack[stack.length - 1]--; i++; prev = c; continue; }
    if (c === '/' && (prev === '' || '(,=:[!&|?{};+-*%<>~^'.includes(prev) || /^(return|typeof|case)$/.test(prev))) { // regex literal
      i++; let cls = false; while (i < n && (cls || src[i] !== '/')) { if (src[i] === '\\') i++; else if (src[i] === '[') cls = true; else if (src[i] === ']') cls = false; i++; }
      i++; while (/[a-z]/.test(src[i] || '')) i++; prev = 'x'; continue; }
    if (/[A-Za-z_$]/.test(c)) { let j = i; while (j < n && /[\w$]/.test(src[j])) j++; prev = src.slice(i, j); i = j; continue; }
    if (/\d/.test(c) || (c === '.' && /\d/.test(d || ''))) { const m = src.slice(i).match(num); const t = m[0]; out.push({ line, value: Number(t.replace(/_/g, '')), at: i, len: t.length, hex: /^0x/i.test(t) }); i += t.length; prev = 'x'; continue; }
    if (!/\s/.test(c)) prev = c; i++;
  }
  return out;
}
const JS = fs.readdirSync(path.join(ROOT, 'tool')).filter(f => f.endsWith('.js')).sort();
let left = 0, drawing = 0, unsourced = 0, arith = 0; const per = {};
// arithmetic, not figures: halving/doubling and ring strides (x/2, 2*x, i+=2), 10·log10 for decibels, hex buffer sizes, 1e9-type sentinels
const isArith = (src, { value, at, len, hex }) => { const b = src.slice(Math.max(0, at - 3), at).replace(/\s/g, ''), a = src.slice(at + len, at + len + 12).replace(/\s/g, '');
  if (hex || value >= 1e9) return true;
  if (value === 2 && (/[\/*%]$|[+\-]=$/.test(b) || /^\*/.test(a))) return true;
  if (value === 10 && /^\*Math\.log10/.test(a)) return true;
  return false; };
for (const f of JS) {
  if (f === 'gfa_van.js') continue; // generated data file (make_gfa_reported.py)
  const src = fs.readFileSync(path.join(ROOT, 'tool', f), 'utf8'); const lines = src.split('\n');
  for (const L of literals(src)) { const { line, value } = L;
    if (!(Math.abs(value) >= 2)) continue;
    if (isArith(src, L)) { arith++; continue; }
    if (/\/\*\s*drawing\s*\*\//.test(lines[line - 1])) { drawing++; continue; }
    if (listed.has('tool/' + f + ':' + line + ':' + value)) { unsourced++; continue; }
    left++; per[f] = (per[f] || 0) + 1; if (LIST) console.log(`  tool/${f}:${line}  ${value}`);
  }
}
console.log(`code: ${left} numeric literals >= 2 left in tool/*.js (not marked drawing, not listed unsourced); ${drawing} on drawing lines; ${unsourced} listed unsourced; ${arith} arithmetic (halves, strides, 10 log10, sentinels)`);
console.log('  by file: ' + Object.entries(per).map(([f, c]) => f + ' ' + c).join(', '));
if (left && (listed.size === 0 || process.env.WIRING_STRICT)) { if (listed.size === 0 && !process.env.WIRING_STRICT) console.log('  (fail mode: the unsourced list is empty)'); fail++; }
else if (left) console.log('  (report-only while the unsourced list has entries)');
process.exit(fail ? 1 : 0);
