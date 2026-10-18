function norm(v){ const l=Math.hypot(v[0],v[1])||1; return [v[0]/l,v[1]/l]; }
function offsetRing(r,d){ const n=r.length/2, out=[]; const sa=(()=>{ let s=0; for(let i=0,j=r.length-2;i<r.length;j=i,i+=2) s+=(r[j]*r[i+1]-r[i]*r[j+1]); return s>0?1:-1; })();
  for(let i=0;i<n;i++){ const p=[r[2*((i-1+n)%n)],r[2*((i-1+n)%n)+1]], q=[r[2*i],r[2*i+1]], s=[r[2*((i+1)%n)],r[2*((i+1)%n)+1]];
    const n1=norm([q[1]-p[1],-(q[0]-p[0])]), n2=norm([s[1]-q[1],-(s[0]-q[0])]); let m=norm([n1[0]+n2[0],n1[1]+n2[1]]); const cos=m[0]*n1[0]+m[1]*n1[1]; const k=d*-sa/Math.max(0.35,cos);
    out.push(q[0]+m[0]*k,q[1]+m[1]*k); } return out; }
console.log('ccw',offsetRing([0,0,10,0,10,10,0,10],10));
console.log('cw',offsetRing([0,0,0,10,10,10,10,0],10));
console.log('ccw big',offsetRing([0,0,100,0,100,50,0,50],10));
console.log('cw big',offsetRing([0,0,0,50,100,50,100,0],10));
