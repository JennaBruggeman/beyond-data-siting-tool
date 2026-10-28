"""Sources found 28 Oct 2026 (open items 'needs source' / levy):
- dellR760: Dell PowerEdge R760 Installation and Service Manual, 'System weight': 'A server with fully populated drives' 36.1 kg (79.58 lb).
- schneiderUPS2020: original post on blog.se.com, 20 Jul 2020 (byline shown as Schneider Electric on the fetched page).
- abDataCentreLevy: alberta.ca 'Implementing Budget 2026': Fiscal Measures Statutes Amendment Act, 2026 (formerly Bill 17), royal assent
  26 Mar 2026; levy rate 'calculated based on actual power consumption'; 'power not drawn from the broader grid will be eligible for a 0% rate'."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
SRC = {
 'dellR760': [("system weight 36.1 kg (?: not printed in this LCA, which gives only dimensions and weight shares; needs another Dell source)", "system weight 36.1 kg ('A server with fully populated drives', 79.58 lb; 25.1 kg without drives and PSU) from the Dell PowerEdge R760 Installation and Service Manual, 'System weight'; the LCA gives only dimensions and weight shares"),
              (" — https://www.delltechnologies.com/asset/en-us/products/servers/briefs-summaries/poweredge-r760-life-cycle-assessment.pdf", " — https://www.delltechnologies.com/asset/en-us/products/servers/briefs-summaries/poweredge-r760-life-cycle-assessment.pdf ; https://www.dell.com/support/manuals/en-us/oth-r760/per760_ism_pub/system-weight?guid=guid-3fd156f8-143d-4934-998c-3757a3de2cda&lang=en-us")],
 'schneiderUPS2020': [('Schneider Electric blog (M. Hurley),', 'Schneider Electric blog (byline Schneider Electric on blog.se.com; M. Hurley on the Green Grid copy ?),'),
                      ('(vendor, OPERATOR CLAIM; sources/15d — URL as logged there, on a thegreengrid.org host) — https://thegreengrid.org/ja/node/2747', '(vendor, OPERATOR CLAIM; sources/15d) — https://blog.se.com/datacenter/2020/07/20/design-considerations-deployment-ups-systems-in-data-centers/')],
 'abDataCentreLevy': [("R 2% grid power, 1% new capacity, 0% off-grid (?: one check finds the off-grid exemption repealed by Bill 17, which rewrote R)", "R as passed in 2025: 2% grid power, 1% new capacity, 0% off-grid; the Fiscal Measures Statutes Amendment Act, 2026 (Bill 17, royal assent 26 Mar 2026) bases the rate on 'actual power consumption', and 'power not drawn from the broader grid will be eligible for a 0% rate' (alberta.ca, Implementing Budget 2026; new 2%/1% split not re-read ?)"),
                      ('(bill text read; consolidated Act and Assessment Bulletin 25-02 not read)', '(bill text read; consolidated Act and Assessment Bulletin 25-02 not read) ; https://www.alberta.ca/implementing-budget-2026')],
}
for p, pretty in ((R / 'register/formula_register.json', True), (R / 'tool/opps.json', False)):
    d = json.loads(p.read_text()); n = 0; miss = []
    for sec in (('new_sources', 'old_sources') if pretty else ('sources',)):
        for i, reps in SRC.items():
            if i in d[sec]:
                for a, b in reps:
                    if a in d[sec][i]: d[sec][i] = d[sec][i].replace(a, b, 1); n += 1
                    elif b not in d[sec][i]: miss.append((i, a[:30]))
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(p.name, n, miss)
