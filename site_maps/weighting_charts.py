# Charts for the weighting study (static PNGs, dark style to match the check maps). Run after weighting_study.py and add_parcels.py.
import json, csv, math, os
import numpy as np, matplotlib
matplotlib.use('Agg'); import matplotlib.pyplot as plt
from matplotlib import font_manager as fm
H = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(H, 'charts'); os.makedirs(OUT, exist_ok=True)
for f in ['IBMPlexSans-400.ttf', 'IBMPlexSans-500.ttf']:
    p = os.path.join(H, 'fonts', f)
    if os.path.exists(p): fm.fontManager.addfont(p)
BG, INK, MUTE, FAINT, GRID, ACC = '#202124', '#f2efea', '#bdb9b2', '#8a8680', '#34373b', '#CC746C'
plt.rcParams.update({'font.family': 'IBM Plex Sans', 'font.size': 12, 'text.color': INK, 'axes.labelcolor': MUTE, 'xtick.color': FAINT, 'ytick.color': MUTE,
                     'axes.edgecolor': GRID, 'axes.facecolor': BG, 'figure.facecolor': BG, 'savefig.facecolor': BG, 'axes.spines.top': False, 'axes.spines.right': False})
E = ['heat', 'energy', 'water', 'materials', 'people']; COL = dict(heat='#d99a4e', energy='#6fa3d8', water='#6fc3c3', materials='#a9c49a', people='#b79fd6')
CN = dict(van='Vancouver', edm='Edmonton'); SCH = ['equal', 'priority', 'spread']; SN = dict(equal='Equal (20 % each)', priority='Priority (heat first)', spread='Spread (what varies)')
S = json.load(open(f'{H}/weighting_summary.json')); study = list(csv.DictReader(open(f'{H}/factor_study.csv'))); corr = list(csv.DictReader(open(f'{H}/factor_correlation.csv')))
top = list(csv.DictReader(open(f'{H}/weighting_top5.csv')))
def note(fig, t): fig.text(.02, .015, t, color=FAINT, fontsize=10)
def title(fig, t, s=None):
    fig.text(.02, .955, t, fontsize=19, fontweight='medium', color=INK)
    if s: fig.text(.02, .915, s, fontsize=12, color=MUTE)

# 1. weights: one 100 % bar per scheme, direct labels
fig, axs = plt.subplots(1, 2, figsize=(14, 5.2)); title(fig, 'How each scheme weighs the five exchanges', 'Share of the overlap score given to each exchange')
for ax, c in zip(axs, ['van', 'edm']):
    for i, sch in enumerate(SCH):
        w = S[c]['weights'][sch]; left = 0
        for e, v in zip(E, w):
            ax.barh(i, v, left=left, color=COL[e], height=.62, edgecolor=BG, linewidth=2)
            if v >= .06: ax.text(left + v / 2, i, f'{e}\n{v*100:.0f} %', ha='center', va='center', fontsize=9.5, color='#17181a')
            elif v > 0: ax.text(left + v + .005, i + .42, f'{e} {v*100:.0f} %', fontsize=9, color=MUTE)
            left += v
    ax.set_yticks(range(3)); ax.set_yticklabels([SN[s] for s in SCH]); ax.invert_yaxis(); ax.set_xlim(0, 1); ax.set_xticks([]); ax.spines['bottom'].set_visible(False); ax.spines['left'].set_visible(False)
    ax.set_title(CN[c], loc='left', color=INK, fontsize=14, pad=10)
fig.subplots_adjust(top=.8, bottom=.1, left=.12, right=.98, wspace=.35); note(fig, 'Priority is an example for J.B. to set. Spread = how much a score varies across the city x the share of the city where it is above 0.')
fig.savefig(f'{OUT}/01_weights_by_scheme.png', dpi=150); plt.close(fig)

