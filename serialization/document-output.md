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

### A root value that is not a record

A data section may hold a value that is not an object, and IO promotes it into a record under its
positional key: `---` followed by `[1, 2, 3]` decodes as `{ "0": [1, 2, 3] }`
([Data Sections](../the-structure/introduction/data.md)).

A writer converting foreign data **MUST** bind such a value to that same positional member. Naming
it anything else produces a document that decodes differently from the identical text written by
hand:

```ruby
# input [1, 2, 3] — REQUIRED: decodes as { "0": [1, 2, 3] }, as hand-written IO would
"0": [number]
---
[1, 2, 3]
```

Both forms below parse; the second is wrong because it *decodes* differently. An invented member
name (`value: [number]` … `[1, 2, 3]`) yields `{ value: [1, 2, 3] }`, so the same data written by
the library and by hand would disagree.

An array whose items are **records** is a collection and needs no promotion: each record becomes a
row. Promotion applies only where there are no names to bind to — an array of scalars, an array of
arrays, or a bare scalar.

### Member names in the header

A member name is quoted by the same rules as a data key
([Value Formatting](value-formatting.md#keys)). Since the `?` and `*` suffixes belong to the
bare-name token, a writer that quotes a name **MUST** expand that member to the long MemberDef
form:

```ruby
# member "a,b": an optional, nullable number
"a,b"?*: number                              # ✗ not valid syntax
"a,b": { number, optional: T, "null": T }    # ✓ what a writer emits
```

Bare names are unaffected — `age?*: number` is written as it stands. Appending a suffix to a
quoted name produces a header the writer's own reader rejects with `invalid-definition`.

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

A section name is a bare name — letters, marks, digits, `-` and `_` — and it is the one name in
the format that **cannot be quoted**, because the separator line runs to the end of the line and
nothing would bound it.

That makes the multi-section layout unavailable for some data. When a key falls outside the set,
a writer **MUST NOT** emit it as a section name and **MUST** fall back to a single section, where
the same key is an ordinary member name and may be quoted:

<!-- io:test skip -->
```ruby
# data: { "code:en": […], "a,b": […] }
# WRONG - `--- code:en: $a` reads back as a section named `code`, and the rest fails
--- code:en: $a

# RIGHT - one section; the keys are member names
--- $schema
{ "code:en": […], "a,b": […] }
```

This is the general rule of [Round-trip](round-trip.md) applied to one construct: **a writer must
never emit text its own reader cannot read.** A leading space is the case worth remembering — it is
not part of the name, and a reader that absorbs it changes the data without reporting anything.

## See Also

- [Objects](../the-structure/values/object.md) — record enclosure and the reading rule
- [Data Sections](../the-structure/introduction/data.md) · [Header](../the-structure/introduction/header.md)
- [Collection](../the-collections/collection.md)
