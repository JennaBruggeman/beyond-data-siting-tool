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
  cards:[...C('Find',['Your city','Find a data centre']),...C('The facility',['What it is','What’s inside']),...C('Report',['Report'])]},
 {id:'municipal',name:'Municipal',tier:null,tab:'municipal',step:3,who:'For planners and councillors. One parcel’s rules, one rule per card: limits, not designs.',img:'municipal',
  cards:[...C('Site',['Your city','Your parcel']),...C('Use',['Is a data centre allowed?','Industrial land and jobs']),...C('Building rules',['Height and floor area','Yards by edge','Noise limits around the lot','Storeys and street frontage','Loading']),...C('Process',['Approval process']),...C('Report',['Report'])]},
 {id:'engineering',name:'Engineering',tier:'full',tab:'full',step:4,who:'For engineers and operators. What fits on the lot, the cooling and backup choices, and what it could exchange with the city.',img:'engineering',
  cards:[...C('Site',['Your city','Your parcel']),...C('Set-up',['What fits','Cooling','Backup power','Noise']),...C('Exchanges',['Heat offered','Who could take it','Electricity','Water']),...C('Report',['Report'])]}, /* 11 cards (job sheet, J.B. 8 Nov): three options folded into Cooling, could become dropped; Materials dropped (J.B. 11 Nov 2026, F10) */
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
/* audit I46 (12 Nov 2026): the earlier tool stays the engine underneath, but while the landing page, the cards or the logic diagram are open it is
   inert and hidden from readers (no text showing through, no clicks); the footer's archive link opens it */
(function(){ const sync=()=>{ const app=document.querySelector('body > .app'); if(!app) return; const on=!!(document.getElementById('f1')||document.getElementById('f1v')||document.getElementById('f1l'));
    app.inert=on; if(on) app.setAttribute('aria-hidden','true'); else app.removeAttribute('aria-hidden'); app.style.visibility=on?'hidden':''; };
  const go=()=>{ new MutationObserver(sync).observe(document.body,{childList:true}); sync(); };
  if(document.body) go(); else document.addEventListener('DOMContentLoaded',go); })();
