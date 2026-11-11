"""Register rebuild from the patches (11 Nov 2026, J.B.: run a from-scratch rebuild and fix anything that stops it).
Usage: git worktree add --detach <wt> HEAD; python checks/tests/register_rebuild.py <wt> <repo>. Result: <wt>/register/formula_register.json.
Replay every register patch added after 5d1aba6 (repo reorganization, 22 Oct 2026) on the register as it was then, in commit
order, with today's patch scripts and today's checks/ files. Side files a patch also writes (tool/opps.json, tool/data/*.json,
tool/arch_programs.json) are reset before each patch to their state just before the patch's own commit, so only the register replays."""
import subprocess, sys, os, json
WT, REPO = sys.argv[1], sys.argv[2]
SIDE = ['tool/opps.json', 'tool/arch_programs.json', 'tool/data/arch.json', 'tool/data/zones.json', 'tool/data/plant_units.json', 'tool/data/grade.json', 'tool/data/equipment.json', 'tool/data/dc_rooms.json']
def git(*a): return subprocess.run(['git', '-C', REPO] + list(a), capture_output=True, text=True, encoding='utf-8').stdout
log = git('log', '--diff-filter=A', '--reverse', '--format=@@%h', '--name-only', '--', 'register/patches/*.py').split('\n')
order, c = [], None
for l in log:
    if l.startswith('@@'): c = l[2:]; continue
    if l.strip() and c != '5d1aba6': order.append((c, l.strip()))
# patches written today but not committed yet (run in the order of the date in their name)
import glob, re
known = {f for _, f in order} | set(git('show', '--name-only', '--format=', '5d1aba6').split())
for f in sorted(glob.glob(os.path.join(REPO, 'register/patches/*.py'))):
    rel = 'register/patches/' + os.path.basename(f)
    if rel not in known and not os.path.basename(f).startswith('_'): order.append(('HEAD', rel))
def cdate(c): return git('show', '-s', '--format=%ct', c).strip()
key = []
for i, (c, f) in enumerate(order):
    if c == 'HEAD':
        m = re.search(r'^# rebuild-after: (\w+)', open(os.path.join(REPO, f), encoding='utf-8').read(), re.M)
        key.append((cdate(m.group(1)) + '.5' if m else '9999999999', i))
    else: key.append((cdate(c), i))
order = [order[i] for _, i in sorted(key)]
reg = os.path.join(WT, 'register/formula_register.json')
open(reg, 'w', encoding='utf-8', newline='\n').write(git('show', '5d1aba6:register/formula_register.json'))
start = int(sys.argv[3]) if len(sys.argv) > 3 else 0
for i, (c, f) in enumerate(order):
    if i < start: continue
    if not os.path.exists(os.path.join(WT, f)): print(i, 'MISSING', f); continue
    for s in SIDE:
        r = subprocess.run(['git', '-C', REPO, 'show', f'{c}^:{s}' if c != 'HEAD' else f'HEAD:{s}'], capture_output=True)
        if r.returncode: r = subprocess.run(['git', '-C', REPO, 'show', f'{c}:{s}'], capture_output=True)   # created in the patch's own commit
        p = os.path.join(WT, s)
        if r.returncode == 0: open(p, 'wb').write(r.stdout)
    env = dict(os.environ, PYTHONUTF8='1', PYTHONIOENCODING='utf-8')
    r = subprocess.run([sys.executable, os.path.basename(f)], cwd=os.path.join(WT, os.path.dirname(f)), capture_output=True, text=True, encoding='utf-8', env=env)
    if r.returncode:
        print(i, 'STOP', f, c); print((r.stdout + r.stderr)[-1500:]); sys.exit(2)
    print(i, 'ok', f, '::', (r.stdout.strip().split('\n') or [''])[-1][:80])
print('DONE', len(order))
