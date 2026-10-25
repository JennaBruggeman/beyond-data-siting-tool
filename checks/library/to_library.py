"""Copies staged downloads into sources/library/public/<id>/ and writes info.json.
Usage: python3 to_library.py <domain>   (uses pending.json and dl_<domain>.json)"""
import json, os, shutil, subprocess, sys, datetime, time
dom = sys.argv[1]; ROOT = '../..'; LIB = f'{ROOT}/sources/library/public'; UP = '/mnt/user-data/uploads/Downloads'
pend = json.load(open('pending.json')); L = json.load(open(f'dl_{dom}.json'))
url_of = dict(L); ids_of = {}
for i, u in L: ids_of.setdefault(u, []).append(i)
time.sleep(2); report = []
for tmp, name in pend.items():
    sid, fn = name.split('/', 1); src = f'{UP}/{tmp}'
    if not os.path.exists(src): report.append((name, 'MISSING')); continue
    for alias in ids_of.get(url_of.get(sid, ''), [sid]):
        d = f'{LIB}/{alias}'; os.makedirs(d, exist_ok=True); shutil.copy(src, f'{d}/{fn}')
        info = {'id': alias, 'url': url_of.get(alias, ''), 'saved': datetime.date.today().isoformat(),
                'via': "built-in browser on J.B.'s computer", 'files': sorted(f for f in os.listdir(d) if f != 'info.json'),
                'licence': 'public (to confirm per publisher terms)', 'pages_used': [], 'quote': ''}
        if alias != sid: info['same_file_as'] = sid
        old = f'{d}/info.json'
        if os.path.exists(old): info = {**json.load(open(old)), 'files': info['files']}
        json.dump(info, open(old, 'w'), indent=1)
    t = ''
    if fn.endswith('.pdf'):
        r = subprocess.run(['pdfinfo', src], capture_output=True, text=True)
        t = ' | '.join(l.split(':', 1)[1].strip() for l in r.stdout.splitlines() if l.startswith(('Title', 'Pages'))) or 'NOT A VALID PDF'
    report.append((name, t))
for r in report: print(*r)
print('library folders:', len(os.listdir(LIB)))
