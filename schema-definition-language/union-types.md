---
status: candidate
description: Members that accept more than one type, via anyOf.
---

# Union Types (anyOf)

When a field must accept values of **more than one type**, use the `anyOf` constraint on the
`any` type (see [Any](data-types/any.md)). A value is valid if it matches **any one** of the
listed alternatives.

```ruby
id: { any, anyOf: [string, int] }
---
~ 42      # ✓ matches int
~ abc     # ✓ matches string
```

A value matching none of the alternatives is rejected:

```ruby
flag: { any, anyOf: [bool, int] }
---
~ T       # ✓
~ hello   # ✗ matches neither
```

## Constrained and structured alternatives

Each alternative may be a full MemberDef (with constraints) or an object shape, not just a
bare type name:

```ruby
value: { any, anyOf: [ { int, multipleOf: 5 }, { int, multipleOf: 3 } ] }
---
~ 10      # ✓ multiple of 5
~ 9       # ✓ multiple of 3
```

## Guidance

- Order alternatives from most specific to least specific.
- Prefer `anyOf` over a bare `any` when the set of acceptable types is known — it keeps
  validation meaningful.

## See Also

- [Any](data-types/any.md) · [MemberDef](memberdef.md)
- [Schema References](../the-definitions/schema-references.md)
