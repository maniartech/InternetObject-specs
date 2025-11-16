# Undefined Type

Represents absence of value via field omission.

## Overview

The `undefined` type is implicit and tied to optional fields (`?`). When a field is marked optional and omitted from the data, it evaluates to undefined.

## Usage

```io
# Optional field (may be undefined if omitted)
email?: string

# Required field (never undefined)
name: string

# Optional with default (undefined → default)
age?: {int, default: 0}
```

## Semantics

- Undefined means the field was not provided in the data.
- Differs from null (explicit absence) and empty string (present but empty).
- Optional fields allow undefined unless a default is specified.

## Validation Behavior

- If field is omitted and optional (`?`), validation passes with undefined.
- If field is omitted and required, validation fails.
- If field is omitted and has a default, default is applied (no undefined).

## Common Patterns

```io
# Optional configuration
config: {
  timeout?: int,
  retries?: int,
  debug?: boolean
}

# Partial updates
update: {
  name?: string,
  email?: string,
  phone?: string
}
```

## References

- `io-js2/src/schema/processing/member-processor.ts`
- `the-io-schema/validation-rules/02-optional-nullable.md`
