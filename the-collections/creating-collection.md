---
description: Creating collections, with or without a schema.
---

# Creating Collections

A collection is a sequence of records in the data section, each introduced by a tilde `~`. You
can create one with or without a schema — though a schema is recommended.

## Simple collection (no schema)

Without a schema, each record is parsed on its own and its values are mapped to positional
indices. Records may differ in shape:

```ruby
---
~ Ironman, 20, Male, { Bond Street, New York, NY }
~ Spiderman, 25, Male, { Duke Street, New York, NY }, cool
```

## Explicit collection (with schema)

Define a schema in the header; every record is validated against it. Use a keyed reference
(`address: $address`) to reuse a shape:

```ruby
~ $address: { street, city, state }
~ $schema: { name: string, age: { int, min: 18 }, address: $address }
---
~ Ironman, 20, { Bond Street, New York, NY }      # ✓
~ Wonderwoman, 25, { Z Street, San Francisco, CA } # ✓
```

> Reference a shape with a **keyed** member (`address: $address`). A bare `$address` in the
> schema is read as a field literally named `$address`, not as the referenced shape.

## See Also

* [Collection](collection.md) · [Collection Rules](collection-rules.md)
* [Schema References](../the-definitions/schema-references.md)
