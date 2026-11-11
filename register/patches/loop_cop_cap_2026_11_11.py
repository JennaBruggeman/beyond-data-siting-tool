"""11 Nov 2026 (J.B.): for the cost of heat, the loop COP (Lorenz, cooler case W32) is capped end by end at the realised range 3-4.5 (register cop);
the Lorenz figures (60 °C radiators 8.7-13.0, 70 °C baseboards 5.9-8.3) are shown only as a note: theoretical, small lift, not reached by built heat
pumps in the register. W45 stays as temperatures only."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
Q = {q['id']: q for q in d['quantities']}
for k in ('heat_temp', 'cop'):
    if k in Q:
        Q[k]['coef'] = ('11 Nov 2026 (J.B.): cost of heat uses the loop COP capped at the realised 3–4.5; Lorenz figures from the W32 loop (5.9–13.0) shown only as a '
                        'theoretical note (small lift; not reached by built heat pumps in the register). ‖ ') + Q[k]['coef']
        Q[k]['revised'] = '2026-11-11'
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('cap noted')
