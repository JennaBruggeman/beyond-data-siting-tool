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
const r=await p.evaluate(()=>{ const out=[]; const A=BD.S.answers;
 const run=(lab,set)=>{ const save=JSON.stringify(A); Object.assign(A,set); A.mw=set.mw||null; BD.modelReset(); const m=BD.model(); const f=BD.eng.siteFacts();
   out.push({lab,mwSized:m&&m.mwSized,prov:m&&m.mwProvisional,fitsMW:f.mw,hall:f.hall,gross:f.gross,fp:f.fp,lot:f.lot,indoor:f.indoorPlant,yardDepth:m&&m.plantYardDepth,lines:m&&m.plant&&m.plant.lines.slice(0,3),gen:m&&m.plant&&m.plant.genLines.slice(0,2),short:m&&m.plant&&m.plant.short,existing:m&&m.existing});
   const s=JSON.parse(save); for(const k in A) delete A[k]; Object.assign(A,s); };
 run('default',{});
 run('yard',{plantAt:'yard'});
 run('split-towers',{plantAt:'split',outside:'towers'});
 run('hybrid-indoors',{outside:'hybrid',vis:'indoors'});
 run('mw12',{mw:12});
 run('existing',{built:'existing'});
 return {answers:A,out}; });
fs.writeFileSync(process.argv[3],JSON.stringify({arg,errs,...r},null,1)); await b.close(); })();
