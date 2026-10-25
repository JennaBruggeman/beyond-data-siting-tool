"""Match browser downloads (random .tmp names in ~/Downloads) to the names the script gave them.
Usage: python3 file_downloads.py <out.json from the browser> <device listing json> <since_ms>
Prints the ~/Downloads paths to stage, and writes pending.json (stage path -> library path)."""
import json, sys
out = json.load(open(sys.argv[1])); lst = json.load(open(sys.argv[2]))['entries']; since = int(sys.argv[3])
cand = sorted([e for e in lst if e.get('type') == 'file' and (e.get('mtimeMs') or 0) >= since], key=lambda e: e['mtimeMs'])
want = [o for o in out if o[1] > 0]
pend, i = {}, 0
for name, size in want:
    while i < len(cand) and cand[i]['size'] != size: i += 1
    if i == len(cand): print('NOT FOUND', name, size); continue
    pend[cand[i]['name']] = name; i += 1
json.dump(pend, open('pending.json', 'w'), indent=1)
print(json.dumps(['~/Downloads/' + k for k in pend]))