function landing(){ let L=document.getElementById('f1'); if(L) L.remove(); L=document.createElement('div'); L.id='f1';
  L.innerHTML=`<div class="f1-wrap">
   <header class="f1-head"><a class="f1-app" href="#" data-go="top">Beyond Data</a><nav class="f1-nav" aria-label="Site"><a href="#f1-work">Templates</a><a href="#" data-go="typ">Typologies</a><a href="#" data-go="logic">How it works</a></nav></header>
   <section class="f1-hero"><div><h1>What could a data centre give the city around it?</h1>
     <p class="f1-lead">Test real lots in Vancouver and Edmonton: what a data centre could share with its neighbours, and what stands in the way.</p>
     <div class="f1-acts"><button class="f1-btn" data-go="work">Choose a template</button><button class="f1-link" data-go="logic">How it works</button><button class="f1-link quiet" data-go="intro">Watch the intro</button></div></div>
    <figure class="f1-heroimg"><img src="f1/img/hero.png" alt="339 1st Ave E, Vancouver, in the tool's 3-D view: the data centre's massing, cooling plant and generators among the neighbouring buildings"><figcaption class="f1-cap">339 1st Ave E, Vancouver. The tool's 3-D view: a data centre's massing, cooling plant and generators among its neighbours.</figcaption></figure></section>
   <div class="f1-lines"><p>Vancouver and Edmonton, built to the same depth.</p><p>Four templates, each a workflow that ends in its own report.</p><p>Every figure has a source, or a “?” where it doesn’t yet.</p><p>Trade-offs, not verdicts. Code limits block; options are flagged.</p></div>
   <section id="f1-work"><div class="f1-sechead"><h2>Templates</h2><span>Each template’s workflow shows one idea per card, then makes a report.</span></div>
    ${TPL.map(t=>`<div class="f1-row"><h3>${t.name}</h3><div><p class="who">${esc(t.who)}</p><div class="ract"><button class="f1-btn" data-start="${t.id}">Start</button><button class="f1-link" data-see="${t.id}">See the workflow</button><button class="f1-link" data-logic="${t.tab}">Logic diagram →</button></div></div>
      <div class="meta">${t.cards.length} steps<br>report</div><img src="f1/img/${t.img}.png" alt="${t.name}: the tool's 3-D view of 339 1st Ave E, Vancouver" loading="lazy"></div>`).join('')}
    <div class="f1-typstrip"><span>8 typologies: data centres that share their building with the city</span><button data-go="typ">See the typologies →</button></div></section>
   <section class="f1-how" id="f1-how"><div><h2>How it works</h2><p>One logic runs under all four templates. Every number in it is tied to a source and a check status, so a reader can follow any figure back to where it came from.</p><button class="f1-link" data-go="logic">Open the interactive logic diagram</button></div>${howSvg()}</section>
   <footer class="f1-foot"><span>Beyond Data · ARCH 540, UBC School of Architecture and Landscape Architecture · 2026</span><span>Data: City of Vancouver and City of Edmonton open data. Maker and operator figures are labelled as claims.</span><a href="#" class="f1-old" data-go="old">Archive: the earlier tool</a></footer></div>`;
  document.body.appendChild(L);
  L.addEventListener('click',e=>{ const g=e.target.closest('[data-go],[data-start],[data-see],[data-logic]'); if(!g) return;
    if(g.dataset.logic){ e.preventDefault(); if(BD.f1logic) BD.f1logic.open({tab:g.dataset.logic}); return; } /* F5 1(b), 8 Nov 2026: the template's interactive logic diagram */
    if(g.dataset.go==='typ'){ e.preventDefault(); if(BD.f1typ) BD.f1typ.open('lib'); return; } /* F7, 8 Nov 2026: the typology library, one click away */
    if(g.dataset.go==='intro'){ e.preventDefault(); if(BD.f1intro) BD.f1intro.play(); return; } /* F5 §3, 8 Nov 2026: the intro (f1intro.js) */
    if(g.dataset.go==='old'){ e.preventDefault(); L.remove(); return; }
    if(g.dataset.go==='logic'){ e.preventDefault(); if(BD.f1logic) BD.f1logic.open({tab:'all'}); return; }
    if(g.dataset.go==='work'){ L.querySelector('#f1-work').scrollIntoView({behavior:'smooth'}); return; }
    if(g.dataset.go==='top'){ e.preventDefault(); L.scrollTo({top:0,behavior:'smooth'}); return; }
    if(g.dataset.start){ const t=TPL.find(x=>x.id===g.dataset.start); if(!t) return; /* milestone 1 (J.B. 12 Nov 2026): Start opens the new cards on a lot the user picks (was the old tool) */
      viewer(t.id,{pick:true}); return; }
    if(g.dataset.see) viewer(g.dataset.see); });
  L.querySelectorAll('a[href^="#f1-"]').forEach(a=>a.addEventListener('click',e=>{ e.preventDefault(); const s=L.querySelector(a.getAttribute('href')); if(s) s.scrollIntoView({behavior:'smooth'}); }));
  if(BD.f1intro) BD.f1intro.first(); /* the intro plays by itself on the first visit only (f1intro.js; not under automation) */ }

