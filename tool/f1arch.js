/* Beyond Data — F1 Architecture cards (CODE_JOB_F1_site_build.md §3, step 2; boards Arch_A01–A22, A16 left out). Each card reads the example lot as the tool
   models it, and the cards before it. Drawings: the tool's data restyled to docs/STYLE.md. See f1cards.js for the card contract. */
(function(){
'use strict';
const BD=window.BD, C=BD.f1cards, K=C.K, esc=C.esc;
const T='architecture';
const META={}; /* city overview (zone polygons, City open data) as the map uses it: tiles/<city>/meta.json, rings decoded as index.html decodeRing */
async function meta(city){ if(META[city]) return META[city]; const m=await BD.getJSON(`tiles/${city}/meta.json`), Q=m.Q||1;
  const dec=a=>{ const r=new Float64Array(a.length); let x=0,y=0; for(let i=0;i<a.length;i+=2){ x+=a[i]; y+=a[i+1]; r[i]=x/Q; r[i+1]=y/Q; } return r; };
  m.ovd=m.overview.map(([zi,a])=>({z:m.zones[zi],r:dec(a)})); delete m.overview; return META[city]=m; }
const LOTS_A1={van:696,edm:386}; /* checks/lot_types_2026-11-07.csv, rows per city (job A1, frozen 7 Nov 2026); Edmonton 8 Nov 2026 (J.B., edm_dc_major): only IH (375) and EETC (11) rows, was 5,232 */
const zkey=(city,z)=>city==='van'?String(z||'').trim():String(z||'').trim().split(/\s+/)[0].toUpperCase();

/* A01 Your city: both cities at the same scale, streets light, the zones where a data centre is allowed in DC blue (§3b: no lot outlines) */
C.add(T,'Your city',{async build(x){
  const W=470, H=520, out=[];
  for(const city of ['van','edm']){ const m=await meta(city), st=await BD.streets(city), ext=m.ext, bb=[ext[0],ext[1],ext[2],ext[3]], f=C.frame(bb,W,H,8);
    const zs=m.ovd.filter(o=>C.allowed(city,zkey(city,o.z)));
    let sd=''; if(st) for(const g of st.segs){ let d=''; for(let i=2;i+1<g.length;i+=2){ const [a,b]=f.P(g[i],g[i+1]); d+=(i>2?'L':'M')+a.toFixed(1)+' '+b.toFixed(1); } sd+=d; }
    out.push({city,svg:`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${city==='van'?'Vancouver':'Edmonton'}: streets, and the zones where a data centre is allowed"><path d="${sd}" fill="none" stroke="${K.rule}" stroke-width="0.5"/><path d="${C.pathOf(zs.map(o=>o.r),f.P)}" fill="${K.dc}" stroke="none"/></svg>`,n:zs.length,s:f.s}); }
  const s=Math.min(...out.map(o=>o.s));
  const draw=`<div class="f1c-two">${out.map(o=>`<figure><figcaption>${o.city==='van'?'Vancouver':'Edmonton'}</figcaption>${o.svg}</figure>`).join('')}</div>
   <div class="f1c-key"><span><i style="background:${K.dc}"></i>zones where a data centre is allowed</span><span><i class="ln" style="border-color:${K.rule}"></i>streets</span><span class="f1c-note">Edmonton and Vancouver drawn to fit; lot outlines are not shown (Edmonton's are licensed for course use).</span></div>`;
  return {noZoneFlag:true,draw,lead:'The tool covers two cities to the same depth. Pick one to start; the same design can be compared in the other city at the end.',
    /* lots per city: counted in job A1 (checks/lot_types_2026-11-07.csv, one row per lot in a zone where a data centre is allowed; gate 3, J.B. 7 Nov) */
    rows:[['Vancouver, lots where it is allowed',LOTS_A1.van.toLocaleString('en-CA')],['Edmonton, lots where it is allowed',LOTS_A1.edm.toLocaleString('en-CA')],['Allowed means',x.city==='edm'?'Edmonton: Major Industrial permitted (IH, EETC); Vancouver: conditional':'Vancouver: conditional; Edmonton: Major Industrial permitted (IH, EETC)']],
    src:['Zones: City of Vancouver and City of Edmonton zoning, as the tool’s city overview (open data); allowed = the zones in tool/data/zones.json that allow a data centre (Vancouver: conditional; Edmonton: Major Industrial permitted, IH and EETC, register edm_dc_major, J.B. 8 Nov 2026).','Streets: City of Vancouver and City of Edmonton street centrelines (tool/streets_<city>.json).','Lots where a data centre is allowed: the tool’s lot list (7 Nov 2026): every lot in the tool’s lot files in a zone listed in tool/data/zones.json, I-3 sub-area B left out, each lot counted once; Edmonton re-counted 8 Nov 2026 from the same file, IH and EETC rows only (386; was 5,232).'],
    }; }});

/* A02 Your parcel: the lots around the picked lot, those where a data centre is allowed tinted, buildings light, the lot outlined with one straight leader */
C.add(T,'Your parcel',{async build(x){
  const sel=x.sel, r=sel.ring; if(!r) return {draw:'<p class="f1v-empty">No lot loaded.</p>'};
  const b=C.bbox(r), cx=(b[0]+b[2])/2, cy=(b[1]+b[3])/2, R=340, bb=[cx-R,cy-R,cx+R,cy+R], W=640, H=640, f=C.frame(bb,W,H,0);
  let lots='', alw='', blds=''; const seen=new Set();
  for(const k in BD.S.tiles){ if(!k.startsWith(x.city+':')) continue; const t=BD.S.tiles[k];
    for(const p of t.par||[]){ if(seen.has(p.id+':'+p.r[0])) continue; seen.add(p.id+':'+p.r[0]); const pb=C.bbox(p.r); if(!C.hit(bb,pb)) continue; const a=t.A[p.id]||[], ok=C.allowed(x.city,C.zoneKey(x.city,a)), d=C.pathOf([p.r],f.P); if(ok) alw+=d; else lots+=d; }
    for(const q of t.bld||[]){ const qb=C.bbox(q.r); if(!C.hit(bb,qb)) continue; blds+=C.pathOf([q.r],f.P); } }
  const [lx,ly]=f.P(cx,cy), lab=`${x.addr}`, sub=`${x.zone}${x.zone==='I-3'?' sub-area A':''} · ${C.n0(sel.lotArea)} m²`;
  const svg=`<svg viewBox="0 0 ${W+260} ${H}" width="${W+260}" height="${H}" role="img" aria-label="The lots around ${esc(lab)}; lots where a data centre is allowed are tinted">
    <defs><clipPath id="f1c-a02"><rect width="${W}" height="${H}"/></clipPath></defs><rect width="${W}" height="${H}" fill="${K.ground}"/>
    <g clip-path="url(#f1c-a02)"><path d="${lots}" fill="#fff" stroke="${K.hair}" stroke-width="0.6"/><path d="${alw}" fill="${K.fillSup}" stroke="${K.dcSup}" stroke-width="0.6"/><path d="${blds}" fill="${K.bld}" stroke="none"/>
    <path d="${C.pathOf([r],f.P)}" fill="${K.dcSup}" fill-opacity="0.55" stroke="${K.ink}" stroke-width="1.8"/></g>
    <circle cx="${lx}" cy="${ly}" r="2" fill="${K.ink}"/><line x1="${lx}" y1="${ly}" x2="${W+16}" y2="${ly}" stroke="${K.ink}" stroke-width="0.5"/>
    <text x="${W+22}" y="${ly-2}" font-size="13" font-weight="500" fill="${K.ink}">${esc(lab)}</text><text x="${W+22}" y="${ly+14}" font-size="11.5" fill="${K.mute}">${esc(sub)}</text>
    ${C.scaleBar(18,H-34,200,f.s,'200 m')}</svg>`;
  const key=`<div class="f1c-key"><span><i style="background:${K.fillSup};border-color:${K.dcSup}"></i>lots where a data centre is allowed</span><span><i style="background:#fff"></i>other lots</span><span><i style="background:${K.bld};border-color:${K.bld}"></i>buildings</span></div>`;
  const st=x.status, rec=sel.lotRec, recA=rec&&rec.a!=null?rec.a:(typeof rec==='number'?rec:null);
  return {draw:svg+key,lead:'Only lots where the zoning allows a data centre can be picked. Search by address or click a lot.',
    rows:[['Address',x.addr],['Zone',x.zone+(x.zone==='I-3'?', sub-area A':'')],['Data centre',st.word],['Lot area',`${C.n0(sel.lotArea)} m² (${esc(sel.lotSrc||'outline')})`]],
    more:[['Why some lots are greyed out',`<p>A data centre can be picked only where the zone lists it as permitted, conditional or discretionary (tool/data/zones.json). ${esc(st.text||'')}${st.clause?` (${esc(st.clause)})`:''}</p>`]],
    src:[`Lots and buildings: ${x.city==='van'?'City of Vancouver property parcels and building footprints (open data)':'City of Edmonton parcels as the tool shows them (lot outlines: Altalis, academic use only)'}.`,`Zone and data-centre status: tool/data/zones.json (${(st.src||[]).join(', ')||'?'}).`,`Lot area: ${sel.lotSrc||'the lot outline'}, as the tool reports it.`]}; }});
})();
