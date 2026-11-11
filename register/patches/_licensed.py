"""Guard for old patches that load files from checks/ (J.B. 11 Nov 2026).

Licensed-standard text was paraphrased in the register (licensed_text_rewrite_2026_11_11.py, licensed_text_rewrite_b_2026_11_11.py)
and in the research and check files. Every patch that reads a file from checks/ passes what it loads through clean(), so a rebuild
writes the paraphrase even if an older copy of a file comes back. clean() applies the rewrite patches' own pairs (old -> new) to every
string, then fails if any old passage is still there.
"""
import ast, pathlib

_H = pathlib.Path(__file__).resolve().parent
_PAIRS = None


def _load():
    pairs = []
    for f in ('licensed_text_rewrite_2026_11_11.py', 'licensed_text_rewrite_b_2026_11_11.py'):
        tree = ast.parse((_H / f).read_text(encoding='utf-8'))
        node = next(n for n in tree.body if isinstance(n, ast.Assign) and getattr(n.targets[0], 'id', '') == 'E')
        for _, ps in ast.literal_eval(node.value):
            pairs += list(ps)
    pairs.sort(key=lambda p: -len(p[0]))
    return pairs


def _fix(s):
    for old, new in _PAIRS:
        if old in s:
            s = s.replace(old, new)
    return s


def clean(o):
    """Return o with every string passed through the licensed-text pairs (dicts, lists, strings; keys kept)."""
    global _PAIRS
    if _PAIRS is None:
        _PAIRS = _load()
    if isinstance(o, str):
        s = _fix(o)
        bad = [old for old, _ in _PAIRS if old in s]
        if bad:
            raise SystemExit('licensed text still present after clean(): ' + bad[0][:60])
        return s
    if isinstance(o, dict):
        return {k: clean(v) for k, v in o.items()}
    if isinstance(o, list):
        return [clean(v) for v in o]
    return o
