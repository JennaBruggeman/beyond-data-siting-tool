#!/usr/bin/env python3
"""BC Assessment fields for the Vancouver site boxes (V01–V08). RUN ON J.B.'S OWN COMPUTER ONLY.

The BC Assessment files never leave the computer, and this script prints counts only, never a property's values.
Its output files hold BCA fields (year built, storeys, manual class) per parcel: keep them on this computer, for the site models,
and do not share or upload them (BCA licence via UBC Abacus; agreement with J.B., 13–20 Oct 2026).

In:  <site>_parcels_city.csv   City of Vancouver parcels in each box: LAND_COORDINATE, address, City year built, FOLIO(s), footprint IDs
     <site>_heights.csv         footprints and heights from City data (build_sites.py)
     --nonres  Non-Residential Inventory Extract (BCA user guide: 2 jurisdiction, 3 roll, 4 year built, 6 storeys, 18 predominant manual class)
     --res     Residential Inventory Extract zip(s) or txt(s) (BCA user guide v1.1: 2 jurisdiction, 3 roll, 4 MB manual class, 7 MB year built,
               10 MB number of storeys)
     --jur 200 (City of Vancouver); BCA roll number's last 12 digits = the City's FOLIO (checked 20 Oct 2026)
Out: <site>_bca_parcels.csv     per parcel: City address and year built, BCA year built (range), storeys (range), manual class(es),
                                folios matched, and a flag where City and BCA year built differ
     <site>_heights_bca.csv     the heights file with 'storeys' filled from BCA where the parcel has one 2009 building and one BCA storey value
Actual-use codes and civic addresses are not in these two extracts (they are in BCA's Data Advice tables); addresses are the City's.
"""
import argparse, csv, glob, io, os, re, zipfile, collections

def digits(s): return re.sub(r'\D', '', s or '')
def lines(path):
    if path.lower().endswith('.zip'):
        with zipfile.ZipFile(path) as z:
            for n in z.namelist():
                if n.lower().endswith(('.txt', '.csv')):
                    with z.open(n) as f: yield from csv.reader(io.TextIOWrapper(f, encoding='latin-1'))
    else:
        with open(path, newline='', encoding='latin-1') as f: yield from csv.reader(f)
def cell(row, pos):
    try: return (row[pos - 1] or '').strip()
    except IndexError: return ''

a = argparse.ArgumentParser(); a.add_argument('--nonres', required=True); a.add_argument('--res', nargs='+', required=True); a.add_argument('--jur', required=True)
a.add_argument('--dir', default=os.path.dirname(os.path.abspath(__file__))); o = a.parse_args()
want = set()
for fn in glob.glob(os.path.join(o.dir, 'V0*_parcels_city.csv')):
    for r in csv.DictReader(open(fn, encoding='utf-8')): want.update(r['folios'].split())
REC = collections.defaultdict(list)   # folio -> [(year built, storeys, manual class, extract)]
for row in lines(o.nonres):
    if cell(row, 2) != o.jur: continue
    f = digits(cell(row, 3))[-12:]
    if f in want: REC[f].append((cell(row, 4), cell(row, 6), cell(row, 18), 'non-residential'))
for p in o.res:
    for row in lines(p):
        if cell(row, 2) != o.jur: continue
        f = digits(cell(row, 3))[-12:]
        if f in want: REC[f].append((cell(row, 7), cell(row, 10), cell(row, 4), 'residential'))
def rng(vals):
    v = sorted({int(float(x)) for x in vals if re.fullmatch(r'\d+(\.0+)?', x or '') and float(x) > 0})
    return '' if not v else (str(v[0]) if len(v) == 1 else f'{v[0]}–{v[-1]}')
tot = collections.Counter()
for fn in sorted(glob.glob(os.path.join(o.dir, 'V0*_parcels_city.csv'))):
    site = os.path.basename(fn)[:3]; P = list(csv.DictReader(open(fn, encoding='utf-8'))); out = []; st_by_parcel = {}
    for r in P:
        fols = r['folios'].split(); recs = [x for f in fols for x in REC.get(f, [])]
        yb, sto = rng([x[0] for x in recs]), rng([x[1] for x in recs]); cls = '; '.join(sorted({x[2] for x in recs if x[2]}))
        flag = ''
        if yb and r['city_year_built'] and r['city_year_built'] not in yb.split('–'):
            flag = f"City year built {r['city_year_built']} vs BCA {yb}"; tot['year differs'] += 1
        out.append(dict(site=site, parcel_id=r['parcel_id'], address=r['address'], city_year_built=r['city_year_built'], bca_year_built=yb, bca_storeys=sto,
                        bca_manual_class=cls, bca_extract='; '.join(sorted({x[3] for x in recs})), folios=len(fols), folios_matched=sum(1 for f in fols if f in REC),
                        flag=flag, footprint_ids=r['footprint_ids'], source='BC Assessment Inventory Extracts (Non-Residential 2026-04-01; Residential 2026-04), via UBC Abacus; address and City year built: City of Vancouver property tax report 2026'))
        tot['parcels'] += 1; tot['parcels matched'] += bool(recs); st_by_parcel[r['parcel_id']] = sto
    with open(os.path.join(o.dir, f'{site}_bca_parcels.csv'), 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, list(out[0].keys())); w.writeheader(); w.writerows(out)
    H = list(csv.DictReader(open(os.path.join(o.dir, f'{site}_heights.csv'), encoding='utf-8')))
    groups = collections.defaultdict(set)
    for h in H:
        m = re.search(r'part of 2009 building (\d+)', h['notes'])
        for pid in h['parcel_id'].split('; '): groups[pid].add(m.group(1) if m else h['building_id'])
    for h in H:
        pids = [p for p in h['parcel_id'].split('; ') if st_by_parcel.get(p)]
        if len(pids) > 1: h['notes'] += '; storeys: several parcels over this footprint, see the parcel file'; continue
        if not pids: continue
        s = st_by_parcel[pids[0]]
        if '–' in s or len(groups[pids[0]]) > 1: h['notes'] += '; storeys: see the parcel file (several buildings or values on this parcel)'; continue
        h['storeys'] = s; h['notes'] += '; storeys: BC Assessment (one building on the parcel)'; tot['storeys filled'] += 1
    with open(os.path.join(o.dir, f'{site}_heights_bca.csv'), 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, list(H[0].keys())); w.writeheader(); w.writerows(H)
print('counts only:', dict(tot))
