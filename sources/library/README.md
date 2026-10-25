# Source library (index)

One folder per source id (the id used in the register). This repo keeps only the **index**:

- `public/<id>/info.json`: link, date saved, how, pages used, quote, licence, problems.

The saved documents themselves (`full.pdf` or `page.html`, older editions) are kept in the
**private** repo `JennaBruggeman/beyond-data-sources`, same folder layout. The tool links to the
original web page at the page used; the private copy is the record of what the source said.

- `private/`: copyrighted documents (journals, standards, industry reports). Ignored by git; on J.B.'s computer only.
- `_large/`: files over 25 MB. Ignored here; kept in the private repo.
