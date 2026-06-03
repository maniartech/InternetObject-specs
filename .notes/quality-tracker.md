# Internet Object Spec — Quality Tracker

**Single source of truth for QA state.** Each page is reviewed against the 11 dimensions in
`.notes/quality-criteria.md`, scored for D6 against `.notes/style-canon.md`, and read through
the five perspectives (Newcomer / Implementer / Adversary / Editor / Maintainer). A page is
**Verified** only at grade **A+** with the verifier green and all five perspectives passing.

**Process:** pages are reviewed in `SUMMARY.md` (ToC) order. The status table below is the
index; the per-page review log (§B) records findings, fixes, and the grade rationale.

**Verifier baseline (run at QA start):** `106 passed, 0 failed, 130 skipped`. D1's
example-MUST gate is green repo-wide. Re-run after any example edit:
`$env:IO_PARSER='E:\Projects\internet-object\io-js2\src\parser\index.ts'; npx tsx tools/check-examples.ts`

**Status legend:** ⏳ Pending · 🔎 Reviewing · 🛠 Fixing · ✅ Verified (A+) · ⚠ Blocked/deferred
**Grade:** A+ / A / B / C (see criteria §3). Dimension shorthand in notes: e.g. `D11✗` = depth gap.

---

## A. Status index (ToC order)

