/* Beyond Data — equipment kit for the 3D (J.B., 28 Oct 2026: "show the equipment, but dash an envelope and make the building see through";
   "can you model ones for us that are accurate"). Each builder returns a THREE.Group in metres: origin at the centre of the base,
   x along the unit's length, z across its width, y up. Overall sizes come from the makers' documents listed in SPEC; anything the
   documents do not print (fan rows, fan diameter, leg height …) is drawn generically and listed under `drawn`, so the key can say so.
   Generic equipment only: no maker's unit is reproduced, and nothing locates real equipment. Needs three.js r128 (window.THREE). */
(function(){
'use strict';
const BD=window.BD=window.BD||{};
let T=null;
const COL={body:0xf4f3f0,shade:0xe3e1dc,dark:0x55585d,edge:0x3b3d42,fan:0x2f3135,acc:0xCC746C,heat:0xC23B33,power:0xC9971C,water:0x3f97c6,pad:0xd8cfb8};
const M={}; // shared materials, made once three is loaded
function mats(){ if(M.body) return M;
  const std=(c,o)=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.92,metalness:0,flatShading:true},o||{}));
  M.body=std(COL.body); M.shade=std(COL.shade); M.dark=std(COL.dark); M.fan=std(COL.fan); M.pad=std(COL.pad);
  M.heat=std(COL.heat); M.power=std(COL.power); M.water=std(COL.water);
  M.edge=new T.LineBasicMaterial({color:COL.edge,transparent:true,opacity:.7});
  M.fine=new T.LineBasicMaterial({color:COL.edge,transparent:true,opacity:.28});
  return M; }

/* ---------- primitives ---------- */
function edges(mesh,mat){ const e=new T.LineSegments(new T.EdgesGeometry(mesh.geometry,25),mat||M.edge); e.position.copy(mesh.position); e.rotation.copy(mesh.rotation); return e; }
function box(g,L,H,W,x,y,z,mat,noEdge){ const m=new T.Mesh(new T.BoxGeometry(L,H,W),mat||M.body); m.position.set(x,y+H/2,z); g.add(m); if(!noEdge) g.add(edges(m)); return m; }
function cyl(g,r,h,x,y,z,mat,axis,seg){ const m=new T.Mesh(new T.CylinderGeometry(r,r,h,seg||28),mat||M.body); m.position.set(x,y,z);
  if(axis==='x') m.rotation.z=Math.PI/2; else if(axis==='z') m.rotation.x=Math.PI/2; else m.position.y=y+h/2; g.add(m); g.add(edges(m)); return m; }
function lines(g,pts,mat){ const geo=new T.BufferGeometry().setFromPoints(pts); g.add(new T.LineSegments(geo,mat||M.fine)); }
const v=(x,y,z)=>new T.Vector3(x,y,z);
/* a fan seen from above: dark opening, guard rings, hub */
function fan(g,r,x,y,z){ const d=new T.Mesh(new T.CircleGeometry(r,32),M.fan); d.rotation.x=-Math.PI/2; d.position.set(x,y+0.003,z); g.add(d);
  const ring=(rr)=>{ const p=[]; for(let i=0;i<48;i++){ const a=i/48*Math.PI*2, b=(i+1)/48*Math.PI*2; p.push(v(x+rr*Math.cos(a),y+0.01,z+rr*Math.sin(a)),v(x+rr*Math.cos(b),y+0.01,z+rr*Math.sin(b))); } lines(g,p,M.edge); };
  ring(r); ring(r*0.66); ring(r*0.33);
  const p=[]; for(let i=0;i<4;i++){ const a=i*Math.PI/4; p.push(v(x-r*Math.cos(a),y+0.012,z-r*Math.sin(a)),v(x+r*Math.cos(a),y+0.012,z+r*Math.sin(a))); } lines(g,p,M.edge);
  const hub=new T.Mesh(new T.CircleGeometry(r*0.12,16),M.body); hub.rotation.x=-Math.PI/2; hub.position.set(x,y+0.014,z); g.add(hub); }
/* horizontal slats on a vertical face: face normal ±z (side) or ±x (end) */
function louvres(g,axis,c,w,y0,y1,step,off){ const p=[]; for(let y=y0+step/2;y<y1;y+=step){ if(axis==='z') p.push(v(c[0]-w/2,y,c[1]+off),v(c[0]+w/2,y,c[1]+off)); else p.push(v(c[0]+off,y,c[1]-w/2),v(c[0]+off,y,c[1]+w/2)); } lines(g,p); }
/* vertical fins (a coil face) on a plane between two points */
function fins(g,a,b,h,n,yb){ const p=[]; for(let i=0;i<=n;i++){ const t=i/n; const x=a[0]+(b[0]-a[0])*t, z=a[1]+(b[1]-a[1])*t; p.push(v(x,yb,z),v(x,yb+h,z)); } lines(g,p); }
function slope(g,x0,x1,zTop,zBot,yTop,yBot,mat){ // a sloped coil face along x, from (zTop,yTop) to (zBot,yBot)
  const geo=new T.BufferGeometry(); const P=[x0,yTop,zTop, x1,yTop,zTop, x1,yBot,zBot, x0,yBot,zBot]; geo.setAttribute('position',new T.Float32BufferAttribute(P,3)); geo.setIndex([0,1,2,0,2,3]); geo.computeVertexNormals();
  const m=new T.Mesh(geo,mat||M.shade); m.material.side=T.DoubleSide; g.add(m);
  lines(g,[v(x0,yTop,zTop),v(x1,yTop,zTop),v(x1,yTop,zTop),v(x1,yBot,zBot),v(x1,yBot,zBot),v(x0,yBot,zBot),v(x0,yBot,zBot),v(x0,yTop,zTop)],M.edge);
  const p=[]; const n=Math.round((x1-x0)/0.15); for(let i=1;i<n;i++){ const x=x0+(x1-x0)*i/n; p.push(v(x,yTop,zTop),v(x,yBot,zBot)); } lines(g,p); }

