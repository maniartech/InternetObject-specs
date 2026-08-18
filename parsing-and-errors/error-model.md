---
status: candidate
description: Syntax vs validation errors; categories, codes, and conditions.
---

# Error Model

Internet Object defines two classes of error. Each reported error carries a stable
**error code** (a hyphenated identifier), a human-readable message, and the **position** in
the source where it occurred.

## Syntax errors

Raised while tokenizing or parsing, before any schema is applied. They describe malformed
*text*. Representative codes:

| Code | Condition |
| ---- | --------- |
| `expecting-bracket` | a `{`, `}`, `[`, or `]` is missing |
| `unexpected-token` | a token appears where the grammar does not allow it |
| `unexpected-positional-member` | a positional value follows a keyed one in an object |
| `unknown-member` | a MemberDef uses an option the declared type does not define |
| `string-not-closed` | a quoted string has no closing quote |
| `value-required` | a value was expected (e.g. a key with no value) but none was found |
| `invalid-datetime` | a date/time literal is malformed |
| `duplicate-section-name` | two sections share a name — a **structural** fault, not a lexical one; the duplicate is [renamed](error-accumulation.md#duplicate-section-names) so the document still loads |

> A conformant parser SHOULD report a malformed **numeric** literal (such as `0o89` or `0xGH`)
> as a coded syntax error. The reference implementation currently raises an uncoded internal
> error for some of these — a known gap.

## Validation errors

Raised while validating data against a schema. They describe values that do not satisfy the
schema. Representative codes:

| Code | Condition |
| ---- | --------- |
| `invalid-type` | value is not of the declared type |
| `not-a-bool` / `not-a-string` | value is not a boolean / string for that field |
| `invalid-range` | number/date outside `min`/`max` |
| `out-of-range` / `invalid-length` | array/string length outside `minLen`/`maxLen`/`len` |
| `invalid-min-length` | string/array shorter than the minimum |
| `invalid-choice` | value is not one of `choices` |
| `invalid-pattern` | string does not match `pattern` |
| `invalid-email` / `invalid-url` | malformed email/URL |
| `invalid-scale` / `invalid-precision` | decimal scale/precision violated |
| `value-required` | a required field is missing |
| `null-not-allowed` | `null` given for a non-nullable field |
| `additional-values-not-allowed` | extra values without an open (`*`) schema |

> Error **codes are stable**; messages and exact positions may vary between implementation
> versions. Tooling should branch on the code, not the message.

## Definition errors

A third small group arises from header references: `schema-not-defined`,
`variable-not-defined` (see [Error Handling in Definitions](../the-definitions/error-handling.md)).

## See Also

- [Parser Behavior & Recovery](parser-behavior.md) · [Error Accumulation](error-accumulation.md)
- [Conformance Requirements](../conformance/requirements.md)
