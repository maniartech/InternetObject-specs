# ToC Finalization — Internet Object Spec

**Status: DRAFT for discussion. Nothing approved yet.**
Working doc (unpublished). Supersedes `.notes/proposed-toc-and-redirects.md` with full
per-page reasoning. Builds on the author's `.notes/toc.yaml` + the agreed A+ direction
(language-agnostic, normative, GitBook-safe). Decisions reference `.notes/reconciliation.md`.

---

## 0. How to read this doc

For every chapter/page you get a row with:
- **Status** — `keep` (file stays, content edited) · `relabel` (nav title changes, file/URL
  unchanged) · `new` (create file) · `rename` (file path changes → needs redirect) ·
  `defer` (not in v1).
- **Current state** — honest assessment (good / thin / placeholder / drifted-vs-code / has
  draft artifacts / to-audit).
- **Purpose & coverage** — what the page is *for* and must contain.
- **Notes / decisions** — placement reasoning + linked reconciliation items.

Legend in nav: `## Group` = section header (not a page, no URL).

---

## 1. ToC-level decisions — ✅ LOCKED

**All recommendations accepted, with one override: T3 = rename messy files now (with
redirects). T4 = adopt "SchemaDef".** Outcomes:
T1 Core Concepts = **yes** · T2 Conformance group = **yes** · T3 file moves = **RENAME NOW
(+redirects)** · T4 SchemaDef = **yes** · T5 binary rename = **yes (label + file)** ·
T6 Security/Perf/Tools/Refs = **defer** · T7 Getting Started under Internet Object = **yes** ·
T8 Booleans+Nulls separate = **yes** · T9 value+schema BigInt/Decimal both = **yes** ·
T10 Parsing & Errors group (writeable) = **yes** · T11 Streaming placeholder = **yes**.

| # | Decision | Options | Recommendation |
|---|---|---|---|
| T1 | **Core Concepts** group | (a) include now · (b) defer; fold essentials into Intro | (a) include — short, high-value for "why/how" |
| T2 | **Conformance** group | (a) own group now · (b) single page under SDL · (c) defer | (a) own group — central to "A+ normative spec" |
| T3 | **File moves in v1** | (a) none (URL-safe) · (b) also rename messy files (+redirects) | (a) none for v1 |
| T4 | **"Object Schema" → "SchemaDef"** rename of concept/terminology | (a) adopt SchemaDef · (b) keep "Object Schema" | (a) adopt — symmetry with TypeDef/MemberDef (F5) |
| T5 | **Binary page naming** | (a) rename base64→binary (value + schema) · (b) keep base64 | (a) rename — binary is the type, base64 the encoding (A5) |
| T6 | **Deferred groups** (Security, Performance, Tools, References) | (a) defer to later pass · (b) add stubs now | (a) defer — add as `## Groups` later, no URL impact |
| T7 | **Getting Started** placement | (a) under "Internet Object" · (b) top-level group | (a) under Internet Object |
| T8 | **Booleans + Nulls** | (a) two pages (keep) · (b) merge into one | (a) keep two — both already exist & are solid |
| T9 | **Value BigInt/Decimal vs Schema BigInt/Decimal** | duplicate pages (value-section + schema-section) — keep both? | yes — value = literal syntax; schema = TypeDef/constraints |
| T10 | **Parsing & Errors** group — error handling is **mature → writeable now** | (a) new group (home for error/parsing), error-model lives here · (b) keep scattered | (a). Source from io-js2 + playground error-recovery docs |
| T11 | **Streaming** group — **source-first, under development** | (a) single placeholder page (no normative spec yet) · (b) full stub set | (a) single placeholder; expand once impl stabilizes |

---

## 2. GitBook constraints (recap — must hold)

- URLs derive from **file path**, not nav label/position → reorder/relabel is **URL-safe**.
- v1 = **no file moves** → **zero redirects** needed. `.gitbook.yaml` still added (config +
  future redirects home).
- Every published page must be in `SUMMARY.md`; group intros use a folder `README.md`.
- Keep front matter, `{% hint %}`, `{% tabs %}`; images self-hosted in `.gitbook/assets`;
  markdownlint-clean.

---

## 2a. Authoring conventions (LOCKED)

