---
description: The schema-first philosophy — same-syntax schemas, progressive typing, and reuse.
---

# Schema-First Design

Internet Object is **schema-first**: you declare the shape of the data up front and the data
conforms to it. Where some formats leave structure implicit (JSON infers it from each value) or
external (JSON Schema lives in a separate file and language), Internet Object writes the schema
in the **same object syntax as the data** — there is no second language to learn: if you can
write the data, you can write its schema. That schema can travel inside the document or be
shared between endpoints (see [Where the schema lives](#where-the-schema-lives)).

Declaring the shape first is the idea that makes the rest of the format possible. Once the
**structure** — the keys and their types — lives in the schema, the data no longer has to carry
it: each record holds only **values**, while the names and types stay in one place. And because
every value now has a declared type and constraints, the format can **validate** the data
against that shape. Separating the data from its structure and validating it are not two
unrelated features — they are both direct consequences of putting the schema first.

## Why declare a schema first

Putting the shape first changes what the format can do for you:

- **Validation** — every value is checked against its type and constraints. Errors are precise:
  reported per field and per record, each with a stable [error code](../parsing-and-errors/error-model.md).
- **Compactness** — field names and types are stated once in the header instead of being
  repeated on every record, so the data section stays terse.
- **Self-documentation** — the schema is a precise, readable contract that describes the data
  better than prose can, and travels with it.
- **Tooling** — a declared shape is what lets editors complete fields, generators emit types,
  and converters map cleanly to and from other formats.
- **Fewer ambiguities** — a value's type and meaning are fixed by the schema, not guessed from
  how it happens to be written.

## A schema is just an object

A schema is written with the same grammar as data — members, positional or keyed, nesting, and
arrays. Each member of the schema describes the corresponding value of each record:

```ruby
~ $schema: { name: string, age: int }
---
~ John, 30
```

Here the schema has two members, `name` and `age`. The record supplies two positional values,
which map in order: `John` → `name`, `30` → `age`. The reserved key `$schema` marks this object
as the document's default schema.

## Progressive typing

You adopt **as much structure as you need**, and tighten it over time without changing the
data's shape. The same field can be untyped, typed, or typed and constrained:

```ruby
# untyped — accepts any value
name, age

# typed
name: string, age: int

# typed and constrained
name: { string, maxLen: 100 }, age: { int, min: 0, max: 120 }
```

On top of the type, **member modifiers** express optionality, nullability, defaults, and
allowed values:

```ruby
name: string, nickname?: string, age*: int, role: { string, guest, [guest, admin, owner] }
```

`nickname?` is optional (it may be omitted), `age*` is nullable (it may be `null`), and `role`
has a default of `guest` and is restricted to the listed `choices`. Start loose while
prototyping; move to typed and constrained schemas for production — the data you already have
keeps working. The full rules live in [MemberDef](../schema-definition-language/memberdef.md)
and [TypeDef](../schema-definition-language/typedef.md).

## Where the schema lives

A schema-first format does **not** require the schema to be embedded in every document. Two
deployment modes are both first-class, and you choose per use case.

**Embedded (self-contained).** The schema sits in the document header, so the document is
self-describing and self-validating — a receiver validates exactly what was sent, with no prior
agreement. Best for storage, archival, logs, and APIs where the shape can vary.

```ruby
~ $schema: { name: string, age: { int, min: 0, max: 120 } }
---
~ John, 30      # ✓
~ Mary, 200     # ✗ invalid-range
```

**Shared (out-of-band).** A publisher and a subscriber can agree on the schema once, at their
endpoints, and then move only **data** on the wire. Each message carries just its data section;
its header, if present, holds metadata and definitions — but not the schema — and the consumer
validates against the schema it already holds. This is the most compact mode and suits
high-volume streaming between known parties.

```ruby
~ count: 2
---
~ John, 30
~ Mary, 25
```

Either way the data conforms to the *same* schema, written in the same syntax; only its location
differs. And in both modes each record is validated **independently**, so one bad record does
not invalidate the others — the processor reports the failure and keeps going. See the
[Validation Model](../conformance/validation-model.md) for the parse → validate → load pipeline,
and [Data Streaming](../the-collections/data-streaming.md) for the streaming case.

## Reuse and composition

Shapes and values are defined once and referenced by name, keeping schemas DRY. A reference
(`$name`) names a reusable shape; the schema then points at it wherever that shape recurs:

```ruby
~ $address: { street, city }
~ $schema: { name: string, home: $address, office?: $address }
---
~ John, { Main St, NYC }, { 5th Ave, NYC }
```

`home` and `office` both reuse the `$address` shape, defined in one place. References resolve
after the whole header is read, so their order is not significant. See
[Schema References](../the-definitions/schema-references.md) and
[Open & Dynamic Schemas](../schema-definition-language/dynamic-schema.md).

## Schema-first, not schema-required

Schema-first is the *recommended* default, not a hard requirement. A document with no schema is
still valid — its values are simply accepted and mapped to positional keys (`0`, `1`, `2`, …):

```ruby
---
~ John, 30
~ Jane, 25
```

This is handy for quick, exploratory, or fully self-evident data. Reach for an explicit schema
once the data has a stable shape, leaves your control, or needs validation — see
[Best Practices & Guidelines](../best-practices.md).

## See Also

- [Document-Oriented Nature](document-oriented.md) — the other half of the model
- [Internet Object Schema](../schema-definition-language/internet-object-schema.md) — the schema language in full
- [Schema References](../the-definitions/schema-references.md) · [MemberDef](../schema-definition-language/memberdef.md)
- [Why Internet Object?](../internet-object/why-internet-object.md) — how it compares to JSON, CSV, and YAML
