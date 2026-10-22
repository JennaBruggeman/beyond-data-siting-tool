#!/usr/bin/env python3
"""How much the best sites depend on how the five exchanges are weighed (J.B., 21 Oct 2026). Reads <city>_grid.geojson; scores unchanged.

Three ways to weigh heat, energy, water, materials and people:
  equal     20 % each (what the first maps use)
  priority  heat 35 %, energy 20 %, water 15 %, materials 15 %, people 15 %   (an example of thesis priorities: heat is the strongest exchange; J.B. to set)
  spread    each exchange weighted by how much it varies across the city (standard deviation of its score) x the share of the city where
            it is above 0: a factor that is zero almost everywhere (Edmonton water) or the same everywhere cannot tell most sites apart
Plus a robustness test: 500 random weightings (each exchange 0-100 %, summing to 100 %, drawn evenly over all mixes). For each cell, the
share of weightings in which it lands in the city's top 1 % ('stability'). High stability = good whatever the priorities.
Also a factor study: how much each exchange varies, how much of the city it covers, and how the exchanges go together (correlation).
Writes <city>_weighting.geojson, weighting_top5.csv, factor_study.csv, factor_correlation.csv, weighting_summary.json.
"""
import json, math, csv, os
import numpy as np
H = os.path.dirname(os.path.abspath(__file__))
E = ['heat', 'energy', 'water', 'materials', 'people']
PRIORITY = dict(heat=.35, energy=.20, water=.15, materials=.15, people=.15)
MIN_COVER = 0.10; NDRAW = 500; TOPN = 30; SEP = 2000
rng = np.random.default_rng(21)
summary = {}; top_rows = []; study = []; corr_rows = []

def peaks(score, cx, n=5):
    out = []
    for k in np.argsort(-score):
        if score[k] <= 0: break
        if all(math.hypot(*(cx[k] - cx[m])) >= SEP for m in out): out.append(k)
        if len(out) == n: break
    return out

for city in ['van', 'edm']:
    G = json.load(open(f'{H}/{city}_grid.geojson'))
    F = G['features']; S = np.array([[f['properties'][e] for e in E] for f in F]); site = np.array([f['properties']['site'] for f in F])
    cx = np.array([[(int(f['properties']['id'].split('_')[1]) + .5) * 100, (int(f['properties']['id'].split('_')[2]) + .5) * 100] for f in F])
    # factor study
    sd = S.std(0); cover = (S > 0).mean(0)
    for j, e in enumerate(E):
        study.append(dict(city=city, exchange=e, mean=round(S[:, j].mean(), 3), median=round(float(np.median(S[:, j])), 3), std=round(sd[j], 3),
                          p90=round(float(np.percentile(S[:, j], 90)), 3), share_cells_above_0=round(cover[j], 3), share_cells_ge_0_5=round(float((S[:, j] >= .5).mean()), 3),
                          weight_equal=.2, weight_priority=PRIORITY[e]))
    C = np.corrcoef(S.T)
    for a in range(5):
        for b in range(a + 1, 5): corr_rows.append(dict(city=city, a=E[a], b=E[b], r=round(C[a, b], 2)))
    # weightings
    keep = cover >= MIN_COVER; ws = sd * cover; ws = ws / ws.sum()
    W = dict(equal=np.full(5, .2), priority=np.array([PRIORITY[e] for e in E]), spread=ws)
    for r in study:
        if r['city'] == city: r['weight_spread'] = round(float(ws[E.index(r['exchange'])]), 3); r['dropped_in_spread'] = not keep[E.index(r['exchange'])]
    sc = {}
    for nm, w in W.items(): sc[nm] = S @ w; sc[nm + '_zoned'] = sc[nm] * site
    # robustness
    stab = np.zeros(len(F)); stabz = np.zeros(len(F)); thr_n = TOPN
    for _ in range(NDRAW):
        w = rng.dirichlet(np.ones(5)); o = S @ w; oz = o * site
        stab[np.argpartition(-o, thr_n)[:thr_n]] += 1; stabz[np.argpartition(-oz, thr_n)[:thr_n]] += 1
    stab /= NDRAW; stabz /= NDRAW
    sc['stability'] = stab; sc['stability_zoned'] = stabz
    # top 5 per scheme, and the margins
    summ = dict(weights={k: [round(x, 3) for x in v] for k, v in W.items()}, exchanges=E, cells=len(F))
    for nm in ['equal', 'priority', 'spread', 'equal_zoned', 'priority_zoned', 'spread_zoned', 'stability', 'stability_zoned']:
        pk = peaks(sc[nm], cx); v = sc[nm]
        summ[nm] = dict(top5=[round(float(v[k]), 3) for k in pk], p99=round(float(np.percentile(v, 99)), 3), median=round(float(np.median(v)), 3),
                        lead_1_over_2=round(float(v[pk[0]] - v[pk[1]]), 3) if len(pk) > 1 else None)
        for rank, k in enumerate(pk, 1):
            p = F[k]['properties']; lon, lat = np.mean(F[k]['geometry']['coordinates'][0][:4], axis=0)
            top_rows.append(dict(city=city, scheme=nm, rank=rank, score=round(float(v[k]), 3), lat=round(lat, 6), lon=round(lon, 6), cell=p['id'], site=p['site'], zoning_best=p['zoning_best'],
                                 **{e: p[e] for e in E}, stability=round(float(stab[k]), 2), stability_zoned=round(float(stabz[k]), 2)))
    summary[city] = summ
    # write the layer
    for k, f in enumerate(F):
        pr = f['properties']
        f['properties'] = dict(id=pr['id'], site=pr['site'], zoning_best=pr['zoning_best'], **{e: pr[e] for e in E},
                               **{'ov_' + nm: round(float(sc[nm][k]), 3) for nm in ['equal', 'priority', 'spread', 'equal_zoned', 'priority_zoned', 'spread_zoned']},
                               stability=round(float(stab[k]), 3), stability_zoned=round(float(stabz[k]), 3))
    json.dump(dict(type='FeatureCollection', name=f'{city}_weighting', features=F), open(f'{H}/{city}_weighting.geojson', 'w'), separators=(',', ':'))

def wcsv(name, rows):
    w = csv.DictWriter(open(f'{H}/{name}', 'w', newline=''), list(rows[0])); w.writeheader(); w.writerows(rows)
wcsv('weighting_top5.csv', top_rows); wcsv('factor_study.csv', study); wcsv('factor_correlation.csv', corr_rows)
json.dump(summary, open(f'{H}/weighting_summary.json', 'w'), indent=1); print(json.dumps(summary, indent=1))
