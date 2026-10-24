"""Recalculates size_check.xlsx with LibreOffice (headless) and reports every mismatch."""
import json, os, subprocess, shutil, tempfile
from openpyxl import load_workbook
HERE = os.path.dirname(os.path.abspath(__file__))
src = os.path.join(HERE, 'size_check.xlsx')
tmp = tempfile.mkdtemp()
subprocess.run(['soffice', '--headless', '--convert-to', 'xlsx', '--outdir', tmp, src], check=True, capture_output=True)
wb = load_workbook(os.path.join(tmp, 'size_check.xlsx'), data_only=True); s = wb['Size']
rows = json.load(open(os.path.join(HERE, 'size_check_rows.json')))
lots = [s.cell(3, 2 + j).value for j in range(5)]
bad = 0
for key, r in rows.items():
    if not key.startswith('D_'): continue
    for j, k in enumerate(lots):
        v = s.cell(r, 2 + j).value
        if v not in (None, '') and isinstance(v, (int, float)) and v > 0.01:
            bad += 1; print(f'MISMATCH {k} {key[2:]}: sheet {s.cell(rows[key[2:]], 2 + j).value} engine {s.cell(rows["E_" + key[2:]], 2 + j).value}')
for key in ('mw_hi', 'mw_hi_nocap'):
    print(key, [round(s.cell(rows[key], 2 + j).value, 2) for j in range(5)])
shutil.copy(os.path.join(tmp, 'size_check.xlsx'), os.path.join(HERE, 'size_check_recalculated.xlsx'))
print('mismatches:', bad)
