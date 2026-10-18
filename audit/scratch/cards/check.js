const R={cop:[3.0,4.5],homeMWh:{van:14.58,edm:29.19},lf:0.6,capture:[0.48,0.75]};
const ECON={eur:1.5782,usd:1.3978,pipe:[1038,2620],pipeCheck:1541,fixed:112611,gas:{van:9.305*3.6,edm:(1.045+1.458)*3.6},elec:{van:67.9,edm:+(43.68+2.53+0.0809*43.68).toFixed(2)},years:5,co2pipe:2*(39.5+1.03+0.205)};
console.log('pipe lo',658*1.5782,'hi',1660*1.5782,'check',336*3.28084*1.3978);
console.log('gas',ECON.gas,'GJ disp',(ECON.gas.van/3.6).toFixed(2),(ECON.gas.edm/3.6).toFixed(2),'elec',ECON.elec,'co2pipe',ECON.co2pipe);
for(const c of ['van','edm']){const v=ECON.gas[c],pe=ECON.elec[c];console.log(c,'net worst',v-pe/3,'best',v-pe/4.5,'elec thresh v*cop',v*4.5, 'pe/4.5',(pe/4.5).toFixed(1),'pe/3',(pe/3).toFixed(1));}
// 1 MW
const it=1*8760*R.lf, cap=[it*.48,it*.75], avail=[cap[0]*4.5/3.5,cap[1]*1.5]; console.log('it',it,'avail',avail);
// share for big housing
for(const u of [100,300,1924]){const d=u*14.58;console.log('u',u,'demand',d,'share', Math.round(d/avail[1]*100)+'–'+Math.round(Math.min(1,d/avail[0])*100)+'%');}
// close-gap electricity check for van beyond case
function econ(c,route,demand){const v=ECON.gas[c],pe=ECON.elec[c];const net=[v-pe/3,v-pe/4.5];const val=net.map(n=>5*demand*n);const be=[(val[1]-ECON.fixed)/ECON.pipe[0],(val[0]-ECON.fixed)/ECON.pipe[1]];
 const need=(ECON.fixed+route*ECON.pipe[0])/(5*demand)+pe/4.5; const peNeed=(v-(ECON.fixed+route*ECON.pipe[0])/(5*demand))*4.5; return {net,val,be,needGJ:need/3.6,peNeeded:peNeed};}
console.log('van 500 homes? demand 1000 MWh route 800',econ('van',800,1000));
console.log('edm demand 2000 route 500',econ('edm',500,2000));
console.log('13940 m2 in ft2',13940*10.7639,'150000ft2->m2',150000/10.7639);
