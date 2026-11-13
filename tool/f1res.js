/* Beyond Data — F1 Resident cards (milestone 1, J.B. 12 Nov 2026; proposal checks/resident_cards_proposal_2026-11-11.md, approved 11 Nov):
   R1 Your city · R2 Find a data centre · R3 What it is · R4 Report. Data: tool/data/facilities.json (Resident step 0; register resident_facilities),
   every cell as the inventory words it, with its labels. No video stills, generic graphics only. R3 draws the facility in 3-D massing (an axonometric of the
   block from the tool's building footprints and heights): stand-alone = the whole building highlighted; floors highlighted only where a source names them
   and the source also gives the storey count (band height = the building's recorded height ÷ storeys, our arithmetic); a tower with floors not published
   = the whole tower in a light tint, "data centre inside: floors not published"; type not confirmed = outline only. Never a floor without a source. */
(function(){
'use strict';
const BD=window.BD, C=BD.f1cards, K=C.K, esc=C.esc, T='resident';
const CITYN={van:'Vancouver',edm:'Edmonton'};
const FAC=city=>((BD.data.facilities||{})[city]||[]);
const RAW=city=>((BD.data.raw.facilities||{})[city]||[]);
const META={}; const meta=async c=>META[c]||(META[c]=await BD.getJSON(`tiles/${c}/meta.json`));
const NP='not published';
const STAT={operating:'operating',approved:'approved',permitted:'permitted','use approved':'use approved',proposed:'proposed',rezoning:'rezoning',announced:'announced','plant approved':'plant approved',closed:'closed','?':'status not confirmed'};
const solid=f=>f.status==='operating';
const TYPE={tower:'inside a tower (floors in a building with other occupants)',standalone:'stand-alone building','?':'type not confirmed'};
/* the picked facility, per city (R2 picks; R3 and R4 read it) */
const PICK=BD.f1res=BD.f1res||{pick:{}};
/* world position of a facility: Vancouver from its parcel (the tool's tile, centroid); Edmonton from the City permit geocode (engine.js P projection) */
const POS={};
async function posOf(f){ if(POS[f.id]!==undefined) return POS[f.id]; let p=null;
  try{ if(f.city==='edm'&&f.xy){ const m=await meta('edm'), k=Math.cos(m.lat0*Math.PI/180)*111320; p=[(f.xy[1]-m.lon0)*k,(f.xy[0]-m.lat0)*110540]; }
    else if(f.city==='van'&&f.parcel){ const t=await BD.loadTile('van',f.parcel.tile), q=t&&t.par.find(x=>x.id===f.parcel.id); if(q) p=BD.centroid(q.r); } }
  catch(e){ p=null; } POS[f.id]=p; return p; }
async function placed(city){ const L=FAC(city).filter(f=>f.inMap); const out=[]; for(const f of L){ const p=await posOf(f); if(p) out.push({f,p}); } return out; }
/* section B: facilities at one address share one marker with their count; a click lists them */
async function grouped(city){ const P=await placed(city), G=new Map(); for(const o of P){ const k=o.f.parcel?o.f.parcel.id:o.p.map(v=>v.toFixed(0)).join(','); if(!G.has(k)) G.set(k,{k,p:o.p,fs:[]}); G.get(k).fs.push(o.f); } return [...G.values()]; }
/* default pick: the facility on the lot shown, else the nearest operating one */
async function picked(x){ const city=x.city, L=FAC(city); let f=L.find(g=>g.id===PICK.pick[city]); if(f) return f;
  const sel=x.sel||{}; f=L.find(g=>g.parcel&&g.parcel.id===sel.id); if(f) return (PICK.pick[city]=f.id,f);
  const P=await placed(city), b=sel.ring?C.bbox(sel.ring):null, c=b?[(b[0]+b[2])/2,(b[1]+b[3])/2]:null;
  const cand=P.filter(o=>solid(o.f)); let best=null; for(const o of (cand.length?cand:P)){ const d=c?Math.hypot(o.p[0]-c[0],o.p[1]-c[1]):0; if(!best||d<best.d) best={d,f:o.f}; }
  if(best){ PICK.pick[city]=best.f.id; return best.f; } return L[0]||null; }
/* a click on a facility (R2 dot or list) picks it and redraws the card */
if(!window.__f1resPick){ window.__f1resPick=true;
  document.addEventListener('click',e=>{ const b=e.target.closest&&e.target.closest('[data-fac]'); if(!b) return; const [city,id]=b.getAttribute('data-fac').split(':'); PICK.pick[city]=id; const gg=b.getAttribute('data-facg'); PICK.grp=PICK.grp||{}; if(gg) PICK.grp[city]=gg.split(':')[1].split(','); else if(!b.closest('[data-facg-list]')) PICK.grp[city]=null;
    const cur=document.querySelector('#f1v .f1v-strip [aria-current="true"]'); if(cur) cur.click(); });
  document.addEventListener('input',e=>{ const t=e.target; if(!t||!t.matches||!t.matches('input[data-facq]')) return; const v=t.value.trim().toLowerCase();
    document.querySelectorAll('[data-facl] li').forEach(li=>{ li.style.display=!v||li.textContent.toLowerCase().includes(v)?'':'none'; }); }); }
const dot=(f,P,o)=>{ const [x,y]=P(o[0],o[1]), cur=PICK.pick[f.city]===f.id;
  return `<g data-fac="${f.city}:${f.id}" style="cursor:pointer"><title>${esc(f.name+(f.operator?' · '+f.operator:'')+' · '+(STAT[f.status]||f.status))}</title><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${cur?6:4.2}" fill="${solid(f)?K.dc:'#fff'}" stroke="${K.dc}" stroke-width="${cur?2.2:1.4}"/></g>`; };
const gdot=(g,P)=>{ if(g.fs.length===1) return dot(g.fs[0],P,g.p); const [x,y]=P(g.p[0],g.p[1]), city=g.fs[0].city, cur=g.fs.some(f=>PICK.pick[city]===f.id), op=g.fs.some(solid);
  return `<g data-fac="${city}:${g.fs[0].id}" data-facg="${city}:${g.fs.map(f=>f.id).join(',')}" style="cursor:pointer"><title>${esc((g.fs[0].addr||'')+': '+g.fs.length+' facilities · '+g.fs.map(f=>f.name).join(', '))}</title><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${cur?9:8}" fill="${op?K.dc:'#fff'}" stroke="${cur?K.ink:K.dc}" stroke-width="${cur?2:1.4}"/><text x="${x.toFixed(1)}" y="${(y+3.5).toFixed(1)}" font-size="9.5" fill="${op?'#fff':K.dc}" text-anchor="middle">${g.fs.length}</text></g>`; };
const dotKey=`<div class="f1c-key"><span><svg width="12" height="12"><circle cx="6" cy="6" r="4.2" fill="${K.dc}" stroke="${K.dc}"/></svg> operating</span><span><svg width="12" height="12"><circle cx="6" cy="6" r="4.2" fill="#fff" stroke="${K.dc}" stroke-width="1.4"/></svg> approved, permitted, proposed or status not confirmed</span></div>`;
const counts=city=>{ const L=FAC(city), C0=L.filter(f=>!f.where); return {n:C0.length,op:C0.filter(solid).length,map:L.filter(f=>f.inMap).length,out:L.filter(f=>f.where).length,nc:C0.filter(f=>!f.inMap).length}; };   /* section B (12 Nov 2026): the city count leaves out the rows beyond the city */
const BEYOND={van:'Metro Vancouver, listed (beyond the city: Burnaby, Coquitlam, UBC)',edm:'Edmonton region, listed (beyond the city)'};
const SRC_INV='Facilities: tool/data/facilities.json (register resident_facilities): the data-centre inventory, research 2–3 Nov 2026 with check 2 (checks/research_arch_v1/inv_van.md, inv_edm.md), addresses and published floors 12 Nov 2026. Each cell keeps its label: OC operator claim, GOV government record, BRK broker claim, ENG engineer’s project sheet, OBS J.B.’s site visit, DIR directory listing, ? not confirmed.';
const SRC_PLACE='Placed: Vancouver by address in the City’s records (the parcel the tool’s own address search finds first: our method); Edmonton by the City permit geocode (arch_inv_edmPermitRows). No coordinates are published for the Vancouver rows.';

/* ---------- R1 Your city: both maps, the zones where a data centre can go (the Municipal map), every placed facility as a dot ---------- */
C.add(T,'Your city',{async build(x){
  const base=await C.get('municipal','Your city').build(x); let draw=base.draw||''; const W=470,H=520;
  for(const city of ['van','edm']){ const m=await meta(city), e=m.ext, f=C.frame([e[0],e[1],e[2],e[3]],W,H,8), P=await placed(city);
    const dots=(await grouped(city)).map(g=>gdot(g,f.P)).join(''); let n=0; const tag=`aria-label="${city==='van'?'Vancouver':'Edmonton'}:`;
    const i=draw.indexOf(tag); if(i<0) continue; const j=draw.indexOf('</svg>',i); if(j<0) continue; draw=draw.slice(0,j)+dots+draw.slice(j); n++; }
  draw+=dotKey;
  const cv=counts('van'), ce=counts('edm');
  return {noZoneFlag:true,draw,lead:`Data centres on record: Vancouver ${cv.n} (${cv.op} operating), Edmonton ${ce.n} (${ce.op} operating); those beyond each city are listed, not mapped. Several at one address share one marker with their count. The shaded zones are where a data centre can be built.`,
    rows:[['Vancouver, on record',`${cv.n} (${cv.op} operating); ${cv.map} on the map, ${cv.nc} not placed (listed with the reason)`],['Metro Vancouver, beyond the city',`${cv.out}: listed, not mapped`],
          ['Edmonton, on record',`${ce.n} (${ce.op} operating); ${ce.map} on the map, ${ce.nc} not placed`],['Edmonton region, beyond the city',`${ce.out}: listed, not mapped`]],
    src:[SRC_INV,SRC_PLACE].concat(base.src||[]),missing:[]}; }});

/* ---------- R2 Find a data centre: the city map with every placed facility; search; click to pick ---------- */
C.add(T,'Find a data centre',{async build(x){
  const city=x.city, m=await meta(city), e=m.ext, W=640,H=640, f=C.frame([e[0],e[1],e[2],e[3]],W,H,8), st=await BD.streets(city), GR=await grouped(city), cur=await picked(x);
  let sd=''; if(st) for(const g of st.segs){ let d=''; for(let i=2;i+1<g.length;i+=2){ const [a,b]=f.P(g[i],g[i+1]); d+=(i>2?'L':'M')+a.toFixed(1)+' '+b.toFixed(1); } sd+=d; }
  const svg=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${CITYN[city]}: data centres on record"><rect width="${W}" height="${H}" fill="${K.ground}"/><path d="${sd}" fill="none" stroke="${K.rule}" stroke-width="0.5"/>${GR.filter(g=>!g.fs.some(z=>cur&&z.id===cur.id)).map(g=>gdot(g,f.P)).join('')}${GR.filter(g=>g.fs.some(z=>cur&&z.id===cur.id)).map(g=>gdot(g,f.P)).join('')}</svg>`;
  const li=g=>`<li><button type="button" data-fac="${g.city}:${g.id}" class="${cur&&cur.id===g.id?'on':''}"><b>${esc(g.name)}</b>${g.operator?' · '+esc(g.operator.split(' (')[0]):''} · ${esc(g.addr||'no street address')} · <em>${esc(STAT[g.status]||g.status)}</em>${!g.inMap&&!g.where&&g.addrNote?`<br><span style="color:#7B7E83">${esc(g.addrNote)}</span>`:''}</button></li>`;
  const L=FAC(city), grp=[['Operating',L.filter(g=>g.inMap&&solid(g))],['Approved, permitted or proposed',L.filter(g=>g.inMap&&!solid(g)&&g.status!=='?'&&g.status!=='closed')],['Status not confirmed or closed',L.filter(g=>g.inMap&&(g.status==='?'||g.status==='closed'))],
    ['Not placed (the reason with each)',L.filter(g=>!g.inMap&&!g.where)],[BEYOND[city],L.filter(g=>g.where)]].filter(g=>g[1].length);
  const gsel=(PICK.grp&&PICK.grp[city])||null, gl=gsel?L.filter(g=>gsel.includes(g.id)):null;
  const list=`<div class="f1c-res-list"><input type="search" data-facq placeholder="Search by name, operator or address" aria-label="Search the list">${gl&&gl.length>1?`<div data-facg-list><h4>At ${esc(gl[0].addr||'')}: ${gl.length} facilities</h4><ul>${gl.map(li).join('')}</ul></div>`:''}<div data-facl>${grp.map(([h,a])=>`<h4>${esc(h)} (${a.length})</h4><ul>${a.map(li).join('')}</ul>`).join('')}</div></div>`;
  const c=counts(city);
  return {noZoneFlag:true,draw:`<div class="f1c-res-find"><figure>${svg}${dotKey}</figure>${list}</div>`,
    lead:`${CITYN[city]}: ${c.n} data centres on record, ${c.op} operating. Click a dot or a name to pick one; the next card describes it.`,
    hero:[{v:String(c.n),l:'on record'},{v:String(c.op),l:'operating'},{v:String(c.map),l:'on the map'}],
    rows:[['Picked',cur?`${cur.name}${cur.operator?' · '+cur.operator.split(' (')[0]:''}`:'none'],['Not placed',`${c.nc}, listed with the reason (never a guessed dot)`],['Beyond the city',`${c.out}, listed`]],
    src:[SRC_INV,SRC_PLACE,'Streets: tool/streets_'+city+'.json.'],missing:[]}; }});

/* ---------- the 3-D massing of the block (axonometric from the tool's footprints and heights) ---------- */
const pip=(x,y,r)=>BD.pip(x,y,r);
async function block(f){ const p=await posOf(f); if(!p) return null; const m=await meta(f.city), R=110;
  const ks=new Set(); for(let di=-1;di<=1;di++) for(let dj=-1;dj<=1;dj++) ks.add((Math.floor((p[0]+di*R)/m.T))+'_'+(Math.floor((p[1]+dj*R)/m.T)));
  const tiles=[]; for(const k of ks){ if(!(m.tiles||[]).some(t=>t[0]+'_'+t[1]===k)) continue; try{ const t=await BD.loadTile(f.city,k); if(t) tiles.push(t); }catch(e){} }
  const bl=[]; const seen=new Set(); let ring=null;
  let lid=null; if(f.city==='van'){ try{ const mm=await meta('van'), ks2=new Set(); for(let di=-1;di<=1;di++) for(let dj=-1;dj<=1;dj++) ks2.add((Math.floor((p[0]+di*R)/mm.T))+'_'+(Math.floor((p[1]+dj*R)/mm.T)));
      lid=[]; for(const k of ks2){ try{ const J=await BD.getJSON(`tiles/van/lid_${k}.json`); for(const b of J.B){ const r=b.slice(2); let a=0; for(let i=0;i<r.length;i+=2){ const j=(i+2)%r.length; a+=r[i]*r[j+1]-r[j]*r[i+1]; } lid.push({h:b[0],r,a:Math.abs(a)/2,c:BD.centroid(r)}); } }catch(e){} } if(!lid.length) lid=null; }catch(e){ lid=null; } }
  for(const t of tiles){ if(f.parcel&&!ring){ const q=t.par.find(z=>z.id===f.parcel.id); if(q) ring=q.r; }
    if(lid) continue;
    for(const b of t.bld){ const c=b.c||BD.centroid(b.r); if(Math.hypot(c[0]-p[0],c[1]-p[1])>R) continue; const k=c[0].toFixed(1)+','+c[1].toFixed(1); if(seen.has(k)) continue; seen.add(k); bl.push(b); } }
  if(lid) for(const b of lid){ if(Math.hypot(b.c[0]-p[0],b.c[1]-p[1])<=R) bl.push(b); }   /* section B: Vancouver neighbours from the City LiDAR 2022 (measured heights) */
  /* the facility's building: Vancouver, the largest footprint whose centroid is inside the parcel; Edmonton, the footprint holding the geocode, else the nearest */
  let own=null;
  const better=(b,o)=>!o||b.a>o.a;
  if(ring){ const on=bl.filter(b=>{ const c=b.c||BD.centroid(b.r); return pip(c[0],c[1],ring); }), hmax=Math.max(0,...on.map(b=>b.h||0));
    /* a tower: the largest footprint among the tall ones (at least 60 % of the tallest: the tower body, not its podium or a lift or lookout shaft); else the largest */
    for(const b of on) if((f.type!=='tower'||(b.h||0)>=0.6*hmax)&&better(b,own)) own=b; }
  if(!own){ for(const b of bl) if(pip(p[0],p[1],b.r)&&better(b,own)) own=b; }
  if(!own){ let best=null; for(const b of bl){ const c=b.c||BD.centroid(b.r), d=Math.hypot(c[0]-p[0],c[1]-p[1]); if(d<30&&(!best||d<best.d)) best={d,b}; } own=best?best.b:null; }
  return {p,bl,own,ring,lidar:!!lid}; }
/* storeys from the source's own words ("28-storey", "22-storey", "28-floor"); none = floor bands not placed */
const storeysOf=f=>{ const m=/(\d+)[- ](?:storey|floor)/i.exec(f.building||''); return m?+m[1]:null; };
function axo(f,B,o){ o=o||{}; const W=o.W||620,H=o.H||520, p=B.p, cs=Math.cos(Math.PI/6), sn=Math.sin(Math.PI/6);
  const pr=(x,y,z)=>[(x-p[0]-(y-p[1]))*cs,(-(x-p[0])-(y-p[1]))*sn-z];   /* view from the south-west, north-east up */
  const all=[]; for(const b of B.bl){ const h=Math.max(2,b.h||4); for(let i=0;i<b.r.length;i+=2){ all.push(pr(b.r[i],b.r[i+1],0),pr(b.r[i],b.r[i+1],h)); } }
  if(!all.length) return null;
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9; for(const [a,b] of all){ x0=Math.min(x0,a); y0=Math.min(y0,b); x1=Math.max(x1,a); y1=Math.max(y1,b); }
  const s=Math.min((W-20)/(x1-x0),(H-20)/(y1-y0)), ox=(W-(x1-x0)*s)/2-x0*s, oy=(H-(y1-y0)*s)/2-y0*s, S=(x,y,z)=>{ const [a,b]=pr(x,y,z); return [ox+a*s,oy+b*s]; };
  const poly=pts=>pts.map(q=>q[0].toFixed(1)+','+q[1].toFixed(1)).join(' ');
  const depth=b=>{ const c=b.c||BD.centroid(b.r); return (c[0]-p[0])+(c[1]-p[1]); };
  const sorted=B.bl.slice().sort((a,b)=>depth(b)-depth(a));
  const st=storeysOf(f), fl=(f.floors&&f.floors.list)||[], isT=f.type==='tower', named=fl.length>0;
  let svg='', label=null;
  const ccw=r=>{ let A=0; for(let i=0;i<r.length;i+=2){ const j=(i+2)%r.length; A+=r[i]*r[j+1]-r[j]*r[i+1]; } return A>0; };
  const prism=(b,z0,z1,fill,stroke,sw,dash,noTop)=>{ let g=''; const w=ccw(b.r)?1:-1; for(let i=0;i<b.r.length;i+=2){ const j=(i+2)%b.r.length, a=[b.r[i],b.r[i+1]], c=[b.r[j],b.r[j+1]];
      if(w*((c[1]-a[1])*-1+(-(c[0]-a[0]))*-1)<=0) continue;   /* only the walls facing the viewer (south-west): outward normal · (−1, −1) > 0 */
      g+=`<polygon points="${poly([S(a[0],a[1],z0),S(c[0],c[1],z0),S(c[0],c[1],z1),S(a[0],a[1],z1)])}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash?' stroke-dasharray="4 3"':''}/>`; }
    if(noTop) return g; const top=[]; for(let i=0;i<b.r.length;i+=2) top.push(S(b.r[i],b.r[i+1],z1)); g+=`<polygon points="${poly(top)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash?' stroke-dasharray="4 3"':''}/>`; return g; };
  if(B.ring){ const gr=[]; for(let i=0;i<B.ring.length;i+=2) gr.push(S(B.ring[i],B.ring[i+1],0)); svg+=`<polygon points="${poly(gr)}" fill="none" stroke="${K.ink}" stroke-width="1.1"/>`; }
  const dOwn=B.own?depth(B.own):-1e9;
  for(const b of sorted){ const h=Math.max(2,b.h||4), me=b===B.own;
    if(!me&&depth(b)<dOwn-4){ const fp=[]; for(let i=0;i<b.r.length;i+=2) fp.push(S(b.r[i],b.r[i+1],0)); svg+=`<polygon points="${poly(fp)}" fill="#F6F5F2" stroke="#A7A6A1" stroke-width="0.5"/>`; continue; }   /* in front of the named building: footprint only, so it stays in view */
    if(!me){ svg+=prism(b,0,h,'#fff',K.faint,0.5); continue; }
    if(f.type==='standalone'){ svg+=prism(b,0,h,K.fillHall,K.dc,1.2); label='the whole building'; continue; }
    if(f.type==='?'){ svg+=prism(b,0,h,'none',K.dc,1.4,true); label='type not confirmed: outline only'; continue; }
    /* a tower: floors where a source names them and the storey count is published; else the whole tower in a light tint */
    const num=fl.filter(v=>typeof v==='number'), below=fl.filter(v=>typeof v!=='number');
    if(named&&st&&num.length){ const fh=h/st, ns=num.sort((a,c)=>a-c); let z=0;   /* bottom to top: white walls, each named floor as a band, white walls above, then the roof */
      for(const n of ns){ const z0=(n-1)*fh, z1=n*fh; if(z0>z) svg+=prism(b,z,z0,'#fff',K.faint,0.6,false,true); svg+=prism(b,z0,z1,K.fillHall,K.dc,1.1,false,true); z=z1; }
      svg+=prism(b,z,h,'#fff',K.faint,0.6);
      label=`floor${num.length>1?'s':''} ${num.join(', ')} of ${st}, drawn at the building’s height × floor ÷ storeys (our reading)`; }
    else if(named&&below.length&&!num.length){ svg+=prism(b,0,Math.min(3,h),K.fillHall,K.dc,1.1,false,true); svg+=prism(b,Math.min(3,h),h,'#fff',K.faint,0.6); label=`${below.join(', ')} (below grade; drawn as a band at ground level)`; }
    else { svg+=prism(b,0,h,K.fillSup,K.dcSup,0.9); label=named?`data centre inside: floors ${fl.join(', ')} named, the storey count not published, so not placed`:'data centre inside: floors not published'; } }
  if(!B.own) label='no building footprint found at this location in the City data (?)';
  return {svg:`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(f.name)}: the block in 3-D massing">${svg}</svg>`,label}; }

/* ---------- R3 What it is ---------- */
const v=(t)=>t&&String(t).trim()&&String(t).trim()!=='?'?t:NP;
function factRows(f){ const imp=/implausible/i.test(f.sizeText||'')?'; the inventory flags these figures: “implausible ratio”':'';
  const sz=(f.size?`${f.size.mw[0]===f.size.mw[1]?f.size.mw[0]:f.size.mw[0]+'–'+f.size.mw[1]} MW (${f.size.scope}; ${f.size.label})`:v(f.sizeText))+imp;
  return [['Name',f.name],['Operator',v(f.operator)],['Status',v(f.statusText)],['Address',(f.addr||'address not confirmed')+(f.addrNote?' ('+f.addrNote+')':'')+(f.placed?' · '+f.placed:'')+(f.alsoTenant?' · '+f.alsoTenant:'')],
    ['Type',TYPE[f.type]+(f.typeNote?' ('+f.typeNote+')':'')+(f.fenced?' · fenced site: '+f.fenced.text:'')],['Floors',f.floors?f.floors.text:(f.type==='standalone'?'the whole building':NP)],
    ['Size',sz],['Cooling and backup power',v(f.cooling)],['Heat reuse',v(f.heat)],['Who it serves',v(f.serves)],['Opened',v(f.opened)],['Building',v(f.building)]]; }
const srcLine=f=>'This facility’s sources (register ids): '+(f.src||[]).concat((f.size&&f.size.src)||[],(f.floors&&f.floors.src)||[],(f.fenced&&f.fenced.src)||[]).filter((s,i,a)=>a.indexOf(s)===i).join(', ')+'.';
C.add(T,'What it is',{async build(x){
  const f=await picked(x); if(!f) return {draw:'<p class="f1v-empty">No data centre on record in this city.</p>'};
  const B=f.inMap?await block(f):null, A=B?axo(f,B):null;
  const draw=A?`<figure class="f1c-res-axo">${A.svg}<figcaption>${esc(f.name)}: ${esc(A.label||'')}. Neighbouring buildings white${B.ring?'; the lot outlined':''}; buildings in front drawn as footprints. ${B.lidar?'Buildings: City of Vancouver LiDAR 2022 (measured heights); a LiDAR outline can join a tower and its podium (not separated yet), so the band runs round both.':'Footprints and heights: City open data.'}</figcaption></figure>`
    :`<div style="max-width:560px;margin:40px auto"><p class="f1v-empty" style="text-align:left">${esc(f.name)} is not on the map: ${esc(f.addrNote||f.where||'its location is not confirmed')}.</p></div>`;
  return {noZoneFlag:true,draw,lead:`${f.name}${f.operator?', run by '+f.operator:''}: ${STAT[f.status]||f.status}. ${TYPE[f.type].charAt(0).toUpperCase()+TYPE[f.type].slice(1)}. Facts as the sources state them; missing ones are “not published”.`,
    rows:factRows(f).map(r=>[r[0],esc(r[1])]),
    src:[SRC_INV,SRC_PLACE,srcLine(f),'3-D massing: Vancouver, the City of Vancouver LiDAR 2022 buildings with measured heights (tool tiles lid_*, checks/tests/lidar_to_tiles.py); Edmonton, the City footprints the tool holds. Floors drawn only where a source names them and gives the storey count, at height × floor ÷ storeys (our reading; J.B. 11 Nov 2026).'],missing:[]}; }});

/* ---------- R4 Report ---------- */
const SCOPE=s=>/IT/.test(s)?'MW of IT':/grid|requested|allocation/.test(s)?'MW requested or allocated from the grid':'MW of site capacity or design';
C.add(T,'Report',{async build(x){
  const f=await picked(x); if(!f) return {draw:'<p class="f1v-empty">No data centre picked.</p>'};
  const B=f.inMap?await block(f):null, A=B?axo(f,B,{W:300,H:250}):null, city=f.city;
  const rows=factRows(f).map(r=>`<tr><th>${esc(r[0])}</th><td>${esc(r[1])}</td></tr>`).join('');
  /* page 3: one bar chart of the facilities in this city that publish the same kind of figure */
  let p3='<p class="ld">This facility publishes no size figure: no chart.</p>';
  if(f.size){ const kind=SCOPE(f.size.scope), L=FAC(city).filter(g=>g.size&&SCOPE(g.size.scope)===kind).sort((a,b)=>b.size.mw[1]-a.size.mw[1]), none=FAC(city).length-L.length, mx=Math.max(...L.map(g=>g.size.mw[1]));
    const bw=260, rh=16; p3=`<div class="lb">${esc(kind)}, ${esc(CITYN[city])} (${L.length} facilities; ${none} publish no figure of this kind)</div><svg viewBox="0 0 ${bw+180} ${L.length*rh+8}" width="100%" role="img" aria-label="${esc(kind)}">`+
      L.map((g,i)=>{ const me=g.id===f.id, a=g.size.mw[0]/mx*bw, b=g.size.mw[1]/mx*bw, y=i*rh+4; return `<text x="0" y="${y+11}" font-size="10" fill="${me?K.ink:K.mute}">${esc(g.name.slice(0,24))}</text><rect x="150" y="${y+3}" width="${Math.max(1,a).toFixed(1)}" height="9" fill="${me?K.ink:K.neut}"/>${b>a+0.5?`<rect x="${(150+a).toFixed(1)}" y="${y+3}" width="${(b-a).toFixed(1)}" height="9" fill="none" stroke="${me?K.ink:K.neut}"/>`:''}<text x="${(156+b).toFixed(1)}" y="${y+11}" font-size="10" fill="${me?K.ink:K.mute}">${g.size.mw[0]===g.size.mw[1]?g.size.mw[0]:g.size.mw[0]+'–'+g.size.mw[1]}</text>`; }).join('')+`</svg><p class="ld">Each figure as its source gives it (claims labelled on page 1); an outlined end is the range where sources differ.</p>`; }
  const pg=(n,t,body)=>`<div class="f1r-pg"><div class="cap">Page ${n} · ${esc(t)}</div><div class="f1r-box"><div class="f1r-sheet"><div class="hd"><span>BEYOND DATA · RESIDENT REPORT · ${esc(String(f.name).toUpperCase())}</span><span>${n} / 5</span></div><h1>${esc(t)}</h1>${body}</div></div></div>`;
  const AB=B?axo(f,B,{W:704,H:560}):null;
  const draw=`<div class="f1r-pages">${pg(1,f.name,`${AB?AB.svg:''}<p class="ld">${esc(f.operator?f.operator.split(' (')[0]+' · ':'')}${esc(STAT[f.status]||f.status)} · ${esc(f.addr||'no street address')}. ${esc(TYPE[f.type])}.</p>`)}${pg(2,'What it is',`<table class="f1c-res-t">${rows}</table>`)}${pg(3,'Where it is',A?`${A.svg}<p class="ld">${esc(A.label||'')}</p>`:`<p class="ld">Not on the map: ${esc(f.addrNote||f.where||'location not confirmed')}.</p>`)}${pg(4,'How it compares',p3)}${pg(5,'Sources',`<p class="ld">${esc(SRC_INV)}</p><p class="ld">${esc(SRC_PLACE)}</p><p class="ld">${esc(srcLine(f))}</p>`)}</div>
    <button class="f1c-mua-print" type="button" onclick="window.print()">Print the report</button>`;
  return {noZoneFlag:true,draw,lead:'Five pages, as the Report_Res draft: cover, what it is, where it is, how it compares with the others in the city, and the sources. No comparisons to homes or cars (no sourced conversion). Print or save as PDF.',
    hero:[{v:'5',l:'pages'}],rows:[['Page 1','cover: the building in 3-D'],['Page 2','what it is, as the sources state it'],['Page 3','where it is'],['Page 4','one chart of the facilities with the same kind of size figure'],['Page 5','sources']],
    src:[SRC_INV,SRC_PLACE,srcLine(f)],missing:[]}; }});
})();
