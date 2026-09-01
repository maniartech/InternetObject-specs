---
status: candidate
description: How each scalar, string, and key is written so that it reads back unchanged.
---

# Value Formatting

A writer **MUST** preserve a value's **type**, not merely its printed appearance. `42` and
`42n` print similarly and mean different things; a string that looks like a number must not
read back as a number. This page fixes the written form of every value kind.

## Type-preserving scalars

| Type | Written as | Note |
| ---- | ---------- | ---- |
| number | `42`, `3.14`, `-7` | plain literal |
| bigint | `42n` | the `n` suffix is **required**, or it reads back as a number |
| decimal | `3.14m` | the `m` suffix is **required**, or it reads back as a number |
| boolean | `T` / `F` | `true` / `false` are also valid |
| null | `N` | `null` is also valid |
| datetime | `dt"2024-03-20T14:30:00.000Z"` | also `d"…"` (date) and `t"…"` (time) |
| binary | `b"SGVsbG8="` | base64 payload |
| special numbers | `Inf`, `-Inf`, `NaN` | the literals the grammar defines |

```ruby
b: 42n, d: 3.14m, t: T, f: F, n: N, dt: dt"2024-03-20T14:30:00.000Z"
```

A member may declare a **presentation** option that selects a spelling — `format` on the numeric
and string types, plus `encloser` and `escapeLines` on strings. These are
[write-only](../schema-definition-language/memberdef.md#constraints-and-presentation): a writer
**MUST** honor them, and a reader **MUST NOT** enforce them.

A numeric value carrying a radix `format` (hex, octal, binary) is written in that base **with its
base prefix and its type suffix** — `0xffn`, not `ff` — so that the output still reads back as
the same typed value. A `format` selects a **base**, never a type, and never licenses output that
the member's own schema would reject. A sign is written **before** the base prefix (`-0xff`). A
value with a fractional part has no radix literal, so a radix format does not apply to it and the
decimal spelling is written instead.

Where no schema is available, a writer chooses the spelling itself, under one rule: **infer only
what the value evidences.** Any spelling that re-parses to an equal value is permitted; a writer
**MUST NOT** guess a form the value does not support. A notation such as hex is *not* part of the
value — `0xff` and `255` parse identically — so a schema-less number is written in decimal.

### Temporal kind

The three temporal types share one value — an instant — but not one literal. A writer
**MUST NOT** normalize everything to `dt"…"`; it selects the literal in this order:

1. **A declared type wins.** Under a schema, `date` writes `d"…"`, `time` writes `t"…"`, and
   `datetime` writes `dt"…"`. The kind is a [type name, not a
   format](../schema-definition-language/data-types/date-and-time.md), so it is never inferred
   when it has been declared.
2. **Otherwise, infer from the value** — under the same "infer only what the value evidences"
   rule above. An instant whose time component is entirely zero evidences a `date`; one whose
   date component is the time-only sentinel `1900-01-01` evidences a `time`; anything else is a
   `datetime`.

```ruby
d"2024-03-20"                   # no schema -> written d"2024-03-20"
t"14:30:00"                     # no schema -> written t"14:30:00"
dt"2024-03-20T14:30:00.000Z"    # no schema -> written dt"2024-03-20T14:30:00.000Z"
```

Inference is **value-preserving but not text-preserving**: a datetime that happens to fall at
midnight is written `d"…"`, and one on `1900-01-01` is written `t"…"`. Each re-parses to the
very same instant, so [round-trip](round-trip.md) holds — only the spelling may differ from the
input text. Declare the type when the spelling matters.

## Strings

A string is written in the leanest form that reads back **as the same string**. A writer
chooses among three forms:

| Form | Written as | When |
| ---- | ---------- | ---- |
| open | `John` | the default — no quoting needed |
| regular | `"John"` | the value would otherwise be ambiguous or malformed |
| raw | `r"C:\path"` | the value contains characters that would need heavy escaping |

A string **MUST** be quoted when leaving it open would change how it reads back. There are two
ways that happens, and both are the writer's responsibility: the text may read back as a
**different value**, or it may fail to read back **at all**.

That is the case when the string:

- is **empty**;
- **looks like a number** — `3.14`, `007`, `-5`, `.5`;
- **carries a base prefix and does not decode** — `0x123FG`, `0b`. A base prefix
  [announces a base](../the-structure/values/number/number.md#a-number-or-a-word-that-begins-with-a-digit),
  so a bare `0x123FG` is read as `invalid-number` rather than as text. Quoting is what tells the
  reader this is a string, and it is the only thing that can. A run carrying **no** marker is not
  in this class however numeric it looks — `1e` and `1.23ee4` read back as themselves and are
  written bare;
- **is a keyword** — `T`, `F`, `N`, `true`, `false`, `null`;
- **looks like a date or time** — `2024-03-20`, `14:30:00`;
- contains a **comma**, or a structural character that would end the value;
- contains a **section separator** (`---`), which would otherwise split the document;
- has **leading or trailing whitespace**, which an open string loses on re-parse.

```ruby
a: "  pad  ", b: "3.14", c: "T", d: "has, comma", e: "0x123FG"
```

Ordinary codes and identifiers need none of this. A writer emits them **bare**, because they read
back as themselves:

```ruby
---
013ABSD, 12mm, 3pm, 1.2.3, 10.0.0.1, 007th, 1e, 1.23ee4
```

The test is precise on purpose: quote a string when the bare text would read back as a **number**
(Rule 1) or as an **error** (Rule 2), and not otherwise. Quoting everything that begins with a digit
is safe but wrong for a format whose output is meant to be lean — and it hides tokenizer defects,
because a quoted value never exercises the path a bare one takes.

A string containing characters that would need heavy escaping — a literal newline, many
backslashes — is written as a **raw** string instead: `r"line1
line2"`.

> **Known gap.** A string **beginning with `@` or `$`**
> currently cannot exist as data at all: the reference *parser* resolves it as a variable or
> schema reference even when quoted (`"@ref"`, `r'@ref'`), and fails. The parser fix is
> tracked with [Parsing & Errors](../parsing-and-errors/README.md); once representable, such
> strings **MUST** be written quoted.

## Keys

When [Key Emission](key-emission.md) decides a key is written, the key itself follows the same
principle: it **MUST** be quoted whenever writing it bare would not read back as that key.

A key is written bare only if it is an identifier-like open string. It **MUST** be quoted when
it:

- is **numeric** — `"5"`, `"3.14"`;
- is a **keyword** — `"null"`, `"true"`, `"false"`, `"N"`, `"T"`, `"F"`;
- contains a **colon**, comma, brace, bracket, or quote — `"a:b"`;
- contains a **section separator** (`---`) — `"a---b"`;
- has **leading or trailing whitespace**.

```ruby
"5": a, "null": b, "a:b": c, "true": d, "a---b": e, plain: f
```

> Keys drawn from foreign data — imported JSON, locale tags such as `code:en` — routinely
> contain colons. A writer that emits them bare produces output that cannot be re-parsed.

## Containers

- **Arrays** are written `[ … ]`, elements formatted by these same rules. An array whose
  element type is a schema writes each element positionally.
- **Objects** are written `{ … }` and are always enclosed — only a top-level record may use
  the open form. See [Record & Document Output](document-output.md).
- An **untyped object** (a member declared `object` with no shape) has no schema to recover
  its member names from, so its members are written **keyed**.

## See Also

- [Strings](../the-structure/values/string/README.md) · [Numeric Values](../the-structure/values/number/README.md)
- [Binary](../the-structure/values/binary.md) · [Date and Time](../the-structure/values/date-and-time.md)
- [Key Emission](key-emission.md) — whether a key is written at all
