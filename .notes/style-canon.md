# Internet Object Spec — Style Canon

**Status: ACTIVE.** This is the single house-style reference for the specification. Dimension
**D6 (Consistency)** in `.notes/quality-criteria.md` is scored against this file, so "the same
across all pages" is concrete and checkable.

It is **derived from the strongest existing pages** (notably
`schema-definition-language/data-types/number/README.md` for scalar type pages,
`schema-definition-language/data-types/array.md` for container type pages, and
`parsing-and-errors/error-model.md` for normative pages) plus the locked authoring conventions
in `.notes/ToC-finalization.md` §2a. When a page disagrees with this canon, the page is wrong.

---

## 1. Voice, tense, and person

- **Tense:** present tense. "The `array` type validates an ordered list," not "will validate."
- **Voice:** active. "A validator rejects the value," not "the value is rejected by a validator"
  (passive is acceptable only when the actor is genuinely irrelevant).
- **Person — by page kind:**
  - *Normative / reference* (types, structure, conformance, errors): neutral third person.
    The actors are abstract: *a parser*, *a validator*, *a serializer*, *a conformant
    implementation*. Never "the library" or a language/API name as the contract.
  - *Guidance / tutorial* (best-practices, getting-started, why-IO): address the reader as
    "you," and use imperative for advice ("Quote ambiguous values," "Type your fields").
- **Register:** professional and authoritative. Complete sentences and well-formed paragraphs.
  No filler ("basically," "simply," "of course"), no telegraphic fragments standing in for
  prose, no first person ("we," "I") in normative text.

## 2. RFC 2119 normative keywords

- Use **MUST / MUST NOT / SHOULD / SHOULD NOT / MAY** in **uppercase** for binding behavior,
  per RFC 2119/8174. Example: "A conformant validator MUST recognize all of these names."
