const {chromium}=require('/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/node_modules/playwright'); const fs=require('fs'); const SP='/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad';
(async()=>{ const arg=process.argv[2]||'0', out=process.argv[3];
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',args:['--use-gl=swiftshader','--enable-webgl']});
const p=await b.newPage({viewport:{width:1440,height:900}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.route(/three\.min\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/build/three.min.js'),contentType:'application/javascript'}));
await p.route(/OrbitControls\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/examples/js/controls/OrbitControls.js'),contentType:'application/javascript'}));
await p.route(/fonts\.(googleapis|gstatic)|jspdf|autotable|d3/,r=>r.abort());
await p.goto('http://localhost:8765/index.html?x='+Date.now()); await p.waitForTimeout(8000);
await p.click('#wEx'); await p.click('#wList .ex[data-i="'+arg+'"]'); await p.waitForTimeout(9000);
await p.evaluate(()=>{ BD.scene3d&&(BD.scene3d.show=async()=>{}); });
const base=await p.evaluate(()=>JSON.parse(JSON.stringify(BD.S.answers)));
const BUILT={new:{built:'new',extent:'whole'},shared:{built:'new',extent:'part'},retrofit:{built:'existing',extent:'whole'},lease:{built:'existing',extent:'part',floor:'upper'}};
const rows=[];
for(const bk of Object.keys(BUILT)) for(const inside of ['air','plate','immersion']) for(const outside of ['dry','towers','hybrid']) for(const plantAt of ['roof','yard','split']) for(const gens of ['yes','none']){
 const set=Object.assign({},BUILT[bk],{inside,outside,plantAt,gens,mw:null});
 const r=await p.evaluate(async([base,set])=>{ const A=BD.S.answers; for(const k of Object.keys(A)) delete A[k]; Object.assign(A,base,set); BD.modelReset(); const f0=BD.eng.siteFacts(); const pre={mw:f0.mw,gross:f0.gross}; BD.fitsView(); await new Promise(r=>setTimeout(r,50)); const fitsTxt=document.getElementById('side').innerText;
   const o={}; try{ const f=BD.eng.siteFacts(); o.mw=f.mw; o.gross=f.gross; o.hallS=f.hallS; o.indoor=f.indoorPlant; o.mwCheck=f.mwCheck; const M=f.M; o.plant=M&&M.plant?{n:M.plant.s&&M.plant.s.n,gN:M.plant.s&&M.plant.s.gN,miss:M.plant.miss,indoor:M.plant.indoor}:null; o.mwSized=M&&M.mwSized; o.prov=M&&M.mwProvisional; o.plines=M&&M.plant&&M.plant.lines.slice(0,2); o.glines=M&&M.plant&&M.plant.genLines.slice(0,1); o.short=M&&M.plant&&M.plant.short; o.Amw=A.mw; o.pre=pre; o.fitsTxt=fitsTxt; }catch(e){ o.err=String(e); }
   const txt={}; for(const t of ['heat','energy','water']){ try{ BD.tabView(t); await new Promise(r=>setTimeout(r,t==='heat'?400:60)); const sd=document.getElementById('side'); sd.querySelectorAll('details').forEach(d=>d.open=true); txt[t]=sd.innerText; }catch(e){ txt[t]='ERR '+e; } }
   o.txt=txt; return o; },[base,set]);
 rows.push(Object.assign({b:bk,inside,outside,plantAt,gens},r)); }
fs.writeFileSync(out,JSON.stringify({base,errs,rows},null,1)); console.log('rows',rows.length,'errs',errs.length); await b.close(); })();
