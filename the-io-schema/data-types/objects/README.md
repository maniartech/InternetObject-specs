# Object Type

Object container type with keyed members, open/closed policy, and nested validation.

## Overview

Objects validate each declared member via its MemberDef. Container-level rules control whether extra fields are allowed and, if allowed, how they are typed.

## Basic Usage

```io
# Inline object schema
address: { street: string, city: string, zip?: int }

# Open typed extras
tags: { name: string, *: string }
```

## TypeSchema (IO)

- Object TypeSchema is an inline object mapping of field names to MemberDefs:

```io
{ name: string, age?: int, bio*: string }
```

- Schema open policy (not to be confused with object literal open/closed forms in `the-structure/values/object.md`):

```io
# Closed schema (default): only declared keys allowed
{ name: string }

# Open schema (boolean): allow any extra keys
{ name: string, * }

# Open schema (typed): extra keys must match MemberDef
{ name: string, *: string }
```

> Common fields like `optional`, `null`, and defaults are described in `the-io-schema/data-types/00-common-fields.md` and `the-io-schema/11-memberdef.md`.

## Constraints / Policies

- Closed by default; extra keys cause validation errors.
- Open boolean `*` permits extra keys of any type.
- Open typed `*: T` constrains extra keys to match MemberDef `T`.
- Member-level constraints (e.g., `minLen`, `min`) are enforced by each field's TypeSchema.

## Validation Behavior

1. Validate declared members (presence, nullability, defaults, then type/constraints).
2. Check extra keys against open/closed policy (`*` or `*: T`).
3. Attach errors to the field key (member errors) or to the object node (policy errors).

## Common Patterns

```io
# Configuration object with dynamic extras
config: { name: string, value: string, *: string }

# Strict DTO
dto: { id: bigint, title: {string, minLen: 1}, published: bool }
```

## References

- `io-js2/src/schema/types/object.ts`
- `the-io-schema/11-memberdef.md`
- `the-io-schema/schema-rules/01-schema-resolution.md`
- `the-io-schema/validation-rules/01-validation-model.md`
- `the-io-schema/data-types/objects/03-object-definition-mechanisms.md`
