#!/usr/bin/env python3
"""BC Assessment → derived heat demand per Vancouver parcel (J.B. with Jeremy Buhler, UBC Library, 19 Oct 2026).

RUN THIS ON J.B.'S OWN COMPUTER ONLY. The BC Assessment files never leave it. Only the derived file and the printed
summary (counts and match rates, no single property's BCA values) leave the computer.
Agreed with J.B. Buhler (13, 15 and 19 Oct 2026): values calculated from BCA fields may be shown per building, rounded;
no raw BCA field (floor area, units, class codes) is written out.

Inputs (BC Assessment extracts via UBC Abacus; comma-delimited .txt; field positions from BCA's user guides):
  --nonres   Non-Residential Inventory Extract (User Guide v1.0, 2019): 2 jurisdiction, 3 roll, 6 storeys, 19 Gross Building Area ft²,
             20 Basement Area ft², 22 rental apartment units, 31 seniors housing units, 42 type of heating, 18 predominant manual class
  --res      Residential Inventory Extract (User Guide 0.1): 2 jurisdiction, 3 roll, 4 manual class, 9 total finished area ft² (single-family),
             35 Inc Unit of Measure Value, 36 its code (strata units)
  --desc     (optional) a site description file; first run with --inspect to see its columns, then pass --desc-roll and --desc-text
  --taxreport  City of Vancouver property tax report CSV (open data; FOLIO = BCA roll number, LAND_COORDINATE = the tool's parcel id)
Output: bca_derived_van.json  {LAND_COORDINATE: {"h": heat MWh a year (2 significant figures), "g": use group, "t": heating group}}

Heat demand, as the tool's receivers (register receiver_demand, homes_heated):
  homes (rental units, seniors units, strata units counted as homes) × 16.81 MWh (BC space + water heating per household, CEUD 2018–22)
  non-residential floor area × space + water heating intensity (CEUD 2023, BC, GJ/m² ÷ 3.6): offices 0.45, education 0.497,
  health care 1.096 (care) — SCIEU hospitals 1.90 — arts and recreation 0.650, all others the BC commercial average 0.57
Usage:
  python3 bca_derive.py --inspect FILE            (prints the number of columns and rows, and the header if there is one; no values)
  python3 bca_derive.py --nonres N.txt --res R.txt --taxreport property-tax-report.csv [--desc D.txt --desc-roll 3 --desc-text 5] [--jur 200]
"""
import argparse, csv, json, math, os, re, sys, collections

FT2 = 0.09290304
HOME_MWH = 16.81
GJ = {'office': 0.45, 'education': 0.497, 'health': 1.096, 'hospital': 1.90, 'recreation': 0.650, 'other': 0.57}
GROUP_WORDS = [  # site description text → use group (own grouping, not BCA codes)
    ('hospital', r'HOSPITAL'), ('health', r'CARE|NURSING|HEALTH|MEDICAL|CLINIC'), ('education', r'SCHOOL|COLLEGE|UNIVERSITY|EDUCATION'),
    ('recreation', r'RECREATION|ARENA|POOL|THEATRE|THEATER|CHURCH|HALL|MUSEUM|LIBRARY'), ('office', r'OFFICE'),
    ('hotel', r'HOTEL|MOTEL'), ('apartment', r'APARTMENT|RENTAL|MULTI.?FAMILY|ROW HOUS|STRATA.*RESID|CONDO|DUPLEX|TRIPLEX|FOURPLEX|HOUSING'),
    ('house', r'SINGLE FAMILY|SINGLE-FAMILY|RESIDENCE|DWELLING|HOUSE'),
    ('retail', r'STORE|RETAIL|SHOP|RESTAURANT|BANK|COMMERCIAL'), ('industrial', r'INDUSTR|WAREHOUSE|MANUFACT|FACTORY|STORAGE|GARAGE|PARKING'),
]
HEAT_WORDS = [('water', r'HOT WATER|BOILER|HYDRONIC|RADIANT|STEAM'), ('air', r'FORCED AIR|FURNACE|HEAT PUMP|ROOF.?TOP|HVAC'), ('electric', r'ELECTRIC|BASEBOARD')]

def digits(s): return re.sub(r'\D', '', s or '')
def rows(path):
    with open(path, newline='', encoding='latin-1') as f:
        r = csv.reader(f)
        for i, row in enumerate(r):
            if i == 0 and len(row) > 3 and not digits(row[2]): continue  # a header row
            yield row
def num(row, pos):
    try: return float((row[pos - 1] or '').replace(',', '').strip() or 0)
    except (ValueError, IndexError): return 0.0
