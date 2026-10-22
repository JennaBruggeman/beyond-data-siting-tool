/* User workflow view: a swimlane of what the user does, what the tool does, and what the user gets.
   Content is Claude's draft for J.B. to check; decision references point to tool_logic_decisions.md. */
(function(){
const NS='http://www.w3.org/2000/svg';
const el=(t,a={},p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e};
const esc=s=>String(s==null?'':s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const insp=document.getElementById('inspector'), flow=document.getElementById('flow'), canvas=document.getElementById('canvas');

const LANES=[['you','You do','what the user does and decides'],['tool','The tool does','what it computes, from sources'],['get','You get','what appears on screen or leaves with you']];
const LW=300, LG=90, LX0=130, TOP=86, ROWH=96, NH=58;
const laneX={}; LANES.forEach((l,i)=>laneX[l[0]]=LX0+i*(LW+LG));

/* kind: action | decision | tool | output. row = vertical slot.
   The guided path (J.B., 16 Oct 2026): one way through, Back allowed to any step reached, no skipping ahead. */
const DEC='Decided (J.B., 16 Oct): one guided path; Back allowed, no skipping';
const S=[
 {id:'open',need:'required',dflt:'',ask:'',lane:'you',row:0,kind:'action',t:'Open the tool',s:'the welcome card appears at once',
  d:'The tool opens on a welcome card over the map: one sentence on what it does, the six stages, and two buttons.',
  give:[],uses:[],get:[],refs:[DEC],open:[]},
 {id:'welcome',lane:'get',row:0,kind:'output',t:'Welcome card',s:'what it does · six stages · two buttons',
  d:'Site, What fits, Exchanges, Opportunities, Options, Report. "See a worked example" or "Start with my own site", and a link to what the tool cannot tell you.',
  give:[],uses:[],get:['the six stages, named once'],refs:[DEC],open:[]},
 {id:'which',need:'required',dflt:'',ask:'See a worked example · Start with my own site',lane:'you',row:1,kind:'decision',t:'Worked example or own site?',s:'three examples, or pick a parcel',
  d:'A worked example loads its site and set-up answers and starts at the set-up step. Own site starts at Pick a site.',
  give:['one of two'],uses:[],get:[],branches:['Vancouver industrial lot (1425 Clark Dr, I-2, new building)','Edmonton industrial lot (12603 123 Street NW, IH, new building)','An existing downtown tower (555 W Hastings, one upper floor)','My own site → Pick a site'],refs:[DEC],open:[]},
 {id:'site',need:'required',dflt:'',ask:'Click a parcel or search an address.',lane:'you',row:2,kind:'action',t:'1 · Pick a site',s:'a city, then a parcel or an address',
  d:'Next stays off until a parcel is picked. Picking another parcel later sends the path back to its set-up.',
  give:['a city','a parcel or an address'],uses:[],get:[],refs:[DEC],open:[]},
 {id:'find',lane:'tool',row:2,kind:'tool',t:'Look up the parcel',s:'record, zone, buildings, heights',
  d:'Parcel outline, tax or assessment record, zone and whether a data centre is an allowed use, buildings and their heights.',
  give:[],uses:['Vancouver parcels and tax report; LiDAR 2022 heights','Edmonton assessment records, Altalis lot outlines, City 3D buildings','zone use tables (Vancouver By-law; Bylaw 20001)'],get:[],refs:[],open:[]},
 {id:'card',lane:'get',row:2,kind:'output',t:'Site card',s:'allowed use · lot · what stands on it',
  d:'Closed sections, each showing its one-line answer; sources behind a button.',give:[],uses:[],get:['the site card'],refs:['Decided (J.B., 16 Oct): sections closed, answer showing'],open:[]},
 {id:'setup',need:'required',dflt:'Labelled defaults: new whole building, most the zone allows, air inside, dry coolers on the roof, generators in the yard',ask:'Five cards: what is being built · footprint · height · cooling · standby',lane:'you',row:3,kind:'decision',t:'1 · Set up the site',s:'five cards, or keep the defaults',
  d:'Five cards in a drawer beside the panel. Each answer redraws the 3D. "Keep the defaults" moves on with the labelled defaults.',
  give:['new or existing; whole or part','footprint','height or storeys','cooling inside and outside','standby generators'],uses:[],get:[],refs:['Decided (J.B., 16 Oct): five cards in sequence'],open:[]},
 {id:'size',lane:'tool',row:3,kind:'tool',t:'Size the building and plant',s:'envelope → plant → floor the servers need',
  d:'Reads the zone envelope, takes out loading and plant, and sizes the floor the servers need from the chosen size (about 767 m² of floor per MW).',
  give:[],uses:['zone schedules','component sizes (register)'],get:[],refs:['Decided (J.B., 16 Oct): equipment only, not a building'],open:[]},
 {id:'s3d',lane:'get',row:3,kind:'output',t:'Equipment in 3D',s:'the lot, the floor needed, plant at real size',
  d:'No building is drawn: a grey outline of what the zoning allows, a red outline of the floor the servers need, and the plant at real size.',give:[],uses:[],get:['the 3D view'],refs:['Decided (J.B., 16 Oct): equipment only'],open:[]},
 {id:'fits',need:'required',dflt:'The size is set to the smallest that fits',ask:'Size slider',lane:'you',row:4,kind:'action',t:'2 · What fits, then real buildings',s:'read the range; choose a size',
  d:'The largest data centre that fits, as a range, then the same site against real data centres with published floor area and power.',
  give:['a size (MW)'],uses:[],get:[],refs:['Decided (J.B., 16 Oct): Real buildings folded into What fits'],open:[]},
 {id:'fitc',lane:'tool',row:4,kind:'tool',t:'Work out what fits',s:'floor area × hall share ÷ m² per MW',
  d:'Floor area the zone allows, the share that can be hall, and the hall area per MW from built halls, carried as ranges.',give:[],uses:['hall area per MW (five built Canadian halls, operator claims)','precedent catalogue'],get:[],refs:[],open:[]},
 {id:'fito',lane:'get',row:4,kind:'output',t:'What fits · Real buildings',s:'range, then the site among real ones',
  d:'Two screens: the size range with what limits it, then a chart of real data centres with this site\'s range on it.',give:[],uses:[],get:['size range','precedent chart'],refs:[],open:[]},
 {id:'ex',need:'required',dflt:'',ask:'Next, five times',lane:'you',row:5,kind:'action',t:'3 · Walk the exchanges',s:'Heat → Electricity → Water → Materials → People',
  d:'One screen each, in a fixed order. Each opens with its finding, then closed sections; its 3D view opens with it.',
  give:['Next or Back'],uses:[],get:[],refs:[DEC],open:[]},
 {id:'exc',lane:'tool',row:5,kind:'tool',t:'Compute each exchange',s:'receivers, grid, water, materials, neighbours',
  d:'Heat offered and who could take it; power drawn and what could be offered back; water by cooling type; servers and materials over time; sound, sight and people nearby. Each compared with real data centres.',
  give:[],uses:['every quantity in the formula register, as ranges with sources'],get:[],refs:['Tool-logic tab'],open:[]},
 {id:'exo',lane:'get',row:5,kind:'output',t:'Five exchange screens',s:'finding first; 3D for each',
  d:'Heat shows receivers and routes; Electricity the grid side; Water the cooling plant; Materials the racks and trucks; People sound and sight from homes and streets.',give:[],uses:[],get:['five screens, each with its 3D'],refs:[],open:[]},
 {id:'op',need:'required',dflt:'',ask:'Next, once per family; pick a row to see one',lane:'you',row:6,kind:'action',t:'4 · Walk the opportunities',s:'one card per family: heat, electricity, water, land and time, people, materials',
  d:'Six cards, one per family. Opportunities not ruled out are rows (possible here, possible with a change, or not yet known); picking a row shows its detail and 3D. Those that fail a gate sit under "Not here", each with the gate that fails.',
  give:['Next or Back'],uses:[],get:[],refs:['Decided (J.B., 16 Oct): only the possible ones','Changed (J.B., 17 Oct): grouped by family, one card each'],open:['Several opportunities draw only the site model in 3D; their own drawings are still to make.']},
 {id:'opc',lane:'tool',row:6,kind:'tool',t:'Screen fifteen opportunities',s:'physics · land · rules · demand · time · money',
  d:'Each opportunity gets a state per gate at this site, with its reason. No score; the states are not added up.',give:[],uses:['opportunity recipes and rule ladders (register)','zone use tables','EV stations, water permits, public rooms'],get:[],refs:[],open:[]},
 {id:'opo',lane:'get',row:6,kind:'output',t:'One card per family',s:'rows; the picked one: does it work here, rules, unknowns, where done; 3D',
  d:'Each card: the gates, the rules rung by rung, what is not yet known, how proven, and what it would occupy on the site in 3D.',give:[],uses:[],get:['a card per family','those not possible here, with the failing gate'],refs:[],open:[]},
 {id:'ot',need:'required',dflt:'',ask:'Next',lane:'you',row:7,kind:'action',t:'5 · Options, then over time',s:'read across; nothing wins',
  d:'The three options side by side, then what changes over fifty years.',give:['Next or Back'],uses:[],get:[],refs:['Decided (J.B., 16 Oct): Over time folded into Options'],open:[]},
 {id:'gen',lane:'tool',row:7,kind:'tool',t:'Generate three options',s:'smaller air-cooled · chosen size with heat · largest that fits',
  d:'The tool makes three options from the site and the chosen size and fills one trade-off table, grouped by party. No score, no weights, no ranking.',give:[],uses:['the site, the size range and the exchanges'],get:[],refs:['Q6'],open:[]},
 {id:'opts',lane:'get',row:7,kind:'output',t:'Three options · Over time',s:'trade-offs by party; four futures; lifespans',
  d:'Three 3D views side by side, the table by party, four futures, and the lifespans of each part.',give:[],uses:[],get:['three options','the over-time chart'],refs:['Q8'],open:[]},
 {id:'rep',need:'required',dflt:'',ask:'Download HTML · Download PDF',lane:'you',row:8,kind:'action',t:'6 · Two cities, then the report',s:'read, then download',
  d:'The same data centre in both cities, then the report. Back returns to any step already passed.',give:['Download HTML or PDF'],uses:[],get:[],refs:['Decided (J.B., 16 Oct): Two cities folded into the report; PDF and HTML'],open:[]},
 {id:'asm',lane:'tool',row:8,kind:'tool',t:'Assemble the report',s:'from what each step showed',
  d:'Each step\'s finding, its sections\' answers and its tables are kept as the step is passed. The report is those, in order, with a baseline and the sources. It composes no new sentences.',
  give:[],uses:['what each step showed'],get:[],refs:['Q10','Q11'],open:['Changing an answer drops what later steps showed, so the report is never out of date; those steps must be passed again.']},
 {id:'leave',lane:'get',row:8,kind:'output',t:'Report',s:'on screen · HTML · PDF',
  d:'Baseline; each stage in order; the three options table by party; two cities; what the tool cannot tell you; sources.',give:[],uses:[],get:['the report on screen','an HTML file','a PDF'],refs:[],open:[]},
];
const E=[
 ['open','welcome'],['open','which'],['which','site','own site'],['which','setup','worked example','skipR'],['site','find'],['find','card'],['site','setup'],
 ['setup','size'],['size','s3d'],['setup','fits'],['fits','fitc'],['fitc','fito'],['fits','ex'],['ex','exc'],['exc','exo'],['ex','op'],['op','opc'],['opc','opo'],
 ['op','ot'],['ot','gen'],['gen','opts'],['ot','rep'],['rep','asm'],['asm','leave'],['rep','setup','Back','loopL'],
];
const N={}; S.forEach(s=>N[s.id]=s);
const NEEDL={required:'required',optional:'optional',auto:'tool decides',expert:'expert panel'};
const NEEDD={required:'The user must do this.',optional:'The user can skip this; the default applies.',auto:'The tool decides from the data; the user can change it.',expert:'Hidden behind an expert panel; most users never open it.'};
let built=false, sel=null;
function box(s){ return {x:laneX[s.lane], y:TOP+s.row*ROWH, w:LW, h:NH}; }
function build(){
  const bar=document.createElement('div'); bar.className='fbar';
  bar.innerHTML='<span class="fnote">One path for everyone: Next moves on, Back returns to any step already reached, nothing can be skipped.</span>';
  flow.appendChild(bar);
  const W=LX0*2+3*LW+2*LG, H=TOP+(Math.max(...S.map(s=>s.row))+1)*ROWH+10;
  const svg=el('svg',{viewBox:`0 0 ${W} ${H}`,style:'width:100%;min-width:900px;max-width:1400px;height:auto',role:'img','aria-label':'User workflow: three lanes — what the user does, what the tool does, what the user gets — from choosing a city and question, through preferences and options, to leaving with a link, report and image. Loops return from "What next?" to preferences or to computing again.'},flow);
  const defs=el('defs',{},svg);
  [['ah','var(--muted)'],['ahA','var(--accent)']].forEach(([id,c])=>{const m=el('marker',{id,viewBox:'0 0 8 8',refX:7,refY:4,markerWidth:7,markerHeight:7,orient:'auto-start-reverse'},defs); el('path',{d:'M0,0 L8,4 L0,8 z',fill:c},m);});
  LANES.forEach(([k,name,desc])=>{ const x=laneX[k];
    el('rect',{x:x-14,y:TOP-58,width:LW+28,height:H-TOP+50,class:'lane'},svg);
    const t=el('text',{x:x,y:TOP-34,class:'stage-label'},svg); t.textContent=name;
    const d=el('text',{x:x,y:TOP-18,class:'stage-desc'},svg); d.textContent=desc; });
  const gW=el('g',{},svg), gN=el('g',{},svg);
  E.forEach(([a,b,label,kind])=>{
    const A=box(N[a]), B=box(N[b]); let d, lx, ly, cls='fwire';
    if(kind==='loopL'){ const x=A.x-26; d=`M${A.x},${A.y+NH/2} H${x} V${B.y+NH/2} H${B.x}`; lx=x-6; ly=(A.y+B.y)/2+NH/2; cls+=' loop'; }
    else if(kind==='loopC'){ const x=A.x+LW+LG/2+10; d=`M${A.x+LW},${A.y+NH*0.35} H${x} V${B.y+NH/2} H${B.x}`; lx=x+4; ly=(A.y+B.y)/2+NH/2; cls+=' loop'; }
    else if(kind==='skipR'){ const x=A.x+LW+22; d=`M${A.x+LW},${A.y+NH/2} H${x} V${B.y+NH*0.3} H${B.x+LW}`; lx=x+6; ly=A.y+NH/2+4; }
    else if(kind==='down'){ const gy=A.y+NH+(ROWH-NH)/2, cx=B.x+LW+LG/2-6; d=`M${A.x+30},${A.y+NH} V${gy} H${cx} V${B.y+NH/2} H${B.x+LW}`; }
    else if(N[a].row===N[b].row){ if(B.x>A.x){ d=`M${A.x+LW},${A.y+NH/2} H${B.x}`; } else { d=`M${A.x},${A.y+NH/2} H${B.x+LW}`; } lx=(A.x+LW+B.x)/2; ly=A.y+NH/2-6; label&&(kind='mid'); }
    else if(N[a].lane===N[b].lane){ d=`M${A.x+LW/2},${A.y+NH} V${B.y}`; lx=A.x+LW/2+8; ly=(A.y+NH+B.y)/2+4; }
    else if(B.y>A.y && B.x>A.x){ const mx=A.x+LW+LG/2; d=`M${A.x+LW},${A.y+NH*0.7} H${mx} V${B.y+NH*0.3} H${B.x}`; lx=mx+4; ly=(A.y+B.y)/2+NH/2; }
    else if(B.y>A.y && B.x<A.x){ const mx=B.x+LW+LG/2; d=`M${A.x},${A.y+NH*0.7} H${mx} V${B.y+NH*0.3} H${B.x+LW}`; lx=mx-4; ly=(A.y+B.y)/2+NH/2; }
    else { d=`M${A.x+LW/2},${A.y} V${B.y+NH}`; }
    if((N[a].need==='expert'||N[b].need==='expert')&&N[a].lane!==N[b].lane) cls+=' xp';
    const p=el('path',{d,class:cls,'marker-end':`url(#${cls.includes('loop')?'ahA':'ah'})`,'data-a':a,'data-b':b},gW);
    if(label){ const t=el('text',{x:lx,y:ly,class:'flabel'+(cls.includes('loop')?' loop':''),'text-anchor':kind==='loopL'?'end':kind==='mid'?'middle':'start'},gW); t.textContent=label; }
  });
  S.forEach(s=>{ const b=box(s); const g=el('g',{class:'fnode '+s.kind,tabindex:0,role:'button','aria-label':s.t,'data-id':s.id},gN);
    if(s.kind==='decision'){ const k=14; el('path',{class:'shape',d:`M${b.x+k},${b.y} H${b.x+b.w-k} L${b.x+b.w},${b.y+b.h/2} L${b.x+b.w-k},${b.y+b.h} H${b.x+k} L${b.x},${b.y+b.h/2} Z`},g); }
    else el('rect',{class:'shape',x:b.x,y:b.y,width:b.w,height:b.h,rx:s.kind==='output'?14:5},g);
    const kx=b.x+(s.kind==='decision'?20:12);
    const kt=el('text',{x:kx,y:b.y+17,class:'fkind'},g); kt.textContent={action:'step',decision:'decision',tool:'tool',output:'output'}[s.kind];
    if(s.need){ g.classList.add('need-'+s.need); const bx=b.x+b.w-(s.kind==='decision'?22:12); const bt=el('text',{x:bx,y:b.y+17,'text-anchor':'end',class:'fneed '+s.need},g); bt.textContent=NEEDL[s.need]; }
    const t=el('text',{x:kx,y:b.y+34,class:'ftitle'},g); t.textContent=s.t;
    if(s.s){ const u=el('text',{x:kx,y:b.y+49,class:'fsub'},g); u.textContent=s.s; }
    g.addEventListener('click',()=>pick(s.id)); g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(s.id);}});
  });
  built=true;
}
function list(a){ return a&&a.length?'<ul class="steps">'+a.map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>':''; }
function pick(id){ sel=id; flow.querySelectorAll('.fnode').forEach(g=>g.classList.toggle('sel',g.dataset.id===id));
  flow.querySelectorAll('.fwire').forEach(p=>p.classList.toggle('hi',p.dataset.a===id||p.dataset.b===id)); render(); }
function render(){
  if(!sel){ insp.innerHTML=`<div class="empty"><div class="kind">User workflow</div><h2>How a session runs</h2>
   <p>Everyone walks the same path: <span class="k">site, what fits, five exchanges, the opportunities that could work here, three options, a report</span>. Back is allowed; skipping ahead is not.</p><p>Left: what the user does. Middle: what the tool works out. Right: what appears. The red loop is Back.</p>
   <div class="key"><i style="border-color:var(--fg);border-radius:3px"></i><span>step the user takes</span><i style="border-color:var(--accent);border-radius:3px"></i><span>decision the user makes</span><i style="border-color:var(--line-2);border-radius:3px;background:var(--panel-2)"></i><span>what the tool does</span><i style="border-color:var(--k-opp)"></i><span>what the user gets</span></div>
   <div class="key"><span class="needpill required">required</span><span>the user must do it</span><span class="needpill optional">optional</span><span>skip it and a default applies</span><span class="needpill auto">tool decides</span><span>from the data; can be changed</span><span class="needpill expert">expert panel</span><span>hidden unless opened</span></div>
   <p style="margin-top:14px;color:var(--muted)">Click any box for its inputs, outputs, the decisions it rests on and what is still open. The tool-logic tab shows what happens inside the middle lane.</p></div>`; return; }
  const s=N[sel]; const L=LANES.find(l=>l[0]===s.lane)[1];
  insp.innerHTML=`<div class="kind">${esc(L)} · ${esc({action:'step',decision:'decision',tool:'tool',output:'output'}[s.kind])}</div><h2>${esc(s.t)}</h2>
   ${s.need?`<div class="box2"><span class="needpill ${s.need}">${esc(NEEDL[s.need])}</span> <span style="color:var(--muted);font-size:12.5px">${esc(NEEDD[s.need])}</span>${s.dflt?`<div style="margin-top:8px;font-size:13px"><span style="color:var(--muted)">if skipped:</span> ${esc(s.dflt)}</div>`:''}${s.ask?`<div style="margin-top:8px;font-size:13px"><span style="color:var(--muted)">on screen:</span> <span class="draft">“${esc(s.ask)}”</span></div>`:''}</div>`:''}
   <p style="margin-top:10px">${esc(s.d)}</p>
   <dl>${s.branches?`<dt>choices</dt><dd>${list(s.branches)}</dd>`:''}${s.give.length?`<dt>user gives</dt><dd>${list(s.give)}</dd>`:''}${s.uses.length?`<dt>tool uses</dt><dd>${list(s.uses)}</dd>`:''}${s.get.length?`<dt>user gets</dt><dd>${list(s.get)}</dd>`:''}
   ${(()=>{const i=E.filter(e=>e[1]===sel).map(e=>N[e[0]].t), o=E.filter(e=>e[0]===sel).map(e=>N[e[1]].t+(e[2]?' ('+e[2]+')':'')); return (i.length?`<dt>from</dt><dd>${esc(i.join(' · '))}</dd>`:'')+(o.length?`<dt>leads to</dt><dd>${esc(o.join(' · '))}</dd>`:'');})()}
   ${s.refs.length?`<dt>rests on</dt><dd>${s.refs.map(r=>`<span class="tag">${esc(r)}</span>`).join('')}</dd>`:''}
   ${s.open.length?`<dt>open</dt><dd class="draft">${list(s.open)}</dd>`:''}</dl>`;
}
const vbL=document.getElementById('v-logic'), vbW=document.getElementById('v-flow');
function setView(v){ const w=v==='flow'; vbL.setAttribute('aria-pressed',!w); vbW.setAttribute('aria-pressed',w);
  document.querySelectorAll('.logic-only').forEach(e=>e.hidden=w); canvas.hidden=w; flow.hidden=!w;
  if(w){ if(!built) build(); render(); try{history.replaceState(null,'','#workflow')}catch(e){} }
  else { const ex=document.getElementById('m-example').getAttribute('aria-pressed')==='true'; window.__bd&&window.__bd.setMode(ex?'example':'structure'); try{history.replaceState(null,'',location.pathname+location.search)}catch(e){} } }
vbL.onclick=()=>setView('logic'); vbW.onclick=()=>setView('flow');
window.__flow={show:()=>{ if(!built) build(); render(); }};
if(location.hash==='#workflow') setView('flow');
})();
