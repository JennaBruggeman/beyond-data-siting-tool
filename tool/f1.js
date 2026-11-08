/* Beyond Data — F1 site shell (CODE_JOB_F1_site_build.md, step 1, 7 Nov 2026; Final_F_Landing, STYLE.md).
   The landing page is the first screen; the old tool keeps working behind it ("Old tool"). Each template row has Start and See the cards.
   See the cards opens the template's card sequence on the example lot (Vancouver 339 1st Ave E, 63819485; Edmonton 64 Airport Rd NW, 146402) in the card
   shell of STYLE.md §4, read-only, with Back / Next, a city switch and a strip to jump. Step 1 builds the shell only: the cards' drawings and figures
   are built in steps 2–4, so each card says which step builds it (no figure, no placeholder drawing).
   Card lists: job sheet §3 as updated 7 Nov (Resident 4, Municipal 12, Engineering 12; two cities parked). Chapters: Architecture from WORKLIST (Compare under
   Visualize, as Story_Architecture has it); the others from their storyboards (Story_Municipal, Story_Engineering, Story_Resident, 5 Nov 2026); Municipal's
   'Industrial land and jobs' in Use, after 'Is a data centre allowed?' (gate 2, 7 Nov). Job F1b (8 Nov): 11 cards; rooftop equipment folded into Height and floor area. 'How it works' opens the logic view (f1logic.js, §3d).
   Images: the tool's own 3-D view of 339 1st Ave E (checks/tests/f1_capture.js; City of Vancouver open data only). */
