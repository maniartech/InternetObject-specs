---
status: candidate
description: How every Internet Object error code is named, and the closed vocabulary it draws from.
---

# Error Codes

Every error an Internet Object processor reports carries a stable **error code**: a lowercase,
hyphenated identifier such as `expected-string` or `mismatched-max`. Codes are part of the
specification. Messages are not — they may be reworded, translated, or made more helpful at any
time, so tooling **MUST** branch on the code and **MUST NOT** parse the message.

This page defines how codes are named. The codes themselves are catalogued in
[Error Model](error-model.md).

## The rule

> **`<predicate>-<subject>`** — the predicate first, drawn from the closed vocabulary below; then
> the subject it applies to.

```text
expected-string          the predicate is `expected`, the subject is `string`
mismatched-max           the predicate is `mismatched`, the subject is `max`
unterminated-string      the predicate is `unterminated`, the subject is `string`
duplicate-section-name   subjects may be multi-word
```

Putting the predicate first is what makes a *missing* code visible. The predicate vocabulary is
small and fixed; the set of subjects is large. Reading a predicate's codes as one list turns a gap
into something you can see:

```text
expected-string    expected-number    expected-integer   expected-decimal
expected-bigint    expected-boolean   expected-object    expected-array
expected-datetime  expected-date      expected-time
```

Read as one list, a type with no code is a hole you can see. That is not a hypothetical: reading
this list is how `expected-date` and `expected-time` were found missing. One code, `expected-datetime`,
had been serving all three temporal types, so a `date` member given a string reported a type the
schema never mentioned.

