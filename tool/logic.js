/* Beyond Data — the logic behind each result (build plan steps 3 and 4, 20 Oct 2026; audit/template_ideas_2026-10-19.md).
   Step 3: a panel beside the results draws the tool-logic diagram at the chosen tier's level. Opening a step, a section or a card lights
   the parts behind it and the wires that feed them; clicking a part shows how it is worked out, from what, and how sure.
   Step 4: each step shows only the sections whose parts belong to the chosen tier; the rest are listed by name under "Show more",
   which brings them back for this site. Hiding is display only: every part still runs (templates.json rule).
   Which parts sit behind which section is set below by hand from the register (Claude, 20 Oct 2026; a draft for J.B. to check).
   Data: logic.json (make_templates.py, from diagram_data.json and templates.json); opps.json (opportunity and add-on parts). */
(function(){
'use strict';
const BD=window.BD; const {$,esc}=BD;
const RANK={resident:0,community:1,full:2};
const WHO={resident:'residents',community:'the neighbourhood',full:'professionals'};
const LEVEL={resident:'What it means for me',community:'What it means for the neighbourhood',full:'How it is worked out'};
let L=null, UP={}, ORDER={};
fetch('logic.json').then(r=>r.ok?r.json():null).then(d=>{ if(!d) return; L=d; Object.keys(d.nodes).forEach((k,i)=>ORDER[k]=i); for(const [a,b] of d.edges) (UP[b]=UP[b]||[]).push(a); render(); }).catch(()=>{});
const tierNow=()=>(BD.tier&&BD.tier())||'full';

/* ---------- what sits behind what ---------- */
const STEP={
 setup:['start_case','cooling_type','zone','parcel','size_fit','cooling_units','generator_sets','rack_count','ups_modules','battery_cabinets','room_cooling_units','cdu_units','hall_layout','electrical_room','room_cooling_type','fire_protection','transformers','security_layers'],
 fits:['envelope','size_fit','hall_area','component_space','floor_area'],
 prec:['it_load_claim','it_load_actual','floor_area'],
 heat:['it_load_share','heat_delivered','homes_heated','receivers_nearby','lcoh','hr_flow','hr_pipe_size','heat_pumps','phe_frames','buffer_tanks','hr_pumps','hr_plant_room','heat_sale_rules'],
 energy:['power_allocation','spare_capacity','grid_headroom','flexible_load','power_bill_effect','grid_co2'],
 water:['evaporation','water_supply','rainwater','water_restriction_rule'],
 materials:['embodied_it','embodied_building','ewaste','copper_tonnes'],
 social:['noise_level','visibility','people_affected','standoff','air_vs_objective'],
 opps:['refuge_services','refuge_code','crisis_events','tradeoffs','receivers_nearby','homes_heated','ev_stalls','refuge_people'],
 opts:['tradeoffs','ledger','futures','commitment'],
 time:['horizons','futures','afterlife','homes_heated_2050s','free_cooling_hours_2050s'],
 cities:['zoning_status','grid_co2','free_cooling_hours','construction_time'],
 report:['tradeoffs','ledger']};
const SEC={
 'fits:Floor area':['floor_area','envelope'], 'fits:Room for servers':['hall_area','server_floor'], 'fits:Largest data centre that fits':['size_fit'],
 'fits:What that size needs':['component_space','spare_capacity','fuel_on_site'],
 'prec:Real buildings against this site':['it_load_claim'], 'prec:Closest in size':['it_load_claim','it_load_actual'],
 'heat:Best set-up found for heat':['lcoh','payback','distribution_cost','cop'], 'heat:Heat this size could offer':['heat_delivered','homes_heated'],
 'heat:What the heat is worth here':['price_ceiling','displaced_source'], 'heat:How it compares':['erf','pue','heat_delivered'],
 'heat:Heat networks nearby':['receivers_nearby','competing_sources'], 'heat:An ambient loop: Blatchford':['competing_sources','heat_value_split'],
 'heat:Buildings that could take it':['receiver_demand','receivers_nearby','affordability'],
 'energy:How it compares':['pue','grid_co2'], 'energy:The grid nearby':['grid_headroom','lead_time','interconnection'],
 'energy:Solar on the roof':['pv_roof','pv_lcoe'], 'energy:A battery for the grid':['battery','peak_relief'], 'energy:EV charging for the public':['ev_stalls','ev_repay'],
 'water:How it compares':['wue','evaporation'], 'water:Water the cooling buys':['evaporation','water_supply','blowdown'],
 'water:Rainwater for cooling':['rainwater'], 'water:Reclaimed water':['reclaimed_makeup'],
 'materials:How it compares':['embodied_it','embodied_building'], 'materials:Over 25 years':['embodied_it','ewaste','copper_tonnes'],
 'materials:Where retired equipment can go':['ewaste','rare_earth'],
 'social:Sound':['noise_level','noise_limit','lf_flag'], 'social:The street edge':['standoff','visibility','watched_area'],
 'social:Who is nearby':['people_affected','deprivation','nations_named'],
 'opps:Set-ups that open the most here':['tradeoffs'],
 'opts:Four futures':['futures'], 'time:Four futures':['futures','horizons']};
const ROWID={cGrid:['interconnection','lead_time','grid_headroom'], cGen:['generator_nox_pm','genset_test','fuel_on_site'], cFlex:['flexible_load','ups_flex','peak_relief'], cNext:['ev_exemption','self_gen_rules']};
const KIND=[['Heat · how it is worked out',['heat_rejected','liquid_capture','cop','heat_delivered','hp_electricity']],['Heat · district energy',['receivers_nearby','competing_sources','distribution_cost']],
 ['Heat · connection',['receiver_demand','distribution_cost','lcoh','payback']],['Distance',['receiver_radius']],['Water · connection',['water_supply','reclaimed_makeup']],
 ['Seen or hidden',['visibility']],['People · neighbour',['noise_level','people_affected']],['Materials · where it goes',['ewaste','rare_earth']],
 ['Energy · standby',['generator_nox_pm','genset_test','fuel_on_site']],['Energy · how it is worked out',['pue','load_factor','it_load_actual','spare_capacity']],
 ['Energy · flexibility',['flexible_load','ups_flex','peak_relief']],['Energy · connection',['interconnection','lead_time','grid_headroom']],
 ['Energy · across the property line',['ev_exemption','self_gen_rules']],['Cooling',['cooling_type','heat_temp']],['What fits here',['size_fit','envelope']]];
const O=()=>BD._O||null;
let OJ=null; const oj=()=>{ if(!OJ&&BD.opps) OJ=BD.opps().then(d=>{ BD._O=BD._O||d; return d; }).catch(()=>null); return OJ; };
const stepKey=()=>{ const F=BD.flow, s=F&&F.steps[F.i]; if(!s) return ''; return /^(fam:|opp:|opps-)/.test(s.k)?'opps':s.k; };
const stepTitle=()=>{ const F=BD.flow, s=F&&F.steps[F.i]; return s?s.t:''; };
const known=ids=>(ids||[]).filter(i=>!L||L.nodes[i]);
function secNodes(step,title){ return known(SEC[step+':'+title]||null); }
function oppNodes(name){ const o=O(); return known(o&&o.opp_quantities&&o.opp_quantities[name]); }
function addonNodes(id){ const o=O(), a=o&&(o.addons||[]).find(x=>x.id===id||x.name===id); return known(a&&a.quantities); }
function tierOf(ids){ if(!L||!ids||!ids.length) return null; let r=9; for(const i of ids){ const n=L.nodes[i]; if(n) r=Math.min(r,RANK[n.t]); } return r===9?null:Object.keys(RANK)[r]; }
const shows=(ids,t)=>{ const x=tierOf(ids); return x===null||RANK[x]<=RANK[t||tierNow()]; };
BD.shownMore=BD.shownMore||new Set();
const siteKey=()=>{ const a=BD.S&&BD.S.sel&&BD.S.sel.a; return (a&&a[0])||''; };
const revealed=k=>BD.shownMore.has(siteKey()+'|'+k);

/* ---------- step 4: show what belongs to the chosen tier; the rest under "Show more" ---------- */
let refam='';
const titleOfSec=d=>{ const t=d.querySelector(':scope > summary .t'); return t?t.textContent.trim():''; };
const rowName=r=>{ const d=r.querySelector(':scope > div')||r; for(const c of d.childNodes){ if(c.nodeType===3&&c.textContent.trim()) return c.textContent.trim(); } return (d.textContent||'').trim().split(/\s{2,}|\n/)[0]; };
function rowNodes(r){ const a=r.querySelector('[data-add]'), o=r.querySelector('[data-op]'), b=r.querySelector('button[id]');
  if(a){ const x=(O()&&(O().addons||[]).find(z=>z.id===a.dataset.add)); return {key:'add:'+a.dataset.add, ids:addonNodes(a.dataset.add), name:(x&&x.name)||rowName(r)||a.dataset.add}; }
  if(o) return {key:'op:'+o.dataset.op, ids:oppNodes(o.dataset.op), name:o.dataset.op};
  if(r.dataset.n) return {key:'op:'+r.dataset.n, ids:oppNodes(r.dataset.n), name:r.dataset.n};
  if(r.closest('.famno')){ const n=rowName(r); return {key:'op:'+n, ids:oppNodes(n), name:n}; }
  if(b&&ROWID[b.id]) return {key:'row:'+b.id, ids:known(ROWID[b.id]), name:rowName(r)};
  return null; }
/* plain words for residents (J.B. 20 Oct 2026: "Plain name + term on hover"): in the residents' template a technical term is written as a plain
   name with the term in brackets; hovering gives a one-line meaning. Drafted by Claude for J.B. to check. Other templates keep the terms. */
const GLOSS=[
 [/\bPUE\b/g,'extra power for cooling and losses','PUE (power usage effectiveness): everything the building draws ÷ what the servers use; 1.4 means 40% on top'],
 [/\bN\+1\b/g,'one spare unit','N+1: as many units as needed, plus one spare'],
 [/\bCOP\b/g,'heat pump efficiency','COP (coefficient of performance): units of heat delivered for each unit of electricity'],
 [/\bkWp\b/g,'kW of panels in full sun','kWp: the panels\' output in full sun'],
 [/\bCWEC\b/g,'typical weather year','CWEC: Canadian Weather year for Energy Calculation, a typical year built from decades of records'],
 [/\bchilled-water loop\b/g,'the building\'s cold-water cooling pipes','chilled-water loop: pipes carrying cold water from the chillers to the server rooms and back'],
 [/\bblowdown\b/gi,'water flushed out','blowdown: water a cooling tower drains to stop minerals building up'],
 [/\bmake-up water\b/gi,'top-up water','make-up water: water added to replace what evaporates or is drained'],
 [/\b12 kV feeder/g,'local power line','12 kV feeder: the neighbourhood power line from a substation'],
 [/\bt CO₂e\b/g,'tonnes of carbon','t CO₂e: tonnes of carbon dioxide and other greenhouse gases, counted as CO₂'],
 [/\bdBA\b/g,'decibels','dBA: sound level in decibels, weighted the way people hear'],
 [/\bGWh\b/g,'GWh','GWh: a million kilowatt-hours'],[/\bMWh\b/g,'MWh','MWh: a thousand kilowatt-hours']];
function plainWords(root){ if(!root||tierNow()!=='resident') return; const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{ const p=n.parentElement; if(!p||p.closest('script,style,svg,button,select,option,input,textarea,abbr.gl,.flowbar')) return NodeFilter.FILTER_REJECT; return /PUE|N\+1|COP|kWp|CWEC|chilled-water loop|blowdown|make-up water|12 kV|CO₂e|dBA|GWh|MWh/i.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT; }});
  const L=[]; while(w.nextNode()) L.push(w.currentNode);
  for(const n of L){ let h=esc(n.nodeValue), ch=false;
    for(const [re,plain,tip] of GLOSS){ re.lastIndex=0; h=h.replace(re,(m,off,str)=>{ ch=true; const ab=`<abbr class="gl" title="${esc(tip)}">${m}</abbr>`; if(plain===m) return ab;
      const before=str.slice(Math.max(0,off-40),off).toLowerCase(), all=str.toLowerCase(); let pl=plain;
      if(/heat pump\s*$/.test(before)&&pl.startsWith('heat pump ')) pl=pl.slice(10); // "heat pump COP" → "heat pump efficiency (COP)"
      if(all.includes(pl.toLowerCase().split(' ').slice(0,2).join(' '))) return ab; // the plain words are already there ("One spare (N+1)")
      if(/^[A-Z]/.test(m)&&/(^|[.:]\s*)$/.test(str.slice(0,off))) pl=pl[0].toUpperCase()+pl.slice(1);
      const m2=/^[A-Z][a-z]/.test(m)?m.toLowerCase():m; return `${esc(pl)} (<abbr class="gl" title="${esc(tip)}">${m2}</abbr>)`; }); }
    if(ch){ const sp=document.createElement('span'); sp.className='glw'; sp.innerHTML=h; n.replaceWith(sp); } } }
