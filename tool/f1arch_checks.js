/* Beyond Data — F1 Architecture cards, group 'checks' (CODE_JOB_F1 step 2). Registers its cards with BD.f1cards (see f1cards.js, f1arch.js).
   14 Rooms · 15 Separations · 16 Plant and site · 21 Report. Every figure comes from the tool: Arrange's placement (BD.archTest.place via x.arch()), the plan layer
   (BD.plan.build, rule sheet v0), BD.archTest.rules and dcPieces, and the site model (plant, side drive, grade, generator noise). Drawings follow docs/STYLE.md §3, §6.
   The lot frame (u along the lot's long axis, v across) is turned so the street front is at the bottom and north-handedness is kept (a mirror image of the lot would mislead). */
(function(){
'use strict';
const BD=window.BD, C=BD.f1cards, K=C.K, esc=C.esc, n0=C.n0, n1=C.n1, T='architecture', CHIP='Draft plan · rule sheet v0';
const FONT='font-family="IBM Plex Sans,system-ui,sans-serif"', NS='f1c-checks-';

/* ---------- styles and the two small behaviours the drawings need (storey tabs, print) ---------- */
(function(){ if(document.getElementById('f1c-checks')) return; const st=document.createElement('style'); st.id='f1c-checks';
  st.textContent=`.${NS}wrap{display:flex;flex-direction:column;align-items:center;width:100%;gap:8px}
.${NS}tabs{display:flex;gap:8px;flex-wrap:wrap;align-self:flex-start}
.${NS}tabs button{font:inherit;font-size:12.5px;padding:6px 12px;border:1px solid ${K.rule};border-radius:999px;background:#fff;color:${K.ink};cursor:pointer}
.${NS}tabs button[aria-pressed=true]{background:${K.ink};border-color:${K.ink};color:#fff}
.${NS}cap{align-self:flex-start;font-size:11.5px;color:${K.mute};margin:0}
.${NS}tbl{width:100%;border-collapse:collapse;font-size:12px}.${NS}tbl td{padding:3px 0;border-bottom:1px solid ${K.hair};vertical-align:top}.${NS}tbl td+td{text-align:right;color:${K.mute};white-space:nowrap;padding-left:10px}.${NS}tbl th{text-align:left;font-weight:500;padding:8px 0 3px;font-size:12px}
.${NS}pages{display:flex;gap:8px;justify-content:center;align-items:flex-start;flex-wrap:wrap}
.${NS}pg{width:122px;display:flex;flex-direction:column;gap:6px}
.${NS}pg .sheet{aspect-ratio:612/792;border:1px solid ${K.rule};background:#fff;padding:9px 9px 7px;display:flex;flex-direction:column;gap:6px;overflow:hidden}
.${NS}pg.todo .sheet{border-style:dashed}
.${NS}pg .hd{font-size:8px;color:${K.faint}}.${NS}pg .ti{font-size:12px;font-weight:400;color:${K.ink};line-height:1.2}
.${NS}pg .wh{font-size:10px;color:${K.ink2};line-height:1.35}
.${NS}pg .no{font-size:11.5px;color:${K.mute};display:flex;justify-content:space-between}.${NS}pg .no b{font-weight:400;color:${K.red}}
.${NS}pg .ln{height:3px;background:${K.hair};border-radius:1px}
.${NS}btn{font:inherit;font-size:13.5px;background:${K.ink};color:#fff;border:0;border-radius:2px;padding:13px 22px;cursor:pointer;margin-top:16px}`;
  document.head.appendChild(st);
  document.addEventListener('click',e=>{ const b=e.target.closest&&e.target.closest('.'+NS+'tabs button'); if(b){ const w=b.closest('.'+NS+'wrap'); w.querySelectorAll('.'+NS+'tabs button').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));
      w.querySelectorAll('svg g[data-z]').forEach(g=>{ g.style.display=g.dataset.z===b.dataset.z?'':'none'; }); return; }
    const p=e.target.closest&&e.target.closest('[data-f1c-print]'); if(p) window.print(); }); })();

/* ---------- frame: lot (u, v) metres → screen, street at the bottom, handedness kept ---------- */
function geo(P){ const M=P.s.M, F=M.F, dir=P.s.dir<0?-1:1, w0=F.toW(0,0), wu=F.toW(1,0), wv=F.toW(0,1), uv=[wu[0]-w0[0],wu[1]-w0[1]], vv=[wv[0]-w0[0],wv[1]-w0[1]], up=[-dir*uv[0],-dir*uv[1]];
  return {M,F,dir,sg:(vv[0]*up[1]-vv[1]*up[0])>0?1:-1}; }
/* box = [u0,u1,v0,v1]; the scale is fixed by the height H; the width follows */
function mapper(g,box,H,pad){ const du=box[1]-box[0], dv=box[3]-box[2], s=(H-2*pad)/du, Wp=Math.round(dv*s+2*pad);
  const lp=(u,v)=>[pad+(g.sg>0?(v-box[2]):(box[3]-v))*s, pad+(g.dir<0?(box[1]-u):(u-box[0]))*s];
  const inv=(X,Y)=>[g.dir<0?box[1]-(Y-pad)/s:box[0]+(Y-pad)/s, g.sg>0?box[2]+(X-pad)/s:box[3]-(X-pad)/s];
  const rect=r=>{ const a=lp(r[0],r[2]), b=lp(r[1],r[3]); return {x:Math.min(a[0],b[0]),y:Math.min(a[1],b[1]),w:Math.abs(a[0]-b[0]),h:Math.abs(a[1]-b[1])}; };
  return {s,lp,inv,rect,W:Wp,H,pad}; }
const ringPts=(ring,g,mp)=>{ const o=[]; for(let i=0;i<ring.length;i+=2){ const [u,v]=g.F.toL(ring[i],ring[i+1]); o.push(mp.lp(u,v)); } return o; };
const poly=pts=>pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join('')+'Z';
const rc=(r,fill,extra)=>`<rect x="${r.x.toFixed(1)}" y="${r.y.toFixed(1)}" width="${r.w.toFixed(1)}" height="${r.h.toFixed(1)}" fill="${fill}"${extra||''}/>`;
const short=n=>String(n||'').split(' (')[0];
const lotBox=(g,pad)=>{ let a=1e9,b=-1e9,c=1e9,d=-1e9; const r=g.M.ring; for(let i=0;i<r.length;i+=2){ const [u,v]=g.F.toL(r[i],r[i+1]); a=Math.min(a,u);b=Math.max(b,u);c=Math.min(c,v);d=Math.max(d,v); } return [a-pad,b+pad,c-pad,d+pad]; };