/* ---------- card viewer (STYLE.md §4 shell) ---------- */
const V={t:null,i:0,city:'van',where:'',own:null,pick:false,pcity:'van',hits:[]};   /* own: the lot picked after Start {city,tile,id,label}; pick: the lot picker is showing */
async function loadLot(city){ const S=V.own||LOTS[city]; V.where='…'; V.ready=false; draw();
  try{ if(BD.S.city!==city&&BD.setCity) await BD.setCity(city,true); await BD.select({city:S.city,tile:S.tile,id:S.id,quiet:true}); BD.modelReset(); const M=BD.model(), a=BD.S.sel&&BD.S.sel.a;
    V.where=[a&&a[0]?titleCase(a[0]):S.id, M&&M.Z&&(M.Z.zone||M.Z.key)].filter(Boolean).join(' · '); V.addr=a&&a[0]?titleCase(a[0]):S.id; }
  catch(e){ V.where=S.id+' (lot not loaded: '+String(e.message||e).slice(0,60)+')'; }
  V.ready=true; draw(); }
const titleCase=s=>String(s).toLowerCase().replace(/\b([a-z])/g,c=>c.toUpperCase()).replace(/\b(\d+)(St|Nd|Rd|Th)\b/g,(m,n,x)=>n+x.toLowerCase()).replace(/\b(Nw|Ne|Sw|Se)\b/g,m=>m.toUpperCase());
function viewer(id,opt){ V.t=TPL.find(x=>x.id===id); V.i=0; V.pick=!!(opt&&opt.pick); V.own=null; V.hits=[]; V.ready=false; let W=document.getElementById('f1v'); if(!W){ W=document.createElement('div'); W.id='f1v'; W.setAttribute('role','dialog'); W.setAttribute('aria-modal','true'); document.body.appendChild(W);
    W.addEventListener('click',e=>{ const fg=e.target.closest('[data-fig]'); if(fg&&BD.f1logic){ const c=V.t.cards[V.i], k=fg.dataset.k||'', ids=k?[k]:(BD.f1logic.figIds?BD.f1logic.figIds(c.t,V.t.tab,fg.dataset.fig||''):BD.f1logic.cardIds(c.t,V.t.tab));
        BD.f1logic.open({tab:V.t.tab,label:c.t+' · '+(fg.dataset.fig||''),ids,lot:V.where,sel:k||(ids.length===1?ids[0]:null),val:(fg.querySelector('.v')||fg).innerText.replace(/\s+/g,' ').trim()}); return; } /* F5 1(c), 8 Nov 2026; F6: a figure with one part opens at that part */
      const b=e.target.closest('button'); if(!b) return; const d=b.dataset;
      if(d.x!=null){ W.remove(); return; } if(d.how){ const c=V.t.cards[V.i]; if(BD.f1logic) BD.f1logic.open(d.how==='all'?{tab:V.t.tab}:{tab:V.t.tab,label:c.t,ids:BD.f1logic.cardIds(c.t,V.t.tab),lot:V.where}); return; } if(d.city){ if(d.city!==V.city){ V.city=d.city; loadLot(V.city); } return; }
      if(d.relot!=null){ V.pick=true; V.hits=[]; draw(); return; } if(d.pcity){ V.pcity=d.pcity; V.hits=[]; if(V.t.id==='resident'){ V.city=d.pcity; V.pick=false; V.own=null; V.i=0; draw(); loadLot(V.city); return; } draw(); return; }   /* audit B7: Resident is not about a lot: the city, then R1 */
      if(d.hit!=null){ const h=V.hits[+d.hit]; if(!h) return; V.own={city:V.pcity,tile:h[1],id:h[2],label:h[0]}; V.city=V.pcity; V.pick=false; V.i=Math.min(V.i||0,V.t.cards.length-1); draw();   /* audit I43: a new lot keeps the card you were on */ loadLot(V.city); return; }
      if(d.to!=null){ V.i=+d.to; draw(); return; } if(d.chap!=null){ V.i=V.t.cards.findIndex(c=>c.chap===d.chap); draw(); return; }
      if(d.step==='back'&&V.i>0){ V.i--; draw(); } if(d.step==='next'&&V.i<V.t.cards.length-1){ V.i++; draw(); } });
    document.addEventListener('keydown',e=>{ if(!document.getElementById('f1v')) return; if(document.getElementById('f1l')) return;   /* audit I40: the logic diagram on top takes the keys; Esc closes it, not the cards */
      if(e.key==='Escape') document.getElementById('f1v').remove(); if(e.key==='ArrowRight'&&V.i<V.t.cards.length-1){ V.i++; draw(); } if(e.key==='ArrowLeft'&&V.i>0){ V.i--; draw(); } }); }
  draw(); if(!V.pick) loadLot(V.city); }
