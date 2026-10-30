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
 gens:'Standby diesel generator sets in Sound Level 2 enclosures with sub-base tanks. Basis units: Rehlko (Kohler) KD2000, 2,000 kW standby (data-centre continuous rating the same), 13.49 × 3.49 m, up to 4.78 m high (G5-626, rev 6/24); KD1000, 1,000 kW, 8.43 × 2.62 m, 3.71 m high with the 12 h tank (G6-154, 12/23). Both EPA Tier 2, cULus (UL 2200, CSA C22.2 No. 100); manufacturer claims. Chosen 29 Oct 2026 as the middle of Cat, Rehlko and Generac: 2 MW 18.5–38.4 m² per MW, 1 MW 19.5–22.4. 1 m clear around each set (Cummins application manual; not checked ?); 1.5 m from wall openings and combustible walls (NFPA 37 s. 4.1.4, a US standard; Vancouver points to CSA C282, not read).',
};
const KIND={
 dry:{name:'dry coolers',L:12.0,W:2.4,H:2.88,mw:28.8/24.5,wall:[0.9,2.1],gap:[1.8,4.3]},
 chillS:{name:'air-cooled chillers',L:12.141,W:2.362,H:2.896,mw:1.489,wall:[0.9,2.1],gap:[1.8,4.3]},
 chillL:{name:'air-cooled chillers',L:12.141,W:2.362,H:2.896,mw:1.489,wall:[0.9,2.1],gap:[1.8,4.3]},
 hybrid:{name:'hybrid coolers',L:12.0,W:2.8,H:2.88,mw:0.67,mwHi:1.37,wall:[0.9,2.1],gap:[1.8,4.3]},
 towerS:{name:'cooling tower cells',L:6.579,W:3.607,H:3.886,mw:3.03,wall:[2.7,2.7],gap:[1.8,4.0]},
 towerL:{name:'cooling tower cells',L:6.579,W:3.607,H:3.886,mw:3.03,wall:[2.7,2.7],gap:[1.8,6.0]},
 gen1:{name:'standby generators',L:8.434,W:2.616,H:3.706,mw:1.0,wall:[1.5,1.5],gap:[2.0,2.0]},
 gen2:{name:'standby generators',L:13.493,W:3.488,H:4.777,mw:2.0,wall:[1.5,1.5],gap:[2.0,2.0]},
};
// heat to reject ≈ the facility's peak power (servers × the high PUE): almost all electricity ends as heat. Sized in full even with heat recovery:
// if a receiver leaves, all heat goes back to the coolers (register: horizons, four futures).
const spare=(n,s)=>s==='2n'?n*2:s==='n1'?n+1:n;
function sizeFor(mw,A){
  const pue=BD.eng?BD.eng.R.pue[1]:1.55, Q=mw*pue;
  const out=A.outside||'dry', air=(A.inside||'air')==='air'; // sweep M31 (J.B. 18 Oct): air-cooled halls need chillers; dry coolers alone only for liquid cooling
  const k=out==='towers'?(Q>6?KIND.towerL:KIND.towerS):out==='hybrid'?KIND.hybrid:air?(Q>6?KIND.chillL:KIND.chillS):KIND.dry;
  const need=Math.max(1,Math.ceil(Q/k.mw)), n=spare(need,A.spares||'n1');
  const g=A.gens==='none'?null:(Q>3?KIND.gen2:KIND.gen1); const gNeed=g?Math.max(1,Math.ceil(Q/g.mw)):0, gN=g?spare(gNeed,A.genSpares||'n1'):0;
  return {Q,k,need,n,g,gNeed,gN,src:SRC[out==='towers'?'towers':out==='dry'&&air?'chill':out]};
}
/* pack w × d rectangles (long side along the frame's u axis unless rot) inside a region, with wall and unit clearances */
function pack(F,region,forbid,u0,u1,v0,v1,k,count,rot){
  const L=rot?k.W:k.L, W=rot?k.L:k.W, wu=rot?k.wall[1]:k.wall[0], wv=rot?k.wall[0]:k.wall[1], gu=rot?k.gap[1]:k.gap[0], gv=rot?k.gap[0]:k.gap[1];
  const out=[]; const okPt=(a,b,inner)=>{ const [x,y]=F.toW(a,b); return BD.pip(x,y,region)&&!forbid.some(f=>BD.pip(x,y,f)); };
  const e=0.05; // points exactly on a shared edge (strip next to the building) count as outside it
  for(let v=v0+wv+W/2; v<=v1-wv-W/2+1e-6 && out.length<count; v+=W+gv)
    for(let u=u0+wu+L/2; u<=u1-wu-L/2+1e-6 && out.length<count; u+=L+gu){
      const cs=[[u-L/2-wu+e,v-W/2-wv+e],[u+L/2+wu-e,v-W/2-wv+e],[u+L/2+wu-e,v+W/2+wv-e],[u-L/2-wu+e,v+W/2+wv-e],[u,v],[u-L/2,v],[u+L/2,v],[u,v-W/2],[u,v+W/2]];
      if(cs.every(([a,b])=>okPt(a,b))) out.push({u,v,L,W}); }
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
    const Z=m.Z, lot=m.lotArea, n=m.nF?m.nF[0]:2, up=Z.ground?lot*Z.fsr[0]*(n-1)/n:lot*Z.fsr[0]; mw=+Math.max(0.1,Math.min(40,up*0.48/630)).toFixed(1); m.mwProvisional=true; }
  m.mwSized=mw; const s=sizeFor(mw,A); const P={s,boxes:[],lines:[],genLines:[],short:''}; m.plant=P;
  const at=A.plantAt||'roof', genAt=A.genAt||'yard';
  P.coolYard=at==='yard'?s.n:at==='split'?Math.floor(s.n/2):0; P.coolRoof=s.n-P.coolYard;
  P.genYard=s.g&&genAt==='yard'?s.gN:0; P.genRoof=s.g&&genAt==='roof'?s.gN:0;
  // reserve a strip for yard plant on a new building whose footprint the tool sets
  if(!m.existing&&m.uBuild&&(P.coolYard||P.genYard)){ const wv=m.v[1]-m.v[0]; let depth=0;
    const rowDepth=(k,n)=>{ const per=Math.max(0,Math.floor((wv-2*k.wall[0]+k.gap[0])/(k.L+k.gap[0]))); if(!per) return null; const r=Math.ceil(n/per); return 2*k.wall[1]+r*k.W+(r-1)*k.gap[1]; };
    for(const [k,n] of [[s.k,P.coolYard],[s.g,P.genYard]]){ if(!n||!k) continue; const d=rowDepth(k,n); if(d==null){ P.short+=`The lot is too narrow for a ${k.L} m ${k.name.replace(/s$/,'')} across it. `; continue; } depth+=d; }
    const avail=Math.abs(m.uBuild[1]-m.uBuild[0]); if(depth>avail*0.9){ P.short+='The plant yard would take almost the whole buildable area. '; depth=Math.min(depth,avail*0.9); }
    m.plantYardDepth=depth; const a0=m.plantYardStart, a1=a0+m.dir*depth; P.yard=BD.geo.rectW(F,Math.min(a0,a1),Math.max(a0,a1),m.v[0],m.v[1]); P.yardU=[Math.min(a0,a1),Math.max(a0,a1)];
  }
 },
 /* after the footprint: put units on the roof and in the yard, and report what does not fit */
 roof(m){
  const A=BD.S.answers, P=m.plant, F=m.F; if(!P||!F||!m.foot) return; const s=P.s;
  // J.B. 20 Oct (examples that 'did not fit'): once a size is set the building is only as big as that size needs (m.sizedTo, site.js); the plant
  // goes on that building's roof and in the yard around it, not around the most the lot could hold
  const bld=m.sizedTo&&m.serverFoot?m.serverFoot:m.foot;
  const roofRing=bld, roofH=m.existing?(m.roofH||m.H):m.H;
  const [ru0,ru1,rv0,rv1]=localBounds(F,roofRing);
  const put=(k,count,base,where)=>{ if(!count||!k) return 0; let got=[];
    if(where==='roof'){ got=pack(F,roofRing,[],ru0,ru1,rv0,rv1,k,count,false); // then turned 90° where the roof's shape suits that better (a C-shaped tower roof, 20 Oct)
      if(got.length<count){ const tk=got.map(p=>BD.geo.rectW(F,p.u-p.L/2-1,p.u+p.L/2+1,p.v-p.W/2-1,p.v+p.W/2+1)); const g2=pack(F,roofRing,tk,ru0,ru1,rv0,rv1,k,count-got.length,true); got=got.concat(g2); } }
    else { const lotR=m.inset?BD.geo.clip(m.ring,m.inset):m.ring; const forbid=P.boxes.filter(b=>b.kind==='yard').map(b=>b.clear); if(m.existing) (m.feet||[]).forEach(f=>forbid.push(f.r)); else { if(bld) forbid.push(bld); if(m.loading) forbid.push(m.loading); }
      // yard: the reserved strip for a new building (units turned across it); anywhere in the usable lot for an existing one
      if(P.yard&&!m.existing){ const [a,b,c,d]=localBounds(F,P.yard); got=pack(F,lotR,forbid,a,b,c,d,k,count,true);
        if(got.length<count){ const taken=P.boxes.map(x=>x.clear).concat(got.map(p=>BD.geo.rectW(F,p.u-p.L/2-1,p.u+p.L/2+1,p.v-p.W/2-1,p.v+p.W/2+1))); const [a2,b2,c2,d2]=localBounds(F,lotR);
          got=got.concat(pack(F,lotR,forbid.concat(taken),a2,b2,c2,d2,k,count-got.length,false)); } }
      else { const [a,b,c,d]=localBounds(F,lotR); got=pack(F,lotR,forbid,a,b,c,d,k,count,false); if(got.length<count) got=got.concat(pack(F,lotR,forbid.concat(got.map(p=>BD.geo.rectW(F,p.u-p.L/2-1,p.u+p.L/2+1,p.v-p.W/2-1,p.v+p.W/2+1))),a,b,c,d,k,count-got.length,true)); } }
    got.forEach(p=>P.boxes.push(boxOf(F,p,k,base,where)));
    return got.length; };
  P.boxes=[];
  // indoors (visibility choice): the heat-rejection units go into a louvred plant floor instead of the roof; its area is taken from the floor area
  P.indoor=0; if(A.vis==='indoors'&&P.coolRoof){ P.indoor=P.coolRoof*(s.k.L+2*s.k.wall[0])*(s.k.W+s.k.gap[1]); P.coolRoofIndoor=P.coolRoof; P.coolRoof=0; }
  const cr=put(s.k,P.coolRoof,roofH,'roof'), cy=put(s.k,P.coolYard,0,'yard');
  // generators: never on top of coolers; roof sets go where coolers left room
  let gr=0; if(P.genRoof){ const used=P.boxes.filter(b=>b.kind==='roof').map(b=>b.clear); let got=pack(F,roofRing,used,ru0,ru1,rv0,rv1,s.g,P.genRoof,false); if(got.length<P.genRoof) got=got.concat(pack(F,roofRing,used.concat(got.map(p=>BD.geo.rectW(F,p.u-p.L/2-1,p.u+p.L/2+1,p.v-p.W/2-1,p.v+p.W/2+1))),ru0,ru1,rv0,rv1,s.g,P.genRoof-got.length,true)); got.forEach(p=>P.boxes.push(boxOf(F,p,s.g,roofH,'roof'))); gr=got.length; }
  const gy=put(s.g,P.genYard,0,'yard');
  const kname=s.k.name, miss=[];
  if(cr<P.coolRoof) miss.push(`${P.coolRoof-cr} of ${P.coolRoof} ${kname} do not fit on the roof`);
  if(cy<P.coolYard) miss.push(`${P.coolYard-cy} of ${P.coolYard} ${kname} do not fit in the yard`);
  if(gr<P.genRoof) miss.push(`${P.genRoof-gr} of ${P.genRoof} generators do not fit on the roof`);
  if(gy<P.genYard) miss.push(`${P.genYard-gy} of ${P.genYard} generators do not fit in the yard`);
  P.miss=miss; P.placed={cr,cy,gr,gy};
  if(miss.length){ const tips=[]; if(cr<P.coolRoof||cy<P.coolYard) tips.push(`for the coolers: ${A.plantAt==='roof'?'the yard or a split':'the roof or a split'}${A.outside==='dry'?', cooling towers (smaller, but they use water)':''}`); if(gr<P.genRoof||gy<P.genYard) tips.push(`for the generators: ${A.genAt==='yard'?'a smaller footprint (set the coverage in step 2) or the roof':'the yard'}`); tips.push('or a smaller size'); P.short+=`Doesn't fit: ${miss.join('; ')}. Try ${tips.join('; ')}.`; }
  const mwT=m.mwSized.toFixed(m.mwSized<10?1:0);
  P.lines=[`Sized for <b>${mwT} MW</b> of servers${m.mwProvisional?' (a provisional size until one is set on the What fits page)':''}: heat to reject ≈ ${mwT} × PUE 1.55 = <b>${s.Q.toFixed(1)} MW</b> at peak.`,
   `${s.need} ${kname} carry it${s.k===KIND.hybrid?` (at the low end of 0.67–1.37 MW a unit; ${Math.ceil(s.Q/1.37)} at the high end)`:''}; with spares, <b>${s.n}</b>. Placed: ${cr} on the roof, ${cy} in the yard.`,
   `Each unit about ${s.k.L} × ${s.k.W} m, ${s.k.H} m high, with ${s.k.wall[0]}–${s.k.wall[1]} m to walls and ${s.k.gap[0]}–${s.k.gap[1]} m between units (dashed in 3D).`,
   `<span class="src">${s.src}</span>`];
  P.genLines=s.g?[`${s.gNeed} generator set${s.gNeed>1?'s':''} of about ${s.g.mw} MW carry ${s.Q.toFixed(1)} MW; with spares, <b>${s.gN}</b>. Placed: ${gr} on the roof, ${gy} in the yard.`,`Each about ${s.g.L} × ${s.g.W} m, ${s.g.H} m high; 1.5 m from the building, 2 m between sets (assumed from the 1 m service clearance).`,`<span class="src">${SRC.gens}</span>`]:['No generators.'];
 }
};
})();
