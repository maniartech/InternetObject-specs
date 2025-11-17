# Union Types

Multiple type alternatives for polymorphic data.

## Overview

Union types allow a field to accept multiple type alternatives. The value is valid if it satisfies any one of the allowed types.

## Syntax (Proposed)

Union types are under development. Current patterns:

### Using `choices` with Mixed Types

```io
# Accept string or number
value: any  # manual validation needed
```

### Multiple `*:` in Open Schema

```io
# Extras can be string, int, or bool
flexible: { id: string, *: string, *: int, *: bool }
```

## TypeSchema (IO)

```io
# Conceptual union syntax (implementation-dependent)
type      : [string, number, boolean]
optional? : {bool}
null?     : {bool}
```

> Common fields are explained in `the-io-schema/data-types/00-common-fields.md`.

## Validation Behavior

- Value is valid if it matches **any one** of the union members.
- Type checking proceeds in order until a match is found.
- Errors are reported only if all union alternatives fail.

## Common Patterns (Current Workarounds)

### ID Field (string or number)

```io
# Use any and document expectation
id: any  # string or number
```

### Nullable or Default

```io
# Optional with default
config?: {string, default: "default"}

# Nullable
value*: number
```

### Polymorphic Data

```io
# Use open schema with typed extras
data: { type: string, *: any }
```

## Future Syntax (Proposal)

```io
# Explicit union type
id: {string | number}

# Union with constraints
value: {string, minLen: 1} | {number, min: 0}

# Nullable union
field: {string | null}
```

## Best Practices

- Document expected types when using `any` for unions.
- Use open schema typed extras for heterogeneous collections.
- Prefer explicit types over unions when possible.
- Validate union semantics at application level if needed.

## References

- `io-js2/src/schema-v2/types/type-schema.ts`
- `the-io-schema/data-types/objects/README.md` (typed open schema)