/* a horizontal ray from an anchor to a label column must cross no block (STYLE.md rule 8); anchors may slide along their object (rule 9) */
const rayFree=(x0,y,x1,rects,own)=>{ const sgn=x1>x0?1:-1; for(let x=x0+sgn*4;sgn>0?x<x1:x>x1;x+=sgn*2) for(const r of rects){ if(r.k===own) continue; if(x>r.x+0.5&&x<r.x+r.w-0.5&&y>r.y+0.5&&y<r.y+r.h-0.5) return false; } return true; };
function leaders(items,rects,xl,xr){ const used={L:[],R:[]}, out=[], dropped=[];
  for(const it of items){ let done=false;
    for(const side of ['R','L']){ for(const p of it.pts){ const x1=side==='R'?xr:xl; if(!rayFree(p.x,p.y,x1,rects,it.k)||used[side].some(u=>Math.abs(u-p.y)<36)) continue; used[side].push(p.y); out.push(Object.assign({},it,{ax:p.x,y:p.y,side,x1})); done=true; break; } if(done) break; }
    if(!done) dropped.push(it); }
  return {out,dropped}; }
const leaderSvg=L=>L.out.map(l=>{ const lx=l.side==='R'?l.x1+6:l.x1-6, an=l.side==='R'?'start':'end', col=l.red?K.red:K.ink;
  return `<g><circle cx="${l.ax.toFixed(1)}" cy="${l.y.toFixed(1)}" r="2" fill="${col}"/><line x1="${l.ax.toFixed(1)}" y1="${l.y.toFixed(1)}" x2="${l.x1}" y2="${l.y.toFixed(1)}" stroke="${col}" stroke-width="0.5"/>
   <text x="${lx}" y="${(l.y-2).toFixed(1)}" text-anchor="${an}" font-size="13" font-weight="500" fill="${col}">${esc(l.t)}</text><text x="${lx}" y="${(l.y+14).toFixed(1)}" text-anchor="${an}" font-size="11.5" fill="${K.mute}">${esc(l.s||'')}</text></g>`; }).join('');

/* fit a name in a room: one or two lines, or null */
function fitName(name,w,h,fs){ const cw=fs*0.56, one=name.length*cw; if(h<fs*1.6) return null; if(one<=w-8) return [name]; const wd=name.split(' '); if(wd.length<2||h<fs*2.8) return null;
  let best=null; for(let i=1;i<wd.length;i++){ const a=wd.slice(0,i).join(' '), b=wd.slice(i).join(' '), m=Math.max(a.length,b.length)*cw; if(m<=w-8&&(!best||m<best.m)) best={m,l:[a,b]}; } return best?best.l:null; }


/* the shared site context under a plan (F1b item 7): world → this drawing's screen and back, drawn by BD.f1cards.context */
function ctxG(x,P,g,mp,ox){ const Pw=(X,Y)=>{ const [u,v]=g.F.toL(X,Y), q=mp.lp(u,v); return [q[0]+ox,q[1]]; }, Iw=(sx,sy)=>{ const [u,v]=mp.inv(sx-ox,sy); return g.F.toW(u,v); };
  return C.context(x,Pw,Iw,[ox,0,mp.W,mp.H],{skip:BD.S.sel&&BD.S.sel.id}); }
/* north arrow (the frame has the street at the bottom, so north is not up) and a scale bar */
function northScale(g,mp,ox,sx,sy,m){ const c=g.F.toW(0,0), n=g.F.toW(0,0); const w=g.M.ring; const X=w[0],Y=w[1], a=g.F.toL(X,Y), b=g.F.toL(X,Y+1), da=mp.lp(a[0],a[1]), db=mp.lp(b[0],b[1]); let dx=db[0]-da[0], dy=db[1]-da[1]; const l=Math.hypot(dx,dy)||1; dx/=l; dy/=l;
  const cx=30, cy=40, x1=cx+dx*14, y1=cy+dy*14, x0=cx-dx*14, y0=cy-dy*14, px=-dy, py=dx;
  const L=m*mp.s;
  return `<g ${FONT} font-size="11" fill="${K.mute}"><line x1="${x0.toFixed(1)}" y1="${y0.toFixed(1)}" x2="${x1.toFixed(1)}" y2="${y1.toFixed(1)}" stroke="${K.ink}" stroke-width="1"/><path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${(x1-dx*6+px*3).toFixed(1)} ${(y1-dy*6+py*3).toFixed(1)}L${(x1-dx*6-px*3).toFixed(1)} ${(y1-dy*6-py*3).toFixed(1)}Z" fill="${K.ink}"/><text x="${(x1+dx*9-3.5).toFixed(1)}" y="${(y1+dy*9+4).toFixed(1)}" fill="${K.ink2}">N</text>
  <rect x="${sx}" y="${sy}" width="${(L/2).toFixed(1)}" height="4" fill="${K.ink}"/><rect x="${(sx+L/2).toFixed(1)}" y="${sy}" width="${(L/2).toFixed(1)}" height="4" fill="#fff" stroke="${K.ink}" stroke-width="0.8"/><text x="${sx}" y="${sy+16}">0</text><text x="${(sx+L).toFixed(1)}" y="${sy+16}" text-anchor="end">${m} m</text></g>`; }

const storeyLabel=z=>z<0.05?'Ground':n1(z)+' m';
const tabsHtml=(zs)=>`<div class="${NS}tabs" role="group" aria-label="Storeys">${zs.map((z,i)=>`<button type="button" data-z="${z}" aria-pressed="${i===0}">${storeyLabel(z)}</button>`).join('')}</div>`;

/* the blocks on one storey, for the program and separation drawings: data-centre rooms (dcPieces) and program storeys (Arrange's boxes) */
function blocksAt(P,z){ const DP=BD.archTest.dcPieces(P), out=[]; const at=b=>Math.abs(Math.round(b*10)/10-z)<0.06;
  (DP?DP.L.pieces:[]).filter(q=>q.r&&at(q.base)).forEach(q=>out.push({r:q.r,kind:q.id==='hall'?'hall':'sup',name:q.name,id:q.id,dc:true}));
  (P.boxes||[]).forEach(b=>{ const n=b.storeys||1, sh=b.sh||(b.h/n); for(let k=0;k<n;k++) if(Math.abs(Math.round((b.base+k*sh)*10)/10-z)<0.06) out.push({r:[b.u[0],b.u[1],b.v[0],b.v[1]],kind:b.id==='clinic'?'clin':'pub',name:b.p.name,id:b.id,dc:false,own:!!b.own}); });
  return out; }
const FILL={hall:K.fillHall,sup:K.fillSup,pub:K.fillPub,clin:K.fillClin};
const KEY=(items)=>`<div class="f1c-key">${items.join('')}</div>`;
const sw=(c,t)=>`<span><i style="background:${c};border-color:${c}"></i>${t}</span>`;

