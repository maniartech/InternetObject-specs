# Any Type

Accepts any value without validation.

## Overview

The `any` type is a pass-through validator that accepts all values. Use it when type checking is not required or when the schema is intentionally permissive.

## Usage

```io
# Basic any field
data: any

# With optional modifier
metadata?: any
```

## Constraints

The `any` type has no constraints. All values pass validation.

## When to Use

- Prototyping or exploratory schemas
- Heterogeneous data where type is determined at runtime
- External data with unknown structure

## Best Practices

- Prefer explicit types over `any` for production schemas.
- Use `any` sparingly; it disables type safety.
- Document why `any` is necessary when used.

## References

- `io-js2/src/schema-v2/types/any.ts`
