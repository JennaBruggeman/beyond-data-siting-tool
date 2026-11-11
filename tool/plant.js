/* Beyond Data — plant sized from the load and placed only inside the usable lot (v19, 16 Oct 2026; J.B.: "it can't float in an alley").
   Generic equipment only: sizes, capacities and clearances are ranges from manufacturer data (labelled as claims); no models are named,
   and nothing locates real fuel, electrical or utility equipment. Units are packed inside the roof outline or the plant yard, which lies
   inside the lot and outside the required yards; whatever does not fit is reported, not drawn somewhere it could not go. */
(function(){
'use strict';
const BD=window.BD; const {fmt}=BD;
const SRC={
 chill:'Air-cooled chillers with free-cooling coils (air cooling): an air-cooled hall needs chilled water at about 13 °C or warmer (NREL for DOE FEMP, Best Practices Guide 2024, s. 5.2.1), and a dry cooler cannot cool water below the outdoor air (rated units leave it 3–11 K above), so chillers carry the full load in summer. Basis unit: Vertiv Liebert AFC FIZ135, 12.14 × 2.36 m, 2.90 m high, 1,489 kW at 35 °C ambient, 27.8 → 18.9 °C fluid, 30% glycol, with oversized free-cooling coils (Vertiv SL-71060 R09/24, "Preliminary data"; manufacturer claim). Chosen 29 Oct 2026 as the unit nearest the middle of the makers compared (Vertiv AFC, Airedale TurboChill DCS): 16.4–30.5 m² of unit per MW of heat, median 19.2. The tool sizes for the low end. The datasheet gives no clearances: the dry-cooler clearances are used.',
 dry:'Dry coolers (liquid cooling, water about 30–45 °C, so no chillers most hours): a 12 m V-type unit, 12 × 2.4 m, 2.88 m high, 20 fans in two rows (EVAPCO EA26MRKT 2026, p.13); 24.5 m² of unit per MW of heat (Thermokey at 48 → 42.7 °C water, 32 °C air; other makers 19.5–30.5 m² per MW: EVAPCO, Mark (no document found ?) — manufacturer claims), so about 1.2 MW a unit — within the 71–1,372 kW range EVAPCO lists for units up to 12 m (manufacturer claim). Clearances for V-coil units 30–40 ft long: 0.9 m end to wall, 2.1 m side to wall, 1.8 m end to end, 4.3 m side to side; the top of the unit level with or above any wall around it (EVAPCO eco-Air layout manual, 2026).',
 hybrid:'Hybrid (adiabatic) coolers: about 12 × 2.8 m, 2.88 m high (EVAPCO EA26MRKT 2026, p.13: adiabatic width 9\'-7/8", pads outside both coil faces), 0.67–1.37 MW a unit (EVAPCO 270B adiabatic models; BAC TrilliumSeries — manufacturer claims); the tool sizes for the low end. Same clearances as dry coolers; "They cannot be elevated in lieu of spacing" (EVAPCO).',
 towers:'Cooling tower cells (crossflow, induced draft, factory-assembled). Basis unit: BAC Series 3000 S3E-1222-07R, 690 nominal tons (about 3.0 MW at 95/85/78 °F, converted at 15,000 BTU/h per tower ton), 11\'-10" × 21\'-7", 12\'-9" high (BAC Engineering Data C16, 2023; manufacturer claim). Chosen 29 Oct 2026 as the unit nearest the middle of 140 BAC Series 3000 and Marley NC single cells: 4.7–16.5 m² per MW, median 7.8. Air inlet 1.5–2.7 m from a wall (2.7 m used), cells 1.8 m end to end (BAC, EVAPCO layout guidelines). Vancouver: discharge 2.15 m above sidewalks, 7.6 m from air intakes, 3 m from doors, operable windows and outdoor spaces (VBBL 2025 Art. 6.3.2.15).',
 gens:'Standby diesel generator sets in Sound Level 2 enclosures with sub-base tanks. Basis units: Rehlko (Kohler) KD2000, 2,000 kW standby (data-centre continuous rating the same), 13.49 × 3.49 m, up to 4.78 m high (G5-626, rev 6/24); KD1000, 1,000 kW, 8.43 × 2.62 m, 3.71 m high with the 12 h tank (G6-154, 12/23). Both EPA Tier 2, cULus (UL 2200, CSA C22.2 No. 100); manufacturer claims. Chosen 29 Oct 2026 as the middle of Cat, Rehlko and Generac: 2 MW 18.5–38.4 m² per MW, 1 MW 19.5–22.4. 1 m clear around each set (Cummins application manual; not checked ?); 1.5 m from wall openings and combustible walls (NFPA 37 s. 4.1.4, a US standard; Vancouver points to CSA C282, not read). Metro Vancouver Bylaw 1329: no Tier 0 or Tier 1 engines within 100 m of hospitals, elementary schools, day care and community care facilities; the sets drawn are EPA Tier 2 (maker claim), so the rule does not bar them; older Tier 0/1 engines would be barred near those uses.',
};
/* lean refactor 3 Nov 2026: unit sizes, capacities and clearances come from tool/data/plant_units.json with their register ids.
   Gaps between tower cells (4.0 / 6.0 m across) and between generator sets (2.0 m, assumed from the 1 m service clearance) have no
   register id: they are set here and listed in checks/agents/2026-11-03_refactor_unsourced.md. */
const PU=BD.data.plant_units, KIND=PU.kind, PROV=[BD.data.size.hallShare[0],BD.data.size.m2PerMW[1]]; // provisional size: hall share low end ÷ m² per MW top (register hall_area, it_load_outside)
KIND.towerS.gap=[1.8,4.0]; KIND.towerL.gap=[1.8,6.0]; /* Build 2 (3 Nov 2026): the 2.0 m between generator sets is now in plant_units.json (CSA C282 6.5.1.1: 1 m clear all round, register arch_csa_c282) */
/* Build 2 (3 Nov 2026): yard generator sets keep their sub-base tanks the CSA B139.1.0 Table 2 distances (B139.1.1 6.5.2; register arch_csa_b139): by the fuel
   one set holds (the running sets share the fuel on site), the distance to the property line and to the building. Over 250,000 L a set: not in the table (?). */
const EQ=BD.data.equipment; function genTank(mw,s){ const R=BD.eng?BD.eng.R:{pue:EQ.pue,fuelHours:EQ.fuelHours,fuelLkWh:EQ.fuelLkWh}; if(!s||!s.g||!s.gNeed) return null;
  const L=mw*R.pue[1]*1000*R.fuelHours*R.fuelLkWh/s.gNeed, row=EQ.genTankSep.rows.find(r=>L<=r[0]); return {L,bld:row?row[1]:null,pl:row?row[2]:null,over:!row}; }
// heat to reject ≈ the facility's peak power (servers × the high PUE): almost all electricity ends as heat. Sized in full even with heat recovery:
// if a receiver leaves, all heat goes back to the coolers (register: horizons, four futures).
const spare=(n,s)=>s==='2n'?n*2:s==='n1'?n+1:n;
function sizeFor(mw,A){
  const pue=BD.eng?BD.eng.R.pue[1]:BD.data.equipment.pue[1], Q=mw*pue;
  const out=A.outside||'dry', air=(A.inside||'air')==='air'; // sweep M31 (J.B. 18 Oct): air-cooled halls need chillers; dry coolers alone only for liquid cooling
  const k=out==='towers'?(Q>6?KIND.towerL:KIND.towerS):out==='hybrid'?KIND.hybrid:air?(Q>6?KIND.chillL:KIND.chillS):KIND.dry;
  const need=Math.max(1,Math.ceil(Q/k.mw)), n=spare(need,A.spares||'n1');
  const g=A.gens==='none'?null:(Q>PU.gen2Above?KIND.gen2:KIND.gen1); const gNeed=g?Math.max(1,Math.ceil(Q/g.mw)):0, gN=g?spare(gNeed,A.genSpares||'n1'):0;
  return {Q,k,need,n,g,gNeed,gN,src:SRC[out==='towers'?'towers':out==='dry'&&air?'chill':out]};
}
/* 2 Nov 2026 hard rules (site audit 3): NBC 2020 / BCBC 2024 / NBC(AE) 2023 Div. B 6.3.2.15.(5): evaporative heat-rejection discharge at least
   2.15 m above sidewalks and driveways, 7.6 m from outdoor air intakes, 3 m from exterior doors, operable windows and occupiable outdoor spaces
   (register arch_sep_nbc63215full). Towers and hybrid coolers (k.evap): the neighbours' doors, windows and outdoor spaces are not known, so the
   whole unit (its discharge) is kept k.evap = 3 m inside the lot line. Units are at least 2.88 m tall, so 2.15 m holds. No air intakes are drawn,
   so 7.6 m is not tested (?). Units that cannot be placed are reported as not fitting, which blocks the set-up. */
let EDGE=null; // {ring, d}: the lot ring and the least distance a unit may come to it
function segD(px,py,ax,ay,bx,by){ const dx=bx-ax, dy=by-ay, L2=dx*dx+dy*dy; let t=L2?((px-ax)*dx+(py-ay)*dy)/L2:0; t=Math.max(0,Math.min(1,t)); return Math.hypot(px-ax-t*dx,py-ay-t*dy); }
function edgeD(x,y,r){ let d=1e9; for(let i=0;i<r.length;i+=2){ const j=(i+2)%r.length; d=Math.min(d,segD(x,y,r[i],r[i+1],r[j],r[j+1])); } return d; }
/* 7 Nov 2026: EDGE.segs = per-line distances (Edmonton generator test, C14600 s. 19(3), 21(3)); every line keeps its own */
const segsOK=(x,y)=>!EDGE||!EDGE.segs||EDGE.segs.every(e=>segD(x,y,e.ax,e.ay,e.bx,e.by)>=e.d-1e-6);
/* the distance at which one generator set meets a test limit: (Kohler enclosure sheet G6-154 for KD2000, Sound Level 2, 78 dB(A) at 7 m), free field, our arithmetic */
const testD=lim=>{ const G=BD.data.noise&&BD.data.noise.gen; return G?7*Math.pow(10,(G.lp7-lim)/20):0; };
/* pack w × d rectangles (long side along the frame's u axis unless rot) inside a region, with wall and unit clearances */
function pack(F,region,forbid,u0,u1,v0,v1,k,count,rot){
  const L=rot?k.W:k.L, W=rot?k.L:k.W, wu=rot?k.wall[1]:k.wall[0], wv=rot?k.wall[0]:k.wall[1], gu=rot?k.gap[1]:k.gap[0], gv=rot?k.gap[0]:k.gap[1];
  const out=[]; const okPt=(a,b,inner)=>{ const [x,y]=F.toW(a,b); return BD.pip(x,y,region)&&!forbid.some(f=>BD.pip(x,y,f)); };
  const e=0.05; // points exactly on a shared edge (strip next to the building) count as outside it
  for(let v=v0+wv+W/2; v<=v1-wv-W/2+1e-6 && out.length<count; v+=W+gv)
    for(let u=u0+wu+L/2; u<=u1-wu-L/2+1e-6 && out.length<count; u+=L+gu){
      const cs=[[u-L/2-wu+e,v-W/2-wv+e],[u+L/2+wu-e,v-W/2-wv+e],[u+L/2+wu-e,v+W/2+wv-e],[u-L/2-wu+e,v+W/2+wv-e],[u,v],[u-L/2,v],[u+L/2,v],[u,v-W/2],[u,v+W/2]];
      if(cs.every(([a,b])=>okPt(a,b))&&(!((k.evap||k.lotSep)&&EDGE)||[[u-L/2,v-W/2],[u+L/2,v-W/2],[u+L/2,v+W/2],[u-L/2,v+W/2],[u-L/2,v],[u+L/2,v],[u,v-W/2],[u,v+W/2]].every(([a,b])=>{ const [x,y]=F.toW(a,b); return BD.pip(x,y,EDGE.ring)&&edgeD(x,y,EDGE.ring)>=EDGE.d-1e-6&&segsOK(x,y); }))) out.push({u,v,L,W}); }
  return out; }
function boxOf(F,p,k,base,kind){ const r=BD.geo.rectW(F,p.u-p.L/2,p.u+p.L/2,p.v-p.W/2,p.v+p.W/2);
  const wu=p.L===k.L?k.wall[0]:k.wall[1], wv=p.L===k.L?k.wall[1]:k.wall[0];
  const c=BD.geo.rectW(F,p.u-p.L/2-wu,p.u+p.L/2+wu,p.v-p.W/2-wv,p.v+p.W/2+wv); return {ring:r,clear:c,h:k.H,base,kind,name:k.name}; }
function localBounds(F,ring){ let a=1e9,b=-1e9,c=1e9,d=-1e9; for(let i=0;i<ring.length;i+=2){ const [u,v]=F.toL(ring[i],ring[i+1]); a=Math.min(a,u); b=Math.max(b,u); c=Math.min(c,v); d=Math.max(d,v); } return [a,b,c,d]; }

BD.plant={
 KIND,SRC,sizeFor,pack,boxOf,localBounds,
 /* before the footprint: decide how much plant goes in the yard and reserve a plant yard strip for it */
 place(m){
  const A=BD.S.answers, F=m.F; if(!F) return;
  let mw=A.mw; if(!mw){ // a provisional size from the zone's floor area, until a size is set (sweep M35: not 'the low end of what fits')
    const Z=m.Z, lot=m.lotArea, n=m.nF?m.nF[0]:2, up=Z.ground?lot*Z.fsr[0]*(n-1)/n:lot*Z.fsr[0]; mw=+Math.max(0.1,Math.min(40,up*PROV[0]/PROV[1])).toFixed(1); /* 0.1–40 MW is the slider range */ m.mwProvisional=true; }
  m.mwSized=mw; const s=sizeFor(mw,A); const P={s,boxes:[],lines:[],genLines:[],short:''}; m.plant=P;
  const at=A.plantAt||'roof', genAt=A.genAt||'yard';
  P.coolYard=at==='yard'?s.n:at==='split'?Math.floor(s.n/2):0; P.coolRoof=s.n-P.coolYard;
  P.genYard=s.g&&genAt==='yard'?s.gN:0; P.genRoof=s.g&&genAt==='roof'?s.gN:0;
  // reserve a strip for yard plant on a new building whose footprint the tool sets
  if(!m.existing&&m.uBuild&&(P.coolYard||P.genYard)){ const wv=m.v[1]-m.v[0]; let depth=0;
    const gt=genTank(mw,s); P.genTank=gt; /* Build 2: B139 Table 2 (register arch_csa_b139) */
    /* 7 Nov 2026 (Clark Dr hand check, checks/agents/2026-11-07_clark_handcheck.md): a row of generator sets keeps the B139 tank distance from the side
       property lines at its ends (as put() below enforces), not only the 1.5 m wall clearance; sy = the narrowest side yard, so the distance is to the lot line */
    const syL=(m.edgeYards||[]).filter(e=>e.kind!=='front'&&e.kind!=='rear').map(e=>e.d||0).filter(x=>isFinite(x)), sy=syL.length?Math.min(...syL):0;
    const GNe=BD.data.noise&&BD.data.noise.gen&&BD.data.noise.gen.edm, plE=gt&&gt.pl!=null?(m.city==='edm'&&GNe?Math.max(gt.pl,testD(GNe.nonTest1h)):gt.pl):null; /* 7 Nov 2026: Edmonton sets at the test distance from non-residential lines */
    const endD=k=>k===s.g&&plE!=null?Math.max(k.wall[0],plE-(isFinite(sy)?sy:0)):k.wall[0];
    const rowDepth=(k,n)=>{ const e=endD(k), per=Math.max(0,Math.floor((wv-2*e+k.gap[0])/(k.L+k.gap[0]))); if(!per) return null; const r=Math.ceil(n/per); return 2*k.wall[1]+r*k.W+(r-1)*k.gap[1]; };
    /* the real rear yard line may be skewed against the frame: push the strip in until it lies wholly inside the buildable area (units stay square to the building) */
    const lotR=m.inset?(BD.buildArea?BD.buildArea(m):m.ring):m.ring; let skew=0;
    /* columns where the buildable area does not reach the rear within 3 m (an irregular lot: no buildable ground there at all) are left out; the packer keeps units off them */
    for(let v=m.v[0]+0.25; v<=m.v[1]-0.25+1e-9; v+=0.5){ let k=0; for(; k<=60; k++){ const [x,y]=F.toW(m.plantYardStart+m.dir*k*0.05,v); if(BD.pip(x,y,lotR)) break; } if(k<=60) skew=Math.max(skew,k*0.05); }
    P.skew=skew; P.endExtra=s.g&&gt&&gt.pl!=null?Math.max(0,endD(s.g)-s.g.wall[0]):0; /* rows of sets start this much further in at each end */
    for(const [k,n] of [[s.k,P.coolYard],[s.g,P.genYard]]){ if(!n||!k) continue; let d=rowDepth(k,n); if(d!=null&&k===s.g&&gt&&gt.pl!=null&&!m.loading){ const rearY=Math.abs(m.plantYardStart-(m.dir<0?F.L/2:-F.L/2)); d+=Math.max(0,gt.pl-rearY-k.wall[1]); } if(d==null){ P.short+=`The lot is too narrow for a ${k.L} m ${k.name.replace(/s$/,'')} across it. `; continue; } depth+=d; }
    /* 7 Nov 2026 (J.B.): trucks must reach the inside dock (Vancouver Parking By-law s. 5.4.1: 'unobstructed access by vehicles to all off-street loading
       spaces by means of a minimum 6.1 metre wide manoeuvring aisle … from any lane abutting the site, or from a street where … no lane is present';
       Edmonton 20001 s. 5.80 7.1.1, 7.1.3 give no aisle width, so Vancouver's 6.1 m is used there too, ?). Where a lane or street is on the rear line,
       a straight corridor runs from it to the dock and the units sit beside it; otherwise a 6.1 m truck lane runs along the building's rear face, the
       full width, with the units behind it (the yard is that much deeper). */
    P.truck=null; { const LI=m.loadInside; if(LI&&LI.n&&(P.coolYard||P.genYard)){ const aisle=(m.loadingNeed&&m.loadingNeed.aisle)||6.1, open=e=>e&&(e.abuts==='street'||e.abuts==='alley');
      const rear=(m.edgeYards||[]).filter(e=>e.kind==='rear'&&open(e)); if(rear.length){ const w=Math.max(aisle,LI.n*(LI.wid+0.6)+0.6); P.truck={type:'straight',v:[m.v[0],Math.min(m.v[1],m.v[0]+w)],aisle,to:rear[0].abuts}; }
      else { P.truck={type:'along',aisle}; depth+=aisle; } } }
    const avail=Math.abs(m.uBuild[1]-m.uBuild[0]);
    /* 7 Nov 2026 (J.B.): the yard never takes the ground a building needs: at most the buildable depth less 12 m, the tool's minimum hall depth (site.js
       serverFoot; a drawing choice), and never more than 90 % of it. Units that still do not fit are reported (roof() below), so the size fails. */
    const capD=Math.max(0,Math.min(avail*0.9,avail-12-skew));
    /* 7 Nov 2026: on a lot that narrows towards the rear the rows sized on the full width do not fit: deepen the yard a row at a time until the yard units
       actually pack into it (same packer and distances as roof() below), up to the 90 % cap; what still does not fit is reported there */
    const truckR=(a00,dep)=>{ const T=P.truck; if(!T) return null; const a1=a00+m.dir*dep; if(T.type==='straight') return BD.geo.rectW(F,Math.min(m.plantYardStart,a1),Math.max(m.plantYardStart,a1),T.v[0],T.v[1]);
      const b0=a1-m.dir*T.aisle; return BD.geo.rectW(F,Math.min(b0,a1),Math.max(b0,a1),m.v[0]-1,m.v[1]+1); };
    { const a00=m.plantYardStart+m.dir*skew, ex=P.endExtra||0, trial=dep=>{ const a1=a00+m.dir*dep, u0=Math.min(a00,a1), u1=Math.max(a00,a1); let n=0, used=[]; { const tr=truckR(a00,dep); if(tr) used.push(tr); }
        for(const [k,c] of [[s.k,P.coolYard],[s.g,P.genYard]]){ if(!c||!k) continue; const isG=k===s.g, keepW=k.wall; if(isG&&gt&&gt.bld!=null) k.wall=keepW.map(w=>Math.max(w,gt.bld));
          EDGE=isG&&gt&&gt.pl!=null&&m.ring?{ring:m.ring,d:gt.pl}:(k.evap&&m.ring?{ring:m.ring,d:k.evap}:null); if(isG) k.lotSep=!!EDGE;
          const got=pack(F,lotR,used,u0,u1,m.v[0]+(isG?ex:0),m.v[1]-(isG?ex:0),k,c,true); k.wall=keepW; delete k.lotSep; EDGE=null;
          n+=c-got.length; used=used.concat(got.map(q=>BD.geo.rectW(F,q.u-q.L/2-1,q.u+q.L/2+1,q.v-q.W/2-1,q.v+q.W/2+1))); } return n; };
      const step=s.g&&P.genYard?s.g.W+s.g.gap[1]:s.k.W+s.k.gap[1]; let tries=0; while(!m.mwProvisional&&depth>0&&trial(depth)>0&&depth+step<=capD&&tries<20){ depth+=step; tries++; } if(tries) P.deepened=tries; } /* not for the provisional size (no size chosen yet): that is the zone's most, and a yard sized for it would leave no building */
    if(depth>capD){ P.short+='The plant yard would leave less than a 12 m deep building. '; depth=capD; }
    /* generator noise at the lot lines is not modelled (no sourced sound level for the sets, ?): flag yards deeper than the test lots' deepest (21.7 m) */
    { const gd=depth+skew-(P.truck&&P.truck.type==='along'?P.truck.aisle:0); P.bigYard=s.g&&P.genYard&&gd>21.72?Math.round(gd):0; } /* 21.72 = the 21.714 m measured on 339 1st Ave E at 1.8 MW, rounded up, so the lot that sets the range is inside it */ /* the units' part of the yard, without the truck lane */
    m.plantYardDepth=depth+skew; const a0=m.plantYardStart+m.dir*skew, a1=a0+m.dir*depth; P.yard=BD.geo.rectW(F,Math.min(a0,a1),Math.max(a0,a1),m.v[0],m.v[1]); P.yardU=[Math.min(a0,a1),Math.max(a0,a1)];
    P.truckRing=truckR(a0,depth); if(P.truck&&P.truck.type==='along') P.truck.u=[Math.min(a1-m.dir*P.truck.aisle,a1),Math.max(a1-m.dir*P.truck.aisle,a1)];
  }
 },
 /* after the footprint: put units on the roof and in the yard, and report what does not fit */
 roof(m){
  const A=BD.S.answers, P=m.plant, F=m.F; if(!P||!F||!m.foot) return; const s=P.s;
  EDGE=s.k.evap&&m.ring?{ring:m.ring,d:s.k.evap}:null; // evaporative discharge kept inside the lot line (NBC 6.3.2.15.(5), above)
  // J.B. 20 Oct (examples that 'did not fit'): once a size is set the building is only as big as that size needs (m.sizedTo, site.js); the plant
  // goes on that building's roof and in the yard around it, not around the most the lot could hold
  const bld=m.sizedTo&&m.serverFoot?m.serverFoot:m.foot;
  const roofRing=bld, roofH=m.existing?(m.roofH||m.H):(m.hallTop||m.H); // hall fix 3 Nov 2026: a ratio-set hall has its own roof height (site.js setHall)
  const [ru0,ru1,rv0,rv1]=localBounds(F,roofRing);
  const put=(k,count,base,where)=>{ if(!count||!k) return 0; let got=[];
    if(where==='roof'){ got=pack(F,roofRing,[],ru0,ru1,rv0,rv1,k,count,false); // then turned 90° where the roof's shape suits that better (a C-shaped tower roof, 20 Oct)
      if(got.length<count){ const tk=got.map(p=>BD.geo.rectW(F,p.u-p.L/2-1,p.u+p.L/2+1,p.v-p.W/2-1,p.v+p.W/2+1)); const g2=pack(F,roofRing,tk,ru0,ru1,rv0,rv1,k,count-got.length,true); got=got.concat(g2); } }
    else { const lotR=m.inset?(BD.buildArea?BD.buildArea(m):BD.geo.clip(m.ring,m.inset)):m.ring; /* LOTLINES 4 Nov 2026 */ const forbid=P.boxes.filter(b=>b.kind==='yard').map(b=>b.clear).concat(P.truckRing?[P.truckRing]:[]); if(m.existing) (m.feet||[]).forEach(f=>forbid.push(f.r)); else { if(bld) forbid.push(bld); if(m.loading) forbid.push(m.loading); }
      // yard: the reserved strip for a new building (units turned across it); anywhere in the usable lot for an existing one
      /* 7 Nov 2026 (Clark Dr hand check): a new building's yard units go in the reserved plant yard only, as the header says; whatever does not fit there is
         reported, no longer dropped on open ground elsewhere (that let the MW rest on ground the plant yard did not account for). Rows of generator sets start
         P.endExtra further in at each end, so the first slot keeps the B139 property-line distance. */
      if(P.yard&&!m.existing){ const [a,b,c,d]=localBounds(F,P.yard), ex=k===s.g?(P.endExtra||0):0; got=pack(F,lotR,forbid,a,b,c+ex,d-ex,k,count,true); }
      else { const [a,b,c,d]=localBounds(F,lotR); got=pack(F,lotR,forbid,a,b,c,d,k,count,false); if(got.length<count) got=got.concat(pack(F,lotR,forbid.concat(got.map(p=>BD.geo.rectW(F,p.u-p.L/2-1,p.u+p.L/2+1,p.v-p.W/2-1,p.v+p.W/2+1))),a,b,c,d,k,count-got.length,true)); } }
    got.forEach(p=>P.boxes.push(boxOf(F,p,k,base,where)));
    return got.length; };
  P.boxes=[];
  // indoors (visibility choice): the heat-rejection units go into a louvred plant floor instead of the roof; its area is taken from the floor area
  P.indoor=0; if(A.vis==='indoors'&&P.coolRoof){ P.indoor=P.coolRoof*(s.k.L+2*s.k.wall[0])*(s.k.W+s.k.gap[1]); P.coolRoofIndoor=P.coolRoof; P.coolRoof=0; }
  const cr=put(s.k,P.coolRoof,roofH,'roof'), cy=put(s.k,P.coolYard,0,'yard');
  // generators: never on top of coolers; roof sets go where coolers left room
  let gr=0; if(P.genRoof){ const used=P.boxes.filter(b=>b.kind==='roof').map(b=>b.clear); let got=pack(F,roofRing,used,ru0,ru1,rv0,rv1,s.g,P.genRoof,false); if(got.length<P.genRoof) got=got.concat(pack(F,roofRing,used.concat(got.map(p=>BD.geo.rectW(F,p.u-p.L/2-1,p.u+p.L/2+1,p.v-p.W/2-1,p.v+p.W/2+1))),ru0,ru1,rv0,rv1,s.g,P.genRoof-got.length,true)); got.forEach(p=>P.boxes.push(boxOf(F,p,s.g,roofH,'roof'))); gr=got.length; }
  /* Build 2: yard sets kept the B139 Table 2 distance from the property line (genTank; register arch_csa_b139); the building distance is the larger of it and the 1.5 m clearance */
  const gt=P.genTank||genTank(m.mwSized,s); let gy=0; if(s.g&&P.genYard){ const keepW=s.g.wall; if(gt&&gt.bld!=null) s.g.wall=keepW.map(w=>Math.max(w,gt.bld)); EDGE=gt&&gt.pl!=null&&m.ring?{ring:m.ring,d:gt.pl}:null; s.g.lotSep=!!EDGE;
    /* 7 Nov 2026 (J.B.): in Edmonton, place the sets where one meets the daytime test at every line (≥ 3.13 m from non-residential, ≥ 9.9 m from residential
       lines, C14600 s. 21(3), 19(3)) if the yard has room; only if it has not, fall back to the B139 minimum, and the noise check flags the test */
    const GNe=BD.data.noise&&BD.data.noise.gen&&BD.data.noise.gen.edm, E2=(m.edgeYards||[]).filter(e=>isFinite(e.ax)); P.genTestPlaced=null;
    if(EDGE&&m.city==='edm'&&GNe&&E2.length){ const n0=P.boxes.length, res=e=>/^residential/.test(e.abuts||'');
      EDGE.segs=E2.map(e=>({ax:e.ax,ay:e.ay,bx:e.bx,by:e.by,d:Math.max(gt.pl,res(e)?testD(GNe.resTest1h):testD(GNe.nonTest1h))})); gy=put(s.g,P.genYard,0,'yard');
      if(gy<P.genYard){ P.boxes.length=n0; delete EDGE.segs; gy=put(s.g,P.genYard,0,'yard'); P.genTestPlaced=false; } else P.genTestPlaced=true; }
    else gy=put(s.g,P.genYard,0,'yard');
    s.g.wall=keepW; delete s.g.lotSep; } EDGE=null;
  const kname=s.k.name, miss=[];
  if(cr<P.coolRoof) miss.push(`${P.coolRoof-cr} of ${P.coolRoof} ${kname} do not fit on the roof`);
  if(cy<P.coolYard) miss.push(`${P.coolYard-cy} of ${P.coolYard} ${kname} do not fit in the yard`);
  if(gr<P.genRoof) miss.push(`${P.genRoof-gr} of ${P.genRoof} generators do not fit on the roof`);
  if(gy<P.genYard) miss.push(`${P.genYard-gy} of ${P.genYard} generators do not fit in the yard`);
  P.miss=miss; P.placed={cr,cy,gr,gy};
  if(miss.length){ const tips=[]; if(cr<P.coolRoof||cy<P.coolYard) tips.push(`for the coolers: ${A.plantAt==='roof'?'the yard or a split':'the roof or a split'}${A.outside==='dry'?', cooling towers (smaller, but they use water)':''}`); if(gr<P.genRoof||gy<P.genYard) tips.push(`for the generators: ${A.genAt==='yard'?'a smaller footprint (set the coverage in step 2) or the roof':'the yard'}`); tips.push('or a smaller size'); P.short+=`Doesn't fit: ${miss.join('; ')}. Try ${tips.join('; ')}.`; }
  const mwT=m.mwSized.toFixed(m.mwSized<10?1:0);
  P.lines=[`Sized for <b>${mwT} MW</b> of servers${m.mwProvisional?' (a provisional size until one is set on the What fits page)':''}: heat to reject ≈ ${mwT} × PUE 1.55 = <b>${s.Q.toFixed(1)} MW</b> at peak.`,
   `${s.need} ${kname} carry it${s.k===KIND.hybrid?` (at the low end of 0.67–1.37 MW a unit; ${Math.ceil(s.Q/s.k.mwHi)} at the high end)`:''}; with spares, <b>${s.n}</b>. Placed: ${cr} on the roof, ${cy} in the yard.`,
   `Each unit about ${s.k.L} × ${s.k.W} m, ${s.k.H} m high, with ${s.k.wall[0]}–${s.k.wall[1]} m to walls and ${s.k.gap[0]}–${s.k.gap[1]} m between units (dashed in 3D).`,
   ...(s.k.evap?[`Evaporative discharge: each unit kept at least ${s.k.evap} m inside the lot line, because the code keeps it 3 m from doors, operable windows and outdoor spaces, and the neighbours' are not known (NBC 2020 6.3.2.15.(5); register arch_sep_nbc63215full). 7.6 m from air intakes: no intakes are drawn, so not tested (?).`]:[]),
   `<span class="src">${s.src}</span>`];
  P.genLines=s.g?[`${s.gNeed} generator set${s.gNeed>1?'s':''} of about ${s.g.mw} MW carry ${s.Q.toFixed(1)} MW; with spares, <b>${s.gN}</b>. Placed: ${gr} on the roof, ${gy} in the yard.`,`Each about ${s.g.L} × ${s.g.W} m, ${s.g.H} m high; 1.5 m from the building, 2 m between sets (1 m clear all round, CSA C282 6.5.1.1; register arch_csa_c282).`,...(gt?[`Fuel in each set's sub-base tank: about ${Math.round(gt.L/100)*100} L. In the yard: ${gt.pl!=null?gt.pl+' m from the property line and '+gt.bld+' m from the building':'? (over 250,000 L, not in the table)'} (CSA B139.1.0 Table 2; register arch_csa_b139). On a roof: at most 1,250 L a tank and 2,500 L a supply line (B139.1.1 6.5.3). FM 5-32 (insurer guidance, not law): not on the roof or in a basement.`]:[]),`<span class="src">${SRC.gens}</span>`]:['No generators.'];
 }
};
})();
