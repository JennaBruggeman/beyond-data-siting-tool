"""cwec, 28 Oct 2026: ECCC folder listing read in the built-in browser: CWEC_FMCCE/ holds CWEC_FMCCE_v_2016/ and CWEC_FMCCE_v_2020/;
v_2020 has the by-province .epw zip (29 Dec 2022) and docs incl. CWEEDS_2020_stns_all_REV_20210324.xlsx. The EPW header comment
says 'Custom DEF format for CWEC2011 formatted files', so 'CWEC2011' there is the file format, not the edition."""
import pathlib
R = pathlib.Path(__file__).resolve().parents[2]
A = "(collaboration.cmc.ec.gc.ca/cmc/climate/Engineer_Climate/CWEC_FMCCE/; 2020 edition ? — file headers read 'CWEC2011' format, source months 2000–2017)"
B = "(collaboration.cmc.ec.gc.ca/cmc/climate/Engineer_Climate/CWEC_FMCCE/CWEC_FMCCE_v_2020/, posted Dec 2022, built on CWEEDS 2020; the header's 'CWEC2011' is the file-format label; source months 2000–2017)"
for f in ('register/formula_register.json', 'tool/opps.json'):
    p = R / f; s = p.read_text(); print(f, s.count(A)); p.write_text(s.replace(A, B))
