/* Beyond Data — one card per step, in the panel, with the live 3D as part of it (J.B., 17 Oct 2026: "all these rows need to be combined
   into a singular digestible card with the 3d animation as part of it"; a wide card over the map "is terrible").
   The panel stays the card: the 3D view moves into it (a window at the top), the step's sections become a few tiles showing their
   one-line answers, and everything else folds behind "All the detail". The map stays beside it for context; ⤢ shows the 3D large. */
(function(){
'use strict';
const BD=window.BD; const {$,esc}=BD;
const NO3D=new Set(['prec','time','cities','report']);
let big=false, t=null;
let W=null; const wrap=()=>W||(W=document.getElementById('v3d')), map=()=>document.getElementById('map');
function stepKey(){ const F=BD.flow; return F&&F.on&&F.steps[F.i]?F.steps[F.i].k:''; }
function inCard(){ const k=stepKey(); return !!(BD.S.sel&&k&&k!=='site'&&!NO3D.has(k)&&!big); }
function place(){ const w=wrap(), sd=$('#side'); if(!w||!sd) return; const slot=sd.querySelector('.c3d');
  if(inCard()&&slot){ if(w.parentNode!==slot){ slot.appendChild(w); } slot.hidden=!(BD.scene3d&&BD.scene3d.isOpen()); document.body.classList.add('c3on'); }
  else { if(w.parentNode!==map()) map().appendChild(w); document.body.classList.remove('c3on'); }
  window.dispatchEvent(new Event('resize')); }
function arrange(){ const sd=$('#side'); if(!sd||!BD.flow||!BD.flow.on||!BD.S.sel) { place(); return; } const k=stepKey(); if(!k||k==='site') { place(); return; }
  // a 3D window right under the step bar, unless the card already placed one
  if(!NO3D.has(k)&&!sd.querySelector('.c3d')&&!sd.querySelector('.dk')){ const bar=sd.querySelector(':scope > .flowbar'); const slot=document.createElement('div'); slot.className='c3d'; if(bar) bar.after(slot); else sd.prepend(slot); }
  const slot=sd.querySelector('.c3d'); if(slot&&!slot.querySelector('.c3x')){ const b=document.createElement('button'); b.className='c3x'; b.title='Show the 3D large'; b.setAttribute('aria-label','Show the 3D large'); b.textContent='⤢'; b.onclick=()=>{ big=true; document.body.classList.add('big3d'); place(); }; slot.appendChild(b); }
  // the rows: the step's sections become tiles with their answers; the sections themselves fold under "All the detail"
  if(!sd.querySelector('.dk')&&!sd.querySelector(':scope > .tiles')){ const secs=[...sd.querySelectorAll(':scope > details.sec, :scope > .tt + details.sec')].filter(x=>x.parentNode===sd);
    if(secs.length>1){ const tiles=document.createElement('div'); tiles.className='tiles';
      tiles.innerHTML=secs.slice(0,6).map((x,i)=>{ const tt=x.querySelector(':scope > summary .t'), a=x.querySelector(':scope > summary .a'); return `<button class="tile" data-i="${i}"><span class="tt">${esc(tt?tt.textContent:'')}</span><span class="ta">${a?a.innerHTML:''}</span></button>`; }).join('');
      const all=document.createElement('details'); all.className='alld'; all.innerHTML='<summary>All the detail</summary>';
      secs[0].before(tiles); tiles.after(all); for(const x of secs) all.appendChild(x);
      // anything else loose after the sections (notes, legends) goes into the fold too, except the step's buttons
      let n=all.nextElementSibling; while(n&&!n.classList.contains('flowfoot')){ const nx=n.nextElementSibling; if(!n.classList.contains('xpbtn')) all.appendChild(n); n=nx; }
      tiles.querySelectorAll('.tile').forEach(b=>b.onclick=()=>{ all.open=true; const s=secs[+b.dataset.i]; if(s){ s.open=true; s.scrollIntoView({block:'start',behavior:'smooth'}); } }); } }
  place(); }
(function watch(){ const sd=$('#side'); if(!sd) return setTimeout(watch,200);
  new MutationObserver(()=>{ const w=wrap(); if(w&&!w.isConnected) map().appendChild(w); clearTimeout(t); t=setTimeout(arrange,40); }).observe(sd,{childList:true});
  // the 3D opens a moment after the step renders: check again
  setInterval(()=>{ const w=wrap(); if(!w) return; const sd2=$('#side'), slot=sd2&&sd2.querySelector('.c3d'); if(inCard()&&slot&&(w.parentNode!==slot||slot.hidden===(BD.scene3d&&BD.scene3d.isOpen()))) place(); },500); })();
// ⤢ big view: the 3D fills the map area again; a button there brings it back into the card
document.addEventListener('click',e=>{ if(e.target&&e.target.id==='c3back'){ big=false; document.body.classList.remove('big3d'); place(); } });
(function backBtn(){ const m=map(); if(!m) return setTimeout(backBtn,300); const b=document.createElement('button'); b.id='c3back'; b.textContent='Back into the card'; m.appendChild(b); for(const ev of ['pointerdown','wheel']) b.addEventListener(ev,x=>x.stopPropagation()); })();
BD.stage={arrange,place};
})();
