---
description: The two-part structure of an Internet Object document — header and data.
---

# Internet Object Document

Internet Object is a document-oriented format built on a clear separation between a **header**
and **data**. This mirrors how HTTP and MIME keep headers apart from the message body: the
header describes the payload, and the data carries it.

The header is optional and, when present, holds schemas and definitions. The data section
begins with the `---` separator. That separator is the boundary between the two parts: when a
header is present, `---` is required to mark where it ends and the data begins.

## Document shapes

A document can take one of a few shapes depending on whether it carries a header, data, or
both.

### Full document

A document with both a header and a data section is a *full document*. The header declares the
schema; the data conforms to it.

```ruby
name, age: int, address: {street, city, state}, active
---
John Doe, 25, {Bond Street, New York, NY}, T
```

### Data-only document

When the schema is not needed — or is already known to the recipient — a document can carry
data alone. With a single object, the leading `---` is optional:

```ruby
---
John Doe, 25, {Bond Street, New York, NY}, T
```

A collection of records can be written without a separator at all; each record begins with `~`:

```ruby
~ John Doe, 25, {Bond Street, New York, NY}
~ Jane Doe, 48, {Malibu Point 10880, Malibu, CA}
```

### Header-only document

Sometimes a request yields no rows — for example, a query that returns result metadata but an
empty result set. The header carries the metadata, and the `---` separator marks an empty data
section:

```ruby
~ recordCount: 0
~ pageSize: 10
~ currentPage: 1
~ nextPage: N
~ prevPage: N
---
```

### Document with multiple sections

A single document can hold multiple data sections, letting related datasets travel together.
Each section starts with its own `---` separator and names the schema it uses:

```ruby
~ $address: {street, city, state, zip}
~ $person: {firstName, lastName, age, gender}
--- $person
~ John, Doe, 25, M
~ Jane, Doe, 22, F
--- $address
~ Bond Street, New York, NY, 500001
~ George Street, New York, NY, 500002
```

## See Also

- [Header](header.md) — schemas, definitions, and metadata
- [Data Sections](data.md) — separators, objects, and collections
- [Document-Oriented Nature](../../core-concepts/document-oriented.md) — why the split exists
