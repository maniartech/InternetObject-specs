# Proposed ToC Restructure + GitBook Config (for review)

Working doc (unpublished). Builds on the author's intended structure in `.notes/toc.yaml`,
plus the A+ additions (Why-IO, Getting Started, Conformance, Grammar, Error model).

## GitBook safety principle (why this is low-risk)

With GitBook Git-Sync, a page's URL derives from its **file path**, not its `SUMMARY.md`
label or position. Therefore:

- **Reordering / regrouping / relabeling in `SUMMARY.md` = URL-safe, no redirects.**
- **Only physical file renames/moves change URLs → those need redirects.**

**v1 plan: keep all existing file paths in place** (reorganize via `SUMMARY.md` + add new
files). This yields a full restructure with **zero broken URLs and zero redirects required**.
Optional file renames (for cleaner paths) are listed at the end with ready-made redirects.

Legend: `[keep]` existing file reused as-is · `[new]` create file · `## Group` = section
header (not a page, no URL).

---

## Proposed `SUMMARY.md`

```markdown
# Table of contents

* [Internet Object 1.0](README.md)                                          # [keep]

## Internet Object

* [Abstract](internet-object/abstract.md)                                   # [keep]
* [The Poetic Principles](internet-object/the-zen-of-internet-object.md)    # [keep]
* [Objectives](internet-object/objectives.md)                              # [keep]
* [Introducing Internet Object](internet-object/introduction.md)           # [keep]
* [Why Internet Object?](internet-object/why-internet-object.md)            # [new]
* [Getting Started](internet-object/getting-started.md)                     # [new]

## Core Concepts

* [Document-Oriented Nature](core-concepts/document-oriented.md)            # [new]
* [Schema-First Design](core-concepts/schema-first.md)                      # [new]

## Structure and Syntax

* [Internet Object Document](the-structure/introduction/README.md)          # [keep]
  * [Header](the-structure/introduction/header.md)                          # [keep]
  * [Data Sections](the-structure/introduction/data.md)                     # [keep]
* [Structural Elements](the-structure/structural-elements/README.md)        # [keep]
  * [Structural Characters & Separators](the-structure/structural-elements/structural-characters-n-keywords.md) # [keep]
  * [Literals](the-structure/structural-elements/literals.md)               # [keep]
  * [Other Special Characters](the-structure/structural-elements/other-special-characters.md) # [keep]
  * [Whitespace & Indentation](the-structure/structural-elements/whitespaces.md) # [keep]
* [Value Representations](the-structure/values/README.md)                    # [keep]
  * [Objects](the-structure/values/object.md)                               # [keep]
  * [Arrays](the-structure/values/array.md)                                 # [keep]
  * [Strings](the-structure/values/string/README.md)                        # [keep]
    * [Open Strings](the-structure/values/string/open-strings.md)           # [keep]
    * [Regular Strings](the-structure/values/string/regular-strings.md)     # [keep]
    * [Raw Strings](the-structure/values/string/raw-strings.md)             # [keep]
  * [Numeric Values](the-structure/values/number/README.md)                 # [keep]
    * [Number](the-structure/values/number/number.md)                       # [keep]
    * [BigInt](the-structure/values/number/bigint.md)                       # [keep]
    * [Decimal](the-structure/values/number/decimal.md)                     # [keep]
    * [Special Numeric Formats](the-structure/values/number/special-formats.md) # [new] hex/octal/binary/scientific
    * [NaN and Infinity](the-structure/values/number/nan-and-infinity.md)   # [keep]
  * [Binary](the-structure/values/base64.md)                                # [keep] relabel "Base64"->"Binary"
  * [Date and Time](the-structure/values/date-and-time.md)                  # [keep]
  * [Booleans](the-structure/values/booleans.md)                            # [keep]
  * [Nulls](the-structure/values/null.md)                                   # [keep]
* [Case Sensitivity Rules](the-structure/case-sensitivity.md)               # [new]
* [Comments](the-structure/comments.md)                                     # [keep]
* [Encoding](the-structure/encoding.md)                                     # [keep]
* [Syntax Errors](the-structure/syntax-errors.md)                           # [new]

## Definitions

* [Structure and Syntax](the-definitions/definitions.md)                    # [keep]
* [Variables](the-definitions/variables.md)                                 # [keep]
* [Schema References](the-definitions/complex-schema.md)                     # [keep] relabel
* [Error Handling in Definitions](the-definitions/error-handling.md)        # [new]

## Collections

* [The Structure](the-collections/collection.md)                            # [keep]
* [Creating Collections](the-collections/creating-collection.md)            # [keep]
* [Collection Rules](the-collections/validation-rules.md)                   # [keep]
* [Data Streaming](the-collections/data-streaming.md)                       # [keep]

## Schema Definition Language

* [Overview](schema-definition-language/internet-object-schema.md)          # [keep]
* [Schema Representation](schema-definition-language/schema-representation.md) # [keep]
* [Schema Data Types](schema-definition-language/data-types/README.md)       # [keep]
  * [Any](schema-definition-language/data-types/any.md)                      # [keep]
  * [String Types](schema-definition-language/data-types/string/README.md)   # [keep]
    * [Email](schema-definition-language/data-types/string/string-derived-types/email.md)    # [keep]
    * [URL](schema-definition-language/data-types/string/string-derived-types/url.md)        # [keep]
    * [Date](schema-definition-language/data-types/string/string-derived-types/date.md)      # [keep]
    * [Time](schema-definition-language/data-types/string/string-derived-types/time.md)      # [keep]
    * [DateTime](schema-definition-language/data-types/string/string-derived-types/datetime.md) # [keep]
  * [Numeric Types](schema-definition-language/data-types/number/README.md)  # [keep]
    * [Derived Types](schema-definition-language/data-types/number/derived-types/README.md)  # [keep] expand to full set
  * [BigInt](schema-definition-language/data-types/number/bigint.md)         # [new] (A4)
  * [Decimal](schema-definition-language/data-types/number/decimal.md)       # [new] (A4) precision/scale
  * [Date and Time](schema-definition-language/data-types/date-and-time.md)  # [keep]
  * [Binary](schema-definition-language/data-types/base64.md)               # [keep] pending A5 decision
  * [Object](schema-definition-language/data-types/object.md)                # [keep]
  * [Array](schema-definition-language/data-types/array.md)                  # [keep]
  * [Bool](schema-definition-language/data-types/bool.md)                    # [keep]
* Advanced Schema Concepts
  * [TypeDef](schema-definition-language/typedef.md)                         # [keep]
  * [MemberDef](schema-definition-language/memberdef.md)                     # [keep]
  * [Open & Dynamic Schemas](schema-definition-language/validation-rules.md) # [keep] relabel from "Dynamic Schema"
  * [Union Types (anyOf)](schema-definition-language/union-types.md)         # [new]
  * [Composition & Reuse](schema-definition-language/composition.md)         # [new]

## Conformance

* [Validation Model](conformance/validation-model.md)                       # [new] parse/validate/load
* [Conformance Requirements](conformance/requirements.md)                   # [new] MUST/SHOULD/MAY
* [Error Model & Conditions](conformance/error-model.md)                    # [new]

## Interoperability

* [JSON Compatibility](json-compatibility.md)                               # [keep] write content
* [Converting To/From Other Formats](interoperability/conversions.md)       # [new]

## Best Practices

* [Best Practices & Guidelines](best-practices.md)                          # [keep] write content

## Appendices

* [Formal Grammar (EBNF)](appendices/grammar.md)                            # [new]
* [Glossary](appendices/glossary.md)                                        # [new]
* [FAQs](faqs-1.md)                                                         # [keep]
* [Roadmap](roadmap.md)                                                     # [keep]
* [Version History](appendices/version-history.md)                          # [new]
* [Contributors](contributors.md)                                           # [keep]
* [License](license.md)                                                     # [keep]
```

