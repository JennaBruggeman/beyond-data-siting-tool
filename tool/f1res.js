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
const TYPE={tower:'inside a shared building (floors or a suite in a building with other occupants)',standalone:'stand-alone building','?':'type not confirmed'};
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
  /* audit D15: Vancouver opens on the board's example, Cologix VAN1 at 555 W Hastings (Res_R3_What); Resident is not about a lot, so no pick by the lot */
  const DEF={van:'van1'}; f=L.find(g=>g.id===DEF[city]&&g.inMap); if(f) return (PICK.pick[city]=f.id,f);
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

/* ---------- the 3-D massing of the block: a true isometric, as the board Res_R3_What (Claude Link reports/resident_boards.py r3_axon; J.B. 12 Nov 2026) ----------
   The block is turned so the named parcel's edges (its minimum rotated rectangle) run along the iso axes; of the four corners, the one with least in front of
   the named building is the view. Context: every building within 230 m, extruded (Vancouver: City LiDAR 2022, measured heights; Edmonton: the footprints the
   tool holds). Only a building that would hide the named one is drawn as its footprint and a dashed outline at its height. The named building is the LiDAR
   outline clipped to the facility's parcel, so a neighbour never takes its band. */
const pip=(x,y,r)=>BD.pip(x,y,r);
const R3=230, BLUE='#3366A3';
const ringPts=r=>{ const o=[]; for(let i=0;i<r.length;i+=2) o.push([r[i],r[i+1]]); return o; };
const areaP=P=>{ let a=0; for(let i=0;i<P.length;i++){ const q=P[i], w=P[(i+1)%P.length]; a+=q[0]*w[1]-w[0]*q[1]; } return a/2; };
const cenP=P=>{ let a=0,x=0,y=0; for(let i=0;i<P.length;i++){ const q=P[i], w=P[(i+1)%P.length], c=q[0]*w[1]-w[0]*q[1]; a+=c; x+=(q[0]+w[0])*c; y+=(q[1]+w[1])*c; } return Math.abs(a)<1e-9?P[0]:[x/(3*a),y/(3*a)]; };
const hull=P=>{ const Q=P.slice().sort((a,b)=>a[0]-b[0]||a[1]-b[1]), cr=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]), lo=[], up=[];
  for(const q of Q){ while(lo.length>1&&cr(lo[lo.length-2],lo[lo.length-1],q)<=0) lo.pop(); lo.push(q); }
  for(let i=Q.length-1;i>=0;i--){ const q=Q[i]; while(up.length>1&&cr(up[up.length-2],up[up.length-1],q)<=0) up.pop(); up.push(q); }
  return lo.slice(0,-1).concat(up.slice(0,-1)); };
/* Sutherland–Hodgman: subject clipped by a convex, counter-clockwise clip polygon */
const clipC=(S,Cp)=>{ let out=S; for(let i=0;i<Cp.length&&out.length;i++){ const a=Cp[i], b=Cp[(i+1)%Cp.length], inn=q=>(b[0]-a[0])*(q[1]-a[1])-(b[1]-a[1])*(q[0]-a[0])>=0;
    const X=(p1,p2)=>{ const d1=(b[0]-a[0])*(p1[1]-a[1])-(b[1]-a[1])*(p1[0]-a[0]), d2=(b[0]-a[0])*(p2[1]-a[1])-(b[1]-a[1])*(p2[0]-a[0]), t=d1/(d1-d2); return [p1[0]+t*(p2[0]-p1[0]),p1[1]+t*(p2[1]-p1[1])]; };
    const inp=out; out=[]; for(let k=0;k<inp.length;k++){ const c=inp[k], pv=inp[(k+inp.length-1)%inp.length]; if(inn(c)){ if(!inn(pv)) out.push(X(pv,c)); out.push(c); } else if(inn(pv)) out.push(X(pv,c)); } }
  return out; };
