"""Files bundled downloads (.tar from make_batch2.py) into sources/library/public/<id>/.
Usage: python3 tar_to_library.py <tag> <staged tmp name> [...]   (uses dl_<tag>.json for links and shared-link aliases)"""
import json, os, shutil, subprocess, sys, tarfile, tempfile, datetime
tag, tmps = sys.argv[1], sys.argv[2:]
ROOT = '../..'; LIB = f'{ROOT}/sources/library/public'; UP = '/mnt/user-data/uploads/Downloads'
L = json.load(open(f'dl_{tag}.json')); url_of = dict(L); ids_of = {}
for i, u in L: ids_of.setdefault(u, []).append(i)
for tmp in tmps:
    x = tempfile.mkdtemp()
    with tarfile.open(f'{UP}/{tmp}') as t:
        for m in t.getmembers():
            if m.isfile() and '..' not in m.name and not m.name.startswith('/'): t.extract(m, x, filter='data')
    for sid in sorted(os.listdir(x)):
        for fn in os.listdir(f'{x}/{sid}'):
            src = f'{x}/{sid}/{fn}'
            if fn == 'page.html' and open(src, 'rb').read(5) == b'%PDF-':
                os.rename(src, f'{x}/{sid}/full.pdf'); fn = 'full.pdf'; src = f'{x}/{sid}/{fn}'
            for alias in ids_of.get(url_of.get(sid, ''), [sid]):
                d = f'{LIB}/{alias}'; os.makedirs(d, exist_ok=True); shutil.copy(src, f'{d}/{fn}')
                info = {'id': alias, 'url': url_of.get(alias, ''), 'saved': datetime.date.today().isoformat(),
                        'via': "built-in browser on J.B.'s computer", 'files': sorted(f for f in os.listdir(d) if f != 'info.json'),
                        'licence': 'public (to confirm per publisher terms)', 'pages_used': [], 'quote': ''}
                if alias != sid: info['same_file_as'] = sid
                p = f'{d}/info.json'
                if os.path.exists(p): info = {**json.load(open(p)), 'files': info['files']}
                json.dump(info, open(p, 'w'), indent=1)
            t = ''
            if fn.endswith('.pdf'):
                r = subprocess.run(['pdfinfo', src], capture_output=True, text=True)
                t = ' | '.join(l.split(':', 1)[1].strip() for l in r.stdout.splitlines() if l.startswith(('Title', 'Pages'))) or 'NOT A VALID PDF'
            print(sid, fn, os.path.getsize(src), t, '+aliases' if len(ids_of.get(url_of.get(sid, ''), [])) > 1 else '')
print('library folders:', len(os.listdir(LIB)))
