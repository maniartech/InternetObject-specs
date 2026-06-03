---
description: MUST/SHOULD/MAY duties of parsers, validators, and serializers.
---

# Conformance Requirements

The key words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** are used as in
RFC 2119. This section states the duties of a conformant implementation. Internet Object is
**language-independent**; these requirements describe behavior, not any particular API.

## All implementations

- MUST accept input encoded as UTF-8.
- MUST treat the format as case-sensitive (keys, keywords, type names).
- MUST recognize the structural characters and keywords exactly as defined.

## A conformant parser

- MUST build a document tree according to the [grammar](../appendices/grammar.md).
- MUST report syntax errors with a stable error **code** and a source **position**.
- SHOULD recover from a syntax error by skipping to the next boundary (`~` or `---`) and
  continuing, rather than aborting the whole document.

## A conformant validator

- MUST validate data against the schema: types, constraints, optionality, nullability.
- MUST recognize the closed set of built-in types and their allowed options
  (each type's [TypeDef](../schema-definition-language/typedef.md)).
- MUST reject a value that violates its type or constraints, with the appropriate error code.
- MUST validate each record independently; one invalid record MUST NOT invalidate others.
- MUST NOT invent new built-in type names; document-local types are declared with `$`
  references.

## A conformant serializer

- MUST produce output that re-parses to equivalent data (round-trip).
- SHOULD honor schema serialization hints (e.g. number `format`, string quote style).

## Versioning

- The **specification** carries its own version (currently `1.0 Draft`).
- **Implementations** carry their own versions independently and SHOULD declare which
  specification version they conform to (e.g. "implements Internet Object 1.0").

## Reference implementation

The TypeScript/JavaScript library [`io-js2`](https://github.com/maniartech) serves as a
reference implementation. Where this specification and an implementation disagree during the
draft period, the discrepancy is tracked and resolved case by case; the specification is the
intended source of truth as it stabilizes.

## See Also

- [Validation Model](validation-model.md) · [Formal Grammar](../appendices/grammar.md)
