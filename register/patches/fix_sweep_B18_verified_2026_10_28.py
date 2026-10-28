"""Second-check batch 18 (J.B. 28 Oct 2026), web, last of the queue. Corrections only where both checks agree; else '?'."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REPL = {
 'cda2023': [('copper in data centres, 20–40 t/MW', "Copper in Data Centers: A North American Market Study (Sept 2023; industry association), 20–40 'tons/MW' (metric or short not stated; also 'nearly 3 tons/MW' at rack level, p. 21)")],
 'ashraeTC99card': [('reference card, Table 2.1:', 'reference card (table number not printed on the card ?):'), ('dew point −9 to 15 °C', 'dew point −9 to 15 °C (with an RH cap per the footnote ?)')],
 'edmProcTimes': [('web page saved 14 Oct 2026', 'web page saved 14 Oct 2026 (the URL now serves another page; actuals rest on the saved copy ?)')],
 'cambridgeApp5': [('district pipe US$/ft', "district pipe $/ft (US$ ?)")],
 'vanRezoneTime': [("'about one year to process (from fee payment to public hearing)' (apply-to-rezone page, Jun 2026)", "'about one year to process (from fee payment to public hearing)' (apply-to-rezone page, Jun 2026; not seen by check 2 ?)")],
}
reg = R / 'register/formula_register.json'; r = json.loads(reg.read_text())
op = R / 'tool/opps.json'; o = json.loads(op.read_text())
done, miss = set(), []
for d in (r['new_sources'], r['old_sources'], o['sources']):
    for i, reps in REPL.items():
        if i in d:
            for a, b in reps:
                if a in d[i]: d[i] = d[i].replace(a, b, 1); done.add(i)
                elif b not in d[i]: miss.append((i, a[:40]))
reg.write_text(json.dumps(r, ensure_ascii=False, indent=1)); op.write_text(json.dumps(o, ensure_ascii=False, separators=(',', ':')))
print('applied', len(done), 'of', len(REPL), 'miss', miss)