BD.plainWords=plainWords;
{ const st=document.createElement('style'); st.textContent='abbr.gl{text-decoration:underline dotted;text-underline-offset:2px;cursor:help}'; document.head.appendChild(st); }
/* sensitivity rule (J.B. 20 Oct 2026, step 7): a part this template hides that moves a result shown here is named in plain words —
   25% or more (3 dB of sound) as what most of the range comes from, 10–25% as also behind it (templates.json 'drivers', from audit/sensitivity_2026-10-20.md) */
function drivers(d,ids,t){ d.querySelectorAll(':scope .drv').forEach(x=>x.remove()); const D=BD.TPL&&BD.TPL.drivers; if(!D||t==='full') return;
  const main=new Map(), also=new Map(); for(const on of ids) for(const [pn,v,u,w] of (D.by_result[on]||[])){ if(shows([pn],t)) continue; const nm=D.plain[pn]||pn; (w==='main'?main:also).set(nm,1); }
  for(const k of main.keys()) also.delete(k); if(!main.size&&!also.size) return;
  const p=document.createElement('p'); p.className='src drv';
  p.textContent=(main.size?`Most of this range comes from ${[...main.keys()].join(' and ')}.`:'')+(also.size?`${main.size?' ':''}Also behind it, shown in a fuller level: ${[...also.keys()].join('; ')}.`:'');
  const body=d.querySelector(':scope > :not(summary)'); (body&&body.parentNode===d?d:d).appendChild(p); }
