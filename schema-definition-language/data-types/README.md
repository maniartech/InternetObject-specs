---
status: candidate
description: The Internet Object schema type system — base types, shortcuts, and TypeDefs.
---

# Schema Data Types

A schema constrains each member to a **type**. The type system is small by design: a handful of
**base types**, plus a closed set of **shortcuts** — names that stand for a base type with preset
constraints baked in. Every type is configured through its **TypeDef**, the fixed set of options
it accepts.

## Base types

| Type | Validates | Reference |
|------|-----------|-----------|
| `string` | Text | [String Types](string/README.md) |
| `number` | An IEEE-754 number | [Numeric Types](number/README.md) |
| `bigint` | An arbitrary-precision integer (`123n`) | [BigInt](number/bigint.md) |
| `decimal` | A fixed-precision decimal (`123.45m`) | [Decimal](number/decimal.md) |
| `bool` | `true` / `false` | [Bool](bool.md) |
| `date`, `time`, `datetime` | Temporal values (`d'…'`, `t'…'`, `dt'…'`) | [Date and Time](date-and-time.md) |
| `binary` | Byte data, written as base64 (`b'…'`) | [Binary](binary.md) |
| `object` | A structured shape (a SchemaDef) | [Object (SchemaDef)](object.md) |
| `array` | An ordered list of values | [Array](array.md) |
| `any` | Any value; the default when no type is given | [Any](any.md) |

A member written without a type defaults to `any`, so `name, age` declares two `any` members.

> `date`, `time`, and `datetime` are **their own types**, not subtypes of `string`. Earlier
> drafts described them as string-derived; they are temporal types with their own literal
> values. See [Date and Time](date-and-time.md).

## Shortcuts

A **shortcut** is a built-in name equal to a base type plus preset constraints. It is not a new
type — it is a convenient, validated configuration of a base type. A conformant validator MUST
recognize every shortcut name.

| Base | Shortcuts | Each shortcut is… |
|------|-----------|-------------------|
| `string` | `email`, `url` | `string` with a built-in pattern |
| `number` | `int`, `uint`, `int8`, `int16`, `int32`, `uint8` (`byte`), `uint16`, `uint32` | `number` restricted to whole values in a fixed range |

See [Numeric Types](number/README.md) for the full numeric family and ranges, and
[String Types](string/README.md) for `email` and `url`.

> **Reserved.** `int64`, `uint64`, `float32`, and `float64` are reserved for future use and are
> not yet validated by the reference implementation.

## TypeDef and MemberDef

Each type defines a **TypeDef** — the exact set of options it accepts (for example, `string`
accepts `pattern`, `minLen`, `maxLen`; `number` accepts `min`, `max`, `multipleOf`). Supplying a
type together with chosen options produces a **MemberDef**, the definition of a single member:

```ruby
name:  { string, minLen: 1, maxLen: 100 },   # a string MemberDef
score: { int, min: 0, max: 100 }             # a number MemberDef
---
~ John, 85
```

The first value in a MemberDef is the type; the second is the default; the third is `choices`.
Remaining options are written as `key: value` pairs. An option a type does not define is
rejected. Each type page lists its TypeDef in full.

## See Also

* [Overview](../internet-object-schema.md) — how schemas are built
* [TypeDef](../typedef.md) — the option-contract model
* [MemberDef](../memberdef.md) — types, constraints, optional/nullable/default
* [Numeric Types](number/README.md) · [String Types](string/README.md) · [Date and Time](date-and-time.md)
