const {chromium}=require('/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/node_modules/playwright'); const fs=require('fs'); const SP='/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad';
(async()=>{ const arg=process.argv[2]; const isEx=/^\d+$/.test(arg);
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',args:['--use-gl=swiftshader','--enable-webgl']});
const p=await b.newPage({viewport:{width:1440,height:900}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.route(/three\.min\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/build/three.min.js'),contentType:'application/javascript'}));
await p.route(/OrbitControls\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/examples/js/controls/OrbitControls.js'),contentType:'application/javascript'}));
await p.route(/fonts\.(googleapis|gstatic)|jspdf|autotable|d3/,r=>r.abort());
await p.goto('http://localhost:8765/index.html?x='+Date.now()+(isEx?'':'#'+arg)); await p.waitForTimeout(8000);
if(isEx){ await p.click('#wEx'); await p.click('#wList .ex[data-i="'+arg+'"]'); await p.waitForTimeout(9000); }
else { await p.evaluate(()=>{ const w=document.getElementById('welcome'); if(w) w.remove(); BD.flow.go(1); }); await p.waitForTimeout(5000); }
const out=await p.evaluate(async()=>{ await BD.oppPrep(); const res={}; const orig=BD.eng.show3d; let cap=null; BD.eng.show3d=(k,d)=>{ cap={k,n:(d.boxes||[]).length,labels:(d.boxes||[]).map(b=>b.label).filter(Boolean),note:d.note,areas:(d.boxes||[]).map(b=>BD.area(b.ring)).slice(0,3)}; }; for(const n of ["EV charging hub","Greenhouse","Meanwhile uses on land held for growth","Warming centre, refuge, clean-air room"]){ cap=null; BD.oppCard(n); res[n]=cap; } const f=BD.eng.siteFacts(),M=f.M; res.M={lotArea:M.lotArea,inset:!!M.inset,lotR:BD.area(M.inset?BD.geo.clip(M.ring,M.inset):M.ring),ring:BD.area(M.ring),foot:M.footArea,loading:M.loading?BD.area(M.loading):0,yard:M.plant&&M.plant.yard?BD.area(M.plant.yard):0,sel:BD.area(BD.S.sel.ring),lot:f.lot,envAssumed:f.envAssumed}; BD.eng.show3d=orig; return res; });
out.errs=errs; fs.writeFileSync(process.argv[3],JSON.stringify(out,null,1)); await b.close(); })();
