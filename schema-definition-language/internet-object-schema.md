---
description: How Internet Object schemas describe the shape of data, and the pieces that make them up.
---

# Overview

An Internet Object **schema** describes the shape of the objects in a document: their members,
the type of each value, and the constraints each value must satisfy. A schema is written in the
**same object syntax as the data it validates**, so it is compact, readable, and easy to author
by hand.

> **Schema and data share one syntax.** Unlike map-based schema languages (JSON Schema, XML
> Schema), an IO schema looks like the object it validates. There is no second grammar to learn.

A schema is normally declared once in the [header](../the-structure/introduction/header.md) — as
the default `$schema` or as a reusable `$` reference — and applied to every record in the data
section. Validating a value against a schema either succeeds or produces a stable
[error code](../parsing-and-errors/error-model.md).

## The shape of an object

A schema is a comma-separated list of **members**. In its simplest form it is just a list of
keys; each value then has the `any` type:

```ruby
name, age, address
---
John, 30, { Main St, NYC }
```

Give a member a type by writing `key: type`:

```ruby
name: string, age: int, isActive: bool
---
John, 30, T
```

Add constraints by replacing the bare type with a **MemberDef** — a small object whose first
value is the type and whose remaining entries are constraints:

```ruby
score: { int, min: 0, max: 100 }
---
85
```

A value outside the constraint fails validation with a stable code:

```ruby
score: { int, min: 0, max: 100 }
---
150          # ✗ invalid-range — score is above max
```

Members nest: a member's type can itself be an object schema or an array:

```ruby
name: string, address: { street: string, city: string }
---
John, { Main St, NYC }
```

## The building blocks

A schema is assembled from a few orthogonal pieces. Each has its own reference page:

| Piece | What it does | Reference |
|-------|--------------|-----------|
| **MemberDef** | One member: a type plus its constraints | [MemberDef](memberdef.md) |
| **Data types** | The base types and built-in shortcuts (`string`, `int`, `email`, …) | [Schema Data Types](data-types/README.md) |
| **TypeDef** | The fixed set of options each type accepts | [TypeDef](typedef.md) |
| **Optional, nullable & defaults** | `?`, `*`, and default values | [MemberDef](memberdef.md) |
| **Open & dynamic schemas** | Allowing extra members with `*` and `*: type` | [Open & Dynamic Schemas](dynamic-schema.md) |
| **References** | Reusable schemas and types (`$name`) | [Schema References](../the-definitions/schema-references.md) |
| **Union types** | A value matching one of several types (`anyOf`) | [Union Types](union-types.md) |
| **Composition & reuse** | Building large schemas from small ones | [Composition & Reuse](composition.md) |

The exact placement rules — open vs. closed objects, keyed vs. positional members, and how the
default `$schema` is chosen — are covered in
[Schema Representation](schema-representation.md).

## Optional, nullable, and default members

A member name can carry a marker that changes how a missing or `null` value is treated. These
markers are **first-class schema features**, not informal conventions: a conformant validator
MUST honor them.

- **Optional** (`?`) — the member MAY be omitted from the data.
- **Nullable** (`*`) — the member MAY be `null` (`N`).
- **Both** (`?*`) — the member may be omitted or `null`.
- **Default** — the second value in a MemberDef supplies a value to use when the member is
  omitted (equivalently, the keyed `default:` option).

```ruby
~ $schema: { name: string, email?: string, nickname?*: string, role?: { string, guest } }
---
~ John                          # email & nickname omitted, role defaults to "guest"
~ Mary, mary@x.com, N, admin    # nickname is null, role is "admin"
```

See [MemberDef](memberdef.md) for the full resolution rules and
[Open & Dynamic Schemas](dynamic-schema.md) for accepting members beyond those listed.

## Schema grammar

The shape of a member, informally:

```ebnf
schema    = member ( "," member )*
member    = openMember | [ key modifier? ":" ] typeOrDef
openMember = "*" [ ":" typeOrDef ]
modifier  = "?" | "*" | "?*"
typeOrDef = typeName | ref | memberDef | "{" schema "}" | "[" typeOrDef "]"
memberDef = "{" ( typeName | ref ) ( "," constraint )* "}"
ref       = "$" name
```

The complete, normative grammar for documents and schemas is in the
[Formal Grammar](../appendices/grammar.md) appendix.

## A complete example

A header defines a reusable `$address` and a default `$schema`; the data section is validated
against it:

```ruby
~ $address: { street: string, city: string, zip?: int }
~ $schema: {
    name: string,
    age?: int,
    email: { string, pattern: "^[^@]+@[^@]+$" },
    isActive: bool,
    address?: $address
}
---
~ John Doe, 30, john@example.com, T, { Bond Street, New York }
~ Jane Doe, 28, jane@example.com, F
```

Both records validate: `John Doe` supplies an address; `Jane Doe` omits the optional `address`.

## See Also

* [Schema Representation](schema-representation.md) — open/closed, keyed/positional, default schema
* [Schema Data Types](data-types/README.md) — the base types and shortcuts
* [MemberDef](memberdef.md) — types, constraints, optional/nullable/default
* [Schema References](../the-definitions/schema-references.md) — reusable `$` schemas and types
* [Error Model](../parsing-and-errors/error-model.md) — the validation error catalogue
* [JSON Compatibility](../json-compatibility.md) — mapping to and from JSON Schema
