---
description: Reusable schemas and types referenced with $.
---

# Schema References

A **reference** (ref) is a `$`-prefixed definition in the header that names a reusable
schema or type. You define it once and refer to it elsewhere as `$name`. Refs come in two
forms:

- **Schema reference** — names an object shape (a [SchemaDef](../schema-definition-language/data-types/object.md)).
- **Type reference** — names a single constrained type (a MemberDef), e.g. a percentage.

The special ref **`$schema`** is the document's default schema.

## Schema references

Define an object shape once, reuse it across fields and schemas:

```ruby
~ $address: { street: string, city: string }
~ $person: { name: string, home: $address, office?: $address }
~ $schema: $person
---
~ John, { Main St, NYC }, { 5th Ave, NYC }
~ Jane, { Oak Ave, LA }
```

`$schema: $person` sets the default schema by reference. A ref can be used as a field's type
(`home: $address`) or as an array's element type (`tags: [$address]`).

## Resolution rules

- A ref MUST be defined before it is used (no forward references).
- Refs are resolved when the data is validated, not when the header is parsed.
- Reusing a ref many times keeps a document small and consistent.

## Type references

A ref whose body is a single constrained type acts as a reusable **type** — your own
named shortcut, the document-local counterpart of built-ins like `uint8` or `email`:

```ruby
# A reusable "percent" type and "short text" type
~ $percent: { number, min: 0, max: 100 }
~ $shortText: { string, maxLen: 40 }
~ $schema: { name: $shortText, score: $percent }
```

> **Implementation status (beta).** Type references are being added. Today a top-level `$`
> definition is always compiled as an *object schema*, so a constrained-type ref such as
> `$percent` does not yet validate as a number. Schema references (object shapes) work today.

## See Also

* [Definitions](definitions.md) · [Variables](variables.md)
* [Object (SchemaDef)](../schema-definition-language/data-types/object.md)
* [Internet Object Schema](../schema-definition-language/internet-object-schema.md)
