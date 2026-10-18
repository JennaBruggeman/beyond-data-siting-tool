const R={pue:[1.4,1.55],lf:0.6,capture:[0.48,0.75],cop:[3.0,4.5],homeMWh:{van:14.58,edm:29.19},grid:{van:18.1,edm:346.1},fuelLkWh:0.263,fuelHours:12};
const fmt=n=>n==null?'—':Math.round(n).toLocaleString('en-CA');
const rg=(a,u,d)=>{ const f=v=>d?v.toFixed(d):fmt(v); return a[0]===a[1]?`${f(a[0])}${u?' '+u:''}`:`${f(a[0])}–${f(a[1])}${u?' '+u:''}`; };
function nums(mw,city,des,pue){ const P=pue?[pue,pue]:R.pue;
  const fac=[mw*P[0],mw*P[1]], MWh=fac.map(v=>v*8760*R.lf), it=mw*8760*R.lf;
  const rec=des.inside&&des.inside!=='air';
  const avail=rec?[it*R.capture[0]*R.cop[1]/(R.cop[1]-1),it*R.capture[1]*R.cop[0]/(R.cop[0]-1)]:[0,0];
  const hp=rec?[avail[0]/R.cop[1],avail[1]/R.cop[0]]:[0,0];
  return {MWh,co2:MWh.map(v=>v*R.grid[city]/1000),avail,homes:avail.map(v=>v/R.homeMWh[city]),hpco2:hp.map(v=>v*R.grid[city]/1000)};}
const ST=[0.1,0.2,0.3,0.5,0.75,1,1.5,2,2.5,3,4,5,6,8,10,12,15,20,25,30,40];
for(const mw of ST){ const n=nums(mw,'van',{inside:'liquid'});
 const sizes=[Math.max(0.1,+(mw/2).toFixed(1)),+mw.toFixed(1)];
 console.log(mw,'sizes',sizes.join(','),'| heat',rg(n.avail.map(v=>v/1000),'GWh/yr',0),'| elec',rg(n.MWh.map(v=>v/1000),'GWh/yr',0),'| 50y',rg(n.MWh.map(v=>v*50/1e6),'TWh',1),'| co2',rg(n.co2,'t'),'| homes',rg(n.homes));}
console.log('VAN4 pue1.5 1MW', nums(1,'van',{inside:'air'},1.5).MWh);
console.log('5000ft2 m2',5000/10.7639, 'homes', 52.5/3.6, 105.1/3.6, 'fuel/MW/24h',0.263*1000*24);
console.log('dry units 1MW plant.js', Math.ceil(1.55/(28.8/24.5)), 'area', Math.ceil(1.55/(28.8/24.5))*28.8, 'engine', 24.5);
