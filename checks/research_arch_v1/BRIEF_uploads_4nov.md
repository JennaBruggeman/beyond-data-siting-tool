# Register pass (4 Nov 2026): new uploads + heights precedents

Rules as BRIEF_v2.md. No code changes. Commit register patches only as in REBUILD1_BRIEF_2026-11-03.md (author, trailer); never push; never commit the uploaded documents.

1. Read and add to the register (patch register/patches/uploads_4nov_2026_11_04.py, ids arch_up3_*), quoting figures with page/clause:
   - /root/.claude/uploads/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/ad65db53-WinterCityDesignGuidelines_draft.pdf (City of Edmonton Winter Design Guidelines, Dec 2016): anything usable for the public edge (heated/sheltered public space, orientation, wind, canopies, seating, lighting, dimensions, plant choice, snow storage).
   - 63802b72-C588.pdf (City Policy C588, Winter City design policy).
   - a1e1ad9e-sec05.pdf (Vancouver Parking By-law s. 5 Off-Street Loading): loading space counts and sizes for industrial / bulk data storage and the catalogue programs; Class A/B/C dimensions; access.
   - /mnt/user-data/uploads/Bylaw20001-.pdf (Edmonton Zoning Bylaw 20001, full): s. 5.80 loading; any storey/height, roof, rooftop mechanical, canopy, weather protection, amenity or public space rule not yet in the register; confirm or correct existing arch_zon_* / edm_* quotes against this full text.
   Write uploads_4nov.md (what | value | source id | where | kind).
2. heights_precedents.md / heights_precedents_sources.json (research done via page summaries): independent check 2 — re-open each source and confirm each quoted figure; mark WRONG / NOT FOUND; write checkV2_result_heights_precedents.json; then add the sources to the register with checks 1 and 2 (patch heights_precedents_2026_11_04.py).
3. Rebuild: for s in make_register_md make_diagram_data make_templates build_diagram; do python3 register/$s.py; done. Run checks/tests/register_wiring.js.
Reply under 150 words: new figures that matter for the public edge, loading and heights; check-2 errors.