# 2. what each exchange can tell apart: coverage and spread
fig, axs = plt.subplots(2, 2, figsize=(14, 8.5), sharey='row'); title(fig, 'What each exchange can tell apart', 'A score that is zero across most of the city, or the same everywhere, cannot separate sites')
for j, c in enumerate(['van', 'edm']):
    rows = [r for r in study if r['city'] == c]
    for i, (key, lab) in enumerate([('share_cells_above_0', 'Share of the city where it scores above 0'), ('std', 'How much it varies (standard deviation of the 0-1 score)')]):
        ax = axs[i, j]; v = [float(r[key]) for r in rows]
        ax.barh(range(5), v, color=[COL[e] for e in E], height=.6)
        for k, x in enumerate(v): ax.text(x + .01, k, f'{x*100:.0f} %' if i == 0 else f'{x:.2f}', va='center', fontsize=10.5, color=INK)
        ax.set_yticks(range(5)); ax.set_yticklabels(E)
        if j == 0: ax.invert_yaxis()
        ax.set_xlim(0, 1.1 if i == 0 else .4);
        if i == 0: ax.set_xticks([0, .25, .5, .75, 1]); ax.set_xticklabels(['0', '25 %', '50 %', '75 %', '100 %'])
        ax.grid(axis='x', color=GRID, lw=.8); ax.set_axisbelow(True)
        ax.set_title(f'{CN[c]}: {lab}' if i == 0 else lab, loc='left', fontsize=12.5, color=INK if i == 0 else MUTE)
fig.subplots_adjust(top=.85, bottom=.08, left=.09, right=.97, hspace=.45, wspace=.25)
note(fig, 'Edmonton water is above 0 in only 12 % of cells: it counts only the distance to Gold Bar (one source).')
fig.savefig(f'{OUT}/02_what_each_exchange_tells_apart.png', dpi=150); plt.close(fig)

# 3. which exchanges go together (correlation), labelled cells, diverging around 0
from matplotlib.colors import LinearSegmentedColormap
cm = LinearSegmentedColormap.from_list('d', ['#6fa3d8', '#3a3d42', '#d99a4e'])
fig, axs = plt.subplots(1, 2, figsize=(13, 6)); title(fig, 'Which exchanges rise and fall together', 'Correlation of the 0-1 scores across all cells. High = they reward the same places, so those places count twice')
for ax, c in zip(axs, ['van', 'edm']):
    M = np.eye(5)
    for r in corr:
        if r['city'] == c: a, b = E.index(r['a']), E.index(r['b']); M[a, b] = M[b, a] = float(r['r'])
    Mm = np.where(np.tril(np.ones((5, 5)), -1) > 0, M, np.nan)
    ax.imshow(Mm, cmap=cm, vmin=-1, vmax=1)
    for a in range(5):
        for b in range(a):
            ax.text(b, a, f'{M[a, b]:+.2f}', ha='center', va='center', fontsize=12, color=INK if abs(M[a, b]) < .45 else '#17181a', fontweight='medium' if abs(M[a, b]) >= .5 else 'normal')
    ax.set_xticks(range(4)); ax.set_xticklabels(E[:4]); ax.set_yticks(range(1, 5)); ax.set_yticklabels(E[1:]); ax.set_xlim(-.5, 3.5); ax.set_ylim(4.5, .5)
    for s in ax.spines.values(): s.set_visible(False)
    ax.tick_params(length=0); ax.set_title(CN[c], loc='left', fontsize=14, color=INK, pad=10)
fig.subplots_adjust(top=.8, bottom=.08, left=.08, right=.98, wspace=.3)
note(fig, 'Vancouver: heat, water and materials all peak in the same dense, mixed-use cells (False Creek flats, downtown). Scale: blue -1, grey 0, orange +1.')
fig.savefig(f'{OUT}/03_exchanges_together.png', dpi=150); plt.close(fig)

# 4. how much the winners win by: top-5 scores by rank, per scheme
fig, axs = plt.subplots(2, 2, figsize=(14, 8.5)); title(fig, 'How much the top sites win by', 'Score of the 1st to 5th best site (at least 2 km apart), with the city\'s top 1 % line for reference')
MK = dict(equal='o', priority='s', spread='D')
for j, c in enumerate(['van', 'edm']):
    for i, z in enumerate(['', '_zoned']):
        ax = axs[i, j]
        for sch in SCH:
            v = S[c][sch + z]['top5']; ax.plot(range(1, 6), v, marker=MK[sch], ms=8, lw=2, color=INK if sch == 'equal' else MUTE if sch == 'priority' else FAINT, label=SN[sch])
        p99 = S[c]['equal' + z]['p99']; ax.axhline(p99, color=ACC, lw=1, ls='--'); ax.text(5.15, p99, 'top 1 %\n(equal)', color=ACC, fontsize=9, va='center')
        ax.set_xticks(range(1, 6)); ax.set_xlim(.7, 5.8); ax.grid(axis='y', color=GRID, lw=.8); ax.set_axisbelow(True)
        ax.set_title(f'{CN[c]}, ' + ('zoning ignored (where a rezoning could be tried)' if not z else 'zoning counted'), loc='left', fontsize=12.5, color=INK)
        ax.set_ylabel('overlap score'); ax.set_xlabel('rank')
        if i == 0 and j == 0: ax.legend(frameon=False, fontsize=10, loc='lower left')
