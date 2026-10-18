const {chromium}=require('/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/node_modules/playwright'); const fs=require('fs'); const SP='/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad';
(async()=>{ const arg=process.argv[2]||'0', out=process.argv[3];
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',args:['--use-gl=swiftshader','--enable-webgl']});
const p=await b.newPage({viewport:{width:1440,height:900}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{ if(m.type()==='warning'||m.type()==='error') errs.push('console:'+m.text()); });
await p.route(/three\.min\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/build/three.min.js'),contentType:'application/javascript'}));
await p.route(/OrbitControls\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/examples/js/controls/OrbitControls.js'),contentType:'application/javascript'}));
await p.route(/fonts\.(googleapis|gstatic)|jspdf|autotable|d3/,r=>r.abort());
const isEx=/^\d+$/.test(arg);
await p.goto('http://localhost:8765/index.html?x='+Date.now()+(isEx?'':'#'+arg)); await p.waitForTimeout(8000);
if(isEx){ await p.click('#wEx'); await p.click('#wList .ex[data-i="'+arg+'"]'); await p.waitForTimeout(9000); }
else { await p.evaluate(()=>{ const w=document.getElementById('welcome'); if(w) w.remove(); BD.flow.go(1); }); await p.waitForTimeout(5000); }
await p.evaluate(async()=>{ const f=BD.eng.siteFacts(); await BD.eng.loadRecv(f.city); });
const res={arg,errs,runs:[]};
const configs=JSON.parse(process.argv[4]||'[{}]');
for(const cfg of configs){
 const r=await p.evaluate(async(cfg)=>{ Object.assign(BD.S.answers,cfg); const o={cfg,answers:JSON.parse(JSON.stringify(BD.S.answers)),facts:{}}; const f=BD.eng.siteFacts(); for(const k of ['city','zone','plate','foot','gross','m2MW']) o.facts[k]=f[k];
   o.roof=BD.eng.roofArea(f); o.topics={};
   for(const t of Object.keys(BD.explain.TOPICS)){ await BD.explain.open(t); const steps=[]; const w=document.getElementById('xp');
     for(let i=0;i<20;i++){ const xt=w.querySelector('.xtext'); const titles=[...w.querySelectorAll('.xvis title,.xvis2 title')].map(n=>n.textContent); const texts=[...w.querySelectorAll('.xvis text,.xvis2 text')].map(n=>n.textContent);
       steps.push({h:xt.querySelector('h2').textContent,p:xt.querySelector('p').textContent,titles,texts,src:[...w.querySelectorAll('details.fp .src')].map(n=>n.textContent)});
       const nb=document.getElementById('xpN'); if(nb.textContent.startsWith('Done')) break; nb.click(); }
     BD.explain.close(); o.topics[t]=steps; }
   return o; },cfg);
 res.runs.push(r); }
fs.writeFileSync(out,JSON.stringify(res,null,1)); console.log('wrote',out,errs.length,'errors');
await b.close(); })();
