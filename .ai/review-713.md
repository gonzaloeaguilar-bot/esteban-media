Review PR #713 of gonzaloeaguilar-bot/esteban-media (diff in .ai/pr713.diff, branch feat/proof-blocks-money-pages) as the SKEPTIC and TASTE reviewer. Context: renders the existing Google reviews band on three money pages, adds a "Where Esteban has filmed or edited for" line naming only clients/places present in lib/portfolio.ts or lib/case-studies.ts, updates the review count 18->19 from a live GBP read, adds a test.
Check and report, in this exact structure, no prose outside it:
SKEPTIC: ok|fail — one line each: (a) every venue/client named exists in lib/portfolio.ts or lib/case-studies.ts (list each with the line); (b) no aggregateRating or Review JSON-LD added; (c) review count source stated; (d) does the test fail if a venue is not in the sources (read it).
TASTE: ok|fail — one line each: (a) does the proof line read like a sentence a client would believe, not a keyword list; (b) placement under the first answer, not above it; (c) phone-width wrap risk.
DEBT: one line.
FINDINGS: bullet list with file:line, or "none".
