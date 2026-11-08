/* Beyond Data — How it works: the logic view (CODE_JOB_F1_site_build.md §3d, J.B. 7 Nov 2026). Display only: reads logic.json (218 parts, wires, stages)
   and opps.json (source texts, kinds); changes no part, value or register entry. Restyled to STYLE.md: stages as columns, parts as white boxes,
   today's accent colours kept for what is lit (#CC746C) and for links (#B5544B), the selected part with a 1.8 px INK border, the rest FAINT.
   A gap (trust 0 or not rated) is a dashed border and "?", not a colour. Template switch: Resident · Municipal · Engineering · Architecture · All,
   filtered by each part's template tag as logic.js does. Municipal: the parts tagged 'm' in logic.json (8 Nov 2026). */
(function(){
'use strict';
const BD=window.BD; const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const RANK={resident:0,arch:1,full:2,arch_only:9};
const TABS=[['resident','Resident'],['municipal','Municipal'],['full','Engineering'],['arch','Architecture'],['all','All']];
/* Municipal: the parts tagged 'm' in logic.json (make_templates.py MUNI; Cowork's reply on municipal_logic_parts.md, 8 Nov 2026) */
const MUNI_CARD={'Your city':['parcel','zone'],'Your parcel':['parcel','zone'],'Is a data centre allowed?':['zoning_status'],'Height and floor area':['envelope','floor_area','roof_equipment_rule'],'Yards by edge':['envelope'],
 'Noise limits around the lot':['noise_limit'],'Storeys and street frontage':['storey_min'],'Loading':['loading_need'],'Approval process':['rezoning_price']};
/* parts lit by a card ("How this is worked out"), from logic.js's step lists where a card matches a step; the other cards light nothing yet */
const CARD={ 'Size and cooling':'setup','Backup power':'setup','What fits':'fits','Heat':'heat','Electricity':'energy','Water':'water','Materials':'materials','Three options':'opts','Could become':'opps','Heat receivers nearby':'heat','People nearby':'social','Neighbours and views':'social' };
const WORD=[[100,'arithmetic'],[90,'regulation, tariff or standard read directly'],[80,'government dataset'],[70,'peer-reviewed coefficient from another context'],[60,'derived with a stated assumption'],[50,'operator or industry claim'],[40,'proxy'],[20,'judged'],[0,'gap']]; /* CLAUDE.md §3 */
const word=q=>{ if(q==null) return 'not rated'; for(const [v,w] of WORD) if(q>=v) return w; return 'gap'; };
let L=null, O=null, UP={}, ORDER={}; const S={tab:'full',sel:null,lit:[],label:''};
const load=async()=>{ if(!L){ L=await fetch('logic.json').then(r=>r.json()); Object.keys(L.nodes).forEach((k,i)=>ORDER[k]=i); for(const [a,b] of L.edges) (UP[b]=UP[b]||[]).push(a); }
  if(!O) O=await fetch('opps.json').then(r=>r.json()).catch(()=>({sources:{},source_kinds:{}})); };
const shown=k=>{ const t=L.nodes[k].t; if(S.tab==='all') return true; if(S.tab==='municipal') return !!L.nodes[k].m; if(t==='arch_only') return S.tab==='arch'; return RANK[t]<=RANK[S.tab]; };
function ancestors(ids){ const s=new Set(), st=[...ids]; while(st.length){ const x=st.pop(); if(s.has(x)) continue; s.add(x); (UP[x]||[]).forEach(p=>st.push(p)); } return s; }
function visParents(id,V){ const out=new Set(), seen=new Set(), st=[...(UP[id]||[])]; while(st.length){ const x=st.pop(); if(seen.has(x)) continue; seen.add(x); if(V.has(x)) out.add(x); else (UP[x]||[]).forEach(p=>st.push(p)); } return out; }
const wrap=(t,n)=>{ const w=String(t).split(/\s+/), out=['']; for(const x of w){ const c=out[out.length-1]; if((c+' '+x).trim().length>n&&c){ if(out.length===2){ out[1]=(out[1]+' '+x).trim(); continue; } out.push(x); } else out[out.length-1]=(c+' '+x).trim(); }
  if(out[1]&&out[1].length>n) out[1]=out[1].slice(0,n-1).trimEnd()+'…'; return out; };
function diagram(){ const keys=Object.keys(L.nodes).filter(shown).sort((a,b)=>ORDER[a]-ORDER[b]), V=new Set(keys);
  const focus=S.sel?[S.sel]:S.lit.filter(k=>V.has(k)), A=focus.length?ancestors(focus):new Set();
  const st=L.stages.map(s=>s[0]), cols={}; st.forEach(s=>cols[s]=[]); keys.forEach(k=>(cols[L.nodes[k].s]||(cols[L.nodes[k].s]=[])).push(k));
  const bw=150, bh=36, gy=8, cw=184, top=52, P={}; let H=0;
  st.forEach((s,i)=>(cols[s]||[]).forEach((k,j)=>{ P[k]=[16+i*cw, top+j*(bh+gy)]; H=Math.max(H,top+(j+1)*(bh+gy)); }));
  const W=16+st.length*cw; let ed='', el='';
  for(const k of keys){ const [x2,y2]=P[k]; for(const q of visParents(k,V)){ const [x1,y1]=P[q], sx=x1+bw, sy=y1+bh/2, ex=x2, ey=y2+bh/2, m=(sx+ex)/2;
    const d=`M${sx} ${sy}C${m} ${sy} ${m} ${ey} ${ex} ${ey}`; if(A.has(k)&&A.has(q)) el+=`<path d="${d}"/>`; else ed+=`<path d="${d}"/>`; } }
  const box=k=>{ const n=L.nodes[k], [x,y]=P[k], sel=S.sel===k, lit=A.has(k), gap=n.q==null||n.q===0, ln=wrap(n.n+(gap?' ?':''),20);
    return `<g class="lp${lit?' lit':''}${sel?' sel':''}${gap?' gap':''}" data-k="${k}" tabindex="0" role="button" aria-label="${esc(n.n)}"><title>${esc(n.n)}</title><rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="2"/>`+
      ln.map((t,i)=>`<text x="${x+8}" y="${y+(ln.length===1?bh/2+4.5:14+i*14)}">${esc(t)}</text>`).join('')+'</g>'; };
  const heads=st.map((s,i)=>`<text class="sh" x="${16+i*cw}" y="20">${esc(L.stages[i][1])}</text><text class="ss" x="${16+i*cw}" y="36">${(cols[s]||[]).length} part${(cols[s]||[]).length===1?'':'s'}</text>`).join('');
  return {svg:`<svg width="${W}" height="${H+10}" viewBox="0 0 ${W} ${H+10}" role="img" aria-label="The tool's logic: ${keys.length} parts in ${st.length} stages${focus.length?', '+A.size+' lit':''}"><g>${heads}</g><g class="we">${ed}</g><g class="wl">${el}</g>${keys.map(box).join('')}</svg>`,n:keys.length,lit:[...A].filter(k=>V.has(k)).length}; }
function srcList(ids){ if(!ids||!ids.length) return '<p class="f1l-none">No source listed for this part.</p>';
  const one=id=>{ const t=(O.sources||{})[id]||id, k=(O.source_kinds||{})[id], m=String(t).match(/https?:\/\/\S+$/), tx=String(t).replace(/\s*[—-]\s*https?:\/\/\S+$/,'');
    return `<li>${k?`<span class="f1l-kind">${esc(k)}</span>`:''}${esc(tx.length>260?tx.slice(0,257)+'…':tx)}${m?` <a href="${esc(m[0])}" target="_blank" rel="noopener">link</a>`:''}</li>`; };
  /* the first source shown; the rest under "More sources" (gate 2) */
  return `<ul class="f1l-src">${one(ids[0])}</ul>`+(ids.length>1?`<details class="f1l-more"><summary>More sources (${ids.length-1})</summary><ul class="f1l-src">${ids.slice(1).map(one).join('')}</ul></details>`:''); }
function panel(){ if(!S.sel){ const t=TABS.find(x=>x[0]===S.tab)[1];
    return `<div class="chap">How it works</div><h2>${S.label?esc(S.label):'The logic under every card'}</h2><p class="lead">${S.label?'The parts this card is worked out from are lit. Click a part for its formula, trust and sources.':'One logic runs under all four workflows. Every part has a formula, a source and a trust rating. Click a part to see them.'}</p>`+
`<p class="f1l-note">${t}: ${diagram().n} parts shown.</p>`; }
  const k=S.sel, n=L.nodes[k], stg=(L.stages.find(s=>s[0]===n.s)||[])[1]||n.s, q=n.q, ins=(UP[k]||[]).filter(x=>L.nodes[x]);
  return `<div class="chap">${esc(stg)}</div><h2>${esc(n.n)}</h2>${n.w?`<p class="lead">${esc(n.w.charAt(0).toUpperCase()+n.w.slice(1))}.</p>`:''}
   ${S.lot?`<div class="f1l-hero"><div class="hl">On this lot (${esc(S.lot)})</div><div class="f1l-nv">not in the tool yet</div></div>`:''}
   <section><h3>How it is worked out</h3><p class="f1l-f">${esc(n.f||'Read or asked; no formula.')}</p>${ins.length?`<p class="f1l-in">From: ${ins.map(x=>`<button class="f1l-a" data-k="${x}">${esc(L.nodes[x].n)}</button>`).join(', ')}</p>`:''}</section>
   <section><h3>Trust</h3><div class="f1l-meter"><div class="trk"><div class="bar" style="width:${q==null?0:q}%"></div></div><div class="cap"><span>${q==null?'not rated':q+' of 100'}</span><span>${esc(word(q))}</span></div></div></section>
   <section><h3>Status</h3><p class="f1l-f">${esc(n.st||'?')}${n.st2?` · ${esc(n.st2)}`:''}</p></section>
   <section><h3>Sources</h3>${srcList(n.src)}</section>`; }
function draw(){ const W=document.getElementById('f1l'); if(!W||!L) return; const D=diagram();
  W.innerHTML=`<header class="f1v-head"><a class="f1-app" href="#" data-close="home">Beyond Data</a><span class="tpl">How it works</span>
     <div class="f1l-tabs" role="tablist" aria-label="Template">${TABS.map(([id,nm])=>`<button role="tab" data-tab="${id}" aria-selected="${S.tab===id}">${nm}</button>`).join('')}</div>
     <span class="f1v-where">${S.label?esc(S.label)+' · ':''}${D.lit?D.lit+' of ':''}${D.n} parts</span><button class="f1v-x" data-close>Close</button></header>
   <div class="f1v-body"><main class="f1v-main"><div class="f1l-wrap"><div class="f1l-box">${D.svg}</div></div>
     <div class="f1l-key"><span><i class="k sel"></i>selected</span><span><i class="k lit"></i>feeds the selection</span><span><i class="k gap"></i>gap (?)</span><span><i class="k"></i>the rest</span></div>
     <details class="f1v-src"><summary>Sources and assumptions</summary><p>Parts, wires, formulas, trust and template tags: tool/logic.json (built from the register by make_templates.py). Source texts and kinds: tool/opps.json. Trust words: CLAUDE.md §3. Display only.</p></details></main>
    <aside class="f1v-panel">${panel()}</aside></div>`;
  /* not every stage fits at 1440 px: the box scrolls sideways with a visible bar and a fade on the edge that has more (gate 2) */
  const box=W.querySelector('.f1l-box'), wr=W.querySelector('.f1l-wrap'), fade=()=>{ wr.classList.toggle('more-r',box.scrollLeft+box.clientWidth<box.scrollWidth-2); wr.classList.toggle('more-l',box.scrollLeft>2); };
  box.addEventListener('scroll',fade,{passive:true}); fade(); }
async function open(o){ o=o||{}; await load(); S.tab=o.tab||S.tab; S.sel=null; S.label=o.label||''; S.lot=o.lot||''; /* "On this lot" only when opened from a card that has a lot */ S.lit=(o.ids||[]).filter(k=>L.nodes[k]);
  let W=document.getElementById('f1l'); if(!W){ W=document.createElement('div'); W.id='f1l'; W.setAttribute('role','dialog'); W.setAttribute('aria-modal','true'); document.body.appendChild(W);
    W.addEventListener('click',e=>{ const t=e.target.closest('[data-k],[data-tab],[data-close]'); if(!t) return; e.preventDefault();
      if(t.dataset.close!=null){ W.remove(); return; } if(t.dataset.tab){ S.tab=t.dataset.tab; if(S.sel&&!shown(S.sel)) S.sel=null; draw(); return; }
      if(t.dataset.k){ S.sel=S.sel===t.dataset.k?null:t.dataset.k; draw(); } });
    W.addEventListener('keydown',e=>{ if(e.key==='Escape') W.remove(); const g=e.target.closest&&e.target.closest('g[data-k]'); if(g&&(e.key==='Enter'||e.key===' ')){ e.preventDefault(); S.sel=g.dataset.k; draw(); } }); }
  draw(); }
/* the parts a card lights: logic.js's step list for the matching step */
function cardIds(title,tab){ if(tab==='municipal') return MUNI_CARD[title]||[]; const k=CARD[title]; return k&&BD.logic&&BD.logic.stepNodes?BD.logic.stepNodes(k):[]; }
BD.f1logic={open,cardIds};
})();
