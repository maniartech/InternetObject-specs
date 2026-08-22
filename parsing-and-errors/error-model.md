---
status: candidate
description: The catalogue of error codes, grouped by class and by the kind of fault.
---

# Error Model

Internet Object defines two classes of error, matching the stages that produce them. Each reported
error carries a stable **error code**, a human-readable message, and the **position** in the source
where it occurred.

| Class | Produced by | Describes |
| ----- | ----------- | --------- |
| **Syntax error** | tokenizing and parsing, before any schema applies | malformed *text* |
| **Validation error** | validating data against a schema | a *value* the schema does not accept |

The classes recover differently — syntax errors are bounded by structure, validation errors by the
record — which [Parser Behavior & Recovery](parser-behavior.md) and [Error Accumulation](error-accumulation.md)
describe.

Codes are named by the rule in [Error Codes](error-codes.md): `<predicate>-<subject>`, predicate
drawn from a closed vocabulary. This page catalogues the codes themselves.

## Two invariants

These matter more than any individual code, because breaking either loses data **silently**:

- A parser **MUST NOT** accept a prefix of a malformed construct and discard the remainder. A
  truncated name that parses is worse than a rejected one, because nothing reports it.
- Every reported error **MUST** carry a code. An error that reaches a caller without one cannot be
  branched on and renders as a blank in tooling.

Error **codes are stable**; messages and exact positions may vary between implementations and
versions. Tooling branches on the code, never on the message.

## Syntax errors

### Structure

