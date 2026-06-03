---
description: A short, language-agnostic tour of Internet Object in pure IO.
---

# Getting Started

This is a five-minute tour of Internet Object (IO) using the format itself — no programming
language required.

## 1. A single object

The simplest document is one object. Fields are comma-separated; the header line names them:

```ruby
name: string, age: int, email: email
---
John Doe, 30, john@example.com
```

Above the `---` is the **header** (here, the schema); below it is the **data**. Because the
schema fixes the field order, the data is just values — no repeated keys.

## 2. A schema and a collection

Define the schema once in the header with `$schema`, then stream many records, each beginning
with `~`:

```ruby
~ $schema: { name: string, age: int, email: email, active: bool }
---
~ John Doe, 30, john@example.com, T
~ Jane Doe, 25, jane@example.com, F
```

`T`/`F` are booleans. A collection of records shares one schema — compact and validated.

## 3. Constraints

Fields can carry constraints. Invalid data is reported, not silently accepted:

```ruby
~ $schema: { name: string, age: { int, min: 0, max: 120 } }
---
~ John, 30      # ✓
~ Mary, 200     # ✗ invalid-range
```

## 4. Nesting and reuse

Define a shape once and reference it with `$`:

```ruby
~ $address: { street, city }
~ $schema: { name: string, address: $address }
---
~ John, { Main St, NYC }
```

## 5. Metadata

Header keys without a prefix carry document metadata, kept separate from the data:

```ruby
~ count: 2
~ $schema: { name, age: int }
---
~ John, 30
~ Jane, 25
```

## Where to next

- [Why Internet Object?](why-internet-object.md) — how it compares to JSON and others
- [Internet Object Document](../the-structure/introduction/README.md) — header and data in depth
- [Internet Object Schema](../schema-definition-language/internet-object-schema.md) — the schema language
- [Collections](../the-collections/collection.md) — records and streaming