/* ---------- the units ---------- */
const SPEC={
 dry:{name:'Dry cooler, V-coil',L:12.04,W:2.383,H:2.883,src:'EVAPCO eco-Air EAW-VD9120ZA, catalogue EA26MRKT (2026) p.13: 39\'-5-7/8" × 7\'-9-7/8", 9\'-5-1/2" high; 20 fans in two rows of 10; 4461 MBH = 1.31 MW (maker\'s claim)',
   unsure:['fan Ø not printed; 0.95 m drawn to fill each fan bay','pedestal and coil proportions read off the end elevation (not dimensioned)','connection pipe Ø not printed; 0.14 m drawn','control box on the end opposite the connections (270B); its size ?']},
 chill:{name:'Air-cooled chiller with free-cooling coils',L:12.141,W:2.362,H:2.896,src:'Vertiv Liebert AFC FIZ135 (SL-71060 R09/24, "Preliminary data"): 478 × 93 × 114 in, 1489 kW at 95 °F ambient, 82/66 °F fluid, 30% glycol; "oversized free cooling coils". Chosen as the middle of Vertiv and Airedale (16.4–30.5 m² per MW)',
   unsure:['fan count and rows not printed; 2 × 9 drawn','fan Ø not printed; 0.8 m drawn','compressor and controls bay at one end drawn; position ?','chilled-water connections drawn on the side; position ?']},
 hybrid:{name:'Adiabatic (hybrid) cooler',L:12.04,W:2.765,H:2.883,src:'EVAPCO eco-Air EAW-VA, EA26MRKT (2026) p.13 note: adiabatic width 9\'-7/8"; same drawing, 9\'-5-1/2" high; p.8: wetted pads stand outside both coil faces',
   unsure:['height taken from the dry model\'s drawing (the note gives only the adiabatic width)','fan Ø not printed; 0.95 m drawn','pad height read off the p.8 figure (not dimensioned)','pad frame and water header drawn generically']},
 tower:{name:'Cooling tower cell (crossflow)',L:6.579,W:3.607,H:3.886,A:3.454,src:'BAC Series 3000 S3E-1222-07R (Engineering Data C15–C16, 2023): W 21\'-7" (end elevation, access door both ends), L 11\'-10" (side elevation, intake louvres), H 12\'-9" with fan guard, A 11\'-4"; 690 nominal tons ≈ 3.0 MW. Chosen as the middle of 140 BAC and Marley cells (4.7–16.5 m² per MW)',
   unsure:['fan Ø not printed; drawn to fill the deck','cold-water basin height read off the drawing (not dimensioned)','top inlets and side outlet shown; sizes not mapped from the table']},
 genset:{name:'Standby generator in enclosure (2 MW)',L:13.493,W:3.488,H:4.777,src:'Rehlko (Kohler) KD2000, Sound Level 2 enclosure (G5-626 rev 6/24): 13493 × 3488 × 4777 mm max; 2000 kW standby, data-centre rating the same; Tier 2, UL 2200 + CSA. Chosen as the middle of Cat, Rehlko and Generac (18.5–38.4 m² per MW)',
   unsure:['radiator fans, doors, louvres and controls drawn after the Cat 3516C sheet layout; the Rehlko layout ?','fuel tank (sub-base) height 0.3 m drawn; ?','exhaust: no stack drawn']},
 transformer:{name:'Substation transformer 2,500 kVA',L:2.263,W:2.39,H:2.084,src:'Eaton CA022021EN (Jan 2020) Table 14.1-20: H 2084.1 × W 2263.1 × D 2390.1 mm; radiators "may be mounted on the front and back"',
   unsure:['radiator depth 0.35 m each side drawn; ?','bushings drawn on the cover; position ?']},
 switchgear:{name:'Low-voltage switchgear (6 sections drawn)',L:0.813,W:1.778,H:2.438,src:'Siemens Type WL (Siemens Canada catalogue §12): 32 in wide, 96 in high; at least 70 in deep when cable-connected at 3200 A or more; UL 1558, CSA C22.2 No. 31',unsure:['catalogue date not printed']},
 ups:{name:'UPS, 1 MW frame',L:3.6,W:0.9,H:1.97,src:'Schneider Galaxy VX 1000 kW (990-5451L-001): 3600 × 900 × 1970 mm',unsure:['panel divisions drawn; ?']},
 battery:{name:'Lithium-ion battery cabinet',L:0.6,W:0.75,H:2.0,src:'Vertiv EnergyCore Li5, 18 modules (SL-71271 R06/26): 600 × 750 × 2000 mm, 31.1 kWh, 263 kW; UL 9540A, CSA; about 4 cabinets per MW for 5 min (our calculation)',unsure:['axes not labelled on the sheet; 2000 read as height','only one maker\'s cabinet sheet could be read']},
 bess:{name:'Battery storage container',L:6.058,W:2.438,H:2.896,src:'Sungrow PowerTitan 2.0 ST5015UX data sheet V5 (2024): 6058 × 2438 × 2896 mm; front single-door design',unsure:['cooling unit position ?; drawn at one end','"20 ft" not printed']},
 rack:{name:'Server rack, 42U',L:0.6,W:1.2,H:2.0,src:'Vertiv VR3300 (North American brochure 06/25): 600 × 1200 × 2000 mm, UL 2416; the same 600 × 1200 footprint from Schneider APC, Rittal, Chatsworth and Panduit; 1U = 44.45 mm (EIA-310)',unsure:[]},
 crah:{name:'Room air unit (CRAH), about 180 kW',L:3.099,W:1.067,H:2.388,src:'Vertiv Liebert CW181 (North American, 60 Hz, ©2024): 179 kW, 3.099 × 1.067 × 2.388 m; the middle of the units with printed sizes',unsure:['rated at 23.9 °C return air; not like-for-like with warm-aisle ratings','fan and filter faces drawn; ?']},
 cdu:{name:'Coolant distribution unit, 1.5 MW',L:0.914,W:1.565,H:2.045,src:'Motivair (Schneider) MCDU-50, CDU brochure ©2025: 36 × 61-5/8 × 80-1/2 in, 1516 kW at a 4 K approach; UL, 50/60 Hz. The middle of 10 units from 6 makers',unsure:['pipe connections drawn on top; position ?']},
 heatpump:{name:'Water-to-water heat pump, about 2 MW to 70–90 °C',L:6.1,W:3.0,H:2.1,src:'Johnson Controls Sabroe DualPAC 716-W data sheet (johnsoncontrols.de, undated): 6100 × 3000 × 2100 mm, 1991 kW at 50→70 °C (source 30→20 °C), 1841 kW at 70→90 °C. Nearest the median of 10 units from Sabroe and GEA (5.6–15.1 m² per MW)',unsure:['only Sabroe and GEA print both size and rating at this scale','document date not printed; Canadian use ?','compressor, vessels and frame drawn generically']},
 phe:{name:'Plate heat exchanger',L:3.93,W:0.78,H:2.145,src:'Alfa Laval T20-FM leaflet (2016-04): H 2145, W 780, L 930–3930 mm, DN200 ports',unsure:['duty (MW) for this frame not printed; longest frame drawn']},
 tank:{name:'Buffer tank, 5,000 L',L:1.5,W:1.5,H:3.211,src:'Reflex Storatherm H 5000/R (09/2026): Ø 1500 × 3211 mm, uninsulated',unsure:['how many tanks a 1–3 MW heat pump needs: no source found','connections, manway and feet drawn generically']},
 pipe:{name:'Pre-insulated twin pipe, DN200',L:4,W:0.56,H:0.56,src:'Logstor catalogue 2014.09: DN200 twin, casing Ø 560 (series 1) / 630 / 710 mm',unsure:['2014 edition; check against the current one','carrier pipes drawn one above the other at Ø 219 mm (DN200 steel); arrangement ?']},
};