- **Code fences:** use ` ```ruby ` for IO snippets for now (no `io` highlighter yet).
  Global swap ruby→io later when ready. (Decided.)
- **Callouts:** use `>` **blockquotes** now (portable, markdownlint-clean; style via CSS
  later). Convert to GitBook `{% hint %}` later *if* staying on GitBook / custom framework
  supports it. (Decided.)
- **Type-page template — two variants** (sample pages: `data-types/number/README.md` scalar,
  `data-types/array.md` complex):
  - **Shared spine:** intro → *type-specific section* → **TypeDef** table (from `XxxDef.schema`)
    → options-in-detail (one IO example each) → Examples (from playground) → See Also.
  - **Scalar types** (number, string, datetime, bigint, decimal, binary, bool): type-specific
    section = **family/shortcuts table** (shortcut = base + preset constraints) when applicable.
  - **Complex/container types** (array, object, any): type-specific section = **declaring
    contents** (element type via `[…]`/`of:`; object shape/SchemaDef; `anyOf` for any),
    plus nesting where relevant. No numeric "family table."

## 2b. Maturity & approach (which pages we write now vs reserve)

Per-area maturity decides whether the spec leads or follows:
- **Spec-able now (mature):** core syntax, values, schema/types, definitions/refs, collections,
  **error handling** (accumulation model done; document syntax-error recovery honestly as
  in-progress). Learn from `io-js2` + playground (`ERROR_RECOVERY_*`).
- **Source-first (under development):** **streaming** — implementation leads; keep a single
  placeholder page, no normative text yet. Expand once `src/streaming/` stabilizes.
- Reference sources: `io-js2/src/*` (impl), `io-playground/` (UX, error-recovery demos,
  SECURITY-AUDIT). Playground also a future "Tools & Ecosystem" entry (deferred group).

## 3. Per-page plan

### Title page
| Page | Status | Current state | Purpose & coverage | Notes / decisions |
|---|---|---|---|---|
| `README.md` | keep | Good (cover, metadata) | Landing page; version/status | Add version note: spec "1.0 Draft"; libraries versioned separately + conformance line (D1) |

### Group: Internet Object
| Page | Status | Current state | Purpose & coverage | Notes / decisions |
|---|---|---|---|---|
| `internet-object/abstract.md` | keep | Good | One-paragraph definition | — |
| `internet-object/the-zen-of-internet-object.md` | keep | Good | Poetic principles | — |
| `internet-object/objectives.md` | keep | Good | 8 design goals | — |
| `internet-object/introduction.md` | keep | Good | Guided walkthrough vs JSON | — |
| `internet-object/why-internet-object.md` | **new** | — | Honest comparison vs JSON/CSV/YAML/Protobuf: size, schema-first, comments, collections/streaming, precise numerics. The "why switch" case. | Author-requested. T1-adjacent |
| `internet-object/getting-started.md` | **new** | — | Language-agnostic 5-min tour in pure IO: doc → header+schema → collection → validation outcome. No library APIs. | T7 |

### Group: Core Concepts  *(T1)*
| Page | Status | Current state | Purpose & coverage | Notes / decisions |
|---|---|---|---|---|
| `core-concepts/document-oriented.md` | **new** | — | Header/data separation; documents vs records; why document-oriented | From toc.yaml. Defer-able (T1) |
| `core-concepts/schema-first.md` | **new** | — | Schema-first philosophy; progressive typing (untyped→typed→constrained) | From toc.yaml |

### Group: Structure and Syntax  *(was "The Structure")*
| Page | Status | Current state | Purpose & coverage | Notes / decisions |
|---|---|---|---|---|
| `the-structure/introduction/README.md` | keep | Good | Document structure overview | Group intro |
| `…/introduction/header.md` | keep | Good | Header role | — |
| `…/introduction/data.md` | keep | Good | Data sections, `---`, named sections | Expand named-section grammar later |
| `the-structure/structural-elements/README.md` | keep | Good | Overview | — |
| `…/structural-characters-n-keywords.md` | relabel | Good | Core syntax chars | Nav: "Structural Characters & Separators" |
| `…/literals.md` | keep | To-audit | Constant literals (T/F, null, NaN, Inf) | Verify vs code tokens |
| `…/other-special-characters.md` | keep | Good | `@ $ ? * + -` semantics | Make `?`/`*` framing normative (B1) |
| `…/whitespaces.md` | relabel | Good | Whitespace/BOM | Nav: "Whitespace & Indentation" |
| `the-structure/values/README.md` | keep | Good | Value types overview | Add binary to taxonomy |
| `…/values/object.md` | keep | Good | Object value syntax | — |
| `…/values/array.md` | keep | Good (value-level) | Array value syntax | — |
| `…/values/string/README.md` + open/regular/raw | keep | Good | Three string forms | Verify raw uses `r'...'` not `@"..."` (C2) |
| `…/values/number/README.md` | keep | Good | Numeric overview (Number/BigInt/Decimal) | — |
| `…/values/number/number.md` | keep | To-audit | Standard number; bases | Verify octal `0o` not `0c` (C1) |
| `…/values/number/bigint.md` | keep | To-audit | BigInt literal `n` | — |
| `…/values/number/decimal.md` | keep | To-audit | Decimal literal `m` | — |
| `…/values/number/special-formats.md` | **new** | — | Hex/octal/binary/scientific literal forms in one place | From toc.yaml |
| `…/values/number/nan-and-infinity.md` | keep | Good | NaN/Inf | — |
| `…/values/base64.md` | relabel (rename later) | To-audit | **Binary** value (`b'…'`) | Nav: "Binary". Rename file→binary.md only if T3=b / T5 |
| `…/values/date-and-time.md` | keep | Good | date/time/datetime literals | — |
| `…/values/booleans.md` | keep | Good | T/F, true/false | T8 |
| `…/values/null.md` | keep | Good | N/null | T8 |
| `the-structure/case-sensitivity.md` | **new** | — | Case rules for keys/keywords/types | From toc.yaml |
| `the-structure/comments.md` | keep | Good | `#` comments | — |
| `the-structure/encoding.md` | keep | Good | UTF-8/Unicode/BOM | — |
| `the-structure/syntax-errors.md` | **new** | — | Common syntax errors + parser behavior (non-normative companion to Conformance error model) | From toc.yaml |

### Group: Definitions  *(was "The Definitions")*
| Page | Status | Current state | Purpose & coverage | Notes / decisions |
|---|---|---|---|---|
| `the-definitions/definitions.md` | relabel | Good | Header definitions: `~ key: value`, `@` vars, `$` refs, metadata | Nav: "Structure and Syntax". Introduce **ref** = `$`-def (type-ref or schema-ref) |
| `the-definitions/variables.md` | keep | Good | `@` value variables | — |
| `the-definitions/complex-schema.md` | relabel (rename later) | To-audit | **Schema References** ($refs, reuse) | Nav: "Schema References". Cover type-ref vs schema-ref (E1, A8) |
| `the-definitions/error-handling.md` | **new** | — | Errors specific to definitions (undefined ref, forward/circular ref) | From toc.yaml |

### Group: Collections  *(was "The Collections")*
| Page | Status | Current state | Purpose & coverage | Notes / decisions |
|---|---|---|---|---|
| `the-collections/collection.md` | relabel | Good | Collection structure, `~`, item independence | Nav: "The Structure" |
| `the-collections/creating-collection.md` | keep | Good | Simple vs explicit creation | — |
| `the-collections/validation-rules.md` | relabel | Thin/to-audit | **Collection Rules** | Nav: "Collection Rules". Rename later (T3) |
| `the-collections/data-streaming.md` | keep | **Thin/hand-wave** | Streaming + collection-merge rules | Rewrite: framing + merge semantics (vs `src/streaming/`) |

### Group: Streaming  *(T11 — placeholder ONLY; source-first)*
> **Approach: SOURCE-FIRST.** Streaming is still under active development in `src/streaming/`.
> Do **not** write normative streaming spec yet — the implementation leads. Keep a single
> placeholder page that says so; flesh out (and split into multiple pages) once the design
> stabilizes. Avoid implying a finished spec.

| Page | Status | Current state | Purpose & coverage | Notes / decisions |
|---|---|---|---|---|
| `streaming/README.md` | **new (placeholder)** | under development | "Streaming is evolving; source-first. Conceptual intro + link to Collections; details to follow." | Collections `data-streaming.md` links here. Expand later from `src/streaming/` |

### Group: Schema Definition Language
| Page | Status | Current state | Purpose & coverage | Notes / decisions |
|---|---|---|---|---|
| `…/internet-object-schema.md` | keep | **Has draft artifacts** | Overview of SDL | Remove stray fence + author notes (lines ~269-273, 309-313); make modifiers normative (B1) |
| `…/schema-representation.md` | keep | To-audit | Structural representation | Audit |
| `…/data-types/README.md` | keep | **Drifted** (miscount) | Type system index: base types + shortcut registry | Fix "six types" (A6); add base+shortcut framing (A8); add binary/bigint/decimal |
| `…/data-types/any.md` | keep | Good | `any` + `anyOf` | Don't document `isSchema` (G4) |
| `…/data-types/string/README.md` | keep | **Drifted** | String type + TypeDef | Transcribe full TypeDef (add flags,minLen,format,escapeLines,encloser) (G1) |
| `…/string/string-derived-types/{email,url,date,time,datetime}.md` | keep | To-audit | Shortcut types over string | Frame as predefined constrained shortcuts (A8). Note: date/time/datetime are their own TypeDef in code, not string-derived — reconcile placement |
| `…/data-types/number/README.md` | keep | **Drifted** | Number type + TypeDef | Transcribe full TypeDef (add `format`, drop `divisibleBy`) (G1,F2) |
| `…/number/derived-types/README.md` | keep | **Drifted** | Numeric shortcuts registry | Replace `byte`-only set with full functional set; mark reserved ones (A1,A2,A3); integer enforcement (A7) |
| `…/data-types/number/bigint.md` | **new** | — | BigInt schema type + TypeDef | A4 |
| `…/data-types/number/decimal.md` | **new** | — | Decimal schema type + TypeDef (precision/scale, 4 modes) | A4 |
| `…/data-types/date-and-time.md` | keep | To-audit | datetime/date/time TypeDef | Transcribe TypeDef (G1) |
| `…/data-types/base64.md` | relabel (rename later) | To-audit | **Binary** schema type + TypeDef | Nav: "Binary". Add binary TypeDef (A5) |
| `…/data-types/object.md` | keep | To-audit | Object/SchemaDef type | Adopt "SchemaDef" (T4/F5) |
| `…/data-types/array.md` | keep | **Drifted** | Array type + TypeDef | Fix element keyword → `[type]`/`of:` (drop items/schema) (F1); add optional/null (G2) |
| `…/data-types/bool.md` | keep | To-audit | Bool type + TypeDef | Transcribe TypeDef |
| `…/typedef.md` | keep | Good (minor drift) | TypeDef concept (meta-MemberDef) | Fix number example (`format`, drop `divisibleBy`); note "transcribed from code for now" (G1) |
| `…/memberdef.md` | keep | Good (minor drift) | MemberDef concept | Fix `items`→`of`, remove `required:[]`; document positional default (2nd pos) (F1,F3,B2) |
| `…/validation-rules.md` | relabel (rename later) | To-audit | **Open & Dynamic Schemas** (`*`, `*: type`) | Nav rename from "Dynamic Schema"; make normative |
| `…/union-types.md` | **new** | — | Union types via `{any, anyOf:[...]}` | G3 |
| `…/composition.md` | **new** | — | Schema composition & reuse (refs across schemas) | From toc.yaml |

### Group: Parsing & Errors  *(T10 — new; WRITEABLE NOW)*
> **Approach: SPEC-ABLE NOW.** Error handling is mature. Source from `io-js2/src/errors/`
> + `io-js2/src/parser/` + playground (`ERROR_RECOVERY_STATUS.md`, `ERROR_RECOVERY_DEMO.md`).
> Document honestly what's stable vs in-progress.
> The *home* for parsing behavior + the error model. Per-section error pages
> (`syntax-errors.md`, `definitions/error-handling.md`, collection rules) cross-link here.
> Overlap: `error-model.md` lives HERE, not under Conformance.

> **THE ERROR MODEL (normative — author-stated):** two distinct error classes.
> 1. **Syntax errors** (tokenize/parse phase). Recovery is **boundary-bounded**: on a syntax
>    error the parser **skips bytes/tokens until the next boundary** (record separator `~`,
>    section separator `---`) **or EOF**, records the error, and resumes. Each malformed
>    region → (typically) one error; parsing continues to surface errors in later regions.
> 2. **Validation errors** (schema-validation phase). Validation is **per object**; a single
>    object may yield **zero, one, or many** errors (e.g. multiple failing members). All are
>    accumulated. Objects are validated independently (one bad object doesn't stop others).
> *(Confirm the exact boundary set + current recovery completeness vs impl when writing.)*

| Page | Status | Current state | Purpose & coverage | Notes / decisions |
|---|---|---|---|---|
| `parsing-and-errors/README.md` | **new** | writeable | Pipeline: tokenize → parse → validate; intro the two error classes | — |
| `parsing-and-errors/error-model.md` | **new** | writeable | **The two error classes**: syntax (boundary-bounded recovery) vs validation (per-object, 0..N); categories/codes/conditions (abstract) | Replaces `conformance/error-model.md` |
| `parsing-and-errors/parser-behavior.md` | **new** | writeable | **Syntax-error recovery**: skip to next boundary (`~`/`---`) or EOF; `continueOnError`/`skipErrors` | Note: full syntax recovery (Phase 3) in-progress — document as such |
| `parsing-and-errors/error-accumulation.md` | **new** | writeable (mature) | **Accumulation**: per-object validation errors (0..N) + per-region syntax errors; `getErrors()`, `ErrorNode`, partial output, duplicate-section auto-rename, editor markers | From playground Phase 2 (done) |

### Group: Conformance  *(T2 — new)*
| Page | Status | Current state | Purpose & coverage | Notes / decisions |
|---|---|---|---|---|
| `conformance/validation-model.md` | **new** | — | Parse → Validate → Load → Stringify pipeline (abstract) | Language-agnostic |
| `conformance/requirements.md` | **new** | — | MUST/SHOULD/MAY duties of parser/validator/serializer; versioning policy | RFC 2119 |
| ~~`conformance/error-model.md`~~ | moved | — | → moved to `parsing-and-errors/error-model.md` | T10 |

### Group: Interoperability
| Page | Status | Current state | Purpose & coverage | Notes / decisions |
|---|---|---|---|---|
| `json-compatibility.md` | keep | **Placeholder** | JSON round-trip rules, quoting, lossy cases (Decimal/BigInt/DateTime/NaN/Inf) | Add to nav (currently orphaned); write content |
| `interoperability/conversions.md` | **new** | — | To/from JSON/others; mapping notes | From toc.yaml |

### Group: Best Practices
| Page | Status | Current state | Purpose & coverage | Notes / decisions |
|---|---|---|---|---|
| `best-practices.md` | keep | **Empty** | Dos/don'ts: positional vs keyed, open vs closed, quoting, optional-at-end | Write content |

### Group: Appendices
| Page | Status | Current state | Purpose & coverage | Notes / decisions |
|---|---|---|---|---|
| `appendices/grammar.md` | **new** | — | One complete normative EBNF (doc/header/sections/collections/values/schema) | Replaces partial schema EBNF |
| `appendices/glossary.md` | **new** | — | Terms: TypeDef/MemberDef/SchemaDef, ref, collection, section, etc. | — |
| `faqs-1.md` | keep | To-audit | FAQ | — |
| `roadmap.md` | keep | To-audit | Roadmap | — |
| `appendices/version-history.md` | **new** | — | Spec change log | — |
| `contributors.md` | keep | Good | Contributors | — |
| `license.md` | keep | Good | License | — |

### Deferred groups (T6) — not in v1
`Security Considerations`, `Performance Considerations`, `Tools and Ecosystem`,
`References and Further Reading`. Add later as `## Groups` (no URL impact).

---

## 4. New files to create (v1)
internet-object/why-internet-object.md · internet-object/getting-started.md ·
core-concepts/document-oriented.md · core-concepts/schema-first.md ·
the-structure/values/number/special-formats.md · the-structure/case-sensitivity.md ·
the-structure/syntax-errors.md · the-definitions/error-handling.md ·
schema-definition-language/data-types/number/bigint.md ·
schema-definition-language/data-types/number/decimal.md ·
schema-definition-language/union-types.md · schema-definition-language/composition.md ·
conformance/{validation-model,requirements}.md ·
interoperability/conversions.md · appendices/{grammar,glossary,version-history}.md ·
parsing-and-errors/{README,error-accumulation,parser-behavior,error-model}.md  (writeable now)

**Placeholder only (source-first / under development):**
streaming/README.md  (single placeholder — streaming spec deferred until impl stabilizes)

## 5. `.gitbook.yaml` (new, repo root) — LOCKED (T3 = rename now)
```yaml
root: ./
structure:
  readme: README.md
  summary: SUMMARY.md
redirects:
  the-structure/values/binary: the-structure/values/base64
  the-definitions/schema-references: the-definitions/complex-schema
  the-collections/collection-rules: the-collections/validation-rules
  schema-definition-language/dynamic-schema: schema-definition-language/validation-rules
  schema-definition-language/data-types/binary: schema-definition-language/data-types/base64
```
> Redirect keys/values are URL paths (no `.md`). Confirm exact GitBook redirect path format
> against the live space on first sync (GitBook may slugify differently); adjust if needed.

## 6. Active file renames (T3 = rename now) — `git mv` + update all referrers
| Old path | New path |
|---|---|
| `the-structure/values/base64.md` | `the-structure/values/binary.md` |
| `the-definitions/complex-schema.md` | `the-definitions/schema-references.md` |
| `the-collections/validation-rules.md` | `the-collections/collection-rules.md` |
| `schema-definition-language/validation-rules.md` | `schema-definition-language/dynamic-schema.md` |
| `schema-definition-language/data-types/base64.md` | `schema-definition-language/data-types/binary.md` |

> After each rename: `git mv` (preserve history), update every internal link to the old
> path, update `SUMMARY.md`, and add the redirect above. Verify zero broken cross-links.

---

## 8. FINAL LOCKED `SUMMARY.md` (ready to write)

```markdown
# Table of contents

* [Internet Object 1.0](README.md)

## Internet Object

* [Abstract](internet-object/abstract.md)
* [The Poetic Principles](internet-object/the-zen-of-internet-object.md)
* [Objectives](internet-object/objectives.md)
* [Introducing Internet Object](internet-object/introduction.md)
* [Why Internet Object?](internet-object/why-internet-object.md)
* [Getting Started](internet-object/getting-started.md)

## Core Concepts

* [Document-Oriented Nature](core-concepts/document-oriented.md)
* [Schema-First Design](core-concepts/schema-first.md)

## Structure and Syntax

* [Internet Object Document](the-structure/introduction/README.md)
  * [Header](the-structure/introduction/header.md)
  * [Data Sections](the-structure/introduction/data.md)
* [Structural Elements](the-structure/structural-elements/README.md)
  * [Structural Characters & Separators](the-structure/structural-elements/structural-characters-n-keywords.md)
  * [Literals](the-structure/structural-elements/literals.md)
  * [Other Special Characters](the-structure/structural-elements/other-special-characters.md)
  * [Whitespace & Indentation](the-structure/structural-elements/whitespaces.md)
* [Value Representations](the-structure/values/README.md)
  * [Objects](the-structure/values/object.md)
  * [Arrays](the-structure/values/array.md)
  * [Strings](the-structure/values/string/README.md)
    * [Open Strings](the-structure/values/string/open-strings.md)
    * [Regular Strings](the-structure/values/string/regular-strings.md)
    * [Raw Strings](the-structure/values/string/raw-strings.md)
  * [Numeric Values](the-structure/values/number/README.md)
    * [Number](the-structure/values/number/number.md)
    * [BigInt](the-structure/values/number/bigint.md)
    * [Decimal](the-structure/values/number/decimal.md)
    * [Special Numeric Formats](the-structure/values/number/special-formats.md)
    * [NaN and Infinity](the-structure/values/number/nan-and-infinity.md)
  * [Binary](the-structure/values/binary.md)
  * [Date and Time](the-structure/values/date-and-time.md)
  * [Booleans](the-structure/values/booleans.md)
  * [Nulls](the-structure/values/null.md)
* [Case Sensitivity Rules](the-structure/case-sensitivity.md)
* [Comments](the-structure/comments.md)
* [Encoding](the-structure/encoding.md)
* [Syntax Errors](the-structure/syntax-errors.md)

## Definitions

* [Structure and Syntax](the-definitions/definitions.md)
* [Variables](the-definitions/variables.md)
* [Schema References](the-definitions/schema-references.md)
* [Error Handling in Definitions](the-definitions/error-handling.md)

## Collections

* [The Structure](the-collections/collection.md)
* [Creating Collections](the-collections/creating-collection.md)
* [Collection Rules](the-collections/collection-rules.md)
* [Data Streaming](the-collections/data-streaming.md)

## Streaming

* [Streaming (Overview)](streaming/README.md)

## Schema Definition Language

* [Overview](schema-definition-language/internet-object-schema.md)
* [Schema Representation](schema-definition-language/schema-representation.md)
* [Schema Data Types](schema-definition-language/data-types/README.md)
  * [Any](schema-definition-language/data-types/any.md)
  * [String Types](schema-definition-language/data-types/string/README.md)
    * [Email](schema-definition-language/data-types/string/string-derived-types/email.md)
    * [URL](schema-definition-language/data-types/string/string-derived-types/url.md)
    * [Date](schema-definition-language/data-types/string/string-derived-types/date.md)
    * [Time](schema-definition-language/data-types/string/string-derived-types/time.md)
    * [DateTime](schema-definition-language/data-types/string/string-derived-types/datetime.md)
  * [Numeric Types](schema-definition-language/data-types/number/README.md)
    * [Derived Types](schema-definition-language/data-types/number/derived-types/README.md)
  * [BigInt](schema-definition-language/data-types/number/bigint.md)
  * [Decimal](schema-definition-language/data-types/number/decimal.md)
  * [Date and Time](schema-definition-language/data-types/date-and-time.md)
  * [Binary](schema-definition-language/data-types/binary.md)
  * [Object (SchemaDef)](schema-definition-language/data-types/object.md)
  * [Array](schema-definition-language/data-types/array.md)
  * [Bool](schema-definition-language/data-types/bool.md)
* Advanced Schema Concepts
  * [TypeDef](schema-definition-language/typedef.md)
  * [MemberDef](schema-definition-language/memberdef.md)
  * [Open & Dynamic Schemas](schema-definition-language/dynamic-schema.md)
  * [Union Types (anyOf)](schema-definition-language/union-types.md)
  * [Composition & Reuse](schema-definition-language/composition.md)

## Parsing & Errors

* [Overview](parsing-and-errors/README.md)
* [Error Model](parsing-and-errors/error-model.md)
* [Parser Behavior & Recovery](parsing-and-errors/parser-behavior.md)
* [Error Accumulation](parsing-and-errors/error-accumulation.md)

## Conformance

* [Validation Model](conformance/validation-model.md)
* [Conformance Requirements](conformance/requirements.md)

## Interoperability

* [JSON Compatibility](json-compatibility.md)
* [Converting To/From Other Formats](interoperability/conversions.md)

## Best Practices

* [Best Practices & Guidelines](best-practices.md)

## Appendices

* [Formal Grammar (EBNF)](appendices/grammar.md)
* [Glossary](appendices/glossary.md)
* [FAQs](faqs-1.md)
* [Roadmap](roadmap.md)
* [Version History](appendices/version-history.md)
* [Contributors](contributors.md)
* [License](license.md)
```

## 7. Consolidated open questions (please decide)
- T1 Core Concepts: include now or defer?
- T2 Conformance: own group, single page, or defer?
- T3 File moves: none (v1) or do renames now?
- T4 Adopt "SchemaDef" terminology?
- T5 Binary page naming (rename base64→binary)?
- T6 Confirm deferring Security/Performance/Tools/References?
- T7 Getting Started placement?
- T8 Keep Booleans + Nulls separate?
- T9 Keep value vs schema BigInt/Decimal as separate pages?
- T10 Parsing & Errors group (placeholder now)? Does error-model live here vs Conformance?
- T11 Streaming group (placeholder now)?
- Any chapters to add/remove/reorder beyond the above?
