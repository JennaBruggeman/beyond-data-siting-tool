/* Beyond Data — F1 Architecture cards, group 'site' (CODE_JOB_F1 step 2): People nearby, Programs nearby, Heat receivers nearby, What the lot allows,
   Ground and flood, Neighbours and views. Registers its cards with BD.f1cards (see f1cards.js, f1arch.js). Every figure comes from the tool's files and
   functions (census_<city>.json, public_rooms_van.json, tiles/<city>/receivers.json, BD.eng.loadRecv/netsAt, data/zones.json, data/grade.json, data/viewpoints.json,
   the loaded tiles); sums, distances and areas are our arithmetic and are said so in each card's sources. A figure the tool lacks is C.q() and listed in missing. */
(function(){
'use strict';
const BD=window.BD, C=BD.f1cards, K=C.K, esc=C.esc, n0=C.n0, n1=C.n1, T='architecture';
/* styles this file needs beyond the shared ones */
if(!document.getElementById('f1c-site')){ const s=document.createElement('style'); s.id='f1c-site';
  s.textContent=`.f1c-site-ed{width:100%;max-width:880px;border-collapse:collapse;font-size:12.5px;margin-top:10px}.f1c-site-ed td{padding:5px 8px 5px 0;border-top:1px solid var(--f-hair,#ECECEC);vertical-align:top;color:var(--f-ink2,#4A4D52)}
.f1c-site-ed td:first-child{width:26px}.f1c-site-ed b{display:inline-block;width:18px;height:18px;line-height:17px;border-radius:50%;border:1px solid #16181B;color:#16181B;font-weight:400;font-size:11px;text-align:center}
.f1c-site-ed small{display:block;color:var(--f-mute,#7B7E83);font-size:11px}.f1c-site-2{display:grid;grid-template-columns:1fr 1fr;gap:6px 22px;margin-top:8px;width:100%;max-width:860px}.f1c-site-2>div{display:flex;gap:8px;border-top:1px solid var(--f-hair,#ECECEC);padding-top:5px;font-size:12.5px;color:var(--f-ink2,#4A4D52)}.f1c-site-2 b{flex:none;margin-top:1px}.f1c-site-2 small{display:block;color:var(--f-mute,#7B7E83);font-size:11px}.f1c-site-wrap{display:flex;flex-direction:column;align-items:flex-start;width:100%}`;
  document.head.appendChild(s); }
const TYPE={housing:'Non-market housing',school:'School',campus:'University or college campus',care:'Care home',hospital:'Hospital',rec:'Recreation centre',hall:'Community league hall',pool:'Pool',arena:'Indoor arena',apartment:'Apartment building',office:'Office building',hotel:'Hotel',commercial:'Commercial building'}; /* engine.js TYPE */
const PLURAL={housing:'Non-market housing',school:'Schools',campus:'Campuses',care:'Care homes',hospital:'Hospitals',rec:'Recreation centres',hall:'Community league halls',pool:'Pools',arena:'Indoor arenas',apartment:'Apartments',office:'Offices',hotel:'Hotels',commercial:'Commercial'};
const FONT='font-family="IBM Plex Sans,system-ui,sans-serif"';
const JS={}; const getJ=async u=>JS[u]||(JS[u]=BD.getJSON(u));
const lotC=()=>BD.eng.siteFacts().c;
const proj=(city,lon,lat)=>{ const m=BD.S.meta[city], k=Math.cos(m.lat0*Math.PI/180)*111320; return [(lon-m.lon0)*k,(lat-m.lat0)*110540]; }; /* same projection as engine.js P() */
const km=d=>(Math.round(d/100)/10).toLocaleString('en-CA',{minimumFractionDigits:1})+' km';
const m0=d=>n0(d)+' m';
const r10=v=>Math.round(v/10)*10;
const tiles=city=>Object.keys(BD.S.tiles).filter(k=>k.startsWith(city+':')).map(k=>BD.S.tiles[k]);
function ptSeg(px,py,ax,ay,bx,by){ const dx=bx-ax,dy=by-ay,L=dx*dx+dy*dy; let t=L?((px-ax)*dx+(py-ay)*dy)/L:0; t=Math.max(0,Math.min(1,t)); return Math.hypot(px-ax-t*dx,py-ay-t*dy); }
function ptRing(px,py,r){ let b=1e12; for(let i=0,j=r.length-2;i<r.length;j=i,i+=2) b=Math.min(b,ptSeg(px,py,r[j],r[j+1],r[i],r[i+1])); return b; }
function ringRing(a,b){ let d=1e12; for(let i=0;i<a.length;i+=2) d=Math.min(d,ptRing(a[i],a[i+1],b)); for(let i=0;i<b.length;i+=2) d=Math.min(d,ptRing(b[i],b[i+1],a)); return d; } /* edge to edge, 0 if they touch at a vertex; our arithmetic */
const ringArea=r=>{ let s=0; for(let i=0,j=r.length-2;i<r.length;j=i,i+=2) s+=r[j]*r[i+1]-r[i]*r[j+1]; return Math.abs(s)/2; };
/* streets of the city, light; the base of the maps */
async function streetsD(city,f,bb){ const st=await BD.streets(city); if(!st) return ''; let sd='';
  for(const g of st.segs){ let ok=false; for(let i=2;i+1<g.length;i+=2) if(g[i]>=bb[0]&&g[i]<=bb[2]&&g[i+1]>=bb[1]&&g[i+1]<=bb[3]){ ok=true; break; } if(!ok) continue;
    for(let i=2;i+1<g.length;i+=2){ const [a,b]=f.P(g[i],g[i+1]); sd+=(i>2?'L':'M')+a.toFixed(1)+' '+b.toFixed(1); } } return sd; }
const north=(x,y)=>`<g ${FONT} font-size="11" fill="${K.mute}"><text x="${x}" y="${y}">N ↑</text></g>`;
const lotPoly=(r,f,op)=>`<path d="${C.pathOf([r],f.P)}" fill="${K.dcSup}" fill-opacity="${op==null?0.7:op}" stroke="${K.ink}" stroke-width="1.8"/>`;
/* leaders: straight horizontal to a label column, at most four (STYLE.md rules 9, 10); an anchor that would crowd an earlier label stays in the panel instead */
function leaders(list,W,gap){ const out=[]; let svg='', lastY=[];
  for(const a of list){ if(out.length>=4) break; if(a.x==null||a.y==null||a.y<14||a.y>a.H-14) continue; if(lastY.some(y=>Math.abs(y-a.y)<(gap||36))) continue; lastY.push(a.y); out.push(a);
    svg+=`<circle cx="${a.x.toFixed(1)}" cy="${a.y.toFixed(1)}" r="2.2" fill="${K.ink}"/><line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${W+16}" y2="${a.y.toFixed(1)}" stroke="${K.ink}" stroke-width="0.5"/>
     <text x="${W+22}" y="${(a.y-2).toFixed(1)}" font-size="13" font-weight="500" fill="${K.ink}">${esc(a.t)}</text><text x="${W+22}" y="${(a.y+13).toFixed(1)}" font-size="11.5" fill="${K.mute}">${esc(a.s||'')}</text>`; }
  return {svg,n:out.length,dropped:list.length-out.length}; }
const circ=(f,c,r,lab,W)=>{ const [x,y]=f.P(c[0],c[1]), rr=r*f.s; return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}" fill="none" stroke="${K.ink2}" stroke-width="0.8" stroke-dasharray="4 4"/><text x="${(x+rr*0.707+3).toFixed(1)}" y="${(y-rr*0.707-3).toFixed(1)}" font-size="11" fill="${K.ink2}">${lab}</text>`; };
const mapFrame=(c,R,W,H)=>({bb:[c[0]-R,c[1]-R,c[0]+R,c[1]+R],f:C.frame([c[0]-R,c[1]-R,c[0]+R,c[1]+R],W,H,0)});
const srcStreets=city=>`Streets: ${city==='van'?'City of Vancouver':'City of Edmonton'} street centrelines (tool/streets_${city}.json).`;
const lotName=x=>`${x.addr}${x.city==='van'?'':''}`;

/* ===== A03 People nearby: the 2021 census on a 100 m grid, from the tool's census file ===== */
const CEN={}; const cen=async city=>CEN[city]||(CEN[city]=await getJ('census_'+city+'.json'));
function censusSum(d,c,r){ const t=new Array(7).fill(0), Cs=d.cell; for(const q of d.cells){ const x=(q[0]+0.5)*Cs-c[0], y=(q[1]+0.5)*Cs-c[1]; if(x*x+y*y<=r*r) for(let i=0;i<7;i++) t[i]+=q[i+2]; } return t; } /* engine.js censusNear */
C.add(T,'People nearby',{async build(x){
  const r=x.sel.ring; if(!r) return {draw:'<p class="f1v-empty">No lot loaded.</p>'};
  const d=await cen(x.city), c=lotC(), W=640, H=640, R=1120, {bb,f}=mapFrame(c,R,W,H), st=await streetsD(x.city,f,bb);
  const bins=[[0,50,'#EEF0F1','under 50'],[50,150,'#DADEE1','50 to 150'],[150,400,'#BFC5CA','150 to 400'],[400,1e9,'#9CA5AC','400 or more']]; const paths=bins.map(()=>''); let n=0;
  for(const q of d.cells){ const x0=q[0]*d.cell, y0=q[1]*d.cell; if(x0>bb[2]||x0+d.cell<bb[0]||y0>bb[3]||y0+d.cell<bb[1]) continue; const b=bins.findIndex(z=>q[2]>=z[0]&&q[2]<z[1]); const [a1,b1]=f.P(x0,y0+d.cell), w=d.cell*f.s;
    paths[b]+=`M${a1.toFixed(1)} ${b1.toFixed(1)}h${w.toFixed(1)}v${w.toFixed(1)}h${(-w).toFixed(1)}Z`; n++; }
  const t1=censusSum(d,c,1000), t5=censusSum(d,c,500), t2=censusSum(d,c,2000);
  const svg=`<svg viewBox="0 0 ${W+240} ${H}" width="${W+240}" height="${H}" role="img" aria-label="People per 100 m cell around ${esc(x.addr)}, 2021 census, with rings at 500 m and 1 km">
   <defs><clipPath id="f1c-a03"><rect width="${W}" height="${H}"/></clipPath></defs><rect width="${W}" height="${H}" fill="${K.ground}"/>
   <g clip-path="url(#f1c-a03)">${bins.map((b,i)=>`<path d="${paths[i]}" fill="${b[2]}"/>`).join('')}<path d="${st}" fill="none" stroke="#fff" stroke-width="1.1" opacity="0.85"/>
   ${circ(f,c,500,'500 m')}${circ(f,c,1000,'1 km')}${lotPoly(r,f,0.9)}</g>
   <g ${FONT}><text x="${W+24}" y="30" font-size="12" font-weight="500" fill="${K.ink}">People per 100 m cell</text>${bins.map((b,i)=>`<rect x="${W+24}" y="${44+i*22}" width="14" height="14" rx="2" fill="${b[2]}" stroke="${K.rule}" stroke-width="0.6"/><text x="${W+46}" y="${56+i*22}" font-size="12" fill="${K.ink2}">${b[3]}</text>`).join('')}
   <text x="${W+24}" y="${44+4*22+8}" font-size="11.5" fill="${K.mute}">Cells under half a person</text><text x="${W+24}" y="${44+4*22+22}" font-size="11.5" fill="${K.mute}">are left blank.</text></g>
   ${north(18,H-48)}${C.scaleBar(18,H-34,500,f.s,'500 m')}</svg>`;
  const T0=t1[0], ren=t1[3]?`${n0(r10(t1[4]))} of ${n0(r10(t1[3]))}`:'?';
  const tbl=`<table class="f1c-site-ed"><tr><td></td><td>500 m</td><td>1 km</td><td>2 km</td></tr>${[['People',0],['Aged 65 and over',1],['Aged 0–14',2],['Households renting',4],['Low income',6]].map(([l,i])=>`<tr><td>${l}</td><td>${n0(r10(t5[i]))}</td><td>${n0(r10(t1[i]))}</td><td>${n0(r10(t2[i]))}</td></tr>`).join('')}</table>`;
  return {draw:svg,lead:'Who lives within a kilometre, from the 2021 census. Facts with distances, no score; later cards use them to say what a design could serve.',
    hero:[{v:n0(r10(T0)),l:'people within 1 km'},{v:n0(r10(t1[1])),l:'aged 65 and over'}],
    rows:[['Aged 0–14',n0(r10(t1[2]))],['Households renting',ren],['Paying 30%+ on shelter',n0(r10(t1[5]))],['Low income',n0(r10(t1[6]))]],
    more:[['How the census is spread',`<p>The census counts people by dissemination area, a block of a few hundred homes. The tool spreads each area's count evenly over its land and adds it up per 100 m cell. A cell shows an estimate, not a count; figures here are rounded to the nearest 10.</p>`],['Change the distance',`<p>Within each distance of the lot centre:</p>${tbl}`]],
    src:[`Census: ${d.source} (tool/census_${x.city}.json).`,'Sums within 1 km: cells whose centre lies within the distance of the lot centre, our arithmetic (the tool’s own rule, engine.js censusNear); rounded to 10.',`Shading classes (under 50, 50 to 150, 150 to 400, 400 or more people per cell) are a drawing choice, not a rule.`,'Low income: LIM-AT share × population, an approximation (tool/make_census_grid.py).',srcStreets(x.city)]}; }});

/* ===== A04 Programs nearby: public rooms near the lot, straight-line distance ===== */
C.add(T,'Programs nearby',{async build(x){
  const r=x.sel.ring; if(!r) return {draw:'<p class="f1v-empty">No lot loaded.</p>'};
  const c=lotC(), W=640, H=640, R=2300, {bb,f}=mapFrame(c,R,W,H), st=await streetsD(x.city,f,bb), recv=await BD.eng.loadRecv(x.city), items=[];
  if(x.city==='van'){ const pr=await getJ('public_rooms_van.json'); for(const [k,L] of [['lib',pr.lib],['cc',pr.cc]]) for(const q of L){ const p=proj('van',q[3],q[2]); items.push({k,n:q[0],a:q[1],x:p[0],y:p[1],d:Math.hypot(p[0]-c[0],p[1]-c[1])}); } }
  for(const p of recv.pts) if(['rec','hall','arena','pool'].includes(p.t)) items.push({k:'rec',t:p.t,n:p.n||TYPE[p.t],x:p.x,y:p.y,d:Math.hypot(p.x-c[0],p.y-c[1])});
  items.sort((a,b)=>a.d-b.d); const near=k=>items.find(i=>i.k===k);
  const nl=near('lib'), nc=near('cc'), nr=near('rec');
  const mk=i=>{ const [px,py]=f.P(i.x,i.y); if(px<-6||px>W+6||py<-6||py>H+6) return ''; const s=`stroke="${K.ink}" stroke-width="1"`;
    return i.k==='lib'?`<rect x="${(px-4.5).toFixed(1)}" y="${(py-4.5).toFixed(1)}" width="9" height="9" fill="${K.fillPub}" ${s}/>`:i.k==='cc'?`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="5" fill="${K.fillPub}" ${s}/>`:`<path d="M${px.toFixed(1)} ${(py-5.5).toFixed(1)}l5.5 5.5l-5.5 5.5l-5.5 -5.5Z" fill="${K.fillPub}" ${s}/>`; };
  const kindName=i=>i.k==='lib'?'library':i.k==='cc'?'community centre':(TYPE[i.t]||'recreation facility').toLowerCase(), grp=[]; /* the nearest of each kind first, then the next nearest; items within 40 m share one label */
  for(const i of [nl,nc,nr,...items].filter(Boolean)){ const g=grp.find(g=>Math.hypot(g.i.x-i.x,g.i.y-i.y)<40); if(g){ if(!g.kinds.includes(kindName(i))) g.kinds.push(kindName(i)); } else grp.push({i,kinds:[kindName(i)]}); }
  const anch=grp.map(g=>{ const [px,py]=f.P(g.i.x,g.i.y); return {x:px,y:py,H,t:g.i.n,s:`${g.kinds.join(', ')} · ${km(g.i.d)}`}; }).filter(a=>a.x>=0&&a.x<=W);
  const L=leaders(anch,W,40);
  const svg=`<svg viewBox="0 0 ${W+250} ${H}" width="${W+250}" height="${H}" role="img" aria-label="Libraries, community centres and recreation facilities within 2 km of ${esc(x.addr)}">
   <defs><clipPath id="f1c-a04"><rect width="${W}" height="${H}"/></clipPath></defs><rect width="${W}" height="${H}" fill="${K.ground}"/><g clip-path="url(#f1c-a04)"><path d="${st}" fill="none" stroke="#fff" stroke-width="1.4"/>
   ${circ(f,c,1000,'1 km')}${circ(f,c,2000,'2 km')}${lotPoly(r,f,0.9)}${items.map(mk).join('')}</g>${L.svg}${north(18,H-48)}${C.scaleBar(18,H-34,500,f.s,'500 m')}</svg>`;
  const key=`<div class="f1c-key"><span><svg width="12" height="12"><rect x="1.5" y="1.5" width="9" height="9" fill="${K.fillPub}" stroke="${K.ink}"/></svg>&nbsp;library</span><span><svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="${K.fillPub}" stroke="${K.ink}"/></svg>&nbsp;community centre</span><span><svg width="12" height="12"><path d="M6 .5l5.5 5.5l-5.5 5.5l-5.5 -5.5Z" fill="${K.fillPub}" stroke="${K.ink}"/></svg>&nbsp;recreation facility (pool, arena, hall, centre)</span>${x.city==='edm'?'<span class="f1c-note">No library or community-centre list is loaded for Edmonton.</span>':''}</div>`;
  const w2=items.filter(i=>i.d<=2000), nlc=w2.filter(i=>i.k!=='rec').length, nrc=w2.filter(i=>i.k==='rec').length;
  const row=(i,k)=>i?`${i.n} · ${km(i.d)}`:C.q();
  const miss=[]; if(x.city==='edm') miss.push('Edmonton libraries and community centres (no list is loaded)'); miss.push('clinics and shelters (no list in the tool, either city)');
  return {draw:svg+key,lead:'Public rooms already near the lot, straight-line distance. A typology that repeats one next door adds less than one that fills a gap.',
    hero:[{v:x.city==='van'?String(nlc):C.q(),l:'libraries and community centres within 2 km'},{v:String(nrc),l:'recreation facilities within 2 km'}],
    rows:(x.city==='van'?[['Nearest library',row(nl)],['Nearest community centre',row(nc)]]:[['Libraries, community centres',C.q()]]).concat([['Nearest recreation facility',row(nr)],['Clinics and shelters',C.q()]]),
    more:[['What counts as a public room',`<p>Libraries and community centres are the City of Vancouver's lists. Recreation facilities (pools, arenas, community halls and recreation centres) are the City open-data lists the tool uses as heat receivers, in both cities. Distances are straight lines from the lot centre.</p>`],['Missing kinds',`<p>${miss.map(esc).join('; ')}.</p>`]],
    src:[x.city==='van'?'Libraries and community centres: City of Vancouver open data (tool/public_rooms_van.json, register vanLibraries, vanCC).':'Edmonton: no library or community-centre list in the tool.','Recreation facilities: City open data (SRF, odsrf) as in tiles/'+x.city+'/receivers.json.','Distances: straight line from the lot centre, our arithmetic. Labels shown for the nearest of each kind; the rest are in the panel.',srcStreets(x.city)],missing:miss}; }});

/* ===== A05 Heat receivers nearby ===== */
C.add(T,'Heat receivers nearby',{async build(x){
  const r=x.sel.ring; if(!r) return {draw:'<p class="f1v-empty">No lot loaded.</p>'};
  const e=BD.eng, f0=e.siteFacts(), c=f0.c, d=await e.loadRecv(x.city), W=640, H=640, R=1150, {bb,f}=mapFrame(c,R,W,H), st=await streetsD(x.city,f,bb);
  let bp=''; for(const t of tiles(x.city)) for(const b of t.bld||[]){ const q=C.bbox(b.r); if(C.hit(bb,q)) bp+=C.pathOf([b.r],f.P); }
  const all=d.pts.map(p=>Object.assign({dist:Math.hypot(p.x-c[0],p.y-c[1])},p)).filter(p=>p.x>=bb[0]&&p.x<=bb[2]&&p.y>=bb[1]&&p.y<=bb[3]).sort((a,b)=>a.dist-b.dist), inn=all.filter(p=>p.dist<=1000);
  const dots=all.map(p=>{ const [px,py]=f.P(p.x,p.y); return p.dist<=1000?`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="3.2" fill="${K.ink}"/>`:`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="2.6" fill="#fff" stroke="${K.ink2}" stroke-width="0.8"/>`; }).join('');
  const anch=inn.slice(0,12).map(p=>{ const [px,py]=f.P(p.x,p.y); return {x:px,y:py,H,t:p.n||TYPE[p.t],s:`${(TYPE[p.t]||'').toLowerCase()} · ${m0(p.dist)}`}; });
  const L=leaders(anch,W,36);
  const svg=`<svg viewBox="0 0 ${W+270} ${H}" width="${W+270}" height="${H}" role="img" aria-label="Heat receivers within 1 km of ${esc(x.addr)}">
   <defs><clipPath id="f1c-a05"><rect width="${W}" height="${H}"/></clipPath></defs><rect width="${W}" height="${H}" fill="${K.ground}"/><g clip-path="url(#f1c-a05)"><path d="${bp}" fill="${K.bld}"/><path d="${st}" fill="none" stroke="#fff" stroke-width="1.4"/>
   ${circ(f,c,1000,'1 km')}${lotPoly(r,f,0.9)}${dots}</g>${L.svg}${north(18,H-48)}${C.scaleBar(18,H-34,500,f.s,'500 m')}</svg>`;
  const key=`<div class="f1c-key"><span><svg width="12" height="12"><circle cx="6" cy="6" r="3.4" fill="${K.ink}"/></svg>&nbsp;receiver within 1 km</span><span><svg width="12" height="12"><circle cx="6" cy="6" r="2.8" fill="#fff" stroke="${K.ink2}"/></svg>&nbsp;receiver further out</span><span><i style="background:${K.bld};border-color:${K.bld}"></i>buildings</span></div>`;
  const by={}; inn.forEach(p=>by[p.t]=(by[p.t]||0)+1); const ord=Object.entries(by).sort((a,b)=>b[1]-a[1]);
  const nets=e.netsAt(f0,d), srcs={}; inn.forEach(p=>srcs[p.src]=(srcs[p.src]||0)+1);
  const homes=inn.filter(p=>p.t==='housing').reduce((t,p)=>t+(p.u||0),0);
  return {draw:svg+key,lead:'Buildings within a kilometre that use heat all year and could take the data centre’s warm water: housing, schools, care homes, pools.',
    hero:[{v:n0(inn.length),l:'buildings within 1 km'},{v:inn[0]?m0(inn[0].dist):C.q(),l:'to the nearest'}],
    rows:ord.slice(0,4).map(([t,k])=>[PLURAL[t]||t,String(k)]).concat(ord.length>4?[['Other kinds',String(ord.slice(4).reduce((t,a)=>t+a[1],0))]]:[]),
    more:[['How receivers were picked',`<p>The tool lists every building it holds with a steady year-round heat demand, from City and provincial open data, and the BC Assessment or City records it already shows. The card counts those within 1 km of the lot centre (the tool’s own search reaches ${n0(e.R.recvRadius)} m). Sources inside 1 km: ${Object.entries(srcs).map(([k,v])=>`${esc(k)} ${v}`).join(', ')||'none'}.${homes?` Non-market housing inside 1 km: ${n0(homes)} homes.`:''}</p>`],
      ['District energy nearby',nets.length?`<ul>${nets.map(n=>`<li>${esc(n.n)}${n.op?' ('+esc(n.op)+')':''}: ${n.inside?'the lot is inside it':km(n.edge)+' from the lot'}${n.note?`<br><small>${esc(n.note)}</small>`:''}</li>`).join('')}</ul>`:'<p>No district energy network within 1.2 km.</p>']],
    src:[`Receivers: tiles/${x.city}/receivers.json (${Object.keys(srcs).join(', ')||'?'}), loaded by BD.eng.loadRecv; counts by kind are our arithmetic.`,'Heat demand per receiver is not shown on this card.','District energy networks: tiles/'+x.city+'/receivers.json (BD.eng.netsAt).',`Buildings: ${x.city==='van'?'City of Vancouver':'City of Edmonton'} building footprints. ${srcStreets(x.city)}`]}; }});

/* ===== A06 What the lot allows: each lot line's class and yard, the height limit ===== */
const KN={front:'Front',side:'Side',rear:'Rear',flank:'Flank',unclear:'Unclear'};
const clause=(Z,re)=>{ const c=(Z.cl||[]).find(r=>re.test(r[0])); return c?{t:c[1],s:c[2]}:null; };
C.add(T,'What the lot allows',{async build(x){
  const M=x.M, Z=M.Z, r=x.sel.ring; if(!r||!Z) return {draw:'<p class="f1v-empty">No lot loaded.</p>'};
  const E=(M.edgeYards||[]).filter(e=>isFinite(e.ax)), b=C.bbox(r), cx=(b[0]+b[2])/2, cy=(b[1]+b[3])/2, half=Math.max(b[2]-b[0],b[3]-b[1])/2*1.45+6, W=390, H=390;
  const bb=[cx-half,cy-half,cx+half,cy+half], f=C.frame(bb,W,H,0), st=await streetsD(x.city,f,bb), [gx,gy]=f.P(cx,cy);
  const yl=M.yardLine&&!M.yardOffBad?M.yardLine:null, buildable=yl?ringArea(yl):null;
  const mk=E.map((e,i)=>{ const [a1,a2]=f.P(e.ax,e.ay), [b1,b2]=f.P(e.bx,e.by), mx=(a1+b1)/2, my=(a2+b2)/2; let nx=-(b2-a2), ny=b1-a1; const L=Math.hypot(nx,ny)||1; nx/=L; ny/=L; if(nx*(mx-gx)+ny*(my-gy)<0){ nx=-nx; ny=-ny; }
    const px=mx+nx*15, py=my+ny*15, front=e.kind==='front';
    return `<line x1="${a1.toFixed(1)}" y1="${a2.toFixed(1)}" x2="${b1.toFixed(1)}" y2="${b2.toFixed(1)}" stroke="${K.ink}" stroke-width="${front?4:1.8}"/><circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="8" fill="#fff" stroke="${K.ink}" stroke-width="0.8"/><text x="${px.toFixed(1)}" y="${(py+4).toFixed(1)}" text-anchor="middle" font-size="11" fill="${K.ink}">${String.fromCharCode(65+i)}</text>`; }).join('');
  /* section: the height limits, each from the zone's own row (zones.json), drawn from 0 to the highest limit on one scale */
  const H0=Z.hOutright, hx=Z.hx, top=Math.max(H0||0,hx?hx[1]:0)*1.15||20, SX=430, SY0=360, SH=250, sc=SH/top, yOf=h=>SY0-h*sc, hc=clause(Z,/^Height/i);
  const ticks=[]; for(let h=0;h<=top;h+=10) ticks.push(h);
  const sect=`<line x1="${SX}" y1="${SY0}" x2="${SX+150}" y2="${SY0}" stroke="${K.ink}" stroke-width="1.2"/><text x="${SX-8}" y="${SY0+4}" text-anchor="end" font-size="11" fill="${K.mute}">0</text>
   ${ticks.slice(1).map(h=>`<line x1="${SX-4}" y1="${yOf(h)}" x2="${SX}" y2="${yOf(h)}" stroke="${K.faint}" stroke-width="0.6"/><text x="${SX-8}" y="${yOf(h)+4}" text-anchor="end" font-size="11" fill="${K.mute}">${h}</text>`).join('')}
   ${hx?`<rect x="${SX}" y="${yOf(hx[1])}" width="150" height="${(yOf(hx[0])-yOf(hx[1])).toFixed(1)}" fill="${K.fillSup}"/><line x1="${SX}" y1="${yOf(hx[0])}" x2="${SX+150}" y2="${yOf(hx[0])}" stroke="${K.ink2}" stroke-width="1" stroke-dasharray="5 4"/><line x1="${SX}" y1="${yOf(hx[1])}" x2="${SX+150}" y2="${yOf(hx[1])}" stroke="${K.ink2}" stroke-width="1" stroke-dasharray="5 4"/>`:''}
   ${H0?`<line x1="${SX}" y1="${yOf(H0)}" x2="${SX+150}" y2="${yOf(H0)}" stroke="${K.ink}" stroke-width="1.6"/>`:'<text x="'+SX+'" y="'+(SY0-20)+'" font-size="12" fill="'+K.red+'">?</text>'}
   <text x="${SX}" y="${SY0-SH-34}" font-size="11.5" fill="${K.mute}">Height limits (section, own scale, metres)</text>
   ${H0?`<text x="${SX+160}" y="${yOf(H0)-2}" font-size="13" font-weight="500" fill="${K.ink}">Height limit ${n1(H0)} m</text><text x="${SX+160}" y="${yOf(H0)+13}" font-size="11.5" fill="${K.mute}">${esc(hc?hc.s.replace(/\s*\(.*$/,''):'')}</text>`:''}
   ${hx?`<text x="${SX+160}" y="${(yOf(hx[0])+yOf(hx[1]))/2+4}" font-size="13" fill="${K.ink2}">With approval, up to ${n1(hx[0])}–${n1(hx[1])} m</text>`:''}`;
  const svg=`<svg viewBox="0 0 ${W+400} ${H}" width="${W+400}" height="${H}" role="img" aria-label="${esc(x.addr)}: each lot line with its class and yard depth, and the height limits">
   <defs><clipPath id="f1c-a06"><rect width="${W}" height="${H}"/></clipPath></defs><rect width="${W}" height="${H}" fill="${K.ground}"/><g clip-path="url(#f1c-a06)"><path d="${st}" fill="none" stroke="#fff" stroke-width="1.6"/>
   <path d="${C.pathOf([r],f.P)}" fill="#fff" stroke="none"/>${yl?`<path d="${C.pathOf([yl],f.P)}" fill="${K.fillSup}" stroke="${K.ink2}" stroke-width="1" stroke-dasharray="5 4"/>`:''}${mk}</g>${north(18,H-48)}${C.scaleBar(18,H-34,50,f.s,'50 m')}${sect}</svg>`;
  const key=`<div class="f1c-key"><span><i style="background:${K.fillSup};border-color:${K.ink2}"></i>${yl?'inside the yards':'yards not drawn'}</span><span><i class="ln" style="border-color:${K.ink}"></i>lot line (front line heavier)</span><span><i class="ln" style="border-color:${K.ink2};border-top-style:dashed"></i>yard line</span></div>`;
  const tbl=`<div class="f1c-site-ed f1c-site-2">${E.map((e,i)=>`<div><b>${String.fromCharCode(65+i)}</b><span>${KN[e.kind]||esc(e.kind)}${e.kind==='unclear'?' <span class="f1c-q">?</span>':''} · yard ${n1(e.d)} m · ${n0(e.len)} m long${e.abuts?' · abuts '+esc(e.abuts):''}<small>${esc(e.why||'')}</small></span></div>`).join('')}</div>`;
  const fsr=Z.fsr, fs=fsr?(fsr[0]===fsr[1]?n1(fsr[0]):n1(fsr[0])+'–'+n1(fsr[1])):C.q(), y=Z.yards||{};
  const fc=clause(Z,/^Floor area/i), gc=clause(Z,/^Ground floor/i), yc=clause(Z,/^(Yards|Setbacks)/i);
  const maxFloor=fsr&&x.sel.lotArea?fsr[1]*x.sel.lotArea:null;
  const miss=[]; if(Z.assumed) miss.push('zone limits for this zone (the tool borrows another zone’s limits to draw)');
  return {draw:`<div class="f1c-site-wrap">${svg}${key}${tbl}</div>`,lead:'The zoning envelope: yards, height and floor area. Anything the typology places must sit inside it. Rezonings and variances come later as flagged options.',
    hero:[{v:H0?n1(H0):C.q(),u:H0?' m':'',l:'height limit'},{v:fs,u:fsr?' × lot':'',l:'floor space ratio'},{v:buildable?n0(buildable):C.q(),u:buildable?' m²':'',l:'inside the yards'}],
    rows:[['Floor area, at most',maxFloor?`${n0(maxFloor)} m²`:C.q()],['Front · side · rear yard',`${n1(y.front)} · ${n1(y.side)} · ${n1(y.rear)} m${x.city==='edm'?' (by edge, see key)':''}`],['Ground floor',Z.ground?'no data storage, except entrances':'no ground-floor rule found']],
    more:[['Each rule and its clause',`<table class="f1c-site-ed">${(Z.cl||[]).map(c=>`<tr><td style="width:90px">${esc(c[0])}</td><td>${esc(c[1])}<small>${esc(c[2])}</small></td></tr>`).join('')}</table>${Z.warn?`<p>${esc(Z.warn.replace(/<[^>]+>/g,''))}</p>`:''}`],['Floor area with approval',`<p>${fc?esc(fc.t)+' ('+esc(fc.s)+')':'No increase clause is read for this zone.'}</p>`]],
    src:[`Zone limits and clauses: tool/data/zones.json, row ${Z.vkey||Z.key} (${((C.dcStatus?C.dcStatus(x.city,Z.vkey||Z.key).src:[])||[]).join(', ')||'envelope'}).`,
      `Lot lines: each line's class and yard from lotside.js and site.js (${((M.yards&&M.yards.src)||[]).join(', ')||'?'}); classes marked ? are our reading.`,'Inside the yards: the area of the yard line (M.yardLine), our arithmetic'+(M.yardOffBad?'; the yard line folds on this lot, so no area is given (?)':'')+'. Maximum floor area: floor space ratio × lot area, our arithmetic.',srcStreets(x.city)],missing:miss}; }});

/* ===== A07 Ground and flood (Vancouver: one scale, CGVD28 GVRD; Edmonton: datum and flood level not in the tool) ===== */
C.add(T,'Ground and flood',{async build(x){
  const g=x.M.grade||{}, s=x.sel, q=s.grade, none=!q||g.none, RG=(BD.data.raw.grade||{})[x.city]||{}, fc=(BD.data.raw.grade||{}).fcl, van=x.city==='van', ff=g.fcl;
  const F=van&&fc?+fc.v:null, W=900, H=none?150:500, SY0=410, topM=none?10:Math.max(Math.ceil(g.max)+1,F!=null?Math.ceil(F)+1:0,6), sc=Math.min(48,(SY0-60)/topM), yOf=m=>SY0-m*sc, AX=140;
  const axis=`<line x1="${AX}" y1="${yOf(0)}" x2="${AX}" y2="${yOf(topM)}" stroke="${K.ink}" stroke-width="1"/>${Array.from({length:topM+1},(_,i)=>`<line x1="${AX-4}" y1="${yOf(i)}" x2="${AX}" y2="${yOf(i)}" stroke="${K.faint}" stroke-width="0.6"/><text x="${AX-8}" y="${yOf(i)+4}" text-anchor="end" font-size="11" fill="${K.mute}">${i}</text>`).join('')}<text x="${AX}" y="${yOf(topM)-26}" text-anchor="middle" font-size="12" font-weight="500" fill="${K.ink}">Height, metres</text><text x="${AX}" y="${yOf(topM)-11}" text-anchor="middle" font-size="11.5" fill="${K.mute}">${esc(g.datum||'datum ?')}</text>`;
  let body='', share='';
  if(!none){ const v=i=>q[i]/10, bx=AX+40, lo=Math.min(F!=null?F:g.min,g.max);
    body=axis+`<line x1="${bx+20}" y1="${yOf(g.min)}" x2="${bx+20}" y2="${yOf(g.max)}" stroke="${K.ink2}" stroke-width="1.2"/><rect x="${bx}" y="${yOf(v(9))}" width="40" height="${(yOf(v(1))-yOf(v(9))).toFixed(1)}" fill="${K.plant}"/>`
      +(F!=null&&g.min<F?`<rect x="${bx-14}" y="${yOf(lo)}" width="12" height="${(yOf(g.min)-yOf(lo)).toFixed(1)}" fill="${K.dcSup}"/>`:'')
      +`<line x1="${bx-4}" y1="${yOf(g.med)}" x2="${bx+44}" y2="${yOf(g.med)}" stroke="${K.ink}" stroke-width="2"/>`;
    const Ls=[{y:yOf(g.max),t:`Highest ${n1(g.max)} m`,s:'lot, our arithmetic'},{y:yOf(g.med),t:`Median ${n1(g.med)} m`,s:g.src},{y:yOf(g.min),t:`Lowest ${n1(g.min)} m`,s:g.cover<100?g.cover+' % of the lot covered':'whole lot covered'}]
      .filter(a=>F==null||Math.abs(a.y-yOf(F))>34);
    body+=Ls.map(a=>`<line x1="${bx+20}" y1="${a.y}" x2="${AX+300}" y2="${a.y}" stroke="${K.ink}" stroke-width="0.5"/><circle cx="${bx+20}" cy="${a.y}" r="2.2" fill="${K.ink}"/><text x="${AX+306}" y="${a.y-2}" font-size="13" font-weight="500" fill="${K.ink}">${a.t}</text><text x="${AX+306}" y="${a.y+13}" font-size="11.5" fill="${K.mute}">${esc(a.s)}</text>`).join('');
    if(F!=null) body+=`<line x1="${AX}" y1="${yOf(F)}" x2="${AX+300}" y2="${yOf(F)}" stroke="${K.ink}" stroke-width="1.6" stroke-dasharray="6 4"/><text x="${AX+306}" y="${yOf(F)-2}" font-size="13" font-weight="500" fill="${K.ink}">Flood construction level ${n1(F)} m</text><text x="${AX+306}" y="${yOf(F)+13}" font-size="11.5" fill="${K.mute}">floor at or above, ${esc(fc.src)}</text>`;
    if(ff){ const bx0=AX+560, bw=240, yy=yOf(topM)+10; share=`<g ${FONT}><text x="${bx0}" y="${yy}" font-size="12" font-weight="500" fill="${K.ink}">Share of the lot below ${n1(F)} m</text><rect x="${bx0}" y="${yy+10}" width="${bw}" height="10" rx="2" fill="${K.hair}"/><rect x="${bx0}" y="${yy+10}" width="${(bw*ff.below/100).toFixed(1)}" height="10" rx="2" fill="${K.dcSup}"/><text x="${bx0}" y="${yy+38}" font-size="13" fill="${K.ink}">${n0(ff.below)} % of the lot</text><text x="${bx0}" y="${yy+53}" font-size="11.5" fill="${K.mute}">a share, not a map</text></g>`; }
  } else body=`<text x="${AX}" y="60" font-size="13" fill="${K.ink}"><tspan fill="${K.red}">?</tspan> no ground data for this lot</text><text x="${AX}" y="76" font-size="11.5" fill="${K.mute}">${esc(g.label||'')}; ${x.city==='edm'?'the elevation tiles are not loaded for this lot':'no points on the lot'}</text>`
    +(van?'':`<text x="${AX+480}" y="60" font-size="13" fill="${K.ink}"><tspan fill="${K.red}">?</tspan> no flood level loaded for Edmonton</text>`);
  const svg=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Ground heights of the lot and the flood construction level on one scale">${body}${share}</svg>`;
  const key=!none&&F!=null&&g.min<F?`<div class="f1c-key"><span><i style="background:${K.plant}"></i>ground, 10th to 90th percentile</span><span><i style="background:${K.dcSup}"></i>lot ground below the flood level</span><span><i class="ln" style="border-color:${K.ink};border-top-style:dashed"></i>flood construction level</span></div>`:'';
  const slabV=ff&&F!=null?Math.max(F,g.min||0):null; /* tool/plan.js entrances: slab = max(flood level, lot minimum) */
  const meters=van&&F!=null&&!none?[slabV!=null?{l:'Ground-floor slab against the flood level',v:slabV,lim:F,max:Math.max(slabV,F)*1.25,unit:'m',pass:slabV>=F-1e-9,cap:`${n1(slabV)} m slab · at least ${n1(F)} m`,src:'VBBL 2025 Div. A 1.4.1.2'}:{l:'Ground-floor slab against the flood level',v:null}]:[];
  const slab=!van?C.q('no flood level loaded for Edmonton'):!fc?C.q():(s.floodD?`at or above ${n1(F)} m (CGVD28 GVRD, our reading)`:'no flood level applies in the tool (lot not in the designated floodplain)');
  const decl=!none?`<table class="f1c-site-ed"><tr><td></td><td>Height, m</td></tr>${[[0,'Lowest'],[1,'10th percentile'],[5,'Median'],[9,'90th percentile'],[10,'Highest']].map(([i,l])=>`<tr><td>${l}</td><td>${n1(q[i]/10)}</td></tr>`).join('')}</table><p>Deciles of the 2 m ground cells inside the lot. A big gap between the lowest and the median means the ground steps or slopes.</p>`:'<p>No ground data for this lot.</p>';
  const miss=[]; if(none) miss.push('ground heights for this lot'); if(!van) miss.push('flood construction level and vertical datum for Edmonton');
  return {draw:svg+key,lead:van?'How high the ground is, and the level the floor must sit above, in metres on one scale: the LiDAR and the flood level share a datum (our reading).':'How high the ground is, and the level the floor must sit above. Edmonton’s ground heights, datum and flood level are not in the tool yet.',
    hero:[{v:none?C.q():n1(g.med),u:none?'':' m',l:'ground, median'},{v:F!=null?n1(F):C.q(),u:F!=null?' m':'',l:'flood construction level'}],
    rows:[['Ground range',none?C.q():`${n1(g.min)}–${n1(g.max)} m`]].concat(van?[['Lot in the floodplain',s.floodD!=null?`${n0(s.floodD)} % of the lot`:C.q()],['Datum, both heights','CGVD28 (GVRD), our reading']]:[['Datum',C.q('not in the tool yet')]]).concat([['Slab needed',slab]]),
    meters,
    more:[['Why the datum matters',`<p>${van?`A height only means something against its datum. The City's LiDAR is in ${esc(g.datum)} and the flood level is in the Greater Vancouver Regional District datum; the tool reads these as the same datum, which is our reading, so the two are drawn on one scale.`:'Edmonton: the datum is not settled and no flood level is loaded, so nothing is compared.'}</p><p>${esc((g.base&&g.base.rule)||'')}</p>`],['Steps where the ground drops',decl]],
    src:[`Ground: ${g.label||'?'} (${g.src||'?'}), per-lot deciles from tiles/${x.city}/g_*.json (tool/make_grade.py, our arithmetic).`,van?`Datum: ${RG.datumSrc||'?'}. ${RG.sameAsFcl||''}.`:`Datum: ${g.datum||'?'}, not settled.`,van&&fc?`Flood construction level: ${fc.rule} (${fc.src}, tool/data/grade.json).`:'Flood level: none loaded for this city.',van?'Share of the lot below the level: read between the stored deciles (site.js gradeInfo), our arithmetic, to about 10 %. Slab: max(flood level, lot minimum), as tool/plan.js sets it at the entrances.':'','Height base (what the by-law measures from) is not settled: the lot grade shown is not the base (?).'].filter(Boolean),missing:miss}; }});

/* ===== A08 Neighbours and views ===== */
C.add(T,'Neighbours and views',{async build(x){
  const r=x.sel.ring; if(!r) return {draw:'<p class="f1v-empty">No lot loaded.</p>'};
  const c=lotC(), W=600, H=600, R=185, {bb,f}=mapFrame(c,R,W,H), blds=[]; const seen=new Set();
  for(const t of tiles(x.city)) for(const b of t.bld||[]){ const k=b.c[0]+':'+b.c[1]; if(seen.has(k)) continue; seen.add(k); const q=C.bbox(b.r); if(C.hit([bb[0]-60,bb[1]-60,bb[2]+60,bb[3]+60],q)) blds.push({b,d:ringRing(r,b.r)}); }
  const bins=[[0,10,'#E9E8E5','under 10 m'],[10,20,'#D6D5D1','10 to 20 m'],[20,1e9,'#BDBCB7','over 20 m']], paths=bins.map(()=>'');
  for(const o of blds){ if(!C.hit(bb,C.bbox(o.b.r))) continue; const i=bins.findIndex(z=>o.b.h>=z[0]&&o.b.h<z[1]); paths[i]+=C.pathOf([o.b.r],f.P); }
  const own=blds.filter(o=>o.d>1), w120=own.filter(o=>o.d<=120), tall=[...w120].sort((a,b)=>b.b.h-a.b.h)[0], nearB=[...own].sort((a,b)=>a.d-b.d)[0];
  /* nearest residential zone: parcels whose zone the tool reads as residential (lotside.json), edge to edge */
  const LS=BD.data.lotside||{}, resid=z=>x.city==='van'?(LS.vanResidential.prefix||[]).some(p=>String(z).trim().startsWith(p)):[...(LS.edmResidential.part2||[]),...(LS.edmResidential.special||[])].includes(String(z).trim().split(/\s+/)[0].toUpperCase());
  let nr=null; for(const t of tiles(x.city)) for(const p of t.par||[]){ const a=t.A[p.id]; if(!a) continue; const z=String(x.city==='van'?a[1]:a[2]||a[1]||'').trim(); if(!z||!resid(z)) continue; const bq=C.bbox(p.r), lb=C.bbox(r); if(nr&&Math.max(bq[0]-lb[2],lb[0]-bq[2],bq[1]-lb[3],lb[1]-bq[3])>nr.d) continue; const d=ringRing(r,p.r); if(!nr||d<nr.d) nr={d,z}; }
  /* named viewpoint (tool/data/viewpoints.json): the tallest building holding the point, as addons.js does it */
  const vl=((BD.data.viewpoints||{}).lots||{})[x.city+':'+x.sel.id]||[], vps=[];
  for(const v of vl){ const [vx,vy]=proj(x.city,v.pt[0],v.pt[1]); let hb=null; for(const t of tiles(x.city)) for(const b of t.bld||[]) if(b.f!==3&&BD.pip(vx,vy,b.r)&&(!hb||b.h>hb.h)) hb=b; vps.push({name:v.name,ask:v.ask,b:hb,d:hb?ringRing(r,hb.r):null}); }
  const cen=b=>{ const [px,py]=f.P(b.c[0],b.c[1]); return [px,py]; }, lc=BD.centroid(r), [lx,ly]=f.P(lc[0],lc[1]);
  /* leaders may cross background buildings but never the lot or another labelled item: each anchor slides along its own outline (centre first, then its corners) to the first point whose horizontal leader crosses none of them */
  const v0=vps.find(v=>v.b), items=[]; if(tall) items.push({ring:tall.b.r,c:cen(tall.b),t:`${n0(tall.b.h)} m tall`,s:`tallest within 120 m · ${m0(tall.d)} away`});
  if(v0&&!(tall&&v0.b===tall.b)) items.push({ring:v0.b.r,c:cen(v0.b),t:v0.name,s:`${n0(v0.b.h)} m tall · ${m0(v0.d)} away`});
  if(nearB&&(!tall||nearB!==tall)&&!(v0&&v0.b===nearB.b)) items.push({ring:nearB.b.r,c:cen(nearB.b),t:`${n0(nearB.b.h)} m tall`,s:`nearest building · ${m0(nearB.d)} away`});
  items.push({ring:r,c:[lx,ly],t:x.addr,s:'the lot'});
  const scr=ring=>{ const o=[]; for(let i=0;i<ring.length;i+=2) o.push(f.P(ring[i],ring[i+1])); return o; };
  const crosses=(y,x0,P)=>{ for(let i=0,j=P.length-1;i<P.length;j=i++){ const [ax,ay]=P[j],[bx,by]=P[i]; if((ay<=y)!==(by<=y)){ const xx=ax+(y-ay)*(bx-ax)/(by-ay); if(xx>x0+0.5&&xx<W) return true; } } return false; };
  items.forEach(it=>it.P=scr(it.ring));
  const anch=[]; for(const it of items){ const others=items.filter(o=>o!==it), cand=[it.c,...it.P.filter(q=>q[0]>=0&&q[0]<=W&&q[1]>14&&q[1]<H-14)];
    const pt=cand.find(q=>!others.some(o=>crosses(q[1],q[0],o.P))); if(pt) anch.push({x:pt[0],y:pt[1],H,t:it.t,s:it.s}); }
  const L=leaders(anch,W,40);
  const svg=`<svg viewBox="0 0 ${W+250} ${H}" width="${W+250}" height="${H}" role="img" aria-label="Buildings around ${esc(x.addr)} shaded by height">
   <defs><clipPath id="f1c-a08"><rect width="${W}" height="${H}"/></clipPath></defs><rect width="${W}" height="${H}" fill="#fff"/><g clip-path="url(#f1c-a08)">${bins.map((b,i)=>`<path d="${paths[i]}" fill="${b[2]}"/>`).join('')}${lotPoly(r,f,0.9)}</g>${L.svg}${north(18,H-48)}${C.scaleBar(18,H-34,50,f.s,'50 m')}</svg>`;
  const key=`<div class="f1c-key">${bins.map(b=>`<span><i style="background:${b[2]};border-color:${b[2]}"></i>${b[3]}</span>`).join('')}<span><i style="background:${K.dcSup}"></i>the lot</span></div>`;
  const est=w120.filter(o=>o.b.hEst).length;
  const tallRow=tall?`${n0(tall.b.h)} m`:C.q('no building within 120 m');
  const miss=['shadow on neighbours (not on this card)','which roof corners and plant a neighbour sees (Visualize cards)'];
  return {draw:svg+key,lead:'What stands around the lot and how tall it is. Plant noise and views are checked against the nearest homes later.',
    hero:[{v:tall?n0(tall.b.h):C.q(),u:tall?' m':'',l:'tallest within 120 m'},nr?{v:m0(nr.d),l:'to the nearest residential zone'}:{v:'none',l:'residential zone in the loaded tiles'}],
    rows:[['Tallest within 120 m',tallRow],['Buildings within 120 m',String(w120.length)],['Nearest residential zone',nr?`${m0(nr.d)} (${esc(nr.z)})`:'none in the loaded tiles'],['Named viewpoint',vps.length?vps.map(v=>v.b?`${v.name}, ${n0(v.b.h)} m tall, ${m0(v.d)} away`:`${v.name} (building not found, ?)`).join('; '):'none listed for this lot']],
    more:[['Named viewpoints',vps.length?vps.map(v=>`<p><b style="font-weight:400">${esc(v.name)}</b><br>${esc(v.ask||'')}</p>`).join(''):'<p>The tool lists named viewpoints for the Edmonton example lot only (tool/data/viewpoints.json). None is listed for this lot.</p>'],['How heights are known',`<p>Building heights come from the City’s 3D building data; ${est?`${est} of the ${w120.length} buildings within 120 m have an estimated height`:'where a height is estimated, the tool flags it'}.</p>`]],
    src:[`Buildings: ${x.city==='van'?'City of Vancouver':'City of Edmonton'} building footprints and heights as loaded in the tool's tiles; distances are edge to edge from the lot outline, our arithmetic.`,'Shading classes (under 10 m, 10 to 20 m, over 20 m) are a drawing choice, not a rule.',`Residential zones (among the tiles loaded): tool/data/lotside.json (${((x.city==='van'?LS.vanResidential:LS.edmResidential).src||[]).join(', ')}), our reading (?); zone of each lot from the tile zone codes.`,vps.length?'Viewpoint: tool/data/viewpoints.json (arch_vp_osmE06): the tallest building holding the point.':'Viewpoints: tool/data/viewpoints.json.'],missing:miss}; }});
})();