/* ======================= 14 Rooms ======================= */
C.add(T,'Rooms',{chip:CHIP,async build(x){
  const P=await x.arch(); if(!P) return {draw:'<p class="f1v-empty">No lot loaded.</p>'}; const PL=BD.plan&&BD.plan.build(P); if(!PL||!PL.storeys.length) return {draw:'<p class="f1v-empty">The tool has no plan for this lot (no layout placed).</p>'};
  const g=geo(P), M=g.M, zs=PL.storeys.map(s=>s.z);
  let b=[1e9,-1e9,1e9,-1e9]; PL.storeys.forEach(S=>S.rooms.forEach(r=>{ if(r.rect){ b=[Math.min(b[0],r.rect[0]),Math.max(b[1],r.rect[1]),Math.min(b[2],r.rect[2]),Math.max(b[3],r.rect[3])]; } }));
  const mg=3, mp=mapper(g,[b[0]-mg,b[1]+mg,b[2]-mg,b[3]+mg],450,12), LW=250, W=mp.W+2*LW, ox=LW, id='f1c-a14';
  const lotP=poly(ringPts(M.ring,g,mp).map(p=>[p[0]+ox,p[1]]));
  const fillOf=r=>r.block==='data centre'?(r.id==='hall'?K.fillHall:K.fillSup):r.block==='clinic'?K.fillClin:K.fillPub;
  let groups='', nRooms=0, nDoors=0, nExit=0; const roomRows=[], dropAll=[];
  PL.storeys.forEach((S,i)=>{ let s='';
    const R=S.rooms.filter(r=>r.rect), rects=[];
    R.forEach(r=>{ const q=mp.rect(r.rect); q.x+=ox; q.k=r.block+'|'+r.id; rects.push(q); s+=rc(q,fillOf(r)); });
    [...S.stairs,...S.lifts].forEach(r=>{ const q=mp.rect(r.rect); q.x+=ox; q.k='core|'+r.id; rects.push(q); });
    S.corridors.forEach(c=>{ const q=mp.rect(c.rect); q.x+=ox; s+=rc(q,'#fff'); });
    /* stairs: treads across the long side; lifts: a cross */
    S.stairs.forEach(c=>{ const q=mp.rect(c.rect); q.x+=ox; s+=rc(q,'#fff'); const vert=q.h>=q.w, n=Math.max(4,Math.round((vert?q.h:q.w)/(0.28*mp.s)));
      for(let k=1;k<n;k++){ const t=(vert?q.y+q.h*k/n:q.x+q.w*k/n); s+=vert?`<line x1="${q.x}" y1="${t.toFixed(1)}" x2="${q.x+q.w}" y2="${t.toFixed(1)}" stroke="${K.faint}" stroke-width="0.5"/>`:`<line x1="${t.toFixed(1)}" y1="${q.y}" x2="${t.toFixed(1)}" y2="${q.y+q.h}" stroke="${K.faint}" stroke-width="0.5"/>`; } });
    S.lifts.forEach(c=>{ const q=mp.rect(c.rect); q.x+=ox; s+=rc(q,'#fff')+`<line x1="${q.x}" y1="${q.y}" x2="${q.x+q.w}" y2="${q.y+q.h}" stroke="${K.faint}" stroke-width="0.5"/><line x1="${q.x+q.w}" y1="${q.y}" x2="${q.x}" y2="${q.y+q.h}" stroke="${K.faint}" stroke-width="0.5"/>`; });
    /* walls: 0.8 px between rooms, 1.8 px on the block outline */
    S.walls.forEach(w=>{ const a=w.axis==='u'?mp.lp(w.at,w.from):mp.lp(w.from,w.at), c=w.axis==='u'?mp.lp(w.at,w.to):mp.lp(w.to,w.at);
      s+=`<line x1="${(a[0]+ox).toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${(c[0]+ox).toFixed(1)}" y2="${c[1].toFixed(1)}" stroke="${K.ink}" stroke-width="${w.exterior?1.8:0.8}" stroke-linecap="square"/>`; });
    /* doors: 3.4 px white over the wall; exits carry a dot */
    const door=(d,exit)=>{ const half=d.w/2, a=d.along==='v'?mp.lp(d.u,d.v-half):mp.lp(d.u-half,d.v), c=d.along==='v'?mp.lp(d.u,d.v+half):mp.lp(d.u+half,d.v), m=mp.lp(d.u,d.v);
      return `<line x1="${(a[0]+ox).toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${(c[0]+ox).toFixed(1)}" y2="${c[1].toFixed(1)}" stroke="#fff" stroke-width="3.4"/>`+(exit?`<circle cx="${(m[0]+ox).toFixed(1)}" cy="${m[1].toFixed(1)}" r="3" fill="${K.ink}"/>`:''); };
    S.doors.forEach(d=>{ s+=door(d,false); }); S.exits.forEach(d=>{ s+=door(d,true); });
    nDoors+=S.doors.length; nExit+=S.exits.length;
    /* room names: inside the largest part of each room when they fit; the rooms the plan flags (in red) and that are too small get a straight leader, four at most */
    const by={}; R.forEach(r=>{ const k=r.block+'|'+r.id; (by[k]=by[k]||[]).push(r); }); const flagged=[], names=[];
    Object.values(by).forEach(parts=>{ nRooms++; const big=parts.slice().sort((a,c)=>c.m2-a.m2)[0], q=mp.rect(big.rect); q.x+=ox; const m2=parts.reduce((t,r)=>t+r.m2,0), nm=short(big.name);
      roomRows.push([S.z,big.name,m2]); const ln=fitName(nm,q.w,q.h,11.5), fl=PL.flags.some(f=>f.indexOf(big.name+' (storey '+S.z+' m)')===0);
      if(ln){ const cy=q.y+q.h/2-(ln.length-1)*7+(q.h>=ln.length*14+16?-6:0), two=q.h>=ln.length*14+16;
        names.push(ln.map((t,j)=>`<text x="${(q.x+q.w/2).toFixed(1)}" y="${(cy+j*14+4).toFixed(1)}" text-anchor="middle" font-size="11.5" fill="${K.ink}">${esc(t)}</text>`).join('')+(two?`<text x="${(q.x+q.w/2).toFixed(1)}" y="${(cy+ln.length*14+3).toFixed(1)}" text-anchor="middle" font-size="11.5" fill="${K.mute}">${n0(m2)} m²</text>`:'')); }
      else if(fl){ const pts=[0,.5,.3,.7,.15,.85].map(t=>({x:q.x+q.w/2,y:q.y+3+(q.h-6)*t})); flagged.push({k:big.block+'|'+big.id,t:nm,s:`${n0(m2)} m² · opens through another room`,red:true,pts}); } });
    const L=leaders(flagged.slice(0,4),rects,ox-14,ox+mp.W+14); dropAll.push(...L.dropped,...flagged.slice(4));
    s+=names.join('')+leaderSvg(L);
    groups+=`<g data-z="${S.z}" style="${i?'display:none':''}">${s}</g>`; });
  const lotCtx=`<clipPath id="${id}"><rect x="${ox}" y="0" width="${mp.W}" height="${mp.H}"/></clipPath>${ctxG(x,P,g,mp,ox)}<g clip-path="url(#${id})"><path d="${lotP}" fill="#fff" stroke="${K.mute}" stroke-width="0.8"/></g>`;
  const svg=`<svg viewBox="0 0 ${W} ${mp.H}" width="${W}" height="${mp.H}" ${FONT} role="img" aria-label="Plan of each storey: rooms, walls, doors, stairs and exits">${lotCtx}${groups}${northScale(g,mp,ox,ox+8,mp.H-30,10)}</svg>`;
  const key=KEY([sw(K.fillHall,'data hall'),sw(K.fillSup,'data-centre support'),sw(K.fillPub,'public programs'),sw(K.fillClin,'clinic'),`<span><i style="background:#fff;border:1px solid ${K.faint}"></i>corridor, stair, lift</span>`,`<span><i style="background:${K.ink};border-radius:50%;width:7px;height:7px;border:0"></i>exit door</span>`,`<span><i class="ln" style="border-color:${K.mute}"></i>lot line</span>`]);
  const draw=`<div class="${NS}wrap">${tabsHtml(zs)}<p class="${NS}cap">Storeys by floor height · street at the bottom</p>${svg}${key}</div>`;
  /* panel */
  const mw=P.ratio&&P.ratio.mwTest, DP=BD.archTest.dcPieces(P), hallM2=DP?DP.L.pieces.filter(q=>q.id==='hall').reduce((t,q)=>t+q.m2,0):null, dock=DP&&DP.L.dock;
  const meters=PL.programs.filter(p=>p.storeys>1).map(p=>({l:short(p.name)+', floor after stairs and lift',v:p.net,lim:p.asked,max:p.asked*1.15,unit:'m²',pass:p.short<=0.5,cap:`${n0(p.net)} of ${n0(p.asked)} m² · needed ${n0(p.asked)} m²`,src:'plan.js net floor'}));
  const tbl=zs.map(z=>{ const rr=roomRows.filter(r=>r[0]===z); return `<tr><th colspan="2">${storeyLabel(z)} storey</th></tr>`+rr.map(r=>`<tr><td>${esc(r[1])}</td><td>${n0(r[2])} m²</td></tr>`).join(''); }).join('');
  const nfl=PL.flags.length, zk=String(x.zone||''), dockGrade=dock&&Math.abs(dock.base||0)<0.1&&(/^I-2/.test(zk)||zk==='I-3')?{why:`strict reading of ${zk==='I-3'?'I-3 s. 2.2.11':'I-2 s. 2.2.7'} allows only entrances; the Emergency hub spec settles it`}:null;
  return {draw,lead:'Every room of the tool’s plan, one storey at a time. The public blocks stand at the street; the data centre sits behind, with its own corridor and stairs.',
    hero:[{v:mw!=null?mw.toFixed(1):C.q(),u:mw!=null?'MW':'',l:'IT load tested'},{v:String(nRooms),l:'rooms on '+zs.length+' storeys'},{v:String(nExit),l:'exit doors drawn'},{v:String(nfl),l:'drawing choices to check',red:nfl>0}],
    rows:[['Data hall',hallM2!=null?`${n0(hallM2)} m², ${P.hall.storeys} storeys`:C.q()],['Loading bays inside',dock?String(dock.n):'none drawn'],['Doors drawn',String(nDoors)],['Shared lobby',C.q('no code source for its size')]].concat(dockGrade?[['Loading dock at grade',C.q(dockGrade.why)]]:[]),
    meters,
    more:[['Every room and its source',`<table class="${NS}tbl">${tbl}</table><p style="margin-top:8px;color:${K.mute}">Sizes: Arrange’s placement (tool/arch.js) and the data-centre rooms (tool/dcrooms.js); walls, doors, stairs and exits: tool/plan.js.</p>`],
      ['What the rule sheet chose',`<p>${Object.values(PL.rules).map(r=>esc(r.why)).join('</p><p style="margin-top:6px">')}</p>`],
      ['What the plan flags',`<p>${PL.flags.length?PL.flags.map(esc).join('</p><p style="margin-top:6px">'):'Nothing.'}</p>`]],
    src:[C.CONTEXT_SRC(x.city),`Plan layer: ${PL.version} (tool/plan.js, register arch_nbc3432). Doorway 0.85 m, corridor 1.1 m and stair 1.1 m are NBC Table 3.4.3.2.-A minimums; every other size is a drawing choice named in the rule sheet.`,'Rooms and blocks: Arrange’s placement of the Emergency hub (refuge side by side, warming shelter, clinic) at Ratios’ defaults (tool/arch.js, tool/dcrooms.js).',`Rooms too small for their name, and not flagged by the plan, are listed in “Every room and its source”.${dropAll.length?' Not labelled on the drawing (no clear straight leader): '+dropAll.map(d=>d.t).join(', ')+'.':''}`],
    missing:['shared lobby (no code source for its size)','door widths from occupant load (check 10)',...(dockGrade?['loading dock at grade: strict reading of I-2 s. 2.2.7 / I-3 s. 2.2.11 allows only entrances, to be settled by the Emergency hub spec']:[])]}; }});