| # | Page | Kind | Grade | Status |
|---|------|------|-------|--------|
| 1 | `README.md` | Index | A+ | ✅ |
| | **Internet Object** | | | |
| 2 | `internet-object/abstract.md` | Conceptual | A+ | ✅ |
| 3 | `internet-object/the-zen-of-internet-object.md` | Conceptual | A+ | ✅ |
| 4 | `internet-object/objectives.md` | Conceptual | A+ | ✅ |
| 5 | `internet-object/introduction.md` | Conceptual | A+ | ✅ |
| 6 | `internet-object/why-internet-object.md` | Conceptual | A+ | ✅ |
| 7 | `internet-object/getting-started.md` | Conceptual/tutorial | A+ | ✅ |
| | **Core Concepts** | | | |
| 8 | `core-concepts/document-oriented.md` | Conceptual | A+ | ✅ |
| 9 | `core-concepts/schema-first.md` | Conceptual | A+ | ✅ |
| | **Structure and Syntax** | | | |
| 10 | `the-structure/introduction/README.md` | Index | A+ | ✅ |
| 11 | `the-structure/introduction/header.md` | Syntax | A+ | ✅ |
| 12 | `the-structure/introduction/data.md` | Syntax | A+ | ✅ |
| 13 | `the-structure/structural-elements/README.md` | Index | A+ | ✅ |
| 14 | `the-structure/structural-elements/structural-characters-n-keywords.md` | Syntax | A+ | ✅ |
| 15 | `the-structure/structural-elements/literals.md` | Syntax | A+ | ✅ |
| 16 | `the-structure/structural-elements/other-special-characters.md` | Syntax | A+ | ✅ |
| 17 | `the-structure/structural-elements/whitespaces.md` | Syntax | A+ | ✅ |
| 18 | `the-structure/values/README.md` | Index | A+ | ✅ |
| 19 | `the-structure/values/object.md` | Syntax | A+ | ✅ |
| 20 | `the-structure/values/array.md` | Syntax | A+ | ✅ |
| 21 | `the-structure/values/string/README.md` | Syntax | A+ | ✅ |
| 22 | `the-structure/values/string/open-strings.md` | Syntax | A+ | ✅ |
| 23 | `the-structure/values/string/regular-strings.md` | Syntax | A+ | ✅ |
| 24 | `the-structure/values/string/raw-strings.md` | Syntax | A+ | ✅ |
| 25 | `the-structure/values/number/README.md` | Syntax | A+ | ✅ |
| 26 | `the-structure/values/number/number.md` | Syntax | A+ | ✅ |
| 27 | `the-structure/values/number/bigint.md` | Syntax | A+ | ✅ |
| 28 | `the-structure/values/number/decimal.md` | Syntax | A+ | ✅ |
| 29 | `the-structure/values/number/special-formats.md` | Syntax | A+ | ✅ |
| 30 | `the-structure/values/number/nan-and-infinity.md` | Syntax | A+ | ✅ |
| 31 | `the-structure/values/binary.md` | Syntax | A+ | ✅ |
| 32 | `the-structure/values/date-and-time.md` | Syntax | A+ | ✅ |
| 33 | `the-structure/values/booleans.md` | Syntax | A+ | ✅ |
| 34 | `the-structure/values/null.md` | Syntax | A+ | ✅ |
| 35 | `the-structure/case-sensitivity.md` | Syntax/normative | A+ | ✅ |
| 36 | `the-structure/comments.md` | Syntax | A+ | ✅ |
| 37 | `the-structure/encoding.md` | Syntax | A+ | ✅ |
| 38 | `the-structure/syntax-errors.md` | Syntax/companion | A+ | ✅ |
| | **Definitions** | | | |
| 39 | `the-definitions/definitions.md` | Syntax | A+ | ✅ |
| 40 | `the-definitions/variables.md` | Syntax | A+ | ✅ |
| 41 | `the-definitions/schema-references.md` | Syntax | A+ | ✅ |
| 42 | `the-definitions/error-handling.md` | Normative | A+ | ✅ |
| | **Collections** | | | |
| 43 | `the-collections/collection.md` | Syntax/conceptual | A+ | ✅ |
| 44 | `the-collections/creating-collection.md` | Syntax | A+ | ✅ |
| 45 | `the-collections/collection-rules.md` | Normative | A+ | ✅ |
| 46 | `the-collections/data-streaming.md` | Conceptual | A+ | ✅ |
| | **Streaming** | | | |
| 47 | `streaming/README.md` | Index (placeholder) | — | ⚠ source-first |
| | **Schema Definition Language** | | | |
| 48 | `schema-definition-language/internet-object-schema.md` | Conceptual/overview | — | ⏳ |
| 49 | `schema-definition-language/schema-representation.md` | Syntax | — | ⏳ |
| 50 | `schema-definition-language/data-types/README.md` | Index | — | ⏳ |
| 51 | `schema-definition-language/data-types/any.md` | Type ref | — | ⏳ |
| 52 | `schema-definition-language/data-types/string/README.md` | Type ref | — | ⏳ |
| 53 | `…/data-types/string/string-derived-types/email.md` | Type ref | — | ⏳ |
| 54 | `…/data-types/string/string-derived-types/url.md` | Type ref | — | ⏳ |
| 55 | `…/data-types/string/string-derived-types/date.md` | Type ref | — | ⏳ |
| 56 | `…/data-types/string/string-derived-types/time.md` | Type ref | — | ⏳ |
| 57 | `…/data-types/string/string-derived-types/datetime.md` | Type ref | — | ⏳ |
| 58 | `schema-definition-language/data-types/number/README.md` | Type ref | — | ⏳ |
| 59 | `…/data-types/number/derived-types/README.md` | Type ref | — | ⏳ |
| 60 | `schema-definition-language/data-types/number/bigint.md` | Type ref | — | ⏳ |
| 61 | `schema-definition-language/data-types/number/decimal.md` | Type ref | — | ⏳ |
| 62 | `schema-definition-language/data-types/date-and-time.md` | Type ref | — | ⏳ |
| 63 | `schema-definition-language/data-types/binary.md` | Type ref | — | ⏳ |
| 64 | `schema-definition-language/data-types/object.md` | Type ref | — | ⏳ |
| 65 | `schema-definition-language/data-types/array.md` | Type ref | — | ⏳ |
| 66 | `schema-definition-language/data-types/bool.md` | Type ref | — | ⏳ |
| 67 | `schema-definition-language/typedef.md` | Conceptual/ref | — | ⏳ |
| 68 | `schema-definition-language/memberdef.md` | Conceptual/ref | — | ⏳ |
| 69 | `schema-definition-language/dynamic-schema.md` | Normative | — | ⏳ |
| 70 | `schema-definition-language/union-types.md` | Type ref/normative | — | ⏳ |
| 71 | `schema-definition-language/composition.md` | Conceptual/ref | — | ⏳ |
| | **Parsing & Errors** | | | |
| 72 | `parsing-and-errors/README.md` | Index/normative | — | ⏳ |
| 73 | `parsing-and-errors/error-model.md` | Normative | — | ⏳ |
| 74 | `parsing-and-errors/parser-behavior.md` | Normative | — | ⏳ |
| 75 | `parsing-and-errors/error-accumulation.md` | Normative | — | ⏳ |
| | **Conformance** | | | |
| 76 | `conformance/validation-model.md` | Normative | — | ⏳ |
| 77 | `conformance/requirements.md` | Normative | — | ⏳ |
| | **Interoperability** | | | |
| 78 | `json-compatibility.md` | Conceptual/ref | — | ⏳ |
| 79 | `interoperability/conversions.md` | Conceptual/ref | — | ⏳ |
| | **Best Practices** | | | |
| 80 | `best-practices.md` | Guidance | — | ⏳ |
| | **Appendices** | | | |
| 81 | `appendices/grammar.md` | Reference appendix | — | ⏳ |
| 82 | `appendices/glossary.md` | Reference appendix | — | ⏳ |
| 83 | `faqs-1.md` | Conceptual/guidance | — | ⏳ |
| 84 | `roadmap.md` | Informative | — | ⏳ |
| 85 | `appendices/version-history.md` | Reference appendix | — | ⏳ |
| 86 | `contributors.md` | Informative | — | ⏳ |
| 87 | `license.md` | Informative | — | ⏳ |