- Use them only for genuine requirements. Descriptive prose stays lowercase ("the value is
  rejected"); reserve the keywords for stated duties of an implementation.
- Examples, notes, rationale, and *Implementation status* are **informative**, not normative —
  do not phrase them as requirements.

## 3. Nomenclature (canonical terms — use exactly; no synonyms)

| Canonical term | Use for | Do **not** write |
|----------------|---------|------------------|
| **TypeDef** | the fixed option contract for a built-in type | "type definition", "type schema" |
| **MemberDef** | one field's definition (type + constraints) | "field def", "member definition", "field schema" |
| **SchemaDef** | a schema describing an object's shape | "object schema", "object def" |
| **ref** | a `$name` definition (schema-ref or type-ref) | "reference variable", bare "$ref" |
| **variable** | an `@name` value definition | "var", "value ref" |
| **member** | one key/value pair in an object | "property", "attribute", "field" (in normative text) |
| **record** | one item of a collection (prefixed `~`) | "row" (except loosely in examples), "entry" |
| **section** | a named/default data block after `---` | "segment", "part" |
| **collection** | an ordered sequence of records | "list of records", "array of objects" |
| **shortcut** | a built-in name = base type + preset constraints (`int8`, `email`) | "derived type" in prose, "alias" (except a true alias like `byte`=`uint8`) |
| **value** | a scalar or structured datum | — |
| **header** / **data** | the parts before / after `---` | "preamble", "body" |
| **open string / regular string / raw string** | the three text forms | "bare/quoted/literal string" |
| **optional** (`?`) / **nullable** (`*`) | the two member markers | "omittable", "can-be-empty" |
| **error code** | the stable hyphenated identifier (`invalid-range`) | "error name", "error id" |

Notes:
- The nav label **"Derived Types"** is legacy; in prose call them **shortcuts** (or
  "predefined shortcuts"). A true 1:1 alias (e.g. `byte` for `uint8`) is an **alias**.
- Spell built-in type names in `code` font: `number`, `int8`, `string`, `array`, `decimal`.

## 4. Headings

- **H1:** one per page, **Title Case**, matching the `SUMMARY.md` nav label
  (`# Numeric Types`, `# Error Model`, `# Array`).
- **H2 / H3:** **sentence case** ("Declaring the element type", "Syntax errors", "Optional,
  nullable & defaults"), **except**:
  - proper-noun labels keep their spelling: **TypeDef**, **MemberDef**, **SchemaDef**;
  - fixed standard sections keep their canonical form: **Constraints**, **Examples**,
    **Implementation status (beta)**, **See Also**.
- Hierarchy is gap-free (no H2 → H4 jump). H3 is used for per-option/per-constraint detail
  (`### min / max`, `### multipleOf`, `### choices`).

## 5. Page templates (section order by kind)

### 5a. Scalar type page  (model: `data-types/number/README.md`)
1. Front matter `description:` + H1.
2. **Lead** — 1–2 sentences; bold the type name in code (`**`number`**`); say what it validates.
3. **Cross-ref callout** (`>`) to related value-syntax / sibling pages.
4. **The <type> family** — shortcuts table (name → semantics → range), when the type has a
   family. Include the "A conformant validator MUST recognize all of these names" line.
5. **TypeDef** — the allowed-options table (transcribed from `XxxDef.schema` in code).
6. **Constraints** — one H3 per option, each with a minimal `ruby` example.
7. **Special values** — only if the type has them (e.g. `NaN`/`Inf`).
8. **Optional, nullable & defaults** — the resolution table + a short example.
9. **Implementation status (beta)** — honest list of target-vs-current gaps, if any.
10. **Examples** — one realistic, verified example (often adapted from the playground).
11. **See Also** — bulleted cross-links.

### 5b. Container / complex type page  (model: `data-types/array.md`)
Same spine, but replace step 4 with **"Declaring the element type / contents"** (the `[ … ]`
shorthand and keyed `of:` form for arrays; the object shape / SchemaDef for objects; `anyOf`
for `any`), and add a **"Nested and multidimensional …"** section where relevant. No numeric
family table.

### 5c. Normative / process page  (model: `parsing-and-errors/error-model.md`)
Lead → categorized sections (each with a table of codes/conditions or numbered rules) →
stability/precedence callout → See Also. Use RFC 2119 keywords for duties.

### 5d. Conceptual page  (core-concepts, why-IO, getting-started)
Lead stating the idea → motivated explanation with small examples → "you"-addressed where
helpful → See Also. Prioritize flow and the "why."

### 5e. Reference appendix  (grammar, glossary)
Terse and complete; precision over prose. No tutorial framing. Bold term + em-dash definition
(glossary); fenced `ebnf` grammar blocks (grammar).

## 6. Markup conventions

- **Code fences:** ` ```ruby ` for all Internet Object snippets (the `io` highlighter does not
  exist yet; a global ruby→io swap happens later). Grammar uses ` ```ebnf `.
- **Callouts:** GitHub/GitBook-portable `>` blockquotes, usually with a **bold lead-in**:
  `> **Whole-number rule.** …`, `> **Reserved (not yet supported).** …`. (No `{% hint %}` for
  now; convert later if the platform supports it.)
- **Tables:** always a header row + separator; used for TypeDef options, value-resolution,
  type families, and error-code/condition lists.
- **Emphasis:** `**bold**` for first mention of a key term or a callout lead-in; `code` for
  type names, options, markers, literals, and error codes; `*italic*` sparingly for "the
  *what* vs the *why*" contrasts.
- **Links:** relative `.md` links only (`../typedef.md`). Link text is descriptive — never
  "here" / "click here".
- **Front matter:** every page begins with `--- description: <one line> ---` — a single
  sentence/phrase in sentence case summarizing the page.

## 7. Example conventions (also enforced by `tools/check-examples.ts`)

- Examples are **realistic** — plausible field names and values (`age`, `email`, `rollNo`),
  not `foo`/`bar` noise.
- A testable example includes a header line, a `---` separator, and data row(s). Blocks
  without `---` are treated as fragments and skipped by the verifier.
- **Annotations:** `# ✓` marks a valid line; `# ✗ <error-code>` asserts the validation error
  on that line, where `<error-code>` is the stable hyphenated code (`# ✗ invalid-range`). The
  hyphen is required for the verifier to read it as a code.
- Show **valid AND invalid** wherever the topic has failure modes.
- A snippet that legitimately cannot be self-contained carries `<!-- io:test skip -->` with a
  one-line reason.
- Keep examples **minimal** — only what the point needs.

## 8. Standard sections — exact spelling & placement

- **"See Also"** — last section on (nearly) every page; a short bulleted list of the most
  relevant cross-links, descriptions after an em-dash where useful.
- **"Implementation status (beta)"** — present only when target behavior leads the
  implementation; a bulleted, honest gap list. Placed just before Examples.
- **"TypeDef"**, **"Constraints"**, **"Examples"** — exact spelling on every type page.

## 9. Error-code references

- Refer to errors by **stable hyphenated code** in `code` font (`invalid-range`,
  `value-required`, `null-not-allowed`).
- State once where relevant that **codes are stable; messages and positions may vary**, and
  that tooling should branch on the code, not the message.

---

*This canon is the objective reference for D6. Update it deliberately (not per page); when it
changes, re-check affected pages. The QA tracker cites it when scoring consistency.*
