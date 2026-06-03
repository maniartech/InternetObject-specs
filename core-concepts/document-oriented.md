---
description: Header/data separation; documents and records.
---

# Document-Oriented Nature

Internet Object is **document-oriented**: a document is a self-contained unit with two parts —
a **header** and **data** — separated by `---`.

```ruby
~ count: 2
~ $schema: { name: string, age: int }
---
~ John, 30
~ Jane, 25
```

## Header

The header carries everything *about* the data: the **schema**, reusable **definitions**
(variables `@` and references `$`), and document **metadata**. It is parsed once and applies
to the data that follows. See [Definitions](../the-definitions/definitions.md).

## Data

The data section holds the actual values — a **single object** or a **collection** of records.
Because the schema lives in the header, the data stays terse. See
[Data Sections](../the-structure/introduction/data.md).

## Sections

A document may contain multiple named **sections**, each with its own schema — useful for
bundling related datasets (e.g. `people` and `addresses`) in one document. Each section
begins with its own `---` separator, optionally naming the schema it uses:

```ruby
~ $person: { name, age: int }
~ $address: { street, city }
--- $person
~ John, 30
~ Jane, 25
--- $address
~ Main St, NYC
```

## Why it matters

- **Separation of concerns** — structure and metadata are stated once, apart from the data.
- **Compactness** — records repeat values, not keys.
- **Streaming** — records after the header can be produced and consumed incrementally.

## See Also

- [Internet Object Document](../the-structure/introduction/README.md)
- [Schema-First Design](schema-first.md)