One hole remains, deliberately. `binary` is a base type with no `expected-binary`, because no
implementation registers `binary` as a schema type yet — a code that nothing can emit is a promise
the registry cannot keep, so it lands with the type (see [What a code must never
be](#what-a-code-must-never-be)).

## The predicate vocabulary

**A code describing a DOCUMENT may use only these thirteen predicates.** The set is closed: adding
one is a change to this specification, not a decision an implementation may take on its own. That is
what stops synonyms creeping back in — before this rule existed, "the value is the wrong type" was
spelled four different ways.

The rule governs codes about the document — its text, its values, its schema. Conditions of the
**transport** are a separate namespace, `stream-`, defined in
[Streaming: Error Model](../streaming/error-model.md): a buffer limit or an aborted connection is a
fact about the delivery, not about the data, and forcing it into a predicate
(`exceeded-stream-buffer`) obeys the letter of the rule while describing the wrong thing.

| Predicate | Means | Example |
| --------- | ----- | ------- |
| `expected-` | the required **type or token** is absent, or a different one was found | `expected-integer` |
| `invalid-` | present and of the right kind, but **malformed** | `invalid-datetime` |
| `missing-` | a mandatory thing is **absent** | `missing-value` |
| `undefined-` | a referenced **name** has no definition | `undefined-schema` |
| `unknown-` | not a member of an **allowed set** | `unknown-member` |
| `reserved-` | a name this specification **reserves** for a future version | `reserved-type` |
| `duplicate-` | appears more than once | `duplicate-member` |
| `unexpected-` | appears where the grammar disallows it | `unexpected-token` |
| `unterminated-` | an opened construct is never closed | `unterminated-string` |
| `forbidden-` | present but explicitly disallowed | `forbidden-null` |
| `out-of-range-` | a value does not fit the **type's own** range | `out-of-range-integer` |
| `mismatched-` | violated a constraint the **schema author declared** | `mismatched-max` |
| `empty-` | empty where content is required | `empty-memberdef` |

## Choosing the subject

The subject is not always the same *kind* of thing, and which one it is follows a single rule:

> **A type problem names the type. A constraint problem names the constraint.**

```ruby
~ $schema: { age: { int, max: 120 } }
---
~ "thirty"     # ✗ expected-integer  — the TYPE is at fault
~ 200          # ✗ mismatched-max    — the CONSTRAINT is at fault
```

Both values are rejected by the same member, but for different reasons and with different fixes.
The first is not an integer at all. The second is a perfectly good integer that broke a rule the
schema author wrote — and the code names `max`, so the reader knows which line of the schema to
look at.

This is why constraint codes name the keyword rather than the type: **the type is always
recoverable** from the error's position and the schema, but the failed constraint is not
recoverable from the value at all.

Every **value** constraint keyword has exactly one code:

| Keyword | Code |
| ------- | ---- |
| `min` / `max` | `mismatched-min` / `mismatched-max` |
| `minLen` / `maxLen` / `len` | `mismatched-min-len` / `mismatched-max-len` / `mismatched-len` |
| `pattern` | `mismatched-pattern` |
| `choices` | `mismatched-choice` |
| `multipleOf` | `mismatched-multiple-of` |
| `precision` / `scale` | `mismatched-precision` / `mismatched-scale` |
| `anyOf` | `mismatched-any-of` |

Two MemberDef keywords are deliberately absent, because they do not constrain a value's *content*:
`optional: false` is a presence rule and reports `missing-value`, and `null: false` is a nullability
rule and reports `forbidden-null`.

## Four distinctions worth learning

Each of these separates two conditions that look alike and need different fixes.

### `expected-` vs `missing-`

`expected-` is a **type** problem; `missing-` is a **presence** problem.

```ruby
~ $schema: { name: string, age: int }
---
~ John, "thirty"   # ✗ expected-integer — age is present, but is not an integer
~ John             # ✗ missing-value    — age is absent altogether
```

### `expected-` vs `invalid-`

`expected-` means *this is not that type at all*. `invalid-` means *it is that type, and it is
malformed*.

```ruby
~ $schema: { when: datetime }
---
~ "2024-03-20"       # ✗ expected-datetime — a plain string, not a datetime literal
~ dt"not-a-date"     # ✗ invalid-datetime  — a datetime literal that does not parse
```

The same split applies to every type whose literal carries a **marker**, and the marker is what
makes the literal recognizable in the first place:

| Marker | Claims | Not that type at all | That type, malformed |
| ------ | ------ | -------------------- | -------------------- |
| `0x` `0o` `0b` | number | `expected-number` | `invalid-number` |
| `m` | decimal | `expected-decimal` | `invalid-decimal` |
| `n` | bigint | `expected-bigint` | `invalid-bigint` |
| `dt'…'` | datetime | `expected-datetime` | `invalid-datetime` |
| `d'…'` | date | `expected-date` | `invalid-date` |
| `t'…'` | time | `expected-time` | `invalid-time` |
| `b'…'` | binary | *(pending)* | `invalid-binary` |

Read as a grid, a missing cell is visible at a glance — which is how `expected-date`,
`expected-time`, `invalid-date` and `invalid-time` were each found absent, with one code doing the
work of three. The single blank is `expected-binary`, and it is
[deliberate](#what-a-code-must-never-be): no implementation registers `binary` as a schema type
yet, so nothing could emit it.

Note that the subject is always the **type**, never the encoding or the notation: `invalid-binary`,
not `invalid-base64`; `invalid-number`, not `invalid-hex`.

### `out-of-range-` vs `mismatched-`

Both mean "the number is too big", and they need **opposite fixes**.

```ruby
~ $schema: { small: int8, capped: { int, max: 120 } }
---
~ 200, 100     # ✗ out-of-range-integer — 200 does not fit `int8`; widen the TYPE
~ 100, 200     # ✗ mismatched-max       — 200 breaks a declared `max`; fix the DATA
```

`out-of-range-` appears only where the limit is intrinsic to the type and the author declared
nothing. Anything the author wrote is `mismatched-`.

The subject here is the type *family*, not the exact type: the value above overflows `int8`, and the
code says `integer`. That is the one place the subject is deliberately broader than the fault, and it
is a trade the family earns — a code per sized type (`out-of-range-int8`, `-int16`, `-uint32`, …)
would multiply the vocabulary to describe a difference the error's position already carries.

### `undefined-` vs `unknown-` vs `reserved-`

```ruby
~ $schema: { a: $Missing }   # ✗ undefined-schema — referenced, never defined
---
~ 1
```

```ruby
~ $schema: { a: strng }      # ✗ unknown-type — no such type; a typo
---
~ 1
```

```ruby
~ $schema: { a: int64 }      # ✗ reserved-type — a real name, not usable in this version
---
~ 1
```

A typo and a reserved name must not report the same code: one is fixed by correcting the spelling,
the other by choosing a different type until a later version of the specification supports it.

## What a code must never be

- **Never assembled at runtime.** A code built from a value — say, from the declared type name —
  produces identifiers that appear in no registry, that no implementation can be checked against,
  and that a consumer cannot know to expect.
- **Never an implementation limit.** A code meaning "this library has not built that yet" cannot be
  part of a specification: another implementation may support the feature and would then be
  *wrong* for not reporting an error. Genuine implementation limits are reported outside this
  vocabulary, and a conformance suite skips such cases rather than expecting a code.
- **Never absent.** Every reported error carries a code. An error that reaches a caller without one
  cannot be branched on and renders as a blank in tooling, which is no better than reporting
  nothing at all.

## See Also

- [Error Model](error-model.md) — the catalogue of codes, by class
- [Error Accumulation](error-accumulation.md) — reporting many errors in one pass
- [Conformance Requirements](../conformance/requirements.md)
