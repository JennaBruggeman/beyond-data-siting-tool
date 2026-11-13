# Edmonton public rooms for the Architecture "Programs nearby" card (audit K55, J.B. 13 Nov 2026): libraries, recreation centres and community
# league halls from the City of Edmonton open-data CSVs (register edmLibraries, edmRecFacilities, edmLeagueHalls). Raw CSVs stay outside the repo.
# Writes tool/public_rooms_edm.json in the shape of public_rooms_van.json: [name, address, lat, lon] per row.
# Usage: python make_public_rooms_edm.py <folder with jn25-zspi.csv, nz3t-vyg3.csv, kaps-rk7z.csv>
import csv, json, os, sys
D = sys.argv[1]; here = os.path.dirname(os.path.abspath(__file__))
rd = lambda f: list(csv.DictReader(open(os.path.join(D, f), encoding='utf-8-sig')))
num = lambda v: round(float(v), 5) if v not in (None, '') else None
lib = [[r['Branch'].strip(), r['Address'].strip(), num(r['Latitude']), num(r['Longitude'])] for r in rd('jn25-zspi.csv') if r.get('Latitude')]
cc = [[r['Facility Name'].strip(), (r.get('Address') or '').strip(), num(r['latitude']), num(r['longitude'])] for r in rd('nz3t-vyg3.csv') if r.get('latitude') and r.get('Facility Type', '').strip() == 'Recreation Centre']
hall = [[(r['NAME'].strip() + ' Community League hall'), (r.get('ADDRESS') or '').strip(), num(r['LATITUDE']), num(r['LONGITUDE'])] for r in rd('kaps-rk7z.csv') if r.get('LATITUDE')]
out = {'src': ['edmLibraries', 'edmRecFacilities', 'edmLeagueHalls'], 'lib': lib, 'cc': cc, 'hall': hall,
       '_about': 'City of Edmonton Open Data (Open Government Licence): Public Libraries, Recreation Facilities (recreation centres only), Community League Halls; downloaded 13 Nov 2026. Built by checks/tests/make_public_rooms_edm.py.'}
json.dump(out, open(os.path.join(here, '..', '..', 'tool', 'public_rooms_edm.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
print('libraries', len(lib), 'recreation centres', len(cc), 'league halls', len(hall))
