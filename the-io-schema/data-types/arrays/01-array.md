# Array Type

Deep dive into array element validation, length constraints, and uniqueness.

## Overview

An array TypeSchema is written as `[T]` where `T` is any TypeSchema. Use the MemberDef curly form to attach constraints to the array itself.

## Basic Usage

```io
# Simple arrays
names: [string]
values: [number]

# Optional / nullable
aliases?: [string]
comments*: [string]
```

## TypeSchema (IO)

```io
# Array itself is `[T]`
# Array-level constraints are applied via MemberDef
len?      : {number, min: 0}
minLen?   : {number, min: 0}
maxLen?   : {number, min: 0}
unique?   : {bool, default: F}
optional? : {bool}
null?     : {bool}
```

> Common fields and semantics are covered in `the-io-schema/data-types/00-common-fields.md` and `the-io-schema/11-memberdef.md`.

## Constraints

### Length

```io
# Exactly two numbers (x, y)
point: {[number], len: 2}

# 1 to 10 tags
tags: {[string], minLen: 1, maxLen: 10}
```

### Uniqueness

```io
# Unique identifiers
ids: {[bigint], unique: T}
```

## Validation Behavior

- Element-first: validate each element using `T`.
- Then container rules: length (`len`, `minLen`, `maxLen`), uniqueness (`unique`).
- Errors: element errors carry the index; container errors attach to the array node.

## Common Patterns

```io
# Matrix of numbers
A: {[[number]], minLen: 1}

# Enum-like lists
roles: {[string], minLen: 1, unique: T}

# Collection-like data is NOT an array type
# See the-collections/collection.md for root-level sections
```

## References

- `io-js2/src/schema/types/array.ts`
- `the-io-schema/validation-rules/01-validation-model.md`
- `the-io-schema/data-types/00-common-fields.md`
