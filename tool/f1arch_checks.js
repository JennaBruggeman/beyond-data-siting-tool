/* Beyond Data — F1 Architecture cards, group 'checks' (CODE_JOB_F1 step 2). Registers its cards with BD.f1cards (see f1cards.js, f1arch.js).
   14 Rooms · 15 Separations · 16 Exits · 17 Plant and site · 22 Report (F1c: one shared schematic plan per storey, planFor). Every figure comes from the tool: Arrange's placement (BD.archTest.place via x.arch()), the plan layer
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
.${NS}wrap svg{max-width:100%;height:auto}
.${NS}ttl{align-self:flex-start;display:flex;flex-direction:column;gap:2px;font-size:13px;color:${K.ink}}.${NS}ttl b{font-weight:500}.${NS}ttl span{font-size:11.5px;color:${K.mute}}
.${NS}sch{width:100%;max-width:640px}.${NS}sch table{width:100%;border-collapse:collapse;font-size:12.5px}.${NS}sch th{text-align:left;font-weight:500;font-size:11.5px;color:${K.mute};padding:4px 0;border-bottom:1px solid ${K.rule}}.${NS}sch td{padding:3px 0;border-bottom:1px solid ${K.hair};vertical-align:top}.${NS}sch th:first-child,.${NS}sch td:first-child{width:42px;color:${K.mute}}.${NS}sch th:last-child,.${NS}sch td:last-child{text-align:right;white-space:nowrap;width:70px}.${NS}sch .warn td{color:${K.ink2}}.${NS}fl{color:${K.red};font-size:11.5px}
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
      w.querySelectorAll('[data-z]:not(button)').forEach(g=>{ g.style.display=g.dataset.z===b.dataset.z?'':'none'; }); return; }
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

/* the blocks on one storey, for the separation drawing: data-centre rooms (dcPieces) and program storeys (Arrange's boxes) */
function blocksAt(P,z){ const DP=BD.archTest.dcPieces(P), out=[]; const at=b=>Math.abs(Math.round(b*10)/10-z)<0.06;
  (DP?DP.L.pieces:[]).filter(q=>q.r&&at(q.base)).forEach(q=>out.push({r:q.r,kind:q.id==='hall'?'hall':'sup',name:q.name,id:q.id,dc:true}));
  (P.boxes||[]).forEach(b=>{ const n=b.storeys||1, sh=b.sh||(b.h/n); for(let k=0;k<n;k++) if(Math.abs(Math.round((b.base+k*sh)*10)/10-z)<0.06) out.push({r:[b.u[0],b.u[1],b.v[0],b.v[1]],kind:b.id==='clinic'?'clin':'pub',name:b.p.name,id:b.id,dc:false,own:!!b.own}); });
  return out; }
const FILL={hall:K.fillHall,sup:K.fillSup,pub:K.fillPub,clin:K.fillClin};
const KEY=(items)=>`<div class="f1c-key">${items.join('')}</div>`;
const sw=(c,t)=>`<span><i style="background:${c};border-color:${c}"></i>${t}</span>`;
const HATCH=`repeating-linear-gradient(90deg,#fff 0 2px,${K.mute} 2px 3px)`;
const RQ=`<b style="color:${K.red};font-weight:500">?</b>`;

/* ======================= the shared plan (one per layout; Rooms, Separations and Exits all draw from it) ======================= */
const PLANC={};
/* street names (J.B. 8 Nov 2026): the street files carry no names; the front street takes the street part of the lot's own address, and any other
   street segment (every street of a corner lot) is named from the addresses of the lots that front it (tool/streetnames.js, our method); lanes, and segments whose fronting addresses
   do not agree (at least 2, more than half), stay 'street name ?' */
