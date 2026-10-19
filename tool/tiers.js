/* Beyond Data — tiers (J.B. and Xun, 19 Oct 2026; audit/template_ideas_2026-10-19.md).
   Three ways through the same tool: residents ("What it means for me"), community and councillors ("What it means for the
   neighbourhood"), professionals ("How it is worked out"). Every part of the diagram runs in every tier; a tier only changes what is
   asked and shown. The tier is chosen right after the landing page and can be changed at any time without losing the site.
   Residents are not asked the set-up questions: each answer is assumed, shown, and can be changed. Their size starts at 2.5 MW,
   typical of data centres already built inside Vancouver, Edmonton and Calgary (operator claims; audit/typical_size_sources_2026-10-19.md),
   capped by what fits. Tiers are read from templates.json, the same file the tool-logic diagram uses. */
(function(){
'use strict';
const BD=window.BD; const {$,esc}=BD;
const KEY='bd-tier';
const TIERS=[
 {id:'resident',name:'What it means for me',who:'For residents and neighbours',does:'Only where it is. Everything else starts from a typical choice you can change.'},
 {id:'community',name:'What it means for the neighbourhood',who:'For councillors, community groups and receivers of heat',does:'Every set-up choice; who gains and loses, the money, the approvals.'},
 {id:'full',name:'How it is worked out',who:'For engineers, architects and bylaw professionals',does:'Everything, with formulas, sources and confidence.'}];
const TYPICAL_MW=2.5;
let tier=null; try{ tier=localStorage.getItem(KEY); }catch(e){}
if(!TIERS.some(t=>t.id===tier)) tier=null;
BD.tier=()=>tier||'full';
BD.tierChosen=()=>!!tier;
BD.setTier=t=>{ tier=t; try{ localStorage.setItem(KEY,t); }catch(e){} document.body.dataset.tier=t; };
if(tier) document.body.dataset.tier=tier;
BD.TPL=null;
fetch('templates.json').then(r=>r.ok?r.json():null).then(d=>{ BD.TPL=d; }).catch(()=>{});
BD.tierShows=(node,t)=>{ const T=BD.TPL; if(!T||!T.nodes[node]) return true; const rank={resident:0,community:1,full:2}; return rank[T.nodes[node].tier]<=rank[t||BD.tier()]; };

/* ---------- the choice, inside the landing card ---------- */
function preview(id){ const T=BD.TPL; if(!T) return ''; const rank={resident:0,community:1,full:2}; const ids=Object.keys(T.nodes); const n=ids.length, cols=23, r=2.4, g=7;
  const on=ids.filter(k=>rank[T.nodes[k].tier]<=rank[id]).length;
  const dots=ids.map((k,i)=>{ const x=6+(i%cols)*g, y=6+Math.floor(i/cols)*g, lit=rank[T.nodes[k].tier]<=rank[id]; return `<circle cx="${x}" cy="${y}" r="${r}" fill="${lit?'var(--accent)':'var(--line-2)'}"/>`; }).join('');
  const W=12+(cols-1)*g, H=12+Math.ceil(n/cols-1)*g;
  return `<svg class="tprev" viewBox="0 0 ${W} ${H}" role="img" aria-label="${on} of ${n} parts of the tool's logic shown">${dots}</svg><span class="tcount">${on} of ${n} parts shown</span>`; }
function chooser(card,cont){
  card.innerHTML=`<div class="kind">Beyond Data</div><h2 id="wTitle">What do you want to know?</h2>
   <p class="sub">Every choice runs the same tool. It changes what you are asked and what you see. You can switch at any time.</p>
   <div class="tiers" role="radiogroup">${TIERS.map(t=>`<button class="tier" role="radio" aria-checked="${t.id===tier}" data-t="${t.id}"><b>${esc(t.name)}</b><span>${esc(t.who)}</span><span class="tdo">${esc(t.does)}</span>${preview(t.id)}</button>`).join('')}</div>
   <p class="sub"><a href="#" id="tBack">← Back</a></p>`;
  card.querySelectorAll('.tier').forEach(b=>b.onclick=()=>{ BD.setTier(b.dataset.t); cont(); });
  const bk=card.querySelector('#tBack'); if(bk) bk.onclick=e=>{ e.preventDefault(); const w=$('#welcome'); if(w) w.remove(); BD.welcome(); };
  const f=card.querySelector('.tier[aria-checked="true"]')||card.querySelector('.tier'); if(f) f.focus(); }
function patchWelcome(w){ if(w.dataset.tiered) return; w.dataset.tiered='1'; const card=w.querySelector('.wcard'); if(!card) return;
  const own=$('#wOwn'); if(own){ const go=own.onclick; own.onclick=()=>chooser(card,()=>go&&go()); }
  w.querySelectorAll('#wList .ex').forEach(b=>{ const go=b.onclick; b.onclick=()=>chooser(card,()=>go&&go()); }); }
new MutationObserver(()=>{ const w=document.getElementById('welcome'); if(w) setTimeout(()=>patchWelcome(w),0); }).observe(document.body,{childList:true});

/* ---------- the switch, under the step bar ---------- */
function tierChip(){ const sd=$('#side'); if(!sd) return; const fb=sd.querySelector(':scope > .flowbar'); if(!fb||sd.querySelector(':scope > .tierchip')) return;
  const t=TIERS.find(x=>x.id===BD.tier());
  fb.insertAdjacentHTML('afterend',`<div class="tierchip"><label for="tierSel">Showing</label><select id="tierSel">${TIERS.map(x=>`<option value="${x.id}" ${x.id===t.id?'selected':''}>${esc(x.name)}</option>`).join('')}</select></div>`);
  $('#tierSel').onchange=e=>{ BD.setTier(e.target.value); if(BD.S&&BD.S.answers) delete BD.S.answers.residentEdit; if(BD.flow&&BD.flow.go) BD.flow.go(BD.flow.i); }; }
function backLink(){ const sd=$('#side'), A=BD.S&&BD.S.answers; if(!sd||!A||BD.tier()!=='resident'||!A.residentEdit||sd.querySelector('.rset')||sd.querySelector('#rBack')) return;
  const tc=sd.querySelector(':scope > .tierchip'); if(!tc) return;
  tc.insertAdjacentHTML('afterend',`<p class="sub rback"><a href="#" id="rBack">← Back to what we assumed</a></p>`);
  $('#rBack').onclick=e=>{ e.preventDefault(); delete A.residentEdit; residentCard(); }; }
(function watch(){ const sd=$('#side'); if(!sd) return setTimeout(watch,200); new MutationObserver(()=>setTimeout(()=>{ tierChip(); backLink(); },0)).observe(sd,{childList:true}); })();

/* ---------- residents' set-up: assumed answers, shown and changeable ---------- */
const live=()=>{ const A=BD.S.answers; return BD.deck.DECK.filter(d=>!d.when||d.when(A)); };
function sizeSet(which){ const A=BD.S.answers; A.mw=null; BD.modelReset&&BD.modelReset(); const f=BD.eng.siteFacts(), hi=f.mw[1];
  const typ=Math.min(TYPICAL_MW,hi); A.mw=which==='large'?+hi.toFixed(1):which==='mid'?+((typ+hi)/2).toFixed(1):+typ.toFixed(1); A.mwPick=which; BD.modelReset&&BD.modelReset(); }
function residentCard(){ const A=BD.S.answers, m=BD.model&&BD.model(); if(!m) return;
  if(A.mw==null||!A.mwPick) sizeSet(A.mwPick||'typ');
  const f=BD.eng.siteFacts(), hi=f.mw[1], L=live();
  const rows=L.map((d,j)=>{ const opts=d.opts(BD.model()), cur=d.k(A), o=opts.find(x=>x.v===cur)||opts[0]; return `<li><span class="aq">${esc(d.q)}</span><span class="aa">${esc(o.t)}</span><a href="#" data-j="${j}">Change</a></li>`; }).join('');
  // the floor the servers need (same figure the 3D label shows), not the zone's largest building
  const M=BD.model(); const fl=M&&(M.sizedTo?M.sizedTo.floor:M.footArea?M.footArea*Math.max(1,M.nF[0]-(M.Z&&M.Z.ground?1:0)):0); const store=fl?`about ${BD.fmt(Math.round(fl/100)*100)} m² (${BD.fmt(Math.round(fl*10.7639/1000)*1000)} ft²) of floor`:''; const foot='';
  const nothing=hi<0.05;
  $('#side').innerHTML=`<div class="dk rset"><div class="kind">Set up the site</div><h2>What we assumed for you</h2>
   <p>You only chose where. The rest starts from the tool's usual choices, <span class="k">a starting point, not a recommendation</span>. Change any of them.</p>
   ${nothing?`<p class="dwarn">Nothing fits on this lot with these choices. Try another lot, or change a choice below.</p>`:`
   <h3>How big</h3><div class="dch" role="radiogroup">${[['typ',`Typical (${Math.min(TYPICAL_MW,hi).toFixed(1)} MW)`],['mid','In between'],['large',`As large as fits (${hi.toFixed(1)} MW)`]].map(([v,t])=>`<button role="radio" data-sz="${v}" aria-checked="${(A.mwPick||'typ')===v}">${esc(t)}</button>`).join('')}</div>
   <p class="sub">${M&&M.sizedTo?`${esc(A.mw.toFixed(1))} MW of servers: ${store}, any shape`:`The most the zone allows: ${store}, about ${f.mw[0].toFixed(1)}–${hi.toFixed(1)} MW of servers depending on how tightly racks are packed${hi>=40?' (the tool stops at 40 MW)':''}`}. "Typical" is the size of data centres already built inside Vancouver, Edmonton and Calgary, about 2–2.5 MW (operator claims)${hi<TYPICAL_MW?`; this lot fits only ${hi.toFixed(1)} MW`:''}.</p>`}
   <h3>Everything else</h3><ul class="assumed">${rows}</ul>
   <div class="dnav"><button class="sec" id="rB">← The site</button><button class="pri" id="rN" ${nothing?'disabled':''}>What fits here →</button></div></div>`;
  const sd=$('#side');
  sd.querySelectorAll('[data-sz]').forEach(b=>b.onclick=()=>{ sizeSet(b.dataset.sz); residentCard(); if(BD.showModel) BD.showModel(); });
  sd.querySelectorAll('.assumed a').forEach(a=>a.onclick=e=>{ e.preventDefault(); A.residentEdit=true; BD.deck.show(+a.dataset.j); });
  $('#rB').onclick=()=>{ if(BD.flow&&BD.flow.on) BD.flow.back(); else BD.card(); };
  $('#rN').onclick=()=>{ A.setupDone=true; if(BD.flow&&BD.flow.on) BD.flow.next(); else BD.fitsView(); };
  if(BD.showModel) BD.showModel(); }
BD.residentCard=residentCard;
function patchSetup(){ if(!BD.setup||!BD.deck) return setTimeout(patchSetup,200); const orig=BD.setup.start;
  BD.setup.start=()=>{ if(BD.tier()==='resident'&&!BD.S.answers.residentEdit) residentCard(); else orig(); }; }
patchSetup();
// a new parcel: residents start again from the assumed set-up
let lastSel=''; setInterval(()=>{ const k=BD.S&&BD.S.sel?BD.S.sel.city+':'+BD.S.sel.id:''; if(k!==lastSel){ lastSel=k; if(BD.S&&BD.S.answers){ delete BD.S.answers.residentEdit; delete BD.S.answers.mwPick; } } },500);
BD.TIERS=TIERS;
})();
