import json,collections,statistics as st,sys
OUT={'fit':'largest size that fits','floorMW':'size on floor space alone','elec':'electricity a year','co2':'carbon from electricity','plant':'plant space','noise':'sound power','jobs':'jobs','heat':'heat offered','homes':"homes' worth of heat",'best':'best heat set-up cost','cheapest':'cheapest building cost'}
rows=[]; summ={}
for c in ('van','edm'):
  R=[json.loads(l) for l in open(f'lots_{c}.jsonl')]
  summ[c]={'lots':len(R),'walked':sum(1 for r in R if r.get('pages') is not None),'nofit':sum(1 for r in R if r.get('nofit')),
    'issues':sum(1 for r in R if r['issues']),'errors':sum(1 for r in R if r.get('errs'))}
  for r in R:
    S=r.get('sens'); 
    if not S or not S.get('base') or S['base'].get('fit') in (None,0): continue
    b=S['base']
    for p in S['res']:
      for o in OUT:
        v0=b.get(o); vals=[x.get(o) for x in (p.get('lo'),p.get('hi')) if x and x.get(o) is not None]
        if v0 in (None,0) or not vals: continue
        vals.append(v0); sp=max(vals)-min(vals); sw=sp if o=='noise' else sp/abs(v0)
        rows.append((c,r['zone'],r['area'],p['k'],o,sw))
agg=collections.defaultdict(list)
for c,z,a,p,o,sw in rows: agg[(p,o)].append(sw)
print(json.dumps(summ))
print('param x result: median / 90th percentile / max swing across lots that fit')
for (p,o),v in sorted(agg.items()):
  v=sorted(v); 
  if max(v)<(0.5 if o=='noise' else 0.05): continue
  q=lambda f:v[min(len(v)-1,int(f*len(v)))]
  fm=(lambda x:f'{x:.1f} dB') if o=='noise' else (lambda x:f'{x*100:.0f}%')
  print(f'{p:10} {OUT[o]:28} n={len(v):4} median {fm(st.median(v))}  p90 {fm(q(0.9))}  max {fm(v[-1])}')
json.dump({f'{p}|{o}':sorted(v) for (p,o),v in agg.items()},open('lots_swings.json','w'))