/* V-coil cooler (EVAPCO end elevation): narrow pedestal on base rails, two coil faces rising to the fan deck, twin fans per bay; pads outside the coils when adiabatic */
/* ---------- detail helpers ---------- */
// a door on a face: face 'z+','z-' (long sides) or 'x+','x-' (ends); c = centre along the face, y0 = sill
function door(g,face,c,y0,w,h,pos,o){ o=o||{}; const t=0.025, ax=face[0], sd=face[1]==='+'?1:-1;
  const m=ax==='z'?box(g,w,h,t,c,y0,sd*pos,M.shade):box(g,t,h,w,sd*pos,y0,c,M.shade);
  const hx=ax==='z'?c+sd*w*0.38*(o.left?-1:1):sd*(pos+0.03), hz=ax==='z'?sd*(pos+0.03):c+w*0.38*(o.left?-1:1);
  box(g,ax==='z'?0.04:0.03,0.22,ax==='z'?0.03:0.04,hx,y0+h*0.45,hz,M.dark,true); // handle
  if(o.louvre){ if(ax==='z') louvres(g,'z',[c,0],w*0.8,y0+h*0.15,y0+h*0.85,0.07,sd*(pos+0.014)); else louvres(g,'x',[0,c],w*0.8,y0+h*0.15,y0+h*0.85,0.07,sd*(pos+0.014)); }
  return m; }
