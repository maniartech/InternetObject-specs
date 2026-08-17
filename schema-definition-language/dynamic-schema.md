---
status: candidate
description: Open and dynamic schemas — accepting extra fields with the * marker.
---

# Open & Dynamic Schemas

By default a schema is **closed**: a record may contain only the declared fields. Adding a
`*` marker makes the schema **open**, allowing extra fields beyond those declared.

## Closed by default

Extra values in a record are rejected unless the schema opts in with `*`:

```ruby
~ $schema: { name: string, age: int }
---
~ John, 30                # ✓
~ Alex, 25, extra1        # ✗ additional-values-not-allowed
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

## Typing the extra fields

`*: <type>` constrains every extra field; `*: { <type>, …constraints }` adds constraints:

```ruby
~ $schema: { name: string, *: string }
---
~ { John, role: dev }     # ✓
~ { Alex, code: 123 }     # ✗ not-a-string — extra value must be a string
```

```ruby
~ $schema: { name: string, *: { string, minLen: 4 } }
---
~ { John, dept: Sales }   # ✓
~ { Mia, id: "12" }       # ✗ invalid-min-length — extra is shorter than 4
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

A top-level schema needs braces only when wrapping a nested object. A nested field with more
than one member MUST be enclosed in `{ … }`:

```ruby
# 'address' captures only 'street'; city/state become separate fields — usually not intended
name, age, address: street, city, state, isActive
```

```ruby
# 'address' is a nested object with three members
name, age, address: { street, city, state }, isActive
```

## See Also

* [Internet Object Schema](internet-object-schema.md) · [Any](data-types/any.md)
* [Object (SchemaDef)](data-types/object.md)
