const SP='/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad';
const {chromium}=require(SP+'/node_modules/playwright'); const fs=require('fs');
(async()=>{ const arg=process.argv[2];
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',args:['--use-gl=swiftshader','--enable-webgl']});
const p=await b.newPage({viewport:{width:1440,height:900}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.route(/three\.min\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/build/three.min.js'),contentType:'application/javascript'}));
await p.route(/OrbitControls\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/examples/js/controls/OrbitControls.js'),contentType:'application/javascript'}));
await p.route(/fonts\.(googleapis|gstatic)|jspdf|autotable|d3/,r=>r.abort());
const isEx=/^\d+$/.test(arg);
await p.goto('http://localhost:8765/index.html?x='+Date.now()+(isEx?'':'#'+arg)); await p.waitForTimeout(8000);
if(isEx){ await p.click('#wEx'); await p.click('#wList .ex[data-i="'+arg+'"]'); await p.waitForTimeout(9000); }
else { await p.evaluate(()=>{ const w=document.getElementById('welcome'); if(w) w.remove(); BD.flow.go(1); }); await p.waitForTimeout(5000); }
const out=[]; const A0=await p.evaluate(()=>JSON.stringify(BD.S.answers));
for(const set of [{},{mw:2},{mw:5},{mw:12},{mw:40},{mw:2,vis:'screen'},{mw:2,vis:'indoors'},{mw:5,plantAt:'yard'}]){
 const r=await p.evaluate(async(set)=>{ const A=BD.S.answers; const save=JSON.stringify(A); Object.assign(A,set); if(!set.mw) A.mw=null; BD.modelReset();
   await BD.scene3d.show('model',{}); const st=BD.scene3d.state(); const M=st.M;
   const labs=[...document.querySelectorAll('#v3d > div')[0].children].map(d=>d.textContent);
   const sf=M.serverFoot?BD.area(M.serverFoot):null;
   const res={set,labs,note:document.getElementById('v3note').textContent,footArea:M.footArea,serverFootArea:sf,nF:M.nF,H:M.H,sizedTo:M.sizedTo,mwSized:M.mwSized,prov:M.mwProvisional,ground:M.Z&&M.Z.ground,racks:st.racks&&{racks:st.racks.racks,n:st.racks.n,per:st.racks.per,floors:st.racks.floors},boxes:M.plant&&M.plant.boxes.map(b=>[b.name,b.kind,b.base,b.h,+BD.area(b.ring).toFixed(2)]),equipOnly:st.equipOnly,indoorZ:st.indoorZ,roof:st.roof};
   // materials
   await BD.scene3d.show('materials',{site:BD.eng.siteFacts()}); res.matLabs=[...document.querySelectorAll('#v3d > div')[0].children].map(d=>d.textContent);
   const s=JSON.parse(save); for(const k in A) delete A[k]; Object.assign(A,s); return res; },set);
 out.push(r); }
fs.writeFileSync(process.argv[3],JSON.stringify({arg,errs,A0,out},null,1)); await b.close(); })();
