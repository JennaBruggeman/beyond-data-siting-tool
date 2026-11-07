"""7 Nov 2026 (worklist 1): security_layers still read as if the fence were the RCMP's 2.4 m at the lot line. Since 4 Nov 2026 (J.B.)
the fence is a design choice, not code: 1.9 m everywhere (meets Vancouver ZDB s. 10.10.3 in required yards). Wording only; no number
the tool uses changes. The 30 Oct text stays as history after "was:"."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
Q = {q['id']: q for q in d['quantities']}
q = Q['security_layers']
OLD = "FENCE (30 Oct 2026, J.B.: one fence, the type expected at a Tier III/IV site): "
NEW = ("FENCE (J.B. 4 Nov 2026): a fence is a design choice, not code; one 1.9 m anti-climb welded mesh fence everywhere (meets the "
       "Vancouver 1.9 m cap in required yards, ZDB s. 10.10.3, arch_per_vanS10); the RCMP's 2.4 m minimum is shown as guidance only. "
       "The secure line may also be the building wall or a line inside it (no fence). Was (30 Oct 2026, J.B.: one fence, the type expected at a Tier III/IV site): ")
if NEW not in q['coef']:
    assert OLD in q['coef'], 'security_layers fence text not found'
    q['coef'] = q['coef'].replace(OLD, NEW, 1)
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('security_layers fence wording updated')