// vertical seams on a face
function seams(g,face,a0,a1,step,y0,y1,pos){ const p=[], sd=face[1]==='+'?1:-1; for(let a=a0+step;a<a1-0.01;a+=step){ if(face[0]==='z') p.push(v(a,y0,sd*(pos+0.002)),v(a,y1,sd*(pos+0.002))); else p.push(v(sd*(pos+0.002),y0,a),v(sd*(pos+0.002),y1,a)); } lines(g,p,M.edge); }
// a pipe stub with a flange, pointing along +/-x or +/-z or up
function stub(g,r,len,x,y,z,dir,mat){ const m=mat||M.dark, d=dir||'x+', s=d[1]==='+'?1:-1;
  if(d[0]==='y'){ cyl(g,r,len,x,y,z,m); cyl(g,r*1.6,0.03,x,y+len-0.03,z,m); return; }
  const ax=d[0], cx=ax==='x'?x+s*len/2:x, cz=ax==='z'?z+s*len/2:z; cyl(g,r,len,cx,y,cz,m,ax);
  const fx=ax==='x'?x+s*(len-0.015):x, fz=ax==='z'?z+s*(len-0.015):z; cyl(g,r*1.6,0.03,fx,y,fz,m,ax); }
// a grid of small dots (perforated door)
function perf(g,face,c0,c1,y0,y1,pos,step){ const sd=face[1]==='+'?1:-1, pts=[]; for(let a=c0;a<=c1;a+=step) for(let y=y0;y<=y1;y+=step){ pts.push(face[0]==='z'?v(a,y,sd*(pos+0.003)):v(sd*(pos+0.003),y,a)); }
  const geo=new T.BufferGeometry().setFromPoints(pts); g.add(new T.Points(geo,new T.PointsMaterial({color:0x8a8d92,size:0.012,sizeAttenuation:true}))); }
function lug(g,x,y,z){ box(g,0.08,0.08,0.03,x,y,z,M.dark,true); }

/* ---------- the units ---------- */
/* V-coil cooler (EVAPCO EA26MRKT p.13 end elevation): base rails, narrow pedestal, two coil faces to the fan deck, twin fans per bay,
   (2) inlets and (2) outlets at one end, (2) inspection panels, control box on the end opposite the connections (270B); pads when adiabatic */
function vcoil(s,pads){ const g=new T.Group(), L=s.L, H=s.H, cw=2.383, deck=H-0.42, ped=0.72, pw=0.85, n=10, bay=L/n;
  for(const z of [-0.6,0.6]) box(g,L,0.12,0.15,0,0,z,M.dark);   // two base rails (I-beams)
  for(let i=0;i<=n;i+=2) box(g,0.1,0.12,1.35,-L/2+0.05+(L-0.1)*i/n,0,0,M.dark,true); // cross members
  box(g,L,ped-0.12,pw,0,0.12,0,M.shade);                     // pedestal
  seams(g,'z+',-L/2,L/2,bay,0.12,ped,pw/2); seams(g,'z-',-L/2,L/2,bay,0.12,ped,pw/2);
  slope(g,-L/2,L/2,cw/2,pw/2-0.05,deck,ped); slope(g,-L/2,L/2,-cw/2,-(pw/2-0.05),deck,ped);   // the two coil faces
  for(const x of [-L/2,L/2]){ const geo=new T.BufferGeometry(); geo.setAttribute('position',new T.Float32BufferAttribute([x,deck,cw/2, x,deck,-cw/2, x,ped,-pw/2, x,ped,pw/2],3)); geo.setIndex([0,1,2,0,2,3]); geo.computeVertexNormals(); const m=new T.Mesh(geo,M.body); m.material.side=T.DoubleSide; g.add(m);
    lines(g,[v(x,deck,cw/2),v(x,deck,-cw/2),v(x,deck,-cw/2),v(x,ped,-pw/2),v(x,ped,-pw/2),v(x,ped,pw/2),v(x,ped,pw/2),v(x,deck,cw/2)],M.edge); }
  for(const sd of [1,-1]) door(g,'x'+(sd<0?'-':'+'),0,ped+0.15,0.55,0.7,L/2+0.01); // inspection panel in each end of the V
  for(const z of [0.62,-0.62]){ stub(g,0.07,0.35,-L/2,deck-0.25,z*1.45,'x-'); stub(g,0.07,0.35,-L/2,ped+0.12,z*0.55,'x-'); } // (2) inlets high, (2) outlets low
  box(g,0.25,0.75,0.6,L/2+0.13,ped+0.9,0.25,M.shade);         // control box, end opposite the connections
  box(g,L,0.22,cw,0,deck,0,M.body);                          // fan deck
  const p=[]; for(let i=1;i<n;i++){ const x=-L/2+bay*i; p.push(v(x,ped,cw/2),v(x,deck,cw/2),v(x,ped,-cw/2),v(x,deck,-cw/2),v(x,deck+0.222,-cw/2),v(x,deck+0.222,cw/2)); } lines(g,p,M.edge); // bay frames
  for(let i=0;i<n;i++){ const x=-L/2+bay*(i+0.5); for(const z of [cw/4,-cw/4]){ cyl(g,0.5,0.2,x,deck+0.22,z,M.body); fan(g,0.475,x,deck+0.42,z); } }
  for(const x of [-L/2+0.2,L/2-0.2]) for(const z of [-0.6,0.6]) lug(g,x,0.12,z*1.13);
  if(pads){ const W=s.W, pt=0.15, y0=0.35, y1=deck-0.15; for(const sd of [1,-1]){ const z=sd*(W/2-pt/2); box(g,L,y1-y0,pt,0,y0,z,M.pad); box(g,L,0.08,pt+0.1,0,y0-0.08,z,M.shade);
    fins(g,[-L/2,z+sd*(pt/2+0.002)],[L/2,z+sd*(pt/2+0.002)],y1-y0,Math.round(L/0.25),y0); seams(g,'z'+(sd>0?'+':'-'),-L/2,L/2,bay,y0,y1,Math.abs(z)+pt/2+0.003);
    for(let i=0;i<=n;i++){ const x=-L/2+bay*i; box(g,0.06,y1-y0+0.1,0.06,x,y0-0.05,z+sd*0.1,M.dark,true); } // pad frame posts
    cyl(g,0.025,L,0,y1+0.05,z,M.water,'x'); } } // water distribution header over each pad
  return g; }

