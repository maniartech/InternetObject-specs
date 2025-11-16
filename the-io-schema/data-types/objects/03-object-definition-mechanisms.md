# Object Definition Mechanisms (IO Model)

How to define objects using inline TypeSchemas, and when to wrap them with MemberDef semantics for optionality, nullability, and defaults.

## Overview

- Object shapes are declared inline as object TypeSchemas: `{ key: MemberDef, ... }`.
- Field-level semantics (`optional`, `null`, `default`) are applied by wrapping the object TypeSchema in a MemberDef.
- Schema open policy is part of the object TypeSchema using `*` (boolean open) or `*: T` (typed open). This is distinct from open/closed object literal forms in `the-structure/values/object.md`.

## 1) Direct Object TypeSchema

Define object structure directly (most common):

```io
# Basic structure
user: { name: string, age: int, email: string }

# Optional and nullable fields inside the object
profile: { name: string, bio?: string, avatar*: string }

# Open policy (any extras)
user: { name: string, age: int, * }

# Typed open (extras must be strings)
config: { theme: string, *: string }

# Nested constraints
article: {
  title: {string, minLen: 1},
  author: { name: string, email: {string, pattern: /[^@]+@[^@]+\.[^@]+/} }
}
```

## 2) Add MemberDef Semantics (Optional/Nullable/Default)

Wrap the object TypeSchema to add field-level semantics:

```io
# Optional object
prefs?: { theme: string, *: string }

# Nullable object
profile*: { name: string, bio?: string }

# Default value (MemberDef wraps the object TypeSchema)
settings?: { { theme: string, debug: bool }, default: { theme: "light", debug: F } }

# Empty object (accept any structure)
metadata: {}
```

- The first positional value of the MemberDef is the TypeSchema (here, an inline object).
- `default` is applied only when the field is omitted; it must be valid for the TypeSchema.

## 3) Mixed Approach

Combine direct object TypeSchemas with MemberDef wrapping where needed:

```io
user: {
  # Direct object fields
  name: string,
  age: int,

  # MemberDef wrapping adds defaults
  preferences?: { { theme: string, notifications: bool }, default: { theme: "light", notifications: T } },

  # Nullable object field
  profile*: { bio: string, avatar: string }
}
```

## Comparison Matrix

| Feature | Direct Object TypeSchema | MemberDef Wrapping |
|---------|--------------------------|--------------------|
| Syntax Complexity | Low | Medium |
| Default Values | No | Yes (via `default`) |
| Nullability Control | Per-field `*` | Yes (via `null` or field `*`) |
| Schema Validation | Always | Always |
| Open Policy | `*` / `*: T` | Same (inside the object TypeSchema) |
| Evolution Support | Medium | High |

## Migration Example

Add defaults to a direct schema by wrapping with a MemberDef:

```io
# Before (direct schema)
user: { name: string, age: int, email: string }

# After (MemberDef wrapping adds default)
user?: { { name: string, age: int, email: string }, default: { name: "Anonymous", age: 0, email: "" } }
```

## References

- `the-io-schema/data-types/objects/README.md`
- `the-io-schema/11-memberdef.md`
- `the-io-schema/data-types/00-common-fields.md`