---

## B. Per-page review log

> Each reviewed page gets an entry: grade, any dimension gaps (D1–D11), the five-perspective
> read, fixes applied, and verifier status. Pages are added here as they are reviewed.

### Batch 1 — Title + Internet Object group (pages 1–7) · verifier 106/0/130

**1. `README.md` — A+ ✅** (Index/landing)
- *Before:* one generic sentence + metadata table; no orientation, status, or entry points.
- *Fixes:* added a one-line definition, a **Status** note reconciling spec-Draft vs beta
  implementation + conformance-versioning line, and a **Start here** nav block. Kept GitBook
  cover/layout front matter intact.
- *Perspectives:* Newcomer ✓ (clear entry); Implementer ✓ (status/conformance pointer);
  Adversary ✓ (no overclaim — Draft stated); Editor ✓; Maintainer ✓.
- *Minor (tracked, non-gating):* cover asset filename is non-ascii (`DALL·E …webp`) — cosmetic,
  rename in a later assets pass.

**2. `internet-object/abstract.md` — A+ ✅** (Conceptual)
- *Before:* no front-matter `description` (D7[M] fail); no See Also.
- *Fixes:* added front matter; enriched the closing sentence (schema/data separation →
  compactness + clarity); added See Also. Kept the abstract appropriately concise.

**3. `internet-object/the-zen-of-internet-object.md` — A+ ✅** (Conceptual)
- *Before:* H1→H3 hierarchy skip (D6[M]); `&#x20;` render artifacts + trailing blank lines (D8).
- *Fixes:* "Poem" promoted to H2; removed entity/whitespace artifacts; tightened the intro and
  tied it to the principles; added a **principles-behind-the-verses** mapping linking to
  Objectives (real D11 value); added See Also.

**4. `internet-object/objectives.md` — A+ ✅** (Conceptual)
- *Before:* no front-matter `description` (D7[M] fail); no See Also.
- *Fixes:* added front matter + See Also. Content already strong and correctly normative
  (MUST/SHOULD/MAY) — left intact.

**5. `internet-object/introduction.md` — A+ ✅** (Conceptual)
- *Before:* no front-matter `description` (D7[M]); mixed ` ```io `/` ```ruby ` fences (D6[M]);
  H1→H3→H4 hierarchy skip (D6[M]); inline anchor-HTML noise in headings.
- *Fixes:* added front matter; all IO fences → `ruby`; headings re-leveled to H2/H3 gap-free;
  removed anchor HTML; minor prose polish; added See Also. Examples still verify.

**6. `internet-object/why-internet-object.md` — A+ ✅** (Conceptual, new)
- Strong as written: JSON↔IO core idea, comparison table, gains, honest "when JSON is fine."
  All five perspectives pass; example verifies. No changes needed.