function filter(sd){ sd=sd||$('#side'); if(!sd||!L||!BD.flow||!BD.flow.on) return; const step=stepKey(), t=tierNow(); plainWords(sd); if(!step||step==='site'||step==='setup'||step==='report') return;
  const hid=[];
  sd.querySelectorAll('details.sec').forEach(d=>{ if(d.closest('.dk,details.fp')) return; const title=titleOfSec(d); if(!title) return; const ids=secNodes(step,title); const k=step+':'+title;
    d.dataset.tier=tierOf(ids)||''; const show=shows(ids,t)||revealed(k); d.hidden=!show; if(!show) hid.push({k,name:title,tier:tierOf(ids)}); else drivers(d,ids,t); });
  sd.querySelectorAll('.addrow').forEach(r=>{ if(r.closest('.dk,details.fp,.tmore')) return; const x=rowNodes(r); if(!x||!x.ids.length) return; r.dataset.tier=tierOf(x.ids)||'';
    const show=shows(x.ids,t)||revealed(x.key); r.hidden=!show; if(!show) hid.push({k:x.key,name:x.name.replace(/\s+(not yet known|built here|built elsewhere|pilot|speculative).*$/,''),tier:tierOf(x.ids)}); });
  // a family step opens on its first opportunity; if that one is hidden at this tier, open the first one shown instead
  const on=sd.querySelector('.famrow.on'); if(on&&on.hidden){ const v=sd.querySelector('.famrow:not([hidden])'); if(v&&refam!==on.dataset.n+'>'+v.dataset.n){ refam=on.dataset.n+'>'+v.dataset.n; setTimeout(()=>v.click(),0); } }
  // sweep 20 Oct: a family whose every opportunity is hidden at this tier still opens on one; show that row too and keep it off the hidden list; one name once
  if(on&&on.hidden&&!sd.querySelector('.famrow:not([hidden])')){ on.hidden=false; const n=on.dataset.n; for(let i=hid.length-1;i>=0;i--) if(hid[i].name===n||hid[i].k==='op:'+n) hid.splice(i,1); }
  { const seen=new Set(); for(let i=hid.length-1;i>=0;i--){ const nm=hid[i].name; if(seen.has(nm)) hid.splice(i,1); else seen.add(nm); } }
  let box=sd.querySelector(':scope .tmore');
  if(!hid.length){ if(box) box.remove(); return; }
  if(!box){ box=document.createElement('div'); box.className='tmore'; const ft=sd.querySelector(':scope > .flowfoot'); if(ft) ft.before(box); else sd.appendChild(box); }
  const lvl=[...new Set(hid.map(h=>h.tier))].sort((a,b)=>RANK[a]-RANK[b]).map(x=>WHO[x]).join(' and ');
  box.innerHTML=`<p><b>${hid.length} more here</b> ${hid.length>1?'are':'is'} shown to ${esc(lvl)}: ${hid.map(h=>esc(h.name)).join(' · ')}. They still count in every result.</p><button type="button" class="btn">Show ${hid.length>1?'them':'it'} ›</button>`;
  box.querySelector('button').onclick=()=>{ hid.forEach(h=>BD.shownMore.add(siteKey()+'|'+h.k)); if(BD.flow&&BD.flow.go) BD.flow.go(BD.flow.i); }; }