/* the lot picker (milestone 1): city, then an address from the City's records (the old tool's search, BD.addrHits) */
function pickHtml(){ if(V.t.id==='resident') return `<div class="f1v-pick"><h2>Choose a city</h2><p class="lead">Resident: pick the city to see every data centre on record there, then find one.</p>
  <div class="f1v-city" role="group" aria-label="City">${Object.values(LOTS).map(l=>`<button data-pcity="${l.city}">${l.name}</button>`).join('')}</div></div>`;
  return `<div class="f1v-pick"><h2>Choose a lot</h2><p class="lead">${esc(V.t.name)}: pick the city, then type an address. The cards then run on that lot.</p>
  <div class="f1v-city" role="group" aria-label="City">${Object.values(LOTS).map(l=>`<button data-pcity="${l.city}" aria-pressed="${l.city===V.pcity}">${l.name}</button>`).join('')}</div>
  <input id="f1pick-q" type="search" placeholder="${V.pcity==='van'?'e.g. 339 1st Ave E':'e.g. 64 Airport Rd NW'}" autocomplete="off" aria-label="Address">
  <ul class="f1v-hits" role="listbox">${V.hits.map((h,k)=>`<li><button data-hit="${k}">${esc(h[0])}</button></li>`).join('')}</ul>
  <p class="sub" id="f1pick-near"${V.near?'':' hidden'}>No exact match in the City’s records; nearest on that street.</p>${V.own?'':`<p class="sub">Or see the cards on an example lot: close this and use “See the workflow”.</p>`}</div>`; }
function wirePick(W){ const q=W.querySelector('#f1pick-q'); if(!q) return; q.focus(); let tm=null;
  q.addEventListener('input',()=>{ clearTimeout(tm); tm=setTimeout(async()=>{ const v=q.value.trim(); if(v.length<3||!BD.addrHits) return; const r=await BD.addrHits(V.pcity,v); V.hits=r.hits||[]; V.near=!!r.near;
    const nn=W.querySelector('#f1pick-near'); if(nn) nn.hidden=!(V.near&&V.hits.length);   /* audit I44: the note shows as the list updates */
    const ul=W.querySelector('.f1v-hits'); if(ul) ul.innerHTML=V.hits.length?V.hits.map((h,k)=>`<li><button data-hit="${k}">${esc(h[0])}</button></li>`).join(''):`<li class="sub">No match in ${V.pcity==='van'?'Vancouver':'Edmonton'}: try the number and street.</li>`; },180); }); }
/* Resident header (audit B7): the city, then the facility once one is picked (cards 3 and 4) */
function resWhere(){ const cn=(LOTS[V.city]||{}).name||'', pk=BD.f1res&&BD.f1res.pick&&BD.f1res.pick[V.city], f=pk&&((BD.data.facilities||{})[V.city]||[]).find(g=>g.id===pk);
  return `<button class="f1v-cityname" data-to="0" title="Change the city: back to step 1">${esc(cn)}</button>${f&&V.i>=2?' / '+esc(f.name):''}`; }
