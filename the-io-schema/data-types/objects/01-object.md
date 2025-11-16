# Object Type

Detailed guide to object schemas, open policy, and nested validation.

## Overview

An object TypeSchema is written inline as `{ key: MemberDef, ... }`. Schemas are closed by default; use `*` (open schema) or `*: T` (typed open schema) to control extra fields. Do not confuse this with open/closed object literal forms described in `the-structure/values/object.md`.

## Basic Usage

```io
# Closed object (default)
user: { id: bigint, name: {string, minLen: 1} }

# Open boolean
record: { id: bigint, * }

# Open typed (extra keys must be strings)
labels: { *: string }
```

## TypeSchema (IO)

```io
# Inline object schema
{ id: bigint, name: string, meta?: { [string]: string } }

# Schema open policy
{ id: bigint, * }
{ id: bigint, *: string }
```

> Core semantics for optional/nullable/defaults are in `the-io-schema/data-types/00-common-fields.md` and `the-io-schema/11-memberdef.md`.

## Constraints / Policies

- Closed by default (no implicit extras).
- `*` allows any extra keys; `*: T` enforces TypeSchema `T` for extras.
- Per-member constraints enforced by each field's TypeSchema (e.g., `{string, minLen: 1}`).

## Validation Behavior

- Field-first: validate each declared member.
- Then policy: evaluate extra keys per `*` or `*: T`.
- Error locality: field errors attach to the key; policy errors attach to the object node.

## Common Patterns

```io
# Map-like object with string values
map: { *: string }

# DTO with nested object
article: {
  id: bigint,
  title: {string, minLen: 1},
  author: { name: string, email: {string, pattern: /[^@]+@[^@]+\.[^@]+/} }
}
```

## References

- `io-js2/src/schema/types/object.ts`
- `the-io-schema/11-memberdef.md`
- `the-io-schema/validation-rules/01-validation-model.md`