/* ======================= 15 Separations ======================= */
const gapOf=(a,b)=>{ const dx=Math.max(0,b[0]-a[1],a[0]-b[1]), dy=Math.max(0,b[2]-a[3],a[2]-b[3]); return Math.hypot(dx,dy); };
function sharedEdge(a,b){ const e=0.05; if(Math.abs(a[1]-b[0])<e||Math.abs(a[0]-b[1])<e){ const at=Math.abs(a[1]-b[0])<e?a[1]:a[0], f=Math.max(a[2],b[2]), t=Math.min(a[3],b[3]); if(t-f>0.5) return [at,at,f,t]; }
  if(Math.abs(a[3]-b[2])<e||Math.abs(a[2]-b[3])<e){ const at=Math.abs(a[3]-b[2])<e?a[3]:a[2], f=Math.max(a[0],b[0]), t=Math.min(a[1],b[1]); if(t-f>0.5) return [f,t,at,at]; } return null; }
/* the strip of open ground between two blocks that do not touch, as a uv rectangle, or two nearest corners */
function gapStrip(a,b){ const du=Math.max(b[0]-a[1],a[0]-b[1]), dv=Math.max(b[2]-a[3],a[2]-b[3]), ov=[Math.max(a[0],b[0]),Math.min(a[1],b[1])], ow=[Math.max(a[2],b[2]),Math.min(a[3],b[3])];
  if(du>0.05&&ow[1]-ow[0]>0.5){ const u0=a[1]<b[0]?a[1]:b[1]; return [u0,u0+du,ow[0],ow[1]]; }
  if(dv>0.05&&ov[1]-ov[0]>0.5){ const v0=a[3]<b[2]?a[3]:b[3]; return [ov[0],ov[1],v0,v0+dv]; }
  const cu=a[1]<b[0]?[a[1],b[0]]:[b[1],a[0]], cv=a[3]<b[2]?[a[3],b[2]]:[b[3],a[2]]; return [cu[0],cu[1],cv[0],cv[1]]; }