function draw(){ const W=document.getElementById('f1v'); if(!W||!V.t) return;
  if(V.pick){ W.innerHTML=`<header class="f1v-head"><span class="f1-app">Beyond Data</span><span class="tpl">${V.t.name}</span><span class="f1v-where"></span><button class="f1v-x" data-x aria-label="Close">Close</button></header><div class="f1v-body">${pickHtml()}</div>`; wirePick(W); return; }
  const t=V.t, c=t.cards[V.i], n=t.cards.length, ci=t.chaps.indexOf(c.chap), spec=BD.f1cards&&BD.f1cards.get(t.id,c.t);
  W.innerHTML=`<header class="f1v-head"><span class="f1-app">Beyond Data</span><span class="tpl">${t.name}</span>
     <nav class="f1v-chap" aria-label="Chapters">${t.chaps.map((h,k)=>`<button data-chap="${esc(h)}" class="${k<ci?'past':k===ci?'now':''}"${k===ci?' aria-current="step"':''}>${esc(h)}</button>`).join('')}</nav>
     <span class="f1v-where">${t.id==='resident'?resWhere():V.addr?`<button class="f1v-cityname" data-to="0" title="Change the city: back to step 1">${esc((LOTS[V.city]||{}).name||'')}</button> / ${esc(V.addr)}`:esc(V.where)}</span>
     ${V.own&&t.id!=='resident'?`<button class="f1v-how" data-relot>Change lot</button>`:''}
     <button class="f1v-how" data-how="all">How it works</button><button class="f1v-x" data-x aria-label="Close the cards">Close</button></header>
   <div class="f1v-body"><main class="f1v-main"><div class="f1v-chips">${V.i===0&&!V.own?`<div class="f1v-city" role="group" aria-label="City">${Object.values(LOTS).map(l=>`<button data-city="${l.city}" aria-pressed="${l.city===V.city}">${l.name}</button>`).join('')}</div>`:''}${t.id==='resident'?'':spec?(V.own?'<span class="f1v-chip">Your lot</span>':`<span class="f1v-chip">${esc(spec.chip||('Example lot: '+(V.addr||V.where||'')+', '+((LOTS[V.city]||{}).name||'')))}</span><button class="f1v-how" data-relot>Use my own lot</button>`):'<span class="f1v-chip">Preview · not built yet</span>'}</div>
     <div class="f1v-draw">${spec?'<p class="f1v-empty">Drawing… (maps and plans can take a few seconds)</p>':''}${spec?'':`<p class="f1v-empty">This card’s drawing and figures are built in ${STEPNAME[t.step]} of the site build. It will read the example lot above and what the cards before it chose.</p>`}</div>
     <button class="f1v-how" data-how="card">This card in the interactive logic diagram</button><details class="f1v-src"><summary>Sources and assumptions</summary><p>Nothing on this card yet. Every figure will come from the tool, with its source here, or show as a red “?”.</p></details></main>
    <aside class="f1v-panel"><div class="chap">${esc(c.chap)}</div><h2>${esc(c.t)}</h2><div class="f1c-body">${spec?'':`<p class="lead">${t.name} · card ${V.i+1} of ${n}.</p>`}</div><div class="grow"></div>
     <div class="f1v-foot"><div class="f1v-nav"><button class="f1v-back" data-step="back"${V.i?'':' disabled'}>Back</button><button class="f1-btn" data-step="next"${V.i<n-1?'':' disabled'}>${V.i<n-1?'Next':'Last card'}</button></div><div class="f1v-no">${V.i+1} / ${n}</div></div></aside></div>
   <nav class="f1v-strip" aria-label="All cards">${t.cards.map((x,k)=>`<button data-to="${k}"${k===V.i?' aria-current="true"':''}><span class="n">${k+1}</span><span>${esc(x.t)}</span></button>`).join('')}</nav>`;
  const cur=W.querySelector('.f1v-strip [aria-current="true"]'), sp=W.querySelector('.f1v-strip'); if(cur&&sp) sp.scrollLeft=Math.max(0,cur.offsetLeft-sp.clientWidth/2+cur.offsetWidth/2); /* the strip scrolls to the card; the page does not move */
  /* a built card (f1cards.js) draws once the example lot is loaded; a newer draw wins */
  if(spec&&V.ready){ const tok=V.tok=(V.tok||0)+1, dr=W.querySelector('.f1v-draw'), pb=W.querySelector('.f1c-body'), se=W.querySelector('.f1v-src');
    Promise.resolve().then(async()=>{ const x=BD.f1cards.ctx(V.city); /* audit I41: after Pick a typology, a lot where the hub doesn't fit shows that state on every card */
      /* the public web version (J.B. 13 Nov 2026): Edmonton lot outlines are Altalis data, not open data, so the cards that need one say so; no hub figures for Edmonton */
      if(window.BD_PUBLIC&&V.city==='edm'){ const need={municipal:['Yards by edge','Noise limits around the lot'],engineering:['What fits','Backup power','Noise','Heat offered','Who could take it','Water']}, ip=V.t.cards.findIndex(k=>k.t==='Pick a typology');
        if((need[V.t.id]||[]).includes(c.t)||(V.t.id==='architecture'&&ip>=0&&V.i>=ip&&c.t!=='Report')) return {lead:'Edmonton lot outlines aren’t published as open data (the City stopped in Nov 2021); shown in the full version.',
          draw:V.t.id==='architecture'?'<p class="f1v-empty">The seven Edmonton test fits are shown as images, with their checked figures, on <a href="edm-test-fits.html">Edmonton test fits</a>.</p>':'', hero:[], rows:[], src:['City of Edmonton Open Data notice: “As of November 1st, 2021, the City will no longer provide datasets with land parcel boundary polygon geometry” (data.edmonton.ca, stt5-pzaa). See Sources and licences.'], noZoneFlag:true}; }
      if(V.t.id==='architecture'&&BD.f1archNoFit&&V.i>V.t.cards.findIndex(k=>k.t==='Pick a typology')){ const nf=await BD.f1archNoFit(x); if(nf) return nf;
        const es=BD.f1archEstimate&&await BD.f1archEstimate(x); if(es){ const r=await spec.build(x); if(r){ r.hero=(r.hero||[]).map(h=>Object.assign({},h,{v:h.u&&/MW/.test(h.u)&&/^[\d.]+$/.test(String(h.v))?(+h.v).toFixed(1):h.v,l:(h.l||'')+(es.basis&&es.basis.k==='borrowed'?' (borrowed, not checked here)':' (first pass, not checked)')}));   /* J.B. 13 Nov: MW to one decimal, and what stands behind it */ r.estimate=es; } return r; } }   /* item 1b: no confident numbers on these lots */
      const r0=await spec.build(x); if(r0&&window.BD_PUBLIC&&V.city==='van'&&['Heat receivers nearby','Who could take it'].includes(c.t)) r0.lead=(r0.lead||'')+' The full version also counts commercial and apartment buildings from a licensed assessment list.'; return r0; }).then(res=>{ if(tok!==V.tok||!res) return; BD.f1cardIndex=V.i; BD.f1cards.render(res,dr,pb,se,V.t.id); W.dataset.built=c.t; })
      .catch(e=>{ if(tok!==V.tok) return; dr.innerHTML=`<p class="f1v-empty">This card could not be drawn: ${esc(String(e&&e.message||e).slice(0,160))}</p>`; console.error('f1 card',c.t,e); }); } }

/* first screen: the landing page, unless a parcel link was opened, ?old is in the address, or a script asked to skip it (f1_capture.js) */
function boot(){ if(!BD||!BD.S||!BD.select) return setTimeout(boot,200); let skip=false; try{ skip=localStorage.getItem('bd-f1-skip')==='1'; }catch(e){}
  if(skip||/[?&]old\b/.test(location.search)||BD.S.sel) return; landing(); }
BD.f1={landing,viewer,TPL,cur:()=>(document.getElementById('f1v')&&V.t)?V.t.id:null};   /* cur: the open template (12 Nov 2026: the 3D kit shows on Engineering only) */
boot();
})();
