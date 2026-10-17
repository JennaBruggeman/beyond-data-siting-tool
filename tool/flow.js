/* Beyond Data — the guided path (J.B., 16 Oct 2026: "force users to follow a specific workflow because there's too many branches").
   One way through: welcome card → site → set-up → what fits → real buildings → heat → electricity → water → materials → people →
   each opportunity not ruled out here → what is not possible here → three options → over time → two cities → report.
   Back is allowed to any step already reached; there is no jumping ahead. Each step shows its 3D view as it opens.
   The report is built from what each step showed when it was passed, so it says exactly what the reader saw. */
(function(){
'use strict';
const BD=window.BD; const {$,esc}=BD;
const GROUPS=[['site','Site'],['fits','What fits'],['ex','Exchanges'],['opps','Opportunities'],['opts','Options'],['report','Report']];
const BASE=[
 {k:'site',g:'site',t:'Pick a site'},{k:'setup',g:'site',t:'Set up the site'},
 {k:'fits',g:'fits',t:'What fits'},{k:'prec',g:'fits',t:'Real buildings'},
 {k:'heat',g:'ex',t:'Heat'},{k:'energy',g:'ex',t:'Electricity'},{k:'water',g:'ex',t:'Water'},{k:'materials',g:'ex',t:'Materials'},{k:'social',g:'ex',t:'People'},
 {k:'opps',g:'opps',t:'Opportunities'},
 {k:'opts',g:'opts',t:'Three options'},{k:'time',g:'opts',t:'Over time'},
 {k:'cities',g:'report',t:'Two cities'},{k:'report',g:'report',t:'Report'}];
const F=BD.flow={on:true,steps:BASE.slice(),i:0,max:0,notes:{},busy:false};
document.body.classList.add('flow');

/* ---------- welcome card: pops up on load ---------- */
const EXAMPLES=[
 {lab:'Vancouver industrial lot',sub:'1425 Clark Dr · I-2 · new building',sel:{city:'van',tile:'2_1',id:'23060741'},ans:{built:'new',extent:'whole',floor:''}},
 {lab:'Edmonton industrial lot',sub:'12603 123 Street NW · IH · new building',sel:{city:'edm',tile:'-1_1',id:'883345'},ans:{built:'new',extent:'whole',floor:''}},
 {lab:'An existing downtown tower',sub:'555 W Hastings · one upper floor',sel:{city:'van',tile:'0_2',id:'59013407'},ans:{built:'existing',extent:'part',floor:'upper'}}];
function welcome(){ let w=$('#welcome'); if(w) w.remove(); w=document.createElement('div'); w.id='welcome'; w.setAttribute('role','dialog'); w.setAttribute('aria-modal','true'); w.setAttribute('aria-labelledby','wTitle');
  w.innerHTML=`<div class="wcard"><div class="kind">Beyond Data</div><h2 id="wTitle">What could a data centre exchange with the city around it?</h2>
  <p>Pick one lot. The tool walks you through <span class="k">heat, electricity, water, materials and people</span>, then every opportunity that could work there, then three options and a report.</p>
  <ol class="wsteps">${GROUPS.map(([,l],k)=>`<li><span>${k+1}</span>${l}</li>`).join('')}</ol>
  <div class="wbtns"><button class="pri" id="wEx">See a worked example</button><button class="sec" id="wOwn">Start with my own site</button></div>
  <div id="wList" hidden>${EXAMPLES.map((x,i)=>`<button class="ex" data-i="${i}"><b>${esc(x.lab)}</b><span>${esc(x.sub)}</span></button>`).join('')}</div>
  <p class="sub"><a href="#" id="wAbout">What this tool can't tell you</a></p></div>`;
  document.body.appendChild(w); w.insertBefore(arcs(),w.firstChild);
  for(const ev of ['pointerdown','wheel']) w.addEventListener(ev,e=>e.stopPropagation());
  $('#wEx').onclick=()=>{ $('#wList').hidden=false; $('#wEx').setAttribute('aria-expanded','true'); const b=$('#wList .ex'); if(b) b.focus(); };
  $('#wOwn').onclick=()=>{ w.remove(); go(0); };
  $('#wAbout').onclick=e=>{ e.preventDefault(); w.remove(); BD.views.about&&BD.views.about(); };
  w.querySelectorAll('.ex').forEach(b=>b.onclick=()=>{ w.remove(); runExample(+b.dataset.i); });
  setTimeout(()=>$('#wEx')&&$('#wEx').focus(),50); }
BD.welcome=welcome;
/* behind the welcome card: exchange lines arcing out from one lot, in the tool's colours (heat, water, place, people, grid) */
function arcs(){ const W=Math.max(window.innerWidth,800), H=Math.max(window.innerHeight,600); let s=7;
  const rnd=()=>{ s=(s*16807)%2147483647; return (s-1)/2147483646; };
  const NS='http://www.w3.org/2000/svg', svg=document.createElementNS(NS,'svg'); svg.setAttribute('class','wbg'); svg.setAttribute('viewBox',`0 0 ${W} ${H}`); svg.setAttribute('preserveAspectRatio','xMidYMid slice'); svg.setAttribute('aria-hidden','true');
  const C=[['#CC746C',9],['#e39a93',3],['#7fb2c4',5],['#86ada7',4],['#d1a35e',3],['#a7b4d6',3],['#55585d',40]];
  const pick=()=>{ let t=rnd()*C.reduce((a,c)=>a+c[1],0); for(const [c,w] of C){ if((t-=w)<=0) return c; } return C[C.length-1][0]; };
  const src=[W*0.3,H*0.74]; let h='';
  // a faint ground grid of points, like parcels seen from far away
  for(let i=0;i<220;i++){ const x=rnd()*W, y=H*0.35+rnd()*H*0.65; h+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="0.9" fill="#3a3c40"/>`; }
  const N=64; for(let i=0;i<N;i++){ let x,y,d; do{ x=W*(0.02+0.96*rnd()); y=H*(0.32+0.66*rnd()); d=Math.hypot(x-src[0],y-src[1]); }while(d<W*0.12);
    const lift=d*(0.16+0.3*rnd()), mx=(src[0]+x)/2, my=Math.min(src[1],y)-lift; const col=pick(), grey=col==='#55585d';
    const back=rnd()<0.25; const [x0,y0,x1,y1]=back?[x,y,src[0],src[1]]:[src[0],src[1],x,y];
    const len=Math.round(d*1.6);
    h+=`<path d="M${x0.toFixed(1)},${y0.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}" stroke="${col}" stroke-width="${grey?0.7:1.1}" stroke-opacity="${grey?0.55:0.75}" fill="none" ${rnd()<0.35?'stroke-dasharray="3 5"':''} style="--len:${len};animation-delay:${(i*35)}ms"/>`;
    if(!grey) h+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.2" fill="${col}" fill-opacity=".85"/>`; }
  h+=`<rect x="${(src[0]-7).toFixed(1)}" y="${(src[1]-7).toFixed(1)}" width="14" height="14" fill="none" stroke="#CC746C" stroke-width="1.4"/>`;
  svg.innerHTML=h; return svg; }
async function runExample(i){ const x=EXAMPLES[i]; reset(); F.exPending=true; Object.assign(BD.S.answers,x.ans,{mw:null});
  try{ if(BD.S.city!==x.sel.city) await BD.setCity(x.sel.city,true); await BD.select(Object.assign({quiet:true},x.sel)); F.sel=selKey(); F.sig=sigOf(); } finally{ F.exPending=false; } if(BD.S.sel) go(1); }

/* ---------- the bar at the top and the buttons at the bottom of the panel ---------- */
function bar(){ const st=F.steps[F.i], gi=GROUPS.findIndex(g=>g[0]===st.g); const inG=F.steps.filter(s=>s.g===st.g), j=inG.indexOf(st);
  const reachG=g=>F.steps.findIndex((s,k)=>s.g===g&&k<=F.max)>=0;
  return `<div class="flowbar"><nav class="path" aria-label="Steps">${GROUPS.map(([g,l],k)=>`<button data-fg="${g}" title="${l}" aria-label="${k+1} ${l}" ${k===gi?'aria-current="step"':''} ${reachG(g)?'':'disabled'}><span>${k+1}</span>${k===gi?l:''}</button>`).join('')}</nav>
  ${inG.length>1?`<div class="fsub">${esc(st.t)} · ${j+1} of ${inG.length}${F.steps[F.i].k.startsWith('opp:')||st.k==='opps'?'':''}</div>`:''}</div>`; }
function foot(){ const st=F.steps[F.i], nx=F.steps[F.i+1], pv=F.steps[F.i-1]; const blocked=st.k==='site'&&!BD.S.sel;
  return `<div class="flowfoot">${pv?`<button class="sec" id="fBack">← ${esc(pv.t)}</button>`:'<span></span>'}${nx?`<button class="${st.k==='setup'?'sec':'pri'}" id="fNext" ${blocked?'disabled':''}>${blocked?'Pick a site first':st.k==='setup'?'Keep the defaults →':`Next: ${esc(nx.t)} →`}</button>`:''}</div>`; }
function decorate(){ const sd=$('#side'); if(!sd||!F.on) return; F.busy=true;
  try{ sd.querySelectorAll(':scope > .flowbar, :scope > .flowfoot').forEach(x=>x.remove()); sd.insertAdjacentHTML('afterbegin',bar()); sd.insertAdjacentHTML('beforeend',foot());
    sd.querySelectorAll('.flowbar [data-fg]').forEach(b=>b.onclick=()=>{ const k=F.steps.findIndex(s=>s.g===b.dataset.fg); if(k>=0&&k<=F.max) go(k); });
    const bk=$('#fBack'); if(bk) bk.onclick=back; const nx=$('#fNext'); if(nx) nx.onclick=next; }
  finally{ setTimeout(()=>{ F.busy=false; },0); } }
(function watch(){ const sd=$('#side'); if(!sd) return setTimeout(watch,200);
  new MutationObserver(()=>{ if(F.busy||!F.on) return;
    if(!BD.S.sel&&(F.i>0||F.max>0)){ reset(); F.sel=""; }   // the site was cleared: back to the start
    else if(BD.S.sel&&selKey()!==F.sel){ const ex=F.exPending; F.sel=selKey(); if(!ex){ reset(); F.i=1; F.max=1; F.sig=sigOf(); } }   // a new parcel: start its set-up
    if(!sd.querySelector(':scope > .flowbar')||!sd.querySelector(':scope > .flowfoot')) decorate(); }).observe(sd,{childList:true}); })();

/* ---------- moving along ---------- */
function reset(){ F.steps=BASE.slice(); F.i=0; F.max=0; F.notes={}; F.sig=undefined; }
async function expandOpps(){ const k=F.steps.findIndex(s=>s.k==='opps'); if(k<0) return;
  await BD.oppPrep(); const L=BD.oppScreen(); F.oppList=L; const ok=L.filter(o=>o.s!=='no');
  const add=ok.map((o,j)=>({k:'opp:'+o.n,g:'opps',t:o.n,n:o.n,j:j+1,of:ok.length})).concat([{k:'opps-rest',g:'opps',t:'Not possible here'}]);
  F.steps.splice(k,1,...add); }
async function go(i){ if(i<0||i>=F.steps.length) return; invalidate(); capture(); F.i=i; F.max=Math.max(F.max,i); document.body.classList.remove('wide');
  if(F.steps[i].k==='opps'){ await expandOpps(); }
  const st=F.steps[F.i]; if(BD.drawer&&BD.drawer.isOpen()&&st.k!=='setup') BD.drawer.close();
  try{ await show(st); }catch(e){ console.warn(e); }
  decorate(); const sd=$('#side'); if(sd) sd.scrollTop=0; }
function next(){ if(F.steps[F.i].k==='site'&&!BD.S.sel) return; go(F.i+1); }
function back(){ go(F.i-1); }
async function show(st){ const k=st.k;
  if(k==='site'){ BD.S.view2=null; BD.scene3d&&BD.scene3d.hide(); if(BD.S.sel) BD.card(); else BD.intro(); BD.draw(); return; }
  if(k==='setup'){ BD.S.view2=null; BD.scene3d&&BD.scene3d.hide(); BD.card(); BD.setup.start(); return; }
  if(k==='fits'){ BD.scene3d&&BD.scene3d.hide(); BD.fitsView(); return; }
  if(k.startsWith('opp:')) return BD.oppStep(st.n,st.j,st.of);
  if(k==='opps-rest') return BD.oppRest(F.oppList||[]);
  if(k==='report') return reportView();
  BD.tabView(k); }
F.next=next; F.back=back; F.go=go; F.to=k=>{ const i=F.steps.findIndex(s=>s.k===k); if(i>=0) go(i); };

/* picking another parcel on the map sends the path back to the set-up step; changing an answer (set-up, size, cooling) drops what later steps showed */
const selKey=()=>BD.S.sel?BD.S.sel.city+':'+BD.S.sel.id:'';
const sigOf=()=>{ const A=Object.assign({},BD.S.answers); delete A.mwSite; delete A.setupDone; return JSON.stringify(A); };
function invalidate(){ const sig=sigOf(); if(F.sig!==undefined&&sig!==F.sig){ F.max=F.i; for(const s of F.steps.slice(F.i+1)) delete F.notes[s.k];
    const k=F.steps.findIndex(s=>s.k.startsWith('opp:')||s.k==='opps-rest'); if(k>F.i) F.steps=F.steps.slice(0,k).concat(BASE.slice(BASE.findIndex(b=>b.k==='opps'))); }
  F.sig=sig; }
/* the start panel: short, with a way back to the examples */
BD.afterIntro=function(){ const sd=$('#side'); if(!sd) return; sd.querySelectorAll('ol.sub').forEach(x=>x.remove());
  sd.insertAdjacentHTML('beforeend',`<p class="sub"><a href="#" id="reWelcome">Use a worked example instead</a></p>`); $('#reWelcome').onclick=e=>{ e.preventDefault(); welcome(); }; };

/* ---------- what each step showed, kept for the report ---------- */
function clean(el){ const c=el.cloneNode(true); c.querySelectorAll('button,.mo,svg,script').forEach(x=>x.remove()); c.querySelectorAll('td,th,small,li,dd,dt,div,p,.cls,.pill,.evb,br').forEach(x=>x.append(' ')); c.querySelectorAll('.more').forEach(x=>x.hidden=false); return (c.textContent||'').replace(/\s+/g,' ').trim(); }
function tableData(t){ return [...t.rows].map(r=>({party:r.classList.contains('party'),head:r.parentElement.tagName==='THEAD',cells:[...r.cells].map(clean)})); }
function capture(){ const st=F.steps[F.i]; const sd=$('#side'); if(!st||!sd||!BD.S.sel||st.k==='report'||st.k==='site') return;
  const h2=sd.querySelector('h2'); const lead=sd.querySelector('.lead')||sd.querySelector('p.draft');
  const secs=[...sd.querySelectorAll('details.sec')].filter(d=>!d.closest('details.fp')).map(d=>{ const t=d.querySelector(':scope > summary .t'), a=d.querySelector(':scope > summary .a'); return [t?clean(t):'',a?clean(a):'']; }).filter(r=>r[0]);
  sd.querySelectorAll('.sumrow').forEach(r=>{ const c=r.querySelectorAll('span'); if(c.length>=2) secs.push([clean(c[0]),clean(c[1])]); });
  const tables=[...sd.querySelectorAll('.tt table, table.cl')].filter(t=>!t.closest('details.fp')).map(tableData);
  const srcs=[...sd.querySelectorAll('details.fp')].map(d=>{ const c=d.cloneNode(true); const s=c.querySelector('summary'); if(s) s.remove(); return clean(c); }).filter(Boolean);
  const rows=st.k==='opps-rest'?[...sd.querySelectorAll('.addrow')].map(r=>clean(r)):[];
  const secs2=st.k.startsWith('opp:')?[]:secs.filter(r=>r[0]!=='Compared with other data centres');
  F.notes[st.k]={t:st.t,g:st.g,title:h2?clean(h2):st.t,lead:lead?clean(lead):'',secs:secs2,tables,srcs,rows}; }

/* ---------- step 6: the report, on screen and as HTML or PDF ---------- */
function facts(){ const e=BD.eng, f=e.siteFacts(), A=BD.S.answers, a=BD.S.sel.a||[], rng=e.rng;
  return [['Site',`${a[0]||'No civic address'}, ${f.city==='van'?'Vancouver':'Edmonton'}`],['Zone',`${f.zone||'—'}: ${f.status.t}`],['Lot',`${BD.fmt(f.lot||0)} m²`],
   ['Floor area available',`${f.fullCover?'up to ':''}${rng(f.gross[0],f.gross[1],'m²')}`],['Largest that fits',rng(f.mw[0],f.mw[1],'MW of servers')],['Size tested',`${A.mw||1} MW of servers`],
   ['Set-up',`${A.built==='existing'?'existing building':'new building'}, ${A.inside||'air'} cooling inside, ${A.outside||'dry'} coolers outside`]]; }
const ORDERG=['site','fits','ex','opps','opts','report'];
function reportData(){ const groups=[]; for(const [g,l] of GROUPS){ const items=F.steps.filter(s=>s.g===g&&F.notes[s.k]).map(s=>F.notes[s.k]); if(items.length) groups.push({g,l,items}); }
  const seen=new Set(), srcs=[]; for(const s of Object.values(F.notes).flatMap(n=>n.srcs)){ const key=s.toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,90); if(!seen.has(key)){ seen.add(key); srcs.push(s); } } return {facts:facts(),groups,srcs,date:new Date().toISOString().slice(0,10)}; }
function stepHTML(n,wide){ let h=`<h3>${esc(n.title)}</h3>${n.lead?`<p class="rl">${esc(n.lead)}</p>`:''}`;
  if(n.secs.length) h+=`<dl class="rd">${n.secs.map(([t,a])=>`<dt>${esc(t)}</dt><dd>${esc(a)}</dd>`).join('')}</dl>`;
  if(n.rows&&n.rows.length) h+=`<ul class="rr">${n.rows.map(r=>`<li>${esc(r)}</li>`).join('')}</ul>`;
  if(wide) for(const T of n.tables) h+=`<div class="rt"><table>${T.map(r=>r.party?`<tr class="party"><td colspan="9">${esc(r.cells[0])}</td></tr>`:`<tr>${r.cells.map(c=>r.head?`<th>${esc(c)}</th>`:`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</table></div>`;
  return h; }
function reportView(){ const e=BD.eng; capture(); const D=reportData(); BD.S.view2='tab'; BD.S.tab='report'; BD.scene3d&&BD.scene3d.hide();
  const tabSteps=new Set(['opts','cities','opps-rest']);
  $('#side').innerHTML=`<h2>Report</h2><p class="lead">Everything this path showed for <span class="k">${esc(D.facts[0][1])}</span>, in one place. Nothing is added up; nothing wins.</p>
  <div class="rbtns">${BD.dl?`<button class="pri" id="rHtml">Download HTML</button><button class="pri" id="rPdf">Download PDF</button>`:'<p class="sub">Downloads are not available in this view.</p>'}</div><p class="sub" id="rMsg"></p>
  <div class="report"><h3>Baseline</h3><dl class="rd">${D.facts.map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
  ${D.groups.map(G=>`<h2 class="rg">${esc(G.l)}</h2>${G.items.map(n=>stepHTML(n,tabSteps.has(Object.keys(F.notes).find(k=>F.notes[k]===n)))).join('')}`).join('')}
  <h2 class="rg">Read with</h2><p class="sub">Ranges, not designs. Operator figures are claims. Heat available is not heat used. "Not yet known" names what is missing.</p>
  ${D.srcs.length?`<details class="fp"><summary>Sources (${D.srcs.length})</summary>${D.srcs.map(s=>`<p class="src">${esc(s)}</p>`).join('')}</details>`:''}</div>`;
  document.body.classList.add('wide'); BD.draw();
  const msg=t=>{ const m=$('#rMsg'); if(m) m.textContent=t; };
  const hb=$('#rHtml'); if(hb) hb.onclick=async()=>{ try{ await BD.dl.save({filename:fname(D,'html'),data:new Blob([docHTML(D)],{type:'text/html'})}); msg('Saved.'); }catch(err){ msg(err&&err.code==='declined'?'Not saved.':'The report was not saved'+(err&&err.code?` (${err.code})`:'')+'.'); } };
  const pb=$('#rPdf'); if(pb) pb.onclick=async()=>{ pb.disabled=true; msg('Building the PDF…'); try{ const blob=await docPDF(D); await BD.dl.save({filename:fname(D,'pdf'),data:blob}); msg('Saved.'); }catch(err){ msg(err&&err.code==='declined'?'Not saved.':'The PDF was not saved'+(err&&(err.code||err.message)?` (${err.code||err.message})`:'')+'.'); } finally{ pb.disabled=false; } };
}
BD.views.report=reportView;
const fname=(D,ext)=>`beyond-data-report-${D.facts[0][1].replace(/[^A-Za-z0-9]+/g,'-').toLowerCase().replace(/^-|-$/g,'')}.${ext}`;
function docHTML(D){ const all=Object.entries(F.notes);
  const body=D.groups.map(G=>`<h2>${esc(G.l)}</h2>${G.items.map(n=>stepHTML(n,true)).join('')}`).join('');
  return `<!doctype html><html lang="en-CA"><head><meta charset="utf-8"><title>Beyond Data report: ${esc(D.facts[0][1])}</title>
<style>body{font-family:'Open Sans',Arial,sans-serif;font-weight:300;color:#222;max-width:820px;margin:32px auto;padding:0 20px;line-height:1.45;font-size:14px}
h1{font-weight:300;margin:0 0 4px}h2{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#CC746C;margin:30px 0 6px;border-top:1px solid #ddd;padding-top:14px}
h3{font-size:15px;font-weight:600;margin:18px 0 4px}.rl{margin:0 0 8px}dl{display:grid;grid-template-columns:minmax(140px,32%) 1fr;gap:3px 14px;margin:6px 0}dt{color:#555}dd{margin:0}
table{border-collapse:collapse;width:100%;font-size:12px;margin:6px 0}td,th{border-bottom:1px solid #e3e3e3;padding:4px 6px;text-align:left;vertical-align:top}tr.party td{font-weight:600;color:#CC746C;padding-top:10px}
.small{font-size:11px;color:#777}ul{margin:4px 0;padding-left:18px}@media print{h2{break-after:avoid}h3{break-after:avoid}}</style></head><body>
<div class="small">BEYOND DATA · REPORT · ${D.date}</div><h1>${esc(D.facts[0][1])}</h1>
<h2>Baseline</h2><dl>${D.facts.map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>${body}
<h2>Read with</h2><p class="small">Ranges, not designs: screening figures from published sources, not a substitute for an engineer, a utility study or a permit review. Operator figures are claims. Heat available is not heat used. Nothing is added up and nothing wins.</p>
<h2>Sources</h2>${D.srcs.map(s=>`<p class="small">${esc(s)}</p>`).join('')}</body></html>`; }

/* PDF: jsPDF and its table plug-in, loaded only when asked for. The standard PDF fonts cover Latin-1 only, so a few symbols are spelled out. */
const PDFLIB=['https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js','https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js'];
function load(src){ return new Promise((ok,no)=>{ const s=document.createElement('script'); s.src=src; s.onload=ok; s.onerror=()=>no(new Error('could not load the PDF library')); document.head.appendChild(s); }); }
const MAP={'≈':'~','≥':'>=','≤':'<=','→':'->','←':'<-','−':'-','₂':'2','₃':'3','‑':'-',' ':' ',' ':' ','✓':'yes','✕':'no','›':'>','‹':'<','…':'...','—':'-','–':'-','’':"'",'‘':"'",'“':'"','”':'"','•':'-','·':'-','÷':'/','×':'x'};
const L1=t=>String(t||'').replace(/[^\x00-\xff]/g,ch=>MAP[ch]!==undefined?MAP[ch]:'?');
async function docPDF(D){ if(!window.jspdf) await load(PDFLIB[0]); if(!(window.jspdf&&window.jspdf.jsPDF&&window.jspdf.jsPDF.API.autoTable)) await load(PDFLIB[1]);
  const {jsPDF}=window.jspdf; const doc=new jsPDF({unit:'pt',format:'letter'}); const W=doc.internal.pageSize.getWidth(), H=doc.internal.pageSize.getHeight(), M=54; let y=M;
  const acc=[204,116,108], grey=[110,110,110], ink=[34,34,34];
  const room=h=>{ if(y+h>H-M){ doc.addPage(); y=M; } };
  const text=(t,o)=>{ o=o||{}; doc.setFont('helvetica',o.bold?'bold':'normal'); doc.setFontSize(o.size||10); doc.setTextColor(...(o.color||ink)); const lines=doc.splitTextToSize(L1(t),W-2*M-(o.indent||0)); const lh=(o.size||10)*1.35; for(const ln of lines){ room(lh); doc.text(ln,M+(o.indent||0),y+(o.size||10)); y+=lh; } y+=o.after||0; };
  const table=(rows,o)=>{ if(!rows.length) return; doc.autoTable({body:rows,startY:y,margin:{left:M,right:M},styles:{font:'helvetica',fontSize:8.5,cellPadding:3,textColor:ink,lineColor:[225,225,225],lineWidth:0.5},headStyles:{fillColor:[245,245,245],textColor:ink,fontStyle:'bold'},theme:'plain',...o}); y=doc.lastAutoTable.finalY+10; };
  const kv=rows=>table(rows.map(([k,v])=>[L1(k),L1(v)]),{columnStyles:{0:{cellWidth:150,textColor:grey}}});
  text('BEYOND DATA - REPORT - '+D.date,{size:8,color:grey,after:4}); text(D.facts[0][1],{size:20,after:10});
  text('BASELINE',{size:9,bold:true,color:acc,after:2}); kv(D.facts);
  for(const G of D.groups){ room(40); y+=6; doc.setDrawColor(220); doc.line(M,y,W-M,y); y+=8; text(G.l.toUpperCase(),{size:9,bold:true,color:acc,after:2});
    for(const n of G.items){ room(30); text(n.title,{size:12,bold:true,after:2}); if(n.lead) text(n.lead,{size:10,after:4}); if(n.secs.length) kv(n.secs); if(n.rows&&n.rows.length) for(const r of n.rows) text('- '+r,{size:9,indent:6});
      for(const T of n.tables){ const head=T.filter(r=>r.head).map(r=>r.cells.map(L1)); const body=T.filter(r=>!r.head).map(r=>r.party?[{content:L1(r.cells[0]),colSpan:Math.max(1,...T.map(x=>x.cells.length)),styles:{fontStyle:'bold',textColor:acc}}]:r.cells.map(L1)); table(body,{head:head.length?head:undefined}); } } }
  room(40); y+=6; text('READ WITH',{size:9,bold:true,color:acc,after:2}); text('Ranges, not designs: screening figures from published sources, not a substitute for an engineer, a utility study or a permit review. Operator figures are claims. Heat available is not heat used. Nothing is added up and nothing wins.',{size:9,after:6});
  text('SOURCES',{size:9,bold:true,color:acc,after:2}); for(const s of D.srcs) text(s,{size:7.5,color:grey,after:2});
  const n=doc.getNumberOfPages(); for(let p=1;p<=n;p++){ doc.setPage(p); doc.setFontSize(7.5); doc.setTextColor(...grey); doc.text(`${p} / ${n}`,W-M,H-28,{align:'right'}); }
  return doc.output('blob'); }

/* start: the welcome card, unless a parcel link was opened (then straight to the set-up) */
function boot(){ if(!BD.S||!BD.intro) return setTimeout(boot,200); if(!BD.S.sel&&!BD.S.view2) BD.intro(); if(BD.S.sel){ F.sel=selKey(); F.sig=sigOf(); F.i=1; F.max=1; decorate(); } else { decorate(); welcome(); } }
setTimeout(boot,400);
})();
