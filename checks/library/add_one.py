"""Files one staged download directly: python3 add_one.py <id> <staged tmp name> <url>"""
import json, os, shutil, sys, datetime
sid, tmp, url = sys.argv[1:4]; d = f'../../sources/library/public/{sid}'; os.makedirs(d, exist_ok=True)
src = f'/mnt/user-data/uploads/Downloads/{tmp}'; fn = 'full.pdf' if open(src, 'rb').read(5) == b'%PDF-' else 'page.html'
shutil.copy(src, f'{d}/{fn}')
json.dump({'id': sid, 'url': url, 'saved': datetime.date.today().isoformat(), 'via': "built-in browser on J.B.'s computer",
           'files': [fn], 'licence': 'public (to confirm per publisher terms)', 'pages_used': [], 'quote': ''}, open(f'{d}/info.json', 'w'), indent=1)
print(sid, fn, os.path.getsize(src))
