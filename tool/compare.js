/* Beyond Data — reciprocity is relative (J.B., 16 Oct 2026: "its all a comparison and directly relative"). Every tab opens with the same
   figures for six references, so no number reads as an absolute. Decided 16 Oct (J.B.): a real Vancouver facility and a modelled one; the
   comparison on every card; Edmonton both as the same design and as conventional.
   References: this design · conventional on this site (air-cooled, dry coolers, no heat recovery) · Cologix VAN4 (operator claims only) ·
   Vancouver modelled (conventional, the Vancouver worked-example site) · Edmonton, same design · Edmonton, conventional (both on the Edmonton
   worked-example site). Same size of servers throughout. Site figures for the worked-example sites come from refs_sites.json, computed by the
   tool itself. Never a score; differences only. */
(function(){
'use strict';
const BD=window.BD; const {esc,fmt}=BD; const E=()=>BD.eng;
let SITES=null;
async function sites(){ if(SITES) return SITES; try{ const r=await fetch('refs_sites.json'); SITES=r.ok?(await r.json()).sites:{}; }catch(e){ SITES={}; } return SITES; }
// one scenario's numbers, from the engine's own constants (same formulas as the Two cities tab)
function nums(mw,city,des,pue){ const R=E().R; const P=pue?[pue,pue]:R.pue;
  const fac=[mw*P[0],mw*P[1]], MWh=fac.map(v=>v*8760*R.lf), it=mw*8760*R.lf;
  const rec=des.inside&&des.inside!=='air';
  const avail=rec?[it*R.capture[0]*R.cop[1]/(R.cop[1]-1),it*R.capture[1]*R.cop[0]/(R.cop[0]-1)]:[0,0];
  const hp=rec?[avail[0]/R.cop[1],avail[1]/R.cop[0]]:[0,0];
  const towers=des.outside==='towers'||des.outside==='hybrid';
  return {MWh,co2:MWh.map(v=>v*R.grid[city]/1000),avail,homes:avail.map(v=>v/R.homeMWh[city]),hpco2:hp.map(v=>v*R.grid[city]/1000),
    evap:towers?MWh.map(v=>v*1.5*(des.outside==='hybrid'?{van:0.124,edm:0.104}[city]:1)):[0,0],rec}; }
function refs(f){ const A=BD.S.answers, mw=A.mw||1, here={inside:A.inside||'air',outside:A.outside||'dry'}, conv={inside:'air',outside:'dry'};
  const S=SITES||{}; const other=f.city==='van'?'edm':'van';
  const mm={van:1159.5,edm:422.5};
  const L=[
   {id:'here',lab:'This design',sub:'your choices, this site',city:f.city,des:here,site:{roof:E().roofArea(f),within:null,nets:null},k:'model'},
   {id:'conv',lab:'Conventional, this site',sub:'air-cooled, dry coolers, no heat recovery',city:f.city,des:conv,site:{roof:E().roofArea(f)},k:'model'},
   {id:'van4',lab:'Cologix VAN4, Vancouver',sub:'operator claims: 6.5 MW site, PUE 1.5, air-cooled chilled water; no heat recovery stated',city:'van',des:conv,pue:1.5,site:null,k:'claim'},
   {id:'qu2',lab:'Qu EDM2, Edmonton',sub:'operator claims: 3 MW (Tier III), 1,450 tons of N+1 cooling, 35,000 ft²; no PUE or heat recovery stated',city:'edm',des:conv,site:null,k:'claim',noPue:true},
   {id:'vanm',lab:'Vancouver, modelled',sub:'conventional, worked-example lot'+(S.van?` (${S.van.addr.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase())}, ${S.van.zone})`:''),city:'van',des:conv,site:S.van||null,k:'model'},
   {id:'edmd',lab:'Edmonton, same design',sub:'your choices, worked-example lot'+(S.edm?` (${S.edm.zone})`:''),city:'edm',des:here,site:S.edm||null,k:'model'},
   {id:'edmc',lab:'Edmonton, conventional',sub:'air-cooled, dry coolers, worked-example lot',city:'edm',des:conv,site:S.edm||null,k:'model'}];
  // when the site is the worked-example lot itself, its own row stands in for the modelled row
  return L.map(r=>Object.assign(r,{n:nums(mw,r.city,r.des,r.pue),mm:mm[r.city]})); }
const NS='<span class="sub">not stated</span>';
const rg=(a,u,d)=>{ const f=v=>d?v.toFixed(d):fmt(v); return a[0]===a[1]?`${f(a[0])}${u?' '+u:''}`:`${f(a[0])}–${f(a[1])}${u?' '+u:''}`; };
const NIL='<span class="sub">—</span>';
const COLS={
 heat:[['Heat offered',r=>r.id==='qu2'?NS:r.n.rec?rg(r.n.avail.map(v=>v/1000),'GWh/yr',0):(['conv','van4','vanm','edmc'].includes(r.id)?'no heat recovery in this design':'not yet known (air-cooled)')],['Homes’ heating, as an equal',r=>r.n.rec?rg(r.n.homes):'—'],
       ['Nearest heat network',r=>!r.site?NIL:r.id==='here'||r.id==='conv'?'<span class="sub">see below</span>':(r.site.nets&&r.site.nets.length?`${esc(r.site.nets[0].n.replace(/ \(.*/,''))}, ${fmt(r.site.nets[0].edge)} m`:'none within 1.2 km')]],
 energy:[['Electricity',r=>r.noPue?NS:rg(r.n.MWh.map(v=>v/1000),'GWh/yr',0)],['Its grid carbon',r=>r.noPue?NS:rg(r.n.co2,'t CO₂e/yr')],['Heat-pump carbon',r=>r.n.rec?rg(r.n.hpco2,'t CO₂e/yr'):'—']],
 water:[['Water evaporated on site',r=>r.id==='qu2'?NS:r.id==='van4'?'<span class="sub">none stated (operator claim)</span>':r.n.evap[1]?`up to ${fmt(r.n.evap[1])} m³/yr`:'none (dry coolers)'],['Rain on the roof',r=>r.site&&r.site.roof?`about ${fmt(r.site.roof*r.mm/1000*0.8)} m³/yr`:NIL]],
 materials:[['Electricity over 50 years',r=>r.noPue?NS:rg(r.n.MWh.map(v=>v*50/1e6),'TWh',1)]],
};
const WHY={heat:'Heat offered needs liquid cooling and a heat pump; air-cooled heat (25–35 °C) can be reused with heat pumps, but how much is not yet known, so no figure is shown.',energy:'Grid carbon: NIR 2026, 2024 consumption intensity in each province.',water:'Evaporation at most 1.5 L per kWh of heat (towers); hybrids wet only above 18 °C, 12.4% of the year in Vancouver and 10.4% in Edmonton (CWEC, computed). Rain at 80% capture, ECCC normals.',materials:'Materials embodied in each reference are not yet compared.'};
function block(tab,f){ const C=COLS[tab]; if(!C) return '';
  const L=refs(f);
  return `<div class="cmp"><div class="tt"><table class="cmpt"><thead><tr><th></th>${C.map(c=>`<th>${esc(c[0])}</th>`).join('')}</tr></thead><tbody>
  ${L.map(r=>`<tr class="${r.id==='here'?'me':''}"><td title="${esc(r.sub)}">${esc(r.lab)}${r.k==='claim'?' <span class="cls" style="border-color:#cdb07a;color:#cdb07a">claim</span>':''}</td>${C.map(c=>`<td>${c[1](r)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
  <p class="src">Conventional: air-cooled, dry coolers, no heat recovery. Modelled Vancouver and Edmonton rows sit on the worked-example lots (${SITES&&SITES.van?esc(SITES.van.addr.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase())):''}; ${SITES&&SITES.edm?esc(SITES.edm.addr.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase())):''}). VAN4: 6.5 MW site, PUE 1.5, air-cooled chilled water, no heat recovery stated. Qu EDM2: 3 MW, no PUE stated, so its energy is not computed. Hover a row for its basis. ${esc(WHY[tab]||'')} Same ${BD.eng.f1?BD.eng.f1(BD.S.answers.mw||1):(BD.S.answers.mw||1)} MW of servers in every row. The modelled rows use the tool's own formulas; VAN4 uses only what its spec sheet claims (Cologix, May 2026). <span class="draft"></span></p></div>`; }
const prev=BD.tabExtraWire;
BD.tabExtraWire=function(){ if(prev) prev.apply(this,arguments); const tab=BD.S.tab; if(!COLS[tab]) return; const side=document.getElementById('side'); if(!side||side.querySelector('.cmp')) return;
  sites().then(()=>{ if(BD.S.tab!==tab||side.querySelector('.cmp')) return; const f=E().siteFacts(); const slot=side.querySelector('#cmpSlot'); if(side.querySelector('#cmpSlot2')) return; if(slot){ slot.innerHTML=block(tab,f); BD.finePrintAll&&BD.finePrintAll(slot); return; } const html=BD.sec?BD.sec('cmp-'+tab,'Compared with other data centres','the same servers, conventional here, at two real data centres and on both worked-example lots','<div id="cmpSlot2">'+block(tab,f)+'</div>'):block(tab,f);
    const first=side.querySelector('details.sec'); if(first) first.insertAdjacentHTML('beforebegin',html); else { const h=side.querySelector('.lead')||side.querySelector('h2'); if(!h) return; h.insertAdjacentHTML('afterend',html); }
    const c=side.querySelector('#cmpSlot2'); if(c&&BD.finePrintAll) BD.finePrintAll(c); BD.wireSecs&&BD.wireSecs(side); }); };
BD.compareRefs=refs;
const st=document.createElement('style'); st.textContent=`.cmp{margin:10px 0 16px}.cmpt{width:100%;border-collapse:collapse;font-variant-numeric:tabular-nums}.cmpt th{font-weight:400;text-align:left;color:#9d9a94;font-size:11px;padding:4px 6px;border-bottom:1px solid #3a3d42}.cmpt td{padding:5px 6px;border-bottom:1px solid #2b2e33;vertical-align:top;font-size:12px}.cmpt tr.me td{color:#e8e6e1}.cmpt tr.me td:first-child{border-left:2px solid #CC746C}`; document.head.appendChild(st);
})();