const B={
 dry(o){ return vcoil(SPEC.dry,false); },
 hybrid(o){ return vcoil(SPEC.hybrid,true); },
 chill(o){ const s=SPEC.chill, g=new T.Group(), L=s.L, W=s.W, H=s.H, base=0.5, bay=2.2, cl=L-bay, top=H-0.3, n=9;
   box(g,L,0.25,W,0,0,0,M.dark);                                           // base frame
   box(g,bay,H-0.25,W,L/2-bay/2,0.25,0,M.body);                            // compressor and controls bay
   for(const sd of ['+','-']) louvres(g,'z',[L/2-bay/2-0.3,0],bay-0.8,0.5,H-0.3,0.1,(sd==='+'?1:-1)*(W/2+0.003));
   door(g,'x+',-0.5,0.4,0.8,1.8,L/2+0.01); door(g,'x+',0.45,0.4,0.8,1.8,L/2+0.01,{left:true});  // control panel doors at the end
   stub(g,0.1,0.4,L/2-0.6,0.7,W/2,'z+'); stub(g,0.1,0.4,L/2-1.2,0.7,W/2,'z+');                      // chilled-water connections
   const x0=-L/2, x1=L/2-bay; slope(g,x0,x1,W/2,0.15,top,base); slope(g,x0,x1,-W/2,-0.15,top,base);
   box(g,cl,top-0.25,0.3,(x0+x1)/2,0.25,0,M.dark,true);
   for(const x of [x0]){ const geo=new T.BufferGeometry(); geo.setAttribute('position',new T.Float32BufferAttribute([x,top,W/2, x,top,-W/2, x,base,-0.15, x,base,0.15],3)); geo.setIndex([0,1,2,0,2,3]); geo.computeVertexNormals(); const m=new T.Mesh(geo,M.body); m.material.side=T.DoubleSide; g.add(m); }
   box(g,cl,0.3,W,(x0+x1)/2,top,0,M.body);
   const p=[]; for(let i=1;i<n;i++){ const x=x0+cl*i/n; p.push(v(x,base,W/2),v(x,top,W/2),v(x,base,-W/2),v(x,top,-W/2)); } lines(g,p,M.edge);
   for(let i=0;i<n;i++){ const x=x0+cl/n*(i+0.5); for(const z of [W/4,-W/4]){ cyl(g,0.42,0.15,x,top+0.3,z,M.body); fan(g,0.4,x,H+0.15,z); } }
   return g; },
 tower(o){ const s=SPEC.tower, g=new T.Group(), L=s.L, W=s.W, H=s.H, A=s.A, basin=0.6;
   box(g,L,basin,W,0,0,0,M.shade);                          // cold-water basin
   box(g,L,A-basin,W,0,basin,0,M.body);                      // casing to A = 8'-8"
   seams(g,'z+',-L/2,L/2,1.1,basin,A,W/2); seams(g,'z-',-L/2,L/2,1.1,basin,A,W/2);   // casing panels
   for(const sd of [1,-1]){ louvres(g,'x',[0,0],W*0.94,basin+0.08,A-0.1,0.1,sd*(L/2+0.003)); const f=sd*(L/2+0.004);
     lines(g,[v(f,basin+0.05,-W*0.47),v(f,A-0.08,-W*0.47),v(f,A-0.08,-W*0.47),v(f,A-0.08,W*0.47),v(f,A-0.08,W*0.47),v(f,basin+0.05,W*0.47),v(f,basin+0.05,W*0.47),v(f,basin+0.05,-W*0.47)],M.edge);
     lines(g,[v(f,basin+0.05,0),v(f,A-0.08,0)],M.edge); }   // intake louvres on the 8'-6" faces, in two panels
   for(const sd of ['+','-']) door(g,'z'+sd,0,basin+0.05,0.75,1.1,W/2+0.012); // access door, both ends (18'-1" faces)
   cyl(g,W*0.44,0.06,0,A,0,M.shade); fan(g,W*0.42,0,A+0.06,0);         // fan in the deck
   const p=[]; const c=[[-L*0.47,-W*0.47],[L*0.47,-W*0.47],[L*0.47,W*0.47],[-L*0.47,W*0.47]];
   for(let k=0;k<4;k++){ const a=c[k], b=c[(k+1)%4]; p.push(v(a[0],A,a[1]),v(0,H,0), v(a[0],A,a[1]),v(b[0],A,b[1])); for(let t=0.25;t<1;t+=0.25){ p.push(v(a[0]*(1-t),A+(H-A)*t,a[1]*(1-t)),v(b[0]*(1-t),A+(H-A)*t,b[1]*(1-t))); } } lines(g,p,M.edge); // fan guard
   stub(g,0.08,0.3,-L*0.3,A,W*0.25,'y+'); stub(g,0.08,0.3,L*0.3,A,W*0.25,'y+');  // standard top inlets
   stub(g,0.1,0.35,L/2,0.25,W*0.25,'x+');                    // side outlet at the connection end
   return g; },
 genset(o){ const s=SPEC.genset, g=new T.Group(), L=s.L, W=s.W, H=s.H, tank=0.3, rl=4.2;
   box(g,L,tank,W+0.06,0,0,0,M.shade);                // sub-base fuel tank
   box(g,L,H-tank,W,0,tank,0,M.body);                 // enclosure
   seams(g,'z+',-L/2,L/2,1.15,tank,H,W/2); seams(g,'z-',-L/2,L/2,1.15,tank,H,W/2);
   box(g,rl,0.06,W*0.96,-L/2+rl/2+0.3,H,0,M.shade); // radiator roof grille
   for(let i=0;i<8;i++){ fan(g,0.42,-L/2+0.3+rl/4*(i%4+0.5),H+0.06,i<4?W/4:-W/4); } // 8 radiator fans
   // left side (z-): 2 maintenance doors for radiator and air intake, with louvres; one personnel door
   door(g,'z-',-L/2+1.3,tank+0.2,1.1,2.4,W/2+0.012,{louvre:true}); door(g,'z-',-L/2+2.6,tank+0.2,1.1,2.4,W/2+0.012,{louvre:true}); door(g,'z-',1.0,tank+0.1,0.9,2.1,W/2+0.012);
   // right side (z+): double personnel doors
   door(g,'z+',0.6,tank+0.1,0.9,2.1,W/2+0.012); door(g,'z+',1.52,tank+0.1,0.9,2.1,W/2+0.012,{left:true});
   door(g,'x+',0,tank+0.4,1.0,1.8,L/2+0.012);         // controls at the rear
   for(const sd of [1,-1]) louvres(g,'z',[L/2-2.2,0],2.6,tank+0.8,H-0.6,0.13,sd*(W/2+0.003)); // ventilation louvres (Level 2: motorised)
   for(const x of [-L/2+0.3,L/2-0.3]) for(const z of [-W/2-0.05,W/2+0.05]) lug(g,x,0.1,z);
   return g; },
 transformer(o){ const s=SPEC.transformer, g=new T.Group(), L=s.L, W=s.W, H=s.H, rad=0.35, tw=W-2*rad, th=H-0.12-0.25;
   box(g,L,0.12,W,0,0,0,M.dark);                                         // base
   box(g,L*0.9,th,tw,0,0.12,0,M.body); box(g,L*0.93,0.06,tw+0.06,0,0.12+th,0,M.shade); // tank and cover flange
   for(const sd of [1,-1]){ for(let i=0;i<10;i++){ box(g,0.03,th*0.78,rad,-L*0.38+L*0.76*i/9,0.3,sd*(tw/2+rad/2),M.shade); }
     for(const y of [0.3,0.3+th*0.78]) cyl(g,0.05,L*0.8,0,y,sd*(tw/2+0.05),M.dark,'x'); }   // radiator panels, front and back, with headers
   for(let i=0;i<3;i++){ cyl(g,0.07,0.32,-L*0.25+L*0.25*i,0.18+th,-tw*0.2,M.dark); cyl(g,0.05,0.22,-L*0.25+L*0.25*i,0.18+th,tw*0.2,M.dark); } // bushings (HV, LV)
   for(const x of [-L*0.43,L*0.43]) for(const z of [-tw/2,tw/2]) lug(g,x,0.12+th-0.1,z+(z>0?0.03:-0.03));
   box(g,0.3,0.2,0.01,L*0.45+0.01,1.2,0,M.shade,true);                  // nameplate
   return g; },
 switchgear(o){ const s=SPEC.switchgear, g=new T.Group(), n=(o&&o.n)||6, L=s.L*n, W=s.W, H=s.H;
   box(g,L,0.1,W,0,0,0,M.dark); box(g,L,H-0.1,W,0,0.1,0,M.body);
   const p=[]; for(let i=1;i<n;i++){ const x=-L/2+s.L*i; p.push(v(x,0.1,W/2+0.003),v(x,H,W/2+0.003)); } lines(g,p,M.edge);
   for(let i=0;i<n;i++){ const x=-L/2+s.L*(i+0.5); for(let k=0;k<3;k++) door(g,'z+',x,0.25+k*0.72,s.L*0.78,0.62,W/2+0.012);
     louvres(g,'z',[x,0],s.L*0.6,H-0.12,H-0.02,0.03,W/2+0.003); }
   return g; },
 ups(o){ const s=SPEC.ups, g=new T.Group(), L=s.L, W=s.W, H=s.H; box(g,L,0.08,W,0,0,0,M.dark); box(g,L,H-0.08,W,0,0.08,0,M.body);
   for(let i=0;i<6;i++){ const x=-L/2+L*(i+0.5)/6; door(g,'z+',x,0.12,L/6-0.03,H-0.24,W/2+0.012); perf(g,'z+',x-L/12+0.1,x+L/12-0.1,H-0.6,H-0.2,W/2+0.03,0.05); }
   box(g,0.25,0.15,0.02,-L/2+L/12,1.4,W/2+0.04,M.dark,true); return g; },  // display
 battery(o){ const s=SPEC.battery, g=new T.Group(); box(g,s.L,s.H,s.W,0,0,0,M.body); door(g,'z+',0,0.08,s.L-0.04,s.H-0.16,s.W/2+0.012); perf(g,'z+',-s.L*0.35,s.L*0.35,0.2,s.H-0.25,s.W/2+0.03,0.05); return g; },
 bess(o){ const s=SPEC.bess, g=new T.Group(), L=s.L, W=s.W, H=s.H; box(g,L,H,W,0,0,0,M.body);
   const p=[]; for(let x=-L/2+0.15;x<L/2;x+=0.15) for(const sd of [1,-1]) p.push(v(x,0.05,sd*(W/2+0.003)),v(x,H-0.05,sd*(W/2+0.003))); lines(g,p);
   door(g,'z+',-L/2+1.1,0.15,1.0,2.3,W/2+0.012); door(g,'z+',-L/2+2.2,0.15,1.0,2.3,W/2+0.012,{left:true});
   box(g,0.05,1.5,1.8,L/2+0.025,0.7,0,M.shade); louvres(g,'x',[0,0],1.6,0.8,2.1,0.06,L/2+0.052); // cooling unit at one end (position ?)
   return g; },
 rack(o){ const s=SPEC.rack, g=new T.Group(), D=s.W; box(g,s.L,s.H,D,0,0,0,M.dark);
   box(g,s.L-0.04,s.H-0.12,0.02,0,0.06,D/2+0.01,M.dark); perf(g,'z+',-s.L/2+0.06,s.L/2-0.06,0.12,s.H-0.12,D/2+0.02,0.03); // perforated front door
   box(g,0.02,0.25,0.03,s.L/2-0.07,s.H*0.5,D/2+0.035,M.shade,true);                             // handle
   for(const x of [-0.18,0.18]) box(g,0.12,0.005,0.3,x,s.H,0,M.fan,true);                          // cable openings in the roof
   for(const x of [-0.25,0.25]) for(const z of [-D*0.42,D*0.42]) cyl(g,0.025,0.03,x,-0.03,z,M.fan); // levelling feet
   return g; },
 crah(o){ const s=SPEC.crah, g=new T.Group(); box(g,s.L,0.1,s.W,0,0,0,M.dark); box(g,s.L,s.H-0.1,s.W,0,0.1,0,M.body);
   for(let i=0;i<4;i++){ const x=-s.L/2+s.L*(i+0.5)/4; door(g,'z+',x,0.15,s.L/4-0.03,s.H*0.5,s.W/2+0.012); }
   louvres(g,'z',[0,0],s.L*0.94,s.H*0.6,s.H-0.12,0.05,s.W/2+0.003); perf(g,'x+',-s.W*0.4,s.W*0.4,s.H*0.6,s.H-0.15,s.L/2,0.06);
   return g; },
 cdu(o){ const s=SPEC.cdu, g=new T.Group(); box(g,s.L,s.H,s.W,0,0,0,M.body); door(g,'z+',-s.L/4,0.08,s.L/2-0.03,s.H-0.16,s.W/2+0.012); door(g,'z+',s.L/4,0.08,s.L/2-0.03,s.H-0.16,s.W/2+0.012,{left:true});
   for(const z of [-0.3,0,0.3]) stub(g,0.06,0.25,s.L*0.1*(z>0?1:-1),s.H,z,'y+',M.dark); return g; }, // connections on top (position ?)
 heatpump(o){ const s=SPEC.heatpump, g=new T.Group(), L=s.L, W=s.W, H=s.H, m=(o&&o.hot)?M.heat:M.body;
   for(const z of [-W*0.4,W*0.4]) box(g,L,0.15,0.12,0,0,z,M.dark); for(let i=0;i<4;i++) box(g,0.12,0.15,W*0.8,-L/2+0.06+(L-0.12)*i/3,0,0,M.dark,true); // skid
   cyl(g,0.38,L*0.78,-0.15,0.6,W*0.2,m,'x'); cyl(g,0.32,L*0.7,0.1,1.32,-W*0.18,m,'x');                  // two shells (condenser, evaporator)
   for(const [x,y,z] of [[-L*0.3,0.6,W*0.2],[L*0.2,0.6,W*0.2],[-L*0.25,1.32,-W*0.18],[L*0.15,1.32,-W*0.18]]) stub(g,0.09,0.42,x,y+0.3,z,'y+',M.dark); // water nozzles
   box(g,1.2,0.8,0.7,L*0.22,1.25,W*0.05,M.dark); cyl(g,0.16,0.7,L*0.22,2.05,0,M.dark); cyl(g,0.12,1.4,L*0.22-0.7,1.75,0,M.dark,'x'); // compressor and suction/discharge
   box(g,0.6,H-0.15,0.6,-L/2+0.3,0.15,-W/2+0.3,M.body); door(g,'x-',-W/2+0.3,0.3,0.5,1.5,L/2+0.012); // control panel
   return g; },
 phe(o){ const s=SPEC.phe, g=new T.Group(), L=s.L, W=s.W, H=s.H;
   box(g,0.25,H,W,-L/2+0.125,0,0,M.dark); box(g,0.2,H*0.95,W,L/2-0.1,0,0,M.dark);   // fixed and pressure plates
   box(g,L-0.45,H*0.78,W*0.9,0,0.2,0,M.shade); const p=[]; for(let x=-L/2+0.3;x<L/2-0.25;x+=0.04) for(const sd of [1,-1]) p.push(v(x,0.2,sd*(W*0.45+0.002)),v(x,0.2+H*0.78,sd*(W*0.45+0.002))); lines(g,p);
   cyl(g,0.04,L+0.3,0.15,H-0.05,0,M.dark,'x'); cyl(g,0.04,L+0.3,0.15,0.12,0,M.dark,'x');      // carrying and guiding bars
   for(const y of [0.35,H*0.45,H-0.35]) for(const z of [-W/2-0.03,W/2+0.03]) cyl(g,0.02,L+0.2,0.05,y,z,M.dark,'x'); // tightening bolts
   for(const y of [0.5,H-0.5]) for(const z of [-W*0.22,W*0.22]) stub(g,0.11,0.35,-L/2,y,z,'x-'); // four DN200 ports on the fixed plate
   return g; },
 tank(o){ const s=SPEC.tank, g=new T.Group(), r=s.L/2, cap=0.3, leg=0.25, m=(o&&o.hot)?M.heat:M.body;
   for(let i=0;i<3;i++){ const a=i/3*Math.PI*2; box(g,0.08,leg,0.08,Math.cos(a)*r*0.8,0,Math.sin(a)*r*0.8,M.dark,true); } // feet
   cyl(g,r,s.H-cap-leg,0,leg,0,m); const d=new T.Mesh(new T.SphereGeometry(r,28,10,0,Math.PI*2,0,Math.PI/2),m); d.scale.y=cap/r; d.position.y=s.H-cap; g.add(d);
   for(const y of [0.6,1.3,2.0,2.7]) stub(g,0.06,0.2,0,leg+y-0.25,r,'z+');                                  // connections up the side
   cyl(g,0.25,0.04,r+0.01,leg+0.8,0,M.shade,'x');                                                            // manway (position ?)
   stub(g,0.04,0.12,0,s.H-0.02,0,'y+');                                                                      // top vent
   return g; },
 pipe(o){ const s=SPEC.pipe, g=new T.Group(), len=(o&&o.len)||s.L, R=s.W/2;
   cyl(g,R,len,0,R,0,M.body,'x');
   for(const dy of [0.11,-0.11]){ cyl(g,0.11,0.05,len/2+0.02,R+dy,0,M.heat,'x'); }                          // two carrier pipes showing at the cut end (DN200 Ø 219 mm)
   const p=[]; for(let x=-len/2+0.5;x<len/2;x+=1.0) { for(let a=0;a<24;a++){ const t0=a/24*Math.PI*2, t1=(a+1)/24*Math.PI*2; p.push(v(x,R+R*Math.cos(t0),R*Math.sin(t0)),v(x,R+R*Math.cos(t1),R*Math.sin(t1))); } } lines(g,p); // joint bands
   return g; },
};

function make(kind,o){ if(!window.THREE) throw new Error('three.js not loaded'); T=window.THREE; mats(); const g=B[kind](o||{}); g.traverse(c=>{ if(c.isMesh){ c.castShadow=true; c.receiveShadow=true; } }); g.userData.kind=kind; g.userData.spec=SPEC[kind]; return g; }
BD.kit={make,SPEC,COL,kinds:Object.keys(B)};
})();