(function(){
'use strict';
const BD=window.BD; const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const LOTS={van:{city:'van',tile:'1_1',id:'63819485',name:'Vancouver'},edm:{city:'edm',tile:'-1_1',id:'146402',name:'Edmonton'}};
const C=(chap,list)=>list.map(t=>({chap,t}));
const TPL=[
 {id:'resident',name:'Resident',tier:'resident',tab:'resident',step:5,who:'For people who live near a data centre. Where data centres are, how one operates with the information there is, and a report on it.',img:'resident',
  cards:[...C('Find',['Your city','Find a data centre']),...C('The facility',['What it is']),...C('Report',['Report'])]},
 {id:'municipal',name:'Municipal',tier:null,tab:'municipal',step:3,who:'For planners and councillors. One parcel’s rules, one rule per card: limits, not designs.',img:'municipal',
  cards:[...C('Site',['Your city','Your parcel']),...C('Use',['Is a data centre allowed?','Industrial land and jobs']),...C('Building rules',['Height and floor area','Yards by edge','Noise limits around the lot','Storeys and street frontage','Loading']),...C('Process',['Approval process']),...C('Report',['Report'])]},
 {id:'engineering',name:'Engineering',tier:'full',tab:'full',step:4,who:'For engineers and operators. What fits on the lot, the cooling and backup choices, and what it could exchange with the city.',img:'engineering',
  cards:[...C('Site',['Your city','Your parcel']),...C('Set-up',['What fits','Cooling','Backup power','Noise']),...C('Exchanges',['Heat offered','Who could take it','Electricity','Water','Materials']),...C('Report',['Report'])]}, /* 12 cards (job sheet, J.B. 8 Nov): three options folded into Cooling, could become dropped */
 {id:'architecture',name:'Architecture',tier:'arch',tab:'arch',step:2,who:'For architects. A data centre and public programs on one lot, laid out from a library and checked against the main code moves.',img:'architecture',
  cards:[...C('Site',['Your city','Your parcel','People nearby','Programs nearby','Heat receivers nearby','What the lot allows','Ground and flood','Neighbours and views']),
   ...C('Typology',['Pick a typology','Variant and add-ons','The governing principle','The numbers','What’s left for neighbours']),
   ...C('Checks',['Rooms','Separations','Exits','Plant and site']),...C('Visualize',['Heat flow','Program diagram','Drawing styles','Compare']),...C('Report',['Report'])]}];
TPL.forEach(t=>t.chaps=[...new Set(t.cards.map(c=>c.chap))]);
const STEPNAME={2:'step 2 (Architecture cards)',3:'step 3 (Municipal cards)',4:'step 3 (Engineering cards)',5:'step 3 (Resident cards, after the facility inventory)'};

/* ---------- landing (Final_F_Landing) ---------- */
function howSvg(){ /* the logic in eight parts (board Final_F_Landing): boxes and curved links, INK lines on white boxes */
  const N={lot:[60,80,'Lot'],zon:[60,190,'Zoning'],size:[230,45,'Size'],eq:[230,135,'Equipment'],nb:[230,225,'Neighbours'],heat:[400,80,'Heat'],rules:[400,190,'Rules'],rep:[570,135,'Report']};
  const E=[['lot','size'],['lot','eq'],['zon','eq'],['zon','nb'],['size','heat'],['eq','heat'],['eq','rules'],['nb','rules'],['heat','rep'],['rules','rep']], w=80, h=26;
  const path=([a,b])=>{ const [x1,y1]=N[a], [x2,y2]=N[b], sx=x1+w/2, ex=x2-w/2, mx=(sx+ex)/2; return `<path d="M${sx} ${y1}C${mx} ${y1} ${mx} ${y2} ${ex} ${y2}" fill="none" stroke="#A9ABAF" stroke-width="1"/>`; };
  return `<svg viewBox="0 0 630 270" role="img" aria-label="How the tool's logic runs: lot and zoning feed size, equipment and neighbours, which feed heat and rules, which feed the report">${E.map(path).join('')}${Object.values(N).map(([x,y,t])=>`<rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="3" fill="#fff" stroke="#16181B" stroke-width="1"/><text x="${x}" y="${y+4.5}" text-anchor="middle" font-size="12.5" fill="#16181B" font-family="IBM Plex Sans,system-ui,sans-serif">${t}</text>`).join('')}</svg>`; }
function landing(){ let L=document.getElementById('f1'); if(L) L.remove(); L=document.createElement('div'); L.id='f1';
  L.innerHTML=`<div class="f1-wrap">
   <header class="f1-head"><a class="f1-app" href="#" data-go="top">Beyond Data</a><nav class="f1-nav" aria-label="Site"><a href="#f1-work">Workflows</a><a href="#" data-go="logic">How it works</a><a href="#" data-go="logic">Sources</a><a href="#" class="f1-old" data-go="old">Old tool</a></nav></header>
   <section class="f1-hero"><div><h1>What could a data centre give the city around it?</h1>
     <p class="f1-lead">Test real lots in Vancouver and Edmonton: what a data centre could share with its neighbours, and what stands in the way.</p>
     <div class="f1-acts"><button class="f1-btn" data-go="work">Choose a workflow</button><button class="f1-link" data-go="logic">How it works</button></div></div>
    <figure class="f1-heroimg"><img src="f1/img/hero.png" alt="339 1st Ave E, Vancouver, in the tool's 3-D view: the data centre's equipment and its yard among the neighbouring buildings"><figcaption class="f1-cap">339 1st Ave E, Vancouver. The tool's 3-D view: a data centre's equipment and plant yard among its neighbours.</figcaption></figure></section>
   <div class="f1-lines"><p>Vancouver and Edmonton, built to the same depth.</p><p>Four workflows, each ending in its own report.</p><p>Every figure has a source, or a “?” where it doesn’t yet.</p><p>Trade-offs, not verdicts. Code limits block; options are flagged.</p></div>
   <section id="f1-work"><div class="f1-sechead"><h2>Workflows</h2><span>Each one shows one idea per card, then makes a report.</span></div>
    ${TPL.map(t=>`<div class="f1-row"><h3>${t.name}</h3><div><p class="who">${esc(t.who)}</p><div class="ract"><button class="f1-btn" data-start="${t.id}"${t.tier?'':' disabled'}>Start</button><button class="f1-link" data-see="${t.id}">See the cards</button></div>${t.tier?'':'<div class="note">Start opens when the Municipal cards are built.</div>'}</div>
      <div class="meta">${t.cards.length} steps<br>report</div><img src="f1/img/${t.img}.png" alt="${t.name}: the tool's 3-D view of 339 1st Ave E, Vancouver" loading="lazy"></div>`).join('')}</section>
   <section class="f1-how" id="f1-how"><div><h2>How it works</h2><p>One logic runs under all four workflows. Every number in it is tied to a source and a check status, so a reader can follow any figure back to where it came from.</p><button class="f1-link" data-go="logic">See the logic</button></div>${howSvg()}</section>
   <footer class="f1-foot"><span>Beyond Data · ARCH 540, UBC School of Architecture and Landscape Architecture · 2026</span><span>Data: City of Vancouver and City of Edmonton open data. Maker and operator figures are labelled as claims.</span></footer></div>`;
  document.body.appendChild(L);
  L.addEventListener('click',e=>{ const g=e.target.closest('[data-go],[data-start],[data-see]'); if(!g) return;
    if(g.dataset.go==='old'){ e.preventDefault(); L.remove(); return; }
    if(g.dataset.go==='logic'){ e.preventDefault(); if(BD.f1logic) BD.f1logic.open({tab:'all'}); return; }
    if(g.dataset.go==='work'){ L.querySelector('#f1-work').scrollIntoView({behavior:'smooth'}); return; }
    if(g.dataset.go==='top'){ e.preventDefault(); L.scrollTo({top:0,behavior:'smooth'}); return; }
    if(g.dataset.start){ const t=TPL.find(x=>x.id===g.dataset.start); if(!t||!t.tier) return; /* step 1: the cards are not built, so Start opens the old tool in this template, at its site picker */
      if(BD.setTier) BD.setTier(t.tier); L.remove(); return; }
    if(g.dataset.see) viewer(g.dataset.see); });
  L.querySelectorAll('a[href^="#f1-"]').forEach(a=>a.addEventListener('click',e=>{ e.preventDefault(); const s=L.querySelector(a.getAttribute('href')); if(s) s.scrollIntoView({behavior:'smooth'}); })); }

/* ---------- card viewer (STYLE.md §4 shell) ---------- */
const V={t:null,i:0,city:'van',where:''};
async function loadLot(city){ const S=LOTS[city]; V.where='…'; V.ready=false; draw();
  try{ if(BD.S.city!==city&&BD.setCity) await BD.setCity(city,true); await BD.select({city:S.city,tile:S.tile,id:S.id,quiet:true}); BD.modelReset(); const M=BD.model(), a=BD.S.sel&&BD.S.sel.a;
    V.where=[a&&a[0]?titleCase(a[0]):S.id, M&&M.Z&&(M.Z.zone||M.Z.key)].filter(Boolean).join(' · '); }
  catch(e){ V.where=S.id+' (lot not loaded: '+String(e.message||e).slice(0,60)+')'; }
  V.ready=true; draw(); }
const titleCase=s=>String(s).toLowerCase().replace(/\b([a-z])/g,c=>c.toUpperCase()).replace(/\b(\d+)(St|Nd|Rd|Th)\b/g,(m,n,x)=>n+x.toLowerCase()).replace(/\b(Nw|Ne|Sw|Se)\b/g,m=>m.toUpperCase());
function viewer(id){ V.t=TPL.find(x=>x.id===id); V.i=0; let W=document.getElementById('f1v'); if(!W){ W=document.createElement('div'); W.id='f1v'; W.setAttribute('role','dialog'); W.setAttribute('aria-modal','true'); document.body.appendChild(W);
    W.addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return; const d=b.dataset;
      if(d.x!=null){ W.remove(); return; } if(d.how){ const c=V.t.cards[V.i]; if(BD.f1logic) BD.f1logic.open(d.how==='all'?{tab:V.t.tab}:{tab:V.t.tab,label:c.t,ids:BD.f1logic.cardIds(c.t,V.t.tab),lot:V.where}); return; } if(d.city){ if(d.city!==V.city){ V.city=d.city; loadLot(V.city); } return; }
      if(d.to!=null){ V.i=+d.to; draw(); return; } if(d.chap!=null){ V.i=V.t.cards.findIndex(c=>c.chap===d.chap); draw(); return; }
      if(d.step==='back'&&V.i>0){ V.i--; draw(); } if(d.step==='next'&&V.i<V.t.cards.length-1){ V.i++; draw(); } });
    document.addEventListener('keydown',e=>{ if(!document.getElementById('f1v')) return; if(e.key==='Escape') document.getElementById('f1v').remove(); if(e.key==='ArrowRight'&&V.i<V.t.cards.length-1){ V.i++; draw(); } if(e.key==='ArrowLeft'&&V.i>0){ V.i--; draw(); } }); }
  draw(); loadLot(V.city); }
