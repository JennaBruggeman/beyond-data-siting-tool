const {chromium}=require('/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/node_modules/playwright'); const fs=require('fs'); const SP='/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad';
(async()=>{ const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',args:['--use-gl=swiftshader','--enable-webgl']});
const p=await b.newPage({viewport:{width:1440,height:900}});
await p.route(/three\.min\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/build/three.min.js'),contentType:'application/javascript'}));
await p.route(/OrbitControls\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/examples/js/controls/OrbitControls.js'),contentType:'application/javascript'}));
await p.route(/fonts\.(googleapis|gstatic)|jspdf|autotable|d3/,r=>r.abort());
await p.goto('http://localhost:8765/index.html?x='+Date.now()); await p.waitForTimeout(8000);
await p.click('#wEx'); await p.click('#wList .ex[data-i="0"]'); await p.waitForTimeout(9000);
const out=await p.evaluate(async()=>{ const res={}; const A=BD.S.answers; const base=JSON.parse(JSON.stringify(A));
 for(const [lab,set] of [['new',{built:'new',extent:'whole'}],['retrofit',{built:'existing',extent:'whole'}],['lease',{built:'existing',extent:'part',floor:'upper'}],['new-hybrid-yard',{built:'new',extent:'whole',outside:'hybrid',plantAt:'yard'}]]){
  for(const k of Object.keys(A)) delete A[k]; Object.assign(A,base,set,{mw:null}); BD.modelReset(); const M=BD.model(); const f=BD.eng.siteFacts();
  res[lab]={nF:M.nF,H:M.H,Zground:M.Z&&M.Z.ground,fsr:M.Z&&M.Z.fsr,lot:M.lotArea,mwSized:M.mwSized,prov:M.mwProvisional,lines:M.plant&&M.plant.lines,gen:M.plant&&M.plant.genLines,short:M.plant&&M.plant.short,fmw:f.mw,how:f.how};
  BD.flow.go(BD.flow.steps.findIndex(s=>s.k==='fits')); await new Promise(r=>setTimeout(r,2500)); res[lab].fits=document.getElementById('side').innerText.slice(0,2500);
 }
 return res; });
fs.writeFileSync('probe.json',JSON.stringify(out,null,1)); await b.close(); })();
