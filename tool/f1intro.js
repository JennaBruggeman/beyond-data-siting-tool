/* Beyond Data — the landing intro (CODE_JOB_F5_intro.md §3, 8 Nov 2026; board Story_Intro, schematic). Display only: changes no result.
   Six scenes, about 52 s, built in the page from the real interface: scene 2 draws both city maps as the 'Your city' card does (tiles/<city>/meta.json
   zones, streets_<city>.json) with counts read from tool/data/approval_counts.json at run time; scene 3 the four templates from BD.f1.TPL and the landing's
   own images; scenes 4–5 drive the real card viewer (BD.f1.viewer) on 339 1st Ave E and the real interactive logic diagram (BD.f1logic.open); scene 6
   is the real landing page. Captions: tool/data/intro.json. Pointers in DC blue. No sound, no video.
   Plays by itself on the first visit only (localStorage 'bd-f1-intro', in try/catch). Never by itself under automation (navigator.webdriver, as in the
   Playwright checks), with ?nointro or window.BD_NO_INTRO; ?old and 'bd-f1-skip' skip the landing and so the intro. prefers-reduced-motion: still slides.
   BD.f1intro.play() runs it (still slides under reduced motion), .still() shows the slides, .first() is the first-visit call from the landing page. */
(function(){
'use strict';
const BD=window.BD; const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const KEY='bd-f1-intro', DC='#3268A6', STOP={stop:1};
const reduced=()=>{ try{ return matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){ return false; } };
let RUN=0, R=null, TXT=null, COUNTS=null, MAPS={}, firstDone=false;
const alive=t=>t===RUN&&R;
const $=s=>document.querySelector(s);

/* ---------- styles (tokens from f1.css / STYLE.md §8) ---------- */
const CSS=`
#f1i{position:fixed;inset:0;z-index:2300;font-family:var(--f-font,'IBM Plex Sans',system-ui,sans-serif);color:var(--f-ink,#16181B);font-variant-numeric:tabular-nums;-webkit-font-smoothing:antialiased;transition:opacity .8s}
#f1i *{box-sizing:border-box}
#f1i.out{opacity:0}
#f1i .f1i-bg{position:absolute;inset:0;background:#fff;transition:opacity .6s}
#f1i.clear .f1i-bg{opacity:0}
#f1i .f1i-stage{position:absolute;left:0;right:0;top:64px;bottom:190px;display:flex;align-items:center;justify-content:center;padding:0 64px;transition:opacity .5s}
#f1i.clear .f1i-stage{opacity:0;pointer-events:none}
#f1i .f1i-cap{position:absolute;left:50%;bottom:72px;transform:translateX(-50%);width:min(940px,calc(100% - 32px));text-align:center}
#f1i .f1i-cap p{margin:0;font-size:26px;font-weight:300;line-height:1.35;transition:opacity .45s}
#f1i .f1i-cap p+p{margin-top:10px}
#f1i .f1i-cap p.hide{opacity:0}
#f1i.dock .f1i-cap{bottom:auto;width:auto;max-width:620px;text-align:left;background:#fff;border:1px solid var(--f-rule,#DDDEDF);border-radius:2px;padding:14px 18px;box-shadow:0 8px 24px rgba(22,24,27,.08)}
#f1i.dock .f1i-cap p{font-size:16px;font-weight:400;line-height:1.5}
#f1i.float .f1i-cap{top:auto;bottom:44px;left:50%;transform:translateX(-50%);text-align:center}
#f1i.dock:not(.float) .f1i-skip{top:72px}
#f1i .f1i-skip{position:absolute;top:16px;right:20px;z-index:3;background:#fff;border:1px solid var(--f-rule,#DDDEDF);border-radius:999px;padding:6px 14px;font:inherit;font-size:12.5px;color:var(--f-ink2,#4A4D52);cursor:pointer}
#f1i .f1i-skip:hover,#f1i .f1i-skip:focus-visible{color:var(--f-ink,#16181B);border-color:var(--f-ink,#16181B);outline:none}
#f1i .f1i-prog{position:absolute;left:0;bottom:0;height:2px;background:${DC};width:0}
#f1i .f1i-nav{display:flex;gap:22px;align-items:center;justify-content:center;margin-top:18px;font-size:12.5px;color:var(--f-mute,#7B7E83)}
#f1i.dock .f1i-nav{justify-content:flex-start;margin-top:10px}
#f1i.float .f1i-nav{justify-content:center}
#f1i .f1i-nav button{font:inherit;font-size:13px;background:none;border:0;color:var(--f-ink,#16181B);cursor:pointer;padding:4px 0;border-bottom:1px solid var(--f-ink,#16181B)}
#f1i .f1i-nav button[disabled]{color:var(--f-faint,#A9ABAF);border-color:transparent;cursor:default}
#f1i .f1i-ptr{position:absolute;left:50%;top:50%;width:22px;height:22px;margin:-2px 0 0 -3px;opacity:0;z-index:2;pointer-events:none;transition:left .7s cubic-bezier(.4,0,.2,1),top .7s cubic-bezier(.4,0,.2,1),opacity .3s}
#f1i .f1i-ptr.on{opacity:1}
#f1i .f1i-ptr i{position:absolute;left:3px;top:2px;width:26px;height:26px;margin:-13px 0 0 -13px;border:2px solid ${DC};border-radius:50%;opacity:0}
#f1i .f1i-ptr.tap i{animation:f1i-tap .6s ease-out}
@keyframes f1i-tap{from{opacity:.9;transform:scale(.3)}to{opacity:0;transform:scale(1.5)}}
#f1i.still *,#f1i.still{transition:none!important;animation:none!important}
/* scene 1 */
#f1i .f1i-sky{width:min(980px,100%);height:auto}
#f1i .f1i-sky .dc{fill:#A9ABAF;transition:fill 1.2s ease .6s}
#f1i .f1i-sky.lit .dc{fill:${DC}}
#f1i .f1i-sky .ray{opacity:0;transition:opacity .7s}
#f1i .f1i-sky.rays .ray{opacity:1}
#f1i .f1i-sky.rays .ray.r2{transition-delay:.35s}#f1i .f1i-sky.rays .ray.r3{transition-delay:.7s}
/* scene 2 */
#f1i .f1i-two{display:grid;grid-template-columns:1fr 1fr;gap:56px;width:min(1120px,100%);height:100%}
#f1i .f1i-two figure{margin:0;display:flex;flex-direction:column;min-height:0}
#f1i .f1i-two figcaption{font-size:15px;margin-bottom:6px}
#f1i .f1i-two svg{flex:1 1 auto;min-height:0;width:100%}
#f1i .f1i-two .z{opacity:0;transition:opacity .9s}
#f1i .f1i-two.lit .z{opacity:1}
#f1i .f1i-two .n{font-size:30px;font-weight:300;line-height:1.1;margin-top:6px}
#f1i .f1i-two .n span{font-size:12.5px;color:var(--f-mute,#7B7E83);margin-left:8px}
#f1i .f1i-key{position:absolute;left:64px;right:64px;bottom:-30px;display:flex;gap:22px;justify-content:center;font-size:11.5px;color:var(--f-mute,#7B7E83)}
#f1i .f1i-key i{display:inline-block;width:12px;height:12px;border-radius:2px;background:${DC};vertical-align:-2px;margin-right:6px}
/* scene 3 */
#f1i .f1i-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;width:min(1160px,100%)}
#f1i .f1i-card{border:1px solid var(--f-hair,#ECECEC);border-radius:3px;background:#fff;padding:0 0 18px;transition:transform .6s cubic-bezier(.3,.7,.3,1),box-shadow .6s,border-color .6s;opacity:.55}
#f1i .f1i-card img{width:100%;aspect-ratio:9/5;object-fit:cover;object-position:center 55%;display:block;background:var(--f-panel,#FAFAFA)}
#f1i .f1i-card h3{font-size:26px;font-weight:300;margin:16px 18px 8px}
#f1i .f1i-card p{font-size:14px;line-height:1.55;color:var(--f-ink2,#4A4D52);margin:0 18px 12px;min-height:44px}
#f1i .f1i-card .m{font-size:11.5px;color:var(--f-mute,#7B7E83);margin:0 18px}
#f1i .f1i-card.up{transform:translateY(-18px);border-color:${DC};box-shadow:0 16px 34px rgba(22,24,27,.10);opacity:1}
#f1i .f1i-card.seen{opacity:1}
/* scenes 4–6: the real interface, marked in blue */
body.f1i-strip #f1v .f1v-strip{box-shadow:inset 0 0 0 2px ${DC}}
body.f1i-strip #f1v .f1v-strip button{border-color:#A9C0DA}
body.f1i-strip #f1v .f1v-strip button[aria-current="true"]{border-color:${DC};color:var(--f-ink,#16181B);background:linear-gradient(#E2EAF3,#E2EAF3) no-repeat left/0% 100%;animation:f1i-fill 1.3s ease-out forwards}
@keyframes f1i-fill{to{background-size:100% 100%}}
body.f1i-how #f1v .f1v-head .f1v-how{color:${DC};text-decoration-color:${DC};outline:1.5px solid ${DC};outline-offset:6px;border-radius:2px}
body.f1i-on #f1l{animation:f1i-slide .8s cubic-bezier(.3,.7,.3,1)}
@keyframes f1i-slide{from{transform:translateX(100%)}to{transform:none}}
body.f1i-still #f1l{animation:none}
body.f1i-still #f1v .f1v-strip button[aria-current="true"]{animation:none;background-size:100% 100%}
body.f1i-fade #f1v,body.f1i-fade #f1l{opacity:0;transition:opacity .6s}
#f1.f1i-zoom{transform:scale(1.32);transform-origin:50% 30%}
#f1.f1i-zoom.go{transform:none;transition:transform 1.6s cubic-bezier(.3,.7,.3,1)}
#f1.f1i-ways .f1-row .ract [data-see],#f1.f1i-ways .f1-row .ract [data-logic]{outline:1.5px solid ${DC};outline-offset:5px;border-radius:2px}
#f1.f1i-ways .f1-row .ract [data-logic]{color:${DC};border-bottom-color:${DC}}
@media (max-width:760px){
 #f1i .f1i-stage{padding:0 16px;top:56px;bottom:200px}
 #f1i .f1i-cap p{font-size:19px}
 #f1i .f1i-two{gap:14px}
 #f1i .f1i-cards{grid-template-columns:1fr 1fr;gap:12px}
 #f1i .f1i-card h3{font-size:18px;margin:10px 10px 4px}#f1i .f1i-card p{font-size:12px;margin:0 10px 6px;min-height:0}#f1i .f1i-card .m{margin:0 10px}
 #f1i .f1i-key{left:16px;right:16px;flex-wrap:wrap}
 #f1i.dock .f1i-cap{left:16px!important;right:16px;width:auto!important;transform:none}
}`;
function css(){ if(document.getElementById('f1i-css')) return; const s=document.createElement('style'); s.id='f1i-css'; s.textContent=CSS; document.head.appendChild(s); }

/* ---------- data ---------- */
async function text(){ if(!TXT) TXT=await fetch('data/intro.json').then(r=>r.json()); return TXT; }
async function counts(){ if(!COUNTS) COUNTS=await fetch('data/approval_counts.json').then(r=>r.json()).catch(()=>null); return COUNTS; }
const lotsAllowed=(c,city)=>{ const r=c&&c[city]; return r&&isFinite(r.permitted)&&isFinite(r.conditional)?r.permitted+r.conditional:null; };
const zkey=(city,z)=>city==='van'?String(z||'').trim():String(z||'').trim().split(/\s+/)[0].toUpperCase(); /* as f1arch.js 'Your city' */
/* a city at city scale, as the 'Your city' card draws it: streets light, the zones where a data centre is allowed in DC blue, never lot outlines */
async function cityMap(city){ if(MAPS[city]) return MAPS[city]; const C=BD.f1cards, m=await BD.getJSON(`tiles/${city}/meta.json`), Q=m.Q||1, st=await BD.streets(city);
  const dec=a=>{ const r=new Float64Array(a.length); let x=0,y=0; for(let i=0;i<a.length;i+=2){ x+=a[i]; y+=a[i+1]; r[i]=x/Q; r[i+1]=y/Q; } return r; };
  const W=520, H=470, f=C.frame(m.ext,W,H,6), zs=m.overview.filter(([zi])=>C.allowed(city,zkey(city,m.zones[zi]))).map(([,a])=>dec(a));
  let sd=''; if(st) for(const g of st.segs){ for(let i=2;i+1<g.length;i+=2){ const [a,b]=f.P(g[i],g[i+1]); sd+=(i>2?'L':'M')+a.toFixed(1)+' '+b.toFixed(1); } }
  /* zones light up west to east in five bands */
  const xs=zs.map(r=>r[0]), lo=Math.min(...xs), hi=Math.max(...xs), B=[[],[],[],[],[]]; zs.forEach(r=>B[Math.min(4,Math.floor((r[0]-lo)/((hi-lo)||1)*5))].push(r));
  return MAPS[city]=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${city==='van'?'Vancouver':'Edmonton'}: streets, and the zones where a data centre is allowed"><path d="${sd}" fill="none" stroke="#DDDEDF" stroke-width="0.5"/>${B.map((b,i)=>b.length?`<path class="z" style="transition-delay:${(i*0.35).toFixed(2)}s" d="${C.pathOf(b,f.P)}" fill="${DC}"/>`:'').join('')}</svg>`; }

/* ---------- overlay ---------- */
function wait(ms){ const t=RUN; if(R&&R.still) ms=0; return new Promise((res,rej)=>setTimeout(()=>alive(t)?res():rej(STOP),ms)); }
async function until(fn,ms){ const t0=Date.now(); while(Date.now()-t0<ms){ if(!R) throw STOP; try{ if(fn()) return true; }catch(e){} await new Promise(r=>setTimeout(r,150)); } return false; }
function overlay(still){ css(); let O=document.getElementById('f1i'); if(O) O.remove(); O=document.createElement('div'); O.id='f1i'; O.setAttribute('role','dialog'); O.setAttribute('aria-modal','true'); O.setAttribute('aria-label','Intro');
  if(still) O.className='still';
  O.innerHTML=`<div class="f1i-bg"></div><div class="f1i-stage"></div><div class="f1i-cap"><div class="f1i-txt" aria-live="polite"></div>${still?'<nav class="f1i-nav" aria-label="Intro slides"><button data-prev>Back</button><span class="no"></span><button data-next>Next</button></nav>':''}</div><div class="f1i-ptr" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 22 22"><path d="M3 2L3 18L7.5 13.8L10.6 20.5L13.4 19.2L10.4 12.6L16.5 12.4Z" fill="${DC}" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg><i></i></div>
   <button class="f1i-skip" data-skip>${esc((TXT&&TXT.skip)||'Skip intro')}&nbsp;&nbsp;✕</button>${still?'':'<div class="f1i-prog"></div>'}`;
  document.body.appendChild(O); O.querySelector('.f1i-skip').focus();
  O.addEventListener('click',e=>{ if(e.target.closest('[data-skip]')) return stop(); if(e.target.closest('[data-next]')) return R&&R.go(R.i+1); if(e.target.closest('[data-prev]')) return R&&R.go(R.i-1); });
  return O; }
function onKey(e){ if(!R) return; if(e.key==='Escape'){ e.preventDefault(); e.stopImmediatePropagation(); stop(); return; }
  if(R.still&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){ e.preventDefault(); e.stopImmediatePropagation(); R.go(R.i+(e.key==='ArrowRight'?1:-1)); } }
function caption(lines,mode){ const O=R.O, cap=O.querySelector('.f1i-cap'); O.classList.toggle('dock',mode==='dock'||mode==='float'); O.classList.toggle('float',mode==='float'); cap.style.left=cap.style.top=cap.style.width=cap.style.transform='';
  cap.querySelector('.f1i-txt').innerHTML=lines.map((t,i)=>`<p${i&&!R.still?' class="hide"':''}>${esc(t)}</p>`).join(''); }
function showLine(i){ const p=R.O.querySelectorAll('.f1i-cap p')[i]; if(p) p.classList.remove('hide'); }
function dockCaption(over){ /* the caption box sits over the real interface: above the strip, in the drawing area */ const cap=R.O.querySelector('.f1i-cap'), m=$('#f1v .f1v-main')||$('#f1l .f1v-main'), sp=$('#f1v .f1v-strip');
  if(!m) return; const r=m.getBoundingClientRect(), b=over?over.getBoundingClientRect().top:(sp?sp.getBoundingClientRect().top:innerHeight-20);
  cap.style.left=Math.round(r.left+24)+'px'; cap.style.transform='none'; cap.style.width=Math.min(620,r.width-48)+'px'; cap.style.top=Math.max(70,Math.round(b-cap.offsetHeight-18))+'px'; }
function stage(html,clear){ R.O.classList.toggle('clear',!!clear); R.O.querySelector('.f1i-stage').innerHTML=html||''; return R.O.querySelector('.f1i-stage'); }
async function point(el,tap){ const P=R.O.querySelector('.f1i-ptr'); if(!el){ P.classList.remove('on'); return; } const r=el.getBoundingClientRect();
  P.style.left=Math.round(r.left+Math.min(r.width/2,60))+'px'; P.style.top=Math.round(r.top+r.height/2)+'px'; P.classList.add('on'); await wait(800);
  if(tap){ P.classList.remove('tap'); void P.offsetWidth; P.classList.add('tap'); } }
const body=(c,on)=>document.body.classList.toggle(c,on);

/* ---------- the real interface ---------- */
const closeLogic=()=>{ const l=$('#f1l'); if(l) l.remove(); };
async function ensureViewer(tpl){ let W=$('#f1v'); if(!W||!(BD.f1&&BD.f1.TPL)) { BD.f1.viewer(tpl); W=$('#f1v'); R.opened=true; }
  else if(!W.querySelector('.f1v-head .tpl')||W.querySelector('.f1v-head .tpl').textContent!==BD.f1.TPL.find(t=>t.id===tpl).name){ BD.f1.viewer(tpl); R.opened=true; }
  const van=()=>$('#f1v [data-city="van"]'); await until(()=>van(),3000); /* 339 1st Ave E: the Vancouver example lot */
  if(van()&&van().getAttribute('aria-pressed')!=='true') van().click();
  return until(()=>{ const w=$('#f1v .f1v-where'), d=$('#f1v .f1v-draw'); return w&&w.textContent&&w.textContent!=='…'&&d&&!/Drawing…/.test(d.textContent); },20000); }
const strip=k=>$(`#f1v .f1v-strip [data-to="${k}"]`);
const built=()=>{ const d=$('#f1v .f1v-draw'); return d&&!/Drawing…/.test(d.textContent); };

/* ---------- scenes ---------- */
const S=[
 /* 1. the question: a grey skyline, one block fills blue; dashed lines reach out to heat, space and power */
 async function(sc){ caption(sc.captions); stage(skyline(sc.labels)); const sky=R.O.querySelector('.f1i-sky'); await wait(60); sky.classList.add('lit');
   await wait(3000); sky.classList.add('rays'); showLine(1); await wait(4000); },
 /* 2. two cities: the real maps, the allowed zones light up, the counts read at run time */
 async function(sc){ caption(sc.captions); const c=await counts(), [mv,me]=await Promise.all([cityMap('van'),cityMap('edm')]);
   const fig=(city,name,svg)=>{ const n=lotsAllowed(c,city); return `<figure><figcaption>${name}</figcaption>${svg}<div class="n" data-n="${n==null?'':n}">${n==null?'?':R.still?n.toLocaleString('en-CA'):'0'}<span>${esc(sc.count)}</span></div></figure>`; };
   const st=stage(`<div class="f1i-two">${fig('van','Vancouver',mv)}${fig('edm','Edmonton',me)}</div><div class="f1i-key"><span><i></i>${esc(sc.key)}</span><span>${esc(sc.source)}</span></div>`);    await wait(300); st.querySelector('.f1i-two').classList.add('lit'); countUp(st); await wait(4700); },
 /* 3. four templates: cards from BD.f1.TPL with the landing's own images; each lifts in turn with its line */
 async function(sc){ caption(sc.captions); const T=BD.f1.TPL;
   stage(`<div class="f1i-cards">${T.map(t=>`<div class="f1i-card${R.still?' seen':''}" data-id="${t.id}"><img src="f1/img/${t.img}.png" alt=""><h3>${esc(t.name)}</h3><p>${esc(sc.lines[t.id]||'')}</p><div class="m">${t.cards.length} steps · report</div></div>`).join('')}</div>`);
   if(!R.still){ const wf=S_TXT(3); BD.f1.viewer(wf.template); R.opened=true; /* the next scene's viewer loads behind the cards */ }
   const cards=[...R.O.querySelectorAll('.f1i-card')];
   for(const c of cards){ if(R.still) break; c.classList.add('up','seen'); await wait(3300); c.classList.remove('up'); }
   await wait(1800); },
 /* 4. the workflow: the real viewer on 339 1st Ave E, the strip in DC blue, a sped-up run through the first steps */
 async function(sc){ closeLogic(); R.O.classList.add('clear'); caption(sc.captions,'dock'); await ensureViewer(sc.template); body('f1i-strip',true); dockCaption();
   const steps=R.still?[sc.steps[sc.steps.length-1]]:sc.steps;
   if(R.still){ const b=strip(steps[0]-1); if(b&&b.getAttribute('aria-current')!=='true') b.click(); await until(built,15000); dockCaption(); await point(strip(steps[0]-1)); return; }
   await wait(700);
   for(const k of steps){ const b=strip(k-1); if(!b) continue; await point(b,true); b.click(); dockCaption(); await wait(1500); }
   await until(built,3000); },
 /* 5. the interactive logic diagram: How it works in blue; then a figure on the card opens the diagram at its node */
 async function(sc){ R.O.classList.add('clear'); const wf=S_TXT(3); caption(sc.captions,'dock'); await ensureViewer(wf.template); body('f1i-strip',false);
   const k=wf.steps[wf.steps.length-1]-1; if(strip(k)&&strip(k).getAttribute('aria-current')!=='true'){ strip(k).click(); } await until(built,15000);
   if(!$('#f1l')){ body('f1i-how',true); dockCaption(); await point($('#f1v .f1v-head .f1v-how')); await wait(1600);
     const fig=$('#f1v .f1c-hero [data-fig]')||$('#f1v [data-fig]'); if(fig){ await point(fig,true); await wait(300); }
     const V=BD.f1.TPL.find(t=>t.id===wf.template), c=V.cards[k], ids=BD.f1logic.cardIds(c.t,V.tab);
     if(fig&&fig.dataset.k) fig.click(); /* the figure's own node */
     else await BD.f1logic.open({tab:V.tab,label:c.t+' · '+(fig?fig.dataset.fig:''),ids,lot:($('#f1v .f1v-where')||{}).textContent||'',sel:ids[0]||null}); /* a figure without its own node opens at the card's first part, as F5 1(c) */
     body('f1i-how',false); }
   await until(()=>$('#f1l .f1l-box svg'),8000);
   const box=$('#f1l .f1l-box'), sel=box&&(box.querySelector('.lp.sel')||box.querySelector('.lp.lit'));
   if(sel){ const br=box.getBoundingClientRect(), r=sel.getBoundingClientRect(); box.scrollLeft+=r.left-br.left-br.width/2+r.width/2; box.scrollTop+=r.top-br.top-br.height/2+r.height/2; }
   dockCaption($('#f1l .f1l-key')); await wait(900); if(sel) await point(sel.querySelector('rect')||sel); await wait(3600); },
 /* 6. where to start: the real landing page, zoomed out, both ways in on every template */
 async function(sc){ const L=$('#f1'); R.O.classList.add('clear'); body('f1i-strip',false); body('f1i-how',false); caption(sc.captions,'float');
   if(!R.still&&($('#f1v')||$('#f1l'))){ body('f1i-fade',true); await wait(600); }
   closeLogic(); const v=$('#f1v'); if(v) v.remove(); body('f1i-fade',false);
   if(!L){ await wait(5000); return; }
   const w=L.querySelector('#f1-work'); if(w) L.scrollTop=w.offsetTop-24;
   if(!R.still){ L.classList.add('f1i-zoom'); void L.offsetWidth; L.classList.add('go'); }
   await wait(1700); L.classList.add('f1i-ways'); const lk=L.querySelector('.f1-row [data-logic]'); await wait(500); await point(lk); await wait(R.still?0:3600); }
];
const S_TXT=i=>TXT.scenes[i];
function skyline(labels){ const H=[64,98,76,120,58,142,88,70,110,92,0,84,128,66,104,150,72,96,60,118,86,100,74,132,90,62]; let s='', x=40; const base=300;
  H.forEach((h,i)=>{ if(i===10){ s+=`<rect class="dc" x="${x}" y="${base-96}" width="92" height="96"/>`; x+=100; return; } s+=`<rect x="${x}" y="${base-h}" width="26" height="${h}" fill="#A9ABAF"/>`; x+=34; });
  const cx=40+10*34+46, L=labels||['heat','space','power'], T=[[cx-220,380],[cx,390],[cx+220,380]];
  const rays=T.map(([tx,ty],i)=>`<g class="ray r${i+1}"><path d="M${cx+(i-1)*30} ${base} L${tx} ${ty-18}" stroke="${DC}" stroke-width="1.4" stroke-dasharray="4 4" fill="none"/><text x="${tx}" y="${ty}" text-anchor="middle" font-size="17" fill="${DC}">${esc(L[i])}</text></g>`).join('');
  return `<svg class="f1i-sky" viewBox="0 0 ${x+40} 400" role="img" aria-label="A skyline; one building, a data centre, in blue, with lines out to ${L.join(', ')}"><line x1="20" y1="${base}" x2="${x+20}" y2="${base}" stroke="#DDDEDF"/>${s}${rays}</svg>`; }
function countUp(st){ const t=RUN; st.querySelectorAll('.n[data-n]').forEach(el=>{ const n=+el.dataset.n, sp=el.querySelector('span'); if(!el.dataset.n||R.still) return; const t0=performance.now();
  const f=now=>{ if(!alive(t)) return; const k=Math.min(1,(now-t0)/1400), v=Math.round(n*(1-Math.pow(1-k,3))); el.firstChild.nodeValue=v.toLocaleString('en-CA'); if(k<1) requestAnimationFrame(f); }; requestAnimationFrame(f); }); }

/* ---------- run, still, stop ---------- */
function begin(still){ stop(true); RUN++; const hadV=!!$('#f1v'); R={still,i:0,O:overlay(still),opened:false,hadV,t:RUN}; body('f1i-on',true); body('f1i-still',!!still); document.addEventListener('keydown',onKey,true); return R; }
async function play(){ if(reduced()) return still(); await text().catch(()=>null); if(!TXT) return; const me=begin(false), t=RUN; counts(); cityMap('van').catch(()=>{}); cityMap('edm').catch(()=>{});
  const total=TXT.scenes.reduce((a,s)=>a+s.s,0), prog=me.O.querySelector('.f1i-prog'); prog.style.transition=`width ${total}s linear`; requestAnimationFrame(()=>{ prog.style.width='100%'; });
  try{ for(let i=0;i<S.length;i++){ if(!alive(t)) return; me.i=i; me.O.dataset.scene=i+1; await S[i](TXT.scenes[i]); }
    if(!alive(t)) return; me.O.classList.add('out'); await wait(800); stop(); }
  catch(e){ if(e!==STOP){ console.error('f1 intro',e); if(alive(t)) stop(); } } }
async function still(){ await text().catch(()=>null); if(!TXT) return; const me=begin(true), t=RUN;
  me.go=async i=>{ if(!alive(t)||i<0||i>=S.length) return; me.i=i; me.O.dataset.scene=i+1; const nav=me.O.querySelector('.f1i-nav');
    nav.querySelector('.no').textContent=`${i+1} / ${S.length} · ${TXT.scenes[i].title}`; nav.querySelector('[data-prev]').disabled=i===0;
    const nx=nav.querySelector('[data-next]'); nx.textContent=i===S.length-1?'Done':'Next'; if(i===S.length-1) nx.dataset.skip=''; else delete nx.dataset.skip;
    me.O.querySelector('.f1i-ptr').classList.remove('on'); me.O.classList.remove('clear');
    if(i<3){ /* back to an opaque slide: the real interface steps back too */ body('f1i-strip',false); body('f1i-how',false); }
    const tk=me.tk=(me.tk||0)+1; try{ me.busy=true; await S[i](TXT.scenes[i]); }catch(e){ if(e!==STOP) console.error('f1 intro',e); } if(tk===me.tk) me.busy=false; };
  me.go(0); }
function stop(quiet){ if(!R) return; const me=R; R=null; RUN++; document.removeEventListener('keydown',onKey,true); me.O.remove();
  ['f1i-on','f1i-still','f1i-strip','f1i-how','f1i-fade'].forEach(c=>body(c,false)); const L=$('#f1'); if(L) L.classList.remove('f1i-zoom','go','f1i-ways');
  if(me.opened&&!me.hadV){ closeLogic(); const v=$('#f1v'); if(v) v.remove(); }
  if(!quiet){ const b=L&&L.querySelector('[data-go="intro"]'); if(b) b.focus({preventScroll:true}); } }
/* first visit: once, remembered in the browser; never under automation or when asked not to */
function first(){ if(firstDone) return; firstDone=true; let seen=false;
  try{ seen=localStorage.getItem(KEY)==='seen'; }catch(e){}
  if(seen||navigator.webdriver||window.BD_NO_INTRO||/[?&](old|nointro)\b/.test(location.search)) return;
  try{ localStorage.setItem(KEY,'seen'); }catch(e){}
  play(); }
BD.f1intro={play,still,stop,first,reset:()=>{ try{ localStorage.removeItem(KEY); }catch(e){} }};
if(document.getElementById('f1')) first();
})();