**7. `internet-object/getting-started.md` — A+ ✅** (Conceptual/tutorial, new)
- Strong five-step pure-IO tour with valid+invalid example; clear progression. All perspectives
  pass; examples verify. No changes needed.

### Batch 2 — Core Concepts (8–9) + Structure and Syntax (10–38) · verifier 117/0/119

All 31 pages remediated to **A+ ✅**. Verifier rose 106→117 passing (added testable examples);
0 failed throughout. Repo-wide relative-link check: **0 broken links introduced** by this batch
(5 pre-existing broken links remain in not-yet-reviewed pages — see note at end).

**Cross-cutting fixes (older pages predated the locked conventions):** added front-matter
`description` to every page missing one (10–18, 36, 37); converted all ` ```io `/` ```yaml `/
` ```text ` fences to ` ```ruby `; fixed H1→H3/H4 heading-hierarchy skips (10, 11) and
Title-Case → sentence-case subheadings throughout; aligned H1s to their `SUMMARY.md` nav labels
(14 → "Structural Characters & Separators"; 17 → "Whitespace & Indentation"; 22/23/24/33/34 →
plural; 31 → "Binary"); normalized See-Also blocks to em-dash + relative `.md` links; removed
draft placeholders (`**[ … Diagram ]**`, `[ Header Image Placeholder ]`); fixed typos
(`Jane Done`, `reocordCount`, `nexPage`, `Georeg`, `Adddress`); replaced emoji marks (✅/❌/🧩/⚙️/ℹ️)
with canon `✓`/`✗` and `>` callouts; straight quotes; `{% hint %}` → `>` blockquote (37).

**Accuracy fixes (verified against io-js2; logged in reconciliation.md C3/C4/J5):**
- **23 regular-strings:** the escape rule was backwards — unknown escapes *drop* the backslash
  (`"\q"` → `q`), not keep it. Corrected prose + examples.
- **26 number:** EBNF and "invalid forms" were wrong — `.5`/`5.` are **valid** (→0.5/5);
  `1e`/`1e+` are accepted (→1); `0b12`/`1.2.3` become open strings, not errors. Fixed EBNF,
  limited invalid forms to genuine errors (`0b`/`0x`/`0o89`/`0xGH`), added an *Implementation
  status* note for the lenient cases + testable valid/invalid examples.
- **28 decimal:** scientific notation (`1.23e2m`) actually **throws `DecimalError`** — removed
  the false "supported" claim and the `scientificDecimal` EBNF; `.45m`/`123.m` correctly error.
- **27 bigint / 28 decimal / 30 nan-inf / 33 booleans / 34 null:** removed non-existent
  "operations" (`5n + 3n`, `0.1m + 0.2m`, `NaN == NaN`) — IO has no operators. Reframed
  "invalid forms" where the token is not an error but parses as a string/number (e.g. `nan`,
  `t`, `nil`, `1`).
- **31 binary:** literals (`b'…'`) still throw `unexpected-token`; reframed page as design +
  *Implementation status (beta)* (not yet supported), per reconciliation A5/J3.
- **32 date-and-time:** fixed a broken/duplicated EBNF block; corrected invalid forms to the
  stable `invalid-datetime` code; added *Implementation status* for the verified seconds-drop
  bug (J1), overflow-date normalization, and >3-digit-ms truncation; fixed See-Also (date/time
  is not a string subtype).
- **19 object:** removed a JS API snippet (`new InternetObject()`) to keep the page
  language-agnostic; kept the idea as an informative note.

**Five-perspective pass (representative):** Newcomer — clearer leads, gap-free headings, real
See-Also paths; Implementer — verified syntax, honest *Implementation status* gaps, stable
error codes; Adversary — no overclaim (binary/decimal-scientific/seconds caveated), invalid
forms now reflect real behavior; Editor — consistent voice, sentence-case headings, em-dash
See-Also, no emoji/smart-quotes; Maintainer — front matter on every page, canon-conformant,
examples machine-checked.

