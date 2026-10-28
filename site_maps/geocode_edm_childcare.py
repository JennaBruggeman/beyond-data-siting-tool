"""Edmonton licensed child care (Alberta Child Care Information, Dec 2025 extract) located by matching the street address to the 2026 assessment roll.
Writes v5_inputs/edm_childcare_geocoded.csv; unmatched rows are listed in the log. The Alberta file has no coordinates."""
import csv, re, os, collections
H = os.path.dirname(os.path.abspath(__file__)); U = '/root/.claude/uploads/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b'
idx = {}
for r in csv.DictReader(open(os.path.join(H, '..', 'data', 'edmonton_properties_2026.csv'))):
    k = (r['house_number'].strip(), re.sub(r'\s+', ' ', r['street'].strip().upper()))
    if k[0] and r['lat']: idx.setdefault(k, (float(r['lat']), float(r['lon'])))
AB = {'AVE': 'AVENUE', 'AV': 'AVENUE', 'ST': 'STREET', 'RD': 'ROAD', 'BLVD': 'BOULEVARD', 'DR': 'DRIVE', 'CRES': 'CRESCENT', 'TRL': 'TRAIL', 'WY': 'WAY', 'PL': 'PLACE', 'CRT': 'COURT', 'CT': 'COURT', 'LN': 'LANE'}
def norm(a):
    a = a.upper().replace('–', '-')
    a = re.sub(r'\bUNIT\s+\S+\s*', '', a); a = re.sub(r'#\s*\S+?[\s,-]+(?=\d)', '', a)
    a = re.sub(r'^(\d+)\s*,\s*(?=\d+\s+[A-Z])', lambda m: '' if True else '', a) if re.match(r'^\d+\s*,\s*\d+\s+[A-Z]', a) and not re.match(r'^\d{4,6}\s*,\s*\d{2,3}\s+(STREET|AVENUE|ST|AVE)', a) else a
    a = re.sub(r'^(\d{4,6})\s*,\s*', r'\1 ', a)
    a = re.sub(r'^\d+[A-Z]?\s+(?=\d{3,6}\s+\S)', '', a) if re.match(r'^\d+[A-Z]?\s+\d{3,6}\s+\d', a) or re.match(r'^\d+[A-Z]\s+\d', a) else a
    a = re.sub(r'(\d)\s*-\s*(\d)', r'\1 \2', a) if re.match(r'^\d+\s*-\s*\d{1,3}\s+(STREET|AVENUE|ST|AVE)', a) else re.sub(r'^\d+[A-Z]?\s*-\s*(?=\d)', '', a)
    a = a.replace(' - ', ' ')
    m = re.match(r'^(\d+)[/\d]*\s+(.*)$', a.strip())
    if not m: return None
    st = ' '.join(AB.get(t, t) for t in re.sub(r"[.,]", ' ', m.group(2)).split())
    st = re.sub(r"\s+HAMPTON'S LANDING$", '', st)
    return m.group(1), st
bystreet = collections.defaultdict(list)
for (n, st), v in idx.items():
    if n.isdigit(): bystreet[st].append((int(n), v))
rows = {}; 
for r in csv.DictReader(open(os.path.join(U, '010773a4-child-care-open-data-202512.csv'), encoding='utf-8-sig')):
    if r['Program City'].strip().upper() == 'EDMONTON' and r['Type of Program'] == 'FACILITY-BASED PROGRAM': rows[r['Program ID']] = r
out = []; miss = []
for r in rows.values():
    k = norm(r['Program Address']); hit = None
    if k:
        for suf in ('', ' NW', ' SW', ' NE', ' SE'):
            hit = idx.get((k[0], (k[1] + suf).strip()))
            if hit: break
    if not hit and k:
        for suf in ('', ' NW', ' SW', ' NE', ' SE'):
            c = bystreet.get((k[1] + suf).strip())
            if c:
                d, v = min((abs(n - int(k[0])), v) for n, v in c)
                if d <= 40: hit = v; break   # nearest house number on the same street, within 40
    if hit: out.append(dict(name=r['Program Name'], address=r['Program Address'], capacity=r['Capacity'], lat=hit[0], lon=hit[1]))
    else: miss.append(r['Program Address'])
w = csv.DictWriter(open(os.path.join(H, 'v5_inputs', 'edm_childcare_geocoded.csv'), 'w', newline=''), ['name', 'address', 'capacity', 'lat', 'lon']); w.writeheader(); w.writerows(out)
print('facility-based programs', len(rows), 'matched', len(out), 'unmatched', len(miss)); print(miss[:25])
