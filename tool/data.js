/* Beyond Data — register-wired figures (lean refactor, 3 Nov 2026).
   The figures the engine uses live in tool/data/*.json, one file per subject. Every number there carries the register id it comes
   from: {"v": value, "src": "id"} or a "src" on its row or table (ids from register/formula_register.json: new_sources, quantities,
   conditions). Keys starting with "_" are notes. BD.data.<file> is the same data with the wrappers, "src" and notes removed, so the
   code reads plain values; BD.data.raw.<file> keeps the sources. checks/tests/register_wiring.js fails on any number without a
   register id. Loaded synchronously (before engine.js) because the engine reads these at start-up. */
(function(){
'use strict';
const BD=window.BD=window.BD||{};
const FILES=['envelope','size','equipment','noise','heat','water','plant_units','zones'];
const plain=o=>{
  if(Array.isArray(o)) return o.map(plain);
  if(o&&typeof o==='object'){
    if('v' in o&&'src' in o) return plain(o.v);
    const r={}; for(const k of Object.keys(o)){ if(k==='src'||k[0]==='_') continue; r[k]=plain(o[k]); } return r; }
  return o; };
const D={raw:{}};
for(const n of FILES){
  try{ const x=new XMLHttpRequest(); x.open('GET','data/'+n+'.json',false); x.send(null);
    if(x.status&&x.status!==200) throw new Error('HTTP '+x.status);
    const j=JSON.parse(x.responseText); D.raw[n]=j; D[n]=plain(j); }
  catch(e){ console.error('data/'+n+'.json did not load',e); D[n]=null; } }
BD.data=D;
})();