const ccwP=P=>areaP(P)<0?P.slice().reverse():P;
/* a polygon clipped to the parcel: the parcel split into triangles (ear clipping) so each clip is convex; the pieces kept, the largest returned */
function earTri(P){ P=ccwP(P); const V=P.map((q,i)=>i), T=[], cr=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]); let g=0;
  while(V.length>3&&g++<5000){ let cut=false; for(let k=0;k<V.length;k++){ const a=P[V[(k+V.length-1)%V.length]], b=P[V[k]], c=P[V[(k+1)%V.length]]; if(cr(a,b,c)<=1e-9) continue;
      let ok=true; for(const m of V){ const q=P[m]; if(q===a||q===b||q===c) continue; if(cr(a,b,q)>=0&&cr(b,c,q)>=0&&cr(c,a,q)>=0){ ok=false; break; } } if(!ok) continue;
      T.push([a,b,c]); V.splice(k,1); cut=true; break; } if(!cut) break; }
  if(V.length===3) T.push(V.map(m=>P[m])); return T; }
/* the clipped pieces joined again: edges shared by two pieces (the triangulation's diagonals) cancel, the rest chained into outlines (1 cm keys) */
function joinParts(parts){ if(parts.length<2) return parts; const key=q=>Math.round(q[0]*100)+','+Math.round(q[1]*100), E=new Map();
  for(const P of parts) for(let i=0;i<P.length;i++){ const a=P[i], b=P[(i+1)%P.length], ka=key(a), kb=key(b); if(ka===kb) continue; const r=kb+'>'+ka; if(E.has(r)) E.delete(r); else E.set(ka+'>'+kb,[a,b]); }
  const nx=new Map(); for(const [k,[a,b]] of E){ const ka=k.split('>')[0]; if(nx.has(ka)) return parts; nx.set(ka,[a,b]); }
  const out=[], used=new Set(); for(const [ka] of nx){ if(used.has(ka)) continue; const L=[]; let k=ka, g=0; while(!used.has(k)&&nx.has(k)&&g++<10000){ used.add(k); const [a,b]=nx.get(k); L.push(a); k=key(b); } if(k!==ka) return parts; if(L.length>2) out.push(L); }
  return out.length?out:parts; }
function clipToParcel(Q,par){ const tris=earTri(par); let area=0; const parts=[]; for(const t of tris){ const c=clipC(Q,t); if(c.length>2){ const a=Math.abs(areaP(c)); if(a>1e-3){ area+=a; parts.push(c); } } }
  return {area,parts:joinParts(parts)}; }
/* minimum rotated rectangle: the hull edge whose direction gives the smallest bounding box; its angle in radians */
function mrrAngle(P){ const H=hull(P); let best=null; for(let i=0;i<H.length;i++){ const a=H[i], b=H[(i+1)%H.length], an=Math.atan2(b[1]-a[1],b[0]-a[0]), c=Math.cos(-an), s=Math.sin(-an);
    let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9; for(const q of H){ const x=q[0]*c-q[1]*s, y=q[0]*s+q[1]*c; x0=Math.min(x0,x); x1=Math.max(x1,x); y0=Math.min(y0,y); y1=Math.max(y1,y); }
    const A=(x1-x0)*(y1-y0); if(!best||A<best.A) best={A,an}; } return best?best.an:0; }
