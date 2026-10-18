const {chromium}=require('/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/node_modules/playwright'); const fs=require('fs'); const SP='/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad';
(async()=>{ const arg=process.argv[2]||'0';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',args:['--use-gl=swiftshader','--enable-webgl']});
const p=await b.newPage({viewport:{width:1440,height:900}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.route(/three\.min\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/build/three.min.js'),contentType:'application/javascript'}));
await p.route(/OrbitControls\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/examples/js/controls/OrbitControls.js'),contentType:'application/javascript'}));
await p.route(/fonts\.(googleapis|gstatic)|jspdf|autotable|d3/,r=>r.abort());
await p.goto('http://localhost:8765/index.html?x='+Date.now()); await p.waitForTimeout(8000);
await p.click('#wEx'); await p.click('#wList .ex[data-i="'+arg+'"]'); await p.waitForTimeout(9000);
await p.evaluate(()=>{ BD.flow.max=999; });
// go through flow steps to ensure model built
const n=await p.evaluate(()=>BD.flow.steps.length);
const keys=await p.evaluate(()=>BD.flow.steps.map(s=>s.k));
const out={keys,errs};
for(let i=1;i<n;i++){ const k=await p.evaluate(i=>{BD.flow.go(i); return BD.flow.steps[i].k;},i); await p.waitForTimeout(2500);
  const t=await p.evaluate(()=>document.getElementById('side').innerText);
  if(/solar|Solar|kWp/.test(t)) { out['step_'+i+'_'+k]=t.split('\n').filter(l=>/olar|kWp|MWh|roof|Roof|share|Share|wall/.test(l)).join('\n'); }
}
out.facts=await p.evaluate(()=>{ const f=BD.eng.siteFacts(); return {city:f.city,lot:f.lot,plate:f.plate,foot:f.foot,roof:BD.eng.roofArea(f),mw:BD.S.answers.mw,built:BD.S.answers.built,R:{pue:BD.eng.R.pue,lf:BD.eng.R.lf}}; });
// solar addon card
out.solar=await p.evaluate(async()=>{ const a=BD.S.answers; a.add=a.add||{}; a.add.pv=true; const btn=document.querySelector('#side [data-add="pv"]'); if(btn){btn.click();} await new Promise(r=>setTimeout(r,3000)); const d=document.getElementById('drawer')||document.querySelector('.drawer'); return d?d.innerText:'no drawer'; });
fs.writeFileSync('pv_'+arg+'.json',JSON.stringify(out,null,1)); console.log('done'); await b.close(); })();
