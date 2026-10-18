const {chromium}=require('/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/node_modules/playwright'); const fs=require('fs'); const SP='/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad';
(async()=>{ const out=process.argv[2];
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',args:['--use-gl=swiftshader','--enable-webgl']});
const p=await b.newPage({viewport:{width:1440,height:900}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.route(/three\.min\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/build/three.min.js'),contentType:'application/javascript'}));
await p.route(/OrbitControls\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/examples/js/controls/OrbitControls.js'),contentType:'application/javascript'}));
await p.route(/fonts\.(googleapis|gstatic)|jspdf|autotable|d3/,r=>r.abort());
await p.goto('http://localhost:8765/index.html?x='+Date.now()); await p.waitForTimeout(8000);
await p.click('#wEx'); await p.click('#wList .ex[data-i="1"]'); await p.waitForTimeout(9000);
await p.evaluate(()=>{ BD.flow.max=999; });
const res={errs};
for(let i=1;i<=5;i++){ await p.evaluate(i=>BD.flow.go(i),i); await p.waitForTimeout(3500); }
const drawer=async()=>p.evaluate(()=>{ const d=document.querySelector('#drawer')||document.querySelector('.drawer'); return d?d.innerText:'(no drawer)'; });
res.mw=await p.evaluate(()=>({mw:BD.S.answers.mw, m:(BD.model&&BD.model().mw)||null}));
res.roof=await p.evaluate(()=>{ const f=BD.eng.siteFacts(); return {roof:BD.eng.roofArea(f), ring:BD.area(BD.S.sel.ring), R:{pue:BD.eng.R.pue,lf:BD.eng.R.lf,grid:BD.eng.R.grid}}; });
res.side=await p.evaluate(()=>document.getElementById('side').innerText);
for(const id of ['pv','pv_facade']){ const ok=await p.evaluate(id=>{ const x=document.querySelector('#side [data-add="'+id+'"]'); if(x){x.click();return true;} return false; },id); await p.waitForTimeout(3000); res[id]=ok?await drawer():'(no button)'; }
res.mw2=await p.evaluate(()=>BD.S.answers.mw);
fs.writeFileSync(out,JSON.stringify(res,null,1)); console.log('done',errs);
await b.close(); })();
