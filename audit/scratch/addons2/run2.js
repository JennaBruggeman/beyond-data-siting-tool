const {chromium}=require('/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/node_modules/playwright'); const fs=require('fs'); const SP='/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad';
(async()=>{ const arg=process.argv[2]||'0', out=process.argv[3];
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',args:['--use-gl=swiftshader','--enable-webgl']});
const p=await b.newPage({viewport:{width:1440,height:900}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.route(/three\.min\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/build/three.min.js'),contentType:'application/javascript'}));
await p.route(/OrbitControls\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/examples/js/controls/OrbitControls.js'),contentType:'application/javascript'}));
await p.route(/fonts\.(googleapis|gstatic)|jspdf|autotable|d3/,r=>r.abort());
const isEx=/^\d+$/.test(arg);
await p.goto('http://localhost:8765/index.html?x='+Date.now()+(isEx?'':'#'+arg)); await p.waitForTimeout(8000);
if(isEx){ await p.click('#wEx'); await p.click('#wList .ex[data-i="'+arg+'"]'); await p.waitForTimeout(9000); }
else { await p.evaluate(()=>{ const w=document.getElementById('welcome'); if(w) w.remove(); BD.flow.go(1); }); await p.waitForTimeout(5000); }
const res={arg,errs};
const drawer=async()=>p.evaluate(()=>{ const d=document.querySelector('#drawer')||document.querySelector('.drawer'); return d?d.innerText:'(no drawer)'; });
res.answers=await p.evaluate(()=>JSON.parse(JSON.stringify(BD.S.answers)));
res.facts=await p.evaluate(()=>{ const f=BD.eng.siteFacts(); return {city:f.city,roof:BD.eng.roofArea(f),H:f.M&&f.M.H,existing:f.M&&f.M.existing,foot:f.M&&f.M.foot&&Array.from(f.M.foot),plantRoof:(f.M&&f.M.plant&&f.M.plant.boxes||[]).filter(b=>b.kind==='roof').length,R:{pue:BD.eng.R.pue,lf:BD.eng.R.lf}}; });
res.steps=[]; await p.evaluate(()=>{BD.flow.max=999;}); for(let i=1;i<40;i++){ const st=await p.evaluate(i=>{ if(i>=BD.flow.steps.length) return null; BD.flow.go(i); return BD.flow.steps[i].k; },i); if(!st) break; await p.waitForTimeout(3000); res.steps.push(await p.evaluate(s=>({k:s,mw:BD.S.answers.mw,sized:BD.model()&&BD.model().mwSized,fmw:BD.eng.siteFacts().mw}),st)); if(st==="opps"||i>12) break; }
for(const outside of ["keep"]){
  res.mwNow=await p.evaluate(()=>[BD.S.answers.mw,BD.model()&&BD.model().mwSized,BD.S.answers.outside]);
  await p.evaluate(()=>{ BD.tabOverride.energy(); }); await p.waitForTimeout(1500);
  res['energy_'+outside]=await p.evaluate(()=>document.getElementById('side').innerText);
  await p.evaluate(()=>{ document.querySelector('#side [data-add="pv"]').click(); }); await p.waitForTimeout(3000);
  res['pv_'+outside]=await drawer();
  res['pvlay_'+outside]=await p.evaluate(()=>{ const f=BD.eng.siteFacts(); return {mw:BD.S.answers.mw}; });
  await p.evaluate(()=>{ BD.tabOverride.water(); }); await p.waitForTimeout(1500);
  res['water_'+outside]=await p.evaluate(()=>document.getElementById('side').innerText);
  for(const id of ['blowdown','blackwater']){ await p.evaluate(id=>document.querySelector('#side [data-wc="'+id+'"]').click(),id); await p.waitForTimeout(1000); res[id+'_'+outside]=await drawer(); }
}
fs.writeFileSync(out,JSON.stringify(res,null,1)); console.log('wrote',out,errs);
await b.close(); })();
