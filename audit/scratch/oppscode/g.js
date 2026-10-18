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
const out=await p.evaluate(async()=>{ await BD.oppPrep(); const res={}; const f=BD.eng.siteFacts(); const M=f.M; const R=BD.eng.R;
  const ord=[].concat(...BD.oppFams.map(()=>[]));
  const g0=BD.oppGatesFor('Greenhouse'); const c=g0.c;
  res.site={city:f.city,zone:f.zone,lot:f.lot,fmw:f.mw,answers:JSON.parse(JSON.stringify(BD.S.answers)),mwSized:M&&M.mwSized,mwProv:M&&M.mwProvisional,footArea:M&&M.footArea,free:c.free,ctxmw:c.mw,avail:c.r.avail,itMWh:c.r.itMWh,ground:f.ground,roof:BD.eng.roofArea(f),capture:R.capture,homeMWh:R.homeMWh,pue:R.pue,lf:R.lf,nets:c.nets.map(n=>({n:n.n,inside:n.inside,edge:n.edge,src:n.src})),rkeys:Object.keys(c.r)};
  res.rsample={}; for(const k of Object.keys(c.r)){ const v=c.r[k]; if(typeof v!=='object'||Array.isArray(v)&&v.length<5) res.rsample[k]=v; }
  const names=['District heat to a network','Hospital or campus anchor','New district with the data centre as heat plant','Greenhouse','Aquaculture / insects / algae','Seasonal storage in the ground','Sewage heat as comparator source','Distributed servers as heaters','Reserved capacity and batteries to the grid','EV charging hub','Rainwater, condensate and water reuse','Meanwhile uses on land held for growth','Warming centre, refuge, clean-air room','Cooling for neighbours','Material bank: copper'];
  res.g={}; for(const n of names){ const g=BD.oppGatesFor(n); res.g[n]={s:g.s,G:g.G}; }
  return res; });
out.errs=errs; fs.writeFileSync(process.argv[3],JSON.stringify(out,null,1)); await b.close(); })();
