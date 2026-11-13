/* Beyond Data — the Architecture plan set (A section, J.B. 12 Nov 2026: the cards use the report graphics, one drawing style).
   A port of Claude Link reports/plans_fire.py plan(G, st): building only, board palette, circulation white, one outline per room, exit stairs,
   2 h separations hub to data centre, every door with its leaf and swing, exterior exits with an arrow and their width, major dimensions.
   G is the board-shaped geometry hub.js builds (L.G: S per storey, D doors [st, a, b, u, v, 'h'|'v', width?]).
   Differences from the Python: the dimension break points come from this layout's stairs and corridors (the board script lists 339's by hand);
   the street label names the lot's front street when the tool knows it; room numbers come from the card's schedule (num(room)). */
(function(){
'use strict';
const BD=window.BD;
const INK='#18191B', INK2='#45464A', MUTE='#6B6A66', FONT="'IBM Plex Sans', system-ui, sans-serif";   /* graphics_std.py tokens */
const BOARD_COL={hall:'#B9CCE1',sup:'#E2EAF3',load:'#E2EAF3',pub:'#E7D9BF',clin:'#C1E0DA',circ:'#FFFFFF',plant:'#E6E4E0',spare:'#F4F4F4'};
const HUB=new Set(['pub','clin','circ']), DCG=new Set(['hall','sup','load','spare']), HUB_IDS=new Set(['pmec']);
const CIRC=/corridor|lobby|passage|vestibule|\blift\b/i;
const isCirc=rm=>!(rm.stair||/shaft/i.test(rm.n))&&(rm.g==='circ'||CIRC.test(rm.n));
const side=rm=>HUB_IDS.has(rm.id)?'hub':HUB.has(rm.g)?'hub':DCG.has(rm.g)?'dc':null;
const f1=x=>x.toFixed(1), E=1e-6;
function shared(a,b){ const out=[];
  for(const x of [a[0],a[1]]) if(Math.abs(x-b[0])<E||Math.abs(x-b[1])<E){ const lo=Math.max(a[2],b[2]), hi=Math.min(a[3],b[3]); if(hi-lo>E) out.push([[x,lo],[x,hi]]); }
  for(const y of [a[2],a[3]]) if(Math.abs(y-b[2])<E||Math.abs(y-b[3])<E){ const lo=Math.max(a[0],b[0]), hi=Math.min(a[1],b[1]); if(hi-lo>E) out.push([[lo,y],[hi,y]]); }
  return out; }
function roomEdges(rects){ const out=[];
  for(const r of rects){ const [u0,u1,v0,v1]=r;
    for(const [fixed,lo,hi,axis,sd] of [[u0,v0,v1,'u',0],[u1,v0,v1,'u',1],[v0,u0,u1,'v',0],[v1,u0,u1,'v',1]]){ let segs=[[lo,hi]];
      for(const q of rects){ if(q===r) continue; let c0,c1;
        if(axis==='u'&&Math.abs((sd===0?q[1]:q[0])-fixed)<E){ c0=q[2]; c1=q[3]; } else if(axis==='v'&&Math.abs((sd===0?q[3]:q[2])-fixed)<E){ c0=q[0]; c1=q[1]; } else continue;
        const nx=[]; for(const [s0,s1] of segs){ if(c1<=s0||c0>=s1){ nx.push([s0,s1]); continue; } if(c0>s0) nx.push([s0,c0]); if(c1<s1) nx.push([c1,s1]); } segs=nx; }
      for(const [s0,s1] of segs) if(s1-s0>E) out.push(axis==='u'?[[fixed,s0],[fixed,s1]]:[[s0,fixed],[s1,fixed]]); } }
  return out; }
function seps(rooms){ const s=[]; for(const a of rooms) for(const b of rooms) if(side(a)==='hub'&&side(b)==='dc') for(const ra of a.r) for(const rb of b.r) s.push(...shared(ra,rb)); return s; }
/* break points for the dimension strings: the building's ends and the faces of stairs and corridors, at least 2.5 m apart */
function breaks(rooms,ax,lo,hi){ const v=[lo,hi]; for(const rm of rooms) if(rm.stair||/corridor/i.test(rm.n)) for(const r of rm.r){ v.push(ax?r[2]:r[0],ax?r[3]:r[1]); }
  const s=[...new Set(v.map(x=>Math.round(x*10)/10))].filter(x=>x>=lo-E&&x<=hi+E).sort((a,b)=>a-b), out=[];
  for(const x of s){ if(!out.length||x-out[out.length-1]>=2.5||x===s[s.length-1]){ if(out.length&&x===s[s.length-1]&&x-out[out.length-1]<2.5) out.pop(); out.push(x); } }
  return out; }
function plan(G,st,o){ o=o||{}; const w=o.w||704, rooms=(G.S[st]||G.S[String(st)]||[]); if(!rooms.length) return null;
  const rs=rooms.flatMap(rm=>rm.r), U0=Math.min(...rs.map(r=>r[0])), U1=Math.max(...rs.map(r=>r[1])), V0=Math.min(...rs.map(r=>r[2])), V1=Math.max(...rs.map(r=>r[3]));
  const padL=150,padT=128,padR=30,padB=96, k=(w-padL-padR)/(U1-U0), hgt=padT+(V1-V0)*k+padB, X=u=>padL+(u-U0)*k, Y=v=>padT+(V1-v)*k, id='pf'+st+Math.random().toString(36).slice(2,6);
  const out=[`<svg width="${w}" height="${hgt.toFixed(0)}" viewBox="0 0 ${w} ${hgt.toFixed(0)}" font-family="${FONT}" role="img" aria-label="Storey ${st}: fire separations, exits and dimensions">`,
    `<defs><pattern id="${id}s" width="4" height="4" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="4" y2="0" stroke="${INK2}" stroke-width="0.5" stroke-opacity="0.5"/></pattern></defs>`];
  const rect=(r,fill,extra)=>`<rect x="${f1(X(r[0]))}" y="${f1(Y(r[3]))}" width="${f1((r[1]-r[0])*k)}" height="${f1((r[3]-r[2])*k)}" fill="${fill}" ${extra||''}/>`;
  for(const rm of rooms){ const col=isCirc(rm)?'#FFFFFF':(BOARD_COL[rm.g]||'#FFFFFF'); for(const r of rm.r) out.push(rect(r,col,`stroke="${col}" stroke-width="0.6"`)); }
  for(const rm of rooms) if(rm.stair) for(const r of rm.r) out.push(rect(r,`url(#${id}s)`,`stroke="${INK}" stroke-width="1.6"`));
  for(const rm of rooms) for(const [a,b] of roomEdges(rm.r)) out.push(`<line x1="${f1(X(a[0]))}" y1="${f1(Y(a[1]))}" x2="${f1(X(b[0]))}" y2="${f1(Y(b[1]))}" stroke="#16181B" stroke-width="0.8"/>`);
  out.push(`<rect x="${f1(X(U0))}" y="${f1(Y(V1))}" width="${f1((U1-U0)*k)}" height="${f1((V1-V0)*k)}" fill="none" stroke="#16181B" stroke-width="1.8"/>`);
  let L2=0; if(o.seps!==false) for(const [a,b] of seps(rooms)){ L2+=Math.abs(b[0]-a[0])+Math.abs(b[1]-a[1]); out.push(`<line x1="${f1(X(a[0]))}" y1="${f1(Y(a[1]))}" x2="${f1(X(b[0]))}" y2="${f1(Y(b[1]))}" stroke="${INK}" stroke-width="3" stroke-dasharray="7 3"/>`); }
  rooms.forEach((rm,i)=>{ const n=o.num?o.num(rm,i):i+1; if(n==null) return; const r=rm.r.reduce((a,b)=>(b[1]-b[0])*(b[3]-b[2])>(a[1]-a[0])*(a[3]-a[2])?b:a,rm.r[0]); const fs=Math.min(r[1]-r[0],r[3]-r[2])*k>22?10:8;
    out.push(`<text x="${f1(X((r[0]+r[1])/2))}" y="${f1(Y((r[2]+r[3])/2)+3.5)}" font-size="${fs}" fill="${INK}" text-anchor="middle">${n}</text>`); });
  /* doors: the leaf and its swing; out of the building for exits, into the stair for stair doors, else into the first room */
  const stairs=new Set(rooms.filter(rm=>rm.stair).map(rm=>rm.id)), byid=new Map(rooms.map(rm=>[rm.id,rm]));
  const centre=rid=>{ const rm=byid.get(rid); if(!rm) return null; const r=rm.r.reduce((a,b)=>(b[1]-b[0])*(b[3]-b[2])>(a[1]-a[0])*(a[3]-a[2])?b:a,rm.r[0]); return [(r[0]+r[1])/2,(r[2]+r[3])/2]; };
  let nDoor=0, nOut=0;
  if(o.doors!==false) for(const d of (G.D||[])){ if(+d[0]!==+st) continue; const sid=d[1], oth=d[2], u=d[3], v=d[4], ori=d[5], dw=d.length>6&&d[6]?d[6]:(G.DOOR_W||0.9);
    const x=X(u), y=Y(v), half=dw*k/2; let sgn;
    if(oth==='OUT') sgn=ori==='h'?(v<(V0+V1)/2?-1:1):(u<(U0+U1)/2?-1:1);
    else { const into=stairs.has(oth)?oth:(byid.has(sid)?sid:oth), c=centre(into); if(!c) continue; sgn=ori==='h'?(c[1]>v?1:-1):(c[0]>u?1:-1); }
    nDoor++;
    if(ori==='h'){ out.push(`<line x1="${f1(x-half)}" y1="${f1(y)}" x2="${f1(x+half)}" y2="${f1(y)}" stroke="#FFFFFF" stroke-width="3"/>`); const hx=x-half, hy=y, ex=hx, ey=y-sgn*dw*k;
      out.push(`<line x1="${f1(hx)}" y1="${f1(hy)}" x2="${f1(ex)}" y2="${f1(ey)}" stroke="${INK}" stroke-width="0.9"/><path d="M${f1(ex)},${f1(ey)} A${f1(dw*k)},${f1(dw*k)} 0 0 ${sgn>0?1:0} ${f1(x+half)},${f1(y)}" fill="none" stroke="${INK}" stroke-width="0.5" stroke-dasharray="2 1.5"/>`); }
    else { out.push(`<line x1="${f1(x)}" y1="${f1(y-half)}" x2="${f1(x)}" y2="${f1(y+half)}" stroke="#FFFFFF" stroke-width="3"/>`); const hx=x, hy=y+half, ex=x+sgn*dw*k, ey=hy;
      out.push(`<line x1="${f1(hx)}" y1="${f1(hy)}" x2="${f1(ex)}" y2="${f1(ey)}" stroke="${INK}" stroke-width="0.9"/><path d="M${f1(ex)},${f1(ey)} A${f1(dw*k)},${f1(dw*k)} 0 0 ${sgn>0?0:1} ${f1(x)},${f1(y-half)}" fill="none" stroke="${INK}" stroke-width="0.5" stroke-dasharray="2 1.5"/>`); }
    if(oth==='OUT'){ nOut++; const [dx,dy]=ori==='h'?[0,Math.abs(v-V0)<Math.abs(v-V1)?1:-1]:[Math.abs(u-U0)<Math.abs(u-U1)?-1:1,0], off=dw*k+6, sx=x+dx*off, sy=y+dy*off;
      const tip=[sx+dx*12,sy+dy*12], b1=[sx+dx*5-dy*4,sy+dy*5-dx*4], b2=[sx+dx*5+dy*4,sy+dy*5+dx*4];
      out.push(`<line x1="${f1(sx)}" y1="${f1(sy)}" x2="${f1(tip[0])}" y2="${f1(tip[1])}" stroke="${INK}" stroke-width="1.2"/><polygon points="${f1(tip[0])},${f1(tip[1])} ${f1(b1[0])},${f1(b1[1])} ${f1(b2[0])},${f1(b2[1])}" fill="${INK}"/>`);
      if(dw>1.0){ const [tx,ty,anc]=dx===0?[tip[0]+6,(sy+tip[1])/2+3,'start']:[(sx+tip[0])/2,sy-6,'middle']; out.push(`<text x="${f1(tx)}" y="${f1(ty)}" font-size="8.5" fill="${INK2}" text-anchor="${anc}">${dw.toFixed(1)} m</text>`); } } }
  /* dimensions: overall, then the stair and corridor faces */
  const tick=(x,y)=>`<line x1="${f1(x-3)}" y1="${f1(y+3)}" x2="${f1(x+3)}" y2="${f1(y-3)}" stroke="${INK}" stroke-width="0.8"/>`;
  for(const [row,pts] of [[padT-112,[U0,U1]],[padT-94,breaks(rooms,0,U0,U1)]]){ out.push(`<line x1="${f1(X(pts[0]))}" y1="${row}" x2="${f1(X(pts[pts.length-1]))}" y2="${row}" stroke="${INK}" stroke-width="0.5"/>`);
    for(let i=0;i+1<pts.length;i++){ const a=pts[i], b=pts[i+1]; out.push(tick(X(a),row),tick(X(b),row)); if((b-a)*k>18) out.push(`<text x="${f1((X(a)+X(b))/2)}" y="${row-4}" font-size="9" fill="${INK}" text-anchor="middle">${(b-a).toFixed(1)}</text>`); } }
  for(const [col,pts] of [[padL-134,[V0,V1]],[padL-112,breaks(rooms,1,V0,V1)]]){ out.push(`<line x1="${col}" y1="${f1(Y(pts[0]))}" x2="${col}" y2="${f1(Y(pts[pts.length-1]))}" stroke="${INK}" stroke-width="0.5"/>`);
    for(let i=0;i+1<pts.length;i++){ const a=pts[i], b=pts[i+1]; out.push(tick(col,Y(a)),tick(col,Y(b))); if((b-a)*k>18){ const cy=(Y(a)+Y(b))/2; out.push(`<text x="${col-4}" y="${f1(cy)}" font-size="9" fill="${INK}" text-anchor="middle" transform="rotate(-90 ${col-4} ${f1(cy)})">${(b-a).toFixed(1)}</text>`); } } }
  if(o.street) out.push(`<text x="${padL-140}" y="${(hgt-14).toFixed(0)}" font-size="9.5" fill="${INK2}">${o.street} ←</text>`);
  const sb=10*k; out.push(`<line x1="${f1(w-padR-sb)}" y1="${(hgt-16).toFixed(0)}" x2="${w-padR}" y2="${(hgt-16).toFixed(0)}" stroke="${INK}" stroke-width="1.4"/><text x="${f1(w-padR-sb-6)}" y="${(hgt-12).toFixed(0)}" font-size="9.5" fill="${MUTE}" text-anchor="end">10 m</text>`);
  out.push('</svg>');
  return {svg:out.join(''),sepM:Math.round(L2*10)/10,doors:nDoor,exits:nOut}; }
function legend(){ const sw=inner=>`<svg width="26" height="12" style="vertical-align:-2px;margin-right:6px" aria-hidden="true">${inner}</svg>`;
  const items=[[sw(`<line x1="1" y1="6" x2="25" y2="6" stroke="${INK}" stroke-width="3" stroke-dasharray="7 3"/>`),'2 h fire separation, hub to data centre'],
    [sw(`<rect x="1" y="1" width="24" height="10" fill="#fff" stroke="${INK}" stroke-width="1.6"/><line x1="1" y1="4" x2="25" y2="4" stroke="${INK2}" stroke-width="0.5" stroke-opacity="0.5"/><line x1="1" y1="8" x2="25" y2="8" stroke="${INK2}" stroke-width="0.5" stroke-opacity="0.5"/>`),'exit stair, fire-separated'],
    [sw(`<line x1="3" y1="11" x2="3" y2="1" stroke="${INK}" stroke-width="0.9"/><path d="M3,1 A10,10 0 0 1 13,11" fill="none" stroke="${INK}" stroke-width="0.5" stroke-dasharray="2 1.5"/><line x1="0" y1="11" x2="26" y2="11" stroke="#16181B" stroke-width="0.8"/>`),'door and its swing'],
    [sw(`<line x1="2" y1="6" x2="18" y2="6" stroke="${INK}" stroke-width="1.2"/><polygon points="24,6 16,2 16,10" fill="${INK}"/>`),'exterior exit (door width if wider than 0.9 m)'],
    [sw(`<line x1="1" y1="9" x2="25" y2="9" stroke="${INK}" stroke-width="0.5"/><line x1="0" y1="12" x2="4" y2="6" stroke="${INK}" stroke-width="0.8"/><line x1="22" y1="12" x2="26" y2="6" stroke="${INK}" stroke-width="0.8"/>`),'dimensions in metres, to wall centrelines'],
    [sw(`<rect x="1" y="1" width="11" height="10" fill="${BOARD_COL.hall}"/><rect x="13" y="1" width="12" height="10" fill="${BOARD_COL.sup}"/>`),'data hall · data-centre support'],
    [sw(`<rect x="1" y="1" width="11" height="10" fill="${BOARD_COL.pub}"/><rect x="13" y="1" width="12" height="10" fill="${BOARD_COL.clin}"/>`),'public program · clinic'],
    [sw(`<rect x="1" y="1" width="24" height="10" fill="#fff" stroke="#16181B" stroke-width="0.8"/>`),'corridors and circulation']];
  return `<div style="display:flex;flex-wrap:wrap;gap:4px 18px;font-size:10.5px;color:${INK2};margin:6px 0">${items.map(([a,b])=>`<span style="white-space:nowrap">${a}${b}</span>`).join('')}</div>`; }
/* A18 Heat flow (port of reports/report_arch.py p_energy): the hall's heat splits; a heat pump lifts a small share for the hub rooms AND the data
   centre's own staff rooms; the rest is "for neighbours" (potential external receivers), not "to the air". Heat need = floor area × CEUD 2023 heating
   intensity (register receiver_demand: BC 0.57, health care 1.096; Alberta 1.40, 2.348 GJ/m²). Hall heat = the servers' energy at 40–60 % load
   (MW × 8,760 h × load; engine.js R.lfR). COP 3–4.5 (register cop). Seasons and the 3.16 peak ratio: Vancouver only (report p5: CWEC; degree days). */
const ACC=new Set(['dock','ves','dcor','noc','doff','brk','dwc','jan','ship']);
const PUBT='#E1EBDF', PUB='#5E8C61', DC='#3366A3', DCT='#DCE4EF', PLANT='#8A8985', PLANTT='#ECEBE7', HEATC='#C9772B', HEATT='#F4E3CF';
function energy(L,city){ const G=L&&L.G; if(!G) return null; const R=BD.eng&&BD.eng.R; if(!R) return null;
  const ra=rm=>rm.r.reduce((t,r)=>t+(r[1]-r[0])*(r[3]-r[2]),0), I=city==='edm'?{pub:1.40,circ:1.40,clin:2.348}:{pub:0.57,circ:0.57,clin:1.096};
  let gj=0, acc=0; for(const st in G.S) for(const rm of G.S[st]){ if(I[rm.g]!=null) gj+=ra(rm)*I[rm.g]; if(ACC.has(rm.id)) acc+=ra(rm); }
  const dem=gj/3.6+acc*I.pub/3.6, cop=R.cop||[3,4.5], hp=[dem/cop[1],dem/cop[0]], fromDc=[dem-hp[1],dem-hp[0]], mw=L.MW;
  const av=[mw*8760*R.lfR[0],mw*8760*R.lfR[1]]   /* the servers' energy, all of it heat in the hall (engine.js R.lfR, register load_factor) */, share=[fromDc[0]/av[1]*100,fromDc[1]/av[0]*100], peak=city==='van'?dem/8760*3.16*1000:null;
  return {dem,acc,hp,fromDc,av,share,peak,mw,cop}; }
function energySvg(E,city){ const n0=x=>Math.round(x).toLocaleString('en-CA'), W=704, s=[];
  s.push(`<svg width="${W}" height="330" viewBox="0 0 ${W} 330" font-family="${FONT}" role="img" aria-label="Where the data hall’s heat goes in a year">`);
  s.push(`<rect x="0" y="30" width="120" height="226" fill="#BCCDE4"/><text x="8" y="52" font-size="13" font-weight="500" fill="${INK}">Data hall</text><text x="8" y="70" font-size="11" fill="${INK2}">${E.mw.toFixed(2)} MW of servers</text><text x="8" y="196" font-size="11" fill="${INK2}">heat, all year:</text><text x="8" y="214" font-size="12.5" fill="${INK}">${n0(E.av[0])}–${n0(E.av[1])}</text><text x="8" y="227" font-size="10.5" fill="${INK2}">MWh/yr</text>`);
  s.push(`<path d="M120,30 C220,30 250,30 330,30 L330,200 C250,200 220,200 120,200 Z" fill="${PLANTT}"/><rect x="330" y="30" width="134" height="170" fill="${PLANTT}" stroke="${PLANT}" stroke-width="0.6"/>`);
  s.push(`<text x="340" y="50" font-size="12.5" font-weight="500" fill="${INK}">For neighbours</text><text x="340" y="66" font-size="10.5" fill="${INK2}">potential external</text><text x="340" y="80" font-size="10.5" fill="${INK2}">receivers (Engineering)</text><text x="340" y="156" font-size="15" fill="${INK}">${(100-E.share[1]).toFixed(1)}–${(100-E.share[0]).toFixed(1)} %</text><text x="340" y="170" font-size="10.5" fill="${INK2}">of the hall’s heat; until</text><text x="340" y="183" font-size="10.5" fill="${INK2}">used, the chillers reject it</text>`);
  s.push(`<path d="M120,226 C190,226 200,256 250,256 L250,266 C200,266 190,236 120,236 Z" fill="${HEATC}"/><text x="128" y="276" font-size="10.5" fill="${HEATC}">warm water 20–25 °C</text>`);
  s.push(`<rect x="250" y="236" width="146" height="50" fill="${HEATT}" stroke="${HEATC}" stroke-width="0.8"/><text x="258" y="256" font-size="12.5" font-weight="500" fill="${INK}">Heat pump</text><text x="258" y="273" font-size="10.5" fill="${INK2}">COP ${E.cop[0]}–${E.cop[1]}${E.peak?` · ${n0(E.peak)} kW peak`:' · peak ?'}</text>`);
  s.push(`<path d="M310,236 L310,222" stroke="${INK2}" stroke-width="1.2"/><polygon points="306,224 314,224 310,232" fill="${INK2}"/><text x="318" y="226" font-size="10.5" fill="${INK2}">+ ${n0(E.hp[0])}–${n0(E.hp[1])} MWh/yr electricity</text>`);
  s.push(`<path d="M396,256 L500,256 L500,266 L396,266 Z" fill="${HEATC}"/><text x="404" y="282" font-size="10.5" fill="${HEATC}">hot water 60–70 °C</text>`);
  s.push(`<path d="M500,256 C520,256 520,232 540,232 L540,238 C526,238 526,262 506,262 Z" fill="${HEATC}"/><polygon points="540,226 552,235 540,244" fill="${HEATC}"/><path d="M500,262 C520,262 520,290 540,290 L540,296 C526,296 524,266 500,266 Z" fill="${HEATC}"/><polygon points="540,284 552,293 540,302" fill="${HEATC}"/>`);
  s.push(`<rect x="556" y="206" width="148" height="56" fill="${PUBT}" stroke="${PUB}" stroke-width="0.8"/><text x="564" y="224" font-size="12" font-weight="500" fill="${INK}">Hub rooms</text><text x="564" y="239" font-size="10.5" fill="${INK2}">refuge, shelter, clinic, lobby</text>`);
  s.push(`<rect x="556" y="268" width="148" height="56" fill="${DCT}" stroke="${DC}" stroke-width="0.8"/><text x="564" y="286" font-size="12" font-weight="500" fill="${INK}">Data-centre staff rooms</text><text x="564" y="301" font-size="10.5" fill="${INK2}">offices, NOC, staging, ${n0(E.acc)} m²</text>`);
  s.push(`<text x="404" y="300" font-size="10.5" fill="${INK2}">together ${E.share[0].toFixed(1)}–${E.share[1].toFixed(1)} %</text><text x="404" y="313" font-size="10.5" fill="${INK2}">of the hall’s heat</text>`);
  [['1','The servers turn their power into heat, all year.'],['2','A heat pump lifts a small share to building temperature for the hub and the data centre’s own staff rooms.'],['3','The rest is for neighbours (see the Engineering report). Until one connects, the chillers reject it to the air.']].forEach(([n,t],i)=>{ const y=30+i*52;
    s.push(`<circle cx="490" cy="${y+6}" r="9" fill="none" stroke="${INK}" stroke-width="0.8"/><text x="490" y="${y+10}" font-size="10.5" fill="${INK}" text-anchor="middle">${n}</text><foreignObject x="506" y="${y-4}" width="198" height="52"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size:11px;line-height:1.35;color:${INK2};font-family:${FONT}">${t}</div></foreignObject>`); });
  s.push('</svg>');
  let s2='';
  if(city==='van'){ const seas=[['Winter (Dec–Feb)',47.0],['Spring and fall',50.5],['Summer (Jun–Aug)',2.5]]; s2=`<svg width="${W}" height="150" viewBox="0 0 ${W} 150" font-family="${FONT}" role="img" aria-label="When the hub needs heat">`;
    seas.forEach(([t,v],i)=>{ const y=18+i*40; s2+=`<text x="0" y="${y+14}" font-size="12" fill="${INK}">${t}</text><rect x="150" y="${y}" width="${(v/50.5*300).toFixed(0)}" height="20" fill="${HEATC}"/><text x="${(150+v/50.5*300+8).toFixed(0)}" y="${y+15}" font-size="11.5" fill="${INK2}">${v.toFixed(1)} % · about ${n0(E.dem*v/100)} MWh</text><rect x="150" y="${y+22}" width="${(25/100*380*4/1.98).toFixed(0)}" height="4" fill="#BCCDE4"/>`; });
    s2+=`<text x="0" y="142" font-size="10.5" fill="${MUTE}">Orange: the building’s heat need (hub and staff rooms). Thin blue: the data centre’s heat, nearly flat all year (a quarter of it each season).</text></svg>`; }
  return {svg:s.join(''),seasons:s2}; }
/* A09 Typology, A11 Principle, A19 Program diagram (port of reports/typology_page.py: exploded(), mode_panel(), page_body()): the storeys pulled apart,
   rooms in big-picture colours, seen from the street; the two modes; why pair them; the program models (tool/f1/icons/hub_mix.svg, board Story_TypologyMixes). */
const BIG={hall:'#BCCDE4',sup:'#BCCDE4',load:'#BCCDE4',pub:'#CFE0CB',clin:'#CFE0CB',circ:'#FFFFFF',plant:'#DCDBD6',spare:'#F4F4F2'}, RULE='#DAD9D5';
const C30=Math.cos(Math.PI/6), S30=0.5, iso=(x,y,z,ox,oy,k)=>[ox+(x-y)*C30*k, oy+(x+y)*S30*k-z*k];
const ply=(pts,fill,stroke,sw,dash)=>`<polygon points="${pts.map(q=>q[0].toFixed(1)+','+q[1].toFixed(1)).join(' ')}" fill="${fill}" stroke="${stroke||INK}" stroke-width="${sw==null?0.9:sw}" stroke-linejoin="round"${dash?` stroke-dasharray="${dash}"`:''}/>`;
function exploded(L,W,H){ W=W||400; H=H||236; const G=L.G, S=G.S, sts=Object.keys(S).map(Number).sort((a,b)=>a-b), gap=15, zs={}; sts.forEach(st=>zs[st]=(st-1)*gap);
  const allr=sts.flatMap(st=>S[st].flatMap(rm=>rm.r)), U0=Math.min(...allr.map(r=>r[0])), U1=Math.max(...allr.map(r=>r[1])), V0=Math.min(...allr.map(r=>r[2])), V1=Math.max(...allr.map(r=>r[3]));
  const plant=((L.plant&&L.plant.items)||[]).filter(it=>!it.roof&&it.r);
  const P=(u,v,z,ox,oy,k)=>iso(-u,-v,z,ox,oy,k), uMax=Math.max(U1,...plant.map(it=>it.r[1]));
  const pts=[]; for(const u of [U0,uMax]) for(const v of [V0,V1]) for(const z of [0,zs[sts[sts.length-1]]+1]) pts.push(P(u,v,z,0,0,1));
  const bx0=Math.min(...pts.map(q=>q[0])), bx1=Math.max(...pts.map(q=>q[0])), by0=Math.min(...pts.map(q=>q[1])), by1=Math.max(...pts.map(q=>q[1]));
  const k=Math.min((W-20)/(bx1-bx0),(H-20)/(by1-by0)), ox=10-bx0*k, oy=10-by0*k, Q=(u,v,z)=>P(u,v,z,ox,oy,k);
  const o=[`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="${FONT}" role="img" aria-label="The building pulled apart by storey">`];
  for(const it of plant){ const r=it.r; o.push(ply([Q(r[0],r[2],0),Q(r[1],r[2],0),Q(r[1],r[3],0),Q(r[0],r[3],0)],BIG.plant,PLANT,0.4)); }
  for(const st of sts){ const z=zs[st], th=0.9;
    o.push(ply([Q(U0,V0,z-th),Q(U1,V0,z-th),Q(U1,V0,z),Q(U0,V0,z)],'#E9E8E4',INK2,0.4), ply([Q(U0,V0,z-th),Q(U0,V1,z-th),Q(U0,V1,z),Q(U0,V0,z)],'#DDDCD8',INK2,0.4), ply([Q(U0,V0,z),Q(U1,V0,z),Q(U1,V1,z),Q(U0,V1,z)],'#FFFFFF',INK,0.6));
    for(const rm of S[st]){ const col=BIG[rm.g]||'#FFFFFF'; for(const r of rm.r) o.push(ply([Q(r[0],r[2],z),Q(r[1],r[2],z),Q(r[1],r[3],z),Q(r[0],r[3],z)],col,col,0.5)); }
    o.push(ply([Q(U0,V0,z),Q(U1,V0,z),Q(U1,V1,z),Q(U0,V1,z)],'none',INK,0.7));
    if(st>sts[0]) for(const [u,v] of [[U0,V0],[U1,V0],[U0,V1]]){ const a=Q(u,v,zs[st-1]), b=Q(u,v,z-th); o.push(`<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${MUTE}" stroke-width="0.4" stroke-dasharray="2 2"/>`); } }
  o.push('</svg>'); return o.join(''); }
function storeyLabels(L){ const S=L.G.S, sts=Object.keys(S).map(Number).sort((a,b)=>b-a), names=L.storeyNames||[], out=[];
  const what=st=>{ const g=new Set(S[st].map(rm=>rm.g)); return g.has('hall')?['Data hall',`${L.MW.toFixed(2)} MW of servers; nothing above it`,DC]:g.has('clin')?['Clinic + data-centre support','the clinic over the refuge; a 2 h floor between',PUB]:['Refuge, day shelter, lobby','on the street, step-free; loading behind',PUB]; };
  for(const st of sts){ const [b,d,c]=what(st); out.push([`Storey ${st}`,b,names[st-1]&&!/Hub at grade/.test(names[st-1])?d:d,c]); }
  out.push(['Yard','Plant','generators, transformers, chillers at grade',PLANT]);
  return out.map(([a,b,d,c])=>`<div style="border-left:3px solid ${c};padding:2px 0 2px 10px"><div style="font-size:10.5px;letter-spacing:0.08em;color:${MUTE}">${a.toUpperCase()}</div><div style="font-size:13.5px;color:${INK}">${b}</div><div style="font-size:11px;color:${INK2}">${d}</div></div>`).join(''); }
const modePanel=(title,sub,rows,accent)=>`<div style="border:1px solid ${RULE};border-top:3px solid ${accent};padding:10px 12px"><div style="font-size:14px;color:${INK}">${title}</div><div style="font-size:11px;color:${MUTE};margin-bottom:6px">${sub}</div>${rows.map(([c,t])=>`<div style="display:grid;grid-template-columns:10px 1fr;gap:8px;align-items:start;padding:4px 0;border-top:1px solid ${RULE}"><span style="width:8px;height:8px;margin-top:5px;background:${c};border-radius:50%"></span><span style="font-size:11.5px;line-height:1.4;color:${INK2}">${t}</span></div>`).join('')}</div>`;
function modes(L,people,exams){ return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">${modePanel('Every day','grid on, data centre at work',[[PUB,exams?`Clinic open: primary care, ${exams} exam rooms upstairs.`:'No clinic on this lot (dropped by the program ladder).'],[PUB,'Day shelter: warmth and washrooms for 16 guests.'],[DC,'Data hall on grid power; its heat warms the building.']],PUB)}${modePanel('In an emergency','heat dome, wildfire smoke, deep cold, or an outage',[[PUB,`Refuge opens: ${people!=null?people+' people (at least 50)':'at least 50 people'}, filtered air.`],[DC,'Hub on its own generator 72 h; data centre 12 h.'],[PUB,exams?'Clinic and shelter stay lit and heated.':'Shelter stays lit and heated.']],DC)}</div>`; }
const WHY=[['Cities need places that stay on','Heat, smoke, cold and outages: refuges need power, clean air and staff for days.'],['Data centres already have it','Standby power, filtered air, security, 24-hour staff, and spare heat.'],['So the building gives back','The data centre hosts; the city gets a refuge, shelter and clinic.']];
const why=()=>`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">${WHY.map(([t,d],i)=>`<div style="display:grid;grid-template-columns:22px 1fr;gap:8px"><span style="font-size:18px;font-weight:300;color:${MUTE};line-height:1">${i+1}</span><div><div style="font-size:13px;color:${INK}">${t}</div><div style="font-size:11.5px;line-height:1.45;color:${INK2}">${d}</div></div></div>`).join('')}</div>`;
const shares=share=>[['Backup power',DC,'Generators keep the public rooms running when the grid fails.'],['Heat',HEATC,`Server heat warms the building${share?` (${share})`:''}; the rest is offered to neighbours.`],['A staffed, secure building',INK2,'Open 24 hours, with a shared lobby and loading.']].map(([t,c,d])=>`<div style="border-left:3px solid ${c};padding-left:10px"><div style="font-size:13px;color:${INK}">${t}</div><div style="font-size:11px;line-height:1.4;color:${INK2}">${d}</div></div>`).join('');
const icons=w=>`<img src="f1/icons/hub_mix.svg" width="${w||440}" alt="The program: data centre, refuge, warming shelter, clinic">`;
const secT=t=>`<div style="font-size:12px;font-weight:500;letter-spacing:0.08em;color:${MUTE};text-transform:uppercase;margin:14px 0 6px">${t}</div>`;
/* 3-D massing (port of reports/massing_ctx.py): the hub on its lot among its neighbours, seen from the street, big-picture colours only, clean faces.
   Neighbours: City of Vancouver LiDAR 2022 outlines and heights (tool/tiles/van/lid_<key>.json); Edmonton: the City footprints the tool holds. Buildings
   standing on the lot are left out. Frames: world → the site model's lot frame (F.toL) → the hub's layout frame (L.fromUV). */
const shade=(hex,f)=>{ const n=parseInt(hex.slice(1),16), c=[n>>16&255,n>>8&255,n&255].map(v=>Math.round(v*f)); return '#'+c.map(v=>v.toString(16).padStart(2,'0')).join(''); };
const LIDC={};
async function lidarNear(x0,y0,x1,y1){ let m=null; try{ m=await BD.getJSON('tiles/van/meta.json'); }catch(e){ return []; } const out=[];
  for(let i=Math.floor(x0/m.T);i<=Math.floor(x1/m.T);i++) for(let j=Math.floor(y0/m.T);j<=Math.floor(y1/m.T);j++){ const k=i+'_'+j; if(LIDC[k]===undefined){ try{ LIDC[k]=(await BD.getJSON(`tiles/van/lid_${k}.json`)).B; }catch(e){ LIDC[k]=null; } } if(LIDC[k]) out.push(...LIDC[k]); }
  return out; }
function outerEdges(rects){ const out=[];   /* the outline of a set of rects with outward normals (edges not shared between them) */
  for(const r of rects){ const [u0,u1,v0,v1]=r;
    for(const [fixed,lo,hi,axis,sd,n] of [[u0,v0,v1,'u',0,[-1,0]],[u1,v0,v1,'u',1,[1,0]],[v0,u0,u1,'v',0,[0,-1]],[v1,u0,u1,'v',1,[0,1]]]){ let segs=[[lo,hi]];
      for(const q of rects){ if(q===r) continue; let c0,c1;
        if(axis==='u'&&Math.abs((sd===0?q[1]:q[0])-fixed)<1e-6){ c0=q[2]; c1=q[3]; } else if(axis==='v'&&Math.abs((sd===0?q[3]:q[2])-fixed)<1e-6){ c0=q[0]; c1=q[1]; } else continue;
        const nx=[]; for(const [s0,s1] of segs){ if(c1<=s0||c0>=s1){ nx.push([s0,s1]); continue; } if(c0>s0) nx.push([s0,c0]); if(c1<s1) nx.push([c1,s1]); } segs=nx; }
      for(const [s0,s1] of segs) if(s1-s0>1e-6) out.push(axis==='u'?{a:[fixed,s0],b:[fixed,s1],n}:{a:[s0,fixed],b:[s1,fixed],n}); } }
  return out; }
async function massing(x,P,L,o){ o=o||{}; const W=o.W||760, Hh=o.H||540, M=P.s.M, F=M.F, G=L.G, S=G.S, H=L.H||[], sts=Object.keys(S).map(Number).sort((a,b)=>a-b);
  if(!F||!L.fromUV) return null;
  const toAB=(X,Y)=>{ const [u,v]=F.toL(X,Y); return L.fromUV(u,v); };
  const lotW=M.ring, lot=[]; for(let i=0;i<lotW.length;i+=2) lot.push(toAB(lotW[i],lotW[i+1]));
  const P0=(a,b,z,ox,oy,k)=>iso(-a,-b,z,ox,oy,k), VIS=(nx,ny)=>(nx+ny)<0, DEP=(a,b)=>-(a+b);
  const ztop=sts.reduce((t,st)=>t+(H[st-1]||4),0), allr=sts.flatMap(st=>S[st].flatMap(rm=>rm.r));
  const pts=lot.map(q=>P0(q[0],q[1],0,0,0,1)).concat(allr.flatMap(r=>[[r[0],r[2]],[r[1],r[3]]].map(q=>P0(q[0],q[1],ztop,0,0,1))));
  const bx0=Math.min(...pts.map(q=>q[0])), bx1=Math.max(...pts.map(q=>q[0])), by0=Math.min(...pts.map(q=>q[1])), by1=Math.max(...pts.map(q=>q[1]));
  const tg=o.target||[W*0.18,Hh*0.16,W*0.95,Hh*0.92], k=Math.min((tg[2]-tg[0])/(bx1-bx0),(tg[3]-tg[1])/(by1-by0));
  const ox=tg[0]-bx0*k+((tg[2]-tg[0])-(bx1-bx0)*k)/2, oy=tg[1]-by0*k+((tg[3]-tg[1])-(by1-by0)*k)/2, Q=(a,b,z)=>P0(a,b,z,ox,oy,k);
  const inWin=(sx,sy)=>sx>-40&&sx<W+40&&sy>-40&&sy<Hh+40;
  const out=[`<svg width="${W}" height="${Hh}" viewBox="0 0 ${W} ${Hh}" font-family="${FONT}" role="img" aria-label="${o.label||'The hub'}, axonometric, on the lot among its neighbours"><rect width="${W}" height="${Hh}" fill="#EDECE8"/>`];
  /* ground: parcels light, the lot white */
  const lb=C_bbox(lotW), R0=170; const seen=new Set();
  for(const kk in BD.S.tiles){ if(!kk.startsWith(x.city+':')) continue; for(const p of BD.S.tiles[kk].par||[]){ const id=p.id+':'+p.r[0]; if(seen.has(id)) continue; seen.add(id); const b=p.bb; if(!b||b[2]<lb[0]-R0||b[0]>lb[2]+R0||b[3]<lb[1]-R0||b[1]>lb[3]+R0) continue;
    const q=[]; for(let i=0;i<p.r.length;i+=2){ const ab=toAB(p.r[i],p.r[i+1]); q.push(Q(ab[0],ab[1],0)); } if(q.some(z=>inWin(z[0],z[1]))) out.push(ply(q,'#F8F8F6','#DAD9D5',0.5)); } }
  out.push(ply(lot.map(q=>Q(q[0],q[1],0)),'#FFFFFF',INK,0.9,'8 3 1.5 3'));
  const objs=[];
  /* neighbours, extruded */
  let nb=[];
  if(x.city==='van'){ const B=await lidarNear(lb[0]-R0,lb[1]-R0,lb[2]+R0,lb[3]+R0); nb=B.map(b=>{ const r=[]; for(let i=2;i<b.length;i+=2) r.push(b[i],b[i+1]); return {h:b[0],r}; }); }
  else for(const kk in BD.S.tiles){ if(!kk.startsWith('edm:')) continue; for(const b of BD.S.tiles[kk].bld||[]) nb.push({h:b.h,r:b.r}); }
  for(const b of nb){ let cx=0,cy=0,n=0; for(let i=0;i<b.r.length;i+=2){ cx+=b.r[i]; cy+=b.r[i+1]; n++; } cx/=n; cy/=n; if(Math.abs(cx-(lb[0]+lb[2])/2)>R0||Math.abs(cy-(lb[1]+lb[3])/2)>R0) continue; if(BD.pip(cx,cy,lotW)) continue;
    let pts2=[]; for(let i=0;i<b.r.length;i+=2) pts2.push(toAB(b.r[i],b.r[i+1])); let A=0; for(let i=0;i<pts2.length;i++){ const j=(i+1)%pts2.length; A+=pts2[i][0]*pts2[j][1]-pts2[j][0]*pts2[i][1]; } if(A<0) pts2=pts2.reverse();
    const c=pts2.reduce((t,q)=>[t[0]+q[0]/pts2.length,t[1]+q[1]/pts2.length],[0,0]), sc=Q(c[0],c[1],0); if(!inWin(sc[0],sc[1])) continue;
    const hh=Math.max(3,+b.h||6), f=[];
    for(let i=0;i<pts2.length;i++){ const a=pts2[i], bq=pts2[(i+1)%pts2.length], nx=bq[1]-a[1], ny=-(bq[0]-a[0]); if(!VIS(nx,ny)) continue; f.push([DEP(a[0]+bq[0],a[1]+bq[1]),ply([Q(a[0],a[1],0),Q(bq[0],bq[1],0),Q(bq[0],bq[1],hh),Q(a[0],a[1],hh)],shade('#FFFFFF',nx>ny?0.93:0.86),'#B9B8B3',0.4)]); }
    f.sort((p1,p2)=>p1[0]-p2[0]); objs.push([DEP(c[0],c[1]),f.map(z=>z[1]).join('')+ply(pts2.map(q=>Q(q[0],q[1],hh)),'#FFFFFF','#B9B8B3',0.4)]); }
  /* plant at grade */
  const PH={gen:3.7,pad:2.0,chiller:2.9};
  for(const it of ((L.plant&&L.plant.items)||[]).filter(it=>!it.roof&&it.r)){ const [u0,u1,v0,v1]=it.r, hh=it.hub?2.1:PH[it.kind]||2.0;
    objs.push([DEP((u0+u1)/2,(v0+v1)/2),ply([Q(u0,v0,0),Q(u1,v0,0),Q(u1,v0,hh),Q(u0,v0,hh)],shade(BIG.plant,0.9),INK2,0.5)+ply([Q(u0,v0,0),Q(u0,v1,0),Q(u0,v1,hh),Q(u0,v0,hh)],shade(BIG.plant,0.8),INK2,0.5)+ply([Q(u0,v0,hh),Q(u1,v0,hh),Q(u1,v1,hh),Q(u0,v1,hh)],BIG.plant,INK2,0.5)]); }
  /* the building as big-picture volumes (J.B. 12 Nov 2026, as reports/massing_ctx.py): per storey one volume per group (data centre, public, plant,
     unassigned); circulation and loading take the group they adjoin; pieces under 3 m wide join their neighbour's group; unassigned only as a real
     volume; faces stroked in their own fill, dark lines only on the silhouette and where two groups meet. Rooms and seams stay in the plans. */
  const GC={dc:'#BCCDE4',pub:'#CFE0CB',plant:'#DCDBD6',spare:'#F4F4F2'};
  const g0=g=>(g==='hall'||g==='sup'||g==='load')?'dc':(g==='pub'||g==='clin')?'pub':g==='plant'?'plant':g==='spare'?'spare':null;
  const shareLen=(a,b)=>{ let L=0; for(const x of [a[0],a[1]]) if(Math.abs(x-b[0])<1e-6||Math.abs(x-b[1])<1e-6) L+=Math.max(0,Math.min(a[3],b[3])-Math.max(a[2],b[2]));
    for(const y of [a[2],a[3]]) if(Math.abs(y-b[2])<1e-6||Math.abs(y-b[3])<1e-6) L+=Math.max(0,Math.min(a[1],b[1])-Math.max(a[0],b[0])); return L; };
  const groupsOf=st=>{ const R=[]; for(const rm of S[st]) for(const r of rm.r) R.push({r,g:g0(rm.g),fix:!!g0(rm.g)&&rm.g!=='load'});
    const nb=o=>{ const w={}; for(const q of R){ if(q===o||!q.g) continue; const L=shareLen(o.r,q.r); if(L>0) w[q.g]=(w[q.g]||0)+L; } let best=null; for(const k in w) if(!best||w[k]>w[best]) best=k; return best; };
    for(let it=0;it<6;it++) for(const o of R) if(!o.g||(!o.fix&&o.g==='dc')){ const b=nb(o); if(b) o.g=b; }   /* circulation and loading: the group they adjoin */
    for(const o of R) if(!o.g) o.g='dc';
    for(const o of R){ const w=Math.min(o.r[1]-o.r[0],o.r[3]-o.r[2]); if(w<3){ const b=nb(o); if(b) o.g=b; } }   /* slivers join their neighbour */
    const spA=R.filter(o=>o.g==='spare').reduce((t,o)=>t+(o.r[1]-o.r[0])*(o.r[3]-o.r[2]),0);
    for(const o of R) if(o.g==='spare'&&(spA<30||Math.min(o.r[1]-o.r[0],o.r[3]-o.r[2])<4)){ const b=nb(o); if(b&&b!=='spare') o.g=b; }   /* unassigned only as a real volume */
    return R; };
  const at=(R,u,v)=>{ for(const o of R) if(u>o.r[0]-1e-6&&u<o.r[1]+1e-6&&v>o.r[2]-1e-6&&v<o.r[3]+1e-6) return o; return null; };
  const DK='#45464A'; let bsvg='', base=0, cA=0, cB=0, nC=0; const GS={}; sts.forEach(st=>GS[st]=groupsOf(st));
  for(const st of sts){ const R=GS[st], rects=R.map(o=>o.r), z0=base, z1=base+(H[st-1]||4), up=GS[st+1]||null, faces=[], lines=[];
    R.forEach(o=>{ cA+=(o.r[0]+o.r[1])/2; cB+=(o.r[2]+o.r[3])/2; nC++; });
    const E=outerEdges(rects), vis=E.filter(e=>VIS(e.n[0],e.n[1]));
    const grpOf=e=>{ const mu=(e.a[0]+e.b[0])/2-e.n[0]*0.05, mv=(e.a[1]+e.b[1])/2-e.n[1]*0.05, o=at(R,mu,mv); return o?o.g:'dc'; };
    for(const e of vis){ const g=grpOf(e), col=shade(GC[g],e.n[0]?0.86:0.94); e.g=g;
      faces.push([DEP(e.a[0]+e.b[0],e.a[1]+e.b[1]),ply([Q(e.a[0],e.a[1],z0),Q(e.b[0],e.b[1],z0),Q(e.b[0],e.b[1],z1),Q(e.a[0],e.a[1],z1)],col,col,0.6)]);
      /* the storey's top edge: dark at the top of the building, or where the storey above is another group */
      const mu=(e.a[0]+e.b[0])/2-e.n[0]*0.05, mv=(e.a[1]+e.b[1])/2-e.n[1]*0.05, above=up?at(up,mu,mv):null;
      if(!above||above.g!==g){ const A=Q(e.a[0],e.a[1],z1), B=Q(e.b[0],e.b[1],z1); lines.push(`<line x1="${A[0].toFixed(1)}" y1="${A[1].toFixed(1)}" x2="${B[0].toFixed(1)}" y2="${B[1].toFixed(1)}" stroke="${DK}" stroke-width="0.8"/>`); }
      if(st===sts[0]){ const A=Q(e.a[0],e.a[1],z0), B=Q(e.b[0],e.b[1],z0); lines.push(`<line x1="${A[0].toFixed(1)}" y1="${A[1].toFixed(1)}" x2="${B[0].toFixed(1)}" y2="${B[1].toFixed(1)}" stroke="${DK}" stroke-width="0.8"/>`); } }
    /* vertical edges: dark where the facade meets a hidden face (the silhouette) or another group */
    const key=p=>p[0].toFixed(2)+','+p[1].toFixed(2), byPt=new Map(); for(const e of E) for(const p of [e.a,e.b]){ const k=key(p); if(!byPt.has(k)) byPt.set(k,[]); byPt.get(k).push(e); }
    for(const [k,es] of byPt){ const vs=es.filter(e=>vis.includes(e)); if(!vs.length) continue; const hid=es.some(e=>!vis.includes(e)), diff=new Set(vs.map(e=>e.g)).size>1, straight=vs.length===2&&vs[0].n[0]===vs[1].n[0]&&vs[0].n[1]===vs[1].n[1];
      if(hid||(diff)){ const pt=vs[0].a&&key(vs[0].a)===k?vs[0].a:vs[0].b, A=Q(pt[0],pt[1],z0), B=Q(pt[0],pt[1],z1); lines.push(`<line x1="${A[0].toFixed(1)}" y1="${A[1].toFixed(1)}" x2="${B[0].toFixed(1)}" y2="${B[1].toFixed(1)}" stroke="${DK}" stroke-width="0.8"/>`); } }
    faces.sort((p1,p2)=>p1[0]-p2[0]); bsvg+=faces.map(z=>z[1]).join('')+lines.join(''); base=z1;
    if(st===sts[sts.length-1]){ /* the roof: merged by group, then its outline and the lines between groups */
      for(const o of R) bsvg+=ply([Q(o.r[0],o.r[2],z1),Q(o.r[1],o.r[2],z1),Q(o.r[1],o.r[3],z1),Q(o.r[0],o.r[3],z1)],GC[o.g],GC[o.g],0.6);
      for(const e of E){ const A=Q(e.a[0],e.a[1],z1), B=Q(e.b[0],e.b[1],z1); bsvg+=`<line x1="${A[0].toFixed(1)}" y1="${A[1].toFixed(1)}" x2="${B[0].toFixed(1)}" y2="${B[1].toFixed(1)}" stroke="${DK}" stroke-width="0.8"/>`; }
      for(let a=0;a<R.length;a++) for(let b=a+1;b<R.length;b++){ if(R[a].g===R[b].g) continue; const ra=R[a].r, rb=R[b].r;
        for(const x of [ra[0],ra[1]]) if(Math.abs(x-rb[0])<1e-6||Math.abs(x-rb[1])<1e-6){ const lo=Math.max(ra[2],rb[2]), hi=Math.min(ra[3],rb[3]); if(hi-lo>1e-6){ const A=Q(x,lo,z1), B=Q(x,hi,z1); bsvg+=`<line x1="${A[0].toFixed(1)}" y1="${A[1].toFixed(1)}" x2="${B[0].toFixed(1)}" y2="${B[1].toFixed(1)}" stroke="${DK}" stroke-width="0.6"/>`; } }
        for(const y of [ra[2],ra[3]]) if(Math.abs(y-rb[2])<1e-6||Math.abs(y-rb[3])<1e-6){ const lo=Math.max(ra[0],rb[0]), hi=Math.min(ra[1],rb[1]); if(hi-lo>1e-6){ const A=Q(lo,y,z1), B=Q(hi,y,z1); bsvg+=`<line x1="${A[0].toFixed(1)}" y1="${A[1].toFixed(1)}" x2="${B[0].toFixed(1)}" y2="${B[1].toFixed(1)}" stroke="${DK}" stroke-width="0.6"/>`; } } } } }
  objs.push([DEP(cA/nC,cB/nC),bsvg]);
  objs.sort((p1,p2)=>p1[0]-p2[0]); out.push(...objs.map(z=>z[1]));
  out.push('</svg>');
  const key=`<div style="font-size:11px;color:${INK2};margin-top:4px"><span style="display:inline-block;width:10px;height:10px;background:#BCCDE4;vertical-align:-1px;margin-right:6px"></span>data centre <span style="display:inline-block;width:10px;height:10px;background:#CFE0CB;vertical-align:-1px;margin:0 6px 0 10px"></span>refuge, shelter, clinic <span style="display:inline-block;width:10px;height:10px;background:${BIG.plant};vertical-align:-1px;margin:0 6px 0 10px"></span>plant <span style="display:inline-block;width:10px;height:10px;background:#fff;border:1px solid #B9B8B3;vertical-align:-1px;margin:0 6px 0 10px"></span>neighbours (${x.city==='van'?'City LiDAR 2022':'City footprints'})</div>`;
  return {svg:out.join(''),key}; }
const C_bbox=r=>{ let a=1e18,b=1e18,c=-1e18,d=-1e18; for(let i=0;i<r.length;i+=2){ a=Math.min(a,r[i]); b=Math.min(b,r[i+1]); c=Math.max(c,r[i]); d=Math.max(d,r[i+1]); } return [a,b,c,d]; };
BD.f1plans={plan,legend,BOARD_COL,isCirc,side,energy,energySvg,exploded,storeyLabels,modes,why,shares,icons,secT,massing,BIG};
})();
/* the three cards wrapped (A section, J.B. 12 Nov 2026): each keeps its own panel; the drawing is the report's graphic when the hub's layout is drawn */
(function(){ const BD=window.BD, C=BD.f1cards, F=BD.f1plans; if(!C) return;
  const wrap=(title,fn,opt)=>{ const sp=C.get('architecture',title); if(!sp) return; const ob=sp.build;
    sp.build=async function(x){ if(opt&&opt.replace){ const P=await x.arch(), V=P&&C.v1(P); if(V&&V.L&&V.L.G){ const d=await fn(x,P,V,{}); return typeof d==='string'?{draw:d}:d; } return ob.call(this,x); }
      const r=await ob.call(this,x); try{ const P=await x.arch(), V=P&&C.v1(P); if(V&&V.L&&V.L.G){ const d=await fn(x,P,V,r); if(typeof d==='string') r.draw=d; else if(d) Object.assign(r,d); } }catch(e){ console.warn('report graphic',title,e); } return r; }; };
  const people=L=>{ const ra=rm=>rm.r.reduce((t,r)=>t+(r[1]-r[0])*(r[3]-r[2]),0); const a=(L.G.S[1]||[]).filter(rm=>/^ref/.test(rm.id)).reduce((t,rm)=>t+ra(rm),0); return a?Math.floor(a/3.5):null; };
  const exams=L=>Object.values(L.G.S).flat().filter(rm=>/^ex\d/.test(rm.id)).length;
  const shareTxt=(L,city)=>{ const E=F.energy(L,city); return E?`${E.share[0].toFixed(1)}–${E.share[1].toFixed(1)} % of the hall’s heat`:''; };
  const TYPS=[['emergency_hub','Emergency hub','selectable','the typology the tool lays out'],['community_pool','Community pool','coming','in development'],['heat_cascade','Heat cascade','coming','in development'],
    ['warm_bath','Warm bath','not started',''],['shelter_laundry','Shelter + laundry','not started',''],['aquaponics','Aquaponics','not started',''],['food_hub','Food hub','not started',''],['conservatory','Conservatory','not started','']];
  const picker=()=>`<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px">${TYPS.map(([id,n,st,why])=>`<div style="border:1px solid ${st==='selectable'?'#18191B':'#DAD9D5'};border-top:3px solid ${st==='selectable'?'#3366A3':'#DAD9D5'};padding:8px 10px;${st==='selectable'?'':'color:#6B6A66'}"><div style="font-size:13px">${n}</div><div style="font-size:10.5px;letter-spacing:0.06em;text-transform:uppercase;margin-top:2px">${st==='selectable'?'picked':st}</div>${why?`<div style="font-size:10.5px;margin-top:3px">${why}</div>`:''}</div>`).join('')}</div>`;
  { const sp=C.get('architecture','Pick a typology'); if(sp){ const ob=sp.build; sp.build=async function(x){ const r=await ob.call(this,x); if(r&&r.rows) r.rows=r.rows.map(q=>q[0]==='Typology picker'?['Typology picker','Emergency hub picked; Community pool and Heat cascade in development; five more not started']:q); return r; }; } }
  wrap('Pick a typology',(x,P,V)=>`<div class="f1p-set">${picker()}${F.secT('What the data centre shares')}<div style="display:grid;grid-template-columns:440px 1fr;gap:20px;align-items:center">${F.icons(440)}<div style="display:flex;flex-direction:column;gap:10px">${F.shares(shareTxt(V.L,x.city))}</div></div>${F.secT('The building, storey by storey')}<div style="display:grid;grid-template-columns:400px 1fr;gap:20px;align-items:center">${F.exploded(V.L)}<div style="display:flex;flex-direction:column;gap:12px">${F.storeyLabels(V.L)}</div></div></div>`);
  wrap('The governing principle',(x,P,V)=>`<div class="f1p-set">${F.secT('Two modes, one building')}${F.modes(V.L,people(V.L),exams(V.L))}${F.secT('Why pair them')}${F.why()}${F.secT('The order on the lot')}<div style="display:grid;grid-template-columns:400px 1fr;gap:20px;align-items:center">${F.exploded(V.L)}<div style="display:flex;flex-direction:column;gap:12px">${F.storeyLabels(V.L)}</div></div></div>`);
  wrap('Drawing styles',async(x,P,V)=>{ const m=await F.massing(x,P,V.L,{W:760,H:520,label:'Emergency hub, stacked'}); const p1=F.plan(V.L.G,1,{w:620});
    const d0=`<div class="f1p-set">${F.secT('3-D massing, seen from the street')}${m?m.svg+m.key:''}${F.secT('The building pulled apart by storey')}<div style="display:grid;grid-template-columns:420px 1fr;gap:20px;align-items:center">${F.exploded(V.L,420,250)}<div style="display:flex;flex-direction:column;gap:12px">${F.storeyLabels(V.L)}</div></div>${p1?F.secT('Plan, storey 1')+p1.svg+F.legend():''}<p class="f1c-note" style="font-size:11px">One drawing style for the cards and the report (J.B. 12 Nov 2026): big-picture colours for the 3-D views, the board palette for plans.</p></div>`;
    return {draw:d0,lead:'The same layout in the report’s drawing styles: 3-D massing among the neighbours, the storeys pulled apart, and a plan.',rows:[['3-D massing','big-picture colours, seen from the street; neighbours '+(x.city==='van'?'City LiDAR 2022':'City footprints')],['Exploded','storeys pulled apart, rooms by big-picture program'],['Plan','storey 1, board palette, doors, exits and dimensions']],src:['Graphics: the report’s drawing styles (massing, typology page, fire plans), drawn from this layout.']}; },{replace:true});
  /* A22 Report (Report_Arch_p1–p13, reports/report_arch.py): the 13 pages, drawn from this lot's layout */
  wrap('Report',async(x,P,V)=>{ const L=V.L, G=L.G, sts=Object.keys(G.S).map(Number).sort((a,b)=>a-b), E=F.energy(L,x.city), m=await F.massing(x,P,L,{W:700,H:420}), esc=C.esc, n0=v=>v==null?'?':Math.round(v).toLocaleString('en-CA');
    const ra=rm=>rm.r.reduce((t,r)=>t+(r[1]-r[0])*(r[3]-r[2]),0), byG={}; for(const st of sts) for(const rm of G.S[st]) byG[rm.g]=(byG[rm.g]||0)+ra(rm);
    const ppl=(()=>{ const a=(G.S[1]||[]).filter(rm=>/^ref/.test(rm.id)).reduce((t,rm)=>t+ra(rm),0); return a?Math.floor(a/3.5):null; })(), hgt=(L.grades&&L.grades.height)||(L.H||[]).reduce((t,h)=>t+h,0);
    const v2=(L.v2&&L.v2.rows)||[], ORD={fix:0,fail:0,flag:1,tight:2,'?':3,pass:4}, rows=v2.slice().sort((a,b)=>(ORD[a[0]]??5)-(ORD[b[0]]??5)), bad=rows.filter(r=>r[0]!=='pass'), pass=rows.filter(r=>r[0]==='pass');
    const cnt=st=>rows.filter(r=>r[0]===st).length;
    const pg=(n,t,body)=>`<div class="f1r-pg"><div class="cap">Page ${n} · ${esc(t)}</div><div class="f1r-box"><div class="f1r-sheet"><div class="hd"><span>BEYOND DATA · ARCHITECTURE REPORT · ${esc(String(x.addr).toUpperCase())}</span><span>${n} / 13</span></div><h1>${esc(t)}</h1>${body}</div></div></div>`;
    const lab={fix:['to fix','#A8493F'],fail:['fails','#A8493F'],flag:['flag','#45464A'],tight:['tight','#45464A'],'?':['?','#8A8985']};
    const pages=[
      pg(1,'Architecture report',`${m?m.svg+m.key:''}<div style="margin-top:8px">${F.icons(320)}</div><p class="ld">An Emergency hub on the street, with the data centre above and behind it: what it holds, why, and how it is arranged. Typology Emergency hub · servers ${L.MW.toFixed(2)} MW · height ${hgt?hgt.toFixed(1):'?'} m · refuge ${ppl??'?'} people.</p>`),
      pg(2,'What it is, and why',`${F.icons(440)}${F.shares(E?`${E.share[0].toFixed(1)}–${E.share[1].toFixed(1)} % of the hall’s heat`:'')}${F.secT('Two modes, one building')}${F.modes(L,ppl,Object.values(G.S).flat().filter(rm=>/^ex\d/.test(rm.id)).length)}${F.secT('Why pair them')}${F.why()}`),
      pg(3,'The program',`<table class="f1c-res-t">${[['Data hall',byG.hall],['Data-centre support and loading',(byG.sup||0)+(byG.load||0)],['Public programs (refuge, shelter, lobby)',byG.pub],['Clinic',byG.clin],['Circulation',byG.circ],['Unassigned',byG.spare]].filter(r=>r[1]).map(r=>`<tr><th>${r[0]}</th><td>${n0(r[1])} m²</td></tr>`).join('')}</table>`),
      pg(4,'How it is arranged',`${F.exploded(L,420,250)}<div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">${F.storeyLabels(L)}</div>`),
      pg(5,'The energy exchange',E?(()=>{ const g=F.energySvg(E,x.city); return g.svg+(g.seasons||''); })():'<p class="ld">Heat: not computed for this layout (?).</p>'),
      pg(6,'Site plan','__SITE__'),
      ...sts.map((st,i)=>{ const pr=F.plan(G,st,{w:704}); return pg(7+i,`Plans: storey ${st}`,pr?pr.svg+F.legend():'<p class="ld">?</p>'); }),
      pg(7+sts.length,'Rooms',sts.map(st=>`<div class="lb">Storey ${st}</div><table class="f1c-res-t">${G.S[st].map((rm,i)=>`<tr><th>${i+1}</th><td>${esc(rm.n)}</td><td style="text-align:right">${n0(ra(rm))} m²</td></tr>`).join('')}</table>`).join('')),
      pg(8+sts.length,'Code check',`<p class="ld">Big moves only: every row is a rule that could change size or fit. ${cnt('pass')} pass · ${cnt('tight')} tight · ${cnt('flag')} flag · ${cnt('?')} ? · ${cnt('fail')+cnt('fix')} fail.</p><table class="f1c-res-t">${bad.map(r=>{ const [l,c]=lab[r[0]]||[r[0],'#45464A']; return `<tr><th style="color:${c}">${l}</th><td>${esc(r[1])}<span style="color:#6B6A66"> · ${esc(C.pub(String(r[3]||'')).slice(0,150))}${C.pub(String(r[3]||'')).length>150?'…':''}</span></td></tr>`; }).join('')}</table><div class="lb">Passing (${pass.length})</div><p class="ld">${pass.map(r=>esc(r[1])).join('; ')}</p>`),
      pg(9+sts.length,'Plant',`<p class="ld">${L.plant?`Q = ${L.MW.toFixed(2)} × 1.55 = ${L.plant.Q} MW: ${L.plant.nG} generator sets (${(L.plant.setKW||0).toLocaleString('en-CA')} kW), ${L.plant.nT} transformer pads, ${L.plant.nC} chillers, the hub’s own set.`:'?'}</p><table class="f1c-res-t">${((L.plant&&L.plant.items)||[]).map(it=>`<tr><th>${esc(String(it.id||'').toUpperCase())}</th><td>${esc(it.n||'')}</td></tr>`).join('')}</table>`),
      pg(10+sts.length,'What is not known, sources',`<ul class="ld">${(L.flags||[]).filter(f=>/\?/.test(f)).map(f=>`<li>${esc(C.pub(f))}</li>`).join('')||'<li>none flagged</li>'}</ul><p class="ld">Layout and checks: ${V.L&&V.L.frozen?'the test fit for '+(V.L.frozen.addr||'this lot')+', 12 Nov 2026':'the Emergency hub engine (rule sheet v1), the specification of 12 Nov 2026'}. Neighbours: ${x.city==='van'?'City of Vancouver LiDAR 2022':'City of Edmonton footprints'}. Every figure’s source is on its card.</p>`)];
    let html=pages.join('');
    try{ const sp=await C.get('architecture','Plant and site').build(x); html=html.replace('__SITE__',sp&&sp.draw?sp.draw:'<p class="ld">?</p>'); }catch(e){ html=html.replace('__SITE__','<p class="ld">Site plan: could not be drawn (?)</p>'); }
    const titles=['Cover','What it is, and why','The program','How it is arranged','The energy exchange','Site plan',...sts.map(st=>`Plans: storey ${st}`),'Rooms','Code check','Plant','What is not known, sources'];
    return {draw:`<div class="f1r-pages">${html}</div><button class="f1c-mua-print" type="button" onclick="window.print()">Print the report</button>`,
      more:[], lead:'The Architecture report: 13 letter pages from this lot’s layout: cover, typology, program, arrangement, energy exchange, site plan, a plan per storey, rooms, code check (worst first), plant, and what is not known.',
      hero:[{v:String(titles.length),l:'pages'},{v:String(bad.length),l:'code rows not passing'}],
      rows:titles.map((t,i)=>[`Page ${i+1}`,t]),
      src:['Pages: the Architecture report layout (13 pages), drawn from this lot’s layout and its code rows.','Export: Print, or save as PDF.']}; });
  /* A10 and A21 boards: the massing on the lot (J.B. 12 Nov 2026: massing as big-picture volumes wherever it shows) */
  wrap('Variant and add-ons',async(x,P,V,r)=>{ const m=await F.massing(x,P,V.L,{W:760,H:460}); if(!m) return null; const d=r.draw||'', k=d.search(/<[^>]+>\s*Add-ons\s*</); return `<div class="f1p-set">${F.secT('The hub on its lot')}${m.svg}${m.key}${k>0?d.slice(k):''}</div>`; });
  wrap('Compare',async(x,P,V,r)=>{ const m=await F.massing(x,P,V.L,{W:300,H:220}); return m?`<div class="f1p-set"><div style="display:grid;grid-template-columns:repeat(3,300px);gap:14px;margin-bottom:14px"><figure style="margin:0">${m.svg}<figcaption style="font-size:12px;margin-top:4px">Emergency hub · this lot</figcaption></figure>${['Community pool','Heat cascade'].map(t=>`<figure style="margin:0"><div style="width:300px;height:220px;border:1px solid #DAD9D5;display:flex;align-items:center;justify-content:center;font-size:12px;color:#6B6A66;text-align:center;padding:0 16px">still: in development</div><figcaption style="font-size:12px;margin-top:4px">${t}</figcaption></figure>`).join('')}</div></div>${r.draw||''}`:null; });
  wrap('Program diagram',(x,P,V,r)=>`<div class="f1p-set">${F.icons(560)}${F.secT('The building pulled apart by storey')}<div style="display:grid;grid-template-columns:440px 1fr;gap:20px;align-items:center">${F.exploded(V.L,440,260)}<div style="display:flex;flex-direction:column;gap:12px">${F.storeyLabels(V.L)}</div></div></div>`);
})();
