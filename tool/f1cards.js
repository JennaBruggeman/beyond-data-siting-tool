/* Beyond Data — F1 cards (CODE_JOB_F1_site_build.md §3, step 2 onward). One registry for every template's cards, drawn into the card shell of f1.js.
   A card is {chip?, build(ctx) → {draw, lead, hero, rows, meters, key, notes, src, missing, parts}}. Every figure comes from the tool's own functions or files;
   one the tool does not compute is ctx.q() — a red "?" with "not in the tool yet" — and is listed in result.missing (for the report back).
   Drawings use the tool's data (tiles, model, streets) restyled to docs/STYLE.md; no geometry is redrawn by hand and no number is copied from a board.
   Licensed data: Edmonton lot outlines (Altalis) appear only where the tool shows them today (the lot map), never in committed screenshots. */
(function(){
'use strict';
const BD=window.BD; const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const K={ink:'#16181B',ink2:'#4A4D52',mute:'#7B7E83',faint:'#A9ABAF',rule:'#DDDEDF',hair:'#ECECEC',bg:'#FFFFFF',panel:'#FAFAFA',plant:'#E6E4E0',dc:'#3268A6',dcSup:'#A9C0DA',pub:'#B0802A',clin:'#22927A',neut:'#C9CACC',red:'#CC746C',
  fillHall:'#B9CCE1',fillSup:'#E2EAF3',fillPub:'#E7D9BF',fillClin:'#C1E0DA',ground:'#F4F3F0',bld:'#E9E8E5'}; /* STYLE.md §1; ground and building tints are drawing choices for maps (STYLE.md has no map key yet, §5) */
const REG={};
const add=(tpl,title,spec)=>{ (REG[tpl]=REG[tpl]||{})[title]=spec; };
const has=(tpl,title)=>!!(REG[tpl]&&REG[tpl][title]);
const n0=x=>x==null||!isFinite(x)?'?':Math.round(x).toLocaleString('en-CA');
const n1=x=>x==null||!isFinite(x)?'?':(Math.round(x*10)/10).toLocaleString('en-CA');
const titleCase=s=>String(s).toLowerCase().replace(/\b([a-z])/g,c=>c.toUpperCase()).replace(/\b(\d+)(St|Nd|Rd|Th)\b/g,(m,n,x)=>n+x.toLowerCase()).replace(/\b(Nw|Ne|Sw|Se)\b/g,m=>m.toUpperCase());
/* the zones where a data centre is permitted, conditional or discretionary: the rows of tool/data/zones.json (the same test as the zone rule and job A1) */
const ZR=()=>(BD.data&&BD.data.raw&&BD.data.raw.zones)||{ZV:{},ZE:{}};
const zoneKey=(city,a)=>city==='van'?String(a[1]||'').trim():String(a[2]||a[1]||'').trim().split(/\s+/)[0].toUpperCase();
const allowed=(city,key)=>!!(city==='van'?ZR().ZV:ZR().ZE)[key];
const dcStatus=(city,key)=>{ const r=(city==='van'?ZR().ZV:ZR().ZE)[key]||{}, c=(r.cl||[]).find(x=>/data centre/i.test(x[0])), t=c?c[1]:''; return {word:/discretionary/i.test(t)?'discretionary use':/conditional/i.test(t)?'conditional use':/permitted/i.test(t)?'permitted use':'?',clause:c?c[2]:'',text:t,src:r.src||[]}; };
/* small SVG map kit: world metres (the tool's frame, y north) → screen */
function frame(bb,w,h,pad){ pad=pad||0; const sx=(w-2*pad)/(bb[2]-bb[0]), sy=(h-2*pad)/(bb[3]-bb[1]), s=Math.min(sx,sy), ox=pad+((w-2*pad)-(bb[2]-bb[0])*s)/2, oy=pad+((h-2*pad)-(bb[3]-bb[1])*s)/2;
  return {s,P:(x,y)=>[ox+(x-bb[0])*s, oy+(bb[3]-y)*s]}; }
function pathOf(rings,P){ let d=''; for(const r of rings){ for(let i=0;i<r.length;i+=2){ const [x,y]=P(r[i],r[i+1]); d+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1); } d+='Z'; } return d; }
function bbox(r){ let a=1e18,b=1e18,c=-1e18,d=-1e18; for(let i=0;i<r.length;i+=2){ a=Math.min(a,r[i]); b=Math.min(b,r[i+1]); c=Math.max(c,r[i]); d=Math.max(d,r[i+1]); } return [a,b,c,d]; }
const hit=(b,q)=>!(q[0]>b[2]||q[2]<b[0]||q[1]>b[3]||q[3]<b[1]);
function scaleBar(x,y,m,s,lab){ const L=m*s; return `<g font-family="IBM Plex Sans,system-ui,sans-serif" font-size="11" fill="${K.mute}"><rect x="${x}" y="${y}" width="${(L/2).toFixed(1)}" height="4" fill="${K.ink}"/><rect x="${(x+L/2).toFixed(1)}" y="${y}" width="${(L/2).toFixed(1)}" height="4" fill="#fff" stroke="${K.ink}" stroke-width="0.8"/><text x="${x}" y="${y+16}">0</text><text x="${(x+L).toFixed(1)}" y="${y+16}" text-anchor="end">${lab||m+' m'}</text><text x="${x}" y="${y-8}">N ↑</text></g>`; }
/* the meter of STYLE.md §5: one value against a limit */
function meter(m){ const max=m.max||(m.lim?m.lim/0.87:Math.max(1,m.v||1)), pct=x=>Math.max(0,Math.min(100,100*x/max)), pass=m.pass!==false, col=pass?K.ink:K.red;
  return `<div class="f1c-m"><div class="t"><span>${esc(m.l)}</span><span style="color:${col}">${m.v==null?'<b class="f1c-q">?</b>':pass?'pass':'to fix'}</span></div>
   <div class="trk">${m.v==null?'':`<div class="bar" style="width:${pct(m.v)}%;background:${col}"></div>`}${m.lim!=null?`<i style="left:${pct(m.lim)}%"></i>`:''}</div>
   <div class="c"><span>${m.v==null?'not in the tool yet':esc(m.cap||`${n1(m.v)} ${m.unit||''} · limit ${n1(m.lim)} ${m.unit||''}`)}</span><span>${esc(m.src||'')}</span></div></div>`; }
const q=(why)=>({q:true,why:why||'not in the tool yet'});
const val=v=>v&&v.q?`<b class="f1c-q" title="${esc(v.why)}">?</b><span class="f1c-qn">${esc(v.why)}</span>`:esc(v);
/* render a built card into the shell's drawing area and panel body */
function render(res,dr,pb,srcEl){ dr.innerHTML=res.draw||'';
  const hero=(res.hero||[]).length?`<div class="f1c-hero">${res.hero.map(h=>`<div><div class="v${h.red?' red':''}">${h.v&&h.v.q?'<b class="f1c-q">?</b>':esc(h.v)}${h.u?`<span>${esc(h.u)}</span>`:''}</div><div class="l">${esc(h.l)}${h.v&&h.v.q?' · not in the tool yet':''}</div></div>`).join('')}</div>`:'';
  const rows=(res.rows||[]).length?`<dl class="f1c-rows">${res.rows.map(r=>`<dt>${esc(r[0])}</dt><dd>${val(r[1])}</dd>`).join('')}</dl>`:'';
  const met=(res.meters||[]).map(meter).join('');
  const more=(res.more||[]).map(m=>`<details class="f1c-more"><summary>${esc(m[0])}</summary><div>${m[1]}</div></details>`).join('');
  pb.innerHTML=(res.lead?`<p class="lead">${esc(res.lead)}</p>`:'')+hero+rows+met+more;
  if(srcEl) srcEl.innerHTML=`<summary>Sources and assumptions</summary><ul>${(res.src||[]).map(s=>`<li>${esc(s)}</li>`).join('')}${(res.missing||[]).length?`<li class="f1c-miss">Not in the tool yet: ${esc(res.missing.join('; '))}</li>`:''}</ul>`; }
/* the Architecture state the cards read (Ratios at the tool's defaults, the Emergency hub's programs, Arrange's placement), set up once per lot as
   checks/tests/export_layout.js does it: the lot sized as a worked example (flow.js findFit), Ratios at its own defaults, then the programs picked (refuge side by side,
   warming shelter, clinic), then Arrange's placement.
   The example typology is the Emergency hub (the first in the library); the typology picker is not built (Phase D), so this is the tool's state today. */
const AR={key:null,P:null,busy:null};
const EXAMPLE_PICKS=['refuge','warming_shelter','clinic'];
async function arch(){ const s=BD.S.sel; if(!s) return null; const key=s.city+':'+s.id; if(AR.key===key&&AR.P) return AR.P; if(AR.busy&&AR.bkey===key) return AR.busy;
  AR.bkey=key; AR.busy=(async()=>{ const keepT=BD.tier&&BD.tier(), wait=ms=>new Promise(r=>setTimeout(r,ms));
    try{ if(BD.setTier) BD.setTier('arch'); await BD.arch.ready; const An=BD.S.answers; for(const k of Object.keys(An)) delete An[k]; Object.assign(An,{built:'new',extent:'whole',floor:'',mw:null});
      BD.modelReset(); if(BD.flow.findFit) BD.flow.findFit(); /* the largest size where everything fits, as a worked example opens (flow.js findFit) */
      BD.arch.ratio=null; BD.arch.picks=[]; BD.modelReset(); await BD.views.arat(); await wait(300);
      const A=BD.arch; A.picks=[]; EXAMPLE_PICKS.forEach(id=>BD.archTest.add(id)); const rf=A.picks.find(q=>q.id==='refuge'); if(rf) rf.opt='side_by_side';
      BD.modelReset(); const P=BD.archTest.place(); AR.key=key; AR.P=P; return P; }
    finally{ if(keepT&&BD.setTier&&keepT!=='arch') BD.setTier(keepT); AR.busy=null; } })();
  return AR.busy; }
/* the context a card reads: the example lot, as the tool models it */
function ctx(city){ const M=BD.model(), sel=BD.S.sel||{}, a=sel.a||[], key=zoneKey(city,a);
  return {city,M,sel,a,key,addr:a[0]?titleCase(a[0]):'?',zone:key,status:dcStatus(city,key),arch,K,n0,n1,q,esc,frame,pathOf,bbox,hit,scaleBar,allowed,zoneKey,titleCase}; }
BD.f1cards={arch,EXAMPLE_PICKS,add,has,get:(tpl,title)=>REG[tpl]&&REG[tpl][title],render,ctx,K,meter,frame,pathOf,bbox,hit,scaleBar,allowed,zoneKey,dcStatus,q,n0,n1,esc,titleCase};
})();