const sepHours=(R,id)=>{ const r=R.find(q=>q.id===id&&/fire separation from the data centre/i.test(q.t)&&!/\?/.test(q.t.replace(/\(F-2\)/,''))), m=r&&/(\d+(?:\.\d+)?) h fire separation/.exec(r.t); return m?+m[1]:null; };

C.add(T,'Separations',{chip:CHIP,async build(x){
  const P=await x.arch(); if(!P) return {draw:'<p class="f1v-empty">No lot loaded.</p>'}; const PL=BD.plan&&BD.plan.build(P); if(!PL||!PL.storeys.length) return {draw:'<p class="f1v-empty">The tool has no plan for this lot (no layout placed).</p>'};
  const g=geo(P), M=g.M, zs=PL.storeys.map(s=>s.z), R=BD.archTest.rules(P);
  let b=[1e9,-1e9,1e9,-1e9]; PL.storeys.forEach(S=>S.rooms.forEach(r=>{ if(r.rect) b=[Math.min(b[0],r.rect[0]),Math.max(b[1],r.rect[1]),Math.min(b[2],r.rect[2]),Math.max(b[3],r.rect[3])]; }));
  const mg=3, mp=mapper(g,[b[0]-mg,b[1]+mg,b[2]-mg,b[3]+mg],450,12), LW=250, W=mp.W+2*LW, ox=LW, id='f1c-a15';
  const lotP=poly(ringPts(M.ring,g,mp).map(p=>[p[0]+ox,p[1]]));
  const P2=r=>{ const q=mp.rect(r); q.x+=ox; return q; }; const line=(a,c,col,w,dash)=>{ const p=mp.lp(a[0],a[2]), q=mp.lp(c[1],c[3]); return `<line x1="${(p[0]+ox).toFixed(1)}" y1="${p[1].toFixed(1)}" x2="${(q[0]+ox).toFixed(1)}" y2="${q[1].toFixed(1)}" stroke="${col}" stroke-width="${w}"${dash?` stroke-dasharray="${dash}"`:''}/>`; };
  let groups=''; const pairs={}; /* per public block: the smallest gap to the data centre on any storey where both stand, and whether the shared edge is drawn */
  zs.forEach((z,i)=>{ const B=blocksAt(P,z), dcs=B.filter(q=>q.dc), pubs=B.filter(q=>!q.dc), rects=[]; let s='';
    B.forEach(q=>{ const r=P2(q.r); r.k=q.id; rects.push(r); s+=rc(r,FILL[q.kind]); });
    const names=[], items=[];
    const big={}; B.forEach(q=>{ const a=(q.r[1]-q.r[0])*(q.r[3]-q.r[2]); if(!big[q.id]||a>big[q.id].a) big[q.id]={a,q}; }); B.filter(q=>big[q.id].q===q).forEach(q=>{ const r=P2(q.r), ln=fitName(short(q.name),r.w,r.h,13.5); if(ln) names.push(ln.map((t,j)=>`<text x="${(r.x+r.w/2).toFixed(1)}" y="${(r.y+r.h/2-(ln.length-1)*8+j*16+5).toFixed(1)}" text-anchor="middle" font-size="13.5" font-weight="500" fill="${K.ink}">${esc(t)}</text>`).join('')); });
    pubs.forEach(p=>{ if(!dcs.length) return; let best=null; dcs.forEach(d=>{ const gp=gapOf(p.r,d.r); if(!best||gp<best.gp) best={gp,d}; });
      const h=sepHours(R,p.id), sh=best.gp<0.05?sharedEdge(p.r,best.d.r):null; const pr=pairs[p.id]=pairs[p.id]||{name:p.name,gap:null,h,touch:false}; pr.gap=pr.gap==null?best.gp:Math.min(pr.gap,best.gp);
      if(sh){ pr.touch=true; s+=line(sh,sh,h==null?K.red:K.ink,h==null?1.6:(h>=2?3.4:1.8),h==null?'5 3':null); }
      else if(h!=null||true){ const st=gapStrip(p.r,best.d.r), q=P2(st), horiz=q.w>=q.h; s+=horiz?`<line x1="${q.x.toFixed(1)}" y1="${(q.y+q.h/2).toFixed(1)}" x2="${(q.x+q.w).toFixed(1)}" y2="${(q.y+q.h/2).toFixed(1)}" stroke="${K.red}" stroke-width="2"/>`:`<line x1="${(q.x+q.w/2).toFixed(1)}" y1="${q.y.toFixed(1)}" x2="${(q.x+q.w/2).toFixed(1)}" y2="${(q.y+q.h).toFixed(1)}" stroke="${K.red}" stroke-width="2"/>`;
        const pts=[0.5,0.15,0.85,0.3,0.7].map(t=>horiz?{x:q.x+q.w*t,y:q.y+q.h/2}:{x:q.x+q.w/2,y:q.y+q.h*t}); items.push({k:'gap|'+p.id,t:short(p.name)+': '+n1(best.gp)+' m apart',s:(h!=null?h+' h needed':'rating ?')+' · blocks do not touch',red:true,pts}); } });
    const L=leaders(items.slice(0,3),rects,ox-14,ox+mp.W+14); s+=names.join('')+leaderSvg(L); if(L.dropped.length) pairs._dropped=(pairs._dropped||[]).concat(L.dropped.map(d=>d.t));
    groups+=`<g data-z="${z}" style="${i?'display:none':''}">${s}</g>`; });
  const svg=`<svg viewBox="0 0 ${W} ${mp.H}" width="${W}" height="${mp.H}" ${FONT} role="img" aria-label="Blocks on each storey and the fire separations between the data centre and the public blocks"><clipPath id="${id}"><rect x="${ox}" y="0" width="${mp.W}" height="${mp.H}"/></clipPath>${ctxG(x,P,g,mp,ox)}<g clip-path="url(#${id})"><path d="${lotP}" fill="#fff" stroke="${K.mute}" stroke-width="0.8"/></g>${groups}${northScale(g,mp,ox,ox+8,mp.H-30,10)}</svg>`;
  const sepLine=(w,c,d)=>`<svg width="22" height="8" style="vertical-align:middle;margin-right:6px"><line x1="0" y1="4" x2="22" y2="4" stroke="${c}" stroke-width="${w}"${d?` stroke-dasharray="${d}"`:''}/></svg>`;
  const key=KEY([sw(K.fillHall,'data hall'),sw(K.fillSup,'data-centre support'),sw(K.fillPub,'public programs'),sw(K.fillClin,'clinic'),`<span>${sepLine(3.4,K.ink)}2 h separation</span>`,`<span>${sepLine(2,K.red)}gap between blocks</span>`,`<span>${sepLine(1.6,K.red,'5 3')}separation, rating ?</span>`]);
  const draw=`<div class="${NS}wrap">${tabsHtml(zs)}<p class="${NS}cap">Storeys by floor height · street at the bottom · only the separations are drawn as lines</p>${svg}${key}</div>`;
  const list=Object.values(pairs).filter(p=>p&&p.name), n2=list.filter(p=>p.h>=2).length, nGap=list.filter(p=>!p.touch&&p.gap>0.05).length;
  const rows=[]; list.forEach(p=>rows.push([short(p.name),(p.h!=null?p.h+' h from the data centre':C.q('rating not in the tool'))])); /* val() shows a string or a ? */
  list.forEach(p=>rows.push([short(p.name)+', distance',p.touch?'touching':n1(p.gap)+' m apart']));
  rows.push(['Exit stair shafts, rating (NBC 3.4.4.1)',C.q()],['Battery and UPS room ratings',C.q()],['Spatial separation, blocks apart (NBC 3.2.3)',C.q()]);
  const rl=R.filter(r=>/fire separation|keep-apart|spacing to the data centre/i.test(r.t));
  return {draw,lead:'Which walls must hold back fire between the data centre and the public blocks, storey by storey. Only the separations are drawn as lines.',
    hero:[{v:String(n2),l:'blocks needing a 2 h separation'},{v:String(nGap),l:'blocks not touching the data centre',red:nGap>0},{v:C.q(),l:'exit stair shafts rated'}],
    rows,
    more:[['The rules behind each line',rl.map(r=>`<p style="margin-bottom:6px">${esc(r.t)} <span style="color:${K.mute}">[${esc((r.src||[]).join(', ')||'no source')}]</span></p>`).join('')||'<p>No separation rules for this layout.</p>']],
    src:['Ratings: BD.archTest.rules(P), from each program’s occupancy group in tool/data/arch.json (NBC Table 3.1.3.1; registers arch_nbc3131, arch_pub_nbcA3121).','Positions and gaps: Arrange’s placement; gap is our arithmetic between the blocks’ rectangles on the same storey (tool/arch.js).',pairs._dropped&&pairs._dropped.length?'Gaps with no clear straight leader are listed in the panel: '+pairs._dropped.join('; ')+'.':'A line is drawn only where the tool has a rating: a dashed red line means the rating is not in the tool.'],
    missing:['exit stair shaft ratings (NBC 3.4.4.1)','battery and UPS room ratings (NFPA 855 / NBC 3.6.2.1)','spatial separation between blocks that do not touch (NBC 3.2.3, not applied)']}; }});

