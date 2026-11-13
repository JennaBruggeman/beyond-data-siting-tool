/* Beyond Data — F7 Typologies (CODE_JOB_F7_typologies.md, 8 Nov 2026; storyboards Story_TypologyLibrary, Story_TypologyIcons3D, Story_TypologyGlyph2).
   One click away from the landing page: a library of the eight typologies, and a page per typology (Emergency hub first).
   Figures: tool/data/typologies.json, built from each spec with register ids; a typology whose spec hasn't passed J.B.'s gate shows none.
   Program models: tool/f1/icons/*.svg (first pass). Variant plans: Cowork's Vancouver hand fits (tool/f1/eh_fits, rooms and doors only, no lot
   outline); the Edmonton fits use licensed lot lines, so 64 Airport Rd NW opens the tool's own layout on City parcels and the other two say so. */
(function(){
'use strict';
const BD=window.BD; const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let T=null, O=null, LG=null; const S={page:'lib'};
const n2=x=>(Math.round(x*100)/100).toLocaleString('en-CA'), n0=x=>Math.round(x).toLocaleString('en-CA');
async function load(){ if(!T) T=await fetch('data/typologies.json').then(r=>r.json());
  if(!O) O=await fetch('opps.json').then(r=>r.json()).catch(()=>({sources:{}})); if(!LG) LG=await fetch('logic.json').then(r=>r.json()).catch(()=>({nodes:{}})); }
/* a register id as text: a part by its name, a source by its first clause */
function srcName(id){ const n=LG.nodes[id]; if(n) return 'part: '+n.n; const t=String((O.sources||{})[id]||id).replace(/\s*[—-]\s*https?:\/\/\S+.*$/,'').replace(/ ‖.*$/,'');
  const cut=t.length>140?t.slice(0,t.lastIndexOf(' ',140))+' …':t; return cut; }
const srcs=ids=>`<ul class="f1t-src">${(ids||[]).map(id=>`<li><span class="id">${esc(id)}</span> ${esc(srcName(id))}</li>`).join('')}</ul>`;
const icon=p=>p.icon?`<img src="f1/icons/program_${esc(p.icon)}.svg" alt="" width="84" height="71">`:`<div class="f1t-noicon">drawing when specified</div>`;
const models=t=>`<div class="f1t-models">${t.programs.map((p,i)=>`${i?'<span class="x" aria-hidden="true">×</span>':''}<figure>${icon(p)}<figcaption>${esc(p.name)}</figcaption></figure>`).join('')}</div>`;
const chip=s=>`<span class="f1t-chip ${s==='specified'?'on':s==='in progress'?'mid':''}">${esc(s)}</span>`;
const fig=f=>`<div class="f1t-fig"><b>${f.hi!=null?`${n2(f.lo)}–${n2(f.hi)}`:`${n0(f.lo)}+`}</b> <span>${esc(f.u)}</span><div>${esc(f.l)}</div></div>`;

function libHtml(){ return `<div class="f1t-wrap"><div class="f1t-intro"><h1>Typologies</h1><p>Ways a data centre and public programs can share one building. Each adapts to the lot through its variants. A typology shows figures only once its specification is final: nothing unsourced.</p></div>
  <div class="f1t-grid">${T.list.map(t=>`<article class="f1t-card${t.card?' has':''}"><header><h2>${esc(t.name)}</h2>${chip(t.status)}</header>${models(t)}
    ${t.card?`<div class="f1t-figs">${t.card.map(fig).join('')}</div><p class="f1t-share">shares: ${esc(t.shares)}</p><button class="f1t-open" data-typ="${esc(t.id)}">Open the typology →</button>`
      :t.spec&&t.spec.gate==='approved'&&t.spec.file?`<p class="f1t-none">Specified; figures not on this page yet.<br><span>${esc(t.statusNote||'')}</span></p><button class="f1t-open" data-spec="${esc(t.id)}">Read the spec →</button>`
      :`<p class="f1t-none">No figures until its specification is final.<br><span>${esc(t.statusNote||'')}</span></p>`}</article>`).join('')}</div>
  ${smallHtml()}
  <p class="f1t-foot">Program models: first pass (servers, refuge, clinic, pool drawn); the rest come with their specs. Figures: from each typology’s specification, with register ids.</p></div>`; }

/* F7 small-lot floors (J.B., 9 Nov 2026): tool/data/typologies.json smallLots, from the Emergency hub spec Part 4 and the 10 Nov gate notes */
function smallHtml(){ const L=T.smallLots; if(!L) return '';
  const rng=r=>r.lo==null?`under about ${n0(r.hi)} m²`:r.hi==null?`about ${n0(r.lo)} m² and up`:`about ${n0(r.lo)}–${n0(r.hi)} m²`;
  return `<section class="f1t-small"><div class="f1t-h"><h2>Small lots</h2><span>lot area, with a lane; our arithmetic on test lots, not a citywide count</span></div>
   <div class="f1t-bands">${L.rows.map(r=>`<article class="f1t-band${r.lo==null?' none':''}"><p class="rng">${rng(r)}</p><h3>${esc(r.what)}</h3>${r.label?`<p class="f1t-label" role="note">${esc(r.label)}</p>`:''}<p>${esc(r.note)}</p>${srcs(r.src)}</article>`).join('')}</div>
   <p class="f1t-q">${esc(L.noLane)}</p></section>`; }

function capRow(c){ let v='';
  if(c.pueLo!=null) v=`${n2(c.pueLo)}–${n2(c.pueHi)} ${esc(c.note)}`;
  else if(c.r5lo!=null) v=`${esc(c.text)}: 5 exam rooms ${n0(c.r5lo)}–${n0(c.r5hi)} m², 13 exam rooms ${n0(c.r13lo)}–${n0(c.r13hi)} m². ${esc(c.note)}`;
  else if(c.text) v=esc(c.text);
  else if(c.hi!=null) v=`${n2(c.lo)}–${n2(c.hi)} ${esc(c.u)} ${esc(c.note)} ${n0(c.cap)} ${esc(c.capU)}`;
  else if(c.fitsLo!=null) v=`${n0(c.lo)} ${esc(c.u)} (${n0(c.area)} m² at ${n2(c.rate)} m² a person); ${n0(c.fitsLo)}–${n0(c.fitsHi)} ${esc(c.note)}`;
  else v=`${n0(c.lo)} ${esc(c.u)} (${n0(c.area)} m²); ${esc(c.note)}`;
  return `<tr><th>${esc(c.l)}</th><td>${v}</td><td>${srcs(c.src)}</td></tr>`; }

function pageHtml(id){ const t=T.list.find(x=>x.id===id), P=T.pages[id]; if(!t||!P) return libHtml();
  return `<div class="f1t-wrap"><button class="f1t-back" data-lib>← All typologies</button>
  <section class="f1t-top"><div><h1>${esc(t.name)}</h1><p class="f1t-st">${chip(t.status)} ${esc(t.statusNote)}</p><p class="f1t-lead">${esc(t.lead)}</p>
    <div class="f1t-acts"><button class="f1-btn" data-try>Try it on a lot →</button><button class="f1-link" data-logic>Logic diagram →</button><button class="f1-link" data-spec="${esc(t.id)}">Read the spec →</button></div></div>${models(t)}</section>
  <section><div class="f1t-h"><h2>Capacities</h2><span>ranges, each with its source</span></div><table class="f1t-cap"><tbody>${P.capacities.map(capRow).join('')}</tbody></table></section>
  <section><div class="f1t-h"><h2>Variants</h2><span>each opens its schematic floor plans on its test lot</span></div><div class="f1t-vars">${P.variants.map(v=>`<article class="f1t-var"><h3>${esc(v.name)}</h3><p>${esc(v.trigger)}</p>
    <dl><dt>test lot</dt><dd>${esc(v.lot)}</dd><dt>data centre</dt><dd>${n2(v.mw)} MW</dd><dt>status</dt><dd>${esc(v.status)}</dd></dl>
    ${v.fit==='tool'?`<button class="f1-link" data-edm>Plans: the tool’s layout on City parcels →</button>`:v.fit?`<button class="f1-link" data-fit="${esc(v.fit)}" data-name="${esc(v.name+' · '+v.lot)}">Plans →</button>`:'<p class="f1t-q">Plans not on the public site: the hand fit uses licensed lot lines.</p>'}</article>`).join('')}</div>
    <div class="f1t-srcline">Source for every variant row: ${esc(srcName('spec_emergencyHub'))} (spec Part 4 test fits, 9 Nov).</div></section>
  <section><div class="f1t-h"><h2>Where it fits</h2></div><p class="f1t-q">Lots citywide where it fits: ${esc(P.fits)}</p></section>
  <section><div class="f1t-h"><h2>Not checked yet</h2></div><ul class="f1t-not">${P.notChecked.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section></div>`; }

/* schematic floor plan of a hand fit: one plan per storey, rooms numbered in program tints, a schedule under (STYLE.md §5) */
const TINT={hall:'var(--f-fill-hall)',sup:'var(--f-fill-sup)',pub:'var(--f-fill-pub)',clin:'var(--f-fill-clin)',plant:'var(--f-plant)',load:'var(--f-plant)',circ:'#fff',spare:'#fff'};
async function planHtml(fit,name){ const F=await fetch('f1/eh_fits/'+fit+'.json').then(r=>r.json()); let k=0; const sched=[];
  const sts=Object.keys(F.S).sort((a,b)=>a-b).map(st=>{ const R=F.S[st]; const all=R.flatMap(x=>x.r); const u0=Math.min(...all.map(r=>r[0])),u1=Math.max(...all.map(r=>r[1])),v0=Math.min(...all.map(r=>r[2])),v1=Math.max(...all.map(r=>r[3]));
    const W=560, s=Math.min(W/(u1-u0), 420/(v1-v0)), H=(v1-v0)*s, X=u=>(u-u0)*s, Y=v=>H-(v-v0)*s; let g='', nums='';
    R.forEach(x=>{ const num=++k; sched.push([num,st,x.n,x.r.reduce((a,r)=>a+(r[1]-r[0])*(r[3]-r[2]),0)]);
      x.r.forEach(r=>{ g+=`<rect x="${X(r[0]).toFixed(1)}" y="${Y(r[3]).toFixed(1)}" width="${((r[1]-r[0])*s).toFixed(1)}" height="${((r[3]-r[2])*s).toFixed(1)}" fill="${TINT[x.g]||'#fff'}" stroke="${TINT[x.g]||'#fff'}" stroke-width="0.6"/>`; });
      const big=x.r.reduce((a,r)=>(r[1]-r[0])*(r[3]-r[2])>(a[1]-a[0])*(a[3]-a[2])?r:a,x.r[0]); if((big[1]-big[0])*s>12&&(big[3]-big[2])*s>10) nums+=`<text x="${X((big[0]+big[1])/2).toFixed(1)}" y="${(Y((big[2]+big[3])/2)+3.5).toFixed(1)}" text-anchor="middle" font-size="10" fill="var(--f-ink)">${num}</text>`; });
    R.forEach(x=>x.r.forEach(r=>{ g+=`<rect x="${X(r[0]).toFixed(1)}" y="${Y(r[3]).toFixed(1)}" width="${((r[1]-r[0])*s).toFixed(1)}" height="${((r[3]-r[2])*s).toFixed(1)}" fill="none" stroke="var(--f-ink)" stroke-width="0.35" opacity="0.45"/>`; }));
    F.D.filter(d=>String(d[0])===st).forEach(d=>{ const w=(d[6]||0.9)*s/2; g+=d[5]==='v'?`<line x1="${X(d[3]).toFixed(1)}" y1="${(Y(d[4])-w).toFixed(1)}" x2="${X(d[3]).toFixed(1)}" y2="${(Y(d[4])+w).toFixed(1)}" stroke="#fff" stroke-width="2.2"/>`:`<line x1="${(X(d[3])-w).toFixed(1)}" y1="${Y(d[4]).toFixed(1)}" x2="${(X(d[3])+w).toFixed(1)}" y2="${Y(d[4]).toFixed(1)}" stroke="#fff" stroke-width="2.2"/>`; });
    return `<figure class="f1t-plan"><figcaption>Storey ${esc(st)}</figcaption><svg viewBox="-4 -4 ${W+8} ${(H+8).toFixed(0)}" width="${W+8}" role="img" aria-label="Storey ${esc(st)} plan">${g}${nums}</svg></figure>`; });   /* numbers last, over every fill */
  return `<div class="f1t-wrap"><button class="f1t-back" data-typ="emergency_hub">← Emergency hub</button><h1 class="f1t-ph">${esc(name)}</h1>
   <p class="f1t-q">Cowork’s hand fit (${esc(String(F.source).replace(/ \(Cowork hand fit\);.*$/,''))}), drawn by the tool: rooms in program tints, doors as gaps; no lot outline. The tool checks it with T-reach, dead ends, room widths and egress doorways (all pass, 9 Nov). Not to scale between storeys.</p>
   <div class="f1t-key"><span><i style="background:var(--f-fill-hall)"></i>data hall</span><span><i style="background:var(--f-fill-sup)"></i>data-centre support</span><span><i style="background:var(--f-fill-pub)"></i>refuge, shelter, hub</span><span><i style="background:var(--f-fill-clin)"></i>clinic</span><span><i style="background:var(--f-plant)"></i>plant, loading</span><span><i style="background:#fff;border:1px solid var(--f-rule)"></i>circulation, unassigned</span></div>
   <div class="f1t-plans">${sts.join('')}</div>
   <table class="f1t-sched"><thead><tr><th>No.</th><th>Storey</th><th>Room</th><th>m²</th></tr></thead><tbody>${sched.map(r=>`<tr><td>${r[0]}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${n0(r[3])}</td></tr>`).join('')}</tbody></table></div>`; }

/* the typology spec, published with the tool (J.B., 9 Nov 2026): tool/f1/specs/<id>.md, a verbatim copy of Cowork's spec, rendered here.
   Small Markdown reader: headings, tables, nested lists (numbers kept as written), paragraphs, bold, struck-through, code, rules. */
function inl(s){ return esc(s).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/~~([^~]+)~~/g,'<s>$1</s>'); }
function md(src){ const L=src.replace(/\r/g,'').split('\n'); let h='', par=[], st=[], i=0;
  const flush=()=>{ if(par.length){ h+=`<p>${inl(par.join(' '))}</p>`; par=[]; } };
  const closeTo=n=>{ while(st.length>n){ const t=st.pop(); h+=`</li></${t.t}>`; } };
  const cells=r=>r.trim().replace(/^\||\|$/g,'').split('|').map(c=>c.trim());
  while(i<L.length){ const l=L[i], t=l.trim(), ind=l.length-l.trimStart().length;
    if(!t){ flush(); i++; continue; }
    if(t.startsWith('|')){ flush(); closeTo(0); const rows=[]; while(i<L.length&&L[i].trim().startsWith('|')) rows.push(L[i++]);
      const head=cells(rows[0]), body=rows.slice(rows[1]&&/^[\s|:-]+$/.test(rows[1])?2:1);
      h+=`<div class="f1t-tw"><table><thead><tr>${head.map(c=>`<th>${inl(c)}</th>`).join('')}</tr></thead><tbody>${body.map(r=>`<tr>${cells(r).map(c=>`<td>${inl(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`; continue; }
    let m=t.match(/^(#{1,4})\s+(.*)$/); if(m){ flush(); closeTo(0); const n=Math.min(m[1].length+1,5); h+=`<h${n}>${inl(m[2])}</h${n}>`; i++; continue; }
    if(/^---+$/.test(t)){ flush(); closeTo(0); h+='<hr>'; i++; continue; }
    m=t.match(/^(\d+)\.\s+(.*)$/)||t.match(/^-\s+(.*)$/);
    if(m){ flush(); const ty=/^\d/.test(t)?'ol':'ul', txt=ty==='ol'?m[2]:m[1];
      while(st.length&&st[st.length-1].i>ind) closeTo(st.length-1);
      const top=st[st.length-1];
      if(top&&top.i===ind&&top.t!==ty) closeTo(st.length-1);
      const tp=st[st.length-1];
      if(tp&&tp.i===ind) h+='</li>'; else { h+=`<${ty}>`; st.push({t:ty,i:ind}); }
      h+=`<li${ty==='ol'?` value="${m[1]}"`:''}>${inl(txt)}`; i++; continue; }
    if(st.length&&ind>0){ flush(); h+=`<p>${inl(t)}</p>`; i++; continue; }
    closeTo(0); par.push(t); i++; }
  flush(); closeTo(0); return h; }
async function specHtml(id){ const t=T.list.find(x=>x.id===id); const src=await fetch('f1/specs/'+id+'.md').then(r=>r.ok?r.text():'');
  return `<div class="f1t-wrap"><button class="f1t-back" data-typ="${esc(id)}">← ${esc(t?t.name:'Typology')}</button>
   <p class="f1t-q" style="max-width:980px">The typology spec as Cowork wrote it, published with the tool by J.B.’s decision (9 and 10 Nov 2026); copied unchanged from her working folder. Source ids are register entries (Logic diagram). File paths (eh/…, checks/…) are working files, not on this site; the Edmonton hand fits’ plans are not published (licensed lot lines).</p>
   ${t&&t.spec&&t.spec.gate==='approved'?'':`<div class="f1t-draft" role="note"><b>Draft:</b> not yet approved by J.B. Figures and rules may change.</div>`}
   <article class="f1t-spec">${src?md(src):'<p>The spec file is missing.</p>'}</article></div>`; }

async function draw(){ const W=document.getElementById('f1t'); if(!W) return; await load();
  const body=S.page==='lib'?libHtml():S.page.startsWith('fit:')?await planHtml(S.page.split(':')[1],S.name||''):S.page.startsWith('spec:')?await specHtml(S.page.slice(5)):pageHtml(S.page);
  W.innerHTML=`<header class="f1v-head"><a class="f1-app" href="#" data-close="home">Beyond Data</a><span class="tpl">Typologies</span><span class="f1v-where"></span><button class="f1v-x" data-close>Close</button></header><div class="f1t-main">${body}</div>`;
  W.querySelector('.f1t-main').scrollTop=0; }
async function open(page,name){ let W=document.getElementById('f1t'); if(!W){ W=document.createElement('div'); W.id='f1t'; W.setAttribute('role','dialog'); W.setAttribute('aria-modal','true'); document.body.appendChild(W);
    W.addEventListener('click',e=>{ const b=e.target.closest('button,a'); if(!b) return; const d=b.dataset;
      if(d.close!=null){ e.preventDefault(); W.remove(); return; }
      if(d.lib!=null){ S.page='lib'; draw(); return; } if(d.typ){ S.page=d.typ; draw(); return; }
      if(d.spec){ S.page='spec:'+d.spec; draw(); return; }
      if(d.fit){ S.page='fit:'+d.fit; S.name=d.name; draw(); return; }
      if(d.logic!=null){ if(BD.f1logic) BD.f1logic.open({tab:'arch',label:'Emergency hub',ids:['hub_layout','t_reach','dead_ends','room_widths','egress_doorways','travel_distance','exit_separation','fire_separations','plant_clearances','building_height','step_free_entry']}); return; }
      if(d.try!=null||d.edm!=null){ W.remove(); if(BD.arch) BD.arch.typology='emergency_hub'; BD.f1.viewer('architecture');   /* the library holds one typology: the Emergency hub is the one drawn */
        const go=async()=>{ const V=document.getElementById('f1v'); if(!V) return; if(d.edm!=null){ const c=V.querySelector('[data-city="edm"]'); if(c) c.click(); await new Promise(r=>setTimeout(r,1500)); }
          const k=V.querySelector(`[data-to="${d.edm!=null?13:8}"]`); if(k) k.click(); }; setTimeout(go,600); return; } }); }
  S.page=page||'lib'; S.name=name||''; await draw(); }
BD.f1typ={open};
})();
