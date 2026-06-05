---
status: candidate
description: Why choose Internet Object over JSON, CSV, YAML, and binary formats.
---

# Why Internet Object?

Internet Object is a text-based, schema-first data format for interchange over the internet.
It keeps JSON's readability while removing its biggest costs: repeated keys, no schema, no
comments, and no native streaming.

## The core idea

The same data, in JSON and in IO:

```json
[
  { "name": "John Doe", "age": 30, "email": "john@example.com", "active": true },
  { "name": "Jane Doe", "age": 25, "email": "jane@example.com", "active": false }
]
```

```ruby
~ $schema: { name: string, age: int, email: email, active: bool }
---
~ John Doe, 30, john@example.com, T
~ Jane Doe, 25, jane@example.com, F
```

The keys are stated once in the schema, so each record carries only its values. For
collections of similar objects this is dramatically smaller — closer to CSV's density, but
with types, nesting, and validation.

## How it compares

| Need | JSON | CSV | YAML | Internet Object |
| ---- | ---- | --- | ---- | --------------- |
| Human-readable | ✓ | ✓ | ✓ | ✓ |
| No repeated keys | ✗ | ✓ | ✗ | ✓ |
| Built-in schema & validation | ✗ | ✗ | ✗ | ✓ |
| Nested / structured data | ✓ | ✗ | ✓ | ✓ |
| Comments | ✗ | ✗ | ✓ | ✓ |
| Streaming of records | ✗ | ✓ | ✗ | ✓ |
| Precise numerics (bigint, decimal) | ✗ | ✗ | ✗ | ✓ |
| Dates/times & binary as first-class | ✗ | ✗ | partial | ✓ |

## What you gain

- **Smaller payloads** — keys live in the schema, not in every record.
- **Validation built in** — types and constraints travel with the data; bad values are
  reported with precise errors.
- **Comments** — annotate documents inline with `#`.
- **Collections & streaming** — emit and consume records one at a time.
- **Richer types** — `int`/`uint`/`decimal`/`bigint`, `date`/`time`/`datetime`, `binary`,
  and reusable named types.
- **JSON-compatible where it counts** — quoted-key object syntax is accepted, easing
  migration. See [JSON Compatibility](../json-compatibility.md).

## When JSON is still fine

For one-off, schema-less, small payloads — or where ubiquitous tooling matters most — JSON is
perfectly adequate. Internet Object pays off when you have **many similar records**, want
**validation**, or care about **size and streaming**.

## See Also

- [Getting Started](getting-started.md) · [Objectives](objectives.md)
- [JSON Compatibility](../json-compatibility.md)
