const {chromium}=require('/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/node_modules/playwright'); const fs=require('fs'); const SP='/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad';
(async()=>{ const ex=process.argv[2]||'0';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',args:['--use-gl=swiftshader','--enable-webgl']});
const p=await b.newPage({viewport:{width:1440,height:900}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.route(/three\.min\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/build/three.min.js'),contentType:'application/javascript'}));
await p.route(/OrbitControls\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/examples/js/controls/OrbitControls.js'),contentType:'application/javascript'}));
await p.route(/fonts\.(googleapis|gstatic)|jspdf|autotable|d3/,r=>r.abort());
await p.goto('http://localhost:8765/index.html?x='+Date.now()); await p.waitForTimeout(8000);
await p.click('#wEx'); await p.click('#wList .ex[data-i="'+ex+'"]'); await p.waitForTimeout(9000);
for(let i=2;i<60;i++){ const k=await p.evaluate(i=>{ if(i>=BD.flow.steps.length) return null; BD.flow.go(i); return BD.flow.steps[i].k; },i); if(!k) break; await p.waitForTimeout(3000); }
const out=await p.evaluate(()=>({notes:BD.flow.notes,steps:BD.flow.steps.map(s=>s.k),A:BD.S.answers,max:BD.flow.max,i:BD.flow.i}));
fs.writeFileSync('notes_'+ex+'.json',JSON.stringify({out,errs},null,1)); console.log('ok',errs.length); await b.close(); })();
