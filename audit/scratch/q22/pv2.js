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
const ei=await p.evaluate(()=>BD.flow.steps.findIndex(s=>s.k==='energy')); await p.evaluate(i=>BD.flow.go(i),ei); await p.waitForTimeout(4000);
const out={errs};
out.facts=await p.evaluate(()=>{ const f=BD.eng.siteFacts(); return {city:f.city,lot:f.lot,plate:f.plate,foot:f.foot,roof:BD.eng.roofArea(f),mw:BD.S.answers.mw,built:BD.S.answers.built,H:f.M&&f.M.H,existing:f.M&&f.M.existing}; });
for(const id of ['pv','pv_facade','blowdown','greywater','blackwater']){
 out[id]=await p.evaluate(async(id)=>{ const btn=document.querySelector('#side [data-add="'+id+'"]'); if(!btn) return 'no button'; btn.click(); await new Promise(r=>setTimeout(r,3500)); const d=document.getElementById('drawer'); const t=d?d.innerText:'no drawer'; if(BD.drawer) BD.drawer.close(); return t; },id);
 if(id==='pv_facade'){ const wi=await p.evaluate(()=>BD.flow.steps.findIndex(s=>s.k==='water')); }
}
const wi=await p.evaluate(()=>BD.flow.steps.findIndex(s=>s.k==='water')); await p.evaluate(i=>BD.flow.go(i),wi); await p.waitForTimeout(4000);
for(const id of ['blowdown','greywater','blackwater']){
 out['w_'+id]=await p.evaluate(async(id)=>{ const btn=document.querySelector('#side [data-add="'+id+'"]'); if(!btn) return 'no button'; btn.click(); await new Promise(r=>setTimeout(r,3500)); const d=document.getElementById('drawer'); const t=d?d.innerText:'no drawer'; if(BD.drawer) BD.drawer.close(); return t; },id);
}
out.waterSide=await p.evaluate(()=>document.getElementById('side').innerText);
fs.writeFileSync('pv2_'+arg+'.json',JSON.stringify(out,null,1)); console.log('done'); await b.close(); })();
