---
status: candidate
description: MUST/SHOULD/MAY duties of parsers, validators, and serializers.
---

# Conformance Requirements

This section states the duties of a conformant implementation. Internet Object is
**language-independent**; these requirements describe behavior, not any particular API.

Requirement keywords are defined once, for the whole specification, in [Conventions](../conventions.md)
— they are not local to this page, and a rule stated in ordinary prose elsewhere is no weaker for it.

## All implementations

- MUST accept input encoded as UTF-8.
- MUST treat the format as case-sensitive (keys, keywords, type names).
- MUST recognize the structural characters and keywords exactly as defined.
- MUST report every error with a **code from the registry** in [Error Model](../parsing-and-errors/error-model.md),
  named by the rule in [Error Codes](../parsing-and-errors/error-codes.md), together with the
  **position** in the source. An implementation MUST NOT invent a code, assemble one at runtime, or
  report an error without one.
- MUST NOT accept a prefix of a malformed construct and discard the remainder — a truncated value
  that parses is worse than a rejected one, because nothing reports it.

## A conformant parser

- MUST build a document tree according to the [grammar](../appendices/grammar.md).
- SHOULD recover from a syntax error by skipping to the next boundary (`~` or `---`) and
  continuing, rather than aborting the whole document.

## A conformant validator

- MUST validate data against the schema: types, constraints, optionality, nullability.
- MUST recognize the closed set of built-in types and their allowed options
  (each type's [TypeDef](../schema-definition-language/typedef.md)).
- MUST reject a value that violates its type or constraints, distinguishing a **type** failure
  from a **constraint** failure as [Error Codes](../parsing-and-errors/error-codes.md) defines.
- MUST validate each record independently; one invalid record MUST NOT invalidate others.
- MUST NOT invent new built-in type names; document-local types are declared with `$`
  references.
- MUST produce the **same outcome for the same logical value, whatever route it arrived by** —
  the same accept-or-reject decision, the same error codes, in the same order. Validation is
  defined on the value, not on how it was delivered. See
  [Entry points](validation-model.md#entry-points).

## A conformant serializer

- MUST produce output that re-parses to equivalent data, and MUST produce output that parses
  without error — see [Round-Trip Guarantees](../serialization/round-trip.md).
- MUST preserve each value's **type**, not merely its printed form, and MUST quote any string
  or key that would otherwise read back differently — see
  [Value Formatting](../serialization/value-formatting.md).
- MUST write a member's name whenever no schema in scope can recover it, and MUST NOT repeat a
  name a schema already carries — see [Key Emission](../serialization/key-emission.md).
- MUST NOT drop a member, and MUST NOT infer a schema the document does not carry.
- SHOULD honor schema serialization hints (e.g. number `format`, string quote style).

The [Serialization](../serialization/README.md) section is normative for all of the above.

## Versioning

- The **specification** carries its own version (currently `1.0 Draft`).
- **Implementations** carry their own versions independently and SHOULD declare which
  specification version they conform to (e.g. "implements Internet Object 1.0").

## Reference implementation

The official TypeScript/JavaScript implementation,
[`internet-object`](https://github.com/maniartech/InternetObject-js), serves as a reference
implementation. Where this specification and an implementation disagree during the draft
period, the discrepancy is tracked and resolved case by case; the specification is the
intended source of truth as it stabilizes.

## See Also

- [Conventions](../conventions.md) — requirement keywords, and how examples are marked
- [Error Codes](../parsing-and-errors/error-codes.md) · [Error Model](../parsing-and-errors/error-model.md)
- [Validation Model](validation-model.md) · [Formal Grammar](../appendices/grammar.md)
