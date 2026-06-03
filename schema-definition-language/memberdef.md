---
description: MemberDef — defining one member's type, constraints, and optional/nullable/default behavior.
---

# MemberDef

A **MemberDef** (member definition) defines a single member of a schema: its type and the
constraints on its value. It is an Internet Object object whose first value is the type,
optionally followed by a default and choices, then keyed options. Every MemberDef is validated
against its type's [TypeDef](typedef.md), so only the options that type defines are allowed.

## Writing a MemberDef

The first value is the type; a default and `choices` may follow positionally; all other options
are keyed:

```ruby
~ $schema: {
    age:    { number, min: 0, max: 120 },        # type + keyed options
    level:  { int16, 1, [1, 2, 3] },             # type + default + choices
    name:   { string, pattern: "^[A-Za-z]+$" },  # type + keyed option
    tags:   { array, of: string, minLen: 1 }     # container type + options
}
---
~ 30, 2, John, [a, b]
```

A member can also be just a type (`age: int`) or just a name (`age`, which defaults to `any`).
The positions and options each type accepts are listed in its
[Schema Data Types](data-types/README.md) page.

## Validation against the TypeDef

A MemberDef may use only the options its type defines. An unknown option is rejected with
`unknown-member`:

```ruby
age: { number, minimum: 10 }
---
42                       # ✗ unknown-member — number has no option "minimum" (use min)
```

## Optional, nullable, and default

- **Optional** (`?` on the key) — the member may be omitted: `age?: { number, min: 0 }`.
- **Nullable** (`*` on the key) — the value may be `null`: `age*: number`.
- **Both** (`?*`) — `score?*: { number, min: 0 }`.
- **Default** — the second positional value (or keyed `default:`) supplies a value when the
  member is omitted: `role?: { string, guest }`.

```ruby
~ $schema: { name: string, role?: { string, guest }, nickname?*: string }
---
~ John                       # role → "guest"; nickname omitted
~ Mary, admin, N             # role "admin"; nickname null
```

> **Use the `*` suffix for nullability.** The keyed `null:` option is part of each TypeDef but is
> not yet honored by the reference implementation — see *Implementation status*.

## MemberDef vs. SchemaDef

Both use `{ … }`, which makes them easy to confuse, but they serve different purposes:

- A **MemberDef** validates one value — it has a *type* and constraints.
- A **SchemaDef** describes an object's *shape* — a map of field names to types or MemberDefs.

The parser tells them apart by the first entry:

1. **Is the first value a known type?** → it is a **MemberDef**.
2. **Otherwise** (the first entry is a `key: …` pair, or a bare field name) → it is a **SchemaDef**.

```ruby
~ $schema: {
    address: { street: string, city: string },   # SchemaDef — a nested object shape
    age:     { int, min: 0, max: 120 }            # MemberDef — a type with constraints
}
---
~ { Main St, NYC }, 30
```

Here `address` declares fields (`street`, `city`), while `age` declares a type with a range.

## Nested shapes

For a nested object, write the shape inline (`{ … }`). The explicit `{ object, schema: { … } }`
form is equivalent and documented on [Object (SchemaDef)](data-types/object.md):

```ruby
~ $schema: { name: string, meta: { author: string, version: { int, min: 1 } } }
---
~ John, { Jane, 2 }
```

## Implementation status (beta)

- Keyed `optional:` works; keyed `null:` is not yet honored — use the `*` suffix for nullability.

## See Also

* [TypeDef](typedef.md) — the allowed options for each type
* [Overview](internet-object-schema.md) — how schemas are built
* [Object (SchemaDef)](data-types/object.md) — declaring object shapes
* [Schema References](../the-definitions/schema-references.md) — reusing shapes with `$`
