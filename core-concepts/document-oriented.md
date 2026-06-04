---
description: The document as the unit of exchange — header, data, and sections.
---

# Document-Oriented Nature

Internet Object is **document-oriented**: the unit of exchange is a self-contained *document*,
not a bare value or a loose row. A single document bundles three things that other formats
usually keep apart — the **schema** that describes the data, the **data** itself, and any
**metadata** about it — into one stream. A `---` separator divides the document into two
regions: a **header** and a **data** section.

```ruby
~ count: 2
~ $schema: { name: string, age: int }
---
~ John, 30
~ Jane, 25
```

Everything above `---` is the header (here, a `count` metadatum and the schema); everything
below is the data (two records). The header is read once and governs all the data that
follows.

## Anatomy of a document

A document is two regions separated by a single `---`:

- **Header** — information *about* the data: the schema, reusable definitions, and metadata.
- **Data** — the values themselves: one object, or a collection of records.

The header is **optional**. The simplest document is just a value, with no header and no
separator at all:

```ruby
John, 30
```

As soon as you need a schema, definitions, or metadata, you add a header and close it with
`---`. A document may also be header-*only* (a header followed by `---` with no data) — useful
for sending a schema or configuration on its own.

## The header — information about the data

Each header entry sits on its own line, introduced by a tilde `~`. The header carries three
kinds of thing:

- **Schema** — the shape and types of the data. The reserved key `$schema` names the
  document's *default* schema.
- **Definitions** — reusable building blocks: value variables (`@name`) and references
  (`$name`) that the schema or data can point to.
- **Metadata** — plain keys such as `count`, `status`, or paging fields. Metadata describes
  the payload and is surfaced separately from the data, not mixed into it.

Because the header is parsed once and then applied to every record, the cost of describing the
data is paid a single time, no matter how many records follow. See
[Definitions](../the-definitions/definitions.md) for the full header model.

## The data — the values

The data section holds either a **single object** or a **collection** of records, each record
introduced by `~`. The defining trait is what the records *don't* carry: since the field names
and types live in the header, each record carries only **values**, not repeated keys.

```ruby
~ $schema: { name: string, age: int, city: string }
---
~ John, 30, Phoenix
~ Jane, 25, Dallas
```

Compare this to repeating `"name":`, `"age":`, and `"city":` on every record, as a
key-per-value format would. With no schema at all, the values are still accepted and mapped to
positional keys (`0`, `1`, `2`, …). See [Data Sections](../the-structure/introduction/data.md)
and [Collection](../the-collections/collection.md).

## One document, many sections

A document is not limited to a single dataset. Additional `---` separators introduce further
**sections**, each able to name its own schema — so related datasets travel together in one
document:

```ruby
~ $person: { name, age: int }
~ $address: { street, city }
--- $person
~ John, 30
~ Jane, 25
--- $address
~ Main St, NYC
```

Each section may carry a name, a schema, or both; an unnamed section takes the default name
`data`. This makes one document a natural container for, say, a result set plus its lookup
tables, or several record types from one API response. The precise rules for naming and
selecting section schemas are in [Data Sections](../the-structure/introduction/data.md).

## Self-contained and self-describing

Because a document carries its own schema and metadata, it is **self-describing**: a receiver
can understand and validate exactly what was sent, with no out-of-band agreement.

> **Versus JSON.** JSON transmits data but has no place for a schema or document-level
> metadata — the contract is shipped and versioned separately, and the two can drift apart.
> An Internet Object document keeps the contract and the data in one stream.

> **Versus CSV.** CSV has rows but no types, no nesting, and no metadata. Internet Object
> records are typed by the header and may nest objects and arrays, while staying just as
> compact row-to-row.

For a fuller comparison, see [Why Internet Object?](../internet-object/why-internet-object.md).

## Why it matters

- **Separation of concerns** — structure, metadata, and data are stated in distinct regions,
  so each can be read and reasoned about on its own.
- **Compactness** — keys and types are declared once in the header; records repeat values, not
  names.
- **Self-describing & portable** — schema, metadata, and data move as one unit, so a document
  validates itself wherever it lands.
- **Streaming** — once the header is read, records can be produced and consumed incrementally,
  one at a time, without waiting for the whole document.
- **Many datasets, one document** — sections bundle related data without inventing an envelope
  format.

## See Also

- [Internet Object Document](../the-structure/introduction/README.md) — the document in depth
- [Header](../the-structure/introduction/header.md) · [Data Sections](../the-structure/introduction/data.md)
- [Schema-First Design](schema-first.md) — the other half of the model
- [Why Internet Object?](../internet-object/why-internet-object.md) — how it compares to JSON, CSV, and YAML
