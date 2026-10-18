const K={dry:{L:12,W:2.4,mw:28.8/24.5},hybrid:{L:12,W:2.8,mw:0.67},towerS:{L:5.5,W:2.6,mw:1.29},towerL:{L:7.3,W:4.3,mw:6.13}};
const sp=(n,s)=>s==='2n'?2*n:s==='n1'?n+1:n;
for(const mw of [0.5,1,2,5,10,20]){const Q=mw*1.55;const r={};
 for(const o of ['dry','towers','hybrid']){const k=o==='towers'?(Q>6?K.towerL:K.towerS):K[o];const n=sp(Math.max(1,Math.ceil(Q/k.mw)),'n1');r[o]=[n,+(n*k.L*k.W).toFixed(1)];}
 console.log(mw,JSON.stringify(r));}
