---
description: Generated overview of specification features and their maturity status.
status: informative
---

# Feature Status

> **Generated file — do not edit by hand.** Produced by `tools/status-report.ts` from
> each page's `status:` front matter. To change a page's status, edit that page's
> `status:` field and regenerate with `npm run status:write`.

**Maturity levels:** `Stable` (frozen contract) · `Candidate` (feature-complete, under
review) · `Draft` (still evolving) · `Deprecated` · `Reserved`. Defined in the
[Versioning Policy](README.md). Non-normative pages are marked `Informative` and are not
graded here.

**Totals:** 79 Candidate.

> **Nothing is Stable yet, by policy.** Graduation requires a second, independent
> implementation to agree, and a soak period of at least three months after the
> reference implementation is publicly released. A specification is a claim about what
> people will need, and that claim is tested by use rather than by review. See the
> [Versioning Policy](README.md#core-rules).

## Overview

| Page | Status |
| ---- | ------ |
| [Conventions](../conventions.md) | Candidate |

## Structure and Syntax

| Page | Status |
| ---- | ------ |
| [Internet Object Document](../the-structure/introduction/README.md) | Candidate |
| [Header](../the-structure/introduction/header.md) | Candidate |
| [Data Sections](../the-structure/introduction/data.md) | Candidate |
| [Structural Elements](../the-structure/structural-elements/README.md) | Candidate |
| [Structural Characters & Separators](../the-structure/structural-elements/structural-characters-n-keywords.md) | Candidate |
| [Literals](../the-structure/structural-elements/literals.md) | Candidate |
| [Other Special Characters](../the-structure/structural-elements/other-special-characters.md) | Candidate |
| [Whitespace & Indentation](../the-structure/structural-elements/whitespaces.md) | Candidate |
| [Value Representations](../the-structure/values/README.md) | Candidate |
| [Objects](../the-structure/values/object.md) | Candidate |
| [Arrays](../the-structure/values/array.md) | Candidate |
| [Strings](../the-structure/values/string/README.md) | Candidate |
| [Open Strings](../the-structure/values/string/open-strings.md) | Candidate |
| [Regular Strings](../the-structure/values/string/regular-strings.md) | Candidate |
| [Raw Strings](../the-structure/values/string/raw-strings.md) | Candidate |
| [Numeric Values](../the-structure/values/number/README.md) | Candidate |
| [Number](../the-structure/values/number/number.md) | Candidate |
| [BigInt](../the-structure/values/number/bigint.md) | Candidate |
| [Decimal](../the-structure/values/number/decimal.md) | Candidate |
| [Special Numeric Formats](../the-structure/values/number/special-formats.md) | Candidate |
| [NaN and Infinity](../the-structure/values/number/nan-and-infinity.md) | Candidate |
| [Binary](../the-structure/values/binary.md) | Candidate |
| [Date and Time](../the-structure/values/date-and-time.md) | Candidate |
| [Booleans](../the-structure/values/booleans.md) | Candidate |
| [Nulls](../the-structure/values/null.md) | Candidate |
| [Case Sensitivity Rules](../the-structure/case-sensitivity.md) | Candidate |
| [Comments](../the-structure/comments.md) | Candidate |
| [Encoding](../the-structure/encoding.md) | Candidate |
| [Syntax Errors](../the-structure/syntax-errors.md) | Candidate |

## Definitions

| Page | Status |
| ---- | ------ |
| [Definitions](../the-definitions/definitions.md) | Candidate |
| [Variables](../the-definitions/variables.md) | Candidate |
| [Schema References](../the-definitions/schema-references.md) | Candidate |
| [Error Handling in Definitions](../the-definitions/error-handling.md) | Candidate |

## Collections

| Page | Status |
| ---- | ------ |
| [Collection](../the-collections/collection.md) | Candidate |
| [Creating Collections](../the-collections/creating-collection.md) | Candidate |
| [Collection Rules](../the-collections/collection-rules.md) | Candidate |
| [Data Streaming](../the-collections/data-streaming.md) | Candidate |

## Schema Definition Language

| Page | Status |
| ---- | ------ |
| [Overview](../schema-definition-language/internet-object-schema.md) | Candidate |
| [Schema Representation](../schema-definition-language/schema-representation.md) | Candidate |
| [Schema Data Types](../schema-definition-language/data-types/README.md) | Candidate |
| [Any](../schema-definition-language/data-types/any.md) | Candidate |
| [String Types](../schema-definition-language/data-types/string/README.md) | Candidate |
| [Email](../schema-definition-language/data-types/string/string-derived-types/email.md) | Candidate |
| [URL](../schema-definition-language/data-types/string/string-derived-types/url.md) | Candidate |
| [Numeric Types](../schema-definition-language/data-types/number/README.md) | Candidate |
| [BigInt](../schema-definition-language/data-types/number/bigint.md) | Candidate |
| [Decimal](../schema-definition-language/data-types/number/decimal.md) | Candidate |
| [Date and Time](../schema-definition-language/data-types/date-and-time.md) | Candidate |
| [Binary](../schema-definition-language/data-types/binary.md) | Candidate |
| [Object (SchemaDef)](../schema-definition-language/data-types/object.md) | Candidate |
| [Array](../schema-definition-language/data-types/array.md) | Candidate |
| [Bool](../schema-definition-language/data-types/bool.md) | Candidate |
| [TypeDef](../schema-definition-language/typedef.md) | Candidate |
| [MemberDef](../schema-definition-language/memberdef.md) | Candidate |
| [Open & Dynamic Schemas](../schema-definition-language/dynamic-schema.md) | Candidate |
| [Union Types (anyOf)](../schema-definition-language/union-types.md) | Candidate |
| [Composition & Reuse](../schema-definition-language/composition.md) | Candidate |

## Streaming

| Page | Status |
| ---- | ------ |
| [Overview](../streaming/README.md) | Candidate |
| [Wire Format & Framing](../streaming/wire-format.md) | Candidate |
| [Stream Items](../streaming/stream-items.md) | Candidate |
| [Schema & State](../streaming/schema-and-state.md) | Candidate |
| [Streaming Error Model](../streaming/error-model.md) | Candidate |
| [Readers & Writers](../streaming/readers-and-writers.md) | Candidate |

## Parsing & Errors

| Page | Status |
| ---- | ------ |
| [Overview](../parsing-and-errors/README.md) | Candidate |
| [Error Codes](../parsing-and-errors/error-codes.md) | Candidate |
| [Error Model](../parsing-and-errors/error-model.md) | Candidate |
| [Parser Behavior & Recovery](../parsing-and-errors/parser-behavior.md) | Candidate |
| [Error Accumulation](../parsing-and-errors/error-accumulation.md) | Candidate |

## Serialization

| Page | Status |
| ---- | ------ |
| [Overview](../serialization/README.md) | Candidate |
| [Key Emission](../serialization/key-emission.md) | Candidate |
| [Value Formatting](../serialization/value-formatting.md) | Candidate |
| [Record & Document Output](../serialization/document-output.md) | Candidate |
| [Round-Trip Guarantees](../serialization/round-trip.md) | Candidate |

## Conformance

| Page | Status |
| ---- | ------ |
| [Validation Model](../conformance/validation-model.md) | Candidate |
| [Conformance Requirements](../conformance/requirements.md) | Candidate |

## Interoperability

| Page | Status |
| ---- | ------ |
| [JSON Compatibility](../json-compatibility.md) | Candidate |
| [Converting To/From Other Formats](../interoperability/conversions.md) | Candidate |

## Appendices

| Page | Status |
| ---- | ------ |
| [Formal Grammar (EBNF)](../appendices/grammar.md) | Candidate |

_18 informative (non-normative) pages — guides, rationale, appendices,
and these versioning pages — are not graded for maturity and are omitted above._

## See Also

- [Versioning Policy](README.md) — the maturity levels and rules behind this table
- [Roadmap](../roadmap.md) · [Version History](version-history.md)
