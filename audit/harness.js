// Usage: node harness.js <example-index | city-tile-id hash e.g. van-m1_1-13860893> [out.json]
// Walks the guided path on one parcel and dumps every step's text (right column + any card), plus BD.eng.siteFacts() and answers.
const {chromium}=require('/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/node_modules/playwright'); const fs=require('fs'); const SP='/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad';
(async()=>{ const arg=process.argv[2]||'0', out=process.argv[3]||'harness_out.json';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',args:['--use-gl=swiftshader','--enable-webgl']});
const p=await b.newPage({viewport:{width:1440,height:900}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.route(/three\.min\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/build/three.min.js'),contentType:'application/javascript'}));
await p.route(/OrbitControls\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/examples/js/controls/OrbitControls.js'),contentType:'application/javascript'}));
await p.route(/fonts\.(googleapis|gstatic)|jspdf|autotable|d3/,r=>r.abort());
const isEx=/^\d+$/.test(arg);
await p.goto('http://localhost:8765/index.html?x='+Date.now()+(isEx?'':'#'+arg)); await p.waitForTimeout(8000);
if(isEx){ await p.click('#wEx'); await p.click('#wList .ex[data-i="'+arg+'"]'); await p.waitForTimeout(9000); }
else { await p.evaluate(()=>{ const w=document.getElementById('welcome'); if(w) w.remove(); BD.flow.go(1); }); await p.waitForTimeout(5000); }
const res={arg,steps:[],errs};
res.facts=await p.evaluate(()=>{ try{ const f=BD.eng.siteFacts(); const o={}; for(const k in f){ const v=f[k]; if(v==null||typeof v!=='object'||Array.isArray(v)&&v.length<6) o[k]=v; } return {facts:o,answers:BD.S.answers,addr:BD.S.sel&&BD.S.sel.a}; }catch(e){ return {err:String(e)}; } });
await p.evaluate(()=>{ BD.flow.max=999; });
const n=await p.evaluate(()=>BD.flow.steps.length);
for(let i=1;i<60;i++){ const st=await p.evaluate(i=>{ if(i>=BD.flow.steps.length) return null; BD.flow.go(i); return BD.flow.steps[i].k; },i); if(!st) break; await p.waitForTimeout(3500);
  const txt=await p.evaluate(()=>{ const sd=document.getElementById('side'); sd.querySelectorAll('details').forEach(d=>d.open=true); sd.querySelectorAll('.more,[hidden]').forEach(x=>x.hidden=false); return sd.innerText; });
  res.steps.push({k:st,text:txt}); }
fs.writeFileSync(out,JSON.stringify(res,null,1)); console.log('wrote',out,res.steps.length,'steps',errs.length,'errors');
await b.close(); })();
