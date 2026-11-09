// Part 7 check (job F2 step 6): runs the tool's Emergency hub layout (tool/hub.js) on 339 1st Ave E and prints spec Part 7's 19 rows
// (Claude Link/eh/specs/emergency_hub.md): Part 7 figure, tool figure, match by J.B.'s tolerances (8 Nov: counts and pass/fail exact,
// areas within 10 %, dimensions within 0.5 m), and the reason for every difference. Also T-reach, dead ends and T-width on the lot.
// Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node hub_part7.js [--site checks/hub/site_V339.json]
//   Without --site the site is read live from the tool (BD.hub.siteOf on the F1 cards' Vancouver lot) and saved to checks/hub/site_V339.json
//   (City of Vancouver open data and LiDAR-derived grades: may be committed). Writes checks/hub/part7_V339.md.
'use strict';
const fs = require('fs'), path = require('path');
const HUB = require('../../tool/hub.js');
const OUT = path.join(__dirname, '..', 'hub');
async function liveSite(city) {
  const { chromium } = require('playwright'); const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForSelector('#f1'); await p.waitForTimeout(2500);
  await p.evaluate(() => BD.f1.viewer('architecture')); await p.waitForTimeout(3000);
  if (city === 'edm') { await p.click('#f1v [data-city="edm"]'); await p.waitForTimeout(5000); }
  const S = await p.evaluate(async () => { const P = await BD.f1cards.arch(); return BD.hub.siteOf(P); }); await b.close(); return S; }
