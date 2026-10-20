/* Beyond Data — the walk-through card (J.B., 17 Oct 2026: "once you select the parcel, the card should open in front of the map, in the middle
   of the screen … the toolbar should collapse when the card opens … the card should have the option to go back and pick a new parcel").
   Once a parcel is picked, each step opens as one centred card over the map: the 3D (turning slowly, seen from above, nearby buildings
   see-through) and the step's chart on the left; the words, choices and Next on the right. The panel's own content moves into the card,
   so every step keeps working as before, and the panel collapses. The step's sections become tiles with their one-line answers; the
   rest folds under "All the detail". "New parcel" clears the site and returns to the map. */
(function(){
'use strict';
const BD=window.BD; const {$,esc}=BD;
const NO3D=new Set(['prec','time','cities','report']);
let W=null, box=null, t=null;
const wrap=()=>W||(W=document.getElementById('v3d')), map=()=>document.getElementById('map'), main=()=>document.querySelector('main');
const stepKey=()=>{ const F=BD.flow; return F&&F.on&&F.steps[F.i]?F.steps[F.i].k:''; };
const active=()=>!!(BD.flow&&BD.flow.on&&BD.S.sel&&stepKey());
function build(){ if(box) return box; box=document.createElement('div'); box.id='wc'; box.setAttribute('role','dialog'); box.setAttribute('aria-label','Walk-through');
  box.innerHTML=`<div class="wcbox"><div class="wchead"><button class="wcnew" id="wcNew">← New parcel</button><span class="wcaddr" id="wcAddr"></span></div>
   <div class="wcgrid"><div class="wcvis"><div class="wc3d" id="wc3d"><button class="keyb" id="wcKey" aria-pressed="false">Key</button></div><div class="wcchart" id="wcChart"></div></div><div class="wctx" id="wcTx"></div></div></div>`;
  document.body.appendChild(box); for(const ev of ['pointerdown','wheel']) box.addEventListener(ev,e=>{ if(!(e.target.closest&&e.target.closest('#v3d'))) e.stopPropagation(); });
  $('#wcNew').onclick=()=>{ BD.clearSel(); };
  $('#wcKey').onclick=()=>{ const o=document.body.classList.toggle('wckey'); $('#wcKey').setAttribute('aria-pressed',o); $('#wcKey').textContent=o?'Hide key':'Key'; };
  return box; }
// block elements inside a one-line answer run together once shown inline; put a space between them
const spaced=h=>h.replace(/<\/(div|p|li|dd|dt|h\d)>|<br\s*\/?>/gi,'$& ').replace(/(<(div|p|li|dd|dt)[^>]*>)/gi,' $1');
// once per step: the card's own header carries the address, so a heading that repeats it gives way to the step's name; the cooling line sits above the buttons
function tidy(sd){ const a=BD.S.sel&&BD.S.sel.a&&BD.S.sel.a[0]; const h=sd.querySelector(':scope > h2'), kd=h&&h.previousElementSibling;
  if(h&&a&&h.textContent.trim().toUpperCase()===String(a).trim().toUpperCase()&&kd&&kd.classList.contains('kind')){ h.textContent=kd.textContent; kd.remove(); }
  const cb=sd.querySelector(':scope > .coolbar'), ft=sd.querySelector(':scope > .flowfoot'), al=sd.querySelector(':scope > details.alld');
  // sources belong with the detail, never under the buttons
  sd.querySelectorAll(':scope > details.fp').forEach(x=>{ if(al) al.appendChild(x); else if(ft) ft.before(x); });
  if(cb&&ft&&cb.nextElementSibling!==ft) ft.before(cb); }
function tilesFor(sd){
  // the rows: the step's sections become tiles with their answers; the sections themselves fold under "All the detail"
  if(!sd.querySelector('.dk')&&!sd.querySelector(':scope > .tiles')){ const all0=[...sd.querySelectorAll(':scope > details.sec, :scope > .tt + details.sec')].filter(x=>x.parentNode===sd), secs=all0.filter(x=>!x.hidden); /* sections hidden for this tier stay out of the tiles (logic.js) */
    if(secs.length>1){ const tiles=document.createElement('div'); tiles.className='tiles';
      tiles.innerHTML=secs.slice(0,6).map((x,i)=>{ const tt=x.querySelector(':scope > summary .t'), a=x.querySelector(':scope > summary .a'); return `<button class="tile${x.querySelector(':scope > summary .a.f')?' feat':''}" data-i="${i}"><span class="tt">${esc(tt?tt.textContent:'')}</span><span class="ta">${a?spaced(a.innerHTML):''}</span></button>`; }).join('');
      const all=document.createElement('details'); all.className='alld'; all.innerHTML='<summary>All the detail</summary>';
      secs[0].before(tiles); tiles.after(all); for(const x of all0) all.appendChild(x);
      // anything else loose after the sections (notes, legends) goes into the fold too, except the step's buttons
      let n=all.nextElementSibling; while(n&&!n.classList.contains('flowfoot')){ const nx=n.nextElementSibling; if(!n.classList.contains('xpbtn')&&!n.classList.contains('coolbar')&&!n.classList.contains('tmore')&&!n.classList.contains('fstuck')) all.appendChild(n); n=nx; }
      tiles.querySelectorAll('.tile').forEach(b=>b.onclick=()=>{ const s=secs[+b.dataset.i]; if(s) secCard(s, b.querySelector('.tt').textContent); }); } }
}
/* cards inside the card (J.B., 17 Oct: "the add-ons need to be their own card and each add-on opens another new card, because this right-hand toolbar is in the way").
   While the walk-through card is open, anything that used to open in the side drawer (a section, an add-on, the cooling choice) opens in the card's
   right column instead, over the step, with Back to where it came from. The 3D stays on the left. */
const D=BD.drawer, dOpen=D.open.bind(D), dClose=D.close.bind(D); const stack=[]; let cur=null, lent=[];
const titleOf=h=>{ const m=/<h2[^>]*>([\s\S]*?)<\/h2>/.exec(h||''); return m?m[1].replace(/<[^>]+>/g,'').trim():''; };
function giveBack(){ for(const {node,ph} of lent){ if(ph.isConnected) ph.replaceWith(node); else node.remove(); } lent=[]; }
function lend(node){ const ph=document.createComment('lent'); node.replaceWith(ph); lent.push({node,ph}); return node; }
function stepTitle(){ const F=BD.flow, st=F&&F.steps[F.i]; return st?st.t:'the step'; }
function backBar(){ const dr=D.el, prev=stack[stack.length-1]; const b=document.createElement('button'); b.className='dback'; b.id='dback';
  b.textContent='← '+(prev?(prev.t||'Back'):stepTitle()); b.onclick=()=>D.back(); dr.prepend(b); }
function show(e){ giveBack(); cur=e; dOpen(e.html,dr=>{ if(e.wire) e.wire(dr); }); if(document.body.classList.contains('wcon')) backBar(); }
function back(){ if(stack.length) show(stack.pop()); else { D.close(); last=null; } }
// a step that re-renders itself (adding an add-on does) closes and reopens the drawer within a moment; keep the trail across that
let last=null;
D.open=(html,wire)=>{ const inCard=document.body.classList.contains('wcon');
  if(inCard&&cur&&D.isOpen()) stack.push(cur); else if(inCard&&last&&Date.now()-last.t<2500){ stack.length=0; stack.push(...last.stack,last.cur); } else stack.length=0;
  last=null; show({html,wire,t:titleOf(html)}); };
D.close=()=>{ if(cur) last={cur,stack:stack.slice(),t:Date.now()}; giveBack(); stack.length=0; cur=null; dClose(); };
D.back=()=>{ last=null; back(); };
function secCard(sec,t){ const id=sec.dataset.sec; const find=()=>{ const sd=$('#side'); return (id&&sd.querySelector(`details.sec[data-sec="${CSS.escape(id)}"]`))||sec; };
  D.open(`<h2>${esc(t)}</h2>`,dr=>{ const s=find(), b=s&&s.querySelector(':scope > .b'); if(b){ dr.appendChild(lend(b)); b.classList.add('secb'); } }); }
// a section page whose contents were redrawn behind it (ticking 'cost more too' in Buildings that could take it): open it again on the new contents
BD.reopenSec=(id,t)=>{ const s=$('#side').querySelector(`details.sec[data-sec="${CSS.escape(id)}"]`); if(!s) return; giveBack(); cur=null; stack.length=0; secCard(s,t); };
function on(){ const sd=$('#side'), b=build(); document.body.classList.add('wcon');
  if(sd.parentNode!==$('#wcTx')) $('#wcTx').appendChild(sd);
  const a=BD.S.sel&&BD.S.sel.a; $('#wcAddr').textContent=a&&a[0]?a[0]:'';
  const k=stepKey(), no3=NO3D.has(k); b.classList.toggle('nov',no3);
  if(k!=='setup') document.body.classList.remove('wcdim');
  sd.querySelectorAll('details.sec > summary .t').forEach(t=>{ const n=BD.TITLES&&BD.TITLES[t.textContent.trim()]; if(n) t.textContent=n; });
  if(BD.logic&&BD.logic.filter) BD.logic.filter(sd); if(k!=='site'&&k!=='setup'&&!no3) tilesFor(sd); tidy(sd); if(no3) sd.querySelectorAll('details.sec').forEach(x=>x.open=true);
  const w=wrap(); if(w){ if(!no3){ if(w.parentNode!==$('#wc3d')) $('#wc3d').appendChild(w); } else if(w.parentNode!==map()) map().appendChild(w); }
  if(BD.scene3d&&BD.scene3d.cardMode) BD.scene3d.cardMode(!no3);
  if(!no3&&BD.scene3d&&!BD.scene3d.isOpen()&&k==='site'&&BD.showModel) BD.showModel();
  // the step's chart goes beside the 3D, where it can be large
  const ch=$('#wcChart'), dc=sd.querySelector('#dchart'), cap=sd.querySelector('#dcap');
  if(dc&&!no3){ ch.innerHTML=''; ch.appendChild(dc); if(cap) ch.appendChild(cap); } else if(!sd.querySelector('.dk')) ch.innerHTML='';
  ch.hidden=!ch.firstChild;
  const dr=D.el, g=b.querySelector('.wcgrid'); if(dr&&dr.parentNode!==g) g.appendChild(dr);
  window.dispatchEvent(new Event('resize')); }
function off(){ const sd=$('#side'), m=main(); if(!document.body.classList.contains('wcon')) return; document.body.classList.remove('wcon');
  if(sd&&m&&sd.parentNode!==m) m.prepend(sd); if(D.isOpen()) D.close(); if(D.el&&D.el.parentNode!==map()) map().appendChild(D.el); const w=wrap(); if(w&&w.parentNode!==map()) map().appendChild(w);
  if(BD.scene3d&&BD.scene3d.cardMode) BD.scene3d.cardMode(false); window.dispatchEvent(new Event('resize')); }
function sync(){ if(active()) on(); else off(); }
(function watch(){ const sd=$('#side'); if(!sd) return setTimeout(watch,200);
  new MutationObserver(()=>{ const w=wrap(); if(w&&!w.isConnected) map().appendChild(w); clearTimeout(t); t=setTimeout(sync,30); }).observe(sd,{childList:true});
  setInterval(()=>{ if(active()!==document.body.classList.contains('wcon')) sync(); else if(active()){ const w=wrap(), k=stepKey(); if(w&&!NO3D.has(k)&&w.parentNode!==$('#wc3d')) sync(); } },600); })();
BD.stage={sync,on,off};
})();
