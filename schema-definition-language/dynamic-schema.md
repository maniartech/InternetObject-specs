---
status: candidate
description: Strict and extensible schemas — accepting extra fields with the * marker.
---

# Extensible & Dynamic Schemas

A schema is **strict** by default: a record **MUST** contain only the declared fields. Adding a `*`
marker makes it **extensible**, and an extensible schema accepts fields beyond those declared.

> **A note on the words.** This specification says *strict* and *extensible* for schemas, and keeps
> *open* and *closed* for the [object syntax](../the-structure/values/object.md) — an open object is
> written without braces, a closed one with them. The two axes are unrelated, and one document can
> hold all four combinations, so a single pair of words for both would make sentences that cannot be
> read. Readers arriving from JSON Schema should map *strict* to `additionalProperties: false`.

## Strict by default

Extra values in a record are rejected unless the schema opts in with `*`:

```ruby
~ $schema: { name: string, age: int }
---
~ John, 30                # ✓
~ Alex, 25, extra1        # ✗ unknown-member
```

## Allowing extra fields with `*`

Place `*` after the declared fields to accept extras. Positional extras are keyed by index;
keyed extras keep their names:

```ruby
~ $schema: { name: string, age: int, * }
---
~ John, 30                       # ✓
~ Alex, 25, Male, cool           # ✓ extras at index 2 and 3
~ { Mia, 28, role: dev }         # ✓ extra keyed field "role"
```

### `*` bare is grammar; `"*"` quoted is a name

The `*` above is **bare**, and that is what makes it the wildcard. Quoted, it is an ordinary
member name — the same rule that governs the `?` and `*`
[name suffixes](memberdef.md#quoted-names-take-the-long-form): quoting says *this name, exactly*.

```ruby
~ $schema: { name: string, * }         # extensible — accepts any extra field
~ $schema: { name: string, "*": int }  # CLOSED — declares a member called *
```

Data is free to use `*` as a key; JSON-sourced configuration routinely does:

```ruby
~ $schema: { "*": string, admin: string }
---
~ allow, deny            # the member named * holds "allow"
```

A member named `*` does **not** make its schema extensible, and a wildcard is **not** a member: it never
appears among the schema's member names, and a schema may carry both at once.

## Typing the extra fields

`*: <type>` constrains every extra field; `*: { <type>, …constraints }` adds constraints:

```ruby
~ $schema: { name: string, *: string }
---
~ { John, role: dev }     # ✓
~ { Alex, code: 123 }     # ✗ expected-string — extra value must be a string
```

```ruby
~ $schema: { name: string, *: { string, minLen: 4 } }
---
~ { John, dept: Sales }   # ✓
~ { Mia, id: "12" }       # ✗ mismatched-min-len — extra is shorter than 4
```

## Map-shaped objects

A wildcard may reference a SchemaDef, which makes `{*: $ref}` the natural schema for
**dictionary/map-shaped data** — data whose keys are values in their own right (IDs, codes, locale
tags) rather than field names. The keys stay in the data section; the wildcard types every value:

```ruby
~ $question: { questionName: string, points: number }
~ $questions: { *: $question }        # map: ANY key, every value must match $question
~ $schema: { questions: $questions }
---
{ QID1: { Q2, 5 }, QID2: { Q1, 3 } }
```

The wildcard forms, in full:

| Form | Meaning |
| ---- | ------- |
| `{ * }` (or `*` listed last) | open — extra members allowed, any type |
| `{ *: type }` | every extra member must match `type` |
| `{ *: { … } }` | every extra member must match the inline SchemaDef |
| `{ *: [type] }` | every extra member must be an array of `type` |
| `{ *: $ref }` | every extra member must match the referenced SchemaDef |

Declared members and the wildcard compose — `{ id: string, *: number }` requires `id` and lets any
other member be a number.

## Dynamic types with anyOf

When a single field must accept more than one type, use `anyOf` (see [Any](data-types/any.md)):

```ruby
test: { any, anyOf: [string, number] }
---
~ One     # ✓
~ 1       # ✓
~ Two     # ✓
```

## When to use curly braces

**Only a root object may be written open.** The header of a schema, and a record in the data, may
both omit their braces — that is the ordinary form. **Every child object MUST be braced.**

```ruby
name, age, address: { street, city, state }, isActive
---
~ Alice, 30, { Main St, NYC, NY }, T
```

There is no braceless nested object to get wrong, because dropping the braces does not produce a
*partial* object — it produces a different declaration entirely:

```ruby
address: { street, city }    # `address` is an object with two members
address: string              # `address` is a string; there is no nested object
address: street              # ✗ unknown-type — `street` is read as a TYPE name, not a member
```

The same holds in the data. A child object without braces is not a short object, it is extra
members in the parent, and a strict schema rejects them as `unknown-member`.

## See Also

* [Internet Object Schema](internet-object-schema.md) · [Any](data-types/any.md)
* [Object (SchemaDef)](data-types/object.md)
