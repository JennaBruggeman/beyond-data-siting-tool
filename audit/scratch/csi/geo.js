const src=require('fs').readFileSync('/mnt/user-data/outputs/tool/site.js','utf8');
const s=src.slice(src.indexOf('function hull('),src.indexOf('BD.geo='));
const BD={pip:(x,y,r)=>{ let c=false; for(let i=0,j=r.length-2;i<r.length;j=i,i+=2){ const xi=r[i],yi=r[i+1],xj=r[j],yj=r[j+1]; if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi)) c=!c; } return c; }};
const area=r=>{ let s=0; for(let i=0,j=r.length-2;i<r.length;j=i,i+=2) s+=(r[j]+r[i])*(r[j+1]-r[i+1]); return Math.abs(s/2); };
eval(s+';global.G={frameOf,rectW,clip,hull,inscribe};');
// rotated rectangle 100x40 at 30deg
const th=Math.PI/6, R=(x,y)=>[x*Math.cos(th)-y*Math.sin(th)+500, x*Math.sin(th)+y*Math.cos(th)+200];
const ring=new Float64Array([R(-50,-20),R(50,-20),R(50,20),R(-50,20)].flat());
const F=G.frameOf(ring); console.log('L,W',F.L.toFixed(3),F.W.toFixed(3));
const r=G.rectW(F,-50+3.1,50,-20,20); console.log('inset area',area(r).toFixed(2),'expect',(96.9*40).toFixed(2));
const c=G.clip(ring,G.rectW(F,0,80,-30,30)); console.log('clip area',area(c).toFixed(2),'expect',(50*40));
// L-shaped lot
const Ls=new Float64Array([0,0,60,0,60,20,20,20,20,60,0,60]); const F2=G.frameOf(Ls); console.log('L-lot',F2.L,F2.W,'area',area(Ls));
const q=G.inscribe(F2,Ls,-30,30,-30,30); console.log('inscribe',q, q?((q[1]-q[0])*(q[3]-q[2])):0);
const c2=G.clip(Ls,G.rectW(F2,-30,30,-30,30)); console.log('clip L by its bbox',area(c2),'expect',area(Ls));
