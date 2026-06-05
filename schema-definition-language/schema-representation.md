---
status: candidate
description: How a schema is written and how data is mapped to it — open/closed, positional/keyed, and the default schema.
---

# Schema Representation

A schema is written in the same object syntax as data. This page covers how to write one and
how a document's data is mapped to it. For the building blocks of a schema, see the
[Overview](internet-object-schema.md); for types and constraints, see
[Schema Data Types](data-types/README.md) and [MemberDef](memberdef.md).

## Open and closed schema objects

A **top-level** schema may be written in open form, without surrounding braces:

```ruby
name, age, address
---
John, 30, { Main St, NYC }
```

A **nested** object member must be enclosed in braces, because the braces are what mark the
value as an object:

```ruby
name: string, address: { street: string, city: string }
---
John, { Main St, NYC }
```

A member with no type defaults to `any`, so `name, age, address` is shorthand for three `any`
members. See the [any](data-types/any.md) type.

## How data maps to a schema

Every schema member has a name. A data object can supply its values **positionally** (matched
to the schema's members in order) or **by key**:

```ruby
~ $schema: { name: string, age: int }
---
~ John, 30                # positional: maps to name, age
~ { name: Mary, age: 25 } # keyed: maps by name
```

### Mixing positional and keyed values

Within one object, positional values MUST come before any keyed values. Once a keyed value
appears, every later value MUST also be keyed. A positional value after a keyed one fails:

```ruby
~ $schema: { name: string, age: int }
---
~ { John, age: 30 }       # ✓ positional then keyed
~ { name: John, 30 }      # ✗ unexpected-positional-member
```

> Prefer positional data only when all members are required and the order is unambiguous;
> otherwise use keyed values for clarity and resilience to schema changes.

## Nested objects and arrays

A member's type can be a nested object schema or an array. Use `{ … }` for an object and
`[ … ]` for an array; an array's element type goes inside the brackets:

```ruby
~ $schema: {
    name: string,
    address: { street: string, city: string, state: string },
    tags: [string],
    skills: [{ title: string, level: int }]
}
---
~ Jane Doe, { X Street, New York, NY }, [lead, mentor], [{ Coding, 5 }, { Design, 3 }]
```

Here `tags` is an array of strings and `skills` is an array of objects. See
[Array](data-types/array.md) and [Object (SchemaDef)](data-types/object.md) for details.

## Choosing the schema

### The default schema

The default schema is the header definition named **`$schema`**. It is applied to every record
in the data section:

```ruby
~ $schema: { name: string, age: int }
---
~ John, 30
~ Mary, 25
```

The name is case-sensitive: `$Schema` or `$mySchema` is an ordinary reference, **not** the
default. A document with named references but no `$schema` has no default schema.

### Reusable named schemas

Define a shape once with a `$` reference and reuse it by name. Reference a shape with a
**keyed** member (`home: $address`); a bare `$address` in a schema is read as a member literally
named `$address`, not as the referenced shape:

```ruby
~ $address: { street: string, city: string, state: string }
~ $schema: { name: string, home: $address, work?: $address }
---
~ John Doe, { Main St, NYC, NY }, { 5th Ave, NYC, NY }
~ Jane Doe, { Oak Ave, LA, CA }
```

See [Schema References](../the-definitions/schema-references.md) for resolution rules and type
references.

### No schema

When there is no `$schema` — an empty header, or a header with only metadata and references —
each value is mapped to a positional index key (`"0"`, `"1"`, …):

```ruby
---
John Doe, 25, { X-street, California, US }
```

loads as:

```ruby
{ "0": "John Doe", "1": 25, "2": { "0": "X-street", "1": "California", "2": "US" } }
```

## See Also

* [Overview](internet-object-schema.md) — the building blocks of a schema
* [Schema Data Types](data-types/README.md) — the base types and shortcuts
* [MemberDef](memberdef.md) — constraints, optional, nullable, and defaults
* [Schema References](../the-definitions/schema-references.md) — reusable `$` schemas and types
* [Collection Rules](../the-collections/collection.md) — applying a schema across many records