/* ---------- step 3: the diagram panel ---------- */
let target={label:'',ids:[]}, sel=null, open=false; try{ open=localStorage.getItem('bd-logic')==='1'; }catch(e){}
function setTarget(label,ids){ ids=known(ids); if(!ids.length) return; if(label===target.label&&ids.join()===target.ids.join()) return; target={label,ids}; sel=null; render(); }
function stepTarget(){ const on=document.querySelector('#side .famrow.on'); if(on&&on.dataset.n){ const ids=oppNodes(on.dataset.n); if(ids.length) return setTarget(on.dataset.n,ids); }
  const k=stepKey(), ids=known(STEP[k]||[]), at=ids.filter(i=>shows([i])); setTarget(stepTitle(),at.length?at:ids); } // a step lights only what its tier draws; a card opened by hand lights its own parts at any tier
BD.logicTarget=setTarget;
function ancestors(ids){ const s=new Set(), st=[...ids]; while(st.length){ const x=st.pop(); if(s.has(x)) continue; s.add(x); (UP[x]||[]).forEach(p=>st.push(p)); } return s; }
// the parents a part shows at this tier: walk up through parts this tier does not draw
function visParents(id,V){ const out=new Set(), seen=new Set(), st=[...(UP[id]||[])]; while(st.length){ const x=st.pop(); if(seen.has(x)) continue; seen.add(x); if(V.has(x)) out.add(x); else (UP[x]||[]).forEach(p=>st.push(p)); } return out; }
function panelEl(){ const vis=document.querySelector('#wc .wcvis'); if(!vis) return null; let p=$('#wcLogic');
  if(!p){ p=document.createElement('div'); p.className='wclogic'; p.id='wcLogic'; p.hidden=!open; const c3=$('#wc3d'); if(c3) c3.after(p); else vis.prepend(p); }
  if(!$('#wcLogicB')&&$('#wc3d')){ const b=document.createElement('button'); b.className='logicb'; b.id='wcLogicB'; b.setAttribute('aria-pressed',open); b.setAttribute('aria-controls','wcLogic'); b.textContent=open?'Hide the logic':'The logic';
    b.onclick=()=>{ open=!open; try{ localStorage.setItem('bd-logic',open?'1':'0'); }catch(e){} b.setAttribute('aria-pressed',open); b.textContent=open?'Hide the logic':'The logic'; p.hidden=!open; render(); window.dispatchEvent(new Event('resize')); };
    $('#wc3d').appendChild(b); }
  return p; }