fig.subplots_adjust(top=.85, bottom=.11, left=.07, right=.96, hspace=.5, wspace=.25)
note(fig, 'Edmonton, zoning ignored: the top five sit within about 0.03 of each other in every scheme: a group of near-equals, not a ranking. Scores are not comparable across schemes.')
fig.savefig(f'{OUT}/04_how_much_they_win_by.png', dpi=150); plt.close(fig)

# 5. robustness: which sites stay near the top whatever the weights, and where they rank in each scheme
for z, zl in [('_zoned', 'zoning counted'), ('', 'zoning ignored')]:
    fig, axs = plt.subplots(1, 2, figsize=(15, 6.2)); title(fig, f'Which sites hold up whatever the priorities ({zl})', 'Share of 500 random weightings in which the site is among the city\'s best 30 cells; numbers = its rank in each scheme')
    for ax, c in zip(axs, ['van', 'edm']):
        rs = [r for r in top if r['city'] == c and r['scheme'] in [s + z for s in SCH] + ['stability' + z]]
        sites = {}
        for r in rs:
            k = r['cell']; nm = ' '.join(w if w in ('NW','NE','SW','SE','E','W','N','S') else (w.lower() if not w.isalpha() else w.capitalize()) for w in (r['parcels_in_cell'].split(' (')[0] or '?').split())
            match = next((s for s in sites if math.hypot(*(np.array(sites[s]['xy']) - np.array([float(r['lon']), float(r['lat'])])) * np.array([70e3, 111e3])) < 600), None)
            if match is None: sites[k] = dict(name=nm, xy=(float(r['lon']), float(r['lat'])), stab=float(r['stability' + z]), ranks={}); match = k
            if r['scheme'] in [s + z for s in SCH]: sites[match]['ranks'][r['scheme'].replace(z, '')] = int(r['rank'])
            sites[match]['stab'] = max(sites[match]['stab'], float(r['stability' + z]))
        L = sorted(sites.values(), key=lambda s: -s['stab'])[:8]
        y = np.arange(len(L)); ax.barh(y, [s['stab'] for s in L], color=MUTE, height=.55)
        for k, s in enumerate(L):
            ax.text(s['stab'] + .02, k, f"{s['stab']*100:.0f} %", va='center', fontsize=10.5)
            for m, sch in enumerate(SCH):
                rk = s['ranks'].get(sch); ax.text(1.28 + m * .17, k, str(rk) if rk else '–', ha='center', va='center', fontsize=11, color=INK if rk else FAINT)
        for m, sch in enumerate(SCH): ax.text(1.28 + m * .17, -.9, sch, ha='center', fontsize=9.5, color=MUTE)
        ax.set_yticks(y); ax.set_yticklabels([s['name'][:28] for s in L], fontsize=10.5); ax.invert_yaxis(); ax.set_xlim(0, 1.66); ax.set_xticks([0, .25, .5, .75, 1]); ax.set_xticklabels(['0', '25 %', '50 %', '75 %', '100 %'])
        ax.grid(axis='x', color=GRID, lw=.8); ax.set_axisbelow(True); ax.set_title(CN[c], loc='left', fontsize=14, color=INK, pad=22)
    fig.subplots_adjust(top=.78, bottom=.08, left=.15, right=.98, wspace=.55)
    note(fig, 'Rank columns: the site\'s place in the top 5 of each scheme (– = not in the top 5). Names: first parcel in the cell.')
    fig.savefig(f'{OUT}/05_robust_sites{z or "_rezoning"}.png', dpi=150); plt.close(fig)
print(sorted(os.listdir(OUT)))