/* ======================= 16 Plant and site ======================= */
const segRectDist=(p,q,r)=>{ /* distance from segment pq to rectangle r=[u0,u1,v0,v1] (0 if it crosses) */ const N=24; let m=1e9; for(let i=0;i<=N;i++){ const t=i/N, u=p[0]+(q[0]-p[0])*t, v=p[1]+(q[1]-p[1])*t, du=Math.max(0,r[0]-u,u-r[1]), dv=Math.max(0,r[2]-v,v-r[3]); m=Math.min(m,Math.hypot(du,dv)); } return m; };
C.add(T,'Plant and site',{chip:CHIP,async build(x){
  const P=await x.arch(); if(!P) return {draw:'<p class="f1v-empty">No lot loaded.</p>'}; const g=geo(P), M=g.M, F=g.F, PLT=M.plant||{}, DP=BD.archTest.dcPieces(P), R=BD.archTest.rules(P), PL=BD.plan&&BD.plan.build(P);
  const lb=ring=>{ let a=1e9,b=-1e9,c=1e9,d=-1e9; for(let i=0;i<ring.length;i+=2){ const [u,v]=F.toL(ring[i],ring[i+1]); a=Math.min(a,u);b=Math.max(b,u);c=Math.min(c,v);d=Math.max(d,v); } return [a,b,c,d]; };
  const mp=mapper(g,lotBox(g,3),470,10), LW=300, W=mp.W+2*LW, ox=LW, id='f1c-a16'; const P2=r=>{ const q=mp.rect(r); q.x+=ox; return q; };
  const lot=ringPts(M.ring,g,mp).map(p=>[p[0]+ox,p[1]]); let s='';
  /* building: the ground storey blocks, flat tints */
  const bld=blocksAt(P,0), brects=[]; bld.forEach(q=>{ const r=P2(q.r); r.k='bld|'+q.id; brects.push(r); s+=rc(r,FILL[q.kind]); });
  /* yards (setback line), plant yard, truck aisle and side drive */
  let setback=''; try{ if(M.inset&&BD.buildArea){ const ba=BD.buildArea(M); if(ba&&ba.length>=6) setback=`<path d="${poly(ringPts(ba,g,mp).map(p=>[p[0]+ox,p[1]]))}" fill="none" stroke="${K.mute}" stroke-width="0.5" stroke-dasharray="4 3"/>`; } }catch(e){}
  let yardP='', yardArea=null, yardPts=null; if(PLT.yard&&BD.geo&&BD.geo.clip){ const cl=BD.geo.clip(M.ring,PLT.yard); if(cl&&cl.length>=6){ yardPts=ringPts(cl,g,mp).map(p=>[p[0]+ox,p[1]]); yardP=`<path d="${poly(yardPts)}" fill="${K.plant}" stroke="${K.ink}" stroke-width="0.8" stroke-dasharray="3 2"/>`; yardArea=BD.area?BD.area(cl):null; } }
  const aisle=[]; if(PLT.truckRing&&PLT.truck) aisle.push({r:lb(PLT.truckRing),t:'truck aisle',k:'truck'}); if(M.sideDrive) aisle.push({r:lb(M.sideDrive.ring),t:'side drive',k:'side'});
  const aisleSvg=aisle.map(a=>{ const q=P2(a.r); return `<g clip-path="url(#${id})">${rc(q,K.hair)}<rect x="${q.x.toFixed(1)}" y="${q.y.toFixed(1)}" width="${q.w.toFixed(1)}" height="${q.h.toFixed(1)}" fill="none" stroke="${K.faint}" stroke-width="0.5" stroke-dasharray="6 4"/></g>`; }).join('');
  /* equipment in the yard */
  const eq=(PLT.boxes||[]).filter(q=>q.kind==='yard'), gens=eq.filter(q=>/generator/i.test(q.name)), eqSvg=eq.map(q=>rc(P2(lb(q.ring)),K.neut)).join('');
  const nGen=gens.length, nRoof=(PLT.boxes||[]).filter(q=>q.kind==='roof').length;
  /* distances the codes set (B139.1.0 Table 2 for the fuel a set holds; our arithmetic from the placement) */
  const gt=PLT.genTank, lotU=[]; for(let i=0;i<M.ring.length;i+=2) lotU.push(F.toL(M.ring[i],M.ring[i+1]));
  const gRects=gens.map(q=>lb(q.ring)); let dLot=null, dBld=null;
  if(gRects.length){ dLot=1e9; for(const r of gRects) for(let i=0;i<lotU.length;i++) dLot=Math.min(dLot,segRectDist(lotU[i],lotU[(i+1)%lotU.length],r));
    const bl=bld.map(q=>q.r); if(bl.length){ dBld=1e9; for(const r of gRects) for(const q of bl) dBld=Math.min(dBld,gapOf(r,q)); } }
  /* leaders: at most four, each at one thing */
  const items=[]; const mid=(r,fx)=>{ const q=P2(r); return [0.5,0.2,0.8,0.35,0.65].map(t=>({x:q.x+q.w*(fx==null?0.5:fx),y:q.y+q.h*t})); };
  if(yardPts){ const xs=yardPts.map(p=>p[0]), ys=yardPts.map(p=>p[1]), x0=Math.min(...xs), x1=Math.max(...xs), y0=Math.min(...ys), y1=Math.max(...ys); items.push({k:'yard',t:'Plant yard',s:`${n0(yardArea)} m² · ${nGen} generator set${nGen===1?'':'s'}${nRoof?` · ${nRoof} on the roof`:''}`,pts:[0.5,0.3,0.7,0.15,0.85].map(t=>({x:(x0+x1)/2,y:y0+(y1-y0)*t}))}); }
  if(M.sideDrive) items.push({k:'side',t:'Side drive',s:`${n1(M.sideDrive.w)} m wide · ${n1(M.sideDrive.inYard)} m in the side yard`,pts:mid(lb(M.sideDrive.ring))});
  else if(PLT.truckRing&&PLT.truck) items.push({k:'truck',t:'Truck aisle',s:`${n1(PLT.truck.aisle)} m wide, ${PLT.truck.type} the dock`,pts:mid(lb(PLT.truckRing))});
  const da=P.dockAccess, dk=DP&&DP.L.dock; if(dk) items.push({k:'dock',t:'Loading dock',s:`${dk.n} bay${dk.n===1?'':'s'}${da?(da.ok?' · trucks reach it':' · trucks cannot reach it'):''}`,red:!!(da&&!da.ok),pts:mid(dk.r)});
  const failLot=gt&&gt.pl!=null&&dLot!=null&&dLot<gt.pl-1e-9;
  const L=leaders(items.slice(0,4),brects,ox-18,ox+mp.W+18), fe=(M.edgeYards||[]).find(e=>e.kind==='front'), sy=mp.lp(lotBox(g,3)[g.dir<0?0:1]+(g.dir<0?3:-3),0)[1]+6, street=fe&&fe.abuts==='street'?`<line x1="${ox}" y1="${sy.toFixed(1)}" x2="${ox+mp.W}" y2="${sy.toFixed(1)}" stroke="${K.faint}" stroke-width="1" stroke-dasharray="6 4"/><text x="${ox+mp.W/2}" y="${(sy+14).toFixed(1)}" text-anchor="middle" font-size="11.5" fill="${K.mute}">street</text>`:'';
  const svg=`<svg viewBox="0 0 ${W} ${mp.H+22}" width="${W}" height="${mp.H+22}" ${FONT} role="img" aria-label="Site plan: lot, building, plant yard, generators, truck aisle and side drive"><clipPath id="${id}"><rect x="${ox}" y="0" width="${mp.W}" height="${mp.H}"/></clipPath>
    ${ctxG(x,P,g,mp,ox)}<path d="${poly(lot)}" fill="#fff" stroke="none"/><g clip-path="url(#${id})">${aisleSvg}${s}${setback}${yardP}${eqSvg}</g><path d="${poly(lot)}" fill="none" stroke="${K.ink}" stroke-width="1.2"/>${street}${leaderSvg(L)}${northScale(g,mp,ox,12,mp.H-30,20)}</svg>`;
  const key=KEY([sw(K.fillHall,'data centre'),sw(K.fillPub,'public programs'),sw(K.fillClin,'clinic'),sw(K.plant,'plant yard (fenced)'),sw(K.neut,'generators and coolers'),sw(K.hair,'truck aisle, side drive'),`<span><i class="ln" style="border-color:${K.mute};border-style:dashed"></i>yard setback</span>`]);
  const draw=`<div class="${NS}wrap">${svg}${key}</div>`;
  /* panel: meters and rows */
  const GN=BD.data.noise&&BD.data.noise.gen, N=M.genNoise, meters=[];
  if(gt&&dLot!=null&&gt.pl!=null) meters.push({l:'Generators to the lot line',v:dLot,lim:gt.pl,max:Math.max(gt.pl*1.15,dLot*1.05),unit:'m',pass:dLot>=gt.pl-1e-9,cap:`${n1(dLot)} m · needed ${n1(gt.pl)} m (set holds ${n0(gt.L)} L)`,src:'CSA B139.1.0 Table 2'});
  if(gt&&dBld!=null&&gt.bld!=null) meters.push({l:'Generators to the building',v:dBld,lim:gt.bld,max:Math.max(gt.bld*1.15,dBld*1.05),unit:'m',pass:dBld>=gt.bld-1e-9,cap:`${n1(dBld)} m · needed ${n1(gt.bld)} m`,src:'CSA B139.1.0 Table 2'});
  if(N&&GN){ if(N.city==='van'){ const lim=GN.van.test; meters.push({l:'Generator test noise at the lot line',v:N.L,lim,max:lim/0.87,unit:'dB(A)',pass:N.ok,cap:`${n1(N.L)} dB(A) at ${n1(N.at)} m · limit ${lim} dB(A)`,src:'By-law 6555 s. 4.1(c)'}); }
    else { const E2=GN.edm; if(N.dr!=null&&isFinite(N.dr)) meters.push({l:'Generator test noise, residential line',v:N.Lr,lim:E2.resTest1h,max:E2.resTest1h/0.87,unit:'dB(A)',pass:N.Lr<=E2.resTest1h+1e-9,cap:`${n1(N.Lr)} dB(A) at ${n1(N.dr)} m · limit ${E2.resTest1h} dB(A)`,src:'C14600 s. 19(3)'});
      if(N.dn!=null&&isFinite(N.dn)) meters.push({l:'Generator test noise, non-residential line',v:N.Ln,lim:E2.nonTest1h,max:E2.nonTest1h/0.87,unit:'dB(A)',pass:N.Ln<=E2.nonTest1h+1e-9,cap:`${n1(N.Ln)} dB(A) at ${n1(N.dn)} m · limit ${E2.nonTest1h} dB(A)`,src:'C14600 s. 21(3)'}); } }
  const fcl=M.grade&&M.grade.fcl, ent=PL&&PL.entrances&&PL.entrances[0], slab=ent&&ent.slab_m;
  const rows=[['Generator sets',`${nGen} in the yard${nRoof?`, ${nRoof} units on the roof`:''}`],['Plant yard',yardArea!=null?n0(yardArea)+' m²':C.q()],
    ['Trucks reach the dock',da?(da.ok?da.how:'no: '+da.why):(dk?C.q():'no dock drawn')],
    ['Flood construction level',fcl?`${n1(fcl.v)} m, ${fcl.datum}`:C.q('not on file for this lot')]];
  if(N&&N.city==='edm'&&N.night) rows.push(['Overnight power cut','over the night limit (flagged)']);
  rows.push(['Fire department access and FDC',C.q()],['Transformers',C.q()],['Fuel truck spot',C.q()]);
  const rl=R.filter(r=>/generator|loading|truck|dock|noise|roof plant/i.test(r.t)&&r.sev!=='x');
  const noteNoise=N?(N.city==='van'?'Generator test, one set at a time, free field (By-law 6555 s. 4.1(c); 78 dB(A) at 7 m, maker claim).':'Generator test, daytime up to 1 h (C14600 s. 19(3), 21(3); 78 dB(A) at 7 m, maker claim).'):'Generator noise: no generator set placed, so not computed.';
  return {draw,lead:'The plant yard, the distances the codes set around it, and the flood level. Equipment that does not fit is reported, never moved.',
    hero:[{v:String(nGen),l:'generator sets in the yard'},{v:yardArea!=null?n0(yardArea):C.q(),u:yardArea!=null?'m²':'',l:'plant yard'},{v:da?(da.ok?'yes':'no'):'–',l:'trucks reach the dock',red:!!(da&&!da.ok)},{v:fcl?n1(fcl.v):C.q(),u:fcl?'m':'',l:'flood construction level'}],
    rows,meters,
    more:[['Rules this card draws on',rl.map(r=>`<p style="margin-bottom:6px">${esc(r.t)} <span style="color:${K.mute}">[${esc((r.src||[]).join(', ')||'no source')}]</span></p>`).join('')||'<p>None.</p>']],
    src:[C.CONTEXT_SRC(x.city),'Plant yard, generators, truck aisle, side drive: the site model (tool/site.js, tool/plant.js) at the Ratios size Arrange tests.','Generator to lot line and to building: B139.1.0 Table 2 for the fuel one set holds (register arch_csa_b139, tool/data/equipment.json); distances are our arithmetic from the placed rectangles.',noteNoise+' Our arithmetic from the tool’s generator sound data (tool/data/noise.json).',`Flood construction level: ${fcl?`${fcl.datum}, register ${fcl.src}${slab!=null?`; slab ${n1(slab)} m, datum against the LiDAR not confirmed (?)`:''}`:'not on file'}.`,`Trucks: ${da?'Arrange’s dock-access test, geometry only, turning not checked (?)':'no dock drawn'} (Parking By-law 5.4.1, register vanParking5).`],
    missing:['fire department access and FDC distances (NBC 3.2.5.5, VBBL 3.2.5.15)','transformer distances (BC Hydro ES54)','fuel truck spot (NFC 4.11.2.4)',...(fcl?[]:['flood construction level for this lot'])]}; }});

