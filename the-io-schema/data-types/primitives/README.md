# Primitive Types

Primitive types are the foundational value types in Internet Object schemas.

## Overview

Primitives include:
- `any`: accepts any value without validation
- `boolean`: true or false
- `null`: explicit null value
- `undefined`: absence of value (used with optional fields)

## Usage

```io
# Any type (no constraints)
data: any

# Boolean
isActive: boolean

# Null (rarely used alone; typically with nullable modifier)
placeholder*: null

# Undefined (implicit with optional)
optionalField?: string
```

## Validation

- `any`: passes all values through without validation.
- `boolean`: validates that the value is strictly true or false.
- `null`: validates that the value is null.
- `undefined`: validates that the value is undefined (usually via optional field omission).

## References

- `io-js2/src/schema-v2/types/any.ts`
- `io-js2/src/schema-v2/types/boolean.ts`
