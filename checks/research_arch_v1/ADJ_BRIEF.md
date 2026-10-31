# Adjacency research brief (31 Oct 2026)

J.B.'s concern: "just because a table doesn't specify something doesn't mean it's not a rule elsewhere". Goal: find EVERY rule that constrains how the tool's programs may sit next to, above, below or near a data centre (and each other), so nothing is missed.

Programs: data centre (data hall, UPS/battery rooms, electrical rooms, transformer vault or pad, standby generators and fuel, chillers or dry coolers, loading dock); refuge / community room (warming, cooling, clean-air room); public ground floor (library, café, studios, maker space); pool; laundry (laundromat, institutional); greenhouse; roof and facade solar; housing (tested case); childcare (as a sensitive use).

Full code texts are in the repo, searchable: data/raw/codes/nbc.txt (NBC 2020), bcbc2024.txt (BCBC 2024), vbbl2025_v1.txt (Vancouver Building By-law 2025, Book I), nbc_ab2023.txt (NBC Alberta Edition 2023), nfc.txt (NFC 2020), nfc_ab2023.txt (NFC Alberta 2023); PDFs beside them. Search them systematically (grep for each occupancy group, each room type, "fire separation", "separated from", "shall not be located", "above", "below", "adjacent", "exit", "egress through"). Read the Appendix A notes too. Compare NBC, BCBC, VBBL and NBC(AE): note where Vancouver or Alberta differ.

Rules: quote the clause text exactly with its number; say which code(s) it's in. Never invent; "?" if unsure; label your own reading "our reading". Paywalled standards (CSA, NFPA, ASHRAE, FM Global): don't circumvent; append a row to checks/paywalled_standards.md with why the tool needs it. Canadian spelling. Edit nothing else.

Output: checks/research_arch_v1/adj_<topic>.md with (a) a table: rule | applies to (program pair or room) | requirement (hours, distance, prohibition, condition) | clause | codes it's in (NBC/BCBC/VBBL/AB) | differences; (b) a list of things searched for and NOT found (so absence is recorded, not assumed); (c) open questions.
