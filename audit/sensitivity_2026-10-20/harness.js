// Sensitivity test, one part at a time (screening in the spirit of Morris; J.B.'s step 7). Runs inside the tool page.
window.SENS=async function(){
  const e=BD.eng, R=e.R, EC=BD.ECON, A=BD.S.answers; const mid=a=>Array.isArray(a)?(a[0]+a[1])/2:a; const clone=o=>JSON.parse(JSON.stringify(o));
  await BD.oppPrep(); const f0=e.siteFacts(); const d=await e.loadRecv(f0.city); if(BD.routeTree) await BD.routeTree(f0);
  async function out(){ A._sens=Math.random(); BD.modelReset(); const f=e.siteFacts(), near=e.nearby(f,d), nets=e.netsAt(f,d); const mw=A.mw||1, rec=(A.inside||'air')!=='air';
    const r=e.calc({mw,recover:rec,to:'near'},f,near,nets), rL=e.calc({mw,recover:true,to:'near'},f,near,nets);
    const cop=R.cop, worth=EC.heatVal(f.city)-EC.elec[f.city]/((cop[0]+cop[1])/2);
    const pts=d.pts.filter(p=>Math.hypot(p.x-f.c[0],p.y-f.c[1])<=3000).map(p=>Object.assign({},p,{econ:BD.heatEcon(f,p,rL.avail)}));
    const ok=pts.filter(p=>p.econ&&isFinite(p.econ.lcohMid)); let best=null; try{ const B=BD.bestHeat(f,pts.filter(p=>p.econ&&p.econ.take),rL.avail[0]); best=B&&B[0]; }catch(x){}
    let opp=null; try{ opp=BD.oppScreen().filter(o=>o.s!=='no').length; }catch(x){}
    let fit=null; try{ fit=BD.fitMax(); }catch(x){} BD.modelReset();
    return {fit, floorMW:mid(f.mw), elec:mid(r.facMWh)/1000, co2:mid(r.facMWh)*R.grid[f.city]/1000, plant:mid(r.plant), noise:mid(e.noiseLw(mw).lw), jobs:mid(r.jobs),
      heat:mid(rL.avail)/1000, homes:mid(rL.homes), best:best?best.mid.lcoh:null, cheapest:ok.length?Math.min(...ok.map(p=>p.econ.lcohMid)):null, pays:ok.filter(p=>p.econ.lcohMid<=worth).length, opps:opp}; }
  const R0=clone(R), E0=clone(EC), A0=clone(A); const dem0=d.pts.map(p=>p.dem);
  const restore=()=>{ for(const k of Object.keys(R0)) R[k]=clone(R0[k]); for(const k of ['pipe','rate','hpFLH']) EC[k]=clone(E0[k]); Object.keys(A).forEach(k=>delete A[k]); Object.assign(A,clone(A0)); delete A._sens; d.pts.forEach((p,i)=>p.dem=dem0[i]); BD.modelReset(); };
  const two=(path,obj)=>[o=>{ obj()[path]=[obj()[path][0],obj()[path][0]]; },o=>{ obj()[path]=[obj()[path][1],obj()[path][1]]; }];
  const P=[
   {k:'pue',node:'pue',what:'PUE 1.40 / 1.55',set:two('pue',()=>R)},
   {k:'capture',node:'liquid_capture',what:'heat caught by liquid cooling 48% / 75%',set:two('capture',()=>R)},
   {k:'cop',node:'cop',what:'heat pump COP 3.0 / 4.5',set:two('cop',()=>R)},
   {k:'hallShare',node:'hall_area',what:'hall share of floor 48% / 72%',set:two('hallShare',()=>R)},
   {k:'m2PerMW',node:'server_floor',what:'hall m² per MW 290 / 630',set:two('m2PerMW',()=>R)},
   {k:'ftf',node:'envelope',what:'upper floor heights 5.5 / 6.0 m',set:[()=>{R.ftf.up=[R0.ftf.up[0],R0.ftf.up[0]];},()=>{R.ftf.up=[R0.ftf.up[1],R0.ftf.up[1]];}]},
   {k:'plant',node:'component_space',what:'plant m² per MW, low / high ends',set:[()=>{ for(const q in R.plant) R.plant[q]=[R0.plant[q][0],R0.plant[q][0]]; },()=>{ for(const q in R.plant) R.plant[q]=[R0.plant[q][1],R0.plant[q][1]]; }]},
   {k:'lw',node:'plant_schedule',what:'sound power per cooling unit, low-noise / standard',set:[()=>{R.lwUnit=[R0.lwUnit[0],R0.lwUnit[0]];R.lwUnitDry=[R0.lwUnitDry[0],R0.lwUnitDry[0]];},()=>{R.lwUnit=[R0.lwUnit[1],R0.lwUnit[1]];R.lwUnitDry=[R0.lwUnitDry[1],R0.lwUnitDry[1]];}]},
   {k:'homeMWh',node:'receiver_demand',what:'a home\'s heat: 2023 (warmest year) / 2018–22 average',set:[()=>{R.homeMWh={van:14.58,edm:29.19};},()=>{}]},
   {k:'estimates',node:'receiver_demand',what:'assessment-estimated buildings: estimate ÷ 1.7 / estimate',set:[()=>{ d.pts.forEach(p=>{ if(p.lo&&!p.meas) p.dem=p.lo; }); },()=>{}]},
   {k:'pipe',node:'distribution_cost',what:'pipe cost per metre, low / high',set:two('pipe',()=>EC)},
   {k:'rate',node:'crf',what:'cost of capital 3% / 8% (5.6% base)',set:[()=>{EC.rate=0.03;},()=>{EC.rate=0.08;}]},
   {k:'hpFLH',node:'demand_profile',what:'heat pump full-load hours 4,400 / 7,100',set:two('hpFLH',()=>EC)},
   {k:'inside',node:'cooling_type',what:'cooling inside: air / liquid to the chip',set:[()=>{A.inside='air';},()=>{A.inside='plate';}]},
   {k:'size',node:'size_fit',what:'size: 2.5 MW (resident default) / largest that fits',set:[()=>{A.mw=2.5;},async()=>{ A.mw=null; BD.modelReset(); const m=BD.fitMax(); A.mw=m; }]},
  ];
  restore(); const base=await out(); const res=[];
  for(const p of P){ const row={k:p.k,node:p.node,what:p.what,lo:null,hi:null};
    for(const [i,s] of p.set.entries()){ restore(); try{ await s(); row[i?'hi':'lo']=await out(); }catch(x){ row.err=String(x); } }
    res.push(row); }
  restore(); return {site:(BD.S.sel.a||[])[0], city:f0.city, mw:A.mw, inside:A.inside, base, res}; };