/* ======================= 21 Report ======================= */
C.add(T,'Report',{chip:CHIP,async build(x){
  const P=await x.arch(); const PL=P&&BD.plan?BD.plan.build(P):null, R=P?BD.archTest.rules(P):[];
  let TP=BD.TPL; if(!TP||!TP.reports){ try{ TP=await BD.getJSON('templates.json'); }catch(e){} }
  const built=(TP&&TP.reports&&TP.reports.arch)||[]; const bi=built.map(p=>({t:p.title,w:p.what,built:true}));
  const todo=[{t:'Plans',w:'one plan per storey, from the tool’s plan layer'},{t:'Code checks',w:'every rule with its result: pass, flagged or ?'}];
  const pages=[...bi.filter(p=>p.t!=='Sources'),...todo.map(p=>Object.assign(p,{built:false})),...bi.filter(p=>p.t==='Sources')];
  const cnt={note:0,q:0,bad:0}; R.forEach(r=>{ cnt[r.sev]=(cnt[r.sev]||0)+1; });
  const sheet=p=>{ let body=`<div class="wh">${esc(p.w)}</div>`+'<div class="ln"></div>'.repeat(3);
    if(p.t==='Plans'&&PL){ const S=PL.storeys[0]; body=`<div class="wh">${esc(p.w)}</div><div class="wh" style="color:${K.mute}">${PL.storeys.length} storeys, ${S.rooms.length} rooms on the ground storey</div>`+'<div class="ln"></div>'.repeat(2); }
    if(p.t==='Code checks'){ body=`<div class="wh">${esc(p.w)}</div><div class="wh" style="color:${K.mute}">${R.length} rules for this layout: ${cnt.note||0} noted, ${cnt.q||0} with a ?, ${cnt.bad||0} to fix</div>`+'<div class="ln"></div>'.repeat(2); }
    return `<div class="${NS}pg${p.built?'':' todo'}"><div class="sheet"><div class="hd">Beyond Data · Architecture · ${esc(x.addr)}</div><div class="ti">${esc(p.t)}</div>${body}</div><div class="no"><span>${p.built?'built':''}</span>${p.built?'':'<b>not built yet</b>'}</div></div>`; };
  const draw=`<div class="${NS}wrap"><div class="${NS}pages">${pages.map(sheet).join('')}</div>
    <p class="${NS}cap" style="align-self:center;margin-top:6px">Letter pages. Solid frame: the page exists in the tool’s report. Dashed frame: not built yet.</p>
    <button type="button" class="${NS}btn" data-f1c-print>Print or save as PDF</button></div>`;
  const nb=pages.filter(p=>!p.built).length;
  return {draw,lead:'The report keeps the pages the tool already builds and adds a plans page and a code-checks page. Every figure keeps its source.',
    hero:[{v:String(built.length),l:'pages the tool builds today'},{v:String(nb),l:'pages not built yet',red:nb>0}],
    rows:[['Pages in the preview',String(pages.length)],['Export','Print or save as PDF (window.print)'],['Licensed data','none on these pages'],['Plans and checks pages',C.q('not built into the report yet')]],
    more:pages.map(p=>[p.t+(p.built?'':' (not built yet)'),`<p>${esc(p.w)}</p>`]),
    src:['Built pages: the report plan for the Architecture template in tool/templates.json (reports.arch), drawn by tool/report3.js.','Plans page: the plan layer (tool/plan.js). Code-checks page: BD.archTest.rules(P) counts for this layout. Neither is built into the report yet.','Export: the browser’s print dialog. The report’s own PDF (tool/report3.js, jsPDF) is not wired to these cards.'],
    missing:['plans page in the report','code-checks page in the report','section or 3-D drawing page for the report','PDF export from these cards (print only)']}; }});
})();