const SG={}; async function sgReady(x){ if(!(x.city in SG)) SG[x.city]=BD.streets?await BD.streets(x.city):null; }
const SNCAP=' · other street names: named from fronting lot addresses (our method)';
const SNSRC='Street names: a lot on one street takes it from its own address; other streets, and every street of a corner lot, are named from fronting lot addresses (our method: tool/streetnames.js; only lots on one street vote; a segment takes the street most of them (at least 2) are addressed on; otherwise, and for lanes, “street name ?”). The City street files hold no names.';
function planFor(x,P){
  const key=[x.city,(BD.S.sel||{}).id,P.s.dir,JSON.stringify([P.hall.u,P.hall.v,P.hall.base,P.hall.storeys,P.hall.h]),JSON.stringify((P.boxes||[]).map(b=>[b.id,b.u,b.v,b.base,b.storeys,b.h,b.front])),(P.s.M.ring||[]).slice(0,4).join(',')].join('|');
  if(PLANC.k===key&&PLANC.v) return PLANC.v;
  const A=BD.archTest, PL=BD.plan&&BD.plan.build(P); if(!PL||!PL.storeys.length) return null;
  const g=geo(P), M=g.M, zs=PL.storeys.map(s=>s.z);
  let b=[1e9,-1e9,1e9,-1e9]; PL.storeys.forEach(S=>S.rooms.forEach(r=>{ if(r.rect) b=[Math.min(b[0],r.rect[0]),Math.max(b[1],r.rect[1]),Math.min(b[2],r.rect[2]),Math.max(b[3],r.rect[3])]; }));
  const mg=5, mp=mapper(g,[b[0]-mg,b[1]+mg,b[2]-mg,b[3]+mg],440,12), LW=240, W=mp.W+2*LW, ox=LW;
  const pt=(u,v)=>{ const q=mp.lp(u,v); return [q[0]+ox,q[1]]; }, pr=r=>{ const q=mp.rect(r); q.x+=ox; return q; };
  const f1=v=>v.toFixed(1);
  const lotPts=ringPts(M.ring,g,mp).map(p=>[p[0]+ox,p[1]]), lotP=poly(lotPts);
  /* sized from a source: the data-centre rooms that have a per-MW figure with a source; the program blocks with a requested floor area */
  const DP=A.dcPieces(P), srcd=new Set(['dock']); (DP?DP.L.rooms:[]).forEach(r=>{ if(r.perMW!=null&&r.src&&r.src.length) srcd.add(r.id); });
  const progSrc={}; (P.boxes||[]).forEach(bx=>{ progSrc[bx.id]=!!(bx.q&&bx.q.m2); });
  const fillOf=o=>o.block==='data centre'?(o.id==='hall'?K.fillHall:K.fillSup):o.block==='clinic'?K.fillClin:K.fillPub;
  let nNoAcc=0, nNoCorr=0, nRooms=0;
  const stor=PL.storeys.map((S,i)=>{
    const rooms=[], by=new Map();
    S.rooms.forEach(r=>{ const k=r.block+'|'+r.id; let o=by.get(k); if(!o){ o={k,block:r.block,id:r.id,name:r.name,m2:0,parts:[]}; by.set(k,o); rooms.push(o); } o.m2+=r.m2||0; if(r.rect) o.parts.push(r); });
    const thr=new Map(S.doors.filter(d=>d.through).map(d=>[d.room,d.to])), hasD=new Set(S.doors.map(d=>d.room).filter(Boolean)), noCorr=S.corridors.length===0;
    rooms.forEach((o,j)=>{ o.n=j+1; o.drawn=o.parts.length>0; o.sourced=o.block==='data centre'?srcd.has(o.id):!!progSrc[o.id];
      o.flag=o.block==='data centre'?(thr.has(o.id)?'through':(o.drawn&&!hasD.has(o.id)?'noway':null)):(noCorr?'nocorr':null);
      if(o.flag==='through'){ const t=rooms.find(q=>q.id===thr.get(o.id)&&q.block==='data centre'); o.via=t?short(t.name):'another room'; } });
    nRooms+=rooms.length; nNoAcc+=rooms.filter(o=>o.flag).length; if(noCorr) nNoCorr++;
    return {i,z:S.z,S,rooms,noCorr}; });
  /* the plan of one storey: mode 'color' (Rooms) or 'grey' (Separations, Exits) */
  const centre=(S,block)=>{ let a=[1e9,-1e9,1e9,-1e9]; S.rooms.filter(r=>r.rect&&r.block===block).forEach(r=>{ a=[Math.min(a[0],r.rect[0]),Math.max(a[1],r.rect[1]),Math.min(a[2],r.rect[2]),Math.max(a[3],r.rect[3])]; }); return [(a[0]+a[1])/2,(a[2]+a[3])/2]; };
  const doorLine=(d,col,w)=>{ const h=d.w/2, a=d.along==='v'?pt(d.u,d.v-h):pt(d.u-h,d.v), c=d.along==='v'?pt(d.u,d.v+h):pt(d.u+h,d.v); return `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(c[0])}" y2="${f1(c[1])}" stroke="${col}" stroke-width="${w}"/>`; };
  const tick=(S,e,len,col,w)=>{ const [cu,cv]=centre(S,e.block), sg=e.along==='v'?(e.u>cu?1:-1):(e.v>cv?1:-1), p=pt(e.u,e.v), q=e.along==='v'?pt(e.u+sg,e.v):pt(e.u,e.v+sg); let dx=q[0]-p[0], dy=q[1]-p[1]; const l=Math.hypot(dx,dy)||1; dx=dx/l*len; dy=dy/l*len;
    return `<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(p[0]+dx)}" y2="${f1(p[1]+dy)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`; };
  const treads=(r,col)=>{ const q=pr(r), vert=q.h>=q.w, n=Math.max(4,Math.round((vert?q.h:q.w)/(0.28*mp.s))); let s=''; for(let k=1;k<n;k++){ const t=(vert?q.y+q.h*k/n:q.x+q.w*k/n); s+=vert?`<line x1="${f1(q.x)}" y1="${f1(t)}" x2="${f1(q.x+q.w)}" y2="${f1(t)}" stroke="${col}" stroke-width="0.5"/>`:`<line x1="${f1(t)}" y1="${f1(q.y)}" x2="${f1(t)}" y2="${f1(q.y+q.h)}" stroke="${col}" stroke-width="0.5"/>`; } return s; };
  const layer=(st,mode)=>{ const S=st.S, col=mode==='color', wc=col?K.ink:'#C4C5C7'; let s='';
    st.rooms.forEach(o=>o.parts.forEach(r=>{ s+=rc(pr(r.rect),col?fillOf(o):'#F2F2F2'); }));
    S.corridors.forEach(c=>{ s+=rc(pr(c.rect),'#fff'); });
    S.stairs.forEach(c=>{ s+=rc(pr(c.rect),'#fff')+treads(c.rect,col?K.mute:'#D5D6D8'); });
    S.lifts.forEach(c=>{ const q=pr(c.rect); s+=rc(q,'#fff')+`<line x1="${f1(q.x)}" y1="${f1(q.y)}" x2="${f1(q.x+q.w)}" y2="${f1(q.y+q.h)}" stroke="${col?K.mute:'#D5D6D8'}" stroke-width="0.5"/><line x1="${f1(q.x+q.w)}" y1="${f1(q.y)}" x2="${f1(q.x)}" y2="${f1(q.y+q.h)}" stroke="${col?K.mute:'#D5D6D8'}" stroke-width="0.5"/>`; });
    S.walls.forEach(w=>{ const a=w.axis==='u'?pt(w.at,w.from):pt(w.from,w.at), c=w.axis==='u'?pt(w.at,w.to):pt(w.to,w.at);
      s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(c[0])}" y2="${f1(c[1])}" stroke="${wc}" stroke-width="${col?(w.exterior?1.4:0.7):(w.exterior?1:0.6)}" stroke-linecap="square"/>`; });
    S.doors.forEach(d=>{ s+=doorLine(d,'#fff',3); }); S.exits.forEach(d=>{ s+=doorLine(d,'#fff',3.4); });
    if(col){ S.exits.filter(e=>e.kind!=='loading').forEach(e=>{ s+=tick(S,e,9,K.ink,2.4); });
      st.rooms.filter(o=>o.drawn).forEach(o=>{ const big=o.parts.slice().sort((a,c)=>(c.m2||0)-(a.m2||0))[0], q=pr(big.rect), sm=Math.min(q.w,q.h)<16; s+=`<text x="${f1(q.x+q.w/2)}" y="${f1(q.y+q.h/2+(sm?3.5:4.5))}" text-anchor="middle" font-size="${sm?10:12.5}" font-weight="500" fill="${K.ink}">${o.n}</text>`; }); }
    return s; };
  /* street names along their edges (see SNSRC above) */
  let snUsed=false; const streets=(()=>{ const ey=(M.edgeYards||[]).filter(e=>e.abuts==='street'||e.abuts==='alley'); if(!ey.length) return ''; const nm=String(x.addr||'').replace(/^\s*\S*\d\S*\s+/,'').replace(/,.*$/,'').trim();
    const SNE=SG[x.city]&&BD.streetNames?BD.streetNames.edgeNames(SG[x.city],BD.S.tiles,x.city,M.ring,150):null;
    const cx=lotPts.reduce((t,p)=>t+p[0],0)/lotPts.length, cy=lotPts.reduce((t,p)=>t+p[1],0)/lotPts.length; let o=''; const done=[];
    ey.slice(0,4).forEach(e=>{ const a=g.F.toL(e.ax,e.ay), c=g.F.toL(e.bx,e.by), pa=pt(a[0],a[1]), pc=pt(c[0],c[1]), mx=(pa[0]+pc[0])/2, my=(pa[1]+pc[1])/2; let nx=mx-cx, ny=my-cy; const l=Math.hypot(nx,ny)||1; nx/=l; ny/=l;
      const vert=Math.abs(pc[1]-pa[1])>Math.abs(pc[0]-pa[0]); let px=mx+nx*11, py=my+ny*11; px=Math.max(ox+10,Math.min(ox+mp.W-10,px)); py=Math.max(14,Math.min(mp.H-8,py));
      const sn=SNE&&e.abuts!=='alley'?SNE.at(e.ax,e.ay,e.bx,e.by):null, lab=e.abuts==='alley'?'lane':(e.kind==='front'&&nm&&(!SNE||SNE.ownSegs<=1)?nm:(sn&&sn.name?(snUsed=true,sn.name):'street name ?')), red=lab==='street name ?';
      if(done.some(d=>d[0]===lab&&Math.hypot(d[1]-px,d[2]-py)<70)) return; done.push([lab,px,py]);
      o+=`<text x="${f1(px)}" y="${f1(py)}" text-anchor="middle" font-size="11.5" fill="${red?K.red:K.mute}" stroke="#fff" stroke-width="3" paint-order="stroke"${vert?` transform="rotate(-90 ${f1(px)} ${f1(py)})"`:''}>${esc(lab)}</text>`; }); return o; })();
  const v={PL,g,M,mp,ox,W,H:mp.H,LW,zs,stor,pt,pr,lotP,streets,snUsed,layer,doorLine,tick,treads,fillOf,DP,centre,f1,counts:{nNoAcc,nNoCorr,nRooms}};
  PLANC.k=key; PLANC.v=v; return v; }
/* the svg around the storey groups: site context, lot, storeys, street names, north arrow, scale bar */
function planSvg(x,P,pl,id,label,groups){ const {g,mp,ox,W}=pl;
  return `<svg viewBox="0 0 ${W} ${mp.H}" width="${W}" height="${mp.H}" ${FONT} role="img" aria-label="${esc(label)}"><clipPath id="${id}"><rect x="${ox}" y="0" width="${mp.W}" height="${mp.H}"/></clipPath>${ctxG(x,P,g,mp,ox)}<g clip-path="url(#${id})"><path d="${pl.lotP}" fill="#fff" stroke="${K.mute}" stroke-width="0.8"/></g>${groups}${pl.streets}${northScale(g,mp,ox,ox+8,mp.H-30,10)}</svg>`; }
const stTitle=(pl,st)=>{ const blocks=[]; st.rooms.forEach(o=>{ const b=o.block==='data centre'?'data centre':short(o.name); if(!blocks.includes(b)) blocks.push(b); });
  return `<div data-z="${st.z}" class="${NS}ttl" style="${st.i?'display:none':''}"><b>Storey ${st.i+1} · floor at ${n1(st.z)} m</b><span>${esc(blocks.join(', '))}</span></div>`; };

/* ======================= 14 Rooms ======================= */
C.add(T,'Rooms',{chip:CHIP,async build(x){
  const P=await x.arch(); if(!P) return {draw:'<p class="f1v-empty">No lot loaded.</p>'}; await sgReady(x); const pl=BD.plan&&planFor(x,P); if(!pl) return {draw:'<p class="f1v-empty">The tool has no plan for this lot (no layout placed).</p>'};
  const {PL,mp,zs,stor}=pl; let nDoors=0, nExit=0; const roomRows=[];
  let groups='', titles='', sched='';
  stor.forEach(st=>{ const S=st.S; groups+=`<g data-z="${st.z}" style="${st.i?'display:none':''}">${pl.layer(st,'color')}</g>`; titles+=stTitle(pl,st);
    nDoors+=S.doors.length; nExit+=S.exits.filter(e=>e.kind!=='loading').length;
    const rows=st.rooms.map(o=>{ roomRows.push([st.z,o.name,o.m2]); const note=o.flag==='through'?` ${RQ} <span class="${NS}fl">opens through ${esc(o.via)}</span>`:o.flag==='noway'?` ${RQ} <span class="${NS}fl">no way in</span>`:o.flag==='nocorr'?` ${RQ} <span class="${NS}fl">no corridor</span>`:'';
      return `<tr><td>${o.drawn?o.n:o.n+'*'}</td><td>${esc(o.name)}${note}</td><td>${n0(o.m2)}${o.sourced?'':' '+RQ}</td></tr>`; }).join('');
    sched+=`<div data-z="${st.z}" class="${NS}sch" style="${st.i?'display:none':''}"><table><thead><tr><th>No.</th><th>Room</th><th>m²</th></tr></thead><tbody>${st.noCorr?`<tr class="warn"><td></td><td colspan="2">No corridor or shared lobby on this storey ${RQ}</td></tr>`:''}${rows}</tbody></table></div>`; });
  const hasStarred=stor.some(st=>st.rooms.some(o=>!o.drawn));
  const key=KEY([sw(K.fillHall,'data hall'),sw(K.fillSup,'data-centre support'),sw(K.fillPub,'public programs'),sw(K.fillClin,'clinic'),`<span><i style="background:#fff;border:1px solid ${K.faint}"></i>corridor, lobby</span>`,`<span><i style="background:${HATCH};border:1px solid ${K.mute}"></i>stair (lift: cross)</span>`,`<span><i style="width:3px;height:11px;background:${K.ink};border:0;border-radius:1px"></i>exit door</span>`,`<span>${RQ}&nbsp;no sourced size, or no corridor access</span>`]);
  const draw=`<div class="${NS}wrap">${tabsHtml(zs)}${key}<p class="${NS}cap">Rooms are numbered; the schedule under the plan names them · street at the bottom${hasStarred?' · * not a rectangle, listed but not drawn':''}${pl.snUsed?SNCAP:''}</p>${titles}${planSvg(x,P,pl,'f1c-a14','Plan of each storey: numbered rooms, walls, doors, stairs and exits',groups)}${sched}</div>`;
  const mw=P.ratio&&P.ratio.mwTest, hallM2=pl.DP?pl.DP.L.pieces.filter(q=>q.id==='hall').reduce((t,q)=>t+q.m2,0):null, dock=pl.DP&&pl.DP.L.dock;
  const meters=PL.programs.filter(p=>p.storeys>1).map(p=>({l:short(p.name)+', floor after stairs and lift',v:p.net,lim:p.asked,max:p.asked*1.15,unit:'m²',pass:p.short<=0.5,cap:`${n0(p.net)} of ${n0(p.asked)} m² · needed ${n0(p.asked)} m²`,src:'plan.js net floor'}));
  const tbl=zs.map(z=>{ const rr=roomRows.filter(r=>r[0]===z); return `<tr><th colspan="2">${storeyLabel(z)} storey</th></tr>`+rr.map(r=>`<tr><td>${esc(r[1])}</td><td>${n0(r[2])} m²</td></tr>`).join(''); }).join('');
  const cn=pl.counts, zk=String(x.zone||''), dockGrade=dock&&Math.abs(dock.base||0)<0.1&&(/^I-2/.test(zk)||zk==='I-3')?{why:`strict reading of ${zk==='I-3'?'I-3 s. 2.2.11':'I-2 s. 2.2.7'} allows only entrances; the Emergency hub spec settles it`}:null;
  const noAccList=stor.flatMap(st=>st.rooms.filter(o=>o.flag).map(o=>`${esc(o.name)} (${storeyLabel(st.z)}): ${o.flag==='through'?'opens through '+esc(o.via):o.flag==='noway'?'no way in':'storey has no corridor or shared lobby'}`));
  const unsrc=[...new Set(stor.flatMap(st=>st.rooms.filter(o=>!o.sourced).map(o=>short(o.name))))];
  return {draw,lead:'One plan per storey: every room numbered, with a schedule under it. The plan shows the tool’s layout as it is, including rooms that open through other rooms.',
    hero:[{v:mw!=null?mw.toFixed(1):C.q(),u:mw!=null?'MW':'',l:'IT load tested'},{v:String(cn.nRooms),l:'rooms on '+zs.length+' storeys'},{v:String(nExit),l:'exit doors drawn'},{v:String(cn.nNoAcc),l:'rooms without corridor access',red:cn.nNoAcc>0}],
    rows:[['Rooms without corridor access',`${cn.nNoAcc}${cn.nNoCorr?` · ${cn.nNoCorr} of ${zs.length} storeys have no corridor or shared lobby`:''}`],['Data hall',hallM2!=null?`${n0(hallM2)} m², ${P.hall.storeys} storeys`:C.q()],['Loading bays inside',dock?String(dock.n):'none drawn'],['Doors drawn',String(nDoors)],['Shared lobby',C.q('no code source for its size')]].concat(dockGrade?[['Loading dock at grade',C.q(dockGrade.why)]]:[]),
    meters,
    more:[['Rooms without corridor access',`<p>${noAccList.length?noAccList.join('</p><p style="margin-top:6px">'):'None.'}</p><p style="margin-top:8px;color:${K.mute}">Read from the plan’s doors: a room whose doors all open into other rooms, or that has none; and every room on a storey with no corridor or shared lobby. The layout is not changed here.</p>`],
      ['Every room and its source',`<table class="${NS}tbl">${tbl}</table><p style="margin-top:8px;color:${K.mute}">Sizes: Arrange’s placement (tool/arch.js) and the data-centre rooms (tool/dcrooms.js); walls, doors, stairs and exits: tool/plan.js.</p>`],
      ['What the rule sheet chose',`<p>${Object.values(PL.rules).map(r=>esc(r.why)).join('</p><p style="margin-top:6px">')}</p>`],
      ['What the plan flags',`<p>${PL.flags.length?PL.flags.map(esc).join('</p><p style="margin-top:6px">'):'Nothing.'}</p>`]],
    src:[C.CONTEXT_SRC(x.city),SNSRC,`Plan layer: ${PL.version} (tool/plan.js, register arch_nbc3432). Doorway 0.85 m, corridor 1.1 m and stair 1.1 m are NBC Table 3.4.3.2.-A minimums; every other size is a drawing choice named in the rule sheet.`,'Rooms and blocks: Arrange’s placement of the Emergency hub (refuge side by side, warming shelter, clinic) at Ratios’ defaults (tool/arch.js, tool/dcrooms.js).',`Area marked ? has no sourced size (the tool has no per-MW figure or requested area for it): ${unsrc.length?unsrc.join(', '):'none'}.`,'Street names: the tool’s street lines carry no names; the front street is the street part of the address, other streets are shown as ? (tool/streets_<city>.json).'],
    missing:['shared lobby (no code source for its size)','door widths from occupant load (check 10)','names of street segments whose fronting lot addresses do not agree',...(unsrc.length?['sourced sizes for: '+unsrc.join(', ')]:[]),...(dockGrade?['loading dock at grade: strict reading of I-2 s. 2.2.7 / I-3 s. 2.2.11 allows only entrances, to be settled by the Emergency hub spec']:[])]}; }});

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
  const P=await x.arch(); if(!P) return {draw:'<p class="f1v-empty">No lot loaded.</p>'}; await sgReady(x); const pl=BD.plan&&planFor(x,P); if(!pl) return {draw:'<p class="f1v-empty">The tool has no plan for this lot (no layout placed).</p>'};
  const {mp,ox,zs,stor,pt,pr}=pl, R=BD.archTest.rules(P), f1=pl.f1;
  const lineSh=(a,col,w,dash)=>{ const p=pt(a[0],a[2]), q=pt(a[1],a[3]); return `<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="${col}" stroke-width="${w}"${dash?` stroke-dasharray="${dash}"`:''}/>`; };
  let groups='', titles=''; const pairs={}, hrs=new Set();
  stor.forEach(st=>{ const z=st.z, B=blocksAt(P,z), dcs=B.filter(q=>q.dc), pubs=B.filter(q=>!q.dc), rects=[]; let s=pl.layer(st,'grey'); const items=[];
    B.forEach(q=>{ const r=pr(q.r); r.k=q.id; rects.push(r); });
    pubs.forEach(p=>{ if(!dcs.length) return; let best=null; dcs.forEach(d=>{ const gp=gapOf(p.r,d.r); if(!best||gp<best.gp) best={gp,d}; });
      const h=sepHours(R,p.id), sh=best.gp<0.05?sharedEdge(p.r,best.d.r):null; const pr0=pairs[p.id]=pairs[p.id]||{name:p.name,gap:null,h,touch:false}; pr0.gap=pr0.gap==null?best.gp:Math.min(pr0.gap,best.gp);
      if(sh){ pr0.touch=true; if(h!=null) hrs.add(h); s+=lineSh(sh,h==null?K.red:K.ink,h==null?1.8:(h>=2?4:2),h==null?'5 3':null); }
      else { const st2=gapStrip(p.r,best.d.r), q=pr(st2), horiz=q.w>=q.h; s+=horiz?`<line x1="${f1(q.x)}" y1="${f1(q.y+q.h/2)}" x2="${f1(q.x+q.w)}" y2="${f1(q.y+q.h/2)}" stroke="${K.red}" stroke-width="2"/>`:`<line x1="${f1(q.x+q.w/2)}" y1="${f1(q.y)}" x2="${f1(q.x+q.w/2)}" y2="${f1(q.y+q.h)}" stroke="${K.red}" stroke-width="2"/>`;
        const pts=[0.5,0.15,0.85,0.3,0.7].map(t=>horiz?{x:q.x+q.w*t,y:q.y+q.h/2}:{x:q.x+q.w/2,y:q.y+q.h*t}); items.push({k:'gap|'+p.id,t:short(p.name)+': '+n1(best.gp)+' m apart',s:(h!=null?h+' h needed':'rating ?')+' · blocks do not touch',red:true,pts}); } });
    const L=leaders(items.slice(0,3),rects,ox-14,ox+mp.W+14); s+=leaderSvg(L); if(L.dropped.length) pairs._dropped=(pairs._dropped||[]).concat(L.dropped.map(d=>d.t));
    groups+=`<g data-z="${z}" style="${st.i?'display:none':''}">${s}</g>`; titles+=stTitle(pl,st); });
  const svg=planSvg(x,P,pl,'f1c-a15','Plan of each storey, greyed back, with the fire separations between the data centre and the public blocks drawn on top',groups);
  const sepLine=(w,c,d)=>`<svg width="22" height="8" style="vertical-align:middle;margin-right:6px"><line x1="0" y1="4" x2="22" y2="4" stroke="${c}" stroke-width="${w}"${d?` stroke-dasharray="${d}"`:''}/></svg>`;
  const ratings=[...hrs].sort((a,b)=>b-a).map(h=>`<span>${sepLine(h>=2?4:2,K.ink)}${h} h separation</span>`);
  const key=KEY([...(ratings.length?ratings:[`<span>${sepLine(4,K.ink)}2 h separation</span>`]),`<span>${sepLine(2,K.red)}gap between blocks</span>`,`<span>${sepLine(1.8,K.red,'5 3')}separation, rating ?</span>`,`<span><i style="background:#F2F2F2;border:1px solid #C4C5C7"></i>plan, greyed back</span>`]);
  const draw=`<div class="${NS}wrap">${tabsHtml(zs)}${key}<p class="${NS}cap">Same plan as Rooms · street at the bottom · only the separations are drawn on top${pl.snUsed?SNCAP:''}</p>${titles}${svg}</div>`;
  const list=Object.values(pairs).filter(p=>p&&p.name), n2=list.filter(p=>p.h>=2).length, nGap=list.filter(p=>!p.touch&&p.gap>0.05).length;
  const rows=[]; list.forEach(p=>rows.push([short(p.name),(p.h!=null?p.h+' h from the data centre':C.q('rating not in the tool'))])); /* val() shows a string or a ? */
  list.forEach(p=>rows.push([short(p.name)+', distance',p.touch?'touching':n1(p.gap)+' m apart']));
  rows.push(['Exit stair shafts, rating (NBC 3.4.4.1)',C.q()],['Battery and UPS room ratings',C.q()],['Spatial separation, blocks apart (NBC 3.2.3)',C.q()]);
  const rl=R.filter(r=>/fire separation|keep-apart|spacing to the data centre/i.test(r.t));
  return {draw,lead:'Which walls must hold back fire between the data centre and the public blocks, storey by storey. The plan is greyed back; only the separations are drawn.',
    hero:[{v:String(n2),l:'blocks needing a 2 h separation'},{v:String(nGap),l:'blocks not touching the data centre',red:nGap>0},{v:C.q(),l:'exit stair shafts rated'}],
    rows,
    more:[['The rules behind each line',rl.map(r=>`<p style="margin-bottom:6px">${esc(r.t)} <span style="color:${K.mute}">[${esc((r.src||[]).join(', ')||'no source')}]</span></p>`).join('')||'<p>No separation rules for this layout.</p>']],
    src:[C.CONTEXT_SRC(x.city),SNSRC,'Ratings: BD.archTest.rules(P), from each program’s occupancy group in tool/data/arch.json (NBC Table 3.1.3.1; registers arch_nbc3131, arch_pub_nbcA3121).','Positions and gaps: Arrange’s placement; gap is our arithmetic between the blocks’ rectangles on the same storey (tool/arch.js). Plan underneath: tool/plan.js, the same drawing as Rooms.',pairs._dropped&&pairs._dropped.length?'Gaps with no clear straight leader are listed in the panel: '+pairs._dropped.join('; ')+'.':'A line is drawn only where the tool has a rating: a dashed red line means the rating is not in the tool.'],
    missing:['exit stair shaft ratings (NBC 3.4.4.1)','battery and UPS room ratings (NFPA 855 / NBC 3.6.2.1)','spatial separation between blocks that do not touch (NBC 3.2.3, not applied)']}; }});

