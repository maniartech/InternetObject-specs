# Array Type

Array container type with element validation, length bounds, and uniqueness.

## Overview

Arrays validate each element against an item TypeSchema, then enforce array-level constraints like length and uniqueness.

## Basic Usage

```io
# Array of strings
skills: [string]

# Array of numbers
scores: [number]

# Nested arrays
matrix: [[number]]
```

## TypeSchema (IO)

- Array TypeSchema is expressed as `[T]`, where `T` is any TypeSchema.
- To add constraints, use MemberDef curly form with the array TypeSchema:

```io
# 1 to 10 items, unique strings
tags: {[string], minLen: 1, maxLen: 10, unique: T}
```

Constraints applicable to arrays:

```io
len?     : {number, min: 0}
minLen?  : {number, min: 0}
maxLen?  : {number, min: 0}
unique?  : {bool, default: F}
optional?: {bool}
null?    : {bool}
```

> Common fields like `optional`, `null`, and the general semantics of MemberDef are explained in `the-io-schema/data-types/00-common-fields.md` and `the-io-schema/11-memberdef.md`.

## Constraints

### Length Constraints

```io
# At least 1 item
items: {[string], minLen: 1}

# At most 5 items
topFive: {[number], maxLen: 5}

# Exactly N items
pair: {[number], len: 2}
```

### Uniqueness

```io
# Unique values (string equality)
tags: {[string], unique: T}
```

Note: Uniqueness applies to the serialized or canonical form of elements per implementation. See references.

## Validation Behavior

1. Resolve the item TypeSchema `T`.
2. Validate each element against `T`.
3. Enforce array-level constraints: `len`/`minLen`/`maxLen`, then `unique`.

## Common Patterns

```io
# IDs list
ids: {[bigint], minLen: 1, unique: T}

# Coordinates
point: {[number], len: 2}
polygon: {[[number]], minLen: 3}

# Emails
recipients: {[string], minLen: 1}
```

## References

- `io-js2/src/schema/types/array.ts`
- `the-io-schema/schema-rules/01-schema-resolution.md`
- `the-io-schema/validation-rules/01-validation-model.md`
- `the-io-schema/data-types/00-common-fields.md`
