---
status: candidate
description: The header section — schemas, definitions, variables, and metadata.
---

# Header

The header sits at the beginning of an Internet Object document and defines the schema and
definitions for the data that follows. It carries the metadata, context, variables, and schema
references needed to interpret the data consistently. By stating this information once, up
front, the header keeps the data section compact and unambiguous.

## Default schema

A schema defines the structure and meaning of the data in a document. When the header contains
only a schema — with no other definitions — that schema is the document's *default schema*. It
describes the shape of the data while keeping the structure separate from the data itself,
which makes the data more compact and easier to process.

```ruby
name, age: int, address, isActive?, remark
---
```

This header declares five members:

1. **`name`** — an untyped member, typically a string.
2. **`age: int`** — an explicitly typed member that must hold an integer.
3. **`address`** — an untyped member that may hold a string or a nested object.
4. **`isActive?`** — the `?` suffix marks the member as optional; it may be omitted from the data.
5. **`remark`** — an untyped member, typically a free-text note.

Alongside the structure, the schema records type annotations and optionality, which sharpens
validation and documents the data model in one place. For the full schema syntax, see
[the Internet Object schema](../../schema-definition-language/internet-object-schema.md).

## Definitions

Definitions are key-value pairs declared in the header to hold metadata, variables, reusable
schemas, and other shared values. Each definition is written on its own line, prefixed with
`~`.

```ruby
~ pageSize: 1
~ currentPage: 1
~ recordCount: 4
~ $address: {street, city, state}
~ $schema: {name, age, $address}
---
```

Here the header mixes response metadata with schema definitions instead of using a default
schema. The metadata records the page size (`pageSize`), the current page (`currentPage`), and
the total record count (`recordCount`). It also defines a reusable address shape (`$address`)
with the members `street`, `city`, and `state`, and a top-level schema (`$schema`) that
references it. The `$schema` key is reserved: it names the default schema applied to the data
section.

For the full treatment of metadata, value variables (`@`), and references (`$`) — including
how they are resolved — see the [Definitions](../../the-definitions/definitions.md) chapter.

## See Also

- [Data Sections](data.md) — what follows the `---` separator
- [Definitions](../../the-definitions/definitions.md) — variables and schema references in depth
- [Internet Object Schema](../../schema-definition-language/internet-object-schema.md) — the schema language