function draw(){ const W=document.getElementById('f1v'); if(!W||!V.t) return; const t=V.t, c=t.cards[V.i], n=t.cards.length, ci=t.chaps.indexOf(c.chap), spec=BD.f1cards&&BD.f1cards.get(t.id,c.t);
  W.innerHTML=`<header class="f1v-head"><span class="f1-app">Beyond Data</span><span class="tpl">${t.name}</span>
     <nav class="f1v-chap" aria-label="Chapters">${t.chaps.map((h,k)=>`<button data-chap="${esc(h)}" class="${k<ci?'past':k===ci?'now':''}"${k===ci?' aria-current="step"':''}>${esc(h)}</button>`).join('')}</nav>
     <span class="f1v-where">${esc(V.where)}</span>
     <div class="f1v-city" role="group" aria-label="Example lot">${Object.values(LOTS).map(l=>`<button data-city="${l.city}" aria-pressed="${l.city===V.city}">${l.name}</button>`).join('')}</div>
     <button class="f1v-how" data-how="all">How it works</button><button class="f1v-x" data-x aria-label="Close the cards">Close</button></header>
   <div class="f1v-body"><main class="f1v-main"><div class="f1v-chips"><span class="f1v-chip">${spec?esc(spec.chip||'Example lot · read-only'):'Preview · not built yet'}</span></div>
     <div class="f1v-draw">${spec?'<p class="f1v-empty">Drawing…</p>':''}${spec?'':`<p class="f1v-empty">This card’s drawing and figures are built in ${STEPNAME[t.step]} of the site build. It will read the example lot above and what the cards before it chose.</p>`}</div>
     <button class="f1v-how" data-how="card">How this is worked out</button><details class="f1v-src"><summary>Sources and assumptions</summary><p>Nothing on this card yet. Every figure will come from the tool, with its source here, or show as a red “?”.</p></details></main>
    <aside class="f1v-panel"><div class="chap">${esc(c.chap)}</div><h2>${esc(c.t)}</h2><div class="f1c-body">${spec?'':`<p class="lead">${t.name} · card ${V.i+1} of ${n}.</p>`}</div><div class="grow"></div>
     <div class="f1v-nav"><button class="f1v-back" data-step="back"${V.i?'':' disabled'}>Back</button><button class="f1-btn" data-step="next"${V.i<n-1?'':' disabled'}>${V.i<n-1?'Next':'Last card'}</button></div><div class="f1v-no">${V.i+1} / ${n}</div></aside></div>
   <nav class="f1v-strip" aria-label="All cards">${t.cards.map((x,k)=>`<button data-to="${k}"${k===V.i?' aria-current="true"':''}><span class="n">${k+1}</span><span>${esc(x.t)}</span></button>`).join('')}</nav>`;
  const cur=W.querySelector('.f1v-strip [aria-current="true"]'), sp=W.querySelector('.f1v-strip'); if(cur&&sp) sp.scrollLeft=Math.max(0,cur.offsetLeft-sp.clientWidth/2+cur.offsetWidth/2); /* the strip scrolls to the card; the page does not move */
  /* a built card (f1cards.js) draws once the example lot is loaded; a newer draw wins */
  if(spec&&V.ready){ const tok=V.tok=(V.tok||0)+1, dr=W.querySelector('.f1v-draw'), pb=W.querySelector('.f1c-body'), se=W.querySelector('.f1v-src');
    Promise.resolve().then(()=>spec.build(BD.f1cards.ctx(V.city))).then(res=>{ if(tok!==V.tok||!res) return; BD.f1cards.render(res,dr,pb,se,V.t.id); W.dataset.built=c.t; })
      .catch(e=>{ if(tok!==V.tok) return; dr.innerHTML=`<p class="f1v-empty">This card could not be drawn: ${esc(String(e&&e.message||e).slice(0,160))}</p>`; console.error('f1 card',c.t,e); }); } }

/* first screen: the landing page, unless a parcel link was opened, ?old is in the address, or a script asked to skip it (f1_capture.js) */
function boot(){ if(!BD||!BD.S||!BD.select) return setTimeout(boot,200); let skip=false; try{ skip=localStorage.getItem('bd-f1-skip')==='1'; }catch(e){}
  if(skip||/[?&]old\b/.test(location.search)||BD.S.sel) return; landing(); }
BD.f1={landing,viewer,TPL};
boot();
})();