function render(){ const p=panelEl(); if(!p||!L) return; p.hidden=!open; if(!open) return; const t=tierNow();
  const T=new Set(target.ids), V=new Set(Object.keys(L.nodes).filter(k=>RANK[L.nodes[k].t]<=RANK[t])); T.forEach(k=>V.add(k));
  const A=ancestors(target.ids), lit=new Set([...A].filter(k=>V.has(k)));
  const st=L.stages.map(s=>s[0]), cols={}; st.forEach(s=>cols[s]=[]); [...V].sort((a,b)=>ORDER[a]-ORDER[b]).forEach(k=>{ const s=L.nodes[k].s; (cols[s]||(cols[s]=[])).push(k); });
  const Wd=470, Ht=230, mx=12, top=34, bot=8, cw=(Wd-2*mx)/st.length, P={};
  st.forEach((s,i)=>{ const L2=cols[s]||[], n=L2.length; L2.forEach((k,j)=>{ P[k]=[mx+cw*(i+0.5), top+(Ht-top-bot)*(n===1?0.5:j/(n-1))]; }); });
  let ed='', edLit='';
  for(const k of V){ const [x2,y2]=P[k]||[]; if(x2===undefined) continue; for(const q of visParents(k,V)){ const [x1,y1]=P[q]||[]; if(x1===undefined) continue; const mxp=(x1+x2)/2; const d=`M${x1.toFixed(1)},${y1.toFixed(1)} C${mxp.toFixed(1)},${y1.toFixed(1)} ${mxp.toFixed(1)},${y2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
      if(lit.has(k)&&lit.has(q)) edLit+=`<path d="${d}"/>`; else ed+=`<path d="${d}"/>`; } }
  const dots=[...V].map(k=>{ const [x,y]=P[k]; const isT=T.has(k), isL=lit.has(k), isS=sel===k; const r=isT?5:isL?3.6:2.2;
    return `<circle class="nd${isL?' lit':''}${isT?' tg':''}${isS?' sl':''}" data-n="${k}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" tabindex="-1"><title>${esc(L.nodes[k].n)}</title></circle>`; }).join('');
  const heads=st.map((s,i)=>`<text x="${(mx+cw*(i+0.5)).toFixed(1)}" y="${i%2?24:11}" text-anchor="middle">${esc(L.stages[i][1])}</text>`).join(''); // staggered so the long stage names fit
  const svg=`<svg viewBox="0 0 ${Wd} ${Ht}" role="img" aria-label="The tool's logic at the level ${esc(LEVEL[t])}: ${lit.size} of ${V.size} parts lit behind ${esc(target.label)}"><g class="hd">${heads}</g><g class="ed">${ed}</g><g class="edl">${edLit}</g><g class="dots">${dots}</g></svg>`;
  const right=sel?detail(sel):list(lit,T);
  p.innerHTML=`<div class="lgh"><span>Behind <b>${esc(target.label||'this step')}</b>: ${lit.size} of the ${V.size} parts drawn for ${esc(WHO[t])}</span></div>
   <div class="lgb"><div class="lgsvg">${svg}<p class="lgk"><i class="kt"></i> what you opened <i class="kl"></i> what it is worked out from <i class="kf"></i> the rest at this level</p></div><div class="lgr">${right}</div></div>`;
  p.querySelectorAll('circle.nd').forEach(c=>c.onclick=()=>{ sel=c.dataset.n; render(); });
  p.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>{ sel=b.dataset.pick; render(); });
  const bk=p.querySelector('#lgBack'); if(bk) bk.onclick=()=>{ sel=null; render(); }; }
function list(lit,T){ const by={}; [...lit].sort((a,b)=>ORDER[a]-ORDER[b]).forEach(k=>{ (by[L.nodes[k].s]=by[L.nodes[k].s]||[]).push(k); });
  const rows=L.stages.filter(s=>by[s[0]]).map(s=>`<div class="lgst"><span>${esc(s[1])}</span><div>${by[s[0]].map(k=>`<button type="button" data-pick="${k}" class="${T.has(k)?'tg':''}">${esc(L.nodes[k].n)}</button>`).join('')}</div></div>`).join('');
  return `${rows||'<p class="sub">Open a section or a card to light what it is worked out from.</p>'}<p class="lgn">Click a part for how it is worked out.</p>`; }
const conf=q=>q==null?'not rated':q>=80?'high':q>=60?'medium':q>=40?'low':'very low';
function detail(k){ const n=L.nodes[k]; const src=(n.src||[]).map(s=>{ const o=O(), tx=o&&o.sources&&o.sources[s]; return `<li>${esc(tx?tx.replace(/\s+—\s+https?:\S+$/,'').slice(0,220):s)}</li>`; }).join('');
  return `<button type="button" class="lgback" id="lgBack">← All the parts lit</button><h4>${esc(n.n)}</h4>
  <dl class="lgd">${n.f?`<dt>How</dt><dd>${esc(n.f)}</dd>`:''}${n.c?`<dt>Values</dt><dd>${esc(n.c)}</dd>`:''}${n.u?`<dt>Unit</dt><dd>${esc(n.u)}</dd>`:''}
  <dt>How sure</dt><dd>${n.q!=null?esc(n.q+'% — '+conf(n.q)):'not rated'}${n.st?' · '+esc(n.st):''}</dd>
  <dt>Shown to</dt><dd>${n.t==='resident'?'everyone':n.t==='community'?'the neighbourhood and professionals':'professionals'}</dd><dt>Why</dt><dd>${esc(n.w)}</dd>
  ${n.st2?`<dt>From</dt><dd>${esc(n.st2)}</dd>`:''}</dl>${src?`<p class="lgs">Sources</p><ul class="lgsl">${src}</ul>`:''}`; }

/* ---------- what is open now ---------- */
function fromDrawer(dr){ const h=dr.querySelector('h2'), kd=dr.querySelector('.kind'); const h2=h?h.textContent.trim():'', kind=kd?kd.textContent.trim():''; if(!h2&&!kind) return false;
  let ids=oppNodes(h2); if(!ids.length){ const o=O(), a=o&&(o.addons||[]).find(x=>x.name===h2); if(a) ids=known(a.quantities); }
  if(!ids.length){ const m=KIND.find(([p])=>kind.startsWith(p)); if(m) ids=known(m[1]); }
  if(!ids.length) ids=secNodes(stepKey(),h2);
  if(ids.length){ setTarget(h2||kind,ids); return true; } return false; }
(function watch(){ const sd=$('#side'), dr=document.getElementById('drawer'); if(!sd||!dr) return setTimeout(watch,300); oj();
  let t1=null; new MutationObserver(()=>{ clearTimeout(t1); t1=setTimeout(()=>{ if(!BD.flow||!BD.flow.on) return; filter(sd); if(!(BD.drawer&&BD.drawer.isOpen&&BD.drawer.isOpen()&&fromDrawer(dr))) stepTarget(); panelEl(); render(); },80); }).observe(sd,{childList:true});
  let t2=null; new MutationObserver(()=>{ clearTimeout(t2); t2=setTimeout(()=>{ plainWords(dr); const cc=document.getElementById('wcTx'); if(cc) plainWords(cc); if(BD.drawer&&BD.drawer.isOpen&&BD.drawer.isOpen()){ if(!fromDrawer(dr)) stepTarget(); } else stepTarget(); },60); }).observe(dr,{childList:true});
  sd.addEventListener('toggle',e=>{ const d=e.target; if(!(d&&d.matches&&d.matches('details.sec'))||!d.open) return; const ti=titleOfSec(d), ids=secNodes(stepKey(),ti); if(ids.length) setTarget(ti,ids); },true);
  setInterval(()=>{ if(document.body.classList.contains('wcon')&&!$('#wcLogicB')){ panelEl(); render(); } },700); })();

/* ---------- for the report (step 5) ---------- */
function pathNames(ids){ if(!L) return []; const A=ancestors(known(ids)); return [...A].sort((a,b)=>ORDER[a]-ORDER[b]).map(k=>L.nodes[k].n); }
BD.logic={filter,tierOf,shows,secNodes,oppNodes,addonNodes,stepNodes:k=>known(STEP[k]||[]),pathNames,RANK,WHO,LEVEL,stepKey,render,setTarget};
})();