async function block(f){ const p=await posOf(f); if(!p) return null; const m=await meta(f.city), R=R3+40;
  const keys=T=>{ const ks=new Set(); for(const dx of [-R,0,R]) for(const dy of [-R,0,R]) ks.add(Math.floor((p[0]+dx)/T)+'_'+Math.floor((p[1]+dy)/T)); return ks; };
  const tiles=[]; for(const k of keys(m.T)){ if(!(m.tiles||[]).some(t=>t[0]+'_'+t[1]===k)) continue; try{ const t=await BD.loadTile(f.city,k); if(t) tiles.push(t); }catch(e){} }
  let ring=null; for(const t of tiles){ if(f.parcel&&!ring){ const q=t.par.find(z=>z.id===f.parcel.id); if(q) ring=q.r; } }
  const raw=[]; let lid=false;
  if(f.city==='van'){ for(const k of keys(m.T)){ try{ const J=await BD.getJSON(`tiles/van/lid_${k}.json`); lid=true; for(const b of J.B) raw.push({h:b[0],P:ringPts(b.slice(2))}); }catch(e){} } }
  if(!lid){ const seen=new Set(); for(const t of tiles) for(const b of t.bld){ const c=b.c||BD.centroid(b.r), k=c[0].toFixed(1)+','+c[1].toFixed(1); if(seen.has(k)) continue; seen.add(k); raw.push({h:b.h||4,P:ringPts(b.r)}); } }
  const par=ring?ccwP(ringPts(ring)):null, pc=par?cenP(par):p, items=[];
  for(const b of raw){ const P=ccwP(b.P), a=Math.abs(areaP(P)); if(a<25) continue; const c=cenP(P); if(Math.hypot(c[0]-pc[0],c[1]-pc[1])>R3) continue;
    if(par){ const ov=clipToParcel(P,par), pa=Math.abs(areaP(par));
      if(ov.area>0.5*a||ov.area>0.3*pa){ const sid=raw.indexOf(b); for(const q of ov.parts) items.push({P:ccwP(q),h:b.h,tgt:true,sid}); continue; }   /* the named building: only what stands on its parcel (more than half the outline on it, or covering 30 % of the parcel: a LiDAR outline can run over the next lot) */
      if(ov.area>0.2*a) continue; }   /* a sliver of the parcel's own building that spills over: not a neighbour */
    items.push({P,h:b.h,tgt:false}); }
  if(!par){ /* Edmonton (no parcel): the footprint holding the geocode, else the nearest within 30 m */
    let own=null; for(const it of items) if(pip(p[0],p[1],it.P.flat())&&(!own||Math.abs(areaP(it.P))>Math.abs(areaP(own.P)))) own=it;
    if(!own){ let bd=30; for(const it of items){ const c=cenP(it.P), d=Math.hypot(c[0]-p[0],c[1]-p[1]); if(d<bd){ bd=d; own=it; } } }
    if(own){ own.tgt=true; own.sid=-1; } }
  /* the named building's band goes on its tallest piece on the parcel (the tower), never on a neighbour */
  const T_=items.filter(it=>it.tgt); let own=null; for(const it of T_) if(!own||it.h>own.h+0.5||(Math.abs(it.h-own.h)<=0.5&&Math.abs(areaP(it.P))>Math.abs(areaP(own.P)))) own=it;
  if(own) for(const it of T_) it.mine=it.sid===own.sid;   /* the named building: every piece of its outline on the parcel */
  return {p:pc,items,own,par,ang:par?mrrAngle(par):0,lidar:lid}; }