def txt(row, pos):
    try: return (row[pos - 1] or '').strip().upper()
    except IndexError: return ''
def sig2(x): return 0 if x <= 0 else round(x, -int(math.floor(math.log10(x))) + 1)
def group_of(text, table):
    for g, rx in table:
        if re.search(rx, text or ''): return g
    return None

def main():
    a = argparse.ArgumentParser()
    a.add_argument('--inspect'); a.add_argument('--nonres'); a.add_argument('--res'); a.add_argument('--desc')
    a.add_argument('--desc-roll', type=int, default=3); a.add_argument('--desc-text', type=int, default=0)
    a.add_argument('--taxreport'); a.add_argument('--jur', default=None, help='keep one jurisdiction code (Vancouver), if known')
    a.add_argument('--out', default='bca_derived_van.json')
    o = a.parse_args()
    if o.inspect:
        with open(o.inspect, newline='', encoding='latin-1') as f:
            r = csv.reader(f); first = next(r); n = 1 + sum(1 for _ in r)
        hdr = not digits(first[2]) if len(first) > 2 else False
        print(f'{n} rows, {len(first)} columns; header row: {"yes: " + " | ".join(first) if hdr else "no"}')
        return
    # FOLIO → LAND_COORDINATE from the City's open tax report
    f2lc = {}
    with open(o.taxreport, newline='', encoding='utf-8-sig') as f:
        for r in csv.DictReader(f, delimiter=';'):
            fo = digits(r.get('FOLIO')); lc = (r.get('LAND_COORDINATE') or '').strip()
            if fo and lc: f2lc[fo] = lc
    def parcel(roll):
        d = digits(roll)
        for k in (d, d.lstrip('0'), d.zfill(12), d[:12], d.ljust(12, '0')):
            if k in f2lc: return f2lc[k]
        return None
    desc = {}
    if o.desc and o.desc_text:
        for row in rows(o.desc): desc[digits(txt(row, o.desc_roll))] = txt(row, o.desc_text)
    P = collections.defaultdict(lambda: {'m2': collections.Counter(), 'homes': 0.0, 'heat': collections.Counter(), 'n': 0})
    stat = collections.Counter()
    if o.nonres:
        for row in rows(o.nonres):
            if o.jur and txt(row, 2) != o.jur: continue
            stat['nonres rows'] += 1; lc = parcel(txt(row, 3))
            if not lc: stat['nonres unmatched'] += 1; continue
            p = P[lc]; p['n'] += 1
            homes = num(row, 22) + num(row, 31)
            area = (num(row, 19) + num(row, 20)) * FT2
            g = group_of(desc.get(digits(txt(row, 3)), ''), GROUP_WORDS) or ('apartment' if homes else 'other')
            if homes: p['homes'] += homes
            elif area: p['m2'][g] += area
            h = group_of(txt(row, 42), HEAT_WORDS)
            if h: p['heat'][h] += 1
    if o.res:
        for row in rows(o.res):
            if o.jur and txt(row, 2) != o.jur: continue
            stat['res rows'] += 1; lc = parcel(txt(row, 3))
            if not lc: stat['res unmatched'] += 1; continue
            p = P[lc]; p['n'] += 1; p['homes'] += 1  # one row per dwelling (a strata unit or a house)
    out = {}
    for lc, p in P.items():
        mwh = p['homes'] * HOME_MWH + sum(m2 * GJ.get(g if g in GJ else 'other', GJ['other']) / 3.6 for g, m2 in p['m2'].items())
        g = 'apartment' if p['homes'] and p['homes'] * HOME_MWH >= mwh / 2 else (p['m2'].most_common(1)[0][0] if p['m2'] else 'other')
        t = p['heat'].most_common(1)[0][0] if p['heat'] else 'unknown'
        if mwh > 0: out[lc] = {'h': sig2(mwh), 'g': g, 't': t}  # no record counts: they could reveal unit numbers
    json.dump({'source': 'BC Assessment Non-Residential and Residential Inventory Extracts via UBC Abacus (licensed); values derived and rounded to 2 significant figures; no BCA field is reproduced',
               'cite': 'Contains information licensed under BC Assessment data terms for UBC researchers', 'parcels': out}, open(o.out, 'w'), separators=(',', ':'))
    # summary: counts only
    for k, v in stat.items(): print(f'{k}: {v}')
    print('parcels with a derived heat demand:', len(out))
    print('by use group:', dict(collections.Counter(v['g'] for v in out.values())))
    print('by heating group:', dict(collections.Counter(v['t'] for v in out.values())))
    print('wrote', os.path.abspath(o.out))

if __name__ == '__main__': main()
