"""Overnight 30 Oct 2026 (c): data-centre grid-flexibility precedents (J.B.: 'Yes' to adding them). All CHECK 1 only (Claude, 30 Oct 2026); check 2 open.
Mostly operator or vendor statements: labelled as claims."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
D = '30 Oct 2026'
NEW = {
 'googleFlex2025': "OPERATOR CLAIM: Google blog, 'How we're making data centers more flexible to benefit power grids' (M. Terrell, 4 Aug 2025): first data-centre demand response shifted non-urgent compute (e.g. processing a YouTube video) during grid stress with Centrica Energy and Elia (Belgium) and Taiwan Power Company; reduced ML workload demand in three grid events for Omaha Public Power District 'last year'; new agreements with Indiana Michigan Power (Fort Wayne) and TVA; no MW or hours given; flexibility 'early' and only at some locations; Search, Maps and some Cloud customers limit it — https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/how-were-making-data-centers-more-flexible-to-benefit-power-grids/",
 'emeraldPhoenix2025': "Colangelo, Coskun et al. (Emerald AI, NVIDIA, Salt River Project, EPRI), 'Turning AI Data Centers into Grid-Interactive Assets: Results from a Field Demonstration in Phoenix, Arizona', arXiv 2507.00909v1 (1 Jul 2025; company-authored preprint): Oracle Phoenix region, 256 NVIDIA A100 GPUs; '25% reduction in cluster power usage for three hours during peak grid events' on 1 May (APS peak) and 3 May 2025 (SRP peak), 15-minute ramps; zero SLA violations reported; only batch training, fine-tuning and some inference slowed or paused, real-time serving untouched; one cluster, no MW given; frequency regulation not tested — https://arxiv.org/html/2507.00909v1",
 'epriDCFlexEU': "EPRI Europe press release 'DCFlex: Momentum Builds Across Europe' (undated page ?): UK's first live DCFlex demonstration with National Grid, Nebius, Kraken, Emerald AI and NVIDIA cut load 'up to 30–40% within seconds' 'without disrupting critical workloads'; ESB joined; no site, date or MW given (?) — https://europe.epri.com/press-releases/dcflex-momentum-builds-across-europe",
 'eatonBasefarm2018': "VENDOR CLAIM: Eaton news release 7 Nov 2018, UPS-as-a-Reserve pilot: Basefarm (Norwegian data-centre company), project led by Statnett with Fortum, completed Q3 2018; 'the UPSs were now capable of providing 1.5 MW of capacity' for Fast Frequency Response; UPSs can reduce the data centre's demand 'and even return power to the grid' — https://www.eaton.com/kr/ko-kr/company/news-insights/news-releases/2018/UPSasR-pilot-Norway.html",
 'fortumTelia2022': "OPERATOR CLAIM: Fortum release 18 Jan 2022, Fortum and Telia agreement: Telia's Helsinki Data Center UPS systems (ABB) take part in grid balancing; the data centre 'has contributed several megawatts of capacity to Fingrid's Fast Frequency Reserve (FFR) market as part of the Fortum Spring's virtual battery'; batteries still carry the load until generators start in an outage — https://www.fortum.com/media/2022/01/fortum-and-telia-agree-new-data-center-connection-electricity-market",
 'txSB6_2025': "Texas S.B. 6 (89th Legislature), Senate Research Center bill analysis, enrolled version (5 Aug 2025): PUC to set a large-load threshold of 75 MW (s. 37.0561(c)); large loads disclose on-site backup generation, and ERCOT may direct them to 'deploy the customer's on-site backup generating facilities or curtail load' (s. 37.0561(e)); transmission-voltage loads must have curtailment capability before interconnection, and ERCOT must 'competitively procure demand reductions from large load customers with a demand of at least 75 megawatts' (s. 39.170) — read from the analysis, not the enrolled bill text (?) — https://capitol.texas.gov/tlodocs/89R/analysis/html/SB00006F.htm",
 'cruLEU2025': "Commission for Regulation of Utilities (Ireland), news 'New Electricity Connection Policy for Data Centres' (18 Feb 2025; PROPOSED decision, comments to 4 Apr 2025): new data centres 'will be required to provide generation and/or storage capacity to match the requested data centre demand capacity', on site or nearby, taking part in the electricity market; annual reporting on renewable use and emissions; whether and how it was finalised: not read (?) — https://www.cru.ie/about-us/news/new-electricity-connection-policy-for-data-centre/",
}
KIND = {'googleFlex2025': 'operator claim', 'emeraldPhoenix2025': 'preprint (company-authored)', 'epriDCFlexEU': 'research institute (press release)', 'eatonBasefarm2018': 'vendor claim', 'fortumTelia2022': 'operator claim', 'txSB6_2025': 'rule (legislative analysis)', 'cruLEU2025': 'regulator (proposed decision)'}
WHERE = {'googleFlex2025': 'Google blog page', 'emeraldPhoenix2025': 'arXiv HTML', 'epriDCFlexEU': 'EPRI Europe page', 'eatonBasefarm2018': 'Eaton release page', 'fortumTelia2022': 'Fortum release page', 'txSB6_2025': 'Texas Legislature bill analysis page', 'cruLEU2025': 'CRU news page'}
ADD = ("; precedents (check 1, 30 Oct 2026 — mostly operator or vendor claims): workloads — Google shifted non-urgent compute in Belgium and Taiwan and cut ML load in 3 OPPD events, no MW given (googleFlex2025); "
       "Oracle Phoenix, 256 GPUs cut 25% for 3 h at two May 2025 peaks with zero SLA violations, flexible jobs only (emeraldPhoenix2025); UK DCFlex demo up to 30–40% within seconds, no site or MW (epriDCFlexEU); "
       "UPS batteries — Basefarm, Norway, 1.5 MW fast frequency response with Statnett, 2018 (eatonBasefarm2018); Telia Helsinki, several MW in Fingrid's FFR market, 2022 (fortumTelia2022); "
       "rules — Texas S.B. 6: loads of 75 MW and up must be curtailable and may be ordered onto their backup generators (txSB6_2025); Ireland proposed that new data centres bring generation or storage to match their demand (cruLEU2025, proposed). "
       "For a colocation building the UPS route is the one the operator controls (workload_control)")
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; d = json.loads(p.read_text())
    (d['new_sources'] if pretty else d['sources']).update(NEW)
    if pretty:
        m = d['meta']; m['source_kinds'].update(KIND); m['source_check'].update({k: 'claude' for k in NEW})
        for k in NEW:
            m['check_log'].setdefault(k, [])
            if not any(c.get('date') == D for c in m['check_log'][k]): m['check_log'][k].append({'check': 1, 'by': 'Claude', 'date': D, 'where': WHERE[k], 'what': 'figures quoted in the source entry'})
        x = next(q for q in d['quantities'] if q['id'] == 'flexible_load')
        if 'emeraldPhoenix2025' not in x['coef']: x['coef'] += ADD
        for k in NEW:
            if k not in x['sources']: x['sources'].append(k)
            if not any(r['id'] == k for r in x.setdefault('source_roles', [])): x['source_roles'].append({'id': k, 'term': 'precedent', 'role': 'check', 'conf': 50 if 'claim' in KIND[k] else 70, 'verified': True})
        ol = m['opportunity_labels']['Reserved capacity and batteries to the grid']
        if 'Basefarm' not in ol['basis']:
            ol['basis'] += " Added 30 Oct 2026 (check 1): UPS batteries in fast frequency markets — Basefarm, Norway, 1.5 MW (2018, vendor claim) and Telia Helsinki, several MW (2022, operator claim); workload cuts — Google in Belgium, Taiwan and Omaha (operator claim) and Oracle Phoenix, 25% for 3 h on 256 GPUs (company preprint); rules — Texas S.B. 6 (75 MW+), Ireland proposed decision 2025."
            ol['sources'] += [k for k in ('eatonBasefarm2018', 'fortumTelia2022', 'googleFlex2025', 'emeraldPhoenix2025', 'txSB6_2025', 'cruLEU2025') if k not in ol['sources']]
    else:
        d['source_kinds'].update(KIND); d['source_check'].update({k: 'claude' for k in NEW})
        q = d['quantities'].get('flexible_load')
        if q and 'emeraldPhoenix2025' not in q['coef']:
            q['coef'] += ADD; q['sources'] += [k for k in NEW if k not in q['sources']]
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, 'ok')
reg = json.loads((R / 'register/formula_register.json').read_text())['meta']['opportunity_labels']
p = R / 'tool/opps.json'; d = json.loads(p.read_text()); k = 'Reserved capacity and batteries to the grid'; d['opportunities'][k] = reg[k]
p.write_text(json.dumps(d, ensure_ascii=False, separators=(',', ':'))); print('synced')
