---
description: Schema-first philosophy and progressive typing.
---

# Schema-First Design

Internet Object is **schema-first**: the shape of the data is declared in the header, and the
data conforms to it. The schema is written in the *same* object syntax as the data, so it is
easy to read and author — no separate schema language to learn.

## Progressive typing

You adopt as much structure as you need. The same field can be untyped, typed, or constrained:

```ruby
# untyped — any value
name, age

# typed
name: string, age: int

# typed + constrained
name: { string, maxLen: 100 }, age: { int, min: 0, max: 120 }
```

Start loose during prototyping; tighten to typed and constrained schemas for production —
without changing the data's shape.

## The schema travels with the data

Because the schema is part of the document (or a shared header), validation does not depend on
out-of-band contracts. A receiver can validate exactly what was sent, and report precise
errors per field and per record.

```ruby
~ $schema: { name: string, age: { int, min: 0, max: 120 } }
---
~ John, 30      # ✓
~ Mary, 200     # ✗ invalid-range
```

## Reuse

Shapes and values are defined once and referenced, keeping schemas DRY:

```ruby
~ $address: { street, city }
~ $schema: { name: string, home: $address, office?: $address }
---
~ John, { Main St, NYC }, { 5th Ave, NYC }
```

## See Also

- [Document-Oriented Nature](document-oriented.md)
- [Internet Object Schema](../schema-definition-language/internet-object-schema.md)
- [Schema References](../the-definitions/schema-references.md)