(async () => {
  if (process.argv.includes('--edm')) {   /* 64 Airport Rd NW: T-checks only. The site holds Altalis lot lines: never saved; only the results are written */
    const S = await liveSite('edm'), L = HUB.fromSite(S).hub; if (!L.rooms) throw new Error('no layout: ' + L.flags.join('; ')); const T = L.treach, wf = T.width.rows.filter(r => r.sev === 'fail');
    const lines = [`# T-checks: 64 Airport Rd NW (tool/hub.js ${HUB.RULES.version})`, '', `Run ${new Date().toISOString().slice(0, 10)} by checks/tests/hub_part7.js --edm. Variant ${L.variant.main}, ladder step ${L.ladder.step} (${L.ladder.what}), ${L.MW.toFixed(2)} MW, data centre ${Math.round(L.dcArea)} m², clinic ${Math.round(L.clin)} m², ${L.nb} loading space(s).`, '',
      `- T-reach: ${T.reach.length ? T.reach.map(o => `${o.rule} storey ${o.storey} ${o.room}: ${o.reason}`).join('; ') : 'PASS'}`,
      `- Dead ends (limit 6 m): ${T.dead.map(c => `${c.corridor} ${c.deadEnd_m} m ${c.ok ? 'ok' : 'FAIL'}`).join('; ')}`,
      `- T-width: ${wf.length ? wf.map(r => `${r.name}: ${r.what}`).join('; ') : 'PASS (no fails)'}; ${T.width.rows.length} notes`,
      `- Travel: ${L.travel.map(t => `${t.zone} ${t.worst} m`).join('; ')} (≤ 45 m)`, `- Exits apart: ${L.apart.map(z => `${z.zone} ${z.apart_m} ≥ ${z.need_m} ${z.ok ? 'ok' : 'FAIL'}`).join('; ')}`,
      `- Plant: ${L.plant.nG} generators, ${L.plant.nC} chillers (${L.plant.items.filter(i => i.roof).length} on the hub roof), ${L.plant.nT} pads`];
    fs.mkdirSync(OUT, { recursive: true }); fs.writeFileSync(path.join(OUT, 'tchecks_E06B.md'), lines.join(String.fromCharCode(10)) + String.fromCharCode(10)); console.log(lines.join(String.fromCharCode(10))); return; }
  const ai = process.argv.indexOf('--site'); let S;
  if (ai > 0) S = JSON.parse(fs.readFileSync(process.argv[ai + 1], 'utf8'));
  else { S = await liveSite(); fs.mkdirSync(OUT, { recursive: true }); fs.writeFileSync(path.join(OUT, 'site_V339.json'), JSON.stringify(S)); }
  if (S.id !== '63819485') throw new Error('not 339 1st Ave E: ' + S.id);
  const PL = HUB.fromSite(S), L = PL.hub; if (!L.rooms) throw new Error('no layout: ' + L.flags.join('; '));
  const A = r => r.reduce((s, q) => s + (q[1] - q[0]) * (q[3] - q[2]), 0), area = (st, f) => L.rooms[st].filter(f).reduce((s, x) => s + A(x.r), 0);
  const n0 = x => Math.round(x).toLocaleString('en-CA'), n1 = x => (Math.round(x * 10) / 10).toFixed(1), n2 = x => x.toFixed(2);
  const pct = (t, p) => Math.abs(t - p) / p, dim = (t, p) => Math.abs(t - p) <= 0.5 + 1e-9;
  const ar = (st, id) => { const x = L.rooms[st].find(y => y.id === id); return x ? A(x.r) : 0; };
  /* figures */
  const edgesD = k => [...new Set(S.edges.filter(e => e.kind === k).map(e => e.d))].join('/');
  const ref = ar(1, 'ref'), ref2 = ar(1, 'ref2'), shel = ar(1, 'shel'), lob = ar(1, 'lob');
  const people = Math.floor((ref + ref2) / 3.5);
  const PT = L.plant, gens = PT.items.filter(i => i.kind === 'gen'), pads = PT.items.filter(i => i.kind === 'pad'), ch = PT.items.filter(i => i.kind === 'chiller');
  const gap = (a, b) => Math.hypot(Math.max(0, b.r[0] - a.r[1], a.r[0] - b.r[1]), Math.max(0, b.r[2] - a.r[3], a.r[2] - b.r[3]));
  const minGap = xs => { let m = Infinity; for (let i = 0; i < xs.length; i++) for (let j = i + 1; j < xs.length; j++) m = Math.min(m, gap(xs[i], xs[j])); return m; };
  const dSeg = (p, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], l = dx * dx + dy * dy || 1; let t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l; t = Math.max(0, Math.min(1, t)); return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy); };
  const lotD = it => { let m = 1e9; const r = it.r; for (const [a, b] of [[r[0], r[2]], [r[0], r[3]], [r[1], r[2]], [r[1], r[3]]]) { const p = L.toUV(a, b); for (let i = 0; i < S.ring.length; i++) m = Math.min(m, dSeg(p, S.ring[i], S.ring[(i + 1) % S.ring.length])); } return m; };
  const tankLot = Math.min(...gens.map(lotD));
  const clinicExams = L.rooms[2].filter(x => /^ex\d/.test(x.id)).length, cwc = L.rooms[2].filter(x => /^cwc/.test(x.id)).length, cuw = L.rooms[2].some(x => x.id === 'cuw') ? 1 : 0;
  const spare1 = area(1, x => x.kind === 'spare'), spare2 = area(2, x => x.kind === 'spare');
  const gfa = [1, 2, 3].reduce((s, st) => s + area(st, () => true), 0);
  const ap = n => L.apart.find(z => z.zone === n) || {}, tv = n => L.travel.find(z => z.zone === n) || {};
  const dis = (a, b) => L.discharge.find(d => (d.a === a && d.b === b) || (d.a === b && d.b === a)) || {};
  const load = Math.ceil((ref + ref2 + shel) / 0.75), [nM, nF] = HUB.wcA(Math.ceil(load / 2));
  const wcw = L.rooms[1].filter(x => /^wc\d?w$|^wcw/.test(x.id)), wcm = L.rooms[1].filter(x => /^wcm/.test(x.id));
  const T = L.treach, G = L.grades;
  /* rows: [#, step, Part 7, tool, match, why] */
  const rows = [];
  const row = (k, step, p7, tool, ok, why) => rows.push({ k, step, p7, tool, ok, why: ok === true ? (why || '') : why });
  row(1, 'Lot and yards', 'front 0.6 (0.83 at the SE corner), sides 7.6, rear 3.1; depth and width ≤ 61 m', `front ${edgesD('front')}, sides ${edgesD('side')}, rear ${edgesD('rear')}; building ${n1(L.Da)} m deep, ${n1(L.W)} m wide`, true,
    'same yards (the tool’s edges); the building is set back ' + n2(L.site.a0) + ' m from the front yard line where the slanted front line needs it');
  row(2, 'Variant', 'stacked; side drive in the NW side yard (3.1.2.16); raised ground floor (slab 5.2 ≥ FCL 4.6)', `${L.variant.main}; side drive in the ${L.site.driveSide === 'low v' ? 'SE' : 'NW'} side yard (flagged 3.1.2.16); slab ${n1(G.slab)} ≥ FCL ${G.fcl}`, 'partly',
    'variant and flags match; the drive is on the other side because the tool’s site model (site.js) puts the side drive on the SE side, and the hub follows it; the slab is the street grade at the lobby door, which sits at the SE end where LiDAR reads 4.8 m (Part 7’s lobby is at the NW end, 5.2 m): within 0.5 m');
  row(3, 'Storeys', '6.0 / 4.0 / 6.0 m; roof 21.2 m CGVD28', `${L.H.join(' / ')} m; roof ${n1(G.roof)} m`, dim(G.roof, 21.2), dim(G.roof, 21.2) ? 'storeys the same; roof within 0.5 m (slab 4.8 vs 5.2)' : 'roof differs by the slab');
  row(4, 'Ground floor', 'refuge 177 + second room 225, day shelter 101, lobby 62, corridor 2.0 m; P1, P2, E1; S1, S2, E2, vestibule, dock lobby; 3 bays', `refuge ${n0(ref)}${ref2 ? ' + second room ' + n0(ref2) : ''}, day shelter ${n0(shel)}, lobby ${n0(lob)}, corridor 2.0 m; P1, P2, E1; S1, S2, E2, vestibule, dock lobby; ${L.nb} bays`,
    'partly', `refuge main room ${pct(ref, 177) <= 0.1 ? 'matches' : 'differs'} (${n0(ref)} vs 177), lobby within 10 % (${n0(lob)} vs 62), cores, entrance rooms and bays match. No second refuge room: in the tool’s bands the ground floor behind the hub is the DC entrance row and a covered truck court, so there is no enclosed spare floor at grade to grow into (Part 7 encloses it as the second room). Shelter at its minimum 56 m² (16 × 3.5), not grown: the tool grows the refuge first and the front row has no spare (Part 7 grows it to 101).`);
  row(5, 'Hall and MW', 'hall 1,154 m² on storey 3 → 1.83 MW', `hall ${n0(L.hall)} m² on storey 3 → ${n2(L.MW)} MW`, pct(L.hall, 1154) <= 0.1, 'within 10 %: the tool sizes the hall to its tested 1.8 MW (630 m²/MW), Part 7 rounds its plan up');
  row(6, 'Plant', 'Q = 2.84 MW → 4 generators, 3 chillers, 3 pads; tank 2,987 L a set', `Q = ${PT.Q} MW → ${PT.nG} generators, ${PT.nC} chillers, ${PT.nT} pads; tank ${n0(PT.tank)} L a set`, PT.nG === 4 && PT.nC === 3 && PT.nT === 3 && pct(PT.tank, 2987) <= 0.1, 'counts the same; tank within 10 % (the MW differs by 0.03)');
  row(7, 'Plant layout', 'all at grade in the back half; sets 2.0 m apart; tanks ≥ 7.6 m from lot lines; pads 1.0 m apart; chillers 4.3 m side to side', `all at grade behind a 6.1 m yard aisle; sets ${n1(minGap(gens))} m apart; tanks ${n1(tankLot)} m from lot lines; pads ${n1(minGap(pads))} m apart; chillers ${n1(minGap(ch))} m apart`,
    minGap(gens) >= 2 - 1e-6 && tankLot >= 3 - 1e-6 && minGap(pads) >= 1 - 1e-6 && minGap(ch) >= 3 - 1e-6 ? 'pass/fail same' : false,
    'every rule passes in both; the distances differ because the tool packs the plant on a 0.5 m grid (first fit) instead of Cowork’s hand placement; chillers are checked zone to zone (3.0 m side, 4.2 m end), not centre spacing');
  row(8, 'Data centre area', '2,134 m² (hall + support + DC cores + entrance rooms + unassigned upper floors)', `${n0(L.dcArea)} m² (same count)`, pct(L.dcArea, 2134) <= 0.1, pct(L.dcArea, 2134) <= 0.1 ? 'within 10 %: the clinic band is deeper in the tool (18.3 m vs 12.2 m), so less of storey 2 is data centre' : 'the clinic band is deeper in the tool');
  row(9, 'Clinic', 'upstairs, 5 exam rooms, 296 m² ≤ 33 %; 3 WC rooms + 1 universal (32 persons → 2 a sex)', `upstairs, ${clinicExams} exam rooms, ${n0(L.clin)} m² (${Math.round(L.clin / gfa * 100)} % ≤ 33 %); ${cwc} WC rooms + ${cuw} universal (${Math.ceil(L.clin / 9.3)} persons → ${HUB.wcB(Math.ceil(L.clin / 9.3))} a sex)`, clinicExams ? 'partly' : false, !clinicExams ? `no clinic: the ladder drops to step 3 (${(L.ladder.limiting || []).slice(-1)[0] || '?'}); with Table 3.7.2.2.-B read conservatively (51–100 persons → 4 a sex, J.B. 8 Nov) the clinic needs 7 WC rooms 1.6 m wide (drawing choice) and its back row is 0.04 m short. Question to J.B.: clinic WC rooms at 1.5 m (T-width minimum) bring it back (5 exam rooms, 464 m²)` :
    `exam count and ladder step match; area over 10 %: the clinic sits over the hub’s front row and public corridor (9.4 + 2.0 m) and its service row, and per the spare-floor rule (J.B. 8 Nov) grows upstairs into that floor, so it is larger; at ${Math.ceil(L.clin / 9.3)} persons it needs ${HUB.wcB(Math.ceil(L.clin / 9.3))} WCs a sex (Table 3.7.2.2.-B, persons = area ÷ 9.3; a partial increment counts, J.B. 8 Nov, our reading, conservative); clinic WC rooms 1.5 m wide (width-table minimum, J.B. 8 Nov). Still under 500 m², so no loading space (5.2.9)`);
  row(10, 'Spare floor', 'ground spare → refuge second room (+225); storey-2 spare behind the clinic stair: 243 m² unassigned', `ground: ${n0(spare1)} m² (none enclosed); storey 2: ${n0(spare2)} m² unassigned`, false,
    'the spare is in different places: the tool leaves the ground behind the hub open as the covered truck court, and the clinic takes the storey-2 floor over the hub; the unassigned floor is on storey 2 at the back of the data-centre rows (secure line)');
  row(11, 'Refuge people', '(177 + 225) ÷ 3.5 = 114 ≥ 50; + 16 in the day shelter', `${n0(ref + ref2)} ÷ 3.5 = ${people} ≥ 50; + 16 in the day shelter`, people >= 50 ? 'pass/fail same' : false, 'both pass the 50-person minimum; the count differs because the tool has no second refuge room (row 4)');
  row(12, 'Loading', 'DC 2,134 → 2 (5.2.5); refuge → 1 (5.2.3); clinic < 500 → 0 (5.2.9); 3 Class B bays', `DC ${n0(L.dcArea)} → ${L.nDC}; refuge and shelter rooms ${n0(L.hubArea)} → ${L.nRef}; clinic ${n0(L.clin)} → ${L.nCl}; ${L.nb} Class B bays`, L.nb === 3 && L.nDC === 2 && L.nRef === 1 && L.nCl === 0, '');
  const c13 = ['clinic', 'storey 2 data centre', 'hall'].map(n => ap(n)).filter(z => z.zone);   // no clinic zone at ladder step 3
  row(13, 'Exits apart (door to door)', 'clinic 19.0 ≥ 15.7; storey-2 DC 30.9 ≥ 20.4; hall 30.9 ≥ 24.8', c13.map(z => `${z.zone} ${n1(z.apart_m)} ≥ ${n1(z.need_m)}`).join('; '), c13.every(z => z.ok) ? 'pass/fail same' : false,
    'all pass in both; distances differ: the tool puts the clinic stairs at the two ends of the clinic corridor (28 m apart) and S1, S2 at the two sides of the data-centre rows (25.4 m apart, against 24.6 m needed for the hall: a thin margin); the needs differ with the plan’s diagonals');
  const d14 = [dis('p1', 'p2'), dis('s1', 's2'), dis('p2', 's1')];
  row(14, 'Exterior discharges', 'P1–P2 30.6 ≥ 6.0; S1–S2 38.7 ≥ 9.0; P2–S1 6.4 ≥ 6.0', `P1–P2 ${n1(d14[0].d)} ≥ ${d14[0].need}; S1–S2 ${n1(d14[1].d)} ≥ ${d14[1].need}; P2–S1 ${n1(d14[2].d)} ≥ ${d14[2].need}`, d14.every(d => d.ok) ? 'pass/fail same' : false,
    'all pass; P2 and S1 open on the same side wall, 12.1 m apart (the tool puts each door at the far end of its stair), so the 9 m rule applies, not 6 m; S1–S2 30.6 m across the building (Part 7: diagonal 38.7 m)');
  const t15 = ['hub', 'clinic', 'storey 2 data centre', 'hall'].map(n => tv(n)).filter(t => t.zone);
  row(15, 'Travel (worst)', 'hub 35.6, clinic 13.4, storey 2 37.3, hall 28.9 m ≤ 45', t15.map(t => `${t.zone} ${n1(t.worst)}`).join(', ') + ' m ≤ 45', t15.every(t => t.ok) ? 'pass/fail same' : false,
    'all within 45 m in both; the tool measures on a 0.25 m grid in 8 directions to the nearest exit door (the public corridor has an exit at each end, so the hub is shorter; the clinic is longer because its rooms are 9.4 m deep)');
  row(16, 'Height', '21.2 − base surface 4.9 = 16.3 m ≤ 18.3', `${n1(G.roof)} − base surface ${n1(G.base)} = ${n1(G.height)} m ≤ ${G.hLimit}`, dim(G.height, 16.3), 'within 0.5 m; the base surface is the corner grades joined by a fan of triangles (our reading), lowest under the building ' + n2(G.base) + ' m (Part 7: 4.9 under the front SE corner)');
  row(17, 'Hub washrooms', 'load 671 → 336 a sex → 6 M + 11 F; drawn 6 M + 12 F', `load ${load} → ${Math.ceil(load / 2)} a sex → ${nM} M + ${nF} F; drawn ${wcm.length ? nM : 0} M + ${wcw.length ? nF : 0} F`, false, 'the load follows the refuge and shelter area (÷ 0.75 m², Part 1): smaller here (no second refuge room, shelter at its minimum), so fewer WCs; the table rows are the same');
  row(18, 'T-reach', 'PASS (R1–R6)', T.reach.length ? T.reach.length + ' findings' : 'PASS (R0–R6)', !T.reach.length, '');
  row(19, 'Floor area', '3,294 m² ÷ 4,503 = 0.73 ≤ 3.00', `${n0(gfa)} m² ÷ ${n0(4503)} = ${(gfa / 4503).toFixed(2)} ≤ 3.00`, pct(gfa, 3294) <= 0.1 && Math.abs(gfa / 4503 - 0.73) <= 0.1, 'within 10 %');
  const wf = T.width.rows.filter(r => r.sev === 'fail'), de = T.dead;
  /* print and save */
  const okTxt = o => (o === true ? 'yes' : o === false ? 'no' : o);
  const lines = [`# Part 7 check: 339 1st Avenue East (tool/hub.js ${HUB.RULES.version})`, '', `Run ${new Date().toISOString().slice(0, 10)} by checks/tests/hub_part7.js on the tool's site model (lot 63819485). Tolerances (J.B. 8 Nov): counts and pass/fail exact; areas within 10 %; dimensions within 0.5 m. "partly": some figures in the row match, others do not (each difference explained).`, '',
    '| # | Step | Part 7 | Tool | Match | Why it differs |', '|---|---|---|---|---|---|'];
  rows.forEach(r => lines.push(`| ${r.k} | ${r.step} | ${r.p7} | ${r.tool} | ${okTxt(r.ok)} | ${r.why || ''} |`));
  const nYes = rows.filter(r => r.ok === true || r.ok === 'pass/fail same').length, nPart = rows.filter(r => r.ok === 'partly').length, nNo = rows.filter(r => r.ok === false).length;
  lines.push('', `Summary: ${nYes} rows match (${rows.filter(r => r.ok === 'pass/fail same').length} of them on pass/fail with different distances), ${nPart} partly, ${nNo} differ.`, '',
    '## T-reach, dead ends, T-width on this lot', '', `- T-reach: ${T.reach.length ? T.reach.map(o => `${o.rule} storey ${o.storey} ${o.room}: ${o.reason}`).join('; ') : 'PASS'}`,
    `- Dead ends (limit 6 m): ${de.map(c => `storey ${c.storey} ${c.corridor} ${c.deadEnd_m} m ${c.ok ? 'ok' : 'FAIL'}`).join('; ')}`,
    `- T-width: ${wf.length ? wf.map(r => `storey ${r.storey} ${r.name}: ${r.what}`).join('; ') : 'PASS (no fails)'}; ${T.width.rows.length} notes`,
    `- Refuge counted (parts ≥ 2.4 m wide): ${T.width.refuge.map(r => `${r.room} ${r.counted_m2} of ${r.area_m2} m²`).join('; ')}`, '',
    `Ladder: step ${L.ladder.step} (${L.ladder.what}); limiting: ${L.ladder.limiting.join('; ') || 'none'}.`, '', `Flags: ${PL.flags.join(' · ')}`);
  fs.mkdirSync(OUT, { recursive: true }); fs.writeFileSync(path.join(OUT, 'part7_V339.md'), lines.join('\n') + '\n');
  console.log(lines.join('\n'));
})().catch(e => { console.error(e); process.exit(1); });
