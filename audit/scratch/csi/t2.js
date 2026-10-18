const {chromium}=require('/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/node_modules/playwright'); const fs=require('fs'); const SP='/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad';
(async()=>{ const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',args:['--use-gl=swiftshader','--enable-webgl']});
const p=await b.newPage({viewport:{width:1440,height:900}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.route(/three\.min\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/build/three.min.js'),contentType:'application/javascript'}));
await p.route(/OrbitControls\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/examples/js/controls/OrbitControls.js'),contentType:'application/javascript'}));
await p.route(/fonts\.(googleapis|gstatic)|jspdf|autotable|d3/,r=>r.abort());
await p.goto('http://localhost:8765/index.html'); await p.waitForTimeout(6000);
const r=await p.evaluate(async()=>{ const w=document.getElementById('welcome'); if(w) w.remove(); await BD.setCity('edm');
 const out={};
 async function lotSel(tile,idx){ const T=await BD.loadTile('edm',tile); const L=T.par.find(p=>p.id==='L'+tile+'_'+idx); const A=T.A; const id=L.ids.slice().sort((u,v)=>((A[v]||[])[4]||0)-((A[u]||[])[4]||0))[0]; const pt=T.pts.find(q=>q.id===id);
   await BD.select({city:'edm',tile,id,ring:L.r,pt:pt?[pt.x,pt.y]:null,lotIds:L.ids,quiet:true}); BD.modelReset(); const m=BD.model(); const f=BD.eng.siteFacts();
   return {id,a:BD.S.sel.a||null,outline:Math.round(BD.area(L.r)),lotArea:m.lotArea,zone:m.Z.zone,assumed:m.Z.assumed,gross:f.gross,mw:f.mw,foot:Math.round(m.footArea||0),side:document.getElementById('side').innerText.slice(0,700)}; }
 out.cross=await lotSel('-1_-1',110);
 // 8811 56 Ave NW
 const T=await BD.loadTile('edm','0_-3'); const L=T.par.find(p=>p.ids&&p.ids.includes('112829')); const idx=L.id.split('_').pop();
 out.small=await lotSel('0_-3',idx);
 return out; });
r.errs=errs; console.log(JSON.stringify(r,null,1)); await b.close(); })();