| Code | Condition |
| ---- | --------- |
| `expected-closing-bracket` | a `{`, `}`, `[`, or `]` is missing |
| `unexpected-token` | a token appears where the grammar does not allow it |
| `unexpected-positional-member` | a positional value follows a keyed one in an object |
| `expected-value` | the grammar requires a value here and none is present — a key with nothing after it, or input that ends mid-record. Distinct from `missing-value`, which is the *validation* sense: see [Presence and membership](#presence-and-membership) |
| `duplicate-section-name` | two sections share a name. A **structural** fault, not a lexical one; the duplicate is [renamed](error-accumulation.md#duplicate-section-names) so the document still loads |
| `invalid-section-name` | a section name contains a character outside the [bare-name set](../the-structure/introduction/data.md#section-names-are-bare-names). A section name cannot be quoted, so there is no escape hatch |

### Literals

Each of these means the literal is *recognizably* of its kind and **malformed** — a value that is
not that kind at all is a validation error (`expected-datetime`), not a syntax error.

A literal is recognizable by its **marker**, and the code names the type that marker claims. Reading
the two columns together is what makes a missing code visible:

| Marker | Claims | Malformed |
| ------ | ------ | --------- |
| `0x` `0o` `0b` | number | `invalid-number` |
| `m` suffix | decimal | `invalid-decimal` |
| `n` suffix | bigint | `invalid-bigint` |
| `dt'…'` | datetime | `invalid-datetime` |
| `d'…'` | date | `invalid-date` |
| `t'…'` | time | `invalid-time` |
| `b'…'` | binary | `invalid-binary` |

A run carrying **no** marker claims nothing, and is an
[open string](../the-structure/values/number/number.md#a-number-or-a-word-that-begins-with-a-digit)
however numeric it looks — `1.2.3` and `10.0.0.1` are values, not broken numbers.

| Code | Condition |
| ---- | --------- |
| `unterminated-string` | a quoted string has no closing quote |
| `invalid-escape-sequence` | an escape the string grammar does not define |
| `invalid-datetime` | a `dt'…'` literal does not parse |
| `invalid-date` | a `d'…'` literal does not parse |
| `invalid-time` | a `t'…'` literal does not parse |
| `invalid-decimal` | a decimal literal is malformed, e.g. a `m` suffix on a broken mantissa |
| `invalid-bigint` | a bigint literal is malformed, e.g. `12.3n` |
| `invalid-binary` | a binary literal's content is not valid base64. The subject is the **type** the marker claims, as everywhere else in this table; `base64` is an encoding, not a type |
| `unknown-annotation` | an annotation outside the closed set `r`, `b`, `dt`, `d`, `t` |
| `invalid-number` | a numeric literal of recognizable shape that does not decode: a base prefix with no digits (`0x`, `0b`), digits outside the radix (`0o89`, `0xGH`), more than one decimal point (`1.2.3`), or an exponent with no digits (`1e`) |

> A base prefix **announces** a base, which is what separates a failed number from ordinary text:
> `0xGH` is a broken hex literal, while `12mm` and `013ABSD` are perfectly good [open
> strings](../the-structure/values/string/open-strings.md). The full rule, with the quoting escape
> hatch, is in
> [Numbers](../the-structure/values/number/number.md#a-number-or-a-word-that-begins-with-a-digit).

### Schema text

The header is text too, so a malformed schema is a syntax error.

| Code | Condition |
| ---- | --------- |
| `invalid-schema` | the schema is not a well-formed schema definition |
| `invalid-memberdef` | a member definition is malformed |
| `empty-memberdef` | a member definition is present but empty — distinct from malformed |
| `invalid-definition` | a header definition is malformed |
| `invalid-key` | a key is not a legal member name |
| `missing-schema` | a `---` separator promises a schema and none follows |

## Validation errors

### Wrong type

One code per type, so a missing one is visible as a gap in the list — which is how
`expected-date` and `expected-time` were found absent, with `expected-datetime` serving all three
temporal types.

| Code | Applies to |
| ---- | ---------- |
| `expected-string` · `expected-number` · `expected-integer` · `expected-decimal` · `expected-bigint` · `expected-boolean` · `expected-object` · `expected-array` | the value is not of the declared type at all |
| `expected-datetime` · `expected-date` · `expected-time` | as above, for each temporal type separately |

`binary` has no `expected-binary`. It is a base type in this specification, but no implementation
registers it as a *schema* type yet, and a code nothing can emit is a promise the registry cannot
keep. It lands with the type.

### Declared constraints

A **well-formed** value that violated something the schema author wrote. Each code names the
keyword, so the reader knows which line of the schema rejected the data.

| Code | Violated keyword |
| ---- | ---------------- |
| `mismatched-min` / `mismatched-max` | `min` / `max` |
| `mismatched-min-len` / `mismatched-max-len` / `mismatched-len` | `minLen` / `maxLen` / `len` — for strings, arrays and binary |
| `mismatched-pattern` | `pattern` |
| `mismatched-choice` | `choices` |
| `mismatched-multiple-of` | `multipleOf` |
| `mismatched-precision` / `mismatched-scale` | `precision` / `scale` |
| `mismatched-any-of` | `anyOf` — no branch matched |

### The type's own range

| Code | Condition |
| ---- | --------- |
| `out-of-range-integer` | the value does not fit the declared type — `int8` given `200`, where no bound was declared. Distinct from `mismatched-max` because the fix differs: widen the type, rather than change the data |

### String sub-formats

`email` and `url` are *types*, not constraints, so a non-conforming value is malformed for that
type — `invalid-`, like `invalid-datetime`.

| Code | Condition |
| ---- | --------- |
| `invalid-email` / `invalid-url` | the value is not a well-formed email address / URL |

### Presence and membership

| Code | Condition |
| ---- | --------- |
| `missing-value` | a required member is absent — a *presence* problem, not a type problem |
| `forbidden-null` | `null` given where the member is not nullable |
| `unknown-member` | a **strict** schema was given a member it does not declare: a surplus positional value, a surplus named member, or a MemberDef option the type does not define. A MemberDef is itself validated against the type's own member schema, so that last case is the same rule one level up |
| `duplicate-member` | a member name appears more than once |
| `invalid-object` | a structural fault in a value that *is* an object — a wrong-*type* value is `expected-object` |

### Type names

| Code | Condition |
| ---- | --------- |
| `unknown-type` | a schema names a type that does not exist |
| `reserved-type` | a schema names a type this specification **reserves** for a future version: `int64`, `uint64`, `float32`, `float64` |

### Resolution

| Code | Condition |
| ---- | --------- |
| `undefined-schema` | a schema was named — by a `$` reference in the document, or by the caller — and nothing is defined under that name |
| `undefined-variable` | a `@` reference names a variable no definition provides. Sibling of `undefined-schema`: same resolution moment, same mechanism, so the same class |
| `missing-definitions` | a `$` reference was used where no definitions were supplied at all. Distinct from `undefined-schema`: nothing to look in, versus looked and not found |

See [Error Handling in Definitions](../the-definitions/error-handling.md) for how references
resolve.

## Implementation status (beta)

Everything above is normative. These are the places the reference implementation has not caught up,
listed here rather than inside the tables so that the catalogue reads as one specification:

| Code | Status |
| ---- | ------ |
| `invalid-section-name` | **Not emitted.** The reader truncates the name at the first illegal character instead — the more dangerous of the two behaviours, since a truncated name that parses is reported by nothing |
| `expected-binary` | Reserved, not declared — `binary` is not yet registered as a schema type |

## See Also

- [Error Codes](error-codes.md) — how codes are named, and why
- [Parser Behavior & Recovery](parser-behavior.md) · [Error Accumulation](error-accumulation.md)
- [Conformance Requirements](../conformance/requirements.md)
