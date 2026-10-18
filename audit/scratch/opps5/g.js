const {chromium}=require('/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/node_modules/playwright'); const fs=require('fs'); const SP='/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad';
(async()=>{ const arg=process.argv[2];
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',args:['--use-gl=swiftshader','--enable-webgl']});
const p=await b.newPage({viewport:{width:1440,height:900}});
await p.route(/three\.min\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/build/three.min.js'),contentType:'application/javascript'}));
await p.route(/OrbitControls\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/examples/js/controls/OrbitControls.js'),contentType:'application/javascript'}));
await p.route(/fonts\.(googleapis|gstatic)|jspdf|autotable|d3/,r=>r.abort());
await p.goto('http://localhost:8765/index.html?x='+Date.now()); await p.waitForTimeout(8000);
await p.click('#wEx'); await p.click('#wList .ex[data-i="'+arg+'"]'); await p.waitForTimeout(9000);
const out=await p.evaluate(async()=>{ await BD.oppPrep(); const res={}; const f=BD.eng.siteFacts(); res.site={city:f.city,zone:f.zone,lot:f.lot,answers:JSON.parse(JSON.stringify(BD.S.answers))};
  for(const inside of ['air','liquid',BD.S.answers.inside]){ BD.S.answers.inside=inside; res[inside]={};
   for(const n of ['Greenhouse','Sewage heat as comparator source','Cooling for neighbours']){ const g=BD.oppGatesFor(n); res[inside][n]={s:g.s,G:g.G}; } }
  return res; });
fs.writeFileSync(process.argv[3],JSON.stringify(out,null,1)); await b.close(); })();