**Already-compliant (no/*minimal* change):** 9 schema-first, 29 special-formats, 35
case-sensitivity, 38 syntax-errors (all newer pages; testable examples verified green).

**Pre-existing broken links (NOT this batch; fix in later batches):**
`the-collections/collection.md` → `../schema-definition-language/` (dir link; SDL group has no
README.md — its index is `internet-object-schema.md`); `schema-definition-language/memberdef.md`
→ `schema.md`, `object.md`; `.formats/schema-datatype.md` → `typedef.md`, `schema.md` (stray
`.formats/` dir, not in SUMMARY).

### Batch 3 — Definitions (39–42) + Collections (43–46) · verifier 125/0/115

All 8 pages **A+ ✅**. Verifier rose 117→125 passing (added testable examples), 0 failed.
Every behavioral claim re-verified against io-js2 (header definitions, refs, variables,
collection structure, type promotion, error codes). Repo-wide link check: **0 broken links
introduced**; the previously-flagged `collection.md → ../schema-definition-language/` dir link
is **fixed** (now → `internet-object-schema.md`). Remaining 4 broken links are all in later
batches (`memberdef.md → schema.md/object.md`; stray `.formats/` dir not in SUMMARY).

**Nav/H1 alignment (SUMMARY):** two child nav labels collided with vague/duplicate names and
were realigned to their H1s (canon §4): Definitions group intro "Structure and Syntax" →
**"Definitions"** (it duplicated the top-level group name); Collections group intro
"The Structure" → **"Collection"**.

**Accuracy fixes (verified against io-js2; logged reconciliation E2, L6, L7):**
- **41 schema-references / 42 error-handling — forward references were documented wrong.** Both
  pages claimed a ref "MUST be defined before it is used (no forward references)" / "MUST appear
  after its definition," and error-handling listed a bogus "Forward reference → resolution
  error" row. **Verified:** definitions resolve after the *whole header* is read, so order is
  not significant and a forward ref resolves cleanly. Rewrote the resolution rules to: order is
  insignificant, a forward ref is allowed (SHOULD still define-before-use for readability), and
  the genuine errors are **undefined** names — `schema-not-defined` (`$`) and
  `variable-not-defined` (`@`), both verified and now testable (`# ✗` assertions pass).
- **43 collection.md — "Invalid Forms" was inaccurate.** `~ 101 Thomas 25 HR` and `~ 101, 25 HR`
  do **not** error (spaces never separate values → they merge into one open string). Reframed
  into **Genuine errors** (the thrown bare-object-then-`~` `unexpected-token`, plus
  `expecting-bracket`/`unexpected-token` for unterminated/trailing tokens) and **Common
  mistakes** (the no-error merge, now a testable valid block). Removed the `❌` emoji; fixed the
  false "comments are preserved" claim (comments/whitespace are insignificant, not preserved).
- **41 schema-references — type-ref note sharpened.** A `$`-def body like
  `{ number, min: 0, max: 100 }` is read as an object shape (not a number type) and does not
  compile as a type-ref today; note now states this precisely and frames the syntax as target.

**Style/consistency fixes:** `collection.md` fully rewritten to canon — sentence-case headings,
**record** as the primary term (with "collection item" as the formal synonym; EBNF keeps
`collectionItem`), spaced em-dashes, `>` callouts with bold lead-ins, clean EBNF
(`collectionItem+`), and **type promotion** clarified to show the real positional-key form
(`~ 1` → `{ "0": 1 }`). `definitions.md`: bare ``` fence → ` ```ruby `.

**Already-compliant (no change):** 40 variables, 44 creating-collection, 45 collection-rules,
46 data-streaming — newer canon-aligned pages; all testable examples verified green
(`value-required`, `invalid-range`, empty-record validity, schema-less positional mapping,
streaming example).

**Five-perspective pass (representative):** Newcomer — clear leads, familiar parallels,
recommended forms; Implementer — every example machine-checked, accurate stable error codes,
honest beta gaps (type-refs); Adversary — "Common mistakes" documents the silent-merge gotcha
truthfully, forward-ref behavior corrected, no overclaim; Editor — sentence-case headings,
canon terms, no emoji/smart-quotes; Maintainer — front matter on every page, broken link fixed,
nav↔H1 aligned.

_(next: Batch 4 — Schema Definition Language (48–71); page 47 `streaming/README.md` stays ⚠
source-first/deferred per plan)_