/* ======================= 16 Exits ======================= */
C.add(T,'Exits',{chip:CHIP,async build(x){
  const P=await x.arch(); if(!P) return {draw:'<p class="f1v-empty">No lot loaded.</p>'}; await sgReady(x); const pl=BD.plan&&planFor(x,P); if(!pl) return {draw:'<p class="f1v-empty">The tool has no plan for this lot (no layout placed).</p>'};
  const {PL,mp,zs,stor,pt}=pl, f1=pl.f1, van=x.city==='van', clause=van?'VBBL 3.4.2.3':'NBC 3.4.2.3', reg=van?'register vbbl25_3423':'register arch_nbc3432';
  const ES=PL.exitSep||[]; let groups='', titles='', nExit=0, nDim=0; const dropped=[];
  stor.forEach(st=>{ const S=st.S; let s=pl.layer(st,'grey');
    S.stairs.forEach(c=>{ const q=pl.pr(c.rect); s+=rc(q,K.ink,' fill-opacity="0.16"')+pl.treads(c.rect,K.ink2)+`<rect x="${f1(q.x)}" y="${f1(q.y)}" width="${f1(q.w)}" height="${f1(q.h)}" fill="none" stroke="${K.ink}" stroke-width="1"/>`; });
    S.doors.filter(d=>/_stair_[AB]$/.test(d.from||'')).forEach(d=>{ s+=pl.doorLine(d,K.ink,3); });
    S.exits.forEach(e=>{ if(e.kind==='loading') return; s+=pl.doorLine(e,K.ink,3.4)+pl.tick(S,e,12,K.ink,2.6); });
    /* exit spacing: the two stair doors of one block, nearest door edges (plan.js exitSep) */
    const grp={}; S.doors.forEach(d=>{ const m=/^(.*)_stair_([AB])$/.exec(d.from||''); if(m){ (grp[m[1]]=grp[m[1]]||{})[m[2]]=d; } });
    const dims=[]; Object.keys(grp).forEach(k=>{ const a=grp[k].A, b=grp[k].B; if(!a||!b) return; const nm=k==='dc'?'data centre':(()=>{ const bx=(P.boxes||[]).find(q=>q.id===k); return bx?bx.p.name:k; })(), es=ES.find(e=>e.block===nm); if(!es) return; dims.push({a,b,es,nm}); });
    dims.slice(0,4).forEach(d=>{ const pa=pt(d.a.u,d.a.v), pb=pt(d.b.u,d.b.v), dm=Math.hypot(d.a.u-d.b.u,d.a.v-d.b.v)||1, ta=(d.a.w/2)/dm, tb=(d.b.w/2)/dm;
      const p0=[pa[0]+(pb[0]-pa[0])*ta,pa[1]+(pb[1]-pa[1])*ta], p1=[pb[0]+(pa[0]-pb[0])*tb,pb[1]+(pa[1]-pb[1])*tb]; let dx=p1[0]-p0[0], dy=p1[1]-p0[1]; const l=Math.hypot(dx,dy)||1, ux=dx/l, uy=dy/l, nx=-uy, ny=ux, col=d.es.ok?K.ink:K.red;
      const tk=(p)=>`<line x1="${f1(p[0]-nx*4)}" y1="${f1(p[1]-ny*4)}" x2="${f1(p[0]+nx*4)}" y2="${f1(p[1]+ny*4)}" stroke="${col}" stroke-width="1"/>`;
      let lx=(p0[0]+p1[0])/2+(Math.abs(uy)>0.7?14:0), ly=(p0[1]+p1[1])/2-(Math.abs(uy)>0.7?-4:7); const anc=Math.abs(uy)>0.7?'start':'middle';
      s+=`<line x1="${f1(p0[0])}" y1="${f1(p0[1])}" x2="${f1(p1[0])}" y2="${f1(p1[1])}" stroke="${col}" stroke-width="1"/>${tk(p0)}${tk(p1)}<text x="${f1(lx)}" y="${f1(ly)}" text-anchor="${anc}" font-size="12" font-weight="500" fill="${col}" stroke="#fff" stroke-width="3.5" paint-order="stroke">${n1(d.es.apart_m)} m <tspan font-weight="400" fill-opacity="0.9">of ${n1(d.es.need_m)} m needed</tspan></text>`; nDim++; });
    dropped.push(...dims.slice(4).map(d=>d.nm));
    groups+=`<g data-z="${st.z}" style="${st.i?'display:none':''}">${s}</g>`; titles+=stTitle(pl,st); });
  nExit=stor.reduce((t,st)=>t+st.S.exits.filter(e=>e.kind!=='loading').length,0);
  const svg=planSvg(x,P,pl,'f1c-a16','Plan of each storey, greyed back, with exit doors, exit stairs and the spacing between the two exits of each block',groups);
  const key=KEY([`<span><i style="width:3px;height:11px;background:${K.ink};border:0;border-radius:1px"></i>exit door</span>`,`<span><i style="background:${K.ink};opacity:.2;border:1px solid ${K.ink}"></i>exit stair</span>`,`<span><svg width="26" height="10" style="vertical-align:middle;margin-right:6px"><line x1="2" y1="5" x2="24" y2="5" stroke="${K.ink}" stroke-width="1"/><line x1="2" y1="1" x2="2" y2="9" stroke="${K.ink}"/><line x1="24" y1="1" x2="24" y2="9" stroke="${K.ink}"/></svg>spacing of the two exits (door edge to door edge)</span>`,`<span><i style="background:#F2F2F2;border:1px solid #C4C5C7"></i>plan, greyed back</span>`,`<span>${RQ}&nbsp;worst travel path: not computed, so not drawn</span>`]);
  const draw=`<div class="${NS}wrap">${tabsHtml(zs)}${key}<p class="${NS}cap">Same plan as Rooms · street at the bottom · straight-line spacing, never longer than the path${pl.snUsed?SNCAP:''}</p>${titles}${svg}</div>`;
  const nPass=ES.filter(e=>e.ok).length, nFail=ES.length-nPass;
  const meters=ES.map(e=>({l:'Exit spacing, '+short(e.block),v:e.apart_m,lim:e.need_m,max:Math.max(e.need_m*1.4,e.apart_m*1.1),unit:'m',pass:e.ok,cap:`${n1(e.apart_m)} m apart · needed ${n1(e.need_m)} m`,src:clause}));
  const cn=pl.counts;
  return {draw,lead:'Where people leave each block, and how far apart the two exits are. The worst walk to an exit is not computed yet, so it is not drawn.',
    hero:[{v:String(nExit),l:'exit doors drawn'},{v:`${nPass} of ${ES.length}`,l:'blocks with exits far enough apart',red:nFail>0},{v:C.q(),l:'worst travel path to an exit'}],
    rows:[['Worst travel path to an exit',C.q('check 8 to come: the path-based check is not in the tool')]].concat(ES.map(e=>[(t=>t[0].toUpperCase()+t.slice(1))(short(e.block)+', exit spacing'),`${n1(e.apart_m)} m, needs ${n1(e.need_m)} m`+(/clinic/i.test(e.block)?' (our reading: the clinic corridor is inside the suite, not a public corridor, so max(½ diagonal, 9 m))':'')]),[['Rooms without corridor access',String(cn.nNoAcc)],['Exit stair shaft ratings (NBC 3.4.4.1)',C.q()]]),
    meters,
    more:[['How the spacing is measured',`<p>${esc(ES[0]?ES[0].how:'')}. Stair arrangement: ${esc(ES.map(e=>short(e.block)+' '+e.stairs).join('; '))}. The need is half the floor’s greatest diagonal, or 9 m if that is more (${clause}; clause text not in the repo, ?).</p>${dropped.length?`<p style="margin-top:6px">Not drawn (more than four on a storey): ${esc(dropped.join(', '))}.</p>`:''}`]],
    src:[C.CONTEXT_SRC(x.city),SNSRC,`Exit doors, stairs and spacing: tool/plan.js exitSep (${PL.version}), ${clause} (${reg}); the clause text is not in the repo (?). Spacing is measured straight between the nearest door edges.`,'Plan underneath: the same drawing as Rooms (tool/plan.js, Arrange’s placement).','Worst travel path to an exit: not computed by the tool (plan.js: path-based check 8 to come); no path is drawn or estimated.'],
    missing:['worst travel path to an exit (path-based check 8)',`clause text of ${clause} (not in the repo)`,'exit stair shaft ratings (NBC 3.4.4.1)']}; }});

/* ======================= 17 Plant and site ======================= */
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
