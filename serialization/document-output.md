---
status: candidate
description: Writing records, record enclosure, headers, and data sections.
---

# Record & Document Output

[Key Emission](key-emission.md) and [Value Formatting](value-formatting.md) settle how the
pieces are written. This page settles how they are assembled into records, sections, and a
document.

## Records

A **record** is one row of data — a `~` item in a collection, or the single object of an
object section. Its members are written in schema order, separated by `, `.

```ruby
name: string, age: int
---
~ John, 30
~ Mary, 25
```

### Absent members hold their place

A declared member that is absent, optional, and has no default is written as an **empty
position**, so that later members are not read into the wrong slot:

```ruby
# schema: { a: string, b?: number, c: string }   value: a = p, c = q
{p, , q}          # correct — c stays in slot 2
{p, q}            # WRONG — q would be read as b
```

Trailing empty positions carry no information and are trimmed.

### Record enclosure

A record's own braces are optional: `x, 4` and `{x, 4}` are the same record. But when a record
consists of exactly **one value and that value is an object**, the braces become ambiguous —
a reader may take them as the record's own enclosure rather than as the value.

A writer **MUST** therefore enclose such a record explicitly:

```ruby
# schema: { o1: object, o2?: object }   value: o1 = { key: val }
{{key: val}}      # correct — outer braces are the record, inner are the value
{key: val}        # ambiguous — leaves the reading to the first-key rule
```

The full reading rule lives with the value syntax; see
[Record enclosure under schema validation](../the-structure/values/object.md#record-enclosure-under-schema-validation).
A writer does not rely on that rule — it always emits the unambiguous form.

## Documents

A document is a **header**, a `---` separator, and one or more **data sections**. Whether the
header travels with the data is a writer choice:

| Header | Output |
| ------ | ------ |
| omitted | data only, **no separator** — the schema is assumed known at the endpoint |
| included | header, `---`, then the data |

```ruby
# header omitted
John, 30

# header included
name: string, age: int
---
John, 30
```

A writer **MUST NOT** infer a header the document does not carry. When a schema-less document
is written *with* the header included, the header is **empty** but the `---` separator is
still emitted, so the first token of the data is unambiguous:

```ruby
---
a: 1
```

The data then follows the no-schema rules in [Key Emission](key-emission.md) — every name is
unrecoverable, so every name is written.

### Header and data are separately addressable

Because the two parts are independent, a writer **SHOULD** expose them separately as well as
combined: the schema can then be published, cached, or versioned on its own while records stay
lean. Composing the header, a blank line, and the data reproduces the whole document exactly.

## Sections

A section is introduced by `---`. A section may be **named**, **schema-bound**, or both:

| Form | Meaning |
| ---- | ------- |
| `---` | an unnamed section using the default schema |
| `--- $Schema` | an unnamed section bound to a named schema |
| `--- name: $Schema` | a named section bound to a named schema |

A multi-section document writes each section in order. A writer **SHOULD** separate the header
and each named or schema-bound section with a blank line; blank lines are insignificant to a
reader, so this affects legibility only.

```ruby
~ $accounting: {n: string, a: number}
~ $sale: {n: string, a: number}

--- accounting: $accounting
~ John, 23

--- sales: $sale
~ Sal, 27
```

A section name is an identifier: letters, digits, `_` and `-`. It **MUST NOT** contain a dot
or other separator, and it cannot be quoted.

## See Also

- [Objects](../the-structure/values/object.md) — record enclosure and the reading rule
- [Data Sections](../the-structure/introduction/data.md) · [Header](../the-structure/introduction/header.md)
- [Collection](../the-collections/collection.md)