### Deferred to a later pass (in author's toc.yaml, not v1)
`Security Considerations`, `Performance Considerations`, `Tools and Ecosystem`,
`References and Further Reading`. Easy to add as `## Groups` later with no URL impact.

---

## Proposed `.gitbook.yaml` (new file at repo root)

```yaml
root: ./

structure:
  readme: README.md
  summary: SUMMARY.md

# No redirects needed for v1 (no files moved). This block is the home for redirects
# whenever a file is later renamed/moved. Format: new-path: old-path
redirects: {}
```

---

## New files to create (no redirects — brand-new URLs)

internet-object/why-internet-object.md, internet-object/getting-started.md,
core-concepts/document-oriented.md, core-concepts/schema-first.md,
the-structure/values/number/special-formats.md, the-structure/case-sensitivity.md,
the-structure/syntax-errors.md, the-definitions/error-handling.md,
schema-definition-language/data-types/number/bigint.md,
schema-definition-language/data-types/number/decimal.md,
schema-definition-language/union-types.md, schema-definition-language/composition.md,
conformance/{validation-model,requirements,error-model}.md,
interoperability/conversions.md, appendices/{grammar,glossary,version-history}.md.

---

## OPTIONAL file renames (only if cleaner paths are wanted — each needs a redirect)

Not recommended for v1 (adds risk for cosmetic gain). If desired later, add to
`.gitbook.yaml` redirects:

| Rename | Redirect entry (new: old) |
|---|---|
| `schema-definition-language/validation-rules.md` → `.../dynamic-schema.md` | `schema-definition-language/dynamic-schema.md: schema-definition-language/validation-rules.md` |
| `the-collections/validation-rules.md` → `.../collection-rules.md` | `the-collections/collection-rules.md: the-collections/validation-rules.md` |
| `the-structure/values/base64.md` → `.../binary.md` | `the-structure/values/binary.md: the-structure/values/base64.md` |
| `the-definitions/complex-schema.md` → `.../schema-references.md` | `the-definitions/schema-references.md: the-definitions/complex-schema.md` |

---

## Confirmations needed
1. Approve this ToC shape (groups + new pages)?
2. v1 = **no file moves** (recommended), or also do the optional renames now (with redirects)?
3. Include `Core Concepts` now, or defer with Security/Performance/Tools?
