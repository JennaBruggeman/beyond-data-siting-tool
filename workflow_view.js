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

/* kind: action | decision | tool | output. row = vertical slot. */
const S=[
 {id:'city',need:'required',dflt:'',ask:'Vancouver or Edmonton?',lane:'you',row:0,kind:'action',t:'Choose a city',s:'Vancouver or Edmonton',
  d:'The user starts in the 3D city, drawn as a dark line drawing, and picks which city to work in. Both cities are carried at the same depth.',
  give:['a city'],uses:['parcels, zoning, values and building heights for that city'],get:['the city at city scale'],refs:['Q12 both cities equally','Q14 screen style'],open:['Edmonton lot outlines are not yet available (points only); zone outlines pending (N4c, N4d).']},
 {id:'q',need:'optional',dflt:'Design for a site — clicking a parcel starts here',ask:'What brings you here? I have a proposal · What could go here? · Where could a data centre of this size go? · What would it mean near me?',lane:'you',row:1,kind:'decision',t:'Which question?',s:'evaluate · design · site a load · my address',
  d:'The user picks the question they came with. The tool behaves the same underneath; the question sets where it starts and which party\'s view opens first. Asking what the data centre could give the neighbourhood digitally gets a stated answer: out of scope.',
  give:['one of four questions'],uses:[],get:['the start screen for that question'],
  branches:['Evaluate a proposal: a real or planned data centre on a known parcel','Design for a site: the user picks a parcel and the tool sizes the data centre','Site a load: the user gives a size and the tool looks for parcels','From my address: a resident sees what options near them would mean'],
  refs:['Modes by question asked (12–13 Oct)','Q4 digital services out of scope'],open:['Whether "from my address" opens the residents\' lens by default — Claude\'s proposal.']},
 {id:'start',need:'required',dflt:'',ask:'Click a parcel, or type an address.',lane:'you',row:2,kind:'action',t:'Point to a start',s:'a parcel · a proposal · a load · an address',
  d:'Depending on the question: click a parcel in the 3D city, enter a proposal on a parcel, type a load in MW, or type an address.',
  give:['a parcel, a proposal, a load (0.1–40 MW) or an address'],uses:[],get:[],refs:['Q1 0.1–40 MW designed; hyperscale only as context'],open:['Whether an address is kept in the scenario link or only the parcel it resolves to — Claude\'s proposal: only the parcel.']},
 {id:'find',lane:'tool',row:2,kind:'tool',t:'Find the site or sites',s:'look up the parcel, or search parcels for the load',
  d:'For a parcel or address, the tool looks up its record. For a load, it searches parcels that could hold it and passes them to the options step as positions.',
  give:[],uses:['parcel outlines and tax records (Vancouver N1–N2)','property and assessment records (Edmonton N4, N4b)','building heights (Vancouver 2009 footprints)','zoning rules for a data centre in each city'],get:[],refs:['sources/14 deep dive (zoning)'],open:['Vancouver heights are as of 2009; newer buildings are missing.']},
 {id:'card',lane:'get',row:2,kind:'output',t:'Site card',s:'zoning, value, buildings, neighbours — with sources',
  d:'A short card for the site: zoning and whether a data centre is allowed there, what it would take to rezone, the building on it, its neighbours. Each line opens its source.',
  give:[],uses:[],get:['the site card','the site highlighted at neighbourhood scale'],refs:['Q11 summaries are J.B.\'s templates'],open:[]},
 {id:'newex',need:'auto',dflt:'New, unless the parcel holds a known data centre; then existing, at its next window',ask:'This parcel has a data centre on it. Look at what could change at its next refresh?',lane:'you',row:3,kind:'decision',t:'New or existing?',s:'existing: which window opens next',
  d:'A new data centre starts from an empty or reused building. An existing one is a starting state the options can change, tied to the moments when change is realistic.',
  give:['new, or existing with its window'],uses:[],get:[],branches:['New','Existing at its cooling refresh','Existing at its server refresh (about 6 years)','Existing at lease renewal','Existing at a change of tenant'],refs:['Q2 new and existing'],open:[]},
 {id:'state',lane:'tool',row:3,kind:'tool',t:'Set the starting state',s:'the existing plant and its next window',
  d:'For an existing data centre, the tool records what is there now, at the level public documents state it, and which window the options belong to.',
  give:[],uses:['permits and public documents','lifecycle horizons (servers, plant, shell)'],get:[],refs:['Q2','Q8 lifecycle','Q13 seen / documented / withheld'],open:['Lifecycle horizons rest on a synthesis note, not primary sources (to hunt).']},
 {id:'brings',need:'expert',dflt:'Ranges that fit the parcel, e.g. size 1–10 MW, cooling type open',ask:'Specify the data centre (for operators and planners)',lane:'you',row:4,kind:'action',t:'What the data centre brings',s:'size, cooling, plant, lighting — or ranges',
  d:'Behind a "Specify the data centre" panel, for operators and planners. A resident never has to open it. Anything left open is carried as a range that fits the parcel, not a guess, and the results say so.',
  give:['size (MW)','cooling type','plant schedule','spare cooling','lighting plan'],uses:[],get:[],refs:['Q3 reciprocity both ways (inputs split by side)'],open:[]},
 {id:'place',lane:'tool',row:4,kind:'tool',t:'Read what the place offers',s:'sinks, receivers, grid, power, water, cover, rules',
  d:'The tool reads the place side from data: heat sinks and receivers nearby, the grid and its carbon, the price of power, water supply, existing buildings to reuse, traffic noise as cover, and the rules that apply.',
  give:[],uses:['the nine place-side quantities in the register','city and provincial sources (sources/14)'],get:[],refs:['Q3','register v5 "The place" stage'],open:['Whether users can correct place-side data. Claude\'s proposal: no edits; they can flag a figure and see its source.']},
 {id:'exch',lane:'get',row:4,kind:'output',t:'Two-way exchange panel',s:'six exchanges, both directions; gaps marked',
  d:'Heat, power, water, space, materials and sound, each shown in two directions: what the data centre could give the place, and what the place gives the data centre. Missing figures are shown as gaps, not filled.',
  give:[],uses:[],get:['the exchange panel'],refs:['Q3'],open:[]},
 {id:'pref',need:'optional',dflt:'3 options, no limits, spread across all rows',ask:'What matters to you? Tap any: noise at night · heat for neighbours · carbon · cost · no rezoning · the ground floor for the street. Tap again to make it a must.',lane:'you',row:5,kind:'decision',t:'Set preferences',s:'what matters to you · musts',
  d:'Preferences work like a design brief, not a score. In plain words, a user taps what matters to them; that sets the emphasis (which rows the options differ on). Tapping again makes it a must, which sets a limit. Exact limits (≤ 45 dB at the nearest bedroom at night) and the number of options sit in the expert panel.',
  give:['what matters (taps → emphasis)','musts (second tap → limits)','expert: number of options, exact limits'],uses:[],get:[],refs:['Q6 options and preferences','Q6 limits shown, never silent','Q7 parties'],open:['Default of three options — Claude\'s proposal.','The list of plain-language concerns, and how each maps to rows — to draft with J.B.']},
 {id:'compute',lane:'tool',row:6,kind:'tool',t:'Compute and test',s:'characterise → prospect → opportunities → test',
  d:'The tool works through the stages in the tool-logic tab, carrying every figure as a range with its sources.',
  give:[],uses:['103 quantities in the formula register','calibration against seven built cases'],get:[],refs:['Tool-logic tab','calibration_report.md'],open:[]},
 {id:'conds',lane:'tool',row:7,kind:'tool',t:'Conditions',s:'what would move each one',
  d:'Each condition carries what it would take to move it: a different option, money, time and process, a change in policy, city-scale infrastructure, or nothing at all. Only physics is a hard constraint.',
  give:[],uses:['77 conditions'],get:[],refs:['Constraints vs trade-offs (12–13 Oct)'],open:['The move and party tags are Claude\'s proposals for J.B. to check.']},
 {id:'gen',lane:'tool',row:8,kind:'tool',t:'Make the options',s:'set aside, drop the dominated, spread',
  d:'The tool sets aside options that break a limit or physics, drops any option that is worse than another on every row for every party, and picks the rest to differ as much as possible on the emphasised rows. No score, no weights, no ranking.',
  give:[],uses:['sizes, positions, adjacencies and technologies'],get:[],refs:['Q6'],open:[]},
 {id:'opts',lane:'get',row:8,kind:'output',t:'Options, side by side',s:'in no order; one trade-off table each, by party',
  d:'The options appear side by side in no order. Each has the full trade-off table: rows in their own units, gains and losses by party, a typical mature year, and a lifecycle strip underneath. If fewer options exist than were asked for, the tool says why. Where the user left something open, the results say so in plain words, e.g. "Size not given: showing 1–10 MW, what this parcel could hold."',
  give:[],uses:[],get:['n options','a trade-off table per option','a lifecycle strip per option'],refs:['Q6','Q8 typical year + lifecycle','Q9 own units'],open:[]},
 {id:'relax',lane:'get',row:9,kind:'output',t:'If you moved a limit',s:'shown separately; never mixed into the options',
  d:'What relaxing each limit would open up, and its price. The user\'s limit is never overridden.',
  give:[],uses:[],get:['the relax panel'],refs:['Q6 option b'],open:[]},
 {id:'next',need:'optional',dflt:'',ask:'',lane:'you',row:9,kind:'decision',t:'What next?',s:'adjust · add-ons · preferences · relax · read · done',
  d:'From the options the user can adjust one (size, position, technology) and keep it, try add-ons on it to see what each would change, change preferences, relax a limit, read more closely, or finish.',
  give:['a choice'],uses:[],get:[],branches:['Adjust an option → computed again','Try an add-on (solar, batteries, reused water, a borefield, a seasonal store…) → computed again, showing what changed and the rules in each city','Change preferences or relax a limit → back to preferences','Read and compare → scene, lens, sources','Done → leave with'],refs:['Q6 any option can be adjusted and kept'],open:[]},
 {id:'read',need:'optional',dflt:'A neutral view showing every party',ask:'See it as… a neighbour · the city · the operator · …',lane:'you',row:10,kind:'action',t:'Read and compare',s:'switch lens · open a number\'s sources · move around',
  d:'The user switches lens to see the same table from another party\'s view, opens any number to see its formula and sources, and moves around the scene.',
  give:['a lens','a number to open'],uses:[],get:[],refs:['Q7','Q14 constrained navigation'],open:[]},
 {id:'scene',lane:'get',row:10,kind:'output',t:'3D scene',s:'city · neighbourhood · building · eye-level views',
  d:'The scene at three zoom levels plus curated views from the sidewalk. Plant on generated options is shown plainly; on real sites it is shown as seen, documented or withheld. Navigation is orbit, pan, zoom and fly-to, not free flight.',
  give:[],uses:[],get:['the scene','eye-level views','sources for each figure'],refs:['Q13','Q14','style_studies.html'],open:[]},
 {id:'done',need:'optional',dflt:'',ask:'',lane:'you',row:11,kind:'action',t:'Finish',s:'',
  d:'The user ends the session with what they need to take away.',give:[],uses:[],get:[],refs:[],open:[]},
 {id:'report',lane:'tool',row:11,kind:'tool',t:'Assemble the package',s:'J.B.\'s templates + sourced numbers',
  d:'The tool fills J.B.\'s sentence templates with numbers and lays out the report. It never composes new sentences at run time.',
  give:[],uses:['J.B.\'s templates','the options and their tables','the sources'],get:[],refs:['Q10','Q11'],open:[]},
 {id:'leave',lane:'get',row:11,kind:'output',t:'Leave with',s:'scenario link · report · scene image',
  d:'A link that reopens the exact scenario, a report of a few pages (options side by side, rows, sources), and an image of the 3D scene.',
  give:[],uses:[],get:['scenario link','report (a few pages)','scene image'],refs:['Q10'],open:['The report and image need the artifact\'s file-saving capability; to check at build time.']},
];
const E=[
 ['city','q'],['q','start'],['start','find'],['find','card'],
 ['start','newex'],['newex','state','existing'],['state','place'],['newex','brings','new'],['brings','place'],['place','exch'],
 ['brings','pref'],['pref','compute','limits · emphasis'],['place','compute'],['compute','conds'],['conds','gen'],['gen','opts'],['gen','relax'],
 ['opts','next','','down'],['next','compute','adjust or add-on','loopC'],['next','pref','change or relax','loopL'],
 ['next','read','read'],['read','scene'],['read','done','done'],['done','report'],['report','leave'],
];
const N={}; S.forEach(s=>N[s.id]=s);
const NEEDL={required:'required',optional:'optional',auto:'tool decides',expert:'expert panel'};
const NEEDD={required:'The user must do this.',optional:'The user can skip this; the default applies.',auto:'The tool decides from the data; the user can change it.',expert:'Hidden behind an expert panel; most users never open it.'};
let built=false, sel=null;
function box(s){ return {x:laneX[s.lane], y:TOP+s.row*ROWH, w:LW, h:NH}; }
function build(){
  const bar=document.createElement('div'); bar.className='fbar';
  bar.innerHTML='<span>Show</span><div class="seg" role="group" aria-label="Path"><button id="p-quick" aria-pressed="true">Quick path</button><button id="p-all" aria-pressed="false">Everything</button></div><span class="fnote">Quick path: what a first-time user meets. Two clicks are required; everything else has a default.</span>';
  flow.appendChild(bar);
  const setPath=q=>{flow.classList.toggle('quick',q); bar.querySelector('#p-quick').setAttribute('aria-pressed',q); bar.querySelector('#p-all').setAttribute('aria-pressed',!q);};
  bar.querySelector('#p-quick').onclick=()=>setPath(true); bar.querySelector('#p-all').onclick=()=>setPath(false); setPath(true);
  const W=LX0*2+3*LW+2*LG, H=TOP+12*ROWH+10;
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
   <p class="draft">A first-time user needs two clicks: a city and a parcel. Everything else either has a default, is decided by the tool from the data, or sits in an expert panel for operators and planners. Results always say what was left open.</p>
   <p class="draft">Read top to bottom. The left lane is what the user does and decides, the middle lane is what the tool works out from its sources, and the right lane is what the user sees or takes away. Hexagons are decisions. Dashed red lines are the loops back: after seeing the options, a user can adjust one, change their preferences or relax a limit, and the tool works again.</p>
   <div class="draftnote">Draft wording (Claude) — for J.B. to rewrite.</div>
   <div class="key"><i style="border-color:var(--fg);border-radius:3px"></i><span>step the user takes</span><i style="border-color:var(--accent);border-radius:3px"></i><span>decision the user makes</span><i style="border-color:var(--line-2);border-radius:3px;background:var(--panel-2)"></i><span>what the tool does</span><i style="border-color:var(--k-opp)"></i><span>what the user gets</span></div>
   <div class="key"><span class="needpill required">required</span><span>the user must do it</span><span class="needpill optional">optional</span><span>skip it and a default applies</span><span class="needpill auto">tool decides</span><span>from the data; can be changed</span><span class="needpill expert">expert panel</span><span>hidden unless opened</span></div>
   <p style="margin-top:14px;color:var(--muted)">Click any box for its inputs, outputs, the decisions it rests on and what is still open. The tool-logic tab shows what happens inside the middle lane.</p></div>`; return; }
  const s=N[sel]; const L=LANES.find(l=>l[0]===s.lane)[1];
  insp.innerHTML=`<div class="kind">${esc(L)} · ${esc({action:'step',decision:'decision',tool:'tool',output:'output'}[s.kind])}</div><h2>${esc(s.t)}</h2>
   ${s.need?`<div class="box2"><span class="needpill ${s.need}">${esc(NEEDL[s.need])}</span> <span style="color:var(--muted);font-size:12.5px">${esc(NEEDD[s.need])}</span>${s.dflt?`<div style="margin-top:8px;font-size:13px"><span style="color:var(--muted)">if skipped:</span> ${esc(s.dflt)}</div>`:''}${s.ask?`<div style="margin-top:8px;font-size:13px"><span style="color:var(--muted)">on screen:</span> <span class="draft">“${esc(s.ask)}”</span></div>`:''}</div>`:''}
   <p class="draft" style="margin-top:10px">${esc(s.d)}</p><div class="draftnote">Draft wording (Claude) — for J.B. to rewrite.</div>
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
