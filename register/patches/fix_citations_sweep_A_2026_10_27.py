"""Source sweep group A (J.B. 27 Oct 2026): citation-only fixes (title, publisher, date, URL, table) from checks/source_sweep_results.csv.
No coefficient or value changes. Also: J.B.'s field visits removed as a source for 'Heat temperature by cooling type' (a street visit cannot show heat temperature)."""
import json, pathlib, re
R = pathlib.Path(__file__).resolve().parents[2]
U = {  # id: [(old, new), ...]
 'abModelGuideline': [('Alberta Environment and Protected Areas, Air Quality', 'Alberta Environment and Parks, Air Quality')],
 'bcDispersion': [('Guidelines for Air Quality Dispersion Modelling in BC', 'British Columbia Air Quality Dispersion Modelling Guideline (July 2026 version)')],
 'bcWSRfees': [('https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/37_2016', 'https://free.bcpublications.ca/civix/document/id/complete/statreg/37_2016')],
 'bcaGuideCom': [('Commercial Inventory Extract External User Guide v1.0', "BCA User Guide for BCA Non-Residential Inventory Extract, Version 1.0 (5 Apr 2019)")],
 'bchRS2289': [("excess purchased 'at 10 cents per kWh'", 'excess as a bill credit of $0.10/kWh'),
               ('https://www.bchydro.com/toolbar/about/strategies-plans-regulatory/rate-design/self-generation-rate-updates.html', 'https://app.bchydro.com/accounts-billing/electrical-connections/customer-generation.html')],
 'bch_primary': [('BC Hydro, Primary Service Guide (distribution standards)', 'BC Hydro, distribution standards primary service guide, Rev. 4 (2025)')],
 'blatchfordDESS': [('City of Edmonton / Blatchford, District energy sharing system overview (undated, uploaded 2016)', "BC Climate Toolkit, 'District Energy Systems' (undated; hosted on blatchfordedmonton.ca, uploaded 2016)")],
 'catTM9338': [('Caterpillar 3516 performance sheet TM9338', 'Caterpillar 3516 performance sheet TM9338 (copy on a used-equipment dealer site; no Caterpillar-hosted copy found)')],
 'cie150': [('via ILP GN01/20 — https://mta-sts.brighton-hove.gov.uk/sites/default/files/2021-05/OD65%20ILP-Guidance%20Note%201%202020.pdf', 'via ILP Guidance Note 01/21 (May 2021, supersedes GN01/20) — https://theilp.org.uk/publication/guidance-note-1-for-the-reduction-of-obtrusive-light-2021/')],
 'daikinCAT624': [('catalogue 624', 'Catalog 624-23'), ('https://info.hoffman-hoffman.com/hubfs/CAT624.pdf', 'https://tahoeweb.daikinapplied.com/api/general/DownloadDocumentByName/media/CAT624.pdf/')],
 'dfoScreen': [('Interim code of practice: end-of-pipe fish protection screens', 'Water intake end-of-pipe fish screens (interim mitigation standard)')],
 'ecccEF2026': [('Tables A6.1-1, A6.1-3', 'Tables A6.1-1, A6.1-4')],
 'edmRezComplexity': [('(updated 1 Jan 2024)', '(about Jan 2024; date not confirmed)'), ('https://www.edmonton.ca/documents/PDF/ApplicationComplexity-Rezoning.pdf', 'https://www.edmonton.ca/sites/default/files/public-files/assets/PDF/ApplicationComplexity-Rezoning.pdf')],
 'epaCHP2015': [('Catalog of CHP Technologies (2015)', 'Catalog of CHP Technologies (updated edition, Sep 2017)')],
 'epcorTC2025s44': [('(Jan 2025)', '(Jan 2025 edition, since superseded by Jan and Aug 2026 editions; sections not re-checked ?)')],
 'lbnl2024': [('https://climate.mit.edu/sites/default/files/2025-02/lbnl-2024-united-states-data-center-energy-usage-report.pdf', 'https://eta-publications.lbl.gov/publications/2024-lbnl-data-center-energy-usage-report (DOI 10.71468/P1WC7Q)')],
 'liu2011': [('Liu et al. 2011, The Data Furnace', 'Liu et al. 2011, The Data Furnace: Heating Up with Cloud Computing, USENIX HotCloud'), ('https://classpages.cselabs.umn.edu/Fall-2021/csci8980-ec/papers/EdgeArch/furnace.pdf', 'https://www.usenix.org/conference/hotcloud11/data-furnace-heating-cloud-computing')],
 'odef': [('(published 28 Nov 2022; archived)', '(catalogue release date 13 Dec 2024; v2.1 label not confirmed ?)')],
 'pnnl2022': [('PNNL, Energy Storage Grand Challenge Cost and Performance Assessment 2022 (PNNL-33283)', 'PNNL, 2022 Grid Energy Storage Technology Cost and Performance Assessment (PNNL-33283)'), ('https://www.sandia.gov/app/uploads/sites/256/2024/02/ESGC-Cost-Performance-Report-2022-PNNL-33283.pdf', 'https://www.energy.gov/sites/default/files/2022-09/2022%20Grid%20Energy%20Storage%20Technology%20Cost%20and%20Performance%20Assessment.pdf')],
 'skatOverskud': [('https://www.tax.dk/jv-2024-1/ea/E_A_4_6_10_3.htm', 'Den juridiske vejledning, info.skat.dk (tax.dk is a private mirror; wording not re-checked at the primary ?)')],
 'spencerBldg': [('Spencer Building (515 W Hastings, Vancouver) powered-shell sheet', 'Spencer Building powered-shell sheet (no street address on the sheet)'), ('Powered%20Shell%2025770.pdf', 'Powered%20Shell%2025770_0.pdf'), ('https://www.smithandandersen.com/', 'https://smithandandersen.com/')],
 'sscConsolidation': [('https://www.canada.ca/en/shared-services/corporate/data-centre-consolidation.html', 'https://www.canada.ca/en/shared-services/campaigns/stories/closing-door-on-legacy-problems.html')],
 'tt2025': [('Turner & Townsend Canada cost table 2025', 'Turner & Townsend, Canada market intelligence: Q4 2024–2025 (cost data table)')],
 'canvecHydroBC': [('source maps from 1987 on', 'source maps from 1980 on')],
 'isedPrinciples': [('(15 Sep 2026)', '(3 Sep 2026)'), ('waste heat recovery a priority technology', 'waste heat recovery one of several priority practices')],
}
def fix(store):
    n = 0
    for i, reps in U.items():
        if i not in store: continue
        s = store[i]
        for a, b in reps:
            if a in s: s = s.replace(a, b); n += 1
        store[i] = s
    return n
reg = R / 'register/formula_register.json'; r = json.loads(reg.read_text())
n1 = fix(r['new_sources']) + fix(r['old_sources'])
# field visits: not a source for heat temperature
for p in r['quantities']:
    if p.get('name') == 'Heat temperature by cooling type' and 'fieldJB' in p.get('sources', []):
        p['sources'].remove('fieldJB'); p['source_roles'] = [x for x in p.get('source_roles', []) if x.get('id') != 'fieldJB']; n1 += 1
reg.write_text(json.dumps(r, ensure_ascii=False, indent=1))
op = R / 'tool/opps.json'; o = json.loads(op.read_text()); n2 = fix(o['sources']); op.write_text(json.dumps(o, ensure_ascii=False, separators=(',', ':')))
print('register edits', n1, 'opps edits', n2)
