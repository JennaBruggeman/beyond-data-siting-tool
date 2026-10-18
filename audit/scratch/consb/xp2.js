const {chromium}=require('/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/node_modules/playwright'); const fs=require('fs'); const SP='/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad';
(async()=>{ const arg=process.argv[2]||'0', out=process.argv[3];
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',args:['--use-gl=swiftshader','--enable-webgl']});
const p=await b.newPage({viewport:{width:1440,height:900}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.route(/three\.min\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/build/three.min.js'),contentType:'application/javascript'}));
await p.route(/OrbitControls\.js/,r=>r.fulfill({body:fs.readFileSync(SP+'/node_modules/three/examples/js/controls/OrbitControls.js'),contentType:'application/javascript'}));
await p.route(/fonts\.(googleapis|gstatic)|jspdf|autotable|d3/,r=>r.abort());
await p.goto('http://localhost:8765/index.html?x='+Date.now()); await p.waitForTimeout(8000);
await p.click('#wEx'); await p.click('#wList .ex[data-i="'+arg+'"]'); await p.waitForTimeout(9000);
await p.evaluate(()=>{ BD.flow.max=999; BD.flow.go(2); }); await p.waitForTimeout(4000);
await p.evaluate(async()=>{ const f=BD.eng.siteFacts(); await BD.eng.loadRecv(f.city); });
const res={arg,errs};
// deck charts v2
res.deck=await p.evaluate(async()=>{ const o=[]; const L=BD.deck.DECK.filter(d=>!d.when||d.when(BD.S.answers)); for(let i=0;i<L.length;i++){ BD.deck.show(i); await new Promise(r=>setTimeout(r,600)); const s=document.getElementById('side'); o.push({id:L[i].id,text:s.innerText,titles:[...document.querySelectorAll('#dchart title')].map(n=>n.textContent),cap:(document.querySelector('#dcap')||{}).textContent}); } return o; });
await p.evaluate(()=>{ BD.flow.go(2); }); await p.waitForTimeout(3000);
res.answers=await p.evaluate(()=>JSON.parse(JSON.stringify(BD.S.answers)));
res.topics={}; if(0) await p.evaluate(async()=>{ const T={}; for(const t of Object.keys(BD.explain.TOPICS)){ await BD.explain.open(t); const steps=[]; const w=document.getElementById('xp');
     for(let i=0;i<20;i++){ const xt=w.querySelector('.xtext'); const titles=[...w.querySelectorAll('.xvis title,.xvis2 title')].map(n=>n.textContent); const texts=[...w.querySelectorAll('.xvis text,.xvis2 text')].map(n=>n.textContent);
       steps.push({h:xt.querySelector('h2').textContent,p:xt.querySelector('p').textContent,titles,texts});
       const nb=document.getElementById('xpN'); if(nb.textContent.startsWith('Done')) break; nb.click(); }
     BD.explain.close(); T[t]=steps; } return T; });
res.R=await p.evaluate(()=>{ const R=BD.eng.R; return {pue:R.pue,lf:R.lf,capture:R.capture,cop:R.cop,grid:R.grid,homeMWh:R.homeMWh,reach:R.reach,reachGuide:R.reachGuide}; });
res.near=await p.evaluate(()=>{ const e=BD.eng,f=e.siteFacts(),d=BD.recv[f.city]; const n=e.nearby(f,d); const c={}; n.forEach(p=>{c[p.t]=(c[p.t]||0)+1}); const c15={}; d.pts.forEach(p=>{ const dd=Math.hypot(p.x-f.c[0],p.y-f.c[1]); if(dd<=1500) c15[p.t]=(c15[p.t]||0)+1; }); return {n:n.length,byType:c,within1500:c15}; });
fs.writeFileSync(out,JSON.stringify(res,null,1)); console.log('wrote',out,errs.length,'errors');
await b.close(); })();
