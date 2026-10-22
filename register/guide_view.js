/* Guide tab: one mechanism diagram per family, why each node is in the tool, and how to read the side panel.
   Wording is Claude's draft (red) for J.B. to rewrite. Also owns switching between the three views. */
(function(){
const G=window.__G, gv=document.getElementById('guidev'), canvas=document.getElementById('canvas'), flow=document.getElementById('flow'), mainEl=document.querySelector('main');
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const NODES={}; JSON.parse(document.getElementById('data').textContent).nodes.forEach(n=>NODES[n.id]=n);
const ico=(f,s=16)=>`<svg viewBox="0 0 24 24" width="${s}" height="${s}" aria-hidden="true"><path d="${G.families[f].icon}" fill="none" stroke="${G.families[f].colour}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
let cur='_panel', selq=null;

const PARTS=[
 ['Family','The icon and name at the top say which family the item belongs to; the outline colour of its node in the diagram is the family\'s group.'],
 ['Kind and name','Whether it is an input, a quantity the tool computes, or a condition; its name and unit. Each figure stays in its own unit and is never converted into a score.'],
 ['Diagram','The mechanism the item belongs to, drawn in 2D or 3D, with this item\'s number in red.'],
 ['Why it is here','One line on why the tool needs this figure.'],
 ['Confidence ring','How far the tool can trust the figure: full is arithmetic, three-quarters a regulation or government data, half an operator\'s claim, empty a figure the tool does not have yet.'],
 ['Formula','How it is worked out, and from which other figures.'],
 ['By source','When several sources feed one figure, which source gives which term, and whether that placement has been checked.'],
 ['Inputs, feeds, conditions','What it is worked out from, what it feeds, and which conditions are judged on it. Click any of them to go there.'],
 ['Sources','Every source behind the figure, with a link where one exists.'],
];
const DIAG=[
 ['Columns, left to right','Inputs (what the data centre brings, what the place offers) → size → the place → characterise → prospect → opportunities → test → conditions → options → account → parties.'],
 ['Nodes','Icon at the left for the family, ring at the right for confidence, outline in the family group\'s colour. A grey-green tick on the left edge marks something the place offers. A dashed outline is a figure the tool does not have yet.'],
 ['Conditions','Each says what it would take to move it: a different option, money, time and process, a change in policy, city-scale infrastructure, or nothing at all (physics).'],
 ['The user\'s values','Enter from below the options column, in red dashes: how many options, limits and emphasis. They shape what is explored, never what wins.'],
 ['Lifecycle','The strip underneath shows how the trade-offs shift across the building\'s life.'],
];

function nav(){
  let h=`<h3>Start here</h3><button data-f="_panel" ${cur==='_panel'?'aria-current="true"':''}>Reading the side panel</button><button data-f="_diagram" ${cur==='_diagram'?'aria-current="true"':''}>Reading the diagram</button>`;
  Object.values(G.groups).forEach(g=>{ h+=`<h3><i style="background:${g.colour}"></i>${esc(g.name)}</h3>`;
    g.families.forEach(f=>{ h+=`<button data-f="${f}" ${cur===f?'aria-current="true"':''}>${ico(f)}${esc(G.families[f].name)}<em>${G.families[f].nodes.length}</em></button>`; }); });
  return `<nav class="gnav" aria-label="Guide">${h}</nav>`;
}
function page(){
  if(cur==='_panel'||cur==='_diagram'){ const L=cur==='_panel'?PARTS:DIAG;
    return `<div class="gmain"><div class="kind">Guide</div><h2>${cur==='_panel'?'Reading the side panel':'Reading the diagram'}</h2>
    <p class="cap draft">${cur==='_panel'?'Clicking any box in the tool-logic diagram opens the side panel. From top to bottom it shows:':'The tool-logic diagram is the overview of how the tool thinks. It reads left to right:'}</p>
    <ol class="parts">${L.map((p,i)=>`<li><span class="gn">${i+1}</span><div><b>${esc(p[0])}</b><br><span class="draft">${esc(p[1])}</span></div></li>`).join('')}</ol>
    <div class="draftnote" style="margin-top:14px">Draft wording (Claude) — for J.B. to rewrite.</div></div><div></div>`; }
  const F=G.families[cur];
  const items=F.key.map(([n,q])=>{ const nd=NODES[q]||{}; return `<li data-q="${q}" class="${q===selq?'on':''}"><span class="gn">${n}</span><b>${esc(nd.name||q)}</b> <em>${esc(nd.unit||'')}</em><br><span class="draft">${esc(G.rationale[q]||'')}</span><br><a class="glink" data-show="${q}">show in the tool logic</a></li>`; }).join('');
  return `<div class="gmain"><div class="kind" style="display:flex;align-items:center;gap:8px"><i style="display:inline-block;width:18px;height:3px;border-radius:2px;background:${F.colour}"></i>${esc(F.group_name)}</div>
    <h2>${ico(cur,22)}${esc(F.name)}<span class="gk">${esc(F.kind)}</span></h2>
    <figure class="mech">${F.svg}</figure><p class="cap draft">${esc(F.caption)}</p><div class="draftnote">Diagrams show how things work, not measurements; numbers appear in the worked example. Draft wording (Claude) — for J.B. to rewrite.</div></div>
    <div class="gside"><div class="kind">Why each item is here</div><ol>${items}</ol></div>`;
}
function draw(){
  gv.innerHTML=`<div class="gwrap">${nav()}${page()}</div>`;
  gv.querySelectorAll('.gnav button').forEach(b=>b.onclick=()=>{cur=b.dataset.f; selq=null; draw(); gv.scrollTop=0;});
  gv.querySelectorAll('.gside li').forEach(li=>li.onclick=e=>{ if(e.target.dataset.show) return; selq=li.dataset.q; mark(); });
  gv.querySelectorAll('[data-show]').forEach(a=>a.onclick=e=>{e.preventDefault(); setView('logic'); window.__bd&&(window.__bd.select(a.dataset.show), window.__bd.centreOn(a.dataset.show));});
  gv.querySelectorAll('.mech .ctag').forEach(tg=>{ tg.style.cursor='pointer'; tg.addEventListener('click',()=>{selq=tg.dataset.q; mark();}); });
  mark();
}
function mark(){
  gv.querySelectorAll('.mech .ctag').forEach(tg=>tg.classList.toggle('on',tg.dataset.q===selq));
  gv.querySelectorAll('.gside li').forEach(li=>li.classList.toggle('on',li.dataset.q===selq));
  const on=gv.querySelector('.gside li.on'); if(on) on.scrollIntoView({block:'nearest'});
}
const B={logic:document.getElementById('v-logic'),flow:document.getElementById('v-flow'),guide:document.getElementById('v-guide')};
function setView(v){
  Object.entries(B).forEach(([k,b])=>b.setAttribute('aria-pressed',k===v));
  document.querySelectorAll('.logic-only').forEach(e=>e.hidden=v!=='logic');
  canvas.hidden=v!=='logic'; flow.hidden=v!=='flow'; gv.hidden=v!=='guide'; mainEl.classList.toggle('full',v==='guide');
  if(v==='flow') window.__flow&&window.__flow.show();
  if(v==='guide') draw();
  if(v==='logic'){ const ex=document.getElementById('m-example').getAttribute('aria-pressed')==='true'; window.__bd&&window.__bd.setMode(ex?'example':'structure'); }
  try{ history.replaceState(null,'',v==='logic'?location.pathname+location.search:'#'+(v==='flow'?'workflow':'guide')); }catch(e){}
}
Object.entries(B).forEach(([k,b])=>b.onclick=()=>setView(k));
window.__openGuide=(f,q)=>{ cur=f; selq=q||null; setView('guide'); };
if(location.hash==='#guide') setView('guide');
})();