/* storeys from the source's own words ("28-storey", "22-storey", "28-floor"); none = floor bands not placed */
const storeysOf=f=>{ const m=/(\d+)[- ](?:storey|floor)/i.exec(f.building||''); return m?+m[1]:null; };
function axo(f,B,o){ o=o||{}; const W=900,H=640, small=!!o.small;
  if(!B.items.length) return null;
  const pr=(x,y,z)=>[(x-y)*0.8660,(x+y)*0.5-z];   /* iso: screen y down, larger x+y nearer the viewer */
  /* turned so the parcel runs along the iso axes; y mirrored so the plan keeps its hand (north stays counter-clockwise of east) */
  const turnTo=t=>{ const an=-B.ang+t*Math.PI/2, c=Math.cos(an), s=Math.sin(an); return q=>{ const x=q[0]-B.p[0], y=q[1]-B.p[1], X=x*c-y*s, Y=x*s+y*c; return [X,-Y]; }; };
  const sil=(P,h)=>hull(P.flatMap(q=>[pr(q[0],q[1],0),pr(q[0],q[1],h)]));
  let best=null;
  for(let t=0;t<4;t++){ const fn=turnTo(t), its=B.items.map(it=>({it,P:ccwP(it.P.map(fn)),h:Math.max(2,it.h||4)})), me=its.find(z=>z.it===B.own); if(!me){ best={its,me:null,fn,score:0}; break; }
    const mine=its.filter(z=>z.it.mine), tb=ccwP(hull(mine.flatMap(z=>sil(z.P,z.h)))), td=cenP(me.P), dep=td[0]+td[1]; let score=0;
    for(const z of its){ if(z.it.tgt) continue; const c=cenP(z.P); if(c[0]+c[1]<=dep) continue; const o2=clipC(ccwP(sil(z.P,z.h)),tb); if(o2.length>2) score+=Math.abs(areaP(o2)); }
    if(!best||score<best.score) best={its,me,fn,score,tb,dep}; }
  const {its,me,fn}=best;
  const all=its.flatMap(z=>z.P.flatMap(q=>[pr(q[0],q[1],0),pr(q[0],q[1],z.h)]));
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9; for(const [a,b] of all){ x0=Math.min(x0,a); y0=Math.min(y0,b); x1=Math.max(x1,a); y1=Math.max(y1,b); }
  const padR=small?20:260, k=Math.min((W-padR-30)/(x1-x0),(H-90)/(y1-y0)), ox=30-x0*k, oy=(H-60-(y1-y0)*k)/2-y0*k;
  const S=(x,y,z)=>{ const q=pr(x,y,z); return [ox+q[0]*k,oy+q[1]*k]; };
  const pts=Q=>Q.map(q=>q[0].toFixed(1)+','+q[1].toFixed(1)).join(' ');
  const ply=(Q,fill,st,sw,dash)=>`<polygon points="${pts(Q)}" fill="${fill}" stroke="${st}" stroke-width="${sw}"${dash?` stroke-dasharray="${dash}"`:''} stroke-linejoin="round"/>`;
  const ln=(a,b,col,sw)=>`<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${col}" stroke-width="${sw}"/>`;
  const INK=K.ink||'#18191B', MUTE=K.mute||'#75746F', st=storeysOf(f), fl=(f.floors&&f.floors.list)||[], num=fl.filter(v=>typeof v==='number').sort((a,b)=>a-b), below=fl.filter(v=>typeof v!=='number');
  let svg=`<rect width="${W}" height="${H}" fill="#F6F5F2"/>`, ghosts='', lab='', label=null;
  if(B.par){ const pp=ccwP(B.par.map(fn)); svg+=ply(pp.map(q=>S(q[0],q[1],0)),'#FFFFFF',INK,1,'8 3 1.5 3'); }
  const mine=its.filter(z=>z.it.mine), tb=me?ccwP(hull(mine.flatMap(z=>sil(z.P,z.h)))):null, tA=tb?Math.abs(areaP(tb)):0, dep=me?(cenP(me.P)[0]+cenP(me.P)[1]):-1e9;
  const ek=(a,b)=>Math.round(a[0]*20)+','+Math.round(a[1]*20)+'>'+Math.round(b[0]*20)+','+Math.round(b[1]*20), inner=new Set(); for(const z of mine) for(let i=0;i<z.P.length;i++) inner.add(ek(z.P[i],z.P[(i+1)%z.P.length]));
  const mode=!me?null:f.type==='standalone'?'whole':f.type==='?'?'outline':(fl.length&&st&&num.length)?'floors':(below.length&&!num.length)?'below':'tint';
  for(const z of its.slice().sort((a,b)=>(cenP(a.P)[0]+cenP(a.P)[1])-(cenP(b.P)[0]+cenP(b.P)[1]))){ const P=z.P, h=z.h, isMe=!!z.it.mine, c=cenP(P);
    if(!z.it.tgt&&me&&c[0]+c[1]>dep){ const o2=clipC(ccwP(sil(P,h)),tb); if(o2.length>2&&Math.abs(areaP(o2))>0.02*tA){   /* would hide the named building */
        svg+=ply(P.map(q=>S(q[0],q[1],0)),'#ECEBE7','#A7A6A1',0.5); ghosts+=ply(P.map(q=>S(q[0],q[1],h)),'none','#A7A6A1',0.5,'3 2'); continue; } }
    const own=z.it.tgt, ec=own?INK:'#8A8985', ew=own?0.7:0.5; let g='';
    for(let i=0;i<P.length;i++){ const a=P[i], b=P[(i+1)%P.length], nx=b[1]-a[1], ny=-(b[0]-a[0]); if(nx+ny<=0) continue; if(isMe&&inner.has(ek(b,a))) continue;
      const wall=nx>ny?'#F3F2EE':'#E3E2DD';
      if(isMe&&mode==='whole'){ g+=ply([S(a[0],a[1],0),S(b[0],b[1],0),S(b[0],b[1],h),S(a[0],a[1],h)],BLUE,INK,0.7); continue; }
      if(isMe&&mode==='tint'){ g+=ply([S(a[0],a[1],0),S(b[0],b[1],0),S(b[0],b[1],h),S(a[0],a[1],h)],K.fillSup||'#E4EAF2',INK,0.7); continue; }
      g+=ply([S(a[0],a[1],0),S(b[0],b[1],0),S(b[0],b[1],h),S(a[0],a[1],h)],isMe&&mode==='outline'?'none':wall,isMe&&mode==='outline'?BLUE:ec,ew,isMe&&mode==='outline'?'4 3':null);
      if(isMe&&mode==='floors'){ const fh=h/st; for(let q=1;q<st;q++) g+=ln(S(a[0],a[1],q*fh),S(b[0],b[1],q*fh),'#C9C8C3',0.25);
        for(const n of num) g+=ply([S(a[0],a[1],(n-1)*fh),S(b[0],b[1],(n-1)*fh),S(b[0],b[1],n*fh),S(a[0],a[1],n*fh)],BLUE,INK,0.5); }
      if(isMe&&mode==='below') g+=ply([S(a[0],a[1],0),S(b[0],b[1],0),S(b[0],b[1],Math.min(3,h)),S(a[0],a[1],Math.min(3,h))],BLUE,INK,0.5); }
    const roof=isMe&&mode==='whole'?BLUE:isMe&&mode==='outline'?'none':'#FFFFFF';
    svg+=g+ply(P.map(q=>S(q[0],q[1],h)),roof,isMe&&mode==='outline'?BLUE:ec,own?0.9:0.5,isMe&&mode==='outline'?'4 3':null);
    if(z===me){ const MP=mine.flatMap(w=>w.P), sx=MP.reduce((m2,q)=>S(q[0],q[1],0)[0]>S(m2[0],m2[1],0)[0]?q:m2,MP[0]), fh=st?h/st:h;
      const zl=mode==='floors'?(num[0]-0.5)*fh:mode==='below'?1.5:h*0.6, [lx,ly]=S(sx[0],sx[1],zl);
      const op=f.operator?String(f.operator).split(' (')[0]:'', nm0=op&&op.length<=20&&!/['’"]/.test(op)&&!String(f.name).includes(op)?op+' '+f.name:f.name, nm=nm0.length>30?nm0.slice(0,29)+'…':nm0, t1=mode==='floors'?`Floor${num.length>1?'s':''} ${num.join(', ')}: ${nm}`:nm;
      const t2=[f.addr,(/(Harbour Centre|TELUS Garden|[A-Z][\w’']+ (?:Centre|Tower|Building|Place))/.exec(f.building||'')||[])[1]].filter(Boolean).join(', ');
      if(!small) lab=ln([lx,ly],[W-230,ly],INK,0.8)+`<text x="${W-222}" y="${(ly-4).toFixed(1)}" font-size="14" fill="${INK}">${esc(t1)}</text>`+(t2?`<text x="${W-222}" y="${(ly+13).toFixed(1)}" font-size="12" fill="${MUTE}">${esc(t2)}</text>`:'');
      label=mode==='floors'?`Floor${num.length>1?'s':''} ${num.join(', ')} of ${st}, our reading`:mode==='whole'?'the whole building':mode==='outline'?'type not confirmed: outline only':mode==='below'?`${below.join(', ')} (below grade; drawn as a band at ground level)`:fl.length?`data centre inside: floors ${fl.join(', ')} named, the storey count not published, so not placed`:'data centre inside: floors not published'; } }
  svg+=ghosts+lab;
  if(!me) label='no building footprint found at this location in the City data (?)';
  const src=B.lidar?`Buildings: City of Vancouver LiDAR 2022, within ${R3} m. Buildings that would hide it: footprint and dashed outline.`:`Buildings: City of Edmonton footprints and heights, within ${R3} m. Buildings that would hide it: footprint and dashed outline.`;
  const nb=me?`Named building: ${B.par?'its parcel at the LiDAR height (tower and podium not separated yet)':'the footprint at the facility’s location'}. ${label.charAt(0).toUpperCase()+label.slice(1)}.`:label;
  if(!small) svg+=`<text x="${W-20}" y="${H-30}" font-size="12" fill="${MUTE}" text-anchor="end">${esc(src)}</text><text x="${W-20}" y="${H-12}" font-size="12" fill="${MUTE}" text-anchor="end">${esc(nb)}</text>`;
  return {svg:`<svg viewBox="0 0 ${W} ${H}" width="${o.w||'100%'}" font-family="'IBM Plex Sans', system-ui, sans-serif" role="img" aria-label="Axonometric of ${esc(f.addr||f.name)} among its neighbours${mode==='floors'?', the data centre floor highlighted':''}">${svg}</svg>`,label,src,nb}; }

PICK._block=block; PICK._axo=axo;   /* for the checks */
/* ---------- R3 What it is ---------- */
const v=(t)=>t&&String(t).trim()&&String(t).trim()!=='?'?t:NP;
function factRows(f){ const imp=/implausible/i.test(f.sizeText||'')?'; the inventory flags these figures: “implausible ratio”':'';
  const sz=(f.size?`${f.size.mw[0]===f.size.mw[1]?f.size.mw[0]:f.size.mw[0]+'–'+f.size.mw[1]} MW (${f.size.scope}; ${f.size.label})`:v(f.sizeText))+imp;
  return [['Name',f.name],['Operator',v(f.operator)],['Status',v(f.statusText)],['Address',(f.addr||'address not confirmed')+(f.addrNote?' ('+f.addrNote+')':'')+(f.placed?' · '+f.placed:'')+(f.alsoTenant?' · '+f.alsoTenant:'')],
    ['Type',TYPE[f.type]+(f.typeNote?' ('+f.typeNote+')':'')+(f.fenced?' · fenced site: '+f.fenced.text:'')],['Floors',f.floors?f.floors.text:(f.type==='standalone'?'the whole building':NP)],
    ['Size',sz],['Cooling and backup power',v(f.cooling)],['Heat reuse',v(f.heat)],['Who it serves',v(f.serves)],['Opened',v(f.opened)],['Building',v(f.building)]].map((r,i)=>i?[r[0],C.words(r[1])]:r); }   /* audit C12: source codes in words, no register ids or code names in the rows */
const srcLine=f=>{ const ids=(f.src||[]).concat((f.size&&f.size.src)||[],(f.floors&&f.floors.src)||[],(f.fenced&&f.fenced.src)||[]).filter((s,i,a)=>a.indexOf(s)===i); return ids.length?'This facility’s sources (register ids): '+ids.join(', ')+'.':null; };
C.add(T,'What it is',{async build(x){
  const f=await picked(x); if(!f) return {draw:'<p class="f1v-empty">No data centre on record in this city.</p>'};
  const B=f.inMap?await block(f):null, A=B?axo(f,B):null;
  const draw=A?`<figure class="f1c-res-axo">${A.svg}</figure>`
    :`<div style="max-width:560px;margin:40px auto"><p class="f1v-empty" style="text-align:left">${esc(f.name)} is not on the map: ${esc(f.addrNote||f.where||'its location is not confirmed')}.</p></div>`;
  return {noZoneFlag:true,draw,lead:`${f.name}${f.operator?', run by '+C.words(f.operator):''}: ${STAT[f.status]||f.status}. ${TYPE[f.type].charAt(0).toUpperCase()+TYPE[f.type].slice(1)}. Facts as the sources state them; missing ones are “not published”.`,
    rows:factRows(f).map(r=>[r[0],esc(r[1])]),
    src:[SRC_INV,SRC_PLACE,srcLine(f)].filter(Boolean).concat(['3-D massing: Vancouver, the City of Vancouver LiDAR 2022 buildings with measured heights (tool tiles lid_*, checks/tests/lidar_to_tiles.py); Edmonton, the City footprints the tool holds. Floors drawn only where a source names them and gives the storey count, at height × floor ÷ storeys (our reading; J.B. 11 Nov 2026).']),missing:[]}; }});

/* ---------- R3b What's inside (J.B. 12 Nov 2026, board Res_R3b_Inside; Claude Link reports/resident_equip.py) ----------
   The equipment the facility's sources name, drawn with the Engineering 3-D kit (tool/f1/kit/one_<kind>.png, rendered from kit3d.js by
   checks/tests/kit_renders.js: generic units, not this facility's models). A part is shown only where a source names it; one no source names is
   greyed, "not published". Specs not published read "?". Types only, never counts. */
const PARTS=[
 {k:'rack',n:'Servers in racks',does:'The computers. Almost all the power they draw leaves as heat.',needs:'power, cool air in front, warm air out the back',re:/server|rack|colocation|suite|cabinet|ft²|ft2|white space|IT load/i,always:true},
 {k:'crah',n:'Cooling: room units',does:'Units along the walls or between the racks take the heat out of the room air into a water or glycol loop, or straight outdoors.',needs:'floor space beside the racks, a pipe or refrigerant loop, power',re:/CRAC|CRAH|in-row|perimeter|room unit|air handler|computer room air/i},
 {k:'dry',n:'Cooling: outdoor units',does:'Dry coolers, chillers or towers release the heat to the outdoor air, usually on the roof or in a yard.',needs:'roof or yard space, open air around them, power; water for towers',re:/dry cooler|chiller|cooling tower|condenser|evaporat|free cooling|adiabatic/i,kAlt:t=>/chiller/i.test(t)?'chill':'dry'},
 {k:'ups',n:'UPS (battery-backed power)',does:'Keeps the servers running in the seconds between a power cut and the generators starting.',needs:'its own room, cooling, batteries behind it',re:/\bUPS\b|uninterrupt/i},
 {k:'battery',n:'Batteries',does:'Store the energy the UPS uses for those first minutes.',needs:'a fire-separated room, cooling',re:/batter|li-ion|lithium|VRLA/i},
 {k:'genset',n:'Standby generators',does:'Diesel engines that take over when the grid fails; tested about once a month.',needs:'fuel on site, air, a place where noise and exhaust can go',re:/generator|genset|diesel/i},
 {k:'transformer',n:'Utility power',does:'Feeds from the electric utility; transformers step the voltage down for the building.',needs:'a vault or pad, clearances, a utility connection',re:/\bkV\b|feeder|feed|substation|transformer|BC Hydro|EPCOR|utility power/i}];
function partHere(f,P){ const txt=[f.cooling,f.sizeText,f.serves,f.building].filter(Boolean).join('; ');
  if(!P.re.test(txt)) return P.always&&(f.src||[]).length?{here:'a data centre’s servers; rack count ?',src:'the facility’s listing'}:null;
  const bits=txt.split(/;\s*/).filter(b=>P.re.test(b)).map(b=>C.words(b)).filter(Boolean);
  const here=bits.join('; ').replace(/\s+/g,' ').slice(0,180);
  const code=/\bOC\b/.test(txt)?'operator':/\bGOV\b/.test(txt)?'government record':/\bBRK\b/.test(txt)?'broker':/\bOBS\b/.test(txt)?'site visit (author)':'the facility’s sources';
  return {here:here+(/\d[\d,.]*\s*(?:kW|MW|kV|kVA|ton|ft²|m²|L|kWh|MWh|%)/.test(here)?'':'; size ?'),src:code,kind:P.kAlt?P.kAlt(txt):P.k}; }
C.add(T,'What’s inside',{async build(x){
  const f=await picked(x); if(!f) return {draw:'<p class="f1v-empty">No data centre picked.</p>'};
  const rows=PARTS.map(P=>({P,h:partHere(f,P)}));
  const tile=({P,h})=>`<figure class="f1c-res-part${h?'':' off'}"><img src="f1/kit/one_${h&&h.kind||P.k}.png" width="300" height="210" alt="${esc(P.n)}: a generic unit"><figcaption><b>${esc(P.n)}</b><span class="d">${esc(P.does)}</span><span class="n">Needs: ${esc(P.needs)}</span><span class="h">Here: ${h?esc(h.here).replace(/\?/g,'<i>?</i>'):'<i>not published</i>'}</span><span class="s">${h?esc(h.src):'no source names it'}</span></figcaption></figure>`;
  const named=rows.filter(r=>r.h).length, SPEC=/\d[\d,.]*\s*(?:kW|MW|kV|kVA|ton|ft²|m²|L|kWh|MWh|%)/, specs=rows.filter(r=>r.h&&SPEC.test(r.h.here)).length;   /* a spec is a figure with a unit */
  return {noZoneFlag:true,draw:`<div class="f1c-res-parts">${rows.map(tile).join('')}</div>`,
    lead:`The equipment the sources name for ${f.name}, drawn as generic units: what each part does and what it needs. Types only, not counts; “?” where a spec is not published.`,
    rows:[['Named by a source',`${named} of ${PARTS.length} parts`],['Specs published',specs?`${specs} with a figure; the rest read “?”`:'none: every spec reads “?”'],['Drawings','generic units from the Engineering 3-D kit, not this facility’s models'],['Heat reuse',esc(C.words(v(f.heat)))]],
    more:[['How the parts connect: power in, heat out','<p>Power comes in from the utility through transformers, passes the UPS (batteries behind it, generators for longer outages) and reaches the servers. Almost all of it leaves the servers as heat: room units move it into a loop, and the outdoor units release it to the air unless a neighbour takes it.</p>'],
          ['Why the specs are missing','<p>Operators publish little about their equipment; permits name units without sizes, and spec sheets are claims. The card shows what a source names and marks the rest “?”; nothing is estimated.</p>']],
    src:[SRC_INV,srcLine(f),'Drawings: the Engineering 3-D kit (generic units at their real scale class), rendered one at a time; not this facility’s equipment. Parts: named only where the facility’s sources name them (types, not counts).'].filter(Boolean),missing:[]}; }});

/* ---------- R4 Report ---------- */
const SCOPE=s=>/IT/.test(s)?'MW of IT':/grid|requested|allocation/.test(s)?'MW requested or allocated from the grid':'MW of site capacity or design';
C.add(T,'Report',{async build(x){
  const f=await picked(x); if(!f) return {draw:'<p class="f1v-empty">No data centre picked.</p>'};
  const B=f.inMap?await block(f):null, A=B?axo(f,B,{small:true,w:300}):null, city=f.city;
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
  return {noZoneFlag:true,draw,lead:'Five pages: cover, what it is, where it is, how it compares with the others in the city, and the sources. No comparisons to homes or cars (no sourced conversion). Print or save as PDF.',
    hero:[{v:'5',l:'pages'}],rows:[['Page 1','cover: the building in 3-D'],['Page 2','what it is, as the sources state it'],['Page 3','where it is'],['Page 4','one chart of the facilities with the same kind of size figure'],['Page 5','sources']],
    src:[SRC_INV,SRC_PLACE,srcLine(f)].filter(Boolean),missing:[]}; }});
})();
