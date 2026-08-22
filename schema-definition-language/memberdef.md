---
status: candidate
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

## Constraints and presentation

MemberDef options come in two kinds, and the distinction is **normative** — an implementation
that confuses them will accept or reject documents that others do not.

| Kind | Answers | Examples | Rejects a value? | Changes how it is written? |
| ---- | ------- | -------- | ---------------- | -------------------------- |
| **Constraint** | *Is this value allowed?* | `min`, `max`, `choices`, `pattern`, `len`, `multipleOf` | **yes** | no |
| **Presentation** | *How is this value written?* | `format`, `encloser`, `escapeLines` | **no** | **yes** |

A **presentation** option is **write-only**. It tells a writer which spelling to emit; it
**MUST NOT** restrict what a reader accepts:

```ruby
~ $schema: { flags: { uint16, format: hex } }
---
~ 255          # ✓ accepted — decimal input is fine
~ 0xff         # ✓ accepted — the same value
```

Both records hold `255`, and a writer emits `0xff` for both. This follows from the data model:
`0xff` and `255` parse to the *same value*, so the notation is not part of the value and cannot
be validated. It is also not recoverable — a value built in code carries no notation at all, so
a rule enforcing one would apply when a document is parsed and silently not apply when the same
value is loaded from a host object.

> **To require a particular written form, constrain the text itself.** Use a `string` with a
> `pattern` (`{ string, pattern: "^0x[0-9a-fA-F]{6}$" }`) — then the form *is* the value. If the
> real requirement is a range, say so with the type (`uint8`); if it is a fixed set, use
> `choices`.

The **type name** carries a third thing: what the value *is*. `email` and `url` are strings with
extra validation; `date` and `time` are temporal values narrower than `datetime`. Unlike
`format`, a type name **does** constrain — and for `date` / `time` it also selects the written
form, because the value kind and its literal are the same decision.

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

The suffixes are shorthand: `optional` and `null` are ordinary MemberDef options, so
`score?*: number` and `score: { number, optional: T, "null": T }` declare the same member.

> **The `null` option key is written quoted.** A bare `null:` is the null *keyword*, so
> `{ number, null: T }` is rejected with `invalid-key`; write `"null": T` (or `r'null': T`).
> `optional:` needs no quoting.

### Quoted names take the long form

The suffixes are part of the **name token**, not separate syntax, so they can follow only a bare
name. A name that has to be quoted — because it holds a comma, a colon, a space, or begins with a
digit — cannot carry them, and writes the options instead:

```ruby
~ $schema: { "a,b"?*: number }               # ✗ invalid-definition
---
~ 1
```

```ruby
~ $schema: { "a,b": { number, optional: T, "null": T } }   # ✓ the same member, spelled out
---
~ 1
```

In a schema that mixes both, only the quoted name is affected:

```ruby
~ $schema: { name: string, "a,b": { number, optional: T } }
---
~ John, 1
~ Jane
```

Because the suffix belongs to the name token, a quoted name is **literal**: `"a?"` is a member
named `a?`, not an optional member named `a`. Quoting says *this name, exactly*.

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

## See Also

* [TypeDef](typedef.md) — the allowed options for each type
* [Overview](internet-object-schema.md) — how schemas are built
* [Object (SchemaDef)](data-types/object.md) — declaring object shapes
* [Schema References](../the-definitions/schema-references.md) — reusing shapes with `$`
